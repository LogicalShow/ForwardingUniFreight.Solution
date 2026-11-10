using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Globalization;
using System.Linq;
using BillWorkflow.Common.Abstractions;
using BillWorkflow.Common.Contracts;
using BillWorkflow.Common.Exceptions;
using BillWorkflow.Common.Services;
using BillWorkflow.Common.Validation;

namespace Forwarding.MvcApp.Models.Operations.Operations.BillWorkflow.Integration
{
    public class CustomerDirectory : ICustomerDirectory
    {
        public const int CandidateSearchLimit = 200;
        private readonly string connectionString;

        public CustomerDirectory(string connectionString)
        {
            if (string.IsNullOrWhiteSpace(connectionString))
                throw new ArgumentException(BillWorkflowMessages.ConnectionRequired);
            this.connectionString = connectionString;
        }

        public IReadOnlyList<CustomerRecord> FindExactMatches(string name, string sourceParty,
            BillContext context, int actingUserId)
        {
            using (var connection = new SqlConnection(connectionString))
            {
                connection.Open();
                var scope = LoadSearchScope(connection, context, actingUserId);
                using (var command = connection.CreateCommand())
                {
                    // Four rows are sufficient to detect ambiguity and offer three suggestions.
                    // The predicate searches the complete eligible scope, independent of the fuzzy limit.
                    command.CommandText = @"WITH MatchingCustomers AS
(
    SELECT ID FROM dbo.Customers
    WHERE LTRIM(RTRIM(Name)) COLLATE Latin1_General_100_CI_AS = @Name COLLATE Latin1_General_100_CI_AS
       OR LTRIM(RTRIM(LocalName)) COLLATE Latin1_General_100_CI_AS = @Name COLLATE Latin1_General_100_CI_AS
    UNION
    SELECT CustomerID FROM dbo.CustomerAliases
    WHERE IsActive = 1 AND AliasHash = @AliasHash AND NormalizedAlias = @NormalizedAlias
)
SELECT TOP (4) c.ID, c.Name, c.LocalName, a.Alias AS MatchedAlias
FROM MatchingCustomers m JOIN dbo.Customers c ON c.ID = m.ID
OUTER APPLY (SELECT TOP (1) ca.Alias FROM dbo.CustomerAliases ca
    WHERE ca.CustomerID = c.ID AND ca.IsActive = 1 AND ca.AliasHash = @AliasHash
      AND ca.NormalizedAlias = @NormalizedAlias ORDER BY ca.ID) a
WHERE " +
                        BuildEligibilityFilter(command, scope, sourceParty) + @"
 ORDER BY c.ID;";
                    command.Parameters.Add("@Name", SqlDbType.NVarChar, CustomerResolver.MaximumNameLength)
                        .Value = name.Trim(' ');
                    var normalizedAlias = CustomerAliasRules.Normalize(name);
                    command.Parameters.Add("@NormalizedAlias", SqlDbType.NVarChar, CustomerResolver.MaximumNameLength).Value = normalizedAlias;
                    command.Parameters.Add("@AliasHash", SqlDbType.Binary, 32).Value = CustomerAliasRules.GetHash(normalizedAlias);
                    return ReadCustomers(command, true);
                }
            }
        }

        public CustomerSearchResult FindCandidates(string name, string sourceParty,
            BillContext context, int actingUserId)
        {
            var words = CustomerResolver.GetMeaningfulWords(name).Where(word => word.Length >= 2)
                .OrderByDescending(word => word.Length).Take(4).ToList();
            var fragments = GetSearchFragments(words);
            if (fragments.Count == 0) return new CustomerSearchResult();
            using (var connection = new SqlConnection(connectionString))
            {
                connection.Open();
                var scope = LoadSearchScope(connection, context, actingUserId);
                using (var command = connection.CreateCommand())
                {
                    var eligibility = BuildEligibilityFilter(command, scope, sourceParty);
                    var conditions = new List<string>();
                    var preliminaryScores = new List<string>();
                    var wordScores = new List<string>();
                    for (var index = 0; index < words.Count; index++)
                    {
                        var condition = AddNameLikeCondition(command,
                            "@Word" + index.ToString(CultureInfo.InvariantCulture), words[index]);
                        wordScores.Add("CASE WHEN " + condition + " THEN 1 ELSE 0 END");
                    }
                    for (var index = 0; index < fragments.Count; index++)
                    {
                        var parameter = "@Fragment" + index.ToString(CultureInfo.InvariantCulture);
                        var condition = AddNameLikeCondition(command, parameter, fragments[index]);
                        conditions.Add(condition);
                        preliminaryScores.Add("CASE WHEN " + condition + " THEN 1 ELSE 0 END");
                    }
                    command.CommandText = "SELECT TOP (@Limit) c.ID, c.Name, c.LocalName FROM dbo.Customers c WHERE " +
                        eligibility + " AND (" + string.Join(" OR ", conditions) + ") ORDER BY (" +
                        string.Join(" + ", wordScores) + ") DESC, (" +
                        string.Join(" + ", preliminaryScores) + ") DESC, c.ID;";
                    command.Parameters.Add("@Limit", SqlDbType.Int).Value = CandidateSearchLimit + 1;
                    var records = ReadCustomers(command);
                    return new CustomerSearchResult
                    {
                        Customers = records.Take(CandidateSearchLimit).ToList(),
                        IsLimited = records.Count > CandidateSearchLimit
                    };
                }
            }
        }

        public CustomerLookupPage Search(string searchText, int page, int pageSize, string sourceParty,
            BillContext context, int actingUserId)
        {
            if (string.IsNullOrWhiteSpace(searchText) || searchText.Length > CustomerResolver.MaximumNameLength ||
                page < 1 || page > DocumentReviewService.MaximumSearchPage ||
                pageSize < 1 || pageSize > DocumentReviewService.MaximumSearchPageSize)
                throw new ArgumentException(BillWorkflowMessages.BoundedCustomerSearchRequired);
            using (var connection = new SqlConnection(connectionString))
            {
                connection.Open();
                var scope = LoadSearchScope(connection, context, actingUserId);
                using (var command = connection.CreateCommand())
                {
                    var eligibility = BuildEligibilityFilter(command, scope, sourceParty);
                    command.CommandText = @"
SELECT ID, Name, LocalName FROM
(
    SELECT c.ID, c.Name, c.LocalName, ROW_NUMBER() OVER (ORDER BY c.Name, c.ID) AS RowNumber
    FROM dbo.Customers c WHERE " + eligibility + @"
      AND (c.Name COLLATE Latin1_General_100_CI_AS LIKE @SearchText ESCAPE N'~'
        OR c.LocalName COLLATE Latin1_General_100_CI_AS LIKE @SearchText ESCAPE N'~')
) AS Matches
WHERE RowNumber > @Skip AND RowNumber <= @LastRow
ORDER BY RowNumber;";
                    command.Parameters.Add("@SearchText", SqlDbType.NVarChar,
                        CustomerResolver.MaximumNameLength * 2 + 2).Value = "%" + EscapeSearchText(searchText.Trim()) + "%";
                    var skip = (page - 1) * pageSize;
                    command.Parameters.Add("@Skip", SqlDbType.Int).Value = skip;
                    // One extra row tells the caller whether another page exists, without COUNT(*).
                    command.Parameters.Add("@LastRow", SqlDbType.Int).Value = skip + pageSize + 1;
                    var records = ReadCustomers(command);
                    return new CustomerLookupPage
                    {
                        Page = page,
                        PageSize = pageSize,
                        HasMore = records.Count > pageSize,
                        Customers = records.Take(pageSize).ToList()
                    };
                }
            }
        }

        public CustomerRecord GetById(int customerId, string sourceParty, BillContext context, int actingUserId)
        {
            if (customerId <= 0) throw new ArgumentException(BillWorkflowMessages.CustomerIdRequired);
            using (var connection = new SqlConnection(connectionString))
            {
                connection.Open();
                var scope = LoadSearchScope(connection, context, actingUserId);
                using (var command = connection.CreateCommand())
                {
                    command.CommandText = "SELECT c.ID, c.Name, c.LocalName FROM dbo.Customers c WHERE " +
                        BuildEligibilityFilter(command, scope, sourceParty) + " AND c.ID = @CustomerID;";
                    command.Parameters.Add("@CustomerID", SqlDbType.Int).Value = customerId;
                    return ReadCustomers(command).SingleOrDefault();
                }
            }
        }

        private static string EscapeSearchText(string value)
        {
            // Search for literal text; user-entered %, _ and [ are not wildcard instructions.
            return value.Replace("~", "~~").Replace("%", "~%").Replace("_", "~_").Replace("[", "~[");
        }

        private CustomerSearchScope LoadSearchScope(SqlConnection connection, BillContext context, int actingUserId)
        {
            long masterId;
            if (context == null || !long.TryParse(context.ParentReference, NumberStyles.None,
                CultureInfo.InvariantCulture, out masterId) || masterId <= 0 || actingUserId <= 0)
                throw new DocumentReviewException(DocumentReviewFailure.InvalidInput,
                    BillWorkflowCodes.InvalidCustomerScope, BillWorkflowMessages.InvalidCustomerScope);
            using (var command = connection.CreateCommand())
            {
                command.CommandText = @"
SELECT u.IsHideOthersRecords, u.IsSalesman, o.SalesmanID,
       (SELECT TOP (1) UnEditableCompanyName FROM dbo.Defaults ORDER BY ID) AS Company
FROM dbo.Users u CROSS JOIN dbo.Operations o
WHERE u.ID = @UserID AND ISNULL(u.IsInactive, 0) = 0 AND o.ID = @MasterID;";
                command.Parameters.Add("@UserID", SqlDbType.Int).Value = actingUserId;
                command.Parameters.Add("@MasterID", SqlDbType.BigInt).Value = masterId;
                using (var reader = command.ExecuteReader())
                {
                    if (!reader.Read())
                        throw new DocumentReviewException(DocumentReviewFailure.Forbidden,
                            BillWorkflowCodes.CustomerAccessRequired, BillWorkflowMessages.CustomerAccessRequired);
                    return new CustomerSearchScope
                    {
                        UserId = actingUserId,
                        HideOthersRecords = reader["IsHideOthersRecords"] != DBNull.Value &&
                            Convert.ToBoolean(reader["IsHideOthersRecords"], CultureInfo.InvariantCulture),
                        IsSalesman = reader["IsSalesman"] != DBNull.Value &&
                            Convert.ToBoolean(reader["IsSalesman"], CultureInfo.InvariantCulture),
                        MasterSalesmanId = reader["SalesmanID"] == DBNull.Value ? 0 :
                            Convert.ToInt32(reader["SalesmanID"], CultureInfo.InvariantCulture),
                        Company = Convert.ToString(reader["Company"], CultureInfo.InvariantCulture)
                    };
                }
            }
        }

        private string BuildEligibilityFilter(SqlCommand command, CustomerSearchScope scope, string sourceParty)
        {
            if (sourceParty != "Consignee" && sourceParty != "Shipper")
                throw new DocumentReviewException(DocumentReviewFailure.InvalidInput,
                    BillWorkflowCodes.UnsupportedCustomerLookup, BillWorkflowMessages.UnsupportedCustomerLookup);
            var filter = "ISNULL(c.IsInactive, 0) = 0 AND ISNULL(c.IsDeleted, 0) = 0 AND " +
                (sourceParty == "Consignee" ? "c.IsConsignee = 1" : "c.IsShipper = 1");
            // Match the customer selectors used by the Operations screen.
            if (scope.HideOthersRecords && scope.IsSalesman)
            {
                filter += " AND (c.SalesmanID = @UserID OR c.CreatorUserID = @UserID)";
                command.Parameters.Add("@UserID", SqlDbType.Int).Value = scope.UserId;
            }
            if (scope.Company == "USC") filter += " AND c.SubAccountID IS NOT NULL";
            if (scope.Company == "CFR" && scope.MasterSalesmanId > 0)
            {
                filter += " AND c.SalesmanID = @MasterSalesmanID";
                command.Parameters.Add("@MasterSalesmanID", SqlDbType.Int).Value = scope.MasterSalesmanId;
            }
            return filter;
        }

        private List<CustomerRecord> ReadCustomers(SqlCommand command, bool readAlias = false)
        {
            var result = new List<CustomerRecord>();
            using (var reader = command.ExecuteReader())
            {
                while (reader.Read())
                    result.Add(new CustomerRecord
                    {
                        Id = Convert.ToInt32(reader["ID"], CultureInfo.InvariantCulture),
                        Name = reader["Name"] == DBNull.Value ? null : Convert.ToString(reader["Name"], CultureInfo.InvariantCulture),
                        LocalName = reader["LocalName"] == DBNull.Value ? null : Convert.ToString(reader["LocalName"], CultureInfo.InvariantCulture),
                        MatchedAlias = readAlias && reader["MatchedAlias"] != DBNull.Value
                            ? Convert.ToString(reader["MatchedAlias"], CultureInfo.InvariantCulture) : null
                    });
            }
            return result;
        }

        private string AddNameLikeCondition(SqlCommand command, string parameter, string word)
        {
            // Words/fragments contain letters and numbers only, so LIKE metacharacters cannot enter here.
            command.Parameters.Add(parameter, SqlDbType.NVarChar, CustomerResolver.MaximumNameLength + 2)
                .Value = "%" + word + "%";
            return "(c.Name COLLATE Latin1_General_100_CI_AS LIKE " + parameter +
                " OR c.LocalName COLLATE Latin1_General_100_CI_AS LIKE " + parameter + ")";
        }

        private List<string> GetSearchFragments(IEnumerable<string> words)
        {
            var fragments = new List<string>();
            foreach (var word in words)
            {
                fragments.Add(word.Substring(0, Math.Min(3, word.Length)));
                if (word.Length > 3) fragments.Add(word.Substring(word.Length - 3));
            }
            return fragments.Distinct(StringComparer.OrdinalIgnoreCase).ToList();
        }

        private class CustomerSearchScope
        {
            public int UserId { get; set; }
            public bool HideOthersRecords { get; set; }
            public bool IsSalesman { get; set; }
            public int MasterSalesmanId { get; set; }
            public string Company { get; set; }
        }
    }
}

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
    public class PortDirectory : IPortDirectory
    {
        public const int CandidateSearchLimit = 200;
        private readonly string connectionString;

        public PortDirectory(string connectionString)
        {
            if (string.IsNullOrWhiteSpace(connectionString))
                throw new ArgumentException(BillWorkflowMessages.ConnectionRequired);
            this.connectionString = connectionString;
        }

        public IReadOnlyList<PortRecord> FindExactMatches(string value, BillContext context, int actingUserId)
        {
            ReferenceSearchRules.ValidateSearch(value, 1, 1);
            using (var connection = new SqlConnection(connectionString))
            {
                connection.Open();
                var eligibility = LoadEligibility(connection, context, actingUserId);
                using (var command = connection.CreateCommand())
                {
                    // Search the entire eligible scope before applying any fuzzy candidate limit.
                    // Four rows detect ambiguity while keeping the public suggestions bounded to three.
                    command.CommandText = @"WITH MatchingPorts AS
(
 SELECT ID FROM dbo.Ports
 WHERE LTRIM(RTRIM(Code)) COLLATE Latin1_General_100_CI_AS = @Value COLLATE Latin1_General_100_CI_AS
    OR LTRIM(RTRIM(Name)) COLLATE Latin1_General_100_CI_AS = @Value COLLATE Latin1_General_100_CI_AS
    OR LTRIM(RTRIM(LocalName)) COLLATE Latin1_General_100_CI_AS = @Value COLLATE Latin1_General_100_CI_AS
 UNION
 SELECT PortID FROM dbo.PortAliases
 WHERE IsActive = 1 AND AliasHash = @AliasHash AND NormalizedAlias = @NormalizedAlias
)
SELECT TOP (4) p.ID, p.Code, p.Name, p.LocalName, p.CountryID, a.Alias AS MatchedAlias
FROM MatchingPorts m JOIN dbo.Ports p ON p.ID = m.ID
OUTER APPLY (SELECT TOP (1) pa.Alias FROM dbo.PortAliases pa
 WHERE pa.PortID = p.ID AND pa.IsActive = 1 AND pa.AliasHash = @AliasHash
   AND pa.NormalizedAlias = @NormalizedAlias ORDER BY pa.ID) a
WHERE " + eligibility + " ORDER BY p.ID;";
                    command.Parameters.Add("@Value", SqlDbType.NVarChar, ReferenceSearchRules.MaximumSearchTextLength).Value = value.Trim();
                    var normalizedAlias = ReferenceAliasRules.Normalize(value);
                    command.Parameters.Add("@NormalizedAlias", SqlDbType.NVarChar, ReferenceSearchRules.MaximumSearchTextLength).Value = normalizedAlias;
                    command.Parameters.Add("@AliasHash", SqlDbType.Binary, 32).Value = ReferenceAliasRules.GetHash(normalizedAlias);
                    return ReadPorts(command, true);
                }
            }
        }

        public PortSearchResult FindCandidates(string value, BillContext context, int actingUserId)
        {
            ReferenceSearchRules.ValidateSearch(value, 1, 1);
            var words = PortResolver.GetSearchWords(value).Where(word => word.Length >= 3)
                .OrderByDescending(word => word.Length).Take(4).ToList();
            if (words.Count == 0) return new PortSearchResult();
            var fragments = words.SelectMany(word => Enumerable.Range(0, word.Length - 2)
                .Select(index => word.Substring(index, 3))).Distinct().ToList();
            using (var connection = new SqlConnection(connectionString))
            {
                connection.Open();
                var eligibility = LoadEligibility(connection, context, actingUserId);
                using (var command = connection.CreateCommand())
                {
                    var conditions = new List<string>();
                    var wordScores = new List<string>();
                    for (var index = 0; index < words.Count; index++)
                        wordScores.Add("CASE WHEN " + AddNameLikeCondition(command, "@Word" + index, words[index]) + " THEN 1 ELSE 0 END");
                    for (var index = 0; index < fragments.Count; index++)
                        conditions.Add(AddNameLikeCondition(command, "@Fragment" + index, fragments[index]));
                    command.CommandText = "SELECT TOP (@Limit) p.ID, p.Code, p.Name, p.LocalName, p.CountryID FROM dbo.Ports p WHERE " +
                        eligibility + " AND (" + string.Join(" OR ", conditions) + ") ORDER BY (" +
                        string.Join(" + ", wordScores) + ") DESC, (" +
                        string.Join(" + ", conditions.Select(condition => "CASE WHEN " + condition + " THEN 1 ELSE 0 END")) + ") DESC, p.ID;";
                    command.Parameters.Add("@Limit", SqlDbType.Int).Value = CandidateSearchLimit + 1;
                    var records = ReadPorts(command);
                    return new PortSearchResult
                    {
                        Ports = records.Take(CandidateSearchLimit).ToList(), IsLimited = records.Count > CandidateSearchLimit
                    };
                }
            }
        }

        public PortLookupPage Search(string searchText, int page, int pageSize, BillContext context, int actingUserId)
        {
            ReferenceSearchRules.ValidateSearch(searchText, page, pageSize);
            using (var connection = new SqlConnection(connectionString))
            {
                connection.Open();
                var eligibility = LoadEligibility(connection, context, actingUserId);
                using (var command = connection.CreateCommand())
                {
                    command.CommandText = @"
SELECT ID, Code, Name, LocalName, CountryID FROM
(
 SELECT p.ID, p.Code, p.Name, p.LocalName, p.CountryID,
        ROW_NUMBER() OVER (ORDER BY p.Name, p.ID) AS RowNumber
 FROM dbo.Ports p WHERE " + eligibility + @" AND (
 p.Code COLLATE Latin1_General_100_CI_AS LIKE @Text ESCAPE N'~' OR
 p.Name COLLATE Latin1_General_100_CI_AS LIKE @Text ESCAPE N'~' OR
 p.LocalName COLLATE Latin1_General_100_CI_AS LIKE @Text ESCAPE N'~')
) AS Matches WHERE RowNumber > @Skip AND RowNumber <= @LastRow ORDER BY RowNumber;";
                    command.Parameters.Add("@Text", SqlDbType.NVarChar, ReferenceSearchRules.MaximumSearchTextLength * 2 + 2)
                        .Value = "%" + EscapeSearchText(searchText.Trim()) + "%";
                    var skip = (page - 1) * pageSize;
                    command.Parameters.Add("@Skip", SqlDbType.Int).Value = skip;
                    command.Parameters.Add("@LastRow", SqlDbType.Int).Value = skip + pageSize + 1;
                    var records = ReadPorts(command);
                    return new PortLookupPage
                    {
                        Page = page, PageSize = pageSize, HasMore = records.Count > pageSize,
                        Ports = records.Take(pageSize).ToList()
                    };
                }
            }
        }

        public PortRecord GetById(int portId, BillContext context, int actingUserId)
        {
            if (portId <= 0) throw new ArgumentException(BillWorkflowMessages.PortIdRequired);
            using (var connection = new SqlConnection(connectionString))
            {
                connection.Open();
                var eligibility = LoadEligibility(connection, context, actingUserId);
                using (var command = connection.CreateCommand())
                {
                    command.CommandText = "SELECT p.ID, p.Code, p.Name, p.LocalName, p.CountryID FROM dbo.Ports p WHERE " +
                        eligibility + " AND p.ID = @PortID;";
                    command.Parameters.Add("@PortID", SqlDbType.Int).Value = portId;
                    return ReadPorts(command).SingleOrDefault();
                }
            }
        }

        private static string LoadEligibility(SqlConnection connection, BillContext context, int actingUserId)
        {
            long masterId;
            if (context == null || !long.TryParse(context.ParentReference, NumberStyles.None,
                CultureInfo.InvariantCulture, out masterId) || masterId <= 0 || actingUserId <= 0)
                throw new DocumentReviewException(DocumentReviewFailure.InvalidInput,
                    BillWorkflowCodes.InvalidPortScope, BillWorkflowMessages.InvalidPortScope);
            int transportType;
            using (var command = connection.CreateCommand())
            {
                // The service authorizes the operation. Match its existing port selector's transport filter.
                command.CommandText = @"SELECT o.TransportType FROM dbo.Operations o CROSS JOIN dbo.Users u
WHERE o.ID = @MasterID AND u.ID = @UserID AND ISNULL(u.IsInactive, 0) = 0;";
                command.Parameters.Add("@MasterID", SqlDbType.BigInt).Value = masterId;
                command.Parameters.Add("@UserID", SqlDbType.Int).Value = actingUserId;
                var value = command.ExecuteScalar();
                if (value == null || value == DBNull.Value)
                    throw new DocumentReviewException(DocumentReviewFailure.Forbidden,
                        BillWorkflowCodes.InvalidPortScope, BillWorkflowMessages.InvalidPortScope);
                transportType = Convert.ToInt32(value, CultureInfo.InvariantCulture);
            }
            var filter = "p.IsPort = 1 AND p.IsInactive = 0 AND ";
            if (transportType == 1) return filter + "p.IsOcean = 1";
            if (transportType == 2) return filter + "p.IsAir = 1";
            if (transportType == 3) return filter + "p.IsInland = 1";
            throw new DocumentReviewException(DocumentReviewFailure.InvalidInput,
                BillWorkflowCodes.UnsupportedTransportType, BillWorkflowMessages.UnsupportedTransportType);
        }

        private static string AddNameLikeCondition(SqlCommand command, string parameter, string value)
        {
            command.Parameters.Add(parameter, SqlDbType.NVarChar, ReferenceSearchRules.MaximumSearchTextLength * 2 + 2)
                .Value = "%" + EscapeSearchText(value) + "%";
            return "(p.Name COLLATE Latin1_General_100_CI_AS LIKE " + parameter + " ESCAPE N'~' OR " +
                "p.LocalName COLLATE Latin1_General_100_CI_AS LIKE " + parameter + " ESCAPE N'~')";
        }

        private static string EscapeSearchText(string value)
        {
            return value.Replace("~", "~~").Replace("%", "~%").Replace("_", "~_").Replace("[", "~[");
        }

        private static List<PortRecord> ReadPorts(SqlCommand command, bool readAlias = false)
        {
            var result = new List<PortRecord>();
            using (var reader = command.ExecuteReader())
                while (reader.Read())
                    result.Add(new PortRecord
                    {
                        Id = Convert.ToInt32(reader["ID"], CultureInfo.InvariantCulture),
                        Code = reader["Code"] as string, Name = reader["Name"] as string, LocalName = reader["LocalName"] as string,
                        CountryID = reader["CountryID"] == DBNull.Value ? (int?)null : Convert.ToInt32(reader["CountryID"], CultureInfo.InvariantCulture),
                        MatchedAlias = readAlias ? reader["MatchedAlias"] as string : null
                    });
            return result;
        }
    }
}

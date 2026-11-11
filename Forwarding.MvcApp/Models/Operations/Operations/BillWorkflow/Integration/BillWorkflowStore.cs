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
using Newtonsoft.Json;

namespace Forwarding.MvcApp.Models.Operations.Operations.BillWorkflow.Integration
{
    public class BillWorkflowStore : IBillWorkflowStore
    {
        private readonly string connectionString;
        private readonly bool isDemo;
        private readonly IBillExtractionAdapter adapter;

        public BillWorkflowStore(string connectionString, bool isDemo, IBillExtractionAdapter adapter)
        {
            if (string.IsNullOrWhiteSpace(connectionString))
                throw new ArgumentException(BillWorkflowMessages.ConnectionRequired);
            if (adapter == null) throw new ArgumentNullException("adapter");
            this.connectionString = connectionString;
            this.isDemo = isDemo;
            this.adapter = adapter;
        }

        // Every query is scoped to the site's current mode, including alias and owner rows.
        public StoredExtraction GetExtraction(Guid extractionId)
        {
            using (var connection = new SqlConnection(connectionString))
            using (var command = connection.CreateCommand())
            {
                command.CommandText = @"
SELECT d.ID, d.ExtractionStatus, d.BillsStatus, d.ResultType, d.EntityName, d.EntityID
FROM dbo.AIDocumentExtraction requested
JOIN dbo.AIDocumentExtraction d ON d.ID = COALESCE(requested.SupersededByExtractionID, requested.ID)
WHERE requested.ID = @DocumentReviewId AND requested.IsDemo = @IsDemo AND d.IsDemo = @IsDemo;";
                AddDocumentParameters(command, extractionId);
                connection.Open();
                using (var reader = command.ExecuteReader())
                {
                    if (!reader.Read()) return null;
                    return new StoredExtraction
                    {
                        ID = (Guid)reader["ID"],
                        ExtractionStatus = (string)reader["ExtractionStatus"],
                        BillsStatus = reader["BillsStatus"] as string,
                        ResultType = reader["ResultType"] as string,
                        EntityName = reader["EntityName"] as string,
                        EntityID = reader["EntityID"] == DBNull.Value ? (long?)null : (long)reader["EntityID"]
                    };
                }
            }
        }

        public IReadOnlyList<BillReviewDetails> StartReview(Guid extractionId, BillContext context, int actingUserId)
        {
            using (var connection = new SqlConnection(connectionString))
            {
                connection.Open();
                using (var transaction = connection.BeginTransaction(IsolationLevel.ReadCommitted))
                using (var command = connection.CreateCommand())
                {
                    command.Transaction = transaction;
                    AddDocumentParameters(command, extractionId);
                    // Serialize starts for this extraction; confirmed bill rows are never reinitialised.
                    command.CommandText = @"
SELECT ID FROM dbo.AIDocumentExtraction WITH (UPDLOCK, HOLDLOCK)
WHERE ID = @DocumentReviewId AND IsDemo = @IsDemo;";
                    if (command.ExecuteScalar() == null)
                        throw new DocumentReviewException(DocumentReviewFailure.NotFound,
                            BillWorkflowCodes.DocumentReviewNotFound, BillWorkflowMessages.DocumentReviewNotFound);
                    var bills = ReadDocumentBills(connection, transaction, extractionId, context);
                    if (bills.Count == 0)
                        throw new DocumentReviewException(DocumentReviewFailure.Conflict,
                            BillWorkflowCodes.NoBillsToReview, BillWorkflowMessages.NoBillsToReview);
                    command.Parameters.Add("@ContextJson", SqlDbType.NVarChar, -1).Value = JsonConvert.SerializeObject(new StoredContext
                    {
                        Direction = context.Direction, Version = context.Version
                    });
                    command.Parameters.Add("@UserId", SqlDbType.Int).Value = actingUserId;
                    command.CommandText = @"
UPDATE dbo.AIDocumentExtraction
SET ReviewContextJson = @ContextJson, ReviewOwnerUserID = COALESCE(ReviewOwnerUserID, @UserId)
WHERE ID = @DocumentReviewId AND IsDemo = @IsDemo;";
                    command.ExecuteNonQuery();
                    foreach (var bill in bills.Where(item => item.ReviewStatus == BillReviewStatus.NotStarted))
                    {
                        using (var update = connection.CreateCommand())
                        {
                            update.Transaction = transaction;
                            update.CommandText = @"
UPDATE dbo.AIDocumentBills
SET ReviewStatus = 1, ReferenceResolutionsJson = '[]', IssuesJson = @Issues,
    UpdatedBy = @UserId, UpdatedAt = @UpdatedAt
WHERE ID = @BillReviewId AND AIDocumentExtractionID = @DocumentReviewId AND ReviewStatus = 0;";
                            update.Parameters.Add("@BillReviewId", SqlDbType.UniqueIdentifier).Value = bill.BillReviewId;
                            update.Parameters.Add("@DocumentReviewId", SqlDbType.UniqueIdentifier).Value = extractionId;
                            update.Parameters.Add("@Issues", SqlDbType.NVarChar, -1).Value = JsonConvert.SerializeObject(bill.Issues);
                            update.Parameters.Add("@UserId", SqlDbType.Int).Value = actingUserId;
                            update.Parameters.Add("@UpdatedAt", SqlDbType.DateTime2).Value = DateTime.Now;
                            update.ExecuteNonQuery();
                        }
                    }
                    // Read actual persisted states, including work completed by another reviewer.
                    bills = ReadDocumentBills(connection, transaction, extractionId, context);
                    transaction.Commit();
                    return bills;
                }
            }
        }

        private const string BillColumns = @"
d.ID AS DocumentReviewId, d.EntityID, d.ReviewContextJson,
b.ID AS BillReviewId, b.BillIndex, b.Version, b.ReviewStatus, b.BillJson, b.BillWithConfidenceJson,
b.ReferenceResolutionsJson, b.IssuesJson, b.CompletedBy, b.CompletedAt";

        private List<BillReviewDetails> ReadDocumentBills(SqlConnection connection, SqlTransaction transaction,
            Guid extractionId, BillContext context)
        {
            using (var command = connection.CreateCommand())
            {
                command.Transaction = transaction;
                command.CommandText = "SELECT " + BillColumns + @"
FROM dbo.AIDocumentBills b
JOIN dbo.AIDocumentExtraction d ON d.ID = b.AIDocumentExtractionID
WHERE d.ID = @DocumentReviewId AND d.IsDemo = @IsDemo
ORDER BY b.BillIndex;";
                AddDocumentParameters(command, extractionId);
                var bills = new List<BillReviewDetails>();
                using (var reader = command.ExecuteReader())
                    while (reader.Read())
                    {
                        var bill = ReadBillReviewDetails(reader);
                        bill.Context = context;
                        bills.Add(bill);
                    }
                return bills;
            }
        }

        public BillReviewDetails GetBillReview(Guid billReviewId)
        {
            using (var connection = new SqlConnection(connectionString))
            using (var command = connection.CreateCommand())
            {
                command.CommandText = "SELECT " + BillColumns + @"
FROM dbo.AIDocumentBills b
JOIN dbo.AIDocumentExtraction d ON d.ID = b.AIDocumentExtractionID
WHERE b.ID = @BillReviewId AND d.IsDemo = @IsDemo;";
                command.Parameters.Add("@BillReviewId", SqlDbType.UniqueIdentifier).Value = billReviewId;
                command.Parameters.Add("@IsDemo", SqlDbType.Bit).Value = isDemo;
                connection.Open();
                using (var reader = command.ExecuteReader())
                    return reader.Read() ? ReadBillReviewDetails(reader) : null;
            }
        }

        public BillReviewPage GetBillReviews(Guid documentReviewId, int page, int pageSize)
        {
            if (page < 1 || pageSize < 1 || pageSize > DocumentReviewService.MaximumBillPageSize)
                throw new ArgumentException(string.Format(BillWorkflowMessages.BillReviewsRequestRequired,
                    DocumentReviewService.MaximumBillPageSize));
            using (var connection = new SqlConnection(connectionString))
            using (var command = connection.CreateCommand())
            {
                command.CommandText = @"
SELECT d.EntityID, d.ReviewContextJson,
       (SELECT COUNT(*) FROM dbo.AIDocumentBills b
        WHERE b.AIDocumentExtractionID = d.ID AND b.ReviewStatus >= 1) AS TotalCount
FROM dbo.AIDocumentExtraction d
WHERE d.ID = @DocumentReviewId AND d.IsDemo = @IsDemo;

SELECT " + BillColumns + @"
FROM dbo.AIDocumentBills b
JOIN dbo.AIDocumentExtraction d ON d.ID = b.AIDocumentExtractionID
WHERE d.ID = @DocumentReviewId AND d.IsDemo = @IsDemo AND b.ReviewStatus >= 1
ORDER BY b.BillIndex
OFFSET @Skip ROWS FETCH NEXT @PageSize ROWS ONLY;";
                AddDocumentParameters(command, documentReviewId);
                command.Parameters.Add("@Skip", SqlDbType.BigInt).Value = ((long)page - 1) * pageSize;
                command.Parameters.Add("@PageSize", SqlDbType.Int).Value = pageSize;
                connection.Open();
                using (var reader = command.ExecuteReader())
                {
                    if (!reader.Read()) return null;
                    var result = new BillReviewPage
                    {
                        Page = page, PageSize = pageSize, TotalCount = (int)reader["TotalCount"],
                        Context = ReadContext(reader), ReviewStarted = reader["ReviewContextJson"] != DBNull.Value
                    };
                    reader.NextResult();
                    while (reader.Read()) result.Items.Add(ReadBillReviewDetails(reader));
                    return result;
                }
            }
        }

        public BillReviewDetails ConfirmReferences(BillReviewDetails review, int expectedVersion, int actingUserId)
        {
            if (review == null || review.DocumentReviewId == Guid.Empty || review.BillReviewId == Guid.Empty ||
                expectedVersion <= 0 || actingUserId <= 0 || review.ReferenceResolutions == null ||
                review.Issues == null || review.Issues.Count != 0)
                throw new ArgumentException(BillWorkflowMessages.ValidatedConfirmationRequired);
            using (var connection = new SqlConnection(connectionString))
            {
                connection.Open();
                using (var transaction = connection.BeginTransaction(IsolationLevel.ReadCommitted))
                {
                    var confirmed = SaveConfirmedReferences(connection, transaction, review, expectedVersion, actingUserId);
                    if (!isDemo && review.RememberAlias)
                        RememberCustomerAlias(connection, transaction, review, actingUserId);
                    transaction.Commit();
                    return confirmed;
                }
            }
        }

        private BillReviewDetails SaveConfirmedReferences(SqlConnection connection, SqlTransaction transaction,
            BillReviewDetails review, int expectedVersion, int actingUserId)
        {
            using (var command = connection.CreateCommand())
            {
                command.Transaction = transaction;
                command.CommandText = @"
UPDATE b
SET ReferenceResolutionsJson = @References, IssuesJson = @Issues,
    ReviewStatus = 2, CompletedBy = @UserId, CompletedAt = @UpdatedAt,
    UpdatedBy = @UserId, UpdatedAt = @UpdatedAt, Version = b.Version + 1
OUTPUT d.ID AS DocumentReviewId, d.EntityID, d.ReviewContextJson,
       inserted.ID AS BillReviewId, inserted.BillIndex, inserted.Version, inserted.ReviewStatus,
       inserted.BillJson, inserted.BillWithConfidenceJson, inserted.ReferenceResolutionsJson,
       inserted.IssuesJson, inserted.CompletedBy, inserted.CompletedAt
FROM dbo.AIDocumentBills b
JOIN dbo.AIDocumentExtraction d ON d.ID = b.AIDocumentExtractionID
WHERE b.ID = @BillReviewId AND b.AIDocumentExtractionID = @DocumentReviewId
  AND b.Version = @ExpectedVersion AND b.ReviewStatus = 1 AND d.IsDemo = @IsDemo;";
                AddDocumentParameters(command, review.DocumentReviewId);
                command.Parameters.Add("@BillReviewId", SqlDbType.UniqueIdentifier).Value = review.BillReviewId;
                command.Parameters.Add("@ExpectedVersion", SqlDbType.Int).Value = expectedVersion;
                command.Parameters.Add("@UserId", SqlDbType.Int).Value = actingUserId;
                command.Parameters.Add("@References", SqlDbType.NVarChar, -1).Value = JsonConvert.SerializeObject(review.ReferenceResolutions);
                command.Parameters.Add("@Issues", SqlDbType.NVarChar, -1).Value = JsonConvert.SerializeObject(review.Issues);
                command.Parameters.Add("@UpdatedAt", SqlDbType.DateTime2).Value = DateTime.Now;
                using (var reader = command.ExecuteReader())
                    if (reader.Read()) return ReadBillReviewDetails(reader);
                throw CreateUpdateException(connection, review.DocumentReviewId, review.BillReviewId, transaction);
            }
        }

        private static void RememberCustomerAlias(SqlConnection connection, SqlTransaction transaction,
            BillReviewDetails review, int actingUserId)
        {
            var resolution = review.ReferenceResolutions.Single(result => result.Reference.Role == "Customer");
            
            if (!CustomerResolver.HasUsableName(resolution.SearchValue)) return;
            var normalized = CustomerAliasRules.Normalize(resolution.SearchValue);
            var customerId = resolution.Reference.Id.Value;
            using (var command = connection.CreateCommand())
            {
                command.Transaction = transaction;
                command.Parameters.Add("@AliasHash", SqlDbType.Binary, 32).Value = CustomerAliasRules.GetHash(normalized);
                command.Parameters.Add("@NormalizedAlias", SqlDbType.NVarChar, CustomerResolver.MaximumNameLength).Value = normalized;
                // Serialize writes for the same alias across different bill reviews before checking/inserting it.
                command.CommandText = @"
SELECT CustomerID, IsActive, NormalizedAlias
FROM dbo.CustomerAliases WITH (UPDLOCK, HOLDLOCK, INDEX(IX_CustomerAliases_Hash_Active))
WHERE AliasHash = @AliasHash;";
                var exists = false;
                using (var reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        if (!string.Equals((string)reader["NormalizedAlias"], normalized, StringComparison.Ordinal)) continue;
                        var sameCustomer = (int)reader["CustomerID"] == customerId;
                        var active = (bool)reader["IsActive"];
                        if ((active && !sameCustomer) || (sameCustomer && !active))
                            throw new DocumentReviewException(DocumentReviewFailure.Conflict, BillWorkflowCodes.CustomerAliasConflict,
                                BillWorkflowMessages.CustomerAliasConflict);
                        if (sameCustomer && active) exists = true;
                    }
                }
                if (exists) return;
                command.Parameters.Add("@CustomerID", SqlDbType.Int).Value = customerId;
                command.Parameters.Add("@Alias", SqlDbType.NVarChar, CustomerResolver.MaximumNameLength).Value = resolution.SearchValue;
                command.Parameters.Add("@ActingUserID", SqlDbType.Int).Value = actingUserId;
                command.Parameters.Add("@BillReviewID", SqlDbType.UniqueIdentifier).Value = review.BillReviewId;
                command.Parameters.Add("@CreatedAt", SqlDbType.DateTime2).Value = DateTime.Now;
                command.CommandText = @"
INSERT dbo.CustomerAliases (CustomerID, Alias, NormalizedAlias, AliasHash, CreatedBy, CreatedAt, SourceAIDocumentBillID)
VALUES (@CustomerID, @Alias, @NormalizedAlias, @AliasHash, @ActingUserID, @CreatedAt, @BillReviewID);";
                command.ExecuteNonQuery();
            }
        }

        private void AddDocumentParameters(SqlCommand command, Guid documentReviewId)
        {
            command.Parameters.Add("@DocumentReviewId", SqlDbType.UniqueIdentifier).Value = documentReviewId;
            command.Parameters.Add("@IsDemo", SqlDbType.Bit).Value = isDemo;
        }

        private static BillContext ReadContext(SqlDataReader reader)
        {
            var json = reader["ReviewContextJson"] as string;
            var context = json == null ? null : JsonConvert.DeserializeObject<StoredContext>(json);
            if (json != null && (context == null || string.IsNullOrWhiteSpace(context.Direction) || string.IsNullOrWhiteSpace(context.Version)))
                throw new JsonSerializationException(BillWorkflowMessages.StoredContextInvalid);
            return new BillContext
            {
                ParentReference = reader["EntityID"] == DBNull.Value ? null : ((long)reader["EntityID"]).ToString(CultureInfo.InvariantCulture),
                Direction = context == null ? null : context.Direction,
                Version = context == null ? null : context.Version
            };
        }

        private BillReviewDetails ReadBillReviewDetails(SqlDataReader reader)
        {
            var parsed = adapter.ReadStoredBill((string)reader["BillJson"], (string)reader["BillWithConfidenceJson"]);
            var status = (BillReviewStatus)(int)reader["ReviewStatus"];
            return new BillReviewDetails
            {
                DocumentReviewId = (Guid)reader["DocumentReviewId"], BillReviewId = (Guid)reader["BillReviewId"],
                BillIndex = (int)reader["BillIndex"], Version = (int)reader["Version"], ReviewStatus = status,
                Context = ReadContext(reader), Bill = parsed.Bill,
                Issues = status == BillReviewStatus.NotStarted ? parsed.Issues :
                    JsonConvert.DeserializeObject<List<ValidationIssue>>((string)reader["IssuesJson"]),
                ReferenceResolutions = status == BillReviewStatus.NotStarted ? new List<ReferenceResolution>() :
                    JsonConvert.DeserializeObject<List<ReferenceResolution>>((string)reader["ReferenceResolutionsJson"]),
                CompletedBy = reader["CompletedBy"] == DBNull.Value ? (int?)null : (int)reader["CompletedBy"],
                CompletedAt = reader["CompletedAt"] == DBNull.Value ? (DateTime?)null :
                    DateTime.SpecifyKind((DateTime)reader["CompletedAt"], DateTimeKind.Local)
            };
        }

        private DocumentReviewException CreateUpdateException(SqlConnection connection, Guid documentReviewId,
            Guid billReviewId, SqlTransaction transaction)
        {
            using (var command = connection.CreateCommand())
            {
                command.Transaction = transaction;
                command.CommandText = @"
SELECT b.ID FROM dbo.AIDocumentExtraction d
LEFT JOIN dbo.AIDocumentBills b ON b.AIDocumentExtractionID = d.ID AND b.ID = @BillReviewId
WHERE d.ID = @DocumentReviewId AND d.IsDemo = @IsDemo;";
                AddDocumentParameters(command, documentReviewId);
                command.Parameters.Add("@BillReviewId", SqlDbType.UniqueIdentifier).Value = billReviewId;
                using (var reader = command.ExecuteReader())
                {
                    if (!reader.Read())
                        return new DocumentReviewException(DocumentReviewFailure.NotFound,
                            BillWorkflowCodes.DocumentReviewNotFound, BillWorkflowMessages.DocumentReviewNotFound);
                    if (reader.IsDBNull(0))
                        return new DocumentReviewException(DocumentReviewFailure.NotFound,
                            BillWorkflowCodes.BillReviewNotFound, BillWorkflowMessages.BillReviewNotInDocument);
                }
            }
            return new DocumentReviewException(DocumentReviewFailure.Conflict,
                BillWorkflowCodes.BillReviewVersionChanged, BillWorkflowMessages.BillReviewVersionChanged);
        }

        private class StoredContext
        {
            public string Direction { get; set; }
            public string Version { get; set; }
        }
    }
}

using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using BillWorkflow.Common.Abstractions;
using BillWorkflow.Common.Contracts;
using BillWorkflow.Common.Exceptions;
using BillWorkflow.Common.Services;
using Newtonsoft.Json;
using BillWorkflow.Common.Validation;

namespace Forwarding.MvcApp.Models.Operations.Operations.BillWorkflow.Integration
{
    public class BillWorkflowStore : IBillWorkflowStore
    {
        private readonly string connectionString;

        public BillWorkflowStore(string connectionString)
        {
            if (string.IsNullOrWhiteSpace(connectionString))
                throw new ArgumentException(BillWorkflowMessages.ConnectionRequired);
            this.connectionString = connectionString;
        }

        public void Save(DocumentReview documentReview, int ownerUserId)
        {
            if (documentReview == null || documentReview.DocumentReviewId == Guid.Empty || ownerUserId <= 0 ||
                documentReview.Context == null || string.IsNullOrWhiteSpace(documentReview.Context.ParentReference) ||
                string.IsNullOrWhiteSpace(documentReview.Context.Direction) || string.IsNullOrWhiteSpace(documentReview.Context.Version) ||
                string.IsNullOrWhiteSpace(documentReview.SourceProfile) ||
                documentReview.BillReviews == null || documentReview.BillReviews.Count == 0)
                throw new ArgumentException(BillWorkflowMessages.DocumentReviewDataRequired);

            using (var connection = new SqlConnection(connectionString))
            {
                connection.Open();
                using (var transaction = connection.BeginTransaction(IsolationLevel.ReadCommitted))
                {
                    // One transaction owns the parent and every bill. Uncommitted work is rolled back on disposal.
                    InsertDocument(connection, transaction, documentReview, ownerUserId);
                    foreach (var billReview in documentReview.BillReviews)
                        InsertBill(connection, transaction, documentReview.DocumentReviewId, billReview, ownerUserId);
                    transaction.Commit();
                }
            }
        }

        public BillReviewDetails GetBillReview(Guid billReviewId, int ownerUserId)
        {
            if (billReviewId == Guid.Empty || ownerUserId <= 0)
                return null;
            using (var connection = new SqlConnection(connectionString))
            using (var command = connection.CreateCommand())
            {
                // Read the bill and its parent context together; siblings are not loaded.
                command.CommandText = @"
SELECT d.ID AS DocumentReviewId, d.SourceProfile, d.ParentReference, d.ContextJson,
       b.ID AS BillReviewId, b.Version, b.ReviewStatus, b.BillReviewJson, b.CompletedBy, b.CompletedAt
FROM dbo.BillReviews b
JOIN dbo.DocumentReviews d ON d.ID = b.DocumentReviewID
WHERE b.ID = @BillReviewId AND d.OwnerUserId = @OwnerUserId;";
                command.Parameters.Add("@BillReviewId", SqlDbType.UniqueIdentifier).Value = billReviewId;
                command.Parameters.Add("@OwnerUserId", SqlDbType.Int).Value = ownerUserId;
                connection.Open();
                using (var reader = command.ExecuteReader())
                {
                    if (!reader.Read()) return null;
                    return ReadBillReviewDetails(reader);
                }
            }
        }

        public BillReviewPage GetBillReviews(Guid documentReviewId, int page, int pageSize, int ownerUserId)
        {
            if (documentReviewId == Guid.Empty || ownerUserId <= 0) return null;
            if (page < 1 || pageSize < 1 || pageSize > DocumentReviewService.MaximumBillPageSize)
                throw new ArgumentException(string.Format(BillWorkflowMessages.BillReviewsRequestRequired,
                    DocumentReviewService.MaximumBillPageSize));

            using (var connection = new SqlConnection(connectionString))
            using (var command = connection.CreateCommand())
            {
                // Count metadata first; fetch/deserialise only the requested rows in extraction order.
                command.CommandText = @"
SELECT d.SourceProfile, d.ParentReference, d.ContextJson,
       (SELECT COUNT(*) FROM dbo.BillReviews b WHERE b.DocumentReviewID = d.ID) AS TotalCount
FROM dbo.DocumentReviews d
WHERE d.ID = @DocumentReviewId AND d.OwnerUserId = @OwnerUserId;

SELECT d.ID AS DocumentReviewId, d.SourceProfile, d.ParentReference, d.ContextJson,
       b.ID AS BillReviewId, b.Version, b.ReviewStatus, b.BillReviewJson, b.CompletedBy, b.CompletedAt
FROM dbo.BillReviews b
JOIN dbo.DocumentReviews d ON d.ID = b.DocumentReviewID
WHERE d.ID = @DocumentReviewId AND d.OwnerUserId = @OwnerUserId
ORDER BY b.SourceIndex
OFFSET @Skip ROWS FETCH NEXT @PageSize ROWS ONLY;";
                AddDocumentParameters(command, documentReviewId, ownerUserId);
                command.Parameters.Add("@Skip", SqlDbType.BigInt).Value = ((long)page - 1) * pageSize;
                command.Parameters.Add("@PageSize", SqlDbType.Int).Value = pageSize;
                connection.Open();
                using (var reader = command.ExecuteReader())
                {
                    if (!reader.Read()) return null;
                    var result = new BillReviewPage
                    {
                        Page = page,
                        PageSize = pageSize,
                        TotalCount = (int)reader["TotalCount"],
                        SourceProfile = (string)reader["SourceProfile"],
                        Context = ReadContext(reader)
                    };
                    reader.NextResult();
                    while (reader.Read())
                        result.Items.Add(ReadBillReviewDetails(reader));
                    return result;
                }
            }
        }

        public BillReviewDetails ConfirmReferences(BillReviewDetails review, int expectedVersion, int ownerUserId)
        {
            if (review == null || review.DocumentReviewId == Guid.Empty || review.BillReviewId == Guid.Empty ||
                expectedVersion <= 0 || ownerUserId <= 0 || review.ReferenceResolutions == null ||
                review.Issues == null || review.Issues.Count != 0)
                throw new ArgumentException(BillWorkflowMessages.ValidatedConfirmationRequired);

            using (var connection = new SqlConnection(connectionString))
            {
                connection.Open();
                using (var transaction = connection.BeginTransaction(IsolationLevel.ReadCommitted))
                {
                    var confirmed = SaveConfirmedReferences(connection, transaction, review, expectedVersion, ownerUserId);
                    if (review.RememberAlias)
                        RememberCustomerAlias(connection, transaction, review, ownerUserId);
                    transaction.Commit();
                    return confirmed;
                }
            }
        }

        private static BillReviewDetails SaveConfirmedReferences(SqlConnection connection, SqlTransaction transaction,
            BillReviewDetails review, int expectedVersion, int ownerUserId)
        {
            using (var command = connection.CreateCommand())
            {
                command.Transaction = transaction;
                command.CommandText = @"
UPDATE b
SET BillReviewJson = JSON_MODIFY(
        JSON_MODIFY(b.BillReviewJson, '$.ReferenceResolutions', JSON_QUERY(@References)),
        '$.Issues', JSON_QUERY(@Issues)),
    ReviewStatus = @ReviewStatus, CompletedBy = @OwnerUserId, CompletedAt = @UpdatedAt,
    UpdatedBy = @OwnerUserId, UpdatedAt = @UpdatedAt, Version = b.Version + 1
OUTPUT d.ID AS DocumentReviewId, d.SourceProfile, d.ParentReference, d.ContextJson,
       inserted.ID AS BillReviewId, inserted.Version, inserted.ReviewStatus, inserted.BillReviewJson,
       inserted.CompletedBy, inserted.CompletedAt
FROM dbo.BillReviews b
JOIN dbo.DocumentReviews d ON d.ID = b.DocumentReviewID
WHERE b.DocumentReviewID = @DocumentReviewId AND b.ID = @BillReviewId
  AND d.OwnerUserId = @OwnerUserId AND b.Version = @ExpectedVersion
  AND b.ReviewStatus <> @ReviewStatus;";
                AddDocumentParameters(command, review.DocumentReviewId, ownerUserId);
                command.Parameters.Add("@BillReviewId", SqlDbType.UniqueIdentifier).Value = review.BillReviewId;
                command.Parameters.Add("@ExpectedVersion", SqlDbType.Int).Value = expectedVersion;
                command.Parameters.Add("@ReviewStatus", SqlDbType.Int).Value = (int)BillReviewStatus.ReferencesConfirmed;
                command.Parameters.Add("@References", SqlDbType.NVarChar, -1).Value = JsonConvert.SerializeObject(review.ReferenceResolutions);
                command.Parameters.Add("@Issues", SqlDbType.NVarChar, -1).Value = JsonConvert.SerializeObject(review.Issues);
                command.Parameters.Add("@UpdatedAt", SqlDbType.DateTime2).Value = DateTime.Now;
                using (var reader = command.ExecuteReader())
                    if (reader.Read()) return ReadBillReviewDetails(reader);
                throw CreateUpdateException(connection, review.DocumentReviewId, review.BillReviewId, ownerUserId, transaction);
            }
        }

        private static void RememberCustomerAlias(SqlConnection connection, SqlTransaction transaction,
            BillReviewDetails review, int ownerUserId)
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
                command.Parameters.Add("@OwnerUserID", SqlDbType.Int).Value = ownerUserId;
                command.Parameters.Add("@BillReviewID", SqlDbType.UniqueIdentifier).Value = review.BillReviewId;
                command.Parameters.Add("@CreatedAt", SqlDbType.DateTime2).Value = DateTime.Now;
                command.CommandText = @"
INSERT dbo.CustomerAliases (CustomerID, Alias, NormalizedAlias, AliasHash, CreatedBy, CreatedAt, SourceBillReviewID)
VALUES (@CustomerID, @Alias, @NormalizedAlias, @AliasHash, @OwnerUserID, @CreatedAt, @BillReviewID);";
                command.ExecuteNonQuery();
            }
        }

        private static void InsertDocument(SqlConnection connection, SqlTransaction transaction,
            DocumentReview documentReview, int ownerUserId)
        {
            using (var command = connection.CreateCommand())
            {
                command.Transaction = transaction;
                command.CommandText = @"
INSERT INTO dbo.DocumentReviews
    (ID, OwnerUserId, ParentReference, SourceProfile, ContextJson, CreatedAt)
VALUES
    (@DocumentReviewId, @OwnerUserId, @ParentReference, @SourceProfile, @ContextJson, @CreatedAt);";
                AddDocumentParameters(command, documentReview.DocumentReviewId, ownerUserId);
                command.Parameters.Add("@ParentReference", SqlDbType.NVarChar, 100).Value = documentReview.Context.ParentReference;
                command.Parameters.Add("@SourceProfile", SqlDbType.NVarChar, 100).Value = documentReview.SourceProfile;
                command.Parameters.Add("@ContextJson", SqlDbType.NVarChar, -1).Value = JsonConvert.SerializeObject(new StoredContext
                {
                    Direction = documentReview.Context.Direction,
                    Version = documentReview.Context.Version
                });
                command.Parameters.Add("@CreatedAt", SqlDbType.DateTime2).Value = documentReview.CreatedAt;
                command.ExecuteNonQuery();
            }
        }

        private static void InsertBill(SqlConnection connection, SqlTransaction transaction,
            Guid documentReviewId, BillReview billReview, int ownerUserId)
        {
            ValidateBill(billReview);
            if (billReview.Version != 1)
                throw new ArgumentException(BillWorkflowMessages.NewBillVersionRequired);
            using (var command = connection.CreateCommand())
            {
                command.Transaction = transaction;
                command.CommandText = @"
INSERT INTO dbo.BillReviews
    (ID, DocumentReviewID, SourceIndex, Version, ReviewStatus, OriginalJson,
     BillReviewJson, CompletedBy, CompletedAt, UpdatedBy, UpdatedAt)
VALUES
    (@BillReviewId, @DocumentReviewId, @SourceIndex, 1, @ReviewStatus, @OriginalJson,
     @BillReviewJson, NULL, NULL, @OwnerUserId, @UpdatedAt);";
                AddDocumentParameters(command, documentReviewId, ownerUserId);
                AddBillParameters(command, billReview);
                command.Parameters.Add("@SourceIndex", SqlDbType.Int).Value = billReview.SourceIndex;
                command.Parameters.Add("@OriginalJson", SqlDbType.NVarChar, -1).Value = billReview.OriginalJson;
                command.ExecuteNonQuery();
            }
        }

        private static void AddDocumentParameters(SqlCommand command, Guid documentReviewId, int ownerUserId)
        {
            command.Parameters.Add("@DocumentReviewId", SqlDbType.UniqueIdentifier).Value = documentReviewId;
            command.Parameters.Add("@OwnerUserId", SqlDbType.Int).Value = ownerUserId;
        }

        private static void AddBillParameters(SqlCommand command, BillReview billReview)
        {
            command.Parameters.Add("@BillReviewId", SqlDbType.UniqueIdentifier).Value = billReview.BillReviewId;
            command.Parameters.Add("@ReviewStatus", SqlDbType.Int).Value = (int)billReview.ReviewStatus;
            command.Parameters.Add("@BillReviewJson", SqlDbType.NVarChar, -1).Value = JsonConvert.SerializeObject(new StoredBillData
            {
                Bill = billReview.Bill,
                ReferenceResolutions = billReview.ReferenceResolutions,
                Issues = billReview.Issues
            });
            command.Parameters.Add("@UpdatedAt", SqlDbType.DateTime2).Value = DateTime.Now;
        }

        private static BillContext ReadContext(SqlDataReader reader)
        {
            var context = JsonConvert.DeserializeObject<StoredContext>((string)reader["ContextJson"]);
            if (context == null || string.IsNullOrWhiteSpace(context.Direction) || string.IsNullOrWhiteSpace(context.Version))
                throw new JsonSerializationException(BillWorkflowMessages.StoredContextInvalid);
            return new BillContext
            {
                ParentReference = (string)reader["ParentReference"],
                Direction = context.Direction,
                Version = context.Version
            };
        }

        private static BillReviewDetails ReadBillReviewDetails(SqlDataReader reader)
        {
            var data = ReadStoredBillData(reader);
            return new BillReviewDetails
            {
                DocumentReviewId = (Guid)reader["DocumentReviewId"],
                BillReviewId = (Guid)reader["BillReviewId"],
                Version = (int)reader["Version"],
                ReviewStatus = (BillReviewStatus)(int)reader["ReviewStatus"],
                SourceProfile = (string)reader["SourceProfile"],
                Context = ReadContext(reader),
                Bill = data.Bill,
                Issues = data.Issues,
                ReferenceResolutions = data.ReferenceResolutions,
                CompletedBy = reader["CompletedBy"] == DBNull.Value ? (int?)null : (int)reader["CompletedBy"],
                CompletedAt = reader["CompletedAt"] == DBNull.Value ? (DateTime?)null :
                    DateTime.SpecifyKind((DateTime)reader["CompletedAt"], DateTimeKind.Local)
            };
        }

        private static StoredBillData ReadStoredBillData(SqlDataReader reader)
        {
            var data = JsonConvert.DeserializeObject<StoredBillData>((string)reader["BillReviewJson"]);
            if (data == null || data.Bill == null || data.ReferenceResolutions == null || data.Issues == null ||
                data.ReferenceResolutions.Any(result => result == null || result.Reference == null))
                throw new JsonSerializationException(BillWorkflowMessages.StoredBillReviewInvalid);
            return data;
        }

        private static void ValidateBill(BillReview billReview)
        {
            if (billReview == null || billReview.BillReviewId == Guid.Empty || billReview.Bill == null ||
                billReview.ReferenceResolutions == null || billReview.Issues == null)
                throw new ArgumentException(BillWorkflowMessages.BillReviewDataRequired);
        }

        private static DocumentReviewException CreateUpdateException(SqlConnection connection, Guid documentReviewId, Guid billReviewId, int ownerUserId, SqlTransaction transaction)
        {
            using (var command = connection.CreateCommand())
            {
                command.Transaction = transaction;
                command.CommandText = @"
SELECT b.ID FROM dbo.DocumentReviews d
LEFT JOIN dbo.BillReviews b ON b.DocumentReviewID = d.ID AND b.ID = @BillReviewId
WHERE d.ID = @DocumentReviewId AND d.OwnerUserId = @OwnerUserId;";
                AddDocumentParameters(command, documentReviewId, ownerUserId);
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

        private class StoredBillData
        {
            public BillOfLading Bill { get; set; }
            public List<ReferenceResolution> ReferenceResolutions { get; set; }
            public List<ValidationIssue> Issues { get; set; }
        }
    }
}

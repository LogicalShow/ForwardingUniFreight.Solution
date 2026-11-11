using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Diagnostics;
using System.Globalization;
using System.IO;

namespace Forwarding.MvcApp.DocAi
{
    // A claimed document carries the sender or refresh data together with its claim token.
    public class ClaimedRow
    {
        public Guid LocalId;
        public string Status;
        public Guid? RemoteJobId;
        public short? RemoteRunNo;
        public Guid ClaimToken;
        public string StoredFileName;
        public string DocumentTypeCode;
        public string ShippingLineCode;
        public bool Reprocess;
    }

    // Carries one stored document and its persisted bills to the screen.
    public class AiDocumentView
    {
        public Guid LocalId;
        public string Status;
        public string OriginalFileName;
        public short? PageCount;
        public string ErrorCode;
        public string ErrorMessage;
        public string ResultJson;
        public string BillsStatus;
        public int? BillsExpectedCount;
        public DocAiBillRow[] Bills = new DocAiBillRow[0];
        public string ResolvedDocumentTypeCode;
        public string ResultType;
        public string RunReason;
        public string ChangesJson;
        public DateTime? NextSubmitAt;
        public int SubmitAttempts;
        public DateTime CreatedAt;
        public DateTime? CompletedAt;
    }

    // Stores document intents, claims, outcomes and bills in the company database using parameterized commands.
    // Uses the solution connection string, including the company identity in dbo.DocAiIdentity.
    public static class AiDocumentsStore
    {
        // All remote bindings take the same transaction-owned job/run application lock (no HTTP inside it).
        // A global unique run index is invalid: different entities/modes may legitimately share a run.
        private const string BindRunSql = @"
SET XACT_ABORT ON;
BEGIN TRANSACTION;
DECLARE @owner uniqueidentifier, @lockResult int, @lockResource nvarchar(255), @bindingCount int = 0;
-- All binders of this job/run share the key, including webhook-before-POST races.
SET @lockResource = N'DocAi:run:' + CONVERT(nvarchar(36), @remoteJobId) + N':' + CONVERT(nvarchar(6), @runNo);
EXEC @lockResult = sys.sp_getapplock @Resource = @lockResource,
    @LockOwner = 'Transaction', @LockMode = 'Exclusive', @LockTimeout = 10000;
IF @lockResult < 0
BEGIN
    ROLLBACK TRANSACTION;
    THROW 50003, 'DocAi identity lock unavailable. Retry the same request.', 1;
END;
SELECT TOP (1) @owner = d.ID
FROM dbo.AIDocumentExtraction d JOIN dbo.AIDocumentExtraction source ON source.ID = @localId
WHERE d.RemoteJobId = @remoteJobId AND d.RemoteRunNo = @runNo
  AND d.IsDemo = source.IsDemo AND d.SupersededByExtractionID IS NULL
  AND (d.EntityName = source.EntityName OR (d.EntityName IS NULL AND source.EntityName IS NULL))
  AND (d.EntityID = source.EntityID OR (d.EntityID IS NULL AND source.EntityID IS NULL))
ORDER BY d.CreatedAt, d.ID;
IF @owner IS NOT NULL AND @owner <> @localId
BEGIN
    UPDATE dbo.AIDocumentExtraction SET SupersededByExtractionID = @owner, ExtractionStatus = 'Failed',
        ErrorCode = 'DUPLICATE', CompletedAt = GETDATE(), ClaimToken = NULL
    WHERE ID = @localId AND SupersededByExtractionID IS NULL
      AND ExtractionStatus IN ('Pending', 'Submitted');
    SET @bindingCount = @bindingCount + @@ROWCOUNT;
    UPDATE dbo.AIDocumentExtraction SET SupersededByExtractionID = @owner WHERE SupersededByExtractionID = @localId;
    SET @bindingCount = @bindingCount + @@ROWCOUNT;
END
";
        private const string RepairBillsSql = @"
SET XACT_ABORT ON;
BEGIN TRANSACTION;
IF EXISTS (SELECT 1 FROM dbo.AIDocumentExtraction WITH (UPDLOCK, HOLDLOCK)
    WHERE ID = @localId AND ExtractionStatus = 'Completed' AND ResultJson IS NOT NULL AND ResultPurgedAt IS NULL
      AND (BillsStatus IS NULL OR (@retryFailed = 1 AND BillsStatus = 'Failed')) AND ResultJson = @body)
BEGIN
    -- An unexpected existing set is never overwritten or certified as complete.
    IF NOT EXISTS (SELECT 1 FROM dbo.AIDocumentBills WITH (UPDLOCK, HOLDLOCK) WHERE AIDocumentExtractionID = @localId)
    BEGIN
        INSERT dbo.AIDocumentBills (AIDocumentExtractionID, BillIndex, BillJson, BillWithConfidenceJson)
        SELECT @localId, BillIndex, BillJson, BillWithConfidenceJson FROM @bills;
        UPDATE dbo.AIDocumentExtraction SET BillsStatus = @billsStatus, BillsExpectedCount = @expectedCount WHERE ID = @localId;
    END
    ELSE UPDATE dbo.AIDocumentExtraction SET BillsStatus = 'Failed', BillsExpectedCount = NULL WHERE ID = @localId;
END;
COMMIT TRANSACTION;";

        private static readonly object BillsRepairGate = new object();
        private static DateTime _lastFailedBillsRetryUtc = DateTime.MinValue;

        private static string ConnectionString =>
            ConfigurationManager.ConnectionStrings["ConnectionString"].ConnectionString;

        // Reuses the same file, requested type, line and business record while its row remains eligible.
        public static Guid? FindSame(
            byte[] fileSha256,
            string documentTypeCode,
            string shippingLineCode,
            string entityName,
            long? entityId,
            bool isDemo)
        {
            const string sql = @"
SELECT TOP (1) ID, ExtractionStatus, RemoteJobId, RemoteRunNo
FROM dbo.AIDocumentExtraction
WHERE FileSha256 = @fileSha256 AND RequestedDocumentTypeCode = @documentTypeCode
  AND (RequestedShippingLineCode = @shippingLineCode OR (RequestedShippingLineCode IS NULL AND @shippingLineCode IS NULL))
  AND (EntityName = @entityName OR (EntityName IS NULL AND @entityName IS NULL))
  AND (EntityID   = @entityId   OR (EntityID   IS NULL AND @entityId   IS NULL))
  AND ((@isDemo = 1 AND ExtractionStatus <> 'Failed' AND ResultPurgedAt IS NULL)
       OR (@isDemo = 0 AND ExtractionStatus IN ('Pending', 'Submitted')))
  AND SupersededByExtractionID IS NULL AND IsDemo = @isDemo
ORDER BY CreatedAt DESC, ID DESC;";
            return Execute(sql, command =>
            {
                Add(command, "@isDemo", SqlDbType.Bit, isDemo);
                Add(command, "@fileSha256", SqlDbType.Binary, fileSha256, 32);
                Add(command, "@documentTypeCode", SqlDbType.VarChar, documentTypeCode, 20);
                Add(command, "@shippingLineCode", SqlDbType.VarChar, shippingLineCode, 20);
                Add(command, "@entityName", SqlDbType.VarChar, entityName, 50);
                Add(command, "@entityId", SqlDbType.BigInt, entityId);
                object value = command.ExecuteScalar();
                return value == null || value == DBNull.Value ? (Guid?)null : (Guid)value;
            });
        }

        // Writes the intent before the POST so the webhook can always find it by clientRequestId.
        public static void Insert(
            Guid localId,
            string documentTypeCode,
            string shippingLineCode,
            bool reprocess,
            string entityName,
            long? entityId,
            string storedFileName,
            string originalFileName,
            byte[] fileSha256,
            int? userId,
            bool isDemo)
        {
            const string sql = @"
SET XACT_ABORT ON;
BEGIN TRANSACTION;
DECLARE @inflight uniqueidentifier, @lockResult int, @lockResource nvarchar(255);
-- Serialize immutable intent checks even when the same ID is retried with different file data.
SET @lockResource = N'DocAi:intent:' + CONVERT(nvarchar(36), @localId);
EXEC @lockResult = sys.sp_getapplock @Resource = @lockResource,
    @LockOwner = 'Transaction', @LockMode = 'Exclusive', @LockTimeout = 10000;
IF @lockResult < 0
BEGIN
    ROLLBACK TRANSACTION;
    THROW 50003, 'DocAi identity lock unavailable. Retry the same request.', 1;
END;
-- Text predicates stay below: omitting names avoids binary applock/collation equality mismatches.
-- NULL entity ID has its own marker; the fixed-length file hash cannot contain delimiters.
SET @lockResource = N'DocAi:file:' + CONVERT(nvarchar(64), @fileSha256, 2) + N':'
    + COALESCE(CONVERT(nvarchar(20), @entityId), N'null') + N':' + CONVERT(nvarchar(1), @isDemo);
EXEC @lockResult = sys.sp_getapplock @Resource = @lockResource,
    @LockOwner = 'Transaction', @LockMode = 'Exclusive', @LockTimeout = 10000;
IF @lockResult < 0
BEGIN
    ROLLBACK TRANSACTION;
    THROW 50003, 'DocAi identity lock unavailable. Retry the same request.', 1;
END;
IF EXISTS (SELECT 1 FROM dbo.AIDocumentExtraction WHERE ID = @localId)
   AND NOT EXISTS (SELECT 1 FROM dbo.AIDocumentExtraction WHERE ID = @localId
       AND FileSha256 = @fileSha256 AND RequestedDocumentTypeCode = @documentTypeCode AND IsDemo = @isDemo
       AND Reprocess = @reprocess
       AND (RequestedShippingLineCode = @shippingLineCode OR (RequestedShippingLineCode IS NULL AND @shippingLineCode IS NULL))
       AND (EntityName = @entityName OR (EntityName IS NULL AND @entityName IS NULL))
       AND (EntityID = @entityId OR (EntityID IS NULL AND @entityId IS NULL)))
    THROW 50002, 'Upload intent does not match the original request.', 1;

IF @isDemo = 0 AND @reprocess = 0
    SELECT TOP (1) @inflight = ID FROM dbo.AIDocumentExtraction
    WHERE FileSha256 = @fileSha256 AND RequestedDocumentTypeCode = @documentTypeCode
      AND (RequestedShippingLineCode = @shippingLineCode OR (RequestedShippingLineCode IS NULL AND @shippingLineCode IS NULL))
      AND (EntityName = @entityName OR (EntityName IS NULL AND @entityName IS NULL))
      AND (EntityID = @entityId OR (EntityID IS NULL AND @entityId IS NULL))
      AND IsDemo = 0 AND ExtractionStatus IN ('Pending', 'Submitted') AND SupersededByExtractionID IS NULL
    ORDER BY CreatedAt DESC, ID DESC;
IF NOT EXISTS (SELECT 1 FROM dbo.AIDocumentExtraction WITH (UPDLOCK, HOLDLOCK) WHERE ID = @localId)
INSERT dbo.AIDocumentExtraction (ID, RequestedDocumentTypeCode, RequestedShippingLineCode, Reprocess, EntityName, EntityID,
                        StoredFileName, OriginalFileName, FileSha256, CreatedByUserID, IsDemo, ResolvedDocumentTypeCode, ResultType)
VALUES (@localId, @documentTypeCode, @shippingLineCode, @reprocess, @entityName, @entityId,
        @storedFileName, @originalFileName, @fileSha256, @userId, @isDemo, NULL, NULL);
IF @inflight IS NOT NULL AND @inflight <> @localId
    UPDATE dbo.AIDocumentExtraction SET SupersededByExtractionID = @inflight, ExtractionStatus = 'Failed',
        ErrorCode = 'DUPLICATE', CompletedAt = GETDATE()
    WHERE ID = @localId AND ExtractionStatus = 'Pending';
COMMIT TRANSACTION;";
            Execute(sql, command =>
            {
                Add(command, "@isDemo", SqlDbType.Bit, isDemo);
                Add(command, "@localId", SqlDbType.UniqueIdentifier, localId);
                Add(command, "@documentTypeCode", SqlDbType.VarChar, documentTypeCode, 20);
                Add(command, "@shippingLineCode", SqlDbType.VarChar, shippingLineCode, 20);
                Add(command, "@reprocess", SqlDbType.Bit, reprocess);
                Add(command, "@entityName", SqlDbType.VarChar, entityName, 50);
                Add(command, "@entityId", SqlDbType.BigInt, entityId);
                Add(command, "@storedFileName", SqlDbType.VarChar, storedFileName, 64);
                Add(command, "@originalFileName", SqlDbType.NVarChar, Cut(originalFileName, 260), 260);
                Add(command, "@fileSha256", SqlDbType.Binary, fileSha256, 32);
                Add(command, "@userId", SqlDbType.Int, userId);
                return command.ExecuteNonQuery();
            });
        }

        public static Guid ResolveLocalId(Guid localId, bool isDemo)
        {
            const string sql = "SELECT COALESCE(SupersededByExtractionID, ID) FROM dbo.AIDocumentExtraction "
                + "WHERE ID = @localId AND IsDemo = @isDemo;";
            return Execute(sql, command =>
            {
                Add(command, "@localId", SqlDbType.UniqueIdentifier, localId);
                Add(command, "@isDemo", SqlDbType.Bit, isDemo);
                object id = command.ExecuteScalar();
                return id == null || id == DBNull.Value ? localId : (Guid)id;
            });
        }

        // Claims one row for Read, refresh or SendPending; returns the requested type rather than its resolution.
        public static ClaimedRow Claim(Guid localId, bool isDemo)
        {
            return ClaimRow(localId, isDemo);
        }

        // Claims one due row immediately before the recurring job handles it.
        public static ClaimedRow ClaimNextDue(bool isDemo)
        {
            return ClaimRow(null, isDemo, DocAiSettings.RemotePolling);
        }

        private static ClaimedRow ClaimRow(Guid? localId, bool isDemo, bool remotePolling = true)
        {
            const string sql = @"
DECLARE @claimToken uniqueidentifier = NEWID();
UPDATE TOP (@batchSize) dbo.AIDocumentExtraction
SET LastCheckedAt = GETDATE(), ClaimToken = @claimToken
OUTPUT inserted.ID, inserted.ExtractionStatus, inserted.RemoteJobId, inserted.RemoteRunNo, inserted.ClaimToken,
       inserted.StoredFileName, inserted.RequestedDocumentTypeCode, inserted.RequestedShippingLineCode, inserted.Reprocess
WHERE (@localId IS NULL OR ID = @localId) AND IsDemo = @isDemo
  AND (   (ExtractionStatus = 'Pending'   AND (@localId IS NOT NULL OR CreatedAt < DATEADD(minute, -1, GETDATE()))
                                AND (NextSubmitAt IS NULL OR NextSubmitAt <= GETDATE()))
       OR (@remotePolling = 1 AND ExtractionStatus = 'Submitted' AND (@localId IS NOT NULL OR SubmittedAt < DATEADD(minute, -10, GETDATE()))))
  AND (   LastCheckedAt IS NULL OR LastCheckedAt < DATEADD(minute, -3, GETDATE())
       OR (@localId IS NOT NULL AND ClaimToken IS NULL));";
            return Execute(sql, command =>
            {
                Add(command, "@isDemo", SqlDbType.Bit, isDemo);
                Add(command, "@remotePolling", SqlDbType.Bit, remotePolling);
                Add(command, "@batchSize", SqlDbType.Int, 1);
                Add(command, "@localId", SqlDbType.UniqueIdentifier, localId);
                using (SqlDataReader reader = command.ExecuteReader())
                {
                    return reader.Read() ? ReadClaimedRow(reader) : null;
                }
            });
        }

        // Binds the run, or retains a hidden alias so an outstanding Read/Status resolves to stored history.
        public static void MarkSubmitted(
            ClaimedRow row,
            Guid remoteJobId,
            short runNo,
            short? pageCount,
            string runReason = null,
            string changesJson = null)
        {
            string sql = BindRunSql + @"
UPDATE dbo.AIDocumentExtraction
SET ExtractionStatus = 'Submitted', RemoteJobId = @remoteJobId, RemoteRunNo = @runNo, PageCount = @pageCount,
    -- A retry of this ID retains its decision; another local binding means reuse.
    RunReason = CASE WHEN RemoteJobId = @remoteJobId AND RemoteRunNo = @runNo THEN RunReason
        WHEN EXISTS (SELECT 1 FROM dbo.AIDocumentExtraction other
            WHERE other.RemoteJobId = @remoteJobId AND other.RemoteRunNo = @runNo
              AND other.ID <> @localId) THEN NULL ELSE @runReason END,
    ChangesJson = CASE WHEN @rereadSkipped = 1 THEN @changesJson
        WHEN RemoteJobId = @remoteJobId AND RemoteRunNo = @runNo THEN ChangesJson
        WHEN EXISTS (SELECT 1 FROM dbo.AIDocumentExtraction other
            WHERE other.RemoteJobId = @remoteJobId AND other.RemoteRunNo = @runNo
              AND other.ID <> @localId) THEN NULL ELSE @changesJson END,
    SubmittedAt = GETDATE(), SubmitAttempts = SubmitAttempts + 1, NextSubmitAt = NULL, ClaimToken = NULL,
    ErrorCode = NULL, ErrorMessage = NULL
WHERE ID = @localId AND ExtractionStatus = 'Pending' AND ClaimToken = @claimToken
  AND SupersededByExtractionID IS NULL;
-- A skipped re-read belongs to this submission even when it aliases an older result.
UPDATE dbo.AIDocumentExtraction SET ChangesJson = @changesJson
WHERE ID = @localId AND SupersededByExtractionID IS NOT NULL AND @rereadSkipped = 1;
COMMIT TRANSACTION;";
            Execute(sql, command =>
            {
                Add(command, "@localId", SqlDbType.UniqueIdentifier, row.LocalId);
                Add(command, "@claimToken", SqlDbType.UniqueIdentifier, row.ClaimToken);
                Add(command, "@remoteJobId", SqlDbType.UniqueIdentifier, remoteJobId);
                Add(command, "@runNo", SqlDbType.SmallInt, runNo);
                Add(command, "@pageCount", SqlDbType.SmallInt, pageCount);
                Add(command, "@runReason", SqlDbType.VarChar, Cut(runReason, 20), 20);
                Add(command, "@changesJson", SqlDbType.NVarChar, changesJson, -1);
                bool rereadSkipped = !string.IsNullOrEmpty(changesJson)
                    && Json.Str(Json.ReadObject(changesJson), "rereadSkipped") == "QUOTA_EXHAUSTED";
                Add(command, "@rereadSkipped", SqlDbType.Bit, rereadSkipped);
                return command.ExecuteNonQuery();
            });
            row.RemoteJobId = remoteJobId;
            row.RemoteRunNo = runNo;
        }

        // Records a send failure after DocAiClient has classified the response.
        public static void MarkSendFailed(
            ClaimedRow row,
            bool permanent,
            bool countsAsAttempt,
            string errorCode,
            string errorMessage,
            int? retryAfterSeconds)
        {
            const string sql = @"
UPDATE dbo.AIDocumentExtraction
SET SubmitAttempts = SubmitAttempts + @countsAsAttempt,
    ExtractionStatus         = CASE WHEN @permanent = 1 OR SubmitAttempts + @countsAsAttempt >= 10 THEN 'Failed'
                          ELSE 'Pending' END,
    ErrorCode      = CASE WHEN @permanent = 0 AND SubmitAttempts + @countsAsAttempt >= 10 THEN 'SUBMIT_EXHAUSTED'
                          ELSE @errorCode END,
    ErrorMessage   = @errorMessage,
    NextSubmitAt   = CASE WHEN @retryAfterSeconds IS NULL THEN NULL
                          ELSE DATEADD(second, @retryAfterSeconds, GETDATE()) END,
    CompletedAt    = CASE WHEN @permanent = 1 OR SubmitAttempts + @countsAsAttempt >= 10 THEN GETDATE() END,
    ClaimToken     = NULL
WHERE ID = @localId AND ExtractionStatus = 'Pending' AND ClaimToken = @claimToken;";
            Execute(sql, command =>
            {
                Add(command, "@localId", SqlDbType.UniqueIdentifier, row.LocalId);
                Add(command, "@claimToken", SqlDbType.UniqueIdentifier, row.ClaimToken);
                Add(command, "@permanent", SqlDbType.Bit, permanent);
                Add(command, "@countsAsAttempt", SqlDbType.TinyInt, (byte)(countsAsAttempt ? 1 : 0));
                Add(command, "@errorCode", SqlDbType.VarChar, Cut(errorCode, 50), 50);
                Add(command, "@errorMessage", SqlDbType.NVarChar, Cut(errorMessage, 500), 500);
                Add(command, "@retryAfterSeconds", SqlDbType.Int, retryAfterSeconds);
                return command.ExecuteNonQuery();
            });
        }

        // Stores a webhook or GET outcome against its submission and releases the claim.
        public static int StoreOutcome(
            Guid clientRequestId,
            Guid remoteJobId,
            short runNo,
            string status,
            string body,
            string errorCode,
            string errorMessage,
            bool isDemo)
        {
            string resolvedType;
            string resultType;
            var envelope = Json.ReadObject(body);
            DocAiResult.Validate(envelope, status, out resolvedType, out resultType);
            string billsStatus;
            DocAiBillRow[] bills = ProjectOutcomeBills(body, status, out billsStatus);

            string sql = BindRunSql + @"
-- Binding updates are counted separately to preserve the original return value.
DECLARE @updated TABLE (ID uniqueidentifier PRIMARY KEY);
UPDATE dbo.AIDocumentExtraction
SET ExtractionStatus       = CASE WHEN @status = 'Completed' THEN 'Completed' ELSE 'Failed' END,
    RemoteJobId  = COALESCE(RemoteJobId, @remoteJobId),
    RemoteRunNo  = COALESCE(RemoteRunNo, @runNo),
    ResultJson   = @body,
    BillsStatus = @billsStatus, BillsExpectedCount = @billsExpectedCount,
    -- Bound rows keep the C3 decision, including NULL for reuse. C5 can bind before POST returns.
    RunReason = CASE WHEN RemoteRunNo IS NOT NULL THEN RunReason
        WHEN EXISTS (SELECT 1 FROM dbo.AIDocumentExtraction other
            WHERE other.RemoteJobId = @remoteJobId AND other.RemoteRunNo = @runNo
              AND other.ID <> dbo.AIDocumentExtraction.ID) THEN NULL ELSE @runReason END,
    ChangesJson = CASE WHEN RemoteRunNo IS NOT NULL THEN ChangesJson
        WHEN EXISTS (SELECT 1 FROM dbo.AIDocumentExtraction other
            WHERE other.RemoteJobId = @remoteJobId AND other.RemoteRunNo = @runNo
              AND other.ID <> dbo.AIDocumentExtraction.ID) THEN NULL ELSE @changesJson END,
    ResolvedDocumentTypeCode = @resolvedType,
    ResultType = @resultType,
    ErrorCode    = @errorCode,
    ErrorMessage = @errorMessage,
    CompletedAt  = GETDATE(),
    ClaimToken   = NULL
OUTPUT inserted.ID INTO @updated
WHERE ExtractionStatus IN ('Pending', 'Submitted') AND IsDemo = @isDemo AND SupersededByExtractionID IS NULL
  AND (   (RemoteJobId = @remoteJobId AND RemoteRunNo = @runNo)
       OR (ID = @localId AND RemoteRunNo IS NULL));
DECLARE @outcomeCount int = @@ROWCOUNT;
SET NOCOUNT ON;
INSERT dbo.AIDocumentBills (AIDocumentExtractionID, BillIndex, BillJson, BillWithConfidenceJson)
SELECT d.ID, b.BillIndex, b.BillJson, b.BillWithConfidenceJson FROM @updated d CROSS JOIN @bills b;
COMMIT TRANSACTION;
SELECT @bindingCount + @outcomeCount;";
            return Execute(sql, command =>
            {
                AddBills(command, bills);
                Add(command, "@billsStatus", SqlDbType.VarChar, billsStatus, 12);
                Add(command, "@billsExpectedCount", SqlDbType.Int, billsStatus == "Ready" ? (int?)bills.Length : null);
                Add(command, "@isDemo", SqlDbType.Bit, isDemo);
                Add(command, "@localId", SqlDbType.UniqueIdentifier, clientRequestId);
                Add(command, "@runReason", SqlDbType.VarChar, Cut(Json.Str(envelope, "runReason"), 20), 20);
                var changes = Json.Obj(envelope, "changes");
                Add(command, "@changesJson", SqlDbType.NVarChar, changes == null ? null : Json.Write(changes), -1);
                Add(command, "@remoteJobId", SqlDbType.UniqueIdentifier, remoteJobId);
                Add(command, "@runNo", SqlDbType.SmallInt, runNo);
                Add(command, "@status", SqlDbType.VarChar, Cut(status, 12), 12);
                Add(command, "@body", SqlDbType.NVarChar, body, -1);
                Add(command, "@resolvedType", SqlDbType.VarChar, resolvedType, 20);
                Add(command, "@resultType", SqlDbType.VarChar, resultType, 32);
                Add(command, "@errorCode", SqlDbType.VarChar, Cut(errorCode, 50), 50);
                Add(command, "@errorMessage", SqlDbType.NVarChar, Cut(errorMessage, 500), 500);
                return Convert.ToInt32(command.ExecuteScalar(), CultureInfo.InvariantCulture);
            });
        }

        // Reads final webhook identifiers and status before storing the outcome.
        public static void StoreOutcome(string webhookBody)
        {
            Dictionary<string, object> webhookEvent = Json.ReadObject(webhookBody);
            string status = Json.Str(webhookEvent, "status");
            Guid jobId;
            Guid clientRequestId;
            short runNo;
            if ((status != "Completed" && status != "Failed")
                || !Guid.TryParse(Json.Str(webhookEvent, "jobId"), out jobId)
                || !Guid.TryParse(Json.Str(webhookEvent, "clientRequestId"), out clientRequestId)
                || !short.TryParse(Json.Str(webhookEvent, "runNo"), out runNo))
            {
                Trace.TraceWarning("DocAi webhook: an event without a final status or ids was ignored.");
                return;
            }

            Dictionary<string, object> error = Json.Obj(webhookEvent, "error");
            StoreOutcome(
                clientRequestId,
                jobId,
                runNo,
                status,
                webhookBody,
                Json.Str(error, "code"),
                Json.Str(error, "message"),
                false);
        }

        // Releases a claim without changing the document when a refresh finds the run still in progress.
        public static void Release(ClaimedRow row)
        {
            const string sql = "UPDATE dbo.AIDocumentExtraction SET ClaimToken = NULL "
                + "WHERE ID = @localId AND ClaimToken = @claimToken;";
            Execute(sql, command =>
            {
                Add(command, "@localId", SqlDbType.UniqueIdentifier, row.LocalId);
                Add(command, "@claimToken", SqlDbType.UniqueIdentifier, row.ClaimToken);
                return command.ExecuteNonQuery();
            });
        }

        // Checks entity and mode for both ID and newest lookup; allDialogTypes covers historical BL and AUTO.
        public static AiDocumentView Get(
            string entityName,
            long entityId,
            string documentTypeCode,
            Guid? localId,
            bool isDemo,
            bool allDialogTypes = false)
        {
            const string sql = @"
SET XACT_ABORT ON;
BEGIN TRANSACTION;
DECLARE @document TABLE (ID uniqueidentifier PRIMARY KEY);
INSERT @document
SELECT TOP (1) ID
FROM dbo.AIDocumentExtraction WITH (HOLDLOCK)
WHERE EntityName = @entityName AND EntityID = @entityId
  AND SupersededByExtractionID IS NULL AND IsDemo = @isDemo
  AND ((@allDialogTypes = 1 AND RequestedDocumentTypeCode IN ('BL', 'AUTO')) OR (@allDialogTypes = 0 AND RequestedDocumentTypeCode = @documentTypeCode))
  AND (@localId IS NULL OR ID = @localId OR ID =
      (SELECT SupersededByExtractionID FROM dbo.AIDocumentExtraction WITH (HOLDLOCK) WHERE ID = @localId
       AND EntityName = @entityName AND EntityID = @entityId AND IsDemo = @isDemo))
ORDER BY CreatedAt DESC, ID DESC;
SELECT TOP (1) ID, ExtractionStatus, OriginalFileName, PageCount, ErrorCode, ErrorMessage, ResultJson, NextSubmitAt,
       SubmitAttempts, CreatedAt, CompletedAt, ResolvedDocumentTypeCode, ResultType,
       -- An alias serves the owner's result, but did not cause its run.
       CASE WHEN ID = @localId THEN RunReason END AS RunReason,
       COALESCE((SELECT source.ChangesJson FROM dbo.AIDocumentExtraction source
           WHERE source.ID = @localId AND source.SupersededByExtractionID = dbo.AIDocumentExtraction.ID
             AND source.IsDemo = @isDemo AND source.EntityName = @entityName AND source.EntityID = @entityId),
           CASE WHEN ID = @localId THEN ChangesJson END) AS ChangesJson, BillsStatus, BillsExpectedCount
FROM dbo.AIDocumentExtraction WITH (HOLDLOCK)
WHERE ID IN (SELECT ID FROM @document);
SELECT b.BillIndex, b.BillJson, b.BillWithConfidenceJson
FROM dbo.AIDocumentBills b JOIN @document d ON d.ID = b.AIDocumentExtractionID ORDER BY b.BillIndex;
COMMIT TRANSACTION;";
            return Execute(sql, command =>
            {
                Add(command, "@isDemo", SqlDbType.Bit, isDemo);
                Add(command, "@entityName", SqlDbType.VarChar, entityName, 50);
                Add(command, "@entityId", SqlDbType.BigInt, entityId);
                Add(command, "@documentTypeCode", SqlDbType.VarChar, documentTypeCode, 20);
                Add(command, "@localId", SqlDbType.UniqueIdentifier, localId);
                Add(command, "@allDialogTypes", SqlDbType.Bit, allDialogTypes);
                using (SqlDataReader reader = command.ExecuteReader())
                {
                    if (!reader.Read())
                    {
                        // Consume all results so COMMIT completes before the connection is disposed.
                        while (reader.NextResult())
                        {
                        }

                        return null;
                    }

                    var document = ReadDocumentView(reader);
                    var bills = new List<DocAiBillRow>();
                    reader.NextResult();
                    while (reader.Read())
                    {
                        bills.Add(ReadBillRow(reader));
                    }

                    // Consume the final result so COMMIT has completed before disposing the connection.
                    reader.NextResult();
                    document.Bills = bills.ToArray();
                    return document;
                }
            });
        }

        // Company-wide: AIDocumentExtraction has no branch scope. Users.Name is the existing display name.
        public static object[] Recent(bool isDemo)
        {
            const string sql = @"
SELECT TOP (20) d.OriginalFileName, d.PageCount, u.Name AS CreatorName, d.CreatedAt, d.ExtractionStatus
FROM dbo.AIDocumentExtraction d LEFT JOIN dbo.Users u ON u.ID = d.CreatedByUserID
WHERE d.IsDemo = @isDemo
ORDER BY d.CreatedAt DESC, d.ID DESC;";
            return Execute(sql, command =>
            {
                Add(command, "@isDemo", SqlDbType.Bit, isDemo);
                var rows = new List<object>();
                using (var reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        rows.Add(ReadRecentDocument(reader));
                    }
                }

                return rows.ToArray();
            });
        }

        // Returns this company's product identity, or null when its row is missing.
        public static string ReadConsumerCode(string productCode)
        {
            const string sql = "SELECT ConsumerCode FROM dbo.DocAiIdentity WHERE ProductCode = @productCode;";
            return Execute(sql, command =>
            {
                command.CommandTimeout = 15;
                Add(command, "@productCode", SqlDbType.VarChar, productCode, 20);
                object value = command.ExecuteScalar();
                return value == null || value == DBNull.Value ? null : (string)value;
            });
        }

        // An orphan copy has no row in either mode.
        public static bool CopyHasRow(Guid localId)
        {
            const string sql = "SELECT COUNT(*) AS Rows FROM dbo.AIDocumentExtraction WHERE ID = @localId;";
            return Execute(sql, command =>
            {
                Add(command, "@localId", SqlDbType.UniqueIdentifier, localId);
                return (int)command.ExecuteScalar() > 0;
            });
        }

        // Retains a local file for 7 days after completion or 30 days after failure.
        // Each file in its own try/catch; a file that can't be deleted now is tried again next time.
        public static void DeleteOldCopies()
        {
            const string due = @"
SELECT ID, StoredFileName, CreatedAt
FROM dbo.AIDocumentExtraction
WHERE StoredFileDeletedAt IS NULL
  AND (   (ExtractionStatus = 'Completed' AND CompletedAt < DATEADD(day,  -7, GETDATE()))
       OR (ExtractionStatus = 'Failed'    AND CompletedAt < DATEADD(day, -30, GETDATE())));";
            var rows = Execute(due, command =>
            {
                var list = new List<LocalCopy>();
                using (SqlDataReader reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        list.Add(ReadLocalCopy(reader));
                    }
                }

                return list;
            });
            foreach (LocalCopy row in rows)
            {
                try
                {
                    string path = DocAiClient.CopyPath(row.StoredFileName);
                    if (File.Exists(path))
                    {
                        File.Delete(path);
                    }

                    const string sql =
                        "UPDATE dbo.AIDocumentExtraction SET StoredFileDeletedAt = GETDATE() WHERE ID = @localId;";
                    Execute(sql, command =>
                    {
                        Add(command, "@localId", SqlDbType.UniqueIdentifier, row.LocalId);
                        return command.ExecuteNonQuery();
                    });
                }
                catch (Exception exception)
                {
                    Trace.TraceWarning(
                        "DocAi: the copy of {0} could not be deleted: {1}",
                        row.LocalId,
                        exception.GetType().Name);
                }
            }
        }

        // Clears stored results and their bills after the company's retention period.
        public static void PurgeOldResults(int retentionMonths)
        {
            const string sql = @"
SET XACT_ABORT ON;
BEGIN TRANSACTION;
DECLARE @purged TABLE (ID uniqueidentifier PRIMARY KEY);
UPDATE dbo.AIDocumentExtraction
SET ResultJson = NULL, ResultPurgedAt = GETDATE(), BillsStatus = NULL, BillsExpectedCount = NULL
OUTPUT inserted.ID INTO @purged
WHERE ResultJson IS NOT NULL AND CompletedAt < DATEADD(month, -@retentionMonths, GETDATE());
DELETE b FROM dbo.AIDocumentBills b JOIN @purged p ON p.ID = b.AIDocumentExtractionID;
COMMIT TRANSACTION;";
            Execute(sql, command =>
            {
                Add(command, "@retentionMonths", SqlDbType.Int, retentionMonths);
                return command.ExecuteNonQuery();
            });
        }

        // At most twenty documents, with failed rows restricted to one batch per UTC day.
        // Projection happens before the per-document transaction takes any lock.
        public static void ProjectMissingBills()
        {
            lock (BillsRepairGate)
            {
                bool retryFailed = DateTime.UtcNow.Date > _lastFailedBillsRetryUtc.Date;
                const string due = @"
SELECT TOP (20) ID, ResultJson, BillsStatus
FROM dbo.AIDocumentExtraction
WHERE ExtractionStatus = 'Completed' AND ResultJson IS NOT NULL AND ResultPurgedAt IS NULL
  AND (BillsStatus IS NULL OR (@retryFailed = 1 AND BillsStatus = 'Failed'))
ORDER BY CreatedAt, ID;";
                var pending = Execute(due, command =>
                {
                    Add(command, "@retryFailed", SqlDbType.Bit, retryFailed);
                    var list = new List<BillRepairDocument>();
                    using (var reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            list.Add(ReadBillRepairDocument(reader));
                        }
                    }

                    return list;
                });
                if (retryFailed)
                {
                    _lastFailedBillsRetryUtc = DateTime.UtcNow;
                }

                foreach (var document in pending)
                {
                    try
                    {
                        RepairDocumentBills(document, retryFailed);
                    }
                    catch (Exception exception)
                    {
                        Trace.TraceWarning("DocAi.BillRepairFailed: {0}", exception.GetType().Name);
                    }
                }
            }
        }

        private static void AddBills(SqlCommand command, DocAiBillRow[] bills)
        {
            var table = new DataTable();
            table.Columns.Add("BillIndex", typeof(int));
            table.Columns.Add("BillJson", typeof(string));
            table.Columns.Add("BillWithConfidenceJson", typeof(string));
            foreach (var bill in bills)
            {
                table.Rows.Add(bill.BillIndex, bill.BillJson, bill.BillWithConfidenceJson);
            }

            var parameter = command.Parameters.Add("@bills", SqlDbType.Structured);
            parameter.TypeName = "dbo.AIDocumentBillRows";
            parameter.Value = table;
        }

        private static T Execute<T>(string sql, Func<SqlCommand, T> body)
        {
            using (var connection = new SqlConnection(ConnectionString))
            using (var command = new SqlCommand(sql, connection))
            {
                connection.Open();
                return body(command);
            }
        }

        private static void Add(SqlCommand command, string name, SqlDbType type, object value, int size = 0)
        {
            SqlParameter parameter;
            if (size != 0)
            {
                parameter = command.Parameters.Add(name, type, size);
            }
            else
            {
                parameter = command.Parameters.Add(name, type);
            }

            parameter.Value = value ?? DBNull.Value;
        }

        private static string Cut(string value, int max)
        {
            return value == null || value.Length <= max ? value : value.Substring(0, max);
        }

        private static DocAiBillRow[] ProjectOutcomeBills(string body, string status, out string billsStatus)
        {
            DocAiBillRow[] bills = new DocAiBillRow[0];
            billsStatus = null;
            if (status == "Completed")
            {
                try
                {
                    bills = DocAiBillProjector.Project(body);
                    billsStatus = "Ready";
                }
                catch (Exception exception)
                {
                    billsStatus = "Failed";
                    Trace.TraceWarning("DocAi.BillProjectionFailed: {0}", exception.GetType().Name);
                }
            }

            return bills;
        }

        private static void RepairDocumentBills(BillRepairDocument document, bool retryFailed)
        {
            DocAiBillRow[] bills = new DocAiBillRow[0];
            string status = "Ready";
            try
            {
                bills = DocAiBillProjector.Project(document.ResultJson);
            }
            catch (Exception exception)
            {
                status = "Failed";
                Trace.TraceWarning("DocAi.BillRepairProjectionFailed: {0}", exception.GetType().Name);
            }

            Execute(RepairBillsSql, command =>
            {
                Add(command, "@localId", SqlDbType.UniqueIdentifier, document.LocalId);
                Add(command, "@retryFailed", SqlDbType.Bit, retryFailed);
                Add(command, "@body", SqlDbType.NVarChar, document.ResultJson, -1);
                Add(command, "@billsStatus", SqlDbType.VarChar, status, 12);
                Add(command, "@expectedCount", SqlDbType.Int, status == "Ready" ? (int?)bills.Length : null);
                AddBills(command, bills);
                return command.ExecuteNonQuery();
            });
        }

        private static ClaimedRow ReadClaimedRow(SqlDataReader reader)
        {
            return new ClaimedRow
            {
                LocalId = reader.GetGuid(0),
                Status = reader.GetString(1),
                RemoteJobId = reader.IsDBNull(2) ? (Guid?)null : reader.GetGuid(2),
                RemoteRunNo = reader.IsDBNull(3) ? (short?)null : reader.GetInt16(3),
                ClaimToken = reader.GetGuid(4),
                StoredFileName = reader.GetString(5),
                DocumentTypeCode = reader.GetString(6),
                ShippingLineCode = reader.IsDBNull(7) ? null : reader.GetString(7),
                Reprocess = reader.GetBoolean(8)
            };
        }

        private static AiDocumentView ReadDocumentView(SqlDataReader reader)
        {
            return new AiDocumentView
            {
                LocalId = reader.GetGuid(0),
                Status = reader.GetString(1),
                OriginalFileName = reader.GetString(2),
                PageCount = reader.IsDBNull(3) ? (short?)null : reader.GetInt16(3),
                ErrorCode = reader.IsDBNull(4) ? null : reader.GetString(4),
                ErrorMessage = reader.IsDBNull(5) ? null : reader.GetString(5),
                ResultJson = reader.IsDBNull(6) ? null : reader.GetString(6),
                NextSubmitAt = reader.IsDBNull(7) ? (DateTime?)null : reader.GetDateTime(7),
                SubmitAttempts = reader.GetByte(8),
                CreatedAt = reader.GetDateTime(9),
                CompletedAt = reader.IsDBNull(10) ? (DateTime?)null : reader.GetDateTime(10),
                ResolvedDocumentTypeCode = reader.IsDBNull(11) ? null : reader.GetString(11),
                ResultType = reader.IsDBNull(12) ? null : reader.GetString(12),
                RunReason = reader.IsDBNull(13) ? null : reader.GetString(13),
                ChangesJson = reader.IsDBNull(14) ? null : reader.GetString(14),
                BillsStatus = reader.IsDBNull(15) ? null : reader.GetString(15),
                BillsExpectedCount = reader.IsDBNull(16) ? (int?)null : reader.GetInt32(16)
            };
        }

        private static DocAiBillRow ReadBillRow(SqlDataReader reader)
        {
            return new DocAiBillRow
            {
                BillIndex = reader.GetInt32(0),
                BillJson = reader.GetString(1),
                BillWithConfidenceJson = reader.GetString(2)
            };
        }

        private static object ReadRecentDocument(SqlDataReader reader)
        {
            return new
            {
                fileName = reader.GetString(0),
                pages = reader.IsDBNull(1) ? (short?)null : reader.GetInt16(1),
                user = reader.IsDBNull(2) ? null : reader.GetString(2),
                createdAt = reader.GetDateTime(3).ToString("dd/MM/yyyy HH:mm", CultureInfo.InvariantCulture),
                status = reader.GetString(4)
            };
        }

        private static LocalCopy ReadLocalCopy(SqlDataReader reader)
        {
            return new LocalCopy
            {
                LocalId = reader.GetGuid(0),
                StoredFileName = reader.GetString(1)
            };
        }

        private static BillRepairDocument ReadBillRepairDocument(SqlDataReader reader)
        {
            return new BillRepairDocument
            {
                LocalId = reader.GetGuid(0),
                ResultJson = reader.GetString(1)
            };
        }

        private sealed class LocalCopy
        {
            internal Guid LocalId;
            internal string StoredFileName;
        }

        private sealed class BillRepairDocument
        {
            internal Guid LocalId;
            internal string ResultJson;
        }
    }
}

-- =====================================================================================================
-- AI documents: every table that "Extract with AI" (DocAi) and the bill review workflow need in a
-- company database, in one script.
--
-- Company database only (ForwardingUniFreight, ForwardingCPWorld, ...). Run it in SSMS (no SQLCMD mode)
-- with the company database selected. Stop the site while it runs.
--
-- Creates:
--   AIDocumentExtraction  one row per uploaded document: the DocAi submission, its result, and the
--                         review context of its bills.
--   AIDocumentBills       one row per bill found in a document: the extracted bill and its review state.
--   AIDocumentBillRows    the table type the extraction uses to save all of a document's bills at once.
--   CustomerAliases       customer names learnt from confirmed reviews.
--   DocAiIdentity         the company code this database sends to the DocAi service.
--
-- Safe to run again: it only creates what is missing. It never drops, overwrites or deletes, and it
-- refuses to change an existing company code. Everything runs in one transaction: on any error,
-- nothing is changed. It does not touch the old development tables (AiDocuments, AiBills, AiBillRows,
-- DocumentReviews, BillReviews) and does not copy data from them.
--
-- Requires SQL Server 2016 or later (ISJSON checks) and the existing dbo.Customers and dbo.Defaults.
-- No foreign keys to other legacy tables on purpose: the legacy delete procedures don't expect them.
-- =====================================================================================================

-- Set these before running.
DECLARE @ProductCode varchar(100) = 'FWD';   -- this solution: Forwarding = FWD
DECLARE @TenantCode  varchar(100) = 'UNF';   -- UNIFREIGHT: UNF, CPWorld: CPW
DECLARE @KitDbUser   sysname      = NULL;    -- optional: the site's IIS app pool database user, for GRANT SELECT

SET NOCOUNT ON;
SET XACT_ABORT ON;


-- -----------------------------------------------------------------------------------------------------
-- 1. Checks before anything changes
-- -----------------------------------------------------------------------------------------------------

IF ISNULL(CONVERT(int, SERVERPROPERTY('ProductMajorVersion')), 0) < 13
    THROW 50000, 'SQL Server 2016 (13.x) or later is required: the JSON checks use ISJSON. Nothing was changed.', 1;

-- Codes are declared wider than 20 so that a long value is rejected here, not silently cut.
IF @ProductCode IS NULL OR DATALENGTH(@ProductCode) NOT BETWEEN 1 AND 20
   OR @ProductCode COLLATE Latin1_General_100_BIN2 LIKE '%[^A-Z0-9]%'
    THROW 50001, 'ProductCode must contain 1-20 uppercase letters A-Z or digits 0-9, with no spaces or hyphens.', 1;

IF @TenantCode IS NULL OR DATALENGTH(@TenantCode) NOT BETWEEN 1 AND 20
   OR @TenantCode COLLATE Latin1_General_100_BIN2 LIKE '%[^A-Z0-9]%'
    THROW 50001, 'TenantCode must contain 1-20 uppercase letters A-Z or digits 0-9, with no spaces or hyphens.', 1;

IF DATALENGTH(@ProductCode) + 1 + DATALENGTH(@TenantCode) > 30
    THROW 50001, 'ProductCode and TenantCode joined by a hyphen must not exceed 30 characters.', 1;

IF OBJECT_ID(N'dbo.Defaults', N'U') IS NULL
    THROW 50001, 'dbo.Defaults is missing. Select the correct company database before running this script.', 1;

IF OBJECT_ID(N'dbo.Customers', N'U') IS NULL
    THROW 50001, 'dbo.Customers is missing. Select the correct company database before running this script.', 1;

-- Shows which company database this is, so the codes above can be checked against it.
SELECT DB_NAME() AS CompanyDatabase;
SELECT TOP (1) ID, CompanyName, UnEditableCompanyName FROM dbo.Defaults ORDER BY ID;

BEGIN TRY
    BEGIN TRANSACTION;

    -- -------------------------------------------------------------------------------------------------
    -- 2. AIDocumentExtraction: one row per document submission, from upload to the stored result.
    --    ID is sent to DocAi as clientRequestId. A retry by the user is a NEW row; a duplicate binding of
    --    the same run on the same business record points to its owner through SupersededByExtractionID.
    --    The bills of a document are reviewed against the operation snapshot in ReviewContextJson.
    -- -------------------------------------------------------------------------------------------------
    IF OBJECT_ID(N'dbo.AIDocumentExtraction', N'U') IS NULL
        CREATE TABLE dbo.AIDocumentExtraction (
            ID                        uniqueidentifier NOT NULL CONSTRAINT PK_AIDocumentExtraction PRIMARY KEY,

            -- The service's job and run this row is bound to, known after 202/200 (or from an early webhook).
            -- Not unique: the same file on two business records shares one job.
            RemoteJobId               uniqueidentifier NULL,
            RemoteRunNo               smallint         NULL,
            RunReason                 varchar(20)      NULL,
            ChangesJson               nvarchar(max)    NULL,
            SupersededByExtractionID  uniqueidentifier NULL,  -- hidden alias; never selected as latest

            ExtractionStatus          varchar(12)      NOT NULL
                CONSTRAINT DF_AIDocumentExtraction_ExtractionStatus DEFAULT ('Pending'),

            -- From GET /api/v2/catalog, e.g. 'BL'. The requested type stays the dedupe identity;
            -- the resolved type and result type are known when the result arrives.
            RequestedDocumentTypeCode varchar(20)      NOT NULL,
            ResolvedDocumentTypeCode  varchar(20)      NULL,
            ResultType                varchar(32)      NULL,

            -- From GET /api/v2/catalog, e.g. 'MAERSK'. NULL: the service detects the line with its classifier.
            RequestedShippingLineCode varchar(20)      NULL,

            Reprocess                 bit              NOT NULL CONSTRAINT DF_AIDocumentExtraction_Reprocess DEFAULT (0),

            -- Written in demo mode (DocAi:Mode = Demo): never sent, never reused, claimed or shown in live mode.
            IsDemo                    bit              NOT NULL CONSTRAINT DF_AIDocumentExtraction_IsDemo DEFAULT (0),

            -- What the document belongs to, in this solution's terms ('Operation', 12345).
            EntityName                varchar(50)      NULL,
            EntityID                  bigint           NULL,

            -- '{yyyy}\{ID}.{ext}' under App_Data\DocAi\. Generated, never the client's file name.
            StoredFileName            varchar(64)      NOT NULL,
            OriginalFileName          nvarchar(260)    NOT NULL,  -- display only
            FileSha256                binary(32)       NOT NULL,
            PageCount                 smallint         NULL,

            BillsStatus               varchar(12)      NULL,
            BillsExpectedCount        int              NULL,

            ResultJson                nvarchar(max)    NULL,      -- the body received: webhook event or GET response, as is
            ErrorCode                 varchar(50)      NULL,
            ErrorMessage              nvarchar(500)    NULL,      -- the service's message (at most 400); never extracted values

            SubmitAttempts            tinyint          NOT NULL CONSTRAINT DF_AIDocumentExtraction_SubmitAttempts DEFAULT (0),
            NextSubmitAt              datetime         NULL,      -- Retry-After of a 429 or 503
            CreatedByUserID           int              NULL,      -- the user who uploaded the document
            CreatedAt                 datetime         NOT NULL CONSTRAINT DF_AIDocumentExtraction_CreatedAt DEFAULT (GETDATE()),
            SubmittedAt               datetime         NULL,
            CompletedAt               datetime         NULL,      -- when the extraction finished (result or failure)
            LastCheckedAt             datetime         NULL,      -- when a claim last took the row: a 3-minute send/refresh lease
            ClaimToken                uniqueidentifier NULL,      -- the current claim; only its holder may record the outcome
            StoredFileDeletedAt       datetime         NULL,
            ResultPurgedAt            datetime         NULL,
            RowVersion                rowversion       NOT NULL,

            -- Review. Record only: the first user who started the review; access follows the operation's permissions.
            ReviewOwnerUserID         int              NULL,
            -- The operation snapshot ({"Direction","Version"}) the bills are reviewed against; set when review starts.
            ReviewContextJson         nvarchar(max)    NULL,

            CONSTRAINT CK_AIDocumentExtraction_ExtractionStatus
                CHECK (ExtractionStatus IN ('Pending', 'Submitted', 'Completed', 'Failed')),
            CONSTRAINT CK_AIDocumentExtraction_BillsStatus CHECK (BillsStatus IN ('Ready', 'Failed')),
            CONSTRAINT CK_AIDocumentExtraction_ReviewOwnerUserID CHECK (ReviewOwnerUserID > 0)
        );

    -- Dynamic SQL so that an older server stops at the version check above, not at compile time.
    IF OBJECT_ID(N'dbo.CK_AIDocumentExtraction_ReviewContextJson', N'C') IS NULL
        EXEC (N'ALTER TABLE dbo.AIDocumentExtraction ADD CONSTRAINT CK_AIDocumentExtraction_ReviewContextJson
                    CHECK (ISJSON(ReviewContextJson) = 1);');

    IF INDEXPROPERTY(OBJECT_ID(N'dbo.AIDocumentExtraction'), N'IX_AIDocumentExtraction_Remote', 'IndexID') IS NULL
        CREATE INDEX IX_AIDocumentExtraction_Remote ON dbo.AIDocumentExtraction (RemoteJobId, RemoteRunNo);

    IF INDEXPROPERTY(OBJECT_ID(N'dbo.AIDocumentExtraction'), N'IX_AIDocumentExtraction_Status', 'IndexID') IS NULL
        CREATE INDEX IX_AIDocumentExtraction_Status ON dbo.AIDocumentExtraction (ExtractionStatus, SubmittedAt);

    IF INDEXPROPERTY(OBJECT_ID(N'dbo.AIDocumentExtraction'), N'IX_AIDocumentExtraction_File', 'IndexID') IS NULL
        CREATE INDEX IX_AIDocumentExtraction_File ON dbo.AIDocumentExtraction (FileSha256, RequestedDocumentTypeCode)
            INCLUDE (ExtractionStatus, RequestedShippingLineCode, EntityName, EntityID, IsDemo);

    IF INDEXPROPERTY(OBJECT_ID(N'dbo.AIDocumentExtraction'), N'IX_AIDocumentExtraction_Entity', 'IndexID') IS NULL
        CREATE INDEX IX_AIDocumentExtraction_Entity ON dbo.AIDocumentExtraction (EntityName, EntityID);

    -- A small key-only scan for the bills repair job; no large result payload in the index.
    IF INDEXPROPERTY(OBJECT_ID(N'dbo.AIDocumentExtraction'), N'IX_AIDocumentExtraction_BillsRepair', 'IndexID') IS NULL
        CREATE INDEX IX_AIDocumentExtraction_BillsRepair
            ON dbo.AIDocumentExtraction (ExtractionStatus, BillsStatus, CreatedAt, ID) INCLUDE (ResultPurgedAt);

    -- -------------------------------------------------------------------------------------------------
    -- 3. AIDocumentBills: one row per bill found in a document. The extraction inserts it (ReviewStatus 0,
    --    no user: it arrives by webhook or polling); the review starts it (1) and confirms it (2).
    --    BillJson is the typed bill the review reads; BillWithConfidenceJson keeps confidence, source and flags.
    --    Bill rows are never deleted or re-inserted, so their IDs stay stable for the review and aliases.
    -- -------------------------------------------------------------------------------------------------
    IF OBJECT_ID(N'dbo.AIDocumentBills', N'U') IS NULL
        CREATE TABLE dbo.AIDocumentBills (
            ID                       uniqueidentifier NOT NULL
                CONSTRAINT DF_AIDocumentBills_ID DEFAULT (NEWID())
                CONSTRAINT PK_AIDocumentBills PRIMARY KEY,
            AIDocumentExtractionID   uniqueidentifier NOT NULL
                CONSTRAINT FK_AIDocumentBills_AIDocumentExtraction REFERENCES dbo.AIDocumentExtraction (ID),
            BillIndex                int              NOT NULL,   -- the bill's position in the document, from 0
            BillJson                 nvarchar(max)    NOT NULL,
            BillWithConfidenceJson   nvarchar(max)    NOT NULL,

            -- Review. 0 = not started, 1 = in review, 2 = references confirmed (final).
            Version                  int              NOT NULL CONSTRAINT DF_AIDocumentBills_Version DEFAULT (1),
            ReviewStatus             int              NOT NULL CONSTRAINT DF_AIDocumentBills_ReviewStatus DEFAULT (0),
            ReferenceResolutionsJson nvarchar(max)    NULL,       -- customer/reference resolutions; set when review starts
            IssuesJson               nvarchar(max)    NULL,       -- validation issues; set when review starts
            CompletedBy              int              NULL,
            CompletedAt              datetime2(7)     NULL,
            UpdatedBy                int              NULL,
            UpdatedAt                datetime2(7)     NULL,

            CONSTRAINT UQ_AIDocumentBills_Extraction_BillIndex UNIQUE (AIDocumentExtractionID, BillIndex),
            CONSTRAINT CK_AIDocumentBills_BillIndex CHECK (BillIndex >= 0),
            CONSTRAINT CK_AIDocumentBills_Version CHECK (Version >= 1),
            CONSTRAINT CK_AIDocumentBills_ReviewStatus CHECK (ReviewStatus IN (0, 1, 2)),
            -- Not started: no review data and no user. Started: review data and the user who last changed it.
            CONSTRAINT CK_AIDocumentBills_ReviewData CHECK
            (
                (ReviewStatus = 0 AND ReferenceResolutionsJson IS NULL AND IssuesJson IS NULL
                    AND UpdatedBy IS NULL AND UpdatedAt IS NULL)
                OR (ReviewStatus <> 0 AND ReferenceResolutionsJson IS NOT NULL AND IssuesJson IS NOT NULL
                    AND UpdatedBy > 0 AND UpdatedAt IS NOT NULL)
            ),
            -- Who confirmed and when, only once confirmed.
            CONSTRAINT CK_AIDocumentBills_Completion CHECK
            (
                (ReviewStatus = 2 AND CompletedBy > 0 AND CompletedAt IS NOT NULL)
                OR (ReviewStatus <> 2 AND CompletedBy IS NULL AND CompletedAt IS NULL)
            )
        );

    IF OBJECT_ID(N'dbo.CK_AIDocumentBills_Json', N'C') IS NULL
        EXEC (N'ALTER TABLE dbo.AIDocumentBills ADD CONSTRAINT CK_AIDocumentBills_Json CHECK (
                    ISJSON(BillJson) = 1 AND ISJSON(BillWithConfidenceJson) = 1
                    AND (ReferenceResolutionsJson IS NULL OR ISJSON(ReferenceResolutionsJson) = 1)
                    AND (IssuesJson IS NULL OR ISJSON(IssuesJson) = 1));');

    IF TYPE_ID(N'dbo.AIDocumentBillRows') IS NULL
        EXEC (N'CREATE TYPE dbo.AIDocumentBillRows AS TABLE (
                    BillIndex              int           NOT NULL,
                    BillJson               nvarchar(max) NOT NULL,
                    BillWithConfidenceJson nvarchar(max) NOT NULL);');

    -- -------------------------------------------------------------------------------------------------
    -- 4. CustomerAliases: customer names learnt when a reviewer confirms a bill's customer.
    --    Lookup verifies NormalizedAlias as well as its hash; a hash alone is not identity evidence.
    -- -------------------------------------------------------------------------------------------------
    IF OBJECT_ID(N'dbo.CustomerAliases', N'U') IS NULL
    BEGIN
        CREATE TABLE dbo.CustomerAliases (
            ID                     bigint IDENTITY(1,1) NOT NULL CONSTRAINT PK_CustomerAliases PRIMARY KEY,
            CustomerID             int              NOT NULL
                CONSTRAINT FK_CustomerAliases_Customers REFERENCES dbo.Customers (ID),
            Alias                  nvarchar(500)    NOT NULL,
            NormalizedAlias        nvarchar(500)    COLLATE Latin1_General_100_BIN2 NOT NULL,
            AliasHash              binary(32)       NOT NULL,
            IsActive               bit              NOT NULL CONSTRAINT DF_CustomerAliases_IsActive DEFAULT (1),
            CreatedBy              int              NOT NULL,
            CreatedAt              datetime2(7)     NOT NULL CONSTRAINT DF_CustomerAliases_CreatedAt DEFAULT (SYSDATETIME()),
            SourceAIDocumentBillID uniqueidentifier NULL,     -- the confirmed bill the alias was learnt from
            CONSTRAINT CK_CustomerAliases_Name CHECK (LEN(NormalizedAlias) > 0),
            CONSTRAINT CK_CustomerAliases_Hash CHECK
                (AliasHash = CONVERT(binary(32), HASHBYTES('SHA2_256', NormalizedAlias)))
        );
        CREATE UNIQUE INDEX UX_CustomerAliases_Customer_Hash ON dbo.CustomerAliases (CustomerID, AliasHash);
        CREATE INDEX IX_CustomerAliases_Hash_Active ON dbo.CustomerAliases (AliasHash, IsActive)
            INCLUDE (CustomerID, NormalizedAlias, Alias);
    END;

    -- A development copy made by the earlier BillWorkflow script: rename its provenance column, keep its rows.
    IF COL_LENGTH('dbo.CustomerAliases', 'SourceBillReviewID') IS NOT NULL
       AND COL_LENGTH('dbo.CustomerAliases', 'SourceAIDocumentBillID') IS NULL
        EXEC sys.sp_rename N'dbo.CustomerAliases.SourceBillReviewID', N'SourceAIDocumentBillID', N'COLUMN';

    IF COL_LENGTH('dbo.CustomerAliases', 'SourceAIDocumentBillID') IS NULL
        THROW 50001, 'dbo.CustomerAliases exists without SourceAIDocumentBillID. Check the table before running this script again.', 1;

    -- -------------------------------------------------------------------------------------------------
    -- 5. DocAiIdentity: one row per solution (product). The site reads its own product's row and
    --    compares the whole catalog consumerCode with ConsumerCode. An existing code is never changed.
    --    UNIFREIGHT and CPWorld share UnEditableCompanyName, so that column cannot identify the company.
    -- -------------------------------------------------------------------------------------------------
    IF OBJECT_ID(N'dbo.DocAiIdentity') IS NOT NULL AND OBJECT_ID(N'dbo.DocAiIdentity', N'U') IS NULL
        THROW 50001, 'dbo.DocAiIdentity exists but is not a table. Check the company database schema.', 1;

    IF OBJECT_ID(N'dbo.DocAiIdentity', N'U') IS NULL
        CREATE TABLE dbo.DocAiIdentity (
            ProductCode  varchar(20) NOT NULL CONSTRAINT PK_DocAiIdentity PRIMARY KEY
                CONSTRAINT CK_DocAiIdentity_Product CHECK (
                    DATALENGTH(ProductCode) BETWEEN 1 AND 20
                    AND ProductCode COLLATE Latin1_General_100_BIN2 NOT LIKE '%[^A-Z0-9]%'),
            TenantCode   varchar(20) NOT NULL CONSTRAINT CK_DocAiIdentity_Tenant CHECK (
                    DATALENGTH(TenantCode) BETWEEN 1 AND 20
                    AND TenantCode COLLATE Latin1_General_100_BIN2 NOT LIKE '%[^A-Z0-9]%'),
            ConsumerCode AS (ProductCode + '-' + TenantCode) PERSISTED,
            CONSTRAINT CK_DocAiIdentity_Length CHECK (DATALENGTH(ProductCode) + 1 + DATALENGTH(TenantCode) <= 30)
        );

    IF EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID(N'dbo.DocAiIdentity') AND name = N'Id')
        THROW 50001, 'dbo.DocAiIdentity has the old (Id, TenantCode) shape. It was never released: drop dbo.DocAiIdentity and run this script again.', 1;

    IF (SELECT COUNT(*) FROM sys.columns WHERE object_id = OBJECT_ID(N'dbo.DocAiIdentity')) <> 3
       OR NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID(N'dbo.DocAiIdentity')
           AND name = N'ProductCode' AND user_type_id = TYPE_ID(N'varchar') AND max_length = 20
           AND is_nullable = 0 AND is_identity = 0 AND is_computed = 0)
       OR NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID(N'dbo.DocAiIdentity')
           AND name = N'TenantCode' AND user_type_id = TYPE_ID(N'varchar') AND max_length = 20
           AND is_nullable = 0 AND is_identity = 0 AND is_computed = 0)
       OR NOT EXISTS (SELECT 1 FROM sys.computed_columns WHERE object_id = OBJECT_ID(N'dbo.DocAiIdentity')
           AND name = N'ConsumerCode' AND is_persisted = 1)
       OR NOT EXISTS (SELECT 1 FROM sys.indexes i
           INNER JOIN sys.index_columns ic ON ic.object_id = i.object_id AND ic.index_id = i.index_id
           INNER JOIN sys.columns c ON c.object_id = ic.object_id AND c.column_id = ic.column_id
           WHERE i.object_id = OBJECT_ID(N'dbo.DocAiIdentity') AND i.is_primary_key = 1
               AND c.name = N'ProductCode' AND ic.key_ordinal = 1
               AND NOT EXISTS (SELECT 1 FROM sys.index_columns other
                   WHERE other.object_id = i.object_id AND other.index_id = i.index_id AND other.key_ordinal > 1))
        THROW 50001, 'dbo.DocAiIdentity has an incompatible shape; expected ProductCode varchar(20) NOT NULL primary key, TenantCode varchar(20) NOT NULL and persisted computed ConsumerCode.', 1;

    -- Dynamic SQL: compiled only after the shape check, including when an existing table has missing columns.
    EXEC sys.sp_executesql N'
        DECLARE @ExistingCode varchar(20), @Message nvarchar(2048);
        SELECT @ExistingCode = TenantCode FROM dbo.DocAiIdentity WITH (UPDLOCK, HOLDLOCK) WHERE ProductCode = @ProductCode;
        IF @ExistingCode IS NOT NULL
        BEGIN
            IF @ExistingCode COLLATE Latin1_General_100_BIN2 = @TenantCode COLLATE Latin1_General_100_BIN2
               AND DATALENGTH(@ExistingCode) = DATALENGTH(@TenantCode)
                PRINT ''DocAiIdentity already set: '' + @ProductCode + ''-'' + @TenantCode + ''.'';
            ELSE
            BEGIN
                SET @Message = @ProductCode + N'' already belongs to '' + @ProductCode + N''-'' + @ExistingCode
                    + N''; refusing to overwrite with '' + @ProductCode + N''-'' + @TenantCode
                    + N''. Changing a company code is a separate, deliberate step.'';
                THROW 50002, @Message, 1;
            END;
        END
        ELSE
        BEGIN
            INSERT dbo.DocAiIdentity (ProductCode, TenantCode) VALUES (@ProductCode, @TenantCode);
            PRINT ''DocAiIdentity set: '' + @ProductCode + ''-'' + @TenantCode + ''.'';
        END;', N'@ProductCode varchar(20), @TenantCode varchar(20)', @ProductCode = @ProductCode, @TenantCode = @TenantCode;

    IF @KitDbUser IS NOT NULL
    BEGIN
        IF DATABASE_PRINCIPAL_ID(@KitDbUser) IS NULL
            THROW 50001, 'KitDbUser does not exist in this company database. Create or select the correct database user.', 1;
        DECLARE @GrantSql nvarchar(max) = N'GRANT SELECT ON dbo.DocAiIdentity TO ' + QUOTENAME(@KitDbUser) + N';';
        EXEC sys.sp_executesql @GrantSql;
    END
    ELSE
        PRINT 'The site''s database user needs SELECT on dbo.DocAiIdentity unless it already has db_datareader/db_owner.';

    COMMIT TRANSACTION;
END TRY
BEGIN CATCH
    IF XACT_STATE() <> 0 ROLLBACK TRANSACTION;
    THROW;
END CATCH;


-- -----------------------------------------------------------------------------------------------------
-- 6. Result
-- -----------------------------------------------------------------------------------------------------
EXEC sys.sp_executesql N'SELECT ProductCode, TenantCode, ConsumerCode FROM dbo.DocAiIdentity ORDER BY ProductCode;';
PRINT 'AI document tables are ready.';

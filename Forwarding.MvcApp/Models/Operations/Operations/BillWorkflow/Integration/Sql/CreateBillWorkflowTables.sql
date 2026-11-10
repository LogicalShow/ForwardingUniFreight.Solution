-- Run in the MVC application's database before starting the SQL-backed workflow.
-- In SSMS select the existing application database first (this solution: ForwardingUniFreight).
-- Creates DocumentReviews, BillReviews and CustomerAliases. Requires the existing dbo.Customers(ID).
-- Safe to rerun; existing tables/data are retained. This does not upgrade an older schema.
-- Operations, partners, containers and the existing Customers table are unchanged.
DECLARE @SqlMajorVersion int = CONVERT(int, SERVERPROPERTY('ProductMajorVersion'));
IF ISNULL(@SqlMajorVersion, 0) < 13
BEGIN
    THROW 50000, 'BillWorkflow requires SQL Server 2016 (13.x) or later. JSON validation and saving resolved references use ISJSON, JSON_QUERY and JSON_MODIFY, which older versions do not provide. Setup stopped before creating or changing any tables.', 1;
END;

IF OBJECT_ID(N'dbo.Customers', N'U') IS NULL
BEGIN
    DECLARE @MissingCustomersMessage nvarchar(2048) =
        N'BillWorkflow setup stopped: dbo.Customers was not found or is not accessible in database [' + DB_NAME() +
        N']. Select the existing application database used by the MVC app and rerun this script. No tables were created or changed. This script does not create customer master data.';
    THROW 50001, @MissingCustomersMessage, 1;
END;

-- Never silently retain incompatible keys or remove existing reviews during setup.
IF EXISTS
(
    SELECT 1 FROM sys.columns c
    WHERE
        (c.object_id IN (OBJECT_ID(N'dbo.DocumentReviews', N'U'), OBJECT_ID(N'dbo.BillReviews', N'U'))
         AND c.name = N'ID' AND (TYPE_NAME(c.system_type_id) <> N'uniqueidentifier' OR c.is_identity <> 0))
        OR (c.object_id = OBJECT_ID(N'dbo.BillReviews', N'U') AND c.name = N'DocumentReviewID'
            AND TYPE_NAME(c.system_type_id) <> N'uniqueidentifier')
        OR (c.object_id = OBJECT_ID(N'dbo.CustomerAliases', N'U') AND c.name = N'SourceBillReviewID'
            AND TYPE_NAME(c.system_type_id) <> N'uniqueidentifier')
)
BEGIN
    THROW 50002, 'Existing BillWorkflow tables use incompatible review keys. This version requires uniqueidentifier (GUID) review keys and references. Setup does not convert existing keys or remove existing data.', 1;
END;

SET XACT_ABORT ON;

BEGIN TRY
    BEGIN TRANSACTION;

    IF OBJECT_ID(N'dbo.DocumentReviews', N'U') IS NULL
    BEGIN
        CREATE TABLE dbo.DocumentReviews
        (
            ID uniqueidentifier NOT NULL,
            OwnerUserId int NOT NULL,
            ParentReference nvarchar(100) NOT NULL,
            SourceProfile nvarchar(100) NOT NULL,
            ContextJson nvarchar(max) NOT NULL,
            CreatedAt datetime2(7) NOT NULL,
            CONSTRAINT PK_DocumentReviews PRIMARY KEY (ID),
            CONSTRAINT CK_DocumentReviews_Owner CHECK (OwnerUserId > 0)
        );
        -- Defer binding JSON functions so older servers reach the version error above.
        EXEC(N'ALTER TABLE dbo.DocumentReviews ADD CONSTRAINT CK_DocumentReviews_ContextJson CHECK (ISJSON(ContextJson) = 1);');
    END;

    IF OBJECT_ID(N'dbo.BillReviews', N'U') IS NULL
    BEGIN
        CREATE TABLE dbo.BillReviews
        (
            ID uniqueidentifier NOT NULL,
            DocumentReviewID uniqueidentifier NOT NULL,
            SourceIndex int NOT NULL,
            Version int NOT NULL,
            -- BillReviewStatus: InReview=1, ReferencesConfirmed=2.
            ReviewStatus int NOT NULL,
            OriginalJson nvarchar(max) NOT NULL,
            -- Bill, ReferenceResolutions and Issues only; metadata is stored in columns.
            BillReviewJson nvarchar(max) NOT NULL,
            CompletedBy int NULL,
            CompletedAt datetime2(7) NULL,
            UpdatedBy int NOT NULL,
            UpdatedAt datetime2(7) NOT NULL,
            CONSTRAINT PK_BillReviews PRIMARY KEY (ID),
            CONSTRAINT FK_BillReviews_DocumentReviews FOREIGN KEY (DocumentReviewID)
                REFERENCES dbo.DocumentReviews (ID),
            CONSTRAINT UQ_BillReviews_Document_SourceIndex UNIQUE (DocumentReviewID, SourceIndex),
            CONSTRAINT CK_BillReviews_SourceIndex CHECK (SourceIndex >= 0),
            CONSTRAINT CK_BillReviews_Version CHECK (Version >= 1),
            CONSTRAINT CK_BillReviews_ReviewStatus CHECK (ReviewStatus IN (1, 2)),
            CONSTRAINT CK_BillReviews_UpdatedBy CHECK (UpdatedBy > 0),
            CONSTRAINT CK_BillReviews_Completion CHECK
            (
                (ReviewStatus = 2 AND CompletedBy IS NOT NULL AND CompletedBy > 0 AND CompletedAt IS NOT NULL)
                OR (ReviewStatus <> 2 AND CompletedBy IS NULL AND CompletedAt IS NULL)
            )
        );
        EXEC(N'ALTER TABLE dbo.BillReviews
            ADD CONSTRAINT CK_BillReviews_OriginalJson CHECK (ISJSON(OriginalJson) = 1),
                CONSTRAINT CK_BillReviews_BillReviewJson CHECK (ISJSON(BillReviewJson) = 1);');
    END;

    -- Lookup verifies NormalizedAlias as well as its hash; a hash alone is not identity evidence.
    IF OBJECT_ID(N'dbo.CustomerAliases', N'U') IS NULL
    BEGIN
        CREATE TABLE dbo.CustomerAliases
        (
            ID bigint IDENTITY(1,1) NOT NULL CONSTRAINT PK_CustomerAliases PRIMARY KEY,
            CustomerID int NOT NULL,
            Alias nvarchar(500) NOT NULL,
            NormalizedAlias nvarchar(500) COLLATE Latin1_General_100_BIN2 NOT NULL,
            AliasHash binary(32) NOT NULL,
            IsActive bit NOT NULL CONSTRAINT DF_CustomerAliases_IsActive DEFAULT (1),
            CreatedBy int NOT NULL,
            CreatedAt datetime2(7) NOT NULL CONSTRAINT DF_CustomerAliases_CreatedAt DEFAULT (SYSDATETIME()),
            SourceBillReviewID uniqueidentifier NULL,
            CONSTRAINT FK_CustomerAliases_Customers FOREIGN KEY (CustomerID) REFERENCES dbo.Customers(ID),
            CONSTRAINT CK_CustomerAliases_Name CHECK (LEN(NormalizedAlias) > 0),
            CONSTRAINT CK_CustomerAliases_Hash CHECK
                (AliasHash = CONVERT(binary(32), HASHBYTES('SHA2_256', NormalizedAlias)))
        );
        CREATE UNIQUE INDEX UX_CustomerAliases_Customer_Hash ON dbo.CustomerAliases(CustomerID, AliasHash);
        CREATE INDEX IX_CustomerAliases_Hash_Active ON dbo.CustomerAliases(AliasHash, IsActive)
            INCLUDE (CustomerID, NormalizedAlias, Alias);
    END;

    COMMIT TRANSACTION;
END TRY
BEGIN CATCH
    IF @@TRANCOUNT > 0 ROLLBACK TRANSACTION;
    THROW;
END CATCH;

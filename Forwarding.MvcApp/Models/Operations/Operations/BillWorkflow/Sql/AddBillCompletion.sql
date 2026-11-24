/* Run the WHOLE script in the application database before deploying CompleteBill.
   SQL Server 2016+ is required by the existing JSON review persistence.
   Supports the original Phase 2 schema and the previous Phase 3 insertion script.
   Original CompletedBy/At values describe Phase 2: rename them to ReferencesConfirmedBy/At.
   Previous InsertedBy/At values describe Phase 3: rename them to CompletedBy/At.
   Reruns preserve both pairs. No audit values are copied over or overwritten.
   ReviewStatus 3 means Completed. OperationID stores the newly created child;
   C# models and API responses expose that existing column as CreatedOperationID.
   All audit dates use application-local time, consistently with the legacy application.
   AIDocumentExtraction.CompletedAt still describes Phase 1 and is not changed. */
SET NOCOUNT ON;
SET XACT_ABORT ON;
IF CONVERT(int, SERVERPROPERTY('ProductMajorVersion')) < 13
    THROW 51000, 'Bill completion requires SQL Server 2016 or later because the document-review workflow uses SQL JSON functions.', 1;
IF OBJECT_ID('dbo.AIDocumentBills', 'U') IS NULL OR OBJECT_ID('dbo.Operations', 'U') IS NULL
    THROW 51000, 'Select the application database containing AIDocumentBills and Operations before running this migration.', 1;

BEGIN TRY
    BEGIN TRANSACTION;

    -- Refuse ambiguous manual/partial migrations instead of discarding an audit column.
    IF COL_LENGTH('dbo.AIDocumentBills', 'ReferencesConfirmedBy') IS NOT NULL
       AND COL_LENGTH('dbo.AIDocumentBills', 'CompletedBy') IS NOT NULL
       AND COL_LENGTH('dbo.AIDocumentBills', 'InsertedBy') IS NOT NULL
        THROW 51000, 'Both legacy InsertedBy and current CompletedBy exist alongside ReferencesConfirmedBy. Review these audit columns before migrating.', 1;
    IF COL_LENGTH('dbo.AIDocumentBills', 'ReferencesConfirmedAt') IS NOT NULL
       AND COL_LENGTH('dbo.AIDocumentBills', 'CompletedAt') IS NOT NULL
       AND COL_LENGTH('dbo.AIDocumentBills', 'InsertedAt') IS NOT NULL
        THROW 51000, 'Both legacy InsertedAt and current CompletedAt exist alongside ReferencesConfirmedAt. Review these audit columns before migrating.', 1;

    IF OBJECT_ID('dbo.CK_AIDocumentBills_ReviewStatus', 'C') IS NOT NULL
        ALTER TABLE dbo.AIDocumentBills DROP CONSTRAINT CK_AIDocumentBills_ReviewStatus;
    IF OBJECT_ID('dbo.CK_AIDocumentBills_Completion', 'C') IS NOT NULL
        ALTER TABLE dbo.AIDocumentBills DROP CONSTRAINT CK_AIDocumentBills_Completion;
    IF OBJECT_ID('dbo.CK_AIDocumentBills_Insertion', 'C') IS NOT NULL
        ALTER TABLE dbo.AIDocumentBills DROP CONSTRAINT CK_AIDocumentBills_Insertion;
    IF OBJECT_ID('dbo.CK_AIDocumentBills_ReferencesConfirmed', 'C') IS NOT NULL
        ALTER TABLE dbo.AIDocumentBills DROP CONSTRAINT CK_AIDocumentBills_ReferencesConfirmed;

    -- Rename Phase 2 audit first, freeing CompletedBy/At for the real workflow completion.
    IF COL_LENGTH('dbo.AIDocumentBills', 'ReferencesConfirmedBy') IS NULL
       AND COL_LENGTH('dbo.AIDocumentBills', 'CompletedBy') IS NOT NULL
        EXEC sys.sp_rename N'dbo.AIDocumentBills.CompletedBy', N'ReferencesConfirmedBy', N'COLUMN';
    IF COL_LENGTH('dbo.AIDocumentBills', 'ReferencesConfirmedAt') IS NULL
       AND COL_LENGTH('dbo.AIDocumentBills', 'CompletedAt') IS NOT NULL
        EXEC sys.sp_rename N'dbo.AIDocumentBills.CompletedAt', N'ReferencesConfirmedAt', N'COLUMN';

    -- Preserve Phase 3 values when the previous insertion migration was already deployed.
    IF COL_LENGTH('dbo.AIDocumentBills', 'CompletedBy') IS NULL
       AND COL_LENGTH('dbo.AIDocumentBills', 'InsertedBy') IS NOT NULL
        EXEC sys.sp_rename N'dbo.AIDocumentBills.InsertedBy', N'CompletedBy', N'COLUMN';
    IF COL_LENGTH('dbo.AIDocumentBills', 'CompletedAt') IS NULL
       AND COL_LENGTH('dbo.AIDocumentBills', 'InsertedAt') IS NOT NULL
        EXEC sys.sp_rename N'dbo.AIDocumentBills.InsertedAt', N'CompletedAt', N'COLUMN';

    IF COL_LENGTH('dbo.AIDocumentBills', 'ReferencesConfirmedBy') IS NULL
        EXEC(N'ALTER TABLE dbo.AIDocumentBills ADD ReferencesConfirmedBy int NULL;');
    IF COL_LENGTH('dbo.AIDocumentBills', 'ReferencesConfirmedAt') IS NULL
        EXEC(N'ALTER TABLE dbo.AIDocumentBills ADD ReferencesConfirmedAt datetime2(7) NULL;');
    IF COL_LENGTH('dbo.AIDocumentBills', 'CompletedBy') IS NULL
        EXEC(N'ALTER TABLE dbo.AIDocumentBills ADD CompletedBy int NULL;');
    IF COL_LENGTH('dbo.AIDocumentBills', 'CompletedAt') IS NULL
        EXEC(N'ALTER TABLE dbo.AIDocumentBills ADD CompletedAt datetime2(7) NULL;');
    IF COL_LENGTH('dbo.AIDocumentBills', 'OperationID') IS NULL
        EXEC(N'ALTER TABLE dbo.AIDocumentBills ADD OperationID bigint NULL;');

    -- Dynamic batches allow the newly added columns to compile on the first execution.
    EXEC(N'ALTER TABLE dbo.AIDocumentBills WITH CHECK ADD
        CONSTRAINT CK_AIDocumentBills_ReviewStatus CHECK (ReviewStatus IN (0,1,2,3)),
        CONSTRAINT CK_AIDocumentBills_ReferencesConfirmed CHECK (
            (ReviewStatus IN (2,3) AND ReferencesConfirmedBy IS NOT NULL AND ReferencesConfirmedBy > 0 AND ReferencesConfirmedAt IS NOT NULL)
            OR (ReviewStatus IN (0,1) AND ReferencesConfirmedBy IS NULL AND ReferencesConfirmedAt IS NULL)),
        CONSTRAINT CK_AIDocumentBills_Completion CHECK (
            (ReviewStatus = 3 AND OperationID IS NOT NULL AND OperationID > 0
             AND CompletedBy IS NOT NULL AND CompletedBy > 0 AND CompletedAt IS NOT NULL)
            OR (ReviewStatus <> 3 AND OperationID IS NULL AND CompletedBy IS NULL AND CompletedAt IS NULL));');
    IF OBJECT_ID('dbo.FK_AIDocumentBills_Operations', 'F') IS NULL
        EXEC(N'ALTER TABLE dbo.AIDocumentBills WITH CHECK ADD CONSTRAINT FK_AIDocumentBills_Operations
               FOREIGN KEY (OperationID) REFERENCES dbo.Operations(ID);');
    IF NOT EXISTS (SELECT 1 FROM sys.indexes WHERE object_id = OBJECT_ID('dbo.AIDocumentBills')
                   AND name = 'UX_AIDocumentBills_OperationID')
        EXEC(N'CREATE UNIQUE INDEX UX_AIDocumentBills_OperationID ON dbo.AIDocumentBills(OperationID)
               WHERE OperationID IS NOT NULL;');
    -- Supports the serializable duplicate-house check without scanning all Operations.
    IF NOT EXISTS (SELECT 1 FROM sys.indexes WHERE object_id = OBJECT_ID('dbo.Operations')
                   AND name = 'IX_Operations_BillWorkflow_HouseNumber')
        CREATE INDEX IX_Operations_BillWorkflow_HouseNumber ON dbo.Operations(HouseNumber)
            INCLUDE (ID, MasterOperationID) WHERE BLType = 2;
    COMMIT TRANSACTION;
END TRY
BEGIN CATCH
    IF XACT_STATE() <> 0 ROLLBACK TRANSACTION;
    THROW;
END CATCH;

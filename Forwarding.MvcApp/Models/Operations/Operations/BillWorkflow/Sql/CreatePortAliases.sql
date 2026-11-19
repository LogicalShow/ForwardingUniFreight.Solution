
SET NOCOUNT ON;
SET XACT_ABORT ON;

IF CONVERT(int, SERVERPROPERTY('ProductMajorVersion')) < 13
    THROW 51000, 'The bill workflow targets SQL Server 2016 (13.x) or later. Run this deployment script on a supported SQL Server instance.', 1;
IF OBJECT_ID(N'dbo.Ports', N'U') IS NULL
    THROW 51000, 'dbo.Ports was not found. Select the application database containing the Ports master table before running this script.', 1;
IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID(N'dbo.Ports')
               AND name = N'ID' AND system_type_id = TYPE_ID(N'int'))
    THROW 51000, 'PortAliases.PortID expects the existing dbo.Ports.ID column to be int. Review this database schema before deployment.', 1;
IF @@TRANCOUNT <> 0
    THROW 51000, 'Run this script outside an existing transaction.', 1;

BEGIN TRY
    BEGIN TRANSACTION;

    IF OBJECT_ID(N'dbo.PortAliases', N'U') IS NULL
    BEGIN
        CREATE TABLE dbo.PortAliases
        (
            ID bigint IDENTITY(1, 1) NOT NULL,
            PortID int NOT NULL,
            Alias nvarchar(500) NOT NULL,
            NormalizedAlias nvarchar(500) NOT NULL,
            AliasHash binary(32) NOT NULL,
            IsActive bit NOT NULL CONSTRAINT DF_PortAliases_IsActive DEFAULT (1),
            CreatedBy int NOT NULL,
            CreatedAt datetime2(7) NOT NULL CONSTRAINT DF_PortAliases_CreatedAt DEFAULT (SYSDATETIME()),
            SourceAIDocumentBillID uniqueidentifier NULL,
            CONSTRAINT PK_PortAliases PRIMARY KEY (ID),
            CONSTRAINT FK_PortAliases_Ports FOREIGN KEY (PortID) REFERENCES dbo.Ports(ID)
        );
    END;

    IF NOT EXISTS (SELECT 1 FROM sys.indexes WHERE object_id = OBJECT_ID(N'dbo.PortAliases')
                   AND name = N'UX_PortAliases_Port_Hash')
        CREATE UNIQUE INDEX UX_PortAliases_Port_Hash ON dbo.PortAliases(PortID, AliasHash);

    IF NOT EXISTS (SELECT 1 FROM sys.indexes WHERE object_id = OBJECT_ID(N'dbo.PortAliases')
                   AND name = N'IX_PortAliases_Hash_Active')
        CREATE INDEX IX_PortAliases_Hash_Active ON dbo.PortAliases(AliasHash, IsActive)
            INCLUDE (PortID, NormalizedAlias, Alias);

    COMMIT TRANSACTION;
    PRINT N'PortAliases is ready. Existing master and bill data was preserved.';
END TRY
BEGIN CATCH
    IF XACT_STATE() <> 0 ROLLBACK TRANSACTION;
    THROW;
END CATCH;

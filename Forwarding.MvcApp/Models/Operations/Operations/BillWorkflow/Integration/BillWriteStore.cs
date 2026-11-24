using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Globalization;
using System.Linq;
using BillWorkflow.Common.Contracts;
using BillWorkflow.Common.Exceptions;
using BillWorkflow.Common.Extraction;
using BillWorkflow.Common.Validation;
using Newtonsoft.Json;

namespace Forwarding.MvcApp.Models.Operations.Operations.BillWorkflow.Integration
{
    public class BillWriteStore
    {
        private readonly string connectionString;
        private readonly bool isDemo;
        private readonly BillContextProvider contexts;
        private readonly CustomerDirectory customers;
        private readonly PortDirectory ports;
        private readonly TemporaryContainerTypeProvider containerTypes;

        public BillWriteStore(string connectionString, bool isDemo, TemporaryContainerTypeProvider containerTypes)
        {
            if (string.IsNullOrWhiteSpace(connectionString)) throw new ArgumentException(BillWorkflowMessages.ConnectionRequired);
            if (containerTypes == null) throw new ArgumentNullException("containerTypes");
            this.connectionString = connectionString;
            this.isDemo = isDemo;
            this.containerTypes = containerTypes;
            contexts = new BillContextProvider(connectionString);
            customers = new CustomerDirectory(connectionString);
            ports = new PortDirectory(connectionString);
        }

        public BillCompletionResult GetCompletionResult(Guid billReviewId)
        {
            using (var connection = new SqlConnection(connectionString))
            {
                connection.Open();
                return ReadCompletionResult(connection, null, billReviewId);
            }
        }

        public BillCompletionResult Insert(BillWriteSet writeSet, int userId)
        {
            using (var connection = new SqlConnection(connectionString))
            {
                connection.Open();
                using (var transaction = connection.BeginTransaction(IsolationLevel.Serializable))
                {
                    var result = Insert(connection, transaction, writeSet, userId);
                    transaction.Commit();
                    return result;
                }
            }
        }

        // Kept separate so the entire write sequence has one transaction owner above.
        internal BillCompletionResult Insert(SqlConnection connection, SqlTransaction transaction,
            BillWriteSet writeSet, int userId)
        {
            if (writeSet == null || writeSet.Operation == null || userId <= 0)
                throw new ArgumentException(BillWorkflowMessages.InvalidBillCompletionRequest);
            var context = LockDocument(connection, transaction, writeSet);
            var bill = LockBill(connection, transaction, writeSet);
            var master = contexts.LoadMasterOperationForWrite(writeSet.Operation.MasterOperationID, userId, connection, transaction);
            if (bill.Status == BillReviewStatus.Completed)
                return ReadCompletionResult(connection, transaction, writeSet.BillReviewId);
            RequireConfirmedVersion(bill, writeSet);
            RequireCurrentContext(context, master, writeSet);

            // Rebuild from locked source rows and current eligible IDs. No earlier snapshot
            // can bypass validation if master data changed between preparation and insertion.
            var current = PrepareLockedWriteSet(connection, transaction, context, master, bill, writeSet, userId);
            RequireUniqueHouse(connection, transaction, current.Operation.HouseNumber);
            var now = DateTime.Now;
            var operationId = InsertOperation(connection, transaction, current.Operation, userId, now);
            InsertPartners(connection, transaction, operationId, current.Partners, userId, now);
            InsertMainRouting(connection, transaction, operationId, current.VoyageNumber, userId, now);
            InsertContainers(connection, transaction, current, operationId, userId, now);
            UpdateMaster(connection, transaction, current, userId, now);
            MarkCompleted(connection, transaction, current, operationId, userId, now);
            return ReadCompletionResult(connection, transaction, current.BillReviewId);
        }

        private BillContext LockDocument(SqlConnection connection, SqlTransaction transaction, BillWriteSet writeSet)
        {
            using (var command = CreateCommand(connection, transaction, @"
SELECT EntityID, ReviewContextJson
FROM dbo.AIDocumentExtraction WITH (UPDLOCK, HOLDLOCK)
WHERE ID = @DocumentID AND IsDemo = @IsDemo AND EntityName = 'Operation'
  AND ExtractionStatus = 'Completed' AND BillsStatus = 'Ready' AND SupersededByExtractionID IS NULL;"))
            {
                Add(command, "@DocumentID", SqlDbType.UniqueIdentifier, writeSet.DocumentReviewId);
                Add(command, "@IsDemo", SqlDbType.Bit, isDemo);
                using (var reader = command.ExecuteReader())
                {
                    if (!reader.Read() || reader["EntityID"] == DBNull.Value || reader["ReviewContextJson"] == DBNull.Value)
                        throw Conflict(BillWorkflowCodes.ExtractionNotReady, BillWorkflowMessages.ExtractionNotReady);
                    var masterId = (long)reader["EntityID"];
                    if (masterId != writeSet.Operation.MasterOperationID)
                        throw Conflict(BillWorkflowCodes.MasterContextChanged, BillWorkflowMessages.MasterContextChanged);
                    var context = JsonConvert.DeserializeObject<BillContext>((string)reader["ReviewContextJson"]);
                    if (context == null) throw Conflict(BillWorkflowCodes.MasterContextChanged, BillWorkflowMessages.MasterContextChanged);
                    context.ParentReference = masterId.ToString(CultureInfo.InvariantCulture);
                    return context;
                }
            }
        }

        private static BillInsertionRecord LockBill(SqlConnection connection, SqlTransaction transaction, BillWriteSet writeSet)
        {
            using (var command = CreateCommand(connection, transaction, @"
SELECT Version, ReviewStatus, BillJson, BillWithConfidenceJson, ReferenceResolutionsJson
FROM dbo.AIDocumentBills WITH (UPDLOCK, HOLDLOCK)
WHERE ID = @BillID AND AIDocumentExtractionID = @DocumentID;"))
            {
                Add(command, "@BillID", SqlDbType.UniqueIdentifier, writeSet.BillReviewId);
                Add(command, "@DocumentID", SqlDbType.UniqueIdentifier, writeSet.DocumentReviewId);
                using (var reader = command.ExecuteReader())
                {
                    if (!reader.Read())
                        throw new DocumentReviewException(DocumentReviewFailure.NotFound,
                            BillWorkflowCodes.BillReviewNotFound, BillWorkflowMessages.BillReviewNotFound);
                    return new BillInsertionRecord
                    {
                        Version = (int)reader["Version"], Status = (BillReviewStatus)(int)reader["ReviewStatus"],
                        BillJson = (string)reader["BillJson"], ConfidenceJson = (string)reader["BillWithConfidenceJson"],
                        ReferencesJson = reader["ReferenceResolutionsJson"] as string
                    };
                }
            }
        }

        private static void RequireConfirmedVersion(BillInsertionRecord bill, BillWriteSet writeSet)
        {
            if (bill.Version != writeSet.ExpectedReviewVersion)
                throw Conflict(BillWorkflowCodes.BillReviewVersionChanged, BillWorkflowMessages.BillReviewVersionChanged);
            if (bill.Status != BillReviewStatus.ReferencesConfirmed)
                throw Conflict(BillWorkflowCodes.ReferencesNotConfirmed, BillWorkflowMessages.ReferencesNotConfirmed);
        }

        private static void RequireCurrentContext(BillContext context, MasterOperationContext master, BillWriteSet writeSet)
        {
            if (context.Version != master.Version || master.Version != writeSet.MasterContextVersion ||
                context.Direction != (master.DirectionType == 1 ? "Import" : "Export"))
                throw Conflict(BillWorkflowCodes.MasterContextChanged, BillWorkflowMessages.MasterContextChanged);
        }

        private BillWriteSet PrepareLockedWriteSet(SqlConnection connection, SqlTransaction transaction,
            BillContext context, MasterOperationContext master, BillInsertionRecord record, BillWriteSet requested, int userId)
        {
            var parsed = new BillOfLadingJsonAdapter().ReadStoredBill(record.BillJson, record.ConfidenceJson);
            if (parsed.Bill == null || parsed.Issues.Count > 0)
                throw new DocumentReviewException(DocumentReviewFailure.Conflict,
                    BillWorkflowCodes.BillReviewNotReady, BillWorkflowMessages.BillReviewNotReady, parsed.Issues);
            var references = JsonConvert.DeserializeObject<List<ReferenceResolution>>(record.ReferencesJson);
            var shipperId = GetReferenceId(references, "Shipper");
            var consigneeId = GetReferenceId(references, "Consignee");
            RequireCustomer(connection, transaction, context, userId, shipperId, "Shipper");
            RequireCustomer(connection, transaction, context, userId, consigneeId, "Consignee");
            var loading = RequirePort(connection, transaction, context, userId, GetReferenceId(references, "PortOfLoading"));
            var discharge = RequirePort(connection, transaction, context, userId, GetReferenceId(references, "PortOfDischarge"));
            var typeIds = containerTypes.GetContainerTypeIds(parsed.Bill.Containers, connection, transaction);
            return new BillWriteSetBuilder().Build(new BillWriteSources
            {
                Review = new ConfirmedBill
                {
                    DocumentReviewId = requested.DocumentReviewId, BillReviewId = requested.BillReviewId,
                    Version = record.Version, Context = context, Bill = parsed.Bill
                },
                Master = master, ShipperID = shipperId, ConsigneeID = consigneeId,
                PortOfLoading = loading, PortOfDischarge = discharge, ContainerTypeIds = typeIds
            });
        }

        private static int GetReferenceId(List<ReferenceResolution> references, string role)
        {
            var matches = (references ?? new List<ReferenceResolution>()).Where(r => r != null && r.Reference != null &&
                r.Reference.LookupKey == role && r.Reference.Role == role && r.Reference.Id > 0).ToList();
            if (matches.Count != 1)
                throw Conflict(BillWorkflowCodes.RequiredReferencesNotConfirmed,
                    string.Format(CultureInfo.InvariantCulture, BillWorkflowMessages.RequiredReferencesNotConfirmed, role));
            return matches[0].Reference.Id.Value;
        }

        private void RequireCustomer(SqlConnection connection, SqlTransaction transaction, BillContext context,
            int userId, int id, string party)
        {
            if (customers.GetById(id, party, context, userId, connection, transaction) == null)
                throw Conflict(BillWorkflowCodes.CustomerNotAvailable, BillWorkflowMessages.CustomerNotAvailable);
        }

        private PortRecord RequirePort(SqlConnection connection, SqlTransaction transaction, BillContext context, int userId, int id)
        {
            var port = ports.GetById(id, context, userId, connection, transaction);
            if (port == null) throw Conflict(BillWorkflowCodes.PortNotAvailable, BillWorkflowMessages.PortNotAvailable);
            return port;
        }

        private static void RequireUniqueHouse(SqlConnection connection, SqlTransaction transaction, string houseNumber)
        {
            using (var command = CreateCommand(connection, transaction, @"
SELECT TOP (1) ID FROM dbo.Operations WITH (UPDLOCK, HOLDLOCK)
WHERE BLType = 2 AND HouseNumber = @HouseNumber;"))
            {
                Add(command, "@HouseNumber", SqlDbType.NVarChar, houseNumber, 50);
                if (command.ExecuteScalar() != null)
                    throw Conflict(BillWorkflowCodes.DuplicateHouseBill, BillWorkflowMessages.DuplicateHouseBill, "BillOfLadingNumber");
            }
        }

        private static long InsertOperation(SqlConnection connection, SqlTransaction transaction, BillOperationWrite operation,
            int userId, DateTime now)
        {
            using (var command = CreateCommand(connection, transaction, @"
INSERT dbo.Operations
 (Code, CodeSerial, HouseNumber, BookingNumber, BranchID, SalesmanID, OperationManID, CurrencyID,
  BLType, BLTypeIconName, BLTypeIconStyle, DirectionType, DirectionIconName, DirectionIconStyle,
  TransportType, TransportIconName, TransportIconStyle, ShipmentType, ShipperID, ConsigneeID,
  AgentID, ShippingLineID, POLCountryID, POL, PODCountryID, POD, VesselID, OperationStageID, MasterOperationID,
  OpenDate, CloseDate, IssuingDate, IncludePickup, IncludeDelivery, IsDangerousGoods, IsDelivered,
  GrossWeight, Volume, NumberOfPackages, NumberOfHousesConnected, ATAPODAlarmStatus,
  CreatorUserID, CreationDate, ModificatorUserID, ModificationDate)
SELECT m.Code, m.CodeSerial, @HouseNumber, @BookingNumber, @BranchID, @SalesmanID, @OperationManID, @CurrencyID,
  2, N'fa-link', N'house-icon-style', @DirectionType, @DirectionIconName, @DirectionIconStyle,
  @TransportType, @TransportIconName, @TransportIconStyle, @ShipmentType, @ShipperID, @ConsigneeID,
  @AgentID, @ShippingLineID, @POLCountryID, @POL, @PODCountryID, @POD, @VesselID, @StageID, @MasterID,
  @Now, CONVERT(datetime,'20520101',112), @IssueDate, 0, 0, 0, 0,
  @GrossWeight, @Volume, @Packages, 0, 0, @UserID, @Now, @UserID, @Now
FROM dbo.Operations m WHERE m.ID = @MasterID;
SELECT CONVERT(bigint, SCOPE_IDENTITY());"))
            {
                Add(command, "@MasterID", SqlDbType.BigInt, operation.MasterOperationID);
                Add(command, "@HouseNumber", SqlDbType.NVarChar, operation.HouseNumber, 50);
                Add(command, "@BookingNumber", SqlDbType.NVarChar, operation.BookingNumber, 200);
                Add(command, "@BranchID", SqlDbType.Int, operation.BranchID);
                Add(command, "@SalesmanID", SqlDbType.Int, operation.SalesmanID);
                Add(command, "@OperationManID", SqlDbType.Int, operation.OperationManID);
                Add(command, "@CurrencyID", SqlDbType.Int, operation.CurrencyID);
                Add(command, "@DirectionType", SqlDbType.Int, operation.DirectionType);
                Add(command, "@DirectionIconName", SqlDbType.NVarChar, operation.DirectionIconName, 30);
                Add(command, "@DirectionIconStyle", SqlDbType.NVarChar, operation.DirectionIconStyle, 50);
                Add(command, "@TransportType", SqlDbType.Int, operation.TransportType);
                Add(command, "@TransportIconName", SqlDbType.NVarChar, operation.TransportIconName, 30);
                Add(command, "@TransportIconStyle", SqlDbType.NVarChar, operation.TransportIconStyle, 50);
                Add(command, "@ShipmentType", SqlDbType.Int, operation.ShipmentType);
                Add(command, "@ShipperID", SqlDbType.Int, operation.ShipperID);
                Add(command, "@ConsigneeID", SqlDbType.Int, operation.ConsigneeID);
                Add(command, "@AgentID", SqlDbType.Int, operation.AgentID);
                Add(command, "@ShippingLineID", SqlDbType.Int, operation.ShippingLineID);
                Add(command, "@POLCountryID", SqlDbType.Int, operation.POLCountryID);
                Add(command, "@POL", SqlDbType.Int, operation.POL);
                Add(command, "@PODCountryID", SqlDbType.Int, operation.PODCountryID);
                Add(command, "@POD", SqlDbType.Int, operation.POD);
                Add(command, "@VesselID", SqlDbType.Int, operation.VesselID);
                Add(command, "@StageID", SqlDbType.Int, operation.OperationStageID);
                Add(command, "@IssueDate", SqlDbType.DateTime, operation.IssuingDate);
                AddAmount(command, "@GrossWeight", operation.GrossWeight);
                AddAmount(command, "@Volume", operation.Volume);
                Add(command, "@Packages", SqlDbType.Int, operation.NumberOfPackages);
                AddAudit(command, userId, now);
                return Convert.ToInt64(command.ExecuteScalar(), CultureInfo.InvariantCulture);
            }
        }

        private static void InsertPartners(SqlConnection connection, SqlTransaction transaction, long operationId,
            List<BillPartnerWrite> partners, int userId, DateTime now)
        {
            foreach (var partner in partners)
            using (var command = CreateCommand(connection, transaction, @"
INSERT dbo.OperationPartners
 (OperationID, OperationPartnerTypeID, CustomerID, IsOperationClient,
  CreatorUserID, CreationDate, ModificatorUserID, ModificationDate)
VALUES (@OperationID, @TypeID, @CustomerID, @IsClient, @UserID, @Now, @UserID, @Now);"))
            {
                Add(command, "@OperationID", SqlDbType.BigInt, operationId);
                Add(command, "@TypeID", SqlDbType.Int, partner.OperationPartnerTypeID);
                Add(command, "@CustomerID", SqlDbType.Int, partner.CustomerID);
                Add(command, "@IsClient", SqlDbType.Bit, partner.IsOperationClient);
                AddAudit(command, userId, now);
                command.ExecuteNonQuery();
            }
        }

        private static void InsertMainRouting(SqlConnection connection, SqlTransaction transaction, long operationId,
            string voyage, int userId, DateTime now)
        {
            // The existing Operations UI expects main carriage (30). Unknown movement
            // dates use the same 1900 sentinel as its normal insertion path.
            using (var command = CreateCommand(connection, transaction, @"
INSERT dbo.Routings
 (OperationID, RoutingTypeID, TransportType, TransportIconName, TransportIconStyle,
  POLCountryID, POL, PODCountryID, POD, VesselID, ShippingLineID, VoyageOrTruckNumber,
  ETAPOLDate, ATAPOLDate, ExpectedDeparture, ActualDeparture, ExpectedArrival, ActualArrival,
  IsFleet, IsLoaded, CreatorUserID, CreationDate, ModificatorUserID, ModificationDate)
SELECT ID, 30, TransportType, TransportIconName, TransportIconStyle,
  POLCountryID, POL, PODCountryID, POD, VesselID, ShippingLineID, @Voyage,
  @UnknownDate, @UnknownDate, @UnknownDate, @UnknownDate, @UnknownDate, @UnknownDate,
  0, 0, @UserID, @Now, @UserID, @Now
FROM dbo.Operations WHERE ID = @OperationID;"))
            {
                Add(command, "@OperationID", SqlDbType.BigInt, operationId);
                Add(command, "@Voyage", SqlDbType.NVarChar, voyage, -1);
                Add(command, "@UnknownDate", SqlDbType.DateTime, new DateTime(1900, 1, 1));
                AddAudit(command, userId, now);
                command.ExecuteNonQuery();
            }
        }

        private static void InsertContainers(SqlConnection connection, SqlTransaction transaction, BillWriteSet writeSet,
            long operationId, int userId, DateTime now)
        {
            // Stable ordering limits lock-order conflicts for bills sharing master containers.
            foreach (var container in writeSet.Containers.OrderBy(c => c.ContainerNumber, StringComparer.OrdinalIgnoreCase))
            {
                var containerId = FindMasterContainer(connection, transaction, writeSet.Operation.MasterOperationID, container);
                if (!containerId.HasValue)
                    containerId = InsertMasterContainer(connection, transaction, writeSet.Operation.MasterOperationID, container, userId, now);
                InsertContainerLink(connection, transaction, operationId, containerId.Value, userId, now);
            }
        }

        private static long? FindMasterContainer(SqlConnection connection, SqlTransaction transaction, long masterId,
            BillContainerWrite container)
        {
            using (var command = CreateCommand(connection, transaction, @"
SELECT ID, ContainerTypeID FROM dbo.OperationContainersAndPackages WITH (UPDLOCK, HOLDLOCK)
WHERE OperationID = @MasterID AND ContainerNumber = @Number;"))
            {
                Add(command, "@MasterID", SqlDbType.BigInt, masterId);
                Add(command, "@Number", SqlDbType.NVarChar, container.ContainerNumber, 50);
                using (var reader = command.ExecuteReader())
                {
                    if (!reader.Read()) return null;
                    var id = (long)reader["ID"];
                    var typeId = reader["ContainerTypeID"] == DBNull.Value ? 0 : (int)reader["ContainerTypeID"];
                    if (reader.Read())
                        throw Conflict(BillWorkflowCodes.MasterContainerDuplicated, BillWorkflowMessages.MasterContainerDuplicated,
                            ContainerField(container, "ContainerNo"));
                    if (typeId != container.ContainerTypeID)
                        throw Conflict(BillWorkflowCodes.MasterContainerTypeConflict, BillWorkflowMessages.MasterContainerTypeConflict,
                            ContainerField(container, "Type"));
                    // Reuse leaves existing master seal/cargo values untouched.
                    return id;
                }
            }
        }

        private static long InsertMasterContainer(SqlConnection connection, SqlTransaction transaction, long masterId,
            BillContainerWrite container, int userId, DateTime now)
        {
            using (var command = CreateCommand(connection, transaction, @"
INSERT dbo.OperationContainersAndPackages
 (OperationID, ContainerTypeID, ContainerNumber, CarrierSeal, Quantity, NumberOfPackagesOnContainer,
  GrossWeight, Volume, IsAsAgreed, IsMinimum, IsOwnedByCompany, IsFull,
  CreatorUserID, CreationDate, ModificatorUserID, ModificationDate)
VALUES (@MasterID, @TypeID, @Number, @Seal, 1, @Packages, @Weight, @Volume, 0, 0, 0, 1, @UserID, @Now, @UserID, @Now);
SELECT CONVERT(bigint, SCOPE_IDENTITY());"))
            {
                Add(command, "@MasterID", SqlDbType.BigInt, masterId);
                Add(command, "@TypeID", SqlDbType.Int, container.ContainerTypeID);
                Add(command, "@Number", SqlDbType.NVarChar, container.ContainerNumber, 50);
                Add(command, "@Seal", SqlDbType.NVarChar, container.CarrierSeal, 15);
                Add(command, "@Packages", SqlDbType.Int, container.NumberOfPackagesOnContainer);
                AddAmount(command, "@Weight", container.GrossWeight);
                AddAmount(command, "@Volume", container.Volume);
                AddAudit(command, userId, now);
                return Convert.ToInt64(command.ExecuteScalar(), CultureInfo.InvariantCulture);
            }
        }

        private static void InsertContainerLink(SqlConnection connection, SqlTransaction transaction, long operationId,
            long containerId, int userId, DateTime now)
        {
            using (var command = CreateCommand(connection, transaction, @"
INSERT dbo.OperationContainersAndPackagesPlacedOn
 (OperationID, OperationContainersAndPackagesID, CreatorUserID, CreationDate, ModificatorUserID, ModificationDate)
VALUES (@OperationID, @ContainerID, @UserID, @Now, @UserID, @Now);"))
            {
                Add(command, "@OperationID", SqlDbType.BigInt, operationId);
                Add(command, "@ContainerID", SqlDbType.BigInt, containerId);
                AddAudit(command, userId, now);
                command.ExecuteNonQuery();
            }
        }

        private void UpdateMaster(SqlConnection connection, SqlTransaction transaction, BillWriteSet writeSet, int userId, DateTime now)
        {
            using (var command = CreateCommand(connection, transaction, @"
UPDATE dbo.Operations
SET NumberOfHousesConnected = (SELECT COUNT(*) FROM dbo.Operations WHERE MasterOperationID = @MasterID AND BLType = 2),
    ModificatorUserID = @UserID, ModificationDate = @Now
WHERE ID = @MasterID;"))
            {
                Add(command, "@MasterID", SqlDbType.BigInt, writeSet.Operation.MasterOperationID);
                AddAudit(command, userId, now);
                command.ExecuteNonQuery();
            }
            var master = contexts.LoadMasterOperationForWrite(writeSet.Operation.MasterOperationID, userId, connection, transaction);
            using (var command = CreateCommand(connection, transaction, @"
UPDATE dbo.AIDocumentExtraction SET ReviewContextJson = @Context WHERE ID = @DocumentID AND IsDemo = @IsDemo;"))
            {
                // The only inherited change made here is the master's audited house count.
                // Refresh this document's stamp so its other bills can continue normally.
                Add(command, "@Context", SqlDbType.NVarChar, JsonConvert.SerializeObject(new
                {
                    Direction = master.DirectionType == 1 ? "Import" : "Export", Version = master.Version
                }), -1);
                Add(command, "@DocumentID", SqlDbType.UniqueIdentifier, writeSet.DocumentReviewId);
                Add(command, "@IsDemo", SqlDbType.Bit, isDemo);
                command.ExecuteNonQuery();
            }
        }

        private static void MarkCompleted(SqlConnection connection, SqlTransaction transaction, BillWriteSet writeSet,
            long operationId, int userId, DateTime now)
        {
            using (var command = CreateCommand(connection, transaction, @"
UPDATE dbo.AIDocumentBills
SET OperationID = @OperationID, ReviewStatus = 3, CompletedBy = @UserID, CompletedAt = @Now,
    UpdatedBy = @UserID, UpdatedAt = @Now, Version = Version + 1
WHERE ID = @BillID AND AIDocumentExtractionID = @DocumentID AND Version = @Version AND ReviewStatus = 2;
SELECT @@ROWCOUNT;"))
            {
                Add(command, "@OperationID", SqlDbType.BigInt, operationId);
                Add(command, "@BillID", SqlDbType.UniqueIdentifier, writeSet.BillReviewId);
                Add(command, "@DocumentID", SqlDbType.UniqueIdentifier, writeSet.DocumentReviewId);
                Add(command, "@Version", SqlDbType.Int, writeSet.ExpectedReviewVersion);
                AddAudit(command, userId, now);
                if (Convert.ToInt32(command.ExecuteScalar(), CultureInfo.InvariantCulture) != 1)
                    throw Conflict(BillWorkflowCodes.BillReviewVersionChanged, BillWorkflowMessages.BillReviewVersionChanged);
            }
        }

        private BillCompletionResult ReadCompletionResult(SqlConnection connection, SqlTransaction transaction, Guid billId)
        {
            using (var command = CreateCommand(connection, transaction, @"
SELECT b.ID, b.Version, b.OperationID AS CreatedOperationID, o.Code
FROM dbo.AIDocumentBills b JOIN dbo.AIDocumentExtraction d ON d.ID = b.AIDocumentExtractionID
JOIN dbo.Operations o ON o.ID = b.OperationID
WHERE b.ID = @BillID AND b.ReviewStatus = 3 AND d.IsDemo = @IsDemo;"))
            {
                Add(command, "@BillID", SqlDbType.UniqueIdentifier, billId);
                Add(command, "@IsDemo", SqlDbType.Bit, isDemo);
                using (var reader = command.ExecuteReader())
                {
                    if (!reader.Read()) throw Conflict(BillWorkflowCodes.BillCompletionNotFound, BillWorkflowMessages.BillCompletionNotFound);
                    return new BillCompletionResult
                    {
                        BillReviewId = (Guid)reader["ID"], Version = (int)reader["Version"], ReviewStatus = BillReviewStatus.Completed,
                        CreatedOperationID = (long)reader["CreatedOperationID"], OperationCode = reader["Code"] as string
                    };
                }
            }
        }

        private static SqlCommand CreateCommand(SqlConnection connection, SqlTransaction transaction, string sql)
        {
            var command = connection.CreateCommand();
            command.Transaction = transaction;
            command.CommandText = sql;
            return command;
        }

        private static void Add(SqlCommand command, string name, SqlDbType type, object value, int size = 0)
        {
            var parameter = size == 0 ? command.Parameters.Add(name, type) : command.Parameters.Add(name, type, size);
            parameter.Value = value ?? DBNull.Value;
        }

        private static void AddAmount(SqlCommand command, string name, decimal? value)
        {
            var parameter = command.Parameters.Add(name, SqlDbType.Decimal);
            parameter.Precision = 15;
            parameter.Scale = 5;
            parameter.Value = (object)value ?? DBNull.Value;
        }

        private static void AddAudit(SqlCommand command, int userId, DateTime now)
        {
            Add(command, "@UserID", SqlDbType.Int, userId);
            Add(command, "@Now", SqlDbType.DateTime, now);
        }

        private static string ContainerField(BillContainerWrite container, string field)
        {
            return "Containers[" + container.ContainerIndex.ToString(CultureInfo.InvariantCulture) + "]." + field;
        }

        private static DocumentReviewException Conflict(string code, string message, string field = null)
        {
            if (field != null)
                return new DocumentReviewException(DocumentReviewFailure.Conflict, code, message,
                    new List<ValidationIssue> { new ValidationIssue { Code = code, FieldPath = field, Message = message } });
            return new DocumentReviewException(DocumentReviewFailure.Conflict, code, message);
        }

        private class BillInsertionRecord
        {
            public int Version { get; set; }
            public BillReviewStatus Status { get; set; }
            public string BillJson { get; set; }
            public string ConfidenceJson { get; set; }
            public string ReferencesJson { get; set; }
        }
    }
}

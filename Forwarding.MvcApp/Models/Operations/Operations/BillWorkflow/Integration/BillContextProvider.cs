using System;
using System.Data;
using System.Data.SqlClient;
using System.Globalization;
using BillWorkflow.Common.Abstractions;
using BillWorkflow.Common.Contracts;
using BillWorkflow.Common.Exceptions;
using BillWorkflow.Common.Validation;

namespace Forwarding.MvcApp.Models.Operations.Operations.BillWorkflow.Integration
{
    public class BillContextProvider : IBillContextProvider
    {
        private readonly string connectionString;

        public BillContextProvider(string connectionString)
        {
            if (string.IsNullOrWhiteSpace(connectionString))
                throw new ArgumentException(BillWorkflowMessages.ConnectionRequired);
            this.connectionString = connectionString;
        }

        public BillContext Load(string parentReference, int actingUserId)
        {
            return BuildBillContext(LoadOperation(parentReference, actingUserId));
        }

        public MasterOperationContext LoadMasterOperationContext(BillContext expectedContext, int actingUserId)
        {
            if (expectedContext == null) throw new ArgumentNullException("expectedContext");
            var operation = LoadOperation(expectedContext.ParentReference, actingUserId);
            return CreateMasterOperationContext(operation, expectedContext);
        }

        internal MasterOperationContext LoadMasterOperationForWrite(long masterId, int actingUserId,
            SqlConnection connection, SqlTransaction transaction)
        {
            var permission = LoadOperationsPermission(connection, actingUserId, transaction);
            if (!permission.CanAdd)
                throw new DocumentReviewException(DocumentReviewFailure.Forbidden,
                    BillWorkflowCodes.OperationsInsertAccessRequired, BillWorkflowMessages.OperationsInsertAccessRequired);
            var operation = LoadAccessibleMasterOperation(connection, masterId, actingUserId, permission, transaction);
            ValidateMasterOperation(operation);
            return CreateMasterOperationContext(operation, null);
        }

        private MasterOperationContext CreateMasterOperationContext(MasterOperationRecord operation, BillContext expectedContext)
        {
            var currentContext = BuildBillContext(operation);
            if (expectedContext != null &&
                (currentContext.Direction != expectedContext.Direction || currentContext.Version != expectedContext.Version))
                throw new DocumentReviewException(DocumentReviewFailure.Conflict,
                    BillWorkflowCodes.MasterContextChanged, BillWorkflowMessages.MasterContextChanged);

            return new MasterOperationContext
            {
                MasterOperationID = operation.Id, Version = currentContext.Version,
                DirectionType = operation.DirectionType, TransportType = operation.TransportType,
                ShipmentType = operation.ShipmentType, BranchID = operation.BranchID,
                SalesmanID = operation.SalesmanID, OperationManID = operation.OperationManID,
                CurrencyID = operation.CurrencyID, AgentID = operation.AgentID,
                ShippingLineID = operation.ShippingLineID, VesselID = operation.VesselID,
                OperationStageID = operation.OperationStageID,
                DirectionIconName = operation.DirectionIconName, DirectionIconStyle = operation.DirectionIconStyle,
                TransportIconName = operation.TransportIconName, TransportIconStyle = operation.TransportIconStyle
            };
        }

        private MasterOperationRecord LoadOperation(string parentReference, int actingUserId)
        {
            var masterId = ValidateInputs(parentReference, actingUserId);
            using (var connection = new SqlConnection(connectionString))
            {
                connection.Open();
                var permission = LoadOperationsPermission(connection, actingUserId);
                var operation = LoadAccessibleMasterOperation(connection, masterId, actingUserId, permission);
                ValidateMasterOperation(operation);
                return operation;
            }
        }

        private long ValidateInputs(string parentReference, int actingUserId)
        {
            long masterId;
            if (!long.TryParse(parentReference, NumberStyles.None, CultureInfo.InvariantCulture, out masterId)
                || masterId <= 0)
                throw new DocumentReviewException(DocumentReviewFailure.InvalidInput,
                    BillWorkflowCodes.MasterIdRequired, BillWorkflowMessages.MasterIdRequired);
            if (actingUserId <= 0)
                throw new DocumentReviewException(DocumentReviewFailure.Forbidden,
                    BillWorkflowCodes.UserRequired, BillWorkflowMessages.UserRequired);

            return masterId;
        }

        private OperationsPermission LoadOperationsPermission(SqlConnection connection, int actingUserId,
            SqlTransaction transaction = null)
        {
            using (var command = connection.CreateCommand())
            {
                command.Transaction = transaction;
                // Operations management uses FormID 29 and these visibility rules.
                command.CommandText = @"
SELECT TOP (1) f.HideOthersRecords, f.IsUsersShareRecords, f.RoleID, f.CanAdd
FROM dbo.vwUserForms f
JOIN dbo.Users u ON u.ID = f.UserID
WHERE f.UserID = @UserID AND f.FormID = 29 AND f.CanView = 1
  AND ISNULL(f.IsInactive, 0) = 0 AND ISNULL(u.IsInactive, 0) = 0;";
                command.Parameters.Add("@UserID", SqlDbType.Int).Value = actingUserId;
                using (var reader = command.ExecuteReader())
                {
                    if (!reader.Read())
                        throw new DocumentReviewException(DocumentReviewFailure.Forbidden,
                            BillWorkflowCodes.OperationsAccessRequired, BillWorkflowMessages.OperationsAccessRequired);
                    return new OperationsPermission
                    {
                        CanAdd = reader["CanAdd"] != DBNull.Value && Convert.ToBoolean(reader["CanAdd"], CultureInfo.InvariantCulture),
                        HideOthersRecords = reader["HideOthersRecords"] != DBNull.Value &&
                            Convert.ToBoolean(reader["HideOthersRecords"], CultureInfo.InvariantCulture),
                        IsUsersShareRecords = reader["IsUsersShareRecords"] != DBNull.Value &&
                            Convert.ToBoolean(reader["IsUsersShareRecords"], CultureInfo.InvariantCulture),
                        RoleId = reader["RoleID"] == DBNull.Value ? 0 :
                            Convert.ToInt32(reader["RoleID"], CultureInfo.InvariantCulture)
                    };
                }
            }
        }

        private MasterOperationRecord LoadAccessibleMasterOperation(SqlConnection connection, long masterId,
            int actingUserId, OperationsPermission permission, SqlTransaction transaction = null)
        {
            using (var command = connection.CreateCommand())
            {
                command.Transaction = transaction;
                // The enforced VesselID foreign key guarantees existence; join for its display name.
                command.CommandText = @"
SELECT o.ID, o.MasterOperationID, o.BLType, o.DirectionType, o.ModificationDate,
       NULLIF(o.VesselID, 0) AS VesselID, v.Name AS VesselName,
       o.TransportType, o.ShipmentType, o.BranchID, o.SalesmanID, o.OperationManID,
       o.CurrencyID, o.AgentID, o.ShippingLineID, o.OperationStageID,
       o.DirectionIconName, o.DirectionIconStyle, o.TransportIconName, o.TransportIconStyle
FROM dbo.Operations o" + (transaction == null ? "" : " WITH (UPDLOCK, HOLDLOCK)") + @"
LEFT JOIN dbo.Vessels v ON v.ID = o.VesselID
LEFT JOIN dbo.Users creator ON creator.ID = o.CreatorUserID
LEFT JOIN dbo.Users salesman ON salesman.ID = o.SalesmanID
LEFT JOIN dbo.Users operatorUser ON operatorUser.ID = o.OperationManID
WHERE o.ID = @MasterID";
                if (permission.IsUsersShareRecords)
                {
                    command.CommandText += @"
 AND (creator.RoleID = @RoleID OR salesman.RoleID = @RoleID OR operatorUser.RoleID = @RoleID)";
                    command.Parameters.Add("@RoleID", SqlDbType.Int).Value = permission.RoleId;
                }
                else if (permission.HideOthersRecords)
                {
                    command.CommandText += @"
 AND (o.CreatorUserID = @UserID OR o.SalesmanID = @UserID OR o.OperationManID = @UserID)";
                    command.Parameters.Add("@UserID", SqlDbType.Int).Value = actingUserId;
                }
                command.Parameters.Add("@MasterID", SqlDbType.BigInt).Value = masterId;
                using (var reader = command.ExecuteReader())
                {
                    if (!reader.Read())
                        throw new DocumentReviewException(DocumentReviewFailure.NotFound,
                            BillWorkflowCodes.MasterNotFound, BillWorkflowMessages.MasterNotFound);
                    return new MasterOperationRecord
                    {
                        Id = Convert.ToInt64(reader["ID"], CultureInfo.InvariantCulture),
                        ParentOperationID = reader["MasterOperationID"] == DBNull.Value ? (long?)null :
                            Convert.ToInt64(reader["MasterOperationID"], CultureInfo.InvariantCulture),
                        BLType = reader["BLType"] == DBNull.Value ? 0 :
                            Convert.ToInt32(reader["BLType"], CultureInfo.InvariantCulture),
                        DirectionType = reader["DirectionType"] == DBNull.Value ? 0 :
                            Convert.ToInt32(reader["DirectionType"], CultureInfo.InvariantCulture),
                        TransportType = reader["TransportType"] == DBNull.Value ? 0 :
                            Convert.ToInt32(reader["TransportType"], CultureInfo.InvariantCulture),
                        ShipmentType = ReadNullableInt(reader, "ShipmentType"),
                        BranchID = ReadNullableInt(reader, "BranchID"),
                        SalesmanID = ReadNullableInt(reader, "SalesmanID"),
                        OperationManID = ReadNullableInt(reader, "OperationManID"),
                        CurrencyID = ReadNullableInt(reader, "CurrencyID"),
                        AgentID = ReadNullableInt(reader, "AgentID"),
                        ShippingLineID = ReadNullableInt(reader, "ShippingLineID"),
                        OperationStageID = ReadNullableInt(reader, "OperationStageID"),
                        DirectionIconName = reader["DirectionIconName"] as string,
                        DirectionIconStyle = reader["DirectionIconStyle"] as string,
                        TransportIconName = reader["TransportIconName"] as string,
                        TransportIconStyle = reader["TransportIconStyle"] as string,
                        VesselID = ReadNullableInt(reader, "VesselID"),
                        VesselName = reader["VesselName"] as string,
                        ModifiedTicks = reader["ModificationDate"] == DBNull.Value ? 0 :
                            Convert.ToDateTime(reader["ModificationDate"], CultureInfo.InvariantCulture).Ticks
                    };
                }
            }
        }

        private void ValidateMasterOperation(MasterOperationRecord operation)
        {
            if ((operation.ParentOperationID.HasValue && operation.ParentOperationID.Value != 0) ||
                operation.BLType != 3)
                throw new DocumentReviewException(DocumentReviewFailure.InvalidInput,
                    BillWorkflowCodes.MasterOperationRequired, BillWorkflowMessages.MasterOperationRequired);
            if (operation.DirectionType != 1 && operation.DirectionType != 2)
                throw new DocumentReviewException(DocumentReviewFailure.InvalidInput,
                    BillWorkflowCodes.UnsupportedDirection, BillWorkflowMessages.UnsupportedDirection);
        }

        private static int? ReadNullableInt(SqlDataReader reader, string column)
        {
            return reader[column] == DBNull.Value ? (int?)null :
                Convert.ToInt32(reader[column], CultureInfo.InvariantCulture);
        }

        private BillContext BuildBillContext(MasterOperationRecord operation)
        {
            return new BillContext
            {
                ParentReference = operation.Id.ToString(CultureInfo.InvariantCulture),
                Direction = operation.DirectionType == 1 ? "Import" : "Export",
                VesselID = operation.VesselID,
                VesselName = operation.VesselName,
                // Protect inherited IDs even when another legacy writer changes VesselID
                // without changing ModificationDate. Reopening review refreshes this stamp.
                Version = string.Format(CultureInfo.InvariantCulture,
                    "{0}:{1}:{2}:{3}", operation.Id, operation.DirectionType, operation.ModifiedTicks,
                    operation.VesselID.GetValueOrDefault())
            };
        }

        private class OperationsPermission
        {
            public bool CanAdd { get; set; }
            public bool HideOthersRecords { get; set; }
            public bool IsUsersShareRecords { get; set; }
            public int RoleId { get; set; }
        }

        private class MasterOperationRecord
        {
            public long Id { get; set; }
            public long? ParentOperationID { get; set; }
            public int BLType { get; set; }
            public int DirectionType { get; set; }
            public int TransportType { get; set; }
            public int? ShipmentType { get; set; }
            public int? BranchID { get; set; }
            public int? SalesmanID { get; set; }
            public int? OperationManID { get; set; }
            public int? CurrencyID { get; set; }
            public int? AgentID { get; set; }
            public int? ShippingLineID { get; set; }
            public int? OperationStageID { get; set; }
            public string DirectionIconName { get; set; }
            public string DirectionIconStyle { get; set; }
            public string TransportIconName { get; set; }
            public string TransportIconStyle { get; set; }
            public long ModifiedTicks { get; set; }
            public int? VesselID { get; set; }
            public string VesselName { get; set; }
        }
    }
}

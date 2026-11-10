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
            var masterId = ValidateInputs(parentReference, actingUserId);
            using (var connection = new SqlConnection(connectionString))
            {
                connection.Open();
                var permission = LoadOperationsPermission(connection, actingUserId);
                var operation = LoadAccessibleMasterOperation(connection, masterId, actingUserId, permission);
                ValidateMasterOperation(operation);
                return BuildBillContext(operation);
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

        private OperationsPermission LoadOperationsPermission(SqlConnection connection, int actingUserId)
        {
            using (var command = connection.CreateCommand())
            {
                // Operations management uses FormID 29 and these visibility rules.
                command.CommandText = @"
SELECT TOP (1) f.HideOthersRecords, f.IsUsersShareRecords, f.RoleID
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

        private MasterOperationData LoadAccessibleMasterOperation(SqlConnection connection, long masterId,
            int actingUserId, OperationsPermission permission)
        {
            using (var command = connection.CreateCommand())
            {
                command.CommandText = @"
SELECT o.ID, o.MasterOperationID, o.BLType, o.DirectionType, o.ModificationDate
FROM dbo.Operations o
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
                    return new MasterOperationData
                    {
                        Id = Convert.ToInt64(reader["ID"], CultureInfo.InvariantCulture),
                        MasterOperationId = reader["MasterOperationID"] == DBNull.Value ? (long?)null :
                            Convert.ToInt64(reader["MasterOperationID"], CultureInfo.InvariantCulture),
                        BLType = reader["BLType"] == DBNull.Value ? 0 :
                            Convert.ToInt32(reader["BLType"], CultureInfo.InvariantCulture),
                        DirectionType = reader["DirectionType"] == DBNull.Value ? 0 :
                            Convert.ToInt32(reader["DirectionType"], CultureInfo.InvariantCulture),
                        ModifiedTicks = reader["ModificationDate"] == DBNull.Value ? 0 :
                            Convert.ToDateTime(reader["ModificationDate"], CultureInfo.InvariantCulture).Ticks
                    };
                }
            }
        }

        private void ValidateMasterOperation(MasterOperationData operation)
        {
            if ((operation.MasterOperationId.HasValue && operation.MasterOperationId.Value != 0) ||
                operation.BLType != 3)
                throw new DocumentReviewException(DocumentReviewFailure.InvalidInput,
                    BillWorkflowCodes.MasterOperationRequired, BillWorkflowMessages.MasterOperationRequired);
            if (operation.DirectionType != 1 && operation.DirectionType != 2)
                throw new DocumentReviewException(DocumentReviewFailure.InvalidInput,
                    BillWorkflowCodes.UnsupportedDirection, BillWorkflowMessages.UnsupportedDirection);
        }

        private BillContext BuildBillContext(MasterOperationData operation)
        {
            return new BillContext
            {
                ParentReference = operation.Id.ToString(CultureInfo.InvariantCulture),
                Direction = operation.DirectionType == 1 ? "Import" : "Export",
                Version = string.Format(CultureInfo.InvariantCulture,
                    "{0}:{1}:{2}", operation.Id, operation.DirectionType, operation.ModifiedTicks)
            };
        }

        private class OperationsPermission
        {
            public bool HideOthersRecords { get; set; }
            public bool IsUsersShareRecords { get; set; }
            public int RoleId { get; set; }
        }

        private class MasterOperationData
        {
            public long Id { get; set; }
            public long? MasterOperationId { get; set; }
            public int BLType { get; set; }
            public int DirectionType { get; set; }
            public long ModifiedTicks { get; set; }
        }
    }
}

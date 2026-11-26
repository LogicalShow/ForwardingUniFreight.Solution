using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Data;
using System.Data.SqlClient;
using System.Globalization;
using BillWorkflow.Common.Contracts;
using BillWorkflow.Common.Exceptions;
using BillWorkflow.Common.Validation;

namespace Forwarding.MvcApp.Models.Operations.Operations.BillWorkflow.Integration
{
    // First-cycle source only: ignore scanned type text and use one configured ID.
    // Later, Phase 2 decisions will supply the same index-to-ID assignments.
    public class TemporaryContainerTypeProvider
    {
        private readonly string connectionString;
        private readonly int containerTypeId;

        public TemporaryContainerTypeProvider(string connectionString, int containerTypeId)
        {
            if (string.IsNullOrWhiteSpace(connectionString))
                throw new ArgumentException(BillWorkflowMessages.ConnectionRequired);
            if (containerTypeId <= 0)
                throw new ArgumentOutOfRangeException("containerTypeId", BillWorkflowMessages.TemporaryContainerTypeIdRequired);
            this.connectionString = connectionString;
            this.containerTypeId = containerTypeId;
        }

        public IReadOnlyDictionary<int, int> GetContainerTypeIds(IReadOnlyList<Container> containers)
        {
            using (var connection = new SqlConnection(connectionString))
            {
                connection.Open();
                return GetContainerTypeIds(containers, connection, null);
            }
        }

        internal IReadOnlyDictionary<int, int> GetContainerTypeIds(IReadOnlyList<Container> containers,
            SqlConnection connection, SqlTransaction transaction)
        {
            if (containers == null) throw new ArgumentNullException("containers");
            var assignments = new Dictionary<int, int>();
            var issues = new List<ValidationIssue>();
            // Check once, including when called inside the writer's transaction.
            var typeAvailable = containers.Count == 0 || IsContainerTypeAvailable(connection, transaction);
            for (int index = 0; index < containers.Count; index++)
            {
                if (typeAvailable)
                    assignments.Add(index, containerTypeId);
                else
                    issues.Add(CreateIssue(index));
            }
            if (issues.Count > 0)
                throw new DocumentReviewException(DocumentReviewFailure.Conflict,
                    BillWorkflowCodes.BillWriteSourcesNotReady, BillWorkflowMessages.BillWriteSourcesNotReady, issues);
            return new ReadOnlyDictionary<int, int>(assignments);
        }

        private bool IsContainerTypeAvailable(SqlConnection connection, SqlTransaction transaction)
        {
            using (var command = connection.CreateCommand())
            {
                command.Transaction = transaction;
                command.CommandText = "SELECT ID FROM dbo.ContainerTypes WHERE ID = @ID AND ISNULL(IsInactive, 0) = 0;";
                command.Parameters.Add("@ID", SqlDbType.Int).Value = containerTypeId;
                return command.ExecuteScalar() != null;
            }
        }

        private static ValidationIssue CreateIssue(int index)
        {
            return new ValidationIssue
            {
                Code = BillWorkflowCodes.ContainerTypeNotAvailable,
                FieldPath = "Containers[" + index.ToString(CultureInfo.InvariantCulture) + "].Type",
                Message = BillWorkflowMessages.ContainerTypeNotAvailable
            };
        }
    }
}

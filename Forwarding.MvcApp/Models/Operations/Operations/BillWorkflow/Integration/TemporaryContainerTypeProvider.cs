using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Data;
using System.Data.SqlClient;
using System.Globalization;
using System.Linq;
using BillWorkflow.Common.Contracts;
using BillWorkflow.Common.Exceptions;
using BillWorkflow.Common.Validation;

namespace Forwarding.MvcApp.Models.Operations.Operations.BillWorkflow.Integration
{
    // First-cycle source only. Later, Phase 2 decisions will supply the same index-to-ID assignments.
    public class TemporaryContainerTypeProvider
    {
        private readonly string connectionString;
        private readonly Dictionary<string, int> mappings;

        public TemporaryContainerTypeProvider(string connectionString, IDictionary<string, int> mappings)
        {
            if (string.IsNullOrWhiteSpace(connectionString))
                throw new ArgumentException(BillWorkflowMessages.ConnectionRequired);
            if (mappings == null) throw new ArgumentNullException("mappings");
            this.connectionString = connectionString;
            this.mappings = new Dictionary<string, int>(StringComparer.OrdinalIgnoreCase);
            foreach (var mapping in mappings)
            {
                if (string.IsNullOrWhiteSpace(mapping.Key) || mapping.Value <= 0)
                    throw new ArgumentException(BillWorkflowMessages.TemporaryContainerMappingsInvalid);
                this.mappings.Add(mapping.Key.Trim(), mapping.Value);
            }
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
            for (int index = 0; index < containers.Count; index++)
            {
                var container = containers[index];
                var type = container == null ? null : container.Type;
                int typeId;
                if (string.IsNullOrWhiteSpace(type) || !mappings.TryGetValue(type.Trim(), out typeId))
                {
                    issues.Add(CreateIssue(index, BillWorkflowCodes.TemporaryContainerTypeNotSupported,
                        BillWorkflowMessages.TemporaryContainerTypeNotSupported));
                    continue;
                }
                assignments.Add(index, typeId);
            }
            RequireNoIssues(issues);
            if (assignments.Count == 0) return new ReadOnlyDictionary<int, int>(assignments);

            // Recheck master data on every preparation. Repeated containers share one ID read.
            var types = new Dictionary<int, ContainerTypeRecord>();
            foreach (var typeId in assignments.Values.Distinct())
                types.Add(typeId, LoadContainerType(connection, typeId, transaction));
            foreach (var assignment in assignments)
            {
                var type = types[assignment.Value];
                var scannedType = containers[assignment.Key].Type.Trim();
                if (type == null || type.IsInactive ||
                    (!string.Equals(scannedType, type.Code, StringComparison.OrdinalIgnoreCase) &&
                     !string.Equals(scannedType, type.Name, StringComparison.OrdinalIgnoreCase)))
                    issues.Add(CreateIssue(assignment.Key, BillWorkflowCodes.ContainerTypeNotAvailable,
                        BillWorkflowMessages.ContainerTypeNotAvailable));
            }
            RequireNoIssues(issues);
            return new ReadOnlyDictionary<int, int>(assignments);
        }

        private static ContainerTypeRecord LoadContainerType(SqlConnection connection, int typeId, SqlTransaction transaction)
        {
            using (var command = connection.CreateCommand())
            {
                command.Transaction = transaction;
                command.CommandText = "SELECT Code, Name, IsInactive FROM dbo.ContainerTypes WHERE ID = @ID;";
                command.Parameters.Add("@ID", SqlDbType.Int).Value = typeId;
                using (var reader = command.ExecuteReader())
                {
                    if (!reader.Read()) return null;
                    return new ContainerTypeRecord
                    {
                        Code = reader["Code"] as string, Name = reader["Name"] as string,
                        IsInactive = reader["IsInactive"] != DBNull.Value && (bool)reader["IsInactive"]
                    };
                }
            }
        }

        private static ValidationIssue CreateIssue(int index, string code, string message)
        {
            return new ValidationIssue
            {
                Code = code, FieldPath = "Containers[" + index.ToString(CultureInfo.InvariantCulture) + "].Type",
                Message = message
            };
        }

        private static void RequireNoIssues(List<ValidationIssue> issues)
        {
            if (issues.Count > 0)
                throw new DocumentReviewException(DocumentReviewFailure.Conflict,
                    BillWorkflowCodes.BillWriteSourcesNotReady, BillWorkflowMessages.BillWriteSourcesNotReady, issues);
        }

        private class ContainerTypeRecord
        {
            public string Code { get; set; }
            public string Name { get; set; }
            public bool IsInactive { get; set; }
        }
    }
}

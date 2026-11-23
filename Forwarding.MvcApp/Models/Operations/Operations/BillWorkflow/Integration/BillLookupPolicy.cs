using System.Collections.Generic;
using BillWorkflow.Common.Abstractions;
using BillWorkflow.Common.Contracts;
using BillWorkflow.Common.Exceptions;
using BillWorkflow.Common.Validation;

namespace Forwarding.MvcApp.Models.Operations.Operations.BillWorkflow.Integration
{
    public class BillLookupPolicy : IBillLookupPolicy
    {
        public IReadOnlyList<BillLookupRequirement> GetRequirements(BillOfLading bill, BillContext context)
        {
            string party;
            string field;
            string value;
            if (context.Direction == "Import")
            {
                party = "Consignee";
                field = "ConsigneeName";
                value = bill.ConsigneeName;
            }
            else if (context.Direction == "Export")
            {
                party = "Shipper";
                field = "ShipperName";
                value = bill.ShipperName;
            }
            else
                throw new DocumentReviewException(DocumentReviewFailure.InvalidInput,
                    BillWorkflowCodes.UnsupportedDirection, BillWorkflowMessages.UnsupportedDirection);

            return new[]
            {
                new BillLookupRequirement
                {
                    LookupKey = "Customer",
                    Role = "Customer",
                    ResolverKey = "Customer",
                    DisplayName = party.ToLowerInvariant(),
                    SourceParty = party,
                    SourceField = field,
                    SearchValue = value == null ? null : value.Trim(),
                    IsRequired = true
                },
                new BillLookupRequirement
                {
                    LookupKey = "PortOfLoading",
                    Role = "PortOfLoading",
                    ResolverKey = "Port",
                    DisplayName = "loading port",
                    SourceField = "PortOfLoading",
                    SearchValue = bill.PortOfLoading?.Trim(),
                    IsRequired = true
                },
                new BillLookupRequirement
                {
                    LookupKey = "PortOfDischarge",
                    Role = "PortOfDischarge",
                    ResolverKey = "Port",
                    DisplayName = "discharge port",
                    SourceField = "PortOfDischarge",
                    SearchValue = bill.PortOfDischarge?.Trim(),
                    IsRequired = true
                }
            };
        }

    }
}

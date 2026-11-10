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
                    Role = "Customer",
                    ResolverKey = "Customer",
                    SourceParty = party,
                    SourceField = field,
                    SearchValue = value == null ? null : value.Trim(),
                    IsRequired = true
                }
            };
        }
    }
}

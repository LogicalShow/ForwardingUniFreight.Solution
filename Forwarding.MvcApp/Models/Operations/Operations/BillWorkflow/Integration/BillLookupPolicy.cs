using System.Collections.Generic;
using BillWorkflow.Common.Abstractions;
using BillWorkflow.Common.Contracts;

namespace Forwarding.MvcApp.Models.Operations.Operations.BillWorkflow.Integration
{
    public class BillLookupPolicy : IBillLookupPolicy
    {
        public IReadOnlyList<BillLookupRequirement> GetRequirements(BillOfLading bill, BillContext context)
        {
            return new[]
            {
                CreateCustomerRequirement("Shipper", "ShipperName", bill.ShipperName),
                CreateCustomerRequirement("Consignee", "ConsigneeName", bill.ConsigneeName),
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

        private static BillLookupRequirement CreateCustomerRequirement(string party, string field, string value)
        {
            return new BillLookupRequirement
            {
                LookupKey = party,
                Role = party,
                ResolverKey = "Customer",
                DisplayName = party.ToLowerInvariant(),
                SourceParty = party,
                SourceField = field,
                SearchValue = value == null ? null : value.Trim(),
                IsRequired = true
            };
        }

    }
}

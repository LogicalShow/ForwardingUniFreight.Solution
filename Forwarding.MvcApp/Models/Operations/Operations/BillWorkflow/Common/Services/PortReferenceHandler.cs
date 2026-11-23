using System;
using BillWorkflow.Common.Abstractions;
using BillWorkflow.Common.Contracts;
using BillWorkflow.Common.Validation;

namespace BillWorkflow.Common.Services
{
    public class PortReferenceHandler : IReferenceHandler
    {
        private readonly IReferenceResolver resolver;
        private readonly IPortDirectory ports;

        public PortReferenceHandler(IReferenceResolver resolver, IPortDirectory ports)
        {
            if (resolver == null) throw new ArgumentNullException("resolver");
            if (ports == null) throw new ArgumentNullException("ports");
            this.resolver = resolver;
            this.ports = ports;
        }

        public string ResolverKey { get { return "Port"; } }

        public ReferenceMatchResult Resolve(BillLookupRequirement requirement, BillContext context, int userId)
        {
            return resolver.Resolve(requirement, context, userId);
        }

        public ReferenceOption GetById(int id, BillLookupRequirement requirement, BillContext context, int userId)
        {
            var port = ports.GetById(id, context, userId);
            if (port == null) return null;
            return new ReferenceOption
            {
                Id = port.Id, Code = port.Code, Name = port.Name, LocalName = port.LocalName
            };
        }

        public ValidationIssue CreateNotAvailableIssue(BillLookupRequirement requirement)
        {
            return new ValidationIssue
            {
                Code = BillWorkflowCodes.PortNotAvailable, FieldPath = "Id",
                Message = BillWorkflowMessages.PortNotAvailable
            };
        }
    }
}

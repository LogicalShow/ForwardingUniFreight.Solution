using System;
using BillWorkflow.Common.Abstractions;
using BillWorkflow.Common.Contracts;
using BillWorkflow.Common.Validation;

namespace BillWorkflow.Common.Services
{
    public class CustomerReferenceHandler : IReferenceHandler
    {
        private readonly IReferenceResolver resolver;
        private readonly ICustomerDirectory customers;

        public CustomerReferenceHandler(IReferenceResolver resolver, ICustomerDirectory customers)
        {
            if (resolver == null) throw new ArgumentNullException("resolver");
            if (customers == null) throw new ArgumentNullException("customers");
            this.resolver = resolver;
            this.customers = customers;
        }

        public string ResolverKey { get { return "Customer"; } }

        public ReferenceMatchResult Resolve(BillLookupRequirement requirement, BillContext context, int userId)
        {
            return resolver.Resolve(requirement, context, userId);
        }

        public ReferenceOption GetById(int id, BillLookupRequirement requirement, BillContext context, int userId)
        {
            var customer = customers.GetById(id, requirement.SourceParty, context, userId);
            if (customer == null) return null;
            return new ReferenceOption
            {
                Id = customer.Id, Name = customer.Name, LocalName = customer.LocalName
            };
        }

        public ValidationIssue CreateNotAvailableIssue(BillLookupRequirement requirement)
        {
            return new ValidationIssue
            {
                Code = BillWorkflowCodes.CustomerNotAvailable, FieldPath = "Id",
                Message = BillWorkflowMessages.CustomerNotAvailable
            };
        }
    }
}

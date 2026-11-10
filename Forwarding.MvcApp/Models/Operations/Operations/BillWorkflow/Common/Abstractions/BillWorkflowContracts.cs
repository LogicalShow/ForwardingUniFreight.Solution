using System;
using System.Collections.Generic;
using BillWorkflow.Common.Contracts;

namespace BillWorkflow.Common.Abstractions
{
    public interface IBillExtractionAdapter<TPayload>
    {
        string ProfileCode { get; }
        TPayload Read(string extractionJson);
    }

    public interface IBillContextProvider
    {
        BillContext Load(string parentReference, int actingUserId);
    }

    public interface IBillLookupPolicy
    {
        IReadOnlyList<BillLookupRequirement> GetRequirements(BillOfLading bill, BillContext context);
    }

    public interface IBillWorkflowStore
    {
        void Save(DocumentReview documentReview, int ownerUserId);
        BillReviewDetails GetBillReview(Guid billReviewId, int ownerUserId);
        BillReviewPage GetBillReviews(Guid documentReviewId, int page, int pageSize, int ownerUserId);
        BillReviewDetails ConfirmReferences(BillReviewDetails review, int expectedVersion, int ownerUserId);
    }

    public interface IReferenceResolver
    {
        ReferenceMatchResult Resolve(BillLookupRequirement requirement, BillContext context, int actingUserId);
    }

    public interface ICustomerDirectory
    {
        IReadOnlyList<CustomerRecord> FindExactMatches(string name, string sourceParty,
            BillContext context, int actingUserId);
        CustomerSearchResult FindCandidates(string name, string sourceParty,
            BillContext context, int actingUserId);
        CustomerLookupPage Search(string searchText, int page, int pageSize, string sourceParty,
            BillContext context, int actingUserId);
        CustomerRecord GetById(int customerId, string sourceParty, BillContext context, int actingUserId);
    }
}

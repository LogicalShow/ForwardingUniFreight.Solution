using System;
using System.Collections.Generic;
using BillWorkflow.Common.Contracts;

namespace BillWorkflow.Common.Abstractions
{
    public interface IBillExtractionAdapter
    {
        StoredBillReadResult ReadStoredBill(string billJson, string billWithConfidenceJson);
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
        StoredExtraction GetExtraction(Guid extractionId);
        IReadOnlyList<BillReviewDetails> StartReview(Guid extractionId, BillContext context, int actingUserId);
        BillReviewDetails GetBillReview(Guid billReviewId);
        BillReviewPage GetBillReviews(Guid documentReviewId, int page, int pageSize);
        BillReviewDetails ConfirmReferences(BillReviewDetails review, int expectedVersion, int actingUserId);
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

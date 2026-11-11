using System;
using System.Collections.Generic;
using System.Linq;
using System.Globalization;
using BillWorkflow.Common.Abstractions;
using BillWorkflow.Common.Contracts;
using BillWorkflow.Common.Exceptions;
using BillWorkflow.Common.Validation;

namespace BillWorkflow.Common.Services
{
    public class DocumentReviewService
    {
        public const int MaximumSearchPage = 10000;
        public const int MaximumSearchPageSize = 50;
        public const int MaximumBillPageSize = 10;

        // Identity is fixed for this request's service; permissions are checked on each operation.
        private readonly int userId;
        private readonly string blType;
        private readonly string manifestType;
        private readonly IBillContextProvider contexts;
        private readonly IBillLookupPolicy lookupPolicy;
        private readonly IBillWorkflowStore reviewStore;
        private readonly IReferenceResolver customerResolver;
        private readonly ICustomerDirectory customers;

        public DocumentReviewService(
            int userId,
            string blType,
            string manifestType,
            IBillContextProvider contexts,
            IBillLookupPolicy lookupPolicy,
            IBillWorkflowStore reviewStore,
            IReferenceResolver customerResolver,
            ICustomerDirectory customers)
        {
            if (string.IsNullOrWhiteSpace(blType) || string.IsNullOrWhiteSpace(manifestType) || contexts == null || lookupPolicy == null || reviewStore == null ||
                customerResolver == null || customers == null)
                throw new ArgumentNullException(BillWorkflowMessages.ServiceDependenciesRequired);
            this.userId = userId;
            this.blType = blType;
            this.manifestType = manifestType;
            this.contexts = contexts;
            this.lookupPolicy = lookupPolicy;
            this.reviewStore = reviewStore;
            this.customerResolver = customerResolver;
            this.customers = customers;
        }

        public DocumentReviewSummary CreateDocumentReview(Guid extractionId)
        {
            RequireActor();
            if (extractionId == Guid.Empty)
                throw new DocumentReviewException(DocumentReviewFailure.InvalidInput,
                    BillWorkflowCodes.InvalidDocumentReviewRequest, BillWorkflowMessages.DocumentReviewRequestRequired);
            var extraction = reviewStore.GetExtraction(extractionId);
            if (extraction == null)
                throw new DocumentReviewException(DocumentReviewFailure.NotFound,
                    BillWorkflowCodes.DocumentReviewNotFound, BillWorkflowMessages.DocumentReviewNotFound);
            if (extraction.ExtractionStatus != "Completed" || extraction.BillsStatus != "Ready")
                throw new DocumentReviewException(DocumentReviewFailure.Conflict,
                    BillWorkflowCodes.ExtractionNotReady, BillWorkflowMessages.ExtractionNotReady);
            if (extraction.ResultType != blType && extraction.ResultType != manifestType)
                throw new DocumentReviewException(DocumentReviewFailure.Conflict,
                    BillWorkflowCodes.UnsupportedDocumentType, BillWorkflowMessages.UnsupportedDocumentType);
            if (extraction.EntityName != "Operation" || !extraction.EntityID.HasValue || extraction.EntityID.Value <= 0)
                throw new DocumentReviewException(DocumentReviewFailure.InvalidInput,
                    BillWorkflowCodes.MasterOperationRequired, BillWorkflowMessages.MasterOperationRequired);
            var context = contexts.Load(extraction.EntityID.Value.ToString(CultureInfo.InvariantCulture), userId);
            var bills = reviewStore.StartReview(extraction.ID, context, userId);
            return CreateSummary(extraction.ID, bills);
        }

        public BillReviewDetails GetBillReview(Guid billReviewId)
        {
            var data = LoadBillReview(billReviewId);
            ApplyReviewIssues(data);
            return data;
        }

        public BillReviewPage GetBillReviews(Guid documentReviewId, int page = 1, int pageSize = 1)
        {
            RequireActor();
            if (documentReviewId == Guid.Empty || page < 1 || pageSize < 1 || pageSize > MaximumBillPageSize)
                throw new DocumentReviewException(DocumentReviewFailure.InvalidInput,
                    BillWorkflowCodes.InvalidBillReviewPage,
                    string.Format(BillWorkflowMessages.BillReviewsRequestRequired, MaximumBillPageSize));

            var result = reviewStore.GetBillReviews(documentReviewId, page, pageSize);
            if (result == null)
                throw new DocumentReviewException(DocumentReviewFailure.NotFound,
                    BillWorkflowCodes.DocumentReviewNotFound, BillWorkflowMessages.DocumentReviewNotFound);

            ValidateCurrentContext(result.Context);
            if (!result.ReviewStarted) ThrowReviewNotStarted();
            foreach (var bill in result.Items)
                ApplyReviewIssues(bill);
            return result;
        }

        private void ApplyReviewIssues(BillReviewDetails data)
        {
            if (data.Bill == null) return;
            var requirements = lookupPolicy.GetRequirements(data.Bill, data.Context);
            data.Issues = GetReviewIssues(data.Issues, requirements, data.ReferenceResolutions);
        }

        public BillReferenceResolution ResolveReferences(Guid billReviewId, int expectedVersion, string role)
        {
            if (billReviewId == Guid.Empty || expectedVersion <= 0 || string.IsNullOrWhiteSpace(role))
                throw new DocumentReviewException(DocumentReviewFailure.InvalidInput,
                    BillWorkflowCodes.InvalidReferenceResolutionRequest, BillWorkflowMessages.ReferenceResolutionRequestRequired);

            var data = LoadBillReview(billReviewId);
            ValidateBillReviewVersion(data.Version, expectedVersion);
            RequireReadableBill(data);
            var requirements = lookupPolicy.GetRequirements(data.Bill, data.Context).ToList();
            var index = requirements.FindIndex(item => item.Role == role);
            if (index < 0)
                throw new DocumentReviewException(DocumentReviewFailure.InvalidInput,
                    BillWorkflowCodes.ReferenceRoleNotAvailable, BillWorkflowMessages.ReferenceRoleNotEnabled);

            var requirement = requirements[index];
            // Add another resolver here when its role is enabled by the lookup policy.
            if (requirement.ResolverKey != "Customer")
                throw new DocumentReviewException(DocumentReviewFailure.InvalidInput,
                    BillWorkflowCodes.ReferenceResolverNotAvailable, BillWorkflowMessages.ReferenceResolverNotAvailable);
            var result = customerResolver.Resolve(requirement, data.Context, userId);
            ValidateCurrentContext(data.Context);

            return new BillReferenceResolution
            {
                BillReviewId = data.BillReviewId,
                Version = data.Version,
                Role = requirement.Role,
                SourceParty = requirement.SourceParty,
                SearchValue = requirement.SearchValue,
                ResolutionMethod = result.ResolutionMethod,
                Match = result.Match,
                Candidates = result.Candidates.Select(candidate => new ReferenceOption
                {
                    Id = candidate.Id,
                    Name = candidate.Name,
                    LocalName = candidate.LocalName
                }).ToList(),
                NextRole = index + 1 < requirements.Count ? requirements[index + 1].Role : null
            };
        }

        public BillReviewDetails ConfirmReferences(Guid billReviewId, int expectedVersion,
            IReadOnlyList<BillReferenceSelection> referenceSelections, bool rememberAlias = true)
        {
            if (billReviewId == Guid.Empty || expectedVersion <= 0 || referenceSelections == null)
                throw new DocumentReviewException(DocumentReviewFailure.InvalidInput,
                    BillWorkflowCodes.InvalidReferenceConfirmationRequest, BillWorkflowMessages.ConfirmationRequestRequired);

            var data = LoadBillReview(billReviewId);
            ValidateBillReviewVersion(data.Version, expectedVersion);
            RequireReadableBill(data);
            if (data.ReviewStatus == BillReviewStatus.ReferencesConfirmed)
                throw new DocumentReviewException(DocumentReviewFailure.Conflict,
                    BillWorkflowCodes.ReferencesAlreadyConfirmed, BillWorkflowMessages.ReferencesAlreadyConfirmed);

            var requirements = lookupPolicy.GetRequirements(data.Bill, data.Context).ToList();
            ValidateReferenceSelections(referenceSelections, requirements);
            var selections = referenceSelections.ToList();
            var referenceIssues = new List<ValidationIssue>();
            var resolutions = new List<ReferenceResolution>();
            foreach (var requirement in requirements)
            {
                var selectionIndex = selections.FindIndex(item => item.Role == requirement.Role);
                referenceIssues.AddRange(GetReferenceSelectionIssues(requirement, selectionIndex >= 0));
                if (selectionIndex < 0)
                    continue;
                if (requirement.ResolverKey != "Customer")
                    throw new DocumentReviewException(DocumentReviewFailure.InvalidInput,
                        BillWorkflowCodes.ReferenceResolverNotAvailable, BillWorkflowMessages.ReferenceValidatorNotAvailable);

                var customer = customers.GetById(selections[selectionIndex].Id, requirement.SourceParty, data.Context, userId);
                referenceIssues.AddRange(GetCustomerSelectionIssues(customer, selectionIndex));
                if (customer == null)
                    continue;

                var method = selections[selectionIndex].ResolutionMethod;
                ValidateCustomerResolutionMethod(requirement, data.Context, customer.Id, method);
                resolutions.Add(CreateCustomerResolution(requirement, customer, method));
            }
            var issues = GetConfirmationIssues(data.Issues, referenceIssues);
            if (issues.Count > 0)
                throw new DocumentReviewException(DocumentReviewFailure.Conflict, BillWorkflowCodes.BillReviewNotReady,
                    BillWorkflowMessages.BillReviewNotReady, issues);

            data.ReferenceResolutions = resolutions;
            data.RememberAlias = rememberAlias;
            data.Issues = issues;
            ValidateCurrentContext(data.Context);
            return reviewStore.ConfirmReferences(data, expectedVersion, userId);
        }

        private static List<ValidationIssue> GetReferenceSelectionIssues(BillLookupRequirement requirement,
            bool hasSelection)
        {
            var issues = new List<ValidationIssue>();
            if (!hasSelection && requirement.IsRequired)
                issues.Add(new ValidationIssue
                {
                    Code = BillWorkflowCodes.ReferenceRequired, FieldPath = "ReferenceSelections",
                    Message = string.Format(BillWorkflowMessages.ReferenceRequired, requirement.Role)
                });
            return issues;
        }

        private static List<ValidationIssue> GetCustomerSelectionIssues(CustomerRecord customer, int selectionIndex)
        {
            var issues = new List<ValidationIssue>();
            if (customer == null)
                issues.Add(new ValidationIssue
                {
                    Code = BillWorkflowCodes.CustomerNotAvailable, FieldPath = "ReferenceSelections[" + selectionIndex + "].Id",
                    Message = BillWorkflowMessages.CustomerNotAvailable
                });
            return issues;
        }

        private static List<ValidationIssue> GetConfirmationIssues(IEnumerable<ValidationIssue> billIssues,
            IEnumerable<ValidationIssue> referenceIssues)
        {
            var issues = billIssues.Where(issue => issue.Code != BillWorkflowCodes.CustomerNameRequired).ToList();
            issues.AddRange(referenceIssues);
            return issues;
        }

        private static void ValidateReferenceSelections(IReadOnlyList<BillReferenceSelection> selections,
            List<BillLookupRequirement> requirements)
        {
            var roles = new HashSet<string>(StringComparer.Ordinal);
            var issues = new List<ValidationIssue>();
            for (var index = 0; index < selections.Count; index++)
            {
                var item = selections[index];
                var field = "ReferenceSelections[" + index + "]";
                if (item == null || string.IsNullOrWhiteSpace(item.Role) || item.Id <= 0)
                    issues.Add(new ValidationIssue { Code = BillWorkflowCodes.InvalidReferenceSelection, FieldPath = field,
                        Message = BillWorkflowMessages.ReferenceSelectionRequired });
                else if (!roles.Add(item.Role))
                    issues.Add(new ValidationIssue { Code = BillWorkflowCodes.DuplicateReferenceRole, FieldPath = field + ".Role",
                        Message = BillWorkflowMessages.DuplicateReferenceRole });
                else if (!requirements.Any(requirement => requirement.Role == item.Role))
                    issues.Add(new ValidationIssue { Code = BillWorkflowCodes.ReferenceRoleNotAvailable, FieldPath = field + ".Role",
                        Message = BillWorkflowMessages.ReferenceRoleNotAvailable });
                else if (!Enum.IsDefined(typeof(ResolutionMethod), item.ResolutionMethod))
                    issues.Add(new ValidationIssue { Code = BillWorkflowCodes.InvalidResolutionMethod, FieldPath = field + ".ResolutionMethod",
                        Message = BillWorkflowMessages.InvalidResolutionMethod });
            }
            if (issues.Count > 0)
                throw new DocumentReviewException(DocumentReviewFailure.InvalidInput, BillWorkflowCodes.InvalidReferenceSelections,
                    BillWorkflowMessages.InvalidReferenceSelections, issues);
        }

        private void ValidateCustomerResolutionMethod(BillLookupRequirement requirement, BillContext context,
            int customerId, ResolutionMethod method)
        {
            if (!Enum.IsDefined(typeof(ResolutionMethod), method))
                throw new DocumentReviewException(DocumentReviewFailure.InvalidInput,
                    BillWorkflowCodes.InvalidResolutionMethod, BillWorkflowMessages.InvalidResolutionMethod);
            if (method == ResolutionMethod.ManualSelection) return;

            // This verifies consistency with current matching, not a historical UI click or saved search snapshot.
            var current = customerResolver.Resolve(requirement, context, userId);
            bool valid;
            if (method == ResolutionMethod.SuggestedSelection)
                valid = current.Match == null &&
                    current.Candidates.Any(candidate => candidate.Id == customerId);
            else
                valid = current.Match != null && current.Match.Id == customerId &&
                    current.ResolutionMethod == method;
            if (!valid)
                throw new DocumentReviewException(DocumentReviewFailure.Conflict, BillWorkflowCodes.ReferenceResolutionChanged,
                    BillWorkflowMessages.ReferenceResolutionChanged);
        }

        private ReferenceResolution CreateCustomerResolution(BillLookupRequirement requirement, CustomerRecord customer,
            ResolutionMethod method)
        {
            return new ReferenceResolution
            {
                Reference = new BillReferenceSummary(requirement.Role, customer.Id, customer.Name),
                ResolverKey = requirement.ResolverKey,
                SourceParty = requirement.SourceParty,
                SourceField = requirement.SourceField,
                SearchValue = requirement.SearchValue,
                ResolutionMethod = method,
                ConfirmedBy = userId,
                ConfirmedAt = DateTime.Now
            };
        }

        private BillReviewDetails LoadBillReview(Guid billReviewId)
        {
            RequireActor();
            if (billReviewId == Guid.Empty)
                throw new DocumentReviewException(DocumentReviewFailure.InvalidInput,
                    BillWorkflowCodes.BillReviewIdRequired, BillWorkflowMessages.BillReviewIdRequired);

            var data = reviewStore.GetBillReview(billReviewId);
            if (data == null)
                throw new DocumentReviewException(DocumentReviewFailure.NotFound,
                    BillWorkflowCodes.BillReviewNotFound, BillWorkflowMessages.BillReviewNotFound);
            ValidateCurrentContext(data.Context);
            if (data.ReviewStatus == BillReviewStatus.NotStarted) ThrowReviewNotStarted();
            return data;
        }

        private static void ThrowReviewNotStarted()
        {
            throw new DocumentReviewException(DocumentReviewFailure.Conflict,
                BillWorkflowCodes.ReviewNotStarted, BillWorkflowMessages.ReviewNotStarted);
        }

        private static void RequireReadableBill(BillReviewDetails data)
        {
            if (data.Bill == null)
                throw new DocumentReviewException(DocumentReviewFailure.Conflict,
                    BillWorkflowCodes.BillReviewNotReady, BillWorkflowMessages.BillReviewNotReady, data.Issues);
        }

        private static DocumentReviewSummary CreateSummary(Guid extractionId, IReadOnlyList<BillReviewDetails> bills)
        {
            return new DocumentReviewSummary
            {
                DocumentReviewId = extractionId,
                BillReviews = bills.Select(item => new BillReviewSummary
                {
                    BillReviewId = item.BillReviewId,
                    BillIndex = item.BillIndex,
                    ReviewStatus = item.ReviewStatus,
                    Version = item.Version,
                    BillOfLadingNumber = item.Bill == null ? null : item.Bill.BillOfLadingNumber,
                    ShipperName = item.Bill == null ? null : item.Bill.ShipperName,
                    ConsigneeName = item.Bill == null ? null : item.Bill.ConsigneeName,
                    PortOfLoading = item.Bill == null ? null : item.Bill.PortOfLoading,
                    PortOfDischarge = item.Bill == null ? null : item.Bill.PortOfDischarge,
                    ContainerCount = item.Bill == null ? (int?)null : item.Bill.Containers.Count
                }).ToList()
            };
        }

        public CustomerLookupPage SearchCustomers(Guid billReviewId, string searchText,
            int page, int pageSize)
        {
            ValidateCustomerSearch(searchText, page, pageSize);
            var billReview = LoadBillReview(billReviewId);
            RequireReadableBill(billReview);
            var requirements = lookupPolicy.GetRequirements(billReview.Bill, billReview.Context);
            var customerRequirement = GetCustomerRequirement(requirements);
            var result = customers.Search(searchText.Trim(), page, pageSize, customerRequirement.SourceParty,
                billReview.Context, userId);
            ValidateCurrentContext(billReview.Context);
            return result;
        }

        public ConfirmedBill GetConfirmedBill(Guid billReviewId, int expectedVersion)
        {
            if (billReviewId == Guid.Empty || expectedVersion <= 0)
                throw new DocumentReviewException(DocumentReviewFailure.InvalidInput,
                    BillWorkflowCodes.InvalidConfirmedBillRequest, BillWorkflowMessages.ConfirmedBillRequestRequired);
            var billReview = LoadBillReview(billReviewId);
            RequireReadableBill(billReview);
            ValidateBillReviewVersion(billReview.Version, expectedVersion);
            ValidateReferencesConfirmedState(billReview);
            ValidateReferenceConfirmation(billReview);

            // Eligibility checks can take time. Reload before handing the approved version to Phase 3.
            billReview = LoadBillReview(billReviewId);
            ValidateBillReviewVersion(billReview.Version, expectedVersion);
            ValidateReferencesConfirmedState(billReview);
            var requirements = lookupPolicy.GetRequirements(billReview.Bill, billReview.Context);
            return new ConfirmedBill
            {
                DocumentReviewId = billReview.DocumentReviewId,
                BillReviewId = billReview.BillReviewId,
                Version = billReview.Version,
                Context = billReview.Context,
                Bill = billReview.Bill,
                ReferenceResolutions = billReview.ReferenceResolutions.Where(result => IsReferenceConfirmed(result) &&
                    requirements.Any(requirement => MatchesRequirement(result, requirement))).ToList(),
                CompletedBy = billReview.CompletedBy.Value,
                CompletedAt = billReview.CompletedAt.Value
            };
        }

        private void ValidateReferenceConfirmation(BillReviewDetails billReview)
        {
            var requirements = lookupPolicy.GetRequirements(billReview.Bill, billReview.Context);
            billReview.Issues = GetReviewIssues(billReview.Issues, requirements, billReview.ReferenceResolutions);
            if (billReview.Issues.Count > 0)
                throw new DocumentReviewException(DocumentReviewFailure.Conflict,
                    BillWorkflowCodes.BillFieldsNeedCorrection, string.Format(BillWorkflowMessages.BillFieldsNeedCorrection,
                        string.Join(", ", billReview.Issues.Select(issue => issue.FieldPath).Distinct())));

            foreach (var requirement in requirements)
            {
                var result = FindResolution(billReview.ReferenceResolutions, requirement);
                if (!IsReferenceConfirmed(result))
                {
                    if (requirement.IsRequired)
                        throw new DocumentReviewException(DocumentReviewFailure.Conflict,
                            BillWorkflowCodes.RequiredReferencesNotConfirmed, string.Format(BillWorkflowMessages.RequiredReferencesNotConfirmed, requirement.Role));
                    continue;
                }
                if (requirement.ResolverKey != "Customer")
                    throw new DocumentReviewException(DocumentReviewFailure.InvalidInput,
                        BillWorkflowCodes.UnsupportedReferenceConfirmation, string.Format(BillWorkflowMessages.UnsupportedReferenceConfirmation, requirement.ResolverKey));
                if (customers.GetById(result.Reference.Id.Value, requirement.SourceParty, billReview.Context, userId) == null)
                    throw new DocumentReviewException(DocumentReviewFailure.NotFound,
                        BillWorkflowCodes.CustomerNotAvailable, string.Format(BillWorkflowMessages.SelectedCustomerNotAvailable, requirement.Role));
            }
        }

        private static void ValidateReferencesConfirmedState(BillReviewDetails billReview)
        {
            if (billReview.ReviewStatus != BillReviewStatus.ReferencesConfirmed ||
                !billReview.CompletedBy.HasValue || !billReview.CompletedAt.HasValue)
                throw new DocumentReviewException(DocumentReviewFailure.Conflict,
                    BillWorkflowCodes.ReferencesNotConfirmed, BillWorkflowMessages.ReferencesNotConfirmed);
        }

        private static bool IsReferenceConfirmed(ReferenceResolution result)
        {
            return result != null && result.Reference != null && result.Reference.Id > 0 &&
                (result.ResolutionMethod == ResolutionMethod.AutomaticExactMatch || result.ResolutionMethod == ResolutionMethod.ManualSelection ||
                 result.ResolutionMethod == ResolutionMethod.SuggestedSelection ||
                 result.ResolutionMethod == ResolutionMethod.AutomaticAliasMatch);
        }

        private static bool MatchesRequirement(ReferenceResolution result, BillLookupRequirement requirement)
        {
            return result.Reference.Role == requirement.Role && result.ResolverKey == requirement.ResolverKey &&
                result.SourceParty == requirement.SourceParty && result.SourceField == requirement.SourceField &&
                string.Equals(result.SearchValue, requirement.SearchValue, StringComparison.Ordinal);
        }

        private static ReferenceResolution FindResolution(IEnumerable<ReferenceResolution> resolutions, BillLookupRequirement requirement)
        {
            return resolutions.SingleOrDefault(result => MatchesRequirement(result, requirement));
        }

        private static List<ValidationIssue> GetReviewIssues(IEnumerable<ValidationIssue> storedIssues,
            IEnumerable<BillLookupRequirement> requirements, IEnumerable<ReferenceResolution> resolutions)
        {
            // A name is an input for matching, not an additional requirement once a valid CustomerID is accepted.
            var issues = storedIssues.Where(issue => issue.Code != BillWorkflowCodes.CustomerNameRequired).ToList();
            foreach (var requirement in requirements)
            {
                if (requirement.Role == "Customer" && requirement.IsRequired &&
                    !CustomerResolver.HasUsableName(requirement.SearchValue) && !IsReferenceConfirmed(FindResolution(resolutions, requirement)))
                    issues.Add(new ValidationIssue
                    {
                        Code = BillWorkflowCodes.CustomerNameRequired,
                        FieldPath = requirement.SourceField,
                        Message = string.Format(BillWorkflowMessages.CustomerNameRequired, requirement.SourceParty.ToLowerInvariant())
                    });
            }
            return issues;
        }

        private static void ValidateBillReviewVersion(int version, int expectedVersion)
        {
            if (version != expectedVersion)
                throw new DocumentReviewException(DocumentReviewFailure.Conflict,
                    BillWorkflowCodes.BillReviewVersionChanged, BillWorkflowMessages.BillReviewVersionChanged);
        }

        private static BillLookupRequirement GetCustomerRequirement(IEnumerable<BillLookupRequirement> requirements)
        {
            var customerRequirement = requirements.SingleOrDefault(requirement => requirement.Role == "Customer");
            if (customerRequirement == null || customerRequirement.ResolverKey != "Customer" ||
                (customerRequirement.SourceParty != "Shipper" && customerRequirement.SourceParty != "Consignee"))
                throw new DocumentReviewException(DocumentReviewFailure.InvalidInput,
                    BillWorkflowCodes.CustomerLookupRequired, BillWorkflowMessages.CustomerLookupRequired);
            return customerRequirement;
        }

        private static void ValidateCustomerSearch(string searchText, int page, int pageSize)
        {
            if (!CustomerResolver.HasUsableName(searchText) || page < 1 || page > MaximumSearchPage ||
                pageSize < 1 || pageSize > MaximumSearchPageSize)
                throw new DocumentReviewException(DocumentReviewFailure.InvalidInput,
                    BillWorkflowCodes.InvalidCustomerSearch, BillWorkflowMessages.InvalidCustomerSearch);
        }

        private void ValidateCurrentContext(BillContext context)
        {
            // Authorize against the current user's operation permissions.
            var current = contexts.Load(context.ParentReference, userId);
            if (context.Version == null) return; // Permission is still checked before REVIEW_NOT_STARTED.
            if (current.Version != context.Version || current.Direction != context.Direction)
                throw new DocumentReviewException(DocumentReviewFailure.Conflict,
                    BillWorkflowCodes.MasterContextChanged, BillWorkflowMessages.MasterContextChanged);
        }

        private void RequireActor()
        {
            if (userId <= 0)
                throw new DocumentReviewException(DocumentReviewFailure.Forbidden,
                    BillWorkflowCodes.UserRequired, BillWorkflowMessages.UserRequired);
        }
    }
}

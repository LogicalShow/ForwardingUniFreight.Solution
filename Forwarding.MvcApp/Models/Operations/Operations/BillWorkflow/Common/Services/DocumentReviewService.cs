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
        public const int MaximumBillPageSize = 10;
        private readonly int userId;
        private readonly string blType;
        private readonly string manifestType;
        private readonly IBillContextProvider contexts;
        private readonly IBillLookupPolicy lookupPolicy;
        private readonly IBillWorkflowStore reviewStore;
        private readonly ICustomerDirectory customers;
        private readonly IPortDirectory ports;
        private readonly Dictionary<string, IReferenceHandler> referenceHandlers;

        public DocumentReviewService(
            int userId,
            string blType,
            string manifestType,
            IBillContextProvider contexts,
            IBillLookupPolicy lookupPolicy,
            IBillWorkflowStore reviewStore,
            ICustomerDirectory customers,
            IPortDirectory ports,
            IEnumerable<IReferenceHandler> handlers)
        {
            if (string.IsNullOrWhiteSpace(blType) || string.IsNullOrWhiteSpace(manifestType) || contexts == null || lookupPolicy == null || reviewStore == null ||
                customers == null || ports == null || handlers == null)
                throw new ArgumentNullException(BillWorkflowMessages.ServiceDependenciesRequired);
            this.userId = userId;
            this.blType = blType;
            this.manifestType = manifestType;
            this.contexts = contexts;
            this.lookupPolicy = lookupPolicy;
            this.reviewStore = reviewStore;
            this.customers = customers;
            this.ports = ports;
            referenceHandlers = handlers.ToDictionary(handler => handler.ResolverKey, StringComparer.Ordinal);
        }

        public DocumentReviewSummary GetDocumentReview(Guid extractionId)
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
            BillContext context;
            var state = LoadBillReview(billReviewId, out context);
            var requirements = GetRequirements(state, context);
            var validation = ValidateSavedReferences(state, context, requirements);
            return CreateBillReviewDetails(state, requirements, validation);
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

            var context = result.Items.Count > 0 && result.Items.All(item => item.ReviewStatus == BillReviewStatus.Completed)
                ? contexts.Load(result.Context.ParentReference, userId) : ValidateCurrentContext(result.Context);
            if (!result.ReviewStarted) ThrowReviewNotStarted();
            var items = new List<BillReviewDetails>();
            foreach (var bill in result.Items)
            {
                var requirements = GetRequirements(bill, context);
                var validation = ValidateSavedReferences(bill, context, requirements);
                items.Add(CreateBillReviewDetails(bill, requirements, validation));
            }
            return new BillReviewPage
            {
                Page = result.Page, PageSize = result.PageSize, TotalCount = result.TotalCount, Items = items
            };
        }

        public BillReferenceResolution ResolveReferences(Guid billReviewId, int expectedVersion, string lookupKey)
        {
            if (billReviewId == Guid.Empty || expectedVersion <= 0 || string.IsNullOrWhiteSpace(lookupKey))
                throw new DocumentReviewException(DocumentReviewFailure.InvalidInput,
                    BillWorkflowCodes.InvalidReferenceResolutionRequest, BillWorkflowMessages.ReferenceResolutionRequestRequired);

            BillContext context;
            var data = LoadBillReview(billReviewId, out context);
            ValidateBillReviewVersion(data.Version, expectedVersion);
            RequireBillReadyForReferences(data);
            var requirements = GetRequirements(data, context);
            var requirement = requirements.SingleOrDefault(item => item.LookupKey == lookupKey);
            if (requirement == null)
                throw new DocumentReviewException(DocumentReviewFailure.InvalidInput,
                    BillWorkflowCodes.ReferenceLookupNotAvailable, BillWorkflowMessages.ReferenceLookupNotAvailable);

            var result = GetReferenceHandler(requirement.ResolverKey).Resolve(requirement, context, userId);
            ValidateCurrentContext(context);

            return new BillReferenceResolution
            {
                BillReviewId = data.BillReviewId,
                Version = data.Version,
                LookupKey = requirement.LookupKey,
                Role = requirement.Role,
                SourceParty = requirement.SourceParty,
                SearchValue = requirement.SearchValue,
                ResolutionMethod = result.ResolutionMethod,
                Match = result.Match,
                Candidates = result.Candidates.Select(candidate => new ReferenceOption
                {
                    Id = candidate.Id,
                    Code = candidate.Code,
                    Name = candidate.Name,
                    LocalName = candidate.LocalName
                }).ToList()
            };
        }

        public CustomerLookupPage SearchCustomers(Guid billReviewId, string lookupKey, string searchText,
            int page, int pageSize)
        {
            ReferenceSearchRules.ValidateSearch(searchText, page, pageSize);
            BillContext context;
            var billReview = LoadBillReview(billReviewId, out context);
            RequireBillReadyForReferences(billReview);
            var requirements = GetRequirements(billReview, context);
            var customerRequirement = GetCustomerRequirement(requirements, lookupKey);
            var result = customers.Search(searchText.Trim(), page, pageSize, customerRequirement.SourceParty,
                context, userId);
            ValidateCurrentContext(context);
            return result;
        }

        public PortLookupPage SearchPorts(Guid billReviewId, string searchText, int page, int pageSize)
        {
            ReferenceSearchRules.ValidateSearch(searchText, page, pageSize);
            BillContext context;
            var review = LoadBillReview(billReviewId, out context);
            RequireBillReadyForReferences(review);
            var result = ports.Search(searchText.Trim(), page, pageSize, context, userId);
            ValidateCurrentContext(context);
            return result;
        }

        public SubmitReferenceStepResult SubmitReferenceStep(Guid billReviewId, int expectedVersion, BillReferenceSelection selection)
        {
            var saved = SaveReference(billReviewId, expectedVersion, selection);
            return ResolveNextReference(saved);
        }

        public BillReviewDetails ConfirmReferences(Guid billReviewId, int expectedVersion, bool rememberAlias = true)
        {
            if (billReviewId == Guid.Empty || expectedVersion <= 0)
                throw new DocumentReviewException(DocumentReviewFailure.InvalidInput,
                    BillWorkflowCodes.InvalidReferenceConfirmationRequest, BillWorkflowMessages.ConfirmationRequestRequired);
            BillContext context;
            var data = LoadBillReview(billReviewId, out context);
            ValidateBillReviewVersion(data.Version, expectedVersion);
            RequireReadableBill(data);
            RequireEditableReview(data);
            var requirements = GetRequirements(data, context);
            var validation = ValidateSavedReferences(data, context, requirements);
            var referenceIssues = new List<ValidationIssue>();
            foreach (var requirement in requirements)
                referenceIssues.AddRange(GetReferenceSelectionIssues(requirement,
                    FindResolution(validation.ValidReferences, requirement) != null));
            var issues = GetConfirmationIssues(validation.Issues, referenceIssues);
            var savedReferences = data.ReferenceResolutions ?? new List<ReferenceResolution>();
            if (savedReferences.Count != validation.ValidReferences.Count &&
                !issues.Any(issue => issue.Code == BillWorkflowCodes.SavedReferenceNotAvailable))
                issues.Add(new ValidationIssue
                {
                    Code = BillWorkflowCodes.SavedReferenceNotAvailable,
                    FieldPath = "ResolvedReferences",
                    Message = BillWorkflowMessages.SavedReferencesChanged
                });
            if (issues.Count > 0)
                throw new DocumentReviewException(DocumentReviewFailure.Conflict, BillWorkflowCodes.BillReviewNotReady,
                    BillWorkflowMessages.BillReviewNotReady, issues);

            ValidateCurrentContext(context);
            var confirmation = new BillReferenceConfirmation
            {
                BillReviewId = data.BillReviewId,
                RememberAlias = rememberAlias
            };
            var confirmed = reviewStore.ConfirmReferences(confirmation, expectedVersion, userId);
            var confirmedValidation = ValidateSavedReferences(confirmed, context, requirements);
            return CreateBillReviewDetails(confirmed, requirements, confirmedValidation);
        }

        public ConfirmedBill GetConfirmedBill(Guid billReviewId, int expectedVersion)
        {
            if (billReviewId == Guid.Empty || expectedVersion <= 0)
                throw new DocumentReviewException(DocumentReviewFailure.InvalidInput,
                    BillWorkflowCodes.InvalidConfirmedBillRequest, BillWorkflowMessages.ConfirmedBillRequestRequired);
            BillContext context;
            var billReview = LoadBillReview(billReviewId, out context);
            RequireReadableBill(billReview);
            ValidateBillReviewVersion(billReview.Version, expectedVersion);
            ValidateReferencesConfirmedState(billReview);
            ValidateReferenceConfirmation(billReview, context);

            // Eligibility checks can take time. Reload before handing the approved version to Phase 3.
            billReview = LoadBillReview(billReviewId, out context);
            ValidateBillReviewVersion(billReview.Version, expectedVersion);
            ValidateReferencesConfirmedState(billReview);
            var requirements = GetRequirements(billReview, context);
            return new ConfirmedBill
            {
                DocumentReviewId = billReview.DocumentReviewId,
                BillReviewId = billReview.BillReviewId,
                Version = billReview.Version,
                Context = context,
                Bill = billReview.Bill,
                ReferenceResolutions = billReview.ReferenceResolutions.Where(result => IsReferenceConfirmed(result) &&
                    requirements.Any(requirement => MatchesRequirement(result, requirement))).ToList(),
                ReferencesConfirmedBy = billReview.ReferencesConfirmedBy.Value,
                ReferencesConfirmedAt = billReview.ReferencesConfirmedAt.Value
            };
        }

        private BillReviewValidation ValidateSavedReferences(BillReviewState data, BillContext context,
            List<BillLookupRequirement> requirements)
        {
            var stored = data.ReferenceResolutions ?? new List<ReferenceResolution>();
            // An inserted bill is a historical result; later master-data edits do not
            // remove its accepted selections or send it back into reference resolution.
            if (data.ReviewStatus == BillReviewStatus.Completed)
                return new BillReviewValidation { ValidReferences = stored, Issues = data.Issues };
            var valid = new List<ReferenceResolution>();
            var issues = new List<ValidationIssue>();
            foreach (var requirement in requirements)
            {
                var matches = stored.Where(result => result != null && result.Reference != null &&
                    result.Reference.LookupKey == requirement.LookupKey).ToList();
                if (matches.Count == 0) continue;
                var saved = matches[0];
                ReferenceOption selected = null;
                if (matches.Count == 1 && IsReferenceConfirmed(saved) && MatchesRequirement(saved, requirement))
                    selected = GetReferenceHandler(requirement.ResolverKey).GetById(
                        saved.Reference.Id.Value, requirement, context, userId);
                if (selected == null)
                {
                    issues.Add(new ValidationIssue
                    {
                        Code = BillWorkflowCodes.SavedReferenceNotAvailable,
                        FieldPath = "ResolvedReferences." + requirement.LookupKey,
                        Message = string.Format(BillWorkflowMessages.SavedReferenceNotAvailable, requirement.Role)
                    });
                    continue;
                }
                valid.Add(new ReferenceResolution
                {
                    Reference = new BillReferenceSummary(requirement.LookupKey, requirement.Role, selected.Id, selected.Name),
                    ResolverKey = saved.ResolverKey, SourceParty = saved.SourceParty, SourceField = saved.SourceField,
                    SearchValue = saved.SearchValue, ResolutionMethod = saved.ResolutionMethod,
                    ConfirmedBy = saved.ConfirmedBy, ConfirmedAt = saved.ConfirmedAt
                });
            }
            var reviewIssues = GetReviewIssues(data.Issues, requirements, valid);
            reviewIssues.AddRange(issues);
            return new BillReviewValidation { ValidReferences = valid, Issues = reviewIssues };
        }

        private BillReviewProgress SaveReference(Guid billReviewId, int expectedVersion, BillReferenceSelection selection)
        {
            if (billReviewId == Guid.Empty || expectedVersion <= 0 || selection == null)
                throw new DocumentReviewException(DocumentReviewFailure.InvalidInput,
                    BillWorkflowCodes.InvalidSubmitReferenceStepRequest, BillWorkflowMessages.SubmitReferenceStepRequestRequired);
            BillContext context;
            var data = LoadBillReview(billReviewId, out context);
            ValidateBillReviewVersion(data.Version, expectedVersion);
            RequireReadableBill(data);
            RequireEditableReview(data);
            RequireNoBlockingBillIssues(data);
            var requirements = GetRequirements(data, context);
            var requirement = ValidateReferenceSelection(selection, requirements);
            var handler = GetReferenceHandler(requirement.ResolverKey);
            var selected = handler.GetById(selection.Id, requirement, context, userId);
            var issues = new List<ValidationIssue>();
            if (selected == null) issues.Add(handler.CreateNotAvailableIssue(requirement));
            if (issues.Count > 0)
                throw new DocumentReviewException(DocumentReviewFailure.Conflict, BillWorkflowCodes.BillReviewNotReady,
                    BillWorkflowMessages.BillReviewNotReady, issues);
            ValidateResolutionMethod(requirement, context, selected.Id, selection.ResolutionMethod);

            ValidateCurrentContext(context);
            var update = new BillReferenceUpdate
            {
                BillReviewId = data.BillReviewId,
                ReferenceResolution = CreateResolution(requirement, selected, selection.ResolutionMethod)
            };
            var saved = reviewStore.SaveReference(update, expectedVersion, userId);
            return CreateProgress(saved, requirements, saved.ReferenceResolutions);
        }

        private SubmitReferenceStepResult ResolveNextReference(BillReviewProgress saved)
        {
            return new SubmitReferenceStepResult
            {
                Progress = saved,
                NextResolution = saved.NextLookupKey == null ? null :
                    ResolveReferences(saved.BillReviewId, saved.Version, saved.NextLookupKey)
            };
        }

        private static BillReviewProgress CreateProgress(BillReviewState review,
            List<BillLookupRequirement> requirements, IEnumerable<ReferenceResolution> resolutions)
        {
            var references = resolutions.Where(result => IsReferenceConfirmed(result) &&
                requirements.Any(requirement => MatchesRequirement(result, requirement)))
                .Select(result => new ResolvedReference(result.Reference.LookupKey, result.Reference.Role,
                    result.Reference.Id.Value, result.Reference.Name, result.ResolutionMethod,
                    result.SearchValue, result.SourceParty)).ToList().AsReadOnly();
            var next = review.ReviewStatus >= BillReviewStatus.ReferencesConfirmed ? null :
                requirements.FirstOrDefault(requirement => requirement.IsRequired &&
                    !references.Any(reference => reference.LookupKey == requirement.LookupKey));
            return new BillReviewProgress
            {
                BillReviewId = review.BillReviewId, Version = review.Version, ReviewStatus = review.ReviewStatus,
                ReferenceLookups = requirements.Select(requirement => new BillReferenceLookup
                {
                    LookupKey = requirement.LookupKey, Role = requirement.Role
                }).ToList().AsReadOnly(),
                ResolvedReferences = references, NextLookupKey = next == null ? null : next.LookupKey
            };
        }

        private static BillReviewDetails CreateBillReviewDetails(BillReviewState state,
            List<BillLookupRequirement> requirements, BillReviewValidation validation)
        {
            var progress = CreateProgress(state, requirements, validation.ValidReferences);
            return new BillReviewDetails
            {
                DocumentReviewId = state.DocumentReviewId, BillReviewId = state.BillReviewId,
                BillIndex = state.BillIndex, Version = state.Version, ReviewStatus = state.ReviewStatus,
                CreatedOperationID = state.CreatedOperationID,
                Bill = state.Bill, Issues = validation.Issues,
                ReferenceLookups = progress.ReferenceLookups, ResolvedReferences = progress.ResolvedReferences,
                NextLookupKey = progress.NextLookupKey
            };
        }

        private static DocumentReviewSummary CreateSummary(Guid extractionId, IReadOnlyList<BillReviewState> bills)
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

        // Reference requirements, matching and selection validation.
        private List<BillLookupRequirement> GetRequirements(BillReviewState review, BillContext context)
        {
            if (review.Bill == null) return new List<BillLookupRequirement>();
            var requirements = lookupPolicy.GetRequirements(review.Bill, context).ToList();
            if (requirements.Any(requirement => requirement == null || string.IsNullOrWhiteSpace(requirement.LookupKey) ||
                string.IsNullOrWhiteSpace(requirement.Role) || string.IsNullOrWhiteSpace(requirement.ResolverKey) ||
                string.IsNullOrWhiteSpace(requirement.DisplayName)) ||
                requirements.Select(requirement => requirement.LookupKey).Distinct(StringComparer.Ordinal).Count() != requirements.Count)
                throw new InvalidOperationException(BillWorkflowMessages.LookupRequirementsInvalid);
            foreach (var requirement in requirements) GetReferenceHandler(requirement.ResolverKey);
            return requirements;
        }

        private static BillLookupRequirement GetCustomerRequirement(IEnumerable<BillLookupRequirement> requirements,
            string lookupKey)
        {
            var customerRequirement = requirements.SingleOrDefault(requirement => requirement.LookupKey == lookupKey);
            if (customerRequirement == null || customerRequirement.ResolverKey != "Customer" ||
                (customerRequirement.SourceParty != "Shipper" && customerRequirement.SourceParty != "Consignee"))
                throw new DocumentReviewException(DocumentReviewFailure.InvalidInput,
                    BillWorkflowCodes.CustomerLookupRequired, BillWorkflowMessages.CustomerLookupRequired);
            return customerRequirement;
        }

        private IReferenceHandler GetReferenceHandler(string resolverKey)
        {
            IReferenceHandler handler;
            if (referenceHandlers.TryGetValue(resolverKey, out handler)) return handler;
            throw new DocumentReviewException(DocumentReviewFailure.InvalidInput,
                BillWorkflowCodes.ReferenceResolverNotAvailable, BillWorkflowMessages.ReferenceResolverNotAvailable);
        }

        private ReferenceResolution CreateResolution(BillLookupRequirement requirement, ReferenceOption selected,
            ResolutionMethod method)
        {
            return new ReferenceResolution
            {
                Reference = new BillReferenceSummary(requirement.LookupKey, requirement.Role, selected.Id, selected.Name),
                ResolverKey = requirement.ResolverKey,
                SourceParty = requirement.SourceParty,
                SourceField = requirement.SourceField,
                SearchValue = requirement.SearchValue,
                ResolutionMethod = method,
                ConfirmedBy = userId,
                ConfirmedAt = DateTime.Now
            };
        }

        private static BillLookupRequirement ValidateReferenceSelection(BillReferenceSelection selection,
            List<BillLookupRequirement> requirements)
        {
            if (string.IsNullOrWhiteSpace(selection.LookupKey) || selection.Id <= 0)
                throw new DocumentReviewException(DocumentReviewFailure.InvalidInput,
                    BillWorkflowCodes.InvalidReferenceSelection, BillWorkflowMessages.ReferenceSelectionRequired);
            if (!Enum.IsDefined(typeof(ResolutionMethod), selection.ResolutionMethod))
                throw new DocumentReviewException(DocumentReviewFailure.InvalidInput,
                    BillWorkflowCodes.InvalidResolutionMethod, BillWorkflowMessages.InvalidResolutionMethod);
            var requirement = requirements.SingleOrDefault(item => item.LookupKey == selection.LookupKey);
            if (requirement == null)
                throw new DocumentReviewException(DocumentReviewFailure.InvalidInput,
                    BillWorkflowCodes.ReferenceLookupNotAvailable, BillWorkflowMessages.ReferenceLookupNotAvailable);
            return requirement;
        }

        private void ValidateResolutionMethod(BillLookupRequirement requirement, BillContext context,
            int referenceId, ResolutionMethod method)
        {
            if (method == ResolutionMethod.ManualSelection) return;

            // This verifies consistency with current matching, not a historical UI click or saved search snapshot.
            var current = GetReferenceHandler(requirement.ResolverKey).Resolve(requirement, context, userId);
            bool valid;
            if (method == ResolutionMethod.SuggestedSelection)
                valid = current.Match == null &&
                    current.Candidates.Any(candidate => candidate.Id == referenceId);
            else
                valid = current.Match != null && current.Match.Id == referenceId &&
                    current.ResolutionMethod == method;
            if (!valid)
                throw new DocumentReviewException(DocumentReviewFailure.Conflict, BillWorkflowCodes.ReferenceResolutionChanged,
                    BillWorkflowMessages.ReferenceResolutionChanged);
        }

        private static List<ValidationIssue> GetReferenceSelectionIssues(BillLookupRequirement requirement,
            bool hasSelection)
        {
            var issues = new List<ValidationIssue>();
            if (!hasSelection && requirement.IsRequired)
                issues.Add(new ValidationIssue
                {
                    Code = BillWorkflowCodes.ReferenceRequired, FieldPath = "ResolvedReferences." + requirement.LookupKey,
                    Message = string.Format(BillWorkflowMessages.ReferenceRequired, requirement.Role)
                });
            return issues;
        }

        private static List<ValidationIssue> GetReviewIssues(IEnumerable<ValidationIssue> storedIssues,
            IEnumerable<BillLookupRequirement> requirements, IEnumerable<ReferenceResolution> resolutions)
        {
            var issues = storedIssues.Where(issue => issue.Code != BillWorkflowCodes.ReferenceSearchValueMissing &&
                issue.Code != BillWorkflowCodes.SavedReferenceNotAvailable).ToList();
            foreach (var requirement in requirements)
            {
                if (!requirement.IsRequired || IsReferenceConfirmed(FindResolution(resolutions, requirement))) continue;

                if (!ReferenceSearchRules.HasSearchValue(requirement.SearchValue))
                    issues.Add(new ValidationIssue
                    {
                        Code = BillWorkflowCodes.ReferenceSearchValueMissing,
                        FieldPath = requirement.SourceField,
                        Message = string.Format(BillWorkflowMessages.ReferenceSearchValueMissing,
                            requirement.DisplayName, requirement.ResolverKey.ToLowerInvariant())
                    });
            }
            return issues;
        }

        private static List<ValidationIssue> GetConfirmationIssues(IEnumerable<ValidationIssue> billIssues,
            IEnumerable<ValidationIssue> referenceIssues)
        {
            var issues = billIssues.Where(issue => issue.Code != BillWorkflowCodes.ReferenceSearchValueMissing).ToList();
            issues.AddRange(referenceIssues);
            return issues;
        }

        private void ValidateReferenceConfirmation(BillReviewState billReview, BillContext context)
        {
            var requirements = GetRequirements(billReview, context);
            var issues = GetReviewIssues(billReview.Issues, requirements, billReview.ReferenceResolutions);
            if (issues.Count > 0)
                throw new DocumentReviewException(DocumentReviewFailure.Conflict,
                    BillWorkflowCodes.BillFieldsNeedCorrection, string.Format(BillWorkflowMessages.BillFieldsNeedCorrection,
                        string.Join(", ", issues.Select(issue => issue.FieldPath).Distinct())));

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
                var handler = GetReferenceHandler(requirement.ResolverKey);
                if (handler.GetById(result.Reference.Id.Value, requirement, context, userId) == null)
                {
                    var issue = handler.CreateNotAvailableIssue(requirement);
                    throw new DocumentReviewException(DocumentReviewFailure.NotFound,
                        issue.Code, issue.Message);
                }
            }
        }

        private static void ValidateReferencesConfirmedState(BillReviewState billReview)
        {
            if (billReview.ReviewStatus != BillReviewStatus.ReferencesConfirmed ||
                !billReview.ReferencesConfirmedBy.HasValue || !billReview.ReferencesConfirmedAt.HasValue)
                throw new DocumentReviewException(DocumentReviewFailure.Conflict,
                    BillWorkflowCodes.ReferencesNotConfirmed, BillWorkflowMessages.ReferencesNotConfirmed);
        }

        private static bool IsReferenceConfirmed(ReferenceResolution result)
        {
            return result != null && result.Reference != null && result.Reference.Id > 0 &&
                result.ResolutionMethod.HasValue && Enum.IsDefined(typeof(ResolutionMethod), result.ResolutionMethod.Value);
        }

        private static bool MatchesRequirement(ReferenceResolution result, BillLookupRequirement requirement)
        {
            return result != null && result.Reference != null &&
                result.Reference.LookupKey == requirement.LookupKey && result.Reference.Role == requirement.Role &&
                result.ResolverKey == requirement.ResolverKey &&
                result.SourceParty == requirement.SourceParty && result.SourceField == requirement.SourceField &&
                string.Equals(result.SearchValue, requirement.SearchValue, StringComparison.Ordinal);
        }

        private static ReferenceResolution FindResolution(IEnumerable<ReferenceResolution> resolutions, BillLookupRequirement requirement)
        {
            return resolutions.SingleOrDefault(result => MatchesRequirement(result, requirement));
        }

        private BillReviewState LoadBillReview(Guid billReviewId, out BillContext context)
        {
            RequireActor();
            if (billReviewId == Guid.Empty)
                throw new DocumentReviewException(DocumentReviewFailure.InvalidInput,
                    BillWorkflowCodes.BillReviewIdRequired, BillWorkflowMessages.BillReviewIdRequired);

            var data = reviewStore.GetBillReview(billReviewId);
            if (data == null)
                throw new DocumentReviewException(DocumentReviewFailure.NotFound,
                    BillWorkflowCodes.BillReviewNotFound, BillWorkflowMessages.BillReviewNotFound);
            context = data.ReviewStatus == BillReviewStatus.Completed
                ? contexts.Load(data.Context.ParentReference, userId) : ValidateCurrentContext(data.Context);
            if (data.ReviewStatus == BillReviewStatus.NotStarted) ThrowReviewNotStarted();
            return data;
        }

        private BillContext ValidateCurrentContext(BillContext context)
        {
            var current = contexts.Load(context.ParentReference, userId);
            if (context.Version == null) return current;
            if (current.Version != context.Version || current.Direction != context.Direction)
                throw new DocumentReviewException(DocumentReviewFailure.Conflict,
                    BillWorkflowCodes.MasterContextChanged, BillWorkflowMessages.MasterContextChanged);
            return current;
        }

        private void RequireActor()
        {
            if (userId <= 0)
                throw new DocumentReviewException(DocumentReviewFailure.Forbidden,
                    BillWorkflowCodes.UserRequired, BillWorkflowMessages.UserRequired);
        }

        private static void ThrowReviewNotStarted()
        {
            throw new DocumentReviewException(DocumentReviewFailure.Conflict,
                BillWorkflowCodes.ReviewNotStarted, BillWorkflowMessages.ReviewNotStarted);
        }

        private static void RequireReadableBill(BillReviewState data)
        {
            if (data.Bill == null)
                throw new DocumentReviewException(DocumentReviewFailure.Conflict,
                    BillWorkflowCodes.BillReviewNotReady, BillWorkflowMessages.BillReviewNotReady, data.Issues);
        }

        private static void RequireEditableReview(BillReviewState data)
        {
            if (data.ReviewStatus >= BillReviewStatus.ReferencesConfirmed)
                throw new DocumentReviewException(DocumentReviewFailure.Conflict,
                    BillWorkflowCodes.ReferencesAlreadyConfirmed, BillWorkflowMessages.ReferencesAlreadyConfirmed);
        }

        private static void RequireBillReadyForReferences(BillReviewState data)
        {
            RequireReadableBill(data);
            RequireNoBlockingBillIssues(data);
        }

        private static void RequireNoBlockingBillIssues(BillReviewState data)
        {
            var blockingIssues = data.Issues.Where(issue => issue.Code != BillWorkflowCodes.ReferenceSearchValueMissing &&
                issue.Code != BillWorkflowCodes.SavedReferenceNotAvailable).ToList();
            if (blockingIssues.Count > 0)
                throw new DocumentReviewException(DocumentReviewFailure.Conflict,
                    BillWorkflowCodes.BillFieldsNeedCorrection, BillWorkflowMessages.BillIssuesBlockReferences, blockingIssues);
        }

        private static void ValidateBillReviewVersion(int version, int expectedVersion)
        {
            if (version != expectedVersion)
                throw new DocumentReviewException(DocumentReviewFailure.Conflict,
                    BillWorkflowCodes.BillReviewVersionChanged, BillWorkflowMessages.BillReviewVersionChanged);
        }

    }
}

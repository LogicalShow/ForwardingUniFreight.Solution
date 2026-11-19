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
        public const int MaximumSearchTextLength = 500;
        public const int MaximumSearchPage = 10000;
        public const int MaximumSearchPageSize = 50;
        public const int MaximumBillPageSize = 10;
        private readonly int userId;
        private readonly string blType;
        private readonly string manifestType;
        private readonly IBillContextProvider contexts;
        private readonly IBillLookupPolicy lookupPolicy;
        private readonly IBillWorkflowStore reviewStore;
        private readonly IReferenceResolver customerResolver;
        private readonly ICustomerDirectory customers;
        private readonly IReferenceResolver portResolver;
        private readonly IPortDirectory ports;

        public DocumentReviewService(
            int userId,
            string blType,
            string manifestType,
            IBillContextProvider contexts,
            IBillLookupPolicy lookupPolicy,
            IBillWorkflowStore reviewStore,
            IReferenceResolver customerResolver,
            ICustomerDirectory customers,
            IReferenceResolver portResolver,
            IPortDirectory ports)
        {
            if (string.IsNullOrWhiteSpace(blType) || string.IsNullOrWhiteSpace(manifestType) || contexts == null || lookupPolicy == null || reviewStore == null ||
                customerResolver == null || customers == null || portResolver == null || ports == null)
                throw new ArgumentNullException(BillWorkflowMessages.ServiceDependenciesRequired);
            this.userId = userId;
            this.blType = blType;
            this.manifestType = manifestType;
            this.contexts = contexts;
            this.lookupPolicy = lookupPolicy;
            this.reviewStore = reviewStore;
            this.customerResolver = customerResolver;
            this.customers = customers;
            this.portResolver = portResolver;
            this.ports = ports;
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
            PrepareReviewDetails(data);
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

            result.Context = ValidateCurrentContext(result.Context);
            if (!result.ReviewStarted) ThrowReviewNotStarted();
            foreach (var bill in result.Items)
            {
                bill.Context = result.Context;
                PrepareReviewDetails(bill);
            }
            return result;
        }

        public BillReferenceResolution ResolveReferences(Guid billReviewId, int expectedVersion, string role)
        {
            if (billReviewId == Guid.Empty || expectedVersion <= 0 || string.IsNullOrWhiteSpace(role))
                throw new DocumentReviewException(DocumentReviewFailure.InvalidInput,
                    BillWorkflowCodes.InvalidReferenceResolutionRequest, BillWorkflowMessages.ReferenceResolutionRequestRequired);

            var data = LoadBillReview(billReviewId);
            ValidateBillReviewVersion(data.Version, expectedVersion);
            RequireBillReadyForReferences(data);
            var requirements = GetRequirements(data);
            var requirement = requirements.FirstOrDefault(item => item.Role == role);
            if (requirement == null)
                throw new DocumentReviewException(DocumentReviewFailure.InvalidInput,
                    BillWorkflowCodes.ReferenceRoleNotAvailable, BillWorkflowMessages.ReferenceRoleNotEnabled);

            var result = GetResolver(requirement).Resolve(requirement, data.Context, userId);
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
                    Code = candidate.Code,
                    Name = candidate.Name,
                    LocalName = candidate.LocalName
                }).ToList()
            };
        }

        public CustomerLookupPage SearchCustomers(Guid billReviewId, string searchText,
            int page, int pageSize)
        {
            ValidateReferenceSearch(searchText, page, pageSize);
            var billReview = LoadBillReview(billReviewId);
            RequireBillReadyForReferences(billReview);
            var requirements = GetRequirements(billReview);
            var customerRequirement = GetCustomerRequirement(requirements);
            var result = customers.Search(searchText.Trim(), page, pageSize, customerRequirement.SourceParty,
                billReview.Context, userId);
            ValidateCurrentContext(billReview.Context);
            return result;
        }

        public PortLookupPage SearchPorts(Guid billReviewId, string searchText, int page, int pageSize)
        {
            ValidateReferenceSearch(searchText, page, pageSize);
            var review = LoadBillReview(billReviewId);
            RequireBillReadyForReferences(review);
            var result = ports.Search(searchText.Trim(), page, pageSize, review.Context, userId);
            ValidateCurrentContext(review.Context);
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
            var data = LoadBillReview(billReviewId);
            ValidateBillReviewVersion(data.Version, expectedVersion);
            RequireReadableBill(data);
            RequireEditableReview(data);
            PrepareReviewDetails(data);
            var requirements = GetRequirements(data);
            var referenceIssues = new List<ValidationIssue>();
            foreach (var requirement in requirements)
                referenceIssues.AddRange(GetReferenceSelectionIssues(requirement,
                    FindResolution(data.ReferenceResolutions, requirement) != null));
            var issues = GetConfirmationIssues(data.Issues, referenceIssues);
            if (issues.Count > 0)
                throw new DocumentReviewException(DocumentReviewFailure.Conflict, BillWorkflowCodes.BillReviewNotReady,
                    BillWorkflowMessages.BillReviewNotReady, issues);

            data.RememberAlias = rememberAlias;
            data.Issues = issues;
            ValidateCurrentContext(data.Context);
            var confirmed = reviewStore.ConfirmReferences(data, expectedVersion, userId);
            confirmed.Context = data.Context;
            PrepareReviewDetails(confirmed);
            return confirmed;
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
            var requirements = GetRequirements(billReview);
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

        private void PrepareReviewDetails(BillReviewDetails data)
        {
            if (data.Bill == null) return;
            var requirements = GetRequirements(data);
            var stored = data.ReferenceResolutions ?? new List<ReferenceResolution>();
            var valid = new List<ReferenceResolution>();
            var issues = new List<ValidationIssue>();
            foreach (var requirement in requirements)
            {
                var matches = stored.Where(result => result != null && result.Reference != null &&
                    result.Reference.Role == requirement.Role).ToList();
                if (matches.Count == 0) continue;
                var saved = matches[0];
                ReferenceOption selected = null;
                if (matches.Count == 1 && IsReferenceConfirmed(saved) && MatchesRequirement(saved, requirement))
                    selected = GetSelectedReference(requirement, saved.Reference.Id.Value, data.Context);
                if (selected == null)
                {
                    issues.Add(new ValidationIssue
                    {
                        Code = BillWorkflowCodes.SavedReferenceNotAvailable,
                        FieldPath = "ResolvedReferences." + requirement.Role,
                        Message = string.Format(BillWorkflowMessages.SavedReferenceNotAvailable, requirement.Role)
                    });
                    continue;
                }
                saved.Reference = new BillReferenceSummary(requirement.Role, selected.Id, selected.Name);
                valid.Add(saved);
            }
            data.ReferenceResolutions = valid;
            data.Issues = GetReviewIssues(data.Issues, requirements, valid);
            data.Issues.AddRange(issues);
            SetReferenceProgress(data, requirements);
        }

        private BillReviewDetails SaveReference(Guid billReviewId, int expectedVersion, BillReferenceSelection selection)
        {
            if (billReviewId == Guid.Empty || expectedVersion <= 0 || selection == null)
                throw new DocumentReviewException(DocumentReviewFailure.InvalidInput,
                    BillWorkflowCodes.InvalidSubmitReferenceStepRequest, BillWorkflowMessages.SubmitReferenceStepRequestRequired);
            var data = LoadBillReview(billReviewId);
            ValidateBillReviewVersion(data.Version, expectedVersion);
            RequireReadableBill(data);
            RequireEditableReview(data);
            RequireNoBlockingBillIssues(data);
            var requirements = GetRequirements(data);
            var requirement = ValidateReferenceSelection(selection, requirements);
            var selected = GetSelectedReference(requirement, selection.Id, data.Context);
            var issues = GetSelectionIssues(requirement, selected);
            if (issues.Count > 0)
                throw new DocumentReviewException(DocumentReviewFailure.Conflict, BillWorkflowCodes.BillReviewNotReady,
                    BillWorkflowMessages.BillReviewNotReady, issues);
            ValidateResolutionMethod(requirement, data.Context, selected.Id, selection.ResolutionMethod);

            ValidateCurrentContext(data.Context);
            var update = new BillReferenceUpdate
            {
                BillReviewId = data.BillReviewId,
                ReferenceResolution = CreateResolution(requirement, selected, selection.ResolutionMethod)
            };
            var saved = reviewStore.SaveReference(update, expectedVersion, userId);
            saved.Context = data.Context;
            SetReferenceProgress(saved, requirements);
            return saved;
        }

        private SubmitReferenceStepResult ResolveNextReference(BillReviewDetails saved)
        {
            return new SubmitReferenceStepResult
            {
                Progress = CreateProgress(saved),
                NextResolution = saved.NextRole == null ? null :
                    ResolveReferences(saved.BillReviewId, saved.Version, saved.NextRole)
            };
        }

        private static void SetReferenceProgress(BillReviewDetails review, List<BillLookupRequirement> requirements)
        {
            review.ReferenceRoles = requirements.Select(requirement => requirement.Role).ToList().AsReadOnly();
            var references = review.ResolvedReferences;
            var next = review.ReviewStatus == BillReviewStatus.ReferencesConfirmed ? null :
                requirements.FirstOrDefault(requirement => requirement.IsRequired &&
                    !references.Any(reference => reference.Role == requirement.Role));
            review.NextRole = next == null ? null : next.Role;
        }

        private static BillReviewProgress CreateProgress(BillReviewDetails saved)
        {
            return new BillReviewProgress
            {
                BillReviewId = saved.BillReviewId, Version = saved.Version, ReviewStatus = saved.ReviewStatus,
                ReferenceRoles = saved.ReferenceRoles, ResolvedReferences = saved.ResolvedReferences,
                NextRole = saved.NextRole
            };
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

        // Reference requirements, matching and selection validation.
        private List<BillLookupRequirement> GetRequirements(BillReviewDetails review)
        {
            return lookupPolicy.GetRequirements(review.Bill, review.Context).ToList();
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

        private IReferenceResolver GetResolver(BillLookupRequirement requirement)
        {
            if (requirement.ResolverKey == "Customer") return customerResolver;
            if (requirement.ResolverKey == "Port") return portResolver;
            throw new DocumentReviewException(DocumentReviewFailure.InvalidInput,
                BillWorkflowCodes.ReferenceResolverNotAvailable, BillWorkflowMessages.ReferenceResolverNotAvailable);
        }

        private ReferenceOption GetSelectedReference(BillLookupRequirement requirement, int id, BillContext context)
        {
            if (requirement.ResolverKey == "Customer")
            {
                var customer = customers.GetById(id, requirement.SourceParty, context, userId);
                return customer == null ? null : new ReferenceOption
                {
                    Id = customer.Id, Name = customer.Name, LocalName = customer.LocalName
                };
            }
            if (requirement.ResolverKey == "Port")
            {
                var port = ports.GetById(id, context, userId);
                return port == null ? null : new ReferenceOption
                {
                    Id = port.Id, Code = port.Code, Name = port.Name, LocalName = port.LocalName
                };
            }
            throw new DocumentReviewException(DocumentReviewFailure.InvalidInput,
                BillWorkflowCodes.ReferenceResolverNotAvailable, BillWorkflowMessages.ReferenceValidatorNotAvailable);
        }

        private ReferenceResolution CreateResolution(BillLookupRequirement requirement, ReferenceOption selected,
            ResolutionMethod method)
        {
            return new ReferenceResolution
            {
                Reference = new BillReferenceSummary(requirement.Role, selected.Id, selected.Name),
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
            if (string.IsNullOrWhiteSpace(selection.Role) || selection.Id <= 0)
                throw new DocumentReviewException(DocumentReviewFailure.InvalidInput,
                    BillWorkflowCodes.InvalidReferenceSelection, BillWorkflowMessages.ReferenceSelectionRequired);
            if (!Enum.IsDefined(typeof(ResolutionMethod), selection.ResolutionMethod))
                throw new DocumentReviewException(DocumentReviewFailure.InvalidInput,
                    BillWorkflowCodes.InvalidResolutionMethod, BillWorkflowMessages.InvalidResolutionMethod);
            var requirement = requirements.SingleOrDefault(item => item.Role == selection.Role);
            if (requirement == null)
                throw new DocumentReviewException(DocumentReviewFailure.InvalidInput,
                    BillWorkflowCodes.ReferenceRoleNotAvailable, BillWorkflowMessages.ReferenceRoleNotAvailable);
            return requirement;
        }

        private void ValidateResolutionMethod(BillLookupRequirement requirement, BillContext context,
            int referenceId, ResolutionMethod method)
        {
            if (method == ResolutionMethod.ManualSelection) return;

            // This verifies consistency with current matching, not a historical UI click or saved search snapshot.
            var current = GetResolver(requirement).Resolve(requirement, context, userId);
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

        private static List<ValidationIssue> GetSelectionIssues(BillLookupRequirement requirement,
            ReferenceOption selected)
        {
            var issues = new List<ValidationIssue>();
            if (selected == null)
                issues.Add(new ValidationIssue
                {
                    Code = requirement.ResolverKey == "Customer" ? BillWorkflowCodes.CustomerNotAvailable : BillWorkflowCodes.PortNotAvailable,
                    FieldPath = "Id",
                    Message = requirement.ResolverKey == "Customer" ? BillWorkflowMessages.CustomerNotAvailable : BillWorkflowMessages.PortNotAvailable
                });
            return issues;
        }

        private static List<ValidationIssue> GetReferenceSelectionIssues(BillLookupRequirement requirement,
            bool hasSelection)
        {
            var issues = new List<ValidationIssue>();
            if (!hasSelection && requirement.IsRequired)
                issues.Add(new ValidationIssue
                {
                    Code = BillWorkflowCodes.ReferenceRequired, FieldPath = "ResolvedReferences." + requirement.Role,
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

                bool hasSearchValue;
                string displayName;
                if (requirement.ResolverKey == "Customer")
                {
                    hasSearchValue = CustomerResolver.HasSearchValue(requirement.SearchValue);
                    displayName = requirement.SourceParty.ToLowerInvariant();
                }
                else if (requirement.ResolverKey == "Port")
                {
                    hasSearchValue = PortResolver.HasSearchValue(requirement.SearchValue);
                    displayName = requirement.Role == "PortOfLoading" ? "loading port" : "discharge port";
                }
                else continue;

                if (!hasSearchValue)
                    issues.Add(new ValidationIssue
                    {
                        Code = BillWorkflowCodes.ReferenceSearchValueMissing,
                        FieldPath = requirement.SourceField,
                        Message = string.Format(BillWorkflowMessages.ReferenceSearchValueMissing,
                            displayName, requirement.ResolverKey.ToLowerInvariant())
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

        private void ValidateReferenceConfirmation(BillReviewDetails billReview)
        {
            var requirements = GetRequirements(billReview);
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
                if (GetSelectedReference(requirement, result.Reference.Id.Value, billReview.Context) == null)
                    throw new DocumentReviewException(DocumentReviewFailure.NotFound,
                        requirement.ResolverKey == "Customer" ? BillWorkflowCodes.CustomerNotAvailable : BillWorkflowCodes.PortNotAvailable,
                        requirement.ResolverKey == "Customer" ? string.Format(BillWorkflowMessages.SelectedCustomerNotAvailable, requirement.Role) : BillWorkflowMessages.PortNotAvailable);
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
                result.ResolutionMethod.HasValue && Enum.IsDefined(typeof(ResolutionMethod), result.ResolutionMethod.Value);
        }

        private static bool MatchesRequirement(ReferenceResolution result, BillLookupRequirement requirement)
        {
            return result != null && result.Reference != null &&
                result.Reference.Role == requirement.Role && result.ResolverKey == requirement.ResolverKey &&
                result.SourceParty == requirement.SourceParty && result.SourceField == requirement.SourceField &&
                string.Equals(result.SearchValue, requirement.SearchValue, StringComparison.Ordinal);
        }

        private static ReferenceResolution FindResolution(IEnumerable<ReferenceResolution> resolutions, BillLookupRequirement requirement)
        {
            return resolutions.SingleOrDefault(result => MatchesRequirement(result, requirement));
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
            data.Context = ValidateCurrentContext(data.Context);
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

        private static void RequireReadableBill(BillReviewDetails data)
        {
            if (data.Bill == null)
                throw new DocumentReviewException(DocumentReviewFailure.Conflict,
                    BillWorkflowCodes.BillReviewNotReady, BillWorkflowMessages.BillReviewNotReady, data.Issues);
        }

        private static void RequireEditableReview(BillReviewDetails data)
        {
            if (data.ReviewStatus == BillReviewStatus.ReferencesConfirmed)
                throw new DocumentReviewException(DocumentReviewFailure.Conflict,
                    BillWorkflowCodes.ReferencesAlreadyConfirmed, BillWorkflowMessages.ReferencesAlreadyConfirmed);
        }

        private static void RequireBillReadyForReferences(BillReviewDetails data)
        {
            RequireReadableBill(data);
            RequireNoBlockingBillIssues(data);
        }

        private static void RequireNoBlockingBillIssues(BillReviewDetails data)
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

        private static void ValidateReferenceSearch(string searchText, int page, int pageSize)
        {
            if (string.IsNullOrWhiteSpace(searchText) || searchText.Length > MaximumSearchTextLength ||
                !searchText.Any(char.IsLetterOrDigit) || page < 1 || page > MaximumSearchPage ||
                pageSize < 1 || pageSize > MaximumSearchPageSize)
                throw new DocumentReviewException(DocumentReviewFailure.InvalidInput,
                    BillWorkflowCodes.InvalidReferenceSearch, BillWorkflowMessages.InvalidReferenceSearch);
        }

    }
}

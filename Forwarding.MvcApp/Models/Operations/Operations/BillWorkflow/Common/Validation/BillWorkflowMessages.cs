namespace BillWorkflow.Common.Validation
{
    // Message text and templates live here; callers format context-specific values.
    internal static class BillWorkflowMessages
    {
        public const string ExtractionNotReady = "The extraction must be completed and its bills ready before review can start.";
        public const string UnsupportedDocumentType = "Only bill-of-lading.v1 and cargo-manifest.v1 documents can be reviewed.";
        public const string NoBillsToReview = "There are no bills to review in this document.";
        public const string ReviewNotStarted = "Start the review of this document first.";
        public const string BillTooLarge = "The bill exceeds the 2,097,152-character limit.";
        public const string UnidentifiedBill = "The B/L number of this bill was not identified in the document. It cannot be confirmed.";
        public const string BillFieldsNeedCorrection = "Correct the reviewed bill fields before confirming references: {0}";
        public const string BillJsonMalformed = "The bill JSON is malformed or too deeply nested.";
        public const string ReferencesAlreadyConfirmed = "The required references for this bill are already confirmed.";
        public const string BillReviewIdInvalid = "Supply a valid bill review ID.";
        public const string BillReviewsRequestRequired = "Supply DocumentReviewId, Page of at least 1 and PageSize between 1 and {0}.";
        public const string BillReviewIdRequired = "A valid bill review ID is required.";
        public const string ReferencesNotConfirmed = "Confirm this bill's required references before passing it to Phase 3.";
        public const string BillReviewNotFound = "The bill review was not found.";
        public const string BillReviewNotInDocument = "The bill review was not found in this document review.";
        public const string BillReviewNotReady = "Correct the issues before confirming references.";
        public const string BillReviewVersionChanged = "The bill review changed. Reload it before retrying.";
        public const string BillShapeRequired = "Each item must be a BillOfLading object.";
        public const string BillUnreadable = "The bill could not be read.";
        public const string BoundedCustomerSearchRequired = "Supply bounded customer search text and valid pagination.";
        public const string ConfirmedBillRequestRequired = "Supply a bill review ID and positive confirmed version.";
        public const string ConfirmationRequestRequired = "Supply BillReviewId, a positive ExpectedVersion and ReferenceSelections.";
        public const string ConnectionRequired = "The host database connection is required.";
        public const string ControllerDependenciesRequired = "DocumentReview dependencies must be supplied.";
        public const string CustomerAccessRequired = "An active user and accessible master context are required.";
        public const string CustomerAliasConflict = "This alias has another active mapping or a disabled mapping. Confirm with RememberAlias=false or review the master data.";
        public const string CustomerIdRequired = "A positive customer ID is required.";
        public const string CustomerLookupRequired = "This bill has no configured Customer lookup.";
        public const string CustomerNameRequired = "Supply a {0} name for matching, or select an eligible customer ID.";
        public const string CustomerNotAvailable = "Choose an eligible customer.";
        public const string CustomerSearchRequestRequired = "Supply BillReviewId and SearchText, with valid pagination.";
        public const string DocumentReviewFailed = "The document review could not be processed. Please try again.";
        public const string DocumentReviewFailureLog = "Document review failed: {0}";
        public const string DocumentReviewNotFound = "The document review was not found.";
        public const string DocumentReviewRequestRequired = "Supply a valid AIDocumentExtractionID.";
        public const string DuplicateBillField = "A bill field cannot be supplied twice.";
        public const string DuplicateReferenceRole = "Submit each reference role once.";
        public const string InvalidContainers = "Containers must be an array of at most 1000 container objects.";
        public const string InvalidCustomerScope = "A master context and authenticated user are required.";
        public const string InvalidCustomerSearch = "Supply search text of 1-500 characters containing letters or numbers, Page between 1 and 10000, and PageSize between 1 and 50.";
        public const string InvalidFieldValue = "The extracted value does not match the field's expected type.";
        public const string InvalidReferenceSelections = "Correct the submitted reference selections.";
        public const string InvalidResolutionMethod = "Supply a supported resolution method.";
        public const string LookupInputsRequired = "A lookup requirement and context are required.";
        public const string MasterContextChanged = "The master context changed. Start the review of this document again.";
        public const string MasterIdRequired = "A positive existing master-operation ID is required.";
        public const string MasterNotFound = "The master operation was not found or is not accessible.";
        public const string MasterOperationRequired = "Select a master operation, not a house or direct operation.";
        public const string OperationsAccessRequired = "Operations view permission is required.";
        public const string ReferenceRequired = "Select the required {0} ID.";
        public const string ReferenceResolutionChanged = "The selected ID or resolution method no longer agrees with matching. Resolve again before confirming it.";
        public const string ReferenceResolutionRequestRequired = "Supply BillReviewId, a positive ExpectedVersion and Role.";
        public const string ReferenceResolverNotAvailable = "The requested reference resolver is not available yet.";
        public const string ReferenceRoleNotAvailable = "This role is not enabled for the bill.";
        public const string ReferenceRoleNotEnabled = "The requested role is not enabled for this bill.";
        public const string ReferenceSelectionRequired = "Supply a reference Role and positive Id.";
        public const string ReferenceValidatorNotAvailable = "The requested reference validator is not available yet.";
        public const string RequiredReferencesNotConfirmed = "Confirm the required {0} ID before continuing.";
        public const string SelectedCustomerNotAvailable = "The selected {0} customer is no longer available for this bill.";
        public const string ServiceDependenciesRequired = "Document review dependencies must be supplied.";
        public const string StoredContextInvalid = "Invalid stored review context.";
        public const string UnsupportedReferenceConfirmation = "Confirmation cannot validate the {0} reference yet.";
        public const string UnsupportedCustomerLookup = "Supply a shipper or consignee customer requirement.";
        public const string UnsupportedDirection = "Stage 1 supports import and export master operations.";
        public const string UserRequired = "An authenticated application user is required.";
        public const string ValidatedConfirmationRequired = "A validated review, references, acting user and expected version are required.";
    }
}

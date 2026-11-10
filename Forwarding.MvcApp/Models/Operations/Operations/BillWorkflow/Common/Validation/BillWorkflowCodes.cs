namespace BillWorkflow.Common.Validation
{
    internal static class BillWorkflowCodes
    {
        public const string BillsRequired = "BILLS_REQUIRED";
        public const string BillFieldsNeedCorrection = "BILL_FIELDS_NEED_CORRECTION";
        public const string ReferencesAlreadyConfirmed = "REFERENCES_ALREADY_CONFIRMED";
        public const string BillReviewIdRequired = "BILL_REVIEW_ID_REQUIRED";
        public const string ReferencesNotConfirmed = "REFERENCES_NOT_CONFIRMED";
        public const string BillReviewNotFound = "BILL_REVIEW_NOT_FOUND";
        public const string BillReviewNotReady = "BILL_REVIEW_NOT_READY";
        public const string BillReviewVersionChanged = "BILL_REVIEW_VERSION_CHANGED";
        public const string CustomerAccessRequired = "CUSTOMER_ACCESS_REQUIRED";
        public const string CustomerAliasConflict = "CUSTOMER_ALIAS_CONFLICT";
        public const string CustomerLookupRequired = "CUSTOMER_LOOKUP_REQUIRED";
        public const string CustomerNameRequired = "CUSTOMER_NAME_REQUIRED";
        public const string CustomerNotAvailable = "CUSTOMER_NOT_AVAILABLE";
        public const string DocumentReviewFailed = "DOCUMENT_REVIEW_FAILED";
        public const string DocumentReviewNotFound = "DOCUMENT_REVIEW_NOT_FOUND";
        public const string DocumentReviewProfileChanged = "DOCUMENT_REVIEW_PROFILE_CHANGED";
        public const string DuplicateBillField = "DUPLICATE_BILL_FIELD";
        public const string DuplicateReferenceRole = "DUPLICATE_REFERENCE_ROLE";
        public const string InvalidBillJson = "INVALID_BILL_JSON";
        public const string InvalidBillList = "INVALID_BILL_LIST";
        public const string InvalidBillReviewId = "INVALID_BILL_REVIEW_ID";
        public const string InvalidBillReviewPage = "INVALID_BILL_REVIEW_PAGE";
        public const string InvalidBillShape = "INVALID_BILL_SHAPE";
        public const string InvalidConfirmedBillRequest = "INVALID_CONFIRMED_BILL_REQUEST";
        public const string InvalidReferenceConfirmationRequest = "INVALID_REFERENCE_CONFIRMATION_REQUEST";
        public const string InvalidContainers = "INVALID_CONTAINERS";
        public const string InvalidCustomerScope = "INVALID_CUSTOMER_SCOPE";
        public const string InvalidCustomerSearch = "INVALID_CUSTOMER_SEARCH";
        public const string InvalidDocumentReviewRequest = "INVALID_DOCUMENT_REVIEW_REQUEST";
        public const string InvalidFieldValue = "INVALID_FIELD_VALUE";
        public const string InvalidReferenceResolutionRequest = "INVALID_REFERENCE_RESOLUTION_REQUEST";
        public const string InvalidReferenceSelection = "INVALID_REFERENCE_SELECTION";
        public const string InvalidReferenceSelections = "INVALID_REFERENCE_SELECTIONS";
        public const string InvalidResolutionMethod = "INVALID_RESOLUTION_METHOD";
        public const string MasterContextChanged = "MASTER_CONTEXT_CHANGED";
        public const string MasterIdRequired = "MASTER_ID_REQUIRED";
        public const string MasterNotFound = "MASTER_NOT_FOUND";
        public const string MasterOperationRequired = "MASTER_OPERATION_REQUIRED";
        public const string OperationsAccessRequired = "OPERATIONS_ACCESS_REQUIRED";
        public const string ReferenceRequired = "REFERENCE_REQUIRED";
        public const string ReferenceResolutionChanged = "REFERENCE_RESOLUTION_CHANGED";
        public const string ReferenceResolverNotAvailable = "REFERENCE_RESOLVER_NOT_AVAILABLE";
        public const string ReferenceRoleNotAvailable = "REFERENCE_ROLE_NOT_AVAILABLE";
        public const string RequiredReferencesNotConfirmed = "REQUIRED_REFERENCES_NOT_CONFIRMED";
        public const string UnsupportedReferenceConfirmation = "UNSUPPORTED_REFERENCE_CONFIRMATION";
        public const string UnsupportedCustomerLookup = "UNSUPPORTED_CUSTOMER_LOOKUP";
        public const string UnsupportedDirection = "UNSUPPORTED_DIRECTION";
        public const string UserRequired = "USER_REQUIRED";
    }
}

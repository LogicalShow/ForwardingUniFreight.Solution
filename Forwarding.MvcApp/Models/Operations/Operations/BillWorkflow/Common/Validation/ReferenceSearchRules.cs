using System.Linq;
using BillWorkflow.Common.Exceptions;

namespace BillWorkflow.Common.Validation
{
    public static class ReferenceSearchRules
    {
        public const int MaximumSearchTextLength = 500;
        public const int MaximumSearchPage = 10000;
        public const int MaximumSearchPageSize = 50;

        public static bool HasSearchValue(string value)
        {
            return !string.IsNullOrWhiteSpace(value) && value.Length <= MaximumSearchTextLength &&
                value.Any(char.IsLetterOrDigit);
        }

        public static void ValidateSearch(string value, int page, int pageSize)
        {
            if (!HasSearchValue(value) || page < 1 || page > MaximumSearchPage ||
                pageSize < 1 || pageSize > MaximumSearchPageSize)
                throw new DocumentReviewException(DocumentReviewFailure.InvalidInput,
                    BillWorkflowCodes.InvalidReferenceSearch, BillWorkflowMessages.InvalidReferenceSearch);
        }
    }
}

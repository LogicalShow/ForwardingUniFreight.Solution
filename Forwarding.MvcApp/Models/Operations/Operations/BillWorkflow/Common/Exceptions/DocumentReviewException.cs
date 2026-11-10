using System;
using System.Collections.Generic;
using BillWorkflow.Common.Contracts;

namespace BillWorkflow.Common.Exceptions
{
    public enum DocumentReviewFailure
    {
        InvalidInput,
        Forbidden,
        NotFound,
        Conflict
    }

    public class DocumentReviewException : Exception
    {
        public DocumentReviewException(DocumentReviewFailure failure, string code, string message)
            : base(message)
        {
            Failure = failure;
            Code = code;
        }

        public DocumentReviewFailure Failure { get; private set; }
        public string Code { get; private set; }
        public List<ValidationIssue> Issues { get; private set; }

        public DocumentReviewException(DocumentReviewFailure failure, string code, string message, List<ValidationIssue> issues)
            : this(failure, code, message)
        {
            Issues = issues;
        }
    }
}

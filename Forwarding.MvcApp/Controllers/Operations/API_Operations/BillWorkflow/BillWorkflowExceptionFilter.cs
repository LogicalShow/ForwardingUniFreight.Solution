using System.Collections.Generic;
using System.Diagnostics;
using System.Net;
using System.Net.Http;
using System.Web.Http.Filters;
using BillWorkflow.Common.Contracts;
using BillWorkflow.Common.Exceptions;
using BillWorkflow.Common.Validation;

namespace Forwarding.MvcApp.Controllers.Operations.API_Operations.BillWorkflow
{
    public class BillWorkflowExceptionFilter : ExceptionFilterAttribute
    {
        public override void OnException(HttpActionExecutedContext context)
        {
            var exception = context.Exception as DocumentReviewException;
            var status = HttpStatusCode.InternalServerError;
            ApiError error;

            if (exception != null)
            {
                status = GetStatusCode(exception.Failure);
                error = new ApiError
                {
                    Code = exception.Code,
                    Message = exception.Message,
                    ValidationErrors = exception.Issues ?? new List<ValidationIssue>()
                };
            }
            else
            {
                Trace.TraceError(BillWorkflowMessages.DocumentReviewFailureLog, context.Exception);
                error = new ApiError
                {
                    Code = BillWorkflowCodes.DocumentReviewFailed,
                    Message = BillWorkflowMessages.DocumentReviewFailed
                };
            }

            context.Response = context.Request.CreateResponse(status, new ApiResponse<object> { Error = error });
        }

        private static HttpStatusCode GetStatusCode(DocumentReviewFailure failure)
        {
            switch (failure)
            {
                case DocumentReviewFailure.Forbidden: return HttpStatusCode.Forbidden;
                case DocumentReviewFailure.NotFound: return HttpStatusCode.NotFound;
                case DocumentReviewFailure.Conflict: return HttpStatusCode.Conflict;
                default: return HttpStatusCode.BadRequest;
            }
        }
    }
}

using System;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using BillWorkflow.Common.Contracts;
using BillWorkflow.Common.Services;
using WebMatrix.WebData;
using BillWorkflow.Common.Validation;
using Forwarding.MvcApp.Models.Operations.Operations.BillWorkflow;
using System.Net.Http.Headers;

namespace Forwarding.MvcApp.Controllers.Operations.API_Operations.BillWorkflow
{
    [Authorize]
    [BillWorkflowExceptionFilter]
    public class DocumentReviewController : ApiController
    {
        private readonly DocumentReviewService service;

        public DocumentReviewController()
            : this(BillWorkflowRegistration.CreateService(WebSecurity.CurrentUserId))
        {
        }

        public DocumentReviewController(DocumentReviewService service)
        {
            if (service == null)
                throw new ArgumentNullException(BillWorkflowMessages.ControllerDependenciesRequired);
            this.service = service;
        }

        [HttpPost]
        public HttpResponseMessage CreateDocumentReview([FromBody] CreateDocumentReviewRequest request)
        {
            if (!ModelState.IsValid || request == null || request.AIDocumentExtractionID == Guid.Empty)
                return CreateErrorResponse(HttpStatusCode.BadRequest, BillWorkflowCodes.InvalidDocumentReviewRequest,
                    BillWorkflowMessages.DocumentReviewRequestRequired);
            var summary = service.CreateDocumentReview(request.AIDocumentExtractionID);
            return CreateSuccessResponse(HttpStatusCode.OK, summary);
        }

        [HttpGet]
        public HttpResponseMessage GetBillReview(Guid billReviewId)
        {
            if (!ModelState.IsValid)
                return CreateErrorResponse(HttpStatusCode.BadRequest, BillWorkflowCodes.InvalidBillReviewId,
                    BillWorkflowMessages.BillReviewIdInvalid);
            var details = service.GetBillReview(billReviewId);
            var response = CreateSuccessResponse(HttpStatusCode.OK, details);
            response.Headers.CacheControl = new CacheControlHeaderValue { NoStore = true };
            return response;
        }

        [HttpGet]
        public HttpResponseMessage GetBillReviews([FromUri] GetBillReviewsRequest request)
        {
            if (!ModelState.IsValid || request == null)
                return CreateErrorResponse(HttpStatusCode.BadRequest, BillWorkflowCodes.InvalidBillReviewPage,
                    string.Format(BillWorkflowMessages.BillReviewsRequestRequired, DocumentReviewService.MaximumBillPageSize));
            var page = service.GetBillReviews(request.DocumentReviewId, request.Page, request.PageSize);
            var response = CreateSuccessResponse(HttpStatusCode.OK, page);
            response.Headers.CacheControl = new CacheControlHeaderValue { NoStore = true };
            return response;
        }

        [HttpPost]
        public HttpResponseMessage ResolveReferences([FromBody] ResolveBillReferenceRequest request)
        {
            if (!ModelState.IsValid || request == null || request.BillReviewId == Guid.Empty ||
                request.ExpectedVersion <= 0 || string.IsNullOrWhiteSpace(request.LookupKey))
                return CreateErrorResponse(HttpStatusCode.BadRequest, BillWorkflowCodes.InvalidReferenceResolutionRequest,
                    BillWorkflowMessages.ReferenceResolutionRequestRequired);
            var result = service.ResolveReferences(request.BillReviewId, request.ExpectedVersion,
                request.LookupKey);
            var response = CreateSuccessResponse(HttpStatusCode.OK, result);
            response.Headers.CacheControl = new CacheControlHeaderValue { NoStore = true };
            return response;
        }

        [HttpPost]
        public HttpResponseMessage SubmitReferenceStep([FromBody] SubmitReferenceStepRequest request)
        {
            if (!ModelState.IsValid || request == null || request.BillReviewId == Guid.Empty ||
                request.ExpectedVersion <= 0 || string.IsNullOrWhiteSpace(request.LookupKey) || request.Id <= 0)
                return CreateErrorResponse(HttpStatusCode.BadRequest, BillWorkflowCodes.InvalidSubmitReferenceStepRequest,
                    BillWorkflowMessages.SubmitReferenceStepRequestRequired);
            var result = service.SubmitReferenceStep(request.BillReviewId, request.ExpectedVersion,
                new BillReferenceSelection { LookupKey = request.LookupKey, Id = request.Id, ResolutionMethod = request.ResolutionMethod });
            var response = CreateSuccessResponse(HttpStatusCode.OK, result);
            response.Headers.CacheControl = new CacheControlHeaderValue { NoStore = true };
            return response;
        }

        [HttpPost]
        public HttpResponseMessage ConfirmReferences([FromBody] ConfirmReferencesRequest request)
        {
            if (!ModelState.IsValid || request == null || request.BillReviewId == Guid.Empty ||
                request.ExpectedVersion <= 0)
                return CreateErrorResponse(HttpStatusCode.BadRequest, BillWorkflowCodes.InvalidReferenceConfirmationRequest,
                    BillWorkflowMessages.ConfirmationRequestRequired);
            var result = service.ConfirmReferences(request.BillReviewId, request.ExpectedVersion,
                request.RememberAlias ?? true);
            var response = CreateSuccessResponse(HttpStatusCode.OK, result);
            response.Headers.CacheControl = new CacheControlHeaderValue { NoStore = true };
            return response;
        }

        [HttpPost]
        public HttpResponseMessage SearchCustomers([FromBody] SearchBillCustomersRequest request)
        {
            if (!ModelState.IsValid || request == null || request.BillReviewId == Guid.Empty)
                return CreateErrorResponse(HttpStatusCode.BadRequest, BillWorkflowCodes.InvalidReferenceSearch,
                    BillWorkflowMessages.InvalidReferenceSearch);
            var customers = service.SearchCustomers(request.BillReviewId, request.SearchText,
                request.Page, request.PageSize);
            return CreateSuccessResponse(HttpStatusCode.OK, customers);
        }

        [HttpPost]
        public HttpResponseMessage SearchPorts([FromBody] SearchBillPortsRequest request)
        {
            if (!ModelState.IsValid || request == null || request.BillReviewId == Guid.Empty)
                return CreateErrorResponse(HttpStatusCode.BadRequest, BillWorkflowCodes.InvalidReferenceSearch,
                    BillWorkflowMessages.InvalidReferenceSearch);
            var ports = service.SearchPorts(request.BillReviewId, request.SearchText, request.Page, request.PageSize);
            return CreateSuccessResponse(HttpStatusCode.OK, ports);
        }

        private HttpResponseMessage CreateSuccessResponse<T>(HttpStatusCode status, T data)
        {
            return Request.CreateResponse(status, new ApiResponse<T> { Data = data });
        }

        private HttpResponseMessage CreateErrorResponse(HttpStatusCode status, string code, string message)
        {
            return Request.CreateResponse(status, new ApiResponse<object>
            {
                Error = new ApiError
                {
                    Code = code,
                    Message = message
                }
            });
        }
    }

    public class CreateDocumentReviewRequest
    {
        public Guid AIDocumentExtractionID { get; set; }
    }

    public class GetBillReviewsRequest
    {
        public GetBillReviewsRequest()
        {
            Page = 1;
            PageSize = 1;
        }

        public Guid DocumentReviewId { get; set; }
        public int Page { get; set; }
        public int PageSize { get; set; }
    }

    public class ConfirmReferencesRequest
    {
        public Guid BillReviewId { get; set; }
        public int ExpectedVersion { get; set; }
        // Aliases are learned only at final confirmation, never while saving progress.
        public bool? RememberAlias { get; set; }
    }

    public class SubmitReferenceStepRequest
    {
        public SubmitReferenceStepRequest()
        {
            ResolutionMethod = ResolutionMethod.ManualSelection;
        }

        public Guid BillReviewId { get; set; }
        public int ExpectedVersion { get; set; }
        public string LookupKey { get; set; }
        public int Id { get; set; }
        public ResolutionMethod ResolutionMethod { get; set; }
    }

    public class ResolveBillReferenceRequest
    {
        public Guid BillReviewId { get; set; }
        public int ExpectedVersion { get; set; }
        public string LookupKey { get; set; }
    }

    public class SearchBillCustomersRequest
    {
        public SearchBillCustomersRequest()
        {
            Page = 1;
            PageSize = 20;
        }

        public Guid BillReviewId { get; set; }
        public string SearchText { get; set; }
        public int Page { get; set; }
        public int PageSize { get; set; }
    }

    public class SearchBillPortsRequest
    {
        public SearchBillPortsRequest()
        {
            Page = 1;
            PageSize = 20;
        }

        public Guid BillReviewId { get; set; }
        public string SearchText { get; set; }
        public int Page { get; set; }
        public int PageSize { get; set; }
    }

}

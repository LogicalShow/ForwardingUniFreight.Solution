using System.Collections.Generic;
using BillWorkflow.Common.Contracts;

namespace Forwarding.MvcApp.Controllers.Operations.API_Operations.BillWorkflow
{
    public class ApiResponse<T>
    {
        public bool IsSuccessful
        {
            get { return Error == null; }
        }

        public T Data { get; set; }
        public ApiError Error { get; set; }
    }

    public class ApiError
    {
        public ApiError()
        {
            ValidationErrors = new List<ValidationIssue>();
        }

        public string Code { get; set; }
        public string Message { get; set; }
        public List<ValidationIssue> ValidationErrors { get; set; }
    }
}

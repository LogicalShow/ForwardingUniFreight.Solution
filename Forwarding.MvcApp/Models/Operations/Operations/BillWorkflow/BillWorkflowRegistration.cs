using System.Configuration;
using System.Web.Http;
using BillWorkflow.Common.Extraction;
using BillWorkflow.Common.Services;
using Forwarding.MvcApp.Models.Operations.Operations.BillWorkflow.Integration;

namespace Forwarding.MvcApp.Models.Operations.Operations.BillWorkflow
{
    public static class BillWorkflowRegistration
    {
        public static void RegisterRoutes(HttpConfiguration configuration)
        {
            configuration.Routes.MapHttpRoute(
                name: "BillWorkflow_ConfirmReferences",
                routeTemplate: "api/DocumentReview/ConfirmReferences",
                defaults: new { controller = "DocumentReview", action = "ConfirmReferences" });
            configuration.Routes.MapHttpRoute(
                name: "BillWorkflow_ResolveReferences",
                routeTemplate: "api/DocumentReview/ResolveReferences",
                defaults: new { controller = "DocumentReview", action = "ResolveReferences" });
            configuration.Routes.MapHttpRoute(
                name: "BillWorkflow_CreateDocumentReview",
                routeTemplate: "api/DocumentReview/CreateDocumentReview",
                defaults: new { controller = "DocumentReview", action = "CreateDocumentReview" });
            configuration.Routes.MapHttpRoute(
                name: "BillWorkflow_GetBillReview",
                routeTemplate: "api/DocumentReview/GetBillReview/{billReviewId}",
                defaults: new { controller = "DocumentReview", action = "GetBillReview" });
            configuration.Routes.MapHttpRoute(
                name: "BillWorkflow_SearchCustomers",
                routeTemplate: "api/DocumentReview/SearchCustomers",
                defaults: new { controller = "DocumentReview", action = "SearchCustomers" });
            configuration.Routes.MapHttpRoute(
                name: "BillWorkflow_GetBillReviews",
                routeTemplate: "api/DocumentReview/GetBillReviews",
                defaults: new { controller = "DocumentReview", action = "GetBillReviews" });
            // Keep unknown/removed feature actions out of the host's generic controller route.
            configuration.Routes.MapHttpRoute(
                name: "BillWorkflow_UnknownAction",
                routeTemplate: "api/DocumentReview/{action}/{id}",
                defaults: new { controller = "DocumentReview", action = "NotFound", id = RouteParameter.Optional });
        }

        public static DocumentReviewService CreateService(int userId)
        {
            var connectionString = ConfigurationManager.ConnectionStrings["ConnectionString"].ConnectionString;
            var customers = new CustomerDirectory(connectionString);
            return new DocumentReviewService(
                userId,
                new BillOfLadingJsonAdapter(),
                new BillContextProvider(connectionString),
                new BillLookupPolicy(),
                new BillWorkflowStore(connectionString),
                new CustomerResolver(customers),
                customers);
        }
    }
}

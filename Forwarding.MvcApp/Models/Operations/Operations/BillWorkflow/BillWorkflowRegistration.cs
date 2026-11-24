using System;
using System.Collections.Generic;
using System.Configuration;
using Forwarding.MvcApp.DocAi;
using System.Web.Http;
using BillWorkflow.Common.Extraction;
using BillWorkflow.Common.Services;
using BillWorkflow.Common.Abstractions;
using Forwarding.MvcApp.Models.Operations.Operations.BillWorkflow.Integration;

namespace Forwarding.MvcApp.Models.Operations.Operations.BillWorkflow
{
    public static class BillWorkflowRegistration
    {
        public static void RegisterRoutes(HttpConfiguration configuration)
        {
            configuration.Routes.MapHttpRoute(
                name: "BillWorkflow_CompleteBill",
                routeTemplate: "api/DocumentReview/CompleteBill",
                defaults: new { controller = "DocumentReview", action = "CompleteBill" });
            configuration.Routes.MapHttpRoute(
                name: "BillWorkflow_SubmitReferenceStep",
                routeTemplate: "api/DocumentReview/SubmitReferenceStep",
                defaults: new { controller = "DocumentReview", action = "SubmitReferenceStep" });
            configuration.Routes.MapHttpRoute(
                name: "BillWorkflow_ConfirmReferences",
                routeTemplate: "api/DocumentReview/ConfirmReferences",
                defaults: new { controller = "DocumentReview", action = "ConfirmReferences" });
            configuration.Routes.MapHttpRoute(
                name: "BillWorkflow_ResolveReferences",
                routeTemplate: "api/DocumentReview/ResolveReferences",
                defaults: new { controller = "DocumentReview", action = "ResolveReferences" });
            configuration.Routes.MapHttpRoute(
                name: "BillWorkflow_GetDocumentReview",
                routeTemplate: "api/DocumentReview/GetDocumentReview",
                defaults: new { controller = "DocumentReview", action = "GetDocumentReview" });
            configuration.Routes.MapHttpRoute(
                name: "BillWorkflow_GetBillReview",
                routeTemplate: "api/DocumentReview/GetBillReview/{billReviewId}",
                defaults: new { controller = "DocumentReview", action = "GetBillReview" });
            configuration.Routes.MapHttpRoute(
                name: "BillWorkflow_SearchCustomers",
                routeTemplate: "api/DocumentReview/SearchCustomers",
                defaults: new { controller = "DocumentReview", action = "SearchCustomers" });
            configuration.Routes.MapHttpRoute(
                name: "BillWorkflow_SearchPorts",
                routeTemplate: "api/DocumentReview/SearchPorts",
                defaults: new { controller = "DocumentReview", action = "SearchPorts" });
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
            var ports = new PortDirectory(connectionString);
            return new DocumentReviewService(
                userId,
                DocAiResult.BlType,
                DocAiResult.ManifestType,
                new BillContextProvider(connectionString),
                new BillLookupPolicy(),
                new BillWorkflowStore(connectionString, DocAiSettings.IsDemo, new BillOfLadingJsonAdapter()),
                customers,
                ports,
                new IReferenceHandler[]
                {
                    new CustomerReferenceHandler(new CustomerResolver(customers), customers),
                    new PortReferenceHandler(new PortResolver(ports), ports)
                });
        }

        public static BillWriteService CreateBillWriteService(int userId)
        {
            var connectionString = ConfigurationManager.ConnectionStrings["ConnectionString"].ConnectionString;
            return new BillWriteService(userId, CreateService(userId), CreateBillWritePreparationService(userId),
                new BillWriteStore(connectionString, DocAiSettings.IsDemo, CreateTemporaryContainerTypes(connectionString)));
        }

        public static BillWritePreparationService CreateBillWritePreparationService(int userId)
        {
            var connectionString = ConfigurationManager.ConnectionStrings["ConnectionString"].ConnectionString;
            return new BillWritePreparationService(userId, CreateService(userId),
                new BillContextProvider(connectionString), new PortDirectory(connectionString),
                CreateTemporaryContainerTypes(connectionString));
        }

        private static TemporaryContainerTypeProvider CreateTemporaryContainerTypes(string connectionString)
        {
            var containerTypeIds = new Dictionary<string, int>(StringComparer.OrdinalIgnoreCase)
            {
                { "40HC", 9 },
                { "40'HC", 9 }
            };

            return new TemporaryContainerTypeProvider(connectionString, containerTypeIds);
        }
    }
}

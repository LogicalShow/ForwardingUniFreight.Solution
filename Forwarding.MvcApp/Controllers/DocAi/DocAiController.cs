using System;
using System.Collections;
using System.Collections.Generic;
using System.Globalization;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Web;
using System.Web.Http;
using Forwarding.MvcApp.DocAi;
using WebMatrix.WebData;

namespace Forwarding.MvcApp.Controllers.DocAi
{
    // Serves the operation Houses tab AI extraction dialog without changing any house.
    // Routes: api/DocAi/Latest, api/DocAi/Read, api/DocAi/Status, api/DocAi/Usage and api/DocAi/UsageState.
    [Authorize]
    public class DocAiController : ApiController
    {
        private const string EntityName = "Operation";
        private const string DocumentType = "AUTO";

        [HttpGet]
        public HttpResponseMessage Usage(int months = 6)
        {
            if (!DocAiSettings.Enabled)
            {
                return NotFoundReply();
            }

            if (months < 1 || months > 24)
            {
                return Problem("BAD_MONTHS", "Months must be between 1 and 24.");
            }

            var usage = DocAiClient.GetUsage(months);
            if (usage == null)
            {
                return Reply(HttpStatusCode.OK, new { available = false });
            }

            usage["available"] = true;
            usage["support"] = DocAiSettings.SupportContact;
            try
            {
                usage["recentDocuments"] = AiDocumentsStore.Recent(DocAiSettings.IsDemo);
            }
            catch (SqlException)
            {
                usage["recentDocuments"] = null;
            }

            return Reply(HttpStatusCode.OK, usage);
        }

        [HttpGet]
        public HttpResponseMessage UsageState()
        {
            if (!DocAiSettings.Enabled)
            {
                return NotFoundReply();
            }

            return Reply(HttpStatusCode.OK, ProjectUsageState(DocAiClient.GetUsage(cached: true)));
        }

        internal static object ProjectUsageState(Dictionary<string, object> usage)
        {
            Func<string, object> value = key => usage == null ? null : usage[key];
            return new
            {
                available = usage != null,
                status = value("status"),
                remaining = value("remaining"),
                warningAtPages = value("warningAtPages"),
                quotaMode = value("quotaMode")
            };
        }

        // The operation's newest B/L document, so the dialog reopens on it; a run still in progress is refreshed.
        [HttpGet]
        public HttpResponseMessage Latest(long pOperationID)
        {
            if (!DocAiSettings.Enabled)
            {
                return NotFoundReply();
            }

            DocAiClient.MaintainIfDue();
            AiDocumentView doc = FindDocument(pOperationID, null);
            return Reply(HttpStatusCode.OK, Describe(RefreshIfRunning(doc, pOperationID)));
        }

        // Records the selected file and sends it immediately. The same file read again on the same
        // operation answers with its existing document — nothing is sent or billed twice.
        [HttpPost]
        public HttpResponseMessage Read()
        {
            if (!DocAiSettings.Enabled)
            {
                return NotFoundReply();
            }

            DocAiClient.MaintainIfDue();
            HttpRequest request = HttpContext.Current.Request;
            long operationId;
            bool validOperation = long.TryParse(
                request.Form["pOperationID"],
                NumberStyles.Integer,
                CultureInfo.InvariantCulture,
                out operationId);
            if (!validOperation || operationId <= 0)
            {
                return Problem("BAD_OPERATION", "Save the operation first.");
            }

            HttpPostedFile posted = request.Files["file"];
            if (posted == null || posted.ContentLength == 0)
            {
                return Problem("FILE_EMPTY", "Choose a file first.");
            }

            if (posted.ContentLength > DocAiClient.MaxFileBytes)
            {
                return Problem("FILE_TOO_LARGE", "The file is over 20 MB.");
            }

            byte[] bytes;
            using (var reader = new BinaryReader(posted.InputStream))
            {
                bytes = reader.ReadBytes(posted.ContentLength);
            }

            Guid intentId;
            if (!Guid.TryParse(request.Form["clientRequestId"], out intentId) || intentId == Guid.Empty)
            {
                return Problem("BAD_REQUEST_ID", "Choose the file again, then click Read.");
            }

            return SubmitDocument(bytes, posted, operationId, intentId);
        }

        private static HttpResponseMessage SubmitDocument(
            byte[] bytes,
            HttpPostedFile posted,
            long operationId,
            Guid intentId)
        {
            Guid localId;
            try
            {
                localId = DocAiClient.Submit(
                    HttpContext.Current.User,
                    bytes,
                    Path.GetFileName(posted.FileName),
                    DocumentType,
                    null,
                    EntityName,
                    operationId,
                    WebSecurity.CurrentUserId,
                    clientRequestId: intentId);
                DocAiClient.SendPending(localId); // a Pending row: send it now
                AiDocumentView doc = FindDocument(operationId, localId);
                return Reply(HttpStatusCode.OK, Describe(RefreshIfRunning(doc, operationId, localId)));
            }
            catch (SqlException exception) when (exception.Number == 50003)
            {
                return Reply(
                    HttpStatusCode.ServiceUnavailable,
                    new
                    {
                        code = "IDENTITY_BUSY",
                        message = "Document is busy. Retry Read with the same file selection."
                    });
            }
            catch (DocAiInputException exception)
            {
                return Problem(exception.Code, exception.Message);
            }
        }

        // Polled by the dialog every few seconds while a document is being read. It never sends: only Read and the
        // recurring job send, so polling can't use up a document's tries.
        [HttpGet]
        public HttpResponseMessage Status(long pOperationID, Guid pLocalId)
        {
            if (!DocAiSettings.Enabled)
            {
                return NotFoundReply();
            }

            DocAiClient.MaintainIfDue();
            AiDocumentView doc = FindDocument(pOperationID, pLocalId);
            if (doc == null)
            {
                return NotFoundReply();
            }

            return Reply(HttpStatusCode.OK, Describe(RefreshIfRunning(doc, pOperationID, pLocalId)));
        }

        private static AiDocumentView FindDocument(long operationId, Guid? requestedId)
        {
            return AiDocumentsStore.Get(EntityName, operationId, DocumentType, requestedId, DocAiSettings.IsDemo, true);
        }

        private static AiDocumentView RefreshIfRunning(AiDocumentView doc, long operationId, Guid? requestedId = null)
        {
            if (doc == null)
            {
                return null;
            }

            if (doc.Status == "Submitted" && DocAiSettings.RemotePolling)
            {
                DocAiClient.Refresh(doc.LocalId);
                // Latest retains its null request context, including after a refresh.
                doc = FindDocument(operationId, requestedId);
            }

            // Keep polling an alias in its submission context, rather than recovering the owner's notice.
            if (doc != null && requestedId.HasValue)
            {
                doc.LocalId = requestedId.Value;
            }

            return doc;
        }

        // What the dialog shows: state reading | done | failed, the message, and the extracted row (one B/L per file).
        private static object Describe(AiDocumentView document)
        {
            if (document == null)
            {
                return new
                {
                    exists = false,
                    demo = DocAiSettings.IsDemo,
                    remotePolling = DocAiSettings.RemotePolling
                };
            }

            string message;
            string state = DescribeState(document, out message);
            var display = new DocumentDisplay
            {
                State = state,
                Message = message,
                ResolvedType = document.ResolvedDocumentTypeCode,
                ResultType = document.ResultType
            };
            DescribeDetails(document, display);
            return new
            {
                exists = true,
                demo = DocAiSettings.IsDemo,
                remotePolling = DocAiSettings.RemotePolling,
                localId = document.LocalId,
                fileName = document.OriginalFileName,
                state = display.State,
                errorCode = document.ErrorCode,
                quota = QuotaDetails(document),
                errorMessage = display.Message,
                completedAt = FormatCompletedAt(document.CompletedAt),
                runReason = document.RunReason,
                changes = string.IsNullOrEmpty(document.ChangesJson) ? null : Json.ReadObject(document.ChangesJson),
                resultType = display.ResultType,
                documentType = display.ResolvedType,
                details = display.Details,
                rows = display.State == "done" && display.ResultType == DocAiResult.BlType
                    ? DocAiBillView.Rows(display.Details)
                    : new object[0]
            };
        }

        private static string DescribeState(AiDocumentView document, out string message)
        {
            string state;
            message = null;
            switch (document.Status)
            {
                case "Completed":
                    state = "done";
                    break;
                case "Failed":
                    state = "failed";
                    message = document.ErrorMessage;
                    break;
                case "Submitted":
                    state = "reading";
                    break;
                default: // Pending
                    if (document.ErrorCode != null)
                    {
                        state = "failed"; // a send that will be tried again
                        message = PendingMessage(document);
                    }
                    else if (document.CreatedAt < DateTime.Now.AddMinutes(-2))
                    {
                        state = "failed";
                        message = "The document has not been sent yet. Try Read again later.";
                    }
                    else
                    {
                        state = "reading";
                    }

                    break;
            }

            return state;
        }

        private static void DescribeDetails(AiDocumentView document, DocumentDisplay display)
        {
            if (display.State != "done")
            {
                return;
            }

            if (string.IsNullOrEmpty(document.ResultJson))
            {
                display.State = "failed";
                display.Message = "The stored result is no longer available.";
                return;
            }

            try
            {
                var envelope = Json.ReadObject(document.ResultJson);
                DocAiResult.Validate(envelope, "Completed", out display.ResolvedType, out display.ResultType);
                DescribeBills(document, envelope, display);
            }
            catch (ArgumentException)
            {
                display.State = "failed";
                display.Message = "The stored extraction result could not be read.";
            }
        }

        private static void DescribeBills(
            AiDocumentView document,
            Dictionary<string, object> envelope,
            DocumentDisplay display)
        {
            if (document.BillsStatus != "Ready")
            {
                display.State = "failed";
                display.Message = "The extracted bills are not available yet. Try again shortly.";
                return;
            }

            if (!document.BillsExpectedCount.HasValue
                || document.Bills == null
                || document.Bills.Length != document.BillsExpectedCount.Value)
            {
                display.State = "failed";
                display.Message = "The stored extracted bills are incomplete.";
                return;
            }

            var result = Json.Obj(envelope, "result");
            var documentFields = new Dictionary<string, object>();
            string[] documentKeys = { "header", "unassignedContainers", "flags" };
            foreach (string key in documentKeys)
            {
                if (result.ContainsKey(key))
                {
                    documentFields[key] = result[key];
                }
            }

            display.Details = DocAiBillView.Project(
                DocAiResult.Project(documentFields, display.ResultType),
                document.Bills,
                display.ResultType);
        }

        private static string FormatCompletedAt(DateTime? completedAt)
        {
            return completedAt.HasValue
                ? completedAt.Value.ToString("dd/MM/yyyy HH:mm", CultureInfo.InvariantCulture)
                : null;
        }

        private static string PendingMessage(AiDocumentView document)
        {
            if (!document.NextSubmitAt.HasValue)
            {
                return document.ErrorMessage;
            }

            string time = document.NextSubmitAt.Value.ToString("HH:mm", CultureInfo.InvariantCulture);
            return "DocAi asked to wait until " + time + ".";
        }

        private static object QuotaDetails(AiDocumentView document)
        {
            if (document.ErrorCode != "QUOTA_EXHAUSTED" || string.IsNullOrEmpty(document.ErrorMessage))
            {
                return null;
            }

            try
            {
                return Json.ReadObject(document.ErrorMessage);
            }
            catch (ArgumentException)
            {
                return null;
            }
        }

        // Kept as the comparison oracle for the bill display tests; production reads persisted bills.
        private static object[] Rows(string resultJson)
        {
            if (string.IsNullOrEmpty(resultJson))
            {
                return new object[0];
            }

            Dictionary<string, object> body = Json.ReadObject(resultJson);
            Dictionary<string, object> result = Json.Obj(body, "result");
            Dictionary<string, object> fields = Json.Obj(result, "fields");
            if (fields == null)
            {
                return new object[0];
            }

            var flagged = new HashSet<string>();
            object flags;
            if (result.TryGetValue("flags", out flags) && flags is IEnumerable)
            {
                foreach (object flag in (IEnumerable)flags)
                {
                    string field = Json.Str(flag as Dictionary<string, object>, "field");
                    if (field != null)
                    {
                        flagged.Add(field);
                    }
                }
            }

            Func<string, string> value = name => Json.Str(Json.Obj(fields, name), "value");
            return new object[]
            {
                new
                {
                    hbl = value("billOfLadingNumber"),
                    shipper = value("shipperName"),
                    consignee = value("consigneeName"),
                    pol = value("portOfLoading"),
                    pod = value("portOfDischarge"),
                    lowConfidence = new[]
                    {
                        "billOfLadingNumber",
                        "shipperName",
                        "consigneeName",
                        "portOfLoading",
                        "portOfDischarge"
                    }.Where(flagged.Contains).ToArray()
                }
            };
        }

        private static HttpResponseMessage NotFoundReply()
        {
            return Reply(HttpStatusCode.NotFound, new { code = "NOT_FOUND" });
        }

        private static HttpResponseMessage Problem(string code, string message)
        {
            return Reply(HttpStatusCode.BadRequest, new
            {
                code,
                message
            });
        }

        // The pilot uses System.Web.Http 4.0 (Web API 1), which has no IHttpActionResult; write JSON here.
        private static HttpResponseMessage Reply(HttpStatusCode status, object body)
        {
            var response = new HttpResponseMessage(status);
            response.Content = new StringContent(Json.Write(body), Encoding.UTF8, "application/json");
            response.Headers.CacheControl = new CacheControlHeaderValue { NoStore = true };
            return response;
        }

        // What the dialog shows for one document while Describe works it out.
        private sealed class DocumentDisplay
        {
            internal string State;
            internal string Message;
            internal string ResolvedType;
            internal string ResultType;
            internal DocAiResult Details;
        }
    }
}

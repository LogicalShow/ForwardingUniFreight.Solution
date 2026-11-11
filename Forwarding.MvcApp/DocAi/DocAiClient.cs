using System;
using System.Collections;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Diagnostics;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Cryptography;
using System.Security.Principal;
using System.Text.RegularExpressions;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Hosting;
using System.Web.Script.Serialization;

namespace Forwarding.MvcApp.DocAi
{
    // Records documents, sends them to the DocAi service and stores their outcomes.
    // Every entry point does nothing while DocAi:Enabled is false.
    public static class DocAiClient
    {
        private const string ProductCode = "FWD";
        public const int MaxFileBytes = 20 * 1024 * 1024;

        // Created on first use, after the settings are validated: nothing runs while the kit is switched off.
        private static readonly Lazy<HttpClient> Http = new Lazy<HttpClient>(CreateClient);
        // 401/403 from DocAi: stop sending for 5 minutes. Ticks + Interlocked: safe in a 32-bit application pool.
        private static long _pausedUntilTicks;
        // Starts at "now": without a scheduler, the first fallback run comes an hour after start, never in the
        // first request of the day.
        private static long _lastMaintenanceTicks = DateTime.UtcNow.Ticks;
        private static int _maintenanceQueued;
        private static int _tenantChecked; // 0 not yet, 1 matches, -1 mismatch: the kit stays off
        private static readonly object UsageLock = new object();
        private static Dictionary<string, object> _usage;
        private static DateTime _usageExpires;
        private static bool _usageCached;
        private static long _usageGeneration;

        private static readonly string[] UsageStatuses = { "Unlimited", "Ok", "Low", "Exhausted" };
        private static readonly string[] RequiredUsageKeys =
        {
            "asOfUtc", "unit", "quotaMode", "status", "granted", "used", "reserved", "remaining",
            "warningPercent", "cycleBase", "warningAtPages", "lastTopUp", "maxPagesPerJob", "dailyCap",
            "submittedTodayPages", "chargedTodayPages", "dayBoundary", "months"
        };

        private static readonly string[] UsageTotalKeys =
        {
            "granted", "used", "reserved", "remaining", "warningPercent", "maxPagesPerJob",
            "dailyCap", "submittedTodayPages", "chargedTodayPages"
        };

        private static readonly string[] OptionalUsageTotalKeys = { "cycleBase", "warningAtPages" };
        private static readonly string[] MonthlyUsageKeys = { "chargedPages", "chargedDocuments" };

        // Called from an action that requires a signed-in user. Records the document and returns its LocalId; it does
        // not send. Guid.Empty when the kit is switched off. A file that isn't a PDF, JPEG, PNG or TIFF, or is over
        // 20 MB, throws DocAiInputException (the screen shows its message).
        public static Guid Submit(
            IPrincipal user,
            byte[] file,
            string fileName,
            string documentType,
            string shippingLine,
            string entityName,
            long? entityId,
            int? userId,
            bool reprocess = false,
            Guid? clientRequestId = null)
        {
            if (user == null || user.Identity == null || !user.Identity.IsAuthenticated)
            {
                throw new UnauthorizedAccessException("DocAi: Submit needs a signed-in user.");
            }

            if (!DocAiSettings.Enabled)
            {
                return Guid.Empty;
            }

            string extension = ValidatedFileKind(file);
            if (string.IsNullOrWhiteSpace(shippingLine))
            {
                shippingLine = null; // empty: the service detects it
            }

            if (documentType == "AUTO" && (extension != "pdf" || shippingLine != null))
            {
                throw new DocAiInputException(
                    "AUTO_PDF_REQUIRED",
                    "Automatic detection needs a PDF with no shipping line.");
            }

            byte[] hash;
            using (var sha = SHA256.Create())
            {
                hash = sha.ComputeHash(file);
            }

            if (IntentExists(clientRequestId, entityId, entityName, documentType))
            {
                return clientRequestId.Value;
            }

            if (!reprocess && DocAiSettings.IsDemo)
            {
                Guid? existing = AiDocumentsStore.FindSame(
                    hash,
                    documentType,
                    shippingLine,
                    entityName,
                    entityId,
                    DocAiSettings.IsDemo);
                if (existing.HasValue)
                {
                    return existing.Value;
                }
            }

            Guid localId = clientRequestId ?? Guid.NewGuid();
            string stored = SaveCopy(localId, file, extension); // App_Data\DocAi\{yyyy}\{localId}.{ext}
            // A failed insert leaves an orphan for cleanup. Never delete another concurrent retry's copy.
            // Records the intent and deduplicates in-flight work atomically.
            AiDocumentsStore.Insert(
                localId,
                documentType,
                shippingLine,
                reprocess,
                entityName,
                entityId,
                stored,
                fileName,
                hash,
                userId,
                DocAiSettings.IsDemo);
            if (DocAiSettings.IsDemo)
            {
                DocAiDemo.Remember(localId, fileName);
            }

            return localId;
        }

        // Claims and sends one Pending row. A second caller (a repeated Read, the recurring job) finds the row
        // claimed and does nothing; a row waiting for its Retry-After is not claimed either.
        public static void SendPending(Guid localId)
        {
            if (!DocAiSettings.Enabled || Paused)
            {
                return;
            }

            localId = AiDocumentsStore.ResolveLocalId(localId, DocAiSettings.IsDemo);
            ClaimedRow row = AiDocumentsStore.Claim(localId, DocAiSettings.IsDemo);
            if (row == null)
            {
                return;
            }

            if (row.Status != "Pending")
            {
                AiDocumentsStore.Release(row);
                return;
            }

            Run(() => SendAsync(row));
        }

        // For a screen that shows the document: asks DocAi for the outcome of a Submitted row. It never sends — only
        // SendPending (the user's Read) and the recurring job do — so a screen that polls can't use up a row's tries.
        public static void Refresh(Guid localId)
        {
            if (!DocAiSettings.Enabled || !DocAiSettings.RemotePolling)
            {
                return;
            }

            ClaimedRow row = AiDocumentsStore.Claim(localId, DocAiSettings.IsDemo);
            if (row != null)
            {
                if (row.Status == "Submitted")
                {
                    Run(() => RefreshAsync(row));
                }
                else
                {
                    AiDocumentsStore.Release(row);
                }
            }
        }

        // Only the toolbar may reuse the snapshot. Fresh modal reads replace it.
        public static Dictionary<string, object> GetUsage(int months = 6, bool cached = false)
        {
            if (months < 1 || months > 24)
            {
                throw new ArgumentOutOfRangeException("months");
            }

            long generation;
            lock (UsageLock)
            {
                if (cached && _usageCached && DateTime.UtcNow < _usageExpires)
                {
                    return _usage == null ? null : new Dictionary<string, object>(_usage);
                }

                generation = _usageGeneration;
            }

            Dictionary<string, object> usage = null;
            try
            {
                if (DocAiSettings.Enabled)
                {
                    usage = DocAiSettings.IsDemo ? DemoUsage() : FetchUsage(months).GetAwaiter().GetResult();
                }
            }
            catch (Exception)
            {
                Trace.TraceWarning("DocAi usage unavailable.");
            }

            lock (UsageLock)
            {
                // A quota failure during this GET must not restore a stale Ok snapshot.
                if (generation == _usageGeneration)
                {
                    _usage = usage;
                    _usageCached = true;
                    _usageExpires = DateTime.UtcNow.AddSeconds(60);
                }
            }

            return usage == null ? null : new Dictionary<string, object>(usage);
        }

        // The dialog's fallback queues the work when no scheduler is running; only one request wins the hourly check.
        public static void MaintainIfDue()
        {
            try
            {
                if (!DocAiSettings.Enabled)
                {
                    return;
                }

                long last = Interlocked.Read(ref _lastMaintenanceTicks);
                long now = DateTime.UtcNow.Ticks;
                if (now - last <= TimeSpan.TicksPerHour)
                {
                    return;
                }

                if (Interlocked.CompareExchange(ref _lastMaintenanceTicks, now, last) != last)
                {
                    return;
                }

                if (Interlocked.CompareExchange(ref _maintenanceQueued, 1, 0) != 0)
                {
                    return;
                }

                try
                {
                    HostingEnvironment.QueueBackgroundWorkItem(MaintainInBackground);
                }
                catch (Exception exception)
                {
                    Interlocked.Exchange(ref _maintenanceQueued, 0);
                    Trace.TraceError("DocAi maintenance could not be queued: {0}", exception.GetType().Name);
                }
            }
            catch (Exception exception)
            {
                Trace.TraceError("DocAi maintenance failed: {0}", exception.GetType().Name);
            }
        }

        // The recurring job (Hangfire in the pilot). Rows are claimed ONE AT A TIME, right before each is handled,
        // so a claim never expires while it waits behind other rows. Sending stops as soon as a 401/403 pauses it,
        // even in the middle of the loop; cleanup still runs.
        public static void RunMaintenance()
        {
            if (!DocAiSettings.Enabled)
            {
                return;
            }

            Interlocked.Exchange(ref _lastMaintenanceTicks, DateTime.UtcNow.Ticks);
            for (int i = 0; i < 50 && !Paused; i++)
            {
                ClaimedRow row = AiDocumentsStore.ClaimNextDue(DocAiSettings.IsDemo);
                if (row == null)
                {
                    break;
                }

                try
                {
                    if (row.Status == "Pending")
                    {
                        Run(() => SendAsync(row));
                    }
                    else
                    {
                        Run(() => RefreshAsync(row));
                    }
                }
                catch (Exception exception) // one bad row never stops the rest
                {
                    Trace.TraceError("DocAi maintenance: row {0} failed: {1}", row.LocalId, exception.GetType().Name);
                }
            }

            // Deletion is disabled until a retention decision; reviewed bills must never be deleted.
            try
            {
                AiDocumentsStore.ProjectMissingBills();
            }
            catch (Exception exception)
            {
                Trace.TraceWarning("DocAi.BillsMaintenanceFailed: {0}", exception.GetType().Name);
            }
        }

        private static bool Paused => DateTime.UtcNow.Ticks < Interlocked.Read(ref _pausedUntilTicks);

        private static bool IntentExists(Guid? clientRequestId, long? entityId, string entityName, string documentType)
        {
            if (!clientRequestId.HasValue || !entityId.HasValue)
            {
                return false;
            }

            var document = AiDocumentsStore.Get(
                entityName,
                entityId.Value,
                documentType,
                clientRequestId,
                DocAiSettings.IsDemo);
            return document != null;
        }

        private static HttpClient CreateClient()
        {
            // An app in ASP.NET 4.0 compatibility (no httpRuntime targetFramework, as in the pilot) defaults to
            // SSL 3 / TLS 1.0: add TLS 1.2. Leave SystemDefault alone: OR-ing into it pins the process to TLS 1.2.
            if (ServicePointManager.SecurityProtocol != SecurityProtocolType.SystemDefault)
            {
                ServicePointManager.SecurityProtocol |= SecurityProtocolType.Tls12;
            }

            Uri baseUri;
            if (!Uri.TryCreate(DocAiSettings.BaseUrl, UriKind.Absolute, out baseUri)
                || baseUri.Scheme != Uri.UriSchemeHttps
                || !string.IsNullOrEmpty(baseUri.UserInfo)
                || !string.IsNullOrEmpty(baseUri.Query)
                || !string.IsNullOrEmpty(baseUri.Fragment))
            {
                throw new ConfigurationErrorsException(
                    "DocAi:BaseUrl must be an absolute https URL without user information, query or fragment.");
            }

            ServicePointManager.FindServicePoint(baseUri).ConnectionLeaseTimeout = 5 * 60 * 1000; // DNS changes
            var handler = new HttpClientHandler { AllowAutoRedirect = false };
            // Each call supplies its own cancellation budget.
            var http = new HttpClient(handler)
            {
                BaseAddress = baseUri,
                Timeout = Timeout.InfiniteTimeSpan
            };
            http.DefaultRequestHeaders.Add("X-Api-Key", DocAiSettings.ApiKey);
            return http;
        }

        private static async Task SendAsync(ClaimedRow row)
        {
            // Every send path checks the pause and immediately releases a row claimed during that pause.
            if (Paused || (!DocAiSettings.IsDemo && !TenantMatches()))
            {
                AiDocumentsStore.Release(row);
                return;
            }

            byte[] file;
            try
            {
                file = File.ReadAllBytes(CopyPath(row.StoredFileName)); // its own try: only file errors land here
            }
            catch (Exception exception) when (exception is FileNotFoundException
                || exception is DirectoryNotFoundException)
            {
                AiDocumentsStore.MarkSendFailed(
                    row,
                    true,
                    true,
                    "LOCAL_COPY_MISSING",
                    "The uploaded copy is gone.",
                    null);
                Trace.TraceError("DocAi: the local copy is gone. localId={0}", row.LocalId);
                return;
            }
            catch (Exception exception) when (exception is IOException || exception is UnauthorizedAccessException)
            {
                // exists but can't be read (permissions, a locked or damaged file): retried, at most 10 tries
                AiDocumentsStore.MarkSendFailed(
                    row,
                    false,
                    true,
                    "LOCAL_COPY_UNREADABLE",
                    "The uploaded copy can't be read.",
                    null);
                Trace.TraceError(
                    "DocAi: the local copy can't be read. localId={0} error={1}",
                    row.LocalId,
                    exception.GetType().Name);
                return;
            }

            if (DocAiSettings.IsDemo)
            {
                DocAiDemo.Send(row);
                return;
            }

            try
            {
                using (var form = new MultipartFormDataContent())
                using (var request = V2Request(HttpMethod.Post, "api/v2/jobs", true))
                using (var budget = new CancellationTokenSource(DocAiSettings.TransferBudget)) // default 120 s
                {
                    request.Content = form;
                    AddSubmissionFields(form, row, file);
                    request.Headers.Add("X-Correlation-Id", row.LocalId.ToString("N"));

                    using (var response = await Http.Value.SendAsync(request, budget.Token).ConfigureAwait(false))
                    {
                        await ProcessSendResponse(row, response).ConfigureAwait(false);
                    }
                }
            }
            catch (ArgumentException)
            {
                AiDocumentsStore.MarkSendFailed(
                    row,
                    false,
                    true,
                    "INVALID_RESPONSE",
                    "DocAi returned an invalid response.",
                    null);
            }
            catch (Exception exception) when (exception is HttpRequestException
                || exception is OperationCanceledException)
            {
                AiDocumentsStore.MarkSendFailed(row, false, true, "NETWORK", "DocAi could not be reached.", null);
                Trace.TraceWarning("DocAi submit failed. localId={0} error={1}", row.LocalId, exception.GetType().Name);
            }
        }

        private static void AddSubmissionFields(MultipartFormDataContent form, ClaimedRow row, byte[] file)
        {
            // The service never uses the supplied name as a path.
            form.Add(new ByteArrayContent(file), "file", "document");
            form.Add(new StringContent(row.DocumentTypeCode), "documentType");
            if (!string.IsNullOrEmpty(row.ShippingLineCode))
            {
                form.Add(new StringContent(row.ShippingLineCode), "shippingLine");
            }

            if (row.Reprocess)
            {
                form.Add(new StringContent("true"), "reprocess");
            }

            form.Add(new StringContent(row.LocalId.ToString()), "clientRequestId");
        }

        private static async Task ProcessSendResponse(ClaimedRow row, HttpResponseMessage response)
        {
            int status = (int)response.StatusCode;
            TraceRedirect(status);

            string body = DecodeV2(await response.Content.ReadAsStringAsync().ConfigureAwait(false));
            if (status == 200 || status == 202)
            {
                Dictionary<string, object> reply = Json.ReadObject(body); // jobId, runNo, status of that run
                Guid jobId = Guid.Parse(Json.Str(reply, "jobId"));
                short runNo = short.Parse(Json.Str(reply, "runNo"), CultureInfo.InvariantCulture);
                short pages;
                AiDocumentsStore.MarkSubmitted(
                    row,
                    jobId,
                    runNo,
                    short.TryParse(Json.Str(reply, "pageCount"), out pages) ? pages : (short?)null,
                    Json.Str(reply, "rereadSkipped") == "QUOTA_EXHAUSTED" ? null : Json.Str(reply, "runReason"),
                    SubmissionChanges(reply));
                if (AiDocumentsStore.ResolveLocalId(row.LocalId, false) != row.LocalId)
                {
                    return;
                }

                string runStatus = Json.Str(reply, "status");
                if (runStatus == "Completed" || runStatus == "Failed")
                {
                    await RefreshAsync(row).ConfigureAwait(false); // a final answer: fetch it at once
                }

                return;
            }

            switch (ClassifyResponse(status, body))
            {
                case SendOutcome.QuotaExhausted:
                    AiDocumentsStore.MarkSendFailed(row, true, true, "QUOTA_EXHAUSTED", QuotaProblem(body), null);
                    break;
                case SendOutcome.Permanent: // the file or the call is wrong
                    AiDocumentsStore.MarkSendFailed(
                        row,
                        true,
                        true,
                        ProblemCode(body) ?? "HTTP_" + status,
                        ProblemText(body),
                        null);
                    break;
                case SendOutcome.Pause: // key or setup: never fail documents
                    PauseSending();
                    AiDocumentsStore.MarkSendFailed(row, false, false, "HTTP_" + status, ProblemText(body), null);
                    Trace.TraceError("DocAi submit paused: HTTP {0}. Check the API key.", status);
                    break;
                default: // 408, 429, 5xx, anything new
                    AiDocumentsStore.MarkSendFailed(
                        row,
                        false,
                        true,
                        "HTTP_" + status,
                        ProblemText(body),
                        RetryAfterSeconds(response));
                    break;
            }
        }

        internal static string SubmissionChanges(Dictionary<string, object> reply)
        {
            if (Json.Str(reply, "rereadSkipped") == "QUOTA_EXHAUSTED")
            {
                InvalidateUsage();
                return "{\"rereadSkipped\":\"QUOTA_EXHAUSTED\"}";
            }

            var changes = Json.Obj(reply, "changes");
            return changes == null ? null : Json.Write(changes);
        }

        internal static string QuotaProblem(string body)
        {
            var problem = Json.ReadObject(body);
            long required;
            long available;
            if (!long.TryParse(Json.Str(problem, "requiredPages"), out required)
                || required < 0
                || !long.TryParse(Json.Str(problem, "availablePages"), out available)
                || available < 0)
            {
                return "AI page balance is exhausted.";
            }

            return Json.Write(new
            {
                requiredPages = required,
                availablePages = available
            });
        }

        internal enum SendOutcome
        {
            Permanent,
            RetryLater,
            Pause,
            QuotaExhausted
        }

        internal static SendOutcome ClassifyResponse(int status, string body)
        {
            if (status == 402 && ProblemCode(body) == "QUOTA_EXHAUSTED")
            {
                InvalidateUsage();
                return SendOutcome.QuotaExhausted;
            }

            return Classify(status);
        }

        // A 429 or 408 is temporary; 401/403 indicate setup problems and must not fail documents permanently.
        internal static SendOutcome Classify(int status)
        {
            if (status >= 300 && status <= 399)
            {
                return SendOutcome.RetryLater; // redirects are failed tries
            }

            switch (status)
            {
                case 400:
                case 413:
                case 415:
                case 422:
                    return SendOutcome.Permanent;
                case 401:
                case 403:
                    return SendOutcome.Pause;
                default:
                    return SendOutcome.RetryLater;
            }
        }

        // The catalog's whole consumerCode must equal dbo.DocAiIdentity.ConsumerCode for this product.
        // Checked lazily; a network error or missing/invalid identity is retried on the next send. A mismatch
        // keeps the kit off until the application pool recycles, so a copied API key cannot bill another company.
        private static bool TenantMatches()
        {
            int state = Volatile.Read(ref _tenantChecked);
            if (state != 0)
            {
                return state > 0;
            }

            try
            {
                string body;
                using (var budget = new CancellationTokenSource(TimeSpan.FromSeconds(30)))
                using (var request = V2Request(HttpMethod.Get, "api/v2/catalog", false))
                using (var response = Http.Value.SendAsync(request, budget.Token).GetAwaiter().GetResult())
                {
                    int status = (int)response.StatusCode;
                    TraceRedirect(status);
                    if (status == 401 || status == 403)
                    {
                        PauseSending();
                        Trace.TraceError("DocAi submit paused: HTTP {0}. Check the API key.", status);
                    }

                    if (!response.IsSuccessStatusCode)
                    {
                        return false; // try again next time
                    }

                    body = DecodeV2(response.Content.ReadAsStringAsync().GetAwaiter().GetResult());
                }

                string consumerCode = Json.Str(Json.ReadObject(body), "consumerCode") ?? "";
                return ConsumerIdentityMatches(consumerCode);
            }
            catch (Exception exception) when (exception is HttpRequestException
                || exception is OperationCanceledException)
            {
                return false;
            }
        }

        private static bool ConsumerIdentityMatches(string consumerCode)
        {
            string company;
            try
            {
                company = AiDocumentsStore.ReadConsumerCode(ProductCode);
            }
            catch (SqlException exception)
            {
                Trace.TraceError(
                    "DocAi is off: cannot read dbo.DocAiIdentity (SQL error {0}). "
                    + "Run db/docai/10d_docai_identity.sql and grant SELECT to the kit.",
                    exception.Number);
                return false;
            }

            if (company == null || !Regex.IsMatch(company, @"\A" + ProductCode + @"-[A-Z0-9]{1,20}\z"))
            {
                Trace.TraceError(
                    "DocAi is off: dbo.DocAiIdentity has no valid {0} row. Run db/docai/10d_docai_identity.sql.",
                    ProductCode);
                return false;
            }

            bool same = string.Equals(consumerCode, company, StringComparison.OrdinalIgnoreCase);
            Interlocked.Exchange(ref _tenantChecked, same ? 1 : -1);
            if (!same)
            {
                Trace.TraceError(
                    "DocAi is off: the API key belongs to {0}, this company is {1} (dbo.DocAiIdentity).",
                    consumerCode,
                    company);
            }

            return same;
        }

        // Off the request's synchronization context: safe to wait on from a synchronous caller.
        private static void Run(Func<Task> work)
        {
            Task.Run(work).GetAwaiter().GetResult();
        }

        internal static string CopyPath(string storedFileName)
        {
            return Path.Combine(HostingEnvironment.MapPath("~/App_Data/DocAi"), storedFileName);
        }

        private static string SaveCopy(Guid localId, byte[] file, string extension)
        {
            // Generated locally, never taken from the client's file name.
            string year = DateTime.Now.Year.ToString(CultureInfo.InvariantCulture);
            string relative = Path.Combine(year, localId + "." + extension);
            string path = CopyPath(relative);
            Directory.CreateDirectory(Path.GetDirectoryName(path));
            // Publish a complete copy atomically. Two retries of one intent cannot truncate each other's file.
            string temporary = path + "." + Guid.NewGuid().ToString("N") + ".tmp";
            try
            {
                File.WriteAllBytes(temporary, file);
                try
                {
                    File.Move(temporary, path);
                }
                catch (IOException)
                {
                    if (!File.Exists(path))
                    {
                        throw;
                    }
                }
            }
            finally
            {
                if (File.Exists(temporary))
                {
                    File.Delete(temporary);
                }
            }

            return relative;
        }

        private static string ValidatedFileKind(byte[] file)
        {
            if (file == null || file.Length == 0)
            {
                throw new DocAiInputException("FILE_EMPTY", "The file is empty.");
            }

            if (file.Length > MaxFileBytes)
            {
                throw new DocAiInputException("FILE_TOO_LARGE", "The file is over 20 MB.");
            }

            string extension = FileKind(file);
            if (extension == null)
            {
                throw new DocAiInputException("UNSUPPORTED_FILE", "Only PDF, JPEG, PNG and TIFF files can be read.");
            }

            return extension;
        }

        // By the magic bytes, never by the name or the Content-Type header.
        private static string FileKind(byte[] file)
        {
            bool pdf = file.Length >= 5
                && file[0] == 0x25 && file[1] == 0x50 && file[2] == 0x44 && file[3] == 0x46 && file[4] == 0x2D;
            if (pdf)
            {
                return "pdf";
            }

            bool jpeg = file.Length >= 3 && file[0] == 0xFF && file[1] == 0xD8 && file[2] == 0xFF;
            if (jpeg)
            {
                return "jpg";
            }

            bool png = file.Length >= 8 && file[0] == 0x89 && file[1] == 0x50 && file[2] == 0x4E && file[3] == 0x47;
            if (png)
            {
                return "png";
            }

            if (file.Length >= 4)
            {
                bool littleEndianTiff = file[0] == 0x49 && file[1] == 0x49 && file[2] == 0x2A && file[3] == 0x00;
                if (littleEndianTiff)
                {
                    return "tif";
                }

                bool bigEndianTiff = file[0] == 0x4D && file[1] == 0x4D && file[2] == 0x00 && file[3] == 0x2A;
                if (bigEndianTiff)
                {
                    return "tif";
                }
            }

            return null;
        }

        // GET /api/v2/jobs/{id}?runNo={runNo} — the row's own run — with a 30 s budget. A final status is stored with
        // the submission; otherwise the claim is released so the next poll asks again.
        private static async Task RefreshAsync(ClaimedRow row)
        {
            try
            {
                if (DocAiSettings.IsDemo)
                {
                    DocAiDemo.Refresh(row);
                    return;
                }

                if (Paused || !row.RemoteJobId.HasValue || !row.RemoteRunNo.HasValue)
                {
                    return;
                }

                string url = "api/v2/jobs/" + row.RemoteJobId.Value + "?runNo=" + row.RemoteRunNo.Value;
                using (var budget = new CancellationTokenSource(TimeSpan.FromSeconds(30)))
                using (var request = V2Request(HttpMethod.Get, url, true))
                using (var response = await Http.Value.SendAsync(request, budget.Token).ConfigureAwait(false))
                {
                    await ProcessRefreshResponse(row, response).ConfigureAwait(false);
                }
            }
            catch (ArgumentException)
            {
                Trace.TraceWarning("DocAi refresh: invalid result metadata was refused.");
            }
            catch (Exception exception) when (exception is HttpRequestException
                || exception is OperationCanceledException)
            {
                Trace.TraceWarning(
                    "DocAi refresh failed. localId={0} error={1}",
                    row.LocalId,
                    exception.GetType().Name);
            }
            finally
            {
                AiDocumentsStore.Release(row); // A no-op once the outcome has released the claim.
            }
        }

        private static async Task ProcessRefreshResponse(ClaimedRow row, HttpResponseMessage response)
        {
            int status = (int)response.StatusCode;
            TraceRedirect(status);
            string body = DecodeV2(await response.Content.ReadAsStringAsync().ConfigureAwait(false));
            if (status == 200)
            {
                Dictionary<string, object> reply = Json.ReadObject(body);
                string runStatus = Json.Str(reply, "status");
                if (runStatus == "Completed" || runStatus == "Failed")
                {
                    Dictionary<string, object> error = Json.Obj(reply, "error");
                    AiDocumentsStore.StoreOutcome(
                        row.LocalId,
                        row.RemoteJobId.Value,
                        row.RemoteRunNo.Value,
                        runStatus,
                        body,
                        Json.Str(error, "code"),
                        Json.Str(error, "message"),
                        DocAiSettings.IsDemo);
                }
            }
            else if (status == 404)
            {
                // The service does not know this job for this consumer; never retry it.
                AiDocumentsStore.StoreOutcome(
                    row.LocalId,
                    row.RemoteJobId.Value,
                    row.RemoteRunNo.Value,
                    "Failed",
                    body,
                    "JOB_NOT_FOUND",
                    "DocAi does not know this document.",
                    DocAiSettings.IsDemo);
            }
            else if (status == 401 || status == 403)
            {
                PauseSending();
                Trace.TraceError("DocAi refresh paused: HTTP {0}. Check the API key.", status);
            }
        }

        private static void TraceRedirect(int status)
        {
            if (status >= 300 && status <= 399)
            {
                Trace.TraceError("DocAi answered HTTP {0}: redirects are not followed; check DocAi:BaseUrl.", status);
            }
        }

        private static void PauseSending()
        {
            Interlocked.Exchange(ref _pausedUntilTicks, DateTime.UtcNow.AddMinutes(5).Ticks);
        }

        internal static void InvalidateUsage()
        {
            lock (UsageLock)
            {
                _usage = null;
                _usageCached = false;
                _usageExpires = DateTime.MinValue;
                _usageGeneration++;
            }
        }

        private static async Task<Dictionary<string, object>> FetchUsage(int months)
        {
            using (var budget = new CancellationTokenSource(TimeSpan.FromSeconds(10)))
            using (var request = V2Request(HttpMethod.Get, "api/v2/usage?months=" + months, false))
            using (var response = await Http.Value.SendAsync(request, budget.Token).ConfigureAwait(false))
            {
                if (!response.IsSuccessStatusCode)
                {
                    return null;
                }

                string body = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                return ProjectUsage(Json.ReadObject(DecodeV2(body)));
            }
        }

        internal static Dictionary<string, object> ProjectUsage(Dictionary<string, object> body)
        {
            if (!HasSupportedUsageModeAndStatus(body))
            {
                return null;
            }

            var result = new Dictionary<string, object>();
            foreach (string key in RequiredUsageKeys)
            {
                object value;
                if (!body.TryGetValue(key, out value))
                {
                    return null;
                }

                result[key] = value;
            }

            if (!ValidUsageTotals(body) || !ValidUsageMonths(body) || !ValidLastTopUp(body))
            {
                return null;
            }

            return result;
        }

        private static bool HasSupportedUsageModeAndStatus(Dictionary<string, object> body)
        {
            return body != null
                && (Json.Str(body, "quotaMode") == "Unlimited" || Json.Str(body, "quotaMode") == "Prepaid")
                && UsageStatuses.Contains(Json.Str(body, "status"));
        }

        private static bool ValidUsageTotals(Dictionary<string, object> body)
        {
            long number;
            foreach (string key in UsageTotalKeys)
            {
                if (!long.TryParse(Json.Str(body, key), out number) || number < 0)
                {
                    return false;
                }
            }

            foreach (string key in OptionalUsageTotalKeys)
            {
                if (body[key] != null && (!long.TryParse(Json.Str(body, key), out number) || number < 0))
                {
                    return false;
                }
            }

            DateTimeOffset asOf;
            bool validDate = DateTimeOffset.TryParse(
                Json.Str(body, "asOfUtc"),
                CultureInfo.InvariantCulture,
                DateTimeStyles.None,
                out asOf);
            if (!validDate || !(body["months"] is IEnumerable) || body["months"] is string)
            {
                return false;
            }

            return true;
        }

        private static bool ValidUsageMonths(Dictionary<string, object> body)
        {
            long number;
            foreach (object item in (IEnumerable)body["months"])
            {
                var month = item as Dictionary<string, object>;
                DateTime monthDate;
                if (month == null)
                {
                    return false;
                }

                bool validMonth = DateTime.TryParseExact(
                    Json.Str(month, "month"),
                    "yyyy-MM",
                    CultureInfo.InvariantCulture,
                    DateTimeStyles.None,
                    out monthDate);
                if (!validMonth)
                {
                    return false;
                }

                foreach (string key in MonthlyUsageKeys)
                {
                    if (!long.TryParse(Json.Str(month, key), out number) || number < 0)
                    {
                        return false;
                    }
                }
            }

            return true;
        }

        private static bool ValidLastTopUp(Dictionary<string, object> body)
        {
            long number;
            DateTimeOffset asOf;
            if (body["lastTopUp"] != null)
            {
                var topUp = Json.Obj(body, "lastTopUp");
                if (topUp == null
                    || !long.TryParse(Json.Str(topUp, "pages"), out number)
                    || number < 0)
                {
                    return false;
                }

                bool validDate = DateTimeOffset.TryParse(
                    Json.Str(topUp, "recordedAtUtc"),
                    CultureInfo.InvariantCulture,
                    DateTimeStyles.None,
                    out asOf);
                if (!validDate)
                {
                    return false;
                }
            }

            return true;
        }

        private static Dictionary<string, object> DemoUsage()
        {
            return Json.ReadObject(
                @"{""asOfUtc"":""2026-01-15T12:00:00Z"",""unit"":""document pages"",""quotaMode"":""Prepaid"",""status"":""Ok"",
                ""granted"":1000,""used"":300,""reserved"":20,""remaining"":680,""warningPercent"":10,""cycleBase"":1000,
                ""warningAtPages"":100,""lastTopUp"":{""recordedAtUtc"":""2026-01-01T12:00:00Z"",""pages"":1000},
                ""maxPagesPerJob"":50,""dailyCap"":200,""submittedTodayPages"":12,""chargedTodayPages"":10,""dayBoundary"":""UTC"",
                ""months"":[{""month"":""2026-01"",""chargedPages"":300,""chargedDocuments"":100}]}");
        }

        private static void MaintainInBackground(CancellationToken cancellationToken)
        {
            try
            {
                if (!cancellationToken.IsCancellationRequested)
                {
                    RunMaintenance();
                }
            }
            catch (Exception exception)
            {
                Trace.TraceError("DocAi background maintenance failed: {0}", exception.GetType().Name);
            }
            finally
            {
                Interlocked.Exchange(ref _maintenanceQueued, 0);
            }
        }

        // Removes copies left by a crash before the intent was inserted; a missing folder is normal.
        private static void DeleteOrphanCopies()
        {
            string root = HostingEnvironment.MapPath("~/App_Data/DocAi");
            if (!Directory.Exists(root))
            {
                return;
            }

            DateTime cutoff = DateTime.UtcNow.AddDays(-2);
            foreach (string directory in Directory.EnumerateDirectories(root))
            {
                int year;
                string name = Path.GetFileName(directory);
                if (name.Length != 4 || !int.TryParse(name, out year))
                {
                    continue;
                }

                foreach (string path in Directory.EnumerateFiles(directory))
                {
                    try
                    {
                        if (IsOrphanCopy(path, cutoff))
                        {
                            File.Delete(path);
                        }
                    }
                    catch (Exception exception)
                    {
                        Trace.TraceWarning("DocAi: an orphan copy could not be deleted: {0}", exception.GetType().Name);
                    }
                }
            }
        }

        private static bool IsOrphanCopy(string path, DateTime cutoff)
        {
            Guid localId;
            return File.GetLastWriteTimeUtc(path) < cutoff
                && (Path.GetExtension(path) == ".tmp"
                    || (Guid.TryParse(Path.GetFileNameWithoutExtension(path), out localId)
                        && !AiDocumentsStore.CopyHasRow(localId)));
        }

        private static int? RetryAfterSeconds(HttpResponseMessage response)
        {
            if (response.Headers.RetryAfter == null)
            {
                return null;
            }

            if (response.Headers.RetryAfter.Delta.HasValue)
            {
                return (int)response.Headers.RetryAfter.Delta.Value.TotalSeconds;
            }

            if (response.Headers.RetryAfter.Date.HasValue)
            {
                return Math.Max(0, (int)(response.Headers.RetryAfter.Date.Value - DateTimeOffset.UtcNow).TotalSeconds);
            }

            return null;
        }

        private static string ProblemCode(string body)
        {
            try
            {
                string code = Json.Str(Json.ReadObject(body), "code");
                return string.IsNullOrWhiteSpace(code) ? null : code;
            }
            catch (ArgumentException)
            {
                return null;
            }
            catch (InvalidOperationException)
            {
                return null;
            }
        }

        // The short text of a ProblemDetails body (detail, else title) — never the whole body.
        private static string ProblemText(string body)
        {
            try
            {
                Dictionary<string, object> problem = Json.ReadObject(body);
                return Json.Str(problem, "detail") ?? Json.Str(problem, "title");
            }
            catch (ArgumentException)
            {
                return null;
            }
            catch (InvalidOperationException)
            {
                return null;
            }
        }

        internal static string RequestCulture(bool persisted)
        {
            return !persisted && CultureInfo.CurrentUICulture.TwoLetterISOLanguageName == "ar" ? "ar" : "en";
        }

        internal static HttpRequestMessage V2Request(HttpMethod method, string url, bool persisted)
        {
            var request = new HttpRequestMessage(method, url);
            request.Headers.Add("X-Culture", RequestCulture(persisted));
            return request;
        }

        // The only wire decoder. Result is never deserialized or serialized here: the validated
        // original UTF-8 text span is appended unchanged. Existing storage/projections still see v1 shapes.
        internal static string DecodeV2(string text, bool webhook = false)
        {
            if (string.IsNullOrWhiteSpace(text) && !webhook)
            {
                return text; // empty unknown-route 404
            }

            var envelope = RawMembers(text);
            if (webhook)
            {
                return DecodeWebhook(envelope);
            }

            string success;
            if (!envelope.TryGetValue("IsSuccess", out success))
            {
                throw InvalidV2();
            }

            if (success == "true")
            {
                string value;
                if (!envelope.TryGetValue("Value", out value))
                {
                    throw InvalidV2();
                }

                return "{" + string.Join(",", MapMembers(RawMembers(value))) + "}";
            }

            if (success != "false" || !envelope.ContainsKey("Error"))
            {
                throw InvalidV2();
            }

            var error = Json.ReadObject(envelope["Error"]);
            var extensions = envelope.ContainsKey("Extensions") ? Json.ReadObject(envelope["Extensions"]) : null;
            return Json.Write(
                new
                {
                    code = Json.Str(error, "Code"),
                    detail = Json.Str(error, "Message"),
                    correlationId = Json.Str(extensions, "CorrelationId"),
                    requiredPages = Member(extensions, "RequiredPages"),
                    availablePages = Member(extensions, "AvailablePages"),
                    retryAfter = Member(extensions, "RetryAfter")
                });
        }

        private static string DecodeWebhook(Dictionary<string, string> envelope)
        {
            if (envelope.Count != 4
                || !envelope.ContainsKey("Job")
                || !envelope.ContainsKey("EventId")
                || !envelope.ContainsKey("EventType")
                || !envelope.ContainsKey("OccurredAtUtc"))
            {
                throw InvalidV2();
            }

            var job = RawMembers(envelope["Job"]);
            string[] requiredJobKeys = { "JobId", "RunNo", "ClientRequestId", "Status", "Error", "Result" };
            foreach (string key in requiredJobKeys)
            {
                if (!job.ContainsKey(key))
                {
                    throw InvalidV2();
                }
            }

            string eventType = new JavaScriptSerializer().Deserialize<string>(envelope["EventType"]);
            string status = new JavaScriptSerializer().Deserialize<string>(job["Status"]);
            bool completedEvent = eventType == "job.completed" && status == "Completed";
            if (!completedEvent && (eventType != "job.failed" || status != "Failed"))
            {
                throw InvalidV2();
            }

            var fields = new List<string>();
            string[] eventKeys = { "EventId", "EventType", "OccurredAtUtc" };
            foreach (string key in eventKeys)
            {
                var eventMember = new Dictionary<string, string> { { key, envelope[key] } };
                fields.AddRange(MapMembers(eventMember));
            }

            fields.AddRange(MapMembers(job));
            return "{" + string.Join(",", fields) + "}";
        }

        private static object Member(Dictionary<string, object> value, string key)
        {
            object item;
            return value != null && value.TryGetValue(key, out item) ? item : null;
        }

        private static string Camel(string key)
        {
            return char.ToLowerInvariant(key[0]) + key.Substring(1);
        }

        private static IEnumerable<string> MapMembers(Dictionary<string, string> members)
        {
            foreach (var pair in members)
            {
                // Only DTO metadata is case-mapped. Never walk the canonical result subtree.
                string value = pair.Value;
                if (pair.Key != "Result")
                {
                    var serializer = new JavaScriptSerializer { MaxJsonLength = int.MaxValue };
                    value = Json.Write(CamelMetadata(serializer.DeserializeObject(pair.Value)));
                }

                yield return Json.Write(Camel(pair.Key)) + ":" + value;
            }
        }

        private static object CamelMetadata(object value)
        {
            var dictionary = value as Dictionary<string, object>;
            if (dictionary != null)
            {
                return dictionary.ToDictionary(pair => Camel(pair.Key), pair => CamelMetadata(pair.Value));
            }

            var array = value as object[];
            return array == null ? value : array.Select(CamelMetadata).ToArray();
        }

        private static ArgumentException InvalidV2()
        {
            return new ArgumentException("DocAi: invalid v2 response.");
        }

        // A small JSON grammar scanner records member spans, including large canonical documents.
        // It validates every token without converting numbers, strings or dates in Result.
        private static Dictionary<string, string> RawMembers(string text)
        {
            if (text == null)
            {
                throw InvalidV2();
            }

            var reader = new DocAiJsonScanner(text);
            var members = reader.ReadObject(0, true);
            reader.SkipWhitespace();
            if (reader.Position != text.Length)
            {
                throw InvalidV2();
            }

            return members;
        }
    }
}

using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Diagnostics;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using Forwarding.MvcApp.DocAi;

namespace Forwarding.MvcApp.Controllers.DocAi
{
    // Accepts completed runs at api/DocAi/Webhook; the service authenticates with the HMAC signature.
    // AllowAnonymous matters only where a global authorize filter exists.
    // IIS limits this path to 1 MB through <location> in Web.config.
    [AllowAnonymous]
    public class DocAiWebhookController : ApiController
    {
        [HttpPost]
        public async Task<HttpResponseMessage> Receive()
        {
            if (!DocAiSettings.Enabled)
            {
                return new HttpResponseMessage(HttpStatusCode.NotFound);
            }

            // Before any await: keep a 401 a 401 (not a 302 to the login page), and read the headers.
            HttpContext.Current.Response.SuppressFormsAuthenticationRedirect = true;
            string timestamp = Header("X-Timestamp");
            string signature = Header("X-Signature");

            // Cheap checks first: an unsigned caller never gets its body read.
            if (!DocAiSignature.LooksValid(timestamp, signature))
            {
                return new HttpResponseMessage(HttpStatusCode.Unauthorized);
            }

            // The signature covers these exact bytes.
            byte[] raw = await Request.Content.ReadAsByteArrayAsync().ConfigureAwait(false);
            return new HttpResponseMessage(AcceptWebhook(
                timestamp,
                raw,
                signature,
                DocAiSettings.WebhookSecrets,
                AiDocumentsStore.StoreOutcome));
        }

        // A supplied store keeps the authentication and decoding order identical in tests and production.
        internal static HttpStatusCode AcceptWebhook(
            string timestamp,
            byte[] raw,
            string signature,
            IEnumerable<byte[]> secrets,
            Action<string> store)
        {
            if (!DocAiSignature.IsFresh(timestamp, 300)
                || !DocAiSignature.IsValid(timestamp, raw, signature, secrets))
            {
                // Nothing from the body is logged on rejection.
                Trace.TraceWarning("DocAi webhook rejected: signature or timestamp");
                return HttpStatusCode.Unauthorized;
            }

            try
            {
                store(DocAiClient.DecodeV2(new UTF8Encoding(false, true).GetString(raw), true));
                return HttpStatusCode.OK;
            }
            catch (SqlException exception)
            {
                Trace.TraceError("DocAi webhook store failed. error={0}", exception.Number);
                return HttpStatusCode.InternalServerError;   // the service retries
            }
            catch (ArgumentException)
            {
                // A signed but invalid body is a sender error; retrying would not help.
                Trace.TraceError("DocAi webhook: a signed body that is not JSON was refused.");
                return HttpStatusCode.BadRequest;
            }
        }

        private string Header(string name)
        {
            IEnumerable<string> values;
            return Request.Headers.TryGetValues(name, out values) ? values.FirstOrDefault() : null;
        }
    }
}

using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.IO;
using System.Web.Hosting;

namespace Forwarding.MvcApp.DocAi
{
    // Simulates document runs locally when DocAi:Mode = Demo; nothing leaves the server.
    // A Read takes 4 seconds and returns values marked DEMO.
    // A file whose name contains "fail" fails, so the error state can be tried too.
    // For trying the screens before the DocAi service exists. Never in production.
    internal static class DocAiDemo
    {
        private static readonly ConcurrentDictionary<Guid, bool> Manifests = new ConcurrentDictionary<Guid, bool>();
        private static readonly ConcurrentDictionary<Guid, bool> Failing = new ConcurrentDictionary<Guid, bool>();
        private static readonly ConcurrentDictionary<Guid, DateTime> Started =
            new ConcurrentDictionary<Guid, DateTime>();

        internal static void Remember(Guid localId, string fileName)
        {
            Manifests[localId] = NameContains(fileName, "manifest");
            Failing[localId] = NameContains(fileName, "fail");
        }

        internal static void Send(ClaimedRow row)
        {
            bool manifest;
            Manifests.TryGetValue(row.LocalId, out manifest);
            bool manifestDocument = row.DocumentTypeCode == "MANIFEST" || (row.DocumentTypeCode == "AUTO" && manifest);
            short pages = (short)(manifestDocument ? 2 : 1);
            AiDocumentsStore.MarkSubmitted(row, row.LocalId, 1, pages);
            Started[row.LocalId] = DateTime.UtcNow;
        }

        internal static void Refresh(ClaimedRow row)
        {
            DateTime started;
            if (Started.TryGetValue(row.LocalId, out started) && DateTime.UtcNow - started < TimeSpan.FromSeconds(4))
            {
                return;
            }

            bool fail;
            Failing.TryGetValue(row.LocalId, out fail);
            Guid jobId = row.RemoteJobId ?? row.LocalId;
            short runNo = row.RemoteRunNo ?? 1;
            string code = row.LocalId.ToString("N").Substring(0, 8).ToUpperInvariant();
            var body = new Dictionary<string, object>
            {
                { "jobId", jobId },
                { "runNo", runNo },
                { "clientRequestId", row.LocalId },
                { "status", fail ? "Failed" : "Completed" },
                { "error", fail ? FailureDetails() : null },
                { "result", null }
            };
            bool manifest;
            Manifests.TryGetValue(row.LocalId, out manifest);
            manifest = row.DocumentTypeCode == "MANIFEST" || (row.DocumentTypeCode == "AUTO" && manifest);
            if (!fail)
            {
                body["result"] = ReadFixture(row, manifest, code);
            }

            body["requestedDocumentType"] = row.DocumentTypeCode;
            body["documentType"] = fail ? null : DocumentType(row, manifest);
            string resultType = null;
            if (!fail)
            {
                resultType = manifest ? DocAiResult.ManifestType : DocAiResult.BlType;
            }

            body["resultType"] = resultType;
            AiDocumentsStore.StoreOutcome(
                row.LocalId,
                jobId,
                runNo,
                fail ? "Failed" : "Completed",
                Json.Write(body),
                fail ? "DEMO_FAILURE" : null,
                fail ? "Demo: the file name asks for a failure." : null,
                true);
            Manifests.TryRemove(row.LocalId, out manifest);
            Started.TryRemove(row.LocalId, out started);
            Failing.TryRemove(row.LocalId, out fail);
        }

        private static bool NameContains(string fileName, string text)
        {
            return fileName != null && fileName.IndexOf(text, StringComparison.OrdinalIgnoreCase) >= 0;
        }

        private static Dictionary<string, object> FailureDetails()
        {
            return new Dictionary<string, object>
            {
                { "code", "DEMO_FAILURE" },
                { "message", "Demo: the file name asks for a failure." }
            };
        }

        private static Dictionary<string, object> ReadFixture(ClaimedRow row, bool manifest, string code)
        {
            string relativePath = manifest ? "~/DocAi/Fixtures/manifest-test-A.json" : "~/DocAi/Fixtures/bl.json";
            string path = HostingEnvironment.MapPath(relativePath);
            string json = File.ReadAllText(path);
            var fixture = Json.ReadObject(json);
            fixture["documentTypeCode"] = DocumentType(row, manifest);
            if (!manifest)
            {
                Json.Obj(Json.Obj(fixture, "fields"), "billOfLadingNumber")["value"] = "DEMO" + code;
            }

            return fixture;
        }

        private static string DocumentType(ClaimedRow row, bool manifest)
        {
            if (manifest)
            {
                return "MANIFEST";
            }

            return row.DocumentTypeCode == "AUTO" ? "BL" : row.DocumentTypeCode;
        }
    }
}

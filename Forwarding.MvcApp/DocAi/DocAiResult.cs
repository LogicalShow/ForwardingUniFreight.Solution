using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;

namespace Forwarding.MvcApp.DocAi
{
    public sealed class DocAiDetailRow
    {
        public string name;
        public string path;
        public string value;
        public string rawText;
        public string confidence;
        public string page;
        public string[] flags;
    }

    public sealed class DocAiDetailGroup
    {
        public int? sourceIndex;
        public string associationMethod;
        public DocAiDetailRow[] fields;
        public DocAiDetailGroup[] containers;
    }

    // Validates stored result envelopes and projects their fields, bills and flags for display.
    public sealed class DocAiResult
    {
        public const string BlType = "bill-of-lading.v1";
        public const string ManifestType = "cargo-manifest.v1";
        public DocAiDetailRow[] header;
        public DocAiDetailGroup[] billsOfLading;
        public DocAiDetailGroup[] unidentifiedBillsOfLading;
        public DocAiDetailGroup[] unassignedContainers;
        public DocAiDetailGroup[] containers;
        public DocAiDetailRow[] flags;

        // Historical bill-of-lading envelopes lack metadata.
        public static void Validate(
            Dictionary<string, object> envelope,
            string status,
            out string resolvedType,
            out string resultType)
        {
            if (status != "Completed" && status != "Failed")
            {
                throw new ArgumentException("DocAi: invalid terminal status.");
            }

            resolvedType = Json.Str(envelope, "documentType");
            resultType = Json.Str(envelope, "resultType");
            var result = Json.Obj(envelope, "result");

            if (InvalidMetadata(resolvedType, resultType))
            {
                throw new ArgumentException("DocAi: invalid result metadata.");
            }

            if (status == "Failed")
            {
                if (result != null || resultType != null)
                {
                    throw new ArgumentException("DocAi: failed outcome contains a result.");
                }

                return;
            }

            string canonicalType = Json.Str(result, "documentTypeCode");
            if (InvalidCanonicalType(canonicalType, resolvedType))
            {
                throw new ArgumentException("DocAi: unresolved or conflicting result type.");
            }

            string expected = canonicalType == "MANIFEST" ? ManifestType : BlType;
            if (resultType != null && resultType != expected)
            {
                throw new ArgumentException("DocAi: conflicting result discriminator.");
            }

            if (!HasExpectedShape(result, expected))
            {
                throw new ArgumentException("DocAi: invalid result shape.");
            }

            resolvedType = canonicalType;
            resultType = expected;
        }

        public static DocAiResult Project(Dictionary<string, object> result, string resultType)
        {
            // Rows look up their own flags by path in this list.
            var flagList = Items(result, "flags").ToArray();
            bool manifest = resultType == ManifestType;

            return new DocAiResult
            {
                header = ProjectRows(
                    Json.Obj(result, manifest ? "header" : "fields"),
                    manifest ? "header." : "",
                    flagList),
                containers = ProjectContainers(result, "containers", "containers[", flagList),
                billsOfLading = Items(result, "billsOfLading")
                    .Select((bill, index) => ProjectIdentifiedBill(bill, index, flagList)).ToArray(),
                unidentifiedBillsOfLading = Items(result, "unidentifiedBillsOfLading")
                    .Select((bill, index) => ProjectUnidentifiedBill(bill, index, flagList)).ToArray(),
                unassignedContainers = ProjectContainers(
                    result,
                    "unassignedContainers",
                    "unassignedContainers[",
                    flagList),
                flags = flagList.Select(ProjectFlag).ToArray()
            };
        }

        private static bool InvalidMetadata(string resolvedType, string resultType)
        {
            if (resolvedType != null && (resolvedType == "AUTO" || resolvedType.Length > 20))
            {
                return true;
            }

            return resultType != null && resultType != BlType && resultType != ManifestType;
        }

        private static bool InvalidCanonicalType(string canonicalType, string resolvedType)
        {
            if (string.IsNullOrWhiteSpace(canonicalType) || canonicalType == "AUTO" || canonicalType.Length > 20)
            {
                return true;
            }

            return resolvedType != null && resolvedType != canonicalType;
        }

        private static bool HasExpectedShape(Dictionary<string, object> result, string expected)
        {
            bool manifest = expected == ManifestType;
            var fields = Json.Obj(result, manifest ? "header" : "fields");
            if (fields == null)
            {
                return false;
            }

            object groups = Get(result, manifest ? "billsOfLading" : "containers");
            return groups is IList;
        }

        private static DocAiDetailRow[] ProjectRows(
            Dictionary<string, object> values,
            string prefix,
            Dictionary<string, object>[] flagList)
        {
            var rows = new List<DocAiDetailRow>();
            foreach (var pair in values ?? new Dictionary<string, object>())
            {
                var field = pair.Value as Dictionary<string, object>;
                if (field == null)
                {
                    continue;
                }

                string path = prefix + pair.Key;
                rows.Add(new DocAiDetailRow
                {
                    name = pair.Key,
                    path = path,
                    value = Json.Str(field, "value"),
                    rawText = Json.Str(field, "rawText"),
                    confidence = Json.Str(field, "confidence"),
                    page = Json.Str(field, "page"),
                    flags = flagList.Where(flag => Json.Str(flag, "field") == path)
                        .Select(flag => Json.Str(flag, "reason")).ToArray()
                });
            }

            return rows.ToArray();
        }

        private static DocAiDetailGroup[] ProjectContainers(
            Dictionary<string, object> source,
            string collection,
            string prefix,
            Dictionary<string, object>[] flagList)
        {
            return Items(source, collection)
                .Select((container, index) => ProjectContainer(container, prefix + index + "]", flagList))
                .ToArray();
        }

        private static DocAiDetailGroup ProjectContainer(
            Dictionary<string, object> container,
            string path,
            Dictionary<string, object>[] flagList)
        {
            return new DocAiDetailGroup
            {
                fields = ProjectRows(container, path + ".", flagList),
                associationMethod = Json.Str(container, "associationMethod"),
                containers = new DocAiDetailGroup[0]
            };
        }

        private static DocAiDetailGroup ProjectIdentifiedBill(
            Dictionary<string, object> bill,
            int index,
            Dictionary<string, object>[] flagList)
        {
            return new DocAiDetailGroup
            {
                fields = ProjectRows(Json.Obj(bill, "fields"), "billsOfLading[" + index + "].fields.", flagList),
                containers = ProjectContainers(bill, "containers", "billsOfLading[" + index + "].containers[", flagList)
            };
        }

        private static DocAiDetailGroup ProjectUnidentifiedBill(
            Dictionary<string, object> bill,
            int index,
            Dictionary<string, object>[] flagList)
        {
            return new DocAiDetailGroup
            {
                sourceIndex = Convert.ToInt32(Get(bill, "sourceIndex")),
                fields = ProjectRows(
                    Json.Obj(bill, "fields"),
                    "unidentifiedBillsOfLading[" + index + "].fields.",
                    flagList),
                containers = new DocAiDetailGroup[0]
            };
        }

        private static DocAiDetailRow ProjectFlag(Dictionary<string, object> flag)
        {
            return new DocAiDetailRow
            {
                path = Json.Str(flag, "field"),
                value = Json.Str(flag, "reason")
            };
        }

        private static object Get(Dictionary<string, object> obj, string name)
        {
            object value;
            return obj != null && obj.TryGetValue(name, out value) ? value : null;
        }

        private static IEnumerable<Dictionary<string, object>> Items(Dictionary<string, object> obj, string name)
        {
            var items = Get(obj, name) as IEnumerable;
            if (items == null)
            {
                yield break;
            }

            foreach (object item in items)
            {
                var dictionary = item as Dictionary<string, object>;
                if (dictionary != null)
                {
                    yield return dictionary;
                }
            }
        }
    }
}

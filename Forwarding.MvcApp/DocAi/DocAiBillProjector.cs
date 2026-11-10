using System;
using System.Collections;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text.RegularExpressions;

namespace Forwarding.MvcApp.DocAi
{
    public sealed class DocAiBillRow
    {
        public int BillIndex;
        public string BillJson;
        public string BillWithConfidenceJson;
    }

    // Turns a stored result into one AiBills row per bill: BillJson holds typed values,
    // and BillWithConfidenceJson keeps extraction metadata. Name tables are shared with the screen adapter.
    public static class DocAiBillProjector
    {
        // Each entry is { name in the service result, property name in the stored bill }.
        internal static readonly string[][] BillNames =
        {
            new[] { "billOfLadingNumber", "BillOfLadingNumber" },
            new[] { "bookingNumber", "BookingNumber" },
            new[] { "shipperName", "ShipperName" },
            new[] { "shipperAddress", "ShipperAddress" },
            new[] { "consigneeName", "ConsigneeName" },
            new[] { "consigneeAddress", "ConsigneeAddress" },
            new[] { "notifyParty", "NotifyParty" },
            new[] { "vesselName", "VesselName" },
            new[] { "voyageNumber", "VoyageNumber" },
            new[] { "portOfLoading", "PortOfLoading" },
            new[] { "portOfDischarge", "PortOfDischarge" },
            new[] { "totalGrossWeightKg", "TotalGrossWeightKg" },
            new[] { "issueDate", "DateOfIssue" },
            new[] { "hsCode", "HSCode" },
            new[] { "freightTerms", "FreightTerms" }
        };

        // Each entry is { name in the service result, property name in the stored bill }.
        internal static readonly string[][] ContainerNames =
        {
            new[] { "containerNumber", "ContainerNo" },
            new[] { "sealNumber", "SealNo" },
            new[] { "containerType", "Type" },
            new[] { "packages", "Packages" },
            new[] { "grossWeightKg", "GrossWeightKg" },
            new[] { "measurementCbm", "MeasurementCbm" }
        };

        private static readonly string[] InheritedNames =
        {
            "vesselName", "voyageNumber", "portOfLoading", "portOfDischarge"
        };

        public static DocAiBillRow[] Project(string resultJson)
        {
            var envelope = Json.ReadObject(resultJson);
            string documentType;
            string resultType;
            DocAiResult.Validate(envelope, "Completed", out documentType, out resultType);
            var result = Json.Obj(envelope, "result");
            CheckArray(result, "containers");
            CheckArray(result, "billsOfLading");
            CheckArray(result, "unidentifiedBillsOfLading");
            var flags = Items(result, "flags");
            var rows = new List<DocAiBillRow>();

            if (resultType == DocAiResult.BlType)
            {
                rows.Add(ProjectBill(result, result, "fields", 0, rows.Count, flags, false));
            }
            else
            {
                foreach (string collection in new[] { "billsOfLading", "unidentifiedBillsOfLading" })
                {
                    int ordinal = 0;
                    foreach (var bill in Items(result, collection))
                    {
                        rows.Add(ProjectBill(bill, result, collection, ordinal++, rows.Count, flags, true));
                    }
                }
            }

            return rows.ToArray();
        }

        internal static object Get(Dictionary<string, object> obj, string key)
        {
            object value;
            return obj != null && obj.TryGetValue(key, out value) ? value : null;
        }

        internal static Dictionary<string, object>[] Items(Dictionary<string, object> obj, string key)
        {
            var items = Get(obj, key) as IEnumerable;
            return items == null
                ? new Dictionary<string, object>[0]
                : items.Cast<object>().OfType<Dictionary<string, object>>().ToArray();
        }

        private static void CheckArray(Dictionary<string, object> source, string name)
        {
            object value = Get(source, name);
            if (value == null)
            {
                return;
            }

            var array = value as IList;
            if (array == null || array.Cast<object>().Any(item => !(item is Dictionary<string, object>)))
            {
                throw new ArgumentException("DocAi: invalid bill collection.");
            }
        }

        private static string[] Reasons(Dictionary<string, object>[] flags, string path)
        {
            return flags.Where(flag => Json.Str(flag, "field") == path)
                .Select(flag => Json.Str(flag, "reason")).ToArray();
        }

        private static DocAiBillRow ProjectBill(
            Dictionary<string, object> bill,
            Dictionary<string, object> result,
            string collection,
            int ordinal,
            int index,
            Dictionary<string, object>[] flags,
            bool manifest)
        {
            CheckArray(bill, "containers");
            string path = manifest ? collection + "[" + ordinal + "]" : "";
            var fields = Json.Obj(bill, "fields");
            string fieldPrefix = manifest ? path + ".fields." : "";
            var plain = new Dictionary<string, object>();
            var rich = new Dictionary<string, object>();
            var extras = new Dictionary<string, object>();

            AddBillFields(fields, result, fieldPrefix, flags, manifest, plain, rich);
            AddExtras(
                fields,
                fieldPrefix,
                BillNames.Where(mapping => !manifest || !InheritedNames.Contains(mapping[0]))
                    .Select(mapping => BillResultName(mapping[0], manifest)),
                flags,
                extras);

            var plainContainers = new List<object>();
            var richContainers = new List<object>();
            AddContainers(bill, path, flags, manifest, plainContainers, richContainers);

            plain["Containers"] = plainContainers;
            rich["Containers"] = richContainers;
            rich["ContractVersion"] = 1;
            rich["SourceCollection"] = collection;
            rich["SourceOrdinal"] = ordinal;
            if (bill.ContainsKey("sourceIndex"))
            {
                rich["SourceIndex"] = bill["sourceIndex"];
            }

            rich["Flags"] = Reasons(flags, path);
            rich["Extras"] = extras;

            return new DocAiBillRow
            {
                BillIndex = index,
                BillJson = Json.Write(plain),
                BillWithConfidenceJson = Json.Write(rich)
            };
        }

        private static void AddBillFields(
            Dictionary<string, object> fields,
            Dictionary<string, object> result,
            string fieldPrefix,
            Dictionary<string, object>[] flags,
            bool manifest,
            Dictionary<string, object> plain,
            Dictionary<string, object> rich)
        {
            foreach (var mapping in BillNames)
            {
                string resultName = mapping[0];
                string storedName = mapping[1];
                string name = BillResultName(resultName, manifest);
                bool inherited = manifest && InheritedNames.Contains(name);
                var source = inherited ? Json.Obj(result, "header") : fields;
                string prefix = inherited ? "header." : fieldPrefix;
                var metadata = Field(source, name, prefix, storedName, flags, inherited);
                rich[storedName] = metadata;
                plain[storedName] = metadata == null ? null : metadata["Value"];
            }
        }

        private static void AddContainers(
            Dictionary<string, object> bill,
            string path,
            Dictionary<string, object>[] flags,
            bool manifest,
            List<object> plainContainers,
            List<object> richContainers)
        {
            int containerOrdinal = 0;
            foreach (var container in Items(bill, "containers"))
            {
                string containerPath = (manifest ? path + "." : "") + "containers[" + containerOrdinal + "]";
                var plainContainer = new Dictionary<string, object>();
                var richContainer = new Dictionary<string, object>();
                var extras = new Dictionary<string, object>();

                foreach (var mapping in ContainerNames)
                {
                    string resultName = mapping[0];
                    string storedName = mapping[1];
                    string name = ContainerResultName(resultName, manifest);
                    var metadata = Field(container, name, containerPath + ".", storedName, flags, false);
                    richContainer[storedName] = metadata;
                    plainContainer[storedName] = metadata == null ? null : metadata["Value"];
                }

                AddExtras(
                    container,
                    containerPath + ".",
                    ContainerNames.Select(mapping => ContainerResultName(mapping[0], manifest)),
                    flags,
                    extras);

                richContainer["AssociationMethod"] = Get(container, "associationMethod");
                richContainer["SourceOrdinal"] = containerOrdinal++;
                richContainer["Flags"] = Reasons(flags, containerPath);
                richContainer["Extras"] = extras;
                plainContainers.Add(plainContainer);
                richContainers.Add(richContainer);
            }
        }

        private static string BillResultName(string name, bool manifest)
        {
            return manifest && name == "totalGrossWeightKg" ? "grossWeight" : name;
        }

        private static string ContainerResultName(string name, bool manifest)
        {
            return manifest && name == "grossWeightKg" ? "grossWeight" : name;
        }

        private static void AddExtras(
            Dictionary<string, object> source,
            string prefix,
            IEnumerable<string> used,
            Dictionary<string, object>[] flags,
            Dictionary<string, object> extras)
        {
            if (source == null)
            {
                return;
            }

            foreach (var pair in source)
            {
                if (!(pair.Value is Dictionary<string, object>) || used.Contains(pair.Key))
                {
                    continue;
                }

                extras[pair.Key] = Field(source, pair.Key, prefix, null, flags, false);
            }
        }

        private static Dictionary<string, object> Field(
            Dictionary<string, object> source,
            string name,
            string prefix,
            string target,
            Dictionary<string, object>[] flags,
            bool inherited)
        {
            var field = Json.Obj(source, name);
            if (field == null)
            {
                return null;
            }

            string raw = Json.Str(field, "value");
            var metadata = new Dictionary<string, object>
            {
                { "Value", Typed(raw, target) },
                { "RawValue", raw },
                { "RawText", Json.Str(field, "rawText") },
                { "Confidence", Get(field, "confidence") },
                { "Page", Get(field, "page") },
                { "Flags", Reasons(flags, prefix + name) },
                { "Path", prefix + name },
                { "Name", name },
                { "Ordinal", source.Keys.ToList().IndexOf(name) }
            };

            if (inherited)
            {
                metadata["Inherited"] = true;
            }

            return metadata;
        }

        private static object Typed(string raw, string target)
        {
            if (raw == null)
            {
                return null;
            }

            if (target == "DateOfIssue")
            {
                return Date(raw);
            }

            if (target == "TotalGrossWeightKg" || target == "GrossWeightKg")
            {
                return Number(raw, "KG|KGS|KILOS|KILOGRAMS", false);
            }

            if (target == "MeasurementCbm")
            {
                return Number(raw, "CBM|M3", false);
            }

            if (target == "Packages")
            {
                return Number(
                    raw,
                    "PKG|PKGS|PACKAGE|PACKAGES|PCS|PIECES|CTN|CTNS|CARTON|CARTONS|BAG|BAGS|BALE|BALES|PALLET|PALLETS",
                    true);
            }

            return raw;
        }

        private static object Number(string raw, string units, bool integer)
        {
            string pattern = @"^([+-]?(?:[0-9]+|[0-9]{1,3}(?:,[0-9]{3})+)(?:\.[0-9]+)?)(?:\s*(?:" + units + @"))?$";
            var match = Regex.Match(raw.Trim(), pattern, RegexOptions.IgnoreCase | RegexOptions.CultureInvariant);
            if (!match.Success)
            {
                return null;
            }

            string numberText = match.Groups[1].Value;
            // Decimal parsing can round beyond its precision; fractional packages stay invalid.
            if (integer && Regex.IsMatch(numberText, @"\.[0-9]*[1-9]"))
            {
                return null;
            }

            decimal number;
            if (!decimal.TryParse(
                numberText,
                NumberStyles.AllowLeadingSign | NumberStyles.AllowDecimalPoint | NumberStyles.AllowThousands,
                CultureInfo.InvariantCulture,
                out number))
            {
                return null;
            }

            if (!integer)
            {
                return number;
            }

            if (number != decimal.Truncate(number) || number < int.MinValue || number > int.MaxValue)
            {
                return null;
            }

            return (int)number;
        }

        private static string Date(string raw)
        {
            DateTime date;
            string text = raw.Trim();
            var formats = new[]
            {
                "yyyy-MM-dd", "yyyy/MM/dd", "d-MMM-yyyy", "d MMM yyyy",
                "d-MMMM-yyyy", "d MMMM yyyy", "MMM d, yyyy", "MMMM d, yyyy"
            };

            if (DateTime.TryParseExact(text, formats, CultureInfo.InvariantCulture, DateTimeStyles.None, out date))
            {
                return date.ToString("yyyy-MM-dd", CultureInfo.InvariantCulture);
            }

            var match = Regex.Match(text, @"^([0-9]{1,2})([/-])([0-9]{1,2})\2([0-9]{4})$");
            if (!match.Success)
            {
                return null;
            }

            int first = int.Parse(match.Groups[1].Value, CultureInfo.InvariantCulture);
            int second = int.Parse(match.Groups[3].Value, CultureInfo.InvariantCulture);
            // Day first by business decision; month first only when the second part cannot be a month.
            if (first > 12 && second > 12)
            {
                return null;
            }

            string separator = match.Groups[2].Value;
            string format = second > 12
                ? "M" + separator + "d" + separator + "yyyy"
                : "d" + separator + "M" + separator + "yyyy";
            if (!DateTime.TryParseExact(text, format, CultureInfo.InvariantCulture, DateTimeStyles.None, out date))
            {
                return null;
            }

            return date.ToString("yyyy-MM-dd", CultureInfo.InvariantCulture);
        }
    }
}

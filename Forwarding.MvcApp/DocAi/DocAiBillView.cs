using System;
using System.Collections;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;

namespace Forwarding.MvcApp.DocAi
{
    // Rebuilds the display contract from persisted bill metadata.
    public static class DocAiBillView
    {
        public static DocAiResult Project(DocAiResult document, DocAiBillRow[] bills, string resultType)
        {
            var richBills = bills.OrderBy(bill => bill.BillIndex)
                .Select(bill => Json.ReadObject(bill.BillWithConfidenceJson)).ToArray();

            if (resultType == DocAiResult.BlType)
            {
                if (richBills.Length != 1)
                {
                    throw new ArgumentException("DocAi: invalid bill count.");
                }

                document.header = Fields(richBills[0], DocAiBillProjector.BillNames);
                document.containers = Containers(richBills[0]);
            }
            else
            {
                document.billsOfLading = Groups(richBills, "billsOfLading");
                document.unidentifiedBillsOfLading = Groups(richBills, "unidentifiedBillsOfLading");
            }

            return document;
        }

        public static object[] Rows(DocAiResult details)
        {
            var flagged = new HashSet<string>(details.flags.Select(flag => flag.path).Where(path => path != null));
            return new object[]
            {
                new
                {
                    hbl = HeaderValue(details, "billOfLadingNumber"),
                    shipper = HeaderValue(details, "shipperName"),
                    consignee = HeaderValue(details, "consigneeName"),
                    pol = HeaderValue(details, "portOfLoading"),
                    pod = HeaderValue(details, "portOfDischarge"),
                    lowConfidence = new[]
                    {
                        "billOfLadingNumber", "shipperName", "consigneeName", "portOfLoading", "portOfDischarge"
                    }.Where(flagged.Contains).ToArray()
                }
            };
        }

        private static string HeaderValue(DocAiResult details, string name)
        {
            return details.header.Where(field => field.name == name).Select(field => field.value).FirstOrDefault();
        }

        private static DocAiDetailRow[] Fields(Dictionary<string, object> rich, string[][] names)
        {
            var fields = names.Select(name => Json.Obj(rich, name[1])).Where(IsOwnField);
            var extras = (Json.Obj(rich, "Extras") ?? new Dictionary<string, object>())
                .Values.OfType<Dictionary<string, object>>();

            return fields.Concat(extras)
                .OrderBy(field => Convert.ToInt32(field["Ordinal"], CultureInfo.InvariantCulture))
                .Select(ProjectField).ToArray();
        }

        private static bool IsOwnField(Dictionary<string, object> field)
        {
            return field != null && !Equals(DocAiBillProjector.Get(field, "Inherited"), true);
        }

        private static DocAiDetailRow ProjectField(Dictionary<string, object> field)
        {
            return new DocAiDetailRow
            {
                name = Json.Str(field, "Name"),
                path = Json.Str(field, "Path"),
                value = Json.Str(field, "RawValue"),
                rawText = Json.Str(field, "RawText"),
                confidence = Json.Str(field, "Confidence"),
                page = Json.Str(field, "Page"),
                flags = ((IEnumerable)field["Flags"]).Cast<object>()
                    .Select(value => value as string).ToArray()
            };
        }

        private static DocAiDetailGroup[] Containers(Dictionary<string, object> rich)
        {
            return DocAiBillProjector.Items(rich, "Containers")
                .OrderBy(container => Convert.ToInt32(container["SourceOrdinal"], CultureInfo.InvariantCulture))
                .Select(ProjectContainer).ToArray();
        }

        private static DocAiDetailGroup ProjectContainer(Dictionary<string, object> container)
        {
            return new DocAiDetailGroup
            {
                fields = Fields(container, DocAiBillProjector.ContainerNames),
                associationMethod = Json.Str(container, "AssociationMethod"),
                containers = new DocAiDetailGroup[0]
            };
        }

        private static DocAiDetailGroup[] Groups(Dictionary<string, object>[] richBills, string collection)
        {
            return richBills.Where(bill => Json.Str(bill, "SourceCollection") == collection)
                .OrderBy(bill => Convert.ToInt32(bill["SourceOrdinal"], CultureInfo.InvariantCulture))
                .Select(bill => ProjectGroup(bill, collection)).ToArray();
        }

        private static DocAiDetailGroup ProjectGroup(Dictionary<string, object> bill, string collection)
        {
            bool unidentified = collection == "unidentifiedBillsOfLading";
            return new DocAiDetailGroup
            {
                fields = Fields(bill, DocAiBillProjector.BillNames),
                sourceIndex = unidentified
                    ? (int?)Convert.ToInt32(DocAiBillProjector.Get(bill, "SourceIndex"), CultureInfo.InvariantCulture)
                    : null,
                containers = unidentified
                    ? new DocAiDetailGroup[0]
                    : Containers(bill)
            };
        }
    }
}

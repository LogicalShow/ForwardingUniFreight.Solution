using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using BillWorkflow.Common.Abstractions;
using BillWorkflow.Common.Contracts;
using BillWorkflow.Common.Exceptions;
using BillWorkflow.Common.Validation;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace BillWorkflow.Common.Extraction
{
    // Reads one persisted bill; malformed bills remain reviewable as issues with a null typed bill.
    public class BillOfLadingJsonAdapter : IBillExtractionAdapter
    {
        public const int MaxJsonCharacters = 2 * 1024 * 1024;
        public const int MaxContainersPerBill = 1000;

        public StoredBillReadResult ReadStoredBill(string billJson, string billWithConfidenceJson)
        {
            var result = new StoredBillReadResult();
            try
            {
                var confidence = ReadToken(billWithConfidenceJson) as JObject;
                if (confidence != null && confidence["SourceCollection"] != null &&
                    confidence["SourceCollection"].Type == JTokenType.String &&
                    confidence["SourceCollection"].Value<string>() == "unidentifiedBillsOfLading")
                    result.Issues.Add(new ValidationIssue
                    {
                        Code = BillWorkflowCodes.UnidentifiedBill,
                        FieldPath = "BillOfLadingNumber",
                        Message = BillWorkflowMessages.UnidentifiedBill
                    });
                if (billJson != null && billJson.Length > MaxJsonCharacters)
                    throw Invalid(BillWorkflowCodes.BillTooLarge, BillWorkflowMessages.BillTooLarge);
                var source = ReadToken(billJson) as JObject;
                var knownFields = new HashSet<string>(typeof(BillOfLading).GetProperties().Select(p => p.Name),
                    StringComparer.OrdinalIgnoreCase);
                if (source == null || !source.Properties().Any(p => knownFields.Contains(p.Name)))
                    throw Invalid(BillWorkflowCodes.InvalidBillShape, BillWorkflowMessages.BillShapeRequired);
                if (source.Properties().GroupBy(p => p.Name, StringComparer.OrdinalIgnoreCase).Any(g => g.Count() > 1))
                    throw Invalid(BillWorkflowCodes.DuplicateBillField, BillWorkflowMessages.DuplicateBillField);
                var containers = source.GetValue("Containers", StringComparison.OrdinalIgnoreCase);
                if (containers != null && containers.Type != JTokenType.Null)
                {
                    var array = containers as JArray;
                    if (array == null || array.Count > MaxContainersPerBill || array.Any(c => !(c is JObject)))
                        throw Invalid(BillWorkflowCodes.InvalidContainers, BillWorkflowMessages.InvalidContainers);
                }
                var serializer = JsonSerializer.Create(new JsonSerializerSettings
                {
                    DateParseHandling = DateParseHandling.None,
                    FloatParseHandling = FloatParseHandling.Decimal,
                    Culture = System.Globalization.CultureInfo.InvariantCulture
                });
                serializer.Error += (sender, args) =>
                {
                    result.Issues.Add(new ValidationIssue
                    {
                        Code = BillWorkflowCodes.InvalidFieldValue,
                        FieldPath = args.ErrorContext.Path,
                        Message = BillWorkflowMessages.InvalidFieldValue
                    });
                    args.ErrorContext.Handled = true;
                };
                result.Bill = source.ToObject<BillOfLading>(serializer);
                if (result.Bill == null)
                    throw Invalid(BillWorkflowCodes.InvalidBillShape, BillWorkflowMessages.BillUnreadable);
                if (result.Bill.Containers == null) result.Bill.Containers = new List<Container>();
            }
            catch (DocumentReviewException error)
            {
                result.Bill = null;
                result.Issues.Add(new ValidationIssue { Code = error.Code, FieldPath = "", Message = error.Message });
            }
            catch (JsonException)
            {
                result.Bill = null;
                result.Issues.Add(new ValidationIssue
                {
                    Code = BillWorkflowCodes.InvalidBillJson, FieldPath = "", Message = BillWorkflowMessages.BillJsonMalformed
                });
            }
            return result;
        }

        private static JToken ReadToken(string json)
        {
            if (string.IsNullOrWhiteSpace(json)) throw new JsonReaderException();
            using (var input = new StringReader(json))
            using (var reader = new JsonTextReader(input))
            {
                reader.DateParseHandling = DateParseHandling.None;
                reader.FloatParseHandling = FloatParseHandling.Decimal;
                reader.MaxDepth = 64;
                var token = JToken.ReadFrom(reader, new JsonLoadSettings
                {
                    DuplicatePropertyNameHandling = DuplicatePropertyNameHandling.Error
                });
                if (reader.Read()) throw new JsonReaderException();
                return token;
            }
        }

        private static DocumentReviewException Invalid(string code, string message)
        {
            return new DocumentReviewException(DocumentReviewFailure.InvalidInput, code, message);
        }
    }
}

using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using BillWorkflow.Common.Abstractions;
using BillWorkflow.Common.Contracts;
using BillWorkflow.Common.Exceptions;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using BillWorkflow.Common.Validation;

namespace BillWorkflow.Common.Extraction
{
    /// <summary>
    /// Reads extraction format 1: one BillOfLading object or an array of bills.
    /// A future format 2 with a different structure should have its own adapter.
    /// </summary>
    public class BillOfLadingJsonAdapter : IBillExtractionAdapter<IReadOnlyList<BillReview>>
    {
        public const int MaxBills = 200;
        public const int MaxJsonCharacters = 2 * 1024 * 1024;
        public const int MaxContainersPerBill = 1000;

        public string ProfileCode { get { return "bill-of-lading-v1"; } }

        public IReadOnlyList<BillReview> Read(string extractionJson)
        {
            if (string.IsNullOrWhiteSpace(extractionJson) || extractionJson.Length > MaxJsonCharacters)
                throw Invalid(BillWorkflowCodes.BillsRequired, BillWorkflowMessages.BillsRequired);

            try
            {
                JToken root;
                using (var input = new StringReader(extractionJson))
                using (var reader = new JsonTextReader(input))
                {
                    reader.DateParseHandling = DateParseHandling.None;
                    reader.FloatParseHandling = FloatParseHandling.Decimal;
                    reader.MaxDepth = 64;
                    root = JToken.ReadFrom(reader, new JsonLoadSettings
                    {
                        DuplicatePropertyNameHandling = DuplicatePropertyNameHandling.Error
                    });
                    if (reader.Read())
                        throw Invalid(BillWorkflowCodes.InvalidBillJson, BillWorkflowMessages.BillJsonSingleRootRequired);
                }

                var objects = root as JArray;
                if (objects == null && root is JObject)
                    objects = new JArray(root);
                if (objects == null || objects.Count == 0 || objects.Count > MaxBills)
                    throw Invalid(BillWorkflowCodes.InvalidBillList, BillWorkflowMessages.InvalidBillList);

                var result = new List<BillReview>();
                var knownFields = new HashSet<string>(
                    typeof(BillOfLading).GetProperties().Select(p => p.Name),
                    StringComparer.OrdinalIgnoreCase);
                for (var index = 0; index < objects.Count; index++)
                {
                    var source = objects[index] as JObject;
                    if (source == null || !source.Properties().Any(p => knownFields.Contains(p.Name)))
                        throw Invalid(BillWorkflowCodes.InvalidBillShape, BillWorkflowMessages.BillShapeRequired);
                    if (source.Properties().GroupBy(p => p.Name, StringComparer.OrdinalIgnoreCase)
                        .Any(group => group.Count() > 1))
                        throw Invalid(BillWorkflowCodes.DuplicateBillField, BillWorkflowMessages.DuplicateBillField);

                    var containers = source.GetValue("Containers", StringComparison.OrdinalIgnoreCase);
                    if (containers != null && containers.Type != JTokenType.Null)
                    {
                        var array = containers as JArray;
                        if (array == null || array.Count > MaxContainersPerBill || array.Any(c => !(c is JObject)))
                            throw Invalid(BillWorkflowCodes.InvalidContainers,
                                BillWorkflowMessages.InvalidContainers);
                    }

                    var billReview = new BillReview
                    {
                        SourceIndex = index,
                        OriginalJson = source.ToString(Formatting.None)
                    };
                    var serializer = JsonSerializer.Create(new JsonSerializerSettings
                    {
                        DateParseHandling = DateParseHandling.None,
                        Culture = System.Globalization.CultureInfo.InvariantCulture
                    });
                    serializer.Error += (sender, args) =>
                    {
                        billReview.Issues.Add(new ValidationIssue
                        {
                            Code = BillWorkflowCodes.InvalidFieldValue,
                            FieldPath = args.ErrorContext.Path,
                            Message = BillWorkflowMessages.InvalidFieldValue
                        });
                        args.ErrorContext.Handled = true;
                    };
                    billReview.Bill = source.DeepClone().ToObject<BillOfLading>(serializer);
                    if (billReview.Bill == null)
                        throw Invalid(BillWorkflowCodes.InvalidBillShape, BillWorkflowMessages.BillUnreadable);
                    if (billReview.Bill.Containers == null)
                        billReview.Bill.Containers = new List<Container>();
                    result.Add(billReview);
                }
                return result;
            }
            catch (JsonException)
            {
                throw Invalid(BillWorkflowCodes.InvalidBillJson, BillWorkflowMessages.BillJsonMalformed);
            }
        }

        private static DocumentReviewException Invalid(string code, string message)
        {
            return new DocumentReviewException(DocumentReviewFailure.InvalidInput, code, message);
        }
    }
}

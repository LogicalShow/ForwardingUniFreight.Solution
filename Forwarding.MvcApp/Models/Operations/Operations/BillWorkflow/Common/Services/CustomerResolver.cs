using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using BillWorkflow.Common.Abstractions;
using BillWorkflow.Common.Contracts;
using BillWorkflow.Common.Exceptions;
using BillWorkflow.Common.Validation;

namespace BillWorkflow.Common.Services
{
    public class CustomerResolver : IReferenceResolver
    {
        public const int MaximumNameLength = 500;
        public const decimal MinimumSuggestionScore = 75m;
        private const int MaximumSuggestions = 3;
        private const decimal MinimumWordSimilarity = 80m;
        private static readonly HashSet<string> GenericCompanyWords = new HashSet<string>
        {
            "CORPORATION", "CORP", "COMPANY", "CO", "LIMITED", "LTD", "LLC", "INC", "INCORPORATED",
            "INDUSTRIES", "INTERNATIONAL", "TRADING", "BEHALF", "FZE", "THE", "AND", "FOR", "OF"
        };
        private readonly ICustomerDirectory customers;

        public CustomerResolver(ICustomerDirectory customers)
        {
            if (customers == null) throw new ArgumentNullException("customers");
            this.customers = customers;
        }

        public ReferenceMatchResult Resolve(BillLookupRequirement requirement, BillContext context, int actingUserId)
        {
            if (requirement == null || context == null)
                throw new ArgumentNullException(BillWorkflowMessages.LookupInputsRequired);
            if (requirement.ResolverKey != "Customer" ||
                (requirement.SourceParty != "Shipper" && requirement.SourceParty != "Consignee"))
                throw new DocumentReviewException(DocumentReviewFailure.InvalidInput,
                    BillWorkflowCodes.UnsupportedCustomerLookup, BillWorkflowMessages.UnsupportedCustomerLookup);

            var result = new ReferenceMatchResult();
            var name = requirement.SearchValue;
            if (!HasUsableName(name))
                return result;

            // This query checks the complete eligible scope before any fuzzy candidate limit.
            var exact = customers.FindExactMatches(name, requirement.SourceParty, context, actingUserId)
                .GroupBy(c => c.Id).Select(group => group.First()).ToList();
            if (exact.Count == 1 && IsStrictExact(name, exact[0]))
            {
                var aliasMatch = !IsStrictExact(name, exact[0].Name) && !IsStrictExact(name, exact[0].LocalName);
                result.ResolutionMethod = aliasMatch ? ResolutionMethod.AutomaticAliasMatch : ResolutionMethod.AutomaticExactMatch;
                result.Match = new ReferenceOption { Id = exact[0].Id, Name = exact[0].Name, LocalName = exact[0].LocalName };
                return result;
            }

            if (exact.Count > 1)
            {
                result.Candidates = RankCandidates(name, exact, false);
                return result;
            }

            var search = customers.FindCandidates(name, requirement.SourceParty, context, actingUserId);
            result.CandidateSearchLimited = search.IsLimited;
            result.Candidates = RankCandidates(name, exact.Concat(search.Customers), true);
            return result;
        }

        public static bool HasUsableName(string name)
        {
            return !string.IsNullOrWhiteSpace(name) && name.Length <= MaximumNameLength && name.Any(char.IsLetterOrDigit);
        }

        // Shared by retrieval and ranking; original names and strict exact matching stay unchanged.
        public static List<string> GetMeaningfulWords(string name)
        {
            return NormalizeForSuggestions(name).Split(new[] { ' ' }, StringSplitOptions.RemoveEmptyEntries)
                .Where(word => !IsGenericCompanyWord(word)).Distinct().ToList();
        }

        private static bool IsGenericCompanyWord(string word)
        {
            if (GenericCompanyWords.Contains(word)) return true;
            // Recognize a single missing, extra or wrong letter in long generic words, e.g. CORPRATION.
            // Short words stay exact so distinctive names are not discarded by loose comparisons.
            if (word.Length < 6) return false;
            return GenericCompanyWords.Any(generic => generic.Length >= 7 &&
                Math.Abs(word.Length - generic.Length) <= 1 && LevenshteinDistance(word, generic) <= 1);
        }

        private bool IsStrictExact(string name, CustomerRecord customer)
        {
            // Case and outer ASCII spaces only. Punctuation, accents and company words remain significant.
            return IsStrictExact(name, customer.Name) || IsStrictExact(name, customer.LocalName) || IsAliasMatch(name, customer);
        }

        private bool IsAliasMatch(string name, CustomerRecord customer)
        {
            return !string.IsNullOrEmpty(customer.MatchedAlias) &&
                CustomerAliasRules.Normalize(name) == CustomerAliasRules.Normalize(customer.MatchedAlias);
        }

        private bool IsStrictExact(string left, string right)
        {
            return right != null && string.Equals(left.Trim(' '), right.Trim(' '), StringComparison.OrdinalIgnoreCase);
        }

        private List<ReferenceCandidate> RankCandidates(string name, IEnumerable<CustomerRecord> records,
            bool applyMinimumScore)
        {
            return records
                .GroupBy(customer => customer.Id)
                .Select(group => CreateCandidate(name, group.First()))
                .Where(candidate =>
                    !applyMinimumScore ||
                    candidate.Score >= MinimumSuggestionScore)
                .OrderByDescending(candidate => candidate.Score)
                .ThenBy(candidate => candidate.Id)
                .Take(MaximumSuggestions)
                .ToList();
        }

        private ReferenceCandidate CreateCandidate(string name, CustomerRecord customer)
        {
            var nameScore = CalculateSimilarity(name, customer.Name);
            var localScore = CalculateSimilarity(name, customer.LocalName);
            var aliasMatch = IsAliasMatch(name, customer);
            string matchedField;
            if (IsStrictExact(name, customer.Name)) matchedField = "Name";
            else if (IsStrictExact(name, customer.LocalName)) matchedField = "LocalName";
            else if (aliasMatch) matchedField = "Alias";
            else matchedField = nameScore >= localScore ? "Name" : "LocalName";
            return new ReferenceCandidate
            {
                Id = customer.Id,
                Name = customer.Name,
                LocalName = customer.LocalName,
                Score = aliasMatch ? 100m : Math.Max(nameScore, localScore),
                MatchedField = matchedField
            };
        }

        private decimal CalculateSimilarity(string left, string right)
        {
            var first = NormalizeForSuggestions(left);
            var second = NormalizeForSuggestions(right);
            if (first.Length == 0 || second.Length == 0) return 0;
            if (first == second) return 100;

            var firstWords = GetMeaningfulWords(first);
            var secondWords = GetMeaningfulWords(second);
            if (firstWords.Count == 0 || secondWords.Count == 0) return 0;

            var meaningfulNameScore = CalculateEditSimilarity(string.Join(" ", firstWords), string.Join(" ", secondWords));
            var wordScore = CalculateWordSimilarity(firstWords, secondWords);
            var meaningfulScore = Math.Max(meaningfulNameScore, wordScore);
            // Shared company words must not rescue a weak match between the meaningful parts.
            if (meaningfulScore < MinimumSuggestionScore) return meaningfulScore;
            return Math.Max(meaningfulScore, CalculateEditSimilarity(first, second));
        }

        private decimal CalculateWordSimilarity(List<string> first, List<string> second)
        {
            var shorter = first.Count <= second.Count ? first : second;
            var longer = first.Count <= second.Count ? second : first;
            var remaining = longer.ToList();
            decimal total = 0;
            // Match exact words first; each candidate word may contribute only once.
            foreach (var word in shorter.OrderByDescending(value => longer.Contains(value)))
            {
                var bestScore = 0m;
                var bestIndex = -1;
                for (var index = 0; index < remaining.Count; index++)
                {
                    var other = remaining[index];
                    decimal score = 0;
                    if (word == other) score = 100;
                    else if (word.Length >= 4 && other.Length >= 4)
                        score = CalculateEditSimilarity(word, other);
                    if (score >= MinimumWordSimilarity && score > bestScore)
                    {
                        bestScore = score;
                        bestIndex = index;
                    }
                }
                if (bestIndex >= 0) remaining.RemoveAt(bestIndex);
                total += bestScore;
            }
            // Extra words lower the suggestion's rank without hiding a shared distinctive name.
            var coverage = (decimal)shorter.Count / longer.Count;
            return Math.Round(total / shorter.Count * (0.9m + 0.1m * coverage), 2);
        }

        private decimal CalculateEditSimilarity(string first, string second)
        {
            var distance = LevenshteinDistance(first, second);
            return Math.Round(100m * (1m - (decimal)distance / Math.Max(first.Length, second.Length)), 2);
        }

        private static string NormalizeForSuggestions(string value)
        {
            var result = new StringBuilder();
            foreach (var character in value ?? "")
            {
                if (char.IsLetterOrDigit(character)) result.Append(char.ToUpperInvariant(character));
                else if (result.Length > 0 && result[result.Length - 1] != ' ') result.Append(' ');
            }
            return result.ToString().TrimEnd();
        }

        private static int LevenshteinDistance(string first, string second)
        {
            var previous = Enumerable.Range(0, second.Length + 1).ToArray();
            var current = new int[second.Length + 1];
            for (var row = 1; row <= first.Length; row++)
            {
                current[0] = row;
                for (var column = 1; column <= second.Length; column++)
                {
                    var substitution = previous[column - 1] + (first[row - 1] == second[column - 1] ? 0 : 1);
                    current[column] = Math.Min(Math.Min(previous[column] + 1, current[column - 1] + 1), substitution);
                }
                var swap = previous;
                previous = current;
                current = swap;
            }
            return previous[second.Length];
        }
    }
}

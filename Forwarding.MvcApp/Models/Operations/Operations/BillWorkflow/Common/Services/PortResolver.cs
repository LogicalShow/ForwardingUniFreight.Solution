using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using BillWorkflow.Common.Abstractions;
using BillWorkflow.Common.Contracts;
using BillWorkflow.Common.Exceptions;
using BillWorkflow.Common.Validation;

namespace BillWorkflow.Common.Services
{
    public class PortResolver : IReferenceResolver
    {
        public const int MaximumSearchLength = 500;
        public const decimal MinimumSuggestionScore = 75m;
        private const int MaximumSuggestions = 3;
        private readonly IPortDirectory ports;

        public PortResolver(IPortDirectory ports)
        {
            if (ports == null) throw new ArgumentNullException("ports");
            this.ports = ports;
        }

        public ReferenceMatchResult Resolve(BillLookupRequirement requirement, BillContext context, int actingUserId)
        {
            if (requirement == null || context == null)
                throw new ArgumentNullException(BillWorkflowMessages.LookupInputsRequired);
            if (requirement.ResolverKey != "Port" ||
                (requirement.Role != "PortOfLoading" && requirement.Role != "PortOfDischarge"))
                throw new DocumentReviewException(DocumentReviewFailure.InvalidInput,
                    BillWorkflowCodes.UnsupportedPortLookup, BillWorkflowMessages.UnsupportedPortLookup);

            var result = new ReferenceMatchResult();
            var value = requirement.SearchValue;
            // A missing scanned value still allows the user to select an eligible ID manually.
            if (!HasSearchValue(value)) return result;

            var exact = ports.FindExactMatches(value.Trim(), context, actingUserId)
                .GroupBy(port => port.Id).Select(group => group.First()).ToList();
            if (exact.Count == 1 && IsStrictExact(value, exact[0]))
            {
                result.Match = new ReferenceOption
                {
                    Id = exact[0].Id, Code = exact[0].Code, Name = exact[0].Name, LocalName = exact[0].LocalName
                };
                var aliasMatch = !IsStrictExact(value, exact[0].Code) &&
                    !IsStrictExact(value, exact[0].Name) && !IsStrictExact(value, exact[0].LocalName);
                result.ResolutionMethod = aliasMatch ? ResolutionMethod.AutomaticAliasMatch : ResolutionMethod.AutomaticExactMatch;
                return result;
            }
            if (exact.Count > 1)
            {
                result.Candidates = RankCandidates(value, exact, false);
                return result;
            }

            var search = ports.FindCandidates(value.Trim(), context, actingUserId);
            result.CandidateSearchLimited = search.IsLimited;
            // Approximate names are suggestions only. Never fuzzy-match a port code into an accepted ID.
            result.Candidates = RankCandidates(value, exact.Concat(search.Ports), true);
            return result;
        }

        public static bool HasSearchValue(string value)
        {
            return !string.IsNullOrWhiteSpace(value) && value.Length <= MaximumSearchLength && value.Any(char.IsLetterOrDigit);
        }

        // Shared by candidate retrieval and ranking; customer company-word rules do not apply to ports.
        public static List<string> GetSearchWords(string value)
        {
            return NormalizeForSuggestions(value).Split(new[] { ' ' }, StringSplitOptions.RemoveEmptyEntries)
                .Where(word => word != "PORT" && word != "OF" && word != "THE")
                .Distinct().ToList();
        }

        private static bool IsStrictExact(string value, PortRecord port)
        {
            return IsStrictExact(value, port.Code) || IsStrictExact(value, port.Name) ||
                IsStrictExact(value, port.LocalName) || IsAliasMatch(value, port);
        }

        private static bool IsStrictExact(string left, string right)
        {
            return right != null && string.Equals(left.Trim(' '), right.Trim(' '), StringComparison.OrdinalIgnoreCase);
        }

        private static bool IsAliasMatch(string value, PortRecord port)
        {
            return !string.IsNullOrEmpty(port.MatchedAlias) &&
                ReferenceAliasRules.Normalize(value) == ReferenceAliasRules.Normalize(port.MatchedAlias);
        }

        private static List<ReferenceCandidate> RankCandidates(string value, IEnumerable<PortRecord> records,
            bool applyMinimumScore)
        {
            return records.GroupBy(port => port.Id).Select(group => CreateCandidate(value, group.First()))
                .Where(candidate => !applyMinimumScore || candidate.Score >= MinimumSuggestionScore)
                .OrderByDescending(candidate => candidate.Score).ThenBy(candidate => candidate.Id)
                .Take(MaximumSuggestions).ToList();
        }

        private static ReferenceCandidate CreateCandidate(string value, PortRecord port)
        {
            var nameScore = CalculateSimilarity(value, port.Name);
            var localScore = CalculateSimilarity(value, port.LocalName);
            var aliasMatch = IsAliasMatch(value, port);
            string matchedField;
            if (IsStrictExact(value, port.Code)) matchedField = "Code";
            else if (IsStrictExact(value, port.Name)) matchedField = "Name";
            else if (IsStrictExact(value, port.LocalName)) matchedField = "LocalName";
            else if (aliasMatch) matchedField = "Alias";
            else matchedField = nameScore >= localScore ? "Name" : "LocalName";
            return new ReferenceCandidate
            {
                Id = port.Id, Code = port.Code, Name = port.Name, LocalName = port.LocalName,
                Score = IsStrictExact(value, port) ? 100m : Math.Max(nameScore, localScore), MatchedField = matchedField
            };
        }

        private static decimal CalculateSimilarity(string value, string candidate)
        {
            var inputWords = GetSearchWords(value);
            var candidateWords = GetSearchWords(candidate);
            var input = string.Join(" ", inputWords);
            var target = string.Join(" ", candidateWords);
            if (input.Length == 0 || target.Length == 0) return 0m;
            var score = 100m * (1m - (decimal)LevenshteinDistance(input, target) / Math.Max(input.Length, target.Length));
            // A complete distinctive name inside a longer port label is useful, but still needs confirmation.
            if (inputWords.Any(word => word.Length >= 4) && inputWords.All(candidateWords.Contains))
                score = Math.Max(score, 85m);
            return score;
        }

        private static string NormalizeForSuggestions(string value)
        {
            var result = new StringBuilder();
            foreach (var character in (value ?? "").Normalize(NormalizationForm.FormD))
            {
                if (CharUnicodeInfo.GetUnicodeCategory(character) == UnicodeCategory.NonSpacingMark) continue;
                result.Append(char.IsLetterOrDigit(character) ? char.ToUpperInvariant(character) : ' ');
            }
            return result.ToString();
        }

        private static int LevenshteinDistance(string left, string right)
        {
            var previous = Enumerable.Range(0, right.Length + 1).ToArray();
            for (var row = 1; row <= left.Length; row++)
            {
                var current = new int[right.Length + 1];
                current[0] = row;
                for (var column = 1; column <= right.Length; column++)
                    current[column] = Math.Min(Math.Min(current[column - 1] + 1, previous[column] + 1),
                        previous[column - 1] + (left[row - 1] == right[column - 1] ? 0 : 1));
                previous = current;
            }
            return previous[right.Length];
        }
    }
}

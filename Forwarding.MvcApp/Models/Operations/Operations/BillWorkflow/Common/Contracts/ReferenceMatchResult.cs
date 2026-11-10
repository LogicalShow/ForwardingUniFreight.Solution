using System.Collections.Generic;

namespace BillWorkflow.Common.Contracts
{
    public class ReferenceMatchResult
    {
        public ReferenceMatchResult()
        {
            Candidates = new List<ReferenceCandidate>();
        }

        public ReferenceOption Match { get; set; }
        public ResolutionMethod? ResolutionMethod { get; set; }
        public List<ReferenceCandidate> Candidates { get; set; }
        public bool CandidateSearchLimited { get; set; }
    }

    public class ReferenceCandidate
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string LocalName { get; set; }
        public decimal Score { get; set; }
        public string MatchedField { get; set; }
    }
}

using System.Collections.Generic;

namespace BillWorkflow.Common.Contracts
{
    public class BillReviewPage
    {
        public BillReviewPage()
        {
            Items = new List<BillReviewDetails>();
        }

        public int Page { get; set; }
        public int PageSize { get; set; }
        public int TotalCount { get; set; }
        public List<BillReviewDetails> Items { get; set; }

        internal bool ReviewStarted { get; set; }
        internal BillContext Context { get; set; }
    }
}

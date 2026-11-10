using System;
using System.Collections.Generic;

namespace BillWorkflow.Common.Contracts
{
    public class DocumentReviewSummary
    {
        public Guid DocumentReviewId { get; set; }
        public List<BillReviewSummary> BillReviews { get; set; }
    }

    public class BillReviewSummary
    {
        public Guid BillReviewId { get; set; }
        public int Version { get; set; }
        public string BillOfLadingNumber { get; set; }
        public string ShipperName { get; set; }
        public string ConsigneeName { get; set; }
        public string PortOfLoading { get; set; }
        public string PortOfDischarge { get; set; }
        public int ContainerCount { get; set; }
    }
}

namespace BillWorkflow.Common.Contracts
{
    public class SubmitReferenceStepResult
    {
        public BillReviewProgress Progress { get; set; }
        public BillReferenceResolution NextResolution { get; set; }
    }
}

using System;
using WH_ReceiveDetailsOLD = Forwarding.MvcApp.Models.Warehousing.Transactions.Generated.Old;

namespace Forwarding.MvcApp.Entities.Warehousing
{
    [Serializable]
    public class CPKWH_ReceiveDetails : WH_ReceiveDetailsOLD.CPKWH_ReceiveDetails
    {
    }
    [Serializable]
    public partial class CVarWH_ReceiveDetails : WH_ReceiveDetailsOLD.CVarWH_ReceiveDetails
    {
        // initialize propety here 
        public CVarWH_ReceiveDetails()
        {
            this.BatchNumber = "0";
            this.ExpirationDate = DateTime.Parse("01-01-1900");
            this.ImportedBy = "0";
            this.WeightInTons = 0;
        }
    }

    public partial class CWH_ReceiveDetails : WH_ReceiveDetailsOLD.CWH_ReceiveDetails
    {

    }
}
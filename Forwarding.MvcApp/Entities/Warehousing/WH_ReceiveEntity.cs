using System;
using WH_ReceiveOLD = Forwarding.MvcApp.Models.Warehousing.Transactions.Generated.Old;

namespace Forwarding.MvcApp.Entities.Warehousing
{
    [Serializable]
    public class CPKWH_Receive : WH_ReceiveOLD.CPKWH_Receive
    {
    }
    [Serializable]
    public partial class CVarWH_Receive : WH_ReceiveOLD.CVarWH_Receive
    {
        // initialize propety here 
        public CVarWH_Receive()
        {
            //this.BatchNumber = "0";
        }
    }

    public partial class CWH_Receive : WH_ReceiveOLD.CWH_Receive
    {

    }
}
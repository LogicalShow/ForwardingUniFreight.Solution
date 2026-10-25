using System;
using Q = Forwarding.MvcApp.Models.Quotations.Quotations.Generated.Old;
namespace Forwarding.MvcApp.Entities.Quotations
{
    [Serializable]
    public class CPKQuotationRoute : Q.CPKQuotationRoute
    {
  
    }
    [Serializable]
    public partial class CVarQuotationRoute : Q.CVarQuotationRoute
    {
        // initialize propety here 
        public CVarQuotationRoute()
        {
            this.ClearancePortID = 0;
            this.POLID_Transport = 0;
            this.ClientPlantID = 0;
            this.PickupPlaceID = 0;
            
        }
    }

    public partial class CQuotationRoute : Q.CQuotationRoute
    {
       
    }


}
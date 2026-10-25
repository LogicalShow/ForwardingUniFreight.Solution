using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

using Q = Forwarding.MvcApp.Models.Quotations.Quotations.Generated.Old;
namespace Forwarding.MvcApp.Entities.Quotations
{
    [Serializable]
    public class CPKQuotationCharges : Q.CPKQuotationCharges
    {
        
    }
    [Serializable]
    public partial class CVarQuotationCharges : Q.CVarQuotationCharges
    {
        public CVarQuotationCharges()
        {
            this.AdditionalAmount = 0;
        }
    }

    public partial class CQuotationCharges :Q.CQuotationCharges
    {
        
    }
}

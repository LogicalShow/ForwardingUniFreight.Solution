using Forwarding.MvcApp.Models.SC.MasterData.Generated;
using Forwarding.MvcApp.Models.Accounting.MasterData.Generated;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;
using Forwarding.MvcApp.Models.MasterData.Invoicing.Generated;
using Forwarding.MvcApp.Models.Operations.Operations.Generated;
using Forwarding.MvcApp.Models.SC.Transactions.Generated;
using Forwarding.MvcApp.Models.SC.Transactions.Customized;
using MoreLinq;
using Forwarding.MvcApp.Models.ReceiptsAndPayments.Transactions.Generated;

namespace Forwarding.MvcApp.Controllers.SC.API_SC_Transactions
{
    public class VoucherInvoicesPaymentController : ApiController
    {
        [HttpGet, HttpPost]
        [AllowAnonymous]
        public object[] InsertA_VoucherInvoicesPayment([FromBody]string pItems)
        {
            var _result = false;
            // Deserialize List -------------------------------------------------------------------------------
            var Listobj = new JavaScriptSerializer().Deserialize<List<CVarA_VoucherInvoicesPayment>>(pItems);
            CA_VoucherInvoicesPayment cA_VoucherInvoicesPayment = new CA_VoucherInvoicesPayment();
            var checkException = cA_VoucherInvoicesPayment.SaveMethod(Listobj);
            //------------------------------
            if (checkException == null)
                _result = true;

            return new object[] {
                _result , pItems
            };
        }


        
    }






}



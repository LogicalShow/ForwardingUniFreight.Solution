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
using Forwarding.MvcApp.Models.SL.SL_Transactions.Generated;
using Forwarding.MvcApp.Models.MasterData.Invoicing.Generated;
using Forwarding.MvcApp.Models.Accounting.Transactions.Generated;
using Forwarding.MvcApp.Models.FA.Generated;
using Forwarding.MvcApp.Models.Administration.Settings.Generated;
using Forwarding.MvcApp.Models.NoAccess.Generated;
using Forwarding.MvcApp.Models.Customized;
using Forwarding.MvcApp.Models.Accounting.MasterData.Customized;

namespace Forwarding.MvcApp.Controllers.MasterData.API_Invoicing
{
    public class FA_DestructionsStopsPeriodController : ApiController
    {
  
        
[HttpGet, HttpPost]
[AllowAnonymous]
public object[] InsertItems([FromBody]string pItems)
{
    var _result = false;
   //  Deserialize List -------------------------------------------------------------------------------
    var Listobj = new JavaScriptSerializer().Deserialize<List<CVarFA_DestructionsStopsPeriod>>(pItems);
            CFA_DestructionsStopsPeriod cCFA_DestructionsStopsPeriod = new CFA_DestructionsStopsPeriod();
    var checkException = cCFA_DestructionsStopsPeriod.SaveMethod(Listobj);
          //  Listobj[0].
  //  ------------------------------
    if (checkException == null)
        _result = true;

    return new object[] {
        _result, pItems
    };
}






        [HttpGet, HttpPost]
        public Object[] LoadFA_DestructionsStopsPeriod(string pGroupID, string pSubAccountID, string pParentSubAccountID, string pAssetID)
        {
            if (pGroupID == "0")
            {
                CFA_DestructionsStopsPeriod FA_DestructionsStopsPeriods = new CFA_DestructionsStopsPeriod();
                FA_DestructionsStopsPeriods.GetList(" where AssetID = " + pAssetID + "");
                return new Object[] { new JavaScriptSerializer().Serialize(FA_DestructionsStopsPeriods.lstCVarFA_DestructionsStopsPeriod) };
            }
            else
            {
                CFA_GetGroupDestructions cFA_GetGroupDestructions = new CFA_GetGroupDestructions();
                cFA_GetGroupDestructions.GetList(int.Parse(pGroupID), int.Parse(pSubAccountID), int.Parse(pParentSubAccountID));
                return new Object[] { new JavaScriptSerializer().Serialize(cFA_GetGroupDestructions.lstCVarFA_GetGroupDestructions) };

            }
        }





    }
}

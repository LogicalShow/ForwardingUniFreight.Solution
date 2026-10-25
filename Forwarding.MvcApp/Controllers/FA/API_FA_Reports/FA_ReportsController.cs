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
using Forwarding.MvcApp.Models.PS.PS_Transactions.Generated;
using Forwarding.MvcApp.Models.MasterData.Invoicing.Generated;
using Forwarding.MvcApp.Models.MasterData.Partners.Generated;
using Forwarding.MvcApp.Models.NoAccess.Generated;
using Forwarding.MvcApp.Models.Administration.Settings.Generated;
using Forwarding.MvcApp.Helpers;
using System.Data;
using MoreLinq;
using Forwarding.MvcApp.Models.FA.Generated;

namespace Forwarding.MvcApp.Controllers.MasterData.API_Invoicing
{
    public class FA_ReportsController : ApiController
    {

        [HttpGet, HttpPost]
        public Object[] IntializeData() //pID : AccountID
        {
            CFA_GetGroupsTree objCFA_AssetsGroups = new CFA_GetGroupsTree();
            CBranches objCFA_AssetsBranches = new CBranches();
            CFA_Departments objCFA_AssetsDepartments = new CFA_Departments();
            CDevisons objCDevisons = new CDevisons();

                objCFA_AssetsGroups.GetList("Where GroupID <> 0 order by  GroupID, OrderID ");
                objCFA_AssetsBranches.GetList("Where ID IN( Select BranchID from FA_UserBranches  where UserID = " + WebSecurity.CurrentUserId + ") ");
                objCFA_AssetsDepartments.GetList("where 1=1");
                objCDevisons.GetList("where 1=1");
            
            return new Object[] {

               
                 new JavaScriptSerializer().Serialize(objCFA_AssetsBranches.lstCVarBranches),
                 new JavaScriptSerializer().Serialize(objCFA_AssetsDepartments.lstCVarFA_Departments),
                   new JavaScriptSerializer().Serialize(objCDevisons.lstCVarDevisons),
                    new JavaScriptSerializer().Serialize(objCFA_AssetsGroups.lstCVarFA_GetGroupsTree)

            };

        }





    }
}

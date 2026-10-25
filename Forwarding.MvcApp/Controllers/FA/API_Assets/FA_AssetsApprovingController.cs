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
using Forwarding.MvcApp.Models.FA.Generated;

namespace Forwarding.MvcApp.Controllers.SC.API_SC_Transactions
{
    public class FA_AssetsApprovingController : ApiController
    {

        [HttpGet, HttpPost]
        public Object[] LoadWithPaging(Int32 pPageNumber, Int32 pPageSize, string pSearchKey)
        {
            CvwFA_Assets cFA_Assets = new CvwFA_Assets();
            Int32 _RowCount = 0;

            pSearchKey = (pSearchKey == null ? "" : pSearchKey.Trim().ToUpper());
            string whereClause = " Where isnull( IsExcluded , 0 ) = 0 and  isnull(Approved , 0 ) = 0  and  ( vwFA_Assets.Name LIKE '%" + pSearchKey + "%' "
                + " OR vwFA_Assets.BarCode LIKE '%" + pSearchKey + "%' ) AND vwFA_Assets.BranchID  IN( Select ub.BranchID from FA_UserBranches ub where ub.UserID = " + WebSecurity.CurrentUserId + ") ";

            cFA_Assets.GetListPaging(pPageSize, pPageNumber, whereClause, " ID Desc ", out _RowCount);

            return new Object[] { new JavaScriptSerializer().Serialize(cFA_Assets.lstCVarvwFA_Assets), _RowCount };
        }

        [HttpGet, HttpPost]
        public object[] Approve(string pSelectedIDs, DateTime pDate, string pApproved)
        {
            //---------------------------------------------------------------------------------------------------
            var _Result = false;
            var ErrorMessage = "";

            CFA_ApproveAssets cFA_Approve = new CFA_ApproveAssets();

            var Exception = cFA_Approve.GetListApproveAssets(","+pSelectedIDs+",", WebSecurity.CurrentUserId, bool.Parse(pApproved));

            if (Exception==null)
            {
                Exception = cFA_Approve.GetList(pSelectedIDs, WebSecurity.CurrentUserId, pDate, bool.Parse(pApproved));

            }

            //CFA_Assets cFA_Assets = new CFA_Assets();
            //var Exception = cFA_Assets.UpdateList(" Approved = 1 where ID IN(" + pSelectedIDs + ")");


            if (Exception != null)
                ErrorMessage = Exception.Message; //cSC_PostingGoodsIssue.lstCVarSC_PostingGoodsIssueVouchers[0].ErrMessage;


            if (ErrorMessage.Trim() == "")
            {
                _Result = true;

            }



            return new Object[] { _Result, ErrorMessage };
        }

    }






}



using Forwarding.MvcApp.Models.ReceiptsAndPayments.Custodies.Generated;
using Forwarding.MvcApp.Models.Customized;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;
using Forwarding.MvcApp.Models.Administration.Security.Generated;

namespace Forwarding.MvcApp.Controllers.Accounting.API_MasterData
{
    public class CustudyBalanceController : ApiController
    {
        [HttpGet, HttpPost]
        public object[] LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned(bool pIsLoadArrayOfObjects, string pLanguage, Int32 pPageNumber, Int32 pPageSize, string pWhereClause, string pOrderBy)
        {
            int _RowCount = 0;
            CvwCustodyBalance objCvwCustodyBalance = new CvwCustodyBalance();
            string pWhereClauseWithMinimalColumns = "WHERE 1=1 ";
            CUsers objCUsers = new CUsers();
            objCUsers.GetListPaging(999999, 1, "WHERE ID=" + WebSecurity.CurrentUserId, "ID", out _RowCount);
            if (!objCUsers.lstCVarUsers[0].IsAccessAllCharges)
                pWhereClauseWithMinimalColumns += " AND  UserID=" + objCUsers.lstCVarUsers[0].ID + "";

            objCvwCustodyBalance.GetListPaging(pPageSize, pPageNumber, pWhereClauseWithMinimalColumns, pOrderBy, out _RowCount);

            return new object[] {
                new JavaScriptSerializer().Serialize(objCvwCustodyBalance.lstCVarvwCustodyBalance)
                , _RowCount
            };
        }

        //[HttpGet, HttpPost]
        //public bool Insert(string pName)
        //{
        //    bool _result = false;

        //    CVarvwCustodyBalance objCVarvwCustodyBalance = new CVarvwCustodyBalance();

        //    objCVarvwCustodyBalance.Name = pName.ToUpper();
        //    objCVarvwCustodyBalance.USER_ID = WebSecurity.CurrentUserId;

        //    CvwCustodyBalance objCvwCustodyBalance = new CvwCustodyBalance();
        //    objCvwCustodyBalance.lstCVarvwCustodyBalance.Add(objCVarvwCustodyBalance);
        //    Exception checkException = objCvwCustodyBalance.SaveMethod(objCvwCustodyBalance.lstCVarvwCustodyBalance);
        //    if (checkException != null) // an exception is caught in the model
        //    {
        //        if (checkException.Message.Contains("UNIQUE"))
        //            _result = false;
        //    }
        //    else
        //    { //not unique
        //        _result = true;
        //        //CallCustomizedSP
        //        CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
        //        objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "vwCustodyBalance", objCVarvwCustodyBalance.ID, "I");
        //    }
        //    return _result;
        //}

        //[HttpGet, HttpPost]
        //public bool Update(Int32 pID, string pName)
        //{
        //    bool _result = false;

        //    CVarvwCustodyBalance objCVarvwCustodyBalance = new CVarvwCustodyBalance();

        //    objCVarvwCustodyBalance.ID = pID;
        //    objCVarvwCustodyBalance.Name = pName.ToUpper();
        //    objCVarvwCustodyBalance.USER_ID = WebSecurity.CurrentUserId;

        //    CvwCustodyBalance objCvwCustodyBalance = new CvwCustodyBalance();
        //    objCvwCustodyBalance.lstCVarvwCustodyBalance.Add(objCVarvwCustodyBalance);
        //    Exception checkException = objCvwCustodyBalance.SaveMethod(objCvwCustodyBalance.lstCVarvwCustodyBalance);
        //    if (checkException != null) // an exception is caught in the model
        //    {
        //        if (checkException.Message.Contains("UNIQUE"))
        //            _result = false;
        //    }
        //    else
        //    { //not unique
        //        _result = true;
        //        CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
        //        objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "vwCustodyBalance", pID, "U");
        //    }
        //    return _result;
        //}

        //[HttpGet, HttpPost]
        //public bool Delete(String pJournalTypesIDs)
        //{
        //    bool _result = true;
        //    CvwCustodyBalance objCvwCustodyBalance = new CvwCustodyBalance();
        //    Exception checkException = null;
        //    foreach (var currentID in pJournalTypesIDs.Split(','))
        //    {
        //        objCvwCustodyBalance.lstDeletedCPKvwCustodyBalance.Add(new CPKvwCustodyBalance() { ID = Int32.Parse(currentID.Trim()) });
        //        checkException = objCvwCustodyBalance.DeleteItem(objCvwCustodyBalance.lstDeletedCPKvwCustodyBalance);
        //        if (checkException != null)
        //            _result = false;
        //        else
        //        {
        //            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
        //            objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "vwCustodyBalance", Int32.Parse(currentID.Trim()), "D");
        //        }

        //    }

        //    return _result;
        //}

    }
}

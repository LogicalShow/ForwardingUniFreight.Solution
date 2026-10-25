using Forwarding.MvcApp.Models.Accounting.MasterData.Generated;
using Forwarding.MvcApp.Models.Customized;
using Forwarding.MvcApp.Models.ReceiptsAndPayments.ShipLink.Generated;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;

namespace Forwarding.MvcApp.Controllers.ReceiptsAndPayments.ShipLink
{
    public class ShipLinkInvoiceTypeToJournalController : ApiController
    {
        [HttpGet, HttpPost]
        public object[] LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned(bool pIsLoadArrayOfObjects, string pLanguage, Int32 pPageNumber, Int32 pPageSize, string pWhereClause, string pOrderBy)
        {
            int _RowCount = 0;
            CvwA_Accounts objCvwA_Accounts = new CvwA_Accounts();
            CA_JournalTypes objCA_JournalTypes = new CA_JournalTypes();
            CA_JVTypes objCA_JVTypes = new CA_JVTypes();
            CvwSL_InvoiceType objCInvoiceType = new CvwSL_InvoiceType();
            CvwLine objCLine = new CvwLine();
            if (pIsLoadArrayOfObjects)
            {
                objCInvoiceType.GetListPaging(9999, 1, "WHERE 1=1", "Name", out _RowCount);
                objCvwA_Accounts.GetListPaging(9999, 1, "WHERE IsMain=0", "Name, Code", out _RowCount);
                objCA_JournalTypes.GetListPaging(9999, 1, "WHERE 1=1", "Name", out _RowCount);
                objCA_JVTypes.GetListPaging(9999, 1, "WHERE 1=1", "Name", out _RowCount);
                objCLine.GetListPaging(9999, 1, "WHERE 1=1", "Name", out _RowCount);
            }

            CvwSL_LinkingInvoiceTypeJournal objCvwSL_LinkingInvoiceTypeJournal = new CvwSL_LinkingInvoiceTypeJournal();
            objCvwSL_LinkingInvoiceTypeJournal.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);

            return new object[] {
                new JavaScriptSerializer().Serialize(objCvwSL_LinkingInvoiceTypeJournal.lstCVarvwSL_LinkingInvoiceTypeJournal)
                , _RowCount
                , pIsLoadArrayOfObjects ? new JavaScriptSerializer().Serialize(objCvwA_Accounts.lstCVarvwA_Accounts) : null //pAccounts = pData[2]
                , pIsLoadArrayOfObjects ? new JavaScriptSerializer().Serialize(objCA_JournalTypes.lstCVarA_JournalTypes) : null //pJournalTypes = pData[3]
                , pIsLoadArrayOfObjects ? new JavaScriptSerializer().Serialize(objCA_JVTypes.lstCVarA_JVTypes) : null //pJVTypes = pData[4]
                , pIsLoadArrayOfObjects ? new JavaScriptSerializer().Serialize(objCInvoiceType.lstCVarvwSL_InvoiceType) : null //pInvoiceTypes = pData[5]
                ,pIsLoadArrayOfObjects  ? new JavaScriptSerializer().Serialize(objCLine.lstCVarvwLine) : null //PLine = pData[6]
            };
        }

        [HttpGet, HttpPost]
        public object[] Save(Int32 pID, Int32 pInvoiceTypeID, Int32 pJournalTypeID, Int32 pJVTypeID, Int32 pAccountID,Int32 pSubAccountID,Int32 pLineID)
        {
            bool _result = false;
            Exception checkException = null;
            CSL_LinkingInvoiceTypeJournal objCSL_LinkingInvoiceTypeJournal = new CSL_LinkingInvoiceTypeJournal();
            CVarSL_LinkingInvoiceTypeJournal objCVarSL_LinkingInvoiceTypeJournal = new CVarSL_LinkingInvoiceTypeJournal();
            #region Insert
            if (pID == 0) //Insert
            {
                objCVarSL_LinkingInvoiceTypeJournal.InvoiceTypeID = pInvoiceTypeID;
                objCVarSL_LinkingInvoiceTypeJournal.JournalTypeID = pJournalTypeID;
                objCVarSL_LinkingInvoiceTypeJournal.JVTypeID = pJVTypeID;
                objCVarSL_LinkingInvoiceTypeJournal.AccountID = pAccountID;
                objCVarSL_LinkingInvoiceTypeJournal.SubAccountID = pSubAccountID;
                objCVarSL_LinkingInvoiceTypeJournal.LineID = pLineID;

                objCSL_LinkingInvoiceTypeJournal.lstCVarSL_LinkingInvoiceTypeJournal.Add(objCVarSL_LinkingInvoiceTypeJournal);
                checkException = objCSL_LinkingInvoiceTypeJournal.SaveMethod(objCSL_LinkingInvoiceTypeJournal.lstCVarSL_LinkingInvoiceTypeJournal);
                if (checkException == null) // an exception is caught in the model
                {
                    _result = true;
                    //CallCustomizedSP
                    CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
                    objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "SL_LinkingInvoiceTypeJournal", objCVarSL_LinkingInvoiceTypeJournal.ID, "I");
                }
            }
            #endregion Insert
            #region Update
            else //Update
            {
                string pUpdateClause = "";
                pUpdateClause += (pInvoiceTypeID == 0 ? ("InvoiceTypeID=null") : ("InvoiceTypeID=" + pInvoiceTypeID)) + "\n";
                pUpdateClause += (pJournalTypeID == 0 ? (",JournalTypeID=null") : (",JournalTypeID=" + pJournalTypeID)) + "\n";
                pUpdateClause += (pJVTypeID == 0 ? (",JVTypeID=null") : (",JVTypeID=" + pJVTypeID)) + "\n";
                pUpdateClause += (pAccountID == 0 ? (",AccountID=null") : (",AccountID=" + pAccountID)) + "\n";
                pUpdateClause += (pSubAccountID == 0 ? (",SubAccountID=null") : (",SubAccountID=" + pSubAccountID)) + "\n";
                pUpdateClause += (pLineID == 0 ? (",LineID=null") : (",LineID=" + pLineID)) + "\n";

                pUpdateClause += "WHERE ID=" + pID + "\n";
                checkException = objCSL_LinkingInvoiceTypeJournal.UpdateList(pUpdateClause);
                if (checkException == null) // an exception is caught in the model
                {
                    _result = true;
                    //CallCustomizedSP
                    CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
                    objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "SL_LinkingInvoiceTypeJournal", pID, "U");
                }
            }
            #endregion Update
            return new object[]
                {
                    _result
                };
        }

        [HttpGet, HttpPost]
        public bool Delete(String pIDs)
        {
            bool _result = true;
            CSL_LinkingInvoiceTypeJournal objCSL_LinkingInvoiceTypeJournal = new CSL_LinkingInvoiceTypeJournal();
            Exception checkException = null;
            foreach (var currentID in pIDs.Split(','))
            {
                objCSL_LinkingInvoiceTypeJournal.lstDeletedCPKSL_LinkingInvoiceTypeJournal.Add(new CPKSL_LinkingInvoiceTypeJournal() { ID = Int32.Parse(currentID.Trim()) });
                checkException = objCSL_LinkingInvoiceTypeJournal.DeleteItem(objCSL_LinkingInvoiceTypeJournal.lstDeletedCPKSL_LinkingInvoiceTypeJournal);
                if (checkException != null)
                    _result = false;
                else
                {
                    CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
                    objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "SL_LinkingInvoiceTypeJournal", Int32.Parse(currentID.Trim()), "D");
                }
            }
            return _result;
        }

    }
}

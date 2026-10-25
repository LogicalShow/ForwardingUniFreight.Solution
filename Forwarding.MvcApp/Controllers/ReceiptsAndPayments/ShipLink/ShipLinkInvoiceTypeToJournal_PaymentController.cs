using Forwarding.MvcApp.Models.Accounting.MasterData.Generated;
using Forwarding.MvcApp.Models.Customized;
using Forwarding.MvcApp.Models.ReceiptsAndPayments.ShipLink.Generated;
using Forwarding.MvcApp.Models.ReceiptsAndPayments.ShipLink.Customized;
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
    public class ShipLinkInvoiceTypeToJournal_PaymentController : ApiController
    {
        [HttpGet, HttpPost]
        public object[] LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned(bool pIsLoadArrayOfObjects, string pLanguage, Int32 pPageNumber, Int32 pPageSize, string pWhereClause, string pOrderBy)
        {
            int _RowCount = 0;
            CvwA_Accounts objCvwA_Accounts = new CvwA_Accounts();
            CA_JournalTypes objCA_JournalTypes = new CA_JournalTypes();
            CA_JVTypes objCA_JVTypes = new CA_JVTypes();
            CvwSL_InvoiceType objCInvoiceType = new CvwSL_InvoiceType();
            if (pIsLoadArrayOfObjects)
            {
                objCInvoiceType.GetListPaging(9999, 1, "WHERE 1=1", "Name", out _RowCount);
                objCvwA_Accounts.GetListPaging(9999, 1, "WHERE IsMain=0", "Name, Code", out _RowCount);
                objCA_JournalTypes.GetListPaging(9999, 1, "WHERE 1=1", "Name", out _RowCount);
                objCA_JVTypes.GetListPaging(9999, 1, "WHERE 1=1", "Name", out _RowCount);
            }
            CvwSL_LinkingInvoiceTypeJournal_Payment objCvwSL_LinkingInvoiceTypeJournal_Payment = new CvwSL_LinkingInvoiceTypeJournal_Payment();
            objCvwSL_LinkingInvoiceTypeJournal_Payment.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);

            return new object[] {
                new JavaScriptSerializer().Serialize(objCvwSL_LinkingInvoiceTypeJournal_Payment.lstCVarvwSL_LinkingInvoiceTypeJournal_Payment)
                , _RowCount
                , pIsLoadArrayOfObjects ? new JavaScriptSerializer().Serialize(objCvwA_Accounts.lstCVarvwA_Accounts) : null //pAccounts = pData[2]
                , pIsLoadArrayOfObjects ? new JavaScriptSerializer().Serialize(objCA_JournalTypes.lstCVarA_JournalTypes) : null //pJournalTypes = pData[3]
                , pIsLoadArrayOfObjects ? new JavaScriptSerializer().Serialize(objCA_JVTypes.lstCVarA_JVTypes) : null //pJVTypes = pData[4]
                , pIsLoadArrayOfObjects ? new JavaScriptSerializer().Serialize(objCInvoiceType.lstCVarvwSL_InvoiceType) : null //pInvoiceTypes = pData[5]
            };
        }

        [HttpGet, HttpPost]
        public object[] Save(Int32 pID, Int32 pInvoiceTypeID, Int32 pJournalTypeID, Int32 pJVTypeID, Int32 pAccountID, Int32 pSubAccountID)
        {
            bool _result = false;
            Exception checkException = null;
            CSL_LinkingInvoiceTypeJournal_Payment objCSL_LinkingInvoiceTypeJournal_Payment = new CSL_LinkingInvoiceTypeJournal_Payment();
            CVarSL_LinkingInvoiceTypeJournal_Payment objCVarSL_LinkingInvoiceTypeJournal_Payment = new CVarSL_LinkingInvoiceTypeJournal_Payment();
            #region Insert
            if (pID == 0) //Insert
            {
                objCVarSL_LinkingInvoiceTypeJournal_Payment.InvoiceTypeID = pInvoiceTypeID;
                objCVarSL_LinkingInvoiceTypeJournal_Payment.JournalTypeID = pJournalTypeID;
                objCVarSL_LinkingInvoiceTypeJournal_Payment.JVTypeID = pJVTypeID;
                objCVarSL_LinkingInvoiceTypeJournal_Payment.AccountID = pAccountID;
                objCVarSL_LinkingInvoiceTypeJournal_Payment.SubAccountID = pSubAccountID;

                objCSL_LinkingInvoiceTypeJournal_Payment.lstCVarSL_LinkingInvoiceTypeJournal_Payment.Add(objCVarSL_LinkingInvoiceTypeJournal_Payment);
                checkException = objCSL_LinkingInvoiceTypeJournal_Payment.SaveMethod(objCSL_LinkingInvoiceTypeJournal_Payment.lstCVarSL_LinkingInvoiceTypeJournal_Payment);
                if (checkException == null) // an exception is caught in the model
                {
                    _result = true;
                    //CallCustomizedSP
                    CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
                    objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "SL_LinkingInvoiceTypeJournal_Payment", objCVarSL_LinkingInvoiceTypeJournal_Payment.ID, "I");
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

                pUpdateClause += "WHERE ID=" + pID + "\n";
                checkException = objCSL_LinkingInvoiceTypeJournal_Payment.UpdateList(pUpdateClause);
                if (checkException == null) // an exception is caught in the model
                {
                    _result = true;
                    //CallCustomizedSP
                    CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
                    objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "SL_LinkingInvoiceTypeJournal_Payment", pID, "U");
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
            CSL_LinkingInvoiceTypeJournal_Payment objCSL_LinkingInvoiceTypeJournal_Payment = new CSL_LinkingInvoiceTypeJournal_Payment();
            Exception checkException = null;
            foreach (var currentID in pIDs.Split(','))
            {
                objCSL_LinkingInvoiceTypeJournal_Payment.lstDeletedCPKSL_LinkingInvoiceTypeJournal_Payment.Add(new CPKSL_LinkingInvoiceTypeJournal_Payment() { ID = Int32.Parse(currentID.Trim()) });
                checkException = objCSL_LinkingInvoiceTypeJournal_Payment.DeleteItem(objCSL_LinkingInvoiceTypeJournal_Payment.lstDeletedCPKSL_LinkingInvoiceTypeJournal_Payment);
                if (checkException != null)
                    _result = false;
                else
                {
                    CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
                    objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "SL_LinkingInvoiceTypeJournal_Payment", Int32.Parse(currentID.Trim()), "D");
                }
            }
            return _result;
        }

    }
}

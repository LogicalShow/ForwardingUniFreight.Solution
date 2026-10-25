using Forwarding.MvcApp.Entities.Operations;
using Forwarding.MvcApp.Models.OperAcc.Generated;
using Forwarding.MvcApp.Models.Administration.Settings.Generated;
using Forwarding.MvcApp.Models.CustomizedSPCall;
using Forwarding.MvcApp.Models.MasterData.Invoicing.Generated;
using Forwarding.MvcApp.Models.NoAccess.Generated;
using Forwarding.MvcApp.Models.Operations.Operations.Generated;
using Forwarding.MvcApp.Models.Quotations.Quotations.Generated;
using System;
using System.Linq;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;
using Forwarding.MvcApp.Models.Administration.Security.Generated;
using Forwarding.MvcApp.Models.Accounting.MasterData.Generated;
using Forwarding.MvcApp.Models.MasterData.Partners.Generated;
using Forwarding.MvcApp.Models.MasterData.BanksAccountsAndTreasuries.Generated;
using Forwarding.MvcApp.Models.MasterData.Others.Generated;
using Forwarding.MvcApp.Models.SC.MasterData.Generated;
using Forwarding.MvcApp.Models.SL.SL_Transactions.Generated;
using Forwarding.MvcApp.Models.PricingModule.PricingTab;
using Forwarding.MvcApp.Models.LocalEmails.Generated;
using Forwarding.MvcApp.Models.Customized;
using System.Data;
using Forwarding.MvcApp.Models.Operations.Operations.Customized;
using Forwarding.MvcApp.Models.Quotations.Quotations.Generated.Old;
using Forwarding.MvcApp.Models.ReceiptsAndPayments.Custodies.Generated;
using Forwarding.MvcApp.Models.Fleet_Forwarding_Integration.Payables.Customized;

namespace Forwarding.MvcApp.Controllers.Operations.API_Operations
{
    public class PayableUnderProcessApprovalController : ApiController
    {


   
        [HttpGet, HttpPost]
        public Object[] CheckIfApprovedOrNot(string pIDs/*, bool IsPayNotRec*/)
        {
            var AllIsUnApproved = true;

            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();

            //if (IsPayNotRec)
            //{
            var PayablesList = objCCustomizedDBCall.ExecuteQuery_ListOfObjects(
            "SELECT IsApproved FROM Payables WHERE ID IN ( " + pIDs + " ) "
            , typeof(CVarPayables)).Cast<CVarPayables>().ToList();

            foreach (var payable in PayablesList)
            {
                if (payable.IsApproved)
                {
                    AllIsUnApproved = false;
                }
            }
            //}
            //else
            //{
            //    var ReceivablesList = objCCustomizedDBCall.ExecuteQuery_ListOfObjects(
            //    "SELECT IsApproved FROM Receivables WHERE ID IN ( " + pIDs + " ) "
            //    , typeof(CVarReceivables)).Cast<CVarReceivables>().ToList();

            //    foreach (var receivable in ReceivablesList)
            //    {
            //        if (receivable.IsApproved)
            //        {
            //            AllIsUnApproved = false;
            //        }
            //    }
            //}


            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[] {
                AllIsUnApproved
            };
        }

        [HttpGet, HttpPost]
        public object[] LoadWithWhereClause(Int32 pPageNumber, Int32 pPageSize, string pWhereClause)
        {
            #region DepartmentCharge Case
            Int32 _RowCount = 0;
            CDefaults objCDefaults = new CDefaults();
            CUsers objCUsers = new CUsers();
            objCDefaults.GetListPaging(999999, 1, "WHERE 1=1", "ID", out _RowCount);
            objCUsers.GetListPaging(999999, 1, "WHERE  ID=" + WebSecurity.CurrentUserId, "ID", out _RowCount);
            if (!objCUsers.lstCVarUsers[0].IsAccessAllCharges)
                pWhereClause += " AND ChargeTypeID IN (SELECT ChargeTypeID FROM DepartmentCharge WHERE DepartmentID=" + objCUsers.lstCVarUsers[0].DepartmentID + ") \n";
            #endregion DepartmentCharge Case
            string pOrderBy = "ViewOrder,ChargeTypeName";
            if (objCDefaults.lstCVarDefaults[0].UnEditableCompanyName == "NEW")
                pOrderBy = "IssueDate,ChargeTypeName";
            CvwPayables objCvwPayables = new CvwPayables();
            //pSearchKey here is the where clause
            objCvwPayables.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[] { serializer.Serialize(objCvwPayables.lstCVarvwPayables), _RowCount };
        }

        [HttpGet, HttpPost]
        public Object[] LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned(bool pIsLoadArrayOfObjects, Int32 pPageNumber, Int32 pPageSize, string pWhereClause, string pOrderBy)
        {
            Int32 _RowCount = 0;
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };

            //COperations objCOperations = new COperations();
            //objCOperations.GetListPaging(2000, 1, "WHERE CreationDate > DATEADD(mm,DATEDIFF(mm,0,GETDATE())-12,0) ", " ID DESC ", out _RowCount);
            CvwOperationsWithMinimalColumns objCOperations = new CvwOperationsWithMinimalColumns();
            //objCOperations.GetListPaging(2000, 1, "WHERE 1=1 ", " ID DESC ", out _RowCount);

            CNoAccessPartnerTypes objCNoAccessPartnerTypes = new CNoAccessPartnerTypes();
            objCNoAccessPartnerTypes.GetList(" WHERE 1=1 ");

            CvwAccPartners objCvwAccPartners = new CvwAccPartners();
            objCvwAccPartners.GetListFilter(" WHERE 1=1 ORDER BY PartnerTypeID, Name ");

            CNoAccessPaymentType objCNoAccessPaymentType = new CNoAccessPaymentType();
            objCNoAccessPaymentType.GetList(" WHERE IsInactive=0 ORDER BY Name ");

            CvwA_CostCenters objCvwA_CostCenters = new CvwA_CostCenters();


            CTreasury objCTreasury = new CTreasury();
            objCTreasury.GetList("Where 1=1");

            CBankAccount objBankAccount = new CBankAccount();
            objBankAccount.GetList("where 1=1");

            CvwA_Accounts objCvwA_Accounts = new CvwA_Accounts();
            objCvwA_Accounts.GetListPaging(9999, 1, "WHERE IsMain=0", "Name, Code", out _RowCount);

            CvwPayables objCvwPayables = new CvwPayables();

            CvwDefaults objCvwDefaults = new CvwDefaults();
            objCvwDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount); //i am sure i ve just one row isa
            string CompanyName = objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName;
            if (CompanyName == "BED")
            {
                objCvwA_CostCenters.GetListPaging(9999, 1, "WHERE IsMain=0 and id NOT IN ( SELECT a.CostCenterID FROM A_LinkOperationWithCostCenter a JOIN Operations AS o ON o.ID=a.OperationID WHERE o.OperationStageID IN(110,120))", "Name, Code", out _RowCount);
                objCvwPayables.GetListPaging(pPageSize, pPageNumber, pWhereClause + " AND CostAmount >0", pOrderBy, out _RowCount);
            }
            else
            {
                objCvwA_CostCenters.GetListPaging(9999, 1, "WHERE IsMain=0", "Name, Code", out _RowCount);
                objCvwPayables.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);

            }



            return new Object[] {
                serializer.Serialize(objCvwPayables.lstCVarvwPayables)
                , _RowCount
                , pIsLoadArrayOfObjects ? serializer.Serialize(objCvwAccPartners.lstCVarvwAccPartners) : null //data[2]
                , pIsLoadArrayOfObjects ? serializer.Serialize(objCOperations.lstCVarvwOperationsWithMinimalColumns) : null //data[3]
                , pIsLoadArrayOfObjects ?serializer.Serialize(objCNoAccessPaymentType.lstCVarNoAccessPaymentType) : null //data[4]
                , pIsLoadArrayOfObjects ? serializer.Serialize(objCNoAccessPartnerTypes.lstCVarNoAccessPartnerTypes) : null //data[5]
                , pIsLoadArrayOfObjects ? serializer.Serialize(objCvwA_CostCenters.lstCVarvwA_CostCenters) : null //data[6]
                , pIsLoadArrayOfObjects ? serializer.Serialize(objCTreasury.lstCVarTreasury) : null //data[7]
                , pIsLoadArrayOfObjects ? serializer.Serialize(objBankAccount.lstCVarBankAccount) : null //data[8]
                , pIsLoadArrayOfObjects ? serializer.Serialize(objCvwA_Accounts.lstCVarvwA_Accounts) : null //data[9]
            };
        }

        [HttpGet, HttpPost]
        public Object[] OperationPayableApproval_PartnerTypeChanged(Int32 pPartnerTypeID, string pWhereClause, string pOrderBy, Int32 pPageNumber, Int32 pPageSize)
        {
            int _RowCount = 0;
            Exception checkException = null;
            CvwAccPartners objCvwAccPartners = new CvwAccPartners();
            CvwPayables objCvwPayables = new CvwPayables();

            if (pPartnerTypeID != 0)
                checkException = objCvwAccPartners.GetListPaging(10000, 1, "WHERE PartnerTypeID=" + pPartnerTypeID, "Name", out _RowCount);
            checkException = objCvwPayables.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[]
            {
                serializer.Serialize(objCvwPayables.lstCVarvwPayables)
                , _RowCount
                , new JavaScriptSerializer().Serialize(objCvwAccPartners.lstCVarvwAccPartners)
            };
        }


        [HttpGet, HttpPost] //the pCustodyID is different from the one CustodyAsOperationPartnerSupplier
        public object[] ApproveOrUnApprove(string pIDsToSetApproval, bool pIsApprove, Int32 pCustodyID, Int32 pCostCenterID, Int32 pSafeID, Int32 pBankID, bool pIsOneJV, DateTime pJVDate
            , Int32 pPaymentAccountID, Int32 pPaymentSubAccountID, bool pIsPayment, bool pIsPaymentSupplierCustdy, string pWhereClause, string pIDsCostCenter, Int32 pPageSize, Int32 pPageNumber, string pOrderBy)
        {
            bool _result = false;
            Exception checkException = null;
            string _ReturnedMessage = "";
            CPayables objCPayables = new CPayables();
            CvwPayables objCvwPayables = new CvwPayables();

            int _RowCount = 0;
            //those 2 lines are to get the Charge types from DB
            CDefaults objCDefaults = new CDefaults();
            objCDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount); //i am sure i ve just one row isa

            //Approve or unapprove according to pIsApprove
            Int32 NumberOfPayables = pIDsToSetApproval.Split(',').Count();
            var ArrPayablesIDs = pIDsToSetApproval.Split(',');

            #region Call ERP JV Entry (They approve just one at a time)
            if (_ReturnedMessage == "")
            {
                CGroups objCGroups = new CGroups();
                objCGroups.GetList("WHERE GroupImageURL=N'Accounting'");
                if (!objCGroups.lstCVarGroups[0].IsInactive)
                {
                    CCallCustomizedSP objCCallCustomizedSP = new CCallCustomizedSP();
                    checkException = objCCallCustomizedSP.CallCustomizedSP_MultiIDsWithSafeAndBankMulti("ERP_ForwWeb_PostingExpenseMultiJVs_UnderProcessFirst", ("," + pIDsToSetApproval + ","), WebSecurity.CurrentUserId, pIsApprove, pCostCenterID, pSafeID, pBankID, pJVDate, pPaymentAccountID, pPaymentSubAccountID, pIsPayment, pIsPaymentSupplierCustdy, ("," + pIDsCostCenter + ","),true);

                }
                #endregion Call ERP JV Entry

            } //EOF if (objCDefaults.lstCVarDefaults[0].UnEditableCompanyName == "GBL")
            if (checkException == null && _ReturnedMessage == "")
            {
                _result = true;
                objCvwPayables.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);
            }
            else if (checkException != null) //otherwise _ReturnedMessage is set for GBL SupplierInvNo posted before
                _ReturnedMessage = checkException.Message;

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                _result
                , serializer.Serialize(objCvwPayables.lstCVarvwPayables)
                , _result ? "" : _ReturnedMessage
            };
        }

        public Int32 GetPartnerID(Int32 pCheckedPartnerTypeID, Int32 pReceivedPartnerTypeID, Int32 pPartnerID)
        {
            if (pCheckedPartnerTypeID == pReceivedPartnerTypeID)
                return pPartnerID;
            else
                return 0;
        }

    }

}

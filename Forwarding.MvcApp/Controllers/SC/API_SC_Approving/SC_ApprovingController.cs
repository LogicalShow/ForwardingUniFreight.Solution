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
using Forwarding.MvcApp.Models.Administration.Security.Generated;
using Forwarding.MvcApp.Models.Administration.Settings.Customized;
using Forwarding.MvcApp.Models.MasterData.Partners.Generated;
using Forwarding.MvcApp.Models.Administration.Settings.Generated;
using Forwarding.MvcApp.Models.Customized;

namespace Forwarding.MvcApp.Controllers.SC.API_SC_Transactions
{
    public class SC_ApprovingController : ApiController
    {
        [HttpGet, HttpPost]
        public Object[] IntializeData()
        {
            var serialize = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
          
                //CSC_Stores cSC_Stores = new CSC_Stores();
                //cSC_Stores.GetList("where 1 = 1");
                //----
                //CPurchaseItem cPurchaseItem = new CPurchaseItem();
                //cPurchaseItem.GetList("where 1 = 1");
                //----
                CPurchaseInvoice cPurchaseInvoice = new CPurchaseInvoice();
                cPurchaseInvoice.GetList("where 1 = 1");
                //---
                CvwSC_TransactionsTypes cvwSC_TransactionsTypes = new CvwSC_TransactionsTypes();

            CSuppliers cSuppliers = new CSuppliers();
            cSuppliers.GetList("where 1 = 1 order by Name");
            var CurrentUserID = WebSecurity.CurrentUserId;
                cvwSC_TransactionsTypes.GetList("Where (ID <> 30 AND ( N',' + ApprovedUsersIDs + N','  ) LIKE N'%,"+ CurrentUserID + ",%') or ID = 90 ");

            CvwA_Accounts objCvwA_Accounts = new CvwA_Accounts();
            int _RowCount2 = 0;
            objCvwA_Accounts.GetListPaging(9999, 1, "WHERE IsMain=0", "Name, Code", out _RowCount2);


            return new Object[] { "", serialize.Serialize(cPurchaseInvoice.lstCVarPurchaseInvoice) ,
                    serialize.Serialize(cvwSC_TransactionsTypes.lstCVarvwSC_TransactionsTypes),
                    "" ,  serialize.Serialize(cSuppliers.lstCVarSuppliers),serialize.Serialize(objCvwA_Accounts.lstCVarvwA_Accounts) 
                };
           
        }
        [HttpGet, HttpPost]
        public Object[] GetSC_UserTransactionTypesApprovalWithUserID(string pUserID)
        {
            var serialize = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            CvwSC_UserTransactionTypesApproval cvwSC_UserTransactionTypesApproval = new CvwSC_UserTransactionTypesApproval();
            cvwSC_UserTransactionTypesApproval.GetList("where UserID = "+ pUserID + "");

            CSC_TransactionsTypes cSC_TransactionsTypes = new CSC_TransactionsTypes();
            cSC_TransactionsTypes.GetList("where 1 = 1");



            return new Object[] {serialize.Serialize(cvwSC_UserTransactionTypesApproval.lstCVarvwSC_UserTransactionTypesApproval)

                ,

                serialize.Serialize(cSC_TransactionsTypes.lstCVarSC_TransactionsTypes)
            };
        }
        [HttpPost]
        //[ActionName("Update")]
        public object[] UpdateUserSC_TransactionTypesApproval([FromBody] UpdateUserTransactionTypeApprovalUserData updateUserData)
        {
            bool _result = false;
            CVarUsers objCVarUsers = new CVarUsers();

            int _RowCount = 0;
            CInsertSC_UserTransactionTypesApprovalList objCInsertSC_UserTransactionTypesApprovalList = new CInsertSC_UserTransactionTypesApprovalList();

            var userid = int.Parse(updateUserData.pID);
            var checkException = objCInsertSC_UserTransactionTypesApprovalList.InsertSC_UserTransactionTypesApprovalList(userid , updateUserData.pTransactionsTypesIDs);



            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else //not unique
            //Resetting the Password in case of update success
            {


                _result = true;

            }
            return new object[] { _result, updateUserData.pID };
        }
        [HttpGet, HttpPost]
        public Object[] LoadWithPaging(Int32 pPageNumber, Int32 pPageSize, string pSearchKey , string pTransactionTypeID)
        {
           // de;
            CSC_Transactions cSC_Transactions = new CSC_Transactions();
            //objCvwSC_Stores.GetList(string.Empty);
            Int32 _RowCount = 0;// objCvwSC_Stores.lstCVarSC_Stores.Count;
         //   "Where TransactionTypeID = 10 AND ( IsDeleted = 0 or IsDeleted IS NULL )"
            cSC_Transactions.GetListPaging(pPageSize, pPageNumber, ("where TransactionTypeID = " + pTransactionTypeID ) + "AND ( IsDeleted = 0 or IsDeleted IS NULL )", " Code desc ", out _RowCount);

            return new Object[] { new JavaScriptSerializer().Serialize(cSC_Transactions.lstCVarSC_Transactions), _RowCount };
        }
        
        [HttpGet, HttpPost]
        public object[] LoadWithWhereClause(Int32 pPageNumber, Int32 pPageSize, string pWhereClause)
        {
            CvwSC_Transactions cvwSC_Transactions = new CvwSC_Transactions();
            Int32 _RowCount = 0;
            cvwSC_Transactions.GetListPaging(pPageSize, pPageNumber, pWhereClause, " ID DESC ", out _RowCount);
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[] { serializer.Serialize(cvwSC_Transactions.lstCVarvwSC_Transactions), _RowCount };
        }

        [HttpGet, HttpPost]
        public object[] Approve(string pSelectedIDs , string pTransactionTypeID , bool pApproved)
        {
            //---------------------------------------------------------------------------------------------------
            var _Result = false;
            var ErrorMessage = "";
            var TransTypeID = int.Parse(pTransactionTypeID);
            if(TransTypeID == 10)
            {
                //CSC_PostingGoodsReceiptNotes cSC_PostingGoods = new CSC_PostingGoodsReceiptNotes();
                //var Exception = cSC_PostingGoods.GetList("," + pSelectedIDs + ",", WebSecurity.CurrentUserId, pApproved);
                //if(Exception != null)
                //ErrorMessage = Exception.Message; //cSC_PostingGoods.lstCVarSC_PostingGoodsReceiptNotes[0].ErrMessage;



                CSC_PostingGoodsReceiptNotes_Invoices cSC_PostingGoods = new CSC_PostingGoodsReceiptNotes_Invoices();
                var Exception = cSC_PostingGoods.GetList("," + pSelectedIDs + ",", WebSecurity.CurrentUserId, pApproved);

                
                if (Exception != null)
                    ErrorMessage = Exception.Message; //cSC_PostingGoods.lstCVarSC_PostingGoodsReceiptNotes[0].ErrMessage;
            }
            else if (TransTypeID == 20)
            {
                CSC_PostingGoodsIssueVouchers cSC_PostingGoodsIssue = new CSC_PostingGoodsIssueVouchers();
                var Exception = cSC_PostingGoodsIssue.GetList("," + pSelectedIDs + ",", WebSecurity.CurrentUserId, pApproved);
                    if (Exception != null)
                    ErrorMessage = Exception.Message; //cSC_PostingGoodsIssue.lstCVarSC_PostingGoodsIssueVouchers[0].ErrMessage;
            }
            else if (TransTypeID == 130)
            {
                CSC_PostingGoodsIssueVouchers cSC_PostingGoodsIssue = new CSC_PostingGoodsIssueVouchers();
                var Exception = cSC_PostingGoodsIssue.GetListWorkOrderReturns("," + pSelectedIDs + ",", WebSecurity.CurrentUserId, pApproved);
                if (Exception != null)
                    ErrorMessage = Exception.Message; //cSC_PostingGoodsIssue.lstCVarSC_PostingGoodsIssueVouchers[0].ErrMessage;
            }
            else if (TransTypeID == 40)// Client Return
            {
                //SC_PostingClientReturn
                //SC_PostingClientReurn_StoreJV
                CSC_PostingClientReturn cSC_PostingClientReturn = new CSC_PostingClientReturn();
                CSC_PostingClientReurn_StoreJV cSC_PostingClientReurn_StoreJV = new CSC_PostingClientReurn_StoreJV();
                var Exception = cSC_PostingClientReturn.GetList("," + pSelectedIDs + ",", WebSecurity.CurrentUserId, pApproved);
                if (Exception == null)
                {
                    Exception = cSC_PostingClientReurn_StoreJV.GetList("," + pSelectedIDs + ",", WebSecurity.CurrentUserId, pApproved);

                    if (Exception != null)
                    {
                        ErrorMessage = Exception.Message;

                        Exception =  cSC_PostingClientReturn.GetList("," + pSelectedIDs + ",", WebSecurity.CurrentUserId, false);


                        if (Exception != null)
                        {
                            ErrorMessage = ErrorMessage + " " + Exception.Message;
                        }


                    }
                    

                }


                if (Exception != null)
                    ErrorMessage = Exception.Message; //cSC_PostingGoodsIssue.lstCVarSC_PostingGoodsIssueVouchers[0].ErrMessage;
            }
            else if (TransTypeID == 50) // Supplier Return
            {

                //SC_PostingSupplierReturn


                CSC_PostingSupplierReturn cSC_PostingSupplierReturn = new CSC_PostingSupplierReturn();
                var Exception = cSC_PostingSupplierReturn.GetList("," + pSelectedIDs + ",", WebSecurity.CurrentUserId, pApproved);
                if (Exception != null)
                    ErrorMessage = Exception.Message; //cSC_PostingGoodsIssue.lstCVarSC_PostingGoodsIssueVouchers[0].ErrMessage;
            }
            else if(TransTypeID == 60 || TransTypeID == 70)
            {
                CSC_Transactions cSC_Transactions = new CSC_Transactions();
                if(pApproved)
                {
                    var Exception = cSC_Transactions.UpdateList(" IsApproved = 1 where ID In("+ pSelectedIDs + ")");
                    if (Exception != null)
                        ErrorMessage = Exception.Message;
                }
                else
                {
                    var Exception = cSC_Transactions.UpdateList(" IsApproved = 0 where ID In(" + pSelectedIDs + ")");
                    if (Exception != null)
                        ErrorMessage = Exception.Message;
                }


            }
            else if (TransTypeID == 80) // Supplier Return
            {
                CSC_PostingStoreTransfer cSC_PostingStoreTransfer = new CSC_PostingStoreTransfer();
                var Exception = cSC_PostingStoreTransfer.GetList("," + pSelectedIDs + ",", WebSecurity.CurrentUserId, pApproved);
                if (Exception != null)
                    ErrorMessage = Exception.Message; //cSC_PostingGoodsIssue.lstCVarSC_PostingGoodsIssueVouchers[0].ErrMessage;
            }
            else if (TransTypeID == 90) // Supplier Return
            {
                CPR_PostingProductionOrders cPR_PostingProductionOrders = new CPR_PostingProductionOrders();
                var Exception = cPR_PostingProductionOrders.GetList("," + pSelectedIDs + ",", WebSecurity.CurrentUserId, pApproved);
                if (Exception != null)
                    ErrorMessage = Exception.Message; //cSC_PostingGoodsIssue.lstCVarSC_PostingGoodsIssueVouchers[0].ErrMessage;
            }
            else if (TransTypeID == 100)
            {
                CSC_PostingInventory cSC_PostingInventory = new CSC_PostingInventory();
                var Exception = cSC_PostingInventory.GetList("," + pSelectedIDs + ",", WebSecurity.CurrentUserId, pApproved);
                if (Exception != null)
                    ErrorMessage = Exception.Message; //cSC_PostingGoodsIssue.lstCVarSC_PostingGoodsIssueVouchers[0].ErrMessage;
            }
            else if (TransTypeID == 110)
            {
                CSC_PostingSettlement cSC_PostingSettelement = new CSC_PostingSettlement();
                var Exception = cSC_PostingSettelement.GetList("," + pSelectedIDs + ",", WebSecurity.CurrentUserId, pApproved);
                if (Exception != null)
                    ErrorMessage = Exception.Message; //cSC_PostingGoodsIssue.lstCVarSC_PostingGoodsIssueVouchers[0].ErrMessage;
            }
            else
            {

            }
            
            if(ErrorMessage.Trim() == "")
            {
                _Result = true;

            }
            


            return new Object[] { _Result, ErrorMessage };
        }
        [HttpGet, HttpPost]
        public object[] ApproveTax(string pSelectedIDs, string pTransactionTypeID, bool pApproved,Int32 pAccountID=0)
        {
            //---------------------------------------------------------------------------------------------------
            var _Result = false;
            var ErrorMessage = "";
            var TransTypeID = int.Parse(pTransactionTypeID);
            CvwDefaults objCDefaults = new CvwDefaults();
            int _RowCount2 = 0;
            objCDefaults.GetListPaging(999999, 1, "WHERE 1=1", "ID", out _RowCount2);
            string CompanyName = objCDefaults.lstCVarvwDefaults[0].UnEditableCompanyName;
            if (TransTypeID == 10)
            {
                //CSC_PostingGoodsReceiptNotes cSC_PostingGoods = new CSC_PostingGoodsReceiptNotes();
                //var Exception = cSC_PostingGoods.GetList("," + pSelectedIDs + ",", WebSecurity.CurrentUserId, pApproved);
                //if(Exception != null)
                //ErrorMessage = Exception.Message; //cSC_PostingGoods.lstCVarSC_PostingGoodsReceiptNotes[0].ErrMessage;



                CSC_PostingGoodsReceiptNotes_Invoices cSC_PostingGoods = new CSC_PostingGoodsReceiptNotes_Invoices();
                var Exception = cSC_PostingGoods.GetList("," + 7778787 + ",", WebSecurity.CurrentUserId, pApproved);

                
                if ((CompanyName == "CHM" || CompanyName == "TRM" || CompanyName == "EGL" || CompanyName == "SWI") && Exception == null)
                {
                    foreach (var currentID in pSelectedIDs.Split(','))
                    {
                        CTaxLink cCTaxLink = new CTaxLink();
                        CTaxLink objCTaxLinkFOUND = new CTaxLink();

                        objCTaxLinkFOUND.GetList("WHERE Notes='GoodsReceiptNotes' and jvid is NOT null and OriginID=" + currentID);

                        cCTaxLink.GetList("where notes='GoodsReceiptNotes' and jvid is null and originid=" + currentID);
                        if (cCTaxLink.lstCVarTaxLink.Count == 0 && objCTaxLinkFOUND.lstCVarTaxLink.Count == 0)
                        {
                            //link
                            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
                            objCCustomizedDBCall.ExecuteQuery_DataTable("insertTaxLink " + currentID + "," + 0 + "," + "GoodsReceiptNotes");
                            cCTaxLink.GetList("where jvid is null and notes='GoodsReceiptNotes' and OriginID =" + currentID);


                        }
                        else if (cCTaxLink.lstCVarTaxLink.Count == 0 && objCTaxLinkFOUND.lstCVarTaxLink.Count > 0 && pApproved == true)
                        {
                            cCTaxLink.GetList("where jvid is null and notes='GoodsReceiptNotes' and OriginID =" + currentID);

                        }
                        else if (pApproved == false)
                        {
                            cCTaxLink.GetList("where jvid is not null and notes='GoodsReceiptNotes' and OriginID =" + currentID);
                        }
                        if (cCTaxLink.lstCVarTaxLink.Count > 0)
                        {
                            Exception = cSC_PostingGoods.GetListTax("," + (cCTaxLink.lstCVarTaxLink.Count > 0 ? cCTaxLink.lstCVarTaxLink[0].OriginID : 0) + ",", WebSecurity.CurrentUserId, pApproved, pAccountID);

                        }



                    }
                }
                if (Exception != null)
                    ErrorMessage = Exception.Message; //cSC_PostingGoods.lstCVarSC_PostingGoodsReceiptNotes[0].ErrMessage;
            }
            else if (TransTypeID == 20)
            {
                if ((CompanyName == "CHM" || CompanyName == "TRM" || CompanyName == "EGL" || CompanyName == "SWI"))
                {
                    foreach (var currentID in pSelectedIDs.Split(','))
                    {
                        CSC_PostingGoodsIssueVouchers cSC_PostingGoodsIssue = new CSC_PostingGoodsIssueVouchers();


                        CTaxLink cCTaxLink = new CTaxLink();
                        CTaxLink objCTaxLinkFOUND = new CTaxLink();

                        objCTaxLinkFOUND.GetList("WHERE Notes='GoodsIssueVouchers' and jvid is NOT null and OriginID=" + currentID);

                        cCTaxLink.GetList("where notes='GoodsIssueVouchers' and jvid is null and originid=" + currentID);
                        if (cCTaxLink.lstCVarTaxLink.Count == 0 && objCTaxLinkFOUND.lstCVarTaxLink.Count == 0)
                        {
                            //link
                            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
                            objCCustomizedDBCall.ExecuteQuery_DataTable("insertTaxLink " + currentID + "," + 0 + "," + "GoodsIssueVouchers");
                            cCTaxLink.GetList("where jvid is null and notes='GoodsIssueVouchers' and OriginID =" + currentID);


                        }
                        else if (cCTaxLink.lstCVarTaxLink.Count == 0 && objCTaxLinkFOUND.lstCVarTaxLink.Count > 0 && pApproved == true)
                        {
                            cCTaxLink.GetList("where jvid is null and notes='GoodsIssueVouchers' and OriginID =" + currentID);

                        }
                        else if (pApproved == false)
                        {
                            cCTaxLink.GetList("where jvid is not null and notes='GoodsIssueVouchers' and OriginID =" + currentID);
                        }
                        //if (cCTaxLink.lstCVarTaxLink.Count > 0)
                        //{


                            var Exception = cSC_PostingGoodsIssue.GetListTax("," + (currentID) + ",", WebSecurity.CurrentUserId, pApproved,pAccountID);
                            if (Exception != null)
                                ErrorMessage = Exception.Message; //cSC_PostingGoodsIssue.lstCVarSC_PostingGoodsIssueVouchers[0].ErrMessage;


                        //}
                    }
                }
            }
            else if (TransTypeID == 40)// Client Return
            {
                //SC_PostingClientReturn
                //SC_PostingClientReurn_StoreJV
                CSC_PostingClientReturn cSC_PostingClientReturn = new CSC_PostingClientReturn();
                CSC_PostingClientReurn_StoreJV cSC_PostingClientReurn_StoreJV = new CSC_PostingClientReurn_StoreJV();
                var Exception = cSC_PostingClientReturn.GetList("," + pSelectedIDs + ",", WebSecurity.CurrentUserId, pApproved);
                if (Exception == null)
                {
                    Exception = cSC_PostingClientReurn_StoreJV.GetList("," + pSelectedIDs + ",", WebSecurity.CurrentUserId, pApproved);

                    if (Exception != null)
                    {
                        ErrorMessage = Exception.Message;

                        Exception = cSC_PostingClientReturn.GetList("," + pSelectedIDs + ",", WebSecurity.CurrentUserId, false);


                        if (Exception != null)
                        {
                            ErrorMessage = ErrorMessage + " " + Exception.Message;
                        }


                    }


                }


                if (Exception != null)
                    ErrorMessage = Exception.Message; //cSC_PostingGoodsIssue.lstCVarSC_PostingGoodsIssueVouchers[0].ErrMessage;
            }
            else if (TransTypeID == 50) // Supplier Return
            {

                //SC_PostingSupplierReturn


                CSC_PostingSupplierReturn cSC_PostingSupplierReturn = new CSC_PostingSupplierReturn();
                var Exception = cSC_PostingSupplierReturn.GetList("," + pSelectedIDs + ",", WebSecurity.CurrentUserId, pApproved);
                if (Exception != null)
                    ErrorMessage = Exception.Message; //cSC_PostingGoodsIssue.lstCVarSC_PostingGoodsIssueVouchers[0].ErrMessage;
            }
            else if (TransTypeID == 60 || TransTypeID == 70)
            {
                CSC_Transactions cSC_Transactions = new CSC_Transactions();
                if (pApproved)
                {
                    var Exception = cSC_Transactions.UpdateList(" IsApproved = 1 where ID In(" + pSelectedIDs + ")");
                    if (Exception != null)
                        ErrorMessage = Exception.Message;
                }
                else
                {
                    var Exception = cSC_Transactions.UpdateList(" IsApproved = 0 where ID In(" + pSelectedIDs + ")");
                    if (Exception != null)
                        ErrorMessage = Exception.Message;
                }


            }
            else if (TransTypeID == 80) // Supplier Return
            {
                CSC_PostingStoreTransfer cSC_PostingStoreTransfer = new CSC_PostingStoreTransfer();
                var Exception = cSC_PostingStoreTransfer.GetList("," + pSelectedIDs + ",", WebSecurity.CurrentUserId, pApproved);
                if (Exception != null)
                    ErrorMessage = Exception.Message; //cSC_PostingGoodsIssue.lstCVarSC_PostingGoodsIssueVouchers[0].ErrMessage;
            }
            else if (TransTypeID == 90) // Supplier Return
            {
                CPR_PostingProductionOrders cPR_PostingProductionOrders = new CPR_PostingProductionOrders();
                var Exception = cPR_PostingProductionOrders.GetList("," + pSelectedIDs + ",", WebSecurity.CurrentUserId, pApproved);
                if (Exception != null)
                    ErrorMessage = Exception.Message; //cSC_PostingGoodsIssue.lstCVarSC_PostingGoodsIssueVouchers[0].ErrMessage;
            }
            else if (TransTypeID == 100)
            {
                CSC_PostingInventory cSC_PostingInventory = new CSC_PostingInventory();
                var Exception = cSC_PostingInventory.GetList("," + pSelectedIDs + ",", WebSecurity.CurrentUserId, pApproved);
                if (Exception != null)
                    ErrorMessage = Exception.Message; //cSC_PostingGoodsIssue.lstCVarSC_PostingGoodsIssueVouchers[0].ErrMessage;
            }
            else if (TransTypeID == 110)
            {
                CSC_PostingSettlement cSC_PostingSettelement = new CSC_PostingSettlement();
                var Exception = cSC_PostingSettelement.GetList("," + pSelectedIDs + ",", WebSecurity.CurrentUserId, pApproved);
                if (Exception != null)
                    ErrorMessage = Exception.Message; //cSC_PostingGoodsIssue.lstCVarSC_PostingGoodsIssueVouchers[0].ErrMessage;
            }
            else
            {

            }

            if (ErrorMessage.Trim() == "")
            {
                _Result = true;

            }



            return new Object[] { _Result, ErrorMessage };
        }


    }


    public class UpdateUserTransactionTypeApprovalUserData
    {
        public string pID { get; set; }
        public string pTransactionsTypesIDs { get; set; }

    }



}



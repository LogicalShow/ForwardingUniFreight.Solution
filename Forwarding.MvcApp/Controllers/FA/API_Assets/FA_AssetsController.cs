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
using System.Globalization;
using Forwarding.MvcApp.Models.SC.Transactions.Generated;
using Forwarding.MvcApp.Models.PS.PS_Transactions.Generated;

namespace Forwarding.MvcApp.Controllers.MasterData.API_Invoicing
{
    public class FA_AssetsController : ApiController
    {
  

        [HttpGet, HttpPost]
        public Object[] IntializeData(string pID , string pDate , string IsCurrency) //pID : AccountID
        {
            if (pID == null)
                pID = "0"; 
            CFA_GetGroupsTree objCFA_AssetsGroups = new CFA_GetGroupsTree();
            CBranches objCFA_AssetsBranches = new CBranches();
            CFA_Departments objCFA_AssetsDepartments = new CFA_Departments();
            CDevisons objCDevisons = new CDevisons();
            CvwCurrencyDetails cvwCurrencyDetails = new CvwCurrencyDetails();


            CvwSC_TransactionsHeaderDetails cvwSC_TransactionsHeaderDetails = new CvwSC_TransactionsHeaderDetails();

            CA_Accounts objCA_Accounts = new CA_Accounts();
            CA_Accounts objCA_Accounts2 = new CA_Accounts();
            CA_Accounts objCA_Accounts3 = new CA_Accounts();


            CvwPS_InvoicesAssets cCvwPS_InvoicesAssets = new CvwPS_InvoicesAssets();

            CA_CostCenters objCCA_CostCenters = new CA_CostCenters();

            if (IsCurrency == null || IsCurrency == "false"  )
            {
            objCCA_CostCenters.GetList("where IsMain=0 ");


                objCFA_AssetsGroups.GetList("Where GroupID <> 0 order by  GroupID,OrderID");
               
                objCFA_AssetsBranches.GetList("Where ID IN( Select BranchID from FA_UserBranches  where UserID = " + WebSecurity.CurrentUserId  + ") ");
                
                objCFA_AssetsDepartments.GetList("where 1=1");
                
                objCDevisons.GetList("where 1=1");

                objCA_Accounts.GetList("where IsMain=0 And ID in (select AA.AccountID from  A_Accounts_Activities AA  where ActivityCostCenterID=(select ActivityID from NoAccessActivities where SystemName = 'Forwarding') )");
                objCA_Accounts2.GetList("where IsMain=0 And ID in (select AA.AccountID from  A_Accounts_Activities AA  where ActivityCostCenterID=(select ActivityID from NoAccessActivities where SystemName = 'Forwarding') )");
                objCA_Accounts3.GetList("where IsMain=0 And ID in (select AA.AccountID from  A_Accounts_Activities AA  where ActivityCostCenterID=(select ActivityID from NoAccessActivities where SystemName = 'Forwarding') )");

                //------------------------------------------------------
                int TotalRows = 10000;
                var SC_TransactionsHeaderDetailsCondition = " where  (ISNULL(FA_AssetsID , 0) <> 0 and  FA_AssetsID = " + pID + ") or ( ISNULL(IsApproved , 0) = 1 AND ISNULL(ParentPS_InvoiceID , 0) <> 0 AND ISNULL(BranchID , 0) <> 0 AND  ISNULL(FA_AssetsID , 0) = 0 AND  BranchID IN( Select fu.BranchID from FA_UserBranches fu  where fu.UserID = " + WebSecurity.CurrentUserId + ") )";
                //cvwSC_TransactionsHeaderDetails.GetListPaging(10000, 1, SC_TransactionsHeaderDetailsCondition, " ID ", out TotalRows);


                //var wPS_InvoicesAssets = "where ISNULL(DepItemCount,0)>0 AND  (ID not In( select fa.PSInvoiceID FROM FA_Assets AS fa WHERE  PSInvoiceID IS NOT null) or ID   = " + pID + ")  ";
                var wPS_InvoicesAssets = "where ISNULL(DepItemCount,0)>0 ";

                cCvwPS_InvoicesAssets.GetList(wPS_InvoicesAssets);
            }

            cvwCurrencyDetails.GetList(" where  CONVERT(date , \'" + pDate + "\') between  CONVERT(date ,FromDate) and  CONVERT(date ,ToDate) Order by ExchangeRate");



            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };

            return new Object[] {
                
                serializer.Serialize(objCFA_AssetsGroups.lstCVarFA_GetGroupsTree),
                serializer.Serialize(objCFA_AssetsBranches.lstCVarBranches),
                serializer.Serialize(objCFA_AssetsDepartments.lstCVarFA_Departments),
                serializer.Serialize(objCDevisons.lstCVarDevisons),
                serializer.Serialize(cvwCurrencyDetails.lstCVarvwCurrencyDetails),
                serializer.Serialize(cvwSC_TransactionsHeaderDetails.lstCVarvwSC_TransactionsHeaderDetails),
                serializer.Serialize(objCA_Accounts.lstCVarA_Accounts)
                ,serializer.Serialize(objCA_Accounts2.lstCVarA_Accounts)
                ,serializer.Serialize(objCA_Accounts3.lstCVarA_Accounts)
                ,serializer.Serialize(cCvwPS_InvoicesAssets.lstCVarvwPS_InvoicesAssets)
                ,serializer.Serialize(objCCA_CostCenters.lstCVarA_CostCenters)


            };
           
        }

        [HttpGet, HttpPost]
        public object[] GetPSInvoiceDetails(string pInvoiceID,Int32 pID)
        {
            Int32 _RowCount = 0;

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            CvwPS_InvoicesDetails cvwSL_InvoiceDiscountTaxes = new CvwPS_InvoicesDetails();

            if (pID==0)
            {
                cvwSL_InvoiceDiscountTaxes.GetListPaging(9999, 1, " where isnull(vwPS_InvoicesDetails.ItemTypeID,0)=4 and vwPS_InvoicesDetails.D_ID not in(SELECT fa.ItemID FROM FA_Assets AS fa WHERE fa.ItemID IS NOT NULL AND fa.PSInvoiceID=vwPS_InvoicesDetails.invoiceid) and ID = " + pInvoiceID, "ID", out _RowCount);

            }
            else
            {
                var whereClause = "WHERE vwPS_InvoicesDetails.ItemTypeID=4 AND vwPS_InvoicesDetails.invoiceid="+ pInvoiceID +" AND vwPS_InvoicesDetails.D_ID IN (SELECT fa.ItemID FROM FA_Assets AS fa WHERE fa.ItemID IS NOT NULL AND fa.PSInvoiceID=vwPS_InvoicesDetails.invoiceid)";
                cvwSL_InvoiceDiscountTaxes.GetListPaging(9999, 1, whereClause , "ID", out _RowCount);

            }




            return new Object[] { serializer.Serialize(cvwSL_InvoiceDiscountTaxes.lstCVarvwPS_InvoicesDetails)};

        }


        [HttpGet, HttpPost]
[AllowAnonymous]
public object[] InsertItems([FromBody]string pItems)
{
    var _result = false;
   //  Deserialize List -------------------------------------------------------------------------------
    var Listobj = new JavaScriptSerializer().Deserialize<List<CVarFA_AssetsDestructions>>(pItems);
            CFA_AssetsDestructions cCFA_AssetsDestructions = new CFA_AssetsDestructions();
    var checkException = cCFA_AssetsDestructions.SaveMethod(Listobj);
          //  Listobj[0].
  //  ------------------------------
    if (checkException == null)
        _result = true;

    return new object[] {
        _result, pItems
    };
}
            
        // [Route("/api/FA_Assets/LoadWithPaging/{pPageNumber}/{pPageSize}")]
        [HttpGet, HttpPost]
        public Object[] LoadWithPagingWithWhereClause(Int32 pPageNumber, Int32 pPageSize, string pWhereClause)
        {
            CvwFA_Assets cFA_Assets = new CvwFA_Assets();
            Int32 _RowCount = 0;
            
            cFA_Assets.GetListPaging(pPageSize, pPageNumber, pWhereClause, " ID Desc ", out _RowCount);

            return new Object[] { new JavaScriptSerializer().Serialize(cFA_Assets.lstCVarvwFA_Assets), _RowCount };
        }

        [HttpGet, HttpPost]
        public Object[] LoadFA_AssetsDestructions(string pStartDepreciateDate , string pID, string pLastAmount, string pPercentage,  string pIsFromHistorey )
        {
            CFA_GetAssetDestructions cFA_GetAssetdes = new CFA_GetAssetDestructions();
            try
            {
                var date = DateTime.ParseExact(pStartDepreciateDate.Trim() + " 00:00:00.000", "MM/dd/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture);

                cFA_GetAssetdes.GetList(int.Parse(pID), decimal.Parse(pLastAmount), decimal.Parse(pPercentage), date, bool.Parse(pIsFromHistorey));

            }
            catch( Exception ex)
            {
                var a = ex.Message;
            }

                return new Object[] { new JavaScriptSerializer().Serialize(cFA_GetAssetdes.lstCVarFA_GetAssetDestructions) };


        }

        [HttpGet, HttpPost]
        public Object[] CheckIfBranchHasAssets(string pBranchID)
        {
            if (pBranchID == "0")
            {
                return new Object[] { 0 };
            }
            else
            {
                CFA_Assets cFA_Assets = new CFA_Assets();
                cFA_Assets.GetList(" where BranchID = " + pBranchID + "");
                return new Object[] { cFA_Assets.lstCVarFA_Assets == null ? 0 : cFA_Assets.lstCVarFA_Assets.Count };
            }
        }





        // [Route("/api/FA_Assets/Insert/{pCode}/{pModificatorUser}/{pLocalName}}")]
        //pDepartmentID=1&pDevisonID=1&pGroupID=3&pIntialAmount=3730.00&pOpeningDepreciationAmount=20&pPurchasingAmount=152&pPurchasingDate=04%2F04%2F2020&pStartDepreciationDate=04%2F04%2F2020&pPurchasingAmountLocal=3800&pExchangeRate=25&pBarCodeType=code39&pScrappingAmount=50&pIsNotDepreciable=false&pDepreciationTypeID=1&pInvoiceID=1
        [HttpGet, HttpPost]
        public object[] Insert
            (
            string pName,
            String pSubAccountID ,
            String pParentSubAccountID ,
            String pApproved,
            String pBarCode,
            String pBranchID,
            String pCode,
            DateTime pCreationDate,
            String pCurrencyID,
            String pDepartmentID,
            String pDepreciableAmount,
            String pDevisonID,
            String pGroupID,
            String pIntialAmount,
            String pOpeningDepreciationAmount,
            String pPurchasingAmount,
            DateTime pPurchasingDate,
            String pQty,
            DateTime pStartDepreciationDate ,
            string pPurchasingAmountLocal ,
            string pExchangeRate ,
            string pBarCodeType ,
            string pScrappingAmount ,
            string pIsNotDepreciable ,
            string pDepreciationTypeID ,
            string pInvoiceID , 
            string pBranchCode ,
            string pGroupCode , 
            string pSC_TransactionDetailsID ,
            string pAssetType
             , String pAccountID, String pDepreciationAccountID, String pAccumulatedDepreciationAccountID
            ,Int64 pPSInvoiceID, Int64 pItemID, Int32 pAssetCostCenter_ID
            )
        {
         bool _result = false;
         string Message = "";
         var _ID = 0;
            
            //CFA_Assets history = new CFA_Assets();
            //history.GetList("where BarCode = N'" + pBarCode + "' AND BranchID=" + pBranchID + " ");
            
            long lastcode = 0;
            //if (history.lstCVarFA_Assets.Count > 0)
            //{
            //    Message = "FA_ErrorBarCode";
            //    _result = false;
               
            //    return new Object[] { _result , Message };
            //}
            //else
            //{

                if(pCode == "AUTO")
                {
                    var objlastcode = new CFA_Assets();
                    objlastcode.GetList("WHERE ID = (select max(ID) from FA_Assets where BranchID = " + pBranchID + " )");
                    lastcode = objlastcode.lstCVarFA_Assets.Count == 0 ? 0 : objlastcode.lstCVarFA_Assets[0].SerialNo;
                    
                }
                else
                {
                    lastcode = int.Parse(pCode) - 1;
                }


                CVarFA_Assets cVarFA_Assets = new CVarFA_Assets();
                cVarFA_Assets.ID = 0;
            cVarFA_Assets.AssetCostCenter_ID = pAssetCostCenter_ID;

            cVarFA_Assets.Name = pName;
                cVarFA_Assets.SubAccountID = int.Parse(pSubAccountID);
                cVarFA_Assets.Approved = bool.Parse(pApproved);
                cVarFA_Assets.BarCode = pBarCode;
                cVarFA_Assets.BranchID = int.Parse(pBranchID);

                cVarFA_Assets.Code = (lastcode + 1) + "-" + pGroupCode  + "-" + pBranchCode;

                cVarFA_Assets.SerialNo = lastcode + 1;

                cVarFA_Assets.CreationDate = pCreationDate;
                cVarFA_Assets.CurrencyID = int.Parse(pCurrencyID);
                cVarFA_Assets.DepartmentID = int.Parse(pDepartmentID);
                cVarFA_Assets.DepreciableAmount = decimal.Parse(pDepreciableAmount);
                cVarFA_Assets.DevisonID = int.Parse(pDevisonID);
                cVarFA_Assets.GroupID = int.Parse(pGroupID);
                cVarFA_Assets.IntialAmount = decimal.Parse(pIntialAmount);
                cVarFA_Assets.OpeningDepreciationAmount = decimal.Parse(pOpeningDepreciationAmount);
                cVarFA_Assets.PurchasingAmount = decimal.Parse(pPurchasingAmount);
                cVarFA_Assets.PurchasingDate = pPurchasingDate;
                cVarFA_Assets.Qty = decimal.Parse(pQty);

                //--------
                cVarFA_Assets.ExchangeRate = decimal.Parse(pExchangeRate);
                cVarFA_Assets.PurchasingAmountLocal = decimal.Parse(pPurchasingAmountLocal);
                //--------

                cVarFA_Assets.BarCodeType = pBarCodeType;
                cVarFA_Assets.ScrappingAmount = decimal.Parse(pScrappingAmount);
                cVarFA_Assets.IsNotDepreciable = bool.Parse(pIsNotDepreciable);
                cVarFA_Assets.DepreciationTypeID = int.Parse(pDepreciationTypeID);
                cVarFA_Assets.InvoiceID = int.Parse(pInvoiceID);
                cVarFA_Assets.AssetType = int.Parse(pAssetType);

                cVarFA_Assets.StartDepreciationDate = pStartDepreciationDate;


            cVarFA_Assets.SC_TransactionDetailsID = int.Parse(pSC_TransactionDetailsID);

            cVarFA_Assets.AssetAccount_ID = int.Parse(pAccountID);
            cVarFA_Assets.AssetAccumulatedDepreciationAccount_ID = int.Parse(pAccumulatedDepreciationAccountID);
            cVarFA_Assets.AssetDepreciationAccount_ID = int.Parse(pDepreciationAccountID);

            cVarFA_Assets.PSInvoiceID = pPSInvoiceID;
            cVarFA_Assets.ItemID = pItemID;




            CFA_Assets cFA_Assets = new CFA_Assets();
                cFA_Assets.lstCVarFA_Assets.Add(cVarFA_Assets);
                Exception checkException = cFA_Assets.SaveMethod(cFA_Assets.lstCVarFA_Assets);
                if (checkException != null) // an exception is caught in the model
                {
                   // if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
                    Message = checkException.Message;

                }
                else //not unique
                {
                    _ID = cVarFA_Assets.ID;
                    _result = true;

                    #region Create SubAccount

                    int _RowCount = 0;
                    if (pParentSubAccountID != "0" && pSubAccountID == "0")
                    {
                        #region Get data to insert
                        CA_SubAccounts objCA_SubAccounts = new CA_SubAccounts();
                        checkException = objCA_SubAccounts.GetListPaging(9999, 1, "WHERE ID = " + pParentSubAccountID.ToString(), "ID", out _RowCount);
                        CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
                        string pNewCode = objCCustomizedDBCall.CallStringFunction("SELECT [dbo].A_SubAccounts_GetCode(" + (pParentSubAccountID == "0" ? "null" : pParentSubAccountID) + ") AS Code");
                        #endregion Get data to insert
                        #region Insert
                        CVarA_SubAccounts objCVarA_SubAccounts = new CVarA_SubAccounts();
                        objCVarA_SubAccounts.SubAccount_Number = (objCA_SubAccounts.lstCVarA_SubAccounts[0].RealSubAccountCode + pNewCode).PadRight(21, '0');
                        objCVarA_SubAccounts.SubAccount_Name = pName.Trim().ToUpper();
                        objCVarA_SubAccounts.SubAccount_EnName = pName.Trim().ToUpper();
                        objCVarA_SubAccounts.Parent_ID = int.Parse(pParentSubAccountID);
                        objCVarA_SubAccounts.IsMain = false;
                        objCVarA_SubAccounts.SubAccLevel = objCA_SubAccounts.lstCVarA_SubAccounts[0].SubAccLevel + 1;
                        objCVarA_SubAccounts.RealSubAccountCode = objCA_SubAccounts.lstCVarA_SubAccounts[0].RealSubAccountCode + pNewCode;
                        objCVarA_SubAccounts.User_ID = WebSecurity.CurrentUserId;
                        objCA_SubAccounts.lstCVarA_SubAccounts.Add(objCVarA_SubAccounts);
                        checkException = objCA_SubAccounts.SaveMethod(objCA_SubAccounts.lstCVarA_SubAccounts);
                        if (checkException == null)
                        {
                            // _result = true;
                            int pNewSubAccountID = objCVarA_SubAccounts.ID;
                            //CallCustomizedSP
                            objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "A_SubAccounts", pNewSubAccountID, "AutoInsert");
                            //Set Parent.IsMain=true
                            objCA_SubAccounts.UpdateList("IsMain=1 WHERE ID=" + pParentSubAccountID.ToString());
                            #region add Details if exists
                            CA_SubAccounts_Details objCA_SubAccounts_Details = new CA_SubAccounts_Details(); //get the parent details
                            checkException = objCA_SubAccounts_Details.GetListPaging(9999, 1, "WHERE SubAccount_ID = " + pParentSubAccountID.ToString(), "SubAccount_ID", out _RowCount);
                            for (int i = 0; i < objCA_SubAccounts_Details.lstCVarA_SubAccounts_Details.Count; i++)
                            {
                                //this is insert, so i am sure i ve no children to link accounts to, ALSO I don't need to delete because they are new
                                objCCustomizedDBCall.SP_A_SubAccounts_Details("SP_A_SubAccounts_Details", "I", pNewSubAccountID, objCA_SubAccounts_Details.lstCVarA_SubAccounts_Details[i].Account_ID, false);
                            }
                            #endregion add Details if exists
                            //Update Customer SubaccountID
                            cFA_Assets.UpdateList("SubAccountID = " + objCVarA_SubAccounts.ID + ",Code='"+(cVarFA_Assets.Code+"-"+ objCVarA_SubAccounts.SubAccount_Number)+"'" + " WHERE ID=" + cVarFA_Assets.ID);
                        }
                        #endregion Insert
                    }
                    #endregion Create SubAccount





                    



                }
                return new Object[] { _result , 0 , _ID };
          //  }
          //  return new Object[] { _result };
        }

        [HttpGet, HttpPost]
        public int Update
            (
            string pID ,
            string pName,
            String pSubAccountID,
             String pParentSubAccountID,
            String pApproved,
            String pBarCode,
            String pBranchID,
            String pCode,
            DateTime pCreationDate,
            String pCurrencyID,
            String pDepartmentID,
            String pDepreciableAmount,
            String pDevisonID,
            String pGroupID,
            String pIntialAmount,
            String pOpeningDepreciationAmount,
            String pPurchasingAmount,
            DateTime pPurchasingDate,
            String pQty,
            DateTime pStartDepreciationDate,
            string pPurchasingAmountLocal,
            string pExchangeRate ,
            string pBarCodeType,
            string pScrappingAmount,
            string pIsNotDepreciable,
            string pDepreciationTypeID,
            string pInvoiceID,
            string pSerialNo, string pSC_TransactionDetailsID , string pBranchCode , string pGroupCode , string pAssetType
             , String pAccountID, String pDepreciationAccountID, String pAccumulatedDepreciationAccountID, Int32 pAssetCostCenter_ID
           )
        {
            int _result = 0;
            long lastcode = 0;
            var objlastcode = new CFA_Assets();
            objlastcode.GetList("WHERE  ID = (select max(ID) from FA_Assets where ID <> "+ pID + " AND  BranchID = " + pBranchID + "  )");
            lastcode = objlastcode.lstCVarFA_Assets.Count == 0 ? 0 : objlastcode.lstCVarFA_Assets[0].SerialNo;


            CVarFA_Assets cVarFA_Assets = new CVarFA_Assets();
            cVarFA_Assets.ID = int.Parse(pID);
            cVarFA_Assets.Name = pName;
            cVarFA_Assets.SubAccountID = int.Parse(pSubAccountID);
            cVarFA_Assets.Approved = bool.Parse(pApproved);
            cVarFA_Assets.BarCode = pBarCode;
            cVarFA_Assets.BranchID = int.Parse(pBranchID);
            cVarFA_Assets.Code = (lastcode + 1) + "-" + pGroupCode + "-" + pBranchCode;
            cVarFA_Assets.SerialNo = (lastcode + 1);
            cVarFA_Assets.CreationDate = pCreationDate;
            cVarFA_Assets.CurrencyID = int.Parse(pCurrencyID);
            cVarFA_Assets.DepartmentID = int.Parse(pDepartmentID);
            cVarFA_Assets.DepreciableAmount = decimal.Parse(pDepreciableAmount);
            cVarFA_Assets.DevisonID = int.Parse(pDevisonID);
            cVarFA_Assets.GroupID = int.Parse(pGroupID);
            cVarFA_Assets.IntialAmount = decimal.Parse(pIntialAmount);
            cVarFA_Assets.OpeningDepreciationAmount = decimal.Parse(pOpeningDepreciationAmount);
            cVarFA_Assets.PurchasingAmount = decimal.Parse(pPurchasingAmount);
            cVarFA_Assets.PurchasingDate = pPurchasingDate;
            cVarFA_Assets.Qty = decimal.Parse(pQty);
            cVarFA_Assets.StartDepreciationDate = pStartDepreciationDate;
            cVarFA_Assets.ExchangeRate = decimal.Parse(pExchangeRate);
            cVarFA_Assets.PurchasingAmountLocal = decimal.Parse(pPurchasingAmountLocal);
            cVarFA_Assets.AssetCostCenter_ID = pAssetCostCenter_ID;


            cVarFA_Assets.BarCodeType = pBarCodeType;
            cVarFA_Assets.ScrappingAmount = decimal.Parse(pScrappingAmount);
            cVarFA_Assets.IsNotDepreciable = bool.Parse(pIsNotDepreciable);
            cVarFA_Assets.DepreciationTypeID = int.Parse(pDepreciationTypeID);
            cVarFA_Assets.InvoiceID = int.Parse(pInvoiceID);

            cVarFA_Assets.SC_TransactionDetailsID = int.Parse(pSC_TransactionDetailsID);
            cVarFA_Assets.AssetType = int.Parse(pAssetType);

            cVarFA_Assets.AssetAccount_ID = int.Parse(pAccountID);
            cVarFA_Assets.AssetAccumulatedDepreciationAccount_ID = int.Parse(pAccumulatedDepreciationAccountID);
            cVarFA_Assets.AssetDepreciationAccount_ID = int.Parse(pDepreciationAccountID);


            CA_SubAccounts cA_SubAccounts = new CA_SubAccounts();



            CFA_Assets cFA_Assets = new CFA_Assets();
            cFA_Assets.lstCVarFA_Assets.Add(cVarFA_Assets);
            Exception checkException = cFA_Assets.SaveMethod(cFA_Assets.lstCVarFA_Assets);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = 0;
            }
            else //not unique
            {
                _result = cVarFA_Assets.ID;
                cA_SubAccounts.UpdateList("SubAccount_EnName = " + pName + " , SubAccount_Name = " + pName + "  WHERE ID=" + pSubAccountID);

            }

            return _result;
        }

        [HttpGet, HttpPost]
        public bool Delete(String pFA_AssetsIDs, string type)
        {
            if (type == "1")
            {
                bool _result = false;
                CFA_Assets objCFA_Assets = new CFA_Assets();
                foreach (var currentID in pFA_AssetsIDs.Split(','))
                {
                    objCFA_Assets.lstDeletedCPKFA_Assets.Add(new CPKFA_Assets() { ID = Int32.Parse(currentID.Trim()) });
                }

                Exception checkException = objCFA_Assets.DeleteItem(objCFA_Assets.lstDeletedCPKFA_Assets);
                if (checkException != null) // an exception is caught in the model
                {
                    if (checkException.Message.Contains("DELETE")) // some or all of the rows were not deleted due to dependencies
                        _result = false;
                }
                else //deleted successfully
                    _result = true;
                return _result;
            }
            else if (type == "2")
            {
                bool _result = false;
                CFA_AssetsDestructions objCFA_Assets = new CFA_AssetsDestructions();
                foreach (var currentID in pFA_AssetsIDs.Split(','))
                {
                    objCFA_Assets.lstDeletedCPKFA_AssetsDestructions.Add(new CPKFA_AssetsDestructions() { ID = Int32.Parse(currentID.Trim()) });
                }

                Exception checkException = objCFA_Assets.DeleteItem(objCFA_Assets.lstDeletedCPKFA_AssetsDestructions);
                if (checkException != null) // an exception is caught in the model
                {
                    if (checkException.Message.Contains("DELETE")) // some or all of the rows were not deleted due to dependencies
                        _result = false;
                }
                else //deleted successfully
                    _result = true;
                return _result;
            }
            else
            {
                bool _result = false;
                CFA_DestructionsStopsPeriod objFA_DestructionsStopsPeriod = new CFA_DestructionsStopsPeriod();
                foreach (var currentID in pFA_AssetsIDs.Split(','))
                {
                    objFA_DestructionsStopsPeriod.lstDeletedCPKFA_DestructionsStopsPeriod.Add(new CPKFA_DestructionsStopsPeriod() { ID = Int32.Parse(currentID.Trim()) });
                }

                Exception checkException = objFA_DestructionsStopsPeriod.DeleteItem(objFA_DestructionsStopsPeriod.lstDeletedCPKFA_DestructionsStopsPeriod);
                if (checkException != null) // an exception is caught in the model
                {
                    if (checkException.Message.Contains("DELETE")) // some or all of the rows were not deleted due to dependencies
                        _result = false;
                }
                else //deleted successfully
                    _result = true;
                return _result;

            }
        }





       








    }
}

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
using Forwarding.MvcApp.Models.Customized;

namespace Forwarding.MvcApp.Controllers.MasterData.API_Invoicing
{
    public class FA_TransactionsController : ApiController
    {

        [HttpGet, HttpPost]
        public Object[] IntializeData(string pTransactionTypeID , string pID , string pIsAsset) //pID : AccountID
        {
            if (pID == null)
                pID = "0";


            CvwFA_Assets cvwFA_Assets = new CvwFA_Assets();
            CBranches objCFA_AssetsBranches = new CBranches();
            CFA_ExludedTypes cFA_ExludedTypes = new CFA_ExludedTypes();
            CFA_TransactionsTypes cFA_TransactionsTypes = new CFA_TransactionsTypes();
            CFA_Departments cFA_Departments = new CFA_Departments();
            CDevisons cDevisons = new CDevisons();

            if (bool.Parse(pIsAsset) == false)
            {

                objCFA_AssetsBranches.GetList("Where ID IN( Select BranchID from FA_UserBranches  where UserID = " + WebSecurity.CurrentUserId + ") ");
                cFA_ExludedTypes.GetList("where 1 = 1");
                cFA_TransactionsTypes.GetList("where ID = 30 or ID = 60  ");
                cFA_Departments.GetList("where 1 = 1");
                cDevisons.GetList(" where 1 = 1");
            }
            if (pID == "0")
                cvwFA_Assets.GetList("where isnull( Approved , 0 ) = 1 AND  isnull( IsExcluded , 0 ) = 0 AND BranchID  IN( Select ub.BranchID from FA_UserBranches ub where ub.UserID = " + WebSecurity.CurrentUserId + ") ");
            else
                cvwFA_Assets.GetList("where isnull( Approved , 0 ) = 1 AND  BranchID  IN( Select ub.BranchID from FA_UserBranches ub where ub.UserID = " + WebSecurity.CurrentUserId + ") ");


            //CA_SubAccounts objCA_SubAccounts = new CA_SubAccounts();
            //objCA_SubAccounts.GetList("Where SubAccount_Number Like '1%'  AND IsMain = 1 AND (select Count(g.ID) from FA_AssetsGroups g where g.SubAccountID = A_SubAccounts.ID  and g.ID <> " + pID + " ) <= 0    ");

            CFA_AdditionAccount objCFA_AdditionAccount = new CFA_AdditionAccount();
            objCFA_AdditionAccount.GetList("where 1 = 1");


            return new Object[] {
                new JavaScriptSerializer().Serialize(cvwFA_Assets.lstCVarvwFA_Assets),
                new JavaScriptSerializer().Serialize(objCFA_AssetsBranches.lstCVarBranches),
                new JavaScriptSerializer().Serialize(cFA_ExludedTypes.lstCVarFA_ExludedTypes),
                new JavaScriptSerializer().Serialize(cFA_TransactionsTypes.lstCVarFA_TransactionsTypes),
                new JavaScriptSerializer().Serialize(cFA_Departments.lstCVarFA_Departments),
                new JavaScriptSerializer().Serialize(cDevisons.lstCVarDevisons),
                new JavaScriptSerializer().Serialize(objCFA_AdditionAccount.lstCVarFA_AdditionAccount)

            };

        }


        [HttpGet, HttpPost]
        public object[] FA_AdditionPost(string pSelectedIDs)
        {
            string pMessageReturned = "";
            bool _result = true;
            Exception checkException = null;
            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
            CvwFA_Transactions objCvwFA_Transactions = new CvwFA_Transactions();
            checkException = objCvwFA_Transactions.GetList("WHERE ID IN (" + pSelectedIDs + ")");
            int NumberOfSelectedRows = pSelectedIDs.Split(',').Length;
            var ArrSelectedIDs = pSelectedIDs.Split(',');
            for (int i = 0; i < NumberOfSelectedRows; i++)
            {
                checkException = objCCustomizedDBCall.FA_AdditionPosting("FA_AdditionPosting", objCvwFA_Transactions.lstCVarvwFA_Transactions[i].ID.ToString());

                if (checkException != null)
                    pMessageReturned = checkException.Message;
                if (pMessageReturned != "")
                    _result = false;

            }
            return new object[] {
                _result ,pMessageReturned
            };
        }



        [HttpGet, HttpPost]
        public object[] FA_ExclusionPost(string pSelectedIDs, string pTypeID, bool pApproved)
        {
            //---------------------------------------------------------------------------------------------------
            var _Result = false;
            var ErrorMessage = "";
            Exception checkException;

            pSelectedIDs = "'," + pSelectedIDs + ",'";
            if (pTypeID == "10")
            {

                CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
                checkException = objCCustomizedDBCall.CallProcFunction("FA_DepreciationPostingJV " + pSelectedIDs + "," + WebSecurity.CurrentUserId + "," + pApproved);

                if (checkException != null)
                    ErrorMessage = checkException.Message; //cSC_PostingGoodsIssue.lstCVarSC_PostingGoodsIssueVouchers[0].ErrMessage;
            }
            else if (pTypeID == "60")
            {

                CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
                checkException = objCCustomizedDBCall.CallProcFunction("FA_ExclusionPostingJV " + pSelectedIDs + "," + WebSecurity.CurrentUserId + "," + pApproved);

                if (checkException != null)
                    ErrorMessage = checkException.Message; //cSC_PostingGoodsIssue.lstCVarSC_PostingGoodsIssueVouchers[0].ErrMessage;
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






        [HttpGet, HttpPost]
        [AllowAnonymous]
        public object[] InsertItems([FromBody]string pItems)
        {
            var _result = false;
            //  Deserialize List -------------------------------------------------------------------------------
            var Listobj = new JavaScriptSerializer().Deserialize<List<CVarFA_AssetsGroupDestructions>>(pItems);
            CFA_AssetsGroupDestructions cCFA_AssetsGroupDestructions = new CFA_AssetsGroupDestructions();
            var checkException = cCFA_AssetsGroupDestructions.SaveMethod(Listobj);
            //  Listobj[0].
            //  ------------------------------
            if (checkException == null)
                _result = true;

            return new object[] {
        _result, pItems
    };
        }

        [HttpGet, HttpPost]
        public object[] LoadWithWhereClause(Int32 pPageNumber, Int32 pPageSize, string pWhereClause)
        {
            CvwFA_Transactions cFA_Transactions = new CvwFA_Transactions();
            Int32 _RowCount = 0;
            cFA_Transactions.GetListPaging(pPageSize, pPageNumber, pWhereClause + " and  BranchID  IN(Select ub.BranchID from FA_UserBranches ub where ub.UserID = " + WebSecurity.CurrentUserId + ")", " ID DESC ", out _RowCount);
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[] { serializer.Serialize(cFA_Transactions.lstCVarvwFA_Transactions), _RowCount };
        }


        // [Route("/api/FA_AssetsGroups/Insert/{pCode}/{pModificatorUser}/{pLocalName}}")]
        //pAssetID=5&pJVID=0&pExludedTypeID=10&pCode=AUTO&pIsDeleted=false&pDepreciationID=0&pCreationDate=04%2F08%2F2020&pAmountFactor=-1
        [HttpGet, HttpPost]
        public int Insert
            (
      string pTransactionTypeID ,
      string pAmount ,
      DateTime pFromDate ,
      DateTime pToDate ,
      string pQtyFactor ,
      string pQty ,
      string pIsApproved ,
      string pNotes ,
      string pPercentage ,
      string pDepreciationTypeID ,
      string pAssetID ,
      string pJVID ,
      string pBranchID ,
      string pExludedTypeID ,
      string pCode ,
      string pIsDeleted ,
      string pDepreciationID ,
      DateTime pCreationDate , string pAmountFactor,Int32 pFA_AdditionAccount
            )
        {
            int _result = 0;

            CVarFA_Transactions cVarFA_Transactions = new  CVarFA_Transactions();





            cVarFA_Transactions.ID = 0;

            var objlastcode = new CFA_Transactions();

            //(SELECT MAX(fa.Code) FROM FA_Transactions fa WHERE  isnull(fa.IsDeleted, 0) = 0 and fa.TransactionTypeID = 10 and fa.BranchID = @BranchID ) 

            objlastcode.GetList("WHERE ID = (select max(ID) from FA_Transactions where isnull(IsDeleted , 0 ) = 0 and TransactionTypeID = " + pTransactionTypeID + " and BranchID = " + pBranchID + " )");
            var lastcode = objlastcode.lstCVarFA_Transactions.Count == 0 ? 0 : objlastcode.lstCVarFA_Transactions[0].Code;








      cVarFA_Transactions.TransactionTypeID = int.Parse( pTransactionTypeID);
      cVarFA_Transactions.Amount = decimal.Parse(  pAmount);



            TimeSpan FirsrDayTime = new TimeSpan(7, 0, 0); // new TimeSpan(7, 0, 0);
            TimeSpan LastDayTime = new TimeSpan(19, 0, 0); // new TimeSpan(19, 0, 0);
            if (int.Parse(pTransactionTypeID) == 20 || int.Parse(pTransactionTypeID) == 50)
            {
                cVarFA_Transactions.FromDate = pFromDate.Date + FirsrDayTime;
                cVarFA_Transactions.ToDate = pToDate + FirsrDayTime;

            }
            else
            {
                cVarFA_Transactions.FromDate = pFromDate + LastDayTime;
                cVarFA_Transactions.ToDate = pToDate + LastDayTime;
            }

      cVarFA_Transactions.QtyFactor = int.Parse( pQtyFactor );
      cVarFA_Transactions.Qty = decimal.Parse( pQty );
      cVarFA_Transactions.IsApproved = bool.Parse(  pIsApproved );
      cVarFA_Transactions.Notes = pNotes;
      cVarFA_Transactions.Percentage = decimal.Parse( pPercentage);
      cVarFA_Transactions.DepreciationTypeID = int.Parse(pDepreciationTypeID);
      cVarFA_Transactions.AssetID = int.Parse(pAssetID);
      cVarFA_Transactions.JVID = int.Parse(pJVID);
      cVarFA_Transactions.BranchID = int.Parse(pBranchID);
      cVarFA_Transactions.ExludedTypeID = int.Parse(pExludedTypeID);
      cVarFA_Transactions.Code = lastcode + 1;
      cVarFA_Transactions.IsDeleted = bool.Parse( pIsDeleted );
      cVarFA_Transactions.DepreciationID = int.Parse( pDepreciationID );
      cVarFA_Transactions.CreationDate = pCreationDate;
      cVarFA_Transactions.UserID = WebSecurity.CurrentUserId;
      cVarFA_Transactions.AmountFactor = int.Parse(pAmountFactor);
            cVarFA_Transactions.PeriodType = 1;

            cVarFA_Transactions.AdditionAccountID = pFA_AdditionAccount;



            CFA_Transactions cFA_Transactions = new CFA_Transactions();
            cFA_Transactions.lstCVarFA_Transactions.Add(cVarFA_Transactions);
            Exception checkException = cFA_Transactions.SaveMethod(cFA_Transactions.lstCVarFA_Transactions);
            if (checkException != null) // an exception is caught in the model
            {
              //  if (checkException.Message.Contains("UNIQUE"))
                    _result = 0;
            }
            else //not unique
                _result = cVarFA_Transactions.ID;
            return _result;
        }

        [HttpGet, HttpPost]
        public int Update
            (
      string pID,
      string pTransactionTypeID,
      string pAmount,
      DateTime pFromDate,
      DateTime pToDate,
      string pQtyFactor,
      string pQty,
      string pIsApproved,
      string pNotes,
      string pPercentage,
      string pDepreciationTypeID,
      string pAssetID,
      string pJVID,
      string pBranchID,
      string pExludedTypeID,
      string pCode,
      string pIsDeleted,
      string pDepreciationID,
      DateTime pCreationDate,
      string pAmountFactor, Int32 pFA_AdditionAccount
           )
        {
            int _result = 0;

            CVarFA_Transactions cVarFA_Transactions = new CVarFA_Transactions();




            cVarFA_Transactions.ID = int.Parse( pID );



            cVarFA_Transactions.TransactionTypeID = int.Parse(pTransactionTypeID);
            cVarFA_Transactions.Amount = decimal.Parse(pAmount);

            TimeSpan FirsrDayTime = new TimeSpan(7, 0, 0); // new TimeSpan(7, 0, 0);
            TimeSpan LastDayTime = new TimeSpan(19, 0, 0); // new TimeSpan(19, 0, 0);
            if (int.Parse(pTransactionTypeID) == 20 || int.Parse(pTransactionTypeID) == 50)
            {
                cVarFA_Transactions.FromDate = pFromDate.Date + FirsrDayTime;
                cVarFA_Transactions.ToDate = pToDate + FirsrDayTime;

            }
            else
            {
                cVarFA_Transactions.FromDate = pFromDate + LastDayTime;
                cVarFA_Transactions.ToDate = pToDate + LastDayTime;
            }
            cVarFA_Transactions.QtyFactor = int.Parse( pQtyFactor );
            cVarFA_Transactions.Qty = decimal.Parse(pQty);
            cVarFA_Transactions.IsApproved = bool.Parse( pIsApproved );
            cVarFA_Transactions.Notes = pNotes;
            cVarFA_Transactions.Percentage = decimal.Parse(pPercentage);
            cVarFA_Transactions.DepreciationTypeID = int.Parse(pDepreciationTypeID);
            cVarFA_Transactions.AssetID = int.Parse(pAssetID);
            cVarFA_Transactions.JVID = int.Parse(pJVID);
            cVarFA_Transactions.BranchID = int.Parse(pBranchID);
            cVarFA_Transactions.ExludedTypeID = int.Parse(pExludedTypeID);
            cVarFA_Transactions.Code = int.Parse( pCode );
            cVarFA_Transactions.IsDeleted = bool.Parse(pIsDeleted);
            cVarFA_Transactions.DepreciationID = int.Parse(pDepreciationID);
            cVarFA_Transactions.CreationDate = pCreationDate;
            cVarFA_Transactions.UserID = WebSecurity.CurrentUserId;
            cVarFA_Transactions.AmountFactor = int.Parse(pAmountFactor);
            cVarFA_Transactions.PeriodType = 1;

            cVarFA_Transactions.AdditionAccountID = pFA_AdditionAccount;




            CFA_Transactions cFA_Transactions = new CFA_Transactions();
            cFA_Transactions.lstCVarFA_Transactions.Add(cVarFA_Transactions);
            Exception checkException = cFA_Transactions.SaveMethod(cFA_Transactions.lstCVarFA_Transactions);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = 0;
            }
            else //not unique
                _result = cVarFA_Transactions.ID;
            return _result;
        }

        [HttpGet, HttpPost]
        public bool Delete(String pFA_AssetsGroupsIDs, string type)
        {
            if (type == "1")
            {
                bool _result = false;
                CFA_AssetsGroups objCFA_AssetsGroups = new CFA_AssetsGroups();
                foreach (var currentID in pFA_AssetsGroupsIDs.Split(','))
                {
                    objCFA_AssetsGroups.lstDeletedCPKFA_AssetsGroups.Add(new CPKFA_AssetsGroups() { ID = Int32.Parse(currentID.Trim()) });
                }

                Exception checkException = objCFA_AssetsGroups.DeleteItem(objCFA_AssetsGroups.lstDeletedCPKFA_AssetsGroups);
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
                CFA_AssetsGroupDestructions objCFA_AssetsGroups = new CFA_AssetsGroupDestructions();
                foreach (var currentID in pFA_AssetsGroupsIDs.Split(','))
                {
                    objCFA_AssetsGroups.lstDeletedCPKFA_AssetsGroupDestructions.Add(new CPKFA_AssetsGroupDestructions() { ID = Int32.Parse(currentID.Trim()) });
                }

                Exception checkException = objCFA_AssetsGroups.DeleteItem(objCFA_AssetsGroups.lstDeletedCPKFA_AssetsGroupDestructions);
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

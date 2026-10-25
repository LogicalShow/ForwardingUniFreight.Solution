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

namespace Forwarding.MvcApp.Controllers.MasterData.API_Invoicing
{
    public class FA_DepreciationsByAssetsController : ApiController
    {

        [HttpGet, HttpPost]
        public Object[] IntializeData(string pTransactionTypeID, string pID) //pID : AccountID
        {
            if (pID == null)
                pID = "0";


            CvwFA_Assets cvwFA_Assets = new CvwFA_Assets();
            CBranches objCFA_AssetsBranches = new CBranches();
            CFA_ExludedTypes cFA_ExludedTypes = new CFA_ExludedTypes();
            CFA_TransactionsTypes cFA_TransactinsTypes = new CFA_TransactionsTypes();
            CFA_Departments cFA_Departments = new CFA_Departments();
            CDevisons cDevisons = new CDevisons();

            //if (bool.Parse(pIsAsset) == false)
            //{

            //     objCFA_AssetsBranches.GetList("Where ID IN( Select BranchID from FA_UserBranches  where UserID = " + WebSecurity.CurrentUserId + ") ");
            //cFA_ExludedTypes.GetList("where 1 = 1");
            //cFA_TransactinsTypes.GetList("where ID = 30 or ID = 60  ");
            //cFA_Departments.GetList("where 1 = 1");
            //cDevisons.GetList(" where 1 = 1");
            // }
            //if (pID == "0")
            //    cvwFA_Assets.GetList("where isnull( Approved , 0 ) = 1 AND  isnull( IsExcluded , 0 ) = 0 AND BranchID  IN( Select ub.BranchID from FA_UserBranches ub where ub.UserID = " + WebSecurity.CurrentUserId + ") ");
            //else
            //    cvwFA_Assets.GetList("where isnull( Approved , 0 ) = 1 AND  BranchID  IN( Select ub.BranchID from FA_UserBranches ub where ub.UserID = " + WebSecurity.CurrentUserId + ") ");


            //CA_SubAccounts objCA_SubAccounts = new CA_SubAccounts();
            //objCA_SubAccounts.GetList("Where SubAccount_Number Like '1%'  AND IsMain = 1 AND (select Count(g.ID) from FA_AssetsGroups g where g.SubAccountID = A_SubAccounts.ID  and g.ID <> " + pID + " ) <= 0    ");


            cvwFA_Assets.GetList("Where isnull( IsNotDepreciable , 0 ) = 0 and  BranchID IN( Select BranchID from FA_UserBranches  where UserID = " + WebSecurity.CurrentUserId + ") ");





            return new Object[] {
                new JavaScriptSerializer().Serialize(cvwFA_Assets.lstCVarvwFA_Assets),
                new JavaScriptSerializer().Serialize(objCFA_AssetsBranches.lstCVarBranches),
                new JavaScriptSerializer().Serialize(cFA_ExludedTypes.lstCVarFA_ExludedTypes),
                new JavaScriptSerializer().Serialize(cFA_TransactinsTypes.lstCVarFA_TransactionsTypes),
                new JavaScriptSerializer().Serialize(cFA_Departments.lstCVarFA_Departments),
                new JavaScriptSerializer().Serialize(cDevisons.lstCVarDevisons)
            };

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
            CvwFA_Transactions cvwFA_Transactions = new CvwFA_Transactions();
            Int32 _RowCount = 0;
            //cvwFA_Transactions.GetListPaging(pPageSize, pPageNumber, pWhereClause + " and isnull( IsDeleted , 0 ) = 0 and isnull( DepreciationID , 0 ) = 0 and TransactionTypeID = 40 and  BranchID  IN(Select ub.BranchID from FA_UserBranches ub where ub.UserID = " + WebSecurity.CurrentUserId + ")", " ID DESC ", out _RowCount);
            //cvwFA_Transactions.GetListPaging(pPageSize, pPageNumber, pWhereClause + " and isnull( IsDeleted , 0 ) = 0  and TransactionTypeID = 40 and  BranchID  IN(Select ub.BranchID from FA_UserBranches ub where ub.UserID = " + WebSecurity.CurrentUserId + ")", " ID DESC ", out _RowCount);
            cvwFA_Transactions.GetListPaging(pPageSize, pPageNumber, pWhereClause + " and isnull( IsDeleted , 0 ) = 0 and DepreciationID IN (SELECT ID FROM FA_Depreciations WHERE AssetsID IS NOT NULL) and TransactionTypeID = 40 and  BranchID  IN(Select ub.BranchID from FA_UserBranches ub where ub.UserID = " + WebSecurity.CurrentUserId + ")", " ID DESC ", out _RowCount);

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            var _list = cvwFA_Transactions.lstCVarvwFA_Transactions;
            return new Object[] { serializer.Serialize(_list), _RowCount };
        }


        // [Route("/api/FA_AssetsGroups/Insert/{pCode}/{pModificatorUser}/{pLocalName}}")]
        //pAssetID=5&pJVID=0&pExludedTypeID=10&pCode=AUTO&pIsDeleted=false&pDepreciationID=0&pCreationDate=04%2F08%2F2020&pAmountFactor=-1

        //@FromDate DATETIME , @ToDate DATETIME , @BranchID INT , @UserID int , @Date DATETIME , @IsReview bit





        [HttpGet, HttpPost]
        public object[] Insert
            (
                DateTime FromDate , DateTime ToDate , string AssetID , DateTime Date , string IsReview , string PeriodType , string ID
            )
        {
            int _result = 0;
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };

            CVarFA_DepreciateAll cVarFA_Depreciations = new CVarFA_DepreciateAll();


            if(ID == null || ID == "false" || ID == "" || ID == "0")
            {
                CFA_DepreciateByAssets cFA_Depreciations = new CFA_DepreciateByAssets();
                var checkException = cFA_Depreciations.GetList(FromDate, ToDate, int.Parse(AssetID), WebSecurity.CurrentUserId, Date, bool.Parse(IsReview), int.Parse(PeriodType));

                if (checkException != null) // an exception is caught in the model
                {
                    //  if (checkException.Message.Contains("UNIQUE"))
                    return new Object[] { false, checkException.Message };
                }
                return new Object[] { true, cFA_Depreciations.lstCVarFA_DepreciateByAssets };

            }
            else
            {
                CvwFA_Transactions cFA_Transactions = new CvwFA_Transactions();
                var checkException = cFA_Transactions.GetList(" where ID = " + ID + " ");

                if (checkException != null) // an exception is caught in the model
                {
                    //  if (checkException.Message.Contains("UNIQUE"))
                    return new Object[] { false, checkException.Message };
                }
                return new Object[] { true, cFA_Transactions.lstCVarvwFA_Transactions };



            }

        }

        [HttpGet, HttpPost]
        public int Update
            (
      string pID,
      string pAssetID
           )
        {
            int _result = 0;


            CFA_Transactions cFA_Depreciations = new CFA_Transactions();

            var checkException = cFA_Depreciations.UpdateList("IsDeleted = 1 where ID = " + pID + "");



            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = 0;
            }
            else //not unique
                _result = int.Parse(pID);
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

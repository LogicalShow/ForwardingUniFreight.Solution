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

namespace Forwarding.MvcApp.Controllers.MasterData.API_Invoicing
{
    public class FA_AssetsGroupsController : ApiController
    {


        [HttpGet, HttpPost]
        public Object[] IntializeData(string pID) //pID : AccountID
        {
            if (pID == null)
                pID = "0";

            CA_SubAccounts objCA_SubAccounts = new CA_SubAccounts();
            objCA_SubAccounts.GetList("Where SubAccount_Number Like '1%' and SubAccLevel <> 1  AND IsMain = 1 AND (select Count(g.ID) from FA_AssetsGroups g where g.SubAccountID = A_SubAccounts.ID  and g.ID <> " + pID + " ) <= 0    ");

            CA_Accounts objCA_Accounts = new CA_Accounts();
            objCA_Accounts.GetList("where 1=1 And ID in (select AA.AccountID from  A_Accounts_Activities AA  where ActivityCostCenterID=(select ActivityID from NoAccessActivities where SystemName = 'Forwarding') )"); // Account_number like '1%' ");

            CA_Accounts objCA_Accounts2 = new CA_Accounts();
            objCA_Accounts2.GetList("where 1=1 And ID in (select AA.AccountID from  A_Accounts_Activities AA  where ActivityCostCenterID=(select ActivityID from NoAccessActivities where SystemName = 'Forwarding') )"); //Account_number like '2%'");

            CA_Accounts objCA_Accounts3 = new CA_Accounts();
            objCA_Accounts3.GetList("where 1=1 And ID in (select AA.AccountID from  A_Accounts_Activities AA  where ActivityCostCenterID=(select ActivityID from NoAccessActivities where SystemName = 'Forwarding') )"); // Account_number like '3%'");


            CA_CostCenters objCCA_CostCenters = new CA_CostCenters();
            objCCA_CostCenters.GetList("where IsMain=0 "); // Account_number like '3%'");

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };

            return new Object[] {serializer.Serialize(objCA_SubAccounts.lstCVarA_SubAccounts)
                ,serializer.Serialize(objCA_Accounts.lstCVarA_Accounts)
                ,serializer.Serialize(objCA_Accounts2.lstCVarA_Accounts)
                ,serializer.Serialize(objCA_Accounts3.lstCVarA_Accounts)
                ,serializer.Serialize(objCCA_CostCenters.lstCVarA_CostCenters)



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

        // [Route("/api/FA_AssetsGroups/LoadWithPaging/{pPageNumber}/{pPageSize}")]
        [HttpGet, HttpPost]
        public Object[] LoadWithPaging(Int32 pPageNumber, Int32 pPageSize, string pSearchKey)
        {
            CFA_GetGroupsTree cvwFA_AssetsGroups = new CFA_GetGroupsTree();
            Int32 _RowCount = 0;

            pSearchKey = (pSearchKey == null ? "" : pSearchKey.Trim().ToUpper());
            string whereClause = " Where ( GroupName LIKE N'%" + pSearchKey + "%' "
                + " OR SubAccountName LIKE N'%" + pSearchKey + "%' "
                + " OR ParentSubAccountName LIKE N'%" + pSearchKey + "%' ) "
                
                ;
            cvwFA_AssetsGroups.GetList(whereClause + " AND GroupID <> 0 order by  GroupID,OrderID  " + "");
          //  cvwFA_AssetsGroups.GetListPaging(pPageSize, pPageNumber, whereClause + " AND GroupID <> 0 order by ParentSubAccountID asc  ", " ParentSubAccountID asc ", out _RowCount);

            return new Object[] { new JavaScriptSerializer().Serialize(cvwFA_AssetsGroups.lstCVarFA_GetGroupsTree), 10000 };
        }

        [HttpGet, HttpPost]
        public Object[] LoadFA_AssetsGroupDestructions(string pWhereClause)
        {
            CFA_AssetsGroupDestructions fA_AssetsGroupDestructions = new CFA_AssetsGroupDestructions();
            fA_AssetsGroupDestructions.GetList(pWhereClause);
            return new Object[] { new JavaScriptSerializer().Serialize(fA_AssetsGroupDestructions.lstCVarFA_AssetsGroupDestructions) };
        }

        // [Route("/api/FA_AssetsGroups/Insert/{pCode}/{pModificatorUser}/{pLocalName}}")]
        [HttpGet, HttpPost]
        public int Insert
            (
            string pName,
            String pSubAccountID , string pParentSubAccountID, String pAccountID, String pDepreciationAccountID, String pAccumulatedDepreciationAccountID
            , string pPercentage , string pCode, Int32 pAssetCostCenter_ID
            )
        {
            int _result = 0;

            CVarFA_AssetsGroups cVarFA_AssetsGroups = new CVarFA_AssetsGroups();
            cVarFA_AssetsGroups.ID = 0;
            cVarFA_AssetsGroups.Name = pName;
            cVarFA_AssetsGroups.Code = pCode;
            cVarFA_AssetsGroups.SubAccountID = int.Parse(pSubAccountID);
            //cVarFA_AssetsGroups.AssetAccount_ID = 0;
            cVarFA_AssetsGroups.AssetAccumulatedDepreciationAccount_ID = 0;
            //cVarFA_AssetsGroups.AssetCostCenter_ID = 0;
            cVarFA_AssetsGroups.AssetDepreciationAccount_ID = 0;
            cVarFA_AssetsGroups.AssetCostCenter_ID = pAssetCostCenter_ID;

            //cVarFA_AssetsGroups.AssetDepreciationAccount_ID = 0;
            cVarFA_AssetsGroups.Percentage = decimal.Parse(pPercentage);
            cVarFA_AssetsGroups.ParentSubAccountID = int.Parse(pParentSubAccountID);

            cVarFA_AssetsGroups.AssetAccount_ID = int.Parse(pAccountID);
            cVarFA_AssetsGroups.AssetAccumulatedDepreciationAccount_ID = int.Parse(pAccumulatedDepreciationAccountID);
            cVarFA_AssetsGroups.AssetDepreciationAccount_ID = int.Parse(pDepreciationAccountID);


            CFA_AssetsGroups cFA_AssetsGroups = new CFA_AssetsGroups();
            cFA_AssetsGroups.lstCVarFA_AssetsGroups.Add(cVarFA_AssetsGroups);
            Exception checkException = cFA_AssetsGroups.SaveMethod(cFA_AssetsGroups.lstCVarFA_AssetsGroups);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = 0;
            }
            else //not unique
                _result = cVarFA_AssetsGroups.ID;
            return _result;
        }

        [HttpGet, HttpPost]
        public int Update
            (
            string pID,
            string pName,
            String pSubAccountID, string pParentSubAccountID , string pPercentage , string pCode
            , String pAccountID, String pDepreciationAccountID, String pAccumulatedDepreciationAccountID, Int32 pAssetCostCenter_ID
           )
        {
            int _result = 0;

            CVarFA_AssetsGroups cVarFA_AssetsGroups = new CVarFA_AssetsGroups();
            cVarFA_AssetsGroups.ID = int.Parse(pID);
            cVarFA_AssetsGroups.Name = pName;
            cVarFA_AssetsGroups.SubAccountID = int.Parse(pSubAccountID);
            //cVarFA_AssetsGroups.AssetAccount_ID = 0;
            cVarFA_AssetsGroups.AssetAccumulatedDepreciationAccount_ID = 0;
            cVarFA_AssetsGroups.AssetCostCenter_ID = 0;
            cVarFA_AssetsGroups.Code = pCode;
           // cVarFA_AssetsGroups.AssetDepreciationAccount_ID = 0;
            //cVarFA_AssetsGroups.AssetDepreciationAccount_ID = 0;
            cVarFA_AssetsGroups.ParentSubAccountID = int.Parse(pParentSubAccountID);
            cVarFA_AssetsGroups.Percentage = decimal.Parse(pPercentage);

            cVarFA_AssetsGroups.AssetAccount_ID = (pAccountID) == null ? 0 : int.Parse(pAccountID);
            cVarFA_AssetsGroups.AssetAccumulatedDepreciationAccount_ID = (pAccumulatedDepreciationAccountID) == null ? 0 : int.Parse(pAccumulatedDepreciationAccountID);
            cVarFA_AssetsGroups.AssetDepreciationAccount_ID = (pDepreciationAccountID) == null ? 0 : int.Parse(pDepreciationAccountID);

            cVarFA_AssetsGroups.AssetCostCenter_ID = pAssetCostCenter_ID;

            CFA_AssetsGroups cFA_AssetsGroups = new CFA_AssetsGroups();
            cFA_AssetsGroups.lstCVarFA_AssetsGroups.Add(cVarFA_AssetsGroups);
            Exception checkException = cFA_AssetsGroups.SaveMethod(cFA_AssetsGroups.lstCVarFA_AssetsGroups);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = 0;
            }
            else //not unique
                _result = cVarFA_AssetsGroups.ID;
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




        //***********************************************************************************************************************************


    }
}

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
using Forwarding.MvcApp.Models.Administration.Settings.Generated;
using Forwarding.MvcApp.Models.Customized;

namespace Forwarding.MvcApp.Controllers.SC.API_SC_Stores
{
    public class SC_StoresController : ApiController
    {
        //[Route("/api/SC_Stores/LoadAll")]
        //[HttpGet, HttpPost]
        ////sherif: to be used in select boxes
        //public Object[] LoadAll(string pWhereClause)
        //{
        //    CSC_Stores objCSC_Stores = new CSC_Stores();
        //    objCSC_Stores.GetList(pWhereClause);
        //    return new Object[] { new JavaScriptSerializer().Serialize(objCSC_Stores.lstCVarSC_Stores) };
        //}


        [HttpGet, HttpPost]
        public Object[] IntializeData(string pStoresNamesOnly)
        {
            if (bool.Parse(pStoresNamesOnly))
            {
                CSC_Stores cSC_Stores = new CSC_Stores();
                cSC_Stores.GetList("where 1 = 1");
                return new Object[] { new JavaScriptSerializer().Serialize(cSC_Stores.lstCVarSC_Stores) };

            }
            else
            {
                CA_Accounts objCA_Accounts = new CA_Accounts();
                CvwA_CostCenters objCvwA_CostCenters = new CvwA_CostCenters();
                CSC_Stores cSC_Stores = new CSC_Stores();

                CSystemOptions objCSystemOptions = new CSystemOptions();
                objCSystemOptions.GetList(" Where OptionID=201");
                List<CVarvwA_CostCenters> ActivitiesList = null;
                if (objCSystemOptions.lstCVarSystemOptions.Count > 0 && objCSystemOptions.lstCVarSystemOptions[0].OptionValue)
                {
                    objCA_Accounts.GetList("WHERE IsMain=0 And ID in (select AA.AccountID from  A_Accounts_Activities AA  where ActivityCostCenterID=(select ActivityID from NoAccessActivities where SystemName = 'Forwarding'))");
                    CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
                    string pActivityID = objCCustomizedDBCall.CallStringFunction("select ActivityID from NoAccessActivities where SystemName = 'Forwarding'");
                    string pSearchWord = "";
                    ActivitiesList = objCCustomizedDBCall.ExecuteQuery_ListOfObjects(
                       @"A_LoadCostCenterByActivityAndUser " + WebSecurity.CurrentUserId + "," + pActivityID + ",'" + pSearchWord + "'"
                        , typeof(CVarvwA_CostCenters)).Cast<CVarvwA_CostCenters>().ToList();

                    objCvwA_CostCenters.lstCVarvwA_CostCenters = ActivitiesList.ToList();
                }
                else
                {
                    objCA_Accounts.GetList("Where IsMain = 0");
                    objCvwA_CostCenters.GetList("Where IsMain = 0");
                }
             

         
                cSC_Stores.GetList("where 1 = 1");

                var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };

                return new Object[] { serializer.Serialize(objCA_Accounts.lstCVarA_Accounts)
                    , serializer.Serialize(objCvwA_CostCenters.lstCVarvwA_CostCenters),
                    serializer.Serialize(cSC_Stores.lstCVarSC_Stores) };
            }
        }


        // [Route("/api/SC_Stores/LoadWithPaging/{pPageNumber}/{pPageSize}")]
        [HttpGet, HttpPost]
        public Object[] LoadWithPaging(Int32 pPageNumber, Int32 pPageSize, string pSearchKey)
        {
            CvwSC_Stores objCvwSC_Stores = new CvwSC_Stores();
            //objCvwSC_Stores.GetList(string.Empty);
            Int32 _RowCount = 0;// objCvwSC_Stores.lstCVarSC_Stores.Count;
            
            pSearchKey = (pSearchKey == null ? "" : pSearchKey.Trim().ToUpper());
            string whereClause = " Where StoreName LIKE '%" + pSearchKey + "%' "
                + " OR StoreNumber LIKE '%" + pSearchKey + "%' "
                 + " OR StoreAccountName LIKE '%" + pSearchKey + "%' "
                  + " OR OperationAccountName LIKE '%" + pSearchKey + "%' "
                   + " OR SalesAccountName LIKE '%" + pSearchKey + "%' "
                    + " OR CostCenterName LIKE '%" + pSearchKey + "%' ";

            objCvwSC_Stores.GetListPaging(pPageSize, pPageNumber, whereClause, " StoreName ", out _RowCount);

            return new Object[] { new JavaScriptSerializer().Serialize(objCvwSC_Stores.lstCVarvwSC_Stores), _RowCount };
        }

        // [Route("/api/SC_Stores/Insert/{pCode}/{pModificatorUser}/{pLocalName}}")]
        [HttpGet, HttpPost]
        public bool Insert(
            string pStoreName,
            String pStoreAccountID, 
            String pSalesAccountID, 
            string pOperationAccountID,
            string pCostCenterID,
            string pSubAccountID

            )
        {
            bool _result = false;

            CVarSC_Stores objCVarSC_Stores = new CVarSC_Stores();
            objCVarSC_Stores.StoreName = pStoreName;
            objCVarSC_Stores.StoreNumber = pStoreName;
            objCVarSC_Stores.ParentID = 0;
            objCVarSC_Stores.StoreAccountID = int.Parse(pStoreAccountID);
            objCVarSC_Stores.SalesAccountID = int.Parse(pSalesAccountID);
            objCVarSC_Stores.OperationAccountID = int.Parse(pOperationAccountID);
            objCVarSC_Stores.CostCenterID = (pCostCenterID == null ? 0 : int.Parse(pCostCenterID));
            objCVarSC_Stores.SubAccountID = (pSubAccountID == null ? 0 : int.Parse(pSubAccountID));

            objCVarSC_Stores.StoreLevel = 0;
            objCVarSC_Stores.IsMain = false;
            objCVarSC_Stores.StoreRealCode = "0";
            objCVarSC_Stores.IsLocked = false;
        

            CSC_Stores objCSC_Stores = new CSC_Stores();
            objCSC_Stores.lstCVarSC_Stores.Add(objCVarSC_Stores);
            Exception checkException = objCSC_Stores.SaveMethod(objCSC_Stores.lstCVarSC_Stores);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else //not unique
                _result = true;
            return _result;
        }

        // [Route("/api/SC_Stores/Update/{pID}/{pCode}/{pName}/{pLocalName}")]
        [HttpGet, HttpPost]
        public bool Update(int pID ,
            string pStoreName,
            String pStoreAccountID,
            String pSalesAccountID,
            string pOperationAccountID,
            string pCostCenterID,
            string pSubAccountID
            )
        {
            bool _result = false;

            CVarSC_Stores objCVarSC_Stores = new CVarSC_Stores();

            CSC_Stores objCGetCreationInformation = new CSC_Stores();
            objCVarSC_Stores.ID = pID;
            objCVarSC_Stores.StoreName = pStoreName;
            objCVarSC_Stores.StoreNumber = pStoreName;
            objCVarSC_Stores.ParentID = 0;
            objCVarSC_Stores.StoreAccountID = int.Parse(pStoreAccountID);
            objCVarSC_Stores.SalesAccountID = int.Parse(pSalesAccountID);
            objCVarSC_Stores.OperationAccountID = int.Parse(pOperationAccountID);
            objCVarSC_Stores.CostCenterID =( pCostCenterID == null ? 0 :  int.Parse(pCostCenterID));
            objCVarSC_Stores.SubAccountID = (pSubAccountID == null ? 0 : int.Parse(pSubAccountID));

            objCVarSC_Stores.StoreLevel = 0;
            objCVarSC_Stores.IsMain = false;
            objCVarSC_Stores.StoreRealCode = "0";
            objCVarSC_Stores.IsLocked = false;
            CSC_Stores objCSC_Stores = new CSC_Stores();
            objCSC_Stores.lstCVarSC_Stores.Add(objCVarSC_Stores);
            Exception checkException = objCSC_Stores.SaveMethod(objCSC_Stores.lstCVarSC_Stores);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else //not unique
                _result = true;
            return _result;



            // return new Object[] { _result, 1 };
        }

        [HttpGet, HttpPost]
        public bool Delete(String pSC_StoresIDs)
        {
            bool _result = false;
            CSC_Stores objCSC_Stores = new CSC_Stores();
            foreach (var currentID in pSC_StoresIDs.Split(','))
            {
                objCSC_Stores.lstDeletedCPKSC_Stores.Add(new CPKSC_Stores() { ID = Int32.Parse(currentID.Trim()) });
            }

            Exception checkException = objCSC_Stores.DeleteItem(objCSC_Stores.lstDeletedCPKSC_Stores);
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

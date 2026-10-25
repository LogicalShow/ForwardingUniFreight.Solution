using Forwarding.MvcApp.Models.Accounting.MasterData.Generated;
using Forwarding.MvcApp.Models.Administration.Settings.Generated;
using Forwarding.MvcApp.Models.Customized;
using Forwarding.MvcApp.Models.ReceiptsAndPayments.ShipLink.Generated;
using Forwarding.MvcApp.Models.ReceiptsAndPayments.ShipLinkMelk.Generated;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;

namespace Forwarding.MvcApp.Models.ReceiptsAndPayments.ShipLinkMelk.Generated
{
    public class ShipLinkMelkRevenueItemsController : ApiController
    {
        [HttpGet, HttpPost]
        public Object[] IntializeData(string pDate, string pOnlyCurrency)
        {

            Exception checkException = null;
            int _RowCount = 0;
            int pVoyageAccountID = 0;
            CvwA_Accounts objCvwA_Accounts = new CvwA_Accounts();
            CvwLinkedSubAccounts objCvwLinkedSubAccounts = new CvwLinkedSubAccounts();
            CvwA_CostCenters objCvwA_CostCenters = new CvwA_CostCenters();
            CvwSL_RevenueItems objCvwSL_RevenueItems = new CvwSL_RevenueItems();
            CvwDefaults objCDefaults = new CvwDefaults();
            //checkException = objCDefaults.GetList("WHERE 1=1");
            objCDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount);
            objCvwA_Accounts.GetListPaging(9999, 1, "WHERE IsMain=0", "Name, Code", out _RowCount);
            objCvwA_CostCenters.GetListPaging(9999, 1, "WHERE IsMain=0", "Name, Code", out _RowCount);

            //objCvwA_CostCenters.GetListPaging(9999, 1, "WHERE IsMain=0", "Name, Code", out _RowCount);
            objCvwSL_RevenueItems.GetListPaging(9999, 1, "WHERE 1=1", "Name", out _RowCount);

            CvwSL_ShippingItemsLinking objCvwSL_ShippingItemsLinking = new CvwSL_ShippingItemsLinking();

            objCvwSL_ShippingItemsLinking.GetListPaging(9999, 1, "WHERE 1=1", "ID", out _RowCount);

            if (objCvwSL_ShippingItemsLinking.lstCVarvwSL_ShippingItemsLinking.Count > 0 && objCDefaults.lstCVarvwDefaults[0].UnEditableCompanyName == "ONE")
            {
                pVoyageAccountID = objCvwSL_ShippingItemsLinking.lstCVarvwSL_ShippingItemsLinking[0].VoyageAccountID;
                checkException = objCvwLinkedSubAccounts.GetListPaging(9999, 1, "WHERE IsMain=0 AND Account_ID=" + pVoyageAccountID, "Name, Code", out _RowCount);
            }
            CvwLine objCvwLine = new CvwLine();
            checkException = objCvwLine.GetList("WHERE 1=1");

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                serializer.Serialize(objCvwSL_ShippingItemsLinking.lstCVarvwSL_ShippingItemsLinking)
                , _RowCount
                , new JavaScriptSerializer().Serialize(objCvwA_Accounts.lstCVarvwA_Accounts) //pAccounts = pData[2]
                , new JavaScriptSerializer().Serialize(objCvwLinkedSubAccounts.lstCVarvwLinkedSubAccounts) //pSubAccounts = pData[3]
                , new JavaScriptSerializer().Serialize(objCvwA_CostCenters.lstCVarvwA_CostCenters) //pCostCenters = pData[4]
                , new JavaScriptSerializer().Serialize(objCvwSL_RevenueItems.lstCVarvwSL_RevenueItems) //pRevenueItems = pData[5]
                , pVoyageAccountID //, pVoyageAccountID = pData[6]
                , new JavaScriptSerializer().Serialize(objCvwLine.lstCVarvwLine)  //Line pData[7]

            };

        }
        [HttpGet, HttpPost]
        public object[] LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned(bool pIsLoadArrayOfObjects, string pLanguage, Int32 pPageNumber, Int32 pPageSize, string pWhereClause, string pOrderBy)
        {
            int _RowCount = 0;
            CvwSL_ShippingItemsLinking objCvwSL_ShippingItemsLinking = new CvwSL_ShippingItemsLinking();

            objCvwSL_ShippingItemsLinking.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);

            return new object[] {
                new JavaScriptSerializer().Serialize(objCvwSL_ShippingItemsLinking.lstCVarvwSL_ShippingItemsLinking)
                , _RowCount
            };
        }
        [HttpGet, HttpPost]
        public object[] LoadRevenueItems(string pLanguage, Int32 pPageNumber, Int32 pPageSize, string pWhereClauseRevenueItems, string pOrderBy)
        {
            Exception checkException = null;
            int _RowCount = 0;
            CvwSL_RevenueItems objCvwSL_RevenueItems = new CvwSL_RevenueItems();
            checkException = objCvwSL_RevenueItems.GetListPaging(pPageSize, pPageNumber, pWhereClauseRevenueItems, pOrderBy, out _RowCount);
            return new object[] {
                new JavaScriptSerializer().Serialize(objCvwSL_RevenueItems.lstCVarvwSL_RevenueItems)
            };
        }
        [HttpGet, HttpPost]
        public bool CheckIfItemFound(Int64 pShiplinkItemID, string pImportExport, Int64 pID)
        {
            bool _result = false;

            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
            DataTable dt = objCCustomizedDBCall.ExecuteQuery_DataTable("SL_CheckIfItemFound " + pShiplinkItemID + ",'" + pImportExport + "'," + pID);
            if (dt.Rows.Count > 0)
            {
                _result = true;
            }
            else
            {
                _result = false;

            }
            return _result;

        }
        [HttpGet, HttpPost]
        public bool Insert(string pShiplinkItemID, string pRevenueAccountID, string pRevenueSubAccountID20, string pRevenueSubAccountID40, string pCostCenterID, string pImportExport, string pIsFreightItem
            , int pLineID)
        {
            bool _result = false;

            CVarSL_ShippingItemsLinking objCVarSL_ShippingItemsLinking = new CVarSL_ShippingItemsLinking();

            objCVarSL_ShippingItemsLinking.ID = 0;
            objCVarSL_ShippingItemsLinking.ShiplinkItemID = int.Parse(pShiplinkItemID);
            objCVarSL_ShippingItemsLinking.RevenueAccountID = int.Parse(pRevenueAccountID);
            objCVarSL_ShippingItemsLinking.mRevenueSubAccountID20 = int.Parse(pRevenueSubAccountID20);
            objCVarSL_ShippingItemsLinking.mRevenueSubAccountID40 = int.Parse(pRevenueSubAccountID40);
            objCVarSL_ShippingItemsLinking.CostCenterID = int.Parse(pCostCenterID);
            objCVarSL_ShippingItemsLinking.IsFreightItem = pIsFreightItem == "0" ? false : true;
            objCVarSL_ShippingItemsLinking.ImportExport = pImportExport;
            objCVarSL_ShippingItemsLinking.VoyageAccountID = 0;
            objCVarSL_ShippingItemsLinking.VoyageSubAccountID = 0;
            objCVarSL_ShippingItemsLinking.LineID = pLineID;

            CSL_ShippingItemsLinking objCSL_ShippingItemsLinking = new CSL_ShippingItemsLinking();
            objCSL_ShippingItemsLinking.lstCVarSL_ShippingItemsLinking.Add(objCVarSL_ShippingItemsLinking);
            Exception checkException = objCSL_ShippingItemsLinking.SaveMethod(objCSL_ShippingItemsLinking.lstCVarSL_ShippingItemsLinking);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else
            { //not unique
                _result = true;
                //CallCustomizedSP
                CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
                objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "SL_ShippingItemsLinking", objCVarSL_ShippingItemsLinking.ID, "I");
            }
            return _result;
        }

        [HttpGet, HttpPost]
        public bool Update(Int32 pID, string pShiplinkItemID, string pRevenueAccountID, string pRevenueSubAccountID20, string pRevenueSubAccountID40, string pCostCenterID, string pImportExport, string pIsFreightItem
            , int pLineID)
        {
            bool _result = false;

            CVarSL_ShippingItemsLinking objCVarSL_ShippingItemsLinking = new CVarSL_ShippingItemsLinking();

            objCVarSL_ShippingItemsLinking.ID = pID;
            objCVarSL_ShippingItemsLinking.ShiplinkItemID = int.Parse(pShiplinkItemID);
            objCVarSL_ShippingItemsLinking.RevenueAccountID = int.Parse(pRevenueAccountID);
            objCVarSL_ShippingItemsLinking.mRevenueSubAccountID20 = int.Parse(pRevenueSubAccountID20);
            objCVarSL_ShippingItemsLinking.mRevenueSubAccountID40 = int.Parse(pRevenueSubAccountID40);
            objCVarSL_ShippingItemsLinking.CostCenterID = int.Parse(pCostCenterID);
            objCVarSL_ShippingItemsLinking.IsFreightItem = pIsFreightItem == "0" ? false : true;
            objCVarSL_ShippingItemsLinking.ImportExport = pImportExport;
            objCVarSL_ShippingItemsLinking.VoyageAccountID = 0;
            objCVarSL_ShippingItemsLinking.VoyageSubAccountID = 0;
            objCVarSL_ShippingItemsLinking.LineID = pLineID;

            CSL_ShippingItemsLinking objCSL_ShippingItemsLinking = new CSL_ShippingItemsLinking();
            objCSL_ShippingItemsLinking.lstCVarSL_ShippingItemsLinking.Add(objCVarSL_ShippingItemsLinking);
            Exception checkException = objCSL_ShippingItemsLinking.SaveMethod(objCSL_ShippingItemsLinking.lstCVarSL_ShippingItemsLinking);

            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else
            { //not unique
                _result = true;
                CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
                objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "SL_ShippingItemsLinking", pID, "U");
            }
            return _result;
        }

        [HttpGet, HttpPost]
        public bool Delete(String pJVTypesIDs)
        {
            bool _result = true;
            CSL_ShippingItemsLinking objCSL_ShippingItemsLinking = new CSL_ShippingItemsLinking();
            Exception checkException = null;
            foreach (var currentID in pJVTypesIDs.Split(','))
            {
                objCSL_ShippingItemsLinking.lstDeletedCPKSL_ShippingItemsLinking.Add(new CPKSL_ShippingItemsLinking() { ID = Int32.Parse(currentID.Trim()) });
                checkException = objCSL_ShippingItemsLinking.DeleteItem(objCSL_ShippingItemsLinking.lstDeletedCPKSL_ShippingItemsLinking);
                if (checkException != null)
                    _result = false;
                else
                {
                    CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
                    objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "SL_ShippingItemsLinking", Int32.Parse(currentID.Trim()), "D");
                }

            }

            return _result;
        }

    }
}

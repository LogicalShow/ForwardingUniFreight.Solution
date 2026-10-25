using Forwarding.MvcApp.Models.Accounting.MasterData.Generated;
using Forwarding.MvcApp.Models.Administration.Settings.Generated;
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
    public class ShipLinkRevenueItemsController : ApiController
    {
        [HttpGet, HttpPost]
        public object[] LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned(bool pIsLoadArrayOfObjects, string pLanguage, Int32 pPageNumber, Int32 pPageSize, string pWhereClause, string pOrderBy)
        {
            Exception checkException = null;
            int _RowCount = 0;
            int pVoyageAccountID = 0;
            CvwA_Accounts objCvwA_Accounts = new CvwA_Accounts();
            CvwLinkedSubAccounts objCvwLinkedSubAccounts = new CvwLinkedSubAccounts();
            CvwA_CostCenters objCvwA_CostCenters = new CvwA_CostCenters();
            CvwSL_RevenueItems objCvwSL_RevenueItems = new CvwSL_RevenueItems();
            CvwDefaults objCDefaults = new CvwDefaults();
           // checkException = objCDefaults.GetList("WHERE 1=1");
            objCDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount);
            if (pIsLoadArrayOfObjects)
            {
                objCvwA_Accounts.GetListPaging(9999, 1, "WHERE IsMain=0", "Name, Code", out _RowCount);
                //objCvwA_CostCenters.GetListPaging(9999, 1, "WHERE IsMain=0", "Name, Code", out _RowCount);
                //objCvwSL_RevenueItems.GetListPaging(9999, 1, "WHERE 1=1", "Name", out _RowCount);
            }
            CvwSL_ShippingItemsLinking objCvwSL_ShippingItemsLinking = new CvwSL_ShippingItemsLinking();
            objCvwSL_ShippingItemsLinking.GetListPaging(9999, pPageNumber, pWhereClause, pOrderBy, out _RowCount);
            if (objCvwSL_ShippingItemsLinking.lstCVarvwSL_ShippingItemsLinking.Count > 0 && objCDefaults.lstCVarvwDefaults[0].UnEditableCompanyName == "ONE")
            {
                pVoyageAccountID = objCvwSL_ShippingItemsLinking.lstCVarvwSL_ShippingItemsLinking[0].VoyageAccountID;
                checkException = objCvwLinkedSubAccounts.GetListPaging(9999, 1, "WHERE IsMain=0 AND Account_ID=" + pVoyageAccountID, "Name, Code", out _RowCount);
            }
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                serializer.Serialize(objCvwSL_ShippingItemsLinking.lstCVarvwSL_ShippingItemsLinking)
                , _RowCount
                , pIsLoadArrayOfObjects ? new JavaScriptSerializer().Serialize(objCvwA_Accounts.lstCVarvwA_Accounts) : null //pAccounts = pData[2]
                , pIsLoadArrayOfObjects ? new JavaScriptSerializer().Serialize(objCvwLinkedSubAccounts.lstCVarvwLinkedSubAccounts) : null //pSubAccounts = pData[3]
                , pIsLoadArrayOfObjects ? new JavaScriptSerializer().Serialize(objCvwA_CostCenters.lstCVarvwA_CostCenters) : null //pCostCenters = pData[4]
                , pIsLoadArrayOfObjects ? new JavaScriptSerializer().Serialize(objCvwSL_RevenueItems.lstCVarvwSL_RevenueItems) : null //pRevenueItems = pData[5]
                , pVoyageAccountID //, pVoyageAccountID = pData[6]
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
        public object[] Save([FromBody] PostedSaveParameters postedSaveParameters)
        {
            Exception checkException = null;
            CSL_ShippingItemsLinking objCSL_ShippingItemsLinking = new CSL_ShippingItemsLinking();
            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
            string strMessage = "";

            objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId
                , "SL_ShippingItemsLinking Del For Ins"
                , 0, "D");
            checkException = objCSL_ShippingItemsLinking.DeleteList("WHERE 1=1");
            objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId
                , "SL_ShippingItemsLinking Insert " + (postedSaveParameters.pShiplinkItemIDList == null ? 0 : postedSaveParameters.pShiplinkItemIDList.Split(',').Length) + " Rows"
                , 0, "I");
            if (postedSaveParameters.pShiplinkItemIDList != null) //delete all so no inserted rows
            {
                var arrShiplinkItemID = postedSaveParameters.pShiplinkItemIDList.Split(',');
                var arrRevenueAccountID = postedSaveParameters.pRevenueAccountIDList.Split(',');
                var arrRevenueSubAccountID20 = postedSaveParameters.pRevenueSubAccountID20List.Split(',');
                var arrRevenueSubAccountID40 = postedSaveParameters.pRevenueSubAccountID40List.Split(',');
                var arrCostCenterID = postedSaveParameters.pCostCenterIDList.Split(',');
                var arrIsFreightItem = postedSaveParameters.pIsFreightItemList.Split(',');
                var arrImportExport = postedSaveParameters.pImportExportList.Split(',');
                var arrVoyageSubAccountID = postedSaveParameters.pVoyageSubAccountIDList.Split(',');
                var arrLineID = postedSaveParameters.pLineIDList.Split(',');
                int NumberOfRows = arrShiplinkItemID.Length;
                
                for (int i = 0; i < NumberOfRows && postedSaveParameters.pShiplinkItemIDList != ""; i++)
                {
                    strMessage = "Error occurred in the data in loop in ShipLinkRevenueItemsController,cs in Save()";
                    objCSL_ShippingItemsLinking.lstCVarSL_ShippingItemsLinking.RemoveAll(r => 1 == 1);
                    CVarSL_ShippingItemsLinking objCVarSL_ShippingItemsLinking = new CVarSL_ShippingItemsLinking();
                    objCVarSL_ShippingItemsLinking.ShiplinkItemID = Int32.Parse(arrShiplinkItemID[i]);
                    objCVarSL_ShippingItemsLinking.RevenueAccountID = Int32.Parse(arrRevenueAccountID[i]);
                    objCVarSL_ShippingItemsLinking.RevenueSubAccountID20 = Int32.Parse(arrRevenueSubAccountID20[i]);
                    objCVarSL_ShippingItemsLinking.RevenueSubAccountID40 = Int32.Parse(arrRevenueSubAccountID40[i]);
                    objCVarSL_ShippingItemsLinking.CostCenterID = Int32.Parse(arrCostCenterID[i]);
                    objCVarSL_ShippingItemsLinking.IsFreightItem = (arrIsFreightItem[i] == "1" ? true : false);
                    objCVarSL_ShippingItemsLinking.ImportExport = arrImportExport[i];
                    objCVarSL_ShippingItemsLinking.VoyageAccountID = postedSaveParameters.pVoyageAccountID;
                    objCVarSL_ShippingItemsLinking.VoyageSubAccountID = Int32.Parse(arrVoyageSubAccountID[i]);
                    objCVarSL_ShippingItemsLinking.LineID = Int32.Parse(arrLineID[i]);
                    objCSL_ShippingItemsLinking.lstCVarSL_ShippingItemsLinking.Add(objCVarSL_ShippingItemsLinking);
                    checkException = objCSL_ShippingItemsLinking.SaveMethod(objCSL_ShippingItemsLinking.lstCVarSL_ShippingItemsLinking);
                    if (checkException == null)
                        strMessage = "";
                    //objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "SL_ShippingItemsLinking", objCVarSL_ShippingItemsLinking.ID, "I");
                }
            }
            CvwSL_ShippingItemsLinking objCvwSL_ShippingItemsLinking = new CvwSL_ShippingItemsLinking();
            if (checkException == null)
            {
                checkException = objCvwSL_ShippingItemsLinking.GetList("ORDER BY ID");
            }
            return new object[] {
                strMessage == "" ? (checkException == null ? null : checkException.Message) : strMessage
                , new JavaScriptSerializer().Serialize(objCvwSL_ShippingItemsLinking.lstCVarvwSL_ShippingItemsLinking)
            };
        }
    }

    public class PostedSaveParameters
    {
        public string pShiplinkItemIDList { get; set; }
        public string pRevenueAccountIDList { get; set; }
        public string pRevenueSubAccountID20List { get; set; }
        public string pRevenueSubAccountID40List { get; set; }
        public string pCostCenterIDList { get; set; }
        public string pIsFreightItemList { get; set; }
        public string pImportExportList { get; set; }
        public string pVoyageSubAccountIDList { get; set; }
        public Int32 pVoyageAccountID { get; set; }
        public string pLineIDList { get; set; }
    }
}

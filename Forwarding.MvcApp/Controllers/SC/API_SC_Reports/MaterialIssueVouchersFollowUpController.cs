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
using Forwarding.MvcApp.Models.CRM.CRM_Reports.Generated;
using Forwarding.MvcApp.Helpers;
using Forwarding.MvcApp.Models.CRM.CRM_Reports.Customized;
using Forwarding.MvcApp.Models.CRM.CRM_Clients.Generated;
using Forwarding.MvcApp.Models.Administration.Security.Generated;
using Forwarding.MvcApp.Models.CRM.CRM_Sources.Generated;
using Forwarding.MvcApp.Models.CRM.CRM_Actions.Generated;
using Forwarding.MvcApp.Models.MasterData.Partners.Generated;
using Forwarding.MvcApp.Models.Administration.Settings.Generated;
using Forwarding.MvcApp.Models.NoAccess.Generated;
using Forwarding.MvcApp.Models.MasterData.Trucking.Generated;

namespace Forwarding.MvcApp.Controllers.SC.API_SC_Transactions
{
    public class MaterialIssueVouchersFollowUpController : ApiController
    {
        [HttpGet, HttpPost]
        public Object[] GetPrintedData(string pLanguage, string pStoresIDs , string pItemsIDs ,
              string pBranchesIDs
            , string pDepartmentsIDs
            , string pTrailersIDs
            , string pEquipmentsIDs
            , string pPartnerTypeID
            , string pPartnerID
            , DateTime pFromDate , DateTime pToDate , string pReportNo)
        {
            var ReportNo = pReportNo.Trim();
            bool pRecordsExist = false;
            Exception checkException = null;
            var ReportDate = new List<CVarSC_GetTransactionsDetails>();
            var HTMLTableRows = "";
            var Lang = System.Threading.Thread.CurrentThread.CurrentCulture.TwoLetterISOLanguageName;
            CSC_GetTransactionsDetails objSC_GetTransactionsDetails = new CSC_GetTransactionsDetails();

            TimeSpan FirsrDayTime = new TimeSpan(7, 0, 0); // new TimeSpan(7, 0, 0);
            TimeSpan LastDayTime = new TimeSpan(23, 45, 0); // new TimeSpan(19, 0, 0);

            pFromDate = pFromDate.Date + FirsrDayTime;
            pToDate = pToDate.Date + LastDayTime;



            var pWhereClause = "";
            //var pTransactionID = pWhereClause.Split('|')[1];
            //pWhereClause = " Where ID = " + pTransactionID + " ";
            int TotalRows = 10000;
            var srialize = new JavaScriptSerializer();
            srialize.MaxJsonLength = int.MaxValue;




            

            CvwMaterialIssueVoucherFollowUp vwMaterialIssueVoucherFollowUp = new CvwMaterialIssueVoucherFollowUp();

            CvwMaterialIssueVoucherFollowUp cDistinctMaterialIssueVoucherFollowUp = new CvwMaterialIssueVoucherFollowUp();


            pWhereClause = "   where  ( convert(date , TransactionDate) >= '" + pFromDate.Date + "' and convert(date , TransactionDate) <= '" + pToDate.Date + "'";
            pWhereClause += "  AND (N'" + pStoresIDs + "' = N'-1' or StoresIDs LIKE'%" + ","+pStoresIDs +"," + "%')";
            pWhereClause += "  AND (N'" + pItemsIDs + "' = N'-1' or ItemsIDs LIKE'%" + "," + pItemsIDs + "," + "%')";
            pWhereClause += "  AND (N'" + pPartnerID + "' = N'-1' or SuppliersIDs LIKE'%" + "," + pPartnerID + "," + "%')";
            pWhereClause += "  AND (   ( BranchID IN(SELECT CONVERT(INT, value) from [fn_split]('" + pBranchesIDs + "', ',') ))  ";
            pWhereClause += "       OR ( DepartmentID IN(SELECT CONVERT(INT, value) from [fn_split]('" + pDepartmentsIDs + "', ',') ))  ";
            pWhereClause += "       OR ( TrailerID IN(SELECT CONVERT(INT, value) from [fn_split]('" + pTrailersIDs + "', ',') ))  ";
            pWhereClause += "       OR ( EquipmentID IN(SELECT CONVERT(INT, value) from [fn_split]('" + pEquipmentsIDs + "', ',') ) )";
            pWhereClause += "       OR ( N'" + pTrailersIDs + "' = N'-1' and " + "N'" + pBranchesIDs + "' = N'-1' and " + "N'" + pDepartmentsIDs + "' = N'-1' and " + "N'" + pEquipmentsIDs + "' = N'-1' )";


                ;
            pWhereClause +=     " ) )";


            vwMaterialIssueVoucherFollowUp.GetListPaging(10000, 1, pWhereClause, " TransactionCode ", out TotalRows);


            cDistinctMaterialIssueVoucherFollowUp.lstCVarvwMaterialIssueVoucherFollowUp.AddRange(vwMaterialIssueVoucherFollowUp.lstCVarvwMaterialIssueVoucherFollowUp.DistinctBy(x => x.ID).ToList());


            return new Object[] { srialize.Serialize(vwMaterialIssueVoucherFollowUp.lstCVarvwMaterialIssueVoucherFollowUp.Where(x=> x._Type == "Items").ToList())

                    , srialize.Serialize(vwMaterialIssueVoucherFollowUp.lstCVarvwMaterialIssueVoucherFollowUp.Where(x=> x._Type == "Expenses").ToList())
                     , srialize.Serialize(cDistinctMaterialIssueVoucherFollowUp.lstCVarvwMaterialIssueVoucherFollowUp)

                    
            };



            
        }
        
        [HttpGet, HttpPost]
        //sherif: to be used in select boxes
        public Object[] FillFilter()
        {

            //--------------------------------------------------------------------
            CSC_Stores cSC_Stores = new CSC_Stores();
            cSC_Stores.GetList("where 1 = 1");

            CvwPurchaseItem cPurchaseItem = new CvwPurchaseItem();
           // cPurchaseItem.GetList("where 1 = 1");
            var row = 0;
            cPurchaseItem.GetListPaging(10000, 1, "where 1 = 1", " ID ", out row);


            CvwSuppliers cvwSuppliers = new CvwSuppliers();
            cvwSuppliers.GetList("where 1 = 1");

            CTRCK_Trailers cTRCK_Trailers = new CTRCK_Trailers();
            cTRCK_Trailers.GetList("where 1 = 1");

            CTRCK_Equipments cTRCK_Equipments = new CTRCK_Equipments();
            cTRCK_Equipments.GetList("where 1 = 1");

            CNoAccessDepartments cNoAccessDepartments = new CNoAccessDepartments();
            cNoAccessDepartments.GetList("where 1 = 1");


            CBranches cBranches = new CBranches();
            cBranches.GetList("where 1 = 1");

            var srialize = new JavaScriptSerializer();
            srialize.MaxJsonLength = int.MaxValue;


            return new Object[]
            {
                                  srialize.Serialize(cSC_Stores.lstCVarSC_Stores) ,
                                  srialize.Serialize(cPurchaseItem.lstCVarvwPurchaseItem),
                                  srialize.Serialize(cvwSuppliers.lstCVarvwSuppliers),
                                  srialize.Serialize(cBranches.lstCVarBranches),
                                  srialize.Serialize(cNoAccessDepartments.lstCVarNoAccessDepartments),
                                  srialize.Serialize(cTRCK_Trailers.lstCVarTRCK_Trailers),
                                  srialize.Serialize(cTRCK_Equipments.lstCVarTRCK_Equipments)
            };
        }






    }






}



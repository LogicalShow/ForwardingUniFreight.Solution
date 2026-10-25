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
using Forwarding.MvcApp.Models.PS.PS_Transactions.Generated;
using Forwarding.MvcApp.Models.MasterData.Invoicing.Generated;
using Forwarding.MvcApp.Models.MasterData.Partners.Generated;
using Forwarding.MvcApp.Models.NoAccess.Generated;
using System.Data.SqlClient;
using System.Configuration;
using Forwarding.MvcApp.Models.MasterData.Others.Generated;
using Forwarding.MvcApp.Models.SC.Transactions.Generated;
using MoreLinq;
using Forwarding.MvcApp.Models.Administration.Settings.Generated;

namespace Forwarding.MvcApp.Controllers.MasterData.API_Invoicing
{
    public class PS_PurchasingOrdersController : ApiController
    {
  

        [HttpGet, HttpPost]
        public Object[] IntializeData(string pDate , int? pID)
        {
            var srialize = new JavaScriptSerializer();
            srialize.MaxJsonLength = int.MaxValue;
            if (pID == null)
            {

                CSuppliers cSuppliers = new CSuppliers();
                CvwCurrencyDetails cCurrencies = new CvwCurrencyDetails();
                CA_CostCenters cA_CostCenters = new CA_CostCenters();
                //CvwSC_PurchaseItem cPurchaseItem = new CvwSC_PurchaseItem();
                CvwSC_PurchaseItemPS cPurchaseItem = new CvwSC_PurchaseItemPS();
                CServices cServices = new CServices();
                CPS_Quotations cPS_Quotations = new CPS_Quotations();
                CNoAccessDepartments cNoAccessDepartments = new CNoAccessDepartments();
                cNoAccessDepartments.GetList("where 1 = 1");
                CBranches cBranches = new CBranches();
                cBranches.GetList(" where 1 = 1 ");
                //---
                CPackageTypes Units = new CPackageTypes();
                Units.GetList("where 1 = 1");
                //----
                cSuppliers.GetList("where 1 = 1 order by Name");
                cCurrencies.GetList(" where  CONVERT(date , \'" + pDate + "\') between  CONVERT(date ,FromDate) and  CONVERT(date ,ToDate) ");
               // cA_CostCenters.GetList("where isnull(IsMain , 0 ) = 0 order by CostCenterName"); 
                cPurchaseItem.GetList("where 1 = 1");
                cServices.GetList("where 1 = 1");

                var PS_QuotationsCondition = " where ";
                PS_QuotationsCondition += " ( ";
                PS_QuotationsCondition += " Isnull(dbo.PS_Quotations.IsApproved , 0 ) = 1 ";
                PS_QuotationsCondition += " AND ";
                PS_QuotationsCondition += " Isnull(dbo.PS_Quotations.IsDeleted , 0 ) = 0 ";
                PS_QuotationsCondition += " AND ";
                PS_QuotationsCondition += " (not EXISTS (select top(1) PO.ID from dbo.PS_PurchasingOrders PO where PO.PS_QuotationsID = dbo.PS_Quotations.ID )) ";
                PS_QuotationsCondition += " ) ";
                cPS_Quotations.GetList(PS_QuotationsCondition);

           
               // cPS_PurchasingRequest.GetList(PS_PurchasingRequestCondition);

                return new Object[]
                {
                srialize.Serialize(cSuppliers.lstCVarSuppliers), //0
                srialize.Serialize(cCurrencies.lstCVarvwCurrencyDetails),//1
                srialize.Serialize(cA_CostCenters.lstCVarA_CostCenters) ,//2
                srialize.Serialize(cPurchaseItem.lstCVarvwSC_PurchaseItemPS) ,//3
                srialize.Serialize(cServices.lstCVarServices) ,//4
                srialize.Serialize(Units.lstCVarPackageTypes) //5
                , srialize.Serialize(cBranches.lstCVarBranches)//6
                , srialize.Serialize(cNoAccessDepartments.lstCVarNoAccessDepartments)//7
                , srialize.Serialize(cPS_Quotations.lstCVarPS_Quotations)//8
                };
            }
            else
            {
                CSC_Transactions cSC_Transactions = new CSC_Transactions();
                CvwCurrencyDetails cCurrencies = new CvwCurrencyDetails();
                cCurrencies.GetList(" where  CONVERT(date , \'" + pDate + "\') between  CONVERT(date ,FromDate) and  CONVERT(date ,ToDate) ");
                CPS_Quotations cPS_Quotations = new CPS_Quotations();
                var PS_QuotationsCondition = " where ";
                PS_QuotationsCondition += " ( ";
                PS_QuotationsCondition += " Isnull(dbo.PS_Quotations.IsApproved , 0 ) = 1 ";
                PS_QuotationsCondition += " AND ";
                PS_QuotationsCondition += " Isnull(dbo.PS_Quotations.IsDeleted , 0 ) = 0 ";
                PS_QuotationsCondition += " AND ";
                PS_QuotationsCondition += " (not EXISTS (select top(1) PO.ID from dbo.PS_PurchasingOrders PO where PO.PS_QuotationsID = dbo.PS_Quotations.ID AND PO.ID <> "+ pID + " )) ";
                PS_QuotationsCondition += " ) ";
                cPS_Quotations.GetList(PS_QuotationsCondition);


                return new Object[]
                {   srialize.Serialize(cCurrencies.lstCVarvwCurrencyDetails) ,
                    srialize.Serialize(cPS_Quotations.lstCVarPS_Quotations)
                };
            }
        }


        // [Route("/api/PS_Invoices/LoadWithPaging/{pPageNumber}/{pPageSize}")]
        [HttpGet, HttpPost]
        public Object[] LoadWithPaging(Int32 pPageNumber, Int32 pPageSize, string pSearchKey)
        {


            var srialize = new JavaScriptSerializer();
            srialize.MaxJsonLength = int.MaxValue;


            CvwPS_PurchasingOrders objCPS_InvoicesRequest = new CvwPS_PurchasingOrders();
            //objCPS_Invoices.GetList(string.Empty);
            Int32 _RowCount = 0;// objCPS_Invoices.lstCVarPS_Invoices.Count;


            objCPS_InvoicesRequest.GetListPaging(pPageSize, pPageNumber, " where 1 = 1 ", " Name ", out _RowCount);
            return new Object[] { srialize.Serialize(objCPS_InvoicesRequest.lstCVarvwPS_PurchasingOrders), _RowCount };
        }


        [HttpGet, HttpPost]
        public object[] LoadWithWhereClause(Int32 pPageNumber, Int32 pPageSize, string pWhereClause)
        {
            CvwPS_PurchasingOrders cvwPS_PurchasingOrders = new CvwPS_PurchasingOrders();

            Int32 _RowCount = 0;



            var PS_PurchasingOrdersCondition = " AND ";
            PS_PurchasingOrdersCondition += " ( ";
            PS_PurchasingOrdersCondition += " 1 = 1 ";
            // PS_PurchasingOrdersCondition += " (not EXISTS (select top(1) Q.ID from dbo.PS_PurchasingOrders Q where Q.PurchasingRequestID = dbo.vwPS_PurchasingOrders.PurchasingRequestID AND IsNull( Q.IsApproved , 0 ) = 1 )) ";
            PS_PurchasingOrdersCondition += " ) ";

            pWhereClause = pWhereClause + PS_PurchasingOrdersCondition;
            cvwPS_PurchasingOrders.GetListPaging(pPageSize, pPageNumber, pWhereClause, " ID DESC ", out _RowCount);
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[] { serializer.Serialize(cvwPS_PurchasingOrders.lstCVarvwPS_PurchasingOrders), _RowCount };
        }


        [HttpGet, HttpPost]
        public object[] LoadDetails(string pWhereClause)
        {

            CvwPS_PurchasingOrdersHeaderDetails cvwPS_PurchasingOrdersHeaderDetails = new CvwPS_PurchasingOrdersHeaderDetails();
            //cvwPS_PurchasingOrdersHeaderDetails.GetList(pWhereClause);
            Int32 _RowCount = 0;
            cvwPS_PurchasingOrdersHeaderDetails.GetListPaging(100000, 1, pWhereClause, " ID ", out _RowCount);

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
                return new Object[] 
                {
                serializer.Serialize(cvwPS_PurchasingOrdersHeaderDetails.lstCVarvwPS_PurchasingOrdersHeaderDetails)
                };
            
        }

        // http://localhost:7059/api/PS_Invoices/Save?pID=0&pInvoiceNo=0&pInvoiceDate=07%2F26%2F2020&pQuotationID=0&pSupplierID=259&pTotalBeforTax=37.00&pTotalPrice=37.00&pDiscount=0.00&pDiscountPercentage=0.00&pNotes=0&pDepartmentID=0&pSalesManID=0&pCostCenter_ID=0&pPaymentMethodID=50&pISDiscountBeforeTax=false&pInvoiceNoManual=0&pOrderID=0&

        [HttpPost]
        public object[] Save(
           [FromBody] SavePurchasingOrderModel model

            )
        {
           

            TimeSpan FirsrDayTime = new TimeSpan(7, 0, 0); // new TimeSpan(7, 0, 0);
            Exception checkException = new Exception();
           long? _result = null;
            //---- Get Last Code
            var objlastcode = new CPS_PurchasingOrders();
            CVarPS_PurchasingOrders cVarPS_PurchasingOrders = new CVarPS_PurchasingOrders();
            if (int.Parse(model.pID) == 0)
            {
                objlastcode.GetList("WHERE ID = (select max(ID) from PS_PurchasingOrders where Isnull(IsDeleted , 0) = 0 and DATEPART(year, PS_PurchasingOrders.PurchasingOrderDate) = '" + model.pPurchasingOrderDate.Year + "')");
                var lastcode = objlastcode.lstCVarPS_PurchasingOrders.Count == 0 ? 0 : int.Parse(objlastcode.lstCVarPS_PurchasingOrders[0].PurchasingOrderNo);
                //----

                cVarPS_PurchasingOrders.PurchasingOrderNo = (lastcode + 1).ToString();
            }
            else
            {
                cVarPS_PurchasingOrders.PurchasingOrderNo = model.pPurchasingOrderNo;
            }


            cVarPS_PurchasingOrders.ID = long.Parse(model.pID);
            cVarPS_PurchasingOrders.PurchasingOrderDate = model.pPurchasingOrderDate.Date + FirsrDayTime;
            cVarPS_PurchasingOrders.Notes = (model.pNotes == null ? "0" : model.pNotes );
            cVarPS_PurchasingOrders.CostCenter_ID = 0;
            cVarPS_PurchasingOrders.SupplierID = int.Parse(model.pSupplierID); 
            cVarPS_PurchasingOrders.PS_QuotationsID = long.Parse(model.pPS_QuotationsID);
            cVarPS_PurchasingOrders.CurrencyID = int.Parse(model.pCurrencyID);
            cVarPS_PurchasingOrders.ExchangeRate = decimal.Parse(model.pExchangeRate);
            cVarPS_PurchasingOrders.BranchID = int.Parse(model.pBranchID);
            cVarPS_PurchasingOrders.DepartmentID = int.Parse(model.pDepartmentID);
            cVarPS_PurchasingOrders.IsApproved = bool.Parse(model.pIsApproved == null ? "false" : model.pIsApproved);
            cVarPS_PurchasingOrders.IsDeleted = bool.Parse(model.pIsDeleted == null ? "false" : model.pIsDeleted);
            cVarPS_PurchasingOrders.PurchasingOrderNoManual = model.pPurchasingOrderNoManual;
            cVarPS_PurchasingOrders.CreatedUserID = (int.Parse(model.pID) == 0 ? WebSecurity.CurrentUserId : int.Parse(model.pCreatedUserID));
            cVarPS_PurchasingOrders.EditedByUserID = WebSecurity.CurrentUserId;
            cVarPS_PurchasingOrders.ApprovedUserID = (int.Parse(model.pID) == 0 ? 0 : int.Parse(model.pApprovedUserID));
            var CurrentDate = DateTime.Now;
            var EmptyDate = new DateTime(1900, 01, 01);
            cVarPS_PurchasingOrders.CreatedDate = (int.Parse(model.pID) == 0 ? CurrentDate : model.pCreatedDate); 
            cVarPS_PurchasingOrders.EditedDate = CurrentDate; 
            cVarPS_PurchasingOrders.ApprovedDate = (int.Parse(model.pID) == 0 ? EmptyDate : model.pApprovedDate);
            CPS_PurchasingOrders cPS_PurchasingOrders = new CPS_PurchasingOrders();
            cPS_PurchasingOrders.lstCVarPS_PurchasingOrders.Add(cVarPS_PurchasingOrders);
            checkException = cPS_PurchasingOrders.SaveMethod(cPS_PurchasingOrders.lstCVarPS_PurchasingOrders);

            var res = false;
            if (checkException != null ) // an exception is caught in the model
            {
                    _result = 0;
                res = false;
            }
            else //not unique
            {
                    _result = cVarPS_PurchasingOrders.ID;
                res = true;
            }

            return new object[] { res, _result };
        }



        [HttpGet, HttpPost]
        [AllowAnonymous]
        public object[] InsertItems([FromBody]string pItems)
        {

                var Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
                var _result = false;
                var obj = new JavaScriptSerializer().Deserialize<List<object>>(pItems);
                var Obj_List_Items = obj[0];

                var serialize = new JavaScriptSerializer();
                var Details = serialize.Deserialize<List<CVarPS_PurchasingOrdersDetails>>(serialize.Serialize(Obj_List_Items));
  
                Exception checkException = new Exception();
                CPS_PurchasingOrdersDetails cPS_PurchasingOrdersDetails = new CPS_PurchasingOrdersDetails();

                if (Details != null && Details.Count > 0)
                {
                    checkException = cPS_PurchasingOrdersDetails.SaveMethod(Details);
                    var DetailsIDs = String.Join(",", Details.Select(x => x.ID).ToList());
                    cPS_PurchasingOrdersDetails.DeleteList("where PS_PurchasingOrdersID = " + Details[0].PS_PurchasingOrdersID + " and ID Not IN(" + DetailsIDs + ")");
                }
                else
                {
                    cPS_PurchasingOrdersDetails.DeleteList("where PS_PurchasingOrdersID = " + Details[0].PS_PurchasingOrdersID);
                }
                //*********************

                //************************
                var message = "";

                if (checkException != null)
                {
                    message = "Please Insert Correct Data";
                }
                else
                {
                    _result = true;
                    message = "Done";

                }
                return new object[] {
                _result , message
            };
            
            




            
        }

        [HttpGet, HttpPost]
        public bool Delete(String pPS_PurchasingOrdersIDs)
        {
            bool _result = false;

           // CPS_Invoices objCPS_Invoices = new CPS_Invoices();
            CPS_PurchasingOrders cPS_PurchasingOrders = new CPS_PurchasingOrders();
            string pUpdateClause = "";
            pUpdateClause = " IsDeleted = 1   " + " WHERE ID In(" + pPS_PurchasingOrdersIDs + ")";
            var checkException = cPS_PurchasingOrders.UpdateList(pUpdateClause);
            //----
            CPS_PurchasingOrdersDetails cPS_PurchasingOrdersDetails = new CPS_PurchasingOrdersDetails();

            var pDeleteClause = "";
            pDeleteClause = "WHERE PS_PurchasingOrdersID In(" + pPS_PurchasingOrdersIDs + ")";
            checkException = cPS_PurchasingOrdersDetails.DeleteList(pDeleteClause);



            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("DELETE")) // some or all of the rows were not deleted due to dependencies
                    _result = false;
            }
            else //deleted successfully
            {
                //CSC_Transactions cSC_Transactions = new CSC_Transactions();
                _result = true;
                //string pUpdateClause1 = "";
                //pUpdateClause1 = " PurchaseInvoiceID = 0 , IsOutOfStore = 1  " + " WHERE PurchaseInvoiceID In(" + pPS_InvoicesIDs + ")";
                //var checkException11 = cSC_Transactions.UpdateList(pUpdateClause1);
            }
               
            return _result;
        }
    }



    public class SavePurchasingOrderModel

    {
        public string pID{ get; set; }
        public string pPurchasingOrderNo{ get; set; }
        public DateTime pPurchasingOrderDate{ get; set; }
        public string pNotes{ get; set; }
        public string pPS_QuotationsID { get; set; }
        public string pSupplierID { get; set; }
        public string pCurrencyID { get; set; }

        public string pExchangeRate { get; set; }
        public string pBranchID { get; set; }
        public string pDepartmentID { get; set; }

        public string pIsApproved{ get; set; }
        public string pPurchasingOrderNoManual{ get; set; }
        public string pIsDeleted{ get; set; }
        public string pCreatedUserID{ get; set; }
        public string pEditedByUserID{ get; set; }
        public string pApprovedUserID{ get; set; }
        public DateTime pCreatedDate{ get; set; }
        public DateTime pEditedDate { get; set; }
        public DateTime pApprovedDate { get; set; }

    }
}

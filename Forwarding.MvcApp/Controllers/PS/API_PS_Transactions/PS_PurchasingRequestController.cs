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
    public class PS_PurchasingRequestController : ApiController
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
               // CvwSC_PurchaseItem cPurchaseItem = new CvwSC_PurchaseItem();
                CvwSC_PurchaseItemPS cPurchaseItem = new CvwSC_PurchaseItemPS();

                CServices cServices = new CServices();


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
                cA_CostCenters.GetList("where isnull(IsMain , 0 ) = 0 order by CostCenterName"); 
                cPurchaseItem.GetList("where 1 = 1");
                cServices.GetList("where 1 = 1");


                return new Object[]
                {
                srialize.Serialize(cSuppliers.lstCVarSuppliers),
                srialize.Serialize(cCurrencies.lstCVarvwCurrencyDetails),
                "",
                "",
                srialize.Serialize(cA_CostCenters.lstCVarA_CostCenters) ,
                srialize.Serialize(cPurchaseItem.lstCVarvwSC_PurchaseItemPS) ,
                "" ,
                srialize.Serialize(cServices.lstCVarServices) ,
                "" ,  new JavaScriptSerializer().Serialize(Units.lstCVarPackageTypes) 
                , new JavaScriptSerializer().Serialize(cBranches.lstCVarBranches)
                , new JavaScriptSerializer().Serialize(cNoAccessDepartments.lstCVarNoAccessDepartments)
                };
            }
            else
            {
                CSC_Transactions cSC_Transactions = new CSC_Transactions();
                CvwCurrencyDetails cCurrencies = new CvwCurrencyDetails();
                cCurrencies.GetList(" where  CONVERT(date , \'" + pDate + "\') between  CONVERT(date ,FromDate) and  CONVERT(date ,ToDate) ");
                var SC_TransactionsCondition = " where (SC_Transactions.ID not In( select isnull( vw.TransactionID , 0 ) from vwPS_Invoices vw where isnull(vw.IsDeleted,0) = 0 and vw.TransactionID is not null and IsNULL(vw.IsFromTrans , 0) = 1 ) or SC_Transactions.PurchaseInvoiceID = " + pID + ") and SC_Transactions.TransactionTypeID = 10 and isnull(SC_Transactions.IsDeleted , 0) = 0 and Isnull(ExaminationID , 0) <> 0";
                cSC_Transactions.GetList(SC_TransactionsCondition);
                return new Object[]
                {   srialize.Serialize(cCurrencies.lstCVarvwCurrencyDetails) , srialize.Serialize(cSC_Transactions.lstCVarSC_Transactions)};
            }
        }


        // [Route("/api/PS_Invoices/LoadWithPaging/{pPageNumber}/{pPageSize}")]
        [HttpGet, HttpPost]
        public Object[] LoadWithPaging(Int32 pPageNumber, Int32 pPageSize, string pSearchKey)
        {


            var srialize = new JavaScriptSerializer();
            srialize.MaxJsonLength = int.MaxValue;


            CvwPS_PurchasingRequest objCPS_InvoicesRequest = new CvwPS_PurchasingRequest();
            //objCPS_Invoices.GetList(string.Empty);
            Int32 _RowCount = 0;// objCPS_Invoices.lstCVarPS_Invoices.Count;


            objCPS_InvoicesRequest.GetListPaging(pPageSize, pPageNumber, " where 1 = 1 ", " Name ", out _RowCount);

            return new Object[] { srialize.Serialize(objCPS_InvoicesRequest.lstCVarvwPS_PurchasingRequest), _RowCount };
        }


        [HttpGet, HttpPost]
        public object[] LoadWithWhereClause(Int32 pPageNumber, Int32 pPageSize, string pWhereClause)
        {
            CvwPS_PurchasingRequest cvwPS_PurchasingRequest = new CvwPS_PurchasingRequest();

            Int32 _RowCount = 0;



            var PS_PurchasingRequestCondition = " AND ";
            PS_PurchasingRequestCondition += " ( ";
            PS_PurchasingRequestCondition += " (not EXISTS (select top(1) Q.ID from dbo.PS_Quotations Q where Q.PurchasingRequestID = dbo.vwPS_PurchasingRequest.ID AND IsNull( Q.IsApproved , 0 ) = 1 )) ";
            PS_PurchasingRequestCondition += " ) ";


            pWhereClause = pWhereClause + PS_PurchasingRequestCondition;

            cvwPS_PurchasingRequest.GetListPaging(pPageSize, pPageNumber, pWhereClause, " ID DESC ", out _RowCount);
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[] { serializer.Serialize(cvwPS_PurchasingRequest.lstCVarvwPS_PurchasingRequest), _RowCount };
        }


        [HttpGet, HttpPost]
        public object[] LoadDetails(string pWhereClause)
        {

            CvwPS_PurchasingRequestHeaderDetails cvwPS_PurchasingRequestHeaderDetails = new CvwPS_PurchasingRequestHeaderDetails();
            cvwPS_PurchasingRequestHeaderDetails.GetList(pWhereClause);


                var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
                return new Object[] 
                {
                serializer.Serialize(cvwPS_PurchasingRequestHeaderDetails.lstCVarvwPS_PurchasingRequestHeaderDetails)
                };
            
        }

        
        public void CheckSavedPS(string pIsFromTrans , string pTransactionID ,ref CVarPS_Invoices objCVarPS_Invoices ,ref CPS_Invoices objCPS_Invoices ,ref Exception checkException, ref long? _result )
        {
            if (bool.Parse(pIsFromTrans))
            {
                CSC_Transactions sC_Transactions = new CSC_Transactions();
                sC_Transactions.GetList("where ID = " + pTransactionID);
                var transaction_date = sC_Transactions.lstCVarSC_Transactions[0].TransactionDate;








                if (objCVarPS_Invoices.InvoiceDate >= transaction_date)
                {
                    objCPS_Invoices.lstCVarPS_Invoices.Add(objCVarPS_Invoices);
                    checkException = objCPS_Invoices.SaveMethod(objCPS_Invoices.lstCVarPS_Invoices);
                    _result = 0;

                }
                else
                {
                    _result = null;
                    // checkException.Message = "Date Must >= Good Receipt Note Date";

                }



            }
            else
            {
                objCPS_Invoices.lstCVarPS_Invoices.Add(objCVarPS_Invoices);
                checkException = objCPS_Invoices.SaveMethod(objCPS_Invoices.lstCVarPS_Invoices);
                _result = 0;
            }

        }



        // http://localhost:7059/api/PS_Invoices/Save?pID=0&pInvoiceNo=0&pInvoiceDate=07%2F26%2F2020&pQuotationID=0&pSupplierID=259&pTotalBeforTax=37.00&pTotalPrice=37.00&pDiscount=0.00&pDiscountPercentage=0.00&pNotes=0&pDepartmentID=0&pSalesManID=0&pCostCenter_ID=0&pPaymentMethodID=50&pISDiscountBeforeTax=false&pInvoiceNoManual=0&pOrderID=0&

        [HttpPost]
        public object[] Save(
           [FromBody] SaveRequestModel model

            )
        {
           

            TimeSpan FirsrDayTime = new TimeSpan(7, 0, 0); // new TimeSpan(7, 0, 0);
            Exception checkException = new Exception();
           long? _result = null;
            //---- Get Last Code
            var objlastcode = new CPS_PurchasingRequest();
            CVarPS_PurchasingRequest cVarPS_PurchasingRequest = new CVarPS_PurchasingRequest();
            if (int.Parse(model.pID) == 0)
            {
                objlastcode.GetList("WHERE ID = (select max(ID) from PS_PurchasingRequest where Isnull(IsDeleted , 0) = 0 and DATEPART(year, PS_PurchasingRequest.RequestDate) = '" + model.pRequestDate.Year + "')");
                var lastcode = objlastcode.lstCVarPS_PurchasingRequest.Count == 0 ? 0 : int.Parse(objlastcode.lstCVarPS_PurchasingRequest[0].RequestNo);
                //----

                cVarPS_PurchasingRequest.RequestNo = (lastcode + 1).ToString();
            }
            else
            {
                cVarPS_PurchasingRequest.RequestNo = model.pRequestNo;
            }


            cVarPS_PurchasingRequest.ID = int.Parse(model.pID);
            cVarPS_PurchasingRequest.RequestDate = model.pRequestDate.Date + FirsrDayTime;
            cVarPS_PurchasingRequest.Notes = (model.pNotes == null ? "0" : model.pNotes );
            cVarPS_PurchasingRequest.DepartmentID = int.Parse(model.pDepartmentID == null ? "0" : model.pDepartmentID);
            cVarPS_PurchasingRequest.BranchID = int.Parse(model.pBranchID == null ? "0" : model.pBranchID);
            cVarPS_PurchasingRequest.CostCenter_ID = int.Parse(model.pCostCenter_ID == null ? "0" : model.pCostCenter_ID);
            cVarPS_PurchasingRequest.IsApproved = bool.Parse(model.pIsApproved == null ? "false" : model.pIsApproved);
            cVarPS_PurchasingRequest.IsDeleted = bool.Parse(model.pIsDeleted == null ? "false" : model.pIsDeleted);
            cVarPS_PurchasingRequest.RequestNoManual = model.pRequestNoManual;
            cVarPS_PurchasingRequest.SupplierID = 0;
            cVarPS_PurchasingRequest.CreatedUserID = (int.Parse(model.pID) == 0 ? WebSecurity.CurrentUserId : int.Parse(model.pCreatedUserID));
            cVarPS_PurchasingRequest.EditedByUserID = WebSecurity.CurrentUserId;
            cVarPS_PurchasingRequest.ApprovedUserID = (int.Parse(model.pID) == 0 ? 0 : int.Parse(model.pApprovedUserID));
            var CurrentDate = DateTime.Now;
            var EmptyDate = new DateTime(1900, 01, 01);
            cVarPS_PurchasingRequest.CreatedDate = (int.Parse(model.pID) == 0 ? CurrentDate : model.pCreatedDate); 
            cVarPS_PurchasingRequest.EditedDate = CurrentDate; 
            cVarPS_PurchasingRequest.ApprovedDate = (int.Parse(model.pID) == 0 ? EmptyDate : model.pApprovedDate);



            CPS_PurchasingRequest cPS_PurchasingRequest = new CPS_PurchasingRequest();
            cPS_PurchasingRequest.lstCVarPS_PurchasingRequest.Add(cVarPS_PurchasingRequest);
            checkException = cPS_PurchasingRequest.SaveMethod(cPS_PurchasingRequest.lstCVarPS_PurchasingRequest);

            var res = false;
            if (checkException != null ) // an exception is caught in the model
            {
                    _result = 0;
                res = false;
            }
            else //not unique
            {
                    _result = cVarPS_PurchasingRequest.ID;
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
                var Details = serialize.Deserialize<List<CVarPS_PurchasingRequestDetails>>(serialize.Serialize(Obj_List_Items));
  
                Exception checkException = new Exception();
                CPS_PurchasingRequestDetails cPS_PurchasingRequestDetails = new CPS_PurchasingRequestDetails();

                if (Details != null && Details.Count > 0)
                {
                    checkException = cPS_PurchasingRequestDetails.SaveMethod(Details);
                    var DetailsIDs = String.Join(",", Details.Select(x => x.ID).ToList());
                    cPS_PurchasingRequestDetails.DeleteList("where RequestID = " + Details[0].RequestID + " and ID Not IN(" + DetailsIDs + ")");
                }
                else
                {
                    cPS_PurchasingRequestDetails.DeleteList("where RequestID = " + Details[0].RequestID);
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
        public bool Delete(String pPS_PurchasingRequestIDs)
        {
            bool _result = false;

           // CPS_Invoices objCPS_Invoices = new CPS_Invoices();
            CPS_PurchasingRequest cPS_PurchasingRequest = new CPS_PurchasingRequest();
            string pUpdateClause = "";
            pUpdateClause = " IsDeleted = 1   " + " WHERE ID In(" + pPS_PurchasingRequestIDs + ")";
            var checkException = cPS_PurchasingRequest.UpdateList(pUpdateClause);
            //----
            CPS_PurchasingRequestDetails cPS_PurchasingRequestDetails = new CPS_PurchasingRequestDetails();

            var pDeleteClause = "";
            pDeleteClause = "WHERE RequestID In(" + pPS_PurchasingRequestIDs + ")";
            checkException = cPS_PurchasingRequestDetails.DeleteList(pDeleteClause);



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



    public class SaveRequestModel

    {







        public string pID{ get; set; }
        public string pRequestNo{ get; set; }
        public DateTime pRequestDate{ get; set; }
        public string pNotes{ get; set; }
        public string pBranchID{ get; set; }
        public string pDepartmentID{ get; set; }
        public string pCostCenter_ID{ get; set; }
        public string pIsApproved{ get; set; }
        public string pRequestNoManual{ get; set; }
        public string pIsDeleted{ get; set; }
        public string pCreatedUserID{ get; set; }
        public string pEditedByUserID{ get; set; }
        public string pApprovedUserID{ get; set; }
        public DateTime pCreatedDate{ get; set; }
        public DateTime pEditedDate { get; set; }
        public DateTime pApprovedDate { get; set; }

    }
}

using Forwarding.MvcApp.Models.Accounting.MasterData.Generated;
using Forwarding.MvcApp.Models.Accounting.Transactions.Generated;
using Forwarding.MvcApp.Models.Administration.Settings.Generated;
using Forwarding.MvcApp.Models.Customized;
using Forwarding.MvcApp.Models.MasterData.BanksAccountsAndTreasuries.Generated;
using Forwarding.MvcApp.Models.MasterData.Invoicing.Generated;
using Forwarding.MvcApp.Models.MasterData.Partners.Generated;
using Forwarding.MvcApp.Models.NoAccess.Generated;
using Forwarding.MvcApp.Models.OperAcc.Customized;
using Forwarding.MvcApp.Models.OperAcc.Generated;
using Forwarding.MvcApp.Models.Operations.Operations.Generated;
using Forwarding.MvcApp.Models.ReceiptsAndPayments.Transactions.Generated;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;



namespace Forwarding.MvcApp.Controllers.ReceiptsAndPayments.API_Transactions
{
    public class DownPaymentRequestController : ApiController
    {
        [HttpGet, HttpPost]
        public object[] LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned(bool pIsLoadArrayOfObjects, string pLanguage, Int32 pPageNumber, Int32 pPageSize, string pWhereClause, string pOrderBy)
        {
            int _RowCount = 0;
            CvwA_DownPaymentRequest objCvwA_DownPaymentRequest = new CvwA_DownPaymentRequest();
            objCvwA_DownPaymentRequest.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);

          
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                serializer.Serialize(objCvwA_DownPaymentRequest.lstCVarvwA_DownPaymentRequest)
                , _RowCount

            };
        }
        [HttpGet]
        public object[] GetRequiredOperations(string pSearchOperationCode,bool pIsFleet , int pOperationID)
        {
            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();

            string query = "";
            if( pOperationID == 0)
            {
                query = $"SELECT ID, Code, VesselName, ActualArrivalString, OperationStageID FROM "
                  + (pIsFleet ? "FleetMesco.dbo." : "")
                  + $"vwOperationsWithMinimalColumns WHERE CodeSerial = '{pSearchOperationCode}' ORDER BY ID DESC";
            }
            else
            {
                query = $"SELECT ID, Code, VesselName, ActualArrivalString, OperationStageID FROM "
                  + (pIsFleet ? "FleetMesco.dbo." : "")
                  + $"vwOperationsWithMinimalColumns WHERE ID = '{pOperationID}' ORDER BY ID DESC";
            }


            var OperationList = objCCustomizedDBCall.ExecuteQuery_ListOfObjects(query, typeof(CVarvwOperationsWithMinimalColumns))
                .Cast<CVarvwOperationsWithMinimalColumns>()
                .ToList();

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[]
            {
                serializer.Serialize(OperationList)
            };
        }
        [HttpPost]
        public object[] Save([FromBody] DownPaymentRequestData downPaymentRequestData)
        {
            int _RowCount = 0;
            string pMessageReturned = "";
            Exception checkException = null;

            CA_DownPaymentRequest objCA_DownPaymentRequest = new CA_DownPaymentRequest();
            CVarA_DownPaymentRequest objCVarA_DownPaymentRequest = new CVarA_DownPaymentRequest();
            if(downPaymentRequestData.pDownPaymentRequestID ==0 )
            {
                objCVarA_DownPaymentRequest.ID = downPaymentRequestData.pDownPaymentRequestID;
                objCVarA_DownPaymentRequest.Code = "0";
                objCVarA_DownPaymentRequest.CurrencyID = downPaymentRequestData.pCurrencyID;
                objCVarA_DownPaymentRequest.RequestDate = downPaymentRequestData.pRequestDate;
                objCVarA_DownPaymentRequest.Notes = downPaymentRequestData.pNotes;
                objCVarA_DownPaymentRequest.CreatorUserID = objCVarA_DownPaymentRequest.ModificatorUserID = WebSecurity.CurrentUserId;
                objCVarA_DownPaymentRequest.CreationDate = objCVarA_DownPaymentRequest.ModificationDate = DateTime.Now;
            }
            else
            {
                objCA_DownPaymentRequest.GetList("Where ID=" + downPaymentRequestData.pDownPaymentRequestID);
                objCA_DownPaymentRequest.lstCVarA_DownPaymentRequest[0].CurrencyID= downPaymentRequestData.pCurrencyID;
                objCA_DownPaymentRequest.lstCVarA_DownPaymentRequest[0].Notes = downPaymentRequestData.pNotes;
                objCA_DownPaymentRequest.lstCVarA_DownPaymentRequest[0].ModificatorUserID = WebSecurity.CurrentUserId;
                objCA_DownPaymentRequest.lstCVarA_DownPaymentRequest[0].ModificationDate = DateTime.Now;

                //objCVarA_DownPaymentRequest.CurrencyID = downPaymentRequestData.pCurrencyID;
                //objCVarA_DownPaymentRequest.Notes = downPaymentRequestData.pNotes;
                //objCVarA_DownPaymentRequest.ModificatorUserID= WebSecurity.CurrentUserId;
                //objCVarA_DownPaymentRequest.ModificationDate = DateTime.Now;

            }
            objCA_DownPaymentRequest.lstCVarA_DownPaymentRequest.Add(objCVarA_DownPaymentRequest);
            checkException = objCA_DownPaymentRequest.SaveMethod(objCA_DownPaymentRequest.lstCVarA_DownPaymentRequest);


            CA_DownPaymentRequestDetails objCA_DownPaymentRequestDetails = new CA_DownPaymentRequestDetails();

            if (downPaymentRequestData.pDownPaymentRequestID != 0)
                checkException = objCA_DownPaymentRequestDetails.DeleteList("Where DownPaymentRequestID=" + downPaymentRequestData.pDownPaymentRequestID + " And ID not in (" + downPaymentRequestData.pIDList + ")");


            int NumberOfDetails = downPaymentRequestData.pIDList.Split(',').Length;
            for (int i = 0; i < NumberOfDetails; i++)
            {
                CVarA_DownPaymentRequestDetails objCVarA_DownPaymentRequestDetails = new CVarA_DownPaymentRequestDetails();
                objCVarA_DownPaymentRequestDetails.ID = Convert.ToInt64(downPaymentRequestData.pIDList.Split(',')[i]);
                objCVarA_DownPaymentRequestDetails.DownPaymentRequestID = (downPaymentRequestData.pDownPaymentRequestID == 0 ? objCVarA_DownPaymentRequest.ID : downPaymentRequestData.pDownPaymentRequestID ) ;
                objCVarA_DownPaymentRequestDetails.IsFleet = Convert.ToBoolean(downPaymentRequestData.pIsFleetList.Split(',')[i]);
                objCVarA_DownPaymentRequestDetails.CustomerID = Convert.ToInt32(downPaymentRequestData.pPartenerIDList.Split(',')[i]);
                objCVarA_DownPaymentRequestDetails.OperationID = Convert.ToInt64(downPaymentRequestData.pOperationList.Split(',')[i]);
                objCVarA_DownPaymentRequestDetails.Amount = Convert.ToDecimal(downPaymentRequestData.pAmountList.Split(',')[i]);
                objCVarA_DownPaymentRequestDetails.Description =downPaymentRequestData.pDescriptionList.Split(',')[i].ToString();
                objCA_DownPaymentRequestDetails.lstCVarA_DownPaymentRequestDetails.Add(objCVarA_DownPaymentRequestDetails);
            }

            checkException= objCA_DownPaymentRequestDetails.SaveMethod(objCA_DownPaymentRequestDetails.lstCVarA_DownPaymentRequestDetails);




            if (checkException != null)
                pMessageReturned = checkException.Message;

            checkException = objCA_DownPaymentRequest.GetListPaging(10, 1, "Where 1=1", "ID", out _RowCount);

        var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                pMessageReturned,serializer.Serialize( objCA_DownPaymentRequest.lstCVarA_DownPaymentRequest)
            };
        }

        [HttpGet]
        public object[] Delete(String pDeletedDownPaymentRequestIDs)
        {
            string ErrorMessage = "";
            bool _result = false;

            CA_DownPaymentRequest objCA_DownPaymentRequest = new CA_DownPaymentRequest();
            objCA_DownPaymentRequest.GetList("WHERE ID IN (" + pDeletedDownPaymentRequestIDs + ")" + " And IsApproved=1");
            if (objCA_DownPaymentRequest.lstCVarA_DownPaymentRequest.Count > 0)
                ErrorMessage = "Already Approved, لا يمكن حذف طلب الاستلام لاعتمادة";

            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
              string GetVoucher =   objCCustomizedDBCall.CallStringFunction("GetVoucherExist_ByIDs " + pDeletedDownPaymentRequestIDs);
            if (GetVoucher != "")
                ErrorMessage = GetVoucher + " Voucher Already Created";

            objCA_DownPaymentRequest.GetList("WHERE ID IN (" + pDeletedDownPaymentRequestIDs + ")" );

            Exception checkException = null;
            if (ErrorMessage == "")
            {
                for (int i = 0; i < objCA_DownPaymentRequest.lstCVarA_DownPaymentRequest.Count; i++)
                {
                    objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "A_DownPaymentRequest", objCA_DownPaymentRequest.lstCVarA_DownPaymentRequest[i].ID, "D");

                    CA_DownPaymentRequestDetails objCA_DownPaymentRequestDetails = new CA_DownPaymentRequestDetails();
                    checkException = objCA_DownPaymentRequestDetails.DeleteList("Where DownPaymentRequestID=" + objCA_DownPaymentRequest.lstCVarA_DownPaymentRequest[i].ID);

                    if (checkException == null)
                        checkException = objCA_DownPaymentRequest.DeleteList("Where ID= " + +objCA_DownPaymentRequest.lstCVarA_DownPaymentRequest[i].ID);

               }
            }
            

            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("DELETE")) // some or all of the rows were not deleted due to dependencies
                    _result = false;
                    ErrorMessage = checkException.Message;
            }
            else //deleted successfully
            {
                if (ErrorMessage == "")
                    _result = true;
                else
                    _result = false;
            }


            return new object[] {
                  _result
                ,ErrorMessage
            };
        }

        [HttpGet]
        public Object[] LoadOperationCustomers( bool pIsFleet ,string pWhereClause)
        {
            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();

            string query = "";

            if (pIsFleet)
                query = "select distinct C.ID as ID, C.ID as PartnerID ,C.Name from FleetMesco.dbo.OperationPartners OP join FleetMesco.dbo.Customers Cfleet on Cfleet.ID = op.CustomerID join Customers C on C.VATNumber = Cfleet.VATNumber  " + pWhereClause;
            else
                query = "select CustomerID as ID, CustomerID as PartnerID , C.Name from OperationPartners OP join Customers C on C.ID = OP.CustomerID " + pWhereClause;

          var OperationList = objCCustomizedDBCall.ExecuteQuery_ListOfObjects(query, typeof(CVarvwOperationPartners))
                .Cast<CVarvwOperationPartners>()
                .ToList();
            
            return new Object[] { new JavaScriptSerializer().Serialize(OperationList) };
        }

        [HttpGet, HttpPost]
        public object[] LoadDetails(Int32 pHeaderID)
        {
            bool check = false;
            int _RowCount = 0;
            Exception checkException = null;
            CA_DownPaymentRequestDetails objCA_DownPaymentRequestDetails = new CA_DownPaymentRequestDetails();
            checkException= objCA_DownPaymentRequestDetails.GetListPaging(99999, 1, "WHERE DownPaymentRequestID=" + pHeaderID.ToString(), "ID", out _RowCount);


            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                   serializer.Serialize(objCA_DownPaymentRequestDetails.lstCVarA_DownPaymentRequestDetails) //pData[0]
   
                };



        }
    }
    public class DownPaymentRequestData
    {
        public Int32 pDownPaymentRequestID { get; set; }
        public string pCode { get; set; }
        public DateTime pRequestDate { get; set; }
        public Int32 pCurrencyID { get; set; }
        public string pNotes { get; set; }

        public string pIDList { get; set; }
        public string pOperationList { get; set; }
        public string pDescriptionList { get; set; }
        public string pPartenerIDList { get; set; }
        public string pAmountList { get; set; }
        public string pIsFleetList { get; set; }

    }
}

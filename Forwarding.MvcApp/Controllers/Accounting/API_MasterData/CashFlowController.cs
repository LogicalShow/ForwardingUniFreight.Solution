using Forwarding.MvcApp.Models.Customized;
using Forwarding.MvcApp.Models.MasterData.Invoicing.Generated;
using Forwarding.MvcApp.Models.Accounting.MasterData.Generated;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;
namespace Forwarding.MvcApp.Controllers.Accounting.API_MasterData
{
    public class CashFlowController : ApiController
    {

        //[Route("/api/Currencies/LoadAll")]
        [HttpGet, HttpPost]
        //sherif: to be used in select boxes
        public Object[] LoadAll(string pWhereClause)
        {
            CvwCurrencies objCvwCurrencies = new CvwCurrencies();
            objCvwCurrencies.GetList(pWhereClause);
            return new Object[] { new JavaScriptSerializer().Serialize(objCvwCurrencies.lstCVarvwCurrencies) };
        }
        [HttpGet, HttpPost]
        public object[] LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned(bool pIsLoadArrayOfObjects, string pLanguage, Int32 pPageNumber, Int32 pPageSize, string pWhereClause, string pOrderBy)
        {
            int _RowCount = 0;
            int _RowCount2 = 0;

            //CvwCurrencies objCvwCurrencies = new CvwCurrencies();
            CvwA_CashFlow objCA_CashFlow = new CvwA_CashFlow();

            CNoAccessCashFlow objCNoAccessCashFlow = new CNoAccessCashFlow();
            CvwA_Accounts objCvwA_Accounts = new CvwA_Accounts();
            objCA_CashFlow.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);
            objCNoAccessCashFlow.GetList("where 1=1");
            objCvwA_Accounts.GetListPaging(9999, 1, "WHERE 1=1", "Code,Name", out _RowCount2);

            return new object[] {
                new JavaScriptSerializer().Serialize(objCA_CashFlow.lstCVarvwA_CashFlow)
                , _RowCount
                , new JavaScriptSerializer().Serialize(objCNoAccessCashFlow.lstCVarNoAccessCashFlow)
                , new JavaScriptSerializer().Serialize(objCvwA_Accounts.lstCVarvwA_Accounts)

            };
        }

        [HttpGet, HttpPost]
        public object[] GetCashFlowDetails(Int32 pPageNumber, Int32 pPageSize, string pWhereClauseCurrencyDetails, string pOrderBy)
        {
            int _RowCount = 0;
            CvwA_CashFlowDetails objCA_CashFlowDetails = new CvwA_CashFlowDetails();
            objCA_CashFlowDetails.GetListPaging(pPageSize, pPageNumber, pWhereClauseCurrencyDetails, pOrderBy, out _RowCount);

            //if(objCCurrencyDetails.lstCVarCurrencyDetails != null && objCCurrencyDetails.lstCVarCurrencyDetails.Count != 0)
            //{

            //foreach (var item in objCCurrencyDetails.lstCVarCurrencyDetails)
            //{

            //    item.ToDate = item.ToDate.Date;
            //    item.FromDate = item.FromDate.Date;

            //}
            // }




            return new object[] {
                new JavaScriptSerializer().Serialize(objCA_CashFlowDetails.lstCVarvwA_CashFlowDetails)
                , _RowCount
            };
        }
        [HttpGet, HttpPost] 
        public object[] CashFlow_Save(Int32 pID, Int32 pNoAccessCashID , String pName,bool pIsPaid)
        {
            bool _result = false;
            CVarA_CashFlow objCVarA_CashFlow = new CVarA_CashFlow();

            //the next 4 lines to get the CreatorUserID and CreationDate and set them as they were entered before
            //if (pID != 0) //Update
            //{
            //    CCurrencies objCGetCreationInformation = new CCurrencies();
            //    objCGetCreationInformation.GetItem(pID);
            //    objCVarCurrencies.CreatorUserID = objCGetCreationInformation.lstCVarCurrencies[0].CreatorUserID;
            //    objCVarCurrencies.CreationDate = objCGetCreationInformation.lstCVarCurrencies[0].CreationDate;
            //}
            //else //Insert
            //{
            //    objCVarCurrencies.CreatorUserID = WebSecurity.CurrentUserId;
            //    objCVarCurrencies.CreationDate = DateTime.Now;
            //}
            objCVarA_CashFlow.ID = pID;
            objCVarA_CashFlow.NoAccessCashFlowID = pNoAccessCashID;
            objCVarA_CashFlow.Name = pName.ToUpper();
            objCVarA_CashFlow.isPaid = pIsPaid;
            CvwA_CashFlow objCA_CashFlow2 = new CvwA_CashFlow();
            objCA_CashFlow2.GetList("where 1 = 1");

        
            CA_CashFlow objCA_CashFlow = new CA_CashFlow();
            objCA_CashFlow.lstCVarA_CashFlow.Add(objCVarA_CashFlow);
            Exception checkException = objCA_CashFlow.SaveMethod(objCA_CashFlow.lstCVarA_CashFlow);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else //not unique
                _result = true;
            return new object[]
            {
                _result
                , objCVarA_CashFlow.ID
                ,new JavaScriptSerializer().Serialize(objCA_CashFlow2.lstCVarvwA_CashFlow)
            };
        }

        [HttpGet, HttpPost]
        public bool Delete(String pCashFlowIDs)
        {
            bool _result = false;
            CA_CashFlowDetails objCA_CashFlowDetails = new CA_CashFlowDetails();
            CA_CashFlow objCA_CashFlow = new CA_CashFlow();
            foreach (var currentID in pCashFlowIDs.Split(','))
            {
                Exception checkExceptionDetales = objCA_CashFlowDetails.DeleteList("where CashFlowID=" + Int32.Parse(currentID.Trim()));
                objCA_CashFlowDetails.lstDeletedCPKA_CashFlowDetails.Add(new CPKA_CashFlowDetails() { ID = Int32.Parse(currentID.Trim()) });
                objCA_CashFlow.lstDeletedCPKA_CashFlow.Add(new CPKA_CashFlow() { ID = Int32.Parse(currentID.Trim()) });

            }
          

            Exception checkException = objCA_CashFlow.DeleteItem(objCA_CashFlow.lstDeletedCPKA_CashFlow);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("DELETE")) // some or all of the rows were not deleted due to dependencies
                    _result = false;
            }
            else //deleted successfully
                _result = true;
            return _result;
        }

        #region CashFlowDetails
        [HttpGet, HttpPost]
        public object[] CashFlowDetails_Save(Int32 pDetailsID, Int32 pCashFlowID,Int32 pAccountID,Int32 pType,bool pSign)
        {
            bool _result = false;
            int _RowCount = 0;
            Exception checkException = null;
            CA_CashFlowDetails objCA_CashFlowDetails = new CA_CashFlowDetails();
            CVarA_CashFlowDetails objCVarA_CashFlowDetails = new CVarA_CashFlowDetails();
            CvwA_CashFlowDetails objCA_CashFlowDetails2 = new CvwA_CashFlowDetails();
            objCVarA_CashFlowDetails.ID = pDetailsID;
            objCVarA_CashFlowDetails.CashFlowID = pCashFlowID;
            objCVarA_CashFlowDetails.Account_ID = pAccountID;
            objCVarA_CashFlowDetails.Type = pType;

            objCVarA_CashFlowDetails.Sign = pSign;

            objCA_CashFlowDetails.lstCVarA_CashFlowDetails.Add(objCVarA_CashFlowDetails);
            checkException = objCA_CashFlowDetails.SaveMethod(objCA_CashFlowDetails.lstCVarA_CashFlowDetails);
            if (checkException == null)
            {
                _result = true;
                CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
                objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "A_CashFlow", pCashFlowID, "U");
                pDetailsID = objCVarA_CashFlowDetails.ID;
                objCA_CashFlowDetails.GetListPaging(9999, 1, "WHERE CashFlowID=" + pCashFlowID, "CashFlowID", out _RowCount);
                objCA_CashFlowDetails2.GetListPaging(9999, 1, "WHERE CashFlowID=" + pCashFlowID, "CashFlowID", out _RowCount);

                //foreach (var item in objCA_CashFlowDetails.lstCVarA_CashFlowDetails)
                //{
                //    item.ToDate = item.ToDate.Date;
                //    item.FromDate = item.FromDate.Date;
                //}
            }
            return new object[]
            {
                _result
                , pDetailsID
                , _result ? new JavaScriptSerializer().Serialize(objCA_CashFlowDetails2.lstCVarvwA_CashFlowDetails) : null
            };
        }
        [HttpGet, HttpPost]
        public object[] CashFlowDetails_Delete(string pDeletedDetailsIDs, Int32 pCurrencyID)
        {
            Exception checkException = null;
            CA_CashFlowDetails objCA_CashFlowDetails = new CA_CashFlowDetails();


            CvwA_CashFlowDetails objCA_CashFlowDetails2 = new CvwA_CashFlowDetails();
          
            bool _result = true;

            foreach (var currentID in pDeletedDetailsIDs.Split(','))
            {
                objCA_CashFlowDetails.lstDeletedCPKA_CashFlowDetails.Add(new CPKA_CashFlowDetails() { ID = Int32.Parse(currentID.Trim()) });
                checkException = objCA_CashFlowDetails.DeleteItem(objCA_CashFlowDetails.lstDeletedCPKA_CashFlowDetails);
                if (checkException != null)
                    _result = false;
            }
            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
            objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "A_CashFlow", pCurrencyID, "U");
            objCA_CashFlowDetails.GetList("WHERE CashFlowID=" + pCurrencyID);
            objCA_CashFlowDetails2.GetList("WHERE CashFlowID=" + pCurrencyID);
            //foreach (var item in objCCurrencyDetails.lstCVarCurrencyDetails)
            //{
            //    item.ToDate = item.ToDate.Date;
            //    item.FromDate = item.FromDate.Date;
            //}

            return new object[]
            {
                _result
                , new JavaScriptSerializer().Serialize(objCA_CashFlowDetails2.lstCVarvwA_CashFlowDetails)
            };
        }
        #endregion CurrencyDetails
    }
}

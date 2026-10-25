using Forwarding.MvcApp.Models.Customized;
using Forwarding.MvcApp.Models.MasterData.Partners.Generated;
using System;
using System.Collections.Generic;
using System.Data;
using System.Globalization;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;

namespace Forwarding.MvcApp.Controllers.MasterData.API_Partners
{
    public class CustomerSL_SalesManController : ApiController
    {
        [HttpGet, HttpPost]
        //sherif: to be used in select boxes
        public Object[] LoadSalesManByCustomerID(string pWhereClause,Int32 pClientID)
        {
            CvwSL_GetSalesManToSLInvoiceByCustomerID vwSL_GetSalesManToSLInvoiceByCustomerID = new CvwSL_GetSalesManToSLInvoiceByCustomerID();
            vwSL_GetSalesManToSLInvoiceByCustomerID.GetList(pWhereClause);
            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
            string ID = objCCustomizedDBCall.CallStringFunction("SL_InvoiceGetSalesIDByClientID " + pClientID);


            return new Object[] { new JavaScriptSerializer().Serialize(vwSL_GetSalesManToSLInvoiceByCustomerID.lstCVarvwSL_GetSalesManToSLInvoiceByCustomerID) , ID };
        }
        [HttpGet, HttpPost]
        public bool CheckIfItemFound(Int64 pSalesManID, Int64 pCustomerID, Int64 pID)
        {
            bool _result = false;

            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
            DataTable dt = objCCustomizedDBCall.ExecuteQuery_DataTable("SL_CheckIfItemFoundSalesManCustomer " + pSalesManID + "," + pCustomerID + "," + pID);
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
        public Object[] LoadAll(string pWhereClause)
        {
            CvwCustomerSL_SalesMan objCvwCustomerNetwork = new CvwCustomerSL_SalesMan();
            objCvwCustomerNetwork.GetList(pWhereClause);
            return new Object[] { new JavaScriptSerializer().Serialize(objCvwCustomerNetwork.lstCVarvwCustomerSL_SalesMan) };
        }

        [HttpGet, HttpPost]
        public Object[] LoadWithPaging(Int32 pPageNumber, Int32 pPageSize, string pWhereClause, string pOrderBy)
        {
            CvwCustomerSL_SalesMan objCvwCustomerNetwork = new CvwCustomerSL_SalesMan();
            //objCvwCustomerNetwork.GetList(string.Empty);
            Int32 _RowCount = 0;// objCvwCustomerNetwork.lstCVarvwCustomerNetwork.Count;

            objCvwCustomerNetwork.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);

            return new Object[] { new JavaScriptSerializer().Serialize(objCvwCustomerNetwork.lstCVarvwCustomerSL_SalesMan), _RowCount };
        }

        [HttpGet, HttpPost]
        public bool Insert(Int32 pCustomerID, Int32 psalesmanID , Decimal pPercentage,bool pIsDefault)
        {
            bool _result = false;

            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();

            Exception checkException = null;
            CSL_CustomerSalesMan objCCustomerNetwork = new CSL_CustomerSalesMan();
            CVarSL_CustomerSalesMan objCVarCustomerNetwork = new CVarSL_CustomerSalesMan();

            objCVarCustomerNetwork.ClientID = pCustomerID;
            objCVarCustomerNetwork.salesmanID = psalesmanID;
            objCVarCustomerNetwork.Percentage = pPercentage;
            objCVarCustomerNetwork.isDefault = pIsDefault;

            objCCustomerNetwork.lstCVarSL_CustomerSalesMan.Add(objCVarCustomerNetwork);
            checkException = objCCustomerNetwork.SaveMethod(objCCustomerNetwork.lstCVarSL_CustomerSalesMan);
            if (checkException == null)
                _result = true;

            if (_result==true && pIsDefault==true)
            {
                objCCustomizedDBCall.ExecuteQuery_DataTable("SL_UpdateSalesManCustomerDefaults " + pCustomerID + "," + objCVarCustomerNetwork.ID);
            }
            return _result;
        }

        [HttpGet, HttpPost]
        public bool Update(Int32 pID, Int32 pCustomerID, Int32 psalesmanID, Decimal pPercentage, bool pIsDefault)
        {
            bool _result = false;
            Exception checkException = null;
            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();

            CSL_CustomerSalesMan objCCustomerNetwork = new CSL_CustomerSalesMan();
            CVarSL_CustomerSalesMan objCVarCustomerNetwork = new CVarSL_CustomerSalesMan();

            objCVarCustomerNetwork.ID = pID;
            objCVarCustomerNetwork.ClientID = pCustomerID;
            objCVarCustomerNetwork.salesmanID = psalesmanID;
            objCVarCustomerNetwork.Percentage = pPercentage;
            objCVarCustomerNetwork.isDefault = pIsDefault;

            objCCustomerNetwork.lstCVarSL_CustomerSalesMan.Add(objCVarCustomerNetwork);
            checkException = objCCustomerNetwork.SaveMethod(objCCustomerNetwork.lstCVarSL_CustomerSalesMan);
            if (checkException == null)
                _result = true;

            if (_result == true && pIsDefault == true)
            {
                objCCustomizedDBCall.ExecuteQuery_DataTable("SL_UpdateSalesManCustomerDefaults " + pCustomerID + "," + pID);
            }
            return _result;
        }

        [HttpGet, HttpPost]
        public bool Delete(String pCustomerSL_SalesManIDs)
        {
            bool _result = false;
            CSL_CustomerSalesMan objCCustomerNetwork = new CSL_CustomerSalesMan();
            foreach (var currentID in pCustomerSL_SalesManIDs.Split(','))
            {
                objCCustomerNetwork.lstDeletedCPKSL_CustomerSalesMan.Add(new CPKSL_CustomerSalesMan() { ID = Int32.Parse(currentID.Trim()) });
            }

            Exception checkException = objCCustomerNetwork.DeleteItem(objCCustomerNetwork.lstDeletedCPKSL_CustomerSalesMan);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("DELETE")) // some or all of the rows were not deleted due to dependencies
                    _result = false;
            }
            else //deleted successfully and no dependencies, so set is deleted in addresses and contacts to 1 by a trigger
                _result = true;


            return _result;
        }

    }
}

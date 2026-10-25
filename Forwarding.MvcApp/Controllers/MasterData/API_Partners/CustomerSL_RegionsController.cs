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
    public class CustomerSL_RegionsController : ApiController
    {
        [HttpGet, HttpPost]
        //sherif: to be used in select boxes
        public Object[] LoadRegionsByCustomerID(string pWhereClause,Int32 pClientID,DateTime pDate)
        {
            CvwSL_GetRegionsToSLInvoiceByCustomerID vwSL_GetRegionsToSLInvoiceByCustomerID = new CvwSL_GetRegionsToSLInvoiceByCustomerID();
            vwSL_GetRegionsToSLInvoiceByCustomerID.GetList(pWhereClause);
            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
            string ID = objCCustomizedDBCall.CallStringFunction("SL_InvoiceGetRegionsIDByClientID " + pClientID);
            string ClientID = objCCustomizedDBCall.CallStringFunction("SL_InvoiceGetPaymentTermIDByClientID " + pClientID);
            string Balance = objCCustomizedDBCall.CallStringFunction("A_GetOpeningBalanceForClientInvoice " + pClientID +",'"+ pDate + "'");




            return new Object[] { new JavaScriptSerializer().Serialize(vwSL_GetRegionsToSLInvoiceByCustomerID.lstCVarvwSL_GetRegionsToSLInvoiceByCustomerID) , ID, ClientID, Balance };
        }
        [HttpGet, HttpPost]
        public bool CheckIfItemFound(Int64 pRegionsID, Int64 pCustomerID, Int64 pID)
        {
            bool _result = false;

            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
            DataTable dt = objCCustomizedDBCall.ExecuteQuery_DataTable("SL_CheckIfItemFoundRegionsCustomer " + pRegionsID + "," + pCustomerID + "," + pID);
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
            CvwCustomerSL_Regions objCvwCustomerNetwork = new CvwCustomerSL_Regions();
            objCvwCustomerNetwork.GetList(pWhereClause);
            return new Object[] { new JavaScriptSerializer().Serialize(objCvwCustomerNetwork.lstCVarvwCustomerSL_Regions) };
        }

        [HttpGet, HttpPost]
        public Object[] LoadWithPaging(Int32 pPageNumber, Int32 pPageSize, string pWhereClause, string pOrderBy)
        {
            CvwCustomerSL_Regions objCvwCustomerNetwork = new CvwCustomerSL_Regions();
            //objCvwCustomerNetwork.GetList(string.Empty);
            Int32 _RowCount = 0;// objCvwCustomerNetwork.lstCVarvwCustomerNetwork.Count;

            objCvwCustomerNetwork.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);

            return new Object[] { new JavaScriptSerializer().Serialize(objCvwCustomerNetwork.lstCVarvwCustomerSL_Regions), _RowCount };
        }

        [HttpGet, HttpPost]
        public bool Insert(Int32 pCustomerID, Int32 pRegionsID ,bool pIsDefault)
        {
            bool _result = false;

            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();

            Exception checkException = null;
            CSL_CustomerRegions objCCustomerNetwork = new CSL_CustomerRegions();
            CVarSL_CustomerRegions objCVarCustomerNetwork = new CVarSL_CustomerRegions();

            objCVarCustomerNetwork.ClientID = pCustomerID;
            objCVarCustomerNetwork.RegionsID = pRegionsID;
            objCVarCustomerNetwork.isDefault = pIsDefault;

            objCCustomerNetwork.lstCVarSL_CustomerRegions.Add(objCVarCustomerNetwork);
            checkException = objCCustomerNetwork.SaveMethod(objCCustomerNetwork.lstCVarSL_CustomerRegions);
            if (checkException == null)
                _result = true;

            if (_result==true && pIsDefault==true)
            {
                objCCustomizedDBCall.ExecuteQuery_DataTable("SL_UpdateRegionsCustomerDefaults " + pCustomerID + "," + objCVarCustomerNetwork.ID);
            }
            return _result;
        }

        [HttpGet, HttpPost]
        public bool Update(Int32 pID, Int32 pCustomerID, Int32 pRegionsID, bool pIsDefault)
        {
            bool _result = false;
            Exception checkException = null;
            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();

            CSL_CustomerRegions objCCustomerNetwork = new CSL_CustomerRegions();
            CVarSL_CustomerRegions objCVarCustomerNetwork = new CVarSL_CustomerRegions();

            objCVarCustomerNetwork.ID = pID;
            objCVarCustomerNetwork.ClientID = pCustomerID;
            objCVarCustomerNetwork.RegionsID = pRegionsID;
            objCVarCustomerNetwork.isDefault = pIsDefault;

            objCCustomerNetwork.lstCVarSL_CustomerRegions.Add(objCVarCustomerNetwork);
            checkException = objCCustomerNetwork.SaveMethod(objCCustomerNetwork.lstCVarSL_CustomerRegions);
            if (checkException == null)
                _result = true;

            if (_result == true && pIsDefault == true)
            {
                objCCustomizedDBCall.ExecuteQuery_DataTable("SL_UpdateRegionsCustomerDefaults " + pCustomerID + "," + pID);
            }
            return _result;
        }

        [HttpGet, HttpPost]
        public bool Delete(String pCustomerSL_RegionsIDs)
        {
            bool _result = false;
            CSL_CustomerRegions objCCustomerNetwork = new CSL_CustomerRegions();
            foreach (var currentID in pCustomerSL_RegionsIDs.Split(','))
            {
                objCCustomerNetwork.lstDeletedCPKSL_CustomerRegions.Add(new CPKSL_CustomerRegions() { ID = Int32.Parse(currentID.Trim()) });
            }

            Exception checkException = objCCustomerNetwork.DeleteItem(objCCustomerNetwork.lstDeletedCPKSL_CustomerRegions);
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

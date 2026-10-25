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
    public class SupplierSL_SalesManController : ApiController
    {
        [HttpGet, HttpPost]
        public bool CheckIfItemFound(Int64 pSalesManID, Int64 pSupplierID, Int64 pID)
        {
            bool _result = false;

            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
            DataTable dt = objCCustomizedDBCall.ExecuteQuery_DataTable("SL_CheckIfItemFoundSalesManSupplier " + pSalesManID + "," + pSupplierID + "," + pID);
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
            CvwSupplierSL_SalesMan objCvwSupplierNetwork = new CvwSupplierSL_SalesMan();
            objCvwSupplierNetwork.GetList(pWhereClause);
            return new Object[] { new JavaScriptSerializer().Serialize(objCvwSupplierNetwork.lstCVarvwSupplierSL_SalesMan) };
        }

        [HttpGet, HttpPost]
        public Object[] LoadWithPaging(Int32 pPageNumber, Int32 pPageSize, string pWhereClause, string pOrderBy)
        {
            CvwSupplierSL_SalesMan objCvwSupplierNetwork = new CvwSupplierSL_SalesMan();
            //objCvwSupplierNetwork.GetList(string.Empty);
            Int32 _RowCount = 0;// objCvwSupplierNetwork.lstCVarvwSupplierNetwork.Count;

            objCvwSupplierNetwork.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);

            return new Object[] { new JavaScriptSerializer().Serialize(objCvwSupplierNetwork.lstCVarvwSupplierSL_SalesMan), _RowCount };
        }

        [HttpGet, HttpPost]
        public bool Insert(Int32 pSupplierID, Int32 psalesmanID , Decimal pPercentage,bool pIsDefault)
        {
            bool _result = false;

            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();

            Exception checkException = null;
            CSL_SupplierSalesMan objCSupplierNetwork = new CSL_SupplierSalesMan();
            CVarSL_SupplierSalesMan objCVarSupplierNetwork = new CVarSL_SupplierSalesMan();

            objCVarSupplierNetwork.SupplierID = pSupplierID;
            objCVarSupplierNetwork.salesmanID = psalesmanID;
            objCVarSupplierNetwork.Percentage = pPercentage;
            objCVarSupplierNetwork.isDefault = pIsDefault;

            objCSupplierNetwork.lstCVarSL_SupplierSalesMan.Add(objCVarSupplierNetwork);
            checkException = objCSupplierNetwork.SaveMethod(objCSupplierNetwork.lstCVarSL_SupplierSalesMan);
            if (checkException == null)
                _result = true;

            if (_result==true && pIsDefault==true)
            {
                objCCustomizedDBCall.ExecuteQuery_DataTable("SL_UpdateSalesManSupplierDefaults " + pSupplierID + "," + objCVarSupplierNetwork.ID);
            }
            return _result;
        }

        [HttpGet, HttpPost]
        public bool Update(Int32 pID, Int32 pSupplierID, Int32 psalesmanID, Decimal pPercentage, bool pIsDefault)
        {
            bool _result = false;
            Exception checkException = null;
            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();

            CSL_SupplierSalesMan objCSupplierNetwork = new CSL_SupplierSalesMan();
            CVarSL_SupplierSalesMan objCVarSupplierNetwork = new CVarSL_SupplierSalesMan();

            objCVarSupplierNetwork.ID = pID;
            objCVarSupplierNetwork.SupplierID = pSupplierID;
            objCVarSupplierNetwork.salesmanID = psalesmanID;
            objCVarSupplierNetwork.Percentage = pPercentage;
            objCVarSupplierNetwork.isDefault = pIsDefault;

            objCSupplierNetwork.lstCVarSL_SupplierSalesMan.Add(objCVarSupplierNetwork);
            checkException = objCSupplierNetwork.SaveMethod(objCSupplierNetwork.lstCVarSL_SupplierSalesMan);
            if (checkException == null)
                _result = true;

            if (_result == true && pIsDefault == true)
            {
                objCCustomizedDBCall.ExecuteQuery_DataTable("SL_UpdateSalesManSupplierDefaults " + pSupplierID + "," + pID);
            }
            return _result;
        }

        [HttpGet, HttpPost]
        public bool Delete(String pSupplierSL_SalesManIDs)
        {
            bool _result = false;
            CSL_SupplierSalesMan objCSupplierNetwork = new CSL_SupplierSalesMan();
            foreach (var currentID in pSupplierSL_SalesManIDs.Split(','))
            {
                objCSupplierNetwork.lstDeletedCPKSL_SupplierSalesMan.Add(new CPKSL_SupplierSalesMan() { ID = Int32.Parse(currentID.Trim()) });
            }

            Exception checkException = objCSupplierNetwork.DeleteItem(objCSupplierNetwork.lstDeletedCPKSL_SupplierSalesMan);
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

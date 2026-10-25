using Forwarding.MvcApp.Models.Accounting.MasterData.Customized;
using Forwarding.MvcApp.Models.Accounting.MasterData.Generated;
using Forwarding.MvcApp.Models.Administration.Security.Generated;
using Forwarding.MvcApp.Models.Customized;
using Forwarding.MvcApp.Models.SL.SL_MasterData.Generated;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;

namespace Forwarding.MvcApp.Controllers.MasterData.API_Invoicing
{
    public class SL_RegionsController : ApiController
    {
        [HttpGet, HttpPost]
        //sherif: to be used in select boxes
        public Object[] LoadAll(string pWhereClause)
        {
            CSL_Regions objCCustomerCategories = new CSL_Regions();
            objCCustomerCategories.GetList(pWhereClause);
            return new Object[] { new JavaScriptSerializer().Serialize(objCCustomerCategories.lstCVarSL_Regions) };
        }

        [HttpGet, HttpPost]
        public Object[] LoadWithPaging(Int32 pPageNumber, Int32 pPageSize, string pSearchKey)
        {
            CSL_Regions objCCustomerCategories = new CSL_Regions();
            //objCCustody.GetList(string.Empty); //GetList() fn loads without paging



            pSearchKey = (pSearchKey == null ? "" : pSearchKey.Trim().ToUpper());
            Int32 _RowCount = objCCustomerCategories.lstCVarSL_Regions.Count;
            string whereClause = " Where Name LIKE N'%" + pSearchKey + "%' ";
               
            objCCustomerCategories.GetListPaging(pPageSize, pPageNumber, whereClause, "ID", out _RowCount);


            return new Object[] { new JavaScriptSerializer().Serialize(objCCustomerCategories.lstCVarSL_Regions), _RowCount };
        }

       

        [HttpGet, HttpPost]
        public bool Insert(string pName)
        {
            bool _result = false;
            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
            CVarSL_Regions objCVarCustody = new CVarSL_Regions();
            String Code = objCCustomizedDBCall.CallStringFunction("select  isnull(max(cast(Code as numeric)),0)+1  from SL_Regions");
            objCVarCustody.Name = pName.ToUpper();
          


            CSL_Regions objCCustody = new CSL_Regions();
            objCCustody.lstCVarSL_Regions.Add(objCVarCustody);
            Exception checkException = objCCustody.SaveMethod(objCCustody.lstCVarSL_Regions);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else
            { //not unique
                _result = true;
            }
            return _result;
        }

        [HttpGet, HttpPost]
        public bool Update(Int32 pID, string pName)
        {
            bool _result = false;

            CVarSL_Regions objCVarCustody = new CVarSL_Regions();

            //the next 4 lines to get the CreatorUserID and CreationDate and set them as they were entered before
            CSL_SalesMan objCGetCreationInformation = new CSL_SalesMan();
            objCGetCreationInformation.GetItem(pID);
           

            objCVarCustody.ID = pID;
            objCVarCustody.Name = pName.ToUpper();
       



            CSL_Regions objCCustody = new CSL_Regions();
            objCCustody.lstCVarSL_Regions.Add(objCVarCustody);
            Exception checkException = objCCustody.SaveMethod(objCCustody.lstCVarSL_Regions);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else
            { //not unique
                _result = true;
            }
            return _result;
        }

        [HttpGet, HttpPost]
        public bool Delete(String pSL_RegionsIDs)
        {
            bool _result = false;
            CSL_Regions objCCustody = new CSL_Regions();
            foreach (var currentID in pSL_RegionsIDs.Split(','))
            {
                objCCustody.lstDeletedCPKSL_Regions.Add(new CPKSL_Regions() { ID = Int32.Parse(currentID.Trim()) });
            }

            Exception checkException = objCCustody.DeleteItem(objCCustody.lstDeletedCPKSL_Regions);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("DELETE")) // some or all of the rows were not deleted due to dependencies
                    _result = false;
            }
            else //deleted successfully
                _result = true;
            return _result;
        }
    }
}

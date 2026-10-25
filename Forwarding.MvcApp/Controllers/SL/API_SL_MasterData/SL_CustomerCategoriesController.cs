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
    public class SL_CustomerCategoriesController : ApiController
    {
        [HttpGet, HttpPost]
        //sherif: to be used in select boxes
        public Object[] LoadAll(string pWhereClause)
        {
            CSL_CustomerCategories objCCustomerCategories = new CSL_CustomerCategories();
            objCCustomerCategories.GetList(pWhereClause);
            return new Object[] { new JavaScriptSerializer().Serialize(objCCustomerCategories.lstCVarSL_CustomerCategories) };
        }

        [HttpGet, HttpPost]
        public Object[] LoadWithPaging(Int32 pPageNumber, Int32 pPageSize, string pSearchKey)
        {
            CSL_CustomerCategories objCCustomerCategories = new CSL_CustomerCategories();
            //objCCustody.GetList(string.Empty); //GetList() fn loads without paging



            pSearchKey = (pSearchKey == null ? "" : pSearchKey.Trim().ToUpper());
            Int32 _RowCount = objCCustomerCategories.lstCVarSL_CustomerCategories.Count;
            string whereClause = " Where Code LIKE N'%" + pSearchKey + "%' "
                + " OR Name LIKE N'%" + pSearchKey + "%' ";
            objCCustomerCategories.GetListPaging(pPageSize, pPageNumber, whereClause, "ID,Code", out _RowCount);


            return new Object[] { new JavaScriptSerializer().Serialize(objCCustomerCategories.lstCVarSL_CustomerCategories), _RowCount };
        }

        [HttpGet, HttpPost]
        public Object[] GetUsers(int type)
        {
            int _RowCount1 = 0;
            CUsers objCUsers = new CUsers();

            if (type == 1)
            {
                objCUsers.GetListPaging(999999, 1, "WHERE 1=1", "ID", out _RowCount1);

            }
            else
            {
                objCUsers.GetListPaging(999999, 1, "WHERE id NOT IN(SELECT c.UserID FROM Custody AS c WHERE c.UserID IS NOT null)", "ID", out _RowCount1);
            }


            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] { serializer.Serialize(objCUsers.lstCVarUsers) };

        }

        [HttpGet, HttpPost]
        public bool Insert(string pName, decimal pPercentage)
        {
            bool _result = false;
            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
            CVarSL_CustomerCategories objCVarCustody = new CVarSL_CustomerCategories();
            String Code = objCCustomizedDBCall.CallStringFunction("select  isnull(max(cast(Code as numeric)),0)+1  from SL_CustomerCategories");
            objCVarCustody.Name = pName.ToUpper();
            objCVarCustody.Percentage = pPercentage;
            objCVarCustody.Code = Code;



            CSL_CustomerCategories objCCustody = new CSL_CustomerCategories();
            objCCustody.lstCVarSL_CustomerCategories.Add(objCVarCustody);
            Exception checkException = objCCustody.SaveMethod(objCCustody.lstCVarSL_CustomerCategories);
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
        public bool Update(Int32 pID, string pName, string pCode, decimal pPercentage)
        {
            bool _result = false;

            CVarSL_CustomerCategories objCVarCustody = new CVarSL_CustomerCategories();

            //the next 4 lines to get the CreatorUserID and CreationDate and set them as they were entered before
            CSL_SalesMan objCGetCreationInformation = new CSL_SalesMan();
            objCGetCreationInformation.GetItem(pID);
           

            objCVarCustody.ID = pID;
            objCVarCustody.Name = pName.ToUpper();
            objCVarCustody.Code = pCode;
            objCVarCustody.Percentage = pPercentage;



            CSL_CustomerCategories objCCustody = new CSL_CustomerCategories();
            objCCustody.lstCVarSL_CustomerCategories.Add(objCVarCustody);
            Exception checkException = objCCustody.SaveMethod(objCCustody.lstCVarSL_CustomerCategories);
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
        public bool Delete(String pSL_CustomerCategoriesIDs)
        {
            bool _result = false;
            CSL_CustomerCategories objCCustody = new CSL_CustomerCategories();
            foreach (var currentID in pSL_CustomerCategoriesIDs.Split(','))
            {
                objCCustody.lstDeletedCPKSL_CustomerCategories.Add(new CPKSL_CustomerCategories() { ID = Int32.Parse(currentID.Trim()) });
            }

            Exception checkException = objCCustody.DeleteItem(objCCustody.lstDeletedCPKSL_CustomerCategories);
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

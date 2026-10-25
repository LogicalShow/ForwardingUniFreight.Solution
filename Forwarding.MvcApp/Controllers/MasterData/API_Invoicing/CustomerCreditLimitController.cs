using Forwarding.MvcApp.Models.MasterData.Invoicing.Generated;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
//using System.Web.Mvc; //sherif: when i use this namespace, then [HttpGet, HttpPost] don't work?!!!!
                        //because this is an api controller
using System.Web.Script.Serialization;
using WebMatrix.WebData;

namespace Forwarding.MvcApp.Controllers.MasterData.API_Invoicing
{
    public class CustomerCreditLimitController : ApiController
    {
        //[Route("/api/objCCreditCardTypes/LoadAll")]
        [HttpGet, HttpPost]
        //sherif: to be used in select boxes
        public Object[] LoadAll(string pOrderBy)
        {
            CCustomerMasterCreditLimit objCCreditLimit = new CCustomerMasterCreditLimit();
            objCCreditLimit.GetList(" order by " + pOrderBy);
            return new Object[] { new JavaScriptSerializer().Serialize(objCCreditLimit.lstCVarCustomerMasterCreditLimit) };
        }

        // [Route("/api/objCCreditCardTypes/LoadWithPaging/{pPageNumber}/{pPageSize}")]
        [HttpGet, HttpPost]
        public Object[] LoadWithPaging(Int32 pPageNumber, Int32 pPageSize, string pSearchKey)
        {
            CCustomerMasterCreditLimit objCCreditLimit = new CCustomerMasterCreditLimit();

            pSearchKey = (pSearchKey == null ? "" : pSearchKey.Trim().ToUpper());
            Int32 _RowCount = objCCreditLimit.lstCVarCustomerMasterCreditLimit.Count;
            string whereClause = " Where CreditLimit LIKE '%" + pSearchKey + "%' ";
                //+ " OR Name LIKE '%" + pSearchKey + "%' "
                //+ " OR LocalName LIKE '%" + pSearchKey + "%' ";
            objCCreditLimit.GetListPaging(pPageSize, pPageNumber, whereClause, "ID", out _RowCount);
            return new Object[] { new JavaScriptSerializer().Serialize(objCCreditLimit.lstCVarCustomerMasterCreditLimit), _RowCount };
        }

        // [Route("/api/CreditCardTypes/Insert/{pCode}/{pName}/{pLocalName}}")]
        [HttpGet, HttpPost]
        public bool Insert(String pCreditLimit)
        //public bool Insert(String pCode, String pName)
        {
            bool _result = false;
            CVarCustomerMasterCreditLimit objCVarCreditCardTypes = new CVarCustomerMasterCreditLimit();

            objCVarCreditCardTypes.CreditLimit = Convert.ToDecimal(pCreditLimit);


            CCustomerMasterCreditLimit objCCreditCardTypes = new CCustomerMasterCreditLimit();
            objCCreditCardTypes.lstCVarCustomerMasterCreditLimit.Add(objCVarCreditCardTypes);
            Exception checkException = objCCreditCardTypes.SaveMethod(objCCreditCardTypes.lstCVarCustomerMasterCreditLimit);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else //not unique
                _result = true;
            return _result;
        }

        // [Route("/api/CreditCardTypes/Update/{pCode}/{pName}/{pLocalName}}")]
        [HttpGet, HttpPost]
        public bool Update(Int32 pID, String pCreditLimit)
        {
            bool _result = false;
            CVarCustomerMasterCreditLimit objCVarCreditCardTypes = new CVarCustomerMasterCreditLimit();

            //the next 4 lines to get the CreatorUserID and CreationDate and set them as they were entered before
            CCustomerMasterCreditLimit objCGetCreationInformation = new CCustomerMasterCreditLimit();
            objCGetCreationInformation.GetItem(pID);
           

            objCVarCreditCardTypes.ID = pID;
            objCVarCreditCardTypes.CreditLimit = Convert.ToDecimal(pCreditLimit);

            CCustomerMasterCreditLimit objCCreditCardTypes = new CCustomerMasterCreditLimit();
            objCCreditCardTypes.lstCVarCustomerMasterCreditLimit.Add(objCVarCreditCardTypes);
            Exception checkException = objCCreditCardTypes.SaveMethod(objCCreditCardTypes.lstCVarCustomerMasterCreditLimit);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else //not unique
                _result = true;
            return _result;
        }

        // [Route("/api/CreditCardTypes/Delete/{pCreditCardTypesIDs}")]
        [HttpGet, HttpPost]
        public bool Delete(String pCustomerCreditLimitIDs)
        {
            bool _result = false;
            CCustomerMasterCreditLimit objCCreditCardTypes = new CCustomerMasterCreditLimit();
            foreach (var currentID in pCustomerCreditLimitIDs.Split(','))
            {
                objCCreditCardTypes.lstDeletedCPKCustomerMasterCreditLimit.Add(new CPKCustomerMasterCreditLimit() { ID = Int32.Parse(currentID.Trim()) });
            }

            Exception checkException = objCCreditCardTypes.DeleteItem(objCCreditCardTypes.lstDeletedCPKCustomerMasterCreditLimit);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("DELETE")) // some or all of the rows were not deleted due to dependencies
                    _result = false;
            }
            else //deleted successfully
                _result = true;
            return _result;
        }

        //[Route("/api/CreditCardTypes/CheckRow/{pCreditCardTypesID}")]
        [HttpGet, HttpPost]
        public Boolean CheckRow(String pID)
        {
            bool _result = false;
            // var xx = HttpContext.Current.Session["UserID"].ToString();
            CCreditCardTypes objCCreditCardTypes = new CCreditCardTypes();
            objCCreditCardTypes.GetItem(int.Parse(pID));

            //if (objCCreditCardTypes.lstCVarCreditCardTypes[0].TimeLocked.Equals(DateTime.Parse("01-01-1900")))
            if (objCCreditCardTypes.lstCVarCreditCardTypes[0].LockingUserID == 0)
            {
                //record is not locked so lock it then return false
                objCCreditCardTypes.lstCVarCreditCardTypes[0].TimeLocked = DateTime.Now;
                objCCreditCardTypes.lstCVarCreditCardTypes[0].LockingUserID = WebSecurity.CurrentUserId; ;
                objCCreditCardTypes.lstCVarCreditCardTypes.Add(objCCreditCardTypes.lstCVarCreditCardTypes[0]);
                objCCreditCardTypes.SaveMethod(objCCreditCardTypes.lstCVarCreditCardTypes);
                _result = false;
            }
            else
            {
                _result = true;//record is locked
            }
            return _result;
        }

        //[Route("/api/CreditCardTypes/UnlockRecord/{pID}")]
        [HttpGet, HttpPost]
        public Boolean UnlockRecord(string pID)
        {
            bool _result = false;
            try
            {
                CCreditCardTypes objCCreditCardTypes = new CCreditCardTypes();
                objCCreditCardTypes.GetItem(int.Parse(pID));

                objCCreditCardTypes.lstCVarCreditCardTypes[0].TimeLocked = DateTime.Parse("01-01-1900");
                objCCreditCardTypes.lstCVarCreditCardTypes[0].LockingUserID = 0;
                objCCreditCardTypes.lstCVarCreditCardTypes.Add(objCCreditCardTypes.lstCVarCreditCardTypes[0]);
                objCCreditCardTypes.SaveMethod(objCCreditCardTypes.lstCVarCreditCardTypes);
                _result = true;
            }
            catch (Exception ex)
            {
                _result = false;//record is locked
            }
            return _result;
        }

    }
}

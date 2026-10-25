using Forwarding.MvcApp.Models.MasterData.Invoicing.Generated;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;


namespace Forwarding.MvcApp.Controllers.MasterData.API_Invoicing
{
    public class PaymentTermsController : ApiController
    {
        //[Route("/api/PaymentTerms/LoadAll")]
        [HttpGet, HttpPost]
        //sherif: to be used in select boxes
        public Object[] LoadAll(string pWhereClause)
        {
            CPaymentTerms objCPaymentTerms = new CPaymentTerms();
            objCPaymentTerms.GetList(pWhereClause);
            return new Object[] { new JavaScriptSerializer().Serialize(objCPaymentTerms.lstCVarPaymentTerms) };
        }

        // [Route("/api/PaymentTerms/LoadWithPaging/{pPageNumber}/{pPageSize}")]
        [HttpGet, HttpPost]
        public Object[] LoadWithPaging(Int32 pPageNumber, Int32 pPageSize, string pSearchKey)
        {
            CPaymentTerms objCPaymentTerms = new CPaymentTerms();

            pSearchKey = (pSearchKey == null ? "" : pSearchKey.Trim().ToUpper());
            Int32 _RowCount = objCPaymentTerms.lstCVarPaymentTerms.Count;
            string whereClause = " Where Code LIKE '%" + pSearchKey + "%' "
                + " OR Name LIKE '%" + pSearchKey + "%' "
                + " OR LocalName LIKE '%" + pSearchKey + "%' ";
            objCPaymentTerms.GetListPaging(pPageSize, pPageNumber, whereClause, "Code", out _RowCount);
            return new Object[] { new JavaScriptSerializer().Serialize(objCPaymentTerms.lstCVarPaymentTerms), _RowCount };
        }

        // [Route("/api/PaymentTerms/Insert/{pCode}/{pName}/{pLocalName}}")]
        [HttpGet, HttpPost]
        public bool Insert(String pCode, String pName, String pLocalName, Int32 pDays, string pDescription/*, bool pIsAddedManually*/, bool pIsInactive)
        {
            bool _result = false;
            CVarPaymentTerms objCVarPaymentTerms = new CVarPaymentTerms();

            objCVarPaymentTerms.Code = pCode.ToUpper();
            objCVarPaymentTerms.Name = pName.ToUpper();
            objCVarPaymentTerms.LocalName = (pLocalName == null ? "" : pLocalName.ToUpper());
            objCVarPaymentTerms.Description = (pDescription == null ? "" : pDescription.ToUpper());
            objCVarPaymentTerms.Days = pDays;

            //objCVarPaymentTerms.IsAddedManually = pIsAddedManually;
            objCVarPaymentTerms.IsInactive = pIsInactive;
            objCVarPaymentTerms.TimeLocked = DateTime.Parse("01-01-1900");
            objCVarPaymentTerms.LockingUserID = 0;

            objCVarPaymentTerms.CreatorUserID = objCVarPaymentTerms.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarPaymentTerms.CreationDate = objCVarPaymentTerms.ModificationDate = DateTime.Now;

            CPaymentTerms objCPaymentTerms = new CPaymentTerms();
            objCPaymentTerms.lstCVarPaymentTerms.Add(objCVarPaymentTerms);
            Exception checkException = objCPaymentTerms.SaveMethod(objCPaymentTerms.lstCVarPaymentTerms);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else //not unique
                _result = true;
            return _result;
        }

        // [Route("/api/PaymentTerms/Update/{pCode}/{pName}/{pLocalName}}")]
        [HttpGet, HttpPost]
        public bool Update(Int32 pID, String pCode, String pName, String pLocalName, Int32 pDays, string pDescription/*, bool pIsAddedManually*/, bool pIsInactive)
        {
            bool _result = false;
            CVarPaymentTerms objCVarPaymentTerms = new CVarPaymentTerms();

            //the next 4 lines to get the CreatorUserID and CreationDate and set them as they were entered before
            CPaymentTerms objCGetCreationInformation = new CPaymentTerms();
            objCGetCreationInformation.GetItem(pID);
            objCVarPaymentTerms.CreatorUserID = objCGetCreationInformation.lstCVarPaymentTerms[0].CreatorUserID;
            objCVarPaymentTerms.CreationDate = objCGetCreationInformation.lstCVarPaymentTerms[0].CreationDate;
                
            objCVarPaymentTerms.ID = pID;
            objCVarPaymentTerms.Code = pCode.ToUpper();
            objCVarPaymentTerms.Name = pName.ToUpper();
            objCVarPaymentTerms.LocalName = (pLocalName == null ? "" : pLocalName.ToUpper());
            objCVarPaymentTerms.Description = (pDescription == null ? "" : pDescription.ToUpper());
            objCVarPaymentTerms.Days = pDays;

            //objCVarPaymentTerms.IsAddedManually = pIsAddedManually;
            objCVarPaymentTerms.IsInactive = pIsInactive;
            objCVarPaymentTerms.TimeLocked = DateTime.Parse("01-01-1900");
            objCVarPaymentTerms.LockingUserID = 0;

            objCVarPaymentTerms.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarPaymentTerms.ModificationDate = DateTime.Now;

            CPaymentTerms objCPaymentTerms = new CPaymentTerms();
            objCPaymentTerms.lstCVarPaymentTerms.Add(objCVarPaymentTerms);
            Exception checkException = objCPaymentTerms.SaveMethod(objCPaymentTerms.lstCVarPaymentTerms);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else //not unique
                _result = true;
            return _result;
        }

        // [Route("/api/PaymentTerms/Delete/{pPaymentTermsIDs}")]
        [HttpGet, HttpPost]
        public bool Delete(String pPaymentTermsIDs)
        {
            bool _result = false;
            CPaymentTerms objCPaymentTerms = new CPaymentTerms();
            foreach (var currentID in pPaymentTermsIDs.Split(','))
            {
                objCPaymentTerms.lstDeletedCPKPaymentTerms.Add(new CPKPaymentTerms() { ID = Int32.Parse(currentID.Trim()) });
            }

            Exception checkException = objCPaymentTerms.DeleteItem(objCPaymentTerms.lstDeletedCPKPaymentTerms);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("DELETE")) // some or all of the rows were not deleted due to dependencies
                    _result = false;
            }
            else //deleted successfully
                _result = true;
            return _result;
        }

        //[Route("/api/PaymentTerms/CheckRow/{pPaymentTermsID}")]
        [HttpGet, HttpPost]
        public Boolean CheckRow(String pID)
        {
            bool _result = false;
            // var xx = HttpContext.Current.Session["UserID"].ToString();
            CPaymentTerms objCPaymentTerms = new CPaymentTerms();
            objCPaymentTerms.GetItem(int.Parse(pID));

            //if (objCPaymentTerms.lstCVarPaymentTerms[0].TimeLocked.Equals(DateTime.Parse("01-01-1900")))
            if (objCPaymentTerms.lstCVarPaymentTerms[0].LockingUserID == 0)
            {
                //record is not locked so lock it then return false
                objCPaymentTerms.lstCVarPaymentTerms[0].TimeLocked = DateTime.Now;
                objCPaymentTerms.lstCVarPaymentTerms[0].LockingUserID = WebSecurity.CurrentUserId;
                objCPaymentTerms.lstCVarPaymentTerms.Add(objCPaymentTerms.lstCVarPaymentTerms[0]);
                objCPaymentTerms.SaveMethod(objCPaymentTerms.lstCVarPaymentTerms);
                _result = false;
            }
            else
            {
                _result = true;//record is locked
            }
            return _result;
        }

        //[Route("/api/PaymentTerms/UnlockRecord/{pID}")]
        [HttpGet, HttpPost]
        public Boolean UnlockRecord(string pID)
        {
            bool _result = false;
            try
            {
                CPaymentTerms objCPaymentTerms = new CPaymentTerms();
                objCPaymentTerms.GetItem(int.Parse(pID));

                objCPaymentTerms.lstCVarPaymentTerms[0].TimeLocked = DateTime.Parse("01-01-1900");
                objCPaymentTerms.lstCVarPaymentTerms[0].LockingUserID = 0;
                objCPaymentTerms.lstCVarPaymentTerms.Add(objCPaymentTerms.lstCVarPaymentTerms[0]);
                objCPaymentTerms.SaveMethod(objCPaymentTerms.lstCVarPaymentTerms);
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

using Forwarding.MvcApp.Models.MasterData.CashAndBanks.Generated;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;

namespace Forwarding.MvcApp.Controllers.MasterData.API_CashAndBanks
{
    public class SafesController : ApiController
    {

        //[Route("/api/Safes/LoadAll")]
        [HttpGet, HttpPost]
        //sherif: to be used in select boxes
        public Object[] LoadAll()
        {
            string pOrderBy = " SafeCode ";
            CSafes objCSafes = new CSafes();
            objCSafes.GetList(" order by " + pOrderBy);
            return new Object[] { new JavaScriptSerializer().Serialize(objCSafes.lstCVarSafes) };
        }

        [HttpGet, HttpPost]
        public Object[] LoadAllWithWhereClause(string pWhereClause)
        {
            CSafes objCSafes = new CSafes();
            objCSafes.GetList(pWhereClause);
            return new Object[] { new JavaScriptSerializer().Serialize(objCSafes.lstCVarSafes) };
        }

        // [Route("/api/Safes/LoadWithPaging/{pPageNumber}/{pPageSize}")]
        [HttpGet, HttpPost]
        public Object[] LoadWithPaging(Int32 pPageNumber, Int32 pPageSize, string pSearchKey)
        {
            CSafes objCSafes = new CSafes();
            pSearchKey = (pSearchKey == null ? "" : pSearchKey.Trim().ToUpper());
            Int32 _RowCount = objCSafes.lstCVarSafes.Count;
            string whereClause = " Where SafeCode LIKE '%" + pSearchKey + "%' "
                + " OR SafeNameEn LIKE '%" + pSearchKey + "%' "
                + " OR SafeNameAr LIKE '%" + pSearchKey + "%' ";
            objCSafes.GetListPaging(pPageSize, pPageNumber, whereClause, "SafeCode", out _RowCount);
            return new Object[] { new JavaScriptSerializer().Serialize(objCSafes.lstCVarSafes), _RowCount };
        }

        // [Route("/api/Safes/Insert/{pCode}/{pName}/{pLocalName}}")]
        [HttpGet, HttpPost]
        public bool Insert(
            String pCode,
            String pName,
            String pLocalName,
            Int32? pCurrencyID)
        //public bool Insert(String pCode, String pName)
        {
            bool _result = false;
            CVarSafes objCVarSafes = new CVarSafes();

            objCVarSafes.CurrencyID = (int) (pCurrencyID == null ? 0 : pCurrencyID);
            objCVarSafes.SafeCode = pCode.ToUpper();
            objCVarSafes.SafeNameEn = (pLocalName == null ? "" : pName.ToUpper());
            objCVarSafes.SafeNameAr = (pLocalName == null ? "" : pLocalName.ToUpper());


            objCVarSafes.TimeLocked = DateTime.Parse("01-01-1900");
            objCVarSafes.LockingUserID = 0;

            objCVarSafes.CreatorUserID = objCVarSafes.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarSafes.CreationDate = objCVarSafes.ModificationDate = DateTime.Now;

            CSafes objCSafes = new CSafes();
            objCSafes.lstCVarSafes.Add(objCVarSafes);
            Exception checkException = objCSafes.SaveMethod(objCSafes.lstCVarSafes);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else //not unique
                _result = true;
            return _result;
        }

        // [Route("/api/Safes/Update/{pCode}/{pName}/{pLocalName}}")]
        [HttpGet, HttpPost]
        public bool Update(
            Int32 pID, 
            String pCode,
            String pName,
            String pLocalName,
            Int32? pCurrencyID)
        {
            bool _result = false;
            CVarSafes objCVarSafes = new CVarSafes();

            //the next 4 lines to get the CreatorUserID and CreationDate and set them as they were entered before
            CSafes objCGetCreationInformation = new CSafes();
            objCGetCreationInformation.GetItem(pID);
            objCVarSafes.CreatorUserID = objCGetCreationInformation.lstCVarSafes[0].CreatorUserID;
            objCVarSafes.CreationDate = objCGetCreationInformation.lstCVarSafes[0].CreationDate;

            objCVarSafes.SafeID = pID;
            objCVarSafes.SafeCode = pCode.ToUpper();
            objCVarSafes.CurrencyID = (int)(pCurrencyID == null ? 0 : pCurrencyID);
            objCVarSafes.SafeNameEn = (pLocalName == null ? "" : pName.ToUpper());
            objCVarSafes.SafeNameAr = (pLocalName == null ? "" : pLocalName.ToUpper());


            objCVarSafes.TimeLocked = DateTime.Parse("01-01-1900");
            objCVarSafes.LockingUserID = 0;

            objCVarSafes.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarSafes.ModificationDate = DateTime.Now;

            CSafes objCSafes = new CSafes();
            objCSafes.lstCVarSafes.Add(objCVarSafes);
            Exception checkException = objCSafes.SaveMethod(objCSafes.lstCVarSafes);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else //not unique
                _result = true;
            return _result;
        }

        // [Route("/api/Safes/Delete/{pSafesIDs}")]
        [HttpGet, HttpPost]
        public bool Delete(String pSafesIDs)
        {
            bool _result = false;
            CSafes objCSafes = new CSafes();
            foreach (var currentID in pSafesIDs.Split(','))
            {
                objCSafes.lstDeletedCPKSafes.Add(new CPKSafes() { SafeID = Int32.Parse(currentID.Trim()) });
            }

            Exception checkException = objCSafes.DeleteItem(objCSafes.lstDeletedCPKSafes);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("DELETE")) // some or all of the rows were not deleted due to dependencies
                    _result = false;
            }
            else //deleted successfully
                _result = true;
            return _result;
        }

        //[Route("/api/Safes/CheckRow/{pID}")]
        [HttpGet, HttpPost]
        public Boolean CheckRow(String pID)
        {
            bool _result = false;
            // var xx = HttpContext.Current.Session["UserID"].ToString();
            CSafes objCSafes = new CSafes();
            objCSafes.GetItem(int.Parse(pID));

            //if (objCSafes.lstCVarSafes[0].TimeLocked.Equals(DateTime.Parse("01-01-1900")))
            if (objCSafes.lstCVarSafes[0].LockingUserID == 0)
            {
                //record is not locked so lock it then return false
                objCSafes.lstCVarSafes[0].TimeLocked = DateTime.Now;
                objCSafes.lstCVarSafes[0].LockingUserID = WebSecurity.CurrentUserId;

                objCSafes.lstCVarSafes.Add(objCSafes.lstCVarSafes[0]);
                objCSafes.SaveMethod(objCSafes.lstCVarSafes);
                _result = false;
            }
            else
            {
                _result = true;//record is locked
            }
            return _result;
        }

        //[Route("/api/Safes/UnlockRecord/{pID}")]
        [HttpGet, HttpPost]
        public Boolean UnlockRecord(string pID)
        {
            bool _result = false;
            try
            {
                CSafes objCSafes = new CSafes();
                objCSafes.GetItem(int.Parse(pID));

                objCSafes.lstCVarSafes[0].TimeLocked = DateTime.Parse("01-01-1900");
                objCSafes.lstCVarSafes[0].LockingUserID = 0;
                objCSafes.lstCVarSafes.Add(objCSafes.lstCVarSafes[0]);
                objCSafes.SaveMethod(objCSafes.lstCVarSafes);
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

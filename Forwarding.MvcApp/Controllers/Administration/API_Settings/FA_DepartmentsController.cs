using Forwarding.MvcApp.Models.Administration.Settings.Generated;
using Forwarding.MvcApp.Models.FA.Generated;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;

namespace Forwarding.MvcApp.Controllers.Administration.API_Settings
{
    public class FA_DepartmentsController : ApiController
    {
        //[Route("/api/FA_Departments/LoadAll")]
        [HttpGet, HttpPost]
        //sherif: to be used in select boxes
        public Object[] LoadAll(string pWhereClause)
        {
            CFA_Departments objCFA_Departments = new CFA_Departments();
            objCFA_Departments.GetList(pWhereClause);
            return new Object[] { new JavaScriptSerializer().Serialize(objCFA_Departments.lstCVarFA_Departments) };
        }

        // [Route("/api/FA_Departments/LoadWithPaging/{pPageNumber}/{pPageSize}")]
        [HttpGet, HttpPost]
        public Object[] LoadWithPaging(Int32 pPageNumber, Int32 pPageSize, string pSearchKey)
        {
            CFA_Departments objCFA_Departments = new CFA_Departments();
            //objCFA_Departments.GetList(string.Empty);
            Int32 _RowCount = 0;// objCFA_Departments.lstCVarFA_Departments.Count;

            pSearchKey = (pSearchKey == null ? "" : pSearchKey.Trim().ToUpper());
            string whereClause = " Where Name LIKE '%" + pSearchKey + "%' ";
                //+ " OR Name LIKE '%" + pSearchKey + "%' "
                //+ " OR LocalName LIKE '%" + pSearchKey + "%' ";
                //+ " OR RegionCode LIKE '%" + pSearchKey + "%' "
                //+ " OR RegionName LIKE '%" + pSearchKey + "%' "

            objCFA_Departments.GetListPaging(pPageSize, pPageNumber, whereClause, " Name ", out _RowCount);

            return new Object[] { new JavaScriptSerializer().Serialize(objCFA_Departments.lstCVarFA_Departments), _RowCount };
        }

        // [Route("/api/FA_Departments/Insert/{pCode}/{pModificatorUser}/{pLocalName}}")]
        [HttpGet, HttpPost]
        public bool Insert(string pName , string pCode)
        {
            bool _result = false;

            CVarFA_Departments objCVarFA_Departments = new CVarFA_Departments();

            objCVarFA_Departments.Name = pName;
            objCVarFA_Departments.Code = pCode;
            CFA_Departments objCFA_Departments = new CFA_Departments();
            objCFA_Departments.lstCVarFA_Departments.Add(objCVarFA_Departments);
            Exception checkException = objCFA_Departments.SaveMethod(objCFA_Departments.lstCVarFA_Departments);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else //not unique
                _result = true;
            return _result;
        }

        // [Route("/api/FA_Departments/Update/{pID}/{pCode}/{pName}/{pLocalName}")]
        [HttpGet, HttpPost]
        public bool Update(Int32 pID, string pName , string pCode)
        {
            bool _result = false;

            CVarFA_Departments objCVarFA_Departments = new CVarFA_Departments();

            //the next 4 lines to get the CreatorUserID and CreationDate and set them as they were entered before
            CFA_Departments objCGetCreationInformation = new CFA_Departments();
            objCGetCreationInformation.GetItem(pID);


            objCVarFA_Departments.ID = pID;
            objCVarFA_Departments.Name = (pName == null ? "" : pName.Trim().ToUpper());
            objCVarFA_Departments.Code = (pCode == null ? "" : pCode.Trim().ToUpper());

            CFA_Departments objCFA_Departments = new CFA_Departments();
            objCFA_Departments.lstCVarFA_Departments.Add(objCVarFA_Departments);
            Exception checkException = objCFA_Departments.SaveMethod(objCFA_Departments.lstCVarFA_Departments);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else //not unique
                _result = true;
            return _result;
        }

        // [Route("/api/FA_Departments/DeleteByID/{pID}")]
        //[HttpGet, HttpPost]
        //public void DeleteByID(Int32 pID)
        //{
        //    CFA_Departments objCFA_Departments = new CFA_Departments();
        //    objCFA_Departments.lstDeletedCPKFA_Departments.Add(new CPKFA_Departments() { ID = pID });
        //    objCFA_Departments.DeleteItem(objCFA_Departments.lstDeletedCPKFA_Departments);
        //}

        // [Route("api/FA_Departments/Delete/{pFA_DepartmentsIDs}")]
        [HttpGet, HttpPost]
        public bool Delete(String pFA_DepartmentsIDs)
        {
            bool _result = false;
            CFA_Departments objCFA_Departments = new CFA_Departments();
            foreach (var currentID in pFA_DepartmentsIDs.Split(','))
            {
                objCFA_Departments.lstDeletedCPKFA_Departments.Add(new CPKFA_Departments() { ID = Int32.Parse(currentID.Trim()) });
            }

            Exception checkException = objCFA_Departments.DeleteItem(objCFA_Departments.lstDeletedCPKFA_Departments);
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

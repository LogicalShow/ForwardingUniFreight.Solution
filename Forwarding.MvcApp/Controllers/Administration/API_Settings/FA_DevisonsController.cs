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
    public class FA_DevisonsController : ApiController
    {
        //[Route("/api/Devisons/LoadAll")]
        [HttpGet, HttpPost]
        //sherif: to be used in select boxes
        public Object[] LoadAll(string pWhereClause)
        {
            CDevisons objCDevisons = new CDevisons();
            objCDevisons.GetList(pWhereClause);
            return new Object[] { new JavaScriptSerializer().Serialize(objCDevisons.lstCVarDevisons) };
        }

        // [Route("/api/Devisons/LoadWithPaging/{pPageNumber}/{pPageSize}")]
        [HttpGet, HttpPost]
        public Object[] LoadWithPaging(Int32 pPageNumber, Int32 pPageSize, string pSearchKey)
        {
            CDevisons objCDevisons = new CDevisons();
            //objCDevisons.GetList(string.Empty);
            Int32 _RowCount = 0;// objCDevisons.lstCVarDevisons.Count;

            pSearchKey = (pSearchKey == null ? "" : pSearchKey.Trim().ToUpper());
            string whereClause = " Where Name LIKE '%" + pSearchKey + "%' ";
            //+ " OR Name LIKE '%" + pSearchKey + "%' "
            //+ " OR LocalName LIKE '%" + pSearchKey + "%' ";
            //+ " OR RegionCode LIKE '%" + pSearchKey + "%' "
            //+ " OR RegionName LIKE '%" + pSearchKey + "%' "

            objCDevisons.GetListPaging(pPageSize, pPageNumber, whereClause, " Name ", out _RowCount);

            return new Object[] { new JavaScriptSerializer().Serialize(objCDevisons.lstCVarDevisons), _RowCount };
        }

        // [Route("/api/Devisons/Insert/{pCode}/{pModificatorUser}/{pLocalName}}")]
        [HttpGet, HttpPost]
        public bool Insert(string pName , string pCode)
        {
            bool _result = false;

            CVarDevisons objCVarDevisons = new CVarDevisons();

            objCVarDevisons.Name = pName;
            objCVarDevisons.Code = pCode;
            CDevisons objCDevisons = new CDevisons();
            objCDevisons.lstCVarDevisons.Add(objCVarDevisons);
            Exception checkException = objCDevisons.SaveMethod(objCDevisons.lstCVarDevisons);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else //not unique
                _result = true;
            return _result;
        }

        // [Route("/api/Devisons/Update/{pID}/{pCode}/{pName}/{pLocalName}")]
        [HttpGet, HttpPost]
        public bool Update(Int32 pID, string pName , string  pCode)
        {
            bool _result = false;

            CVarDevisons objCVarDevisons = new CVarDevisons();

            //the next 4 lines to get the CreatorUserID and CreationDate and set them as they were entered before
            CDevisons objCGetCreationInformation = new CDevisons();
            objCGetCreationInformation.GetItem(pID);


            objCVarDevisons.ID = pID;
            objCVarDevisons.Name = (pName == null ? "" : pName.Trim().ToUpper());
            objCVarDevisons.Code = (pCode == null ? "" : pCode.Trim().ToUpper());

            CDevisons objCDevisons = new CDevisons();
            objCDevisons.lstCVarDevisons.Add(objCVarDevisons);
            Exception checkException = objCDevisons.SaveMethod(objCDevisons.lstCVarDevisons);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else //not unique
                _result = true;
            return _result;
        }

        // [Route("/api/Devisons/DeleteByID/{pID}")]
        //[HttpGet, HttpPost]
        //public void DeleteByID(Int32 pID)
        //{
        //    CDevisons objCDevisons = new CDevisons();
        //    objCDevisons.lstDeletedCPKDevisons.Add(new CPKDevisons() { ID = pID });
        //    objCDevisons.DeleteItem(objCDevisons.lstDeletedCPKDevisons);
        //}

        // [Route("api/Devisons/Delete/{pDevisonsIDs}")]
        [HttpGet, HttpPost]
        public bool Delete(String pDevisonsIDs)
        {
            bool _result = false;
            CDevisons objCDevisons = new CDevisons();
            foreach (var currentID in pDevisonsIDs.Split(','))
            {
                objCDevisons.lstDeletedCPKDevisons.Add(new CPKDevisons() { ID = Int32.Parse(currentID.Trim()) });
            }

            Exception checkException = objCDevisons.DeleteItem(objCDevisons.lstDeletedCPKDevisons);
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

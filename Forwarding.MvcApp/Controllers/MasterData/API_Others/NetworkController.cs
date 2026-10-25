using Forwarding.MvcApp.Models.MasterData.Others.Generated;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;

namespace Forwarding.MvcApp.Controllers.MasterData.API_Others
{
    public class NetworkController : ApiController
    {
        [HttpGet, HttpPost]
        public Object[] LoadAll(string pWhereClause)
        {
            CNetwork objCNetwork = new CNetwork();
            objCNetwork.GetList(pWhereClause);
            return new Object[] { new JavaScriptSerializer().Serialize(objCNetwork.lstCVarNetwork) };
        }

        [HttpGet, HttpPost]
        public Object[] LoadWithPaging(Int32 pPageNumber, Int32 pPageSize, string pSearchKey)
        {
            CNetwork objCNetwork = new CNetwork();
            //objCNetwork.GetList(string.Empty); //GetList() fn loads without paging

            pSearchKey = (pSearchKey == null ? "" : pSearchKey.Trim().ToUpper());
            Int32 _RowCount = objCNetwork.lstCVarNetwork.Count;
            string whereClause = " Where Name LIKE '%" + pSearchKey + "%' ";
            objCNetwork.GetListPaging(pPageSize, pPageNumber, whereClause, "Name", out _RowCount);
            return new Object[] { new JavaScriptSerializer().Serialize(objCNetwork.lstCVarNetwork), _RowCount };
        }

        [HttpGet, HttpPost]
        public bool Insert(string pName, string pNotes)
        {
            bool _result = false;

            CVarNetwork objCVarNetwork = new CVarNetwork();

            objCVarNetwork.Name = pName;
            objCVarNetwork.Notes = pNotes;
            
            CNetwork objCNetwork = new CNetwork();
            objCNetwork.lstCVarNetwork.Add(objCVarNetwork);
            Exception checkException = objCNetwork.SaveMethod(objCNetwork.lstCVarNetwork);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else //not unique
                _result = true;
            return _result;
        }

        [HttpGet, HttpPost]
        public bool Update(Int32 pID, string pName, string pNotes)
        {
            bool _result = false;

            CVarNetwork objCVarNetwork = new CVarNetwork();

            objCVarNetwork.ID = pID;
            objCVarNetwork.Name = pName;
            objCVarNetwork.Notes = pNotes;
            
            CNetwork objCNetwork = new CNetwork();
            objCNetwork.lstCVarNetwork.Add(objCVarNetwork);
            Exception checkException = objCNetwork.SaveMethod(objCNetwork.lstCVarNetwork);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else //not unique
                _result = true;
            return _result;
        }

        [HttpGet, HttpPost]
        public bool Delete(String pNetworkIDs)
        {
            bool _result = false;
            CNetwork objCNetwork = new CNetwork();
            foreach (var currentID in pNetworkIDs.Split(','))
            {
                objCNetwork.lstDeletedCPKNetwork.Add(new CPKNetwork() { ID = Int32.Parse(currentID.Trim()) });
            }

            Exception checkException = objCNetwork.DeleteItem(objCNetwork.lstDeletedCPKNetwork);
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

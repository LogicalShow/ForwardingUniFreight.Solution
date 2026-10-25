using Forwarding.MvcApp.Models.MasterData.Partners.Generated;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;

namespace Forwarding.MvcApp.Controllers.MasterData.API_Partners
{
    public class AgentNetworkController : ApiController
    {
        [HttpGet, HttpPost]
        public Object[] LoadAll(string pWhereClause)
        {
            CvwAgentNetwork objCvwAgentNetwork = new CvwAgentNetwork();
            objCvwAgentNetwork.GetList(pWhereClause);
            return new Object[] { new JavaScriptSerializer().Serialize(objCvwAgentNetwork.lstCVarvwAgentNetwork) };
        }

        [HttpGet, HttpPost]
        public Object[] LoadWithPaging(Int32 pPageNumber, Int32 pPageSize, string pWhereClause, string pOrderBy)
        {
            CvwAgentNetwork objCvwAgentNetwork = new CvwAgentNetwork();
            //objCvwAgentNetwork.GetList(string.Empty);
            Int32 _RowCount = 0;// objCvwAgentNetwork.lstCVarvwAgentNetwork.Count;

            objCvwAgentNetwork.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);

            return new Object[] { new JavaScriptSerializer().Serialize(objCvwAgentNetwork.lstCVarvwAgentNetwork), _RowCount };
        }

        [HttpGet, HttpPost]
        public bool Insert(Int32 pAgentID, Int32 pNetworkID, string pFromDate, string pToDate, string pNotes)
        {
            bool _result = false;
            Exception checkException = null;
            CAgentNetwork objCAgentNetwork = new CAgentNetwork();
            CVarAgentNetwork objCVarAgentNetwork = new CVarAgentNetwork();

            objCVarAgentNetwork.AgentID = pAgentID;
            objCVarAgentNetwork.NetworkID = pNetworkID;
            objCVarAgentNetwork.FromDate = pFromDate == "0" ? DateTime.Parse("01/01/1900") : DateTime.ParseExact(pFromDate, "d/M/yyyy", CultureInfo.InvariantCulture);
            objCVarAgentNetwork.ToDate = pToDate == "0" ? DateTime.Parse("01/01/1900") : DateTime.ParseExact(pToDate, "d/M/yyyy", CultureInfo.InvariantCulture);
            objCVarAgentNetwork.Notes = pNotes;
            objCAgentNetwork.lstCVarAgentNetwork.Add(objCVarAgentNetwork);
            checkException = objCAgentNetwork.SaveMethod(objCAgentNetwork.lstCVarAgentNetwork);
            if (checkException == null)
                _result = true;

            return _result;
        }

        [HttpGet, HttpPost]
        public bool Update(Int32 pID, Int32 pAgentID, Int32 pNetworkID, string pFromDate, string pToDate, string pNotes)
        {
            bool _result = false;
            Exception checkException = null;
            CAgentNetwork objCAgentNetwork = new CAgentNetwork();
            CVarAgentNetwork objCVarAgentNetwork = new CVarAgentNetwork();

            objCVarAgentNetwork.ID = pID;
            objCVarAgentNetwork.AgentID = pAgentID;
            objCVarAgentNetwork.NetworkID = pNetworkID;
            objCVarAgentNetwork.FromDate = pFromDate == "0" ? DateTime.Parse("01/01/1900") : DateTime.ParseExact(pFromDate, "d/M/yyyy", CultureInfo.InvariantCulture);
            objCVarAgentNetwork.ToDate = pToDate == "0" ? DateTime.Parse("01/01/1900") : DateTime.ParseExact(pToDate, "d/M/yyyy", CultureInfo.InvariantCulture);
            objCVarAgentNetwork.Notes = pNotes;
            objCAgentNetwork.lstCVarAgentNetwork.Add(objCVarAgentNetwork);
            checkException = objCAgentNetwork.SaveMethod(objCAgentNetwork.lstCVarAgentNetwork);
            if (checkException == null)
                _result = true;

            return _result;
        }

        [HttpGet, HttpPost]
        public bool Delete(String pAgentNetworkIDs)
        {
            bool _result = false;
            CAgentNetwork objCAgentNetwork = new CAgentNetwork();
            foreach (var currentID in pAgentNetworkIDs.Split(','))
            {
                objCAgentNetwork.lstDeletedCPKAgentNetwork.Add(new CPKAgentNetwork() { ID = Int32.Parse(currentID.Trim()) });
            }

            Exception checkException = objCAgentNetwork.DeleteItem(objCAgentNetwork.lstDeletedCPKAgentNetwork);
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

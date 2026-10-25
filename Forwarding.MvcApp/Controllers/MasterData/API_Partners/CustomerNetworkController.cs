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
    public class CustomerNetworkController : ApiController
    {
        [HttpGet, HttpPost]
        public Object[] LoadAll(string pWhereClause)
        {
            CvwCustomerNetwork objCvwCustomerNetwork = new CvwCustomerNetwork();
            objCvwCustomerNetwork.GetList(pWhereClause);
            return new Object[] { new JavaScriptSerializer().Serialize(objCvwCustomerNetwork.lstCVarvwCustomerNetwork) };
        }

        [HttpGet, HttpPost]
        public Object[] LoadWithPaging(Int32 pPageNumber, Int32 pPageSize, string pWhereClause, string pOrderBy)
        {
            CvwCustomerNetwork objCvwCustomerNetwork = new CvwCustomerNetwork();
            //objCvwCustomerNetwork.GetList(string.Empty);
            Int32 _RowCount = 0;// objCvwCustomerNetwork.lstCVarvwCustomerNetwork.Count;

            objCvwCustomerNetwork.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);

            return new Object[] { new JavaScriptSerializer().Serialize(objCvwCustomerNetwork.lstCVarvwCustomerNetwork), _RowCount };
        }

        [HttpGet, HttpPost]
        public bool Insert(Int32 pCustomerID, Int32 pNetworkID, string pFromDate, string pToDate, string pNotes)
        {
            bool _result = false;
            Exception checkException = null;
            CCustomerNetwork objCCustomerNetwork = new CCustomerNetwork();
            CVarCustomerNetwork objCVarCustomerNetwork = new CVarCustomerNetwork();

            objCVarCustomerNetwork.CustomerID = pCustomerID;
            objCVarCustomerNetwork.NetworkID = pNetworkID;
            objCVarCustomerNetwork.FromDate = pFromDate == "0" ? DateTime.Parse("01/01/1900") : DateTime.ParseExact(pFromDate, "d/M/yyyy", CultureInfo.InvariantCulture);
            objCVarCustomerNetwork.ToDate = pToDate == "0" ? DateTime.Parse("01/01/1900") : DateTime.ParseExact(pToDate, "d/M/yyyy", CultureInfo.InvariantCulture);
            objCVarCustomerNetwork.Notes = pNotes;
            objCCustomerNetwork.lstCVarCustomerNetwork.Add(objCVarCustomerNetwork);
            checkException = objCCustomerNetwork.SaveMethod(objCCustomerNetwork.lstCVarCustomerNetwork);
            if (checkException == null)
                _result = true;

            return _result;
        }

        [HttpGet, HttpPost]
        public bool Update(Int32 pID, Int32 pCustomerID, Int32 pNetworkID, string pFromDate, string pToDate, string pNotes)
        {
            bool _result = false;
            Exception checkException = null;
            CCustomerNetwork objCCustomerNetwork = new CCustomerNetwork();
            CVarCustomerNetwork objCVarCustomerNetwork = new CVarCustomerNetwork();

            objCVarCustomerNetwork.ID = pID;
            objCVarCustomerNetwork.CustomerID = pCustomerID;
            objCVarCustomerNetwork.NetworkID = pNetworkID;
            objCVarCustomerNetwork.FromDate = pFromDate == "0" ? DateTime.Parse("01/01/1900") : DateTime.ParseExact(pFromDate, "d/M/yyyy", CultureInfo.InvariantCulture);
            objCVarCustomerNetwork.ToDate = pToDate == "0" ? DateTime.Parse("01/01/1900") : DateTime.ParseExact(pToDate, "d/M/yyyy", CultureInfo.InvariantCulture);
            objCVarCustomerNetwork.Notes = pNotes;
            objCCustomerNetwork.lstCVarCustomerNetwork.Add(objCVarCustomerNetwork);
            checkException = objCCustomerNetwork.SaveMethod(objCCustomerNetwork.lstCVarCustomerNetwork);
            if (checkException == null)
                _result = true;

            return _result;
        }

        [HttpGet, HttpPost]
        public bool Delete(String pCustomerNetworkIDs)
        {
            bool _result = false;
            CCustomerNetwork objCCustomerNetwork = new CCustomerNetwork();
            foreach (var currentID in pCustomerNetworkIDs.Split(','))
            {
                objCCustomerNetwork.lstDeletedCPKCustomerNetwork.Add(new CPKCustomerNetwork() { ID = Int32.Parse(currentID.Trim()) });
            }

            Exception checkException = objCCustomerNetwork.DeleteItem(objCCustomerNetwork.lstDeletedCPKCustomerNetwork);
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

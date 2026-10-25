using Forwarding.MvcApp.Models.MasterData.Locations.Generated;
using Forwarding.MvcApp.Models.Customized;
using Forwarding.MvcApp.Models.MasterData.Invoicing.Generated;
using Forwarding.MvcApp.Models.MasterData.Others.Generated;
using Forwarding.MvcApp.Models.MasterData.Partners.Generated;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;

namespace Forwarding.MvcApp.Controllers.MasterData.API_Others
{
    public class VesselsController : ApiController
    {

        //[Route("/api/Vessels/LoadAll")]
        [HttpGet, HttpPost]
        //sherif: to be used in select boxes
        public Object[] LoadAll(string pWhereClause)
        {
            CvwVessels objCvwVessels = new CvwVessels();
            objCvwVessels.GetList(pWhereClause);
            return new Object[] { new JavaScriptSerializer().Serialize(objCvwVessels.lstCVarvwVessels) };
        }
        // [Route("/api/Vessels/LoadWithPaging/{pPageNumber}/{pPageSize}")]
        [HttpGet, HttpPost]
        public Object[] LoadWithPaging(Int32 pPageNumber, Int32 pPageSize, string pSearchKey)
        {
            CvwVessels objCvwVessels = new CvwVessels();
            //objCvwVessels.GetList(string.Empty); //GetList() fn loads without paging

            pSearchKey = (pSearchKey == null ? "" : pSearchKey.Trim().ToUpper());
            Int32 _RowCount = objCvwVessels.lstCVarvwVessels.Count;
            string whereClause = " Where Code LIKE '%" + pSearchKey + "%' "
                + " OR Name LIKE '%" + pSearchKey + "%' "
                + " OR LocalName LIKE '%" + pSearchKey + "%' ";
            objCvwVessels.GetListPaging(pPageSize, pPageNumber, whereClause, "Code", out _RowCount);
            return new Object[] { new JavaScriptSerializer().Serialize(objCvwVessels.lstCVarvwVessels), _RowCount };
        }

        [HttpGet, HttpPost]
        public object[] Insert(string pCode, string pName, string pLocalName, string pNotes, string pCallSign, int pShippingLineID, bool pIsInactive)
        {
            bool _result = false;
			int id = 0;
            CVarVessels objCVarVessels = new CVarVessels();
            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
            CCustomizedDBCall objCCustomizedDBCall1 = new CCustomizedDBCall();
            string _Code = objCCustomizedDBCall.CallStringFunction("select ISNULL(max(cast(Code as int )),0) + 1 from Vessels");
            string uneditablecompanyname = objCCustomizedDBCall1.CallStringFunction(" select UnEditableCompanyName from defaults");

        
            objCVarVessels.Code = _Code;
            objCVarVessels.Name = pName.ToUpper();
            objCVarVessels.LocalName = (pLocalName == null ? "" : pLocalName.ToUpper());
            objCVarVessels.Notes = (pNotes == null ? "" : pNotes.ToUpper());
            objCVarVessels.CallSign = (pCallSign == null ? "" : pCallSign.ToUpper());
            objCVarVessels.ShippingLineID = pShippingLineID;
            objCVarVessels.IsInactive = pIsInactive;

            objCVarVessels.TimeLocked = DateTime.Parse("01-01-1900");
            objCVarVessels.LockingUserID = 0;
            
            objCVarVessels.CreatorUserID = objCVarVessels.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarVessels.CreationDate = objCVarVessels.ModificationDate = DateTime.Now;

            CVessels objCVessels = new CVessels();
            objCVessels.lstCVarVessels.Add(objCVarVessels);
            Exception checkException = objCVessels.SaveMethod(objCVessels.lstCVarVessels);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else //not unique
			{
                _result = true;
				id = objCVarVessels.ID;
			}
            return new object[] { _result,id };
        }

        // [Route("/api/Vessels/Update/{pCode}/{pName}/{pLocalName}}")]
        [HttpGet, HttpPost]
        public object[] Update(Int32 pID, string pCode, string pName, string pLocalName, string pNotes, string pCallSign, int pShippingLineID, bool pIsInactive)
        {
			bool _result = false;
			int id = 0;

			CVarVessels objCVarVessels = new CVarVessels();

            //the next 4 lines to get the CreatorUserID and CreationDate and set them as they were entered before
            CVessels objCGetCreationInformation = new CVessels();
            objCGetCreationInformation.GetItem(pID);
            objCVarVessels.CreatorUserID = objCGetCreationInformation.lstCVarVessels[0].CreatorUserID;
            objCVarVessels.CreationDate = objCGetCreationInformation.lstCVarVessels[0].CreationDate;

            objCVarVessels.ID = pID;
            objCVarVessels.Code = pCode.ToUpper();
            objCVarVessels.Name = pName.ToUpper();
            objCVarVessels.LocalName = (pLocalName == null ? "" : pLocalName.ToUpper());
            objCVarVessels.Notes = (pNotes == null ? "" : pNotes.ToUpper());
            objCVarVessels.CallSign = (pCallSign == null ? "" : pCallSign.ToUpper());
            objCVarVessels.ShippingLineID = pShippingLineID;
            objCVarVessels.IsInactive = pIsInactive;

            objCVarVessels.TimeLocked = DateTime.Parse("01-01-1900");
            objCVarVessels.LockingUserID = 0;

            objCVarVessels.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarVessels.ModificationDate = DateTime.Now;

            CVessels objCVessels = new CVessels();
            objCVessels.lstCVarVessels.Add(objCVarVessels);
            Exception checkException = objCVessels.SaveMethod(objCVessels.lstCVarVessels);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
			else //not unique
			{
				_result = true;
				id = objCVarVessels.ID;
			}
			return new object[] { _result, id };
		}

        //// [Route("/api/Vessels/DeleteByID/{pID}")]
        //[HttpGet, HttpPost]
        //public void DeleteByID(Int32 pID)
        //{
        //    CVessels objCVessels = new CVessels();
        //    objCVessels.lstDeletedCPKVessels.Add(new CPKVessels() { ID = pID });
        //    objCVessels.DeleteItem(objCVessels.lstDeletedCPKVessels);
        //}

        // [Route("/api/Vessels/Delete/{pVesselsIDs}")]
        [HttpGet, HttpPost]
        public bool Delete(String pVesselsIDs)
        {
            bool _result = false;
            CVessels objCVessels = new CVessels();
            foreach (var currentID in pVesselsIDs.Split(','))
            {
                objCVessels.lstDeletedCPKVessels.Add(new CPKVessels() { ID = Int32.Parse(currentID.Trim()) });
            }

            Exception checkException = objCVessels.DeleteItem(objCVessels.lstDeletedCPKVessels);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("DELETE")) // some or all of the rows were not deleted due to dependencies
                    _result = false;
            }
            else //deleted successfully
                _result = true;
            return _result;
        }


        [HttpGet, HttpPost]
        public object[] InsertFromOperations(string pCodeFromOperations, string pNameFromOperations, string pLocalNameFromOperations)
        {
            string _MessageReturned = "";

            CVarVessels objCVarVessels = new CVarVessels();
            CVessels objCVessels = new CVessels();
            objCVarVessels.Code = pCodeFromOperations.ToUpper();
            objCVarVessels.Name = pNameFromOperations.ToUpper();
            objCVarVessels.LocalName = (pLocalNameFromOperations == null ? "" : pLocalNameFromOperations.ToUpper());
            objCVarVessels.Notes = "";
            objCVarVessels.CallSign = "";
            objCVarVessels.ShippingLineID = 0;
            objCVarVessels.IsInactive = false;

            objCVarVessels.TimeLocked = DateTime.Parse("01-01-1900");
            objCVarVessels.LockingUserID = 0;

            objCVarVessels.CreatorUserID = objCVarVessels.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarVessels.CreationDate = objCVarVessels.ModificationDate = DateTime.Now;

            objCVessels.lstCVarVessels.Add(objCVarVessels);
            Exception checkException = objCVessels.SaveMethod(objCVessels.lstCVarVessels);
            if (checkException == null) //get returned data
            {
                objCVessels.GetList("WHERE IsInactive=0 ORDER BY Name");
            }
            else
                _MessageReturned = checkException.Message;
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                _MessageReturned
                , _MessageReturned == "" ? objCVarVessels.ID : 0 //pInsertedID = pData[1]
                , _MessageReturned == "" ? serializer.Serialize(objCVessels.lstCVarVessels) : null //pVessels = pData[2]
            };
        }


        [HttpGet, HttpPost]
        //sherif: to be used in select boxes
        public Object[] IntializeManifest(string pWhereClause)
        {
            CVessels objCVessels = new CVessels();
            CShippingLines objCShippingLines = new CShippingLines();
            CIncoterms objCIncoterms = new CIncoterms();
            CServices objCServices = new CServices();
            CPorts objCports = new CPorts();
            CCustomers objShippers = new CCustomers();
            CCustomers objConsignees = new CCustomers();
            CAgents objAgents = new CAgents();
            objCVessels.GetList(pWhereClause);
            objCShippingLines.GetList(pWhereClause);
            objCIncoterms.GetList(pWhereClause);
            objCServices.GetList(pWhereClause);
            objCports.GetList(pWhereClause);
            objShippers.GetList("Where IsShipper = 1");
            objConsignees.GetList("Where IsConsignee = 1");
            objAgents.GetList(pWhereClause);
            return new Object[] { 
                new JavaScriptSerializer().Serialize(objCVessels.lstCVarVessels)
                , new JavaScriptSerializer().Serialize(objCShippingLines.lstCVarShippingLines)
                , new JavaScriptSerializer().Serialize(objCIncoterms.lstCVarIncoterms)
                , new JavaScriptSerializer().Serialize(objCServices.lstCVarServices)
                , new JavaScriptSerializer().Serialize(objCports.lstCVarPorts)
                , new JavaScriptSerializer().Serialize(objShippers.lstCVarCustomers)
                , new JavaScriptSerializer().Serialize(objConsignees.lstCVarCustomers)
                , new JavaScriptSerializer().Serialize(objAgents.lstCVarAgents)
            };
        }
    }
}

using Forwarding.MvcApp.Models.MasterData.BanksAccountsAndTreasuries.Generated;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;

namespace Forwarding.MvcApp.Controllers.MasterData.API_BanksAccountsAndTreasuries
{
    public class BankTemplateController : ApiController
    {
        [HttpGet, HttpPost]
        public Object[] LoadAll(string pWhereClause)
        {
            CBankTemplate objCBankTemplate = new CBankTemplate();
            objCBankTemplate.GetList(pWhereClause);
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[] { serializer.Serialize(objCBankTemplate.lstCVarBankTemplate) };
        }

        [HttpGet, HttpPost]
        public Object[] LoadWithPaging(Int32 pPageNumber, Int32 pPageSize, string pSearchKey)
        {
            CBankTemplate objCBankTemplate = new CBankTemplate();
            
            pSearchKey = (pSearchKey == null ? "" : pSearchKey.Trim().ToUpper());
            Int32 _RowCount = objCBankTemplate.lstCVarBankTemplate.Count;
            string whereClause = " Where Name LIKE '%" + pSearchKey + "%' "
                + " OR Subject LIKE '%" + pSearchKey + "%' ";
            objCBankTemplate.GetListPaging(pPageSize, pPageNumber, whereClause, "Name", out _RowCount);
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[] { serializer.Serialize(objCBankTemplate.lstCVarBankTemplate), _RowCount };
        }

        [HttpGet, HttpPost]
        public bool Insert([FromBody] InsertBankTemplateData insertBankTemplateData)
        {
            bool _result = false;

            CVarBankTemplate objCVarBankTemplate = new CVarBankTemplate();

            objCVarBankTemplate.Name = insertBankTemplateData.pName;
            objCVarBankTemplate.Subject = insertBankTemplateData.pSubject;
            
            objCVarBankTemplate.CreatorUserID = objCVarBankTemplate.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarBankTemplate.CreationDate = objCVarBankTemplate.ModificationDate = DateTime.Now;

            CBankTemplate objCBankTemplate = new CBankTemplate();
            objCBankTemplate.lstCVarBankTemplate.Add(objCVarBankTemplate);
            Exception checkException = objCBankTemplate.SaveMethod(objCBankTemplate.lstCVarBankTemplate);
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
        public bool Update([FromBody] UpdateBankTemplateData updateBankTemplateData)
        {
            bool _result = false;

            CVarBankTemplate objCVarBankTemplate = new CVarBankTemplate();

            //the next 4 lines to get the CreatorUserID and CreationDate and set them as they were entered before
            CBankTemplate objCGetCreationInformation = new CBankTemplate();
            objCGetCreationInformation.GetItem(updateBankTemplateData.pID);
            objCVarBankTemplate.CreatorUserID = objCGetCreationInformation.lstCVarBankTemplate[0].CreatorUserID;
            objCVarBankTemplate.CreationDate = objCGetCreationInformation.lstCVarBankTemplate[0].CreationDate;

            objCVarBankTemplate.ID = updateBankTemplateData.pID;
            objCVarBankTemplate.Name = updateBankTemplateData.pName;
            objCVarBankTemplate.Subject = updateBankTemplateData.pSubject;
            
            objCVarBankTemplate.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarBankTemplate.ModificationDate = DateTime.Now;

            CBankTemplate objCBankTemplate = new CBankTemplate();
            objCBankTemplate.lstCVarBankTemplate.Add(objCVarBankTemplate);
            Exception checkException = objCBankTemplate.SaveMethod(objCBankTemplate.lstCVarBankTemplate);
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
        public bool Delete(String pBankTemplateIDs)
        {
            bool _result = false;
            CBankTemplate objCBankTemplate = new CBankTemplate();
            foreach (var currentID in pBankTemplateIDs.Split(','))
            {
                objCBankTemplate.lstDeletedCPKBankTemplate.Add(new CPKBankTemplate() { ID = Int32.Parse(currentID.Trim()) });
            }

            Exception checkException = objCBankTemplate.DeleteItem(objCBankTemplate.lstDeletedCPKBankTemplate);
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

    public class InsertBankTemplateData
    {
        public string pName { get; set; }
        public string pSubject { get; set; }
    }

    public class UpdateBankTemplateData
    {
        public Int32 pID { get; set; }
        public string pName { get; set; }
        public string pSubject { get; set; }
    }
}

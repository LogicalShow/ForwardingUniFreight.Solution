using Forwarding.MvcApp.Models.MasterData.Others.Generated;
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
    public class TemplateController : ApiController
    {
        [HttpGet, HttpPost]
        public Object[] LoadAll(string pWhereClause)
        {
            CTemplate objCTemplate = new CTemplate();
            objCTemplate.GetList(pWhereClause);
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[] { serializer.Serialize(objCTemplate.lstCVarTemplate) };
        }

        [HttpGet, HttpPost]
        public Object[] LoadWithPaging(Int32 pPageNumber, Int32 pPageSize, string pSearchKey)
        {
            CTemplate objCTemplate = new CTemplate();
            
            pSearchKey = (pSearchKey == null ? "" : pSearchKey.Trim().ToUpper());
            Int32 _RowCount = objCTemplate.lstCVarTemplate.Count;
            string whereClause = " Where Name LIKE '%" + pSearchKey + "%' "
                + " OR Subject LIKE '%" + pSearchKey + "%' ";
            objCTemplate.GetListPaging(pPageSize, pPageNumber, whereClause, "Name", out _RowCount);
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[] { serializer.Serialize(objCTemplate.lstCVarTemplate), _RowCount };
        }

        [HttpGet, HttpPost]
        public bool Insert([FromBody] InsertTemplateData insertTemplateData)
        {
            bool _result = false;

            CVarTemplate objCVarTemplate = new CVarTemplate();

            objCVarTemplate.Name = insertTemplateData.pName;
            objCVarTemplate.Subject = insertTemplateData.pSubject;
            objCVarTemplate.TermsAndConditions = insertTemplateData.pTermsAndConditions;
            
            objCVarTemplate.CreatorUserID = objCVarTemplate.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarTemplate.CreationDate = objCVarTemplate.ModificationDate = DateTime.Now;

            CTemplate objCTemplate = new CTemplate();
            objCTemplate.lstCVarTemplate.Add(objCVarTemplate);
            Exception checkException = objCTemplate.SaveMethod(objCTemplate.lstCVarTemplate);
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
        public bool Update([FromBody] UpdateTemplateData updateTemplateData)
        {
            bool _result = false;

            CVarTemplate objCVarTemplate = new CVarTemplate();

            //the next 4 lines to get the CreatorUserID and CreationDate and set them as they were entered before
            CTemplate objCGetCreationInformation = new CTemplate();
            objCGetCreationInformation.GetItem(updateTemplateData.pID);
            objCVarTemplate.CreatorUserID = objCGetCreationInformation.lstCVarTemplate[0].CreatorUserID;
            objCVarTemplate.CreationDate = objCGetCreationInformation.lstCVarTemplate[0].CreationDate;

            objCVarTemplate.ID = updateTemplateData.pID;
            objCVarTemplate.Name = updateTemplateData.pName;
            objCVarTemplate.Subject = updateTemplateData.pSubject;
            objCVarTemplate.TermsAndConditions = updateTemplateData.pTermsAndConditions;
            
            objCVarTemplate.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarTemplate.ModificationDate = DateTime.Now;

            CTemplate objCTemplate = new CTemplate();
            objCTemplate.lstCVarTemplate.Add(objCVarTemplate);
            Exception checkException = objCTemplate.SaveMethod(objCTemplate.lstCVarTemplate);
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
        public bool Delete(String pTemplateIDs)
        {
            bool _result = false;
            CTemplate objCTemplate = new CTemplate();
            foreach (var currentID in pTemplateIDs.Split(','))
            {
                objCTemplate.lstDeletedCPKTemplate.Add(new CPKTemplate() { ID = Int32.Parse(currentID.Trim()) });
            }

            Exception checkException = objCTemplate.DeleteItem(objCTemplate.lstDeletedCPKTemplate);
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

    public class InsertTemplateData
    {
        public string pName { get; set; }
        public string pSubject { get; set; }
        public string pTermsAndConditions { get; set; }
    }

    public class UpdateTemplateData
    {
        public Int32 pID { get; set; }
        public string pName { get; set; }
        public string pSubject { get; set; }
        public string pTermsAndConditions { get; set; }
    }
}

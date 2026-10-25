using Forwarding.MvcApp.Models.MasterData.Generated.CustomsClearance;
using Forwarding.MvcApp.Models.MasterData.Others.Generated;
using Forwarding.MvcApp.Models.MasterData.Partners.Generated;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Script.Serialization;

namespace Forwarding.MvcApp.Controllers.MasterData.CustomsClearance
{
    public class AuthorizationsController : ApiController
    {
        [HttpGet, HttpPost]
        public Object[] LoadAll(string pWhereClause)
        {
            CAuthorizations objCAuthorizations = new CAuthorizations();
            objCAuthorizations.GetList(pWhereClause);
            return new Object[] { new JavaScriptSerializer().Serialize(objCAuthorizations.lstCVarAuthorizations) };
        }

        [HttpGet, HttpPost]
        public Object[] LoadWithPaging(Int32 pPageNumber, Int32 pPageSize, string pSearchKey)
        {
            CAuthorizations objCAuthorizations = new CAuthorizations();
            CCustomers objCCustomers = new CCustomers();
            objCCustomers.GetList(" Where 1=1");
            pSearchKey = (pSearchKey == null ? "" : pSearchKey.Trim().ToUpper());
            Int32 _RowCount = objCAuthorizations.lstCVarAuthorizations.Count;
            string whereClause = " Where AuthorizationNumber LIKE '%" + pSearchKey + "%' OR  registrationNumber LIKE '%" + pSearchKey + "%' OR  OwnerNumber LIKE '%" + pSearchKey + "%' OR  StartDate LIKE '%" + pSearchKey + "%' OR  EndDate LIKE '%" + pSearchKey + "%' OR  registration_EndDate LIKE '%" + pSearchKey + "%' ";
            objCAuthorizations.GetListPaging(pPageSize, pPageNumber, whereClause, "ID Desc", out _RowCount);
            return new Object[] {
                new JavaScriptSerializer().Serialize(objCAuthorizations.lstCVarAuthorizations),
                _RowCount,
                new JavaScriptSerializer().Serialize(objCCustomers.lstCVarCustomers)
            };
        }
   
        [HttpPost]
        public object[] Authorizations_Insert_Update()
        {

            int _RowCount = 0;
            bool _result = false;
            CAuthorizations objCAuthorizations = new CAuthorizations();
            CVarAuthorizations objCVarAuthorizations = new CVarAuthorizations();

            string[] pDocsInFileNames = null; //to hold all the filenames as the return value
            //if (HttpContext.Current.Request.Files.AllKeys.Any())
            {
                var pID = HttpContext.Current.Request.Form["pID"];
                var pAuthorizationNumber = HttpContext.Current.Request.Form["pAuthorizationNumber"];
                var pCustomerID = HttpContext.Current.Request.Form["pCustomerID"];
                var pregistrationNumber = HttpContext.Current.Request.Form["pregistrationNumber"];
                var pregistration_EndDate = HttpContext.Current.Request.Form["pregistration_EndDate"];
                var pOwnerNumber = HttpContext.Current.Request.Form["pOwnerNumber"];
                var pStartDate = HttpContext.Current.Request.Form["pStartDate"];
                var pEndDate = HttpContext.Current.Request.Form["pEndDate"];
                var pNotes = HttpContext.Current.Request.Form["pNotes"];
                var pFileName = "0";
               CAuthorizations CAuthorizations_File = new CAuthorizations();
                CAuthorizations_File.GetList(" Where ID = " + pID);
                if(CAuthorizations_File.lstCVarAuthorizations.Count > 0)
                {
                    pFileName = HttpContext.Current.Request.Files.Count == 0 ? CAuthorizations_File.lstCVarAuthorizations[0].FileName : HttpContext.Current.Request.Files[0].FileName;
                }
                else
                    pFileName = HttpContext.Current.Request.Files.Count == 0 ? "0" : HttpContext.Current.Request.Files[0].FileName;
                objCVarAuthorizations.RegistryDate = DateTime.Now;

                objCVarAuthorizations.ID = int.Parse(pID);
                objCVarAuthorizations.AuthorizationNumber = pAuthorizationNumber;
                objCVarAuthorizations.CustomerID = int.Parse(pCustomerID);
                objCVarAuthorizations.registrationNumber = pregistrationNumber;
                objCVarAuthorizations.registration_EndDate = DateTime.Parse(pregistration_EndDate);
                //objCVarAuthorizations.registration_EndDate_Islamic = pregistration_EndDate_Islamic;
                objCVarAuthorizations.OwnerNumber =int.Parse(pOwnerNumber);
                objCVarAuthorizations.StartDate = DateTime.Parse(pStartDate);
                //objCVarAuthorizations.StartDate_Islamic = pStartDate_Islamic;
                objCVarAuthorizations.EndDate = DateTime.Parse(pEndDate);
                //objCVarAuthorizations.EndDate_Islamic = pEndDate_Islamic;
                objCVarAuthorizations.Notes = pNotes;
                objCVarAuthorizations.FileName = pFileName;
                objCVarAuthorizations.RegistryDate = DateTime.Now;
                objCAuthorizations.lstCVarAuthorizations.Add(objCVarAuthorizations);
                Exception checkException = objCAuthorizations.SaveMethod(objCAuthorizations.lstCVarAuthorizations);

                if (checkException != null) // an exception is caught in the model
                {
                    if (checkException.Message.Contains("UNIQUE"))
                        _result = false;
                }
                else //not unique
                    _result = true;
                objCAuthorizations.GetListPaging(10, 1, " Where 1=1", " ID Desc", out _RowCount);


                //var pOperationCreationYear = HttpContext.Current.Request.Form["pOperationCreationYear"];
                var strFolderPath = Path.Combine(HttpContext.Current.Server.MapPath("~/Images"));// + pOperationCreationYear + "/" + pOperationCode));
                if (!Directory.Exists(strFolderPath))
                    Directory.CreateDirectory(strFolderPath);
                // Get the uploaded from the Files collection
                //string[] DocsInFileNames = null;
                if (HttpContext.Current.Request.Files.Count > 0)
                    for (int i = 0; i < HttpContext.Current.Request.Files.Count; i++)
                    {
                        //DocsInFileNames[i] = HttpContext.Current.Request.Files[i].FileName;
                        HttpContext.Current.Request.Files[i].SaveAs(Path.Combine(strFolderPath, HttpContext.Current.Request.Files[i].FileName));
                    }

                if (Directory.Exists(strFolderPath))
                {
                    //to get filenames on a directory
                    pDocsInFileNames = Directory.GetFiles(strFolderPath);
                    for (int i = 0; i < pDocsInFileNames.Length; i++)
                        pDocsInFileNames[i] = pDocsInFileNames[i].Substring(pDocsInFileNames[i].LastIndexOf('\\') + 1);
                }
            }
            return new Object[] {
                _result,
                _RowCount,
                new JavaScriptSerializer().Serialize(objCAuthorizations.lstCVarAuthorizations)
            };
        }

        //[HttpGet, HttpPost]
        //public object[] CustomsItems_Insert_Update(int pID ,string pAuthorizationNumber  ,int pCustomerID,string pregistrationNumber, DateTime pregistration_EndDate, /*DateTime pregistration_EndDate_Islamic,*/int pOwnerNumber, DateTime pStartDate, /*DateTime pStartDate_Islamic,*/ DateTime pEndDate, /*DateTime pEndDate_Islamic,*/ string pNotes, string pFileName)
        //{
        //    bool _result = false;
        //    CAuthorizations objCAuthorizations = new CAuthorizations();
        //    CVarAuthorizations objCVarAuthorizations = new CVarAuthorizations();
        //    objCVarAuthorizations.ID = pID;
        //    objCVarAuthorizations.AuthorizationNumber = pAuthorizationNumber;
        //    objCVarAuthorizations.CustomerID = pCustomerID;
        //    objCVarAuthorizations.registrationNumber = pregistrationNumber;
        //    objCVarAuthorizations.registration_EndDate = pregistration_EndDate;
        //    //objCVarAuthorizations.registration_EndDate_Islamic = pregistration_EndDate_Islamic;
        //    objCVarAuthorizations.OwnerNumber = pOwnerNumber;
        //    objCVarAuthorizations.StartDate = pStartDate;
        //    //objCVarAuthorizations.StartDate_Islamic = pStartDate_Islamic;
        //    objCVarAuthorizations.EndDate = pEndDate;
        //    //objCVarAuthorizations.EndDate_Islamic = pEndDate_Islamic;
        //    objCVarAuthorizations.Notes = pNotes;
        //    objCVarAuthorizations.FileName = pFileName;
        //    objCVarAuthorizations.RegistryDate = DateTime.Now;
        //    objCAuthorizations.lstCVarAuthorizations.Add(objCVarAuthorizations);
        //    int _RowCount = 0;
        //    Exception checkException = objCAuthorizations.SaveMethod(objCAuthorizations.lstCVarAuthorizations);
        //    if (checkException != null) // an exception is caught in the model
        //    {
        //        if (checkException.Message.Contains("UNIQUE"))
        //            _result = false;
        //    }
        //    else //not unique
        //        _result = true;
        //    objCAuthorizations.GetListPaging(10,1, " Where 1=1", " ID Desc",out _RowCount);

        //    return new Object[] {
        //        _result,
        //        _RowCount,
        //        new JavaScriptSerializer().Serialize(objCAuthorizations.lstCVarAuthorizations)
        //    };
        //}

        [HttpGet, HttpPost]
        public bool Delete(String pAuthorizationsIDs)
        {
            bool _result = false;
            CAuthorizations objCAuthorizations = new CAuthorizations();
            
            foreach (var currentID in pAuthorizationsIDs.Split(','))
            {
                objCAuthorizations.lstDeletedCPKAuthorizations.Add(new CPKAuthorizations() { ID = Int32.Parse(currentID.Trim()) });
            }

            Exception checkException = objCAuthorizations.DeleteItem(objCAuthorizations.lstDeletedCPKAuthorizations);
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

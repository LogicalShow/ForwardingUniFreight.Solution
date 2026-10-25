//using CrystalDecisions.CrystalReports.Engine;
using Forwarding.MvcApp.Models.MasterData.Locations.Generated;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;
using CrystalDecisions.CrystalReports.Engine;
using CrystalDecisions.ReportSource;
using CrystalDecisions.Shared;
using CrystalDecisions.ReportAppServer;
using Newtonsoft.Json;


namespace Forwarding.MvcApp.Controllers.MasterData.API_Locations
{
    public class RegionsController : ApiController
    {

        //[Route("/api/Regions/LoadAll")]
        [HttpGet, HttpPost]
        //sherif: to be used in select boxes
        public Object[] LoadAll(string pOrderBy)
        {
            CRegions objCRegions = new CRegions();
            objCRegions.GetList(" order by " + pOrderBy);
            return new Object[] { new JavaScriptSerializer().Serialize(objCRegions.lstCVarRegions) };
        }

        // [Route("/api/Regions/LoadWithPaging/{pPageNumber}/{pPageSize}")]
        [HttpGet, HttpPost]
        public Object[] LoadWithPaging(Int32 pPageNumber, Int32 pPageSize, string pSearchKey)
        {
            CRegions objCRegions = new CRegions();
            //objCRegions.GetList(string.Empty); //GetList() fn loads without paging
            
            pSearchKey = (pSearchKey == null ? "" : pSearchKey.Trim().ToUpper());
            Int32 _RowCount = objCRegions.lstCVarRegions.Count;
            string whereClause = " Where Code LIKE '%" + pSearchKey + "%' "
                + " OR Name LIKE '%" + pSearchKey + "%' "
                + " OR LocalName LIKE '%" + pSearchKey + "%' ";
            objCRegions.GetListPaging(pPageSize, pPageNumber, whereClause, "Code", out _RowCount);
            return new Object[] { new JavaScriptSerializer().Serialize(objCRegions.lstCVarRegions), _RowCount };
        }

        // [Route("/api/Regions/Insert/{pCode}/{pName}/{pLocalName}}")]
        [HttpGet, HttpPost]
        public bool Insert(String pCode, String pName, String pLocalName)
        //public bool Insert(String pCode, String pName)
        {
            bool _result = false;

            CVarRegions objCVarRegions = new CVarRegions();

            objCVarRegions.Code = pCode.ToUpper();
            objCVarRegions.Name = pName.ToUpper();
            objCVarRegions.LocalName = (pLocalName == null ? "" : pLocalName.ToUpper());

            objCVarRegions.Notes = "";
                
            objCVarRegions.TimeLocked = DateTime.Parse("01-01-1900");
            objCVarRegions.LockingUserID = 0;
            
            objCVarRegions.CreatorUserID = objCVarRegions.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarRegions.CreationDate = objCVarRegions.ModificationDate = DateTime.Now;

            CRegions objCRegions = new CRegions();
            objCRegions.lstCVarRegions.Add(objCVarRegions);
            Exception checkException = objCRegions.SaveMethod(objCRegions.lstCVarRegions);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else //not unique
                _result = true;
            return _result;
        }

        // [Route("/api/Regions/Update/{pCode}/{pName}/{pLocalName}}")]
        [HttpGet, HttpPost]
        public bool Update(Int32 pID,String pCode, String pName, String pLocalName)
        {
            bool _result = false;

            CVarRegions objCVarRegions = new CVarRegions();

            //the next 4 lines to get the CreatorUserID and CreationDate and set them as they were entered before
            CRegions objCGetCreationInformation = new CRegions();
            objCGetCreationInformation.GetItem(pID);
            objCVarRegions.CreatorUserID = objCGetCreationInformation.lstCVarRegions[0].CreatorUserID;
            objCVarRegions.CreationDate = objCGetCreationInformation.lstCVarRegions[0].CreationDate;
                
            objCVarRegions.ID = pID;
            objCVarRegions.Code = pCode.ToUpper();
            objCVarRegions.Name = pName.ToUpper();
            objCVarRegions.LocalName = (pLocalName == null ? "" : pLocalName.ToUpper());

            objCVarRegions.Notes = "";
                
            objCVarRegions.TimeLocked = DateTime.Parse("01-01-1900");
            objCVarRegions.LockingUserID = 0;
            
            objCVarRegions.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarRegions.ModificationDate = DateTime.Now;

            CRegions objCRegions = new CRegions();
            objCRegions.lstCVarRegions.Add(objCVarRegions);
            Exception checkException = objCRegions.SaveMethod(objCRegions.lstCVarRegions);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else //not unique
                _result = true;
            return _result;
        }

        //// [Route("/api/Regions/DeleteByID/{pID}")]
        //[HttpGet, HttpPost]
        //public void DeleteByID(Int32 pID)
        //{
        //    CRegions objCRegions = new CRegions();
        //    objCRegions.lstDeletedCPKRegions.Add(new CPKRegions() { ID = pID });
        //    objCRegions.DeleteItem(objCRegions.lstDeletedCPKRegions);
        //}

        // [Route("/api/Regions/Delete/{pRegionsIDs}")]
        [HttpGet, HttpPost]
        public bool Delete(String pRegionsIDs)
        {
            bool _result = false;
            CRegions objCRegions = new CRegions();
            foreach (var currentID in pRegionsIDs.Split(','))
            {
                objCRegions.lstDeletedCPKRegions.Add(new CPKRegions() { ID = Int32.Parse(currentID.Trim()) });
            }

            Exception checkException = objCRegions.DeleteItem(objCRegions.lstDeletedCPKRegions);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("DELETE")) // some or all of the rows were not deleted due to dependencies
                    _result = false;
            }
            else //deleted successfully
                _result = true;
            return _result;
        }

        //[Route("/api/Regions/CheckRow/{pRegionsID}")]
        [HttpGet, HttpPost]
        public Boolean CheckRow(String pID)   
        {
            bool _result = false;
            // var xx = HttpContext.Current.Session["UserID"].ToString();
            CRegions objCRegions = new CRegions();
            objCRegions.GetItem(int.Parse(pID));

            //if (objCRegions.lstCVarRegions[0].TimeLocked.Equals(DateTime.Parse("01-01-1900")))
            if (objCRegions.lstCVarRegions[0].LockingUserID == 0)
            {
                //record is not locked so lock it then return false
                objCRegions.lstCVarRegions[0].TimeLocked = DateTime.Now;
                objCRegions.lstCVarRegions[0].LockingUserID = WebSecurity.CurrentUserId;
                objCRegions.lstCVarRegions.Add(objCRegions.lstCVarRegions[0]);
                objCRegions.SaveMethod(objCRegions.lstCVarRegions);
                _result = false;
            }
            else
            {
                _result = true;//record is locked
            }
            return _result;
        }

        //[Route("/api/Regions/UnlockRecord/{pID}")]
        [HttpGet, HttpPost]
        public Boolean UnlockRecord(string pID)
        {
            bool _result = false;
            try
            {
                CRegions objCRegions = new CRegions();
                objCRegions.GetItem(int.Parse(pID));

                objCRegions.lstCVarRegions[0].TimeLocked = DateTime.Parse("01-01-1900");
                objCRegions.lstCVarRegions[0].LockingUserID = 0;
                objCRegions.lstCVarRegions.Add(objCRegions.lstCVarRegions[0]);
                objCRegions.SaveMethod(objCRegions.lstCVarRegions);
                _result = true;
            }
            catch(Exception ex)
            {
                _result = false;//record is locked
            }
            return _result;
        }

        //[HttpGet, HttpPost]
        //public System.Web.Mvc.ActionResult PrintReport(string pWhereClause)
        //{
        //    CRegions objCRegions = new CRegions();
        //    objCRegions.GetList(pWhereClause);

        //    ReportDocument rd = new ReportDocument();
        //    rd.Load(Path.Combine(Server.MapPath("~/Reports"), "GroupSelection.rpt"));
        //    rd.SetDataSource(objCRegions);

        //    Response.Buffer = false;
        //    Response.ClearContent();
        //    Response.ClearHeaders();

        //    try
        //    {
        //        Stream stream = rd.ExportToStream(CrystalDecisions.Shared.ExportFormatType.PortableDocFormat);
        //        stream.Seek(0, SeekOrigin.Begin);
        //        return File(stream, "application/pdf", "GroupSelection.pdf");
        //    }
        //    catch (Exception ex)
        //    {
        //        throw;
        //    }
        //    //return true;
        //}

        //[HttpGet, HttpPost]
        //public HttpResponseMessage PrintReport()
        //{
        //    CRegions objCRegions = new CRegions();
        //    objCRegions.GetList(" Where 1=1 ");

        //    var response = Request.CreateResponse(HttpStatusCode.OK);
        //    var strReportName = "GroupSelection.rpt";
        //    //var rd = new CrystalDecisions.CrystalReports.Engine.ReportDocument();
        //    ReportDocument rd = new ReportDocument();
        //    string strPath = HttpContext.Current.Server.MapPath("~/") + "Reports//" + strReportName;
        //    rd.Load(strPath);
        //    rd.SetDataSource(objCRegions.lstCVarRegions);
        //    var tip = CrystalDecisions.Shared.ExportFormatType.PortableDocFormat;
        //    var pdf = rd.ExportToStream(tip);
        //    response.Headers.Clear();
        //    response.Content = new StreamContent(pdf);
        //    response.Content.Headers.ContentType = new System.Net.Http.Headers.MediaTypeHeaderValue("application/pdf");
        //    return response;

        //}
        [HttpGet, HttpPost]
        public void PrintReport()
        {
            CRegions objCRegions = new CRegions();
            objCRegions.GetList(" WHERE 1 = 1 ");

            //var response = Request.CreateResponse(HttpStatusCode.OK);
            //var response = Request.CreateResponse();
            var strReportName = "Regions.rpt";
            //var rd = new CrystalDecisions.CrystalReports.Engine.ReportDocument();
            ReportDocument rd = new ReportDocument();
            string strPath = HttpContext.Current.Server.MapPath("~/") + "Reports//" + strReportName;
            rd.Load(strPath);
            rd.SetDataSource(objCRegions.lstCVarRegions);
            var tip = CrystalDecisions.Shared.ExportFormatType.PortableDocFormat;
            //var pdf = rd.ExportToDisk(tip);
            string strPDFFileName = "Regions" + DateTime.Now.ToString().Replace("/", "-").Replace(":","-") + ".pdf";
            rd.ExportToDisk(tip, (System.IO.Path.Combine(HttpContext.Current.Server.MapPath("~/") + "Reports//", strPDFFileName)));
            System.Diagnostics.Process.Start((System.IO.Path.Combine(HttpContext.Current.Server.MapPath("~/") + "Reports//", strPDFFileName)));
            //response.Headers.Clear();
            //response.Content = new StreamContent(pdf);
            //response.Content.Headers.ContentType = new System.Net.Http.Headers.MediaTypeHeaderValue("application/pdf");
            //return response;
            //return true;

        }

        
    }
    
}

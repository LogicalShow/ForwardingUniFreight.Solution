//using CrystalDecisions.CrystalReports.Engine;
using Forwarding.MvcApp.Models.MasterData.Trucking.Generated;
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

namespace Forwarding.MvcApp.Controllers.MasterData.API_Trucking
{
    public class TRCK_EquipmentModelController : ApiController
    {

        //[Route("/api/TRCK_EquipmentModel/LoadAll")]
        [HttpGet, HttpPost]
        //sherif: to be used in select boxes
        public Object[] LoadAll(string pOrderBy)
        {
            CTRCK_EquipmentModel objCTRCK_EquipmentModel = new CTRCK_EquipmentModel();
            objCTRCK_EquipmentModel.GetList(" order by " + pOrderBy);
            return new Object[] { new JavaScriptSerializer().Serialize(objCTRCK_EquipmentModel.lstCVarTRCK_EquipmentModel) };
        }

        // [Route("/api/TRCK_EquipmentModel/LoadWithPaging/{pPageNumber}/{pPageSize}")]
        [HttpGet, HttpPost]
        public Object[] LoadWithPaging(Int32 pPageNumber, Int32 pPageSize, string pSearchKey)
        {
            CTRCK_EquipmentModel objCTRCK_EquipmentModel = new CTRCK_EquipmentModel();
            //objCTRCK_EquipmentModel.GetList(string.Empty); //GetList() fn loads without paging
            
            pSearchKey = (pSearchKey == null ? "" : pSearchKey.Trim().ToUpper());
            Int32 _RowCount = objCTRCK_EquipmentModel.lstCVarTRCK_EquipmentModel.Count;
            string whereClause = " Where Code LIKE N'%" + pSearchKey + "%' "
                + " OR Name LIKE N'%" + pSearchKey + "%' "
                + " OR LocalName LIKE N'%" + pSearchKey + "%' ";
            objCTRCK_EquipmentModel.GetListPaging(pPageSize, pPageNumber, whereClause, "Code", out _RowCount);
            return new Object[] { new JavaScriptSerializer().Serialize(objCTRCK_EquipmentModel.lstCVarTRCK_EquipmentModel), _RowCount };
        }

        // [Route("/api/TRCK_EquipmentModel/Insert/{pCode}/{pName}/{pLocalName}}")]
        [HttpGet, HttpPost]
        public bool Insert(String pCode, String pName, String pLocalName)
        //public bool Insert(String pCode, String pName)
        {
            bool _result = false;

            CVarTRCK_EquipmentModel objCVarTRCK_EquipmentModel = new CVarTRCK_EquipmentModel();

            objCVarTRCK_EquipmentModel.Code = pCode.ToUpper();
            objCVarTRCK_EquipmentModel.Name = pName.ToUpper();
            objCVarTRCK_EquipmentModel.LocalName = (pLocalName == null ? "" : pLocalName.ToUpper());
                
            objCVarTRCK_EquipmentModel.TimeLocked = DateTime.Parse("01-01-1900");
            objCVarTRCK_EquipmentModel.LockingUserID = 0;
            
            objCVarTRCK_EquipmentModel.CreatorUserID = objCVarTRCK_EquipmentModel.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarTRCK_EquipmentModel.CreationDate = objCVarTRCK_EquipmentModel.ModificationDate = DateTime.Now;

            CTRCK_EquipmentModel objCTRCK_EquipmentModel = new CTRCK_EquipmentModel();
            objCTRCK_EquipmentModel.lstCVarTRCK_EquipmentModel.Add(objCVarTRCK_EquipmentModel);
            Exception checkException = objCTRCK_EquipmentModel.SaveMethod(objCTRCK_EquipmentModel.lstCVarTRCK_EquipmentModel);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else //not unique
                _result = true;
            return _result;
        }

        // [Route("/api/TRCK_EquipmentModel/Update/{pCode}/{pName}/{pLocalName}}")]
        [HttpGet, HttpPost]
        public bool Update(Int32 pID,String pCode, String pName, String pLocalName)
        {
            bool _result = false;

            CVarTRCK_EquipmentModel objCVarTRCK_EquipmentModel = new CVarTRCK_EquipmentModel();

            //the next 4 lines to get the CreatorUserID and CreationDate and set them as they were entered before
            CTRCK_EquipmentModel objCGetCreationInformation = new CTRCK_EquipmentModel();
            objCGetCreationInformation.GetItem(pID);
            objCVarTRCK_EquipmentModel.CreatorUserID = objCGetCreationInformation.lstCVarTRCK_EquipmentModel[0].CreatorUserID;
            objCVarTRCK_EquipmentModel.CreationDate = objCGetCreationInformation.lstCVarTRCK_EquipmentModel[0].CreationDate;
                
            objCVarTRCK_EquipmentModel.ID = pID;
            objCVarTRCK_EquipmentModel.Code = pCode.ToUpper();
            objCVarTRCK_EquipmentModel.Name = pName.ToUpper();
            objCVarTRCK_EquipmentModel.LocalName = (pLocalName == null ? "" : pLocalName.ToUpper());

               
            objCVarTRCK_EquipmentModel.TimeLocked = DateTime.Parse("01-01-1900");
            objCVarTRCK_EquipmentModel.LockingUserID = 0;
            
            objCVarTRCK_EquipmentModel.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarTRCK_EquipmentModel.ModificationDate = DateTime.Now;

            CTRCK_EquipmentModel objCTRCK_EquipmentModel = new CTRCK_EquipmentModel();
            objCTRCK_EquipmentModel.lstCVarTRCK_EquipmentModel.Add(objCVarTRCK_EquipmentModel);
            Exception checkException = objCTRCK_EquipmentModel.SaveMethod(objCTRCK_EquipmentModel.lstCVarTRCK_EquipmentModel);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else //not unique
                _result = true;
            return _result;
        }

        //// [Route("/api/TRCK_EquipmentModel/DeleteByID/{pID}")]
        //[HttpGet, HttpPost]
        //public void DeleteByID(Int32 pID)
        //{
        //    CTRCK_EquipmentModel objCTRCK_EquipmentModel = new CTRCK_EquipmentModel();
        //    objCTRCK_EquipmentModel.lstDeletedCPKTRCK_EquipmentModel.Add(new CPKTRCK_EquipmentModel() { ID = pID });
        //    objCTRCK_EquipmentModel.DeleteItem(objCTRCK_EquipmentModel.lstDeletedCPKTRCK_EquipmentModel);
        //}

        // [Route("/api/TRCK_EquipmentModel/Delete/{pTRCK_EquipmentModelIDs}")]
        [HttpGet, HttpPost]
        public bool Delete(String pTRCK_EquipmentModelIDs)
        {
            bool _result = false;
            CTRCK_EquipmentModel objCTRCK_EquipmentModel = new CTRCK_EquipmentModel();
            foreach (var currentID in pTRCK_EquipmentModelIDs.Split(','))
            {
                objCTRCK_EquipmentModel.lstDeletedCPKTRCK_EquipmentModel.Add(new CPKTRCK_EquipmentModel() { ID = Int32.Parse(currentID.Trim()) });
            }

            Exception checkException = objCTRCK_EquipmentModel.DeleteItem(objCTRCK_EquipmentModel.lstDeletedCPKTRCK_EquipmentModel);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("DELETE")) // some or all of the rows were not deleted due to dependencies
                    _result = false;
            }
            else //deleted successfully
                _result = true;
            return _result;
        }

        //[Route("/api/TRCK_EquipmentModel/CheckRow/{pTRCK_EquipmentModelID}")]
        [HttpGet, HttpPost]
        public Boolean CheckRow(String pID)   
        {
            bool _result = false;
            // var xx = HttpContext.Current.Session["UserID"].ToString();
            CTRCK_EquipmentModel objCTRCK_EquipmentModel = new CTRCK_EquipmentModel();
            objCTRCK_EquipmentModel.GetItem(int.Parse(pID));

            //if (objCTRCK_EquipmentModel.lstCVarTRCK_EquipmentModel[0].TimeLocked.Equals(DateTime.Parse("01-01-1900")))
            if (objCTRCK_EquipmentModel.lstCVarTRCK_EquipmentModel[0].LockingUserID == 0)
            {
                //record is not locked so lock it then return false
                objCTRCK_EquipmentModel.lstCVarTRCK_EquipmentModel[0].TimeLocked = DateTime.Now;
                objCTRCK_EquipmentModel.lstCVarTRCK_EquipmentModel[0].LockingUserID = WebSecurity.CurrentUserId;
                objCTRCK_EquipmentModel.lstCVarTRCK_EquipmentModel.Add(objCTRCK_EquipmentModel.lstCVarTRCK_EquipmentModel[0]);
                objCTRCK_EquipmentModel.SaveMethod(objCTRCK_EquipmentModel.lstCVarTRCK_EquipmentModel);
                _result = false;
            }
            else
            {
                _result = true;//record is locked
            }
            return _result;
        }

        //[Route("/api/TRCK_EquipmentModel/UnlockRecord/{pID}")]
        [HttpGet, HttpPost]
        public Boolean UnlockRecord(string pID)
        {
            bool _result = false;
            try
            {
                CTRCK_EquipmentModel objCTRCK_EquipmentModel = new CTRCK_EquipmentModel();
                objCTRCK_EquipmentModel.GetItem(int.Parse(pID));

                objCTRCK_EquipmentModel.lstCVarTRCK_EquipmentModel[0].TimeLocked = DateTime.Parse("01-01-1900");
                objCTRCK_EquipmentModel.lstCVarTRCK_EquipmentModel[0].LockingUserID = 0;
                objCTRCK_EquipmentModel.lstCVarTRCK_EquipmentModel.Add(objCTRCK_EquipmentModel.lstCVarTRCK_EquipmentModel[0]);
                objCTRCK_EquipmentModel.SaveMethod(objCTRCK_EquipmentModel.lstCVarTRCK_EquipmentModel);
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
        //    CTRCK_EquipmentModel objCTRCK_EquipmentModel = new CTRCK_EquipmentModel();
        //    objCTRCK_EquipmentModel.GetList(pWhereClause);

        //    ReportDocument rd = new ReportDocument();
        //    rd.Load(Path.Combine(Server.MapPath("~/Reports"), "GroupSelection.rpt"));
        //    rd.SetDataSource(objCTRCK_EquipmentModel);

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
        //    CTRCK_EquipmentModel objCTRCK_EquipmentModel = new CTRCK_EquipmentModel();
        //    objCTRCK_EquipmentModel.GetList(" Where 1=1 ");

        //    var response = Request.CreateResponse(HttpStatusCode.OK);
        //    var strReportName = "GroupSelection.rpt";
        //    //var rd = new CrystalDecisions.CrystalReports.Engine.ReportDocument();
        //    ReportDocument rd = new ReportDocument();
        //    string strPath = HttpContext.Current.Server.MapPath("~/") + "Reports//" + strReportName;
        //    rd.Load(strPath);
        //    rd.SetDataSource(objCTRCK_EquipmentModel.lstCVarTRCK_EquipmentModel);
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
            CTRCK_EquipmentModel objCTRCK_EquipmentModel = new CTRCK_EquipmentModel();
            objCTRCK_EquipmentModel.GetList(" WHERE 1 = 1 ");

            //var response = Request.CreateResponse(HttpStatusCode.OK);
            //var response = Request.CreateResponse();
            var strReportName = "TRCK_EquipmentModel.rpt";
            //var rd = new CrystalDecisions.CrystalReports.Engine.ReportDocument();
            ReportDocument rd = new ReportDocument();
            string strPath = HttpContext.Current.Server.MapPath("~/") + "Reports//" + strReportName;
            rd.Load(strPath);
            rd.SetDataSource(objCTRCK_EquipmentModel.lstCVarTRCK_EquipmentModel);
            var tip = CrystalDecisions.Shared.ExportFormatType.PortableDocFormat;
            //var pdf = rd.ExportToDisk(tip);
            string strPDFFileName = "TRCK_EquipmentModel" + DateTime.Now.ToString().Replace("/", "-").Replace(":","-") + ".pdf";
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

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
    public class DocumentsInfoController : ApiController
    {
        //[Route("/api/DocumentsInfo/LoadAll")]
        [HttpGet, HttpPost]
        public Object[] LoadAll(string pWhereClause)
        {
            CDocumentsInfo objCDocumentsInfo = new CDocumentsInfo();
            objCDocumentsInfo.GetList(pWhereClause);
            return new Object[] { new JavaScriptSerializer().Serialize(objCDocumentsInfo.lstCVarDocumentsInfo) };
        }

        // [Route("/api/DocumentsInfo/LoadWithPaging/{pPageNumber}/{pPageSize}")]
        [HttpGet, HttpPost]
        public Object[] LoadWithPaging(Int32 pPageNumber, Int32 pPageSize, string pSearchKey)
        {
            CDocumentsInfo objCDocumentsInfo = new CDocumentsInfo();
            //objCDocumentsInfo.GetList(string.Empty); //GetList() fn loads without paging

            pSearchKey = (pSearchKey == null ? "" : pSearchKey.Trim().ToUpper());
            Int32 _RowCount = objCDocumentsInfo.lstCVarDocumentsInfo.Count;
            string whereClause = " Where Name LIKE N'%" + pSearchKey + "%' "
                + " OR Code LIKE N'%" + pSearchKey + "%' "
            + " OR Degree LIKE N'%" + pSearchKey + "%' ";
            objCDocumentsInfo.GetListPaging(pPageSize, pPageNumber, whereClause, "Name", out _RowCount);
            return new Object[] { new JavaScriptSerializer().Serialize(objCDocumentsInfo.lstCVarDocumentsInfo), _RowCount };
        }

        // [Route("/api/DocumentsInfo/Insert/{pCode}/{pName}/{pLocalName}}")]
        [HttpGet, HttpPost]
        public bool Save(
         int pID,
         string pCode,
         string pName,
         string pDegree,
         int pImportance,
         string pNotes,
         bool pIsImport,
         bool pIsExport,
         bool pIsDomestic,
         bool pIsOcean,
         bool pIsAir,
         bool pIsInland,
         bool pIsFCL,
         bool pIsLCL,
         bool pIsVehicle,
         bool pIsBulk


            )
        {
            bool _result = false;

            CVarDocumentsInfo objCVarDocumentsInfo = new CVarDocumentsInfo();
            objCVarDocumentsInfo.ID = pID;
            objCVarDocumentsInfo.Name = (pName == null ? "" : pName.Trim());
            objCVarDocumentsInfo.Code = (pCode == null ? "" : pCode.ToUpper());
            objCVarDocumentsInfo.Degree = (pDegree == null ? "" : pDegree.ToUpper());
            objCVarDocumentsInfo.Notes = (pNotes == null ? "" : pNotes.Trim().ToUpper());
            objCVarDocumentsInfo.Importance = pImportance;
            objCVarDocumentsInfo.IsImport = pIsImport;
            objCVarDocumentsInfo.IsExport = pIsExport;
            objCVarDocumentsInfo.IsDomestic = pIsDomestic;
            objCVarDocumentsInfo.IsOcean = pIsOcean;
            objCVarDocumentsInfo.IsAir = pIsAir;
            objCVarDocumentsInfo.IsInland = pIsInland;
            objCVarDocumentsInfo.IsFCL = pIsFCL;
            objCVarDocumentsInfo.IsLCL = pIsLCL;
            objCVarDocumentsInfo.IsVehicle = pIsVehicle;
            objCVarDocumentsInfo.IsBulk = pIsBulk;
            objCVarDocumentsInfo.IsContainers = pIsFCL;
            CDocumentsInfo objCDocumentsInfo = new CDocumentsInfo();
            objCDocumentsInfo.lstCVarDocumentsInfo.Add(objCVarDocumentsInfo);
            Exception checkException = objCDocumentsInfo.SaveMethod(objCDocumentsInfo.lstCVarDocumentsInfo);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else //not unique
                _result = true;
            return _result;
        }


        // [Route("/api/DocumentsInfo/Delete/{pDocumentsInfoIDs}")]
        [HttpGet, HttpPost]
        public bool Delete(String pDocumentsInfoIDs)
        {
            bool _result = false;
            CDocumentsInfo objCDocumentsInfo = new CDocumentsInfo();
            foreach (var currentID in pDocumentsInfoIDs.Split(','))
            {
                objCDocumentsInfo.lstDeletedCPKDocumentsInfo.Add(new CPKDocumentsInfo() { ID = Int32.Parse(currentID.Trim()) });
            }

            Exception checkException = objCDocumentsInfo.DeleteItem(objCDocumentsInfo.lstDeletedCPKDocumentsInfo);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("DELETE")) // some or all of the rows were not deleted due to dependencies
                    _result = false;
            }
            else //deleted successfully
                _result = true;
            return _result;
        }

        ////[Route("/api/DocumentsInfo/CheckRow/{pDocumentsInfoID}")]
        //[HttpGet, HttpPost]
        //public Boolean CheckRow(String pID)
        //{
        //    bool _result = false;
        //    // var xx = HttpContext.Current.Session["UserID"].ToString();
        //    CDocumentsInfo objCDocumentsInfo = new CDocumentsInfo();
        //    objCDocumentsInfo.GetItem(int.Parse(pID));

        //    //if (objCDocumentsInfo.lstCVarDocumentsInfo[0].TimeLocked.Equals(DateTime.Parse("01-01-1900")))
        //    if (objCDocumentsInfo.lstCVarDocumentsInfo[0].LockingUserID == 0)
        //    {
        //        //record is not locked so lock it then return false
        //        objCDocumentsInfo.lstCVarDocumentsInfo[0].TimeLocked = DateTime.Now;
        //        objCDocumentsInfo.lstCVarDocumentsInfo[0].LockingUserID = WebSecurity.CurrentUserId;
        //        objCDocumentsInfo.lstCVarDocumentsInfo.Add(objCDocumentsInfo.lstCVarDocumentsInfo[0]);
        //        objCDocumentsInfo.SaveMethod(objCDocumentsInfo.lstCVarDocumentsInfo);
        //        _result = false;
        //    }
        //    else
        //    {
        //        _result = true;//record is locked
        //    }
        //    return _result;
        //}

        ////[Route("/api/DocumentsInfo/UnlockRecord/{pID}")]
        //[HttpGet, HttpPost]
        //public Boolean UnlockRecord(string pID)
        //{
        //    bool _result = false;
        //    try
        //    {
        //        CDocumentsInfo objCDocumentsInfo = new CDocumentsInfo();
        //        objCDocumentsInfo.GetItem(int.Parse(pID));

        //        objCDocumentsInfo.lstCVarDocumentsInfo[0].TimeLocked = DateTime.Parse("01-01-1900");
        //        objCDocumentsInfo.lstCVarDocumentsInfo[0].LockingUserID = 0;
        //        objCDocumentsInfo.lstCVarDocumentsInfo.Add(objCDocumentsInfo.lstCVarDocumentsInfo[0]);
        //        objCDocumentsInfo.SaveMethod(objCDocumentsInfo.lstCVarDocumentsInfo);
        //        _result = true;
        //    }
        //    catch (Exception ex)
        //    {
        //        _result = false;//record is locked
        //    }
        //    return _result;
        //}
    }
}

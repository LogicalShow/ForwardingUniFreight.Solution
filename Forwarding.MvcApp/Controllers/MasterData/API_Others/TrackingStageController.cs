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
    public class TrackingStageController : ApiController
    {
        [HttpGet, HttpPost]
        public Object[] LoadAll(string pWhereClause)
        {
            CTrackingStage objCTrackingStage = new CTrackingStage();
            objCTrackingStage.GetList(pWhereClause);
            return new Object[] { new JavaScriptSerializer().Serialize(objCTrackingStage.lstCVarTrackingStage) };
        }

        [HttpGet, HttpPost]
        public Object[] LoadWithPaging(Int32 pPageNumber, Int32 pPageSize, string pSearchKey)
        {
            CTrackingStage objCTrackingStage = new CTrackingStage();
            //objCTrackingStage.GetList(string.Empty); //GetList() fn loads without paging

            pSearchKey = (pSearchKey == null ? "" : pSearchKey.Trim().ToUpper());
            Int32 _RowCount = objCTrackingStage.lstCVarTrackingStage.Count;
            string whereClause = " Where Name LIKE '%" + pSearchKey + "%' ";
            objCTrackingStage.GetListPaging(pPageSize, pPageNumber, whereClause, "ViewOrder", out _RowCount);
            return new Object[] { new JavaScriptSerializer().Serialize(objCTrackingStage.lstCVarTrackingStage), _RowCount };
        }

        [HttpGet, HttpPost]
        public bool Insert(string pName, string pNotes, Int32 pViewOrder, bool pIsOcean, bool pIsAir, bool pIsInland, bool pIsImport, bool pIsExport, bool pIsDomestic , bool pIsClearance)
        {
            bool _result = false;

            CVarTrackingStage objCVarTrackingStage = new CVarTrackingStage();

            objCVarTrackingStage.Name = pName;
            objCVarTrackingStage.Notes = pNotes;
            objCVarTrackingStage.ViewOrder = pViewOrder;
            objCVarTrackingStage.IsOcean = pIsOcean;
            objCVarTrackingStage.IsAir = pIsAir;
            objCVarTrackingStage.IsInland = pIsInland;
            objCVarTrackingStage.IsImport = pIsImport;
            objCVarTrackingStage.IsExport = pIsExport;
            objCVarTrackingStage.IsDomestic = pIsDomestic;
            objCVarTrackingStage.IsClearance = pIsClearance;
            CTrackingStage objCTrackingStage = new CTrackingStage();
            objCTrackingStage.lstCVarTrackingStage.Add(objCVarTrackingStage);
            Exception checkException = objCTrackingStage.SaveMethod(objCTrackingStage.lstCVarTrackingStage);
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
        public bool Update(Int32 pID, string pName, string pNotes, Int32 pViewOrder, bool pIsOcean, bool pIsAir, bool pIsInland, bool pIsImport, bool pIsExport, bool pIsDomestic, bool pIsClearance)
        {
            bool _result = false;

            CVarTrackingStage objCVarTrackingStage = new CVarTrackingStage();

            objCVarTrackingStage.ID = pID;
            objCVarTrackingStage.Name = pName;
            objCVarTrackingStage.Notes = pNotes;
            objCVarTrackingStage.ViewOrder = pViewOrder;
            objCVarTrackingStage.IsOcean = pIsOcean;
            objCVarTrackingStage.IsAir = pIsAir;
            objCVarTrackingStage.IsInland = pIsInland;
            objCVarTrackingStage.IsImport = pIsImport;
            objCVarTrackingStage.IsExport = pIsExport;
            objCVarTrackingStage.IsDomestic = pIsDomestic;
            objCVarTrackingStage.IsClearance = pIsClearance;
            CTrackingStage objCTrackingStage = new CTrackingStage();
            objCTrackingStage.lstCVarTrackingStage.Add(objCVarTrackingStage);
            Exception checkException = objCTrackingStage.SaveMethod(objCTrackingStage.lstCVarTrackingStage);
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
        public bool Delete(String pTrackingStageIDs)
        {
            bool _result = false;
            CTrackingStage objCTrackingStage = new CTrackingStage();
            foreach (var currentID in pTrackingStageIDs.Split(','))
            {
                objCTrackingStage.lstDeletedCPKTrackingStage.Add(new CPKTrackingStage() { ID = Int32.Parse(currentID.Trim()) });
            }

            Exception checkException = objCTrackingStage.DeleteItem(objCTrackingStage.lstDeletedCPKTrackingStage);
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

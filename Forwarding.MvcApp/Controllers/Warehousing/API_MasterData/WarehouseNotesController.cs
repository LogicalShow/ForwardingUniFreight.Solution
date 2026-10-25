using Forwarding.MvcApp.Models.Warehousing.MasterData.Generated;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;

namespace Forwarding.MvcApp.Controllers.Warehousing.API_MasterData
{
    public class WarehouseNotesController : ApiController
    {
        [HttpGet, HttpPost]
        public object[] LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned(bool pIsLoadArrayOfObjects, string pLanguage, Int32 pPageNumber, Int32 pPageSize, string pWhereClause, string pOrderBy)
        {
            int _RowCount = 0;
            CWH_Notes objCWH_Notes = new CWH_Notes();
            objCWH_Notes.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);

            return new object[] {
                new JavaScriptSerializer().Serialize(objCWH_Notes.lstCVarWH_Notes)
                , _RowCount
            };
        }

        [HttpGet, HttpPost]
        public bool Insert(string pName, string pNotes, Boolean pIsForReleaseOrder,Boolean pIsForStoring)
        {
            bool _result = false;

            CVarWH_Notes objCVarWH_Notes = new CVarWH_Notes();

            objCVarWH_Notes.Name = pName;
            objCVarWH_Notes.Notes = pNotes;
            objCVarWH_Notes.IsForReleaseOrder = pIsForReleaseOrder;
            objCVarWH_Notes.IsForStoring = pIsForStoring;

            CWH_Notes objCWH_Notes = new CWH_Notes();
            objCWH_Notes.lstCVarWH_Notes.Add(objCVarWH_Notes);
            Exception checkException = objCWH_Notes.SaveMethod(objCWH_Notes.lstCVarWH_Notes);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else
            { //not unique
                _result = true;
            }
            return _result;
        }

        [HttpGet, HttpPost]
        public bool Update(Int32 pID, string pName, string pNotes, Boolean pIsForReleaseOrder, Boolean pIsForStoring)
        {
            bool _result = false;

            CVarWH_Notes objCVarWH_Notes = new CVarWH_Notes();

            objCVarWH_Notes.ID = pID;
            objCVarWH_Notes.Name = pName;
            objCVarWH_Notes.Notes = pNotes;
            objCVarWH_Notes.IsForReleaseOrder = pIsForReleaseOrder;
            objCVarWH_Notes.IsForStoring = pIsForStoring;

            CWH_Notes objCWH_Notes = new CWH_Notes();
            objCWH_Notes.lstCVarWH_Notes.Add(objCVarWH_Notes);
            Exception checkException = objCWH_Notes.SaveMethod(objCWH_Notes.lstCVarWH_Notes);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else
            { //not unique
                _result = true;
            }
            return _result;
        }

        [HttpGet, HttpPost]
        public bool Delete(String pNotesIDs)
        {
            bool _result = true;
            CWH_Notes objCWH_Notes = new CWH_Notes();
            Exception checkException = null;
            foreach (var currentID in pNotesIDs.Split(','))
            {
                objCWH_Notes.lstDeletedCPKWH_Notes.Add(new CPKWH_Notes() { ID = Int32.Parse(currentID.Trim()) });
                checkException = objCWH_Notes.DeleteItem(objCWH_Notes.lstDeletedCPKWH_Notes);
                if (checkException != null)
                    _result = false;
            }

            return _result;
        }

    }
}

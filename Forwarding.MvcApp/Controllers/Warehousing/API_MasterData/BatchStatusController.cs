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
    public class BatchStatusController: ApiController
    {
        [HttpGet, HttpPost] 
        public object[] LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned(bool pIsLoadArrayOfObjects, string pLanguage, Int32 pPageNumber, Int32 pPageSize, string pWhereClause, string pOrderBy)
        {
            int _RowCount = 0;
            CBatchStatus objCBatchStatus = new CBatchStatus();
      
            objCBatchStatus.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);

            return new object[] {
                new JavaScriptSerializer().Serialize(objCBatchStatus.lstCVarBatchStatus)
                , _RowCount
            };
        }

        [HttpGet, HttpPost]
        public bool Insert(string pName , bool pHeld)
        {
            bool _result = false;
            int _RowCount = 0;
            CBatchStatus cBatchStatus = new CBatchStatus();
            CVarBatchStatus objCVarBatchStatus = new CVarBatchStatus();
            cBatchStatus.GetListPaging(99999, 1, "WHERE 1 = 1", "ID", out _RowCount);
            var MaxCode = cBatchStatus.lstCVarBatchStatus.Any() ?
                 cBatchStatus.lstCVarBatchStatus.Max(a => a.Code) : 0;
            if (MaxCode == 0 || MaxCode == null)
            {
                objCVarBatchStatus.Code = 1;
            }
            else
            {
                objCVarBatchStatus.Code = MaxCode + 1;
            }
            objCVarBatchStatus.Name = pName;
            objCVarBatchStatus.Held = pHeld;
            objCVarBatchStatus.CreationDate = DateTime.Now;
            objCVarBatchStatus.CreatorUserID = WebSecurity.CurrentUserId;
            objCVarBatchStatus.ModificationDate = DateTime.Now;
            objCVarBatchStatus.ModificatorUserID = WebSecurity.CurrentUserId;
       
            CBatchStatus objCBatchStatus = new CBatchStatus();
            objCBatchStatus.lstCVarBatchStatus.Add(objCVarBatchStatus);

            Exception checkException = objCBatchStatus.SaveMethod(objCBatchStatus.lstCVarBatchStatus);

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
        public bool Update(Int32 pID, string pName, bool pHeld)
        {
            bool _result = false;

            CVarBatchStatus objCVarBatchStatus = new CVarBatchStatus();
            objCVarBatchStatus.ID = pID;
            objCVarBatchStatus.Name = pName;
            objCVarBatchStatus.Held = pHeld;
            objCVarBatchStatus.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarBatchStatus.ModificationDate = DateTime.Now;
            objCVarBatchStatus.CreationDate = DateTime.Now;
            objCVarBatchStatus.CreatorUserID = WebSecurity.CurrentUserId;

            CBatchStatus objCBatchStatus = new CBatchStatus();
            objCBatchStatus.lstCVarBatchStatus.Add(objCVarBatchStatus);
            Exception checkException = objCBatchStatus.SaveMethod(objCBatchStatus.lstCVarBatchStatus);
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
        public bool Delete(String pBatchStatusIDs)
        {
            bool _result = true;
            Exception checkException = null;
            CBatchStatus objCBatchStatus = new CBatchStatus();
            foreach(var currentId in pBatchStatusIDs.Split(','))
            {
                objCBatchStatus.lstDeletedCPKBatchStatus.Add(new CPKBatchStatus() { ID = Int32.Parse(currentId.Trim()) });
                checkException = objCBatchStatus.DeleteItem(objCBatchStatus.lstDeletedCPKBatchStatus);
                if (checkException != null)
                    _result = false;
            }

            return _result;
        }
        
    }
}

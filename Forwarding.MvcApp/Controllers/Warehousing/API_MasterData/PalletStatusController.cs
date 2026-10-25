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
    public class PalletStatusController: ApiController 
    {
        [HttpGet, HttpPost]
        public object[] LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned(bool pIsLoadArrayOfObjects, string pLanguage, Int32 pPageNumber, Int32 pPageSize, string pWhereClause, string pOrderBy)
        {
            int _RowCount = 0;
            CPalletStatus objCPalletStatus = new CPalletStatus();
      
            objCPalletStatus.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);

            return new object[] {
                new JavaScriptSerializer().Serialize(objCPalletStatus.lstCVarPalletStatus)
                , _RowCount
            };
        }

        [HttpGet, HttpPost]
        public bool Insert(string pName , bool pHeld)
        {
            bool _result = false;
            int _RowCount = 0;
            CPalletStatus cPalletStatus = new CPalletStatus();
            CVarPalletStatus objCVarPalletStatus = new CVarPalletStatus();
            cPalletStatus.GetListPaging(99999, 1, "WHERE 1 = 1", "ID", out _RowCount);
            var MaxCode = cPalletStatus.lstCVarPalletStatus.Any() ?
                 cPalletStatus.lstCVarPalletStatus.Max(a => a.Code) : 0;
            if (MaxCode == 0 || MaxCode == null)
            {
                objCVarPalletStatus.Code = 1;
            }
            else
            {
                objCVarPalletStatus.Code = MaxCode + 1;
            }
            objCVarPalletStatus.Name = pName;
            objCVarPalletStatus.Held = pHeld;
            objCVarPalletStatus.CreationDate = DateTime.Now;
            objCVarPalletStatus.CreatorUserID = WebSecurity.CurrentUserId;
            objCVarPalletStatus.ModificationDate = DateTime.Now;
            objCVarPalletStatus.ModificatorUserID = WebSecurity.CurrentUserId;
       
            CPalletStatus objCpalletStatus = new CPalletStatus();
            objCpalletStatus.lstCVarPalletStatus.Add(objCVarPalletStatus);

            Exception checkException = objCpalletStatus.SaveMethod(objCpalletStatus.lstCVarPalletStatus);

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

            CVarPalletStatus objCVarPalletStatus = new CVarPalletStatus();
            objCVarPalletStatus.ID = pID;
            objCVarPalletStatus.Name = pName;
            objCVarPalletStatus.Held = pHeld;
            objCVarPalletStatus.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarPalletStatus.ModificationDate = DateTime.Now;
            objCVarPalletStatus.CreationDate = DateTime.Now;
            objCVarPalletStatus.CreatorUserID = WebSecurity.CurrentUserId;

            CPalletStatus objCPalletStatus = new CPalletStatus();
            objCPalletStatus.lstCVarPalletStatus.Add(objCVarPalletStatus);
            Exception checkException = objCPalletStatus.SaveMethod(objCPalletStatus.lstCVarPalletStatus);
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
        public bool Delete(String pPalletStatusIDs)
        {
            bool _result = true;
            Exception checkException = null;
            CPalletStatus objCPalletStatus = new CPalletStatus();
            foreach(var currentId in pPalletStatusIDs.Split(','))
            {
                objCPalletStatus.lstDeletedCPKPalletStatus.Add(new CPKPalletStatus() { ID = Int32.Parse(currentId.Trim()) });
                checkException = objCPalletStatus.DeleteItem(objCPalletStatus.lstDeletedCPKPalletStatus);
                if (checkException != null)
                    _result = false;
            }

            return _result;
        }
        
    }
}

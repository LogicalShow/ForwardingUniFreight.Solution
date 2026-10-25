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
    public class PalletClassificationController: ApiController
    {
        [HttpGet, HttpPost]
        public object[] LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned(bool pIsLoadArrayOfObjects, string pLanguage, Int32 pPageNumber, Int32 pPageSize, string pWhereClause, string pOrderBy)
        {
            int _RowCount = 0;
            CPalletClassification objCPalletClassification = new CPalletClassification();
            objCPalletClassification.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);

            return new object[] {
                new JavaScriptSerializer().Serialize(objCPalletClassification.lstCVarPalletClassification)
                , _RowCount
            };
        }

        [HttpGet, HttpPost]
        public bool Insert(string pName , decimal pCBM)
        {
            bool _result = false;
            CVarPalletClassification objcVarPalletClassification = new CVarPalletClassification();
            objcVarPalletClassification.Name = pName;
            objcVarPalletClassification.CBM = pCBM;  
            objcVarPalletClassification.CreationDate = DateTime.Now;
            objcVarPalletClassification.ModificationDate = DateTime.Now;
            objcVarPalletClassification.CreatorUserID = WebSecurity.CurrentUserId;
            objcVarPalletClassification.ModificatorUserID = WebSecurity.CurrentUserId;

            
            CPalletClassification objCPalletClassification = new CPalletClassification();
            objCPalletClassification.lstCVarPalletClassification.Add(objcVarPalletClassification);
            Exception checkException = objCPalletClassification.SaveMethod(objCPalletClassification.lstCVarPalletClassification);

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
        public bool Update(Int32 pID, string pName, Int32 pCBM)
        {
            bool _result = false;

            CVarPalletClassification objCvarPalletClassification = new CVarPalletClassification();
            objCvarPalletClassification.ID = pID;
            objCvarPalletClassification.Name = pName;
            objCvarPalletClassification.CBM = pCBM;
            objCvarPalletClassification.ModificatorUserID = WebSecurity.CurrentUserId;
            objCvarPalletClassification.ModificationDate = DateTime.Now;
            objCvarPalletClassification.CreationDate = DateTime.Now;
            objCvarPalletClassification.CreatorUserID = WebSecurity.CurrentUserId;
            CPalletClassification objCPalletClassification = new CPalletClassification();
            objCPalletClassification.lstCVarPalletClassification.Add(objCvarPalletClassification);
            Exception checkException = objCPalletClassification.SaveMethod(objCPalletClassification.lstCVarPalletClassification);
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
        public bool Delete(String pPalletClassificationIDs)
        {
            bool _result = true;
            CWH_MainWarehouses objCWH_MainWarehouse = new CWH_MainWarehouses();
            CPalletClassification cPalletClassification = new CPalletClassification();
            Exception checkException = null;
            foreach (var currentId in pPalletClassificationIDs.Split(','))
            {
                cPalletClassification.lstDeletedCPKPalletClassification.Add(new CPKPalletClassification() { ID = Int32.Parse(currentId.Trim()) });
                checkException = cPalletClassification.DeleteItem(cPalletClassification.lstDeletedCPKPalletClassification);
                if (checkException != null)
                    _result = false;

            }
            return _result;
        }

    }
}

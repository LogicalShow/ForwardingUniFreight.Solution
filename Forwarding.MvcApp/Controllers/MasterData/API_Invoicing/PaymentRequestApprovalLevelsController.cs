using Forwarding.MvcApp.Models.MasterData.Invoicing.Generated;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;

namespace Forwarding.MvcApp.Controllers.MasterData.API_Invoicing
{ 
    public class PaymentRequestApprovalLevelsController : ApiController
    {
        [HttpGet, HttpPost]
        public Object[] LoadAll(string pWhereClause)
        {
            CPaymentRequestApprovalLevels objCPaymentRequestApprovalLevels = new CPaymentRequestApprovalLevels();
            objCPaymentRequestApprovalLevels.GetList(pWhereClause);
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[] { serializer.Serialize(objCPaymentRequestApprovalLevels.lstCVarPaymentRequestApprovalLevels) };
        }
        [HttpGet, HttpPost]
        public object[] LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned(bool pIsLoadArrayOfObjects, string pLanguage, Int32 pPageNumber, Int32 pPageSize, string pWhereClause, string pOrderBy)
        {
            int _RowCount = 0;

            CPaymentRequestApprovalLevels objCPaymentRequestApprovalLevels = new CPaymentRequestApprovalLevels();
            objCPaymentRequestApprovalLevels.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);

            return new object[] {
                new JavaScriptSerializer().Serialize(objCPaymentRequestApprovalLevels.lstCVarPaymentRequestApprovalLevels)
                , _RowCount
            };
        }

        [HttpGet, HttpPost]
        public bool Insert(string pName, int pOrderNo,bool pCreatePaymentOrderOnApprove, bool pCreateAccrualGLOnApprove, bool pRedirectNotifyOnApprove, bool pIsLastLevel)
        {
            bool _result = false;

            CVarPaymentRequestApprovalLevels objCVarPaymentRequestApprovalLevels = new CVarPaymentRequestApprovalLevels();

            objCVarPaymentRequestApprovalLevels.Name = pName;
            objCVarPaymentRequestApprovalLevels.OrderNo = pOrderNo;
            objCVarPaymentRequestApprovalLevels.CreatePaymentOrderOnApprove = pCreatePaymentOrderOnApprove;
            objCVarPaymentRequestApprovalLevels.CreateAccrualGLOnApprove = pCreateAccrualGLOnApprove;
            objCVarPaymentRequestApprovalLevels.RedirectNotifyOnApprove = pRedirectNotifyOnApprove;
            objCVarPaymentRequestApprovalLevels.IsLastLevel = pIsLastLevel;

            CPaymentRequestApprovalLevels objCPaymentRequestApprovalLevels = new CPaymentRequestApprovalLevels();
            objCPaymentRequestApprovalLevels.lstCVarPaymentRequestApprovalLevels.Add(objCVarPaymentRequestApprovalLevels);
            Exception checkException = objCPaymentRequestApprovalLevels.SaveMethod(objCPaymentRequestApprovalLevels.lstCVarPaymentRequestApprovalLevels);
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
        public bool Update(Int32 pID, string pName, int pOrderNo, bool pCreatePaymentOrderOnApprove, bool pCreateAccrualGLOnApprove, bool pRedirectNotifyOnApprove, bool pIsLastLevel)
        {
            bool _result = false;

            CVarPaymentRequestApprovalLevels objCVarPaymentRequestApprovalLevels = new CVarPaymentRequestApprovalLevels();

            objCVarPaymentRequestApprovalLevels.ID = pID;
            objCVarPaymentRequestApprovalLevels.Name = pName;
            objCVarPaymentRequestApprovalLevels.OrderNo = pOrderNo;
            objCVarPaymentRequestApprovalLevels.CreatePaymentOrderOnApprove = pCreatePaymentOrderOnApprove;
            objCVarPaymentRequestApprovalLevels.CreateAccrualGLOnApprove = pCreateAccrualGLOnApprove;
            objCVarPaymentRequestApprovalLevels.RedirectNotifyOnApprove = pRedirectNotifyOnApprove;
            objCVarPaymentRequestApprovalLevels.IsLastLevel = pIsLastLevel;

            CPaymentRequestApprovalLevels objCPaymentRequestApprovalLevels = new CPaymentRequestApprovalLevels();
            objCPaymentRequestApprovalLevels.lstCVarPaymentRequestApprovalLevels.Add(objCVarPaymentRequestApprovalLevels);
            Exception checkException = objCPaymentRequestApprovalLevels.SaveMethod(objCPaymentRequestApprovalLevels.lstCVarPaymentRequestApprovalLevels);
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
        public bool Delete(String pPaymentRequestApprovalLevelsIDs)
        {
            bool _result = true;
            CPaymentRequestApprovalLevels objCPaymentRequestApprovalLevels = new CPaymentRequestApprovalLevels();
            Exception checkException = null;
            foreach (var currentID in pPaymentRequestApprovalLevelsIDs.Split(','))
            {
                objCPaymentRequestApprovalLevels.lstDeletedCPKPaymentRequestApprovalLevels.Add(new CPKPaymentRequestApprovalLevels() { ID = Int32.Parse(currentID.Trim()) });
                checkException = objCPaymentRequestApprovalLevels.DeleteItem(objCPaymentRequestApprovalLevels.lstDeletedCPKPaymentRequestApprovalLevels);
                if (checkException != null)
                    _result = false;
            }

            return _result;
        }

    }
}

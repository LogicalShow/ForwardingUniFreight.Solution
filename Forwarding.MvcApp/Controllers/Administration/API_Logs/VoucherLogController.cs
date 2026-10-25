using Forwarding.MvcApp.Models.Operations.Operations.Generated;
using Forwarding.MvcApp.Models.Operations.Operations.Generated.Old;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;

namespace Forwarding.MvcApp.Controllers.Administration.API_Logs
{
    public class VoucherLogController : ApiController
    {
        //[HttpGet, HttpPost]
        //public object[] GetOperationChargeLogFilters()
        //{
        //    Int32 _RowCount = 0;

        //    COperations objCOperations = new COperations();
        //    objCOperations.GetListPaging(1500, 1, "WHERE 1=1", "ID DESC", out _RowCount);

        //    // Creates an instance of your JavaScriptSerializer & Setting the MaxJsonLength to handle the case of large data returned
        //    var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
        //    // Perform your serialization
        //    //serializer.Serialize("Your JSON Contents");

        //    return new object[]
        //    {
        //        serializer.Serialize(objCOperations.lstCVarOperations)
        //    };
        //}

        [HttpGet, HttpPost]
        public object[] LoadData(string pWhereClause)
        {
            bool pRecordsExist = false;
            Exception checkException = null;

            CVoucherLog objCVoucherLog = new CVoucherLog();
            Int32 _RowCount = 0;
            checkException = objCVoucherLog.GetListPaging(1500, 1, pWhereClause, "ActionDate DESC", out _RowCount);

            if (objCVoucherLog.lstCVarVoucherLog.Count > 0 && checkException == null)
                pRecordsExist = true;

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };

            return new object[]
            {
                pRecordsExist
                , serializer.Serialize(objCVoucherLog.lstCVarVoucherLog)
            };
        }

    }
}

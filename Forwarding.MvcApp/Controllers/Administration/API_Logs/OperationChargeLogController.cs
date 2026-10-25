using Forwarding.MvcApp.Entities.Operations;
using Forwarding.MvcApp.Models.Administration.Security.Generated;
using Forwarding.MvcApp.Models.Operations.Operations.Generated;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;

namespace Forwarding.MvcApp.Controllers.Administration.API_Logs
{
    public class OperationChargeLogController : ApiController
    {
        [HttpGet, HttpPost]
        public object[] GetOperationChargeLogFilters()
        {
            Int32 _RowCount = 0;

            COperations objCOperations = new COperations();
            //objCOperations.GetListPaging(1500, 1, "WHERE 1=1", "ID DESC", out _RowCount);

            CUsers objCUsers = new CUsers();
            objCUsers.GetListPaging(1500, 1, "WHERE 1=1", "ID DESC", out _RowCount);

            // Creates an instance of your JavaScriptSerializer & Setting the MaxJsonLength to handle the case of large data returned
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            // Perform your serialization
            //serializer.Serialize("Your JSON Contents");
            
            return new object[]
            {
                serializer.Serialize(objCOperations.lstCVarOperations)
                , serializer.Serialize(objCUsers.lstCVarUsers)
            };
        }

        [HttpGet, HttpPost]
        public object[] LoadData(string pWhereClause)
        {
            bool pRecordsExist = false;
            Exception checkException = null;

            COperationLog objCOperationLog = new COperationLog();
            Int32 _RowCount = 0;
            checkException = objCOperationLog.GetListPaging(1500, 1, pWhereClause, "ID DESC", out _RowCount);

            if (objCOperationLog.lstCVarOperationLog.Count > 0 && checkException == null)
                pRecordsExist = true;

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            // Perform your serialization
            //serializer.Serialize("Your JSON Contents");

            return new object[]
            {
                pRecordsExist
                , serializer.Serialize(objCOperationLog.lstCVarOperationLog)
            };
        }

    }
}

using Forwarding.MvcApp.Models.DynamicsCRM;
using System;
using System.Linq;
using System.Web.Http;
using System.Web.Script.Serialization;

namespace Forwarding.MvcApp.Controllers.DynamicsCRM
{
    public class DynamicsCRMLogController : ApiController
    {
        [HttpGet, HttpPost]
        public object[] LoadData(string pWhereClause, Int32 pRange)
        {
            string pMessageReturned = "";
            Exception checkException = null;
            int _RowCount = 0;
            CcrmLog objCcrmLog = new CcrmLog();
            checkException = objCcrmLog.GetListPaging(99999, 1, pWhereClause, "ID", out _RowCount);
            if (checkException != null)
                pMessageReturned = checkException.Message;
            var pReportList = objCcrmLog.lstCVarcrmLog
                .OrderByDescending(o => o.ID)
                .ToList()
                .Take(pRange);
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[]
            {
                pMessageReturned
                , serializer.Serialize(pReportList.Take(pRange)) //pData[1]
            };
        }
    }
}
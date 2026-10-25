using Forwarding.MvcApp.Models.ContainerTrackingGroup.Reports.Generated;
using Forwarding.MvcApp.Models.DynamicsCRM;
using System;
using System.Linq;
using System.Web.Http;
using System.Web.Script.Serialization;

namespace Forwarding.MvcApp.Controllers.ContainerTrackingGroup.API_Reports
{
    public class HoldTransactionLogController : ApiController
    {
        [HttpGet, HttpPost]
        public object[] LoadData(string pWhereClause, int pRange)
        {
            string pMessageReturned = "";
            Exception checkException = null;
            int _RowCount = 0;
            CvwHoldTransactionLog objCvwHoldTransactionLog = new CvwHoldTransactionLog();
            checkException = objCvwHoldTransactionLog.GetListPaging(pRange, 1, pWhereClause, "ID DESC", out _RowCount);

            if (checkException != null)
                pMessageReturned = checkException.Message;
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[]
            {
                pMessageReturned
                , serializer.Serialize(objCvwHoldTransactionLog.lstCVarvwHoldTransactionLog)
            };
        }
    }
}
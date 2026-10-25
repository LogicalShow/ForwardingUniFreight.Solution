using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Forwarding.MvcApp.Controllers.ContainerYard.Reports
{
    public class WH_MTY_ReportsController : ApiController
    {
        [HttpGet, HttpPost]
        public Object[] WH_MTY_ReportsCbo_LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned(Int32 pPageNumber, Int32 pPageSize, string pWhereClause, string pOrderBy)
        {
            return new Object[] { 0 };
        }
    }
}

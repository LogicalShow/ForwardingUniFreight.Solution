using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Forwarding.MvcApp.Controllers.ContainerTrackingGroup.API_ContainerTracking
{
    public class DepotReportsController : ApiController
    {
        [HttpGet, HttpPost]
        public Object[] DepotReportsCbo_LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned(Int32 pPageNumber, Int32 pPageSize, string pWhereClause, string pOrderBy)
        {
            return new Object[] { 0 };
        }
    }
}

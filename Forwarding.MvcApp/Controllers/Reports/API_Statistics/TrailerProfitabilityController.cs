using Forwarding.MvcApp.Models.MasterData.Invoicing.Generated;
using Forwarding.MvcApp.Models.MasterData.Trucking.Generated;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;

namespace Forwarding.MvcApp.Controllers.Reports.API_Statistics
{
    public class TrailerProfitabilityController : ApiController
    {
        [HttpGet, HttpPost]
        public object[] GetStatisticsFilter()
        {
            CTRCK_Trailers objCTRCK_Trailers = new CTRCK_Trailers();
            objCTRCK_Trailers.GetList(" WHERE 1=1 ORDER BY Name ");
            CvwChargeTypesWithMinimalColumns objCvwChargetypes = new CvwChargeTypesWithMinimalColumns();
            objCvwChargetypes.GetList(" WHERE 1=1 ORDER BY Name ");
            var serializer = new JavaScriptSerializer() { MaxJsonLength = int.MaxValue };
            return new object[] { 
                new JavaScriptSerializer().Serialize(objCTRCK_Trailers.lstCVarTRCK_Trailers) //data[0]
                , new JavaScriptSerializer().Serialize(objCvwChargetypes.lstCVarvwChargeTypesWithMinimalColumns) //data[1]
            };
        }

        [HttpGet, HttpPost]
        public object[] LoadData(string pWhereClause)
        {
            bool pRecordsExist = false;
            Exception checkException = null;

            CvwTrailerProfitability objCvwTrailerProfitability = new CvwTrailerProfitability();
            checkException = objCvwTrailerProfitability.GetList(pWhereClause);

            if (objCvwTrailerProfitability.lstCVarvwTrailerProfitability.Count > 0 && checkException == null)
                pRecordsExist = true;

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] 
            {
                pRecordsExist //data[0]
                , serializer.Serialize(objCvwTrailerProfitability.lstCVarvwTrailerProfitability) //data[1]
            };
        }

    }
}

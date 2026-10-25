using Forwarding.MvcApp.Models.MasterData.Invoicing.Generated;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Script.Serialization;
//using System.Web.Mvc; //sherif: when i use this namespace, then [HttpGet, HttpPost] don't work?!!!!
//because this is an api controller


namespace Forwarding.MvcApp.Controllers.MasterData.API_Invoicing
{
    public class LogTaxesPercentagesController : ApiController
    {
        // [Route("/api/LogTaxesPercentages/LoadWithPaging/{pPageNumber}/{pPageSize}")]
        [HttpGet, HttpPost]
        public Object[] LoadWithPaging(Int32 pPageNumber, Int32 pPageSize, string pWhereClause, string pOrderBy)
        {
            CLogTaxesPercentages objCLogTaxesPercentages = new CLogTaxesPercentages();
            //objCCountries.GetList(string.Empty);
            Int32 _RowCount = 0;// objCCountries.lstCVarCountries.Count;

            objCLogTaxesPercentages.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);

            return new Object[] { new JavaScriptSerializer().Serialize(objCLogTaxesPercentages.lstCVarLogTaxesPercentages), _RowCount };
        }
        
    }
}

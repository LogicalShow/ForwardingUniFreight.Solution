using Forwarding.MvcApp.Models.OperAcc.Generated;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;

namespace Forwarding.MvcApp.Controllers.MasterData.API_Partners
{
    public class AccPartnersController : ApiController
    {
        [HttpGet, HttpPost]
        public object[] LoadAll(string pWhereClause)
        {
            CvwAccPartners objCvwAccPartners = new CvwAccPartners();
            objCvwAccPartners.GetListFilter(pWhereClause);
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[]
            {
                serializer.Serialize(objCvwAccPartners.lstCVarvwAccPartners)
            };
        }
    }
}

using Forwarding.MvcApp.Models.NoAccess.Generated;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Script.Serialization;


namespace Forwarding.MvcApp.Controllers.NoAccess
{
    public class NoAccessCustomerSizesController : ApiController
    {
        //[Route("/api/NoAccessCustomerSizes/LoadAll")]
        [HttpGet, HttpPost]
        //sherif: to be used in select boxes
        public Object[] LoadAll(string pOrderBy)
        {
            CNoAccessCustomerSizes objCNoAccessCustomerSizes = new CNoAccessCustomerSizes();
            objCNoAccessCustomerSizes.GetList(" order by " + pOrderBy);
            return new Object[] { new JavaScriptSerializer().Serialize(objCNoAccessCustomerSizes.lstCVarNoAccessCustomerSizes) };
        }
    }
}

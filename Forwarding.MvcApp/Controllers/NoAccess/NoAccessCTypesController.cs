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
    public class NoAccessCTypesController : ApiController
    {
        //[Route("/api/NoAccessCTypes/LoadAll")]
        [HttpGet, HttpPost]
        //sherif: to be used in select boxes
        public Object[] LoadAll(string pOrderBy)
        {
            CNoAccessCTypes objCNoAccessCTypes = new CNoAccessCTypes();
            objCNoAccessCTypes.GetList(" order by " + pOrderBy);
            return new Object[] { new JavaScriptSerializer().Serialize(objCNoAccessCTypes.lstCVarNoAccessCTypes) };
        }
    }
}

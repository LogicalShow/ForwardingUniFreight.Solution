using Forwarding.MvcApp.Models.Administration.Settings.Generated;
using System;
using System.Web.Http;
using System.Web.Script.Serialization;
namespace Forwarding.MvcApp.Controllers.Administration.API_Settings
{
    public class SystemDropdownOptionsController : ApiController
    {
        [HttpGet, HttpPost]
        public Object[] LoadAll(string pWhereClause)
        {
            CSystemDropdownOptions objCSystemDropdownOptions = new CSystemDropdownOptions();
            objCSystemDropdownOptions.GetList(pWhereClause);

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[] {
                new JavaScriptSerializer().Serialize(objCSystemDropdownOptions.lstCVarSystemDropdownOptions) //data[0]  
            };
        }
    }
}
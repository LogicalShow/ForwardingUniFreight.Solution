using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Forwarding.MvcApp.Helpers
{
    public class TranslateController : ApiController
    {
        [HttpGet]
        public static string Translate(string pTextToTranslate)
        {
            return Forwarding.MvcApp.App_Resources.App_Resources.ResourceManager.GetString(pTextToTranslate);
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Resources;
using System.Web;
using System.Web.Mvc;

namespace Forwarding.MvcApp.Helpers
{
    public static class ResourcesHelper
    {
        public static MvcHtmlString Resource<T>(this HtmlHelper<T> html, string key)
        {
            var resourceManager = new ResourceManager(typeof(Forwarding.MvcApp.App_Resources.App_Resources));

            var val = resourceManager.GetString(key);

            // if value is not found return the key itself
            return MvcHtmlString.Create(String.IsNullOrEmpty(val) ? key : val);
        }
    }
}
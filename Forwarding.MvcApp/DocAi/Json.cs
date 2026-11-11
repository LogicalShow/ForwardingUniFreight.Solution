using System;
using System.Collections.Generic;
using System.Globalization;
using System.Web.Script.Serialization;

namespace Forwarding.MvcApp.DocAi
{
    // Reads and writes the kit JSON contract using JavaScriptSerializer from .NET Framework.
    internal static class Json
    {
        public static Dictionary<string, object> ReadObject(string json)
        {
            return Serializer().Deserialize<Dictionary<string, object>>(json);
        }

        public static string Write(object value)
        {
            return Serializer().Serialize(value);
        }

        public static Dictionary<string, object> Obj(Dictionary<string, object> parent, string key)
        {
            object value;
            return parent != null && parent.TryGetValue(key, out value) ? value as Dictionary<string, object> : null;
        }

        public static string Str(Dictionary<string, object> parent, string key)
        {
            object value;
            if (parent == null || !parent.TryGetValue(key, out value) || value == null)
            {
                return null;
            }

            return Convert.ToString(value, CultureInfo.InvariantCulture);
        }

        private static JavaScriptSerializer Serializer()
        {
            return new JavaScriptSerializer { MaxJsonLength = int.MaxValue };
        }
    }
}

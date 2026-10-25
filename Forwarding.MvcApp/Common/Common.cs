using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Web;

namespace Forwarding.MvcApp.Common
{
    public class Common
    {
        public static void ReplaceNull(object obj, string str="")
        {
            Type type = obj.GetType();
            PropertyInfo[] props = type.GetProperties();
            foreach (var prop in props)
            {
                if (prop.PropertyType == typeof(string) && prop.GetValue(obj) == null)
                {
                    prop.SetValue(obj, str);
                }
                else if (prop.PropertyType == typeof(DateTime) && new DateTime(1900, 1, 1).CompareTo(prop.GetValue(obj)) > 0)
                {
                    prop.SetValue(obj, new DateTime(1900, 1, 1));
                }
            }
        }
    }
}
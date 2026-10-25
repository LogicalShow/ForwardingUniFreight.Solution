using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;

namespace Forwarding.MvcApp.Models.MasterData.Partners.Customized
{
    public class Base_DynamicConnection
    {
       public readonly string ConStr;
        public Base_DynamicConnection(Helpers.Companies.InternalCompanies Company)
        {
            switch (Company)
            {
                case Helpers.Companies.InternalCompanies.Altun:
                    ConStr = ConfigurationManager.ConnectionStrings["ConnectionStringAltun"].ToString();
                    break;
                case Helpers.Companies.InternalCompanies.EUROShipping:
                    ConStr = ConfigurationManager.ConnectionStrings["ConnectionStringEUROShipping"].ToString();
                    break;
                case Helpers.Companies.InternalCompanies.MESCO:
                    ConStr = ConfigurationManager.ConnectionStrings["ConnectionStringMESCO"].ToString();
                    break;
                case Helpers.Companies.InternalCompanies.GlobeLink:
                    ConStr = ConfigurationManager.ConnectionStrings["ConnectionStringGlobeLink"].ToString();
                    break;
                case Helpers.Companies.InternalCompanies.SACO:
                    ConStr = ConfigurationManager.ConnectionStrings["ConnectionStringSACO"].ToString();
                    break;
                case Helpers.Companies.InternalCompanies.TopManagement:
                    ConStr = ConfigurationManager.ConnectionStrings["ConnectionStringTopManagement"].ToString();
                    break;
                default:
                    ConStr = ConfigurationManager.ConnectionStrings["ConnectionString"].ToString();
                    break;
            }
        }
    }
}
/*
1-
:Base_DynamicConnection
    {
        public CCustomers_DynamicConnection(Helpers.Companies.InternalCompanies Company):base(Company)
        {
            
        }

2-
replace 
ConfigurationManager.ConnectionStrings["ConnectionString"].ToString()
with
base.ConStr
*/

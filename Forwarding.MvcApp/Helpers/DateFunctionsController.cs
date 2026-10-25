using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Forwarding.MvcApp.Helpers
{
    public class DateFunctionsController : ApiController
    {
        //gets YYYYMMDD Format from dd/MM/yyyy && MM/dd/yyyy , // pFormatOfSentDate :1-dd/MM/yyyy    2-MM/dd/yyyy
        [HttpGet]
        public static string GetYYYYMMDDFormat(string pDateToConvert, int pFormatOfSentDate)
        {
            string YYYYMMDD = "";
            if (pFormatOfSentDate == 1)
                YYYYMMDD = pDateToConvert.Split('/')[2]
                    + (pDateToConvert.Split('/')[1].Length == 1 ? "0" + pDateToConvert.Split('/')[1] : pDateToConvert.Split('/')[1])
                    + (pDateToConvert.Split('/')[0].Length == 1 ? "0" + pDateToConvert.Split('/')[0] : pDateToConvert.Split('/')[0])
                    ;
            else
                YYYYMMDD = pDateToConvert.Split('/')[2]
                    + (pDateToConvert.Split('/')[0].Length == 1 ? "0" + pDateToConvert.Split('/')[0] : pDateToConvert.Split('/')[0])
                    + (pDateToConvert.Split('/')[1].Length == 1 ? "0" + pDateToConvert.Split('/')[1] : pDateToConvert.Split('/')[1])
                    ;

            return YYYYMMDD;

        }

        //returns dd/MM/yyyy format from a datetime type
        [HttpGet]
        public static string GetddMMyyyyWithSlashesFormat(DateTime pDateToConvert)
        {
            string ddMMyyyyWithSlashesFormat = "";
                ddMMyyyyWithSlashesFormat = (pDateToConvert.Day.ToString().Length == 1 ? ("0" + pDateToConvert.Day.ToString()) : pDateToConvert.Day.ToString()) + "/"
                    + (pDateToConvert.Month.ToString().Length == 1 ? ("0" + pDateToConvert.Month.ToString()) : pDateToConvert.Month.ToString()) + "/"
                    + (pDateToConvert.Year.ToString().Length == 1 ? ("0" + pDateToConvert.Year.ToString()) : pDateToConvert.Year.ToString())
                    ;
            return ddMMyyyyWithSlashesFormat;
        }
    }
}

using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Web;

namespace Forwarding.MvcApp.Models.Operations.Operations.Customized
{
    public class InvoiceQRCode
    {
        public static string getTLVBase64(string SellerName, string VatRegNumber, DateTime timeStamp, decimal total, decimal vat)
        {

        
            byte[] btSeller = getTagValue(1, SellerName);

            byte[] btReg = getTagValue(2, VatRegNumber);

            GregorianCalendar cal = new GregorianCalendar();

            string format = "{0:D4}-{1:D2}-{2:D2}T{3:D2}:{4:D2}:{5:D2}Z";

            string time = string.Format(format, cal.GetYear(timeStamp)

                , cal.GetMonth(timeStamp)
                , cal.GetDayOfMonth(timeStamp)
                , cal.GetHour(timeStamp)
                , cal.GetMinute(timeStamp)
                , cal.GetSecond(timeStamp));

            byte[] btTime = getTagValue(3, time);

            byte[] btTotal = getTagValue(4, total.ToString("0.00"));

            byte[] btVat = getTagValue(5, vat.ToString("0.00"));

            byte[] btAll = concatenateBytes(btSeller, btReg, btTime, btTotal, btVat);

            string ret = Convert.ToBase64String(btAll);

            return ret;
        }
        public static byte[] getTagValue(int tagId, string value)
        {

            List<byte> lstRetByte = new List<byte>();

            lstRetByte.Add(Convert.ToByte(tagId));

            value = value.Trim();

            int length = value.Length;

            lstRetByte.Add(Convert.ToByte(length));

            byte[] bt = System.Text.UTF8Encoding.UTF8.GetBytes(value);

            lstRetByte.AddRange(bt);

            return lstRetByte.ToArray();


        }
        public static byte[] concatenateBytes(params byte[][] btArrays)
        {
            List<byte> lstRet = new List<byte>();
            foreach (var btArr in btArrays)
            {
                lstRet.AddRange(btArr);
            }
            return lstRet.ToArray();

        }
    }
}
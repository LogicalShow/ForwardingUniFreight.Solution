using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using FastReport;
using FastReport.Web;
using System.IO;
using System.Web.Http;
using System.Web.UI.WebControls;
using System.Web.Script.Serialization;
using FastReport.Export.Pdf;
using CrystalDecisions.CrystalReports.Engine;
using Forwarding.BLL.Utilities;
using Forwarding.MvcApp.Controllers.Administration.API_Settings;
using Forwarding.MvcApp.Models.Administration.Security.Generated;
using Forwarding.MvcApp.Models.Administration.Settings.Generated;
using OpenHtmlToPdf;
using System.ComponentModel.DataAnnotations;
using System.Net.Mail;
using System.Text.RegularExpressions;
using WebMatrix.WebData;
using System.CodeDom.Compiler;
using System.Web.UI;
using System.Windows;
using FastReport.Web.Handlers;
using System.Net;

namespace Shipping.MvcApp.ReportMainClass
{
    public class ReportMainClassController : Controller
    {


        [System.Web.Http.HttpPost, System.Web.Http.HttpGet]
		public ActionResult PrintReport([FromBody] ReportClass pReportClass)
		{

			JavaScriptSerializer jsonSerialiser = new JavaScriptSerializer();

			ReportMainClassController objReportMainClass = new ReportMainClassController();

			WebReport webReport = new WebReport();
            using (Report report = new Report())
            {
                string report_path = Path.Combine(HttpRuntime.AppDomainAppPath, "Reports\\" + pReportClass.pReportName + ".frx");

                report.Load(report_path);
                for (int i = 0; i < report.Dictionary.Connections.Count; i++)
                {
                    report.Dictionary.Connections[i].ConnectionString =
                        ConfigurationManager.ConnectionStrings["ConnectionString"].ToString();
                    report.Dictionary.Connections[i].CommandTimeout = 300;
                }
                string[] str_arr_Keys = pReportClass.arr_Keys.Split(',');
                string[] str_arr_Values = pReportClass.arr_Values.Split(',');
            
                    for (int i = 0; i < str_arr_Keys.Length; i++)
                    {
                        report.SetParameterValue(str_arr_Keys[i], str_arr_Values[i]);
                    }

                report.Prepare();

                using (MemoryStream ms = new MemoryStream())
                {
                    PDFExport pdfExport = new PDFExport();
                    pdfExport.ShowProgress = false;
                    pdfExport.Subject = pReportClass.pTitle;

                    pdfExport.Export(report, ms);

                    ms.Position = 0;

                    //return File(ms.ToArray(), "application/pdf", pReportClass.pTitle + ".pdf");
                    //return File(ms.ToArray(), "application/pdf");
                    Response.Clear();
                    Response.ContentType = "application/pdf";
                    Response.AddHeader("Content-Disposition", "inline; filename=" + pReportClass.pTitle + ".pdf");
                    Response.BinaryWrite(ms.ToArray());
                    Response.End();

                    return null;
                }
            }
            //if (pReportClass.arr_Values.Contains(" Where '**SC_RawReport**' = '**SC_RawReport**'"))
            //{
            //	var str_arr_Keys = pReportClass.arr_Keys.ToString();
            //	var str_arr_Values = pReportClass.arr_Values.ToString();



            //	string report_path = "";
            //	report_path = Path.Combine(HttpRuntime.AppDomainAppPath, "Reports\\" + pReportClass.pReportName + ".frx");

            //	webReport.Report.Load(report_path);
            //             //HEMIDA
            //             for (int i = 0; i < webReport.Report.Dictionary.Connections.Count; i++)
            //             {
            //                 webReport.Report.Dictionary.Connections[i].ConnectionString = ConfigurationManager.ConnectionStrings["ConnectionString"].ToString();
            //                 webReport.Report.Dictionary.Connections[i].CommandTimeout = 0;
            //             }




            //             webReport.Report.SetParameterValue(str_arr_Keys.ToString(), str_arr_Values.ToString());


            //}
            //else
            //{
            //	string[] str_arr_Keys = pReportClass.arr_Keys.Split(',').ToArray();
            //	string[] str_arr_Values = pReportClass.arr_Values.Split(',').ToArray();

            //	string[] str_arr_Pics = string.IsNullOrEmpty(pReportClass.arr_Pics) ? null : pReportClass.arr_Pics.Split(',').ToArray();
            //	string[] str_arr_PicsLocations = string.IsNullOrEmpty(pReportClass.arr_Pics) ? null : pReportClass.arr_PicsLocations.Split(',').ToArray();

            //	string report_path = "";
            //	report_path = Path.Combine(HttpRuntime.AppDomainAppPath, "Reports\\" + pReportClass.pReportName + ".frx");

            //	webReport.Report.Load(report_path);

            //	//Karim 20230917
            //	//webReport.Report.Dictionary.Connections[0].ConnectionString = ConfigurationManager.ConnectionStrings["ConnectionString"].ToString();
            //	//webReport.Report.Dictionary.Connections[0].CommandTimeout = 300;

            //	for (int i = 0; i < webReport.Report.Dictionary.Connections.Count; i++)
            //	{
            //		webReport.Report.Dictionary.Connections[i].ConnectionString = ConfigurationManager.ConnectionStrings["ConnectionString"].ToString();
            //		webReport.Report.Dictionary.Connections[i].CommandTimeout = 300;
            //	}

            //	for (int i = 0; i < str_arr_Keys.Length; i++)
            //	{
            //		if (str_arr_Values[i].Length >= 1)
            //		{
            //			str_arr_Values[i] = str_arr_Values[i];
            //		}
            //		else
            //		{
            //			str_arr_Values[i] = str_arr_Values[i];
            //		}
            //		webReport.Report.SetParameterValue(str_arr_Keys[i].ToString(), str_arr_Values[i].ToString());
            //	}

            //	if (str_arr_Pics?.Length > 0 && str_arr_PicsLocations?.Length > 0)
            //	{
            //		for (int i = 0; i < str_arr_Pics.Length; i++)
            //		{
            //			if (!string.IsNullOrEmpty(str_arr_Pics[i]) && !string.IsNullOrEmpty(str_arr_PicsLocations[i]))
            //			{
            //				var pic = (webReport.Report.FindObject(str_arr_Pics[i]) as FastReport.PictureObject);
            //				if (pic != null)
            //					pic.ImageLocation = str_arr_PicsLocations[i];
            //			}
            //		}
            //	}
            //}


            //webReport.Width = 1250;
            //webReport.Height = 800;
            //webReport.Zoom = 1;
            //webReport.Prepare();

            //         ViewBag.WebReport = webReport;
            //ViewBag.ReportTitle = pReportClass.pTitle;
            //return View("~/Views/ReportMainClass/ReportMainClass.cshtml", ViewBag.WebReport);
        }



		[System.Web.Http.HttpPost, System.Web.Http.HttpGet]
        public ActionResult PrintInqueryReport([FromBody] ReportClass PPrintInqueryReport)
        {
            JavaScriptSerializer jsonSerialiser = new JavaScriptSerializer();

            string[] str_arr_Keys = PPrintInqueryReport.arr_Keys.Trim().Split(',').ToArray();
            string[] str_arr_Values = PPrintInqueryReport.arr_Values.Trim().Split(',').ToArray();
            ReportMainClassController objReportMainClass = new ReportMainClassController();

            WebReport webReport = new WebReport();
            string report_path = "";
            report_path = Path.Combine(HttpRuntime.AppDomainAppPath, "Reports\\" + PPrintInqueryReport.pReportName + ".frx");

            webReport.Report.Load(report_path);


            //HEMIDA
            for (int i = 0; i < webReport.Report.Dictionary.Connections.Count; i++)
            {
                webReport.Report.Dictionary.Connections[i].ConnectionString = ConfigurationManager.ConnectionStrings["ConnectionString"].ToString();
                webReport.Report.Dictionary.Connections[i].CommandTimeout = 0;
            }

            for (int i = 0; i < str_arr_Keys.Length; i++)
            {
                //string ID = str_arr_Keys[i].ToString();
                //string Name = str_arr_Values[i].Replace("*", ",");
                if (str_arr_Values[i].Length >= 1 && str_arr_Keys[i] != ("FromDate") && str_arr_Keys[i] != ("ToDate") && str_arr_Keys[i] != ("WithSubAccounts") && str_arr_Keys[i] != ("WithSubAccounts")
                   && str_arr_Keys[i] != ("BatchNumber" ) && str_arr_Keys[i] != ("From_Date") && str_arr_Keys[i] != ("To_Date") && str_arr_Keys[i] != ("posted") && str_arr_Keys[i] != ("SuppressReverseJVs") && str_arr_Keys[i] != ("InvoiceID") && str_arr_Keys[i] != ("PSInvoiceID") && str_arr_Keys[i] != ("PaymentID"))
                //if (str_arr_Values[i].Length >= 1 && new[] { 2, 3, 4,5,7 }.Contains(i))
                {
                    str_arr_Values[i] = "," + str_arr_Values[i] + ",";
                    //str_arr_Values[3] = "," + str_arr_Values[3] + ",";
                    //str_arr_Values[4] = "," + str_arr_Values[4] + ",";
                    //str_arr_Values[5] = "," + str_arr_Values[5] + ",";
                    //str_arr_Values[7] = "," + str_arr_Values[7] + ",";
                }
                else
                {
                    str_arr_Values[i] = str_arr_Values[i];
                }
                webReport.Report.SetParameterValue(str_arr_Keys[i].ToString(), str_arr_Values[i].Replace("*", ","));
            }

            webReport.Width = 1250;
            webReport.Height = 800;
            webReport.Zoom = 1;
            webReport.Prepare();
            ViewBag.WebReport = webReport;
            ViewBag.ReportTitle = PPrintInqueryReport.pTitle;
            if (PPrintInqueryReport.pTitle.Contains("JVExcel") || PPrintInqueryReport.pReportName== "RepSafeJournalExcel" || PPrintInqueryReport.pReportName == "Rep_A_JobSummeryCustomizedExcel" || PPrintInqueryReport.pReportName == "Rep_A_JobSummeryExcel" || PPrintInqueryReport.pReportName == "RepPS_PurchasingOrdersNewFollowUpExcel")
                webReport.ExportExcel2007();
            return View("~/Views/ReportMainClass/ReportMainClass.cshtml", ViewBag.WebReport);
        }

        [System.Web.Http.HttpPost, System.Web.Http.HttpGet]
        public ActionResult PrintPS_Payment([FromBody] ReportClass PPrintPS_Payment)
        {
            JavaScriptSerializer jsonSerialiser = new JavaScriptSerializer();

            string[] str_arr_Keys = PPrintPS_Payment.arr_Keys.Split(',').ToArray();
            string[] str_arr_Values = PPrintPS_Payment.arr_Values.Split(',').ToArray();
            ReportMainClassController objReportMainClass = new ReportMainClassController();

            WebReport webReport = new WebReport();
            string report_path = "";
            report_path = Path.Combine(HttpRuntime.AppDomainAppPath, "Reports\\" + PPrintPS_Payment.pReportName + ".frx");
            webReport.Report.Load(report_path);

            //HEMIDA
            for (int i = 0; i < webReport.Report.Dictionary.Connections.Count; i++)
            {
                webReport.Report.Dictionary.Connections[i].ConnectionString = ConfigurationManager.ConnectionStrings["ConnectionString"].ToString();
                webReport.Report.Dictionary.Connections[i].CommandTimeout = 0;
            }

            for (int i = 0; i < str_arr_Keys.Length; i++)
            {
                //string ID = str_arr_Keys[i].ToString();
                //string Name = str_arr_Values[i].Replace("*", ",");
                if (str_arr_Values[i].Length >= 1)
                //if (str_arr_Values[i].Length >= 1 && new[] { 2, 3, 4,5,7 }.Contains(i))
                {
                    str_arr_Values[i] = str_arr_Values[i];
                    //str_arr_Values[3] = "," + str_arr_Values[3] + ",";
                    //str_arr_Values[4] = "," + str_arr_Values[4] + ",";
                    //str_arr_Values[5] = "," + str_arr_Values[5] + ",";
                    //str_arr_Values[7] = "," + str_arr_Values[7] + ",";
                }
                else
                {
                    str_arr_Values[i] = str_arr_Values[i];
                }
                webReport.Report.SetParameterValue(str_arr_Keys[i].ToString(), str_arr_Values[i].ToString());
            }

            webReport.Width = 1250;
            webReport.Height = 800;
            webReport.Zoom = 1;
            webReport.Prepare();

            ViewBag.WebReport = webReport;
            ViewBag.ReportTitle = PPrintPS_Payment.pTitle;

            if (PPrintPS_Payment.pTitle.Contains("JVExcel"))
                webReport.ExportExcel2007();
            return View("~/Views/ReportMainClass/ReportMainClass.cshtml", ViewBag.WebReport);
        }

        [System.Web.Http.HttpPost, System.Web.Http.HttpGet]
        public ActionResult PrintWithIDs([FromBody] ReportClass PPrintWithIDs)
        {
            JavaScriptSerializer jsonSerialiser = new JavaScriptSerializer();

            string[] str_arr_Keys = PPrintWithIDs.arr_Keys.Trim().Split(',').ToArray();
            string[] str_arr_Values = PPrintWithIDs.arr_Values.Trim().Split(',').ToArray();
            ReportMainClassController objReportMainClass = new ReportMainClassController();

            WebReport webReport = new WebReport();
            string report_path = "";
            report_path = Path.Combine(HttpRuntime.AppDomainAppPath, "Reports\\" + PPrintWithIDs.pReportName + ".frx");

            //HEMIDA
            for (int i = 0; i < webReport.Report.Dictionary.Connections.Count; i++)
            {
                webReport.Report.Dictionary.Connections[i].ConnectionString = ConfigurationManager.ConnectionStrings["ConnectionString"].ToString();
                webReport.Report.Dictionary.Connections[i].CommandTimeout = 0;
            }

            for (int i = 0; i < str_arr_Keys.Length; i++)
            {
                //string ID = str_arr_Keys[i].ToString();
                //string Name = str_arr_Values[i].Replace("*", ",");
                if (str_arr_Values[i].Length >= 1 && str_arr_Keys[i] != ("FromDate") && str_arr_Keys[i] != ("category")
                    && str_arr_Keys[i] != ("shiftEmp") && str_arr_Keys[i] != ("ToDate") && str_arr_Keys[i] != ("HideProfitLossJV")
                    && str_arr_Keys[i] != ("From_Date") && str_arr_Keys[i] != ("To_Date") && str_arr_Keys[i] != ("FromDate") 
                    && str_arr_Keys[i] != ("ToDate") && str_arr_Keys[i] != ("posted") && str_arr_Keys[i] != ("CurrencyID")
                    && str_arr_Keys[i] != ("Year") && str_arr_Keys[i] != ("Week")
                    && str_arr_Keys[i] != ("Section") && str_arr_Keys[i] != ("maritalstatus")
                    && str_arr_Keys[i] != ("NumberofChildren")
                    && str_arr_Keys[i] != ("CustomerID")
                    && str_arr_Keys[i] != ("Gender")

                    )
                //if (str_arr_Values[i].Length >= 1 && new[] { 2, 3, 4,5,7 }.Contains(i))
                {
                    str_arr_Values[i] = "," + str_arr_Values[i] + ",";
                    //str_arr_Values[3] = "," + str_arr_Values[3] + ",";
                    //str_arr_Values[4] = "," + str_arr_Values[4] + ",";
                    //str_arr_Values[5] = "," + str_arr_Values[5] + ",";
                    //str_arr_Values[7] = "," + str_arr_Values[7] + ",";
                }
                else
                {
                    str_arr_Values[i] = str_arr_Values[i];
                }
                webReport.Report.SetParameterValue(str_arr_Keys[i].ToString(), str_arr_Values[i].Replace("*", ","));
            }

            webReport.Width = 1250;
            webReport.Height = 800;
            webReport.Zoom = 1;
            webReport.Prepare();

            ViewBag.WebReport = webReport;
            ViewBag.ReportTitle = PPrintWithIDs.pTitle;
            if (PPrintWithIDs.pReportName == "EmployeeExcel")
                webReport.ExportExcel2007();
            return View("~/Views/ReportMainClass/ReportMainClass.cshtml", ViewBag.WebReport);
        }

        [System.Web.Http.HttpPost, System.Web.Http.HttpGet]
        public ActionResult PrintReportTwoQueries([FromBody] ReportWithQuery pReportClass)
        {

            JavaScriptSerializer jsonSerialiser = new JavaScriptSerializer();

            string[] str_arr_Keys = pReportClass.arr_Keys.Split(',').ToArray();
            string[] str_arr_Values = pReportClass.arr_Values.Split(',').ToArray();
            ReportMainClassController objReportMainClass = new ReportMainClassController();

            WebReport webReport = new WebReport();
            string report_path = "";
            report_path = Path.Combine(HttpRuntime.AppDomainAppPath, "Reports\\" + pReportClass.pReportName + ".frx");

            webReport.Report.Load(report_path);
            //HEMIDA
            for (int i = 0; i < webReport.Report.Dictionary.Connections.Count; i++)
            {
                webReport.Report.Dictionary.Connections[i].ConnectionString = ConfigurationManager.ConnectionStrings["ConnectionString"].ToString();
                webReport.Report.Dictionary.Connections[i].CommandTimeout = 0;
            }

            webReport.Report.SetParameterValue("query", pReportClass.query);
            webReport.Report.SetParameterValue("query2", pReportClass.query2);
            for (int i = 0; i < str_arr_Keys.Length; i++)
            {
                if (str_arr_Values[i].Length >= 1)
                {
                    str_arr_Values[i] = str_arr_Values[i];
                }
                else
                {
                    str_arr_Values[i] = str_arr_Values[i];
                }
                webReport.Report.SetParameterValue(str_arr_Keys[i].ToString(), str_arr_Values[i].ToString());
            }

            webReport.Width = 1250;
            webReport.Height = 800;
            webReport.Zoom = 1;
            webReport.Prepare();
            var html = webReport.GetHtml();
            ViewBag.WebReport = webReport;
            ViewBag.ReportTitle = pReportClass.pTitle;

            if (pReportClass.pReportType == "Excel")
                webReport.ExportExcel2007();

            return View("~/Views/ReportMainClass/ReportMainClass.cshtml", ViewBag.WebReport);
        }

        [System.Web.Http.HttpPost, System.Web.Http.HttpGet]
        public ActionResult PrintReportQueryAndParams([FromBody] ReportWithParams pReportClass)
        {

            JavaScriptSerializer jsonSerialiser = new JavaScriptSerializer();

            string[] str_arr_Keys = pReportClass.arr_Keys.Split(',').ToArray();
            string[] str_arr_Values = pReportClass.arr_Values.Split(',').ToArray();
            int _RowCount = 0;
            CDefaults objCDefaults = new CDefaults();
            objCDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount);

            if (objCDefaults.lstCVarDefaults[0].UnEditableCompanyName=="UNF" && pReportClass.arr_Values.Contains("-"))
            {
                if (str_arr_Values.Length >= 4)
                {
                    str_arr_Values[3] = str_arr_Values[3].Replace("-", ",");
                }
                if (str_arr_Values[0].Contains("-"))
                {
                    str_arr_Values[0] = str_arr_Values[0].Replace("-", ",");
                }

            }

            string[] str_arr_Pics = string.IsNullOrEmpty(pReportClass.arr_Pics) ? null : pReportClass.arr_Pics.Split(',').ToArray();
			string[] str_arr_PicsLocations = string.IsNullOrEmpty(pReportClass.arr_Pics) ? null : pReportClass.arr_PicsLocations.Split(',').ToArray();

			ReportMainClassController objReportMainClass = new ReportMainClassController();

            WebReport webReport = new WebReport();
            string report_path = "";
            report_path = Path.Combine(HttpRuntime.AppDomainAppPath, "Reports\\" + pReportClass.pReportName + ".frx");

            webReport.Report.Load(report_path);
            //HEMIDA
            for (int i = 0; i < webReport.Report.Dictionary.Connections.Count; i++)
            {
                webReport.Report.Dictionary.Connections[i].ConnectionString = ConfigurationManager.ConnectionStrings["ConnectionString"].ToString();
                webReport.Report.Dictionary.Connections[i].CommandTimeout = 0;
            }


            webReport.Report.SetParameterValue("query", pReportClass.query);
            for (int i = 0; i < str_arr_Keys.Length; i++)
            {
                if (str_arr_Values[i].Length >= 1)
                {
                    str_arr_Values[i] = str_arr_Values[i];
                }
                else
                {
                    str_arr_Values[i] = str_arr_Values[i];
                }
                webReport.Report.SetParameterValue(str_arr_Keys[i].ToString(), str_arr_Values[i].ToString());
            }
			if (str_arr_Pics?.Length > 0 && str_arr_PicsLocations?.Length > 0)
			{
				for (int i = 0; i < str_arr_Pics.Length; i++)
				{
					if (!string.IsNullOrEmpty(str_arr_Pics[i]) && !string.IsNullOrEmpty(str_arr_PicsLocations[i]))
					{
						var pic = (webReport.Report.FindObject(str_arr_Pics[i]) as FastReport.PictureObject);
						if (pic != null)
							pic.ImageLocation = str_arr_PicsLocations[i];
					}
				}
			}

			webReport.Width = 1250;
            webReport.Height = 800;
            webReport.Zoom = 1;
            webReport.Prepare();
            var html = webReport.GetHtml();
            ViewBag.WebReport = webReport;
            ViewBag.ReportTitle = pReportClass.pTitle;

			if (pReportClass.pReportType == "Excel")
			{
				webReport.UnlimitedHeight = true;
				webReport.ExportExcel2007();
			}

            return View("~/Views/ReportMainClass/ReportMainClass.cshtml", ViewBag.WebReport);
        }

        [System.Web.Http.HttpPost, System.Web.Http.HttpGet]
        public MemoryStream PrintReportForEmailAttachment(ReportClass pReportClass)
        {
            JavaScriptSerializer jsonSerialiser = new JavaScriptSerializer();

            string[] str_arr_Keys = pReportClass.arr_Keys.Split(',').ToArray();
            string[] str_arr_Values = pReportClass.arr_Values.Split(',').ToArray();

            ReportMainClassController objReportMainClass = new ReportMainClassController();

            WebReport webReport = new WebReport();
            string report_path = "";
            report_path = Path.Combine(HttpRuntime.AppDomainAppPath, "Reports\\" + pReportClass.pReportName + ".frx");

            webReport.Report.Load(report_path);
            //HEMIDA
            for (int i = 0; i < webReport.Report.Dictionary.Connections.Count; i++)
            {
                webReport.Report.Dictionary.Connections[i].ConnectionString = ConfigurationManager.ConnectionStrings["ConnectionString"].ToString();
                webReport.Report.Dictionary.Connections[i].CommandTimeout = 0;
            }

            for (int i = 0; i < str_arr_Keys.Length; i++)
            {
                if (str_arr_Values[i].Length >= 1)
                {
                    str_arr_Values[i] = str_arr_Values[i];
                }
                else
                {
                    str_arr_Values[i] = str_arr_Values[i];
                }
                webReport.Report.SetParameterValue(str_arr_Keys[i].ToString(), str_arr_Values[i].ToString());
            }
            webReport.Width = 1250;
            webReport.Height = 800;
            webReport.Zoom = 1;
            webReport.Prepare();
            var html = webReport.GetHtml();
            ViewBag.WebReport = webReport;
            ViewBag.ReportTitle = pReportClass.pTitle;
            webReport.Report.Prepare();
            MemoryStream stream = new MemoryStream();
            webReport.Report.Export(new PDFExport(), stream);
            stream.Position = 0;
            return stream;
        }
        //[System.Web.Http.HttpPost, System.Web.Http.HttpGet]
        //public ActionResult TEST_PrintReportFromJSON([FromBody] ReportClass pReportClass)
        //{

        //    JavaScriptSerializer jsonSerialiser = new JavaScriptSerializer();

        //    string[] str_arr_Keys = pReportClass.arr_Keys.Split(',').ToArray();
        //    string[] str_arr_Values = pReportClass.arr_Values.Split(',').ToArray();
        //    ReportMainClassController objReportMainClass = new ReportMainClassController();

        //    WebReport webReport = new WebReport();
        //    string report_path = "";
        //    report_path = Path.Combine(HttpRuntime.AppDomainAppPath, "Reports\\" + pReportClass.pReportName + ".frx");

        //    webReport.Report.Load(report_path);
        //    webReport.Report.Dictionary.Connections[0].ConnectionString = ConfigurationManager.ConnectionStrings["ConnectionString"].ToString();

        //    for (int i = 0; i < str_arr_Keys.Length; i++)
        //    {
        //        if (str_arr_Values[i].Length >= 1)
        //        {
        //            str_arr_Values[i] = str_arr_Values[i];
        //        }
        //        else
        //        {
        //            str_arr_Values[i] = str_arr_Values[i];
        //        }
        //        webReport.Report.SetParameterValue(str_arr_Keys[i].ToString(), str_arr_Values[i].ToString());
        //    }

        //    webReport.Width = 1250;
        //    webReport.Height = 800;
        //    webReport.Zoom = 1;






        //    //-----------------
        //    List<Product> Products = new List<Product>();

        //    Products.Add( new Product() { UnitPrice = 50 , Name = "Item1" });
        //    Products.Add(new Product() { UnitPrice = 14, Name = "Item2" });
        //    Products.Add(new Product() { UnitPrice = 1211, Name = "Item3" });
        //    Products.Add(new Product() { UnitPrice = 4550, Name = "Item4" });
        //    Products.Add(new Product() { UnitPrice = 433, Name = "Item5" });
        //    Products.Add(new Product() { UnitPrice = 344450, Name = "Item6" });
        //    webReport.RegisterData(Products, "Products");

        //    webReport.Prepare();

        //    ViewBag.WebReport = webReport;
        //    ViewBag.ReportTitle = pReportClass.pTitle;
        //    return View("~/Views/ReportMainClass/ReportMainClass.cshtml", ViewBag.WebReport);
        //}


        [System.Web.Http.HttpGet]
        public string PrintMultipleInvoicesLatt([FromBody] LattReportClass pLattReportClass)
        {
            FastReport.Utils.Config.WebMode = true;
            Report rep = new Report();
            string path = Path.Combine(HttpRuntime.AppDomainAppPath, "Reports\\" + "Rep_LATT_Invoice" + ".frx");
            rep.Load(path);
            //HEMIDA
            for (int i = 0; i < rep.Dictionary.Connections.Count; i++)
            {
               rep.Dictionary.Connections[i].ConnectionString = ConfigurationManager.ConnectionStrings["ConnectionString"].ToString();
                rep.Dictionary.Connections[i].CommandTimeout = 0;
            }
            bool hasData = false;


            foreach (var invoiceID in pLattReportClass.pInvoiceIDs.Split(',').ToArray())
            {
                rep.SetParameterValue("id", invoiceID);
                rep.SetParameterValue("header", pLattReportClass.pLogoPath);
                rep.SetParameterValue("printuser", pLattReportClass.pUserName);

                if (rep.Report.Prepare(true))
                {
                    hasData = true;
                } else
                {
                    return null;
                }
            }
            if (!hasData)
            {
                return null;
            }

            using (MemoryStream mainStream = new MemoryStream())
            {
                PDFExport pdfExport = new PDFExport();
                pdfExport.ShowProgress = false;
                pdfExport.Subject = "Invoices";
                pdfExport.Title = "Invoices";

                rep.Report.Export(pdfExport, mainStream);
                pdfExport.Dispose();
                rep.Dispose();

                return Convert.ToBase64String(mainStream.ToArray());
            }
        }
        /*
        [System.Web.Http.HttpPost]
        public bool EmailFastReportFile([FromBody] EmailFastReportFileClass pEmailFastReportFileClass)
        {
            Report rep = new Report();
            PDFExport pdfExport = new PDFExport();
            if(pEmailFastReportFileClass.pReportName == "")
            {
                throw new Exception();
            }

            try
            {
                FastReport.Utils.Config.WebMode = true;
                string path = Path.Combine(HttpRuntime.AppDomainAppPath, "Reports\\" + pEmailFastReportFileClass.pReportName + ".frx");
                rep.Load(path);
                rep.Dictionary.Connections[0].ConnectionString = ConfigurationManager.ConnectionStrings["ConnectionString"].ToString();
                rep.Dictionary.Connections[0].CommandTimeout = 90;
                bool hasData = false;

                string[] str_arr_Keys = pEmailFastReportFileClass.arr_Keys.Split(',').ToArray();
                string[] str_arr_Values = pEmailFastReportFileClass.arr_Values.Split(',').ToArray();

                string[] _ArrReceiverEmails = pEmailFastReportFileClass.pEmail_To.Split(',');

                for (int i = 0; i < str_arr_Keys.Length; i++)
                {
                    if (str_arr_Values[i].Length >= 1)
                    {
                        str_arr_Values[i] = str_arr_Values[i];
                    }
                    else
                    {
                        str_arr_Values[i] = str_arr_Values[i];
                    }
                    rep.SetParameterValue(str_arr_Keys[i].ToString(), str_arr_Values[i].ToString());
                }

                if (rep.Report.Prepare(true))
                {
                    hasData = true;
                }
                else
                {
                    throw new Exception();
                }

                if (!hasData || _ArrReceiverEmails.Length == 0)
                {
                    throw new Exception();
                }

                using (MemoryStream mainStream = new MemoryStream())
                {
                    pdfExport.ShowProgress = false;
                    pdfExport.Subject = pEmailFastReportFileClass.pTitle;
                    pdfExport.Title = pEmailFastReportFileClass.pTitle;

                    rep.Report.Export(pdfExport, mainStream);
                    mainStream.Position = 0;


                    CDefaults objCDefaults = new CDefaults();
                    Exception checkException = objCDefaults.GetListPaging(999999, 1, "WHERE 1=1", "ID", out _);
                    if(checkException != null)
                    {
                        throw checkException;
                    }

                    var mail = new System.Net.Mail.MailMessage();
                    mail.Attachments.Add(new Attachment(mainStream, pEmailFastReportFileClass.pTitle, "application/pdf"));
                    System.Net.ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;
                    SmtpClient Client = new SmtpClient(objCDefaults.lstCVarDefaults[0].Email_Host, objCDefaults.lstCVarDefaults[0].Email_Port);
                    Client.UseDefaultCredentials = true;

                    if (objCDefaults.lstCVarDefaults[0].UnEditableCompanyName == "ELI")
                    {
                        Client.Credentials = new System.Net.NetworkCredential("apikey", CEncryptDecrypt.Decrypt(objCDefaults.lstCVarDefaults[0].Email_Password, true));
                        mail.CC.Add(new MailAddress("customersupport@elite-log.com"));
                        mail.CC.Add(new MailAddress("mostafa.hanafy@elite-log.com"));
                        mail.CC.Add(new MailAddress("kareem.hassan@elite-log.com"));
                        mail.CC.Add(new MailAddress("operations@elite-log.com"));
                    }
                    else
                    {
                        Client.Credentials = new System.Net.NetworkCredential(objCDefaults.lstCVarDefaults[0].Email, CEncryptDecrypt.Decrypt(objCDefaults.lstCVarDefaults[0].Email_Password, true));
                    }

                    mail.From = new MailAddress(objCDefaults.lstCVarDefaults[0].Email, objCDefaults.lstCVarDefaults[0].Email_DisplayName);
                    for (int i = 0; i < _ArrReceiverEmails.Length; i++)
                        mail.To.Add(new MailAddress(_ArrReceiverEmails[i]));// put to address here
                    mail.Subject = pEmailFastReportFileClass.pTitle;  // put subject here  
                    mail.Body = pEmailFastReportFileClass.pBody;
                    mail.IsBodyHtml = true;

                    Client.EnableSsl = objCDefaults.lstCVarDefaults[0].Email_IsSSL;
                    Client.Send(mail);


                }

                return true;
            } catch (Exception e)
            {
                return false;
            }
            finally
            {
                pdfExport.Dispose();
                rep.Dispose();
            }
        }*/


    }

    //public class Product
    //{

    //    public string Name { get; set; }
    //    public int UnitPrice { get; set; }
    //}

    //public class Category
    //{
    //    public string Name { get; set; }
    //    public string Description { get; set; }
    //    public List<Product> Products { get; set; }
    //}

    public class LattReportClass
    {
        public string pInvoiceIDs { get; set; }
        public string pLogoPath { get; set; }
        public string pUserName { get; set; }
    }
    public class EmailFastReportFileClass
    {
        public string arr_Keys { get; set; } = "";
        public string arr_Values { get; set; } = "";
        public string pReportName { get; set; } = "";
        public string pTitle { get; set; } = "Attachment";
        public string pBody { get; set; } = "";
        public string pEmail_To { get; set; } = "";

    }

    public class ReportClass
    {
        public string arr_Keys { get; set; }
        public string arr_Values { get; set; }
		public string arr_Pics { get; set; }
		public string arr_PicsLocations { get; set; }
		public String pTitle { get; set; }
        public String pReportName { get; set; }
    }
    public class ReportWithParams : ReportClass
    {
        public string query { get; set; }
        public String pReportType { get; set; }
    }

    public class ReportWithQuery : ReportClass
    {
        public string query { get; set; }
        public string query2 { get; set; }
        public string pReportType { get; set; } = "";
    }
}


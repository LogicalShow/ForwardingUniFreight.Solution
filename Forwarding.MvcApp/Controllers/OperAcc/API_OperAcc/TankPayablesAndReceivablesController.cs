using Forwarding.MvcApp.Models.MasterData.Invoicing.Generated;
using Forwarding.MvcApp.Models.Operations.Operations.Generated;
using System;
using System.Linq;
using System.Web.Http;
using System.Web.Script.Serialization;
using Forwarding.MvcApp.Models.MasterData.Others.Generated;
using System.Data;
using System.IO;
using System.Web;
using System.Data.OleDb;
using ExcelDataReader;
using WebMatrix.WebData;
using Forwarding.MvcApp.Models.Administration.Settings.Generated;
using Forwarding.MvcApp.Models.MasterData.Partners.Generated;
using System.Globalization;

namespace Forwarding.MvcApp.Controllers.OperAcc.API_OperAcc
{
    public class TankPayablesAndReceivablesController : ApiController
    {
        //public object ExcelReaderFactory { get; private set; }

        [System.Web.Mvc.HttpGet, System.Web.Mvc.HttpPost]
        public object[] InsertListFromExcelTanks([FromBody] InsertListFromExcelTanks insertListFromExcelTanks)
        {
            bool _result = true;
            String TanksNotExist = "";
            Exception checkException = null;
            int _RowCount = 0;
            int _NumberOfRows = insertListFromExcelTanks.pTankNumber.Split(',').Length;
            COperationContainersAndPackages objCOperationContainersAndPackages = new COperationContainersAndPackages();
            CContainerTypes objCContainerTypes = new CContainerTypes();
            CvwOperationContainersAndPackages objCvwOperationContainersAndPackages = new CvwOperationContainersAndPackages();
            //var _ArrContainerNumber = insertListFromExcelTanks.pContainerNumberList.Split(',');

            CChargeTypes objCChargeTypes = new CChargeTypes();
            objCChargeTypes.GetList(" Where IsTank = 1");

            var _TankNumber = insertListFromExcelTanks.pTankNumber.Split(',');
            var _Operator = insertListFromExcelTanks.pOperator.Split(',');
            var Cost1 = insertListFromExcelTanks.Cost1.Split(',');
            var Revenue1 = insertListFromExcelTanks.Revenue1.Split(',');
            var Date1 = insertListFromExcelTanks.Date1.Split(',');
            var Notes1 = insertListFromExcelTanks.Notes1.Split(',');
            var Cost2 = insertListFromExcelTanks.Cost2.Split(',');
            var Revenue2 = insertListFromExcelTanks.Revenue2.Split(',');
            var Date2 = insertListFromExcelTanks.Date2.Split(',');
            var Notes2 = insertListFromExcelTanks.Notes2.Split(',');
            var Cost3 = insertListFromExcelTanks.Cost3.Split(',');
            var Revenue3 = insertListFromExcelTanks.Revenue3.Split(',');
            var Date3 = insertListFromExcelTanks.Date3.Split(',');
            var Notes3 = insertListFromExcelTanks.Notes3.Split(',');
            var Cost4 = insertListFromExcelTanks.Cost4.Split(',');
            var Revenue4 = insertListFromExcelTanks.Revenue4.Split(',');
            var Date4 = insertListFromExcelTanks.Date4.Split(',');
            var Notes4 = insertListFromExcelTanks.Notes4.Split(',');
            var Cost5 = insertListFromExcelTanks.Cost5.Split(',');
            var Revenue5 = insertListFromExcelTanks.Revenue5.Split(',');
            var Date5 = insertListFromExcelTanks.Date5.Split(',');
            var Notes5 = insertListFromExcelTanks.Notes5.Split(',');
            var Cost6 = insertListFromExcelTanks.Cost6.Split(',');
            var Revenue6 = insertListFromExcelTanks.Revenue6.Split(',');
            var Date6 = insertListFromExcelTanks.Date6.Split(',');
            var Notes6 = insertListFromExcelTanks.Notes6.Split(',');
            var Cost7 = insertListFromExcelTanks.Cost7.Split(',');
            var Revenue7 = insertListFromExcelTanks.Revenue7.Split(',');
            var Date7 = insertListFromExcelTanks.Date7.Split(',');
            var Notes7 = insertListFromExcelTanks.Notes7.Split(',');
            var Cost8 = insertListFromExcelTanks.Cost8.Split(',');
            var Revenue8 = insertListFromExcelTanks.Revenue8.Split(',');
            var Date8 = insertListFromExcelTanks.Date8.Split(',');
            var Notes8 = insertListFromExcelTanks.Notes8.Split(',');
            var Cost9 = insertListFromExcelTanks.Cost9.Split(',');
            var Revenue9 = insertListFromExcelTanks.Revenue9.Split(',');
            var Date9 = insertListFromExcelTanks.Date9.Split(',');
            var Notes9 = insertListFromExcelTanks.Notes9.Split(',');
            var Cost10 = insertListFromExcelTanks.Cost10.Split(',');
            var Revenue10 = insertListFromExcelTanks.Revenue10.Split(',');
            var Date10 = insertListFromExcelTanks.Date10.Split(',');
            var Notes10 = insertListFromExcelTanks.Notes10.Split(',');
            var Cost11 = insertListFromExcelTanks.Cost11.Split(',');
            var Revenue11 = insertListFromExcelTanks.Revenue11.Split(',');
            var Date11 = insertListFromExcelTanks.Date11.Split(',');
            var Notes11 = insertListFromExcelTanks.Notes11.Split(',');
            var Cost12 = insertListFromExcelTanks.Cost12.Split(',');
            var Revenue12 = insertListFromExcelTanks.Revenue12.Split(',');
            var Date12 = insertListFromExcelTanks.Date12.Split(',');
            var Notes12 = insertListFromExcelTanks.Notes12.Split(',');
            var Cost13 = insertListFromExcelTanks.Cost13.Split(',');
            var Revenue13 = insertListFromExcelTanks.Revenue13.Split(',');
            var Date13 = insertListFromExcelTanks.Date13.Split(',');
            var Notes13 = insertListFromExcelTanks.Notes13.Split(',');
            var Cost14 = insertListFromExcelTanks.Cost14.Split(',');
            var Revenue14 = insertListFromExcelTanks.Revenue14.Split(',');
            var Date14 = insertListFromExcelTanks.Date14.Split(',');
            var Notes14 = insertListFromExcelTanks.Notes14.Split(',');
            var Cost15 = insertListFromExcelTanks.Cost15.Split(',');
            var Revenue15 = insertListFromExcelTanks.Revenue15.Split(',');
            var Date15 = insertListFromExcelTanks.Date15.Split(',');
            var Notes15 = insertListFromExcelTanks.Notes15.Split(',');
            var Cost16 = insertListFromExcelTanks.Cost16.Split(',');
            var Revenue16 = insertListFromExcelTanks.Revenue16.Split(',');
            var Date16 = insertListFromExcelTanks.Date16.Split(',');
            var Notes16 = insertListFromExcelTanks.Notes16.Split(',');
            var Cost17 = insertListFromExcelTanks.Cost17.Split(',');
            var Revenue17 = insertListFromExcelTanks.Revenue17.Split(',');
            var Date17 = insertListFromExcelTanks.Date17.Split(',');
            var Notes17 = insertListFromExcelTanks.Notes17.Split(',');
            var Cost18 = insertListFromExcelTanks.Cost18.Split(',');
            var Revenue18 = insertListFromExcelTanks.Revenue18.Split(',');
            var Date18 = insertListFromExcelTanks.Date18.Split(',');
            var Notes18 = insertListFromExcelTanks.Notes18.Split(',');

            var _ColumnNames = insertListFromExcelTanks.ColumnNames.Split(',');
            objCContainerTypes.GetList("ORDER BY Code");
            int _ContainerTypeID = objCContainerTypes.lstCVarContainerTypes[0].ID;


            for (int i = 0; i < _NumberOfRows - 1; i++)
            {
                try
                {
                    COperationContainersAndPackages ExistobjCOperationContainersAndPackages = new COperationContainersAndPackages();
                    CVarOperationContainersAndPackages ExistobjCVarOperationContainersAndPackages = new CVarOperationContainersAndPackages(); ;
                    ExistobjCOperationContainersAndPackages.GetList(" Where TankOrFlexiNumber = '" + _TankNumber[i].ToString().Trim() + "' ");
                    int LenOperations = ExistobjCOperationContainersAndPackages.lstCVarOperationContainersAndPackages.Count;
                    if (LenOperations > 0)
                    {

                        Int64 OperationID = ExistobjCOperationContainersAndPackages.lstCVarOperationContainersAndPackages[0].OperationID;
                        #region HANDLING IN AT EDS 
                        for (int cnt = 0; cnt < 4; cnt++)
                        {
                            var chargeTypes1 = _ColumnNames[2];
                            var chargeTypes2 = _ColumnNames[6];
                            var chargeTypes3 = _ColumnNames[10];
                            var chargeTypes4 = _ColumnNames[14];
                            var chargeTypes5 = _ColumnNames[18];
                            var chargeTypes6 = _ColumnNames[22];
                            var chargeTypes7 = _ColumnNames[26];
                            var chargeTypes8 = _ColumnNames[30];
                            var chargeTypes9 = _ColumnNames[34];
                            var chargeTypes10 = _ColumnNames[38];
                            var chargeTypes11 = _ColumnNames[42];
                            var chargeTypes12 = _ColumnNames[46];
                            var chargeTypes13 = _ColumnNames[50];
                            var chargeTypes14 = _ColumnNames[54];
                            var chargeTypes15 = _ColumnNames[58];
                            var chargeTypes16 = _ColumnNames[62];
                            var chargeTypes17 = _ColumnNames[66];
                            var chargeTypes18 = _ColumnNames[70];

                            var chargeType = "chargeType" + (cnt + 1);
                            objCChargeTypes.GetList(" Where IsTank=1 and Name Like '%" + chargeType + "%'");
                            var ExistsChargeTypes = objCChargeTypes.lstCVarChargeTypes.Count;
                            if (ExistsChargeTypes > 0)
                            {
                                var _Cost = "Cost" + cnt;
                                var _Revenue = "Revenue" + cnt;
                                var _Date = "Date" + cnt;
                                var _Notes = "Notes" + cnt;
                                CPayables objCPayables = new CPayables();
                                CVarPayables objCVarPayables = new CVarPayables();
                                objCVarPayables.ID = 0;
                                objCVarPayables.OperationID = OperationID;
                                objCVarPayables.Quantity = 1;
                                objCVarPayables.CostAmount =decimal.Round( Convert.ToDecimal(_Cost[i]) ,2,MidpointRounding.AwayFromZero);
                                objCVarPayables.CostPrice = decimal.Round(Convert.ToDecimal(_Cost[i]), 2, MidpointRounding.AwayFromZero);
                                objCVarPayables.Notes = _Notes[i].ToString();
                                objCVarPayables.IssueDate = Convert.ToDateTime(ConvertToDateTime(_Date[i].ToString()));
                                objCVarPayables.EntryDate = DateTime.Now;
                                objCVarPayables.CreationDate = DateTime.Now;
                                objCVarPayables.ModificationDate = DateTime.Now;
                                int NotesLength = objCVarPayables.Notes.Length;
                                objCVarPayables.SupplierInvoiceNo = _Notes[i].ToString().Substring(0, Math.Min(NotesLength, 20)); //"0";
                                objCVarPayables.SupplierReceiptNo = "0";
                                objCVarPayables.IsOfficial = false;
                                objCVarPayables.IsQuotationApproval = false;
                                objCVarPayables.ApprovePendingValue = 0;
                                objCVarPayables.crmCode = "";
                                objCVarPayables.IsPurchased = false;
                                objCPayables.lstCVarPayables.Add(objCVarPayables);
                                checkException = objCPayables.SaveMethod(objCPayables.lstCVarPayables);
                                if (checkException == null)
                                {
                                    CReceivables objCReceivables = new CReceivables();
                                    CVarReceivables objCVarReceivables = new CVarReceivables();
                                    objCVarReceivables.ID = 0;
                                    objCVarReceivables.OperationID = OperationID;
                                    objCVarReceivables.Quantity = 1;
                                    objCVarReceivables.SaleAmount = Convert.ToDecimal(_Revenue[i]);
                                    objCVarReceivables.SalePrice = Convert.ToDecimal(_Revenue[i]);
                                    objCVarReceivables.Notes = _Notes[i].ToString();
                                    objCVarReceivables.IssueDate = Convert.ToDateTime(ConvertToDateTime(_Date[i].ToString()));

                                    objCVarReceivables.PreviousCutOffDate = DateTime.Parse("01/01/1900");
                                    objCVarReceivables.CutOffDate = DateTime.Parse("01/01/1900");
                                    objCVarReceivables.ReceiptDate = DateTime.Parse("01/01/1900");
                                    objCVarReceivables.ReceiptNo = "";
                                    objCVarReceivables.TariffID = 0;
                                    objCVarReceivables.CostCenterId = 0;
                                    objCVarReceivables.IsOfficial = false;
                                    objCVarReceivables.crmCode = "";

                                    objCVarReceivables.PreviousCutOffDate = DateTime.Parse("01/01/1900");

                                    objCVarReceivables.CreationDate = DateTime.Now;
                                    objCVarReceivables.ModificationDate = DateTime.Now;
                                    objCVarReceivables.ManualChargeType = "0";
                                    //objCVarPayables.SupplierInvoiceNo = "0"; //Commented by sherif
                                    //objCVarPayables.SupplierReceiptNo = "0"; //Commented by sherif
                                    objCReceivables.lstCVarReceivables.Add(objCVarReceivables);
                                    checkException = objCReceivables.SaveMethod(objCReceivables.lstCVarReceivables);
                                }
                            }

                        }

                        #endregion

                        //#region CLEANING AT EDS
                        //objCPayables = new CPayables();
                        //objCVarPayables = new CVarPayables();
                        //objCVarPayables.ID = 0;
                        //objCVarPayables.OperationID = OperationID;
                        //objCVarPayables.Quantity = 1;
                        //objCVarPayables.CostAmount = Convert.ToDecimal(_CLEANINGATEDSCost[i]);
                        //objCVarPayables.CostPrice = Convert.ToDecimal(_CLEANINGATEDSCost[i]);
                        //objCVarPayables.Notes = _CLEANINGATEDSNotes[i];
                        //objCVarPayables.IssueDate = Convert.ToDateTime(ConvertToDateTime(_CLEANINGATEDSDate[i]));
                        //objCVarPayables.EntryDate = DateTime.Now;
                        //objCVarPayables.CreationDate = DateTime.Now;
                        //objCVarPayables.ModificationDate = DateTime.Now;
                        //objCVarPayables.SupplierInvoiceNo = "0";
                        //objCVarPayables.SupplierReceiptNo = "0";
                        //objCPayables.lstCVarPayables.Add(objCVarPayables);
                        //checkException = objCPayables.SaveMethod(objCPayables.lstCVarPayables);
                        //if (checkException == null)
                        //{
                        //    CReceivables objCReceivables = new CReceivables();
                        //    CVarReceivables objCVarReceivables = new CVarReceivables();
                        //    objCVarReceivables.ID = 0;
                        //    objCVarReceivables.OperationID = OperationID;
                        //    objCVarReceivables.Quantity = 1;
                        //    objCVarReceivables.SaleAmount = Convert.ToDecimal(_CLEANINGATEDSRevenue[i]);
                        //    objCVarReceivables.SalePrice = Convert.ToDecimal(_CLEANINGATEDSRevenue[i]);
                        //    objCVarReceivables.Notes = _CLEANINGATEDSNotes[i];
                        //    objCVarReceivables.IssueDate = Convert.ToDateTime(ConvertToDateTime(_CLEANINGATEDSDate[i]));
                        //    objCVarReceivables.CreationDate = DateTime.Now;
                        //    objCVarReceivables.ModificationDate = DateTime.Now;
                        //    objCVarPayables.SupplierInvoiceNo = "0";
                        //    objCVarPayables.SupplierReceiptNo = "0";
                        //    objCReceivables.lstCVarReceivables.Add(objCVarReceivables);
                        //    checkException = objCReceivables.SaveMethod(objCReceivables.lstCVarReceivables);
                        //}
                        //#endregion

                        //#region M&R AT EDS 1
                        //objCPayables = new CPayables();
                        //objCVarPayables = new CVarPayables();
                        //objCVarPayables.ID = 0;
                        //objCVarPayables.OperationID = OperationID;
                        //objCVarPayables.Quantity = 1;
                        //objCVarPayables.CostAmount = Convert.ToDecimal(_M_R_ATEDS1Cost[i]);
                        //objCVarPayables.CostPrice = Convert.ToDecimal(_M_R_ATEDS1Cost[i]);
                        //objCVarPayables.Notes = _M_R_ATEDS1Notes[i];
                        //objCVarPayables.IssueDate = Convert.ToDateTime(ConvertToDateTime(_M_R_ATEDS1Date[i]));
                        //objCVarPayables.EntryDate = DateTime.Now;
                        //objCVarPayables.CreationDate = DateTime.Now;
                        //objCVarPayables.ModificationDate = DateTime.Now;
                        //objCVarPayables.SupplierInvoiceNo = "0";
                        //objCVarPayables.SupplierReceiptNo = "0";
                        //objCPayables.lstCVarPayables.Add(objCVarPayables);
                        //checkException = objCPayables.SaveMethod(objCPayables.lstCVarPayables);
                        //if (checkException == null)
                        //{
                        //    CReceivables objCReceivables = new CReceivables();
                        //    CVarReceivables objCVarReceivables = new CVarReceivables();
                        //    objCVarReceivables.ID = 0;
                        //    objCVarReceivables.OperationID = OperationID;
                        //    objCVarReceivables.Quantity = 1;
                        //    objCVarReceivables.SaleAmount = Convert.ToDecimal(_M_R_ATEDS1Revenue[i]);
                        //    objCVarReceivables.SalePrice = Convert.ToDecimal(_M_R_ATEDS1Revenue[i]);
                        //    objCVarReceivables.Notes = _M_R_ATEDS1Notes[i];
                        //    objCVarReceivables.IssueDate = Convert.ToDateTime(ConvertToDateTime(_M_R_ATEDS1Date[i]));
                        //    objCVarReceivables.CreationDate = DateTime.Now;
                        //    objCVarReceivables.ModificationDate = DateTime.Now;
                        //    objCVarPayables.SupplierInvoiceNo = "0";
                        //    objCVarPayables.SupplierReceiptNo = "0";
                        //    objCReceivables.lstCVarReceivables.Add(objCVarReceivables);
                        //    checkException = objCReceivables.SaveMethod(objCReceivables.lstCVarReceivables);
                        //}
                        //#endregion

                        //#region Storage AT EDS
                        //objCPayables = new CPayables();
                        //objCVarPayables = new CVarPayables();
                        //objCVarPayables.ID = 0;
                        //objCVarPayables.OperationID = OperationID;
                        //objCVarPayables.Quantity = 1;
                        //objCVarPayables.CostAmount = Convert.ToDecimal(_StorageATEDSCost[i]);
                        //objCVarPayables.CostPrice = Convert.ToDecimal(_StorageATEDSCost[i]);
                        //objCVarPayables.Notes = _StorageATEDSNotes[i];
                        //objCVarPayables.IssueDate = Convert.ToDateTime(ConvertToDateTime(_StorageATEDSDate[i]));
                        //objCVarPayables.EntryDate = DateTime.Now;
                        //objCVarPayables.CreationDate = DateTime.Now;
                        //objCVarPayables.ModificationDate = DateTime.Now;
                        //objCVarPayables.SupplierInvoiceNo = "0";
                        //objCVarPayables.SupplierReceiptNo = "0";
                        //objCPayables.lstCVarPayables.Add(objCVarPayables);
                        //checkException = objCPayables.SaveMethod(objCPayables.lstCVarPayables);
                        //if (checkException == null)
                        //{
                        //    CReceivables objCReceivables = new CReceivables();
                        //    CVarReceivables objCVarReceivables = new CVarReceivables();
                        //    objCVarReceivables.ID = 0;
                        //    objCVarReceivables.OperationID = OperationID;
                        //    objCVarReceivables.Quantity = 1;
                        //    objCVarReceivables.SaleAmount = Convert.ToDecimal(_StorageATEDSRevenue[i]);
                        //    objCVarReceivables.SalePrice = Convert.ToDecimal(_StorageATEDSRevenue[i]);
                        //    objCVarReceivables.Notes = _StorageATEDSNotes[i];
                        //    objCVarReceivables.IssueDate = Convert.ToDateTime(ConvertToDateTime(_StorageATEDSDate[i]));
                        //    //objCVarReceivables.EntryDate = DateTime.Now;
                        //    objCVarReceivables.CreationDate = DateTime.Now;
                        //    objCVarReceivables.ModificationDate = DateTime.Now;
                        //    objCVarPayables.SupplierInvoiceNo = "0";
                        //    objCVarPayables.SupplierReceiptNo = "0";
                        //    objCReceivables.lstCVarReceivables.Add(objCVarReceivables);
                        //    checkException = objCReceivables.SaveMethod(objCReceivables.lstCVarReceivables);
                        //}
                        //#endregion

                    }
                    else
                    {
                        TanksNotExist += _TankNumber[i] + " , ";
                    }
                }
                catch(Exception ex)
                { }
            }

            //checkException = objCOperationContainersAndPackages.SaveMethod(objCOperationContainersAndPackages.lstCVarOperationContainersAndPackages);
            //if (checkException != null)
            //{
            //    _result = false;
            //}
            //else
            //    checkException = objCvwOperationContainersAndPackages.GetListPaging(999999, 1, "WHERE OperationID=" + insertListFromExcelTanks.pOperationID, "ID", out _RowCount);
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                _result
                , _result ? serializer.Serialize(objCvwOperationContainersAndPackages.lstCVarvwOperationContainersAndPackages) : null
                , TanksNotExist
            };
        }
        public string ConvertToDateTime(string DT)
        {
            DT = DT.Split('/')[1] + "/" + DT.Split('/')[0] + "/" + DT.Split('/')[2];
            return DT;
        }

        //[ActionName("Importexcel")]
        //[HttpPost]
        //public object[] Importexcel1()
        //{


        //    if (Request.Files["FileUpload1"].ContentLength > 0)
        //    {
        //        string extension = System.IO.Path.GetExtension(Request.Files["FileUpload1"].FileName).ToLower();
        //        string query = null;
        //        string connString = "";




        //        string[] validFileTypes = { ".xls", ".xlsx", ".csv" };

        //        string path1 = string.Format("{0}/{1}", Server.MapPath("~/Content/Uploads"), Request.Files["FileUpload1"].FileName);
        //        if (!Directory.Exists(path1))
        //        {
        //            Directory.CreateDirectory(Server.MapPath("~/Content/Uploads"));
        //        }
        //        if (validFileTypes.Contains(extension))
        //        {
        //            if (System.IO.File.Exists(path1))
        //            { System.IO.File.Delete(path1); }
        //            Request.Files["FileUpload1"].SaveAs(path1);
        //            if (extension == ".csv")
        //            {
        //                DataTable dt = ConvertCSVtoDataTable(path1);
        //                ViewBag.Data = dt;
        //            }
        //            //Connection String to Excel Workbook  
        //            else if (extension.Trim() == ".xls")
        //            {
        //                connString = "Provider=Microsoft.Jet.OLEDB.4.0;Data Source=" + path1 + ";Extended Properties=\"Excel 8.0;HDR=Yes;IMEX=2\"";
        //                DataTable dt = ConvertXSLXtoDataTable(path1, connString);
        //                ViewBag.Data = dt;
        //            }
        //            else if (extension.Trim() == ".xlsx")
        //            {
        //                connString = "Provider=Microsoft.ACE.OLEDB.12.0;Data Source=" + path1 + ";Extended Properties=\"Excel 12.0;HDR=Yes;IMEX=2\"";
        //                DataTable dt = ConvertXSLXtoDataTable(path1, connString);
        //                ViewBag.Data = dt;
        //            }

        //        }
        //        else
        //        {
        //            ViewBag.Error = "Please Upload Files in .xls, .xlsx or .csv format";

        //        }

        //    }

        //    return View();
        //}

        [HttpGet, HttpPost]
        public object[] UploadExcelFileData()
        {
            bool _result = true;
            String TanksNotExist = "";

            string ErrorChargeTypesInContainers = "";
            Exception checkException = null;
            int _RowCount = 0;
            //int _NumberOfRows = insertListFromExcelTanks.pTankNumber.Split(',').Length;
            COperationContainersAndPackages objCOperationContainersAndPackages = new COperationContainersAndPackages();
            CContainerTypes objCContainerTypes = new CContainerTypes();
            CvwOperationContainersAndPackages objCvwOperationContainersAndPackages = new CvwOperationContainersAndPackages();
            CChargeTypes objCChargeTypes = new CChargeTypes();
            objCChargeTypes.GetList(" Where IsTank = 1");

            CDefaults CurCDefaults = new CDefaults();
            CurCDefaults.GetListPaging(100, 1, " Where 1=1", " ID", out _RowCount);

            CCurrencies objCCurrencies = new CCurrencies();
            objCCurrencies.GetList(" Where Code like '%USD%'");

            string error = "";
            String fileName = "";
            var fileSavePath = "";
            Int32 ContCount = 0;

            if (HttpContext.Current.Request.Files.AllKeys.Any())
            {
                // Get the uploaded image from the Files collection
                var httpPostedFile = HttpContext.Current.Request.Files[0];
                //HttpPostedFileBase = HttpContext.Current.Request.Files[0];

                if (httpPostedFile != null)
                {
                    // Validate the uploaded image(optional)

                    // Get the complete file path
                    fileSavePath = Path.Combine(HttpContext.Current.Server.MapPath("~/App_Data/uploads"), httpPostedFile.FileName);

                    // Save the uploaded file to "UploadedFiles" folder
                    //httpPostedFile.SaveAs(fileSavePath);
                    httpPostedFile.SaveAs(System.IO.Path.Combine(HttpContext.Current.Server.MapPath("~/App_Data/uploads"), httpPostedFile.FileName));
                    string query = null;
                    string connString = "";

                    Stream stream = httpPostedFile.InputStream;
                    IExcelDataReader reader = null;
                    if (httpPostedFile.FileName.EndsWith(".xls"))
                    {
                        reader = ExcelReaderFactory.CreateBinaryReader(stream);
                    }
                    else if (httpPostedFile.FileName.EndsWith(".xlsx"))
                    {
                        reader = ExcelReaderFactory.CreateOpenXmlReader(stream);
                    }
                    else
                    {
                        ModelState.AddModelError("File", "This file format is not supported");

                    }

                    DataSet result = reader.AsDataSet();

                    DataRow dRow;
                    DataRow ColumnNames = result.Tables[0].Rows[0];
                    string chargeTypes1 = ColumnNames[2].ToString();
                    string chargeTypes2 = ColumnNames[6].ToString();
                    string chargeTypes3 = ColumnNames[10].ToString();
                    string chargeTypes4 = ColumnNames[14].ToString();
                    string chargeTypes5 = ColumnNames[18].ToString();
                    string chargeTypes6 = ColumnNames[22].ToString();
                    string chargeTypes7 = ColumnNames[26].ToString();
                    string chargeTypes8 = ColumnNames[30].ToString();
                    string chargeTypes9 = ColumnNames[34].ToString();
                    string chargeTypes10 = ColumnNames[38].ToString();
                    string chargeTypes11 = ColumnNames[42].ToString();
                    string chargeTypes12 = ColumnNames[46].ToString();
                    string chargeTypes13 = ColumnNames[51].ToString();
                    string chargeTypes14 = ColumnNames[56].ToString();
                    string chargeTypes15 = ColumnNames[61].ToString();
                    string chargeTypes16 = ColumnNames[66].ToString();
                    string chargeTypes17 = ColumnNames[71].ToString();

                    string chargeTypes18 = ColumnNames[75].ToString(); //Cleaning AT TCS
                    string chargeTypes19 = ColumnNames[79].ToString();
                    string chargeTypes20 = ColumnNames[83].ToString();
                    string chargeTypes21 = ColumnNames[87].ToString();
                    string chargeTypes22 = ColumnNames[91].ToString();
                    string chargeTypes23 = ColumnNames[95].ToString();
                    string chargeTypes24 = ColumnNames[99].ToString();

                    int[] CT_Cost = { 2, 6, 10, 14, 18, 22, 26, 30, 34, 38, 42, 46, 51, 56, 61, 66, 71/*next new charges*/, 75, 79, 83, 87, 91, 95, 99 };
                    int[] CT_Revenue = { 3, 7, 11, 15, 19, 23, 27, 31, 35, 39, 43, 47, 52, 57, 62, 67, 72/*next new charges*/, 76, 80, 84, 88, 92, 96, 100 };
                    int[] CT_Date = { 4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 53, 58, 63, 68, 73/*next new charges*/, 77, 81, 85, 89, 93, 97, 101 };
                    int[] CT_Notes = { 5, 9, 13, 17, 21, 25, 29, 33, 37, 41, 45, 49, 54, 59, 64, 69, 74/*next new charges*/, 78, 82, 86, 90, 94, 98, 102 };
                    String[] ChargeTypes = { chargeTypes1 , chargeTypes2, chargeTypes3, chargeTypes4, chargeTypes5, chargeTypes6
                    , chargeTypes7 , chargeTypes8 , chargeTypes9 , chargeTypes10 , chargeTypes11 , chargeTypes12 , chargeTypes13
                    , chargeTypes14 , chargeTypes15 , chargeTypes16 , chargeTypes17
                    /*next new charges*/
                    , chargeTypes18, chargeTypes19, chargeTypes20, chargeTypes21, chargeTypes22, chargeTypes23, chargeTypes24 };
                    Int32 numOfRows = result.Tables[0].Rows.Count;
                    int SupplierOperationPartnerID = 0;
                    int SupplierID = 0;
                    //2 6 10 14 18 22 26 30 34 38 42 46 51 56 61 66 71

                    var GlobalChargeType = "";
                    int CounterForExists = 0;
                    for (int i = 1; i < result.Tables[0].Rows.Count; i++)
                    {
                        SupplierID = 0;
                        var TankLength = result.Tables[0].Rows[i].ItemArray.GetValue(0).ToString().Trim().Length;
                        if (TankLength > 0)
                        {
                            dRow = result.Tables[0].Rows[i];
                            try
                            {
                                //dRow.ItemArray.GetValue(0).ToString();
                                //result.Tables[0].Rows[i]["Column2"].ToString();


                                //var _ColumnNames = insertListFromExcelTanks.ColumnNames.Split(',');
                                objCContainerTypes.GetList("ORDER BY Code");
                                int _ContainerTypeID = objCContainerTypes.lstCVarContainerTypes[0].ID;

                                CSuppliers objCSuppliers = new CSuppliers();
                                objCSuppliers.GetList(" Where Name LIKE '%"+ dRow.ItemArray.GetValue(/*75*/103).ToString().Trim() + "%'"); //99 is the supplier column order in the Excel
                                SupplierID = objCSuppliers.lstCVarSuppliers.Count > 0 ? objCSuppliers.lstCVarSuppliers[0].ID : 0;
                                //for (int i = 0; i < _NumberOfRows - 1; i++)
                                //{
                                COperationContainersAndPackages ExistobjCOperationContainersAndPackages = new COperationContainersAndPackages();
                                CVarOperationContainersAndPackages ExistobjCVarOperationContainersAndPackages = new CVarOperationContainersAndPackages();
                                //ExistobjCOperationContainersAndPackages.GetList(" Where TankOrFlexiNumber Like '%" + dRow.ItemArray.GetValue(0).ToString().Trim() + "%'");
                                ExistobjCOperationContainersAndPackages.GetListPaging(999999, 1, " Where TankOrFlexiNumber = '" + dRow.ItemArray.GetValue(0).ToString().Trim() + "'", " ID DESC ", out _RowCount);

                                int LenOperations = ExistobjCOperationContainersAndPackages.lstCVarOperationContainersAndPackages.Count;
                                if (LenOperations > 0)
                                {
                                    Int64 OperationID = ExistobjCOperationContainersAndPackages.lstCVarOperationContainersAndPackages[0].OperationID;
                                    Int64 GlobalOperationContainersAndPackagesID = ExistobjCOperationContainersAndPackages.lstCVarOperationContainersAndPackages[0].ID;
                                    #region HANDLING IN AT EDS 

                                    for (int cnt = 0; cnt < /*17*/24; cnt++)
                                    {
                                       
                                        //var chargeTypes18 = ColumnNames[70];

                                        string chargeType = "chargeTypes" + (cnt + 1);
                                        chargeType = ChargeTypes[cnt].Replace("Cost", "").Replace("Revenue", "").Replace("Date", "").Replace("Notes", "").Replace("Supplier", "").Trim();
                                        GlobalChargeType = chargeType;
                                        objCChargeTypes.GetList(" Where IsTank=1 and Name Like '" + chargeType + "'");
                                        var ExistsChargeTypes = objCChargeTypes.lstCVarChargeTypes.Count;
                                        if (ExistsChargeTypes > 0)
                                        {
                                            decimal pCost = 0;
                                            if (dRow.ItemArray.GetValue(CT_Cost[cnt]).ToString() != "")
                                                pCost = decimal.Round(Convert.ToDecimal(dRow.ItemArray.GetValue(CT_Cost[cnt]).ToString()), 2, MidpointRounding.AwayFromZero);

                                            CPayables CheckPayableIsExists = new CPayables();
                                            string ItemDateFromExcel = dRow.ItemArray.GetValue(CT_Date[cnt]).ToString().Split(' ')[0];
                                            if (ItemDateFromExcel != "" && GlobalOperationContainersAndPackagesID != 0)
                                                CheckPayableIsExists.GetListPaging(10000,1, " Where isnull(IsDeleted,0)=0 and  OperationID = " + OperationID 
                                                    +" And CostPrice= " + pCost
                                                    + " And ChargeTypeID = " + objCChargeTypes.lstCVarChargeTypes[0].ID + " AND  CONVERT(date, IssueDate) =  ' " + Forwarding.MvcApp.Helpers.DateFunctionsController.GetYYYYMMDDFormat(ItemDateFromExcel, 2)+ "' and  OperationContainersAndPackagesID = " + GlobalOperationContainersAndPackagesID + " AND SupplierInvoiceNo=N'" + dRow.ItemArray.GetValue(CT_Notes[cnt]).ToString() + "'", " ID" ,out _RowCount);
                                            if (CheckPayableIsExists.lstCVarPayables.Count == 0 && ItemDateFromExcel != "")
                                            {
                                                var _Cost = "Cost" + cnt;
                                                var _Revenue = "Revenue" + cnt;
                                                var _Date = "Date" + cnt;
                                                var _Notes = "Notes" + cnt;
                                                decimal GlobalExchangeRate = 0;
                                                Int64 GlobalPayableID = 0;
                                                if ((dRow.ItemArray.GetValue(CT_Date[cnt]).ToString()) == "" && (dRow.ItemArray.GetValue(CT_Notes[cnt]).ToString()) == "" && (dRow.ItemArray.GetValue(CT_Cost[cnt]).ToString()) == "" && (dRow.ItemArray.GetValue(CT_Revenue[cnt]).ToString()) == "")
                                                {

                                                }
                                                else
                                                {
                                                    COperationPartners COperationPartnersExists = new COperationPartners();
                                                    COperationPartnersExists.GetList(" Where OperationID = " + OperationID + " AND OperationPartnerTypeID = 12 AND SupplierID = " + SupplierID);
                                                    if (COperationPartnersExists.lstCVarOperationPartners.Count == 0)
                                                    {
                                                        CVarOperationPartners objCVarOperationPartners = new CVarOperationPartners();
                                                        COperationPartners objCOperationPartners = new COperationPartners();
                                                        if (SupplierID > 0)
                                                        {
                                                            objCVarOperationPartners.ID = 0;
                                                            objCVarOperationPartners.OperationID = OperationID;
                                                            objCVarOperationPartners.OperationPartnerTypeID = 12;
                                                            objCVarOperationPartners.SupplierID = SupplierID;
                                                            objCVarOperationPartners.CustomerID = 0;
                                                            objCVarOperationPartners.AgentID = 0;
                                                            objCVarOperationPartners.AirlineID = 0;
                                                            objCVarOperationPartners.ContactID = 0;
                                                            objCVarOperationPartners.CustodyID = 0;
                                                            objCVarOperationPartners.CustomsClearanceAgentID = 0;
                                                            objCVarOperationPartners.CreatorUserID = WebSecurity.CurrentUserId;
                                                            objCVarOperationPartners.CreationDate = DateTime.Now;
                                                            objCVarOperationPartners.ModificatorUserID = WebSecurity.CurrentUserId;
                                                            objCVarOperationPartners.ModificationDate = DateTime.Now;
                                                            objCOperationPartners.lstCVarOperationPartners.Add(objCVarOperationPartners);
                                                            checkException = objCOperationPartners.SaveMethod(objCOperationPartners.lstCVarOperationPartners);
                                                            if (checkException == null)
                                                                SupplierOperationPartnerID = Convert.ToInt32(objCVarOperationPartners.ID);
                                                        }


                                                    }
                                                    else
                                                    {
                                                        SupplierOperationPartnerID = Convert.ToInt32(COperationPartnersExists.lstCVarOperationPartners[0].ID);
                                                    }
                                                    //////////////////////////////////////////////////////////////
                                                    CVarOperationContainersAndPackages objCVarOperationContainersAndPackages = new CVarOperationContainersAndPackages();

                                                    if (checkException == null)
                                                    {
                                                        COperationContainersAndPackages NewOperationContainersAndPackages = new COperationContainersAndPackages();
                                                        if (GlobalOperationContainersAndPackagesID == 0)
                                                        {
                                                            objCVarOperationContainersAndPackages = ExistobjCOperationContainersAndPackages.lstCVarOperationContainersAndPackages[0];
                                                            objCVarOperationContainersAndPackages.ID = 0;
                                                            objCVarOperationContainersAndPackages.CreationDate = DateTime.Now;
                                                            objCVarOperationContainersAndPackages.CreatorUserID = WebSecurity.CurrentUserId;
                                                            objCVarOperationContainersAndPackages.ModificationDate = DateTime.Now;
                                                            objCVarOperationContainersAndPackages.ModificatorUserID = WebSecurity.CurrentUserId;
                                                            NewOperationContainersAndPackages.lstCVarOperationContainersAndPackages.Add(objCVarOperationContainersAndPackages);
                                                            checkException = NewOperationContainersAndPackages.SaveMethod(NewOperationContainersAndPackages.lstCVarOperationContainersAndPackages);
                                                            GlobalOperationContainersAndPackagesID = objCVarOperationContainersAndPackages.ID;
                                                        }

                                                    }
                                                    if (checkException == null)
                                                    {
                                                        GlobalPayableID = 0;
                                                        CPayables objCPayables = new CPayables();
                                                        CVarPayables objCVarPayables = new CVarPayables();
                                                        objCVarPayables.ID = 0;
                                                        objCVarPayables.OperationID = OperationID;
                                                        objCVarPayables.Quantity = 1;
                                                        objCVarPayables.CurrencyID = objCCurrencies.lstCVarCurrencies.Count > 0 ? objCCurrencies.lstCVarCurrencies[0].ID : CurCDefaults.lstCVarDefaults[0].CurrencyID;
                                                        CCurrencyDetails objCCurrencyDetails = new CCurrencyDetails();

                                                        string Stringdate = dRow.ItemArray.GetValue(CT_Date[cnt]).ToString().Split(' ')[0]; //(dRow.ItemArray.GetValue(CT_Date[cnt]).ToString()).Substring(0, 11).Trim();
                                                        string[] dtarray = Stringdate.Split('/');
                                                        string datechanged = "";
                                                        if (dtarray.Length == 3)
                                                            datechanged = Forwarding.MvcApp.Helpers.DateFunctionsController.GetYYYYMMDDFormat(Stringdate, 2); //datechanged = (dtarray[2]) + "-" + (dtarray[0]) + "-" + (dtarray[1]);
                                                        else
                                                            datechanged = "01/01/1900";
                                                        //string datechanged = (dtarray[2]) + "-" + (dtarray[0]) + "-" + (dtarray[1]);
                                                        //DateTime datechanged = new DateTime(Convert.ToInt32(dtarray[2]), Convert.ToInt32(dtarray[1]), Convert.ToInt32(dtarray[0]));

                                                        //var CTDate_CurrencyDetails = (DateTime.ParseExact(datechanged.ToString(), "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture)).ToString("yyyyMMdd");
                                                        //var CTDate_CurrencyDetails = (DateTime.ParseExact((dRow.ItemArray.GetValue(CT_Date[cnt]).ToString()).Substring(0, 11).Trim() + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture)).ToString("yyyyMMdd");

                                                        objCCurrencyDetails.GetList(" Where Currency_ID = " + objCVarPayables.CurrencyID + " AND '" + datechanged + "' BETWEEN FromDate AND ToDate");
                                                        //objCCurrencyDetails.GetList(" Where Currency_ID = "+ objCVarPayables.CurrencyID +" AND '" + Convert.ToDateTime((dRow.ItemArray.GetValue(CT_Date[cnt]).ToString() == "" ? "01/01/1900" : (dRow.ItemArray.GetValue(CT_Date[cnt]).ToString()))) + "' BETWEEN FromDate AND ToDate");
                                                        if (objCCurrencyDetails.lstCVarCurrencyDetails.Count == 0)
                                                        {
                                                            ErrorChargeTypesInContainers += " There is no exchange rate for this date " + Convert.ToDateTime((dRow.ItemArray.GetValue(CT_Date[cnt]).ToString() == "" ? "01/01/1900" : (dRow.ItemArray.GetValue(CT_Date[cnt]).ToString())));
                                                            continue;
                                                        }
                                                        objCVarPayables.ExchangeRate = (objCCurrencyDetails.lstCVarCurrencyDetails.Count > 0 ? objCCurrencyDetails.lstCVarCurrencyDetails[0].ExchangeRate : 1);
                                                        objCVarPayables.SupplierOperationPartnerID = SupplierOperationPartnerID;
                                                        objCVarPayables.OperationContainersAndPackagesID = GlobalOperationContainersAndPackagesID;// objCVarOperationContainersAndPackages.ID;
                                                        objCVarPayables.ChargeTypeID = objCChargeTypes.lstCVarChargeTypes[0].ID;
        
                                                        objCVarPayables.CostAmount = pCost;// Convert.ToDecimal(dRow.ItemArray.GetValue(CT_Cost[cnt]).ToString() == "" ? "0" : (dRow.ItemArray.GetValue(CT_Cost[cnt]).ToString()));
                                                        objCVarPayables.CostPrice = pCost;// Convert.ToDecimal(dRow.ItemArray.GetValue(CT_Cost[cnt]).ToString() == "" ? "0" : (dRow.ItemArray.GetValue(CT_Cost[cnt]).ToString()));
                                                        objCVarPayables.AmountWithoutVAT = pCost;
                                                        objCVarPayables.Notes = dRow.ItemArray.GetValue(CT_Notes[cnt]).ToString();
                                                        //objCVarPayables.IssueDate = Convert.ToDateTime((dRow.ItemArray.GetValue(CT_Date[cnt]).ToString() == "" ? "01/01/1900" : (dRow.ItemArray.GetValue(CT_Date[cnt]).ToString())));
                                                        objCVarPayables.IssueDate = DateTime.ParseExact(datechanged + " 00.00.00.000", "yyyyMMdd hh.mm.ss.fff", CultureInfo.InvariantCulture);
                                                        //Convert.ToDateTime((dRow.ItemArray.GetValue(CT_Date[cnt]).ToString() == "" ? "01/01/1900" : (datechanged)));

                                                        objCVarPayables.EntryDate = DateTime.Now;
                                                        objCVarPayables.CreationDate = DateTime.Now;
                                                        objCVarPayables.ModificationDate = DateTime.Now;
                                                        objCVarPayables.IsOfficial = false;
                                                        objCVarPayables.IsQuotationApproval = false;
                                                        objCVarPayables.ApprovePendingValue = 0;
                                                        objCVarPayables.crmCode = "";
                                                        objCVarPayables.IsPurchased = false;

                                                        int NotesLength = dRow.ItemArray.GetValue(CT_Notes[cnt]).ToString().Length;
                                                        objCVarPayables.SupplierInvoiceNo = dRow.ItemArray.GetValue(CT_Notes[cnt]).ToString()
                                                            .Substring(0, Math.Min(NotesLength, 20)); //"0";
                                                        objCVarPayables.SupplierReceiptNo = "0";
                                                        objCPayables.lstCVarPayables.Add(objCVarPayables);
                                                        checkException = objCPayables.SaveMethod(objCPayables.lstCVarPayables);
                                                        GlobalExchangeRate = (objCCurrencyDetails.lstCVarCurrencyDetails.Count > 0 ? objCCurrencyDetails.lstCVarCurrencyDetails[0].ExchangeRate : 1);
                                                        GlobalPayableID = objCVarPayables.ID;
                                                    }
                                                    if (checkException == null
                                                        && dRow.ItemArray.GetValue(CT_Revenue[cnt]).ToString() != "" && dRow.ItemArray.GetValue(CT_Revenue[cnt]).ToString() != "0")
                                                    {
                                                        string Stringdate = dRow.ItemArray.GetValue(CT_Date[cnt]).ToString().Split(' ')[0]; //(dRow.ItemArray.GetValue(CT_Date[cnt]).ToString()).Substring(0, 11).Trim();
                                                        string[] dtarray = Stringdate.Split('/');
                                                        string datechanged = "";
                                                        if (dtarray.Length == 3)
                                                            datechanged = Forwarding.MvcApp.Helpers.DateFunctionsController.GetYYYYMMDDFormat(Stringdate, 2); //(dtarray[2]) + "-" + (dtarray[0]) + "-" + (dtarray[1]);
                                                        else
                                                            datechanged = "01/01/1900";
                                                        CReceivables objCReceivables = new CReceivables();
                                                        CVarReceivables objCVarReceivables = new CVarReceivables();
                                                        objCVarReceivables.ID = 0;
                                                        objCVarReceivables.OperationID = OperationID;
                                                        objCVarReceivables.PayableID = GlobalPayableID;
                                                        objCVarReceivables.Quantity = 1;
                                                        objCVarReceivables.SupplierID = SupplierID;//SupplierOperationPartnerID;
                                                        objCVarReceivables.CurrencyID = objCCurrencies.lstCVarCurrencies.Count > 0 ? objCCurrencies.lstCVarCurrencies[0].ID : CurCDefaults.lstCVarDefaults[0].CurrencyID;
                                                        objCVarReceivables.ExchangeRate = GlobalExchangeRate;
                                                        objCVarReceivables.OperationContainersAndPackagesID = GlobalOperationContainersAndPackagesID;// objCVarOperationContainersAndPackages.ID;
                                                        objCVarReceivables.ChargeTypeID = objCChargeTypes.lstCVarChargeTypes[0].ID;//CT_Revenue

                                                        decimal pSale = 0;
                                                        if (dRow.ItemArray.GetValue(CT_Revenue[cnt]).ToString() != "")
                                                            pSale = decimal.Round(Convert.ToDecimal(dRow.ItemArray.GetValue(CT_Revenue[cnt]).ToString()), 2, MidpointRounding.AwayFromZero);

                                                        objCVarReceivables.SaleAmount = pSale;//Convert.ToDecimal(dRow.ItemArray.GetValue(CT_Revenue[cnt]).ToString() == "" ? "0" : (dRow.ItemArray.GetValue(CT_Revenue[cnt]).ToString()));
                                                        objCVarReceivables.SalePrice = pSale;//Convert.ToDecimal(dRow.ItemArray.GetValue(CT_Revenue[cnt]).ToString() == "" ? "0" : (dRow.ItemArray.GetValue(CT_Revenue[cnt]).ToString()));
                                                        objCVarReceivables.Notes = dRow.ItemArray.GetValue(CT_Notes[cnt]).ToString();
                                                        //objCVarReceivables.IssueDate = Convert.ToDateTime((dRow.ItemArray.GetValue(CT_Date[cnt]).ToString() == "" ? "01/01/1900" : (dRow.ItemArray.GetValue(CT_Date[cnt]).ToString())));
                                                        objCVarReceivables.IssueDate = DateTime.ParseExact(datechanged + " 00.00.00.000", "yyyyMMdd hh.mm.ss.fff", CultureInfo.InvariantCulture);
                                                        //Convert.ToDateTime((dRow.ItemArray.GetValue(CT_Date[cnt]).ToString() == "" ? "01/01/1900" : (datechanged)));
                                                        objCVarReceivables.PreviousCutOffDate = DateTime.Parse("01/01/1900");
                                                        objCVarReceivables.CutOffDate = DateTime.Parse("01/01/1900");
                                                        objCVarReceivables.ReceiptDate = DateTime.Parse("01/01/1900");
                                                        objCVarReceivables.ReceiptNo = "";
                                                        objCVarReceivables.CreationDate = DateTime.Now;
                                                        objCVarReceivables.ModificationDate = DateTime.Now;
                                                        objCVarReceivables.TariffID = 0;
                                                        objCVarReceivables.ManualChargeType = "0";
                                                        objCVarReceivables.CostCenterId = 0;
                                                        objCVarReceivables.IsOfficial = false;
                                                        objCVarReceivables.crmCode = "";
                                                        //objCVarReceivables.SupplierInvoiceNo = "0";
                                                        //objCVarReceivables.SupplierReceiptNo = "0";
                                                        objCReceivables.lstCVarReceivables.Add(objCVarReceivables);
                                                        checkException = objCReceivables.SaveMethod(objCReceivables.lstCVarReceivables);
                                                    }
                                                }
                                                //End
                                            }
                                            else
                                            {
                                                if (ItemDateFromExcel != "")
                                                    CounterForExists += 1;
                                            }
                                        }
                                        if (checkException != null)
                                            ErrorChargeTypesInContainers += ("( Tank : " + (dRow.ItemArray.GetValue(0).ToString().Trim()) + " - has Error in Charge Type :" + chargeType + " )");
                                    
                                }
                                    #endregion

                                }
                                else
                                {
                                    TanksNotExist += dRow.ItemArray.GetValue(0).ToString().Trim() + " , ";
                                }
                                //}
                            }

                            catch(Exception ex)
                            {
                                ErrorChargeTypesInContainers += ("( Tank : " + (dRow.ItemArray.GetValue(0).ToString().Trim()) + " - has Error in Charge Type :" + GlobalChargeType + " )");

                                continue;
                            }
                        }

                    }
                    
                }

            }

            return new object[] { TanksNotExist, ErrorChargeTypesInContainers };

        }



        public static DataTable ConvertCSVtoDataTable(string strFilePath)
        {
            DataTable dt = new DataTable();
            using (StreamReader sr = new StreamReader(strFilePath))
            {
                string[] headers = sr.ReadLine().Split(',');
                foreach (string header in headers)
                {
                    dt.Columns.Add(header);
                }

                while (!sr.EndOfStream)
                {
                    string[] rows = sr.ReadLine().Split(',');
                    if (rows.Length > 1)
                    {
                        DataRow dr = dt.NewRow();
                        for (int i = 0; i < headers.Length; i++)
                        {
                            dr[i] = rows[i].Trim();
                        }
                        dt.Rows.Add(dr);
                    }
                }

            }


            return dt;
        }

        public static DataTable ConvertXSLXtoDataTable(string strFilePath, string connString)
        {
            OleDbConnection oledbConn = new OleDbConnection(connString);
            DataTable dt = new DataTable();
            try
            {

                oledbConn.Open();
                using (OleDbCommand cmd = new OleDbCommand("SELECT * FROM [Sheet1$]", oledbConn))
                {
                    OleDbDataAdapter oleda = new OleDbDataAdapter();
                    oleda.SelectCommand = cmd;
                    DataSet ds = new DataSet();
                    oleda.Fill(ds);

                    dt = ds.Tables[0];
                }
            }
            catch
            {
            }
            finally
            {

                oledbConn.Close();
            }

            return dt;

        }


    }
    public class InsertListFromExcelTanks
    {
        public String pTankNumber { get; set; }
        public String pOperator { get; set; }
        public String Cost1 { get; set; }
        public String Revenue1 { get; set; }
        public String Date1 { get; set; }
        public String Notes1 { get; set; }
        public String Cost2 { get; set; }
        public String Revenue2 { get; set; }
        public String Date2 { get; set; }
        public String Notes2 { get; set; }
        public String Cost3 { get; set; }
        public String Revenue3 { get; set; }
        public String Date3 { get; set; }
        public String Notes3 { get; set; }
        public String Cost4 { get; set; }
        public String Revenue4 { get; set; }
        public String Date4 { get; set; }
        public String Notes4 { get; set; }
        public String Cost5 { get; set; }
        public String Revenue5 { get; set; }
        public String Date5 { get; set; }
        public String Notes5 { get; set; }
        public String Cost6 { get; set; }
        public String Revenue6 { get; set; }
        public String Date6 { get; set; }
        public String Notes6 { get; set; }
        public String Cost7 { get; set; }
        public String Revenue7 { get; set; }
        public String Date7 { get; set; }
        public String Notes7 { get; set; }
        public String Cost8 { get; set; }
        public String Revenue8 { get; set; }
        public String Date8 { get; set; }
        public String Notes8 { get; set; }
        public String Cost9 { get; set; }
        public String Revenue9 { get; set; }
        public String Date9 { get; set; }
        public String Notes9 { get; set; }
        public String Cost10 { get; set; }
        public String Revenue10 { get; set; }
        public String Date10 { get; set; }
        public String Notes10 { get; set; }
        public String Cost11 { get; set; }
        public String Revenue11 { get; set; }
        public String Date11 { get; set; }
        public String Notes11 { get; set; }
        public String Cost12 { get; set; }
        public String Revenue12 { get; set; }
        public String Date12 { get; set; }
        public String Notes12 { get; set; }
        public String Cost13 { get; set; }
        public String Revenue13 { get; set; }
        public String Date13 { get; set; }
        public String Notes13 { get; set; }
        public String Cost14 { get; set; }
        public String Revenue14 { get; set; }
        public String Date14 { get; set; }
        public String Notes14 { get; set; }
        public String Cost15 { get; set; }
        public String Revenue15 { get; set; }
        public String Date15 { get; set; }
        public String Notes15 { get; set; }
        public String Cost16 { get; set; }
        public String Revenue16 { get; set; }
        public String Date16 { get; set; }
        public String Notes16 { get; set; }
        public String Cost17 { get; set; }
        public String Revenue17 { get; set; }
        public String Date17 { get; set; }
        public String Notes17 { get; set; }
        public String Cost18 { get; set; }
        public String Revenue18 { get; set; }
        public String Date18 { get; set; }
        public String Notes18 { get; set; }
        public String ColumnNames { get; set; }

    }

}

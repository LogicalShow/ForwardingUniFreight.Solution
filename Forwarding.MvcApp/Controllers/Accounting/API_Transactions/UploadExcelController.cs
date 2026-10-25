using ExcelDataReader;
using Forwarding.MvcApp.Models.Accounting.MasterData.Customized;
using Forwarding.MvcApp.Models.Accounting.MasterData.Generated;
using Forwarding.MvcApp.Models.Accounting.Transactions.Generated;
using Forwarding.MvcApp.Models.Administration.Settings.Generated;
using Forwarding.MvcApp.Models.Customized;
using Forwarding.MvcApp.Models.MasterData.Invoicing.Generated;
using Forwarding.MvcApp.Models.NoAccess.Generated;
using Forwarding.MvcApp.Models.Operations.Operations.Generated;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Hosting;
using System.Web.Http;
using System.Web.Mvc;
using WebMatrix.WebData;

namespace Forwarding.MvcApp.Controllers.Accounting.API_Transactions
{
    public class UploadExcelController : BaseController
    {
        //
        // GET: /UploadExcel/
        //[FromBody]
        //SaveParameters saveParameters
        [System.Web.Mvc.HttpPost]
        public ActionResult UploadFiles(string pJournal_ID, string pJVType_ID, string pReceiptNo, string pRemarksHeader, DateTime pJVDate)
        {
            DateTime JVDate = pJVDate; // Convert.ToDateTime(pJVDate);
            var result = "Error|";
            Exception checkException = null;
            int _RowCount = 0;
            string fname = "";
            // Checking no of files injected in Request object  
            if (Request.Files.Count > 0)
            {
                try
                {
                    //  Get all files from Request object  
                    HttpFileCollectionBase files = Request.Files;
                    for (int i = 0; i < files.Count; i++)
                    {
                        //string path = AppDomain.CurrentDomain.BaseDirectory + "Uploads/";  
                        //string filename = Path.GetFileName(Request.Files[i].FileName);  

                        HttpPostedFileBase file = files[i];


                        // Checking for Internet Explorer  
                        if (Request.Browser.Browser.ToUpper() == "IE" || Request.Browser.Browser.ToUpper() == "INTERNETEXPLORER")
                        {
                            string[] testfiles = file.FileName.Split(new char[] { '\\' });
                            fname = testfiles[testfiles.Length - 1];
                        }
                        else
                        {
                            fname = file.FileName;
                        }
                        // Get the complete folder path and store the file inside it.  



                        string directoryPath = HostingEnvironment.MapPath("~/App_Data/uploads");
                        bool exists = Directory.Exists(directoryPath);
                        if (!exists)
                            Directory.CreateDirectory(directoryPath);


                        fname = Path.Combine(Server.MapPath("~/App_Data/uploads/"), fname);
                        file.SaveAs(fname);
                        Stream stream = file.InputStream;
                        //ExcelDataReader.IExcelDataReader reader;
                        ExcelDataReader.IExcelDataReader reader = ExcelDataReader.ExcelReaderFactory.CreateReader(stream);// ExcelDataReader.ExcelReaderFactory.CreateReader(stream);
                        //// reader.IsFirstRowAsColumnNames
                        var conf = new ExcelDataSetConfiguration
                        {
                            ConfigureDataTable = _ => new ExcelDataTableConfiguration
                            {
                                UseHeaderRow = true
                            }
                        };
                        var dataSet = reader.AsDataSet(conf);
                        // Now you can get data from each sheet by its index or its "name"
                        var dataTable = dataSet.Tables[0];

                        decimal TotalCredit = 0;
                        decimal TotalDebit = 0;
                        decimal Credit = 0;
                        decimal Debit = 0;
                        decimal LocalCredit = 0;
                        decimal LocalDebit = 0;
                        decimal No = 0;
                        decimal ExchangeRate = 0;
         
                        CVarA_JVDetails objCVarA_JVDetails;
                        CA_JVDetails objCA_JVDetails = new CA_JVDetails(); ;

                        List<Codes> CodesList = new List<Codes>();

                        var dtDistinctJVs = dataTable.DefaultView.ToTable(true, "Code").Rows.Cast<DataRow>().Select(row => row["Code"]).ToList();

                        CodesList = dataTable.DefaultView.ToTable(true, "Code").Rows.Cast<DataRow>().Select(row =>
                        {

                            return new Codes()
                            {
                                code = row["Code"].ToString()
                            };
                        }
                        ).ToList();

                        string CheckIfDataIsValid = CheckData(CodesList, dataTable);

                        if (CheckIfDataIsValid != "")
                            return Json(CheckIfDataIsValid);

                        foreach (var Code in dtDistinctJVs)
                        {
                            TotalCredit = 0;
                            TotalDebit = 0;

                            objCA_JVDetails.lstCVarA_JVDetails.Clear();

                            DataView dv = new DataView(dataTable);
                            dv.RowFilter = "Code=" + Code; // query example = "id = 10"
                            DataTable tblFiltered = dv.ToTable();

                            for (var I = 0; I < tblFiltered.Rows.Count; I++)
                            {

                                JVDate = Convert.ToDateTime(tblFiltered.Rows[I]["Date"]);

                                objCVarA_JVDetails = new CVarA_JVDetails();

                                if (!decimal.TryParse(tblFiltered.Rows[I]["Ex.Rate"].ToString(), out ExchangeRate))
                                    return Json("Enter Exchange Rate");

                                if (decimal.TryParse(tblFiltered.Rows[I]["LocalCredit"].ToString(), out No))
                                {
                                    LocalCredit = Math.Round( Convert.ToDecimal(tblFiltered.Rows[I]["LocalCredit"]),2,MidpointRounding.AwayFromZero);
                                     TotalCredit += LocalCredit;
                                }
                                else
                                    return Json("Enter Local Credit Amount");

                                if (decimal.TryParse(tblFiltered.Rows[I]["LocalDebit"].ToString(), out No))
                                {
                                    LocalDebit = Math.Round(Convert.ToDecimal(tblFiltered.Rows[I]["LocalDebit"]),2,MidpointRounding.AwayFromZero);
                                    TotalDebit += LocalDebit;
                                }

                                else
                                    return Json("Enter Local Debit Amount");


                                if (decimal.TryParse(tblFiltered.Rows[I]["Credit"].ToString(), out No))
                                    Credit = Convert.ToDecimal(tblFiltered.Rows[I]["Credit"]);
                                else
                                    return Json("Enter Credit Amount");

                                if (decimal.TryParse(tblFiltered.Rows[I]["Debit"].ToString(), out No))
                                    Debit = Convert.ToDecimal(tblFiltered.Rows[I]["Debit"]);
                                else
                                    return Json("Enter Debit Amount");


                                objCVarA_JVDetails.Debit = Debit;
                                objCVarA_JVDetails.Credit = Credit;

                                objCVarA_JVDetails.LocalDebit = LocalDebit;
                                objCVarA_JVDetails.LocalCredit = LocalCredit;

                                objCVarA_JVDetails.ExchangeRate = ExchangeRate;

                                //if ((Debit * ExchangeRate) != LocalDebit)
                                //{
                                //    return Json("debit * exchange rate not equal local debit");
                                //}

                                //if ((Credit * ExchangeRate) != LocalCredit)
                                //{
                                //    return Json("credit * exchange rate not equal local credit");
                                //}



                                if (Credit < 0)
                                    return Json("Enter Credit Amount Without -");


                                if (Debit < 0)
                                    return Json("Enter Debit Amount Without -");

                                if (ExchangeRate < 0)
                                    return Json("Enter ExchangeRate Amount Without -");

                                CvwA_Accounts objCvwA_Accounts = new CvwA_Accounts();
                                CvwA_CostCenters objCvwA_CostCenters = new CvwA_CostCenters();
                                CvwA_SubAccounts objCvwA_SubAccounts = new CvwA_SubAccounts();
                                CCurrencies objCCurrency = new CCurrencies();


                                objCCurrency.GetList("Where Code =N'" + tblFiltered.Rows[I]["Cur"].ToString().Trim() + "'");

                                if (objCCurrency.lstCVarCurrencies.Count > 0)
                                    objCVarA_JVDetails.Currency_ID = objCCurrency.lstCVarCurrencies[0].ID;
                                else
                                    return Json("Currency Code " + tblFiltered.Rows[I]["Cur"].ToString().Trim() + " not exist");


                                objCvwA_Accounts.GetList("Where Account_Name =N'" + tblFiltered.Rows[I]["Account"].ToString().Trim() + "'");

                                if (objCvwA_Accounts.lstCVarvwA_Accounts.Count > 0)
                                    objCVarA_JVDetails.Account_ID = objCvwA_Accounts.lstCVarvwA_Accounts[0].ID;
                                else
                                    return Json("Account " + tblFiltered.Rows[I]["Account"].ToString().Trim() + " not exist");



                                if (tblFiltered.Rows[I]["SubAccount"].ToString() != "")
                                {
                                    objCvwA_SubAccounts.GetList("Where  IsMain=0 and Name =N'" + tblFiltered.Rows[I]["SubAccount"].ToString() + "'");
                                    if (objCvwA_SubAccounts.lstCVarvwA_SubAccounts.Count > 0)
                                        objCVarA_JVDetails.SubAccount_ID = objCvwA_SubAccounts.lstCVarvwA_SubAccounts[0].ID;
                                    else
                                        return Json("SubAccount " + tblFiltered.Rows[I]["SubAccount"].ToString() + " not exist");
                                }
                                //else
                                //{

                                CvwLinkedSubAccounts objCvwLinkedSubAccounts = new CvwLinkedSubAccounts();
                                objCvwLinkedSubAccounts.GetListPaging(9999, 1, (" WHERE IsMain = 0 AND Account_ID = " + objCvwA_Accounts.lstCVarvwA_Accounts[0].ID.ToString()), "Name", out _RowCount);

                                if (objCvwLinkedSubAccounts.lstCVarvwLinkedSubAccounts.Count > 0 && tblFiltered.Rows[I]["SubAccount"].ToString() == "")
                                    return Json("Enter SubAccount for Account " + tblFiltered.Rows[I]["Account"].ToString());


                                if (objCvwLinkedSubAccounts.lstCVarvwLinkedSubAccounts.Count == 0 && tblFiltered.Rows[I]["SubAccount"].ToString() != "")
                                    return Json("Remove SubAccount for Account " + tblFiltered.Rows[I]["Account"].ToString());

                                if (objCvwLinkedSubAccounts.lstCVarvwLinkedSubAccounts.Count > 0 && tblFiltered.Rows[I]["SubAccount"].ToString() != "")
                                {
                                    objCvwLinkedSubAccounts.GetListPaging(9999, 1, (" WHERE IsMain = 0 AND Account_ID = " + objCvwA_Accounts.lstCVarvwA_Accounts[0].ID.ToString() + " AND ID = " + objCvwA_SubAccounts.lstCVarvwA_SubAccounts[0].ID.ToString()), "Name", out _RowCount);
                                    if (objCvwLinkedSubAccounts.lstCVarvwLinkedSubAccounts.Count == 0)
                                        return Json("SubAccount " + tblFiltered.Rows[I]["SubAccount"].ToString() + " is not linked with " + " account " + tblFiltered.Rows[I]["Account"].ToString());

                                }

                                //  }


                                if (tblFiltered.Rows[I]["CostCenter"].ToString().Trim() != "")
                                {
                                    objCvwA_CostCenters.GetList("Where Name =N'" + tblFiltered.Rows[I]["CostCenter"].ToString().Trim() + "'");
                                    if (objCvwA_CostCenters.lstCVarvwA_CostCenters.Count > 0)
                                        objCVarA_JVDetails.CostCenter_ID = objCvwA_CostCenters.lstCVarvwA_CostCenters[0].ID;
                                    else
                                        return Json("Cost Center " + tblFiltered.Rows[I]["CostCenter"].ToString().Trim() + " not exist");

                                }




                                // objCVarA_JVDetails.JV_ID = objCVarA_JV.ID;



                                objCVarA_JVDetails.Description = tblFiltered.Rows[I]["Description"].ToString().Trim();


                                if( tblFiltered.Columns.IndexOf("Department") != -1 )
                                {
                                    if (tblFiltered.Rows[I]["Department"].ToString() != "")
                                    {
                                        CBranches objCBranches = new CBranches();
                                        objCBranches.GetList(" WHERE Name ='" + tblFiltered.Rows[I]["Department"].ToString() + "'");

                                        if (objCBranches.lstCVarBranches.Count > 0)
                                            objCVarA_JVDetails.Branch_ID = objCBranches.lstCVarBranches[0].ID;
                                        else
                                            return Json("Department " + tblFiltered.Rows[I]["Department"].ToString().Trim() + " not exist");
                                    }
     
                                }
                       
                               
                                
                                //int ColumnCount = tblFiltered.Columns.Count;

                                objCA_JVDetails.lstCVarA_JVDetails.Add(objCVarA_JVDetails);



                            }

                            if (Math.Round(TotalCredit, 2, MidpointRounding.AwayFromZero) != Math.Round(TotalDebit, 2, MidpointRounding.AwayFromZero) || TotalDebit == 0)
                                return Json("Total debit not equal total credit!");

                            string pMessageReturned = "";

                            CA_Fiscal_Year objCA_Fiscal_Year = new CA_Fiscal_Year();
                            CA_Fiscal_Year_Period objCA_Fiscal_Year_Period = new CA_Fiscal_Year_Period();
                            CFreezeSystemTransactions objCFreezeSystemTransactions = new CFreezeSystemTransactions();
                            CA_JV objCA_JV = new CA_JV();
                            CVarA_JV objCVarA_JV = new CVarA_JV();
                            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
                            checkException = objCA_Fiscal_Year.GetList("WHERE Confirmed=1 AND Fiscal_Year_Name=N'" + JVDate.Year + "'");
                            checkException = objCA_Fiscal_Year_Period.GetList("WHERE '" + JVDate.ToString("yyyy/MM/dd") + "' BETWEEN From_Date AND To_Date and Closed=1");
                            //checkException = objCA_JV.GetList("WHERE ID<>" + pID + " AND JVNo=N'" + pJVNo + "' AND DATEPART(yyyy, JVDate)=" + JVDate.Year); //if return row then code is not unique
                            checkException = objCFreezeSystemTransactions.GetList("WHERE TransType='All' AND ('" + JVDate.ToString("yyyy/MM/dd") + "' BETWEEN FromDate AND ToDate)");
                            string JVCODE = "0";

                            #region Check FiscalYear is Confirmed and NOT Closed
                            if (objCA_Fiscal_Year.lstCVarA_Fiscal_Year.Count == 0)
                            {
                                pMessageReturned = "This fiscal year is not confirmed.";
                                return Json(pMessageReturned);
                            }

                            else if (objCA_Fiscal_Year_Period.lstCVarA_Fiscal_Year_Period.Count > 0)
                            {
                                pMessageReturned = "This fiscal year is closed.";
                                return Json(pMessageReturned);
                            }

                            #endregion Check FiscalYear is Confirmed and NOT Closed
                            #region Check JVCode
                            #endregion Check JVCode
                            #region Check Period is Not Frozen
                            else if (objCFreezeSystemTransactions.lstCVarFreezeSystemTransactions.Count > 0)
                            {
                                pMessageReturned = "The transactions for this date is frozen.";
                                return Json(pMessageReturned);
                            }


                            #endregion Check Period is Not Frozen
                            else
                            {

                                JVCODE = Convert.ToString(GetCode(JVDate, int.Parse(pJournal_ID))[0]);

                                objCVarA_JV.ID = 0;
                                objCVarA_JV.JVNo = JVCODE;
                                objCVarA_JV.JVDate = JVDate;
                                objCVarA_JV.TotalDebit = TotalDebit;
                                objCVarA_JV.TotalCredit = TotalDebit;
                                objCVarA_JV.Journal_ID = int.Parse(pJournal_ID);
                                objCVarA_JV.JVType_ID = int.Parse(pJVType_ID);
                                objCVarA_JV.ReceiptNo = pReceiptNo == "0" ? "" : pReceiptNo;
                                objCVarA_JV.RemarksHeader = pRemarksHeader == "0" ? "" : pRemarksHeader;
                                objCVarA_JV.Deleted = false;
                                objCVarA_JV.Posted = false;
                                objCVarA_JV.User_ID = WebSecurity.CurrentUserId;
                                objCA_JV.lstCVarA_JV.Add(objCVarA_JV);
                                checkException = objCA_JV.SaveMethod(objCA_JV.lstCVarA_JV);


                                foreach (CVarA_JVDetails JVDetails in objCA_JVDetails.lstCVarA_JVDetails)
                                {
                                    JVDetails.JV_ID = objCVarA_JV.ID;
                                }


                                checkException = objCA_JVDetails.SaveMethod(objCA_JVDetails.lstCVarA_JVDetails);


                            }
                        }


                        if (checkException == null)
                            // Returns message that successfully uploaded  
                            return Json("File Uploaded Successfully!");

                        FileInfo FileDelete = new FileInfo(fname);
                        FileDelete.Delete();

                    }
                    return Json("File Uploaded Successfully!");
                }
                catch (Exception ex)
                {
                    FileInfo FileDelete = new FileInfo(fname);
                    FileDelete.Delete();
                    return Json("Error occurred. Error details: " + ex.Message);

                }
            }
            else
            {
                return Json("No files selected.");
            }
        }
        public Object[] GetCode(DateTime pDate, Int32 pJournalTypeID)
        {
            //int _RowCount = 0;
            //Exception checkException = null;
            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
            string pNewCode = "";
            pNewCode = objCCustomizedDBCall.SP_A_JV_Get_Code("SP_A_JV_Get_Code", pDate, WebSecurity.CurrentUserId, pJournalTypeID);
            return new object[] {
                pNewCode //pNewCode = pData[0]

            };
        }

        public string CheckData(List<Codes> dtDistinctJVs, DataTable dataTable)
        {
            DateTime JVDate = new DateTime();
            var result = "Error|";
            Exception checkException = null;
            int _RowCount = 0;

            decimal TotalCredit = 0;
            decimal TotalDebit = 0;
            decimal Credit = 0;
            decimal Debit = 0;
            decimal LocalCredit = 0;
            decimal LocalDebit = 0;
            decimal No = 0;
            decimal ExchangeRate = 0;




            foreach (Codes row in dtDistinctJVs)
            {
                string Code = row.code;

                TotalCredit = 0;
                TotalDebit = 0;

                DataView dv = new DataView(dataTable);
                dv.RowFilter = "Code=" + Code; // query example = "id = 10"
                DataTable tblFiltered = dv.ToTable();

                for (var I = 0; I < tblFiltered.Rows.Count; I++)
                {
                    int C = Convert.ToInt32(I);

                    JVDate = Convert.ToDateTime(tblFiltered.Rows[I]["Date"]);

                    if (!decimal.TryParse(tblFiltered.Rows[I]["Ex.Rate"].ToString(), out ExchangeRate))
                        return ("Enter Exchange Rate");

                    if (decimal.TryParse(tblFiltered.Rows[I]["LocalCredit"].ToString(), out No))
                    {
                        LocalCredit = Math.Round( Convert.ToDecimal(tblFiltered.Rows[I]["LocalCredit"]),2,MidpointRounding.AwayFromZero);
                        TotalCredit += LocalCredit;
                    }
                    else
                        return ("Enter Local Credit Amount");

                    if (decimal.TryParse(tblFiltered.Rows[I]["LocalDebit"].ToString(), out No))
                    {
                        LocalDebit = Math.Round(Convert.ToDecimal(tblFiltered.Rows[I]["LocalDebit"]), 2, MidpointRounding.AwayFromZero);
                        TotalDebit += LocalDebit;
                    }

                    else
                        return ("Enter Local Debit Amount");


                    if (decimal.TryParse(tblFiltered.Rows[I]["Credit"].ToString(), out No))
                        Credit = Convert.ToDecimal(tblFiltered.Rows[I]["Credit"]);
                    else
                        return ("Enter Credit Amount");

                    if (decimal.TryParse(tblFiltered.Rows[I]["Debit"].ToString(), out No))
                        Debit = Convert.ToDecimal(tblFiltered.Rows[I]["Debit"]);
                    else
                        return ("Enter Debit Amount");



                    //if ((Debit * ExchangeRate) != LocalDebit)
                    //{
                    //    return ("debit * exchange rate not equal local debit");
                    //}

                    //if ((Credit * ExchangeRate) != LocalCredit)
                    //{
                    //    return ("credit * exchange rate not equal local credit");
                    //}



                    if (Credit < 0)
                        return ("Enter Credit Amount Without -");


                    if (Debit < 0)
                        return ("Enter Debit Amount Without -");

                    if (ExchangeRate < 0)
                        return ("Enter ExchangeRate Amount Without -");

                    CvwA_Accounts objCvwA_Accounts = new CvwA_Accounts();
                    CvwA_CostCenters objCvwA_CostCenters = new CvwA_CostCenters();
                    CvwA_SubAccounts objCvwA_SubAccounts = new CvwA_SubAccounts();
                    CCurrencies objCCurrency = new CCurrencies();


                    objCCurrency.GetList("Where Code =N'" + tblFiltered.Rows[I]["Cur"].ToString().Trim() + "'");

                    if (objCCurrency.lstCVarCurrencies.Count == 0)
                        return ("Currency Code " + tblFiltered.Rows[I]["Cur"].ToString().Trim() + " not exist");


                    objCvwA_Accounts.GetList("Where Account_Name =N'" + tblFiltered.Rows[I]["Account"].ToString().Trim() + "'");

                    if (objCvwA_Accounts.lstCVarvwA_Accounts.Count == 0)
                        return ("Account " + tblFiltered.Rows[I]["Account"].ToString().Trim() + " not exist");



                    if (tblFiltered.Rows[I]["SubAccount"].ToString() != "")
                    {
                        objCvwA_SubAccounts.GetList("Where  IsMain=0 and Name =N'" + tblFiltered.Rows[I]["SubAccount"].ToString() + "'");
                        if (objCvwA_SubAccounts.lstCVarvwA_SubAccounts.Count == 0)
                            return ("SubAccount " + tblFiltered.Rows[I]["SubAccount"].ToString() + " not exist");
                    }
                    //else
                    //{

                    CvwLinkedSubAccounts objCvwLinkedSubAccounts = new CvwLinkedSubAccounts();
                    objCvwLinkedSubAccounts.GetListPaging(9999, 1, (" WHERE IsMain = 0 AND Account_ID = " + objCvwA_Accounts.lstCVarvwA_Accounts[0].ID.ToString()), "Name", out _RowCount);

                    if (objCvwLinkedSubAccounts.lstCVarvwLinkedSubAccounts.Count > 0 && tblFiltered.Rows[I]["SubAccount"].ToString() == "")
                        return ("Enter SubAccount for Account " + tblFiltered.Rows[I]["Account"].ToString());


                    if (objCvwLinkedSubAccounts.lstCVarvwLinkedSubAccounts.Count == 0 && tblFiltered.Rows[I]["SubAccount"].ToString() != "")
                        return ("Remove SubAccount for Account " + tblFiltered.Rows[I]["Account"].ToString());

                    if (objCvwLinkedSubAccounts.lstCVarvwLinkedSubAccounts.Count > 0 && tblFiltered.Rows[I]["SubAccount"].ToString() != "")
                    {
                        objCvwLinkedSubAccounts.GetListPaging(9999, 1, (" WHERE IsMain = 0 AND Account_ID = " + objCvwA_Accounts.lstCVarvwA_Accounts[0].ID.ToString() + " AND ID = " + objCvwA_SubAccounts.lstCVarvwA_SubAccounts[0].ID.ToString()), "Name", out _RowCount);
                        if (objCvwLinkedSubAccounts.lstCVarvwLinkedSubAccounts.Count == 0)
                            return ("SubAccount " + tblFiltered.Rows[I]["SubAccount"].ToString() + " is not linked with " + " account " + tblFiltered.Rows[I]["Account"].ToString());

                    }



                    if (tblFiltered.Rows[I]["CostCenter"].ToString().Trim() != "")
                    {
                        objCvwA_CostCenters.GetList("Where Name =N'" + tblFiltered.Rows[I]["CostCenter"].ToString().Trim() + "'");
                        if (objCvwA_CostCenters.lstCVarvwA_CostCenters.Count == 0)
                            return ("Cost Center " + tblFiltered.Rows[I]["CostCenter"].ToString().Trim() + " not exist");

                    }

                    if (tblFiltered.Columns.IndexOf("Department") != -1)
                    {
                        if (tblFiltered.Rows[I]["Department"].ToString() != "")
                        {
                            CBranches objCBranches = new CBranches();
                            objCBranches.GetList(" WHERE Name ='" + tblFiltered.Rows[I]["Department"].ToString() + "'");

                            if (objCBranches.lstCVarBranches.Count == 0)
                                return ("Department " + tblFiltered.Rows[I]["Department"].ToString().Trim() + " not exist");
                        }

                    }
                }


                if (Math.Round( TotalCredit,2,MidpointRounding.AwayFromZero) != Math.Round( TotalDebit,2,MidpointRounding.AwayFromZero) || TotalDebit == 0)
                    return ("Total debit not equal total credit! " + " Total Debit : " + Math.Round(TotalCredit, 2, MidpointRounding.AwayFromZero).ToString()
                        + "  Total Credit : " + Math.Round(TotalDebit, 2, MidpointRounding.AwayFromZero).ToString() );

                string pMessageReturned = "";

                CA_Fiscal_Year objCA_Fiscal_Year = new CA_Fiscal_Year();
                CA_Fiscal_Year_Period objCA_Fiscal_Year_Period = new CA_Fiscal_Year_Period();
                CFreezeSystemTransactions objCFreezeSystemTransactions = new CFreezeSystemTransactions();
                CA_JV objCA_JV = new CA_JV();
                CVarA_JV objCVarA_JV = new CVarA_JV();
                CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
                checkException = objCA_Fiscal_Year.GetList("WHERE Confirmed=1 AND Fiscal_Year_Name=N'" + JVDate.Year + "'");
                checkException = objCA_Fiscal_Year_Period.GetList("WHERE '" + JVDate.ToString("yyyy/MM/dd") + "' BETWEEN From_Date AND To_Date and Closed=1");
                //checkException = objCA_JV.GetList("WHERE ID<>" + pID + " AND JVNo=N'" + pJVNo + "' AND DATEPART(yyyy, JVDate)=" + JVDate.Year); //if return row then code is not unique
                checkException = objCFreezeSystemTransactions.GetList("WHERE TransType='All' AND ('" + JVDate.ToString("yyyy/MM/dd") + "' BETWEEN FromDate AND ToDate)");
                string JVCODE = "0";

                #region Check FiscalYear is Confirmed and NOT Closed
                if (objCA_Fiscal_Year.lstCVarA_Fiscal_Year.Count == 0)
                {
                    pMessageReturned = "This fiscal year is not confirmed.";
                    return (pMessageReturned);
                }

                else if (objCA_Fiscal_Year_Period.lstCVarA_Fiscal_Year_Period.Count > 0)
                {
                    pMessageReturned = "This fiscal year is closed.";
                    return (pMessageReturned);
                }

                #endregion Check FiscalYear is Confirmed and NOT Closed
                #region Check JVCode
                #endregion Check JVCode
                #region Check Period is Not Frozen
                else if (objCFreezeSystemTransactions.lstCVarFreezeSystemTransactions.Count > 0)
                {
                    pMessageReturned = "The transactions for this date is frozen.";
                    return (pMessageReturned);
                }


                #endregion Check Period is Not Frozen
            }

            return "";
        }

        [System.Web.Mvc.HttpPost]
        public ActionResult UploadContainers(string pID)
        {
            var result = "Error|";
            Exception checkException = null;
            int _RowCount = 0;
            string fname = "";
            // Checking no of files injected in Request object  
            if (Request.Files.Count > 0)
            {
                try
                {
                    //  Get all files from Request object  
                    HttpFileCollectionBase files = Request.Files;
                    for (int i = 0; i < files.Count; i++)
                    {
                        //string path = AppDomain.CurrentDomain.BaseDirectory + "Uploads/";  
                        //string filename = Path.GetFileName(Request.Files[i].FileName);  

                        HttpPostedFileBase file = files[i];


                        // Checking for Internet Explorer  
                        if (Request.Browser.Browser.ToUpper() == "IE" || Request.Browser.Browser.ToUpper() == "INTERNETEXPLORER")
                        {
                            string[] testfiles = file.FileName.Split(new char[] { '\\' });
                            fname = testfiles[testfiles.Length - 1];
                        }
                        else
                        {
                            fname = file.FileName;
                        }
                        // Get the complete folder path and store the file inside it.  
                        fname = Path.Combine(Server.MapPath("~/App_Data/uploads/"), fname);
                        file.SaveAs(fname);
                        Stream stream = file.InputStream;
                        //ExcelDataReader.IExcelDataReader reader;
                        ExcelDataReader.IExcelDataReader reader = ExcelReaderFactory.CreateOpenXmlReader(stream);
                       // ExcelDataReader.IExcelDataReader reader = ExcelDataReader.ExcelReaderFactory.CreateReader(stream);// ExcelDataReader.ExcelReaderFactory.CreateReader(stream);
                        //// reader.IsFirstRowAsColumnNames
                        var conf = new ExcelDataSetConfiguration
                        {
                            ConfigureDataTable = _ => new ExcelDataTableConfiguration
                            {
                                UseHeaderRow = true
                            }
                        };
                        var dataSet = reader.AsDataSet(conf);
                        // Now you can get data from each sheet by its index or its "name"
                        var dataTable = dataSet.Tables[0];
                        string pMessageReturned = "";


                        CVarTruckingOrderContainers objCVarTruckingOrderContainers;
                        CTruckingOrderContainers objCTruckingOrderContainers = new CTruckingOrderContainers();
                        DateTime Date;
                        int Time;
                        int SN = 0;
                        string ContainerNO = "";
                        for (var I = 0; I < dataTable.Rows.Count; I++)
                        {

                            objCVarTruckingOrderContainers = new CVarTruckingOrderContainers();
                            objCVarTruckingOrderContainers.TruckingOrderID = int.Parse(pID);



                            if (!int.TryParse(dataTable.Rows[I]["SN"].ToString(), out SN))
                                return Json("Enter Vaild SN");
                            else
                                objCVarTruckingOrderContainers.SN = Convert.ToInt32(dataTable.Rows[I]["SN"].ToString().Trim());

                            ContainerNO= dataTable.Rows[I]["ContainerNO"].ToString().Trim();
                            objCVarTruckingOrderContainers.ContainerNO = ContainerNO;


                            CTruckingOrderContainers objCTruckingOrderContainersOld = new CTruckingOrderContainers();
                            objCTruckingOrderContainersOld.GetList("WHERE TruckingOrderID=" + pID + " AND ContainerNo='" + ContainerNO + "'");

                            if (objCTruckingOrderContainersOld.lstCVarTruckingOrderContainers.Count > 0)
                                objCVarTruckingOrderContainers.ID = objCTruckingOrderContainersOld.lstCVarTruckingOrderContainers[0].ID;
                            else
                                return Json("Add Container No " + ContainerNO + " First");

                            if (dataTable.Rows[I]["Date"].ToString() == "")
                                objCVarTruckingOrderContainers.IssueDate = DateTime.Parse("01/01/1900");
                            else if (!DateTime.TryParse(dataTable.Rows[I]["Date"].ToString(), out Date))
                                    return Json("Enter Vaild Date");
                                else
                                    objCVarTruckingOrderContainers.IssueDate = Date;
                            
                            objCVarTruckingOrderContainers.SL = dataTable.Rows[I]["SL"].ToString().Trim();
                            objCVarTruckingOrderContainers.BookingNo = dataTable.Rows[I]["Booking No"].ToString().Trim();
                            objCVarTruckingOrderContainers.PORT = dataTable.Rows[I]["PORT"].ToString().Trim();
                            objCVarTruckingOrderContainers.WH = dataTable.Rows[I]["W / H"].ToString().Trim();
                            objCVarTruckingOrderContainers.Size = dataTable.Rows[I]["Size"].ToString().Trim();
                            objCVarTruckingOrderContainers.DriverName = dataTable.Rows[I]["Driver Name"].ToString().Trim();
                            objCVarTruckingOrderContainers.Phone = dataTable.Rows[I]["Phone"].ToString().Trim();
                            objCVarTruckingOrderContainers.TruckNo = dataTable.Rows[I]["Truck No"].ToString().Trim();
                            objCVarTruckingOrderContainers.Location = dataTable.Rows[I]["Location"].ToString().Trim();
                            objCVarTruckingOrderContainers.SealNo = dataTable.Rows[I]["SL"].ToString().Trim();

                            if (dataTable.Rows[I]["Release"].ToString() == "")
                                objCVarTruckingOrderContainers.ReleaseDate = DateTime.Parse("01/01/1900");
                            else if (!DateTime.TryParse(dataTable.Rows[I]["Release"].ToString(), out Date))
                                    return Json("Enter Vaild Release Date");
                                else
                                    objCVarTruckingOrderContainers.ReleaseDate = Date;



                            if (dataTable.Rows[I]["Arrival"].ToString() == "")
                                objCVarTruckingOrderContainers.ArrivalDate = DateTime.Parse("01/01/1900");
                            else if (!DateTime.TryParse(dataTable.Rows[I]["Arrival"].ToString(), out Date))
                                return Json("Enter Vaild Arrival Date");
                            else
                                objCVarTruckingOrderContainers.ArrivalDate = Date;



                            if (dataTable.Rows[I]["Return"].ToString() == "")
                                objCVarTruckingOrderContainers.ReturnDate = DateTime.Parse("01/01/1900");
                            else if (!DateTime.TryParse(dataTable.Rows[I]["Return"].ToString(), out Date))
                                    return Json("Enter Vaild Return Date");
                                else
                                    objCVarTruckingOrderContainers.ReturnDate = Date;

                            if (dataTable.Rows[I]["FGODate"].ToString() == "")
                                objCVarTruckingOrderContainers.FGODate = DateTime.Parse("01/01/1900");
                            else if (!DateTime.TryParse(dataTable.Rows[I]["FGODate"].ToString(), out Date))
                                return Json("Enter Vaild FGO Date");
                            else
                                objCVarTruckingOrderContainers.FGODate = Date;


                            objCVarTruckingOrderContainers.Port2 = dataTable.Rows[I]["Port"].ToString().Trim(); //port here is small chars
                            objCVarTruckingOrderContainers.StatusName = dataTable.Rows[I]["Closed"].ToString().Trim();
                            objCVarTruckingOrderContainers.Trucker = dataTable.Rows[I]["Trucker"].ToString().Trim();
                            objCVarTruckingOrderContainers.TypeName = dataTable.Rows[I]["Type"].ToString().Trim();
                            objCVarTruckingOrderContainers.Notes = dataTable.Rows[I]["Notes"].ToString().Trim();
                            objCVarTruckingOrderContainers.TareWeight = dataTable.Rows[I]["TareWeight"].ToString().Trim() == "" ? 0 : decimal.Parse(dataTable.Rows[I]["TareWeight"].ToString().Trim());
                            objCVarTruckingOrderContainers.NetWeight = dataTable.Rows[I]["NetWeight"].ToString().Trim() == "" ? 0 : decimal.Parse(dataTable.Rows[I]["NetWeight"].ToString().Trim());
                            objCVarTruckingOrderContainers.GrossWeight = dataTable.Rows[I]["GrossWeight"].ToString().Trim() == "" ? 0 : decimal.Parse(dataTable.Rows[I]["GrossWeight"].ToString().Trim());

                            objCVarTruckingOrderContainers.OperationNO = dataTable.Rows[I]["OperationNO"].ToString().Trim();
                            objCVarTruckingOrderContainers.Factory = dataTable.Rows[I]["Factory"].ToString().Trim();
                            objCVarTruckingOrderContainers.CustomLOC = dataTable.Rows[I]["CustomLOC"].ToString().Trim();
                            objCVarTruckingOrderContainers.TruckWeight = dataTable.Rows[I]["TruckWeight"].ToString().Trim();
                            objCVarTruckingOrderContainers.FactoryGateOut = dataTable.Rows[I]["FactoryGateOut"].ToString().Trim();
                            objCVarTruckingOrderContainers.POD = dataTable.Rows[I]["POD"].ToString().Trim();
                            objCVarTruckingOrderContainers.Invoice = dataTable.Rows[I]["Invoice"].ToString().Trim();

                            if (dataTable.Rows[I]["ReleaseTime"].ToString() == "") objCVarTruckingOrderContainers.ReleaseTime = 0;
                            else if (!int.TryParse(dataTable.Rows[I]["ReleaseTime"].ToString(), out Time)) return Json("Enter Vaild Release Time");
                            else if (Time < 0 || Time > 2359) return Json("Release Time must be between (0 and 2359)");
                            else objCVarTruckingOrderContainers.ReleaseTime = Time;

                            if (dataTable.Rows[I]["ArrivalTime"].ToString() == "") objCVarTruckingOrderContainers.ArrivalTime = 0;
                            else if (!int.TryParse(dataTable.Rows[I]["ArrivalTime"].ToString(), out Time)) return Json("Enter Vaild Arrival Time");
                            else if (Time < 0 || Time > 2359) return Json("Arrival Time must be between (0 and 2359)");
                            else objCVarTruckingOrderContainers.ArrivalTime = Time;

                            if (dataTable.Rows[I]["ReturnTime"].ToString() == "") objCVarTruckingOrderContainers.ReturnTime = 0;
                            else if (!int.TryParse(dataTable.Rows[I]["ReturnTime"].ToString(), out Time)) return Json("Enter Vaild Return Time");
                            else if (Time < 0 || Time > 2359) return Json("Return Time must be between (0 and 2359)");
                            else objCVarTruckingOrderContainers.ReturnTime = Time;

                            if (dataTable.Rows[I]["FGOTime"].ToString() == "") objCVarTruckingOrderContainers.FGOTime = 0;
                            else if (!int.TryParse(dataTable.Rows[I]["FGOTime"].ToString(), out Time)) return Json("Enter Vaild FGO Time");
                            else if (Time < 0 || Time > 2359) return Json("FGO Time must be between (0 and 2359)");
                            else objCVarTruckingOrderContainers.FGOTime = Time;

                            
                            objCTruckingOrderContainers.lstCVarTruckingOrderContainers.Add(objCVarTruckingOrderContainers);


                        }
                        checkException = objCTruckingOrderContainers.SaveMethod(objCTruckingOrderContainers.lstCVarTruckingOrderContainers);

                        if (checkException == null)
                            // Returns message that successfully uploaded  
                            return Json("File Uploaded Successfully!");

                        FileInfo FileDelete = new FileInfo(fname);
                        FileDelete.Delete();

                    }
                    return Json("File Uploaded Successfully!");
                }
                catch (Exception ex)
                {
                    FileInfo FileDelete = new FileInfo(fname);
                    FileDelete.Delete();
                    return Json("Error occurred. Error details: " + ex.Message);

                }
            }
            else
            {
                return Json("No files selected.");
            }
        }
    }

    public class Codes
    {
        private string Code;
        public string code
        {
            get { return Code; }
            set { Code = value; }
        }
    }
}

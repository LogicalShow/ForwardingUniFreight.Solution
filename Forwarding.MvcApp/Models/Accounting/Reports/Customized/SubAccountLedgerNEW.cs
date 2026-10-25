using OfficeOpenXml;
using System;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace Forwarding.MvcApp.Controllers.Operations.Reports
{
    public class SubAccountsLedgerNEWController : Controller
    {
        private string GetConnectionString() =>
            ConfigurationManager.ConnectionStrings["ConnectionString"].ToString();

        [HttpGet]
        public async Task<ActionResult> ExportSubAccountsLedgerToExcel(
            string JV_IDs,
            string SubAccount_IDs,
            string AccountIDs,
            string CostCenter_ID,
            string From_Date,
            string To_Date,
            bool ShowRevaluateEntry,
            string BranchIDs)
        {
            try
            {
               var From_Date1 = DateTime.ParseExact(From_Date + " 00:00:00.000", "dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture);
               var To_Date1 = DateTime.ParseExact(To_Date + " 23:59:59.000", "dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture);
      
                using (var conn = new SqlConnection(GetConnectionString()))
                using (var cmd = new SqlCommand("[dbo].[Rep_A_SubAccounts_LedgerByCCNew]", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandTimeout = 600;

                    cmd.Parameters.AddWithValue("@JV_IDs", (object)JV_IDs ?? DBNull.Value);
                    cmd.Parameters.AddWithValue("@SubAccount_IDs", (object)SubAccount_IDs ?? DBNull.Value);
                    cmd.Parameters.AddWithValue("@AccountIDs", (object)AccountIDs ?? DBNull.Value);
                    cmd.Parameters.AddWithValue("@CostCenter_ID", (object)CostCenter_ID ?? DBNull.Value);
                    cmd.Parameters.AddWithValue("@From_Date", From_Date1);
                    cmd.Parameters.AddWithValue("@To_Date", To_Date1);
                    cmd.Parameters.AddWithValue("@ShowRevaluateEntry", ShowRevaluateEntry);
                    cmd.Parameters.AddWithValue("@BranchIDs", (object)BranchIDs ?? DBNull.Value);

                    var dataTable = new DataTable();
                    await conn.OpenAsync();
                    using (var reader = await cmd.ExecuteReaderAsync())
                    {
                        dataTable.Load(reader);
                    }

                    if (!dataTable.Columns.Contains("CostCenterID") || !dataTable.Columns.Contains("Opening_Balance"))
                        return Content("Missing required columns.");

                    // Rename Opening_Balance to Balance
                    dataTable.Columns["Opening_Balance"].ColumnName = "Balance";

                    using (var package = new ExcelPackage())
                    {
                        ExcelWorksheet sheet = package.Workbook.Worksheets.Add("SubAccounts Ledger");

                        int currentRow = 1;

                        var grouped = dataTable.AsEnumerable()
                        .GroupBy(r => new
                        {
                            CostCenterID = r["CostCenterID"],
                            CostCenterName = dataTable.Columns.Contains("CostCenterName") ? r["CostCenterName"]?.ToString() ?? "" : ""
                        });
                       
                        string[] headers = new string[]
                        {
                            "JVNo", "JVDate", "ReceiptNo", "AccountName", "Debit", "Credit",
                            "Currency_Code", "LocalDebit", "LocalCredit", "IsDocumented", "Description", "Balance"
                        };

                        foreach (var group in grouped)
                        {
                            var rows = group.ToList();

                            // CostCenterName row (merged)
                            currentRow++;
                            sheet.Cells[currentRow, 1, currentRow, headers.Length].Merge = true;
                            sheet.Cells[currentRow, 1].Value = $"Cost Center: {group.Key.CostCenterName}";
                            sheet.Cells[currentRow, 1].Style.Font.Bold = true;

                            //// Header row
                            //currentRow++;
                            //for (int i = 0; i < headers.Length; i++)
                            //{
                            //    sheet.Cells[currentRow, i + 1].Value = headers[i];
                            //    sheet.Cells[currentRow, i + 1].Style.Font.Bold = true;
                            //}
                            // Header row
                            currentRow++;
                            for (int i = 0; i < headers.Length; i++)
                            {
                                sheet.Cells[currentRow, i + 1].Value = headers[i];
                                sheet.Cells[currentRow, i + 1].Style.Font.Bold = true;
                            }

                            // Opening Balance row
                            currentRow++;
                            decimal openingBalance = Convert.ToDecimal(rows.First()["Balance"]);
                            sheet.Cells[currentRow, 1, currentRow, headers.Length - 1].Merge = true;
                            sheet.Cells[currentRow, 1].Value = "Opening Balance:";
                            sheet.Cells[currentRow, headers.Length].Value = openingBalance;

                            // Data rows + running balance
                            decimal balance = openingBalance;
                            foreach (var row in rows)
                            {
                                currentRow++;
                                for (int i = 0; i < headers.Length - 1; i++)
                                {
                                    var colName = headers[i];
                                    sheet.Cells[currentRow, i + 1].Value = row[colName];
                                }

                                decimal localDebit = row.Table.Columns.Contains("LocalDebit") ? Convert.ToDecimal(row["LocalDebit"]) : 0;
                                decimal localCredit = row.Table.Columns.Contains("LocalCredit") ? Convert.ToDecimal(row["LocalCredit"]) : 0;

                                balance += localDebit - localCredit;
                                sheet.Cells[currentRow, headers.Length].Value = balance;
                            }
                        }

                        sheet.Cells[sheet.Dimension.Address].AutoFitColumns();

                        var stream = new MemoryStream();
                        package.SaveAs(stream);
                        stream.Position = 0;

                        string fileName = $"SubAccountsLedger_{DateTime.Now:yyyyMMdd_HHmmss}.xlsx";
                        return File(stream, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", fileName);
                    }
                }
            }
            catch (Exception ex)
            {
                return Content("Error exporting report: " + ex.Message);
            }
        }
    }
}

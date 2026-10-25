using OfficeOpenXml;
using System.Data.SqlClient;
using System.Data;
using System.Diagnostics;
using System.IO;
using System.Threading.Tasks;
using System;
using System.Configuration;
using System.Web.Mvc;

namespace Forwarding.MvcApp.Models.Operations.Operations.Customized
{
    public class JVNewReportController : Controller
    {
        private string GetConnectionString() =>
            ConfigurationManager.ConnectionStrings["ConnectionString"].ToString();

        private async Task<MemoryStream> ExportJVNewReportToExcel(
           DateTime fromDate,
           DateTime toDate,
           string jvTypeIds,
           string safeId,
           string directionId,
           string serviceId,
           string invoiceTypeId,
           string safeTypeId,
           string voucherTypeId,
           string reportName = "ReportA_JVNew")
        {
            var stopwatch = Stopwatch.StartNew();
            var stream = new MemoryStream();

            try
            {
                using (var conn = new SqlConnection(GetConnectionString()))
                using (var cmd = new SqlCommand("ReportA_JVNew", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandTimeout = 3600;

                    cmd.Parameters.Add("@FromDate", SqlDbType.DateTime).Value = fromDate;
                    cmd.Parameters.Add("@ToDate", SqlDbType.DateTime).Value = toDate;
                    cmd.Parameters.Add("@JVType_IDs", SqlDbType.NVarChar).Value = (object)jvTypeIds ?? DBNull.Value;
                    cmd.Parameters.Add("@SafeID", SqlDbType.NVarChar).Value = (object)safeId ?? DBNull.Value;
                    cmd.Parameters.Add("@DirectionID", SqlDbType.NVarChar).Value = (object)directionId ?? DBNull.Value;
                    cmd.Parameters.Add("@ServiceID", SqlDbType.NVarChar).Value = (object)serviceId ?? DBNull.Value;
                    cmd.Parameters.Add("@InvoiceTypeID", SqlDbType.NVarChar).Value = (object)invoiceTypeId ?? DBNull.Value;
                    cmd.Parameters.Add("@SafeTypeID", SqlDbType.NVarChar).Value = (object)safeTypeId ?? DBNull.Value;
                    cmd.Parameters.Add("@VoucherTypeID", SqlDbType.NVarChar).Value = (object)voucherTypeId ?? DBNull.Value;
                    

                    await conn.OpenAsync();

                    ExcelPackage.LicenseContext = LicenseContext.NonCommercial;
                    using (var package = new ExcelPackage())
                    {
                        var worksheet = package.Workbook.Worksheets.Add("Sheet1");

                        using (var reader = await cmd.ExecuteReaderAsync())
                        {
                            int rowIndex = 1;

                            for (int i = 0; i < reader.FieldCount; i++)
                                worksheet.Cells[rowIndex, i + 1].Value = reader.GetName(i);

                            rowIndex++;

                            while (await reader.ReadAsync())
                            {
                                for (int i = 0; i < reader.FieldCount; i++)
                                {
                                    object val = reader.IsDBNull(i) ? null : reader.GetValue(i);
                                    worksheet.Cells[rowIndex, i + 1].Value = val;
                                }
                                rowIndex++;

                                if (rowIndex % 5000 == 0)
                                    GC.Collect(GC.MaxGeneration, GCCollectionMode.Forced, false, false);
                            }
                        }

                        if (worksheet.Dimension != null)
                            worksheet.Cells[worksheet.Dimension.Address].AutoFitColumns();

                        package.SaveAs(stream);
                    }
                }

                stopwatch.Stop();
                Debug.WriteLine($"{reportName} - SQL → Excel Streamed Generation Time: {stopwatch.Elapsed}");

                stream.Position = 0;
                return stream;
            }
            catch
            {
                stream.Dispose();
                throw;
            }
        }


        public async Task<ActionResult> RepA_JVNew(
            DateTime fromDate,
            DateTime toDate,
            string jvTypeIds,
            string safeId,
            string directionId,
            string serviceId,
            string invoiceTypeId,
            string safeTypeId,
            string voucherTypeId)
        {
            //if (fromDate == default || toDate == default)
            //    return new HttpStatusCodeResult(400, "FromDate and ToDate are required.");

            var stream = await ExportJVNewReportToExcel(
                fromDate, toDate, jvTypeIds, safeId, directionId, serviceId, invoiceTypeId, safeTypeId, voucherTypeId);

            return GetExcelFileStream(stream, "ReportA_JVNew");
        }

        private FileStreamResult GetExcelFileStream(MemoryStream stream, string filePrefix)
        {
            string timestamp = DateTime.Now.ToString("yyyyMMdd_HHmmss");
            string fileName = $"{filePrefix}_{timestamp}.xlsx";
            return File(stream,
                        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                        fileName);
        }
    }
}

using ExcelDataReader;
using Forwarding.MvcApp.Entities.Warehousing;
using Forwarding.MvcApp.Models.Customized;
using Forwarding.MvcApp.Models.MasterData.Invoicing.Generated;
using Forwarding.MvcApp.Models.MasterData.Partners.Generated;
using Forwarding.MvcApp.Models.Warehousing.MasterData.Generated;
using Forwarding.MvcApp.Models.Warehousing.Reports.Generated;
using Forwarding.MvcApp.Models.Warehousing.Transactions.Generated;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;

namespace Forwarding.MvcApp.Controllers.Warehousing.API_Reports
{
    public class _3PLStatisticsController : ApiController
    {
        [HttpGet, HttpPost]
        public Object[] GetIDsHavingDocsIn(string FolderPath)
        {
            string IDsHavingDocsIn = "";
            string exception = "";
            try
            {
                FolderPath = HttpContext.Current.Server.MapPath($"~/{FolderPath}");
                var pDocsInFileNames = Directory.GetDirectories(FolderPath);
                for (int i = 0; i < pDocsInFileNames.Length; i++)
                    pDocsInFileNames[i] = pDocsInFileNames[i].Substring(pDocsInFileNames[i].LastIndexOf('\\') + 1);
                IDsHavingDocsIn = string.Join(",", pDocsInFileNames);
            }
            catch (DirectoryNotFoundException) {
                exception = "Directory not found";
            }
            catch (UnauthorizedAccessException) {
                exception = "Access to the directory is denied";
            }
            //var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[] 
            {
                IDsHavingDocsIn
                ,exception
            };
        }

        [HttpGet]
        public Object[] LoadInitialData(bool pHasRequest)
        {
            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
            var CustomerList = objCCustomizedDBCall.ExecuteQuery_ListOfObjects("SELECT ID,Name FROM Customers", typeof(CVarCustomers))
                .Cast<CVarCustomers>()
                .ToList();

			var ProductList = new List<CVarPurchaseItem>();
			if(!pHasRequest)
				ProductList.AddRange(objCCustomizedDBCall.ExecuteQuery_ListOfObjects("SELECT ID,Name FROM PurchaseItem", typeof(CVarPurchaseItem))
				.Cast<CVarPurchaseItem>()
				.ToList());

			var WarehouseList = objCCustomizedDBCall.ExecuteQuery_ListOfObjects("SELECT ID,Name FROM WH_Warehouse", typeof(CVarWH_Warehouse))
                .Cast<CVarWH_Warehouse>()
                .ToList();

            var AreaList = objCCustomizedDBCall.ExecuteQuery_ListOfObjects("SELECT ID,Name FROM WH_Area", typeof(CVarWH_Area))
                .Cast<CVarWH_Area>()
                .ToList();

			var ServiceList = objCCustomizedDBCall.ExecuteQuery_ListOfObjects("SELECT ID,Name FROM WH_Services", typeof(CVarWH_Services))
				.Cast<CVarWH_Services>()
				.ToList();

			var serializer = new JavaScriptSerializer { MaxJsonLength = int.MaxValue };
            return new object[]
            {
                serializer.Serialize(CustomerList),
                serializer.Serialize(ProductList),
                serializer.Serialize(WarehouseList),
                serializer.Serialize(AreaList),
                serializer.Serialize(ServiceList)
            };
        }

		[HttpGet,HttpPost]
		public object LoadOrders(string pWhereClause)
		{
			CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
			string query = $@"select ID,Code from WH_Receive {pWhereClause} union all select ID,Code from WH_Pickup {pWhereClause}";
			var orders = objCCustomizedDBCall.ExecuteQuery_ListOfObjects(query, typeof(SelectListOption)).Cast<SelectListOption>().ToList();
			var serializer = new JavaScriptSerializer { MaxJsonLength = int.MaxValue };
			return serializer.Serialize(orders);
		}

		[HttpGet,HttpPost]
		public object[] LoadItemsLog(int pPageNumber, int pPageSize, string pWhereClause, string pOrderBy)
		{
			int rowCount;
			CvwWH_ItemsLog objCvwWH_ItemsLog = new CvwWH_ItemsLog();
			var ex = objCvwWH_ItemsLog.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out rowCount);

			var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
			return new object[] {
				serializer.Serialize(objCvwWH_ItemsLog.lstCVarvwWH_ItemsLog)
				, rowCount
			};
		}
		[HttpGet, HttpPost]
		public object[] LoadItemInquiries(int pPageNumber, int pPageSize, string pWhereClause, string pOrderBy)
		{
			int rowCount;
			if(pOrderBy=="ReceiveDate")//bySerial
			{
				CvwWH_SerialInquiries objCvwWH_SerialInquiries = new CvwWH_SerialInquiries();
				var ex = objCvwWH_SerialInquiries.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out rowCount);

				var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
				return new object[] {
				serializer.Serialize(objCvwWH_SerialInquiries.lstCVarvwWH_SerialInquiries)
				, rowCount
			};
			}
			else//byLocation,byPallet
			{
				CvwWH_ItemInquiries objCvwWH_ItemInquiries = new CvwWH_ItemInquiries();
				var ex = objCvwWH_ItemInquiries.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out rowCount);

				var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
				return new object[] {
				serializer.Serialize(objCvwWH_ItemInquiries.lstCVarvwWH_ItemInquiries)
				, rowCount
			};
			}
		}
		[HttpGet,HttpPost]
		public object GetPrintData(_3PlRepQuery p_3PlRepQuery)
		{
			object data=null;
			CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
			switch (p_3PlRepQuery.ReportType)
			{
				case "14":
					data = objCCustomizedDBCall.ExecuteQuery_ListOfObjects(p_3PlRepQuery.Query, typeof(DefectedInventory)).Cast<DefectedInventory>().ToList();
					break;
				case "15":
					data = new {
						Receive = objCCustomizedDBCall.ExecuteQuery_ListOfObjects(p_3PlRepQuery.Query, typeof(ReceiveAndPickupWithService)).Cast<ReceiveAndPickupWithService>().ToList(),
						Pickup = objCCustomizedDBCall.ExecuteQuery_ListOfObjects(p_3PlRepQuery.Query2, typeof(ReceiveAndPickupWithService)).Cast<ReceiveAndPickupWithService>().ToList()
					};
					break;
				case "16":
					data = objCCustomizedDBCall.ExecuteQuery_ListOfObjects(p_3PlRepQuery.Query, typeof(ReceiveVsPickupByPallets)).Cast<ReceiveVsPickupByPallets>().ToList();
					break;
				case "17":
					data = objCCustomizedDBCall.ExecuteQuery_ListOfObjects(p_3PlRepQuery.Query, typeof(ClientSpaceOccupied)).Cast<ClientSpaceOccupied>().ToList();
					break;
				case "18":
					data = objCCustomizedDBCall.ExecuteQuery_ListOfObjects(p_3PlRepQuery.Query, typeof(TracingSerial)).Cast<TracingSerial>().ToList();
					break;
				case "19":
					data = objCCustomizedDBCall.ExecuteQuery_ListOfObjects(p_3PlRepQuery.Query, typeof(PalletLabel)).Cast<PalletLabel>().ToList();
					break;
				case "20":
					data = objCCustomizedDBCall.ExecuteQuery_ListOfObjects(p_3PlRepQuery.Query, typeof(CVarvwProductReallocationLog)).Cast<CVarvwProductReallocationLog>().ToList();
					break;
				case "21":
					data = objCCustomizedDBCall.ExecuteQuery_ListOfObjects(p_3PlRepQuery.Query, typeof(CVarvwWH_ItemsLog)).Cast<CVarvwWH_ItemsLog>().ToList();
					break;
				case "106":
					data = objCCustomizedDBCall.ExecuteQuery_ListOfObjects(p_3PlRepQuery.Query, typeof(ZeroLocation)).Cast<ZeroLocation>().ToList();
					break;
				case "113":
					data = objCCustomizedDBCall.ExecuteQuery_ListOfObjects(p_3PlRepQuery.Query, typeof(ExtraService)).Cast<ExtraService>().ToList();
					break;
				case "114":
					data = objCCustomizedDBCall.ExecuteQuery_ListOfObjects(p_3PlRepQuery.Query, typeof(AllocatedItem)).Cast<AllocatedItem>().ToList();
					break;
				case "115":
					data = objCCustomizedDBCall.ExecuteQuery_ListOfObjects(p_3PlRepQuery.Query, typeof(TrackingOrder)).Cast<TrackingOrder>().ToList();
					break;
				case "116":
					data = objCCustomizedDBCall.ExecuteQuery_ListOfObjects(p_3PlRepQuery.Query, typeof(OpenShipment)).Cast<OpenShipment>().ToList();
					break;
				case "117":
					data = objCCustomizedDBCall.ExecuteQuery_ListOfObjects(p_3PlRepQuery.Query, typeof(OrderSerialDetail)).Cast<OrderSerialDetail>().ToList();
					break;
				case "118":
					data = objCCustomizedDBCall.ExecuteQuery_ListOfObjects(p_3PlRepQuery.Query, typeof(OrderByPalletClass)).Cast<OrderByPalletClass>().ToList();
					break;
				case "119":
					data = objCCustomizedDBCall.ExecuteQuery_ListOfObjects(p_3PlRepQuery.Query, typeof(CVarvwWH_ItemsLog)).Cast<CVarvwWH_ItemsLog>().ToList();
					break;
				case "121":
					data = objCCustomizedDBCall.ExecuteQuery_ListOfObjects(p_3PlRepQuery.Query, typeof(PalletLabel)).Cast<PalletLabel>().ToList();
					break;
				case "123":
					data = objCCustomizedDBCall.ExecuteQuery_ListOfObjects(p_3PlRepQuery.Query, typeof(WarehouseTransfer)).Cast<WarehouseTransfer>().ToList();
					break;
				case "124":
					data = objCCustomizedDBCall.ExecuteQuery_ListOfObjects(p_3PlRepQuery.Query, typeof(CustomerItemSummary)).Cast<CustomerItemSummary>().ToList();
					break;
				case "12201":
				case "12202":
					data = objCCustomizedDBCall.ExecuteQuery_ListOfObjects(p_3PlRepQuery.Query, typeof(CVarvwWH_ItemInquiries)).Cast<CVarvwWH_ItemInquiries>().ToList();
					break;
				case "12203":
					data = objCCustomizedDBCall.ExecuteQuery_ListOfObjects(p_3PlRepQuery.Query, typeof(CVarvwWH_SerialInquiries)).Cast<CVarvwWH_SerialInquiries>().ToList();
					break;
				default:
					break;
			}
			
			
			var serializer = new JavaScriptSerializer { MaxJsonLength = int.MaxValue };
			return serializer.Serialize(data);
		}

		[HttpGet, HttpPost]
		public object UploadExcelFile_Defected()
		{
			Exception exception = null;
			StringBuilder msg = new StringBuilder();
			CWH_ReceiveDetails objCWH_ReceiveDetails = new CWH_ReceiveDetails();
			try
			{
				var fileSavePath = "";

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
						DataSet result = reader.AsDataSet(new ExcelDataSetConfiguration()
						{
							ConfigureDataTable = (_) => new ExcelDataTableConfiguration()
							{
								UseHeaderRow = true
							}
						});

						CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();

						List<DefectedInventory> Data = new List<DefectedInventory>();
						DefectedInventory Row;
						foreach (DataRow row in result.Tables[0].Rows)
						{
							Row = new DefectedInventory
							{
								ID = row["ID"] == DBNull.Value ? 0 : Convert.ToInt64(row["ID"]),
								IsInventoryDefected = row["Is Defected"] == DBNull.Value ? 0 : Convert.ToInt32(row["Is Defected"]),
								InventoryDefectionReason = row["Reason"] == DBNull.Value ? "" : Convert.ToString(row["Reason"]),
							};
							Data.Add(Row);
						}

						foreach (var item in Data)
						{
							exception = objCWH_ReceiveDetails.UpdateList($"IsExcluded={item.IsInventoryDefected},LotNo='{item.InventoryDefectionReason}' where ID={item.ID}");
						}
					}
				}
			}
			catch (Exception ex)
			{
				exception = ex;
				msg.AppendLine($"\n{ex.Message}\n");
			}

			return new { IsUploaded = msg.Length == 0 && exception == null, Msg = msg.ToString(), Exception = exception };
		}
	}
	public class _3PlRepQuery
	{
		public string Query { get; set; }
		public string Query2 { get; set; }
		public string ReportType { get; set; }
	}
	class ZeroLocation
	{
		public string WarehouseName { get; set; }
		public string LocationCode { get; set; }
		public string RowName { get; set; }
		public string AreaName { get; set; }
		public int PalletCount { get; set; }
	}
	class ExtraService
	{
		public string Code { get; set; }
		public string CreationDate { get; set; }
		public string Notes { get; set; }
		public string ServiceName { get; set; }
		public decimal Quantity { get; set; }
	}
	class AllocatedItem
	{
		public string Code { get; set; }
		public string CreationDate { get; set; }
		public string CustomerName { get; set; }
		public string OwnerName { get; set; }
		public string PurchaseItemCode { get; set; }
		public string PurchaseItemName { get; set; }
		public string PD_PackageTypeName { get; set; }
		public string WarehouseName { get; set; }
		public string LocationCode { get; set; }
		public string PalletID { get; set; }
		public string BatchNumber { get; set; }
		public string ProductionDate { get; set; }
		public string ExpirationDate { get; set; }
		public decimal PDL_DemandedQuantity { get; set; }
	}
	class TrackingOrder
	{
		public string OrderType { get; set; }
		public string Code { get; set; }
		public string CreationDate { get; set; }
		public string FinalizeDate { get; set; }
		public string Notes { get; set; }
		public string ItemCode { get; set; }
		public string ItemName { get; set; }
		public string UOM { get; set; }
		public string BatchNumber { get; set; }
		public string ExpectedProductionDate { get; set; }
		public string ProductionDate { get; set; }
		public string ExpectedExpirationDate { get; set; }
		public string ExpirationDate { get; set; }
		public decimal ExpectedQuantity { get; set; }
		public decimal Quantity { get; set; }
		public decimal DamagedQuantity { get; set; }
	}
	class OrderSerialDetail
	{
		public string OrderType { get; set; }
		public string Code { get; set; }
		public string CreationDate { get; set; }
		public string ItemCode { get; set; }
		public string ItemName { get; set; }
		public string UOM { get; set; }
		public string Serial { get; set; }
		public string PalletID { get; set; }
		public string PalletStatusName { get; set; }
	}
	class OpenShipment
	{
		public string OrderType { get; set; }
		public string Code { get; set; }
		public string CreationDate { get; set; }
		public string WarehouseName { get; set; }
		public string OwnerName { get; set; }
		public string Notes { get; set; }
		public string CreatorName { get; set; }
		public string StatusName { get; set; }
		public int Delays { get; set; }
		public decimal ExpectedQty { get; set; }
		public decimal ActualQty { get; set; }
	}
	class OrderByPalletClass
	{
		public string OrderType { get; set; }
		public string Code { get; set; }
		public string CreationDate { get; set; }
		public string Notes { get; set; }
		public string WarehouseName { get; set; }
		public string OwnerName { get; set; }
		public string PalletClassName { get; set; }
		public int NoOfPalletClass { get; set; }
		public decimal CBM { get; set; }
	}
	class PalletLabel
	{
		public string PalletID { get; set; }
		public string ItemCode { get; set; }
		public string ItemName { get; set; }
		public string Notes { get; set; }
		public string PO { get; set; }
		public string LocationCode { get; set; }
		public string UserName { get; set; }
		public string CustomerName { get; set; }
		public decimal Quantity { get; set; }
	}
	class WarehouseTransfer
	{
		public string PickupCode { get; set; }
		public string ReceiveCode { get; set; }
		public string CustomerName { get; set; }
		public string OwnerName { get; set; }
		public string WarehouseName { get; set; }
		public string WarehouseToName { get; set; }
		public string ItemCode { get; set; }
		public string ItemName { get; set; }
		public string UOM { get; set; }
		public decimal Quantity { get; set; }
		public string PalletID { get; set; }
		public string ProductionDate { get; set; }
		public string ExpirationDate { get; set; }
		public string CreatorUserName { get; set; }
		public DateTime CreationDate { get; set; }
	}
	class DefectedInventory
	{
		public long ID { get; set; }
		public string CustomerName { get; set; }
		public string WarehouseName { get; set; }
		public string LocationCode { get; set; }
		public string PalletID { get; set; }
		public string PurchaseItemCode { get; set; }
		public string PurchaseItemName { get; set; }
		public int IsInventoryDefected { get; set; }
		public string InventoryDefectionReason { get; set; }
	}
	class ReceiveAndPickupWithService
	{
		public string Code { get; set; }
		public DateTime ReceiveDate { get; set; }
		public DateTime OrderDate { get; set; }
		public string CustomerName { get; set; }
		public string Location { get; set; }
		public string EquipmentTypeName { get; set; }
		public string DriverName { get; set; }
		public decimal ForkliftQty { get; set; }
		public decimal LaborerQty { get; set; }
		public decimal PackingQty { get; set; }
		public decimal Qty { get; set; }
		public int PalletsQty { get; set; }
		public string Cards { get; set; }
		public string Rep { get; set; }
		public string Notes { get; set; }
		public string EndUserName { get; set; }
		public string RMANumber { get; set; }
	}
	class ReceiveVsPickupByPallets
	{
		public string CustomerName { get; set; }
		public string ReceiveCode { get; set; }
		public DateTime ReceiveDate { get; set; }
		public string PickupCode { get; set; }
		public DateTime PickupDate { get; set; }
		public int PalletReceived { get; set; }
		public decimal PalletPicked { get; set; }
		public decimal PalletRemain { get; set; }
	}
	class ClientSpaceOccupied
	{
		public string CustomerName { get; set; }
		public int LocationCount { get; set; }
		public int PalletCount { get; set; }
	}
	class TracingSerial
	{
		public string Serial { get; set; }
		public string ItemCode { get; set; }
		public string ItemName { get; set; }
		public string PalletID { get; set; }
		public string LocationCode { get; set; }
		public string WarehouseName { get; set; }
		public string CustomerName { get; set; }
		public string ReceiveCode { get; set; }
		public DateTime ReceiveDate { get; set; }
		public DateTime ReceivedAt { get; set; }
		public string ReceivedBy { get; set; }
		public string PickupCode { get; set; }
		public DateTime PickupDate { get; set; }
		public DateTime PickedAt { get; set; }
		public string PickedBy { get; set; }
	}
	class CustomerItemSummary
	{
		public string CustomerName { get; set; }
		public string OwnerName { get; set; }
		public string ItemCode { get; set; }
		public string ItemName { get; set; }
		public decimal ReceivedQuantity { get; set; }
		public decimal AdjustedQuantity { get; set; }
		public decimal TransferredQuantity { get; set; }
		public decimal PickedQuantity { get; set; }
		public decimal TotalQuantity { get; set; }
		public decimal StockQuantity { get; set; }
	}
}

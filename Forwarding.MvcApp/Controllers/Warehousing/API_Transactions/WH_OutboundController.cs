using ExcelDataReader;
using Forwarding.MvcApp.Entities.Warehousing;
using Forwarding.MvcApp.Models.Administration.Settings.Generated;
using Forwarding.MvcApp.Models.Customized;
using Forwarding.MvcApp.Models.MasterData.Invoicing.Generated;
using Forwarding.MvcApp.Models.MasterData.Partners.Generated;
using Forwarding.MvcApp.Models.MasterData.Trucking.Generated;
using Forwarding.MvcApp.Models.Operations.Operations.Generated;
using Forwarding.MvcApp.Models.Warehousing.MasterData.Generated;
using Forwarding.MvcApp.Models.Warehousing.Reports.Generated;
using Forwarding.MvcApp.Models.Warehousing.Transactions.Customized;
using Forwarding.MvcApp.Models.Warehousing.Transactions.Generated;
using System;
using System.Collections.Generic;
using System.Data;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;

namespace Forwarding.MvcApp.Controllers.Warehousing.API_Transactions
{
    public class WH_OutboundController : ApiController
    {
        #region Pickup
        [HttpGet, HttpPost]
        public object[] LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned(bool pIsLoadArrayOfObjects, string pLanguage, Int32 pPageNumber, Int32 pPageSize, string pWhereClause, string pOrderBy, string pWhereClause_Warehouse = "where 1=1")
       {
            int _RowCount = 0;
            Exception checkException = null;
            CvwWH_Pickup objCvwWH_Pickup = new CvwWH_Pickup();
            CvwOperationsToRestoreInvoices objCOperations = new CvwOperationsToRestoreInvoices();

			var customers = new List<SelectListOption>();
			var warehouses = new List<SelectListOption>();
            var equipments = new List<SelectListOption>();
            var services = new List<SelectListOption>();

			CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();

			if (pIsLoadArrayOfObjects)
            {
				customers.AddRange(objCCustomizedDBCall.ExecuteQuery_ListOfObjects($"select distinct CustomerID ID, CustomerName Name from vwWH_ItemBalance where Quantity>0 ORDER BY CustomerName", typeof(SelectListOption)).Cast<SelectListOption>().ToList());
				//checkException = objCOperations.GetList("WHERE BLType <> 2");
				warehouses.AddRange(objCCustomizedDBCall.ExecuteQuery_ListOfObjects($"SELECT ID, Name FROM WH_Warehouse {pWhereClause_Warehouse} Order By Name", typeof(SelectListOption)).Cast<SelectListOption>().ToList());
				//equipments.AddRange(objCCustomizedDBCall.ExecuteQuery_ListOfObjects("SELECT ID,Name FROM TRCK_Equipments", typeof(SelectListOption)).Cast<SelectListOption>().ToList());
				services.AddRange(objCCustomizedDBCall.ExecuteQuery_ListOfObjects($"SELECT ID, Name FROM WH_Services", typeof(SelectListOption)).Cast<SelectListOption>().ToList());
            }
            var pOperationsList = objCOperations.lstCVarvwOperationsToRestoreInvoices
                .Select(s => new
                {
                    ID = s.ID,
                    Code = s.EffectiveOperationCode
                }).ToList().OrderByDescending(o => o.ID);
            checkException = objCvwWH_Pickup.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);
			
			var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
				serializer.Serialize(objCvwWH_Pickup.lstCVarvwWH_Pickup)
                , _RowCount
                , serializer.Serialize(warehouses) //pWarehouse=pData[2]
                , serializer.Serialize(customers) //pCustomer=pData[3]
                , serializer.Serialize(pOperationsList) //pOperation=pData[4]
                , serializer.Serialize(equipments) //pEquipment=pData[5]
                , serializer.Serialize(services) //pServices=pData[6]
            };
        }

        [HttpGet, HttpPost]
        public object[] LoadHeaderWithDetails(Int64 pHeaderID, bool pIsRequest)
        {
            CvwWH_Pickup objCvwWH_Pickup = new CvwWH_Pickup();
            CvwWH_PickupDetails objCvwWH_PickupDetails = new CvwWH_PickupDetails();
			CvwWH_PickupDetailsLocation objCvwWH_PickupDetailsLocation = new CvwWH_PickupDetailsLocation();
			CvwWH_RowLocation objCvwWH_RowLocation = new CvwWH_RowLocation();
            Exception checkException = null;
            int _RowCount = 0;
			var serializer = new JavaScriptSerializer { MaxJsonLength = int.MaxValue };

            checkException = objCvwWH_Pickup.GetListPaging(999999, 1, "WHERE ID=" + pHeaderID.ToString(), "ID", out _RowCount);
            checkException = objCvwWH_PickupDetails.GetListPaging(999999, 1, "WHERE PickupID=" + pHeaderID.ToString(), "ID", out _RowCount);
            checkException = objCvwWH_PickupDetailsLocation.GetListPaging(999999, 1, "WHERE PickupID=" + pHeaderID.ToString(), "ID", out _RowCount);


			#region Warehouse
			objCvwWH_RowLocation.GetList($"where WarehouseID={objCvwWH_Pickup.lstCVarvwWH_Pickup[0].WarehouseID}");
			var pLocationList = objCvwWH_RowLocation.lstCVarvwWH_RowLocation
			 .Select(s => new
			 {
				 ID = s.ID
				 ,
				 Code = s.Code
			 })
			 .Distinct().OrderBy(o => o.Code).ToList();
			#endregion
			var total =new {
				DemandedQuantity = objCvwWH_PickupDetailsLocation.lstCVarvwWH_PickupDetailsLocation.Sum(a => a.PDL_DemandedQuantity),
				PickedQuantity = objCvwWH_PickupDetailsLocation.lstCVarvwWH_PickupDetailsLocation.Sum(a => a.PickedQuantity),
			};

			//List<CVarvwWH_PickupDetailsLocation> Details = new List<CVarvwWH_PickupDetailsLocation>();
			//if (pIsRequest)
			//{
			//	var group = objCvwWH_PickupDetailsLocation.lstCVarvwWH_PickupDetailsLocation.GroupBy(a => new {a.PickupID, a.PickupDetailsID, a.PurchaseItemID, a.PurchaseItemCode, a.PurchaseItemName, a.PD_PackageTypeID, a.PackageTypeName, a.PD_AvailableQuantity });
			//	foreach (var item in group)
			//	{
			//		Details.Add(new CVarvwWH_PickupDetailsLocation
			//		{
			//			PickupID=item.Key.PickupID,
			//			PickupDetailsID = item.Key.PickupDetailsID,
			//			PurchaseItemID = item.Key.PurchaseItemID,
			//			PurchaseItemCode = item.Key.PurchaseItemCode,
			//			PurchaseItemName = item.Key.PurchaseItemName,
			//			PD_PackageTypeID = item.Key.PD_PackageTypeID,
			//			PackageTypeName = item.Key.PackageTypeName,
			//			DemandedQuantity = item.Sum(a => a.PDL_DemandedQuantity),
			//			PD_AvailableQuantity = item.Key.PD_AvailableQuantity,
			//		});
			//	}
			//}
			return new object[] {
                  serializer.Serialize(objCvwWH_Pickup.lstCVarvwWH_Pickup[0]) //pData[0]
                , serializer.Serialize(objCvwWH_PickupDetails.lstCVarvwWH_PickupDetails) //pData[1]
                , serializer.Serialize(objCvwWH_PickupDetailsLocation.lstCVarvwWH_PickupDetailsLocation) //pData[2]
                , serializer.Serialize(pLocationList) //pData[3]
                , objCvwWH_RowLocation.lstCVarvwWH_RowLocation.Find(a=>a.TypeID==2 && a.IsDefault)?.ID //pData[4]
                , total //pData[5]
            };
        }

        [HttpGet, HttpPost]
		public object[] Save([FromBody] WhPickup pWhPickup)
		{
			int _RowCount = 0;
			string strMessage = "";
			Exception checkException = null;

			var now = DateTime.Now;
			var currentUser = WebSecurity.CurrentUserId;

			CWH_Pickup objCWH_Pickup = new CWH_Pickup();
			CvwWH_Pickup objCvwWH_Pickup = new CvwWH_Pickup();
			CWH_PickupDetails objCWH_PickupDetails = new CWH_PickupDetails();
			CWH_PickupDetailsLocation objCWH_PickupDetailsLocation = new CWH_PickupDetailsLocation();
			CvwWH_PickupDetails objCvwWH_PickupDetails = new CvwWH_PickupDetails();
			CVarWH_Pickup objCVarWH_Pickup = new CVarWH_Pickup();

			if (pWhPickup.ID > 0)
				objCWH_Pickup.GetItem(pWhPickup.ID);

			if (objCWH_Pickup.lstCVarWH_Pickup.Count == 0)
				objCWH_Pickup.lstCVarWH_Pickup.Add(new CVarWH_Pickup());


			//objCWH_Pickup.lstCVarWH_Pickup[0].Code = "0";
			objCWH_Pickup.lstCVarWH_Pickup[0].WarehouseID = pWhPickup.WarehouseID;
			objCWH_Pickup.lstCVarWH_Pickup[0].WarehouseToID = pWhPickup.WarehouseToID;
			objCWH_Pickup.lstCVarWH_Pickup[0].CustomerID = pWhPickup.CustomerID;
			objCWH_Pickup.lstCVarWH_Pickup[0].OwnerID = pWhPickup.OwnerID;
			objCWH_Pickup.lstCVarWH_Pickup[0].StatusID = pWhPickup.StatusID;
			objCWH_Pickup.lstCVarWH_Pickup[0].BillTo = pWhPickup.BillTo;
			objCWH_Pickup.lstCVarWH_Pickup[0].EndUserID = pWhPickup.EndUserID;
			objCWH_Pickup.lstCVarWH_Pickup[0].OrderDate = DateTime.ParseExact(pWhPickup.OrderDate + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture);
			objCWH_Pickup.lstCVarWH_Pickup[0].RequiredDate = DateTime.ParseExact(pWhPickup.RequiredDate + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture);
			objCWH_Pickup.lstCVarWH_Pickup[0].IsFinalized = pWhPickup.IsFinalized;
			objCWH_Pickup.lstCVarWH_Pickup[0].FinalizeUserID = pWhPickup.IsFinalized ? WebSecurity.CurrentUserId : 0;
			objCWH_Pickup.lstCVarWH_Pickup[0].FinalizeDate = DateTime.ParseExact(pWhPickup.FinalizeDate + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture);
			objCWH_Pickup.lstCVarWH_Pickup[0].Notes = pWhPickup.Notes;
			objCWH_Pickup.lstCVarWH_Pickup[0].InvoiceID = 0;
			objCWH_Pickup.lstCVarWH_Pickup[0].OperationID = pWhPickup.OperationID;
			objCWH_Pickup.lstCVarWH_Pickup[0].RMANumber = pWhPickup.RMANumber;
			objCWH_Pickup.lstCVarWH_Pickup[0].PersonInChargeID = pWhPickup.PersonInChargeID;
			objCWH_Pickup.lstCVarWH_Pickup[0].PDIReceiveDetailsID = pWhPickup.PDIReceiveDetailsID;
			objCWH_Pickup.lstCVarWH_Pickup[0].EquipmentID = pWhPickup.EquipmentID;
			objCWH_Pickup.lstCVarWH_Pickup[0].DriverName = pWhPickup.DriverName;
			objCWH_Pickup.lstCVarWH_Pickup[0].DriverIdentity = pWhPickup.DriverIdentity;
			objCWH_Pickup.lstCVarWH_Pickup[0].TruckNo = pWhPickup.TruckNo;
			objCWH_Pickup.lstCVarWH_Pickup[0].ContainerNo = pWhPickup.ContainerNo;
			objCWH_Pickup.lstCVarWH_Pickup[0].SealNo = pWhPickup.SealNo;

			if (pWhPickup.ID > 0)
			{
				objCWH_Pickup.lstCVarWH_Pickup[0].ModificatorUserID = currentUser;
				objCWH_Pickup.lstCVarWH_Pickup[0].ModificationDate = now;
			}
			else
			{
				objCWH_Pickup.lstCVarWH_Pickup[0].CreatorUserID = objCWH_Pickup.lstCVarWH_Pickup[0].ModificatorUserID = currentUser;
				objCWH_Pickup.lstCVarWH_Pickup[0].CreationDate = objCWH_Pickup.lstCVarWH_Pickup[0].ModificationDate = now;
				objCWH_Pickup.lstCVarWH_Pickup[0].CreationSource = CreationSource.web.ToString();
			}
			Common.Common.ReplaceNull(objCWH_Pickup.lstCVarWH_Pickup[0]);
			checkException = objCWH_Pickup.SaveMethod(objCWH_Pickup.lstCVarWH_Pickup);

			if (checkException == null)
			{
				if (!pWhPickup.SaveMasterOnly)
				{
					pWhPickup.ID = objCWH_Pickup.lstCVarWH_Pickup[0].ID;
					
					if (objCWH_Pickup.lstCVarWH_Pickup[0].RMANumber == "1")//stock loc&pallet allocated by system
					{
						var DetailIDs = string.Join(",", pWhPickup.Details.Select(a => a.ID));
						if (string.IsNullOrEmpty(DetailIDs))
							DetailIDs = "0";
						checkException = objCWH_PickupDetailsLocation.DeleteList($"where PickupDetailsID in (select ID from WH_PickupDetails where PickupID={pWhPickup.ID} )");
						checkException = objCWH_PickupDetails.DeleteList($"where PickupID={pWhPickup.ID} and ID not in ({DetailIDs})");

						CWH_PickupDetails objCWH_PickupDetails_DB = new CWH_PickupDetails();
						objCWH_PickupDetails_DB.GetList($"where PickupID={pWhPickup.ID}");

						foreach (var item in pWhPickup.Details)
						{
							objCWH_PickupDetails.lstCVarWH_PickupDetails.Add(new CVarWH_PickupDetails
							{
								ID = item.ID,
								PickupID = pWhPickup.ID,
								PurchaseItemID = item.PurchaseItemID,
								DemandedQuantity = item.DemandedQuantity,
								PD_AvailableQuantity = item.PD_AvailableQuantity,
								PD_PackageTypeID = item.PD_PackageTypeID,

								CreationDate = item.ID > 0 ? objCWH_PickupDetails_DB.lstCVarWH_PickupDetails.Find(a => a.ID == item.ID).CreationDate : now,
								CreatorUserID = item.ID > 0 ? objCWH_PickupDetails_DB.lstCVarWH_PickupDetails.Find(a => a.ID == item.ID).CreatorUserID : currentUser,
								CreationSource = item.ID > 0 ? objCWH_PickupDetails_DB.lstCVarWH_PickupDetails.Find(a => a.ID == item.ID).CreationSource : CreationSource.web.ToString(),
								ModificationDate = now,
								ModificatorUserID = currentUser,
							});
							Common.Common.ReplaceNull(objCWH_PickupDetails.lstCVarWH_PickupDetails[objCWH_PickupDetails.lstCVarWH_PickupDetails.Count - 1]);
						}
						checkException = objCWH_PickupDetails.SaveMethod(objCWH_PickupDetails.lstCVarWH_PickupDetails);

						if (checkException == null)
						{
							var ItemsIDs = string.Join(",", pWhPickup.Details.Select(a => a.PurchaseItemID));
							if (!string.IsNullOrWhiteSpace(ItemsIDs))
							{
								WH_ItemBalance objWH_ItemBalance = new WH_ItemBalance();
								var ItemsBalance = objWH_ItemBalance.Get("*", $" PurchaseItemID in ({ItemsIDs}) and WarehouseID={pWhPickup.WarehouseID} and Quantity>IsNull(PDL_DemandedQuantity,0) and IsNull(LocationTypeID,0)=0 and IsNull(IsPalletHeld,0)=0 Order By PurchaseItemID, ISNULL(ExpirationDate,'2100-01-01'), ReceiveDate, LocationID");

								decimal demanded = 0;
								foreach (var detail in objCWH_PickupDetails.lstCVarWH_PickupDetails)
								{
									var items = ItemsBalance.Where(a => a.PurchaseItemID == detail.PurchaseItemID);
									foreach (var item in items)
									{
										if (detail.DemandedQuantity > item.Quantity - item.PDL_DemandedQuantity)
										{
											demanded = item.Quantity - item.PDL_DemandedQuantity;
											detail.DemandedQuantity -= demanded;
										}
										else
										{
											demanded = detail.DemandedQuantity;
											detail.DemandedQuantity = 0;
										}
										if (demanded > 0)
										{
											objCWH_PickupDetailsLocation.lstCVarWH_PickupDetailsLocation.Add(new CVarWH_PickupDetailsLocation
											{
												PickupDetailsID = detail.ID,
												ItemBalanceID = item.ID,
												PDL_LocationID = item.LocationID,
												PDL_PalletID = item.PalletID,
												PDL_DemandedQuantity = demanded,
												CreationDate = now,
												CreatorUserID = currentUser,
											});
											Common.Common.ReplaceNull(objCWH_PickupDetailsLocation.lstCVarWH_PickupDetailsLocation[objCWH_PickupDetailsLocation.lstCVarWH_PickupDetailsLocation.Count - 1]);
										}
										else
										{
											break;
										}
									}
								}
								checkException = objCWH_PickupDetailsLocation.SaveMethod(objCWH_PickupDetailsLocation.lstCVarWH_PickupDetailsLocation);
							}
						}
					}
				}
			}
			else
				strMessage = checkException.Message;

			if (strMessage == "")
				checkException = objCvwWH_Pickup.GetListPaging(1, 1, "WHERE ID=" + pWhPickup.ID.ToString(), "ID", out _RowCount);
			return new object[] {
				strMessage
				, pWhPickup.ID //pData[1]
                , new JavaScriptSerializer().Serialize(objCvwWH_Pickup.lstCVarvwWH_Pickup[0]) //pData[2]
                , objCvwWH_Pickup.lstCVarvwWH_Pickup[0].Code //pData[3]
                //, new JavaScriptSerializer().Serialize(objCvwWH_PickupDetails.lstCVarvwWH_PickupDetails) //pData[4]
            };
		}
		[HttpGet, HttpPost]
		public object UpdateOrders(string pUpdateClause, int pStatusID, string pIDs, bool pGenerate)
		{
			Exception exception = null;
			CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();

			if (pStatusID == 20)//release
			{
				CWH_PickupDetailsLocation objCWH_PickupDetailsLocation = new CWH_PickupDetailsLocation();

				CvwWH_PickupDetailsLocation objCvwWH_PickupDetailsLocation = new CvwWH_PickupDetailsLocation();
				objCvwWH_PickupDetailsLocation.GetList($"where PickupID in ({pIDs})");

				var ItemBalanceIDs = string.Join(",", objCvwWH_PickupDetailsLocation.lstCVarvwWH_PickupDetailsLocation.Select(a => a.ItemBalanceID));
				var ItemIDs = string.Join(",", objCvwWH_PickupDetailsLocation.lstCVarvwWH_PickupDetailsLocation.Select(a => a.PurchaseItemID));

				WH_ItemBalance objWH_ItemBalance = new WH_ItemBalance();
				var ItemsBalanceDemanded = objWH_ItemBalance.Get("*", $"ID in ({ItemBalanceIDs})");
				var ItemsBalance = objWH_ItemBalance.Get("*", $" PurchaseItemID in ({ItemIDs}) and Quantity>IsNull(PDL_DemandedQuantity,0) and IsNull(LocationTypeID,0)=0 and IsNull(IsPalletHeld,0)=0 Order By PurchaseItemID, ISNULL(ExpirationDate,'2100-01-01'), ReceiveDate");

				foreach (var pdl in objCvwWH_PickupDetailsLocation.lstCVarvwWH_PickupDetailsLocation)
				{
					var itemBalance = ItemsBalanceDemanded.Find(a => a.ID == pdl.ItemBalanceID);
					if (itemBalance.Quantity - itemBalance.PDL_DemandedQuantity >= pdl.PDL_DemandedQuantity)
						itemBalance.Quantity -= pdl.PDL_DemandedQuantity;
					else
					{
						#region ReDemand
						objCWH_PickupDetailsLocation.lstCVarWH_PickupDetailsLocation.Clear();
						
						decimal demanded = 0;
						var items = ItemsBalance.Where(a => a.WarehouseID== pdl.WarehouseID && a.PurchaseItemID == pdl.PurchaseItemID);
						foreach (var item in items)
						{
							if (item.ID == itemBalance.ID)
								item.Quantity = itemBalance.Quantity;
							if (pdl.PDL_DemandedQuantity > item.Quantity-item.PDL_DemandedQuantity)
							{
								demanded = item.Quantity - item.PDL_DemandedQuantity;
								pdl.PDL_DemandedQuantity -= demanded;
							}
							else
							{
								demanded = pdl.PDL_DemandedQuantity;
								pdl.PDL_DemandedQuantity = 0;
							}
							if (demanded > 0)
							{
								objCWH_PickupDetailsLocation.lstCVarWH_PickupDetailsLocation.Add(new CVarWH_PickupDetailsLocation
								{
									PickupDetailsID = pdl.PickupDetailsID,
									ItemBalanceID = item.ID,
									PDL_LocationID = item.LocationID,
									PDL_PalletID = item.PalletID,
									PDL_DemandedQuantity = demanded,
									CreationDate = DateTime.Now,
									CreatorUserID = WebSecurity.CurrentUserId,
								});
								Common.Common.ReplaceNull(objCWH_PickupDetailsLocation.lstCVarWH_PickupDetailsLocation[objCWH_PickupDetailsLocation.lstCVarWH_PickupDetailsLocation.Count - 1]);
							}
							else
							{
								break;
							}
						}
						if (pdl.PDL_DemandedQuantity == 0 && objCWH_PickupDetailsLocation.lstCVarWH_PickupDetailsLocation.Count>0)
						{
							objCWH_PickupDetailsLocation.SaveMethod(objCWH_PickupDetailsLocation.lstCVarWH_PickupDetailsLocation);
							objCWH_PickupDetailsLocation.DeleteList($"where ID={pdl.ID}");
						}
						#endregion
						else
						{
						exception = new Exception($"No stock available for item({pdl.PurchaseItemCode}) in order({pdl.Code})");
						break;
						}
					}
				}
			}
			else if(pStatusID== 50)//load
			{
				string query = $@"select P.Code, I.Name, Count(RDS.PickupDetailsLocationID) PickedSerials, PDL.PickedQuantity
from WH_Pickup P
left join WH_PickupDetails PD on
P.ID=PD.PickupID
left join WH_PickupDetailsLocation PDL on
PD.ID=PDL.PickupDetailsID
left join WH_ReceiveDetailsSerial RDS on
RDS.PickupDetailsLocationID=PDL.ID
left join PurchaseItem I on
PD.PurchaseItemID=I.ID
where I.BySerialNo=1 and P.ID in ({pIDs})
group by P.Code, I.Name, PDL.PickedQuantity, PDL.ID
having Count(RDS.PickupDetailsLocationID)<>PDL.PickedQuantity";

				var Items = objCCustomizedDBCall.ExecuteQuery_ListOfObjects(query, typeof(SelectListOption)).Cast<SelectListOption>().ToList();
				if(Items!=null&&Items.Count>0)
				{
					StringBuilder builder = new StringBuilder();
					foreach (var item in Items)
					{
					builder.AppendLine($"Item({item.Name}) in Order({item.Code})");
					}
					exception = new Exception($"Items must picked by serial\n{builder.ToString()}");
				}
				if (pGenerate&&exception==null)//generate new request for not picked
				{
					var now = DateTime.Now;

					CWH_Pickup objCWH_Pickup = new CWH_Pickup();
					CWH_PickupDetails objCWH_PickupDetails = new CWH_PickupDetails();
					CWH_PickupDetailsLocation objCWH_PickupDetailsLocation = new CWH_PickupDetailsLocation();

					CWH_Pickup objCWH_Pickup_DB = new CWH_Pickup();
					CvwWH_PickupDetailsLocation objCvwWH_PickupDetailsLocation = new CvwWH_PickupDetailsLocation();
					objCWH_Pickup_DB.GetList($"where StatusID=30 and ID in ({pIDs})");//PartPicked
					objCvwWH_PickupDetailsLocation.GetList($"where IsNull(PickedQuantity,0)=0 and PickupID in (select ID from WH_Pickup where StatusID=30 and ID in ({pIDs}) )");
					foreach (var item in objCWH_Pickup_DB.lstCVarWH_Pickup)
					{
						objCWH_Pickup.lstCVarWH_Pickup.Clear();
						objCWH_Pickup.lstCVarWH_Pickup.Add(new CVarWH_Pickup
						{
							WarehouseID = item.WarehouseID,
							CustomerID = item.CustomerID,
							OwnerID = item.OwnerID,
							OrderDate = DateTime.ParseExact(now.ToShortDateString() + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture),
							RequiredDate = DateTime.ParseExact(now.ToShortDateString() + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture),
							Notes = $"generated from {item.Code} " + item.Notes,
							StatusID = 10,//Created
							DriverIdentity = item.DriverIdentity,
							TruckNo = item.TruckNo,
							ContainerNo = item.ContainerNo,
							SealNo = item.SealNo,
							CreatorUserID = WebSecurity.CurrentUserId,
							CreationDate = now,
							ModificatorUserID = WebSecurity.CurrentUserId,
							ModificationDate = now,
							CreationSource=CreationSource.web.ToString()
						});
						Common.Common.ReplaceNull(objCWH_Pickup.lstCVarWH_Pickup[0]);
						exception = objCWH_Pickup.SaveMethod(objCWH_Pickup.lstCVarWH_Pickup);
						if (exception == null)
						{
							var groups = objCvwWH_PickupDetailsLocation.lstCVarvwWH_PickupDetailsLocation.Where(a => a.PickupID == item.ID).GroupBy(a => a.PickupDetailsID);
							foreach (var group in groups)
							{
								objCWH_PickupDetails.lstCVarWH_PickupDetails.Clear();

								objCWH_PickupDetails.lstCVarWH_PickupDetails.Add(new CVarWH_PickupDetails
								{
									PickupID = objCWH_Pickup.lstCVarWH_Pickup[0].ID,
									PurchaseItemID = group.First().PurchaseItemID,
									PD_PackageTypeID = group.First().PD_PackageTypeID,
									PD_AvailableQuantity = group.First().PD_AvailableQuantity,
									DemandedQuantity = group.Sum(a => a.PDL_DemandedQuantity),
									CreatorUserID = WebSecurity.CurrentUserId,
									CreationDate = now,
									ModificatorUserID = WebSecurity.CurrentUserId,
									ModificationDate = now,
									CreationSource= CreationSource.web.ToString()
								});
								Common.Common.ReplaceNull(objCWH_PickupDetails.lstCVarWH_PickupDetails[0]);
								exception = objCWH_PickupDetails.SaveMethod(objCWH_PickupDetails.lstCVarWH_PickupDetails);
								if (exception == null)
								{
									objCWH_PickupDetailsLocation.lstCVarWH_PickupDetailsLocation.Clear();
									foreach (var detail in group)
									{
										objCWH_PickupDetailsLocation.lstCVarWH_PickupDetailsLocation.Add(new CVarWH_PickupDetailsLocation
										{
											PickupDetailsID = objCWH_PickupDetails.lstCVarWH_PickupDetails[0].ID,
											PDL_DemandedQuantity = detail.PDL_DemandedQuantity,
											PDL_PalletID = detail.PDL_PalletID,
											PDL_LocationID = detail.PDL_LocationID,
											ItemBalanceID = detail.ItemBalanceID,
											CreatorUserID = WebSecurity.CurrentUserId,
											CreationDate = now,
											ModificatorUserID = WebSecurity.CurrentUserId,
											ModificationDate = now
										});
										Common.Common.ReplaceNull(objCWH_PickupDetailsLocation.lstCVarWH_PickupDetailsLocation[objCWH_PickupDetailsLocation.lstCVarWH_PickupDetailsLocation.Count - 1]);
									}
									exception = objCWH_PickupDetailsLocation.SaveMethod(objCWH_PickupDetailsLocation.lstCVarWH_PickupDetailsLocation);
									if (exception == null)
									{
										objCWH_PickupDetailsLocation.UpdateList($"ItemBalanceID=NULL where ID in ({string.Join(",", group.Select(a => a.ID))})");
									}
								}
							}
						}
					}
				}
			}
			

			if (exception == null)
			{
				exception = objCCustomizedDBCall.CallProcFunction(pUpdateClause);
			}

			return exception;
		}
		[HttpGet, HttpPost]
		public object UnPick(int pID, int pPickupID, int pItemBalanceID)
		{
			CWH_PickupDetailsLocation objCWH_PickupDetailsLocation = new CWH_PickupDetailsLocation();
			CvwWH_PickupDetailsLocation objCvwWH_PickupDetailsLocation = new CvwWH_PickupDetailsLocation();

			objCvwWH_PickupDetailsLocation.GetList($"where ID={pID}");
			var pdl = objCvwWH_PickupDetailsLocation.lstCVarvwWH_PickupDetailsLocation[0];
			Exception ex = null;
			WH_ItemBalance objWH_ItemBalance = new WH_ItemBalance();

			var itemBalance = objWH_ItemBalance.Get("*", $"ID={pItemBalanceID}");

			ex = objCWH_PickupDetailsLocation.UpdateList($"PDL_PalletID='{itemBalance[0].PalletID}', PDL_LocationID={itemBalance[0].LocationID}, PickedQuantity=0 where ID={pID}");
			if (ex == null && itemBalance[0].BySerialNo)
			{
				CWH_ReceiveDetailsSerial objCWH_ReceiveDetailsSerial = new CWH_ReceiveDetailsSerial();
				objCWH_ReceiveDetailsSerial.UpdateList($"PickupDetailsLocationID=NULL where PickupDetailsLocationID={pID}");
			}

			if (ex == null)
			{
				objCWH_PickupDetailsLocation.GetList($"where PickupDetailsID in (select ID from WH_PickupDetails where PickupID={pPickupID})");
				var picked = objCWH_PickupDetailsLocation.lstCVarWH_PickupDetailsLocation.Sum(a => a.PickedQuantity);

				CWH_Pickup objCWH_Pickup = new CWH_Pickup();
				if (picked > 0)
					ex = objCWH_Pickup.UpdateList($"ModificationDate=GetDate(), ModificatorUserID={WebSecurity.CurrentUserId}, StatusID=30 where ID={pPickupID}");//part-picked
				else
					ex = objCWH_Pickup.UpdateList($"ModificationDate=GetDate(), ModificatorUserID={WebSecurity.CurrentUserId}, StatusID=20 where ID={pPickupID}");//released
			}
			return ex;
		}
		[HttpGet, HttpPost]
		public object Relocate(string pWhereClause)
		{
			WH_ItemBalance objWH_ItemBalance = new WH_ItemBalance();
			var ItemBalance = objWH_ItemBalance.Get("*", pWhereClause);
			JavaScriptSerializer serializer = new JavaScriptSerializer { MaxJsonLength = int.MaxValue };
			return serializer.Serialize(ItemBalance);
		}
		[HttpGet, HttpPost]
		public object Relocate_Save(List<RelocateModel> pData)
		{
			Exception checkException;
			if (pData==null || pData.Count==0)
			{
				checkException = new Exception("No Data To Save");
				return checkException;
			}
			var now = DateTime.Now;
			CWH_PickupDetails objCWH_PickupDetails = new CWH_PickupDetails();
			objCWH_PickupDetails.GetList($"where PickupID={pData[0].PickupID} and PurchaseItemID={pData[0].PurchaseItemID}");
			CWH_PickupDetailsLocation objCWH_PickupDetailsLocation = new CWH_PickupDetailsLocation();

			checkException = objCWH_PickupDetailsLocation.DeleteList($"where IsNull(PickedQuantity,0)=0 and ItemBalanceID={pData[0].ItemBalanceID_Old} and PickupDetailsID = {objCWH_PickupDetails.lstCVarWH_PickupDetails[0].ID}");
			foreach (var item in pData)
			{
				objCWH_PickupDetailsLocation.lstCVarWH_PickupDetailsLocation.Add(new CVarWH_PickupDetailsLocation
				{
					PickupDetailsID = objCWH_PickupDetails.lstCVarWH_PickupDetails[0].ID,
					ItemBalanceID = item.ItemBalanceID_New,
					PDL_LocationID = item.PDL_LocationID,
					PDL_PalletID = item.PDL_PalletID,
					PDL_DemandedQuantity = item.PDL_DemandedQuantity,
					CreationDate = now,
					CreatorUserID = WebSecurity.CurrentUserId,
				});
				Common.Common.ReplaceNull(objCWH_PickupDetailsLocation.lstCVarWH_PickupDetailsLocation[objCWH_PickupDetailsLocation.lstCVarWH_PickupDetailsLocation.Count - 1]);
			}
			 checkException = objCWH_PickupDetailsLocation.SaveMethod(objCWH_PickupDetailsLocation.lstCVarWH_PickupDetailsLocation);
			return checkException;
		}
		[HttpGet, HttpPost]
        public bool Delete(String pPickupIDs)
        {
            bool _result = false;
            CWH_Pickup objCWH_Pickup = new CWH_Pickup();
            foreach (var currentID in pPickupIDs.Split(','))
            {
                objCWH_Pickup.lstDeletedCPKWH_Pickup.Add(new CPKWH_Pickup() { ID = Int64.Parse(currentID.Trim()) });
            }

            Exception checkException = objCWH_Pickup.DeleteItem(objCWH_Pickup.lstDeletedCPKWH_Pickup);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("DELETE")) // some or all of the Pickups were not deleted due to dependencies
                    _result = false;
            }
            else //deleted successfully
                _result = true;
            return _result;
        }

        [HttpGet, HttpPost]
        public object[] Finalize(Int64 pFinalizedPickupID, Int32 pIsFinalize)
        {
            string strMessage = "";
            Exception checkException = null;
            string _PickedLocationIDList = "0";
            string _ReleasedLocationIDList = "0";
            int _RowCount = 0;
            CWH_Pickup objCWH_Pickup = new CWH_Pickup();
            CvwWH_PickupDetailsLocation objCvwWH_PickupDetailsLocation = new CvwWH_PickupDetailsLocation();
            CvwWH_Inventory objCvwWH_Inventory = new CvwWH_Inventory();
            CWH_RowLocation objCWH_RowLocation = new CWH_RowLocation();
            #region Finalize
            if (pIsFinalize == 1)
            {
				checkException = objCWH_Pickup.UpdateList($"IsFinalized=1, FinalizeUserID={WebSecurity.CurrentUserId}, FinalizeDate=GETDATE() WHERE ID={pFinalizedPickupID.ToString()}");

				if (checkException == null)
                {
                    #region Set IsUsed=0 in locations for released ones
                    checkException = objCvwWH_PickupDetailsLocation.GetListPaging(999999, 1, "WHERE PickupID=" + pFinalizedPickupID, "ID", out _RowCount);
                    for (int i = 0; i < objCvwWH_PickupDetailsLocation.lstCVarvwWH_PickupDetailsLocation.Count; i++)
                        _PickedLocationIDList += "," + objCvwWH_PickupDetailsLocation.lstCVarvwWH_PickupDetailsLocation[i].LocationID;
                    if (_PickedLocationIDList != "0")
                        checkException = objCvwWH_Inventory.GetListPaging(999999, 1, "WHERE AvailableQuantity=0 AND LocationID IN (" + _PickedLocationIDList + ")", "LocationID", out _RowCount);
                    for (int i = 0; i < objCvwWH_Inventory.lstCVarvwWH_Inventory.Count; i++)
                        _ReleasedLocationIDList += "," + objCvwWH_Inventory.lstCVarvwWH_Inventory[i].LocationID;
                    if (_ReleasedLocationIDList != "0")
                        checkException = objCWH_RowLocation.UpdateList("IsUsed=0 ,StatusID = 10 WHERE ID IN (" + _ReleasedLocationIDList + ")");
                    #endregion Set IsUsed=0 in locations for released ones
                }
            }
            #endregion Finalize
            #region UnFinalize
            else
            {
				checkException = objCWH_Pickup.UpdateList($"IsFinalized=0, FinalizeUserID=null, FinalizeDate=null WHERE ID={pFinalizedPickupID.ToString()}");
				if (checkException == null)
                {
                    #region Set IsUsed=0 in locations for released ones
                    checkException = objCvwWH_PickupDetailsLocation.GetListPaging(999999, 1, "WHERE PickupID=" + pFinalizedPickupID, "ID", out _RowCount);
                    for (int i = 0; i < objCvwWH_PickupDetailsLocation.lstCVarvwWH_PickupDetailsLocation.Count; i++)
                        _PickedLocationIDList += "," + objCvwWH_PickupDetailsLocation.lstCVarvwWH_PickupDetailsLocation[i].LocationID;
                    if (_PickedLocationIDList != "0")
                        checkException = objCvwWH_Inventory.GetListPaging(999999, 1, "WHERE AvailableQuantity>0 AND LocationID IN (" + _PickedLocationIDList + ")", "LocationID", out _RowCount);
                    for (int i = 0; i < objCvwWH_Inventory.lstCVarvwWH_Inventory.Count; i++)
                        _ReleasedLocationIDList += "," + objCvwWH_Inventory.lstCVarvwWH_Inventory[i].LocationID;
                    if (_ReleasedLocationIDList != "0")
                        checkException = objCWH_RowLocation.UpdateList("IsUsed=1 WHERE ID IN (" + _ReleasedLocationIDList + ")");
                    #endregion Set IsUsed=0 in locations for released ones
                }
            }
            #endregion UnFinalize
            return new object[] {
                strMessage
            };
        }

        [HttpGet, HttpPost]
        public object[] Print(Int64 pPrintedPickupID)
        {
            string _ReturnedMessage = "";
            Exception checkException = null;
            int _RowCount = 0;
            CvwWH_Pickup objCvwWH_Pickup = new CvwWH_Pickup();
            CvwWH_PickupDetailsLocation objCvwWH_PickupDetailsLocation = new CvwWH_PickupDetailsLocation();
            CvwWH_PickupDetailsLocationSerial objCvwWH_PickupDetailsLocationSerial = new CvwWH_PickupDetailsLocationSerial();
            checkException = objCvwWH_Pickup.GetList("WHERE ID=" + pPrintedPickupID);
            checkException = objCvwWH_PickupDetailsLocation.GetListPaging(999999, 1, "WHERE PickupID=" + pPrintedPickupID, "ID", out _RowCount);
            checkException = objCvwWH_PickupDetailsLocationSerial.GetListPaging(999999, 1, "WHERE PickupID=" + pPrintedPickupID, "ID", out _RowCount);
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                _ReturnedMessage //pData[0]
                , new JavaScriptSerializer().Serialize(objCvwWH_Pickup.lstCVarvwWH_Pickup[0]) //pData[1]
                , serializer.Serialize(objCvwWH_PickupDetailsLocationSerial.lstCVarvwWH_PickupDetailsLocationSerial) //pData[2]
            };
        }
        //not used till now
        [HttpGet, HttpPost]
        public string ValidatePickup(Int64 pPickupIDToValidate)
        {
            string _MessageReturned = "";
            int _RowCount = 0;
            Exception checkException = null;
            CvwWH_PickupDetails objCvwWH_PickupDetails = new CvwWH_PickupDetails();
            CvwWH_ReceiveDetails objCvwWH_ReceiveDetails = new CvwWH_ReceiveDetails();
            checkException = objCvwWH_PickupDetails.GetListPaging(999999, 1, "WHERE PickupID=" + pPickupIDToValidate, "ID", out _RowCount);
            for (int i = 0; i < objCvwWH_PickupDetails.lstCVarvwWH_PickupDetails.Count; i++)
            {
            }
            return _MessageReturned;
        }

		[HttpGet, HttpPost]
		public object CopyOrder(int pID)
		{
			CWH_Pickup objCWH_Pickup = new CWH_Pickup();
			CvwWH_PickupDetails objCvwWH_PickupDetails = new CvwWH_PickupDetails();

			objCWH_Pickup.GetItem(pID);
			objCvwWH_PickupDetails.GetList($"where PickupID={pID}");

			if (objCWH_Pickup.lstCVarWH_Pickup.Count == 0)
			{
				return new { OrderCode = string.Empty, Exception = new Exception("Order Not Found") };
			}
			if (objCvwWH_PickupDetails.lstCVarvwWH_PickupDetails.Count == 0)
			{
				return new { OrderCode = string.Empty, Exception = new Exception("Order Items Not Found") };
			}
			var code = "";
			var p = objCWH_Pickup.lstCVarWH_Pickup[0];
			Exception exception = null;
			var DateTime_Default = new DateTime(1900, 1, 1);
			var now = DateTime.Now;
			var nowStr = DateTime.ParseExact(now.ToString("dd/MM/yyyy hh.mm.ss.fff"), "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture);
			var nowDateStr = DateTime.ParseExact(now.ToString("dd/MM/yyyy") + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture);

			var pickup = new WhPickup {
				WarehouseID = p.WarehouseID,
				WarehouseToID = p.WarehouseToID,
				CustomerID = p.CustomerID,
				OwnerID = p.OwnerID,
				OrderDate = now.ToString("dd/MM/yyyy"),
				RequiredDate = now.ToString("dd/MM/yyyy"),
				FinalizeDate = DateTime_Default.ToString("dd/MM/yyyy"),
				StatusID = 10,
				DriverName = p.DriverName,
				DriverIdentity = p.DriverIdentity,
				TruckNo = p.TruckNo,
				ContainerNo = p.ContainerNo,
				SealNo = p.SealNo,
				Notes = p.Notes,
				RMANumber="1",//allocate by system
				Details = new List<WhPickupDetail>()
			};

			WH_ItemBalance objWH_ItemBalance = new WH_ItemBalance();
			var itemIds = string.Join(",", objCvwWH_PickupDetails.lstCVarvwWH_PickupDetails.Select(a => a.PurchaseItemID));
			var stock = objWH_ItemBalance.GetAvailable(p.WarehouseID, p.CustomerID, p.OwnerID, itemIds);
			foreach (var item in objCvwWH_PickupDetails.lstCVarvwWH_PickupDetails)
			{
				pickup.Details.Add(new WhPickupDetail {
					PurchaseItemID=(int)item.PurchaseItemID,
					PD_PackageTypeID=item.PD_PackageTypeID,
					DemandedQuantity=item.DemandedQuantity,
					PD_AvailableQuantity= stock.Find(a=>a.PurchaseItemID==item.PurchaseItemID&&a.PackageTypeID==item.PD_PackageTypeID)?.Quantity??0
				});
				if(pickup.Details[pickup.Details.Count-1].DemandedQuantity> pickup.Details[pickup.Details.Count - 1].PD_AvailableQuantity)
				{
					exception = new Exception($"Balance not enough ({item.PurchaseItemCode})");
					break;
				}
			}
			if (exception == null)
			{
				var result = Save(pickup);
				if (!string.IsNullOrWhiteSpace(result[0].ToString()))
					exception = new Exception(result[0].ToString());
				else
					code = result[3].ToString();
			}
			return new { OrderCode = exception == null ? code : string.Empty, Exception = exception };
		}
		#endregion Pickup

		#region PickupDetails
		[HttpGet, HttpPost]
        public object[] PickupDetails_Save([FromBody] Pickup_SaveParamters pickup_SaveParamters)
        {
            string _MessageReturned = "";
            Exception checkException = null;
            int _RowCount = 0;
            //CVarWH_PickupDetails objCVarWH_PickupDetails = new CVarWH_PickupDetails();
            CWH_PickupDetails objCWH_PickupDetails = new CWH_PickupDetails();
            CWH_PickupDetails objCWH_PickupDetails_save = new CWH_PickupDetails();

			CWH_PickupDetailsLocation objCWH_PickupDetailsLocation = new CWH_PickupDetailsLocation();
			CvwWH_PickupDetails objCvwWH_PickupDetails = new CvwWH_PickupDetails();
			CvwWH_PickupDetailsLocation objCvwWH_PickupDetailsLocation = new CvwWH_PickupDetailsLocation();
            CWH_Pickup objCWH_Pickup = new CWH_Pickup();
            CvwWH_Pickup objCvwWH_Pickup = new CvwWH_Pickup();
            CWH_RowLocation objCWH_RowLocation = new CWH_RowLocation();
            Int64 pPickupDetailsID = 0;
            string _UpdateClause = "";
            #region Save PickupHeader
            _UpdateClause = pickup_SaveParamters.WarehouseID == 0 ? "WarehouseID=null" : ("WarehouseID=" + pickup_SaveParamters.WarehouseID) + " \n";
            _UpdateClause += pickup_SaveParamters.CustomerID == 0 ? ",CustomerID=null" : (",CustomerID=" + pickup_SaveParamters.CustomerID) + " \n";
            _UpdateClause += pickup_SaveParamters.OwnerID == 0 ? ",OwnerID=null" : (",OwnerID=" + pickup_SaveParamters.OwnerID) + " \n";
            _UpdateClause += pickup_SaveParamters.BillTo == 0 ? ",BillTo=null" : (",BillTo=" + pickup_SaveParamters.BillTo) + " \n";
            _UpdateClause += pickup_SaveParamters.EndUserID == 0 ? ",EndUserID=null" : (",EndUserID=" + pickup_SaveParamters.EndUserID) + " \n";
            _UpdateClause += pickup_SaveParamters.OrderDate == "01/01/1900" ? " ,OrderDate = NULL " : (" ,OrderDate = '" + (DateTime.ParseExact(pickup_SaveParamters.OrderDate + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture)).ToString("yyyyMMdd") + "'");
            _UpdateClause += pickup_SaveParamters.RequiredDate == "01/01/1900" ? " ,RequiredDate = NULL " : (" ,RequiredDate = '" + (DateTime.ParseExact(pickup_SaveParamters.RequiredDate + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture)).ToString("yyyyMMdd") + "'");
            ////Set from the Finalize btn or when update details for putaway
            //_UpdateClause += pStatusID == 0 ? ",StatusID=null" : (",StatusID=" + pStatusID) + " \n";
            //_UpdateClause += " , IsFinalized = " + (pIsFinalized ? "1" : "0") + " \n";
            //_UpdateClause += pFinalizeDate == "01/01/1900" ? " ,FinalizeDate = NULL " : (" ,FinalizeDate = '" + (DateTime.ParseExact(pFinalizeDate + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture)).ToString("yyyyMMdd") + "'");
            _UpdateClause += pickup_SaveParamters.HeaderNotes == "0" ? ",Notes=null" : (",Notes=N'" + pickup_SaveParamters.HeaderNotes + "'") + " \n";
            _UpdateClause += pickup_SaveParamters.OperationID == 0 ? ",OperationID=null" : (",OperationID=" + pickup_SaveParamters.OperationID) + " \n";
            _UpdateClause += pickup_SaveParamters.PersonInChargeID == 0 ? ",PersonInChargeID=null" : (",PersonInChargeID=" + pickup_SaveParamters.PersonInChargeID) + " \n";
            //_UpdateClause += pickup_SaveParamters.RMANumber == "0" ? ",RMANumber=null" : (",RMANumber=N'" + pickup_SaveParamters.RMANumber + "'") + " \n";
            _UpdateClause += pickup_SaveParamters.PickupDetailsLocations.Count>0 ? ",RMANumber=N'2'" : ",RMANumber=N'1'" + " \n";//2 if loc&pallet demanded manually else 1
            _UpdateClause += pickup_SaveParamters.DriverName == "0" ? ",DriverName=null" : (",DriverName=N'" + pickup_SaveParamters.DriverName + "'") + " \n";
            _UpdateClause += pickup_SaveParamters.EquipmentID == 0 ? ",EquipmentID=null" : (",EquipmentID=" + pickup_SaveParamters.EquipmentID) + " \n";
            _UpdateClause += " , ModificatorUserID = " + WebSecurity.CurrentUserId.ToString();
            _UpdateClause += " , ModificationDate = GETDATE() ";
            _UpdateClause += " WHERE ID = " + pickup_SaveParamters.PickupID;
            checkException = objCWH_Pickup.UpdateList(_UpdateClause);
            #endregion Save PickupHeader
            #region Save Details
            if (checkException == null)
            {
				var pickupDetails = pickup_SaveParamters.PickupDetailsLocations.GroupBy(a => a.PurchaseItemID);
				var ItemsIDs = string.Join(",", pickupDetails.Select(a => a.Key));
				objCWH_PickupDetailsLocation.DeleteList($"where PickupDetailsID in (select ID from WH_PickupDetails where PickupID={pickup_SaveParamters.PickupID})");
				objCWH_PickupDetails.DeleteList($"where PickupID={pickup_SaveParamters.PickupID} and PurchaseItemID not in ({ItemsIDs})");

				objCWH_PickupDetails.GetList($"where PickupID={pickup_SaveParamters.PickupID}");

				
				foreach (var item in pickupDetails)
				{
					objCWH_PickupDetails_save.lstCVarWH_PickupDetails.Clear();
					if (objCWH_PickupDetails.lstCVarWH_PickupDetails.Any(a => a.PurchaseItemID == item.Key))
					{
						objCWH_PickupDetails_save.lstCVarWH_PickupDetails.Add(objCWH_PickupDetails.lstCVarWH_PickupDetails.Find(a => a.PurchaseItemID == item.Key));
					}
					else
					{
						objCWH_PickupDetails_save.lstCVarWH_PickupDetails.Add(new CVarWH_PickupDetails {
							PD_PackageTypeID = item.First().PD_PackageTypeID,
							PD_AvailableQuantity = item.First().PD_AvailableQuantity,
							CreatorUserID = WebSecurity.CurrentUserId,
							CreationDate = DateTime.Now
						});
					}
					objCWH_PickupDetails_save.lstCVarWH_PickupDetails[0].PickupID = pickup_SaveParamters.PickupID;
					objCWH_PickupDetails_save.lstCVarWH_PickupDetails[0].PurchaseItemID = item.Key;
					objCWH_PickupDetails_save.lstCVarWH_PickupDetails[0].DemandedQuantity = item.Sum(a => a.PDL_DemandedQuantity);
					objCWH_PickupDetails_save.lstCVarWH_PickupDetails[0].Notes = item.First().Notes;
					objCWH_PickupDetails_save.lstCVarWH_PickupDetails[0].ModificatorUserID = WebSecurity.CurrentUserId;
					objCWH_PickupDetails_save.lstCVarWH_PickupDetails[0].ModificationDate = DateTime.Now;
					objCWH_PickupDetails_save.lstCVarWH_PickupDetails[0].CreationSource = CreationSource.web.ToString();

					checkException = objCWH_PickupDetails_save.SaveMethod(objCWH_PickupDetails_save.lstCVarWH_PickupDetails);
					if (checkException == null)
					{
						pPickupDetailsID = objCWH_PickupDetails_save.lstCVarWH_PickupDetails[0].ID;
						item.First().PickupDetailsID= objCWH_PickupDetails_save.lstCVarWH_PickupDetails[0].ID;
						#region Save PickupDetailsLocations

						CWH_ReceiveDetails objCWH_ReceiveDetails = new CWH_ReceiveDetails();
						CvwWH_ReceiveDetails objCvwWH_ReceiveDetails = new CvwWH_ReceiveDetails();
						objCvwWH_PickupDetailsLocation = new CvwWH_PickupDetailsLocation();
						foreach (var loc in item)
						{
							
							CVarWH_PickupDetailsLocation objCVarWH_PickupDetailsLocation = new CVarWH_PickupDetailsLocation();
							CWH_ReceiveDetailsSerial objCWH_ReceiveDetailsSerial = new CWH_ReceiveDetailsSerial();
							if (_RowCount > 0)
							{ //if number of checked serials is not equal to picked quantity or no serials then abort
								int _TempRowCount = 0;
								checkException = objCWH_ReceiveDetailsSerial.GetListPaging(999999, 1, "WHERE PickupDetailsLocationID=" + objCvwWH_PickupDetailsLocation.lstCVarvwWH_PickupDetailsLocation[0].ID, "ID", out _TempRowCount);
								if (objCWH_ReceiveDetailsSerial.lstCVarWH_ReceiveDetailsSerial.Count > 0
									&& loc.PickedQuantity < objCWH_ReceiveDetailsSerial.lstCVarWH_ReceiveDetailsSerial.Count)
									_MessageReturned = "Please, checked number of selected serials for location " + objCvwWH_PickupDetailsLocation.lstCVarvwWH_PickupDetailsLocation[0].LocationCode + ".";
							}

							if ((loc.PDL_DemandedQuantity > 0 || loc.PickedQuantity > 0) && _MessageReturned == "") //i have quantity so either insert or update pickupLocation
							{
								if (objCvwWH_PickupDetailsLocation.lstCVarvwWH_PickupDetailsLocation.Count == 0)
								{
									objCVarWH_PickupDetailsLocation.ID = 0;
									objCVarWH_PickupDetailsLocation.CreatorUserID = WebSecurity.CurrentUserId;
									objCVarWH_PickupDetailsLocation.CreationDate = objCVarWH_PickupDetailsLocation.ModificationDate = DateTime.Now;
									//objCVarWH_PickupDetailsLocation.VehicleActionID = pVehicleActionID;
									//objCVarWH_PickupDetailsLocation.PickedQuantity = decimal.Parse(_ArrPickedQuantity[i]);
								}
								else //Update
								{
									objCVarWH_PickupDetailsLocation.ID = objCvwWH_PickupDetailsLocation.lstCVarvwWH_PickupDetailsLocation[0].ID;
									objCVarWH_PickupDetailsLocation.CreatorUserID = objCvwWH_PickupDetailsLocation.lstCVarvwWH_PickupDetailsLocation[0].CreatorUserID;
									objCVarWH_PickupDetailsLocation.CreationDate = objCvwWH_PickupDetailsLocation.lstCVarvwWH_PickupDetailsLocation[0].CreationDate;
									objCVarWH_PickupDetailsLocation.VehicleActionID = objCvwWH_PickupDetailsLocation.lstCVarvwWH_PickupDetailsLocation[0].VehicleActionID;
									//objCVarWH_PickupDetailsLocation.PickedQuantity = objCvwWH_PickupDetailsLocation.lstCVarvwWH_PickupDetailsLocation[0].PickedQuantity + decimal.Parse(_ArrPickedQuantity[i]);
								}
								objCVarWH_PickupDetailsLocation.PDL_DemandedQuantity = loc.PDL_DemandedQuantity;
								objCVarWH_PickupDetailsLocation.PickedQuantity = loc.PickedQuantity;
								objCVarWH_PickupDetailsLocation.PickupDetailsID = pPickupDetailsID;
								objCVarWH_PickupDetailsLocation.ReceiveDetailsID = loc.ReceiveDetailsID;
								objCVarWH_PickupDetailsLocation.ItemBalanceID = loc.ItemBalanceID;
								objCVarWH_PickupDetailsLocation.PDL_LocationID = loc.PDL_LocationID;
								objCVarWH_PickupDetailsLocation.PDL_PalletID = loc.PDL_PalletID;
								objCVarWH_PickupDetailsLocation.Notes = "0";
								objCVarWH_PickupDetailsLocation.ModificatorUserID = WebSecurity.CurrentUserId;
								objCVarWH_PickupDetailsLocation.ModificationDate = DateTime.Now;

								//CWH_PickupDetailsLocation objCWH_PickupDetailsLocation = new CWH_PickupDetailsLocation();
								objCWH_PickupDetailsLocation.lstCVarWH_PickupDetailsLocation.Add(objCVarWH_PickupDetailsLocation);
								checkException = objCWH_PickupDetailsLocation.SaveMethod(objCWH_PickupDetailsLocation.lstCVarWH_PickupDetailsLocation);

							
							} //else if (decimal.Parse(_ArrPickedQuantity[i]) > 0)
							if (checkException != null)
								_MessageReturned = checkException.Message;
						} //for (int i=0;i<_ReceiveDetailsIDLength; i++) {

						#endregion Save PickupDetailsLocations
					}
				}
		
                
                checkException = objCvwWH_PickupDetails.GetList("WHERE PickupID=" + pickup_SaveParamters.PickupID + " ORDER BY ID");
                checkException = objCvwWH_PickupDetailsLocation.GetList("WHERE PickupID=" + pickup_SaveParamters.PickupID + " ORDER BY ID");
            }
			#endregion Save Details

			#region UpdateHeaderStatus
			if(objCvwWH_PickupDetails.lstCVarvwWH_PickupDetails.Count>0)
			{
				var demanded = objCvwWH_PickupDetailsLocation.lstCVarvwWH_PickupDetailsLocation.Sum(a => a.PDL_DemandedQuantity);
				var picked = objCvwWH_PickupDetailsLocation.lstCVarvwWH_PickupDetailsLocation.Sum(a => a.PickedQuantity);
				_UpdateClause = $"StatusID={(picked == demanded ? 40.ToString() : picked > 0 ? 30.ToString() : "StatusID")} where ID={pickup_SaveParamters.PickupID}";
				checkException = objCWH_Pickup.UpdateList(_UpdateClause);
			}
			#endregion

			checkException = objCvwWH_Pickup.GetList("WHERE ID=" + pickup_SaveParamters.PickupID);
			var serializer = new JavaScriptSerializer { MaxJsonLength = int.MaxValue };
			return new object[] {
                checkException == null ? true : false
                , serializer.Serialize(objCvwWH_PickupDetails.lstCVarvwWH_PickupDetails) //pData[1]
                , serializer.Serialize(objCvwWH_Pickup.lstCVarvwWH_Pickup[0]) //pData[2]
                , pPickupDetailsID //pData[3]
                , _MessageReturned //pData[4]
                , serializer.Serialize(objCvwWH_PickupDetailsLocation.lstCVarvwWH_PickupDetailsLocation) //pData[5]
            };
        }

        [HttpGet, HttpPost]
        public object[] PickupDetails_FillModalTables(Int64 pPickupID, string pPurchaseItemIDs, string pWhereClauseItemBalance, string pOrderBy, int pPageNumber, int pPageSize)
        {

			int _RowCount = 0;
			int itemBalanceTotal = 0;
            Exception checkException = null;
            Int64 pPickupDetailsID = 0;
			WH_ItemBalance itemBalance = new WH_ItemBalance();
			var ItemsBalance = itemBalance.Get("*", pWhereClauseItemBalance);
			//CvwWH_ItemBalance objCvwWH_ItemBalance = new CvwWH_ItemBalance();
			//checkException = objCvwWH_ItemBalance.GetListPaging(pPageSize, pPageNumber, pWhereClauseItemBalance, pOrderBy, out itemBalanceTotal);
			//CvwWH_ReceiveDetailsToPick objCvwWH_ReceiveDetailsToPick = new CvwWH_ReceiveDetailsToPick();
			CvwWH_PickupDetailsLocation objCvwWH_PickupDetailsLocation = new CvwWH_PickupDetailsLocation();
            CvwWH_PickupDetails objCvwWH_PickupDetails = new CvwWH_PickupDetails();
            checkException = objCvwWH_PickupDetails.GetListPaging(99999, 1, "WHERE PickupID=" + pPickupID + " AND PurchaseItemID in ("+ pPurchaseItemIDs + ")", "ID", out _RowCount);
            //if (_RowCount > 0)
            //    pPickupDetailsID = objCvwWH_PickupDetails.lstCVarvwWH_PickupDetails[0].ID;
            //checkException = objCvwWH_ReceiveDetailsToPick.GetListPaging(99999, 1, pWhereClauseReceiveDetails, "PurchaseItemID, PickedQuantity desc, ISNULL(ExpirationDate,'2100-01-01'),ReceiveDate", out _RowCount);
            checkException = objCvwWH_PickupDetailsLocation.GetListPaging(99999, 1, "WHERE PickupID=" + pPickupID + " AND PurchaseItemID in ("+ pPurchaseItemIDs + ")", "LocationCode", out _RowCount);
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
				serializer.Serialize(ItemsBalance) //pData[0]
			   , itemBalanceTotal //pData[1]
                , serializer.Serialize(objCvwWH_PickupDetailsLocation.lstCVarvwWH_PickupDetailsLocation) //pData[2]
                , serializer.Serialize(objCvwWH_PickupDetails.lstCVarvwWH_PickupDetails)//pData[3]
            };
        }

        [HttpGet, HttpPost]
        public object PickupDetails_GetAvailablePurchaseItemsForCustomer(string pWhereClause)
        {
			WH_ItemBalance objWH_ItemBalance = new WH_ItemBalance();
            List<vwItemBalance> ItemsBalance = objWH_ItemBalance.Get("*", pWhereClause);

			var Pallets = ItemsBalance.GroupBy(a => a.PalletID).Select(a => new { PalletID = a.Key, ItemIDs = string.Join(",", a.Select(b => b.PurchaseItemID)) });

			var Items = ItemsBalance
                .Select(s => new
                {
                    ID = s.PurchaseItemID
                    ,
                    Code = s.PurchaseItemCode
                    ,
                    Name = s.PurchaseItemName
                })
                .Distinct().OrderBy(o => o.Code).ToList();

			var serializer = new JavaScriptSerializer { MaxJsonLength = int.MaxValue };


			return new {
			 Items=  serializer.Serialize(Items) ,
			 Pallets =  serializer.Serialize(Pallets) ,
            };
        }

        [HttpGet, HttpPost]
        public object[] PickupDetails_Delete(string pPickupDetailsIDsToDelete, Int64 pPickupID)
        {
            Exception checkException = null;
            bool _Result = true;
            CWH_PickupDetails objCWH_PickupDetails = new CWH_PickupDetails();
            CvwWH_PickupDetails objCvwWH_PickupDetails = new CvwWH_PickupDetails();
            CvwWH_Pickup objCvwWH_Pickup = new CvwWH_Pickup();
            int _NumberOfRecords = pPickupDetailsIDsToDelete.Split(',').Length;
            for (int i = 0; i < _NumberOfRecords; i++)
            {
                Int64 _PickupDetailsID = Int64.Parse(pPickupDetailsIDsToDelete.Split(',')[i]);
                checkException = objCWH_PickupDetails.DeleteList("WHERE ID=" + _PickupDetailsID.ToString());
                if (checkException != null)
                    _Result = false;
            }
            objCvwWH_PickupDetails.GetList("WHERE PickupID=" + pPickupID.ToString());
            objCvwWH_Pickup.GetList("WHERE ID=" + pPickupID.ToString());
            return new object[] {
                _Result
                , new JavaScriptSerializer().Serialize(objCvwWH_PickupDetails.lstCVarvwWH_PickupDetails) //pData[1]
                , new JavaScriptSerializer().Serialize(objCvwWH_Pickup.lstCVarvwWH_Pickup[0]) //pData[2]
            };
        }

        [HttpGet, HttpPost]
        public object[] PickupDetails_Export(Int32 pPageNumber, Int32 pPageSize, string pWhereClauseExportPickupDetails, string pOrderBy
            ,string pCalledFrom)
        {
            int _RowCount = 0;
            Exception checkException = null;
            CvwWH_PickupDetails objvwCWH_PickupDetails = new CvwWH_PickupDetails();
            CvwWH_PickupDetailsLocation objvwCWH_PickupDetailsLocation = new CvwWH_PickupDetailsLocation();
            object pPickupDetailsList = null;
            if (pCalledFrom == "WithLocationDetails")
            {
                checkException = objvwCWH_PickupDetailsLocation.GetListPaging(pPageSize, pPageNumber, pWhereClauseExportPickupDetails, pOrderBy, out _RowCount);
                pPickupDetailsList = objvwCWH_PickupDetailsLocation.lstCVarvwWH_PickupDetailsLocation
                //.GroupBy(g => g.PickupID)
                .Select(s => new
                {
                    PickupCode = s.Code
                    ,
                    ProductCode = s.PurchaseItemCode//s.First().PurchaseItemCode
                    ,
                    ProductName = s.PurchaseItemName
                    ,
                    Quantity = s.PickedQuantity
                    ,
                    IsFinalized = s.IsFinalized
                    ,
                    Notes = s.Notes
                    ,
                    LocationCode = s.LocationCode
                    ,
                    PalletID = s.PalletID
                    ,
                    LotNo = s.LotNo //Serial
                }).ToList();
            }
            else
            {
                checkException = objvwCWH_PickupDetails.GetListPaging(pPageSize, pPageNumber, pWhereClauseExportPickupDetails, pOrderBy, out _RowCount);
                pPickupDetailsList = objvwCWH_PickupDetails.lstCVarvwWH_PickupDetails
                    //.GroupBy(g => g.PickupID)
                    .Select(s => new
                    {
                        PickupCode = s.Code
                        ,
                        ProductCode = s.PurchaseItemCode//s.First().PurchaseItemCode
                        ,
                        ProductName = s.PurchaseItemName
                        ,
                        Quantity = s.PickedQuantity
                        ,
                        IsFinalized = s.IsFinalized
                        ,
                        Notes = s.Notes
                    }).ToList();
            }
            return new object[] {
                new JavaScriptSerializer().Serialize(pPickupDetailsList)
            };
        }
        
        #endregion PickupDetails

        #region PickupDetailsSerial
        [HttpGet, HttpPost]
        public object[] PickupDetailsSerial_FillModal(long pItemBalanceID, long pPickupDetailsLocationID)
        {
			CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
			string query=$@"select RDS.*
							from WH_ReceiveDetails RD join WH_ReceiveDetailsSerial RDS on
							RD.ID=RDS.ReceiveDetailsID
							join WH_ItemBalance IB on
							RD.PurchaseItemID=IB.PurchaseItemID
							and RD.PalletID=IB.PalletID
							where IB.ID={pItemBalanceID} and (PickupDetailsLocationID={pPickupDetailsLocationID} or PickupDetailsLocationID is null)";
			List<CVarWH_ReceiveDetailsSerial> Serials = objCCustomizedDBCall.ExecuteQuery_ListOfObjects(query, typeof(CVarWH_ReceiveDetailsSerial)).Cast<CVarWH_ReceiveDetailsSerial>().ToList();
			
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                serializer.Serialize(Serials)
            };
        }
        [HttpGet, HttpPost]
        public object[] PickupDetailsSerial_Save([FromBody] PickupDetailsSerial_SaveParameters pickupDetailsSerial_SaveParameters)
        {
            string _MessageReturned = "";
            Exception checkException = null;
            CWH_ReceiveDetailsSerial objCWH_ReceiveDetailsSerial = new CWH_ReceiveDetailsSerial();
            Int64 _PickupDetailsLocationID = pickupDetailsSerial_SaveParameters.pPickupDetailsLocationID;
            checkException = objCWH_ReceiveDetailsSerial.UpdateList("PickupDetailsLocationID=NULL WHERE PickupDetailsLocationID=" + pickupDetailsSerial_SaveParameters.pPickupDetailsLocationID);
            if (checkException == null)
                checkException = objCWH_ReceiveDetailsSerial.UpdateList("PickupDetailsLocationID=" + _PickupDetailsLocationID + " WHERE ID IN (" + pickupDetailsSerial_SaveParameters.pReceiveDetailsSerialIDList + ") and ReceiveDetailsID="+ pickupDetailsSerial_SaveParameters .pReceiveDetailsID+ "");
            else
                _MessageReturned = checkException.Message;
            return new object[] {
                _MessageReturned
            };
        }
        #endregion PickupDetailsSerial

        #region PickupDetailsLocation
        [HttpGet, HttpPost]
        public object PickupDetailsLocation_PrintPDI(string pWhereClausePickupDetailsLocation)
        {
            string _ReturnedMessage = "";
            int _RowCount = 0;
            Exception checkException = null;

            CvwWH_PickupDetailsLocation objCvwWH_PickupDetailsLocation = new CvwWH_PickupDetailsLocation();
            checkException = objCvwWH_PickupDetailsLocation.GetListPaging(999999, 1, pWhereClausePickupDetailsLocation, "ID", out _RowCount);

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[]
            {
                _ReturnedMessage
                , serializer.Serialize(objCvwWH_PickupDetailsLocation.lstCVarvwWH_PickupDetailsLocation)
            };
        }
        #endregion PickupDetailsLocation

        #region ImportPickupFromExcel
        [HttpGet, HttpPost]
        public object[] PickupDetails_ImportFromExcel([FromBody] PickupExcelParam pickupExcelParam)
        {
            string pReturnedMessage = "";
            Exception checkException = null;
            int _RowCount = 0;

            var arrPurchaseItemCode = pickupExcelParam.pPurchaseItemCodeList.Split(',');
            var arrFromLocationCode = pickupExcelParam.pFromLocationList.Split(',');
            var arrQuantity = pickupExcelParam.pQuantityList.Split(',');
            int numberOfRows = arrPurchaseItemCode.Length;
            Int64 pPickupDetailsID = 0;
            Int64 pReceiveDetailsID = 0;
            string pWhereClause = "";
            string pUpdateClause = "";

            CvwWH_ReceiveDetails objCvwWH_ReceiveDetails = new CvwWH_ReceiveDetails();
            CvwWH_RowLocation objCvwWH_RowLocation = new CvwWH_RowLocation();
            CPurchaseItem objCPurchaseItem = new CPurchaseItem();
            CWH_Pickup objCWH_Pickup = new CWH_Pickup();
            CVarWH_PickupDetails objCVarWH_PickupDetails = new CVarWH_PickupDetails();
            #region check eligibility [1st iteration / it doesn't handle if the quantity exceeded in multiple rows so check again in second iteration]
            for (int i = 0; i < numberOfRows; i++)
            {
                #region Check data is written correctly
                checkException = objCPurchaseItem.GetList("WHERE Code=N'" + arrPurchaseItemCode[i] + "'");
                checkException = objCvwWH_RowLocation.GetList("WHERE WarehouseID=" + pickupExcelParam.pWarehouseID + " AND Code=N'" + arrFromLocationCode[i] + "'");
                if (objCvwWH_RowLocation.lstCVarvwWH_RowLocation.Count == 0
                    || objCPurchaseItem.lstCVarPurchaseItem.Count == 0)
                {
                    pReturnedMessage = "Please check item and locations at row " + (i + 2);
                    return new object[] { pReturnedMessage };
                }
                #endregion Check data is written correctly
                #region check ReceiveDetails is found
                else
                {
                    pReceiveDetailsID = PickupCheckEnoughQuantity(pickupExcelParam.pCustomerID
                        , objCvwWH_RowLocation.lstCVarvwWH_RowLocation[0].ID
                        , objCPurchaseItem.lstCVarPurchaseItem[0].ID, int.Parse(arrQuantity[i]));
                    if (pReceiveDetailsID == 0)
                    {
                        pReturnedMessage = "Please, check row " + (i + 2);
                        return new object[] { pReturnedMessage };
                    }
                }
                #endregion check ReceiveDetails is found
            } //for (int i = 0; i < numberOfRows; i++)
            #endregion check eligibility

            #region Save Header
            pUpdateClause = "CustomerID=" + pickupExcelParam.pCustomerID + " \n";
            pUpdateClause += ",WarehouseID=" + pickupExcelParam.pWarehouseID + " \n";
            pUpdateClause += "WHERE ID=" + pickupExcelParam.pPickupID + " \n";
            checkException = objCWH_Pickup.UpdateList(pUpdateClause);
            #endregion Save Header

            #region Picking
            for (int i = 0; i < numberOfRows; i++)
            {
                checkException = objCPurchaseItem.GetList("WHERE Code=N'" + arrPurchaseItemCode[i] + "'");
                checkException = objCvwWH_RowLocation.GetList("WHERE WarehouseID=" + pickupExcelParam.pWarehouseID + " AND Code=N'" + arrFromLocationCode[i] + "'");
                Int64 currentPurchaseItemID = objCPurchaseItem.lstCVarPurchaseItem[0].ID;
                Int32 currentLocationID = objCvwWH_RowLocation.lstCVarvwWH_RowLocation[0].ID;

                #region check current quantity
                pReceiveDetailsID = PickupCheckEnoughQuantity(pickupExcelParam.pCustomerID
                    , objCvwWH_RowLocation.lstCVarvwWH_RowLocation[0].ID
                    , objCPurchaseItem.lstCVarPurchaseItem[0].ID, int.Parse(arrQuantity[i]));
                if (pReceiveDetailsID == 0)
                {
                    pReturnedMessage = "Stopped at row " + (i + 2) + ". Previous rows are saved, please remove them and check quantities for the rest.";
                    return new object[] { pReturnedMessage };
                }
                #endregion check current quantity

                #region Row is OK so get needed data
                pWhereClause = "WHERE PickupID=" + pickupExcelParam.pPickupID + " \n";
                pWhereClause += "AND PurchaseItemID=" + currentPurchaseItemID + " \n";
                CWH_PickupDetails objCWH_PickupDetails = new CWH_PickupDetails();
                checkException = objCWH_PickupDetails.GetList(pWhereClause);
                
                if (objCWH_PickupDetails.lstCVarWH_PickupDetails.Count == 0) //Insert
                    pPickupDetailsID = 0;
                else //Update
                    pPickupDetailsID = objCWH_PickupDetails.lstCVarWH_PickupDetails[0].ID;
                #endregion Row is OK

                #region SavePickupDetailsHeader
                objCVarWH_PickupDetails.ID = pPickupDetailsID;
                objCVarWH_PickupDetails.PickupID = pickupExcelParam.pPickupID;
                objCVarWH_PickupDetails.PurchaseItemID = currentPurchaseItemID;
                if (pPickupDetailsID != 0) //update so save original creator & creation date
                {
                    CWH_PickupDetails objCGetCreationInformation = new CWH_PickupDetails();
                    objCGetCreationInformation.GetItem(pPickupDetailsID);
                    objCVarWH_PickupDetails.DemandedQuantity = (objCVarWH_PickupDetails.DemandedQuantity + int.Parse(arrQuantity[i]));
                    objCVarWH_PickupDetails.Notes = objCGetCreationInformation.lstCVarWH_PickupDetails[0].Notes;
                    objCVarWH_PickupDetails.CreatorUserID = objCGetCreationInformation.lstCVarWH_PickupDetails[0].CreatorUserID;
                    objCVarWH_PickupDetails.CreationDate = objCGetCreationInformation.lstCVarWH_PickupDetails[0].CreationDate;
                }
                else
                {
                    objCVarWH_PickupDetails.DemandedQuantity = int.Parse(arrQuantity[i]);
                    objCVarWH_PickupDetails.Notes = "0";
                    objCVarWH_PickupDetails.CreatorUserID = WebSecurity.CurrentUserId;
                    objCVarWH_PickupDetails.CreationDate = DateTime.Now;
                }
                objCVarWH_PickupDetails.ModificatorUserID = WebSecurity.CurrentUserId;
                objCVarWH_PickupDetails.ModificationDate = DateTime.Now;
                CWH_PickupDetails objCWH_PickupDetails_Save = new CWH_PickupDetails();
                objCWH_PickupDetails_Save.lstCVarWH_PickupDetails.Add(objCVarWH_PickupDetails);
                checkException = objCWH_PickupDetails_Save.SaveMethod(objCWH_PickupDetails_Save.lstCVarWH_PickupDetails);
                #endregion SavePickupDetailsHeader

                #region SavePickupDetailsLocation
                if (checkException == null)
                {
                    pPickupDetailsID = objCVarWH_PickupDetails.ID;
                    CWH_ReceiveDetails objCWH_ReceiveDetails = new CWH_ReceiveDetails();

                    CvwWH_PickupDetailsLocation objCvwWH_PickupDetailsLocation = new CvwWH_PickupDetailsLocation();
                    //for (int i = 0; i < _ReceiveDetailsIDLength; i++)
                    {
                        CWH_PickupDetailsLocation objCWH_PickupDetailsLocation = new CWH_PickupDetailsLocation();
                        CVarWH_PickupDetailsLocation objCVarWH_PickupDetailsLocation = new CVarWH_PickupDetailsLocation();
                        checkException = objCvwWH_ReceiveDetails.GetListPaging(999999, 1, "WHERE ID=" + pReceiveDetailsID, "ID", out _RowCount);
                        checkException = objCWH_PickupDetailsLocation.GetListPaging(999999, 1, "WHERE PickupDetailsID=" + pPickupDetailsID + " AND ReceiveDetailsID=" + pReceiveDetailsID, "ID", out _RowCount);
                        checkException = objCvwWH_PickupDetailsLocation.GetListPaging(999999, 1, "WHERE PickupDetailsID=" + pPickupDetailsID + " AND ReceiveDetailsID=" + pReceiveDetailsID, "ID", out _RowCount);
                        CWH_ReceiveDetailsSerial objCWH_ReceiveDetailsSerial = new CWH_ReceiveDetailsSerial();
                        if (_RowCount > 0)
                        { //if number of checked serials is not equal to picked quantity or no serials then abort
                            int _TempRowCount = 0;
                            checkException = objCWH_ReceiveDetailsSerial.GetListPaging(999999, 1, "WHERE PickupDetailsLocationID=" + objCvwWH_PickupDetailsLocation.lstCVarvwWH_PickupDetailsLocation[0].ID, "ID", out _TempRowCount);
                            if (objCWH_ReceiveDetailsSerial.lstCVarWH_ReceiveDetailsSerial.Count > 0
                                && decimal.Parse(arrQuantity[i]) < objCWH_ReceiveDetailsSerial.lstCVarWH_ReceiveDetailsSerial.Count)
                            {
                                pReturnedMessage = "Please, checked number of selected serials for location " + objCvwWH_PickupDetailsLocation.lstCVarvwWH_PickupDetailsLocation[0].LocationCode + " at row " + (i + 2);
                                return new object[] { pReturnedMessage };
                            }
                        }

                        if (decimal.Parse(arrQuantity[i]) == 0 && _RowCount > 0 && pReturnedMessage == "") //i have a picked item from location turned to 0 so delete
                        {
                            checkException = objCWH_PickupDetailsLocation.DeleteList("WHERE ID=" + objCvwWH_PickupDetailsLocation.lstCVarvwWH_PickupDetailsLocation[0].ID);
                        }
                        else if (decimal.Parse(arrQuantity[i]) > 0 && pReturnedMessage == "") //i have quantity so either insert or update pickupLocation
                        {
                            if (objCvwWH_PickupDetailsLocation.lstCVarvwWH_PickupDetailsLocation.Count == 0)
                            {
                                objCVarWH_PickupDetailsLocation.ID = 0;
                                objCVarWH_PickupDetailsLocation.CreatorUserID = WebSecurity.CurrentUserId;
                                objCVarWH_PickupDetailsLocation.CreationDate = objCVarWH_PickupDetailsLocation.ModificationDate = DateTime.Now;
                                //objCVarWH_PickupDetailsLocation.VehicleActionID = pVehicleActionID;
                                //objCVarWH_PickupDetailsLocation.PickedQuantity = decimal.Parse(_ArrPickedQuantity[i]);
                            }
                            else //Update
                            {
                                objCVarWH_PickupDetailsLocation.ID = objCvwWH_PickupDetailsLocation.lstCVarvwWH_PickupDetailsLocation[0].ID;
                                objCVarWH_PickupDetailsLocation.CreatorUserID = objCvwWH_PickupDetailsLocation.lstCVarvwWH_PickupDetailsLocation[0].CreatorUserID;
                                objCVarWH_PickupDetailsLocation.CreationDate = objCvwWH_PickupDetailsLocation.lstCVarvwWH_PickupDetailsLocation[0].CreationDate;
                                objCVarWH_PickupDetailsLocation.VehicleActionID = objCvwWH_PickupDetailsLocation.lstCVarvwWH_PickupDetailsLocation[0].VehicleActionID;
                                //objCVarWH_PickupDetailsLocation.PickedQuantity = objCvwWH_PickupDetailsLocation.lstCVarvwWH_PickupDetailsLocation[0].PickedQuantity + decimal.Parse(_ArrPickedQuantity[i]);
                            }
                            objCVarWH_PickupDetailsLocation.PickedQuantity = decimal.Parse(arrQuantity[i]);
                            objCVarWH_PickupDetailsLocation.PickupDetailsID = pPickupDetailsID;
                            objCVarWH_PickupDetailsLocation.ReceiveDetailsID = pReceiveDetailsID;
                            objCVarWH_PickupDetailsLocation.Notes = "0";
                            objCVarWH_PickupDetailsLocation.ModificatorUserID = WebSecurity.CurrentUserId;
                            objCVarWH_PickupDetailsLocation.ModificationDate = DateTime.Now;

                            //CWH_PickupDetailsLocation objCWH_PickupDetailsLocation = new CWH_PickupDetailsLocation();
                            objCWH_PickupDetailsLocation.lstCVarWH_PickupDetailsLocation.Add(objCVarWH_PickupDetailsLocation);
                            checkException = objCWH_PickupDetailsLocation.SaveMethod(objCWH_PickupDetailsLocation.lstCVarWH_PickupDetailsLocation);
                        } //else if (decimal.Parse(_ArrPickedQuantity[i]) > 0)
                        if (checkException != null)
                            pReturnedMessage = checkException.Message;
                    } //for (int i=0;i<_ReceiveDetailsIDLength; i++) {

                }

                #endregion SavePickupDetailsLocation

            } //for (int i = 0; i < numberOfRows; i++)
            #endregion Picking

            return new object[] {
                pReturnedMessage
            };
        }
        #endregion ImportPickupFromExcel

        #region UploadExcel
        [HttpGet, HttpPost]
        public object UploadExcel()
        {
            int ResultCode = 1;
            long pID = 0;
            bool AllExcelRowsAreValid = true;
            List<string> MissingFields = new List<string>();
            List<string> DefectedItemsMessage = new List<string>();
            string InvalidQuantityMessage = "";
            long.TryParse(HttpContext.Current.Request.Form[0], out pID);
            string exception = "";
            try
            {
                if (HttpContext.Current.Request.Files.AllKeys.Any())
                {
                    // Get the uploaded file from the Files collection
                    var httpPostedFile = HttpContext.Current.Request.Files[0];

                    if (httpPostedFile != null)
                    {
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
                        CPurchaseItem objCPurchaseItem = new CPurchaseItem();
                        objCPurchaseItem.GetList(" WHERE 1=1");
                        CWH_Pickup objCWH_Pickup = new CWH_Pickup();
                        objCWH_Pickup.GetItem(pID);
                        CWH_ReceiveDetailsSerial objCWH_ReceiveDetailsSerial = new CWH_ReceiveDetailsSerial();
                        objCWH_ReceiveDetailsSerial.GetList(" WHERE 1=1");
                        CCustomizedDBCall objCustomizedDBCall = new CCustomizedDBCall();
                        CWH_PickupDetails objCWH_PickupDetails = new CWH_PickupDetails();
                        CWH_PickupDetailsLocation objCWH_PickupDetailsLocation = new CWH_PickupDetailsLocation();
                        List<PickupDetailsExcelRow> ExcelRowsToBeInserted = new List<PickupDetailsExcelRow>();
                        int count = 1;
                        foreach (DataRow row in result.Tables[0].Rows)
                        {
                            PickupDetailsExcelRow pickupDetailsExcelRow = new PickupDetailsExcelRow
                            {
                                pIndex = count,
                                pPurchaseItemID = 0,
                                pReceiveDetailID = 0,
                                pReceiveDetailsSerialID = 0,
                                pPartNumber = row["Part Number"] == DBNull.Value ? "" : Convert.ToString(row["Part Number"]),
                                pQuantity = row["Quantity"] == DBNull.Value ? 0 : int.Parse(row["Quantity"].ToString()),
                                pSerialNumber = row["Serial Number"] == DBNull.Value ? "" : Convert.ToString(row["Serial Number"]),
                                pBatchNo = row["Batch Number"] == DBNull.Value ? "" : Convert.ToString(row["Batch Number"]),
                                pPO = row["PO"] == DBNull.Value ? "" : Convert.ToString(row["PO"]),
                            };
                            count++;

                            var ValidationCheck = CheckExcelRowValidation(pickupDetailsExcelRow, objCWH_ReceiveDetailsSerial, objCPurchaseItem, objCWH_Pickup) as ReturnedObjectAfterValidation;
                            ExcelRowsToBeInserted.Add(pickupDetailsExcelRow);
                            pickupDetailsExcelRow.pPurchaseItemID = ValidationCheck.PurchaseItemID;
                            pickupDetailsExcelRow.pReceiveDetailID = ValidationCheck.ReceiveDetailIDForSerial;
                            pickupDetailsExcelRow.pReceiveDetailsSerialID = ValidationCheck.ReceiveDetailSerialID;
                            MissingFields.Add(ValidationCheck.MissingFields);
                            InvalidQuantityMessage = ValidationCheck.InvalidQuantityMessage;
                            if (!ValidationCheck.IsValid)
                            {
                                AllExcelRowsAreValid = false;
                                break;
                            }
                        }
                        if (AllExcelRowsAreValid)
                        {
                            ExcelRowsToBeInserted = ExcelRowsToBeInserted
                                .OrderBy(x => x.pPartNumber)
                                .ThenBy(x => x.pQuantity)
                                .ThenByDescending(x => x.pSerialNumber)
                                .ToList();
                            foreach (PickupDetailsExcelRow row in ExcelRowsToBeInserted)
                            {
                                decimal pickedQty = 0m;
                                int index = 0;
                                decimal remainingDemand = 0m;
                                List<PurchaseItemAvailableQty> PurchaseItemAvailableQty = new List<PurchaseItemAvailableQty>();
                                List<PurchaseItemAvailableQty> PurchaseItemAvailableQtyTemp = new List<PurchaseItemAvailableQty>();
                                //Available quantity based on first in first out
                                PurchaseItemAvailableQty = objCustomizedDBCall.ExecuteQuery_ListOfObjects($" EXEC WH_PurchaseItemAvailableQty {row.pPurchaseItemID},{objCWH_Pickup.lstCVarWH_Pickup[0].CustomerID}, {objCWH_Pickup.lstCVarWH_Pickup[0].WarehouseID}", typeof(PurchaseItemAvailableQty)).Cast<PurchaseItemAvailableQty>().ToList();
                                if (row.pQuantity == 1 && row.pSerialNumber == "")
                                { 
                                    PurchaseItemAvailableQtyTemp = objCustomizedDBCall.ExecuteQuery_ListOfObjects($" EXEC WH_PurchaseItemAvailableSerials {row.pPurchaseItemID},{objCWH_Pickup.lstCVarWH_Pickup[0].CustomerID}, {objCWH_Pickup.lstCVarWH_Pickup[0].WarehouseID}", typeof(PurchaseItemAvailableQty)).Cast<PurchaseItemAvailableQty>().ToList();
                                    if (PurchaseItemAvailableQtyTemp.Count > 0)
                                    {
                                        PurchaseItemAvailableQty = PurchaseItemAvailableQtyTemp;
                                        row.pSerialNumber = PurchaseItemAvailableQty[0].Serial;
                                        PurchaseItemAvailableQty[0].AvailableQuantity = 1;
                                        row.pReceiveDetailsSerialID = (int)PurchaseItemAvailableQty[0].ReceiveDetailsSerialID;
                                    }
                                }
                                else if(row.pBatchNo != "") 
                                {
                                    PurchaseItemAvailableQty = PurchaseItemAvailableQty
                                                                .OrderByDescending(x => x.BatchNumber == row.pBatchNo)
                                                                .ThenBy(x => x)
                                                                .ToList();
                                }
                                else if (row.pPO != "")
                                {
                                    PurchaseItemAvailableQty = PurchaseItemAvailableQty
                                                                .OrderByDescending(x => x.PO == row.pPO)
                                                                .ThenBy(x => x)
                                                                .ToList();
                                }
                                if (PurchaseItemAvailableQty.Count > 0 && PurchaseItemAvailableQty[0].DefectionReason != ""){
                                    DefectedItemsMessage.Add(PurchaseItemAvailableQty[0].DefectionReason + " in product " + PurchaseItemAvailableQty[0].PurchaseItemName + " in receive order " + PurchaseItemAvailableQty[0].ReceiveCode);
                                }
                                int PickupDetailID = 0;
                                objCWH_PickupDetails.GetList(" WHERE PickupID = " + pID + " AND PurchaseItemID = " + row.pPurchaseItemID);
                                if (objCWH_PickupDetails.lstCVarWH_PickupDetails.Count == 0)
                                {
                                    objCWH_PickupDetails.SaveMethod(new List<CVarWH_PickupDetails>
                                    {
                                        new CVarWH_PickupDetails
                                        {
                                            PickupID = pID,
                                            PurchaseItemID = row.pPurchaseItemID,
                                            DemandedQuantity = 0m,
                                            Notes = "",
                                            CreatorUserID = WebSecurity.CurrentUserId,
                                            CreationDate = DateTime.Now,
                                            ModificatorUserID = WebSecurity.CurrentUserId,
                                            ModificationDate = DateTime.Now,
											CreationSource=CreationSource.xls.ToString()
                                        }
                                    });
                                    PickupDetailID = int.Parse(objCustomizedDBCall.CallStringFunction(" SELECT TOP(1)ID FROM WH_PickupDetails ORDER BY ID DESC"));
                                }
                                else
                                {
                                    PickupDetailID = (int)objCWH_PickupDetails.lstCVarWH_PickupDetails[0].ID;
                                }

                                while (pickedQty < row.pQuantity)
                                {
                                    remainingDemand = row.pQuantity - pickedQty;
                                    if (row.pReceiveDetailID == 0)
                                        pickedQty += PurchaseItemAvailableQty[index].AvailableQuantity >= remainingDemand ? remainingDemand : PurchaseItemAvailableQty[index].AvailableQuantity;
                                    else
                                        pickedQty += 1;

                                    objCWH_PickupDetailsLocation.GetList(" WHERE PickupDetailsID = " + PickupDetailID + " AND ReceiveDetailsID = " + (row.pReceiveDetailID == 0 ? PurchaseItemAvailableQty[index].ID : row.pReceiveDetailID));

                                    var ExistedPickupDetailsLocation = objCWH_PickupDetailsLocation.lstCVarWH_PickupDetailsLocation;

                                    if (ExistedPickupDetailsLocation.Count == 0)
                                    {
                                        objCWH_PickupDetailsLocation.SaveMethod(new List<CVarWH_PickupDetailsLocation>
                                {
                                    new CVarWH_PickupDetailsLocation
                                    {
                                        PickupDetailsID = PickupDetailID,
                                        ReceiveDetailsID = row.pReceiveDetailID == 0 ? PurchaseItemAvailableQty[index].ID : row.pReceiveDetailID,
                                        PickedQuantity = row.pReceiveDetailID == 0 ? (PurchaseItemAvailableQty[index].AvailableQuantity >= remainingDemand ? remainingDemand : PurchaseItemAvailableQty[index].AvailableQuantity) : 1,
                                        Notes = "",
                                        CreatorUserID = WebSecurity.CurrentUserId,
                                        CreationDate = DateTime.Now,
                                        ModificatorUserID = WebSecurity.CurrentUserId,
                                        ModificationDate = DateTime.Now,
                                        VehicleActionID = 0
                                    }
                                }       );
                                    }
                                    else
                                    {
                                        objCWH_PickupDetailsLocation.UpdateList(" PickedQuantity = " + (pickedQty + ExistedPickupDetailsLocation[0].PickedQuantity + " WHERE ID = " + ExistedPickupDetailsLocation[0].ID));
                                    }

                                    if(row.pSerialNumber != "")
                                        objCustomizedDBCall.CallStringFunction(" UPDATE WH_ReceiveDetailsSerial SET PickupDetailsLocationID = (SELECT TOP(1)ID FROM WH_PickupDetailsLocation ORDER BY ID DESC) WHERE ID = '" + row.pReceiveDetailsSerialID + "'");

                                    index++;
                                }                
                            }
                        }
                        else
                            ResultCode = 0;
                    }
                }
            }
            catch (Exception ex)
            {
                exception = ex.Message;
                ResultCode = 0;
            }
            return new
            {
                ResultCode,
                MissingFields = string.Join(",", MissingFields),
                InvalidQuantityMessage = string.Join(",", InvalidQuantityMessage),
                exception,
                DefectedItemsMessage = string.Join(",", DefectedItemsMessage)
            };
        }

        private object CheckExcelRowValidation(PickupDetailsExcelRow row, CWH_ReceiveDetailsSerial ReceiveDetailsSerials, CPurchaseItem PurchaseItems, CWH_Pickup Pickup)
        {
            CCustomizedDBCall objCustomizedDBCall = new CCustomizedDBCall();
            List<string> MissingFields = new List<string>();
            ReturnedObjectAfterValidation obj = new ReturnedObjectAfterValidation();

            //PartNumber
            if (row.pPartNumber == "" || PurchaseItems.lstCVarPurchaseItem.FirstOrDefault(x => x.PartNumber == row.pPartNumber)?.ID == null)
            {
                MissingFields.Add("PartNumber");
                obj.IsValid = false;
            }
            else
                obj.PurchaseItemID = (int)PurchaseItems.lstCVarPurchaseItem.FirstOrDefault(x => x.PartNumber == row.pPartNumber)?.ID;

            //SerialNumber
            if (row.pSerialNumber != "")
            {
                if (ReceiveDetailsSerials.lstCVarWH_ReceiveDetailsSerial.FirstOrDefault(x => x.Serial == row.pSerialNumber && x.PickupDetailsLocationID == 0 && x.ReserveDetailsLocationID == 0)?.ReceiveDetailsID == null)
                {
                    MissingFields.Add("SerialNumber");
                    obj.IsValid = false;
                }
                else
                {
                    obj.ReceiveDetailIDForSerial = (int)ReceiveDetailsSerials.lstCVarWH_ReceiveDetailsSerial.FirstOrDefault(x => x.Serial == row.pSerialNumber)?.ReceiveDetailsID;
                    obj.ReceiveDetailSerialID = (int)ReceiveDetailsSerials.lstCVarWH_ReceiveDetailsSerial.FirstOrDefault(x => x.Serial == row.pSerialNumber)?.ID;
                    CWH_Receive objCWH_Receive = new CWH_Receive();
                    objCWH_Receive.GetItem(long.Parse(objCustomizedDBCall.CallStringFunction("SELECT ReceiveID FROM WH_ReceiveDetails WHERE ID = " + obj.ReceiveDetailIDForSerial)));
                    if (!objCWH_Receive.lstCVarWH_Receive[0].IsFinalized)
                    {
                        MissingFields.Add("SerialNumber");
                        obj.IsValid = false;
                    }
                }
            }

            //Quantity
            if (!(row.pQuantity > 0))
            {
                obj.IsValid = false;
                MissingFields.Add("Quantity");
            }
            else if (obj.PurchaseItemID != 0)
            {
                //check if the demanded quantity <= available quantity
                
                List<PurchaseItemAvailableQty> PurchaseItemAvailableQty = objCustomizedDBCall.ExecuteQuery_ListOfObjects($" EXEC WH_PurchaseItemAvailableQty {obj.PurchaseItemID},{Pickup.lstCVarWH_Pickup[0].CustomerID}, {Pickup.lstCVarWH_Pickup[0].WarehouseID}", typeof(PurchaseItemAvailableQty)).Cast<PurchaseItemAvailableQty>().ToList();
                if (PurchaseItemAvailableQty.Select(x => x.AvailableQuantity).Sum() < row.pQuantity)
                {
                    obj.IsValid = false;
                    obj.InvalidQuantityMessage = $"There is no enough quantity for item in row {row.pIndex} ";
                }
            }

            obj.MissingFields = MissingFields.Count == 0 ? "" : $"Row {row.pIndex} has invalid {string.Join(",", MissingFields)}";

            return obj;
        }

        class ReturnedObjectAfterValidation
        {
            public bool IsValid { get; set; } = true;
            public string MissingFields { get; set; } = "";
            public string InvalidQuantityMessage { get; set; } = "";
            public int PurchaseItemID { get; set; } = 0;
            public int ReceiveDetailIDForSerial { get; set; } = 0;
            public int ReceiveDetailSerialID { get; set; } = 0;
        }
        class PickupDetailsExcelRow
        {
            public int pIndex { get; set; }
            public int pPurchaseItemID { get; set; }
            public int pReceiveDetailID { get; set; }
            public string pPartNumber { get; set; }
            public int pQuantity { get; set; }
            public string pSerialNumber { get; set; }
            public int pReceiveDetailsSerialID { get; set; }
            public string pBatchNo { get; set; }
            public string pPO { get; set; }
        }
        class PurchaseItemAvailableQty
        {
            public long ID { get; set; }
            public string ReceiveCode { get; set; }
            public long PurchaseItemID { get; set; }
            public string PurchaseItemCode { get; set; }
            public decimal AvailableQuantity { get; set; }
            public long ReceiveDetailsSerialID { get; set; }
            public string Serial { get; set; }
            public string DefectionReason { get; set; }
            public string PurchaseItemName { get; set; }
            public string BatchNumber { get; set; }
            public string PO { get; set; }

        }
        #endregion

        #region Static Functions
        //[HttpGet, HttpPost]
        public static Int64 PickupCheckEnoughQuantity(Int32 pCustomerID, Int32 pLocationID
            , Int64 pPurchaseItemID, int pQuantity)
        {
            //string pReturnedMessage = "";
            string pWhereClause = "";
            int _RowCount = 0;
            Int64 pReceiveDetailsID = 0;
            Exception checkException = null;
            CvwWH_ReceiveDetails objCvwWH_ReceiveDetails = new CvwWH_ReceiveDetails();
            pWhereClause = "WHERE IsFinalized=1 AND OperationVehicleID IS NULL" + " \n";
            pWhereClause += "AND LocationID=" + pLocationID + " \n";
            pWhereClause += "AND PurchaseItemID=" + pPurchaseItemID + " \n";
            pWhereClause += "AND CustomerID=" + pCustomerID + " \n";
            //pWhereClause += "AND WarehouseID=" + pickupExcelParam.pWarehouseID + " \n"; //already LocationID fulfills
            pWhereClause += "AND (Quantity - FinalizedPickedQuantity) > " + pQuantity + " \n";

            checkException = objCvwWH_ReceiveDetails.GetListPaging(1, 1, pWhereClause, "ID", out _RowCount);
            if (_RowCount > 0)
                pReceiveDetailsID = objCvwWH_ReceiveDetails.lstCVarvwWH_ReceiveDetails[0].ID;
            return pReceiveDetailsID;
        }
        #endregion Static Functions

		[HttpGet,HttpPost]
		public object LoadAvailableItems(string pSelectClause, string pWhereClause)
		{
			WH_ItemBalance objWH_ItemBalance = new WH_ItemBalance();
			var items = objWH_ItemBalance.Get(pSelectClause, pWhereClause);
	
			JavaScriptSerializer serializer = new JavaScriptSerializer { MaxJsonLength = int.MaxValue };
			return new { Items = serializer.Serialize(items) };
		}

		[HttpGet,HttpPost]
		public object PickOrders(string pIDs)
		{
			Exception exception = null;
			CWH_Pickup objCWH_Pickup = new CWH_Pickup();
			CWH_PickupDetailsLocation objCWH_PickupDetailsLocation = new CWH_PickupDetailsLocation();

			exception = objCWH_PickupDetailsLocation.UpdateList($"PickedQuantity=PDL_DemandedQuantity where PickupDetailsID in (select ID from WH_PickupDetails where PickupID in({pIDs}))");
			if(exception==null)
			{
				exception = objCWH_Pickup.UpdateList($"StatusID=40, ModificatorUserID={WebSecurity.CurrentUserId}, ModificationDate=GetDate() where ID in ({pIDs})");
			}
			return new { IsPicked = exception == null, Exception = exception };
		}

		[HttpGet, HttpPost]
		public object UploadExcelFile_Pickup()
		{
			Exception exception = null;
			StringBuilder msg = new StringBuilder();
			long PickupID = 0;
			CWH_Pickup objCWH_Pickup = new CWH_Pickup();
			CWH_PickupDetails objCWH_PickupDetails = new CWH_PickupDetails();
			CWH_PickupDetailsLocation objCWH_PickupDetailsLocation = new CWH_PickupDetailsLocation();
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

						var DateTime_Default = new DateTime(1900, 1, 1);
						var now = DateTime.Now;
						//var nowStr = DateTime.ParseExact(now.ToString("dd/MM/yyyy hh.mm.ss.fff"), "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture);
						var nowDateStr = now;// DateTime.ParseExact(now.ToString("dd/MM/yyyy") + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture);

						WH_ItemBalance objWH_ItemBalance = new WH_ItemBalance();

						CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();

						List<StockTemplate> Details = new List<StockTemplate>();
						StockTemplate Detail;

						foreach (DataTable table in result.Tables)
						{
							PickupID = 0;
							Details.Clear();
							objCWH_Pickup.lstCVarWH_Pickup.Clear();
							objCWH_PickupDetails.lstCVarWH_PickupDetails.Clear();
							objCWH_PickupDetailsLocation.lstCVarWH_PickupDetailsLocation.Clear();
							var sheetName = table.TableName.Split('-')[0].Trim();
							var Owners = objCCustomizedDBCall.ExecuteQuery_ListOfObjects($"select ID, CustomerId from Owners where Name=N'{sheetName}' or LocalName=N'{sheetName}'", typeof(CVarOwners)).Cast<CVarOwners>().ToList();

							if (Owners == null || Owners.Count == 0)
							{
								msg.AppendLine($"\n*Project({table.TableName})\n");
								msg.AppendLine($"-Not found!\n");
								continue;
							}
							else if (Owners[0].CustomerId == 0)
							{
								msg.AppendLine($"\n*Project({table.TableName})\n");
								msg.AppendLine($"-Not related to owner!\n");
								continue;
							}


							foreach (DataRow row in result.Tables[table.TableName].Rows)
							{
								Detail = new StockTemplate
								{
									WarehouseCode = row["WarehouseCode"] == DBNull.Value ? "" : Convert.ToString(row["WarehouseCode"]),
									ItemCode = row["ItemCode"] == DBNull.Value ? "" : Convert.ToString(row["ItemCode"]),
									UnitName = row["UOM"] == DBNull.Value ? "" : Convert.ToString(row["UOM"]),
									Quantity = row["Quantity"] == DBNull.Value ? 0 : Convert.ToDecimal(row["Quantity"]),
									ContainerNumber = row["ContainerNumber"] == DBNull.Value ? "" : Convert.ToString(row["ContainerNumber"]),
									Notes = row["Notes"] == DBNull.Value ? "" : Convert.ToString(row["Notes"]),
									WarehouseToCode = row["WarehouseToCode"] == DBNull.Value ? "" : Convert.ToString(row["WarehouseToCode"]),
								};
								Details.Add(Detail);
							}


							if (Details.Count == 0)
							{
								msg.AppendLine($"\n*Project({table.TableName})\n");
								msg.AppendLine($"-No Data!\n");
								continue;
							}
							if (Details.Any(a => a.Quantity == 0))
							{
								msg.AppendLine($"\n*Project({table.TableName})\n");
								msg.AppendLine($"-Quantity can't be 0!\n");
								continue;
							}
							if (string.IsNullOrWhiteSpace(Details[0].WarehouseCode))
							{
								msg.AppendLine($"\n*Project({table.TableName})\n");
								msg.AppendLine($"-Warehouse is mandatory!\n");
								continue;
							}
							if (Details.GroupBy(a => a.WarehouseCode).Count() > 1)
							{
								msg.AppendLine($"\n*Project({table.TableName})\n");
								msg.AppendLine($"-Multiple warehouses not allowed!\n");
								continue;
							}
							var warehouseId = objCCustomizedDBCall.CallStringFunction($"select ID from WH_Warehouse where Code =N'{Details[0].WarehouseCode}'");
							var warehouseToId = objCCustomizedDBCall.CallStringFunction($"select ID from WH_Warehouse where Code =N'{Details[0].WarehouseToCode}'");
							if (string.IsNullOrWhiteSpace(warehouseId))
							{
								msg.AppendLine($"\n*Project({table.TableName})\n");
								msg.AppendLine($"-Warehouse({Details[0].WarehouseCode}) not found!\n");
								continue;
							}
							if (string.IsNullOrWhiteSpace(warehouseToId))
							{
								warehouseToId = "0";
							}
							var itemCodes = "N'" + string.Join("',N'", Details.Select(a => a.ItemCode).Distinct()) + "'";
							var Items = objCCustomizedDBCall.ExecuteQuery_ListOfObjects($"select ID, Code, PackageTypeID, PackageTypeName from vwPurchaseItem where OwnerID={Owners[0].ID} and Code in ({itemCodes})", typeof(CVarvwPurchaseItem)).Cast<CVarvwPurchaseItem>().ToList();
							if (Items == null || Items.Count == 0)
							{
								msg.AppendLine($"\n*Project({table.TableName})\n");
								msg.AppendLine($"-Items not found!\n");
								continue;
							}
							
							if(Details.GroupBy(a=>new { a.ItemCode, a.UnitName }).Any(a=>a.Count()>1))
							{
								msg.AppendLine($"\n*Project({table.TableName})\n");
								msg.AppendLine($"-Item and Unit can't be repeated!\n({string.Join("\n", Details.GroupBy(a => new { a.ItemCode, a.UnitName }).Where(a=>a.Count()>1).Select(a=>new { Item=a.Key.ItemCode, Unit=a.Key.UnitName}))})\n");
								continue;
							}

							var IsValid = true;
							foreach (var detail in Details)
							{
								detail.ItemID = Items.Find(a => a.Code.ToLower() == detail.ItemCode.ToLower())?.ID ?? 0;
								if (detail.ItemID == 0)
								{
									msg.AppendLine($"\n*Project({table.TableName})\n");
									msg.AppendLine($"-Item({detail.ItemCode}) not found!\n");
									IsValid = false;
									break;
								}

								detail.UnitID = Items.Find(a => a.ID == detail.ItemID && a.PackageTypeName?.ToLower() == detail.UnitName.ToLower())?.PackageTypeID ?? 0;
								if (detail.UnitID == 0)
								{
									msg.AppendLine($"\n*Project({table.TableName})\n");
									msg.AppendLine($"-Unit({detail.UnitName}) not related to item({detail.ItemCode})!\n");
									IsValid = false;
									break;
								}
								
							}
							if (!IsValid)
								continue;
							objCWH_Pickup.lstCVarWH_Pickup.Add(new CVarWH_Pickup
							{
								WarehouseID = Convert.ToInt32(warehouseId),
								WarehouseToID = Convert.ToInt32(warehouseToId),
								CustomerID = Owners[0].CustomerId,
								OwnerID = Owners[0].ID,
								OrderDate = nowDateStr,
								RequiredDate = nowDateStr,
								StatusID = 10,
								ContainerNo = Details[0].ContainerNumber,
								Notes = Details[0].Notes,
								CreationDate = now,
								CreatorUserID = WebSecurity.CurrentUserId,
								ModificationDate = now,
								ModificatorUserID = WebSecurity.CurrentUserId,
								CreationSource=CreationSource.xls.ToString()
							});
							Common.Common.ReplaceNull(objCWH_Pickup.lstCVarWH_Pickup[0]);
							exception = objCWH_Pickup.SaveMethod(objCWH_Pickup.lstCVarWH_Pickup);
							if (exception == null)
							{
								objCWH_PickupDetails.lstCVarWH_PickupDetails.Clear();
								PickupID = objCWH_Pickup.lstCVarWH_Pickup[0].ID;
								foreach (var detail in Details)
								{
									objCWH_PickupDetails.lstCVarWH_PickupDetails.Add(new CVarWH_PickupDetails
									{
										PickupID = PickupID,
										PurchaseItemID = detail.ItemID,
										PD_PackageTypeID = (int)detail.UnitID,
										DemandedQuantity = detail.Quantity,
										CreationDate = now,
										CreatorUserID = WebSecurity.CurrentUserId,
										ModificationDate = now,
										ModificatorUserID = WebSecurity.CurrentUserId,
										CreationSource=CreationSource.xls.ToString()
									});
									Common.Common.ReplaceNull(objCWH_PickupDetails.lstCVarWH_PickupDetails[objCWH_PickupDetails.lstCVarWH_PickupDetails.Count - 1]);
								}
								exception = objCWH_PickupDetails.SaveMethod(objCWH_PickupDetails.lstCVarWH_PickupDetails);
								if (exception == null)
								{
									objCWH_PickupDetailsLocation.lstCVarWH_PickupDetailsLocation.Clear();
									var ItemsIDs = string.Join(",", objCWH_PickupDetails.lstCVarWH_PickupDetails.Select(a => a.PurchaseItemID));
									if (!string.IsNullOrWhiteSpace(ItemsIDs))
									{
										var ItemsBalance = objWH_ItemBalance.Get("*", $" PurchaseItemID in ({ItemsIDs}) and WarehouseID={objCWH_Pickup.lstCVarWH_Pickup[0].WarehouseID} and Quantity>IsNull(PDL_DemandedQuantity,0) and IsNull(LocationTypeID,0)=0 and IsNull(IsPalletHeld,0)=0 Order By PurchaseItemID, ISNULL(ExpirationDate,'2100-01-01'), ReceiveDate");

										decimal demanded = 0;
										foreach (var detail in objCWH_PickupDetails.lstCVarWH_PickupDetails)
										{
											var items = ItemsBalance.Where(a => a.PurchaseItemID == detail.PurchaseItemID);
											foreach (var item in items)
											{
												if (detail.DemandedQuantity > item.Quantity - item.PDL_DemandedQuantity)
												{
													demanded = item.Quantity - item.PDL_DemandedQuantity;
													detail.DemandedQuantity -= demanded;
												}
												else
												{
													demanded = detail.DemandedQuantity;
													detail.DemandedQuantity = 0;
												}
												if (demanded > 0)
												{
													objCWH_PickupDetailsLocation.lstCVarWH_PickupDetailsLocation.Add(new CVarWH_PickupDetailsLocation
													{
														PickupDetailsID = detail.ID,
														ItemBalanceID = item.ID,
														PDL_LocationID = item.LocationID,
														PDL_PalletID = item.PalletID,
														PDL_DemandedQuantity = demanded,
														CreationDate = now,
														CreatorUserID = WebSecurity.CurrentUserId,
													});
													Common.Common.ReplaceNull(objCWH_PickupDetailsLocation.lstCVarWH_PickupDetailsLocation[objCWH_PickupDetailsLocation.lstCVarWH_PickupDetailsLocation.Count - 1]);
												}
												else
												{
													break;
												}
											}
										}
										exception = objCWH_PickupDetailsLocation.SaveMethod(objCWH_PickupDetailsLocation.lstCVarWH_PickupDetailsLocation);
									}
								}
								else
								{
									exception = objCWH_PickupDetailsLocation.DeleteList($"where PickupDetailsID in (select ID from WH_PickupDetails where PickupID={PickupID})");
									exception = objCWH_PickupDetails.DeleteList($"where PickupID={PickupID}");
									exception = objCWH_Pickup.DeleteList($"where ID={PickupID}");
								}
							}
						}
					}
				}
			}
			catch (Exception ex)
			{
				if (PickupID > 0)
				{
					exception = objCWH_PickupDetailsLocation.DeleteList($"where PickupDetailsID in (select ID from WH_PickupDetails where PickupID={PickupID})");
					exception = objCWH_PickupDetails.DeleteList($"where PickupID={PickupID}");
					exception = objCWH_Pickup.DeleteList($"where ID={PickupID}");
				}
				exception = ex;
				msg.AppendLine($"\n{ex.Message}\n");
			}

			return new { IsUploaded = msg.Length == 0 && exception == null, Msg = msg.ToString(), Exception = exception };
		}
	}
	//#region POST Parameters
	public class Pickup_SaveParamters
	{
		//HeaderParameters
		public Int64 PickupID { get; set; }
		public Int32 WarehouseID { get; set; }
		public Int32 CustomerID { get; set; }
		public Int32 OwnerID { get; set; }
		public Int32 BillTo { get; set; }
		public Int32 EndUserID { get; set; }
		public string OrderDate { get; set; }
		public string RequiredDate { get; set; }
		public bool IsFinalized { get; set; }
		public string FinalizeDate { get; set; }
		public string HeaderNotes { get; set; }
		public Int64 OperationID { get; set; }
		public string RMANumber { get; set; }
		public Int32 PersonInChargeID { get; set; }
		//PickupDetailsParameters
		public Int64 PickupDetailsID { get; set; }
		public Int64 PurchaseItemID { get; set; }
		public int PD_PackageTypeID { get; set; }
		public Decimal DemandedQuantity { get; set; }
		public Decimal PD_AvailableQuantity { get; set; }
		public string Notes { get; set; }
		public List<PickupDetails_SaveParamters> PickupDetails { get; set; }
		//PickupDetailsLocationsParameters
		public string ReceiveDetailsIDList { get; set; }
		public string ReceiveDetailsPickedQuantityList { get; set; }
		public string ReceiveDetailsDemandedQuantityList { get; set; }
		public string DriverName { get; set; }
		public int EquipmentID { get; set; }
		public int StatusID { get; set; }
		public List<PickupDetailsLocation_SaveParameters> PickupDetailsLocations { get; set; }
	}
	public class PickupDetailsLocation_SaveParameters
	{
		public int PurchaseItemID { get; set; }
		public long ReceiveDetailsID { get; set; }
		public long PickupDetailsID { get; set; }
		public decimal AvailableQuantity { get; set; }
		public decimal PDL_DemandedQuantity { get; set; }
		public decimal PickedQuantity { get; set; }
		public int PDL_LocationID { get; set; }
		public string PDL_PalletID { get; set; }

		public int PD_PackageTypeID { get; set; }
		public decimal PD_AvailableQuantity { get; set; }
		public decimal DemandedQuantity { get; set; }
		public string Notes { get; set; }
		public long ItemBalanceID { get; set; }
	}
	public class RelocateModel
	{
		public long ItemBalanceID_Old { get; set; }
		public long ItemBalanceID_New { get; set; }
		public int PickupID { get; set; }
		public int PurchaseItemID { get; set; }
		public decimal PDL_DemandedQuantity { get; set; }
		public string PDL_PalletID { get; set; }
		public int PDL_LocationID { get; set; }
	}

	//public class PickupDetails_SaveParamters
	//{
	//	public Int64 PickupDetailsID { get; set; }
	//	public Int64 PurchaseItemID { get; set; }
	//	public int PD_PackageTypeID { get; set; }
	//	public Decimal DemandedQuantity { get; set; }
	//	public Decimal PD_AvailableQuantity { get; set; }
	//	public string Notes { get; set; }
	//}
	//public class PickupDetailsSerial_SaveParameters
	//{
	//	public Int64 pPickupDetailsLocationID { get; set; }
	//	public Int64 pReceiveDetailsID { get; set; }
	//	public string pReceiveDetailsSerialIDList { get; set; }
	//}
	//public class PickupExcelParam
	//{
	//	//public string pCustomerNameList { get; set; }
	//	public Int64 pPickupID;
	//	public Int32 pWarehouseID;
	//	public Int32 pCustomerID;
	//	public string pPurchaseItemCodeList { get; set; }
	//	public string pFromLocationList { get; set; }
	//	public string pQuantityList { get; set; }
	//}
	//#endregion POST Parameters
}

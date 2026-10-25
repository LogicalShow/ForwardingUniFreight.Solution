using Forwarding.MvcApp.Entities.Warehousing;
using Forwarding.MvcApp.Models.Customized;
using Forwarding.MvcApp.Models.Warehousing.MasterData.Generated;
using Forwarding.MvcApp.Models.Warehousing.Transactions.Customized;
using Forwarding.MvcApp.Models.Warehousing.Transactions.Generated;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;

namespace Forwarding.MvcApp.Controllers.Warehousing.API_Reports
{
	public class WH_LocationMoveController : ApiController
	{
		[HttpGet, HttpPost]
		public object LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned(bool pIsLoadArrayOfObjects, string pLanguage, Int32 pPageNumber, Int32 pPageSize, string pWhereClause, string pOrderBy, string pWhereClause_Warehouse)
		{
			int _RowCount = 0;

			CvwWH_LocationMove objCvwWH_LocationMove = new CvwWH_LocationMove();
			objCvwWH_LocationMove.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);

			var warehouses = new List<SelectListOption>();
			var status = new List<SelectListOption>();
			if (pIsLoadArrayOfObjects)
			{
				CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
				warehouses.AddRange(objCCustomizedDBCall.ExecuteQuery_ListOfObjects($"select ID, Name from WH_Warehouse {pWhereClause_Warehouse}", typeof(SelectListOption)).Cast<SelectListOption>());
				status.AddRange(objCCustomizedDBCall.ExecuteQuery_ListOfObjects($"select ID, Name from PalletStatus", typeof(SelectListOption)).Cast<SelectListOption>());
			}

			var serializer = new JavaScriptSerializer { MaxJsonLength = int.MaxValue };

			return new object[] {
				serializer.Serialize(objCvwWH_LocationMove.lstCVarvwWH_LocationMove)
				, _RowCount
				, serializer.Serialize(warehouses)
				, serializer.Serialize(status)
			};
		}

		[HttpGet, HttpPost]
		public object LoadDetails(string pWhereClause, bool pByPallet, bool pByItem)
		{
			WH_ItemBalance objWH_ItemBalance = new WH_ItemBalance();
			var details = new List<vwItemBalance>();
			if (pByPallet)
			{
				details.AddRange(objWH_ItemBalance.Get($" distinct PalletID, LocationID, LocationCode ", pWhereClause));
			}
			else if (pByItem)
			{
				details.AddRange(objWH_ItemBalance.Get($" * ", pWhereClause));
			}
			//if (details.Count > 0 && details.Select(a => a.LocationID).Distinct().Count() > 1)
			//	details.Clear();
			var serializer = new JavaScriptSerializer { MaxJsonLength = int.MaxValue };
			return new
			{
				Details = serializer.Serialize(details)
			};
		}

		[HttpGet, HttpPost]
		public object LoadLocations(string pWhereClause)
		{
			CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();

			var locations = objCCustomizedDBCall.ExecuteQuery_ListOfObjects($"select ID, Code from vwWH_RowLocation {pWhereClause}", typeof(SelectListOption)).Cast<SelectListOption>();

			var serializer = new JavaScriptSerializer { MaxJsonLength = int.MaxValue };
			return new[]
			{
				 serializer.Serialize(locations),
			};
		}

		[HttpGet, HttpPost]
		public object Save(LocationMove pLocationMove)
		{
			Exception checkException = null;
	

			if (pLocationMove == null || ((pLocationMove.ByPallet || pLocationMove.ByItem) && pLocationMove.Details?.Count == 0))
			{
				checkException = new Exception("No Data To Save");
				return new { Result = false, Exception = checkException };
			}

			var done = false;
			var now = DateTime.Now;
			var userId = WebSecurity.CurrentUserId;
			WH_ItemBalance objWH_ItemBalance = new WH_ItemBalance();
			List<vwItemBalance> ItemsBalance = new List<vwItemBalance>();

			CWH_QualityActionsLog objCWH_QualityActionsLog = new CWH_QualityActionsLog();
			CWH_LocationMoveDetails objCWH_LocationMoveDetails = new CWH_LocationMoveDetails();

			if (pLocationMove.ByItem)
			{
				var IDs = string.Join(",", pLocationMove.Details.Select(a => a.ItemBalanceID));
				ItemsBalance.AddRange(objWH_ItemBalance.GetItemsBalanceToMove($"ID in ({IDs})"));
				foreach (var detail in pLocationMove.Details)
				{
					done = false;
					var itemBalance = ItemsBalance.Find(a => a.ID == detail.ItemBalanceID);
					if (itemBalance.Quantity > 0 && itemBalance.ItemBalanceID == 0)//move all
					{
						if (detail.MovedQuantity == detail.CurrentQuantity)
						{
							string str = $"update WH_ItemBalance set ModificatorUserID={userId}, ModificationDate=GetDate(), LocationID={detail.ToLocationID}, PalletID='{detail.ToPalletID}' where ID={itemBalance.ID};";
							done = objWH_ItemBalance.Update(str);
							
						}
						else if (detail.MovedQuantity < detail.CurrentQuantity)
						{
							string str = $"update WH_ItemBalance set ModificatorUserID={userId}, ModificationDate=GetDate(), Quantity={detail.CurrentQuantity - detail.MovedQuantity} where ID={itemBalance.ID};";
							done = objWH_ItemBalance.Update(str);
							if (done)
							{
								List<ItemBalance> lst = new List<ItemBalance>();
								lst.Add(new ItemBalance
								{
									LocationID = detail.ToLocationID,
									PalletStatusID = pLocationMove.ToPalletStatusID > 0 ? pLocationMove.ToPalletStatusID : itemBalance.PalletStatusID,
									PalletID = detail.ToPalletID,
									Quantity = detail.MovedQuantity,
									PurchaseItemID = itemBalance.PurchaseItemID,
									PackageTypeID = itemBalance.PackageTypeID,
									BatchNumber = itemBalance.BatchNumber,
									BatchStatusID = itemBalance.BatchStatusID,
									PalletClassID = itemBalance.PalletClassID,
									ReceiveDate = itemBalance.ReceiveDate,
									ProductionDate = itemBalance.ProductionDate,
									ExpirationDate = itemBalance.ExpirationDate
								});
								done = objWH_ItemBalance.Add(lst);
							}
						}
					}
					else if (itemBalance.Quantity > 0 && itemBalance.ItemBalanceID > 0)//move remain
					{
						if (detail.MovedQuantity == detail.CurrentQuantity)
						{
							string str = $"update WH_ItemBalance set ModificatorUserID={userId}, ModificationDate=GetDate(), Quantity={itemBalance.PDL_DemandedQuantity} where ID={itemBalance.ID};";
							done = objWH_ItemBalance.Update(str);
							if (done)
							{
								List<ItemBalance> lst = new List<ItemBalance>();
								lst.Add(new ItemBalance
								{
									LocationID = detail.ToLocationID,
									PalletStatusID = pLocationMove.ToPalletStatusID>0? pLocationMove.ToPalletStatusID: itemBalance.PalletStatusID,
									PalletID = detail.ToPalletID,
									Quantity = detail.MovedQuantity,
									PurchaseItemID = itemBalance.PurchaseItemID,
									PackageTypeID = itemBalance.PackageTypeID,
									BatchNumber = itemBalance.BatchNumber,
									BatchStatusID = itemBalance.BatchStatusID,
									PalletClassID = itemBalance.PalletClassID,
									ReceiveDate = itemBalance.ReceiveDate,
									ProductionDate = itemBalance.ProductionDate,
									ExpirationDate = itemBalance.ExpirationDate,
								});
								done = objWH_ItemBalance.Add(lst);
							}
						}
						else if (detail.MovedQuantity < detail.CurrentQuantity)
						{
							string str = $"update WH_ItemBalance set ModificatorUserID={userId}, ModificationDate=GetDate(), Quantity=Quantity-{detail.MovedQuantity} where ID={itemBalance.ID};";
							done = objWH_ItemBalance.Update(str);
							if (done)
							{
								List<ItemBalance> lst = new List<ItemBalance>();
								lst.Add(new ItemBalance
								{
									LocationID = detail.ToLocationID,
									PalletStatusID = pLocationMove.ToPalletStatusID > 0 ? pLocationMove.ToPalletStatusID : itemBalance.PalletStatusID,
									PalletID = detail.ToPalletID,
									Quantity = detail.MovedQuantity,
									PurchaseItemID = itemBalance.PurchaseItemID,
									PackageTypeID = itemBalance.PackageTypeID,
									BatchNumber = itemBalance.BatchNumber,
									BatchStatusID = itemBalance.BatchStatusID,
									PalletClassID = itemBalance.PalletClassID,
									ReceiveDate = itemBalance.ReceiveDate,
									ProductionDate = itemBalance.ProductionDate,
									ExpirationDate = itemBalance.ExpirationDate,
								});
								done = objWH_ItemBalance.Add(lst);
							}
						}
					}
					if (done)
					{
						objCWH_LocationMoveDetails.lstCVarWH_LocationMoveDetails.Add(new CVarWH_LocationMoveDetails
						{
							FromLocationID = itemBalance.LocationID,
							ToLocationID = detail.ToLocationID,
							FromPalletID = detail.FromPalletID,
							ToPalletID = detail.ToPalletID,
							PurchaseItemID = itemBalance.PurchaseItemID,
							MovedQuantity = detail.MovedQuantity,
							CreationDate = now,
							CreatorUserID = userId,
							ItemBalanceID = detail.ItemBalanceID
						});
						Common.Common.ReplaceNull(objCWH_LocationMoveDetails.lstCVarWH_LocationMoveDetails[objCWH_LocationMoveDetails.lstCVarWH_LocationMoveDetails.Count - 1]);
					}
				}
				if(done)
				{
					//foreach (var pallet in ItemsBalance.GroupBy(a=>a.PalletID))
					//{
					//	objCWH_QualityActionsLog.lstCVarWH_QualityActionsLog.Add(new CVarWH_QualityActionsLog
					//	{
					//		LocationID = pLocationMove.ToLocationID,
					//		PalletID = pallet.Key,
					//		PalletStatusID = pLocationMove.ToPalletStatusID>0? pLocationMove.ToPalletStatusID: pallet.First()?.PalletStatusID ?? 0,
					//		PalletClassID = pallet.First()?.PalletClassID??0,
					//		IsPallet = true,
					//		Reason = pLocationMove.Reason,
					//		CreatorUserID = userId,
					//		CreationDate = now
					//	});
					//	Common.Common.ReplaceNull(objCWH_QualityActionsLog.lstCVarWH_QualityActionsLog[objCWH_QualityActionsLog.lstCVarWH_QualityActionsLog.Count - 1]);

					//}
			
				}
				if (objCWH_LocationMoveDetails.lstCVarWH_LocationMoveDetails.Count > 0)
				{
					checkException = objCWH_QualityActionsLog.SaveMethod(objCWH_QualityActionsLog.lstCVarWH_QualityActionsLog.Distinct().ToList());

					   CWH_LocationMove objCWH_LocationMove = new CWH_LocationMove();
					if (pLocationMove.ID > 0)
						objCWH_LocationMove.GetItem(pLocationMove.ID);
					if (objCWH_LocationMove.lstCVarWH_LocationMove.Count == 0)
						objCWH_LocationMove.lstCVarWH_LocationMove.Add(new CVarWH_LocationMove());

					objCWH_LocationMove.lstCVarWH_LocationMove[0].ID = pLocationMove.ID;
					objCWH_LocationMove.lstCVarWH_LocationMove[0].FromLocationID = pLocationMove.FromLocationID;
					objCWH_LocationMove.lstCVarWH_LocationMove[0].ToLocationID = pLocationMove.ToLocationID;
					objCWH_LocationMove.lstCVarWH_LocationMove[0].ToPalletStatusID = pLocationMove.ToPalletStatusID;
					objCWH_LocationMove.lstCVarWH_LocationMove[0].Reason = pLocationMove.Reason;
					objCWH_LocationMove.lstCVarWH_LocationMove[0].ByPallet = pLocationMove.ByPallet;
					objCWH_LocationMove.lstCVarWH_LocationMove[0].ByItem = pLocationMove.ByItem;

					if (pLocationMove.ID > 0)
					{
						objCWH_LocationMove.lstCVarWH_LocationMove[0].ModificatorUserID = userId;
						objCWH_LocationMove.lstCVarWH_LocationMove[0].ModificationDate = now;
					}
					else
					{
						objCWH_LocationMove.lstCVarWH_LocationMove[0].CreatorUserID = objCWH_LocationMove.lstCVarWH_LocationMove[0].ModificatorUserID = userId;
						objCWH_LocationMove.lstCVarWH_LocationMove[0].CreationDate = objCWH_LocationMove.lstCVarWH_LocationMove[0].ModificationDate = now;
					}
					Common.Common.ReplaceNull(objCWH_LocationMove.lstCVarWH_LocationMove[0]);
					checkException = objCWH_LocationMove.SaveMethod(objCWH_LocationMove.lstCVarWH_LocationMove);

					if (checkException == null)
					{
						pLocationMove.ID = objCWH_LocationMove.lstCVarWH_LocationMove[0].ID;
						foreach (var item in objCWH_LocationMoveDetails.lstCVarWH_LocationMoveDetails)
						{
							item.MoveID = pLocationMove.ID;
						}
						checkException = objCWH_LocationMoveDetails.SaveMethod(objCWH_LocationMoveDetails.lstCVarWH_LocationMoveDetails);
					}
				}

			}
			else if (pLocationMove.ByPallet)
			{
				var PalletIDs = "'" + string.Join("','", pLocationMove.Details.Select(a => a.FromPalletID)) + "'";
				ItemsBalance.AddRange(objWH_ItemBalance.GetItemsBalanceToMove($"WarehouseID={pLocationMove.WarehouseID} and PalletID in ({PalletIDs})"));

				foreach (var detail in pLocationMove.Details)
				{
					var ItemsPallet = ItemsBalance.Where(a => a.PalletID == detail.FromPalletID);
					foreach (var item in ItemsPallet)
					{
						done = false;
						decimal movedQty = 0;
						if (item.Quantity > 0 && item.ItemBalanceID == 0)//move all
						{
							string str = $"update WH_ItemBalance set ModificatorUserID={userId}, ModificationDate=GetDate(), LocationID={detail.ToLocationID}, PalletStatusID={(pLocationMove.ToPalletStatusID > 0 ? pLocationMove.ToPalletStatusID : item.PalletStatusID)} where ID={item.ID};";
							done = objWH_ItemBalance.Update(str);
							if (done)
								movedQty = item.Quantity;
						}
						else if (item.Quantity > 0 && item.ItemBalanceID > 0)//move remain
						{

							decimal remain = item.Quantity - item.PDL_DemandedQuantity;


							string str = $"update WH_ItemBalance set ModificatorUserID={userId}, ModificationDate=GetDate(), Quantity={item.PDL_DemandedQuantity} where ID={item.ID};";
							done = objWH_ItemBalance.Update(str);


							if (done)
							{
								done = objWH_ItemBalance.Add(new List<ItemBalance> {
									new ItemBalance{
										LocationID = detail.ToLocationID,
									PalletStatusID = pLocationMove.ToPalletStatusID > 0 ? pLocationMove.ToPalletStatusID : item.PalletStatusID,
									PalletID = item.PalletID,
									Quantity = remain,
									PurchaseItemID = item.PurchaseItemID,
									PackageTypeID = item.PackageTypeID,
									BatchNumber = item.BatchNumber,
									BatchStatusID = item.BatchStatusID,
									PalletClassID = item.PalletClassID,
									ReceiveDate = item.ReceiveDate,
									ProductionDate = item.ProductionDate,
									ExpirationDate = item.ExpirationDate
									}
								});
								if (done)
									movedQty = remain;
							}
						}
						if (done && movedQty > 0)
						{
							objCWH_LocationMoveDetails.lstCVarWH_LocationMoveDetails.Add(new CVarWH_LocationMoveDetails
							{
								FromLocationID = item.LocationID,
								ToLocationID = detail.ToLocationID,
								FromPalletID = item.PalletID,
								MovedQuantity = movedQty,
								PurchaseItemID = item.PurchaseItemID,
								CreationDate = now,
								CreatorUserID = userId,
								ItemBalanceID = item.ID
							});
							Common.Common.ReplaceNull(objCWH_LocationMoveDetails.lstCVarWH_LocationMoveDetails[objCWH_LocationMoveDetails.lstCVarWH_LocationMoveDetails.Count - 1]);
						}
					}


					if (done)
					{
						objCWH_QualityActionsLog.lstCVarWH_QualityActionsLog.Add(new CVarWH_QualityActionsLog
						{
							LocationID = detail.ToLocationID,
							PalletID = detail.FromPalletID,
							PalletStatusID = pLocationMove.ToPalletStatusID > 0 ? pLocationMove.ToPalletStatusID : ItemsPallet.First()?.PalletStatusID ?? 0,
							PalletClassID = ItemsPallet.First()?.PalletClassID??0,
							IsPallet = true,
							Reason = pLocationMove.Reason,
							CreatorUserID = userId,
							CreationDate = now
						});
						Common.Common.ReplaceNull(objCWH_QualityActionsLog.lstCVarWH_QualityActionsLog[objCWH_QualityActionsLog.lstCVarWH_QualityActionsLog.Count - 1]);
					}
				}

				if (objCWH_LocationMoveDetails.lstCVarWH_LocationMoveDetails.Count > 0)
				{
					checkException = objCWH_QualityActionsLog.SaveMethod(objCWH_QualityActionsLog.lstCVarWH_QualityActionsLog);

					CWH_LocationMove objCWH_LocationMove = new CWH_LocationMove();
					if (pLocationMove.ID > 0)
						objCWH_LocationMove.GetItem(pLocationMove.ID);
					if (objCWH_LocationMove.lstCVarWH_LocationMove.Count == 0)
						objCWH_LocationMove.lstCVarWH_LocationMove.Add(new CVarWH_LocationMove());

					objCWH_LocationMove.lstCVarWH_LocationMove[0].ID = pLocationMove.ID;
					objCWH_LocationMove.lstCVarWH_LocationMove[0].FromLocationID = pLocationMove.FromLocationID;
					objCWH_LocationMove.lstCVarWH_LocationMove[0].ToLocationID = pLocationMove.ToLocationID;
					objCWH_LocationMove.lstCVarWH_LocationMove[0].ToPalletStatusID = pLocationMove.ToPalletStatusID;
					objCWH_LocationMove.lstCVarWH_LocationMove[0].Reason = pLocationMove.Reason;
					objCWH_LocationMove.lstCVarWH_LocationMove[0].ByPallet = pLocationMove.ByPallet;
					objCWH_LocationMove.lstCVarWH_LocationMove[0].ByItem = pLocationMove.ByItem;

					if (pLocationMove.ID > 0)
					{
						objCWH_LocationMove.lstCVarWH_LocationMove[0].ModificatorUserID = userId;
						objCWH_LocationMove.lstCVarWH_LocationMove[0].ModificationDate = now;
					}
					else
					{
						objCWH_LocationMove.lstCVarWH_LocationMove[0].CreatorUserID = objCWH_LocationMove.lstCVarWH_LocationMove[0].ModificatorUserID = userId;
						objCWH_LocationMove.lstCVarWH_LocationMove[0].CreationDate = objCWH_LocationMove.lstCVarWH_LocationMove[0].ModificationDate = now;
					}
					Common.Common.ReplaceNull(objCWH_LocationMove.lstCVarWH_LocationMove[0]);
					checkException = objCWH_LocationMove.SaveMethod(objCWH_LocationMove.lstCVarWH_LocationMove);

					if (checkException == null)
					{
						pLocationMove.ID = objCWH_LocationMove.lstCVarWH_LocationMove[0].ID;
						foreach (var item in objCWH_LocationMoveDetails.lstCVarWH_LocationMoveDetails)
						{
							item.MoveID = pLocationMove.ID;
						}
						checkException = objCWH_LocationMoveDetails.SaveMethod(objCWH_LocationMoveDetails.lstCVarWH_LocationMoveDetails);
					}
				}



			}
			else
			{
				ItemsBalance.AddRange(objWH_ItemBalance.GetItemsBalanceToMove($"LocationID={pLocationMove.FromLocationID}"));
				var Pallets = ItemsBalance.GroupBy(a => a.PalletID);
				foreach (var pallet in Pallets)
				{
					foreach (var item in pallet)
					{
						done = false;
						decimal movedQty = 0;
						if (item.Quantity > 0 && item.ItemBalanceID==0)//move all
						{
							string str = $"update WH_ItemBalance set ModificatorUserID={userId}, ModificationDate=GetDate(), LocationID={pLocationMove.ToLocationID}, PalletStatusID={(pLocationMove.ToPalletStatusID>0? pLocationMove.ToPalletStatusID:item.PalletStatusID)} where ID={item.ID};";
							done = objWH_ItemBalance.Update(str);
							if (done)
								movedQty = item.Quantity;
						}
						else if (item.Quantity > 0 && item.ItemBalanceID > 0)//move remain
						{
							decimal remain = item.Quantity - item.PDL_DemandedQuantity;
							
							string str = $"update WH_ItemBalance set ModificatorUserID={userId}, ModificationDate=GetDate(), Quantity={item.PDL_DemandedQuantity} where ID={item.ID};";
							done = objWH_ItemBalance.Update(str);
							
							if (done)
							{
								done = objWH_ItemBalance.Add(new List<ItemBalance> {
									new ItemBalance{
										LocationID = pLocationMove.ToLocationID,
									PalletStatusID = pLocationMove.ToPalletStatusID>0?pLocationMove.ToPalletStatusID:item.PalletStatusID,
									PalletID = item.PalletID,
									Quantity = remain,
									PurchaseItemID = item.PurchaseItemID,
									PackageTypeID = item.PackageTypeID,
									BatchNumber = item.BatchNumber,
									BatchStatusID = item.BatchStatusID,
									PalletClassID = item.PalletClassID,
									ReceiveDate = item.ReceiveDate,
									ProductionDate = item.ProductionDate,
									ExpirationDate = item.ExpirationDate
									}
								});
								if (done)
									movedQty = remain;
							}
							
						}
						if (done && movedQty > 0)
						{
							objCWH_LocationMoveDetails.lstCVarWH_LocationMoveDetails.Add(new CVarWH_LocationMoveDetails
							{
								FromLocationID = pLocationMove.FromLocationID,
								ToLocationID = pLocationMove.ToLocationID,
								FromPalletID = item.PalletID,
								MovedQuantity = movedQty,
								PurchaseItemID = item.PurchaseItemID,
								CreationDate = now,
								CreatorUserID = userId,
								ItemBalanceID=item.ID
							});
							Common.Common.ReplaceNull(objCWH_LocationMoveDetails.lstCVarWH_LocationMoveDetails[objCWH_LocationMoveDetails.lstCVarWH_LocationMoveDetails.Count - 1]);
						}
					}
					if(done)
					{
						objCWH_QualityActionsLog.lstCVarWH_QualityActionsLog.Add(new CVarWH_QualityActionsLog {
							LocationID = pLocationMove.ToLocationID,
							PalletID=pallet.Key,
							PalletStatusID=pLocationMove.ToPalletStatusID>0? pLocationMove.ToPalletStatusID: pallet.First().PalletStatusID,
							PalletClassID= pallet.First().PalletClassID,
							IsPallet=true,
							Reason=pLocationMove.Reason,
							CreatorUserID= userId,
							CreationDate= now
						});
						Common.Common.ReplaceNull(objCWH_QualityActionsLog.lstCVarWH_QualityActionsLog[objCWH_QualityActionsLog.lstCVarWH_QualityActionsLog.Count - 1]);
					}
				}

				if (objCWH_LocationMoveDetails.lstCVarWH_LocationMoveDetails.Count > 0)
				{
					checkException = objCWH_QualityActionsLog.SaveMethod(objCWH_QualityActionsLog.lstCVarWH_QualityActionsLog);

					CWH_LocationMove objCWH_LocationMove = new CWH_LocationMove();
					if (pLocationMove.ID > 0)
						objCWH_LocationMove.GetItem(pLocationMove.ID);
					if (objCWH_LocationMove.lstCVarWH_LocationMove.Count == 0)
						objCWH_LocationMove.lstCVarWH_LocationMove.Add(new CVarWH_LocationMove());

					objCWH_LocationMove.lstCVarWH_LocationMove[0].ID = pLocationMove.ID;
					objCWH_LocationMove.lstCVarWH_LocationMove[0].FromLocationID = pLocationMove.FromLocationID;
					objCWH_LocationMove.lstCVarWH_LocationMove[0].ToLocationID = pLocationMove.ToLocationID;
					objCWH_LocationMove.lstCVarWH_LocationMove[0].ToPalletStatusID = pLocationMove.ToPalletStatusID;
					objCWH_LocationMove.lstCVarWH_LocationMove[0].Reason = pLocationMove.Reason;
					objCWH_LocationMove.lstCVarWH_LocationMove[0].ByPallet = pLocationMove.ByPallet;
					objCWH_LocationMove.lstCVarWH_LocationMove[0].ByItem = pLocationMove.ByItem;

					if (pLocationMove.ID > 0)
					{
						objCWH_LocationMove.lstCVarWH_LocationMove[0].ModificatorUserID = userId;
						objCWH_LocationMove.lstCVarWH_LocationMove[0].ModificationDate = now;
					}
					else
					{
						objCWH_LocationMove.lstCVarWH_LocationMove[0].CreatorUserID = objCWH_LocationMove.lstCVarWH_LocationMove[0].ModificatorUserID = userId;
						objCWH_LocationMove.lstCVarWH_LocationMove[0].CreationDate = objCWH_LocationMove.lstCVarWH_LocationMove[0].ModificationDate = now;
					}
					Common.Common.ReplaceNull(objCWH_LocationMove.lstCVarWH_LocationMove[0]);
					checkException = objCWH_LocationMove.SaveMethod(objCWH_LocationMove.lstCVarWH_LocationMove);

					if (checkException == null)
					{
						pLocationMove.ID = objCWH_LocationMove.lstCVarWH_LocationMove[0].ID;
						foreach (var item in objCWH_LocationMoveDetails.lstCVarWH_LocationMoveDetails)
						{
							item.MoveID = pLocationMove.ID;
						}
						checkException = objCWH_LocationMoveDetails.SaveMethod(objCWH_LocationMoveDetails.lstCVarWH_LocationMoveDetails);
					}

				}


			}

			return new
			{
				Result = checkException == null && done
				,
				Exception = checkException
			};
		}

		//[HttpGet, HttpPost]
		//public object Save(LocationMove pLocationMove)
		//{
		//	Exception checkException = null;
		//	if (pLocationMove == null || ((pLocationMove.ByPallet || pLocationMove.ByItem) && pLocationMove.Details?.Count == 0))
		//	{
		//		checkException = new Exception("No Data To Save");
		//		return new { Result = false, Exception = checkException };
		//	}

		//	CWH_LocationMoveDetails objCWH_LocationMoveDetails = new CWH_LocationMoveDetails();

		//	if (pLocationMove.ByItem)
		//	{
		//		var ItemsIDs = string.Join(",", pLocationMove.Details.Select(a => a.PurchaseItemID));
		//		var PalletsIDs = "'" + string.Join(",", pLocationMove.Details.Select(a => a.FromPalletID)).Replace(",", "','") + "'";
		//		CvwWH_ReceiveDetailsToPick objCvwWH_ReceiveDetailsToPick = new CvwWH_ReceiveDetailsToPick();
		//		objCvwWH_ReceiveDetailsToPick.GetList($"where IsNull(Quantity,0) > IsNull(PDL_DemandedQuantity,0) and LocationID={pLocationMove.FromLocationID} and PalletID in ({PalletsIDs}) and PurchaseItemID in ({ItemsIDs})");
		//		var ReceiveDetailsIDs = string.Join(",", objCvwWH_ReceiveDetailsToPick.lstCVarvwWH_ReceiveDetailsToPick.Select(a => a.ID));
		//		if (!string.IsNullOrWhiteSpace(ReceiveDetailsIDs))
		//		{
		//			CWH_ReceiveDetails objCWH_ReceiveDetails = new CWH_ReceiveDetails();

		//			foreach (var item in objCvwWH_ReceiveDetailsToPick.lstCVarvwWH_ReceiveDetailsToPick)
		//			{
		//				var move = pLocationMove.Details.Find(a => a.FromPalletID == item.PalletID && a.PurchaseItemID == item.PurchaseItemID);
		//				if (item.Quantity==move.MovedQuantity)
		//					checkException = objCWH_ReceiveDetails.UpdateList($"LocationID={pLocationMove.ToLocationID}, PalletID={move.ToPalletID}, PalletStatusID={pLocationMove.ToPalletStatusID} where ID = {item.ID}");
		//				else
		//				{
		//					checkException = objCWH_ReceiveDetails.UpdateList($"Quantity={item.Quantity - move.MovedQuantity} where ID = {item.ID}");
		//					objCWH_ReceiveDetails.lstCVarWH_ReceiveDetails.Add(new CVarWH_ReceiveDetails
		//					{
		//						ReceiveID = item.ReceiveID,
		//						ReceiveDate = item.ReceiveDate,
		//						PurchaseItemID = item.PurchaseItemID,
		//						LocationID = pLocationMove.ToLocationID,
		//						PalletID = move.ToPalletID,
		//						PalletStatusID = pLocationMove.ToPalletStatusID,
		//						ExpectedQuantity = move.MovedQuantity,
		//						Quantity = move.MovedQuantity,
		//						BatchNumber = item.BatchNumber,
		//						Serial = item.Serial,
		//						LotNo = item.LotNo,
		//						SplitQuantity = item.SplitQuantity,
		//						ExpectedExpirationDate = item.ExpectedExpirationDate,
		//						ExpirationDate = item.ExpirationDate,
		//						ExpectedProductionDate =item.ExpectedProductionDate ,
		//						ProductionDate = item.ProductionDate,
		//						RD_PackageTypeID = item.RD_PackageTypeID,
		//						RD_IsFinalized = item.RD_IsFinalized,
		//						StatusID = item.StatusID,
		//						CreationDate = DateTime.Now,
		//						CreatorUserID = WebSecurity.CurrentUserId,
		//						ModificationDate = DateTime.Now,
		//						ModificatorUserID = WebSecurity.CurrentUserId,
		//					});
		//					Common.Common.ReplaceNull(objCWH_ReceiveDetails.lstCVarWH_ReceiveDetails[objCWH_ReceiveDetails.lstCVarWH_ReceiveDetails.Count - 1]);
		//				}
		//			}
		//			checkException = objCWH_ReceiveDetails.SaveMethod(objCWH_ReceiveDetails.lstCVarWH_ReceiveDetails);
		//			if (checkException == null)
		//			{
		//				foreach (var item in pLocationMove.Details)
		//				{
		//					objCWH_LocationMoveDetails.lstCVarWH_LocationMoveDetails.Add(new CVarWH_LocationMoveDetails
		//					{
		//						FromLocationID = pLocationMove.FromLocationID,
		//						ToLocationID = pLocationMove.ToLocationID,
		//						ToPalletStatusID = pLocationMove.ToPalletStatusID,
		//						Reason = pLocationMove.Reason,
		//						ByPallet = pLocationMove.ByPallet,
		//						ByItem = pLocationMove.ByItem,
		//						ReceiveID = item.ReceiveID,
		//						FromPalletID = item.FromPalletID,
		//						ToPalletID = item.ToPalletID,
		//						PurchaseItemID = item.PurchaseItemID,
		//						MovedQuantity = item.MovedQuantity,
		//						CreationDate = DateTime.Now,
		//						CreatorUserID = WebSecurity.CurrentUserId
		//					});
		//					Common.Common.ReplaceNull(objCWH_LocationMoveDetails.lstCVarWH_LocationMoveDetails[objCWH_LocationMoveDetails.lstCVarWH_LocationMoveDetails.Count - 1]);
		//				}
		//				checkException = objCWH_LocationMoveDetails.SaveMethod(objCWH_LocationMoveDetails.lstCVarWH_LocationMoveDetails);
		//			}
		//		}
		//	}
		//	else if (pLocationMove.ByPallet)
		//	{
		//		var PalletsIDs = "'" + string.Join(",", pLocationMove.Details.Select(a => a.FromPalletID)).Replace(",", "','") + "'";
		//		CvwWH_ReceiveDetailsToPick objCvwWH_ReceiveDetailsToPick = new CvwWH_ReceiveDetailsToPick();
		//		objCvwWH_ReceiveDetailsToPick.GetList($"where IsNull(PDL_DemandedQuantity,0)=0 and LocationID={pLocationMove.FromLocationID} and PalletID in ({PalletsIDs})");
		//		var ReceiveDetailsIDs = string.Join(",", objCvwWH_ReceiveDetailsToPick.lstCVarvwWH_ReceiveDetailsToPick.Select(a => a.ID));
		//		if (!string.IsNullOrWhiteSpace(ReceiveDetailsIDs))
		//		{
		//			CWH_ReceiveDetails objCWH_ReceiveDetails = new CWH_ReceiveDetails();
		//			checkException = objCWH_ReceiveDetails.UpdateList($"LocationID={pLocationMove.ToLocationID}, PalletStatusID={pLocationMove.ToPalletStatusID} where ID in ({ReceiveDetailsIDs})");
		//		if (checkException == null)
		//		{
		//			foreach (var item in pLocationMove.Details)
		//			{
		//				objCWH_LocationMoveDetails.lstCVarWH_LocationMoveDetails.Add(new CVarWH_LocationMoveDetails
		//				{
		//					FromLocationID = pLocationMove.FromLocationID,
		//					ToLocationID = pLocationMove.ToLocationID,
		//					ToPalletStatusID = pLocationMove.ToPalletStatusID,
		//					Reason = pLocationMove.Reason,
		//					ByPallet = pLocationMove.ByPallet,
		//					ByItem = pLocationMove.ByItem,
		//					ReceiveID = item.ReceiveID,
		//					FromPalletID = item.FromPalletID,
		//					ToPalletID = item.ToPalletID,
		//					PurchaseItemID = item.PurchaseItemID,
		//					MovedQuantity = item.MovedQuantity,
		//					CreationDate = DateTime.Now,
		//					CreatorUserID = WebSecurity.CurrentUserId
		//				});
		//				Common.Common.ReplaceNull(objCWH_LocationMoveDetails.lstCVarWH_LocationMoveDetails[objCWH_LocationMoveDetails.lstCVarWH_LocationMoveDetails.Count - 1]);
		//			}
		//			checkException = objCWH_LocationMoveDetails.SaveMethod(objCWH_LocationMoveDetails.lstCVarWH_LocationMoveDetails);
		//		}
		//		}
		//	}
		//	else
		//	{
		//		CvwWH_ReceiveDetailsToPick objCvwWH_ReceiveDetailsToPick = new CvwWH_ReceiveDetailsToPick();
		//		objCvwWH_ReceiveDetailsToPick.GetList($"where IsNull(PDL_DemandedQuantity,0)=0 and LocationID={pLocationMove.FromLocationID}");
		//		var ReceiveDetailsIDs = string.Join(",", objCvwWH_ReceiveDetailsToPick.lstCVarvwWH_ReceiveDetailsToPick.Select(a => a.ID));
		//		if (!string.IsNullOrWhiteSpace(ReceiveDetailsIDs))
		//		{
		//			CWH_ReceiveDetails objCWH_ReceiveDetails = new CWH_ReceiveDetails();
		//			checkException = objCWH_ReceiveDetails.UpdateList($"LocationID={pLocationMove.ToLocationID}, PalletStatusID={pLocationMove.ToPalletStatusID} where ID in ({ReceiveDetailsIDs})");
		//		if (checkException == null)
		//		{
		//			objCWH_LocationMoveDetails.lstCVarWH_LocationMoveDetails.Add(new CVarWH_LocationMoveDetails
		//			{
		//				FromLocationID = pLocationMove.FromLocationID,
		//				ToLocationID = pLocationMove.ToLocationID,
		//				ToPalletStatusID = pLocationMove.ToPalletStatusID,
		//				Reason = pLocationMove.Reason,
		//				ByPallet = pLocationMove.ByPallet,
		//				ByItem = pLocationMove.ByItem,
		//				CreationDate = DateTime.Now,
		//				CreatorUserID = WebSecurity.CurrentUserId
		//			});
		//			Common.Common.ReplaceNull(objCWH_LocationMoveDetails.lstCVarWH_LocationMoveDetails[objCWH_LocationMoveDetails.lstCVarWH_LocationMoveDetails.Count - 1]);
		//			checkException = objCWH_LocationMoveDetails.SaveMethod(objCWH_LocationMoveDetails.lstCVarWH_LocationMoveDetails);
		//		}
		//		}

		//	}





		//	return new
		//	{
		//		Result = checkException == null
		//		,
		//		Exception = checkException
		//	};
		//}




	}
	public class LocationMove
	{
		public int ID { get; set; }
		public int FromLocationID { get; set; }
		public int ToLocationID { get; set; }
		public int ToPalletStatusID { get; set; }
		public string Reason { get; set; }
		public bool ByPallet { get; set; }
		public bool ByItem { get; set; }
		public List<LocationMoveDetail> Details { get; set; }
		//for mobile
		public int UserID { get; set; }
		public int WarehouseID { get; set; }
	}
	public class LocationMoveDetail
	{
		public long ItemBalanceID { get; set; }
		public string FromPalletID { get; set; }
		public string ToPalletID { get; set; }
		public int ToLocationID { get; set; }
		public string BatchNumber { get; set; }
		public int PurchaseItemID { get; set; }
		public int PackageTypeID { get; set; }
		public decimal CurrentQuantity { get; set; }
		public decimal MovedQuantity { get; set; }
		public string ReceiveDate { get; set; }
		public string ProductionDate { get; set; }
		public string ExpirationDate { get; set; }
	}
}

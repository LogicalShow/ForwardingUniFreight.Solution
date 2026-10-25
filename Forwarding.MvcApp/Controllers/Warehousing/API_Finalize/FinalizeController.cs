using Forwarding.MvcApp.Entities.Warehousing;
using Forwarding.MvcApp.Models.Customized;
using Forwarding.MvcApp.Models.Warehousing.Transactions.Customized;
using Forwarding.MvcApp.Models.Warehousing.Transactions.Generated;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Web.Http;
using WebMatrix.WebData;

namespace Forwarding.MvcApp.Controllers.Warehousing.API_Finalize
{
    
    public class FinalizeController : ApiController
    {
        [HttpGet, HttpPost]
        public NonQueryResult FinalizeOrUnfinalize(int pSelector, string pSelectedIDs, string pValue, bool pHasRequest, bool pGenerateMissing=false)
        {
			//selector = 1 for receive - 2 for pickup

			NonQueryResult result = new NonQueryResult();
            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();

			if (pHasRequest)
			{
				var done = true;
				if (pSelector == 1 && pValue == "1")//receive-finalize
				{
					var vwDetails = objCCustomizedDBCall.ExecuteQuery_ListOfObjects($"SELECT ReceiveCode, LocationID, LocationCode, PalletID, PurchaseItemCode, Quantity, ByExpireDate, ProductionDate, ExpirationDate, ByLotNo, BatchNumber FROM vwWH_ReceiveDetails where ReceiveID in ({pSelectedIDs}) and IsNull(RD_IsFinalized,0)=0 and Quantity>0 and (IsNull(LocationID,0)=0 or IsNull(PalletID,'')='' or (ByExpireDate=1 and (ProductionDate Is Null or ExpirationDate Is Null)) or (ByLotNo=1 and IsNull(BatchNumber,'')=''))", typeof(CVarvwWH_ReceiveDetails)).Cast<CVarvwWH_ReceiveDetails>().ToList();
					if(vwDetails!=null&&vwDetails.Count>0)
					{
						done = false;
						var missing = "Missing ";
						if (vwDetails[0].LocationID == 0)
							missing += $"Location";
						else if(string.IsNullOrWhiteSpace(vwDetails[0].PalletID)|| vwDetails[0].PalletID=="0")
							missing += $"Pallet";
						else if(vwDetails[0].ByLotNo&&string.IsNullOrWhiteSpace(vwDetails[0].BatchNumber))
							missing += $"BatchNumber";
						else if (vwDetails[0].ByExpireDate && vwDetails[0].ProductionDate.Year<=2000)
							missing += $"ProductionDate";
						else if (vwDetails[0].ByExpireDate && vwDetails[0].ExpirationDate.Year <= 2000)
							missing += $"ExpirationDate";
						result.Exception = new Exception($"{missing} in Receive({vwDetails[0].ReceiveCode}) / Item({vwDetails[0].PurchaseItemCode}) / Qty({vwDetails[0].Quantity})");
					}
					else
					{
						CWH_ReceiveDetails objCWH_ReceiveDetails = new CWH_ReceiveDetails();
						objCWH_ReceiveDetails.GetList($"where ReceiveID in ({pSelectedIDs})");
						var details = objCWH_ReceiveDetails.lstCVarWH_ReceiveDetails.Where(a => !a.RD_IsFinalized && a.Quantity > 0 && a.LocationID > 0 && !string.IsNullOrWhiteSpace(a.PalletID));
						if (details != null && details.Count() > 0)
						{
							List<ItemBalance> lst = new List<ItemBalance>();
							foreach (var item in details)
							{
								lst.Add(new ItemBalance
								{
									PurchaseItemID = (int)item.PurchaseItemID,
									PackageTypeID = item.RD_PackageTypeID,
									Quantity = item.Quantity,
									LocationID = item.LocationID,
									PalletID = item.PalletID,
									PalletStatusID = item.PalletStatusID,
									PalletClassID = item.PalletClassID,
									BatchNumber = item.BatchNumber,
									BatchStatusID = item.BatchStatusId,
									ReceiveDetailsID = item.ID,
									ReceiveDate = item.ReceiveDate,
									ProductionDate = item.ProductionDate,
									ExpirationDate = item.ExpirationDate
								});
							}
							WH_ItemBalance itemBalance = new WH_ItemBalance();
							done = itemBalance.Add(lst);
						}

						if (done)
						{
							result = objCCustomizedDBCall.Update($" UPDATE WH_Receive SET IsFinalized = {pValue}, FinalizeUserID={WebSecurity.CurrentUserId}, FinalizeDate = '{DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")}', StatusID = 30 WHERE ID IN ({pSelectedIDs})");
						}

						if (done && pGenerateMissing)
						{
							var now = DateTime.Now;
							var date1900 = new DateTime(1900, 1, 1);
							CWH_Receive objCWH_Receive_New = new CWH_Receive();
							CWH_ReceiveDetails CWH_ReceiveDetails_New = new CWH_ReceiveDetails();

							CWH_Receive objCWH_Receive = new CWH_Receive();
							objCWH_Receive.GetList($"where ID in ({pSelectedIDs})");
							foreach (var master in objCWH_Receive.lstCVarWH_Receive)
							{
								objCWH_Receive_New.lstCVarWH_Receive.Clear();
								CWH_ReceiveDetails_New.lstCVarWH_ReceiveDetails.Clear();

								if (objCWH_ReceiveDetails.lstCVarWH_ReceiveDetails.Any(a => a.ReceiveID == master.ID && a.ExpectedQuantity > a.Quantity))
								{
									objCWH_Receive_New.lstCVarWH_Receive.Add(new Models.Warehousing.Transactions.Generated.Old.CVarWH_Receive
									{
										WarehouseID = master.WarehouseID,
										CustomerID = master.CustomerID,
										OwnerID = master.OwnerID,
										StatusID = 5,
										ContainerNumber = master.ContainerNumber,
										PO = master.PO,
										ReceiveDate = DateTime.ParseExact(now.ToShortDateString() + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture),
										Notes = $"missing from order: {master.Code}",
										CreationDate = now,
										CreatorUserID = WebSecurity.CurrentUserId,
										ModificationDate = now,
										ModificatorUserID = WebSecurity.CurrentUserId
									});
									Common.Common.ReplaceNull(objCWH_Receive_New.lstCVarWH_Receive[0]);
									var ex = objCWH_Receive_New.SaveMethod(objCWH_Receive_New.lstCVarWH_Receive);
									if (ex == null)
									{
										int i = 0;
										var missings = objCWH_ReceiveDetails.lstCVarWH_ReceiveDetails.Where(a => a.ReceiveID == master.ID && a.ExpectedQuantity > a.Quantity);
										foreach (var missing in missings)
										{
											objCWH_ReceiveDetails.UpdateList($"ExpectedQuantity=Quantity where ID={missing.ID}");

											CWH_ReceiveDetails_New.lstCVarWH_ReceiveDetails.Add(missing);
											CWH_ReceiveDetails_New.lstCVarWH_ReceiveDetails[i].ID = 0;
											CWH_ReceiveDetails_New.lstCVarWH_ReceiveDetails[i].ReceiveID = objCWH_Receive_New.lstCVarWH_Receive[0].ID;
											CWH_ReceiveDetails_New.lstCVarWH_ReceiveDetails[i].ReceiveDate = objCWH_Receive_New.lstCVarWH_Receive[0].ReceiveDate;
											CWH_ReceiveDetails_New.lstCVarWH_ReceiveDetails[i].ExpectedQuantity = missing.ExpectedQuantity - missing.Quantity;
											CWH_ReceiveDetails_New.lstCVarWH_ReceiveDetails[i].Quantity = 0;
											CWH_ReceiveDetails_New.lstCVarWH_ReceiveDetails[i].RD_IsFinalized = false;
											CWH_ReceiveDetails_New.lstCVarWH_ReceiveDetails[i].ProductionDate = date1900;
											CWH_ReceiveDetails_New.lstCVarWH_ReceiveDetails[i].ExpectedProductionDate = date1900;
											CWH_ReceiveDetails_New.lstCVarWH_ReceiveDetails[i].ExpirationDate = date1900;
											CWH_ReceiveDetails_New.lstCVarWH_ReceiveDetails[i].ExpectedExpirationDate = date1900;
											CWH_ReceiveDetails_New.lstCVarWH_ReceiveDetails[i].BatchNumber = "";
											CWH_ReceiveDetails_New.lstCVarWH_ReceiveDetails[i].PalletID = "";
											CWH_ReceiveDetails_New.lstCVarWH_ReceiveDetails[i].BatchStatusId = 0;
											CWH_ReceiveDetails_New.lstCVarWH_ReceiveDetails[i].PalletClassID = 0;
											CWH_ReceiveDetails_New.lstCVarWH_ReceiveDetails[i].PalletStatusID = 0;
											CWH_ReceiveDetails_New.lstCVarWH_ReceiveDetails[i].CreationDate = now;
											CWH_ReceiveDetails_New.lstCVarWH_ReceiveDetails[i].CreatorUserID = WebSecurity.CurrentUserId;
											CWH_ReceiveDetails_New.lstCVarWH_ReceiveDetails[i].ModificationDate = now;
											CWH_ReceiveDetails_New.lstCVarWH_ReceiveDetails[i].ModificatorUserID = WebSecurity.CurrentUserId;
											i++;
										}
										ex = CWH_ReceiveDetails_New.SaveMethod(CWH_ReceiveDetails_New.lstCVarWH_ReceiveDetails);

									}
								}
							}
						}
					}
				
				}
				else if (pSelector == 1 && pValue == "0")//receive-unfinalize
				{
					CvwWH_ReceiveDetails objCvwWH_ReceiveDetails = new CvwWH_ReceiveDetails();
					CWH_ReceiveDetails objCWH_ReceiveDetails = new CWH_ReceiveDetails();
					objCvwWH_ReceiveDetails.GetList($"where ReceiveID in ({pSelectedIDs})");
					var Receives = objCvwWH_ReceiveDetails.lstCVarvwWH_ReceiveDetails.GroupBy(a=>new {a.ReceiveID,a.ReceiveCode });

					CWH_Putaway objCWH_Putaway = new CWH_Putaway();

					WH_ItemBalance objWH_ItemBalance = new WH_ItemBalance();

					foreach (var receive in Receives)
					{
						objCWH_Putaway.GetList($"where ReceiveID={receive.Key.ReceiveID}");
						if (objCWH_Putaway.lstCVarWH_Putaway.Count > 0)
						{
							result.Exception = new Exception($"Receive({receive.Key.ReceiveCode}) is putaway");
							continue;
						}

						var warehouseId = objCvwWH_ReceiveDetails.lstCVarvwWH_ReceiveDetails.Find(a => a.ReceiveID == receive.Key.ReceiveID).WarehouseID;
						var ItemIDs = string.Join(",", objCvwWH_ReceiveDetails.lstCVarvwWH_ReceiveDetails.Where(a => a.ReceiveID == receive.Key.ReceiveID).Select(a=>a.PurchaseItemID).Distinct());
						var PalletIDs = "'"+ string.Join("','", objCvwWH_ReceiveDetails.lstCVarvwWH_ReceiveDetails.Where(a => a.ReceiveID == receive.Key.ReceiveID).Select(a => a.PalletID).Distinct())+"'";

						var itemsBalance = objWH_ItemBalance.Get("*", $"WarehouseID={warehouseId} and PurchaseItemID in ({ItemIDs}) and PalletID in ({PalletIDs})");
						if (itemsBalance.Count > 0 && itemsBalance.Any(a=>a.PDL_DemandedQuantity>0))
						{
							result.Exception = new Exception($"Receive({receive.Key.ReceiveCode}) is demanded");
							continue;
						}

						var itemBalanceIds = string.Join(",", itemsBalance.Select(a => a.ID));
						var pdl = objCCustomizedDBCall.ExecuteQuery_ListOfObjects($"SELECT Code, PalletID FROM vwWH_PickupDetailsLocation where ItemBalanceID in ({itemBalanceIds})", typeof(CVarvwWH_PickupDetailsLocation)).Cast<CVarvwWH_PickupDetailsLocation>().ToList();
						if(pdl!=null&&pdl.Count>0)
						{
							result.Exception = new Exception($"Pallets({string.Join(",", pdl.Select(a=>a.PalletID))}) is demanded in ({string.Join(",", pdl.Select(a => a.Code))})");
							continue;
						}
						var deleted = objWH_ItemBalance.Delete($"ID in ({itemBalanceIds})");
						if(deleted)
						{
							var ex = objCWH_ReceiveDetails.UpdateList($"RD_IsFinalized=0 where ReceiveID = {receive.Key.ReceiveID}");
							result = objCCustomizedDBCall.Update($" UPDATE WH_Receive SET IsFinalized = {pValue}, StatusID = 20 WHERE ID = {receive.Key.ReceiveID}");
						}
					}
				}
				else if (pSelector == 2 && pValue == "1")//pickup-finalize
				{
					CvwWH_PickupDetailsLocation objCvwWH_PickupDetailsLocation = new CvwWH_PickupDetailsLocation();
					objCvwWH_PickupDetailsLocation.GetList($"where PickupID in ({pSelectedIDs}) and IsNull(IsFinalized,0)=0");

					StringBuilder str = new StringBuilder();
					foreach (var item in objCvwWH_PickupDetailsLocation.lstCVarvwWH_PickupDetailsLocation)
					{
						str.AppendLine($"update WH_ItemBalance set ModificatorUserID={WebSecurity.CurrentUserId}, ModificationDate=GetDate(), Quantity=Quantity-{item.PickedQuantity} where ID={item.ItemBalanceID};");
					}

					result = objCCustomizedDBCall.Update($" UPDATE WH_Pickup SET IsFinalized = {pValue}, FinalizeUserID={WebSecurity.CurrentUserId}, FinalizeDate = '{DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")}', StatusID=60 WHERE ID IN ({pSelectedIDs})");

					if (result.RowsAffected>0)
					{
						WH_ItemBalance itemBalance = new WH_ItemBalance();
						done = itemBalance.Update(str.ToString());
					}

					if (done && objCvwWH_PickupDetailsLocation.lstCVarvwWH_PickupDetailsLocation.Any(a=>a.WarehouseToID>0))
					{
						Exception exception = null;
						CWH_Receive objCWH_Receive = new CWH_Receive();
						CWH_ReceiveDetails objCWH_ReceiveDetails = new CWH_ReceiveDetails();
						CWH_ReceiveDetailsSerial objCWH_ReceiveDetailsSerial = new CWH_ReceiveDetailsSerial();
						int receivingLocId = 0;
						foreach (var p in objCvwWH_PickupDetailsLocation.lstCVarvwWH_PickupDetailsLocation.Where(a=>a.WarehouseToID>0).GroupBy(a=>a.PickupID))
						{
							objCWH_Receive.lstCVarWH_Receive.Clear();
							objCWH_ReceiveDetails.lstCVarWH_ReceiveDetails.Clear();
							objCWH_ReceiveDetailsSerial.lstCVarWH_ReceiveDetailsSerial.Clear();
							receivingLocId = Convert.ToInt32(objCCustomizedDBCall.CallStringFunction($"select ID from vwWH_RowLocation where WarehouseID={p.First().WarehouseToID} and IsDefault=1 and TypeID=1"));

							objCWH_Receive.lstCVarWH_Receive.Add(new Models.Warehousing.Transactions.Generated.Old.CVarWH_Receive {
								WarehouseID = p.First().WarehouseToID,
								CustomerID = p.First().CustomerID,
								OwnerID = p.First().OwnerID,
								ReceiveDate = DateTime.Now,
								StatusID = 5,
								ContainerNumber = p.First().ContainerNumber,
								Notes = p.First().PickupNotes+System.Environment.NewLine+$"Received From ({p.First().Code})",
								MasterFile=p.Key.ToString(),
								CreationDate = DateTime.Now,
								CreatorUserID = WebSecurity.CurrentUserId,
								ModificationDate = DateTime.Now,
								ModificatorUserID = WebSecurity.CurrentUserId
							});
							Common.Common.ReplaceNull(objCWH_Receive.lstCVarWH_Receive[0]);
							exception = objCWH_Receive.SaveMethod(objCWH_Receive.lstCVarWH_Receive);
							if(exception==null)
							{
								foreach (var pd in p)
								{
									objCWH_ReceiveDetailsSerial.lstCVarWH_ReceiveDetailsSerial.Clear();

									objCWH_ReceiveDetails.lstCVarWH_ReceiveDetails.Add(new Models.Warehousing.Transactions.Generated.Old.CVarWH_ReceiveDetails
									{
										ReceiveID = objCWH_Receive.lstCVarWH_Receive[0].ID,
										ReceiveDate = objCWH_Receive.lstCVarWH_Receive[0].ReceiveDate,
										PurchaseItemID = pd.PurchaseItemID,
										RD_PackageTypeID = pd.PD_PackageTypeID,
										LocationID = receivingLocId,
										PalletID = pd.PDL_PalletID,
										ExpectedQuantity = pd.PickedQuantity,
										BatchNumber = pd.BatchNumber,
										ProductionDate = pd.ProductionDate,
										ExpirationDate = pd.ExpirationDate,
										DetailFile=pd.ID.ToString(),
										CreationDate = DateTime.Now,
										CreatorUserID = WebSecurity.CurrentUserId,
										ModificationDate = DateTime.Now,
										ModificatorUserID = WebSecurity.CurrentUserId
									});
									Common.Common.ReplaceNull(objCWH_ReceiveDetails.lstCVarWH_ReceiveDetails[objCWH_ReceiveDetails.lstCVarWH_ReceiveDetails.Count - 1]);
									if(pd.BySerialNo)
									{
										exception = objCWH_ReceiveDetails.SaveMethod(objCWH_ReceiveDetails.lstCVarWH_ReceiveDetails);
										var serials = objCCustomizedDBCall.ExecuteQuery_ListOfObjects($"select Serial from WH_ReceiveDetailsSerial where PickupDetailsLocationID={pd.ID}", typeof(CVarWH_ReceiveDetailsSerial)).Cast<CVarWH_ReceiveDetailsSerial>().ToList();
										foreach (var serial in serials)
										{
											objCWH_ReceiveDetailsSerial.lstCVarWH_ReceiveDetailsSerial.Add(new CVarWH_ReceiveDetailsSerial
											{
												ReceiveDetailsID = objCWH_ReceiveDetails.lstCVarWH_ReceiveDetails[objCWH_ReceiveDetails.lstCVarWH_ReceiveDetails.Count-1].ID,
												Serial = serial.Serial
											});
											Common.Common.ReplaceNull(objCWH_ReceiveDetailsSerial.lstCVarWH_ReceiveDetailsSerial[objCWH_ReceiveDetailsSerial.lstCVarWH_ReceiveDetailsSerial.Count - 1]);
										}
										exception = objCWH_ReceiveDetailsSerial.SaveMethod(objCWH_ReceiveDetailsSerial.lstCVarWH_ReceiveDetailsSerial);
										objCWH_ReceiveDetails.lstCVarWH_ReceiveDetails.Clear();
									}
								}
								exception = objCWH_ReceiveDetails.SaveMethod(objCWH_ReceiveDetails.lstCVarWH_ReceiveDetails);
							}
						}
					}
					//ex = itemBalance.DeleteZeroQty();
				}
				else if(pSelector == 2 && pValue == "0")//pickup-unfinalize
				{
						result = objCCustomizedDBCall.Update($" UPDATE WH_Pickup SET IsFinalized = {pValue}, StatusID=50 WHERE ID IN ({pSelectedIDs})");
				}
			}
			else
			{
				if (pSelector == 1)
					result = objCCustomizedDBCall.Update($" UPDATE WH_Receive SET IsFinalized = {pValue} {(pValue == "1" ? $",FinalizeUserID = {WebSecurity.CurrentUserId}" : "")} {(pValue == "1" ? $",FinalizeDate = '{DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")}', StatusID = 30" : ", StatusID = 20")} WHERE ID IN ({pSelectedIDs})");
				else if (pSelector == 2)
					result = objCCustomizedDBCall.Update($" UPDATE WH_Pickup SET IsFinalized = {pValue} {(pValue == "1" ? $",FinalizeUserID = {WebSecurity.CurrentUserId}" : "")} {(pValue == "1" ? $",FinalizeDate = '{DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")}', StatusID=60" : ", StatusID=50")} WHERE ID IN ({pSelectedIDs})");
			}

			return result;
		}
    }
}
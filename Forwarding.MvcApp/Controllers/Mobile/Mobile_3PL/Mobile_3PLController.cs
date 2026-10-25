using Forwarding.MvcApp.Models.Warehousing.Transactions.Generated;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web.Http;
using WebMatrix.WebData;
using Forwarding.MvcApp.Models.Customized;
using System.Net.Http;
using Forwarding.MvcApp.Models.Administration.Security.Generated;
using System.Net;
using Forwarding.MvcApp.Models.Warehousing.Transactions.Customized;
using Forwarding.MvcApp.Entities.Warehousing;
using System.Globalization;
using Forwarding.MvcApp.Controllers.Warehousing.API_Transactions;
using System.Text;
using Forwarding.MvcApp.Models.Warehousing.MasterData.Generated;
using Forwarding.MvcApp.Controllers.Warehousing.API_Reports;

namespace Forwarding.MvcApp.Controllers.Mobile.Mobile_3PL
{
	public class Mobile_3PLController : ApiController
	{
		#region Login
		[HttpPost]
		public HttpResponseMessage Login([FromBody] Mobile_3PL_Login pLogin)
		{
			List<SelectListOption> palletStatus = new List<SelectListOption>();
			List<SelectListOption> palletClass = new List<SelectListOption>();
			List<SelectListOption> warehouses = new List<SelectListOption>();
			string errMsg = "";
			HttpStatusCode statusCode = HttpStatusCode.OK;
			try
			{
				if (string.IsNullOrWhiteSpace(pLogin.Username))
				{
					statusCode = HttpStatusCode.BadRequest;
					errMsg = "Username is mandatory";
				}
				else if (string.IsNullOrWhiteSpace(pLogin.Password))
				{
					statusCode = HttpStatusCode.BadRequest;
					errMsg = "Password is mandatory";
				}
				else
				{
					pLogin.UserID = WebSecurity.GetUserId(pLogin.Username.Trim().ToUpper());
					if (pLogin.UserID > 0) //i.e. user exists
					{
						CUsers objCUsers = new CUsers();
						objCUsers.GetItem(pLogin.UserID);
						bool isInactive = objCUsers.lstCVarUsers[0].IsInactive;
						if (isInactive)
						{
							errMsg = "User isn't active";
							pLogin.UserID = 0;
						}
						else
						{
							bool isPasswordCorrect = WebSecurity.Login(pLogin.Username, pLogin.Password, false);
							if (isPasswordCorrect)
							{
								warehouses = GetUserWarehouses(pLogin.UserID);
								if (warehouses.Count == 0)
								{
									errMsg = "Sorry user not registered to warehouse";
									pLogin.UserID = 0;
								}
								palletStatus.AddRange(GetPalletStatus());
								palletClass.AddRange(GetPalletClass());
							}
							else
							{
								errMsg = "Invalid password.";
								pLogin.UserID = 0;
							}
						}
					}
					else
						errMsg = "User not found";
				}

			}
			catch (Exception ex)
			{
				statusCode = HttpStatusCode.InternalServerError;
				errMsg = ex.Message;
				pLogin.UserID = 0;
			}
			return Request.CreateResponse(statusCode, new { UserID = pLogin.UserID, Warehouses = warehouses, PalletStatus = palletStatus, PalletClass = palletClass, ErrMsg = errMsg });
		}

		[HttpPost]
		public HttpResponseMessage GetUserWarehouses([FromBody] Mobile_3PL_Login pLogin)
		{
			List<SelectListOption> warehouses = new List<SelectListOption>();
			string errMsg = "";
			HttpStatusCode statusCode = HttpStatusCode.OK;
			try
			{
				if (pLogin.UserID > 0)
				{
					CUsers objCUsers = new CUsers();
					objCUsers.GetItem(pLogin.UserID);

					if (objCUsers.lstCVarUsers.Count > 0 && objCUsers.lstCVarUsers[0].ID == pLogin.UserID) //i.e. user exists
					{
						bool isInactive = objCUsers.lstCVarUsers[0].IsInactive;
						if (isInactive)
						{
							errMsg = "User isn't active";
							pLogin.UserID = 0;
						}
						else
						{
							warehouses = GetUserWarehouses(pLogin.UserID);

							if (warehouses.Count == 0)
							{
								errMsg = "Sorry user not registered to warehouse";
								pLogin.UserID = 0;
							}
						}
					}
				}
				else
				{
					statusCode = HttpStatusCode.BadRequest;
					errMsg = "User not found";
				}

			}
			catch (Exception ex)
			{
				statusCode = HttpStatusCode.InternalServerError;
				errMsg = ex.Message;
				pLogin.UserID = 0;
			}
			return Request.CreateResponse(statusCode, new { UserID = pLogin.UserID, Warehouses = warehouses, ErrMsg = errMsg });
		}

		[HttpGet]
		public HttpResponseMessage GetWarehouseLocations(int pWarehouseID)
		{
			CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();

			var areas = objCCustomizedDBCall.ExecuteQuery_ListOfObjects($"select ID, Name, IsDefault from WH_Area where WarehouseID={pWarehouseID}", typeof(CVarWH_Area)).Cast<CVarWH_Area>();
			var locations = objCCustomizedDBCall.ExecuteQuery_ListOfObjects($"select ID, Code, IsDefault, TypeID from vwWH_RowLocation WHERE WarehouseID = {pWarehouseID}", typeof(CVarvwWH_RowLocation)).Cast<CVarvwWH_RowLocation>();
			return Request.CreateResponse(HttpStatusCode.OK, new { Areas = areas, Locations = locations });
		}
		List<SelectListOption> GetUserWarehouses(int pUserID)
		{
			var warehouses = new List<SelectListOption>();
			CWH_UsersWarehouses objCWH_UsersWarehouses = new CWH_UsersWarehouses();
			objCWH_UsersWarehouses.GetList($"where UserID={pUserID}");
			if (objCWH_UsersWarehouses.lstCVarWH_UsersWarehouses.Count > 0)
			{
				var warehouseIds = string.Join(",", objCWH_UsersWarehouses.lstCVarWH_UsersWarehouses.Select(a => a.WarehouseID));
				CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
				warehouses.AddRange(objCCustomizedDBCall.ExecuteQuery_ListOfObjects($"SELECT ID, Name FROM WH_Warehouse where ID in ({warehouseIds})", typeof(SelectListOption)).Cast<SelectListOption>().ToList());
			}
			return warehouses;
		}

		List<SelectListOption> GetPalletStatus()
		{
			var palletStatus = new List<SelectListOption>();
			CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
			palletStatus.AddRange(objCCustomizedDBCall.ExecuteQuery_ListOfObjects($"SELECT ID, Name FROM PalletStatus", typeof(SelectListOption)).Cast<SelectListOption>().ToList());
			return palletStatus;
		}
		List<SelectListOption> GetPalletClass()
		{
			var palletClass = new List<SelectListOption>();
			CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
			palletClass.AddRange(objCCustomizedDBCall.ExecuteQuery_ListOfObjects($"SELECT ID, Name FROM PalletClassification", typeof(SelectListOption)).Cast<SelectListOption>().ToList());
			return palletClass;
		}
		#endregion

		#region Receive
		[HttpGet]
		public HttpResponseMessage GetReceiveItems(string pCode, int pWarehouseID)
		{
			CvwWH_ReceiveDetails objCvwWH_ReceiveDetails = new CvwWH_ReceiveDetails();
			objCvwWH_ReceiveDetails.GetList($"where ReceiveCode=N'{pCode}' and WarehouseID={pWarehouseID} and ReceiveStatusID in (10,20) and IsNull(RD_IsFinalized,0)=0 and IsNull(Quantity,0)<ExpectedQuantity");//INPROGRESS,INRECEIVING
			foreach (var item in objCvwWH_ReceiveDetails.lstCVarvwWH_ReceiveDetails)
			{
				item.ExpectedQuantity -= item.Quantity;
				item.Quantity = 0;
			}
			return Request.CreateResponse(HttpStatusCode.OK, objCvwWH_ReceiveDetails.lstCVarvwWH_ReceiveDetails);
		}
		[HttpPost]
		public HttpResponseMessage SaveReceiveDetail(WhReceiveDetail pDetail)
		{
			Exception ex = null;
			string errMsg = "";
			HttpStatusCode statusCode = HttpStatusCode.OK;
			CvwWH_ReceiveDetails objCvwWH_ReceiveDetails = new CvwWH_ReceiveDetails();
			CWH_ReceiveDetails objCWH_ReceiveDetails_db = new CWH_ReceiveDetails();
			objCWH_ReceiveDetails_db.GetList($"where ID={pDetail.ID}");

			if (objCWH_ReceiveDetails_db.lstCVarWH_ReceiveDetails.Count == 0)
			{
				statusCode = HttpStatusCode.BadRequest;
				errMsg = "Receive detail not found!";
				ex = new Exception(errMsg);
			}

			if (ex == null)
			{
				if (pDetail.Quantity == 0)
				{
					statusCode = HttpStatusCode.InternalServerError;
					errMsg = $"Actual Quantity Is Mandatory";
					ex = new Exception(errMsg);
				}
			}

			if (ex == null)
			{
				objCvwWH_ReceiveDetails.GetList($"where ID={pDetail.ID}");
				if (pDetail.Quantity > pDetail.ExpectedQuantity && !objCvwWH_ReceiveDetails.lstCVarvwWH_ReceiveDetails[0].BlindInbound)
				{
					statusCode = HttpStatusCode.InternalServerError;
					errMsg = $"Not Allowed To Inbound More Than Expected Quantity";
					ex = new Exception(errMsg);
				}
			}

			if (ex == null)
			{
				if (objCvwWH_ReceiveDetails.lstCVarvwWH_ReceiveDetails[0].ExpectedQuantity <= objCvwWH_ReceiveDetails.lstCVarvwWH_ReceiveDetails[0].Quantity)
				{
					statusCode = HttpStatusCode.InternalServerError;
					errMsg = $"Quantity Already Received";
					ex = new Exception(errMsg);
				}
			}

			if (ex == null)
			{
				if (pDetail.LocationID == 0)
				{
					statusCode = HttpStatusCode.InternalServerError;
					errMsg = $"Location Is Mandatory";
					ex = new Exception(errMsg);
				}
			}

			if (ex == null)
			{
				if (string.IsNullOrWhiteSpace(pDetail.PalletID))
				{
					statusCode = HttpStatusCode.InternalServerError;
					errMsg = $"PalletID Is Mandatory";
					ex = new Exception(errMsg);
				}
			}

			if (ex == null)
			{
				if (objCvwWH_ReceiveDetails.lstCVarvwWH_ReceiveDetails[0].ByExpireDate && (string.IsNullOrWhiteSpace(pDetail.ProductionDate) || string.IsNullOrWhiteSpace(pDetail.ExpirationDate)))
				{
					statusCode = HttpStatusCode.InternalServerError;
					errMsg = $"Production And Expiration Date Are Mandatory";
					ex = new Exception(errMsg);
				}
			}

			if (ex == null)
			{
				objCvwWH_ReceiveDetails.GetList($"where ReceiveID<>{objCWH_ReceiveDetails_db.lstCVarWH_ReceiveDetails[0].ReceiveID} and WarehouseID={pDetail.WarehouseID} and PalletID=N'{pDetail.PalletID}'");
				if (objCvwWH_ReceiveDetails.lstCVarvwWH_ReceiveDetails.Count > 0)
				{
					statusCode = HttpStatusCode.InternalServerError;
					errMsg = $"Pallet ID Already Received in {objCvwWH_ReceiveDetails.lstCVarvwWH_ReceiveDetails[0].ReceiveCode}";
					ex = new Exception(errMsg);
				}
			}

			if (ex == null)
			{
				CWH_ReceiveDetails objCWH_ReceiveDetails = new CWH_ReceiveDetails();
				pDetail.PurchaseItemID = objCWH_ReceiveDetails_db.lstCVarWH_ReceiveDetails[0].PurchaseItemID;
				pDetail.RD_PackageTypeID = objCWH_ReceiveDetails_db.lstCVarWH_ReceiveDetails[0].RD_PackageTypeID;
				pDetail.ReceiveID = objCWH_ReceiveDetails_db.lstCVarWH_ReceiveDetails[0].ReceiveID;
				objCvwWH_ReceiveDetails.GetList($"where ReceiveID={pDetail.ReceiveID} and WarehouseID={pDetail.WarehouseID} and PurchaseItemID={pDetail.PurchaseItemID} and RD_PackageTypeID={pDetail.RD_PackageTypeID} and ( (IsNull(Quantity,0)=0 and IsNull(PalletID,'')='') or (IsNull(PalletID,'')=N'{pDetail.PalletID}' and IsNull(PalletStatusID,0)={pDetail.PalletStatusID} and IsNull(PalletClassID,0)={pDetail.PalletClassID} and IsNull(LocationID,0)={pDetail.LocationID} and IsNull(BatchNumber,'')='{pDetail.BatchNumber}' and Convert(varchar(10),IsNull(ProductionDate,'01/01/1900'),103)='{pDetail.ProductionDate}' and Convert(varchar(10),IsNull(ExpirationDate,'01/01/1900'),103)='{pDetail.ExpirationDate}' ) )");
				if (objCvwWH_ReceiveDetails.lstCVarvwWH_ReceiveDetails.Count > 0)
				{
					var rd = objCvwWH_ReceiveDetails.lstCVarvwWH_ReceiveDetails[0];
					objCWH_ReceiveDetails.GetItem(rd.ID);

					if (rd.Quantity==0)
					{
						objCWH_ReceiveDetails.lstCVarWH_ReceiveDetails[0].Quantity = pDetail.Quantity;
						objCWH_ReceiveDetails.lstCVarWH_ReceiveDetails[0].LocationID = pDetail.LocationID;
						objCWH_ReceiveDetails.lstCVarWH_ReceiveDetails[0].PalletID = pDetail.PalletID;
						objCWH_ReceiveDetails.lstCVarWH_ReceiveDetails[0].PalletStatusID = pDetail.PalletStatusID;
						objCWH_ReceiveDetails.lstCVarWH_ReceiveDetails[0].PalletClassID = pDetail.PalletClassID;
						objCWH_ReceiveDetails.lstCVarWH_ReceiveDetails[0].ProductionDate = DateTime.ParseExact(pDetail.ProductionDate + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture);
						objCWH_ReceiveDetails.lstCVarWH_ReceiveDetails[0].ExpirationDate = DateTime.ParseExact(pDetail.ExpirationDate + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture);
						objCWH_ReceiveDetails.lstCVarWH_ReceiveDetails[0].BatchNumber = pDetail.BatchNumber;
						objCWH_ReceiveDetails.lstCVarWH_ReceiveDetails[0].ModificationDate = DateTime.Now;
						objCWH_ReceiveDetails.lstCVarWH_ReceiveDetails[0].ModificatorUserID = pDetail.UserID;
						ex = objCWH_ReceiveDetails.SaveMethod(objCWH_ReceiveDetails.lstCVarWH_ReceiveDetails);
					}
					else
					{
						objCWH_ReceiveDetails.lstCVarWH_ReceiveDetails[0].Quantity += pDetail.Quantity;
						if (objCWH_ReceiveDetails.lstCVarWH_ReceiveDetails[0].ExpectedQuantity < objCWH_ReceiveDetails.lstCVarWH_ReceiveDetails[0].Quantity)
							objCWH_ReceiveDetails.lstCVarWH_ReceiveDetails[0].ExpectedQuantity = objCWH_ReceiveDetails.lstCVarWH_ReceiveDetails[0].Quantity;
						objCWH_ReceiveDetails.lstCVarWH_ReceiveDetails[0].ModificationDate = DateTime.Now;
						objCWH_ReceiveDetails.lstCVarWH_ReceiveDetails[0].ModificatorUserID = pDetail.UserID;
						if(rd.ID!=pDetail.ID)
						{
							objCWH_ReceiveDetails.lstCVarWH_ReceiveDetails.Add(objCWH_ReceiveDetails_db.lstCVarWH_ReceiveDetails[0]);
							objCWH_ReceiveDetails.lstCVarWH_ReceiveDetails[1].ExpectedQuantity -= pDetail.Quantity;
							objCWH_ReceiveDetails.lstCVarWH_ReceiveDetails[1].ModificationDate = DateTime.Now;
							objCWH_ReceiveDetails.lstCVarWH_ReceiveDetails[1].ModificatorUserID = pDetail.UserID;
						}

						ex = objCWH_ReceiveDetails.SaveMethod(objCWH_ReceiveDetails.lstCVarWH_ReceiveDetails);
					}
				}
				else
				{
					objCWH_ReceiveDetails.lstCVarWH_ReceiveDetails.Add(objCWH_ReceiveDetails_db.lstCVarWH_ReceiveDetails[0]);
					objCWH_ReceiveDetails.lstCVarWH_ReceiveDetails[0].ExpectedQuantity -= pDetail.Quantity;
					objCWH_ReceiveDetails.lstCVarWH_ReceiveDetails[0].ModificationDate = DateTime.Now;
					objCWH_ReceiveDetails.lstCVarWH_ReceiveDetails[0].ModificatorUserID = pDetail.UserID;
					if (pDetail.Quantity > 0)
					{
						var serial = objCWH_ReceiveDetails.lstCVarWH_ReceiveDetails[0].Serial;
						if (string.IsNullOrWhiteSpace(serial) || serial == "0")
							serial = objCWH_ReceiveDetails.lstCVarWH_ReceiveDetails[0].ID.ToString();

						objCWH_ReceiveDetails.lstCVarWH_ReceiveDetails.Add(new Models.Warehousing.Transactions.Generated.Old.CVarWH_ReceiveDetails
						{
							Serial = serial,
							ReceiveID = objCWH_ReceiveDetails.lstCVarWH_ReceiveDetails[0].ReceiveID,
							ReceiveDate = objCWH_ReceiveDetails.lstCVarWH_ReceiveDetails[0].ReceiveDate,
							PurchaseItemID = pDetail.PurchaseItemID,
							RD_PackageTypeID = pDetail.RD_PackageTypeID,
							PalletID=pDetail.PalletID,
							PalletStatusID=pDetail.PalletStatusID,
							PalletClassID = pDetail.PalletClassID,
							BatchNumber = pDetail.BatchNumber,
							LocationID=pDetail.LocationID,
							ExpectedQuantity = pDetail.Quantity,
							Quantity = pDetail.Quantity,
							ExpectedProductionDate = objCWH_ReceiveDetails.lstCVarWH_ReceiveDetails[0].ExpectedProductionDate,
							ProductionDate = DateTime.ParseExact(pDetail.ProductionDate + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture),
							ExpectedExpirationDate = objCWH_ReceiveDetails.lstCVarWH_ReceiveDetails[0].ExpectedExpirationDate,
							ExpirationDate = DateTime.ParseExact(pDetail.ExpirationDate + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture),
							CreationDate = DateTime.Now,
							CreatorUserID = pDetail.UserID,
							ModificationDate = DateTime.Now,
							ModificatorUserID = pDetail.UserID,
							CreationSource = CreationSource.mob.ToString()
						});
						Common.Common.ReplaceNull(objCWH_ReceiveDetails.lstCVarWH_ReceiveDetails[1]);
					}
					ex = objCWH_ReceiveDetails.SaveMethod(objCWH_ReceiveDetails.lstCVarWH_ReceiveDetails);
				}
			
				
		
				if (ex == null)
				{
					var updateClauseMaster = $@"update WH_Receive set StatusID = 20
					where ID = (select ReceiveID from WH_ReceiveDetails where ReceiveID = {objCWH_ReceiveDetails.lstCVarWH_ReceiveDetails[0].ReceiveID}
					group by ReceiveID having sum(isnull(Quantity, 0)) > 0) and StatusID = 10;";
				
					CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
					var result = objCCustomizedDBCall.CallStringFunction(updateClauseMaster);
				}
				else
					errMsg = ex.Message;
			}

			return Request.CreateResponse(statusCode, new { ErrMsg = errMsg, Detail = ex != null ? null : objCWH_ReceiveDetails_db.lstCVarWH_ReceiveDetails.Count > 0 ? objCWH_ReceiveDetails_db.lstCVarWH_ReceiveDetails[0] : null });//last detail

		}
		#endregion

		#region Putaway
		[HttpGet]
		public HttpResponseMessage GetPalletsToPutaway(string pReceiveOrPallet, int pWarehouseID)
		{
			CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();

			var pallets = objCCustomizedDBCall.ExecuteQuery_ListOfObjects($"select ReceiveID, ReceiveCode, CustomerName, OwnerName, PalletID, LocationID ReceiveLocationID, LocationCode ReceiveLocationCode from vwWH_PalletToPutaway where WarehouseID={pWarehouseID} and (ReceiveCode=N'{pReceiveOrPallet}' or PalletID=N'{pReceiveOrPallet}')", typeof(PutawayDetail)).Cast<PutawayDetail>();
			return Request.CreateResponse(HttpStatusCode.OK, pallets);
		}
		[HttpPost]
		public HttpResponseMessage SavePutaway(Putaway pPutaway)
		{
			Exception ex = null;
			string errMsg = "";
			HttpStatusCode statusCode = HttpStatusCode.OK;
			if (pPutaway == null || pPutaway.Details == null || pPutaway.Details.Count == 0)
			{
				statusCode = HttpStatusCode.BadRequest;
				errMsg = "No Pallets To Putaway!";
				ex = new Exception(errMsg);
			}
			if (ex == null)
			{
				foreach (var item in pPutaway.Details)
				{
					if (string.IsNullOrWhiteSpace(item.PalletID) || item.PalletID == "0")
					{
						statusCode = HttpStatusCode.BadRequest;
						errMsg = "PalletID Is Mandatory!";
						ex = new Exception(errMsg);
						break;
					}
					else if (item.PutawayLocationID <= 0)
					{
						statusCode = HttpStatusCode.BadRequest;
						errMsg = "Putaway Location Is Mandatory!";
						ex = new Exception(errMsg);
						break;
					}
				}
			}
			if (ex == null)
			{
				var palletIDs = "N'" + string.Join("',N'", pPutaway.Details.Select(a => a.PalletID)) + "'";
				CvwWH_PutawayDetails objCvwWH_PutawayDetails = new CvwWH_PutawayDetails();
				objCvwWH_PutawayDetails.GetList($"where PalletID in ({palletIDs})");
				if (objCvwWH_PutawayDetails.lstCVarvwWH_PutawayDetails.Count > 0)
				{
					statusCode = HttpStatusCode.BadRequest;
					errMsg = $"Pallets ({string.Join(",", objCvwWH_PutawayDetails.lstCVarvwWH_PutawayDetails.Select(a => a.PalletID))}) Already Putaway In ({objCvwWH_PutawayDetails.lstCVarvwWH_PutawayDetails[0].PutawayCode}) !";
					ex = new Exception(errMsg);
				}
			}
			if (ex == null)
			{
				CWH_Putaway objCWH_Putaway = new CWH_Putaway();
				if (pPutaway.ID > 0)
					objCWH_Putaway.GetItem(pPutaway.ID);
				if (objCWH_Putaway.lstCVarWH_Putaway.Count == 0)
					objCWH_Putaway.lstCVarWH_Putaway.Add(new CVarWH_Putaway());

				objCWH_Putaway.lstCVarWH_Putaway[0].ID = pPutaway.ID;
				objCWH_Putaway.lstCVarWH_Putaway[0].ReceiveID = pPutaway.ReceiveID;

				if (pPutaway.ID > 0)
				{
					objCWH_Putaway.lstCVarWH_Putaway[0].ModificatorUserID = pPutaway.UserID;
					objCWH_Putaway.lstCVarWH_Putaway[0].ModificationDate = DateTime.Now;
				}
				else
				{
					objCWH_Putaway.lstCVarWH_Putaway[0].CreatorUserID = objCWH_Putaway.lstCVarWH_Putaway[0].ModificatorUserID = pPutaway.UserID;
					objCWH_Putaway.lstCVarWH_Putaway[0].CreationDate = objCWH_Putaway.lstCVarWH_Putaway[0].ModificationDate = DateTime.Now;
				}
				Common.Common.ReplaceNull(objCWH_Putaway.lstCVarWH_Putaway[0]);
				ex = objCWH_Putaway.SaveMethod(objCWH_Putaway.lstCVarWH_Putaway);
				if (ex == null)
				{
					pPutaway.ID = objCWH_Putaway.lstCVarWH_Putaway[0].ID;

					CWH_PutawayDetails objCWH_PutawayDetails = new CWH_PutawayDetails();
					var IDs = string.Join(",", pPutaway.Details.Select(a => a.ID));
					ex = objCWH_PutawayDetails.DeleteList($"where PutawayID={pPutaway.ID} and ID not in ({IDs})");

					foreach (var item in pPutaway.Details)
					{
						objCWH_PutawayDetails.lstCVarWH_PutawayDetails.Add(new CVarWH_PutawayDetails
						{
							ID = item.ID,
							PutawayID = pPutaway.ID,
							PalletID = item.PalletID,
							ReceiveLocationID = item.ReceiveLocationID,
							PutawayLocationID = item.PutawayLocationID,
							CreationDate = DateTime.Now,
							CreatorUserID = pPutaway.UserID
						});
						Common.Common.ReplaceNull(objCWH_PutawayDetails.lstCVarWH_PutawayDetails[objCWH_PutawayDetails.lstCVarWH_PutawayDetails.Count - 1]);
					}
					ex = objCWH_PutawayDetails.SaveMethod(objCWH_PutawayDetails.lstCVarWH_PutawayDetails);

					if (ex == null)
					{
						StringBuilder str = new StringBuilder();
						foreach (var item in pPutaway.Details)
						{
							str.AppendLine($"update WH_ItemBalance set ModificatorUserID={pPutaway.UserID}, ModificationDate=GetDate(), LocationID={item.PutawayLocationID} where PalletID='{item.PalletID}' and LocationID={item.ReceiveLocationID};");
						}
						WH_ItemBalance itemBalance = new WH_ItemBalance();
						var updated = itemBalance.Update(str.ToString());
					}

				}
			}

			return Request.CreateResponse(statusCode, new { ErrMsg = errMsg, });
		}
		#endregion

		#region Move
		[HttpGet]
		public HttpResponseMessage GetPalletsToMove(int pWarehouseID, int pLocationID, string pPalletID)
		{
			string whereClause = $" WarehouseID={pWarehouseID} and Quantity>IsNull(PDL_DemandedQuantity,0) and ISNULL(PalletID,'')<>''";

			if (pLocationID > 0)
				whereClause += $" and LocationID={pLocationID}";

			if (!string.IsNullOrWhiteSpace(pPalletID))
				whereClause += $" and PalletID in (N'{pPalletID.Replace(",","','")}')";

			if (pLocationID == 0 && string.IsNullOrWhiteSpace(pPalletID))
				whereClause = "1=2";

			WH_ItemBalance objWH_ItemBalance = new WH_ItemBalance();
			var pallets = objWH_ItemBalance.Get($" distinct WarehouseID, PalletID, LocationID, LocationCode ", whereClause);
			if (pallets.Count > 0 && pallets.Select(a => a.LocationID).Distinct().Count() > 1)
				pallets.Clear();
			return Request.CreateResponse(HttpStatusCode.OK, pallets);
		}
		[HttpGet]
		public HttpResponseMessage GetItemsToMove(int pWarehouseID, int pLocationID, string pPalletID)
		{
			string whereClause = $" WarehouseID={pWarehouseID} and IsNull(Quantity,0) > IsNull(PDL_DemandedQuantity,0) and ISNULL(PalletID,'')<>''";

			if (pLocationID > 0)
				whereClause += $" and LocationID={pLocationID}";

			if (!string.IsNullOrWhiteSpace(pPalletID))
				whereClause += $" and PalletID in (N'{pPalletID.Replace(",", "','")}')";

			if (pLocationID == 0 && string.IsNullOrWhiteSpace(pPalletID))
				whereClause = "1=2";

			WH_ItemBalance objWH_ItemBalance = new WH_ItemBalance();
			var items = objWH_ItemBalance.Get($" * ", whereClause);
			if (items.Count > 0 && items.Select(a => a.LocationID).Distinct().Count() > 1)
				items.Clear();
			return Request.CreateResponse(HttpStatusCode.OK, items);
		}
		[HttpPost]
		public HttpResponseMessage SaveMove(LocationMove pLocationMove)
		{
			Exception ex = null;
			string errMsg = "";
			HttpStatusCode statusCode = HttpStatusCode.OK;
			if (pLocationMove == null || pLocationMove.Details == null || pLocationMove.Details.Count == 0)
			{
				statusCode = HttpStatusCode.BadRequest;
				errMsg = "No Pallets To Move!";
				ex = new Exception(errMsg);
			}
			else if(pLocationMove.FromLocationID==0)
			{
				statusCode = HttpStatusCode.BadRequest;
				errMsg = "From Location Is Mandatory!";
				ex = new Exception(errMsg);
			}
			else if (pLocationMove.ToLocationID == 0)
			{
				statusCode = HttpStatusCode.BadRequest;
				errMsg = "To Location Is Mandatory!";
				ex = new Exception(errMsg);
			}
			else if (pLocationMove.ByItem&&pLocationMove.Details.Any(a=>string.IsNullOrWhiteSpace(a.ToPalletID)))
			{
				statusCode = HttpStatusCode.BadRequest;
				errMsg = "To PalletID Is Mandatory!";
				ex = new Exception(errMsg);
			}
			else if (pLocationMove.ByItem && pLocationMove.Details.Any(a => a.MovedQuantity==0))
			{
				statusCode = HttpStatusCode.BadRequest;
				errMsg = "Moved Quantity Is Mandatory!";
				ex = new Exception(errMsg);
			}
			if (ex == null)
			{
				var done = false;
				var now = DateTime.Now;
				var userId = pLocationMove.UserID;
				WH_ItemBalance objWH_ItemBalance = new WH_ItemBalance();
				List<vwItemBalance> ItemsBalance = new List<vwItemBalance>();

				CWH_QualityActionsLog objCWH_QualityActionsLog = new CWH_QualityActionsLog();
				CWH_LocationMoveDetails objCWH_LocationMoveDetails = new CWH_LocationMoveDetails();
				pLocationMove.ByPallet = !pLocationMove.ByItem&&pLocationMove.Details.Any(a=>!string.IsNullOrWhiteSpace(a.FromPalletID));
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
								string str = $"update WH_ItemBalance set ModificatorUserID={userId}, ModificationDate=GetDate(), LocationID={pLocationMove.ToLocationID}, PalletID='{detail.ToPalletID}' where ID={itemBalance.ID};";
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
										LocationID = pLocationMove.ToLocationID,
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
										CreatorUserID = userId
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
										LocationID = pLocationMove.ToLocationID,
										PalletStatusID = pLocationMove.ToPalletStatusID>0? pLocationMove.ToPalletStatusID:itemBalance.PalletStatusID,
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
										CreatorUserID = userId
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
										LocationID = pLocationMove.ToLocationID,
										PalletStatusID = pLocationMove.ToPalletStatusID>0? pLocationMove.ToPalletStatusID:itemBalance.PalletStatusID,
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
										CreatorUserID = userId
									});
									done = objWH_ItemBalance.Add(lst);
								}
							}
						}
						if (done)
						{
							objCWH_LocationMoveDetails.lstCVarWH_LocationMoveDetails.Add(new CVarWH_LocationMoveDetails
							{
								FromPalletID = detail.FromPalletID,
								ToPalletID = detail.ToPalletID,
								PurchaseItemID = itemBalance.PurchaseItemID,
								MovedQuantity = detail.MovedQuantity,
								CreationDate = now,
								CreatorUserID = userId
							});
							Common.Common.ReplaceNull(objCWH_LocationMoveDetails.lstCVarWH_LocationMoveDetails[objCWH_LocationMoveDetails.lstCVarWH_LocationMoveDetails.Count - 1]);
						}
					}
					if (done)
					{
						foreach (var pallet in ItemsBalance.GroupBy(a => a.PalletID))
						{
							objCWH_QualityActionsLog.lstCVarWH_QualityActionsLog.Add(new CVarWH_QualityActionsLog
							{
								LocationID = pLocationMove.ToLocationID,
								PalletID = pallet.Key,
								PalletStatusID = pLocationMove.ToPalletStatusID>0? pLocationMove.ToPalletStatusID: pallet.First()?.PalletStatusID ?? 0,
								PalletClassID = pallet.First()?.PalletClassID ?? 0,
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
						ex = objCWH_QualityActionsLog.SaveMethod(objCWH_QualityActionsLog.lstCVarWH_QualityActionsLog.Distinct().ToList());

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
						ex = objCWH_LocationMove.SaveMethod(objCWH_LocationMove.lstCVarWH_LocationMove);

						if (ex == null)
						{
							pLocationMove.ID = objCWH_LocationMove.lstCVarWH_LocationMove[0].ID;
							foreach (var item in objCWH_LocationMoveDetails.lstCVarWH_LocationMoveDetails)
							{
								item.MoveID = pLocationMove.ID;
							}
							ex = objCWH_LocationMoveDetails.SaveMethod(objCWH_LocationMoveDetails.lstCVarWH_LocationMoveDetails);
						}
					}

				}
				else if (pLocationMove.ByPallet)
				{
					var PalletIDs = "'" + string.Join("','", pLocationMove.Details.Select(a => a.FromPalletID)) + "'";
					ItemsBalance.AddRange(objWH_ItemBalance.GetItemsBalanceToMove($" LocationID={pLocationMove.FromLocationID} and PalletID in ({PalletIDs})"));

					foreach (var detail in pLocationMove.Details)
					{
						var ItemsPallet = ItemsBalance.Where(a => a.PalletID == detail.FromPalletID);
						foreach (var item in ItemsPallet)
						{
							done = false;
							decimal movedQty = 0;
							if (item.Quantity > 0 && item.ItemBalanceID == 0)//move all
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
									ExpirationDate = item.ExpirationDate,
									CreatorUserID=userId
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
									FromPalletID = item.PalletID,
									MovedQuantity = movedQty,
									PurchaseItemID = item.PurchaseItemID,
									CreationDate = now,
									CreatorUserID = userId
								});
								Common.Common.ReplaceNull(objCWH_LocationMoveDetails.lstCVarWH_LocationMoveDetails[objCWH_LocationMoveDetails.lstCVarWH_LocationMoveDetails.Count - 1]);
							}
						}


						if (done)
						{
							objCWH_QualityActionsLog.lstCVarWH_QualityActionsLog.Add(new CVarWH_QualityActionsLog
							{
								LocationID = pLocationMove.ToLocationID,
								PalletID = detail.FromPalletID,
								PalletStatusID = pLocationMove.ToPalletStatusID>0? pLocationMove.ToPalletStatusID: ItemsPallet.First()?.PalletStatusID ?? 0,
								PalletClassID = ItemsPallet.First()?.PalletClassID ?? 0,
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
						ex = objCWH_QualityActionsLog.SaveMethod(objCWH_QualityActionsLog.lstCVarWH_QualityActionsLog);

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
						ex = objCWH_LocationMove.SaveMethod(objCWH_LocationMove.lstCVarWH_LocationMove);

						if (ex == null)
						{
							pLocationMove.ID = objCWH_LocationMove.lstCVarWH_LocationMove[0].ID;
							foreach (var item in objCWH_LocationMoveDetails.lstCVarWH_LocationMoveDetails)
							{
								item.MoveID = pLocationMove.ID;
							}
							ex = objCWH_LocationMoveDetails.SaveMethod(objCWH_LocationMoveDetails.lstCVarWH_LocationMoveDetails);
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
							if (item.Quantity > 0 && item.ItemBalanceID == 0)//move all
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
									ExpirationDate = item.ExpirationDate,
									CreatorUserID=userId
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
									FromPalletID = item.PalletID,
									MovedQuantity = movedQty,
									PurchaseItemID = item.PurchaseItemID,
									CreationDate = now,
									CreatorUserID = userId
								});
								Common.Common.ReplaceNull(objCWH_LocationMoveDetails.lstCVarWH_LocationMoveDetails[objCWH_LocationMoveDetails.lstCVarWH_LocationMoveDetails.Count - 1]);
							}
						}
						if (done)
						{
							objCWH_QualityActionsLog.lstCVarWH_QualityActionsLog.Add(new CVarWH_QualityActionsLog
							{
								LocationID = pLocationMove.ToLocationID,
								PalletID = pallet.Key,
								PalletStatusID = pLocationMove.ToPalletStatusID>0? pLocationMove.ToPalletStatusID: pallet.First().PalletStatusID,
								PalletClassID = pallet.First().PalletClassID,
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
						ex = objCWH_QualityActionsLog.SaveMethod(objCWH_QualityActionsLog.lstCVarWH_QualityActionsLog);

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
						ex = objCWH_LocationMove.SaveMethod(objCWH_LocationMove.lstCVarWH_LocationMove);

						if (ex == null)
						{
							pLocationMove.ID = objCWH_LocationMove.lstCVarWH_LocationMove[0].ID;
							foreach (var item in objCWH_LocationMoveDetails.lstCVarWH_LocationMoveDetails)
							{
								item.MoveID = pLocationMove.ID;
							}
							ex = objCWH_LocationMoveDetails.SaveMethod(objCWH_LocationMoveDetails.lstCVarWH_LocationMoveDetails);
						}

					}
				}

			}


			return Request.CreateResponse(statusCode, new { ErrMsg = errMsg, });
		}
		#endregion

		#region Pickup
		[HttpGet]
		public HttpResponseMessage GetPickupItems(string pCode, int pWarehouseID)
		{
			string query = $@"select * from (
select P.Code, P.WarehouseID, PDL.ID, PDL.ItemBalanceID, I.Code ItemCode, I.Name ItemName,
RL.Code LocationCode, IB.PalletID, IB.BatchNumber, IB.ProductionDate, IB.ExpirationDate,
PDL.PDL_DemandedQuantity DemandedQuantity, PDL.PickedQuantity, PDL.PDL_LocationID TargetLocationID, PDL.PDL_PalletID TargetPalletID
from WH_Pickup P
left join WH_PickupDetails PD on P.ID=PD.PickupID
left join WH_PickupDetailsLocation PDL on PD.ID=PDL.PickupDetailsID
left join WH_ItemBalance IB on PDL.ItemBalanceID=IB.ID
left join PurchaseItem I on IB.PurchaseItemID=I.ID
left join WH_RowLocation RL on IB.LocationID=RL.ID
where P.StatusID in (20,30,40)
) as PDL
where Code='{pCode}' and WarehouseID={pWarehouseID}";
			CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();

			var details = objCCustomizedDBCall.ExecuteQuery_ListOfObjects(query, typeof(Mobile_3PL_Pick)).Cast<Mobile_3PL_Pick>();
			
			return Request.CreateResponse(HttpStatusCode.OK, details);
		}
		void UpdatePickupStatus(long pPickupDetailsLocationID)
		{
			CvwWH_PickupDetailsLocation objCvwWH_PickupDetailsLocation = new CvwWH_PickupDetailsLocation();
			objCvwWH_PickupDetailsLocation.GetList($"WHERE PickupID in (select distinct PickupID from vwWH_PickupDetailsLocation where ID = {pPickupDetailsLocationID})");

			if (objCvwWH_PickupDetailsLocation.lstCVarvwWH_PickupDetailsLocation.Count > 0)
			{
				CWH_Pickup objCWH_Pickup = new CWH_Pickup();
				var demanded = objCvwWH_PickupDetailsLocation.lstCVarvwWH_PickupDetailsLocation.Sum(a => a.PDL_DemandedQuantity);
				var picked = objCvwWH_PickupDetailsLocation.lstCVarvwWH_PickupDetailsLocation.Sum(a => a.PickedQuantity);
				string updateClause = $"StatusID={(picked == demanded ? 40.ToString() : picked > 0 ? 30.ToString() : "20")} where ID={objCvwWH_PickupDetailsLocation.lstCVarvwWH_PickupDetailsLocation[0].PickupID}";
				var checkException = objCWH_Pickup.UpdateList(updateClause);
			}
			
		}
		[HttpPost]
		public HttpResponseMessage Pick(Mobile_3PL_Pick pPick)
		{
			Exception ex = null;
			string errMsg = "";
			HttpStatusCode statusCode = HttpStatusCode.OK;
			if(pPick == null)
			{
				statusCode = HttpStatusCode.BadRequest;
				errMsg = "No Data To Save!";
				ex = new Exception(errMsg);
			}
			else if (pPick.PickedQuantity == 0)
			{
				statusCode = HttpStatusCode.BadRequest;
				errMsg = "Picked Quantity Is Mandatory!";
				ex = new Exception(errMsg);
			}
			else if (pPick.TargetLocationID == 0)
			{
				statusCode = HttpStatusCode.BadRequest;
				errMsg = "Target Location Is Mandatory!";
				ex = new Exception(errMsg);
			}
			else if (string.IsNullOrWhiteSpace(pPick.TargetPalletID) || pPick.TargetPalletID=="0")
			{
				statusCode = HttpStatusCode.BadRequest;
				errMsg = "Target Pallet Is Mandatory!";
				ex = new Exception(errMsg);
			}
			else
			{
				CWH_PickupDetailsLocation objCWH_PickupDetailsLocation = new CWH_PickupDetailsLocation();
				objCWH_PickupDetailsLocation.GetItem(pPick.ID);
				if(pPick.PickedQuantity>objCWH_PickupDetailsLocation.lstCVarWH_PickupDetailsLocation[0].PDL_DemandedQuantity)
				{
					statusCode = HttpStatusCode.BadRequest;
					errMsg = $"Max Limit Is {objCWH_PickupDetailsLocation.lstCVarWH_PickupDetailsLocation[0].PDL_DemandedQuantity}!";
					ex = new Exception(errMsg);
				}
				if(ex==null)
				{
					if(pPick.PickedQuantity < objCWH_PickupDetailsLocation.lstCVarWH_PickupDetailsLocation[0].PDL_DemandedQuantity)
					{
						var remainDemanded = objCWH_PickupDetailsLocation.lstCVarWH_PickupDetailsLocation[0].PDL_DemandedQuantity - pPick.PickedQuantity;
						var pdlPalletID = objCWH_PickupDetailsLocation.lstCVarWH_PickupDetailsLocation[0].PDL_PalletID;
						var pdlLocationID = objCWH_PickupDetailsLocation.lstCVarWH_PickupDetailsLocation[0].PDL_LocationID;


						objCWH_PickupDetailsLocation.lstCVarWH_PickupDetailsLocation[0].PDL_DemandedQuantity = pPick.PickedQuantity;
						objCWH_PickupDetailsLocation.lstCVarWH_PickupDetailsLocation[0].PickedQuantity = pPick.PickedQuantity;
						objCWH_PickupDetailsLocation.lstCVarWH_PickupDetailsLocation[0].PDL_PalletID = pPick.TargetPalletID;
						objCWH_PickupDetailsLocation.lstCVarWH_PickupDetailsLocation[0].PDL_LocationID = pPick.TargetLocationID;
						objCWH_PickupDetailsLocation.lstCVarWH_PickupDetailsLocation[0].ModificatorUserID = pPick.UserID;
						objCWH_PickupDetailsLocation.lstCVarWH_PickupDetailsLocation[0].ModificationDate = DateTime.Now;
						ex = objCWH_PickupDetailsLocation.SaveMethod(objCWH_PickupDetailsLocation.lstCVarWH_PickupDetailsLocation);
						if(ex==null)
						{
							objCWH_PickupDetailsLocation.lstCVarWH_PickupDetailsLocation[0].ID = 0;
							objCWH_PickupDetailsLocation.lstCVarWH_PickupDetailsLocation[0].PDL_DemandedQuantity = remainDemanded;
							objCWH_PickupDetailsLocation.lstCVarWH_PickupDetailsLocation[0].PickedQuantity = 0;
							objCWH_PickupDetailsLocation.lstCVarWH_PickupDetailsLocation[0].PDL_PalletID = pdlPalletID;
							objCWH_PickupDetailsLocation.lstCVarWH_PickupDetailsLocation[0].PDL_LocationID = pdlLocationID;
							objCWH_PickupDetailsLocation.lstCVarWH_PickupDetailsLocation[0].CreatorUserID =
							objCWH_PickupDetailsLocation.lstCVarWH_PickupDetailsLocation[0].ModificatorUserID = pPick.UserID;
							objCWH_PickupDetailsLocation.lstCVarWH_PickupDetailsLocation[0].CreationDate =
							objCWH_PickupDetailsLocation.lstCVarWH_PickupDetailsLocation[0].ModificationDate = DateTime.Now;
							ex = objCWH_PickupDetailsLocation.SaveMethod(objCWH_PickupDetailsLocation.lstCVarWH_PickupDetailsLocation);
						}
					}
					else
					{
						objCWH_PickupDetailsLocation.lstCVarWH_PickupDetailsLocation[0].PickedQuantity = pPick.PickedQuantity;
						objCWH_PickupDetailsLocation.lstCVarWH_PickupDetailsLocation[0].PDL_PalletID = pPick.TargetPalletID;
						objCWH_PickupDetailsLocation.lstCVarWH_PickupDetailsLocation[0].PDL_LocationID = pPick.TargetLocationID;
						objCWH_PickupDetailsLocation.lstCVarWH_PickupDetailsLocation[0].ModificatorUserID = pPick.UserID;
						objCWH_PickupDetailsLocation.lstCVarWH_PickupDetailsLocation[0].ModificationDate = DateTime.Now;
						ex = objCWH_PickupDetailsLocation.SaveMethod(objCWH_PickupDetailsLocation.lstCVarWH_PickupDetailsLocation);
					}
				}
				if(ex==null)
				{
					UpdatePickupStatus(pPick.ID);
				}
			}
			return Request.CreateResponse(statusCode, new { ErrMsg = errMsg});

		}
		[HttpGet]
		public HttpResponseMessage UnPick(int pID)
		{
			Exception ex = null;
			string errMsg = "";
			HttpStatusCode statusCode = HttpStatusCode.OK;

			CvwWH_PickupDetailsLocation objCvwWH_PickupDetailsLocation = new CvwWH_PickupDetailsLocation();
			objCvwWH_PickupDetailsLocation.GetList($"where ID={pID}");
			if (objCvwWH_PickupDetailsLocation.lstCVarvwWH_PickupDetailsLocation.Count == 0)
			{
				statusCode = HttpStatusCode.BadRequest;
				errMsg = "Pickup Not Found!";
				ex = new Exception(errMsg);
			}
			if (ex == null)
			{
				long PickupID = objCvwWH_PickupDetailsLocation.lstCVarvwWH_PickupDetailsLocation[0].PickupID;
				long ItemBalanceID = objCvwWH_PickupDetailsLocation.lstCVarvwWH_PickupDetailsLocation[0].ItemBalanceID;

				CWH_PickupDetailsLocation objCWH_PickupDetailsLocation = new CWH_PickupDetailsLocation();
				var pdl = objCvwWH_PickupDetailsLocation.lstCVarvwWH_PickupDetailsLocation[0];

				WH_ItemBalance objWH_ItemBalance = new WH_ItemBalance();

				var itemBalance = objWH_ItemBalance.Get("*", $"ID={ItemBalanceID}");

				ex = objCWH_PickupDetailsLocation.UpdateList($"PDL_PalletID='{itemBalance[0].PalletID}', PDL_LocationID={itemBalance[0].LocationID}, PickedQuantity=0 where ID={pID}");
				if (ex == null && itemBalance[0].BySerialNo)
				{
					CWH_ReceiveDetailsSerial objCWH_ReceiveDetailsSerial = new CWH_ReceiveDetailsSerial();
					objCWH_ReceiveDetailsSerial.UpdateList($"PickupDetailsLocationID=NULL where PickupDetailsLocationID={pID}");
				}
			}

			if (ex == null)
			{
				UpdatePickupStatus(pID);
			}
			return Request.CreateResponse(statusCode, new { ErrMsg = errMsg });
		}

		[HttpGet]
		public HttpResponseMessage RelocatePickup(long pID)
		{
			CvwWH_PickupDetailsLocation objCvwWH_PickupDetailsLocation = new CvwWH_PickupDetailsLocation();
			objCvwWH_PickupDetailsLocation.GetList($"where ID={pID}");

			string whereClause = $"ID<>{objCvwWH_PickupDetailsLocation.lstCVarvwWH_PickupDetailsLocation[0].ItemBalanceID} and PurchaseItemID={objCvwWH_PickupDetailsLocation.lstCVarvwWH_PickupDetailsLocation[0].PurchaseItemID} and Quantity>IsNull(PDL_DemandedQuantity,0) and IsNull(LocationTypeID,0)=0 and IsNull(IsPalletHeld,0)=0 and IsNull(IsBatchHeld,0)=0";
			WH_ItemBalance objWH_ItemBalance = new WH_ItemBalance();
			var ItemBalance = objWH_ItemBalance.Get("*", whereClause);

			return Request.CreateResponse(HttpStatusCode.OK, ItemBalance);
		}
		[HttpPost]
		public HttpResponseMessage SaveRelocate(Mobile_3PL_Relocate pData)
		{
			Exception ex = null;
			string errMsg = "";
			HttpStatusCode statusCode = HttpStatusCode.OK;

			CvwWH_PickupDetailsLocation objCvwWH_PickupDetailsLocation = new CvwWH_PickupDetailsLocation();

			if (pData == null || pData.Details==null || pData .Details.Count== 0)
			{
				statusCode = HttpStatusCode.BadRequest;
				errMsg = "No Data To Save";
				ex = new Exception(errMsg);
			}
			if(ex==null)
			{
				objCvwWH_PickupDetailsLocation.GetList($"where ID={pData.ID}");
				if(pData.Details.Sum(a=>a.Quantity)!= objCvwWH_PickupDetailsLocation.lstCVarvwWH_PickupDetailsLocation[0].PDL_DemandedQuantity)
				{
					statusCode = HttpStatusCode.BadRequest;
					errMsg = $"Demanded Quantity {objCvwWH_PickupDetailsLocation.lstCVarvwWH_PickupDetailsLocation[0].PDL_DemandedQuantity}";
					ex = new Exception(errMsg);
				}
			}
			if(ex==null)
			{
				var now = DateTime.Now;
				CWH_PickupDetails objCWH_PickupDetails = new CWH_PickupDetails();
				objCWH_PickupDetails.GetList($"where PickupID={objCvwWH_PickupDetailsLocation.lstCVarvwWH_PickupDetailsLocation[0].PickupID} and PurchaseItemID={objCvwWH_PickupDetailsLocation.lstCVarvwWH_PickupDetailsLocation[0].PurchaseItemID}");
				CWH_PickupDetailsLocation objCWH_PickupDetailsLocation = new CWH_PickupDetailsLocation();

				ex = objCWH_PickupDetailsLocation.DeleteList($"where IsNull(PickedQuantity,0)=0 and ItemBalanceID={objCvwWH_PickupDetailsLocation.lstCVarvwWH_PickupDetailsLocation[0].ItemBalanceID} and PickupDetailsID = {objCWH_PickupDetails.lstCVarWH_PickupDetails[0].ID}");

				if (ex == null)
				{
					foreach (var item in pData.Details)
					{
						objCWH_PickupDetailsLocation.lstCVarWH_PickupDetailsLocation.Add(new CVarWH_PickupDetailsLocation
						{
							PickupDetailsID = objCWH_PickupDetails.lstCVarWH_PickupDetails[0].ID,
							ItemBalanceID = item.ItemBalanceID,
							PDL_LocationID = item.TargetLocationID,
							PDL_PalletID = item.TargetPalletID,
							PDL_DemandedQuantity = item.Quantity,
							CreationDate = now,
							CreatorUserID = pData.UserID,
						});
						Common.Common.ReplaceNull(objCWH_PickupDetailsLocation.lstCVarWH_PickupDetailsLocation[objCWH_PickupDetailsLocation.lstCVarWH_PickupDetailsLocation.Count - 1]);
					}
					ex = objCWH_PickupDetailsLocation.SaveMethod(objCWH_PickupDetailsLocation.lstCVarWH_PickupDetailsLocation);
				}
			}
		

			return Request.CreateResponse(statusCode, new { ErrMsg = errMsg });
		}
		#endregion
	}

	public class Mobile_3PL_Login
	{
		public int UserID { get; set; }
		public string Username { get; set; }
		public string Password { get; set; }
	}

	public class Mobile_3PL_Pick
	{
		public long ID { get; set; }
		public long ItemBalanceID { get; set; }
		public string ItemCode { get; set; }
		public string ItemName { get; set; }
		public string LocationCode { get; set; }
		public string PalletID { get; set; }
		public string BatchNumber { get; set; }
		public string ProductionDate { get; set; }
		public string ExpirationDate { get; set; }
		public decimal DemandedQuantity { get; set; }
		public decimal PickedQuantity { get; set; }
		public string TargetPalletID { get; set; }
		public int TargetLocationID { get; set; }
		//
		public int UserID { get; set; }
		public int WarehouseID { get; set; }
	}
	public class Mobile_3PL_Relocate
	{
		public int UserID { get; set; }
		public int WarehouseID { get; set; }
		public long ID { get; set; }
		public List<Mobile_3PL_RelocateDetail> Details { get; set; }
	}
	public class Mobile_3PL_RelocateDetail
	{
		public long ItemBalanceID { get; set; }
		public decimal Quantity { get; set; }
		public int TargetLocationID { get; set; }
		public string TargetPalletID { get; set; }
	}
}

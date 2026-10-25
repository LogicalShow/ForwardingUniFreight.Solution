using ExcelDataReader;
using Forwarding.MvcApp.Entities.Warehousing;
using Forwarding.MvcApp.Models.MasterData.Invoicing.Generated;
using Forwarding.MvcApp.Models.NoAccess.Generated;
using Forwarding.MvcApp.Models.Operations.Operations.Generated;
using Forwarding.MvcApp.Models.Warehousing.MasterData.Generated;
using Forwarding.MvcApp.Models.Warehousing.Transactions.Generated;
using System;
using System.Collections.Generic;
using System.Data;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;
using OfficeOpenXml;
using OfficeOpenXml.DataValidation;
using OfficeOpenXml.DataValidation.Contracts;
using static AutoMapper.Internal.ExpressionFactory;
using System.IO.Packaging;
using Forwarding.MvcApp.Models.MasterData.Trucking.Generated;
using Forwarding.MvcApp.Models.Warehousing.Transactions.Customized;
using Forwarding.MvcApp.Models.Customized;
using Forwarding.MvcApp.Models.MasterData.Others.Generated;
using System.Text;
using Forwarding.MvcApp.Models.MasterData.Partners.Generated;

namespace Forwarding.MvcApp.Controllers.Warehousing.API_Transactions
{
	public class WH_InboundController : ApiController
	{
		#region Receive
		[HttpGet, HttpPost]
		public object[] LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned(bool pIsLoadArrayOfObjects, string pLanguage, Int32 pPageNumber, Int32 pPageSize, string pWhereClause, string pOrderBy, string pWhereClause_Warehouse = "where 1=1")
		{
			int _RowCount = 0;
			Exception checkException = null;
			CvwWH_Receive objCvwWH_Receive = new CvwWH_Receive();
			CWH_Warehouse objCWH_Warehouse = new CWH_Warehouse();

			var services = new List<SelectListOption>();
			var palletStatus = new List<SelectListOption>();
			var palletClass = new List<SelectListOption>();
			CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();

			if (pIsLoadArrayOfObjects)
			{
				checkException = objCWH_Warehouse.GetList($"{pWhereClause_Warehouse} ORDER BY Name");
				palletStatus.AddRange(objCCustomizedDBCall.ExecuteQuery_ListOfObjects($"SELECT ID, Name FROM PalletStatus", typeof(SelectListOption)).Cast<SelectListOption>().ToList());
				palletClass.AddRange(objCCustomizedDBCall.ExecuteQuery_ListOfObjects($"SELECT ID, Name FROM PalletClassification", typeof(SelectListOption)).Cast<SelectListOption>().ToList());
				services.AddRange(objCCustomizedDBCall.ExecuteQuery_ListOfObjects($"SELECT ID, Name FROM WH_Services", typeof(SelectListOption)).Cast<SelectListOption>().ToList());
			}

			checkException = objCvwWH_Receive.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);
			var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
			return new object[] {
				new JavaScriptSerializer().Serialize(objCvwWH_Receive.lstCVarvwWH_Receive)
				, _RowCount
				, serializer.Serialize(objCWH_Warehouse.lstCVarWH_Warehouse) //pWarehouse=pData[2]
                , serializer.Serialize(services) //pServices=pData[3]
                , serializer.Serialize(palletStatus) //pPalletClass=pData[4]
                , serializer.Serialize(palletClass) //pPalletClass=pData[5]
            };
		}

		[HttpGet, HttpPost]
		public object[] LoadHeaderWithDetails(Int64 pHeaderID, bool pIsRequest = false, bool pLoadDetails=false)
		{
			CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
			CvwWH_Receive objCvwWH_Receive = new CvwWH_Receive();
			CvwWH_ReceiveDetails objCvwWH_ReceiveDetails = new CvwWH_ReceiveDetails();
			Exception checkException = null;
			int _RowCount = 0;
			checkException = objCvwWH_Receive.GetListPaging(99999, 1, "WHERE ID=" + pHeaderID.ToString(), "ID", out _RowCount);
			if(pLoadDetails)
				checkException = objCvwWH_ReceiveDetails.GetList($"WHERE ReceiveID={pHeaderID.ToString()} Order By PurchaseItemCode");

			var total = objCCustomizedDBCall.ExecuteQuery_ListOfObjects($"select Sum(IsNull(ExpectedQuantity,0)) ExpectedQuantity, Sum(IsNull(Quantity,0)) Quantity from WH_ReceiveDetails where ReceiveID={pHeaderID}", typeof(CVarWH_ReceiveDetails)).Cast<CVarWH_ReceiveDetails>().ToList()[0];

			JavaScriptSerializer serializer = new JavaScriptSerializer { MaxJsonLength = int.MaxValue };

			return new object[] {
				  serializer.Serialize(objCvwWH_Receive.lstCVarvwWH_Receive[0]) //pData[0]
                , serializer.Serialize(objCvwWH_ReceiveDetails.lstCVarvwWH_ReceiveDetails) //pData[1]
                , serializer.Serialize(total) //pData[1]
			};
		}

		[HttpGet, HttpPost]
		public object[] LoadDetailsWithPaging(int pPageNumber, int pPageSize, string pWhereClause, string pOrderBy, bool pIsRequest)
		{
			Exception checkException = null;
			int _RowCount = 0;
			CvwWH_ReceiveDetails objCvwWH_ReceiveDetails = new CvwWH_ReceiveDetails();
			checkException = objCvwWH_ReceiveDetails.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);
			List<CVarvwWH_ReceiveDetails> Details = new List<CVarvwWH_ReceiveDetails>();
			if (pIsRequest && objCvwWH_ReceiveDetails.lstCVarvwWH_ReceiveDetails.Count > 0 && objCvwWH_ReceiveDetails.lstCVarvwWH_ReceiveDetails[0].ReceiveStatusID > 5)//created
			{
				var group = objCvwWH_ReceiveDetails.lstCVarvwWH_ReceiveDetails.GroupBy(a => new { a.PurchaseItemID, a.PurchaseItemCode, a.PurchaseItemName, a.PackageTypeID, a.PackageTypeName, a.ExpectedProductionDate, a.ExpectedExpirationDate, a.BatchNumber });
				foreach (var item in group)
				{
					Details.Add(new CVarvwWH_ReceiveDetails
					{
						PurchaseItemID = item.Key.PurchaseItemID,
						PurchaseItemCode = item.Key.PurchaseItemCode,
						PurchaseItemName = item.Key.PurchaseItemName,
						PackageTypeID = item.Key.PackageTypeID,
						PackageTypeName = item.Key.PackageTypeName,
						ExpectedQuantity = item.Sum(a => a.ExpectedQuantity),
						Quantity = item.Sum(a => a.Quantity),
						ExpectedProductionDate = item.Key.ExpectedProductionDate,
						ExpectedExpirationDate = item.Key.ExpectedExpirationDate,
						BatchNumber = item.Key.BatchNumber,
					});
				}
			}
			JavaScriptSerializer serializer = new JavaScriptSerializer { MaxJsonLength = int.MaxValue };
			return new object[] {
				serializer.Serialize(Details.Count>0? Details : objCvwWH_ReceiveDetails.lstCVarvwWH_ReceiveDetails) //pData[0]
				 ,  _RowCount //pData[1]
            };
		}

		[HttpGet, HttpPost]
		public object[] Save([FromBody]WhReceive pWhReceive)
		{

			string _ReturnedMessage = "";
			Exception checkException = null;

			var now = DateTime.Now;
			var currentUser = WebSecurity.CurrentUserId;

			CWH_Receive objCWH_Receive = new CWH_Receive();
			CvwWH_Receive objCvwWH_Receive = new CvwWH_Receive();
			CWH_ReceiveDetails objCWH_ReceiveDetails = new CWH_ReceiveDetails();
			CvwWH_ReceiveDetails objCvwWH_ReceiveDetails = new CvwWH_ReceiveDetails();

			if (pWhReceive.ID > 0)
				objCWH_Receive.GetItem(pWhReceive.ID);

			if (objCWH_Receive.lstCVarWH_Receive.Count > 0 && objCWH_Receive.lstCVarWH_Receive[0].IsFinalized)
				checkException = new Exception($"Order is finalized!");

			if (checkException == null)
			{
				if (objCWH_Receive.lstCVarWH_Receive.Count == 0)
					objCWH_Receive.lstCVarWH_Receive.Add(new CVarWH_Receive());

				objCWH_Receive.lstCVarWH_Receive[0].ID = pWhReceive.ID;
				//objCWH_Receive.lstCVarWH_Receive[0].Code = "0";
				objCWH_Receive.lstCVarWH_Receive[0].WarehouseID = pWhReceive.WarehouseID;
				objCWH_Receive.lstCVarWH_Receive[0].CustomerID = pWhReceive.CustomerID;
				objCWH_Receive.lstCVarWH_Receive[0].OwnerID = pWhReceive.OwnerID;
				objCWH_Receive.lstCVarWH_Receive[0].ReceiveDate = DateTime.ParseExact(pWhReceive.ReceiveDate + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture);
				objCWH_Receive.lstCVarWH_Receive[0].ETD = objCWH_Receive.lstCVarWH_Receive[0].ReceiveDate; //DateTime.ParseExact(pETD + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture);
				objCWH_Receive.lstCVarWH_Receive[0].ETA = objCWH_Receive.lstCVarWH_Receive[0].ReceiveDate; //DateTime.ParseExact(pETA + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture);
				objCWH_Receive.lstCVarWH_Receive[0].ArrivalDate = objCWH_Receive.lstCVarWH_Receive[0].ReceiveDate; //DateTime.ParseExact(pArrivalDate + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture);
				objCWH_Receive.lstCVarWH_Receive[0].StatusID = pWhReceive.StatusID;
				objCWH_Receive.lstCVarWH_Receive[0].IsFinalized = pWhReceive.IsFinalized;
				objCWH_Receive.lstCVarWH_Receive[0].FinalizeDate = DateTime.ParseExact(pWhReceive.FinalizeDate + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture);
				objCWH_Receive.lstCVarWH_Receive[0].FinalizeUserID = pWhReceive.IsFinalized? currentUser:0;
				objCWH_Receive.lstCVarWH_Receive[0].Notes = pWhReceive.Notes;
				objCWH_Receive.lstCVarWH_Receive[0].EquipmentID = pWhReceive.EquipmentID;
				objCWH_Receive.lstCVarWH_Receive[0].ContainerNumber = pWhReceive.ContainerNumber;
				objCWH_Receive.lstCVarWH_Receive[0].PO = pWhReceive.PO;
				objCWH_Receive.lstCVarWH_Receive[0].MasterFile = pWhReceive.MasterFile;
				objCWH_Receive.lstCVarWH_Receive[0].Invoice = pWhReceive.Invoice;
				objCWH_Receive.lstCVarWH_Receive[0].InvoiceID = 0;
				objCWH_Receive.lstCVarWH_Receive[0].OperationID = 0;

				if (pWhReceive.ID > 0)
				{
					objCWH_Receive.lstCVarWH_Receive[0].ModificatorUserID = currentUser;
					objCWH_Receive.lstCVarWH_Receive[0].ModificationDate = now;
				}
				else
				{
					objCWH_Receive.lstCVarWH_Receive[0].CreatorUserID = objCWH_Receive.lstCVarWH_Receive[0].ModificatorUserID = currentUser;
					objCWH_Receive.lstCVarWH_Receive[0].CreationDate = objCWH_Receive.lstCVarWH_Receive[0].ModificationDate = now;
					objCWH_Receive.lstCVarWH_Receive[0].CreationSource = CreationSource.web.ToString();
				}
				Common.Common.ReplaceNull(objCWH_Receive.lstCVarWH_Receive[0]);
				checkException = objCWH_Receive.SaveMethod(objCWH_Receive.lstCVarWH_Receive);
			}

			if (checkException == null)
			{
				pWhReceive.ID = objCWH_Receive.lstCVarWH_Receive[0].ID;

				if (!string.IsNullOrEmpty(pWhReceive.Reason) && pWhReceive.Reason != "0")
				{
					CWH_ReceiveLog cWH_ReceiveLog = new CWH_ReceiveLog();

					cWH_ReceiveLog.lstCVarWH_ReceiveLog.Add(new CVarWH_ReceiveLog
					{
						ReceiveID = (int)pWhReceive.ID,
						Reason = pWhReceive.Reason,
						UserID = currentUser,
						LogDate = now,
					});
					var ex = cWH_ReceiveLog.SaveMethod(cWH_ReceiveLog.lstCVarWH_ReceiveLog);
				}

				if (!pWhReceive.SaveMasterOnly)
				{
					var missingLst = new List<Forwarding.MvcApp.Models.Warehousing.Transactions.Generated.Old.CVarWH_ReceiveDetails>();


					var DetailIDs = string.Join(",", pWhReceive.Details.Select(a => a.ID));
					checkException = objCWH_ReceiveDetails.DeleteList($"where ReceiveID={pWhReceive.ID} and ID not in ({DetailIDs})");

					CWH_ReceiveDetails objCWH_ReceiveDetails_DB = new CWH_ReceiveDetails();
					objCWH_ReceiveDetails_DB.GetList($"where ReceiveID={pWhReceive.ID}");

					foreach (var item in pWhReceive.Details)
					{
						objCWH_ReceiveDetails.lstCVarWH_ReceiveDetails.Add(new CVarWH_ReceiveDetails
						{
							ID = item.ID,
							ReceiveID = pWhReceive.ID,
							ReceiveDate = objCWH_Receive.lstCVarWH_Receive[0].ReceiveDate,
							PurchaseItemID = item.PurchaseItemID,
							BarCode = item.BarCode,
							BatchNumber = item.BatchNumber,
							Serial = item.Serial,
							LocationID = item.LocationID,
							LotNo = item.LotNo,
							PalletID = item.PalletID,
							PalletStatusID = item.PalletStatusID,
							PalletClassID = item.PalletClassID,
							ExpectedQuantity = item.ExpectedQuantity,
							Quantity = item.Quantity,
							SplitQuantity = item.SplitQuantity,
							ExpectedExpirationDate = DateTime.ParseExact(item.ExpectedExpirationDate + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture),
							ExpirationDate = DateTime.ParseExact(item.ExpirationDate + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture),
							ExpectedProductionDate = DateTime.ParseExact(item.ExpectedProductionDate + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture),
							ProductionDate = DateTime.ParseExact(item.ProductionDate + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture),
							RD_PackageTypeID = item.RD_PackageTypeID,
							RD_IsFinalized = item.ID > 0 ? objCWH_ReceiveDetails_DB.lstCVarWH_ReceiveDetails.Find(a => a.ID == item.ID).RD_IsFinalized : item.RD_IsFinalized,

							ContainerNumber = item.ContainerNumber,
							IsDefected = item.IsDefected,
							DefectionReason = item.DefectionReason,
							DetailFile = item.DetailFile,

							ImportedBy = item.ImportedBy,
							Invoice = item.Invoice,
							IsExcluded = item.IsExcluded,
							IsPickupAddedToInvoice = item.IsPickupAddedToInvoice,

							Notes = item.Notes,
							WeightInTons = item.WeightInTons,
							VehicleActionID = item.VehicleActionID,
							OperationVehicleID = item.OperationVehicleID,

							PickupWithoutInvoiceDate = item.PickupWithoutInvoiceDate,
							PO = item.PO,
							StatusID = item.StatusID,

							Extra1 = item.Extra1,
							Extra2 = item.Extra2,
							Extra3 = item.Extra3,
							Extra4 = item.Extra4,
							Extra5 = item.Extra5,
							Extra6 = item.Extra6,
							Extra7 = item.Extra7,
							Extra8 = item.Extra8,
							Extra9 = item.Extra9,
							CreationDate = item.ID > 0 ? objCWH_ReceiveDetails_DB.lstCVarWH_ReceiveDetails.Find(a => a.ID == item.ID).CreationDate : now,
							CreatorUserID = item.ID > 0 ? objCWH_ReceiveDetails_DB.lstCVarWH_ReceiveDetails.Find(a => a.ID == item.ID).CreatorUserID : currentUser,
							ModificationDate = now,
							ModificatorUserID = currentUser,
							CreationSource = item.ID > 0 ? objCWH_ReceiveDetails_DB.lstCVarWH_ReceiveDetails.Find(a => a.ID == item.ID).CreationSource : CreationSource.web.ToString()
						});
						Common.Common.ReplaceNull(objCWH_ReceiveDetails.lstCVarWH_ReceiveDetails[objCWH_ReceiveDetails.lstCVarWH_ReceiveDetails.Count - 1]);

						if (pWhReceive.GenerateOrderByMissing && objCWH_ReceiveDetails.lstCVarWH_ReceiveDetails[objCWH_ReceiveDetails.lstCVarWH_ReceiveDetails.Count - 1].Notes?.Contains("missing") == true)
						{
							missingLst.Add(new Models.Warehousing.Transactions.Generated.Old.CVarWH_ReceiveDetails
							{
								ReceiveDate = objCWH_Receive.lstCVarWH_Receive[0].ReceiveDate,
								PurchaseItemID = item.PurchaseItemID,
								BarCode = item.BarCode,
								//BatchNumber = item.BatchNumber,
								Serial = item.Serial,
								LocationID = item.LocationID,
								LotNo = item.LotNo,
								//PalletID = item.PalletID,
								PalletStatusID = item.PalletStatusID,
								ExpectedQuantity = Convert.ToDecimal(item.Notes.Replace("missing:", "")),
								Quantity = 0,
								SplitQuantity = 0,
								ExpectedExpirationDate = DateTime.ParseExact(item.ExpectedExpirationDate + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture),
								//ExpirationDate = DateTime.ParseExact(item.ExpirationDate + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture),
								ExpectedProductionDate = DateTime.ParseExact(item.ExpectedProductionDate + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture),
								//ProductionDate = DateTime.ParseExact(item.ProductionDate + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture),
								RD_PackageTypeID = item.RD_PackageTypeID,
								CreationSource=CreationSource.web.ToString()
							});
							objCWH_ReceiveDetails.lstCVarWH_ReceiveDetails[objCWH_ReceiveDetails.lstCVarWH_ReceiveDetails.Count - 1].Notes = "";
							objCWH_ReceiveDetails.lstCVarWH_ReceiveDetails[objCWH_ReceiveDetails.lstCVarWH_ReceiveDetails.Count - 1].ExpectedQuantity = objCWH_ReceiveDetails.lstCVarWH_ReceiveDetails[objCWH_ReceiveDetails.lstCVarWH_ReceiveDetails.Count - 1].Quantity + objCWH_ReceiveDetails.lstCVarWH_ReceiveDetails[objCWH_ReceiveDetails.lstCVarWH_ReceiveDetails.Count - 1].SplitQuantity;
						}
					}
					checkException = objCWH_ReceiveDetails.SaveMethod(objCWH_ReceiveDetails.lstCVarWH_ReceiveDetails);

					if (checkException == null && pWhReceive.GenerateOrderByMissing)
					{


						objCWH_Receive.lstCVarWH_Receive[0].ID = 0;
						objCWH_Receive.lstCVarWH_Receive[0].Code = "";
						objCWH_Receive.lstCVarWH_Receive[0].CreationDate = objCWH_Receive.lstCVarWH_Receive[0].ModificationDate = now;
						objCWH_Receive.lstCVarWH_Receive[0].CreatorUserID = objCWH_Receive.lstCVarWH_Receive[0].ModificatorUserID = currentUser;
						objCWH_Receive.lstCVarWH_Receive[0].CreationSource = CreationSource.web.ToString();
						if (string.IsNullOrEmpty(objCWH_Receive.lstCVarWH_Receive[0].Notes) || objCWH_Receive.lstCVarWH_Receive[0].Notes == "0")
							objCWH_Receive.lstCVarWH_Receive[0].Notes = $"missing from order: {objCvwWH_Receive.lstCVarvwWH_Receive[0].Code}";
						var ex = objCWH_Receive.SaveMethod(objCWH_Receive.lstCVarWH_Receive);
						if (ex == null)
						{

							foreach (var item in missingLst)
							{
								item.ReceiveID = objCWH_Receive.lstCVarWH_Receive[0].ID;
								item.CreationDate = item.ModificationDate = now;
								item.CreatorUserID = item.ModificatorUserID = currentUser;
								Common.Common.ReplaceNull(item);
							}
							ex = objCWH_ReceiveDetails.SaveMethod(missingLst);
						}
					}
				}
				
			}
			else
				_ReturnedMessage = checkException.Message;

			//if (_ReturnedMessage == "")
			checkException = objCvwWH_Receive.GetList("WHERE ID=" + pWhReceive.ID);



			return new object[] {
				_ReturnedMessage
				, pWhReceive.ID //pData[1]
                , new JavaScriptSerializer().Serialize(objCvwWH_Receive.lstCVarvwWH_Receive[0]) //pData[2]
                //, new JavaScriptSerializer().Serialize(objCvwWH_ReceiveDetails.lstCVarvwWH_ReceiveDetails) //pData[3]
            };
		}

		[HttpGet, HttpPost]
		public bool Delete(String pReceiveIDs)
		{
			Exception checkException = new Exception();
			bool _result = false;
			CWH_Receive objCWH_Receive = new CWH_Receive();
			CWH_ReceiveDetails objCWH_ReceiveDetails = new CWH_ReceiveDetails();
			CWH_ReceiveDetailsSerial objCWH_ReceiveDetailsSerial = new CWH_ReceiveDetailsSerial();
			CWH_PickupDetailsLocation objCWH_PickupDetailsLocation = new CWH_PickupDetailsLocation();
			CWH_ReserveDetailsLocation objCWH_ReserveDetailsLocation = new CWH_ReserveDetailsLocation();
			//Delete from WH_Receive
			foreach (var currentID in pReceiveIDs.Split(','))
			{
				//Delete from WH_ReceiveDetails
				objCWH_ReceiveDetails.GetList("WHERE ReceiveID = " + currentID);
				var ReceiveDetailsIDs = objCWH_ReceiveDetails.lstCVarWH_ReceiveDetails.Select(x => x.ID).ToList();
				foreach (var currentReceiveDetailID in ReceiveDetailsIDs)
				{
					//Delete from WH_ReceiveDetailsSerial
					objCWH_ReceiveDetailsSerial.GetList("WHERE ReceiveDetailsID = " + currentReceiveDetailID);
					var ReceiveDetailsSerialIDs = objCWH_ReceiveDetailsSerial.lstCVarWH_ReceiveDetailsSerial.Select(x => x.ID).ToList();
					foreach (var currentReceiveDetailsSerialID in ReceiveDetailsSerialIDs)
					{
						objCWH_ReceiveDetailsSerial.lstDeletedCPKWH_ReceiveDetailsSerial.Add(new CPKWH_ReceiveDetailsSerial() { ID = currentReceiveDetailsSerialID });
					}
					checkException = objCWH_ReceiveDetailsSerial.DeleteItem(objCWH_ReceiveDetailsSerial.lstDeletedCPKWH_ReceiveDetailsSerial);

					//Delete from WH_PickupDetailsLocation
					objCWH_PickupDetailsLocation.GetList("WHERE ReceiveDetailsID = " + currentReceiveDetailID);
					var PickupDetailsLocationIDs = objCWH_PickupDetailsLocation.lstCVarWH_PickupDetailsLocation.Select(x => x.ID).ToList();
					foreach (var currentPickupDetailsLocationID in PickupDetailsLocationIDs)
					{
						objCWH_PickupDetailsLocation.lstDeletedCPKWH_PickupDetailsLocation.Add(new CPKWH_PickupDetailsLocation() { ID = currentPickupDetailsLocationID });
					}
					checkException = objCWH_PickupDetailsLocation.DeleteItem(objCWH_PickupDetailsLocation.lstDeletedCPKWH_PickupDetailsLocation);

					//Delete from WH_ReserveDetailsLocation
					objCWH_ReserveDetailsLocation.GetList("WHERE ReceiveDetailID = " + currentReceiveDetailID);
					var ReserveDetailsLocationIDs = objCWH_ReserveDetailsLocation.lstCVarWH_ReserveDetailsLocation.Select(x => x.ID).ToList();
					foreach (var currentReserveDetailsLocationID in ReserveDetailsLocationIDs)
					{
						objCWH_ReserveDetailsLocation.lstDeletedCPKWH_ReserveDetailsLocation.Add(new CPKWH_ReserveDetailsLocation() { ID = currentReserveDetailsLocationID });
					}
					checkException = objCWH_PickupDetailsLocation.DeleteItem(objCWH_PickupDetailsLocation.lstDeletedCPKWH_PickupDetailsLocation);

					objCWH_ReceiveDetails.lstDeletedCPKWH_ReceiveDetails.Add(new CPKWH_ReceiveDetails() { ID = currentReceiveDetailID });
				}
				objCWH_Receive.lstDeletedCPKWH_Receive.Add(new CPKWH_Receive() { ID = Int64.Parse(currentID.Trim()) });
				checkException = objCWH_ReceiveDetails.DeleteItem(objCWH_ReceiveDetails.lstDeletedCPKWH_ReceiveDetails);
			}
			checkException = objCWH_Receive.DeleteItem(objCWH_Receive.lstDeletedCPKWH_Receive);
			if (checkException != null) // an exception is caught in the model
			{
				if (checkException.Message.Contains("DELETE")) // some or all of the Receives were not deleted due to dependencies
					_result = false;
			}
			else //deleted successfully
				_result = true;
			return _result;
		}

		[HttpGet, HttpPost]
		public object HasMissingQty(string pWhereClause)
		{
			CWH_ReceiveDetails objCWH_ReceiveDetails = new CWH_ReceiveDetails();
			objCWH_ReceiveDetails.GetList(pWhereClause);
			return objCWH_ReceiveDetails.lstCVarWH_ReceiveDetails.Count > 0;
		}

		[HttpGet, HttpPost]
		public object[] Finalize(Int64 pFinalizedReceiveID)
		{
			CWH_Receive objCWH_Receive = new CWH_Receive();
			CvwWH_Receive objCvwWH_Receive = new CvwWH_Receive();
			int constReceiveStatusFinalized = 30;
			string _ReturnedMessage = "";
			Exception checkException = null;
			checkException = objCWH_Receive.UpdateList($"IsFinalized=1, StatusID={constReceiveStatusFinalized},FinalizeDate=GETDATE(), FinalizeUserID={WebSecurity.CurrentUserId} WHERE ID=pFinalizedReceiveID");
			if (checkException == null)
			{
				//TODO: throw into operations
			}
			else
				_ReturnedMessage = checkException.Message;
			return new object[] {
				_ReturnedMessage
			};
		}

		[HttpGet, HttpPost]
		public object[] SetPutawayStatus(Int64 pReceiveIDToSet)
		{
			CWH_ReceiveDetails objCWH_ReceiveDetails = new CWH_ReceiveDetails();
			CWH_Receive objCWH_Receive = new CWH_Receive();
			int _RowCount = 0;
			int constReceiveStatusInProgress = 10;
			int constReceiveStatusPutaway = 20;
			//int constReceiveDetailsStatusPending = 10;
			//int constReceiveDetailsStatusPutaway = 40;
			Exception checkException = null;
			checkException = objCWH_ReceiveDetails.GetListPaging(99999, 1, "WHERE ReceiveID=" + pReceiveIDToSet.ToString(), "ID", out _RowCount);
			if (objCWH_ReceiveDetails.lstCVarWH_ReceiveDetails.Count == 0) //no details so InProgress
				objCWH_Receive.UpdateList("StatusID=" + constReceiveStatusInProgress + " WHERE ID=" + pReceiveIDToSet.ToString());
			else
			{
				checkException = objCWH_ReceiveDetails.GetListPaging(99999, 1, "WHERE ReceiveID=" + pReceiveIDToSet.ToString() + " AND LocationID IS NULL ", "ID", out _RowCount);
				if (objCWH_ReceiveDetails.lstCVarWH_ReceiveDetails.Count > 0)
					objCWH_Receive.UpdateList("StatusID=" + constReceiveStatusInProgress + " WHERE ID=" + pReceiveIDToSet.ToString());

				else //if finalized then no save coz it will be disabled
					objCWH_Receive.UpdateList("StatusID=" + constReceiveStatusPutaway + " WHERE ID=" + pReceiveIDToSet.ToString());
			}
			return new object[] {
			};
		}

		[HttpGet, HttpPost]
		public object UpdateOrders(string pUpdateClause)
		{
			CWH_Receive objCWH_Receive = new CWH_Receive();
			var ex = objCWH_Receive.UpdateList(pUpdateClause);
			return ex;
		}
		[HttpGet, HttpPost]
		public object FinalizeDetails(string pUpdateClause, string pIDs)
		{
			Exception exception = null;
			CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
			var detail = objCCustomizedDBCall.ExecuteQuery_ListOfObjects($"select IsFinalized,RD_IsFinalized from vwWH_ReceiveDetails where ID in ({pIDs})", typeof(CVarvwWH_ReceiveDetails)).Cast<CVarvwWH_ReceiveDetails>().ToList();
			if (detail != null && detail.Count > 0)
			{
				if (detail[0].IsFinalized)
					exception = new Exception("This order is finalized!");
				else if (detail[0].RD_IsFinalized)
					exception = new Exception("This line is finalized!");

				if (exception == null)
				{
					CWH_ReceiveDetails objCWH_ReceiveDetails = new CWH_ReceiveDetails();
					exception = objCWH_ReceiveDetails.UpdateList(pUpdateClause);
					if (exception == null)
					{
						objCWH_ReceiveDetails.GetList($"where ID in ({pIDs}) and IsNull(Quantity,0)>0 and IsNull(LocationID,0)>0 and IsNull(PalletID,'')<>''");
						List<ItemBalance> lst = new List<ItemBalance>();
						foreach (var item in objCWH_ReceiveDetails.lstCVarWH_ReceiveDetails)
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
						var ex = itemBalance.Add(lst);
					}
				}

			}

			return exception;
		}
		#endregion Receive
		#region ReceiveDetails
		[HttpGet, HttpPost]
		public object[] ReceiveDetails_LoadAll(bool pIsLoadArrayOfObjects, string pLanguage, Int32 pPageNumber, Int32 pPageSize, string pWhereClauseReceiveDetails, string pOrderBy)
		{
			int _RowCount = 0;
			Exception checkException = null;
			CvwWH_ReceiveDetails objvwCWH_ReceiveDetails = new CvwWH_ReceiveDetails();
			if (pIsLoadArrayOfObjects)
			{
			}
			checkException = objvwCWH_ReceiveDetails.GetListPaging(pPageSize, pPageNumber, pWhereClauseReceiveDetails, pOrderBy, out _RowCount);
			//var pDistinctReceives = objvwCWH_ReceiveDetails.lstCVarvwWH_ReceiveDetails
			//    .GroupBy(g => g.ReceiveID)
			//    .Select(s => new
			//    {
			//        ID = s.First().ID
			//        ,
			//        Code = s.First().ReceiveCode
			//    });
			return new object[] {
                //new JavaScriptSerializer().Serialize(pDistinctReceives.ToList())
                new JavaScriptSerializer().Serialize(objvwCWH_ReceiveDetails.lstCVarvwWH_ReceiveDetails)
				, _RowCount
			};
		}

		[HttpGet, HttpPost]
		public object[] ReceiveDetails_LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned(bool pIsLoadArrayOfObjects, string pLanguage, Int32 pPageNumber, Int32 pPageSize, string pWhereClauseForPDI, string pOrderBy)
		{
			int _RowCount = 0;
			int _RowCount2 = 0;
			Exception checkException = null;
			CvwWH_ReceiveDetails objCvwWH_ReceiveDetails = new CvwWH_ReceiveDetails();
			CWH_Warehouse objCWH_Warehouse = new CWH_Warehouse();
			CvwOperationsToRestoreInvoices objCOperations = new CvwOperationsToRestoreInvoices();
			CvwWH_ReceiveDetails objCvwWH_ReceiveDetails_GetPurchaseItems = new CvwWH_ReceiveDetails();
			CvwWH_ReceiveDetails objCvwWH_ReceiveDetails_GetCustomers = new CvwWH_ReceiveDetails();
			CPurchaseItem objCPurchaseItem_All = new CPurchaseItem();

			if (pIsLoadArrayOfObjects)
			{
				checkException = objCWH_Warehouse.GetListPaging(99999, 1, "WHERE 1=1", "Name", out _RowCount2);
				checkException = objCPurchaseItem_All.GetListPaging(99999, 1, "WHERE IsVehicle=0 AND IsFlexi=0", "Code,Name", out _RowCount2);
				checkException = objCOperations.GetList("WHERE BLType <> 2 ORDER BY ID DESC");
				checkException = objCvwWH_ReceiveDetails_GetCustomers.GetListPaging(999999, 1, "WHERE Quantity>PickedQuantity AND IsFinalized=1", "ID", out _RowCount);
				checkException = objCvwWH_ReceiveDetails_GetPurchaseItems.GetListPaging(999999, 1, "WHERE isnull(OperationVehicleID,0)=0 AND (Quantity>PickedQuantity) AND IsFinalized=1", "ID", out _RowCount2);
			}
			var pCustomerList = objCvwWH_ReceiveDetails_GetCustomers.lstCVarvwWH_ReceiveDetails
							.Select(s => new
							{
								ID = s.CustomerID
								,
								Name = s.CustomerName
							})
							.Distinct().OrderBy(o => o.Name).ToList();
			var pPurchaseItemList = objCvwWH_ReceiveDetails_GetPurchaseItems.lstCVarvwWH_ReceiveDetails
				.Select(s => new
				{
					ID = s.PurchaseItemID
					,
					Code = s.PurchaseItemCode
					,
					Name = s.PurchaseItemName
				})
				.Distinct().OrderBy(o => o.Code).ToList();
			var pPurchaseItem_AllList = objCPurchaseItem_All.lstCVarPurchaseItem
				.Select(s => new
				{
					ID = s.ID
					,
					Code = s.Code
					,
					Name = s.Name
				})
				.Distinct().OrderBy(o => o.Code).ToList();
			var pOperationsList = objCOperations.lstCVarvwOperationsToRestoreInvoices
				.Select(s => new
				{
					ID = s.ID
					,
					Code = s.EffectiveOperationCode
				}).ToList();

			checkException = objCvwWH_ReceiveDetails.GetListPaging(pPageSize, pPageNumber, pWhereClauseForPDI, pOrderBy, out _RowCount);

			var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
			return new object[]
			{
				new JavaScriptSerializer().Serialize(objCvwWH_ReceiveDetails.lstCVarvwWH_ReceiveDetails)
				, _RowCount
				, new JavaScriptSerializer().Serialize(objCWH_Warehouse.lstCVarWH_Warehouse) //pWarehouse=pData[2]
                , serializer.Serialize(pPurchaseItemList) //pPurchaseItem=pData[3]
                , new JavaScriptSerializer().Serialize(pCustomerList) //pCustomer=pData[4]
                , new JavaScriptSerializer().Serialize(pOperationsList) //pOperation=pData[5]
                , serializer.Serialize(pPurchaseItem_AllList) //pPurchaseItem_All=pData[6]
            };
		}

		[HttpGet, HttpPost]
		public object[] ReceiveDetails_Export(Int32 pPageNumber, Int32 pPageSize, string pWhereClauseExportReceiveDetails, string pOrderBy)
		{
			int _RowCount = 0;
			Exception checkException = null;
			CvwWH_ReceiveDetails objvwCWH_ReceiveDetails = new CvwWH_ReceiveDetails();
			checkException = objvwCWH_ReceiveDetails.GetListPaging(pPageSize, pPageNumber, pWhereClauseExportReceiveDetails, pOrderBy, out _RowCount);
			var pReceiveDetailsList = objvwCWH_ReceiveDetails.lstCVarvwWH_ReceiveDetails
				//.GroupBy(g => g.ReceiveID)
				.Select(s => new
				{
					ReceiveCode = s.ReceiveCode
					,
					ProductCode = s.PurchaseItemCode//s.First().PurchaseItemCode
					,
					ProductName = s.PurchaseItemName
					,
					PartNumber = s.PartNumber
					,
					Quantity = s.Quantity
					,
					AreaName = s.AreaName
					,
					LocationCode = s.LocationCode
					,
					PalletID = s.PalletID
					,
					Status = s.StatusName
					,
					ReceiveDate = s.ReceiveDate.ToShortDateString()
					,
					Notes = s.Notes

					,
					BatchNumber = s.BatchNumber
					,
					ExpirationDate = s.ExpirationDate.ToShortDateString()
					,
					ImportedBy = s.ImportedBy
					,
					WeightInTons = s.WeightInTons
				}).ToList();
			var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
			return new object[] {
				serializer.Serialize(pReceiveDetailsList)
			};
		}

		[HttpGet, HttpPost]
		public object[] ReceiveDetails_Save([FromBody]WhReceiveDetail pWhReceiveDetail)
		{
			Exception checkException = null;
			CVarWH_ReceiveDetails objCVarWH_ReceiveDetails = new CVarWH_ReceiveDetails();
			CWH_ReceiveDetails objCWH_ReceiveDetails = new CWH_ReceiveDetails();
			CvwWH_ReceiveDetails objCvwWH_ReceiveDetails = new CvwWH_ReceiveDetails();
			CWH_Receive objCWH_Receive = new CWH_Receive();
			CvwWH_Receive objCvwWH_Receive = new CvwWH_Receive();
			CWH_RowLocation objCWH_RowLocation = new CWH_RowLocation();
			int _RowCount = 0;

			#region Save
			objCVarWH_ReceiveDetails.ID = pWhReceiveDetail.ReceiveDetailsID;
			objCVarWH_ReceiveDetails.ReceiveID = pWhReceiveDetail.ReceiveID;
			objCVarWH_ReceiveDetails.Serial = pWhReceiveDetail.Serial;
			objCVarWH_ReceiveDetails.BarCode = pWhReceiveDetail.BarCode;
			objCVarWH_ReceiveDetails.PurchaseItemID = pWhReceiveDetail.PurchaseItemID;
			objCVarWH_ReceiveDetails.RD_PackageTypeID = pWhReceiveDetail.RD_PackageTypeID;
			objCVarWH_ReceiveDetails.Quantity = pWhReceiveDetail.Quantity;
			objCVarWH_ReceiveDetails.ExpectedQuantity = pWhReceiveDetail.ExpectedQuantity;
			objCVarWH_ReceiveDetails.SplitQuantity = pWhReceiveDetail.SplitQuantity;
			objCVarWH_ReceiveDetails.LocationID = pWhReceiveDetail.LocationID;
			objCVarWH_ReceiveDetails.PalletID = pWhReceiveDetail.PalletID;
			objCVarWH_ReceiveDetails.PalletStatusID = pWhReceiveDetail.PalletStatusID;
			objCVarWH_ReceiveDetails.PalletClassID = pWhReceiveDetail.PalletClassID;
			objCVarWH_ReceiveDetails.Notes = pWhReceiveDetail.Notes;
			objCVarWH_ReceiveDetails.ReceiveDate = DateTime.ParseExact(pWhReceiveDetail.ReceiveDate + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture);
			objCVarWH_ReceiveDetails.ProductionDate = DateTime.ParseExact(pWhReceiveDetail.ProductionDate + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture);
			objCVarWH_ReceiveDetails.ExpirationDate = DateTime.ParseExact(pWhReceiveDetail.ExpirationDate + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture);
			objCVarWH_ReceiveDetails.StatusID = pWhReceiveDetail.StatusID;
			objCVarWH_ReceiveDetails.ExpireDate = pWhReceiveDetail.ExpireDate;// DateTime.Parse(pExpireDate.ToString());
			objCVarWH_ReceiveDetails.LotNo = pWhReceiveDetail.LotNo;
			objCVarWH_ReceiveDetails.Extra1 = pWhReceiveDetail.Extra1;
			objCVarWH_ReceiveDetails.Extra2 = pWhReceiveDetail.Extra2;
			objCVarWH_ReceiveDetails.Extra3 = pWhReceiveDetail.Extra3;
			objCVarWH_ReceiveDetails.Extra4 = pWhReceiveDetail.Extra4;
			objCVarWH_ReceiveDetails.Extra5 = pWhReceiveDetail.Extra5;
			objCVarWH_ReceiveDetails.Extra6 = pWhReceiveDetail.Extra6;
			objCVarWH_ReceiveDetails.Extra7 = pWhReceiveDetail.Extra7;
			objCVarWH_ReceiveDetails.Extra8 = pWhReceiveDetail.Extra8;
			objCVarWH_ReceiveDetails.Extra9 = pWhReceiveDetail.Extra9;
			if (pWhReceiveDetail.ReceiveDetailsID != 0) //update so save original creator & creation date
			{
				CWH_ReceiveDetails objCGetCreationInformation = new CWH_ReceiveDetails();
				objCGetCreationInformation.GetItem(pWhReceiveDetail.ReceiveDetailsID);

				objCVarWH_ReceiveDetails.IsPickupAddedToInvoice = objCGetCreationInformation.lstCVarWH_ReceiveDetails[0].IsPickupAddedToInvoice;
				objCVarWH_ReceiveDetails.PickupWithoutInvoiceDate = objCGetCreationInformation.lstCVarWH_ReceiveDetails[0].PickupWithoutInvoiceDate;

				objCVarWH_ReceiveDetails.IsExcluded = objCGetCreationInformation.lstCVarWH_ReceiveDetails[0].IsExcluded;
				objCVarWH_ReceiveDetails.OperationVehicleID = objCGetCreationInformation.lstCVarWH_ReceiveDetails[0].OperationVehicleID;
				objCVarWH_ReceiveDetails.CreatorUserID = objCGetCreationInformation.lstCVarWH_ReceiveDetails[0].CreatorUserID;
				objCVarWH_ReceiveDetails.CreationDate = objCGetCreationInformation.lstCVarWH_ReceiveDetails[0].CreationDate;
			}
			else //Insert
			{
				objCVarWH_ReceiveDetails.IsPickupAddedToInvoice = false;
				objCVarWH_ReceiveDetails.PickupWithoutInvoiceDate = DateTime.Parse("01/01/1900");

				objCVarWH_ReceiveDetails.IsExcluded = false;
				objCVarWH_ReceiveDetails.OperationVehicleID = 0;
				objCVarWH_ReceiveDetails.CreatorUserID = WebSecurity.CurrentUserId;
				objCVarWH_ReceiveDetails.CreationDate = DateTime.Now;
			}

			objCVarWH_ReceiveDetails.BatchNumber = pWhReceiveDetail.BatchNumber;
			objCVarWH_ReceiveDetails.ExpirationDate = DateTime.ParseExact(pWhReceiveDetail.ExpirationDate + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture);
			objCVarWH_ReceiveDetails.ImportedBy = pWhReceiveDetail.ImportedBy;
			objCVarWH_ReceiveDetails.WeightInTons = pWhReceiveDetail.WeightInTons;
			objCVarWH_ReceiveDetails.PO = pWhReceiveDetail.PO;
			objCVarWH_ReceiveDetails.DetailFile = pWhReceiveDetail.File;
			objCVarWH_ReceiveDetails.Invoice = pWhReceiveDetail.Invoice;
			objCVarWH_ReceiveDetails.ContainerNumber = pWhReceiveDetail.ContainerNumber;

			objCVarWH_ReceiveDetails.ModificatorUserID = WebSecurity.CurrentUserId;
			objCVarWH_ReceiveDetails.ModificationDate = DateTime.Now;
			objCVarWH_ReceiveDetails.IsDefected = pWhReceiveDetail.IsDefected;
			objCVarWH_ReceiveDetails.DefectionReason = pWhReceiveDetail.DefectionReason;
			Common.Common.ReplaceNull(objCVarWH_ReceiveDetails);
			objCWH_ReceiveDetails.lstCVarWH_ReceiveDetails.Add(objCVarWH_ReceiveDetails);
			checkException = objCWH_ReceiveDetails.SaveMethod(objCWH_ReceiveDetails.lstCVarWH_ReceiveDetails);
			#endregion Save

			if (pWhReceiveDetail.IsSplitLine && checkException == null)
			{
				checkException = objCWH_ReceiveDetails.UpdateList($"ExpectedQuantity={pWhReceiveDetail.UpdateLineQty} where ID={pWhReceiveDetail.UpdateLineID}");
				checkException = objCvwWH_ReceiveDetails.GetList("WHERE ID=" + objCVarWH_ReceiveDetails.ID);
				return new object[] {
				checkException == null ? true : false
				, new JavaScriptSerializer().Serialize(checkException==null?objCvwWH_ReceiveDetails.lstCVarvwWH_ReceiveDetails[0]:null) //pData[1]
            };
			}
			else
			{
				#region Set Locations IsUsed
				if (checkException == null)
				{
					checkException = objCWH_RowLocation.UpdateList("IsUsed=0 ,StatusID = 10 WHERE ID=" + pWhReceiveDetail.OldLocationID.ToString());
					checkException = objCWH_RowLocation.UpdateList("IsUsed=1 ,StatusID = 20 WHERE ID=" + pWhReceiveDetail.LocationID.ToString());
				}
				#endregion Set Locations IsUsed

				#region Set ReceiveStatus if needed
				SetPutawayStatus(pWhReceiveDetail.ReceiveID);
				#endregion Set ReceiveStatus if needed

				checkException = objCvwWH_Receive.GetList("WHERE ID=" + pWhReceiveDetail.ReceiveID.ToString());
				checkException = objCvwWH_ReceiveDetails.GetListPaging(999999, 1, "WHERE ReceiveID=" + pWhReceiveDetail.ReceiveID.ToString(), "ID", out _RowCount);

				return new object[] {
				checkException == null ? true : false
				, new JavaScriptSerializer().Serialize(objCvwWH_ReceiveDetails.lstCVarvwWH_ReceiveDetails) //pData[1]
                , new JavaScriptSerializer().Serialize(objCvwWH_Receive.lstCVarvwWH_Receive[0]) //pData[2]
            };
			}

		}

		[HttpGet, HttpPost]
		public object[] ReceiveDetails_ImportFromExcel([FromBody] InsertList insertList)
		{
			Exception checkException = null;
			CPurchaseItem objCPurchaseItem = new CPurchaseItem();
			CWH_ReceiveDetails objCWH_ReceiveDetails = new CWH_ReceiveDetails();
			CvwWH_ReceiveDetails objCvwWH_ReceiveDetails = new CvwWH_ReceiveDetails();
			CvwWH_Receive objCvwWH_Receive = new CvwWH_Receive();
			var constReceiveDetailsStatusPending = 10;
			var constReceiveDetailsStatusPutAway = 40;
			int _RowCount = 0;
			string _ReturnedMessage = "";
			var _ArrBarCode = insertList.pBarCodeList.Split(',');
			var _ArrPurchaseItemCode = insertList.pPurchaseItemCodeList.Split(',');
			var _ArrQuantity = insertList.pQuantityList.Split(',');
			var _ArrPalletID = insertList.pPalletIDList.Split(',');
			var _ArrReceiveDate = insertList.pReceiveDateList.Split(',');
			var _ArrLocationCode = insertList.pLocationCodeList.Split(',');
			var _ArrNotes = insertList.pNotesList.Split(',');
			var _ArrSerial = insertList.pSerialList.Split(',');

			var _ArrBatchNumber = insertList.pBatchNumberList.Split(',');
			var _ArrExpirationDate = insertList.pExpirationDateList.Split(',');
			var _ArrImportedBy = insertList.pImportedByList.Split(',');
			var _ArrWeightInTons = insertList.pWeightInTonsList.Split(',');

			checkException = objCvwWH_Receive.GetList("WHERE ID=" + insertList.pReceiveID.ToString());
			int _WarehouseID = objCvwWH_Receive.lstCVarvwWH_Receive[0].WarehouseID;

			#region Save
			for (int i = 0; i < _ArrQuantity.Length && _ReturnedMessage == ""; i++)
			{
				objCPurchaseItem.GetListPaging(1, 1, "WHERE Code=N'" + _ArrPurchaseItemCode[i] + "'", "ID", out _RowCount);
				if (objCPurchaseItem.lstCVarPurchaseItem.Count == 0)
					_ReturnedMessage = "Product '" + _ArrPurchaseItemCode[i] + "' is not found.";
				else if (_ArrQuantity[i] == "0")
					_ReturnedMessage = "Product '" + _ArrPurchaseItemCode[i] + "' is having 0 quantity.";
				else
				{
					CvwWH_RowLocation objCvwWH_RowLocation = new CvwWH_RowLocation();
					if (_ArrLocationCode[i] != "0")
						checkException = objCvwWH_RowLocation.GetListPaging(1, 1, "WHERE Code=N'" + _ArrLocationCode[i] + "' AND WarehouseID=" + _WarehouseID, "ID", out _RowCount);
					int _LocationID = objCvwWH_RowLocation.lstCVarvwWH_RowLocation.Count == 0 ? 0 : objCvwWH_RowLocation.lstCVarvwWH_RowLocation[0].ID;

					CVarWH_ReceiveDetails objCVarWH_ReceiveDetails = new CVarWH_ReceiveDetails();
					objCVarWH_ReceiveDetails.ID = 0;
					objCVarWH_ReceiveDetails.ReceiveID = insertList.pReceiveID;
					objCVarWH_ReceiveDetails.BarCode = _ArrBarCode[i];
					objCVarWH_ReceiveDetails.PurchaseItemID = objCPurchaseItem.lstCVarPurchaseItem[0].ID;
					objCVarWH_ReceiveDetails.Quantity = decimal.Parse(_ArrQuantity[i]);
					objCVarWH_ReceiveDetails.ExpectedQuantity = decimal.Parse(_ArrQuantity[i]);
					objCVarWH_ReceiveDetails.SplitQuantity = 0;
					objCVarWH_ReceiveDetails.LocationID = _LocationID;
					objCVarWH_ReceiveDetails.PalletID = _ArrPalletID[i];
					objCVarWH_ReceiveDetails.Notes = _ArrNotes[i];
					objCVarWH_ReceiveDetails.ReceiveDate = DateTime.ParseExact(_ArrReceiveDate[i] + " 00.00.00.000", "d/M/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture);
					objCVarWH_ReceiveDetails.StatusID = _LocationID == 0 ? constReceiveDetailsStatusPending : constReceiveDetailsStatusPutAway;
					objCVarWH_ReceiveDetails.ExpireDate = DateTime.Parse("01/01/1900");//DateTime.Parse(pExpireDate.ToString());
					objCVarWH_ReceiveDetails.LotNo = _ArrSerial[i];

					objCVarWH_ReceiveDetails.BatchNumber = _ArrBatchNumber[i];
					objCVarWH_ReceiveDetails.ExpirationDate = _ArrExpirationDate[i] == "0" ? DateTime.Parse("01/01/1900") : DateTime.ParseExact(_ArrExpirationDate[i] + " 00.00.00.000", "d/M/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture);
					objCVarWH_ReceiveDetails.ImportedBy = _ArrImportedBy[i];
					objCVarWH_ReceiveDetails.WeightInTons = decimal.Parse(_ArrWeightInTons[i]);
					objCVarWH_ReceiveDetails.PO = "";
					objCVarWH_ReceiveDetails.DetailFile = "";
					objCVarWH_ReceiveDetails.Invoice = "";
					objCVarWH_ReceiveDetails.ContainerNumber = "";

					objCVarWH_ReceiveDetails.IsPickupAddedToInvoice = false;
					objCVarWH_ReceiveDetails.PickupWithoutInvoiceDate = DateTime.Parse("01/01/1900");

					objCVarWH_ReceiveDetails.IsExcluded = false;
					objCVarWH_ReceiveDetails.OperationVehicleID = 0;
					objCVarWH_ReceiveDetails.CreatorUserID = WebSecurity.CurrentUserId;
					objCVarWH_ReceiveDetails.CreationDate = DateTime.Now;
					objCVarWH_ReceiveDetails.ModificatorUserID = WebSecurity.CurrentUserId;
					objCVarWH_ReceiveDetails.ModificationDate = DateTime.Now;
					objCVarWH_ReceiveDetails.IsDefected = false;
					objCVarWH_ReceiveDetails.DefectionReason = "0";

					objCWH_ReceiveDetails.lstCVarWH_ReceiveDetails.Add(objCVarWH_ReceiveDetails);
				}
			} //for (int i = 0; i < _ArrQuantity.Count; i++)
			if (_ReturnedMessage == "")
				checkException = objCWH_ReceiveDetails.SaveMethod(objCWH_ReceiveDetails.lstCVarWH_ReceiveDetails);
			if (checkException != null)
				_ReturnedMessage = checkException.Message;
			#endregion Save

			#region Set Locations IsUsed
			//if (checkException == null)
			//{
			//    checkException = objCWH_RowLocation.UpdateList("IsUsed=0 ,StatusID = 10 WHERE ID=" + pOldLocationID.ToString());
			//    checkException = objCWH_RowLocation.UpdateList("IsUsed=1 ,StatusID = 20 WHERE ID=" + pLocationID.ToString());
			//}
			#endregion Set Locations IsUsed

			#region Set ReceiveStatus if needed
			SetPutawayStatus(insertList.pReceiveID);
			#endregion Set ReceiveStatus if needed

			checkException = objCvwWH_Receive.GetList("WHERE ID=" + insertList.pReceiveID.ToString());
			checkException = objCvwWH_ReceiveDetails.GetListPaging(999999, 1, "WHERE ReceiveID=" + insertList.pReceiveID.ToString(), "ID", out _RowCount);
			var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
			return new object[] {
				_ReturnedMessage
				, serializer.Serialize(objCvwWH_ReceiveDetails.lstCVarvwWH_ReceiveDetails) //pData[1]
                , new JavaScriptSerializer().Serialize(objCvwWH_Receive.lstCVarvwWH_Receive[0]) //pData[2]
            };
		}

		[HttpGet, HttpPost]
		public object[] ReceiveDetails_AddVehicle(Int64 pReceiveID, Int32 pWarehouseID, string pChassisNumber)
		{
			string _MessageReturned = "";
			Exception checkException = null;
			int _RowCount = 0;

			var constReceiveDetailsStatusPending = 10;
			//var constReceiveDetailsStatusHeld = 20;
			//var constReceiveDetailsStatusDamaged = 30;
			//var constReceiveDetailsStatusPutaway = 40;

			CvwWH_Receive objCvwWH_Receive = new CvwWH_Receive();
			CvwVehicleAction objCvwVehicleAction = new CvwVehicleAction();
			CVarWH_ReceiveDetails objCVarWH_ReceiveDetails = new CVarWH_ReceiveDetails();
			CWH_ReceiveDetails objCWH_ReceiveDetails = new CWH_ReceiveDetails();
			CvwWH_ReceiveDetails objCvwWH_ReceiveDetails = new CvwWH_ReceiveDetails();
			string _WhereClause = "WHERE 1=1 ";
			_WhereClause += " AND ChassisNumber=N'" + pChassisNumber + "'" + " \n";
			_WhereClause += " AND ToWarehouseID=" + pWarehouseID + " \n";
			_WhereClause += " AND ChassisNumber NOT IN (SELECT ChassisNumber FROM vwWH_ReceiveDetails WHERE WarehouseID=" + pWarehouseID + "  AND ChassisNumber IS NOT NULL AND IsFinalized=0)" + " \n";
			checkException = objCvwVehicleAction.GetListPaging(999999, 1, _WhereClause, "ID", out _RowCount);

			#region Save
			if (objCvwVehicleAction.lstCVarvwVehicleAction.Count > 0)
			{
				objCVarWH_ReceiveDetails.ID = 0;
				objCVarWH_ReceiveDetails.ReceiveID = pReceiveID;
				objCVarWH_ReceiveDetails.BarCode = "0";
				objCVarWH_ReceiveDetails.PurchaseItemID = objCvwVehicleAction.lstCVarvwVehicleAction[0].PurchaseItemID;
				objCVarWH_ReceiveDetails.Quantity = 1;
				objCVarWH_ReceiveDetails.ExpectedQuantity = 1;
				objCVarWH_ReceiveDetails.SplitQuantity = 0;
				objCVarWH_ReceiveDetails.LocationID = 0;
				objCVarWH_ReceiveDetails.PalletID = "0";
				objCVarWH_ReceiveDetails.Notes = "0";
				objCVarWH_ReceiveDetails.ReceiveDate = DateTime.Now; //DateTime.ParseExact(pReceiveDate + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture);
				objCVarWH_ReceiveDetails.StatusID = constReceiveDetailsStatusPending;
				objCVarWH_ReceiveDetails.ExpireDate = DateTime.Parse("01/01/1900");// DateTime.Parse(pExpireDate.ToString());
				objCVarWH_ReceiveDetails.LotNo = "0";
				objCVarWH_ReceiveDetails.IsExcluded = false;
				objCVarWH_ReceiveDetails.OperationVehicleID = objCvwVehicleAction.lstCVarvwVehicleAction[0].OperationVehicleID;
				objCVarWH_ReceiveDetails.PO = "";
				objCVarWH_ReceiveDetails.DetailFile = "";
				objCVarWH_ReceiveDetails.Invoice = "";
				objCVarWH_ReceiveDetails.ContainerNumber = "";

				objCVarWH_ReceiveDetails.IsPickupAddedToInvoice = false;
				objCVarWH_ReceiveDetails.PickupWithoutInvoiceDate = DateTime.Parse("01/01/1900");

				objCVarWH_ReceiveDetails.CreatorUserID = WebSecurity.CurrentUserId;
				objCVarWH_ReceiveDetails.CreationDate = DateTime.Now;
				objCVarWH_ReceiveDetails.ModificatorUserID = WebSecurity.CurrentUserId;
				objCVarWH_ReceiveDetails.ModificationDate = DateTime.Now;
				objCVarWH_ReceiveDetails.IsDefected = false;
				objCVarWH_ReceiveDetails.DefectionReason = "0";

				objCWH_ReceiveDetails.lstCVarWH_ReceiveDetails.Add(objCVarWH_ReceiveDetails);
				checkException = objCWH_ReceiveDetails.SaveMethod(objCWH_ReceiveDetails.lstCVarWH_ReceiveDetails);

				//Ensure that ware house is as added
				CWH_Receive objCWH_Receive = new CWH_Receive();
				checkException = objCWH_Receive.UpdateList("WarehouseID=" + pWarehouseID + " WHERE ID=" + pReceiveID);
			}
			else
				_MessageReturned = "Check that item exists and sent to the warehouse.";
			#endregion Save

			#region Get Returned Data
			checkException = objCvwWH_ReceiveDetails.GetListPaging(999999, 1, "WHERE ReceiveID=" + pReceiveID, "ID", out _RowCount);
			#endregion Get Returned Data
			var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
			return new object[]
			{
				_MessageReturned
				, serializer.Serialize(objCvwWH_ReceiveDetails.lstCVarvwWH_ReceiveDetails) //pData[1]
            };
		}

		[HttpGet, HttpPost]
		public object[] ReceiveDetails_Delete([FromBody] DeleteList deleteList)
		{
			Exception checkException = null;
			bool _Result = true;
			int _RowCount = 0;
			CWH_ReceiveDetails objCWH_ReceiveDetails = new CWH_ReceiveDetails();
			if (deleteList.IsSplitLine)
			{
				checkException = objCWH_ReceiveDetails.DeleteList($"where ID={deleteList.pReceiveDetailsIDsToDelete}");
				if (checkException == null)
					checkException = objCWH_ReceiveDetails.UpdateList($"ExpectedQuantity={deleteList.UpdateLineQty} where ID={deleteList.UpdateLineID}");
				return new object[] {
				_Result
			};
			}
			else
			{
				CWH_RowLocation objCWH_RowLocation = new CWH_RowLocation();
				CvwWH_ReceiveDetails objCvwWH_ReceiveDetails = new CvwWH_ReceiveDetails();
				CvwWH_Receive objCvwWH_Receive = new CvwWH_Receive();
				COperationVehicle objCOperationVehicle = new COperationVehicle();
				int _NumberOfRecords = deleteList.pReceiveDetailsIDsToDelete.Split(',').Length;
				for (int i = 0; i < _NumberOfRecords; i++)
				{
					Int64 _ReceiveDetailsID = Int64.Parse(deleteList.pReceiveDetailsIDsToDelete.Split(',')[i]);
					objCWH_ReceiveDetails.GetItem(_ReceiveDetailsID);
					checkException = objCOperationVehicle.UpdateList("IsSentToWarehouse=0 WHERE ID=" + objCWH_ReceiveDetails.lstCVarWH_ReceiveDetails[0].OperationVehicleID);
					int _LocationID = objCWH_ReceiveDetails.lstCVarWH_ReceiveDetails[0].LocationID;
					checkException = objCWH_ReceiveDetails.DeleteList("WHERE ID=" + _ReceiveDetailsID.ToString());
					if (checkException == null)
						objCWH_RowLocation.UpdateList("IsUsed=0,StatusID = 10 WHERE ID=" + _LocationID.ToString());
					else
						_Result = false;
				}
				SetPutawayStatus(deleteList.pReceiveID);
				objCvwWH_ReceiveDetails.GetListPaging(99999, 1, "WHERE ReceiveID=" + deleteList.pReceiveID, "ID", out _RowCount);
				objCvwWH_Receive.GetList("WHERE ID=" + deleteList.pReceiveID.ToString());
				var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
				return new object[] {
				_Result
				, serializer.Serialize(objCvwWH_ReceiveDetails.lstCVarvwWH_ReceiveDetails) //pData[1]
                , new JavaScriptSerializer().Serialize(objCvwWH_Receive.lstCVarvwWH_Receive[0]) //pData[2]
            };
			}

		}

		[HttpGet, HttpPost]
		public object UpdateDetails(string pUpdateClauseMaster, string pUpdateClauseDetails, int pID, bool pAutoPallet)
		{
			Exception ex = null;
			CWH_ReceiveDetails objCWH_ReceiveDetails = new CWH_ReceiveDetails();
			CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
			var detail = objCCustomizedDBCall.ExecuteQuery_ListOfObjects($"select IsFinalized,RD_IsFinalized from vwWH_ReceiveDetails where ID={pID}", typeof(CVarvwWH_ReceiveDetails)).Cast<CVarvwWH_ReceiveDetails>().ToList();
			if (detail != null && detail.Count > 0)
			{
				if (detail[0].IsFinalized)
					ex = new Exception("This order is finalized!");
				else if (detail[0].RD_IsFinalized)
					ex = new Exception("This line is finalized!");

				if (ex == null)
				{
					ex = objCWH_ReceiveDetails.UpdateList(pUpdateClauseDetails);
				}
				if (ex == null)
				{
					var result = objCCustomizedDBCall.CallStringFunction(pUpdateClauseMaster);
				}
				if (ex == null && pAutoPallet)
					objCWH_ReceiveDetails.GetItem(pID);
			}

			return new { Exception = ex, Details = new JavaScriptSerializer().Serialize(objCWH_ReceiveDetails.lstCVarWH_ReceiveDetails) };
		}
		#endregion ReceiveDetails
		#region ReceiveDetailsSerial
		[HttpGet, HttpPost]
		public object[] ReceiveDetailsSerial_LoadAll(string pWhereClauseReceiveDetailsSerial)
		{
			CWH_ReceiveDetailsSerial objCWH_ReceiveDetailsSerial = new CWH_ReceiveDetailsSerial();
			objCWH_ReceiveDetailsSerial.GetList(pWhereClauseReceiveDetailsSerial);
			var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
			return new object[] {
				serializer.Serialize(objCWH_ReceiveDetailsSerial.lstCVarWH_ReceiveDetailsSerial)
			};
		}
		[HttpGet, HttpPost]
		public object[] ReceiveDetailsSerial_GenerateSerial(Int64 pReceiveDetailsIDForSerialGenerate, Int32 pQuantity)
		{
			Exception checkException = null;
			CWH_ReceiveDetailsSerial objCWH_ReceiveDetailsSerial = new CWH_ReceiveDetailsSerial();
			checkException = objCWH_ReceiveDetailsSerial.DeleteList("WHERE ReceiveDetailsID=" + pReceiveDetailsIDForSerialGenerate);
			for (int i = 0; i < pQuantity; i++)
			{
				CVarWH_ReceiveDetailsSerial objCVarWH_ReceiveDetailsSerial = new CVarWH_ReceiveDetailsSerial();
				objCVarWH_ReceiveDetailsSerial.ReceiveDetailsID = pReceiveDetailsIDForSerialGenerate;
				objCVarWH_ReceiveDetailsSerial.Serial = (i + 1).ToString();
				objCVarWH_ReceiveDetailsSerial.PickupDetailsLocationID = 0;
				objCVarWH_ReceiveDetailsSerial.LotNumber = "0";
				objCVarWH_ReceiveDetailsSerial.Notes = "0";
				objCVarWH_ReceiveDetailsSerial.ReserveDetailsLocationID = 0;
				objCVarWH_ReceiveDetailsSerial.CreatorUserID = WebSecurity.CurrentUserId;
				objCVarWH_ReceiveDetailsSerial.CreationDate = DateTime.Now;
				objCVarWH_ReceiveDetailsSerial.ModificatorUserID = WebSecurity.CurrentUserId;
				objCVarWH_ReceiveDetailsSerial.ModificationDate = DateTime.Now;
				objCWH_ReceiveDetailsSerial.lstCVarWH_ReceiveDetailsSerial.Add(objCVarWH_ReceiveDetailsSerial);
			}
			checkException = objCWH_ReceiveDetailsSerial.SaveMethod(objCWH_ReceiveDetailsSerial.lstCVarWH_ReceiveDetailsSerial);
			objCWH_ReceiveDetailsSerial.GetList("WHERE ReceiveDetailsID=" + pReceiveDetailsIDForSerialGenerate + " ORDER BY Serial");
			var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
			return new object[] {
				serializer.Serialize(objCWH_ReceiveDetailsSerial.lstCVarWH_ReceiveDetailsSerial)
			};
		}
		[HttpGet, HttpPost]
		public object[] ReceiveDetailsSerial_Save([FromBody] ReceiveDetailsSerial_SaveParameters receiveDetailsSerial_SaveParameters)
		{
			string _MessageReturned = "";
			Exception checkException = null;
			CWH_ReceiveDetailsSerial objCWH_ReceiveDetailsSerial = new CWH_ReceiveDetailsSerial();
			//check serials unique
			var serials = "'" + receiveDetailsSerial_SaveParameters.pSerialList.Replace(",", "','") + "'";
			checkException = objCWH_ReceiveDetailsSerial.GetList($"where Serial in ({serials})");
			if (objCWH_ReceiveDetailsSerial.lstCVarWH_ReceiveDetailsSerial.Count > 0)
			{
				_MessageReturned = $"Serial({objCWH_ReceiveDetailsSerial.lstCVarWH_ReceiveDetailsSerial[0].Serial}) already existed!";
				return new object[] {
				_MessageReturned
			};
			}
			var _ArrID = receiveDetailsSerial_SaveParameters.pSelectedIDsToSave.Split(',');
			var _ArrIsInsert = receiveDetailsSerial_SaveParameters.pIsInsertList.Split(',');
			var _ArrSerialList = receiveDetailsSerial_SaveParameters.pSerialList.Split(',');
			var _ArrPickupDetailsLocationIDList = receiveDetailsSerial_SaveParameters.pPickupDetailsLocationIDList.Split(',');
			var _ArrVehicleList = receiveDetailsSerial_SaveParameters.pVehicleList.Split(',');
			var _ArrMotorNoList = receiveDetailsSerial_SaveParameters.pMotorNoList.Split(',');
			int _NumberOfRecords = _ArrID.Length;
			for (int i = 0; i < _NumberOfRecords; i++)
			{
				//if (_ArrSerialList[i] != "0")
				if ((receiveDetailsSerial_SaveParameters.pFlag == "ReceiveDetailsSerial_FillModal" && _ArrSerialList[i] != "0") ||
					(receiveDetailsSerial_SaveParameters.pFlag == "ReceiveDetailsVehicle_FillModal" && (_ArrVehicleList[i] != "0" || _ArrMotorNoList[i] != "0")))
				{
					CVarWH_ReceiveDetailsSerial objCVarWH_ReceiveDetailsSerial = new CVarWH_ReceiveDetailsSerial();
					objCVarWH_ReceiveDetailsSerial.ID = _ArrIsInsert[i] == "1" ? 0 : Int64.Parse(_ArrID[i]);
					objCVarWH_ReceiveDetailsSerial.ReceiveDetailsID = receiveDetailsSerial_SaveParameters.pReceiveDetailsID;
					objCVarWH_ReceiveDetailsSerial.Serial = _ArrSerialList[i];
					objCVarWH_ReceiveDetailsSerial.PickupDetailsLocationID = Int64.Parse(_ArrPickupDetailsLocationIDList[i]);
					objCVarWH_ReceiveDetailsSerial.Notes = "0";
					objCVarWH_ReceiveDetailsSerial.Vehicle = _ArrVehicleList[i];
					objCVarWH_ReceiveDetailsSerial.MotorNo = _ArrMotorNoList[i];
					objCVarWH_ReceiveDetailsSerial.LotNumber = "0";
					objCVarWH_ReceiveDetailsSerial.ReserveDetailsLocationID = 0;
					objCVarWH_ReceiveDetailsSerial.CreatorUserID = WebSecurity.CurrentUserId;
					objCVarWH_ReceiveDetailsSerial.CreationDate = DateTime.Now;
					objCVarWH_ReceiveDetailsSerial.ModificatorUserID = WebSecurity.CurrentUserId;
					objCVarWH_ReceiveDetailsSerial.ModificationDate = DateTime.Now;
					Common.Common.ReplaceNull(objCVarWH_ReceiveDetailsSerial);
					objCWH_ReceiveDetailsSerial.lstCVarWH_ReceiveDetailsSerial.Add(objCVarWH_ReceiveDetailsSerial);
				}
			}
			checkException = objCWH_ReceiveDetailsSerial.SaveMethod(objCWH_ReceiveDetailsSerial.lstCVarWH_ReceiveDetailsSerial);
			//if (checkException != null)
			//    _MessageReturned = checkException.Message;
			if (checkException != null)
				if (checkException.ToString().Contains("unique") == true)
					_MessageReturned = receiveDetailsSerial_SaveParameters.pFlag == "ReceiveDetailsSerial_FillModal" ? "Serial is duplicated" :
						receiveDetailsSerial_SaveParameters.pFlag == "ReceiveDetailsVehicle_FillModal" ? " Vehicle and Mottor No are duplicated " :
						"Please revise data";
				else
					_MessageReturned = checkException.Message;
			else
			{
				CWH_Receive objCWH_Receive = new CWH_Receive();
				checkException = objCWH_Receive.UpdateList($"ModificationDate=GetDate(), ModificatorUserID=${WebSecurity.CurrentUserId} where ID={receiveDetailsSerial_SaveParameters.pReceiveID}");
			}
			return new object[] {
				_MessageReturned
			};
		}
		//[HttpGet, HttpPost]
		//public object[] ReceiveDetailsSerial_SaveFromPickup([FromBody] ReceiveDetailsSerial_SaveParametersFromPickup receiveDetailsSerial_SaveParameters)
		//{
		//    string _RejectedSerials = "";
		//    string _MessageReturned = "";
		//    Exception checkException = null;
		//    CWH_ReceiveDetailsSerial objCWH_ReceiveDetailsSerial = new CWH_ReceiveDetailsSerial();
		//    var _ArrSerialList = receiveDetailsSerial_SaveParameters.pSerialList.Split(',');
		//    Int64 _ReceiveDetailsID = receiveDetailsSerial_SaveParameters.pReceiveDetailsID;
		//    Int64 _PickupDetailsLocationID = receiveDetailsSerial_SaveParameters.pPickupDetailsLocationID;
		//    int _NumberOfRecords = _ArrSerialList.Length;
		//    for (int i = 0; i < _NumberOfRecords; i++)
		//    {
		//        CWH_ReceiveDetailsSerial objCWH_ReceiveDetailsSerial_Temp = new CWH_ReceiveDetailsSerial();
		//        objCWH_ReceiveDetailsSerial_Temp.GetList("WHERE ReceiveDetailsID=" + _ReceiveDetailsID + " AND Serial=" + _ArrSerialList[i]);
		//        if (objCWH_ReceiveDetailsSerial_Temp.lstCVarWH_ReceiveDetailsSerial.Count == 1)
		//            checkException = objCWH_ReceiveDetailsSerial.UpdateList("PickupDetailsLocationID=" + _PickupDetailsLocationID + " WHERE ReceiveDetailsID=" + _ReceiveDetailsID + " AND Serial=" + _ArrSerialList[i]);
		//        else
		//            _RejectedSerials += _RejectedSerials == "" ? _ArrSerialList[i] : (", " + _ArrSerialList[i]);
		//    }
		//    _MessageReturned = _RejectedSerials == "" ? "" : ("Serials: " + _RejectedSerials + " rejected.");
		//    return new object[] {
		//        _MessageReturned
		//    };
		//}
		[HttpGet, HttpPost]
		public object[] ReceiveDetailsSerial_DeleteList([FromBody] DeleteList_ReceiveDetailsSerial deleteList_ReceiveDetailsSerial)
		{
			string _MessageReturned = "";
			Exception checkException = null;
			CWH_ReceiveDetailsSerial objCWH_ReceiveDetailsSerial = new CWH_ReceiveDetailsSerial();
			checkException = objCWH_ReceiveDetailsSerial.DeleteList("WHERE ID IN (" + deleteList_ReceiveDetailsSerial.pReceiveDetailsSerialIDsDeleted + ")");

			//objCWH_ReceiveDetailsSerial.GetList("WHERE ReceiveDetailsID=" + pReceiveDetailsID);
			if (deleteList_ReceiveDetailsSerial.pFlag == "ReceiveDetailsSerial_FillModal")
				objCWH_ReceiveDetailsSerial.GetList("WHERE  Serial is not null and ReceiveDetailsID=" + deleteList_ReceiveDetailsSerial.pReceiveDetailsID);
			else if (deleteList_ReceiveDetailsSerial.pFlag == "ReceiveDetailsVehicle_FillModal")
				objCWH_ReceiveDetailsSerial.GetList("WHERE  Vehicle is not null and ReceiveDetailsID=" + deleteList_ReceiveDetailsSerial.pReceiveDetailsID);

			var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
			return new object[] {
				_MessageReturned
				, serializer.Serialize(objCWH_ReceiveDetailsSerial.lstCVarWH_ReceiveDetailsSerial)
			};
		}
		[HttpGet, HttpPost]
		public object[] ReceiveDetailsSerial_DeleteFromPickup([FromBody]DeleteList_ReceiveDetailsSerialFromPickup deleteList_ReceiveDetailsSerialFromPickup)
		{
			string _MessageReturned = "";
			Exception checkException = null;
			CWH_ReceiveDetailsSerial objCWH_ReceiveDetailsSerial = new CWH_ReceiveDetailsSerial();
			checkException = objCWH_ReceiveDetailsSerial.UpdateList("PickupDetailsLocationID=NULL WHERE ID IN (" + deleteList_ReceiveDetailsSerialFromPickup.pReceiveDetailsSerialIDsDeletedFromPickup + ") AND PickupDetailsLocationID=" + deleteList_ReceiveDetailsSerialFromPickup.pPickupDetailsLocationID);
			objCWH_ReceiveDetailsSerial.GetList("WHERE PickupDetailsLocationID=" + deleteList_ReceiveDetailsSerialFromPickup.pPickupDetailsLocationID);
			var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
			return new object[] {
				_MessageReturned
				, serializer.Serialize(objCWH_ReceiveDetailsSerial.lstCVarWH_ReceiveDetailsSerial)
			};
		}
		#endregion ReceiveDetailsSerial
		#region UploadExcel
		[HttpGet, HttpPost]
		public object UploadExcel(bool pIsRequest)
		{
			int ResultCode = 1;
			long pID = 0;
			bool AllExcelRowsAreValid = true;
			List<string> MissingFields = new List<string>();
			List<string> MissingForeignKeys = new List<string>();
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
						CWH_Receive objCWH_Receive = new CWH_Receive();
						objCWH_Receive.GetItem(pID);
						string ownerFilter = $"where 1=1";
						if (pIsRequest)
							ownerFilter = $"where OwnerID={objCWH_Receive.lstCVarWH_Receive[0].OwnerID}";
						CPurchaseItem objCPurchaseItem = new CPurchaseItem();
						objCPurchaseItem.GetList(ownerFilter);

						CvwWH_ReceiveLocations objCvwWH_ReceiveLocations = new CvwWH_ReceiveLocations();
						objCvwWH_ReceiveLocations.GetList($" WHERE ReceiveID = {pID}");

						CPackageTypes objCPackageTypes = new CPackageTypes();
						objCPackageTypes.GetList(" WHERE 1=1");
						CWH_ReceiveDetails objCWH_ReceiveDetails = new CWH_ReceiveDetails();
						CWH_ReceiveDetailsSerial objCWH_ReceiveDetailsSerial = new CWH_ReceiveDetailsSerial();
						List<ReceiveDetailsExcelRow> ExcelRowsToBeInserted = new List<ReceiveDetailsExcelRow>();
						int count = 1;
						foreach (DataRow row in result.Tables[0].Rows)
						{
							ReceiveDetailsExcelRow receiveDetailsExcelRow;
							if (pIsRequest)
							{
								receiveDetailsExcelRow = new ReceiveDetailsExcelRow
								{
									pIndex = count,
									pPurchaseItemCode = row["ItemCode"] == DBNull.Value ? "" : Convert.ToString(row["ItemCode"]),
									pPackageTypeName = row["StockUnit"] == DBNull.Value ? "" : Convert.ToString(row["StockUnit"]),
									pExpectedQty = row["ExpectedQty"] == DBNull.Value ? 0 : Convert.ToInt32(row["ExpectedQty"]),
									pExpectedProductionDate = row["ExpectedProductionDate"] == DBNull.Value ? DateTime.Parse("01/01/1900") : Convert.ToDateTime(row["ExpectedProductionDate"]),
									pExpectedExpirationDate = row["ExpectedExpirationDate"] == DBNull.Value ? DateTime.Parse("01/01/1900") : Convert.ToDateTime(row["ExpectedExpirationDate"]),
									pBatchNo = row["BatchNo"] == DBNull.Value ? "" : Convert.ToString(row["BatchNo"]),
									pExtra1 = row["BatchNo"] == DBNull.Value ? "" : Convert.ToString(row["Extra1"]),
									pExtra2 = row["BatchNo"] == DBNull.Value ? "" : Convert.ToString(row["Extra2"]),
									pExtra3 = row["BatchNo"] == DBNull.Value ? "" : Convert.ToString(row["Extra3"]),
									pExtra4 = row["BatchNo"] == DBNull.Value ? "" : Convert.ToString(row["Extra4"]),
								};
							}
							else
							{
								receiveDetailsExcelRow = new ReceiveDetailsExcelRow
								{
									pIndex = count,
									pPurchaseItemID = 0,
									pBarCode = row["Barcode"] == DBNull.Value ? "" : Convert.ToString(row["Barcode"]),
									pPartNumber = row["Part Number"] == DBNull.Value ? "" : Convert.ToString(row["Part Number"]),
									pQuantity = row["Quantity"] == DBNull.Value ? 0 : Convert.ToInt32(row["Quantity"]),
									pSerialNumber = row["Serial Number"] == DBNull.Value ? "" : Convert.ToString(row["Serial Number"]),
									pAreaName = row["Area Name"] == DBNull.Value ? "" : Convert.ToString(row["Area Name"]),
									pLocationID = 0,
									pLocationCode = row["Location Code"] == DBNull.Value ? "" : Convert.ToString(row["Location Code"]),
									pReceiveDate = row["Receive Date"] == DBNull.Value ? DateTime.Parse("01/01/1900") : DateTime.ParseExact(row["Receive Date"].ToString(), "dd/MM/yyyy", CultureInfo.InvariantCulture),
									pPalletID = row["PalletID"] == DBNull.Value ? "" : Convert.ToString(row["PalletID"]),
									pNotes = row["Notes"] == DBNull.Value ? "" : Convert.ToString(row["Notes"]),
									pPO = row["P.O"] == DBNull.Value ? "" : Convert.ToString(row["P.O"]),
									pFile = row["File"] == DBNull.Value ? "" : Convert.ToString(row["File"]),
									pInvoice = row["Invoice"] == DBNull.Value ? "" : Convert.ToString(row["Invoice"]),
									pBatchNo = row["Batch No"] == DBNull.Value ? "" : Convert.ToString(row["Batch No"]),
									pWeight = row["Weight"] == DBNull.Value ? 0m : Convert.ToDecimal(row["Weight"]),
									pExpiryDate = row["Expiry Date"] == DBNull.Value ? DateTime.Parse("01/01/1900") : DateTime.ParseExact(row["Expiry Date"].ToString(), "dd/MM/yyyy", CultureInfo.InvariantCulture),
									pContainerNumber = row["Container Number"] == DBNull.Value ? "" : Convert.ToString(row["Container Number"]),
									pExtra1 = row["Extra1"] == DBNull.Value ? "" : Convert.ToString(row["Extra1"]),
									pExtra2 = row["Extra1"] == DBNull.Value ? "" : Convert.ToString(row["Extra2"]),
									pExtra3 = row["Extra1"] == DBNull.Value ? "" : Convert.ToString(row["Extra3"]),
									pExtra4 = row["Extra1"] == DBNull.Value ? "" : Convert.ToString(row["Extra4"]),
									pExtra5 = row["Extra1"] == DBNull.Value ? "" : Convert.ToString(row["Extra5"]),
									pExtra6 = row["Extra1"] == DBNull.Value ? "" : Convert.ToString(row["Extra6"]),
									pExtra7 = row["Extra1"] == DBNull.Value ? "" : Convert.ToString(row["Extra7"]),
									pExtra8 = row["Extra1"] == DBNull.Value ? "" : Convert.ToString(row["Extra8"]),
									pExtra9 = row["Extra1"] == DBNull.Value ? "" : Convert.ToString(row["Extra9"]),
								};
							}

							count++;

							var ValidationCheck = CheckExcelRowValidation(receiveDetailsExcelRow, objCvwWH_ReceiveLocations, objCPurchaseItem, objCPackageTypes, pIsRequest) as ReturnedObjectAfterValidation;
							ExcelRowsToBeInserted.Add(receiveDetailsExcelRow);
							receiveDetailsExcelRow.pPurchaseItemID = ValidationCheck.PurchaseItemID;
							receiveDetailsExcelRow.pLocationID = ValidationCheck.LocationID;
							receiveDetailsExcelRow.pPackageTypeID = ValidationCheck.PackageTypeID;
							if (ValidationCheck.MissingFields != "")
								MissingFields.Add(ValidationCheck.MissingFields);
							if (ValidationCheck.MissingForeignKeys != "")
								MissingForeignKeys.Add(ValidationCheck.MissingForeignKeys);
							if (!ValidationCheck.IsValid)
							{
								AllExcelRowsAreValid = false;
								break;
							}
						}
						if (AllExcelRowsAreValid)
						{
							foreach (ReceiveDetailsExcelRow row in ExcelRowsToBeInserted)
							{
								var detail = new Models.Warehousing.Transactions.Generated.Old.CVarWH_ReceiveDetails
								{
									ReceiveID = pID,
									BarCode = row.pBarCode,
									PurchaseItemID = row.pPurchaseItemID,
									Quantity = row.pQuantity,
									ExpectedQuantity = row.pExpectedQty,
									SplitQuantity = 0,
									LocationID = row.pLocationID,
									PalletID = row.pPalletID,
									ReceiveDate = row.pReceiveDate,
									StatusID = 10,
									CreatorUserID = WebSecurity.CurrentUserId,
									CreationDate = DateTime.Now,
									ModificatorUserID = WebSecurity.CurrentUserId,
									ModificationDate = DateTime.Now,
									IsExcluded = false,
									LotNo = "",
									ExpireDate = row.pExpiryDate,
									OperationVehicleID = 0,
									VehicleActionID = 0,
									IsPickupAddedToInvoice = false,
									PickupWithoutInvoiceDate = DateTime.Parse("01/01/1900"),
									Notes = row.pNotes,
									BatchNumber = row.pBatchNo,
									ExpirationDate = row.pExpiryDate,
									ImportedBy = "",
									WeightInTons = row.pWeight,
									PO = row.pPO,
									DetailFile = row.pFile,
									Invoice = row.pInvoice,
									IsDefected = false,
									DefectionReason = "0",
									ContainerNumber = row.pContainerNumber,
									Extra1 = row.pExtra1,
									Extra2 = row.pExtra2,
									Extra3 = row.pExtra3,
									Extra4 = row.pExtra4,
									Extra5 = row.pExtra5,
									Extra6 = row.pExtra6,
									Extra7 = row.pExtra7,
									Extra8 = row.pExtra8,
									Extra9 = row.pExtra9,
									RD_PackageTypeID = row.pPackageTypeID,
									ExpectedProductionDate = row.pExpectedProductionDate,
									ExpectedExpirationDate = row.pExpectedExpirationDate,
									CreationSource=CreationSource.xls.ToString()
								};
								Common.Common.ReplaceNull(detail);
								objCWH_ReceiveDetails.SaveMethod(new List<Models.Warehousing.Transactions.Generated.Old.CVarWH_ReceiveDetails>
								{
									detail
								});

								//Getting inserted receive detail ID
								objCWH_ReceiveDetails.GetList(" WHERE ID = (SELECT MAX(ID)ID FROM WH_ReceiveDetails)");
								int ReceiveDetailID = (int)objCWH_ReceiveDetails.lstCVarWH_ReceiveDetails[0].ID;
								//SerialNumber
								if (row.pQuantity == 1 && row.pSerialNumber != "")
								{
									objCWH_ReceiveDetailsSerial.SaveMethod(new List<CVarWH_ReceiveDetailsSerial> { new CVarWH_ReceiveDetailsSerial
									{
										ReceiveDetailsID = ReceiveDetailID,
										Serial = row.pSerialNumber,
										PickupDetailsLocationID = 0,
										Notes = "",
										Vehicle = "",
										MotorNo = "",
										LotNumber = "",
										ReserveDetailsLocationID = 0,
										CreatorUserID = WebSecurity.CurrentUserId,
										CreationDate = DateTime.Now,
										ModificatorUserID = WebSecurity.CurrentUserId,
										ModificationDate = DateTime.Now
									} });
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
				MissingFields = MissingFields.Count > 0 ? string.Join(",", MissingFields) : "",
				MissingForeignKeys = MissingForeignKeys.Count > 0 ? string.Join(",", MissingForeignKeys) : "",
				exception
			};
		}

		private object CheckExcelRowValidation(ReceiveDetailsExcelRow row, CvwWH_ReceiveLocations ReceiveLocations, CPurchaseItem PurchaseItems, CPackageTypes PackageTypes, bool pIsRequest)
		{
			List<string> MissingFields = new List<string>();
			List<string> MissingForeignKeys = new List<string>();   //for Area and locationID if they were provided wrong in excel
			ReturnedObjectAfterValidation obj = new ReturnedObjectAfterValidation();
			var date2000 = new DateTime(2000, 1, 1);
			//Mandatory fields 
			if (pIsRequest)
			{
				if (row.pPurchaseItemCode == "" || PurchaseItems.lstCVarPurchaseItem.FirstOrDefault(x => x.Code == row.pPurchaseItemCode)?.ID == null)
				{
					MissingFields.Add("ItemCode");
					obj.IsValid = false;
				}
				else
					obj.PurchaseItemID = (int)PurchaseItems.lstCVarPurchaseItem.FirstOrDefault(x => x.Code == row.pPurchaseItemCode)?.ID;

				if (row.pPackageTypeName == "" || PackageTypes.lstCVarPackageTypes.FirstOrDefault(x => x.Name == row.pPackageTypeName)?.ID == null)
				{
					MissingFields.Add("StockUnit");
					obj.IsValid = false;
				}
				else
				{
					obj.PackageTypeID = (int)PackageTypes.lstCVarPackageTypes.FirstOrDefault(x => x.Name == row.pPackageTypeName)?.ID;
					if (!PurchaseItems.lstCVarPurchaseItem.Any(a => a.ID == obj.PurchaseItemID && a.PackageTypeID == obj.PackageTypeID))
					{
						MissingFields.Add($"Unit({row.pPackageTypeName}) not relate to Item({row.pPurchaseItemCode})");
						obj.IsValid = false;
						obj.PackageTypeID = 0;
					}
				}

				if (row.pExpectedQty <= 0)
				{
					MissingFields.Add("ExpectedQty");
					obj.IsValid = false;
				}

				//if (!(row.pExpectedProductionDate > date2000) && PurchaseItems.lstCVarPurchaseItem.FirstOrDefault(x => x.Code == row.pPurchaseItemCode)?.ByExpireDate == true)
				//{
				//	MissingFields.Add("ExpectedProductionDate");
				//	obj.IsValid = false;
				//}

				//if (!(row.pExpectedExpirationDate > date2000) && PurchaseItems.lstCVarPurchaseItem.FirstOrDefault(x => x.Code == row.pPurchaseItemCode)?.ByExpireDate == true)
				//{
				//	MissingFields.Add("ExpectedExpirationDate");
				//	obj.IsValid = false;
				//}

				//if (string.IsNullOrWhiteSpace(row.pBatchNo) && PurchaseItems.lstCVarPurchaseItem.FirstOrDefault(x => x.Code == row.pPurchaseItemCode)?.ByLotNo == true)
				//{
				//	MissingFields.Add("BatchNo");
				//	obj.IsValid = false;
				//}
			}
			else //check(PartNumber, Quantity)
			{
				if (row.pPartNumber == "" || PurchaseItems.lstCVarPurchaseItem.FirstOrDefault(x => x.PartNumber == row.pPartNumber)?.ID == null)
				{
					MissingFields.Add("PartNumber");
					obj.IsValid = false;
				}
				else
					obj.PurchaseItemID = (int)PurchaseItems.lstCVarPurchaseItem.FirstOrDefault(x => x.PartNumber == row.pPartNumber)?.ID;

				if (row.pQuantity <= 0)
				{
					MissingFields.Add("Quantity");
					obj.IsValid = false;
				}
				else if (row.pQuantity > 1 && row.pSerialNumber != "")
				{
					try
					{
						throw new ArgumentException("Item with a serial should have Quantity=1");
					}
					catch (ArgumentException Ex)
					{
						throw;
					}
				}

				//Foreign Keys check (LocationCode)
				if (ReceiveLocations.lstCVarvwWH_ReceiveLocations.FirstOrDefault(x => x.LocationCode == row.pLocationCode)?.LocationID != null)
				{
					obj.LocationID = (int)ReceiveLocations.lstCVarvwWH_ReceiveLocations
						.FirstOrDefault(x => x.LocationCode == row.pLocationCode)
						.LocationID;
				}
				else
					MissingForeignKeys.Add("LocationCode");

			}

			obj.MissingFields = MissingFields.Count == 0 ? "" : $"Row {row.pIndex} missing {string.Join(",", MissingFields)}";
			obj.MissingForeignKeys = MissingForeignKeys.Count == 0 ? "" : $"Row {row.pIndex} missing {string.Join(",", MissingForeignKeys)}";

			return obj;
		}

		[HttpGet, HttpPost]
		public object ValidatePallet(string pWhereClause)
		{
			CvwWH_ReceiveDetails objCvwWH_ReceiveDetails = new CvwWH_ReceiveDetails();
			var ex = objCvwWH_ReceiveDetails.GetList(pWhereClause);
			List<string> palletIDs = new List<string>();

			foreach (var item in objCvwWH_ReceiveDetails.lstCVarvwWH_ReceiveDetails)
			{
				palletIDs.Add($"({item.PalletID} in {item.ReceiveCode})");
			}

			return palletIDs;
		}
		class ReturnedObjectAfterValidation
		{
			public bool IsValid { get; set; } = true;
			public string MissingFields { get; set; } = "";
			public string MissingForeignKeys { get; set; } = "";
			public int PurchaseItemID { get; set; } = 0;
			public int PackageTypeID { get; set; } = 0;
			public int LocationID { get; set; } = 0;
		}
		class ReceiveDetailsExcelRow
		{
			public int pIndex { get; set; }
			public string pBarCode { get; set; }
			public int pPurchaseItemID { get; set; }
			public string pPurchaseItemCode { get; set; }
			public int pPackageTypeID { get; set; }
			public string pPackageTypeName { get; set; }
			public string pPartNumber { get; set; }
			public int pQuantity { get; set; }
			public int pExpectedQty { get; set; }
			public string pSerialNumber { get; set; }
			public string pAreaName { get; set; }
			public int pLocationID { get; set; }
			public string pLocationCode { get; set; }
			public DateTime pReceiveDate { get; set; }
			public DateTime pExpectedProductionDate { get; set; }
			public DateTime pExpectedExpirationDate { get; set; }
			public string pPalletID { get; set; }
			public string pNotes { get; set; }
			public string pPO { get; set; }
			public string pFile { get; set; }
			public string pInvoice { get; set; }
			public string pBatchNo { get; set; }
			public decimal pWeight { get; set; }
			public DateTime pExpiryDate { get; set; }
			public string pContainerNumber { get; set; }
			public string pExtra1 { get; set; }
			public string pExtra2 { get; set; }
			public string pExtra3 { get; set; }
			public string pExtra4 { get; set; }
			public string pExtra5 { get; set; }
			public string pExtra6 { get; set; }
			public string pExtra7 { get; set; }
			public string pExtra8 { get; set; }
			public string pExtra9 { get; set; }
		}
		#endregion

		#region GeneratePickup
		public object[] GeneratePickup([FromBody] GeneratePickupDTO GeneratePickupDTO)
		{
			var checkException = new Exception();
			var ExceptionMessage = "";
			long PickupID;
			long PickupDetailsID;
			long PickupDetailsLocationID;
			CWH_Receive objCWH_Receive = new CWH_Receive();
			CWH_ReceiveDetails objCWH_ReceiveDetails = new CWH_ReceiveDetails();
			CWH_ReceiveDetailsSerial objCWH_ReceiveDetailsSerial = new CWH_ReceiveDetailsSerial();
			CWH_Pickup objCWH_Pickup = new CWH_Pickup();
			CWH_PickupDetails objCWH_PickupDetails = new CWH_PickupDetails();
			CWH_PickupDetailsLocation objCWH_PickupDetailsLocation = new CWH_PickupDetailsLocation();

			checkException = objCWH_Receive.GetItem(GeneratePickupDTO.PickupID);
			var Receive = objCWH_Receive.lstCVarWH_Receive[0];
			checkException = objCWH_ReceiveDetails.GetList("WHERE ReceiveID = " + GeneratePickupDTO.PickupID);
			var ReceiveDetails = objCWH_ReceiveDetails.lstCVarWH_ReceiveDetails;
			checkException = objCWH_ReceiveDetailsSerial.GetList("WHERE ReceiveDetailsID IN (SELECT ID FROM WH_ReceiveDetails WHERE ReceiveID = " + GeneratePickupDTO.PickupID + ") ");

			//insert into WH_Pickup
			List<CVarWH_Pickup> PickupList = new List<CVarWH_Pickup>();
			CVarWH_Pickup objCVarWH_Pickup = new CVarWH_Pickup();
			objCVarWH_Pickup.WarehouseID = Receive.WarehouseID;
			objCVarWH_Pickup.CustomerID = Receive.CustomerID;
			objCVarWH_Pickup.BillTo = Receive.CustomerID;
			objCVarWH_Pickup.OrderDate = DateTime.Now.AddDays(1);
			objCVarWH_Pickup.RequiredDate = DateTime.Now;
			objCVarWH_Pickup.CreationDate = DateTime.Now;
			objCVarWH_Pickup.CreatorUserID = WebSecurity.CurrentUserId;
			Common.Common.ReplaceNull(objCVarWH_Pickup);
			PickupList.Add(objCVarWH_Pickup);
			checkException = objCWH_Pickup.SaveMethod(PickupList);

			//Getting inserted PickupID
			checkException = objCWH_Pickup.GetList("WHERE ID = (SELECT MAX(ID) FROM WH_Pickup)");
			PickupID = objCWH_Pickup.lstCVarWH_Pickup[0].ID;


			//insert into WH_PickupDetails
			foreach (var ReceiveDetail in ReceiveDetails)
			{
				checkException = objCWH_PickupDetails.GetList("WHERE PickupID = " + PickupID + " AND PurchaseItemID = " + ReceiveDetail.PurchaseItemID);
				var PickupDetails = objCWH_PickupDetails.lstCVarWH_PickupDetails;
				if (PickupDetails.Count == 0)
				{
					List<CVarWH_PickupDetails> PickupDetailsList = new List<CVarWH_PickupDetails>();
					CVarWH_PickupDetails objCVarWH_PickupDetails = new CVarWH_PickupDetails();
					objCVarWH_PickupDetails.PickupID = PickupID;
					objCVarWH_PickupDetails.PurchaseItemID = ReceiveDetail.PurchaseItemID;
					objCVarWH_PickupDetails.CreationDate = DateTime.Now;
					objCVarWH_PickupDetails.CreatorUserID = WebSecurity.CurrentUserId;
					Common.Common.ReplaceNull(objCVarWH_PickupDetails);
					PickupDetailsList.Add(objCVarWH_PickupDetails);
					checkException = objCWH_PickupDetails.SaveMethod(PickupDetailsList);

					//Getting inserted PickupID
					checkException = objCWH_PickupDetails.GetList("WHERE ID = (SELECT MAX(ID) FROM WH_PickupDetails)");
					PickupDetailsID = objCWH_PickupDetails.lstCVarWH_PickupDetails[0].ID;
				}
				else
				{
					PickupDetailsID = PickupDetails[0].ID;
				}

				//insert into WH_PickupDetailsLocation
				checkException = objCWH_PickupDetailsLocation.GetList("WHERE PickupDetailsID = " + PickupDetailsID + " AND ReceiveDetailsID = " + ReceiveDetail.ID);
				var PickupDetailsLocation = objCWH_PickupDetailsLocation.lstCVarWH_PickupDetailsLocation;
				if (PickupDetailsLocation.Count == 0)
				{
					//insert
					List<CVarWH_PickupDetailsLocation> PickupDetailsLocationList = new List<CVarWH_PickupDetailsLocation>();
					CVarWH_PickupDetailsLocation objCVarWH_PickupDetailsLocation = new CVarWH_PickupDetailsLocation();
					objCVarWH_PickupDetailsLocation.PickupDetailsID = PickupDetailsID;
					objCVarWH_PickupDetailsLocation.ReceiveDetailsID = ReceiveDetail.ID;
					objCVarWH_PickupDetailsLocation.PickedQuantity = ReceiveDetail.Quantity;
					objCVarWH_PickupDetailsLocation.CreationDate = DateTime.Now;
					objCVarWH_PickupDetailsLocation.CreatorUserID = WebSecurity.CurrentUserId;
					Common.Common.ReplaceNull(objCVarWH_PickupDetailsLocation);
					PickupDetailsLocationList.Add(objCVarWH_PickupDetailsLocation);
					checkException = objCWH_PickupDetailsLocation.SaveMethod(PickupDetailsLocationList);

					//Getting inserted PickupDetailsLocationID
					checkException = objCWH_PickupDetailsLocation.GetList("WHERE ID = (SELECT MAX(ID) FROM WH_PickupDetailsLocation)");
					PickupDetailsLocationID = objCWH_PickupDetailsLocation.lstCVarWH_PickupDetailsLocation[0].ID;
				}
				else
				{
					//Update
					checkException = objCWH_PickupDetailsLocation.UpdateList("PickedQuantity = " + (PickupDetailsLocation[0].PickedQuantity + ReceiveDetail.Quantity) + " WHERE ID = " + PickupDetailsLocation[0].ID);
					PickupDetailsLocationID = PickupDetailsLocation[0].ID;
				}

				//Update WH_ReceiveDetailsSerial
				checkException = objCWH_ReceiveDetailsSerial.UpdateList("PickupDetailsLocationID = " + PickupDetailsLocationID + " WHERE ReceiveDetailsID = " + ReceiveDetail.ID);
			}
			if (checkException != null)
			{
				ExceptionMessage = checkException.Message;
			}
			return new object[]
			{
				objCWH_Pickup.lstCVarWH_Pickup[0].Code,
				ExceptionMessage
			};
		}
		#endregion

		[HttpGet, HttpPost]
		public object UploadExcelFile_Stock(bool pIsFinalize)
		{
			Exception exception = null;
			StringBuilder msg = new StringBuilder();
			long ReceiveID = 0;
			CWH_Receive objCWH_Receive = new CWH_Receive();
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

						var DateTime_Default = new DateTime(1900, 1, 1);
						var now = DateTime.Now;
						var nowStr = DateTime.ParseExact(now.ToString("dd/MM/yyyy hh.mm.ss.fff"), "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture);
						var nowDateStr = DateTime.ParseExact(now.ToString("dd/MM/yyyy") + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture);



						WH_ItemBalance itemBalance = new WH_ItemBalance();
						List<ItemBalance> itemBalanceLst = new List<ItemBalance>();

						CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();

						List<StockTemplate> Stocks = new List<StockTemplate>();
						StockTemplate Stock;


						foreach (DataTable table in result.Tables)
						{
							ReceiveID = 0;
							Stocks.Clear();
							itemBalanceLst.Clear();
							objCWH_Receive.lstCVarWH_Receive.Clear();
							objCWH_ReceiveDetails.lstCVarWH_ReceiveDetails.Clear();
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

							if (pIsFinalize)
							{
								foreach (DataRow row in result.Tables[table.TableName].Rows)
								{
									Stock = new StockTemplate
									{
										WarehouseCode = row["WarehouseCode"] == DBNull.Value ? "" : Convert.ToString(row["WarehouseCode"]),
										ItemCode = row["ItemCode"] == DBNull.Value ? "" : Convert.ToString(row["ItemCode"]),
										UnitName = row["UOM"] == DBNull.Value ? "" : Convert.ToString(row["UOM"]),
										LocationCode = row["Location"] == DBNull.Value ? "" : Convert.ToString(row["Location"]),
										PalletID = row["PalletID"] == DBNull.Value ? "" : Convert.ToString(row["PalletID"]),
										Quantity = row["Quantity"] == DBNull.Value ? 0 : Convert.ToDecimal(row["Quantity"]),
										PalletStatusName = row["PalletStatus"] == DBNull.Value ? "" : Convert.ToString(row["PalletStatus"]),
										Production = row["Production"] == DBNull.Value ? "" : Convert.ToString(row["Production"]),
										Expiration = row["Expiration"] == DBNull.Value ? "" : Convert.ToString(row["Expiration"]),
										BatchNumber = row["BatchNumber"] == DBNull.Value ? "" : Convert.ToString(row["BatchNumber"]),
										SerialNo = row["SerialNumber"] == DBNull.Value ? "" : Convert.ToString(row["SerialNumber"]),
										ContainerNumber = row["ContainerNumber"] == DBNull.Value ? "" : Convert.ToString(row["ContainerNumber"]),
										Notes = row["Notes"] == DBNull.Value ? "" : Convert.ToString(row["Notes"]),
									};
									Stocks.Add(Stock);
								}
							}
							else
							{
								foreach (DataRow row in result.Tables[table.TableName].Rows)
								{
									Stock = new StockTemplate
									{
										WarehouseCode = row["WarehouseCode"] == DBNull.Value ? "" : Convert.ToString(row["WarehouseCode"]),
										ItemCode = row["ItemCode"] == DBNull.Value ? "" : Convert.ToString(row["ItemCode"]),
										UnitName = row["UOM"] == DBNull.Value ? "" : Convert.ToString(row["UOM"]),
										Quantity = row["Quantity"] == DBNull.Value ? 0 : Convert.ToDecimal(row["Quantity"]),
										Production = row["Production"] == DBNull.Value ? "" : Convert.ToString(row["Production"]),
										Expiration = row["Expiration"] == DBNull.Value ? "" : Convert.ToString(row["Expiration"]),
										BatchNumber = row["BatchNumber"] == DBNull.Value ? "" : Convert.ToString(row["BatchNumber"]),
										ContainerNumber = row["ContainerNumber"] == DBNull.Value ? "" : Convert.ToString(row["ContainerNumber"]),
										Notes = row["Notes"] == DBNull.Value ? "" : Convert.ToString(row["Notes"]),
									};
									Stocks.Add(Stock);
								}
							}

							if (Stocks.Count == 0)
							{
								msg.AppendLine($"\n*Project({table.TableName})\n");
								msg.AppendLine($"-No stock!\n");
								continue;
							}
							if (Stocks.Any(a => a.Quantity == 0))
							{
								msg.AppendLine($"\n*Project({table.TableName})\n");
								msg.AppendLine($"-Quantity can't be 0!\n");
								continue;
							}
							if (string.IsNullOrWhiteSpace(Stocks[0].WarehouseCode))
							{
								msg.AppendLine($"\n*Project({table.TableName})\n");
								msg.AppendLine($"-Warehouse is mandatory!\n");
								continue;
							}
							if (Stocks.GroupBy(a=>a.WarehouseCode).Count()>1)
							{
								msg.AppendLine($"\n*Project({table.TableName})\n");
								msg.AppendLine($"-Multiple warehouses not allowed!\n");
								continue;
							}
							var warehouseId = objCCustomizedDBCall.CallStringFunction($"select ID from WH_Warehouse where Code =N'{Stocks[0].WarehouseCode}'");
							if (string.IsNullOrWhiteSpace(warehouseId))
							{
								msg.AppendLine($"\n*Project({table.TableName})\n");
								msg.AppendLine($"-Warehouse({Stocks[0].WarehouseCode}) not found!\n");
								continue;
							}

							var palletIDs = "N'" + string.Join("',N'", Stocks.Select(a => a.PalletID).Distinct()) + "'";
							var Pallets = objCCustomizedDBCall.ExecuteQuery_ListOfObjects($"select ReceiveCode Code, PalletID Name from vwWH_ReceiveDetails where WarehouseID={warehouseId} and PalletID in ({palletIDs}) and IsNull(PalletID,'')<>''", typeof(SelectListOption)).Cast<SelectListOption>().ToList();

							var palletSatusNames = "N'" + string.Join("',N'", Stocks.Select(a => a.PalletStatusName).Distinct()) + "'";
							var palletSatus = objCCustomizedDBCall.ExecuteQuery_ListOfObjects($"select ID, Name from PalletStatus where Name in ({palletSatusNames})", typeof(SelectListOption)).Cast<SelectListOption>().ToList();

							var locCodes = "N'" + string.Join("',N'", Stocks.Select(a => a.LocationCode).Distinct()) + "'";
							var Locations = objCCustomizedDBCall.ExecuteQuery_ListOfObjects($"select ID, Code from vwWH_RowLocation where WarehouseID={warehouseId} and Code in ({locCodes})", typeof(CVarvwWH_RowLocation)).Cast<CVarvwWH_RowLocation>().ToList();

							if (pIsFinalize)
							{
								if (Pallets != null && Pallets.Count > 0)
								{
									msg.AppendLine($"\n*Project({table.TableName})\n");
									msg.AppendLine($"-Pallets existed in receive({Pallets[0].Code})!\n");
									continue;
								}

								if (palletSatus == null || palletSatus.Count == 0)
								{
									msg.AppendLine($"\n*Project({table.TableName})\n");
									msg.AppendLine($"-Pallet Status not found!\n");
									continue;
								}

								if (Locations == null || Locations.Count == 0)
								{
									msg.AppendLine($"\n*Project({table.TableName})\n");
									msg.AppendLine($"-Locations not found!\n");
									continue;
								}
							}

							var itemCodes = "N'" + string.Join("',N'", Stocks.Select(a => a.ItemCode).Distinct()) + "'";
							var Items = objCCustomizedDBCall.ExecuteQuery_ListOfObjects($"select ID, Code, PackageTypeID, PackageTypeName from vwPurchaseItem where OwnerID={Owners[0].ID} and Code in ({itemCodes})", typeof(CVarvwPurchaseItem)).Cast<CVarvwPurchaseItem>().ToList();
							if (Items == null || Items.Count == 0)
							{
								msg.AppendLine($"\n*Project({table.TableName})\n");
								msg.AppendLine($"-Items not found!\n");
								continue;
							}

							//var unitNames = "'" + string.Join("','", Stocks.Select(a => a.UnitName).Distinct()) + "'";
							//var Units = objCCustomizedDBCall.ExecuteQuery_ListOfObjects($"select PackageTypeID ID, PackageTypeName Name from vwPurchaseItem where PackageTypeName in ({unitNames})", typeof(SelectListOption)).Cast<SelectListOption>().ToList();
							//if (Units == null || Units.Count == 0)
							//{
							//	msg.AppendLine($"Units not found!");
							//	return new { IsUploaded = msg.Length == 0 && exception == null, Msg = msg.ToString(), Exception = exception };
							//}





							var IsValid = true;
							foreach (var stock in Stocks)
							{
								stock.ItemID = Items.Find(a => a.Code.ToLower() == stock.ItemCode.ToLower())?.ID ?? 0;
								if (stock.ItemID == 0)
								{
									msg.AppendLine($"\n*Project({table.TableName})\n");
									msg.AppendLine($"-Item({stock.ItemCode}) not found!\n");
									IsValid = false;
									break;
								}

								stock.UnitID = Items.Find(a => a.ID == stock.ItemID && a.PackageTypeName?.ToLower() == stock.UnitName.ToLower())?.PackageTypeID ?? 0;
								if (stock.UnitID == 0)
								{
									msg.AppendLine($"\n*Project({table.TableName})\n");
									msg.AppendLine($"-Unit({stock.UnitName}) not related to item({stock.ItemCode})!\n");
									IsValid = false;
									break;
								}

								//stock.UnitID = Units.Find(a => a.Name.ToLower() == stock.UnitName.ToLower())?.ID ?? 0;
								//if (stock.UnitID == 0)
								//{
								//	msg.AppendLine($"Unit({stock.UnitName}) not found!");
								//	IsValid = false;
								//	break;
								//}

								if (pIsFinalize)
								{
									stock.LocationID = Locations.Find(a => a.Code.ToLower() == stock.LocationCode.ToLower())?.ID ?? 0;
									if (stock.LocationID == 0)
									{
										msg.AppendLine($"\n*Project({table.TableName})\n");
										msg.AppendLine($"-Location({stock.LocationCode}) not found!\n");
										IsValid = false;
										break;
									}

									stock.PalletStatusID = palletSatus.Find(a => a.Name.ToLower() == stock.PalletStatusName.ToLower())?.ID ?? 0;
									if (stock.PalletStatusID == 0)
									{
										msg.AppendLine($"\n*Project({table.TableName})\n");
										msg.AppendLine($"-Status({stock.PalletStatusName}) not found!\n");
										IsValid = false;
										break;
									}
								}

								if (stock.Production.Length > 0)
								{
									if (stock.Production.Length < 10)
									{
										msg.AppendLine($"\n*Project({table.TableName})\n");
										msg.AppendLine($"-Production date format should be \n (dd/MM/yyyy or dd-MM-yyyy)!\n");
										IsValid = false;
										break;
									}
									else
										stock.Production = stock.Production.Substring(0, 10);
								}

								if (stock.Expiration.Length > 0)
								{
									if (stock.Expiration.Length < 10)
									{
										msg.AppendLine($"\n*Project({table.TableName})\n");
										msg.AppendLine($"-Expiration date format should be \n (dd/MM/yyyy or dd-MM-yyyy)!\n");
										IsValid = false;
										break;
									}
									else
										stock.Expiration = stock.Expiration.Substring(0, 10);
								}
								stock.Production = stock.Production.Replace('-', '/');
								stock.Expiration = stock.Expiration.Replace('-', '/');
							}
							if (!IsValid)
								continue;
							objCWH_Receive.lstCVarWH_Receive.Add(new Models.Warehousing.Transactions.Generated.Old.CVarWH_Receive
							{
								WarehouseID = Convert.ToInt32(warehouseId),
								CustomerID = Owners[0].CustomerId,
								OwnerID = Owners[0].ID,
								ReceiveDate = nowDateStr,
								FinalizeDate = pIsFinalize ? now : DateTime_Default,
								FinalizeUserID = pIsFinalize ? WebSecurity.CurrentUserId : 0,
								IsFinalized = pIsFinalize,
								StatusID = pIsFinalize ? 30 : 5,
								ContainerNumber= Stocks[0].ContainerNumber,
								Notes= Stocks[0].Notes,
								CreationDate = now,
								CreatorUserID = WebSecurity.CurrentUserId,
								ModificationDate = now,
								ModificatorUserID = WebSecurity.CurrentUserId,
								CreationSource=CreationSource.xls.ToString()
							});
							Common.Common.ReplaceNull(objCWH_Receive.lstCVarWH_Receive[0]);
							exception = objCWH_Receive.SaveMethod(objCWH_Receive.lstCVarWH_Receive);
							if (exception == null)
							{
								ReceiveID = objCWH_Receive.lstCVarWH_Receive[0].ID;
								foreach (var stock in Stocks)
								{
									objCWH_ReceiveDetails.lstCVarWH_ReceiveDetails.Add(new Models.Warehousing.Transactions.Generated.Old.CVarWH_ReceiveDetails
									{
										ReceiveID = objCWH_Receive.lstCVarWH_Receive[0].ID,
										ReceiveDate = objCWH_Receive.lstCVarWH_Receive[0].ReceiveDate,
										PurchaseItemID = stock.ItemID,
										RD_PackageTypeID = (int)stock.UnitID,
										LocationID = (int)stock.LocationID,
										PalletID = stock.PalletID,
										PalletStatusID = (int)stock.PalletStatusID,
										ExpectedQuantity = stock.Quantity,
										Quantity = pIsFinalize ? stock.Quantity : 0,
										Serial = stock.SerialNo,
										BatchNumber = stock.BatchNumber,
										ProductionDate = DateTime.ParseExact((stock.Production != "" ? stock.Production : DateTime_Default.ToString("dd/MM/yyyy")) + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture),
										ExpectedProductionDate = DateTime.ParseExact((stock.Production != "" ? stock.Production : DateTime_Default.ToString("dd/MM/yyyy")) + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture),
										ExpirationDate = DateTime.ParseExact((stock.Expiration != "" ? stock.Expiration : DateTime_Default.ToString("dd/MM/yyyy")) + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture),
										ExpectedExpirationDate = DateTime.ParseExact((stock.Expiration != "" ? stock.Expiration : DateTime_Default.ToString("dd/MM/yyyy")) + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture),
										CreationDate = now,
										CreatorUserID = WebSecurity.CurrentUserId,
										ModificationDate = now,
										ModificatorUserID = WebSecurity.CurrentUserId,
										CreationSource = CreationSource.xls.ToString()
									});
									Common.Common.ReplaceNull(objCWH_ReceiveDetails.lstCVarWH_ReceiveDetails[objCWH_ReceiveDetails.lstCVarWH_ReceiveDetails.Count - 1]);
								}
								exception = objCWH_ReceiveDetails.SaveMethod(objCWH_ReceiveDetails.lstCVarWH_ReceiveDetails);
								if (exception == null)
								{
									if (pIsFinalize)
									{
										CWH_ReceiveDetailsSerial objCWH_ReceiveDetailsSerial = new CWH_ReceiveDetailsSerial();

										foreach (var item in objCWH_ReceiveDetails.lstCVarWH_ReceiveDetails)
										{

											itemBalanceLst.Add(new ItemBalance
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


											if (!string.IsNullOrWhiteSpace(item.Serial) && item.Serial != "0")
											{
												objCWH_ReceiveDetailsSerial.lstCVarWH_ReceiveDetailsSerial.Add(new CVarWH_ReceiveDetailsSerial
												{
													Serial = item.Serial,
													ReceiveDetailsID = item.ID,
													CreatorUserID = WebSecurity.CurrentUserId,
													CreationDate = now,
													ModificatorUserID= WebSecurity.CurrentUserId,
													ModificationDate=now
												});
												Common.Common.ReplaceNull(objCWH_ReceiveDetailsSerial.lstCVarWH_ReceiveDetailsSerial[objCWH_ReceiveDetailsSerial.lstCVarWH_ReceiveDetailsSerial.Count - 1]);
											}
										}

										var done = itemBalance.Add(itemBalanceLst);
										exception = objCWH_ReceiveDetailsSerial.SaveMethod(objCWH_ReceiveDetailsSerial.lstCVarWH_ReceiveDetailsSerial);
									}
								}
								else
								{
									exception = objCWH_ReceiveDetails.DeleteList($"where ReceiveID={objCWH_Receive.lstCVarWH_Receive[0].ID}");
									exception = objCWH_Receive.DeleteList($"where ID={objCWH_Receive.lstCVarWH_Receive[0].ID}");
								}
							}
						}

					}
				}
			}
			catch (Exception ex)
			{
				if (ReceiveID > 0)
				{
					exception = objCWH_ReceiveDetails.DeleteList($"where ReceiveID={ReceiveID}");
					exception = objCWH_Receive.DeleteList($"where ID={ReceiveID}");
				}
				exception = ex;
				msg.AppendLine($"\n{ex.Message}\n");
			}

			return new { IsUploaded = msg.Length == 0 && exception == null, Msg = msg.ToString(), Exception = exception };
		}

		[HttpGet, HttpPost]
		public object CopyOrder(int pID)
		{
			CWH_Receive objCWH_Receive_db = new CWH_Receive();
			CWH_ReceiveDetails objCWH_ReceiveDetails_db = new CWH_ReceiveDetails();
			objCWH_Receive_db.GetItem(pID);
			objCWH_ReceiveDetails_db.GetList($"where ReceiveID={pID}");

			if (objCWH_Receive_db.lstCVarWH_Receive.Count == 0 || objCWH_ReceiveDetails_db.lstCVarWH_ReceiveDetails.Count == 0)
			{
				return new { OrderCode = string.Empty, Exception = new Exception("Order Not Found") };
			}

			Exception exception = null;
			var DateTime_Default = new DateTime(1900, 1, 1);
			var now = DateTime.Now;
			var nowStr = DateTime.ParseExact(now.ToString("dd/MM/yyyy hh.mm.ss.fff"), "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture);
			var nowDateStr = DateTime.ParseExact(now.ToString("dd/MM/yyyy") + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture);

			CWH_Receive objCWH_Receive = new CWH_Receive();
			CWH_ReceiveDetails objCWH_ReceiveDetails = new CWH_ReceiveDetails();

			objCWH_Receive.lstCVarWH_Receive.Add(new Models.Warehousing.Transactions.Generated.Old.CVarWH_Receive
			{
				WarehouseID = objCWH_Receive_db.lstCVarWH_Receive[0].WarehouseID,
				CustomerID = objCWH_Receive_db.lstCVarWH_Receive[0].CustomerID,
				OwnerID = objCWH_Receive_db.lstCVarWH_Receive[0].OwnerID,
				ReceiveDate = nowDateStr,
				FinalizeDate = DateTime_Default,
				FinalizeUserID = 0,
				IsFinalized = false,
				StatusID = 5,
				Notes = $"Copied from {objCWH_Receive_db.lstCVarWH_Receive[0].Code}",
				CreationDate = now,
				CreatorUserID = WebSecurity.CurrentUserId,
				ModificationDate = now,
				ModificatorUserID = WebSecurity.CurrentUserId
			});
			Common.Common.ReplaceNull(objCWH_Receive.lstCVarWH_Receive[0]);
			exception = objCWH_Receive.SaveMethod(objCWH_Receive.lstCVarWH_Receive);
			if (exception == null)
			{
				foreach (var item in objCWH_ReceiveDetails_db.lstCVarWH_ReceiveDetails)
				{
					objCWH_ReceiveDetails.lstCVarWH_ReceiveDetails.Add(new Models.Warehousing.Transactions.Generated.Old.CVarWH_ReceiveDetails
					{
						ReceiveID = objCWH_Receive.lstCVarWH_Receive[0].ID,
						ReceiveDate = objCWH_Receive.lstCVarWH_Receive[0].ReceiveDate,
						PurchaseItemID = item.PurchaseItemID,
						RD_PackageTypeID = item.RD_PackageTypeID,
						ExpectedQuantity = item.ExpectedQuantity,
						ExpectedProductionDate = item.ExpectedProductionDate,
						ExpectedExpirationDate = item.ExpectedExpirationDate,
						CreationDate = now,
						CreatorUserID = WebSecurity.CurrentUserId,
						ModificationDate = now,
						ModificatorUserID = WebSecurity.CurrentUserId
					});
					Common.Common.ReplaceNull(objCWH_ReceiveDetails.lstCVarWH_ReceiveDetails[objCWH_ReceiveDetails.lstCVarWH_ReceiveDetails.Count - 1]);
				}
				exception = objCWH_ReceiveDetails.SaveMethod(objCWH_ReceiveDetails.lstCVarWH_ReceiveDetails);
			}
			if (exception == null)
				objCWH_Receive.GetItem(objCWH_Receive.lstCVarWH_Receive[0].ID);

			return new { OrderCode = exception == null? objCWH_Receive.lstCVarWH_Receive[0].Code:string.Empty, Exception = exception };
		}

	}
}

public class StockTemplate
{
	public long ItemID { get; set; }
	public string ItemCode { get; set; }
	public string WarehouseCode { get; set; }
	public string WarehouseToCode { get; set; }
	public long UnitID { get; set; }
	public string UnitName { get; set; }
	public long LocationID { get; set; }
	public string LocationCode { get; set; }
	public string PalletID { get; set; }
	public decimal Quantity { get; set; }
	public long PalletStatusID { get; set; }
	public string PalletStatusName { get; set; }
	public string Production { get; set; }
	public string Expiration { get; set; }
	public string BatchNumber { get; set; }
	public string SerialNo { get; set; }
	public string ContainerNumber { get; set; }
	public string Notes { get; set; }
}
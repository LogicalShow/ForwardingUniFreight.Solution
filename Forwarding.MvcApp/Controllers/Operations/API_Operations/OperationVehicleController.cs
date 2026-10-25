using Forwarding.MvcApp.Entities.Warehousing;
using Forwarding.MvcApp.Models.Administration.Security.Generated;
using Forwarding.MvcApp.Models.Administration.Settings.Generated;
using Forwarding.MvcApp.Models.Customized;
using Forwarding.MvcApp.Models.LocalEmails.Generated;
using Forwarding.MvcApp.Models.MasterData.Invoicing.Generated;
using Forwarding.MvcApp.Models.MasterData.Locations.Generated;
using Forwarding.MvcApp.Models.MasterData.Partners.Generated;
using Forwarding.MvcApp.Models.NoAccess.Generated;
using Forwarding.MvcApp.Models.Operations.Operations.Generated;
using Forwarding.MvcApp.Models.Operations.Operations.Generated.Old;
using Forwarding.MvcApp.Models.Warehousing.MasterData.Generated;
using Forwarding.MvcApp.Models.Warehousing.Reports.Customized;
using Forwarding.MvcApp.Models.Warehousing.Reports.Generated;
using Forwarding.MvcApp.Models.Warehousing.Transactions.Generated;
using System;
using System.Collections.Generic;
using System.Data;
using System.Globalization;
using System.Linq;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;

namespace Forwarding.MvcApp.Controllers.Operations.API_Operations
{
    public class OperationVehicleController : ApiController
    {
        #region OperationVehicle
        [HttpGet, HttpPost]
        public Object[] LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned(bool pIsLoadArrayOfObjects, string pLanguage, Int32 pPageNumber, Int32 pPageSize, string pWhereClause, string pOrderBy)
        {
            int _RowCount = 0;
            Exception checkException = null;
            CvwOperationVehicle objCvwOperationVehicle = new CvwOperationVehicle();
            CWH_Warehouse objCWH_Warehouse = new CWH_Warehouse();
            CvwOperationsToRestoreInvoices objCOperations = new CvwOperationsToRestoreInvoices();
            CvwWH_ReceiveDetails objCvwWH_ReceiveDetails_GetPurchaseItems = new CvwWH_ReceiveDetails();
            CvwWH_ReceiveDetails objCvwWH_ReceiveDetails_GetCustomers = new CvwWH_ReceiveDetails();
            CPurchaseItem objCPurchaseItem_All = new CPurchaseItem();

            if (pIsLoadArrayOfObjects)
            {
                checkException = objCWH_Warehouse.GetListPaging(99999, 1, "WHERE 1=1", "Name", out _RowCount);
                checkException = objCPurchaseItem_All.GetListPaging(99999, 1, "WHERE IsVehicle=0 AND IsFlexi=0", "Code,Name", out _RowCount);
                checkException = objCOperations.GetList("WHERE BLType <> 2 ORDER BY ID DESC");
                checkException = objCvwWH_ReceiveDetails_GetCustomers.GetListPaging(999999, 1, "WHERE Quantity>PickedQuantity AND IsFinalized=1", "ID", out _RowCount);
                checkException = objCvwWH_ReceiveDetails_GetPurchaseItems.GetListPaging(999999, 1, "WHERE isnull(OperationVehicleID,0)=0 AND (Quantity>PickedQuantity) AND IsFinalized=1", "ID", out _RowCount);
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

            //objCvwOperationVehicle.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);
            objCvwOperationVehicle.GetList(pWhereClause);
            //********************************************************
            Cvw_VehicleTracking objvwVehicleTracking = new Cvw_VehicleTracking();
            objvwVehicleTracking.GetList(pWhereClause);
            //********************************************************
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };

            return new Object[] {
                serializer.Serialize(objvwVehicleTracking.lstCVarvw_VehicleTracking)
                , objCvwOperationVehicle.lstCVarvwOperationVehicle.Count //_RowCount
                , new JavaScriptSerializer().Serialize(objCWH_Warehouse.lstCVarWH_Warehouse) //pWarehouse=pData[2]
                , new JavaScriptSerializer().Serialize(pPurchaseItemList) //pPurchaseItem=pData[3]
                , new JavaScriptSerializer().Serialize(pCustomerList) //pCustomer=pData[4]
                , new JavaScriptSerializer().Serialize(pOperationsList) //pOperation=pData[5]
                , serializer.Serialize(pPurchaseItem_AllList) //pPurchaseItem_All=pData[6]
            };
        }

        [HttpGet, HttpPost]
        public object[] Delete(String pDeletedVehicleIDs, Int64 pOperationID)
        {
            bool _result = false;
            int _RowCount = 0;
            CvwOperationVehicle objCvwOperationVehicle = new CvwOperationVehicle();
            COperationVehicle objCOperationVehicle = new COperationVehicle();
            CVehicleTracking objcVehicleTracking = new CVehicleTracking();
            Cvw_VehicleTracking objcvwVehicleTracking = new Cvw_VehicleTracking();
            foreach (var currentID in pDeletedVehicleIDs.Split(','))
            {
                objCOperationVehicle.lstDeletedCPKOperationVehicle.Add(new CPKOperationVehicle() { ID = Int32.Parse(currentID.Trim()) });
                objcVehicleTracking.lstDeletedCPKVehicleTracking.Add(new CPKVehicleTracking() { ID = int.Parse(currentID.Trim()) });
            }

          //  Exception checkException = objCOperationVehicle.DeleteItem(objCOperationVehicle.lstDeletedCPKOperationVehicle);
            Exception checkException = objcVehicleTracking.DeleteItem(objcVehicleTracking.lstDeletedCPKVehicleTracking);    
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("DELETE")) // some or all of the rows were not deleted due to dependencies
                    _result = false;
            }
            else
            { //deleted successfully
                _result = true;
                //objCvwOperationVehicle.GetListPaging(999999, 1, "WHERE OperationID=" + pOperationID, "Code", out _RowCount);
               // objCvwOperationVehicle.GetList("WHERE OperationID=" + pOperationID);
                objcvwVehicleTracking.GetList("WHERE OperationID =" + pOperationID);
            }
            return new object[] {
                _result
                //, _result ? new JavaScriptSerializer().Serialize(objCvwOperationVehicle.lstCVarvwOperationVehicle) : null
                ,_result ? new JavaScriptSerializer().Serialize(objcvwVehicleTracking.lstCVarvw_VehicleTracking):null
            };
        }

        [HttpGet, HttpPost]
        public object[] InsertListFromExcel_Vehicle([FromBody] InsertVehicleFromExcel insertVehicleFromExcel)
        {
            //bool _result = true;
            string _MessageReturned = "";
            Exception checkException = null;
            int _RowCount = 0;
            COperationVehicle objCOperationVehicle = new COperationVehicle();   
            CvwOperationVehicle objCvwOperationVehicle = new CvwOperationVehicle();
            Cvw_VehicleTracking objvwVehicleTracking = new Cvw_VehicleTracking();
            CVehicleTracking objVechileTracking = new CVehicleTracking();
            CDefaults objCDefaults = new CDefaults();
            CPurchaseItem objCPurchaseItem = new CPurchaseItem();

            var constVehicleActionPacking = 2;
            //var constVehicleActionPOReceipt = 5;
            //var constVehicleActionInspection = 10;
            //var constVehicleActionSendToWarehouse = 20;
            //var constVehicleActionChangeLocation = 30;
            //var constVehicleActionChangeWarehouse = 40;
            //var constVehicleActionReceive = 45;
            //var constVehicleActionPickup = 50;
            //var constVehicleActionReturn = 60;

            objCDefaults.GetListPaging(999999, 1, "WHERE 1=1", "ID", out _RowCount);
            Int64 _CurrentPurchaseItemID = 0;
            var OperationId = insertVehicleFromExcel.pOperationID;
            var _ArrBrandList = insertVehicleFromExcel.pBrandList.Split(',');
            var _ArrModel = insertVehicleFromExcel.pModelList.Split(',');
            var _ArrColor = insertVehicleFromExcel.pColorList.Split(',');
            var _ArrLotBody = insertVehicleFromExcel.pBodyList.Split(',');
            var _ArrModelYear = insertVehicleFromExcel.pModelYearList.Split(',');
            var _ArrManufactureCountry = insertVehicleFromExcel.pManufactureCountryList.Split(',');

            var _ArrEngineDisplacement = insertVehicleFromExcel.pEngineDisplacementList.Split(',');
            var _ArrCondition = insertVehicleFromExcel.pConditionList.Split(',');
            var _Arrkilometers = insertVehicleFromExcel.pKilometersList.Split(',');
            var _ArrChassisNo = insertVehicleFromExcel.pChassisNoList.Split(','); 
            var _ArrEngineType = insertVehicleFromExcel.pEngineType.Split(',');
            var _ArrEuroOne = insertVehicleFromExcel.pEureOneList.Split(',');
            var _ArrDealer = insertVehicleFromExcel.pDealerList.Split(',');
            var _ArrDealerLocation = insertVehicleFromExcel.pDealerLocationList.Split(',');
            var _ArrNote = insertVehicleFromExcel.pNotesList.Split(',');
            var _ArrPanoramicRoof = insertVehicleFromExcel.pPanoramicRoofList.Split(',');
            var _ArrInteriorColor = insertVehicleFromExcel.pInteriorColorList.Split(',');
            var _ArrDriverSeat = insertVehicleFromExcel.pDriverSeatList.Split(',');
            var _ArrNumOfDoors = insertVehicleFromExcel.pNumOfDoorsList.Split(',');
            var _ArrKeylessEntry = insertVehicleFromExcel.pKeylessEntryList.Split(',');



            int _NumberOfRows = _ArrBrandList.Length;

            for (int i = 0; i < _NumberOfRows; i++)
            {
                //checkException = objCPurchaseItem.GetListPaging(999999, 1, "WHERE Code=N'" + _ArrCode[i] + "'", "ID", out _RowCount);
                //#region Insert PurchaseItem if not found
                //if (objCPurchaseItem.lstCVarPurchaseItem.Count == 0)
                //{
                //    CVarPurchaseItem objCVarPurchaseItem = new CVarPurchaseItem();
                //    objCVarPurchaseItem.Code = _ArrCode[i];
                //    objCVarPurchaseItem.Name = _ArrCode[i];
                //    objCVarPurchaseItem.LocalName = _ArrCode[i];
                //    objCVarPurchaseItem.PartNumber = "0";

                //    objCVarPurchaseItem.StockUnitQuantity = 0;
                //    objCVarPurchaseItem.Price = 0;
                //    objCVarPurchaseItem.CurrencyID = objCDefaults.lstCVarDefaults[0].CurrencyID;
                //    objCVarPurchaseItem.AccountID = 0;
                //    objCVarPurchaseItem.SubAccountID = 0;
                //    objCVarPurchaseItem.CostCenterID = 0;
                //    objCVarPurchaseItem.ViewOrder = 0;
                //    objCVarPurchaseItem.Notes = _ArrNotes[i];
                //    //Warehouse parameters
                //    objCVarPurchaseItem.CommodityID = 0;
                //    objCVarPurchaseItem.PackageTypeID = 0;
                //    objCVarPurchaseItem.GrossWeight = 0;
                //    objCVarPurchaseItem.NetWeight = 0;
                //    objCVarPurchaseItem.WeightUnitID = objCDefaults.lstCVarDefaults[0].WeightUnitID;
                //    objCVarPurchaseItem.Width = 0;
                //    objCVarPurchaseItem.Depth = 0;
                //    objCVarPurchaseItem.Height = 0;
                //    objCVarPurchaseItem.LengthUnitID = objCDefaults.lstCVarDefaults[0].LengthUnitID;
                //    objCVarPurchaseItem.Volume = 0;
                //    objCVarPurchaseItem.VolumeUnitID = objCDefaults.lstCVarDefaults[0].VolumeUnitID;
                //    objCVarPurchaseItem.IsFragile = false;
                //    objCVarPurchaseItem.IsIMO = false;
                //    objCVarPurchaseItem.IMOClassID = 0;
                //    objCVarPurchaseItem.UN = 0;
                //    objCVarPurchaseItem.PG = 0;
                //    objCVarPurchaseItem.HSCode = "0";

                //    objCVarPurchaseItem.ModelNumber = "0";
                //    objCVarPurchaseItem.BrandName = "0";
                //    objCVarPurchaseItem.ProductType = "0";

                //    objCVarPurchaseItem.IsAddedFromExcel = false;
                //    objCVarPurchaseItem.IsFlexi = false;

                //    objCVarPurchaseItem.PreferredAreaID = 0;
                //    objCVarPurchaseItem.ByExpireDate = false;
                //    objCVarPurchaseItem.BySerialNo = false;
                //    objCVarPurchaseItem.ByLotNo = false;
                //    objCVarPurchaseItem.ByVehicle = false;

                //    // For ERP
                //    objCVarPurchaseItem.ParentGroupID = 0;
                //    objCVarPurchaseItem.ItemTypeID = 0;
                //    objCVarPurchaseItem.MaxQty = 0;
                //    objCVarPurchaseItem.MinQty = 0;

                //    #region Vehicle
                //    objCVarPurchaseItem.OperationID = 0;
                //    objCVarPurchaseItem.IsVehicle = true;
                //    objCVarPurchaseItem.EquipmentModelID = 0;
                //    objCVarPurchaseItem.MotorNumber = "0";
                //    objCVarPurchaseItem.ChassisNumber = "0";
                //    objCVarPurchaseItem.LotNumber = "0";
                //    objCVarPurchaseItem.SerialNumber = "0";
                //    #endregion Vehicle

                //    objCVarPurchaseItem.CreatorUserID = objCVarPurchaseItem.ModificatorUserID = WebSecurity.CurrentUserId;
                //    objCVarPurchaseItem.CreationDate = objCVarPurchaseItem.ModificationDate = DateTime.Now;
                //    objCVarPurchaseItem.ClientID = 0;
                //    objCPurchaseItem.lstCVarPurchaseItem.Add(objCVarPurchaseItem);
                //    checkException = objCPurchaseItem.SaveMethod(objCPurchaseItem.lstCVarPurchaseItem);
                //    _CurrentPurchaseItemID = objCVarPurchaseItem.ID;
                //}
                //else
                //    _CurrentPurchaseItemID = objCPurchaseItem.lstCVarPurchaseItem[0].ID;
                //#endregion Insert PurchaseItem if not found

                ////objCvwOperationVehicle.GetListPaging(999999, 1, "WHERE ChassisNumber='" + _ArrChassisNumber[i] + "'", "ID", out _RowCount);
                //objCvwOperationVehicle.GetList("WHERE ChassisNumber=N'" + _ArrChassisNumber[i] + "'");
                //if (objCvwOperationVehicle.lstCVarvwOperationVehicle.Count > 0)
                //    _MessageReturned += " Chassis: " + objCvwOperationVehicle.lstCVarvwOperationVehicle[0].ChassisNumber + " found in Oper. " + objCvwOperationVehicle.lstCVarvwOperationVehicle[0].OperationCode + "." + "\n";
                objvwVehicleTracking.GetList("WHERE ChassisNo = N'" + _ArrChassisNo[i] +"'");
                if (objvwVehicleTracking.lstCVarvw_VehicleTracking.Count > 0)
                {
                    _MessageReturned += " ChassisNo: " + objvwVehicleTracking.lstCVarvw_VehicleTracking[0].ChassisNo + " found in Oper. " + objvwVehicleTracking.lstCVarvw_VehicleTracking[0].OperationID + "." + "\n";
                }
                      else
                      {
                      //CVarOperationVehicle objCVarOperationVehicle = new CVarOperationVehicle();
                      //objCVarOperationVehicle.Code = _ArrCode[i];
                      //objCVarOperationVehicle.PurchaseItemID = _CurrentPurchaseItemID;

                      //objCVarOperationVehicle.OperationID = insertVehicleFromExcel.pOperationID;
                      //objCVarOperationVehicle.EquipmentModelID = 0;
                      //objCVarOperationVehicle.MotorNumber = _ArrEngineNumber[i]; // _ArrMotorNumber[i];
                      //objCVarOperationVehicle.ChassisNumber = _ArrChassisNumber[i];
                      //objCVarOperationVehicle.LotNumber = _ArrModel[i]; //_ArrLotNumber[i];
                      //objCVarOperationVehicle.SerialNumber = _ArrSerialNumber[i];
                      //objCVarOperationVehicle.IsSentToWarehouse = false;
                      //objCVarOperationVehicle.Notes = _ArrNotes[i];

                      //objCVarOperationVehicle.OCNCode = _ArrOCNCode[i];
                      //objCVarOperationVehicle.Model = _ArrModel[i];
                      //objCVarOperationVehicle.KeyNumber = _ArrKeyNumber[i];
                      //objCVarOperationVehicle.EC = _ArrEC[i];
                      //objCVarOperationVehicle.PaintType = _ArrPaintType[i];
                      //objCVarOperationVehicle.IC = _ArrIC[i];
                      //objCVarOperationVehicle.CommercialInvoiceNumber = _ArrCommercialInvoiceNumber[i];
                      //objCVarOperationVehicle.InsurancePolicyNumber = _ArrInsurancePolicyNumber[i];
                      //objCVarOperationVehicle.ProductionOrder = _ArrProductionOrder[i];
                      //objCVarOperationVehicle.PINumber = _ArrPINumber[i];
                      //objCVarOperationVehicle.BillNumber = _ArrBillNumber[i];
                      //objCVarOperationVehicle.EngineNumber = _ArrEngineNumber[i];

                      //objCVarOperationVehicle.CreatorUserID = objCVarOperationVehicle.ModificatorUserID = WebSecurity.CurrentUserId;
                      //objCVarOperationVehicle.CreationDate = objCVarOperationVehicle.ModificationDate = DateTime.Now;

                      //objCOperationVehicle.lstCVarOperationVehicle.Add(objCVarOperationVehicle);
                      CVarVehicleTracking objcvVehicleTracking = new CVarVehicleTracking();
                objcvVehicleTracking.OperationID = OperationId;
                objcvVehicleTracking.Brand = _ArrBrandList[i];
                objcvVehicleTracking.Body = _ArrLotBody[i];
                objcvVehicleTracking.ChassisNo = _ArrChassisNo[i];
                objcvVehicleTracking.Color = _ArrColor[i];
            
                objcvVehicleTracking.Manufacturecountry = _ArrManufactureCountry[i];
               
                objcvVehicleTracking.Condition = _ArrCondition[i];
                    try
                    {
                        objcvVehicleTracking.KiloMeter = int.Parse(_Arrkilometers[i]);
                        objcvVehicleTracking.Dealer = int.Parse(_ArrDealer[i]);
                        objcvVehicleTracking.EngineDisplacement = int.Parse(_ArrEngineDisplacement[i]);
                        objcvVehicleTracking.ModelYear = int.Parse(_ArrModelYear[i]);
                        objcvVehicleTracking.InteriorColor = int.Parse(_ArrInteriorColor[i]);
                        objcvVehicleTracking.NumofDoors = int.Parse(_ArrNumOfDoors[i]);

                    }
                    catch (Exception ex)
                    {
                        _MessageReturned = "Error ,There is a wrong data Entered in row Number " +(i+1)+" Please Check data type of Each Element in this Row";
                    }
              
                objcvVehicleTracking.EngineType = _ArrEngineType[i];
                objcvVehicleTracking.EuroOne = _ArrEuroOne[i];
             
                objcvVehicleTracking.Notes = _ArrNote[i];
                objcvVehicleTracking.DriverSeat = _ArrDriverSeat[i];
                objcvVehicleTracking.KeylessEntry = _ArrKeylessEntry[i];
               
                objcvVehicleTracking.PanoramicRoof = _ArrPanoramicRoof[i];
                objcvVehicleTracking.Model = _ArrModel[i];
                objcvVehicleTracking.ChassisNo = _ArrChassisNo[i];


                    objcvVehicleTracking.IsEuroOne = false;
                    objcvVehicleTracking.ConfigCode = "";
                    objcvVehicleTracking.VehicleAcid = "";
                    objcvVehicleTracking.PriceWebsite = 0;
                    objcvVehicleTracking.PriceContract = 0;
                    objcvVehicleTracking.DealerName = "";
                    objcvVehicleTracking.DealerLocation = "";
                    objcvVehicleTracking.IsImportApproval = false;
                    objcvVehicleTracking.IsDisabilityLetter = false;
                    objcvVehicleTracking.InteriorColorName = "";
                    objcvVehicleTracking.IsPanoramicRoof = false;
                    objcvVehicleTracking.IsElectricSeats = false;
                    objcvVehicleTracking.IsCamera = false;
                    objcvVehicleTracking.IsKeylessEntry = false;
                    objcvVehicleTracking.IsParkingAids = false;
                    objcvVehicleTracking.IsRearCamera = false;
                    objcvVehicleTracking.ImpModel = "";
                    objcvVehicleTracking.ImpCategory = "";
                    objcvVehicleTracking.ImpYearOfManufacture = 0;
                    objcvVehicleTracking.ImpCountryOfOrigin = "";
                    objcvVehicleTracking.ImpCountryOfResidence = "";
                    objcvVehicleTracking.ImpIsEuroOne = false;
                    objcvVehicleTracking.IsBillOfLading = false;
                    objcvVehicleTracking.BillOfLadingDate = DateTime.Parse("01/01/1900");
                    objcvVehicleTracking.IsEuroOneCertificate = false;
                    objcvVehicleTracking.EuroOneCertificateDate = DateTime.Parse("01/01/1900");
                    objcvVehicleTracking.IsPowerOfAttorneys = false;
                    objcvVehicleTracking.PowerOfAttorneysDate = DateTime.Parse("01/01/1900");
                    objcvVehicleTracking.IsGPSDoc = false;
                    objcvVehicleTracking.GPSDocDate = DateTime.Parse("01/01/1900");
                    objcvVehicleTracking.IsTrafficDoc = false;
                    objcvVehicleTracking.TrafficDocDate = DateTime.Parse("01/01/1900");
                    objcvVehicleTracking.IsSADDoc = false;
                    objcvVehicleTracking.SADDocDate = DateTime.Parse("01/01/1900");
                    objcvVehicleTracking.IsDHL = false;
                    objcvVehicleTracking.DHLDate = DateTime.Parse("01/01/1900");
                    objcvVehicleTracking.IsVehicleLicense = false;
                    objcvVehicleTracking.VehicleLicenseDate = DateTime.Parse("01/01/1900");
                    objcvVehicleTracking.IsArriveAirport = false;
                    objcvVehicleTracking.ArriveAirportDate = DateTime.Parse("01/01/1900");
                    objcvVehicleTracking.IsArriveGhandour = false;
                    objcvVehicleTracking.ArriveGhandourDate = DateTime.Parse("01/01/1900");
                    objcvVehicleTracking.IsPhotos = false;
                    objcvVehicleTracking.PhotosDate = DateTime.Parse("01/01/1900");
                    objcvVehicleTracking.DownPayment = 0;
                    objcvVehicleTracking.ApexInvoice = 0;
                    objcvVehicleTracking.VehicleEmail = "";
                    objcvVehicleTracking.VehiclePassword = "";
                    objcvVehicleTracking.VehiclePasswordTesla = "";
                    objcvVehicleTracking.VehicleNotes = "";




                    objVechileTracking.lstCVarVehicleTracking.Add(objcvVehicleTracking);




                }
            } //for (int i = 0; i < _NumberOfRows; i++)

            //checkException = objCOperationVehicle.SaveMethod(objCOperationVehicle.lstCVarOperationVehicle);
            if(_MessageReturned == "")
                checkException = objVechileTracking.SaveMethod(objVechileTracking.lstCVarVehicleTracking);
            if (checkException != null)
                _MessageReturned = checkException.Message;

            #region Save VehicleAction
            //Save first item to get CodeSerial
            Int64 _CodeSerial = 0;
            CVehicleAction objCVehicleAction = new CVehicleAction();
            if (objCOperationVehicle.lstCVarOperationVehicle.Count > 0)
            {
                {
                    CVarVehicleAction objCVarVehicleAction = new CVarVehicleAction();
                    objCVarVehicleAction.OperationVehicleID = objCOperationVehicle.lstCVarOperationVehicle[0].ID;
                    objCVarVehicleAction.ReceiveDetailsID = 0;
                    objCVarVehicleAction.VehicleActionID = constVehicleActionPacking;
                    objCVarVehicleAction.TruckerID = 0;
                    //objCVarVehicleAction.ActionDate = DateTime.ParseExact(saveVehicleActionDetailsParameters.pActionDate + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture);
                    objCVarVehicleAction.ActionDate = DateTime.Now;
                    objCVarVehicleAction.InspectionNotes = "Added From Packing List";
                    objCVarVehicleAction.FromWarehouseID = 0;
                    objCVarVehicleAction.ToWarehouseID = 0;
                    objCVarVehicleAction.Line = 1;
                    objCVarVehicleAction.CodeSerial = 0;
                    objCVarVehicleAction.IsCancelled = false;
                    objCVarVehicleAction.RowLocationID = 0;
                    objCVarVehicleAction.CreatorUserID = objCVarVehicleAction.ModificatorUserID = WebSecurity.CurrentUserId;
                    objCVarVehicleAction.CreationDate = objCVarVehicleAction.ModificationDate = DateTime.Now;

                    CVehicleAction objCVehicleAction_Temp = new CVehicleAction();
                    objCVehicleAction_Temp.lstCVarVehicleAction.Add(objCVarVehicleAction);
                    checkException = objCVehicleAction_Temp.SaveMethod(objCVehicleAction_Temp.lstCVarVehicleAction);
                    checkException = objCVehicleAction_Temp.GetListPaging(999999, 1, "WHERE ID=" + objCVarVehicleAction.ID, "ID", out _RowCount);

                    _CodeSerial = objCVehicleAction_Temp.lstCVarVehicleAction[0].CodeSerial;
                }
                for (int i = 1; i < objCOperationVehicle.lstCVarOperationVehicle.Count; i++)
                {
                    CVarVehicleAction objCVarVehicleAction = new CVarVehicleAction();
                    objCVarVehicleAction.OperationVehicleID = objCOperationVehicle.lstCVarOperationVehicle[i].ID;
                    objCVarVehicleAction.ReceiveDetailsID = 0;
                    objCVarVehicleAction.VehicleActionID = constVehicleActionPacking;
                    objCVarVehicleAction.TruckerID = 0;
                    //objCVarVehicleAction.ActionDate = DateTime.ParseExact(saveVehicleActionDetailsParameters.pActionDate + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture);
                    objCVarVehicleAction.ActionDate = DateTime.Now;
                    objCVarVehicleAction.InspectionNotes = "Added From Packing List";
                    objCVarVehicleAction.FromWarehouseID = 0;
                    objCVarVehicleAction.ToWarehouseID = 0;
                    objCVarVehicleAction.Line = (i + 1);
                    objCVarVehicleAction.CodeSerial = _CodeSerial;
                    objCVarVehicleAction.IsCancelled = false;
                    objCVarVehicleAction.RowLocationID = 0;
                    objCVarVehicleAction.CreatorUserID = objCVarVehicleAction.ModificatorUserID = WebSecurity.CurrentUserId;
                    objCVarVehicleAction.CreationDate = objCVarVehicleAction.ModificationDate = DateTime.Now;

                    objCVehicleAction.lstCVarVehicleAction.Add(objCVarVehicleAction);
                }
            } //if (objCOperationVehicle.lstCVarOperationVehicle.Count > 0)
            checkException = objCVehicleAction.SaveMethod(objCVehicleAction.lstCVarVehicleAction);
            #endregion Save VehicleAction

            //  checkException = objCvwOperationVehicle.GetListPaging(999999, 1, "WHERE OperationID=" + insertVehicleFromExcel.pOperationID, "Code", out _RowCount);

            checkException = objvwVehicleTracking.GetListPaging(999999, 1, "WHERE 1=1", "ID", out _RowCount);

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                _MessageReturned
                //, serializer.Serialize(objCvwOperationVehicle.lstCVarvwOperationVehicle)
                ,serializer.Serialize(objvwVehicleTracking.lstCVarvw_VehicleTracking)
            };
        }

        [HttpGet, HttpPost]
        public object[] LoadWithWhereClause(Int32 pPageNumber, Int32 pPageSize, string pWhereClause)
        {
            Int32 _RowCount = 0;
            CNoAccessOperationPartnerTypes objCNoAccessOperationPartnerTypes = new CNoAccessOperationPartnerTypes();
            objCNoAccessOperationPartnerTypes.GetList("ORDER BY Name");
            CvwOperationPartners objCvwOperationPartners = new CvwOperationPartners();
            objCvwOperationPartners.GetListPaging(pPageSize, pPageNumber, pWhereClause, " ViewOrder, ID ", out _RowCount);
            return new Object[] {
                new JavaScriptSerializer().Serialize(objCvwOperationPartners.lstCVarvwOperationPartners)
                , _RowCount
                , new JavaScriptSerializer().Serialize(objCNoAccessOperationPartnerTypes.lstCVarNoAccessOperationPartnerTypes) //pData[2]
            };
        }

        [HttpGet, HttpPost]
        public object[] LoadVehicleFullDetailsWithID(Int32 pID)
        {
            /*Int32 _RowCount = 0;
            CNoAccessOperationPartnerTypes objCNoAccessOperationPartnerTypes = new CNoAccessOperationPartnerTypes();
            objCNoAccessOperationPartnerTypes.GetList("ORDER BY Name");
            CvwOperationPartners objCvwOperationPartners = new CvwOperationPartners();
            objCvwOperationPartners.GetListPaging(pPageSize, pPageNumber, pWhereClause, " ViewOrder, ID ", out _RowCount);*/

            CVehicleTracking objCVehicleTracking = new CVehicleTracking();
            objCVehicleTracking.GetItem(pID);

            return new Object[] {
                new JavaScriptSerializer().Serialize(objCVehicleTracking.lstCVarVehicleTracking)
            };
        }

        [HttpGet, HttpPost]
        public object[] VehicleDetails_Save([FromBody] VehicleDetails vehicleDetails)
        {
            int _RowCount = 0;
            CDefaults objCDefaults = new CDefaults();
            objCDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount);
            if (objCDefaults.lstCVarDefaults[0].UnEditableCompanyName == "EVL" && vehicleDetails.pVehicleChassisNo == "")
            {
                return new object[]
                {
                    false
                    ,"Vehicle ChassisNo is required"
                };
            }
                bool _result = false;
            CVarVehicleTracking objCVarVehicleTracking = new CVarVehicleTracking();

            objCVarVehicleTracking.ID = vehicleDetails.pID;
            objCVarVehicleTracking.OperationID = vehicleDetails.pOperationID;
            objCVarVehicleTracking.Brand = vehicleDetails.pVehicleBrand;
            objCVarVehicleTracking.Model = vehicleDetails.pVehicleModel;
            objCVarVehicleTracking.Color = vehicleDetails.pVehicleColor;
            objCVarVehicleTracking.Body = vehicleDetails.pVehicleBody;
            objCVarVehicleTracking.ModelYear = vehicleDetails.pVehicleModelYear;
            objCVarVehicleTracking.ManufactureYear = vehicleDetails.pVehicleManufactureYear;
            objCVarVehicleTracking.Manufacturecountry = vehicleDetails.pVehicleManufactureCountry;
            objCVarVehicleTracking.EngineDisplacement = vehicleDetails.pVehicleEngineDisplacement;
            objCVarVehicleTracking.Condition = vehicleDetails.pVehicleCondition;
            objCVarVehicleTracking.KiloMeter = vehicleDetails.pVehicleKilometers;
            objCVarVehicleTracking.ChassisNo = vehicleDetails.pVehicleChassisNo;
            objCVarVehicleTracking.EngineType = vehicleDetails.pVehicleEngineType;
            objCVarVehicleTracking.EuroOne = "";
            objCVarVehicleTracking.Dealer = 0;
            objCVarVehicleTracking.Notes = vehicleDetails.pVehicleNotes;
            objCVarVehicleTracking.PanoramicRoof = "";
            objCVarVehicleTracking.InteriorColor = 0;
            objCVarVehicleTracking.DriverSeat = "";
            objCVarVehicleTracking.NumofDoors = 0;
            objCVarVehicleTracking.KeylessEntry = "";
            objCVarVehicleTracking.IsEuroOne = vehicleDetails.pIsEuroOne;
            objCVarVehicleTracking.ConfigCode = vehicleDetails.pVehicleConfigCode;
            objCVarVehicleTracking.VehicleAcid = vehicleDetails.pVehicleACID;

            objCVarVehicleTracking.PriceWebsite = vehicleDetails.pVehiclePriceWebsite;
            objCVarVehicleTracking.PriceContract = vehicleDetails.pVehiclePriceContract;
            objCVarVehicleTracking.DealerName = vehicleDetails.pVehicleDealerName;
            objCVarVehicleTracking.DealerLocation = vehicleDetails.pVehicleDealerLocation;
            objCVarVehicleTracking.IsImportApproval = vehicleDetails.pIsImportApproval;
            objCVarVehicleTracking.IsDisabilityLetter = vehicleDetails.pIsDisabilityLetter;

            objCVarVehicleTracking.InteriorColorName = vehicleDetails.pInteriorColorName;
            objCVarVehicleTracking.IsPanoramicRoof = vehicleDetails.pIsPanoramicRoof;
            objCVarVehicleTracking.IsElectricSeats = vehicleDetails.pIsElectricSeats;
            objCVarVehicleTracking.IsCamera = vehicleDetails.pIsCamera;
            objCVarVehicleTracking.IsKeylessEntry = vehicleDetails.pIsKeylessEntry;
            objCVarVehicleTracking.IsParkingAids = vehicleDetails.pIsParkingAids;
            objCVarVehicleTracking.IsRearCamera = vehicleDetails.pIsRearCamera;

            objCVarVehicleTracking.ImpModel = vehicleDetails.pVehicleImpModel;
            objCVarVehicleTracking.ImpCategory = vehicleDetails.pVehicleImpCategory;
            objCVarVehicleTracking.ImpYearOfManufacture = vehicleDetails.pImpYearOfManufacture;
            objCVarVehicleTracking.ImpCountryOfOrigin = vehicleDetails.pVehicleImpCountryOfOrigin;
            objCVarVehicleTracking.ImpCountryOfResidence = vehicleDetails.pVehicleImpCountryOfResidence;
            objCVarVehicleTracking.ImpIsEuroOne = vehicleDetails.pImpIsEuroOne;

            objCVarVehicleTracking.IsBillOfLading = vehicleDetails.pIsBillOfLading;
            objCVarVehicleTracking.BillOfLadingDate = DateTime.ParseExact(vehicleDetails.pBillOfLadingDate, "dd/MM/yyyy", null);
            objCVarVehicleTracking.IsEuroOneCertificate = vehicleDetails.pIsEuroOneCertificate;
            objCVarVehicleTracking.EuroOneCertificateDate = DateTime.ParseExact(vehicleDetails.pEuroOneCertificateDate, "dd/MM/yyyy", null);
            objCVarVehicleTracking.IsPowerOfAttorneys = vehicleDetails.pIsPowerOfAttorneys;
            objCVarVehicleTracking.PowerOfAttorneysDate = DateTime.ParseExact(vehicleDetails.pPowerOfAttorneysDate, "dd/MM/yyyy", null);
            objCVarVehicleTracking.IsGPSDoc = vehicleDetails.pIsGPSDoc;
            objCVarVehicleTracking.GPSDocDate = DateTime.ParseExact(vehicleDetails.pGPSDocDate, "dd/MM/yyyy", null);
            objCVarVehicleTracking.IsTrafficDoc = vehicleDetails.pIsTrafficDoc;
            objCVarVehicleTracking.TrafficDocDate = DateTime.ParseExact(vehicleDetails.pTrafficDocDate, "dd/MM/yyyy", null);
            objCVarVehicleTracking.IsSADDoc = vehicleDetails.pIsSADDoc;
            objCVarVehicleTracking.SADDocDate = DateTime.ParseExact(vehicleDetails.pSADDocDate, "dd/MM/yyyy", null);
            objCVarVehicleTracking.IsDHL = vehicleDetails.pIsDHL;
            objCVarVehicleTracking.DHLDate = DateTime.ParseExact(vehicleDetails.pDHLDate, "dd/MM/yyyy", null);
            objCVarVehicleTracking.IsVehicleLicense = vehicleDetails.pIsVehicleLicense;
            objCVarVehicleTracking.VehicleLicenseDate = DateTime.ParseExact(vehicleDetails.pVehicleLicenseDate, "dd/MM/yyyy", null);

            objCVarVehicleTracking.IsArriveAirport = vehicleDetails.pIsArriveAirport;
            objCVarVehicleTracking.ArriveAirportDate = DateTime.ParseExact(vehicleDetails.pArriveAirportDate, "dd/MM/yyyy", null);
            objCVarVehicleTracking.IsArriveGhandour = vehicleDetails.pIsArriveGhandour;
            objCVarVehicleTracking.ArriveGhandourDate = DateTime.ParseExact(vehicleDetails.pArriveGhandourDate, "dd/MM/yyyy", null);
            objCVarVehicleTracking.IsPhotos = vehicleDetails.pIsPhotos;
            objCVarVehicleTracking.PhotosDate = DateTime.ParseExact(vehicleDetails.pPhotosDate, "dd/MM/yyyy", null);

            objCVarVehicleTracking.DownPayment = vehicleDetails.pVehicleDownPayment;
            objCVarVehicleTracking.ApexInvoice = vehicleDetails.pVehicleApexInvoice;

            objCVarVehicleTracking.VehicleEmail = vehicleDetails.pVehicleEmail;
            objCVarVehicleTracking.VehiclePassword = vehicleDetails.pVehiclePassword;
            objCVarVehicleTracking.VehiclePasswordTesla = vehicleDetails.pVehiclePasswordTesla;
            objCVarVehicleTracking.VehicleNotes = vehicleDetails.pVehicleUserNotes;


            CVehicleTracking objCVehicleTracking = new CVehicleTracking();
            objCVehicleTracking.lstCVarVehicleTracking.Add(objCVarVehicleTracking);
            Exception checkException = objCVehicleTracking.SaveMethod(objCVehicleTracking.lstCVarVehicleTracking);
            string OperationCodes = "";
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else {
                _result = true;
               
                if (objCDefaults.lstCVarDefaults[0].UnEditableCompanyName == "EVL")
                {
                    Cvw_VehicleTracking objCVehicleTrackings = new Cvw_VehicleTracking();
                    objCVehicleTrackings.GetList("Where ChassisNo = '" + vehicleDetails.pVehicleChassisNo + "'");

                    objCVehicleTrackings.lstCVarvw_VehicleTracking.ForEach(VehicleTracking =>
                    {
                        CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
                        if(vehicleDetails.pOperationID != VehicleTracking.OperationID)
                        {
                            var operationCode = objCCustomizedDBCall.ExecuteQuery_ListOfObjects("Select Code from Operations Where ID = " + VehicleTracking.OperationID, typeof(CVarOperations)).Cast<CVarOperations>().ToList();
                            OperationCodes += " - " + operationCode[0].Code;
                        }
                       
                    });
                }
               
            }

              
            return new object[]
            {
                _result
                ,OperationCodes
            };

        }
        #endregion OperationVehicle

        #region VehicleAction
        [HttpPost, HttpGet]
        public Object[] VehicleAction_LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned(bool pIsLoadArrayOfObjects, string pLanguage, Int32 pPageNumber, Int32 pPageSize, string pWhereClauseForVehicleAction, string pOrderBy)
        {
            int _RowCount = 0;
            CvwVehicleAction objCvwVehicleAction = new CvwVehicleAction();
            CvwWH_Warehouse objCvwWH_Warehouse = new CvwWH_Warehouse();
            CTruckers objCTruckers = new CTruckers();
            CNoAccessVehicleAction objCNoAccessVehicleAction = new CNoAccessVehicleAction();

            objCTruckers.GetListPaging(999999, 1, "WHERE 1=1", "Name", out _RowCount);
            objCvwWH_Warehouse.GetListPaging(999999, 1, "WHERE 1=1", "Code", out _RowCount);
            objCNoAccessVehicleAction.GetListPaging(999999, 1, "WHERE IsOperationAction=1 OR  IsWarehouseAction=1", "ID", out _RowCount);
            objCvwVehicleAction.GetListPaging(pPageSize, pPageNumber, pWhereClauseForVehicleAction, pOrderBy, out _RowCount);

            return new Object[] {
                new JavaScriptSerializer().Serialize(objCvwVehicleAction.lstCVarvwVehicleAction)
                , _RowCount
                , new JavaScriptSerializer().Serialize(objCvwWH_Warehouse.lstCVarvwWH_Warehouse) //pData[2]
                , new JavaScriptSerializer().Serialize(objCTruckers.lstCVarTruckers) //pData[3]
                , new JavaScriptSerializer().Serialize(objCNoAccessVehicleAction.lstCVarNoAccessVehicleAction) //pData[4]
            };
        }

        [HttpPost, HttpGet]
        public object[] VehicleAction_Save([FromBody] SaveVehicleActionParameters saveVehicleActionParameters)
        {
            string _MessageReturned = "";
            Exception checkException = null;
            int _RowCount = 0;
            //var constVehicleActionInspection = 10;
            var constVehicleActionSendToWarehouse = 20;
            //var constVehicleActionChangeLocation = 30;
            var constVehicleActionChangeWarehouse = 40;
            var constVehicleActionPickup = 50;

            var constReceiveStatusInProgress = 10;
            //var constReceiveStatusPutaway = 20;
            //var constReceiveStatusFinalized = 30;

            var constReceiveDetailsStatusPending = 10;
            //var constReceiveDetailsStatusHeld = 20;
            //var constReceiveDetailsStatusDamaged = 30;
            //var constReceiveDetailsStatusPutaway = 40;

            CvwOperations objCvwOperations = new CvwOperations();
            CVehicleAction objCVehicleAction = new CVehicleAction();
            CvwWH_Receive objCvwWH_Receive = new CvwWH_Receive();
            CvwWH_Pickup objCvwWH_Pickup = new CvwWH_Pickup();
            Int64 _ReceiveID = 0;
            Int64 _PickupID = 0;
            //string _Subject = "";
            //string _Body = "";
            checkException = objCvwOperations.GetListPaging(999999, 1, "WHERE ID=" + saveVehicleActionParameters.pOperationID, "ID", out _RowCount);
            var _ArrVehicleIDs = saveVehicleActionParameters.pOperationVehicleIDsList.Split(',');
            int _NumberOfVehicles = _ArrVehicleIDs.Length;

            #region Check vehicles are not added to pickup in case of Pickup
            CvwWH_PickupDetailsLocation objCvwWH_PickupDetailsLocation_Check = new CvwWH_PickupDetailsLocation();
            checkException = objCvwWH_PickupDetailsLocation_Check.GetListPaging(999999, 1, "WHERE ReceiveDetailsID IN (SELECT ID from WH_ReceiveDetails WHERE OperationVehicleID IN (152,161))", "ID", out _RowCount);
            if (objCvwWH_PickupDetailsLocation_Check.lstCVarvwWH_PickupDetailsLocation.Count > 0)
                _MessageReturned = "One or more vehicles are already added to pickup " + objCvwWH_PickupDetailsLocation_Check.lstCVarvwWH_PickupDetailsLocation[0].Code;
            #endregion Check vehicles are not added to pickup in case of Pickup
            #region Valid Action
            if (_MessageReturned == "")
            {
                #region Save VehicleAction
                for (int i = 0; i < _NumberOfVehicles; i++)
                {
                    CVarVehicleAction objCVarVehicleAction = new CVarVehicleAction();
                    Int64 _OperationVehicleID = Int64.Parse(_ArrVehicleIDs[i]);
                    objCVarVehicleAction.OperationVehicleID = _OperationVehicleID;
                    objCVarVehicleAction.ReceiveDetailsID = 0;
                    objCVarVehicleAction.VehicleActionID = saveVehicleActionParameters.pVehicleActionID;
                    objCVarVehicleAction.ActionDate = DateTime.ParseExact(saveVehicleActionParameters.pActionDate + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture);
                    objCVarVehicleAction.InspectionNotes = saveVehicleActionParameters.pInspectionNotes;
                    objCVarVehicleAction.RowLocationID = saveVehicleActionParameters.pRowLocationID;
                    objCVarVehicleAction.CreatorUserID = objCVarVehicleAction.ModificatorUserID = WebSecurity.CurrentUserId;
                    objCVarVehicleAction.CreationDate = objCVarVehicleAction.ModificationDate = DateTime.Now;
                    objCVehicleAction.lstCVarVehicleAction.Add(objCVarVehicleAction);
                }
                checkException = objCVehicleAction.SaveMethod(objCVehicleAction.lstCVarVehicleAction);
                #endregion Save VehicleAction
                #region SendToWarehouse
                if (saveVehicleActionParameters.pVehicleActionID == constVehicleActionSendToWarehouse
                    || saveVehicleActionParameters.pVehicleActionID == constVehicleActionChangeWarehouse)
                {
                    //#region Send alarm to Trucking to enter number of TruckingOrders
                    ////if (saveVehicleActionParameters.pVehicleActionID == constVehicleActionSendToWarehouse)
                    ////{
                    ////    _Subject = "Trucking needed for Oper." + objCvwOperations.lstCVarvwOperations[0].Code;
                    ////    _Body = "Oper/Job No : " + objCvwOperations.lstCVarvwOperations[0].Code + "\n";
                    ////    _Body += "Client " + objCvwOperations.lstCVarvwOperations[0].ClientName + "\n";
                    ////    _Body += "B/L " + objCvwOperations.lstCVarvwOperations[0].MasterBL + "\n";
                    ////    _Body += "Service " + objCvwOperations.lstCVarvwOperations[0].MoveTypeName + "\n";
                    ////}
                    //#endregion Send alarm to Trucking to enter number of TruckingOrders
                    //#region Save ReceiveHeader
                    //CWH_Receive objCWH_Receive = new CWH_Receive();
                    //CVarWH_Receive objCVarWH_Receive = new CVarWH_Receive();
                    //objCVarWH_Receive.Code = "0";
                    //objCVarWH_Receive.WarehouseID = saveVehicleActionParameters.pWarehouseID;
                    //objCVarWH_Receive.CustomerID = objCvwOperations.lstCVarvwOperations[0].ClientID;
                    //objCVarWH_Receive.ReceiveDate = DateTime.ParseExact(saveVehicleActionParameters.pActionDate + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture);
                    //objCVarWH_Receive.ETD = objCVarWH_Receive.ReceiveDate; //DateTime.ParseExact(pETD + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture);
                    //objCVarWH_Receive.ETA = objCVarWH_Receive.ReceiveDate; //DateTime.ParseExact(pETA + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture);
                    //objCVarWH_Receive.ArrivalDate = objCVarWH_Receive.ReceiveDate; //DateTime.ParseExact(pArrivalDate + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture);
                    //objCVarWH_Receive.StatusID = constReceiveStatusInProgress;
                    //objCVarWH_Receive.IsFinalized = false;
                    //objCVarWH_Receive.FinalizeDate = DateTime.ParseExact("01/01/1900" + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture);
                    //objCVarWH_Receive.Notes = "0";
                    //objCVarWH_Receive.InvoiceID = 0;
                    //objCVarWH_Receive.OperationID = saveVehicleActionParameters.pOperationID;
                    //objCVarWH_Receive.CreatorUserID = objCVarWH_Receive.ModificatorUserID = WebSecurity.CurrentUserId;
                    //objCVarWH_Receive.CreationDate = objCVarWH_Receive.ModificationDate = DateTime.Now;
                    //objCWH_Receive.lstCVarWH_Receive.Add(objCVarWH_Receive);
                    //checkException = objCWH_Receive.SaveMethod(objCWH_Receive.lstCVarWH_Receive);
                    //_ReceiveID = objCVarWH_Receive.ID;
                    //#endregion Save ReceiveHeader
                    //#region Save ReceiveDetails
                    //{
                    //    CWH_ReceiveDetails objCWH_ReceiveDetails = new CWH_ReceiveDetails();
                    //    #region SendToWarehouse ReceiveDetails
                    //    if (saveVehicleActionParameters.pVehicleActionID == constVehicleActionSendToWarehouse)
                    //    {
                    //        for (int i = 0; i < _NumberOfVehicles; i++)
                    //        {
                    //            COperationVehicle objCOperationVehicle = new COperationVehicle();
                    //            checkException = objCOperationVehicle.GetListPaging(999999, 1, "WHERE ID=" + _ArrVehicleIDs[i], "ID", out _RowCount);
                    //            CVarWH_ReceiveDetails objCVarWH_ReceiveDetails = new CVarWH_ReceiveDetails();
                    //            objCVarWH_ReceiveDetails.ReceiveID = objCVarWH_Receive.ID;
                    //            objCVarWH_ReceiveDetails.BarCode = "0";
                    //            objCVarWH_ReceiveDetails.PurchaseItemID = objCOperationVehicle.lstCVarOperationVehicle[0].PurchaseItemID;
                    //            objCVarWH_ReceiveDetails.Quantity = 1;
                    //            objCVarWH_ReceiveDetails.ExpectedQuantity = 1;
                    //            objCVarWH_ReceiveDetails.SplitQuantity = 0;
                    //            objCVarWH_ReceiveDetails.LocationID = 0;
                    //            objCVarWH_ReceiveDetails.PalletID = "0";
                    //            objCVarWH_ReceiveDetails.ReceiveDate = DateTime.ParseExact(saveVehicleActionParameters.pActionDate + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture);
                    //            objCVarWH_ReceiveDetails.StatusID = constReceiveDetailsStatusPending;
                    //            objCVarWH_ReceiveDetails.ExpireDate = DateTime.ParseExact("01/01/1900" + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture);
                    //            objCVarWH_ReceiveDetails.LotNo = objCOperationVehicle.lstCVarOperationVehicle[0].LotNumber;
                    //            objCVarWH_ReceiveDetails.IsExcluded = false;
                    //            objCVarWH_ReceiveDetails.OperationVehicleID = Int64.Parse(_ArrVehicleIDs[i]);

                    //            objCVarWH_ReceiveDetails.IsPickupAddedToInvoice = false;
                    //            objCVarWH_ReceiveDetails.PickupWithoutInvoiceDate = DateTime.Parse("01/01/1900");;
                    //            objCVarWH_ReceiveDetails.Notes = "0";

                    //            objCVarWH_ReceiveDetails.CreatorUserID = WebSecurity.CurrentUserId;
                    //            objCVarWH_ReceiveDetails.CreationDate = DateTime.Now;

                    //            objCVarWH_ReceiveDetails.ModificatorUserID = WebSecurity.CurrentUserId;
                    //            objCVarWH_ReceiveDetails.ModificationDate = DateTime.Now;
                    //            objCWH_ReceiveDetails.lstCVarWH_ReceiveDetails.Add(objCVarWH_ReceiveDetails);
                    //        } //for (int i = 0; i < _NumberOfVehicles; i++)
                    //        checkException = objCWH_ReceiveDetails.SaveMethod(objCWH_ReceiveDetails.lstCVarWH_ReceiveDetails);
                    //    } //if (saveVehicleActionParameters.pVehicleActionID == constVehicleActionSendToWarehouse)
                    //    #endregion SendToWarehouse ReceiveDetails
                    //    #region ChangeWarehouse ReceiveDetails
                    //    else if (saveVehicleActionParameters.pVehicleActionID == constVehicleActionChangeWarehouse)
                    //    {
                    //        objCWH_ReceiveDetails.UpdateList("ReceiveID=" + objCVarWH_Receive.ID
                    //            + ",ModificationDate=GETDATE()"
                    //            + ",ModificatorUserID=" + WebSecurity.CurrentUserId
                    //            + " WHERE OperationVehicleID IN (" + saveVehicleActionParameters.pOperationVehicleIDsList + ")");
                    //    } //else if (saveVehicleActionParameters.pVehicleActionID == constVehicleActionSendToWarehouse)
                    //    #endregion ChangeWarehouse ReceiveDetails
                    //    COperationVehicle objCOperationVehicle_temp = new COperationVehicle();
                    //    checkException = objCOperationVehicle_temp.UpdateList("IsSentToWarehouse=1 WHERE ID IN(" + saveVehicleActionParameters.pOperationVehicleIDsList + ")");
                    //}
                    //#endregion Save ReceiveDetails
                    COperationVehicle objCOperationVehicle_temp = new COperationVehicle();
                    checkException = objCOperationVehicle_temp.UpdateList("IsSentToWarehouse=1 WHERE ID IN(" + saveVehicleActionParameters.pOperationVehicleIDsList + ")");
                }
                #endregion SendToWarehouse
                #region Pickup
                else if (saveVehicleActionParameters.pVehicleActionID == constVehicleActionPickup)
                {
                    #region  Save PickupHeader
                    {
                        CWH_Pickup objCWH_Pickup = new CWH_Pickup();
                        CVarWH_Pickup objCVarWH_Pickup = new CVarWH_Pickup();
                        objCVarWH_Pickup.Code = "0";
                        objCVarWH_Pickup.WarehouseID = saveVehicleActionParameters.pWarehouseID;
                        objCVarWH_Pickup.CustomerID = objCvwOperations.lstCVarvwOperations[0].ClientID;
                        objCVarWH_Pickup.BillTo = objCvwOperations.lstCVarvwOperations[0].ClientID;
                        objCVarWH_Pickup.EndUserID = 0;
                        objCVarWH_Pickup.OrderDate = DateTime.Now; //DateTime.ParseExact(pOrderDate + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture);
                        objCVarWH_Pickup.RequiredDate = DateTime.Now; //DateTime.ParseExact(pRequiredDate + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture);
                        objCVarWH_Pickup.IsFinalized = false; //pIsFinalized;
                        objCVarWH_Pickup.FinalizeDate = DateTime.ParseExact("01/01/1900" + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture);
                        objCVarWH_Pickup.Notes = "0";
                        objCVarWH_Pickup.InvoiceID = 0;
                        objCVarWH_Pickup.OperationID = saveVehicleActionParameters.pOperationID;
                        objCVarWH_Pickup.RMANumber = "0";
                        objCVarWH_Pickup.PersonInChargeID = 0;
                        objCVarWH_Pickup.EquipmentID = 0;
                        objCVarWH_Pickup.DriverName = "0";

                        objCVarWH_Pickup.CreatorUserID = objCVarWH_Pickup.ModificatorUserID = WebSecurity.CurrentUserId;
                        objCVarWH_Pickup.CreationDate = objCVarWH_Pickup.ModificationDate = DateTime.Now;
                        objCWH_Pickup.lstCVarWH_Pickup.Add(objCVarWH_Pickup);
                        checkException = objCWH_Pickup.SaveMethod(objCWH_Pickup.lstCVarWH_Pickup);
                        _PickupID = objCVarWH_Pickup.ID;
                    }
                    #endregion Save PickupHeader
                    #region Save PickupDetails
                    for (int i = 0; i < _NumberOfVehicles; i++)
                    {
                        CWH_PickupDetails objCWH_PickupDetails = new CWH_PickupDetails();
                        COperationVehicle objCOperationVehicle = new COperationVehicle();
                        checkException = objCOperationVehicle.GetListPaging(999999, 1, "WHERE ID=" + _ArrVehicleIDs[i], "ID", out _RowCount);
                        CVarWH_PickupDetails objCVarWH_PickupDetails = new CVarWH_PickupDetails();
                        objCVarWH_PickupDetails.ID = 0;
                        objCVarWH_PickupDetails.PickupID = _PickupID;
                        objCVarWH_PickupDetails.PurchaseItemID = objCOperationVehicle.lstCVarOperationVehicle[0].PurchaseItemID;
                        objCVarWH_PickupDetails.DemandedQuantity = 1;
                        objCVarWH_PickupDetails.Notes = "0";
                        objCVarWH_PickupDetails.CreatorUserID = WebSecurity.CurrentUserId;
                        objCVarWH_PickupDetails.CreationDate = DateTime.Now;
                        objCVarWH_PickupDetails.ModificatorUserID = WebSecurity.CurrentUserId;
                        objCVarWH_PickupDetails.ModificationDate = DateTime.Now;

                        objCWH_PickupDetails.lstCVarWH_PickupDetails.Add(objCVarWH_PickupDetails);
                        checkException = objCWH_PickupDetails.SaveMethod(objCWH_PickupDetails.lstCVarWH_PickupDetails);
                        if (checkException == null)
                        {
                            Int64 _PickupDetailsID = objCVarWH_PickupDetails.ID;
                            #region Save PickupDetailsLocations
                            CWH_ReceiveDetails objCWH_ReceiveDetails = new CWH_ReceiveDetails();
                            checkException = objCWH_ReceiveDetails.GetListPaging(999999, 1, "WHERE OperationVehicleID=" + objCOperationVehicle.lstCVarOperationVehicle[0].ID, "ID", out _RowCount);
                            {
                                CWH_PickupDetailsLocation objCWH_PickupDetailsLocation = new CWH_PickupDetailsLocation();
                                CVarWH_PickupDetailsLocation objCVarWH_PickupDetailsLocation = new CVarWH_PickupDetailsLocation();
                                //TODO: Check its not picked
                                objCVarWH_PickupDetailsLocation.ID = 0;
                                objCVarWH_PickupDetailsLocation.CreatorUserID = WebSecurity.CurrentUserId;
                                objCVarWH_PickupDetailsLocation.CreationDate = objCVarWH_PickupDetailsLocation.ModificationDate = DateTime.Now;
                                objCVarWH_PickupDetailsLocation.PickedQuantity = 1;
                                objCVarWH_PickupDetailsLocation.PickupDetailsID = objCVarWH_PickupDetails.ID;
                                objCVarWH_PickupDetailsLocation.ReceiveDetailsID = objCWH_ReceiveDetails.lstCVarWH_ReceiveDetails[0].ID;
                                objCVarWH_PickupDetailsLocation.Notes = "0";
                                objCVarWH_PickupDetailsLocation.ModificatorUserID = WebSecurity.CurrentUserId;
                                objCVarWH_PickupDetailsLocation.ModificationDate = DateTime.Now;

                                objCWH_PickupDetailsLocation.lstCVarWH_PickupDetailsLocation.Add(objCVarWH_PickupDetailsLocation);
                                checkException = objCWH_PickupDetailsLocation.SaveMethod(objCWH_PickupDetailsLocation.lstCVarWH_PickupDetailsLocation);
                            } //for (int i=0;i<_ReceiveDetailsIDLength; i++) {
                            #endregion Save PickupDetailsLocations
                        }
                    } //for (int i = 0; i < _NumberOfVehicles; i++)
                    #endregion Save PickupDetails
                }
                #endregion Pickup
            }
            #endregion Valid Action
            checkException = objCvwWH_Receive.GetListPaging(999999, 1, "WHERE ID=" + _ReceiveID, "ID", out _RowCount);
            checkException = objCvwWH_Pickup.GetListPaging(999999, 1, "WHERE ID=" + _PickupID, "ID", out _RowCount);
            return new object[]
            {
                _MessageReturned
                , _ReceiveID == 0 ? null : new JavaScriptSerializer().Serialize(objCvwWH_Receive.lstCVarvwWH_Receive[0]) //pData[1]
                , _PickupID == 0 ? null : new JavaScriptSerializer().Serialize(objCvwWH_Pickup.lstCVarvwWH_Pickup[0]) //pData[2]
            };
        }

        [HttpPost, HttpGet]
        public object[] FillInspectionModal(string pWhereClauseNoAccessVehicleAction)
        {
            string _MessageReturned = "";
            Exception checkException = null;
            int _RowCount = 0;

            CNoAccessVehicleAction objCNoAccessVehicleAction = new CNoAccessVehicleAction();
            CvwWH_Warehouse objCvwWH_Warehouse = new CvwWH_Warehouse();

            checkException = objCNoAccessVehicleAction.GetListPaging(999999, 1, pWhereClauseNoAccessVehicleAction, "ID", out _RowCount);
            checkException = objCvwWH_Warehouse.GetListPaging(999999, 1, "WHERE 1=1", "Code", out _RowCount);

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[]
            {
                _MessageReturned
                , serializer.Serialize(objCNoAccessVehicleAction.lstCVarNoAccessVehicleAction) //pData[1]
                , serializer.Serialize(objCvwWH_Warehouse.lstCVarvwWH_Warehouse) //pData[2]
            };
        }

        [HttpPost, HttpGet]
        public object[] VehicleAction_Delete(string pVehicleActionIDsToDelete)
        {
            string _MessageReturned = "";
            Exception checkException = null;
            CVehicleAction objCVehicleAction = new CVehicleAction();
            checkException = objCVehicleAction.DeleteList("WHERE ID IN(" + pVehicleActionIDsToDelete + ")");
            if (checkException != null)
                _MessageReturned = checkException.Message;
            return new object[]
            {
                _MessageReturned
            };
        }
        #endregion VehicleAction

        #region VehicleActionDetails
        [HttpPost, HttpGet]
        public object[] VehicleActionDetails_Save([FromBody] SaveVehicleActionDetailsParameters saveVehicleActionDetailsParameters)
        {
            //var constVehicleActionInspection = 10;
            var constVehicleActionSendToWarehouse = 20;
            //var constVehicleActionChangeLocation = 30;
            //var constVehicleActionChangeWarehouse = 40;
            var constVehicleActionReceive = 45;
            var constVehicleActionPickup = 50;
            var constVehicleActionReturn = 60;

            //var constReceiveStatusInProgress = 10;
            //var constReceiveStatusPutaway = 20;
            var constReceiveStatusFinalized = 30;

            var constReceiveDetailsStatusPending = 10;
            //var constReceiveDetailsStatusHeld = 20;
            //var constReceiveDetailsStatusDamaged = 30;
            //var constReceiveDetailsStatusPutaway = 40;

            var constContractDetailsTypeNONE = 10;
            var constContractDetailsTypeIN = 20;
            var constContractDetailsTypeOUT = 30;
            var constContractDetailsTypeINAndOUT = 40;

            string _MessageReturned = "";
            Exception checkException = null;
            CVehicleAction objCVehicleAction = new CVehicleAction();
            CWH_Pickup objCWH_Pickup = new CWH_Pickup();
            CWH_PickupDetails objCWH_PickupDetails = new CWH_PickupDetails();
            CWH_Receive objCWH_Receive = new CWH_Receive();
            CWH_ReceiveDetails objCWH_ReceiveDetails = new CWH_ReceiveDetails();
            CDefaults objCDefaults = new CDefaults();
            int _RowCount = 0;
            CInvoiceTypes objCInvoiceTypes = new CInvoiceTypes();
            checkException = objCInvoiceTypes.GetListPaging(999999, 1, "WHERE Code LIKE N'INV%'", "ID", out _RowCount);
            objCDefaults.GetListPaging(999999, 1, "WHERE 1=1", "ID", out _RowCount);
            Int64 _CodeSerial = 0;
            var _ArrVehicleIDs = saveVehicleActionDetailsParameters.pOperationVehicleIDList.Split(',');
            var _ArrInspectionNotes = saveVehicleActionDetailsParameters.pInspectionNotesList.Split(',');
            var _ArrFromWarehouseID = saveVehicleActionDetailsParameters.pFromWarehouseIDList.Split(',');
            var _ArrToWarehouseID = saveVehicleActionDetailsParameters.pToWarehouseIDList.Split(',');
            var _ArrLine = saveVehicleActionDetailsParameters.pLineList.Split(',');
            var _ArrCodeSerial = saveVehicleActionDetailsParameters.pCodeSerialList.Split(',');
            var _ArrIsCancelled = saveVehicleActionDetailsParameters.pIsCancelledList.Split(',');
            var _ArrReceiveDetailsID = saveVehicleActionDetailsParameters.pReceiveDetailsIDList.Split(',');
            int _NumberOfVehicles = _ArrVehicleIDs.Length;
            #region Save VehicleAction
            //Save first item to get CodeSerial
            {
                CVarVehicleAction objCVarVehicleAction = new CVarVehicleAction();
                objCVarVehicleAction.OperationVehicleID = Int64.Parse(_ArrVehicleIDs[0]);
                objCVarVehicleAction.ReceiveDetailsID = 0;
                objCVarVehicleAction.VehicleActionID = saveVehicleActionDetailsParameters.pVehicleActionID;
                objCVarVehicleAction.TruckerID = saveVehicleActionDetailsParameters.pTruckerID;
                //objCVarVehicleAction.ActionDate = DateTime.ParseExact(saveVehicleActionDetailsParameters.pActionDate + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture);
                objCVarVehicleAction.ActionDate = DateTime.Now;
                objCVarVehicleAction.InspectionNotes = _ArrInspectionNotes[0];
                objCVarVehicleAction.FromWarehouseID = int.Parse(_ArrFromWarehouseID[0]);
                objCVarVehicleAction.ToWarehouseID = int.Parse(_ArrToWarehouseID[0]);
                objCVarVehicleAction.Line = int.Parse(_ArrLine[0]);
                objCVarVehicleAction.CodeSerial = int.Parse(_ArrCodeSerial[0]);
                objCVarVehicleAction.IsCancelled = _ArrIsCancelled[0] == "1" ? true : false;
                objCVarVehicleAction.RowLocationID = 0;
                objCVarVehicleAction.CreatorUserID = objCVarVehicleAction.ModificatorUserID = WebSecurity.CurrentUserId;
                objCVarVehicleAction.CreationDate = objCVarVehicleAction.ModificationDate = DateTime.Now;

                CVehicleAction objCVehicleAction_Temp = new CVehicleAction();
                objCVehicleAction_Temp.lstCVarVehicleAction.Add(objCVarVehicleAction);
                checkException = objCVehicleAction_Temp.SaveMethod(objCVehicleAction_Temp.lstCVarVehicleAction);
                checkException = objCVehicleAction_Temp.GetListPaging(999999, 1, "WHERE ID=" + objCVarVehicleAction.ID, "ID", out _RowCount);

                _CodeSerial = objCVehicleAction_Temp.lstCVarVehicleAction[0].CodeSerial;
            }
            for (int i = 1; i < _NumberOfVehicles; i++)
            {
                CVarVehicleAction objCVarVehicleAction = new CVarVehicleAction();
                objCVarVehicleAction.OperationVehicleID = Int64.Parse(_ArrVehicleIDs[i]);
                objCVarVehicleAction.ReceiveDetailsID = 0;
                objCVarVehicleAction.VehicleActionID = saveVehicleActionDetailsParameters.pVehicleActionID;
                objCVarVehicleAction.TruckerID = saveVehicleActionDetailsParameters.pTruckerID;
                //objCVarVehicleAction.ActionDate = DateTime.ParseExact(saveVehicleActionDetailsParameters.pActionDate + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture);
                objCVarVehicleAction.ActionDate = DateTime.Now;
                objCVarVehicleAction.InspectionNotes = _ArrInspectionNotes[i];
                objCVarVehicleAction.FromWarehouseID = int.Parse(_ArrFromWarehouseID[i]);
                objCVarVehicleAction.ToWarehouseID = int.Parse(_ArrToWarehouseID[i]);
                objCVarVehicleAction.Line = int.Parse(_ArrLine[i]);
                objCVarVehicleAction.CodeSerial = _CodeSerial;
                objCVarVehicleAction.IsCancelled = _ArrIsCancelled[i] == "1" ? true : false;
                objCVarVehicleAction.RowLocationID = 0;
                objCVarVehicleAction.CreatorUserID = objCVarVehicleAction.ModificatorUserID = WebSecurity.CurrentUserId;
                objCVarVehicleAction.CreationDate = objCVarVehicleAction.ModificationDate = DateTime.Now;

                objCVehicleAction.lstCVarVehicleAction.Add(objCVarVehicleAction);
            }
            checkException = objCVehicleAction.SaveMethod(objCVehicleAction.lstCVarVehicleAction);
            #endregion Save VehicleAction
            #region Send To Warehouse
            if (saveVehicleActionDetailsParameters.pVehicleActionID == constVehicleActionSendToWarehouse
                && objCDefaults.lstCVarDefaults[0].IsDepartmentOption && 1 == 2) //send alarm
            {
                CNoAccessDepartments objCDepartments = new CNoAccessDepartments();
                checkException = objCDepartments.GetListPaging(999999, 1, "WHERE Name=N'TRANSPORTATION'", "ID", out _RowCount);
                if (objCDepartments.lstCVarNoAccessDepartments.Count > 0)
                {
                    CUsers objCUsers = new CUsers();
                    checkException = objCUsers.GetListPaging(999999, 1, "WHERE IsNull(CustomerID , 0) = 0 AND DepartmentID=" + objCDepartments.lstCVarNoAccessDepartments[0].ID, "ID", out _RowCount);
                    if (objCUsers.lstCVarUsers.Count > 0)
                    {
                        CvwOperationVehicle objCvwOperationVehicle_temp = new CvwOperationVehicle();
                        //checkException = objCvwOperationVehicle_temp.GetListPaging(999999, 1, "WHERE ID=" + _ArrVehicleIDs[0], "ID", out _RowCount);
                        checkException = objCvwOperationVehicle_temp.GetList("WHERE ID=" + _ArrVehicleIDs[0]);
                        CWH_Warehouse objCWH_Warehouse = new CWH_Warehouse();
                        checkException = objCWH_Warehouse.GetListPaging(999999, 1, "WHERE ID IN (" + saveVehicleActionDetailsParameters.pWarehouseID + "," + _ArrToWarehouseID[0] + ")", "ID", out _RowCount);
                        string _WarehouseName = objCWH_Warehouse.lstCVarWH_Warehouse.Count > 0 ? objCWH_Warehouse.lstCVarWH_Warehouse[0].Name : "";
                        CVarEmail objCVarEmail = new CVarEmail();
                        CEmail objCEmail = new CEmail();
                        string _Subject = "Sending To Warehouse";
                        string _Body = _NumberOfVehicles + " Vehicles are sent" + (_WarehouseName == "" ? "" : " to warehouse " + _WarehouseName) + "." + "<br>";
                        _Body += "DispatchNumber: " + objCvwOperationVehicle_temp.lstCVarvwOperationVehicle[0].DispatchNumber + "<br>";
                        _Body += "Operation: " + objCvwOperationVehicle_temp.lstCVarvwOperationVehicle[0].OperationID + "<br>";
                        _Body += "Customer: " + objCvwOperationVehicle_temp.lstCVarvwOperationVehicle[0].CustomerName + "<br>";
                        objCVarEmail.Subject = _Subject;
                        objCVarEmail.Body = _Body;
                        objCVarEmail.QuotationRouteID = 0;
                        objCVarEmail.PricingID = 0;
                        objCVarEmail.RequestOrReply = 0;
                        objCVarEmail.OperationID = objCvwOperationVehicle_temp.lstCVarvwOperationVehicle[0].OperationID;
                        objCVarEmail.SenderUserID = WebSecurity.CurrentUserId;
                        objCVarEmail.SendingDate = DateTime.Now;
                        objCVarEmail.ParentEmailID = 0;
                        objCVarEmail.EmailSource = 0;
                        objCEmail.lstCVarEmail.Add(objCVarEmail);
                        checkException = objCEmail.SaveMethod(objCEmail.lstCVarEmail);
                        if (checkException == null) //send to each EmailReceiver
                        {
                            CEmailReceiver objCEmailReceiver = new CEmailReceiver();
                            for (int i = 0; i < objCUsers.lstCVarUsers.Count; i++)
                            {
                                CVarEmailReceiver objCVarEmailReceiver = new CVarEmailReceiver();
                                objCVarEmailReceiver.EmailID = objCVarEmail.ID;
                                objCVarEmailReceiver.ReceiverUserID = objCUsers.lstCVarUsers[i].ID;
                                objCVarEmailReceiver.ReceivingDate = DateTime.Parse("01-01-1900");
                                objCVarEmailReceiver.IsAlarm = true;

                                objCEmailReceiver.lstCVarEmailReceiver.Add(objCVarEmailReceiver);
                            }
                            checkException = objCEmailReceiver.SaveMethod(objCEmailReceiver.lstCVarEmailReceiver);
                        }
                    } //if (objCUsers.lstCVarUsers.Count > 0)
                } //if (objCDepartments.lstCVarNoAccessDepartments.Count > 0)
            } //if (objCDefaults.lstCVarDefaults[0].IsDepartmentOption)
            #endregion Send To Warehouse
            #region Pickup
            if (saveVehicleActionDetailsParameters.pVehicleActionID == constVehicleActionPickup)
            {
                CvwWH_ReceiveDetails objCvwWH_ReceiveDetails = new CvwWH_ReceiveDetails();
                checkException = objCvwWH_ReceiveDetails.GetListPaging(999999, 1, "WHERE ID IN (" + saveVehicleActionDetailsParameters.pReceiveDetailsIDList + ")", "ID", out _RowCount);
                CVarWH_Pickup objCVarWH_Pickup = new CVarWH_Pickup();
                #region Insert Pickup Header
                {
                    objCVarWH_Pickup.Code = "0";
                    objCVarWH_Pickup.WarehouseID = objCvwWH_ReceiveDetails.lstCVarvwWH_ReceiveDetails[0].WarehouseID;
                    objCVarWH_Pickup.CustomerID = objCvwWH_ReceiveDetails.lstCVarvwWH_ReceiveDetails[0].CustomerID;
                    objCVarWH_Pickup.BillTo = objCvwWH_ReceiveDetails.lstCVarvwWH_ReceiveDetails[0].CustomerID;
                    objCVarWH_Pickup.EndUserID = 0;
                    objCVarWH_Pickup.OrderDate = DateTime.Now; //DateTime.ParseExact(pOrderDate + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture);
                    objCVarWH_Pickup.RequiredDate = DateTime.Now; //DateTime.ParseExact(pRequiredDate + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture);
                    objCVarWH_Pickup.IsFinalized = true;//pIsFinalized;
                    objCVarWH_Pickup.FinalizeDate = DateTime.Now;//DateTime.ParseExact(pFinalizeDate + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture);
                    objCVarWH_Pickup.Notes = "Generated from vehicle action.";
                    objCVarWH_Pickup.InvoiceID = 0;
                    objCVarWH_Pickup.OperationID = objCvwWH_ReceiveDetails.lstCVarvwWH_ReceiveDetails[0].OperationID;
                    objCVarWH_Pickup.RMANumber = "0";
                    objCVarWH_Pickup.PersonInChargeID = 0;
                    objCVarWH_Pickup.PDIReceiveDetailsID = 0;
                    objCVarWH_Pickup.EquipmentID = 0;
                    objCVarWH_Pickup.DriverName = "0";

                    objCVarWH_Pickup.CreatorUserID = objCVarWH_Pickup.ModificatorUserID = WebSecurity.CurrentUserId;
                    objCVarWH_Pickup.CreationDate = objCVarWH_Pickup.ModificationDate = DateTime.Now;
                    objCWH_Pickup.lstCVarWH_Pickup.Add(objCVarWH_Pickup);
                    checkException = objCWH_Pickup.SaveMethod(objCWH_Pickup.lstCVarWH_Pickup);
                }
                #endregion Insert Pickup Header
                #region Insert Pickup Details
                for (int i = 0; i < _NumberOfVehicles; i++)
                {
                    CVarWH_PickupDetails objCVarWH_PickupDetails = new CVarWH_PickupDetails();
                    objCVarWH_PickupDetails.ID = 0;
                    objCVarWH_PickupDetails.PickupID = objCVarWH_Pickup.ID;
                    objCVarWH_PickupDetails.PurchaseItemID = objCvwWH_ReceiveDetails.lstCVarvwWH_ReceiveDetails[i].PurchaseItemID;
                    objCVarWH_PickupDetails.DemandedQuantity = 1;
                    objCVarWH_PickupDetails.Notes = "Generated from vehicle action.";
                    objCVarWH_PickupDetails.CreatorUserID = WebSecurity.CurrentUserId;
                    objCVarWH_PickupDetails.CreationDate = DateTime.Now;
                    objCVarWH_PickupDetails.ModificatorUserID = WebSecurity.CurrentUserId;
                    objCVarWH_PickupDetails.ModificationDate = DateTime.Now;

                    objCWH_PickupDetails.lstCVarWH_PickupDetails.Add(objCVarWH_PickupDetails);
                    checkException = objCWH_PickupDetails.SaveMethod(objCWH_PickupDetails.lstCVarWH_PickupDetails);
                    if (checkException == null)
                    {
                        Int64 pPickupDetailsID = objCVarWH_PickupDetails.ID;
                        #region Save PickupDetailsLocations
                        CVehicleAction objCVehicleAction_temp = new CVehicleAction();
                        checkException = objCVehicleAction_temp.GetListPaging(999999, 1, "WHERE ID=(SELECT MAX(ID) FROM VehicleAction WHERE OperationVehicleID=" + objCvwWH_ReceiveDetails.lstCVarvwWH_ReceiveDetails[i].OperationVehicleID + ")", "ID", out _RowCount);
                        CWH_PickupDetailsLocation objCWH_PickupDetailsLocation = new CWH_PickupDetailsLocation();
                        CVarWH_PickupDetailsLocation objCVarWH_PickupDetailsLocation = new CVarWH_PickupDetailsLocation();
                        objCVarWH_PickupDetailsLocation.ID = 0;
                        objCVarWH_PickupDetailsLocation.PickedQuantity = 1;
                        objCVarWH_PickupDetailsLocation.PickupDetailsID = pPickupDetailsID;
                        objCVarWH_PickupDetailsLocation.ReceiveDetailsID = objCvwWH_ReceiveDetails.lstCVarvwWH_ReceiveDetails[i].ID;
                        objCVarWH_PickupDetailsLocation.Notes = "Generated from vehicle action.";
                        objCVarWH_PickupDetailsLocation.VehicleActionID = objCVehicleAction_temp.lstCVarVehicleAction[0].ID;

                        objCVarWH_PickupDetailsLocation.CreatorUserID = WebSecurity.CurrentUserId;
                        objCVarWH_PickupDetailsLocation.CreationDate = objCVarWH_PickupDetailsLocation.ModificationDate = DateTime.Now;
                        objCVarWH_PickupDetailsLocation.ModificatorUserID = WebSecurity.CurrentUserId;
                        objCVarWH_PickupDetailsLocation.ModificationDate = DateTime.Now;

                        //CWH_PickupDetailsLocation objCWH_PickupDetailsLocation = new CWH_PickupDetailsLocation();
                        objCWH_PickupDetailsLocation.lstCVarWH_PickupDetailsLocation.Add(objCVarWH_PickupDetailsLocation);
                        checkException = objCWH_PickupDetailsLocation.SaveMethod(objCWH_PickupDetailsLocation.lstCVarWH_PickupDetailsLocation);
                        if (checkException != null)
                            _MessageReturned = checkException.Message;
                        #endregion Save PickupDetailsLocations
                        else //Set PickupDetailsLocationID in WH_VehicleAgingReport(in case of receive again, it is set to null again coz this means transfer)
                        {
                            #region WH_VehicleAgingReport
                            CvwWH_VehicleAgingReport objCvwWH_VehicleAgingReport = new CvwWH_VehicleAgingReport();
                            checkException = objCvwWH_VehicleAgingReport.GetListPaging(9, 1, "WHERE OperationVehicleID=" + objCvwWH_ReceiveDetails.lstCVarvwWH_ReceiveDetails[i].OperationVehicleID, "ReceiveDate DESC", out _RowCount);
                            if (objCvwWH_VehicleAgingReport.lstCVarvwWH_VehicleAgingReport.Count > 0
                                && objCVarWH_PickupDetailsLocation.ID != 0)
                            {
                                CWH_VehicleAgingReport objCWH_VehicleAgingReport_temp = new CWH_VehicleAgingReport();
                                objCWH_VehicleAgingReport_temp.UpdateList("PickupDetailsLocationID=" + objCVarWH_PickupDetailsLocation.ID + " WHERE ID=" + objCvwWH_VehicleAgingReport.lstCVarvwWH_VehicleAgingReport[0].ID);
                            }
                            #endregion WH_VehicleAgingReport
                        }
                        #region Set PickupWithoutInvoiceDate In WH_ReceiveDetails
                        string _UpdateClause = "";
                        CWH_ReceiveDetails objCWH_ReceiveDetails_temp = new CWH_ReceiveDetails();
                        _UpdateClause = "PickupWithoutInvoiceDate = GETDATE()" + " \n";
                        _UpdateClause += "WHERE ID = " + objCvwWH_ReceiveDetails.lstCVarvwWH_ReceiveDetails[i].ID;
                        checkException = objCWH_ReceiveDetails_temp.UpdateList(_UpdateClause);
                        #endregion Set PickupWithoutInvoiceDate In WH_ReceiveDetails
                    }
                } //for (int i = 0; i < _NumberOfVehicles; i++)
                #endregion Insert Pickup Details
                #region Finalize Pickup
                string _PickedLocationIDList = "0";
                string _ReleasedLocationIDList = "0";
                CWH_RowLocation objCWH_RowLocation = new CWH_RowLocation();
                CvwWH_Inventory objCvwWH_Inventory = new CvwWH_Inventory();
                CvwWH_PickupDetailsLocation objCvwWH_PickupDetailsLocation = new CvwWH_PickupDetailsLocation();
                checkException = objCvwWH_PickupDetailsLocation.GetListPaging(999999, 1, "WHERE PickupID=" + objCVarWH_Pickup.ID, "ID", out _RowCount);
                for (int i = 0; i < objCvwWH_PickupDetailsLocation.lstCVarvwWH_PickupDetailsLocation.Count; i++)
                    _PickedLocationIDList += "," + objCvwWH_PickupDetailsLocation.lstCVarvwWH_PickupDetailsLocation[i].LocationID;
                if (_PickedLocationIDList != "0")
                    checkException = objCvwWH_Inventory.GetListPaging(999999, 1, "WHERE AvailableQuantity=0 AND LocationID IN (" + _PickedLocationIDList + ")", "LocationID", out _RowCount);
                for (int i = 0; i < objCvwWH_Inventory.lstCVarvwWH_Inventory.Count; i++)
                    _ReleasedLocationIDList += "," + objCvwWH_Inventory.lstCVarvwWH_Inventory[i].LocationID;
                if (_ReleasedLocationIDList != "0")
                    checkException = objCWH_RowLocation.UpdateList("IsUsed=0 ,StatusID = 10 WHERE ID IN (" + _ReleasedLocationIDList + ")");
                #endregion Finalize Pickup
                #region VehicleCutOff Invoice for Pickup
                //{
                //    #region Get Applicable Vehicles
                //    var pApplicableVehicleList = objCvwWH_ReceiveDetails.lstCVarvwWH_ReceiveDetails
                //        .Where(w => (DateTime.Now.Date - w.PreviousCutOffDate.Date).Days > 0 && (DateTime.Now.Date - w.PreviousCutOffDate.Date).Days < 31).ToList();
                //    #endregion Get Applicable Vehicles
                //    #region Get Distinct OperationIDs
                //    var pOperationIDList = pApplicableVehicleList
                //        .Select(s => new
                //        {
                //            OperationID = s.OperationID
                //            ,
                //            CustomerID = s.CustomerID
                //            ,
                //            CustomerName = s.CustomerName
                //        })
                //        .Distinct()
                //        //.OrderBy(o => o.OperationID)
                //        .ToList();
                //    #endregion Get Distinct OperationIDs
                //    for (int j = 0; j < pOperationIDList.Count; j++)
                //    {
                //        #region Get Contract For Operation Customer
                //        int _CurrencyID = objCDefaults.lstCVarDefaults[0].CurrencyID;
                //        decimal _ExchangeRate = 0;
                //        CWH_Contract objCWH_Contract = new CWH_Contract();
                //        CWH_ContractDetails objCWH_ContractDetails = new CWH_ContractDetails();
                //        checkException = objCWH_Contract.GetListPaging(999999, 1, "WHERE (CAST(GETDATE() AS DATE) BETWEEN CAST(FromDate AS DATE) AND ToDate) AND CustomerID=" + pOperationIDList[j].CustomerID, "ID DESC", out _RowCount);
                //        if (objCWH_Contract.lstCVarWH_Contract.Count > 0)
                //        {
                //            _ExchangeRate = 0;
                //            CvwCurrencyDetails objCvwCurrencyDetails = new CvwCurrencyDetails();
                //            objCvwCurrencyDetails.GetList("WHERE ID=" + objCWH_Contract.lstCVarWH_Contract[0].CurrencyID
                //                    + " AND GETDATE() >= DateAdd(hh, 0, DateDiff(dd, 0, FromDate)) "
                //                    + " AND GETDATE() <= DateAdd(minute,59,DateAdd(hh, 23, DateDiff(dd, 0, ToDate))) "
                //                    );
                //            if (objCvwCurrencyDetails.lstCVarvwCurrencyDetails.Count > 0)
                //            {
                //                _CurrencyID = objCWH_Contract.lstCVarWH_Contract[0].CurrencyID;
                //                _ExchangeRate = objCvwCurrencyDetails.lstCVarvwCurrencyDetails[0].ExchangeRate;
                //            }
                //            else
                //                _ExchangeRate = 1;
                //            checkException = objCWH_ContractDetails.GetListPaging(999999, 1, "WHERE TypeID IN (" + constContractDetailsTypeNONE + ") AND ContractID=" + objCWH_Contract.lstCVarWH_Contract[0].ID, "ID", out _RowCount);
                //        } //if (objCWH_Contract.lstCVarWH_Contract.Count > 0)
                //        else
                //            objCWH_ContractDetails.lstCVarWH_ContractDetails.Clear();
                //        #endregion Get Contract For Operation Customer
                //        #region Create InvoiceHeader
                //        CvwOperationPartners objCvwOperationPartners = new CvwOperationPartners();
                //        checkException = objCvwOperationPartners.GetListPaging(999999, 1, "WHERE OperationID=" + pOperationIDList[j].OperationID + " AND PartnerName=N'" + pOperationIDList[j].CustomerName + "'", "ID", out _RowCount);
                //        CVarInvoices objCVarInvoices = new CVarInvoices();
                //        objCVarInvoices.InvoiceNumber = 0;
                //        objCVarInvoices.OperationID = pOperationIDList[j].OperationID;
                //        objCVarInvoices.OperationPartnerID = objCvwOperationPartners.lstCVarvwOperationPartners[0].ID;
                //        objCVarInvoices.AddressID = 0; //pAddressID;
                //        objCVarInvoices.InvoiceTypeID = objCInvoiceTypes.lstCVarInvoiceTypes[0].ID;
                //        objCVarInvoices.PrintedAddress = objCvwOperationPartners.lstCVarvwOperationPartners[0].Address; //"0";
                //        objCVarInvoices.CustomerReference = "0";
                //        objCVarInvoices.PaymentTermID = 0; //pPaymentTermID;
                //        objCVarInvoices.CurrencyID = _CurrencyID;
                //        objCVarInvoices.ExchangeRate = _ExchangeRate;
                //        objCVarInvoices.InvoiceDate = DateTime.Now; //pInvoiceIssueDate;
                //        objCVarInvoices.DueDate = DateTime.Now; //pInvoiceDueDate;
                //        objCVarInvoices.AmountWithoutVAT = 0; //pAmountWithoutVAT;
                //        objCVarInvoices.TaxTypeID = 0; //pTaxTypeID;
                //        objCVarInvoices.TaxPercentage = 0; //pTaxPercentage;
                //        objCVarInvoices.TaxAmount = 0; //pTaxAmount;
                //        objCVarInvoices.DiscountTypeID = 0; //pDiscountTypeID;
                //        objCVarInvoices.DiscountPercentage = 0; //pDiscountPercentage;
                //        objCVarInvoices.DiscountAmount = 0; //pDiscountAmount;
                //        objCVarInvoices.FixedDiscount = 0; //pFixedDiscount;
                //        objCVarInvoices.Amount = 0; //pAmount;
                //                                    //objCVarInvoices.PaidAmount = pPaidAmount;
                //                                    //objCVarInvoices.RemainingAmount = pRemainingAmount;
                //        objCVarInvoices.InvoiceStatusID = 1;
                //        objCVarInvoices.IsApproved = false;
                //        objCVarInvoices.LeftSignature = "0";
                //        objCVarInvoices.MiddleSignature = "0";
                //        objCVarInvoices.RightSignature = "0";
                //        objCVarInvoices.GRT = "0";
                //        objCVarInvoices.DWT = "0";
                //        objCVarInvoices.NRT = "0";
                //        objCVarInvoices.LOA = "0";
                //        objCVarInvoices.EditableNotes = "0";
                //        objCVarInvoices.OperationContainersAndPackagesID = 0; //pTankID;
                //        objCVarInvoices.TransactionTypeID = 0; //pTransactionTypeID;

                //        objCVarInvoices.Notes = "Created for Pickup on " + DateTime.Now.ToString("dd/MM/yyyy");
                //        objCVarInvoices.CutOffDate = DateTime.Now; //DateTime.ParseExact(pVehicleCutOffDate + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture);
                //        objCVarInvoices.Is3PL = true;

                //        objCVarInvoices.CreatorUserID = objCVarInvoices.ModificatorUserID = WebSecurity.CurrentUserId;
                //        objCVarInvoices.CreationDate = objCVarInvoices.ModificationDate = DateTime.Now;

                //        CInvoices objCInvoices = new CInvoices();
                //        objCInvoices.lstCVarInvoices.Add(objCVarInvoices);
                //        checkException = objCInvoices.SaveMethod(objCInvoices.lstCVarInvoices);
                //        #endregion Create InvoiceHeader
                //        #region InvoiceDetails
                //        var pOperationReceiveDetails = pApplicableVehicleList
                //            .Where(s => s.OperationID == pOperationIDList[j].OperationID).ToList();
                //        for (int i = 0; i < pOperationReceiveDetails.Count; i++)
                //        {
                //            int _NumberOfDays = 0;
                //            //_NumberOfDays = (DateTime.ParseExact(pVehicleCutOffDate + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture)
                //            //                - pOperationReceiveDetails[i].PreviousCutOffDate.Date).Days;
                //            _NumberOfDays = (DateTime.Now.Date - pOperationReceiveDetails[i].PreviousCutOffDate.Date).Days;
                //            for (int z = 0; z < objCWH_ContractDetails.lstCVarWH_ContractDetails.Count; z++)
                //            {
                //                CVarReceivables objCVarReceivables = new CVarReceivables();
                //                objCVarReceivables.CreatorUserID = WebSecurity.CurrentUserId;
                //                objCVarReceivables.CreationDate = DateTime.Now;
                //                objCVarReceivables.GeneratingQRID = 0;
                //                objCVarReceivables.InvoiceID = objCVarInvoices.ID;
                //                objCVarReceivables.AccNoteID = 0;
                //                objCVarReceivables.OperationContainersAndPackagesID = 0;
                //                objCVarReceivables.HouseBillID = 0;
                //                objCVarReceivables.OperationVehicleID = pOperationReceiveDetails[i].OperationVehicleID;

                //                objCVarReceivables.ID = 0;

                //                objCVarReceivables.OperationID = pOperationReceiveDetails[i].OperationID;
                //                objCVarReceivables.ChargeTypeID = objCWH_ContractDetails.lstCVarWH_ContractDetails[z].ChargeTypeID;
                //                objCVarReceivables.POrC = 0;
                //                objCVarReceivables.MeasurementID = 0;
                //                objCVarReceivables.ContainerTypeID = 0;
                //                objCVarReceivables.SupplierID = 0;
                //                objCVarReceivables.Quantity = _NumberOfDays;
                //                objCVarReceivables.CostPrice = 0;
                //                objCVarReceivables.CostAmount = 0;
                //                //objCVarReceivables.SalePrice = Math.Round((_NumberOfDays * objCWH_ContractDetails.lstCVarWH_ContractDetails[z].Rate + objCWH_ContractDetails.lstCVarWH_ContractDetails[z].Cost), 2);
                //                objCVarReceivables.SalePrice = objCWH_ContractDetails.lstCVarWH_ContractDetails[z].Rate;

                //                objCVarReceivables.AmountWithoutVAT = Math.Round((objCVarReceivables.Quantity * objCVarReceivables.SalePrice), 2);
                //                objCVarReceivables.TaxeTypeID = 0;
                //                objCVarReceivables.TaxPercentage = 0;
                //                objCVarReceivables.TaxAmount = 0;
                //                objCVarReceivables.DiscountTypeID = 0;
                //                objCVarReceivables.DiscountPercentage = 0;
                //                objCVarReceivables.DiscountAmount = 0;

                //                objCVarReceivables.SaleAmount = objCVarReceivables.AmountWithoutVAT;
                //                objCVarReceivables.ExchangeRate = _ExchangeRate;
                //                objCVarReceivables.CurrencyID = _CurrencyID;
                //                objCVarReceivables.Notes = "CutOff From " + pOperationReceiveDetails[i].PreviousCutOffDate.ToString("dd/MM/yyyy") + " To " + DateTime.Now.ToString("dd/MM/yyyy");

                //                objCVarReceivables.IssueDate = DateTime.Now;

                //                objCVarReceivables.PreviousCutOffDate = pOperationReceiveDetails[i].PreviousCutOffDate;
                //                objCVarReceivables.CutOffDate = DateTime.Now; //DateTime.ParseExact(pVehicleCutOffDate + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture);

                //                objCVarReceivables.ModificatorUserID = WebSecurity.CurrentUserId;
                //                objCVarReceivables.ModificationDate = DateTime.Now;

                //                CReceivables objCReceivables = new CReceivables();
                //                objCReceivables.lstCVarReceivables.Add(objCVarReceivables);
                //                checkException = objCReceivables.SaveMethod(objCReceivables.lstCVarReceivables);
                //            }
                //        } //for (int i = 0; i < pOperationReceiveDetails.Count; i++)
                //        #endregion InvoiceDetails
                //        #region Update Invoice totals at server side to fix any connection problem
                //        string pUpdateClause = "";
                //        //SET AmountWithoutVAT
                //        pUpdateClause = " AmountWithoutVAT = ROUND((SELECT SUM(ISNULL(SalePrice,0) * ISNULL(Quantity,1))-" + 0 /*pFixedDiscount*/ + " FROM Receivables WHERE InvoiceID = " + objCVarInvoices.ID.ToString() + " AND IsDeleted=0),2)";
                //        pUpdateClause += " WHERE ID = " + objCVarInvoices.ID.ToString();
                //        checkException = objCInvoices.UpdateList(pUpdateClause);
                //        //SET Tax, Discount & Total Amount after setting the AmountWithVAT
                //        pUpdateClause = " TaxAmount = ROUND((ISNULL(AmountWithoutVAT, 0) * ISNULL(TaxPercentage, 0) / 100),2)";
                //        pUpdateClause += " , DiscountAmount = ROUND((ISNULL(AmountWithoutVAT, 0) * ISNULL(DiscountPercentage, 0) / 100),2)";
                //        if (objCDefaults.lstCVarDefaults[0].IsTaxOnItems)
                //            pUpdateClause += " , Amount = - ROUND((ISNULL(AmountWithoutVAT, 0) * ISNULL(DiscountPercentage, 0) / 100),2) + ROUND((SELECT SUM(ISNULL(SaleAmount,0))-" + 0 /*pFixedDiscount*/ + " FROM Receivables WHERE InvoiceID = " + objCVarInvoices.ID.ToString() + " AND IsDeleted=0),2)";
                //        else
                //            pUpdateClause += " , Amount = ROUND((ISNULL(AmountWithoutVAT, 0) + ROUND( (ISNULL(AmountWithoutVAT, 0) * ISNULL(TaxPercentage, 0) / 100),2) - ROUND((ISNULL(AmountWithoutVAT, 0) * ISNULL(DiscountPercentage, 0) / 100),2)),2)";
                //        pUpdateClause += " WHERE ID = " + objCVarInvoices.ID.ToString();
                //        checkException = objCInvoices.UpdateList(pUpdateClause);
                //        #endregion Update Invoice totals at server side to fix any connection problem
                //    } //for (int j = 0; j < pOperationIDList.Count; j++)
                //}
                #endregion VehicleCutOff Invoice for Pickup
            }
            #endregion Pickup
            #region Receive
            if (saveVehicleActionDetailsParameters.pVehicleActionID == constVehicleActionReceive 
                || saveVehicleActionDetailsParameters.pVehicleActionID == constVehicleActionReturn)
            {
                CvwOperationVehicle objCvwOperationVehicle = new CvwOperationVehicle();
                //checkException = objCvwOperationVehicle.GetListPaging(999999, 1, "WHERE ID IN (" + saveVehicleActionDetailsParameters.pOperationVehicleIDList + ")", "ID", out _RowCount);
                checkException = objCvwOperationVehicle.GetList("WHERE ID IN (" + saveVehicleActionDetailsParameters.pOperationVehicleIDList + ")");
                CVarWH_Pickup objCVarWH_Pickup = new CVarWH_Pickup();
                #region Insert Receive Header
                CVarWH_Receive objCVarWH_Receive = new CVarWH_Receive();
                objCVarWH_Receive.Code = "0";
                objCVarWH_Receive.WarehouseID = saveVehicleActionDetailsParameters.pWarehouseID;
                objCVarWH_Receive.CustomerID = objCvwOperationVehicle.lstCVarvwOperationVehicle[0].CustomerID;
                objCVarWH_Receive.ReceiveDate = DateTime.Now; //DateTime.ParseExact(pReceiveDate + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture);
                objCVarWH_Receive.ETD = objCVarWH_Receive.ReceiveDate; //DateTime.ParseExact(pETD + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture);
                objCVarWH_Receive.ETA = objCVarWH_Receive.ReceiveDate; //DateTime.ParseExact(pETA + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture);
                objCVarWH_Receive.ArrivalDate = objCVarWH_Receive.ReceiveDate; //DateTime.ParseExact(pArrivalDate + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture);
                objCVarWH_Receive.StatusID = constReceiveStatusFinalized;
                objCVarWH_Receive.IsFinalized = true;
                objCVarWH_Receive.FinalizeDate = DateTime.Now;//DateTime.ParseExact(pFinalizeDate + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture);
                objCVarWH_Receive.Notes = "Generated from vehicle action.";
                objCVarWH_Receive.InvoiceID = 0;
                objCVarWH_Receive.OperationID = objCvwOperationVehicle.lstCVarvwOperationVehicle[0].OperationID;
                objCVarWH_Receive.IsReturn = (saveVehicleActionDetailsParameters.pVehicleActionID == constVehicleActionReturn ? true : false);
                objCVarWH_Receive.EquipmentID = 0;
                objCVarWH_Receive.ContainerNumber = "";

                objCVarWH_Receive.CreatorUserID = objCVarWH_Receive.ModificatorUserID = WebSecurity.CurrentUserId;
                objCVarWH_Receive.CreationDate = objCVarWH_Receive.ModificationDate = DateTime.Now;
                objCWH_Receive.lstCVarWH_Receive.Add(objCVarWH_Receive);
                checkException = objCWH_Receive.SaveMethod(objCWH_Receive.lstCVarWH_Receive);                
                #endregion Insert Receive Header
                #region Insert Receive Details
                for (int i = 0; i < _NumberOfVehicles; i++)
                {
                    CVehicleAction objCVehicleAction_temp = new CVehicleAction();
                    checkException = objCVehicleAction_temp.GetListPaging(999999, 1, "WHERE ID=(SELECT MAX(ID) FROM VehicleAction WHERE OperationVehicleID=" + objCvwOperationVehicle.lstCVarvwOperationVehicle[i].ID + ")", "ID", out _RowCount);
                    CVarWH_ReceiveDetails objCVarWH_ReceiveDetails = new CVarWH_ReceiveDetails();
                    objCVarWH_ReceiveDetails.ID = 0;
                    objCVarWH_ReceiveDetails.ReceiveID = objCVarWH_Receive.ID;
                    objCVarWH_ReceiveDetails.BarCode = "0";
                    objCVarWH_ReceiveDetails.PurchaseItemID = objCvwOperationVehicle.lstCVarvwOperationVehicle[i].PurchaseItemID;
                    objCVarWH_ReceiveDetails.Quantity = 1;
                    objCVarWH_ReceiveDetails.ExpectedQuantity = 1;
                    objCVarWH_ReceiveDetails.SplitQuantity = 0;
                    objCVarWH_ReceiveDetails.LocationID = 0;
                    objCVarWH_ReceiveDetails.PalletID = "0";
                    objCVarWH_ReceiveDetails.ReceiveDate = DateTime.Now;//DateTime.ParseExact(pReceiveDate + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture);
                    objCVarWH_ReceiveDetails.StatusID = constReceiveDetailsStatusPending;
                    objCVarWH_ReceiveDetails.ExpireDate = DateTime.Parse("01/01/1900"); // DateTime.Parse(pExpireDate.ToString());
                    objCVarWH_ReceiveDetails.LotNo = "0";
                    objCVarWH_ReceiveDetails.IsExcluded = false;
                    objCVarWH_ReceiveDetails.OperationVehicleID = objCvwOperationVehicle.lstCVarvwOperationVehicle[i].ID;
                    objCVarWH_ReceiveDetails.VehicleActionID = objCVehicleAction_temp.lstCVarVehicleAction[0].ID;
                    objCVarWH_ReceiveDetails.Notes = "0";
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

                    #region WH_VehicleAgingReport
                    {
                        CvwWH_VehicleAgingReport objCvwWH_VehicleAgingReport = new CvwWH_VehicleAgingReport();
                        checkException = objCvwWH_VehicleAgingReport.GetListPaging(9, 1, "WHERE OperationVehicleID=" + objCVarWH_ReceiveDetails.OperationVehicleID, "ReceiveDate DESC", out _RowCount);
                        if (objCvwWH_VehicleAgingReport.lstCVarvwWH_VehicleAgingReport.Count == 0
                            || (
                                    objCvwWH_VehicleAgingReport.lstCVarvwWH_VehicleAgingReport.Count > 0
                                    && saveVehicleActionDetailsParameters.pVehicleActionID == constVehicleActionReturn
                                )
                            ) //new receive or return, so add new row in VehicleAgingReport
                        {
                            CVarWH_VehicleAgingReport objCVarWH_VehicleAgingReport = new CVarWH_VehicleAgingReport();
                            objCVarWH_VehicleAgingReport.OperationVehicleID = objCVarWH_ReceiveDetails.OperationVehicleID;
                            objCVarWH_VehicleAgingReport.ReceiveDetailsID = objCVarWH_ReceiveDetails.ID;
                            objCVarWH_VehicleAgingReport.PickupDetailsLocationID = 0;
                            objCVarWH_VehicleAgingReport.IsReturn = (saveVehicleActionDetailsParameters.pVehicleActionID == constVehicleActionReturn ? true : false);
                            objCVarWH_VehicleAgingReport.IsOracleInsert = false;
                            objCVarWH_VehicleAgingReport.IsOracleUpdate = false;
                            objCVarWH_VehicleAgingReport.IsAddExtraDayForFirstCutOff = (saveVehicleActionDetailsParameters.pVehicleActionID == constVehicleActionReceive ? true : false);
                            CWH_VehicleAgingReport objCWH_VehicleAgingReport_temp = new CWH_VehicleAgingReport();
                            objCWH_VehicleAgingReport_temp.lstCVarWH_VehicleAgingReport.Add(objCVarWH_VehicleAgingReport);
                            checkException = objCWH_VehicleAgingReport_temp.SaveMethod(objCWH_VehicleAgingReport_temp.lstCVarWH_VehicleAgingReport);
                        }
                        else //transfer,so set last row PickupDetailsLocationID to null
                        {
                            CWH_VehicleAgingReport objCWH_VehicleAgingReport_temp = new CWH_VehicleAgingReport();
                            objCWH_VehicleAgingReport_temp.UpdateList("PickupDetailsLocationID=null WHERE ID=" + objCvwWH_VehicleAgingReport.lstCVarvwWH_VehicleAgingReport[0].ID);
                        }
                    }
                    #endregion WH_VehicleAgingReport
                    {
                        #region Add Receivables from contract //Commented to be generated in Cutoff
                        //CWH_Contract objCWH_Contract = new CWH_Contract();
                        //CWH_ContractDetails objCWH_ContractDetails = new CWH_ContractDetails();
                        //checkException = objCWH_Contract.GetListPaging(999999, 1, "WHERE (CAST(GETDATE() AS DATE) BETWEEN CAST(FromDate AS DATE) AND ToDate) AND CustomerID=" + objCvwOperationVehicle.lstCVarvwOperationVehicle[0].CustomerID, "ID DESC", out _RowCount);
                        //if (objCWH_Contract.lstCVarWH_Contract.Count > 0)
                        //{
                        //    int _CurrencyID = objCDefaults.lstCVarDefaults[0].CurrencyID;
                        //    int _NumberOfDays = 0;
                        //    //_NumberOfDays = (objCvwWH_ReceiveDetails.lstCVarvwWH_ReceiveDetails[i].ReceiveDate.Date - DateTime.Now.Date).Days;
                        //    decimal _ExchangeRate = 0;
                        //    CvwCurrencyDetails objCvwCurrencyDetails = new CvwCurrencyDetails();
                        //    objCvwCurrencyDetails.GetList("WHERE ID=" + objCWH_Contract.lstCVarWH_Contract[0].CurrencyID
                        //            + " AND GETDATE() >= DateAdd(hh, 0, DateDiff(dd, 0, FromDate)) "
                        //            + " AND GETDATE() <= DateAdd(minute,59,DateAdd(hh, 23, DateDiff(dd, 0, ToDate))) "
                        //            );
                        //    if (objCvwCurrencyDetails.lstCVarvwCurrencyDetails.Count > 0)
                        //    {
                        //        _CurrencyID = objCWH_Contract.lstCVarWH_Contract[0].CurrencyID;
                        //        _ExchangeRate = objCvwCurrencyDetails.lstCVarvwCurrencyDetails[0].ExchangeRate;
                        //    }
                        //    else
                        //        _ExchangeRate = 1;
                        //    checkException = objCWH_ContractDetails.GetListPaging(999999, 1, "WHERE TypeID IN (" + constContractDetailsTypeIN + "," + constContractDetailsTypeINAndOUT + ") AND ContractID=" + objCWH_Contract.lstCVarWH_Contract[0].ID, "ID", out _RowCount);
                        //    for (int z = 0; z < objCWH_ContractDetails.lstCVarWH_ContractDetails.Count; z++)
                        //    {
                        //        CVarReceivables objCVarReceivables = new CVarReceivables();
                        //        objCVarReceivables.CreatorUserID = WebSecurity.CurrentUserId;
                        //        objCVarReceivables.CreationDate = DateTime.Now;
                        //        objCVarReceivables.GeneratingQRID = 0;
                        //        objCVarReceivables.AccNoteID = 0;
                        //        objCVarReceivables.OperationContainersAndPackagesID = 0;
                        //        objCVarReceivables.HouseBillID = 0;
                        //        objCVarReceivables.OperationVehicleID = objCvwOperationVehicle.lstCVarvwOperationVehicle[i].ID;

                        //        objCVarReceivables.ID = 0;

                        //        objCVarReceivables.OperationID = objCvwOperationVehicle.lstCVarvwOperationVehicle[i].OperationID;
                        //        objCVarReceivables.ChargeTypeID = objCWH_ContractDetails.lstCVarWH_ContractDetails[z].ChargeTypeID;
                        //        objCVarReceivables.POrC = 0;
                        //        objCVarReceivables.MeasurementID = 0;
                        //        objCVarReceivables.ContainerTypeID = 0;
                        //        objCVarReceivables.SupplierID = 0;
                        //        objCVarReceivables.Quantity = 1;
                        //        objCVarReceivables.CostPrice = 0;
                        //        objCVarReceivables.CostAmount = 0;
                        //        objCVarReceivables.SalePrice = Math.Round(objCWH_ContractDetails.lstCVarWH_ContractDetails[z].Cost, 2); //Math.Round((_NumberOfDays * objCWH_ContractDetails.lstCVarWH_ContractDetails[z].Rate + objCWH_ContractDetails.lstCVarWH_ContractDetails[z].Cost), 2);

                        //        objCVarReceivables.AmountWithoutVAT = Math.Round((objCVarReceivables.Quantity * objCVarReceivables.SalePrice), 2);
                        //        objCVarReceivables.TaxeTypeID = 0;
                        //        objCVarReceivables.TaxPercentage = 0;
                        //        objCVarReceivables.TaxAmount = 0;
                        //        objCVarReceivables.DiscountTypeID = 0;
                        //        objCVarReceivables.DiscountPercentage = 0;
                        //        objCVarReceivables.DiscountAmount = 0;

                        //        objCVarReceivables.SaleAmount = objCVarReceivables.SalePrice;
                        //        objCVarReceivables.ExchangeRate = _ExchangeRate;
                        //        objCVarReceivables.CurrencyID = _CurrencyID;
                        //        objCVarReceivables.Notes = "Generated from contract for pickup.";

                        //        objCVarReceivables.IssueDate = DateTime.Now;

                        //        objCVarReceivables.PreviousCutOffDate = DateTime.Parse("01/01/1900");
                        //        if (saveVehicleActionDetailsParameters.pVehicleActionID == constVehicleActionReturn)
                        //            objCVarReceivables.CutOffDate = DateTime.Now; //To discard previous period in case of Return
                        //        else
                        //            objCVarReceivables.CutOffDate = DateTime.Parse("01/01/1900"); ;

                        //        objCVarReceivables.ModificatorUserID = WebSecurity.CurrentUserId;
                        //        objCVarReceivables.ModificationDate = DateTime.Now;

                        //        CReceivables objCReceivables = new CReceivables();
                        //        objCReceivables.lstCVarReceivables.Add(objCVarReceivables);
                        //        //if (objCGetCreationInformation.lstCVarReceivables[0].InvoiceID == 0 && objCGetCreationInformation.lstCVarReceivables[0].AccNoteID == 0)
                        //        checkException = objCReceivables.SaveMethod(objCReceivables.lstCVarReceivables);
                        //    } //for (int z = 0; z < objCWH_ContractDetails.lstCVarWH_ContractDetails.Count; z++)
                        //}
                        #endregion Add Receivables from contract
                    }
                }
                #endregion Insert Receive Details
            }
            #endregion Receive
            return new object[] {
                _MessageReturned
            };
        }

        #endregion VehicleActionDetails
        
        #region VehicleCutOff
        [HttpGet, HttpPost]
        public Object[] FillCutoffModal(string pCustomerWhereClause, string pCustomerOrderBy, string pPaymentTermWhereClause, string pPaymentTermOrderBy
            , string pTransactionTypeWhereClause, string pTransactionTypeOrderBy, string pTaxTypeWhereClause, string pTaxTypeOrderBy)
        {
            int _RowCount = 0;
            Exception checkException = null;
            CvwUsers objCvwUsers = new CvwUsers();
            objCvwUsers.GetListPaging(999999, 1, "WHERE  ID=" + WebSecurity.CurrentUserId, "ID", out _RowCount);

            CDefaults objCDefaults = new CDefaults();
            objCDefaults.GetListPaging(999999, 1, "WHERE 1=1", "ID", out _RowCount);
            if (objCvwUsers.lstCVarvwUsers[0].IsHideOthersRecords)
                pCustomerWhereClause += " AND (SalesmanID=" + WebSecurity.CurrentUserId + " OR CreatorUserID=" + WebSecurity.CurrentUserId + ")";
            CvwCustomersWithMinimalColumns objCCustomers = new CvwCustomersWithMinimalColumns();
            checkException = objCCustomers.GetListPaging(999999, 1, pCustomerOrderBy, pCustomerOrderBy, out _RowCount);

            CPaymentTerms objCPaymentTerms = new CPaymentTerms();
            checkException = objCPaymentTerms.GetListPaging(999999, 1, pPaymentTermWhereClause, pPaymentTermOrderBy, out _RowCount);

            CNoAccessGblTransactionTypes objCNoAccessGblTransactionTypes = new CNoAccessGblTransactionTypes();
            checkException = objCNoAccessGblTransactionTypes.GetListPaging(999999, 1, pTransactionTypeWhereClause, pTransactionTypeOrderBy, out _RowCount);

            CTaxeTypes objCTaxType = new CTaxeTypes();
            checkException = objCTaxType.GetListPaging(999999, 1, pTaxTypeWhereClause, pTaxTypeOrderBy, out _RowCount);

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[] {
                serializer.Serialize(objCCustomers.lstCVarvwCustomersWithMinimalColumns) //pData[0]
                , serializer.Serialize(objCPaymentTerms.lstCVarPaymentTerms) //pData[1]
                , serializer.Serialize(objCNoAccessGblTransactionTypes.lstCVarNoAccessGblTransactionTypes) //pData[2]
                , serializer.Serialize(objCTaxType.lstCVarTaxeTypes) //pData[3]
            };
        }
        
        [HttpGet, HttpPost]
        public object[] VehicleCutOff_GenerateInvoice(string pVehicleCutOffDate, int pCutoffCustomerID, int pTransactionTypeID
            , int pPaymentTermID, int pTaxTypeID, decimal pTaxPercentage, string pChassisNumber)
        {

            string _ReturnedMessage = "";
            Exception checkException = null;
            int _RowCount = 0;
            string _OperationIDs = "0";
            string _InvoiceIDs = "0";
            string _InvoiceNumbers = "";

            var constContractDetailsTypeNONE = 10;
            //var constContractDetailsTypeIN = 20;
            //var constContractDetailsTypeOUT = 30;
            //var constContractDetailsTypeINAndOUT = 40;

            var constVehicleActionReceive = 45;
            int _PreviousMonth = int.Parse(pVehicleCutOffDate.Split('/')[1].Split('/')[0]);
            int _PreviousMonthDays = 0;
            _PreviousMonth = _PreviousMonth == 1 ? 12 : _PreviousMonth - 1;
            if (_PreviousMonth == 4 || _PreviousMonth == 6 || _PreviousMonth == 9 || _PreviousMonth == 11)
                _PreviousMonthDays = 30;
            else if (_PreviousMonth == 1 || _PreviousMonth == 3 || _PreviousMonth == 5 || _PreviousMonth == 7 || _PreviousMonth == 8
                 || _PreviousMonth == 10 || _PreviousMonth == 12)
                _PreviousMonthDays = 31;
            else if (DateTime.IsLeapYear(DateTime.Now.Year))
                _PreviousMonthDays = 29;
            else
                _PreviousMonthDays = 28;

            CDefaults objCDefaults = new CDefaults();
            objCDefaults.GetListPaging(999999, 1, "WHERE 1=1", "ID", out _RowCount);
            CInvoiceTypes objCInvoiceTypes = new CInvoiceTypes();
            checkException = objCInvoiceTypes.GetListPaging(999999, 1, "WHERE Code LIKE N'INV%'", "ID", out _RowCount);
            string _WhereClause = "";
            DateTime _LastCutoffDate = DateTime.ParseExact(pVehicleCutOffDate + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture).AddMonths(-1); //This will get day 20
            string _strLastCutoffDate = _LastCutoffDate.ToString("yyyyMMdd");

            #region Get Applicable Vehicles
            //_WhereClause = "WHERE CAST(PreviousCutOffDate AS DATE) >= DATEADD(DAY," + (-_PreviousMonthDays) + ",'" + DateTime.ParseExact(pVehicleCutOffDate_PreviewInvoice + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture) + "') " + "\n"; //Static OpenBalance Date
            //_WhereClause = "WHERE CAST(PreviousCutOffDate AS DATE) >= '" + _strLastCutoffDate + "' " + "\n"; //Static OpenBalance Date
            _WhereClause = "WHERE 1=1 " + "\n"; //Static OpenBalance Date
            _WhereClause += "AND ( " + "\n";
            _WhereClause += "    CAST(PreviousCutOffDate AS DATE) >= '" + _strLastCutoffDate + "' " + "\n";
            //_WhereClause += "    OR ReceiveDate >= '" + _strLastCutoffDate + "' " + "\n";
            //_WhereClause += "    OR PickupRequiredDate >= '" + _strLastCutoffDate + "' " + "\n";
            _WhereClause += "   ) " + "\n";
            //_WhereClause += "AND (CAST(PickupRequiredDate AS DATE) > DATEADD(DAY," + (-_PreviousMonthDays) + ",'" + DateTime.ParseExact(pVehicleCutOffDate_PreviewInvoice + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture) + "') OR PickupRequiredDate IS NULL)" + "\n"; //Static OpenBalance Date
            _WhereClause += "AND (CAST(PickupRequiredDate AS DATE) > '" + _strLastCutoffDate + "' OR PickupRequiredDate IS NULL)" + "\n"; //Static OpenBalance Date
            //_WhereClause += "AND ReceivablesCount = 0" + "\n";
            _WhereClause += "AND (" + "\n";
            _WhereClause += "      CAST(PreviousCutOffDate AS DATE) <= N'" + DateTime.ParseExact(pVehicleCutOffDate + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture) + "' " + "\n";
            _WhereClause += "   )" + "\n";

            //_WhereClause += "AND (LastReceivableCutOffDate IS NULL OR CAST(PreviousCutOffDate AS DATE) = N'" + DateTime.ParseExact(pVehicleCutOffDate + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture) + "' )" + "\n"; //CutoffDate
            //_WhereClause += "AND CAST(PreviousCutOffDate AS DATE) <= N'" + DateTime.ParseExact(pVehicleCutOffDate + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture) + "' " + "\n"; //CutoffDate

            //_WhereClause += "AND (CAST(PickupWithoutInvoiceDate AS DATE) >= PreviousCutOffDate OR PickupWithoutInvoiceDate IS NULL)" + "\n";
            _WhereClause += "AND (" + " \n";
            _WhereClause += "       (CAST(PickupWithoutInvoiceDate AS DATE) >= CAST(PreviousCutOffDate AS DATE) AND CAST(PickupWithoutInvoiceDate AS DATE) > '" + _strLastCutoffDate + "')" + " \n";
            _WhereClause += "       OR PickupWithoutInvoiceDate IS NULL" + " \n";
            _WhereClause += "    )" + "\n";

            //_WhereClause += "AND (DATEDIFF(DAY,PreviousCutOffDate,N'" + DateTime.ParseExact(pVehicleCutOffDate + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture) + "') < " + (_PreviousMonthDays + 1) + " OR PickupWithoutInvoiceDate IS NULL)" + "\n";
            _WhereClause += "AND (" + "\n";
            _WhereClause += "       DATEDIFF(DAY,PreviousCutOffDate,N'" + DateTime.ParseExact(pVehicleCutOffDate + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture) + "') < " + (_PreviousMonthDays + 1) + " OR PickupWithoutInvoiceDate IS NULL" + "\n";
            //_WhereClause += "       OR ReceiveDate >= '" + _strLastCutoffDate + "' " + "\n";
            //_WhereClause += "       OR PickupRequiredDate >= '" + _strLastCutoffDate + "' " + "\n";
            _WhereClause += "   )" + "\n";
            _WhereClause += "AND CustomerID = " + pCutoffCustomerID + "\n";
            if (pChassisNumber != "0")
                _WhereClause += "AND ChassisNumber = N'" + pChassisNumber + "'" + "\n";
            _WhereClause += "AND IsExcluded=0" + " \n"; //"AND ID NOT IN (58718,58720,58721,64122)" + " \n";
            CvwWH_VehicleAgingReport objCvwWH_VehicleAgingReport = new CvwWH_VehicleAgingReport();
            checkException = objCvwWH_VehicleAgingReport.GetListPaging(999999, 1, _WhereClause, "ID", out _RowCount);
            #region Add day for lastcutoff of day 20
            for (int i = 0; i < objCvwWH_VehicleAgingReport.lstCVarvwWH_VehicleAgingReport.Count; i++)
                if (DateTime.Compare(objCvwWH_VehicleAgingReport.lstCVarvwWH_VehicleAgingReport[i].PreviousCutOffDate.Date, _LastCutoffDate) == 0)
                    objCvwWH_VehicleAgingReport.lstCVarvwWH_VehicleAgingReport[i].PreviousCutOffDate = objCvwWH_VehicleAgingReport.lstCVarvwWH_VehicleAgingReport[i].PreviousCutOffDate.AddDays(1);
            #endregion Add day for lastcutoff of day 20
            #endregion Get Applicable Vehicles

            #region Get Distinct OperationIDs
            var pOperationIDList = objCvwWH_VehicleAgingReport.lstCVarvwWH_VehicleAgingReport
                .Select(s => new
                {
                    OperationID = s.OperationID
                    ,
                    CustomerID = s.CustomerID
                    ,
                    CustomerName = s.CustomerName
                })
                .Distinct()
                //.OrderBy(o => o.OperationID)
                .ToList();
            #endregion Get Distinct OperationIDs

            for (int j = 0; j < pOperationIDList.Count; j++)
            {
                #region Put OperationIDs into a string to get printed data at the end
                _OperationIDs += "," + pOperationIDList[j].OperationID;
                #endregion Put OperationIDs into a string to get printed data at the end
                #region Get Contract For Operation Customer
                int _CurrencyID = objCDefaults.lstCVarDefaults[0].CurrencyID;
                decimal _ExchangeRate = 0;
                CWH_Contract objCWH_Contract = new CWH_Contract();
                CWH_ContractDetails objCWH_ContractDetails = new CWH_ContractDetails();
                checkException = objCWH_Contract.GetListPaging(999999, 1, "WHERE (CAST(GETDATE() AS DATE) BETWEEN CAST(FromDate AS DATE) AND ToDate) AND CustomerID=" + pOperationIDList[j].CustomerID, "ID DESC", out _RowCount);
                if (objCWH_Contract.lstCVarWH_Contract.Count > 0)
                {
                    _ExchangeRate = 0;
                    CvwCurrencyDetails objCvwCurrencyDetails = new CvwCurrencyDetails();
                    objCvwCurrencyDetails.GetList("WHERE ID=" + objCWH_Contract.lstCVarWH_Contract[0].CurrencyID
                            + " AND GETDATE() >= DateAdd(hh, 0, DateDiff(dd, 0, FromDate)) "
                            + " AND GETDATE() <= DateAdd(minute,59,DateAdd(hh, 23, DateDiff(dd, 0, ToDate))) "
                            );
                    if (objCvwCurrencyDetails.lstCVarvwCurrencyDetails.Count > 0)
                    {
                        _CurrencyID = objCWH_Contract.lstCVarWH_Contract[0].CurrencyID;
                        _ExchangeRate = objCvwCurrencyDetails.lstCVarvwCurrencyDetails[0].ExchangeRate;
                    }
                    else
                        _ExchangeRate = 1;
                    checkException = objCWH_ContractDetails.GetListPaging(999999, 1, "WHERE TypeID IN (" + constContractDetailsTypeNONE + ") AND ContractID=" + objCWH_Contract.lstCVarWH_Contract[0].ID, "ID", out _RowCount);
                } //if (objCWH_Contract.lstCVarWH_Contract.Count > 0)
                else
                {
                    objCWH_ContractDetails.lstCVarWH_ContractDetails.Clear();
                    _ReturnedMessage = "No valid contract.";
                }
                #endregion Get Contract For Operation Customer
                if (objCWH_ContractDetails.lstCVarWH_ContractDetails.Count > 0 && _ReturnedMessage == "")
                {
                    #region InvoiceDetails
                    string _ReceivablesIDs = "0";
                    string groupedReceivablesID = "0";
                    var pOperationVehicleList = objCvwWH_VehicleAgingReport.lstCVarvwWH_VehicleAgingReport
                        .Where(s => s.OperationID == pOperationIDList[j].OperationID).ToList();
                    List<Int64> lstVehiclesWithExtraDayAdded = new List<Int64>();
                    for (int i = 0; i < pOperationVehicleList.Count; i++)
                    {
                        DateTime dtpPickupWithoutInvoiceDate = DateTime.ParseExact(pOperationVehicleList[i].PickupWithoutInvoiceDate.ToString("dd/MM/yyyy") + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture);
                        DateTime dtpVehicleCutOffDate = DateTime.ParseExact(pVehicleCutOffDate + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture);

                        //if (dtpPickupWithoutInvoiceDate > dtpVehicleCutOffDate || dtpVehicleCutOffDate == DateTime.Parse("01/01/1900"))
                        //    pOperationVehicleList[i].PickupWithoutInvoiceDate = dtpVehicleCutOffDate;
                        string _ItemCutOffDate = (pOperationVehicleList[i].PickupWithoutInvoiceDate == DateTime.Parse("01/01/1900")
                            ? pVehicleCutOffDate
                            :
                            (dtpPickupWithoutInvoiceDate > dtpVehicleCutOffDate
                            ? pVehicleCutOffDate : pOperationVehicleList[i].PickupWithoutInvoiceDate.ToString("dd/MM/yyyy"))
                            );
                        //int _NumberOfVehicleTransactions = pOperationVehicleList.Where(w => w.OperationVehicleID == pOperationVehicleList[i].ID).Count();
                        //for (int k = 0; k < _NumberOfVehicleTransactions; k++)
                        //{
                        //    if (Math.DivRem(k,2,out _RowCount) == 0)
                        //        pOperationVehicleList.Where(w => w.OperationVehicleID == pOperationVehicleList[i].ID).ToList()[k]
                        //            .IsAddExtraDayForFirstCutOff = true;
                        //    else
                        //        pOperationVehicleList.Where(w => w.OperationVehicleID == pOperationVehicleList[i].ID).ToList()[k]
                        //            .IsAddExtraDayForFirstCutOff = false;
                        //}
                        //pOperationVehicleList.Where(w=>w.OperationVehicleID==9)
                        //    .Select(c => { c.IsAddExtraDayForFirstCutOff = false; return c; }).ToList();
                        //pOperationVehicleList.Select(
                        //    s => s.OperationID == pOperationIDList[j].OperationID 
                        //    && s.OperationVehicleID == pOperationVehicleList[i].OperationVehicleID);
                        int _TotalDaysInMonth = //Total days for the chassis in the month
                            pOperationVehicleList.Where(w => w.OperationVehicleID == pOperationVehicleList[i].ID)
                            .Sum(s => (DateTime.ParseExact(_ItemCutOffDate + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture)
                                        - s.PreviousCutOffDate.Date).Days);
                        int _NumberOfDays = 0; //for current VehicleAgingLine
                        _NumberOfDays = (DateTime.ParseExact(_ItemCutOffDate + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture)
                                        - pOperationVehicleList[i].PreviousCutOffDate.Date).Days;
                        //if _DiffBetweenPreviousCutoffAndStartOfPeriod=0 then first appearance of the chassis in the month so add day(only works for 1 month cutoff becuase will be 0 only for that case)
                        int _DiffBetweenPreviousCutoffAndStartOfPeriod = DateTime.Compare(pOperationVehicleList[i].PreviousCutOffDate.Date, _LastCutoffDate.AddDays(1));
                        bool _IsExtraDayAdded = lstVehiclesWithExtraDayAdded.Contains(pOperationVehicleList[i].OperationVehicleID);

                        //add extra day for receive if first line for vehicle in invoice
                        if (
                                (pOperationVehicleList[i].IsAddExtraDayForFirstCutOff || (_DiffBetweenPreviousCutoffAndStartOfPeriod == 0 && !_IsExtraDayAdded))
                                    && _NumberOfDays < _PreviousMonthDays
                                    && _TotalDaysInMonth < _PreviousMonthDays
                            )
                        {
                            _NumberOfDays += 1;
                            lstVehiclesWithExtraDayAdded.Add(pOperationVehicleList[i].OperationVehicleID);
                        }
                        if (_NumberOfDays > _PreviousMonthDays)
                            _NumberOfDays = _PreviousMonthDays;

                        for (int z = 0; z < objCWH_ContractDetails.lstCVarWH_ContractDetails.Count; z++)
                        {
                            #region Add Receivable
                            CVarReceivables objCVarReceivables = new CVarReceivables();
                            objCVarReceivables.CreatorUserID = WebSecurity.CurrentUserId;
                            objCVarReceivables.CreationDate = DateTime.Now;
                            objCVarReceivables.GeneratingQRID = 0;
                            objCVarReceivables.InvoiceID = 0; //objCVarInvoices.ID;
                            objCVarReceivables.AccNoteID = 0;
                            objCVarReceivables.OperationContainersAndPackagesID = 0;
                            objCVarReceivables.HouseBillID = 0;

                            objCVarReceivables.OperationVehicleID = pOperationVehicleList[i].OperationVehicleID;
                            //objCVarReceivables.VehicleAgingReportID = objCvwWH_VehicleAgingReport.lstCVarvwWH_VehicleAgingReport.Count == 0
                            //                                            ? 0
                            //                                            : objCvwWH_VehicleAgingReport.lstCVarvwWH_VehicleAgingReport[0].ID;
                            objCVarReceivables.VehicleAgingReportID = pOperationVehicleList[i].ID;

                            objCVarReceivables.ID = 0;

                            objCVarReceivables.OperationID = 0; //pOperationVehicleList[i].OperationID; //not to appear in the Operation
                            objCVarReceivables.ChargeTypeID = objCWH_ContractDetails.lstCVarWH_ContractDetails[z].ChargeTypeID;
                            objCVarReceivables.POrC = 0;
                            objCVarReceivables.MeasurementID = 0;
                            objCVarReceivables.ContainerTypeID = 0;
                            objCVarReceivables.SupplierID = 0;
                            objCVarReceivables.Quantity = _NumberOfDays;
                            objCVarReceivables.CostPrice = 0;
                            objCVarReceivables.CostAmount = 0;
                            //objCVarReceivables.SalePrice = Math.Round((_NumberOfDays * objCWH_ContractDetails.lstCVarWH_ContractDetails[z].Rate + objCWH_ContractDetails.lstCVarWH_ContractDetails[z].Cost), 2);
                            objCVarReceivables.SalePrice = objCWH_ContractDetails.lstCVarWH_ContractDetails[z].Rate;

                            objCVarReceivables.AmountWithoutVAT = Math.Round((objCVarReceivables.Quantity * objCVarReceivables.SalePrice), 2);
                            objCVarReceivables.TaxeTypeID = pTaxTypeID;
                            objCVarReceivables.TaxPercentage = pTaxPercentage;
                            objCVarReceivables.TaxAmount = Math.Round(((objCVarReceivables.AmountWithoutVAT * objCVarReceivables.TaxPercentage) / 100), 2);
                            objCVarReceivables.DiscountTypeID = 0;
                            objCVarReceivables.DiscountPercentage = 0;
                            objCVarReceivables.DiscountAmount = 0;

                            objCVarReceivables.SaleAmount = objCVarReceivables.AmountWithoutVAT + objCVarReceivables.TaxAmount;
                            objCVarReceivables.ExchangeRate = _ExchangeRate;
                            objCVarReceivables.CurrencyID = _CurrencyID;
                            objCVarReceivables.Notes = pOperationVehicleList[i].ChassisNumber + ": From " + (pOperationVehicleList[i].PreviousCutOffDate.Day == 20 && pOperationVehicleList[i].PreviousCutOffDate.Month != DateTime.Now.Month ? pOperationVehicleList[i].PreviousCutOffDate.AddDays(1) : pOperationVehicleList[i].PreviousCutOffDate).ToString("dd/MM/yyyy") + " To " + _ItemCutOffDate; //+ (pOperationVehicleList[i].PickupWithoutInvoiceDate == DateTime.MinValue ? "(Pickup)" : "");
                            //objCVarReceivables.Notes = pOperationVehicleList[i].ChassisNumber + ": From " + pOperationVehicleList[i].PreviousCutOffDate.ToString("dd/MM/yyyy") + " To " + _ItemCutOffDate; //+ (pOperationVehicleList[i].PickupWithoutInvoiceDate == DateTime.MinValue ? "(Pickup)" : "");

                            objCVarReceivables.IssueDate = DateTime.Now;

                            objCVarReceivables.PreviousCutOffDate = pOperationVehicleList[i].PreviousCutOffDate;
                            objCVarReceivables.CutOffDate = DateTime.ParseExact(_ItemCutOffDate + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture);
                            objCVarReceivables.ReceiptDate = DateTime.Parse("01/01/1900");
                            objCVarReceivables.ReceiptNo = "";
                            objCVarReceivables.TariffID = 0;
                            objCVarReceivables.ManualChargeType = "0";
                            objCVarReceivables.CostCenterId = 0;
                            objCVarReceivables.IsOfficial = false;
                            objCVarReceivables.crmCode = "";

                            objCVarReceivables.ModificatorUserID = WebSecurity.CurrentUserId;
                            objCVarReceivables.ModificationDate = DateTime.Now;

                            CReceivables objCReceivables = new CReceivables();
                            if (_NumberOfDays > 0)
                            {
                                objCReceivables.lstCVarReceivables.Add(objCVarReceivables);
                                checkException = objCReceivables.SaveMethod(objCReceivables.lstCVarReceivables);
                                _ReceivablesIDs += "," + objCVarReceivables.ID;
                            }
                            #endregion Add Receivable
                            #region Set IsPickupAddedToInvoice In WH_ReceiveDetails
                            //if (pOperationVehicleList[i].PickupWithoutInvoiceDate != DateTime.Parse("01/01/1900"))
                            //{
                            //    string _UpdateClause = "";
                            //    CWH_ReceiveDetails objCWH_ReceiveDetails_temp = new CWH_ReceiveDetails();
                            //    _UpdateClause = "IsPickupAddedToInvoice = 1" + " \n";
                            //    _UpdateClause += "WHERE ID = " + pOperationVehicleList[i].ReceiveDetailsID;
                            //    checkException = objCWH_ReceiveDetails_temp.UpdateList(_UpdateClause);
                            //}
                            #endregion Set IsPickupAddedToInvoice In WH_ReceiveDetails
                        } //for (int z = 0; z < objCWH_ContractDetails.lstCVarWH_ContractDetails.Count; z++)
                    } //for (int i = 0; i < pOperationVehicleList.Count; i++)
                    #endregion InvoiceDetails
                    #region InvoiceHeader
                    if (_ReceivablesIDs != "0") //Items before grouping
                    {
                        #region Save grouped Receivable item
                        CReceivables objCReceivables_tmp = new CReceivables();
                        checkException = objCReceivables_tmp.GetListPaging(999999, 1, " WHERE ID IN(" + _ReceivablesIDs + ")", "ID", out _RowCount);
                        
                        int groupedChargeTypeID = objCReceivables_tmp.lstCVarReceivables[0].ChargeTypeID;
                        decimal groupedAmountWithoutVAT = objCReceivables_tmp.lstCVarReceivables.Sum(s => s.AmountWithoutVAT);

                        CVarReceivables objCVarReceivables = new CVarReceivables();
                        objCVarReceivables.CreatorUserID = WebSecurity.CurrentUserId;
                        objCVarReceivables.CreationDate = DateTime.Now;
                        objCVarReceivables.GeneratingQRID = 0;
                        objCVarReceivables.InvoiceID = 0; //objCVarInvoices.ID;
                        objCVarReceivables.AccNoteID = 0;
                        objCVarReceivables.OperationContainersAndPackagesID = 0;
                        objCVarReceivables.HouseBillID = 0;

                        objCVarReceivables.OperationVehicleID = 0; //pOperationVehicleList[i].OperationVehicleID;
                        //objCVarReceivables.VehicleAgingReportID = objCvwWH_VehicleAgingReport.lstCVarvwWH_VehicleAgingReport.Count == 0
                        //                                            ? 0
                        //                                            : objCvwWH_VehicleAgingReport.lstCVarvwWH_VehicleAgingReport[0].ID;
                        objCVarReceivables.VehicleAgingReportID = 0; //pOperationVehicleList[i].ID;

                        objCVarReceivables.ID = 0;

                        objCVarReceivables.OperationID = pOperationIDList[j].OperationID;
                        objCVarReceivables.ChargeTypeID = objCReceivables_tmp.lstCVarReceivables[0].ChargeTypeID;
                        objCVarReceivables.POrC = 0;
                        objCVarReceivables.MeasurementID = 0;
                        objCVarReceivables.ContainerTypeID = 0;
                        objCVarReceivables.SupplierID = 0;
                        objCVarReceivables.Quantity = 1;
                        objCVarReceivables.CostPrice = 0;
                        objCVarReceivables.CostAmount = 0;
                        //objCVarReceivables.SalePrice = Math.Round((_NumberOfDays * objCWH_ContractDetails.lstCVarWH_ContractDetails[z].Rate + objCWH_ContractDetails.lstCVarWH_ContractDetails[z].Cost), 2);
                        objCVarReceivables.SalePrice = groupedAmountWithoutVAT;

                        objCVarReceivables.AmountWithoutVAT = Math.Round((objCVarReceivables.Quantity * objCVarReceivables.SalePrice), 2);
                        objCVarReceivables.TaxeTypeID = pTaxTypeID;
                        objCVarReceivables.TaxPercentage = pTaxPercentage;
                        objCVarReceivables.TaxAmount = Math.Round(((objCVarReceivables.AmountWithoutVAT * objCVarReceivables.TaxPercentage) / 100), 2);
                        objCVarReceivables.DiscountTypeID = 0;
                        objCVarReceivables.DiscountPercentage = 0;
                        objCVarReceivables.DiscountAmount = 0;

                        objCVarReceivables.SaleAmount = objCVarReceivables.AmountWithoutVAT + objCVarReceivables.TaxAmount;
                        objCVarReceivables.ExchangeRate = _ExchangeRate;
                        objCVarReceivables.CurrencyID = _CurrencyID;
                        objCVarReceivables.Notes = "0"; //+ (pOperationVehicleList[i].PickupWithoutInvoiceDate == DateTime.MinValue ? "(Pickup)" : "");
                        //objCVarReceivables.Notes = pOperationVehicleList[i].ChassisNumber + ": From " + pOperationVehicleList[i].PreviousCutOffDate.ToString("dd/MM/yyyy") + " To " + _ItemCutOffDate; //+ (pOperationVehicleList[i].PickupWithoutInvoiceDate == DateTime.MinValue ? "(Pickup)" : "");

                        objCVarReceivables.IssueDate = DateTime.Now;

                        objCVarReceivables.PreviousCutOffDate = _LastCutoffDate; //pOperationVehicleList[i].PreviousCutOffDate;
                        objCVarReceivables.CutOffDate = DateTime.ParseExact(pVehicleCutOffDate + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture); //DateTime.ParseExact(_ItemCutOffDate + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture);
                        objCVarReceivables.ReceiptDate = DateTime.Parse("01/01/1900");
                        objCVarReceivables.ReceiptNo = "";
                        objCVarReceivables.TariffID = 0;
                        objCVarReceivables.ManualChargeType = "0";
                        objCVarReceivables.CostCenterId = 0;
                        objCVarReceivables.IsOfficial = false;
                        objCVarReceivables.crmCode = "";

                        objCVarReceivables.ModificatorUserID = WebSecurity.CurrentUserId;
                        objCVarReceivables.ModificationDate = DateTime.Now;

                        CReceivables objCReceivables = new CReceivables();
                        objCReceivables.lstCVarReceivables.Add(objCVarReceivables);
                        checkException = objCReceivables.SaveMethod(objCReceivables.lstCVarReceivables);
                        groupedReceivablesID += "," + objCVarReceivables.ID;
                    

                        #endregion Save grouped Receivable item

                        CvwOperationPartners objCvwOperationPartners = new CvwOperationPartners();
                        checkException = objCvwOperationPartners.GetListPaging(999999, 1, "WHERE OperationID=" + pOperationIDList[j].OperationID + " AND PartnerName=N'" + pOperationIDList[j].CustomerName + "'", "ID", out _RowCount);
                        CVarInvoices objCVarInvoices = new CVarInvoices();
                        objCVarInvoices.InvoiceNumber = 0;
                        objCVarInvoices.OperationID = pOperationIDList[j].OperationID;
                        objCVarInvoices.OperationPartnerID = objCvwOperationPartners.lstCVarvwOperationPartners[0].ID;
                        objCVarInvoices.AddressID = 0; //pAddressID;
                        objCVarInvoices.InvoiceTypeID = objCInvoiceTypes.lstCVarInvoiceTypes[0].ID;
                        objCVarInvoices.PrintedAddress = objCvwOperationPartners.lstCVarvwOperationPartners[0].Address; //"0";
                        objCVarInvoices.CustomerReference = "0";
                        objCVarInvoices.PaymentTermID = pPaymentTermID;
                        objCVarInvoices.CurrencyID = _CurrencyID;
                        objCVarInvoices.ExchangeRate = _ExchangeRate;
                        objCVarInvoices.InvoiceDate = DateTime.ParseExact(pVehicleCutOffDate + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture); //pInvoiceIssueDate;
                        objCVarInvoices.DueDate = DateTime.ParseExact(pVehicleCutOffDate + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture); //pInvoiceDueDate;
                        objCVarInvoices.AmountWithoutVAT = 0; //pAmountWithoutVAT;
                        objCVarInvoices.TaxTypeID = 0; //pTaxTypeID;
                        objCVarInvoices.TaxPercentage = 0; //pTaxPercentage;
                        objCVarInvoices.TaxAmount = 0; //pTaxAmount;
                        objCVarInvoices.DiscountTypeID = 0; //pDiscountTypeID;
                        objCVarInvoices.DiscountPercentage = 0; //pDiscountPercentage;
                        objCVarInvoices.DiscountAmount = 0; //pDiscountAmount;
                        objCVarInvoices.FixedDiscount = 0; //pFixedDiscount;
                        objCVarInvoices.Amount = 0; //pAmount;
                                                    //objCVarInvoices.PaidAmount = pPaidAmount;
                                                    //objCVarInvoices.RemainingAmount = pRemainingAmount;
                        objCVarInvoices.InvoiceStatusID = 1;
                        objCVarInvoices.IsApproved = false;
                        objCVarInvoices.LeftSignature = "0";
                        objCVarInvoices.MiddleSignature = "0";
                        objCVarInvoices.RightSignature = "0";
                        objCVarInvoices.GRT = "0";
                        objCVarInvoices.DWT = "0";
                        objCVarInvoices.NRT = "0";
                        objCVarInvoices.LOA = "0";
                        objCVarInvoices.EditableNotes = "0";
                        objCVarInvoices.OperationContainersAndPackagesID = 0; //pTankID;
                        objCVarInvoices.TransactionTypeID = pTransactionTypeID;

                        objCVarInvoices.Notes = "CutOff on " + pVehicleCutOffDate;
                        objCVarInvoices.CutOffDate = DateTime.ParseExact(pVehicleCutOffDate + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture);
                        objCVarInvoices.Is3PL = true;

                        objCVarInvoices.CreatorUserID = objCVarInvoices.ModificatorUserID = WebSecurity.CurrentUserId;
                        objCVarInvoices.CreationDate = objCVarInvoices.ModificationDate = DateTime.Now;
                        objCVarInvoices.TariffID = 0;
                        objCVarInvoices.OnBehalfName = "";
                        objCVarInvoices.PortalOperationPartnerID = objCvwOperationPartners.lstCVarvwOperationPartners[0].ID;
                        objCVarInvoices.StorageFromDate = DateTime.Parse("01/01/1900");
                        objCVarInvoices.StorageToDate = DateTime.Parse("01/01/1900");
                        objCVarInvoices.USDPerContainer = 0;
                        objCVarInvoices.PartnerVATNumber = "0";

                        CInvoices objCInvoices = new CInvoices();
                        objCInvoices.lstCVarInvoices.Add(objCVarInvoices);
                        checkException = objCInvoices.SaveMethod(objCInvoices.lstCVarInvoices);

                        checkException = objCReceivables.UpdateList("InvoiceID_3PL=" + objCVarInvoices.ID + " WHERE ID IN(" + _ReceivablesIDs + ")"); //just for printing
                        checkException = objCReceivables.UpdateList("InvoiceID=" + objCVarInvoices.ID + " WHERE ID IN(" + groupedReceivablesID + ")"); //for eInvoice and approving

                        //Remove vat from receivables if the invoice type has RemoveVat = true
                        objCInvoiceTypes.GetItem(objCVarInvoices.InvoiceTypeID);
                        if (objCInvoiceTypes.lstCVarInvoiceTypes.Count > 0 ? objCInvoiceTypes.lstCVarInvoiceTypes[0].RemoveVat : false)
                        {
                            objCReceivables.UpdateList("TaxeTypeID = null,TaxAmount = 0, TaxPercentage = 0,SaleAmount = AmountWithoutVAT WHERE InvoiceID = " + objCVarInvoices.ID);
                        }

                        _InvoiceIDs += "," + objCVarInvoices.ID;
                        #region Update Invoice totals at server side to fix any connection problem
                        string pUpdateClause = "";
                        //SET AmountWithoutVAT
                        pUpdateClause = " AmountWithoutVAT = ROUND((SELECT SUM(ISNULL(SalePrice,0) * ISNULL(Quantity,1))-" + 0 /*pFixedDiscount*/ + " FROM Receivables WHERE InvoiceID = " + objCVarInvoices.ID.ToString() + " AND IsDeleted=0),2)";
                        pUpdateClause += " WHERE ID = " + objCVarInvoices.ID.ToString();
                        checkException = objCInvoices.UpdateList(pUpdateClause);
                        //SET Tax, Discount & Total Amount after setting the AmountWithVAT
                        pUpdateClause = " TaxAmount = ROUND((ISNULL(AmountWithoutVAT, 0) * ISNULL(TaxPercentage, 0) / 100),2)";
                        pUpdateClause += " , DiscountAmount = ROUND((ISNULL(AmountWithoutVAT, 0) * ISNULL(DiscountPercentage, 0) / 100),2)";
                        if (objCDefaults.lstCVarDefaults[0].IsTaxOnItems)
                            pUpdateClause += " , Amount = - ROUND((ISNULL(AmountWithoutVAT, 0) * ISNULL(DiscountPercentage, 0) / 100),2) + ROUND((SELECT SUM(ISNULL(SaleAmount,0))-" + 0 /*pFixedDiscount*/ + " FROM Receivables WHERE InvoiceID = " + objCVarInvoices.ID.ToString() + " AND IsDeleted=0),2)";
                        else
                            pUpdateClause += " , Amount = ROUND((ISNULL(AmountWithoutVAT, 0) + ROUND( (ISNULL(AmountWithoutVAT, 0) * ISNULL(TaxPercentage, 0) / 100),2) - ROUND((ISNULL(AmountWithoutVAT, 0) * ISNULL(DiscountPercentage, 0) / 100),2)),2)";
                        pUpdateClause += " WHERE ID = " + objCVarInvoices.ID.ToString();
                        checkException = objCInvoices.UpdateList(pUpdateClause);
                        #endregion Update Invoice totals at server side to fix any connection problem
                    }
                    #endregion InvoiceHeader
                }
                else
                    _ReturnedMessage = "No valid contract.";
            } //for (int j = 0; j < pOperationIDList.Count; j++)
            #region Get Invoices To be printed
            CvwOperations objCvwOperations = new CvwOperations();
            CvwInvoices objCvwInvoices = new CvwInvoices();
            CvwReceivables objCvwReceivables = new CvwReceivables();
            if (_OperationIDs != "0" && _ReturnedMessage == "")
            {
                checkException = objCvwOperations.GetListPaging(999999, 1, "WHERE ID IN(" + _OperationIDs + ")", "ID", out _RowCount);
                //_WhereClause = "WHERE IsDeleted=0" + " \n";
                //_WhereClause += "   AND Is3PL=1" + " \n";
                //_WhereClause += "   AND OperationID IN(" + _OperationIDs + ")" + " \n";
                //_WhereClause += "   AND DATEDIFF(DAY,'" + DateTime.ParseExact(pVehicleCutOffDate + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture) + "',CutOffDate) > 0" + " \n";
                //_WhereClause += "   AND DATEDIFF(DAY,'" + DateTime.ParseExact(pVehicleCutOffDate + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture) + "',CutOffDate) < 31" + " \n";
                //checkException = objCvwInvoices.GetListPaging(999999, 1, _WhereClause, "ID", out _RowCount);
                checkException = objCvwInvoices.GetListPaging(999999, 1, "WHERE ID IN(" + _InvoiceIDs + ")", "ID", out _RowCount);
                if (objCvwInvoices.lstCVarvwInvoices.Count == 0)
                    _ReturnedMessage = "No applicable invoices.";
                else for (int i = 0; i < objCvwInvoices.lstCVarvwInvoices.Count; i++)
                    _InvoiceNumbers += "," + objCvwInvoices.lstCVarvwInvoices[i].InvoiceNumber + "(" + objCvwInvoices.lstCVarvwInvoices[i].Amount + " "+ objCvwInvoices.lstCVarvwInvoices[i].CurrencyCode + ") \n";
                ////to be printed from InvoiceApproval
                //checkException = objCvwReceivables.GetListPaging(999999, 1, "WHERE InvoiceID IN(" + _InvoiceIDs + ")", "ID", out _RowCount);
            }
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            #endregion Get Invoices To be printed
            return new object[]
            {
                _ReturnedMessage
                , serializer.Serialize(objCvwOperations.lstCVarvwOperations) //pData[1]
                , serializer.Serialize(objCvwInvoices.lstCVarvwInvoices) //pData[2]
                , null //serializer.Serialize(objCvwReceivables.lstCVarvwReceivables) //pData[3] //to be printed from InvoiceApproval
                , _InvoiceNumbers //pData[4]
            };
        }

        [HttpGet, HttpPost]
        public object[] VehicleCutOff_PreviewInvoice(string pVehicleCutOffDate_PreviewInvoice, int pCutoffCustomerID, int pTransactionTypeID
            , int pPaymentTermID, int pTaxTypeID, decimal pTaxPercentage, string pChassisNumber)
        {

            string _ReturnedMessage = "";
            Exception checkException = null;
            int _RowCount = 0;
            string _OperationIDs = "0";
            string _InvoiceIDs = "0";

            var constContractDetailsTypeNONE = 10;
            //var constContractDetailsTypeIN = 20;
            //var constContractDetailsTypeOUT = 30;
            //var constContractDetailsTypeINAndOUT = 40;

            var constVehicleActionReceive = 45;


            CReceivables_Preview objCReceivables_temp = new CReceivables_Preview();
            checkException = objCReceivables_temp.DeleteList("");

            int _PreviousMonth = int.Parse(pVehicleCutOffDate_PreviewInvoice.Split('/')[1].Split('/')[0]);
            int _PreviousMonthDays = 0;
            _PreviousMonth = _PreviousMonth == 1 ? 12 : _PreviousMonth - 1;
            if (_PreviousMonth == 4 || _PreviousMonth == 6 || _PreviousMonth == 9 || _PreviousMonth == 11)
                _PreviousMonthDays = 30;
            else if (_PreviousMonth == 1 || _PreviousMonth == 3 || _PreviousMonth == 5 || _PreviousMonth == 7 || _PreviousMonth == 8
                 || _PreviousMonth == 10 || _PreviousMonth == 12)
                _PreviousMonthDays = 31;
            else if (DateTime.IsLeapYear(DateTime.Now.Year))
                _PreviousMonthDays = 29;
            else
                _PreviousMonthDays = 28;

            CDefaults objCDefaults = new CDefaults();
            objCDefaults.GetListPaging(999999, 1, "WHERE 1=1", "ID", out _RowCount);
            CInvoiceTypes objCInvoiceTypes = new CInvoiceTypes();
            checkException = objCInvoiceTypes.GetListPaging(999999, 1, "WHERE Code LIKE N'INV%'", "ID", out _RowCount);
            string _WhereClause = "";
            DateTime _LastCutoffDate = DateTime.ParseExact(pVehicleCutOffDate_PreviewInvoice + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture).AddMonths(-1); //This will get day 20
            string _strLastCutoffDate = _LastCutoffDate.ToString("yyyyMMdd");
            
            #region Get Applicable Vehicles
            //_WhereClause = "WHERE CAST(PreviousCutOffDate AS DATE) >= DATEADD(DAY," + (-_PreviousMonthDays) + ",'" + DateTime.ParseExact(pVehicleCutOffDate_PreviewInvoice + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture) + "') " + "\n"; //Static OpenBalance Date
            _WhereClause = "WHERE 1=1 " + "\n"; //Static OpenBalance Date
            _WhereClause += "AND ( " + "\n";
            _WhereClause += "    CAST(PreviousCutOffDate AS DATE) >= '" + _strLastCutoffDate + "' " + "\n";
            //_WhereClause += "    OR ReceiveDate >= '" + _strLastCutoffDate + "' " + "\n";
            //_WhereClause += "    OR PickupRequiredDate >= '" + _strLastCutoffDate + "' " + "\n";
            _WhereClause += "   ) " + "\n";
            //_WhereClause += "AND (CAST(PickupRequiredDate AS DATE) > DATEADD(DAY," + (-_PreviousMonthDays) + ",'" + DateTime.ParseExact(pVehicleCutOffDate_PreviewInvoice + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture) + "') OR PickupRequiredDate IS NULL)" + "\n"; //Static OpenBalance Date
            _WhereClause += "AND (CAST(PickupRequiredDate AS DATE) > '" + _strLastCutoffDate + "' OR PickupRequiredDate IS NULL)" + "\n"; //Static OpenBalance Date
            //_WhereClause += "AND ReceivablesCount = 0" + "\n";
            _WhereClause += "AND (" + "\n";
            _WhereClause += "      CAST(PreviousCutOffDate AS DATE) <= N'" + DateTime.ParseExact(pVehicleCutOffDate_PreviewInvoice + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture) + "' " + "\n";
            _WhereClause += "   )" + "\n";

            //_WhereClause += "AND (LastReceivableCutOffDate IS NULL OR CAST(PreviousCutOffDate AS DATE) = N'" + DateTime.ParseExact(pVehicleCutOffDate + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture) + "' )" + "\n"; //CutoffDate
            //_WhereClause += "AND CAST(PreviousCutOffDate AS DATE) <= N'" + DateTime.ParseExact(pVehicleCutOffDate + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture) + "' " + "\n"; //CutoffDate

            //_WhereClause += "AND (CAST(PickupWithoutInvoiceDate AS DATE) >= PreviousCutOffDate OR PickupWithoutInvoiceDate IS NULL)" + "\n";
            _WhereClause += "AND (" + " \n";
            _WhereClause += "       (CAST(PickupWithoutInvoiceDate AS DATE) >= CAST(PreviousCutOffDate AS DATE) AND CAST(PickupWithoutInvoiceDate AS DATE) > '" + _strLastCutoffDate + "')" + " \n";
            _WhereClause += "       OR PickupWithoutInvoiceDate IS NULL" + " \n";
            _WhereClause += "    )" + "\n";

            _WhereClause += "AND (" + "\n";
            _WhereClause += "       DATEDIFF(DAY,PreviousCutOffDate,N'" + DateTime.ParseExact(pVehicleCutOffDate_PreviewInvoice + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture) + "') < " + (_PreviousMonthDays + 1) + " OR PickupWithoutInvoiceDate IS NULL" + "\n";
            //_WhereClause += "       OR ReceiveDate >= '" + _strLastCutoffDate + "' " + "\n";
            //_WhereClause += "       OR PickupRequiredDate >= '" + _strLastCutoffDate + "' " + "\n";
            _WhereClause += "   )" + "\n";
            _WhereClause += "AND CustomerID = " + pCutoffCustomerID + "\n";
            if (pChassisNumber != "0")
                _WhereClause += "AND ChassisNumber = N'" + pChassisNumber + "'" + "\n";
            _WhereClause += "AND IsExcluded=0" + " \n"; //"AND ID NOT IN (58718,58720,58721,64122)" + " \n";
            CvwWH_VehicleAgingReport objCvwWH_VehicleAgingReport = new CvwWH_VehicleAgingReport();
            checkException = objCvwWH_VehicleAgingReport.GetListPaging(999999, 1, _WhereClause, "ID", out _RowCount);
            #region Add day for lastcutoff of day 20
            for (int i = 0; i < objCvwWH_VehicleAgingReport.lstCVarvwWH_VehicleAgingReport.Count; i++)
                if (DateTime.Compare(objCvwWH_VehicleAgingReport.lstCVarvwWH_VehicleAgingReport[i].PreviousCutOffDate.Date, _LastCutoffDate) == 0)
                    objCvwWH_VehicleAgingReport.lstCVarvwWH_VehicleAgingReport[i].PreviousCutOffDate = objCvwWH_VehicleAgingReport.lstCVarvwWH_VehicleAgingReport[i].PreviousCutOffDate.AddDays(1);
            #endregion Add day for lastcutoff of day 20
            #endregion Get Applicable Vehicles

            #region Get Distinct OperationIDs
            var pOperationIDList = objCvwWH_VehicleAgingReport.lstCVarvwWH_VehicleAgingReport
                .Select(s => new
                {
                    OperationID = s.OperationID
                    ,
                    CustomerID = s.CustomerID
                    ,
                    CustomerName = s.CustomerName
                })
                .Distinct()
                //.OrderBy(o => o.OperationID)
                .ToList();
            #endregion Get Distinct OperationIDs

            for (int j = 0; j < pOperationIDList.Count; j++)
            {
                #region Put OperationIDs into a string to get printed data at the end
                _OperationIDs += "," + pOperationIDList[j].OperationID;
                #endregion Put OperationIDs into a string to get printed data at the end
                #region Get Contract For Operation Customer
                int _CurrencyID = objCDefaults.lstCVarDefaults[0].CurrencyID;
                decimal _ExchangeRate = 0;
                CWH_Contract objCWH_Contract = new CWH_Contract();
                CWH_ContractDetails objCWH_ContractDetails = new CWH_ContractDetails();
                checkException = objCWH_Contract.GetListPaging(999999, 1, "WHERE (CAST(GETDATE() AS DATE) BETWEEN CAST(FromDate AS DATE) AND ToDate) AND CustomerID=" + pOperationIDList[j].CustomerID, "ID DESC", out _RowCount);
                if (objCWH_Contract.lstCVarWH_Contract.Count > 0)
                {
                    _ExchangeRate = 0;
                    CvwCurrencyDetails objCvwCurrencyDetails = new CvwCurrencyDetails();
                    objCvwCurrencyDetails.GetList("WHERE ID=" + objCWH_Contract.lstCVarWH_Contract[0].CurrencyID
                            + " AND GETDATE() >= DateAdd(hh, 0, DateDiff(dd, 0, FromDate)) "
                            + " AND GETDATE() <= DateAdd(minute,59,DateAdd(hh, 23, DateDiff(dd, 0, ToDate))) "
                            );
                    if (objCvwCurrencyDetails.lstCVarvwCurrencyDetails.Count > 0)
                    {
                        _CurrencyID = objCWH_Contract.lstCVarWH_Contract[0].CurrencyID;
                        _ExchangeRate = objCvwCurrencyDetails.lstCVarvwCurrencyDetails[0].ExchangeRate;
                    }
                    else
                        _ExchangeRate = 1;
                    checkException = objCWH_ContractDetails.GetListPaging(999999, 1, "WHERE TypeID IN (" + constContractDetailsTypeNONE + ") AND ContractID=" + objCWH_Contract.lstCVarWH_Contract[0].ID, "ID", out _RowCount);
                } //if (objCWH_Contract.lstCVarWH_Contract.Count > 0)
                else
                {
                    objCWH_ContractDetails.lstCVarWH_ContractDetails.Clear();
                    _ReturnedMessage = "No valid contract.";
                }
                #endregion Get Contract For Operation Customer
                if (objCWH_ContractDetails.lstCVarWH_ContractDetails.Count > 0 && _ReturnedMessage == "")
                {
                    #region InvoiceDetails
                    string _ReceivablesIDs = "0";
                    var pOperationVehicleList = objCvwWH_VehicleAgingReport.lstCVarvwWH_VehicleAgingReport
                        .Where(s => s.OperationID == pOperationIDList[j].OperationID).ToList();
                    List<Int64> lstVehiclesWithExtraDayAdded = new List<Int64>();
                    for (int i = 0; i < pOperationVehicleList.Count; i++)
                    {
                        DateTime dtpPickupWithoutInvoiceDate = DateTime.ParseExact(pOperationVehicleList[i].PickupWithoutInvoiceDate.ToString("dd/MM/yyyy") + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture);
                        DateTime dtpVehicleCutOffDate = DateTime.ParseExact(pVehicleCutOffDate_PreviewInvoice + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture);

                        //if (dtpPickupWithoutInvoiceDate > dtpVehicleCutOffDate || dtpVehicleCutOffDate == DateTime.Parse("01/01/1900"))
                        //    pOperationVehicleList[i].PickupWithoutInvoiceDate = dtpVehicleCutOffDate;
                        string _ItemCutOffDate = (pOperationVehicleList[i].PickupWithoutInvoiceDate == DateTime.Parse("01/01/1900")
                            ? pVehicleCutOffDate_PreviewInvoice
                            :
                            (dtpPickupWithoutInvoiceDate > dtpVehicleCutOffDate
                            ? pVehicleCutOffDate_PreviewInvoice : pOperationVehicleList[i].PickupWithoutInvoiceDate.ToString("dd/MM/yyyy"))
                            );
                        //int _NumberOfVehicleTransactions = pOperationVehicleList.Where(w => w.OperationVehicleID == pOperationVehicleList[i].ID).Count();
                        //for (int k = 0; k < _NumberOfVehicleTransactions; k++)
                        //{
                        //    if (Math.DivRem(k,2,out _RowCount) == 0)
                        //        pOperationVehicleList.Where(w => w.OperationVehicleID == pOperationVehicleList[i].ID).ToList()[k]
                        //            .IsAddExtraDayForFirstCutOff = true;
                        //    else
                        //        pOperationVehicleList.Where(w => w.OperationVehicleID == pOperationVehicleList[i].ID).ToList()[k]
                        //            .IsAddExtraDayForFirstCutOff = false;
                        //}
                        //pOperationVehicleList.Where(w=>w.OperationVehicleID==9)
                        //    .Select(c => { c.IsAddExtraDayForFirstCutOff = false; return c; }).ToList();
                        //pOperationVehicleList.Select(
                        //    s => s.OperationID == pOperationIDList[j].OperationID 
                        //    && s.OperationVehicleID == pOperationVehicleList[i].OperationVehicleID);
                        int _TotalDaysInMonth = //Total days for the chassis in the month
                            pOperationVehicleList.Where(w => w.OperationVehicleID == pOperationVehicleList[i].ID)
                            .Sum(s => (DateTime.ParseExact(_ItemCutOffDate + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture)
                                        - s.PreviousCutOffDate.Date).Days);
                        int _NumberOfDays = 0; //for current VehicleAgingLine
                        _NumberOfDays = (DateTime.ParseExact(_ItemCutOffDate + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture)
                                        - pOperationVehicleList[i].PreviousCutOffDate.Date).Days;
                        //if _DiffBetweenPreviousCutoffAndStartOfPeriod=0 then first appearance of the chassis in the month so add day(only works for 1 month cutoff becuase will be 0 only for that case)
                        int _DiffBetweenPreviousCutoffAndStartOfPeriod = DateTime.Compare(pOperationVehicleList[i].PreviousCutOffDate.Date, _LastCutoffDate.AddDays(1));
                        //to exclude adding extra day of added in case of picked and received in the first day.
                        bool _IsExtraDayAdded = lstVehiclesWithExtraDayAdded.Contains(pOperationVehicleList[i].OperationVehicleID);

                        //add extra day for receive if first line for vehicle in invoice
                        if (
                                (pOperationVehicleList[i].IsAddExtraDayForFirstCutOff || (_DiffBetweenPreviousCutoffAndStartOfPeriod == 0 && !_IsExtraDayAdded))
                                    && _NumberOfDays < _PreviousMonthDays
                                    && _TotalDaysInMonth < _PreviousMonthDays
                            )
                        {
                            _NumberOfDays += 1;
                            lstVehiclesWithExtraDayAdded.Add(pOperationVehicleList[i].OperationVehicleID);
                        }
                        if (_NumberOfDays > _PreviousMonthDays)
                            _NumberOfDays = _PreviousMonthDays;

                        for (int z = 0; z < objCWH_ContractDetails.lstCVarWH_ContractDetails.Count; z++)
                        {
                            #region Add Receivable
                            CVarReceivables_Preview objCVarReceivables = new CVarReceivables_Preview();
                            objCVarReceivables.CreatorUserID = WebSecurity.CurrentUserId;
                            objCVarReceivables.CreationDate = DateTime.Now;
                            objCVarReceivables.GeneratingQRID = 0;
                            objCVarReceivables.InvoiceID = 0; //objCVarInvoices.ID;
                            objCVarReceivables.AccNoteID = 0;
                            objCVarReceivables.OperationContainersAndPackagesID = 0;
                            objCVarReceivables.HouseBillID = 0;

                            objCVarReceivables.OperationVehicleID = pOperationVehicleList[i].OperationVehicleID;
                            //objCVarReceivables.VehicleAgingReportID = objCvwWH_VehicleAgingReport.lstCVarvwWH_VehicleAgingReport.Count == 0
                            //                                            ? 0
                            //                                            : objCvwWH_VehicleAgingReport.lstCVarvwWH_VehicleAgingReport[0].ID;
                            objCVarReceivables.VehicleAgingReportID = pOperationVehicleList[i].ID;

                            objCVarReceivables.ID = 0;

                            objCVarReceivables.OperationID = pOperationVehicleList[i].OperationID;
                            objCVarReceivables.ChargeTypeID = objCWH_ContractDetails.lstCVarWH_ContractDetails[z].ChargeTypeID;
                            objCVarReceivables.POrC = 0;
                            objCVarReceivables.MeasurementID = 0;
                            objCVarReceivables.ContainerTypeID = 0;
                            objCVarReceivables.SupplierID = 0;
                            objCVarReceivables.Quantity = _NumberOfDays;
                            objCVarReceivables.CostPrice = 0;
                            objCVarReceivables.CostAmount = 0;
                            //objCVarReceivables.SalePrice = Math.Round((_NumberOfDays * objCWH_ContractDetails.lstCVarWH_ContractDetails[z].Rate + objCWH_ContractDetails.lstCVarWH_ContractDetails[z].Cost), 2);
                            objCVarReceivables.SalePrice = objCWH_ContractDetails.lstCVarWH_ContractDetails[z].Rate;

                            objCVarReceivables.AmountWithoutVAT = Math.Round((objCVarReceivables.Quantity * objCVarReceivables.SalePrice), 2);
                            objCVarReceivables.TaxeTypeID = pTaxTypeID;
                            objCVarReceivables.TaxPercentage = pTaxPercentage;
                            objCVarReceivables.TaxAmount = Math.Round(((objCVarReceivables.AmountWithoutVAT * objCVarReceivables.TaxPercentage) / 100), 2);
                            objCVarReceivables.DiscountTypeID = 0;
                            objCVarReceivables.DiscountPercentage = 0;
                            objCVarReceivables.DiscountAmount = 0;

                            objCVarReceivables.SaleAmount = objCVarReceivables.AmountWithoutVAT + objCVarReceivables.TaxAmount;
                            objCVarReceivables.ExchangeRate = _ExchangeRate;
                            objCVarReceivables.CurrencyID = _CurrencyID;
                            objCVarReceivables.Notes = pOperationVehicleList[i].ChassisNumber + ": From " + (pOperationVehicleList[i].PreviousCutOffDate.Day == 20 && pOperationVehicleList[i].PreviousCutOffDate.Month != DateTime.Now.Month ? pOperationVehicleList[i].PreviousCutOffDate.AddDays(1) : pOperationVehicleList[i].PreviousCutOffDate).ToString("dd/MM/yyyy") + " To " + _ItemCutOffDate; //+ (pOperationVehicleList[i].PickupWithoutInvoiceDate == DateTime.MinValue ? "(Pickup)" : "");
                            //objCVarReceivables.Notes = pOperationVehicleList[i].ChassisNumber + ": From " + pOperationVehicleList[i].PreviousCutOffDate.ToString("dd/MM/yyyy") + " To " + _ItemCutOffDate; //+ (pOperationVehicleList[i].PickupWithoutInvoiceDate == DateTime.MinValue ? "(Pickup)" : "");

                            objCVarReceivables.IssueDate = DateTime.Now;
 
                            objCVarReceivables.PreviousCutOffDate = pOperationVehicleList[i].PreviousCutOffDate;
                            objCVarReceivables.CutOffDate = DateTime.ParseExact(_ItemCutOffDate + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture);

                            objCVarReceivables.ModificatorUserID = WebSecurity.CurrentUserId;
                            objCVarReceivables.ModificationDate = DateTime.Now;

                            CReceivables_Preview objCReceivables = new CReceivables_Preview();
                            if (_NumberOfDays > 0)
                            {
                                objCReceivables.lstCVarReceivables_Preview.Add(objCVarReceivables);
                                checkException = objCReceivables.SaveMethod(objCReceivables.lstCVarReceivables_Preview);
                                _ReceivablesIDs += "," + objCVarReceivables.ID;
                            }
                            #endregion Add Receivable
                            #region Set IsPickupAddedToInvoice In WH_ReceiveDetails
                            //if (pOperationVehicleList[i].PickupWithoutInvoiceDate != DateTime.Parse("01/01/1900"))
                            //{
                            //    string _UpdateClause = "";
                            //    CWH_ReceiveDetails objCWH_ReceiveDetails_temp = new CWH_ReceiveDetails();
                            //    _UpdateClause = "IsPickupAddedToInvoice = 1" + " \n";
                            //    _UpdateClause += "WHERE ID = " + pOperationVehicleList[i].ID;
                            //    checkException = objCWH_ReceiveDetails_temp.UpdateList(_UpdateClause);
                            //}
                            #endregion Set IsPickupAddedToInvoice In WH_ReceiveDetails
                        } //for (int z = 0; z < objCWH_ContractDetails.lstCVarWH_ContractDetails.Count; z++)
                    } //for (int i = 0; i < pOperationVehicleList.Count; i++)
                    #endregion InvoiceDetails
                    #region InvoiceHeader
                    if (_ReceivablesIDs != "0") //Items exists so insert InvoiceHeader
                    {
                        CvwOperationPartners objCvwOperationPartners = new CvwOperationPartners();
                        checkException = objCvwOperationPartners.GetListPaging(999999, 1, "WHERE OperationID=" + pOperationIDList[j].OperationID + " AND PartnerName=N'" + pOperationIDList[j].CustomerName + "'", "ID", out _RowCount);
                        CVarInvoices_Preview objCVarInvoices = new CVarInvoices_Preview();
                        objCVarInvoices.InvoiceNumber = 0;
                        objCVarInvoices.OperationID = pOperationIDList[j].OperationID;
                        objCVarInvoices.OperationPartnerID = objCvwOperationPartners.lstCVarvwOperationPartners[0].ID;
                        objCVarInvoices.AddressID = 0; //pAddressID;
                        objCVarInvoices.InvoiceTypeID = objCInvoiceTypes.lstCVarInvoiceTypes[0].ID;
                        objCVarInvoices.PrintedAddress = objCvwOperationPartners.lstCVarvwOperationPartners[0].Address; //"0";
                        objCVarInvoices.CustomerReference = "0";
                        objCVarInvoices.PaymentTermID = pPaymentTermID;
                        objCVarInvoices.CurrencyID = _CurrencyID;
                        objCVarInvoices.ExchangeRate = _ExchangeRate;
                        objCVarInvoices.InvoiceDate = DateTime.ParseExact(pVehicleCutOffDate_PreviewInvoice + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture); //pInvoiceIssueDate;
                        objCVarInvoices.DueDate = DateTime.ParseExact(pVehicleCutOffDate_PreviewInvoice + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture); //pInvoiceDueDate;
                        objCVarInvoices.AmountWithoutVAT = 0; //pAmountWithoutVAT;
                        objCVarInvoices.TaxTypeID = 0; //pTaxTypeID;
                        objCVarInvoices.TaxPercentage = 0; //pTaxPercentage;
                        objCVarInvoices.TaxAmount = 0; //pTaxAmount;
                        objCVarInvoices.DiscountTypeID = 0; //pDiscountTypeID;
                        objCVarInvoices.DiscountPercentage = 0; //pDiscountPercentage;
                        objCVarInvoices.DiscountAmount = 0; //pDiscountAmount;
                        objCVarInvoices.FixedDiscount = 0; //pFixedDiscount;
                        objCVarInvoices.Amount = 0; //pAmount;
                                                    //objCVarInvoices.PaidAmount = pPaidAmount;
                                                    //objCVarInvoices.RemainingAmount = pRemainingAmount;
                        objCVarInvoices.InvoiceStatusID = 1;
                        objCVarInvoices.IsApproved = false;
                        objCVarInvoices.LeftSignature = "0";
                        objCVarInvoices.MiddleSignature = "0";
                        objCVarInvoices.RightSignature = "0";
                        objCVarInvoices.GRT = "0";
                        objCVarInvoices.DWT = "0";
                        objCVarInvoices.NRT = "0";
                        objCVarInvoices.LOA = "0";
                        objCVarInvoices.EditableNotes = "0";
                        objCVarInvoices.OperationContainersAndPackagesID = 0; //pTankID;
                        objCVarInvoices.TransactionTypeID = pTransactionTypeID;

                        objCVarInvoices.Notes = "CutOff on " + pVehicleCutOffDate_PreviewInvoice;
                        objCVarInvoices.CutOffDate = DateTime.ParseExact(pVehicleCutOffDate_PreviewInvoice + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture);
                        objCVarInvoices.Is3PL = true;

                        objCVarInvoices.CreatorUserID = objCVarInvoices.ModificatorUserID = WebSecurity.CurrentUserId;
                        objCVarInvoices.CreationDate = objCVarInvoices.ModificationDate = DateTime.Now;

                        CInvoices_Preview objCInvoices = new CInvoices_Preview();
                        objCInvoices.lstCVarInvoices_Preview.Add(objCVarInvoices);
                        checkException = objCInvoices.SaveMethod(objCInvoices.lstCVarInvoices_Preview);
                        CReceivables_Preview objCReceivables = new CReceivables_Preview();
                        checkException = objCReceivables.UpdateList("InvoiceID=" + objCVarInvoices.ID + " WHERE ID IN(" + _ReceivablesIDs + ")");
                        _InvoiceIDs += "," + objCVarInvoices.ID;
                        #region Update Invoice totals at server side to fix any connection problem
                        string pUpdateClause = "";
                        //SET AmountWithoutVAT
                        pUpdateClause = " AmountWithoutVAT = ROUND((SELECT SUM(ISNULL(SalePrice,0) * ISNULL(Quantity,1))-" + 0 /*pFixedDiscount*/ + " FROM Receivables WHERE InvoiceID = " + objCVarInvoices.ID.ToString() + " AND IsDeleted=0),2)";
                        pUpdateClause += " WHERE ID = " + objCVarInvoices.ID.ToString();
                        checkException = objCInvoices.UpdateList(pUpdateClause);
                        //SET Tax, Discount & Total Amount after setting the AmountWithVAT
                        pUpdateClause = " TaxAmount = ROUND((ISNULL(AmountWithoutVAT, 0) * ISNULL(TaxPercentage, 0) / 100),2)";
                        pUpdateClause += " , DiscountAmount = ROUND((ISNULL(AmountWithoutVAT, 0) * ISNULL(DiscountPercentage, 0) / 100),2)";
                        if (objCDefaults.lstCVarDefaults[0].IsTaxOnItems)
                            pUpdateClause += " , Amount = - ROUND((ISNULL(AmountWithoutVAT, 0) * ISNULL(DiscountPercentage, 0) / 100),2) + ROUND((SELECT SUM(ISNULL(SaleAmount,0))-" + 0 /*pFixedDiscount*/ + " FROM Receivables WHERE InvoiceID = " + objCVarInvoices.ID.ToString() + " AND IsDeleted=0),2)";
                        else
                            pUpdateClause += " , Amount = ROUND((ISNULL(AmountWithoutVAT, 0) + ROUND( (ISNULL(AmountWithoutVAT, 0) * ISNULL(TaxPercentage, 0) / 100),2) - ROUND((ISNULL(AmountWithoutVAT, 0) * ISNULL(DiscountPercentage, 0) / 100),2)),2)";
                        pUpdateClause += " WHERE ID = " + objCVarInvoices.ID.ToString();
                        checkException = objCInvoices.UpdateList(pUpdateClause);
                        #endregion Update Invoice totals at server side to fix any connection problem
                    }
                    #endregion InvoiceHeader
                }
                else
                    _ReturnedMessage = "No valid contract.";
            } //for (int j = 0; j < pOperationIDList.Count; j++)
            #region Get Invoices To be printed
            CvwOperations objCvwOperations = new CvwOperations();
            CInvoices_Preview objCvwInvoices = new CInvoices_Preview();
            CvwReceivables_Preview objCvwReceivables = new CvwReceivables_Preview();
            if (_OperationIDs != "0" && _ReturnedMessage == "")
            {
                checkException = objCvwOperations.GetListPaging(999999, 1, "WHERE ID IN(" + _OperationIDs + ")", "ID", out _RowCount);
                //_WhereClause = "WHERE IsDeleted=0" + " \n";
                //_WhereClause += "   AND Is3PL=1" + " \n";
                //_WhereClause += "   AND OperationID IN(" + _OperationIDs + ")" + " \n";
                //_WhereClause += "   AND DATEDIFF(DAY,'" + DateTime.ParseExact(pVehicleCutOffDate + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture) + "',CutOffDate) > 0" + " \n";
                //_WhereClause += "   AND DATEDIFF(DAY,'" + DateTime.ParseExact(pVehicleCutOffDate + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture) + "',CutOffDate) < 31" + " \n";
                //checkException = objCvwInvoices.GetListPaging(999999, 1, _WhereClause, "ID", out _RowCount);
                checkException = objCvwInvoices.GetListPaging(999999, 1, "WHERE ID IN(" + _InvoiceIDs + ")", "ID", out _RowCount);
                if (objCvwInvoices.lstCVarInvoices_Preview.Count == 0)
                    _ReturnedMessage = "No applicable invoices.";
                //string _InvoiceIDs = "0";
                //for (int i = 0; i < objCvwInvoices.lstCVarvwInvoices.Count; i++)
                //    _InvoiceIDs += "," + objCvwInvoices.lstCVarvwInvoices[i].ID;
                checkException = objCvwReceivables.GetListPaging(999999, 1, "WHERE InvoiceID IN(" + _InvoiceIDs + ")", "ID", out _RowCount);
            }
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            #endregion Get Invoices To be printed
            return new object[]
            {
                _ReturnedMessage
                , serializer.Serialize(objCvwOperations.lstCVarvwOperations) //pData[1]
                , serializer.Serialize(objCvwInvoices.lstCVarInvoices_Preview) //pData[2]
                , serializer.Serialize(objCvwReceivables.lstCVarvwReceivables_Preview) //pData[3]
            };
        }

        [HttpGet, HttpPost]
        public object[] VehicleCutOff_UndoAging(string pCutoffDateToUndoAging)
        {
            string _ReturnedMessage = "";
            int _RowCount = 0;
            Exception checkException = null;
            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
            
            Int32 Count = 0;
            DataTable dtCount = objCCustomizedDBCall.ExecuteQuery_DataTable(@"CheckIfProcedureIsRunning 'IST_GBL_InsertIntoVehicleAgingReport' ");
            if (dtCount.Rows.Count > 0)
                Count = Convert.ToInt32(dtCount.Rows[0]["IsRunning"].ToString());

            if (Count > 0)
                _ReturnedMessage = "Read Aging Already Running ";

            if(_ReturnedMessage == "")
            {
                DateTime UndoDate = DateTime.ParseExact(pCutoffDateToUndoAging + " 00.00.00.000",
                "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture);

                checkException = objCCustomizedDBCall.SP_IST_Proc("IST_UndoAging", UndoDate);
            }
            

            if (checkException != null)
                _ReturnedMessage = checkException.Message;

            return new object[] {
                _ReturnedMessage
            };
        }

        [HttpGet, HttpPost]
        public object[] VehicleCutOff_POReceipt(string pCutoffDateToPOReceipt)
        {
            string _ReturnedMessage = "";
            int _RowCount = 0;
            Exception checkException = null;
            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();

            Int32 Count = 0;
            DataTable dtCount = objCCustomizedDBCall.ExecuteQuery_DataTable(@"CheckIfProcedureIsRunning 'IST_GBL_InsertIntoOperationVehicle' ");
            if (dtCount.Rows.Count > 0)
                Count = Convert.ToInt32(dtCount.Rows[0]["IsRunning"].ToString());

            if (Count > 0)
                _ReturnedMessage = "PO Receipt Already Running ";

            if(_ReturnedMessage == "")
              checkException = objCCustomizedDBCall.SP_IST_Proc("IST_GBL_InsertIntoOperationVehicle");

            if (checkException != null)
                _ReturnedMessage = checkException.Message;

            return new object[] {
                _ReturnedMessage
            };
        }

        [HttpGet, HttpPost]
        public object[] VehicleCutOff_ReadAging(string pCutoffDateToReadAging)
        {
            string _ReturnedMessage = "";
            int _RowCount = 0;
            Exception checkException = null;

            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();

            Int32 Count = 0;
            DataTable dtCount = objCCustomizedDBCall.ExecuteQuery_DataTable(@"CheckIfProcedureIsRunning 'IST_GBL_InsertIntoVehicleAgingReport' ");
            if (dtCount.Rows.Count > 0)
                Count = Convert.ToInt32(dtCount.Rows[0]["IsRunning"].ToString());

            if (Count > 0)
                _ReturnedMessage = "Read Aging Already Running ";
            if(_ReturnedMessage == "")
            {
                DateTime DateToReadAging = DateTime.ParseExact(pCutoffDateToReadAging + " 00.00.00.000",
              "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture);


                checkException = objCCustomizedDBCall.SP_IST_Proc("IST_GBL_InsertIntoVehicleAgingReport"
               , DateToReadAging);
            }
           
            //checkException = objCCustomizedDBCall.SP_IST_Proc("IST_GBL_InsertPO_IntoVehicleAction"
            //    , DateToReadAging);


            if (checkException != null)
                _ReturnedMessage = checkException.Message;

            return new object[] {
                _ReturnedMessage
            };
        }
        #endregion VehicleCutOff

        #region Customized SQL

        [HttpGet, HttpPost]
        public Object[] RunMaualSQL(string pSQLStatement)
        {
            string ReturnedMessage = "";
            //string myString = "";

            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();

            //DataTable dt = objCCustomizedDBCall.ExecuteQuery_DataTable(pSQLStatement);

            //if (dt.Rows.Count > 0)
            //{
            //    for (int i = 0; i < dt.Rows.Count; i++)
            //    {
            //        myString +=  dt.Rows[i][0].ToString() + dt.Rows[i][1].ToString() + "\n";
            //    }
            //}

            try
            {
                objCCustomizedDBCall.ExecuteQuery_DataTable(pSQLStatement);
            }
            catch (Exception ex)
            {
                ReturnedMessage = ex.Message;
            }
            //dt.AsEnumerable().ToList();
            //var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[] { ReturnedMessage };

        }
        #endregion
    }

    public class InsertVehicleFromExcel
    {
        public Int64 pOperationID { get; set; }
        public string pBrandList { get; set; }
        public string pModelList { get; set; }
        public string pColorList { get; set; }
        public string pBodyList { get; set; }
        public string pModelYearList { get; set; }
        public string pManufactureCountryList { get; set; }
        public string pEngineDisplacementList { get; set; }

        public string pConditionList { get; set; }
        public string pKilometersList { get; set; }
        public string pChassisNoList { get; set; }
        public string pEngineType { get; set; }
        public string pEureOneList { get; set; }
        public string pDealerList { get; set; }
        public string pDealerLocationList { get; set; }
        public string pNotesList { get; set; }
        public string pPanoramicRoofList { get; set; }
        public string pInteriorColorList { get; set; }
        public string pDriverSeatList { get; set; }
        public string pNumOfDoorsList { get; set; }
        public string pKeylessEntryList { get; set; }


    }
    public class SaveVehicleActionParameters
    {
        public string pOperationVehicleIDsList { get; set; }
        public Int64 pOperationID { get; set; }
        public Int32 pVehicleActionID { get; set; }
        public string pActionDate { get; set; }
        public string pInspectionNotes { get; set; }
        public Int32 pWarehouseID { get; set; }
        public Int32 pRowLocationID { get; set; }
    }
    public class SaveVehicleActionDetailsParameters
    {
        public string pIsInsertList { get; set; }
        public string pOperationVehicleIDList { get; set; }
        public string pActionDateList { get; set; }
        public string pInspectionNotesList { get; set; }
        public string pFromWarehouseIDList { get; set; }
        public string pToWarehouseIDList { get; set; }
        public string pLineList { get; set; }
        public string pCodeSerialList { get; set; }
        public string pIsCancelledList { get; set; }
        public Int32 pTruckerID { get; set; }
        public Int32 pWarehouseID { get; set; }
        public Int32 pVehicleActionID { get; set; }
        public string pReceiveDetailsIDList { get; set; }
    }

    public class VehicleDetails
    {
        public Int32 pID { get; set; }
        public Int64 pOperationID { get; set; }
        public string pVehicleBrand { get; set; }
        public string pVehicleModel { get; set; }
        public string pVehicleColor { get; set; }
        public string pVehicleBody { get; set; }
        public Int32 pVehicleModelYear { get; set; }
        public Int32 pVehicleManufactureYear { get; set; }
        public bool pIsEuroOne { get; set; }
        public bool pIsImportApproval { get; set; }
        public bool pIsDisabilityLetter { get; set; }
        public string pVehicleManufactureCountry { get; set; }
        public string pVehicleCondition { get; set; }
        public string pVehicleEngineType { get; set; }
        public Int32 pVehicleEngineDisplacement { get; set; }
        public Int32 pVehicleKilometers { get; set; }
        public string pVehicleConfigCode { get; set; }
        public string pVehicleChassisNo { get; set; }
        public string pVehicleACID { get; set; }
        public decimal pVehiclePriceWebsite { get; set; }
        public decimal pVehiclePriceContract { get; set; }
        public string pVehicleDealerName { get; set; }
        public string pVehicleDealerLocation { get; set; }
        public string pVehicleNotes { get; set; }
        public string pInteriorColorName { get; set; }
        public bool pIsPanoramicRoof { get; set; }
        public bool pIsElectricSeats { get; set; }
        public bool pIsCamera { get; set; }
        public bool pIsKeylessEntry { get; set; }
        public bool pIsParkingAids { get; set; }
        public bool pIsRearCamera { get; set; }
        public string pVehicleImpModel { get; set; }
        public string pVehicleImpCategory { get; set; }
        public Int32 pImpYearOfManufacture { get; set; }
        public string pVehicleImpCountryOfOrigin { get; set; }
        public string pVehicleImpCountryOfResidence { get; set; }
        public bool pImpIsEuroOne { get; set; }
        public bool pIsBillOfLading { get; set; }
        public string pBillOfLadingDate { get; set; }
        public bool pIsEuroOneCertificate { get; set; }
        public string pEuroOneCertificateDate { get; set; }
        public bool pIsPowerOfAttorneys { get; set; }
        public string pPowerOfAttorneysDate { get; set; }
        public bool pIsGPSDoc { get; set; }
        public string pGPSDocDate { get; set; }
        public bool pIsTrafficDoc { get; set; }
        public string pTrafficDocDate { get; set; }
        public bool pIsSADDoc { get; set; }
        public string pSADDocDate { get; set; }
        public bool pIsDHL { get; set; }
        public string pDHLDate { get; set; }
        public bool pIsVehicleLicense { get; set; }
        public string pVehicleLicenseDate { get; set; }
        public bool pIsArriveAirport { get; set; }
        public string pArriveAirportDate { get; set; }
        public bool pIsArriveGhandour { get; set; }
        public string pArriveGhandourDate { get; set; }
        public bool pIsPhotos { get; set; }
        public string pPhotosDate { get; set; }
        public decimal pVehicleDownPayment { get; set; }
        public decimal pVehicleApexInvoice { get; set; }
        public string pVehicleEmail { get; set; }
        public string pVehiclePassword { get; set; }
        public string pVehiclePasswordTesla { get; set; }
        public string pVehicleUserNotes { get; set; }

   

    }
}
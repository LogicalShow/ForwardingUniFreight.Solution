// Operations Region ---------------------------------------------------------------
//DirectionType : 1-Import 2-Export 3-Domestic
//TransportType : 1-Ocean 2-Air 3-Inland
//ShipmentType : 1-FCL 2-LCL 3-FTL 4-LTL
using Forwarding.MvcApp.Common;
using Forwarding.MvcApp.Entities.Operations;
using Forwarding.MvcApp.Models.Administration.Settings.Generated;
using Forwarding.MvcApp.Models.ContainerFreightStation.Transactions;
using Forwarding.MvcApp.Models.Customized;
using Forwarding.MvcApp.Models.MasterData.Invoicing.Generated;
using Forwarding.MvcApp.Models.MasterData.Locations.Generated;
using Forwarding.MvcApp.Models.MasterData.Others.Generated;
using Forwarding.MvcApp.Models.MasterData.Partners.Generated;
using Forwarding.MvcApp.Models.MasterData.Trucking.Generated;
using Forwarding.MvcApp.Models.Operations.Operations.Customized;
using Forwarding.MvcApp.Models.Operations.Operations.Generated;
using Forwarding.MvcApp.Models.Warehousing.MasterData.Generated;
using Forwarding.MvcApp.Models.XML;
using MoreLinq;
using Org.BouncyCastle.Asn1.Utilities;
using System;
using System.Diagnostics;
using System.Globalization;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using System.Web.Script.Serialization;
using WebMatrix.WebData;

namespace Forwarding.MvcApp.Controllers.Operations.API_Operations
{
    public class OperationContainersAndPackagesController : ApiController
    {
        //[HttpGet, HttpPost]
        //public Object[] LoadAll(string pWhereClause, Int32 pPageSize, Int32 pPageNumber, string pOrderBy)
        //{
        //    Exception checkException = null;
        //    CvwOperationContainersAndPackages objCvwOperationContainersAndPackages = new CvwOperationContainersAndPackages();
        //    //checkException = objCvwOperationContainersAndPackages.GetList(pWhereClause)
        //    int _RowCount = 0;
        //    checkException = objCvwOperationContainersAndPackages.GetListPaging(pPageSize,pPageNumber, pWhereClause, pOrderBy, out _RowCount);
        //    return new Object[] { new JavaScriptSerializer().Serialize(objCvwOperationContainersAndPackages.lstCVarvwOperationContainersAndPackages) };
        //}

        [HttpGet, HttpPost]
        public object[] LoadWithWhereClause(Int32 pPageNumber, Int32 pPageSize, string pWhereClause, string pOrderBy)
        {
            Exception checkException = null;
            CvwOperationContainersAndPackages objCvwOperationContainersAndPackages = new CvwOperationContainersAndPackages();
            //objCvwOperationPackages.GetList(string.Empty); //GetList() fn loads without paging
            Int32 _RowCount = 0;
            //pSearchKey here is the where clause
            checkException = objCvwOperationContainersAndPackages.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);
            return new Object[] { new JavaScriptSerializer().Serialize(objCvwOperationContainersAndPackages.lstCVarvwOperationContainersAndPackages), _RowCount };
        }
        [HttpGet, HttpPost]
        public object[] LoadAllTanks(Int32 pPageNumber, Int32 pPageSize, string pWhereClauseForTank, string pOrderBy)
        {
            Exception checkException = null;
            Int32 _RowCount = 0;
            CvwOperationContainersAndPackages objCvwOperationContainersAndPackages = new CvwOperationContainersAndPackages();

            checkException = objCvwOperationContainersAndPackages.GetListPaging(pPageSize, pPageNumber, pWhereClauseForTank, pOrderBy, out _RowCount);
            var pTankList = objCvwOperationContainersAndPackages.lstCVarvwOperationContainersAndPackages
                .Select(s => new
                {
                    ID = s.ID
                    ,
                    ContainerTypeCode = s.ContainerTypeCode
                    ,
                    ContainerNumber = s.ContainerNumber
                    ,
                    Code = s.TankOrFlexiNumber
                })
                .Distinct().OrderBy(o => o.Code).ToList();
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[] {
                serializer.Serialize(pTankList)
            };
        }
        [HttpGet, HttpPost]
        public object[] Search(Int32 pPageNumber, Int32 pPageSize, string pWhereClause, string pOrderBy, Int32 pOperationID)
        {
            Exception checkException = null;
            CvwOperationContainersAndPackages objCvwOperationContainersAndPackages = new CvwOperationContainersAndPackages();
            CvwOperations objCvwOperations = new CvwOperations();
            int _TempRowCount = 0;
            objCvwOperations.GetListPaging(99999, 1, "WHERE ID=" + pOperationID, "ID", out _TempRowCount);
            //objCvwOperationPackages.GetList(string.Empty); //GetList() fn loads without paging
            Int32 _RowCount = objCvwOperationContainersAndPackages.lstCVarvwOperationContainersAndPackages.Count;
            //pSearchKey here is the where clause
            checkException = objCvwOperationContainersAndPackages.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);
            return new Object[] { new JavaScriptSerializer().Serialize(objCvwOperationContainersAndPackages.lstCVarvwOperationContainersAndPackages)
                , _RowCount
                , new JavaScriptSerializer().Serialize(objCvwOperations.lstCVarvwOperations[0]) //pData[2]
			};
        }

        [HttpGet, HttpPost]
        public bool Delete(String pOperationContainersAndPackagesIDs)
        {
            bool _result = false;
            int _RowCount = 0;
            Exception checkException = null;
            COperationContainersAndPackages objCOperationContainersAndPackages = new COperationContainersAndPackages();
            checkException = objCOperationContainersAndPackages.GetListPaging(1, 1, "WHERE ID=" + pOperationContainersAndPackagesIDs.Split(',')[0], "ID", out _RowCount);
            Int64 pOperationID = objCOperationContainersAndPackages.lstCVarOperationContainersAndPackages[0].OperationID;

            foreach (var currentID in pOperationContainersAndPackagesIDs.Split(','))
            {
                objCOperationContainersAndPackages.lstDeletedCPKOperationContainersAndPackages.Add(new CPKOperationContainersAndPackages() { ID = Int64.Parse(currentID.Trim()) });
            }

            checkException = objCOperationContainersAndPackages.DeleteItem(objCOperationContainersAndPackages.lstDeletedCPKOperationContainersAndPackages);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("DELETE")) // some or all of the rows were not deleted due to dependencies
                    _result = false;
            }
            else //deleted successfully
            {
                _result = true;
                ShipmentPackage_SetIsPackagesPlacedOnMaster();
            }
            #region Call SetReceivablesQuantity
            SetReceivablesQuantity(pOperationID);
            #endregion Call SetReceivablesQuantity
            return _result;
        }

        //TransportType : 1-Ocean 2-Air 3-Inland
        //ShipmentType : 1-FCL 2-LCL 3-FTL 4-LTL
        [HttpGet, HttpPost]
        public bool InsertList(Int64 pOperationID, string pSelectedIDs, int pShipmentType, int pTransportType)
        {
            bool _result = false;
            string pWhereClause = "";
            Exception checkException = null;
            //building the where clause to select the rows from ChargeTypes
            foreach (var currentID in pSelectedIDs.Split(','))
            {
                //i am sure i ve at least 1 selectedID isa
                pWhereClause += (pWhereClause == "" ? " WHERE ID = " + currentID.ToString()
                    : " OR ID = " + currentID.ToString());
            }
            //ShipmentType : 1-FCL 2-LCL 3-FTL 4-LTL
            //those lines are to get either ContainerTypes or PackageTypes from DB according to pShipmentType and pTransportType

            CContainerTypes objCContainerTypes = new CContainerTypes();
            objCContainerTypes.GetList(pWhereClause);
            CPackageTypes objCPackageTypes = new CPackageTypes();
            objCPackageTypes.GetList(pWhereClause);

            COperationContainersAndPackages objCOperationContainersAndPackages = new COperationContainersAndPackages();
            if (pShipmentType == 1 || pShipmentType == 3) //FCL,FTL //probably this case won't be used coz i dont add Full container by checkboxes
                foreach (var rowContainerType in objCContainerTypes.lstCVarContainerTypes)
                {
                    CVarOperationContainersAndPackages objCVarOperationContainersAndPackages = new CVarOperationContainersAndPackages();

                    objCVarOperationContainersAndPackages.OperationID = pOperationID;
                    objCVarOperationContainersAndPackages.ContainerTypeID = rowContainerType.ID;

                    objCVarOperationContainersAndPackages.ContainerNumber = "0";
                    objCVarOperationContainersAndPackages.CarrierSeal = "0";
                    objCVarOperationContainersAndPackages.ShipperSeal = "0";
                    objCVarOperationContainersAndPackages.IsReefer = false;
                    objCVarOperationContainersAndPackages.IsNOR = false;
                    objCVarOperationContainersAndPackages.IsSentToWarehouse = false;
                    objCVarOperationContainersAndPackages.IsPeriodicTest = false;
                    objCVarOperationContainersAndPackages.LotNumber = "0";
                    objCVarOperationContainersAndPackages.DescriptionOfGoods = "0";
                    objCVarOperationContainersAndPackages.MarksAndNumbers = "0";
                    objCVarOperationContainersAndPackages.Quantity = 1;
                    objCVarOperationContainersAndPackages.PurchaseItemID = 0;
                    objCVarOperationContainersAndPackages.PackageTypeIDOnContainer = 0;
                    objCVarOperationContainersAndPackages.NumberOfPackagesOnContainer = 0;
                    #region ContainerTracking
                    objCVarOperationContainersAndPackages.GateOutPortID = 0;
                    objCVarOperationContainersAndPackages.GateInPortID = 0;
                    objCVarOperationContainersAndPackages.GateOutDate = DateTime.Parse("01/01/1900");
                    objCVarOperationContainersAndPackages.StuffingDate = DateTime.Parse("01/01/1900");
                    objCVarOperationContainersAndPackages.LoadingDate = DateTime.Parse("01/01/1900");
                    objCVarOperationContainersAndPackages.GateOutAndLoadingDatesDifference = 0;
                    objCVarOperationContainersAndPackages.Factory = "0";
                    objCVarOperationContainersAndPackages.ExportBLNumber = "0";
                    objCVarOperationContainersAndPackages.ImportBLNumber = "0";
                    objCVarOperationContainersAndPackages.IsLoaded = false;
                    objCVarOperationContainersAndPackages.IsTracked = false;
                    objCVarOperationContainersAndPackages.IsOwnedByCompany = false;
                    objCVarOperationContainersAndPackages.TrailerID = 0;
                    objCVarOperationContainersAndPackages.DriverID = 0;
                    objCVarOperationContainersAndPackages.DriverAssistantID = 0;
                    objCVarOperationContainersAndPackages.SupplierTrailerName = "0";
                    objCVarOperationContainersAndPackages.SupplierDriverName = "0";
                    objCVarOperationContainersAndPackages.SupplierDriverAssistantName = "0";
                    #endregion ContainerTracking

                    objCVarOperationContainersAndPackages.WeightUnit = "0";
                    objCVarOperationContainersAndPackages.RateClass = "0";

                    #region Tank
                    objCVarOperationContainersAndPackages.TankOrFlexiNumber = "0";
                    objCVarOperationContainersAndPackages.ReturnDepot = "0";
                    objCVarOperationContainersAndPackages.OperatorID = 0;
                    objCVarOperationContainersAndPackages.StatusID = 0;

                    objCVarOperationContainersAndPackages.IsFull = false;
                    objCVarOperationContainersAndPackages.ExitDate = DateTime.Parse("01/01/1900");
                    objCVarOperationContainersAndPackages.ReturnDate = DateTime.Parse("01/01/1900");
                    objCVarOperationContainersAndPackages.TankCertExpiryDate = DateTime.Parse("01/01/1900");
                    objCVarOperationContainersAndPackages.FreeDays = 0;
                    objCVarOperationContainersAndPackages.DayValue = 0;
                    #endregion Tank
                    #region Yard
                    objCVarOperationContainersAndPackages.YardEIRNumber = 0;
                    objCVarOperationContainersAndPackages.YardEIRNumberOut = 0;
                    objCVarOperationContainersAndPackages.YardInDate = DateTime.Parse("01/01/1900");
                    objCVarOperationContainersAndPackages.YardInTime = 0;
                    objCVarOperationContainersAndPackages.YardOutDate = DateTime.Parse("01/01/1900");
                    objCVarOperationContainersAndPackages.YardOutTime = 0;
                    objCVarOperationContainersAndPackages.YardLocationID = 0;
                    objCVarOperationContainersAndPackages.YardIsIn = 0;
                    #endregion Yard

                    objCVarOperationContainersAndPackages.CreatorUserID = objCVarOperationContainersAndPackages.ModificatorUserID = WebSecurity.CurrentUserId;
                    objCVarOperationContainersAndPackages.CreationDate = objCVarOperationContainersAndPackages.ModificationDate = DateTime.Now;

                    objCOperationContainersAndPackages.lstCVarOperationContainersAndPackages.Add(objCVarOperationContainersAndPackages);
                    checkException = objCOperationContainersAndPackages.SaveMethod(objCOperationContainersAndPackages.lstCVarOperationContainersAndPackages);
                    //if (pGeneratingQRID != 0)
                    //{
                    //    COperationContainersAndPackages objCOperationContainersAndPackagesGen = new COperationContainersAndPackages();
                    //    var updateList = "GeneratingQRID=" + pGeneratingQRID + " \n";
                    //    updateList += $"WHERE ID={objCVarOperationContainersAndPackages.ID}";
                    //    checkException = objCOperationContainersAndPackagesGen.UpdateList(updateList);
                    //}
                }
            else // LTL, LCL, air
                foreach (var rowPackageType in objCPackageTypes.lstCVarPackageTypes)
                {
                    CVarOperationContainersAndPackages objCVarOperationContainersAndPackages = new CVarOperationContainersAndPackages();

                    objCVarOperationContainersAndPackages.OperationID = pOperationID;
                    objCVarOperationContainersAndPackages.PackageTypeID = rowPackageType.ID;

                    objCVarOperationContainersAndPackages.ContainerNumber = "0";
                    objCVarOperationContainersAndPackages.CarrierSeal = "0";
                    objCVarOperationContainersAndPackages.ShipperSeal = "0";
                    objCVarOperationContainersAndPackages.IsReefer = false;
                    objCVarOperationContainersAndPackages.IsNOR = false;
                    objCVarOperationContainersAndPackages.IsSentToWarehouse = false;
                    objCVarOperationContainersAndPackages.IsPeriodicTest = false;
                    objCVarOperationContainersAndPackages.IsIMO = false;
                    objCVarOperationContainersAndPackages.LotNumber = "0";
                    objCVarOperationContainersAndPackages.DescriptionOfGoods = "0";
                    objCVarOperationContainersAndPackages.MarksAndNumbers = "0";
                    objCVarOperationContainersAndPackages.Quantity = 1;
                    objCVarOperationContainersAndPackages.PurchaseItemID = 0;
                    objCVarOperationContainersAndPackages.PackageTypeIDOnContainer = 0;
                    objCVarOperationContainersAndPackages.NumberOfPackagesOnContainer = 0;
                    #region ContainerTracking
                    objCVarOperationContainersAndPackages.GateOutPortID = 0;
                    objCVarOperationContainersAndPackages.GateInPortID = 0;
                    objCVarOperationContainersAndPackages.GateOutDate = DateTime.Parse("01/01/1900");
                    objCVarOperationContainersAndPackages.StuffingDate = DateTime.Parse("01/01/1900");
                    objCVarOperationContainersAndPackages.LoadingDate = DateTime.Parse("01/01/1900");
                    objCVarOperationContainersAndPackages.GateOutAndLoadingDatesDifference = 0;
                    objCVarOperationContainersAndPackages.Factory = "0";
                    objCVarOperationContainersAndPackages.ExportBLNumber = "0";
                    objCVarOperationContainersAndPackages.ImportBLNumber = "0";
                    objCVarOperationContainersAndPackages.IsLoaded = false;
                    objCVarOperationContainersAndPackages.IsTracked = false;
                    objCVarOperationContainersAndPackages.IsOwnedByCompany = false;
                    objCVarOperationContainersAndPackages.TrailerID = 0;
                    objCVarOperationContainersAndPackages.DriverID = 0;
                    objCVarOperationContainersAndPackages.DriverAssistantID = 0;
                    objCVarOperationContainersAndPackages.SupplierTrailerName = "0";
                    objCVarOperationContainersAndPackages.SupplierDriverName = "0";
                    objCVarOperationContainersAndPackages.SupplierDriverAssistantName = "0";
                    #endregion ContainerTracking

                    objCVarOperationContainersAndPackages.WeightUnit = "0";
                    objCVarOperationContainersAndPackages.RateClass = "0";

                    #region Tank
                    objCVarOperationContainersAndPackages.TankOrFlexiNumber = "0";
                    objCVarOperationContainersAndPackages.ReturnDepot = "0";
                    objCVarOperationContainersAndPackages.OperatorID = 0;
                    objCVarOperationContainersAndPackages.StatusID = 0;

                    objCVarOperationContainersAndPackages.IsFull = false;
                    objCVarOperationContainersAndPackages.ExitDate = DateTime.Parse("01/01/1900");
                    objCVarOperationContainersAndPackages.ReturnDate = DateTime.Parse("01/01/1900");
                    objCVarOperationContainersAndPackages.TankCertExpiryDate = DateTime.Parse("01/01/1900");
                    objCVarOperationContainersAndPackages.FreeDays = 0;
                    objCVarOperationContainersAndPackages.DayValue = 0;
                    #endregion Tank
                    #region Yard
                    objCVarOperationContainersAndPackages.YardEIRNumber = 0;
                    objCVarOperationContainersAndPackages.YardEIRNumberOut = 0;
                    objCVarOperationContainersAndPackages.YardInDate = DateTime.Parse("01/01/1900");
                    objCVarOperationContainersAndPackages.YardInTime = 0;
                    objCVarOperationContainersAndPackages.YardOutDate = DateTime.Parse("01/01/1900");
                    objCVarOperationContainersAndPackages.YardOutTime = 0;
                    objCVarOperationContainersAndPackages.YardLocationID = 0;
                    objCVarOperationContainersAndPackages.YardIsIn = 0;
                    #endregion Yard

                    objCVarOperationContainersAndPackages.CreatorUserID = objCVarOperationContainersAndPackages.ModificatorUserID = WebSecurity.CurrentUserId;
                    objCVarOperationContainersAndPackages.CreationDate = objCVarOperationContainersAndPackages.ModificationDate = DateTime.Now;
                    objCOperationContainersAndPackages.lstCVarOperationContainersAndPackages.Add(objCVarOperationContainersAndPackages);
                    checkException = objCOperationContainersAndPackages.SaveMethod(objCOperationContainersAndPackages.lstCVarOperationContainersAndPackages);
                    //if (pGeneratingQRID != 0)
                    //{
                    //    COperationContainersAndPackages objCOperationContainersAndPackagesGen = new COperationContainersAndPackages();
                    //    var updateList = "GeneratingQRID=" + pGeneratingQRID + " \n";
                    //    updateList += $"WHERE ID={objCVarOperationContainersAndPackages.ID}";
                    //    checkException = objCOperationContainersAndPackagesGen.UpdateList(updateList);
                    //}
                }
                
            //checkException = objCOperationContainersAndPackages.SaveMethod(objCOperationContainersAndPackages.lstCVarOperationContainersAndPackages);
        
            if (checkException == null)
                _result = true;
            #region Call SetReceivablesQuantity
            SetReceivablesQuantity(pOperationID);
            #endregion Call SetReceivablesQuantity
            return _result;
        }

        [HttpGet, HttpPost]
        public object[] InsertListFromExcel([FromBody] InsertListFromExcel insertListFromExcel)
        {
            bool _result = true;
            Exception checkException = null;
            int _RowCount = 0;
            int _NumberOfRows = insertListFromExcel.pVGMList.Split(',').Length;
            COperationContainersAndPackages objCOperationContainersAndPackages = new COperationContainersAndPackages();
            CContainerTypes objCContainerTypes = new CContainerTypes();
            CPackageTypes objCPackageTypes = new CPackageTypes();
            CvwOperationContainersAndPackages objCvwOperationContainersAndPackages = new CvwOperationContainersAndPackages();
            var _ArrContainerNumber = insertListFromExcel.pContainerNumberList.Split(',');
            var _ArrContainerCode = insertListFromExcel.pContainerTypeCodeList.Split(',');
            var _ArrCarrierSeal = insertListFromExcel.pCarrierSealList.Split(',');
            var _ArrTareWeight = insertListFromExcel.pTareWeightList.Split(',');
            var _ArrVolume = insertListFromExcel.pVolumeList.Split(',');
            var _ArrNetWeight = insertListFromExcel.pNetWeightList.Split(',');
            var _ArrGrossWeight = insertListFromExcel.pGrossWeightList.Split(',');
            var _ArrVGM = insertListFromExcel.pVGMList.Split(',');
            var _ArrDescriptionOfGoods = insertListFromExcel.pDescriptionOfGoodsList.Split(',');
            var _ArrNumberOfPackages = insertListFromExcel.pNumberOfPackagesList.Split(',');
            var _ArrPackageType = insertListFromExcel.pPackageTypeList.Split(',');
            var _ArrTankNumber = insertListFromExcel.pTankNumberList.Split(',');
            for (int i = 0; i < _NumberOfRows; i++)
            {
                objCContainerTypes.GetList("WHERE Code = '" + _ArrContainerCode[i] + "'");
                int _ContainerTypeID = objCContainerTypes.lstCVarContainerTypes.Count > 0 ? objCContainerTypes.lstCVarContainerTypes[0].ID : 0;
                objCPackageTypes.GetList("WHERE Name = N'" + _ArrPackageType[i] + "'");
                int _PackageTypeID = objCPackageTypes.lstCVarPackageTypes.Count > 0 ? objCPackageTypes.lstCVarPackageTypes[0].ID : 0;

                CVarOperationContainersAndPackages objCVarOperationContainersAndPackages = new CVarOperationContainersAndPackages();
                objCVarOperationContainersAndPackages.OperationID = insertListFromExcel.pOperationID;
                objCVarOperationContainersAndPackages.ContainerTypeID = _ContainerTypeID;
                objCVarOperationContainersAndPackages.ContainerNumber = _ArrContainerNumber[i];
                objCVarOperationContainersAndPackages.CarrierSeal = _ArrCarrierSeal[i];
                objCVarOperationContainersAndPackages.TareWeight = decimal.Parse(_ArrTareWeight[i]);
                objCVarOperationContainersAndPackages.Volume = decimal.Parse(_ArrVolume[i]);
                objCVarOperationContainersAndPackages.NetWeight = decimal.Parse(_ArrNetWeight[i]);
                objCVarOperationContainersAndPackages.NetWeightTON = 0;
                objCVarOperationContainersAndPackages.GrossWeight = decimal.Parse(_ArrGrossWeight[i]);
                objCVarOperationContainersAndPackages.GrossWeightTON = 0;
                objCVarOperationContainersAndPackages.VGM = decimal.Parse(_ArrVGM[i]);
                objCVarOperationContainersAndPackages.DescriptionOfGoods = _ArrDescriptionOfGoods[i];
                objCVarOperationContainersAndPackages.NumberOfPackagesOnContainer = int.Parse(_ArrNumberOfPackages[i]);
                objCVarOperationContainersAndPackages.PurchaseItemID = 0;
                objCVarOperationContainersAndPackages.PackageTypeIDOnContainer = _PackageTypeID;

                objCVarOperationContainersAndPackages.ShipperSeal = "0";
                objCVarOperationContainersAndPackages.IsReefer = false;
                objCVarOperationContainersAndPackages.IsNOR = false;
                objCVarOperationContainersAndPackages.IsSentToWarehouse = false;
                objCVarOperationContainersAndPackages.IsPeriodicTest = false;
                objCVarOperationContainersAndPackages.LotNumber = "0";
                objCVarOperationContainersAndPackages.IsIMO = false;
                objCVarOperationContainersAndPackages.MarksAndNumbers = "0";
                objCVarOperationContainersAndPackages.GateOutDate = DateTime.Now;
                objCVarOperationContainersAndPackages.StuffingDate = DateTime.Now;
                objCVarOperationContainersAndPackages.LoadingDate = DateTime.Now;
                objCVarOperationContainersAndPackages.Factory = "0";
                objCVarOperationContainersAndPackages.ExportBLNumber = "0";
                objCVarOperationContainersAndPackages.ImportBLNumber = "0";
                objCVarOperationContainersAndPackages.IsLoaded = false;
                objCVarOperationContainersAndPackages.IsTracked = false;
                objCVarOperationContainersAndPackages.IsAsAgreed = false;
                objCVarOperationContainersAndPackages.IsMinimum = false;
                objCVarOperationContainersAndPackages.WeightUnit = "0";
                objCVarOperationContainersAndPackages.RateClass = "0";

                objCVarOperationContainersAndPackages.IsOwnedByCompany = false;
                objCVarOperationContainersAndPackages.TrailerID = 0;
                objCVarOperationContainersAndPackages.DriverID = 0;
                objCVarOperationContainersAndPackages.DriverAssistantID = 0;
                objCVarOperationContainersAndPackages.SupplierTrailerName = "0";
                objCVarOperationContainersAndPackages.SupplierDriverName = "0";
                objCVarOperationContainersAndPackages.SupplierDriverAssistantName = "0";

                objCVarOperationContainersAndPackages.WeightUnit = "0";
                objCVarOperationContainersAndPackages.RateClass = "0";

                #region Tank
                objCVarOperationContainersAndPackages.TankOrFlexiNumber = _ArrTankNumber[i];
                objCVarOperationContainersAndPackages.ReturnDepot = "0";
                objCVarOperationContainersAndPackages.OperatorID = 0;
                objCVarOperationContainersAndPackages.StatusID = 0;

                objCVarOperationContainersAndPackages.IsFull = false;
                objCVarOperationContainersAndPackages.ExitDate = DateTime.Parse("01/01/1900");
                objCVarOperationContainersAndPackages.ReturnDate = DateTime.Parse("01/01/1900");
                objCVarOperationContainersAndPackages.TankCertExpiryDate = DateTime.Parse("01/01/1900");
                objCVarOperationContainersAndPackages.FreeDays = 0;
                objCVarOperationContainersAndPackages.DayValue = 0;
                #endregion Tank
                #region Yard
                objCVarOperationContainersAndPackages.YardEIRNumber = 0;
                objCVarOperationContainersAndPackages.YardEIRNumberOut = 0;
                objCVarOperationContainersAndPackages.YardInDate = DateTime.Parse("01/01/1900");
                objCVarOperationContainersAndPackages.YardInTime = 0;
                objCVarOperationContainersAndPackages.YardOutDate = DateTime.Parse("01/01/1900");
                objCVarOperationContainersAndPackages.YardOutTime = 0;
                objCVarOperationContainersAndPackages.YardLocationID = 0;
                objCVarOperationContainersAndPackages.YardIsIn = 0;
                #endregion Yard

                objCVarOperationContainersAndPackages.CreatorUserID = objCVarOperationContainersAndPackages.ModificatorUserID = WebSecurity.CurrentUserId;
                objCVarOperationContainersAndPackages.CreationDate = objCVarOperationContainersAndPackages.ModificationDate = DateTime.Now;
                objCOperationContainersAndPackages.lstCVarOperationContainersAndPackages.Add(objCVarOperationContainersAndPackages);
            }

            checkException = objCOperationContainersAndPackages.SaveMethod(objCOperationContainersAndPackages.lstCVarOperationContainersAndPackages);
            if (checkException != null)
            {
                _result = false;
            }
            else
                checkException = objCvwOperationContainersAndPackages.GetListPaging(999999, 1, "WHERE OperationID=" + insertListFromExcel.pOperationID, "ID", out _RowCount);
            #region Call SetReceivablesQuantity
            SetReceivablesQuantity(insertListFromExcel.pOperationID);
            #endregion Call SetReceivablesQuantity
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                _result
                , _result ? serializer.Serialize(objCvwOperationContainersAndPackages.lstCVarvwOperationContainersAndPackages) : null
            };
        }

        //pNumberOfContainers(txtNumberOfContainers) is not saved in DB, its just to decide how many containers to be inserted; between 1 and 50
        [HttpGet, HttpPost]
        public object[] Insert(Int64 pOperationID, Int32 pContainerTypeID, Int32 pNumberOfContainers, Int32 pPackageTypeID, Decimal pLength, Decimal pWidth
            , Decimal pHeight, Decimal pVolume, Decimal pVolumetricWeight, Decimal pNetWeight, Decimal pNetWeightTON, Decimal pGrossWeight, Decimal pGrossWeightTON
            , Decimal pChargeableWeight, Int32 pQuantity, string pContainerNumber, string pCarrierSeal, string pShipperSeal, decimal pTareWeight
            , decimal pVGM, bool pIsReefer, bool pIsNOR, decimal pMinTemp, decimal pMaxTemp, decimal pHumidity, decimal pVentilation, string pLotNumber
            , bool pIsIMO, decimal pIMOClass, int pUNNumber, decimal pFlashPoint, string pDescriptionOfGoods, int pPurchaseItemID, int pPackageTypeIDOnContainer
            , int pNumberOfPackagesOnContainer, Int64 pPlacedOnOCPID, bool pIsSentToWarehouse, bool pIsPeriodicTest, bool pIsLoaded, String pLoadingDate, String pReturnDate, String pTankCertExpiryDate, int pWarehouseID ,string pTankOrFlexiNumber = "", string pFactory="")
        {
            bool _result = false;
            bool _IsRepeted = false;
            int _RowCount = 0;
            CvwOperationContainersAndPackages objCvwOperationContainersAndPackages = new CvwOperationContainersAndPackages();
            CvwOperationContainersAndPackages objCvwOperationContainersAndPackagesCount = new CvwOperationContainersAndPackages();

            CVarOperationContainersAndPackages objCVarOperationContainersAndPackages = new CVarOperationContainersAndPackages();
            CvwOperations objCvwOperations = new CvwOperations();
            Exception checkException = null;

            objCVarOperationContainersAndPackages.OperationID = pOperationID;
            objCVarOperationContainersAndPackages.ContainerTypeID = pContainerTypeID;
            objCVarOperationContainersAndPackages.PackageTypeID = pPackageTypeID;
            objCVarOperationContainersAndPackages.Length = pLength;
            objCVarOperationContainersAndPackages.Width = pWidth;
            objCVarOperationContainersAndPackages.Height = pHeight;
            objCVarOperationContainersAndPackages.Volume = pVolume;
            objCVarOperationContainersAndPackages.VolumetricWeight = pVolumetricWeight;
            objCVarOperationContainersAndPackages.NetWeight = pNetWeight;
            objCVarOperationContainersAndPackages.NetWeightTON = pNetWeightTON;
            objCVarOperationContainersAndPackages.GrossWeight = pGrossWeight;
            objCVarOperationContainersAndPackages.GrossWeightTON = pGrossWeightTON;
            objCVarOperationContainersAndPackages.ChargeableWeight = pChargeableWeight;
            objCVarOperationContainersAndPackages.Quantity = pQuantity; //always comes 0 coz its used with packages
            objCVarOperationContainersAndPackages.TankOrFlexiNumber = pTankOrFlexiNumber;

            if (pNumberOfContainers == 1)
            {
                objCVarOperationContainersAndPackages.ContainerNumber = pContainerNumber;
                objCVarOperationContainersAndPackages.CarrierSeal = pCarrierSeal;
                objCVarOperationContainersAndPackages.ShipperSeal = pShipperSeal;
            }
            else //coz in this case i save many containers and i want those fields to be unique
            {
                objCVarOperationContainersAndPackages.ContainerNumber = "0";
                objCVarOperationContainersAndPackages.CarrierSeal = "0";
                objCVarOperationContainersAndPackages.ShipperSeal = "0";
            }
            objCVarOperationContainersAndPackages.TareWeight = pTareWeight;
            objCVarOperationContainersAndPackages.VGM = pVGM;
            objCVarOperationContainersAndPackages.IsReefer = pIsReefer;
            objCVarOperationContainersAndPackages.IsNOR = pIsNOR;
            objCVarOperationContainersAndPackages.IsSentToWarehouse = pIsSentToWarehouse;
            objCVarOperationContainersAndPackages.IsPeriodicTest = pIsPeriodicTest;
            objCVarOperationContainersAndPackages.MinTemp = pMinTemp;
            objCVarOperationContainersAndPackages.MaxTemp = pMaxTemp;
            objCVarOperationContainersAndPackages.LotNumber = pLotNumber;
            objCVarOperationContainersAndPackages.Humidity = pHumidity;
            objCVarOperationContainersAndPackages.Ventilation = pVentilation;
            objCVarOperationContainersAndPackages.IsIMO = pIsIMO;
            objCVarOperationContainersAndPackages.IMOClass = pIMOClass;
            objCVarOperationContainersAndPackages.UNNumber = pUNNumber;
            objCVarOperationContainersAndPackages.FlashPoint = pFlashPoint;
            objCVarOperationContainersAndPackages.DescriptionOfGoods = pDescriptionOfGoods;
            objCVarOperationContainersAndPackages.MarksAndNumbers = "0";
            objCVarOperationContainersAndPackages.PurchaseItemID = pPurchaseItemID;
            objCVarOperationContainersAndPackages.PackageTypeIDOnContainer = pPackageTypeIDOnContainer;
            objCVarOperationContainersAndPackages.NumberOfPackagesOnContainer = pNumberOfPackagesOnContainer;

            objCVarOperationContainersAndPackages.PlacedOnOCPID = pPlacedOnOCPID;
            #region ContainerTracking
            objCVarOperationContainersAndPackages.GateOutPortID = 0;
            objCVarOperationContainersAndPackages.GateInPortID = 0;
            objCVarOperationContainersAndPackages.GateOutDate = DateTime.Parse("01/01/1900");
            objCVarOperationContainersAndPackages.StuffingDate = DateTime.Parse("01/01/1900");
            objCVarOperationContainersAndPackages.LoadingDate = DateTime.ParseExact(pLoadingDate, "dd/MM/yyyy", CultureInfo.InvariantCulture);
            objCVarOperationContainersAndPackages.GateOutAndLoadingDatesDifference = 0;
            objCVarOperationContainersAndPackages.Factory = pFactory;
            objCVarOperationContainersAndPackages.ExportBLNumber = "0";
            objCVarOperationContainersAndPackages.ImportBLNumber = "0";
            objCVarOperationContainersAndPackages.IsLoaded = pIsLoaded;
            objCVarOperationContainersAndPackages.IsTracked = false;
            objCVarOperationContainersAndPackages.IsOwnedByCompany = false;
            objCVarOperationContainersAndPackages.TrailerID = 0;
            objCVarOperationContainersAndPackages.DriverID = 0;
            objCVarOperationContainersAndPackages.DriverAssistantID = 0;
            objCVarOperationContainersAndPackages.SupplierTrailerName = "0";
            objCVarOperationContainersAndPackages.SupplierDriverName = "0";
            objCVarOperationContainersAndPackages.SupplierDriverAssistantName = "0";
            #endregion ContainerTracking
            #region AirAgents columns
            objCVarOperationContainersAndPackages.Rate = 0;
            objCVarOperationContainersAndPackages.IsAsAgreed = false;
            objCVarOperationContainersAndPackages.IsMinimum = false;
            objCVarOperationContainersAndPackages.WeightUnit = "0";
            objCVarOperationContainersAndPackages.RateClass = "0";
            #endregion AirAgents columns

            #region Tank
            //objCVarOperationContainersAndPackages.TankOrFlexiNumber = "0";
            objCVarOperationContainersAndPackages.ReturnDepot = "0";
            objCVarOperationContainersAndPackages.OperatorID = 0;
            objCVarOperationContainersAndPackages.StatusID = 0;

            objCVarOperationContainersAndPackages.IsFull = false;
            objCVarOperationContainersAndPackages.ExitDate = DateTime.Parse("01/01/1900");
            objCVarOperationContainersAndPackages.ReturnDate = DateTime.ParseExact(pReturnDate, "dd/MM/yyyy", CultureInfo.InvariantCulture);
            objCVarOperationContainersAndPackages.TankCertExpiryDate = DateTime.ParseExact(pTankCertExpiryDate, "dd/MM/yyyy", CultureInfo.InvariantCulture);
            objCVarOperationContainersAndPackages.FreeDays = 0;
            objCVarOperationContainersAndPackages.DayValue = 0;
            #endregion Tank
            #region Yard
            objCVarOperationContainersAndPackages.YardEIRNumber = 0;
            objCVarOperationContainersAndPackages.YardEIRNumberOut = 0;
            objCVarOperationContainersAndPackages.YardInDate = DateTime.Parse("01/01/1900");
            objCVarOperationContainersAndPackages.YardInTime = 0;
            objCVarOperationContainersAndPackages.YardOutDate = DateTime.Parse("01/01/1900");
            objCVarOperationContainersAndPackages.YardOutTime = 0;
            objCVarOperationContainersAndPackages.YardLocationID = 0;
            objCVarOperationContainersAndPackages.YardIsIn = 0;
            #endregion Yard

            objCVarOperationContainersAndPackages.CreatorUserID = objCVarOperationContainersAndPackages.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarOperationContainersAndPackages.CreationDate = objCVarOperationContainersAndPackages.ModificationDate = DateTime.Now;

            objCVarOperationContainersAndPackages.WarehouseID = pWarehouseID;

            COperationContainersAndPackages objCOperationContainersAndPackages = new COperationContainersAndPackages();
            objCOperationContainersAndPackages.lstCVarOperationContainersAndPackages.Add(objCVarOperationContainersAndPackages);
            checkException = objCvwOperationContainersAndPackagesCount.GetListPaging(1000, 1, "WHERE OperationID=" + pOperationID.ToString() + " And ContainerNumber='" +pContainerNumber+"'", "ContainerTypeCode, ContainerNumber, PackageTypeName", out _RowCount);
            CDefaults objCDefaults = new CDefaults();
            objCDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount);

            if (objCDefaults.lstCVarDefaults[0].UnEditableCompanyName=="UNF" && objCvwOperationContainersAndPackagesCount.lstCVarvwOperationContainersAndPackages.Count > 0)
            {
                _IsRepeted=true;
            }
            else
            {

            
                for (int i = 0; i < pNumberOfContainers; i++)
                {
                    objCOperationContainersAndPackages.lstCVarOperationContainersAndPackages[0].mIsChanges = true;
                    objCOperationContainersAndPackages.lstCVarOperationContainersAndPackages[0].ID = 0;
                    checkException = objCOperationContainersAndPackages.SaveMethod(objCOperationContainersAndPackages.lstCVarOperationContainersAndPackages);
                }
            }
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else
            { //not unique
            
                    _result = true;

                objCvwOperations.GetListPaging(999999, 1, "WHERE ID=" + pOperationID, "ID", out _RowCount);
                if (objCvwOperations.lstCVarvwOperations[0].MasterOperationID > 0)
                    objCvwOperations.GetListPaging(999999, 1, "WHERE ID=" + objCvwOperations.lstCVarvwOperations[0].MasterOperationID, "ID", out _RowCount);
                checkException = objCvwOperationContainersAndPackages.GetListPaging(1000, 1, "WHERE OperationID=" + pOperationID.ToString(), "ContainerTypeCode, ContainerNumber, PackageTypeName", out _RowCount);
                //checkException = objCvwOperationContainersAndPackages.GetListPaging(1000, 1, "WHERE OperationID=" + pOperationID.ToString() + " OR ID IN (SELECT OperationContainersAndPackagesID FROM OperationContainersAndPackagesPlacedOn WHERE OperationID=" + pOperationID.ToString() + ")", "ID", out _RowCount);
            }
            #region Call SetReceivablesQuantity
            SetReceivablesQuantity(pOperationID);
            #endregion Call SetReceivablesQuantity



            return new Object[] {
                _result
                , objCOperationContainersAndPackages.lstCVarOperationContainersAndPackages[0].ID //the last ContainerID inserted in the loop
				, new JavaScriptSerializer().Serialize(objCvwOperationContainersAndPackages.lstCVarvwOperationContainersAndPackages)
                , new JavaScriptSerializer().Serialize(objCvwOperations.lstCVarvwOperations[0]) //pData[3]
                ,_IsRepeted
            };
        }

        [HttpGet, HttpPost]
        public object[] Update(Int64 pID, Int64 pOperationID, Int32 pContainerTypeID, Int32 pPackageTypeID, Decimal pLength, Decimal pWidth
            , Decimal pHeight, Decimal pVolume, Decimal pVolumetricWeight, Decimal pNetWeight, Decimal pNetWeightTON, Decimal pGrossWeight
            , Decimal pGrossWeightTON, Decimal pChargeableWeight, Int32 pQuantity, string pContainerNumber, string pCarrierSeal, string pShipperSeal
            , decimal pTareWeight, decimal pVGM, bool pIsReefer, bool pIsNOR, decimal pMinTemp, decimal pMaxTemp, decimal pHumidity
            , decimal pVentilation, string pLotNumber, bool pIsIMO, decimal pIMOClass, int pUNNumber, decimal pFlashPoint, string pDescriptionOfGoods
            , int pPurchaseItemID, int pPackageTypeIDOnContainer, int pNumberOfPackagesOnContainer, int pOperatorID, int pStatusID, string pTankOrFlexiNumber, string pReturnDepot
            , bool pIsSentToWarehouse, bool pIsPeriodicTest, bool pIsLoaded, String pLoadingDate, String pReturnDate, String pTankCertExpiryDate, int pWarehouseID, string pFactory="")
        {
            bool _result = false;
            int _RowCount = 0;
            string _MessageReturned = "";
            CvwOperations objCvwOperations = new CvwOperations();
            CvwOperationContainersAndPackages objCvwOperationContainersAndPackages = new CvwOperationContainersAndPackages();
            CVarOperationContainersAndPackages objCVarOperationContainersAndPackages = new CVarOperationContainersAndPackages();
            CvwReceivables objCvwReceivables = new CvwReceivables();
            CvwPayables objCvwPayables = new CvwPayables();
            CvwOperationPartners objCvwOperationPartners = new CvwOperationPartners();
            int constAgentOperationPartnerTypeID = 6;
            int constSupplierOperationPartnerTypeID = 12;
            //int constClientOperationPartnerTypeID = 200;
            //the next 4 lines to get the CreatorUserID and CreationDate and set them as they were entered before
            COperationContainersAndPackages objCGetCreationInformation = new COperationContainersAndPackages();
            objCGetCreationInformation.GetItem(pID);
            objCVarOperationContainersAndPackages.CreatorUserID = objCGetCreationInformation.lstCVarOperationContainersAndPackages[0].CreatorUserID;
            objCVarOperationContainersAndPackages.CreationDate = objCGetCreationInformation.lstCVarOperationContainersAndPackages[0].CreationDate;
            objCVarOperationContainersAndPackages.HouseOperationID = objCGetCreationInformation.lstCVarOperationContainersAndPackages[0].HouseOperationID;
            objCVarOperationContainersAndPackages.PlacedOnOCPID = objCGetCreationInformation.lstCVarOperationContainersAndPackages[0].PlacedOnOCPID;
            #region AirAgents columns
            objCVarOperationContainersAndPackages.Rate = objCGetCreationInformation.lstCVarOperationContainersAndPackages[0].Rate;
            objCVarOperationContainersAndPackages.IsAsAgreed = objCGetCreationInformation.lstCVarOperationContainersAndPackages[0].IsAsAgreed;
            objCVarOperationContainersAndPackages.IsMinimum = objCGetCreationInformation.lstCVarOperationContainersAndPackages[0].IsMinimum;
            objCVarOperationContainersAndPackages.WeightUnit = objCGetCreationInformation.lstCVarOperationContainersAndPackages[0].WeightUnit;
            objCVarOperationContainersAndPackages.RateClass = objCGetCreationInformation.lstCVarOperationContainersAndPackages[0].RateClass;

            #endregion AirAgents columns

            #region ContainerTracking
            objCVarOperationContainersAndPackages.GateOutPortID = objCGetCreationInformation.lstCVarOperationContainersAndPackages[0].GateOutPortID;
            objCVarOperationContainersAndPackages.GateInPortID = objCGetCreationInformation.lstCVarOperationContainersAndPackages[0].GateInPortID;
            objCVarOperationContainersAndPackages.GateOutDate = objCGetCreationInformation.lstCVarOperationContainersAndPackages[0].GateOutDate;
            objCVarOperationContainersAndPackages.StuffingDate = objCGetCreationInformation.lstCVarOperationContainersAndPackages[0].StuffingDate;
            objCVarOperationContainersAndPackages.LoadingDate = DateTime.ParseExact(pLoadingDate, "dd/MM/yyyy", CultureInfo.InvariantCulture);
            objCVarOperationContainersAndPackages.GateOutAndLoadingDatesDifference = objCGetCreationInformation.lstCVarOperationContainersAndPackages[0].GateOutAndLoadingDatesDifference;
            objCVarOperationContainersAndPackages.Factory = objCGetCreationInformation.lstCVarOperationContainersAndPackages[0].Factory;
            objCVarOperationContainersAndPackages.ExportBLNumber = objCGetCreationInformation.lstCVarOperationContainersAndPackages[0].ExportBLNumber;
            objCVarOperationContainersAndPackages.ImportBLNumber = objCGetCreationInformation.lstCVarOperationContainersAndPackages[0].ImportBLNumber;
            objCVarOperationContainersAndPackages.IsTracked = objCGetCreationInformation.lstCVarOperationContainersAndPackages[0].IsTracked;
            objCVarOperationContainersAndPackages.IsOwnedByCompany = objCGetCreationInformation.lstCVarOperationContainersAndPackages[0].IsOwnedByCompany;
            objCVarOperationContainersAndPackages.TrailerID = objCGetCreationInformation.lstCVarOperationContainersAndPackages[0].TrailerID;
            objCVarOperationContainersAndPackages.DriverID = objCGetCreationInformation.lstCVarOperationContainersAndPackages[0].DriverID;
            objCVarOperationContainersAndPackages.DriverAssistantID = objCGetCreationInformation.lstCVarOperationContainersAndPackages[0].DriverAssistantID;
            objCVarOperationContainersAndPackages.SupplierTrailerName = objCGetCreationInformation.lstCVarOperationContainersAndPackages[0].SupplierTrailerName;
            objCVarOperationContainersAndPackages.SupplierDriverName = objCGetCreationInformation.lstCVarOperationContainersAndPackages[0].SupplierDriverName;
            objCVarOperationContainersAndPackages.SupplierDriverAssistantName = objCGetCreationInformation.lstCVarOperationContainersAndPackages[0].SupplierDriverAssistantName;

            objCVarOperationContainersAndPackages.WeightUnit = objCGetCreationInformation.lstCVarOperationContainersAndPackages[0].WeightUnit;
            objCVarOperationContainersAndPackages.RateClass = objCGetCreationInformation.lstCVarOperationContainersAndPackages[0].RateClass;
            #endregion ContainerTracking

            #region Tank
            objCVarOperationContainersAndPackages.TankOrFlexiNumber = pTankOrFlexiNumber;
            objCVarOperationContainersAndPackages.ReturnDepot = pReturnDepot;
            objCVarOperationContainersAndPackages.OperatorID = pOperatorID;
            objCVarOperationContainersAndPackages.StatusID = pStatusID;

            objCVarOperationContainersAndPackages.IsFull = objCGetCreationInformation.lstCVarOperationContainersAndPackages[0].IsFull;
            objCVarOperationContainersAndPackages.ExitDate = objCGetCreationInformation.lstCVarOperationContainersAndPackages[0].ExitDate;
            objCVarOperationContainersAndPackages.ReturnDate = DateTime.ParseExact(pReturnDate, "dd/MM/yyyy", CultureInfo.InvariantCulture);
            objCVarOperationContainersAndPackages.TankCertExpiryDate = DateTime.ParseExact(pTankCertExpiryDate, "dd/MM/yyyy", CultureInfo.InvariantCulture);
            objCVarOperationContainersAndPackages.FreeDays = objCGetCreationInformation.lstCVarOperationContainersAndPackages[0].FreeDays;
            objCVarOperationContainersAndPackages.DayValue = objCGetCreationInformation.lstCVarOperationContainersAndPackages[0].DayValue;
            #endregion Tank
            #region Yard
            objCVarOperationContainersAndPackages.YardEIRNumber = objCGetCreationInformation.lstCVarOperationContainersAndPackages[0].YardEIRNumber;
            objCVarOperationContainersAndPackages.YardEIRNumberOut = objCGetCreationInformation.lstCVarOperationContainersAndPackages[0].YardEIRNumberOut;
            objCVarOperationContainersAndPackages.YardInDate = objCGetCreationInformation.lstCVarOperationContainersAndPackages[0].YardInDate;
            objCVarOperationContainersAndPackages.YardInTime = objCGetCreationInformation.lstCVarOperationContainersAndPackages[0].YardInTime;
            objCVarOperationContainersAndPackages.YardOutDate = objCGetCreationInformation.lstCVarOperationContainersAndPackages[0].YardOutDate;
            objCVarOperationContainersAndPackages.YardOutTime = objCGetCreationInformation.lstCVarOperationContainersAndPackages[0].YardOutTime;
            objCVarOperationContainersAndPackages.YardLocationID = objCGetCreationInformation.lstCVarOperationContainersAndPackages[0].YardLocationID;
            objCVarOperationContainersAndPackages.YardIsIn = objCGetCreationInformation.lstCVarOperationContainersAndPackages[0].YardIsIn;
            #endregion Yard

            objCVarOperationContainersAndPackages.ID = pID;

            objCVarOperationContainersAndPackages.OperationID = pOperationID;
            objCVarOperationContainersAndPackages.ContainerTypeID = pContainerTypeID;
            objCVarOperationContainersAndPackages.PackageTypeID = pPackageTypeID;
            objCVarOperationContainersAndPackages.Length = pLength;
            objCVarOperationContainersAndPackages.Width = pWidth;
            objCVarOperationContainersAndPackages.Height = pHeight;
            objCVarOperationContainersAndPackages.Volume = pVolume;
            objCVarOperationContainersAndPackages.VolumetricWeight = pVolumetricWeight;
            objCVarOperationContainersAndPackages.NetWeight = pNetWeight;
            objCVarOperationContainersAndPackages.NetWeightTON = pNetWeightTON;
            objCVarOperationContainersAndPackages.GrossWeight = pGrossWeight;
            objCVarOperationContainersAndPackages.GrossWeightTON = pGrossWeightTON;
            objCVarOperationContainersAndPackages.ChargeableWeight = pChargeableWeight;
            objCVarOperationContainersAndPackages.Quantity = pQuantity;

            objCVarOperationContainersAndPackages.ContainerNumber = pContainerNumber;
            objCVarOperationContainersAndPackages.CarrierSeal = pCarrierSeal;
            objCVarOperationContainersAndPackages.ShipperSeal = pShipperSeal;
            objCVarOperationContainersAndPackages.Factory = pFactory;
            objCVarOperationContainersAndPackages.TareWeight = pTareWeight;
            objCVarOperationContainersAndPackages.VGM = pVGM;
            objCVarOperationContainersAndPackages.IsReefer = pIsReefer;
            objCVarOperationContainersAndPackages.IsNOR = pIsNOR;
            objCVarOperationContainersAndPackages.IsSentToWarehouse = pIsSentToWarehouse;
            objCVarOperationContainersAndPackages.IsPeriodicTest = pIsPeriodicTest;
            objCVarOperationContainersAndPackages.IsLoaded = pIsLoaded;
            objCVarOperationContainersAndPackages.MinTemp = pMinTemp;
            objCVarOperationContainersAndPackages.MaxTemp = pMaxTemp;
            objCVarOperationContainersAndPackages.Humidity = pHumidity;
            objCVarOperationContainersAndPackages.Ventilation = pVentilation;
            objCVarOperationContainersAndPackages.LotNumber = pLotNumber;
            objCVarOperationContainersAndPackages.IsIMO = pIsIMO;
            objCVarOperationContainersAndPackages.IMOClass = pIMOClass;
            objCVarOperationContainersAndPackages.UNNumber = pUNNumber;
            objCVarOperationContainersAndPackages.FlashPoint = pFlashPoint;
            objCVarOperationContainersAndPackages.DescriptionOfGoods = pDescriptionOfGoods;
            objCVarOperationContainersAndPackages.MarksAndNumbers = "0";
            objCVarOperationContainersAndPackages.PurchaseItemID = pPurchaseItemID;
            objCVarOperationContainersAndPackages.PackageTypeIDOnContainer = pPackageTypeIDOnContainer;
            objCVarOperationContainersAndPackages.NumberOfPackagesOnContainer = pNumberOfPackagesOnContainer;

            objCVarOperationContainersAndPackages.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarOperationContainersAndPackages.ModificationDate = DateTime.Now;

            objCVarOperationContainersAndPackages.WarehouseID = pWarehouseID;

            Exception checkException2 = null;
            CvwOperationContainersAndPackages objCvwOperationContainersAndPackagesCount = new CvwOperationContainersAndPackages();
            checkException2 = objCvwOperationContainersAndPackagesCount.GetListPaging(1000, 1, "WHERE OperationID=" + pOperationID.ToString() + " And ContainerNumber='" + pContainerNumber + "'", "ContainerTypeCode, ContainerNumber, PackageTypeName", out _RowCount);
            bool _IsRepeted = false;

            if (objCvwOperationContainersAndPackagesCount.lstCVarvwOperationContainersAndPackages.Count > 0 && pID != objCvwOperationContainersAndPackagesCount.lstCVarvwOperationContainersAndPackages[0].ID)
            {
                _IsRepeted = true;
                _MessageReturned = "Can't Repeat Container Number in The Same Operation";
                    _result = true;
            }
            else
            {
                COperationContainersAndPackages objCOperationContainersAndPackages = new COperationContainersAndPackages();
                objCOperationContainersAndPackages.lstCVarOperationContainersAndPackages.Add(objCVarOperationContainersAndPackages);
                Exception checkException = objCOperationContainersAndPackages.SaveMethod(objCOperationContainersAndPackages.lstCVarOperationContainersAndPackages);
                if (checkException != null) // an exception is caught in the model
                {
                    if (checkException.Message.Contains("UNIQUE"))
                        _result = false;
                }
                else
                { //not unique
                    COperationContainersAndPackages objOldContainers = new COperationContainersAndPackages();
                    objOldContainers.GetList("Where OperationID = " + pOperationID);
                    decimal TareWeight = 0;
                    decimal GrossWeight = 0;
                    decimal GrossWeightTON = 0;
                    decimal NetWeight = 0;
                    decimal NetWeightTON = 0;
                    decimal ChargeableWeight = 0;
                    decimal VolumetricWeight = 0;
                    decimal Volume = 0;
                    decimal VGM = 0;
                    var NumberOfPackages = 0;
                    foreach (var row in objOldContainers.lstCVarOperationContainersAndPackages)
                    {
                        TareWeight += row.TareWeight;
                        GrossWeight += row.GrossWeight;
                        GrossWeightTON += row.GrossWeightTON;
                        NetWeight += row.NetWeight;
                        NetWeightTON += row.NetWeightTON;
                        ChargeableWeight += row.ChargeableWeight;
                        VolumetricWeight += row.VolumetricWeight;
                        NumberOfPackages += row.Quantity;
                        VGM += row.VGM;
                        Volume += row.Volume;
                    }
                        var op = new COperations();
                    op.GetItem(pOperationID);
                    if (op.lstCVarOperations.Count == 1)
                    {
                        op.lstCVarOperations[0].TareWeight = TareWeight;
                        op.lstCVarOperations[0].GrossWeight = GrossWeight;
                        op.lstCVarOperations[0].GrossWeightTON = GrossWeightTON;
                        op.lstCVarOperations[0].VGM = VGM;
                        op.lstCVarOperations[0].NetWeight = NetWeight;
                        op.lstCVarOperations[0].NetWeightTON = NetWeightTON;
                        op.lstCVarOperations[0].Volume = Volume;
                        op.lstCVarOperations[0].ChargeableWeight = ChargeableWeight;
                        op.lstCVarOperations[0].VolumetricWeight = VolumetricWeight;
                        //op.lstCVarOperations[0].NumberOfPackages = NumberOfPackages;
                        checkException = op.SaveMethod(op.lstCVarOperations);
                    }
                    _result = true;
                    var vw = new CvwOperationContainersAndPackages();
                    vw.GetList("Where ID =" + objCVarOperationContainersAndPackages.ID);
                    var obj = vw.lstCVarvwOperationContainersAndPackages[0];
                    var ex = Logging.Save<CVarvwOperationContainersAndPackages>(ref obj, Convert.ToInt32(objCVarOperationContainersAndPackages.ID), vw.lstCVarvwOperationContainersAndPackages[0].OperationCode);


                    objCvwOperations.GetListPaging(999999, 1, "WHERE ID=" + pOperationID, "ID", out _RowCount);
                    #region Add Operator Tank Charges
                    if (pOperatorID > 0 && pOperatorID != objCGetCreationInformation.lstCVarOperationContainersAndPackages[0].OperatorID)
                    {
                        #region Add Operator to Operation Partners if not exists
                        COperationPartners objCOperationPartners = new COperationPartners();
                        checkException = objCOperationPartners.GetList("WHERE OperationID=" + pOperationID + " AND AgentID=" + pOperatorID);
                        if (objCOperationPartners.lstCVarOperationPartners.Count == 0)
                        {
                            CVarOperationPartners objCVarOperationPartners = new CVarOperationPartners();
                            CContacts objCContacts = new CContacts();
                            Int64 _ContactID = 0;
                            objCContacts.GetList("WHERE PartnerTypeID=2 AND PartnerID=" + pOperatorID);
                            if (objCContacts.lstCVarContacts.Count > 0)
                                _ContactID = objCContacts.lstCVarContacts[0].ID;
                            objCVarOperationPartners.ID = 0;
                            objCVarOperationPartners.OperationID = pOperationID;
                            objCVarOperationPartners.OperationPartnerTypeID = constAgentOperationPartnerTypeID;
                            objCVarOperationPartners.AgentID = pOperatorID;
                            objCVarOperationPartners.ContactID = _ContactID;
                            objCVarOperationPartners.CreatorUserID = objCVarOperationPartners.ModificatorUserID = WebSecurity.CurrentUserId;
                            objCVarOperationPartners.CreationDate = objCVarOperationPartners.ModificationDate = DateTime.Now;
                            objCOperationPartners.lstCVarOperationPartners.Add(objCVarOperationPartners);
                            checkException = objCOperationPartners.SaveMethod(objCOperationPartners.lstCVarOperationPartners);
                        }
                        #endregion Add Operator to Operation Partners if not exists
                        #region Add Payables and Receivables for Operator
                        COperatorTankCharge objCOperatorTankCharge = new COperatorTankCharge();
                        #region Delete Pay/Rec if exists
                        CPayables objCPayablesToDelete = new CPayables();
                        checkException = objCPayablesToDelete.DeleteList("WHERE IsApproved<>1 AND OperationContainersAndPackagesID=" + pID);
                        CReceivables objCReceivablesToDelete = new CReceivables();
                        checkException = objCReceivablesToDelete.DeleteList("WHERE InvoiceID IS NULL AND OperationContainersAndPackagesID=" + pID);
                        #endregion Delete Pay/Rec if exists
                        checkException = objCOperatorTankCharge.GetList("WHERE AgentID=" + pOperatorID
                            + (objCvwOperations.lstCVarvwOperations[0].DirectionType == 1 ? " AND IsImport=1 "
                                : (objCvwOperations.lstCVarvwOperations[0].DirectionType == 2 ? " AND IsExport=1 " : " AND 1=2 ")
                              )
                            + " AND IsLoaded=" + (objCVarOperationContainersAndPackages.IsLoaded ? "1" : "0"));
                        for (int i = 0; i < objCOperatorTankCharge.lstCVarOperatorTankCharge.Count; i++)
                        {
                            #region Saving Tank Payables
                            if (objCOperatorTankCharge.lstCVarOperatorTankCharge[i].CostPrice > 0)
                            {
                                CvwCurrencyDetails objCvwCurrencyDetails = new CvwCurrencyDetails();
                                objCvwCurrencyDetails.GetList("WHERE ID=" + objCOperatorTankCharge.lstCVarOperatorTankCharge[i].CostCurrencyID
                                    + " AND GETDATE() >= DateAdd(hh, 0, DateDiff(dd, 0, FromDate)) "
                                    + " AND GETDATE() <= DateAdd(minute,59,DateAdd(hh, 23, DateDiff(dd, 0, ToDate))) "
                                    );
                                if (objCvwCurrencyDetails.lstCVarvwCurrencyDetails.Count > 0)
                                {
                                    CVarPayables objCVarPayables = new CVarPayables();
                                    objCVarPayables.ID = 0;
                                    objCVarPayables.OperationID = pOperationID;
                                    objCVarPayables.ChargeTypeID = objCOperatorTankCharge.lstCVarOperatorTankCharge[i].ChargeTypeID;
                                    objCVarPayables.MeasurementID = 0;
                                    objCVarPayables.Quantity = 1;
                                    objCVarPayables.CostPrice = objCOperatorTankCharge.lstCVarOperatorTankCharge[i].CostPrice;
                                    objCVarPayables.AmountWithoutVAT = objCOperatorTankCharge.lstCVarOperatorTankCharge[i].CostPrice;
                                    objCVarPayables.CostAmount = objCOperatorTankCharge.lstCVarOperatorTankCharge[i].CostPrice;
                                    objCVarPayables.ExchangeRate = objCvwCurrencyDetails.lstCVarvwCurrencyDetails[0].ExchangeRate;
                                    objCVarPayables.CurrencyID = objCvwCurrencyDetails.lstCVarvwCurrencyDetails[0].ID;
                                    objCVarPayables.SupplierInvoiceNo = "0";
                                    objCVarPayables.SupplierReceiptNo = "0";
                                    objCVarPayables.EntryDate = DateTime.Now;
                                    objCVarPayables.BillID = 0;
                                    objCVarPayables.IssueDate = DateTime.Now;
                                    objCVarPayables.OperationContainersAndPackagesID = pID;
                                    objCVarPayables.Notes = objCOperatorTankCharge.lstCVarOperatorTankCharge[0].Notes;

                                    objCVarPayables.CreatorUserID = objCVarPayables.ModificatorUserID = WebSecurity.CurrentUserId;
                                    objCVarPayables.ModificationDate = objCVarPayables.CreationDate = DateTime.Now;
                                    objCVarPayables.IsOfficial = false;
                                    objCVarPayables.IsQuotationApproval = false;
                                    objCVarPayables.ApprovePendingValue = 0;
                                    objCVarPayables.crmCode = "";
                                    objCVarPayables.IsPurchased = false;

                                    CPayables objCPayables = new CPayables();
                                    objCPayables.lstCVarPayables.Add(objCVarPayables);
                                    checkException = objCPayables.SaveMethod(objCPayables.lstCVarPayables);
                                }
                                else
                                    _MessageReturned = "Please, enter exchange rate for the tank charges currency for today and check charges for that tank.";
                            }
                            #endregion Saving Tank Payables
                            #region Saving Tank Receivables
                            if (objCOperatorTankCharge.lstCVarOperatorTankCharge[i].SalePrice > 0)
                            {
                                CvwCurrencyDetails objCvwCurrencyDetails = new CvwCurrencyDetails();
                                objCvwCurrencyDetails.GetList("WHERE ID=" + objCOperatorTankCharge.lstCVarOperatorTankCharge[i].SaleCurrencyID
                                    + " AND GETDATE() >= DateAdd(hh, 0, DateDiff(dd, 0, FromDate)) "
                                    + " AND GETDATE() <= DateAdd(minute,59,DateAdd(hh, 23, DateDiff(dd, 0, ToDate))) "
                                    );
                                if (objCvwCurrencyDetails.lstCVarvwCurrencyDetails.Count > 0)
                                {
                                    CVarReceivables objCVarReceivables = new CVarReceivables();
                                    objCVarReceivables.OperationID = pOperationID;
                                    objCVarReceivables.ChargeTypeID = objCOperatorTankCharge.lstCVarOperatorTankCharge[i].ChargeTypeID;
                                    objCVarReceivables.MeasurementID = 0;
                                    objCVarReceivables.Quantity = 1;
                                    objCVarReceivables.SalePrice = objCOperatorTankCharge.lstCVarOperatorTankCharge[i].SalePrice;
                                    objCVarReceivables.SaleAmount = objCOperatorTankCharge.lstCVarOperatorTankCharge[i].SalePrice;
                                    objCVarReceivables.ExchangeRate = objCvwCurrencyDetails.lstCVarvwCurrencyDetails[0].ExchangeRate;
                                    objCVarReceivables.CurrencyID = objCvwCurrencyDetails.lstCVarvwCurrencyDetails[0].ID;
                                    objCVarReceivables.GeneratingQRID = 0;
                                    objCVarReceivables.Notes = "0";

                                    objCVarReceivables.IssueDate = DateTime.Now;
                                    objCVarReceivables.OperationContainersAndPackagesID = pID;

                                    objCVarReceivables.PreviousCutOffDate = DateTime.Parse("01/01/1900");
                                    objCVarReceivables.CutOffDate = DateTime.Parse("01/01/1900");
                                    objCVarReceivables.ReceiptNo = "";
                                    objCVarReceivables.ReceiptDate = DateTime.Parse("01/01/1900");
                                    objCVarReceivables.TariffID = 0;
                                    objCVarReceivables.ManualChargeType = "0";
                                    objCVarReceivables.CostCenterId = 0;
                                    objCVarReceivables.IsOfficial = false;
                                    objCVarReceivables.crmCode = "";

                                    objCVarReceivables.CreatorUserID = objCVarReceivables.ModificatorUserID = WebSecurity.CurrentUserId;
                                    objCVarReceivables.ModificationDate = objCVarReceivables.CreationDate = DateTime.Now;

                                    CReceivables objCReceivables = new CReceivables();
                                    objCReceivables.lstCVarReceivables.Add(objCVarReceivables);
                                   checkException=  objCReceivables.SaveMethod(objCReceivables.lstCVarReceivables);
                                }
                                else
                                    _MessageReturned = "Please, enter exchange rate for the tank charges currency for today and check charges for that tank.";
                            }
                            #endregion Saving Tank Receivables
                        }
                        #endregion Add Payables and Receivables for Operator
                        #region Add Payables and Receivables to export operations from import operations
                        if (objCvwOperations.lstCVarvwOperations[0].DirectionType == 2 && pTankOrFlexiNumber != "0")
                        {
                            CvwOperationContainersAndPackages objCvwCOperationContainersAndPackages_temp = new CvwOperationContainersAndPackages();
                            objCvwCOperationContainersAndPackages_temp.GetListPaging(1, 1, "WHERE DirectionType=1 AND OperationID<" + pOperationID + " AND TankOrFlexiNumber=N'" + pTankOrFlexiNumber + "'", "ID DESC", out _RowCount);
                            if (objCvwCOperationContainersAndPackages_temp.lstCVarvwOperationContainersAndPackages.Count > 0)
                            {
                                #region Saving Tank Payables
                                CvwPayables objCPayables_Temp = new CvwPayables();
                                CReceivables objCReceivables_Temp = new CReceivables();
                                checkException = objCPayables_Temp.GetListPaging(999999, 1, "WHERE IsTank=1 AND IsDeleted=0 AND OperationContainersAndPackagesID=" + objCvwCOperationContainersAndPackages_temp.lstCVarvwOperationContainersAndPackages[0].ID, "ID", out _RowCount);
                                checkException = objCReceivables_Temp.GetListPaging(999999, 1, "WHERE IsDeleted=0 AND OperationContainersAndPackagesID=" + objCvwCOperationContainersAndPackages_temp.lstCVarvwOperationContainersAndPackages[0].ID + " AND ChargeTypeID IN (SELECT ID FROM ChargeTypes WHERE IsTank=1)", "ID", out _RowCount);
                                for (int i = 0; i < objCPayables_Temp.lstCVarvwPayables.Count; i++)
                                {
                                    #region Add Operator to Operation Partners if not exists
                                    Int64 pSupplierOperationPartnerID = 0;
                                    CvwOperationPartners objCvwOperationPartners_tmp = new CvwOperationPartners();
                                    checkException = objCvwOperationPartners_tmp.GetList("WHERE OperationID=" + pOperationID + " AND PartnerName=N'" + objCPayables_Temp.lstCVarvwPayables[i].PartnerSupplierName + "'");
                                    if (objCvwOperationPartners_tmp.lstCVarvwOperationPartners.Count == 0)
                                    {
                                        COperationPartners objCOperationPartners_Import = new COperationPartners();
                                        checkException = objCOperationPartners_Import.GetList("WHERE ID=" + objCPayables_Temp.lstCVarvwPayables[i].SupplierOperationPartnerID);
                                        CVarOperationPartners objCVarOperationPartners = new CVarOperationPartners();
                                        CContacts objCContacts = new CContacts();
                                        Int64 _ContactID = 0;
                                        objCContacts.GetList("WHERE PartnerTypeID=8 AND PartnerID=" + objCOperationPartners_Import.lstCVarOperationPartners[0].SupplierID);
                                        if (objCContacts.lstCVarContacts.Count > 0)
                                            _ContactID = objCContacts.lstCVarContacts[0].ID;
                                        objCVarOperationPartners.ID = 0;
                                        objCVarOperationPartners.OperationID = pOperationID;
                                        objCVarOperationPartners.OperationPartnerTypeID = constSupplierOperationPartnerTypeID;
                                        objCVarOperationPartners.SupplierID = objCOperationPartners_Import.lstCVarOperationPartners[0].SupplierID;
                                        objCVarOperationPartners.ContactID = _ContactID;
                                        objCVarOperationPartners.CreatorUserID = objCVarOperationPartners.ModificatorUserID = WebSecurity.CurrentUserId;
                                        objCVarOperationPartners.CreationDate = objCVarOperationPartners.ModificationDate = DateTime.Now;
                                        objCOperationPartners.lstCVarOperationPartners.Add(objCVarOperationPartners);
                                        checkException = objCOperationPartners.SaveMethod(objCOperationPartners.lstCVarOperationPartners);
                                        pSupplierOperationPartnerID = objCVarOperationPartners.ID;
                                    }
                                    else
                                        pSupplierOperationPartnerID = objCvwOperationPartners_tmp.lstCVarvwOperationPartners[0].ID;
                                    #endregion Add Operator to Operation Partners if not exists

                                    if (objCPayables_Temp.lstCVarvwPayables[i].CostPrice > 0)
                                    {
                                        CPayables objCPayables_JV = new CPayables();
                                        objCPayables_JV.GetList("Where ID=" + objCPayables_Temp.lstCVarvwPayables[i].ID);

                                        CvwCurrencyDetails objCvwCurrencyDetails = new CvwCurrencyDetails();
                                        objCvwCurrencyDetails.GetList("WHERE ID=" + objCPayables_Temp.lstCVarvwPayables[i].CurrencyID
                                            + " AND GETDATE() >= DateAdd(hh, 0, DateDiff(dd, 0, FromDate)) "
                                            + " AND GETDATE() <= DateAdd(minute,59,DateAdd(hh, 23, DateDiff(dd, 0, ToDate))) "
                                            );
                                        if (objCvwCurrencyDetails.lstCVarvwCurrencyDetails.Count > 0)
                                        {
                                            CVarPayables objCVarPayables = new CVarPayables();
                                            objCVarPayables.ID = 0;
                                            objCVarPayables.OperationID = pOperationID;
                                            objCVarPayables.ChargeTypeID = objCPayables_Temp.lstCVarvwPayables[i].ChargeTypeID;
                                            objCVarPayables.MeasurementID = 0;
                                            objCVarPayables.Quantity = 1;
                                            objCVarPayables.CostPrice = objCPayables_Temp.lstCVarvwPayables[i].CostPrice;
                                            objCVarPayables.AmountWithoutVAT = objCPayables_Temp.lstCVarvwPayables[i].AmountWithoutVAT;
                                            objCVarPayables.TaxTypeID = objCPayables_Temp.lstCVarvwPayables[i].TaxTypeID;
                                            objCVarPayables.TaxPercentage = objCPayables_Temp.lstCVarvwPayables[i].TaxPercentage;
                                            objCVarPayables.TaxAmount = objCPayables_Temp.lstCVarvwPayables[i].TaxAmount;
                                            objCVarPayables.DiscountTypeID = objCPayables_Temp.lstCVarvwPayables[i].DiscountTypeID;
                                            objCVarPayables.DiscountPercentage = objCPayables_Temp.lstCVarvwPayables[i].DiscountPercentage;
                                            objCVarPayables.DiscountAmount = objCPayables_Temp.lstCVarvwPayables[i].DiscountAmount;
                                            objCVarPayables.CostAmount = objCPayables_Temp.lstCVarvwPayables[i].CostPrice;
                                            objCVarPayables.ExchangeRate = objCvwCurrencyDetails.lstCVarvwCurrencyDetails[0].ExchangeRate;
                                            objCVarPayables.CurrencyID = objCvwCurrencyDetails.lstCVarvwCurrencyDetails[0].ID;
                                            objCVarPayables.SupplierInvoiceNo = objCPayables_Temp.lstCVarvwPayables[i].SupplierInvoiceNo;
                                            objCVarPayables.SupplierReceiptNo = objCPayables_Temp.lstCVarvwPayables[i].SupplierReceiptNo;
                                            objCVarPayables.SupplierOperationPartnerID = pSupplierOperationPartnerID;
                                            objCVarPayables.EntryDate = objCPayables_Temp.lstCVarvwPayables[i].EntryDate;
                                            objCVarPayables.BillID = 0;
                                            objCVarPayables.IssueDate = objCPayables_Temp.lstCVarvwPayables[i].IssueDate;
                                            objCVarPayables.OperationContainersAndPackagesID = pID;
                                            objCVarPayables.Notes = objCPayables_Temp.lstCVarvwPayables[0].Notes;
                                            objCVarPayables.IsApproved = objCPayables_Temp.lstCVarvwPayables[i].IsApproved;
                                            objCVarPayables.JVID = objCPayables_JV.lstCVarPayables[0].JVID;
                                            objCVarPayables.IsOfficial = false;
                                            objCVarPayables.IsQuotationApproval = false;
                                            objCVarPayables.ApprovePendingValue = 0;
                                            objCVarPayables.crmCode = "";
                                            objCVarPayables.IsPurchased = false;

                                            objCVarPayables.CreatorUserID = objCVarPayables.ModificatorUserID = WebSecurity.CurrentUserId;
                                            objCVarPayables.ModificationDate = objCVarPayables.CreationDate = DateTime.Now;
                                            CPayables objCPayables = new CPayables();
                                            objCPayables.lstCVarPayables.Add(objCVarPayables);
                                            checkException = objCPayables.SaveMethod(objCPayables.lstCVarPayables);
                                            if (checkException == null)
                                                objCPayables.UpdateList("IsDeleted=1 WHERE ID=" + objCPayables_Temp.lstCVarvwPayables[i].ID);
                                        }
                                        else
                                            _MessageReturned = "Please, enter exchange rate for the tank charges currency for today and check charges for that tank.";
                                    } //if (objCPayables_temp.lstCVarPayables[i].CostPrice > 0)
                                } //for (int i = 0; i < objCPayables_temp.lstCVarPayables.Count; i++)
                                #endregion Saving Tank Payables
                                #region Saving Tank Receivables
                                for (int i = 0; i < objCReceivables_Temp.lstCVarReceivables.Count; i++)
                                {
                                    if (objCReceivables_Temp.lstCVarReceivables[i].SalePrice > 0)
                                    {
                                        CvwCurrencyDetails objCvwCurrencyDetails = new CvwCurrencyDetails();
                                        objCvwCurrencyDetails.GetList("WHERE ID=" + objCReceivables_Temp.lstCVarReceivables[i].CurrencyID
                                            + " AND GETDATE() >= DateAdd(hh, 0, DateDiff(dd, 0, FromDate)) "
                                            + " AND GETDATE() <= DateAdd(minute,59,DateAdd(hh, 23, DateDiff(dd, 0, ToDate))) "
                                            );
                                        if (objCvwCurrencyDetails.lstCVarvwCurrencyDetails.Count > 0)
                                        {
                                            CVarReceivables objCVarReceivables = new CVarReceivables();
                                            objCVarReceivables.OperationID = pOperationID;
                                            objCVarReceivables.ChargeTypeID = objCReceivables_Temp.lstCVarReceivables[i].ChargeTypeID;
                                            objCVarReceivables.MeasurementID = 0;
                                            objCVarReceivables.Quantity = 1;
                                            objCVarReceivables.SalePrice = objCReceivables_Temp.lstCVarReceivables[i].SalePrice;
                                            objCVarReceivables.SaleAmount = objCReceivables_Temp.lstCVarReceivables[i].SalePrice;
                                            objCVarReceivables.ExchangeRate = objCvwCurrencyDetails.lstCVarvwCurrencyDetails[0].ExchangeRate;
                                            objCVarReceivables.CurrencyID = objCvwCurrencyDetails.lstCVarvwCurrencyDetails[0].ID;
                                            objCVarReceivables.GeneratingQRID = 0;
                                            objCVarReceivables.Notes = "0";

                                            objCVarReceivables.IssueDate = DateTime.Now;
                                            objCVarReceivables.OperationContainersAndPackagesID = pID;

                                            objCVarReceivables.PreviousCutOffDate = DateTime.Parse("01/01/1900");
                                            objCVarReceivables.CutOffDate = DateTime.Parse("01/01/1900");
                                            objCVarReceivables.ReceiptDate = DateTime.Parse("01/01/1900");
                                            objCVarReceivables.ReceiptNo = "";
                                            objCVarReceivables.TariffID = 0;
                                            objCVarReceivables.ManualChargeType = "0";
                                            objCVarReceivables.CostCenterId = 0;
                                            objCVarReceivables.IsOfficial = false;
                                            objCVarReceivables.crmCode = "";
                                            objCVarReceivables.CreatorUserID = objCVarReceivables.ModificatorUserID = WebSecurity.CurrentUserId;
                                            objCVarReceivables.ModificationDate = objCVarReceivables.CreationDate = DateTime.Now;

                                            CReceivables objCReceivables = new CReceivables();
                                            objCReceivables.lstCVarReceivables.Add(objCVarReceivables);
                                            objCReceivables.SaveMethod(objCReceivables.lstCVarReceivables);
                                            if (checkException == null)
                                                objCReceivables.UpdateList("IsDeleted=1 WHERE ID=" + objCReceivables_Temp.lstCVarReceivables[i].ID);
                                        }
                                        else
                                            _MessageReturned = "Please, enter exchange rate for the tank charges currency for today and check charges for that tank.";
                                    }
                                } //for (int i = 0; i < objCReceivables_temp.lstCVarReceivables.Count; i++)
                                #endregion Saving Tank Receivables
                            }
                        }
                        #endregion Add Payables and Receivables to export operations from import operations
                    }
                    #endregion Add Operator Tank Charges

                    objCvwPayables.GetListPaging(999999, 1, "WHERE IsDeleted=0 AND OperationID=" + pOperationID, "ChargeTypeName", out _RowCount);
                    objCvwReceivables.GetListPaging(999999, 1, "WHERE IsDeleted=0 AND OperationID=" + pOperationID, "ChargeTypeName", out _RowCount);
                    objCvwOperationPartners.GetListPaging(999999, 1, "WHERE OperationID=" + pOperationID, "ViewOrder, ID", out _RowCount);

                    if (objCvwOperations.lstCVarvwOperations[0].MasterOperationID > 0)
                        objCvwOperations.GetListPaging(999999, 1, "WHERE ID=" + objCvwOperations.lstCVarvwOperations[0].MasterOperationID, "ID", out _RowCount);
                    checkException = objCvwOperationContainersAndPackages.GetListPaging(1000, 1, "WHERE OperationID=" + pOperationID.ToString(), "ContainerTypeCode, ContainerNumber, PackageTypeName", out _RowCount);
                    //checkException = objCvwOperationContainersAndPackages.GetListPaging(1000, 1, "WHERE OperationID=" + pOperationID.ToString() + " OR ID IN (SELECT OperationContainersAndPackagesID FROM OperationContainersAndPackagesPlacedOn WHERE OperationID=" + pOperationID.ToString() + ")", "ID", out _RowCount);
                }
                #region Call SetReceivablesQuantity
                SetReceivablesQuantity(pOperationID);
                #endregion Call SetReceivablesQuantity
            }

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[]
            {
                _result
                , pID
                ,_IsRepeted ?null : new JavaScriptSerializer().Serialize(objCvwOperationContainersAndPackages.lstCVarvwOperationContainersAndPackages)
                ,_IsRepeted ?null : new JavaScriptSerializer().Serialize(objCvwOperations.lstCVarvwOperations[0]) //pData[3]
				, _MessageReturned //_MessageReturned = pData[4]
				, _IsRepeted ?null :serializer.Serialize(objCvwPayables.lstCVarvwPayables) //pPayables = pData[5]
				, _IsRepeted ?null :serializer.Serialize(objCvwReceivables.lstCVarvwReceivables) //pReceivables = pData[6]
				, _IsRepeted ?null :serializer.Serialize(objCvwOperationPartners.lstCVarvwOperationPartners) //pOperationPartner = pData[7]
				, _IsRepeted  //pData[8]
			};
        }

        [HttpGet, HttpPost]
        public object[] TransferContainer(Int64 pTransferredContainerID, Int64 pOriginalOperationID, Int64 pTransferToOperationID)
        {
            string _MessageReturned = "";
            Exception checkException = new Exception();
            int _RowCount = 0;
            CPayables objCPayables = new CPayables();
            CReceivables objCReceivables = new CReceivables();

            #region if Receivables/Payables connected to container don't transfer
            checkException = objCReceivables.GetListPaging(1, 1, "WHERE IsDeleted=0 AND OperationContainersAndPackagesID=" + pTransferredContainerID, "ID", out _RowCount);
            checkException = objCPayables.GetListPaging(1, 1, "WHERE IsDeleted=0 AND OperationContainersAndPackagesID=" + pTransferredContainerID, "ID", out _RowCount);
            #endregion if Receivables/Payables connected to container don't transfer
            if (objCReceivables.lstCVarReceivables.Count > 0 || objCPayables.lstCVarPayables.Count > 0)
            {
                _MessageReturned = "Please, check this container is not connected to Receivables/Payables.";
            }
            COperationContainersAndPackages objCOperationContainersAndPackages = new COperationContainersAndPackages();
            CContainerPackages objCContainerPackages = new CContainerPackages();
            if (_MessageReturned == "")
            {
                checkException = objCOperationContainersAndPackages.UpdateList("OperationID=" + pTransferToOperationID + " WHERE ID=" + pTransferredContainerID);
                checkException = objCContainerPackages.UpdateList("OperationID=" + pTransferToOperationID + " WHERE OperationContainersAndPackagesID=" + pTransferredContainerID);
                #region Call SetReceivablesQuantity
                SetReceivablesQuantity(pOriginalOperationID);
                SetReceivablesQuantity(pTransferredContainerID);
                #endregion Call SetReceivablesQuantity
            }
            return new object[]
            {
                _MessageReturned
            };
        }

        [HttpGet, HttpPost]
        public object[] ApplyReeferPropertiesToAll(Int64 pOperationIDToApplyReeferProperties, bool pIsReefer, bool pIsNOR, decimal pMinTemp, decimal pMaxTemp, decimal pVentilation, decimal pHumidity)
        {
            Exception checkException = null;
            int _RowCount = 0;
            string pUpdateClause = "";
            COperationContainersAndPackages objCOperationContainersAndPackages = new COperationContainersAndPackages();

            pUpdateClause = (pIsReefer ? "IsReefer=1" : "IsReefer=0") + " \n";
            pUpdateClause += (pIsNOR ? ",IsNOR=1" : ",IsNOR=0") + " \n";
            pUpdateClause += ",MinTemp=" + pMinTemp.ToString() + " \n";
            pUpdateClause += ",MaxTemp=" + pMaxTemp.ToString() + " \n";
            pUpdateClause += ",Ventilation=" + pVentilation.ToString() + " \n";
            pUpdateClause += ",Humidity=" + pHumidity.ToString() + " \n";
            pUpdateClause += "WHERE OperationID=" + pOperationIDToApplyReeferProperties.ToString();
            checkException = objCOperationContainersAndPackages.UpdateList(pUpdateClause);

            CvwOperationContainersAndPackages objCvwOperationContainersAndPackages = new CvwOperationContainersAndPackages();
            //checkException = objCvwOperationContainersAndPackages.GetListPaging(99999, 1, "WHERE OperationID=" + pOperationIDToApplyReeferProperties.ToString(), "ContainerTypeCode, ContainerNumber, PackageTypeName", out _RowCount);
            checkException = objCvwOperationContainersAndPackages.GetListPaging(99999, 1, "WHERE OperationID=" + pOperationIDToApplyReeferProperties.ToString(), "ID", out _RowCount);
            return new object[] {
                new JavaScriptSerializer().Serialize(objCvwOperationContainersAndPackages.lstCVarvwOperationContainersAndPackages)
            };
        }

        [HttpPost]
        public object[] ReeferDetails_Save(ReeferDetails_SaveList Parameters)
        {
            Exception checkException = null;
            int _RowCount = 0;
            string pUpdateClause = "";
            COperationContainersAndPackages objCOperationContainersAndPackages = new COperationContainersAndPackages();

            pUpdateClause = (Parameters.pIsReefer ? "IsReefer=1" : "IsReefer=0") + " \n";
            pUpdateClause += (Parameters.pIsNOR ? ",IsNOR=1" : ",IsNOR=0") + " \n";
            pUpdateClause += ",MinTemp=" + Parameters.pMinTemp.ToString() + " \n";
            pUpdateClause += ",MaxTemp=" + Parameters.pMaxTemp.ToString() + " \n";
            pUpdateClause += ",Ventilation=" + Parameters.pVentilation.ToString() + " \n";
            pUpdateClause += ",Humidity=" + Parameters.pHumidity.ToString() + " \n";
            pUpdateClause += "WHERE OperationID=" + Parameters.pOperationIDToApplyReeferProperties.ToString();
            checkException = objCOperationContainersAndPackages.UpdateList(pUpdateClause);

            var ContainerIDsArray = Parameters.ContainerIDsList.Split(',');
            for (int i = 0; i < ContainerIDsArray.Length; i++ )
            {
                pUpdateClause = " ContainerNumber='" + Parameters.ContainerNumberList.Split(',')[i].ToUpper() + "' ";
                pUpdateClause += " , PurchaseItemID=" + Parameters.PurchaseItemIDList.Split(',')[i];
                pUpdateClause += " , PackageTypeIDOnContainer=" + Parameters.PackageTypeIDOnContainerList.Split(',')[i];
                pUpdateClause += " , NumberOfPackagesOnContainer=" + Parameters.NumberOfPackagesOnContainerList.Split(',')[i];
                pUpdateClause += " , GrossWeightTON=" + Parameters.GrossWeightTONList.Split(',')[i];
                pUpdateClause += " , NetWeightTON=" + Parameters.NetWeightTONList.Split(',')[i];
                pUpdateClause += " , DescriptionOfGoods='" + Parameters.DescriptionOfGoodsList.Split(',')[i] + "' "; ;
                pUpdateClause += " WHERE ID=" + Parameters.ContainerIDsList.Split(',')[i];
                checkException = objCOperationContainersAndPackages.UpdateList(pUpdateClause);

            }



            CvwOperationContainersAndPackages objCvwOperationContainersAndPackages = new CvwOperationContainersAndPackages();
            checkException = objCvwOperationContainersAndPackages.GetListPaging(99999, 1, "WHERE OperationID=" + Parameters.pOperationIDToApplyReeferProperties.ToString(), "ID", out _RowCount);
            return new object[] {
                new JavaScriptSerializer().Serialize(objCvwOperationContainersAndPackages.lstCVarvwOperationContainersAndPackages)
            };
        }


        #region ShipmentPackages : Consolidation-House LCL- House LTL
        [HttpGet, HttpPost]
        public object[] ShipmentPackage_Save(Int64 pID, Int64 pMasterOperationID, Int64 pShipmentID, Int32 pPackageTypeID, Int64 pPlacedOnOCPID, Decimal pLength, Decimal pWidth, Decimal pHeight, Decimal pVolume, Decimal pVolumetricWeight, Decimal pNetWeight, Decimal pGrossWeight, Decimal pChargeableWeight, Int32 pQuantity, string pDescriptionOfGoods
            //header parameters
            , Int32 pBranchID, Int32 pSalesmanID, string pOpenDate, string pHouseNumber, Int32 pDeliveryCityID, Int32 pShipperID, Int32 pConsigneeID, Int32 pAgentID, Int32 pNotifyID, string pNotesOnHeader, bool pIsDelivered, Int32 pConsigneeID2, string pReleaseDate)
        {
            int _RowCount = 0;
            Exception checkException = null;
            string pUpdateClause = "";
            COperationPartners objCOperationPartners = new COperationPartners();
            var constShipperOperationPartnerTypeID = 1;
            var constConsigneeOperationPartnerTypeID = 2;
            var constNotify1OperationPartnerTypeID = 4;
            var constAgentOperationPartnerTypeID = 6;
            CVarOperationContainersAndPackages objCVarOperationContainersAndPackages = new CVarOperationContainersAndPackages();
            COperationContainersAndPackages objCOperationContainersAndPackages = new COperationContainersAndPackages();
            CvwOperationContainersAndPackages objCvwOperationContainersAndPackages = new CvwOperationContainersAndPackages();
            CContainerPackages objCMasterContainerPackages = new CContainerPackages();
            COperations objCOperations = new COperations();
            #region Existing Shipment
            if (pID == 0) //insert package
            {
                objCVarOperationContainersAndPackages.OperationID = pShipmentID;
                objCVarOperationContainersAndPackages.PackageTypeID = pPackageTypeID;
                objCVarOperationContainersAndPackages.Length = pLength;
                objCVarOperationContainersAndPackages.Width = pWidth;
                objCVarOperationContainersAndPackages.Height = pHeight;
                objCVarOperationContainersAndPackages.Volume = pVolume;
                objCVarOperationContainersAndPackages.VolumetricWeight = pVolumetricWeight;
                objCVarOperationContainersAndPackages.NetWeight = pNetWeight;
                objCVarOperationContainersAndPackages.NetWeightTON = 0;
                objCVarOperationContainersAndPackages.GrossWeight = pGrossWeight;
                objCVarOperationContainersAndPackages.GrossWeightTON = 0;
                objCVarOperationContainersAndPackages.ChargeableWeight = pChargeableWeight;
                objCVarOperationContainersAndPackages.Quantity = pQuantity; //always comes 0 coz its used with packages
                objCVarOperationContainersAndPackages.DescriptionOfGoods = pDescriptionOfGoods;

                objCVarOperationContainersAndPackages.ContainerNumber = "0";
                objCVarOperationContainersAndPackages.CarrierSeal = "0";
                objCVarOperationContainersAndPackages.ShipperSeal = "0";
                objCVarOperationContainersAndPackages.MarksAndNumbers = "0";
                objCVarOperationContainersAndPackages.LotNumber = "0";

                objCVarOperationContainersAndPackages.PlacedOnOCPID = pPlacedOnOCPID; //AsContainerPackage
                #region ContainerTracking
                objCVarOperationContainersAndPackages.GateOutPortID = 0;
                objCVarOperationContainersAndPackages.GateInPortID = 0;
                objCVarOperationContainersAndPackages.GateOutDate = DateTime.Parse("01/01/1900");
                objCVarOperationContainersAndPackages.StuffingDate = DateTime.Parse("01/01/1900");
                objCVarOperationContainersAndPackages.LoadingDate = DateTime.Parse("01/01/1900");
                objCVarOperationContainersAndPackages.GateOutAndLoadingDatesDifference = 0;
                objCVarOperationContainersAndPackages.Factory = "0";
                objCVarOperationContainersAndPackages.ExportBLNumber = "0";
                objCVarOperationContainersAndPackages.ImportBLNumber = "0";
                objCVarOperationContainersAndPackages.IsLoaded = false;
                objCVarOperationContainersAndPackages.IsTracked = false;
                objCVarOperationContainersAndPackages.IsOwnedByCompany = false;
                objCVarOperationContainersAndPackages.TrailerID = 0;
                objCVarOperationContainersAndPackages.DriverID = 0;
                objCVarOperationContainersAndPackages.DriverAssistantID = 0;
                objCVarOperationContainersAndPackages.SupplierTrailerName = "0";
                objCVarOperationContainersAndPackages.SupplierDriverName = "0";
                objCVarOperationContainersAndPackages.SupplierDriverAssistantName = "0";
                #endregion ContainerTracking
                #region AirAgents columns
                objCVarOperationContainersAndPackages.Rate = 0;
                objCVarOperationContainersAndPackages.IsAsAgreed = false;
                objCVarOperationContainersAndPackages.IsMinimum = false;
                objCVarOperationContainersAndPackages.WeightUnit = "0";
                objCVarOperationContainersAndPackages.RateClass = "0";
                #endregion AirAgents columns

                #region Tank
                objCVarOperationContainersAndPackages.TankOrFlexiNumber = "0";
                objCVarOperationContainersAndPackages.ReturnDepot = "0";
                objCVarOperationContainersAndPackages.OperatorID = 0;
                objCVarOperationContainersAndPackages.StatusID = 0;

                objCVarOperationContainersAndPackages.IsFull = false;
                objCVarOperationContainersAndPackages.ExitDate = DateTime.Parse("01/01/1900");
                objCVarOperationContainersAndPackages.ReturnDate = DateTime.Parse("01/01/1900");
                objCVarOperationContainersAndPackages.TankCertExpiryDate = DateTime.Parse("01/01/1900");
                objCVarOperationContainersAndPackages.FreeDays = 0;
                objCVarOperationContainersAndPackages.DayValue = 0;
                #endregion Tank
                #region Yard
                objCVarOperationContainersAndPackages.YardEIRNumber = 0;
                objCVarOperationContainersAndPackages.YardEIRNumberOut = 0;
                objCVarOperationContainersAndPackages.YardInDate = DateTime.Parse("01/01/1900");
                objCVarOperationContainersAndPackages.YardInTime = 0;
                objCVarOperationContainersAndPackages.YardOutDate = DateTime.Parse("01/01/1900");
                objCVarOperationContainersAndPackages.YardOutTime = 0;
                objCVarOperationContainersAndPackages.YardLocationID = 0;
                objCVarOperationContainersAndPackages.YardIsIn = 0;
                #endregion Yard

                objCVarOperationContainersAndPackages.CreatorUserID = objCVarOperationContainersAndPackages.ModificatorUserID = WebSecurity.CurrentUserId;
                objCVarOperationContainersAndPackages.CreationDate = objCVarOperationContainersAndPackages.ModificationDate = DateTime.Now;

                objCOperationContainersAndPackages.lstCVarOperationContainersAndPackages.Add(objCVarOperationContainersAndPackages);
                checkException = objCOperationContainersAndPackages.SaveMethod(objCOperationContainersAndPackages.lstCVarOperationContainersAndPackages);
                pID = objCVarOperationContainersAndPackages.ID;
            }
            else //update package
            {
                pUpdateClause = "PackageTypeID=" + (pPackageTypeID == 0 ? "NULL" : pPackageTypeID.ToString()) + "\n";
                pUpdateClause += ", Length=" + (pLength == 0 ? "NULL" : pLength.ToString()) + "\n";
                pUpdateClause += ", Width=" + (pWidth == 0 ? "NULL" : pWidth.ToString()) + "\n";
                pUpdateClause += ", Height=" + (pHeight == 0 ? "NULL" : pHeight.ToString()) + "\n";
                pUpdateClause += ", Volume=" + (pVolume == 0 ? "NULL" : pVolume.ToString()) + "\n";
                pUpdateClause += ", VolumetricWeight=" + (pVolumetricWeight == 0 ? "NULL" : pVolumetricWeight.ToString()) + "\n";
                pUpdateClause += ", NetWeight=" + (pNetWeight == 0 ? "NULL" : pNetWeight.ToString()) + "\n";
                pUpdateClause += ", GrossWeight=" + (pGrossWeight == 0 ? "NULL" : pGrossWeight.ToString()) + "\n";
                pUpdateClause += ", ChargeableWeight=" + (pChargeableWeight == 0 ? "NULL" : pChargeableWeight.ToString()) + "\n";
                pUpdateClause += ", Quantity=" + (pQuantity == 0 ? "NULL" : pQuantity.ToString()) + "\n";
                pUpdateClause += ", PlacedOnOCPID=" + (pPlacedOnOCPID == 0 ? "NULL" : pPlacedOnOCPID.ToString()) + "\n";
                pUpdateClause += ", DescriptionOfGoods=" + (pDescriptionOfGoods == "0" ? "NULL" : ("N'" + pDescriptionOfGoods.ToString() + "'")) + "\n";
                pUpdateClause += " , ModificatorUserID = " + WebSecurity.CurrentUserId.ToString();
                pUpdateClause += " , ModificationDate = GETDATE() ";
                pUpdateClause += " WHERE ID=" + pID.ToString();
                checkException = objCOperationContainersAndPackages.UpdateList(pUpdateClause);
            }
            #endregion Existing Shipment
            #region if placed on container then add to ContainerPackages
            checkException = objCMasterContainerPackages.DeleteList("WHERE HouseOCPID=" + pID);
            if (pPlacedOnOCPID > 0) //insert to ContainerPackages && Consolidation
            {
                #region Add to ContainerPackages
                CVarContainerPackages objCVarMasterContainerPackages = new CVarContainerPackages();
                objCVarMasterContainerPackages.OperationID = pMasterOperationID;
                objCVarMasterContainerPackages.OperationContainersAndPackagesID = pPlacedOnOCPID;
                objCVarMasterContainerPackages.HouseOperationID = pShipmentID; //the house operation
                objCVarMasterContainerPackages.PackageTypeID = pPackageTypeID;
                objCVarMasterContainerPackages.Quantity = pQuantity;
                objCVarMasterContainerPackages.Length = pLength;
                objCVarMasterContainerPackages.Width = pWidth;
                objCVarMasterContainerPackages.Height = pHeight;
                objCVarMasterContainerPackages.Volume = pVolume;
                objCVarMasterContainerPackages.VolumetricWeight = pVolumetricWeight;
                objCVarMasterContainerPackages.NetWeight = pNetWeight;
                objCVarMasterContainerPackages.GrossWeight = pGrossWeight;
                objCVarMasterContainerPackages.ChargeableWeight = pChargeableWeight;
                objCVarMasterContainerPackages.DescriptionOfGoods = pDescriptionOfGoods;
                objCVarMasterContainerPackages.MarksAndNumbers = "0";
                objCVarMasterContainerPackages.HouseOCPID = pID; //the OCP ID of the house
                #region AirAgents columns
                objCVarOperationContainersAndPackages.Rate = 0;
                objCVarOperationContainersAndPackages.IsAsAgreed = false;
                objCVarOperationContainersAndPackages.IsMinimum = false;
                objCVarOperationContainersAndPackages.WeightUnit = "0";
                objCVarOperationContainersAndPackages.RateClass = "0";
                #endregion AirAgents columns

                #region Tank
                objCVarOperationContainersAndPackages.TankOrFlexiNumber = "0";
                objCVarOperationContainersAndPackages.ReturnDepot = "0";
                objCVarOperationContainersAndPackages.OperatorID = 0;
                objCVarOperationContainersAndPackages.StatusID = 0;

                objCVarOperationContainersAndPackages.IsFull = false;
                objCVarOperationContainersAndPackages.ExitDate = DateTime.Parse("01/01/1900");
                objCVarOperationContainersAndPackages.ReturnDate = DateTime.Parse("01/01/1900");
                objCVarOperationContainersAndPackages.TankCertExpiryDate = DateTime.Parse("01/01/1900");
                objCVarOperationContainersAndPackages.FreeDays = 0;
                objCVarOperationContainersAndPackages.DayValue = 0;
                #endregion Tank
                #region Yard
                objCVarOperationContainersAndPackages.YardEIRNumber = 0;
                objCVarOperationContainersAndPackages.YardEIRNumberOut = 0;
                objCVarOperationContainersAndPackages.YardInDate = DateTime.Parse("01/01/1900");
                objCVarOperationContainersAndPackages.YardInTime = 0;
                objCVarOperationContainersAndPackages.YardOutDate = DateTime.Parse("01/01/1900");
                objCVarOperationContainersAndPackages.YardOutTime = 0;
                objCVarOperationContainersAndPackages.YardLocationID = 0;
                objCVarOperationContainersAndPackages.YardIsIn = 0;
                #endregion Yard

                objCVarMasterContainerPackages.CreatorUserID = objCVarMasterContainerPackages.ModificatorUserID = WebSecurity.CurrentUserId;
                objCVarMasterContainerPackages.CreationDate = objCVarMasterContainerPackages.ModificationDate = DateTime.Now;

                objCMasterContainerPackages.lstCVarContainerPackages.Add(objCVarMasterContainerPackages);
                checkException = objCMasterContainerPackages.SaveMethod(objCMasterContainerPackages.lstCVarContainerPackages);
                #endregion Add to ContainerPackages

            }
            #endregion if placed on container the add to ContainerPackages
            #region set IsPackagesPlacedOnMaster on Shipment
            pUpdateClause = " IsPackagesPlacedOnMaster=" + " \n";
            pUpdateClause += " CASE ((SELECT COUNT(ID) FROM OperationContainersAndPackages OCP WHERE OCP.HouseOperationID=X.ID)" + " \n";
            pUpdateClause += "         + (SELECT COUNT(ID) FROM ContainerPackages CP WHERE CP.HouseOperationID=X.ID))" + " \n";
            pUpdateClause += "     WHEN 0 THEN CAST(0 AS bit)" + " \n";
            pUpdateClause += "     ELSE CAST(1 AS bit)" + " \n";
            pUpdateClause += " END" + " \n";
            pUpdateClause += " FROM Operations X" + " \n";
            pUpdateClause += " WHERE X.ID=" + pShipmentID.ToString() + "\n";
            objCOperations.UpdateList(pUpdateClause);
            #endregion IsPackagesPlacedOnMaster on Shipment

            #region Update Header
            pUpdateClause = " BranchID=" + (pBranchID == 0 ? "NULL" : pBranchID.ToString()) + " \n";
            pUpdateClause += ", SalesmanID=" + pSalesmanID + " \n";
            pUpdateClause += ", OpenDate='" + Forwarding.MvcApp.Helpers.DateFunctionsController.GetYYYYMMDDFormat(pOpenDate, 2) + "' \n";
            pUpdateClause += ", HouseNumber=" + (pHouseNumber == "0" ? "NULL" : ("'" + pHouseNumber + "'")) + " \n";
            pUpdateClause += ", DeliveryCityID=" + (pDeliveryCityID == 0 ? "NULL" : pDeliveryCityID.ToString()) + " \n";
            pUpdateClause += ", ShipperID=" + (pShipperID == 0 ? "NULL" : pShipperID.ToString()) + " \n";
            pUpdateClause += ", ConsigneeID=" + (pConsigneeID == 0 ? "NULL" : pConsigneeID.ToString()) + " \n";
            pUpdateClause += ", AgentID=" + (pAgentID == 0 ? "NULL" : pAgentID.ToString()) + " \n";
            pUpdateClause += ", Notes=" + (pNotesOnHeader == "0" ? "NULL" : ("'" + pNotesOnHeader + "'")) + " \n";

            pUpdateClause += ", IsDelivered = " + (pIsDelivered ? "1" : "0") + " \n";
            pUpdateClause += ", ConsigneeID2=" + (pConsigneeID2 == 0 ? "NULL" : pConsigneeID2.ToString()) + " \n";
            pUpdateClause += (pReleaseDate == "" ? " ,ReleaseDate = NULL " : " ,ReleaseDate = '" + Forwarding.MvcApp.Helpers.DateFunctionsController.GetYYYYMMDDFormat(pReleaseDate, 2) + "'") + " \n";

            pUpdateClause += " WHERE ID=" + pShipmentID.ToString() + " \n";
            checkException = objCOperations.UpdateList(pUpdateClause);

            //Update Shipper
            pUpdateClause = "CustomerID=" + (pShipperID == 0 ? "NULL" : pShipperID.ToString()) + "\n";
            pUpdateClause += ", ContactID=(select min(ID) from Contacts where PartnerTypeID=" + constShipperOperationPartnerTypeID + " and PartnerID=" + pShipperID + ")" + "\n";
            pUpdateClause += " WHERE OperationID=" + pShipmentID.ToString() + " AND OperationPartnerTypeID=" + constShipperOperationPartnerTypeID;
            checkException = objCOperationPartners.UpdateList(pUpdateClause);
            //Update Consignee
            pUpdateClause = "CustomerID=" + (pConsigneeID == 0 ? "NULL" : pConsigneeID.ToString()) + "\n";
            pUpdateClause += ", ContactID=(select min(ID) from Contacts where PartnerTypeID=" + constConsigneeOperationPartnerTypeID + " and PartnerID=" + pConsigneeID + ")" + "\n";
            pUpdateClause += " WHERE OperationID=" + pShipmentID.ToString() + " AND OperationPartnerTypeID=" + constConsigneeOperationPartnerTypeID;
            checkException = objCOperationPartners.UpdateList(pUpdateClause);
            //Update Agent
            pUpdateClause = "AgentID=" + (pAgentID == 0 ? "NULL" : pAgentID.ToString()) + "\n";
            pUpdateClause += ", ContactID=(select min(ID) from Contacts where PartnerTypeID=" + constAgentOperationPartnerTypeID + " and PartnerID=" + pAgentID + ")" + "\n";
            pUpdateClause += " WHERE OperationID=" + pShipmentID.ToString() + " AND OperationPartnerTypeID=" + constAgentOperationPartnerTypeID;
            checkException = objCOperationPartners.UpdateList(pUpdateClause);
            //Update Notify
            pUpdateClause = "CustomerID=" + (pNotifyID == 0 ? "NULL" : pNotifyID.ToString()) + "\n";
            pUpdateClause += ", ContactID=(select min(ID) from Contacts where PartnerTypeID=" + constNotify1OperationPartnerTypeID + " and PartnerID=" + pNotifyID + ")" + "\n";
            pUpdateClause += " WHERE OperationID=" + pShipmentID.ToString() + " AND OperationPartnerTypeID=" + constNotify1OperationPartnerTypeID;
            checkException = objCOperationPartners.UpdateList(pUpdateClause);
            #endregion Update Header

            objCvwOperationContainersAndPackages.GetListPaging(10000, 1, "WHERE OperationID=" + pShipmentID.ToString(), "PackageTypeName", out _RowCount);
            //objCvwOperationContainersAndPackages.GetListPaging(10000, 1, "WHERE ID IN (SELECT OperationContainersAndPackagesID FROM OperationContainersAndPackagesPlacedOn WHERE OperationID="+ pShipmentID.ToString() + ")", "PackageTypeName", out _RowCount);
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                checkException == null ? pID : 0 //pData[0]
				, checkException == null ? serializer.Serialize(objCvwOperationContainersAndPackages.lstCVarvwOperationContainersAndPackages) : null //pData[1]
			};
        }

        [HttpGet, HttpPost]
        public object[] ShipmentPackage_DeleteList(string pShipmentPackageIDToDelete, Int64 pShipmentID)
        {
            //bool _result = true;
            //Exception checkException = null;
            //int _RowCount = 0;
            //COperationContainersAndPackages objCOperationContainersAndPackages = new COperationContainersAndPackages();
            //CvwOperationContainersAndPackages objCvwOperationContainersAndPackages = new CvwOperationContainersAndPackages();
            //CContainerPackages objCContainerPackages = new CContainerPackages();
            //var arrDeletedIDs = pShipmentPackageIDToDelete.Split(',');
            //for (int i = 0; i < arrDeletedIDs.Length; i++)
            //{
            //	checkException = objCContainerPackages.DeleteList("WHERE HouseOCPID=" + arrDeletedIDs[i]);
            //	checkException = objCOperationContainersAndPackages.DeleteList("WHERE ID=" + arrDeletedIDs[i]);
            //	if (checkException != null)
            //		_result = false;
            //}
            //objCvwOperationContainersAndPackages.GetListPaging(1000, 1, "WHERE OperationID=" + pShipmentID.ToString(), "PackageTypeName", out _RowCount);
            //ShipmentPackage_SetIsPackagesPlacedOnMaster();
            //return new object[] {
            //	_result
            //	, new JavaScriptSerializer().Serialize(objCvwOperationContainersAndPackages.lstCVarvwOperationContainersAndPackages)
            //};

            //bool _result = true;
            //Exception checkException = null;
            //int _RowCount = 0;
            //string pUpdateClause = "";
            //COperations objCOperation = new COperations();
            //COperationContainersAndPackagesPlacedOn objCOperationContainersAndPackagesPlacedOn = new COperationContainersAndPackagesPlacedOn();
            //var arrDeletedIDs = pShipmentPackageIDToDelete.Split(',');
            //for (int i = 0; i < arrDeletedIDs.Length; i++)
            //{
            //    checkException = objCOperationContainersAndPackagesPlacedOn.DeleteList("WHERE OperationContainersAndPackagesID=" + arrDeletedIDs[i] + " AND OperationID=" + pShipmentID);
            //    if (checkException != null)
            //        _result = false;
            //    pUpdateClause = " PlacedOnOperationContainersAndPackagesID=NULL";
            //    pUpdateClause += " WHERE ID=" + pShipmentID;
            //    checkException = objCOperation.UpdateList(pUpdateClause);

            //}

            bool _result = true;
            int _RowCount = 0;

            CDefaults objCDefaults = new CDefaults();
            objCDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount);
            Exception checkException = null;
            COperationContainersAndPackages objCOperationContainersAndPackages = new COperationContainersAndPackages();
            COperationContainersAndPackagesPlacedOn objCOperationContainersAndPackagesPlacedOn = new COperationContainersAndPackagesPlacedOn();
            var arrDeletedIDs = pShipmentPackageIDToDelete.Split(',');
            for (int i = 0; i < arrDeletedIDs.Length; i++)
            {
                if (objCDefaults.lstCVarDefaults[0].UnEditableCompanyName == "EEL" || objCDefaults.lstCVarDefaults[0].UnEditableCompanyName == "UNV")
                {    
                    checkException = objCOperationContainersAndPackages.DeleteList("WHERE ID=" + arrDeletedIDs[i] + " AND OperationID=" + pShipmentID);
                }
                else
                {
                    //checkException = objCOperationContainersAndPackages.DeleteList("WHERE ID=" + arrDeletedIDs[i] + " AND OperationID=" + pShipmentID);
                    checkException = objCOperationContainersAndPackagesPlacedOn.DeleteList("WHERE OperationContainersAndPackagesID=" + arrDeletedIDs[i] + " AND OperationID=" + pShipmentID);
                }

                if (checkException != null)
                    _result = false;

            }


            CvwOperationContainersAndPackages objCvwOperationContainersAndPackages = new CvwOperationContainersAndPackages();
            objCvwOperationContainersAndPackages.GetListPaging(1000, 1, "WHERE OperationID=" + pShipmentID.ToString(), "PackageTypeName", out _RowCount);
            return new object[] {
                _result
                , new JavaScriptSerializer().Serialize(objCvwOperationContainersAndPackages.lstCVarvwOperationContainersAndPackages)
            };
        }

        public void ShipmentPackage_SetIsPackagesPlacedOnMaster()
        {
            string pUpdateClause = "";
            COperations objCShipment = new COperations();
            pUpdateClause = "IsPackagesPlacedOnMaster=" + " \n";
            pUpdateClause += " CASE ((SELECT COUNT(ID) FROM OperationContainersAndPackages OCP WHERE OCP.HouseOperationID=X.ID)" + " \n";
            pUpdateClause += "         + (SELECT COUNT(ID) FROM ContainerPackages CP WHERE CP.HouseOperationID=X.ID))" + " \n";
            pUpdateClause += "     WHEN 0 THEN CAST(0 AS bit)" + " \n";
            pUpdateClause += "     ELSE CAST(1 AS bit)" + " \n";
            pUpdateClause += " END" + " \n";
            pUpdateClause += " FROM Operations X" + " \n";
            objCShipment.UpdateList(pUpdateClause);
        }

        #endregion ShipmentPackages

        [HttpGet, HttpPost]
        public object[] SaveContainerOrRoadNumber(Int64 pOperationID, string pContainerNumber)
        {
            Exception checkException = null;
            string updateClause = "";
            updateClause += " ContainerNumber = '" + pContainerNumber + "'";
            updateClause += " WHERE OperationID = " + pOperationID;
            COperationContainersAndPackages objCOperationContainersAndPackages = new COperationContainersAndPackages();
            checkException = objCOperationContainersAndPackages.UpdateList(updateClause);

            return new object[] { };
        }
        //this works with Masters(FCL,FTL,LCL,LTL and Air) BUT NOT Consolidation Master Operations
        //i.e All Master Operations Except Consolidation
        [HttpGet, HttpPost]
        public Object[] RebuildContainersAndPackages(bool pIsRemoveHousePackages, Int64 pMasterOperationID, string pHouseOperationsIDs) //IsRemoveHousePackages : 0-Add, 1-Remove
        {
            string pWhereClause = "";
            string[] strArrayHousesIDs = pHouseOperationsIDs.Split(',');
            int _RowCount = 0;
            CContainerPackages objCMasterContainerPackages = new CContainerPackages();
            CContainerPackages objCHousesContainerPackages = new CContainerPackages();
            COperationContainersAndPackages objCMasterOperationContainersAndPackages = new COperationContainersAndPackages();
            COperationContainersAndPackages objCHousesOperationContainersAndPackages = new COperationContainersAndPackages();
            COperations objCHouseOperations = new COperations();//update the HouseOperations set the IsPackagesPlacedOnMaster field (to know wether packages are placed on master or not to enable/disable Disconnect House in shipments)
            Exception checkException = null;

            //delete any containers or packages in the Master Operation
            pWhereClause = " WHERE OperationID = " + pMasterOperationID.ToString();
            objCMasterContainerPackages.DeleteList(pWhereClause);
            objCMasterOperationContainersAndPackages.DeleteList(pWhereClause);

            #region update the HouseOperations set the IsPackagesPlacedOnMaster field (to know wether packages are placed on master or not to enable/disable Disconnect House in shipments)
            pWhereClause = " WHERE ID = " + strArrayHousesIDs[0]; //i am sure i have at least 1 row
            if (strArrayHousesIDs.Length > 1)
                for (int i = 1; i < strArrayHousesIDs.Length; i++)
                    pWhereClause += " OR ID = " + strArrayHousesIDs[i];
            string updateClause = " IsPackagesPlacedOnMaster = " + (pIsRemoveHousePackages ? " 0 " : " 1 ");
            updateClause += pWhereClause; //all the connected houses
            checkException = objCHouseOperations.UpdateList(updateClause);
            #endregion

            #region Copying OperationContainersAndPackages from Houses to Master
            if (!pIsRemoveHousePackages) //this means rebuild packages and not Remove Packages
            {

                //get the Containers, Packages And ContainerPackages from houses
                pWhereClause = " WHERE OperationID = " + strArrayHousesIDs[0]; //i am sure i have at least 1 row
                if (strArrayHousesIDs.Length > 1)
                    for (int i = 1; i < strArrayHousesIDs.Length; i++)
                        pWhereClause += " OR OperationID = " + strArrayHousesIDs[i];
                objCHousesOperationContainersAndPackages.GetListPaging(999999, 1, pWhereClause, "ID", out _RowCount);

                foreach (var row in objCHousesOperationContainersAndPackages.lstCVarOperationContainersAndPackages)
                {
                    CVarOperationContainersAndPackages objCVarMasterOperationContainersAndPackages = new CVarOperationContainersAndPackages();

                    objCVarMasterOperationContainersAndPackages.OperationID = pMasterOperationID;
                    objCVarMasterOperationContainersAndPackages.HouseOperationID = row.OperationID;
                    objCVarMasterOperationContainersAndPackages.ContainerTypeID = row.ContainerTypeID;
                    objCVarMasterOperationContainersAndPackages.PackageTypeID = row.PackageTypeID;
                    objCVarMasterOperationContainersAndPackages.Length = row.Length;
                    objCVarMasterOperationContainersAndPackages.Width = row.Width;
                    objCVarMasterOperationContainersAndPackages.Height = row.Height;
                    objCVarMasterOperationContainersAndPackages.Volume = row.Volume;
                    objCVarMasterOperationContainersAndPackages.VolumetricWeight = row.VolumetricWeight;
                    objCVarMasterOperationContainersAndPackages.NetWeight = row.NetWeight;
                    objCVarMasterOperationContainersAndPackages.NetWeightTON = row.NetWeightTON;
                    objCVarMasterOperationContainersAndPackages.GrossWeight = row.GrossWeight;
                    objCVarMasterOperationContainersAndPackages.GrossWeightTON = row.GrossWeightTON;
                    objCVarMasterOperationContainersAndPackages.ChargeableWeight = row.ChargeableWeight;
                    objCVarMasterOperationContainersAndPackages.Quantity = row.Quantity;

                    objCVarMasterOperationContainersAndPackages.ContainerNumber = row.ContainerNumber;
                    objCVarMasterOperationContainersAndPackages.CarrierSeal = row.CarrierSeal;
                    objCVarMasterOperationContainersAndPackages.ShipperSeal = row.ShipperSeal;
                    objCVarMasterOperationContainersAndPackages.TareWeight = row.TareWeight;
                    objCVarMasterOperationContainersAndPackages.VGM = row.VGM;
                    objCVarMasterOperationContainersAndPackages.IsReefer = row.IsReefer;
                    objCVarMasterOperationContainersAndPackages.IsNOR = row.IsNOR;
                    objCVarMasterOperationContainersAndPackages.IsSentToWarehouse = row.IsSentToWarehouse;
                    objCVarMasterOperationContainersAndPackages.IsPeriodicTest = row.IsPeriodicTest;
                    objCVarMasterOperationContainersAndPackages.MinTemp = row.MinTemp;
                    objCVarMasterOperationContainersAndPackages.MaxTemp = row.MaxTemp;
                    objCVarMasterOperationContainersAndPackages.Humidity = row.Humidity;
                    objCVarMasterOperationContainersAndPackages.Ventilation = row.Ventilation;
                    objCVarMasterOperationContainersAndPackages.LotNumber = row.LotNumber;
                    objCVarMasterOperationContainersAndPackages.IsIMO = row.IsIMO;
                    objCVarMasterOperationContainersAndPackages.IMOClass = row.IMOClass;
                    objCVarMasterOperationContainersAndPackages.UNNumber = row.UNNumber;
                    objCVarMasterOperationContainersAndPackages.FlashPoint = row.FlashPoint;
                    objCVarMasterOperationContainersAndPackages.DescriptionOfGoods = row.DescriptionOfGoods;
                    objCVarMasterOperationContainersAndPackages.MarksAndNumbers = row.MarksAndNumbers;
                    objCVarMasterOperationContainersAndPackages.PurchaseItemID = row.PurchaseItemID;
                    objCVarMasterOperationContainersAndPackages.PackageTypeIDOnContainer = row.PackageTypeIDOnContainer;
                    objCVarMasterOperationContainersAndPackages.NumberOfPackagesOnContainer = row.NumberOfPackagesOnContainer;

                    objCVarMasterOperationContainersAndPackages.PlacedOnOCPID = row.PlacedOnOCPID;
                    #region ContainerTracking
                    objCVarMasterOperationContainersAndPackages.GateOutPortID = row.GateOutPortID;
                    objCVarMasterOperationContainersAndPackages.GateInPortID = row.GateInPortID;
                    objCVarMasterOperationContainersAndPackages.GateOutDate = row.GateOutDate;
                    objCVarMasterOperationContainersAndPackages.StuffingDate = row.StuffingDate;
                    objCVarMasterOperationContainersAndPackages.LoadingDate = row.LoadingDate;
                    objCVarMasterOperationContainersAndPackages.GateOutAndLoadingDatesDifference = row.GateOutAndLoadingDatesDifference;
                    objCVarMasterOperationContainersAndPackages.Factory = row.Factory;
                    objCVarMasterOperationContainersAndPackages.ExportBLNumber = row.ExportBLNumber;
                    objCVarMasterOperationContainersAndPackages.ImportBLNumber = row.ImportBLNumber;
                    objCVarMasterOperationContainersAndPackages.IsLoaded = row.IsLoaded; ;
                    objCVarMasterOperationContainersAndPackages.IsTracked = row.IsTracked;
                    objCVarMasterOperationContainersAndPackages.IsOwnedByCompany = row.IsOwnedByCompany;
                    objCVarMasterOperationContainersAndPackages.TrailerID = row.TrailerID;
                    objCVarMasterOperationContainersAndPackages.DriverID = row.DriverID;
                    objCVarMasterOperationContainersAndPackages.DriverAssistantID = row.DriverAssistantID;
                    objCVarMasterOperationContainersAndPackages.SupplierTrailerName = row.SupplierTrailerName;
                    objCVarMasterOperationContainersAndPackages.SupplierDriverName = row.SupplierDriverName;
                    objCVarMasterOperationContainersAndPackages.SupplierDriverAssistantName = row.SupplierDriverAssistantName;
                    #endregion ContainerTracking
                    #region AirAgents columns
                    objCVarMasterOperationContainersAndPackages.Rate = row.Rate;
                    objCVarMasterOperationContainersAndPackages.IsAsAgreed = row.IsAsAgreed;
                    objCVarMasterOperationContainersAndPackages.IsMinimum = row.IsMinimum;
                    objCVarMasterOperationContainersAndPackages.WeightUnit = row.WeightUnit;
                    objCVarMasterOperationContainersAndPackages.RateClass = row.RateClass;
                    #endregion AirAgents columns

                    #region Tank
                    objCVarMasterOperationContainersAndPackages.TankOrFlexiNumber = row.TankOrFlexiNumber;
                    objCVarMasterOperationContainersAndPackages.ReturnDepot = row.ReturnDepot;
                    objCVarMasterOperationContainersAndPackages.OperatorID = row.OperatorID;
                    objCVarMasterOperationContainersAndPackages.StatusID = row.StatusID;

                    objCVarMasterOperationContainersAndPackages.IsFull = row.IsFull;
                    objCVarMasterOperationContainersAndPackages.ExitDate = row.ExitDate;
                    objCVarMasterOperationContainersAndPackages.ReturnDate = row.ReturnDate;
                    objCVarMasterOperationContainersAndPackages.TankCertExpiryDate = row.TankCertExpiryDate;
                    objCVarMasterOperationContainersAndPackages.FreeDays = row.FreeDays;
                    objCVarMasterOperationContainersAndPackages.DayValue = row.DayValue;
                    #endregion Tank
                    #region Yard
                    objCVarMasterOperationContainersAndPackages.YardEIRNumber = row.YardEIRNumber;
                    objCVarMasterOperationContainersAndPackages.YardEIRNumberOut = row.YardEIRNumberOut;
                    objCVarMasterOperationContainersAndPackages.YardInDate = row.YardInDate;
                    objCVarMasterOperationContainersAndPackages.YardInTime = row.YardInTime;
                    objCVarMasterOperationContainersAndPackages.YardOutDate = row.YardOutDate;
                    objCVarMasterOperationContainersAndPackages.YardOutTime = row.YardOutTime;
                    objCVarMasterOperationContainersAndPackages.YardLocationID = row.YardLocationID;
                    objCVarMasterOperationContainersAndPackages.YardIsIn = row.YardIsIn;
                    #endregion Yard

                    objCVarMasterOperationContainersAndPackages.CreatorUserID = objCVarMasterOperationContainersAndPackages.ModificatorUserID = WebSecurity.CurrentUserId;
                    objCVarMasterOperationContainersAndPackages.CreationDate = objCVarMasterOperationContainersAndPackages.ModificationDate = DateTime.Now;

                    objCMasterOperationContainersAndPackages.lstCVarOperationContainersAndPackages.Add(objCVarMasterOperationContainersAndPackages);
                    checkException = objCMasterOperationContainersAndPackages.SaveMethod(objCMasterOperationContainersAndPackages.lstCVarOperationContainersAndPackages);

                    #region Copying ContainersPackages for this container(if FCL,FTL and if exists)
                    pWhereClause = " WHERE OperationContainersAndPackagesID = " + row.ID; //The ID here is the OperationContainersAndPackagesID
                    objCHousesContainerPackages.GetList(pWhereClause);
                    foreach (var CProw in objCHousesContainerPackages.lstCVarContainerPackages) //CProw = ContainerPackageRow
                    {
                        CVarContainerPackages objCVarMasterContainerPackages = new CVarContainerPackages();

                        objCVarMasterContainerPackages.OperationID = pMasterOperationID;
                        objCVarMasterContainerPackages.HouseOperationID = CProw.OperationID;
                        objCVarMasterContainerPackages.OperationContainersAndPackagesID = objCMasterOperationContainersAndPackages.lstCVarOperationContainersAndPackages[0].ID;
                        objCVarMasterContainerPackages.PackageTypeID = CProw.PackageTypeID;
                        objCVarMasterContainerPackages.Quantity = CProw.Quantity;
                        objCVarMasterContainerPackages.GrossWeight = CProw.GrossWeight;
                        objCVarMasterContainerPackages.Volume = CProw.Volume;
                        objCVarMasterContainerPackages.MarksAndNumbers = CProw.MarksAndNumbers;
                        objCVarMasterContainerPackages.DescriptionOfGoods = CProw.DescriptionOfGoods;

                        objCVarMasterContainerPackages.CreatorUserID = objCVarMasterContainerPackages.ModificatorUserID = WebSecurity.CurrentUserId;
                        objCVarMasterContainerPackages.CreationDate = objCVarMasterContainerPackages.ModificationDate = DateTime.Now;

                        objCMasterContainerPackages.lstCVarContainerPackages.Add(objCVarMasterContainerPackages);
                    }
                    checkException = objCMasterContainerPackages.SaveMethod(objCMasterContainerPackages.lstCVarContainerPackages);
                    #endregion Copying OperationContainersAndPackages from Houses to Master
                    //the next line is not to save it twice
                    objCMasterOperationContainersAndPackages.lstCVarOperationContainersAndPackages.Remove(objCVarMasterOperationContainersAndPackages);
                }
            } //of if pMasterOperationID != 0
            #endregion Copying OperationContainersAndPackages from Houses to Master
            ShipmentPackage_SetIsPackagesPlacedOnMaster();
            return new Object[] { };
        }

        //For Consolidation Master Operations
        [HttpGet, HttpPost]
        //to make it many to many convert data type of pMasterOperationContainersAndPackagesID to be string like pHouseOperationsIDs
        //if pWhoIsCalling=0 then The Master has 1 container, so delete all whats on it (the delete WhereClause is OperationID=pMasterConsolidationOperationID)
        //if pWhoIsCalling=1 then The Master has many containers, so delete just the packages of the choosen houses leaving any other packages(i.e. the delete WhereClause is HouseOperationID = any of the pHouseOperationsIDs)
        public Object[] RebuildContainersAndPackages_Consolidation(Int64 pMasterConsolidationOperationID, Int64 pMasterOperationContainersAndPackagesID, string pHouseOperationsIDs, int pWhoIsCalling)//pMasterOperationContainersAndPackagesID: The ID of the Container where the packages are to be placed
        {
            string pWhereClause = "";
            string[] strArrayHousesIDs = pHouseOperationsIDs.Split(',');
            Exception checkException = null;
            COperations objCHouseOperations = new COperations();//to set the PlacedOnOperationContainersAndPackagesID field (to the ID of the container in the Master Op its placed on)
            CContainerPackages objCMasterContainerPackages = new CContainerPackages(); //the container packages for the consolidation master operation
            COperationContainersAndPackages objCMasterOperationContainersAndPackages = new COperationContainersAndPackages(); //here i have the master container
            COperationContainersAndPackages objCHousesOperationContainersAndPackages = new COperationContainersAndPackages(); //here i have the connected house operations packages
            int _RowCount = 0;
            //delete any containers or packages in the Master Operation ContainerPackages
            if (pWhoIsCalling == 0) //refer to this case in the comment before the function name
                pWhereClause = " WHERE OperationID = " + pMasterConsolidationOperationID.ToString(); //i ve one container so i don't need to add the OperationContainersAndPackagesID in the where clause
            else
                if (pWhoIsCalling == 1)
            { //refer to this case in the comment before the function name
                pWhereClause = " WHERE HouseOperationID = " + strArrayHousesIDs[0]; //i am sure i have at least 1 row(building the first part of the where clause, then use OR incase of more than 1 house)
                for (int i = 1; i < strArrayHousesIDs.Length; i++)
                    pWhereClause += " OR HouseOperationID = " + strArrayHousesIDs[i];
            }
            objCMasterContainerPackages.DeleteList(pWhereClause);

            #region update the HouseOperations set the PlacedOnOperationContainersAndPackagesID field (to the ID of the container in the Master Op its placed on)
            pWhereClause = " WHERE ID = " + strArrayHousesIDs[0]; //i am sure i have at least 1 row
            if (strArrayHousesIDs.Length > 1)
                for (int i = 1; i < strArrayHousesIDs.Length; i++)
                    pWhereClause += " OR ID = " + strArrayHousesIDs[i];
            string updateClause = " PlacedOnOperationContainersAndPackagesID = " + (pMasterOperationContainersAndPackagesID == 0 ? " NULL " : pMasterOperationContainersAndPackagesID.ToString());
            updateClause += " , IsPackagesPlacedOnMaster = " + (pMasterOperationContainersAndPackagesID == 0 ? " 0 " : " 1 ");
            updateClause += pWhereClause; //all the connected houses
            checkException = objCHouseOperations.UpdateList(updateClause);
            #endregion
            ShipmentPackage_SetIsPackagesPlacedOnMaster();
            #region Copying OperationContainersAndPackages from Houses(OperationContainersAndPackages) to Master(ContainerPackages)
            if (pMasterOperationContainersAndPackagesID != 0) //for the case of removing from a container
            {

                //get the Packages from houses
                pWhereClause = " WHERE OperationID = " + strArrayHousesIDs[0]; //i am sure i have at least 1 row(building the first part of the where clause, then use OR incase of more than 1 house)
                if (strArrayHousesIDs.Length > 1)
                    for (int i = 1; i < strArrayHousesIDs.Length; i++)
                        pWhereClause += " OR OperationID = " + strArrayHousesIDs[i];
                objCHousesOperationContainersAndPackages.GetListPaging(999999, 1, pWhereClause, "ID", out _RowCount);

                foreach (var row in objCHousesOperationContainersAndPackages.lstCVarOperationContainersAndPackages)
                {
                    CVarContainerPackages objCVarMasterContainerPackages = new CVarContainerPackages();

                    objCVarMasterContainerPackages.OperationID = pMasterConsolidationOperationID;

                    objCVarMasterContainerPackages.OperationContainersAndPackagesID = pMasterOperationContainersAndPackagesID;
                    objCVarMasterContainerPackages.HouseOperationID = row.OperationID;
                    objCVarMasterContainerPackages.PackageTypeID = row.PackageTypeID;
                    objCVarMasterContainerPackages.Quantity = row.Quantity;
                    objCVarMasterContainerPackages.Length = row.Length;
                    objCVarMasterContainerPackages.Width = row.Width;
                    objCVarMasterContainerPackages.Height = row.Height;
                    objCVarMasterContainerPackages.Volume = row.Volume;
                    objCVarMasterContainerPackages.VolumetricWeight = row.VolumetricWeight;
                    objCVarMasterContainerPackages.NetWeight = row.NetWeight;
                    objCVarMasterContainerPackages.GrossWeight = row.GrossWeight;
                    objCVarMasterContainerPackages.ChargeableWeight = row.ChargeableWeight;
                    objCVarMasterContainerPackages.DescriptionOfGoods = row.DescriptionOfGoods;
                    objCVarMasterContainerPackages.MarksAndNumbers = row.MarksAndNumbers;
                    objCVarMasterContainerPackages.HouseOCPID = row.ID;
                    objCVarMasterContainerPackages.CreatorUserID = objCVarMasterContainerPackages.ModificatorUserID = WebSecurity.CurrentUserId;
                    objCVarMasterContainerPackages.CreationDate = objCVarMasterContainerPackages.ModificationDate = DateTime.Now;

                    objCMasterContainerPackages.lstCVarContainerPackages.Add(objCVarMasterContainerPackages);
                }
                checkException = objCMasterContainerPackages.SaveMethod(objCMasterContainerPackages.lstCVarContainerPackages);
            }
            #endregion Copying OperationContainersAndPackages from Houses(OperationContainersAndPackages) to Master(ContainerPackages)

            return new Object[] { };
        }

        [HttpGet, HttpPost]
        public object[] CargoProperties_Save(Int64 pOperationID, decimal pTareWeight, decimal pGrossWeight, decimal pGrossWeightTON
            , decimal pVGM, decimal pNetWeight, decimal pNetWeightTON, decimal pVolume, decimal pChargeableWeight, decimal pVolumetricWeight, Int32 pPackageTypeID
            , Int64 pPlacedOnOperationContainersAndPackagesID, Int32 pNumberOfPackages, string pMarksAndNumbers, string pDescription, string pPlacedOnOperationContainersAndPackagesIDs=null, int pHouseParentID = 0, string pNotes = "")
        {
            int constMasterBLType = 3;
            string _MessageReturned = "";
            //int constClosedStageID = 120;
            string pUpdateClause = "";
            int _RowCount = 0;
            Exception checkException = null;
            CDefaults objCDefaults = new CDefaults();
            objCDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount);
            COperations objCOperations = new COperations();
            CvwOperations objCvwOperations = new CvwOperations();
            COperations objCOperationsMaster = new COperations();
            COperations objCOperationsHouses = new COperations();
            decimal _HouseTareWeight = 0;
            decimal _HouseGrossWeight = 0;
            decimal _HouseGrossWeightTON = 0;
            decimal _HouseVGM = 0;
            decimal _HouseNetWeight = 0;
            decimal _HouseNetWeightTON = 0;
            decimal _HouseVolume = 0;
            decimal _HouseChargeableWeight = 0;
            decimal _HouseVolumetricWeight = 0;
            decimal _HouseNumberOfPackages = 0;
            decimal _MasterTareWeight = 0;
            decimal _MasterGrossWeight = 0;
            decimal _MasterGrossWeightTON = 0;
            decimal _MasterVGM = 0;
            decimal _MasterNetWeight = 0;
            decimal _MasterNetWeightTON = 0;
            decimal _MasterVolume = 0;
            decimal _MasterChargeableWeight = 0;
            decimal _MasterVolumetricWeight = 0;
            decimal _MasterNumberOfPackages = 0;
            bool TotalsError = false;
            #region Check Master Totals related to Houses
            checkException = objCOperations.GetListPaging(999999, 1, "WHERE ID=" + pOperationID, "ID", out _RowCount);
            if (objCOperations.lstCVarOperations[0].MasterOperationID > 0) //house so get master and add the parameters to the houses
            {
                objCOperationsMaster.GetListPaging(999999, 1, "WHERE ID=" + objCOperations.lstCVarOperations[0].MasterOperationID, "ID", out _RowCount);
                objCOperationsHouses.GetListPaging(999999, 1, "WHERE MasterOperationID=" + objCOperations.lstCVarOperations[0].MasterOperationID + " AND ID<>" + pOperationID, "ID", out _RowCount);
                _MasterTareWeight = objCOperationsMaster.lstCVarOperations[0].TareWeight;
                _MasterGrossWeight = objCOperationsMaster.lstCVarOperations[0].GrossWeight;
                _MasterGrossWeightTON = objCOperationsMaster.lstCVarOperations[0].GrossWeightTON;
                _MasterVGM = objCOperationsMaster.lstCVarOperations[0].VGM;
                _MasterNetWeight = objCOperationsMaster.lstCVarOperations[0].NetWeight;
                _MasterNetWeightTON = objCOperationsMaster.lstCVarOperations[0].NetWeightTON;
                _MasterVolume = objCOperationsMaster.lstCVarOperations[0].Volume;
                _MasterChargeableWeight = objCOperationsMaster.lstCVarOperations[0].ChargeableWeight;
                _MasterVolumetricWeight = objCOperationsMaster.lstCVarOperations[0].VolumetricWeight;
                _MasterNumberOfPackages = objCOperationsMaster.lstCVarOperations[0].NumberOfPackages;

                _HouseTareWeight = objCOperationsHouses.lstCVarOperations.Sum(s => s.TareWeight) + pTareWeight;
                _HouseGrossWeight = objCOperationsHouses.lstCVarOperations.Sum(s => s.GrossWeight) + pGrossWeight;
                _HouseGrossWeightTON = objCOperationsHouses.lstCVarOperations.Sum(s => s.GrossWeightTON) + pGrossWeightTON;
                _HouseVGM = objCOperationsHouses.lstCVarOperations.Sum(s => s.VGM) + pVGM;
                _HouseNetWeight = objCOperationsHouses.lstCVarOperations.Sum(s => s.NetWeight) + pNetWeight;
                _HouseNetWeightTON = objCOperationsHouses.lstCVarOperations.Sum(s => s.NetWeightTON) + pNetWeightTON;
                _HouseVolume = objCOperationsHouses.lstCVarOperations.Sum(s => s.Volume) + pVolume;
                _HouseChargeableWeight = objCOperationsHouses.lstCVarOperations.Sum(s => s.ChargeableWeight) + pChargeableWeight;
                _HouseVolumetricWeight = objCOperationsHouses.lstCVarOperations.Sum(s => s.VolumetricWeight) + pVolumetricWeight;
                _HouseNumberOfPackages = objCOperationsHouses.lstCVarOperations.Sum(s => s.NumberOfPackages) + pNumberOfPackages;
            }
            else if (objCOperations.lstCVarOperations[0].BLType == constMasterBLType) //Master so get houses and add the parameters to the master
            {
                //objCOperationsMaster.GetListPaging(999999, 1, "WHERE ID=" + pOperationID, "ID", out _RowCount);
                objCOperationsHouses.GetListPaging(999999, 1, "WHERE MasterOperationID=" + pOperationID, "ID", out _RowCount);
                _MasterTareWeight = pTareWeight;
                _MasterGrossWeight = pGrossWeight;
                _MasterGrossWeightTON = pGrossWeightTON;
                _MasterVGM = pVGM;
                _MasterNetWeight = pNetWeight;
                _MasterNetWeightTON = pNetWeightTON;
                _MasterVolume = pVolume;
                _MasterChargeableWeight = pChargeableWeight;
                _MasterVolumetricWeight = pVolumetricWeight;
                _MasterNumberOfPackages = pNumberOfPackages;

                _HouseTareWeight = objCOperationsHouses.lstCVarOperations.Sum(s => s.TareWeight);
                _HouseGrossWeight = objCOperationsHouses.lstCVarOperations.Sum(s => s.GrossWeight);
                _HouseGrossWeightTON = objCOperationsHouses.lstCVarOperations.Sum(s => s.GrossWeightTON);
                _HouseVGM = objCOperationsHouses.lstCVarOperations.Sum(s => s.VGM);
                _HouseNetWeight = objCOperationsHouses.lstCVarOperations.Sum(s => s.NetWeight);
                _HouseNetWeightTON = objCOperationsHouses.lstCVarOperations.Sum(s => s.NetWeightTON);
                _HouseVolume = objCOperationsHouses.lstCVarOperations.Sum(s => s.Volume);
                _HouseChargeableWeight = objCOperationsHouses.lstCVarOperations.Sum(s => s.ChargeableWeight);
                _HouseVolumetricWeight = objCOperationsHouses.lstCVarOperations.Sum(s => s.VolumetricWeight);
                _HouseNumberOfPackages = objCOperationsHouses.lstCVarOperations.Sum(s => s.NumberOfPackages);
            }
            var CompaniesWithNoTotalsCheck = new string[] { "NEW", "DGL", "MES", "GLO", "ALT", "SAC", "EUR" };
          
            if (!CompaniesWithNoTotalsCheck.Contains(objCDefaults.lstCVarDefaults[0].UnEditableCompanyName)
                && (_MasterTareWeight < _HouseTareWeight || _MasterGrossWeight < _HouseGrossWeight || _MasterGrossWeightTON < _HouseGrossWeightTON
                || _MasterVGM < _HouseVGM || _MasterNetWeight < _HouseNetWeight || _MasterNetWeightTON < _HouseNetWeightTON || _MasterVolume < _HouseVolume
                || _MasterChargeableWeight < _HouseChargeableWeight || _MasterVolumetricWeight < _HouseVolumetricWeight
                || _MasterNumberOfPackages < _HouseNumberOfPackages)
                )
            {
                if(objCDefaults.lstCVarDefaults[0].UnEditableCompanyName != "UNF")
                    _MessageReturned = "The totals on the master must be greater than or equal to the totals on the houses.";
                TotalsError = true;
            }
			#endregion Check Master Totals related to Houses
			if (string.IsNullOrEmpty(pPlacedOnOperationContainersAndPackagesIDs))
				pPlacedOnOperationContainersAndPackagesIDs = pPlacedOnOperationContainersAndPackagesID.ToString();
			var IDsArr = pPlacedOnOperationContainersAndPackagesIDs.Split(',');
			int dummy = 0;
			for (int i = 0; i < IDsArr.Length; i++)
			{
				pPlacedOnOperationContainersAndPackagesID =int.Parse(IDsArr[i]);
				pUpdateClause = "";
				#region Correct Totals so update

				COperationContainersAndPackagesPlacedOn objCOperationContainersAndPackagesPlacedOnOld = new COperationContainersAndPackagesPlacedOn();
				

				if (objCDefaults.lstCVarDefaults[0].UnEditableCompanyName != "ARK" && objCDefaults.lstCVarDefaults[0].UnEditableCompanyName != "MES" && objCDefaults.lstCVarDefaults[0].UnEditableCompanyName != "SEF")
					objCOperationContainersAndPackagesPlacedOnOld.GetListPaging(1, 1, "WHERE OperationContainersAndPackagesID=" + pPlacedOnOperationContainersAndPackagesID, "ID", out dummy);
				else if (objCDefaults.lstCVarDefaults[0].UnEditableCompanyName == "SEF")
					objCOperationContainersAndPackagesPlacedOnOld.GetListPaging(1, 1, "WHERE OperationID=" + pOperationID, "ID", out dummy);
				else
					objCOperationContainersAndPackagesPlacedOnOld.GetListPaging(1, 1, "WHERE OperationContainersAndPackagesID=" + pPlacedOnOperationContainersAndPackagesID + " AND OperationID = " + pOperationID, "ID", out dummy);

				if (_MessageReturned == "")
				{
                    var op = new COperations();
                    op.GetItem(pOperationID);
                    if(op.lstCVarOperations.Count == 1)
                    {
                        op.lstCVarOperations[0].TareWeight = pTareWeight;
                        op.lstCVarOperations[0].GrossWeight = pGrossWeight;
                        op.lstCVarOperations[0].GrossWeightTON = pGrossWeightTON;
                        op.lstCVarOperations[0].VGM = pVGM;
                        op.lstCVarOperations[0].NetWeight = pNetWeight;
                        op.lstCVarOperations[0].NetWeightTON = pNetWeightTON;
                        op.lstCVarOperations[0].Volume = pVolume;
                        op.lstCVarOperations[0].ChargeableWeight = pChargeableWeight;
                        op.lstCVarOperations[0].VolumetricWeight = pVolumetricWeight;
                        op.lstCVarOperations[0].NumberOfPackages = pNumberOfPackages;
                        op.lstCVarOperations[0].PackageTypeID = pPackageTypeID;
                        if (objCDefaults.lstCVarDefaults[0].UnEditableCompanyName == "NIL")
                        {
                            op.lstCVarOperations[0].HouseParentID = pHouseParentID;
                            op.lstCVarOperations[0].BusinessUnit = pNotes;
                        }
                        if(dummy == 0)
                            op.lstCVarOperations[0].PlacedOnOperationContainersAndPackagesID = pPlacedOnOperationContainersAndPackagesID;
                        op.lstCVarOperations[0].MarksAndNumbers = pMarksAndNumbers;
                        op.lstCVarOperations[0].Description = pDescription;

                        checkException = op.SaveMethod(op.lstCVarOperations);
                    }
					/*pUpdateClause += " TareWeight = " + (pTareWeight == 0 ? " NULL " : pTareWeight.ToString());
					pUpdateClause += " , GrossWeight = " + (pGrossWeight == 0 ? " NULL " : pGrossWeight.ToString());
					pUpdateClause += " , GrossWeightTON = " + (pGrossWeightTON == 0 ? " NULL " : pGrossWeightTON.ToString());
					pUpdateClause += " , VGM = " + (pVGM == 0 ? " NULL " : pVGM.ToString());
					pUpdateClause += " , NetWeight = " + (pNetWeight == 0 ? " NULL " : pNetWeight.ToString());
					pUpdateClause += " , NetWeightTON = " + (pNetWeightTON == 0 ? " NULL " : pNetWeightTON.ToString());
					pUpdateClause += " , Volume = " + (pVolume == 0 ? " NULL " : pVolume.ToString());
					pUpdateClause += " , ChargeableWeight = " + (pChargeableWeight == 0 ? " NULL " : pChargeableWeight.ToString());
					pUpdateClause += " , VolumetricWeight = " + (pVolumetricWeight == 0 ? " NULL " : pVolumetricWeight.ToString());
					pUpdateClause += " , NumberOfPackages = " + (pNumberOfPackages == 0 ? " NULL " : pNumberOfPackages.ToString());
					pUpdateClause += " , PackageTypeID = " + (pPackageTypeID == 0 ? " NULL " : pPackageTypeID.ToString());

					if (dummy == 0) // means update PlacedOnOperationContainersAndPackagesID only if it is not assigned to another house
						pUpdateClause += " , PlacedOnOperationContainersAndPackagesID = " + (pPlacedOnOperationContainersAndPackagesID == 0 ? " NULL " : pPlacedOnOperationContainersAndPackagesID.ToString());

                    pMarksAndNumbers = pMarksAndNumbers?.Replace("'", "''");
                    pUpdateClause += " , MarksAndNumbers = " + (pMarksAndNumbers == "0" ? " NULL " : ("N'" + pMarksAndNumbers + "'"));
                    pDescription = pDescription?.Replace("'","''");
					pUpdateClause += " , Description = " + (pDescription == "0" ? " NULL " : ("N'" + pDescription + "'"));

					//updateClause += " , ModificatorUserID = " + WebSecurity.CurrentUserId.ToString();
					//updateClause += " , ModificationDate = GETDATE() ";

					pUpdateClause += " WHERE ID = " + pOperationID.ToString();
					checkException = objCOperations.UpdateList(pUpdateClause);*/
				}
				#endregion Correct Totals so update

				// insert a row into OperationContainersAndPackagesPlacedOn if not exist
				if (checkException == null && pPlacedOnOperationContainersAndPackagesID != 0)
				{
					objCOperationContainersAndPackagesPlacedOnOld.GetListPaging(1, 1, "WHERE OperationID=" + pOperationID + " AND OperationContainersAndPackagesID=" + pPlacedOnOperationContainersAndPackagesID, "ID", out dummy);

					// here pOperationID is the house ID
					// We check if OperationContainersAndPackagesID is already in OperationContainersAndPackagesPlacedOn
					// to make the Validation to not repeat container on more than one house

					if (dummy == 0)
					{
						COperationContainersAndPackagesPlacedOn objCOperationContainersAndPackagesPlacedOn = new COperationContainersAndPackagesPlacedOn();
						CVarOperationContainersAndPackagesPlacedOn objCVarOperationContainersAndPackagesPlacedOn = new CVarOperationContainersAndPackagesPlacedOn();
						objCVarOperationContainersAndPackagesPlacedOn.ID = 0;
						objCVarOperationContainersAndPackagesPlacedOn.OperationID = pOperationID;
						objCVarOperationContainersAndPackagesPlacedOn.OperationContainersAndPackagesID = pPlacedOnOperationContainersAndPackagesID;
						objCVarOperationContainersAndPackagesPlacedOn.CreatorUserID = WebSecurity.CurrentUserId;
						objCVarOperationContainersAndPackagesPlacedOn.ModificatorUserID = WebSecurity.CurrentUserId;
						objCVarOperationContainersAndPackagesPlacedOn.CreationDate = DateTime.Now;
						objCVarOperationContainersAndPackagesPlacedOn.ModificationDate = DateTime.Now;
						objCOperationContainersAndPackagesPlacedOn.lstCVarOperationContainersAndPackagesPlacedOn.Add(objCVarOperationContainersAndPackagesPlacedOn);
						checkException = objCOperationContainersAndPackagesPlacedOn.SaveMethod(objCOperationContainersAndPackagesPlacedOn.lstCVarOperationContainersAndPackagesPlacedOn);
					}

				}
			}
				

            string OtherHouseNumber = "";
            if (dummy != 0)
            {
                COperations OtherHouse = new COperations();
                int dummy2 = 0;
                //OtherHouse.GetListPaging(1, 1, "WHERE ID=" + pOperationID, "ID", out dummy2);
                //OtherHouseNumber = OtherHouse.lstCVarOperations[0].HouseNumber;
                OtherHouseNumber = "";

            }

            dynamic ContainersTotal;

            if (checkException != null) // an exception is caught in the model
            {
                _MessageReturned = checkException.Message;
                ContainersTotal = null;
            }
            else
            {
                CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
                var HOperation = objCCustomizedDBCall.ExecuteQuery_ListOfObjects($"select top 1  NumberOfPackages,ChargeableWeightSum,VolumeSum,GrossWeightSum,ContainerTypes,MasterOperationID from vwOperations where id={pOperationID}", typeof(CVarvwOperations)).Cast<CVarvwOperations>().ToList();
                if (HOperation[0].MasterOperationID > 0)
                {
                    var MOperation = objCCustomizedDBCall.ExecuteQuery_ListOfObjects($"select top 1  NumberOfPackages,ChargeableWeightSum,VolumeSum,GrossWeightSum,ContainerTypes,MasterOperationID from vwOperations where id={HOperation[0].MasterOperationID}", typeof(CVarvwOperations)).Cast<CVarvwOperations>().ToList();
                    ContainersTotal = MOperation[0];
                } else
                {
                    ContainersTotal = HOperation[0];
                }
                /*objCvwOperations.GetListPaging(999999, 1, "WHERE ID=" + pOperationID, "ID", out _RowCount);
                //if house then get the master to get total chgwt,grosswt,.....
                if (objCvwOperations.lstCVarvwOperations[0].MasterOperationID > 0)
                    objCvwOperations.GetListPaging(999999, 1, "WHERE ID=" + objCvwOperations.lstCVarvwOperations[0].MasterOperationID, "ID", out _RowCount);*/
            }

            if(objCDefaults.lstCVarDefaults[0].UnEditableCompanyName == "UNF" && TotalsError)
            {
                _MessageReturned = "The totals on the master must be greater than or equal to the totals on the houses.";
            }
            return new Object[] {
                _MessageReturned
                , pOperationID
                , new JavaScriptSerializer().Serialize(ContainersTotal)
                , OtherHouseNumber
            };
        }


        #region GetCargoPropertiesFromMasterToHouse
        /*[HttpGet, HttpPost]
        public object[] GetCargoPropertiesFromMasterToHouse(int pHouseID)
        {
            //string pUpdateClause = "";
            Exception CheckException = null;
            string MessageReturned = "";
            COperations objHouseOperation = new COperations();
            COperations objMasterOperation = new COperations();
            objHouseOperation.GetItem(pHouseID);
            var House = objHouseOperation.lstCVarOperations[0];
            objMasterOperation.GetItem(House.MasterOperationID);
            var Master = objMasterOperation.lstCVarOperations[0];

            var op = new COperations();
            op.GetItem(pHouseID);
            if (op.lstCVarOperations.Count == 1 && objMasterOperation.lstCVarOperations.Count == 1)
            {
                op.lstCVarOperations[0].TareWeight = Master.TareWeight;
                op.lstCVarOperations[0].GrossWeight = Master.GrossWeight;
                op.lstCVarOperations[0].GrossWeightTON = Master.GrossWeightTON;
                op.lstCVarOperations[0].VGM = Master.VGM;
                op.lstCVarOperations[0].NetWeight = Master.NetWeight;
                op.lstCVarOperations[0].NetWeightTON = Master.NetWeightTON;
                op.lstCVarOperations[0].Volume = Master.Volume;
                op.lstCVarOperations[0].ChargeableWeight = Master.ChargeableWeight;
                op.lstCVarOperations[0].VolumetricWeight = Master.VolumetricWeight;
                op.lstCVarOperations[0].NumberOfPackages = Master.NumberOfPackages;
                op.lstCVarOperations[0].PackageTypeID = Master.PackageTypeID;

                CheckException = op.SaveMethod(op.lstCVarOperations);
            }

            if(CheckException != null)
            {
                MessageReturned = CheckException.Message;
            }

            return new object[] {
                MessageReturned
            };
        }*/
        #endregion
        #region ContainerTracking
        [HttpGet, HttpPost]
        public Object[] ContainerTracking_LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned(bool pIsLoadArrayOfObjects, string pLanguage, Int32 pPageNumber, Int32 pPageSize, string pWhereClause, string pOrderBy)
        {
            Exception checkException = null;
            Int32 _RowCount = 0;
            //CvwOperationsForCombo objCvwOperations = new CvwOperationsForCombo();
            CvwOperationContainersAndPackages objCvwOperationContainersAndPackages = new CvwOperationContainersAndPackages();
            CTRCK_Trailers objCTRCK_Trailers = new CTRCK_Trailers();
            CTRCK_Drivers objCTRCK_Driver = new CTRCK_Drivers();
            CTRCK_Drivers objCTRCK_DriverAssistant = new CTRCK_Drivers();
            CvwOperationsWithMinimalColumns objCvwOperations = new CvwOperationsWithMinimalColumns();
            //not Import - not Air - not LCL
            CvwDefaults objCvwDefaults = new CvwDefaults();
            CPorts objCPorts = new CPorts();
            CWH_RowLocation objCWH_RowLocation = new CWH_RowLocation();
            if (pIsLoadArrayOfObjects)
            {
                objCTRCK_Trailers.GetListPaging(999999, 1, "WHERE IsInactive=0", "Name", out _RowCount);
                checkException = objCTRCK_Driver.GetList("WHERE IsDriver=1 ORDER BY Name");
                checkException = objCTRCK_DriverAssistant.GetList("WHERE IsDriver=0 ORDER BY Name");
                objCvwOperations.GetListPaging(99999, 1, "WHERE DirectionType<>1 AND TransportType<>2 AND ShipmentType<>2 and BLType<>2", "ID DESC", out _RowCount);
                objCvwDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount); //i am sure i ve just one row isa
                objCPorts.GetList("WHERE CountryID=" + objCvwDefaults.lstCVarvwDefaults[0].CountryID.ToString() + " ORDER BY Name");
                objCWH_RowLocation.GetListPaging(99999, 1, "WHERE 1=1", "Code", out _RowCount);
            }
            var pOperationList = objCvwOperations.lstCVarvwOperationsWithMinimalColumns
                    //.GroupBy(g => g.ReceiveID)
                    .Select(s => new
                    {
                        ID = s.ID
                        ,
                        Code = s.Code
                    }).ToList();
            var pWH_RowLocationList = objCWH_RowLocation.lstCVarWH_RowLocation
                    //.GroupBy(g => g.ReceiveID)
                    .Select(s => new
                    {
                        ID = s.ID
                        ,
                        Code = s.Code
                    }).ToList();

            objCvwOperationContainersAndPackages.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[] {
                new JavaScriptSerializer().Serialize(objCvwOperationContainersAndPackages.lstCVarvwOperationContainersAndPackages)
                , _RowCount
                , serializer.Serialize(pOperationList) //data[2]
				, new JavaScriptSerializer().Serialize(objCPorts.lstCVarPorts) //data[3]
				, serializer.Serialize(objCTRCK_Trailers.lstCVarTRCK_Trailers) //data[4]
				, serializer.Serialize(objCTRCK_Driver.lstCVarTRCK_Drivers) //pData[5]
				, serializer.Serialize(objCTRCK_DriverAssistant.lstCVarTRCK_Drivers) //pData[6]
				, serializer.Serialize(pWH_RowLocationList) //data[7]
			};
        }

        [HttpGet, HttpPost]
        public object[] ContainerTracking_Delete(String pRemovedContainerIDsFromTracking)
        {
            string _MessageReturned = "";
            Exception checkException = null;
            CPayables objCPayables = new CPayables();
            CReceivables objCReceivables = new CReceivables();
            int _RowCount = 0;
            objCPayables.GetListPaging(999999, 1, "WHERE OperationContainersAndPackagesID IN(" + pRemovedContainerIDsFromTracking + ")", "ID", out _RowCount);
            objCReceivables.GetListPaging(999999, 1, "WHERE OperationContainersAndPackagesID IN(" + pRemovedContainerIDsFromTracking + ")", "ID", out _RowCount);

            COperationContainersAndPackages objCOperationContainersAndPackages = new COperationContainersAndPackages();

            if (objCReceivables.lstCVarReceivables.Count > 0 || objCPayables.lstCVarPayables.Count > 0)
                _MessageReturned = "Payables/Receivables might be added to the selected records";
            else
            {
                checkException = objCOperationContainersAndPackages.UpdateList("IsTracked=0,IsOwnedByCompany=0,TrailerID=NULL,DriverID=NULL,DriverAssistantID=NULL,SupplierTrailerName=NULL,SupplierDriverName=NULL,SupplierDriverAssistantName=NULL WHERE ID IN(" + pRemovedContainerIDsFromTracking + ")");
                if (checkException != null)
                    _MessageReturned = checkException.Message;
            }
            return new object[] {
                _MessageReturned
            };
        }

        [HttpGet, HttpPost]
        public object[] TrackContainers(string pSelectedItemsIDs)
        {
            bool _result = false;
            string pUpdateClause = "";
            Exception checkException = null;
            pUpdateClause += "IsTracked=1 ";
            pUpdateClause += ",ModificatorUserID=" + WebSecurity.CurrentUserId.ToString() + "\n";
            pUpdateClause += ",ModificationDate=GETDATE()" + "\n";
            pUpdateClause += "WHERE ID IN (" + pSelectedItemsIDs.ToString() + ")";
            COperationContainersAndPackages objCOperationContainersAndPackages = new COperationContainersAndPackages();

            checkException = objCOperationContainersAndPackages.UpdateList(pUpdateClause);

            if (checkException != null) // an exception is caught in the model
            {
                _result = false;
            }
            else //not unique
                _result = true;
            return new object[] {
                _result
            };
        }

        [HttpGet, HttpPost]
        public object[] ContainerTracking_Update(Int64 pID, Int64 pOperationID, Int32 pGateOutPortID, Int32 pGateInPortID
            , string pGateOutDate, string pStuffingDate, string pLoadingDate, int pGateOutAndLoadingDatesDifference
            , string pContainerNumber, string pFactory, string pExportBLNumber, string pImportBLNumber, bool pIsLoaded
            , bool pIsOwnedByCompany, Int32 pTrailerID, Int32 pDriverID, Int32 pDriverAssistantID
            , string pSupplierTrailerName, string pSupplierDriverName, string pSupplierDriverAssistantName
            , Int32 pYardEIRNumber, String pYardInDate, Int32 pYardInTime, String pYardOutDate, Int32 pYardOutTime
            , Int32 pYardLocationID, Int32 pYardIsIn, Int32 pYardEIRNumberOut, Boolean pIsFull)
        {
            bool _result = false;
            Exception checkException = null;
            string pUpdateClause = "";
            COperationContainersAndPackages objCOperationContainersAndPackages = new COperationContainersAndPackages();

            //DateTime.ParseExact(pGateOutDate, "dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture);
            pUpdateClause += (pGateOutPortID == 0 ? "GateOutPortID=NULL" : "GateOutPortID=" + pGateOutPortID.ToString()) + "\n";
            //pUpdateClause += (pGateOutPortID == 0 ? "" : "") + "\n";
            pUpdateClause += (pGateInPortID == 0 ? ",GateInPortID=NULL" : ",GateInPortID=" + pGateInPortID.ToString()) + "\n";
            pUpdateClause += (pGateOutDate == "01/01/1900" ? ",GateOutDate=NULL" : ",GateOutDate='" + pGateOutDate + "'") + "\n";
            pUpdateClause += (pStuffingDate == "01/01/1900" ? ",StuffingDate=NULL" : ",StuffingDate='" + pStuffingDate + "'") + "\n";
            pUpdateClause += (pLoadingDate == "01/01/1900" ? ",LoadingDate=NULL" : ",LoadingDate='" + pLoadingDate + "'") + "\n";
            pUpdateClause += (pGateOutAndLoadingDatesDifference == 0 ? ",GateOutAndLoadingDatesDifference=NULL" : ",GateOutAndLoadingDatesDifference=" + pGateOutAndLoadingDatesDifference.ToString()) + "\n";
            pUpdateClause += (pContainerNumber == "0" ? ",ContainerNumber=NULL" : ",ContainerNumber=N'" + pContainerNumber.ToString() + "'") + "\n";
            pUpdateClause += (pFactory == "0" ? ",Factory=NULL" : ",Factory=N'" + pFactory.ToString() + "'") + "\n";
            pUpdateClause += (pExportBLNumber == "0" ? ",ExportBLNumber=NULL" : ",ExportBLNumber=N'" + pExportBLNumber.ToString() + "'") + "\n";
            pUpdateClause += (pImportBLNumber == "0" ? ",ImportBLNumber=NULL" : ",ImportBLNumber=N'" + pImportBLNumber.ToString() + "'") + "\n";
            pUpdateClause += (pIsLoaded ? ",IsLoaded=1" : ",IsLoaded=0") + "\n";
            pUpdateClause += (pIsOwnedByCompany ? ",IsOwnedByCompany=1" : ",IsOwnedByCompany=0") + "\n";
            pUpdateClause += (pTrailerID == 0 ? ",TrailerID=NULL" : ",TrailerID=" + pTrailerID.ToString()) + "\n";
            pUpdateClause += (pDriverID == 0 ? ",DriverID=NULL" : ",DriverID=" + pDriverID.ToString()) + "\n";
            pUpdateClause += (pDriverAssistantID == 0 ? ",DriverAssistantID=NULL" : ",DriverAssistantID=" + pDriverAssistantID.ToString()) + "\n";
            pUpdateClause += (pSupplierTrailerName == "0" ? ",SupplierTrailerName=NULL" : ",SupplierTrailerName=N'" + pSupplierTrailerName.ToString() + "'") + "\n";
            pUpdateClause += (pSupplierDriverName == "0" ? ",SupplierDriverName=NULL" : ",SupplierDriverName=N'" + pSupplierDriverName.ToString() + "'") + "\n";
            pUpdateClause += (pSupplierDriverAssistantName == "0" ? ",SupplierDriverAssistantName=NULL" : ",SupplierDriverAssistantName=N'" + pSupplierDriverAssistantName.ToString() + "'") + "\n";

            /********************************Ahmed Mohamed**************************/
            pUpdateClause += (pYardEIRNumber == 0 ? ",YardEIRNumber=NULL" : ",YardEIRNumber=" + pYardEIRNumber.ToString()) + "\n";
            pUpdateClause += (pYardInDate == "01/01/1900" ? ",YardInDate=NULL" : ",YardInDate='" + pYardInDate + "'") + "\n";
            pUpdateClause += (pYardInTime == 0 ? ",YardInTime=NULL" : ",YardInTime=" + pYardInTime.ToString()) + "\n";
            pUpdateClause += (pYardOutDate == "01/01/1900" ? ",YardOutDate=NULL" : ",YardOutDate='" + pYardOutDate + "'") + "\n";
            pUpdateClause += (pYardOutTime == 0 ? ",YardOutTime=NULL" : ",YardOutTime=" + pYardOutTime.ToString()) + "\n";
            pUpdateClause += (pYardLocationID == 0 ? ",YardLocationID=NULL" : ",YardLocationID=" + pYardLocationID.ToString()) + "\n";
            pUpdateClause += (pYardIsIn == 0 ? ",YardIsIn=NULL" : ",YardIsIn=" + pYardIsIn.ToString()) + "\n";
            pUpdateClause += (pYardEIRNumberOut == 0 ? ",YardEIRNumberOut=NULL" : ",YardEIRNumberOut=" + pYardEIRNumberOut.ToString()) + "\n";
            pUpdateClause += (pIsFull == true ? ",IsFull='true'" : ",IsFull= 'false'") + "\n";
            /********************************Ahmed Mohamed**************************/
            pUpdateClause += ",ModificatorUserID=" + WebSecurity.CurrentUserId.ToString() + "\n";
            pUpdateClause += ",ModificationDate=GETDATE()" + "\n";
            pUpdateClause += "WHERE ID=" + pID.ToString() + "\n";
            checkException = objCOperationContainersAndPackages.UpdateList(pUpdateClause);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else //not unique
                _result = true;
            return new object[] {
                _result
            };
        }

        public object[] getEirSerial()
        {
            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
            Int32 pNewCode = Int32.Parse(objCCustomizedDBCall.CallStringFunction(" exec GetEirSerial"));
            return new object[] {
                pNewCode
            };

        }

        #endregion ContainerTracking

        #region AWB By A.Medra
        [HttpGet, HttpPost]
        public object[] InsertAirList(string pUnSelectedPackagesIDsToAdd, string pMasterOperationIDList
            , string pHouseOperationIDList, string pPackageTypeIDList, string pChargeableWeightList, string pGrossWeightList, string pQuantityList
            , string pRateCList, string pIsAsAgreedList, string pisMinmumList, string pMarksAndNumbers
            , string pWeightUnit, string pRateClass)
        {
            bool _result = false;
            string updateClause = "";
            string msgReturnedForCurrentPackage = "";//i used this to be reset every iteration so i can use it as a flag to decide wether to send the updated SupplierInvoiceNo or leave unchanged
            string msgReturned = "";

            int NumberOfRows = pUnSelectedPackagesIDsToAdd.Split(',').Length;
            COperationContainersAndPackages objCOperationContainersAndPackages = new COperationContainersAndPackages();
            for (int i = 0; i < NumberOfRows; i++)
            {
                msgReturnedForCurrentPackage = "";// CheckSupplierInvoiceNumberUniqueness(Int64.Parse(pSelectedPayablesIDsToUpdate.Split(',')[i]), pSupplierInvoiceNumberList.Split(',')[i], int.Parse(pPartnerTypeIDList.Split(',')[i]), int.Parse(pPartnerIDList.Split(',')[i]), int.Parse(pEntryYear));

                CVarOperationContainersAndPackages objCVarOperationContainersAndPackages = new CVarOperationContainersAndPackages();

                objCVarOperationContainersAndPackages.ID = Convert.ToInt64(pUnSelectedPackagesIDsToAdd.Split(',')[i]) < 0 ? 0 : Convert.ToInt64(pUnSelectedPackagesIDsToAdd.Split(',')[i]);
                objCVarOperationContainersAndPackages.OperationID = Convert.ToInt64(pMasterOperationIDList.Split(',')[i]);
                objCVarOperationContainersAndPackages.HouseOperationID = Convert.ToInt64(pHouseOperationIDList.Split(',')[i]);

                objCVarOperationContainersAndPackages.PackageTypeID = Convert.ToInt32(pPackageTypeIDList.Split(',')[i]);
                objCVarOperationContainersAndPackages.ChargeableWeight = Convert.ToDecimal(pChargeableWeightList.Split(',')[i]);
                objCVarOperationContainersAndPackages.GrossWeight = Convert.ToDecimal(pGrossWeightList.Split(',')[i]);
                objCVarOperationContainersAndPackages.Quantity = Convert.ToInt32(pQuantityList.Split(',')[i]);
                objCVarOperationContainersAndPackages.Rate = Convert.ToDecimal(pRateCList.Split(',')[i]);
                objCVarOperationContainersAndPackages.IsAsAgreed = Convert.ToBoolean(pIsAsAgreedList.Split(',')[i]);
                objCVarOperationContainersAndPackages.IsMinimum = Convert.ToBoolean(pisMinmumList.Split(',')[i]);
                objCVarOperationContainersAndPackages.WeightUnit = (pWeightUnit.Split(',')[i]);
                objCVarOperationContainersAndPackages.RateClass = (pRateClass.Split(',')[i]);
                objCVarOperationContainersAndPackages.MarksAndNumbers = (pMarksAndNumbers.Split(',')[i]);
                objCVarOperationContainersAndPackages.DescriptionOfGoods = "0";

                #region Tank
                objCVarOperationContainersAndPackages.TankOrFlexiNumber = "0";
                objCVarOperationContainersAndPackages.ReturnDepot = "0";
                objCVarOperationContainersAndPackages.OperatorID = 0;
                objCVarOperationContainersAndPackages.StatusID = 0;

                objCVarOperationContainersAndPackages.IsFull = false;
                objCVarOperationContainersAndPackages.ExitDate = DateTime.Parse("01/01/1900");
                objCVarOperationContainersAndPackages.ReturnDate = DateTime.Parse("01/01/1900");
                objCVarOperationContainersAndPackages.TankCertExpiryDate = DateTime.Parse("01/01/1900");
                objCVarOperationContainersAndPackages.FreeDays = 0;
                objCVarOperationContainersAndPackages.DayValue = 0;
                #endregion Tank
                #region Yard
                objCVarOperationContainersAndPackages.YardEIRNumber = 0;
                objCVarOperationContainersAndPackages.YardEIRNumberOut = 0;
                objCVarOperationContainersAndPackages.YardInDate = DateTime.Parse("01/01/1900");
                objCVarOperationContainersAndPackages.YardInTime = 0;
                objCVarOperationContainersAndPackages.YardOutDate = DateTime.Parse("01/01/1900");
                objCVarOperationContainersAndPackages.YardOutTime = 0;
                objCVarOperationContainersAndPackages.YardLocationID = 0;
                objCVarOperationContainersAndPackages.YardIsIn = 0;
                #endregion Yard

                objCVarOperationContainersAndPackages.ContainerTypeID = 0;
                objCVarOperationContainersAndPackages.Length = 0;
                objCVarOperationContainersAndPackages.Width = 0;
                objCVarOperationContainersAndPackages.Height = 0;
                objCVarOperationContainersAndPackages.Volume = 0;
                objCVarOperationContainersAndPackages.VolumetricWeight = 0;
                objCVarOperationContainersAndPackages.NetWeight = 0;
                objCVarOperationContainersAndPackages.NetWeightTON = 0;
                objCVarOperationContainersAndPackages.GrossWeightTON = 0;
                objCVarOperationContainersAndPackages.ContainerNumber = "0";
                objCVarOperationContainersAndPackages.CarrierSeal = "0";
                objCVarOperationContainersAndPackages.ShipperSeal = "0";

                objCVarOperationContainersAndPackages.TareWeight = 0;
                objCVarOperationContainersAndPackages.VGM = 0;
                objCVarOperationContainersAndPackages.IsReefer = false;
                objCVarOperationContainersAndPackages.IsNOR = false;
                objCVarOperationContainersAndPackages.IsSentToWarehouse = false;
                objCVarOperationContainersAndPackages.IsPeriodicTest = false;
                objCVarOperationContainersAndPackages.MinTemp = 0;
                objCVarOperationContainersAndPackages.MaxTemp = 0;
                objCVarOperationContainersAndPackages.LotNumber = "0";
                objCVarOperationContainersAndPackages.Humidity = 0;
                objCVarOperationContainersAndPackages.Ventilation = 0;
                objCVarOperationContainersAndPackages.IsIMO = false;
                objCVarOperationContainersAndPackages.IMOClass = 0;
                objCVarOperationContainersAndPackages.UNNumber = 0;
                objCVarOperationContainersAndPackages.FlashPoint = 0;
                objCVarOperationContainersAndPackages.PurchaseItemID = 0;
                objCVarOperationContainersAndPackages.PackageTypeIDOnContainer = 0;
                objCVarOperationContainersAndPackages.NumberOfPackagesOnContainer = 0;
                objCVarOperationContainersAndPackages.PlacedOnOCPID = 0;
                #region ContainerTracking
                objCVarOperationContainersAndPackages.GateOutPortID = 0;
                objCVarOperationContainersAndPackages.GateInPortID = 0;
                objCVarOperationContainersAndPackages.GateOutDate = DateTime.Parse("01/01/1900");
                objCVarOperationContainersAndPackages.StuffingDate = DateTime.Parse("01/01/1900");
                objCVarOperationContainersAndPackages.LoadingDate = DateTime.Parse("01/01/1900");
                objCVarOperationContainersAndPackages.GateOutAndLoadingDatesDifference = 0;
                objCVarOperationContainersAndPackages.Factory = "0";
                objCVarOperationContainersAndPackages.ExportBLNumber = "0";
                objCVarOperationContainersAndPackages.ImportBLNumber = "0";
                objCVarOperationContainersAndPackages.IsLoaded = false;
                objCVarOperationContainersAndPackages.IsTracked = false;
                objCVarOperationContainersAndPackages.SupplierDriverName = "0";
                objCVarOperationContainersAndPackages.SupplierDriverAssistantName = "0";
                objCVarOperationContainersAndPackages.SupplierTrailerName = "0";
                #endregion ContainerTracking

                objCVarOperationContainersAndPackages.CreatorUserID = objCVarOperationContainersAndPackages.ModificatorUserID = WebSecurity.CurrentUserId;
                objCVarOperationContainersAndPackages.CreationDate = objCVarOperationContainersAndPackages.ModificationDate = DateTime.Now;
                objCOperationContainersAndPackages.lstCVarOperationContainersAndPackages.Add(objCVarOperationContainersAndPackages);

            }

            for (int i = 0; i < NumberOfRows; i++)
            {
                objCOperationContainersAndPackages.lstCVarOperationContainersAndPackages[0].mIsChanges = true;
                objCOperationContainersAndPackages.SaveMethod(objCOperationContainersAndPackages.lstCVarOperationContainersAndPackages);
            }
            if (msgReturned != "")
                _result = false;
            return new object[] { _result, msgReturned };
        }

        #endregion AWB


        #region Static function to set receivables quantity
        [HttpGet]
        public static void SetReceivablesQuantity(Int64 pOperationID)
        {
            int _RowCount = 0;
            Exception checkException = null;
            var InlandTransportType = 3;
            CDefaults objCDefaults = new CDefaults();
            COperations objCOperations = new COperations();
            COperationContainersAndPackages objCOperationContainersAndPackages = new COperationContainersAndPackages();
            string _UpdateClause = "";
            checkException = objCDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount);
            checkException = objCOperations.GetListPaging(1, 1, "WHERE ID=" + pOperationID, "ID", out _RowCount);
            checkException = objCOperationContainersAndPackages.UpdateList("Quantity=1 WHERE Quantity=0 OR Quantity IS NULL");

            if (objCDefaults.lstCVarDefaults[0].UnEditableCompanyName == "GBL"
                && objCOperations.lstCVarOperations[0].TransportType == InlandTransportType)
            {
                #region Set Receivable Quantity for inland operations to number of containers per operation
                CReceivables objCReceivables = new CReceivables();

                _UpdateClause = "Quantity = (SELECT SUM(Quantity) FROM OperationContainersAndPackages WHERE OperationID=" + pOperationID /*+ "  AND Rou.OperationID=Receivables.OperationID"*/ + ")" + "\n";
                _UpdateClause += "WHERE OperationID IN(" + pOperationID + ")" + "\n";
                _UpdateClause += "  AND GeneratingQRID IS NOT NULL" + "\n";
                _UpdateClause += "  AND InvoiceID IS NULL" + "\n";
                _UpdateClause += "  AND AccNoteID IS NULL" + "\n";

                checkException = objCReceivables.UpdateList(_UpdateClause);
                checkException = objCReceivables.UpdateList("Quantity=1 WHERE Quantity=0 OR Quantity IS NULL");

                #region ensure receivables are correct / Here Recalculate
                _UpdateClause = " AmountWithoutVAT = ROUND((ISNULL(SalePrice, 0) * ISNULL(Quantity, 1)),2)" + " \n";
                _UpdateClause += " , TaxPercentage = (select TT.CurrentPercentage FROM TaxeTypes TT WHERE TT.ID = TaxeTypeID)" + " \n";
                _UpdateClause += " , TaxAmount = ROUND((ISNULL(SalePrice, 0) * ISNULL(Quantity, 1)) * (select TT.CurrentPercentage/100 FROM TaxeTypes TT WHERE TT.ID = TaxeTypeID),2)" + " \n";
                _UpdateClause += " , DiscountPercentage = (select TT.CurrentPercentage FROM TaxeTypes TT WHERE TT.ID = DiscountTypeID)" + " \n";
                _UpdateClause += " , DiscountAmount = ROUND((ISNULL(SalePrice, 0) * ISNULL(Quantity, 1)) * (select TT.CurrentPercentage/100 FROM TaxeTypes TT WHERE TT.ID = DiscountTypeID),2)" + " \n";
                _UpdateClause += " , SaleAmount = ROUND((ISNULL(SalePrice, 0) * ISNULL(Quantity, 1)),2)" + " \n"
                              + " + (ROUND((ISNULL(SalePrice, 0) * ISNULL(Quantity, 1)) * ISNULL((select ISNULL(TT.CurrentPercentage / 100, 0) FROM TaxeTypes TT WHERE TT.ID = TaxeTypeID),0), 2))" + " \n"
                              + " - (ROUND((ISNULL(SalePrice, 0) * ISNULL(Quantity, 1)) * ISNULL((select ISNULL(TT.CurrentPercentage / 100, 0) FROM TaxeTypes TT WHERE TT.ID = DiscountTypeID),0), 2))" + " \n";
                _UpdateClause += "WHERE OperationID IN(" + pOperationID + ")" + "\n";
                _UpdateClause += "  AND GeneratingQRID IS NOT NULL" + "\n";
                _UpdateClause += "  AND InvoiceID IS NULL" + "\n";
                _UpdateClause += "  AND AccNoteID IS NULL" + "\n";
                checkException = objCReceivables.UpdateList(_UpdateClause);
                #endregion ensure receivables are correct / Here Recalculate
                #endregion Set Receivable Quantity for inland operations to number of containers per operation
            } //if (objCvwDefaults.lstCVarvwDefaults[0].IsDepartmentOption)
        }
        #endregion Static function to set receivables quantity


        //[HttpGet, HttpPost]
        //public Task<HttpResponseMessage> GetLog(int pID, string pTableName)
        //{

        //	var stream = Logging.GetList<CVarvwOperationContainersAndPackages, OperationContainersAndPackagesLog>(pID, pTableName);

        //	HttpResponseMessage httpResponseMessage = CreateResponse.Create(stream);

        //	return Task.FromResult(httpResponseMessage);
        //}
        [HttpGet, HttpPost]
        public Task<HttpResponseMessage> GetLog(string pTableName, string pOperationCode)
        {

            var stream = Logging.GetList<CVarvwOperationContainersAndPackages, OperationContainersAndPackagesLog>(99, pTableName, pOperationCode);

            HttpResponseMessage httpResponseMessage = CreateResponse.Create(stream);

            return Task.FromResult(httpResponseMessage);
        }
        [HttpGet, HttpPost]
        public object[] ContainerCheckNumber(string ContainerNumber)
        {
            CheckContainerNumber ChkContNum = new CheckContainerNumber();
            string rescheckContnum = ChkContNum.Check_Container_Number(ContainerNumber);

            return new Object[] {
                new JavaScriptSerializer().Serialize(rescheckContnum) //var pContainerHeader = pData[0];
               
            };

        }

        [HttpGet]
        public object[] ChangeAllContainersWareHouses(Int64 pOperationID, bool pDummy, Int32 pWarehouseID, Int32 pContainerID)
        {
            Exception checkException = null;
            bool _result = true;
            string _message = "";
            int IsSentToWarehouse = 0;
            if(pWarehouseID > 0)
            {
                IsSentToWarehouse = 1;
            }
            //CCustomizedDBCall CheckSameWarehouse = new CCustomizedDBCall();
            int _RowCount = 0;

            CDefaults objCDefaults = new CDefaults();
            objCDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount);

            if(objCDefaults.lstCVarDefaults[0].UnEditableCompanyName != "MES")
            {

                COperationContainersAndPackages objCOperationContainersAndPackages = new COperationContainersAndPackages();
                checkException = objCOperationContainersAndPackages.UpdateList($"WarehouseID={pWarehouseID} ,IsSentToWarehouse={IsSentToWarehouse} WHERE OperationID={pOperationID} AND ID IN (select OperationContainersAndPackagesID from OperationContainersAndPackagesPlacedOn where OperationID in (select operationID from OperationContainersAndPackagesPlacedOn where OperationContainersAndPackagesID in (select OperationContainersAndPackagesID from OperationContainersAndPackagesPlacedOn where OperationID in (select OperationID from OperationContainersAndPackagesPlacedOn where OperationContainersAndPackagesID={pContainerID}))))");
                checkException = objCOperationContainersAndPackages.UpdateList($"WarehouseID={pWarehouseID} ,IsSentToWarehouse={IsSentToWarehouse} WHERE OperationID={pOperationID} AND IsSentToWarehouse=1");

            }
            COperations objCOperations = new COperations();
            checkException = objCOperations.UpdateList($"StoreLocation={pWarehouseID} WHERE MasterOperationID={pOperationID} AND ID IN (select OperationID from OperationContainersAndPackagesPlacedOn where OperationContainersAndPackagesID in (select OperationContainersAndPackagesID from OperationContainersAndPackagesPlacedOn where OperationID in (select operationID from OperationContainersAndPackagesPlacedOn where OperationContainersAndPackagesID in (select OperationContainersAndPackagesID from OperationContainersAndPackagesPlacedOn where OperationID in (select OperationID from OperationContainersAndPackagesPlacedOn where OperationContainersAndPackagesID={pContainerID})))))");
            if(objCDefaults.lstCVarDefaults[0].UnEditableCompanyName != "MES")
            checkException = objCOperations.UpdateList($"StoreLocation={pWarehouseID} WHERE MasterOperationID={pOperationID} AND ID IN (select OperationID from OperationContainersAndPackagesPlacedOn where OperationContainersAndPackagesID in(select ID from OperationContainersAndPackages WHERE OperationID={pOperationID} AND IsSentToWarehouse=1))");

            if (checkException != null)
            {
                _result = false;
                _message = "Other Containers Warehouses Not Changed!";
            }
            return new object[]
            {
                _result
                ,_message
            };
        }
        [HttpGet]
        public object[] CheckGateInStatus(Int64 pOperationID, bool pDummy)
        {
            bool _result = false;
            string _message = "";
            CCustomizedDBCall objCheckGateInStatus = new CCustomizedDBCall();
            var GateInHouses = objCheckGateInStatus.ExecuteQuery_ListOfObjects($"select EntryDate from vwWH_CFS_GateIn where OperationID={pOperationID} and EntryDate is not null", typeof(CvwWH_CFS_GateIn)).Cast<CvwWH_CFS_GateIn>().ToList();

            if (GateInHouses.Count > 0)
            {
                _result = true;
            }
            return new object[]
            {
                _result
            };
        }

        // Made to copy a packages to BED company (AhmedElgabry)
        [HttpGet, HttpPost]
        public object[] Packages_Copy(Int64 pPackagesToCopyID, Int32 pNumberOfCopies)
        {
            bool _result = false;
            string pReturnedMessage = "";
            int _RowCount = 0;
            COperationContainersAndPackages objCvwOperationContainersAndPackages_ToCopy = new COperationContainersAndPackages();
            CvwOperationContainersAndPackages objCvwOperationContainersAndPackages = new CvwOperationContainersAndPackages();

            Exception checkException = null;
            CvwOperations objCvwOperations = new CvwOperations();

            objCvwOperationContainersAndPackages_ToCopy.GetItem(pPackagesToCopyID);

            for (int x = 0; x < pNumberOfCopies; x++)
            {
                CVarOperationContainersAndPackages objCVarOperationContainersAndPackages = new CVarOperationContainersAndPackages();
                objCVarOperationContainersAndPackages.OperationID = objCvwOperationContainersAndPackages_ToCopy.lstCVarOperationContainersAndPackages[0].OperationID;
                objCVarOperationContainersAndPackages.ContainerTypeID = objCvwOperationContainersAndPackages_ToCopy.lstCVarOperationContainersAndPackages[0].ContainerTypeID;
                objCVarOperationContainersAndPackages.PackageTypeID = objCvwOperationContainersAndPackages_ToCopy.lstCVarOperationContainersAndPackages[0].PackageTypeID;
                objCVarOperationContainersAndPackages.Length = objCvwOperationContainersAndPackages_ToCopy.lstCVarOperationContainersAndPackages[0].Length;
                objCVarOperationContainersAndPackages.Width = objCvwOperationContainersAndPackages_ToCopy.lstCVarOperationContainersAndPackages[0].Width;
                objCVarOperationContainersAndPackages.Height = objCvwOperationContainersAndPackages_ToCopy.lstCVarOperationContainersAndPackages[0].Height;
                objCVarOperationContainersAndPackages.Volume = objCvwOperationContainersAndPackages_ToCopy.lstCVarOperationContainersAndPackages[0].Volume;
                objCVarOperationContainersAndPackages.VolumetricWeight = objCvwOperationContainersAndPackages_ToCopy.lstCVarOperationContainersAndPackages[0].VolumetricWeight;
                objCVarOperationContainersAndPackages.NetWeight = objCvwOperationContainersAndPackages_ToCopy.lstCVarOperationContainersAndPackages[0].NetWeight;
                objCVarOperationContainersAndPackages.NetWeightTON = objCvwOperationContainersAndPackages_ToCopy.lstCVarOperationContainersAndPackages[0].NetWeightTON;
                objCVarOperationContainersAndPackages.GrossWeight = objCvwOperationContainersAndPackages_ToCopy.lstCVarOperationContainersAndPackages[0].GrossWeight;
                objCVarOperationContainersAndPackages.GrossWeightTON = objCvwOperationContainersAndPackages_ToCopy.lstCVarOperationContainersAndPackages[0].GrossWeightTON;
                objCVarOperationContainersAndPackages.ChargeableWeight = objCvwOperationContainersAndPackages_ToCopy.lstCVarOperationContainersAndPackages[0].ChargeableWeight;
                objCVarOperationContainersAndPackages.Quantity = objCvwOperationContainersAndPackages_ToCopy.lstCVarOperationContainersAndPackages[0].Quantity; //always comes 0 coz its used with packages
                objCVarOperationContainersAndPackages.TankOrFlexiNumber = objCvwOperationContainersAndPackages_ToCopy.lstCVarOperationContainersAndPackages[0].TankOrFlexiNumber;


                objCVarOperationContainersAndPackages.ContainerNumber = objCvwOperationContainersAndPackages_ToCopy.lstCVarOperationContainersAndPackages[0].ContainerNumber;
                objCVarOperationContainersAndPackages.CarrierSeal = objCvwOperationContainersAndPackages_ToCopy.lstCVarOperationContainersAndPackages[0].CarrierSeal;
                objCVarOperationContainersAndPackages.ShipperSeal = objCvwOperationContainersAndPackages_ToCopy.lstCVarOperationContainersAndPackages[0].ShipperSeal;



                objCVarOperationContainersAndPackages.TareWeight = objCvwOperationContainersAndPackages_ToCopy.lstCVarOperationContainersAndPackages[0].TareWeight;
                objCVarOperationContainersAndPackages.VGM = objCvwOperationContainersAndPackages_ToCopy.lstCVarOperationContainersAndPackages[0].VGM;
                objCVarOperationContainersAndPackages.IsReefer = objCvwOperationContainersAndPackages_ToCopy.lstCVarOperationContainersAndPackages[0].IsReefer;
                objCVarOperationContainersAndPackages.IsNOR = objCvwOperationContainersAndPackages_ToCopy.lstCVarOperationContainersAndPackages[0].IsNOR;
                objCVarOperationContainersAndPackages.IsSentToWarehouse = objCvwOperationContainersAndPackages_ToCopy.lstCVarOperationContainersAndPackages[0].IsSentToWarehouse;
                objCVarOperationContainersAndPackages.IsPeriodicTest = objCvwOperationContainersAndPackages_ToCopy.lstCVarOperationContainersAndPackages[0].IsPeriodicTest;
                objCVarOperationContainersAndPackages.MinTemp = objCvwOperationContainersAndPackages_ToCopy.lstCVarOperationContainersAndPackages[0].MinTemp;
                objCVarOperationContainersAndPackages.MaxTemp = objCvwOperationContainersAndPackages_ToCopy.lstCVarOperationContainersAndPackages[0].MaxTemp;
                objCVarOperationContainersAndPackages.LotNumber = objCvwOperationContainersAndPackages_ToCopy.lstCVarOperationContainersAndPackages[0].LotNumber;
                objCVarOperationContainersAndPackages.Humidity = objCvwOperationContainersAndPackages_ToCopy.lstCVarOperationContainersAndPackages[0].Humidity;
                objCVarOperationContainersAndPackages.Ventilation = objCvwOperationContainersAndPackages_ToCopy.lstCVarOperationContainersAndPackages[0].Ventilation;
                objCVarOperationContainersAndPackages.IsIMO = objCvwOperationContainersAndPackages_ToCopy.lstCVarOperationContainersAndPackages[0].IsIMO;
                objCVarOperationContainersAndPackages.IMOClass = objCvwOperationContainersAndPackages_ToCopy.lstCVarOperationContainersAndPackages[0].IMOClass;
                objCVarOperationContainersAndPackages.UNNumber = objCvwOperationContainersAndPackages_ToCopy.lstCVarOperationContainersAndPackages[0].UNNumber;
                objCVarOperationContainersAndPackages.FlashPoint = objCvwOperationContainersAndPackages_ToCopy.lstCVarOperationContainersAndPackages[0].FlashPoint;
                objCVarOperationContainersAndPackages.DescriptionOfGoods = objCvwOperationContainersAndPackages_ToCopy.lstCVarOperationContainersAndPackages[0].DescriptionOfGoods;
                objCVarOperationContainersAndPackages.MarksAndNumbers = "0";
                objCVarOperationContainersAndPackages.PurchaseItemID = objCvwOperationContainersAndPackages_ToCopy.lstCVarOperationContainersAndPackages[0].PurchaseItemID;
                objCVarOperationContainersAndPackages.PackageTypeIDOnContainer = objCvwOperationContainersAndPackages_ToCopy.lstCVarOperationContainersAndPackages[0].PackageTypeIDOnContainer;
                objCVarOperationContainersAndPackages.NumberOfPackagesOnContainer = objCvwOperationContainersAndPackages_ToCopy.lstCVarOperationContainersAndPackages[0].NumberOfPackagesOnContainer;

                objCVarOperationContainersAndPackages.PlacedOnOCPID = objCvwOperationContainersAndPackages_ToCopy.lstCVarOperationContainersAndPackages[0].PlacedOnOCPID;
                #region ContainerTracking
                objCVarOperationContainersAndPackages.GateOutPortID = 0;
                objCVarOperationContainersAndPackages.GateInPortID = 0;
                objCVarOperationContainersAndPackages.GateOutDate = DateTime.Parse("01/01/1900");
                objCVarOperationContainersAndPackages.StuffingDate = DateTime.Parse("01/01/1900");
                objCVarOperationContainersAndPackages.LoadingDate = objCvwOperationContainersAndPackages_ToCopy.lstCVarOperationContainersAndPackages[0].LoadingDate;
                objCVarOperationContainersAndPackages.GateOutAndLoadingDatesDifference = 0;
                objCVarOperationContainersAndPackages.Factory = objCvwOperationContainersAndPackages_ToCopy.lstCVarOperationContainersAndPackages[0].Factory;
                objCVarOperationContainersAndPackages.ExportBLNumber = "0";
                objCVarOperationContainersAndPackages.ImportBLNumber = "0";
                objCVarOperationContainersAndPackages.IsLoaded = objCvwOperationContainersAndPackages_ToCopy.lstCVarOperationContainersAndPackages[0].IsLoaded;
                objCVarOperationContainersAndPackages.IsTracked = false;
                objCVarOperationContainersAndPackages.IsOwnedByCompany = false;
                objCVarOperationContainersAndPackages.TrailerID = 0;
                objCVarOperationContainersAndPackages.DriverID = 0;
                objCVarOperationContainersAndPackages.DriverAssistantID = 0;
                objCVarOperationContainersAndPackages.SupplierTrailerName = "0";
                objCVarOperationContainersAndPackages.SupplierDriverName = "0";
                objCVarOperationContainersAndPackages.SupplierDriverAssistantName = "0";
                #endregion ContainerTracking
                #region AirAgents columns
                objCVarOperationContainersAndPackages.Rate = 0;
                objCVarOperationContainersAndPackages.IsAsAgreed = false;
                objCVarOperationContainersAndPackages.IsMinimum = false;
                objCVarOperationContainersAndPackages.WeightUnit = "0";
                objCVarOperationContainersAndPackages.RateClass = "0";
                #endregion AirAgents columns

                #region Tank
                //objCVarOperationContainersAndPackages.TankOrFlexiNumber = "0";
                objCVarOperationContainersAndPackages.ReturnDepot = "0";
                objCVarOperationContainersAndPackages.OperatorID = 0;
                objCVarOperationContainersAndPackages.StatusID = 0;

                objCVarOperationContainersAndPackages.IsFull = false;
                objCVarOperationContainersAndPackages.ExitDate = DateTime.Parse("01/01/1900");
                objCVarOperationContainersAndPackages.ReturnDate = objCvwOperationContainersAndPackages_ToCopy.lstCVarOperationContainersAndPackages[0].ReturnDate;
                objCVarOperationContainersAndPackages.TankCertExpiryDate = objCvwOperationContainersAndPackages_ToCopy.lstCVarOperationContainersAndPackages[0].TankCertExpiryDate;
                objCVarOperationContainersAndPackages.FreeDays = 0;
                objCVarOperationContainersAndPackages.DayValue = 0;
                #endregion Tank
                #region Yard
                objCVarOperationContainersAndPackages.YardEIRNumber = 0;
                objCVarOperationContainersAndPackages.YardEIRNumberOut = 0;
                objCVarOperationContainersAndPackages.YardInDate = DateTime.Parse("01/01/1900");
                objCVarOperationContainersAndPackages.YardInTime = 0;
                objCVarOperationContainersAndPackages.YardOutDate = DateTime.Parse("01/01/1900");
                objCVarOperationContainersAndPackages.YardOutTime = 0;
                objCVarOperationContainersAndPackages.YardLocationID = 0;
                objCVarOperationContainersAndPackages.YardIsIn = 0;
                #endregion Yard

                objCVarOperationContainersAndPackages.CreatorUserID = WebSecurity.CurrentUserId;
                objCVarOperationContainersAndPackages.ModificatorUserID = WebSecurity.CurrentUserId;
                objCVarOperationContainersAndPackages.CreationDate = DateTime.Now;
                objCVarOperationContainersAndPackages.ModificationDate = DateTime.Now;

                objCVarOperationContainersAndPackages.WarehouseID = objCvwOperationContainersAndPackages_ToCopy.lstCVarOperationContainersAndPackages[0].WarehouseID;

                COperationContainersAndPackages objCOperationContainersAndPackages = new COperationContainersAndPackages();
                objCOperationContainersAndPackages.lstCVarOperationContainersAndPackages.Add(objCVarOperationContainersAndPackages);
                //objCOperationContainersAndPackages.lstCVarOperationContainersAndPackages[0].mIsChanges = true;
                //objCOperationContainersAndPackages.lstCVarOperationContainersAndPackages[0].ID = 0;
                checkException = objCOperationContainersAndPackages.SaveMethod(objCOperationContainersAndPackages.lstCVarOperationContainersAndPackages);


            }
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else
            { //not unique
                _result = true;
                objCvwOperations.GetListPaging(999999, 1, "WHERE ID=" + objCvwOperationContainersAndPackages_ToCopy.lstCVarOperationContainersAndPackages[0].OperationID, "ID", out _RowCount);
                if (objCvwOperations.lstCVarvwOperations[0].MasterOperationID > 0)
                    objCvwOperations.GetListPaging(999999, 1, "WHERE ID=" + objCvwOperations.lstCVarvwOperations[0].MasterOperationID, "ID", out _RowCount);
                objCvwOperationContainersAndPackages.GetListPaging(1000, 1, "WHERE OperationID=" + objCvwOperationContainersAndPackages_ToCopy.lstCVarOperationContainersAndPackages[0].OperationID.ToString(), "ContainerTypeCode, ContainerNumber, PackageTypeName", out _RowCount);
                //checkException = objCvwOperationContainersAndPackages.GetListPaging(1000, 1, "WHERE OperationID=" + pOperationID.ToString() + " OR ID IN (SELECT OperationContainersAndPackagesID FROM OperationContainersAndPackagesPlacedOn WHERE OperationID=" + pOperationID.ToString() + ")", "ID", out _RowCount);
            }

            return new object[]
            {
                _result
              ,  new JavaScriptSerializer().Serialize(objCvwOperationContainersAndPackages.lstCVarvwOperationContainersAndPackages)
            };

        }
    }
    public class InsertListFromExcel
    {
        public Int64 pOperationID { get; set; }
        public string pContainerNumberList { get; set; }
        public string pContainerTypeCodeList { get; set; }
        public string pCarrierSealList { get; set; }
        public string pTareWeightList { get; set; }
        public string pVolumeList { get; set; }
        public string pNetWeightList { get; set; }
        public string pGrossWeightList { get; set; }
        public string pVGMList { get; set; }
        public string pDescriptionOfGoodsList { get; set; }
        public string pNumberOfPackagesList { get; set; }
        public string pPackageTypeList { get; set; }
        public string pTankNumberList { get; set; }
    }

    public class ReeferDetails_SaveList
    {
        public Int64 pOperationIDToApplyReeferProperties { get; set; }
        public bool pIsReefer { get; set; }
        public bool pIsNOR { get; set; }
        public decimal pMinTemp { get; set; }
        public decimal pMaxTemp { get; set; }
        public decimal pVentilation { get; set; }
        public decimal pHumidity { get; set; }

        public string ContainerIDsList { get; set; }
        public string ContainerNumberList { get; set; }
        public string PurchaseItemIDList { get; set; }
        public string PackageTypeIDOnContainerList { get; set; }
        public string NumberOfPackagesOnContainerList { get; set; }
        public string GrossWeightTONList { get; set; }
        public string NetWeightTONList { get; set; }
        public string DescriptionOfGoodsList { get; set; }
    }
    

    public class OperationContainersAndPackagesLog : baseLog
    {
        public String ContainerNumber { get; set; }
        public String MarksAndNumbers { get; set; }
        public Int32 Quantity { get; set; }
        public String CarrierSeal { get; set; }
        public Decimal TareWeight { get; set; }
        public Decimal Volume { get; set; }
        public Decimal NetWeight { get; set; }
        public Decimal GrossWeight { get; set; }
        public Decimal VGM { get; set; }
        public String DescriptionOfGoods { get; set; }
        public Decimal MinTemp { get; set; }
        public Decimal MaxTemp { get; set; }
        public Decimal Ventilation { get; set; }
        public Decimal Humidity { get; set; }
        public Decimal IMOClass { get; set; }
        public Int32 UNNumber { get; set; }
        public Decimal FlashPoint { get; set; }
        public Int32 NumberOfPackagesOnContainer { get; set; }
        public String PackageTypeName { get; set; }
        public String LotNumber { get; set; }




        //public Int64 OperationID{get ;set;}
        //public Int32 ContainerTypeID{get ;set;}
        //public Int32 PackageTypeID{get ;set;}
        //public Decimal Length{get ;set;}
        //public Decimal Width{get ;set;}
        //public Decimal Height{get ;set;}
        //public Decimal VolumetricWeight{get ;set;}
        //public Decimal ChargeableWeight{get ;set;}
        //public String ShipperSeal{get ;set;}
        //public Boolean IsReefer{get ;set;}
        //public Boolean IsNOR{get ;set;}
        //public Boolean IsIMO{get ;set;}
        //public Boolean IsAsAgreed{get ;set;}
        //public Boolean IsFull{get ;set;}
        //public Boolean IsLoaded{get ;set;}
        //public Boolean IsMinimum{get ;set;}
        //public Boolean IsOwnedByCompany{get ;set;}
        //public Boolean IsSentToWarehouse{get ;set;}
        //public Boolean IsTracked{get ;set;}
        //public DateTime ExitDate{get ;set;}
        //public DateTime GateOutDate{get ;set;}
        //public DateTime LoadingDate{get ;set;}
        //public DateTime ReturnDate{get ;set;}
        //public DateTime StuffingDate{get ;set;}
        //public DateTime YardInDate{get ;set;}
        //public DateTime YardOutDate{get ;set;}
        //public Decimal DayValue{get ;set;}
        //public Decimal Rate{get ;set;}
        //public Int32 BookingPartyID{get ;set;}
        //public Int32 ContainerSizeID { get; set; }
        //public Int32 DirectionType{get ;set;}
        //public Int32 DriverAssistantID{get ;set;}
        //public Int32 DriverID{get ;set;}
        //public Int32 FreeDays{get ;set;}
        //public Int32 GateInPortID{get ;set;}
        //public Int32 GateOutAndLoadingDatesDifference{get ;set;}
        //public Int32 GateOutPortID{get ;set;}
        //public Int32 OperatorID{get ;set;}
        //public Int32 PackageTypeIDOnContainer{get ;set;}
        //public Int32 POLID{get ;set;}
        //public Int32 ShipmentType{get ;set;}
        //public Int32 ShipperID{get ;set;}
        //public Int32 ShippingLineID{get ;set;}
        //public Int32 TrailerID{get ;set;}
        //public Int32 TransportType{get ;set;}
        //public Int32 YardEIRNumber{get ;set;}
        //public Int32 YardEIRNumberOut{get ;set;}
        //public Int32 YardInTime{get ;set;}
        //public Int32 YardIsIn{get ;set;}
        //public Int32 YardLocationID{get ;set;}
        //public Int32 YardOutTime{get ;set;}
        //public Int64 HouseOperationID{get ;set;}
        //public Int64 MasterOperationID{get ;set;}
        //public Int64 PlacedOnOCPID{get ;set;}
        //public String BookingNumber{get ;set;}
        //public String BookingPartyName{get ;set;}
        //public String ConsolContainerNumber{get ;set;}
        //public String ContainerSizeCode{get ;set;}
        //public String ContainerTypeCode{get ;set;}
        //public String ContainerTypeName{get ;set;}
        //public String DriverAssistantName{get ;set;}
        //public String DriverName{get ;set;}
        //public String ExportBLNumber{get ;set;}
        //public String ExtraPackages{get ;set;}
        //public String ExtraPackagesTotalRepeatedInEachRowForOperation{get ;set;}
        //public String Factory{get ;set;}
        //public String GateInPortName{get ;set;}
        //public String GateOutPortName{get ;set;}
        //public String HouseOperationCode{get ;set;}
        //public String ImportBLNumber{get ;set;}
        //public String LocationCode{get ;set;}
        //public String MasterOperationCode{get ;set;}
        //public String OperationCode{get ;set;}
        //public String PackageTypeCode{get ;set;}
        //public String PackageTypeNameOnContainer{get ;set;}
        //public String RateClass{get ;set;}
        //public String ShipperLocalName{get ;set;}
        //public String ShipperName{get ;set;}
        //public String ShippingLineName{get ;set;}
        //public String TankOrFlexiNumber{get ;set;}
        //public String TrailerName{get ;set;}
        //public String WeightUnit{get ;set;}

    }
}

using Forwarding.MvcApp.Models.Administration.Security.Generated;
using Forwarding.MvcApp.Models.Administration.Settings.Generated;
using Forwarding.MvcApp.Models.FA.Generated;
using Forwarding.MvcApp.Models.MasterData.Invoicing.Generated;
using Forwarding.MvcApp.Models.MasterData.Locations.Generated;
using Forwarding.MvcApp.Models.MasterData.Others.Generated;
using Forwarding.MvcApp.Models.MasterData.Partners.Generated;
using Forwarding.MvcApp.Models.MasterData.Trucking.Generated;
using Forwarding.MvcApp.Models.Operations.Operations.Generated;
using Forwarding.MvcApp.Models.Quotations.Quotations.Generated;
using System;
using System.Globalization;
using System.Linq; 
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;
using Forwarding.MvcApp.Entities.Operations;
using Forwarding.MvcApp.AutoMapperConfig;
using System.Collections.Generic;
using Forwarding.MvcApp.Entities.Logs;
using Forwarding.MvcApp.Common;
using System.IO;
using System.Net.Http.Headers;
using System.Net.Http;
using System.Net;
using System.Runtime.InteropServices;
using System.Threading.Tasks;
using Forwarding.BLL.Utilities;
using OpenHtmlToPdf;
using Shipping.MvcApp.ReportMainClass;
using System.Web;
using System.Net.Mail;
using Forwarding.MvcApp.Models.MasterData.Generated.CustomsClearance;
using Forwarding.MvcApp.Models.Station.ST_Transactions.Generated;
using Forwarding.MvcApp.Models.Warehousing.MasterData.Generated;
using System.Security.RightsManagement;
using Forwarding.MvcApp.Models.NoAccess.Generated;
using Forwarding.MvcApp.Models.LocalEmails.Generated;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;
using System.Web.Services.Description;
using Forwarding.MvcApp.Models.Customized;

namespace Forwarding.MvcApp.Controllers.Operations.API_Operations
{
    public class RoutingsController : ApiController
    {
        [HttpGet, HttpPost]
        public Object[] LoadAll(string pWhereClause, string pOrderBy)
        {
            CvwRoutings objCvwRoutings = new CvwRoutings();
            int _RowCount = 0;
            objCvwRoutings.GetListPaging(999999, 1, pWhereClause, pOrderBy, out _RowCount);
            #region Get Minimal
            var pRoutingList = objCvwRoutings.lstCVarvwRoutings
                .Select(s => new
                {
                    ID = s.ID
                    ,
                    OperationID = s.OperationID
                    ,
                    OperationCode = s.OperationCode
                    ,
                    TruckingOrderCode = s.TruckingOrderCode
                    ,
                    ClientName = s.ClientName
                    ,
                    CertificateNumber = s.CertificateNumber
                })
                //.Distinct().OrderBy(o => o.Name)
                .ToList();
            #endregion Get Minimal
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[] { serializer.Serialize(pRoutingList) };
        }

        [HttpGet, HttpPost]
        public Object[] LoadCargoWithWhereClause(string pWhereClause, Int64 pOperationID)
        {
            Exception checkException = null;
            CvwTruckingOrderCargo objCvwTruckingOrderCargo = new CvwTruckingOrderCargo();
            CvwOperations objCvwOperations = new CvwOperations();
            //objCRoutings.GetList(pWhereClause);
            int _RowCount = 0;
            objCvwTruckingOrderCargo.GetListPaging(9999, 1, pWhereClause, "ID", out _RowCount);

            checkException = objCvwOperations.GetListPaging(1, 1, "WHERE ID=" + pOperationID, "ID", out _RowCount);
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[] {
                serializer.Serialize(objCvwTruckingOrderCargo.lstCVarvwTruckingOrderCargo)
                , objCvwOperations.lstCVarvwOperations.Count > 0 ? serializer.Serialize(objCvwOperations.lstCVarvwOperations[0]) : null //pData[1]
            };
        }

        
        [HttpGet, HttpPost]
        public Object[] PackingList_Print(string pOperationID)
        {
            var _RowCount = 0;

            CvwOperations objCvwOperations = new CvwOperations();
                objCvwOperations.GetListPaging(999999, 1, " WHERE ID = " + pOperationID.ToString(), "ID", out _RowCount);

            CvwOperationPartners objCvwOperationPartners = new CvwOperationPartners();
            objCvwOperationPartners.GetList(" WHERE OperationID = " + pOperationID.ToString() + " ORDER BY ViewOrder,ID DESC");

            CST_PreGateIn objCST_PreGateIn = new CST_PreGateIn();
            objCST_PreGateIn.GetList(" WHERE OperationID = " + pOperationID.ToString() + " ORDER BY ID DESC");


            //CST_PackingDetails objCST_PackingDetails = new CST_PackingDetails();
            //objCST_PackingDetails.GetList("where ST_PackingDetails.ST_PackingID in (select id from ST_Packing where OperationID = " + pOperationID.ToString() + ")");

            CST_Packing objCST_Packing = new CST_Packing();
            objCST_Packing.GetList(" WHERE OperationID  = " + pOperationID.ToString()  );

            CST_PackingDetails objCST_PackingDetails = new CST_PackingDetails();
            objCST_PackingDetails.GetList("where isnull(ST_PackingDetails.QuantityBoxes,0) > 0 and ST_PackingDetails.ST_PackingID in (select id from ST_Packing where OperationID = " + pOperationID.ToString() + ")"); 

            CST_PackingDetails objTotalGetListST_PackingDetails = new CST_PackingDetails();
            objTotalGetListST_PackingDetails.TotalGetListST_PackingDetails("where isnull(ST_PackingDetails.QuantityBoxes,0) > 0 and ST_PackingDetails.ST_PackingID in (select id from ST_Packing where OperationID = " + pOperationID.ToString() + ")"); 

            CvwST_PackingDetails objTotalGetListvwST_PackingDetails = new CvwST_PackingDetails();
            objTotalGetListvwST_PackingDetails.TotalGetListvwST_PackingDetails("where isnull(vwST_PackingDetails.QuantityBoxes,0) > 0 and vwST_PackingDetails.ST_PackingID in (select id from ST_Packing where OperationID = " + pOperationID.ToString() + ")");


            CvwOperationContainersAndPackages GetContainerVal = new CvwOperationContainersAndPackages();
            GetContainerVal.GetContainerVal(" WHERE OperationID = " + pOperationID.ToString());

          


            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[] {
                serializer.Serialize(objCvwOperations.lstCVarvwOperations)
               , serializer.Serialize(objCvwOperationPartners.lstCVarvwOperationPartners)
               , serializer.Serialize(objCST_PreGateIn.lstCVarST_PreGateIn)
               , serializer.Serialize(objCST_PackingDetails.lstCVarST_PackingDetails)
               , serializer.Serialize(GetContainerVal.lstCVarvwOperationContainersAndPackages)
               , serializer.Serialize(objTotalGetListST_PackingDetails.lstCVarST_PackingDetails)
               , serializer.Serialize(objCST_Packing.lstCVarST_Packing)
               , serializer.Serialize(objTotalGetListvwST_PackingDetails.lstCVarvwST_PackingDetails)






              
            };
        }





        [HttpGet, HttpPost]
        public Object[] LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned(bool pIsLoadArrayOfObjects, string pLanguage, Int32 pPageNumber, Int32 pPageSize, string pWhereClause, string pOrderBy)
        {
            Exception checkException = null;
            Int32 _RowCount = 0;
            CDefaults objCDefaults = new CDefaults();
            CvwRoutings objCvwRoutings = new CvwRoutings();
            CCommodities objCCommodities = new CCommodities();
            CTruckers objCTruckers = new CTruckers();
            CvwTRCK_Equipments objCEquipment = new CvwTRCK_Equipments();
            CTRCK_Trailers objCTrailer = new CTRCK_Trailers();
            COperations objCOperations = new COperations();
            CTRCK_Drivers objCTRCK_Driver = new CTRCK_Drivers();
            CPorts objCPorts = new CPorts();
            CDevisons objCDivision = new CDevisons();
            CUsers objCUsers = new CUsers();
            //CvwCustomersWithMinimalColumns objCvwCustomersWithMinimalColumns = new CvwCustomersWithMinimalColumns();
            if (pIsLoadArrayOfObjects)
            {
                checkException = objCDefaults.GetListPaging(999999, 1, "WHERE 1=1", "ID", out _RowCount);
                checkException = objCCommodities.GetListPaging(999999, 1, "WHERE 1=1", "Name", out _RowCount);
                checkException = objCTruckers.GetListPaging(999999, 1, "WHERE 1=1", "Name", out _RowCount);
                checkException = objCEquipment.GetListPaging(999999, 1, "WHERE 1=1", "Name", out _RowCount);
                checkException = objCTrailer.GetListPaging(999999, 1, "WHERE 1=1", "Name", out _RowCount);
                checkException = objCOperations.GetListPaging(999999, 1, "WHERE IsFleet=1", "ID", out _RowCount);
                checkException = objCTRCK_Driver.GetListPaging(999999, 1, "WHERE IsDriver=1", "ID", out _RowCount);
                checkException = objCPorts.GetListPaging(999999, 1, "WHERE CountryID=" + objCDefaults.lstCVarDefaults[0].DefaultCountryID, "Name", out _RowCount);
                checkException = objCDivision.GetListPaging(999999, 1, "WHERE 1=1", "Name", out _RowCount);
                checkException = objCUsers.GetListPaging(999999, 1, "WHERE 1=1", "Name", out _RowCount);
            }
            #region Get Minimal
            var pCommodityList = objCCommodities.lstCVarCommodities
                .Select(s => new
                {
                    ID = s.ID
                    ,
                    Name = s.Name
                })
                //.Distinct().OrderBy(o => o.Name)
                .ToList();
            var pTruckerList = objCTruckers.lstCVarTruckers
                .Select(s => new
                {
                    ID = s.ID
                    ,
                    Name = s.Name
                })
                .ToList();
            var pEquipmentList = objCEquipment.lstCVarvwTRCK_Equipments
                .Select(s => new
                {
                    ID = s.ID
                    ,
                    Name = s.Name
                    ,
                    EquipmentTypeName = s.EquipmentTypeName
                    ,
                    EquipmentModelID = s.EquipmentModelID
                    ,
                    LicenseStatus = (DateTime.Now.Date - s.LicenseNumberExpireDate).Days >= 0 ? "(License Expired)" : ""
                })
                .ToList();
            var pTrailer = objCTrailer.lstCVarTRCK_Trailers
                .Select(s => new
                {
                    ID = s.ID
                    ,
                    Name = s.Name
                    ,
                    LicenseStatus = (DateTime.Now.Date - s.LicenseNumberExpireDate).Days >= 0 ? "(License Expired)" : ""
                })
                .ToList();
            var pDriverList = objCTRCK_Driver.lstCVarTRCK_Drivers
                .Select(s => new
                {
                    ID = s.ID
                    ,
                    Name = s.Name
                    ,
                    LicenseStatus = (DateTime.Now.Date - s.LicenseNumberExpireDate).Days >= 0 ? "(License Expired)" : ""
                })
                .ToList();
            var pPortList = objCPorts.lstCVarPorts
                .Select(s => new
                {
                    ID = s.ID
                    ,
                    Name = s.Name
                })
                .ToList();
            var pUserList = objCUsers.lstCVarUsers
                .Select(s => new
                {
                    ID = s.ID
                    ,
                    Name = s.Name
                })
                .ToList();
            #endregion Get Minimal
            checkException = objCvwRoutings.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[] {
                serializer.Serialize(objCvwRoutings.lstCVarvwRoutings)
                , _RowCount
                , serializer.Serialize(pTruckerList) //pData[2]
                , serializer.Serialize(pCommodityList) //pData[3]
                , serializer.Serialize(pEquipmentList) //pData[4]
                , serializer.Serialize(pTrailer) //pData[5]
                , pIsLoadArrayOfObjects ? objCOperations.lstCVarOperations[0].ID : 0 //pData[6]
                , serializer.Serialize(pDriverList) //pData[7]
                , serializer.Serialize(pPortList) //pData[8]
                , serializer.Serialize(objCDivision.lstCVarDevisons) //pData[9]
                , serializer.Serialize(pUserList) //pData[10]
            };
        }

        [HttpGet, HttpPost]
        public object[] Vehicle_Save([FromBody] SaveVehicleParameters saveVehicleParameters)
        {
            string _MessageReturned = "";
            Exception checkException = null;
            int _RowCount = 0;

            CTruckingOrderCargo objCTruckingOrderCargo = new CTruckingOrderCargo();

            checkException = objCTruckingOrderCargo.GetListPaging(999999, 1, "WHERE RoutingID=" + saveVehicleParameters.pRoutingID + " and OperationVehicleID is not null ", "ID", out _RowCount);

            var _ArrVehicleIDs = saveVehicleParameters.pOperationVehicleIDsList.Trim().Split(',');
            var _ArrContainersAndPackagesIDs = saveVehicleParameters.pOperationsContainersAndPackagesIDsList.Trim().Split(',');

            int _NumberOfVehicles = _ArrVehicleIDs.Length;
            int _NumberOfContainersAndPackages = _ArrContainersAndPackagesIDs.Length;

            #region Check vehicles are not more than 8 
            if (objCTruckingOrderCargo.lstCVarTruckingOrderCargo.Count + _NumberOfVehicles > 8 && (saveVehicleParameters.pIsOwnedByCompany))
                _MessageReturned = "Can't choose more than 8 vehicles ";
            if (saveVehicleParameters.pRoutingID == 0)
                _MessageReturned = "Save Trucking Order First";

            #endregion Check vehicles are not added to pickup in case of Pickup

            int _Count = _NumberOfVehicles;

            if (_NumberOfContainersAndPackages > 1)
                _Count = _NumberOfContainersAndPackages;

            if (saveVehicleParameters.pCargoGrossWeight > 0)
                _Count = 0;

            int Size20Count = 0;
            int Size40Count = 0;

            if (saveVehicleParameters.pIsOwnedByCompany)
            {
                if (_ArrContainersAndPackagesIDs.Length > 0 && _ArrContainersAndPackagesIDs[0].ToString() != "")
                {
                    for (int k = 0; k < _Count; k++)
                    {
                        CvwOperationContainersAndPackages objCvwOperationContainersAndPackages = new CvwOperationContainersAndPackages();
                        objCvwOperationContainersAndPackages.GetList("where ID=" + _ArrContainersAndPackagesIDs[k].ToString());
                        if (objCvwOperationContainersAndPackages.lstCVarvwOperationContainersAndPackages.Count > 0)
                            if (objCvwOperationContainersAndPackages.lstCVarvwOperationContainersAndPackages[0].ContainerSizeCode == "20")
                                Size20Count++;
                            else if (objCvwOperationContainersAndPackages.lstCVarvwOperationContainersAndPackages[0].ContainerSizeCode != "0")
                                Size40Count++;
                    }

                }
                CTruckingOrderCargo objCTruckingOrderCargoAddedBefore = new CTruckingOrderCargo();
                objCTruckingOrderCargoAddedBefore.GetList("Where RoutingID=" + saveVehicleParameters.pRoutingID.ToString());
                for (int l = 0; l < objCTruckingOrderCargoAddedBefore.lstCVarTruckingOrderCargo.Count; l++)
                {
                    CvwOperationContainersAndPackages objCvwOperationContainersAndPackages = new CvwOperationContainersAndPackages();
                    objCvwOperationContainersAndPackages.GetList("where ID=" + objCTruckingOrderCargoAddedBefore.lstCVarTruckingOrderCargo[l].OperationsContainersAndPackagesID.ToString());
                    if (objCvwOperationContainersAndPackages.lstCVarvwOperationContainersAndPackages.Count > 0)
                        if (objCvwOperationContainersAndPackages.lstCVarvwOperationContainersAndPackages[0].ContainerSizeCode == "20")
                            Size20Count++;
                        else if (objCvwOperationContainersAndPackages.lstCVarvwOperationContainersAndPackages[0].ContainerSizeCode != "0")
                            Size40Count++;
                }

            }


            if ((Size20Count > 2 || Size40Count > 1) || (Size40Count == 1 && Size20Count > 0))
                _MessageReturned = "Choose two containers of size 20 or  one container of size 40";


            if (_MessageReturned == "")
            {
                for (int i = 0; i < _Count; i++)
                {
                    CVarTruckingOrderCargo objCVarTruckingOrderCargo = new CVarTruckingOrderCargo();
                    if (_ArrVehicleIDs.Length > 0 && _ArrVehicleIDs[0].ToString() != "")
                        objCVarTruckingOrderCargo.OperationVehicleID = Int64.Parse(_ArrVehicleIDs[i]);
                    if (_ArrContainersAndPackagesIDs.Length > 0 && _ArrContainersAndPackagesIDs[0].ToString() != "")
                        objCVarTruckingOrderCargo.OperationsContainersAndPackagesID = Int64.Parse(_ArrContainersAndPackagesIDs[i]);

                    objCVarTruckingOrderCargo.RoutingID = saveVehicleParameters.pRoutingID;
                    objCVarTruckingOrderCargo.OperationID = saveVehicleParameters.pOperationID;

                    objCVarTruckingOrderCargo.CreatorUserID = objCVarTruckingOrderCargo.ModificatorUserID = WebSecurity.CurrentUserId;
                    objCVarTruckingOrderCargo.CreationDate = objCVarTruckingOrderCargo.ModificationDate = DateTime.Now;

                    objCTruckingOrderCargo.lstCVarTruckingOrderCargo.Add(objCVarTruckingOrderCargo);
                }

                if (saveVehicleParameters.pCargoGrossWeight > 0)
                {
                    CVarTruckingOrderCargo objCVarTruckingOrderCargo = new CVarTruckingOrderCargo();
                    objCVarTruckingOrderCargo.CargoGrossWeight = saveVehicleParameters.pCargoGrossWeight;
                    objCVarTruckingOrderCargo.RoutingID = saveVehicleParameters.pRoutingID;
                    objCVarTruckingOrderCargo.OperationID = saveVehicleParameters.pOperationID;

                    objCVarTruckingOrderCargo.CreatorUserID = objCVarTruckingOrderCargo.ModificatorUserID = WebSecurity.CurrentUserId;
                    objCVarTruckingOrderCargo.CreationDate = objCVarTruckingOrderCargo.ModificationDate = DateTime.Now;

                    objCTruckingOrderCargo.lstCVarTruckingOrderCargo.Add(objCVarTruckingOrderCargo);
                }
                checkException = objCTruckingOrderCargo.SaveMethod(objCTruckingOrderCargo.lstCVarTruckingOrderCargo);

                CvwOperationContainersAndPackages objCvwOperationContainersAndPackages = new CvwOperationContainersAndPackages();
                objCvwOperationContainersAndPackages.GetList("where ID in(" + saveVehicleParameters.pOperationsContainersAndPackagesIDsList.Trim() + ")");
                CTruckingOrderContainers objCTruckingOrderContainers = new CTruckingOrderContainers();
                for (int i = 0; i < objCvwOperationContainersAndPackages.lstCVarvwOperationContainersAndPackages.Count; i++)
                {
                    if (objCvwOperationContainersAndPackages.lstCVarvwOperationContainersAndPackages[i].ContainerNumber != "")
                    {
                        CVarTruckingOrderContainers objCVarTruckingOrderContainers = new CVarTruckingOrderContainers();
                        objCVarTruckingOrderContainers.TruckingOrderID = saveVehicleParameters.pRoutingID;
                        objCVarTruckingOrderContainers.IssueDate = DateTime.Parse("01/01/1900");
                        objCVarTruckingOrderContainers.SL = "0";
                        objCVarTruckingOrderContainers.BookingNo = "0";
                        objCVarTruckingOrderContainers.PORT = "0";
                        objCVarTruckingOrderContainers.WH = "0";
                        objCVarTruckingOrderContainers.Size = "0";
                        objCVarTruckingOrderContainers.ContainerNO = objCvwOperationContainersAndPackages.lstCVarvwOperationContainersAndPackages[i].ContainerNumber;
                        objCVarTruckingOrderContainers.DriverName = "0";
                        objCVarTruckingOrderContainers.Phone = "0";
                        objCVarTruckingOrderContainers.TruckNo = "0";
                        objCVarTruckingOrderContainers.Location = "0";
                        objCVarTruckingOrderContainers.SealNo = "0";
                        objCVarTruckingOrderContainers.ReleaseDate = DateTime.Parse("01/01/1900");
                        objCVarTruckingOrderContainers.ArrivalDate = DateTime.Parse("01/01/1900");
                        objCVarTruckingOrderContainers.ReturnDate = objCvwOperationContainersAndPackages.lstCVarvwOperationContainersAndPackages[i].ReturnDate;
                        objCVarTruckingOrderContainers.Port2 = "0";
                        objCVarTruckingOrderContainers.Trucker = "0";
                        objCVarTruckingOrderContainers.StatusName = "0";
                        objCVarTruckingOrderContainers.TypeName = "0";
                        objCVarTruckingOrderContainers.Notes = "0";

                        objCVarTruckingOrderContainers.OperationNO = "0";
                        objCVarTruckingOrderContainers.Factory = "0";
                        objCVarTruckingOrderContainers.CustomLOC = "0";
                        objCVarTruckingOrderContainers.TruckWeight = "0";
                        objCVarTruckingOrderContainers.FactoryGateOut = "0";
                        objCVarTruckingOrderContainers.POD = "0";
                        objCVarTruckingOrderContainers.Invoice = "0";
                        objCVarTruckingOrderContainers.FGODate = DateTime.Parse("01/01/1900");

                        objCVarTruckingOrderContainers.TareWeight = objCvwOperationContainersAndPackages.lstCVarvwOperationContainersAndPackages[i].TareWeight;
                        objCVarTruckingOrderContainers.NetWeight = objCvwOperationContainersAndPackages.lstCVarvwOperationContainersAndPackages[i].NetWeight;
                        objCVarTruckingOrderContainers.GrossWeight = objCvwOperationContainersAndPackages.lstCVarvwOperationContainersAndPackages[i].GrossWeight;

                        objCTruckingOrderContainers.lstCVarTruckingOrderContainers.Add(objCVarTruckingOrderContainers);
                    }

                }
                checkException = objCTruckingOrderContainers.SaveMethod(objCTruckingOrderContainers.lstCVarTruckingOrderContainers);
            }

            if (checkException != null)
                _MessageReturned = checkException.Message;


            return new object[]
            {
                _MessageReturned
            };
        }

        [HttpGet, HttpPost]
        public bool DeleteCargo(String pTruckingOrderCargoIDs, string pTruckingOrderID)
        {

            bool _result = false;
            CTruckingOrderCargo objCTruckingOrderCargo = new CTruckingOrderCargo();
            CTruckingOrderContainers objCTruckingOrderContainers = new CTruckingOrderContainers();
            CvwOperationContainersAndPackages objCvwOperationContainersAndPackages = new CvwOperationContainersAndPackages();
            String Containers = "";
            foreach (var currentID in pTruckingOrderCargoIDs.Split(','))
            {
                objCTruckingOrderCargo.GetList("WHERE ID =" + Int64.Parse(currentID.Trim()));
                if (objCTruckingOrderCargo.lstCVarTruckingOrderCargo.Count > 0)
                {
                    if (objCTruckingOrderCargo.lstCVarTruckingOrderCargo[0].OperationsContainersAndPackagesID != 0)
                    {
                        objCvwOperationContainersAndPackages.GetList("where ID=" + objCTruckingOrderCargo.lstCVarTruckingOrderCargo[0].OperationsContainersAndPackagesID.ToString());
                        if (objCvwOperationContainersAndPackages.lstCVarvwOperationContainersAndPackages.Count > 0)
                            Containers += "'" + objCvwOperationContainersAndPackages.lstCVarvwOperationContainersAndPackages[0].ContainerNumber + "',";

                    }

                }

                objCTruckingOrderCargo.lstDeletedCPKTruckingOrderCargo.Add(new CPKTruckingOrderCargo() { ID = Int64.Parse(currentID.Trim()) });
            }

            Exception checkException = objCTruckingOrderCargo.DeleteItem(objCTruckingOrderCargo.lstDeletedCPKTruckingOrderCargo);



            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("DELETE")) // some or all of the rows were not deleted due to dependencies
                    _result = false;
            }
            else //deleted successfully
            {
                if (Containers != "")
                    checkException = objCTruckingOrderContainers.DeleteList("WHERE (ContainerNo is NULL or ContainerNo in(" + Containers.Remove(Containers.Length - 1, 1) + ")" + ") AND TruckingOrderID=" + pTruckingOrderID);

                _result = true;
            }

            return _result;
        }

        [HttpGet, HttpPost]
        public object[] LoadWithWhereClause(Int32 pPageNumber, Int32 pPageSize, string pWhereClause)
        {


            CvwDefaults objCvwDefaults = new CvwDefaults();
            CvwRoutings objCvwRoutings = new CvwRoutings();
            CTRCK_Equipments objCTRCK_Equipments = new CTRCK_Equipments();
            CTRCK_Trailers objCTRCK_Trailers = new CTRCK_Trailers();
            CTRCK_Drivers objCTRCK_Driver = new CTRCK_Drivers();
            CTRCK_Drivers objCTRCK_DriverAssistant = new CTRCK_Drivers();
            CTRCK_EquipmentModel objCTRCK_EquipmentModel = new CTRCK_EquipmentModel();
            CPorts objCCities = new CPorts();
            CCC_ClearanceTypes cCC_ClearanceTypes = new CCC_ClearanceTypes();
            CCustomItems cCustomItems = new CCustomItems();
            //objCvwRoutings.GetList(string.Empty); //GetList() fn loads without paging
            Int32 _RowCount = objCvwRoutings.lstCVarvwRoutings.Count;
            //pSearchKey here is the where clause
            objCvwRoutings.GetListPaging(pPageSize, pPageNumber, pWhereClause, " ViewOrder ", out _RowCount);
            objCTRCK_Trailers.GetListPaging(999999, 1, "WHERE IsInactive=0", "Name", out _RowCount);
            objCTRCK_Driver.GetList("WHERE IsDriver=1 ORDER BY Name");
            objCTRCK_DriverAssistant.GetList("WHERE IsDriver=0 ORDER BY Name");
            objCvwDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount); //i am sure i ve just one row isa
            objCCities.GetList("WHERE  CountryID=" + objCvwDefaults.lstCVarvwDefaults[0].DefaultCountryID.ToString());
            objCTRCK_Equipments.GetListPaging(999999, 1, "WHERE IsInactive=0", "Name", out _RowCount);
            CWH_MainWarehouses objCWH_MainWarehouses = new CWH_MainWarehouses();
            objCWH_MainWarehouses.GetList(" WHERE 1=1");
            cCC_ClearanceTypes.GetList("WHERE 1 = 1");
            cCustomItems.GetList("WHERE 1 = 1");
            objCTRCK_EquipmentModel.GetList("WHERE 1 =1");

            CCustomers objCCustomers = new CCustomers();
            objCCustomers.GetList($"where 1=1");

            var Customers = objCCustomers.lstCVarCustomers.Select(c =>
            new {
                ID = c.ID,
                Name = c.Name
            }).ToList();

            CContainerTypes objCContainerTypes = new CContainerTypes();
			objCContainerTypes.GetList("Where 1 = 1 order by code");

			var serializer = new JavaScriptSerializer { MaxJsonLength = int.MaxValue };
            return new Object[] { serializer.Serialize(objCvwRoutings.lstCVarvwRoutings)
                , serializer.Serialize(objCTRCK_Trailers.lstCVarTRCK_Trailers) //data[1]
                , serializer.Serialize(objCTRCK_Driver.lstCVarTRCK_Drivers) //pData[2]
                , serializer.Serialize(objCTRCK_DriverAssistant.lstCVarTRCK_Drivers) //pData[3]
                , serializer.Serialize(objCCities.lstCVarPorts) //pData[4]
                , serializer.Serialize(objCTRCK_Equipments.lstCVarTRCK_Equipments) //pData[5]
                , serializer.Serialize(cCC_ClearanceTypes.lstCVarCC_ClearanceTypes) //pData[6]
                , serializer.Serialize(cCustomItems.lstCVarCustomItems) //pData[7]
                , serializer.Serialize(objCWH_MainWarehouses.lstCVarWH_MainWarehouses) //pData[8]
                , serializer.Serialize(objCTRCK_EquipmentModel.lstCVarTRCK_EquipmentModel) //pData[9]
                , serializer.Serialize(Customers) //pData[10]
                , serializer.Serialize(objCContainerTypes.lstCVarContainerTypes) //pData[11]

                , _RowCount };
        }

        [HttpGet, HttpPost]
        public object[] Insert([FromBody] InsertRoutingData insertRoutingData)
        {
            bool _result = false;
            int MainCarraigeID = 30;
            int TruckingOrderRoutingTypeID = 60;
            int _RowCount = 0;
            string pWhereClause = "";
            Int64 _InsertedRoutingID = 0;
            CPayables objCPayables = new CPayables();
            CvwPayables objCvwPayables = new CvwPayables();
            CDefaults objCDefaults = new CDefaults();
            objCDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount);
            CUsers objCUsers = new CUsers();
            objCUsers.GetListPaging(999999, 1, "WHERE ID=" + WebSecurity.CurrentUserId, "ID", out _RowCount);

            CVarRoutings objCVarRoutings = new CVarRoutings();

            objCVarRoutings.RoutingTypeID = insertRoutingData.pRoutingTypeID;
            objCVarRoutings.OperationID = insertRoutingData.pOperationID;
            objCVarRoutings.TransportType = insertRoutingData.pTransportTypeID;
            objCVarRoutings.TransportIconName = insertRoutingData.pTransportIconName;
            objCVarRoutings.TransportIconStyle = insertRoutingData.pTransportIconStyle;
            objCVarRoutings.POLCountryID = insertRoutingData.pPOLCountryID;
            objCVarRoutings.PODCountryID = insertRoutingData.pPODCountryID;
            objCVarRoutings.POL = insertRoutingData.pPOLID;
            objCVarRoutings.POD = insertRoutingData.pPODID;

            objCVarRoutings.ETAPOLDate = insertRoutingData.pETAPOLDate;
            objCVarRoutings.ATAPOLDate = insertRoutingData.pATAPOLDate;
            objCVarRoutings.ExpectedArrival = insertRoutingData.pExpectedArrival;
            objCVarRoutings.ExpectedDeparture = insertRoutingData.pExpectedDeparture;
            objCVarRoutings.ActualArrival = insertRoutingData.pActualArrival;
            objCVarRoutings.ActualDeparture = insertRoutingData.pActualDeparture;

            objCVarRoutings.ShippingLineID = insertRoutingData.pShippingLineID;
            objCVarRoutings.AirlineID = insertRoutingData.pAirlineID;
            objCVarRoutings.TruckerID = insertRoutingData.pTruckerID;
            objCVarRoutings.VesselID = insertRoutingData.pVesselID;
            objCVarRoutings.VoyageOrTruckNumber = (insertRoutingData.pVoyageOrTruckNumber == null || insertRoutingData.pVoyageOrTruckNumber == "" ? "0" : insertRoutingData.pVoyageOrTruckNumber);
            objCVarRoutings.TransientTime = insertRoutingData.pTransientTime;
            objCVarRoutings.Validity = insertRoutingData.pValidity;
            objCVarRoutings.FreeTime = insertRoutingData.pFreeTime;
            objCVarRoutings.Notes = (insertRoutingData.pNotes == null ? "" : insertRoutingData.pNotes);

            objCVarRoutings.GensetSupplierID = insertRoutingData.pGensetSupplierID;
            objCVarRoutings.CCAID = insertRoutingData.pCCAID;
            objCVarRoutings.Quantity = (insertRoutingData.pQuantity == null || insertRoutingData.pQuantity == "" ? "0" : insertRoutingData.pQuantity);
            objCVarRoutings.ContactPerson = (insertRoutingData.pContactPerson == null || insertRoutingData.pContactPerson == "" ? "0" : insertRoutingData.pContactPerson);
            objCVarRoutings.PickupAddress = (insertRoutingData.pPickupAddress == null || insertRoutingData.pPickupAddress == "" ? "0" : insertRoutingData.pPickupAddress);
            objCVarRoutings.DeliveryAddress = (insertRoutingData.pDeliveryAddress == null || insertRoutingData.pDeliveryAddress == "" ? "0" : insertRoutingData.pDeliveryAddress);
            objCVarRoutings.GateInPortID = insertRoutingData.pGateInPortID;
            objCVarRoutings.GateOutPortID = insertRoutingData.pGateOutPortID;
            objCVarRoutings.GateInDate = insertRoutingData.pGateInDate;

            #region TransportOrder
            objCVarRoutings.CustomerID = insertRoutingData.pCustomerID;
            objCVarRoutings.SubContractedCustomerID = insertRoutingData.pSubContractedCustomerID;
            objCVarRoutings.Cost = insertRoutingData.pCost;
            objCVarRoutings.Sale = insertRoutingData.pSale;
            objCVarRoutings.IsFleet = insertRoutingData.pIsFleet;
            objCVarRoutings.CommodityID = insertRoutingData.pCommodityID;
            objCVarRoutings.LoadingDate = insertRoutingData.pLoadingDate;
            objCVarRoutings.LoadingReference = insertRoutingData.pLoadingReference;
            objCVarRoutings.UnloadingDate = insertRoutingData.pUnloadingDate;
            objCVarRoutings.UnloadingTime = insertRoutingData.pUnloadingTime;
            objCVarRoutings.UnloadingReference = insertRoutingData.pUnloadingReference;
            objCVarRoutings.QuotationRouteID = insertRoutingData.pQuotationRouteID;
            #endregion TransportOrder

            objCVarRoutings.GateOutDate = insertRoutingData.pGateOutDate;
            objCVarRoutings.StuffingDate = insertRoutingData.pStuffingDate;
            objCVarRoutings.DeliveryDate = insertRoutingData.pDeliveryDate;
            objCVarRoutings.BookingNumber = (insertRoutingData.pBookingNumber == null || insertRoutingData.pBookingNumber == "" ? "0" : insertRoutingData.pBookingNumber);
            objCVarRoutings.Delays = (insertRoutingData.pDelays == null || insertRoutingData.pDelays == "" ? "0" : insertRoutingData.pDelays);
            objCVarRoutings.DriverName = (insertRoutingData.pDriverName == null || insertRoutingData.pDriverName == "" ? "0" : insertRoutingData.pDriverName);
            objCVarRoutings.DriverPhones = (insertRoutingData.pDriverPhones == null || insertRoutingData.pDriverPhones == "" ? "0" : insertRoutingData.pDriverPhones);
            objCVarRoutings.PowerFromGateInTillActualSailing = (insertRoutingData.pPowerFromGateInTillActualSailing == null || insertRoutingData.pPowerFromGateInTillActualSailing == "" ? "0" : insertRoutingData.pPowerFromGateInTillActualSailing);
            objCVarRoutings.ContactPersonPhones = (insertRoutingData.pContactPersonPhones == null || insertRoutingData.pContactPersonPhones == "" ? "0" : insertRoutingData.pContactPersonPhones);
            objCVarRoutings.LoadingTime = (insertRoutingData.pLoadingTime == null || insertRoutingData.pLoadingTime == "" ? "0" : insertRoutingData.pLoadingTime);
            #region CustomsClearance
            objCVarRoutings.CCAFreight = insertRoutingData.pCCAFreight;
            objCVarRoutings.CCAFOB = insertRoutingData.pCCAFOB;
            objCVarRoutings.CCACFValue = insertRoutingData.pCCACFValue;
            objCVarRoutings.CCAInvoiceNumber = insertRoutingData.pCCAInvoiceNumber;

            objCVarRoutings.CCAInsurance = insertRoutingData.pCCAInsurance;
            objCVarRoutings.CCADischargeValue = insertRoutingData.pCCADischargeValue;
            objCVarRoutings.CCAAcceptedValue = insertRoutingData.pCCAAcceptedValue;
            objCVarRoutings.CCAImportValue = insertRoutingData.pCCAImportValue;
            objCVarRoutings.CCADocumentReceiveDate = DateTime.ParseExact(insertRoutingData.pCCADocumentReceiveDate + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture);
            objCVarRoutings.CCAExchangeRate = insertRoutingData.pCCAExchangeRate;
            objCVarRoutings.CCAVATCertificateNumber = insertRoutingData.pCCAVATCertificateNumber;
            objCVarRoutings.CCAVATCertificateValue = insertRoutingData.pCCAVATCertificateValue;
            objCVarRoutings.CCACommercialProfitCertificateNumber = insertRoutingData.pCCACommercialProfitCertificateNumber;
            objCVarRoutings.CCAWindowFees = insertRoutingData.pCCAWindowFees;
            objCVarRoutings.CCAStorageFees = insertRoutingData.pCCAStorageFees;
            objCVarRoutings.CCACommercialProfitTax = insertRoutingData.pCCACommercialProfitTax;
            objCVarRoutings.CCACustomsValue = insertRoutingData.pCCACustomsValue;
            objCVarRoutings.CCAQuotedValue = insertRoutingData.pCCAQuotedValue;
            objCVarRoutings.CCAContractType = insertRoutingData.pCCAContractType;
            objCVarRoutings.CCAOthers = insertRoutingData.pCCAOthers;
            objCVarRoutings.CCASpendDate = DateTime.ParseExact(insertRoutingData.pCCASpendDate + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture);
            objCVarRoutings.OffloadingDate = DateTime.ParseExact(insertRoutingData.pOffloadingDate + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture);

            objCVarRoutings.CertificateNumber = insertRoutingData.pCertificateNumber;
            objCVarRoutings.CertificateValue = insertRoutingData.pCertificateValue;
            objCVarRoutings.CertificateDate = DateTime.ParseExact(insertRoutingData.pCertificateDate + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture);
            objCVarRoutings.QasimaNumber = insertRoutingData.pQasimaNumber;
            objCVarRoutings.QasimaDate = DateTime.ParseExact(insertRoutingData.pQasimaDate + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture);
            objCVarRoutings.Match = insertRoutingData.pMatch;
            objCVarRoutings.SalesDateReceived = DateTime.ParseExact(insertRoutingData.pSalesDateReceived + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture);
            objCVarRoutings.CommerceDateReceived = DateTime.ParseExact(insertRoutingData.pCommerceDateReceived + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture);
            objCVarRoutings.InspectionDateReceived = DateTime.ParseExact(insertRoutingData.pInspectionDateReceived + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture);
            objCVarRoutings.FinishDateReceived = DateTime.ParseExact(insertRoutingData.pFinishDateReceived + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture);
            objCVarRoutings.SalesDateDelivered = DateTime.ParseExact(insertRoutingData.pSalesDateDelivered + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture);
            objCVarRoutings.CommerceDateDelivered = DateTime.ParseExact(insertRoutingData.pCommerceDateDelivered + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture);
            objCVarRoutings.InspectionDateDelivered = DateTime.ParseExact(insertRoutingData.pInspectionDateDelivered + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture);
            objCVarRoutings.FinishDateDelivered = DateTime.ParseExact(insertRoutingData.pFinishDateDelivered + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture);


            objCVarRoutings.CCAllowTemporaryDelivered = DateTime.ParseExact(insertRoutingData.pCCAllowTemporaryDelivered + " 00.00.00.000", "MM/dd/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture);
            objCVarRoutings.CCAllowTemporaryReceived = DateTime.ParseExact(insertRoutingData.pCCAllowTemporaryReceived + " 00.00.00.000", "MM/dd/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture);
            objCVarRoutings.CCDropBackDelivered = DateTime.ParseExact(insertRoutingData.pCCDropBackDelivered + " 00.00.00.000", "MM/dd/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture);
            objCVarRoutings.CCDropBackReceived = DateTime.ParseExact(insertRoutingData.pCCDropBackReceived + " 00.00.00.000", "MM/dd/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture);
            objCVarRoutings.CC_ClearanceTypeID = (insertRoutingData.pCC_ClearanceTypeID == null || insertRoutingData.pCC_ClearanceTypeID == "" ? 0 : int.Parse(insertRoutingData.pCC_ClearanceTypeID));
            objCVarRoutings.CC_CustomItemsID = (insertRoutingData.pCC_CustomItemsID == null || insertRoutingData.pCC_CustomItemsID == "" ? 0 : int.Parse(insertRoutingData.pCC_CustomItemsID));
            objCVarRoutings.CCReleaseNo = (insertRoutingData.pCCReleaseNo == null || insertRoutingData.pCCReleaseNo == "" ? "0" : insertRoutingData.pCCReleaseNo);
            #endregion CustomsClearance

            objCVarRoutings.RoadNumber = insertRoutingData.pRoadNumber;
            objCVarRoutings.DeliveryOrderNumber = insertRoutingData.pDeliveryOrderNumber;
            objCVarRoutings.WareHouse = insertRoutingData.pWareHouse;
            objCVarRoutings.WareHouseLocation = insertRoutingData.pWareHouseLocation;

            objCVarRoutings.IsOwnedByCompany = insertRoutingData.pIsOwnedByCompany;
            objCVarRoutings.IsLoaded = insertRoutingData.pIsLoaded;
            objCVarRoutings.TrailerID = insertRoutingData.pTrailerID;
            objCVarRoutings.DriverID = insertRoutingData.pDriverID;
            objCVarRoutings.DriverAssistantID = insertRoutingData.pDriverAssistantID;

            objCVarRoutings.EquipmentID = insertRoutingData.pEquipmentID;
            objCVarRoutings.LoadingZoneID = insertRoutingData.pLoadingZoneID;
            objCVarRoutings.FirstCuringAreaID = insertRoutingData.pFirstCuringAreaID;
            objCVarRoutings.SecondCuringAreaID = insertRoutingData.pSecondCuringAreaID;
            objCVarRoutings.ThirdCuringAreaID = insertRoutingData.pThirdCuringAreaID;
            objCVarRoutings.BillNumber = insertRoutingData.pBillNumber;
            objCVarRoutings.TruckingOrderCode = insertRoutingData.pTruckingOrderCode;
            objCVarRoutings.TruckCounter = insertRoutingData.pTruckCounter;
            objCVarRoutings.CargoReturnGrossWeight = insertRoutingData.pCargoReturnGrossWeight;
            objCVarRoutings.LastTruckCounter = insertRoutingData.pLastTruckCounter;
            objCVarRoutings.MaxSupplierContainers = insertRoutingData.pMaxSupplierContainers;
            objCVarRoutings.CCMainWarehouseID = insertRoutingData.pCCMainWarehouseID;
            objCVarRoutings.CCWarehouseATD = insertRoutingData.pCCWarehouseATD;
            objCVarRoutings.CCWarehouseETA = insertRoutingData.pCCWarehouseETA;
            objCVarRoutings.CCIsDone = insertRoutingData.pCCIsDone;
            objCVarRoutings.CustomerWarehouseManagerName = insertRoutingData.pCustomerWarehouseMangerName;
            objCVarRoutings.CustomerWarehouseManagerPhone = insertRoutingData.PCustomerWarehouseMangerPhone;
            objCVarRoutings.TruckingEquipmentID = insertRoutingData.pTruckingEquipmentID;
            objCVarRoutings.ConcedeCompanyName = insertRoutingData.pConcedeCompanyName;
            objCVarRoutings.ConcedeCompanyName = insertRoutingData.pConcedeCompanyName;
            objCVarRoutings.ConcedeTotalQty = insertRoutingData.pConcedeTotalQty;
            objCVarRoutings.ConcedeQty = insertRoutingData.pConcedeQty;
            objCVarRoutings.WarehouseID = insertRoutingData.pWarehouseID;
            objCVarRoutings.CCApproveNo = insertRoutingData.pCCApproveNo;
            objCVarRoutings.CCInvoiceNo = insertRoutingData.pCCInvoiceNo;
            objCVarRoutings.CCTotalQty = insertRoutingData.pCCTotalQty;
            objCVarRoutings.CCSubtractQty = insertRoutingData.pCCSubtractQty;
            objCVarRoutings.CCNetQty = insertRoutingData.pCCNetQty;
            objCVarRoutings.TrContainerTypeID = insertRoutingData.pTrContainerTypeID;
            objCVarRoutings.TrNumberOfContainers = insertRoutingData.pTrNumberOfContainers;
            Common.Common.ReplaceNull(objCVarRoutings);
            objCVarRoutings.CreatorUserID = objCVarRoutings.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarRoutings.CreationDate = objCVarRoutings.ModificationDate = DateTime.Now;
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            var log = serializer.Serialize(objCVarRoutings);
            CRoutings objCRoutings = new CRoutings();
            objCRoutings.lstCVarRoutings.Add(objCVarRoutings);
            Exception checkException = objCRoutings.SaveMethod(objCRoutings.lstCVarRoutings);
            _InsertedRoutingID = objCVarRoutings.ID;
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else //not unique
            {
                _result = true;
                #region Update MainCarraige in Operations table
                string updateClause = "";
                // Decide wether its main carraige or not
                // pRoutingTypeID: 30=MainCarraigr, .....
                if (insertRoutingData.pRoutingTypeID == MainCarraigeID)
                {
                    updateClause = " POLCountryID = " + (insertRoutingData.pPOLCountryID == 0 ? "null" : insertRoutingData.pPOLCountryID.ToString());
                    updateClause += " , PODCountryID = " + (insertRoutingData.pPOLCountryID == 0 ? "null" : insertRoutingData.pPOLCountryID.ToString());
                    updateClause += " , POL = " + (insertRoutingData.pPOLID == 0 ? "null" : insertRoutingData.pPOLID.ToString());
                    updateClause += " , POD = " + (insertRoutingData.pPODID == 0 ? "null" : insertRoutingData.pPODID.ToString());
                    updateClause += " , ShippingLineID = " + (insertRoutingData.pShippingLineID == 0 ? "null" : insertRoutingData.pShippingLineID.ToString());
                    updateClause += " , AirlineID = " + (insertRoutingData.pAirlineID == 0 ? "null" : insertRoutingData.pAirlineID.ToString());
                    updateClause += " , TruckerID = " + (insertRoutingData.pTruckerID == 0 ? "null" : insertRoutingData.pTruckerID.ToString());
                    //the next 3 lines dont have difference now but if in the future i allowed changing transport type then these line will be important and in addition i have to update FCL, LCL, FTL, LTL
                    //and also i i have to reset the containers and packages
                    updateClause += " , TransportType = " + insertRoutingData.pTransportTypeID.ToString();
                    updateClause += " , TransportIconName = '" + insertRoutingData.pTransportIconName + "'";
                    updateClause += " , TransportIconStyle = '" + insertRoutingData.pTransportIconStyle + "'";
                    updateClause += " WHERE ID = " + insertRoutingData.pOperationID.ToString();
                    COperations objCOperations = new COperations();
                    objCOperations.UpdateList(updateClause);
                }
				else if(insertRoutingData.pRoutingTypeID == TruckingOrderRoutingTypeID && objCDefaults.lstCVarDefaults[0].UnEditableCompanyName == "ELI")
				{
					updateClause = " Notes = '" + insertRoutingData.pOperationNotes + "'";
					updateClause += " WHERE ID = " + insertRoutingData.pOperationID.ToString();
					COperations objCOperations = new COperations();
					objCOperations.UpdateList(updateClause);
				}
                #endregion
                #region Add Payables for IsFleet and OwnedByCompany

                if (objCDefaults.lstCVarDefaults[0].IsAddChargeAuto && insertRoutingData.pIsFleet && insertRoutingData.pIsOwnedByCompany)
                {
                    //CCustomers objCCustomers = new CCustomers();
                    //checkException = objCCustomers.GetListPaging(999999, 1, "Where ID=" + insertRoutingData.pCustomerID, "ID", out _RowCount);
                    //if (!objCUsers.lstCVarUsers[0].IsAccessAllCharges)
                    //{
                    pWhereClause = "Where ID IN (SELECT ChargeTypeID FROM DepartmentCharge WHERE DepartmentID=" + objCUsers.lstCVarUsers[0].DepartmentID + ") \n";
                    #region GBL Filter Criteria
                    //if (objCDefaults.lstCVarDefaults[0].UnEditableCompanyName == "GBL")
                    //{
                    //    if (objCCustomers.lstCVarCustomers[0].IsInternalCustomer)
                    //        pWhereClause += "AND Code LIKE N'%INT%' AND Code NOT LIKE N'EX %'" + " \n";
                    //    else //External Customer
                    //        pWhereClause += "AND Code LIKE N'%EX%' AND Code NOT LIKE N'INT %'" + " \n";
                    //    if (insertRoutingData.pCommodityID != 0)
                    //    {
                    //        CCommodities objCCommodities = new CCommodities();
                    //        checkException = objCCommodities.GetListPaging(999999, 1, "Where ID=" + insertRoutingData.pCommodityID, "ID", out _RowCount);
                    //        if (objCCommodities.lstCVarCommodities[0].Notes != "0")
                    //            pWhereClause += "AND Code LIKE N'%" + objCCommodities.lstCVarCommodities[0].Notes + "%'" + " \n";
                    //    }
                    //}
                    #endregion GBL Filter Criteria
                    //}
                    CChargeTypes objCChargeTypes = new CChargeTypes();
                    checkException = objCChargeTypes.GetListPaging(999999, 1, pWhereClause, "Name", out _RowCount);

                    for (int l = 0; l < objCRoutings.lstCVarRoutings.Count; l++)
                    {
                        for (int k = 0; k < objCChargeTypes.lstCVarChargeTypes.Count; k++)
                        {
                            //string pWhereClauseCurrencyDetails = "";
                            CvwCurrencyDetails objCvwCurrencyDetails = new CvwCurrencyDetails();

                            //to copy in it the records to be inserted
                            //those 2 lines are to get the charge types from QuotationCharges table from DB
                            //CvwQuotationCharges objCvwQuotationCharges = new CvwQuotationCharges();
                            //objCvwQuotationCharges.GetList(" WHERE QuotationRouteID = " + objCvwQuotationRoute.lstCVarvwQuotationRoute[0].ID);
                            //int _tempRowCount = 0;
                            //checkException = objCvwQuotationCharges.GetListPaging(5000, 1, " WHERE QuotationRouteID = " + objCvwQuotationRoute.lstCVarvwQuotationRoute[0].ID, " ID ", out _tempRowCount);

                            CVarPayables objCVarPayables = new CVarPayables();
                            //foreach (var rowQuotationCharge in objCvwQuotationCharges.lstCVarvwQuotationCharges)
                            //{
                            //pWhereClauseCurrencyDetails = "WHERE ID=" + rowQuotationCharge.CostCurrencyID
                            //    + " AND GETDATE() >= DateAdd(hh, 0, DateDiff(dd, 0, FromDate)) "
                            //    + " AND GETDATE() <= DateAdd(minute,59,DateAdd(hh, 23, DateDiff(dd, 0, ToDate))) "
                            //    + " ORDER BY CODE";

                            //objCvwCurrencyDetails.GetList(pWhereClauseCurrencyDetails);
                            //if (objCvwCurrencyDetails.lstCVarvwCurrencyDetails.Count > 0)
                            //{
                            objCVarPayables.ID = 0;

                            objCVarPayables.OperationID = objCRoutings.lstCVarRoutings[l].OperationID;
                            objCVarPayables.ChargeTypeID = objCChargeTypes.lstCVarChargeTypes[k].ID;
                            objCVarPayables.POrC = 0;
                            objCVarPayables.SupplierOperationPartnerID = 0;

                            objCVarPayables.SupplierSiteID = 0;
                            objCVarPayables.ContainerTypeID = 0;
                            objCVarPayables.MeasurementID = 0;
                            objCVarPayables.Quantity = 1;
                            objCVarPayables.CostPrice = 0;
                            objCVarPayables.CostAmount = 0;
                            objCVarPayables.QuotationCost = 0;
                            objCVarPayables.AmountWithoutVAT = 0; //still no VAT entered so they are the same
                            objCVarPayables.SupplierInvoiceNo = "0";
                            objCVarPayables.SupplierReceiptNo = "0";
                            objCVarPayables.EntryDate = DateTime.Now;
                            objCVarPayables.BillID = 0;
                            objCVarPayables.TruckingOrderID = objCRoutings.lstCVarRoutings[l].ID;
                            objCVarPayables.IssueDate = DateTime.Now;
                            objCVarPayables.OperationContainersAndPackagesID = 0;

                            objCVarPayables.ExchangeRate = 1; //rowQuotationCharge.CostExchangeRate;
                            objCVarPayables.CurrencyID = objCDefaults.lstCVarDefaults[0].CurrencyID;
                            objCVarPayables.GeneratingQRID = 0;
                            objCVarPayables.Notes = "";
                            objCVarPayables.IsOfficial = false;
                            objCVarPayables.IsQuotationApproval = false;
                            objCVarPayables.ApprovePendingValue = 0;
                            objCVarPayables.crmCode = "";
                            objCVarPayables.IsPurchased = false;


                            objCVarPayables.CreatorUserID = objCVarPayables.ModificatorUserID = WebSecurity.CurrentUserId;
                            objCVarPayables.CreationDate = objCVarPayables.ModificationDate = DateTime.Now;
                            objCPayables.lstCVarPayables.Add(objCVarPayables);

                            //}
                            //}
                        }
                    }
                    checkException = objCPayables.SaveMethod(objCPayables.lstCVarPayables);
                    objCvwPayables.GetListPaging(999999, 1, "WHERE TruckingOrderID=" + _InsertedRoutingID, "ChargeTypeName", out _RowCount);
                }
				#endregion Add Payables for IsFleet and OwnedByCompany
				
			}
			if (!insertRoutingData.pIsFleet)
                Forwarding.MvcApp.Controllers.Operations.API_Operations.OperationsController.Operations_EmailNotification(insertRoutingData.pOperationID);

            #region GET Returned Data
            CvwRoutings objCvwRoutings_SavedRoute = new CvwRoutings();
            CvwRoutings objCvwRoutings = new CvwRoutings();
            int _tempRowCount = 0;
            checkException = objCvwRoutings_SavedRoute.GetListPaging(999999, 1, "WHERE ID=" + objCVarRoutings.ID, "ViewOrder", out _tempRowCount);
            if (!insertRoutingData.pIsFleet) //in fleet all orders are in the same operation
                checkException = objCvwRoutings.GetListPaging(999999, 1, "WHERE OperationID=" + insertRoutingData.pOperationID, "ViewOrder", out _tempRowCount);
            #endregion GET Returned Data
            return new object[]
            {
                new JavaScriptSerializer().Serialize(objCvwRoutings_SavedRoute.lstCVarvwRoutings[0]) //pSavedRoute=pData[0]
                , serializer.Serialize(objCvwRoutings.lstCVarvwRoutings) //pRoutes=pData[1]
                , serializer.Serialize(objCvwPayables.lstCVarvwPayables) //pPayable=pData[2]
            };
        }

        // [Route("/api/OperationPartners/Insert/{pCode}/{pName}/{pLocalName}}")]
        //pMasterBL is saved just in case of (Master or Direct) And Main Route.... And its saved in Operations not Routings
        [HttpGet, HttpPost]
        public object[] Update([FromBody] UpdateRoutingData updateRoutingData)
        { // pNumberOfHousesConnected: used in the controller to be compared to NumberOfHousesConnected retrieved from DB at time of save to handle other sessions changes
            bool _result = false;
            string strMessageReturned = "";
            int MainCarraigeID = 30;
            int TruckingOrderRoutingTypeID = 60;
            Exception checkException = null;
            int _RowCount = 0;
            var CancelledTransportOrderID = 80;
            CvwDefaults objCvwDefaults = new CvwDefaults();
            objCvwDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount); //i am sure i ve just one row isa
            string[] MescoCompanies = new string[5] { "MES", "SAC", "EUR", "ALT", "GLO" };       
            COperations objCOperations_CheckUniqueness = new COperations();
            if (updateRoutingData.pRoutingTypeID == MainCarraigeID
                && !objCvwDefaults.lstCVarvwDefaults[0].IsRepeatMBL
                && !updateRoutingData.pIsFleet)
            {
                COperations objCOperations_temp = new COperations();
                objCOperations_temp.GetListPaging(999999, 1, "WHERE ID=" + updateRoutingData.pOperationID, "ID", out _RowCount);
                //objCOperations_CheckUniqueness.GetListPaging(999999, 1, "WHERE OperationStageID<>" + CancelledTransportOrderID + " AND TransportType=" + objCOperations_temp.lstCVarOperations[0].TransportType + " AND DirectionType=" + objCOperations_temp.lstCVarOperations[0].DirectionType + "  AND ID<>" + updateRoutingData.pOperationID + " AND MasterBL IS NOT NULL AND MasterBL<>N'N/A' AND MasterBL=N'" + updateRoutingData.pMasterBL + "'", "ID", out _RowCount);
                objCOperations_CheckUniqueness.GetListPaging(999999, 1, "WHERE OperationStageID<>" + CancelledTransportOrderID + " AND TransportType=" + objCOperations_temp.lstCVarOperations[0].TransportType + " AND ID<>" + updateRoutingData.pOperationID + " AND MasterBL IS NOT NULL AND MasterBL<>N'N/A' AND MasterBL=N'" + updateRoutingData.pMasterBL + "' AND BLType=" + updateRoutingData.pBLType, "ID", out _RowCount);
            }
            CRoutings objCRouting_temp = new CRoutings();
            objCRouting_temp.GetListPaging(999999, 1, "WHERE operationid=" + updateRoutingData.pOperationID, "ID", out _RowCount);
            var OldETA = objCRouting_temp.lstCVarRoutings[0].ExpectedArrival.ToString("dd/MM/yyyy");
            var OldATA = objCRouting_temp.lstCVarRoutings[0].ActualArrival.ToString("dd/MM/yyyy");

            CRoutings cRoutingsBeforeUpdate = new CRoutings();
            cRoutingsBeforeUpdate.GetItem(updateRoutingData.pID);
            if (MescoCompanies.Contains(objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName) && updateRoutingData.pRoutingTypeID == MainCarraigeID && !updateRoutingData.pIsFleet)
            {
                COperations objCOperations_temps = new COperations();
                objCOperations_temps.GetListPaging(999999, 1, "WHERE ID=" + updateRoutingData.pOperationID, "ID", out _RowCount);

                if (objCOperations_temps.lstCVarOperations[0].TransportType == 1 && updateRoutingData.pMasterBL != "" && updateRoutingData.pMasterBL != "0" && objCOperations_temps.lstCVarOperations[0].BLType == 3 && (objCOperations_temps.lstCVarOperations[0].ShipmentType == 5 || objCOperations_temps.lstCVarOperations[0].ShipmentType == 2))
                {
                    objCOperations_CheckUniqueness.GetListPaging(999999, 1, "WHERE OperationStageID<>" + CancelledTransportOrderID + " AND TransportType=" + objCOperations_temps.lstCVarOperations[0].TransportType + " AND ID<>" + updateRoutingData.pOperationID + " AND MasterBL IS NOT NULL AND MasterBL<>N'N/A' AND MasterBL=N'" + updateRoutingData.pMasterBL + "' AND BLType=" + updateRoutingData.pBLType, "ID", out _RowCount);
                    if(objCOperations_CheckUniqueness.lstCVarOperations.Count > 0)
                    {
                        strMessageReturned = "Operation " + objCOperations_CheckUniqueness.lstCVarOperations[0].Code + " has the same Master B/L No.";
                    }
                }
            }

            if (objCOperations_CheckUniqueness.lstCVarOperations.Count > 0 && objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName != "BOM" && !MescoCompanies.Contains(objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName))
                strMessageReturned = "Operation " + objCOperations_CheckUniqueness.lstCVarOperations[0].Code + " has the same Master B/L No.";
            else if (!updateRoutingData.pIsFleet && !CheckChangeIsAccepted(updateRoutingData.pID, updateRoutingData.pOperationID, updateRoutingData.pRoutingTypeID, updateRoutingData.pNumberOfHousesConnected, updateRoutingData.pPOLID, updateRoutingData.pPODID, updateRoutingData.pAirlineID, updateRoutingData.pVoyageOrTruckNumber, updateRoutingData.pMasterBL))
            {
                _result = false;
                strMessageReturned = "This data can not be saved.Either this is because it is connected to another operation or because of another session, please refresh then try again.";
            }
            else if (updateRoutingData.pRoutingTypeID == MainCarraigeID
                     && updateRoutingData.pBookingNumber != "0" && updateRoutingData.pBookingNumber != ""
                     && objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName == "ELC" //for Wefrieght
                    )
            {
                CvwRoutings objCRoutings_CheckUniqueness = new CvwRoutings();
                objCRoutings_CheckUniqueness.GetListPaging(999999, 1, "WHERE ID<>" + updateRoutingData.pID + " AND BookingNumber=N'" + updateRoutingData.pBookingNumber + "'", "ID", out _RowCount);
                if (objCRoutings_CheckUniqueness.lstCVarvwRoutings.Count > 0)
                    strMessageReturned = "This booking number already exists in operation " + objCRoutings_CheckUniqueness.lstCVarvwRoutings[0].OperationCode;
            }
            var checkBookingEx = CheckBookingNo(updateRoutingData.pOperationID, updateRoutingData.pBookingNumber, objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName);
            if (checkBookingEx != null)
            {
                _result = false;
                strMessageReturned = checkBookingEx.Message;
            }
            if (strMessageReturned == "")
            {
                CVarRoutings objCVarRoutings = new CVarRoutings();

                //the next 4 lines to get the CreatorUserID and CreationDate and set them as they were entered before
                CRoutings objCGetCreationInformation = new CRoutings();
                objCGetCreationInformation.GetItem(updateRoutingData.pID);
                objCVarRoutings.CreatorUserID = objCGetCreationInformation.lstCVarRoutings[0].CreatorUserID;
                objCVarRoutings.CreationDate = objCGetCreationInformation.lstCVarRoutings[0].CreationDate;
                objCVarRoutings.IsFleet = objCGetCreationInformation.lstCVarRoutings[0].IsFleet;
                objCVarRoutings.TruckingOrderCode = objCGetCreationInformation.lstCVarRoutings[0].TruckingOrderCode;
                if (updateRoutingData.pRoutingTypeID != MainCarraigeID)
                {
					objCVarRoutings.RoadNumber = updateRoutingData.pRoadNumber;//objCGetCreationInformation.lstCVarRoutings[0].RoadNumber;
					objCVarRoutings.DeliveryOrderNumber = updateRoutingData.pDeliveryOrderNumber;//objCGetCreationInformation.lstCVarRoutings[0].DeliveryOrderNumber;
                    objCVarRoutings.WareHouse = objCGetCreationInformation.lstCVarRoutings[0].WareHouse;
                    if (objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName == "NIL")
                        objCVarRoutings.WareHouseLocation = updateRoutingData.pWareHouseLocation;
                    else
                        objCVarRoutings.WareHouseLocation = objCGetCreationInformation.lstCVarRoutings[0].WareHouseLocation;
                }
                else
                {
                    objCVarRoutings.RoadNumber = updateRoutingData.pRoadNumber;
                    objCVarRoutings.DeliveryOrderNumber = updateRoutingData.pDeliveryOrderNumber;
                    objCVarRoutings.WareHouse = updateRoutingData.pWareHouse;
                    objCVarRoutings.WareHouseLocation = updateRoutingData.pWareHouseLocation;
                }
                objCVarRoutings.ID = updateRoutingData.pID;

                objCVarRoutings.RoutingTypeID = updateRoutingData.pRoutingTypeID;
                objCVarRoutings.OperationID = updateRoutingData.pOperationID;
                objCVarRoutings.TransportType = updateRoutingData.pTransportTypeID;
                objCVarRoutings.TransportIconName = updateRoutingData.pTransportIconName;
                objCVarRoutings.TransportIconStyle = updateRoutingData.pTransportIconStyle;
                objCVarRoutings.POLCountryID = updateRoutingData.pPOLCountryID;
                objCVarRoutings.PODCountryID = updateRoutingData.pPODCountryID;
                objCVarRoutings.POL = updateRoutingData.pPOLID;
                objCVarRoutings.POD = updateRoutingData.pPODID;

                objCVarRoutings.ETAPOLDate = updateRoutingData.pETAPOLDate;
                objCVarRoutings.ATAPOLDate = updateRoutingData.pATAPOLDate;
                objCVarRoutings.ExpectedArrival = updateRoutingData.pExpectedArrival;
                objCVarRoutings.ExpectedDeparture = updateRoutingData.pExpectedDeparture;
                objCVarRoutings.ActualArrival = updateRoutingData.pActualArrival;
                objCVarRoutings.ActualDeparture = updateRoutingData.pActualDeparture;

                objCVarRoutings.ShippingLineID = updateRoutingData.pShippingLineID;
                objCVarRoutings.AirlineID = updateRoutingData.pAirlineID;
                objCVarRoutings.TruckerID = updateRoutingData.pTruckerID;
                objCVarRoutings.VesselID = updateRoutingData.pVesselID;
                objCVarRoutings.VoyageOrTruckNumber = (updateRoutingData.pVoyageOrTruckNumber == null || updateRoutingData.pVoyageOrTruckNumber == "" ? "0" : updateRoutingData.pVoyageOrTruckNumber);
                objCVarRoutings.TransientTime = updateRoutingData.pTransientTime;
                objCVarRoutings.Validity = updateRoutingData.pValidity;
                objCVarRoutings.FreeTime = updateRoutingData.pFreeTime;
                objCVarRoutings.Notes = (updateRoutingData.pNotes == null ? "0" : updateRoutingData.pNotes);

                objCVarRoutings.GensetSupplierID = updateRoutingData.pGensetSupplierID;
                objCVarRoutings.CCAID = updateRoutingData.pCCAID;
                objCVarRoutings.Quantity = (updateRoutingData.pQuantity == null || updateRoutingData.pQuantity == "" ? "0" : updateRoutingData.pQuantity);
                objCVarRoutings.ContactPerson = (updateRoutingData.pContactPerson == null || updateRoutingData.pContactPerson == "" ? "0" : updateRoutingData.pContactPerson);
                objCVarRoutings.PickupAddress = (updateRoutingData.pPickupAddress == null || updateRoutingData.pPickupAddress == "" ? "0" : updateRoutingData.pPickupAddress);
                objCVarRoutings.DeliveryAddress = (updateRoutingData.pDeliveryAddress == null || updateRoutingData.pDeliveryAddress == "" ? "0" : updateRoutingData.pDeliveryAddress);
                objCVarRoutings.GateInPortID = updateRoutingData.pGateInPortID;
                objCVarRoutings.GateOutPortID = updateRoutingData.pGateOutPortID;
                objCVarRoutings.GateInDate = updateRoutingData.pGateInDate;

                #region TransportOrder
                objCVarRoutings.CustomerID = updateRoutingData.pCustomerID;
                objCVarRoutings.SubContractedCustomerID = updateRoutingData.pSubContractedCustomerID;
                objCVarRoutings.Cost = updateRoutingData.pCost;
                objCVarRoutings.Sale = updateRoutingData.pSale;
                //objCVarRoutings.IsFleet = updateRoutingData.pIsFleet; //in the get creation information
                objCVarRoutings.CommodityID = updateRoutingData.pCommodityID;
                objCVarRoutings.LoadingDate = updateRoutingData.pLoadingDate;
                objCVarRoutings.LoadingReference = updateRoutingData.pLoadingReference;
                // UnloadingDate is Sailing Date in NAJ
                objCVarRoutings.UnloadingDate = updateRoutingData.pUnloadingDate;
                objCVarRoutings.UnloadingTime = updateRoutingData.pUnloadingTime;
                objCVarRoutings.UnloadingReference = updateRoutingData.pUnloadingReference;
                objCVarRoutings.QuotationRouteID = updateRoutingData.pQuotationRouteID;
                #endregion TransportOrder

                objCVarRoutings.GateOutDate = updateRoutingData.pGateOutDate;
                objCVarRoutings.StuffingDate = updateRoutingData.pStuffingDate;
                objCVarRoutings.DeliveryDate = updateRoutingData.pDeliveryDate; //(updateRoutingData.pRoutingTypeID == MainCarraigeID ? updateRoutingData.pActualArrival : updateRoutingData.pDeliveryDate);//if main then take Acutal Arrival
                objCVarRoutings.BookingNumber = (updateRoutingData.pBookingNumber == null || updateRoutingData.pBookingNumber == "" ? "0" : updateRoutingData.pBookingNumber);
                objCVarRoutings.Delays = (updateRoutingData.pDelays == null || updateRoutingData.pDelays == "" ? "0" : updateRoutingData.pDelays);
                objCVarRoutings.DriverName = (updateRoutingData.pDriverName == null || updateRoutingData.pDriverName == "" ? "0" : updateRoutingData.pDriverName);
                objCVarRoutings.DriverPhones = (updateRoutingData.pDriverPhones == null || updateRoutingData.pDriverPhones == "" ? "0" : updateRoutingData.pDriverPhones);
                objCVarRoutings.PowerFromGateInTillActualSailing = (updateRoutingData.pPowerFromGateInTillActualSailing == null || updateRoutingData.pPowerFromGateInTillActualSailing == "" ? "0" : updateRoutingData.pPowerFromGateInTillActualSailing);
                objCVarRoutings.ContactPersonPhones = (updateRoutingData.pContactPersonPhones == null || updateRoutingData.pContactPersonPhones == "" ? "0" : updateRoutingData.pContactPersonPhones);
                objCVarRoutings.LoadingTime = (updateRoutingData.pLoadingTime == null || updateRoutingData.pLoadingTime == "" ? "0" : updateRoutingData.pLoadingTime);

                #region CustomsClearance
                objCVarRoutings.CCAFreight = updateRoutingData.pCCAFreight;
                objCVarRoutings.CCAFOB = updateRoutingData.pCCAFOB;
                objCVarRoutings.CCACFValue = updateRoutingData.pCCACFValue;
                objCVarRoutings.CCAInvoiceNumber = updateRoutingData.pCCAInvoiceNumber;

                objCVarRoutings.CCAInsurance = updateRoutingData.pCCAInsurance;
                objCVarRoutings.CCADischargeValue = updateRoutingData.pCCADischargeValue;
                objCVarRoutings.CCAAcceptedValue = updateRoutingData.pCCAAcceptedValue;
                objCVarRoutings.CCAImportValue = updateRoutingData.pCCAImportValue;
                objCVarRoutings.CCADocumentReceiveDate = DateTime.ParseExact(updateRoutingData.pCCADocumentReceiveDate + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture);
                objCVarRoutings.CCAExchangeRate = updateRoutingData.pCCAExchangeRate;
                objCVarRoutings.CCAVATCertificateNumber = updateRoutingData.pCCAVATCertificateNumber;
                objCVarRoutings.CCAVATCertificateValue = updateRoutingData.pCCAVATCertificateValue;
                objCVarRoutings.CCACommercialProfitCertificateNumber = updateRoutingData.pCCACommercialProfitCertificateNumber;
                objCVarRoutings.CCAWindowFees = updateRoutingData.pCCAWindowFees;
                objCVarRoutings.CCAStorageFees = updateRoutingData.pCCAStorageFees;
                objCVarRoutings.CCACommercialProfitTax = updateRoutingData.pCCACommercialProfitTax;
                objCVarRoutings.CCACustomsValue = updateRoutingData.pCCACustomsValue;
                objCVarRoutings.CCAQuotedValue = updateRoutingData.pCCAQuotedValue;
                objCVarRoutings.CCAContractType = updateRoutingData.pCCAContractType;
                objCVarRoutings.CCAOthers = updateRoutingData.pCCAOthers;
                objCVarRoutings.CCASpendDate = DateTime.ParseExact(updateRoutingData.pCCASpendDate + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture);
                objCVarRoutings.OffloadingDate = DateTime.ParseExact(updateRoutingData.pOffloadingDate + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture);

                objCVarRoutings.CertificateNumber = updateRoutingData.pCertificateNumber;
                objCVarRoutings.CertificateValue = updateRoutingData.pCertificateValue;
                objCVarRoutings.CertificateDate = DateTime.ParseExact(updateRoutingData.pCertificateDate + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture);
                objCVarRoutings.QasimaNumber = updateRoutingData.pQasimaNumber;
                objCVarRoutings.QasimaDate = DateTime.ParseExact(updateRoutingData.pQasimaDate + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture);
                objCVarRoutings.Match = updateRoutingData.pMatch;
                objCVarRoutings.SalesDateReceived = DateTime.ParseExact(updateRoutingData.pSalesDateReceived + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture);
                objCVarRoutings.CommerceDateReceived = DateTime.ParseExact(updateRoutingData.pCommerceDateReceived + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture);
                objCVarRoutings.InspectionDateReceived = DateTime.ParseExact(updateRoutingData.pInspectionDateReceived + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture);
                objCVarRoutings.FinishDateReceived = DateTime.ParseExact(updateRoutingData.pFinishDateReceived + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture);
                objCVarRoutings.SalesDateDelivered = DateTime.ParseExact(updateRoutingData.pSalesDateDelivered + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture);
                objCVarRoutings.CommerceDateDelivered = DateTime.ParseExact(updateRoutingData.pCommerceDateDelivered + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture);
                objCVarRoutings.InspectionDateDelivered = DateTime.ParseExact(updateRoutingData.pInspectionDateDelivered + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture);
                objCVarRoutings.FinishDateDelivered = DateTime.ParseExact(updateRoutingData.pFinishDateDelivered + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture);

                objCVarRoutings.CCMainWarehouseID = updateRoutingData.pCCMainWarehouseID;
                objCVarRoutings.CCWarehouseATD = updateRoutingData.pCCWarehouseATD;
                objCVarRoutings.CCWarehouseETA = updateRoutingData.pCCWarehouseETA;
                objCVarRoutings.CCIsDone = updateRoutingData.pCCIsDone;
                #endregion CustomsClearance


                objCVarRoutings.ModificatorUserID = WebSecurity.CurrentUserId;
                objCVarRoutings.ModificationDate = DateTime.Now;

                objCVarRoutings.IsOwnedByCompany = updateRoutingData.pIsOwnedByCompany;
                objCVarRoutings.IsLoaded = updateRoutingData.pIsLoaded ? updateRoutingData.pIsLoaded  : cRoutingsBeforeUpdate.lstCVarRoutings[0].IsLoaded;
                objCVarRoutings.TrailerID = updateRoutingData.pTrailerID;
                objCVarRoutings.DriverID = updateRoutingData.pDriverID;
                objCVarRoutings.DriverAssistantID = updateRoutingData.pDriverAssistantID;

                objCVarRoutings.EquipmentID = updateRoutingData.pEquipmentID;
                objCVarRoutings.LoadingZoneID = updateRoutingData.pLoadingZoneID;
                objCVarRoutings.FirstCuringAreaID = updateRoutingData.pFirstCuringAreaID;
                objCVarRoutings.SecondCuringAreaID = updateRoutingData.pSecondCuringAreaID;
                objCVarRoutings.ThirdCuringAreaID = updateRoutingData.pThirdCuringAreaID;
                objCVarRoutings.BillNumber = updateRoutingData.pBillNumber;
                //objCVarRoutings.TruckingOrderCode = updateRoutingData.pTruckingOrderCode;
                objCVarRoutings.TruckCounter = updateRoutingData.pTruckCounter;
                objCVarRoutings.CargoReturnGrossWeight = updateRoutingData.pCargoReturnGrossWeight;
                objCVarRoutings.LastTruckCounter = updateRoutingData.pLastTruckCounter;
                objCVarRoutings.MaxSupplierContainers = updateRoutingData.pMaxSupplierContainers;


                objCVarRoutings.CCAllowTemporaryDelivered = DateTime.ParseExact(updateRoutingData.pCCAllowTemporaryDelivered + " 00.00.00.000", "MM/dd/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture);
                objCVarRoutings.CCAllowTemporaryReceived = DateTime.ParseExact(updateRoutingData.pCCAllowTemporaryReceived + " 00.00.00.000", "MM/dd/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture);
                objCVarRoutings.CCDropBackDelivered = DateTime.ParseExact(updateRoutingData.pCCDropBackDelivered + " 00.00.00.000", "MM/dd/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture);
                objCVarRoutings.CCDropBackReceived = DateTime.ParseExact(updateRoutingData.pCCDropBackReceived + " 00.00.00.000", "MM/dd/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture);
                objCVarRoutings.CC_ClearanceTypeID = (updateRoutingData.pCC_ClearanceTypeID == null || updateRoutingData.pCC_ClearanceTypeID == "" ? 0 : int.Parse(updateRoutingData.pCC_ClearanceTypeID));
                objCVarRoutings.CC_CustomItemsID = (updateRoutingData.pCC_CustomItemsID == null || updateRoutingData.pCC_CustomItemsID == "" ? 0 : int.Parse(updateRoutingData.pCC_CustomItemsID));
                objCVarRoutings.CCReleaseNo = (updateRoutingData.pCCReleaseNo == null || updateRoutingData.pCCReleaseNo == "" ? "0" : updateRoutingData.pCCReleaseNo);
                objCVarRoutings.CustomerWarehouseManagerName = updateRoutingData.pCustomerWarehouseMangerName;
                objCVarRoutings.CustomerWarehouseManagerPhone = updateRoutingData.PCustomerWarehouseMangerPhone;
                objCVarRoutings.TruckingEquipmentID = updateRoutingData.pTruckingEquipmentID;

                objCVarRoutings.ConcedeCompanyName = updateRoutingData.pConcedeCompanyName;
                objCVarRoutings.ConcedeNumber = updateRoutingData.pConcedeNumber;
                objCVarRoutings.ConcedeTotalQty = updateRoutingData.pConcedeTotalQty;
                objCVarRoutings.ConcedeQty = updateRoutingData.pConcedeQty;
                objCVarRoutings.WarehouseID = updateRoutingData.pWarehouseID;
				objCVarRoutings.CCApproveNo = updateRoutingData.pCCApproveNo;
				objCVarRoutings.CCInvoiceNo = updateRoutingData.pCCInvoiceNo;
				objCVarRoutings.CCTotalQty = updateRoutingData.pCCTotalQty;
				objCVarRoutings.CCSubtractQty = updateRoutingData.pCCSubtractQty;
				objCVarRoutings.CCNetQty = updateRoutingData.pCCNetQty;
				objCVarRoutings.TrContainerTypeID = updateRoutingData.pTrContainerTypeID;
				objCVarRoutings.TrNumberOfContainers = updateRoutingData.pTrNumberOfContainers;
				Common.Common.ReplaceNull(objCVarRoutings);

                COperations operation = new COperations();
                //operation.UpdateList("CutOffDate = " + updateRoutingData.pCutoffDate + " WHERE ID =" + updateRoutingData.pOperationID);
                operation.UpdateList($"CutOffDate='{updateRoutingData.pCutoffDate}' where ID={updateRoutingData.pOperationID}");

          



                CRoutings objCRoutings = new CRoutings();



                objCRoutings.lstCVarRoutings.Add(objCVarRoutings);
                checkException = objCRoutings.SaveMethod(objCRoutings.lstCVarRoutings);

                if (checkException != null) // an exception is caught in the model
                {
                    if (checkException.Message.Contains("UNIQUE"))
                        _result = false;
                }
                else //not unique
                {
                    COperations shipsgoOperations = new COperations();
                    var companies = new[] { "ARK", "ELI" }; 
                    if (companies.Contains(objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName) && updateRoutingData.pRoutingTypeID == MainCarraigeID && !updateRoutingData.pIsFleet && updateRoutingData.pTransportTypeID == 1 && updateRoutingData.pShippingLineID > 0)
                    {
                        shipsgoOperations.GetItem(updateRoutingData.pOperationID);
                    }

                    var vwRouting = new CvwRoutings();
                    vwRouting.GetList("Where ID =" + objCVarRoutings.ID);
                    var obj = vwRouting.lstCVarvwRoutings[0];
                    var ex = Logging.Save<CVarvwRoutings>(ref obj, Convert.ToInt32(objCVarRoutings.ID)); 

                    _result = true;
                    #region Update MainCarraige in Operations table and Ports in its houses
                    string updateClause = "";
                    // Decide wether its main carraige or not
                    // pRoutingTypeID: 30=MainCarraige, .....
                    if (updateRoutingData.pRoutingTypeID == MainCarraigeID && !updateRoutingData.pIsFleet)
                    {
                        updateClause = " POLCountryID = " + (updateRoutingData.pPOLCountryID == 0 ? "null" : updateRoutingData.pPOLCountryID.ToString());
                        updateClause += " , PODCountryID = " + (updateRoutingData.pPODCountryID == 0 ? "null" : updateRoutingData.pPODCountryID.ToString());
                        updateClause += " , POL = " + (updateRoutingData.pPOLID == 0 ? "null" : updateRoutingData.pPOLID.ToString());
                        updateClause += " , POD = " + (updateRoutingData.pPODID == 0 ? "null" : updateRoutingData.pPODID.ToString());
                        updateClause += " , PickupAddress = " + (updateRoutingData.pPickupAddress == "0" ? "null" : ("N'" + updateRoutingData.pPickupAddress + "'"));
                        updateClause += " , DeliveryAddress = " + (updateRoutingData.pDeliveryAddress == "0" ? "null" : ("N'" + updateRoutingData.pDeliveryAddress + "'"));
                        updateClause += " , ShippingLineID = " + (updateRoutingData.pShippingLineID == 0 ? "null" : updateRoutingData.pShippingLineID.ToString());
                        updateClause += " , AirlineID = " + (updateRoutingData.pAirlineID == 0 ? "null" : updateRoutingData.pAirlineID.ToString());
                        updateClause += " , TruckerID = " + (updateRoutingData.pTruckerID == 0 ? "null" : updateRoutingData.pTruckerID.ToString());
                        updateClause += " , MasterBL = " + (updateRoutingData.pMasterBL == "0" ? "null" : "'" + updateRoutingData.pMasterBL + "'");
                        updateClause += " , MAWBSuffix = " + (updateRoutingData.pBLType != 2 && updateRoutingData.pTransportTypeID == 2 ? (updateRoutingData.pMAWBSuffix == "0" ? "null" : "'" + updateRoutingData.pMAWBSuffix + "'") : "null");
                        updateClause += (updateRoutingData.pBLDate == "NULL" ? " , BLDate = NULL " : " , BLDate = '" + Forwarding.MvcApp.Helpers.DateFunctionsController.GetYYYYMMDDFormat(updateRoutingData.pBLDate, 2) + "'");
                        //the next 3 lines dont have difference now but if in the future i allowed changing transport type then these line will be important and in addition i have to update FCL, LCL, FTL, LTL
                        //and also i i have to reset the containers and packages
                        updateClause += " , TransportType = " + updateRoutingData.pTransportTypeID.ToString();
                        updateClause += " , TransportIconName = '" + updateRoutingData.pTransportIconName + "'";
                        updateClause += " , TransportIconStyle = '" + updateRoutingData.pTransportIconStyle + "'";

                        updateClause += " , BookingNumber = '" + updateRoutingData.pBookingNumber + "'";

                        if (objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName == "UNF")
                        {
                            updateClause += " , VesselID = " + (updateRoutingData.pVesselID == 0 ? " NULL " : updateRoutingData.pVesselID.ToString());
                        }

                        updateClause += " WHERE ID = " + updateRoutingData.pOperationID.ToString();
                        COperations objCOperations = new COperations();
                        checkException = objCOperations.UpdateList(updateClause);


                        if (updateRoutingData.pRoutingTypeID == MainCarraigeID && objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName == "MES")
                        {



                            checkException = operation.UpdateList($" VesselID='{(updateRoutingData.pVesselID == 0 ? " NULL " : updateRoutingData.pVesselID.ToString())}' where MasterOperationID={updateRoutingData.pOperationID}");


                        }


                        if (checkException == null && companies.Contains(objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName) && updateRoutingData.pRoutingTypeID == MainCarraigeID && !updateRoutingData.pIsFleet && updateRoutingData.pTransportTypeID == 1 && updateRoutingData.pShippingLineID > 0 )
                        {

                            if (
                                    shipsgoOperations.lstCVarOperations.Count == 1
                                    && 
                                    (
                                        (
                                            objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName == "ELI"
                                            && updateRoutingData.pIsLoaded
                                            && (
                                                cRoutingsBeforeUpdate.lstCVarRoutings.Count > 0
                                                && !cRoutingsBeforeUpdate.lstCVarRoutings[0].IsLoaded
                                            )
                                             && updateRoutingData.pMasterBL.Length > 4

                                        )
                                        || (objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName == "ARK" && shipsgoOperations.lstCVarOperations[0].MasterBL.Length < 4
                                    && updateRoutingData.pMasterBL.Length > 4
                                    )
                                    )
                                )

                            {
                                try
                                {
                                    var opCon = new OperationsController();
                                    shipsgoOperations.lstCVarOperations[0].MasterBL = updateRoutingData.pMasterBL;
                                    shipsgoOperations.lstCVarOperations[0].ShippingLineID = updateRoutingData.pShippingLineID;
                                    string shipsGoMessage = opCon.ShipsGoTracking(shipsgoOperations.lstCVarOperations[0], objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName, true);
                                } catch (Exception e)
                                {
                                    CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
                                    objCCustomizedDBCall.ExecuteQuery($"INSERT INTO ShipsGoLog (OperationID,Log,LogFor) Values ({updateRoutingData.pOperationID},'{e.Message.Replace('\'', '"')}','Error')");
                                }
                            }

                        }

                        if(objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName != "MES")
                        {





                        //Update ports in the houses
                        updateClause = " POLCountryID = " + (updateRoutingData.pPOLCountryID == 0 ? "null" : updateRoutingData.pPOLCountryID.ToString());
                        updateClause += " , PODCountryID = " + (updateRoutingData.pPODCountryID == 0 ? "null" : updateRoutingData.pPODCountryID.ToString());
                        updateClause += " , POL = " + (updateRoutingData.pPOLID == 0 ? "null" : updateRoutingData.pPOLID.ToString());
                        updateClause += " , POD = " + (updateRoutingData.pPODID == 0 ? "null" : updateRoutingData.pPODID.ToString());
                        updateClause += " , AirlineID = " + (updateRoutingData.pAirlineID == 0 ? "null" : updateRoutingData.pAirlineID.ToString());
                        //the next 3 lines dont have difference now but if in the future i allowed changing transport type then these line will be important and in addition i have to update FCL, LCL, FTL, LTL
                        //and also i i have to reset the containers and packages
                        updateClause += " , TransportType = " + updateRoutingData.pTransportTypeID.ToString();
                        updateClause += " , TransportIconName = '" + updateRoutingData.pTransportIconName + "'";
                        updateClause += " , TransportIconStyle = '" + updateRoutingData.pTransportIconStyle + "'";
                        updateClause += " WHERE MasterOperationID = " + updateRoutingData.pOperationID.ToString();
                        checkException = objCOperations.UpdateList(updateClause);
                        //update Ports in house main routes
                        updateClause = " POLCountryID = " + (updateRoutingData.pPOLCountryID == 0 ? "null" : updateRoutingData.pPOLCountryID.ToString());
                        updateClause += " , PODCountryID = " + (updateRoutingData.pPODCountryID == 0 ? "null" : updateRoutingData.pPODCountryID.ToString());
                        updateClause += " , POL = " + (updateRoutingData.pPOLID == 0 ? "null" : updateRoutingData.pPOLID.ToString());
                        updateClause += " , POD = " + (updateRoutingData.pPODID == 0 ? "null" : updateRoutingData.pPODID.ToString());
                        updateClause += " WHERE RoutingTypeID=" + MainCarraigeID.ToString() + " AND OperationID in (SELECT ID FROM Operations WHERE MasterOperationID=" + updateRoutingData.pOperationID.ToString() + ")";
                        checkException = objCRoutings.UpdateList(updateClause);
                        }
                    }
					else if (updateRoutingData.pRoutingTypeID == TruckingOrderRoutingTypeID && objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName == "ELI")
					{
						updateClause = " Notes = '" + updateRoutingData.pOperationNotes + "'";
						updateClause += " WHERE ID = " + updateRoutingData.pOperationID.ToString();
						COperations objCOperations = new COperations();
						objCOperations.UpdateList(updateClause);
					}
					#endregion

					#region Update Packages Status
					if (objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName == "CHM" && updateRoutingData.pRoutingTypeID == MainCarraigeID)
                    {
                        var objCOperationContainersAndPackages = new COperationContainersAndPackages();
                        if (updateRoutingData.pActualDeparture.Year > 1900)
                            objCOperationContainersAndPackages.UpdateList($" StatusID = 2 where OperationID = {updateRoutingData.pOperationID} ");
                        else if (updateRoutingData.pExpectedDeparture.Year > 1900)
                            objCOperationContainersAndPackages.UpdateList($" StatusID = 4 where OperationID = {updateRoutingData.pOperationID} ");
                        else if (updateRoutingData.pATAPOLDate.Year > 1900)
                            objCOperationContainersAndPackages.UpdateList($" StatusID = 3 where OperationID = {updateRoutingData.pOperationID} ");
                        else if (updateRoutingData.pETAPOLDate.Year > 1900)
                            objCOperationContainersAndPackages.UpdateList($" StatusID = 1 where OperationID = {updateRoutingData.pOperationID} ");

                    }
                    #endregion
                }
            }

            //if (updateRoutingData.pRoutingTypeID == MainCarraigeID && updateRoutingData.pActualArrival.ToString() != "01/01/1900")
            //{
            //    string MessageReturned = SendArrivalNotification(updateRoutingData.pID);
            //}
            
            if (!updateRoutingData.pIsFleet)
                Forwarding.MvcApp.Controllers.Operations.API_Operations.OperationsController.Operations_EmailNotification(updateRoutingData.pOperationID);

            #region GET Returned Data
            CvwRoutings objCvwRoutings_SavedRoute = new CvwRoutings();
            CvwRoutings objCvwRoutings = new CvwRoutings();
            int _tempRowCount = 0;
            checkException = objCvwRoutings_SavedRoute.GetListPaging(999999, 1, "WHERE ID=" + updateRoutingData.pID, "ViewOrder", out _tempRowCount);
            if (!updateRoutingData.pIsFleet) //in fleet all orders are in the same operation
                checkException = objCvwRoutings.GetListPaging(999999, 1, "WHERE OperationID=" + updateRoutingData.pOperationID, "ViewOrder", out _tempRowCount);


            if(checkException == null)
            {
                if (updateRoutingData.pRoutingTypeID == MainCarraigeID && objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName != "MES")
                {
                    COperations operation = new COperations();


                    checkException =  operation.UpdateList($"PODCountryID = {updateRoutingData.pPODCountryID}, DeliveryCountryID = {updateRoutingData.pPODCountryID} ,  POLCountryID = {updateRoutingData.pPOLCountryID} ,DeliveryCityID= {(updateRoutingData.pPODID == 0 ? "null" : updateRoutingData.pPODID.ToString())},  PickupCityID =  {(updateRoutingData.pPOLID == 0 ? "null" : updateRoutingData.pPOLID.ToString())} , pod = {(updateRoutingData.pPODID == 0 ? "null" : updateRoutingData.pPODID.ToString())} , pol =  {(updateRoutingData.pPOLID == 0 ? "null" : updateRoutingData.pPOLID.ToString())} , VesselID='{(updateRoutingData.pVesselID == 0 ? " NULL " : updateRoutingData.pVesselID.ToString())}' where MasterOperationID={updateRoutingData.pOperationID}");
                }





            }
            if (objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName == "UNF")
            {
                var NewETA = updateRoutingData.pExpectedArrival.ToString("dd/MM/yyyy");
                var NewATA = updateRoutingData.pActualArrival.ToString("dd/MM/yyyy");

                if (NewETA != OldETA || NewATA != OldATA)
                {
                    CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
                    var houses = objCCustomizedDBCall.CallStringFunction("select SUBSTRING((SELECT ',' + O.housenumber FROM operations O WHERE o.MasterOperationID =" + updateRoutingData.pOperationID + "FOR XML PATH('')), 2, 10000)");
                    var CreationMessage = new OperationsController();
                    CreationMessage.CreationMessage(houses, NewETA.ToString(), NewATA.ToString());
                }
            }
            #endregion GET Returned Data
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                _result
                , strMessageReturned
                , new JavaScriptSerializer().Serialize(objCvwRoutings_SavedRoute.lstCVarvwRoutings[0]) //pSavedRoute=pData[2]
                , serializer.Serialize(objCvwRoutings.lstCVarvwRoutings) //pRoutes=pData[3]
            };
        }



        [HttpGet, HttpPost]
        public string SendArrivalNotification(long pRoutingID)
        {

            Exception checkException = null;
            Int32 _RowCount = 0;
            string _MessageReturned = "";

            CvwRoutings objCvwRoutings = new CvwRoutings();
            objCvwRoutings.GetListPaging(999, 1, " WHERE ID=" + pRoutingID, " ID ", out _RowCount);

            long OperationID = objCvwRoutings.lstCVarvwRoutings[0].OperationID;

            CvwOperations objCvwOperations = new CvwOperations();
            objCvwOperations.GetListPaging(999, 1, " WHERE ID=" + OperationID, " ID ", out _RowCount);

            string ClientEmail = objCvwOperations.lstCVarvwOperations[0].ClientEmail;
            string ClientName = objCvwOperations.lstCVarvwOperations[0].ClientName;


            #region Sending Email

            CvwDefaults objCvwDefaults = new CvwDefaults();
            objCvwDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount); //i am sure i ve just one row isa

            CUsers objCUser_Sender = new CUsers();
            checkException = objCUser_Sender.GetListPaging(999999, 1, "WHERE ID=" + WebSecurity.CurrentUserId, "ID", out _RowCount);

            if (objCvwDefaults.lstCVarvwDefaults[0].Email != "0" && objCvwDefaults.lstCVarvwDefaults[0].Email != ""
                        && objCvwDefaults.lstCVarvwDefaults[0].Email_Password != "0" && objCvwDefaults.lstCVarvwDefaults[0].Email_Password != ""
                        && objCvwDefaults.lstCVarvwDefaults[0].Email_DisplayName != "0" && objCvwDefaults.lstCVarvwDefaults[0].Email_DisplayName != ""
                        && objCvwDefaults.lstCVarvwDefaults[0].Email_Host != "0" && objCvwDefaults.lstCVarvwDefaults[0].Email_Host != ""
                        && objCvwDefaults.lstCVarvwDefaults[0].Email_Port != 0 /*&& objCvwDefaults.lstCVarvwDefaults[0].IsDepartmentOption*/)
            {
                string subject = "Arrival Notification";
                string body = "<br/>"
                    + "Dear " + ClientName
                    + "<br />   "
                    + "We are Pleased to inform you that "
                    + "<br />   "
                    + "your shipment has arrived"
                    + "<br />   "
                    + objCUser_Sender.lstCVarUsers[0].Email_Footer;

                #region Send

                string FromMail = objCvwDefaults.lstCVarvwDefaults[0].Email;
                MailMessage mail = new MailMessage(FromMail, ClientEmail);
                SmtpClient SmtpServer = new SmtpClient(objCvwDefaults.lstCVarvwDefaults[0].Email_Host, objCvwDefaults.lstCVarvwDefaults[0].Email_Port);
                SmtpServer.UseDefaultCredentials = true;
                //mail.From = new MailAddress(FromMail);

                //mail.To.Add(ClientEmail);

                mail.IsBodyHtml = true;
                mail.Subject = subject;
                mail.Body = body;
                SmtpServer.Host = objCvwDefaults.lstCVarvwDefaults[0].Email_Host;
                SmtpServer.Credentials = new System.Net.NetworkCredential(FromMail, CEncryptDecrypt.Decrypt(objCvwDefaults.lstCVarvwDefaults[0].Email_Password, true));
                SmtpServer.EnableSsl = true;// objCvwDefaults.lstCVarvwDefaults[0].Email_IsSSL;



                SmtpServer.Send(mail);

                //if (ClientEmail != "")
                //    try
                //    {
                //        SmtpServer.Send(mail);
                //    }
                //    catch (Exception ex)
                //    {
                //        _MessageReturned = ex.Message;
                //    }
                #endregion Send
                #region Update OperationEmailSent
                //if (_MessageReturned == "")
                //{
                //    string _UpdateClause = "";
                //    _UpdateClause = "OpenDate= (SELECT OpenDate FROM vwOperations WHERE ID=" + pOperationID + ")" + " \n";
                //    _UpdateClause += ",CloseDate= (SELECT CloseDate FROM vwOperations WHERE ID=" + pOperationID + ")" + " \n";
                //    _UpdateClause += ",CutOffDate= (SELECT CutOffDate FROM vwOperations WHERE ID=" + pOperationID + ")" + " \n";
                //    _UpdateClause += ",PODate= (SELECT PODate FROM vwOperations WHERE ID=" + pOperationID + ")" + " \n";
                //    _UpdateClause += ",ReleaseDate= (SELECT ReleaseDate FROM vwOperations WHERE ID=" + pOperationID + ")" + " \n";
                //    _UpdateClause += ",ETAPOLDate= (SELECT ETAPOLDate FROM vwOperations WHERE ID=" + pOperationID + ")" + " \n";
                //    _UpdateClause += ",ATAPOLDate= (SELECT ATAPOLDate FROM vwOperations WHERE ID=" + pOperationID + ")" + " \n";
                //    _UpdateClause += ",ExpectedDeparture= (SELECT ExpectedDeparture FROM vwOperations WHERE ID=" + pOperationID + ")" + " \n";
                //    _UpdateClause += ",ActualDeparture= (SELECT ActualDeparture FROM vwOperations WHERE ID=" + pOperationID + ")" + " \n";
                //    _UpdateClause += ",ExpectedArrival= (SELECT ExpectedArrival FROM vwOperations WHERE ID=" + pOperationID + ")" + " \n";
                //    //Routing TruckingOrder
                //    _UpdateClause += ",GateInDate= (SELECT Top 1 GateInDate FROM Routings WHERE RoutingTypeID=60 AND OperationID=" + pOperationID + ")" + " \n";
                //    _UpdateClause += ",GateOutDate= (SELECT Top 1 GateOutDate FROM Routings WHERE RoutingTypeID=60 AND OperationID=" + pOperationID + ")" + " \n";
                //    _UpdateClause += ",StuffingDate= (SELECT Top 1 StuffingDate FROM Routings WHERE RoutingTypeID=60 AND OperationID=" + pOperationID + ")" + " \n";
                //    _UpdateClause += ",DeliveryDate= (SELECT Top 1 DeliveryDate FROM Routings WHERE RoutingTypeID=60 AND OperationID=" + pOperationID + ")" + " \n";
                //    //Routing CustomsClearance
                //    _UpdateClause += ",CertificateDate= (SELECT TOP 1 CertificateDate FROM Routings WHERE RoutingTypeID=70 AND OperationID=" + pOperationID + ")" + " \n";
                //    _UpdateClause += ",QasimaDate= (SELECT TOP 1 QasimaDate FROM Routings WHERE RoutingTypeID=70 AND OperationID=" + pOperationID + ")" + " \n";
                //    _UpdateClause += "WHERE OperationID=" + pOperationID + " \n";
                //    checkException = objCOperationEmailSent.UpdateList(_UpdateClause);
                //}
                #endregion Update OperationEmailSent
            }

            #endregion Sending Email


            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return _MessageReturned;
        }

        [HttpGet, HttpPost]
        public object[] Save_FleetDistribution([FromBody] Save_FleetDistributionData save_FleetDistributionData)
        { // pNumberOfHousesConnected: used in the controller to be compared to NumberOfHousesConnected retrieved from DB at time of save to handle other sessions changes
            bool _result = false;
            string _ReturnedMessage = "";
            int MainCarraigeID = 30;
            int TruckingOrderRoutingTypeID = 60;
            CRoutings objCRoutings = new CRoutings();
            string _UpdateList = "";
            Exception checkException = null;
            int _RowCount = 0;

            CDefaults objCDefaults = new CDefaults();
            objCDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount); //i am sure i ve just one row isa
            #region Insert
            if (save_FleetDistributionData.pID_FleetSave == 0)
            {

            }
            #endregion Insert
            #region Update
            else
            {
                _UpdateList = "POLCountryID=" + (save_FleetDistributionData.pPOLCountryID == 0 ? "NULL" : "N'" + save_FleetDistributionData.pPOLCountryID + "'") + " \n";
                _UpdateList += ",PODCountryID=" + (save_FleetDistributionData.pPODCountryID == 0 ? "NULL" : "N'" + save_FleetDistributionData.pPODCountryID + "'") + " \n";
                _UpdateList += ",POL=" + (save_FleetDistributionData.pPOLID == 0 ? "NULL" : "N'" + save_FleetDistributionData.pPOLID + "'") + " \n";
                _UpdateList += ",POD=" + (save_FleetDistributionData.pPODID == 0 ? "NULL" : "N'" + save_FleetDistributionData.pPODID + "'") + " \n";
                _UpdateList += ",TruckerID=" + (save_FleetDistributionData.pTruckerID == 0 ? "NULL" : "N'" + save_FleetDistributionData.pTruckerID + "'") + " \n";
                _UpdateList += ",VoyageOrTruckNumber=" + (save_FleetDistributionData.pVoyageOrTruckNumber == "0" ? "NULL" : "N'" + save_FleetDistributionData.pVoyageOrTruckNumber + "'") + " \n";
                _UpdateList += ",TransientTime=" + (save_FleetDistributionData.pTransientTime == 0 ? "NULL" : "N'" + save_FleetDistributionData.pTransientTime + "'") + " \n";
                _UpdateList += ",Validity=" + (save_FleetDistributionData.pValidity == 0 ? "NULL" : "N'" + save_FleetDistributionData.pValidity + "'") + " \n";
                _UpdateList += ",FreeTime=" + (save_FleetDistributionData.pFreeTime == 0 ? "NULL" : "N'" + save_FleetDistributionData.pFreeTime + "'") + " \n";
                _UpdateList += ",Notes=" + (save_FleetDistributionData.pNotes == "0" ? "NULL" : "N'" + save_FleetDistributionData.pNotes + "'") + " \n";
                _UpdateList += ",Quantity=" + (save_FleetDistributionData.pQuantity == 0 ? "NULL" : "N'" + save_FleetDistributionData.pQuantity + "'") + " \n";
                _UpdateList += ",PickupAddress=" + (save_FleetDistributionData.pTruckingOrderPickupAddress == "0" ? "NULL" : "N'" + save_FleetDistributionData.pTruckingOrderPickupAddress + "'") + " \n";
                _UpdateList += ",DeliveryAddress=" + (save_FleetDistributionData.pTruckingOrderDeliveryAddress == "0" ? "NULL" : "N'" + save_FleetDistributionData.pTruckingOrderDeliveryAddress + "'") + " \n";
                _UpdateList += ",GateInPortID=" + (save_FleetDistributionData.pGateInPortID == 0 ? "NULL" : "N'" + save_FleetDistributionData.pGateInPortID + "'") + " \n";
                _UpdateList += ",GateOutPortID=" + (save_FleetDistributionData.pGateOutPortID == 0 ? "NULL" : "N'" + save_FleetDistributionData.pGateOutPortID + "'") + " \n";
                _UpdateList += ",GateInDate=" + (save_FleetDistributionData.pGateInDate == "0" ? "NULL" : "N'" + DateTime.ParseExact(save_FleetDistributionData.pGateInDate + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture) + "'") + " \n";
                _UpdateList += ",CustomerID=" + (save_FleetDistributionData.pCustomerID == 0 ? "NULL" : "N'" + save_FleetDistributionData.pCustomerID + "'") + " \n";
                _UpdateList += ",Cost=" + (save_FleetDistributionData.pCost == 0 ? "NULL" : "N'" + save_FleetDistributionData.pCost + "'") + " \n";
                _UpdateList += ",Sale=" + (save_FleetDistributionData.pSale == 0 ? "NULL" : "N'" + save_FleetDistributionData.pSale + "'") + " \n";
                _UpdateList += ",IsFleet=" + (save_FleetDistributionData.pIsFleet ? "1" : "0") + " \n";
                _UpdateList += ",CommodityID=" + (save_FleetDistributionData.pCommodityID == 0 ? "NULL" : "N'" + save_FleetDistributionData.pCommodityID + "'") + " \n";
                _UpdateList += ",LoadingDate=" + (save_FleetDistributionData.pLoadingDate == "0" ? "NULL" : "N'" + DateTime.ParseExact(save_FleetDistributionData.pLoadingDate + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture) + "'") + " \n";
                _UpdateList += ",LoadingReference=" + (save_FleetDistributionData.pLoadingReference == "0" ? "NULL" : "N'" + save_FleetDistributionData.pLoadingReference + "'") + " \n";
                _UpdateList += ",UnloadingDate=" + (save_FleetDistributionData.pUnloadingDate == "0" ? "NULL" : "N'" + DateTime.ParseExact(save_FleetDistributionData.pUnloadingDate + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture) + "'") + " \n";
                _UpdateList += ",UnloadingReference=" + (save_FleetDistributionData.pUnloadingReference == "0" ? "NULL" : "N'" + save_FleetDistributionData.pUnloadingReference + "'") + " \n";
                _UpdateList += ",UnloadingTime=" + (save_FleetDistributionData.pUnloadingTime == "0" ? "NULL" : "N'" + save_FleetDistributionData.pUnloadingTime + "'") + " \n";
                _UpdateList += ",QuotationRouteID=" + (save_FleetDistributionData.pQuotationRouteID == 0 ? "NULL" : "N'" + save_FleetDistributionData.pQuotationRouteID + "'") + " \n";
                _UpdateList += ",GateOutDate=" + (save_FleetDistributionData.pGateOutDate == "0" ? "NULL" : "N'" + DateTime.ParseExact(save_FleetDistributionData.pGateOutDate + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture) + "'") + " \n";
                _UpdateList += ",StuffingDate=" + (save_FleetDistributionData.pStuffingDate == "0" ? "NULL" : "N'" + DateTime.ParseExact(save_FleetDistributionData.pStuffingDate + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture) + "'") + " \n";
                _UpdateList += ",BookingNumber=" + (save_FleetDistributionData.pBookingNumber == "0" ? "NULL" : "N'" + save_FleetDistributionData.pBookingNumber + "'") + " \n";
                _UpdateList += ",Delays=" + (save_FleetDistributionData.pDelays == "0" ? "NULL" : "N'" + save_FleetDistributionData.pDelays + "'") + " \n";
                _UpdateList += ",DriverName=" + (save_FleetDistributionData.pDriverName == "0" ? "NULL" : "N'" + save_FleetDistributionData.pDriverName + "'") + " \n";
                _UpdateList += ",DriverPhones=" + (save_FleetDistributionData.pDriverPhones == "0" ? "NULL" : "N'" + save_FleetDistributionData.pDriverPhones + "'") + " \n";
                _UpdateList += ",PowerFromGateInTillActualSailing=" + (save_FleetDistributionData.pPowerFromGateInTillActualSailing == "0" ? "NULL" : "N'" + save_FleetDistributionData.pPowerFromGateInTillActualSailing + "'") + " \n";
                _UpdateList += ",LoadingTime=" + (save_FleetDistributionData.pLoadingTime == "0" ? "NULL" : "N'" + save_FleetDistributionData.pLoadingTime + "'") + " \n";
                _UpdateList += ",IsOwnedByCompany=" + (save_FleetDistributionData.pIsOwnedByCompany ? "1" : "0") + " \n";
                _UpdateList += ",TrailerID=" + (save_FleetDistributionData.pTrailerID == 0 ? "NULL" : "N'" + save_FleetDistributionData.pTrailerID + "'") + " \n";
                _UpdateList += ",DriverID=" + (save_FleetDistributionData.pDriverID == 0 ? "NULL" : "N'" + save_FleetDistributionData.pDriverID + "'") + " \n";
                _UpdateList += ",DriverAssistantID=" + (save_FleetDistributionData.pDriverAssistantID == 0 ? "NULL" : "N'" + save_FleetDistributionData.pDriverAssistantID + "'") + " \n";
                _UpdateList += ",EquipmentID=" + (save_FleetDistributionData.pEquipmentID == 0 ? "NULL" : "N'" + save_FleetDistributionData.pEquipmentID + "'") + " \n";
                _UpdateList += ",LoadingZoneID=" + (save_FleetDistributionData.pLoadingZoneID == 0 ? "NULL" : "N'" + save_FleetDistributionData.pLoadingZoneID + "'") + " \n";
                _UpdateList += ",FirstCuringAreaID=" + (save_FleetDistributionData.pFirstCuringAreaID == 0 ? "NULL" : "N'" + save_FleetDistributionData.pFirstCuringAreaID + "'") + " \n";
                _UpdateList += ",SecondCuringAreaID=" + (save_FleetDistributionData.pSecondCuringAreaID == 0 ? "NULL" : "N'" + save_FleetDistributionData.pSecondCuringAreaID + "'") + " \n";
                _UpdateList += ",ThirdCuringAreaID=" + (save_FleetDistributionData.pThirdCuringAreaID == 0 ? "NULL" : "N'" + save_FleetDistributionData.pThirdCuringAreaID + "'") + " \n";
                _UpdateList += ",BillNumber=" + (save_FleetDistributionData.pBillNumber == "0" ? "NULL" : "N'" + save_FleetDistributionData.pBillNumber + "'") + " \n";
                _UpdateList += ",TruckingOrderCode=" + (save_FleetDistributionData.pTruckingOrderCode == "0" ? "NULL" : "N'" + save_FleetDistributionData.pTruckingOrderCode + "'") + " \n";
                _UpdateList += ",TruckCounter=" + (save_FleetDistributionData.pTruckCounter == 0 ? "NULL" : "N'" + save_FleetDistributionData.pTruckCounter + "'") + " \n";
                _UpdateList += ",CargoReturnGrossWeight=" + (save_FleetDistributionData.pCargoReturnGrossWeight == 0 ? "NULL" : "N'" + save_FleetDistributionData.pCargoReturnGrossWeight + "'") + " \n";
                _UpdateList += ",LastTruckCounter=" + (save_FleetDistributionData.pLastTruckCounter == 0 ? "NULL" : "N'" + save_FleetDistributionData.pLastTruckCounter + "'") + " \n";

                _UpdateList += "WHERE ID=" + save_FleetDistributionData.pID_FleetSave + " \n";
                checkException = objCRoutings.UpdateList(_UpdateList);
                if (checkException != null)
                    _ReturnedMessage = checkException.Message;
            }
            #endregion Update

            //Forwarding.MvcApp.Controllers.Operations.API_Operations.OperationsController.Operations_EmailNotification(updateRoutingData.pOperationID);

            #region GET Returned Data
            CvwRoutings objCvwRoutings_SavedRoute = new CvwRoutings();
            CvwRoutings objCvwRoutings = new CvwRoutings();
            int _tempRowCount = 0;
            if (_ReturnedMessage == "")
                checkException = objCvwRoutings_SavedRoute.GetListPaging(999999, 1, "WHERE ID=" + save_FleetDistributionData.pID_FleetSave, "ViewOrder", out _tempRowCount);
            //if (!save_FleetDistributionData.pIsFleet)
            //    checkException = objCvwRoutings.GetListPaging(999999, 1, "WHERE OperationID=" + save_FleetDistributionData.pOperationID, "ViewOrder", out _tempRowCount);
            #endregion GET Returned Data
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                _result
                , _ReturnedMessage
                , _ReturnedMessage == "" ? serializer.Serialize(objCvwRoutings_SavedRoute.lstCVarvwRoutings[0]) : null //pSavedRoute=pData[2]
                //, serializer.Serialize(objCvwRoutings.lstCVarvwRoutings) //pRoutes=pData[3]
            };
        }

        //to make sure that no changes in another session prevents saving
        [HttpGet, HttpPost]
        public bool CheckChangeIsAccepted(Int64 pRoutingID, Int64 pOperationID, int pRoutingTypeID, int pNumberOfHousesConnected, int pPOLID, int pPODID, int pAirlineID, string pVoyageOrTruckNumber, string pMasterBL)
        {
            bool _result = true;
            int MainCarraigeID = 30;
            int constMasterBLType = 3;
            if (pRoutingTypeID == MainCarraigeID) //if not main route type then return true directly without check
            {
                COperations objCOperation = new COperations();
                CRoutings objCRoutings = new CRoutings();
                Int32 _RowCount = 0;
                objCOperation.GetListPaging(10, 1, " WHERE ID = " + pOperationID.ToString(), " ID ", out _RowCount);
                //objCRoutings.GetList(" WHERE ID = " + pRoutingID);
                objCRoutings.GetListPaging(9999, 1, " WHERE ID = " + pRoutingID, "ID", out _RowCount);

                if (
                    //objCOperation.lstCVarOperations[0].MasterOperationID != 0//House & Connected so NO update at all
                    //|| (objCOperation.lstCVarOperations[0].BLType == constMasterBLType && objCOperation.lstCVarOperations[0].NumberOfHousesConnected > 0 //if MAster & Connected then can'nt be changed
                    //        && (objCOperation.lstCVarOperations[0].POL != pPOLID || objCOperation.lstCVarOperations[0].POD != pPODID)
                    //   )
                    //|| 
                    (objCOperation.lstCVarOperations[0].MAWBStockID != 0 && //if MAWBStock is changed in another session then the line and MasterBL and VoyageNo cant be changed
                     (objCOperation.lstCVarOperations[0].AirlineID != pAirlineID || objCOperation.lstCVarOperations[0].MasterBL != pMasterBL || objCRoutings.lstCVarRoutings[0].VoyageOrTruckNumber != pVoyageOrTruckNumber)
                    )
                )
                    _result = false;
            }
            else
                _result = true;
            return _result;
        }

        [HttpGet, HttpPost]
        public bool Delete(String pRoutingsIDs)
        {
            bool _result = false;
            Exception checkException = null;
            int _RowCount = 0;

            #region delete 0 payables
            CPayables objCPayables = new CPayables();
            checkException = objCPayables.GetListPaging(1, 1, "WHERE ISNULL(CostPrice) > 0 AND TruckingOrderID IN(" + pRoutingsIDs + ")", "ID", out _RowCount);
            if (objCPayables.lstCVarPayables.Count == 0)
                checkException = objCPayables.DeleteList("WHERE TruckingOrderID IN(" + pRoutingsIDs + ")");
            #endregion delete 0 payables

            CRoutings objCRoutings = new CRoutings();
            foreach (var currentID in pRoutingsIDs.Split(','))
            {
                objCRoutings.lstDeletedCPKRoutings.Add(new CPKRoutings() { ID = Int64.Parse(currentID.Trim()) });
            }

            checkException = objCRoutings.DeleteItem(objCRoutings.lstDeletedCPKRoutings);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("DELETE")) // some or all of the rows were not deleted due to dependencies
                    _result = false;
            }
            else //deleted successfully
                _result = true;
            return _result;
        }

        [HttpGet, HttpPost]
        public object[] SetMAWB(Int64 pRoutingID, Int64 pOperationID, Int64 pMAWBStockID, string pMAWBPrefix, string pMAWBSuffix, int pAirlineID, string pVoyageOrTruckNumber)
        {
            bool _result = true;
            string updateClause = "";
            string strMsgReturned = "";
            Exception checkException = null;

            if (CheckIfMAWBSuitsOperation(pOperationID, pMAWBStockID))
            {
                #region Update Operations
                COperations objCOperations = new COperations();

                updateClause = " MAWBStockID = " + pMAWBStockID;
                updateClause += " , MasterBL = '" + pMAWBPrefix + "' + '-' + '" + pMAWBSuffix + "'";
                updateClause += " , MAWBSuffix = '" + pMAWBSuffix + "'";
                updateClause += " , BLDate = GETDATE() ";
                updateClause += " , AirlineID = " + pAirlineID.ToString();
                updateClause += " , ModificatorUserID = " + WebSecurity.CurrentUserId.ToString();
                updateClause += " , ModificationDate = GETDATE() ";
                updateClause += "            WHERE ID = " + pOperationID.ToString();

                checkException = objCOperations.UpdateList(updateClause);
                if (checkException == null)
                    _result = true;
                else
                    _result = false;
                #endregion Update Operations

                #region Update MAWBStock
                CMAWBStock objCMAWBStock = new CMAWBStock();
                updateClause = " AssignedToOperationID = " + pOperationID;
                updateClause += " , ModificatorUserID = " + WebSecurity.CurrentUserId.ToString();
                updateClause += " , ModificationDate = GETDATE() ";
                updateClause += "            WHERE ID = " + pMAWBStockID.ToString();

                checkException = objCMAWBStock.UpdateList(updateClause);
                if (checkException == null)
                    _result = true;
                else
                    _result = false;
                #endregion Update MAWBStock
                //I am updating AirlineID in Routings for the case of changing Airline then selecting MAWB from stock without pressing Routing Save button
                #region Update Routings
                CRoutings objCRoutings = new CRoutings();
                updateClause = " AirlineID = " + pAirlineID;
                updateClause += " , VoyageOrTruckNumber = '" + pVoyageOrTruckNumber + "'";
                updateClause += " , ModificatorUserID = " + WebSecurity.CurrentUserId.ToString();
                updateClause += " , ModificationDate = GETDATE() ";
                updateClause += "            WHERE ID = " + pRoutingID.ToString();

                checkException = objCRoutings.UpdateList(updateClause);
                if (checkException == null)
                    _result = true;
                else
                    _result = false;
                #endregion Update Routings
            }
            else
                strMsgReturned = " Probably another session changed related data. Please refresh.";
            return new Object[] { _result, strMsgReturned };
        }

        [HttpGet, HttpPost]
        public bool CheckIfMAWBSuitsOperation(Int64 pOperationID, Int64 pMAWBStockID)
        {
            bool _result = true;
            COperations objCOperations = new COperations();
            CMAWBStock objCCMAWBStock = new CMAWBStock();
            Int32 _RowCount = 0;
            objCOperations.GetListPaging(10, 1, " WHERE ID = " + pOperationID.ToString(), " ID ", out _RowCount);
            objCCMAWBStock.GetList(" WHERE ID = " + pMAWBStockID);
            if (objCOperations.lstCVarOperations[0].MAWBStockID != 0 || objCCMAWBStock.lstCVarMAWBStock[0].AssignedToOperationID != 0)
                _result = false;
            return _result;
        }

        [HttpGet, HttpPost]
        public object[] ReturnMAWB(Int64 pRoutingID, Int64 pOperationID, Int64 pMAWBStockID)
        {
            bool _result = true;
            string updateClause = "";
            Exception checkException = null;

            #region Update Operations
            COperations objCOperations = new COperations();

            updateClause = " MAWBStockID = NULL ";
            updateClause += " , MasterBL = NULL ";
            updateClause += " , MAWBSuffix = NULL ";
            updateClause += " , BLDate = NULL ";
            updateClause += " , ModificatorUserID = " + WebSecurity.CurrentUserId.ToString();
            updateClause += " , ModificationDate = GETDATE() ";
            updateClause += "            WHERE ID = " + pOperationID.ToString();

            checkException = objCOperations.UpdateList(updateClause);
            if (checkException == null)
                _result = true;
            else
                _result = false;
            #endregion Update Operations

            #region Update MAWBStock
            CMAWBStock objCMAWBStock = new CMAWBStock();
            updateClause = " AssignedToOperationID = NULL ";
            updateClause += " , ModificatorUserID = " + WebSecurity.CurrentUserId.ToString();
            updateClause += " , ModificationDate = GETDATE() ";
            updateClause += "            WHERE ID = " + pMAWBStockID.ToString();

            checkException = objCMAWBStock.UpdateList(updateClause);
            if (checkException == null)
                _result = true;
            else
                _result = false;
            #endregion Update MAWBStock

            return new Object[] { _result };
        }

        [HttpGet, HttpPost]
        public object[] GenerateMissingRoutes(Int64 pOperationIDToRestoreRoute)
        {
            int _RowCount = 0;
            CvwRoutings objCvwRoutings = new CvwRoutings();
            COperations objCOperations = new COperations();
            Exception checkException = null;
            int MainCarraigeRoutingTypeID = 30;
            //checkException = objCOperations.GetListPaging(99999, 1, "WHERE ID NOT IN (SELECT DISTINCT OperationID FROM Routings WHERE RoutingTypeID=" + MainCarraigeRoutingTypeID.ToString() + " AND OperationID="+pOperationIDToRestoreRoute+")", "ID", out _RowCount);
            checkException = objCOperations.GetListPaging(99999, 1, "WHERE ID NOT IN (SELECT DISTINCT OperationID FROM Routings WHERE OperationID IS NOT NULL AND RoutingTypeID=" + MainCarraigeRoutingTypeID.ToString() + ")", "ID", out _RowCount);
            #region insert missing routes
            for (int i = 0; i < objCOperations.lstCVarOperations.Count; i++)
            {
                CRoutings objCRoutings = new CRoutings();
                CVarRoutings objCVarRoutings = new CVarRoutings();
                objCVarRoutings.OperationID = objCOperations.lstCVarOperations[i].ID;
                objCVarRoutings.TransportType = objCOperations.lstCVarOperations[i].TransportType;
                objCVarRoutings.TransportIconName = objCOperations.lstCVarOperations[i].TransportIconName;
                objCVarRoutings.TransportIconStyle = objCOperations.lstCVarOperations[i].TransportIconStyle;
                objCVarRoutings.RoutingTypeID = MainCarraigeRoutingTypeID; //Main Carraige
                objCVarRoutings.POLCountryID = objCOperations.lstCVarOperations[i].POLCountryID;
                objCVarRoutings.POL = objCOperations.lstCVarOperations[i].POL;
                objCVarRoutings.PODCountryID = objCOperations.lstCVarOperations[i].PODCountryID;
                objCVarRoutings.POD = objCOperations.lstCVarOperations[i].POD;
                objCVarRoutings.ETAPOLDate = DateTime.Parse("01-01-1900");
                objCVarRoutings.ATAPOLDate = DateTime.Parse("01-01-1900");
                objCVarRoutings.ExpectedDeparture = DateTime.Parse("01-01-1900");
                objCVarRoutings.ActualDeparture = DateTime.Parse("01-01-1900");
                objCVarRoutings.ExpectedArrival = DateTime.Parse("01-01-1900");
                objCVarRoutings.ActualArrival = DateTime.Parse("01-01-1900");
                objCVarRoutings.VesselID = 0;
                objCVarRoutings.VoyageOrTruckNumber = "0";
                objCVarRoutings.RoadNumber = "0";
                objCVarRoutings.DeliveryOrderNumber = "0";
                objCVarRoutings.WareHouse = "0";
                objCVarRoutings.WareHouseLocation = "0";
                objCVarRoutings.Notes = "";

                objCVarRoutings.ShippingLineID = objCOperations.lstCVarOperations[i].ShippingLineID;
                objCVarRoutings.AirlineID = objCOperations.lstCVarOperations[i].AirlineID;
                objCVarRoutings.TruckerID = objCOperations.lstCVarOperations[i].TruckerID;

                objCVarRoutings.GensetSupplierID = 0;
                objCVarRoutings.CCAID = 0;
                objCVarRoutings.Quantity = "0";
                objCVarRoutings.ContactPerson = "0";
                objCVarRoutings.PickupAddress = "0";
                objCVarRoutings.DeliveryAddress = "0";
                objCVarRoutings.GateInPortID = 0;
                objCVarRoutings.GateOutPortID = 0;
                objCVarRoutings.GateInDate = DateTime.Parse("01/01/1900");

                #region TransportOrder
                objCVarRoutings.CustomerID = 0;
                objCVarRoutings.SubContractedCustomerID = 0;
                objCVarRoutings.Cost = 0;
                objCVarRoutings.Sale = 0;
                objCVarRoutings.IsFleet = false;
                objCVarRoutings.CommodityID = 0;
                objCVarRoutings.LoadingDate = DateTime.Parse("01/01/1900");
                objCVarRoutings.LoadingReference = "0";
                objCVarRoutings.UnloadingDate = DateTime.Parse("01/01/1900");
                objCVarRoutings.UnloadingReference = "0";
                objCVarRoutings.UnloadingTime = "0";
                #endregion TransportOrder

                objCVarRoutings.GateOutDate = DateTime.Parse("01/01/1900");
                objCVarRoutings.StuffingDate = DateTime.Parse("01/01/1900");
                objCVarRoutings.DeliveryDate = DateTime.Parse("01/01/1900");
                objCVarRoutings.BookingNumber = "0";
                objCVarRoutings.Delays = "0";
                objCVarRoutings.DriverName = "0";
                objCVarRoutings.DriverPhones = "0";
                objCVarRoutings.PowerFromGateInTillActualSailing = "0";

                objCVarRoutings.ContactPersonPhones = "0";
                objCVarRoutings.LoadingTime = "0";

                #region CustomsClearance
                objCVarRoutings.CCAFreight = 0;
                objCVarRoutings.CCAFOB = 0;
                objCVarRoutings.CCACFValue = 0;
                objCVarRoutings.CCAInvoiceNumber = "0";

                objCVarRoutings.CCAInsurance = "0";
                objCVarRoutings.CCADischargeValue = "0";
                objCVarRoutings.CCAAcceptedValue = "0";
                objCVarRoutings.CCAImportValue = "0";
                objCVarRoutings.CCADocumentReceiveDate = DateTime.Parse("01/01/1900");
                objCVarRoutings.CCAExchangeRate = "0";
                objCVarRoutings.CCAVATCertificateNumber = "0";
                objCVarRoutings.CCAVATCertificateValue = "0";
                objCVarRoutings.CCACommercialProfitCertificateNumber = "0";
                objCVarRoutings.CCAWindowFees = "0";
                objCVarRoutings.CCAStorageFees = "0";
                objCVarRoutings.CCACommercialProfitTax = "0";
                objCVarRoutings.CCACustomsValue = "0";
                objCVarRoutings.CCAQuotedValue = "0";
                objCVarRoutings.CCAContractType = "0";
                objCVarRoutings.CCAOthers = "0";
                objCVarRoutings.CCASpendDate = DateTime.Parse("01/01/1900");
                objCVarRoutings.OffloadingDate = DateTime.Parse("01/01/1900");

                objCVarRoutings.CertificateNumber = "0";
                objCVarRoutings.CertificateValue = "0";
                objCVarRoutings.CertificateDate = DateTime.Parse("01/01/1900");
                objCVarRoutings.QasimaNumber = "0";
                objCVarRoutings.QasimaDate = DateTime.Parse("01/01/1900");
                objCVarRoutings.Match = false;
                objCVarRoutings.SalesDateReceived = DateTime.Parse("01/01/1900");
                objCVarRoutings.CommerceDateReceived = DateTime.Parse("01/01/1900");
                objCVarRoutings.InspectionDateReceived = DateTime.Parse("01/01/1900");
                objCVarRoutings.FinishDateReceived = DateTime.Parse("01/01/1900");
                objCVarRoutings.SalesDateDelivered = DateTime.Parse("01/01/1900");
                objCVarRoutings.CommerceDateDelivered = DateTime.Parse("01/01/1900");
                objCVarRoutings.InspectionDateDelivered = DateTime.Parse("01/01/1900");
                objCVarRoutings.FinishDateDelivered = DateTime.Parse("01/01/1900");

                objCVarRoutings.CCAllowTemporaryDelivered = DateTime.Parse("01/01/1900");
                objCVarRoutings.CCAllowTemporaryReceived = DateTime.Parse("01/01/1900");
                objCVarRoutings.CCDropBackDelivered = DateTime.Parse("01/01/1900");
                objCVarRoutings.CCDropBackReceived = DateTime.Parse("01/01/1900");
                objCVarRoutings.CC_ClearanceTypeID = 0;
                objCVarRoutings.CC_CustomItemsID = 0;
                objCVarRoutings.CCReleaseNo = "0";
                objCVarRoutings.CCMainWarehouseID = 0;
                objCVarRoutings.CCWarehouseATD = DateTime.Parse("01/01/1900");
                objCVarRoutings.CCWarehouseETA = DateTime.Parse("01/01/1900");
                objCVarRoutings.CCIsDone = false;



                #endregion CustomsClearance

                objCVarRoutings.BillNumber = "0";
                objCVarRoutings.TruckingOrderCode = "0";
                objCVarRoutings.CustomerWarehouseManagerName = "0";
                objCVarRoutings.CustomerWarehouseManagerPhone = "0";
                objCVarRoutings.TruckingEquipmentID = 0;
                objCVarRoutings.ConcedeCompanyName = "";
                objCVarRoutings.ConcedeNumber = "";
                objCVarRoutings.ConcedeQty = 0;
                objCVarRoutings.ConcedeTotalQty = 0;
                objCVarRoutings.WarehouseID = 0;


                objCVarRoutings.CreatorUserID = objCVarRoutings.ModificatorUserID = WebSecurity.CurrentUserId;
                objCVarRoutings.ModificationDate = objCVarRoutings.CreationDate = DateTime.Now;
				Common.Common.ReplaceNull(objCVarRoutings);
				objCRoutings.lstCVarRoutings.Add(objCVarRoutings);
                checkException = objCRoutings.SaveMethod(objCRoutings.lstCVarRoutings);
            }
            checkException = objCvwRoutings.GetListPaging(99999, 1, "WHERE OperationID=" + pOperationIDToRestoreRoute.ToString(), "RoutingTypeID", out _RowCount);
            #endregion insert missing routes
            return new object[] {
                new JavaScriptSerializer().Serialize(objCvwRoutings.lstCVarvwRoutings)
            };
        }

        [HttpGet, HttpPost]
        public object AddVesselFromRoutings(string pCode, string pName, string pLocalName, string pNotes)
        {
            Int32 pVesselID = 0;
            Exception checkException = null;
            CVessels objCVessels = new CVessels();
            CVarVessels objCVarVessels = new CVarVessels();

            objCVarVessels.Code = pCode;
            objCVarVessels.Name = pName;
            objCVarVessels.LocalName = pLocalName;

            objCVarVessels.Notes = pNotes;
            objCVarVessels.CallSign = "0";
            objCVarVessels.ShippingLineID = 0;
            objCVarVessels.IsInactive = false;
            objCVarVessels.TimeLocked = DateTime.Parse("01-01-1900");
            objCVarVessels.LockingUserID = 0;
            objCVarVessels.CreatorUserID = objCVarVessels.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarVessels.CreationDate = objCVarVessels.ModificationDate = DateTime.Now;

            objCVessels.lstCVarVessels.Add(objCVarVessels);
            checkException = objCVessels.SaveMethod(objCVessels.lstCVarVessels);
            if (checkException == null)
            {
                pVesselID = objCVarVessels.ID;
                objCVessels.GetList("ORDER BY Name");
            }
            return new object[] {
                pVesselID
                , new JavaScriptSerializer().Serialize(objCVessels.lstCVarVessels)
            };
        }

        [HttpGet, HttpPost]
        public object[] FillRoutingModal(Int64 pRouteIDToFillModal, Int64 pOperationID)
        {
            string _ReturnedMessage = "";
            int _RowCount = 0;
            Exception checkException = null;

            CvwOperations objCvwOperations = new CvwOperations();
            CvwRoutings objCvwRoutings = new CvwRoutings();
            CvwQuotationRoute objCvwQuotationRoute = new CvwQuotationRoute();
            CvwPayables objCvwPayables = new CvwPayables();

            checkException = objCvwOperations.GetListPaging(999999, 1, "WHERE ID=" + pOperationID, "ID", out _RowCount);
            if (pRouteIDToFillModal > 0)
            {
                checkException = objCvwRoutings.GetListPaging(999999, 1, "WHERE ID=" + pRouteIDToFillModal, "ID", out _RowCount);
                //checkException = objCvwQuotationRoute.GetListPaging(999999, 1, "WHERE IsFleet=1 AND CommodityID=" + objCvwRoutings.lstCVarvwRoutings[0].CommodityID + " AND QuotationID=" + objCvwRoutings.lstCVarvwRoutings[0].QuotationID, "POLName,PODName", out _RowCount);
                checkException = objCvwQuotationRoute.GetListPaging(999999, 1, "WHERE IsFleet=1 AND QuotationID=" + objCvwRoutings.lstCVarvwRoutings[0].QuotationID, "POLName,PODName", out _RowCount);
                checkException = objCvwPayables.GetListPaging(999999, 1, "WHERE TruckingOrderID=" + pRouteIDToFillModal, "ID", out _RowCount);
            }
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[]
            {
                _ReturnedMessage
                , serializer.Serialize(objCvwOperations.lstCVarvwOperations[0]) //pData[1]
                , pRouteIDToFillModal == 0 ? null : serializer.Serialize(objCvwRoutings.lstCVarvwRoutings[0]) //pData[2]
                , pRouteIDToFillModal == 0 ? null : serializer.Serialize(objCvwQuotationRoute.lstCVarvwQuotationRoute) //pData[3]
                , pRouteIDToFillModal == 0 ? null : serializer.Serialize(objCvwPayables.lstCVarvwPayables) //pData[4]
            };
        }

        [HttpGet, HttpPost]
        public object[] Copy(Int64 pRoutingIDToCopy, bool pIsCopyPayables)
        { // pNumberOfHousesConnected: used in the controller to be compared to NumberOfHousesConnected retrieved from DB at time of save to handle other sessions changes
            string strMessageReturned = "";
            //int MainCarraigeID = 30;
            //int TruckingOrderRoutingTypeID = 60;
            Exception checkException = null;
            int _RowCount = 0;
            CRoutings objCRoutings = new CRoutings();
            CVarRoutings objCVarRoutings = new CVarRoutings();
            checkException = objCRoutings.GetListPaging(1, 1, "WHERE ID=" + pRoutingIDToCopy, "ID", out _RowCount);
            //CvwDefaults objCvwDefaults = new CvwDefaults();
            //objCvwDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount); //i am sure i ve just one row isa

            {
                objCVarRoutings.RoadNumber = objCRoutings.lstCVarRoutings[0].RoadNumber;
                objCVarRoutings.DeliveryOrderNumber = objCRoutings.lstCVarRoutings[0].DeliveryOrderNumber;
                objCVarRoutings.WareHouse = objCRoutings.lstCVarRoutings[0].WareHouse;
                objCVarRoutings.WareHouseLocation = objCRoutings.lstCVarRoutings[0].WareHouseLocation;

                objCVarRoutings.RoutingTypeID = objCRoutings.lstCVarRoutings[0].RoutingTypeID;
                objCVarRoutings.OperationID = objCRoutings.lstCVarRoutings[0].OperationID;
                objCVarRoutings.TransportType = objCRoutings.lstCVarRoutings[0].TransportType;
                objCVarRoutings.TransportIconName = objCRoutings.lstCVarRoutings[0].TransportIconName;
                objCVarRoutings.TransportIconStyle = objCRoutings.lstCVarRoutings[0].TransportIconStyle;
                objCVarRoutings.POLCountryID = objCRoutings.lstCVarRoutings[0].POLCountryID;
                objCVarRoutings.PODCountryID = objCRoutings.lstCVarRoutings[0].PODCountryID;
                objCVarRoutings.POL = objCRoutings.lstCVarRoutings[0].POL;
                objCVarRoutings.POD = objCRoutings.lstCVarRoutings[0].POD;

                objCVarRoutings.ETAPOLDate = objCRoutings.lstCVarRoutings[0].ETAPOLDate;
                objCVarRoutings.ATAPOLDate = objCRoutings.lstCVarRoutings[0].ATAPOLDate;
                objCVarRoutings.ExpectedArrival = objCRoutings.lstCVarRoutings[0].ExpectedArrival;
                objCVarRoutings.ExpectedDeparture = objCRoutings.lstCVarRoutings[0].ExpectedDeparture;
                objCVarRoutings.ActualArrival = objCRoutings.lstCVarRoutings[0].ActualArrival;
                objCVarRoutings.ActualDeparture = objCRoutings.lstCVarRoutings[0].ActualDeparture;

                objCVarRoutings.ShippingLineID = objCRoutings.lstCVarRoutings[0].ShippingLineID;
                objCVarRoutings.AirlineID = objCRoutings.lstCVarRoutings[0].AirlineID;
                objCVarRoutings.TruckerID = objCRoutings.lstCVarRoutings[0].TruckerID;
                objCVarRoutings.VesselID = objCRoutings.lstCVarRoutings[0].VesselID;
                objCVarRoutings.VoyageOrTruckNumber = objCRoutings.lstCVarRoutings[0].VoyageOrTruckNumber;
                objCVarRoutings.TransientTime = objCRoutings.lstCVarRoutings[0].TransientTime;
                objCVarRoutings.Validity = objCRoutings.lstCVarRoutings[0].Validity;
                objCVarRoutings.FreeTime = objCRoutings.lstCVarRoutings[0].FreeTime;
                objCVarRoutings.Notes = objCRoutings.lstCVarRoutings[0].Notes;

                objCVarRoutings.GensetSupplierID = objCRoutings.lstCVarRoutings[0].GensetSupplierID;
                objCVarRoutings.CCAID = objCRoutings.lstCVarRoutings[0].CCAID;
                objCVarRoutings.Quantity = objCRoutings.lstCVarRoutings[0].Quantity;
                objCVarRoutings.ContactPerson = objCRoutings.lstCVarRoutings[0].ContactPerson;
                objCVarRoutings.PickupAddress = objCRoutings.lstCVarRoutings[0].PickupAddress;
                objCVarRoutings.DeliveryAddress = objCRoutings.lstCVarRoutings[0].DeliveryAddress;
                objCVarRoutings.GateInPortID = objCRoutings.lstCVarRoutings[0].GateInPortID;
                objCVarRoutings.GateOutPortID = objCRoutings.lstCVarRoutings[0].GateOutPortID;
                objCVarRoutings.GateInDate = objCRoutings.lstCVarRoutings[0].GateInDate;

                #region TransportOrder
                objCVarRoutings.CustomerID = objCRoutings.lstCVarRoutings[0].CustomerID;
                objCVarRoutings.SubContractedCustomerID = objCRoutings.lstCVarRoutings[0].SubContractedCustomerID;
                objCVarRoutings.Cost = objCRoutings.lstCVarRoutings[0].Cost;
                objCVarRoutings.Sale = objCRoutings.lstCVarRoutings[0].Sale;
                objCVarRoutings.IsFleet = objCRoutings.lstCVarRoutings[0].IsFleet;
                objCVarRoutings.CommodityID = objCRoutings.lstCVarRoutings[0].CommodityID;
                objCVarRoutings.LoadingDate = objCRoutings.lstCVarRoutings[0].LoadingDate;
                objCVarRoutings.LoadingReference = objCRoutings.lstCVarRoutings[0].LoadingReference;
                objCVarRoutings.UnloadingDate = objCRoutings.lstCVarRoutings[0].UnloadingDate;
                objCVarRoutings.UnloadingTime = objCRoutings.lstCVarRoutings[0].UnloadingTime;
                objCVarRoutings.UnloadingReference = objCRoutings.lstCVarRoutings[0].UnloadingReference;
                objCVarRoutings.QuotationRouteID = objCRoutings.lstCVarRoutings[0].QuotationRouteID;
                #endregion TransportOrder

                objCVarRoutings.GateOutDate = objCRoutings.lstCVarRoutings[0].GateOutDate;
                objCVarRoutings.StuffingDate = objCRoutings.lstCVarRoutings[0].StuffingDate;
                objCVarRoutings.DeliveryDate = objCRoutings.lstCVarRoutings[0].DeliveryDate;
                objCVarRoutings.BookingNumber = objCRoutings.lstCVarRoutings[0].BookingNumber;
                objCVarRoutings.Delays = objCRoutings.lstCVarRoutings[0].Delays;
                objCVarRoutings.DriverName = objCRoutings.lstCVarRoutings[0].DriverName;
                objCVarRoutings.DriverPhones = objCRoutings.lstCVarRoutings[0].DriverPhones;
                objCVarRoutings.PowerFromGateInTillActualSailing = objCRoutings.lstCVarRoutings[0].PowerFromGateInTillActualSailing;
                objCVarRoutings.ContactPersonPhones = objCRoutings.lstCVarRoutings[0].ContactPersonPhones;
                objCVarRoutings.LoadingTime = objCRoutings.lstCVarRoutings[0].LoadingTime;

                #region CustomsClearance
                objCVarRoutings.CCAFreight = objCRoutings.lstCVarRoutings[0].CCAFreight;
                objCVarRoutings.CCAFOB = objCRoutings.lstCVarRoutings[0].CCAFOB;
                objCVarRoutings.CCACFValue = objCRoutings.lstCVarRoutings[0].CCACFValue;
                objCVarRoutings.CCAInvoiceNumber = objCRoutings.lstCVarRoutings[0].CCAInvoiceNumber;

                objCVarRoutings.CCAInsurance = objCRoutings.lstCVarRoutings[0].CCAInsurance;
                objCVarRoutings.CCADischargeValue = objCRoutings.lstCVarRoutings[0].CCADischargeValue;
                objCVarRoutings.CCAAcceptedValue = objCRoutings.lstCVarRoutings[0].CCAAcceptedValue;
                objCVarRoutings.CCAImportValue = objCRoutings.lstCVarRoutings[0].CCAImportValue;
                objCVarRoutings.CCADocumentReceiveDate = objCRoutings.lstCVarRoutings[0].CCADocumentReceiveDate;
                objCVarRoutings.CCAExchangeRate = objCRoutings.lstCVarRoutings[0].CCAExchangeRate;
                objCVarRoutings.CCAVATCertificateNumber = objCRoutings.lstCVarRoutings[0].CCAVATCertificateNumber;
                objCVarRoutings.CCAVATCertificateValue = objCRoutings.lstCVarRoutings[0].CCAVATCertificateValue;
                objCVarRoutings.CCACommercialProfitCertificateNumber = objCRoutings.lstCVarRoutings[0].CCACommercialProfitCertificateNumber;
                objCVarRoutings.CCAWindowFees = objCRoutings.lstCVarRoutings[0].CCAWindowFees;
                objCVarRoutings.CCAStorageFees = objCRoutings.lstCVarRoutings[0].CCAStorageFees;
                objCVarRoutings.CCACommercialProfitTax = objCRoutings.lstCVarRoutings[0].CCACommercialProfitTax;
                objCVarRoutings.CCACustomsValue = objCRoutings.lstCVarRoutings[0].CCACustomsValue;
                objCVarRoutings.CCAQuotedValue = objCRoutings.lstCVarRoutings[0].CCAQuotedValue;
                objCVarRoutings.CCAContractType = objCRoutings.lstCVarRoutings[0].CCAContractType;
                objCVarRoutings.CCAOthers = objCRoutings.lstCVarRoutings[0].CCAOthers;
                objCVarRoutings.CCASpendDate = objCRoutings.lstCVarRoutings[0].CCASpendDate;
                objCVarRoutings.OffloadingDate = objCRoutings.lstCVarRoutings[0].OffloadingDate;

                objCVarRoutings.CertificateNumber = objCRoutings.lstCVarRoutings[0].CertificateNumber;
                objCVarRoutings.CertificateValue = objCRoutings.lstCVarRoutings[0].CertificateValue;
                objCVarRoutings.CertificateDate = objCRoutings.lstCVarRoutings[0].CertificateDate;
                objCVarRoutings.QasimaNumber = objCRoutings.lstCVarRoutings[0].QasimaNumber;
                objCVarRoutings.QasimaDate = objCRoutings.lstCVarRoutings[0].QasimaDate;
                objCVarRoutings.Match = false;
                objCVarRoutings.SalesDateReceived = objCRoutings.lstCVarRoutings[0].SalesDateReceived;
                objCVarRoutings.CommerceDateReceived = objCRoutings.lstCVarRoutings[0].CommerceDateReceived;
                objCVarRoutings.InspectionDateReceived = objCRoutings.lstCVarRoutings[0].InspectionDateReceived;
                objCVarRoutings.FinishDateReceived = objCRoutings.lstCVarRoutings[0].FinishDateReceived;
                objCVarRoutings.SalesDateDelivered = objCRoutings.lstCVarRoutings[0].SalesDateDelivered;
                objCVarRoutings.CommerceDateDelivered = objCRoutings.lstCVarRoutings[0].CommerceDateDelivered;
                objCVarRoutings.InspectionDateDelivered = objCRoutings.lstCVarRoutings[0].InspectionDateDelivered;
                objCVarRoutings.FinishDateDelivered = objCRoutings.lstCVarRoutings[0].FinishDateDelivered;







                #endregion CustomsClearance

                objCVarRoutings.CreatorUserID = objCVarRoutings.ModificatorUserID = WebSecurity.CurrentUserId;
                objCVarRoutings.CreationDate = objCVarRoutings.ModificationDate = DateTime.Now;

                objCVarRoutings.IsOwnedByCompany = objCRoutings.lstCVarRoutings[0].IsOwnedByCompany;
                objCVarRoutings.IsLoaded = objCRoutings.lstCVarRoutings[0].IsLoaded;
                objCVarRoutings.TrailerID = objCRoutings.lstCVarRoutings[0].TrailerID;
                objCVarRoutings.DriverID = objCRoutings.lstCVarRoutings[0].DriverID;
                objCVarRoutings.DriverAssistantID = objCRoutings.lstCVarRoutings[0].DriverAssistantID;

                objCVarRoutings.EquipmentID = objCRoutings.lstCVarRoutings[0].EquipmentID;
                objCVarRoutings.LoadingZoneID = objCRoutings.lstCVarRoutings[0].LoadingZoneID;
                objCVarRoutings.FirstCuringAreaID = objCRoutings.lstCVarRoutings[0].FirstCuringAreaID;
                objCVarRoutings.SecondCuringAreaID = objCRoutings.lstCVarRoutings[0].SecondCuringAreaID;
                objCVarRoutings.ThirdCuringAreaID = objCRoutings.lstCVarRoutings[0].ThirdCuringAreaID;
                objCVarRoutings.BillNumber = objCRoutings.lstCVarRoutings[0].BillNumber;
                objCVarRoutings.TruckingOrderCode = objCRoutings.lstCVarRoutings[0].TruckingOrderCode;
                objCVarRoutings.TruckCounter = 0; //objCRoutings.lstCVarRoutings[0].TruckCounter;
                objCVarRoutings.CargoReturnGrossWeight = objCRoutings.lstCVarRoutings[0].CargoReturnGrossWeight;
                objCVarRoutings.LastTruckCounter = 0; //objCRoutings.lstCVarRoutings[0].LastTruckCounter;
                objCVarRoutings.MaxSupplierContainers = objCRoutings.lstCVarRoutings[0].MaxSupplierContainers;
                objCVarRoutings.ConcedeCompanyName = "";
                objCVarRoutings.ConcedeNumber = "";
                objCVarRoutings.ConcedeQty = 0;
                objCVarRoutings.ConcedeTotalQty = 0;
                objCVarRoutings.WarehouseID = 0;



                objCVarRoutings.CCAllowTemporaryDelivered = objCRoutings.lstCVarRoutings[0].CCAllowTemporaryDelivered;
                objCVarRoutings.CCAllowTemporaryReceived = objCRoutings.lstCVarRoutings[0].CCAllowTemporaryReceived;
                objCVarRoutings.CCDropBackDelivered = objCRoutings.lstCVarRoutings[0].CCDropBackDelivered;
                objCVarRoutings.CCDropBackReceived = objCRoutings.lstCVarRoutings[0].CCDropBackReceived;
                objCVarRoutings.CC_ClearanceTypeID = objCRoutings.lstCVarRoutings[0].CC_ClearanceTypeID;
                objCVarRoutings.CC_CustomItemsID = objCRoutings.lstCVarRoutings[0].CC_CustomItemsID;
                objCVarRoutings.CCReleaseNo = objCRoutings.lstCVarRoutings[0].CCReleaseNo;
                objCVarRoutings.TruckingEquipmentID = objCRoutings.lstCVarRoutings[0].TruckingEquipmentID;
				Common.Common.ReplaceNull(objCVarRoutings);
				CRoutings objCRoutings_New = new CRoutings();
                objCRoutings_New.lstCVarRoutings.Add(objCVarRoutings);
                checkException = objCRoutings_New.SaveMethod(objCRoutings_New.lstCVarRoutings);

                if (checkException != null) // an exception is caught in the model
                {
                    strMessageReturned = checkException.Message;
                    #region set TruckCounter of IsOwnedByCompany
                    if (objCVarRoutings.IsOwnedByCompany && objCVarRoutings.EquipmentID != 0)
                    {
                        checkException = objCRoutings.UpdateList("LastTruckCounter=SELECT MAX(TruckCounter) FROM Routings WHERE EquipmentID=" + objCRoutings.lstCVarRoutings[0].EquipmentID);
                    }
                    #endregion set TruckCounter of IsOwnedByCompany
                }
                else if (pIsCopyPayables)
                {
                    CPayables objCOriginalPayables = new CPayables();
                    checkException = objCOriginalPayables.GetListPaging(999999, 1, "WHERE TruckingOrderID=" + pRoutingIDToCopy, "ID", out _RowCount);
                    for (int i = 0; i < objCOriginalPayables.lstCVarPayables.Count; i++)
                    {
                        CVarPayables objCVarPayables = new CVarPayables();
                        objCVarPayables.GeneratingQRID = objCOriginalPayables.lstCVarPayables[i].GeneratingQRID;
                        objCVarPayables.ApprovingUserID = 0;
                        objCVarPayables.CustodyID = 0;
                        objCVarPayables.SupplierReceiptNo = "0";
                        objCVarPayables.PaidAmount = 0;
                        objCVarPayables.RemainingAmount = objCOriginalPayables.lstCVarPayables[i].RemainingAmount;
                        objCVarPayables.AccNoteID = 0;
                        objCVarPayables.JVID = 0;
                        objCVarPayables.JVID2 = 0;
                        objCVarPayables.TransactionID = objCOriginalPayables.lstCVarPayables[i].TransactionID;
                        objCVarPayables.QuotationCost = objCOriginalPayables.lstCVarPayables[i].QuotationCost;
                        objCVarPayables.IsNeglectLimit = objCOriginalPayables.lstCVarPayables[i].IsNeglectLimit;
                        objCVarPayables.OfficialAmountPaid = 0;
                        objCVarPayables.PricingID = 0;
                        objCVarPayables.OperationVehicleID = 0;
                        objCVarPayables.TruckingOrderID = objCVarRoutings.ID;
                        objCVarPayables.OperationContainersAndPackagesID = 0;

                        objCVarPayables.ID = 0;
                        objCVarPayables.OperationID = objCOriginalPayables.lstCVarPayables[i].OperationID;
                        objCVarPayables.ChargeTypeID = objCOriginalPayables.lstCVarPayables[i].ChargeTypeID;
                        objCVarPayables.POrC = objCOriginalPayables.lstCVarPayables[i].POrC;
                        objCVarPayables.ContainerTypeID = 0;
                        objCVarPayables.MeasurementID = objCOriginalPayables.lstCVarPayables[i].MeasurementID;
                        objCVarPayables.SupplierOperationPartnerID = objCOriginalPayables.lstCVarPayables[i].SupplierOperationPartnerID;
                        objCVarPayables.Quantity = objCOriginalPayables.lstCVarPayables[i].Quantity;
                        objCVarPayables.CostPrice = objCOriginalPayables.lstCVarPayables[i].CostPrice;

                        objCVarPayables.AmountWithoutVAT = objCOriginalPayables.lstCVarPayables[i].AmountWithoutVAT;
                        objCVarPayables.TaxTypeID = objCOriginalPayables.lstCVarPayables[i].TaxTypeID;
                        objCVarPayables.TaxPercentage = objCOriginalPayables.lstCVarPayables[i].TaxPercentage;
                        objCVarPayables.TaxAmount = objCOriginalPayables.lstCVarPayables[i].TaxAmount;
                        objCVarPayables.DiscountTypeID = objCOriginalPayables.lstCVarPayables[i].DiscountTypeID;
                        objCVarPayables.DiscountPercentage = objCOriginalPayables.lstCVarPayables[i].DiscountPercentage;
                        objCVarPayables.DiscountAmount = objCOriginalPayables.lstCVarPayables[i].DiscountAmount;

                        objCVarPayables.CostAmount = objCOriginalPayables.lstCVarPayables[i].CostAmount; //total w VAT and Discount
                        objCVarPayables.InitialSalePrice = objCOriginalPayables.lstCVarPayables[i].InitialSalePrice;
                        objCVarPayables.SupplierInvoiceNo = "0";
                        objCVarPayables.SupplierReceiptNo = "0";
                        objCVarPayables.EntryDate = DateTime.Now;
                        objCVarPayables.BillID = 0;
                        objCVarPayables.IssueDate = DateTime.Now;

                        objCVarPayables.ExchangeRate = objCOriginalPayables.lstCVarPayables[i].ExchangeRate;
                        objCVarPayables.CurrencyID = objCOriginalPayables.lstCVarPayables[i].CurrencyID;
                        objCVarPayables.BillTo = 0;
                        objCVarPayables.Notes = "Copied from trucking order " + objCRoutings.lstCVarRoutings[0].TruckingOrderCode;
                        objCVarPayables.IsOfficial = false;
                        objCVarPayables.IsQuotationApproval = false;
                        objCVarPayables.ApprovePendingValue = 0;
                        objCVarPayables.crmCode = "";

                        objCVarPayables.CreatorUserID = objCVarPayables.ModificatorUserID = WebSecurity.CurrentUserId;
                        objCVarPayables.CreationDate = objCVarPayables.ModificationDate = DateTime.Now;

                        objCVarPayables.SupplierSiteID = objCOriginalPayables.lstCVarPayables[i].SupplierSiteID;
                        objCVarPayables.IsPurchased = false;

                        CPayables objCPayables = new CPayables();
                        objCPayables.lstCVarPayables.Add(objCVarPayables);
                        checkException = objCPayables.SaveMethod(objCPayables.lstCVarPayables);

                    }
                }
            }

            //Forwarding.MvcApp.Controllers.Operations.API_Operations.OperationsController.Operations_EmailNotification(objCRoutings.lstCVarRoutings[0].OperationID);

            #region GET Returned Data
            CvwRoutings objCvwRoutings_SavedRoute = new CvwRoutings();
            int _tempRowCount = 0;
            checkException = objCvwRoutings_SavedRoute.GetListPaging(999999, 1, "WHERE ID=" + objCVarRoutings.ID, "ViewOrder", out _tempRowCount);
            //checkException = objCvwRoutings.GetListPaging(999999, 1, "WHERE OperationID=" + objCRoutings.lstCVarRoutings[0].OperationID, "ViewOrder", out _tempRowCount);
            #endregion GET Returned Data
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                strMessageReturned
                , new JavaScriptSerializer().Serialize(objCvwRoutings_SavedRoute.lstCVarvwRoutings[0]) //pSavedRoute=pData[1]
            };
        }

        [HttpGet, HttpPost]
        public object[] RoutingsCC_PrintRequest(Int64 pRoutingIDCCToPrint)
        {
            string _ReturnedMessage = "";
            int _RowCount = 0;
            Exception checkException = null;
            CvwRoutings objCvwRoutings_CC = new CvwRoutings();
            CvwOperations objCvwOperations = new CvwOperations();
            CvwCustomClearanceTracking objCvwCustomClearanceTracking = new CvwCustomClearanceTracking();

            checkException = objCvwRoutings_CC.GetListPaging(1, 1, "WHERE ID=" + pRoutingIDCCToPrint, "ID", out _RowCount);
            checkException = objCvwCustomClearanceTracking.GetListPaging(1, 1, "WHERE CustomClearanceRoutingID=" + pRoutingIDCCToPrint, "ID", out _RowCount);
            checkException = objCvwOperations.GetListPaging(1, 1, "WHERE ID=" + objCvwRoutings_CC.lstCVarvwRoutings[0].OperationID, "ID", out _RowCount);
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                _ReturnedMessage
                , serializer.Serialize(objCvwRoutings_CC.lstCVarvwRoutings[0]) //pData[1]
                , serializer.Serialize(objCvwOperations.lstCVarvwOperations[0]) //pData[2]
                , serializer.Serialize(objCvwCustomClearanceTracking.lstCVarvwCustomClearanceTracking) //pData[3]
            };
        }

        [HttpGet, HttpPost]
        public Task<HttpResponseMessage> GetLog(int pID, string pTableName)
        {

            var stream = Logging.GetList<CVarvwRoutings, vwRoutingsLog>(pID, pTableName);

            HttpResponseMessage httpResponseMessage = CreateResponse.Create(stream);

            return Task.FromResult(httpResponseMessage);
        }
        Exception CheckBookingNo(long pOprationID, string pBookingNo, string pCompanyName = "")
        {
            if (string.IsNullOrWhiteSpace(pCompanyName))
            {
                CDefaults objCDefaults = new CDefaults();
                objCDefaults.GetList($" where ID = (select IsNull(Max(ID),0) from Defaults) ");
                pCompanyName = objCDefaults.lstCVarDefaults[0].UnEditableCompanyName;
            }
            if (pCompanyName != "ELI")
            {
                return null;
            }
            if (string.IsNullOrWhiteSpace(pBookingNo) || pBookingNo == "0")
            {
                return null;
            }
            var objCvwRoutings = new CvwRoutings();
            var exception = objCvwRoutings.GetList($" where BookingNumber = '{pBookingNo}' and OperationID <> {pOprationID} ");
            if (objCvwRoutings.lstCVarvwRoutings.Count > 0)
                return new Exception($" Booking No Exist In Operation Routing {objCvwRoutings.lstCVarvwRoutings[0].OperationSerial} ");
            return null;
        }
		[HttpGet]
		public object CopyTruckOrder(int pID)
		{
			var copied = false;
			CRoutings objCRoutings = new CRoutings();
			var ex = objCRoutings.GetList($"where ID={pID} and RoutingTypeID=60");
			if(objCRoutings.lstCVarRoutings.Count>0)
			{
				objCRoutings.lstCVarRoutings[0].ID = 0;
				objCRoutings.lstCVarRoutings[0].CreationDate= objCRoutings.lstCVarRoutings[0].ModificationDate  = DateTime.Now;
				objCRoutings.lstCVarRoutings[0].CreatorUserID= objCRoutings.lstCVarRoutings[0].ModificatorUserID = WebSecurity.CurrentUserId;
				ex = objCRoutings.SaveMethod(objCRoutings.lstCVarRoutings);
				copied = ex == null;
				if(copied)
				{
					CvwRoutings objCvwRoutings = new CvwRoutings();
					objCvwRoutings.GetList($"where OperationID={objCRoutings.lstCVarRoutings[0].OperationID}");
					return new { Copied = copied, Body = new JavaScriptSerializer().Serialize(objCvwRoutings.lstCVarvwRoutings) };
				}
			}
			return new { Copied = copied,Body=ex };
		}

		[HttpGet]
		public object LoadPickupAddresses()
		{
			CRoutings objCRoutings = new CRoutings();
			objCRoutings.GetList($"where ISNULL(PickupAddress,'')<>'' and RoutingTypeID=60");
			JavaScriptSerializer serializer = new JavaScriptSerializer { MaxJsonLength = int.MaxValue };
			return objCRoutings.lstCVarRoutings.Count==0 ? serializer.Serialize(objCRoutings.lstCVarRoutings) : serializer.Serialize(objCRoutings.lstCVarRoutings.Select(a => a.PickupAddress).Distinct());
		}
	}
    public class InsertRoutingData
    {
        public Int32 pRoutingTypeID { get; set; }
        public Int64 pOperationID { get; set; }
        public Int32 pTransportTypeID { get; set; }
        public string pTransportIconName { get; set; }
        public string pTransportIconStyle { get; set; }
        public int pPOLCountryID { get; set; }
        public int pPODCountryID { get; set; }
        public int pPOLID { get; set; }
        public int pPODID { get; set; }
        public DateTime pETAPOLDate { get; set; }
        public DateTime pATAPOLDate { get; set; }
        public DateTime pExpectedArrival { get; set; }
        public DateTime pExpectedDeparture { get; set; }
        public DateTime pActualArrival { get; set; }
        public DateTime pActualDeparture { get; set; }
        public int pShippingLineID { get; set; }
        public int pAirlineID { get; set; }
        public int pTruckerID { get; set; }
        public int pVesselID { get; set; }
        public string pVoyageOrTruckNumber { get; set; }
        public Int32 pTransientTime { get; set; }
        public Int32 pValidity { get; set; }
        public Int32 pFreeTime { get; set; }
        public string pNotes { get; set; }
        //TruckingOrderFields
        public Int32 pGensetSupplierID { get; set; }
        public Int32 pCCAID { get; set; }
        public string pQuantity { get; set; }
        public string pContactPerson { get; set; }
        public string pPickupAddress { get; set; }
        public string pDeliveryAddress { get; set; }
        public Int32 pGateInPortID { get; set; }
        public Int32 pGateOutPortID { get; set; }
        public DateTime pGateInDate { get; set; }

        #region TransportOrder
        public Int32 pCustomerID { get; set; }
        public Int32 pSubContractedCustomerID { get; set; }
        public decimal pCost { get; set; }
        public decimal pSale { get; set; }
        public bool pIsFleet { get; set; }
        public Int32 pCommodityID { get; set; }
        public DateTime pLoadingDate { get; set; }
        public string pLoadingReference { get; set; }
        public DateTime pUnloadingDate { get; set; }
        public string pUnloadingReference { get; set; }
        public string pUnloadingTime { get; set; }
        public Int64 pQuotationRouteID { get; set; }
        #endregion TransportOrder

        public DateTime pGateOutDate { get; set; }
        public DateTime pStuffingDate { get; set; }
        public DateTime pDeliveryDate { get; set; }
        public string pBookingNumber { get; set; }
        public string pDelays { get; set; }
        public string pDriverName { get; set; }
        public string pDriverPhones { get; set; }
        public string pPowerFromGateInTillActualSailing { get; set; }
        public string pContactPersonPhones { get; set; }
        public string pLoadingTime { get; set; }

        public decimal pCCAFreight { get; set; }
        public decimal pCCAFOB { get; set; }
        public decimal pCCACFValue { get; set; }
        public string pCCAInvoiceNumber { get; set; }

        public string pCCAInsurance { get; set; }
        public string pCCADischargeValue { get; set; }
        public string pCCAAcceptedValue { get; set; }
        public string pCCAImportValue { get; set; }
        public string pCCADocumentReceiveDate { get; set; }
        public string pCCAExchangeRate { get; set; }
        public string pCCAVATCertificateNumber { get; set; }
        public string pCCAVATCertificateValue { get; set; }
        public string pCCACommercialProfitCertificateNumber { get; set; }
        public string pCCAWindowFees { get; set; }
        public string pCCAStorageFees { get; set; }
        public string pCCACommercialProfitTax { get; set; }
        public string pCCACustomsValue { get; set; }
        public string pCCAQuotedValue { get; set; }
        public string pCCAContractType { get; set; }
        public string pCCAOthers { get; set; }
        public string pCCASpendDate { get; set; }

        public string pCertificateNumber { get; set; }
        public string pCertificateValue { get; set; }
        public string pCertificateDate { get; set; }
        public string pQasimaNumber { get; set; }
        public string pQasimaDate { get; set; }
        public bool pMatch { get; set; }
        public int pCCMainWarehouseID { get; set; }
        public DateTime pCCWarehouseETA { get; set; }
        public DateTime pCCWarehouseATD { get; set; }
        public bool pCCIsDone { get; set; }
        public string pSalesDateReceived { get; set; }
        public string pCommerceDateReceived { get; set; }
        public string pInspectionDateReceived { get; set; }
        public string pFinishDateReceived { get; set; }
        public string pSalesDateDelivered { get; set; }
        public string pCommerceDateDelivered { get; set; }
        public string pInspectionDateDelivered { get; set; }
        public string pFinishDateDelivered { get; set; }

        public string pRoadNumber { get; set; }
        public string pDeliveryOrderNumber { get; set; }
        public string pWareHouse { get; set; }
        public string pWareHouseLocation { get; set; }

        public bool pIsOwnedByCompany { get; set; }
        public bool pIsLoaded { get; set; }
        public int pTrailerID { get; set; }
        public int pDriverID { get; set; }
        public int pDriverAssistantID { get; set; }
        public int pEquipmentID { get; set; }
        public int pLoadingZoneID { get; set; }
        public int pFirstCuringAreaID { get; set; }
        public int pSecondCuringAreaID { get; set; }
        public int pThirdCuringAreaID { get; set; }
        public string pBillNumber { get; set; }
        public string pTruckingOrderCode { get; set; }
        public int pTruckCounter { get; set; }
        public decimal pCargoReturnGrossWeight { get; set; }
        public int pLastTruckCounter { get; set; }
        public string pOffloadingDate { get; set; }
        public int pMaxSupplierContainers { get; set; }
        public string pCCDropBackReceived { get; set; }
        public string pCCDropBackDelivered { get; set; }
        public string pCCAllowTemporaryReceived { get; set; }
        public string pCCAllowTemporaryDelivered { get; set; }
        public string pCC_ClearanceTypeID { get; set; }
        public string pCC_CustomItemsID { get; set; }
        public string pCCReleaseNo { get; set; }
        public string pCustomerWarehouseMangerName { get; set; }
        public string PCustomerWarehouseMangerPhone { get; set; }
        public int pTruckingEquipmentID { get; set; }
        public string pConcedeCompanyName { get; set; }
        public string pConcedeNumber { get; set; }
        public decimal pConcedeTotalQty { get; set; }
        public decimal pConcedeQty { get; set; }
        public int pWarehouseID { get; set; }
        public string pCCApproveNo { get; set; }
        public string pCCInvoiceNo { get; set; }
        public decimal pCCTotalQty { get; set; }
        public decimal pCCSubtractQty { get; set; }
        public decimal pCCNetQty { get; set; }
		public int pTrContainerTypeID { get; set; }
		public int pTrNumberOfContainers { get; set; }
		public string pOperationNotes { get; set; }

	}
    public class UpdateRoutingData
    {
        public Int64 pID { get; set; }
        public int pRoutingTypeID { get; set; }
        public Int64 pOperationID { get; set; }
        public Int32 pTransportTypeID { get; set; }
        public string pTransportIconName { get; set; }
        public string pTransportIconStyle { get; set; }
        public int pPOLCountryID { get; set; }
        public int pPODCountryID { get; set; }
        public int pPOLID { get; set; }
        public int pPODID { get; set; }
        public string pPickupAddress { get; set; }
        public string pDeliveryAddress { get; set; }
        public DateTime pETAPOLDate { get; set; }
        public DateTime pATAPOLDate { get; set; }
        public DateTime pExpectedArrival { get; set; }
        public DateTime pExpectedDeparture { get; set; }
        public DateTime pActualArrival { get; set; }
        public DateTime pActualDeparture { get; set; }
        public DateTime pCutoffDate { get; set; }
        public int pShippingLineID { get; set; }
        public int pAirlineID { get; set; }
        public int pTruckerID { get; set; }
        public int pVesselID { get; set; }
        public string pVoyageOrTruckNumber { get; set; }
        public Int32 pTransientTime { get; set; }
        public Int32 pValidity { get; set; }
        public Int32 pFreeTime { get; set; }
        public string pNotes { get; set; }
        public int pBLType { get; set; }
        public string pMasterBL { get; set; }
        public string pBLDate { get; set; }
        public string pMAWBSuffix { get; set; }
        public int pNumberOfHousesConnected { get; set; }
        //TruckingOrderFields
        public Int32 pGensetSupplierID { get; set; }
        public Int32 pCCAID { get; set; }
        public string pQuantity { get; set; }
        public string pContactPerson { get; set; }
        public string pTruckingOrderPickupAddress { get; set; }
        public string pTruckingOrderDeliveryAddress { get; set; }
        public Int32 pGateInPortID { get; set; }
        public Int32 pGateOutPortID { get; set; }
        public DateTime pGateInDate { get; set; }

        #region TransportOrder
        public Int32 pCustomerID { get; set; }
        public Int32 pSubContractedCustomerID { get; set; }
        public decimal pCost { get; set; }
        public decimal pSale { get; set; }
        public bool pIsFleet { get; set; }
        public Int32 pCommodityID { get; set; }
        public DateTime pLoadingDate { get; set; }
        public string pLoadingReference { get; set; }
        public DateTime pUnloadingDate { get; set; }
        public string pUnloadingReference { get; set; }
        public string pUnloadingTime { get; set; }
        public Int64 pQuotationRouteID { get; set; }
        #endregion TransportOrder

        public DateTime pGateOutDate { get; set; }
        public DateTime pStuffingDate { get; set; }
        public DateTime pDeliveryDate { get; set; }
        public string pBookingNumber { get; set; }
        public string pDelays { get; set; }
        public string pDriverName { get; set; }
        public string pDriverPhones { get; set; }
        public string pPowerFromGateInTillActualSailing { get; set; }
        public string pContactPersonPhones { get; set; }
        public string pLoadingTime { get; set; }

        public decimal pCCAFreight { get; set; }
        public decimal pCCAFOB { get; set; }
        public decimal pCCACFValue { get; set; }
        public string pCCAInvoiceNumber { get; set; }

        public string pCCAInsurance { get; set; }
        public string pCCADischargeValue { get; set; }
        public string pCCAAcceptedValue { get; set; }
        public string pCCAImportValue { get; set; }
        public string pCCADocumentReceiveDate { get; set; }
        public string pCCAExchangeRate { get; set; }
        public string pCCAVATCertificateNumber { get; set; }
        public string pCCAVATCertificateValue { get; set; }
        public string pCCACommercialProfitCertificateNumber { get; set; }
        public string pCCAWindowFees { get; set; }
        public string pCCAStorageFees { get; set; }
        public string pCCACommercialProfitTax { get; set; }
        public string pCCACustomsValue { get; set; }
        public string pCCAQuotedValue { get; set; }
        public string pCCAContractType { get; set; }
        public string pCCAOthers { get; set; }
        public string pCCASpendDate { get; set; }

        public string pCertificateNumber { get; set; }
        public string pCertificateValue { get; set; }
        public string pCertificateDate { get; set; }
        public string pQasimaNumber { get; set; }
        public bool pMatch { get; set; }
        public int pCCMainWarehouseID { get; set; }
        public DateTime pCCWarehouseETA { get; set; }
        public DateTime pCCWarehouseATD { get; set; }
        public bool pCCIsDone { get; set; }
        public string pQasimaDate { get; set; }
        public string pSalesDateReceived { get; set; }
        public string pCommerceDateReceived { get; set; }
        public string pInspectionDateReceived { get; set; }
        public string pFinishDateReceived { get; set; }
        public string pSalesDateDelivered { get; set; }
        public string pCommerceDateDelivered { get; set; }
        public string pInspectionDateDelivered { get; set; }
        public string pFinishDateDelivered { get; set; }

        public string pRoadNumber { get; set; }
        public string pDeliveryOrderNumber { get; set; }
        public string pWareHouse { get; set; }
        public string pWareHouseLocation { get; set; }

        public bool pIsOwnedByCompany { get; set; }
        public bool pIsLoaded { get; set; }
        public int pTrailerID { get; set; }
        public int pDriverID { get; set; }
        public int pDriverAssistantID { get; set; }
        public int pEquipmentID { get; set; }
        public int pLoadingZoneID { get; set; }
        public int pFirstCuringAreaID { get; set; }
        public int pSecondCuringAreaID { get; set; }
        public int pThirdCuringAreaID { get; set; }
        public string pBillNumber { get; set; }
        public string pTruckingOrderCode { get; set; }
        public int pTruckCounter { get; set; }
        public decimal pCargoReturnGrossWeight { get; set; }
        public int pLastTruckCounter { get; set; }
        public string pOffloadingDate { get; set; }
        public int pMaxSupplierContainers { get; set; }

        public string pCCDropBackReceived { get; set; }
        public string pCCDropBackDelivered { get; set; }
        public string pCCAllowTemporaryReceived { get; set; }
        public string pCCAllowTemporaryDelivered { get; set; }
        public string pCC_ClearanceTypeID { get; set; }
        public string pCC_CustomItemsID { get; set; }
        public string pCCReleaseNo { get; set; }
        public string pCustomerWarehouseMangerName { get; set; }
        public string PCustomerWarehouseMangerPhone { get; set; }
        public int pTruckingEquipmentID { get; set; }
		public string pConcedeCompanyName { get; set; }
		public string pConcedeNumber { get; set; }
		public decimal pConcedeTotalQty { get; set; }
		public decimal pConcedeQty { get; set; }
		public int pWarehouseID { get; set; }
		public string pCCApproveNo { get; set; }
		public string pCCInvoiceNo { get; set; }
		public decimal pCCTotalQty { get; set; }
		public decimal pCCSubtractQty { get; set; }
		public decimal pCCNetQty { get; set; }
		public int pTrContainerTypeID { get; set; }
		public int pTrNumberOfContainers { get; set; }
		public string pOperationNotes { get; set; }
	}
    public class SaveVehicleParameters
    {
        public string pOperationVehicleIDsList { get; set; }
        public string pOperationsContainersAndPackagesIDsList { get; set; }
        public Int64 pOperationID { get; set; }
        public Int32 pRoutingID { get; set; }
        public decimal pCargoGrossWeight { get; set; }
        public bool pIsOwnedByCompany { get; set; }

    }

    public class Save_FleetDistributionData
    {
        public Int64 pID_FleetSave { get; set; }
        public Int64 pOperationID { get; set; }
        public Int32 pRoutingTypeID { get; set; }
        public Int32 pTransportTypeID { get; set; }
        public string pTransportIconName { get; set; }
        public string pTransportIconStyle { get; set; }

        public Int32 pPOLCountryID { get; set; }
        public Int32 pPODCountryID { get; set; }
        public Int32 pPOLID { get; set; }
        public Int32 pPODID { get; set; }

        public Int32 pTruckerID { get; set; }

        public string pVoyageOrTruckNumber { get; set; }
        public Int32 pTransientTime { get; set; }
        public Int32 pValidity { get; set; }
        public Int32 pFreeTime { get; set; }
        public string pNotes { get; set; }

        public Int32 pQuantity { get; set; }
        public string pTruckingOrderPickupAddress { get; set; }
        public string pTruckingOrderDeliveryAddress { get; set; }
        public Int32 pGateInPortID { get; set; }
        public Int32 pGateOutPortID { get; set; }
        public string pGateInDate { get; set; }
        /****************************TransportOrder**************************/
        public Int32 pCustomerID { get; set; }
        public decimal pCost { get; set; }
        public decimal pSale { get; set; }
        public bool pIsFleet { get; set; }
        public Int32 pCommodityID { get; set; }
        public string pLoadingDate { get; set; }
        public string pLoadingReference { get; set; }
        public string pUnloadingDate { get; set; }
        public string pUnloadingReference { get; set; }
        public string pUnloadingTime { get; set; }
        public Int64 pQuotationRouteID { get; set; }
        /****************************TransportOrder**************************/
        public string pGateOutDate { get; set; }
        public string pStuffingDate { get; set; }
        public string pBookingNumber { get; set; }
        public string pDelays { get; set; }
        public string pDriverName { get; set; }
        public string pDriverPhones { get; set; }
        public string pPowerFromGateInTillActualSailing { get; set; }

        public string pLoadingTime { get; set; }

        public bool pIsOwnedByCompany { get; set; }
        public Int32 pTrailerID { get; set; }
        public Int32 pDriverID { get; set; }
        public Int32 pDriverAssistantID { get; set; }
        public Int32 pEquipmentID { get; set; }
        public Int32 pLoadingZoneID { get; set; }
        public Int32 pFirstCuringAreaID { get; set; }
        public Int32 pSecondCuringAreaID { get; set; }
        public Int32 pThirdCuringAreaID { get; set; }
        public string pBillNumber { get; set; }
        public string pTruckingOrderCode { get; set; }
        public Int32 pTruckCounter { get; set; }
        public decimal pCargoReturnGrossWeight { get; set; }
        public Int32 pLastTruckCounter { get; set; }
        public string pCustomerWarehouseManagerName { get; set; }
        public string pCustomerWarehouseManagerPhone { get; set; }
        public int pTruckingEquipmentID { get; set; }
    }

    public class vwRoutingsLog : baseLog
    {
        #region "variables"


        public String POLCountryName { get; set; }
        public String POLName { get; set; }
        public String PickupAddress { get; set; }
        public String PODCountryName { get; set; }
        public String PODName { get; set; }
        public String DeliveryAddress { get; set; }
        public String ATAPOLDate { get; set; }
        public string ETAPOLDate { get; set; }
        public string ExpectedDeparture { get; set; }
        public string ActualDeparture { get; set; }
        public string ExpectedArrival { get; set; }
        public string ActualArrival { get; set; }
        public Int32 FreeTime { get; set; }
        public Int32 TransientTime { get; set; }
        public String RoadNumber { get; set; }
        public String DeliveryOrderNumber { get; set; }
        public String WareHouse { get; set; }
        public String WareHouseLocation { get; set; }
        public String RoutingName { get; set; } // Line/Trucker
        public String VesselName { get; set; }
        public String VoyageOrTruckNumber { get; set; }
        public String BookingNumber { get; set; }
        public String ModificationDateString { get; set; }
        public String MasterBL { get; set; }




        //public Int32 RoutingTypeID{get;set;}
        //public Int32 TransportType{get;set;}
        //public Int32 POL{get;set;}
        //public Int32 POD{get;set;}
        //public Int32 Validity{get;set;}
        //public String Notes{get;set;}
        //public String CreatorName{get;set;}
        //public DateTime CreationDate{get;set;}
        //public String ModificationDateString{get;set;}
        //public String RoutingCode{get;set;}

        //public String RoutingLocalName{get;set;}
        //public Int32 ViewOrder{get;set;}
        //public String POLCountryCode{get;set;}
        //public String POLCode{get;set;}
        //public String PODCountryCode{get;set;}
        //public String ShippingLineCode{get;set;}
        //public String ShippingLineName{get;set;}
        //public String AirlineCode{get;set;}
        //public String AirlineName{get;set;}
        //public Int32 TruckerCode{get;set;}
        //public String TruckerName{get;set;}
        //public String TruckerLocalName{get;set;}
        //public String VesselCode{get;set;}


        //public String GensetSupplierName{get;set;}
        //public Int32 CCAID{get;set;}
        //public String CCAName{get;set;}
        //public String CCALocalName{get;set;}
        //public String ContactPerson{get;set;}
        //public String Quantity{get;set;}
        //public String GateInPortName{get;set;}
        //public String GateOutPortName{get;set;}
        //public String GateInDate{get;set;}
        //public String GateOutDate{get;set;}
        //public String StuffingDate{get;set;}
        //public String DeliveryDate{get;set;}

        //public String Delays{get;set;}
        //public String DriverName{get;set;}
        //public String DriverPhones{get;set;}
        //public String PowerFromGateInTillActualSailing{get;set;}
        //public String ContactPersonPhones{get;set;}
        //public String LoadingTime{get;set;}
        //public String CertificateNumber{get;set;}
        //public String CertificateValue{get;set;}
        //public DateTime CertificateDate{get;set;}
        //public String QasimaNumber{get;set;}
        //public DateTime QasimaDate{get;set;}
        //public String SalesDateReceived{get;set;}
        //public String CommerceDateReceived{get;set;}
        //public String InspectionDateReceived{get;set;}
        //public String FinishDateReceived{get;set;}
        //public String SalesDateDelivered{get;set;}
        //public String CommerceDateDelivered{get;set;}
        //public String InspectionDateDelivered{get;set;}
        //public String FinishDateDelivered{get;set;}


        //public String BillNumber{get;set;}
        //public String TruckingOrderCode{get;set;}
        //public String OperationCode{get;set;}
        //public Int32 OperationSerial{get;set;}
        //public String ShipmentTypeCode{get;set;}
        //public String EquipmentNumber{get;set;}
        //public String EquipmentPlateNo{get;set;}
        //public String EquipmentModelName{get;set;}
        //public String EquipmentModelNameFromQuotation{get;set;}
        //public String TrailerPlateNo{get;set;}
        //public String TrailerNumber{get;set;}
        //public Decimal CargoGrossWeight{get;set;}
        //public String LoadingZone{get;set;}
        //public String EquipmentDriverName{get;set;}
        //public String FirstCuringArea{get;set;}
        //public String SecondCuringArea{get;set;}
        //public String ThirdCuringArea{get;set;}
        //public Int32 TruckCounter{get;set;}
        //public Decimal CargoReturnGrossWeight{get;set;}
        //public Decimal CCAFreight{get;set;}
        //public Decimal CCAFOB{get;set;}
        //public Decimal CCACFValue{get;set;}
        //public String CCAInvoiceNumber{get;set;}
        //public String CCAInsurance{get;set;}
        //public String CCADischargeValue{get;set;}
        //public String CCAAcceptedValue{get;set;}
        //public String CCAImportValue{get;set;}
        //public DateTime CCADocumentReceiveDate{get;set;}
        //public String CCAExchangeRate{get;set;}
        //public String CCAVATCertificateNumber{get;set;}
        //public String CCAVATCertificateValue{get;set;}
        //public String CCACommercialProfitCertificateNumber{get;set;}
        //public String CCAWindowFees{get;set;}
        //public String CCAStorageFees{get;set;}
        //public String CCACommercialProfitTax{get;set;}
        //public String CCACustomsValue{get;set;}
        //public String CCAQuotedValue{get;set;}
        //public String CCAContractType{get;set;}
        //public String CCAOthers{get;set;}
        //public DateTime CCASpendDate{get;set;}
        //public Boolean IsApproved{get;set;}
        //public String ClientName{get;set;}
        //public String SubContractedCustomerName{get;set;}
        //public Decimal Cost{get;set;}
        //public Decimal CostFromPayables{get;set;}
        //public Decimal Sale{get;set;}
        //public Int32 ContainersCount{get;set;}
        //public Int32 VehiclesCount{get;set;}
        //public Int32 LastTruckCounter{get;set;}
        //public DateTime OffloadingDate{get;set;}
        //public Int32 MaxSupplierContainers{get;set;}
        //public String CommodityName{get;set;}
        //public DateTime LoadingDate{get;set;}
        //public String LoadingReference{get;set;}
        //public DateTime UnloadingDate{get;set;}
        //public String UnloadingReference{get;set;}
        //public String UnloadingTime{get;set;}
        //public String strLoadingDate{get;set;}
        //public String QuotationRouteCode{get;set;}
        //public Int64 InvoiceNumber{get;set;}
        //public String InvoiceTypeName{get;set;}
        //public Int32 OperationInvoicesCount{get;set;}
        //public String DivisionName{get;set;}
        //public String CCReleaseNo{get;set;}
        //public String CC_ClearanceTypeName{get;set;}
        //public DateTime CCDropBackDelivered{get;set;}
        //public DateTime CCDropBackReceived{get;set;}
        //public DateTime CCAllowTemporaryDelivered{get;set;}
        //public DateTime CCAllowTemporaryReceived{get;set;}
        //public String ContainerTypes { get;  set; }
        #endregion
    }
}
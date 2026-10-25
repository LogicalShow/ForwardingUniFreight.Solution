using Forwarding.MvcApp.Models.Administration.Security.Generated;
using Forwarding.MvcApp.Models.Administration.Settings.Generated;
using Forwarding.MvcApp.Models.MasterData.Invoicing.Generated;
using Forwarding.MvcApp.Models.MasterData.Locations.Generated;
using Forwarding.MvcApp.Models.MasterData.Partners.Generated;
using Forwarding.MvcApp.Models.MasterData.Trucking.Generated;
using Forwarding.MvcApp.Models.NoAccess.Generated;
using Forwarding.MvcApp.Models.Operations.Operations.Generated;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;

namespace Forwarding.MvcApp.Controllers.TR.API_Reports
{
    public class TruckingOrderReportForSupplierController : ApiController
    {
        public class ContainersTypes
        {
            public int Quantity { get; set; }
            public string ContainerCode { get; set; }
        }

        [HttpGet, HttpPost]
        public object[] GetStatisticsFilter()
        {
            CvwDefaults objCvwDefaults = new CvwDefaults();
            //CvwRoutings objCvwRoutings = new CvwRoutings();
            CTRCK_Equipments objCTRCK_Equipments = new CTRCK_Equipments();
            CTRCK_Trailers objCTRCK_Trailers = new CTRCK_Trailers();
            CTRCK_Drivers objCTRCK_Driver = new CTRCK_Drivers();
            CTRCK_Drivers objCTRCK_DriverAssistant = new CTRCK_Drivers();
            //CCities objCCities = new CCities();
            CPorts objCPorts = new CPorts();
            CUsers objCUsers = new CUsers();



            //objCvwRoutings.GetList(string.Empty); //GetList() fn loads without paging
            Int32 _RowCount = 0;
            //pSearchKey here is the where clause


            objCTRCK_Trailers.GetListPaging(999999, 1, "WHERE IsInactive=0", "Name", out _RowCount);
            objCTRCK_Driver.GetList("WHERE IsDriver=1 ORDER BY Name");
            objCTRCK_DriverAssistant.GetList("WHERE IsDriver=0 ORDER BY Name");
            objCvwDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount); //i am sure i ve just one row isa
            //objCCities.GetList("WHERE CountryID=" + objCvwDefaults.lstCVarvwDefaults[0].DefaultCountryID.ToString());
            objCTRCK_Equipments.GetListPaging(999999, 1, "WHERE IsInactive=0", "Name", out _RowCount);
            objCPorts.GetList("WHERE  CountryID=" + objCvwDefaults.lstCVarvwDefaults[0].DefaultCountryID.ToString());
            objCUsers.GetListPaging(999999, 1, "WHERE 1=1", "Name", out _RowCount);
            #region Get Minimized Lists
            var pEquipmentList = objCTRCK_Equipments.lstCVarTRCK_Equipments
                .Select(s => new
                {
                    ID = s.ID
                    ,
                    Name = s.Name
                    ,
                    EquipmentModelID = s.EquipmentModelID
                    ,
                    LicenseStatus = (DateTime.Now.Date - s.LicenseNumberExpireDate).Days >= 0 ? "(License Expired)" : ""
                })
                .ToList();
            var pTrailerList = objCTRCK_Trailers.lstCVarTRCK_Trailers
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
            var pDriverAssistantList = objCTRCK_DriverAssistant.lstCVarTRCK_Drivers
                .Select(s => new
                {
                    ID = s.ID
                    ,
                    Name = s.Name
                    ,
                    LicenseStatus = (DateTime.Now.Date - s.LicenseNumberExpireDate).Days >= 0 ? "(License Expired)" : ""
                })
                .ToList();
            #endregion Get Minimized Lists

            //objCvwRoutings.GetListPaging(pPageSize, pPageNumber, pWhereClause, " ID desc ", out _RowCount);

            return new Object[] { _RowCount//new JavaScriptSerializer().Serialize(objCvwRoutings.lstCVarvwRoutings)
                , _RowCount
                , new JavaScriptSerializer().Serialize(pTrailerList) //data[2]
                , new JavaScriptSerializer().Serialize(pDriverList) //pData[3]
                , new JavaScriptSerializer().Serialize(pDriverAssistantList) //pData[4]
                , new JavaScriptSerializer().Serialize(objCPorts.lstCVarPorts) //pData[5]
                , new JavaScriptSerializer().Serialize(pEquipmentList) //pData[6]
                ,new JavaScriptSerializer().Serialize(objCPorts.lstCVarPorts)//pData[7]
                ,new JavaScriptSerializer().Serialize(objCUsers.lstCVarUsers)//pData[8]
               };
        }

        [HttpGet, HttpPost]
        public object[] LoadData(string pWhereClause, bool pIsPerEquipment)
        {
            Int32 _RowCount = 0;
            bool pRecordsExist = false;
            Exception checkException = null;

            CvwRoutings objCvwRoutings = new CvwRoutings();
            CvwPayables objCvwPayables = new CvwPayables();
            //CDepartmentCharge objCDepartmentCharge = new CDepartmentCharge();
            //CNoAccessDepartments objCDepartment = new CNoAccessDepartments();
            //CChargeTypes objCChargeTypes = new CChargeTypes();

            //checkException = objCDepartment.GetListPaging(999999, 1, "WHERE Name=N'TRANSPORTATION'", "ID", out _RowCount);
            //if (objCDepartment.lstCVarNoAccessDepartments.Count > 0)
            //    checkException = objCDepartmentCharge.GetListPaging(999999, 1, "WHERE DepartmentID=1182" /*+ objCDepartment.lstCVarNoAccessDepartments[0].ID*/, "ID", out _RowCount);

            checkException = objCvwRoutings.GetListPaging(9999, 1, pWhereClause, "ID", out _RowCount);
            if (objCvwRoutings.lstCVarvwRoutings.Count > 0 && checkException == null)
            {
                pRecordsExist = true;
                string pRoutingID = "";
                for (int i = 0; i < objCvwRoutings.lstCVarvwRoutings.Count; i++)
                {
                    pRoutingID += objCvwRoutings.lstCVarvwRoutings[i].ID.ToString() + ",";
                }
                pRoutingID = pRoutingID.Substring(0, pRoutingID.Length-1);
                //IsExcludeInTruckingOrderPrint= 0  and 
                objCvwPayables.GetListPaging(999999, 1, " WHERE CostAmount > 0 AND TruckingOrderID in ( " + pRoutingID.ToString() +")", "ChargeTypeName", out _RowCount);
            }
            #region Minimize Columns
            Int64 _Zero = 0;
            decimal _dZero = 0;
            string _EmptySting = "";
            var pRoutingsList = pIsPerEquipment
                ? objCvwRoutings.lstCVarvwRoutings
                 .GroupBy(g => new { g.EquipmentID, g.EquipmentNumber })
                 .Select(s => new
                 {
                     ID = _Zero //s.ID
                     ,
                     TruckingOrderCode = _EmptySting
                     ,
                     CreatorName = _EmptySting //s.CreatorName
                     ,
                     GateInDate = _EmptySting //s.GateInDate
                     ,
                     BillNumber = _EmptySting //s.BillNumber
                     ,
                     ClientName = _EmptySting //s.ClientName
                     ,
                     EquipmentDriverName = _EmptySting //s.EquipmentDriverName
                     ,
                     EquipmentID = s.First().EquipmentID
                     ,
                     EquipmentNumber = s.First().EquipmentNumber
                     ,
                     OrdersCount = s.Count()
                     ,
                     EquipmentModelName = _EmptySting //s.EquipmentModelName
                     ,
                     POLName = _EmptySting //s.POLName
                     ,
                     PODName = _EmptySting //s.PODName
                     ,
                     ContainerTypes = GroupContainers(string.Join("-", s.Where(w => w.ContainerTypes != "0").Select(i => i.ContainerTypes))) //_EmptySting //s.Sum(i => i.ContainersCount).ToString() 
                     ,
                     InvoiceNumber = _EmptySting
                     ,
                     DivisionName = _EmptySting
                     ,
                     Notes = _EmptySting
                     ,
                     LastTruckCounter = 0
                     ,
                     TruckCounter = 0
                     ,
                     Sale = _dZero
                     ,
                     OperationCode = _EmptySting
                 })
                 //.Distinct()
                 //.OrderBy(o => o.ChargeTypeCode)
                 .ToList()
                 : objCvwRoutings.lstCVarvwRoutings
                 .Select(s => new
                 {
                     ID = s.ID
                     ,
                     TruckingOrderCode = s.TruckingOrderCode
                     ,
                     CreatorName = s.CreatorName
                     ,
                     GateInDate = s.GateInDate
                     ,
                     BillNumber = s.BillNumber
                     ,
                     ClientName = s.ClientName
                     ,
                     EquipmentDriverName = s.EquipmentDriverName
                     ,
                     EquipmentID = s.EquipmentID
                     ,
                     EquipmentNumber = s.EquipmentNumber
                     ,
                     OrdersCount = 1
                     ,
                     EquipmentModelName = s.EquipmentModelNameFromQuotation == "0" ? s.EquipmentModelName : s.EquipmentModelNameFromQuotation
                     ,
                     POLName = s.POLName
                     ,
                     PODName = s.PODName
                     ,
                     ContainerTypes = s.ContainerTypes
                     ,
                     InvoiceNumber = s.InvoiceNumber == 0 ? "" : (s.InvoiceNumber + "/" + s.InvoiceTypeName)
                     ,
                     DivisionName = s.DivisionName
                     ,
                     Notes = s.Notes
                     ,
                     LastTruckCounter = s.LastTruckCounter
                     ,
                     TruckCounter = s.TruckCounter
                     ,
                     Sale = s.Sale
                     ,
                     OperationCode = s.OperationCode
                 })
                 //.Distinct()
                 //.OrderBy(o => o.ChargeTypeCode)
                 .ToList();
            #region Sum Containers for IsPerEquipment            
            //if (pIsPerEquipment)
            //{
            //    for (int i = 0; i < pRoutingsList.Count; i++)
            //    {
            //        string _CurrentEquipmentContainers_Grouped = "";
            //        var _ArrCurrentEquipmentContainers = pRoutingsList[i].ContainerTypes.Split(',');
            //        var _lstContainerTypes = new List<ContainersTypes>();
            //        for (int j = 0; j < _ArrCurrentEquipmentContainers.Length; j++)
            //        {
            //            if (_ArrCurrentEquipmentContainers[j] != "0")
            //            {
            //                var _ArrCurrentRow_Single = _ArrCurrentEquipmentContainers[j].Split('-');
            //                for (int x = 0; x < _ArrCurrentRow_Single.Length; x++)
            //                {
            //                    if (_ArrCurrentRow_Single[x] != "")
            //                        _lstContainerTypes.Add(new ContainersTypes
            //                        {
            //                            Quantity = int.Parse(_ArrCurrentRow_Single[x].Split('x')[0])
            //                        ,
            //                            ContainerCode = _ArrCurrentRow_Single[x].Split('x')[1]
            //                        });

            //                } //for (int x = 0; x < _ArrCurrentRow_Single.Length; x++)
            //            } //if (_ArrCurrentEquipmentContainers[j] != "0") { 
            //            var _FinalList = _lstContainerTypes.GroupBy(g => g.ContainerCode)
            //                    .Select(s => new
            //                    {
            //                        Quantity = s.Sum(q => q.Quantity)
            //                        ,
            //                        ContainerTypeCode = s.First().ContainerCode
            //                    }).ToList();
            //            for (int l = 0; l < _FinalList.Count(); l++)
            //            {
            //                _CurrentEquipmentContainers_Grouped += _FinalList[l].Quantity + "x" + _FinalList[l].ContainerTypeCode + ",";
            //            }
            //        } //for (int j=0; j < _ArrCurrentEquipmentContainers.Length; j++)
            //        pRoutingsList[i].ContainerTypes = _CurrentEquipmentContainers_Grouped
            //    } //for (int i = 0; i < pRoutingsList.Count; i++)
            //} //if (pIsPerEquipment)
            #endregion Sum Containers for IsPerEquipment
            var pPayablesList = pIsPerEquipment
                ? objCvwPayables.lstCVarvwPayables
                .GroupBy(g => new { g.TruckID, g.ChargeTypeID, g.ChargeTypeCode })
                 .Select(s => new
                 {
                     TruckingOrderID = _Zero //s.First().TruckingOrderID
                     ,
                     EquipmentID = s.First().TruckID
                     ,
                     ChargeTypeID = s.First().ChargeTypeID
                     ,
                     ChargeTypeCode = s.First().ChargeTypeCode
                     ,
                     CostAmount = s.Sum(i => i.CostAmount)
                 })
                 //.Distinct()
                 //.OrderBy(o => o.ChargeTypeCode)
                 .ToList()
                 :
                 objCvwPayables.lstCVarvwPayables
                .GroupBy(g => new { g.TruckingOrderID, g.TruckID, g.ChargeTypeID, g.ChargeTypeCode })
                 .Select(s => new
                 {
                     TruckingOrderID = s.First().TruckingOrderID
                     ,
                     EquipmentID = s.First().TruckID
                     ,
                     ChargeTypeID = s.First().ChargeTypeID
                     ,
                     ChargeTypeCode = s.First().ChargeTypeCode
                     ,
                     CostAmount = s.Sum(i => i.CostAmount)
                 })
                 //.Distinct()
                 //.OrderBy(o => o.ChargeTypeCode)
                 .ToList();
            var pChargeList = objCvwPayables.lstCVarvwPayables
                .GroupBy(g => new { g.ChargeTypeID, g.ChargeTypeCode })
                 .Select(s => new
                 {
                     ChargeTypeID = s.First().ChargeTypeID
                     ,
                     ChargeTypeCode = s.First().ChargeTypeCode
                     ,
                     ChargeTypeTotal = 0.0
                 })
                 .Distinct()
                 .OrderBy(o => o.ChargeTypeCode)
                 .ToList();
            #endregion Minimize Columns

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };

            return new Object[] {
                pRecordsExist //data[0]
                , serializer.Serialize(pRoutingsList) //pIsPerEquipment ? serializer.Serialize(pRoutingsList) : serializer.Serialize(objCvwRoutings.lstCVarvwRoutings) //pData[1];
                , serializer.Serialize(pPayablesList) //pData[2]
                , serializer.Serialize(pChargeList) //pData[3]
            };
        }

        public static string GroupContainers(string pContainerTypes)
        {
            string _GroupedContainersTypes = "";
            var _ArrContainerTypes = pContainerTypes.Split('-');
            var _lstContainerTypes = new List<ContainersTypes>();
            for (int j = 0; j < _ArrContainerTypes.Length; j++)
            {
                if (_ArrContainerTypes[j] != "")
                    _lstContainerTypes.Add(new ContainersTypes
                    {
                        Quantity = int.Parse(_ArrContainerTypes[j].Split('x')[0])
                    ,
                        ContainerCode = _ArrContainerTypes[j].Split('x')[1]
                    });
            }

            var _FinalList = _lstContainerTypes
                            .GroupBy(g => g.ContainerCode)
                            .Select(s => new
                            {
                                Quantity = s.Sum(q => q.Quantity)
                                ,
                                ContainerTypeCode = s.First().ContainerCode
                            }).ToList();
            for (int l = 0; l < _FinalList.Count(); l++)
            {
                _GroupedContainersTypes += _FinalList[l].Quantity + "x" + _FinalList[l].ContainerTypeCode + ",";
            }

            return _GroupedContainersTypes;
        }

    }
}

using Forwarding.MvcApp.Models.Administration.Settings.Generated;
using Forwarding.MvcApp.Models.MasterData.Invoicing.Generated;
using Forwarding.MvcApp.Models.MasterData.Trucking.Generated;
using Forwarding.MvcApp.Models.Operations.Operations.Customized;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;

namespace Forwarding.MvcApp.Controllers.TR.API_Reports
{
    public class TripIncentiveReportController : ApiController
    {
        [HttpGet, HttpPost]
        public object[] GetStatisticsFilter()
        {
            Int32 _RowCount = 0;

            //CTRCK_Equipments objCTRCK_Equipments = new CTRCK_Equipments();
            //CTRCK_Trailers objCTRCK_Trailers = new CTRCK_Trailers();
            CTRCK_Drivers objCTRCK_Driver = new CTRCK_Drivers();

            objCTRCK_Driver.GetListPaging(999999, 1, "WHERE IsDriver=1", "Name", out _RowCount);
            //objCTRCK_Equipments.GetListPaging(999999, 1, "WHERE IsInactive=0", "Name", out _RowCount);
            //objCTRCK_Trailers.GetList(" WHERE 1=1 ORDER BY Name ");
            //CvwChargeTypesWithMinimalColumns objCvwChargetypes = new CvwChargeTypesWithMinimalColumns();
            //objCvwChargetypes.GetList(" WHERE 1=1 ORDER BY Name ");
            var serializer = new JavaScriptSerializer() { MaxJsonLength = int.MaxValue };

            return new object[] {
                new JavaScriptSerializer().Serialize(objCTRCK_Driver.lstCVarTRCK_Drivers) //pData[0]
                //, new JavaScriptSerializer().Serialize(objCTRCK_Trailers.lstCVarTRCK_Trailers) //data[1]
                //, new JavaScriptSerializer().Serialize(objCTRCK_Equipments.lstCVarTRCK_Equipments) //pData[2]
            };
        }

        [HttpGet, HttpPost]
        public object[] LoadData(string pWhereClause)
        {
            Int32 _RowCount = 0;
            bool pRecordsExist = false;
            Exception checkException = null;

            CvwTripIncentive objCvwTripIncentive = new CvwTripIncentive();
            CvwDefaults objCvwDefaults = new CvwDefaults();

            checkException = objCvwTripIncentive.GetListPaging(9999, 1, pWhereClause, "ID", out _RowCount);
            #region Grouped
            //var pTripIncentive = objCvwTripIncentive.lstCVarvwTripIncentive
            //    .GroupBy(g => new { g.DriverID,g.GateInDate, g.GateOutDate, g.CommodityID, g.ClientName, g.POLName, g.PODName })
            //    .Select(s => new
            //    {
            //        DriverCode = s.First().DriverCode
            //        ,
            //        DriverName = s.First().DriverName
            //        ,
            //        StartDate = s.First().GateInDate.ToString("dd/MM/yyyy")
            //        ,
            //        EndDate = s.First().GateOutDate.ToString("dd/MM/yyyy")
            //        ,
            //        TripType = s.First().CommodityName
            //        ,
            //        ClientName = s.First().ClientName
            //        ,
            //        POLName = s.First().POLName.Replace(',', '-')
            //        ,
            //        PODName = s.First().PODName.Replace(',', '-')
            //        ,
            //        TripIncentiveValue = s.Sum(i => i.TripIncentiveValue)
            //        ,
            //        NumberofSeaportUnloadingDelayDays = s.Sum(i => i.NumberofSeaportUnloadingDelayDays)
            //        ,
            //        NumberofSeaportOvernightDelays = s.Sum(i => i.NumberofSeaportOvernightDelays)
            //        ,
            //        SeaportDelaysExtraIncentive = s.Sum(i => i.SeaportDelaysExtraIncentive)
            //        ,
            //        TotalTripIncentive = s.Sum(i => i.TripIncentiveValue) + s.Sum(i => i.NumberofSeaportUnloadingDelayDays) + s.Sum(i => i.NumberofSeaportOvernightDelays) + s.Sum(i => i.SeaportDelaysExtraIncentive)
            //    })
            //    //.Distinct()
            //    .OrderBy(o => o.DriverName)
            //    .ToList();
            #endregion Grouped
            #region not grouped
            var pTripIncentive = objCvwTripIncentive.lstCVarvwTripIncentive
                //.GroupBy(g => new { g.DriverID, g.GateInDate, g.GateOutDate, g.CommodityID, g.ClientName, g.POLName, g.PODName })
                .Select(s => new
                {
                    DriverCode = s.DriverCode
                    ,
                    DriverName = s.DriverName
                    ,
                    TruckingOrderCode = s.TruckingOrderCode
                    ,
                    StartDate = s.GateInDate.ToString("dd/MM/yyyy")
                    ,
                    EndDate = s.GateOutDate.ToString("dd/MM/yyyy")
                    ,
                    TripType = s.EquipmentModelName
                    ,
                    ClientName = s.ClientName
                    ,
                    POLName = s.POLName.Replace(',', '-')
                    ,
                    PODName = s.PODName.Replace(',', '-')
                    ,
                    TripIncentiveValue = s.TripIncentiveValue
                    ,
                    NumberofSeaportUnloadingDelayDays = s.ExtraIncentive
                    ,
                    NumberofSeaportOvernightDelays = s.UndoingLoadingOrUnloadingIncentive
                    ,
                    TotalTripIncentive = s.TripIncentiveValue + s.ExtraIncentive + s.UndoingLoadingOrUnloadingIncentive
                })
                //.Distinct()
                .OrderBy(o => o.DriverName)
                .ToList();
            #endregion not grouped
            if (objCvwTripIncentive.lstCVarvwTripIncentive.Count > 0)
            pRecordsExist = true;
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[] {
                pRecordsExist //data[0]
                ,  serializer.Serialize(pTripIncentive) // pData[1];
            };
        }
    }
}

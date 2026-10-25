using Forwarding.MvcApp.Entities.Warehousing;
using Forwarding.MvcApp.Models.MasterData.Invoicing.Generated;
using Forwarding.MvcApp.Models.MasterData.Partners.Generated;
using Forwarding.MvcApp.Models.NoAccess.Generated;
using Forwarding.MvcApp.Models.Operations.Operations.Generated;
using Forwarding.MvcApp.Models.Warehousing.MasterData.Generated;
using Forwarding.MvcApp.Models.Warehousing.Reports.Customized;
using Forwarding.MvcApp.Models.Warehousing.Reports.Generated;
using Forwarding.MvcApp.Models.Warehousing.Transactions.Generated;
using System;
using System.Linq;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;

namespace Forwarding.MvcApp.Controllers.Warehousing.API_Reports
{
    public class AreaLocationsChartController : ApiController
    {
        [HttpGet, HttpPost]
        public object[] FillFilter()
        {
            Exception checkException = new Exception();
            int _RowCount = 0;
            CWH_Warehouse cWH_Warehouse = new CWH_Warehouse();
            cWH_Warehouse.GetList("where 1 = 1");
            var Serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[]
            {
                Serializer.Serialize(cWH_Warehouse.lstCVarWH_Warehouse)
            };
        }
        [HttpGet, HttpPost]
        public object[] GetAreaFromWarehouse(string pID)
        {
            Exception checkException = new Exception();
            int _RowCount = 0;
            CWH_Area cWH_Area = new CWH_Area();
            cWH_Area.GetList("where WarehouseID = "+ pID + " " );
            var Serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[]
            {
                Serializer.Serialize(cWH_Area.lstCVarWH_Area)
            };
        }
        [HttpGet, HttpPost]
        public object[] UpdateActionOrInActive(string pID, string pStatueID)
        {

           // SET StatusID =

            int _RowCount = 0;
            var Message = "";
            //----------------------------------------------

            CWH_RowLocation cWH_RowLocation = new CWH_RowLocation();
            var checkException = cWH_RowLocation.UpdateList(" StatusID = " + pStatueID + " where ID = " + pID + "");
            if (checkException != null)
                Message = checkException.Message;


            //---------------------------------------------
            return new object[]
            {
                new JavaScriptSerializer().Serialize(Message)
            };
        }
        [HttpGet, HttpPost]
        public object[] UpdateSwappedLocations(

                string    pFromLocationID,
                string    pToLocationID,
                string    pFromRecieveDetailsID,
                string    pToRecieveDetailsID,
                string    pFromStatusID,
                string    pToStatusID
            )
        {
            int _RowCount = 0;
            var Message = "";
            //----------------------------------------------
            CWH_ReceiveDetails cWH_ReceiveDetails = new CWH_ReceiveDetails();
            var checkException = cWH_ReceiveDetails.UpdateList(" LocationID = " + pToLocationID + " where ID = " + pFromRecieveDetailsID + "");



            //----------------------------------------------------------------------------------------------------------------------------------------------

            CWH_RowLocation cFromWH_RowLocation = new CWH_RowLocation();
            checkException = cFromWH_RowLocation.UpdateList(((pToStatusID == "10" || pToStatusID == "30") ? "IsUsed = 0," : "IsUsed = 1,") +  " StatusID = " + pToStatusID + " where ID = " + pFromLocationID + "");

            CWH_RowLocation cToWH_RowLocation = new CWH_RowLocation();
            checkException = cToWH_RowLocation.UpdateList(((pFromStatusID == "10" || pFromStatusID == "30") ? "IsUsed = 0," : "IsUsed = 1,") + " StatusID = " + pFromStatusID + " where ID = " + pToLocationID + "");


            //----------------------------------------------------------------------------------------------------------------------------------------------

            if (checkException != null)
                Message = checkException.Message;


            //---------------------------------------------
            return new object[]
            {
                new JavaScriptSerializer().Serialize(Message)
            };
        }

        [HttpGet, HttpPost]
        public object[] ResetStatus(

        string pToStatusID,
        string pLocationsIDs,
        string pRecieveDetailsIDs
    )
        {
            int _RowCount = 0;
            var Message = "";


            CWH_RowLocation cWH_RowLocation = new CWH_RowLocation();
            var checkException = cWH_RowLocation.UpdateList( ((pToStatusID == "10" || pToStatusID == "30") ? "IsUsed = 0," : "IsUsed = 1,") +  "  StatusID = " + pToStatusID + " where ID IN( " + pLocationsIDs + ")");
       
            //----------------------------------------------
            if (pToStatusID == "10")
            {
                CWH_ReceiveDetails cWH_ReceiveDetails = new CWH_ReceiveDetails();
                checkException = cWH_ReceiveDetails.UpdateList(" LocationID = null where ID IN( " + pRecieveDetailsIDs + ")");
            }
            //----------------------------------------------------------------------------------------------------------------------------------------------
            

            if (checkException != null)
                Message = checkException.Message;


            //---------------------------------------------
            return new object[]
            {
                new JavaScriptSerializer().Serialize(Message)
            };
        }
        [HttpGet, HttpPost]
        public object[] LoadData(string pWhereClause)
        {
            //string _ReturnedMessage = "";
            int _Rowcount = 0;
            int _MaxLocationsCount = 0;
            CvwWH_AreaLocationsChart cvwWH_AreaLocationsChart = new CvwWH_AreaLocationsChart();
            cvwWH_AreaLocationsChart.GetList(pWhereClause);

            if (cvwWH_AreaLocationsChart.lstCVarvwWH_AreaLocationsChart.Count > 0)
            {
                _MaxLocationsCount = cvwWH_AreaLocationsChart.lstCVarvwWH_AreaLocationsChart.Max(x => x.LocationsCount);
                _Rowcount = cvwWH_AreaLocationsChart.lstCVarvwWH_AreaLocationsChart.Count;
            }
               
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[]
            {
                _Rowcount 
                ,  serializer.Serialize(cvwWH_AreaLocationsChart.lstCVarvwWH_AreaLocationsChart ) , _MaxLocationsCount
            };
        }

    }
}

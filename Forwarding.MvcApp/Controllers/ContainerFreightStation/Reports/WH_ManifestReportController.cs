using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;
using Forwarding.MvcApp.Models.Operations.Operations.Generated;
using Forwarding.MvcApp.Entities.Operations;
using Forwarding.MvcApp.Models.ContainerFreightStation.Reports;
using Forwarding.MvcApp.Models.Administration.Settings.Generated;

namespace Forwarding.MvcApp.Controllers.ContainerFreightStation.Reports
{
    public class WH_ManifestReportController : ApiController
    {
        [HttpGet, HttpPost]
        public object[] LoadData()
        {
            Exception checkException = null;
            Int32 _RowCount = 0;

            CvwOperationsWithMinimalColumns objCvwOperations = new CvwOperationsWithMinimalColumns();

            objCvwOperations.GetListPaging(99999, 1, "WHERE DirectionType = 1 AND TransportType<>2 AND ShipmentType<>2 and BLType<>2", "ID DESC", out _RowCount);

            var pOperationList = objCvwOperations.lstCVarvwOperationsWithMinimalColumns
                   .Select(s => new
                   {
                       ID = s.ID
                       ,
                       Code = s.Code
                   }).ToList();

            var serializer = new JavaScriptSerializer() { MaxJsonLength = int.MaxValue };
            return new object[] {
                _RowCount
                , serializer.Serialize(pOperationList) //data[1]
            };
        }


        [HttpGet, HttpPost]
        public object[] SaveRoadNumber(string pRoadNumber, string pWhereClause,Int32 pOperationID)
        {
            Exception checkException = null;
            bool _result = false;
            int _RowCount = 0;
            COperations objCOperations = new COperations();
            objCOperations.GetListPaging(99999, 1, "WHERE MasterOperationID =" + pOperationID, "ID", out _RowCount);
            CDefaults cDefaults = new CDefaults();
            cDefaults.GetList("where 1=1");
                CRoutings ObjCRoutings = new CRoutings();
            var Houses = objCOperations.lstCVarOperations.Select(h => new
            {
                ID = h.ID
            }).ToList();
            foreach(var house in Houses)
            {
                checkException = ObjCRoutings.UpdateList(" RoadNumber ='" + pRoadNumber + "' WHERE RoutingTypeID = 30 AND OperationID =  " +house.ID);

                if (checkException == null)
                {
                    _result = true;

                }
            }

            if (cDefaults.lstCVarDefaults[0].UnEditableCompanyName == "MES" && checkException == null)
            {

                checkException = ObjCRoutings.UpdateList(" RoadNumber ='" + pRoadNumber + "' WHERE RoutingTypeID = 30 AND OperationID =  " + pOperationID);


            }

            return new object[] {
                _result
            };
        }

        [HttpGet, HttpPost]
        public object[] GetOperationRoadNumber(string pWhereClause, Int32 pOperationID)
        {
            Exception checkException = null;
            Int32 _RowCount = 0;
            CDefaults objCDefaults = new CDefaults();
            objCDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount);
            string _UnEditableCompanyName = objCDefaults.lstCVarDefaults[0].UnEditableCompanyName;
            if (_UnEditableCompanyName == "UNF" || _UnEditableCompanyName == "MES")
            {
                COperations objCOperations = new COperations();
                objCOperations.GetListPaging(99999, 1, "WHERE MasterOperationID =" + pOperationID, "ID", out _RowCount);
                var House = objCOperations.lstCVarOperations.Select(h => new
                {
                    ID = h.ID
                }).FirstOrDefault();
                CRoutings ObjCRoutings = new CRoutings();

                checkException = ObjCRoutings.GetListPaging(9999, 1, "WHERE RoutingTypeID = 30 AND OperationID = " + House.ID , "RoadNumber", out _RowCount);
                return new object[] {
                _RowCount
                , _RowCount > 0 ? (ObjCRoutings.lstCVarRoutings[0].RoadNumber != "0"? ObjCRoutings.lstCVarRoutings[0].RoadNumber :""  ) : "" //data[1]
            };
            }
        
        else{
                CRoutings ObjCRoutings = new CRoutings();

                checkException = ObjCRoutings.GetListPaging(9999, 1, pWhereClause, "RoadNumber", out _RowCount);
                return new object[] {
                _RowCount
                , _RowCount > 0 ? (ObjCRoutings.lstCVarRoutings[0].RoadNumber != "0"? ObjCRoutings.lstCVarRoutings[0].RoadNumber :""  ) : "" //data[1]
            };
            }

          
           // _RowCount = ObjCRoutings.lstCVarRoutings.Count;

           
        }

        [HttpGet, HttpPost]
        public object[] PrintManifest(string pOperationID)
        {
            Exception checkException = null;
            bool RecordsExist = true;

            int _RowCount = 0;

            CvwOperations objCvwOperations = new CvwOperations();
            objCvwOperations.GetListPaging(999999, 1, " WHERE ID = " + pOperationID.ToString(), "ID", out _RowCount);

            CvwRoutings objCvwRoutings = new CvwRoutings();
            objCvwRoutings.GetListPaging(9999, 1, " WHERE OperationID = " + pOperationID.ToString() + " AND RoutingTypeID = 30", "ID", out _RowCount);

            CvwOperations objCvwHouses = new CvwOperations();
            objCvwHouses.GetListPaging(10000, 1, " WHERE MasterOperationID = " + pOperationID.ToString(), "ID", out _RowCount);

            if (objCvwHouses.lstCVarvwOperations.Count > 0)
            {
                objCvwHouses.lstCVarvwOperations = objCvwHouses.lstCVarvwOperations
                    .GroupBy(o => o.ID)
                    .Select(g => g.First())
                    .ToList();
            }

            CvwOperationContainersAndPackages objCvwOperationContainersAndPackages = new CvwOperationContainersAndPackages();
            objCvwOperationContainersAndPackages.GetListPaging(99999, 1, " WHERE OperationID = " + pOperationID.ToString(), "ID", out _RowCount);


            return new object[] { RecordsExist
                    , new JavaScriptSerializer().Serialize(objCvwRoutings.lstCVarvwRoutings)
                    , new JavaScriptSerializer().Serialize(objCvwOperations.lstCVarvwOperations[0])
                    , new JavaScriptSerializer().Serialize(objCvwHouses.lstCVarvwOperations)
                    , new JavaScriptSerializer().Serialize(objCvwOperationContainersAndPackages.lstCVarvwOperationContainersAndPackages)

                };
        }

        [HttpGet, HttpPost]
        public object[] GetOperations(string pWhereClause)
        {
            Int32 _RowCount = 0;

            CvwOperationsforCFSManifest objCvwOperations = new CvwOperationsforCFSManifest();

            objCvwOperations.GetList(pWhereClause);

            _RowCount = objCvwOperations.lstCVarvwOperationsforCFSManifest.Count;

            var pOperationList = objCvwOperations.lstCVarvwOperationsforCFSManifest
                   .Select(s => new
                   {
                       ID = s.ID
                       ,
                       Code = s.Code
                   }).ToList();

            var serializer = new JavaScriptSerializer() { MaxJsonLength = int.MaxValue };
            return new object[] {
                _RowCount
                , serializer.Serialize(pOperationList) //data[1]
            };
        }
    }
}

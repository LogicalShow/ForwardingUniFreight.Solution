using Forwarding.MvcApp.Models.Administration.Settings.Generated;
using Forwarding.MvcApp.Models.MasterData.Invoicing.Generated;
using Forwarding.MvcApp.Models.MasterData.Locations.Generated;
using Forwarding.MvcApp.Models.MasterData.Partners.Generated;
using System;
using System.Web.Http;
using System.Web.Script.Serialization;
using System.Linq;
using Forwarding.MvcApp.Models.Operations.Operations.Generated.Old;
using Forwarding.MvcApp.Models.Operations.Operations.Generated;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Controllers.Reports.API_Statistics
{
    public class TruckingReportController : ApiController
    {
        [HttpGet, HttpPost]//pID : is the InvoiceID
        public object[] GetTruckingReportFilter()
        {
            int _RowCount = 0;

            CBranches objCBranches = new CBranches();
            objCBranches.GetList(" WHERE 1=1 ORDER BY Name ");
            CCustomers objCCustomers = new CCustomers();
            objCCustomers.GetList(" WHERE 1=1 ORDER BY Name ");
            var pCustomerList = objCCustomers.lstCVarCustomers
                .Select(s => new
                {
                    ID = s.ID
                    ,
                    Name = s.Name
                    ,
                    Code = s.Code
                }).ToList();
            CPorts objCPorts = new CPorts();
            objCPorts.GetList(" WHERE 1=1 ORDER BY Name ");
            var pPortList = objCPorts.lstCVarPorts
                .Select(s => new
                {
                    ID = s.ID
                    ,
                    Name = s.Name
                    ,
                    Code = s.Code
                }).ToList();
            COperations objCOperations = new COperations();
            objCOperations.GetList(" WHERE 1=1 AND BLType<>2 ORDER BY Code ");
            var pOperationsList = objCOperations.lstCVarOperations
                .Select(s => new
                {
                    ID = s.ID
                    ,
                    Code = s.Code
                }).ToList();

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                new JavaScriptSerializer().Serialize(objCBranches.lstCVarBranches)//data[0]
                , new JavaScriptSerializer().Serialize(pCustomerList)//data[1]
                , new JavaScriptSerializer().Serialize(pPortList)//data[2]
                , new JavaScriptSerializer().Serialize(pOperationsList)//data[3]
            };
        }
		[HttpGet]
		public object GetTruckingData(string pWhereClause)
		{
			CvwTruckingReport objCvwTruckingReport = new CvwTruckingReport();
			objCvwTruckingReport.GetList(pWhereClause);
			JavaScriptSerializer serializer = new JavaScriptSerializer { MaxJsonLength = int.MaxValue };
			return serializer.Serialize(objCvwTruckingReport.lstCVarvwTruckingReport);
		}
		[HttpPost]
		public object SaveTruckingData([FromBody] List<TruckingReport> pData)
		{
			COperations objCOperations = new COperations();
			CRoutings objCRoutings = new CRoutings();
			Exception ex = null;
			foreach (var item in pData)
			{
				ex = objCOperations.UpdateList($"Notes=N'{item.OperationNotes}', CutOffDate='{item.CutOffDate}' where ID={item.OperationID}");
				ex = objCRoutings.UpdateList($"Notes=N'{item.TruckingNotes}', StuffingDate='{item.LoadingDate}', ExpectedDeparture='{item.ExpectedDeparture}', IsLoaded={item.IsLoaded} where ID={item.RoutingID}");
			}
			return ex==null;
		}
	}
	public class TruckingReport
	{
		public int OperationID { get; set; }
		public int RoutingID { get; set; }
		public string LoadingDate { get; set; }
		public string CutOffDate { get; set; }
		public string ExpectedDeparture { get; set; }
		public string OperationNotes { get; set; }
		public string TruckingNotes { get; set; }
		public byte IsLoaded { get; set; }
	}
}

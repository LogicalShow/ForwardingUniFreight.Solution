using Forwarding.MvcApp.Models.Administration.Settings.Generated;
using Forwarding.MvcApp.Models.MasterData.Invoicing.Generated;
using Forwarding.MvcApp.Models.MasterData.Locations.Generated;
using Forwarding.MvcApp.Models.MasterData.Partners.Generated;
using System;
using System.Web.Http;
using System.Web.Script.Serialization;
using System.Linq;
using Forwarding.MvcApp.Models.Operations.Operations.Generated.Old;

namespace Forwarding.MvcApp.Controllers.Reports.API_Statistics
{
    public class ChargesWithoutInvoicesReportController : ApiController
    {
        [HttpGet, HttpPost]//pID : is the InvoiceID
        public object[] GetChargesWithoutInvoicesReportFilter()
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
            CChargeTypes objCChargeTypes = new CChargeTypes();
            objCChargeTypes.GetList(" WHERE 1=1 ORDER BY Name ");
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
                , new JavaScriptSerializer().Serialize(objCChargeTypes.lstCVarChargeTypes)//data[3]
                , new JavaScriptSerializer().Serialize(pOperationsList)//data[4]
            };
        }

    }
}

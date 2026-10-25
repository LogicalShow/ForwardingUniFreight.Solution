using Forwarding.MvcApp.Entities.Operations;
using Forwarding.MvcApp.Models.Customized;
using Forwarding.MvcApp.Models.MasterData.Partners.Generated;
using Forwarding.MvcApp.Models.Warehousing.MasterData.Generated;
using System.Linq;
using System.Web.Http;
using System.Web.Script.Serialization;

namespace Forwarding.MvcApp.Controllers.Reports.API_Statistics
{
    public class MEDWarehouseReportController : ApiController
    {
        [HttpGet, HttpPost]
        public object[] GetFilters()
        {
            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
            var OperationList = objCCustomizedDBCall.ExecuteQuery_ListOfObjects("SELECT ID,Code FROM Operations WHERE Code IS NOT NULL",typeof(CVarOperations)).Cast<CVarOperations>().ToList();

            var MainWarehousesList = objCCustomizedDBCall.ExecuteQuery_ListOfObjects("SELECT ID,Name FROM WH_MainWarehouses", typeof(CVarWH_MainWarehouses)).Cast<CVarWH_MainWarehouses>().ToList();

            var CustomerList = objCCustomizedDBCall.ExecuteQuery_ListOfObjects("SELECT ID,Name FROM Customers", typeof(CVarCustomers)).Cast<CVarCustomers>().ToList();

            var Serializaer = new JavaScriptSerializer { MaxJsonLength = int.MaxValue };
            return new object[]
            {
                Serializaer.Serialize(OperationList),
                Serializaer.Serialize(MainWarehousesList),
                Serializaer.Serialize(CustomerList)
            };
        }

    }
}

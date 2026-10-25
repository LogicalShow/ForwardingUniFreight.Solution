using Forwarding.MvcApp.Models.Administration.Security.Generated;
using Forwarding.MvcApp.Models.Administration.Settings.Generated;
using Forwarding.MvcApp.Models.MasterData.Invoicing.Generated;
using Forwarding.MvcApp.Models.MasterData.Locations.Generated;
using Forwarding.MvcApp.Models.MasterData.Others.Generated;
using Forwarding.MvcApp.Models.MasterData.Partners.Generated;
using Forwarding.MvcApp.Models.NoAccess.Generated;
using Forwarding.MvcApp.Models.Operations.Operations.Customized;
using System;
using System.Web.Http;
using System.Web.Script.Serialization;
using System.Linq;
using Forwarding.MvcApp.Models.Operations.Operations.Generated;
using WebMatrix.WebData;
using Forwarding.MvcApp.Models.Customized;
using System.Data;
using System.Collections.Generic;
using Org.BouncyCastle.Utilities;
using System.Threading;
using System.Web.UI.WebControls;
using System.Threading.Tasks;
using System.Security.Cryptography;
using System.Globalization;
using Forwarding.MvcApp.Models.Operations.Operations.Generated.Old;
using MoreLinq;

namespace Forwarding.MvcApp.Controllers.ContainerTrackingGroup.API_Reports
{
    public class ConsolidationHandlingCoLoadReportsController : ApiController
    {
        [HttpGet, HttpPost]//pID : is the InvoiceID
        public object[] GetStatisticsFilter()
        {
            int _RowCount = 0;
            CvwUsers objCvwUsers = new CvwUsers();
            objCvwUsers.GetList(" WHERE IsNull(CustomerID , 0) = 0 AND 1=1 ORDER BY Name ");

            //CvwCustomers objCvwCustomers = new CvwCustomers();
            //objCvwCustomers.GetList(" WHERE 1=1 ORDER BY Name ");
            CvwBranches objCvwBranches = new CvwBranches();
            objCvwBranches.GetList(" WHERE 1=1 ORDER BY Name ");

            CvwPorts cvwPorts = new CvwPorts();
            cvwPorts.GetList(" WHERE 1=1 ORDER BY Name ");

            CCustomers objCCustomers = new CCustomers();
            //objCCustomers.GetList(" WHERE 1=1 ORDER BY Name ");

            CvwAgentsForCombo objCvwAgentsForCombo = new CvwAgentsForCombo();
            objCvwAgentsForCombo.GetListPaging(9999, 1, "WHERE 1=1", "Name", out _RowCount);

            CvwCurrencies objCvwCurrencies = new CvwCurrencies();
            objCvwCurrencies.GetList(" WHERE 1=1 ORDER BY Code ");

            CNoAccessQuoteAndOperStages objCNoAccessQuoteAndOperStages = new CNoAccessQuoteAndOperStages();
            objCNoAccessQuoteAndOperStages.GetList(" WHERE IsOperationStage = 1 AND IsInActive = 0 ORDER BY ViewOrder ");

            CShippingLines objCShippingLines = new CShippingLines();
            objCShippingLines.GetList(" WHERE 1=1 ORDER BY Name ");

            CAirlines objCAirlines = new CAirlines();
            objCAirlines.GetList(" WHERE 1=1 ORDER BY Name ");

            CVessels objCVessels = new CVessels();
            objCVessels.GetList(" WHERE 1=1 ORDER BY Name ");

            CNetwork objCNetwork = new CNetwork();
            objCNetwork.GetList(" WHERE 1=1 ORDER BY Name ");

            CCommodities objCCommodities = new CCommodities();
            objCCommodities.GetList("ORDER BY Name");

            CTrackingStage objCTrackingStage = new CTrackingStage();
            objCTrackingStage.GetList("ORDER BY Name");

            CMoveTypes objCMoveTypes = new CMoveTypes();
            objCMoveTypes.GetList(" WHERE 1=1 ORDER BY Name ");

            CCountries objCCountries = new CCountries();
            objCCountries.GetList(" WHERE 1=1 ORDER BY Name ");

            CContainerTypes objCContainerTypes = new CContainerTypes();
            objCContainerTypes.GetList(" where id in (2,3,9,21) ORDER BY Name ");

            CCustomsClearanceAgents objCCustomsClearanceAgents = new CCustomsClearanceAgents();
            objCCustomsClearanceAgents.GetList(" WHERE 1=1 ORDER BY Name ");

            CCC_ClearanceTypes cCC_ClearanceTypes = new CCC_ClearanceTypes();
            cCC_ClearanceTypes.GetList("WHERE 1=1 ");

            CTruckers cTruckers = new CTruckers();
            cTruckers.GetList(" WHERE 1=1 ORDER BY Name ");

            CChargeTypes objCChargeTypes = new CChargeTypes();
            objCChargeTypes.GetList(" WHERE 1=1 ORDER BY Name ");

            //******************************************************************
            CCustomers objConsignee = new CCustomers();
            objConsignee.GetList("Where IsConsignee = 1");
            var ConsigneesList = objConsignee.lstCVarCustomers.Select(c => new
            {
                ID = c.ID,
                Name = c.Name
            }).ToList();


            CCustomers objShipper = new CCustomers();
            objShipper.GetList("Where IsShipper = 1");
            var ShipperList = objShipper.lstCVarCustomers.Select(s => new
            {
                ID = s.ID,
                Name = s.Name
            }).ToList();
            //*********************************************************************


            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                new JavaScriptSerializer().Serialize(objCvwUsers.lstCVarvwUsers)//data[0]
                , new JavaScriptSerializer().Serialize(objCvwBranches.lstCVarvwBranches)//data[1]
                , new JavaScriptSerializer().Serialize(objCCustomers.lstCVarCustomers)//data[2]
                , new JavaScriptSerializer().Serialize(objCvwCurrencies.lstCVarvwCurrencies)//data[3]
                , new JavaScriptSerializer().Serialize(objCNoAccessQuoteAndOperStages.lstCVarNoAccessQuoteAndOperStages)//data[4]
                , new JavaScriptSerializer().Serialize(objCShippingLines.lstCVarShippingLines)//data[5]
                , new JavaScriptSerializer().Serialize(objCVessels.lstCVarVessels)//data[6]
                , new JavaScriptSerializer().Serialize(objCTrackingStage.lstCVarTrackingStage)//data[7]
                , new JavaScriptSerializer().Serialize(objCCommodities.lstCVarCommodities)//data[8]
                , serializer.Serialize(objCvwAgentsForCombo.lstCVarvwAgentsForCombo)//data[9]
                , new JavaScriptSerializer().Serialize(objCNetwork.lstCVarNetwork)//data[10]
                , new JavaScriptSerializer().Serialize(objCMoveTypes.lstCVarMoveTypes)//data[11]
                , new JavaScriptSerializer().Serialize(objCCountries.lstCVarCountries)//data[12]
                , serializer.Serialize(objCCustomsClearanceAgents.lstCVarCustomsClearanceAgents)//data[13]
                ,serializer.Serialize(cTruckers.lstCVarTruckers)//data[14]
                 ,serializer.Serialize(cCC_ClearanceTypes.lstCVarCC_ClearanceTypes)//data[15]
                 ,serializer.Serialize(objCAirlines.lstCVarAirlines)//data[16]
                , serializer.Serialize(objCChargeTypes.lstCVarChargeTypes)//data[17]
                ,serializer.Serialize(ConsigneesList) //data[18]
                ,serializer.Serialize(ShipperList) // data[19]
                ,serializer.Serialize(cvwPorts.lstCVarvwPorts)//data[20]
                //,serializer.Serialize(objCvwCustomers.lstCVarvwCustomers)//data[21]
                ,serializer.Serialize(objCContainerTypes.lstCVarContainerTypes)//data[21]
            };
        }

    
    }
}

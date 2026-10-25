using Forwarding.MvcApp.Models.Administration.Settings.Generated;
using Forwarding.MvcApp.Models.MasterData.Locations.Generated;
using Forwarding.MvcApp.Models.MasterData.Partners.Generated;
using Forwarding.MvcApp.Models.Operations.Operations.Generated;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;

namespace Forwarding.MvcApp.Controllers.Reports.API_Statistics
{
    public class ContainerTrackingReportController : ApiController
    {
        [HttpGet, HttpPost]//pID : is the InvoiceID
        public object[] GetStatisticsFilter()
        {
            int _RowCount = 0;

            CvwDefaults objCvwDefaults = new CvwDefaults();
            objCvwDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount); //i am sure i ve just one row isa

            CPorts objCPorts = new CPorts();
            objCPorts.GetList("WHERE CountryID=" + objCvwDefaults.lstCVarvwDefaults[0].CountryID.ToString() + " ORDER BY Name");
            
            //CvwUsers objCvwUsers = new CvwUsers();
            //objCvwUsers.GetList(" WHERE 1=1 ORDER BY Name ");

            //CvwBranches objCvwBranches = new CvwBranches();
            //objCvwBranches.GetList(" WHERE 1=1 ORDER BY Name ");

            //CCustomers objCCustomers = new CCustomers();
            ////objCCustomers.GetList(" WHERE 1=1 ORDER BY Name ");

            //CvwAgentsForCombo objCvwAgentsForCombo = new CvwAgentsForCombo();
            //objCvwAgentsForCombo.GetListPaging(9999, 1, "WHERE 1=1", "Name", out _RowCount);

            CShippingLines objCShippingLines = new CShippingLines();
            objCShippingLines.GetList(" WHERE 1=1 ORDER BY Name ");

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                new JavaScriptSerializer().Serialize(objCPorts.lstCVarPorts)//data[0]
                , new JavaScriptSerializer().Serialize(objCShippingLines.lstCVarShippingLines)//data[1]
                //, new JavaScriptSerializer().Serialize(objCvwBranches.lstCVarvwBranches)//data[1]
                //, new JavaScriptSerializer().Serialize(objCCustomers.lstCVarCustomers)//data[2]
                //, new JavaScriptSerializer().Serialize(objCvwCurrencies.lstCVarvwCurrencies)//data[3]
                //, new JavaScriptSerializer().Serialize(objCNoAccessQuoteAndOperStages.lstCVarNoAccessQuoteAndOperStages)//data[4]
                //, new JavaScriptSerializer().Serialize(objCVessels.lstCVarVessels)//data[6]
                //, new JavaScriptSerializer().Serialize(objCTrackingStage.lstCVarTrackingStage)//data[7]
                //, new JavaScriptSerializer().Serialize(objCCommodities.lstCVarCommodities)//data[8]
                //, serializer.Serialize(objCvwAgentsForCombo.lstCVarvwAgentsForCombo)//data[9]
                //, new JavaScriptSerializer().Serialize(objCNetwork.lstCVarNetwork)//data[10]
            };
        }


        [HttpGet, HttpPost]
        public object[] LoadData(string pWhereClause)
        {
            bool pRecordsExist = false;
            Exception checkException = null;
            int _RowCount = 0;

            CvwOperationContainersAndPackages objCvwOperationContainersAndPackages = new CvwOperationContainersAndPackages();
            checkException = objCvwOperationContainersAndPackages.GetListPaging(99999, 1, pWhereClause, "GateOutDate", out _RowCount);

            if (objCvwOperationContainersAndPackages.lstCVarvwOperationContainersAndPackages.Count > 0 && checkException == null)
                pRecordsExist = true;

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] 
            {
                pRecordsExist //data[0]
                , serializer.Serialize(objCvwOperationContainersAndPackages.lstCVarvwOperationContainersAndPackages) //data[1]
            };
        }

    }
}

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
    public class FlexiTankStatusController : ApiController
    {
        [HttpGet, HttpPost]//pID : is the InvoiceID
        public object[] GetStatisticsFilter()
        {
            int _RowCount = 0;
            //CvwUsers objCvwUsers = new CvwUsers();
            //objCvwUsers.GetList(" WHERE 1=1 ORDER BY Name ");

            //CvwBranches objCvwBranches = new CvwBranches();
            //objCvwBranches.GetList(" WHERE 1=1 ORDER BY Name ");

            //CCustomers objCCustomers = new CCustomers();
            ////objCCustomers.GetList(" WHERE 1=1 ORDER BY Name ");

            //CvwAgentsForCombo objCvwAgentsForCombo = new CvwAgentsForCombo();
            //objCvwAgentsForCombo.GetListPaging(9999, 1, "WHERE 1=1", "Name", out _RowCount);

            //CvwCurrencies objCvwCurrencies = new CvwCurrencies();
            //objCvwCurrencies.GetList(" WHERE 1=1 ORDER BY Code ");

            //CNoAccessQuoteAndOperStages objCNoAccessQuoteAndOperStages = new CNoAccessQuoteAndOperStages();
            //objCNoAccessQuoteAndOperStages.GetList(" WHERE IsOperationStage = 1 AND IsInActive = 0 ORDER BY ViewOrder ");

            //CShippingLines objCShippingLines = new CShippingLines();
            //objCShippingLines.GetList(" WHERE 1=1 ORDER BY Name ");

            //CVessels objCVessels = new CVessels();
            //objCVessels.GetList(" WHERE 1=1 ORDER BY Name ");

            //CNetwork objCNetwork = new CNetwork();
            //objCNetwork.GetList(" WHERE 1=1 ORDER BY Name ");

            //CCommodities objCCommodities = new CCommodities();
            //objCCommodities.GetList("ORDER BY Name");

            //CTrackingStage objCTrackingStage = new CTrackingStage();
            //objCTrackingStage.GetList("ORDER BY Name");

            //CMoveTypes objCMoveTypes = new CMoveTypes();
            //objCMoveTypes.GetList(" WHERE 1=1 ORDER BY Name ");

            //CCountries objCCountries = new CCountries();
            //objCCountries.GetList(" WHERE 1=1 ORDER BY Name ");

            //CCustomsClearanceAgents objCCustomsClearanceAgents = new CCustomsClearanceAgents();
            //objCCustomsClearanceAgents.GetList(" WHERE 1=1 ORDER BY Name ");

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                //new JavaScriptSerializer().Serialize(objCvwUsers.lstCVarvwUsers)//data[0]
                //, new JavaScriptSerializer().Serialize(objCvwBranches.lstCVarvwBranches)//data[1]
                //, new JavaScriptSerializer().Serialize(objCCustomers.lstCVarCustomers)//data[2]
                //, new JavaScriptSerializer().Serialize(objCvwCurrencies.lstCVarvwCurrencies)//data[3]
                //, new JavaScriptSerializer().Serialize(objCNoAccessQuoteAndOperStages.lstCVarNoAccessQuoteAndOperStages)//data[4]
                //, new JavaScriptSerializer().Serialize(objCShippingLines.lstCVarShippingLines)//data[5]
                //, new JavaScriptSerializer().Serialize(objCVessels.lstCVarVessels)//data[6]
                //, new JavaScriptSerializer().Serialize(objCTrackingStage.lstCVarTrackingStage)//data[7]
                //, new JavaScriptSerializer().Serialize(objCCommodities.lstCVarCommodities)//data[8]
                //, serializer.Serialize(objCvwAgentsForCombo.lstCVarvwAgentsForCombo)//data[9]
                //, new JavaScriptSerializer().Serialize(objCNetwork.lstCVarNetwork)//data[10]
                //, new JavaScriptSerializer().Serialize(objCMoveTypes.lstCVarMoveTypes)//data[11]
                //, new JavaScriptSerializer().Serialize(objCCountries.lstCVarCountries)//data[12]
                //, serializer.Serialize(objCCustomsClearanceAgents.lstCVarCustomsClearanceAgents)//data[13]
            };
        }

        [HttpGet, HttpPost]
        public object[] LoadData(string pWhereClause)
        {
            bool pRecordsExist = false;
            Exception checkException = null;
            int _RowCount = 0;

            CvwFlexiSerial_OpeningBalance objCvwFlexiSerial_OpeningBalance = new CvwFlexiSerial_OpeningBalance();
            checkException = objCvwFlexiSerial_OpeningBalance.GetListPaging(99999, 1, pWhereClause, "ID", out _RowCount);

            CvwFlexiSerial objCvwFlexiSerial = new CvwFlexiSerial();
            checkException = objCvwFlexiSerial.GetListPaging(99999, 1, pWhereClause, "ID", out _RowCount);

            if (objCvwFlexiSerial.lstCVarvwFlexiSerial.Count > 0 && checkException == null)
                pRecordsExist = true;

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] 
            {
                1//pRecordsExist //data[0]
                , serializer.Serialize(objCvwFlexiSerial.lstCVarvwFlexiSerial) //data[1]
                , serializer.Serialize(objCvwFlexiSerial_OpeningBalance.lstCVarvwFlexiSerial_OpeningBalance) //data[2]
            };
        }
    }
}

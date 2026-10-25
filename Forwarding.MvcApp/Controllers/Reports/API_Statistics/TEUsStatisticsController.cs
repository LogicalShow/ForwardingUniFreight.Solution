using Forwarding.MvcApp.Models.Administration.Security.Generated;
using Forwarding.MvcApp.Models.Administration.Settings.Generated;
using Forwarding.MvcApp.Models.MasterData.Invoicing.Generated;
using Forwarding.MvcApp.Models.MasterData.Locations.Generated;
using Forwarding.MvcApp.Models.MasterData.Partners.Generated;
using Forwarding.MvcApp.Models.NoAccess.Generated;
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
    public class TEUsStatisticsController : ApiController
    {

        public class OperationsTEUs
        {
            public string MonthYear { get; set; }
            public Int32 NoOfOperations { get; set; }
            public Int32 TEUs { get; set; }
        }

        public class StatisticsData //holds Client/Line/Agent/POL/POD grouped TEUs
        {
            public string Name { get; set; }
            public Int32 TEUs { get; set; }
        }


        [HttpGet, HttpPost]
        public object[] GetStatisticsFilter()
        {
            CvwUsers objCvwUsers = new CvwUsers();
            objCvwUsers.GetList(" WHERE IsNull(CustomerID , 0) = 0 AND 1=1 ORDER BY Name ");

            CvwBranches objCvwBranches = new CvwBranches();
            objCvwBranches.GetList(" WHERE 1=1 ORDER BY Name ");

            CCustomers objCCustomers = new CCustomers();
            //objCCustomers.GetList(" WHERE 1=1 ORDER BY Name ");

            CAgents objCAgents = new CAgents();
            objCAgents.GetList(" WHERE 1=1 ORDER BY Name ");

            CShippingLines objCShippingLines = new CShippingLines();
            objCShippingLines.GetList(" WHERE 1=1 ORDER BY Name ");

            CAirlines objCAirlines = new CAirlines();
            objCAirlines.GetList(" WHERE 1=1 ORDER BY Name ");

            CTruckers objCTruckers = new CTruckers();
            objCTruckers.GetList(" WHERE 1=1 ORDER BY Name ");

            CCountries objCCountries = new CCountries();
            objCCountries.GetList(" WHERE 1=1 ORDER BY Name ");

            CvwCurrencies objCvwCurrencies = new CvwCurrencies();
            objCvwCurrencies.GetList(" WHERE 1=1 ORDER BY Code ");

            CNoAccessQuoteAndOperStages objCNoAccessQuoteAndOperStages = new CNoAccessQuoteAndOperStages();
            objCNoAccessQuoteAndOperStages.GetList(" WHERE IsOperationStage = 1 AND IsInActive = 0 ORDER BY ViewOrder ");

            return new object[] { 
                new JavaScriptSerializer().Serialize(objCvwUsers.lstCVarvwUsers)//data[0]
                , new JavaScriptSerializer().Serialize(objCvwBranches.lstCVarvwBranches)//data[1]
                , new JavaScriptSerializer().Serialize(objCCustomers.lstCVarCustomers)//data[2]
                , new JavaScriptSerializer().Serialize(objCvwCurrencies.lstCVarvwCurrencies)//data[3]
                , new JavaScriptSerializer().Serialize(objCNoAccessQuoteAndOperStages.lstCVarNoAccessQuoteAndOperStages)//data[4]
                , new JavaScriptSerializer().Serialize(objCAgents.lstCVarAgents)//data[5]
                , new JavaScriptSerializer().Serialize(objCShippingLines.lstCVarShippingLines)//data[6]
                , new JavaScriptSerializer().Serialize(objCAirlines.lstCVarAirlines)//data[7]
                , new JavaScriptSerializer().Serialize(objCTruckers.lstCVarTruckers)//data[8]
                , new JavaScriptSerializer().Serialize(objCCountries.lstCVarCountries)//data[9]
            };
        }

        [HttpGet, HttpPost]
        public object[] LoadData(string pWhereClause, Int32 pStatisticsFor)
        {
            bool pRecordsExist = false;
            Exception checkException = null;
            var pLstStatisticsData = new List<StatisticsData>(); //holds Client/Line/Agent/POL/POD grouped TEUs
            var pLstOperationsTEUs = new List<OperationsTEUs>();

            var pStatisticsTotalTEUs = 0;
            var pOperationsTotalNo = 0;
            var pOperationsTotalTEUs = 0;

            CvwOperations objCvwOperations = new CvwOperations();
            checkException = objCvwOperations.GetList(pWhereClause);

            if (objCvwOperations.lstCVarvwOperations.Count > 0 && checkException == null)
            {
                pRecordsExist = true;
                #region Getting pLstStatisticsData
                if (pStatisticsFor == 1) //Statitics for Clients
                {
                    var groupedStatisticsData = objCvwOperations.lstCVarvwOperations.GroupBy(d => d.ClientID)
                            .Select(g => new
                            {
                                Name = g.First().ClientName
                                ,
                                TEUs = g.Sum(s => s.TEUs)
                            });
                    groupedStatisticsData = groupedStatisticsData.OrderBy(o => o.Name);
                    foreach (var row in groupedStatisticsData)
                    {
                        pLstStatisticsData.Add(new StatisticsData
                        {
                            Name = row.Name
                            ,
                            TEUs = row.TEUs
                        });
                    }
                    pStatisticsTotalTEUs = groupedStatisticsData.Sum(s => s.TEUs);
                }
                else if (pStatisticsFor == 2) //Statitics for Agents
                {
                    var groupedStatisticsData = objCvwOperations.lstCVarvwOperations.GroupBy(d => d.AgentID)
                            .Select(g => new
                            {
                                Name = g.First().AgentName
                                ,
                                TEUs = g.Sum(s => s.TEUs)
                            });
                    groupedStatisticsData = groupedStatisticsData.OrderBy(o => o.Name);
                    foreach (var row in groupedStatisticsData)
                    {
                        pLstStatisticsData.Add(new StatisticsData
                        {
                            Name = row.Name
                            ,
                            TEUs = row.TEUs
                        });
                    }
                    pStatisticsTotalTEUs = groupedStatisticsData.Sum(s => s.TEUs);
                }
                else if (pStatisticsFor == 3) //Statitics for Lines
                {
                    var groupedStatisticsData = objCvwOperations.lstCVarvwOperations.GroupBy(d => d.LineID)
                            .Select(g => new
                            {
                                Name = g.First().LineName
                                ,
                                TEUs = g.Sum(s => s.TEUs)
                            });
                    groupedStatisticsData = groupedStatisticsData.OrderBy(o => o.Name);
                    foreach (var row in groupedStatisticsData)
                    {
                        pLstStatisticsData.Add(new StatisticsData
                        {
                            Name = row.Name
                            ,
                            TEUs = row.TEUs
                        });
                    }
                    pStatisticsTotalTEUs = groupedStatisticsData.Sum(s => s.TEUs);
                }
                else if (pStatisticsFor == 4) //Statitics for POLs
                {
                    var groupedStatisticsData = objCvwOperations.lstCVarvwOperations.GroupBy(d => d.POL)
                            .Select(g => new
                            {
                                Name = g.First().POLName
                                ,
                                TEUs = g.Sum(s => s.TEUs)
                            });
                    groupedStatisticsData = groupedStatisticsData.OrderBy(o => o.Name);
                    foreach (var row in groupedStatisticsData)
                    {
                        pLstStatisticsData.Add(new StatisticsData
                        {
                            Name = row.Name
                            ,
                            TEUs = row.TEUs
                        });
                    }
                    pStatisticsTotalTEUs = groupedStatisticsData.Sum(s => s.TEUs);
                }
                else if (pStatisticsFor == 5) //Statitics for PODs
                {
                    var groupedStatisticsData = objCvwOperations.lstCVarvwOperations.GroupBy(d => d.POD)
                            .Select(g => new
                            {
                                Name = g.First().PODName
                                ,
                                TEUs = g.Sum(s => s.TEUs)
                            });
                    groupedStatisticsData = groupedStatisticsData.OrderBy(o => o.Name);
                    foreach (var row in groupedStatisticsData)
                    {
                        pLstStatisticsData.Add(new StatisticsData
                        {
                            Name = row.Name
                            ,
                            TEUs = row.TEUs
                        });
                    }
                    pStatisticsTotalTEUs = groupedStatisticsData.Sum(s => s.TEUs);
                }
                #endregion Getting pLstStatisticsData
                #region OperationsTEUs
                objCvwOperations.lstCVarvwOperations.OrderBy(d => d.OpenDate);
                var groupedOperationsTEUs = objCvwOperations.lstCVarvwOperations.GroupBy(d => d.MonthYear)
                        .Select(g => new
                        {
                            MonthYear = g.First().MonthYear
                            ,
                            NoOfOperations = g.Where(w => w.BLType != 2).Count()
                            , TEUs = g.Sum(s => s.TEUs)
                        });
                groupedOperationsTEUs = groupedOperationsTEUs.Reverse();
                foreach (var row in groupedOperationsTEUs)
                {
                    pLstOperationsTEUs.Add(new OperationsTEUs
                    {
                        MonthYear = row.MonthYear
                        , NoOfOperations = row.NoOfOperations
                        , TEUs = row.TEUs
                    });
                }
                pOperationsTotalNo = groupedOperationsTEUs.Sum(s => s.NoOfOperations);
                pOperationsTotalTEUs = groupedOperationsTEUs.Sum(s => s.TEUs);
                #endregion OperationsTEUs
            }
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] 
            {
                pRecordsExist //data[0]
                , serializer.Serialize(objCvwOperations.lstCVarvwOperations) //data[1]
                , serializer.Serialize(pLstStatisticsData) //data[2]
                , pStatisticsTotalTEUs //data[3]
                , serializer.Serialize(pLstOperationsTEUs) //data[4]
                , pOperationsTotalNo //data[5]
                , pOperationsTotalTEUs //data[6]
            };
        }
    }
}

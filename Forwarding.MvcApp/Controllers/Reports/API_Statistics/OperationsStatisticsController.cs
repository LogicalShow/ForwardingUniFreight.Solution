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

namespace Forwarding.MvcApp.Controllers.Reports.API_Statistics
{
    public class OperationsStatisticsController : ApiController
    {
        [HttpGet, HttpPost]//pID : is the InvoiceID
        public object[] GetStatisticsFilter()
        {
            int _RowCount = 0;
            CvwUsers objCvwUsers = new CvwUsers();
            objCvwUsers.GetList(" WHERE IsNull(CustomerID , 0) = 0 AND 1=1 ORDER BY Name ");

            CvwBranches objCvwBranches = new CvwBranches();
            objCvwBranches.GetList(" WHERE 1=1 ORDER BY Name ");

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
            };
        }

        [HttpGet, HttpPost]
        public object[] LoadData(string pWhereClause, string pWhereClauseForOperationsTable/*, bool pIsFilterInvoices, string pFromInvoiceDate, string pToInvoiceDate*/
            , bool pIsWithCurrenciesDetailed, bool pIsWithChargesDetailed, bool pIsAllChargeTypesChecked, string pSelectedChargeTypes
            , string pSelectedColumns
            , string pFromOpenDate, string pToOpenDate, string pFromCloseDate, string pToCloseDate
            , string pOperationManID, string pShippingLineID, string pAirlineID, string pVesselID
            , string pTrackingStageID, string pIsTaskDone, string pIsClearanceTask
            , string pFromDate_ETD, string pToDate_ETD, string pFromDate_ETA, string pToDate_ETA, bool pDocInfo, int ApprovalFilter = 0)
        {

            bool pRecordsExist = false;
            Exception checkException = null;
            int _RowCount = 0;
            var constOperationsFormID = 29;//OperationsManagement
            //var constQuotationsFormID = 28; //QuotationsManagement
            

            CvwUserForms objCvwUserForms = new CvwUserForms();
            objCvwUserForms.GetList("WHERE UserID=" + WebSecurity.CurrentUserId.ToString() + " AND FormID=" + constOperationsFormID.ToString());

            bool _IsHideOthersRecords = objCvwUserForms.lstCVarvwUserForms[0].HideOthersRecords;

            #region RoleUsersShareRecords
            bool _IsUsersShareRecords = objCvwUserForms.lstCVarvwUserForms[0].IsUsersShareRecords;
            int _RoleID = objCvwUserForms.lstCVarvwUserForms[0].RoleID;
            if (_IsUsersShareRecords)
                pWhereClause += " AND (CreatorRoleID=" + _RoleID + " OR SalesmanRoleID=" + _RoleID + " OR OperationManRoleID=" + _RoleID + ")";
            else if (_IsHideOthersRecords)
                pWhereClause += " AND (CreatorUserID=" + WebSecurity.CurrentUserId + " OR SalesmanID=" + WebSecurity.CurrentUserId + " OR OperationManID=" + WebSecurity.CurrentUserId + ")";
            #endregion RoleUsersShareRecords

            CDefaults objCDefaults = new CDefaults();
            objCDefaults.GetList("WHERE 1=1");
            string[] MescoCompanies = new string[5] { "MES", "SAC", "GLO", "EUR", "ALT" };
            bool IsMescoCompany = MescoCompanies.Contains(objCDefaults.lstCVarDefaults[0].UnEditableCompanyName);

            CvwOperationsStatistics objCvwOperationsStatistics = new CvwOperationsStatistics();
            var OperationsList = objCvwOperationsStatistics.lstCVarvwOperationsStatistics;
            //if (pIsFilterInvoices)
            //{
            //    checkException = objCvwOperationsStatistics.GetListPaging_FilterInvoices(99999, 1, pWhereClause, "ID", pFromInvoiceDate, pToInvoiceDate, out _RowCount);

            //    //OperationsList = objCCustomizedDBCall.ExecuteQuery_ListOfObjects(
            //    //    "select " + pSelectedColumns + " ,dbo.GetInvoices(ID,'" + pFromInvoiceDate + "','" + pToInvoiceDate + "') AS InvoiceNumbers2 from vwOperationsStatistics " + pWhereClause
            //    //    , typeof(CVarvwOperationsStatistics)).Cast<CVarvwOperationsStatistics>().ToList();

            //    OperationsList = objCvwOperationsStatistics.lstCVarvwOperationsStatistics;
            //}
            //else
            //{




            //checkException = objCvwOperationsStatistics.GetListPaging(99999, 1, pWhereClause, "ID", out _RowCount);




            CCustomizedDBCall objCCustomizedDBCall_FisrtID = new CCustomizedDBCall();
            string pFirstID = objCCustomizedDBCall_FisrtID.CallStringFunction("SELECT TOP 1 ID FROM Operations " + pWhereClauseForOperationsTable + " ORDER BY ID");

            CCustomizedDBCall objCCustomizedDBCall_LastID = new CCustomizedDBCall();
            string pLastID = objCCustomizedDBCall_FisrtID.CallStringFunction("SELECT TOP 1 ID FROM Operations " + pWhereClauseForOperationsTable + " ORDER BY ID DESC");

            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
            if(ApprovalFilter > 0 && pFirstID != "" && pLastID != "")
            {
                OperationsList = objCCustomizedDBCall.ExecuteQuery_ListOfObjects(
                "select DISTINCT " + pSelectedColumns + " from " + (ApprovalFilter == 1 ? "vwOperationsStatisticsApproved " : "vwOperationsStatisticsNotApproved ") + pWhereClause + " AND ID>=" + pFirstID + " AND ID<=" + pLastID
                , typeof(CVarvwOperationsStatistics)).Cast<CVarvwOperationsStatistics>().ToList();
            }
            else if (pFirstID != "" && pLastID != "")
            {
                OperationsList = objCCustomizedDBCall.ExecuteQuery_ListOfObjects(
                "select DISTINCT " + pSelectedColumns + " from vwOperationsStatistics " + pWhereClause + " AND ID>=" + pFirstID + " AND ID<=" + pLastID
                , typeof(CVarvwOperationsStatistics)).Cast<CVarvwOperationsStatistics>().ToList();

            }
            CCustomizedDBCall _operationsDates = new CCustomizedDBCall();
            dynamic OperationsDates;
            if (objCDefaults.lstCVarDefaults[0].UnEditableCompanyName == "BED" && !pIsWithCurrenciesDetailed && !pIsWithChargesDetailed && !pIsAllChargeTypesChecked && !pDocInfo)
            {
                var operationsDates = _operationsDates.ExecuteQuery_ListOfObjects(
                "select ID,CreationDate from vwOperations " + pWhereClause + " AND ID>=" + pFirstID + " AND ID<=" + pLastID
                , typeof(CVarOperations)).Cast<CVarOperations>().ToList();
                OperationsDates = operationsDates.Select(o =>
                new {
                    ID = o.ID,
                    CreationDate = o.CreationDate
                }).ToList();
            } else
            {
                OperationsDates = new List<CVarOperations>();
            }

            // filter In C#

            DateTime FromOpenDate = DateTime.Parse(pFromOpenDate);
            DateTime ToOpenDate = DateTime.Parse(pToOpenDate);

            OperationsList = OperationsList.Where(i => i.OpenDate >= FromOpenDate && i.OpenDate <= ToOpenDate)
                .Cast<CVarvwOperationsStatistics>().ToList();



            if (!string.IsNullOrEmpty(pFromCloseDate))
            {
                DateTime FromCloseDate = DateTime.Parse(pFromCloseDate);

                OperationsList = OperationsList.Where(i => i.CloseDate >= FromCloseDate)
                .Cast<CVarvwOperationsStatistics>().ToList();
            }

            if (!string.IsNullOrEmpty(pToCloseDate))
            {
                DateTime ToCloseDate = DateTime.Parse(pToCloseDate);

                OperationsList = OperationsList.Where(i => i.CloseDate <= ToCloseDate)
                .Cast<CVarvwOperationsStatistics>().ToList();
            }


            if (!string.IsNullOrEmpty(pOperationManID))
            {
                OperationsList = OperationsList.Where(i => i.OperationManID == int.Parse(pOperationManID))
                .Cast<CVarvwOperationsStatistics>().ToList();
            }

            if (!string.IsNullOrEmpty(pShippingLineID))
            {
                OperationsList = OperationsList.Where(i => i.ShippingLineID == int.Parse(pShippingLineID))
                .Cast<CVarvwOperationsStatistics>().ToList();
            }

            if (!string.IsNullOrEmpty(pAirlineID))
            {
                OperationsList = OperationsList.Where(i => i.AirlineID == int.Parse(pAirlineID))
                .Cast<CVarvwOperationsStatistics>().ToList();
            }

            if (!string.IsNullOrEmpty(pVesselID))
            {
                OperationsList = OperationsList.Where(i => i.VesselID == int.Parse(pVesselID))
                .Cast<CVarvwOperationsStatistics>().ToList();
            }


            if (!string.IsNullOrEmpty(pFromDate_ETD))
            {
                OperationsList = OperationsList.Where(i => i.ExpectedDeparture >= DateTime.Parse(pFromDate_ETD))
                .Cast<CVarvwOperationsStatistics>().ToList();
            }
            if (!string.IsNullOrEmpty(pToDate_ETD))
            {
                OperationsList = OperationsList.Where(i => i.ExpectedDeparture <= DateTime.Parse(pToDate_ETD))
                .Cast<CVarvwOperationsStatistics>().ToList();
            }
            if (!string.IsNullOrEmpty(pFromDate_ETA))
            {
                OperationsList = OperationsList.Where(i => i.ExpectedArrival >= DateTime.Parse(pFromDate_ETA))
                .Cast<CVarvwOperationsStatistics>().ToList();
            }
            if (!string.IsNullOrEmpty(pToDate_ETA))
            {
                OperationsList = OperationsList.Where(i => i.ExpectedArrival <= DateTime.Parse(pToDate_ETA))
                .Cast<CVarvwOperationsStatistics>().ToList();
            }







            // if Task is selected or Task Status is selected or clearance is checked
            if (!string.IsNullOrEmpty(pTrackingStageID) || !string.IsNullOrEmpty(pIsTaskDone) || bool.Parse(pIsClearanceTask))
            {
                CvwOperationTracking OperationTrackingList = new CvwOperationTracking();
                int NumberOfOperationTracking = 0;
                OperationTrackingList.GetListPaging(999999, 1, "WHERE 1=1", "ID DESC", out NumberOfOperationTracking);

                CvwCustomClearanceTracking CustomClearanceTrackingList = new CvwCustomClearanceTracking();
                int NumberOfCustomClearanceTracking = 0;
                CustomClearanceTrackingList.GetListPaging(999999, 1, "WHERE 1=1", "ID DESC", out NumberOfCustomClearanceTracking);


                //if you choose a specific task
                if (!string.IsNullOrEmpty(pTrackingStageID))    // means if ($("#slTrackingStage").val() != "")
                {
                    //Case Clearance is checked
                    if (bool.Parse(pIsClearanceTask))
                    {
                        if (pIsTaskDone == "" || pIsTaskDone == null)
                        {
                            // search with pTrackingStageID in CustomClearanceTrackingList
                            OperationsList = OperationsList.Where(os => CustomClearanceTrackingList.lstCVarvwCustomClearanceTracking.Any(
                                ot => ot.OperationID == os.ID
                                && ot.TrackingStageID == int.Parse(pTrackingStageID)
                                )).Cast<CVarvwOperationsStatistics>().ToList();
                        }
                        else
                        {
                            // search with pTrackingStageID and pIsTaskDone in CustomClearanceTrackingList
                            OperationsList = OperationsList.Where(os => CustomClearanceTrackingList.lstCVarvwCustomClearanceTracking.Any(
                                ot => ot.OperationID == os.ID
                                && ot.TrackingStageID == int.Parse(pTrackingStageID)
                                && ot.Done == (pIsTaskDone == "1" ? true : false)
                                )).Cast<CVarvwOperationsStatistics>().ToList();
                        }

                    }
                    else //Case Clearance is not checked
                    {
                        if (pIsTaskDone == "" || pIsTaskDone == null)
                        {
                            // search with pTrackingStageID in OperationTrackingList
                            if (objCDefaults.lstCVarDefaults[0].UnEditableCompanyName == "ORI")
                            {
                                OperationsList = OperationsList.Where(os => OperationTrackingList.lstCVarvwOperationTracking.Where(o => o.OperationID == os.ID).Take(1).Any(
                                    ot => ot.OperationID == os.ID
                                    && ot.TrackingStageID == int.Parse(pTrackingStageID)
                                    )).Cast<CVarvwOperationsStatistics>().ToList();
                            }
                            else
                            {
                                OperationsList = OperationsList.Where(os => OperationTrackingList.lstCVarvwOperationTracking.Any(
                                    ot => ot.OperationID == os.ID
                                    && ot.TrackingStageID == int.Parse(pTrackingStageID)
                                    )).Cast<CVarvwOperationsStatistics>().ToList();
                            }
                        }
                        else
                        {
                            // search with pTrackingStageID and pIsTaskDone in OperationTrackingList
                            if (objCDefaults.lstCVarDefaults[0].UnEditableCompanyName == "ORI")
                            {
                                OperationsList = OperationsList.Where(os => OperationTrackingList.lstCVarvwOperationTracking.Where(o => o.OperationID == os.ID).Take(1).Any(
                                ot => ot.OperationID == os.ID
                                && ot.TrackingStageID == int.Parse(pTrackingStageID)
                                && ot.Done == (pIsTaskDone == "1" ? true : false)
                                )).Cast<CVarvwOperationsStatistics>().ToList();
                            } else
                            {
                                OperationsList = OperationsList.Where(os => OperationTrackingList.lstCVarvwOperationTracking.Any(
                                ot => ot.OperationID == os.ID
                                && ot.TrackingStageID == int.Parse(pTrackingStageID)
                                && ot.Done == (pIsTaskDone == "1" ? true : false)
                                )).Cast<CVarvwOperationsStatistics>().ToList();
                            }
                        }
                    }
                }
                else //in case of selecting all tasks
                {
                    //Case Clearance is checked
                    if (bool.Parse(pIsClearanceTask))
                    {
                        if (pIsTaskDone == "" || pIsTaskDone == null)
                        {
                            // search in CustomClearanceTrackingList
                            OperationsList = OperationsList.Where(os => CustomClearanceTrackingList.lstCVarvwCustomClearanceTracking.Any(
                                ot => ot.OperationID == os.ID))
                                .Cast<CVarvwOperationsStatistics>().ToList();
                        }
                        else
                        {
                            // search with pIsTaskDone in CustomClearanceTrackingList
                            OperationsList = OperationsList.Where(os => CustomClearanceTrackingList.lstCVarvwCustomClearanceTracking.Any(
                                ot => ot.OperationID == os.ID && ot.Done == (pIsTaskDone == "1" ? true : false)
                                )).Cast<CVarvwOperationsStatistics>().ToList();
                        }

                    }
                    else //Case Clearance is not checked
                    {
                        if (pIsTaskDone == "" || pIsTaskDone == null)
                        {
                            // default case >> no filteration
                            int yyy = 0;
                            //OperationsList = OperationsList.Where(os => OperationTrackingList.lstCVarvwOperationTracking.Any(ot => ot.OperationID == os.ID))
                            //    .Cast<CVarvwOperationsStatistics>().ToList();
                        }
                        else
                        {
                            // search with pIsTaskDone in OperationTrackingList
                            OperationsList = OperationsList.Where(os => OperationTrackingList.lstCVarvwOperationTracking.Any(
                                ot => ot.OperationID == os.ID && ot.Done == (pIsTaskDone == "1" ? true : false)
                                )).Cast<CVarvwOperationsStatistics>().ToList();
                        }
                    }
                }
            }


            ////14-2-2023 ------ Mustafa Mahmoud:

            ////if you choose a specific task
            //if ($("#slTrackingStage").val() != "") {
            //    //Case Clearance is checked
            //    if ($("#cbIsClearanceTask").prop("checked"))
            //        pWhereClause += " AND EXISTS (SELECT top 1 (1) FROM vwCustomClearanceTracking OT WHERE OT.TrackingStageID=" + $("#slTrackingStage").val()
            //            + " AND OT.OperationID = vwOperationsStatistics.ID "
            //            //Task status whether done or not
            //            + ($("#slTrackingStageStatus").val() != "" ? (" AND OT.Done=" + $("#slTrackingStageStatus").val()) : "")
            //            + " ORDER BY OT.ID DESC ) " + " \n";
            //    //Case Clearance is not checked
            //    else
            //        pWhereClause += " AND EXISTS (SELECT top 1 (1) FROM vwOperationTracking OT WHERE OT.TrackingStageID=" + $("#slTrackingStage").val()
            //            + " AND OT.OperationID = vwOperationsStatistics.ID "
            //            + ($("#slTrackingStageStatus").val() != "" ? (" AND OT.Done=" + $("#slTrackingStageStatus").val()) : "")
            //            + " ORDER BY OT.ID DESC ) " + " \n";
            //}

            ////in case of selecting all tasks
            //if ($("#slTrackingStage").val() == "") {
            //    //Case Clearance is checked
            //    if ($("#cbIsClearanceTask").prop("checked"))
            //        pWhereClause += " AND EXISTS (SELECT top 1 (1) FROM vwCustomClearanceTracking OT WHERE OT.OperationID = vwOperationsStatistics.ID "
            //            //Task status whether done or not
            //            + ($("#slTrackingStageStatus").val() != "" ? (" AND OT.Done=" + $("#slTrackingStageStatus").val()) : "")
            //            + " ORDER BY OT.ID DESC ) " + " \n";
            //    //Case Clearance is not checked
            //    else
            //        pWhereClause += ($("#slTrackingStageStatus").val() != "" ?
            //            (" AND EXISTS (SELECT top 1 (1) FROM vwOperationTracking OT WHERE OT.OperationID = vwOperationsStatistics.ID AND OT.Done=" + $("#slTrackingStageStatus").val() + ") \n")
            //            : "")
            //}







            //}













            #region Get Container Totals
            string strStatisticsView = (ApprovalFilter > 0
                ? (ApprovalFilter == 1 ? "vwOperationsStatisticsApproved" : "vwOperationsStatisticsNotApproved")
                : "vwOperationsStatistics");

            string strOperationIDs = (pFirstID != "" && pLastID != "")
                ? "SELECT ID FROM " + strStatisticsView + " " + pWhereClause + " AND ID>=" + pFirstID + " AND ID<=" + pLastID
                : "SELECT 0";

            CvwOperationContainersAndPackages objCvwOperationContainersAndPackages = new CvwOperationContainersAndPackages();
            checkException = objCvwOperationContainersAndPackages.GetListPaging(999999, 1, "WHERE ContainerTypeID IS NOT NULL AND (OperationID IN (" + strOperationIDs + ") OR MasterOperationID IN (" + strOperationIDs + "))", "ID", out _RowCount);
            var pContainerTotals = objCvwOperationContainersAndPackages.lstCVarvwOperationContainersAndPackages
                .GroupBy(g => new { g.ContainerTypeID, g.ContainerTypeCode })
                .Select(g => new
                {
                    Quantity = g.Sum(s => (s.Quantity == 0 ? 1 : s.Quantity))
                    ,
                    ContainerTypeCode = g.First().ContainerTypeCode
                });
            string strContainerTotals = "";
            for (int i = 0; i < pContainerTotals.Count(); i++)
                strContainerTotals += (strContainerTotals == "" ? "" : ", ") + pContainerTotals.ElementAt(i).Quantity + "x" + pContainerTotals.ElementAt(i).ContainerTypeCode;

            var TankNoLst = objCvwOperationContainersAndPackages.lstCVarvwOperationContainersAndPackages.Where(a => !string.IsNullOrWhiteSpace(a.TankOrFlexiNumber) && a.TankOrFlexiNumber!="0").Select(a => new { OperationID = a.OperationID, TankNo = a.TankOrFlexiNumber }).ToList();
            #endregion Get Container Totals
            #region Get Incoterm Totals
            //var pIncotermTotals = objCvwOperationsStatistics.lstCVarvwOperationsStatistics
            var pIncotermTotals = OperationsList
                .GroupBy(g => new { g.IncotermID })
                .Select(g => new
                {
                    IncotermName = g.First().IncotermName
                    ,
                    Count = g.Count()
                }).OrderBy(o => o.IncotermName);
            string strIncotermTotals = "";
            for (int i = 0; i < pIncotermTotals.Count(); i++)
                strIncotermTotals += (strIncotermTotals == "" ? "" : ", ") + pIncotermTotals.ElementAt(i).Count + "x" + (pIncotermTotals.ElementAt(i).IncotermName == "0" ? "UnSpecified" : pIncotermTotals.ElementAt(i).IncotermName);
            #endregion Get Incoterm Totals

            #region vwOperationsStatisticsDetailedWithCurrencies
            CvwOperationsStatisticsDetailedWithCurrencies objCvwOperationsStatisticsDetailedWithCurrencies = new CvwOperationsStatisticsDetailedWithCurrencies();
            if (pIsWithCurrenciesDetailed)
            {
                objCvwOperationsStatisticsDetailedWithCurrencies.GetListPaging(999999, 1, "WHERE ID IN (" + strOperationIDs + ")", "ID", out _RowCount);
            }
            #endregion vwOperationsStatisticsDetailedWithCurrencies




            #region pIsWithChargesDetailed

            CvwPayables objCvwPayables = new CvwPayables();
            var OperationsPayables = objCvwPayables.lstCVarvwPayables;

            CvwReceivables objCvwReceivables = new CvwReceivables();
            var OperationsReceivables = objCvwReceivables.lstCVarvwReceivables;

            //*****************************************************************************
            // CvwReceivables cvwReceivables = new CvwReceivables();
            // cvwReceivables.GetListPaging(999999, 1, "WHERE 1=1", "ID", out _RowCount);
            // //CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
            //var ReceivablesList = objCCustomizedDBCall.ExecuteQuery_ListOfObjects("Select ID,ChargeTypeID,CostAmount,OperationID ,SaleAmount, ExchangeRate From Receivables", typeof(CVarReceivables)).Cast<CVarReceivables>().ToList();
            // CDefaults objCDefaults = new CDefaults();
            // CUsers objCUsers = new CUsers();
            // objCDefaults.GetListPaging(999999, 1, "WHERE 1=1", "ID", out _RowCount);
            // objCUsers.GetListPaging(999999, 1, "WHERE ID=" + WebSecurity.CurrentUserId, "ID", out _RowCount);
            // CDepartmentCharge objCDepartmentCharge = new CDepartmentCharge();
            // var DepartmentCharges = objCCustomizedDBCall.ExecuteQuery_ListOfObjects("SELECT ChargeTypeID From DepartmentCharge WHERE DepartmentId = " + objCUsers.lstCVarUsers[0].DepartmentID,typeof(CVarDepartmentCharge)).Cast<CVarDepartmentCharge>().ToList();


            // var FilteredReceivablesList = ReceivablesList.Where(r  => DepartmentCharges.Select(d => d.ChargeTypeID).Contains(r.ChargeTypeID)).ToList();

            // var GroupedReceivablesList = FilteredReceivablesList.GroupBy(r => r.OperationID).Select(c => new
            // {
            //     OperationId = c.Key ,
            //     TotalSumOfReceivables = c.Sum(r=>r.SaleAmount * r.ExchangeRate)
            // }).ToList();
            //*****************************************************************************
            dynamic OperationsPayablesNew;
            dynamic OperationsReceivablesNew;

            string pWhereClauseForPayablesAndReceivables = " WHERE 1=1 ";
            if (!pIsAllChargeTypesChecked)
            {
                pWhereClauseForPayablesAndReceivables += " AND ChargeTypeID IN (" + pSelectedChargeTypes + ") AND OperationID>=" + pFirstID + " AND OperationID<=" + pLastID;
            }
            if (objCDefaults.lstCVarDefaults[0].UnEditableCompanyName == "IOR")
            {
                pWhereClauseForPayablesAndReceivables += "AND (P.IsPurchased IS NULL OR P.IsPurchased = 0)" ;
            }

                if (pIsWithChargesDetailed && pFirstID != "" && pLastID != "")
            {
                CCustomizedDBCall objCCustomizedDBCall_Payables = new CCustomizedDBCall();
                OperationsPayables = objCCustomizedDBCall_Payables.ExecuteQuery_ListOfObjects(
                "SELECT ID,OperationID,ChargeTypeID,ChargeTypeCode,ChargeTypeName,CostAmount,QuotationCost,TaxAmount,CurrencyID,CurrencyCode FROM vwPayables " + pWhereClauseForPayablesAndReceivables
                , typeof(CVarvwPayables)).Cast<CVarvwPayables>().ToList();
                OperationsPayablesNew = OperationsPayables.Select(pay => new
                {
                    ID = pay.ID,
                    OperationID = pay.OperationID,
                    ChargeTypeID = pay.ChargeTypeID,
                    ChargeTypeCode = pay.ChargeTypeCode,
                    ChargeTypeName = pay.ChargeTypeName,
                    CostAmount = IsMescoCompany ? (pay.CostAmount == 0 ? pay.QuotationCost : pay.CostAmount) : pay.CostAmount,
                    TaxAmount = pay.TaxAmount,
                    CurrencyID = pay.CurrencyID,
                    CurrencyCode = pay.CurrencyCode
                }).ToList();

                CCustomizedDBCall objCCustomizedDBCall_Receivables = new CCustomizedDBCall();
                OperationsReceivables = objCCustomizedDBCall_Receivables.ExecuteQuery_ListOfObjects(
                "SELECT ID,OperationID,ChargeTypeID,ChargeTypeCode,ChargeTypeName,SaleAmount,CostAmount,TaxAmount,CurrencyID,CurrencyCode FROM vwReceivables " + pWhereClauseForPayablesAndReceivables
                , typeof(CVarvwReceivables)).Cast<CVarvwReceivables>().ToList();
                OperationsReceivablesNew = OperationsReceivables.Select(rec => new
                {
                    ID = rec.ID,
                    OperationID = rec.OperationID,
                    ChargeTypeID = rec.ChargeTypeID,
                    ChargeTypeCode = rec.ChargeTypeCode,
                    ChargeTypeName = rec.ChargeTypeName,
                    CostAmount = rec.CostAmount,
                    SaleAmount = rec.SaleAmount,
                    TaxAmount = rec.TaxAmount,
                    CurrencyID = rec.CurrencyID,
                    CurrencyCode = rec.CurrencyCode
                }).ToList();
            } else
            {
                OperationsPayablesNew = null;
                OperationsReceivablesNew = null;

            }

			#endregion pIsWithChargesDetailed

			CDocumentsInfo objCDocumentsInfo = new CDocumentsInfo();
			COperationsDocuments objCOperationsDocuments = new COperationsDocuments();
			if (pDocInfo)
			{
				objCDocumentsInfo.GetList("where ID in (16,31,36,39,81,115,145)");
				var OpIDs = string.Join(",", OperationsList.Select(a => a.ID));
				objCOperationsDocuments.GetList($"where DocumentInfoID in (16,31,36,39,81,115,145) and OperationID in ({OpIDs})");
			}


			if (/*objCvwOperationsStatistics.lstCVarvwOperationsStatistics*/OperationsList.Count > 0 && checkException == null)
                pRecordsExist = true;

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[]
            {
				  pRecordsExist //data[0]
                , serializer.Serialize(/*objCvwOperationsStatistics.lstCVarvwOperationsStatistics*/OperationsList.OrderBy(o => o.ID)) //data[1]
                , strContainerTotals //data[2]
                , strIncotermTotals //data[3]
                , pIsWithCurrenciesDetailed ? serializer.Serialize(objCvwOperationsStatisticsDetailedWithCurrencies.lstCVarvwOperationsStatisticsDetailedWithCurrencies.OrderBy(o => o.ID)) : "CurrenciesNotSelected" //data[4]
                , serializer.Serialize(OperationsPayablesNew) //data[5]
                , serializer.Serialize(OperationsReceivablesNew) //data[6]
                , serializer.Serialize(TankNoLst) //data[7]
                , serializer.Serialize(objCDocumentsInfo.lstCVarDocumentsInfo) //data[8]
                , serializer.Serialize(objCOperationsDocuments.lstCVarOperationsDocuments) //data[9]
                //,serializer.Serialize(cvwReceivables.lstCVarvwReceivables) //data[10]
                , serializer.Serialize(OperationsDates) //data[10]
                , serializer.Serialize(/*objCvwOperationsStatistics.lstCVarvwOperationsStatistics*/OperationsList.OrderBy(o => o.NetworkName != "" ? 0 : 1).ThenBy(o => o.NetworkName)) //data[11]
                
            };
        }

        [HttpGet, HttpPost]
		public object[] LoadForm13Data(string pSelectedColumns, string pWhereClause, string pCompanyName)
		{
			bool pRecordsExist = false;
			Exception checkException = null;
			var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };

			if (pCompanyName == "MED")
			{
				COperations objCOperations = new COperations();
				checkException = objCOperations.GetList("WHERE 1=1");

				CvwOperationsStatistics objCvwOperationsStatistics = new CvwOperationsStatistics();
				var OperationsList = objCvwOperationsStatistics.lstCVarvwOperationsStatistics;

				CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();

				OperationsList = objCCustomizedDBCall.ExecuteQuery_ListOfObjects(
						"select distinct " + pSelectedColumns + " from vwOperationsStatistics " + pWhereClause
						, typeof(CVarvwOperationsStatistics)).Cast<CVarvwOperationsStatistics>().ToList();

				if (OperationsList.Count > 0)
				{
					OperationsList = OperationsList.Cast<CVarvwOperationsStatistics>().ToList();
				}

				if (OperationsList.Count > 0)
				{
					var Form13Operations = OperationsList.Join(objCOperations.lstCVarOperations, os => os.ID, o => o.ID, (os, o) => new
					{
						ID = o.ID,
						Code = os.Code,
						ClientName = os.ClientName,
						POLName = os.POLName,
						PODName = os.PODName,
						CertificateDate = os.CertificateDate,
						Form13Number = os.Form13Number,
						Form13Date = o.Form13Date,
						Form13Notes = o.Form13Notes,
						BranchName = os.BranchName
					}).OrderBy(i => i.ID).ToList();

					if (Form13Operations.Count > 0 && checkException == null)
						pRecordsExist = true;


					return new object[] {
				pRecordsExist,
				serializer.Serialize(Form13Operations)
				};
				}
			}
			else
			{
				CvwCcForm13_rpt objCvwCcForm13_rpt = new CvwCcForm13_rpt();
				checkException = objCvwCcForm13_rpt.GetList(pWhereClause);
				if (objCvwCcForm13_rpt.lstCVarvwCcForm13_rpt.Count > 0)
					pRecordsExist = true;

				return new object[] {
				pRecordsExist,
				serializer.Serialize(objCvwCcForm13_rpt.lstCVarvwCcForm13_rpt)
				};
			}




			return new object[] {
				pRecordsExist
			};
		}
	}
}

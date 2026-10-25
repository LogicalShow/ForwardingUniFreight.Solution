using Forwarding.MvcApp.Models.Administration.Security.Generated;
using Forwarding.MvcApp.Models.Administration.Settings.Generated;
using Forwarding.MvcApp.Models.CRM.Generated;
using Forwarding.MvcApp.Models.NoAccess.Generated;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;

namespace Forwarding.MvcApp.Controllers.Reports.API_Statistics
{
    public class BusinessVolumeController : ApiController
    {
        #region CommissionTarget
        [HttpGet, HttpPost]
        public object[] LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned(bool pIsLoadArrayOfObjects, string pLanguage, Int32 pPageNumber, Int32 pPageSize, string pWhereClause, string pOrderBy)
        {
            int _RowCount = 0;
            Exception checkException = null;
            CvwCRM_CommissionTargetHeader objCCvwCRM_CommissionTargetHeader = new CvwCRM_CommissionTargetHeader();
            CUsers objCUsers = new CUsers();
            CBranches objCBranches = new CBranches();
            if (pIsLoadArrayOfObjects)
            {
                checkException = objCUsers.GetList("where IsNull(CustomerID , 0) = 0 AND 1 = 1 ORDER BY Name");
                checkException = objCBranches.GetList("ORDER BY ID");
            }
            checkException = objCCvwCRM_CommissionTargetHeader.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);
            return new object[] {
                new JavaScriptSerializer().Serialize(objCCvwCRM_CommissionTargetHeader.lstCVarvwCRM_CommissionTargetHeader)
                //new JavaScriptSerializer().Serialize(pCommissionTargetHeader.ToList())
                , _RowCount //pCommissionTargetHeader.ToList().Count
                , new JavaScriptSerializer().Serialize(objCUsers.lstCVarUsers) //pUser=pData[2]
                , new JavaScriptSerializer().Serialize(objCBranches.lstCVarBranches) //pTargetType=pData[3]
            };
        }

        [HttpGet, HttpPost]
        public object[] Save(Int32 pSalesmanID, Int32 pTargetYear, Int32 pTargetTypeID, string pNotes
            , Int32 pID1, decimal pAmount1, decimal pPercentage1, Int32 pID2, decimal pAmount2, decimal pPercentage2
            , Int32 pID3, decimal pAmount3, decimal pPercentage3, Int32 pID4, decimal pAmount4, decimal pPercentage4
            , Int32 pID5, decimal pAmount5, decimal pPercentage5, Int32 pID6, decimal pAmount6, decimal pPercentage6
            , Int32 pID7, decimal pAmount7, decimal pPercentage7, Int32 pID8, decimal pAmount8, decimal pPercentage8
            , Int32 pID9, decimal pAmount9, decimal pPercentage9, Int32 pID10, decimal pAmount10, decimal pPercentage10
            , Int32 pID11, decimal pAmount11, decimal pPercentage11, Int32 pID12, decimal pAmount12, decimal pPercentage12)
        {
            string strMessage = "";
            Exception checkException = null;
            CCRM_CommissionTarget objCCRM_CommissionTarget = new CCRM_CommissionTarget();
            //CvwCRM_CommissionTarget objCvwCRM_CommissionTarget = new CvwCRM_CommissionTarget();
            int _RowCount = 0;
            #region Save
            CVarCRM_CommissionTarget objCVarCRM_CommissionTarget = new CVarCRM_CommissionTarget();
            objCVarCRM_CommissionTarget.ID = pID1;
            objCVarCRM_CommissionTarget.SalesmanID = pSalesmanID;
            objCVarCRM_CommissionTarget.TargetMonth = 1;
            objCVarCRM_CommissionTarget.TargetYear = pTargetYear;
            objCVarCRM_CommissionTarget.TargetTypeID = pTargetTypeID;
            objCVarCRM_CommissionTarget.Amount = pAmount1;
            objCVarCRM_CommissionTarget.Percentage = pPercentage1;
            objCVarCRM_CommissionTarget.Notes = pNotes;
            //objCVarCRM_CommissionTarget.ArrivalDate = objCVarCRM_CommissionTarget.ReceiveDate; //DateTime.ParseExact(pArrivalDate + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture);
            objCVarCRM_CommissionTarget.CreatorUserID = objCVarCRM_CommissionTarget.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarCRM_CommissionTarget.CreationDate = objCVarCRM_CommissionTarget.ModificationDate = DateTime.Now;
            objCCRM_CommissionTarget.lstCVarCRM_CommissionTarget.Add(objCVarCRM_CommissionTarget);
            checkException = objCCRM_CommissionTarget.SaveMethod(objCCRM_CommissionTarget.lstCVarCRM_CommissionTarget);

            objCVarCRM_CommissionTarget.ID = pID2;
            objCVarCRM_CommissionTarget.SalesmanID = pSalesmanID;
            objCVarCRM_CommissionTarget.TargetMonth = 2;
            objCVarCRM_CommissionTarget.TargetYear = pTargetYear;
            objCVarCRM_CommissionTarget.TargetTypeID = pTargetTypeID;
            objCVarCRM_CommissionTarget.Amount = pAmount2;
            objCVarCRM_CommissionTarget.Percentage = pPercentage2;
            objCVarCRM_CommissionTarget.Notes = pNotes;
            objCVarCRM_CommissionTarget.CreatorUserID = objCVarCRM_CommissionTarget.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarCRM_CommissionTarget.CreationDate = objCVarCRM_CommissionTarget.ModificationDate = DateTime.Now;
            objCCRM_CommissionTarget.lstCVarCRM_CommissionTarget.Add(objCVarCRM_CommissionTarget);
            checkException = objCCRM_CommissionTarget.SaveMethod(objCCRM_CommissionTarget.lstCVarCRM_CommissionTarget);

            objCVarCRM_CommissionTarget.ID = pID3;
            objCVarCRM_CommissionTarget.SalesmanID = pSalesmanID;
            objCVarCRM_CommissionTarget.TargetMonth = 3;
            objCVarCRM_CommissionTarget.TargetYear = pTargetYear;
            objCVarCRM_CommissionTarget.TargetTypeID = pTargetTypeID;
            objCVarCRM_CommissionTarget.Amount = pAmount3;
            objCVarCRM_CommissionTarget.Percentage = pPercentage3;
            objCVarCRM_CommissionTarget.Notes = pNotes;
            objCVarCRM_CommissionTarget.CreatorUserID = objCVarCRM_CommissionTarget.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarCRM_CommissionTarget.CreationDate = objCVarCRM_CommissionTarget.ModificationDate = DateTime.Now;
            objCCRM_CommissionTarget.lstCVarCRM_CommissionTarget.Add(objCVarCRM_CommissionTarget);
            checkException = objCCRM_CommissionTarget.SaveMethod(objCCRM_CommissionTarget.lstCVarCRM_CommissionTarget);

            objCVarCRM_CommissionTarget.ID = pID4;
            objCVarCRM_CommissionTarget.SalesmanID = pSalesmanID;
            objCVarCRM_CommissionTarget.TargetMonth = 4;
            objCVarCRM_CommissionTarget.TargetYear = pTargetYear;
            objCVarCRM_CommissionTarget.TargetTypeID = pTargetTypeID;
            objCVarCRM_CommissionTarget.Amount = pAmount4;
            objCVarCRM_CommissionTarget.Percentage = pPercentage4;
            objCVarCRM_CommissionTarget.Notes = pNotes;
            objCVarCRM_CommissionTarget.CreatorUserID = objCVarCRM_CommissionTarget.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarCRM_CommissionTarget.CreationDate = objCVarCRM_CommissionTarget.ModificationDate = DateTime.Now;
            objCCRM_CommissionTarget.lstCVarCRM_CommissionTarget.Add(objCVarCRM_CommissionTarget);
            checkException = objCCRM_CommissionTarget.SaveMethod(objCCRM_CommissionTarget.lstCVarCRM_CommissionTarget);

            objCVarCRM_CommissionTarget.ID = pID5;
            objCVarCRM_CommissionTarget.SalesmanID = pSalesmanID;
            objCVarCRM_CommissionTarget.TargetMonth = 5;
            objCVarCRM_CommissionTarget.TargetYear = pTargetYear;
            objCVarCRM_CommissionTarget.TargetTypeID = pTargetTypeID;
            objCVarCRM_CommissionTarget.Amount = pAmount5;
            objCVarCRM_CommissionTarget.Percentage = pPercentage5;
            objCVarCRM_CommissionTarget.Notes = pNotes;
            objCVarCRM_CommissionTarget.CreatorUserID = objCVarCRM_CommissionTarget.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarCRM_CommissionTarget.CreationDate = objCVarCRM_CommissionTarget.ModificationDate = DateTime.Now;
            objCCRM_CommissionTarget.lstCVarCRM_CommissionTarget.Add(objCVarCRM_CommissionTarget);
            checkException = objCCRM_CommissionTarget.SaveMethod(objCCRM_CommissionTarget.lstCVarCRM_CommissionTarget);

            objCVarCRM_CommissionTarget.ID = pID6;
            objCVarCRM_CommissionTarget.SalesmanID = pSalesmanID;
            objCVarCRM_CommissionTarget.TargetMonth = 6;
            objCVarCRM_CommissionTarget.TargetYear = pTargetYear;
            objCVarCRM_CommissionTarget.TargetTypeID = pTargetTypeID;
            objCVarCRM_CommissionTarget.Amount = pAmount6;
            objCVarCRM_CommissionTarget.Percentage = pPercentage6;
            objCVarCRM_CommissionTarget.Notes = pNotes;
            objCVarCRM_CommissionTarget.CreatorUserID = objCVarCRM_CommissionTarget.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarCRM_CommissionTarget.CreationDate = objCVarCRM_CommissionTarget.ModificationDate = DateTime.Now;
            objCCRM_CommissionTarget.lstCVarCRM_CommissionTarget.Add(objCVarCRM_CommissionTarget);
            checkException = objCCRM_CommissionTarget.SaveMethod(objCCRM_CommissionTarget.lstCVarCRM_CommissionTarget);

            objCVarCRM_CommissionTarget.ID = pID7;
            objCVarCRM_CommissionTarget.SalesmanID = pSalesmanID;
            objCVarCRM_CommissionTarget.TargetMonth = 7;
            objCVarCRM_CommissionTarget.TargetYear = pTargetYear;
            objCVarCRM_CommissionTarget.TargetTypeID = pTargetTypeID;
            objCVarCRM_CommissionTarget.Amount = pAmount7;
            objCVarCRM_CommissionTarget.Percentage = pPercentage7;
            objCVarCRM_CommissionTarget.Notes = pNotes;
            objCVarCRM_CommissionTarget.CreatorUserID = objCVarCRM_CommissionTarget.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarCRM_CommissionTarget.CreationDate = objCVarCRM_CommissionTarget.ModificationDate = DateTime.Now;
            objCCRM_CommissionTarget.lstCVarCRM_CommissionTarget.Add(objCVarCRM_CommissionTarget);
            checkException = objCCRM_CommissionTarget.SaveMethod(objCCRM_CommissionTarget.lstCVarCRM_CommissionTarget);

            objCVarCRM_CommissionTarget.ID = pID8;
            objCVarCRM_CommissionTarget.SalesmanID = pSalesmanID;
            objCVarCRM_CommissionTarget.TargetMonth = 8;
            objCVarCRM_CommissionTarget.TargetYear = pTargetYear;
            objCVarCRM_CommissionTarget.TargetTypeID = pTargetTypeID;
            objCVarCRM_CommissionTarget.Amount = pAmount8;
            objCVarCRM_CommissionTarget.Percentage = pPercentage8;
            objCVarCRM_CommissionTarget.Notes = pNotes;
            objCVarCRM_CommissionTarget.CreatorUserID = objCVarCRM_CommissionTarget.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarCRM_CommissionTarget.CreationDate = objCVarCRM_CommissionTarget.ModificationDate = DateTime.Now;
            objCCRM_CommissionTarget.lstCVarCRM_CommissionTarget.Add(objCVarCRM_CommissionTarget);
            checkException = objCCRM_CommissionTarget.SaveMethod(objCCRM_CommissionTarget.lstCVarCRM_CommissionTarget);

            objCVarCRM_CommissionTarget.ID = pID9;
            objCVarCRM_CommissionTarget.SalesmanID = pSalesmanID;
            objCVarCRM_CommissionTarget.TargetMonth = 9;
            objCVarCRM_CommissionTarget.TargetYear = pTargetYear;
            objCVarCRM_CommissionTarget.TargetTypeID = pTargetTypeID;
            objCVarCRM_CommissionTarget.Amount = pAmount9;
            objCVarCRM_CommissionTarget.Percentage = pPercentage9;
            objCVarCRM_CommissionTarget.Notes = pNotes;
            objCVarCRM_CommissionTarget.CreatorUserID = objCVarCRM_CommissionTarget.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarCRM_CommissionTarget.CreationDate = objCVarCRM_CommissionTarget.ModificationDate = DateTime.Now;
            objCCRM_CommissionTarget.lstCVarCRM_CommissionTarget.Add(objCVarCRM_CommissionTarget);
            checkException = objCCRM_CommissionTarget.SaveMethod(objCCRM_CommissionTarget.lstCVarCRM_CommissionTarget);

            objCVarCRM_CommissionTarget.ID = pID10;
            objCVarCRM_CommissionTarget.SalesmanID = pSalesmanID;
            objCVarCRM_CommissionTarget.TargetMonth = 10;
            objCVarCRM_CommissionTarget.TargetYear = pTargetYear;
            objCVarCRM_CommissionTarget.TargetTypeID = pTargetTypeID;
            objCVarCRM_CommissionTarget.Amount = pAmount10;
            objCVarCRM_CommissionTarget.Percentage = pPercentage10;
            objCVarCRM_CommissionTarget.Notes = pNotes;
            objCVarCRM_CommissionTarget.CreatorUserID = objCVarCRM_CommissionTarget.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarCRM_CommissionTarget.CreationDate = objCVarCRM_CommissionTarget.ModificationDate = DateTime.Now;
            objCCRM_CommissionTarget.lstCVarCRM_CommissionTarget.Add(objCVarCRM_CommissionTarget);
            checkException = objCCRM_CommissionTarget.SaveMethod(objCCRM_CommissionTarget.lstCVarCRM_CommissionTarget);

            objCVarCRM_CommissionTarget.ID = pID11;
            objCVarCRM_CommissionTarget.SalesmanID = pSalesmanID;
            objCVarCRM_CommissionTarget.TargetMonth = 11;
            objCVarCRM_CommissionTarget.TargetYear = pTargetYear;
            objCVarCRM_CommissionTarget.TargetTypeID = pTargetTypeID;
            objCVarCRM_CommissionTarget.Amount = pAmount11;
            objCVarCRM_CommissionTarget.Percentage = pPercentage11;
            objCVarCRM_CommissionTarget.Notes = pNotes;
            objCVarCRM_CommissionTarget.CreatorUserID = objCVarCRM_CommissionTarget.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarCRM_CommissionTarget.CreationDate = objCVarCRM_CommissionTarget.ModificationDate = DateTime.Now;
            objCCRM_CommissionTarget.lstCVarCRM_CommissionTarget.Add(objCVarCRM_CommissionTarget);
            checkException = objCCRM_CommissionTarget.SaveMethod(objCCRM_CommissionTarget.lstCVarCRM_CommissionTarget);

            objCVarCRM_CommissionTarget.ID = pID12;
            objCVarCRM_CommissionTarget.SalesmanID = pSalesmanID;
            objCVarCRM_CommissionTarget.TargetMonth = 12;
            objCVarCRM_CommissionTarget.TargetYear = pTargetYear;
            objCVarCRM_CommissionTarget.TargetTypeID = pTargetTypeID;
            objCVarCRM_CommissionTarget.Amount = pAmount12;
            objCVarCRM_CommissionTarget.Percentage = pPercentage12;
            objCVarCRM_CommissionTarget.Notes = pNotes;
            objCVarCRM_CommissionTarget.CreatorUserID = objCVarCRM_CommissionTarget.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarCRM_CommissionTarget.CreationDate = objCVarCRM_CommissionTarget.ModificationDate = DateTime.Now;
            objCCRM_CommissionTarget.lstCVarCRM_CommissionTarget.Add(objCVarCRM_CommissionTarget);
            checkException = objCCRM_CommissionTarget.SaveMethod(objCCRM_CommissionTarget.lstCVarCRM_CommissionTarget);
            #endregion Save
            if (checkException == null)
                pID1 = objCVarCRM_CommissionTarget.ID;
            else
                strMessage = checkException.Message;
            #region Update
            //else //update
            //{
            //    _UpdateClause = pSalesmanID == 0 ? "SalesmanID=null" : ("SalesmanID=" + pSalesmanID) + " \n";
            //    _UpdateClause += pTargetMonth == 0 ? ",TargetMonth=null" : (",TargetMonth=" + pTargetMonth) + " \n";
            //    _UpdateClause += pTargetYear == 0 ? ",TargetYear=null" : (",TargetYear=" + pTargetYear) + " \n";
            //    _UpdateClause += pTargetTypeID == 0 ? ",TargetTypeID=null" : (",TargetTypeID=" + pTargetTypeID) + " \n";
            //    _UpdateClause += pAmount == 0 ? ",Amount=null" : (",Amount=" + pAmount) + " \n";
            //    _UpdateClause += pPercentage == 0 ? ",Percentage=null" : (",Percentage=" + pPercentage) + " \n";
            //    _UpdateClause += pNotes == "0" ? ",Notes=null" : (",Notes=N'" + pNotes + "'") + " \n";
            //    //_UpdateClause += pReceiveDate == "01/01/1900" ? " ,ReceiveDate = NULL " : (" ,ReceiveDate = '" + (DateTime.ParseExact(pReceiveDate + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture)).ToString("yyyyMMdd") + "'");
            //    _UpdateClause += " , ModificatorUserID = " + WebSecurity.CurrentUserId.ToString();
            //    _UpdateClause += " , ModificationDate = GETDATE() ";
            //    _UpdateClause += " WHERE ID = " + pID.ToString();

            //    checkException = objCCRM_CommissionTarget.UpdateList(_UpdateClause);
            //    if (checkException != null)
            //        strMessage = checkException.Message;
            //}
            #endregion Update
            //if (strMessage == "")
            //    checkException = objCvwCRM_CommissionTarget.GetListPaging(1, 1, "WHERE ID=" + pID.ToString(), "ID", out _RowCount);
            return new object[] {
                strMessage
                , pID1 //pData[1]
                //, new JavaScriptSerializer().Serialize(objCvwCRM_CommissionTarget.lstCVarvwCRM_CommissionTarget[0]) //pData[2]
            };
        }

        [HttpGet, HttpPost]
        public object[] LoadHeaderWithDetails(Int32 pHeaderID)
        {
            Exception checkException = null;
            Int32 _RowCount = 0;
            CCRM_CommissionTarget objCCRM_CommissionTarget = new CCRM_CommissionTarget();
            checkException = objCCRM_CommissionTarget.GetListPaging(99999, 1, "WHERE ID=" + pHeaderID.ToString(), "ID", out _RowCount);
            checkException = objCCRM_CommissionTarget.GetListPaging(99999, 1
                , "WHERE SalesmanID=" + objCCRM_CommissionTarget.lstCVarCRM_CommissionTarget[0].SalesmanID.ToString() + " AND TargetYear=" + objCCRM_CommissionTarget.lstCVarCRM_CommissionTarget[0].TargetYear
                , "TargetMonth", out _RowCount);
            return new object[] {
                new JavaScriptSerializer().Serialize(objCCRM_CommissionTarget.lstCVarCRM_CommissionTarget)
            };
        }

        //[HttpGet, HttpPost]
        //public bool Delete(String pCommissionTargetIDs)
        //{
        //    bool _result = false;
        //    CCRM_CommissionTarget objCCRM_CommissionTarget = new CCRM_CommissionTarget();
        //    foreach (var currentID in pCommissionTargetIDs.Split(','))
        //    {
        //        objCCRM_CommissionTarget.lstDeletedCPKCRM_CommissionTarget.Add(new CPKCRM_CommissionTarget() { ID = Int32.Parse(currentID.Trim()) });
        //    }

        //    Exception checkException = objCCRM_CommissionTarget.DeleteItem(objCCRM_CommissionTarget.lstDeletedCPKCRM_CommissionTarget);
        //    if (checkException != null) // an exception is caught in the model
        //    {
        //        if (checkException.Message.Contains("DELETE")) // some or all of the CommissionTargets were not deleted due to dependencies
        //            _result = false;
        //    }
        //    else //deleted successfully
        //        _result = true;
        //    return _result;
        //}
        [HttpGet, HttpPost]
        public bool Delete(String pCommissionTargetIDs)
        {
            bool _result = true;
            Exception checkException = null;
            CCRM_CommissionTarget objCCRM_CommissionTarget = new CCRM_CommissionTarget();
            foreach (var currentID in pCommissionTargetIDs.Split(','))
            {
                checkException = objCCRM_CommissionTarget.GetList("WHERE ID=" + currentID);
                checkException = objCCRM_CommissionTarget.DeleteList(
                    "WHERE SalesmanID=" + objCCRM_CommissionTarget.lstCVarCRM_CommissionTarget[0].SalesmanID
                    + " AND TargetYear=" + objCCRM_CommissionTarget.lstCVarCRM_CommissionTarget[0].TargetYear);
                if (checkException != null)
                    _result = false;
            }
            return _result;
        }
        #endregion CommissionTarget

        #region SalesReport
        [HttpGet, HttpPost]
        public object[] LoadSalesReportData(string pLanguage, Int32 pPageNumber, Int32 pPageSize
            , string pWhereClauseSalesReport, string pOrderBy, Int32 pReportFormat
            , string pWhereClauseGetFixedTarget)
        {
            //pReportFormat 10:FixedAmountTarget 20:PercentageTarget
            int _RowCount = 0;
            Exception checkException = null;
            CvwCRM_SalesReport objCvwCRM_SalesReport = new CvwCRM_SalesReport();
            CCRM_CommissionTarget objCCRM_CommissionTarget = new CCRM_CommissionTarget();
            CUsers objCUsers = new CUsers();
            string _UsersWithOperations = "0";
            string _UsersWithTarget = "0";
            checkException = objCvwCRM_SalesReport.GetListPaging(pPageSize, pPageNumber, pWhereClauseSalesReport, pOrderBy, out _RowCount);
            checkException = objCCRM_CommissionTarget.GetListPaging(pPageSize, pPageNumber, pWhereClauseGetFixedTarget, "ID", out _RowCount);
            //i get the salesman total fixed target amount over that period
            var pSalesmenFixedAmountForPeriod = objCCRM_CommissionTarget.lstCVarCRM_CommissionTarget
                .GroupBy(g => g.SalesmanID)
                .Select(g => new
                {
                    SalesmanID = g.First().SalesmanID
                    ,
                    FixedAmount = g.Sum(s => s.Amount)
                });
            #region Add Users without operations
            if (pReportFormat == 10) //Fixed Amount
            {
                foreach (var row in objCvwCRM_SalesReport.lstCVarvwCRM_SalesReport)
                    _UsersWithOperations += "," + row.SalesmanID.ToString();
                foreach (var row in objCCRM_CommissionTarget.lstCVarCRM_CommissionTarget)
                    _UsersWithTarget += "," + row.SalesmanID.ToString();
                checkException = objCUsers.GetList("WHERE IsNull(CustomerID , 0) = 0 AND ID IN (" + _UsersWithTarget + ") AND ID NOT IN (" + _UsersWithOperations + ")");
                for (int i = 0; i < objCUsers.lstCVarUsers.Count; i++)
                {
                    CVarvwCRM_SalesReport objCVarvwCRM_SalesReport = new CVarvwCRM_SalesReport();
                    objCVarvwCRM_SalesReport.SalesmanID = objCUsers.lstCVarUsers[i].ID;
                    objCVarvwCRM_SalesReport.SalesmanName = objCUsers.lstCVarUsers[i].Name;
                    objCvwCRM_SalesReport.lstCVarvwCRM_SalesReport.Add(objCVarvwCRM_SalesReport);
                }
            }
            #endregion Add Users without operations

            var pFixedAmountReport = objCvwCRM_SalesReport.lstCVarvwCRM_SalesReport
                .GroupBy(g => new { g.SalesmanID })
                    .Select(g => new
                    {
                        SalesmanName = g.First().SalesmanName
                        ,
                        FixedAmount = pSalesmenFixedAmountForPeriod.Where(w => w.SalesmanID == g.First().SalesmanID).Count() == 0 ? 0 : pSalesmenFixedAmountForPeriod.Where(w => w.SalesmanID == g.First().SalesmanID).First().FixedAmount
                        ,
                        TargetTypeID = g.First().TargetTypeID
                        ,
                        Receivables = g.Sum(s => s.Receivables)
                        ,
                        Payables = g.Sum(s => s.Payables)
                    }).OrderBy(o => o.SalesmanName);

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                pReportFormat == 10
                    ? serializer.Serialize(pFixedAmountReport.ToList())
                    : serializer.Serialize(objCvwCRM_SalesReport.lstCVarvwCRM_SalesReport)
            };
        }
        #endregion SalesReport
    }
}

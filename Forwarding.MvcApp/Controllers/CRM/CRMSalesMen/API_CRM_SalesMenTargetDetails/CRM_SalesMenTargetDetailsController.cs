using Forwarding.MvcApp.Models.CRM.CRM_SalesMenTarget.Generated;
using Forwarding.MvcApp.Models.CRM.CRM_Sources.Generated;
using Forwarding.MvcApp.Models.CRM.CRM_SalesMenTargetDetails.Generated;
using Forwarding.MvcApp.Models.MasterData.Locations.Generated;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;
using Forwarding.MvcApp.Models.CRM.CRM_Actions.Generated;
using Forwarding.MvcApp.Models.Administration.Security.Generated;
using Forwarding.MvcApp.Models.CRM.CRM_ActionStatues.Generated;
using System.Globalization;
using Forwarding.MvcApp.Models.CRM.vwCRM_SalesMenTarget.Generated;

namespace Forwarding.MvcApp.Controllers.CRM.CRM_SalesMenTarget
{
    public class CRM_SalesMenTargetDetailsController : ApiController
    {
        //[Route("/api/CRM_SalesMenTargetDetails/LoadAll")]
        [HttpGet, HttpPost]
        //sherif: to be used in select boxes
        public Object[] LoadAll(string pWhereClause)
        {
            var objCCRM_SalesMenTargetDetails = new CCRM_SalesMenTargetDetails();
            objCCRM_SalesMenTargetDetails.GetList(pWhereClause);

            if(objCCRM_SalesMenTargetDetails.lstCVarCRM_SalesMenTargetDetails != null && objCCRM_SalesMenTargetDetails.lstCVarCRM_SalesMenTargetDetails.Count != 0)
            {
                foreach(var item in objCCRM_SalesMenTargetDetails.lstCVarCRM_SalesMenTargetDetails)
                {

                    item.FromDate = item.FromDate.Date;
                    item.ToDate = item.ToDate.Date;
                }

            }
            return new Object[] { new JavaScriptSerializer().Serialize(objCCRM_SalesMenTargetDetails.lstCVarCRM_SalesMenTargetDetails) };
        }

        [HttpGet, HttpPost]
        public Object[] LoadWithPagingWithWhereClause(Int32 pPageNumber, Int32 pPageSize, string pWhereClause)
        {
            CCRM_SalesMenTargetDetails objCvwCRM_SalesMenTargetDetails = new CCRM_SalesMenTargetDetails();
            //objCvwvwCRM_FollowUps.GetList(string.Empty);
            Int32 _RowCount = 0;// objCvwvwCRM_FollowUps.lstCVarvwCRM_FollowUps.Count;

            //pSearchKey = (pSearchKey == null ? "" : pSearchKey.Trim().ToUpper());
            //string whereClause = " Where Code LIKE '%" + pSearchKey + "%' "
            //    + " OR Name LIKE '%" + pSearchKey + "%' ";

            objCvwCRM_SalesMenTargetDetails.GetListPaging(pPageSize, pPageNumber, pWhereClause, " ID DESC ", out _RowCount);
            // var result = CvwCRM_FollowUps.lstCVarvwCRM_FollowUps.DistinctBy(x => x.ID).ToList();

            if (objCvwCRM_SalesMenTargetDetails.lstCVarCRM_SalesMenTargetDetails != null && objCvwCRM_SalesMenTargetDetails.lstCVarCRM_SalesMenTargetDetails.Count != 0)
            {
                foreach (var item in objCvwCRM_SalesMenTargetDetails.lstCVarCRM_SalesMenTargetDetails)
                {

                    item.FromDate = item.FromDate.Date;
                    item.ToDate = item.ToDate.Date;
                }

            }
            return new Object[] { new JavaScriptSerializer().Serialize(objCvwCRM_SalesMenTargetDetails.lstCVarCRM_SalesMenTargetDetails), _RowCount };
        }



        [HttpGet, HttpPost]
        //sherif: to be used in select boxes
        public Object[] IntializeData()
        {
            CCRM_Actions objActions = new CCRM_Actions();
            CUsers cUsers = new CUsers();
            CCRM_ActionStatues cCRM_ActionStatues = new CCRM_ActionStatues();
            //--------------------------------------------
            objActions.GetList("where 1 = 1");
            cUsers.GetList("where IsNull(CustomerID , 0) = 0 AND 1 = 1");
            cCRM_ActionStatues.GetList("where 1 = 1");

            //-------------------------------------------

            return new Object[] { new JavaScriptSerializer().Serialize(objActions.lstCVarCRM_Actions), new JavaScriptSerializer().Serialize(cUsers.lstCVarUsers), new JavaScriptSerializer().Serialize(cCRM_ActionStatues.lstCVarCRM_ActionStatues) };
        }










        // [Route("/api/CRM_SalesMenTargetDetails/LoadWithPaging/{pPageNumber}/{pPageSize}")]
        //[HttpGet, HttpPost]
        //public Object[] LoadWithPaging(Int32 pPageNumber, Int32 pPageSize, string pSearchKey)
        //{
        //    CCRM_SalesMenTargetDetails objCvwCRM_SalesMenTargetDetails = new CCRM_SalesMenTargetDetails();
        //    //objCvwCRM_SalesMenTargetDetails.GetList(string.Empty);
        //    Int32 _RowCount = 0;// objCvwCRM_SalesMenTargetDetails.lstCVarCRM_SalesMenTargetDetails.Count;

        //    pSearchKey = (pSearchKey == null ? "" : pSearchKey.Trim().ToUpper());
        //    string whereClause = " Where Code LIKE '%" + pSearchKey + "%' "
        //        + " OR Name LIKE '%" + pSearchKey + "%' ";

        //    objCvwCRM_SalesMenTargetDetails.GetListPaging(pPageSize, pPageNumber, whereClause, " ID ", out _RowCount);

        //    return new Object[] { new JavaScriptSerializer().Serialize(objCvwCRM_SalesMenTargetDetails.lstCVarCRM_SalesMenTargetDetails), _RowCount };
        //}

        // [Route("/api/CRM_SalesMenTargetDetails/Insert/{pCode}/{pModificatorUser}/{pLocalName}}")]

        [HttpGet, HttpPost]
        public Object[] Insert(string pFromDate,
       string pToDate,
       string pTarget,
       string pTargetPeriod,
       string pTotalTarget,
       string pCRM_SalesMenTargetID,
       string pIsActionsTarget,
       string pAmount, string pAllAmount , string pNotes , string pPerDay , string pPerMonth, string pSalesManID, string pActionTypeID , string pDaysCount)
        {
            bool _result = false;

            CVarCRM_SalesMenTargetDetails objCVarCRM_SalesMenTargetDetails = new CVarCRM_SalesMenTargetDetails();

     
      
            objCVarCRM_SalesMenTargetDetails.FromDate = pFromDate == null ? DateTime.ParseExact("01/01/1900" + " 00:00:00.000", "MM/dd/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture) : DateTime.ParseExact(pFromDate + " 00:00:00.000", "MM/dd/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture);
            objCVarCRM_SalesMenTargetDetails.ToDate = pToDate == null ? DateTime.ParseExact("01/01/1900" + " 00:00:00.000", "MM/dd/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture) : DateTime.ParseExact(pToDate + " 23:59:59.000", "MM/dd/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture);
            objCVarCRM_SalesMenTargetDetails.Target = pTarget == null ? 0 : int.Parse(pTarget);
            objCVarCRM_SalesMenTargetDetails.TargetPeriod = pTargetPeriod == null ? 0 : int.Parse(pTargetPeriod);
            objCVarCRM_SalesMenTargetDetails.CRM_SalesMenTargetID = pCRM_SalesMenTargetID == null ? 0 : int.Parse(pCRM_SalesMenTargetID);
            objCVarCRM_SalesMenTargetDetails.TotalTarget = pTotalTarget == null ? 0 : int.Parse(pTotalTarget);
            objCVarCRM_SalesMenTargetDetails.IsActionsTarget = pIsActionsTarget == null ? true : Convert.ToBoolean(pIsActionsTarget);
            objCVarCRM_SalesMenTargetDetails.Amount = pAmount == null ? 0 : decimal.Parse(pAmount);
            objCVarCRM_SalesMenTargetDetails.AllAmount = pAllAmount == null ? 0 : decimal.Parse(pAllAmount);
            objCVarCRM_SalesMenTargetDetails.Notes = pNotes == null ? "0" : pNotes;
            objCVarCRM_SalesMenTargetDetails.PerDay = pPerDay == null ? 0 : decimal.Parse(pPerDay);
            objCVarCRM_SalesMenTargetDetails.PerMonth = pPerMonth == null ? 0 : decimal.Parse(pPerMonth);
            objCVarCRM_SalesMenTargetDetails.DaysCount = pDaysCount == null ? 0 : int.Parse(pDaysCount);



            objCVarCRM_SalesMenTargetDetails.CreationDate = DateTime.Now;
            objCVarCRM_SalesMenTargetDetails.CreatorUserID = WebSecurity.CurrentUserId;
            objCVarCRM_SalesMenTargetDetails.ModificationDate = DateTime.Now;
            objCVarCRM_SalesMenTargetDetails.ModifatorUserID = WebSecurity.CurrentUserId;

            CCRM_SalesMenTargetDetails objCCRM_SalesMenTargetDetails = new CCRM_SalesMenTargetDetails();
            objCCRM_SalesMenTargetDetails.lstCVarCRM_SalesMenTargetDetails.Add(objCVarCRM_SalesMenTargetDetails);
            var vwSalesMenTarget = new CvwCRM_SalesMenTarget();
            var where = "where ";

            where += "( ( ";
            where += " CONVERT(date , FromDate ) <= CONVERT(date , '" + pFromDate + "')";
            where += " AND ";
            where += " CONVERT(date , ToDate ) >= CONVERT(date , '" + pFromDate + "')";
            where += " ) ";

            where += " OR ";

            where += " ( ";
            where += " CONVERT(date , FromDate ) <= CONVERT(date , '" + pToDate + "')";
            where += " AND ";
            where += " CONVERT(date , ToDate ) >= CONVERT(date , '" + pToDate + "')";
            where += " ) )";

            where += " AND ";
            where += " ( ";
            where += "SalesRepID = " + int.Parse(pSalesManID);
            where += " AND ";
            where += "ActionTypeID = " + int.Parse(pActionTypeID);
            where += " ) ";


            vwSalesMenTarget.GetList(where);


            var Conficting_DatesObject = vwSalesMenTarget.lstCVarvwCRM_SalesMenTarget.ToList();




            Exception checkException = null;
            if (Conficting_DatesObject == null || Conficting_DatesObject.Count == 0)
            {
                checkException = objCCRM_SalesMenTargetDetails.SaveMethod(objCCRM_SalesMenTargetDetails.lstCVarCRM_SalesMenTargetDetails);
                if (checkException != null) // an exception is caught in the model
                {
                    // if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
                    //  ErrorMessage = checkException.Message;

                }
                else //not unique
                    _result = true;

                return new Object[] { _result, 1 };
            }
            else
            {
                _result = false;
                return new Object[] { _result, "Invalid Dates" };
            }


        }

        // [Route("/api/CRM_SalesMenTargetDetails/Update/{pID}/{pCode}/{pName}/{pLocalName}")]
        [HttpGet, HttpPost]
        public Object[] Update(string pID, string pFromDate,
       string pToDate,
       string pTarget,
       string pTargetPeriod,
       string pTotalTarget,
       string pCRM_SalesMenTargetID,
       string pIsActionsTarget,
       string pAmount, string pAllAmount , string pNotes , string pPerDay, string pPerMonth , string pSalesManID , string pActionTypeID , string pDaysCount)
        {
            bool _result = false;
            var ErrorMessage = ""; 

            CVarCRM_SalesMenTargetDetails objCVarCRM_SalesMenTargetDetails = new CVarCRM_SalesMenTargetDetails();

            //the next 4 lines to get the CreatorUserID and CreationDate and set them as they were entered before
            CCRM_SalesMenTargetDetails objCGetCreationInformation = new CCRM_SalesMenTargetDetails();
            objCGetCreationInformation.GetItem(int.Parse(pID));
            objCVarCRM_SalesMenTargetDetails.CreatorUserID = objCGetCreationInformation.lstCVarCRM_SalesMenTargetDetails[0].CreatorUserID;
            objCVarCRM_SalesMenTargetDetails.CreationDate = objCGetCreationInformation.lstCVarCRM_SalesMenTargetDetails[0].CreationDate;

            objCVarCRM_SalesMenTargetDetails.ID = int.Parse(pID);
            objCVarCRM_SalesMenTargetDetails.FromDate = pFromDate == null ? DateTime.ParseExact("01/01/1900" + " 00:00:00.000", "MM/dd/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture) : DateTime.ParseExact(pFromDate + " 00:00:00.000", "MM/dd/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture);
            objCVarCRM_SalesMenTargetDetails.ToDate = pToDate == null ? DateTime.ParseExact("01/01/1900" + " 00:00:00.000", "MM/dd/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture) : DateTime.ParseExact(pToDate + " 23:59:59.000", "MM/dd/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture);
            objCVarCRM_SalesMenTargetDetails.Target = pTarget == null ? 0 : int.Parse(pTarget);
            objCVarCRM_SalesMenTargetDetails.TargetPeriod = pTargetPeriod == null ? 0 : int.Parse(pTargetPeriod);
            objCVarCRM_SalesMenTargetDetails.CRM_SalesMenTargetID = pCRM_SalesMenTargetID == null ? 0 : int.Parse(pCRM_SalesMenTargetID);
            objCVarCRM_SalesMenTargetDetails.TotalTarget = pTotalTarget == null ? 0 : int.Parse(pTotalTarget);
            objCVarCRM_SalesMenTargetDetails.IsActionsTarget = pIsActionsTarget == null ? true : Convert.ToBoolean(pIsActionsTarget);
            objCVarCRM_SalesMenTargetDetails.Amount = pAmount == null ? 0 : decimal.Parse(pAmount);
            objCVarCRM_SalesMenTargetDetails.AllAmount = pAllAmount == null ? 0 : decimal.Parse(pAllAmount);
            objCVarCRM_SalesMenTargetDetails.Notes = pNotes == null ? "0" : pNotes;
            objCVarCRM_SalesMenTargetDetails.PerDay = pPerDay == null ? 0 : decimal.Parse(pPerDay);
            objCVarCRM_SalesMenTargetDetails.PerMonth = pPerMonth == null ? 0 : decimal.Parse(pPerMonth);
            objCVarCRM_SalesMenTargetDetails.DaysCount = pDaysCount == null ? 0 : int.Parse(pDaysCount);
            var where = "where ";
            objCVarCRM_SalesMenTargetDetails.ModifatorUserID = WebSecurity.CurrentUserId;
            objCVarCRM_SalesMenTargetDetails.ModificationDate = DateTime.Now;

            CCRM_SalesMenTargetDetails objCCRM_SalesMenTargetDetails = new CCRM_SalesMenTargetDetails();
            objCCRM_SalesMenTargetDetails.lstCVarCRM_SalesMenTargetDetails.Add(objCVarCRM_SalesMenTargetDetails);
            var vwSalesMenTarget = new CvwCRM_SalesMenTarget();
            

            where += "( ( ";
            where += " CONVERT(date , FromDate ) <= CONVERT(date , '" + pFromDate + "')";
            where += " AND ";
            where += " CONVERT(date , ToDate ) >= CONVERT(date , '" + pFromDate + "')";
            where += " ) ";

            where += " OR ";

            where += " ( ";
            where += " CONVERT(date , FromDate ) <= CONVERT(date , '" + pToDate + "')";
            where += " AND ";
            where += " CONVERT(date , ToDate ) >= CONVERT(date , '" + pToDate + "')";
            where += " ) )";

            where += " AND ";
            where += " ( ";
            where += "SalesRepID = " + int.Parse(pSalesManID) ;
            where += " AND ";
            where += "ActionTypeID = " + int.Parse(pActionTypeID);
            where += " AND ";
            where += "SalesMenTargetDetailsID != " + int.Parse(pID);
            where += " ) ";

            
            vwSalesMenTarget.GetList(where);


            var Conficting_DatesObject = vwSalesMenTarget.lstCVarvwCRM_SalesMenTarget.ToList();

           
 

            Exception checkException = null;
            if (Conficting_DatesObject == null || Conficting_DatesObject.Count == 0)
            {
                 checkException = objCCRM_SalesMenTargetDetails.SaveMethod(objCCRM_SalesMenTargetDetails.lstCVarCRM_SalesMenTargetDetails);
                if (checkException != null) // an exception is caught in the model
                {
                    // if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
                    //  ErrorMessage = checkException.Message;

                }
                else //not unique
                    _result = true;

                return new Object[] { _result, 1 };
            }
            else
            {
                _result = false;
                return new Object[] { _result, "Invalid Dates" };
            }
          
            
        }

        // [Route("/api/CRM_SalesMenTargetDetails/DeleteByID/{pID}")]
        //[HttpGet, HttpPost]
        //public void DeleteByID(Int32 pID)
        //{
        //    CCRM_SalesMenTargetDetails objCCRM_SalesMenTargetDetails = new CCRM_SalesMenTargetDetails();
        //    objCCRM_SalesMenTargetDetails.lstDeletedCPKCRM_SalesMenTargetDetails.Add(new CPKCRM_SalesMenTargetDetails() { ID = pID });
        //    objCCRM_SalesMenTargetDetails.DeleteItem(objCCRM_SalesMenTargetDetails.lstDeletedCPKCRM_SalesMenTargetDetails);
        //}

        // [Route("api/CRM_SalesMenTargetDetails/Delete/{pCRM_SalesMenTargetDetailsIDs}")]
        [HttpGet, HttpPost]
        public bool Delete(String pCRM_SalesMenTargetDetailsIDs)
        {
            bool _result = false;
            CCRM_SalesMenTargetDetails objCCRM_SalesMenTargetDetails = new CCRM_SalesMenTargetDetails();
            foreach (var currentID in pCRM_SalesMenTargetDetailsIDs.Split(','))
            {
                objCCRM_SalesMenTargetDetails.lstDeletedCPKCRM_SalesMenTargetDetails.Add(new CPKCRM_SalesMenTargetDetails() { ID = Int32.Parse(currentID.Trim()) });
            }

            Exception checkException = objCCRM_SalesMenTargetDetails.DeleteItem(objCCRM_SalesMenTargetDetails.lstDeletedCPKCRM_SalesMenTargetDetails);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("DELETE")) // some or all of the rows were not deleted due to dependencies
                    _result = false;
            }
            else //deleted successfully
                _result = true;
            return _result;
        }
    }
}

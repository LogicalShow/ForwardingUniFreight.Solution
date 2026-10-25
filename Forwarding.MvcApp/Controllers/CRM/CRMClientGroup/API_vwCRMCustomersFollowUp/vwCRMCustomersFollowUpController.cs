using Forwarding.MvcApp.Models.CRM.CRM_Clients.Generated;
using Forwarding.MvcApp.Models.CRM.CRM_Sources.Generated;
using Forwarding.MvcApp.Models.MasterData.Locations.Generated;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;
using MoreLinq;
using Forwarding.MvcApp.Models.Administration.Security.Generated;

namespace Forwarding.MvcApp.Controllers.CRM.API_vwCRM_Clients
{
    public class vwCRMCustomersFollowUpController : ApiController
    {
        //[Route("/api/vwCRM_Clients/LoadAll")]
        [HttpGet, HttpPost]
        //sherif: to be used in select boxes
        public Object[] LoadAll(string pWhereClause)
        {
            CvwCRM_Clients objCvwCRM_Clients = new CvwCRM_Clients();
            objCvwCRM_Clients.GetList(pWhereClause);
            return new Object[] { new JavaScriptSerializer().Serialize(objCvwCRM_Clients.lstCVarvwCRM_Clients) };
        }





        [HttpGet, HttpPost]
        //sherif: to be used in select boxes
        public Object[] IntializeData()
        {
            CvwCRM_Clients objCvwCRM_Clients = new CvwCRM_Clients();
            CCountries cCountries = new CCountries();
            CCRM_Sources cCRM_Sources = new CCRM_Sources();

            //--------------------------------------------
            objCvwCRM_Clients.GetList("where 1 = 1");
            cCountries.GetList("where 1 = 1");
            cCRM_Sources.GetList("where 1 = 1");
            return new Object[] { new JavaScriptSerializer().Serialize(objCvwCRM_Clients.lstCVarvwCRM_Clients) 
                          , new JavaScriptSerializer().Serialize(cCountries.lstCVarCountries) , new JavaScriptSerializer().Serialize(cCRM_Sources.lstCVarCRM_Sources) };
        }



        
        // [Route("/api/vwCRM_Clients/LoadWithPaging/{pPageNumber}/{pPageSize}")]
        [HttpGet, HttpPost]
        public Object[] LoadWithPagingWithWhereClause(Int32 pPageNumber, Int32 pPageSize, string pWhereClause, string pOrderBy)
        {
            CvwCRM_Clients CvwCRM_Clients = new CvwCRM_Clients();
            //objCvwvwCRM_Clients.GetList(string.Empty);
            Int32 _RowCount = 0;// objCvwvwCRM_Clients.lstCVarvwCRM_Clients.Count;

            CvwUsers objCvwUsers = new CvwUsers();
            objCvwUsers.GetListPaging(999999, 1, "WHERE ID=" + WebSecurity.CurrentUserId, "ID", out _RowCount);
            if (objCvwUsers.lstCVarvwUsers[0].IsHideOthersRecords)
                pWhereClause += " AND (SalesmanID=" + WebSecurity.CurrentUserId + " OR CreatorUserID=" + WebSecurity.CurrentUserId + ")";

            pWhereClause += " AND ActualCustomer IS NOT NULL ";
          
            CvwCRM_Clients.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);
            return new Object[] { new JavaScriptSerializer().Serialize(CvwCRM_Clients.lstCVarvwCRM_Clients), _RowCount };
        }

     

       
    }
}

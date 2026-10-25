using Forwarding.MvcApp.Models.CRM.CRM_Clients.Generated;
using Forwarding.MvcApp.Models.CRM.CRM_Sources.Generated;
using Forwarding.MvcApp.Models.MasterData.Locations.Generated;
using System;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;
using Forwarding.MvcApp.Models.Administration.Security.Generated;
using System.Linq;

namespace Forwarding.MvcApp.Controllers.CRM.API_vwCRM_Clients
{
    public class vwCRM_ClientsController : ApiController
    {
        [HttpGet, HttpPost]
        public Object[] LoadAll(string pWhereClause)
        {
            CvwCRM_Clients objCvwCRM_Clients = new CvwCRM_Clients();
            objCvwCRM_Clients.GetList(pWhereClause);
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[] { serializer.Serialize(objCvwCRM_Clients.lstCVarvwCRM_Clients) };
        }

        [HttpGet, HttpPost]
        public Object[] CRMClients_ExportToExcel(string pWhereClauseExportToExcel, string pOrderBy)
        {
            Exception checkException = null;
            int _RowCount = 0;
            CvwCRM_Clients objCvwCRM_Clients = new CvwCRM_Clients();
            checkException = objCvwCRM_Clients.GetListPaging(999999, 1, pWhereClauseExportToExcel, "Name", out _RowCount);
            var pSalesLeadList = objCvwCRM_Clients.lstCVarvwCRM_Clients
                .Select(s => new
                { //Order is important for excel
                    Code = s.Code
                    ,
                    Name = s.Name.Replace(',', '-')
                    ,
                    LocalName = s.LocalName.Replace(',', '-')
                    ,
					Salesman = s.Username
                    ,
                    Address = s.Address.Replace(',', '-').Replace('\n','-')
                    ,
                    Phone1 = s.Phone1.Replace(',', '-')
                    ,
                    Phone2 = s.Phone2.Replace(',', '-')
                    ,
                    CellPhone = s.CellPhone.Replace(',', '-')
                    ,
                    Fax = s.Fax.Replace(',', '-')
                    ,
                    Email = s.Email.Replace(',', '-')
                    ,
                    WebSite = s.WebSite.Replace(',', '-')
                    ,
                    BusinessVolume = s.BusinessVolume
                    ,
                    SourceDescription = s.SourceDescription.Replace(',', '-').Replace('\n', '-')
                    ,
                    LeadStatusName = s.LeadStatusName
                    ,
                    CustomerName = s.CustomerName
                    ,
                    LostReason = s.LostReason.Replace(',', '-').Replace('\n', '-')
                    ,
                    Notes = s.Notes.Replace(',', '-').Replace('\n', '-')
                    ,
                    CreatorUserName = s.CreatorUserName
                })
                .ToList();
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[] {
                serializer.Serialize(pSalesLeadList) //pData[0]
            };
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

            //pSearchKey = (pSearchKey == null ? "" : pSearchKey.Trim().ToUpper());
            //string whereClause = " Where Code LIKE '%" + pSearchKey + "%' "
            //    + " OR Name LIKE '%" + pSearchKey + "%' ";

            CvwCRM_Clients.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);
            //    //CvwCRM_Clients.GetList(pWhereClause);
            //    var clients = CvwCRM_Clients.lstCVarvwCRM_Clients.DistinctBy(x => x.ID).ToList();
            //    _RowCount = clients.Count;
            //    clients = clients.OrderByDescending(x => x.ID).ToList();
            //    int start = 0;
            //    int end = 0;
            //if( pPageNumber <= 1 )
            //{
            //  end = start + pPageSize + 1;

            //}
            //    pPageNumber = pPageNumber - 1;

            //    start = pPageSize * pPageNumber + 1;

            //     end = start + pPageSize - 1 ;


            //    try
            //    {
            //        clients = clients.GetRange(start - 1, pPageSize);
            //    }
            //    catch
            //    {
            //        clients = clients.GetRange(start - 1, _RowCount - (start - 1)   );
            //    }
            //  //   _RowCount = clients.Count;
            //   // var result = CvwCRM_Clients.lstCVarvwCRM_Clients.DistinctBy(x => x.ID).ToList();
            //return new Object[] { new JavaScriptSerializer().Serialize(clients), _RowCount };
            return new Object[] { new JavaScriptSerializer().Serialize(CvwCRM_Clients.lstCVarvwCRM_Clients), _RowCount };
        }

     

       
    }
}

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
using Forwarding.MvcApp.Models.CRM.vwCRM_SalesMenTarget.Generated;
using Forwarding.MvcApp.Models.CRM.CRM_Actions.Generated;

namespace Forwarding.MvcApp.Controllers.CRM.API_vwCRM_SalesMenTarget
{
    public class vwCRM_SalesMenTargetController : ApiController
    {
        //[Route("/api/vwCRM_SalesMenTarget/LoadAll")]
        [HttpGet, HttpPost]
        //sherif: to be used in select boxes
        public Object[] LoadAll(string pWhereClause)
        {
            CvwCRM_SalesMenTarget objCvwCRM_SalesMenTarget = new CvwCRM_SalesMenTarget();
            objCvwCRM_SalesMenTarget.GetList(pWhereClause);
            return new Object[] { new JavaScriptSerializer().Serialize(objCvwCRM_SalesMenTarget.lstCVarvwCRM_SalesMenTarget) };
        }





        [HttpGet, HttpPost]
        //sherif: to be used in select boxes
        public Object[] IntializeData()
        {
            CvwCRM_SalesMenTarget objCvwCRM_SalesMenTarget = new CvwCRM_SalesMenTarget();
            CCountries cCountries = new CCountries();
            CCRM_Sources cCRM_Sources = new CCRM_Sources();

            //--------------------------------------------
            objCvwCRM_SalesMenTarget.GetList("where 1 = 1");
            cCountries.GetList("where 1 = 1");
            cCRM_Sources.GetList("where 1 = 1");
            return new Object[] { new JavaScriptSerializer().Serialize(objCvwCRM_SalesMenTarget.lstCVarvwCRM_SalesMenTarget) 
                          , new JavaScriptSerializer().Serialize(cCountries.lstCVarCountries) , new JavaScriptSerializer().Serialize(cCRM_Sources.lstCVarCRM_Sources) };
        }









        [HttpGet, HttpPost]
        public Object[] LoadWithPagingWithWhereClause(Int32 pPageNumber, Int32 pPageSize, string pWhereClause)
        {
            CvwCRM_SalesMenTarget CvwCRM_SalesMenTarget = new CvwCRM_SalesMenTarget();
            //objCvwvwCRM_SalesMenTarget.GetList(string.Empty);
            Int32 _RowCount = 0;// objCvwvwCRM_SalesMenTarget.lstCVarvwCRM_SalesMenTarget.Count;

            //pSearchKey = (pSearchKey == null ? "" : pSearchKey.Trim().ToUpper());
            //string whereClause = " Where Code LIKE '%" + pSearchKey + "%' "
            //    + " OR Name LIKE '%" + pSearchKey + "%' ";

            // CvwCRM_SalesMenTarget.GetListPaging(pPageSize, pPageNumber, pWhereClause, " ID DESC ", out _RowCount);
            CvwCRM_SalesMenTarget.GetList(pWhereClause);
            var clients = CvwCRM_SalesMenTarget.lstCVarvwCRM_SalesMenTarget.DistinctBy(x => x.ID).ToList();
            _RowCount = clients.Count;
            clients = clients.OrderByDescending(x => x.ID).ToList();
            int start = 0;
            int end = 0;
            if (pPageNumber <= 1)
            {
                end = start + pPageSize + 1;

            }
            pPageNumber = pPageNumber - 1;

            start = pPageSize * pPageNumber + 1;

            end = start + pPageSize - 1;


            try
            {
                clients = clients.GetRange(start - 1, pPageSize);
            }
            catch
            {
                clients = clients.GetRange(start - 1, _RowCount - (start - 1));
            }
            //   _RowCount = clients.Count;
            // var result = CvwCRM_SalesMenTarget.lstCVarvwCRM_SalesMenTarget.DistinctBy(x => x.ID).ToList();
            CCRM_Actions objCCRM_Actions = new CCRM_Actions();
            objCCRM_Actions.GetList(" Where 1=1");

            return new Object[] { new JavaScriptSerializer().Serialize(clients), _RowCount
            , new JavaScriptSerializer().Serialize(objCCRM_Actions.lstCVarCRM_Actions)};
        }





    }
}

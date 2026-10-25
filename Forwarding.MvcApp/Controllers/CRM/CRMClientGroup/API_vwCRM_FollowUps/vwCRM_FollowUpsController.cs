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

namespace Forwarding.MvcApp.Controllers.CRM.API_vwCRM_FollowUps
{
    public class vwCRM_FollowUpsController : ApiController
    {
        //[Route("/api/vwCRM_FollowUps/LoadAll")]
        [HttpGet, HttpPost]
        //sherif: to be used in select boxes
        public Object[] LoadAll(string pWhereClause)
        {
            CvwCRM_FollowUps objCvwCRM_FollowUps = new CvwCRM_FollowUps();
            objCvwCRM_FollowUps.GetList(pWhereClause);
            return new Object[] { new JavaScriptSerializer().Serialize(objCvwCRM_FollowUps.lstCVarvwCRM_FollowUps) };
        }





        [HttpGet, HttpPost]
        //sherif: to be used in select boxes
        public Object[] IntializeData()
        {
            CvwCRM_FollowUps objCvwCRM_FollowUps = new CvwCRM_FollowUps();
            CCountries cCountries = new CCountries();
            CCRM_Sources cCRM_Sources = new CCRM_Sources();

            //--------------------------------------------
            objCvwCRM_FollowUps.GetList("where 1 = 1");
            cCountries.GetList("where 1 = 1");
            cCRM_Sources.GetList("where 1 = 1");
            return new Object[] { new JavaScriptSerializer().Serialize(objCvwCRM_FollowUps.lstCVarvwCRM_FollowUps) 
                          , new JavaScriptSerializer().Serialize(cCountries.lstCVarCountries) , new JavaScriptSerializer().Serialize(cCRM_Sources.lstCVarCRM_Sources) };
        }
        


        // [Route("/api/vwCRM_FollowUps/LoadWithPaging/{pPageNumber}/{pPageSize}")]
        [HttpGet, HttpPost]
        public Object[] LoadWithPagingWithWhereClause(Int32 pPageNumber, Int32 pPageSize, string pWhereClause)
        {
            CvwCRM_FollowUps CvwCRM_FollowUps = new CvwCRM_FollowUps();
            //objCvwvwCRM_FollowUps.GetList(string.Empty);
            Int32 _RowCount = 0;// objCvwvwCRM_FollowUps.lstCVarvwCRM_FollowUps.Count;
            
            //pSearchKey = (pSearchKey == null ? "" : pSearchKey.Trim().ToUpper());
            //string whereClause = " Where Code LIKE '%" + pSearchKey + "%' "
            //    + " OR Name LIKE '%" + pSearchKey + "%' ";

            CvwCRM_FollowUps.GetListPaging(pPageSize, pPageNumber, pWhereClause, " ID DESC ", out _RowCount);
            var vwCRM_FollowUps = CvwCRM_FollowUps.lstCVarvwCRM_FollowUps.GroupBy(l => new { l.Action ,l.Color} )
                                    .Select(cl => new 
                                    {
                                        Action = cl.Key.Action,
                                        Color = cl.Key.Color,
                                        //Quantity = cl.Count().ToString(),
                                        ActionPercent = cl.Sum(c => c.ActionPercentID)
                                    }).ToList();
            var vw_FollowUp = CvwCRM_FollowUps.lstCVarvwCRM_FollowUps.GroupBy(x => x.Action).Select(x => x.FirstOrDefault());
            // var result = CvwCRM_FollowUps.lstCVarvwCRM_FollowUps.DistinctBy(x => x.ID).ToList();
            return new Object[] { new JavaScriptSerializer().Serialize(CvwCRM_FollowUps.lstCVarvwCRM_FollowUps), _RowCount
                , new JavaScriptSerializer().Serialize(vwCRM_FollowUps)
                , new JavaScriptSerializer().Serialize(vw_FollowUp)
            };
        }

     

       
    }
}

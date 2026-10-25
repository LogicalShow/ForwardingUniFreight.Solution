//PartnerTypeID for CUSTOMERS is 1
//PartnerTypeID for AGENTS is 2
//PartnerTypeID for SHIPPING AGENTS is 3
//PartnerTypeID for CUSTOMS CLEARANCE AGENTS is 4
//PartnerTypeID for SHIPPINGLINES is 5
//PartnerTypeID for AIRLINES is 6
//PartnerTypeID for TRUCKERS is 7
//PartnerTypeID for SUPPLIERS is 8
using Forwarding.MvcApp.Models.ReceiptsAndPayments.ShipLink.Generated;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;

namespace Forwarding.MvcApp.Controllers.ReceiptsAndPayments.ShipLink
{
    public class LineController : ApiController
    {
        [HttpGet, HttpPost]
        //sherif: to be used in select boxes
        public Object[] LoadAll(string pWhereClause)
        {
            CvwLine objCLine = new CvwLine();
            objCLine.GetList(pWhereClause);
            return new Object[] { new JavaScriptSerializer().Serialize(objCLine.lstCVarvwLine) };
        }

        // [Route("/api/Line/LoadWithPaging/{pPageNumber}/{pPageSize}")]
        [HttpGet, HttpPost]
        public Object[] LoadWithPaging(Int32 pPageNumber, Int32 pPageSize, string pSearchKey)
        {
            CvwLine objCLine = new CvwLine();
            //objCLine.GetList(string.Empty); //GetList() fn loads without paging

            pSearchKey = (pSearchKey == null ? "" : pSearchKey.Trim().ToUpper());
            Int32 _RowCount = objCLine.lstCVarvwLine.Count;
            string whereClause = " Where Code LIKE N'%" + pSearchKey + "%' "
                + " OR Name LIKE N'%" + pSearchKey + "%' ";
            objCLine.GetListPaging(pPageSize, pPageNumber, whereClause, "Code", out _RowCount);
            return new Object[] { new JavaScriptSerializer().Serialize(objCLine.lstCVarvwLine), _RowCount };
        }
    }
}

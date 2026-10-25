using Forwarding.MvcApp.Controllers.MasterData.API_Invoicing;
using Forwarding.MvcApp.Models.Administration.Settings.Generated;
using Forwarding.MvcApp.Models.MasterData.Invoicing.Generated;
using Forwarding.MvcApp.Models.MasterData.Others.Generated;
using Forwarding.MvcApp.Models.MasterData.Partners.Generated;
using Forwarding.MvcApp.Models.NoAccess.Generated;
using Forwarding.MvcApp.Models.SC.MasterData.Generated;
using Forwarding.MvcApp.Models.SC.Transactions.Customized;
using Forwarding.MvcApp.Models.Warehousing.MasterData.Generated;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;

namespace Forwarding.MvcApp.Controllers.SC.ItemsInquiry
{
    public class ItemsInquiryController : ApiController
    {



        [HttpGet, HttpPost]
        public Object[] IntializeData()
        {

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            CvwPurchaseItem cvwPurchaseItem = new CvwPurchaseItem();
            Int32 _RowCount = 0;
            cvwPurchaseItem.GetListPaging(100000, 1, "Where  IsNull(ParentGroupID,0) <> 0", " ItemGroupName", out _RowCount);

            CCustomers cCustomers = new CCustomers();
            cCustomers.GetList(" where 1 = 1");

            CI_PriceList cI_PriceList = new CI_PriceList();
            cI_PriceList.GetList("Where  1 = 1 ");

            return new Object[] { serializer.Serialize(cvwPurchaseItem.lstCVarvwPurchaseItem),
            serializer.Serialize(cI_PriceList.lstCVarI_PriceList),
            serializer.Serialize(cCustomers.lstCVarCustomers),


            };
        }


        [HttpGet, HttpPost]
        public Object[] LoadAll(string pWhereClause)
        {
            CvwI_PriceListItems cvwI_PriceListItems = new CvwI_PriceListItems();
            cvwI_PriceListItems.GetList(pWhereClause);


            Int32 _RowCount = 0;
            cvwI_PriceListItems.GetListPaging(100000, 1, pWhereClause, " ID ", out _RowCount);



            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[] { new JavaScriptSerializer().Serialize(cvwI_PriceListItems.lstCVarvwI_PriceListItems) };
        }







    }
}

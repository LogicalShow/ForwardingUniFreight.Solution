using Forwarding.MvcApp.Models.SC.MasterData.Generated;
using Forwarding.MvcApp.Models.Accounting.MasterData.Generated;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;
using Forwarding.MvcApp.Models.SL.SL_Transactions.Generated;
using Forwarding.MvcApp.Models.MasterData.Invoicing.Generated;
using Forwarding.MvcApp.Models.Accounting.Transactions.Generated;
using Forwarding.MvcApp.Models.FA.Generated;
using Forwarding.MvcApp.Models.WebSite.Generated;
using Forwarding.MvcApp.Models.Administration.Security.Generated;

namespace Forwarding.MvcApp.Controllers.MasterData.API_Invoicing
{
    public class WebSite_Form13StatesController : ApiController
    {


        [HttpGet, HttpPost]
        public Object[] IntializeData(string pID) //pID : AccountID
        {
            if (pID == null)
                pID = "0";

            CA_SubAccounts objCA_SubAccounts = new CA_SubAccounts();
            objCA_SubAccounts.GetList("Where SubAccount_Number Like '1%' and SubAccLevel <> 1  AND IsMain = 1 AND (select Count(g.ID) from WebSite_YourOperations g where g.SubAccountID = A_SubAccounts.ID  and g.ID <> " + pID + " ) <= 0    ");
            return new Object[] { new JavaScriptSerializer().Serialize(objCA_SubAccounts.lstCVarA_SubAccounts) };

        }



        [HttpGet, HttpPost] //called with operations management page
        public object[] LoadWithWhereClause( Int32 pPageNumber, Int32 pPageSize, string pWhereClause)
        {
            var constOperationsFormID = 29;//OperationsManagement
            //var constQuotationsFormID = 28;//QuotationsManagement
            Int32 _RowCount = 0;

            CvwOperationsForWebSite objCvwOperations = new CvwOperationsForWebSite();


            CvwUsers User = new CvwUsers();
            User.GetList(" Where ID = "+WebSecurity.CurrentUserId +" ");
            var CustomerID = User.lstCVarvwUsers[0].CustomerID;
            pWhereClause = pWhereClause + " AND  ClientID= "+ CustomerID + "";
            Exception checkException = objCvwOperations.GetListPaging(pPageSize, pPageNumber, pWhereClause, "OpenYear DESC, CodeSerial DESC ", out _RowCount);
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[] {
                serializer.Serialize(objCvwOperations.lstCVarvwOperationsForWebSite)
                , _RowCount
            };
        }





        //***********************************************************************************************************************************


    }
}

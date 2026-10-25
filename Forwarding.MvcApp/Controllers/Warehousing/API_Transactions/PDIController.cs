using Forwarding.MvcApp.Models.MasterData.Partners.Generated;
using Forwarding.MvcApp.Models.Warehousing.Transactions.Generated;
using System;
using System.Linq;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;

namespace Forwarding.MvcApp.Controllers.Warehousing.API_Transactions
{
    public class PDIController : ApiController
    {
        [HttpGet, HttpPost]
        public object[] LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned(bool pIsLoadArrayOfObjects, string pLanguage, Int32 pPageNumber, Int32 pPageSize, string pWhereClause, string pOrderBy)
        {
            int _RowCount = 0;
            Exception checkException = null;
            CvwWH_PDI objCvwWH_PDI = new CvwWH_PDI();
            CCustomers objCCustomers = new CCustomers();
            
            if (pIsLoadArrayOfObjects)
            {
                checkException = objCCustomers.GetListPaging(999999, 1, "WHERE 1=1", "Name", out _RowCount);
            }
            var pCustomerList = objCCustomers.lstCVarCustomers
                .Select(s => new
                {
                    ID = s.ID
                    ,
                    Name = s.Name
                })
                .Distinct().OrderBy(o => o.Name).ToList();

            checkException = objCvwWH_PDI.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);

            return new object[] {
                new JavaScriptSerializer().Serialize(objCvwWH_PDI.lstCVarvwWH_PDI)
                , _RowCount
                , new JavaScriptSerializer().Serialize(pCustomerList) //pCustomer=pData[2]
            };
        }

        [HttpGet, HttpPost]
        public object[] Save(Int64 pID, Int64 pOperationVehicleID, Int64 pPurchaseItemID, decimal pQuantity
            , string pActionDate, string pNotes)
        {
            string _ReturnedMessage = "";
            int _RowCount = 0;
            Exception checkException = null;
            CWH_PDI objCWH_PDI = new CWH_PDI();
            CvwWH_PDI objCvwWH_PDI = new CvwWH_PDI();
            CVarWH_PDI objCVarWH_PDI = new CVarWH_PDI();
            #region Insert
            if (pID == 0)
            {
                objCVarWH_PDI.Code = "0";
                objCVarWH_PDI.ReceiveDetailsID = 0;
                objCVarWH_PDI.OperationVehicleID = pOperationVehicleID;
                objCVarWH_PDI.PurchaseItemID = pPurchaseItemID;
                objCVarWH_PDI.Quantity = pQuantity;
                objCVarWH_PDI.ActionDate = DateTime.Now;
                objCVarWH_PDI.Notes = pNotes;
                objCVarWH_PDI.CreationDate = objCVarWH_PDI.ModificationDate = DateTime.Now;
                objCVarWH_PDI.CreatorUserID = objCVarWH_PDI.ModificatorUserID = WebSecurity.CurrentUserId;
                objCWH_PDI.lstCVarWH_PDI.Add(objCVarWH_PDI);
                checkException = objCWH_PDI.SaveMethod(objCWH_PDI.lstCVarWH_PDI);
            }
            #endregion Insert
            #region Update
            #endregion Update
            #region Get Returned Data
            checkException = objCvwWH_PDI.GetListPaging(999999, 1, "WHERE OperationVehicleID=" + pOperationVehicleID, "ID", out _RowCount);
            #endregion Get Returned Data
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[]
            {
                _ReturnedMessage
                , serializer.Serialize(objCvwWH_PDI.lstCVarvwWH_PDI)
            };
        }

        [HttpGet, HttpPost]
        public object[] DeleteList(string pPDIIDsToDelete, Int64 pOperationVehicleID)
        {
            string _ReturnedMessage = "";
            Exception checkException = null;
            int _RowCount = 0;
            CWH_PDI objCWH_PDI = new CWH_PDI();
            CvwWH_PDI objCvwWH_PDI = new CvwWH_PDI();
            for (int i = 0; i < pPDIIDsToDelete.Split(',').Length; i++)
            {
                checkException = objCWH_PDI.DeleteList("WHERE ID =" + pPDIIDsToDelete.Split(',')[i]);
                if (checkException != null)
                    _ReturnedMessage = checkException.Message;
            }
            #region Get Returned Data
            checkException = objCvwWH_PDI.GetListPaging(999999, 1, "WHERE OperationVehicleID=" + pOperationVehicleID, "ID", out _RowCount);
            #endregion Get Returned Data
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[]
            {
                _ReturnedMessage
                , serializer.Serialize(objCvwWH_PDI.lstCVarvwWH_PDI)
            };
        }

    }
}

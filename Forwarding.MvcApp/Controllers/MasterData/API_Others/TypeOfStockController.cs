using Forwarding.MvcApp.Models.MasterData.Others.Generated;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;

namespace Forwarding.MvcApp.Controllers.MasterData.API_Others
{
    public class TypeOfStockController : ApiController
    {
        [HttpGet, HttpPost]
        public Object[] TypeOfStock_LoadAll(string pWhereClause)
        {
            CTypeOfStock objCTypeOfStock = new CTypeOfStock();
            objCTypeOfStock.GetList(pWhereClause);
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[] { serializer.Serialize(objCTypeOfStock.lstCVarTypeOfStock) };
        }

        [HttpGet, HttpPost]
        public Object[] TypeOfStock_LoadItem(Int64 pTypeOfStockIDForModal)
        {
            Int32 _RowCount = 0;
            CTypeOfStock objCTypeOfStock = new CTypeOfStock();
            objCTypeOfStock.GetListPaging(1, 1, "WHERE ID = " + pTypeOfStockIDForModal.ToString(), "ID", out _RowCount);
            //CvwShippingOrderPortDate objCvwShippingOrderPortDate = new CvwShippingOrderPortDate();
            //objCvwShippingOrderPortDate.GetListPaging(100, 1, "WHERE ShippingOrderID = " + pShippingOrderIDForModal.ToString(), "ID", out _RowCount);

            return new Object[] {
                new JavaScriptSerializer().Serialize(objCTypeOfStock.lstCVarTypeOfStock[0]) //var pShippingOrderHeader = pData[0];
                //, new JavaScriptSerializer().Serialize(objCvwShippingOrderPortDate.lstCVarvwShippingOrderPortDate) //var pShippingOrderPort = pData[1];
            };
        }

        [HttpGet, HttpPost]
        public Object[] TypeOfStock_LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned(Int32 pPageNumber, Int32 pPageSize, string pWhereClause, string pOrderBy, String pIsExport)
        {
            Int32 _RowCount = 0;
            CTypeOfStock objCTypeOfStock = new CTypeOfStock();
            objCTypeOfStock.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[] {
                new JavaScriptSerializer().Serialize(objCTypeOfStock.lstCVarTypeOfStock)
                , _RowCount
            };
        }

        [HttpGet, HttpPost]
        public object[] TypeOfStock_Insert([FromBody] InsertTypeOfStockData InsertTypeOfStockData)
        {
            bool _result = false;
            Exception checkException = null;
            int _RowCount = 0;

            CTypeOfStock objTypeOfStock = new CTypeOfStock();

            CTypeOfStock objCTypeOfStock = new CTypeOfStock();
            CVarTypeOfStock objCVarTypeOfStock = new CVarTypeOfStock();

            objCVarTypeOfStock.Code = InsertTypeOfStockData.PCode == null ? "" : InsertTypeOfStockData.PCode;
            objCVarTypeOfStock.Name = InsertTypeOfStockData.PName == null ? "" : InsertTypeOfStockData.PName;

            objTypeOfStock.lstCVarTypeOfStock.Add(objCVarTypeOfStock);
            checkException = objTypeOfStock.SaveMethod(objTypeOfStock.lstCVarTypeOfStock);
            if (checkException == null)
            {
                _result = true;
                objCTypeOfStock.GetListPaging(InsertTypeOfStockData.pPageSize, InsertTypeOfStockData.pPageNumber, InsertTypeOfStockData.pWhereClauseTypeOfStockData, InsertTypeOfStockData.pOrderBy, out _RowCount);
            }

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                _result //pData[0]
                , _result ? objCVarTypeOfStock.ID : 0 //pData[1]
                , _result ? serializer.Serialize(objCTypeOfStock.lstCVarTypeOfStock) : null //pData[2]
                , _RowCount //pData[3]
            };
        }

        [HttpGet, HttpPost]
        public object[] TypeOfStock_Update([FromBody] UpdateTypeOfStockData UpdateTypeOfStockData)
        {
            bool _result = false;
            Exception checkException = null;
            int _RowCount = 0;

            CTypeOfStock objTypeOfStock = new CTypeOfStock();
            CVarTypeOfStock objCVarTypeOfStock = new CVarTypeOfStock();



            objCVarTypeOfStock.Code = UpdateTypeOfStockData.PCode == null ? "" : UpdateTypeOfStockData.PCode;
            objCVarTypeOfStock.Name = UpdateTypeOfStockData.PName == null ? "" : UpdateTypeOfStockData.PName;
            objCVarTypeOfStock.ID = UpdateTypeOfStockData.pID;
            objTypeOfStock.lstCVarTypeOfStock.Add(objCVarTypeOfStock);
            checkException = objTypeOfStock.SaveMethod(objTypeOfStock.lstCVarTypeOfStock);
            //checkException = objShippingOrder.UpdateList(pUpdateClause);
            if (checkException == null)
            {
                _result = true;
                objTypeOfStock.GetListPaging(UpdateTypeOfStockData.pPageSize, UpdateTypeOfStockData.pPageNumber, UpdateTypeOfStockData.pWhereClauseTypeOfStockData, UpdateTypeOfStockData.pOrderBy, out _RowCount);
            }

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                _result //pData[0]
                , _result ? objCVarTypeOfStock.ID : 0 //pData[1]
                , _result ? serializer.Serialize(objTypeOfStock.lstCVarTypeOfStock) : null //pData[2]
                , _RowCount //pData[3]
            };
        }

        [HttpGet, HttpPost]
        public object[] TypeOfStock_DeleteList(String pDeleteTypeOfStockIDs
            //LoadWithPaging parameters for Bill
        , string pWhereClauseTypeOfStock, Int32 pPageSize, Int32 pPageNumber, string pOrderBy)
        {
            bool _result = false;
            Int32 _RowCount = 0;
            CTypeOfStock objCTypeOfStock = new CTypeOfStock();
            foreach (var currentID in pDeleteTypeOfStockIDs.Split(','))
            {
                objCTypeOfStock.lstDeletedCPKTypeOfStock.Add(new CPKTypeOfStock() { ID = Int32.Parse(currentID.Trim()) });
            }

            Exception checkException = objCTypeOfStock.DeleteItem(objCTypeOfStock.lstDeletedCPKTypeOfStock);
            if (checkException == null)
                _result = true;
            objCTypeOfStock.GetListPaging(pPageSize, pPageNumber, pWhereClauseTypeOfStock, pOrderBy, out _RowCount);
            return new object[] {
                _result
                , new JavaScriptSerializer().Serialize(objCTypeOfStock.lstCVarTypeOfStock) //pData[1]
            };
        }

    }
}
#region Post fns parameters
public class InsertTypeOfStockData
{
    public String PCode { get; set; }
    public String PName { get; set; }
    /*****************************/
    public string pWhereClauseTypeOfStockData { get; set; }
    public Int32 pPageSize { get; set; }
    public Int32 pPageNumber { get; set; }
    public string pOrderBy { get; set; }
}

public class UpdateTypeOfStockData
{
    public Int32 pID { get; set; }
    public String PCode { get; set; }
    public String PName { get; set; }
    /*****************************/
    public string pWhereClauseTypeOfStockData { get; set; }
    public Int32 pPageSize { get; set; }
    public Int32 pPageNumber { get; set; }
    public string pOrderBy { get; set; }
}
#endregion Post fns parameters
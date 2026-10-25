using Forwarding.MvcApp.Models.ContainerFreightStation.Tariff;
using Forwarding.MvcApp.Models.MasterData.Invoicing.Generated;
using Forwarding.MvcApp.Models.MasterData.Others.Generated;
using Forwarding.MvcApp.Models.MasterData.Partners.Generated;
using Forwarding.MvcApp.Models.NoAccess.Generated;
using Forwarding.MvcApp.Models.Warehousing.MasterData.Generated;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;

namespace Forwarding.MvcApp.Controllers.ContainerFreightStation.Tariff
{
    public class WH_FCL_TariffsController : ApiController
    {
        [HttpGet, HttpPost]
        // agnet isline=1 or ContainerType IsLine=0
        public Object[] WH_FCL_Tariff_LoadAll(string pOrderBy)
        {
            CVw_WH_FCL_Tariff objVw_WH_FCL_Tariffs = new CVw_WH_FCL_Tariff();
            objVw_WH_FCL_Tariffs.GetList(" order by " + pOrderBy);
            return new Object[] { new JavaScriptSerializer().Serialize(objVw_WH_FCL_Tariffs.lstCVarVw_WH_FCL_Tariff) };
        }

        [HttpGet, HttpPost]
        public Object[] WH_FCL_Tariff_LoadItem(Int64 pWHFCLTariffIDForModal)
        {
            Int32 _RowCount = 0;
            CWH_FCL_Tariff objWH_FCL_Tariffs = new CWH_FCL_Tariff();
            objWH_FCL_Tariffs.GetListPaging(1, 1, "WHERE ID = " + pWHFCLTariffIDForModal.ToString(), "ID", out _RowCount);

            return new Object[] {
                new JavaScriptSerializer().Serialize(objWH_FCL_Tariffs.lstCVarWH_FCL_Tariff[0])
            };
        }

        // [Route("/api/ContainerTypes/LoadWithPaging/{pPageNumber}/{pPageSize}")]
        [HttpGet, HttpPost]
        public Object[] WH_FCL_Tariffs_LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned(Int32 pPageNumber, Int32 pPageSize, string pWhereClause, string pOrderBy)
        {
            CVw_WH_FCL_Tariff objVw_WH_FCL_Tariffs = new CVw_WH_FCL_Tariff();

            pWhereClause = (pWhereClause == null ? "" : pWhereClause.Trim().ToUpper());
            Int32 _RowCount = objVw_WH_FCL_Tariffs.lstCVarVw_WH_FCL_Tariff.Count;
            objVw_WH_FCL_Tariffs.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);

            CCustomers objCCustomer = new CCustomers();
            objCCustomer.GetList(" where 1=1 ");

            var pCustomerList = objCCustomer.lstCVarCustomers
                            .Select(s => new
                            {
                                ID = s.ID
                                ,
                                Name = s.Name
                            })
                            .Distinct().OrderBy(o => o.Name).ToList();

            CWH_Warehouse objCWH_Warehouse = new CWH_Warehouse();
            objCWH_Warehouse.GetList(" where 1=1 ");
            var pWarehouseList = objCWH_Warehouse.lstCVarWH_Warehouse
                .Select(s => new
                {
                    ID = s.ID
                    ,
                    Name = s.Name
                })
                .Distinct().OrderBy(o => o.Name).ToList();

            CChargeTypes objCChargeTypes = new CChargeTypes();
            objCChargeTypes.GetList(" where 1=1 and IsWarehouseChargeType=1 ");

            var pChargeTypesList = objCChargeTypes.lstCVarChargeTypes
                            .Select(s => new
                            {
                                ID = s.ID
                                ,
                                Name = s.Name
                            })
                            .Distinct().OrderBy(o => o.Name).ToList();

            CContainerTypes objCContainerTypes = new CContainerTypes();
            objCContainerTypes.GetList(" where 1=1 ");

            var pContainerTypesList = objCContainerTypes.lstCVarContainerTypes
                .Select(ss => new
                {
                    ID = ss.ID,
                    Name = ss.Name
                })
                .Distinct().OrderBy(o => o.Name).ToList();

            CNoAccessMeasurements objCNoAccessMeasurements = new CNoAccessMeasurements();
            objCNoAccessMeasurements.GetList(" where 1=1 ");
            var pNoAccessMeasurementsList = objCNoAccessMeasurements.lstCVarNoAccessMeasurements
                .Select(ss => new
                {
                    ID = ss.ID,
                    Name = ss.Name
                })
                .Distinct().OrderBy(o => o.Name).ToList();

            return new Object[] { new JavaScriptSerializer().Serialize(objVw_WH_FCL_Tariffs.lstCVarVw_WH_FCL_Tariff),//0
                                _RowCount, //1
                                new JavaScriptSerializer().Serialize(pCustomerList),//2
                                new JavaScriptSerializer().Serialize(pWarehouseList),//3
                                new JavaScriptSerializer().Serialize(pChargeTypesList),//4
                                new JavaScriptSerializer().Serialize(pContainerTypesList),//5
                                new JavaScriptSerializer().Serialize(pNoAccessMeasurementsList),//6
            };
        }




        // [Route("/api/ContainerTypes/Update/{pCode}/{pName}/{pLocalName}}")]
        [HttpGet, HttpPost]
        public object[] WH_FCL_Tariff_Save([FromBody] UpdateWH_FCL_Tariff UpdateWH_FCL_Tariffs)
        {
            bool _result = false;
            int _RowCount = 0;

            CVarWH_FCL_Tariff objCVarWH_FCL_Tariff = new CVarWH_FCL_Tariff();

            //the next 4 lines to get the CreatorUserID and CreationDate and set them as they were entered before
            CWH_FCL_Tariff objCWH_FCL_Tariff = new CWH_FCL_Tariff();
            objCWH_FCL_Tariff.GetItem(int.Parse(UpdateWH_FCL_Tariffs.pID));
            objCVarWH_FCL_Tariff.ID = int.Parse(UpdateWH_FCL_Tariffs.pID);

            objCVarWH_FCL_Tariff.Code = (UpdateWH_FCL_Tariffs.pCode == null ? "0" : UpdateWH_FCL_Tariffs.pCode.Trim().ToUpper());
            objCVarWH_FCL_Tariff.Name = (UpdateWH_FCL_Tariffs.pName == null ? "0" : UpdateWH_FCL_Tariffs.pName.Trim().ToUpper());
            objCVarWH_FCL_Tariff.CustomerID = UpdateWH_FCL_Tariffs.pCustomerID == "" ? int.Parse("0") : int.Parse(UpdateWH_FCL_Tariffs.pCustomerID);
            objCVarWH_FCL_Tariff.WH_WarehouseID = UpdateWH_FCL_Tariffs.pWH_WarehouseID == "" ? int.Parse("0") : int.Parse(UpdateWH_FCL_Tariffs.pWH_WarehouseID);
            objCVarWH_FCL_Tariff.IsDefault = UpdateWH_FCL_Tariffs.pIsDefault == true ? UpdateWH_FCL_Tariffs.pIsDefault : false;
            objCVarWH_FCL_Tariff.IsHold = UpdateWH_FCL_Tariffs.pIsHold == true ? UpdateWH_FCL_Tariffs.pIsHold : false;
            objCVarWH_FCL_Tariff.ValidFromTo = UpdateWH_FCL_Tariffs.pValidFromTo;
            objCVarWH_FCL_Tariff.ID = Int32.Parse(UpdateWH_FCL_Tariffs.pID);
            objCWH_FCL_Tariff.lstCVarWH_FCL_Tariff.Add(objCVarWH_FCL_Tariff);

            Exception checkException = objCWH_FCL_Tariff.SaveMethod(objCWH_FCL_Tariff.lstCVarWH_FCL_Tariff);
            CVw_WH_FCL_Tariff objCVw_WH_FCL_Tariff = new CVw_WH_FCL_Tariff();
            if (checkException == null)
            {
                _result = true;
                ////CWH_FCL_Tariff_Details objCWH_FCL_Tariff_Details = new CWH_FCL_Tariff_Details();
                ////JavaScriptSerializer jsonSerialiser = new JavaScriptSerializer();
                ////List<CVarWH_FCL_Tariff_Details> listofCVarWH_FCL_Tariff_Details = jsonSerialiser.Deserialize<List<CVarWH_FCL_Tariff_Details>>(UpdateWH_FCL_Tariffs.pWH_FCL_Tariff_Details);
                ////objCWH_FCL_Tariff_Details.lstCVarWH_FCL_Tariff_Details = listofCVarWH_FCL_Tariff_Details;
                ////for (int i = 0; i < objCWH_FCL_Tariff_Details.lstCVarWH_FCL_Tariff_Details.Count; i++)
                ////{
                ////    objCWH_FCL_Tariff_Details.lstCVarWH_FCL_Tariff_Details[i].mIsChanges = true;
                ////    objCWH_FCL_Tariff_Details.lstCVarWH_FCL_Tariff_Details[i].WH_FCL_TariffID = objCWH_FCL_Tariff.lstCVarWH_FCL_Tariff[0].ID;
                ////}
                ////Exception checkExceptionDtls = objCWH_FCL_Tariff_Details.SaveMethod(objCWH_FCL_Tariff_Details.lstCVarWH_FCL_Tariff_Details);
                objCVw_WH_FCL_Tariff.GetListPaging(UpdateWH_FCL_Tariffs.pPageSize, UpdateWH_FCL_Tariffs.pPageNumber, UpdateWH_FCL_Tariffs.pWhereClauseWH_FCL_Tariff, UpdateWH_FCL_Tariffs.pOrderBy, out _RowCount);
            }

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                _result //pData[0]
                , _result ? objCVarWH_FCL_Tariff.ID : 0 //pData[1]
                , _result ? serializer.Serialize(objCVw_WH_FCL_Tariff.lstCVarVw_WH_FCL_Tariff) : null //pData[2]
                , _RowCount //pData[3]
            };
        }



        // [Route("/api/ContainerTypes/Delete/{pContainerTypesIDs}")]
        [HttpGet, HttpPost]
        public object[] WH_FCL_Tariff_DeleteList(String pWH_FCL_TariffIDs, string pWhereClauseWH_FCL_Tariff,
            Int32 pPageSize, Int32 pPageNumber, string pOrderBy)
        {
            bool _result = false;
            Int32 _RowCount = 0;
            CWH_FCL_Tariff objCWH_FCL_Tariff = new CWH_FCL_Tariff();
            foreach (var pWH_FCL_TariffID in pWH_FCL_TariffIDs.Split(','))
            {
                objCWH_FCL_Tariff.lstDeletedCPKWH_FCL_Tariff.Add(new CPKWH_FCL_Tariff() { ID = Int32.Parse(pWH_FCL_TariffID.Trim()) });
            }
            Exception checkException = objCWH_FCL_Tariff.DeleteItem(objCWH_FCL_Tariff.lstDeletedCPKWH_FCL_Tariff);
            CVw_WH_FCL_Tariff objCvw_WH_FCL_Tariff = new CVw_WH_FCL_Tariff();
            if (checkException == null)
                _result = true;
            objCvw_WH_FCL_Tariff.GetListPaging(pPageSize, pPageNumber, pWhereClauseWH_FCL_Tariff, pOrderBy, out _RowCount);
            return new object[] {
                _result
                , new JavaScriptSerializer().Serialize(objCvw_WH_FCL_Tariff.lstCVarVw_WH_FCL_Tariff) //pData[1]
            };
        }


        //************************************************************************
        //******************** WH_FCL_Tariff_Details *************************
        //************************************************************************

        [HttpGet, HttpPost]
        public Object[] WH_FCL_Tariff_Details_LoadItem(Int64 pWH_FCL_Tariff_DetailsIDForModal)
        {
            Int32 _RowCount = 0;
            CWH_FCL_Tariff_Details objCWH_FCL_Tariff_Details = new CWH_FCL_Tariff_Details();
            objCWH_FCL_Tariff_Details.GetListPaging(1, 1, "WHERE ID = " + pWH_FCL_Tariff_DetailsIDForModal.ToString(), "ID", out _RowCount);
            //CvwShippingOrderPortDate objCvwShippingOrderPortDate = new CvwShippingOrderPortDate();
            //objCvwShippingOrderPortDate.GetListPaging(100, 1, "WHERE ShippingOrderID = " + pShippingOrderIDForModal.ToString(), "ID", out _RowCount);

            return new Object[] {
                new JavaScriptSerializer().Serialize(objCWH_FCL_Tariff_Details.lstCVarWH_FCL_Tariff_Details[0]) //var pShippingOrderHeader = pData[0];
                //, new JavaScriptSerializer().Serialize(objCvwShippingOrderPortDate.lstCVarvwShippingOrderPortDate) //var pShippingOrderPort = pData[1];
            };
        }

        [HttpGet, HttpPost]
        // agnet isline=1 or Disbursement IsLine=0
        public Object[] GetCalcTypesID(string pWhereClause)
        {
            CChargeTypes objCChargeTypes = new CChargeTypes();
            objCChargeTypes.GetList(pWhereClause);
            return new Object[] {objCChargeTypes.lstCVarChargeTypes.Count==0?"": new JavaScriptSerializer().Serialize(objCChargeTypes.lstCVarChargeTypes[0].MeasurementID)
            };
        }

        [HttpGet, HttpPost]
        public Object[] WH_FCL_Tariff_Details_LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned(Int32 pPageNumberc, Int32 pPageSize, string pWhereClause, string pOrderBy)
        {

            //Int32 _RowCount = 0;

            CVw_WH_FCL_Tariff_Details objCvwWH_FCL_Tariff_Details = new CVw_WH_FCL_Tariff_Details();
            objCvwWH_FCL_Tariff_Details.GetList(pWhereClause);
          
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[] {
                new JavaScriptSerializer().Serialize(objCvwWH_FCL_Tariff_Details.lstCVarVw_WH_FCL_Tariff_Details) //0
                ,objCvwWH_FCL_Tariff_Details.lstCVarVw_WH_FCL_Tariff_Details.Count,  //1
                //, _RowCount

                //---------------------------Filling Shipping Order Container Totals --------------------------------------
            };
        }

        [HttpGet, HttpPost]
        public object[] WH_FCL_Tariff_Details_Save([FromBody] UpdateWH_FCL_Tariff_DetailsData UpdateWH_FCL_Tariff_DetailsItems)
        {
            bool _result = false;
            string pUpdateClause = "";
            Exception checkException = null;
            int _RowCount = 0;


            CWH_FCL_Tariff_Details objWH_FCL_Tariff_Details = new CWH_FCL_Tariff_Details();

            CVw_WH_FCL_Tariff_Details objCvwWH_FCL_Tariff_Details = new CVw_WH_FCL_Tariff_Details();
            CVarWH_FCL_Tariff_Details objCVarWH_FCL_Tariff_Details = new CVarWH_FCL_Tariff_Details();



            objCVarWH_FCL_Tariff_Details.ChargeTypesID = Int32.Parse(UpdateWH_FCL_Tariff_DetailsItems.pChargeTypesID);
            objCVarWH_FCL_Tariff_Details.Rate = decimal.Parse(UpdateWH_FCL_Tariff_DetailsItems.pRate);
            objCVarWH_FCL_Tariff_Details.ContainerTypesID = UpdateWH_FCL_Tariff_DetailsItems.pContainerTypesID==""?0 : Int32.Parse(UpdateWH_FCL_Tariff_DetailsItems.pContainerTypesID);
            objCVarWH_FCL_Tariff_Details.WH_FCL_TariffID =Int32.Parse(UpdateWH_FCL_Tariff_DetailsItems.pWH_FCL_TariffID);
            objCVarWH_FCL_Tariff_Details.CalculatedAmount = UpdateWH_FCL_Tariff_DetailsItems.pCalculatedAmount==""?0 : decimal.Parse(UpdateWH_FCL_Tariff_DetailsItems.pCalculatedAmount);
            objCVarWH_FCL_Tariff_Details.Commission = UpdateWH_FCL_Tariff_DetailsItems.pCommission==""?0: decimal.Parse(UpdateWH_FCL_Tariff_DetailsItems.pCommission);
            objCVarWH_FCL_Tariff_Details.CalcTypesID = UpdateWH_FCL_Tariff_DetailsItems.pCalcTypesID == "" ? 0 : Int32.Parse(UpdateWH_FCL_Tariff_DetailsItems.pCalcTypesID);
            objCVarWH_FCL_Tariff_Details.isCalcOneTimeToDay = UpdateWH_FCL_Tariff_DetailsItems.pisCalcOneTimeToDay == true ? true : false;

            objCVarWH_FCL_Tariff_Details.ID = Int32.Parse(UpdateWH_FCL_Tariff_DetailsItems.pID);

            objWH_FCL_Tariff_Details.lstCVarWH_FCL_Tariff_Details.Add(objCVarWH_FCL_Tariff_Details);
            checkException = objWH_FCL_Tariff_Details.SaveMethod(objWH_FCL_Tariff_Details.lstCVarWH_FCL_Tariff_Details);
            //checkException = objShippingOrder.UpdateList(pUpdateClause);
            if (checkException == null)
            {
                _result = true;
                objCvwWH_FCL_Tariff_Details.GetListPaging(UpdateWH_FCL_Tariff_DetailsItems.pPageSize, UpdateWH_FCL_Tariff_DetailsItems.pPageNumber, UpdateWH_FCL_Tariff_DetailsItems.pWhereClauseWH_FCL_Tariff_Details, UpdateWH_FCL_Tariff_DetailsItems.pOrderBy, out _RowCount);
            }

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                _result //pData[0]
                , _result ? objCVarWH_FCL_Tariff_Details.ID : 0 //pData[1]
                , _result ? serializer.Serialize(objCvwWH_FCL_Tariff_Details.lstCVarVw_WH_FCL_Tariff_Details) : null //pData[2]
                , _RowCount //pData[3]
            };
        }

        [HttpGet, HttpPost]
        public object[] WH_FCL_Tariff_Details_DeleteList(String pDeleteWH_FCL_Tariff_DetailsIDs
        //LoadWithPaging parameters for Bill
        , string pWhereClauseWH_FCL_Tariff_Details, Int32 pPageSize, Int32 pPageNumber, string pOrderBy)
        {
            bool _result = false;
            Int32 _RowCount = 0;
            CWH_FCL_Tariff_Details objCWH_FCL_Tariff_Details = new CWH_FCL_Tariff_Details();
            CVw_WH_FCL_Tariff_Details objCvwWH_FCL_Tariff_Details = new CVw_WH_FCL_Tariff_Details();
            foreach (var currentID in pDeleteWH_FCL_Tariff_DetailsIDs.Split(','))
            {
                objCWH_FCL_Tariff_Details.lstDeletedCPKWH_FCL_Tariff_Details.Add(new CPKWH_FCL_Tariff_Details() { ID = Int32.Parse(currentID.Trim()) });
            }


            Exception checkException = objCWH_FCL_Tariff_Details.DeleteItem(objCWH_FCL_Tariff_Details.lstDeletedCPKWH_FCL_Tariff_Details);
            if (checkException == null)
                _result = true;
            objCvwWH_FCL_Tariff_Details.GetListPaging(pPageSize, pPageNumber, pWhereClauseWH_FCL_Tariff_Details, pOrderBy, out _RowCount);
            return new object[] {
                _result
                , new JavaScriptSerializer().Serialize(objCvwWH_FCL_Tariff_Details.lstCVarVw_WH_FCL_Tariff_Details) //pData[1]
            };
        }

        //************************************************************************
        //******************** WH_FCL_Tariff_Imo *************************
        //************************************************************************
        [HttpGet, HttpPost]
        public Object[] WH_FCL_Tariff_Imo_LoadItem(Int64 pWH_FCL_Tariff_ImoIDForModal)
        {
            Int32 _RowCount = 0;
            CWH_FCL_Tariff_Imo objCWH_FCL_Tariff_Imo = new CWH_FCL_Tariff_Imo();
            objCWH_FCL_Tariff_Imo.GetListPaging(1, 1, "WHERE ID = " + pWH_FCL_Tariff_ImoIDForModal.ToString(), "ID", out _RowCount);
            //CvwShippingOrderPortDate objCvwShippingOrderPortDate = new CvwShippingOrderPortDate();
            //objCvwShippingOrderPortDate.GetListPaging(100, 1, "WHERE ShippingOrderID = " + pShippingOrderIDForModal.ToString(), "ID", out _RowCount);

            return new Object[] {
                new JavaScriptSerializer().Serialize(objCWH_FCL_Tariff_Imo.lstCVarWH_FCL_Tariff_Imo[0]) //var pShippingOrderHeader = pData[0];
                //, new JavaScriptSerializer().Serialize(objCvwShippingOrderPortDate.lstCVarvwShippingOrderPortDate) //var pShippingOrderPort = pData[1];
            };
        }

        [HttpGet, HttpPost]
        public Object[] WH_FCL_Tariff_Imo_LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned(Int32 pPageNumberc, Int32 pPageSize, string pWhereClause, string pOrderBy)
        {

            //Int32 _RowCount = 0;

            CWH_FCL_Tariff_Imo objCvwWH_FCL_Tariff_Imo = new CWH_FCL_Tariff_Imo();
            objCvwWH_FCL_Tariff_Imo.GetList(pWhereClause);

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[] {
                new JavaScriptSerializer().Serialize(objCvwWH_FCL_Tariff_Imo.lstCVarWH_FCL_Tariff_Imo) //0
                ,objCvwWH_FCL_Tariff_Imo.lstCVarWH_FCL_Tariff_Imo.Count,  //1
                //, _RowCount

                //---------------------------Filling Shipping Order Container Totals --------------------------------------
            };
        }

        [HttpGet, HttpPost]
        public object[] WH_FCL_Tariff_Imo_Save([FromBody] UpdateWH_FCL_Tariff_ImoData UpdateWH_FCL_Tariff_ImoItems)
        {
            bool _result = false;
            string pUpdateClause = "";
            Exception checkException = null;
            int _RowCount = 0;


            CWH_FCL_Tariff_Imo objWH_FCL_Tariff_Imo = new CWH_FCL_Tariff_Imo();

            CVarWH_FCL_Tariff_Imo objCVarWH_FCL_Tariff_Imo = new CVarWH_FCL_Tariff_Imo();



            objCVarWH_FCL_Tariff_Imo.WH_FCL_TariffID = Int32.Parse(UpdateWH_FCL_Tariff_ImoItems.pWH_FCL_TariffID);
            objCVarWH_FCL_Tariff_Imo.ImoClassNo = Int32.Parse(UpdateWH_FCL_Tariff_ImoItems.pImoClassNo);
            objCVarWH_FCL_Tariff_Imo.ImoRate = decimal.Parse(UpdateWH_FCL_Tariff_ImoItems.pImoRate);
            objCVarWH_FCL_Tariff_Imo.CalculatedBy = UpdateWH_FCL_Tariff_ImoItems.pCalculatedBy == null ? 0 : Int32.Parse(UpdateWH_FCL_Tariff_ImoItems.pCalculatedBy);
            objCVarWH_FCL_Tariff_Imo.ID = Int32.Parse(UpdateWH_FCL_Tariff_ImoItems.pID);

            objWH_FCL_Tariff_Imo.lstCVarWH_FCL_Tariff_Imo.Add(objCVarWH_FCL_Tariff_Imo);
            checkException = objWH_FCL_Tariff_Imo.SaveMethod(objWH_FCL_Tariff_Imo.lstCVarWH_FCL_Tariff_Imo);
            //checkException = objShippingOrder.UpdateList(pUpdateClause);
            if (checkException == null)
            {
                _result = true;
                objWH_FCL_Tariff_Imo.GetListPaging(UpdateWH_FCL_Tariff_ImoItems.pPageSize, UpdateWH_FCL_Tariff_ImoItems.pPageNumber, UpdateWH_FCL_Tariff_ImoItems.pWhereClauseWH_FCL_Tariff_Imo, UpdateWH_FCL_Tariff_ImoItems.pOrderBy, out _RowCount);
            }

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                _result //pData[0]
                , _result ? objCVarWH_FCL_Tariff_Imo.ID : 0 //pData[1]
                , _result ? serializer.Serialize(objWH_FCL_Tariff_Imo.lstCVarWH_FCL_Tariff_Imo) : null //pData[2]
                , _RowCount //pData[3]
            };
        }

        [HttpGet, HttpPost]
        public object[] WH_FCL_Tariff_Imo_DeleteList(String pDeleteWH_FCL_Tariff_ImoIDs
//LoadWithPaging parameters for Bill
, string pWhereClauseWH_FCL_Tariff_Imo, Int32 pPageSize, Int32 pPageNumber, string pOrderBy)
        {
            bool _result = false;
            Int32 _RowCount = 0;
            CWH_FCL_Tariff_Imo objCWH_FCL_Tariff_Imo = new CWH_FCL_Tariff_Imo();
            foreach (var currentID in pDeleteWH_FCL_Tariff_ImoIDs.Split(','))
            {
                objCWH_FCL_Tariff_Imo.lstDeletedCPKWH_FCL_Tariff_Imo.Add(new CPKWH_FCL_Tariff_Imo() { ID = Int32.Parse(currentID.Trim()) });
            }


            Exception checkException = objCWH_FCL_Tariff_Imo.DeleteItem(objCWH_FCL_Tariff_Imo.lstDeletedCPKWH_FCL_Tariff_Imo);
            if (checkException == null)
                _result = true;
            objCWH_FCL_Tariff_Imo.GetListPaging(pPageSize, pPageNumber, pWhereClauseWH_FCL_Tariff_Imo, pOrderBy, out _RowCount);
            return new object[] {
                _result
                , new JavaScriptSerializer().Serialize(objCWH_FCL_Tariff_Imo.lstCVarWH_FCL_Tariff_Imo) //pData[1]
            };
        }
        //************************************************************************
        //******************** WH_FCL_Tariff_Details_Periods *************************
        //************************************************************************
        [HttpGet, HttpPost]
        public Object[] WH_FCL_Tariff_Details_Periods_LoadItem(Int64 pWH_FCL_Tariff_Details_PeriodsIDForModal)
        {
            Int32 _RowCount = 0;
            CWH_FCL_Tariff_Details_Periods objCWH_FCL_Tariff_Details_Periods = new CWH_FCL_Tariff_Details_Periods();
            objCWH_FCL_Tariff_Details_Periods.GetListPaging(1, 1, "WHERE ID = " + pWH_FCL_Tariff_Details_PeriodsIDForModal.ToString(), "ID", out _RowCount);
            //CvwShippingOrderPortDate objCvwShippingOrderPortDate = new CvwShippingOrderPortDate();
            //objCvwShippingOrderPortDate.GetListPaging(100, 1, "WHERE ShippingOrderID = " + pShippingOrderIDForModal.ToString(), "ID", out _RowCount);

            return new Object[] {
                new JavaScriptSerializer().Serialize(objCWH_FCL_Tariff_Details_Periods.lstCVarWH_FCL_Tariff_Details_Periods[0]) //var pShippingOrderHeader = pData[0];
                //, new JavaScriptSerializer().Serialize(objCvwShippingOrderPortDate.lstCVarvwShippingOrderPortDate) //var pShippingOrderPort = pData[1];
            };
        }

        [HttpGet, HttpPost]
        public Object[] WH_FCL_Tariff_Details_Periods_LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned(Int32 pPageNumberz, Int32 pPageSize, string pWhereClause, string pOrderBy)
        {

            CWH_FCL_Tariff_Details_Periods objCWH_FCL_Tariff_Details_Periods = new CWH_FCL_Tariff_Details_Periods();
            objCWH_FCL_Tariff_Details_Periods.GetList(pWhereClause);

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[] {
                new JavaScriptSerializer().Serialize(objCWH_FCL_Tariff_Details_Periods.lstCVarWH_FCL_Tariff_Details_Periods)
                , objCWH_FCL_Tariff_Details_Periods.lstCVarWH_FCL_Tariff_Details_Periods.Count

                //---------------------------Filling Shipping Order Container Totals --------------------------------------
            };
        }

        [HttpGet, HttpPost]
        public object[] WH_FCL_Tariff_Details_Periods_Save([FromBody] UpdateWH_FCL_Tariff_Details_PeriodsData UpdateWH_FCL_Tariff_Details_PeriodsDatas)
        {
            bool _result = false;
            string pUpdateClause = "";
            Exception checkException = null;
            int _RowCount = 0;


            CWH_FCL_Tariff_Details_Periods objWH_FCL_Tariff_Details_Periods = new CWH_FCL_Tariff_Details_Periods();
            CVarWH_FCL_Tariff_Details_Periods objCVarWH_FCL_Tariff_Details_Periods = new CVarWH_FCL_Tariff_Details_Periods();



            objCVarWH_FCL_Tariff_Details_Periods.WH_FCL_Tariff_DetailsID = Int32.Parse( UpdateWH_FCL_Tariff_Details_PeriodsDatas.pWH_FCL_Tariff_DetailsID);
            objCVarWH_FCL_Tariff_Details_Periods.Days = Int32.Parse(UpdateWH_FCL_Tariff_Details_PeriodsDatas.pDays);
            objCVarWH_FCL_Tariff_Details_Periods.Rate =decimal.Parse(UpdateWH_FCL_Tariff_Details_PeriodsDatas.pRate);
            objCVarWH_FCL_Tariff_Details_Periods.ID = Int32.Parse(UpdateWH_FCL_Tariff_Details_PeriodsDatas.pID);
            objCVarWH_FCL_Tariff_Details_Periods.PeriodOrder = Int32.Parse(UpdateWH_FCL_Tariff_Details_PeriodsDatas.pPeriodOrder);

            objWH_FCL_Tariff_Details_Periods.lstCVarWH_FCL_Tariff_Details_Periods.Add(objCVarWH_FCL_Tariff_Details_Periods);
            checkException = objWH_FCL_Tariff_Details_Periods.SaveMethod(objWH_FCL_Tariff_Details_Periods.lstCVarWH_FCL_Tariff_Details_Periods);
            //checkException = objShippingOrder.UpdateList(pUpdateClause);
            if (checkException == null)
            {
                _result = true;
                objWH_FCL_Tariff_Details_Periods.GetListPaging(UpdateWH_FCL_Tariff_Details_PeriodsDatas.pPageSize, UpdateWH_FCL_Tariff_Details_PeriodsDatas.pPageNumber, UpdateWH_FCL_Tariff_Details_PeriodsDatas.pWhereClauseWH_FCL_Tariff_Details_Periods, UpdateWH_FCL_Tariff_Details_PeriodsDatas.pOrderBy, out _RowCount);
            }

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                _result //pData[0]
                , _result ? objCVarWH_FCL_Tariff_Details_Periods.ID : 0 //pData[1]
                , _result ? serializer.Serialize(objWH_FCL_Tariff_Details_Periods.lstCVarWH_FCL_Tariff_Details_Periods) : null //pData[2]
                , _RowCount //pData[3]
            };
        }

        [HttpGet, HttpPost]
        public object[] WH_FCL_Tariff_Details_Periods_DeleteList(String pDeleteWH_FCL_Tariff_Details_PeriodsIDs
//LoadWithPaging parameters for Bill
, string pWhereClauseWH_FCL_Tariff_Details_Periods, Int32 pPageSize, Int32 pPageNumber, string pOrderBy)
        {
            bool _result = false;
            Int32 _RowCount = 0;
            CWH_FCL_Tariff_Details_Periods objCWH_FCL_Tariff_Details_Periods = new CWH_FCL_Tariff_Details_Periods();
            //CVw_DemStrTariffContainerType objCvwDemStrTariffContainerType = new CVw_DemStrTariffContainerType();
            foreach (var currentID in pDeleteWH_FCL_Tariff_Details_PeriodsIDs.Split(','))
            {
                objCWH_FCL_Tariff_Details_Periods.lstDeletedCPKWH_FCL_Tariff_Details_Periods.Add(new CPKWH_FCL_Tariff_Details_Periods() { ID = Int32.Parse(currentID.Trim()) });
            }

            Exception checkException = objCWH_FCL_Tariff_Details_Periods.DeleteItem(objCWH_FCL_Tariff_Details_Periods.lstDeletedCPKWH_FCL_Tariff_Details_Periods);
            if (checkException == null)
                _result = true;
            objCWH_FCL_Tariff_Details_Periods.GetListPaging(pPageSize, pPageNumber, pWhereClauseWH_FCL_Tariff_Details_Periods, pOrderBy, out _RowCount);
            return new object[] {
                _result
                , new JavaScriptSerializer().Serialize(objCWH_FCL_Tariff_Details_Periods.lstCVarWH_FCL_Tariff_Details_Periods) //pData[1]
            };
        }

    }
}


public class UpdateWH_FCL_Tariff
{
    public String pID { get; set; }
    public String pCode { get; set; }
    public string pName { get; set; }
    public String pCustomerID { get; set; }
    public String pWH_WarehouseID { get; set; }
    public Boolean pIsDefault { get; set; }
    public Boolean pIsHold { get; set; }
    public DateTime pValidFromTo { get; set; }

    /*****************************/
    public string pWhereClauseWH_FCL_Tariff { get; set; }
    public Int32 pPageSize { get; set; }
    public Int32 pPageNumber { get; set; }
    public string pOrderBy { get; set; }
    public String pWH_FCL_Tariff_Details { get; set; }
}

public class UpdateWH_FCL_Tariff_DetailsData
{
    public String pID { get; set; }
    public String pChargeTypesID { get; set; }
    public String pRate { get; set; }
    public String pContainerTypesID { get; set; }
    public String pWH_FCL_TariffID { get; set; }
    public String pCalculatedAmount { get; set; }
    public String pCommission { get; set; }
    public String pCalcTypesID { get; set; }
    public Boolean pisCalcOneTimeToDay { get; set; }

    /*****************************/
    public string pWhereClauseWH_FCL_Tariff_Details { get; set; }
    public Int32 pPageSize { get; set; }
    public Int32 pPageNumber { get; set; }
    public string pOrderBy { get; set; }
}

public class UpdateWH_FCL_Tariff_ImoData
{
    public String pID { get; set; }
    public String pWH_FCL_TariffID { get; set; }
    public String pImoClassNo { get; set; }
    public String pImoRate { get; set; }
    public String pCalculatedBy { get; set; }
    /*****************************/
    public string pWhereClauseWH_FCL_Tariff_Imo { get; set; }
    public Int32 pPageSize { get; set; }
    public Int32 pPageNumber { get; set; }
    public string pOrderBy { get; set; }
}

public class UpdateWH_FCL_Tariff_Details_PeriodsData
{
    public String pID { get; set; }
    public String pWH_FCL_Tariff_DetailsID { get; set; }
    public String pDays { get; set; }
    public String pRate { get; set; }
    public String pPeriodOrder { get; set; }
    /*****************************/
    public string pWhereClauseWH_FCL_Tariff_Details_Periods { get; set; }
    public Int32 pPageSize { get; set; }
    public Int32 pPageNumber { get; set; }
    public string pOrderBy { get; set; }
}
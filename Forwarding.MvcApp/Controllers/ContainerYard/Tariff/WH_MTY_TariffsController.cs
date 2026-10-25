using Forwarding.MvcApp.Models.ContainerYard.Tariff;
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

namespace Forwarding.MvcApp.Controllers.ContainerYard.Tariff
{
    public class WH_MTY_TariffsController : ApiController
    {
        [HttpGet, HttpPost]
        // agnet isline=1 or ContainerType IsLine=0
        public Object[] WH_MTY_Tariff_LoadAll(string pOrderBy)
        {
            CVw_WH_MTY_Tariff objVw_WH_MTY_Tariffs = new CVw_WH_MTY_Tariff();
            objVw_WH_MTY_Tariffs.GetList(" order by " + pOrderBy);
            return new Object[] { new JavaScriptSerializer().Serialize(objVw_WH_MTY_Tariffs.lstCVarVw_WH_MTY_Tariff) };
        }


        [HttpGet, HttpPost]
        public Object[] WH_MTY_Tariff_LoadItem(Int64 pWHFCLTariffIDForModal)
        {
            Int32 _RowCount = 0;
            CWH_MTY_Tariff objWH_MTY_Tariffs = new CWH_MTY_Tariff();
            objWH_MTY_Tariffs.GetListPaging(1, 1, "WHERE ID = " + pWHFCLTariffIDForModal.ToString(), "ID", out _RowCount);

            return new Object[] {
                new JavaScriptSerializer().Serialize(objWH_MTY_Tariffs.lstCVarWH_MTY_Tariff[0])
            };
        }


        // [Route("/api/ContainerTypes/LoadWithPaging/{pPageNumber}/{pPageSize}")]
        [HttpGet, HttpPost]
        public Object[] WH_MTY_Tariffs_LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned(Int32 pPageNumber, Int32 pPageSize, string pWhereClause, string pOrderBy)
        {
            CVw_WH_MTY_Tariff objVw_WH_MTY_Tariffs = new CVw_WH_MTY_Tariff();

            pWhereClause = (pWhereClause == null ? "" : pWhereClause.Trim().ToUpper());
            Int32 _RowCount = objVw_WH_MTY_Tariffs.lstCVarVw_WH_MTY_Tariff.Count;
            objVw_WH_MTY_Tariffs.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);

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

            return new Object[] { new JavaScriptSerializer().Serialize(objVw_WH_MTY_Tariffs.lstCVarVw_WH_MTY_Tariff),//0
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
        public object[] WH_MTY_Tariff_Save([FromBody] UpdateWH_MTY_Tariff UpdateWH_MTY_Tariffs)
        {
            bool _result = false;
            int _RowCount = 0;
            ////////////////validate///////////////
            CWH_MTY_Tariff objCWH_MTY_TariffV = new CWH_MTY_Tariff();
            objCWH_MTY_TariffV.GetList(string.Format("where 1=1 and WH_WarehouseID={0} and IsDefault=1 and ID!={1} ",
                (UpdateWH_MTY_Tariffs.pWH_WarehouseID == "" ? int.Parse("0") : int.Parse(UpdateWH_MTY_Tariffs.pWH_WarehouseID)),
                UpdateWH_MTY_Tariffs.pID));
            

            CVarWH_MTY_Tariff objCVarWH_MTY_Tariff = new CVarWH_MTY_Tariff();

            //the next 4 lines to get the CreatorUserID and CreationDate and set them as they were entered before
            CWH_MTY_Tariff objCWH_MTY_Tariff = new CWH_MTY_Tariff();
            objCWH_MTY_Tariff.GetItem(int.Parse(UpdateWH_MTY_Tariffs.pID));
            objCVarWH_MTY_Tariff.ID = int.Parse(UpdateWH_MTY_Tariffs.pID);

            objCVarWH_MTY_Tariff.Code = (UpdateWH_MTY_Tariffs.pCode == null ? "0" : UpdateWH_MTY_Tariffs.pCode.Trim().ToUpper());
            objCVarWH_MTY_Tariff.Name = (UpdateWH_MTY_Tariffs.pName == null ? "0" : UpdateWH_MTY_Tariffs.pName.Trim().ToUpper());
            objCVarWH_MTY_Tariff.CustomerID = UpdateWH_MTY_Tariffs.pCustomerID == "" ? int.Parse("0") : int.Parse(UpdateWH_MTY_Tariffs.pCustomerID);
            objCVarWH_MTY_Tariff.WH_WarehouseID = UpdateWH_MTY_Tariffs.pWH_WarehouseID == "" ? int.Parse("0") : int.Parse(UpdateWH_MTY_Tariffs.pWH_WarehouseID);
            if (objCWH_MTY_TariffV.lstCVarWH_MTY_Tariff.Count > 0)
            {
                objCVarWH_MTY_Tariff.IsDefault = false;
            }
            else
            {
                objCVarWH_MTY_Tariff.IsDefault = UpdateWH_MTY_Tariffs.pIsDefault == true ? UpdateWH_MTY_Tariffs.pIsDefault : false;
            }
            objCVarWH_MTY_Tariff.IsHold = UpdateWH_MTY_Tariffs.pIsHold == true ? UpdateWH_MTY_Tariffs.pIsHold : false;
            objCVarWH_MTY_Tariff.ValidFromTo = UpdateWH_MTY_Tariffs.pValidFromTo;
            objCVarWH_MTY_Tariff.ID = Int32.Parse(UpdateWH_MTY_Tariffs.pID);
            objCWH_MTY_Tariff.lstCVarWH_MTY_Tariff.Add(objCVarWH_MTY_Tariff);

            Exception checkException = objCWH_MTY_Tariff.SaveMethod(objCWH_MTY_Tariff.lstCVarWH_MTY_Tariff);
            CVw_WH_MTY_Tariff objCVw_WH_MTY_Tariff = new CVw_WH_MTY_Tariff();
            if (checkException == null)
            {
                _result = true;
                ////CWH_MTY_Tariff_Details objCWH_MTY_Tariff_Details = new CWH_MTY_Tariff_Details();
                ////JavaScriptSerializer jsonSerialiser = new JavaScriptSerializer();
                ////List<CVarWH_MTY_Tariff_Details> listofCVarWH_MTY_Tariff_Details = jsonSerialiser.Deserialize<List<CVarWH_MTY_Tariff_Details>>(UpdateWH_MTY_Tariffs.pWH_MTY_Tariff_Details);
                ////objCWH_MTY_Tariff_Details.lstCVarWH_MTY_Tariff_Details = listofCVarWH_MTY_Tariff_Details;
                ////for (int i = 0; i < objCWH_MTY_Tariff_Details.lstCVarWH_MTY_Tariff_Details.Count; i++)
                ////{
                ////    objCWH_MTY_Tariff_Details.lstCVarWH_MTY_Tariff_Details[i].mIsChanges = true;
                ////    objCWH_MTY_Tariff_Details.lstCVarWH_MTY_Tariff_Details[i].WH_MTY_TariffID = objCWH_MTY_Tariff.lstCVarWH_MTY_Tariff[0].ID;
                ////}
                ////Exception checkExceptionDtls = objCWH_MTY_Tariff_Details.SaveMethod(objCWH_MTY_Tariff_Details.lstCVarWH_MTY_Tariff_Details);
                objCVw_WH_MTY_Tariff.GetListPaging(UpdateWH_MTY_Tariffs.pPageSize, UpdateWH_MTY_Tariffs.pPageNumber, UpdateWH_MTY_Tariffs.pWhereClauseWH_MTY_Tariff, UpdateWH_MTY_Tariffs.pOrderBy, out _RowCount);
            }

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                _result //pData[0]
                , _result ? objCVarWH_MTY_Tariff.ID : 0 //pData[1]
                , _result ? serializer.Serialize(objCVw_WH_MTY_Tariff.lstCVarVw_WH_MTY_Tariff) : null //pData[2]
                , _RowCount //pData[3]
                ,objCWH_MTY_TariffV.lstCVarWH_MTY_Tariff.Count > 0?"dont't save as default tariff to this warehouse, because other tariff is default":"" // pdata[4]
            };
        }

        // [Route("/api/ContainerTypes/Delete/{pContainerTypesIDs}")]
        [HttpGet, HttpPost]
        public object[] WH_MTY_Tariff_DeleteList(String pWH_MTY_TariffIDs, string pWhereClauseWH_MTY_Tariff,
            Int32 pPageSize, Int32 pPageNumber, string pOrderBy)
        {
            bool _result = false;
            Int32 _RowCount = 0;
            CWH_MTY_Tariff objCWH_MTY_Tariff = new CWH_MTY_Tariff();
            foreach (var pWH_MTY_TariffID in pWH_MTY_TariffIDs.Split(','))
            {
                objCWH_MTY_Tariff.lstDeletedCPKWH_MTY_Tariff.Add(new CPKWH_MTY_Tariff() { ID = Int32.Parse(pWH_MTY_TariffID.Trim()) });
            }
            Exception checkException = objCWH_MTY_Tariff.DeleteItem(objCWH_MTY_Tariff.lstDeletedCPKWH_MTY_Tariff);
            CVw_WH_MTY_Tariff objCvw_WH_MTY_Tariff = new CVw_WH_MTY_Tariff();
            if (checkException == null)
                _result = true;
            objCvw_WH_MTY_Tariff.GetListPaging(pPageSize, pPageNumber, pWhereClauseWH_MTY_Tariff, pOrderBy, out _RowCount);
            return new object[] {
                _result
                , new JavaScriptSerializer().Serialize(objCvw_WH_MTY_Tariff.lstCVarVw_WH_MTY_Tariff) //pData[1]
            };
        }

        //************************************************************************
        //******************** WH_MTY_Tariff_Details *************************
        //************************************************************************

        [HttpGet, HttpPost]
        public Object[] WH_MTY_Tariff_Details_LoadItem(Int64 pWH_MTY_Tariff_DetailsIDForModal)
        {
            Int32 _RowCount = 0;
            CWH_MTY_Tariff_Details objCWH_MTY_Tariff_Details = new CWH_MTY_Tariff_Details();
            objCWH_MTY_Tariff_Details.GetListPaging(1, 1, "WHERE ID = " + pWH_MTY_Tariff_DetailsIDForModal.ToString(), "ID", out _RowCount);
            //CvwShippingOrderPortDate objCvwShippingOrderPortDate = new CvwShippingOrderPortDate();
            //objCvwShippingOrderPortDate.GetListPaging(100, 1, "WHERE ShippingOrderID = " + pShippingOrderIDForModal.ToString(), "ID", out _RowCount);

            return new Object[] {
                new JavaScriptSerializer().Serialize(objCWH_MTY_Tariff_Details.lstCVarWH_MTY_Tariff_Details[0]) //var pShippingOrderHeader = pData[0];
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
        public Object[] WH_MTY_Tariff_Details_LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned(Int32 pPageNumberc, Int32 pPageSize, string pWhereClause, string pOrderBy)
        {

            //Int32 _RowCount = 0;

            CVw_WH_MTY_Tariff_Details objCvwWH_MTY_Tariff_Details = new CVw_WH_MTY_Tariff_Details();
            objCvwWH_MTY_Tariff_Details.GetList(pWhereClause);

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[] {
                new JavaScriptSerializer().Serialize(objCvwWH_MTY_Tariff_Details.lstCVarVw_WH_MTY_Tariff_Details) //0
                ,objCvwWH_MTY_Tariff_Details.lstCVarVw_WH_MTY_Tariff_Details.Count,  //1
                //, _RowCount

                //---------------------------Filling Shipping Order Container Totals --------------------------------------
            };
        }

        [HttpGet, HttpPost]
        public object[] WH_MTY_Tariff_Details_Save([FromBody] UpdateWH_MTY_Tariff_DetailsData UpdateWH_MTY_Tariff_DetailsItems)
        {
            bool _result = false;
            string pUpdateClause = "";
            Exception checkException = null;
            int _RowCount = 0;


            CWH_MTY_Tariff_Details objWH_MTY_Tariff_Details = new CWH_MTY_Tariff_Details();

            CVw_WH_MTY_Tariff_Details objCvwWH_MTY_Tariff_Details = new CVw_WH_MTY_Tariff_Details();
            CVarWH_MTY_Tariff_Details objCVarWH_MTY_Tariff_Details = new CVarWH_MTY_Tariff_Details();



            objCVarWH_MTY_Tariff_Details.ChargeTypesID = Int32.Parse(UpdateWH_MTY_Tariff_DetailsItems.pChargeTypesID);
            objCVarWH_MTY_Tariff_Details.Rate = decimal.Parse(UpdateWH_MTY_Tariff_DetailsItems.pRate);
            objCVarWH_MTY_Tariff_Details.ContainerTypesID = UpdateWH_MTY_Tariff_DetailsItems.pContainerTypesID == "" ? 0 : Int32.Parse(UpdateWH_MTY_Tariff_DetailsItems.pContainerTypesID);
            objCVarWH_MTY_Tariff_Details.WH_MTY_TariffID = Int32.Parse(UpdateWH_MTY_Tariff_DetailsItems.pWH_MTY_TariffID);
            objCVarWH_MTY_Tariff_Details.CalcTypesID = UpdateWH_MTY_Tariff_DetailsItems.pCalcTypesID == "" ? 0 : Int32.Parse(UpdateWH_MTY_Tariff_DetailsItems.pCalcTypesID);
            objCVarWH_MTY_Tariff_Details.isCalcOneTimeToDay = UpdateWH_MTY_Tariff_DetailsItems.pisCalcOneTimeToDay == true ? true : false;
            objCVarWH_MTY_Tariff_Details.ID = Int32.Parse(UpdateWH_MTY_Tariff_DetailsItems.pID);

            objWH_MTY_Tariff_Details.lstCVarWH_MTY_Tariff_Details.Add(objCVarWH_MTY_Tariff_Details);
            checkException = objWH_MTY_Tariff_Details.SaveMethod(objWH_MTY_Tariff_Details.lstCVarWH_MTY_Tariff_Details);
            //checkException = objShippingOrder.UpdateList(pUpdateClause);
            if (checkException == null)
            {
                _result = true;
                objCvwWH_MTY_Tariff_Details.GetListPaging(UpdateWH_MTY_Tariff_DetailsItems.pPageSize, UpdateWH_MTY_Tariff_DetailsItems.pPageNumber, UpdateWH_MTY_Tariff_DetailsItems.pWhereClauseWH_MTY_Tariff_Details, UpdateWH_MTY_Tariff_DetailsItems.pOrderBy, out _RowCount);
            }

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                _result //pData[0]
                , _result ? objCVarWH_MTY_Tariff_Details.ID : 0 //pData[1]
                , _result ? serializer.Serialize(objCvwWH_MTY_Tariff_Details.lstCVarVw_WH_MTY_Tariff_Details) : null //pData[2]
                , _RowCount //pData[3]
            };
        }

        [HttpGet, HttpPost]
        public object[] WH_MTY_Tariff_Details_DeleteList(String pDeleteWH_MTY_Tariff_DetailsIDs
//LoadWithPaging parameters for Bill
, string pWhereClauseWH_MTY_Tariff_Details, Int32 pPageSize, Int32 pPageNumber, string pOrderBy)
        {
            bool _result = false;
            Int32 _RowCount = 0;
            CWH_MTY_Tariff_Details objCWH_MTY_Tariff_Details = new CWH_MTY_Tariff_Details();
            CVw_WH_MTY_Tariff_Details objCvwWH_MTY_Tariff_Details = new CVw_WH_MTY_Tariff_Details();
            foreach (var currentID in pDeleteWH_MTY_Tariff_DetailsIDs.Split(','))
            {
                objCWH_MTY_Tariff_Details.lstDeletedCPKWH_MTY_Tariff_Details.Add(new CPKWH_MTY_Tariff_Details() { ID = Int32.Parse(currentID.Trim()) });
            }


            Exception checkException = objCWH_MTY_Tariff_Details.DeleteItem(objCWH_MTY_Tariff_Details.lstDeletedCPKWH_MTY_Tariff_Details);
            if (checkException == null)
                _result = true;
            objCvwWH_MTY_Tariff_Details.GetListPaging(pPageSize, pPageNumber, pWhereClauseWH_MTY_Tariff_Details, pOrderBy, out _RowCount);
            return new object[] {
                _result
                , new JavaScriptSerializer().Serialize(objCvwWH_MTY_Tariff_Details.lstCVarVw_WH_MTY_Tariff_Details) //pData[1]
            };
        }

        //************************************************************************
        //******************** WH_MTY_Tariff_Details_Periods *************************
        //************************************************************************
        [HttpGet, HttpPost]
        public Object[] WH_MTY_Tariff_Details_Periods_LoadItem(Int64 pWH_MTY_Tariff_Details_PeriodsIDForModal)
        {
            Int32 _RowCount = 0;
            CWH_MTY_Tariff_Details_Periods objCWH_MTY_Tariff_Details_Periods = new CWH_MTY_Tariff_Details_Periods();
            objCWH_MTY_Tariff_Details_Periods.GetListPaging(1, 1, "WHERE ID = " + pWH_MTY_Tariff_Details_PeriodsIDForModal.ToString(), "ID", out _RowCount);
            //CvwShippingOrderPortDate objCvwShippingOrderPortDate = new CvwShippingOrderPortDate();
            //objCvwShippingOrderPortDate.GetListPaging(100, 1, "WHERE ShippingOrderID = " + pShippingOrderIDForModal.ToString(), "ID", out _RowCount);

            return new Object[] {
                new JavaScriptSerializer().Serialize(objCWH_MTY_Tariff_Details_Periods.lstCVarWH_MTY_Tariff_Details_Periods[0]) //var pShippingOrderHeader = pData[0];
                //, new JavaScriptSerializer().Serialize(objCvwShippingOrderPortDate.lstCVarvwShippingOrderPortDate) //var pShippingOrderPort = pData[1];
            };
        }

        [HttpGet, HttpPost]
        public Object[] WH_MTY_Tariff_Details_Periods_LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned(Int32 pPageNumberz, Int32 pPageSize, string pWhereClause, string pOrderBy)
        {

            CWH_MTY_Tariff_Details_Periods objCWH_MTY_Tariff_Details_Periods = new CWH_MTY_Tariff_Details_Periods();
            objCWH_MTY_Tariff_Details_Periods.GetList(pWhereClause);

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[] {
                new JavaScriptSerializer().Serialize(objCWH_MTY_Tariff_Details_Periods.lstCVarWH_MTY_Tariff_Details_Periods)
                , objCWH_MTY_Tariff_Details_Periods.lstCVarWH_MTY_Tariff_Details_Periods.Count

                //---------------------------Filling Shipping Order Container Totals --------------------------------------
            };
        }

        [HttpGet, HttpPost]
        public object[] WH_MTY_Tariff_Details_Periods_Save([FromBody] UpdateWH_MTY_Tariff_Details_PeriodsData UpdateWH_MTY_Tariff_Details_PeriodsDatas)
        {
            bool _result = false;
            string pUpdateClause = "";
            Exception checkException = null;
            int _RowCount = 0;


            CWH_MTY_Tariff_Details_Periods objWH_MTY_Tariff_Details_Periods = new CWH_MTY_Tariff_Details_Periods();
            CVarWH_MTY_Tariff_Details_Periods objCVarWH_MTY_Tariff_Details_Periods = new CVarWH_MTY_Tariff_Details_Periods();



            objCVarWH_MTY_Tariff_Details_Periods.WH_MTY_Tariff_DetailsID = Int32.Parse(UpdateWH_MTY_Tariff_Details_PeriodsDatas.pWH_MTY_Tariff_DetailsID);
            objCVarWH_MTY_Tariff_Details_Periods.Days = Int32.Parse(UpdateWH_MTY_Tariff_Details_PeriodsDatas.pDays);
            objCVarWH_MTY_Tariff_Details_Periods.Rate = decimal.Parse(UpdateWH_MTY_Tariff_Details_PeriodsDatas.pRate);
            objCVarWH_MTY_Tariff_Details_Periods.ID = Int32.Parse(UpdateWH_MTY_Tariff_Details_PeriodsDatas.pID);
            objCVarWH_MTY_Tariff_Details_Periods.PeriodOrder = Int32.Parse(UpdateWH_MTY_Tariff_Details_PeriodsDatas.pPeriodOrder);

            objWH_MTY_Tariff_Details_Periods.lstCVarWH_MTY_Tariff_Details_Periods.Add(objCVarWH_MTY_Tariff_Details_Periods);
            checkException = objWH_MTY_Tariff_Details_Periods.SaveMethod(objWH_MTY_Tariff_Details_Periods.lstCVarWH_MTY_Tariff_Details_Periods);
            //checkException = objShippingOrder.UpdateList(pUpdateClause);
            if (checkException == null)
            {
                _result = true;
                objWH_MTY_Tariff_Details_Periods.GetListPaging(UpdateWH_MTY_Tariff_Details_PeriodsDatas.pPageSize, UpdateWH_MTY_Tariff_Details_PeriodsDatas.pPageNumber, UpdateWH_MTY_Tariff_Details_PeriodsDatas.pWhereClauseWH_MTY_Tariff_Details_Periods, UpdateWH_MTY_Tariff_Details_PeriodsDatas.pOrderBy, out _RowCount);
            }

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                _result //pData[0]
                , _result ? objCVarWH_MTY_Tariff_Details_Periods.ID : 0 //pData[1]
                , _result ? serializer.Serialize(objWH_MTY_Tariff_Details_Periods.lstCVarWH_MTY_Tariff_Details_Periods) : null //pData[2]
                , _RowCount //pData[3]
            };
        }

        [HttpGet, HttpPost]
        public object[] WH_MTY_Tariff_Details_Periods_DeleteList(String pDeleteWH_MTY_Tariff_Details_PeriodsIDs
       //LoadWithPaging parameters for Bill
       , string pWhereClauseWH_MTY_Tariff_Details_Periods, Int32 pPageSize, Int32 pPageNumber, string pOrderBy)
        {
            bool _result = false;
            Int32 _RowCount = 0;
            CWH_MTY_Tariff_Details_Periods objCWH_MTY_Tariff_Details_Periods = new CWH_MTY_Tariff_Details_Periods();
            //CVw_DemStrTariffContainerType objCvwDemStrTariffContainerType = new CVw_DemStrTariffContainerType();
            foreach (var currentID in pDeleteWH_MTY_Tariff_Details_PeriodsIDs.Split(','))
            {
                objCWH_MTY_Tariff_Details_Periods.lstDeletedCPKWH_MTY_Tariff_Details_Periods.Add(new CPKWH_MTY_Tariff_Details_Periods() { ID = Int32.Parse(currentID.Trim()) });
            }

            Exception checkException = objCWH_MTY_Tariff_Details_Periods.DeleteItem(objCWH_MTY_Tariff_Details_Periods.lstDeletedCPKWH_MTY_Tariff_Details_Periods);
            if (checkException == null)
                _result = true;
            objCWH_MTY_Tariff_Details_Periods.GetListPaging(pPageSize, pPageNumber, pWhereClauseWH_MTY_Tariff_Details_Periods, pOrderBy, out _RowCount);
            return new object[] {
                _result
                , new JavaScriptSerializer().Serialize(objCWH_MTY_Tariff_Details_Periods.lstCVarWH_MTY_Tariff_Details_Periods) //pData[1]
            };
        }

    }
}

public class UpdateWH_MTY_Tariff
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
    public string pWhereClauseWH_MTY_Tariff { get; set; }
    public Int32 pPageSize { get; set; }
    public Int32 pPageNumber { get; set; }
    public string pOrderBy { get; set; }
    public String pWH_MTY_Tariff_Details { get; set; }
}

public class UpdateWH_MTY_Tariff_DetailsData
{
    public String pID { get; set; }
    public String pChargeTypesID { get; set; }
    public String pRate { get; set; }
    public String pContainerTypesID { get; set; }
    public String pWH_MTY_TariffID { get; set; }
    public String pCalcTypesID { get; set; }
    public Boolean pisCalcOneTimeToDay { get; set; }

    /*****************************/
    public string pWhereClauseWH_MTY_Tariff_Details { get; set; }
    public Int32 pPageSize { get; set; }
    public Int32 pPageNumber { get; set; }
    public string pOrderBy { get; set; }
}

public class UpdateWH_MTY_Tariff_Details_PeriodsData
{
    public String pID { get; set; }
    public String pWH_MTY_Tariff_DetailsID { get; set; }
    public String pDays { get; set; }
    public String pRate { get; set; }
    public String pPeriodOrder { get; set; }
    /*****************************/
    public string pWhereClauseWH_MTY_Tariff_Details_Periods { get; set; }
    public Int32 pPageSize { get; set; }
    public Int32 pPageNumber { get; set; }
    public string pOrderBy { get; set; }
}
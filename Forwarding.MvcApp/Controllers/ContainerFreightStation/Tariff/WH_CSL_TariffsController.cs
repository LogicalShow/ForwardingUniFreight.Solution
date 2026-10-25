using Forwarding.MvcApp.Models.ContainerFreightStation.Tariff;
using Forwarding.MvcApp.Models.Customized;
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
using WebMatrix.WebData;
using Forwarding.MvcApp.Models.Administration.Settings.Generated;
using Forwarding.MvcApp.Models.Administration.Security.Generated;

namespace Forwarding.MvcApp.Controllers.ContainerFreightStation.Tariff
{
    public class WH_CSL_TariffsController : ApiController
    {
        [HttpGet, HttpPost]
        public Object[] WH_CSL_Tariff_LoadAll(string pOrderBy)
        {
            CVw_WH_CSL_Tariff objVw_WH_CSL_Tariffs = new CVw_WH_CSL_Tariff();
            objVw_WH_CSL_Tariffs.GetList(" order by " + pOrderBy);
            return new Object[] { new JavaScriptSerializer().Serialize(objVw_WH_CSL_Tariffs.lstCVarVw_WH_CSL_Tariff) };
        }
		[HttpGet,HttpPost]
		public object LoadWithWhereClause(string pWhereClause)
		{
			CVw_WH_CSL_Tariff objVw_WH_CSL_Tariffs = new CVw_WH_CSL_Tariff();
			objVw_WH_CSL_Tariffs.GetList(pWhereClause);
			return new { Tarrif = objVw_WH_CSL_Tariffs.lstCVarVw_WH_CSL_Tariff.Count==0?null: new JavaScriptSerializer().Serialize(objVw_WH_CSL_Tariffs.lstCVarVw_WH_CSL_Tariff[0]) };
		}

		[HttpGet, HttpPost]
        public Object[] WH_CSL_Tariff_LoadItem(Int64 pWHFCLTariffIDForModal)
        {
            Int32 _RowCount = 0;
            CWH_CSL_Tariff objWH_CSL_Tariffs = new CWH_CSL_Tariff();
            objWH_CSL_Tariffs.GetListPaging(1, 1, "WHERE ID = " + pWHFCLTariffIDForModal.ToString(), "ID", out _RowCount);

            return new Object[] {
                new JavaScriptSerializer().Serialize(objWH_CSL_Tariffs.lstCVarWH_CSL_Tariff[0])
            };
        }

        [HttpGet, HttpPost]
        public Object[] WH_CSL_Tariffs_LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned(Int32 pPageNumber, Int32 pPageSize, string pWhereClause, string pOrderBy)
        {
            CVw_WH_CSL_Tariff objVw_WH_CSL_Tariffs = new CVw_WH_CSL_Tariff();

            pWhereClause = (pWhereClause == null ? "" : pWhereClause.Trim().ToUpper());
            Int32 _RowCount = objVw_WH_CSL_Tariffs.lstCVarVw_WH_CSL_Tariff.Count;
            objVw_WH_CSL_Tariffs.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);


            var invoiceTypeList = new CInvoiceTypes();
            //invoiceTypeList.GetList("Where IsWarehouseType = 1");
            invoiceTypeList.GetList("Where IsInactive = 0 And isnull(IsMainInvoice,0)=0 and Code NOT IN ('draft') ");

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

            CNoAccessMeasurements objCNoAccessMeasurements = new CNoAccessMeasurements();
            objCNoAccessMeasurements.GetList(" where IsUsedInConsolidation = 1 ");

            var pNoAccessMeasurementsList = objCNoAccessMeasurements.lstCVarNoAccessMeasurements
                .Select(ss => new
                {
                    ID = ss.ID,
                    Name = ss.Name
                })
                .Distinct().OrderBy(o => o.Name).ToList();

            CBranches objCBranches = new CBranches();
            objCBranches.GetList(" where 1=1 ");
            var pBranches = objCBranches.lstCVarBranches
                .Select(ss => new
                {
                    ID = ss.ID,
                    Name = ss.Name
                })
                .Distinct().OrderBy(o => o.Name).ToList();

			CChargeTypeGroup objCChargeTypeGroup = new CChargeTypeGroup();
			objCChargeTypeGroup.GetList("where 1=1");
			var chargeTypeGroups = objCChargeTypeGroup.lstCVarChargeTypeGroup.Select(a => new { ID = a.ID, Name = a.Name });

            CTaxeTypes objCTaxeTypes = new CTaxeTypes();
            objCTaxeTypes.GetList($"where ISNULL(IsInactive,0)=0 and ISNULL(IsDiscount,0)=0");
            var TaxTypes = objCTaxeTypes.lstCVarTaxeTypes.Select(a => new { ID = a.ID, Name = a.Name });

            var serialize = new JavaScriptSerializer { MaxJsonLength = int.MaxValue };

			return new Object[] { serialize.Serialize(objVw_WH_CSL_Tariffs.lstCVarVw_WH_CSL_Tariff),//0
                                _RowCount, //1
                                serialize.Serialize(pCustomerList),//2
                                serialize.Serialize(pWarehouseList),//3
                                serialize.Serialize(pChargeTypesList),//4
                                serialize.Serialize(pNoAccessMeasurementsList),//5
                                serialize.Serialize(invoiceTypeList.lstCVarInvoiceTypes),//6
                                serialize.Serialize(pBranches),//7
                                serialize.Serialize(chargeTypeGroups),//8
                                serialize.Serialize(TaxTypes)//9
            };
        }

        [HttpGet, HttpPost]
        public object[] WH_CSL_Tariff_Save([FromBody] UpdateWH_CSL_Tariff UpdateWH_CSL_Tariffs)
        {
            bool _result = false;
            int _RowCount = 0;
            bool DuplicatedDefaultTarrif = false;

            CVarWH_CSL_Tariff objCVarWH_CSL_Tariff = new CVarWH_CSL_Tariff();
            CVw_WH_CSL_Tariff objCVw_WH_CSL_Tariff = new CVw_WH_CSL_Tariff();

            //the next 4 lines to get the CreatorUserID and CreationDate and set them as they were entered before
            CWH_CSL_Tariff objCWH_CSL_Tariff = new CWH_CSL_Tariff();

            //nour23092023
            if (UpdateWH_CSL_Tariffs.pIsDefault == true)
            {
                CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
                string isWarehouseType = objCCustomizedDBCall.CallStringFunction($"select IsWarehouseType from InvoiceTypes where ID={UpdateWH_CSL_Tariffs.pInvoiceTypeID}");

                if(Boolean.Parse(isWarehouseType))
                {
                    objCWH_CSL_Tariff.GetList(" Where IsDefault = 1 and InvoiceTypeID = " + UpdateWH_CSL_Tariffs.pInvoiceTypeID + " and WH_WarehouseID = " + UpdateWH_CSL_Tariffs.pWH_WarehouseID + " and ID !=" + UpdateWH_CSL_Tariffs.pID);
                    if (objCWH_CSL_Tariff.lstCVarWH_CSL_Tariff.Count > 0)
                    {
                        DuplicatedDefaultTarrif = true;
                    }
                } else
                {
                    objCWH_CSL_Tariff.GetList(" Where IsDefault = 1 and InvoiceTypeID = " + UpdateWH_CSL_Tariffs.pInvoiceTypeID + " and BranchID = " + UpdateWH_CSL_Tariffs.pBranchID + " and ID !=" + UpdateWH_CSL_Tariffs.pID);
                    if (objCWH_CSL_Tariff.lstCVarWH_CSL_Tariff.Count > 0)
                    {
                        DuplicatedDefaultTarrif = true;
                    }
                }

                
            }


            if (DuplicatedDefaultTarrif == false)
            {
                objCWH_CSL_Tariff.GetItem(int.Parse(UpdateWH_CSL_Tariffs.pID));
                objCVarWH_CSL_Tariff.ID = int.Parse(UpdateWH_CSL_Tariffs.pID);

                objCVarWH_CSL_Tariff.Code = (UpdateWH_CSL_Tariffs.pCode == null ? "0" : UpdateWH_CSL_Tariffs.pCode.Trim().ToUpper());
                objCVarWH_CSL_Tariff.Name = (UpdateWH_CSL_Tariffs.pName == null ? "0" : UpdateWH_CSL_Tariffs.pName.Trim().ToUpper());
                objCVarWH_CSL_Tariff.CustomerID = UpdateWH_CSL_Tariffs.pCustomerID == "" ? int.Parse("0") : int.Parse(UpdateWH_CSL_Tariffs.pCustomerID);
                objCVarWH_CSL_Tariff.WH_WarehouseID = UpdateWH_CSL_Tariffs.pWH_WarehouseID == "" ? int.Parse("0") : int.Parse(UpdateWH_CSL_Tariffs.pWH_WarehouseID);
                objCVarWH_CSL_Tariff.IsDefault = UpdateWH_CSL_Tariffs.pIsDefault == true ? UpdateWH_CSL_Tariffs.pIsDefault : false;
                objCVarWH_CSL_Tariff.IsHold = UpdateWH_CSL_Tariffs.pIsHold == true ? UpdateWH_CSL_Tariffs.pIsHold : false;
                objCVarWH_CSL_Tariff.ValidFromTo = UpdateWH_CSL_Tariffs.pValidFromTo;
                objCVarWH_CSL_Tariff.InvoiceTypeID = UpdateWH_CSL_Tariffs.pInvoiceTypeID;
                objCVarWH_CSL_Tariff.BranchID = UpdateWH_CSL_Tariffs.pBranchID == "" ? int.Parse("0") : int.Parse(UpdateWH_CSL_Tariffs.pBranchID);
                objCVarWH_CSL_Tariff.ID = Int32.Parse(UpdateWH_CSL_Tariffs.pID);
                objCVarWH_CSL_Tariff.ChargeTypeGroupID = UpdateWH_CSL_Tariffs.pChargeTypeGroupID;
                objCVarWH_CSL_Tariff.InvoicingFromReceivable = UpdateWH_CSL_Tariffs.pInvoicingFromReceivable;
                objCVarWH_CSL_Tariff.TaxTypeID = UpdateWH_CSL_Tariffs.pTaxTypeID;
                objCWH_CSL_Tariff.lstCVarWH_CSL_Tariff.Add(objCVarWH_CSL_Tariff);

                Exception checkException = objCWH_CSL_Tariff.SaveMethod(objCWH_CSL_Tariff.lstCVarWH_CSL_Tariff);


                if (checkException == null)
                {
                    _result = true;

                    // cancelled by nour and added at SQL update SP
                    //// added by nour to log the hold action
                    ////if (UpdateWH_CSL_Tariffs.pIsHold)
                    ////{
                    ////    CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
                    ////    objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "WH_CSL_Tariff", Int64.Parse(UpdateWH_CSL_Tariffs.pID), "Hold");
                    ////}


                    ////CWH_CSL_Tariff_Details objCWH_CSL_Tariff_Details = new CWH_CSL_Tariff_Details();
                    ////JavaScriptSerializer jsonSerialiser = new JavaScriptSerializer();
                    ////List<CVarWH_CSL_Tariff_Details> listofCVarWH_CSL_Tariff_Details = jsonSerialiser.Deserialize<List<CVarWH_CSL_Tariff_Details>>(UpdateWH_CSL_Tariffs.pWH_CSL_Tariff_Details);
                    ////objCWH_CSL_Tariff_Details.lstCVarWH_CSL_Tariff_Details = listofCVarWH_CSL_Tariff_Details;
                    ////for (int i = 0; i < objCWH_CSL_Tariff_Details.lstCVarWH_CSL_Tariff_Details.Count; i++)
                    ////{
                    ////    objCWH_CSL_Tariff_Details.lstCVarWH_CSL_Tariff_Details[i].mIsChanges = true;
                    ////    objCWH_CSL_Tariff_Details.lstCVarWH_CSL_Tariff_Details[i].WH_CSL_TariffID = objCWH_CSL_Tariff.lstCVarWH_CSL_Tariff[0].ID;
                    ////}
                    ////Exception checkExceptionDtls = objCWH_CSL_Tariff_Details.SaveMethod(objCWH_CSL_Tariff_Details.lstCVarWH_CSL_Tariff_Details);
                    objCVw_WH_CSL_Tariff.GetListPaging(UpdateWH_CSL_Tariffs.pPageSize, UpdateWH_CSL_Tariffs.pPageNumber, UpdateWH_CSL_Tariffs.pWhereClauseWH_CSL_Tariff, UpdateWH_CSL_Tariffs.pOrderBy, out _RowCount);
                }
            }

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                _result //pData[0]
                , _result ? objCVarWH_CSL_Tariff.ID : 0 //pData[1]
                , _result ? serializer.Serialize(objCVw_WH_CSL_Tariff.lstCVarVw_WH_CSL_Tariff) : null //pData[2]
                , _RowCount //pData[3]
                , _result ? objCVarWH_CSL_Tariff.Code : string.Empty //pData[4]
                , DuplicatedDefaultTarrif //pData[5]
                };
        }

        [HttpGet, HttpPost]
        public object[] WH_CSL_Tariff_DeleteList(String pWH_CSL_TariffIDs, string pWhereClauseWH_CSL_Tariff,
            Int32 pPageSize, Int32 pPageNumber, string pOrderBy)
        {
            bool _result = false;
            Int32 _RowCount = 0;
            CWH_CSL_Tariff objCWH_CSL_Tariff = new CWH_CSL_Tariff();
            foreach (var pWH_CSL_TariffID in pWH_CSL_TariffIDs.Split(','))
            {
                objCWH_CSL_Tariff.lstDeletedCPKWH_CSL_Tariff.Add(new CPKWH_CSL_Tariff() { ID = Int32.Parse(pWH_CSL_TariffID.Trim()) });
            }
            Exception checkException = objCWH_CSL_Tariff.DeleteItem(objCWH_CSL_Tariff.lstDeletedCPKWH_CSL_Tariff);
            CVw_WH_CSL_Tariff objCvw_WH_CSL_Tariff = new CVw_WH_CSL_Tariff();
            if (checkException == null)
                _result = true;
            objCvw_WH_CSL_Tariff.GetListPaging(pPageSize, pPageNumber, pWhereClauseWH_CSL_Tariff, pOrderBy, out _RowCount);
            return new object[] {
                _result
                , new JavaScriptSerializer().Serialize(objCvw_WH_CSL_Tariff.lstCVarVw_WH_CSL_Tariff) //pData[1]
            };
        }



        //************************************************************************
        //******************** WH_CSL_Tariff_Details *************************
        //************************************************************************
        [HttpGet, HttpPost]
        public Object[] WH_CSL_Tariff_Details_LoadItem(Int64 pWH_CSL_Tariff_DetailsIDForModal)
        {
            Int32 _RowCount = 0;
            CWH_CSL_Tariff_Details objCWH_CSL_Tariff_Details = new CWH_CSL_Tariff_Details();
            objCWH_CSL_Tariff_Details.GetListPaging(1, 1, "WHERE ID = " + pWH_CSL_Tariff_DetailsIDForModal.ToString(), "ID", out _RowCount);
            //CvwShippingOrderPortDate objCvwShippingOrderPortDate = new CvwShippingOrderPortDate();
            //objCvwShippingOrderPortDate.GetListPaging(100, 1, "WHERE ShippingOrderID = " + pShippingOrderIDForModal.ToString(), "ID", out _RowCount);

            return new Object[] {
                new JavaScriptSerializer().Serialize(objCWH_CSL_Tariff_Details.lstCVarWH_CSL_Tariff_Details[0]) //var pShippingOrderHeader = pData[0];
                //, new JavaScriptSerializer().Serialize(objCvwShippingOrderPortDate.lstCVarvwShippingOrderPortDate) //var pShippingOrderPort = pData[1];
            };
        }
        [HttpGet, HttpPost]
        // agnet isline=1 or Disbursement IsLine=0
        public Object[] GetCalcTypesID(string WhereClause)
        {
            CChargeTypes objCChargeTypes = new CChargeTypes();
            objCChargeTypes.GetList(WhereClause);
            return new Object[] {objCChargeTypes.lstCVarChargeTypes.Count==0?"": new JavaScriptSerializer().Serialize(objCChargeTypes.lstCVarChargeTypes[0].MeasurementID)
            };
        }
        [HttpGet, HttpPost]
        public Object[] WH_CSL_Tariff_Details_LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned(Int32 pPageNumberc, Int32 pPageSize, string pWhereClause, string pOrderBy)
        {

            //Int32 _RowCount = 0;

            CVw_WH_CSL_Tariff_Details objCvwWH_CSL_Tariff_Details = new CVw_WH_CSL_Tariff_Details();
            objCvwWH_CSL_Tariff_Details.GetList(pWhereClause);

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[] {
                new JavaScriptSerializer().Serialize(objCvwWH_CSL_Tariff_Details.lstCVarVw_WH_CSL_Tariff_Details) //0
                ,objCvwWH_CSL_Tariff_Details.lstCVarVw_WH_CSL_Tariff_Details.Count,  //1
                //, _RowCount

                //---------------------------Filling Shipping Order Container Totals --------------------------------------
            };
        }
        [HttpGet, HttpPost]
        public object[] WH_CSL_Tariff_Details_Save([FromBody] UpdateWH_CSL_Tariff_DetailsData UpdateWH_CSL_Tariff_DetailsItems)
        {
            bool _result = false;
            string pUpdateClause = "";
            Exception checkException = null;
            int _RowCount = 0;


            CWH_CSL_Tariff_Details objWH_CSL_Tariff_Details = new CWH_CSL_Tariff_Details();

            CVw_WH_CSL_Tariff_Details objCvwWH_CSL_Tariff_Details = new CVw_WH_CSL_Tariff_Details();
            CVarWH_CSL_Tariff_Details objCVarWH_CSL_Tariff_Details = new CVarWH_CSL_Tariff_Details();



            objCVarWH_CSL_Tariff_Details.ChargeTypesID = Int32.Parse(UpdateWH_CSL_Tariff_DetailsItems.pChargeTypesID);
            objCVarWH_CSL_Tariff_Details.Rate = decimal.Parse(UpdateWH_CSL_Tariff_DetailsItems.pRate);
            objCVarWH_CSL_Tariff_Details.CalcTypesID = UpdateWH_CSL_Tariff_DetailsItems.pCalcTypesID == "" ? 0 : Int32.Parse(UpdateWH_CSL_Tariff_DetailsItems.pCalcTypesID);
            objCVarWH_CSL_Tariff_Details.WH_CSL_TariffID = Int32.Parse(UpdateWH_CSL_Tariff_DetailsItems.pWH_CSL_TariffID);
            objCVarWH_CSL_Tariff_Details.CalculatedAmount = UpdateWH_CSL_Tariff_DetailsItems.pCalculatedAmount == "" ? 0 : decimal.Parse(UpdateWH_CSL_Tariff_DetailsItems.pCalculatedAmount);
            objCVarWH_CSL_Tariff_Details.Commission = UpdateWH_CSL_Tariff_DetailsItems.pCommission == "" ? 0 : decimal.Parse(UpdateWH_CSL_Tariff_DetailsItems.pCommission);
            objCVarWH_CSL_Tariff_Details.ID = Int32.Parse(UpdateWH_CSL_Tariff_DetailsItems.pID);
            objCVarWH_CSL_Tariff_Details.isCalcOneTimeToDay = UpdateWH_CSL_Tariff_DetailsItems.pisCalcOneTimeToDay == true ? true : false;
            objCVarWH_CSL_Tariff_Details.ApplayIMOTariff = UpdateWH_CSL_Tariff_DetailsItems.pApplayIMOTariff == true ? true : false;

            objCVarWH_CSL_Tariff_Details.MinAmount = UpdateWH_CSL_Tariff_DetailsItems.pMinAmount == "" ? 0 : decimal.Parse(UpdateWH_CSL_Tariff_DetailsItems.pMinAmount);
            objCVarWH_CSL_Tariff_Details.MaxAmount = UpdateWH_CSL_Tariff_DetailsItems.pMaxAmount == "" ? 0 : decimal.Parse(UpdateWH_CSL_Tariff_DetailsItems.pMaxAmount);

            objWH_CSL_Tariff_Details.lstCVarWH_CSL_Tariff_Details.Add(objCVarWH_CSL_Tariff_Details);
            checkException = objWH_CSL_Tariff_Details.SaveMethod(objWH_CSL_Tariff_Details.lstCVarWH_CSL_Tariff_Details);
            //checkException = objShippingOrder.UpdateList(pUpdateClause);
            if (checkException == null)
            {
                _result = true;
                objCvwWH_CSL_Tariff_Details.GetListPaging(UpdateWH_CSL_Tariff_DetailsItems.pPageSize, UpdateWH_CSL_Tariff_DetailsItems.pPageNumber, UpdateWH_CSL_Tariff_DetailsItems.pWhereClauseWH_CSL_Tariff_Details, UpdateWH_CSL_Tariff_DetailsItems.pOrderBy, out _RowCount);
            }

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                _result //pData[0]
                , _result ? objCVarWH_CSL_Tariff_Details.ID : 0 //pData[1]
                , _result ? serializer.Serialize(objCvwWH_CSL_Tariff_Details.lstCVarVw_WH_CSL_Tariff_Details) : null //pData[2]
                , _RowCount //pData[3]
            };
        }

        [HttpGet, HttpPost]
        public object[] WH_CSL_Tariff_Details_DeleteList(String pDeleteWH_CSL_Tariff_DetailsIDs
        //LoadWithPaging parameters for Bill
        , string pWhereClauseWH_CSL_Tariff_Details, Int32 pPageSize, Int32 pPageNumber, string pOrderBy)
        {
            bool _result = false;
            Int32 _RowCount = 0;
            CWH_CSL_Tariff_Details objCWH_CSL_Tariff_Details = new CWH_CSL_Tariff_Details();
            CVw_WH_CSL_Tariff_Details objCvwWH_CSL_Tariff_Details = new CVw_WH_CSL_Tariff_Details();
            foreach (var currentID in pDeleteWH_CSL_Tariff_DetailsIDs.Split(','))
            {
                objCWH_CSL_Tariff_Details.lstDeletedCPKWH_CSL_Tariff_Details.Add(new CPKWH_CSL_Tariff_Details() { ID = Int32.Parse(currentID.Trim()) });
            }


            Exception checkException = objCWH_CSL_Tariff_Details.DeleteItem(objCWH_CSL_Tariff_Details.lstDeletedCPKWH_CSL_Tariff_Details);
            if (checkException == null)
                _result = true;
            objCvwWH_CSL_Tariff_Details.GetListPaging(pPageSize, pPageNumber, pWhereClauseWH_CSL_Tariff_Details, pOrderBy, out _RowCount);
            return new object[] {
                _result
                , new JavaScriptSerializer().Serialize(objCvwWH_CSL_Tariff_Details.lstCVarVw_WH_CSL_Tariff_Details) //pData[1]
            };
        }
        //************************************************************************
        //******************** WH_CSL_Tariff_Imo *************************
        //************************************************************************
        [HttpGet, HttpPost]
        public Object[] WH_CSL_Tariff_Imo_LoadItem(Int64 pWH_CSL_Tariff_ImoIDForModal)
        {
            Int32 _RowCount = 0;
            CWH_CSL_Tariff_Imo objCWH_CSL_Tariff_Imo = new CWH_CSL_Tariff_Imo();
            objCWH_CSL_Tariff_Imo.GetListPaging(1, 1, "WHERE ID = " + pWH_CSL_Tariff_ImoIDForModal.ToString(), "ID", out _RowCount);
            //CvwShippingOrderPortDate objCvwShippingOrderPortDate = new CvwShippingOrderPortDate();
            //objCvwShippingOrderPortDate.GetListPaging(100, 1, "WHERE ShippingOrderID = " + pShippingOrderIDForModal.ToString(), "ID", out _RowCount);

            return new Object[] {
                new JavaScriptSerializer().Serialize(objCWH_CSL_Tariff_Imo.lstCVarWH_CSL_Tariff_Imo[0]) //var pShippingOrderHeader = pData[0];
                //, new JavaScriptSerializer().Serialize(objCvwShippingOrderPortDate.lstCVarvwShippingOrderPortDate) //var pShippingOrderPort = pData[1];
            };
        }
        [HttpGet, HttpPost]
        public Object[] WH_CSL_Tariff_Imo_LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned(Int32 pPageNumberc, Int32 pPageSize, string pWhereClause, string pOrderBy)
        {

            //Int32 _RowCount = 0;

            CWH_CSL_Tariff_Imo objCvwWH_CSL_Tariff_Imo = new CWH_CSL_Tariff_Imo();
            objCvwWH_CSL_Tariff_Imo.GetList(pWhereClause);

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[] {
                new JavaScriptSerializer().Serialize(objCvwWH_CSL_Tariff_Imo.lstCVarWH_CSL_Tariff_Imo) //0
                ,objCvwWH_CSL_Tariff_Imo.lstCVarWH_CSL_Tariff_Imo.Count,  //1
                //, _RowCount

                //---------------------------Filling Shipping Order Container Totals --------------------------------------
            };
        }

        [HttpGet, HttpPost]
        public object[] WH_CSL_Tariff_Imo_Save([FromBody] UpdateWH_CSL_Tariff_ImoData UpdateWH_CSL_Tariff_ImoItems)
        {
            bool _result = false;
            string pUpdateClause = "";
            Exception checkException = null;
            int _RowCount = 0;


            CWH_CSL_Tariff_Imo objWH_CSL_Tariff_Imo = new CWH_CSL_Tariff_Imo();

            CVarWH_CSL_Tariff_Imo objCVarWH_CSL_Tariff_Imo = new CVarWH_CSL_Tariff_Imo();



            objCVarWH_CSL_Tariff_Imo.WH_CSL_TariffID = Int32.Parse(UpdateWH_CSL_Tariff_ImoItems.pWH_CSL_TariffID);
            objCVarWH_CSL_Tariff_Imo.ImoClassNo = Int32.Parse(UpdateWH_CSL_Tariff_ImoItems.pImoClassNo);
            objCVarWH_CSL_Tariff_Imo.ImoRate = decimal.Parse(UpdateWH_CSL_Tariff_ImoItems.pImoRate);
            objCVarWH_CSL_Tariff_Imo.CalculatedBy = UpdateWH_CSL_Tariff_ImoItems.pCalculatedBy == null ? 0 : Int32.Parse(UpdateWH_CSL_Tariff_ImoItems.pCalculatedBy);
            objCVarWH_CSL_Tariff_Imo.ID = Int32.Parse(UpdateWH_CSL_Tariff_ImoItems.pID);

            objWH_CSL_Tariff_Imo.lstCVarWH_CSL_Tariff_Imo.Add(objCVarWH_CSL_Tariff_Imo);
            checkException = objWH_CSL_Tariff_Imo.SaveMethod(objWH_CSL_Tariff_Imo.lstCVarWH_CSL_Tariff_Imo);
            //checkException = objShippingOrder.UpdateList(pUpdateClause);
            if (checkException == null)
            {
                _result = true;
                objWH_CSL_Tariff_Imo.GetListPaging(UpdateWH_CSL_Tariff_ImoItems.pPageSize, UpdateWH_CSL_Tariff_ImoItems.pPageNumber, UpdateWH_CSL_Tariff_ImoItems.pWhereClauseWH_CSL_Tariff_Imo, UpdateWH_CSL_Tariff_ImoItems.pOrderBy, out _RowCount);
            }

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                _result //pData[0]
                , _result ? objCVarWH_CSL_Tariff_Imo.ID : 0 //pData[1]
                , _result ? serializer.Serialize(objWH_CSL_Tariff_Imo.lstCVarWH_CSL_Tariff_Imo) : null //pData[2]
                , _RowCount //pData[3]
            };
        }

        [HttpGet, HttpPost]
        public object[] WH_CSL_Tariff_Imo_DeleteList(String pDeleteWH_CSL_Tariff_ImoIDs
//LoadWithPaging parameters for Bill
, string pWhereClauseWH_CSL_Tariff_Imo, Int32 pPageSize, Int32 pPageNumber, string pOrderBy)
        {
            bool _result = false;
            Int32 _RowCount = 0;
            CWH_CSL_Tariff_Imo objCWH_CSL_Tariff_Imo = new CWH_CSL_Tariff_Imo();
            foreach (var currentID in pDeleteWH_CSL_Tariff_ImoIDs.Split(','))
            {
                objCWH_CSL_Tariff_Imo.lstDeletedCPKWH_CSL_Tariff_Imo.Add(new CPKWH_CSL_Tariff_Imo() { ID = Int32.Parse(currentID.Trim()) });
            }


            Exception checkException = objCWH_CSL_Tariff_Imo.DeleteItem(objCWH_CSL_Tariff_Imo.lstDeletedCPKWH_CSL_Tariff_Imo);
            if (checkException == null)
                _result = true;
            objCWH_CSL_Tariff_Imo.GetListPaging(pPageSize, pPageNumber, pWhereClauseWH_CSL_Tariff_Imo, pOrderBy, out _RowCount);
            return new object[] {
                _result
                , new JavaScriptSerializer().Serialize(objCWH_CSL_Tariff_Imo.lstCVarWH_CSL_Tariff_Imo) //pData[1]
            };
        }
        //************************************************************************
        //******************** WH_CSL_Tariff_Details_Periods *************************
        //************************************************************************
        [HttpGet, HttpPost]
        public Object[] WH_CSL_Tariff_Details_Periods_LoadItem(Int64 pWH_CSL_Tariff_Details_PeriodsIDForModal)
        {
            Int32 _RowCount = 0;
            CWH_CSL_Tariff_Details_Periods objCWH_CSL_Tariff_Details_Periods = new CWH_CSL_Tariff_Details_Periods();
            objCWH_CSL_Tariff_Details_Periods.GetListPaging(1, 1, "WHERE ID = " + pWH_CSL_Tariff_Details_PeriodsIDForModal.ToString(), "ID", out _RowCount);
            //CvwShippingOrderPortDate objCvwShippingOrderPortDate = new CvwShippingOrderPortDate();
            //objCvwShippingOrderPortDate.GetListPaging(100, 1, "WHERE ShippingOrderID = " + pShippingOrderIDForModal.ToString(), "ID", out _RowCount);

            return new Object[] {
                new JavaScriptSerializer().Serialize(objCWH_CSL_Tariff_Details_Periods.lstCVarWH_CSL_Tariff_Details_Periods[0]) //var pShippingOrderHeader = pData[0];
                //, new JavaScriptSerializer().Serialize(objCvwShippingOrderPortDate.lstCVarvwShippingOrderPortDate) //var pShippingOrderPort = pData[1];
            };
        }

        [HttpGet, HttpPost]
        public Object[] WH_CSL_Tariff_Details_Periods_LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned(Int32 pPageNumberz, Int32 pPageSize, string pWhereClause, string pOrderBy)
        {

            CWH_CSL_Tariff_Details_Periods objCWH_CSL_Tariff_Details_Periods = new CWH_CSL_Tariff_Details_Periods();
            objCWH_CSL_Tariff_Details_Periods.GetList(pWhereClause);

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[] {
                new JavaScriptSerializer().Serialize(objCWH_CSL_Tariff_Details_Periods.lstCVarWH_CSL_Tariff_Details_Periods)
                , objCWH_CSL_Tariff_Details_Periods.lstCVarWH_CSL_Tariff_Details_Periods.Count

                //---------------------------Filling Shipping Order Container Totals --------------------------------------
            };
        }

        [HttpGet, HttpPost]
        public object[] WH_CSL_Tariff_Details_Periods_Save([FromBody] UpdateWH_CSL_Tariff_Details_PeriodsData UpdateWH_CSL_Tariff_Details_PeriodsDatas)
        {
            bool _result = false;
            string pUpdateClause = "";
            Exception checkException = null;
            int _RowCount = 0;


            CWH_CSL_Tariff_Details_Periods objWH_CSL_Tariff_Details_Periods = new CWH_CSL_Tariff_Details_Periods();
            CVarWH_CSL_Tariff_Details_Periods objCVarWH_CSL_Tariff_Details_Periods = new CVarWH_CSL_Tariff_Details_Periods();



            objCVarWH_CSL_Tariff_Details_Periods.WH_CSL_Tariff_DetailsID = Int32.Parse(UpdateWH_CSL_Tariff_Details_PeriodsDatas.pWH_CSL_Tariff_DetailsID);
            objCVarWH_CSL_Tariff_Details_Periods.Days = Int32.Parse(UpdateWH_CSL_Tariff_Details_PeriodsDatas.pDays);
            objCVarWH_CSL_Tariff_Details_Periods.Rate = decimal.Parse(UpdateWH_CSL_Tariff_Details_PeriodsDatas.pRate);
            objCVarWH_CSL_Tariff_Details_Periods.ID = Int32.Parse(UpdateWH_CSL_Tariff_Details_PeriodsDatas.pID);
            objCVarWH_CSL_Tariff_Details_Periods.PeriodOrder = Int32.Parse(UpdateWH_CSL_Tariff_Details_PeriodsDatas.pPeriodOrder);

            objWH_CSL_Tariff_Details_Periods.lstCVarWH_CSL_Tariff_Details_Periods.Add(objCVarWH_CSL_Tariff_Details_Periods);
            checkException = objWH_CSL_Tariff_Details_Periods.SaveMethod(objWH_CSL_Tariff_Details_Periods.lstCVarWH_CSL_Tariff_Details_Periods);
            //checkException = objShippingOrder.UpdateList(pUpdateClause);
            if (checkException == null)
            {
                _result = true;
                objWH_CSL_Tariff_Details_Periods.GetListPaging(UpdateWH_CSL_Tariff_Details_PeriodsDatas.pPageSize, UpdateWH_CSL_Tariff_Details_PeriodsDatas.pPageNumber, UpdateWH_CSL_Tariff_Details_PeriodsDatas.pWhereClauseWH_CSL_Tariff_Details_Periods, UpdateWH_CSL_Tariff_Details_PeriodsDatas.pOrderBy, out _RowCount);
            }

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                _result //pData[0]
                , _result ? objCVarWH_CSL_Tariff_Details_Periods.ID : 0 //pData[1]
                , _result ? serializer.Serialize(objWH_CSL_Tariff_Details_Periods.lstCVarWH_CSL_Tariff_Details_Periods) : null //pData[2]
                , _RowCount //pData[3]
            };
        }



        [HttpGet, HttpPost]
        public object[] WH_CSL_Tariff_Details_Periods_DeleteList(String pDeleteWH_CSL_Tariff_Details_PeriodsIDs
//LoadWithPaging parameters for Bill
, string pWhereClauseWH_CSL_Tariff_Details_Periods, Int32 pPageSize, Int32 pPageNumber, string pOrderBy)
        {
            bool _result = false;
            Int32 _RowCount = 0;
            CWH_CSL_Tariff_Details_Periods objCWH_CSL_Tariff_Details_Periods = new CWH_CSL_Tariff_Details_Periods();
            //CVw_DemStrTariffContainerType objCvwDemStrTariffContainerType = new CVw_DemStrTariffContainerType();
            foreach (var currentID in pDeleteWH_CSL_Tariff_Details_PeriodsIDs.Split(','))
            {
                objCWH_CSL_Tariff_Details_Periods.lstDeletedCPKWH_CSL_Tariff_Details_Periods.Add(new CPKWH_CSL_Tariff_Details_Periods() { ID = Int32.Parse(currentID.Trim()) });
            }

            Exception checkException = objCWH_CSL_Tariff_Details_Periods.DeleteItem(objCWH_CSL_Tariff_Details_Periods.lstDeletedCPKWH_CSL_Tariff_Details_Periods);
            if (checkException == null)
                _result = true;
            objCWH_CSL_Tariff_Details_Periods.GetListPaging(pPageSize, pPageNumber, pWhereClauseWH_CSL_Tariff_Details_Periods, pOrderBy, out _RowCount);
            return new object[] {
                _result
                , new JavaScriptSerializer().Serialize(objCWH_CSL_Tariff_Details_Periods.lstCVarWH_CSL_Tariff_Details_Periods) //pData[1]
            };
        }



        [HttpGet, HttpPost]
        public Object[] WH_CSL_Tariff_Details_GetInvoiceTypeTariffDetails(string pHouseBillIDs, int pInvoiceTypeID, bool pIsSupplementary)
        {

            //Int32 _RowCount = 0;

            CVw_WH_CSL_Tariff_Details objCvwWH_CSL_Tariff_Details = new CVw_WH_CSL_Tariff_Details();
            objCvwWH_CSL_Tariff_Details.WH_GetInvoiceTypeTariffDetails(pHouseBillIDs, pInvoiceTypeID, pIsSupplementary);

            CvwUserForms objCvwUserForms = new CvwUserForms();
            objCvwUserForms.GetList(" Where ImageName = 'BLDocuments' and UserId = " + WebSecurity.CurrentUserId.ToString());

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[] {
                new JavaScriptSerializer().Serialize(objCvwWH_CSL_Tariff_Details.lstCVarVw_WH_CSL_Tariff_Details) //0
                ,objCvwWH_CSL_Tariff_Details.lstCVarVw_WH_CSL_Tariff_Details.Count  //1
                ,objCvwUserForms.lstCVarvwUserForms.Count > 0 ? objCvwUserForms.lstCVarvwUserForms[0].CanDelete : false //2
                ,objCvwUserForms.lstCVarvwUserForms.Count > 0 ? objCvwUserForms.lstCVarvwUserForms[0].CanAdd : false //3
                ,objCvwUserForms.lstCVarvwUserForms.Count > 0 ? objCvwUserForms.lstCVarvwUserForms[0].CanEdit : false //4
            };
        }

    }
}

public class UpdateWH_CSL_Tariff
{
    public int pChargeTypeGroupID { get; set; }
    public int pInvoiceTypeID { get; set; }
    public String pID { get; set; }
    public String pCode { get; set; }
    public string pName { get; set; }
    public String pCustomerID { get; set; }
    public String pWH_WarehouseID { get; set; }
    public Boolean pIsDefault { get; set; }
    public Boolean pIsHold { get; set; }
    public DateTime pValidFromTo { get; set; }
    public String pBranchID { get; set; }
    public bool pInvoicingFromReceivable { get; set; }
    public int pTaxTypeID { get; set; } = 0;

    /*****************************/
    public string pWhereClauseWH_CSL_Tariff { get; set; }
    public Int32 pPageSize { get; set; }
    public Int32 pPageNumber { get; set; }
    public string pOrderBy { get; set; }
    public String pWH_CSL_Tariff_Details { get; set; }
}

public class UpdateWH_CSL_Tariff_DetailsData
{
    public String pID { get; set; }
    public String pChargeTypesID { get; set; }
    public String pRate { get; set; }
    public String pCalcTypesID { get; set; }
    public String pWH_CSL_TariffID { get; set; }
    public String pCalculatedAmount { get; set; }
    public String pCommission { get; set; }
    public Boolean pisCalcOneTimeToDay { get; set; }
    public Boolean pApplayIMOTariff { get; set; }
    public String pMinAmount { get; set; }
    public String pMaxAmount { get; set; }

    /*****************************/
    public string pWhereClauseWH_CSL_Tariff_Details { get; set; }
    public Int32 pPageSize { get; set; }
    public Int32 pPageNumber { get; set; }
    public string pOrderBy { get; set; }
}

public class UpdateWH_CSL_Tariff_ImoData
{
    public String pID { get; set; }
    public String pWH_CSL_TariffID { get; set; }
    public String pImoClassNo { get; set; }
    public String pImoRate { get; set; }
    public String pCalculatedBy { get; set; }
    /*****************************/
    public string pWhereClauseWH_CSL_Tariff_Imo { get; set; }
    public Int32 pPageSize { get; set; }
    public Int32 pPageNumber { get; set; }
    public string pOrderBy { get; set; }
}

public class UpdateWH_CSL_Tariff_Details_PeriodsData
{
    public String pID { get; set; }
    public String pWH_CSL_Tariff_DetailsID { get; set; }
    public String pDays { get; set; }
    public String pRate { get; set; }
    public String pPeriodOrder { get; set; }
    /*****************************/
    public string pWhereClauseWH_CSL_Tariff_Details_Periods { get; set; }
    public Int32 pPageSize { get; set; }
    public Int32 pPageNumber { get; set; }
    public string pOrderBy { get; set; }
}
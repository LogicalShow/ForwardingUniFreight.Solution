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
using Forwarding.MvcApp.Models.Administration.Settings.Generated;
using Forwarding.MvcApp.Models.NoAccess.Generated;
using Forwarding.MvcApp.Models.Customized;
using Forwarding.MvcApp.Models.Accounting.MasterData.Customized;
using Forwarding.MvcApp.Models.LoadingAndDischarging.Generated;
using Forwarding.MvcApp.Models.MasterData.Partners.Generated;
using Forwarding.MvcApp.Models.MasterData.Others.Generated;
using Forwarding.MvcApp.Models.MasterData.Locations.Generated;
using Forwarding.MvcApp.Models.Operations.Operations.Generated;
using Forwarding.MvcApp.Models.WebSite.Generated;
using Forwarding.MvcApp.Models.MasterData.Trucking.Generated;
using Forwarding.MvcApp.Models.Warehousing.MasterData.Generated;
using Forwarding.MvcApp.Models.LoadingandDischarging.Generated;

namespace Forwarding.MvcApp.Controllers.LoadingandDischarging.LoadingandDischargingOperations
{
    public class LD_StorageController : ApiController
    {
        private object cLoadingAndDischargingHeaderTruckersDetails;

        [HttpGet, HttpPost]
        public Object[] IntializeData(int? pID)
        {
            var srialize = new JavaScriptSerializer();
            srialize.MaxJsonLength = int.MaxValue;

            CTruckers cTruckers = new CTruckers();
            CVessels cVessels = new CVessels();
            CMoveTypes cMoveTypes = new CMoveTypes();
            CCommodities cCommodities = new CCommodities();
            CPorts cPorts = new CPorts();
            CTRCK_Equipments cTRCK_Equipments = new CTRCK_Equipments();
            CWH_Warehouse objWH_Warehouse = new CWH_Warehouse();

            cTruckers.GetList("where 1 = 1");
            cVessels.GetList("where 1 = 1");
            cMoveTypes.GetList("where 1 = 1");
            cCommodities.GetList("where 1 = 1");
            cPorts.GetList("where 1 = 1");
            cTRCK_Equipments.GetList("where 1 = 1");
            objWH_Warehouse.GetList(" Where 1=1 ");
            return new Object[]
                {
                srialize.Serialize(cTruckers.lstCVarTruckers), //0
                srialize.Serialize(cVessels.lstCVarVessels), //1
                srialize.Serialize(cMoveTypes.lstCVarMoveTypes), //2
                srialize.Serialize(cCommodities.lstCVarCommodities), //3
                srialize.Serialize(cPorts.lstCVarPorts), //4
                srialize.Serialize(cTRCK_Equipments.lstCVarTRCK_Equipments), //5
                srialize.Serialize(objWH_Warehouse.lstCVarWH_Warehouse), //6
                };
            

        }
        [HttpGet, HttpPost]
        public Object[] GetOperationByCode(string term , string typeid)
        {
            var pOperationCode = term;

            var srialize = new JavaScriptSerializer();
            srialize.MaxJsonLength = int.MaxValue;

            CvwOperationsFor_LD_Storage objCvwOperationsFor_LD_Storage = new CvwOperationsFor_LD_Storage();
            Int32 _RowCount = 1;
            string whereClause = " Where CodeSerial = " + pOperationCode + " and  " + (typeid == "10" ? " IsNull(LD_TransportID , 0 ) = 0 " : " IsNull(LD_LoadingAndDischargingID , 0 ) = 0 ");
            objCvwOperationsFor_LD_Storage.GetListPaging(10000, 1, whereClause, "ID", out _RowCount);

            return new Object[]
            {
                srialize.Serialize(objCvwOperationsFor_LD_Storage.lstCVarvwOperationsFor_LD_Storage), //0
            };


        }
        [HttpGet, HttpPost]
        public Object[] GetOperationInfoByID(long? pID)
        {
            var pOperationID = pID;

            var srialize = new JavaScriptSerializer();
            srialize.MaxJsonLength = int.MaxValue;

            CvwOperationsFor_LD_Storage objCvwOperationsFor_LD_Storage = new CvwOperationsFor_LD_Storage();
            Int32 _RowCount = 1;
            string whereClause = " Where ID = " + pOperationID + "";
            objCvwOperationsFor_LD_Storage.GetListPaging(10000, 1, whereClause, "ID", out _RowCount);
            var op = objCvwOperationsFor_LD_Storage.lstCVarvwOperationsFor_LD_Storage.Count>0?
                objCvwOperationsFor_LD_Storage.lstCVarvwOperationsFor_LD_Storage[0]:new CVarvwOperationsFor_LD_Storage();

            CLoadingAndDischargingHeader objCLoadingAndDischargingHeader = new CLoadingAndDischargingHeader();
            objCLoadingAndDischargingHeader.GetList($" Where OperationID =  {pID} ");
            var ld = objCLoadingAndDischargingHeader.lstCVarLoadingAndDischargingHeader.Count > 0 ?
                objCLoadingAndDischargingHeader.lstCVarLoadingAndDischargingHeader[0]:new CVarLoadingAndDischargingHeader();

            return new Object[]
            {
                srialize.Serialize(
                    new { Code = op.Code,
                    ClientName = op.ClientName,
                    CodeSerial = op.CodeSerial,
                    MoveTypeID = op.MoveTypeID,
                    VesselID = op.VesselID,
                    ExpectedTotalQty = ld.ExpectedTotalQty,
                    FromCityID = ld.FromCityID,
                    BerthNo = ld.BerthNo,
                    CommodityID = ld.CommodityID
                    }), //0
            };


        }
        

        [HttpGet, HttpPost]
        public Object[] LoadWithWhereClause(Int32 pPageNumber, Int32 pPageSize, string pWhereClause)
        {

            CvwLD_Storage objCvwLD_Storage = new CvwLD_Storage();
            
            Int32 _RowCount = objCvwLD_Storage.lstCVarvwLD_Storage.Count;
            //string whereClause = " Where BerthNo LIKE N'%" + pSearchKey + "%' ";
            objCvwLD_Storage.GetListPaging(pPageSize, pPageNumber, pWhereClause, "ID", out _RowCount);
            return new Object[] { new JavaScriptSerializer().Serialize(objCvwLD_Storage.lstCVarvwLD_Storage), _RowCount };
        }
        
        [HttpGet, HttpPost]
        [AllowAnonymous]
        public object[] InsertItems(string pSerial,
                          string pOperationID,
                          string pCustomerID,
                          string pFromCityID,
                          string pBerthNo,
                          string pCommodityID,
                          string pMoveTypeID,
                          DateTime pCloseDate,
                          string pVesselD,
                          string pNotes,
                          string pToCityID,
                          string pCode,
                          string pTypeID,
                          string pParentID,
                          string pDefaultUnitID ,
                          DateTime pFromDate ,
                          string pExpectedTotalQty,
                          string pID, string pItems)
        {


            var ErrorMessage = "";
            Exception checkException = new Exception();
            long lastcode = 0;
            CLD_Storage objlastcode = new CLD_Storage();

            CVarLD_Storage objCVarLD_Storage = new CVarLD_Storage();

            if (int.Parse(pID) == 0) //For Add
            {
                try
                {
                    objlastcode.GetList("where  Serial = CONVERT(NVARCHAR, (select isnull(max(cast(IsNull(Serial, 0) as numeric)), 0) from LD_Storage WHERE TypeID = " + pTypeID + " and ISNUMERIC(Serial) = 1))");// and isnull(IsDeleted, 0) = 0 and DATEPART(year, SL_Invoices.InvoiceDate) = '" + pInvoiceDate.Year + "' AND SL_Invoices.TypeID = " + pTypeID + " " + ") ) and ISNULL(IsDeleted , 0 ) = 0 ");
                    lastcode = objlastcode.lstCVarLD_Storage.Count == 0 ? 0 : objlastcode.lstCVarLD_Storage[0].Serial;
                }
                catch (Exception ex)
                {
                    lastcode = 0;
                }

                objCVarLD_Storage.Serial = (lastcode + 1);
            }
            else //For update
            {


                objlastcode.GetList("where ID = "+ int.Parse(pID)  + "");
                lastcode = objlastcode.lstCVarLD_Storage[0].Serial;

                objCVarLD_Storage.ID = int.Parse(pID);
                objCVarLD_Storage.Serial = lastcode;

            }


            //objCVarLD_Storage.Serial = long.Parse((pSerial == null || pSerial == "" ? "0" : pSerial)) ;

            

            objCVarLD_Storage.OperationID = long.Parse((pOperationID == null || pOperationID == "" ? "0" : pOperationID));
            objCVarLD_Storage.FromCityID = int.Parse((pFromCityID == null || pFromCityID == "" ? "0" : pFromCityID));
            objCVarLD_Storage.BerthNo = pBerthNo;
            objCVarLD_Storage.CommodityID = int.Parse((pCommodityID == null || pCustomerID == "" ? "0" : pCommodityID));
            objCVarLD_Storage.MoveTypeID = int.Parse((pMoveTypeID == null || pMoveTypeID == "" ? "0" : pMoveTypeID));
            objCVarLD_Storage.VesselD = int.Parse((pVesselD == null || pVesselD == "" ? "0" : pVesselD));
            objCVarLD_Storage.ToCityID = int.Parse((pToCityID == null || pToCityID == "" ? "0" : pToCityID));
            objCVarLD_Storage.CloseDate = pCloseDate;
            objCVarLD_Storage.Code = pCode;
            objCVarLD_Storage.CustomerID = int.Parse((pCustomerID == null || pCustomerID == "" ? "0" : pCustomerID));
            objCVarLD_Storage.Notes = pNotes;
            objCVarLD_Storage.FromDate = pFromDate;
            objCVarLD_Storage.ExpectedTotalQty = decimal.Parse((pExpectedTotalQty == null || pExpectedTotalQty == "" ? "0" : pExpectedTotalQty));
            objCVarLD_Storage.DefaultUnitID = int.Parse((pDefaultUnitID == null || pDefaultUnitID == "" ? "0" : pDefaultUnitID));
            objCVarLD_Storage.ParentID = int.Parse((pParentID == null || pParentID == "" ? "0" : pParentID));
            objCVarLD_Storage.TypeID = int.Parse((pTypeID == null || pTypeID == "" ? "0" : pTypeID));

            
            // Save Data
            CLD_Storage objCLD_Storage = new CLD_Storage();
            objCLD_Storage.lstCVarLD_Storage.Add(objCVarLD_Storage);
            checkException = objCLD_Storage.SaveMethod(objCLD_Storage.lstCVarLD_Storage);



            if (checkException == null)
            {
                //  Deserialize List -------------------------------------------------------------------------------
                var Listobj = new JavaScriptSerializer().Deserialize<List<CVarLD_StorageTransactions>>(pItems);
                foreach (var item in Listobj)
                {
                    item.StorageID = objCVarLD_Storage.ID;
                }
                CLD_StorageTransactions objCLD_StorageTransactions = new CLD_StorageTransactions();
                if (Listobj != null && Listobj.Count > 0)
                {
                    checkException = objCLD_StorageTransactions.SaveMethod(Listobj);
                    var DetailsIDs = String.Join(",", Listobj.Select(x => x.ID).ToList());
                    objCLD_StorageTransactions.DeleteList("where StorageID = " + Listobj[0].StorageID + " and ID Not IN(" + DetailsIDs + ")");
                }
                else
                {
                    objCLD_StorageTransactions.DeleteList("where StorageID = " + Listobj[0].StorageID);
                }


            }



         

            var _resultID = objCVarLD_Storage.ID;

            if (!(checkException == null))
            {
                _resultID = 0;
                ErrorMessage = checkException.Message;
            }



            return new object[]
            {
        _resultID , ErrorMessage
            };
        }


        [HttpPost]
        public object[] InsertStorageTransactionsFromExcel([FromBody] string pItems)
        {
            var ErrorMessage = "";
            Exception checkException = new Exception();
            checkException = null;
            var _resultID = 0;

            if (checkException == null)
            {
                //  Deserialize List -------------------------------------------------------------------------------
                var Listobj = new JavaScriptSerializer().Deserialize<List<CVarLD_StorageTransactionsDetails>>(pItems);

                CLD_StorageTransactionsDetails objCLD_StorageTransactionsDetails = new CLD_StorageTransactionsDetails();
                if (Listobj != null && Listobj.Count > 0)
                {
                    checkException = objCLD_StorageTransactionsDetails.SaveMethod(Listobj);
                    var DetailsIDs = String.Join(",", Listobj.Select(x => x.ID).ToList());
                    objCLD_StorageTransactionsDetails.DeleteList("where TransID = " + Listobj[0].TransID + " and ID Not IN(" + DetailsIDs + ")");
                    _resultID = Listobj[0].ID;
                }
                else
                {
                    objCLD_StorageTransactionsDetails.DeleteList("where StorageID = " + Listobj[0].TransID);
                    _resultID = 0;
                }


            }



            if (!(checkException == null))
            {
                _resultID = 0;
                ErrorMessage = checkException.Message;
            }



            return new object[]
            {
        _resultID , ErrorMessage
            };
        }



        [HttpGet, HttpPost]
        public Object[] LoadStorageTransactions(string pHeaderID)
        {
            CvwLD_StorageTransactions objCvwLD_StorageTransactions = new CvwLD_StorageTransactions();
            objCvwLD_StorageTransactions.GetList(" where StorageID = " + pHeaderID + "");
            return new Object[] { new JavaScriptSerializer().Serialize(objCvwLD_StorageTransactions.lstCVarvwLD_StorageTransactions) };

        }

        [HttpGet, HttpPost]
        public bool Delete(String pLoadingandDischargingDataIDs)
        {
            bool _result = false;

            CLD_Storage objCLD_Storage = new CLD_Storage();
           var pDeleteHeaderClause = "";
            pDeleteHeaderClause = "WHERE ID In(" + pLoadingandDischargingDataIDs + ")";
            var checkException = objCLD_Storage.DeleteList(pDeleteHeaderClause);


            _result = true;
            return _result;
        }

        [HttpGet]
        public object DeleteLDTruckerDetails(int pTransID)
        {
            bool _result = false;

            CLD_StorageTransactionsDetails objCLD_StorageTransactionsDetails = new CLD_StorageTransactionsDetails();

            var checkException = objCLD_StorageTransactionsDetails.DeleteList($"WHERE TransID = {pTransID}");


            _result = true;
            return _result;
        }


    }
}

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
using Forwarding.MvcApp.Controllers.LoadingandDischarging.LoadingandDischargingOperations;

namespace Forwarding.MvcApp.Controllers.MasterData.API_Invoicing
{
    public class LoadingandDischargingDataController : ApiController
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

            CvwOperationsForLoadingandDischarging cvwOperationsForLoadingandDischarging = new CvwOperationsForLoadingandDischarging();
            Int32 _RowCount = 1;
            string whereClause = " Where CodeSerial = " + pOperationCode + " and  " + (typeid == "10" ? " IsNull(LD_TransportID , 0 ) = 0 " : " IsNull(LD_LoadingAndDischargingID , 0 ) = 0 ");
            cvwOperationsForLoadingandDischarging.GetListPaging(10000, 1, whereClause, "ID", out _RowCount);

            return new Object[]
            {
                srialize.Serialize(cvwOperationsForLoadingandDischarging.lstCVarvwOperationsForLoadingandDischarging), //0
            };


        }
        [HttpGet, HttpPost]
        public Object[] GetOperationInfoByID(long? pID)
        {
            var pOperationID = pID;

            var srialize = new JavaScriptSerializer();
            srialize.MaxJsonLength = int.MaxValue;

            CvwOperationsForLoadingandDischarging cvwOperationsForLoadingandDischarging = new CvwOperationsForLoadingandDischarging();
            Int32 _RowCount = 1;
            string whereClause = " Where ID = " + pOperationID + "";
            cvwOperationsForLoadingandDischarging.GetListPaging(10000, 1, whereClause, "ID", out _RowCount);

            return new Object[]
            {
                srialize.Serialize(cvwOperationsForLoadingandDischarging.lstCVarvwOperationsForLoadingandDischarging), //0
            };


        }


        //[HttpGet, HttpPost]
        //public object[] LoadWithWhereClause(Int32 pPageNumber, Int32 pPageSize, string pWhereClause)
        //{
        //    CvwPS_Invoices cPS_Invoices = new CvwPS_Invoices();
        //    Int32 _RowCount = 0;
        //    cPS_Invoices.GetListPaging(pPageSize, pPageNumber, pWhereClause, " ID DESC ", out _RowCount);
        //    var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
        //    return new Object[] { serializer.Serialize(cPS_Invoices.lstCVarvwPS_Invoices), _RowCount };
        //}

        [HttpGet, HttpPost]
        public Object[] LoadWithWhereClause(Int32 pPageNumber, Int32 pPageSize, string pWhereClause)
        {
            
            CvwLoadingAndDischargingHeader cvwLoadingAndDischargingHeader = new CvwLoadingAndDischargingHeader();
            //pSearchKey = (pSearchKey == null ? "" : pSearchKey.Trim().ToUpper());
            Int32 _RowCount = cvwLoadingAndDischargingHeader.lstCVarvwLoadingAndDischargingHeader.Count;
            //string whereClause = " Where BerthNo LIKE N'%" + pSearchKey + "%' ";
            cvwLoadingAndDischargingHeader.GetListPaging(pPageSize, pPageNumber, pWhereClause, "ID", out _RowCount);
            return new Object[] { new JavaScriptSerializer().Serialize(cvwLoadingAndDischargingHeader.lstCVarvwLoadingAndDischargingHeader), _RowCount };
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
                          string pID, 
                          string pItems,
                          DateTime pStartDate)
        {


            var ErrorMessage = "";
            Exception checkException = new Exception();
            long lastcode = 0;
            CLoadingAndDischargingHeader objlastcode = new CLoadingAndDischargingHeader();

            CVarLoadingAndDischargingHeader cvarLoadingAndDischargingHeader = new CVarLoadingAndDischargingHeader();

            if (int.Parse(pID) == 0) //For Add
            {
                try
                {
                    objlastcode.GetList("where  Serial = CONVERT(NVARCHAR, (select isnull(max(cast(IsNull(Serial, 0) as numeric)), 0) from LoadingAndDischargingHeader WHERE TypeID = "+ pTypeID + " and ISNUMERIC(Serial) = 1))");// and isnull(IsDeleted, 0) = 0 and DATEPART(year, SL_Invoices.InvoiceDate) = '" + pInvoiceDate.Year + "' AND SL_Invoices.TypeID = " + pTypeID + " " + ") ) and ISNULL(IsDeleted , 0 ) = 0 ");
                    lastcode = objlastcode.lstCVarLoadingAndDischargingHeader.Count == 0 ? 0 : objlastcode.lstCVarLoadingAndDischargingHeader[0].Serial;
                }
                catch (Exception ex)
                {
                    lastcode = 0;
                }

                cvarLoadingAndDischargingHeader.Serial = (lastcode + 1);
            }
            else //For update
            {


                objlastcode.GetList("where ID = "+ int.Parse(pID)  + "");
                lastcode = objlastcode.lstCVarLoadingAndDischargingHeader[0].Serial;

                cvarLoadingAndDischargingHeader.ID = int.Parse(pID);
                cvarLoadingAndDischargingHeader.Serial = lastcode;

            }


            cvarLoadingAndDischargingHeader.Serial = long.Parse((pSerial == null || pSerial == "" ? "0" : pSerial)) ;

            

            cvarLoadingAndDischargingHeader.OperationID = long.Parse((pOperationID == null || pOperationID == "" ? "0" : pOperationID));
            cvarLoadingAndDischargingHeader.FromCityID = int.Parse((pFromCityID == null || pFromCityID == "" ? "0" : pFromCityID));
            cvarLoadingAndDischargingHeader.BerthNo = pBerthNo;
            cvarLoadingAndDischargingHeader.CommodityID = int.Parse((pCommodityID == null || pCustomerID == "" ? "0" : pCommodityID));
            cvarLoadingAndDischargingHeader.MoveTypeID = int.Parse((pMoveTypeID == null || pMoveTypeID == "" ? "0" : pMoveTypeID));
            cvarLoadingAndDischargingHeader.VesselD = int.Parse((pVesselD == null || pVesselD == "" ? "0" : pVesselD));
            cvarLoadingAndDischargingHeader.ToCityID = int.Parse((pToCityID == null || pToCityID == "" ? "0" : pToCityID));
            cvarLoadingAndDischargingHeader.CloseDate = pCloseDate;
            cvarLoadingAndDischargingHeader.Code = pCode;
            cvarLoadingAndDischargingHeader.CustomerID = int.Parse((pCustomerID == null || pCustomerID == "" ? "0" : pCustomerID));
            cvarLoadingAndDischargingHeader.Notes = pNotes;
            cvarLoadingAndDischargingHeader.FromDate = pFromDate;
            cvarLoadingAndDischargingHeader.StartDate = pStartDate;
            cvarLoadingAndDischargingHeader.ExpectedTotalQty = decimal.Parse((pExpectedTotalQty == null || pExpectedTotalQty == "" ? "0" : pExpectedTotalQty));
            cvarLoadingAndDischargingHeader.DefaultUnitID = int.Parse((pDefaultUnitID == null || pDefaultUnitID == "" ? "0" : pDefaultUnitID));
            cvarLoadingAndDischargingHeader.ParentID = int.Parse((pParentID == null || pParentID == "" ? "0" : pParentID));
            cvarLoadingAndDischargingHeader.TypeID = int.Parse((pTypeID == null || pTypeID == "" ? "0" : pTypeID));

            
            // Save Data
            CLoadingAndDischargingHeader cLoadingAndDischargingHeader = new CLoadingAndDischargingHeader();
            cLoadingAndDischargingHeader.lstCVarLoadingAndDischargingHeader.Add(cvarLoadingAndDischargingHeader);
            checkException = cLoadingAndDischargingHeader.SaveMethod(cLoadingAndDischargingHeader.lstCVarLoadingAndDischargingHeader);



            var Listobj = new JavaScriptSerializer().Deserialize<List<CVarLoadingAndDischargingHeaderTruckers>>(pItems);
            if (checkException == null)
            {
                //  Deserialize List -------------------------------------------------------------------------------
                foreach (var item in Listobj)
                {
                    item.HeaderID = cvarLoadingAndDischargingHeader.ID;
                }
                CLoadingAndDischargingHeaderTruckers cCLoadingAndDischargingHeaderTruckers = new CLoadingAndDischargingHeaderTruckers();
                if (Listobj != null && Listobj.Count > 0)
                {
                    checkException = cCLoadingAndDischargingHeaderTruckers.SaveMethod(Listobj);
                    var DetailsIDs = String.Join(",", Listobj.Select(x => x.ID).ToList());
                    cCLoadingAndDischargingHeaderTruckers.DeleteList("where HeaderID = " + Listobj[0].HeaderID + " and ID Not IN(" + DetailsIDs + ")");
                }
                else
                {
                    cCLoadingAndDischargingHeaderTruckers.DeleteList("where HeaderID = " + Listobj[0].HeaderID);
                }


            }



            //if (checkException == null)
            //{
            //    //  Deserialize List -------------------------------------------------------------------------------
            //    var ListobjCranes = new JavaScriptSerializer().Deserialize<List<CVarLoadingAndDischargingHeaderCranes>>(pCranes);
            //    foreach (var item in ListobjCranes)
            //    {
            //        item.LoadingAndDischargingHeaderID = cvarLoadingAndDischargingHeader.ID;
            //    }
            //    CLoadingAndDischargingHeaderCranes cCLoadingAndDischargingHeaderCranes = new CLoadingAndDischargingHeaderCranes();
            //    if (ListobjCranes != null && ListobjCranes.Count > 0)
            //    {
            //        checkException = cCLoadingAndDischargingHeaderCranes.SaveMethod(ListobjCranes);
            //        var DetailsIDs = String.Join(",", ListobjCranes.Select(x => x.ID).ToList());
            //        cCLoadingAndDischargingHeaderCranes.DeleteList("where LoadingAndDischargingHeaderID = " + ListobjCranes[0].LoadingAndDischargingHeaderID + " and ID Not IN(" + DetailsIDs + ")");
            //    }
            //    else
            //    {
            //        cCLoadingAndDischargingHeaderCranes.DeleteList("where LoadingAndDischargingHeaderID = " + ListobjCranes[0].LoadingAndDischargingHeaderID);
            //    }


            //}

            //pCranes

            var _resultID = cvarLoadingAndDischargingHeader.ID;

            if (checkException != null)
            {
                _resultID = 0;
                ErrorMessage = checkException.Message;
            }

            if(_resultID > 0)
            {
                SaveStorage(cvarLoadingAndDischargingHeader, Listobj);
            }

            return new object[]
            {
              _resultID , ErrorMessage
            };
        }


        void SaveStorage(CVarLoadingAndDischargingHeader pCVarLoadingAndDischargingHeader, List<CVarLoadingAndDischargingHeaderTruckers> lstCVarLoadingAndDischargingHeaderTruckers)
        {
            CLD_Storage objlastcode = new CLD_Storage();
            objlastcode.GetList($"where  OperationID = {pCVarLoadingAndDischargingHeader.OperationID}");
            var storageId = objlastcode.lstCVarLD_Storage.Count == 0 ? 0 : objlastcode.lstCVarLD_Storage[0].ID;

            lstCVarLoadingAndDischargingHeaderTruckers = lstCVarLoadingAndDischargingHeaderTruckers.Where(l => l.TruckingTypeID == 20).ToList();

            List<CVarLD_StorageTransactions> lstStorageTrans = new List<CVarLD_StorageTransactions>();
            foreach (var item in lstCVarLoadingAndDischargingHeaderTruckers)
            {
                lstStorageTrans.Add(new CVarLD_StorageTransactions {
                    Coeff = 1,
                    StoreID = item.StoreID,
                    PackageTypeID = item.PackageTypeID,
                    LdHeaderTruckerID = item.ID
                });
            }

            if (lstCVarLoadingAndDischargingHeaderTruckers.Count > 0)
            {
                LD_StorageController storageController = new LD_StorageController();
                storageController.InsertItems("",
                    pCVarLoadingAndDischargingHeader.OperationID.ToString(),
                    pCVarLoadingAndDischargingHeader.CustomerID.ToString(),
                    pCVarLoadingAndDischargingHeader.FromCityID.ToString(),
                    pCVarLoadingAndDischargingHeader.BerthNo,
                    pCVarLoadingAndDischargingHeader.CommodityID.ToString(),
                    pCVarLoadingAndDischargingHeader.MoveTypeID.ToString(),
                    pCVarLoadingAndDischargingHeader.CloseDate,
                    pCVarLoadingAndDischargingHeader.VesselD.ToString(),
                    pCVarLoadingAndDischargingHeader.Notes,
                    pCVarLoadingAndDischargingHeader.ToCityID.ToString(),
                    pCVarLoadingAndDischargingHeader.Code,
                    pCVarLoadingAndDischargingHeader.TypeID.ToString(),
                    pCVarLoadingAndDischargingHeader.ParentID.ToString(),
                    pCVarLoadingAndDischargingHeader.DefaultUnitID.ToString(),
                    pCVarLoadingAndDischargingHeader.FromDate,
                    pCVarLoadingAndDischargingHeader.ExpectedTotalQty.ToString(),
                    storageId.ToString(),
                    new JavaScriptSerializer().Serialize(lstStorageTrans));
            }

            
        }

        [HttpPost]
        public object[] InsertLoadingAndDischargingHeaderTruckersDetailsFromExcel( [FromBody] string pItems)
        {


            var ErrorMessage = "";
            Exception checkException = new Exception();
            checkException = null;
            var _resultID = 0; 



            //var responde = 


            if (checkException == null)
            {
                //  Deserialize List -------------------------------------------------------------------------------
                var Listobj = new JavaScriptSerializer().Deserialize <List<CVarLoadingAndDischargingHeaderTruckersDetails>>(pItems);

                CLoadingAndDischargingHeaderTruckersDetails cLoadingAndDischargingHeaderTruckersDetails = new CLoadingAndDischargingHeaderTruckersDetails();
                if (Listobj != null && Listobj.Count > 0)
                {
                    checkException = cLoadingAndDischargingHeaderTruckersDetails.SaveMethod(Listobj);
                    var DetailsIDs = String.Join(",", Listobj.Select(x => x.ID).ToList());
                    cLoadingAndDischargingHeaderTruckersDetails.DeleteList("where HeaderTruckerID = " + Listobj[0].HeaderTruckerID + " and ID Not IN(" + DetailsIDs + ")");
                    _resultID = Listobj[0].ID;
                }
                else
                {
                    cLoadingAndDischargingHeaderTruckersDetails.DeleteList("where HeaderID = " + Listobj[0].HeaderTruckerID);
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

        [HttpPost]
        public object[] InsertLoadingAndDischargingHeaderCranesDetailsFromExcel([FromBody] string pItems)
        {


            var ErrorMessage = "";
            Exception checkException = new Exception();
            checkException = null;
            var _resultID = 0;



            //var responde = 


            if (checkException == null)
            {
                //  Deserialize List -------------------------------------------------------------------------------
                var Listobj = new JavaScriptSerializer().Deserialize<List<CVarLoadingAndDischargingHeaderCranes>>(pItems);

                CLoadingAndDischargingHeaderCranes cLoadingAndDischargingHeaderCranes = new CLoadingAndDischargingHeaderCranes();
                if (Listobj != null && Listobj.Count > 0)
                {
                    checkException = cLoadingAndDischargingHeaderCranes.SaveMethod(Listobj);
                    var DetailsIDs = String.Join(",", Listobj.Select(x => x.ID).ToList());
                    cLoadingAndDischargingHeaderCranes.DeleteList("where LoadingAndDischargingHeaderID = " + Listobj[0].LoadingAndDischargingHeaderID + " and ID Not IN(" + DetailsIDs + ")");
                    _resultID = Listobj[0].ID;
                }
                else
                {
                    cLoadingAndDischargingHeaderCranes.DeleteList("where LoadingAndDischargingHeaderID = " + Listobj[0].LoadingAndDischargingHeaderID);
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
        public Object[] LoadLoadingAndDischargingHeaderTruckers(string pHeaderID)
        {
            CvwLoadingAndDischargingHeaderTruckers cvwLoadingAndDischargingHeaderTruckers = new CvwLoadingAndDischargingHeaderTruckers();
            cvwLoadingAndDischargingHeaderTruckers.GetList(" where HeaderID = " + pHeaderID + "");
            return new Object[] { new JavaScriptSerializer().Serialize(cvwLoadingAndDischargingHeaderTruckers.lstCVarvwLoadingAndDischargingHeaderTruckers) };

        }
        [HttpGet, HttpPost]
        public Object[] LoadLoadingAndDischargingHeaderCranes(string pHeaderID)
        {
            CvwLoadingAndDischargingHeaderCranes cvwLoadingAndDischargingHeaderCranes = new CvwLoadingAndDischargingHeaderCranes();
            cvwLoadingAndDischargingHeaderCranes.GetList(" where LoadingAndDischargingHeaderID = " + pHeaderID + "");
            return new Object[] { new JavaScriptSerializer().Serialize(cvwLoadingAndDischargingHeaderCranes.lstCVarvwLoadingAndDischargingHeaderCranes) };

        }

        [HttpGet, HttpPost]
        public bool Delete(String pLoadingandDischargingDataIDs)
        {
            bool _result = false;

            CLoadingAndDischargingHeader cLoadingAndDischargingHeader = new CLoadingAndDischargingHeader();
           var pDeleteHeaderClause = "";
            pDeleteHeaderClause = "WHERE ID In(" + pLoadingandDischargingDataIDs + ")";
            var checkException = cLoadingAndDischargingHeader.DeleteList(pDeleteHeaderClause);


            _result = true;
            return _result;
        }

        [HttpGet]
        public object DeleteLDTruckerDetails(int pHeaderTruckerID)
        {
            bool _result = false;

            CLoadingAndDischargingHeaderTruckersDetails objCLoadingAndDischargingHeaderTruckersDetails = new CLoadingAndDischargingHeaderTruckersDetails();

            var checkException = objCLoadingAndDischargingHeaderTruckersDetails.DeleteList($"WHERE HeaderTruckerID = {pHeaderTruckerID}");


            _result = true;
            return _result;
        }



    }
}

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

namespace Forwarding.MvcApp.Controllers.MasterData.API_Invoicing
{
    public class LD_WorkersController : ApiController
    {
        private object cLoadingAndDischargingHeaderTruckersDetails;

        [HttpGet, HttpPost]
        public Object[] IntializeData(int? pID)
        {
            var srialize = new JavaScriptSerializer();
            srialize.MaxJsonLength = int.MaxValue;

            CSuppliers cSuppliers = new CSuppliers();
            cSuppliers.GetList("where 1 = 1");

            CVessels cVessels = new CVessels();
            cVessels.GetList("where 1 = 1");

            CMoveTypes cMoveTypes = new CMoveTypes();
            cMoveTypes.GetList("where 1 = 1");

            CCommodities cCommodities = new CCommodities();
            cCommodities.GetList("where 1 = 1");

            return new Object[]
                {
                srialize.Serialize(cSuppliers.lstCVarSuppliers), //0
                srialize.Serialize(cVessels.lstCVarVessels), //1
                srialize.Serialize(cMoveTypes.lstCVarMoveTypes), //2
                srialize.Serialize(cCommodities.lstCVarCommodities), //3
                };
            

        }


        [HttpGet, HttpPost]
        public Object[] LoadWithWhereClause(Int32 pPageNumber, Int32 pPageSize, string pWhereClause)
        {
            
            CvwLoadingAndDischargingHeaerWorkers cvwLoadingAndDischargingHeaderWorkers = new CvwLoadingAndDischargingHeaerWorkers();
            //pSearchKey = (pSearchKey == null ? "" : pSearchKey.Trim().ToUpper());
            Int32 _RowCount = cvwLoadingAndDischargingHeaderWorkers.lstCVarvwLoadingAndDischargingHeaerWorkers.Count;
            //string whereClause = " Where BerthNo LIKE N'%" + pSearchKey + "%' ";
            cvwLoadingAndDischargingHeaderWorkers.GetListPaging(pPageSize, pPageNumber, pWhereClause, "ID", out _RowCount);
            return new Object[] { new JavaScriptSerializer().Serialize(cvwLoadingAndDischargingHeaderWorkers.lstCVarvwLoadingAndDischargingHeaerWorkers), _RowCount };
        }





        [HttpGet, HttpPost]
        [AllowAnonymous]
        public object[] InsertItems(string pSerial,
                          string pSupplierID,
                          string pWorkersTypeID,
                           string pHeaderID,
                           string pNotes,
                          string pID,
                          string pOperationID,
                          string pBerthNo,
                           string pCommodityID,
                           string pMoveTypeID,
                           DateTime pOpenDate,
                           DateTime pFromDate,
                           DateTime pToDate,
                           string pVesselD,
                           string pExpectedTotalQty
                          )
        {


            var ErrorMessage = "";
            Exception checkException = new Exception();
            long lastcode = 0;
            CLoadingAndDischargingHeaerWorkers objlastcode = new CLoadingAndDischargingHeaerWorkers();

            CVarLoadingAndDischargingHeaerWorkers cVarLoadingAndDischargingHeaerWorkers;

            if (int.Parse(pID) == 0) //For Add
            {
                cVarLoadingAndDischargingHeaerWorkers = new CVarLoadingAndDischargingHeaerWorkers();
                try
                {

                    objlastcode.GetList("where  Serial = CONVERT(NVARCHAR, (select isnull(max(cast(IsNull(Serial, 0) as numeric)), 0) from LoadingAndDischargingHeaerWorkers WHERE  ISNUMERIC(Serial) = 1))");// and isnull(IsDeleted, 0) = 0 and DATEPART(year, SL_Invoices.InvoiceDate) = '" + pInvoiceDate.Year + "' AND SL_Invoices.TypeID = " + pTypeID + " " + ") ) and ISNULL(IsDeleted , 0 ) = 0 ");
                    lastcode = objlastcode.lstCVarLoadingAndDischargingHeaerWorkers.Count == 0 ? 0 : objlastcode.lstCVarLoadingAndDischargingHeaerWorkers[0].Serial;
                }
                catch (Exception ex)
                {
                    lastcode = 0;
                }

                cVarLoadingAndDischargingHeaerWorkers.Serial = (lastcode + 1);
            }
            else //For update
            {


                objlastcode.GetList("where ID = "+ int.Parse(pID)  + "");
                //lastcode = objlastcode.lstCVarLoadingAndDischargingHeaerWorkers[0].Serial;

                //cVarLoadingAndDischargingHeaerWorkers.ID = int.Parse(pID);
                //cVarLoadingAndDischargingHeaerWorkers.Serial = lastcode;
                cVarLoadingAndDischargingHeaerWorkers = objlastcode.lstCVarLoadingAndDischargingHeaerWorkers[0];
            }
            cVarLoadingAndDischargingHeaerWorkers.SupplierID = int.Parse((pSupplierID == null || pSupplierID == "" ? "0" : pSupplierID));
            cVarLoadingAndDischargingHeaerWorkers.WorkersTypeID = int.Parse((pWorkersTypeID == null || pWorkersTypeID == "" ? "0" : pWorkersTypeID));
            cVarLoadingAndDischargingHeaerWorkers.HeaderID = int.Parse((pHeaderID == null || pHeaderID == "" ? "0" : pHeaderID));
            cVarLoadingAndDischargingHeaerWorkers.Notes = pNotes;

            cVarLoadingAndDischargingHeaerWorkers.OperationID= Convert.ToInt64(pOperationID);
            cVarLoadingAndDischargingHeaerWorkers.BerthNo= pBerthNo;
            cVarLoadingAndDischargingHeaerWorkers.CommodityID= Convert.ToInt32(pCommodityID);
            cVarLoadingAndDischargingHeaerWorkers.MoveTypeID= Convert.ToInt32(pMoveTypeID);
            cVarLoadingAndDischargingHeaerWorkers.OpenDate= pOpenDate;
            cVarLoadingAndDischargingHeaerWorkers.FromDate= pFromDate;
            cVarLoadingAndDischargingHeaerWorkers.ToDate= pToDate;
            cVarLoadingAndDischargingHeaerWorkers.VesselD= Convert.ToInt32(pVesselD);
            cVarLoadingAndDischargingHeaerWorkers.ExpectedTotalQty= Convert.ToDecimal(pExpectedTotalQty);

            // Save Data

            CLoadingAndDischargingHeaerWorkers cLoadingAndDischargingHeaerWorkers = new CLoadingAndDischargingHeaerWorkers();
            cLoadingAndDischargingHeaerWorkers.lstCVarLoadingAndDischargingHeaerWorkers.Add(cVarLoadingAndDischargingHeaerWorkers);
            checkException = cLoadingAndDischargingHeaerWorkers.SaveMethod(cLoadingAndDischargingHeaerWorkers.lstCVarLoadingAndDischargingHeaerWorkers);




            var _resultID = cVarLoadingAndDischargingHeaerWorkers.ID;

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
        public object[] InsertLoadingAndDischargingHeaderWorkersDetailsFromExcel([FromBody] LD_WorkerDetail pData)
        {
            var ErrorMessage = "";
            Exception checkException = new Exception();
            checkException = null;
            var _resultID = 0;
            
            if (checkException == null)
            {
                //  Deserialize List -------------------------------------------------------------------------------
                var Listobj = new JavaScriptSerializer().Deserialize<List<CVarLoadingAndDischargingHeaderWorkersDetails>>(pData.Items);

                CLoadingAndDischargingHeaderWorkersDetails cLoadingAndDischargingHeaderWorkersDetails = new CLoadingAndDischargingHeaderWorkersDetails();
                if (Listobj != null && Listobj.Count > 0)
                {
                    checkException = cLoadingAndDischargingHeaderWorkersDetails.SaveMethod(Listobj);
                    var DetailsIDs = String.Join(",", Listobj.Select(x => x.ID).ToList());
                    cLoadingAndDischargingHeaderWorkersDetails.DeleteList("where HeaderWorkerID = " + pData.HeaderWorkerID + " and ID Not IN(" + DetailsIDs + ")");
                    _resultID = Listobj[0].ID;

                    if (checkException == null)
                    {
                        CLoadingAndDischargingHeaerWorkers cLoadingAndDischargingHeaerWorkers = new CLoadingAndDischargingHeaerWorkers();
                        cLoadingAndDischargingHeaerWorkers.GetItem(pData.HeaderWorkerID);

                        if (cLoadingAndDischargingHeaerWorkers.lstCVarLoadingAndDischargingHeaerWorkers.Count > 0)
                        {
                            CDefaults objCDefaults = new CDefaults();
                            objCDefaults.GetList(" where ID = (select isnull(max(ID),0) from Defaults) ");

                            CChargeTypes objCChargeTypes = new CChargeTypes();
                            objCChargeTypes.GetList(" where code = N'حساب عمال' ");

                            //save payables
                            CPayables objCPayables = new CPayables();
                            
                           if (cLoadingAndDischargingHeaerWorkers.lstCVarLoadingAndDischargingHeaerWorkers[0].PayableID > 0)
                            {
                                objCPayables.GetItem(cLoadingAndDischargingHeaerWorkers.lstCVarLoadingAndDischargingHeaerWorkers[0].PayableID);
                            }
                            else
                            {
                                objCPayables.lstCVarPayables.Add(new CVarPayables());
                            }
                            objCPayables.lstCVarPayables[0].OperationID = cLoadingAndDischargingHeaerWorkers.lstCVarLoadingAndDischargingHeaerWorkers[0].OperationID;
                            objCPayables.lstCVarPayables[0].BillID = cLoadingAndDischargingHeaerWorkers.lstCVarLoadingAndDischargingHeaerWorkers[0].OperationID;
                            objCPayables.lstCVarPayables[0].ChargeTypeID = objCChargeTypes.lstCVarChargeTypes.Count > 0 ? objCChargeTypes.lstCVarChargeTypes[0].ID : 0;
                            objCPayables.lstCVarPayables[0].Quantity = Listobj.Sum(a => a.Count);
                            objCPayables.lstCVarPayables[0].ExchangeRate = 1;
                            objCPayables.lstCVarPayables[0].CurrencyID = objCDefaults.lstCVarDefaults[0].CurrencyID;
                            objCPayables.lstCVarPayables[0].CostPrice = Listobj.Sum(a => a.Amount);
                            objCPayables.lstCVarPayables[0].CostAmount = Listobj.Sum(a => a.Amount * a.Count);
                            objCPayables.lstCVarPayables[0].Notes = "";
                            objCPayables.lstCVarPayables[0].CreationDate = DateTime.Now;
                            objCPayables.lstCVarPayables[0].ModificationDate = DateTime.Now;
                            objCPayables.lstCVarPayables[0].CreatorUserID = WebSecurity.CurrentUserId;
                            objCPayables.lstCVarPayables[0].ModificatorUserID = WebSecurity.CurrentUserId;
                            objCPayables.lstCVarPayables[0].IssueDate = DateTime.Now;
                            objCPayables.lstCVarPayables[0].EntryDate = DateTime.Now;
                            objCPayables.lstCVarPayables[0].SupplierInvoiceNo = "0";
                            objCPayables.lstCVarPayables[0].SupplierReceiptNo = "0";
                            objCPayables.lstCVarPayables[0].IsOfficial = false;
                            objCPayables.lstCVarPayables[0].IsQuotationApproval = false;
                            objCPayables.lstCVarPayables[0].ApprovePendingValue = 0;
                            objCPayables.lstCVarPayables[0].crmCode = "";
                            objCPayables.lstCVarPayables[0].IsPurchased = false;

                            checkException = objCPayables.SaveMethod(objCPayables.lstCVarPayables);
                            if(checkException == null && cLoadingAndDischargingHeaerWorkers.lstCVarLoadingAndDischargingHeaerWorkers[0].PayableID == 0)
                            {
                                cLoadingAndDischargingHeaerWorkers.lstCVarLoadingAndDischargingHeaerWorkers[0].PayableID = objCPayables.lstCVarPayables[0].ID;
                                checkException = cLoadingAndDischargingHeaerWorkers.SaveMethod(cLoadingAndDischargingHeaerWorkers.lstCVarLoadingAndDischargingHeaerWorkers);
                            }

                        }

                    }

                }
                else
                {
                    checkException = cLoadingAndDischargingHeaderWorkersDetails.DeleteList("where HeaderWorkerID = " + pData.HeaderWorkerID);
                    if(checkException == null)
                    {
                        CLoadingAndDischargingHeaerWorkers cLoadingAndDischargingHeaerWorkers = new CLoadingAndDischargingHeaerWorkers();
                        cLoadingAndDischargingHeaerWorkers.GetItem(pData.HeaderWorkerID);

                        cLoadingAndDischargingHeaerWorkers.UpdateList($" PayableID = NULL where ID = {pData.HeaderWorkerID} ");

                        CPayables objCPayables = new CPayables();
                        objCPayables.DeleteList($" where ID  = {cLoadingAndDischargingHeaerWorkers.lstCVarLoadingAndDischargingHeaerWorkers[0].PayableID}");

                    
                    }
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
        public Object[] LoadLoadingAndDischargingHeaderWorkers(string pHeaderID)
        {
            CLoadingAndDischargingHeaderWorkersDetails cLoadingAndDischargingHeaderWorkersDetails = new CLoadingAndDischargingHeaderWorkersDetails();
            cLoadingAndDischargingHeaderWorkersDetails.GetList(" where HeaderWorkerID = " + pHeaderID + "");
            return new Object[] { new JavaScriptSerializer().Serialize(cLoadingAndDischargingHeaderWorkersDetails.lstCVarLoadingAndDischargingHeaderWorkersDetails) };

        }

        [HttpGet, HttpPost]
        public bool Delete(String pLoadingAndDischargingHeaderTruckersIDs)
        {
            bool _result = false;

            CLoadingAndDischargingHeader cLoadingAndDischargingHeader = new CLoadingAndDischargingHeader();
            CLoadingAndDischargingHeaderTruckers cLoadingAndDischargingHeaderTruckers = new CLoadingAndDischargingHeaderTruckers();


            var pDeleteDetailsClause = "";
            pDeleteDetailsClause = "WHERE HeaderID In(" + pLoadingAndDischargingHeaderTruckersIDs + ")";
            var checkException = cLoadingAndDischargingHeaderTruckers.DeleteList(pDeleteDetailsClause);


            var pDeleteHeaderClause = "";
            pDeleteHeaderClause = "WHERE ID In(" + pLoadingAndDischargingHeaderTruckersIDs + ")";
            checkException = cLoadingAndDischargingHeader.DeleteList(pDeleteHeaderClause);


            _result = true;
            return _result;
        }

        #region Old
        [HttpGet, HttpPost]
        public Object[] GetHeaderByOperationCode(string term)
        {
            var pHeaderCode = term;

            var srialize = new JavaScriptSerializer();
            srialize.MaxJsonLength = int.MaxValue;

            CvwLoadingAndDischargingHeader cvwLoadingAndDischargingHeader = new CvwLoadingAndDischargingHeader();
            Int32 _RowCount = 1;
            string whereClause = " Where Serial = " + pHeaderCode + " and TypeID = 20 ";
            cvwLoadingAndDischargingHeader.GetListPaging(10000, 1, whereClause, "ID", out _RowCount);

            return new Object[]
            {
                srialize.Serialize(cvwLoadingAndDischargingHeader.lstCVarvwLoadingAndDischargingHeader), //0
            };


        }
        [HttpGet, HttpPost]
        public Object[] GetHeaderInfoByID(int? pID)
        {
            var pHeaderID = pID;

            var srialize = new JavaScriptSerializer();
            srialize.MaxJsonLength = int.MaxValue;

            CvwLoadingAndDischargingHeader cvwLoadingAndDischargingHeader = new CvwLoadingAndDischargingHeader();
            Int32 _RowCount = 1;
            string whereClause = " Where ID = " + pHeaderID + "";
            cvwLoadingAndDischargingHeader.GetListPaging(10000, 1, whereClause, "ID", out _RowCount);

            return new Object[]
            {
                srialize.Serialize(cvwLoadingAndDischargingHeader.lstCVarvwLoadingAndDischargingHeader), //0
            };


        }

        #endregion

        #region New
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

        [HttpGet, HttpPost]
        public Object[] GetOperationByCode(string term)
        {
            var pOperationCode = term;

            var srialize = new JavaScriptSerializer();
            srialize.MaxJsonLength = int.MaxValue;

            CvwOperationsForLoadingandDischarging cvwOperationsForLoadingandDischarging = new CvwOperationsForLoadingandDischarging();
            Int32 _RowCount = 1;
            string whereClause = " Where CodeSerial = " + pOperationCode + " and IsNull(LD_LoadingAndDischargingHeaderWorkerID , 0 ) = 0 ";
            cvwOperationsForLoadingandDischarging.GetListPaging(10000, 1, whereClause, "ID", out _RowCount);

            return new Object[]
            {
                srialize.Serialize(cvwOperationsForLoadingandDischarging.lstCVarvwOperationsForLoadingandDischarging), //0
            };


        }
        #endregion



    }
    public class LD_WorkerDetail
    {
        public int HeaderWorkerID { get; set; }
        public string Items { get; set; }
    }
}

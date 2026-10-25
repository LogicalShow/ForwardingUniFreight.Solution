using Forwarding.MvcApp.Entities.Operations;
using Forwarding.MvcApp.Entities.Quotations;
using Forwarding.MvcApp.Models.Administration.Security.Generated;
using Forwarding.MvcApp.Models.Administration.Settings.Generated;
using Forwarding.MvcApp.Models.Customized;
using Forwarding.MvcApp.Models.MasterData.Invoicing.Generated;
using Forwarding.MvcApp.Models.Operations.Operations.Generated;
using System;
using System.Linq;
using System.Reflection;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;

namespace Forwarding.MvcApp.Controllers.Operations.API_Operations
{
    public class ReceivablesDraftController : ApiController
    {
        
        [HttpGet, HttpPost]
        public bool Update(Int32 pSavedFrom, Int64 pOperationContainersAndPackagesID, bool pIsReceipt, Int64 pHouseBillID
            , Int64 pID, Int32 pOperationID, Int32 pChargeTypeID, int pPOrC, Int32 pSupplierID, Int32 pMeasurementID
            , Int32 pContainerTypeID, decimal pQuantity, Decimal pCostPrice, Decimal pCostAmount, Decimal pSalePrice
            , Decimal pAmountWithoutVAT, Int32 pTaxTypeID, Decimal pTaxPercentage, Decimal pTaxAmount, Int32 pDiscountTypeID, Decimal pDiscountPercentage, Decimal pDiscountAmount
            , Decimal pSaleAmount, Decimal pExchangeRate, Int32 pCurrencyID,int pCategoryID, string pNotes, DateTime pIssueDate
            , Decimal pSalePrice_Foreign, Decimal pExchangeRate_Foreign, Int32 pCurrencyID_Foreign, string pManualChargeType, bool pIsOfficialReceivable = false, int pQuotationRouteID=0)
        {
            bool _result = false;
            int _RowCount = 0;
            CDefaults objCDefaults = new CDefaults();
            objCDefaults.GetListPaging(999999, 1, "WHERE 1=1", "ID", out _RowCount);

            Exception checkException = null;
            CReceivablesDraft objCReceivablesDraft = new CReceivablesDraft();
            CDefaults ObjDefaults = new CDefaults();
            checkException = ObjDefaults.GetListPaging(999999, 1, "WHERE 1=1", "ID", out _RowCount);


            checkException = objCReceivablesDraft.GetItem(pID);
            if (objCReceivablesDraft.lstCVarReceivablesDraft[0].InvoiceID == 0 && objCReceivablesDraft.lstCVarReceivablesDraft[0].DraftInvoiceID == 0 && objCReceivablesDraft.lstCVarReceivablesDraft[0].AccNoteID == 0)
            {
                if (pSavedFrom == 10)
                {
                    objCReceivablesDraft.lstCVarReceivablesDraft[0].OperationContainersAndPackagesID = pOperationContainersAndPackagesID;
                    objCReceivablesDraft.lstCVarReceivablesDraft[0].IsReceipt = pIsReceipt;
                    objCReceivablesDraft.lstCVarReceivablesDraft[0].HouseBillID = pHouseBillID;
                    #region Foreign Currency
                    objCReceivablesDraft.lstCVarReceivablesDraft[0].SalePrice_Foreign = pSalePrice_Foreign;
                    objCReceivablesDraft.lstCVarReceivablesDraft[0].ExchangeRate_Foreign = pExchangeRate_Foreign;
                    objCReceivablesDraft.lstCVarReceivablesDraft[0].CurrencyID_Foreign = pCurrencyID_Foreign;
                    #endregion Foreign Currency
                }
                objCReceivablesDraft.lstCVarReceivablesDraft[0].OperationID = pOperationID;
                objCReceivablesDraft.lstCVarReceivablesDraft[0].ChargeTypeID = pChargeTypeID;
                objCReceivablesDraft.lstCVarReceivablesDraft[0].POrC = pPOrC;
                objCReceivablesDraft.lstCVarReceivablesDraft[0].MeasurementID = pMeasurementID;
                objCReceivablesDraft.lstCVarReceivablesDraft[0].ContainerTypeID = pContainerTypeID;
                objCReceivablesDraft.lstCVarReceivablesDraft[0].SupplierID = pSupplierID;
                objCReceivablesDraft.lstCVarReceivablesDraft[0].Quantity = pQuantity == 0 ? 1 : pQuantity;
                objCReceivablesDraft.lstCVarReceivablesDraft[0].CostPrice = pCostPrice;
                objCReceivablesDraft.lstCVarReceivablesDraft[0].CostAmount = pCostAmount;
                objCReceivablesDraft.lstCVarReceivablesDraft[0].OldSalePrice = objCReceivablesDraft.lstCVarReceivablesDraft[0].SalePrice != pSalePrice? objCReceivablesDraft.lstCVarReceivablesDraft[0].SalePrice: objCReceivablesDraft.lstCVarReceivablesDraft[0].OldSalePrice;
                objCReceivablesDraft.lstCVarReceivablesDraft[0].SalePrice = pSalePrice;

                objCReceivablesDraft.lstCVarReceivablesDraft[0].AmountWithoutVAT = Math.Round((objCReceivablesDraft.lstCVarReceivablesDraft[0].Quantity * objCReceivablesDraft.lstCVarReceivablesDraft[0].SalePrice), 2);
                objCReceivablesDraft.lstCVarReceivablesDraft[0].TaxeTypeID = pTaxTypeID;
                objCReceivablesDraft.lstCVarReceivablesDraft[0].TaxPercentage = pTaxPercentage;
                objCReceivablesDraft.lstCVarReceivablesDraft[0].TaxAmount = pTaxAmount;
                objCReceivablesDraft.lstCVarReceivablesDraft[0].DiscountTypeID = pDiscountTypeID;
                objCReceivablesDraft.lstCVarReceivablesDraft[0].DiscountPercentage = pDiscountPercentage;
                objCReceivablesDraft.lstCVarReceivablesDraft[0].DiscountAmount = pDiscountAmount;

                objCReceivablesDraft.lstCVarReceivablesDraft[0].SaleAmount = pSaleAmount;
                objCReceivablesDraft.lstCVarReceivablesDraft[0].ExchangeRate = pExchangeRate;
                objCReceivablesDraft.lstCVarReceivablesDraft[0].CurrencyID = pCurrencyID;
                objCReceivablesDraft.lstCVarReceivablesDraft[0].Notes = (pNotes == null ? "0" : pNotes);

                objCReceivablesDraft.lstCVarReceivablesDraft[0].IssueDate = pIssueDate;
                objCReceivablesDraft.lstCVarReceivablesDraft[0].ManualChargeType = pManualChargeType;
                objCReceivablesDraft.lstCVarReceivablesDraft[0].IsOfficial = pIsOfficialReceivable;

                objCReceivablesDraft.lstCVarReceivablesDraft[0].ModificatorUserID = WebSecurity.CurrentUserId;
                objCReceivablesDraft.lstCVarReceivablesDraft[0].ModificationDate = DateTime.Now;
                objCReceivablesDraft.lstCVarReceivablesDraft[0].HouseBillID = pHouseBillID;
                objCReceivablesDraft.lstCVarReceivablesDraft[0].CategoryID = pCategoryID;
                objCReceivablesDraft.lstCVarReceivablesDraft[0].IsFinalApproved = false;

            checkException = objCReceivablesDraft.SaveMethod(objCReceivablesDraft.lstCVarReceivablesDraft);
            }

            
            
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else //not unique
                _result = true;
     
            if(_result && ObjDefaults.lstCVarDefaults[0].UnEditableCompanyName=="MED" && pQuotationRouteID>0)
            {
                CQuotationRoute objCQuotationRoute = new CQuotationRoute();
                checkException = objCQuotationRoute.UpdateList($" IsChargeEditApprovalRequested = 0, ChargeEditApprovalLevel = 0, ChargeEdit1stApprovalUserID = NULL, ChargeEdit2ndApprovalUserID = NULL, ChargeEdit3rdApprovalUserID = NULL, ChargeEdit4thApprovalUserID = NULL where ID = {pQuotationRouteID}");
            }
            return _result;
        }

        [HttpGet, HttpPost]
        public object[] InsertDraftReceivableFromReceivable(string pReceivablesIDs, bool pT)
        {
            Exception exception = null;
            bool _result = false;
            if (pReceivablesIDs == null)
            {
                pReceivablesIDs = "";
            }

            string[] RecIDs = pReceivablesIDs.Split(',');

            CReceivables objCReceivables = new CReceivables();
            CReceivablesDraft objCReceivablesDraft = new CReceivablesDraft();

            if (pReceivablesIDs != "")
            {
                for (int i = 0; i < RecIDs.Length; i++)
                {
                    Int64 rID = Convert.ToInt64(RecIDs[i]);
                    exception = objCReceivables.GetItem(rID);

                    if (exception == null && objCReceivables.lstCVarReceivables.Count > 0)
                    {
                        if (objCReceivables.lstCVarReceivables[0].InvoiceID != 0 || objCReceivables.lstCVarReceivables[0].DraftInvoiceID != 0 || objCReceivables.lstCVarReceivables[0].AccNoteID != 0)
                        {
                            CReceivablesDraft objCReceivablesDraftCheckInvoices = new CReceivablesDraft();
                            exception = objCReceivablesDraftCheckInvoices.DeleteList($" WHERE OriginalReceivableID = {objCReceivables.lstCVarReceivables[0].ID}");
                        }
                        CVarReceivables Receivable = objCReceivables.lstCVarReceivables[0];
                        CVarReceivablesDraft ReceivableDraft = new CVarReceivablesDraft();
                        foreach (PropertyInfo prop in Receivable.GetType().GetProperties())
                        {
                            if (prop.Name != "ID")
                            {
                                ReceivableDraft.GetType().GetProperty(prop.Name).SetValue(ReceivableDraft, prop.GetValue(Receivable, null), null);
                            }
                        }
                        ReceivableDraft.OriginalReceivableID = objCReceivables.lstCVarReceivables[0].ID;
                        ReceivableDraft.IsFinalApproved = false;
                        Exception ex = objCReceivablesDraft.GetList($" WHERE OriginalReceivableID = {objCReceivables.lstCVarReceivables[0].ID} AND ISNULL(IsFinalApproved,0)=0");
                        if (ex == null && objCReceivablesDraft.lstCVarReceivablesDraft.Count == 0)
                        {
                            objCReceivablesDraft.lstCVarReceivablesDraft.Add(ReceivableDraft);
                            exception = objCReceivablesDraft.SaveMethod(objCReceivablesDraft.lstCVarReceivablesDraft);
                        }

                    }
                }
            }



            if (exception == null)
            {
                _result = true;
            }


            return new object[]
            {
                _result
            };
        }

        [HttpGet, HttpPost]
        public object[] UpdateReceivablesFromReceivableDrafts(string pReceivableDraftIDs, bool pT, bool pR)
        {
            Exception exception = null;
            bool _result = false;
            bool IsHaveInvoice = false;
            if(pReceivableDraftIDs == null)
            {
                pReceivableDraftIDs = "";
            }

            string[] RecIDs = pReceivableDraftIDs.Split(',');

            CReceivables objCReceivables = new CReceivables();
            CReceivablesDraft objCReceivablesDraft = new CReceivablesDraft();


            if (pReceivableDraftIDs != "")
            {
                for (int i = 0; i < RecIDs.Length; i++)
                {
                    Int64 rID = Convert.ToInt64(RecIDs[i]);
                    exception = objCReceivablesDraft.GetItem(rID);
                    if (objCReceivablesDraft.lstCVarReceivablesDraft.Count > 0)
                    {
                        var checkR = new CReceivables();
                        checkR.GetItem(objCReceivablesDraft.lstCVarReceivablesDraft[0].OriginalReceivableID);
                        IsHaveInvoice = (checkR.lstCVarReceivables.Count>0 && (checkR.lstCVarReceivables[0].InvoiceID != 0 || checkR.lstCVarReceivables[0].DraftInvoiceID != 0 || checkR.lstCVarReceivables[0].AccNoteID != 0)) ? true : false;
                    }
                    if (exception == null && objCReceivablesDraft.lstCVarReceivablesDraft.Count > 0 && !IsHaveInvoice)
                    {
                        CVarReceivables objCVarReceivables = new CVarReceivables();
                        CVarReceivablesDraft DraftRec = objCReceivablesDraft.lstCVarReceivablesDraft[0];

                        foreach (PropertyInfo prop in DraftRec.GetType().GetProperties())
                        {
                            if (prop.Name != "ID" && prop.Name != "OriginalReceivableID" && prop.Name != "IsFinalApproved")
                            {
                                objCVarReceivables.GetType().GetProperty(prop.Name).SetValue(objCVarReceivables, prop.GetValue(DraftRec, null), null);
                            }
                        }

                        objCVarReceivables.ID = DraftRec.OriginalReceivableID;
                        objCReceivables.lstCVarReceivables.Clear();
                        objCReceivables.lstCVarReceivables.Add(objCVarReceivables);
                        exception = objCReceivables.SaveMethod(objCReceivables.lstCVarReceivables);
                        if (exception == null && DraftRec.OriginalReceivableID != 0)
                        {
                            //exception = objCReceivablesDraft.DeleteList($" WHERE OriginalReceivableID = {DraftRec.OriginalReceivableID}");
                            exception = objCReceivablesDraft.UpdateList($"IsFinalApproved=1 WHERE OriginalReceivableID = {DraftRec.OriginalReceivableID}");
                        }
                        else if (exception == null && DraftRec.OriginalReceivableID == 0)
                        {
                            //exception = objCReceivablesDraft.DeleteList($" WHERE ID = {DraftRec.ID}");
                            exception = objCReceivablesDraft.UpdateList($"IsFinalApproved=1 WHERE ID = {DraftRec.ID}");
                        }


                    }
                    else if (exception == null && objCReceivablesDraft.lstCVarReceivablesDraft.Count > 0 && IsHaveInvoice)
                    {
                        exception = objCReceivablesDraft.DeleteList($" WHERE OriginalReceivableID = {objCReceivablesDraft.lstCVarReceivablesDraft[0].OriginalReceivableID}");
                    }
                }
            }


            if (exception == null)
            {
                _result = true;
            }


            return new object[]
            {
                _result
            };
        }

        public object[] GetOperationDraftPayablesAndReceivables(Int64 pOperationID, Int64 pQuotationRouteID, Int64 pOperationVehicleID, Int64 pTruckingOrderID, string pCodeSearch)
        {
            bool _result = false;

            string pWhereClausePayablesDraft = "WHERE ISNULL(IsFinalApproved,0)=0 AND OperationID=" + pOperationID.ToString() + (pQuotationRouteID == 0 ? " " : " AND GeneratingQRID=" + pQuotationRouteID.ToString()) + (pOperationVehicleID == 0 ? " " : " AND OperationVehicleID=" + pOperationVehicleID.ToString()) + (pTruckingOrderID == 0 ? " " : " AND TruckingOrderID=" + pTruckingOrderID.ToString());
            string pWhereClauseReceivablesDraft = "WHERE ISNULL(IsFinalApproved,0)=0 AND OperationID=" + pOperationID.ToString() + " AND IsDeleted=0 " + (pQuotationRouteID == 0 ? " " : " AND GeneratingQRID=" + pQuotationRouteID.ToString()) + (pOperationVehicleID == 0 ? " " : " AND OperationVehicleID=" + pOperationVehicleID.ToString()) + (pTruckingOrderID == 0 ? " " : " AND TruckingOrderID=" + pTruckingOrderID.ToString());

            #region DepartmentCharge Case
            Int32 _RowCount = 0;
            CDefaults objCDefaults = new CDefaults();
            CUsers objCUsers = new CUsers();
            objCDefaults.GetListPaging(999999, 1, "WHERE 1=1", "ID", out _RowCount);
            objCUsers.GetListPaging(999999, 1, "WHERE ID=" + WebSecurity.CurrentUserId, "ID", out _RowCount);
            if (!objCUsers.lstCVarUsers[0].IsAccessAllCharges)
            {
                pWhereClausePayablesDraft += " AND ChargeTypeID IN (SELECT ChargeTypeID FROM DepartmentCharge WHERE DepartmentID=" + objCUsers.lstCVarUsers[0].DepartmentID + ") \n";
                pWhereClauseReceivablesDraft += " AND ChargeTypeID IN (SELECT ChargeTypeID FROM DepartmentCharge WHERE DepartmentID=" + objCUsers.lstCVarUsers[0].DepartmentID + ") \n";
            }
            #endregion DepartmentCharge Case

            #region Add Code Filter
            if (pCodeSearch != "0")
            {
                pWhereClausePayablesDraft += " AND ChargeTypeCode LIKE N'%" + pCodeSearch + "%'" + " \n";
                pWhereClauseReceivablesDraft += " AND ChargeTypeCode LIKE N'%" + pCodeSearch + "%'" + " \n";
            }
            #endregion Add Code Filter
            Exception checkException = new Exception();
            CvwPayablesDraft objCvwPayablesDraft = new CvwPayablesDraft();
            CvwReceivablesDraft objCvwReceivablesDraft = new CvwReceivablesDraft();
            checkException = objCvwPayablesDraft.GetListPaging(1000, 1, pWhereClausePayablesDraft, "ChargeTypeName", out _RowCount);
            checkException = objCvwReceivablesDraft.GetListPaging(1000, 1, pWhereClauseReceivablesDraft, "ChargeTypeName", out _RowCount);
            if (checkException == null)
                _result = true;
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[]
            {
                _result
                , _result ? serializer.Serialize(objCvwPayablesDraft.lstCVarvwPayablesDraft) : null //pData[1]
                , _result ? serializer.Serialize(objCvwReceivablesDraft.lstCVarvwReceivablesDraft) : null //pData[2]
            };
        }

        [HttpGet, HttpPost]
        public bool InsertDraftListWithoutValues(Int64 pOperationID, string pSelectedIDs, Int64 pQuotationRouteID, Int64 pOperationContainersAndPackagesID, Int64 pOperationVehicleID, Int64 pTruckingOrderID, string pQuotationChargeIDs = null)
        {
            bool _result = false;
            string pWhereClause = "";

            int _RowCount = 0;
            int _CurrencyID = 0;
            decimal _ExchangeRate = 1;

            int _RowCount2 = 0;
            CvwDefaults objCvwDefaults = new CvwDefaults();
            objCvwDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount2); //i am sure i ve just one row isa
            string CompanyName = objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName;

            pWhereClause = "";

            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
            //building the where clause to select the rows from ChargeTypes
            CChargeTypes objCChargeTypes = new CChargeTypes();

            //building the where clause to select the rows from ChargeTypes
            foreach (var currentID in pSelectedIDs.Split(','))
            {
                //i am sure i ve at least 1 selectedID isa
                pWhereClause += (pWhereClause == "" ? " WHERE ID = " + currentID.ToString()
                    : " OR ID = " + currentID.ToString());


            }
            //those 2 lines are to get the Charge types from DB
            CDefaults objCDefaults = new CDefaults();
            objCDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount); //i am sure i ve just one row isa

            #region set CurrencyID and ExchangeRate in case of AWB or not
            COperations objCOperations = new COperations();
            objCOperations.GetListPaging(99999, 1, "WHERE ID=" + pOperationID.ToString(), "ID", out _RowCount);
            CvwCurrencyDetails objCvwCurrencyDetails = new CvwCurrencyDetails();
            if (objCOperations.lstCVarOperations[0].IsAWB)
            {
                string _OpenDate = "19000101";
                _OpenDate = objCOperations.lstCVarOperations[0].OpenDate.Year.ToString() + objCOperations.lstCVarOperations[0].OpenDate.Month.ToString().PadLeft(2, '0') + objCOperations.lstCVarOperations[0].OpenDate.Day.ToString().PadLeft(2, '0');
                objCvwCurrencyDetails.GetList("WHERE ID=" + objCOperations.lstCVarOperations[0].CurrencyID
                    + " AND '" + _OpenDate + "' >= DateAdd(hh, 0, DateDiff(dd, 0, FromDate)) "
                    + " AND '" + _OpenDate + "' <= DateAdd(minute,59,DateAdd(hh, 23, DateDiff(dd, 0, ToDate))) "
                    );
                if (objCvwCurrencyDetails.lstCVarvwCurrencyDetails.Count > 0)
                {
                    _CurrencyID = objCvwCurrencyDetails.lstCVarvwCurrencyDetails[0].ID;
                    _ExchangeRate = objCvwCurrencyDetails.lstCVarvwCurrencyDetails[0].ExchangeRate;
                }
                else //Exchange Rate is not entered for the operation currency open date so put the default
                {
                    _CurrencyID = objCDefaults.lstCVarDefaults[0].CurrencyID;
                    _ExchangeRate = 1;
                }
            }
            else //not AWB
            {
                _CurrencyID = objCDefaults.lstCVarDefaults[0].CurrencyID;
                _ExchangeRate = 1;
            }
            #endregion set CurrencyID and ExchangeRate in case of AWB or not

            //those 2 lines are to get the Charge types from DB

            //objCChargeTypes.GetList(pWhereClause);
            objCChargeTypes.GetListPaging(1500, 1, pWhereClause, "ID", out _RowCount);

            if (!string.IsNullOrEmpty(pSelectedIDs) && !string.IsNullOrEmpty(pQuotationChargeIDs) && objCChargeTypes.lstCVarChargeTypes.Count > 0)
            {
                Exception checkException = null;
                CReceivablesDraft objCReceivablesDraft = new CReceivablesDraft();
                string[] ChargeTypeIDsArr = pSelectedIDs.Split(',');
                string[] QuotationChargeIDsArr = pQuotationChargeIDs.Split(',');
                for (int i = 0; i < ChargeTypeIDsArr.Length; i++)
                {
                    CVarReceivablesDraft objCVarReceivablesDraft = new CVarReceivablesDraft();
                    var chargeType = objCChargeTypes.lstCVarChargeTypes.FirstOrDefault(a => a.ID == int.Parse(ChargeTypeIDsArr[i]));
                    if (chargeType == null)
                        continue;
                    if (objCDefaults.lstCVarDefaults[0].IsTaxOnItems)
                        objCVarReceivablesDraft.TaxeTypeID = chargeType.TaxeTypeID;

                    objCVarReceivablesDraft.OperationID = pOperationID;
                    objCVarReceivablesDraft.ChargeTypeID = chargeType.ID;
                    objCVarReceivablesDraft.GeneratingQCID = long.Parse(QuotationChargeIDsArr[i]);
                    objCVarReceivablesDraft.MeasurementID = chargeType.MeasurementID;
                    objCVarReceivablesDraft.Notes = chargeType.Notes;
                    objCVarReceivablesDraft.Quantity = 1;
                    objCVarReceivablesDraft.ExchangeRate = _ExchangeRate;
                    objCVarReceivablesDraft.CurrencyID = _CurrencyID;
                    objCVarReceivablesDraft.ExchangeRate_Foreign = 1;
                    objCVarReceivablesDraft.CurrencyID_Foreign = objCDefaults.lstCVarDefaults[0].CurrencyID;
                    objCVarReceivablesDraft.GeneratingQRID = pQuotationRouteID;
                    objCVarReceivablesDraft.IssueDate = DateTime.Now;
                    objCVarReceivablesDraft.OperationContainersAndPackagesID = pOperationContainersAndPackagesID;
                    objCVarReceivablesDraft.OperationVehicleID = pOperationVehicleID;
                    objCVarReceivablesDraft.TruckingOrderID = pTruckingOrderID;
                    objCVarReceivablesDraft.PreviousCutOffDate = DateTime.Parse("01/01/1900");
                    objCVarReceivablesDraft.CutOffDate = DateTime.Parse("01/01/1900");
                    objCVarReceivablesDraft.ReceiptDate = DateTime.Parse("01/01/1900");
                    objCVarReceivablesDraft.ReceiptNo = "";
                    objCVarReceivablesDraft.TariffID = 0;
                    objCVarReceivablesDraft.ManualChargeType = "0";
                    objCVarReceivablesDraft.CostCenterId = 0;
                    objCVarReceivablesDraft.IsOfficial = false;
                    objCVarReceivablesDraft.crmCode = "";
                    objCVarReceivablesDraft.CreatorUserID = objCVarReceivablesDraft.ModificatorUserID = WebSecurity.CurrentUserId;
                    objCVarReceivablesDraft.ModificationDate = objCVarReceivablesDraft.CreationDate = DateTime.Now;
                    objCVarReceivablesDraft.OriginalReceivableID = 0;
                    objCVarReceivablesDraft.IsFinalApproved = false;

                    objCReceivablesDraft.lstCVarReceivablesDraft.Add(objCVarReceivablesDraft);
                }

                checkException = objCReceivablesDraft.SaveMethod(objCReceivablesDraft.lstCVarReceivablesDraft);

                if (checkException == null)
                    _result = true;
            }
            else
            {
                foreach (var rowChargeType in objCChargeTypes.lstCVarChargeTypes.ToList())
                {

                    CReceivablesDraft objCReceivablesDraft = new CReceivablesDraft();

                    decimal _Quantity = 1;
                    CVarReceivablesDraft objCVarReceivablesDraft = new CVarReceivablesDraft();

                    Exception checkException = null;
                    CDefaults ObjDefaults = new CDefaults();

                    ObjDefaults.GetListPaging(999999, 1, "WHERE 1=1", "ID", out _RowCount);


                    if (objCDefaults.lstCVarDefaults[0].IsTaxOnItems)
                        objCVarReceivablesDraft.TaxeTypeID = rowChargeType.TaxeTypeID;

                    objCVarReceivablesDraft.OperationID = pOperationID;
                    objCVarReceivablesDraft.ChargeTypeID = rowChargeType.ID;
                    objCVarReceivablesDraft.MeasurementID = rowChargeType.MeasurementID;
                    objCVarReceivablesDraft.Quantity = Math.Round(_Quantity, 2);
                    objCVarReceivablesDraft.ExchangeRate = _ExchangeRate;
                    objCVarReceivablesDraft.CurrencyID = _CurrencyID;
                    objCVarReceivablesDraft.ExchangeRate_Foreign = 1;
                    objCVarReceivablesDraft.CurrencyID_Foreign = objCDefaults.lstCVarDefaults[0].CurrencyID;
                    objCVarReceivablesDraft.GeneratingQRID = pQuotationRouteID;
                    objCVarReceivablesDraft.Notes = rowChargeType.Notes;

                    objCVarReceivablesDraft.IssueDate = DateTime.Now;
                    objCVarReceivablesDraft.OperationContainersAndPackagesID = pOperationContainersAndPackagesID;
                    objCVarReceivablesDraft.OperationVehicleID = pOperationVehicleID;
                    objCVarReceivablesDraft.TruckingOrderID = pTruckingOrderID;

                    objCVarReceivablesDraft.PreviousCutOffDate = DateTime.Parse("01/01/1900");
                    objCVarReceivablesDraft.CutOffDate = DateTime.Parse("01/01/1900");
                    objCVarReceivablesDraft.ReceiptDate = DateTime.Parse("01/01/1900");
                    objCVarReceivablesDraft.ReceiptNo = "";
                    objCVarReceivablesDraft.TariffID = 0;
                    objCVarReceivablesDraft.ManualChargeType = "0";
                    objCVarReceivablesDraft.CostCenterId = 0;
                    objCVarReceivablesDraft.IsOfficial = false;
                    objCVarReceivablesDraft.crmCode = "";

                    objCVarReceivablesDraft.CreatorUserID = objCVarReceivablesDraft.ModificatorUserID = WebSecurity.CurrentUserId;
                    objCVarReceivablesDraft.ModificationDate = objCVarReceivablesDraft.CreationDate = DateTime.Now;
                    objCVarReceivablesDraft.OriginalReceivableID = 0;
                    objCVarReceivablesDraft.IsFinalApproved = false;

                    objCReceivablesDraft.lstCVarReceivablesDraft.Add(objCVarReceivablesDraft);
                    checkException = objCReceivablesDraft.SaveMethod(objCReceivablesDraft.lstCVarReceivablesDraft);




                    //-----------------------

                    if (checkException == null)
                        _result = true;

                    
                }

                if (_result && objCDefaults.lstCVarDefaults[0].UnEditableCompanyName == "MED" && pQuotationRouteID > 0)
                {
                    CQuotationRoute objCQuotationRoute = new CQuotationRoute();
                    var ex = objCQuotationRoute.UpdateList($" IsChargeEditApprovalRequested = 0, ChargeEditApprovalLevel = 0, ChargeEdit1stApprovalUserID = NULL, ChargeEdit2ndApprovalUserID = NULL, ChargeEdit3rdApprovalUserID = NULL, ChargeEdit4thApprovalUserID = NULL where ID = {pQuotationRouteID}");
                }
            }



            return _result;
        }

        [HttpGet, HttpPost]
        public bool DeleteDraftReceivablesAndPayables(string pWhereClause, Int64 pQuotationRouteID)
        {
            Exception checkException = null;
            bool _result = false;

            CReceivablesDraft objCReceivablesDraft = new CReceivablesDraft();
            checkException = objCReceivablesDraft.DeleteList(pWhereClause);

            CPayablesDraft objCPayablesDraft = new CPayablesDraft();
            checkException = objCPayablesDraft.DeleteList(pWhereClause);

            if (checkException == null)
            {
                CQuotationRoute objCQuotationRoute = new CQuotationRoute();
                checkException = objCQuotationRoute.UpdateList($" IsChargeEditApprovalRequested = 0, ChargeEditApprovalLevel = 0, ChargeEdit1stApprovalUserID = NULL, ChargeEdit2ndApprovalUserID = NULL, ChargeEdit3rdApprovalUserID = NULL, ChargeEdit4thApprovalUserID = NULL where ID = {pQuotationRouteID}");
            }

            if(checkException == null)
            {
                _result = true;
            }


            return _result;
        }

    }

}

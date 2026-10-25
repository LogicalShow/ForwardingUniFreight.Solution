using Forwarding.MvcApp.Entities.Operations;
using Forwarding.MvcApp.Models.OperAcc.Generated;
using Forwarding.MvcApp.Models.Administration.Settings.Generated;
using Forwarding.MvcApp.Models.CustomizedSPCall;
using Forwarding.MvcApp.Models.MasterData.Invoicing.Generated;
using Forwarding.MvcApp.Models.NoAccess.Generated;
using Forwarding.MvcApp.Models.Operations.Operations.Generated;
using Forwarding.MvcApp.Models.Quotations.Quotations.Generated;
using System;
using System.Linq;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;
using Forwarding.MvcApp.Models.Administration.Security.Generated;
using Forwarding.MvcApp.Models.Accounting.MasterData.Generated;
using Forwarding.MvcApp.Models.MasterData.Partners.Generated;
using Forwarding.MvcApp.Models.MasterData.BanksAccountsAndTreasuries.Generated;
using Forwarding.MvcApp.Models.MasterData.Others.Generated;
using Forwarding.MvcApp.Models.SC.MasterData.Generated;
using Forwarding.MvcApp.Models.SL.SL_Transactions.Generated;
using Forwarding.MvcApp.Models.PricingModule.PricingTab;
using Forwarding.MvcApp.Models.LocalEmails.Generated;
using Forwarding.MvcApp.Models.Customized;
using System.Data;
using Forwarding.MvcApp.Models.Operations.Operations.Customized;
using Forwarding.MvcApp.Models.Quotations.Quotations.Generated.Old;
using Forwarding.MvcApp.Models.ReceiptsAndPayments.Custodies.Generated;
using Forwarding.MvcApp.Models.Fleet_Forwarding_Integration.Payables.Customized;
using System.Collections.Generic;
using Forwarding.MvcApp.Controllers.Quotations.API_Quotations;
using System.Data.SqlClient;
using System.Web.Services.Description;
using MoreLinq;

namespace Forwarding.MvcApp.Controllers.Operations.API_Operations
{


    public class PayablesController : ApiController
    {
        [HttpGet, HttpPost]
        public Object[] getFinalCreditLimitBalance(string pPayableIDs)
        {
            string myString = "";
            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
            DataTable dt = objCCustomizedDBCall.ExecuteQuery_DataTable("CustomerCreditLimitValidateBalance '," + pPayableIDs + ",'");
            if (dt.Rows.Count > 0)
            {
                myString = "90% of the customer's credit has been consumed" + "\n";
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    myString += "Customer : " + dt.Rows[i][1].ToString() + "\n";
                }
            }
            //dt.AsEnumerable().ToList();

            return new Object[] { myString };

        }


        [HttpGet, HttpPost]
        public object[] PayablesStatus_SaveManualStatus(Int64 pInvoiceIDToSetStatus, Int32 pManualPaymentStatusID)
        {
            string _ReturnedMessage = "";
            string pUpdateClause = "";
            Exception checkException = null;
            CPayables objCInvoices = new CPayables();
            pUpdateClause = "ModificationDate = GETDATE(), ManualPaid=" + (pManualPaymentStatusID == 0 ? 0 : 1) + " \n";
            pUpdateClause += "WHERE ID=" + pInvoiceIDToSetStatus + " \n";
            checkException = objCInvoices.UpdateList(pUpdateClause);
            if (checkException != null)
                _ReturnedMessage = checkException.Message;
            return new object[] {
                _ReturnedMessage
            };
        }
        [HttpGet, HttpPost]
        public Object[] LoadAll(string pWhereClause)
        {
            #region DepartmentCharge Case
            Int32 _RowCount = 0;
            CDefaults objCDefaults = new CDefaults();
            CUsers objCUsers = new CUsers();
            objCDefaults.GetListPaging(999999, 1, "WHERE 1=1", "ID", out _RowCount);
            string[] MescoCompanies = new string[5] { "MES", "SAC", "GLO", "EUR", "ALT" };
            bool IsMescoCompany = MescoCompanies.Contains(objCDefaults.lstCVarDefaults[0].UnEditableCompanyName);
            objCUsers.GetListPaging(999999, 1, "WHERE  ID=" + WebSecurity.CurrentUserId, "ID", out _RowCount);
            if (!objCUsers.lstCVarUsers[0].IsAccessAllCharges)
                pWhereClause += " AND ChargeTypeID IN (SELECT ChargeTypeID FROM DepartmentCharge WHERE DepartmentID=" + objCUsers.lstCVarUsers[0].DepartmentID + ") \n";
            #endregion DepartmentCharge Case
            var ContainersListForCombo = new List<ContainersListForCombo>();
            string pOrderBy = "ViewOrder,ChargeTypeName";
            if (objCDefaults.lstCVarDefaults[0].UnEditableCompanyName == "NEW")
                pOrderBy = "IssueDate,ChargeTypeName";

            CvwPayables objCvwPayables = new CvwPayables();
            objCvwPayables.GetListPaging(2500, 1, pWhereClause, pOrderBy, out _RowCount);
            var operationId = objCvwPayables.lstCVarvwPayables.Count == 0 ? 0 : objCvwPayables.lstCVarvwPayables[0].OperationID;
            //objCvwPayables.GetList(pWhereClause);

            CNoAccessFreightTypes objCCNoAccessFreightTypes = new CNoAccessFreightTypes();
            CvwCurrencies objCvwCurrencies = new CvwCurrencies();
            CTaxeTypes objCTaxeTypes = new CTaxeTypes();
            var objCOperationContainersAndPackages = new COperationContainersAndPackages();


            objCCNoAccessFreightTypes.GetList(" WHERE 1=1 ");
            objCvwCurrencies.GetList(" WHERE 1=1 Order By Code ");
            objCTaxeTypes.GetListPaging(999999, 1, "WHERE 1=1", "Code", out _RowCount);

            if (IsMescoCompany)
            {
                CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
                var ContainersList = objCCustomizedDBCall.ExecuteQuery_ListOfObjects($"SELECT ID,ContainerNumber,ContainerTypeID FROM OperationContainersAndPackages WHERE OperationID = {operationId}", typeof(CVarOperationContainersAndPackages)).Cast<CVarOperationContainersAndPackages>().ToList();
                CContainerTypes objCContainerTypes = new CContainerTypes();
                objCContainerTypes.GetListPaging(999, 1, "WHERE 1=1", "ID", out _RowCount);
                ContainersListForCombo = ContainersList.Select(c => new ContainersListForCombo()
                {
                    ID = c.ID,
                    ContainerNumber = c.ContainerNumber,
                    ContainerTypeCode = objCContainerTypes.lstCVarContainerTypes.FirstOrDefault(item => item.ID == c.ContainerTypeID) == null ? "" : objCContainerTypes.lstCVarContainerTypes.FirstOrDefault(item => item.ID == c.ContainerTypeID).Code
                }).ToList();
            }
            else
            {
                objCOperationContainersAndPackages.GetList($" where OperationID = {operationId} and TankOrFlexiNumber Is Not Null");
            }

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[] {
                serializer.Serialize(objCvwPayables.lstCVarvwPayables) //data[0]
                , new JavaScriptSerializer().Serialize(objCCNoAccessFreightTypes.lstCVarNoAccessFreightTypes) //data[1]
                , new JavaScriptSerializer().Serialize(objCvwCurrencies.lstCVarvwCurrencies) //data[2]
                , serializer.Serialize(objCTaxeTypes.lstCVarTaxeTypes) //data[3]
                , IsMescoCompany ? serializer.Serialize(ContainersListForCombo) : serializer.Serialize(objCOperationContainersAndPackages.lstCVarOperationContainersAndPackages.Select(a=>new {ID=a.ID,Name=a.TankOrFlexiNumber}).ToList()) //data[4]
            };
        }
        public class ContainersListForCombo
        {
            public long ID { get; set; }
            public string ContainerNumber { get; set; } = string.Empty;
            public string ContainerTypeCode { get; set; } = string.Empty;
        }
        //[HttpGet, HttpPost]
        //public Object[] GetInvoiceDateByOperation(string pOperationCode)
        //{
        //    Exception checkException  ;
        //    Int32 _RowCount = 0;
        //    COperations objCOperations = new COperations();
        //    objCOperations.GetList("Where CodeSerial=" + pOperationCode);

        //    CInvoices objCInvoices = new CInvoices();
        //    if(objCOperations.lstCVarOperations.Count > 0)
        //    {
        //        checkException= objCInvoices.GetList("Where OperationID = " + objCOperations.lstCVarOperations[0].ID);
        //    }

        //    var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
        //    return new Object[] {
        //        serializer.Serialize(objCInvoices.lstCVarInvoices) //data[0]
        //    };
        //}

        [HttpGet, HttpPost]
        public Object[] CheckIfApprovedOrNot(string pIDs/*, bool IsPayNotRec*/)
        {
            var AllIsUnApproved = true;

            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();

            //if (IsPayNotRec)
            //{
            var PayablesList = objCCustomizedDBCall.ExecuteQuery_ListOfObjects(
            "SELECT IsApproved FROM Payables WHERE ID IN ( " + pIDs + " ) "
            , typeof(CVarPayables)).Cast<CVarPayables>().ToList();

            foreach (var payable in PayablesList)
            {
                if (payable.IsApproved)
                {
                    AllIsUnApproved = false;
                }
            }
            //}
            //else
            //{
            //    var ReceivablesList = objCCustomizedDBCall.ExecuteQuery_ListOfObjects(
            //    "SELECT IsApproved FROM Receivables WHERE ID IN ( " + pIDs + " ) "
            //    , typeof(CVarReceivables)).Cast<CVarReceivables>().ToList();

            //    foreach (var receivable in ReceivablesList)
            //    {
            //        if (receivable.IsApproved)
            //        {
            //            AllIsUnApproved = false;
            //        }
            //    }
            //}


            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[] {
                AllIsUnApproved
            };
        }

        [HttpGet, HttpPost]
        public object[] LoadWithWhereClause(Int32 pPageNumber, Int32 pPageSize, string pWhereClause)
        {
            #region DepartmentCharge Case
            Int32 _RowCount = 0;
            Exception exception;
            CDefaults objCDefaults = new CDefaults();
            CUsers objCUsers = new CUsers();
            objCDefaults.GetListPaging(999999, 1, "WHERE 1=1", "ID", out _RowCount);
            objCUsers.GetListPaging(999999, 1, "WHERE  ID=" + WebSecurity.CurrentUserId, "ID", out _RowCount);
            if (!objCUsers.lstCVarUsers[0].IsAccessAllCharges)
                pWhereClause += " AND ChargeTypeID IN (SELECT ChargeTypeID FROM DepartmentCharge WHERE DepartmentID=" + objCUsers.lstCVarUsers[0].DepartmentID + ") \n";
            #endregion DepartmentCharge Case
            string pOrderBy = "ViewOrder,ChargeTypeName";
            if (objCDefaults.lstCVarDefaults[0].UnEditableCompanyName == "NEW")
                pOrderBy = "IssueDate,ChargeTypeName";
            CvwPayables objCvwPayables = new CvwPayables();
            //pSearchKey here is the where clause
            if (objCDefaults.lstCVarDefaults[0].UnEditableCompanyName != "EGL")
                exception = objCvwPayables.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);
            else
            {
                exception = objCvwPayables.GetList(pWhereClause);
            }
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[] { serializer.Serialize(objCvwPayables.lstCVarvwPayables), _RowCount  };
        }

        [HttpGet, HttpPost]
        public Object[] LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned(bool pIsLoadArrayOfObjects, Int32 pPageNumber, Int32 pPageSize, string pWhereClause, string pOrderBy)
        {
            Int32 _RowCount = 0;
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };

            //COperations objCOperations = new COperations();
            //objCOperations.GetListPaging(2000, 1, "WHERE CreationDate > DATEADD(mm,DATEDIFF(mm,0,GETDATE())-12,0) ", " ID DESC ", out _RowCount);
            CvwOperationsWithMinimalColumns objCOperations = new CvwOperationsWithMinimalColumns();
            //objCOperations.GetListPaging(2000, 1, "WHERE 1=1 ", " ID DESC ", out _RowCount);

            CNoAccessPartnerTypes objCNoAccessPartnerTypes = new CNoAccessPartnerTypes();
            objCNoAccessPartnerTypes.GetList(" WHERE 1=1 ");

            CvwAccPartners objCvwAccPartners = new CvwAccPartners();
            objCvwAccPartners.GetListFilter(" WHERE 1=1 ORDER BY PartnerTypeID, Name ");

            CNoAccessPaymentType objCNoAccessPaymentType = new CNoAccessPaymentType();
            objCNoAccessPaymentType.GetList(" WHERE IsInactive=0 ORDER BY Name ");

            CvwA_CostCenters objCvwA_CostCenters = new CvwA_CostCenters();


            CTreasury objCTreasury = new CTreasury();
            objCTreasury.GetList("Where 1=1");

            CBankAccount objBankAccount = new CBankAccount();
            objBankAccount.GetList("where 1=1");

            CvwA_Accounts objCvwA_Accounts = new CvwA_Accounts();
            objCvwA_Accounts.GetListPaging(99999, 1, "WHERE IsMain=0", "Name, Code", out _RowCount);

            CvwPayables objCvwPayables = new CvwPayables();

            CvwDefaults objCvwDefaults = new CvwDefaults();
            objCvwDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount); //i am sure i ve just one row isa
            string CompanyName = objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName;
            if (CompanyName == "BED")
            {
                objCvwA_CostCenters.GetListPaging(99999, 1, "WHERE IsMain=0 and id NOT IN ( SELECT a.CostCenterID FROM A_LinkOperationWithCostCenter a JOIN Operations AS o ON o.ID=a.OperationID WHERE o.OperationStageID IN(110,120))", "Name, Code", out _RowCount);
                objCvwPayables.GetListPaging(pPageSize, pPageNumber, pWhereClause + " AND CostAmount >0", pOrderBy, out _RowCount);
            }
            else
            {
                objCvwA_CostCenters.GetListPaging(99999, 1, "WHERE IsMain=0", "Name, Code", out _RowCount);
                objCvwPayables.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);

            }



            return new Object[] {
                serializer.Serialize(objCvwPayables.lstCVarvwPayables)
                , _RowCount
                , pIsLoadArrayOfObjects ? serializer.Serialize(objCvwAccPartners.lstCVarvwAccPartners) : null //data[2]
                , pIsLoadArrayOfObjects ? serializer.Serialize(objCOperations.lstCVarvwOperationsWithMinimalColumns) : null //data[3]
                , pIsLoadArrayOfObjects ?serializer.Serialize(objCNoAccessPaymentType.lstCVarNoAccessPaymentType) : null //data[4]
                , pIsLoadArrayOfObjects ? serializer.Serialize(objCNoAccessPartnerTypes.lstCVarNoAccessPartnerTypes) : null //data[5]
                , pIsLoadArrayOfObjects ? serializer.Serialize(objCvwA_CostCenters.lstCVarvwA_CostCenters) : null //data[6]
                , pIsLoadArrayOfObjects ? serializer.Serialize(objCTreasury.lstCVarTreasury) : null //data[7]
                , pIsLoadArrayOfObjects ? serializer.Serialize(objBankAccount.lstCVarBankAccount) : null //data[8]
                , pIsLoadArrayOfObjects ? serializer.Serialize(objCvwA_Accounts.lstCVarvwA_Accounts) : null //data[9]
            };
        }

        [HttpGet, HttpPost]
        public Object[] OperationPayableApproval_PartnerTypeChanged(Int32 pPartnerTypeID, string pWhereClause, string pOrderBy, Int32 pPageNumber, Int32 pPageSize)
        {
            int _RowCount = 0;
            Exception checkException = null;
            CvwAccPartners objCvwAccPartners = new CvwAccPartners();
            CvwPayables objCvwPayables = new CvwPayables();

            if (pPartnerTypeID != 0)
                checkException = objCvwAccPartners.GetListPaging(10000, 1, "WHERE PartnerTypeID=" + pPartnerTypeID, "Name", out _RowCount);
            checkException = objCvwPayables.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[]
            {
                serializer.Serialize(objCvwPayables.lstCVarvwPayables)
                , _RowCount
                , new JavaScriptSerializer().Serialize(objCvwAccPartners.lstCVarvwAccPartners)
            };
        }

        //insert multi row but without values(from modal with just checkboxes)
        [HttpGet, HttpPost]
        public bool InsertListWithoutValues(Int64 pOperationID, string pSelectedIDs, Int64 pQuotationRouteID, Int64 pOperationContainersAndPackagesID, Int64 pOperationVehicleID, Int64 pTruckingOrderID, string pQuotationChargeIDs = null, bool? pIsClosedOperation = false)
        {
            bool _result = false;
            string pWhereClause = "";
            string pWhereClauseTax = "";

            int _RowCount = 0;
            int _CurrencyID = 0;
            decimal _ExchangeRate = 1;

            int _RowCount2 = 0;
            CvwDefaults objCvwDefaults = new CvwDefaults();
            CChargeTypes objCChargeTypes = new CChargeTypes();



            objCvwDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount2); //i am sure i ve just one row isa
            string CompanyName = objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName;


            CChargeTypesTAX objCChargeTypesTAX = new CChargeTypesTAX();
            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
            string OperationID = "";
            if (CompanyName == "CHM")
            {
                OperationID = objCCustomizedDBCall.CallStringFunctionByMultiReturn("select top 1 TaxID from ForwardingTransChemTax.dbo.TaxLink WHERE Notes='Operations' and OriginID = " + pOperationID);

            }
            else if (CompanyName == "OCE")
            {
                OperationID = objCCustomizedDBCall.CallStringFunctionByMultiReturn("select top 1 TaxID from ForwardingTROTax.dbo.TaxLink WHERE Notes='Operations' and OriginID = " + pOperationID);

            }



            ////building the where clause to select the rows from ChargeTypes
            //foreach (var currentID in pSelectedIDs.Split(','))
            //{
            //    //i am sure i ve at least 1 selectedID isa
            //    pWhereClause += (pWhereClause == "" ? " WHERE ID = " + currentID.ToString()
            //        : " OR ID = " + currentID.ToString());
            //}
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
            pWhereClause += " WHERE ID IN (" + pSelectedIDs + ")";
            objCChargeTypes.GetListPaging(999999, 1, pWhereClause, "ID", out _RowCount);

            //   CPayables objCPayables = new CPayables();
            if (!string.IsNullOrEmpty(pSelectedIDs) && !string.IsNullOrEmpty(pQuotationChargeIDs) && objCChargeTypes.lstCVarChargeTypes.Count > 0)
            {
                CPayables objCPayables = new CPayables();
                string[] ChargeTypeIDsArr = pSelectedIDs.Split(',');
                string[] QuotationChargeIDsArr = pQuotationChargeIDs.Split(',');
                for (int i = 0; i < ChargeTypeIDsArr.Length; i++)
                {
                    CVarPayables objCVarPayables = new CVarPayables();
                    var chargeType = objCChargeTypes.lstCVarChargeTypes.FirstOrDefault(a => a.ID == int.Parse(ChargeTypeIDsArr[i]));
                    if (chargeType == null)
                        continue;

                    objCVarPayables.OperationID = pOperationID;
                    objCVarPayables.ChargeTypeID = chargeType.ID;
                    objCVarPayables.MeasurementID = chargeType.MeasurementID;
                    objCVarPayables.Notes = chargeType.Notes;
                    objCVarPayables.GeneratingQCID = long.Parse(QuotationChargeIDsArr[i]);
                    objCVarPayables.Quantity = 1;
                    objCVarPayables.ExchangeRate = _ExchangeRate;
                    objCVarPayables.CurrencyID = _CurrencyID;
                    objCVarPayables.SupplierInvoiceNo = "0";
                    objCVarPayables.SupplierReceiptNo = "0";
                    objCVarPayables.EntryDate = DateTime.Now;
                    objCVarPayables.BillID = 0;
                    objCVarPayables.IssueDate = DateTime.Now;
                    objCVarPayables.OperationContainersAndPackagesID = pOperationContainersAndPackagesID;
                    objCVarPayables.GeneratingQRID = pQuotationRouteID;
                    objCVarPayables.OperationVehicleID = pOperationVehicleID;
                    objCVarPayables.TruckingOrderID = pTruckingOrderID;
                    objCVarPayables.CreatorUserID = objCVarPayables.ModificatorUserID = WebSecurity.CurrentUserId;
                    objCVarPayables.ModificationDate = objCVarPayables.CreationDate = DateTime.Now;
                    objCVarPayables.IsOfficial = false;
                    objCVarPayables.IsQuotationApproval = false;
                    objCVarPayables.ApprovePendingValue = 0;
                    objCVarPayables.crmCode = "";
                    objCVarPayables.IsPurchased = false;

                    objCPayables.lstCVarPayables.Add(objCVarPayables);
                }
                var checkException = objCPayables.SaveMethod(objCPayables.lstCVarPayables);





                if (checkException == null)
                    _result = true;
            }
            else
            {
                Int32 ChargeTypeID = 0;
                foreach (var rowChargeType in objCChargeTypes.lstCVarChargeTypes.ToList())
                {
                    decimal _Quantity = 1;
                    if (objCDefaults.lstCVarDefaults[0].UnEditableCompanyName == "NIS")
                        _Quantity = Forwarding.MvcApp.Controllers.MasterData.API_Locations.ChargeTypesController.ChargeTypes_GetQuantity(rowChargeType.ID, pOperationID);

                    if (objCDefaults.lstCVarDefaults[0].UnEditableCompanyName == "USC" && rowChargeType.Name.ToUpper().Contains("TRANSPORT"))
                    {
                        COperationPartners checkTruckerPartner = new COperationPartners();
                        checkTruckerPartner.GetList($"WHERE OperationPartnerTypeID=11 AND OperationID={pOperationID}");
                        if (checkTruckerPartner.lstCVarOperationPartners.Count == 0)
                        {
                            return false;
                        }
                    }
                    if (objCDefaults.lstCVarDefaults[0].UnEditableCompanyName == "USC")
                    {
                        _CurrencyID = rowChargeType.ChargeTypeCurrency_ID;
                        if (_CurrencyID == 0)
                            _CurrencyID = objCDefaults.lstCVarDefaults[0].CurrencyID;

                        CCustomizedDBCall getCurrentExchangeRate = new CCustomizedDBCall();
                        string exRate = getCurrentExchangeRate.CallStringFunction($"select CurrentExchangeRate from vwCurrencies where ID={_CurrencyID}");
                        if (exRate == "" || exRate == "0")
                        {
                            return false;
                        }
                        _ExchangeRate = decimal.Parse(exRate);
                    }
                  
                    CPayables objCPayables = new CPayables();

                    CVarPayables objCVarPayables = new CVarPayables();
                    if (objCDefaults.lstCVarDefaults[0].UnEditableCompanyName == "EVL" && rowChargeType.ID == 394)
                    {
                        COperationPartners objCoperationPartner = new COperationPartners();
                        objCoperationPartner.GetList("Where OperationID = " + pOperationID + " AND AgentID = " + 1112);
                        if(objCoperationPartner.lstCVarOperationPartners.Count > 0)
                        {
                            objCVarPayables.SupplierOperationPartnerID = objCoperationPartner.lstCVarOperationPartners[0].ID;
                        }
                       
                    }
                    objCVarPayables.OperationID = pOperationID;
                    objCVarPayables.ChargeTypeID = rowChargeType.ID;
                    objCVarPayables.MeasurementID = rowChargeType.MeasurementID;
                    objCVarPayables.Quantity = _Quantity;
                    objCVarPayables.ExchangeRate = _ExchangeRate;
                    objCVarPayables.CurrencyID = _CurrencyID;
                    objCVarPayables.SupplierInvoiceNo = "0";
                    objCVarPayables.SupplierReceiptNo = "0";
                    objCVarPayables.EntryDate = DateTime.Now;
                    objCVarPayables.BillID = 0;

                    objCVarPayables.IssueDate = DateTime.Now;
                    objCVarPayables.OperationContainersAndPackagesID = pOperationContainersAndPackagesID;

                    objCVarPayables.GeneratingQRID = pQuotationRouteID;
                    objCVarPayables.OperationVehicleID = pOperationVehicleID;
                    objCVarPayables.TruckingOrderID = pTruckingOrderID;
                    //objCVarPayables.Notes = rowChargeType.Notes;
                    if (objCDefaults.lstCVarDefaults[0].UnEditableCompanyName == "ESG")
                        objCVarPayables.Notes = "";
                    else
                        objCVarPayables.Notes = rowChargeType.Notes;

                    objCVarPayables.CreatorUserID = objCVarPayables.ModificatorUserID = WebSecurity.CurrentUserId;
                    objCVarPayables.ModificationDate = objCVarPayables.CreationDate = DateTime.Now;
                    objCVarPayables.IsOfficial = false;
                    objCVarPayables.IsQuotationApproval = false;
                    objCVarPayables.ApprovePendingValue = 0;
                    objCVarPayables.crmCode = "";
                    objCVarPayables.IsPurchased = false;

                    objCPayables.lstCVarPayables.Add(objCVarPayables);
                    var checkException = objCPayables.SaveMethod(objCPayables.lstCVarPayables);

                    if (checkException == null && objCDefaults.lstCVarDefaults[0].UnEditableCompanyName == "USC")
                    {
                        CCustomizedDBCall objCCustomizedDBCall2 = new CCustomizedDBCall();
                        //string OperationCode = objCCustomizedDBCall2.CallStringFunction($"select Code from operations where ID={pOperationID}");
                        CVarEmail objCVarEmail = new CVarEmail();
                        CEmail objCEmail = new CEmail();
                        CEmailReceiver objCEmailReceiver = new CEmailReceiver();
                        objCVarEmail.Subject = "Payable Added In Operation";
                        objCVarEmail.Body = $"Payable-> {rowChargeType.Name}";
                        objCVarEmail.QuotationRouteID = 0;
                        objCVarEmail.OperationID = pOperationID;
                        objCVarEmail.SenderUserID = WebSecurity.CurrentUserId;
                        objCVarEmail.SendingDate = DateTime.Now;
                        objCEmail.lstCVarEmail.Add(objCVarEmail);
                        checkException = objCEmail.SaveMethod(objCEmail.lstCVarEmail);
                        if (checkException == null) //add to EmailReceivers
                        {
                            string usersIDs = objCCustomizedDBCall2.CallStringFunctionByMultiReturn("select ID from Users where DepartmentID=(select ID from NoAccessDepartments where Code='AP ACCOUNTANT')");
                            var pArrayOfReceiversIDs = usersIDs.Split(',');
                            var NoOfReceivers = pArrayOfReceiversIDs.Length;
                            for (int i = 0; i < NoOfReceivers; i++)
                            {
                                CVarEmailReceiver objCVarEmailReceiver = new CVarEmailReceiver();
                                objCVarEmailReceiver.EmailID = objCVarEmail.ID;
                                objCVarEmailReceiver.ReceiverUserID = int.Parse(pArrayOfReceiversIDs[i]);
                                objCVarEmailReceiver.ReceivingDate = DateTime.Parse("01-01-1900");
                                objCVarEmailReceiver.IsAlarm = true;

                                objCEmailReceiver.lstCVarEmailReceiver.Add(objCVarEmailReceiver);
                            }
                            checkException = objCEmailReceiver.SaveMethod(objCEmailReceiver.lstCVarEmailReceiver);
                        }
                    }

                    if (checkException == null && pIsClosedOperation == true)
                    {
                        CAccNoteAfterOperationClose objCAccNoteAfterOperationClose = new CAccNoteAfterOperationClose();

                        CVarAccNoteAfterOperationClose objCVarAccNoteAfterOperationClose = new CVarAccNoteAfterOperationClose();
                        objCVarAccNoteAfterOperationClose.CreationDate = DateTime.Now;
                        objCVarAccNoteAfterOperationClose.CreatorUserID = WebSecurity.CurrentUserId;
                        objCVarAccNoteAfterOperationClose.ID = 0;
                        objCVarAccNoteAfterOperationClose.PayableID = objCPayables.lstCVarPayables[0].ID;
                        objCAccNoteAfterOperationClose.lstCVarAccNoteAfterOperationClose.Add(objCVarAccNoteAfterOperationClose);

                        checkException = objCAccNoteAfterOperationClose.SaveMethod(objCAccNoteAfterOperationClose.lstCVarAccNoteAfterOperationClose);
                    }

                    if (checkException == null)
                        _result = true;

                    if ((CompanyName == "CHM" || CompanyName == "OCE") && checkException == null)
                    {
                        objCChargeTypes.GetList("WHERE ID=" + rowChargeType.ID);
                        objCChargeTypesTAX.GetList("WHERE Name=N'" + (objCChargeTypes.lstCVarChargeTypes.Count > 0 ? objCChargeTypes.lstCVarChargeTypes[0].Name : "") + "'");
                        ChargeTypeID = objCChargeTypesTAX.lstCVarChargeTypes.Count > 0 ? objCChargeTypesTAX.lstCVarChargeTypes[0].ID : 0;

                        if (CompanyName == "CHM")
                        {
                            OperationID = objCCustomizedDBCall.CallStringFunctionByMultiReturn("select top 1 TaxID from ForwardingTransChemTax.dbo.TaxLink WHERE Notes='Operations' and OriginID = " + pOperationID);
                        }
                        else if (CompanyName == "OCE")
                        {
                            OperationID = objCCustomizedDBCall.CallStringFunctionByMultiReturn("select top 1 TaxID from ForwardingTROTax.dbo.TaxLink WHERE Notes='Operations' and OriginID = " + pOperationID);
                        }

                        CPayablesTAX objCPayablesTax = new CPayablesTAX();

                        CVarPayablesTAX objCVarPayablesTax = new CVarPayablesTAX();
                        if (OperationID != "")
                        {
                            objCVarPayablesTax.OperationID = int.Parse(OperationID);
                            objCVarPayablesTax.ChargeTypeID = ChargeTypeID;
                            objCVarPayablesTax.MeasurementID = rowChargeType.MeasurementID;
                            objCVarPayablesTax.Quantity = _Quantity;
                            objCVarPayablesTax.ExchangeRate = _ExchangeRate;
                            objCVarPayablesTax.CurrencyID = _CurrencyID;
                            objCVarPayablesTax.SupplierInvoiceNo = "0";
                            objCVarPayablesTax.SupplierReceiptNo = "0";
                            objCVarPayablesTax.EntryDate = DateTime.Now;
                            objCVarPayablesTax.BillID = 0;

                            objCVarPayablesTax.IssueDate = DateTime.Now;
                            objCVarPayablesTax.OperationContainersAndPackagesID = pOperationContainersAndPackagesID;

                            objCVarPayablesTax.GeneratingQRID = pQuotationRouteID;
                            objCVarPayablesTax.OperationVehicleID = pOperationVehicleID;
                            objCVarPayablesTax.TruckingOrderID = pTruckingOrderID;
                            objCVarPayablesTax.Notes = rowChargeType.Notes;

                            objCVarPayablesTax.CreatorUserID = objCVarPayablesTax.ModificatorUserID = WebSecurity.CurrentUserId;
                            objCVarPayablesTax.ModificationDate = objCVarPayablesTax.CreationDate = DateTime.Now;

                            objCPayablesTax.lstCVarPayables.Add(objCVarPayablesTax);
                            checkException = objCPayablesTax.SaveMethod(objCPayablesTax.lstCVarPayables);
                            //link
                            // objCCustomizedDBCall.ExecuteQuery_DataTable("insertTaxLink " + objCVarPayables.ID + "," + objCVarPayablesTax.ID + "," + "Payables");

                            if (checkException == null)
                                _result = true;
                        }

                    }
                }
                if (_result && objCDefaults.lstCVarDefaults[0].UnEditableCompanyName == "MED" && pQuotationRouteID > 0)
                {
                    CQuotationRoute objCQuotationRoute = new CQuotationRoute();
                    var ex = objCQuotationRoute.UpdateList($" IsChargeEditApprovalRequested = 0, ChargeEditApprovalLevel = 0, ChargeEdit1stApprovalUserID = NULL, ChargeEdit2ndApprovalUserID = NULL, ChargeEdit3rdApprovalUserID = NULL, ChargeEdit4thApprovalUserID = NULL where ID = {pQuotationRouteID}");
                }
            }

            return _result;
        }
        //insert multi row with values (incase i switch adding Payables to enter values too)
        [HttpGet, HttpPost]
        public bool InsertListWithValues(Int64 pOperationID, string pSelectedIDs, string pPOrCList, string pSupplierList, string pUOMList, string pQuantityList, string pCostPriceList, string pCostAmountList, string pInitialSalePriceList, string pSupplierInvoiceNumberList, string pSupplierReceiptNumberList, string pExchangeRateList, string pCurrencyList)
        {
            bool _result = false;
            int NumberOfRows = pSelectedIDs.Split(',').Length;

            CPayables objCPayables = new CPayables();

            for (int i = 0; i < NumberOfRows; i++)
            {
                CVarPayables objCVarPayables = new CVarPayables();

                objCVarPayables.OperationID = pOperationID;
                objCVarPayables.ChargeTypeID = int.Parse(pSelectedIDs.Split(',')[i]);
                objCVarPayables.POrC = int.Parse(pPOrCList.Split(',')[i]);
                objCVarPayables.SupplierOperationPartnerID = Int64.Parse(pSupplierList.Split(',')[i]);
                objCVarPayables.MeasurementID = int.Parse(pUOMList.Split(',')[i]);
                objCVarPayables.Quantity = decimal.Parse(pQuantityList.Split(',')[i]) == 0 ? 1 : decimal.Parse(pQuantityList.Split(',')[i]);
                objCVarPayables.CostPrice = decimal.Parse(pCostPriceList.Split(',')[i]);
                objCVarPayables.CostAmount = decimal.Parse(pCostAmountList.Split(',')[i]);
                objCVarPayables.InitialSalePrice = decimal.Parse(pInitialSalePriceList.Split(',')[i]);
                objCVarPayables.SupplierInvoiceNo = pSupplierInvoiceNumberList.Split(',')[i];
                objCVarPayables.SupplierReceiptNo = pSupplierReceiptNumberList.Split(',')[i];
                objCVarPayables.ExchangeRate = decimal.Parse(pExchangeRateList.Split(',')[i]);
                objCVarPayables.CurrencyID = int.Parse(pCurrencyList.Split(',')[i]);
                objCVarPayables.EntryDate = DateTime.Now;
                //objCVarPayables.BillID = pBillIDList.Split(',')[i];

                objCVarPayables.IssueDate = DateTime.Now;
                objCVarPayables.OperationContainersAndPackagesID = 0;

                objCVarPayables.Notes = "";

                objCVarPayables.CreatorUserID = objCVarPayables.ModificatorUserID = WebSecurity.CurrentUserId;
                objCVarPayables.ModificationDate = objCVarPayables.CreationDate = DateTime.Now;
                objCVarPayables.IsOfficial = false;
                objCVarPayables.IsQuotationApproval = false;
                objCVarPayables.crmCode = "";
                objCVarPayables.IsPurchased = false;

                objCPayables.lstCVarPayables.Add(objCVarPayables);
            }
            var checkException = objCPayables.SaveMethod(objCPayables.lstCVarPayables);
            if (checkException == null)
                _result = true;

            return _result;
        }

        //update multi row with values 
        [HttpGet, HttpPost]
        public object[] UpdateList([FromBody] UpdatePayableParameters updatePayableParameters)
        {
            bool _result = false;
            string updateClause = "";
            string msgReturnedForCurrentPayableToCheckUniqueness = "";//i used this to be reset every iteration so i can use it as a flag to decide wether to send the updated SupplierInvoiceNo or leave unchanged
            string msgReturned = "";
            int _RowCount = 0;
            CDefaults objCDefaults = new CDefaults();
            objCDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount);

            string[] MescoCompanies = new string[5] { "MES", "SAC", "GLO", "EUR", "ALT" };
            bool IsMescoCompany = MescoCompanies.Contains(objCDefaults.lstCVarDefaults[0].UnEditableCompanyName);

            bool _IsCostIncreased = false;
            Int64 _OperationID = 0;
            int NumberOfRows = updatePayableParameters.pSelectedPayablesIDsToUpdate.Split(',').Length;
            for (int i = 0; i < NumberOfRows; i++)
            {
                //DateTime dt = DateTime.Parse(pEntryDateList.Split(',')[i] == "" ? "01/01/1900": pEntryDateList.Split(',')[i]);
                //DateTime dt = DateTime.Parse(pEntryDateList.Split(',')[i] == "" ? "01/01/1900" : pEntryDateList.Split(',')[i], System.Globalization.CultureInfo.CurrentCulture);
                //DateTime usedDate = DateTime.Now;
                //usedDate = new DateTime(dt.Year, dt.Month, dt.Day);
                //int pEntryYear = DateTime.Parse(pEntryDateList.Split(',')[i] == "" ? "01/01/1900" : pEntryDateList.Split(',')[i]).Year;
                //string strTemp = (updatePayableParameters.pEntryDateList.Split(',')[i] == "" ? "01/01/1900" : updatePayableParameters.pEntryDateList.Split(',')[i]);//
                //string pEntryYear = strTemp.Substring(updatePayableParameters.pEntryDateList.Split(',')[i].Length - 4);
                CvwPayables cvwPayables = new CvwPayables();
                cvwPayables.GetList($"where id = {updatePayableParameters.pSelectedPayablesIDsToUpdate.Split(',')[i]}");
              
                    var IsvalidChargeType = IsMescoCompany ?  CheckChargeTypeCategory((int)cvwPayables.lstCVarvwPayables[0].OperationID, Convert.ToInt32(updatePayableParameters.pCategoryList.Split(',')[i]), (int)cvwPayables.lstCVarvwPayables[0].ChargeTypeID): null;
                    bool x =IsMescoCompany ?  (bool)IsvalidChargeType[0]: true;
                if (IsMescoCompany && IsvalidChargeType != null && IsvalidChargeType.Any() && !x)
                {
                   
                        msgReturned = "No ExpenseAccount Found For This Cat";
                    
                }
                else
                {

                    if (cvwPayables.lstCVarvwPayables[0].IsIncludedInPaymentRequest == 1)
                    {

                        updateClause = "  OperationContainersAndPackagesID = " + (updatePayableParameters.pOperationContainersAndPackagesIDList != null ? updatePayableParameters.pOperationContainersAndPackagesIDList.Split(',')[i] == "0" ? " NULL " : updatePayableParameters.pOperationContainersAndPackagesIDList.Split(',')[i] : "NULL");

                        if (updatePayableParameters.pCategoryList != "")
                        {
                            if (updatePayableParameters.pCategoryList.Split(',')[i] != "0")
                                updateClause += ",  CategoryID = " + updatePayableParameters.pCategoryList.Split(',')[i];
                        }

                        if (updatePayableParameters.pIsCalledFromOperations)
                            updateClause += " , BillID = " + (updatePayableParameters.pBillIDList.Split(',')[i] == "0" ? " NULL " : updatePayableParameters.pBillIDList.Split(',')[i]);

                        if ((WebSecurity.CurrentUserId == 276 || WebSecurity.CurrentUserId == 4) && IsMescoCompany)
                            updateClause += " , Quantity = " + (updatePayableParameters.pQuantityList.Split(',')[i] == "0" ? "1" : updatePayableParameters.pQuantityList.Split(',')[i]);


                        updateClause += " , ModificatorUserID = " + WebSecurity.CurrentUserId.ToString();
                        updateClause += " , ModificationDate = GETDATE() ";
                        updateClause += " WHERE IsApproved=0 AND ID = " + updatePayableParameters.pSelectedPayablesIDsToUpdate.Split(',')[i];
                        CPayables objCPayables = new CPayables();
                        Exception checkException = objCPayables.UpdateList(updateClause);

                        continue;
                    }


                    msgReturnedForCurrentPayableToCheckUniqueness = "";
                    if (objCDefaults.lstCVarDefaults[0].UnEditableCompanyName == "GBL" && updatePayableParameters.pSupplierInvoiceNumberList.Split(',')[i] != "0" && updatePayableParameters.pSupplierInvoiceNumberList.Split(',')[i] != "N/A")
                    {
                        msgReturnedForCurrentPayableToCheckUniqueness = CheckSupplierInvoiceNumberUniqueness(Int64.Parse(updatePayableParameters.pSelectedPayablesIDsToUpdate.Split(',')[i]), updatePayableParameters.pSupplierInvoiceNumberList.Split(',')[i], int.Parse(updatePayableParameters.pPartnerTypeIDList.Split(',')[i]), int.Parse(updatePayableParameters.pPartnerIDList.Split(',')[i]), int.Parse(updatePayableParameters.pCurrencyList.Split(',')[i]));
                        if (msgReturnedForCurrentPayableToCheckUniqueness != "")
                            msgReturned += msgReturnedForCurrentPayableToCheckUniqueness + "\n";
                    }
                    if (objCDefaults.lstCVarDefaults[0].UnEditableCompanyName == "EVL")
                    {
                        if (cvwPayables.lstCVarvwPayables[0].ChargeTypeID == 394 && (updatePayableParameters.pSupplierReceiptNumberList.Split(',')[i] == null || updatePayableParameters.pSupplierReceiptNumberList.Split(',')[i] == "" || updatePayableParameters.pSupplierReceiptNumberList.Split(',')[i] == "0"))
                        {
                            return new object[] { _result, "ReceiptNo is required!" };
                        }
                        if (cvwPayables.lstCVarvwPayables[0].ChargeTypeID == 395 && (updatePayableParameters.pNotesList.Split(',')[i] == null || updatePayableParameters.pNotesList.Split(',')[i] == "" || updatePayableParameters.pNotesList.Split(',')[i] == "0"))
                        {
                            return new object[] { _result, "Notes is required!" };
                        }
                        if (cvwPayables.lstCVarvwPayables[0].ChargeTypeID == 244)
                        {
                            CPayables objCGetOperationPayable = new CPayables();
                            objCGetOperationPayable.GetList("WHERE OperationID = " + cvwPayables.lstCVarvwPayables[0].OperatorID + " AND ChargeTypeID = 187 AND OperationVehicleID = " + cvwPayables.lstCVarvwPayables[0].OperationVehicleID);
                            if (objCGetOperationPayable.lstCVarPayables.Count > 0)
                            {
                                if (objCGetOperationPayable.lstCVarPayables[0].SupplierReceiptNo != "" && objCGetOperationPayable.lstCVarPayables[0].SupplierReceiptNo != "0" && objCGetOperationPayable.lstCVarPayables[0].SupplierReceiptNo != updatePayableParameters.pSupplierReceiptNumberList.Split(',')[i])
                                {
                                    return new object[] { _result, "ReceiptNo error!" };
                                }
                            }
                        }
                        if (cvwPayables.lstCVarvwPayables[0].ChargeTypeID == 187)
                        {
                            CPayables objCGetOperationPayable = new CPayables();
                            objCGetOperationPayable.GetList("WHERE OperationID = " + cvwPayables.lstCVarvwPayables[0].OperationID + " AND ChargeTypeID = 244 AND OperationVehicleID = " + cvwPayables.lstCVarvwPayables[0].OperationVehicleID);
                            if (objCGetOperationPayable.lstCVarPayables.Count > 0)
                            {
                                if (objCGetOperationPayable.lstCVarPayables[0].SupplierReceiptNo != "" && objCGetOperationPayable.lstCVarPayables[0].SupplierReceiptNo != "0" && objCGetOperationPayable.lstCVarPayables[0].SupplierReceiptNo != updatePayableParameters.pSupplierReceiptNumberList.Split(',')[i])
                                {
                                    return new object[] { _result, "ReceiptNo error!" };
                                }
                            }
                        }
                    }
                    if (msgReturnedForCurrentPayableToCheckUniqueness == "")
                    {

                        updateClause = " POrC = " + (updatePayableParameters.pPOrCList.Split(',')[i] == "0" ? " NULL " : updatePayableParameters.pPOrCList.Split(',')[i]);
                        updateClause += " , SupplierOperationPartnerID = " + (updatePayableParameters.pSupplierList.Split(',')[i] == "0" ? " NULL " : updatePayableParameters.pSupplierList.Split(',')[i]);
                        updateClause += " , MeasurementID = " + (updatePayableParameters.pUOMList.Split(',')[i] == "0" ? " NULL " : updatePayableParameters.pUOMList.Split(',')[i]);
                        updateClause += " , Quantity = " + (updatePayableParameters.pQuantityList.Split(',')[i] == "0" ? "1" : updatePayableParameters.pQuantityList.Split(',')[i]);
                        updateClause += " , CostPrice = " + updatePayableParameters.pCostPriceList.Split(',')[i];

                        if (IsMescoCompany)
                            updateClause += " , QuotationCost = " + updatePayableParameters.pCostAmountList.Split(',')[i];

                        if (IsMescoCompany && updatePayableParameters.pCategoryList != "")
                        {
                            if (updatePayableParameters.pCategoryList.Split(',')[i] != "0")
                                updateClause += " , CategoryID = " + updatePayableParameters.pCategoryList.Split(',')[i];
                        }

                        updateClause += " , AmountWithoutVAT = " + updatePayableParameters.pAmountWithoutVATList.Split(',')[i];
                        updateClause += " , TaxTypeID = " + (updatePayableParameters.pTaxTypeIDList.Split(',')[i] == "0" ? " NULL " : updatePayableParameters.pTaxTypeIDList.Split(',')[i]);
                        updateClause += " , TaxPercentage = " + updatePayableParameters.pTaxPercentageList.Split(',')[i];
                        updateClause += " , TaxAmount = " + updatePayableParameters.pTaxAmountList.Split(',')[i];
                        updateClause += " , DiscountTypeID = " + (updatePayableParameters.pDiscountTypeIDList.Split(',')[i] == "0" ? " NULL " : updatePayableParameters.pDiscountTypeIDList.Split(',')[i]);
                        updateClause += " , DiscountPercentage = " + updatePayableParameters.pDiscountPercentageList.Split(',')[i];
                        updateClause += " , DiscountAmount = " + updatePayableParameters.pDiscountAmountList.Split(',')[i];

                        updateClause += " , CostAmount = " + (IsMescoCompany ? "0" : updatePayableParameters.pCostAmountList.Split(',')[i]);
                        updateClause += " , InitialSalePrice = " + updatePayableParameters.pInitialSalePriceList.Split(',')[i];
                        updateClause += msgReturnedForCurrentPayableToCheckUniqueness == ""
                                        ? " , SupplierInvoiceNo = " + (updatePayableParameters.pSupplierInvoiceNumberList.Split(',')[i] == "0" ? " NULL " : " '" + updatePayableParameters.pSupplierInvoiceNumberList.Split(',')[i] + "' ")
                                        : "";
                        updateClause += msgReturnedForCurrentPayableToCheckUniqueness == ""
                                        ? " , SupplierReceiptNo = " + (updatePayableParameters.pSupplierReceiptNumberList.Split(',')[i] == "0" ? " NULL " : " '" + updatePayableParameters.pSupplierReceiptNumberList.Split(',')[i] + "' ")
                                        : "";
                        updateClause += msgReturnedForCurrentPayableToCheckUniqueness == ""
                                        ? " , IssueDate = " + (updatePayableParameters.pIssueDateList.Split(',')[i] == "" ? " NULL " : " '" + Forwarding.MvcApp.Helpers.DateFunctionsController.GetYYYYMMDDFormat(updatePayableParameters.pIssueDateList.Split(',')[i], 1) + "' ")
                                        : "";
                        updateClause += msgReturnedForCurrentPayableToCheckUniqueness == ""
                                        ? " , EntryDate = " + (updatePayableParameters.pEntryDateList.Split(',')[i] == "" ? " NULL " : " '" + Forwarding.MvcApp.Helpers.DateFunctionsController.GetYYYYMMDDFormat(updatePayableParameters.pEntryDateList.Split(',')[i], 1) + "' ")
                                        : "";
                        updateClause += " , ExchangeRate = " + updatePayableParameters.pExchangeRateList.Split(',')[i];
                        updateClause += " , CurrencyID = " + (updatePayableParameters.pCurrencyList.Split(',')[i] == "0" ? " NULL " : updatePayableParameters.pCurrencyList.Split(',')[i]);
                        updateClause += " , ModificatorUserID = " + WebSecurity.CurrentUserId.ToString();
                        updateClause += " , ModificationDate = GETDATE() ";
                        updateClause += " , SupplierSiteID = " + (updatePayableParameters.pSupplierSiteIDList.Split(',')[i] == "0" ? " NULL " : updatePayableParameters.pSupplierSiteIDList.Split(',')[i]);
                        updateClause += " , Notes = " + (updatePayableParameters.pNotesList.Split(',')[i] == "0" ? " NULL " : (" N'" + updatePayableParameters.pNotesList.Split(',')[i] + "' ")) + " \n";
                        if (updatePayableParameters.pIsCalledFromOperations)
                            updateClause += " , BillID = " + (updatePayableParameters.pBillIDList.Split(',')[i] == "0" ? " NULL " : updatePayableParameters.pBillIDList.Split(',')[i]);

                        updateClause += " , OperationContainersAndPackagesID = " + (updatePayableParameters.pOperationContainersAndPackagesIDList != null ? updatePayableParameters.pOperationContainersAndPackagesIDList.Split(',')[i] == "0" ? " NULL " : updatePayableParameters.pOperationContainersAndPackagesIDList.Split(',')[i] : "NULL");
                        updateClause += " WHERE IsApproved=0 AND ID = " + updatePayableParameters.pSelectedPayablesIDsToUpdate.Split(',')[i];

                        CPayables objCPayables = new CPayables();
                        Exception checkException = objCPayables.UpdateList(updateClause);
                        if (checkException != null) // an exception is caught in the model
                        {
                            _result = false;
                        }
                        else
                        {
                            _result = true;
                            CPayables objCPayables_Temp = new CPayables();
                            objCPayables_Temp.GetListPaging(999999, 1, "WHERE ID=" + updatePayableParameters.pSelectedPayablesIDsToUpdate.Split(',')[i], "ID", out _RowCount);
                            _OperationID = objCPayables_Temp.lstCVarPayables[0].OperationID;
                            if (objCPayables_Temp.lstCVarPayables[0].QuotationCost != 0
                                && objCPayables_Temp.lstCVarPayables[0].CostAmount > objCPayables_Temp.lstCVarPayables[0].QuotationCost)
                                _IsCostIncreased = true;
                        }
                    }



                }
          
                if (msgReturned != "")
                    _result = false;
                #region  Alarm for case of payables from quotation has cost increased
                if (_IsCostIncreased && objCDefaults.lstCVarDefaults[0].UnEditableCompanyName != "BED")
                {
                    string pAlarmReceiversIDs = "";
                    string pSubject = "Payables Cost Increase";
                    COperations objCOperations = new COperations();
                    objCOperations.GetListPaging(999999, 1, "WHERE ID=" + _OperationID, "ID", out _RowCount);
                    string pBody = "Operation (" + objCOperations.lstCVarOperations[0].Code + ")"
                        + " has one or more payables cost increase than what was specified in the quotation.";
                    CUsers objCUsers = new CUsers();
                    objCUsers.GetListPaging(999999, 1, "WHERE ID=" + objCOperations.lstCVarOperations[0].SalesmanID /*+ " AND ID<>" + WebSecurity.CurrentUserId*/, "ID", out _RowCount);
                    if (objCUsers.lstCVarUsers.Count > 0)
                        for (int j = 0; j < objCUsers.lstCVarUsers.Count; j++)
                            pAlarmReceiversIDs += pAlarmReceiversIDs == "" ? objCUsers.lstCVarUsers[j].ID.ToString() : ("," + objCUsers.lstCVarUsers[j].ID);
                    if (pAlarmReceiversIDs != "")
                        SendAlarmWithMinimalData(pAlarmReceiversIDs, pSubject, pBody);
                }
            } //EOF if (msgReturnedForCurrentPayableToCheckUniqueness == "") {
            #endregion  Alarm for case of payables from quotation has cost increased

            if (_result && objCDefaults.lstCVarDefaults[0].UnEditableCompanyName == "MED" && updatePayableParameters.pQuotationRouteID > 0)
            {
                CQuotationRoute objCQuotationRoute = new CQuotationRoute();
                var ex = objCQuotationRoute.UpdateList($" IsChargeEditApprovalRequested = 0, ChargeEditApprovalLevel = 0, ChargeEdit1stApprovalUserID = NULL, ChargeEdit2ndApprovalUserID = NULL, ChargeEdit3rdApprovalUserID = NULL, ChargeEdit4thApprovalUserID = NULL where ID = {updatePayableParameters.pQuotationRouteID}");
            }

            return new object[] { _result, msgReturned };
        }

        //pSavedFrom=10: Called from Operations so update tank(i.e pOperationContainersAndPackagesID)
        [HttpGet, HttpPost]
        public object[] Update(Int32 pSavedFrom, Int64 pOperationContainersAndPackagesID
            , Int64 pID, Int64 pOperationID, Int32 pChargeTypeID, int pPOrC, Int64 pSupplierOperationPartnerID, Int32 pMeasurementID
            , Int32 pContainerTypeID, decimal pQuantity, Decimal pCostPrice, decimal pAmountWithoutVAT, Int32 pTaxTypeID
            , decimal pTaxPercentage, decimal pTaxAmount, Int32 pDiscountTypeID, decimal pDiscountPercentage, decimal pDiscountAmount
            , Decimal pCostAmount, Decimal pInitialSalePrice, String pSupplierInvoiceNo, String pSupplierReceiptNo
            , DateTime pEntryDate, Int64 pBillID, DateTime pIssueDate, Decimal pExchangeRate, Int32 pCurrencyID, string pNotes
            , int pPartnerTypeID, int pPartnerID, Int64 pPayableBillTo, int pCategoryID, int pSupplierSiteID, Int64 pTruckingOrderID, Int32 pOperationVehicleID = 0 , int pQuotationRouteID = 0, bool pIsOfficial = false, bool pIsCredit = false)//pPartnerTypeID,pPartnerID are to check uniqueness of supplier invoice No. in the controller
        {
            bool _result = false;
            string msgReturned = "";
            int _RowCount = 0;
            Exception checkException = null;
            CDefaults objCDefaults = new CDefaults();
            objCDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount);
            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
            if (objCDefaults.lstCVarDefaults[0].UnEditableCompanyName == "EVL")
            {
                if (pChargeTypeID == 394 && (pSupplierReceiptNo == null || pSupplierReceiptNo == "" || pSupplierReceiptNo == "0") )
                {
                    return new object[] { _result, "ReceiptNo is required!" };
                }
                if (pChargeTypeID == 395 && (pNotes == null || pNotes == "" || pNotes == "0"))
                {
                    return new object[] { _result, "Notes is required!" };
                }
                if (pChargeTypeID == 244)
                {
                    CPayables objCGetOperationPayable = new CPayables();
                    objCGetOperationPayable.GetList("WHERE OperationID = " + pOperationID + " AND ChargeTypeID = 187 AND OperationVehicleID = "+ pOperationVehicleID );
                    if (objCGetOperationPayable.lstCVarPayables.Count > 0)
                    {
                        if (objCGetOperationPayable.lstCVarPayables[0].SupplierReceiptNo != "" && objCGetOperationPayable.lstCVarPayables[0].SupplierReceiptNo != "0" && objCGetOperationPayable.lstCVarPayables[0].SupplierReceiptNo != pSupplierReceiptNo)
                        {
                            return new object[] { _result, "ReceiptNo error!" };
                        }
                    }
                }
                if (pChargeTypeID == 187)
                {
                    CPayables objCGetOperationPayable = new CPayables();
                    objCGetOperationPayable.GetList("WHERE OperationID = " + pOperationID + " AND ChargeTypeID = 244 AND OperationVehicleID = "+ pOperationVehicleID);
                    if (objCGetOperationPayable.lstCVarPayables.Count > 0)
                    {
                        if (objCGetOperationPayable.lstCVarPayables[0].SupplierReceiptNo != "" && objCGetOperationPayable.lstCVarPayables[0].SupplierReceiptNo != "0" && objCGetOperationPayable.lstCVarPayables[0].SupplierReceiptNo != pSupplierReceiptNo)
                        {
                            return new object[] { _result, "ReceiptNo error!" };
                        }
                    }
                }
            }
            string[] MescoCompanies = new string[5] { "MES", "SAC", "GLO", "EUR", "ALT" };
            bool IsMescoCompany = MescoCompanies.Contains(objCDefaults.lstCVarDefaults[0].UnEditableCompanyName);
            CA_PaymentRequestDetails objCA_PaymentRequestDetails = new CA_PaymentRequestDetails();
            objCA_PaymentRequestDetails.GetList($"WHERE PayableID = {pID}");

            if (IsMescoCompany && objCA_PaymentRequestDetails.lstCVarA_PaymentRequestDetails.Count > 0)
            {


                var query = $@"select ApproveLevel from vwA_PaymentRequest where id in (select PaymentRequestID from A_PaymentRequestDetails where PayableID = {pID})";

                var IsInNewRequest = objCCustomizedDBCall.CallStringFunction(query);
                if (IsInNewRequest == "1")
                {

                    string _UpdateClause = "";
                    CPayables objCPayables = new CPayables();
                    _UpdateClause = "ChargeTypeID=" + pChargeTypeID  + "\n";
                    _UpdateClause += ",ExchangeRate=" + pExchangeRate  + "\n";
                    _UpdateClause += ",CurrencyID=" + pCurrencyID + " \n";
                    _UpdateClause += ",CategoryID=" + pCategoryID + " \n";
                    _UpdateClause += ",CostPrice=" + pCostPrice + " \n";
                    _UpdateClause += "WHERE ID=" + pID + "\n";
                    checkException = objCPayables.UpdateList(_UpdateClause);
                
                    if(checkException == null)
                    {
                        CA_PaymentRequestDetails cA_PaymentRequestDetails = new CA_PaymentRequestDetails();
                        _UpdateClause = "EstmatedCost=" + pCostPrice + "\n";
                        _UpdateClause += "WHERE PayableID=" + pID + "\n";
                        checkException = cA_PaymentRequestDetails.UpdateList(_UpdateClause);
                    }
                    //objCPayables.lstCVarPayables.Add(objCVarPayables);
                    //checkException = objCPayables.SaveMethod(objCPayables.lstCVarPayables);
                    if (checkException != null) // an exception is caught in the model
                    {
                        if (checkException.Message.Contains("UNIQUE"))
                            _result = false;
                    }
                    else //not unique
                        _result = true;

                    return new object[] { _result, msgReturned };
                }
                else { 
                
                
                DataTable dtdata = objCCustomizedDBCall.ExecuteQuery_DataTable(@"select Ct.Name from Operations O join Payables P on P.OperationID = O.ID  join ChargeTypes CT on CT.ID = P.ChargeTypeID
                where Not Exists(select 1 from ChargeTypeAccounts cha where cha.ChargeTypeID = " +  pChargeTypeID + //P.ChargeTypeID
               @" and cha.DirectionID = O.DirectionType
                 and cha.ServiceID = case WHEN O.TransportType = 2 THEN 3 --AIR
                WHEN O.TransportType = 1 AND O.ShipmentType = 1 THEN 1 --FCL
                WHEN O.TransportType = 1 AND O.ShipmentType IN(2, 5) THEN 2 --LCL               
                WHEN O.TransportType = 3 THEN 5 --Inland                
                WHEN O.DirectionType = 3 THEN 4 end --Domestic
                and cha.CategoryID = P.CategoryID and cha.ExpenseAccountID IS NOT NULL and cha.RevenueCostCenterID IS NOT NULL) And P.ID in (" + pID + ")");

                if (dtdata.Rows.Count > 0)
                {
                    msgReturned += "Payable is included in a payment request, check accounts for the selected category";
                    //for (int i = 0; i < dtdata.Rows.Count; i++)
                    //{
                    //    msgReturned += dtdata.Rows[i]["Name"].ToString() + " - ";
                    //}
                    return new object[] { _result, msgReturned };
                }
                
                
                }

            }


            if (objCDefaults.lstCVarDefaults[0].UnEditableCompanyName == "GBL" && pSupplierInvoiceNo != "0" && pSupplierInvoiceNo != "N/A")
                msgReturned = CheckSupplierInvoiceNumberUniqueness(pID/*, pSupplierOperationPartnerID*/, pSupplierInvoiceNo, pPartnerTypeID, pPartnerID, pCurrencyID);
            CPayables objCGetCreationInformation = new CPayables();
            CPayables objCPayables_CheckPosted = new CPayables();
            objCPayables_CheckPosted.GetListPaging(999999, 1, "WHERE IsApproved=0 AND ID=" + pID, "ID", out _RowCount);

            objCGetCreationInformation.GetItem(pID);

            CPurchasingInvoiceDetails objCPurchasingInvoiceDetails = new CPurchasingInvoiceDetails();
            objCPurchasingInvoiceDetails.GetList("where PayableID=" + pID);
            if (objCPurchasingInvoiceDetails.lstCVarPurchasingInvoiceDetails.Count > 0)
            {
                _result = false;
                msgReturned = "Payable In Purshase Invoice";
            }
           
            if (WebSecurity.CurrentUserName == "BISHOY DEIF" && msgReturned == "" && objCPayables_CheckPosted.lstCVarPayables.Count == 0)
            {
                checkException = objCPayables_CheckPosted.UpdateList("SupplierInvoiceNo=" + (pSupplierInvoiceNo == "0" ? "null" : ("N'" + pSupplierInvoiceNo + "'") + ",Notes= N'" + " updated by " + WebSecurity.CurrentUserName + " FROM ' + SupplierInvoiceNo ") + " WHERE ID=" + pID);
                if (checkException != null)
                    msgReturned = checkException.Message;
            }
            else
            if (msgReturned == "" && objCPayables_CheckPosted.lstCVarPayables.Count == 1)
            {
                CVarPayables objCVarPayables = new CVarPayables();
                //the next 4 lines to get the CreatorUserID and CreationDate and set them as they were entered before
                objCVarPayables.CreatorUserID = objCGetCreationInformation.lstCVarPayables[0].CreatorUserID;
                objCVarPayables.CreationDate = objCGetCreationInformation.lstCVarPayables[0].CreationDate;
                objCVarPayables.GeneratingQRID = objCGetCreationInformation.lstCVarPayables[0].GeneratingQRID;
                objCVarPayables.ApprovingUserID = objCGetCreationInformation.lstCVarPayables[0].ApprovingUserID;
                objCVarPayables.CustodyID = objCGetCreationInformation.lstCVarPayables[0].CustodyID;
                objCVarPayables.SupplierReceiptNo = objCGetCreationInformation.lstCVarPayables[0].SupplierReceiptNo;
                objCVarPayables.PaidAmount = objCGetCreationInformation.lstCVarPayables[0].PaidAmount;
                objCVarPayables.RemainingAmount = objCGetCreationInformation.lstCVarPayables[0].RemainingAmount;
                objCVarPayables.AccNoteID = objCGetCreationInformation.lstCVarPayables[0].AccNoteID;
                objCVarPayables.JVID = objCGetCreationInformation.lstCVarPayables[0].JVID;
                objCVarPayables.JVID2 = objCGetCreationInformation.lstCVarPayables[0].JVID2;

                if (objCDefaults.lstCVarDefaults[0].UnEditableCompanyName == "BED")
                    objCVarPayables.GeneratingQCID = objCGetCreationInformation.lstCVarPayables[0].GeneratingQCID;

                objCVarPayables.TransactionID = objCGetCreationInformation.lstCVarPayables[0].TransactionID;
                objCVarPayables.QuotationCost = IsMescoCompany ? pCostAmount : objCGetCreationInformation.lstCVarPayables[0].QuotationCost;
                objCVarPayables.IsNeglectLimit = objCGetCreationInformation.lstCVarPayables[0].IsNeglectLimit;
                objCVarPayables.OfficialAmountPaid = objCGetCreationInformation.lstCVarPayables[0].OfficialAmountPaid;
                objCVarPayables.PricingID = objCGetCreationInformation.lstCVarPayables[0].PricingID;
                objCVarPayables.OperationVehicleID = objCGetCreationInformation.lstCVarPayables[0].OperationVehicleID;
                objCVarPayables.IsApproved = objCGetCreationInformation.lstCVarPayables[0].IsApproved;
                if (pSavedFrom == 10)
                {
                    objCVarPayables.OperationContainersAndPackagesID = pOperationContainersAndPackagesID;
                    objCVarPayables.TruckingOrderID = pTruckingOrderID;
                }
                else
                {
                    objCVarPayables.OperationContainersAndPackagesID = objCGetCreationInformation.lstCVarPayables[0].OperationContainersAndPackagesID;
                    objCVarPayables.TruckingOrderID = objCGetCreationInformation.lstCVarPayables[0].TruckingOrderID;
                }
                objCVarPayables.ID = pID;
                objCVarPayables.OperationID = pOperationID;
                objCVarPayables.ChargeTypeID = pChargeTypeID;
                objCVarPayables.POrC = pPOrC;
                objCVarPayables.ContainerTypeID = pContainerTypeID;
                objCVarPayables.MeasurementID = pMeasurementID;
                objCVarPayables.SupplierOperationPartnerID = pSupplierOperationPartnerID;
                objCVarPayables.Quantity = pQuantity == 0 ? 1 : pQuantity;
                objCVarPayables.OldCostPrice = objCGetCreationInformation.lstCVarPayables[0].CostPrice != pCostPrice ? objCGetCreationInformation.lstCVarPayables[0].CostPrice : objCGetCreationInformation.lstCVarPayables[0].OldCostPrice;
                objCVarPayables.CostPrice = pCostPrice;
                objCVarPayables.OperationVehicleID = pOperationVehicleID;
                objCVarPayables.AmountWithoutVAT = pAmountWithoutVAT;
                objCVarPayables.TaxTypeID = pTaxTypeID;
                objCVarPayables.TaxPercentage = pTaxPercentage;
                objCVarPayables.TaxAmount = pTaxAmount;
                objCVarPayables.DiscountTypeID = pDiscountTypeID;
                objCVarPayables.DiscountPercentage = pDiscountPercentage;
                objCVarPayables.DiscountAmount = pDiscountAmount;
                if (pIsCredit)
                    objCVarPayables.CostAmount = pCostAmount; //From Credit Screen 

                else
                    objCVarPayables.CostAmount = pCostAmount; //total w VAT and Discount --was IsMescoCompany ? 0 : pCostAmount;
                objCVarPayables.InitialSalePrice = pInitialSalePrice;
                objCVarPayables.SupplierInvoiceNo = pSupplierInvoiceNo;
                objCVarPayables.SupplierReceiptNo = pSupplierReceiptNo;
                objCVarPayables.EntryDate = pEntryDate;
                objCVarPayables.BillID = pBillID;
                objCVarPayables.IssueDate = pIssueDate;

                objCVarPayables.ExchangeRate = pExchangeRate;
                objCVarPayables.CurrencyID = pCurrencyID;
                objCVarPayables.BillTo = pPayableBillTo;
                objCVarPayables.CategoryID = pCategoryID;
                objCVarPayables.Notes = (pNotes == null ? "" : pNotes);

                objCVarPayables.ModificatorUserID = WebSecurity.CurrentUserId;
                objCVarPayables.ModificationDate = DateTime.Now;

                objCVarPayables.SupplierSiteID = pSupplierSiteID;
                objCVarPayables.IsOfficial = pIsOfficial;
                objCVarPayables.IsQuotationApproval = false;
                objCVarPayables.crmCode = objCGetCreationInformation.lstCVarPayables[0].crmCode;
                objCVarPayables.IsPurchased = objCGetCreationInformation.lstCVarPayables[0].IsPurchased;

                CPayables objCPayables = new CPayables();
                objCPayables.lstCVarPayables.Add(objCVarPayables);
                checkException = objCPayables.SaveMethod(objCPayables.lstCVarPayables);
                if (checkException != null) // an exception is caught in the model
                {
                    if (checkException.Message.Contains("UNIQUE"))
                        _result = false;
                }
                else //not unique
                    _result = true;
            }
            else //msg related to SupplierInvoiceNo returned
                _result = false;
            #region  Alarm for case of payables from quotation has cost increased
            if (msgReturned == ""
                && objCGetCreationInformation.lstCVarPayables[0].QuotationCost != 0
                && pAmountWithoutVAT > objCGetCreationInformation.lstCVarPayables[0].QuotationCost
                && objCDefaults.lstCVarDefaults[0].UnEditableCompanyName != "BED")
            {
                string pAlarmReceiversIDs = "";
                string pSubject = "Payables Cost Increase";
                COperations objCOperations = new COperations();
                objCOperations.GetListPaging(999999, 1, "WHERE ID=" + pOperationID, "ID", out _RowCount);
                string pBody = "Operation (" + objCOperations.lstCVarOperations[0].Code + ")"
                    + " has one or more payables cost increase than what was specified in the quotation.";
                CUsers objCUsers = new CUsers();
                objCUsers.GetListPaging(999999, 1, "WHERE ID=" + objCOperations.lstCVarOperations[0].SalesmanID /*+ " AND ID<>" + WebSecurity.CurrentUserId*/, "ID", out _RowCount);
                if (objCUsers.lstCVarUsers.Count > 0)
                    for (int i = 0; i < objCUsers.lstCVarUsers.Count; i++)
                        pAlarmReceiversIDs += pAlarmReceiversIDs == "" ? objCUsers.lstCVarUsers[i].ID.ToString() : ("," + objCUsers.lstCVarUsers[i].ID);
                if (pAlarmReceiversIDs != "")
                    SendAlarmWithMinimalData(pAlarmReceiversIDs, pSubject, pBody);
            }
            #endregion  Alarm for case of payables from quotation has cost increased

            #region Tax
            CPayablesTAX objCGetCreationInformationTax = new CPayablesTAX();
            CChargeTypes objCChargeTypes = new CChargeTypes();
            CChargeTypesTAX objCChargeTypesTAX = new CChargeTypesTAX();

            Int32 ChargeTypeID = 0;
            string OperationID = "";
            string PayableID = "";
            int _RowCount2 = 0;
            Int32 supID = 0;
            Int32 supGroupID = 0;
            Int32 AccountID = 0;


            CvwDefaults objCvwDefaults = new CvwDefaults();
            objCvwDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount2); //i am sure i ve just one row isa
            string CompanyName = objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName;
            if ((CompanyName == "CHM" || CompanyName == "OCE" || CompanyName == "TRM") && checkException == null)
            {
                objCChargeTypes.GetList("WHERE ID=" + pChargeTypeID);
                objCChargeTypesTAX.GetList("WHERE Name=N'" + (objCChargeTypes.lstCVarChargeTypes.Count > 0 ? objCChargeTypes.lstCVarChargeTypes[0].Name : "") + "'");
                ChargeTypeID = objCChargeTypesTAX.lstCVarChargeTypes.Count > 0 ? objCChargeTypesTAX.lstCVarChargeTypes[0].ID : 0;

                if (CompanyName == "CHM")
                {
                    OperationID = objCCustomizedDBCall.CallStringFunctionByMultiReturn("select top 1 TaxID from ForwardingTransChemTax.dbo.TaxLink WHERE Notes='Operations' and OriginID = " + pOperationID);
                    PayableID = objCCustomizedDBCall.CallStringFunctionByMultiReturn("select top 1 TaxID from ForwardingTransChemTax.dbo.TaxLink WHERE Notes='Payables' and OriginID = " + pID);
                }
                else if (CompanyName == "OCE")
                {
                    OperationID = objCCustomizedDBCall.CallStringFunctionByMultiReturn("select top 1 TaxID from ForwardingTROTax.dbo.TaxLink WHERE Notes='Operations' and OriginID = " + pOperationID);
                    PayableID = objCCustomizedDBCall.CallStringFunctionByMultiReturn("select top 1 TaxID from ForwardingTROTax.dbo.TaxLink WHERE Notes='Payables' and OriginID = " + pID);
                }
                else if (CompanyName == "TRM")
                {
                    OperationID = objCCustomizedDBCall.CallStringFunctionByMultiReturn("select top 1 TaxID from ForwardingTransMasirTax.dbo.TaxLink WHERE Notes='Operations' and OriginID = " + pOperationID);
                    PayableID = objCCustomizedDBCall.CallStringFunctionByMultiReturn("select top 1 TaxID from ForwardingTransMasirTax.dbo.TaxLink WHERE Notes='Payables' and OriginID = " + pID);
                }
                if (OperationID != "" && PayableID != "")
                {
                    CPayablesTAX objCPayables_CheckPostedTax = new CPayablesTAX();
                    objCPayables_CheckPostedTax.GetListPaging(999999, 1, "WHERE IsApproved=0 AND ID=" + PayableID, "ID", out _RowCount);


                    objCGetCreationInformationTax.GetItem(int.Parse(PayableID));
                    if (WebSecurity.CurrentUserName == "BISHOY DEIF" && msgReturned == "" && objCPayables_CheckPostedTax.lstCVarPayables.Count == 0)
                    {
                        checkException = objCPayables_CheckPostedTax.UpdateList("SupplierInvoiceNo=" + (pSupplierInvoiceNo == "0" ? "null" : ("N'" + pSupplierInvoiceNo + "'") + ",Notes= N'" + " updated by " + WebSecurity.CurrentUserName + " FROM ' + SupplierInvoiceNo ") + " WHERE ID=" + pID);
                        if (checkException != null)
                            msgReturned = checkException.Message;
                    }
                    else
                    if (msgReturned == "" && objCPayables_CheckPostedTax.lstCVarPayables.Count == 1)
                    {
                        CTaxLink objCTaxLinOperationPartners = new CTaxLink();
                        objCTaxLinOperationPartners.GetList("WHERE Notes='OperationPartners' and OriginID<>0 and OriginID=" + pSupplierOperationPartnerID);

                        CTaxLink objCTaxLinOperationPartnersBillTo = new CTaxLink();
                        objCTaxLinOperationPartnersBillTo.GetList("WHERE Notes='OperationPartners' and OriginID<>0 and OriginID=" + pPayableBillTo);

                        CVarPayablesTAX objCVarPayablesTax = new CVarPayablesTAX();
                        //the next 4 lines to get the CreatorUserID and CreationDate and set them as they were entered before
                        objCVarPayablesTax.CreatorUserID = objCGetCreationInformationTax.lstCVarPayables[0].CreatorUserID;
                        objCVarPayablesTax.CreationDate = objCGetCreationInformationTax.lstCVarPayables[0].CreationDate;
                        objCVarPayablesTax.GeneratingQRID = 0;// objCGetCreationInformationTax.lstCVarPayables[0].GeneratingQRID;
                        objCVarPayablesTax.ApprovingUserID = objCGetCreationInformationTax.lstCVarPayables[0].ApprovingUserID;
                        objCVarPayablesTax.CustodyID = objCGetCreationInformationTax.lstCVarPayables[0].CustodyID;
                        objCVarPayablesTax.SupplierReceiptNo = objCGetCreationInformationTax.lstCVarPayables[0].SupplierReceiptNo;
                        objCVarPayablesTax.PaidAmount = objCGetCreationInformationTax.lstCVarPayables[0].PaidAmount;
                        objCVarPayablesTax.RemainingAmount = objCGetCreationInformationTax.lstCVarPayables[0].RemainingAmount;
                        objCVarPayablesTax.AccNoteID = objCGetCreationInformationTax.lstCVarPayables[0].AccNoteID;
                        objCVarPayablesTax.JVID = objCGetCreationInformationTax.lstCVarPayables[0].JVID;
                        objCVarPayablesTax.JVID2 = objCGetCreationInformationTax.lstCVarPayables[0].JVID2;
                        objCVarPayablesTax.TransactionID = objCGetCreationInformationTax.lstCVarPayables[0].TransactionID;
                        objCVarPayablesTax.QuotationCost = objCGetCreationInformationTax.lstCVarPayables[0].QuotationCost;
                        objCVarPayablesTax.IsNeglectLimit = objCGetCreationInformationTax.lstCVarPayables[0].IsNeglectLimit;
                        objCVarPayablesTax.OfficialAmountPaid = objCGetCreationInformationTax.lstCVarPayables[0].OfficialAmountPaid;
                        objCVarPayablesTax.PricingID = objCGetCreationInformationTax.lstCVarPayables[0].PricingID;
                        objCVarPayablesTax.OperationVehicleID = objCGetCreationInformationTax.lstCVarPayables[0].OperationVehicleID;
                        objCVarPayablesTax.IsApproved = objCGetCreationInformationTax.lstCVarPayables[0].IsApproved;
                        if (pSavedFrom == 10)
                        {
                            objCVarPayablesTax.OperationContainersAndPackagesID = pOperationContainersAndPackagesID;
                            objCVarPayablesTax.TruckingOrderID = pTruckingOrderID;
                        }
                        else
                        {
                            objCVarPayablesTax.OperationContainersAndPackagesID = objCGetCreationInformation.lstCVarPayables[0].OperationContainersAndPackagesID;
                            objCVarPayablesTax.TruckingOrderID = objCGetCreationInformation.lstCVarPayables[0].TruckingOrderID;
                        }
                        objCVarPayablesTax.ID = int.Parse(PayableID);
                        objCVarPayablesTax.OperationID = int.Parse(OperationID);
                        objCVarPayablesTax.ChargeTypeID = ChargeTypeID;
                        objCVarPayablesTax.POrC = pPOrC;
                        objCVarPayablesTax.ContainerTypeID = pContainerTypeID;
                        objCVarPayablesTax.MeasurementID = pMeasurementID;
                        objCVarPayablesTax.SupplierOperationPartnerID = objCTaxLinOperationPartners.lstCVarTaxLink.Count > 0 ? objCTaxLinOperationPartners.lstCVarTaxLink[0].TaxID : 0;
                        objCVarPayablesTax.Quantity = pQuantity == 0 ? 1 : pQuantity;
                        objCVarPayablesTax.CostPrice = pCostPrice;

                        objCVarPayablesTax.AmountWithoutVAT = pAmountWithoutVAT;
                        objCVarPayablesTax.TaxTypeID = pTaxTypeID;
                        objCVarPayablesTax.TaxPercentage = pTaxPercentage;
                        objCVarPayablesTax.TaxAmount = pTaxAmount;
                        objCVarPayablesTax.DiscountTypeID = pDiscountTypeID;
                        objCVarPayablesTax.DiscountPercentage = pDiscountPercentage;
                        objCVarPayablesTax.DiscountAmount = pDiscountAmount;

                        objCVarPayablesTax.CostAmount = pCostAmount; //total w VAT and Discount
                        objCVarPayablesTax.InitialSalePrice = pInitialSalePrice;
                        objCVarPayablesTax.SupplierInvoiceNo = pSupplierInvoiceNo;
                        objCVarPayablesTax.SupplierReceiptNo = pSupplierReceiptNo;
                        objCVarPayablesTax.EntryDate = pEntryDate;
                        objCVarPayablesTax.BillID = pBillID;
                        objCVarPayablesTax.IssueDate = pIssueDate;

                        objCVarPayablesTax.ExchangeRate = pExchangeRate;
                        objCVarPayablesTax.CurrencyID = pCurrencyID;
                        objCVarPayablesTax.BillTo = objCTaxLinOperationPartnersBillTo.lstCVarTaxLink.Count > 0 ? objCTaxLinOperationPartnersBillTo.lstCVarTaxLink[0].TaxID : 0; ;
                        objCVarPayablesTax.Notes = (pNotes == null ? "" : pNotes);

                        objCVarPayablesTax.ModificatorUserID = WebSecurity.CurrentUserId;
                        objCVarPayablesTax.ModificationDate = DateTime.Now;

                        objCVarPayablesTax.SupplierSiteID = pSupplierSiteID;

                        CPayablesTAX objCPayablesTax = new CPayablesTAX();
                        objCPayablesTax.lstCVarPayables.Add(objCVarPayablesTax);
                        checkException = objCPayablesTax.SaveMethod(objCPayablesTax.lstCVarPayables);
                        if (checkException != null) // an exception is caught in the model
                        {
                            if (checkException.Message.Contains("UNIQUE"))
                                _result = false;
                        }
                        else //not unique
                            _result = true;
                    }
                    else //msg related to SupplierInvoiceNo returned
                        _result = false;
                    #region  Alarm for case of payables from quotation has cost increased
                    if (msgReturned == ""
                        && objCGetCreationInformation.lstCVarPayables[0].QuotationCost != 0
                        && pAmountWithoutVAT > objCGetCreationInformation.lstCVarPayables[0].QuotationCost
                        && objCDefaults.lstCVarDefaults[0].UnEditableCompanyName != "BED")
                    {
                        string pAlarmReceiversIDs = "";
                        string pSubject = "Payables Cost Increase";
                        COperationsTAX objCOperationsTax = new COperationsTAX();
                        objCOperationsTax.GetListPaging(999999, 1, "WHERE ID=" + pOperationID, "ID", out _RowCount);
                        string pBody = "Operation (" + objCOperationsTax.lstCVarOperations[0].Code + ")"
                            + " has one or more payables cost increase than what was specified in the quotation.";
                        CUsers objCUsers = new CUsers();
                        objCUsers.GetListPaging(999999, 1, "WHERE ID=" + objCOperationsTax.lstCVarOperations[0].SalesmanID /*+ " AND ID<>" + WebSecurity.CurrentUserId*/, "ID", out _RowCount);
                        if (objCUsers.lstCVarUsers.Count > 0)
                            for (int i = 0; i < objCUsers.lstCVarUsers.Count; i++)
                                pAlarmReceiversIDs += pAlarmReceiversIDs == "" ? objCUsers.lstCVarUsers[i].ID.ToString() : ("," + objCUsers.lstCVarUsers[i].ID);
                        if (pAlarmReceiversIDs != "")
                            SendAlarmWithMinimalData(pAlarmReceiversIDs, pSubject, pBody);
                    }
                    #endregion  Alarm for case of payables from quotation has cost increased
                }

            }

            #endregion

            if (_result && objCDefaults.lstCVarDefaults[0].UnEditableCompanyName == "MED" && pQuotationRouteID > 0)
            {
                CQuotationRoute objCQuotationRoute = new CQuotationRoute();
                var ex = objCQuotationRoute.UpdateList($" IsChargeEditApprovalRequested = 0, ChargeEditApprovalLevel = 0, ChargeEdit1stApprovalUserID = NULL, ChargeEdit2ndApprovalUserID = NULL, ChargeEdit3rdApprovalUserID = NULL, ChargeEdit4thApprovalUserID = NULL where ID = {pQuotationRouteID}");
            }
            /*if (_result && objCDefaults.lstCVarDefaults[0].UnEditableCompanyName == "COS")
            {
                var ex = objCA_PaymentRequestDetails.UpdateList($"EstmatedCost={pCostPrice} where OperationID={pOperationID} and (PayableID={pID} or ChargeTypeID={pChargeTypeID})");
            }*/
            return new object[] { _result, msgReturned };
        }

        [HttpGet, HttpPost]
        public object[] UpdateChargeType( Int64 pID, Int64 pOperationID, Int32 pChargeTypeID)
        {
            bool _result = false;
            string msgReturned = "";
            int _RowCount = 0;
            Exception checkException = null;
            CDefaults objCDefaults = new CDefaults();
            objCDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount);
            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
            string[] MescoCompanies = new string[5] { "MES", "SAC", "GLO", "EUR", "ALT" };
            bool IsMescoCompany = MescoCompanies.Contains(objCDefaults.lstCVarDefaults[0].UnEditableCompanyName);
            CA_PaymentRequestDetails objCA_PaymentRequestDetails = new CA_PaymentRequestDetails();
            objCA_PaymentRequestDetails.GetList($"WHERE PayableID = {pID}");

            if (IsMescoCompany )
            {
                DataTable dtdata = objCCustomizedDBCall.ExecuteQuery_DataTable(@"select Ct.Name from Operations O join Payables P on P.OperationID = O.ID  join ChargeTypes CT on CT.ID = P.ChargeTypeID
                where Not Exists(select 1 from ChargeTypeAccounts cha where cha.ChargeTypeID = " + pChargeTypeID + //P.ChargeTypeID
               @" and cha.DirectionID = O.DirectionType
                 and cha.ServiceID = case WHEN O.TransportType = 2 THEN 3 --AIR
                WHEN O.TransportType = 1 AND O.ShipmentType = 1 THEN 1 --FCL
                WHEN O.TransportType = 1 AND O.ShipmentType IN(2, 5) THEN 2 --LCL               
                WHEN O.TransportType = 3 THEN 5 --Inland                
                WHEN O.DirectionType = 3 THEN 4 end --Domestic
                and cha.CategoryID = P.CategoryID and cha.ExpenseAccountID IS NOT NULL and cha.RevenueCostCenterID IS NOT NULL) And P.ID in (" + pID + ")");

                if (dtdata.Rows.Count > 0)
                {
                    msgReturned += "Payable is included in a payment request, check accounts for the selected category";
                    return new object[] { _result, msgReturned };
                }
            }



            if (msgReturned == "" )
            {

                //@ID bigint,@OperationID bigint,@ChargeTypeID int,@UserID int
                checkException=  objCCustomizedDBCall.CallProcFunction("UpdateItemPayableByID " + pID + "," + pOperationID + "," + pChargeTypeID + "," + WebSecurity.CurrentUserId);

                if (checkException != null) // an exception is caught in the model
                {
                    if (checkException.Message.Contains("UNIQUE"))
                        _result = false;
                }
                else //not unique
                    _result = true;
            }
            else //msg related to SupplierInvoiceNo returned
                _result = false;



            return new object[] { _result, msgReturned };
        }


        [HttpGet, HttpPost]
        public object[] UpdateApprovedPayable(Int64 pApprovedPayableID, string pSupplierInvoiceNo)
        {
            string msgReturned = "";
            Exception checkException = null;
            CPayables objCPayables = new CPayables();
            checkException = objCPayables.UpdateList("SupplierInvoiceNo = " + (pSupplierInvoiceNo == "0" ? "null" : ("N'" + pSupplierInvoiceNo + "'")) + ", Notes = N'" + " updated by " + WebSecurity.CurrentUserName + "' WHERE ID = " + pApprovedPayableID);
            if (checkException != null)
                msgReturned = checkException.Message;
            return new object[]
            {
                msgReturned
            };
        }

        [HttpGet, HttpPost]
        public object[] SetIsPurchasedPayable([FromBody] SetIsPurchased setIsPurchasedParameters)// Int64 pPayableID, bool pIsPurchased
        {
            int IsPurchased = 0;
            if (setIsPurchasedParameters.pIsPurchased)
            {
                IsPurchased = 1;
            }
            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
            string updateQuery = "UPDATE Payables SET IsPurchased = " + IsPurchased + " WHERE Id =" + setIsPurchasedParameters.pID;

            objCCustomizedDBCall.ExecuteQuery(updateQuery);
            return new object[] { };
        }

        [HttpGet, HttpPost]
        public object[] UpdateCost_RealTime(Int64 pPayableID_UpdateCost, decimal pCostPrice, decimal pQuantity)
        {
            string _ReturnedMessage = "";
            Exception checkException = null;
            string _UpdateClause = "";
            int _RowCount = 0;
            CPayables objCPayables = new CPayables();

            _UpdateClause = "CostPrice=ROUND(" + pCostPrice + " ,2)" + "\n";
            _UpdateClause += ",Quantity=ROUND(" + pQuantity + " ,2)" + "\n";
            _UpdateClause += ",AmountWithoutVAT=ROUND(" + (pCostPrice * pQuantity) + " ,2)" + " \n";
            _UpdateClause += "WHERE ID=" + pPayableID_UpdateCost + "\n";
            checkException = objCPayables.UpdateList(_UpdateClause);

            #region ensure payables are correct
            _UpdateClause = " TaxPercentage = (select TT.CurrentPercentage FROM TaxeTypes TT WHERE TT.ID = TaxTypeID)" + " \n";
            _UpdateClause += " , TaxAmount = ROUND((ISNULL(CostPrice, 0) * ISNULL(Quantity, 1)),2) * (select TT.CurrentPercentage/100 FROM TaxeTypes TT WHERE TT.ID = TaxTypeID)" + " \n";
            _UpdateClause += " , DiscountPercentage = (select TT.CurrentPercentage FROM TaxeTypes TT WHERE TT.ID = DiscountTypeID)" + " \n";
            _UpdateClause += " , DiscountAmount = ROUND((ISNULL(CostPrice, 0) * ISNULL(Quantity, 1)),2) * (select TT.CurrentPercentage/100 FROM TaxeTypes TT WHERE TT.ID = DiscountTypeID)" + " \n";
            _UpdateClause += " , CostAmount = ROUND((ISNULL(CostPrice, 0) * ISNULL(Quantity, 1)),2)" + " \n"
                           + " + (ROUND((ISNULL(CostPrice, 0) * ISNULL(Quantity, 1)), 2) * ISNULL((select ISNULL(TT.CurrentPercentage / 100, 0) FROM TaxeTypes TT WHERE TT.ID = TaxTypeID),0))" + " \n"
                           + " - (ROUND((ISNULL(CostPrice, 0) * ISNULL(Quantity, 1)), 2) * ISNULL((select ISNULL(TT.CurrentPercentage / 100, 0) FROM TaxeTypes TT WHERE TT.ID = DiscountTypeID),0))" + " \n";
            _UpdateClause += "WHERE ID=" + pPayableID_UpdateCost + "\n";
            checkException = objCPayables.UpdateList(_UpdateClause);
            #endregion ensure payables are correct
            if (checkException != null)
                _ReturnedMessage = checkException.Message;
            else
            {
                checkException = objCPayables.GetListPaging(999999, 1, "WHERE ID=" + pPayableID_UpdateCost, "ID", out _RowCount);
            }
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[]
            {
                _ReturnedMessage
                , serializer.Serialize(objCPayables.lstCVarPayables[0]) //pData[1]
            };
        }

        //[HttpGet, HttpPost]
        public static object[] SendAlarmWithMinimalData(string pAlarmReceiversIDs, string pSubject, string pBody)
        {
            Exception checkException = null;
            string _MessageReturned = "";
            //int _RowCount = 0;

            #region Sending Alarm
            if (pAlarmReceiversIDs != null)
            {
                CVarEmail objCVarEmail = new CVarEmail();
                CEmail objCEmail = new CEmail();
                CEmailReceiver objCEmailReceiver = new CEmailReceiver();
                objCVarEmail.Subject = pSubject;
                objCVarEmail.Body = pBody;
                objCVarEmail.QuotationRouteID = 0;
                objCVarEmail.SenderUserID = WebSecurity.CurrentUserId;
                objCVarEmail.SendingDate = DateTime.Now;
                objCEmail.lstCVarEmail.Add(objCVarEmail);
                checkException = objCEmail.SaveMethod(objCEmail.lstCVarEmail);
                if (checkException == null) //add to EmailReceivers
                {
                    var pArrayOfReceiversIDs = pAlarmReceiversIDs.Split(',');
                    var NoOfReceivers = pArrayOfReceiversIDs.Length;
                    for (int i = 0; i < NoOfReceivers; i++)
                    {
                        CVarEmailReceiver objCVarEmailReceiver = new CVarEmailReceiver();
                        objCVarEmailReceiver.EmailID = objCVarEmail.ID;
                        objCVarEmailReceiver.ReceiverUserID = int.Parse(pArrayOfReceiversIDs[i]);
                        objCVarEmailReceiver.ReceivingDate = DateTime.Parse("01-01-1900");
                        objCVarEmailReceiver.IsAlarm = true;

                        objCEmailReceiver.lstCVarEmailReceiver.Add(objCVarEmailReceiver);
                    }
                    checkException = objCEmailReceiver.SaveMethod(objCEmailReceiver.lstCVarEmailReceiver);
                }
            }
            #endregion Sending Alarm

            return new object[]
            {
                _MessageReturned
            };
        }

        [HttpGet, HttpPost]
        public object[] CopyPayable(Int64 pPayableIDToCopy, Int32 pNumberOfDuplicates)
        {
            CvwPayables objCvwPayables = new CvwPayables();
            CPayables objCPayables = new CPayables();
            Int64 pOperationID = 0;
            int _RowCount = 0;
            objCvwPayables.GetListPaging(999999, 1, "WHERE ID=" + pPayableIDToCopy, "ID", out _RowCount);
            pOperationID = objCvwPayables.lstCVarvwPayables[0].OperationID;
            for (int i = 0; i < pNumberOfDuplicates; i++)
            {
                CVarPayables objCVarPayables = new CVarPayables();
                objCVarPayables.OperationID = objCvwPayables.lstCVarvwPayables[0].OperationID;
                objCVarPayables.ChargeTypeID = objCvwPayables.lstCVarvwPayables[0].ChargeTypeID;
                objCVarPayables.POrC = objCvwPayables.lstCVarvwPayables[0].POrC;
                objCVarPayables.SupplierOperationPartnerID = objCvwPayables.lstCVarvwPayables[0].SupplierOperationPartnerID;
                objCVarPayables.ContainerTypeID = objCvwPayables.lstCVarvwPayables[0].ContainerTypeID;
                objCVarPayables.MeasurementID = objCvwPayables.lstCVarvwPayables[0].MeasurementID;
                objCVarPayables.Quantity = objCvwPayables.lstCVarvwPayables[0].Quantity == 0 ? 1 : objCvwPayables.lstCVarvwPayables[0].Quantity;
                objCVarPayables.CostPrice = objCvwPayables.lstCVarvwPayables[0].CostPrice;
                objCVarPayables.AmountWithoutVAT = objCvwPayables.lstCVarvwPayables[0].AmountWithoutVAT;
                objCVarPayables.TaxTypeID = objCvwPayables.lstCVarvwPayables[0].TaxTypeID;
                objCVarPayables.TaxPercentage = objCvwPayables.lstCVarvwPayables[0].TaxPercentage;
                objCVarPayables.TaxAmount = objCvwPayables.lstCVarvwPayables[0].TaxAmount;
                objCVarPayables.DiscountTypeID = objCvwPayables.lstCVarvwPayables[0].DiscountTypeID;
                objCVarPayables.DiscountPercentage = objCvwPayables.lstCVarvwPayables[0].DiscountPercentage;
                objCVarPayables.DiscountAmount = objCvwPayables.lstCVarvwPayables[0].DiscountAmount;
                objCVarPayables.CostAmount = objCvwPayables.lstCVarvwPayables[0].CostAmount;
                objCVarPayables.PaidAmount = objCvwPayables.lstCVarvwPayables[0].PaidAmount;
                objCVarPayables.RemainingAmount = objCvwPayables.lstCVarvwPayables[0].RemainingAmount;
                objCVarPayables.InitialSalePrice = objCvwPayables.lstCVarvwPayables[0].InitialSalePrice;
                objCVarPayables.SupplierInvoiceNo = "0";
                objCVarPayables.EntryDate = objCvwPayables.lstCVarvwPayables[0].EntryDate;
                objCVarPayables.ExchangeRate = objCvwPayables.lstCVarvwPayables[0].ExchangeRate;
                objCVarPayables.CurrencyID = objCvwPayables.lstCVarvwPayables[0].CurrencyID;
                objCVarPayables.GeneratingQRID = 0;
                objCVarPayables.Notes = "COPY";
                objCVarPayables.CustodyID = objCvwPayables.lstCVarvwPayables[0].CustodyID;
                objCVarPayables.SupplierReceiptNo = "0";
                objCVarPayables.AccNoteID = 0;
                objCVarPayables.IsDeleted = false;
                objCVarPayables.IsApproved = false;
                objCVarPayables.ApprovingUserID = 0;
                objCVarPayables.CreatorUserID = objCVarPayables.ModificatorUserID = WebSecurity.CurrentUserId;
                objCVarPayables.CreationDate = objCVarPayables.ModificationDate = DateTime.Now;
                objCVarPayables.JVID = 0;
                objCVarPayables.BillTo = objCvwPayables.lstCVarvwPayables[0].BillTo;
                objCVarPayables.ReceivableID = 0;
                objCVarPayables.IssueDate = DateTime.Now;
                objCVarPayables.IsOfficial = false;
                objCVarPayables.IsQuotationApproval = false;
                objCVarPayables.crmCode = "";
                objCVarPayables.IsPurchased = false;

                objCVarPayables.CategoryID = objCvwPayables.lstCVarvwPayables[0].CategoryID;
                objCPayables.lstCVarPayables.Add(objCVarPayables);
            }
            objCPayables.SaveMethod(objCPayables.lstCVarPayables);

            objCvwPayables.GetListPaging(999999, 1, "WHERE IsDeleted=0 AND (OperationID=" + pOperationID + " OR MasterOperationID=" + pOperationID + ")", "ViewOrder,ChargeTypeName", out _RowCount);

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                serializer.Serialize(objCvwPayables.lstCVarvwPayables)
            };
        }

        [HttpGet, HttpPost]
        public object[] AddSelectedPricingCharges(Int64 pOperationID, string pSelectedPricingIDs, Int32 pProfitType, decimal pProfitAmount)
        {
            Exception checkException = null;
            int _RowCount = 0;
            CPricing objCPricing = new CPricing();
            CPricingCharge objCPricingCharge = new CPricingCharge();
            CPayables objCPayables = new CPayables();
            CvwPayables objCvwPayables = new CvwPayables();

            int constPricingOcean = 10;
            int constPricingAir = 20;
            int constPricingInland = 30;
            int constPricingCustomsClearance = 40;
            //int constPricingGeneral = 50;
            var constCustomsClearanceAgentOperationPartnerTypeID = 8;
            var constShippingLineOperationPartnerTypeID = 9;
            var constAirineOperationPartnerTypeID = 10;
            var constTruckerOperationPartnerTypeID = 11;

            checkException = objCPricing.GetListPaging(99999, 1, ("WHERE ID IN (" + pSelectedPricingIDs + ")"), "ID", out _RowCount);
            foreach (var rowPricing in objCPricing.lstCVarPricing)
            {
                CvwCurrencies objCvwCurrencies = new CvwCurrencies();
                objCvwCurrencies.GetList("WHERE ID=" + rowPricing.CurrencyID);
                checkException = objCPricingCharge.GetListPaging(99999, 1, ("WHERE (ISNULL(CostPrice,0)<>0 OR ISNULL(SalePrice,0)<>0) AND ChargeTypeID IN (SELECT ChargeTypeID FROM PricingSettings WHERE PricingTypeID=" + rowPricing.PricingTypeID + ") AND PricingID = " + rowPricing.ID), "ID", out _RowCount);
                foreach (var rowPricingCharge in objCPricingCharge.lstCVarPricingCharge)
                {
                    decimal decSalePrice = 0;
                    decimal decCostPrice = rowPricingCharge.CostPrice;
                    decSalePrice = pProfitType == 10
                                                ? (decCostPrice * pProfitAmount / 100 + decCostPrice) //percentge
                                                : (decCostPrice + pProfitAmount);

                    CPayables objCPayables_Temp = new CPayables();
                    checkException = objCPayables_Temp.GetListPaging(999999, 1, "WHERE (CostAmount=0 OR CostAmount IS NULL) AND OperationID=" + pOperationID + " AND ChargeTypeID=" + rowPricingCharge.ChargeTypeID, "ID", out _RowCount);
                    #region Update Payables
                    if (objCPayables_Temp.lstCVarPayables.Count > 0)
                    {
                        for (int i = 0; i < objCPayables_Temp.lstCVarPayables.Count; i++)
                        {
                            checkException = objCPayables_Temp.UpdateList(
                                "Quantity=1" + " \n"
                                + ",CostPrice=" + decCostPrice + " \n"
                                + ",CostAmount=" + decCostPrice + " \n"
                                + ",InitialSalePrice=" + decSalePrice + " \n"
                            + " WHERE ID=" + objCPayables_Temp.lstCVarPayables[i].ID);
                        }
                    }
                    #endregion Update Payables
                    #region New Payable
                    else
                    {
                        CVarPayables objCVarPayables = new CVarPayables();
                        objCVarPayables.OperationID = pOperationID;
                        objCVarPayables.ChargeTypeID = rowPricingCharge.ChargeTypeID;
                        objCVarPayables.MeasurementID = 3; //fixed

                        objCVarPayables.Quantity = 1;
                        objCVarPayables.CostPrice = decCostPrice;
                        objCVarPayables.CostAmount = decCostPrice;
                        objCVarPayables.CurrencyID = rowPricing.CurrencyID;
                        objCVarPayables.ExchangeRate = objCvwCurrencies.lstCVarvwCurrencies[0].CurrentExchangeRate;

                        objCVarPayables.InitialSalePrice = decSalePrice; //coz sale is not entered here

                        //if (rowPricing.PricingTypeID == constPricingAir)
                        //{
                        //    objCVarPayables.OperationPartnerTypeID = constAirineOperationPartnerTypeID;
                        //    objCVarPayables.AirlineID = rowPricing.AirlineID;
                        //}
                        //else if (rowPricing.PricingTypeID == constPricingOcean)
                        //{
                        //    objCVarPayables.OperationPartnerTypeID = constShippingLineOperationPartnerTypeID;
                        //    objCVarPayables.ShippingLineID = rowPricing.ShippingLineID;
                        //}
                        //else if (rowPricing.PricingTypeID == constPricingInland)
                        //{
                        //    objCVarPayables.OperationPartnerTypeID = constTruckerOperationPartnerTypeID;
                        //    objCVarPayables.TruckerID = rowPricing.TruckerID;
                        //}
                        //else if (rowPricing.PricingTypeID == constPricingCustomsClearance)
                        //{
                        //    objCVarPayables.OperationPartnerTypeID = constCustomsClearanceAgentOperationPartnerTypeID;
                        //    objCVarPayables.CustomsClearanceAgentID = rowPricing.CCAID;
                        //}

                        objCVarPayables.SupplierInvoiceNo = "0";
                        objCVarPayables.SupplierReceiptNo = "0";
                        objCVarPayables.EntryDate = DateTime.Now;
                        objCVarPayables.IssueDate = DateTime.Now;

                        objCVarPayables.ContainerTypeID = rowPricing.EquipmentID;
                        objCVarPayables.PricingID = rowPricing.ID;
                        objCVarPayables.Notes = "0";
                        objCVarPayables.IsOfficial = false;
                        objCVarPayables.IsQuotationApproval = false;
                        objCVarPayables.crmCode = "";
                        objCVarPayables.IsPurchased = false;

                        objCVarPayables.CreatorUserID = objCVarPayables.ModificatorUserID = WebSecurity.CurrentUserId;
                        objCVarPayables.CreationDate = objCVarPayables.ModificationDate = DateTime.Now;

                        objCPayables.lstCVarPayables.Add(objCVarPayables);
                        checkException = objCPayables.SaveMethod(objCPayables.lstCVarPayables);
                    }
                    #endregion New Payable
                }
            }
            //checkException = objCvwPayables.GetListPaging(99999, 1, "WHERE OperationID=" + pOperationID, "ID", out _RowCount);
            return new object[] {
                    //new JavaScriptSerializer().Serialize(objCvwPayables.lstCVarvwPayables)
            };
        }

        [HttpGet, HttpPost]
        public string CheckSupplierInvoiceNumberUniqueness(Int64 pID/*, Int64 pSupplierOperationPartnerID*/, String pSupplierInvoiceNo, int pPartnerTypeID, int pPartnerID, int pCurrencyID)
        {
            string msgReturned = "";
            int _RowCount = 0;
            CPayables objCPayables = new CPayables();
            objCPayables.GetListPaging(1, 1, "WHERE ID=" + pID, "ID", out _RowCount);

            CvwPayables objCvwPayables = new CvwPayables();
            string pWhereClause = "";
            pWhereClause += " WHERE (OperationID <> " + objCPayables.lstCVarPayables[0].OperationID + " \n"; //to allow repeating on same operation
            pWhereClause += " AND SupplierInvoiceNo = '" + pSupplierInvoiceNo + "'" + " \n";
            pWhereClause += " AND SupplierPartnerTypeID = " + pPartnerTypeID.ToString() + " \n"; ;
            pWhereClause += " AND PartnerSupplierID = " + pPartnerID.ToString() + " \n"; ;
            pWhereClause += " AND Year(IssueDate) = '" + objCPayables.lstCVarPayables[0].IssueDate.Year + "'" + " \n";
            pWhereClause += " AND ID <> " + pID + " \n";
            pWhereClause += ")" + " \n";
            pWhereClause += " OR (OperationID = " + objCPayables.lstCVarPayables[0].OperationID + " \n";
            pWhereClause += " AND SupplierInvoiceNo = '" + pSupplierInvoiceNo + "'" + " \n";
            pWhereClause += " AND SupplierPartnerTypeID = " + pPartnerTypeID.ToString() + " \n"; ;
            pWhereClause += " AND PartnerSupplierID = " + pPartnerID.ToString() + " \n"; ;
            pWhereClause += " AND CurrencyID <> '" + pCurrencyID + "'" + " \n";
            pWhereClause += " AND ID <> " + pID + " \n";
            pWhereClause += ")" + " \n";

            objCvwPayables.GetListPaging(3000, 1, pWhereClause, "ID", out _RowCount);

            if (objCvwPayables.lstCVarvwPayables.Count > 0)
                msgReturned = "Supplier Inv. '" + pSupplierInvoiceNo + "' is repeated for " + objCvwPayables.lstCVarvwPayables[0].PartnerSupplierName + " in Operation " + objCvwPayables.lstCVarvwPayables[0].OperationCode + ".";
            return msgReturned;
        }

        [HttpGet, HttpPost]
        public bool Delete(String pPayablesIDs, Int64 pOperationID)
        {
            bool _result = false;
            Exception checkException = null;
            CPayables objCPayables = new CPayables();
            COperationLog objCOperationLog = new COperationLog();
            int _RowCount2 = 0;

            CvwDefaults objCvwDefaults = new CvwDefaults();
            objCvwDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount2); //i am sure i ve just one row isa
            string CompanyName = objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName;

            foreach (var currentID in pPayablesIDs.Split(','))
            {
                objCPayables.GetList($"where id = {currentID} and crmcode = ''");
                if(objCPayables.lstCVarPayables.Count > 0 && CompanyName == "MES")
                objCPayables.lstDeletedCPKPayables.Add(new CPKPayables() { ID = Int64.Parse(currentID.Trim()) });
                else if (CompanyName != "MES")
                    objCPayables.lstDeletedCPKPayables.Add(new CPKPayables() { ID = Int64.Parse(currentID.Trim()) });

            }

            checkException = objCPayables.DeleteItem(objCPayables.lstDeletedCPKPayables);
            //checkException = objCPayables.DeleteList("WHERE ID IN (" + pPayablesIDs + ")"); //dont use this for the log to work
            objCOperationLog.UpdateList("UserID=" + WebSecurity.CurrentUserId.ToString() + ", UserName=N'" + WebSecurity.CurrentUserName + "'"
                                        + " WHERE ActionOnRowID IN (" + pPayablesIDs + ") AND ActionOnRowID IN(" + pPayablesIDs.ToString() + ")"
                                        + " AND ActionType='D' AND UserID IS NULL AND LogFor = " + 10);

            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("DELETE")) // some or all of the rows were not deleted due to dependencies
                    _result = false;
            }
            else //deleted successfully
                _result = true;
            return _result;
        }



        [HttpGet, HttpPost]
        public bool Cancel(String pPayablesIDs, Int64 pOperationID)
        {
            bool _result = false;
            Exception checkException = null;
            CvwPayables objCPayables = new CvwPayables();
            COperationLog objCOperationLog = new COperationLog();
            CPayables cPayables = new CPayables();
            int _RowCount2 = 0;

            CvwDefaults objCvwDefaults = new CvwDefaults();
            objCvwDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount2); //i am sure i ve just one row isa
            string CompanyName = objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName;


            if (CompanyName == "MES")
            {

                objCPayables.GetList("WHERE ID IN(" + pPayablesIDs + ") and crmcode <> '' ");


                CCustomizedDBCall cCustomizedDBCall = new CCustomizedDBCall();

                foreach (var charge in objCPayables.lstCVarvwPayables)
                {

                    if(!(charge.IsIncludedInPaymentRequest == 1  || (charge.AccNoteID > 0)))
                    {



                    CCRMCancelledCharges cCRMCancelledCharges = new CCRMCancelledCharges();
                    cCRMCancelledCharges.GetList($"where ChargeID = {charge.ID} and type = 2");
                    if (cCRMCancelledCharges.lstCVarCRMCancelledCharges.Count > 0)
                    {
                        checkException = cCRMCancelledCharges.UpdateList($"IsCancelled = 1 where id = {cCRMCancelledCharges.lstCVarCRMCancelledCharges[0].ID}");
                        if (checkException == null)
                            checkException = cPayables.UpdateList($"costprice  = 0 ,  QuotationCost = 0 , isdeleted = 1 , AmountWithoutVAT = 0  where id = {cCRMCancelledCharges.lstCVarCRMCancelledCharges[0].ID} ");

                        //cCustomizedDBCall.CallStringFunction($"update dbo.CRMCancelledCharges set  IsCancelled = 1 where id = {cCRMCancelledCharges.lstCVarCRMCancelledCharges[0].ID}");

                    }
                    else
                    {


                        CVarCRMCancelledCharges cVarCRMCancelledCharges = new CVarCRMCancelledCharges();

                        cVarCRMCancelledCharges.ChargeID = charge.ID;
                        cVarCRMCancelledCharges.Type = 2;
                        cVarCRMCancelledCharges.IsCancelled = true;
                        cVarCRMCancelledCharges.UserId = WebSecurity.CurrentUserId;
                        cVarCRMCancelledCharges.CanncellationDate = DateTime.Now;
                        cCRMCancelledCharges.lstCVarCRMCancelledCharges.Add(cVarCRMCancelledCharges);
                        checkException = cCRMCancelledCharges.SaveMethod(cCRMCancelledCharges.lstCVarCRMCancelledCharges);

                        if (checkException == null)
                            checkException = cPayables.UpdateList($"costprice  = 0 ,  QuotationCost = 0, costamount = 0, AmountWithoutVAT = 0 , isdeleted = 1 where id = {charge.ID} ");


                        //cCustomizedDBCall.CallStringFunction($"INSERT INTO dbo.CRMCancelledCharges (ChargeID, Type, IsCancelled, UserId, CanncellationDate) VALUES ({charge.ID}, {2}, 1, {WebSecurity.CurrentUserId.ToString()}, GETDATE());\r\n");

                    }
                    }



                }







            }









            //foreach (var currentID in pPayablesIDs.Split(','))
            //{
            //    objCPayables.lstDeletedCPKPayables.Add(new CPKPayables() { ID = Int64.Parse(currentID.Trim()) });
            //}

            //checkException = objCPayables.DeleteItem(objCPayables.lstDeletedCPKPayables);
            ////checkException = objCPayables.DeleteList("WHERE ID IN (" + pPayablesIDs + ")"); //dont use this for the log to work
            //objCOperationLog.UpdateList("UserID=" + WebSecurity.CurrentUserId.ToString() + ", UserName=N'" + WebSecurity.CurrentUserName + "'"
            //                            + " WHERE ActionOnRowID IN (" + pPayablesIDs + ") AND ActionOnRowID IN(" + pPayablesIDs.ToString() + ")"
            //                            + " AND ActionType='D' AND UserID IS NULL AND LogFor = " + 10);

            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("DELETE")) // some or all of the rows were not deleted due to dependencies
                    _result = false;
            }
            else //deleted successfully
                _result = true;
            return _result;
        }




        [HttpGet, HttpPost]
        public object[] Payables_FillFlexiPayableModal(Int64 pOperationID)
        {
            var serialize = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };

            CSC_Stores cSC_Stores = new CSC_Stores();
            cSC_Stores.GetList("where 1 = 1");
            //----
            CvwSC_PurchaseItem cPurchaseItem = new CvwSC_PurchaseItem();
            cPurchaseItem.GetList("where  exists (select 1 from ChargeTypes T  where T.PurchaseItemID = vwSC_PurchaseItem.ID)");

            CSL_Invoices cSL_Invoices = new CSL_Invoices(); // invo
            cSL_Invoices.GetList("WHERE  isnull(IsDeleted , 0 ) = 0 and (SELECT SUM(isnull(RemainQuantity , 0.00)) FROM SL_InvoicesDetails WHERE InvoiceID = SL_Invoices.ID ) > 0");

            CPackageTypes Units = new CPackageTypes();
            Units.GetList("where 1 = 1");

            //Get the controls data you need here
            return new Object[] { serialize.Serialize(cPurchaseItem.lstCVarvwSC_PurchaseItem)
                , serialize.Serialize(cSC_Stores.lstCVarSC_Stores) ,   serialize.Serialize(Units.lstCVarPackageTypes) };
        }



        [HttpGet, HttpPost]
        public Object[] CheckChargeTypeCategory(int pOperationID, int pCategoryId, int pChargetypeID)
        {
            int _rowCount = 0;
            bool _result = false;
            CCustomizedDBCall cCustomizedDBCall = new CCustomizedDBCall();
            //    select ChargeTypeID from QuotationCharges where id = 86691

            //   select QuotationID from QuotationRoute where id = 43372
            //     select TransportType ,DirectionType from quotations where id = 43718

            //select* from ChargeTypeAccounts where ChargeTypeID = 16509  and ServiceID = 1 and DirectionID = 1 and CategoryID =
            //CChargeTypeAccounts cChargeTypeAccounts = new CChargeTypeAccounts();
            //CQuotationRoute cQuotationRoute = new CQuotationRoute();
            //CQuotations cQuotations = new CQuotations();
            //CQuotationCharges cQuotationCharges = new CQuotationCharges();
            //cQuotationCharges.GetList($"where id = {pQuotaionChargeId}");


            var query = $@"
                           SELECT cha.ExpenseAccountID
                           FROM ChargeTypeAccounts cha
                           JOIN operations O ON O.ID = {pOperationID}
                               AND cha.DirectionID = O.DirectionType
                               AND cha.ServiceID = CASE 
                                   WHEN O.TransportType = 2 THEN 3 -- AIR
                                   WHEN O.TransportType = 1 AND O.ShipmentType = 1 THEN 1 -- FCL
                                   WHEN O.TransportType = 1 AND O.ShipmentType IN (2,5) THEN 2 -- LCL
                                   WHEN O.TransportType = 3 THEN 5 -- Inland
                                   WHEN O.DirectionType = 3 THEN 4 -- Domestic
                               END
                           WHERE cha.ChargeTypeID = {pChargetypeID}
                               AND cha.CategoryID = {pCategoryId}";
                         
            var ExpenseAccountID = cCustomizedDBCall.CallStringFunction(query);


            //var RevenueAccountID = cCustomizedDBCall.CallStringFunction($"  select RevenueAccountID from ChargeTypeAccounts where ChargeTypeID = {pChargetypeID}  and ServiceID = (select TransportType  from operations where id ={pOperationID}) and DirectionID = (select DirectionType from operations where id ={pOperationID}) and CategoryID = {pCategoryId}  \r\n");

            if (ExpenseAccountID != ""/* && RevenueAccountID != ""*/)
                _result = true;

            return new object[]
            {   _result, //pData[0]
               
             };
        }



        [HttpGet, HttpPost]
        public Object[] CheckIsInNewRequest(int pPayableID)
        {
            int _rowCount = 0;
            bool _result = false;
            CCustomizedDBCall cCustomizedDBCall = new CCustomizedDBCall();
          


            var query = $@"select ApproveLevel from vwA_PaymentRequest where id in (select PaymentRequestID from A_PaymentRequestDetails where PayableID = {pPayableID})";

            var IsInNewRequest = cCustomizedDBCall.CallStringFunction(query);


            if (IsInNewRequest == "1")
                _result = true;

            return new object[]
            {   _result, 
               
             };
        }





        [HttpGet, HttpPost]
        public object[] ApplyDefaultPayables(Int64 pOperationID, string pWhereClause, Int64 pTruckingOrderID, Int32 pCustomerID
            , string pSearchKeyword)
        {
            bool _result = false;
            Exception checkException = null;
            string pPayableIDsToDelete = "";
            CPayables objCPayables = new CPayables();
            CDefaults objCDefaults = new CDefaults();
            CUsers objCUsers = new CUsers();
            CCustomers objCCustomers = new CCustomers();
            CvwOperations objCvwOperations = new CvwOperations();
            int _RowCount = 0;
            checkException = objCDefaults.GetListPaging(999999, 1, "WHERE 1=1", "ID", out _RowCount);
            checkException = objCUsers.GetListPaging(999999, 1, "WHERE ID=" + WebSecurity.CurrentUserId, "ID", out _RowCount);
            if (pWhereClause != "0") //if called from TruckingOrder Screens then dont delete
            {
                checkException = objCPayables.GetListPaging(3000, 1, " WHERE OperationID = " + pOperationID.ToString() + " AND SupplierInvoiceNo IS NULL AND SupplierReceiptNo IS NULL AND AccNoteID IS NULL ", "ID", out _RowCount);
                if (objCPayables.lstCVarPayables.Count > 0)
                {
                    pPayableIDsToDelete = objCPayables.lstCVarPayables[0].ID.ToString();
                    for (int i = 1; i < objCPayables.lstCVarPayables.Count; i++)
                        pPayableIDsToDelete += "," + objCPayables.lstCVarPayables[i].ID.ToString();
                }
                if (pPayableIDsToDelete != "")
                    Delete(pPayableIDsToDelete, pOperationID);
                objCPayables.lstCVarPayables.Clear();
            }
            else //TransportOrder
            {
                if (pCustomerID == 0) //glbCallingControl="FleetTransportOrder" Containers
                {
                    checkException = objCvwOperations.GetListPaging(1, 1, "WHERE ID=" + pOperationID, "ID", out _RowCount);
                    pCustomerID = objCvwOperations.lstCVarvwOperations[0].ClientID;
                }
                {
                    pWhereClause = "Where ID IN (SELECT ChargeTypeID FROM DepartmentCharge WHERE DepartmentID=" + objCUsers.lstCVarUsers[0].DepartmentID + ") \n";
                    #region GBL Filter Criteria
                    if (objCDefaults.lstCVarDefaults[0].UnEditableCompanyName == "GBL")
                    {
                        checkException = objCCustomers.GetListPaging(1, 1, "WHERE ID=" + pCustomerID, "ID", out _RowCount);
                        if (objCCustomers.lstCVarCustomers[0].IsInternalCustomer)
                            pWhereClause += "AND Code LIKE N'%INT%' AND Code NOT LIKE N'EX %'" + " \n";
                        else //External Customer
                            pWhereClause += "AND Code LIKE N'%EX%' AND Code NOT LIKE N'INT %'" + " \n";
                        pWhereClause += "AND Code LIKE N'%" + pSearchKeyword + "%'" + " \n";
                    }
                    #endregion GBL Filter Criteria
                }
            }
            //checkException = objCPayables.DeleteList(" WHERE OperationID = " + pOperationID.ToString() + " AND SupplierInvoiceNo IS NULL ");
            if (checkException == null)
            {
                CChargeTypes objCChargeTypes = new CChargeTypes();
                objCChargeTypes.GetListPaging(1500, 1, pWhereClause, "ID", out _RowCount);

                foreach (var rowChargeType in objCChargeTypes.lstCVarChargeTypes)
                {
                    CVarPayables objCVarPayables = new CVarPayables();

                    objCVarPayables.OperationID = pOperationID;
                    objCVarPayables.ChargeTypeID = rowChargeType.ID;
                    objCVarPayables.MeasurementID = rowChargeType.MeasurementID;
                    objCVarPayables.Quantity = 1;
                    objCVarPayables.ExchangeRate = 1;
                    objCVarPayables.CurrencyID = objCDefaults.lstCVarDefaults[0].CurrencyID;
                    objCVarPayables.SupplierInvoiceNo = "0";
                    objCVarPayables.SupplierReceiptNo = "0";
                    objCVarPayables.EntryDate = DateTime.Now;

                    objCVarPayables.IssueDate = DateTime.Now;
                    objCVarPayables.OperationContainersAndPackagesID = 0;
                    objCVarPayables.TruckingOrderID = pTruckingOrderID;

                    objCVarPayables.Notes = rowChargeType.Notes;
                    objCVarPayables.IsOfficial = false;
                    objCVarPayables.IsQuotationApproval = false;
                    objCVarPayables.crmCode = "";
                    objCVarPayables.IsPurchased = false;

                    objCVarPayables.CreatorUserID = objCVarPayables.ModificatorUserID = WebSecurity.CurrentUserId;
                    objCVarPayables.ModificationDate = objCVarPayables.CreationDate = DateTime.Now;

                    objCPayables.lstCVarPayables.Add(objCVarPayables);
                }
                checkException = objCPayables.SaveMethod(objCPayables.lstCVarPayables);
                if (checkException == null)
                    _result = true;
            }
            return new object[] {
                _result
            };
        }

        [HttpGet, HttpPost]
        // i called the pWhereClause1 instead of pWhereClause to avoid the error of routing when 2 actions have the same signature
        public bool GeneratePayablesFromQuotation(Int64 pOperationID, string pWhereClause1, Int64 pQuotationRouteID)
        {
            bool _result = false;
            Exception checkException = null;
            string pPayableIDsToDelete = "";
            CPayables objCPayables = new CPayables();
            int _RowCount = 0;
            //checkException = objCPayables.GetListPaging(3000, 1, " WHERE OperationID = " + pOperationID.ToString() + " AND SupplierInvoiceNo IS NULL AND SupplierReceiptNo IS NULL AND AccNoteID IS NULL ", "ID", out _RowCount);
            //if (objCPayables.lstCVarPayables.Count > 0)
            //{
            //    pPayableIDsToDelete = objCPayables.lstCVarPayables[0].ID.ToString();
            //    for (int i = 1; i < objCPayables.lstCVarPayables.Count; i++)
            //        pPayableIDsToDelete += "," + objCPayables.lstCVarPayables[i].ID.ToString();
            //}
            //if (pPayableIDsToDelete != "")
            //    Delete(pPayableIDsToDelete, pOperationID);
            //objCPayables.lstCVarPayables.Clear();
            ////checkException = objCPayables.DeleteList(" WHERE OperationID = " + pOperationID.ToString() + " AND SupplierInvoiceNo IS NULL AND AccNoteID IS NULL ");
            if (checkException == null)
            {
                //those 2 lines are to get the QuotationCharges from DB
                CvwQuotationCharges objCvwQuotationCharges = new CvwQuotationCharges();
                //objCvwQuotationCharges.GetList(pWhereClause1);
                int _tempRowCount = 0;
                checkException = objCvwQuotationCharges.GetListPaging(5000, 1, pWhereClause1, " ID ", out _tempRowCount);

                //CVarPayables objCVarPayables = new CVarPayables();

                foreach (var rowChargeType in objCvwQuotationCharges.lstCVarvwQuotationCharges)
                {
                    CVarPayables objCVarPayables = new CVarPayables();

                    objCVarPayables.OperationID = pOperationID;
                    objCVarPayables.ChargeTypeID = rowChargeType.ChargeTypeID;
                    objCVarPayables.POrC = 0;
                    objCVarPayables.SupplierOperationPartnerID = 0;
                    objCVarPayables.ContainerTypeID = rowChargeType.ContainerTypeID;
                    objCVarPayables.MeasurementID = rowChargeType.MeasurementID;
                    objCVarPayables.Quantity = rowChargeType.CostQuantity == 0 ? 1 : rowChargeType.CostQuantity;
                    objCVarPayables.CostPrice = rowChargeType.CostPrice;
                    objCVarPayables.CostAmount = rowChargeType.CostAmount;
                    objCVarPayables.ExchangeRate = rowChargeType.CostExchangeRate;
                    objCVarPayables.CurrencyID = rowChargeType.CostCurrencyID;
                    objCVarPayables.SupplierInvoiceNo = "0";
                    objCVarPayables.SupplierReceiptNo = "0";
                    objCVarPayables.EntryDate = DateTime.Now;

                    objCVarPayables.IssueDate = DateTime.Now;
                    objCVarPayables.OperationContainersAndPackagesID = 0;

                    objCVarPayables.GeneratingQRID = pQuotationRouteID;
                    objCVarPayables.Notes = rowChargeType.Notes;
                    objCVarPayables.IsOfficial = false;
                    objCVarPayables.IsQuotationApproval = false;
                    objCVarPayables.crmCode = "";
                    objCVarPayables.IsPurchased = false;

                    objCVarPayables.CreatorUserID = objCVarPayables.ModificatorUserID = WebSecurity.CurrentUserId;
                    objCVarPayables.ModificationDate = objCVarPayables.CreationDate = DateTime.Now;

                    objCPayables.lstCVarPayables.Add(objCVarPayables);
                }
                checkException = objCPayables.SaveMethod(objCPayables.lstCVarPayables);
                if (checkException == null)
                    _result = true;
            }
            return _result;
        }

        [HttpGet, HttpPost]
        public object[] GetPayablesSubtotals(Int64 pOperationID, string pSelectedPayableIDs)
        {
            Exception checkException = null;
            int _DummyRowCount = 0;
            CvwProfitCurrenciesWithMinimalColumns objCProfitCurrencies = new CvwProfitCurrenciesWithMinimalColumns();
            //checkException = objCProfitCurrencies.GetListPaging(999999, 1, "WHERE OperationID=" + pOperationID, "CurrencyCode", out _DummyRowCount);
            checkException = objCProfitCurrencies.GetListPaging(999999, 1, "WHERE OperationID=" + pOperationID + "And MasterOperationID is null", "CurrencyCode", out _DummyRowCount);

            var pProfitList = objCProfitCurrencies.lstCVarvwProfitCurrenciesWithMinimalColumns
                .GroupBy(g => new { g.CurrencyCode })
                .Select(s => new
                {
                    AmountWithoutVAT = s.Sum(i => i.ReceivablesWithoutVAT - i.PayablesWithoutVAT)
                    ,
                    AmountWithVAT = s.Sum(i => i.ReceivablesWithVAT - i.PayablesWithVAT)
                    ,
                    CurrencyCode = s.First().CurrencyCode
                })
                .Distinct()
                //.OrderBy(o => o.Name)
                .ToList();

            Forwarding.MvcApp.Models.Operations.Operations.Customized.CvwPayablesSubTotals objCvwPayablesSubTotals = new Forwarding.MvcApp.Models.Operations.Operations.Customized.CvwPayablesSubTotals();
            objCvwPayablesSubTotals.GetList_Customized(
                " WHERE (OperationID = " + pOperationID.ToString() + " )\n"//OR MasterOperationID = " + pOperationID.ToString() + "
				+ (pSelectedPayableIDs == "0" ? "" : (" AND (PayableID IN (" + pSelectedPayableIDs + ")) \n"))
                + " GROUP BY CurrencyCode ORDER BY CurrencyCode ");
            Int32 _RowCount = objCvwPayablesSubTotals.lstCVarvwPayablesSubTotals.Count;
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                serializer.Serialize(objCvwPayablesSubTotals.lstCVarvwPayablesSubTotals)
                , _RowCount //pData[1];
                , serializer.Serialize(pProfitList) //pData[2]
            };
        }

        [HttpGet, HttpPost] //the pCustodyID is different from the one CustodyAsOperationPartnerSupplier
        public object[] ApproveOrUnApprove(string pIDsToSetApproval, bool pIsApprove, Int32 pCustodyID, Int32 pCostCenterID, Int32 pSafeID, Int32 pBankID, bool pIsOneJV, DateTime pJVDate
            , Int32 pPaymentAccountID, Int32 pPaymentSubAccountID, bool pIsPayment, bool pIsPaymentSupplierCustdy
           , bool pIsUnderProcess, string pWhereClause, string pIDsCostCenter, Int32 pPageSize, Int32 pPageNumber, string pOrderBy)
        {
            bool _result = false;
            Exception checkException = null;
            string _ReturnedMessage = "";
            string pUpdateClause = "";
            CPayables objCPayables = new CPayables();
            CvwPayables objCvwPayables = new CvwPayables();
            CAccPartnerBalance objCAccPartnerBalance = new CAccPartnerBalance();
            int constTransactionPayableApproval = 70;
            int constTransactionPayableAllocation = 80;
            int constCustodyPartnerTypeID = 20;
            int constCustodyOperationPartnerTypeID = 20;
            int constSupplierPartnerTypeID = 8;
            int _RowCount = 0;
            //those 2 lines are to get the Charge types from DB
            CDefaults objCDefaults = new CDefaults();
            objCDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount); //i am sure i ve just one row isa

            //Approve or unapprove according to pIsApprove
            Int32 NumberOfPayables = pIDsToSetApproval.Split(',').Count();
            var ArrPayablesIDs = pIDsToSetApproval.Split(',');
            #region Check SupplierInvoiceNo not approved before
            if (objCDefaults.lstCVarDefaults[0].UnEditableCompanyName == "GBL" && pIsApprove)
            {
                for (int i = 0; i < NumberOfPayables; i++)
                {
                    CvwPayables objCvwPayables_Temp = new CvwPayables();
                    objCvwPayables_Temp.GetListPaging(3000, 1, "WHERE ID=" + ArrPayablesIDs[i].ToString(), "ID", out _RowCount);

                    #region check if supplier is inactive
                    if (objCvwPayables_Temp.lstCVarvwPayables[0].SupplierPartnerTypeID == constSupplierPartnerTypeID)
                    {
                        CSuppliers objCSuppliers = new CSuppliers();
                        checkException = objCSuppliers.GetList("WHERE IsInactive=1 AND ID=" + objCvwPayables_Temp.lstCVarvwPayables[0].PartnerSupplierID);
                        if (objCSuppliers.lstCVarSuppliers.Count > 0)
                            _ReturnedMessage += "Supplier " + objCvwPayables_Temp.lstCVarvwPayables[0].PartnerSupplierName + " is inactive." + " \n";
                    }
                    #endregion check if supplier is inactive

                    string pWhereClause_Temp = "WHERE IsApproved=1 " + " \n";
                    //pWhereClause_Temp += " AND OperationID = " + objCvwPayables_Temp.lstCVarvwPayables[0].OperationID + " \n";
                    pWhereClause_Temp += " AND SupplierInvoiceNo = '" + objCvwPayables_Temp.lstCVarvwPayables[0].SupplierInvoiceNo + "'" + " \n";
                    pWhereClause_Temp += " AND SupplierPartnerTypeID = " + objCvwPayables_Temp.lstCVarvwPayables[0].SupplierPartnerTypeID + " \n"; ;
                    pWhereClause_Temp += " AND PartnerSupplierID = " + objCvwPayables_Temp.lstCVarvwPayables[0].PartnerSupplierID + " \n"; ;
                    pWhereClause_Temp += " AND Year(IssueDate) = '" + objCvwPayables_Temp.lstCVarvwPayables[0].IssueDate.Year + "'" + " \n";
                    //pWhereClause_Temp += " AND ID <> " + ArrPayablesIDs[i] + " \n";                    
                    objCvwPayables_Temp.GetListPaging(3000, 1, pWhereClause_Temp, "ID", out _RowCount);
                    if (objCvwPayables_Temp.lstCVarvwPayables.Count > 0)
                        _ReturnedMessage += "Supplier Invoice No. " + objCvwPayables_Temp.lstCVarvwPayables[0].SupplierInvoiceNo + " is approved before." + " \n";
                    #region Check GBL Charges Accounts
                    else
                    {
                        CChargeTypes objCChargeTypes_temp = new CChargeTypes();
                        checkException = objCChargeTypes_temp.GetList("WHERE ID IN (SELECT ChargeTypeID FROM Payables WHERE ID IN (" + pIDsToSetApproval + ")) AND AccountID_Expense IN (SELECT AccountID from GBL_vw_Accounts WHERE End_Date_Active < GETDATE())");
                        if (checkException != null)
                            _ReturnedMessage = checkException.Message;
                        else if (objCChargeTypes_temp.lstCVarChargeTypes.Count > 0)
                            _ReturnedMessage = objCChargeTypes_temp.lstCVarChargeTypes[0].Name + "(" + objCChargeTypes_temp.lstCVarChargeTypes[0].Code + ")" + " is invalid.";
                    }
                    #endregion Check GBL Charges Accounts
                }
            }
            #endregion Check SupplierInvoiceNo not approved before
            #region Call ERP JV Entry (They approve just one at a time)
            if (_ReturnedMessage == "")
            {
                CGroups objCGroups = new CGroups();
                objCGroups.GetList("WHERE GroupImageURL=N'Accounting'");
                if (!objCGroups.lstCVarGroups[0].IsInactive)
                {
                    CCallCustomizedSP objCCallCustomizedSP = new CCallCustomizedSP();
                    //checkException = objCCallCustomizedSP.CallCustomizedSP("ERP_ForwWeb_PostingExpense", Int64.Parse(ArrPayablesIDs[0]), WebSecurity.CurrentUserId, pIsApprove, pCostCenterID);
                    if (pIsOneJV)
                    {
                        if (objCDefaults.lstCVarDefaults[0].UnEditableCompanyName == "ILS" || objCDefaults.lstCVarDefaults[0].UnEditableCompanyName == "ILSEG")
                            checkException = objCCallCustomizedSP.CallCustomizedSP_MultiIDsWithSafeAndBank("ERP_ForwWeb_PostingExpense_For_ILS", ("," + pIDsToSetApproval + ","), WebSecurity.CurrentUserId, pIsApprove, pCostCenterID, pSafeID, pBankID, pJVDate, pPaymentAccountID, pPaymentSubAccountID, pIsPayment, pIsPaymentSupplierCustdy, pIsUnderProcess);
                        else
                            checkException = objCCallCustomizedSP.CallCustomizedSP_MultiIDsWithSafeAndBank(objCDefaults.lstCVarDefaults[0].MultiChargeAcc_Posting ? "ERP_ForwWeb_MultiChargeAcc_PostingExpense" : "ERP_ForwWeb_PostingExpense", ("," + pIDsToSetApproval + ","), WebSecurity.CurrentUserId, pIsApprove, pCostCenterID, pSafeID, pBankID, pJVDate, pPaymentAccountID, pPaymentSubAccountID, pIsPayment, pIsPaymentSupplierCustdy, pIsUnderProcess);
                    }
                    else
                        checkException = objCCallCustomizedSP.CallCustomizedSP_MultiIDsWithSafeAndBankMulti(objCDefaults.lstCVarDefaults[0].MultiChargeAcc_Posting ? "ERP_ForwWeb_MultiChargeAcc_PostingExpenseMultiJVs" : "ERP_ForwWeb_PostingExpenseMultiJVs", ("," + pIDsToSetApproval + ","), WebSecurity.CurrentUserId, pIsApprove, pCostCenterID, pSafeID, pBankID, pJVDate, pPaymentAccountID, pPaymentSubAccountID, pIsPayment, pIsPaymentSupplierCustdy, ("," + pIDsCostCenter + ","), pIsUnderProcess);

                    CSystemOptions objCSystemOptions = new CSystemOptions();
                    objCSystemOptions.GetList("Where OptionID= 195");
                    if (objCSystemOptions.lstCVarSystemOptions.Count > 0 && objCSystemOptions.lstCVarSystemOptions[0].OptionValue && checkException == null)
                    {
                        checkException = Fleet_Forwarding_Payables.ApproveOrUnApprove_Fleet_Forwarding_Payable(pIDsToSetApproval, pIsApprove, WebSecurity.CurrentUserId);
                    }
                }
                #endregion Call ERP JV Entry
                if (checkException == null)
                {
                    if(objCDefaults.lstCVarDefaults[0].UnEditableCompanyName == "LIN")
                    {
                        pUpdateClause = " IsApproved = " + (pIsApprove ? "1" : "0");
                        //pUpdateClause += " ,CustodyID = " + (pCustodyID == 0 ? "NULL" : pCustodyID.ToString());
                        pUpdateClause += " ,ApprovingUserID = " + WebSecurity.CurrentUserId;
                        pUpdateClause += " ,ModificatorUserID = " + WebSecurity.CurrentUserId;
                        pUpdateClause += " ,ModificationDate = GETDATE() ";
                        pUpdateClause += " WHERE ID in (" + pIDsToSetApproval + ")";
                        checkException = objCPayables.UpdateList(pUpdateClause);


                    }
                        else
                    for (int i = 0; i < NumberOfPayables; i++)
                    {
                        pUpdateClause = " IsApproved = " + (pIsApprove ? "1" : "0");
                        //pUpdateClause += " ,CustodyID = " + (pCustodyID == 0 ? "NULL" : pCustodyID.ToString());
                        pUpdateClause += " ,ApprovingUserID = " + WebSecurity.CurrentUserId;
                        pUpdateClause += " ,ModificatorUserID = " + WebSecurity.CurrentUserId;
                        pUpdateClause += " ,ModificationDate = GETDATE() ";
                        pUpdateClause += " WHERE ID=" + ArrPayablesIDs[i];
                        checkException = objCPayables.UpdateList(pUpdateClause);
                        if (checkException == null) //Add or Delete credit row(coz its a service from supplier so considered as Receivable) to AccPartnerBalance
                        {
                            checkException = objCAccPartnerBalance.DeleteList("WHERE OperationPayableID=" + ArrPayablesIDs[i]); //Delete Row from AccPB
                            objCvwPayables.GetListPaging(1, 1, "WHERE ID=" + ArrPayablesIDs[i], "ID", out _RowCount);

                            if (pIsApprove)//Add 2 Rows to AccPB for Supplier(1 Credit and 1 Debit) and maybe Custody if exists
                            {
                                //Add the Credit row
                                CVarAccPartnerBalance objCVarAccPartnerBalance = new CVarAccPartnerBalance();
                                objCVarAccPartnerBalance.OperationPayableID = objCvwPayables.lstCVarvwPayables[0].ID;
                                objCVarAccPartnerBalance.PartnerTypeID = objCvwPayables.lstCVarvwPayables[0].SupplierPartnerTypeID;
                                objCVarAccPartnerBalance.CustomerID = GetPartnerID(1, objCvwPayables.lstCVarvwPayables[0].SupplierPartnerTypeID, objCvwPayables.lstCVarvwPayables[0].PartnerSupplierID);
                                objCVarAccPartnerBalance.AgentID = GetPartnerID(2, objCvwPayables.lstCVarvwPayables[0].SupplierPartnerTypeID, objCvwPayables.lstCVarvwPayables[0].PartnerSupplierID);
                                objCVarAccPartnerBalance.ShippingAgentID = GetPartnerID(3, objCvwPayables.lstCVarvwPayables[0].SupplierPartnerTypeID, objCvwPayables.lstCVarvwPayables[0].PartnerSupplierID);
                                objCVarAccPartnerBalance.CustomsClearanceAgentID = GetPartnerID(4, objCvwPayables.lstCVarvwPayables[0].SupplierPartnerTypeID, objCvwPayables.lstCVarvwPayables[0].PartnerSupplierID);
                                objCVarAccPartnerBalance.ShippingLineID = GetPartnerID(5, objCvwPayables.lstCVarvwPayables[0].SupplierPartnerTypeID, objCvwPayables.lstCVarvwPayables[0].PartnerSupplierID);
                                objCVarAccPartnerBalance.AirlineID = GetPartnerID(6, objCvwPayables.lstCVarvwPayables[0].SupplierPartnerTypeID, objCvwPayables.lstCVarvwPayables[0].PartnerSupplierID);
                                objCVarAccPartnerBalance.TruckerID = GetPartnerID(7, objCvwPayables.lstCVarvwPayables[0].SupplierPartnerTypeID, objCvwPayables.lstCVarvwPayables[0].PartnerSupplierID);
                                objCVarAccPartnerBalance.SupplierID = GetPartnerID(8, objCvwPayables.lstCVarvwPayables[0].SupplierPartnerTypeID, objCvwPayables.lstCVarvwPayables[0].PartnerSupplierID);
                                objCVarAccPartnerBalance.CustodyID = GetPartnerID(20, objCvwPayables.lstCVarvwPayables[0].SupplierPartnerTypeID, objCvwPayables.lstCVarvwPayables[0].PartnerSupplierID);
                                //objCVarAccPartnerBalance.CustodyID = 0;// pCustodyID; //the custody has its own row (for the partner balance to be adjusted for each partner)
                                objCVarAccPartnerBalance.CreditAmount = objCvwPayables.lstCVarvwPayables[0].CostAmount;
                                objCVarAccPartnerBalance.CurrencyID = objCvwPayables.lstCVarvwPayables[0].CurrencyID;
                                objCVarAccPartnerBalance.ExchangeRate = objCvwPayables.lstCVarvwPayables[0].ExchangeRate;
                                objCVarAccPartnerBalance.BalCurLocalExRate = objCvwPayables.lstCVarvwPayables[0].ExchangeRate;
                                objCVarAccPartnerBalance.InvCurLocalExRate = objCvwPayables.lstCVarvwPayables[0].ExchangeRate;
                                objCVarAccPartnerBalance.TransactionType = constTransactionPayableApproval;
                                objCVarAccPartnerBalance.Notes = "Op. Payable Approved"; //if it appears in the PartnerStatement for Custody, then this means the custody is the operation partner
                                objCVarAccPartnerBalance.CreatorUserID = objCVarAccPartnerBalance.ModificatorUserID = WebSecurity.CurrentUserId;
                                objCVarAccPartnerBalance.CreationDate = objCVarAccPartnerBalance.ModificationDate = DateTime.Now;
                                objCAccPartnerBalance.lstCVarAccPartnerBalance.Add(objCVarAccPartnerBalance);
                                checkException = objCAccPartnerBalance.SaveMethod(objCAccPartnerBalance.lstCVarAccPartnerBalance);
                            }
                        }
                    } //of the For loop
                } //of JV Entry is not correct
            } //EOF if (objCDefaults.lstCVarDefaults[0].UnEditableCompanyName == "GBL")
            if (checkException == null && _ReturnedMessage == "")
            {
                _result = true;
                objCvwPayables.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);
            }
            else if (checkException != null) //otherwise _ReturnedMessage is set for GBL SupplierInvNo posted before
                _ReturnedMessage = checkException.Message;

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                _result
                , serializer.Serialize(objCvwPayables.lstCVarvwPayables)
                , _result ? "" : _ReturnedMessage
            };
        }

        [HttpGet, HttpPost] //the pCustodyID is different from the one CustodyAsOperationPartnerSupplier
        public object[] ApproveOrUnApproveTAX(string pIDsToSetApproval, bool pIsApprove, Int32 pCustodyID, Int32 pCostCenterID, Int32 pSafeID, Int32 pBankID, bool pIsOneJV, DateTime pJVDate
    , Int32 pPaymentAccountID, Int32 pPaymentSubAccountID, bool pIsPayment, bool pIsPaymentSupplierCustdy, string pWhereClause, Int32 pPageSize, Int32 pPageNumber, Int32 pAccountIDCharge, Int32 pSubAccountCharge, string pOrderBy)
        {
            bool _result = false;
            Exception checkException = null;
            string _ReturnedMessage = "";
            string pUpdateClause = "";
            CPayables objCPayables = new CPayables();
            CvwPayables objCvwPayables = new CvwPayables();
            CAccPartnerBalance objCAccPartnerBalance = new CAccPartnerBalance();
            //int constTransactionPayableApproval = 70;
            //int constTransactionPayableAllocation = 80;
            //int constCustodyPartnerTypeID = 20;
            //int constCustodyOperationPartnerTypeID = 20;
            //int constSupplierPartnerTypeID = 8;
            int _RowCount = 0;
            //those 2 lines are to get the Charge types from DB
            CDefaults objCDefaults = new CDefaults();
            objCDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount); //i am sure i ve just one row isa

            //Approve or unapprove according to pIsApprove
            Int32 NumberOfPayables = pIDsToSetApproval.Split(',').Count();
            var ArrPayablesIDs = pIDsToSetApproval.Split(',');
            if (checkException == null && _ReturnedMessage == "")
            {
                _result = true;
                objCvwPayables.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);
            }
            else if (checkException != null) //otherwise _ReturnedMessage is set for GBL SupplierInvNo posted before
                _ReturnedMessage = checkException.Message;

            #region Tax
            int _RowCount2 = 0;
            CPayablesTAX objCPayablesTax = new CPayablesTAX();

            CvwDefaults objCvwDefaults = new CvwDefaults();
            objCvwDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount2); //i am sure i ve just one row isa
            string CompanyName = objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName;
            if (CompanyName == "CHM" || CompanyName == "OCE" || CompanyName == "TRM" || CompanyName == "EGL" || CompanyName == "SWI")
            {

                CTaxLink objCTaxLink = new CTaxLink();
                CTaxLink objCTaxLinkFound = new CTaxLink();

                CTaxLink objCTaxLinkInvoices = new CTaxLink();
                CTaxLink objCTaxLinOperationPartners = new CTaxLink();
                CTaxLink objCTaxLinReceivables = new CTaxLink();


                //Approve or unapprove according to pIsApprove
                Int32 NumberOfPayablesTax = pIDsToSetApproval.Split(',').Count();
                ArrPayablesIDs = pIDsToSetApproval.Split(',');
                #region Check SupplierInvoiceNo not approved before
                string pIDs = "";
                #region Call ERP JV Entry (They approve just one at a time)
                if (_ReturnedMessage == "")
                {
                    CGroups objCGroups = new CGroups();
                    objCGroups.GetList("WHERE GroupImageURL=N'Accounting'");
                    if (!objCGroups.lstCVarGroups[0].IsInactive)
                    {
                        CCallCustomizedSP objCCallCustomizedSP = new CCallCustomizedSP();

                        for (int i = 0; i < NumberOfPayablesTax; i++)
                        {
                            objCTaxLink.GetList("where jvid is not null and notes='Payables' and OriginID =" + ArrPayablesIDs[i]);
                            objCTaxLinkFound.GetList("where jvid is null and notes='Payables' and OriginID =" + ArrPayablesIDs[i]);

                            if (objCTaxLink.lstCVarTaxLink.Count == 0 && objCTaxLinkFound.lstCVarTaxLink.Count == 0)
                            {
                                //link
                                CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
                                objCCustomizedDBCall.ExecuteQuery_DataTable("insertTaxLink " + ArrPayablesIDs[i] + "," + 0 + "," + "Payables");
                                objCTaxLink.GetList("where jvid is null and notes='Payables' and OriginID =" + ArrPayablesIDs[i]);


                            }
                            else if (objCTaxLink.lstCVarTaxLink.Count == 0 && objCTaxLinkFound.lstCVarTaxLink.Count > 0)
                            {
                                objCTaxLink.GetList("where jvid is null and notes='Payables' and OriginID =" + ArrPayablesIDs[i]);

                            }

                            //checkException = objCCallCustomizedSP.CallCustomizedSP("ERP_ForwWeb_PostingExpense", Int64.Parse(ArrPayablesIDs[0]), WebSecurity.CurrentUserId, pIsApprove, pCostCenterID);
                            if (pIsOneJV)

                                pIDs += objCTaxLink.lstCVarTaxLink[0].OriginID + ",";
                            // checkException = objCCallCustomizedSP.CallCustomizedSP_MultiIDsWithSafeAndBank("ERP_ForwWeb_PostingExpenseTax", ("," + (objCTaxLink.lstCVarTaxLink[0].TaxID) + ","), WebSecurity.CurrentUserId, pIsApprove, pCostCenterID, pSafeID, pBankID, pJVDate, pPaymentAccountID, pPaymentSubAccountID, pIsPayment, pIsPaymentSupplierCustdy);
                            else
                                checkException = objCCallCustomizedSP.CallCustomizedSP_MultiIDsWithSafeAndBankTax("ERP_ForwWeb_PostingExpenseMultiJVsTax", ("," + (objCTaxLink.lstCVarTaxLink[0].OriginID) + ","), WebSecurity.CurrentUserId, pIsApprove, pCostCenterID, pSafeID, pBankID, pJVDate, pPaymentAccountID, pPaymentSubAccountID, pIsPayment, pIsPaymentSupplierCustdy, pAccountIDCharge, pSubAccountCharge);
                        }
                        if (pIsOneJV)
                            checkException = objCCallCustomizedSP.CallCustomizedSP_MultiIDsWithSafeAndBankTax("ERP_ForwWeb_PostingExpenseTax", ("," + pIDs + ","), WebSecurity.CurrentUserId, pIsApprove, pCostCenterID, pSafeID, pBankID, pJVDate, pPaymentAccountID, pPaymentSubAccountID, pIsPayment, pIsPaymentSupplierCustdy, pAccountIDCharge, pSubAccountCharge);


                    }
                    #endregion Call ERP JV Entry
                    if (checkException == null)
                    {
                        //for (int i = 0; i < NumberOfPayables; i++)
                        //{
                        //    objCTaxLink.GetList("where OriginID =" + ArrPayablesIDs[i]);
                        //    pUpdateClause = " IsApproved = " + (pIsApprove ? "1" : "0");
                        //    //pUpdateClause += " ,CustodyID = " + (pCustodyID == 0 ? "NULL" : pCustodyID.ToString());
                        //    pUpdateClause += " ,ApprovingUserID = " + WebSecurity.CurrentUserId;
                        //    pUpdateClause += " ,ModificatorUserID = " + WebSecurity.CurrentUserId;
                        //    pUpdateClause += " ,ModificationDate = GETDATE() ";
                        //    pUpdateClause += " WHERE ID=" + objCTaxLink.lstCVarTaxLink[0].TaxID;
                        //    checkException = objCPayablesTax.UpdateList(pUpdateClause);
                        //    if (checkException == null) //Add or Delete credit row(coz its a service from supplier so considered as Receivable) to AccPartnerBalance
                        //    {


                        //    }
                        //} //of the For loop
                    } //of JV Entry is not correct
                } //EOF if (objCDefaults.lstCVarDefaults[0].UnEditableCompanyName == "GBL")
                if (checkException != null)
                {
                    _ReturnedMessage = checkException.Message;
                    _result = false;
                }
                else
                {
                    if (CompanyName == "CHM")
                    {
                        objCvwPayables.GetListPaging(pPageSize, pPageNumber, "WHERE 1=2", pOrderBy, out _RowCount);
                    }
                    else if (CompanyName == "OCE")
                    {
                        objCvwPayables.GetListPaging(pPageSize, pPageNumber, "WHERE 1=2", pOrderBy, out _RowCount);
                    }
                    else if (CompanyName == "EGL")
                    {
                        objCvwPayables.GetListPaging(pPageSize, pPageNumber, "WHERE 1=2", pOrderBy, out _RowCount);
                    }
                    else if (CompanyName == "SWI")
                    {
                        objCvwPayables.GetListPaging(pPageSize, pPageNumber, "WHERE 1=2", pOrderBy, out _RowCount);
                    }

                    
                    //if (pIsApprove==true)
                    //{
                    //    if (CompanyName == "CHM")
                    //    {
                    //        objCvwPayables.GetListPaging(pPageSize, pPageNumber, "WHERE id not in(select originid from ForwardingTransChemTax.dbo.taxlink where originid is not null and notes='Payables' AND JVID IS not NULL)  AND isnull(IsDeleted,0)=0 AND AccNoteID IS NULL", pOrderBy, out _RowCount);
                    //    }
                    //    else if (CompanyName == "OCE")
                    //    {
                    //        objCvwPayables.GetListPaging(pPageSize, pPageNumber, "WHERE id not in(select originid from ForwardingTROTax.dbo.taxlink where originid is not null and notes='Payables' AND JVID IS not NULL) AND isnull(IsDeleted,0)=0 AND AccNoteID IS NULL", pOrderBy, out _RowCount);
                    //    }
                    //}
                    //else if(pIsApprove==false)
                    //{
                    //    if (CompanyName == "CHM")
                    //    {
                    //        objCvwPayables.GetListPaging(pPageSize, pPageNumber, "WHERE id in(select originid from ForwardingTransChemTax.dbo.taxlink where originid is not null and notes='Payables' AND JVID IS NULL) AND isnull(IsDeleted,0)=0 AND AccNoteID IS NULL", pOrderBy, out _RowCount);
                    //    }
                    //    else if (CompanyName == "OCE")
                    //    {
                    //        objCvwPayables.GetListPaging(pPageSize, pPageNumber, "WHERE id in(select originid from ForwardingTROTax.dbo.taxlink where originid is not null and notes='Payables' AND JVID IS NULL) AND isnull(IsDeleted,0)=0 AND AccNoteID IS NULL", pOrderBy, out _RowCount);
                    //    }
                    //}

                }


            }
            #endregion
            #endregion
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                _result
                , serializer.Serialize(objCvwPayables.lstCVarvwPayables)
                , _result ? "" : _ReturnedMessage
            };
        }

        //[HttpGet, HttpPost] //if the SupplierOperationPartner is the Custody then this fn will not be called by validation in js
        ////if the above is to be changed then trace how to handle the CustodyID
        //public object[] SetCustody(Int64 pPayableID, Int32 pCustodyIDToBeSet, string pWhereClause, Int32 pPageSize, Int32 pPageNumber, string pOrderBy)
        //{
        //    bool _result = false;
        //    Exception checkException = null;
        //    string pUpdateClause = "";
        //    CPayables objCPayables = new CPayables();
        //    CvwPayables objCvwPayables = new CvwPayables();
        //    CAccPartnerBalance objCAccPartnerBalance = new CAccPartnerBalance();
        //    int constTransactionPayableApproval = 70;
        //    int constTransactionCustodySettlement = 80;

        //    int constCustodyPartnerTypeID = 20;
        //    int _RowCount = 0;

        //    pUpdateClause = " CustodyID = " + (pCustodyIDToBeSet == 0 ? "NULL" : pCustodyIDToBeSet.ToString());
        //    pUpdateClause += " ,ModificatorUserID = " + WebSecurity.CurrentUserId;
        //    pUpdateClause += " ,ModificationDate = GETDATE() ";
        //    pUpdateClause += " WHERE ID=" + pPayableID;
        //    checkException = objCPayables.UpdateList(pUpdateClause);
        //    objCvwPayables.GetListPaging(1, 1, "WHERE ID=" + pPayableID, "ID", out _RowCount);

        //    if (checkException == null)
        //    {
        //        //if this is reached then i am sure there is no custody added so insert directly w/o deleting
        //        CVarAccPartnerBalance objCVarAccPartnerBalanceCustody = new CVarAccPartnerBalance();
        //        objCVarAccPartnerBalanceCustody.ID = 0;
        //        objCVarAccPartnerBalanceCustody.OperationPayableID = objCvwPayables.lstCVarvwPayables[0].ID;
        //        objCVarAccPartnerBalanceCustody.PartnerTypeID = constCustodyPartnerTypeID; //coz its for the custody balance //objCvwPayables.lstCVarvwPayables[0].SupplierPartnerTypeID;
        //        objCVarAccPartnerBalanceCustody.CustomerID = GetPartnerID(1, objCvwPayables.lstCVarvwPayables[0].SupplierPartnerTypeID, objCvwPayables.lstCVarvwPayables[0].PartnerSupplierID);
        //        objCVarAccPartnerBalanceCustody.AgentID = GetPartnerID(2, objCvwPayables.lstCVarvwPayables[0].SupplierPartnerTypeID, objCvwPayables.lstCVarvwPayables[0].PartnerSupplierID);
        //        objCVarAccPartnerBalanceCustody.ShippingAgentID = GetPartnerID(3, objCvwPayables.lstCVarvwPayables[0].SupplierPartnerTypeID, objCvwPayables.lstCVarvwPayables[0].PartnerSupplierID);
        //        objCVarAccPartnerBalanceCustody.CustomsClearanceAgentID = GetPartnerID(4, objCvwPayables.lstCVarvwPayables[0].SupplierPartnerTypeID, objCvwPayables.lstCVarvwPayables[0].PartnerSupplierID);
        //        objCVarAccPartnerBalanceCustody.ShippingLineID = GetPartnerID(5, objCvwPayables.lstCVarvwPayables[0].SupplierPartnerTypeID, objCvwPayables.lstCVarvwPayables[0].PartnerSupplierID);
        //        objCVarAccPartnerBalanceCustody.AirlineID = GetPartnerID(6, objCvwPayables.lstCVarvwPayables[0].SupplierPartnerTypeID, objCvwPayables.lstCVarvwPayables[0].PartnerSupplierID);
        //        objCVarAccPartnerBalanceCustody.TruckerID = GetPartnerID(7, objCvwPayables.lstCVarvwPayables[0].SupplierPartnerTypeID, objCvwPayables.lstCVarvwPayables[0].PartnerSupplierID);
        //        objCVarAccPartnerBalanceCustody.SupplierID = GetPartnerID(8, objCvwPayables.lstCVarvwPayables[0].SupplierPartnerTypeID, objCvwPayables.lstCVarvwPayables[0].PartnerSupplierID);
        //        objCVarAccPartnerBalanceCustody.CustodyID = pCustodyIDToBeSet;
        //        objCVarAccPartnerBalanceCustody.CreditAmount = objCvwPayables.lstCVarvwPayables[0].CostAmount;
        //        objCVarAccPartnerBalanceCustody.CurrencyID = objCvwPayables.lstCVarvwPayables[0].CurrencyID;
        //        objCVarAccPartnerBalanceCustody.ExchangeRate = objCvwPayables.lstCVarvwPayables[0].ExchangeRate;
        //        objCVarAccPartnerBalanceCustody.BalCurLocalExRate = objCvwPayables.lstCVarvwPayables[0].ExchangeRate;
        //        objCVarAccPartnerBalanceCustody.InvCurLocalExRate = objCvwPayables.lstCVarvwPayables[0].ExchangeRate;
        //        objCVarAccPartnerBalanceCustody.TransactionType = constTransactionCustodySettlement;
        //        objCVarAccPartnerBalanceCustody.Notes = "Custody paid " + objCvwPayables.lstCVarvwPayables[0].SupplierOperationPartnerTypeCode + ": " + objCvwPayables.lstCVarvwPayables[0].PartnerSupplierName + " for Op No: " + objCvwPayables.lstCVarvwPayables[0].OperationCode;
        //        objCVarAccPartnerBalanceCustody.CreatorUserID = objCVarAccPartnerBalanceCustody.ModificatorUserID = WebSecurity.CurrentUserId;
        //        objCVarAccPartnerBalanceCustody.CreationDate = objCVarAccPartnerBalanceCustody.ModificationDate = DateTime.Now;
        //        objCAccPartnerBalance.lstCVarAccPartnerBalance.Add(objCVarAccPartnerBalanceCustody);
        //        checkException = objCAccPartnerBalance.SaveMethod(objCAccPartnerBalance.lstCVarAccPartnerBalance);

        //        //Add Debit row for partner incase custody is specified i.e. partner took his money
        //        //the partner balance could be closed from here or from normal payment approval
        //        CVarAccPartnerBalance objCVarAccPartnerBalanceDebit = new CVarAccPartnerBalance();
        //        objCAccPartnerBalance.lstCVarAccPartnerBalance.Remove(objCVarAccPartnerBalanceCustody);//.RemoveAt(0);
        //        objCVarAccPartnerBalanceDebit.OperationPayableID = objCvwPayables.lstCVarvwPayables[0].ID;
        //        objCVarAccPartnerBalanceDebit.PartnerTypeID = objCvwPayables.lstCVarvwPayables[0].SupplierPartnerTypeID;
        //        objCVarAccPartnerBalanceDebit.CustomerID = GetPartnerID(1, objCvwPayables.lstCVarvwPayables[0].SupplierPartnerTypeID, objCvwPayables.lstCVarvwPayables[0].PartnerSupplierID);
        //        objCVarAccPartnerBalanceDebit.AgentID = GetPartnerID(2, objCvwPayables.lstCVarvwPayables[0].SupplierPartnerTypeID, objCvwPayables.lstCVarvwPayables[0].PartnerSupplierID);
        //        objCVarAccPartnerBalanceDebit.ShippingAgentID = GetPartnerID(3, objCvwPayables.lstCVarvwPayables[0].SupplierPartnerTypeID, objCvwPayables.lstCVarvwPayables[0].PartnerSupplierID);
        //        objCVarAccPartnerBalanceDebit.CustomsClearanceAgentID = GetPartnerID(4, objCvwPayables.lstCVarvwPayables[0].SupplierPartnerTypeID, objCvwPayables.lstCVarvwPayables[0].PartnerSupplierID);
        //        objCVarAccPartnerBalanceDebit.ShippingLineID = GetPartnerID(5, objCvwPayables.lstCVarvwPayables[0].SupplierPartnerTypeID, objCvwPayables.lstCVarvwPayables[0].PartnerSupplierID);
        //        objCVarAccPartnerBalanceDebit.AirlineID = GetPartnerID(6, objCvwPayables.lstCVarvwPayables[0].SupplierPartnerTypeID, objCvwPayables.lstCVarvwPayables[0].PartnerSupplierID);
        //        objCVarAccPartnerBalanceDebit.TruckerID = GetPartnerID(7, objCvwPayables.lstCVarvwPayables[0].SupplierPartnerTypeID, objCvwPayables.lstCVarvwPayables[0].PartnerSupplierID);
        //        objCVarAccPartnerBalanceDebit.SupplierID = GetPartnerID(8, objCvwPayables.lstCVarvwPayables[0].SupplierPartnerTypeID, objCvwPayables.lstCVarvwPayables[0].PartnerSupplierID);
        //        objCVarAccPartnerBalanceDebit.CustodyID = 0;// pCustodyID; //the custody has its own row, but if problems exist check coz i didn't trace coz of time.
        //        objCVarAccPartnerBalanceDebit.DebitAmount = objCvwPayables.lstCVarvwPayables[0].CostAmount;
        //        objCVarAccPartnerBalanceDebit.CurrencyID = objCvwPayables.lstCVarvwPayables[0].CurrencyID;
        //        objCVarAccPartnerBalanceDebit.ExchangeRate = objCvwPayables.lstCVarvwPayables[0].ExchangeRate;
        //        objCVarAccPartnerBalanceDebit.BalCurLocalExRate = objCvwPayables.lstCVarvwPayables[0].ExchangeRate;
        //        objCVarAccPartnerBalanceDebit.InvCurLocalExRate = objCvwPayables.lstCVarvwPayables[0].ExchangeRate;
        //        objCVarAccPartnerBalanceDebit.TransactionType = constTransactionPayableApproval;
        //        objCVarAccPartnerBalanceDebit.Notes = "Received from Custody: " + objCvwPayables.lstCVarvwPayables[0].CustodyName + " for Op No: " + objCvwPayables.lstCVarvwPayables[0].OperationCode;
        //        objCVarAccPartnerBalanceDebit.CreatorUserID = objCVarAccPartnerBalanceDebit.ModificatorUserID = WebSecurity.CurrentUserId;
        //        objCVarAccPartnerBalanceDebit.CreationDate = objCVarAccPartnerBalanceDebit.ModificationDate = DateTime.Now;
        //        objCAccPartnerBalance.lstCVarAccPartnerBalance.Add(objCVarAccPartnerBalanceDebit);
        //        checkException = objCAccPartnerBalance.SaveMethod(objCAccPartnerBalance.lstCVarAccPartnerBalance);
        //    }
        //    if (checkException == null)
        //    {
        //        _result = true;
        //        objCvwPayables.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);
        //    }
        //    return new object[] {
        //        _result
        //        , new JavaScriptSerializer().Serialize(objCvwPayables.lstCVarvwPayables)
        //    };
        //}

        public Int32 GetPartnerID(Int32 pCheckedPartnerTypeID, Int32 pReceivedPartnerTypeID, Int32 pPartnerID)
        {
            if (pCheckedPartnerTypeID == pReceivedPartnerTypeID)
                return pPartnerID;
            else
                return 0;
        }


        #region Airline Payables //Ahmed Medra
        [HttpGet, HttpPost]
        public object[] LoadAirLineWithWhereClause(Int32 pPageNumber, Int32 pPageSize, string pWhereClause)
        {
            CVw_AirLineChargeType objCVw_AirLineChargeType = new CVw_AirLineChargeType();
            //objCvwPayables.GetList(string.Empty); //GetList() fn loads without paging
            Int32 _RowCount = objCVw_AirLineChargeType.lstCVarVw_AirLineChargeType.Count;
            //pSearchKey here is the where clause
            objCVw_AirLineChargeType.GetListPaging(pPageSize, pPageNumber, pWhereClause, " [Name] ", out _RowCount);
            return new Object[] { new JavaScriptSerializer().Serialize(objCVw_AirLineChargeType.lstCVarVw_AirLineChargeType), _RowCount };
        }
        [HttpGet, HttpPost]
        public bool InsertAirLineList(Int32 pAirLineId, String pSelectedIDs)
        {
            bool _result = false;
            int _RowCount = 0;
            string pWhereClause = "";
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

            //those 2 lines are to get the Charge types from DB
            CChargeTypes objCChargeTypes = new CChargeTypes();
            //objCChargeTypes.GetList(pWhereClause);
            objCChargeTypes.GetListPaging(1500, 1, pWhereClause, "ID", out _RowCount);

            CAirLineChargeTypes objCAirLineChargeTypes = new CAirLineChargeTypes();

            foreach (var rowChargeType in objCChargeTypes.lstCVarChargeTypes)
            {
                CVarAirLineChargeTypes objCVarAirLineChargeTypes = new CVarAirLineChargeTypes();

                objCVarAirLineChargeTypes.AirLineId = pAirLineId;
                objCVarAirLineChargeTypes.ChargeTypeID = rowChargeType.ID;
                objCVarAirLineChargeTypes.IsDefault = true;


                objCAirLineChargeTypes.lstCVarAirLineChargeTypes.Add(objCVarAirLineChargeTypes);
            }
            var checkException = objCAirLineChargeTypes.SaveMethod(objCAirLineChargeTypes.lstCVarAirLineChargeTypes);
            if (checkException == null)
                _result = true;
            return _result;
        }
        [HttpGet, HttpPost]
        public object[] UpdateAirLinePayable(Int32 pID, Int32 pAirLineId, Int32 pChargeTypeID, Boolean pIsDefault)
        {
            bool _result = false;
            string msgReturned = "";
            msgReturned = "";

            if (msgReturned == "")
            {
                CVarAirLineChargeTypes objCVarAirLineChargeTypes = new CVarAirLineChargeTypes();

                objCVarAirLineChargeTypes.ID = pID;

                objCVarAirLineChargeTypes.AirLineId = pAirLineId;
                objCVarAirLineChargeTypes.ChargeTypeID = pChargeTypeID;
                objCVarAirLineChargeTypes.IsDefault = pIsDefault;

                CAirLineChargeTypes objCAirLineChargeTypes = new CAirLineChargeTypes();
                objCAirLineChargeTypes.lstCVarAirLineChargeTypes.Add(objCVarAirLineChargeTypes);
                Exception checkException = objCAirLineChargeTypes.SaveMethod(objCAirLineChargeTypes.lstCVarAirLineChargeTypes);
                if (checkException != null) // an exception is caught in the model
                {
                    _result = false;
                }
                else
                    _result = true;
            }
            else
                _result = false;

            return new object[] { _result, msgReturned };
        }
        [HttpGet, HttpPost]
        public bool DeleteAirlinePayables(String pAirPayablesIDs)
        {
            bool _result = false;
            CAirLineChargeTypes objCAirLineChargeTypes = new CAirLineChargeTypes();
            Exception checkException = null;

            foreach (var currentID in pAirPayablesIDs.Split(','))
            {
                objCAirLineChargeTypes.lstDeletedCPKAirLineChargeTypes.Add(new CPKAirLineChargeTypes() { ID = Int32.Parse(currentID.Trim()) });
            }
            checkException = objCAirLineChargeTypes.DeleteItem(objCAirLineChargeTypes.lstDeletedCPKAirLineChargeTypes);

            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("DELETE")) // some or all of the rows were not deleted due to dependencies
                    _result = false;
            }
            else //deleted successfully
                _result = true;
            return _result;
        }

        #endregion Airline Payables //Ahmed Medra

        [HttpGet, HttpPost]
        public object GetPayablesOnly(string pWhereClause)
        {
            CvwPayables objCvwPayables = new CvwPayables();
            objCvwPayables.GetList(pWhereClause);
            return new JavaScriptSerializer().Serialize(objCvwPayables.lstCVarvwPayables);
        }

        [HttpGet, HttpPost]
        public string CheckBeforePaymentRequest(string pPayablesList, bool pDummy)
        {
            string _message = "";
            int _RowCount = 0;
            HashSet<int> Currencies = new HashSet<int>();
            HashSet<long> Suppliers = new HashSet<long>();
            bool PayableExistInPaymentRequest = false;
            bool ZeroValuePayable = false;

            CPayables objCPayables = new CPayables();
            CA_PaymentRequestDetails objCA_PaymentRequestDetails = new CA_PaymentRequestDetails();
            string[] PayablesIDs = pPayablesList.Split(',');

            CvwDefaults objCvwDefaults = new CvwDefaults();
            objCvwDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount); //i am sure i ve just one row isa
            string CompanyName = objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName;
            string[] MescoCompanies = new string[5] { "MES", "SAC", "GLO", "EUR", "ALT" };
            bool IsMescoCompany = MescoCompanies.Contains(CompanyName);

            if (IsMescoCompany)
            {
                CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
                DataTable dtdata = objCCustomizedDBCall.ExecuteQuery_DataTable(@"select Ct.Name from Operations O join Payables P on P.OperationID = O.ID  join ChargeTypes CT on CT.ID = P.ChargeTypeID
                where Not Exists(select 1 from ChargeTypeAccounts cha where cha.ChargeTypeID = P.ChargeTypeID
                and cha.DirectionID = O.DirectionType
                 and cha.ServiceID = case WHEN O.TransportType = 2 THEN 3 --AIR
                WHEN O.TransportType = 1 AND O.ShipmentType = 1 THEN 1 --FCL
                WHEN O.TransportType = 1 AND O.ShipmentType IN(2, 5) THEN 2 --LCL               
                WHEN O.TransportType = 3 THEN 5 --Inland                
                WHEN O.DirectionType = 3 THEN 4 end --Domestic
                and cha.CategoryID = P.CategoryID and cha.ExpenseAccountID IS NOT NULL and cha.RevenueCostCenterID IS NOT NULL) And P.ID in (" + pPayablesList + ")");

                if (dtdata.Rows.Count > 0)
                {
                    _message += "Link account for charges ";
                    for (int i = 0; i < dtdata.Rows.Count; i++)
                    {
                        _message += dtdata.Rows[i]["Name"].ToString() + " - ";
                    }
                    return _message;
                }

                foreach (string PayableID in PayablesIDs)
                {
                    Exception exception = objCPayables.GetItem(long.Parse(PayableID));
                    if (exception == null && objCPayables.lstCVarPayables.Count == 1)
                    {
                        Currencies.Add(objCPayables.lstCVarPayables[0].CurrencyID);
                        Suppliers.Add(objCPayables.lstCVarPayables[0].SupplierOperationPartnerID);
                        if (objCPayables.lstCVarPayables[0].QuotationCost == 0)
                        {
                            ZeroValuePayable = true;
                        }
                    }
                    Exception e = objCA_PaymentRequestDetails.GetList($"WHERE PayableID={long.Parse(PayableID)}");
                    if (e == null && objCA_PaymentRequestDetails.lstCVarA_PaymentRequestDetails.Count > 0)
                    {
                        PayableExistInPaymentRequest = true;
                    }
                }
                if (Currencies.Count > 1)
                {
                    return "Payables must have same Currency!";
                }
                if (Suppliers.First() == 0)
                {
                    return "Payables must have a Supplier!";
                }
                if (Suppliers.Count > 1)
                {
                    return "Payables must have same Supplier!";
                }
                if (PayableExistInPaymentRequest)
                {
                    return "Payable exist in another Payment Request";
                }
                if (ZeroValuePayable)
                {
                    return "Can't Have a 0 value Payable";
                }

                return _message;
            }
            else
            {
                foreach (string PayableID in PayablesIDs)
                {
                    Exception exception = objCPayables.GetItem(long.Parse(PayableID));
                    if (exception == null && objCPayables.lstCVarPayables.Count == 1)
                    {
                        Currencies.Add(objCPayables.lstCVarPayables[0].CurrencyID);
                        if (CompanyName == "LATT" || CompanyName == "REL" || CompanyName == "PYR")
                        {
                            if (objCPayables.lstCVarPayables[0].CostAmount == 0)
                            {
                                ZeroValuePayable = true;
                            }
                        }
                        else
                        {

                            if (objCPayables.lstCVarPayables[0].QuotationCost == 0)
                            {
                                ZeroValuePayable = true;
                            }
                        }
                    }
                    Exception e = objCA_PaymentRequestDetails.GetList($"WHERE PayableID={long.Parse(PayableID)}");
                    if (e == null && objCA_PaymentRequestDetails.lstCVarA_PaymentRequestDetails.Count > 0)
                    {
                        PayableExistInPaymentRequest = true;
                    }
                }
                if (Currencies.Count > 1)
                {
                    return "Payables must have same Currency!";
                }
                if (PayableExistInPaymentRequest)
                {
                    return "Payable exist in another Payment Request";
                }
                if (ZeroValuePayable)
                {
                    return "Can't Have a 0 value Payable";
                }

                return _message;
            }


        }
        [HttpGet, HttpPost]
        public Object[] GetHouseContainers(int pHouseID, int pOperationID)
        {
            int _RowCount = 0;
            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
            var ContainersList = objCCustomizedDBCall.ExecuteQuery_ListOfObjects($"SELECT ID,ContainerNumber,ContainerTypeID FROM OperationContainersAndPackages WHERE OperationID = {pOperationID} {(pHouseID > 0 ? $"AND ID IN (SELECT OperationContainersAndPackagesID FROM OperationContainersAndPackagesPlacedOn WHERE OperationID = {pHouseID})" : "")}", typeof(CVarOperationContainersAndPackages)).Cast<CVarOperationContainersAndPackages>().ToList();
            CContainerTypes objCContainerTypes = new CContainerTypes();
            objCContainerTypes.GetListPaging(999, 1, "WHERE 1=1", "ID", out _RowCount);
            var ContainersListForCombo = ContainersList.Select(c => new
            {
                c.ID,
                c.ContainerNumber,
                ContainerTypeCode = objCContainerTypes.lstCVarContainerTypes.FirstOrDefault(item => item.ID == c.ContainerTypeID) == null ? "" : objCContainerTypes.lstCVarContainerTypes.FirstOrDefault(item => item.ID == c.ContainerTypeID).Code
            }).ToList();

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                serializer.Serialize(ContainersListForCombo)
            };
        }
        [HttpGet, HttpPost]
        public Object[] GetContainerHouses(int pContainerID, int pOperationID)
        {
            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
            var HousesList = objCCustomizedDBCall.ExecuteQuery_ListOfObjects($"SELECT ID,HouseNumber,CertificateNumber FROM Operations WHERE MasterOperationID = {pOperationID} {(pContainerID > 0 ? $"AND ID IN (SELECT OperationID FROM OperationContainersAndPackagesPlacedOn WHERE OperationContainersAndPackagesID = {pContainerID})" : "")}", typeof(CVarOperations)).Cast<CVarOperations>().ToList();
            var HousesListMinified = HousesList.Select(h => new
            {
                h.ID,
                h.HouseNumber,
                h.CertificateNumber
            }).ToList();

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                serializer.Serialize(HousesListMinified)
            };
        }




        [HttpGet, HttpPost]
        public object[] InsertListFromExcel_Payables([FromBody] InsertListFromExcel_Payables InsertListFromExcel_Payables)
        {
            object[] OBJ = new object[3];
            string pReturnedMessage = "";
            Exception checkException = null;
            int _NumberOfRows = InsertListFromExcel_Payables.pCodeList.Split(',').Length;
            var _ArrCode = InsertListFromExcel_Payables.pCodeList.Split(',');
            var _ArrQty = InsertListFromExcel_Payables.pQtyList.Split(',');
            var _ArrUnitPrice = InsertListFromExcel_Payables.pUnitPriceList.Split(',');
            var _ArrNotes = InsertListFromExcel_Payables.pNotesList.Split(',');
            var _ArrRate = InsertListFromExcel_Payables.pRateList.Split(',');
            var _ArrCurrency = InsertListFromExcel_Payables.pCurrencyList.Split(',');
            var _ArrTax = InsertListFromExcel_Payables.pTaxList.Split(',');
            var _SupplierInvoiceNo = InsertListFromExcel_Payables.pSupplierInvoiceNo.Split(',');
            var _Supplier = InsertListFromExcel_Payables.pSupplier.Split(',');
            var _ArrReceiptNo = InsertListFromExcel_Payables.pReceiptNo.Split(',');
            var _ArrEntryDate = InsertListFromExcel_Payables.pEntryDate.Split(',');
            var _ArrIssueDate = InsertListFromExcel_Payables.pIssueDate.Split(',');

            int _RowCount;

            CDefaults objCDefaults = new CDefaults();
            objCDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount); //i am sure i ve just one row isa

            if (InsertListFromExcel_Payables.pOperationID == 0)
                pReturnedMessage = "Operation Not Found";

            CChargeTypes objCChargeTypes = new CChargeTypes();

            CTaxeTypes objCTaxTypes = new CTaxeTypes();
            objCTaxTypes.GetList("WHERE 1=1");

            CCurrencies objCCurrencies = new CCurrencies();
            objCCurrencies.GetList("WHERE 1=1");

            string pListCode = "";
            string pListSupplier = "";
            string pListSuppliernew = "";
            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();

            //Check Accounts
            for (int i = 0; i < _NumberOfRows; i++)
            {
                pListCode += "'" + _ArrCode[i] + "',";

                if (objCCurrencies.lstCVarCurrencies.Where(x => x.Code == _ArrCurrency[i].ToString()).ToList().Count == 0)
                    pReturnedMessage = "Currency Code Not Found";

                if (_ArrTax[i] != "0")
                {
                    if (objCTaxTypes.lstCVarTaxeTypes.Where(x => x.CurrentPercentage == Convert.ToDecimal(_ArrTax[i])).ToList().Count == 0)
                        pReturnedMessage = "Tax Percentage Not Found";
                }
                pListSupplier = "N'" + _Supplier[i] + "'";
                var SupplierIDss = objCCustomizedDBCall.CallStringFunction($" select top 1 Id from vwOperationPartners where PartnerName IN (" + pListSupplier + ") And OperationID=" + InsertListFromExcel_Payables.pOperationID + "\r\n ");
                if(i== _NumberOfRows - 1)
                {
                    pListSuppliernew +=  SupplierIDss ;
                }
                else
                {
                    pListSuppliernew +=  SupplierIDss+",";

                }
            }
         
            string[] stringArray = pListSuppliernew.Split(',');
            int[] IDsString = new int[stringArray.Length];

            for (int i = 0; i < stringArray.Length; i++)
            {
                if (stringArray[i]!="")
                    IDsString[i] = int.Parse(stringArray[i]);
            }

            objCChargeTypes.GetList("Where Code in (" + pListCode.Remove(pListCode.Length - 1) + ")");

            var _ArrCurrency_ListCopy = new string[_NumberOfRows];
            var _ArrTax_ListCopy = new string[_NumberOfRows];


            _ArrCurrency.CopyTo(_ArrCurrency_ListCopy, 0);
            _ArrTax.CopyTo(_ArrTax_ListCopy, 0);


            string Payables_IDs = "";
            if (pReturnedMessage == "")
            {
                for (int i = 0; i < _NumberOfRows; i++)
                {
                    CVarPayables objCVarPayables = new CVarPayables();



                    objCVarPayables.OperationID = InsertListFromExcel_Payables.pOperationID;
                    objCVarPayables.ChargeTypeID = objCChargeTypes.lstCVarChargeTypes.Where(x => x.Code == _ArrCode[i].ToString()).ToList()[0].ID;
                    objCVarPayables.POrC = 0;
                    //objCVarPayables.SupplierOperationPartnerID = Int64.Parse(pSupplierList.Split(',')[i]);
                    objCVarPayables.MeasurementID = 0;
                    objCVarPayables.SupplierInvoiceNo = _SupplierInvoiceNo[i];
                    objCVarPayables.SupplierReceiptNo = _ArrReceiptNo[i];
                    if (_ArrEntryDate[i] != "0")
                    {
                    DateTime parsedEntryDate = DateTime.ParseExact(_ArrEntryDate[i], "M/d/yy", System.Globalization.CultureInfo.InvariantCulture);
                    string formattedEntryDate = parsedEntryDate.ToString("dd/MM/yyyy");
                    objCVarPayables.EntryDate = DateTime.Parse(formattedEntryDate);
                    }
                    else
                    {
                       objCVarPayables.EntryDate = DateTime.Now;
                    }
                    if (_ArrIssueDate[i] != "0")
                    {
                        DateTime parsedIssueDate = DateTime.ParseExact(_ArrIssueDate[i], "M/d/yy", System.Globalization.CultureInfo.InvariantCulture);
                        string formattedIssueDate = parsedIssueDate.ToString("dd/MM/yyyy");
                        objCVarPayables.IssueDate = DateTime.Parse(formattedIssueDate);
                    }
                    else
                    {
                      objCVarPayables.IssueDate = DateTime.Now;
                    }
                    objCVarPayables.SupplierOperationPartnerID = IDsString[i];
                    objCVarPayables.crmCode = "0";
                    objCVarPayables.Quantity = (_ArrQty[i] == "0" ? 1 : decimal.Parse(_ArrQty[i]));

                    objCVarPayables.CostPrice = decimal.Parse(_ArrUnitPrice[i]);

                    objCVarPayables.AmountWithoutVAT = Math.Round((objCVarPayables.Quantity * objCVarPayables.CostPrice), 2);

                    if (objCDefaults.lstCVarDefaults[0].IsTaxOnItems)
                    {
                        var Tax = objCTaxTypes.lstCVarTaxeTypes.Where(x => x.CurrentPercentage == Convert.ToDecimal(_ArrTax[i])).ToList()[0];
                        if (Tax != null)
                        {
                            objCVarPayables.TaxTypeID = Tax.ID;
                            objCVarPayables.TaxPercentage = Tax.CurrentPercentage;
                            objCVarPayables.TaxAmount = Math.Round((objCVarPayables.AmountWithoutVAT * objCVarPayables.TaxPercentage / 100), 2);
                        }
                        else
                        {
                            objCVarPayables.TaxPercentage = 0;
                            objCVarPayables.TaxAmount = 0;
                            objCVarPayables.DiscountPercentage = 0;
                        }
                    }

                    objCVarPayables.CostAmount = objCVarPayables.AmountWithoutVAT + objCVarPayables.TaxAmount; // decimal.Parse(pSaleAmountList.Split(',')[i]) + objCVarReceivables.TaxAmount;
                    //objCVarReceivables.InitialSalePrice = decimal.Parse(pInitialSalePriceList.Split(',')[i]);
                    //objCVarReceivables.SupplierInvoiceNo = pSupplierInvoiceNumberList.Split(',')[i];
                    objCVarPayables.CurrencyID = objCCurrencies.lstCVarCurrencies.Where(x => x.Code == _ArrCurrency[i].ToString()).ToList()[0].ID;

                    CvwCurrencyDetails objCvwCurrencyDetails = new CvwCurrencyDetails();
                    objCvwCurrencyDetails.GetList("WHERE ID=" + objCVarPayables.CurrencyID
                        + " AND '" + DateTime.Now.ToString("yyyy-MM-dd") + "' >= DateAdd(hh, 0, DateDiff(dd, 0, FromDate)) "
                        + " AND '" + DateTime.Now.ToString("yyyy-MM-dd") + "' <= DateAdd(minute,59,DateAdd(hh, 23, DateDiff(dd, 0, ToDate))) "
                        );
                    if (objCvwCurrencyDetails.lstCVarvwCurrencyDetails.Count > 0)
                    {
                        objCVarPayables.ExchangeRate = objCvwCurrencyDetails.lstCVarvwCurrencyDetails[0].ExchangeRate;
                    }
                    else
                    {
                        pReturnedMessage += "Row " + (i + 1) + " - Exchange rate not found \n";
                        continue;
                    }

                    //objCVarPayables.ExchangeRate_Foreign = 1;
                    objCVarPayables.CurrencyID = objCDefaults.lstCVarDefaults[0].CurrencyID;

                    objCVarPayables.ReceivableID = 0;

                    //objCPayables.GetListPaging(1, 1, "WHERE ID=" + pSelectedPayableIDs.Split(',')[i], "ID", out _RowCount);
                    objCVarPayables.Notes =
                        objCDefaults.lstCVarDefaults[0].UnEditableCompanyName == "MKH"
                        ? (objCVarPayables.Quantity + "X " + _ArrNotes[i] + " X" + objCVarPayables.CostPrice) : _ArrNotes[i];

                    //objCVarPayables.IssueDate = DateTime.Now;
                    objCVarPayables.OperationContainersAndPackagesID = 0;

                    //objCVarPayables.EntryDate = DateTime.Parse("01/01/1900");
                    //objCVarPayables.CutOffDate = DateTime.Parse("01/01/1900");
                    //objCVarPayables.ReceiptDate = DateTime.Parse("01/01/1900");
                    //objCVarPayables.ReceiptNo = "";
                    //objCVarPayables.TariffID = 0;
                    //objCVarPayables.ManualChargeType = "0";
                    //objCVarPayables.CostCenterId = 0;
                    //objCVarPayables.IsOfficial = false;
                    //objCVarPayables.crmCode = "";

                    objCVarPayables.CreatorUserID = objCVarPayables.ModificatorUserID = WebSecurity.CurrentUserId;
                    objCVarPayables.ModificationDate = objCVarPayables.CreationDate = DateTime.Now;

                    CPayables objCPayables = new CPayables();
                    objCPayables.lstCVarPayables.Add(objCVarPayables);
                    checkException = objCPayables.SaveMethod(objCPayables.lstCVarPayables);

                    Payables_IDs += objCPayables.lstCVarPayables[0].ID + ",";
                    if (checkException != null)
                    {
                        pReturnedMessage += "Row " + (i + 1) + " - " + checkException.Message + " \n";
                    }
                }

                //if (InsertListFromExcel_Receivables.pIsCreateInvoice)
                //{
                //    // , "pPrintedAddress": "0"
                //    //     , pApplyTankCharges:true
                //    //       , "pInvoiceStatusID": 1
                //    //        , "pIsApproved": false

                //    string pSelectedReceivableItemsIDs = Receivables_IDs.Remove(Receivables_IDs.Length - 1, 1);
                //    OBJ = Insert(pSelectedReceivableItemsIDs, 0, InsertListFromExcel_Receivables.pOperationID
                //        , InsertListFromExcel_Receivables.pOperationPartnerID, InsertListFromExcel_Receivables.pAddressID
                //        , "", InsertListFromExcel_Receivables.pInvoiceTypeID, InsertListFromExcel_Receivables.pInvoiceTypeCode
                //        , InsertListFromExcel_Receivables.pCustomerReference, InsertListFromExcel_Receivables.pPaymentTermID
                //        , InsertListFromExcel_Receivables.pCurrencyID, InsertListFromExcel_Receivables.pExchangeRate
                //        , InsertListFromExcel_Receivables.pInvoiceIssueDate, InsertListFromExcel_Receivables.pInvoiceDueDate
                //        , InsertListFromExcel_Receivables.pAmountWithoutVAT, InsertListFromExcel_Receivables.pTaxTypeID
                //        , InsertListFromExcel_Receivables.pTaxPercentage, InsertListFromExcel_Receivables.pTaxAmount
                //        , InsertListFromExcel_Receivables.pDiscountTypeID, InsertListFromExcel_Receivables.pDiscountPercentage
                //        , InsertListFromExcel_Receivables.pDiscountAmount, InsertListFromExcel_Receivables.pFixedDiscount
                //        , InsertListFromExcel_Receivables.pAmount, 1, false, InsertListFromExcel_Receivables.pTankID
                //        , true, InsertListFromExcel_Receivables.pTransactionTypeID);

                //    if (!Convert.ToBoolean(OBJ[0]))
                //    {
                //        pReturnedMessage = "Error Create Invoice";
                //    }
                //}


            }
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                pReturnedMessage
                ,OBJ[1]
                ,OBJ[2]
            };
        }




        [HttpGet, HttpPost]
        public Object[] GeneratePayableFormCalcBL(int pBLCalcTypeID, int pPayableID)
        {
            string _ReturnedMessage = "";
            Exception checkException = null;

            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
            checkException = objCCustomizedDBCall.CallProcFunction("A_PaymentRequest_CalcBL_CreatePayablesForClosingOperation " + pBLCalcTypeID + "," + pPayableID + "," + WebSecurity.CurrentUserId);


            if (checkException != null)
                _ReturnedMessage = checkException.Message;
            return new object[] {
                _ReturnedMessage
            };
        }

		[HttpGet,HttpPost]
		public bool CheckTaxExempt(int pTypeID, int pID, int pPayableID)
		{
			var isExampted = false;
			var table = string.Empty;
			CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
			switch (pTypeID)
			{
				case 3:table = "ShippingAgents";break;
				case 4:table = "CustomsClearanceAgents"; break;
				case 5:table = "ShippingLines"; break;
				case 6:table = "Airlines"; break;
				case 7:table = "Truckers"; break;
				case 8:table = "Suppliers"; break;
				default:
					break;
			}
			if(!string.IsNullOrWhiteSpace(table))
			{
				DataTable dt = objCCustomizedDBCall.ExecuteQuery_DataTable($"select * from {table} where ID={pID} and IsConsolidatedInvoice=1 and cast((select CreationDate from Payables where ID={pPayableID}) as date) between cast(TaxExemptFromDate as date) and cast(TaxExemptToDate as date)");
				if (dt.Rows!=null &&dt.Rows.Count > 0)
					isExampted = true;
			}

			return isExampted;
		}

	}
    public class SetIsPurchased
    {
        public int pID { get; set; }
        public bool pIsPurchased { get; set; }

    }
    public class UpdatePayableParameters
    {
        public bool pIsCalledFromOperations { get; set; }
        public string pSelectedPayablesIDsToUpdate { get; set; }
        public string pPOrCList { get; set; }
        public string pSupplierList { get; set; }
        public string pUOMList { get; set; }
        public string pQuantityList { get; set; }
        public string pCostPriceList { get; set; }
        public string pAmountWithoutVATList { get; set; }
        public string pTaxTypeIDList { get; set; }
        public string pTaxPercentageList { get; set; }
        public string pTaxAmountList { get; set; }
        public string pDiscountTypeIDList { get; set; }
        public string pDiscountPercentageList { get; set; }
        public string pDiscountAmountList { get; set; }
        public string pCostAmountList { get; set; }
        public string pInitialSalePriceList { get; set; }
        public string pSupplierInvoiceNumberList { get; set; }
        public string pSupplierReceiptNumberList { get; set; }
        public string pIssueDateList { get; set; }
        public string pEntryDateList { get; set; }
        public string pExchangeRateList { get; set; }
        public string pCurrencyList { get; set; }
        public string pPartnerTypeIDList { get; set; }
        public string pPartnerIDList { get; set; }
        public string pSupplierSiteIDList { get; set; }
        public string pBillIDList { get; set; }
        public string pNotesList { get; set; }
        public string pOperationContainersAndPackagesIDList { get; set; }
        public int pQuotationRouteID { get; set; }

        public string pCategoryList { get; set; } = "";
    }

    public class InsertListFromExcel_Payables
    {
        public int pOperationID { get; set; }
        public string pCodeList { get; set; }
        public string pQtyList { get; set; }
        public string pUnitPriceList { get; set; }
        public string pNotesList { get; set; }
        public string pRateList { get; set; }

        public string pCurrencyList { get; set; }
        public string pTaxList { get; set; }
        public string pSupplierInvoiceNo { get; set; }
        public string pReceiptNo { get; set; }
        public string pSupplier { get; set; }
        public string pEntryDate { get; set; }
        public string pIssueDate { get; set; }



    }
}

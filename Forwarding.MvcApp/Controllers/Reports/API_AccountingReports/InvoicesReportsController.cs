
using Forwarding.MvcApp.Models.Accounting.Transactions.Customized;
using Forwarding.MvcApp.Models.Accounting.Transactions.Generated;
using Forwarding.MvcApp.Models.Administration.Security.Generated;
using Forwarding.MvcApp.Models.Administration.Settings.Generated;
using Forwarding.MvcApp.Models.Customized;
using Forwarding.MvcApp.Models.MasterData.BanksAccountsAndTreasuries.Generated;
using Forwarding.MvcApp.Models.MasterData.Invoicing.Generated;
using Forwarding.MvcApp.Models.MasterData.Partners.Generated;
using Forwarding.MvcApp.Models.NoAccess.Generated;
using Forwarding.MvcApp.Models.Operations.Operations.Customized;
using Forwarding.MvcApp.Models.Operations.Operations.Generated;
using MoreLinq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web.Script.Serialization;

namespace Forwarding.MvcApp.Controllers.Reports.API_AccountingReports
{
    public class InvoicesReportsController : ApiController
    {
        [HttpGet, HttpPost]//pID : is the InvoiceID
        public object[] FillFilter()
        {
            int _RowCount = 0;
            CvwBranches objCvwBranches = new CvwBranches();
            objCvwBranches.GetList(" WHERE 1=1 ORDER BY Name ");

            CInvoiceTypes objCInvoiceTypes = new CInvoiceTypes();
            objCInvoiceTypes.GetList(" WHERE Code<>'DRAFT' ORDER BY Name ");

            CvwCustomersWithMinimalColumns objCvwCustomersWithMinimalColumns = new CvwCustomersWithMinimalColumns();
            //objCvwCustomersWithMinimalColumns.GetList(" ORDER BY Name ");

            CTaxeTypes objCTaxTypes = new CTaxeTypes();
            objCTaxTypes.GetList(" WHERE IsDiscount=0 ORDER BY Name ");

            CTaxeTypes objCDiscountTypes = new CTaxeTypes();
            objCDiscountTypes.GetList(" WHERE IsDiscount=1 ORDER BY Name ");

            CNoAccessPartnerTypes objCNoAccessPartnerTypes = new CNoAccessPartnerTypes();
            objCNoAccessPartnerTypes.GetList(" WHERE 1=1 ");

            CUsers objCSalesmen = new CUsers();
            objCSalesmen.GetListPaging(999999, 1, "WHERE IsSalesman=1", "Name", out _RowCount);

            CUsers objCUsers = new CUsers();
            objCUsers.GetList(" where IsNull(CustomerID , 0) = 0 AND 1 = 1 ORDER BY Name");


            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                new JavaScriptSerializer().Serialize(objCvwBranches.lstCVarvwBranches)//data[0]
                , serializer.Serialize(objCvwCustomersWithMinimalColumns.lstCVarvwCustomersWithMinimalColumns)//data[1]
                , new JavaScriptSerializer().Serialize(objCTaxTypes.lstCVarTaxeTypes)//data[2]
                , new JavaScriptSerializer().Serialize(objCDiscountTypes.lstCVarTaxeTypes)//data[3]
                , new JavaScriptSerializer().Serialize(objCInvoiceTypes.lstCVarInvoiceTypes)//data[4]
                , new JavaScriptSerializer().Serialize(objCNoAccessPartnerTypes.lstCVarNoAccessPartnerTypes)//data[5]
                , serializer.Serialize(objCSalesmen.lstCVarUsers)//data[6]
                , serializer.Serialize(objCUsers.lstCVarUsers)//data[7]
            };
        }

        [HttpGet, HttpPost]
        public object[] FillPartners(Int32 pPartnerTypeID,string pWhereClause)
        {
            int constCustomerPartnerTypeID = 1;
            int constAgentPartnerTypeID = 2;
            int constShippingAgentPartnerTypeID = 3;
            int constCustomsClearanceAgentPartnerTypeID = 4;
            int constShippingLinePartnerTypeID = 5;
            int constAirlinePartnerTypeID = 6;
            int constTruckerPartnerTypeID = 7;
            int constSupplierPartnerTypeID = 8;
            int constCustodyPartnerTypeID = 20;
            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            if (pPartnerTypeID == constCustomerPartnerTypeID)
            {
                var CustomersList = objCCustomizedDBCall.ExecuteQuery_ListOfObjects("SELECT ID,Name FROM Customers " + pWhereClause, typeof(CVarCustomers)).Cast<CVarCustomers>().ToList();
                return new object[] { 
                    serializer.Serialize(CustomersList)
                };
            }
            else if (pPartnerTypeID == constAgentPartnerTypeID)
            {
                var AgentsList = objCCustomizedDBCall.ExecuteQuery_ListOfObjects("SELECT ID,Name FROM Agents " + pWhereClause, typeof(CVarAgents)).Cast<CVarAgents>().ToList();
                return new object[] { 
                    new JavaScriptSerializer().Serialize(AgentsList)
                };
            }
            else if (pPartnerTypeID == constShippingAgentPartnerTypeID)
            {
                var ShippingAgentsList = objCCustomizedDBCall.ExecuteQuery_ListOfObjects("SELECT ID,Name FROM ShippingAgents " + pWhereClause, typeof(CVarShippingAgents)).Cast<CVarShippingAgents>().ToList();
                return new object[] { 
                    new JavaScriptSerializer().Serialize(ShippingAgentsList)
                };
            }
            else if (pPartnerTypeID == constCustomsClearanceAgentPartnerTypeID)
            {
                var CustomsClearanceAgentsList = objCCustomizedDBCall.ExecuteQuery_ListOfObjects("SELECT ID,Name FROM CustomsClearanceAgents " + pWhereClause, typeof(CVarCustomsClearanceAgents)).Cast<CVarCustomsClearanceAgents>().ToList();
                return new object[] { 
                    new JavaScriptSerializer().Serialize(CustomsClearanceAgentsList)
                };
            }
            else if (pPartnerTypeID == constShippingLinePartnerTypeID)
            {
                var ShippingLineList = objCCustomizedDBCall.ExecuteQuery_ListOfObjects("SELECT ID,Name FROM ShippingLines " + pWhereClause, typeof(CVarShippingLines)).Cast<CVarShippingLines>().ToList();
                return new object[] {
                    new JavaScriptSerializer().Serialize(ShippingLineList)
                };
            }
            else if (pPartnerTypeID == constAirlinePartnerTypeID) {
                var AirLinesList = objCCustomizedDBCall.ExecuteQuery_ListOfObjects("SELECT ID,Name FROM AirLines " + pWhereClause, typeof(CVarAirlines)).Cast<CVarAirlines>().ToList();
                return new object[] {
                    new JavaScriptSerializer().Serialize(AirLinesList)
                };
            }
            else if (pPartnerTypeID == constTruckerPartnerTypeID) {
                var TruckersList = objCCustomizedDBCall.ExecuteQuery_ListOfObjects("SELECT ID,Name FROM Truckers " + pWhereClause, typeof(CVarTruckers)).Cast<CVarTruckers>().ToList();
                return new object[] {
                    new JavaScriptSerializer().Serialize(TruckersList)
                };
            }
            else if (pPartnerTypeID == constSupplierPartnerTypeID) {
                var SuppliersList = objCCustomizedDBCall.ExecuteQuery_ListOfObjects("SELECT ID,Name FROM Suppliers " + pWhereClause, typeof(CVarSuppliers)).Cast<CVarSuppliers>().ToList();
                return new object[] {
                    new JavaScriptSerializer().Serialize(SuppliersList)
                };
            }
            else if (pPartnerTypeID == constCustodyPartnerTypeID) {
                var CustodyList = objCCustomizedDBCall.ExecuteQuery_ListOfObjects("SELECT ID,Name FROM Custody " + pWhereClause, typeof(CVarCustody)).Cast<CVarCustody>().ToList();
                return new object[] {
                    new JavaScriptSerializer().Serialize(CustodyList)
                };
            }
            return new object[] { };
        }

        [HttpGet, HttpPost]
        public object[] LoadData(string pWhereClause, string pWhereClause_AccNote, string pOrderBy, bool pIncludeDetails
            , bool pIsAddNotes, bool pIsAddAllNotes, Int32 pCurrencyID, bool pIsAgingPerClient, bool pIsAgingPerClient_AllCurrency
            ,bool pIsAddFleetInvoice = false , bool pIsAllocateInvoice = false)
        {
            CvwDefaults objCvwDefaults = new CvwDefaults();
            int _RowCount2 = 0;
            objCvwDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount2); //i am sure i ve just one row isa
            string CompanyName = objCvwDefaults.lstCVarvwDefaults[0].CompanyName;
            if (CompanyName == "CHMTax" || CompanyName == "OCETax")
            {
                bool pRecordsExist = false;
                Exception checkException = null;
                Int32 _RowCount = 0;
                Int32 _RowCount_temp = 0;
                CvwInvoicesTax objCvwInvoicesTax = new CvwInvoicesTax();

                CvwReceivablesTax objCvwReceivablesTax = new CvwReceivablesTax();

                CvwAccNoteTax objCvwAccNoteTax = new CvwAccNoteTax();

                string _InvoiceIDs = "0";
                //checkException = objCvwInvoices.GetListPaging(99999, 1, pWhereClause, "BranchName, InvoiceTypeName, InvoiceNumber", out _RowCount);
                if (CompanyName == "CHMTax")
                {
                    checkException = objCvwAccNoteTax.GetListPaging(99999, 1, pWhereClause_AccNote + " and id in(SELECT tl.OriginID FROM ForwardingTransChemTax.dbo.TaxLink AS tl WHERE tl.Notes='Accnote')", "ID", out _RowCount);
                    checkException = objCvwInvoicesTax.GetList(pWhereClause + " and id in(SELECT tl.OriginID FROM ForwardingTransChemTax.dbo.TaxLink AS tl WHERE tl.Notes='invoices')" + " ORDER BY " + pOrderBy);

                }
                else if (CompanyName == "OCETax")
                {
                    checkException = objCvwAccNoteTax.GetListPaging(99999, 1, pWhereClause_AccNote + " and id in(SELECT tl.OriginID FROM ForwardingTroTax.dbo.TaxLink AS tl WHERE tl.Notes='Accnote')", "ID", out _RowCount);
                    checkException = objCvwInvoicesTax.GetList(pWhereClause + " and id in(SELECT tl.OriginID FROM ForwardingTroTax.dbo.TaxLink AS tl WHERE tl.Notes='invoices')" + " ORDER BY " + pOrderBy);


                }
                //checkException = objCvwInvoices.GetListPaging(99999, 1, pWhereClause, pOrderBy, out _RowCount);
                _InvoiceIDs = string.Join(",", objCvwInvoicesTax.lstCVarvwInvoices.Select(i => i.ID).ToList());
                if (pIncludeDetails)
                    for (int i = 0; i < objCvwInvoicesTax.lstCVarvwInvoices.Count; i++)
                        _InvoiceIDs += "," + objCvwInvoicesTax.lstCVarvwInvoices[i].ID;
                if (pIsAddNotes)
                    for (int i = 0; i < objCvwAccNoteTax.lstCVarvwAccNoteTax.Count; i++)
                        _InvoiceIDs += "," + objCvwAccNoteTax.lstCVarvwAccNoteTax[i].InvoiceID;


                checkException = objCvwReceivablesTax.GetListPaging(9999999, 1, "WHERE  InvoiceID IN (" + _InvoiceIDs + ")", "InvoiceID", out _RowCount_temp);

                CA_AllocationInvoicesWithVoucher_InvoicesTax objAllocationInvoices = new CA_AllocationInvoicesWithVoucher_InvoicesTax();


                objAllocationInvoices.GetListPaging(9999999, 1, "WHERE InvoiceID IN (" + _InvoiceIDs + ")", "InvoiceID", out _RowCount_temp);

                #region Merge AccNote to Invoices
                for (int i = 0; i < objCvwAccNoteTax.lstCVarvwAccNoteTax.Count && pIsAddNotes; i++)
                {
                    CVarvwInvoicesTax objCVarvwInvoices = new CVarvwInvoicesTax();
                    objCVarvwInvoices.ID = objCvwAccNoteTax.lstCVarvwAccNoteTax[i].InvoiceID;
                    objCVarvwInvoices.InvoiceNumber = objCvwAccNoteTax.lstCVarvwAccNoteTax[i].CodeSerial;
                    objCVarvwInvoices.InvoiceTypeID = 0; //objCvwAccNote.lstCVarvwAccNote[i].NoteType;
                    objCVarvwInvoices.InvoiceTypeCode = objCvwAccNoteTax.lstCVarvwAccNoteTax[i].NoteTypeName;
                    objCVarvwInvoices.InvoiceTypeName = objCvwAccNoteTax.lstCVarvwAccNoteTax[i].NoteTypeName;
                    objCVarvwInvoices.ConcatenatedInvoiceNumber = objCvwAccNoteTax.lstCVarvwAccNoteTax[i].Code;
                    objCVarvwInvoices.Code = objCvwAccNoteTax.lstCVarvwAccNoteTax[i].Code;
                    objCVarvwInvoices.OperationID = objCvwAccNoteTax.lstCVarvwAccNoteTax[i].OperationID;
                    objCVarvwInvoices.OperationCode = objCvwAccNoteTax.lstCVarvwAccNoteTax[i].OperationCode;
                    objCVarvwInvoices.MasterBL = objCvwAccNoteTax.lstCVarvwAccNoteTax[i].MasterBL;
                    objCVarvwInvoices.HouseNumber = objCvwAccNoteTax.lstCVarvwAccNoteTax[i].HouseNumber;
                    objCVarvwInvoices.BranchID = objCvwAccNoteTax.lstCVarvwAccNoteTax[i].BranchID;
                    objCVarvwInvoices.MasterOperationID = objCvwAccNoteTax.lstCVarvwAccNoteTax[i].MasterOperationID;
                    objCVarvwInvoices.MasterOperationCode = objCvwAccNoteTax.lstCVarvwAccNoteTax[i].MasterOperationCode;
                    objCVarvwInvoices.OperationPartnerID = objCvwAccNoteTax.lstCVarvwAccNoteTax[i].OperationPartnerID;
                    objCVarvwInvoices.PartnerTypeID = objCvwAccNoteTax.lstCVarvwAccNoteTax[i].PartnerTypeID;
                    objCVarvwInvoices.PartnerTypeCode = objCvwAccNoteTax.lstCVarvwAccNoteTax[i].PartnerTypeCode;
                    objCVarvwInvoices.PartnerID = objCvwAccNoteTax.lstCVarvwAccNoteTax[i].PartnerID;
                    objCVarvwInvoices.PartnerName = objCvwAccNoteTax.lstCVarvwAccNoteTax[i].PartnerName;
                    objCVarvwInvoices.InvoiceStatus = objCvwAccNoteTax.lstCVarvwAccNoteTax[i].NoteStatus;
                    objCVarvwInvoices.AddressID = objCvwAccNoteTax.lstCVarvwAccNoteTax[i].AddressID;
                    objCVarvwInvoices.CityID = objCvwAccNoteTax.lstCVarvwAccNoteTax[i].CityID;
                    objCVarvwInvoices.CityName = objCvwAccNoteTax.lstCVarvwAccNoteTax[i].CityName;
                    objCVarvwInvoices.CountryID = objCvwAccNoteTax.lstCVarvwAccNoteTax[i].CountryID;
                    objCVarvwInvoices.CountryName = objCvwAccNoteTax.lstCVarvwAccNoteTax[i].CountryName;
                    objCVarvwInvoices.StreetLine1 = objCvwAccNoteTax.lstCVarvwAccNoteTax[i].StreetLine1;
                    objCVarvwInvoices.StreetLine2 = objCvwAccNoteTax.lstCVarvwAccNoteTax[i].StreetLine2;
                    objCVarvwInvoices.AddressTypeID = objCvwAccNoteTax.lstCVarvwAccNoteTax[i].AddressTypeID;
                    objCVarvwInvoices.PrintedAddress = objCvwAccNoteTax.lstCVarvwAccNoteTax[i].PrintedAddress;
                    objCVarvwInvoices.CurrencyID = objCvwAccNoteTax.lstCVarvwAccNoteTax[i].CurrencyID;
                    objCVarvwInvoices.CurrencyCode = objCvwAccNoteTax.lstCVarvwAccNoteTax[i].CurrencyCode;
                    objCVarvwInvoices.MasterDataExchangeRate = objCvwAccNoteTax.lstCVarvwAccNoteTax[i].MasterDataExchangeRate;
                    objCVarvwInvoices.ExchangeRate = objCvwAccNoteTax.lstCVarvwAccNoteTax[i].ExchangeRate;
                    objCVarvwInvoices.AmountWithoutVAT = objCvwAccNoteTax.lstCVarvwAccNoteTax[i].NoteType == 100 //Credit
                        ? -1 * objCvwAccNoteTax.lstCVarvwAccNoteTax[i].AmountWithoutVAT
                        : objCvwAccNoteTax.lstCVarvwAccNoteTax[i].AmountWithoutVAT;
                    objCVarvwInvoices.TaxTypeID = objCvwAccNoteTax.lstCVarvwAccNoteTax[i].TaxTypeID;
                    objCVarvwInvoices.TaxTypeName = objCvwAccNoteTax.lstCVarvwAccNoteTax[i].TaxTypeName;
                    objCVarvwInvoices.TaxPercentage = objCvwAccNoteTax.lstCVarvwAccNoteTax[i].TaxPercentage;
                    objCVarvwInvoices.TaxAmount = objCvwAccNoteTax.lstCVarvwAccNoteTax[i].NoteType == 100 //Credit
                        ? -1 * objCvwAccNoteTax.lstCVarvwAccNoteTax[i].TaxAmount
                        : objCvwAccNoteTax.lstCVarvwAccNoteTax[i].TaxAmount;
                    objCVarvwInvoices.DiscountTypeID = objCvwAccNoteTax.lstCVarvwAccNoteTax[i].DiscountTypeID;
                    objCVarvwInvoices.DiscountTypeName = objCvwAccNoteTax.lstCVarvwAccNoteTax[i].DiscountTypeName;
                    objCVarvwInvoices.DiscountPercentage = objCvwAccNoteTax.lstCVarvwAccNoteTax[i].DiscountPercentage;
                    objCVarvwInvoices.DiscountAmount = objCvwAccNoteTax.lstCVarvwAccNoteTax[i].NoteType == 100 //Credit
                        ? -1 * objCvwAccNoteTax.lstCVarvwAccNoteTax[i].DiscountAmount
                        : objCvwAccNoteTax.lstCVarvwAccNoteTax[i].DiscountAmount;
                    objCVarvwInvoices.Amount = objCvwAccNoteTax.lstCVarvwAccNoteTax[i].NoteType == 100 //Credit
                        ? -1 * objCvwAccNoteTax.lstCVarvwAccNoteTax[i].Amount
                        : objCvwAccNoteTax.lstCVarvwAccNoteTax[i].Amount;
                    objCVarvwInvoices.PaidAmount = objCvwAccNoteTax.lstCVarvwAccNoteTax[i].PaidAmount;
                    objCVarvwInvoices.RemainingAmount = objCvwAccNoteTax.lstCVarvwAccNoteTax[i].RemainingAmount;
                    objCVarvwInvoices.InvoiceDate = objCvwAccNoteTax.lstCVarvwAccNoteTax[i].NoteDate;
                    objCVarvwInvoices.DueDate = objCvwAccNoteTax.lstCVarvwAccNoteTax[i].NoteDate;
                    objCVarvwInvoices.IsApproved = objCvwAccNoteTax.lstCVarvwAccNoteTax[i].IsApproved;
                    objCVarvwInvoices.IsDeleted = objCvwAccNoteTax.lstCVarvwAccNoteTax[i].IsDeleted;
                    objCVarvwInvoices.ApprovingUserID = objCvwAccNoteTax.lstCVarvwAccNoteTax[i].ApprovingUserID;
                    objCVarvwInvoices.ApprovingUserName = objCvwAccNoteTax.lstCVarvwAccNoteTax[i].ApprovingUserName;
                    objCVarvwInvoices.CreatorUserID = objCvwAccNoteTax.lstCVarvwAccNoteTax[i].CreatorUserID;
                    objCVarvwInvoices.CreatorName = objCvwAccNoteTax.lstCVarvwAccNoteTax[i].CreatorName;
                    objCVarvwInvoices.CreationDate = objCvwAccNoteTax.lstCVarvwAccNoteTax[i].CreationDate;
                    objCVarvwInvoices.ModificatorUserID = objCvwAccNoteTax.lstCVarvwAccNoteTax[i].ModificatorUserID;
                    objCVarvwInvoices.ModificatorName = objCvwAccNoteTax.lstCVarvwAccNoteTax[i].ModificatorName;
                    objCVarvwInvoices.ModificationDate = objCvwAccNoteTax.lstCVarvwAccNoteTax[i].ModificationDate;

                    objCVarvwInvoices.CustomerReference = "";
                    objCVarvwInvoices.OperationOpenDate = DateTime.Parse("01/01/1900");
                    objCVarvwInvoices.PaymentDate = DateTime.Parse("01/01/1900");
                    objCvwInvoicesTax.lstCVarvwInvoices.Add(objCVarvwInvoices);
                }
                #endregion Merge AccNote to Invoices

                #region AgingPerClient
                var pAgingPerClientList_BeforeGrouping = objCvwInvoicesTax.lstCVarvwInvoices
                    //.GroupBy(g => new { g.PartnerName, g.CurrencyID })
                    .Select(s => new {
                        PartnerName = s.PartnerName
                        ,
                        CurrencyCode = pCurrencyID == 0 && pIsAgingPerClient ? "" : s.CurrencyCode //if no currency selected then convert to default
                        ,
                        ZeroToThirty = (DateTime.Today - s.DueDate).Days >= 0 && (DateTime.Today - s.DueDate).Days < 30
                                        ? pCurrencyID == 0 && pIsAgingPerClient ? s.RemainingAmount * s.ExchangeRate : s.RemainingAmount
                                        : 0
                        ,
                        PaidAmount = pCurrencyID > 0 && pIsAgingPerClient ? s.PaidAmount : s.PaidAmount * s.ExchangeRate
                        ,
                        RemainingAmount = pCurrencyID == 0 && pIsAgingPerClient ? s.RemainingAmount * s.ExchangeRate : s.RemainingAmount
                        ,
                        ThirtyOneToSixty = (DateTime.Today - s.DueDate).Days >= 30 && (DateTime.Today - s.DueDate).Days < 60
                                        ? pCurrencyID == 0 && pIsAgingPerClient ? s.RemainingAmount * s.ExchangeRate : s.RemainingAmount
                                        : 0
                        ,
                        SixtyOneToNinty = (DateTime.Today - s.DueDate).Days >= 60 && (DateTime.Today - s.DueDate).Days < 90
                                        ? pCurrencyID == 0 && pIsAgingPerClient ? s.RemainingAmount * s.ExchangeRate : s.RemainingAmount
                                        : 0
                        ,
                        Later = (DateTime.Today - s.DueDate).Days >= 90
                                        ? pCurrencyID == 0 && pIsAgingPerClient ? s.RemainingAmount * s.ExchangeRate : s.RemainingAmount
                                        : 0
                        ,
                        NotDue = (DateTime.Today - s.DueDate).Days < 0
                                        ? pCurrencyID == 0 && pIsAgingPerClient ? s.RemainingAmount * s.ExchangeRate : s.RemainingAmount
                                        : 0
                    }).ToList();
                var pAgingPerClientList = pAgingPerClientList_BeforeGrouping
                    .GroupBy(g => new { g.PartnerName, g.CurrencyCode })
                    .Select(s => new {
                        PartnerName = s.First().PartnerName
                        ,
                        CurrencyCode = s.First().CurrencyCode
                        ,
                        RemainingAmount = s.Sum(i => i.RemainingAmount)
                        ,
                        PaidAmount = s.Sum(i => i.PaidAmount)
                        ,
                        ZeroToThirty = s.Sum(i => i.ZeroToThirty)
                        ,
                        ThirtyOneToSixty = s.Sum(i => i.ThirtyOneToSixty)
                        ,
                        SixtyOneToNinty = s.Sum(i => i.SixtyOneToNinty)
                        ,
                        Later = s.Sum(i => i.Later)
                        ,
                        NotDue = s.Sum(i => i.NotDue)
                    }).ToList();
                var pDistinctClientsList = pAgingPerClientList
                    .Select(s => new
                    {
                        PartnerName = s.PartnerName
                    }).Distinct();
                #endregion AgingPerClient

                if (objCvwInvoicesTax.lstCVarvwInvoices.Count > 0 && checkException == null)
                    pRecordsExist = true;

                var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
                return new object[]
                {
                pRecordsExist
                , serializer.Serialize(objCvwInvoicesTax.lstCVarvwInvoices) //pData[1]
                , serializer.Serialize(objCvwReceivablesTax.lstCVarvwReceivablesTax) //pData[2]
                , serializer.Serialize(objCvwInvoicesTax.lstCVarvwInvoices.DistinctBy(x=> x.PartnerID).ToList()) //pData[3]
                , pIsAgingPerClient || pIsAgingPerClient_AllCurrency ? serializer.Serialize(pAgingPerClientList) : null //pData[4]
                , pIsAgingPerClient_AllCurrency ? serializer.Serialize(pDistinctClientsList) : null //Data[5]
                , serializer.Serialize(objAllocationInvoices.lstCVarA_AllocationInvoicesWithVoucher_Invoices) //Data[6]
                };
            }
            else
            {
                bool pRecordsExist = false;
                Exception checkException = null;
                Int32 _RowCount = 0;
                Int32 _RowCount_temp = 0;
                CvwInvoicesForReports objCvwInvoices = new CvwInvoicesForReports();
                CvwInvoicesForMesco objCvwInvoicesForMesco = new CvwInvoicesForMesco();

                CvwReceivables objCvwReceivables = new CvwReceivables();

                CvwAccNote objCvwAccNote = new CvwAccNote();
                CvwAccNote_INVReport objCvwAccNote_INVReport = new CvwAccNote_INVReport();

                string _InvoiceIDs = "0";
                string _NoteIDs = "0";
                //checkException = objCvwInvoices.GetListPaging(99999, 1, pWhereClause, "BranchName, InvoiceTypeName, InvoiceNumber", out _RowCount);
                if (objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName == "MKH")
                    checkException = objCvwAccNote_INVReport.GetListPaging(99999, 1, pWhereClause_AccNote, "ID", out _RowCount);
                else
                checkException = objCvwAccNote.GetListPaging(99999, 1, pWhereClause_AccNote, "ID", out _RowCount);
                //checkException = objCvwInvoices.GetListPaging(99999, 1, pWhereClause, pOrderBy, out _RowCount);
                //Check if Witt Mesco fleet Option
                if(pIsAddFleetInvoice)
                    checkException = objCvwInvoicesForMesco.GetList(pWhereClause + " ORDER BY " + pOrderBy);
                else
                    checkException = objCvwInvoices.GetList(pWhereClause + " ORDER BY " + pOrderBy);

                _InvoiceIDs = string.Join(",", objCvwInvoices.lstCVarvwInvoicesForReports.Select(i => i.ID).ToList());

                if (pIncludeDetails)
                    for (int i = 0; i < objCvwInvoices.lstCVarvwInvoicesForReports.Count; i++)
                        _InvoiceIDs += "," + objCvwInvoices.lstCVarvwInvoicesForReports[i].ID;
                if (pIsAddNotes)
                    for (int i = 0; i < objCvwAccNote.lstCVarvwAccNote.Count; i++)
                        _InvoiceIDs += "," + objCvwAccNote.lstCVarvwAccNote[i].InvoiceID;
                if (pIsAddAllNotes)
                    _NoteIDs = string.Join(",", objCvwAccNote.lstCVarvwAccNote.Select(n => n.ID).ToList());

              if (objCvwInvoices.lstCVarvwInvoicesForReports.Count > 0 && objCvwInvoices.lstCVarvwInvoicesForReports[0].InvoiceTypeCode== "DRAFT")
                        checkException = objCvwReceivables.GetListPaging(9999999, 1, "WHERE DraftInvoiceID IN (" + _InvoiceIDs + ")", "InvoiceID", out _RowCount_temp);
                else if (_InvoiceIDs != "" && !pIsAddAllNotes)
                checkException = objCvwReceivables.GetListPaging(9999999, 1, "WHERE InvoiceID IN (" + _InvoiceIDs + ")", "InvoiceID", out _RowCount_temp);
                else if(pIsAddAllNotes)
                    checkException = objCvwReceivables.GetListPaging(9999999, 1, "WHERE InvoiceID IN (" + _InvoiceIDs + ") OR AccNoteID IN (" + _NoteIDs + ")", "ID", out _RowCount_temp);
            

                CA_AllocationInvoicesWithVoucher_Invoices objAllocationInvoices = new CA_AllocationInvoicesWithVoucher_Invoices();

                if (_InvoiceIDs != "" && pIsAllocateInvoice)
                    objAllocationInvoices.GetListPaging(9999999, 1, "WHERE InvoiceID IN (" + _InvoiceIDs + ")", "InvoiceID", out _RowCount_temp);

                #region Merge AccNote to Invoices
                if (objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName == "MKH")
                {
                    for (int i = 0; i < objCvwAccNote_INVReport.lstCVarvwAccNote_INVReport.Count && (pIsAddNotes || pIsAddAllNotes); i++)
                    {
                        if (!pIsAddAllNotes && objCvwAccNote_INVReport.lstCVarvwAccNote_INVReport[i].NoteType == 90) // Debit
                        {
                            continue;
                        }
                        CVarvwInvoicesForReports objCVarvwInvoices = new CVarvwInvoicesForReports();
                        objCVarvwInvoices.ID = pIsAddAllNotes ? objCvwAccNote_INVReport.lstCVarvwAccNote_INVReport[i].ID : objCvwAccNote_INVReport.lstCVarvwAccNote_INVReport[i].InvoiceID;
                        objCVarvwInvoices.InvoiceNumber = objCvwAccNote_INVReport.lstCVarvwAccNote_INVReport[i].CodeSerial;
                        objCVarvwInvoices.InvoiceTypeID = 0; //objCvwAccNote_INVReport.lstCVarvwAccNote_INVReport[i].NoteType;
                        objCVarvwInvoices.InvoiceTypeCode = objCvwAccNote_INVReport.lstCVarvwAccNote_INVReport[i].NoteTypeName;
                        objCVarvwInvoices.InvoiceTypeName = objCvwAccNote_INVReport.lstCVarvwAccNote_INVReport[i].NoteTypeName;
                        objCVarvwInvoices.ConcatenatedInvoiceNumber = objCvwAccNote_INVReport.lstCVarvwAccNote_INVReport[i].Code;
                        objCVarvwInvoices.Code = objCvwAccNote_INVReport.lstCVarvwAccNote_INVReport[i].Code;
                        objCVarvwInvoices.OperationID = objCvwAccNote_INVReport.lstCVarvwAccNote_INVReport[i].OperationID;
                        objCVarvwInvoices.OperationCode = objCvwAccNote_INVReport.lstCVarvwAccNote_INVReport[i].OperationCode;
                        objCVarvwInvoices.MasterBL = objCvwAccNote_INVReport.lstCVarvwAccNote_INVReport[i].MasterBL;
                        objCVarvwInvoices.HouseNumber = objCvwAccNote_INVReport.lstCVarvwAccNote_INVReport[i].HouseNumber;
                        objCVarvwInvoices.BranchID = objCvwAccNote_INVReport.lstCVarvwAccNote_INVReport[i].BranchID;
                        objCVarvwInvoices.MasterOperationID = objCvwAccNote_INVReport.lstCVarvwAccNote_INVReport[i].MasterOperationID;
                        objCVarvwInvoices.MasterOperationCode = objCvwAccNote_INVReport.lstCVarvwAccNote_INVReport[i].MasterOperationCode;
                        objCVarvwInvoices.OperationPartnerID = objCvwAccNote_INVReport.lstCVarvwAccNote_INVReport[i].OperationPartnerID;
                        objCVarvwInvoices.PartnerTypeID = objCvwAccNote_INVReport.lstCVarvwAccNote_INVReport[i].PartnerTypeID;
                        objCVarvwInvoices.PartnerTypeCode = objCvwAccNote_INVReport.lstCVarvwAccNote_INVReport[i].PartnerTypeCode;
                        objCVarvwInvoices.PartnerID = objCvwAccNote_INVReport.lstCVarvwAccNote_INVReport[i].PartnerID;
                        objCVarvwInvoices.PartnerName = objCvwAccNote_INVReport.lstCVarvwAccNote_INVReport[i].PartnerName;
                        objCVarvwInvoices.InvoiceStatus = objCvwAccNote_INVReport.lstCVarvwAccNote_INVReport[i].NoteStatus;
                        objCVarvwInvoices.AddressID = objCvwAccNote_INVReport.lstCVarvwAccNote_INVReport[i].AddressID;
                        objCVarvwInvoices.CityID = objCvwAccNote_INVReport.lstCVarvwAccNote_INVReport[i].CityID;
                        objCVarvwInvoices.CityName = objCvwAccNote_INVReport.lstCVarvwAccNote_INVReport[i].CityName;
                        objCVarvwInvoices.CountryID = objCvwAccNote_INVReport.lstCVarvwAccNote_INVReport[i].CountryID;
                        objCVarvwInvoices.CountryName = objCvwAccNote_INVReport.lstCVarvwAccNote_INVReport[i].CountryName;
                        objCVarvwInvoices.StreetLine1 = objCvwAccNote_INVReport.lstCVarvwAccNote_INVReport[i].StreetLine1;
                        objCVarvwInvoices.StreetLine2 = objCvwAccNote_INVReport.lstCVarvwAccNote_INVReport[i].StreetLine2;
                        objCVarvwInvoices.AddressTypeID = objCvwAccNote_INVReport.lstCVarvwAccNote_INVReport[i].AddressTypeID;
                        objCVarvwInvoices.PrintedAddress = objCvwAccNote_INVReport.lstCVarvwAccNote_INVReport[i].PrintedAddress;
                        objCVarvwInvoices.CurrencyID = objCvwAccNote_INVReport.lstCVarvwAccNote_INVReport[i].CurrencyID;
                        objCVarvwInvoices.CurrencyCode = objCvwAccNote_INVReport.lstCVarvwAccNote_INVReport[i].CurrencyCode;
                        objCVarvwInvoices.MasterDataExchangeRate = objCvwAccNote_INVReport.lstCVarvwAccNote_INVReport[i].MasterDataExchangeRate;
                        objCVarvwInvoices.ExchangeRate = objCvwAccNote_INVReport.lstCVarvwAccNote_INVReport[i].ExchangeRate;
                        objCVarvwInvoices.AmountWithoutVAT = objCvwAccNote_INVReport.lstCVarvwAccNote_INVReport[i].NoteType == 100 //Credit
                            ? -1 * objCvwAccNote_INVReport.lstCVarvwAccNote_INVReport[i].AmountWithoutVAT
                            : objCvwAccNote_INVReport.lstCVarvwAccNote_INVReport[i].AmountWithoutVAT;
                        objCVarvwInvoices.TaxTypeID = objCvwAccNote_INVReport.lstCVarvwAccNote_INVReport[i].TaxTypeID;
                        objCVarvwInvoices.TaxTypeName = objCvwAccNote_INVReport.lstCVarvwAccNote_INVReport[i].TaxTypeName;
                        objCVarvwInvoices.TaxPercentage = objCvwAccNote_INVReport.lstCVarvwAccNote_INVReport[i].TaxPercentage;
                        objCVarvwInvoices.TaxAmount = objCvwAccNote_INVReport.lstCVarvwAccNote_INVReport[i].NoteType == 100 //Credit
                            ? -1 * objCvwAccNote_INVReport.lstCVarvwAccNote_INVReport[i].TaxAmount
                            : objCvwAccNote_INVReport.lstCVarvwAccNote_INVReport[i].TaxAmount;
                        objCVarvwInvoices.VATFromItems = objCvwAccNote_INVReport.lstCVarvwAccNote_INVReport[i].NoteType == 100 //Credit
                            ? -1 * objCvwAccNote_INVReport.lstCVarvwAccNote_INVReport[i].TaxAmount
                            : objCvwAccNote_INVReport.lstCVarvwAccNote_INVReport[i].TaxAmount;
                        objCVarvwInvoices.DiscountTypeID = objCvwAccNote_INVReport.lstCVarvwAccNote_INVReport[i].DiscountTypeID;
                        objCVarvwInvoices.DiscountTypeName = objCvwAccNote_INVReport.lstCVarvwAccNote_INVReport[i].DiscountTypeName;
                        objCVarvwInvoices.DiscountPercentage = objCvwAccNote_INVReport.lstCVarvwAccNote_INVReport[i].DiscountPercentage;
                        objCVarvwInvoices.DiscountAmount = objCvwAccNote_INVReport.lstCVarvwAccNote_INVReport[i].NoteType == 100 //Credit
                            ? -1 * objCvwAccNote_INVReport.lstCVarvwAccNote_INVReport[i].DiscountAmount
                            : objCvwAccNote_INVReport.lstCVarvwAccNote_INVReport[i].DiscountAmount;
                        objCVarvwInvoices.DiscountFromItems = objCvwAccNote_INVReport.lstCVarvwAccNote_INVReport[i].NoteType == 100 //Credit
                            ? -1 * objCvwAccNote_INVReport.lstCVarvwAccNote_INVReport[i].DiscountAmount
                            : objCvwAccNote_INVReport.lstCVarvwAccNote_INVReport[i].DiscountAmount;
                        objCVarvwInvoices.Amount = objCvwAccNote_INVReport.lstCVarvwAccNote_INVReport[i].NoteType == 100 //Credit
                            ? -1 * objCvwAccNote_INVReport.lstCVarvwAccNote_INVReport[i].Amount
                            : objCvwAccNote_INVReport.lstCVarvwAccNote_INVReport[i].Amount;
                        if (objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName == "ILS" || objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName == "ILSEG")
                        {
                            if (objCvwAccNote_INVReport.lstCVarvwAccNote_INVReport[i].NoteType == 100) //credit -> payables
                            {
                                var P = new CPayables();
                                P.GetList($"WHERE AccNoteID={objCvwAccNote_INVReport.lstCVarvwAccNote_INVReport[i].ID}");
                                objCVarvwInvoices.VATFromItems = -1 * (P.lstCVarPayables.Sum(p => p.TaxAmount));
                                objCVarvwInvoices.TaxAmount = -1 * (P.lstCVarPayables.Sum(p => p.TaxAmount));
                                objCVarvwInvoices.DiscountFromItems = -1 * (P.lstCVarPayables.Sum(p => p.DiscountAmount));
                                objCVarvwInvoices.DiscountAmount = -1 * (P.lstCVarPayables.Sum(p => p.DiscountAmount));
                                objCVarvwInvoices.AmountWithoutVAT = -1 * (P.lstCVarPayables.Sum(p => p.AmountWithoutVAT));
                                objCVarvwInvoices.Amount = -1 * (P.lstCVarPayables.Sum(p => p.CostAmount));

                            }
                            else if (objCvwAccNote_INVReport.lstCVarvwAccNote_INVReport[i].NoteType == 90) // debit -> receivables
                            {
                                var R = new CReceivables();
                                R.GetList($"WHERE AccNoteID={objCvwAccNote_INVReport.lstCVarvwAccNote_INVReport[i].ID}");
                                objCVarvwInvoices.VATFromItems = R.lstCVarReceivables.Sum(p => p.TaxAmount);
                                objCVarvwInvoices.TaxAmount = R.lstCVarReceivables.Sum(p => p.TaxAmount);
                                objCVarvwInvoices.DiscountFromItems = R.lstCVarReceivables.Sum(p => p.DiscountAmount);
                                objCVarvwInvoices.DiscountAmount = R.lstCVarReceivables.Sum(p => p.DiscountAmount);
                                objCVarvwInvoices.AmountWithoutVAT = R.lstCVarReceivables.Sum(p => p.AmountWithoutVAT);
                                objCVarvwInvoices.Amount = R.lstCVarReceivables.Sum(p => p.SaleAmount);
                            }
                        }
                        objCVarvwInvoices.PaidAmount = objCvwAccNote_INVReport.lstCVarvwAccNote_INVReport[i].PaidAmount;
                        objCVarvwInvoices.RemainingAmount = objCvwAccNote_INVReport.lstCVarvwAccNote_INVReport[i].RemainingAmount;
                        objCVarvwInvoices.InvoiceDate = objCvwAccNote_INVReport.lstCVarvwAccNote_INVReport[i].NoteDate;
                        objCVarvwInvoices.DueDate = objCvwAccNote_INVReport.lstCVarvwAccNote_INVReport[i].NoteDate;
                        objCVarvwInvoices.IsApproved = objCvwAccNote_INVReport.lstCVarvwAccNote_INVReport[i].IsApproved;
                        objCVarvwInvoices.IsDeleted = objCvwAccNote_INVReport.lstCVarvwAccNote_INVReport[i].IsDeleted;
                        objCVarvwInvoices.ApprovingUserID = objCvwAccNote_INVReport.lstCVarvwAccNote_INVReport[i].ApprovingUserID;
                        objCVarvwInvoices.ApprovingUserName = objCvwAccNote_INVReport.lstCVarvwAccNote_INVReport[i].ApprovingUserName;
                        objCVarvwInvoices.CreatorUserID = objCvwAccNote_INVReport.lstCVarvwAccNote_INVReport[i].CreatorUserID;
                        objCVarvwInvoices.CreatorName = objCvwAccNote_INVReport.lstCVarvwAccNote_INVReport[i].CreatorName;
                        objCVarvwInvoices.CreationDate = objCvwAccNote_INVReport.lstCVarvwAccNote_INVReport[i].CreationDate;
                        objCVarvwInvoices.ModificatorUserID = objCvwAccNote_INVReport.lstCVarvwAccNote_INVReport[i].ModificatorUserID;
                        objCVarvwInvoices.ModificatorName = objCvwAccNote_INVReport.lstCVarvwAccNote_INVReport[i].ModificatorName;
                        objCVarvwInvoices.ModificationDate = objCvwAccNote_INVReport.lstCVarvwAccNote_INVReport[i].ModificationDate;

                        objCVarvwInvoices.CustomerReference = "";
                        objCVarvwInvoices.OperationOpenDate = DateTime.Parse("01/01/1900");



                        if (CompanyName == "SEF")
                        {
                            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
                            string _PaymentDate = objCCustomizedDBCall.CallStringFunction($"SELECT TOP 1 FORMAT(VoucherDate, 'dd/MM/yyyy') FROM A_Voucher v  JOIN A_VoucherInvoicesPayment I  ON v.Id = I.VoucherID  WHERE I.InvoiceID = {objCVarvwInvoices.ID} ORDER BY VoucherDate;\r\n");
                            if (!(_PaymentDate == "" || _PaymentDate == null))
                                objCVarvwInvoices.PaymentDate = DateTime.Parse(_PaymentDate);
                        }
                        else
                            objCVarvwInvoices.PaymentDate = DateTime.Parse("01/01/1900");
                        objCvwInvoices.lstCVarvwInvoicesForReports.Add(objCVarvwInvoices);
                    }
                }
                else
                {

                    for (int i = 0; i < objCvwAccNote.lstCVarvwAccNote.Count && (pIsAddNotes || pIsAddAllNotes); i++)
                {
                    if(!pIsAddAllNotes && objCvwAccNote.lstCVarvwAccNote[i].NoteType == 90) // Debit
                    {
                        continue;
                    }
                    CVarvwInvoicesForReports objCVarvwInvoices = new CVarvwInvoicesForReports();
                    objCVarvwInvoices.ID = pIsAddAllNotes ? objCvwAccNote.lstCVarvwAccNote[i].ID : objCvwAccNote.lstCVarvwAccNote[i].InvoiceID;
                    objCVarvwInvoices.InvoiceNumber = objCvwAccNote.lstCVarvwAccNote[i].CodeSerial;
                    objCVarvwInvoices.InvoiceTypeID = 0; //objCvwAccNote.lstCVarvwAccNote[i].NoteType;
                    objCVarvwInvoices.InvoiceTypeCode = objCvwAccNote.lstCVarvwAccNote[i].NoteTypeName;
                    objCVarvwInvoices.InvoiceTypeName = objCvwAccNote.lstCVarvwAccNote[i].NoteTypeName;
                    objCVarvwInvoices.ConcatenatedInvoiceNumber = objCvwAccNote.lstCVarvwAccNote[i].Code;
                    objCVarvwInvoices.Code = objCvwAccNote.lstCVarvwAccNote[i].Code;
                    objCVarvwInvoices.OperationID = objCvwAccNote.lstCVarvwAccNote[i].OperationID;
                    objCVarvwInvoices.OperationCode = objCvwAccNote.lstCVarvwAccNote[i].OperationCode;
                    objCVarvwInvoices.MasterBL = objCvwAccNote.lstCVarvwAccNote[i].MasterBL;
                    objCVarvwInvoices.HouseNumber = objCvwAccNote.lstCVarvwAccNote[i].HouseNumber;
                    objCVarvwInvoices.BranchID = objCvwAccNote.lstCVarvwAccNote[i].BranchID;
                    objCVarvwInvoices.MasterOperationID = objCvwAccNote.lstCVarvwAccNote[i].MasterOperationID;
                    objCVarvwInvoices.MasterOperationCode = objCvwAccNote.lstCVarvwAccNote[i].MasterOperationCode;
                    objCVarvwInvoices.OperationPartnerID = objCvwAccNote.lstCVarvwAccNote[i].OperationPartnerID;
                    objCVarvwInvoices.PartnerTypeID = objCvwAccNote.lstCVarvwAccNote[i].PartnerTypeID;
                    objCVarvwInvoices.PartnerTypeCode = objCvwAccNote.lstCVarvwAccNote[i].PartnerTypeCode;
                    objCVarvwInvoices.PartnerID = objCvwAccNote.lstCVarvwAccNote[i].PartnerID;
                    objCVarvwInvoices.PartnerName = objCvwAccNote.lstCVarvwAccNote[i].PartnerName;
                    objCVarvwInvoices.InvoiceStatus = objCvwAccNote.lstCVarvwAccNote[i].NoteStatus;
                    objCVarvwInvoices.AddressID = objCvwAccNote.lstCVarvwAccNote[i].AddressID;
                    objCVarvwInvoices.CityID = objCvwAccNote.lstCVarvwAccNote[i].CityID;
                    objCVarvwInvoices.CityName = objCvwAccNote.lstCVarvwAccNote[i].CityName;
                    objCVarvwInvoices.CountryID = objCvwAccNote.lstCVarvwAccNote[i].CountryID;
                    objCVarvwInvoices.CountryName = objCvwAccNote.lstCVarvwAccNote[i].CountryName;
                    objCVarvwInvoices.StreetLine1 = objCvwAccNote.lstCVarvwAccNote[i].StreetLine1;
                    objCVarvwInvoices.StreetLine2 = objCvwAccNote.lstCVarvwAccNote[i].StreetLine2;
                    objCVarvwInvoices.AddressTypeID = objCvwAccNote.lstCVarvwAccNote[i].AddressTypeID;
                    objCVarvwInvoices.PrintedAddress = objCvwAccNote.lstCVarvwAccNote[i].PrintedAddress;
                    objCVarvwInvoices.CurrencyID = objCvwAccNote.lstCVarvwAccNote[i].CurrencyID;
                    objCVarvwInvoices.CurrencyCode = objCvwAccNote.lstCVarvwAccNote[i].CurrencyCode;
                    objCVarvwInvoices.MasterDataExchangeRate = objCvwAccNote.lstCVarvwAccNote[i].MasterDataExchangeRate;
                    objCVarvwInvoices.ExchangeRate = objCvwAccNote.lstCVarvwAccNote[i].ExchangeRate;
                    objCVarvwInvoices.AmountWithoutVAT = objCvwAccNote.lstCVarvwAccNote[i].NoteType == 100 //Credit
                        ? -1 * objCvwAccNote.lstCVarvwAccNote[i].AmountWithoutVAT
                        : objCvwAccNote.lstCVarvwAccNote[i].AmountWithoutVAT;
                    objCVarvwInvoices.TaxTypeID = objCvwAccNote.lstCVarvwAccNote[i].TaxTypeID;
                    objCVarvwInvoices.TaxTypeName = objCvwAccNote.lstCVarvwAccNote[i].TaxTypeName;
                    objCVarvwInvoices.TaxPercentage = objCvwAccNote.lstCVarvwAccNote[i].TaxPercentage;
                    objCVarvwInvoices.TaxAmount = objCvwAccNote.lstCVarvwAccNote[i].NoteType == 100 //Credit
                        ? -1 * objCvwAccNote.lstCVarvwAccNote[i].TaxAmount
                        : objCvwAccNote.lstCVarvwAccNote[i].TaxAmount;
                    objCVarvwInvoices.VATFromItems = objCvwAccNote.lstCVarvwAccNote[i].NoteType == 100 //Credit
                        ? -1 * objCvwAccNote.lstCVarvwAccNote[i].TaxAmount
                        : objCvwAccNote.lstCVarvwAccNote[i].TaxAmount;
                    objCVarvwInvoices.DiscountTypeID = objCvwAccNote.lstCVarvwAccNote[i].DiscountTypeID;
                    objCVarvwInvoices.DiscountTypeName = objCvwAccNote.lstCVarvwAccNote[i].DiscountTypeName;
                    objCVarvwInvoices.DiscountPercentage = objCvwAccNote.lstCVarvwAccNote[i].DiscountPercentage;
                    objCVarvwInvoices.DiscountAmount = objCvwAccNote.lstCVarvwAccNote[i].NoteType == 100 //Credit
                        ? -1 * objCvwAccNote.lstCVarvwAccNote[i].DiscountAmount
                        : objCvwAccNote.lstCVarvwAccNote[i].DiscountAmount;
                    objCVarvwInvoices.DiscountFromItems = objCvwAccNote.lstCVarvwAccNote[i].NoteType == 100 //Credit
                        ? -1 * objCvwAccNote.lstCVarvwAccNote[i].DiscountAmount
                        : objCvwAccNote.lstCVarvwAccNote[i].DiscountAmount;
                    objCVarvwInvoices.Amount = objCvwAccNote.lstCVarvwAccNote[i].NoteType == 100 //Credit
                        ? -1 * objCvwAccNote.lstCVarvwAccNote[i].Amount
                        : objCvwAccNote.lstCVarvwAccNote[i].Amount;
                    if (objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName == "ILS" || objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName == "ILSEG")
                    {
                        if (objCvwAccNote.lstCVarvwAccNote[i].NoteType == 100) //credit -> payables
                        {
                            var P = new CPayables();
                            P.GetList($"WHERE AccNoteID={objCvwAccNote.lstCVarvwAccNote[i].ID}");
                            objCVarvwInvoices.VATFromItems = -1 * (P.lstCVarPayables.Sum(p => p.TaxAmount));
                            objCVarvwInvoices.TaxAmount = -1 * (P.lstCVarPayables.Sum(p => p.TaxAmount));
                            objCVarvwInvoices.DiscountFromItems = -1 * (P.lstCVarPayables.Sum(p => p.DiscountAmount));
                            objCVarvwInvoices.DiscountAmount = -1 * (P.lstCVarPayables.Sum(p => p.DiscountAmount));
                            objCVarvwInvoices.AmountWithoutVAT = -1 * (P.lstCVarPayables.Sum(p => p.AmountWithoutVAT));
                            objCVarvwInvoices.Amount = -1 * (P.lstCVarPayables.Sum(p => p.CostAmount));

                        }
                        else if (objCvwAccNote.lstCVarvwAccNote[i].NoteType == 90) // debit -> receivables
                        {
                            var R = new CReceivables();
                            R.GetList($"WHERE AccNoteID={objCvwAccNote.lstCVarvwAccNote[i].ID}");
                            objCVarvwInvoices.VATFromItems = R.lstCVarReceivables.Sum(p => p.TaxAmount);
                            objCVarvwInvoices.TaxAmount = R.lstCVarReceivables.Sum(p => p.TaxAmount);
                            objCVarvwInvoices.DiscountFromItems = R.lstCVarReceivables.Sum(p => p.DiscountAmount);
                            objCVarvwInvoices.DiscountAmount = R.lstCVarReceivables.Sum(p => p.DiscountAmount);
                            objCVarvwInvoices.AmountWithoutVAT =R.lstCVarReceivables.Sum(p => p.AmountWithoutVAT);
                            objCVarvwInvoices.Amount = R.lstCVarReceivables.Sum(p => p.SaleAmount);
                        }
                    }
                    objCVarvwInvoices.PaidAmount = objCvwAccNote.lstCVarvwAccNote[i].PaidAmount;
                    objCVarvwInvoices.RemainingAmount = objCvwAccNote.lstCVarvwAccNote[i].RemainingAmount;
                    objCVarvwInvoices.InvoiceDate = objCvwAccNote.lstCVarvwAccNote[i].NoteDate;
                    objCVarvwInvoices.DueDate = objCvwAccNote.lstCVarvwAccNote[i].NoteDate;
                    objCVarvwInvoices.IsApproved = objCvwAccNote.lstCVarvwAccNote[i].IsApproved;
                    objCVarvwInvoices.IsDeleted = objCvwAccNote.lstCVarvwAccNote[i].IsDeleted;
                    objCVarvwInvoices.ApprovingUserID = objCvwAccNote.lstCVarvwAccNote[i].ApprovingUserID;
                    objCVarvwInvoices.ApprovingUserName = objCvwAccNote.lstCVarvwAccNote[i].ApprovingUserName;
                    objCVarvwInvoices.CreatorUserID = objCvwAccNote.lstCVarvwAccNote[i].CreatorUserID;
                    objCVarvwInvoices.CreatorName = objCvwAccNote.lstCVarvwAccNote[i].CreatorName;
                    objCVarvwInvoices.CreationDate = objCvwAccNote.lstCVarvwAccNote[i].CreationDate;
                    objCVarvwInvoices.ModificatorUserID = objCvwAccNote.lstCVarvwAccNote[i].ModificatorUserID;
                    objCVarvwInvoices.ModificatorName = objCvwAccNote.lstCVarvwAccNote[i].ModificatorName;
                    objCVarvwInvoices.ModificationDate = objCvwAccNote.lstCVarvwAccNote[i].ModificationDate;

                    objCVarvwInvoices.CustomerReference = "";
                    objCVarvwInvoices.OperationOpenDate = DateTime.Parse("01/01/1900");



                    if(CompanyName == "SEF")
                    {
                        CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
                        string _PaymentDate = objCCustomizedDBCall.CallStringFunction($"SELECT TOP 1 FORMAT(VoucherDate, 'dd/MM/yyyy') FROM A_Voucher v  JOIN A_VoucherInvoicesPayment I  ON v.Id = I.VoucherID  WHERE I.InvoiceID = {objCVarvwInvoices.ID} ORDER BY VoucherDate;\r\n");
                        if (!(_PaymentDate == "" || _PaymentDate == null))
                            objCVarvwInvoices.PaymentDate = DateTime.Parse(_PaymentDate);
                    }
                    else
                    objCVarvwInvoices.PaymentDate = DateTime.Parse("01/01/1900");
                    objCvwInvoices.lstCVarvwInvoicesForReports.Add(objCVarvwInvoices);
                }
                }

                #endregion Merge AccNote to Invoices

                if (objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName == "SEF")
                    {
                    for (int i = 0; i < objCvwInvoices.lstCVarvwInvoicesForReports.Count; i++)
                    {
                        CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
                        string _PaymentDate = objCCustomizedDBCall.CallStringFunction($"SELECT TOP 1 FORMAT(VoucherDate, 'dd-MM-yyyy') FROM A_Voucher v  JOIN A_VoucherInvoicesPayment I  ON v.Id = I.VoucherID  WHERE I.InvoiceID = {objCvwInvoices.lstCVarvwInvoicesForReports[i].ID} ORDER BY VoucherDate;\r\n");//
                        //if (!(_PaymentDate == "" || _PaymentDate == null))
                        //{
                        //    objCvwInvoices.lstCVarvwInvoices[i].PaymentDate = DateTime.Parse(_PaymentDate);
                        //}
                        if (!string.IsNullOrEmpty(_PaymentDate))
                        {
                            DateTime paymentDate;
                            if (DateTime.TryParse(_PaymentDate, out paymentDate))
                            {
                                objCvwInvoices.lstCVarvwInvoicesForReports[i].PaymentDate = paymentDate;
                            }
                        }

                    }
                }




                #region AgingPerClient
                var pAgingPerClientList_BeforeGrouping = objCvwInvoices.lstCVarvwInvoicesForReports
                    //.GroupBy(g => new { g.PartnerName, g.CurrencyID })
                    .Select(s => new {
                        PartnerName = s.PartnerName
                        ,
                        CurrencyCode = pCurrencyID == 0 && pIsAgingPerClient ? "" : s.CurrencyCode //if no currency selected then convert to default
                        ,
                        ZeroToThirty = (DateTime.Today - s.DueDate).Days >= 0 && (DateTime.Today - s.DueDate).Days < 30
                                        ? pCurrencyID == 0 && pIsAgingPerClient ? s.RemainingAmount * s.ExchangeRate : s.RemainingAmount
                                        : 0
                        ,
                        PaidAmount = pCurrencyID > 0 && pIsAgingPerClient ? s.PaidAmount : s.PaidAmount * s.ExchangeRate
                        ,
                        RemainingAmount = pCurrencyID == 0 && pIsAgingPerClient ? s.RemainingAmount * s.ExchangeRate : s.RemainingAmount
                        ,
                        ThirtyOneToSixty = (DateTime.Today - s.DueDate).Days >= 30 && (DateTime.Today - s.DueDate).Days < 60
                                        ? pCurrencyID == 0 && pIsAgingPerClient ? s.RemainingAmount * s.ExchangeRate : s.RemainingAmount
                                        : 0
                        ,
                        SixtyOneToNinty = (DateTime.Today - s.DueDate).Days >= 60 && (DateTime.Today - s.DueDate).Days < 90
                                        ? pCurrencyID == 0 && pIsAgingPerClient ? s.RemainingAmount * s.ExchangeRate : s.RemainingAmount
                                        : 0
                        ,
                        Later = (DateTime.Today - s.DueDate).Days >= 90
                                        ? pCurrencyID == 0 && pIsAgingPerClient ? s.RemainingAmount * s.ExchangeRate : s.RemainingAmount
                                        : 0
                        ,
                        NotDue = (DateTime.Today - s.DueDate).Days < 0
                                        ? pCurrencyID == 0 && pIsAgingPerClient ? s.RemainingAmount * s.ExchangeRate : s.RemainingAmount
                                        : 0
                    }).ToList();
                var pAgingPerClientList = pAgingPerClientList_BeforeGrouping
                    .GroupBy(g => new { g.PartnerName, g.CurrencyCode })
                    .Select(s => new {
                        PartnerName = s.First().PartnerName
                        ,
                        CurrencyCode = s.First().CurrencyCode
                        ,
                        RemainingAmount = s.Sum(i => i.RemainingAmount)
                        ,
                        PaidAmount = s.Sum(i => i.PaidAmount)
                        ,
                        ZeroToThirty = s.Sum(i => i.ZeroToThirty)
                        ,
                        ThirtyOneToSixty = s.Sum(i => i.ThirtyOneToSixty)
                        ,
                        SixtyOneToNinty = s.Sum(i => i.SixtyOneToNinty)
                        ,
                        Later = s.Sum(i => i.Later)
                        ,
                        NotDue = s.Sum(i => i.NotDue)
                    }).ToList();
                var pDistinctClientsList = pAgingPerClientList
                    .Select(s => new
                    {
                        PartnerName = s.PartnerName
                    }).Distinct();
                #endregion AgingPerClient

                if ((objCvwInvoices.lstCVarvwInvoicesForReports.Count > 0 || objCvwInvoicesForMesco.lstCVarvwInvoicesForMesco.Count > 0) && checkException == null)
                    pRecordsExist = true;

                var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
                return new object[]
                {
                pRecordsExist
                ,pIsAddFleetInvoice ?  serializer.Serialize(objCvwInvoicesForMesco.lstCVarvwInvoicesForMesco)  : serializer.Serialize(objCvwInvoices.lstCVarvwInvoicesForReports) //pData[1]
                , serializer.Serialize(objCvwReceivables.lstCVarvwReceivables) //pData[2]
                ,pIsAddFleetInvoice ? serializer.Serialize(objCvwInvoicesForMesco.lstCVarvwInvoicesForMesco.DistinctBy(x=> x.PartnerID).ToList())  :  serializer.Serialize(objCvwInvoices.lstCVarvwInvoicesForReports.DistinctBy(x=> x.PartnerID).ToList()) //pData[3]
                , pIsAgingPerClient || pIsAgingPerClient_AllCurrency ? serializer.Serialize(pAgingPerClientList) : null //pData[4]
                , pIsAgingPerClient_AllCurrency ? serializer.Serialize(pDistinctClientsList) : null //Data[5]
                , serializer.Serialize(objAllocationInvoices.lstCVarA_AllocationInvoicesWithVoucher_Invoices) //Data[6]
                };
            }

            
        }

        [HttpGet, HttpPost]
        public object[] LoadData_TaxationOfSales(string pWhereClauseTaxationOfSales, string pWhereClause_AccNote)
        {
            // var par = "0";
            bool pRecordsExist = false;
            Int32 _RowCount = 0;
            int constTransactionCreditNote = 100;

            Exception checkException = null;
            CDefaults objCDefaults = new CDefaults();
            objCDefaults.GetListPaging(1, 1, "", "ID", out _RowCount);
            CvwInvoicesTaxationOfSales objCvwInvoicesTaxationOfSales = new CvwInvoicesTaxationOfSales();
            CvwInvoicesTaxationOfSales_TaxOnItems objCvwInvoicesTaxationOfSales_TaxOnItems = new CvwInvoicesTaxationOfSales_TaxOnItems();
            CvwAccNote objCvwAccNote = new CvwAccNote();

            if (objCDefaults.lstCVarDefaults[0].IsTaxOnItems)
                checkException = objCvwInvoicesTaxationOfSales_TaxOnItems.GetListPaging(99999, 1, pWhereClauseTaxationOfSales, "BranchName, InvoiceNumber", out _RowCount);
            else
                checkException = objCvwInvoicesTaxationOfSales.GetListPaging(99999, 1, pWhereClauseTaxationOfSales, "BranchName, InvoiceNumber", out _RowCount);

            #region TaxOnItems
            var pReportRows_TaxOnItems = objCvwInvoicesTaxationOfSales_TaxOnItems.lstCVarvwInvoicesTaxationOfSales_TaxOnItems
                .GroupBy(g => new
                {
                    g.DocumentTypeNO,
                    g.TaxTypeNO,
                    g.ItemTypeNO,
                    g.InvoiceNumber,
                    g.PartnerName,
                    g.VATNumber,
                    g.TaxIdentificationNumber,
                    g.Address,
                    g.CustomerPhone,
                    g.InvoiceDate,
                    g.InvoiceTypeName,
                    g.StatementTypeNO,
                    g.ExchangeRate,
                    g.TaxPercentage,
                    g.TaxeTypeID,
                    g.HouseNumber,
                    g.CurrencyCode
                })
                .Select(s => new
                {
                    DocumentTypeNO = s.First().DocumentTypeNO
                    ,
                    TaxTypeNO = s.First().TaxTypeNO
                    ,
                    ItemTypeNO = s.First().ItemTypeNO
                    ,
                    InvoiceNumber = s.First().InvoiceNumber
                    ,
                    PartnerName = s.First().PartnerName
                    ,
                    VATNumber = s.First().VATNumber
                    ,
                    TaxIdentificationNumber = s.First().TaxIdentificationNumber
                    ,
                    Address = s.First().Address
                    ,
                    CustomerPhone = s.First().CustomerPhone
                    ,
                    InvoiceDate = s.First().InvoiceDate
                    ,
                    InvoiceTypeName = s.First().InvoiceTypeName
                    ,
                    StatementTypeNO = s.First().StatementTypeNO
                    ,
                    ExchangeRate = s.First().ExchangeRate
                    ,
                    AmountWithoutVAT = s.Sum(i => i.AmountWithoutVAT)
                    ,
                    TaxPercentage = s.First().TaxPercentage
                    ,
                    TaxAmount = s.Sum(i => i.TaxAmount)
                    ,
                    DiscountAmount = s.Sum(i => i.DiscountAmount)
                    ,
                    Amount = s.Sum(i => i.Amount)
                    ,
                    HouseNumber = s.First().HouseNumber
                     ,
                    ReceiptCode = s.First().ReceiptCode
                    ,
                    TotalVoucher = s.Sum(i => i.TotalVoucher)
                     ,
                    ReferenceNo = s.First().ReferenceNo
                     ,
                    Diff = s.Sum(i => i.Diff)
                     ,
                    CurrencyCode = s.First().CurrencyCode
                    ,
                    StreetLine1 = s.First().StreetLine1
                }).ToList();
            #endregion TaxOnItems
            
            #region Add Credit Notes
            if (objCDefaults.lstCVarDefaults[0].UnEditableCompanyName == "COS")
            {
                checkException = objCvwAccNote.GetListPaging(99999, 1, pWhereClause_AccNote + " AND NoteType=" + constTransactionCreditNote, "ID", out _RowCount);
                for (int i =0; i <objCvwAccNote.lstCVarvwAccNote.Count; i++)
                {
                    CVarvwInvoicesTaxationOfSales objCVarvwInvoicesTaxationOfSales = new CVarvwInvoicesTaxationOfSales();
                    objCVarvwInvoicesTaxationOfSales.DocumentTypeNO = 1;
                    objCVarvwInvoicesTaxationOfSales.ItemTypeNO = objCvwAccNote.lstCVarvwAccNote[i].TaxPercentage == 14 ? 2 : 1;
                    objCVarvwInvoicesTaxationOfSales.InvoiceNumber = objCvwAccNote.lstCVarvwAccNote[i].CodeSerial;
                    objCVarvwInvoicesTaxationOfSales.PartnerName = objCvwAccNote.lstCVarvwAccNote[i].PartnerName;
                    objCVarvwInvoicesTaxationOfSales.VATNumber = objCvwAccNote.lstCVarvwAccNote[i].VATNumber;
                    objCVarvwInvoicesTaxationOfSales.TaxIdentificationNumber = objCvwAccNote.lstCVarvwAccNote[i].TaxIdentificationNumber;
                    objCVarvwInvoicesTaxationOfSales.Address = objCvwAccNote.lstCVarvwAccNote[i].Address;
                    objCVarvwInvoicesTaxationOfSales.CustomerPhone = objCvwAccNote.lstCVarvwAccNote[i].CustomerPhone;
                    objCVarvwInvoicesTaxationOfSales.InvoiceDate = objCvwAccNote.lstCVarvwAccNote[i].NoteDate;
                    objCVarvwInvoicesTaxationOfSales.InvoiceTypeName = objCvwAccNote.lstCVarvwAccNote[i].NoteTypeName;
                    objCVarvwInvoicesTaxationOfSales.StatementTypeNO = 4;
                    objCVarvwInvoicesTaxationOfSales.ExchangeRate = objCvwAccNote.lstCVarvwAccNote[i].ExchangeRate;

                    objCVarvwInvoicesTaxationOfSales.AmountWithoutVAT = objCvwAccNote.lstCVarvwAccNote[i].AmountWithoutVAT;
                    objCVarvwInvoicesTaxationOfSales.TaxPercentage = objCvwAccNote.lstCVarvwAccNote[i].TaxPercentage;
                    objCVarvwInvoicesTaxationOfSales.TaxAmount = objCvwAccNote.lstCVarvwAccNote[i].TaxAmount;

                    objCVarvwInvoicesTaxationOfSales.DiscountAmount = objCvwAccNote.lstCVarvwAccNote[i].DiscountAmount;
                    objCVarvwInvoicesTaxationOfSales.Amount = objCvwAccNote.lstCVarvwAccNote[i].Amount;
                    objCVarvwInvoicesTaxationOfSales.HouseNumber = objCvwAccNote.lstCVarvwAccNote[i].HouseNumber;
                    objCVarvwInvoicesTaxationOfSales.ReceiptCode = ""; //objCvwAccNote.lstCVarvwAccNote[i].ReceiptCode;
                    objCVarvwInvoicesTaxationOfSales.TotalVoucher = 0; //objCvwAccNote.lstCVarvwAccNote[i].TotalVoucher;
                    objCVarvwInvoicesTaxationOfSales.ReferenceNo = ""; //objCvwAccNote.lstCVarvwAccNote[i].ReferenceNo;
                    objCVarvwInvoicesTaxationOfSales.Diff = 0; //objCvwAccNote.lstCVarvwAccNote[i].Diff;



                    //objCVarvwInvoicesTaxationOfSales.ID = objCvwAccNote.lstCVarvwAccNote[i].ID;
                    //objCVarvwInvoicesTaxationOfSales.InvoiceNumber = objCvwAccNote.lstCVarvwAccNote[i].CodeSerial;
                    //objCVarvwInvoicesTaxationOfSales.InvoiceTypeID = 0; //objCvwAccNote.lstCVarvwAccNote[i].NoteType;
                    //objCVarvwInvoicesTaxationOfSales.InvoiceTypeCode = objCvwAccNote.lstCVarvwAccNote[i].NoteTypeName;
                    //objCVarvwInvoicesTaxationOfSales.InvoiceTypeName = objCvwAccNote.lstCVarvwAccNote[i].NoteTypeName;
                    //objCVarvwInvoicesTaxationOfSales.Code = objCvwAccNote.lstCVarvwAccNote[i].Code;
                    //objCVarvwInvoicesTaxationOfSales.OperationID = objCvwAccNote.lstCVarvwAccNote[i].OperationID;
                    //objCVarvwInvoicesTaxationOfSales.OperationCode = objCvwAccNote.lstCVarvwAccNote[i].OperationCode;
                    //objCVarvwInvoicesTaxationOfSales.MasterBL = objCvwAccNote.lstCVarvwAccNote[i].MasterBL;
                    //objCVarvwInvoicesTaxationOfSales.HouseNumber = objCvwAccNote.lstCVarvwAccNote[i].HouseNumber;
                    //objCVarvwInvoicesTaxationOfSales.BranchID = objCvwAccNote.lstCVarvwAccNote[i].BranchID;
                    //objCVarvwInvoicesTaxationOfSales.MasterOperationID = objCvwAccNote.lstCVarvwAccNote[i].MasterOperationID;
                    //objCVarvwInvoicesTaxationOfSales.MasterOperationCode = objCvwAccNote.lstCVarvwAccNote[i].MasterOperationCode;
                    //objCVarvwInvoicesTaxationOfSales.OperationPartnerID = objCvwAccNote.lstCVarvwAccNote[i].OperationPartnerID;
                    //objCVarvwInvoicesTaxationOfSales.PartnerTypeID = objCvwAccNote.lstCVarvwAccNote[i].PartnerTypeID;
                    //objCVarvwInvoicesTaxationOfSales.PartnerTypeCode = objCvwAccNote.lstCVarvwAccNote[i].PartnerTypeCode;
                    //objCVarvwInvoicesTaxationOfSales.PartnerID = objCvwAccNote.lstCVarvwAccNote[i].PartnerID;
                    //objCVarvwInvoicesTaxationOfSales.PartnerName = objCvwAccNote.lstCVarvwAccNote[i].PartnerName;
                    //objCVarvwInvoicesTaxationOfSales.InvoiceStatus = objCvwAccNote.lstCVarvwAccNote[i].NoteStatus;
                    //objCVarvwInvoicesTaxationOfSales.AddressID = objCvwAccNote.lstCVarvwAccNote[i].AddressID;
                    //objCVarvwInvoicesTaxationOfSales.CityID = objCvwAccNote.lstCVarvwAccNote[i].CityID;
                    //objCVarvwInvoicesTaxationOfSales.CityName = objCvwAccNote.lstCVarvwAccNote[i].CityName;
                    //objCVarvwInvoicesTaxationOfSales.CountryID = objCvwAccNote.lstCVarvwAccNote[i].CountryID;
                    //objCVarvwInvoicesTaxationOfSales.CountryName = objCvwAccNote.lstCVarvwAccNote[i].CountryName;
                    //objCVarvwInvoicesTaxationOfSales.StreetLine1 = objCvwAccNote.lstCVarvwAccNote[i].StreetLine1;
                    //objCVarvwInvoicesTaxationOfSales.StreetLine2 = objCvwAccNote.lstCVarvwAccNote[i].StreetLine2;
                    //objCVarvwInvoicesTaxationOfSales.AddressTypeID = objCvwAccNote.lstCVarvwAccNote[i].AddressTypeID;
                    //objCVarvwInvoicesTaxationOfSales.PrintedAddress = objCvwAccNote.lstCVarvwAccNote[i].PrintedAddress;
                    //objCVarvwInvoicesTaxationOfSales.CurrencyID = objCvwAccNote.lstCVarvwAccNote[i].CurrencyID;
                    objCVarvwInvoicesTaxationOfSales.CurrencyCode = objCvwAccNote.lstCVarvwAccNote[i].CurrencyCode;
                    //objCVarvwInvoicesTaxationOfSales.MasterDataExchangeRate = objCvwAccNote.lstCVarvwAccNote[i].MasterDataExchangeRate;
                    //objCVarvwInvoicesTaxationOfSales.ExchangeRate = objCvwAccNote.lstCVarvwAccNote[i].ExchangeRate;
                    //objCVarvwInvoicesTaxationOfSales.AmountWithoutVAT = objCvwAccNote.lstCVarvwAccNote[i].NoteType == 100 //Credit
                    //    ? -1 * objCvwAccNote.lstCVarvwAccNote[i].AmountWithoutVAT
                    //    : objCvwAccNote.lstCVarvwAccNote[i].AmountWithoutVAT;
                    //objCVarvwInvoicesTaxationOfSales.TaxTypeID = objCvwAccNote.lstCVarvwAccNote[i].TaxTypeID;
                    //objCVarvwInvoicesTaxationOfSales.TaxTypeName = objCvwAccNote.lstCVarvwAccNote[i].TaxTypeName;
                    //objCVarvwInvoicesTaxationOfSales.TaxPercentage = objCvwAccNote.lstCVarvwAccNote[i].TaxPercentage;
                    //objCVarvwInvoicesTaxationOfSales.TaxAmount = objCvwAccNote.lstCVarvwAccNote[i].NoteType == 100 //Credit
                    //    ? -1 * objCvwAccNote.lstCVarvwAccNote[i].TaxAmount
                    //    : objCvwAccNote.lstCVarvwAccNote[i].TaxAmount;
                    //objCVarvwInvoicesTaxationOfSales.DiscountTypeID = objCvwAccNote.lstCVarvwAccNote[i].DiscountTypeID;
                    //objCVarvwInvoicesTaxationOfSales.DiscountTypeName = objCvwAccNote.lstCVarvwAccNote[i].DiscountTypeName;
                    //objCVarvwInvoicesTaxationOfSales.DiscountPercentage = objCvwAccNote.lstCVarvwAccNote[i].DiscountPercentage;
                    //objCVarvwInvoicesTaxationOfSales.DiscountAmount = objCvwAccNote.lstCVarvwAccNote[i].NoteType == 100 //Credit
                    //    ? -1 * objCvwAccNote.lstCVarvwAccNote[i].DiscountAmount
                    //    : objCvwAccNote.lstCVarvwAccNote[i].DiscountAmount;
                    //objCVarvwInvoicesTaxationOfSales.Amount = objCvwAccNote.lstCVarvwAccNote[i].NoteType == 100 //Credit
                    //    ? -1 * objCvwAccNote.lstCVarvwAccNote[i].Amount
                    //    : objCvwAccNote.lstCVarvwAccNote[i].Amount;
                    //objCVarvwInvoicesTaxationOfSales.PaidAmount = objCvwAccNote.lstCVarvwAccNote[i].PaidAmount;
                    //objCVarvwInvoicesTaxationOfSales.RemainingAmount = objCvwAccNote.lstCVarvwAccNote[i].RemainingAmount;
                    //objCVarvwInvoicesTaxationOfSales.InvoiceDate = objCvwAccNote.lstCVarvwAccNote[i].NoteDate;
                    //objCVarvwInvoicesTaxationOfSales.DueDate = objCvwAccNote.lstCVarvwAccNote[i].NoteDate;
                    //objCVarvwInvoicesTaxationOfSales.IsApproved = objCvwAccNote.lstCVarvwAccNote[i].IsApproved;
                    //objCVarvwInvoicesTaxationOfSales.IsDeleted = objCvwAccNote.lstCVarvwAccNote[i].IsDeleted;
                    //objCVarvwInvoicesTaxationOfSales.ApprovingUserID = objCvwAccNote.lstCVarvwAccNote[i].ApprovingUserID;
                    //objCVarvwInvoicesTaxationOfSales.ApprovingUserName = objCvwAccNote.lstCVarvwAccNote[i].ApprovingUserName;
                    //objCVarvwInvoicesTaxationOfSales.CreatorUserID = objCvwAccNote.lstCVarvwAccNote[i].CreatorUserID;
                    //objCVarvwInvoicesTaxationOfSales.CreatorName = objCvwAccNote.lstCVarvwAccNote[i].CreatorName;
                    //objCVarvwInvoicesTaxationOfSales.CreationDate = objCvwAccNote.lstCVarvwAccNote[i].CreationDate;
                    //objCVarvwInvoicesTaxationOfSales.ModificatorUserID = objCvwAccNote.lstCVarvwAccNote[i].ModificatorUserID;
                    //objCVarvwInvoicesTaxationOfSales.ModificatorName = objCvwAccNote.lstCVarvwAccNote[i].ModificatorName;
                    //objCVarvwInvoicesTaxationOfSales.ModificationDate = objCvwAccNote.lstCVarvwAccNote[i].ModificationDate;

                    //objCVarvwInvoicesTaxationOfSales.CustomerReference = "";
                    //objCVarvwInvoicesTaxationOfSales.OperationOpenDate = DateTime.Parse("01/01/1900");
                    //objCVarvwInvoicesTaxationOfSales.PaymentDate = DateTime.Parse("01/01/1900");
                    objCvwInvoicesTaxationOfSales.lstCVarvwInvoicesTaxationOfSales.Add(objCVarvwInvoicesTaxationOfSales);
                }
            }
            #endregion Add Credit Notes
            if (objCvwInvoicesTaxationOfSales.lstCVarvwInvoicesTaxationOfSales.Count > 0 
                || objCvwInvoicesTaxationOfSales_TaxOnItems.lstCVarvwInvoicesTaxationOfSales_TaxOnItems.Count > 0
                || objCvwAccNote.lstCVarvwAccNote.Count > 0)
                pRecordsExist = true;

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[] {
                pRecordsExist
                , objCDefaults.lstCVarDefaults[0].IsTaxOnItems ? serializer.Serialize(pReportRows_TaxOnItems) : serializer.Serialize(objCvwInvoicesTaxationOfSales.lstCVarvwInvoicesTaxationOfSales)
            };
        }

    }
}

using Forwarding.MvcApp.Models.OperAcc.Generated;
using Forwarding.MvcApp.Models.Administration.Settings.Generated;
using Forwarding.MvcApp.Models.MasterData.BanksAccountsAndTreasuries.Generated;
using Forwarding.MvcApp.Models.MasterData.Invoicing.Generated;
using Forwarding.MvcApp.Models.MasterData.Partners.Generated;
using Forwarding.MvcApp.Models.NoAccess.Generated;
using Forwarding.MvcApp.Models.Operations.Operations.Generated;
using System;
using System.Web.Http;
using System.Web.Script.Serialization;
using System.Linq;
using MoreLinq;
using Forwarding.MvcApp.Models.MasterData.Locations.Generated;

namespace Forwarding.MvcApp.Controllers.Reports.API_AccountingReports 
{
    public class PayablesReportsController : ApiController
    {
        [HttpGet, HttpPost]//pID : is the PayableID
        public object[] FillFilter()
        {
            CvwBranches objCvwBranches = new CvwBranches();
            objCvwBranches.GetList(" WHERE 1=1 ORDER BY Name ");

            CChargeTypes objCChargeTypes = new CChargeTypes();
            objCChargeTypes.GetList(" WHERE 1=1 ORDER BY Name ");

            CvwAccPartners objCvwPartners = new CvwAccPartners();
            //objCvwPartners.GetList(" WHERE 1=1 ORDER BY PartnerTypeID, Name ");

            CTaxeTypes objCTaxTypes = new CTaxeTypes();
            objCTaxTypes.GetList(" WHERE IsDiscount=0 ORDER BY Name ");

            CTaxeTypes objCDiscountTypes = new CTaxeTypes();
            objCDiscountTypes.GetList(" WHERE IsDiscount=1 ORDER BY Name ");


            CCountries cCountries = new CCountries();
            cCountries.GetList("where 1 = 1");

            CNoAccessPartnerTypes objCNoAccessPartnerTypes = new CNoAccessPartnerTypes();
            objCNoAccessPartnerTypes.GetList(" WHERE 1=1 ");

            CShippingLines objCShippingLines = new CShippingLines();
            objCShippingLines.GetList(" Order by Name ");

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue }; 
            return new object[] { 
                new JavaScriptSerializer().Serialize(objCvwBranches.lstCVarvwBranches)//data[0]
                , serializer.Serialize(objCvwPartners.lstCVarvwAccPartners)//data[1]
                , serializer.Serialize(objCTaxTypes.lstCVarTaxeTypes)//data[2]
                , serializer.Serialize(objCDiscountTypes.lstCVarTaxeTypes)//data[3]
                , serializer.Serialize(objCChargeTypes.lstCVarChargeTypes)//data[4]
                , serializer.Serialize(objCNoAccessPartnerTypes.lstCVarNoAccessPartnerTypes)//data[5]
                   , serializer.Serialize(cCountries.lstCVarCountries)//data[6]
                   , serializer.Serialize(objCShippingLines.lstCVarShippingLines)//data[7]
            };
        }

        [HttpGet, HttpPost]
        public object[] FillPartners(Int32 pPartnerTypeID)
        {
            int _RowCount = 0;
            int constCustomerPartnerTypeID = 1;
            int constAgentPartnerTypeID = 2;
            int constShippingAgentPartnerTypeID = 3;
            int constCustomsClearanceAgentPartnerTypeID = 4;
            int constShippingLinePartnerTypeID = 5;
            int constAirlinePartnerTypeID = 6;
            int constTruckerPartnerTypeID = 7;
            int constSupplierPartnerTypeID = 8;
            int constCustodyPartnerTypeID = 20;

            if (pPartnerTypeID == constCustomerPartnerTypeID)
            {
                CvwCustomersWithMinimalColumns objCCustomers = new CvwCustomersWithMinimalColumns();
                //objCCustomers.GetListPaging(10000, 1, "WHERE 1=1", "Name", out _RowCount);
                var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue }; 
                return new object[] { serializer.Serialize(objCCustomers.lstCVarvwCustomersWithMinimalColumns) };
            }
            else if (pPartnerTypeID == constAgentPartnerTypeID)
            {
                CAgents objCAgents = new CAgents();
                objCAgents.GetListPaging(99999, 1, "WHERE 1=1", "Name", out _RowCount);
                return new object[] { new JavaScriptSerializer().Serialize(objCAgents.lstCVarAgents) };
            }
            else if (pPartnerTypeID == constShippingAgentPartnerTypeID)
            {

                CShippingAgents objCShippingAgents = new CShippingAgents();
                objCShippingAgents.GetListPaging(99999, 1, "WHERE 1=1", "Name", out _RowCount);
                return new object[] { new JavaScriptSerializer().Serialize(objCShippingAgents.lstCVarShippingAgents) };
            }
            else if (pPartnerTypeID == constCustomsClearanceAgentPartnerTypeID)
            {
                CCustomsClearanceAgents objCCustomsClearanceAgents = new CCustomsClearanceAgents();
                objCCustomsClearanceAgents.GetListPaging(99999, 1, "WHERE 1=1", "Name", out _RowCount);
                return new object[] { new JavaScriptSerializer().Serialize(objCCustomsClearanceAgents.lstCVarCustomsClearanceAgents) };
            }
            else if (pPartnerTypeID == constShippingLinePartnerTypeID)
            {
                CShippingLines objCShippingLines = new CShippingLines();
                objCShippingLines.GetListPaging(99999, 1, "WHERE 1=1", "Name", out _RowCount);
                return new object[] { new JavaScriptSerializer().Serialize(objCShippingLines.lstCVarShippingLines) };
            }
            else if (pPartnerTypeID == constAirlinePartnerTypeID)
            {
                CvwAirlinesWithMinimalColumns objCAirlines = new CvwAirlinesWithMinimalColumns();
                objCAirlines.GetListPaging(99999, 1, "WHERE 1=1", "Name", out _RowCount);
                return new object[] { new JavaScriptSerializer().Serialize(objCAirlines.lstCVarvwAirlinesWithMinimalColumns) };
            }
            else if (pPartnerTypeID == constTruckerPartnerTypeID)
            {
                CTruckers objCTruckers = new CTruckers();
                objCTruckers.GetListPaging(99999, 1, "WHERE 1=1", "Name", out _RowCount);
                return new object[] { new JavaScriptSerializer().Serialize(objCTruckers.lstCVarTruckers) };
            }
            else if (pPartnerTypeID == constSupplierPartnerTypeID)
            {
                CSuppliers objCSuppliers = new CSuppliers();
                objCSuppliers.GetListPaging(99999, 1, "WHERE 1=1", "Name", out _RowCount);
                return new object[] { new JavaScriptSerializer().Serialize(objCSuppliers.lstCVarSuppliers) };
            }
            else if (pPartnerTypeID == constCustodyPartnerTypeID)
            {
                CCustody objCCustody = new CCustody();
                objCCustody.GetListPaging(99999, 1, "WHERE 1=1", "Name", out _RowCount);
                return new object[] { new JavaScriptSerializer().Serialize(objCCustody.lstCVarCustody) };
            }
            return new object[] { };
        }

        [HttpGet, HttpPost]
        public object[] LoadData(string pWhereClause,string pWhereAccNote, bool pGroupBySuppliers , bool pOperationPayableAllocation
            , bool pIsAgingPerSupplier_AllCurrency)
        {
            bool pRecordsExist = false;
            object objGroupedPayables = null;
            Exception checkException = null;
            Int32 _RowCount = 0;

            CDefaults objCDefaults = new CDefaults();
            objCDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount); //i am sure i ve just one row isa

            CvwPayables objCvwPayables = new CvwPayables();

            if(!pOperationPayableAllocation)
               checkException = objCvwPayables.GetListPaging(999999, 1, pWhereClause, "SupplierPartnerTypeID, PartnerSupplierName, SupplierInvoiceNo", out _RowCount);

            CvwAccNote objCvwAccNote = new CvwAccNote();
            if(pWhereAccNote != "" && pWhereAccNote != null)
            checkException =  objCvwAccNote.GetListPaging(999999, 1, pWhereAccNote, "ID", out _RowCount);

            if (objCvwPayables.lstCVarvwPayables.Count > 0 && checkException == null)
                pRecordsExist = true;
             
            CvwPurchasesReport objCvwPurchasesReport = new CvwPurchasesReport();

            if (objCDefaults.lstCVarDefaults[0].UnEditableCompanyName == "MKH")
                objCvwPurchasesReport.GetListPaging(999999, 1, pWhereClause+ "And AccNoteCode is null", " PartnerSupplierID", out _RowCount);
            else
                objCvwPurchasesReport.GetListPaging(999999, 1, pWhereClause, " PartnerSupplierID", out _RowCount);

            CvwFormFourtyOne objCvwFormFourtyOne = new CvwFormFourtyOne();
            CvwFormFourtyOneWithoutOperation objCvwFormFourtyOneWithoutOperation = new CvwFormFourtyOneWithoutOperation();

            if(objCDefaults.lstCVarDefaults[0].UnEditableCompanyName == "TRM")
                checkException = objCvwFormFourtyOneWithoutOperation.GetListPaging(999999, 1, pWhereClause, " PartnerSupplierID", out _RowCount);
            else
                objCvwFormFourtyOne.GetListPaging(999999, 1, pWhereClause, " PartnerSupplierID", out _RowCount);



            CvwOperationPayablesAllocation objCvwOperationPayablesAllocation = new CvwOperationPayablesAllocation();

            #region GroupBySuppliers
            if (pGroupBySuppliers)
            {
                objGroupedPayables = objCvwPayables.lstCVarvwPayables.GroupBy(g => new { g.OperationID, g.OperationCode, g.MasterOperationCode, g.HouseNumber, g.PartnerSupplierName, g.CurrencyCode } )
                    .Select(s => new
                    {
                        OperationID = s.First().OperationID
                        ,
                        OperationCode = s.First().OperationCode
                        ,
                        MasterOperationCode = s.First().MasterOperationCode
                        ,
                        HouseNumber = s.First().HouseNumber
                        ,
                        PartnerSupplierName = s.First().PartnerSupplierName
                        ,
                        AmountWithoutVAT = s.Sum(i => i.AmountWithoutVAT)
                        ,
                        TaxAmount = s.Sum(i => i.TaxAmount)
                        ,
                        DiscountAmount = s.Sum(i => i.DiscountAmount)
                        ,
                        CostAmount = s.Sum(i => i.CostAmount)
                        ,
                        PaidAmount = s.Sum(i => i.PaidAmount)
                        ,
                        RemainingAmount = s.Sum(i => i.RemainingAmount)
                        ,
                        CurrencyCode = s.First().CurrencyCode
                    }
                    ).ToList();
            }
            #endregion GroupBySuppliers

            #region OperationPayableAllocation
            else if (pOperationPayableAllocation)
            {
                checkException = objCvwOperationPayablesAllocation.GetListPaging(999999, 1, pWhereClause, "CodeSerial,PartnerTypeID,PartnerID", out _RowCount);
                if (objCvwOperationPayablesAllocation.lstCVarvwOperationPayablesAllocation.Count > 0 && checkException == null)
                    pRecordsExist = true;
            }
            #endregion OperationPayableAllocation


            #region AgingPerSupplier
            var pAgingPerSupplierList_BeforeGrouping = objCvwPayables.lstCVarvwPayables
                //.GroupBy(g => new { g.PartnerName, g.CurrencyID })
                .Select(s => new {
                    PartnerName = s.PartnerSupplierName
                    ,
                    CurrencyCode = s.CurrencyCode //if no currency selected then convert to default
                    ,
                    ZeroToThirty = (DateTime.Today - s.EntryDate).Days >= 0 && (DateTime.Today - s.EntryDate).Days < 30
                                    ? s.RemainingAmount //pCurrencyID == 0 && pIsAgingPerSupplier_AllCurrency ? s.RemainingAmount * s.ExchangeRate : s.RemainingAmount
                                    : 0
                    ,
                    PaidAmount = s.PaidAmount //pCurrencyID > 0 && pIsAgingPerSupplier_AllCurrency ? s.PaidAmount : s.PaidAmount * s.ExchangeRate
                    ,
                    RemainingAmount = s.RemainingAmount //pCurrencyID == 0 && pIsAgingPerSupplier_AllCurrency ? s.RemainingAmount * s.ExchangeRate : s.RemainingAmount
                    ,
                    ThirtyOneToSixty = (DateTime.Today - s.EntryDate).Days >= 30 && (DateTime.Today - s.EntryDate).Days < 60
                                    ? s.RemainingAmount //pCurrencyID == 0 && pIsAgingPerSupplier_AllCurrency ? s.RemainingAmount * s.ExchangeRate : s.RemainingAmount
                                    : 0
                    ,
                    SixtyOneToNinty = (DateTime.Today - s.EntryDate).Days >= 60 && (DateTime.Today - s.EntryDate).Days < 90
                                    ? s.RemainingAmount //pCurrencyID == 0 && pIsAgingPerSupplier_AllCurrency ? s.RemainingAmount * s.ExchangeRate : s.RemainingAmount
                                    : 0
                    ,
                    Later = (DateTime.Today - s.EntryDate).Days >= 90
                                    ? s.RemainingAmount //pCurrencyID == 0 && pIsAgingPerSupplier_AllCurrency ? s.RemainingAmount * s.ExchangeRate : s.RemainingAmount
                                    : 0
                    ,
                    NotDue = (DateTime.Today - s.EntryDate).Days < 0
                                    ? s.RemainingAmount //pCurrencyID == 0 && pIsAgingPerSupplier_AllCurrency ? s.RemainingAmount * s.ExchangeRate : s.RemainingAmount
                                    : 0
                }).ToList();
            var pAgingPerSupplierList = pAgingPerSupplierList_BeforeGrouping
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
            var pDistinctSuppliersList = pAgingPerSupplierList
                .Select(s => new
                {
                    PartnerName = s.PartnerName
                }).Distinct();
            #endregion AgingPerSupplier

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] 
            {
                pRecordsExist
                , pGroupBySuppliers && !pIsAgingPerSupplier_AllCurrency ? serializer.Serialize(objGroupedPayables) : serializer.Serialize(objCvwPayables.lstCVarvwPayables)
                , serializer.Serialize(objCvwFormFourtyOne.lstCVarvwFormFourtyOne) //pData[2]
                , serializer.Serialize(objCvwPurchasesReport.lstCVarvwPurchasesReport) //pData[3]
                , serializer.Serialize(objCvwAccNote.lstCVarvwAccNote) //pData[4]
                , serializer.Serialize(objCvwOperationPayablesAllocation.lstCVarvwOperationPayablesAllocation) //pData[5]
                , pIsAgingPerSupplier_AllCurrency ? serializer.Serialize(pAgingPerSupplierList) : null //pData[6]
                , pIsAgingPerSupplier_AllCurrency ? serializer.Serialize(pDistinctSuppliersList) : null //pData[7]
                , serializer.Serialize(objCvwFormFourtyOneWithoutOperation.lstCVarvwFormFourtyOneWithoutOperation) //pData[8]
            };
        }

        [HttpGet, HttpPost]
        public object[] LoadData_Form13(string pWhereClauseForm13)
        {
            bool pRecordsExist = false;
            Exception checkException = null;
            Int32 _RowCount = 0;
            string _OperationIDs = "0";
            var constCustomsClearanceAgentPartnerTypeID = 4;
            var constTruckerPartnerTypeID = 7;
            int pMaxTruckerColumns = 0;
            int pMaxCCAColumns = 0;
            CvwPayables objCvwPayables = new CvwPayables();
            CvwOperations objCvwOperations = new CvwOperations();
            checkException = objCvwPayables.GetListPaging(999999, 1, pWhereClauseForm13, "OperationID, SupplierPartnerTypeID DESC, PartnerSupplierName", out _RowCount);

            if (objCvwPayables.lstCVarvwPayables.Count > 0 && checkException == null)
                pRecordsExist = true;

            #region Get minimized lists
            var pSuppliersList = objCvwPayables.lstCVarvwPayables
                .GroupBy(g => new { g.OperationID, g.SupplierPartnerTypeID, g.PartnerSupplierName, g.SupplierInvoiceNo })
                .Select(s => new
                {
                    OperationID = s.First().OperationID
                    ,
                    SupplierPartnerTypeID = s.First().SupplierPartnerTypeID
                    ,
                    PartnerSupplierName = s.First().PartnerSupplierName
                    ,
                    SupplierInvoiceNo = s.First().SupplierInvoiceNo
                    ,
                    TruckersCount = s.Count(c => c.SupplierPartnerTypeID == constTruckerPartnerTypeID)
                    ,
                    CCACount = s.Count(c => c.SupplierPartnerTypeID == constCustomsClearanceAgentPartnerTypeID)
                })
                .Distinct()
                .ToList();
            #region Get Max Columns Count
            var pSuppliersCountList = pSuppliersList
                .GroupBy(g => new { g.OperationID, g.SupplierPartnerTypeID })
                .Select(s => new
                {
                    OperationID = s.First().OperationID
                    ,
                    SupplierPartnerTypeID = s.First().SupplierPartnerTypeID
                    ,
                    TruckersCount = s.Count(c => c.SupplierPartnerTypeID == constTruckerPartnerTypeID)
                    ,
                    CCACount = s.Count(c => c.SupplierPartnerTypeID == constCustomsClearanceAgentPartnerTypeID)
                })
                .Distinct()
                .ToList();

            if (pSuppliersCountList.Count > 0)
            {
                pMaxTruckerColumns = pSuppliersCountList
                    .MaxBy(x => x.TruckersCount
                    ).TruckersCount;
                pMaxCCAColumns = pSuppliersCountList
                    .MaxBy(x => x.CCACount
                    ).CCACount;
            }
                var pOperationsIDList = objCvwPayables.lstCVarvwPayables
                .Select(s => new
                {
                    OperationID = s.OperationID
                })
                .Distinct()
                .ToList();
            #endregion Get Max Columns Count
            for (int i = 0; i < pOperationsIDList.Count; i++)
                _OperationIDs += "," + pOperationsIDList[i].OperationID;
            checkException = objCvwOperations.GetListPaging(999999, 1, "WHERE IsFleet=0 AND ID IN(" + _OperationIDs + ")", "ID", out _RowCount);
            var pOperationsList = objCvwOperations.lstCVarvwOperations
                .Select(s => new
                {
                    OperationID = s.ID
                    ,
                    OperationCode = s.Code
                    ,
                    ShipperName = s.ShipperName
                    ,
                    Form13Number = s.Form13Number
                })
                .Distinct()
                .ToList();

            #endregion Get minimized lists

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[]
            {
                pRecordsExist
                , serializer.Serialize(pOperationsList) //pData[1]
                , serializer.Serialize(pSuppliersList) //pData[2]
                , pMaxTruckerColumns //pData[3]
                , pMaxCCAColumns //pData[4]
            };
        }

        [HttpGet, HttpPost]
        public object[] LoadData_Tank(string pWhereClause, bool pIsPayables)
        {
            bool pRecordsExist = false;
            Exception checkException = null;
            Int32 _RowCount = 0;
            CvwPayables objCvwPayables = new CvwPayables();
            //    CvwReceivables objCvwReceivables = new CvwReceivables();
            CvwReceivablesTank objCvwReceivablesTank = new CvwReceivablesTank();
            if (pIsPayables)
                checkException = objCvwPayables.GetListPaging(999999, 1, pWhereClause, "OperationContainersAndPackagesID", out _RowCount);
            else
                checkException = objCvwReceivablesTank.GetListPaging(999999, 1, pWhereClause, "OperationContainersAndPackagesID", out _RowCount);

            //  checkException = objCvwReceivables.GetListPaging(999999, 1, pWhereClause, "OperationContainersAndPackagesID", out _RowCount);

            if (_RowCount > 0 && checkException == null)
                pRecordsExist = true;

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[]
            {
                pRecordsExist
                , pIsPayables ? serializer.Serialize(objCvwPayables.lstCVarvwPayables): serializer.Serialize(objCvwReceivablesTank.lstCVarvwReceivablesTank)
            };
        }

    }
}

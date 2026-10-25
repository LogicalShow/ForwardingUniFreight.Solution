using Forwarding.MvcApp.Models.Administration.Security.Generated;
using Forwarding.MvcApp.Models.Administration.Settings.Generated;
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

namespace Forwarding.MvcApp.Controllers.Reports.API_Statistics
{
    public class VendorsReportController : ApiController
    {
        [HttpGet, HttpPost]//pID : is the InvoiceID
        public object[] FillFilter()
        {
           // int _RowCount = 0;
            //CvwBranches objCvwBranches = new CvwBranches();
            //objCvwBranches.GetList(" WHERE 1=1 ORDER BY Name ");

            //CInvoiceTypes objCInvoiceTypes = new CInvoiceTypes();
            //objCInvoiceTypes.GetList(" WHERE Code<>'DRAFT' ORDER BY Name ");

            //CvwCustomersWithMinimalColumns objCvwCustomersWithMinimalColumns = new CvwCustomersWithMinimalColumns();
            ////objCvwCustomersWithMinimalColumns.GetList(" ORDER BY Name ");

            //CTaxeTypes objCTaxTypes = new CTaxeTypes();
            //objCTaxTypes.GetList(" WHERE IsDiscount=0 ORDER BY Name ");

            //CTaxeTypes objCDiscountTypes = new CTaxeTypes();
            //objCDiscountTypes.GetList(" WHERE IsDiscount=1 ORDER BY Name ");

            //CUsers objCSalesmen = new CUsers();
            //objCSalesmen.GetListPaging(999999, 1, "WHERE IsSalesman=1", "Name", out _RowCount);

            CNoAccessPartnerTypes objCNoAccessPartnerTypes = new CNoAccessPartnerTypes();
            objCNoAccessPartnerTypes.GetList(" WHERE 1=1 ");

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                  serializer.Serialize(objCNoAccessPartnerTypes.lstCVarNoAccessPartnerTypes)//data[0]
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
                objCCustomers.GetListPaging(99999, 1, "WHERE 1=1", "Name", out _RowCount);
                var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
                return new object[] { serializer.Serialize(objCCustomers.lstCVarvwCustomersWithMinimalColumns) };
            }
            else if (pPartnerTypeID == constAgentPartnerTypeID)
            {
                CAgents objCAgents = new CAgents();
                objCAgents.GetListPaging(99999, 1, "WHERE 1=1", "Name", out _RowCount);
                var pAgentsList = objCAgents.lstCVarAgents
                .Select(s => new
                {
                    ID = s.ID
                    ,
                    Name = s.Name
                    ,
                    Code = s.Code
                }).ToList();
                return new object[] { new JavaScriptSerializer().Serialize(pAgentsList) };
            }
            else if (pPartnerTypeID == constShippingAgentPartnerTypeID)
            {

                CShippingAgents objCShippingAgents = new CShippingAgents();
                objCShippingAgents.GetListPaging(10000, 1, "WHERE 1=1", "Name", out _RowCount);
                return new object[] { new JavaScriptSerializer().Serialize(objCShippingAgents.lstCVarShippingAgents) };
            }
            else if (pPartnerTypeID == constCustomsClearanceAgentPartnerTypeID)
            {
                CCustomsClearanceAgents objCCustomsClearanceAgents = new CCustomsClearanceAgents();
                objCCustomsClearanceAgents.GetListPaging(10000, 1, "WHERE 1=1", "Name", out _RowCount);
                return new object[] { new JavaScriptSerializer().Serialize(objCCustomsClearanceAgents.lstCVarCustomsClearanceAgents) };
            }
            else if (pPartnerTypeID == constShippingLinePartnerTypeID)
            {
                CShippingLines objCShippingLines = new CShippingLines();
                objCShippingLines.GetListPaging(10000, 1, "WHERE 1=1", "Name", out _RowCount);
                return new object[] { new JavaScriptSerializer().Serialize(objCShippingLines.lstCVarShippingLines) };
            }
            else if (pPartnerTypeID == constAirlinePartnerTypeID) {
                CvwAirlinesWithMinimalColumns objCAirlines = new CvwAirlinesWithMinimalColumns();
                objCAirlines.GetListPaging(10000, 1, "WHERE 1=1", "Name", out _RowCount);
                    return new object[] { new JavaScriptSerializer().Serialize(objCAirlines.lstCVarvwAirlinesWithMinimalColumns) };
            }
            else if (pPartnerTypeID == constTruckerPartnerTypeID) {
                CTruckers objCTruckers = new CTruckers();
                objCTruckers.GetListPaging(10000, 1, "WHERE 1=1", "Name", out _RowCount);
                return new object[] { new JavaScriptSerializer().Serialize(objCTruckers.lstCVarTruckers) };
            }
            else if (pPartnerTypeID == constSupplierPartnerTypeID) {
                CSuppliers objCSuppliers = new CSuppliers();
                objCSuppliers.GetListPaging(10000, 1, "WHERE 1=1", "Name", out _RowCount);
                return new object[] { new JavaScriptSerializer().Serialize(objCSuppliers.lstCVarSuppliers) };
            }
            else if (pPartnerTypeID == constCustodyPartnerTypeID) {
                CCustody objCCustody = new CCustody();
                objCCustody.GetListPaging(10000, 1, "WHERE 1=1", "Name", out _RowCount);
                return new object[] { new JavaScriptSerializer().Serialize(objCCustody.lstCVarCustody) };
            }
            return new object[] {};
        }

        [HttpGet, HttpPost]
        public object[] LoadData(string pWhereClause, Int32 pRange, Int32 pReportTypeID)
        {
            string pMessageReturned = "";
            Exception checkException = null;
            int _RowCount = 0;
            CvwVendorOpenInvoicesReport objCvwVendorOpenInvoicesReport = new CvwVendorOpenInvoicesReport();

            if (pReportTypeID == 1 ||  pReportTypeID == 2 )
            {
                checkException = objCvwVendorOpenInvoicesReport.GetListPaging(99999, 1, pWhereClause, "SupplierOperationPartnerTypeName,PartnerSupplierName", out _RowCount);
            }

        
            if (checkException != null)
                pMessageReturned = checkException.Message;

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[]
            {
                pMessageReturned
                ,serializer.Serialize(objCvwVendorOpenInvoicesReport.lstCVarvwVendorOpenInvoicesReport)
            };
        }

    }
}

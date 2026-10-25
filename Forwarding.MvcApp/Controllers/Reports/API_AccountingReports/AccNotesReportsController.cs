using Forwarding.MvcApp.Models.OperAcc.Generated;
using Forwarding.MvcApp.Models.Administration.Settings.Generated;
using Forwarding.MvcApp.Models.MasterData.BanksAccountsAndTreasuries.Generated;
using Forwarding.MvcApp.Models.MasterData.Invoicing.Generated;
using Forwarding.MvcApp.Models.MasterData.Partners.Generated;
using Forwarding.MvcApp.Models.NoAccess.Generated;
using Forwarding.MvcApp.Models.Operations.Operations.Generated;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;

namespace Forwarding.MvcApp.Controllers.Reports.API_AccountingReports
{
    public class AccNotesReportsController : ApiController
    {
        [HttpGet, HttpPost]
        public object[] FillFilter()
        {
            CvwBranches objCvwBranches = new CvwBranches();
            objCvwBranches.GetList(" WHERE 1=1 ORDER BY Name ");

            CNoAccessPartnerTypes objCNoAccessPartnerTypes = new CNoAccessPartnerTypes();
            objCNoAccessPartnerTypes.GetList(" WHERE 1=1 ");

            CvwAccPartners objCvwPartners = new CvwAccPartners();
            //objCvwPartners.GetList(" WHERE 1=1 ORDER BY PartnerTypeID, Name ");

            CTaxeTypes objCTaxTypes = new CTaxeTypes();
            objCTaxTypes.GetList(" WHERE IsDiscount=0 ORDER BY Name ");

            CTaxeTypes objCDiscountTypes = new CTaxeTypes();
            objCDiscountTypes.GetList(" WHERE IsDiscount=1 ORDER BY Name ");

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] { 
                new JavaScriptSerializer().Serialize(objCvwBranches.lstCVarvwBranches)//data[0]
                , serializer.Serialize(objCvwPartners.lstCVarvwAccPartners)//data[1]
                , new JavaScriptSerializer().Serialize(objCTaxTypes.lstCVarTaxeTypes)//data[2]
                , new JavaScriptSerializer().Serialize(objCDiscountTypes.lstCVarTaxeTypes)//data[3]
                , new JavaScriptSerializer().Serialize(objCNoAccessPartnerTypes.lstCVarNoAccessPartnerTypes)//data[4]
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
                //objCCustomers.GetListPaging(99999, 1, "WHERE 1=1", "Name", out _RowCount);
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
            else if (pPartnerTypeID == constAirlinePartnerTypeID)
            {
                CvwAirlinesWithMinimalColumns objCAirlines = new CvwAirlinesWithMinimalColumns();
                objCAirlines.GetListPaging(10000, 1, "WHERE 1=1", "Name", out _RowCount);
                return new object[] { new JavaScriptSerializer().Serialize(objCAirlines.lstCVarvwAirlinesWithMinimalColumns) };
            }
            else if (pPartnerTypeID == constTruckerPartnerTypeID)
            {
                CTruckers objCTruckers = new CTruckers();
                objCTruckers.GetListPaging(10000, 1, "WHERE 1=1", "Name", out _RowCount);
                return new object[] { new JavaScriptSerializer().Serialize(objCTruckers.lstCVarTruckers) };
            }
            else if (pPartnerTypeID == constSupplierPartnerTypeID)
            {
                CSuppliers objCSuppliers = new CSuppliers();
                objCSuppliers.GetListPaging(10000, 1, "WHERE 1=1", "Name", out _RowCount);
                return new object[] { new JavaScriptSerializer().Serialize(objCSuppliers.lstCVarSuppliers) };
            }
            else if (pPartnerTypeID == constCustodyPartnerTypeID)
            {
                CCustody objCCustody = new CCustody();
                objCCustody.GetListPaging(10000, 1, "WHERE 1=1", "Name", out _RowCount);
                return new object[] { new JavaScriptSerializer().Serialize(objCCustody.lstCVarCustody) };
            }
            return new object[] { };
        }

        [HttpGet, HttpPost]
        public object[] LoadData(string pWhereClause)
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
                CvwAccNoteTax objCvwAccNotes = new CvwAccNoteTax();
                if (CompanyName == "CHMTax")
                {
                    checkException = objCvwAccNotes.GetListPaging(3000, 1, pWhereClause + " and id in(SELECT tl.OriginID FROM ForwardingTransChemTax.dbo.TaxLink AS tl WHERE tl.Notes='Accnote')", "ID, PartnerName, OperationID", out _RowCount);

                }
                else if (CompanyName == "OCETax")
                {
                    checkException = objCvwAccNotes.GetListPaging(3000, 1, pWhereClause + " and id in(SELECT tl.OriginID FROM ForwardingTroTax.dbo.TaxLink AS tl WHERE tl.Notes='Accnote')", "ID, PartnerName, OperationID", out _RowCount);

                }

                if (objCvwAccNotes.lstCVarvwAccNoteTax.Count > 0 && checkException == null)
                    pRecordsExist = true;

                var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
                return new object[]
                {
                pRecordsExist
                , serializer.Serialize(objCvwAccNotes.lstCVarvwAccNoteTax)
                };
            }
            else
            {
                bool pRecordsExist = false;
                Exception checkException = null;
                Int32 _RowCount = 0;
                CvwAccNote objCvwAccNotes = new CvwAccNote();

                checkException = objCvwAccNotes.GetListPaging(3000, 1, pWhereClause, "ID, PartnerName, OperationID", out _RowCount);

                if (objCvwAccNotes.lstCVarvwAccNote.Count > 0 && checkException == null)
                    pRecordsExist = true;

                var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
                return new object[]
                {
                pRecordsExist
                , serializer.Serialize(objCvwAccNotes.lstCVarvwAccNote)
                };
            }
            
        }
    }
}

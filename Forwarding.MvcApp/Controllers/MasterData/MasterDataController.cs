using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Web;
using System.Web.Mvc;
using System.Web.UI;

namespace Forwarding.MvcApp.Controllers.MasterData
{
    //[Authorize]
    public class MasterDataController : BaseController
    {
        ////[HttpGet]f
        ////public ActionResult PrintReport()
        ////{
        ////    Forwarding.MvcApp.Models.MasterData.Locations.Generated.CRegions objCRegions = new Forwarding.MvcApp.Models.MasterData.Locations.Generated.CRegions();
        ////    objCRegions.GetList(" Where 1=1 ");

        ////    CrystalDecisions.CrystalReports.Engine.ReportClass rptH = new CrystalDecisions.CrystalReports.Engine.ReportClass();
        ////    rptH.FileName = Server.MapPath("GroupSelection.rpt");
        ////    rptH.Load();
        ////    rptH.SetDataSource(objCRegions.lstCVarRegions);
        ////    System.IO.Stream stream = rptH.ExportToStream(CrystalDecisions.Shared.ExportFormatType.PortableDocFormat);
        ////    return File(stream, "application/pdf");   
        ////}

        //[HttpGet]
        ////public ActionResult PrintReport()
        //public void PrintReport()
        //{
        //    Forwarding.MvcApp.Models.MasterData.Locations.Generated.CRegions objCRegions = new Forwarding.MvcApp.Models.MasterData.Locations.Generated.CRegions();
        //    objCRegions.GetList(" Where 1=1 ");

        //    CrystalDecisions.CrystalReports.Engine.ReportDocument rd = new CrystalDecisions.CrystalReports.Engine.ReportDocument();

        //    rd.Load(System.IO.Path.Combine(Server.MapPath("~/Reports"), "Regions.rpt"));
        //    //rd.SetParameterValue("WhereClause", " where 1=1  ");
        //    rd.SetDataSource(objCRegions.lstCVarRegions);


        //    //Response.Buffer = false;
        //    //Response.ClearContent();
        //    //Response.ClearHeaders();

        //    //try
        //    //{
        //    //System.IO.Stream stream = rd.ExportToStream(CrystalDecisions.Shared.ExportFormatType.PortableDocFormat);
        //    rd.ExportToDisk(CrystalDecisions.Shared.ExportFormatType.PortableDocFormat, (System.IO.Path.Combine(Server.MapPath("~/Reports"), "Regions.pdf")));
        //    System.Diagnostics.Process.Start((System.IO.Path.Combine(Server.MapPath("~/Reports"), "Regions.pdf")));
        //    //stream.Seek(0, System.IO.SeekOrigin.Begin);
        //    //return File(stream, "application/pdf", "Regions.pdf");
        //    //}
        //    //catch (Exception ex)
        //    //{
        //    //    throw;
        //    //}
            
        //}


        #region Locations
        [HttpGet]
        //public ActionResult ViewCountries()
        public PartialViewResult ViewCountries(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/MasterData/Locations/_Countries.cshtml");
        }

        [HttpGet]
        //public ActionResult ViewCities()
        public PartialViewResult ViewCities(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/MasterData/Locations/_Cities.cshtml");
        }

        [HttpGet]
        public PartialViewResult ViewRegions(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/MasterData/Locations/_Regions.cshtml");
        }

        [HttpGet]
        public PartialViewResult ViewPorts(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/MasterData/Locations/_Ports.cshtml");
        }
        #endregion Locations

        #region Partners

        [HttpGet] // PartnerTypeID = 1
        public PartialViewResult ViewCustomers(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/MasterData/Partners/_Customers.cshtml");
        }

        [HttpGet]
        [OutputCache(Duration = 86400, VaryByParam = "version", Location = OutputCacheLocation.Client)]
        public PartialViewResult ViewModalCustomers(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/MasterData/Partners/_ModalCustomers.cshtml");
        }

        [HttpGet] // PartnerTypeID = 2
        public PartialViewResult ViewCustomersTemp(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/MasterData/Partners/_CustomersTemp.cshtml");
        }

        [HttpGet]
        public PartialViewResult ViewModalCustomersTemp(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/MasterData/Partners/_ModalCustomersTemp.cshtml");
        }

        [HttpGet] // PartnerTypeID = 2
        public PartialViewResult ViewAgents(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/MasterData/Partners/_Agents.cshtml");
        }

        [HttpGet]
        [OutputCache(Duration = 86400, VaryByParam = "version", Location = OutputCacheLocation.Client)]
        public PartialViewResult ViewModalAgents(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/MasterData/Partners/_ModalAgents.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewSalesmen(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/MasterData/Partners/_Salesmen.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewOwners(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/MasterData/Partners/_Owners.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewModalSalesmen(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/MasterData/Partners/_ModalSalesmen.cshtml");
        }
        public PartialViewResult ViewModalOwners(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/MasterData/Partners/_ModalOwners.cshtml");
        }

        [HttpGet] // PartnerTypeID = 3
        public PartialViewResult ViewShippingAgents(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/MasterData/Partners/_ShippingAgents.cshtml");
        }

        [HttpGet]
        [OutputCache(Duration = 86400, VaryByParam = "version", Location = OutputCacheLocation.Client)]
        public PartialViewResult ViewModalShippingAgents(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/MasterData/Partners/_ModalShippingAgents.cshtml");
        }

        [HttpGet] // PartnerTypeID = 4
        public PartialViewResult ViewCustomsClearanceAgents(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/MasterData/Partners/_CustomsClearanceAgents.cshtml");
        }

        [HttpGet]
        [OutputCache(Duration = 86400, VaryByParam = "version", Location = OutputCacheLocation.Client)]
        public PartialViewResult ViewModalCustomsClearanceAgents(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/MasterData/Partners/_ModalCustomsClearanceAgents.cshtml");
        }

        [HttpGet] // PartnerTypeID = 5
        public PartialViewResult ViewShippingLines(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/MasterData/Partners/_ShippingLines.cshtml");
        }

        [HttpGet]
        public PartialViewResult ViewModalShippingLines(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/MasterData/Partners/_ModalShippingLines.cshtml");
        }

        [HttpGet] // PartnerTypeID = 6
        public PartialViewResult ViewAirlines(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/MasterData/Partners/_Airlines.cshtml");
        }

        [HttpGet]
        public PartialViewResult ViewModalAirlines(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/MasterData/Partners/_ModalAirlines.cshtml");
        }
        
        [HttpGet]
        public PartialViewResult ViewModalMAWBStock(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/MasterData/Partners/_ModalMAWBStock.cshtml");
        }

        [HttpGet]
        public PartialViewResult ViewModalMAWBStockSelect(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/MasterData/Partners/_ModalMAWBStockSelect.cshtml");
        }

        [HttpGet] // PartnerTypeID = 7
        public PartialViewResult ViewTruckers(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/MasterData/Partners/_Truckers.cshtml");
        }

        [HttpGet]
        public PartialViewResult ViewModalTruckers(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/MasterData/Partners/_ModalTruckers.cshtml");
        }

        [HttpGet] // PartnerTypeID = 8
        public PartialViewResult ViewSuppliers(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/MasterData/Partners/_Suppliers.cshtml");
        }
        
        [HttpGet]
        [OutputCache(Duration = 86400, VaryByParam = "version", Location = OutputCacheLocation.Client)]
        public PartialViewResult ViewModalSuppliers(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/MasterData/Partners/_ModalSuppliers.cshtml");
        }

        [HttpGet]
        public PartialViewResult ViewModalAddresses(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/MasterData/Partners/_ModalAddresses.cshtml");
        }

        [HttpGet]
        public PartialViewResult ViewModalContacts(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/MasterData/Partners/_ModalContacts.cshtml");
        }

        [HttpGet]
        public PartialViewResult ViewModalPartners(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/MasterData/Partners/_ModalPartners.cshtml");
        }

        [HttpGet]
        public PartialViewResult ViewModalPartnersBanks(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/MasterData/Partners/_ModalPartnersBanks.cshtml");
        }
        #endregion

        #region Invoicing
        [HttpGet]
        public PartialViewResult ViewCustomerCreditLimit(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/MasterData/Invoicing/_CustomerCreditLimit.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewCreditCardTypes(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/MasterData/Invoicing/_CreditCardTypes.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewPaymentTerms(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/MasterData/Invoicing/_PaymentTerms.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewInvoiceTypes(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/MasterData/Invoicing/_InvoiceTypes.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewIncoterms(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/MasterData/Invoicing/_Incoterms.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewCurrencies(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/MasterData/Invoicing/_Currencies.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewTaxeTypes(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/MasterData/Invoicing/_TaxeTypes.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewChargeTypes(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/MasterData/Invoicing/_ChargeTypes.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewChargeTypeGroup(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/MasterData/Invoicing/_ChargeTypeGroup.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewFreightGroup(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/MasterData/Invoicing/FreightGroup.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewPaymentRequestApprovalLevels(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/MasterData/Invoicing/_PaymentRequestApprovalLevels.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewPurchaseItem(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/MasterData/Invoicing/_PurchaseItem.cshtml");
        }
        [HttpGet]
        [OutputCache(Duration = 86400, VaryByParam = "version", Location = OutputCacheLocation.Client)]
        public PartialViewResult ViewModalSelectCharges(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/MasterData/Invoicing/_ModalSelectCharges.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewServices(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/MasterData/Invoicing/_Services.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewExpenses(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/MasterData/Invoicing/_Expenses.cshtml");
        }
        #endregion Invoicing


        #region BanksAccountsAndTreasuries
        [HttpGet]
        public PartialViewResult ViewBankAccount(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/MasterData/BanksAccountsAndTreasuries/_BankAccount.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewBankTemplate(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/MasterData/BanksAccountsAndTreasuries/_BankTemplate.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewTreasury(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/MasterData/BanksAccountsAndTreasuries/_Treasury.cshtml");
        }

        [HttpGet]
        public PartialViewResult ViewCustody(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/MasterData/BanksAccountsAndTreasuries/_Custody.cshtml");
        }

        #endregion BanksAccountsAndTreasuries

        #region BanksAndTreasuries_Beta
        [HttpGet]
        //public ActionResult ViewBanks()
        public PartialViewResult ViewBanks_Beta(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/MasterData/CashAndBanks/_Banks.cshtml");
        }

        [HttpGet]
        //public ActionResult ViewTreasuries()
        public PartialViewResult ViewSafes_Beta(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/MasterData/CashAndBanks/_Safes.cshtml");
        }

        #endregion BanksAndTreasuries_Beta

        #region Others
        [HttpGet]
        public PartialViewResult ViewContainerTypes(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/MasterData/Others/_ContainerTypes.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewPackageTypes(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/MasterData/Others/_PackageTypes.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewCommodities(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/MasterData/Others/_Commodities.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewMoveTypes(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/MasterData/Others/_MoveTypes.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewDocumentsInfo(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/MasterData/Others/_DocumentsInfo.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewVessels(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/MasterData/Others/_Vessels.cshtml");
        }
		[HttpGet]
		public PartialViewResult ViewModalVessels(string pCutlureID)
		{
			SetLanguage(pCutlureID);
			return PartialView("~/Views/MasterData/Others/_ModalVessels.cshtml");
		}
		[HttpGet]
        public PartialViewResult ViewDocumentTypes(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/MasterData/Others/_DocumentTypes.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewTemplate(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/MasterData/Others/_Template.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewTrackingStage(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/MasterData/Others/_TrackingStage.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewNetwork(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/MasterData/Others/_Network.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewTypeOfStocks(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/MasterData/Others/_TypeOfStock.cshtml");
        }
        #endregion Others

        #region Trucking
        [HttpGet]

        public PartialViewResult ViewTRCK_EquipmentModel(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/MasterData/Trucking/_TRCK_EquipmentModel.cshtml");
        }

        public PartialViewResult ViewTRCK_Drivers(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/MasterData/Trucking/_TRCK_Drivers.cshtml");
        }

        public PartialViewResult ViewTRCK_Trailers(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/MasterData/Trucking/_TRCK_Trailers.cshtml");
        }

        public PartialViewResult ViewTRCK_Equipments(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/MasterData/Trucking/_TRCK_Equipments.cshtml");
        }

        #endregion Trucking

        #region CustomsClearance
        [HttpGet]
        public PartialViewResult ViewCustomsItems(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/MasterData/CustomsClearance/_CustomsItems.cshtml");
        }
        [HttpGet]
        public PartialViewResult ViewAuthorizations(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("~/Views/MasterData/CustomsClearance/_Authorizations.cshtml");
        }
        #endregion CustomsClearance

        [HttpGet]
        public PartialViewResult ViewModalCheckboxesList(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("_ModalCheckboxesList");
        }
        
    }
}

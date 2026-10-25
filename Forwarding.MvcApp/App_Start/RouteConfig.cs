using System.Web.Mvc;
using System.Web.Routing;

namespace Forwarding.MvcApp
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {

            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                name: "CheckIsValidUser",
                url: "Login/CheckIsValidUser/{pUsername}/{pPassword}",
                defaults: new { controller = "Login", action = "CheckIsValidUser", pUsername = UrlParameter.Optional, pPassword = UrlParameter.Optional }
            );
            routes.MapRoute(
                            name: "ResetPassword",
                            url: "Login/ResetPassword",
                            defaults: new { controller = "Login", action = "ResetPassword" }
                        );

            //to create user
            routes.MapRoute(
                name: "SecureInsertUser",
                url: "Login/Insert",
                defaults: new { controller = "Login", action = "Insert" }
            );
            //to update user
            routes.MapRoute(
                name: "SecureUpdateUser",
                url: "Login/Update",
                defaults: new { controller = "Login", action = "Update" }
            );

            routes.MapRoute(
                name: "Logout",
                url: "Login/Logout",
                defaults: new { controller = "Login", action = "Logout" }
            );


            routes.MapRoute(
                name: "Login",
                url: "Login/Index",
                defaults: new { controller = "Login", action = "Index" }
            );

            routes.MapRoute(
                name: "DefaultLogin",
                url: "Login",
                defaults: new { controller = "Login", action = "Index" }
            );

            routes.MapRoute(
                name: "DefaultLogin2",
                url: "",
                defaults: new { controller = "Login", action = "Index" }
            );
            routes.MapRoute(
            name: "DefaultsdirectlyLoadAll",
            url: "Defaultsdirectly/LoadAll",
            defaults: new { controller = "Defaultsdirectly", action = "LoadAll" }
        );
            #region Culture
            //sherif culture
            routes.MapRoute(
                name: "EnglishCulture",
                url: "Home/SetEnglishCulture",
                defaults: new { controller = "Home", action = "SetEnglishCulture" }
            );
            routes.MapRoute(
                name: "ArabicCulture",
                url: "Home/SetArabicCulture",
                defaults: new { controller = "Home", action = "SetArabicCulture" }
            );
            routes.MapRoute(
                name: "FrenchCulture",
                url: "Home/SetFrenchCulture",
                defaults: new { controller = "Home", action = "SetFrenchCulture" }
            );
            routes.MapRoute(
                name: "ChineseCulture",
                url: "Home/SetChineseCulture",
                defaults: new { controller = "Home", action = "SetChineseCulture" }
            );
            //EOF sherif culture
            #endregion
            routes.MapRoute(
                name: "ViewDashboard",
                url: "Home/Dashboard/{pCutlureID}",
                defaults: new { controller = "Home", action = "ViewDashboard", pCutlureID = UrlParameter.Optional }
            );
            routes.MapRoute(
                name: "ViewLocalEmails",
                url: "LocalEmails/LocalEmails/{pCutlureID}",
                defaults: new { controller = "LocalEmails", action = "ViewLocalEmails", pCutlureID = UrlParameter.Optional }
            );
            routes.MapRoute(
                name: "ViewGroups",
                url: "Home/Groups",
                defaults: new { controller = "Home", action = "ViewGroups" }
            );

            #region MasterData/Locations
            //MasterData/Ports?pCutlureID=en
            routes.MapRoute(
                name: "PrintReport",
                url: "MasterData/PrintReport",
                defaults: new { controller = "MasterData", action = "PrintReport" }
            );



            //MasterData/Ports?pCutlureID=en
            routes.MapRoute(
                name: "ViewRegions",
                url: "MasterData/Regions",
                defaults: new { controller = "MasterData", action = "ViewRegions" }
            );
            //MasterData/Countries?pCutlureID=en
            routes.MapRoute(
                name: "ViewCountries",
                url: "MasterData/Countries",
                defaults: new { controller = "MasterData", action = "ViewCountries" }
            );
            //MasterData/Cities?pCutlureID=en
            routes.MapRoute(
                name: "ViewCities",
                url: "MasterData/Cities",
                defaults: new { controller = "MasterData", action = "ViewCities" }
            );
            //MasterData/Ports?pCutlureID=en
            routes.MapRoute(
                name: "ViewPorts",
                url: "MasterData/Ports",
                defaults: new { controller = "MasterData", action = "ViewPorts" }
            );
            #endregion MasterData/Locations

            #region Masterdata/CustomsClearance
            routes.MapRoute(
              name: "ViewCustomsItems",
              url: "MasterData/CustomsItems",
              defaults: new { controller = "MasterData", action = "ViewCustomsItems" }
            );
            routes.MapRoute(
              name: "ViewAuthorizations",
              url: "MasterData/Authorizations",
              defaults: new { controller = "MasterData", action = "ViewAuthorizations" }
            );
            #endregion

            #region MasterData/Partners

            //MasterData/Customers?pCutlureID=en
            routes.MapRoute( // PartnerTypeID = 1
                name: "ViewCustomers",
                url: "MasterData/Customers",
                defaults: new { controller = "MasterData", action = "ViewCustomers" }
            );
            //MasterData/ModalCustomers?pCutlureID=en
            routes.MapRoute( // PartnerTypeID = 1
                name: "ViewModalCustomers",
                url: "MasterData/ModalCustomers",
                defaults: new { controller = "MasterData", action = "ViewModalCustomers" }
            );

            //MasterData/CustomersTemp?pCutlureID=en
            routes.MapRoute( // PartnerTypeID = 2
                name: "ViewCustomersTemp",
                url: "MasterData/CustomersTemp",
                defaults: new { controller = "MasterData", action = "ViewCustomersTemp" }
            );
            //MasterData/ModalCustomersTemp?pCutlureID=en
            routes.MapRoute( // PartnerTypeID = 2
                name: "ViewModalCustomersTemp",
                url: "MasterData/ModalCustomersTemp",
                defaults: new { controller = "MasterData", action = "ViewModalCustomersTemp" }
            );

            //MasterData/Agents?pCutlureID=en
            routes.MapRoute( // PartnerTypeID = 2
                name: "ViewAgents",
                url: "MasterData/Agents",
                defaults: new { controller = "MasterData", action = "ViewAgents" }
            );
            //MasterData/ModalAgents?pCutlureID=en
            routes.MapRoute( // PartnerTypeID = 2
                name: "ViewModalAgents",
                url: "MasterData/ModalAgents",
                defaults: new { controller = "MasterData", action = "ViewModalAgents" }
            );
            routes.MapRoute( // PartnerTypeID = 2
              name: "ViewSalesmen",
              url: "MasterData/Salesmen",
              defaults: new { controller = "MasterData", action = "ViewSalesmen" }
          );
            routes.MapRoute( // PartnerTypeID = 2
           name: "ViewOwners",
           url: "MasterData/Owners",
           defaults: new { controller = "MasterData", action = "ViewOwners" }
       );
            //MasterData/ModalAgents?pCutlureID=en
            routes.MapRoute( // PartnerTypeID = 2
                name: "ViewModalSalesmen",
                url: "MasterData/ModalSalesmen",
                defaults: new { controller = "MasterData", action = "ViewModalSalesmen" }
            );
            routes.MapRoute( // PartnerTypeID = 2
               name: "ViewModalOwners",
               url: "MasterData/ModalOwners",
               defaults: new { controller = "MasterData", action = "ViewModalOwners" }
           );

            //MasterData/ShippingAgents?pCutlureID=en
            routes.MapRoute( // PartnerTypeID = 3
                name: "ViewShippingAgents",
                url: "MasterData/ShippingAgents",
                defaults: new { controller = "MasterData", action = "ViewShippingAgents" }
            );
            //MasterData/ModalShippingAgents?pCutlureID=en
            routes.MapRoute( // PartnerTypeID = 3
                name: "ViewModalShippingAgents",
                url: "MasterData/ModalShippingAgents",
                defaults: new { controller = "MasterData", action = "ViewModalShippingAgents" }
            );

            //MasterData/CustomsClearanceAgents?pCutlureID=en
            routes.MapRoute( // PartnerTypeID = 4
                name: "ViewCustomsClearanceAgents",
                url: "MasterData/CustomsClearanceAgents",
                defaults: new { controller = "MasterData", action = "ViewCustomsClearanceAgents" }
            );
            //MasterData/ModalCustomsClearanceAgents?pCutlureID=en
            routes.MapRoute( // PartnerTypeID = 4
                name: "ViewModalCustomsClearanceAgents",
                url: "MasterData/ModalCustomsClearanceAgents",
                defaults: new { controller = "MasterData", action = "ViewModalCustomsClearanceAgents" }
            );

            //MasterData/ShippingLines?pCutlureID=en
            routes.MapRoute( // PartnerTypeID = 5
                name: "ViewShippingLines",
                url: "MasterData/ShippingLines",
                defaults: new { controller = "MasterData", action = "ViewShippingLines" }
            );
            //MasterData/ModalShippingLines?pCutlureID=en
            routes.MapRoute( // PartnerTypeID = 5
                name: "ViewModalShippingLines",
                url: "MasterData/ModalShippingLines",
                defaults: new { controller = "MasterData", action = "ViewModalShippingLines" }
            );

            //MasterData/Airlines?pCutlureID=en
            routes.MapRoute( // PartnerTypeID = 6
                name: "ViewAirlines",
                url: "MasterData/Airlines",
                defaults: new { controller = "MasterData", action = "ViewAirlines" }
            );
            //MasterData/ModalAirlines?pCutlureID=en
            routes.MapRoute( // PartnerTypeID = 6
                name: "ViewModalAirlines",
                url: "MasterData/ModalAirlines",
                defaults: new { controller = "MasterData", action = "ViewModalAirlines" }
            );
            //MasterData/ModalMAWBStock?pCutlureID=en
            routes.MapRoute( // PartnerTypeID = 6
                name: "ViewModalMAWBStock",
                url: "MasterData/ModalMAWBStock",
                defaults: new { controller = "MasterData", action = "ViewModalMAWBStock" }
            );
            //MasterData/ModalMAWBStockSelect?pCutlureID=en
            routes.MapRoute( // PartnerTypeID = 6
                name: "ViewModalMAWBStockSelect",
                url: "MasterData/ModalMAWBStockSelect",
                defaults: new { controller = "MasterData", action = "ViewModalMAWBStockSelect" }
            );

            //MasterData/Truckers?pCutlureID=en
            routes.MapRoute( // PartnerTypeID = 7
                name: "ViewTruckers",
                url: "MasterData/Truckers",
                defaults: new { controller = "MasterData", action = "ViewTruckers" }
            );
            //MasterData/ModalTruckers?pCutlureID=en
            routes.MapRoute( // PartnerTypeID = 7
                name: "ViewModalTruckers",
                url: "MasterData/ModalTruckers",
                defaults: new { controller = "MasterData", action = "ViewModalTruckers" }
            );

            //MasterData/Suppliers?pCutlureID=en
            routes.MapRoute( // PartnerTypeID = 8
                name: "ViewSuppliers",
                url: "MasterData/Suppliers",
                defaults: new { controller = "MasterData", action = "ViewSuppliers" }
            );
            //MasterData/ModalSuppliers?pCutlureID=en
            routes.MapRoute( // PartnerTypeID = 8
                name: "ViewModalSuppliers",
                url: "MasterData/ModalSuppliers",
                defaults: new { controller = "MasterData", action = "ViewModalSuppliers" }
            );

            //MasterData/ModalAddresses?pCutlureID=en
            routes.MapRoute(
                name: "ViewModalAddresses",
                url: "MasterData/ModalAddresses",
                defaults: new { controller = "MasterData", action = "ViewModalAddresses" }
            );
            //MasterData/ModalContacts?pCutlureID=en
            routes.MapRoute(
                name: "ViewModalContacts",
                url: "MasterData/ModalContacts",
                defaults: new { controller = "MasterData", action = "ViewModalContacts" }
            );
            //MasterData/ModalPartners?pCutlureID=en
            routes.MapRoute(
                name: "ViewModalPartners",
                url: "MasterData/ModalPartners",
                defaults: new { controller = "MasterData", action = "ViewModalPartners" }
            );
            routes.MapRoute(
               name: "ViewModalPartnersBanks",
               url: "MasterData/ModalPartnersBanks",
               defaults: new { controller = "MasterData", action = "ViewModalPartnersBanks" }
            );
            #endregion

            #region MasterData/Invoicing
            //MasterData/CustomerCreditLimit?pCutlureID=en
            routes.MapRoute(
                name: "ViewCustomerCreditLimit",
                url: "MasterData/CustomerCreditLimit",
                defaults: new { controller = "MasterData", action = "ViewCustomerCreditLimit" }
            );
            //MasterData/CreditCardTypes?pCutlureID=en
            routes.MapRoute(
                name: "ViewCreditCardTypes",
                url: "MasterData/CreditCardTypes",
                defaults: new { controller = "MasterData", action = "ViewCreditCardTypes" }
            );
            //MasterData/PaymentTerms?pCutlureID=en
            routes.MapRoute(
                name: "ViewPaymentTerms",
                url: "MasterData/PaymentTerms",
                defaults: new { controller = "MasterData", action = "ViewPaymentTerms" }
            );
            //MasterData/InvoiceTypes?pCutlureID=en
            routes.MapRoute(
                name: "ViewInvoiceTypes",
                url: "MasterData/InvoiceTypes",
                defaults: new { controller = "MasterData", action = "ViewInvoiceTypes" }
            );
            //MasterData/ModalCheckboxesList?pCutlureID=en
            routes.MapRoute(
                name: "ViewModalCheckboxesList",
                url: "MasterData/ModalCheckboxesList",
                defaults: new { controller = "MasterData", action = "ViewModalCheckboxesList" }
            );
            //MasterData/Incoterms?pCutlureID=en
            routes.MapRoute(
                name: "ViewIncoterms",
                url: "MasterData/Incoterms",
                defaults: new { controller = "MasterData", action = "ViewIncoterms" }
            );
            //MasterData/Currencies?pCutlureID=en
            routes.MapRoute(
                name: "ViewCurrencies",
                url: "MasterData/Currencies",
                defaults: new { controller = "MasterData", action = "ViewCurrencies" }
            );
            //MasterData/TaxeTypes?pCutlureID=en
            routes.MapRoute(
                name: "ViewTaxeTypes",
                url: "MasterData/TaxeTypes",
                defaults: new { controller = "MasterData", action = "ViewTaxeTypes" }
            );
            //MasterData/ChargeTypes?pCutlureID=en
            routes.MapRoute(
                name: "ViewChargeTypes",
                url: "MasterData/ChargeTypes",
                defaults: new { controller = "MasterData", action = "ViewChargeTypes" }
            );
            //MasterData/ChargeTypeGroup?pCutlureID=en
            routes.MapRoute(
                name: "ViewChargeTypeGroup",
                url: "MasterData/Invoicing/ChargeTypeGroup",
                defaults: new { controller = "MasterData", action = "ViewChargeTypeGroup" }
            );
            routes.MapRoute(
              name: "ViewFreightGroup",
              url: "MasterData/Invoicing/FreightGroup",
              defaults: new { controller = "MasterData", action = "ViewFreightGroup" }
          );
            routes.MapRoute(
                name: "ViewPaymentRequestApprovalLevels",
                url: "MasterData/Invoicing/PaymentRequestApprovalLevels",
                defaults: new { controller = "MasterData", action = "ViewPaymentRequestApprovalLevels" }
            );
            //MasterData/PurchaseItem?pCutlureID=en
            routes.MapRoute(
                name: "ViewPurchaseItem",
                url: "MasterData/PurchaseItem",
                defaults: new { controller = "MasterData", action = "ViewPurchaseItem" }
            );
            //MasterData/ModalSelectCharges?pCutlureID=en
            routes.MapRoute(
                name: "ViewModalSelectCharges",
                url: "MasterData/ModalSelectCharges",
                defaults: new { controller = "MasterData", action = "ViewModalSelectCharges" }
            );
            #endregion


            #region MasterData/BankAccountsAndTreasuries
            routes.MapRoute(
                name: "ViewTreasury",
                url: "MasterData/Treasury",
                defaults: new { controller = "MasterData", action = "ViewTreasury" }
            );
            routes.MapRoute(
                name: "ViewBankAccount",
                url: "MasterData/BankAccount",
                defaults: new { controller = "MasterData", action = "ViewBankAccount" }
            );
            routes.MapRoute(
                name: "ViewBankTemplate",
                url: "MasterData/BankTemplate",
                defaults: new { controller = "MasterData", action = "ViewBankTemplate" }
            );
            routes.MapRoute(
                name: "ViewCustody",
                url: "MasterData/Custody",
                defaults: new { controller = "MasterData", action = "ViewCustody" }
            );
            #endregion MasterData/BankAccountsAndTreasuries

            #region MasterData/TreasuriesAndBanks_Beta
            //MasterData/Treasuries?pCutlureID=en
            routes.MapRoute(
                name: "ViewSafes_Beta",
                url: "MasterData/Safes",
                defaults: new { controller = "MasterData", action = "ViewSafes_Beta" }
            );
            //MasterData/Banks?pCutlureID=en
            routes.MapRoute(
                name: "ViewBanks_Beta",
                url: "MasterData/Banks",
                defaults: new { controller = "MasterData", action = "ViewBanks_Beta" }
            );
            #endregion MasterData/TreasuriesAndBanks_Beta

            #region MasterData/Others
            //MasterData/ContainerTypes?pCutlureID=en
            routes.MapRoute(
                name: "ViewContainerTypes",
                url: "MasterData/ContainerTypes",
                defaults: new { controller = "MasterData", action = "ViewContainerTypes" }
            );
            //MasterData/PackageTypes?pCutlureID=en
            routes.MapRoute(
                name: "ViewPackageTypes",
                url: "MasterData/PackageTypes",
                defaults: new { controller = "MasterData", action = "ViewPackageTypes" }
            );
            //MasterData/Commodities?pCutlureID=en
            routes.MapRoute(
                name: "ViewCommodities",
                url: "MasterData/Commodities",
                defaults: new { controller = "MasterData", action = "ViewCommodities" }
            );
            //MasterData/MoveTypes?pCutlureID=en
            routes.MapRoute(
                name: "ViewMoveTypes",
                url: "MasterData/MoveTypes",
                defaults: new { controller = "MasterData", action = "ViewMoveTypes" }
            );
            //MasterData/Vessels?pCutlureID=en
            routes.MapRoute(
                name: "ViewVessels",
                url: "MasterData/Vessels",
                defaults: new { controller = "MasterData", action = "ViewVessels" }
            );
			//MasterData/ModalVessels?pCutlureID=en
			routes.MapRoute(
				name: "ViewModalVessels",
				url: "MasterData/ModalVessels",
				defaults: new { controller = "MasterData", action = "ViewModalVessels" }
			);
			//MasterData/DocumentTypes?pCutlureID=en
			routes.MapRoute(
                name: "ViewDocumentTypes",
                url: "MasterData/DocumentTypes",
                defaults: new { controller = "MasterData", action = "ViewDocumentTypes" }
            );
            routes.MapRoute(
                 name: "ViewDocumentsInfo",
                 url: "MasterData/DocumentsInfo",
                defaults: new { controller = "MasterData", action = "ViewDocumentsInfo" }
            );
            //MasterData/Template?pCutlureID=en
            routes.MapRoute(
                name: "ViewTemplate",
                url: "MasterData/Template",
                defaults: new { controller = "MasterData", action = "ViewTemplate" }
            );
            //MasterData/TrackingStage?pCutlureID=en
            routes.MapRoute(
                name: "ViewTrackingStage",
                url: "MasterData/TrackingStage",
                defaults: new { controller = "MasterData", action = "ViewTrackingStage" }
            );
            //MasterData/Network?pCutlureID=en
            routes.MapRoute(
                name: "ViewNetwork",
                url: "MasterData/Network",
                defaults: new { controller = "MasterData", action = "ViewNetwork" }
            );
            routes.MapRoute(
                name: "ViewTypeOfStocks",
                url: "MasterData/TypeOfStock",
                defaults: new { controller = "MasterData", action = "ViewTypeOfStocks" }
            );
            #endregion

            #region Masterdata/Trucking
            routes.MapRoute(
               name: "ViewTRCK_EquipmentModel",
               url: "MasterData/TRCK_EquipmentModel",
               defaults: new { controller = "MasterData", action = "ViewTRCK_EquipmentModel" }
           );

            routes.MapRoute(
               name: "ViewTRCK_Drivers",
               url: "MasterData/TRCK_Drivers",
               defaults: new { controller = "MasterData", action = "ViewTRCK_Drivers" }
           );

            routes.MapRoute(
              name: "ViewTRCK_Trailers",
              url: "MasterData/TRCK_Trailers",
              defaults: new { controller = "MasterData", action = "ViewTRCK_Trailers" }
           );
            routes.MapRoute(
              name: "ViewTRCK_Equipments",
              url: "MasterData/TRCK_Equipments",
              defaults: new { controller = "MasterData", action = "ViewTRCK_Equipments" }
          );
            #endregion

            #region ContainerTrackingGroup/ContainerTracking
            routes.MapRoute(
                name: "ViewContainerTracking",
                url: "ContainerTrackingGroup/ContainerTrackingTab/ContainerTracking",
                defaults: new { controller = "ContainerTrackingGroup", action = "ViewContainerTracking" }
            );
            routes.MapRoute(
                name: "ViewHoldTransactionLog",
                url: "ContainerTrackingGroup/HoldTransactionLog",
                defaults: new { controller = "ContainerTrackingGroup", action = "ViewHoldTransactionLog" }
            );
            routes.MapRoute(
              name: "ViewConsolidationHandlingCoLoadReports",
              url: "ContainerTrackingGroup/ConsolidationHandlingCoLoadReports",
              defaults: new { controller = "ContainerTrackingGroup", action = "ViewConsolidationHandlingCoLoadReports" }
          );
            routes.MapRoute(
                name: "ViewSetOperationStage",
                url: "ContainerTrackingGroup/ContainerTrackingTab/SetOperationStage",
                defaults: new { controller = "ContainerTrackingGroup", action = "ViewSetOperationStage" }
            );

            routes.MapRoute(
            name: "ViewCRM_BackIntergration",
            url: "ContainerTrackingGroup/ContainerTrackingTab/CRM_BackIntergration",
            defaults: new { controller = "ContainerTrackingGroup", action = "ViewCRM_BackIntergration" }
        );


            routes.MapRoute(
                name: "ViewVehicleTracking",
                url: "ContainerTrackingGroup/ContainerTrackingTab/VehicleTracking",
                defaults: new { controller = "ContainerTrackingGroup", action = "ViewVehicleTracking" }
            );
            routes.MapRoute(
            name: "ViewDepotReports",
            url: "ContainerTrackingGroup/ContainerTrackingTab/DepotReports",
            defaults: new { controller = "ContainerTrackingGroup", action = "ViewDepotReports" }
            );
            routes.MapRoute(
                name: "ViewHousesOrders",
                url: "ContainerTrackingGroup/ContainerTrackingTab/HousesOrders",
                defaults: new { controller = "ContainerTrackingGroup", action = "ViewHousesOrders" }
            );
            routes.MapRoute(
                name: "ViewOperationsACIDDetails",
                url: "ContainerTrackingGroup/ContainerTrackingTab/OperationsACIDDetails",
                defaults: new { controller = "ContainerTrackingGroup", action = "ViewOperationsACIDDetails" }
            );
            routes.MapRoute(//nour06112023
                name: "ViewHoldBills",
                url: "ContainerTrackingGroup/ContainerTrackingTab/HoldBills",
                defaults: new { controller = "ContainerTrackingGroup", action = "ViewHoldBills" }
            );
            #endregion ContainerTrackingGroup/ContainerTracking

            #region ContainerTrackingGroup/XML
            routes.MapRoute(
                name: "ViewXMLFileBL",
                url: "ContainerTrackingGroup/XMLTab/XMLFileBL",
                defaults: new { controller = "ContainerTrackingGroup", action = "ViewXMLFileBL" }
            );
            routes.MapRoute(
                name: "ViewXMLIABOriginalStandardInvoice",
                url: "ContainerTrackingGroup/XMLTab/XMLIABOriginalStandardInvoice",
                defaults: new { controller = "ContainerTrackingGroup", action = "ViewXMLIABOriginalStandardInvoice" }
            );
            #endregion ContainerTrackingGroup/XML

            #region TR

            routes.MapRoute(
                name: "ViewTR_TruckingOrders",
                url: "TR/Transactions/TruckingOrders",
                defaults: new { controller = "TR", action = "ViewTR_TruckingOrders" }
                );

            routes.MapRoute(
                name: "ViewTR_TruckingOrdersOwnFleet",
                url: "TR/Transactions/TruckingOrdersOwnFleet",
                defaults: new { controller = "TR", action = "ViewTR_TruckingOrdersOwnFleet" }
                );

            routes.MapRoute(
                name: "ViewFleetQuotation",
                url: "TR/FleetQuotation/FleetQuotation",
                defaults: new { controller = "TR", action = "ViewFleetQuotation" }
            );

            routes.MapRoute(
                name: "ViewFleetTransportOrder",
                url: "TR/Transactions/FleetTransportOrder",
                defaults: new { controller = "TR", action = "ViewFleetTransportOrder" }
                );
            #endregion TR

            #region ReportMainClass
            routes.MapRoute(
            name: "ReportMainClass_PrintReport",
            url: "ReportMainClass/PrintReport/{pCutlureID}",
            defaults: new { controller = "ReportMainClass", action = "PrintReport", pCutlureID = UrlParameter.Optional }
            );

            routes.MapRoute(
            name: "ReportMainClass_PrintMultipleInvoicesLatt",
            url: "ReportMainClass/PrintMultipleInvoicesLatt/{pCutlureID}",
            defaults: new { controller = "ReportMainClass", action = "PrintMultipleInvoicesLatt", pCutlureID = UrlParameter.Optional }
            );

            routes.MapRoute(
            name: "Invoices_SendFastReportByMail",
            url: "Invoices/SendFastReportByMail/{pCutlureID}",
            defaults: new { controller = "Invoices", action = "SendFastReportByMail", pCutlureID = UrlParameter.Optional }
            );
            
            routes.MapRoute(
            name: "Invoices_PaymentWithClickPayAsync",
            url: "Invoices/PaymentWithClickPayAsync/{pCutlureID}",
            defaults: new { controller = "Invoices", action = "PaymentWithClickPayAsync", pCutlureID = UrlParameter.Optional }
            );
            routes.MapRoute(
          name: "PrintInqueryReport",
          url: "ReportMainClass/PrintInqueryReport/{pCutlureID}",
          defaults: new { controller = "ReportMainClass", action = "PrintInqueryReport", pCutlureID = UrlParameter.Optional }
          );

            routes.MapRoute(
          name: "PrintPS_Payment",
          url: "ReportMainClass/PrintPS_Payment/{pCutlureID}",
          defaults: new { controller = "ReportMainClass", action = "PrintPS_Payment", pCutlureID = UrlParameter.Optional }
          );

            routes.MapRoute(
          name: "PrintWithIDs",
          url: "ReportMainClass/PrintWithIDs/{pCutlureID}",
          defaults: new { controller = "ReportMainClass", action = "PrintWithIDs", pCutlureID = UrlParameter.Optional }
          );
            routes.MapRoute(
            name: "ReportMainClass_PrintReportQueryAndParams",
            url: "ReportMainClass/PrintReportQueryAndParams/{pCutlureID}",
            defaults: new { controller = "ReportMainClass", action = "PrintReportQueryAndParams", pCutlureID = UrlParameter.Optional }
            );
            routes.MapRoute(
           name: "ReportMainClass_PrintReportTwoQueries",
           url: "ReportMainClass/PrintReportTwoQueries/{pCutlureID}",
           defaults: new { controller = "ReportMainClass", action = "PrintReportTwoQueries", pCutlureID = UrlParameter.Optional }
           );

            #endregion ReportMainClass



            #region GlobalReports
            routes.MapRoute(
name: "GlobalReports_ViewInvoiceReport",
url: "GlobalReports/ViewInvoiceReport/{pCutlureID}",
defaults: new { controller = "GlobalReports", action = "ViewInvoiceReport", pCutlureID = UrlParameter.Optional }
);

            routes.MapRoute(
name: "GlobalReports_ViewPayablesReport",
url: "GlobalReports/ViewPayablesReport/{pCutlureID}",
defaults: new { controller = "GlobalReports", action = "ViewPayablesReport", pCutlureID = UrlParameter.Optional }
);


            routes.MapRoute(
name: "GlobalReports_ViewOperAccountStatement",
url: "GlobalReports/ViewOperAccountStatement/{pCutlureID}",
defaults: new { controller = "GlobalReports", action = "ViewOperAccountStatement", pCutlureID = UrlParameter.Optional }
);

            #endregion GlobalReports




            #region Pricing/PricingSettings
            routes.MapRoute(
                name: "ViewPricingSettings",
                url: "Pricing/PricingSettings",
                defaults: new { controller = "Pricing", action = "ViewPricingSettings" }
            );
            #endregion Pricing/PricingSettings

            #region Pricing/Pricing
            routes.MapRoute(
                name: "ViewPricing",
                url: "Pricing/Pricing",
                defaults: new { controller = "Pricing", action = "ViewPricing" }
            );
            #endregion Pricing/Pricing

            #region Pricing/BookingSchedule
            routes.MapRoute(
                name: "ViewBookings",
                url: "Pricing/Bookings",
                defaults: new { controller = "Pricing", action = "ViewBookings" }
            );
            #endregion Pricing/BookingSchedule

            routes.MapRoute(
                name: "ViewShipsGoCustomers",
                url: "Pricing/ShipsGoCustomers",
                defaults: new { controller = "Pricing", action = "ViewShipGoCustomers" }
            );
            routes.MapRoute(
                name: "ViewTrackedShipments",
                url: "Pricing/TrackedShipments",
                defaults: new { controller = "Pricing", action = "ViewTrackedShipments" }
            );

            #region Quotations/Quotations
            //Quotations/Quotations?pCutlureID=en
            routes.MapRoute(
                name: "ViewQuotations",
                url: "Quotations/Quotations",
                defaults: new { controller = "Quotations", action = "ViewQuotations" }
            );
            //Quotations/ModalQuotations?pCutlureID=en
            routes.MapRoute( // PartnerTypeID = 1
                name: "ViewModalQuotations",
                url: "Quotations/ModalQuotations",
                defaults: new { controller = "Quotations", action = "ViewModalQuotations" }
            );
            //Quotations/QuotationsEdit?pCutlureID=en
            routes.MapRoute( // PartnerTypeID = 1
                name: "ViewQuotationsEdit",
                url: "Quotations/QuotationsEdit",
                defaults: new { controller = "Quotations", action = "ViewQuotationsEdit" }
            );

            routes.MapRoute( // PartnerTypeID = 1
            name: "ViewQuotationsDashboard",
            url: "Quotations/QuotationsDashboard",
            defaults: new { controller = "Quotations", action = "ViewQuotationsDashboard" }
        );
            #endregion

            #region Operations/Operations
            //Operations/Operations?pCutlureID=en
            routes.MapRoute(
                name: "ViewOperations",
                url: "Operations/Operations",
                defaults: new { controller = "Operations", action = "ViewOperations" }
            );
            //Operations/OperationsEdit?pCutlureID=en
            routes.MapRoute( // PartnerTypeID = 1
                name: "ViewOperationsEdit",
                url: "Operations/OperationsEdit",
                defaults: new { controller = "Operations", action = "ViewOperationsEdit" }
            );
            //Operations/ModalRoutings?pCutlureID=en
            routes.MapRoute(
                name: "ViewModalRoutings",
                url: "Operations/ModalRoutings",
                defaults: new { controller = "Operations", action = "ViewModalRoutings" }
            );
            //Operations/ModalPayables?pCutlureID=en
            routes.MapRoute(
                name: "ViewModalPayables",
                url: "Operations/ModalPayables",
                defaults: new { controller = "Operations", action = "ViewModalPayables" }
            );
            //Operations/ModalReceivables?pCutlureID=en
            routes.MapRoute(
                name: "ViewModalReceivables",
                url: "Operations/ModalReceivables",
                defaults: new { controller = "Operations", action = "ViewModalReceivables" }
            );
            //Operations/ModalRebuildConsolidation?pCutlureID=en
            routes.MapRoute(
                name: "ViewModalRebuildConsolidation",
                url: "Operations/ModalRebuildConsolidation",
                defaults: new { controller = "Operations", action = "ViewModalRebuildConsolidation" }
            );
            //Operations/ModalMapHouseToContainer?pCutlureID=en
            routes.MapRoute(
                name: "ViewModalMapHouseToContainer",
                url: "Operations/ModalMapHouseToContainer",
                defaults: new { controller = "Operations", action = "ViewModalMapHouseToContainer" }
            );
            //Operations/ModalInvoices?pCutlureID=en
            routes.MapRoute(
                name: "ViewModalInvoices",
                url: "Operations/ModalInvoices",
                defaults: new { controller = "Operations", action = "ViewModalInvoices" }
            );
            //Operations/ModalShipments?pCutlureID=en
            routes.MapRoute( // PartnerTypeID = 1
                name: "ViewModalShipments",
                url: "Operations/ModalShipments",
                defaults: new { controller = "Operations", action = "ViewModalShipments" }
            );
            //Operations/ModalSelectContainersAndPackages?pCutlureID=en
            routes.MapRoute(
                name: "ViewModalSelectContainersAndPackages",
                url: "Operations/ModalSelectContainersAndPackages",
                defaults: new { controller = "Operations", action = "ViewModalSelectContainersAndPackages" }
            );
            //Operations/ModalSelectContainersAndPackages?pCutlureID=en
            routes.MapRoute(
                name: "ViewModalSelectOperationsContainersAndPackages",
                url: "Operations/ModalSelectOperationsContainersAndPackages",
                defaults: new { controller = "Operations", action = "ViewModalSelectOperationsContainersAndPackages" }
            );
            #endregion

            #region Reports/QuotationsStatistics
            //Reports/QuotationsStatistics?pCutlureID=en
            routes.MapRoute(
                name: "ViewStatisticsQuotationsStatistics",
                url: "Reports/QuotationsStatistics",
                defaults: new { controller = "Reports", action = "ViewStatisticsQuotationsStatistics" }
            );
            routes.MapRoute(
         name: "ViewMESReports",
         url: "Reports/MESReports",
         defaults: new { controller = "Reports", action = "ViewMESReports" }
     );
            //Reports/Operational?pCutlureID=en
            routes.MapRoute(
                name: "ViewStatisticsProfitStatistics",
                url: "Reports/ProfitStatistics",
                defaults: new { controller = "Reports", action = "ViewStatisticsProfitStatistics" }
            );
            //Reports/Operational?pCutlureID=en
            routes.MapRoute(
                name: "ViewStatisticsProfitabilityReport",
                url: "Reports/ProfitabilityReport",
                defaults: new { controller = "Reports", action = "ViewStatisticsProfitabilityReport" }
            );
            routes.MapRoute(
                name: "ViewDashboardGroup",
                url: "Reports/DashboardGroup",
                 defaults: new { controller = "Reports", action = "ViewDashboardGroup" }
            );
            #endregion

            #region Reports/Statistics
            //Reports/Statistics?pCutlureID=en
            routes.MapRoute(
                name: "ViewStatisticsDailyShipments",
                url: "Reports/DailyShipments",
                defaults: new { controller = "Reports", action = "ViewStatisticsDailyShipments" }
            );
            //Reports/Statistics?pCutlureID=en
            routes.MapRoute(
                name: "ViewStatisticsOperationsStatistics",
                url: "Reports/OperationsStatistics",
                defaults: new { controller = "Reports", action = "ViewStatisticsOperationsStatistics" }
            );
            routes.MapRoute(
              name: "ViewManifestStatistics",
              url: "Reports/ManifestStatistics",
              defaults: new { controller = "Reports", action = "ViewManifestStatistics" }
          );

            //Reports/Statistics?pCutlureID=en
            routes.MapRoute(
                name: "ViewStatisticsContainerTrackingReport",
                url: "Reports/ContainerTrackingReport",
                defaults: new { controller = "Reports", action = "ViewStatisticsContainerTrackingReport" }
            );
            //Reports/Statistics?pCutlureID=en
            routes.MapRoute(
                name: "ViewStatisticsTEUsStatistics",
                url: "Reports/TEUsStatistics",
                defaults: new { controller = "Reports", action = "ViewStatisticsTEUsStatistics" }
            );
            //Reports/Statistics?pCutlureID=en
            routes.MapRoute(
                name: "ViewVendorsReport",
                url: "Reports/VendorsReport",
                defaults: new { controller = "Reports", action = "ViewVendorsReport" }
            );//Reports/Statistics?pCutlureID=en
              //Reports/Statistics?pCutlureID=en
            routes.MapRoute(
             name: "ViewStatisticsCustomersReport",
             url: "Reports/CustomersReport",
             defaults: new { controller = "Reports", action = "ViewStatisticsCustomersReport" }
         );
            routes.MapRoute(
                name: "ViewStatisticsCustomsClearanceReport",
                url: "Reports/CustomsClearanceReport",
                defaults: new { controller = "Reports", action = "ViewStatisticsCustomsClearanceReport" }
            );//Reports/Statistics?pCutlureID=en
            routes.MapRoute(
                name: "ViewStatisticsTrailerProfitability",
                url: "Reports/TrailerProfitability",
                defaults: new { controller = "Reports", action = "ViewStatisticsTrailerProfitability" }
            );
            //Reports/Statistics?pCutlureID=en
            routes.MapRoute(
                name: "ViewStatisticsFlexiTankStatus",
                url: "Reports/FlexiTankStatus",
                defaults: new { controller = "Reports", action = "ViewStatisticsFlexiTankStatus" }
            );
            #endregion

            #region Reports/AccountingReports
            //Reports/AccountingReports?pCutlureID=en
            routes.MapRoute(
                name: "ViewPartnersStatements",
                url: "Reports/PartnersStatements",
                defaults: new { controller = "Reports", action = "ViewPartnersStatements" }
            );
            routes.MapRoute(
                name: "ViewAccountStatement",
                url: "Reports/AccountStatement",
                defaults: new { controller = "Reports", action = "ViewAccountStatement" }
            );
            //Reports/AccountingReports?pCutlureID=en
            routes.MapRoute(
                name: "ViewCustodyStatement",
                url: "Reports/CustodyStatement",
                defaults: new { controller = "Reports", action = "ViewCustodyStatement" }
            );
            //Reports/AccountingReports?pCutlureID=en
            routes.MapRoute(
                name: "ViewAllocationStatement",
                url: "Reports/AllocationStatement",
                defaults: new { controller = "Reports", action = "ViewAllocationStatement" }
            );
            //Reports/AccountingReports?pCutlureID=en
            routes.MapRoute(
                name: "ViewBanksStatements",
                url: "Reports/BanksStatements",
                defaults: new { controller = "Reports", action = "ViewBanksStatements" }
            );
            //Reports/AccountingReports?pCutlureID=en
            routes.MapRoute(
                name: "ViewTreasuriesStatements",
                url: "Reports/TreasuriesStatements",
                defaults: new { controller = "Reports", action = "ViewTreasuriesStatements" }
            );
            //Reports/AccountingReports?pCutlureID=en
            routes.MapRoute(
                name: "ViewInvoicesReports",
                url: "Reports/InvoicesReports",
                defaults: new { controller = "Reports", action = "ViewInvoicesReports" }
            );
            //Reports/AccountingReports?pCutlureID=en
            routes.MapRoute(
                name: "ViewPayablesReports",
                url: "Reports/PayablesReports",
                defaults: new { controller = "Reports", action = "ViewPayablesReports" }
            );
            //Reports/AccountingReports?pCutlureID=en
            routes.MapRoute(
                name: "ViewAccNotesReports",
                url: "Reports/AccNotesReports",
                defaults: new { controller = "Reports", action = "ViewAccNotesReports" }
            );
            //Reports/AccountingReports?pCutlureID=en
            routes.MapRoute(
                name: "ViewChequesReports",
                url: "Reports/ChequesReports",
                defaults: new { controller = "Reports", action = "ViewChequesReports" }
            );
            //Reports/AccountingReports?pCutlureID=en
            routes.MapRoute(
                name: "ViewAgingReports",
                url: "Reports/AgingReports",
                defaults: new { controller = "Reports", action = "ViewAgingReports" }
            );
			routes.MapRoute(
			  name: "ViewServiceInvoiceReport",
			  url: "Reports/ServiceInvoiceReport",
			  defaults: new { controller = "Reports", action = "ViewServiceInvoiceReport" }
		  );
			#endregion
			#region ShipLinkStarShine
			routes.MapRoute(
            name: "ViewShipLinkClientsStarShine",
            url: "ReceiptsAndPayments/ShipLinkStarShine/ShipLinkClientsStarShine",
            defaults: new { controller = "ReceiptsAndPayments", action = "ViewShipLinkClientsStarShine" }
           );
            routes.MapRoute(
            name: "ViewShipLinkStarShineRevenueItems",
            url: "ReceiptsAndPayments/ShipLinkStarShine/ShipLinkStarShineRevenueItems",
            defaults: new { controller = "ReceiptsAndPayments", action = "ViewShipLinkStarShineRevenueItems" }
           );

            routes.MapRoute(
           name: "ViewUserShippingLinkStarShine",
           url: "ReceiptsAndPayments/ShipLinkStarShine/UserShippingLinkStarShine",
           defaults: new { controller = "ReceiptsAndPayments", action = "ViewUserShippingLinkStarShine" }
          );

            routes.MapRoute(
        name: "ViewA_PaymentsStarShine",
        url: "ReceiptsAndPayments/ShipLinkStarShine/A_PaymentsStarShine",
        defaults: new { controller = "ReceiptsAndPayments", action = "ViewA_PaymentsStarShine" }
       );

            #endregion
            #region shiplink
            ///////ShipLinkMelk
            routes.MapRoute(
              name: "ViewSL_Clients",
              url: "ReceiptsAndPayments/ShipLinkMelk/SL_Clients",
              defaults: new { controller = "ReceiptsAndPayments", action = "ViewSL_Clients" }
           );

            routes.MapRoute(
              name: "ViewSafesJournalPayment",
              url: "ReceiptsAndPayments/ShipLinkMelk/SafesJournalPayment",
              defaults: new { controller = "ReceiptsAndPayments", action = "ViewSafesJournalPayment" }
           );


            routes.MapRoute(
              name: "ViewShipLinkClientsMelk",
              url: "ReceiptsAndPayments/ShipLinkMelk/ShipLinkClientsMelk",
              defaults: new { controller = "ReceiptsAndPayments", action = "ViewShipLinkClientsMelk" }
           );
            routes.MapRoute(
               name: "ViewShipLinkMelkCurrencyClientLinking",
               url: "ReceiptsAndPayments/ShipLinkMelk/ShipLinkMelkCurrencyClientLinking",
               defaults: new { controller = "ReceiptsAndPayments", action = "ViewShipLinkMelkCurrencyClientLinking" }
            );
            routes.MapRoute(
          name: "ViewShipLinkMelkRevenueItems",
          url: "ReceiptsAndPayments/ShipLinkMelk/ShipLinkMelkRevenueItems",
          defaults: new { controller = "ReceiptsAndPayments", action = "ViewShipLinkMelkRevenueItems" }
          );
            routes.MapRoute(
          name: "ViewShipLinkMelkPayments",
          url: "ReceiptsAndPayments/ShipLinkMelk/A_Payments",
          defaults: new { controller = "ReceiptsAndPayments", action = "ViewShipLinkMelkPayments" }
          );
            routes.MapRoute(
            name: "ViewUserShippingLink",
            url: "ReceiptsAndPayments/ShipLinkMelk/UserShippingLink",
            defaults: new { controller = "ReceiptsAndPayments", action = "ViewUserShippingLink" }
            );
            routes.MapRoute(
                name: "ViewUserShiplinkScenery",
                url: "ReceiptsAndPayments/ShiplinkScenery/UserShiplinkScenery",
                defaults: new { controller = "ReceiptsAndPayments", action = "ViewUserShiplinkScenery" }
                );
            routes.MapRoute(
            name: "ViewSceneryPayments",
            url: "ReceiptsAndPayments/ShiplinkScenery/A_SceneryPayments",
            defaults: new { controller = "ReceiptsAndPayments", action = "ViewSceneryPayments" }
            );
            ///////////
            ///
            /// ///////ShipLinkEGL

            routes.MapRoute(
              name: "ViewShipLinkClientsEGL",
              url: "ReceiptsAndPayments/ShipLinkEGL/ShipLinkClientsEGL",
              defaults: new { controller = "ReceiptsAndPayments", action = "ViewShipLinkClientsEGL" }
           );

            routes.MapRoute(
          name: "ViewShipLinkEGLRevenueItems",
          url: "ReceiptsAndPayments/ShipLinkEGL/ShipLinkEGLRevenueItems",
          defaults: new { controller = "ReceiptsAndPayments", action = "ViewShipLinkEGLRevenueItems" }
          );
            routes.MapRoute(
          name: "ViewShipLinkEGLPayments",
          url: "ReceiptsAndPayments/ShipLinkEGL/A_PaymentsEGL",
          defaults: new { controller = "ReceiptsAndPayments", action = "ViewShipLinkEGLPayments" }
          );
            routes.MapRoute(
            name: "ViewUserShippingLinkEGL",
            url: "ReceiptsAndPayments/ShipLinkEGL/UserShippingLinkEGL",
            defaults: new { controller = "ReceiptsAndPayments", action = "ViewUserShippingLinkEGL" }
            );
            routes.MapRoute(
           name: "ViewPS_InvoicesTemp",
           url: "ReceiptsAndPayments/ShipLinkEGL/PS_InvoicesTemp",
           defaults: new { controller = "ReceiptsAndPayments", action = "ViewPS_InvoicesTemp" }
           );
            routes.MapRoute(
          name: "ViewServicesTemp",
          url: "ReceiptsAndPayments/ShipLinkEGL/ServicesTemp",
          defaults: new { controller = "ReceiptsAndPayments", action = "ViewServicesTemp" }
          );

            routes.MapRoute(
            name: "ViewPS_ApproveInvoiceTemp",
            url: "ReceiptsAndPayments/PS_ApproveInvoiceTemp",
            defaults: new { controller = "ReceiptsAndPayments", action = "ViewPS_ApproveInvoiceTemp" }
            );

            routes.MapRoute(
            name: "ViewPS_UnApproveInvoiceTemp",
            url: "ReceiptsAndPayments/PS_UnApproveInvoiceTemp",
            defaults: new { controller = "ReceiptsAndPayments", action = "ViewPS_UnApproveInvoiceTemp" }
            );

            routes.MapRoute(
            name: "ViewPS_PaymentsTemp",
            url: "ReceiptsAndPayments/ShipLinkEGL/PS_PaymentsTemp",
            defaults: new { controller = "ReceiptsAndPayments", action = "ViewPS_PaymentsTemp" }
            );


            ///////////
            ///
            //ShipLink/AccountingReports?pCutlureID=en
            routes.MapRoute(
               name: "ViewShipLinkClients",
               url: "ReceiptsAndPayments/ShipLink/ShipLinkClients",
               defaults: new { controller = "ReceiptsAndPayments", action = "ViewShipLinkClients" }
            );
            routes.MapRoute(
               name: "ViewShipLinkCurrencyClientLinking",
               url: "ReceiptsAndPayments/ShipLink/ShipLinkCurrencyClientLinking",
               defaults: new { controller = "ReceiptsAndPayments", action = "ViewShipLinkCurrencyClientLinking" }
            );
            routes.MapRoute(
              name: "ViewShipLinkRevenueItems",
              url: "ReceiptsAndPayments/ShipLink/ShipLinkRevenueItems",
              defaults: new { controller = "ReceiptsAndPayments", action = "ViewShipLinkRevenueItems" }
           );
            routes.MapRoute(
             name: "ViewShipLinkInvoicePosting",
             url: "ReceiptsAndPayments/ShipLink/ShipLinkInvoicePosting",
             defaults: new { controller = "ReceiptsAndPayments", action = "ViewShipLinkInvoicePosting" }
           );
            routes.MapRoute(
                 name: "ViewShipLinkInvoicePostingEISC",
                 url: "ReceiptsAndPayments/ShipLinkEISC/ShipLinkInvoicePostingEISC",
                 defaults: new { controller = "ReceiptsAndPayments", action = "ViewShipLinkInvoicePostingEISC" }
                );
            routes.MapRoute(
             name: "ViewShipLinkEISCRevenueItems",
             url: "ReceiptsAndPayments/ShipLinkEISC/ShipLinkEISCRevenueItems",
             defaults: new { controller = "ReceiptsAndPayments", action = "ViewShipLinkEISCRevenueItems" }
            );
            routes.MapRoute(
             name: "ViewShipLinkInvoiceUnposting",
             url: "ReceiptsAndPayments/ShipLink/ShipLinkInvoiceUnposting",
             defaults: new { controller = "ReceiptsAndPayments", action = "ViewShipLinkInvoiceUnposting" }
            );

            routes.MapRoute(
            name: "ViewShipLinkInvoiceTypeToJournal",
            url: "ReceiptsAndPayments/ShipLink/ShipLinkInvoiceTypeToJournal",
            defaults: new { controller = "ReceiptsAndPayments", action = "ViewShipLinkInvoiceTypeToJournal" }
            );
            routes.MapRoute(
            name: "ViewShipLinkInvoiceTypeToJournalPayment",
            url: "ReceiptsAndPayments/ShipLink/ShipLinkInvoiceTypeToJournal_Payment",
            defaults: new { controller = "ReceiptsAndPayments", action = "ViewShipLinkInvoiceTypeToJournalPayment" }
            );

            routes.MapRoute(
                name: "ViewShipLinkCreditNotePosting",
                url: "ReceiptsAndPayments/ShipLink/ShipLinkCreditNotePosting",
                defaults: new { controller = "ReceiptsAndPayments", action = "ViewShipLinkCreditNotePosting" }
            );

            #endregion
            #region Yardlink
            ///////ShipLinkMelk
            routes.MapRoute(
              name: "ViewYardLinkClients",
              url: "ReceiptsAndPayments/YardLink/YardLinkClients",
              defaults: new { controller = "ReceiptsAndPayments", action = "ViewYardLinkClients" }
           );
            routes.MapRoute(
                   name: "ViewYardInvoicePosting",
                   url: "ReceiptsAndPayments/YardLink/YardInvoicePosting",
                   defaults: new { controller = "ReceiptsAndPayments", action = "ViewYardInvoicePosting" }
                );

            #endregion
            #region YardlinkTank
            routes.MapRoute(
              name: "ViewYardLinkTankClients",
              url: "ReceiptsAndPayments/YardLinkTank/YardLinkTankClients",
              defaults: new { controller = "ReceiptsAndPayments", action = "ViewYardLinkTankClients" }
           );
            routes.MapRoute(
                   name: "ViewYardLinkTanknvoicePosting",
                   url: "ReceiptsAndPayments/YardLinkTank/YardLinkTankInvoicePosting",
                   defaults: new { controller = "ReceiptsAndPayments", action = "ViewYardLinkTanknvoicePosting" }
                );

            routes.MapRoute(
                  name: "ViewYardLinkTankCreditPosting",
                  url: "ReceiptsAndPayments/YardLinkTank/YardLinkTankCreditPosting",
                  defaults: new { controller = "ReceiptsAndPayments", action = "ViewYardLinkTankCreditPosting" }
               );

            #endregion
            #region Administration/Settings
            //Administration/Settings?pCutlureID=en
            routes.MapRoute(
               name: "ViewPostingVoucherTax",
               url: "Administration/Post_Unpost_VoucherTax",
               defaults: new { controller = "Administration", action = "ViewPost_Unpost_VoucherTax" }
           );
            //    routes.MapRoute(
            //    name: "ViewInvoiceApprovalTax",
            //    url: "Administration/InvoiceApproval",
            //    defaults: new { controller = "Administration", action = "ViewInvoiceApprovalTax" }
            //);
            routes.MapRoute(
               name: "ViewInvoiceApprovalTax",
               url: "Administration/InvoiceApprovalTax",
               defaults: new { controller = "Administration", action = "ViewInvoiceApprovalTax" }
           );
            routes.MapRoute(
              name: "View_AccNoteApprovalTax",
              url: "Administration/AccountingAccNotesApprovalsTax",
              defaults: new { controller = "Administration", action = "View_AccNoteApprovalTax" }
          );
            routes.MapRoute(
             name: "ViewPost_Restore_Unpost_JVsTax",
             url: "Administration/Post_Restore_Unpost_JVsTax",
             defaults: new { controller = "Administration", action = "ViewPost_Restore_Unpost_JVsTax" }
         );
            routes.MapRoute(
             name: "View_AccountingOperationsPayablesApprovalsTax",
             url: "Administration/AccountingOperationsPayablesApprovalsTax",
             defaults: new { controller = "Administration", action = "View_AccountingOperationsPayablesApprovalsTax" }

         );
            routes.MapRoute(
             name: "View_SC_ApproveTransactionTax",
             url: "Administration/SC_ApproveTransactionTax",
             defaults: new { controller = "Administration", action = "View_SC_ApproveTransactionTax" }

         );
            routes.MapRoute(
           name: "View_SC_UnApproveTransactionTax",
           url: "Administration/SC_UnApproveTransactionTax",
           defaults: new { controller = "Administration", action = "View_SC_UnApproveTransactionTax" }

       );
            routes.MapRoute(
          name: "View_PS_ApproveInvoiceTax",
          url: "Administration/PS_ApproveInvoiceTax",
          defaults: new { controller = "Administration", action = "View_PS_ApproveInvoiceTax" }

      );
            routes.MapRoute(
          name: "View_PS_UnApproveInvoiceTax",
          url: "Administration/PS_UnApproveInvoiceTax",
          defaults: new { controller = "Administration", action = "View_PS_UnApproveInvoiceTax" }

      );
            routes.MapRoute(
                name: "ViewBranches",
                url: "Administration/Branches",
                defaults: new { controller = "Administration", action = "ViewBranches" }
            );
            routes.MapRoute(
    name: "ViewLicenseExpireDateAlarmsUsers",
    url: "Administration/LicenseExpireDateAlarmsUsers",
    defaults: new { controller = "Administration", action = "ViewLicenseExpireDateAlarmsUsers" }
);
            routes.MapRoute(
               name: "ViewMergeDuplicate",
               url: "Administration/MergeDuplicate",
               defaults: new { controller = "Administration", action = "ViewMergeDuplicate" }
           );


            routes.MapRoute(
               name: "ViewFA_Departments",
               url: "Administration/FA_Departments",
               defaults: new { controller = "Administration", action = "ViewFA_Departments" }
           );

            routes.MapRoute(
              name: "ViewFA_Devisons",
              url: "Administration/FA_Devisons",
              defaults: new { controller = "Administration", action = "ViewFA_Devisons" }
          );


            routes.MapRoute(
             name: "ViewFA_UserBranches",
             url: "Administration/FA_UserBranches",
             defaults: new { controller = "Administration", action = "ViewFA_UserBranches" }
         );

            #endregion Administration/Settings

            #region Administration/Settings
            //Administration/Settings?pCutlureID=en
            routes.MapRoute(
                name: "ViewDefaults",
                url: "Administration/Defaults",
                defaults: new { controller = "Administration", action = "ViewDefaults" }
            );
            #endregion Administration/Settings

            #region Administration/Settings
            //Administration/Settings?pCutlureID=en
            routes.MapRoute(
                name: "ViewNoAccessDepartments",
                url: "Administration/NoAccessDepartments",
                defaults: new { controller = "Administration", action = "ViewNoAccessDepartments" }
            );
            #endregion Administration/Settings

            #region Administration/Settings
            //Administration/Settings?pCutlureID=en
            routes.MapRoute(
                name: "ViewSec_UserSafes",
                url: "Administration/Sec_UserSafes",
                defaults: new { controller = "Administration", action = "ViewSec_UserSafes" }
            );
            routes.MapRoute(
                name: "ViewSec_UserBanks",
                url: "Administration/Sec_UserBanks",
                defaults: new { controller = "Administration", action = "ViewSec_UserBanks" }
            );
            routes.MapRoute(
               name: "ViewSystemOptions",
               url: "Administration/SystemOptions",
               defaults: new { controller = "Administration", action = "ViewSystemOptions" }
            );
            routes.MapRoute(
               name: "ViewA_PaymentRequest_UsersLevel",
               url: "Administration/A_PaymentRequest_UsersLevel",
               defaults: new { controller = "Administration", action = "ViewA_PaymentRequest_UsersLevel" }
            );
            routes.MapRoute(
           name: "ViewLinkeUserWithAccounts",
           url: "Administration/Settings/LinkeUserWithAccounts",
           defaults: new { controller = "Administration", action = "ViewLinkeUserWithAccounts" }
        );
            #endregion Administration/Settings

            #region Administration/Security
            //Administration/Roles?pCutlureID=en
            routes.MapRoute(
                name: "ViewRoles",
                url: "Administration/Roles",
                defaults: new { controller = "Administration", action = "ViewRoles" }
            );
            //Administration/Users?pCutlureID=en
            routes.MapRoute(
                name: "ViewUsers",
                url: "Administration/Users",
                defaults: new { controller = "Administration", action = "ViewUsers" }
            );
            //Administration/RolePrivileges?pCutlureID=en
            routes.MapRoute(
                name: "ViewRolePrivileges",
                url: "Administration/RolePrivileges",
                defaults: new { controller = "Administration", action = "ViewRolePrivileges" }
            );
            //Administration/UserPrivileges?pCutlureID=en
            routes.MapRoute(
                name: "ViewUserPrivileges",
                url: "Administration/UserPrivileges",
                defaults: new { controller = "Administration", action = "ViewUserPrivileges" }
            );
            #endregion Administration/Security

            #region Administration/Logs
            //Administration/Logs?pCutlureID=en
            routes.MapRoute(
                name: "ViewOperationChargeLog",
                url: "Administration/OperationChargeLog",
                defaults: new { controller = "Administration", action = "ViewOperationChargeLog" }
            );
            routes.MapRoute(
                name: "ViewHousesLogs",
                url: "Administration/HousesLogs",
                defaults: new { controller = "Administration", action = "ViewHousesLogs" }
            );
            routes.MapRoute(
                   name: "ViewVoucherLog",
                   url: "Administration/VoucherLog",
                   defaults: new { controller = "Administration", action = "ViewVoucherLog" }
               );
            routes.MapRoute(
                   name: "ViewDynamicsCRMLog",
                   url: "Administration/DynamicsCRMLog",
                   defaults: new { controller = "Administration", action = "ViewDynamicsCRMLog" }
               );
            #endregion Administration/Logs

            #region Administration/Miscellaneous
            //Administration/Settings?pCutlureID=en
            routes.MapRoute(
                name: "ViewDeletedInvoices",
                url: "Administration/DeletedInvoices",
                defaults: new { controller = "Administration", action = "ViewDeletedInvoices" }
            );
            routes.MapRoute(
               name: "ViewCreditlimitexceptionperiod",
               url: "Administration/Creditlimitexceptionperiod",
               defaults: new { controller = "Administration", action = "ViewCreditlimitexceptionperiod" }
           );
            #endregion Administration/Settings

            #region  Administration/DisbursementLink
            routes.MapRoute(
                name: "ViewUserLink",
                url: "Administration/UserLink",
                defaults: new { controller = "Administration", action = "ViewUserLink" }
            );
            #endregion Administration/DisbursementLink

            #region  Administration/FavoriteReports
            routes.MapRoute(
                name: "ViewChooseReports",
                url: "Administration/ChooseReports",
                defaults: new { controller = "Administration", action = "ViewChooseReports" }
            );
            #endregion Administration/FavoriteReports

            #region OperAcc/Payment For both A\R and A\P Payments
            //OperAcc/Payment?pCutlureID=en
            routes.MapRoute(
                name: "ViewPayment",
                url: "OperAcc/Payment",
                defaults: new { controller = "OperAcc", action = "ViewPayment" }
            );
            #endregion OperAcc/ARPayment

            #region OperAcc/OpenBalance
            routes.MapRoute(
                name: "ViewPartnerOpenBalance",
                url: "OperAcc/PartnerOpenBalance",
                defaults: new { controller = "OperAcc", action = "ViewPartnerOpenBalance" }
            );
            routes.MapRoute(
                name: "ViewTreasuryOpenBalance",
                url: "OperAcc/TreasuryOpenBalance",
                defaults: new { controller = "OperAcc", action = "ViewTreasuryOpenBalance" }
            );
            routes.MapRoute(
                name: "ViewBankOpenBalance",
                url: "OperAcc/BankOpenBalance",
                defaults: new { controller = "OperAcc", action = "ViewBankOpenBalance" }
            );
            #endregion OperAcc/OpenBalance

            #region OperAcc/ARAllocation
            //OperAcc/ARAllocation?pCutlureID=en
            routes.MapRoute(
                name: "ViewARAllocation",
                url: "OperAcc/ARAllocation",
                defaults: new { controller = "OperAcc", action = "ViewARAllocation" }
            );
            #endregion OperAcc/ARAllocation

            #region OperAcc/PaymentApproval
            //OperAcc/PaymentApproval?pCutlureID=en
            routes.MapRoute(
                name: "ViewPaymentApproval",
                url: "OperAcc/PaymentApproval",
                defaults: new { controller = "OperAcc", action = "ViewPaymentApproval" }
            );
            #endregion OperAcc/PaymentApproval

            #region OperAcc/OperationPayableApproval
            //OperAcc/OperationPayableApproval?pCutlureID=en
            routes.MapRoute(
                name: "ViewOperationPayableApproval",
                url: "OperAcc/OperationPayableApproval",
                defaults: new { controller = "OperAcc", action = "ViewOperationPayableApproval" }
            );
            routes.MapRoute(
                name: "ViewOperationPayableUnderProcessApproval",
                url: "OperAcc/OperationPayableUnderProcessApproval",
                defaults: new { controller = "OperAcc", action = "ViewOperationPayableUnderProcessApproval" }
            );
            #endregion OperAcc/OperationPayableApproval
            #region OperAcc/OperationPayableApproval
            //OperAcc/OperationPayableApproval?pCutlureID=en
            routes.MapRoute(
                name: "ViewOperationPayableStatues",
                url: "OperAcc/OperationPayableStatues",
                defaults: new { controller = "OperAcc", action = "ViewOperationPayableStatues" }
            );
            #endregion OperAcc/OperationPayableApproval

            #region OperAcc/InvoiceApproval
            //OperAcc/InvoiceApproval?pCutlureID=en
            routes.MapRoute(
                name: "ViewInvoiceApproval",
                url: "OperAcc/InvoiceApproval",
                defaults: new { controller = "OperAcc", action = "ViewInvoiceApproval" }
            );
            #endregion OperAcc/InvoiceApproval
            #region OperAcc/InvoicesPrint
            //OperAcc/InvoicesPrint?pCutlureID=en
            routes.MapRoute(
                name: "ViewInvoicesPrint",
                url: "OperAcc/InvoicesPrint",
                defaults: new { controller = "OperAcc", action = "ViewInvoicesPrint" }
            );
            #endregion OperAcc/InvoicesPrint
            #region OperAcc/TankPayablesAndReceivables
            //OperAcc/InvoiceApproval?pCutlureID=en
            routes.MapRoute(
                name: "ViewTankPayablesAndReceivables",
                url: "OperAcc/TankPayablesAndReceivables",
                defaults: new { controller = "OperAcc", action = "ViewTankPayablesAndReceivables" }
            );
            #endregion OperAcc/TankPayablesAndReceivables
            #region OperAcc/PurchaseInvoiceApproval
            //OperAcc/PurchaseInvoiceApproval?pCutlureID=en
            routes.MapRoute(
                name: "ViewPurchaseInvoiceApproval",
                url: "OperAcc/PurchaseInvoiceApproval",
                defaults: new { controller = "OperAcc", action = "ViewPurchaseInvoiceApproval" }
            );
            #endregion OperAcc/PurchaseInvoiceApproval

            #region OperAcc/AccNoteApproval
            //OperAcc/AccNoteApproval?pCutlureID=en
            routes.MapRoute(
                name: "ViewAccNoteApproval",
                url: "OperAcc/AccNoteApproval",
                defaults: new { controller = "OperAcc", action = "ViewAccNoteApproval" }
            );
            #endregion OperAcc/AccNoteApproval

            #region Accounting/MasterData
            routes.MapRoute(
                name: "ViewChartOfAccounts",
                url: "Accounting/MasterData/ChartOfAccounts",
                defaults: new { controller = "Accounting", action = "ViewChartOfAccounts" }
            );
            routes.MapRoute(
                name: "ViewChartOfLinkingAccounts",
                url: "Accounting/MasterData/ChartOfLinkingAccounts",
                defaults: new { controller = "Accounting", action = "ViewChartOfLinkingAccounts" }
            );
            routes.MapRoute(
                name: "ViewCostCenters",
                url: "Accounting/MasterData/CostCenters",
                defaults: new { controller = "Accounting", action = "ViewCostCenters" }
            );
            routes.MapRoute(
                name: "ViewJVTypes",
                url: "Accounting/MasterData/JVTypes",
                defaults: new { controller = "Accounting", action = "ViewJVTypes" }
            );
            routes.MapRoute(
                name: "ViewDailyExchangeRate",
                url: "Accounting/MasterData/DailyExchangeRate",
                defaults: new { controller = "Accounting", action = "ViewDailyExchangeRate" }
            );
            routes.MapRoute(
                name: "ViewJournalTypes",
                url: "Accounting/MasterData/JournalTypes",
                defaults: new { controller = "Accounting", action = "ViewJournalTypes" }
            );
            routes.MapRoute(
                name: "ViewOpnJVNo",
                url: "Accounting/MasterData/OpnJVNo",
                defaults: new { controller = "Accounting", action = "ViewOpnJVNo" }
            );
            routes.MapRoute(
                name: "ViewJVDefaults",
                url: "Accounting/MasterData/JVDefaults",
                defaults: new { controller = "Accounting", action = "ViewJVDefaults" }
            );
            routes.MapRoute(
                name: "ViewA_Fiscal_Year",
                url: "Accounting/MasterData/A_Fiscal_Year",
                defaults: new { controller = "Accounting", action = "ViewA_Fiscal_Year" }
            );
            routes.MapRoute(
               name: "ViewBudgets",
               url: "Accounting/MasterData/Budgets",
               defaults: new { controller = "Accounting", action = "ViewBudgets" }
            );
            routes.MapRoute(
              name: "ViewCashFlow",
              url: "Accounting/MasterData/CashFlow",
              defaults: new { controller = "Accounting", action = "ViewCashFlow" }
            );

            routes.MapRoute(
              name: "ViewInvestmentcostcenters",
              url: "Accounting/MasterData/Investmentcostcenters",
              defaults: new { controller = "Accounting", action = "ViewInvestmentcostcenters" }
            );
            routes.MapRoute(
               name: "ViewSubAccountsPrivilege",
               url: "Accounting/MasterData/SubAccountsPrivilege",
               defaults: new { controller = "Accounting", action = "ViewSubAccountsPrivilege" }
            );
            routes.MapRoute(
             name: "ViewSuppliersOther",
             url: "Accounting/MasterData/SuppliersOther",
             defaults: new { controller = "Accounting", action = "ViewSuppliersOther" }
          );
            #endregion Accounting/MasterData

            #region Accounting/Transactions
            routes.MapRoute(
                name: "ViewJournalVouchers",
                url: "Accounting/Transactions/JournalVouchers",
                defaults: new { controller = "Accounting", action = "ViewJournalVouchers" }
            );
            routes.MapRoute(
               name: "ViewJournalVouchersRepeated",
               url: "Accounting/Transactions/JournalVouchersRepeated",
               defaults: new { controller = "Accounting", action = "ViewJournalVouchersRepeated" }
           );
            routes.MapRoute(
                name: "ViewPostingJVs",
                url: "Accounting/Transactions/Post_Restore_Unpost_JVs",
                defaults: new { controller = "Accounting", action = "ViewPost_Restore_Unpost_JVs" }
            );
            routes.MapRoute(
                name: "ViewRestoringJVs",
                url: "Accounting/Transactions/RestoringJVs",
                defaults: new { controller = "Accounting", action = "ViewRestoringJVs" }
            );
            routes.MapRoute(
                name: "ViewOpenCloseFiscalYear",
                url: "Accounting/Transactions/OpenCloseFiscalYear",
                defaults: new { controller = "Accounting", action = "ViewOpenCloseFiscalYear" }
            );


            routes.MapRoute(
                name: "ViewForeignCurrencyRevaluation",
                url: "Accounting/Transactions/ForeignCurrencyRevaluation",
                defaults: new { controller = "Accounting", action = "ViewForeignCurrencyRevaluation" }
             );
            routes.MapRoute(
            name: "ViewA_AccountLink",
            url: "Accounting/Transactions/A_AccountLink",
            defaults: new { controller = "Accounting", action = "ViewA_AccountLink" }
            );
            routes.MapRoute(
            name: "ViewSystemAccount",
            url: "Accounting/Transactions/SystemAccount",
            defaults: new { controller = "Accounting", action = "ViewSystemAccount" }
            );
            routes.MapRoute(
              name: "ViewBudgetsFiscal",
              url: "Accounting/Transactions/BudgetsFiscal",
              defaults: new { controller = "Accounting", action = "ViewBudgetsFiscal" }
            );
            routes.MapRoute(
              name: "ViewAccountingAccNotesApprovalsReportTax",
              url: "Accounting/Transactions/AccountingAccNotesApprovalsReportTax",
              defaults: new { controller = "Accounting", action = "ViewAccountingAccNotesApprovalsReportTax" }
            );
            routes.MapRoute(
              name: "ViewPostingVouchersReportTax",
              url: "Accounting/Transactions/PostingVouchersReportTax",
              defaults: new { controller = "Accounting", action = "ViewPostingVouchersReportTax" }
            );
            routes.MapRoute(
             name: "ViewInvoicesApprovalReportsTax",
             url: "Accounting/Transactions/InvoicesApprovalReportsTax",
             defaults: new { controller = "Accounting", action = "ViewInvoicesApprovalReportsTax" }
           );
            routes.MapRoute(
            name: "UploadFiles",
            url: "UploadExcel/UploadFiles",
            defaults: new { controller = "UploadExcel", action = "UploadFiles" }
            );
            routes.MapRoute(
                name: "UploadContainers",
                url: "UploadExcel/UploadContainers",
                defaults: new { controller = "UploadExcel", action = "UploadContainers" }
                );
            routes.MapRoute(
              name: "ViewBudgetDetailsReport",
              url: "Accounting/Reports/BudgetDetailsReport",
              defaults: new { controller = "Accounting", action = "ViewBudgetDetailsReport" }
              );

            #endregion Accounting/Transactions

            #region Accounting/Reports
            routes.MapRoute(
                name: "ViewAccountLedger",
                url: "Accounting/Reports/AccountLedger",
                defaults: new { controller = "Accounting", action = "ViewAccountLedger" }
            );
            routes.MapRoute(
                name: "ViewSubAccountLedger",
                url: "Accounting/Reports/SubAccountLedger",
                defaults: new { controller = "Accounting", action = "ViewSubAccountLedger" }
            );
            routes.MapRoute(
                name: "ViewTrialBalance",
                url: "Accounting/Reports/TrialBalance",
                defaults: new { controller = "Accounting", action = "ViewTrialBalance" }
            );
            routes.MapRoute(
                name: "ViewSubAccountTrialBalance",
                url: "Accounting/Reports/SubAccountTrialBalance",
                defaults: new { controller = "Accounting", action = "ViewSubAccountTrialBalance" }
            );
            routes.MapRoute(
                name: "ViewBalanceSheet",
                url: "Accounting/Reports/BalanceSheet",
                defaults: new { controller = "Accounting", action = "ViewBalanceSheet" }
            );
            routes.MapRoute(
                name: "ViewIncomeStatement",
                url: "Accounting/Reports/IncomeStatement",
                defaults: new { controller = "Accounting", action = "ViewIncomeStatement" }
            );
            routes.MapRoute(
                name: "ViewAccountLedgerByCurrency",
                url: "Accounting/Reports/AccountLedgerByCurrency",
                defaults: new { controller = "Accounting", action = "ViewAccountLedgerByCurrency" }
            );
            routes.MapRoute(
                name: "ViewSubAccountBalanceByCurrency",
                url: "Accounting/Reports/SubAccountBalanceByCurrency",
                defaults: new { controller = "Accounting", action = "ViewSubAccountBalanceByCurrency" }
            );
            routes.MapRoute(
                name: "ViewRep_A_MonthlyAnalysis",
                url: "Accounting/Reports/Rep_A_MonthlyAnalysis",
                defaults: new { controller = "Accounting", action = "ViewRep_A_MonthlyAnalysis" }
            );
            routes.MapRoute(
              name: "ViewCashFlowReport",
              url: "Accounting/Reports/CashFlow",
              defaults: new { controller = "Accounting", action = "ViewCashFlowReport" }
           );
            routes.MapRoute(
            name: "ViewDynamicpost",
            url: "Accounting/Reports/Dynamicpost",
            defaults: new { controller = "Accounting", action = "ViewDynamicpost" }
         );
            routes.MapRoute(
           name: "Viewstatementofprincipal",
           url: "Accounting/Reports/statementofprincipal",
           defaults: new { controller = "Accounting", action = "Viewstatementofprincipal" }
           );
            routes.MapRoute(
           name: "ViewJobSummery",
           url: "Accounting/Reports/JobSummery",
           defaults: new { controller = "Accounting", action = "ViewJobSummery" }
           );

            //  routes.MapRoute(
            //    name: "ViewRep_A_MonthlyAnalysis",
            //    url: "Accounting/Rep_A_MonthlyAnalysis",
            //    defaults: new { controller = "Accounting", action = "ViewRep_A_MonthlyAnalysis" }
            //);

            #endregion Accounting/Reports

            #region ReceiptsAndPayments/Transactions
            routes.MapRoute(
                name: "ViewCashVoucher",
                url: "ReceiptsAndPayments/Transactions/CashVoucher",
                defaults: new { controller = "ReceiptsAndPayments", action = "ViewCashVoucher" }
            );
            routes.MapRoute(
                name: "ViewChequeVoucher",
                url: "ReceiptsAndPayments/Transactions/ChequeVoucher",
                defaults: new { controller = "ReceiptsAndPayments", action = "ViewChequeVoucher" }
            );
            routes.MapRoute(
                name: "ViewCombinedIssueVoucher",
                url: "ReceiptsAndPayments/Transactions/CombinedIssueVoucher",
                defaults: new { controller = "ReceiptsAndPayments", action = "ViewCombinedIssueVoucher" }
            );
            routes.MapRoute(
                name: "ViewOperationsPayablesAndReceivables",
                url: "ReceiptsAndPayments/Transactions/OperationsPayablesAndReceivables",
                defaults: new { controller = "ReceiptsAndPayments", action = "ViewOperationsPayablesAndReceivables" }
            );
            routes.MapRoute(
                name: "ViewDebitAndCreditClose",
                url: "ReceiptsAndPayments/Transactions/DebitAndCreditClose",
                defaults: new { controller = "ReceiptsAndPayments", action = "ViewDebitAndCreditClose" }
            );
            routes.MapRoute(
                name: "ViewDownPaymentRequest",
                url: "ReceiptsAndPayments/Transactions/DownPaymentRequest",
                defaults: new { controller = "ReceiptsAndPayments", action = "ViewDownPaymentRequest" }
            );
            #endregion ReceiptsAndPayments/Transactions

            #region ReceiptsAndPayments/ApprovingAndPosting
            routes.MapRoute(
                name: "ViewPostingVoucher",
                url: "ReceiptsAndPayments/ApprovingAndPosting/Post_Unpost_Voucher",
                defaults: new { controller = "ReceiptsAndPayments", action = "ViewPost_Unpost_Voucher" }
            );

            routes.MapRoute(
                name: "ViewPostingReceivablePayableNotes",
                url: "ReceiptsAndPayments/ApprovingAndPosting/PostingReceivablePayableNotes",
                defaults: new { controller = "ReceiptsAndPayments", action = "ViewPostingReceivablePayableNotes" }
            );
            routes.MapRoute(
                name: "ViewPostingUnderCollectNotes",
                url: "ReceiptsAndPayments/ApprovingAndPosting/PostingUnderCollectNotes",
                defaults: new { controller = "ReceiptsAndPayments", action = "ViewPostingUnderCollectNotes" }
            );
            #endregion ReceiptsAndPayments/ApprovingAndPosting

            #region ReceiptsAndPayments/Reports
            routes.MapRoute(
                name: "ViewBanksJournal",
                url: "ReceiptsAndPayments/Reports/BanksJournal",
                defaults: new { controller = "ReceiptsAndPayments", action = "ViewBanksJournal" }
            );
            routes.MapRoute(
                name: "ViewSafesJournal",
                url: "ReceiptsAndPayments/Reports/SafesJournal",
                defaults: new { controller = "ReceiptsAndPayments", action = "ViewSafesJournal" }
            );
            routes.MapRoute(
                name: "ViewvwChequesReports",
                url: "ReceiptsAndPayments/Reports/ChequesStatueReports",
                defaults: new { controller = "ReceiptsAndPayments", action = "ViewChequesReports" }
            );
            routes.MapRoute(
                name: "ViewCashPosition",
                url: "ReceiptsAndPayments/Reports/CashPosition",
                defaults: new { controller = "ReceiptsAndPayments", action = "ViewCashPosition" }
                );
            #endregion ReceiptsAndPayments/Reports
            #region ReceiptsAndPayments/Custodies
            routes.MapRoute(
                name: "ViewPaymentRequest",
                url: "ReceiptsAndPayments/Custodies/PaymentRequest",
                defaults: new { controller = "ReceiptsAndPayments", action = "ViewPaymentRequest" }
            );
            routes.MapRoute(
                name: "ViewPaymentRequestSupplier",
                url: "ReceiptsAndPayments/Custodies/PaymentRequestSupplier",
                defaults: new { controller = "ReceiptsAndPayments", action = "ViewPaymentRequestSupplier" }
            );
            routes.MapRoute(
                name: "ViewExchangeMovement",
                url: "ReceiptsAndPayments/Custodies/ExchangeMovement",
                defaults: new { controller = "ReceiptsAndPayments", action = "ViewExchangeMovement" }
            );
            routes.MapRoute(
                name: "ViewCustudyBalance",
                url: "ReceiptsAndPayments/Custodies/CustudyBalance",
                defaults: new { controller = "ReceiptsAndPayments", action = "ViewCustudyBalance" }
            );
            routes.MapRoute(
                name: "ViewSettelmentSupplierDrivers",
                url: "ReceiptsAndPayments/Custodies/SettelmentSupplierDrivers",
                defaults: new { controller = "ReceiptsAndPayments", action = "ViewSettelmentSupplierDrivers" }
            );
            routes.MapRoute(
                    name: "ViewPaymentRequestCollected",
                    url: "ReceiptsAndPayments/Custodies/PaymentRequestCollected",
                    defaults: new { controller = "ReceiptsAndPayments", action = "ViewPaymentRequestCollected" }
                );
            #endregion ReceiptsAndPayments/Custodies
            #region ReceiptsAndPayments/Integration
            routes.MapRoute(
                name: "ViewPaymentRequestIntegration",
                url: "ReceiptsAndPayments/Integration/PaymentRequestIntegration",
                defaults: new { controller = "ReceiptsAndPayments", action = "ViewPaymentRequestIntegration" }
            );
            #endregion ReceiptsAndPayments/Custodies

            #region Warehousing/MasterData
            routes.MapRoute(
                name: "ViewWarehouse",
                url: "Warehousing/MasterData/Warehouse",
                defaults: new { controller = "Warehousing", action = "ViewWarehouse" }
            );
            routes.MapRoute(
                name: "ViewArea",
                url: "Warehousing/MasterData/Area",
                defaults: new { controller = "Warehousing", action = "ViewArea" }
            );
            routes.MapRoute(
                name: "ViewRow",
                url: "Warehousing/MasterData/Row",
                defaults: new { controller = "Warehousing", action = "ViewRow" }
            );
            routes.MapRoute(
               name: "ViewMainWarehouse",
               url: "Warehousing/MasterData/MainWarehouse",
               defaults: new { controller = "Warehousing", action = "ViewMainWarehouse" }
           );
            routes.MapRoute(
        name: "ViewPalletClassification",
        url: "Warehousing/MasterData/PalletClassification",
        defaults: new { controller = "Warehousing", action = "ViewPalletClassification" }
    );
            routes.MapRoute(
     name: "ViewPalletStatus",
     url: "Warehousing/MasterData/PalletStatus",
     defaults: new { controller = "Warehousing", action = "ViewPalletStatus" }
 );
            routes.MapRoute(
    name: "ViewBatchStatus",
    url: "Warehousing/MasterData/BatchStatus",
    defaults: new { controller = "Warehousing", action = "ViewBatchStatus" }
);
            routes.MapRoute(
                           name: "ViewWarehouseNotes",
                           url: "Warehousing/MasterData/WarehouseNotes",
                           defaults: new { controller = "Warehousing", action = "ViewWarehouseNotes" }
                       );
            routes.MapRoute(
                        name: "ViewWarehousingChargeTypes",
                        url: "Warehousing/MasterData/WarehousingChargeTypes",
                        defaults: new { controller = "Warehousing", action = "ViewWarehousingChargeTypes" }
                        );
			routes.MapRoute(
                        name: "ViewWH_ItemKitting",
                        url: "Warehousing/MasterData/WH_ItemKitting",
                        defaults: new { controller = "Warehousing", action = "ViewWH_ItemKitting" }
                        );
            #endregion Warehousing/MasterData

            #region Warehousing/Transactions
            routes.MapRoute(
                name: "ViewContract",
                url: "Warehousing/Transactions/Contract",
                defaults: new { controller = "Warehousing", action = "ViewContract" }
            );
			routes.MapRoute(
                name: "ViewWH_Contract",
                url: "Warehousing/Transactions/WH_Contract",
                defaults: new { controller = "Warehousing", action = "ViewWH_Contract" }
            );
            routes.MapRoute(
                name: "ViewReceive",
                url: "Warehousing/Transactions/Receive",
                defaults: new { controller = "Warehousing", action = "ViewReceive" }
            );
			routes.MapRoute(
			   name: "ViewWH_Inbound",
			   url: "Warehousing/Transactions/WH_Inbound",
			   defaults: new { controller = "Warehousing", action = "ViewWH_Inbound" }
		   );
			routes.MapRoute(
              name: "ViewTransferProduct",
              url: "Warehousing/Transactions/TransferProducts",
              defaults: new { controller = "Warehousing", action = "ViewTransferProducts" }
          );
            routes.MapRoute(
            name: "ViewPDI",
            url: "Warehousing/Transactions/PDI",
            defaults: new { controller = "Warehousing", action = "ViewPDI" }
        );
            routes.MapRoute(
          name: "ViewAgingAdjustment",
          url: "Warehousing/Transactions/AgingAdjustment",
          defaults: new { controller = "Warehousing", action = "ViewAgingAdjustment" }
      );
            routes.MapRoute(
                name: "ViewPickup",
                url: "Warehousing/Transactions/Pickup",
                defaults: new { controller = "Warehousing", action = "ViewPickup" }
            );
			routes.MapRoute(
  name: "ViewWH_Outbound",
  url: "Warehousing/Transactions/WH_Outbound",
  defaults: new { controller = "Warehousing", action = "ViewWH_Outbound" }
);
			routes.MapRoute(
                name: "ViewReserve",
                url: "Warehousing/Transactions/Reserve",
                defaults: new { controller = "Warehousing", action = "ViewReserve" }
            );
            routes.MapRoute(
                name: "ViewProductReallocation",
                url: "Warehousing/Transactions/ProductReallocation",
                defaults: new { controller = "Warehousing", action = "ViewProductReallocation" }
            );
            routes.MapRoute(
                name: "ViewVehicleService",
                url: "Warehousing/Transactions/VehicleService",
                defaults: new { controller = "Warehousing", action = "ViewVehicleService" }
            );
            routes.MapRoute(
                name: "ViewWHInvoice",
                url: "Warehousing/Transactions/WHInvoice",
                defaults: new { controller = "Warehousing", action = "ViewWHInvoice" }
            );
			routes.MapRoute(
			   name: "ViewWH_Invoice",
			   url: "Warehousing/Transactions/WH_Invoice",
			   defaults: new { controller = "Warehousing", action = "ViewWH_Invoice" }
		   );
			routes.MapRoute(
                name: "ViewInventory",
                url: "Warehousing/Reports/Inventory",
                defaults: new { controller = "Warehousing", action = "ViewInventory" }
            );
            routes.MapRoute(
                name: "ViewVehicleReport",
                url: "Warehousing/Reports/VehicleReport",
                defaults: new { controller = "Warehousing", action = "ViewVehicleReport" }
            );
            routes.MapRoute(
                name: "ViewProductLog",
                url: "Warehousing/Reports/ProductLog",
                defaults: new { controller = "Warehousing", action = "ViewProductLog" }
            );
            routes.MapRoute(
                name: "ViewStockLedger",
                url: "Warehousing/Reports/StockLedger",
                defaults: new { controller = "Warehousing", action = "ViewStockLedger" }
            );
            routes.MapRoute(
                name: "View3PLStatistics",
                url: "Warehousing/Reports/3PLStatistics",
                defaults: new { controller = "Warehousing", action = "View3PLStatistics" }
            );
            routes.MapRoute(
            name: "ViewAreaLocationsChart",
            url: "Warehousing/Reports/AreaLocationsChart",
            defaults: new { controller = "Warehousing", action = "ViewAreaLocationsChart" }
            );
			routes.MapRoute(
			 name: "ViewWH_Services",
			 url: "Warehousing/Transactions/WH_Services",
			 defaults: new { controller = "Warehousing", action = "ViewWH_Services" }
		 );
			routes.MapRoute(
		 name: "ViewWH_TransServices",
		 url: "Warehousing/Transactions/WH_TransServices",
		 defaults: new { controller = "Warehousing", action = "ViewWH_TransServices" }
	 );
			routes.MapRoute(
name: "ViewWH_QualityActions",
url: "Warehousing/Transactions/WH_QualityActions",
defaults: new { controller = "Warehousing", action = "ViewWH_QualityActions" }
);
			routes.MapRoute(
name: "ViewWH_Putaway",
url: "Warehousing/Transactions/WH_Putaway",
defaults: new { controller = "Warehousing", action = "ViewWH_Putaway" }
);
			routes.MapRoute(
name: "ViewWH_LocationMove",
url: "Warehousing/Transactions/WH_LocationMove",
defaults: new { controller = "Warehousing", action = "ViewWH_LocationMove" }
);
			routes.MapRoute(
name: "ViewWH_Adjustment",
url: "Warehousing/Transactions/WH_Adjustment",
defaults: new { controller = "Warehousing", action = "ViewWH_Adjustment" }
);
			routes.MapRoute(
name: "ViewWH_Transfer",
url: "Warehousing/Transactions/WH_Transfer",
defaults: new { controller = "Warehousing", action = "ViewWH_Transfer" }
);
			#endregion Warehousing/Transactions

			#region Warehousing/Finalize
			routes.MapRoute(
                name: "ViewReceiveFinalize",
                url: "Warehousing/Finalize/ReceiveFinalize",
                defaults: new { controller = "Warehousing", action = "ViewReceiveFinalize" }
            );
            routes.MapRoute(
                name: "ViewReceiveUnfinalize",
                url: "Warehousing/Finalize/ReceiveUnfinalize",
                defaults: new { controller = "Warehousing", action = "ViewReceiveUnfinalize" }
            );
            routes.MapRoute(
                name: "ViewPickupFinalize",
                url: "Warehousing/Finalize/PickupFinalize",
                defaults: new { controller = "Warehousing", action = "ViewPickupFinalize" }
            );
            routes.MapRoute(
                name: "ViewPickupUnfinalize",
                url: "Warehousing/Finalize/PickupUnfinalize",
                defaults: new { controller = "Warehousing", action = "ViewPickupUnfinalize" }
            );
	
			#endregion

			#region RealEstate/MasterData
			routes.MapRoute(
                name: "ViewRS_Projects",
                url: "RealEstate/RS_Projects",
                defaults: new { controller = "RealEstate", action = "ViewRS_Projects" }
            );
            #endregion RealEstate/MasterData
            #region Station
            routes.MapRoute(
                name: "ViewPreGateIn",
                url: "Station/PreGateIn",
                defaults: new { controller = "Station", action = "ViewPreGateIn" }
            );
            routes.MapRoute(
               name: "ViewGateIn",
               url: "Station/GateIn",
               defaults: new { controller = "Station", action = "ViewGateIn" }
           );
            routes.MapRoute(
              name: "ViewGateOut",
              url: "Station/GateOut",
              defaults: new { controller = "Station", action = "ViewGateOut" }
          );
            routes.MapRoute(
             name: "ViewPacking",
             url: "Station/Packing",
             defaults: new { controller = "Station", action = "ViewPacking" }
         );
            routes.MapRoute(
              name: "ST_Employees",
              url: "Station/ST_Employees",
              defaults: new { controller = "Station", action = "ST_Employees" }
          );
            routes.MapRoute(
            name: "ViewST_EmployeesTransaction",
            url: "Station/ST_EmployeesTransaction",
            defaults: new { controller = "Station", action = "ViewST_EmployeesTransaction" }
        );
            routes.MapRoute(
            name: "ViewST_employmentReport",
            url: "Station/ST_employmentReport",
            defaults: new { controller = "Station", action = "ViewST_employmentReport" }
            );

            routes.MapRoute(
            name: "ViewST_LoadingReport",
            url: "Station/ST_LoadingReport",
            defaults: new { controller = "Station", action = "ViewST_LoadingReport" }
            );

			routes.MapRoute(
            name: "ViewST_PaySlipReport",
            url: "Station/ST_PaySlipReport",
            defaults: new { controller = "Station", action = "ViewST_PaySlipReport" }
            );
            #endregion RealEstate/MasterData


            #region CRM By Mostafa Hany
            routes.MapRoute(
                 name: "ViewCRM_Actions",
                 url: "CRM/CRM_Actions",
                 defaults: new { controller = "CRM", action = "ViewCRM_Actions" }
            );

            routes.MapRoute(
                name: "ViewCRM_Sources",
                url: "CRM/CRM_Sources",
                defaults: new { controller = "CRM", action = "ViewCRM_Sources" }
            );
            routes.MapRoute(
                name: "ViewCRMIndustryType",
                url: "CRM/CRMIndustryType",
                defaults: new { controller = "CRM", action = "ViewCRMIndustryType" }
            );
            routes.MapRoute(
                name: "ViewCRMComplaintName",
                url: "CRM/CRMComplaintName",
                defaults: new { controller = "CRM", action = "ViewCRMComplaintName" }
            );

            routes.MapRoute(
                name: "ViewCRM_Clients",
                url: "CRM/CRM_Clients",
                defaults: new { controller = "CRM", action = "ViewCRM_Clients" }
            ); 
            routes.MapRoute(
                name: "ViewCRM_SalesDeals",
                url: "CRM/CRM_SalesDeals",
                defaults: new { controller = "CRM", action = "ViewCRM_SalesDeals" }
            );
            routes.MapRoute(
                name: "ViewCRM_SalesOppurtunities",
                url: "CRM/CRM_SalesOppurtunities",
                defaults: new { controller = "CRM", action = "ViewCRM_SalesOppurtunities" }
            );
            routes.MapRoute(
                name: "ViewCRM_SalesLeadCustomers",
                url: "CRM/CRM_SalesLeadCustomers",
                defaults: new { controller = "CRM", action = "ViewCRM_SalesLeadCustomers" }
            );
            //
            routes.MapRoute(
                name: "ViewCRMCustomersFollowUp",
                url: "CRM/CRMCustomersFollowUp",
                defaults: new { controller = "CRM", action = "ViewCRMCustomersFollowUp" }
            );
            routes.MapRoute(
                name: "ViewCRMprivilege",
                url: "CRM/CRMprivilege",
                defaults: new { controller = "CRM", action = "ViewCRMprivilege" }
            );
            routes.MapRoute(
                name: "ViewCRMCycleSettings",
                url: "CRM/CRMCycleSettings",
                defaults: new { controller = "CRM", action = "ViewCRMCycleSettings" }
            );

            routes.MapRoute(
                name: "ViewCRM_PipeLineStage",
                url: "CRM/CRM_PipeLineStage",
                defaults: new { controller = "CRM", action = "ViewCRM_PipeLineStage" }
            );
            routes.MapRoute(
                name: "ViewCRM_activitiesLog",
                url: "CRM/CRM_activitiesLog",
                defaults: new { controller = "CRM", action = "ViewCRM_activitiesLog" }
            );
            routes.MapRoute(
                name: "ViewCRM_SetupInvalidSalesLeadMonths",
                url: "CRM/CRM_SetupInvalidSalesLeadMonths",
                defaults: new { controller = "CRM", action = "ViewCRM_SetupInvalidSalesLeadMonths" }
            );
            routes.MapRoute(
                name: "ViewCRM_Complaint",
                url: "CRM/CRM_Complaint",
                defaults: new { controller = "CRM", action = "ViewCRM_Complaint" }
            );
            routes.MapRoute(
             name: "ViewCRM_SalesMenTarget",
             url: "CRM/CRM_SalesMenTarget",
             defaults: new { controller = "CRM", action = "ViewCRM_SalesMenTarget" }
         );
            routes.MapRoute(
                name: "ViewCRM_SetubSalesLead",
                url: "CRM/CRM_SetubSalesLead",
                defaults: new { controller = "CRM", action = "ViewCRM_SetubSalesLead" }
            );
            routes.MapRoute(
             name: "ViewCommissionTarget",
             url: "CRM/CommissionTarget",
             defaults: new { controller = "CRM", action = "ViewCommissionTarget" }
         );
            routes.MapRoute(
             name: "ViewSalesmenCommissions",
             url: "CRM/SalesmenCommissions",
             defaults: new { controller = "CRM", action = "ViewSalesmenCommissions" }
         );
            routes.MapRoute(
             name: "CRM_ClientsSetubSalesLead_Calculate1",
             url: "CRM_Clients/SetubSalesLead_Calculate",
             defaults: new { controller = "CRM_Clients", action = "SetubSalesLead_Calculate" }
         );
        routes.MapRoute(
            name: "ViewStatisticsBusinessVolume",
            url: "Reports/BusinessVolume",
            defaults: new { controller = "Reports", action = "ViewStatisticsBusinessVolume" }
        );
        routes.MapRoute(
            name: "ViewChargesWithoutInvoicesReport",
            url: "Reports/ChargesWithoutInvoicesReport",
            defaults: new { controller = "Reports", action = "ViewChargesWithoutInvoicesReport" }
        );

            routes.MapRoute(
            name: "ViewTruckingReport",
            url: "Reports/TruckingReport",
            defaults: new { controller = "Reports", action = "ViewTruckingReport" }
        );
			routes.MapRoute(
            name: "ViewFileRoutingReport",
            url: "Reports/FileRoutingReport",
            defaults: new { controller = "Reports", action = "ViewFileRoutingReport" }
        );
			routes.MapRoute(
            name: "ViewClientsWithoutOperationsReport",
            url: "Reports/ClientsWithoutOperationsReport",
            defaults: new { controller = "Reports", action = "ViewClientsWithoutOperationsReport" }
        );
            routes.MapRoute(
            name: "ViewTruckingTrackingReport",
            url: "Reports/TruckingTrackingReport",
            defaults: new { controller = "Reports", action = "ViewTruckingTrackingReport" }
        );
            routes.MapRoute(
            name: "ViewMEDWarehouseReport",
            url: "Reports/MEDWarehouseReport",
            defaults: new { controller = "Reports", action = "ViewMEDWarehouseReport" }
        );


            routes.MapRoute(
            name: "ViewTankFollowReport",
            url: "Reports/TankFollowReport",
            defaults: new { controller = "Reports", action = "ViewTankFollowReport" }
        );

            routes.MapRoute(
            name: "ViewTR_TruckingOrderReport",
            url: "TR/Reports/TruckingOrderReport",
            defaults: new { controller = "TR", action = "ViewTR_TruckingOrderReport" }
        );
            routes.MapRoute(
            name: "ViewTR_TruckingOrderReportForSupplier",
            url: "TR/Reports/TruckingOrderReportForSupplier",
            defaults: new { controller = "TR", action = "ViewTR_TruckingOrderReportForSupplier" }
        );

            routes.MapRoute(
            name: "ViewTR_TripIncentiveReport",
            url: "TR/Reports/TripIncentiveReport",
            defaults: new { controller = "TR", action = "ViewTR_TripIncentiveReport" }
        );

            routes.MapRoute(
                name: "ReportMainClass_PrintInqueryReport",
                url: "ReportMainClass/PrintInqueryReport/{pCutlureID}",
                defaults: new { controller = "ReportMainClass", action = "PrintInqueryReport", pCutlureID = UrlParameter.Optional }
                );
            ////
            routes.MapRoute(
                name: "ReportMainClass_PrintPS_Payment",
                url: "ReportMainClass/PrintPS_Payment/{pCutlureID}",
                defaults: new { controller = "ReportMainClass", action = "PrintPS_Payment", pCutlureID = UrlParameter.Optional }
                );

            routes.MapRoute(
                name: "ReportMainClass_PrintWithIDs",
                url: "ReportMainClass/PrintWithIDs/{pCutlureID}",
                defaults: new { controller = "ReportMainClass", action = "PrintWithIDs", pCutlureID = UrlParameter.Optional }
                );
            routes.MapRoute(
             name: "ViewClientFollowUpDashboard",
             url: "CRM/ClientFollowUpDashboard",
             defaults: new { controller = "CRM", action = "ViewClientFollowUpDashboard" }
         );
            routes.MapRoute(
         name: "ViewvwCRM_ClientsFollowReport",
         url: "CRM/vwCRM_ClientsFollowReport",
         defaults: new { controller = "CRM", action = "ViewvwCRM_ClientsFollowReport" }
     );
            routes.MapRoute(
         name: "ViewCRMSalesReport",
         url: "CRM/CRMSalesReport",
         defaults: new { controller = "CRM", action = "ViewCRMSalesReport" }
     );
            routes.MapRoute(
         name: "ViewCRMStatistics",
         url: "CRM/CRMStatistics",
         defaults: new { controller = "CRM", action = "ViewCRMStatistics" }
     );
            #endregion CRM By Mostafa Hany

            #region SC By Mostafa Hany
            routes.MapRoute(
                 name: "ViewStoresAccounts",
                 url: "SC/StoresAccounts",
                 defaults: new { controller = "SC", action = "ViewStoresAccounts" }
            );
            routes.MapRoute(
                name: "ViewI_ItemsGroups",
                url: "SC/I_ItemsGroups",
                defaults: new { controller = "SC", action = "ViewI_ItemsGroups" }
           );
            routes.MapRoute(
    name: "ViewItemsInquiry",
    url: "SC/ItemsInquiry",
    defaults: new { controller = "SC", action = "ViewItemsInquiry" }
);
            routes.MapRoute(
                      name: "ViewGoodReceiptNotes",
                      url: "SC/GoodReceiptNotes",
                      defaults: new { controller = "SC", action = "ViewGoodReceiptNotes" }
                 );

            routes.MapRoute(
                      name: "ViewMaterialIssueVouchers",
                      url: "SC/MaterialIssueVouchers",
                      defaults: new { controller = "SC", action = "ViewMaterialIssueVouchers" }
                 );

            routes.MapRoute(
                     name: "ViewItemCard",
                     url: "SC/SC_ItemCard",
                     defaults: new { controller = "SC", action = "ViewSC_ItemCard" }
                );

               routes.MapRoute(
                     name: "ViewSC_RawReport",
                     url: "SC/SC_RawReport",
                     defaults: new { controller = "SC", action = "ViewSC_RawReport" }
                );

            routes.MapRoute(
         name: "ViewMaterialIssueVouchersFollowUp",
         url: "SC/MaterialIssueVouchersFollowUp",
         defaults: new { controller = "SC", action = "ViewMaterialIssueVouchersFollowUp" }
    );
            routes.MapRoute(
                    name: "ViewSC_ItemsCardQty",
                    url: "SC/SC_ItemsCardQty",
                    defaults: new { controller = "SC", action = "ViewSC_ItemsCardQty" }
               );
            routes.MapRoute(
                    name: "ViewStockBalance",
                    url: "SC/SC_StockBalance",
                    defaults: new { controller = "SC", action = "ViewSC_StockBalance" }
               );
            routes.MapRoute(
                    name: "ViewSC_ApproveTransaction",
                    url: "SC/SC_ApproveTransaction",
                    defaults: new { controller = "SC", action = "ViewSC_ApproveTransaction" }
               );

            routes.MapRoute(
                   name: "ViewSC_UnApproveTransaction",
                   url: "SC/SC_UnApproveTransaction",
                   defaults: new { controller = "SC", action = "ViewSC_UnApproveTransaction" }
              );
            routes.MapRoute(
                   name: "ViewSC_TankatApprove",
                   url: "SC/SC_TankatApprove",
                   defaults: new { controller = "SC", action = "ViewSC_TankatApprove" }
              );
            //******
            routes.MapRoute(
                    name: "ViewSC_GoodsReceiptNotesFollowUp",
                    url: "SC/SC_GoodsReceiptNotesFollowUp",
                    defaults: new { controller = "SC", action = "ViewSC_GoodsReceiptNotesFollowUp" }
               );

            routes.MapRoute(
                  name: "ViewSC_GoodsIssueVouchersFollowUp",
                  url: "SC/SC_GoodsIssueVouchersFollowUp",
                  defaults: new { controller = "SC", action = "ViewSC_GoodsIssueVouchersFollowUp" }
             );
            routes.MapRoute(
                  name: "ViewSC_StockOpeningBalanceFollowUp",
                  url: "SC/SC_StockOpeningBalanceFollowUp",
                  defaults: new { controller = "SC", action = "ViewSC_StockOpeningBalanceFollowUp" }
             );
            routes.MapRoute(
                  name: "ViewSC_CLientReturnsVoucherFollowUp",
                  url: "SC/SC_CLientReturnsVoucherFollowUp",
                  defaults: new { controller = "SC", action = "ViewSC_CLientReturnsVoucherFollowUp" }
             );
            routes.MapRoute(
           name: "ViewSC_DepartmentReturnsVoucher",
           url: "SC/SC_DepartmentReturnsVoucher",
           defaults: new { controller = "SC", action = "ViewSC_DepartmentReturnsVoucher" }
      );

            routes.MapRoute(
           name: "ViewSC_WorkOrderReturnsVoucher",
           url: "SC/SC_WorkOrderReturnsVoucher",
           defaults: new { controller = "SC", action = "ViewSC_WorkOrderReturnsVoucher" }
      );
            routes.MapRoute(
                  name: "ViewSC_SupplierReturnsVoucherFollowUp",
                  url: "SC/SC_SupplierReturnsVoucherFollowUp",
                  defaults: new { controller = "SC", action = "ViewSC_SupplierReturnsVoucherFollowUp" }
             );

            routes.MapRoute(
                 name: "ViewSC_ExminationOrdersFollowUp",
                 url: "SC/SC_ExminationOrdersFollowUp",
                 defaults: new { controller = "SC", action = "ViewSC_ExminationOrdersFollowUp" }
            );

            routes.MapRoute(
                 name: "ViewSC_MaterialIssueRequestFollowUp",
                 url: "SC/SC_MaterialIssueRequestFollowUp",
                 defaults: new { controller = "SC", action = "ViewSC_MaterialIssueRequestFollowUp" }
            );


            routes.MapRoute(
                name: "ViewSC_StoresTransferVoucherFollowUp",
                url: "SC/SC_StoresTransferVoucherFollowUp",
                defaults: new { controller = "SC", action = "ViewSC_StoresTransferVoucherFollowUp" }
           );
            //***************


            //SC_GoodsReceiptNotesFollowUp
            routes.MapRoute(
              name: "View_PS_SupplierAccountStatementReport",
              url: "Purchasing/PS_SupplierAccountStatementReport",
              defaults: new { controller = "PS", action = "View_PS_SupplierAccountStatementReport" }
              );
            routes.MapRoute(
                    name: "ViewSC_OpeningBalance",
                    url: "SC/SC_OpeningBalance",
                    defaults: new { controller = "SC", action = "ViewSC_OpeningBalance" }
               );
            routes.MapRoute(
        name: "ViewSC_Scrapping",
        url: "SC/SC_Scrapping",
        defaults: new { controller = "SC", action = "ViewSC_Scrapping" }
   );

            routes.MapRoute(
                  name: "ViewSC_ClientReturnsVoucher",
                  url: "SC/SC_ClientReturnsVoucher",
                  defaults: new { controller = "SC", action = "ViewSC_ClientReturnsVoucher" }
             );
            routes.MapRoute(
                 name: "ViewSC_SupplierReturnsVoucher",
                 url: "SC/SC_SupplierReturnsVoucher",
                 defaults: new { controller = "SC", action = "ViewSC_SupplierReturnsVoucher" }
            );
            routes.MapRoute(
                    name: "ViewSC_ExminationOrders",
                    url: "SC/SC_ExminationOrders",
                    defaults: new { controller = "SC", action = "ViewSC_ExminationOrders" }
               );
            routes.MapRoute(
                  name: "ViewSC_StoresTransferVoucher",
                  url: "SC/SC_StoresTransferVoucher",
                  defaults: new { controller = "SC", action = "ViewSC_StoresTransferVoucher" }
             );

            routes.MapRoute(
                  name: "ViewSC_MaterialIssueRequest",
                  url: "SC/SC_MaterialIssueRequest",
                  defaults: new { controller = "SC", action = "ViewSC_MaterialIssueRequest" }
             );
            routes.MapRoute(
      name: "ViewSC_Settlement",
      url: "SC/SC_Settlement",
      defaults: new { controller = "SC", action = "ViewSC_Settlement" }
 );
            routes.MapRoute(
name: "ViewSC_Inventory",
url: "SC/SC_Inventory",
defaults: new { controller = "SC", action = "ViewSC_Inventory" }
);

            routes.MapRoute(
                 name: "ViewPR_Stages",
                 url: "PR/PR_Stages",
                 defaults: new { controller = "PR", action = "ViewPR_Stages" }
            );

            routes.MapRoute(
                name: "ViewPR_ProductStages",
                url: "PR/PR_ProductStages",
                defaults: new { controller = "PR", action = "ViewPR_ProductStages" }
           );



            routes.MapRoute(
                name: "ViewBatches",
                url: "PR/Batches",
                defaults: new { controller = "PR", action = "ViewBatches" }
           );

            routes.MapRoute(
                name: "ViewPR_ApproveTransaction",
                url: "PR/PR_ApproveTransaction",
                defaults: new { controller = "PR", action = "ViewPR_ApproveTransaction" }
           );
            routes.MapRoute(
                    name: "ViewPR_UnApproveTransaction",
                    url: "PR/PR_UnApproveTransaction",
                    defaults: new { controller = "PR", action = "ViewPR_UnApproveTransaction" }
               );


            routes.MapRoute(
                  name: "ViewI_PriceList",
                  url: "SL_MasterData/I_PriceList",
                  defaults: new { controller = "SL", action = "ViewI_PriceList" }
             );

            routes.MapRoute(
                name: "ViewSL_SalesMan",
                url: "SL_MasterData/SL_SalesMan",
                defaults: new { controller = "SL", action = "ViewSL_SalesMan" }
             );
            routes.MapRoute(
                name: "ViewSL_CustomerCategories",
                url: "SL_MasterData/SL_CustomerCategories",
                defaults: new { controller = "SL", action = "ViewSL_CustomerCategories" }
            );

            routes.MapRoute(
               name: "ViewSL_LinkPriceListWithPaymentMethod",
               url: "SL_MasterData/SL_LinkPriceListWithPaymentMethod",
               defaults: new { controller = "SL", action = "ViewSL_LinkPriceListWithPaymentMethod" }
             );
            routes.MapRoute(

             name: "ViewSL_Regions",
             url: "SL_MasterData/SL_Regions",
             defaults: new { controller = "SL", action = "ViewSL_Regions" }
            );


            //SC/SC_OpenCloseMMaterialIssueRequest

            routes.MapRoute(
       name: "ViewSC_OpenCloseMaterialIssueRequest",
       url: "SC/SC_OpenCloseMaterialIssueRequest",
       defaults: new { controller = "SC", action = "ViewSC_OpenCloseMaterialIssueRequest" }
  );
            routes.MapRoute(
                 name: "ViewServices",
                 url: "MasterData/Services",
                 defaults: new { controller = "MasterData", action = "ViewServices" }
            );

            routes.MapRoute(
                 name: "ViewExpenses",
                 url: "MasterData/Expenses",
                 defaults: new { controller = "MasterData", action = "ViewExpenses" }
            );

            routes.MapRoute(
                 name: "ViewSL_Invoices",
                 url: "SL/SL_Invoices",
                 defaults: new { controller = "SL", action = "ViewSL_Invoices" }
            );
            routes.MapRoute(
                 name: "ViewPS_Invoices",
                 url: "PS/PS_Invoices",
                 defaults: new { controller = "PS", action = "ViewPS_Invoices" }
            );
            routes.MapRoute(
     name: "ViewPS_PurchasingRequest",
     url: "PS/PS_PurchasingRequest",
     defaults: new { controller = "PS", action = "ViewPS_PurchasingRequest" }
);
            routes.MapRoute(
name: "ViewPS_Quotations",
url: "PS/PS_Quotations",
defaults: new { controller = "PS", action = "ViewPS_Quotations" }
);

            routes.MapRoute(
name: "ViewPS_PurchasingOrders",
url: "PS/PS_PurchasingOrders",
defaults: new { controller = "PS", action = "ViewPS_PurchasingOrders" }
);

            routes.MapRoute(
                      name: "ViewPS_ClientDbtCrdtNotes",
                      url: "PS/PS_ClientDbtCrdtNotes",
                      defaults: new { controller = "PS", action = "ViewPS_ClientDbtCrdtNotes" }
                      );
            routes.MapRoute(
                    name: "ViewPS_PurchasingOrdersNew",
                    url: "PS/PS_PurchasingOrdersNew",
                    defaults: new { controller = "PS", action = "ViewPS_PurchasingOrdersNew" }
                    );


            routes.MapRoute(
name: "ViewPS_SupplyOrders",
url: "PS/PS_SupplyOrders",
defaults: new { controller = "PS", action = "ViewPS_SupplyOrders" }
);


            routes.MapRoute(
name: "ViewPS_ApproveQuotation",
url: "PS/PS_ApproveQuotation",
defaults: new { controller = "PS", action = "ViewPS_ApproveQuotation" }
);
            routes.MapRoute(
name: "ViewPS_ApprovePurchasingRequest",
url: "PS/PS_ApprovePurchasingRequest",
defaults: new { controller = "PS", action = "ViewPS_ApprovePurchasingRequest" }
);

            routes.MapRoute(
name: "ViewPS_ApprovePurchasingOrders",
url: "PS/PS_ApprovePurchasingOrders",
defaults: new { controller = "PS", action = "ViewPS_ApprovePurchasingOrders" }
);

            routes.MapRoute(
name: "ViewPS_ApproveSupplyOrders",
url: "PS/PS_ApproveSupplyOrders",
defaults: new { controller = "PS", action = "ViewPS_ApproveSupplyOrders" }
);
            routes.MapRoute(
name: "ViewPS_UnApprovePurchasingRequest",
url: "PS/PS_UnApprovePurchasingRequest",
defaults: new { controller = "PS", action = "ViewPS_UnApprovePurchasingRequest" }
);
            routes.MapRoute(
name: "ViewPS_UnApprovePurchasingOrders",
url: "PS/PS_UnApprovePurchasingOrders",
defaults: new { controller = "PS", action = "ViewPS_UnApprovePurchasingOrders" }
);
            routes.MapRoute(
name: "ViewPS_UnApproveQuotation",
url: "PS/PS_UnApproveQuotation",
defaults: new { controller = "PS", action = "ViewPS_UnApproveQuotation" }
);


            routes.MapRoute(
                  name: "ViewSL_ApproveInvoice",
                  url: "SL/SL_ApproveInvoice",
                  defaults: new { controller = "SL", action = "ViewSL_ApproveInvoice" }
             );

            routes.MapRoute(
                 name: "ViewSL_UnApproveInvoice",
                 url: "SL/SL_UnApproveInvoice",
                 defaults: new { controller = "SL", action = "ViewSL_UnApproveInvoice" }
            );
            routes.MapRoute(
                name: "ViewSL_ServicesReports",
                url: "SL/SL_ServicesReports",
                defaults: new { controller = "SL", action = "ViewSL_ServicesReports" }
           );

            routes.MapRoute(
               name: "ViewSL_ItemsReports",
               url: "SL/SL_ItemsReports",
               defaults: new { controller = "SL", action = "ViewSL_ItemsReports" }
          );

            routes.MapRoute(
             name: "ViewSL_SalesReports",
             url: "SL/SL_SalesReports",
             defaults: new { controller = "SL", action = "ViewSL_SalesReports" }
        );

            routes.MapRoute(
            name: "ViewClientPaid",
            url: "SL/ClientPaid",
            defaults: new { controller = "SL", action = "ViewClientPaid" }
            );
            routes.MapRoute(
               name: "ViewPS_ApproveInvoice",
               url: "PS/PS_ApproveInvoice",
               defaults: new { controller = "PS", action = "ViewPS_ApproveInvoice" }
          );

            routes.MapRoute(
                 name: "ViewPS_UnApproveInvoice",
                 url: "PS/PS_UnApproveInvoice",
                 defaults: new { controller = "PS", action = "ViewPS_UnApproveInvoice" }
            );

            routes.MapRoute(
            name: "ViewApprovePS_ClientDbtCrdtNotes",
            url: "PS/ApprovePS_ClientDbtCrdtNotes",
            defaults: new { controller = "PS", action = "ViewApprovePS_ClientDbtCrdtNotes" }
       );
            routes.MapRoute(
             name: "ViewUnApprovePS_ClientDbtCrdtNotes",
             url: "PS/UnApprovePS_ClientDbtCrdtNotes",
             defaults: new { controller = "PS", action = "ViewUnApprovePS_ClientDbtCrdtNotes" }
        );


            routes.MapRoute(
                   name: "ViewPS_ServicesReports",
                   url: "PS/PS_ServicesReports",
                   defaults: new { controller = "PS", action = "ViewPS_ServicesReports" }
              );

            routes.MapRoute(
               name: "ViewPS_ItemsReports",
               url: "PS/PS_ItemsReports",
               defaults: new { controller = "PS", action = "ViewPS_ItemsReports" }
          );

            routes.MapRoute(
              name: "View_PS_PurchasingOrdersNewFollowUP",
              url: "PS/PS_PurchasingOrdersNewFollowUP",
              defaults: new { controller = "PS", action = "View_PS_PurchasingOrdersNewFollowUP" }
         );

            routes.MapRoute
            (
             name: "ViewPS_PurchasingReports",
             url: "PS/PS_PurchasingReports",
             defaults: new { controller = "PS", action = "ViewPS_PurchasingReports" }
            );
            #endregion SC By Mostafa Hany

            //10/10/2020
            #region WebSite By Mostafa Hany

            routes.MapRoute(
           name: "ViewWebSite_YourOperations",
           url: "WebSite/WebSite_YourOperations",
           defaults: new { controller = "WebSite", action = "ViewWebSite_YourOperations" });
            routes.MapRoute(
name: "ViewWebSite_Form13States",
url: "WebSite/WebSite_Form13States",
defaults: new { controller = "WebSite", action = "ViewWebSite_Form13States" });
            routes.MapRoute(
name: "ViewWebSite_YourInvoices",
url: "WebSite/WebSite_YourInvoices",
defaults: new { controller = "WebSite", action = "ViewWebSite_YourInvoices" });

            routes.MapRoute(
name: "ViewWebSite_YourSubAccount",
url: "WebSite/WebSite_YourSubAccount",
defaults: new { controller = "WebSite", action = "ViewWebSite_YourSubAccount" });

            routes.MapRoute(
               name: "ViewWebSite_3PLInventory",
               url: "WebSite/WebSite_3PLInventory",
               defaults: new { controller = "WebSite", action = "ViewWebSite_3PLInventory" }
               );
			routes.MapRoute(
			   name: "ViewWebSite_3PLReceive",
			   url: "WebSite/WebSite_3PLReceive",
			   defaults: new { controller = "WebSite", action = "ViewWebSite_3PLReceive" }
			   );
			routes.MapRoute(
               name: "ViewWebSite_3PLPickup",
               url: "WebSite/WebSite_3PLPickup",
               defaults: new { controller = "WebSite", action = "ViewWebSite_3PLPickup" }
               );
            routes.MapRoute(
               name: "ViewWebSite_3PLReserve",
               url: "WebSite/WebSite_3PLReserve",
               defaults: new { controller = "WebSite", action = "ViewWebSite_3PLReserve" }
               );
            #endregion WebSite By Mostafa Hany

            #region FA By Mostafa Hany


            routes.MapRoute(
                name: "ViewFA_AssetsGroups",
                url: "FA/MasterData/FA_AssetsGroups",
                defaults: new { controller = "FA", action = "ViewFA_AssetsGroups" }
           );



            routes.MapRoute(
                name: "ViewFA_Assets",
                url: "FA/MasterData/FA_Assets",
                defaults: new { controller = "FA", action = "ViewFA_Assets" }
           );


            routes.MapRoute(
               name: "ViewFA_DestructionsStopsPeriod",
               url: "FA/MasterData/FA_DestructionsStopsPeriod",
               defaults: new { controller = "FA", action = "ViewFA_DestructionsStopsPeriod" }
          );



            routes.MapRoute(
               name: "ViewFA_Addition",
               url: "FA/FA_Transactions/FA_Addition",
               defaults: new { controller = "FA", action = "ViewFA_Addition" }
          );
            routes.MapRoute(
              name: "ViewFA_AssetsInventory",
              url: "FA/FA_Transactions/FA_AssetsInventory",
              defaults: new { controller = "FA", action = "ViewFA_AssetsInventory" }
         );

            routes.MapRoute(
             name: "ViewFA_AdditionAccount",
             url: "FA/MasterData/FA_AdditionAccount",
             defaults: new { controller = "FA", action = "ViewFA_AdditionAccount" }
           );


            routes.MapRoute(
               name: "ViewFA_Exclusion",
               url: "FA/FA_Transactions/FA_Exclusion",
               defaults: new { controller = "FA", action = "ViewFA_Exclusion" }
          );
            routes.MapRoute(
               name: "ViewFA_Depreciation",
               url: "FA/FA_Transactions/FA_Depreciation",
               defaults: new { controller = "FA", action = "ViewFA_Depreciation" }
          );

            routes.MapRoute(
              name: "ViewFA_DepreciationsByAssets",
              url: "FA/FA_Transactions/FA_DepreciationsByAssets",
              defaults: new { controller = "FA", action = "ViewFA_DepreciationsByAssets" }
         );
            routes.MapRoute(
    name: "ViewFA_StopDepreciations",
    url: "FA/FA_Transactions/FA_StopDepreciations",
    defaults: new { controller = "FA", action = "ViewFA_StopDepreciations" }
);

            routes.MapRoute(
               name: "ViewFA_AssetsApproving",
               url: "FA/FA_Approving/FA_AssetsApproving",
               defaults: new { controller = "FA", action = "ViewFA_AssetsApproving" }
          );
            routes.MapRoute(
               name: "ViewFA_AssetsUnApproving",
               url: "FA/FA_Approving/FA_AssetsUnApproving",
               defaults: new { controller = "FA", action = "ViewFA_AssetsUnApproving" }
          );

            routes.MapRoute(
            name: "ViewFA_AdditionPosting",
            url: "FA/FA_Approving/FA_AdditionPosting",
            defaults: new { controller = "FA", action = "ViewFA_AdditionPosting" }
       );

            routes.MapRoute(
               name: "ViewFA_ExclusionPosting",
               url: "FA/FA_Approving/FA_ExclusionPosting",
               defaults: new { controller = "FA", action = "ViewFA_ExclusionPosting" }
          );

            routes.MapRoute(
               name: "ViewFA_DepreciationPosting",
               url: "FA/FA_Approving/FA_DepreciationPosting",
               defaults: new { controller = "FA", action = "ViewFA_DepreciationPosting" }
          );

            routes.MapRoute(
               name: "ViewFA_AdditionUnPosting",
               url: "FA/FA_Approving/FA_AdditionUnPosting",
               defaults: new { controller = "FA", action = "ViewFA_AdditionUnPosting" }
          );

            routes.MapRoute(
               name: "ViewFA_ExclusionUnPosting",
               url: "FA/FA_Approving/FA_ExclusionUnPosting",
               defaults: new { controller = "FA", action = "ViewFA_ExclusionUnPosting" }
          );

            routes.MapRoute(
               name: "ViewFA_DepreciationUnPosting",
               url: "FA/FA_Approving/FA_DepreciationUnPosting",
               defaults: new { controller = "FA", action = "ViewFA_DepreciationUnPosting" }
          );


            routes.MapRoute(
   name: "ViewFA_AssetsReports",
   url: "FA/FA_AssetsReports",
   defaults: new { controller = "FA", action = "ViewFA_AssetsReports" }
);



            routes.MapRoute(
           name: "ViewFA_TransactionsReports",
           url: "FA/FA_TransactionsReports",
           defaults: new { controller = "FA", action = "ViewFA_TransactionsReports" });


            #endregion FA By Mostafa Hany

            #region LoadingandDischarging
            routes.MapRoute(
    name: "ViewLoadingandDischargingData",
    url: "LoadingandDischarging/LoadingandDischargingData",
    defaults: new { controller = "LoadingandDischarging", action = "ViewLoadingandDischargingData" }
);
            routes.MapRoute(
    name: "ViewLD_Workers",
    url: "LoadingandDischarging/LD_Workers",
    defaults: new { controller = "LoadingandDischarging", action = "ViewLD_Workers" }
);
            routes.MapRoute(
 name: "ViewLD_Storage",
 url: "LoadingandDischarging/LD_Storage",
 defaults: new { controller = "LoadingandDischarging", action = "ViewLD_Storage" }
);
            #endregion LoadingandDischarging

            #region Zakat And Income

            routes.MapRoute(
             name: "ViewSendSalesInvoices",
             url: "ZakatAndIncome/ViewSendSalesInvoices",
             defaults: new { controller = "ZakatAndIncome", action = "ViewSendSalesInvoices" }
             );
            routes.MapRoute(
             name: "ViewSubmittedInvoices",
             url: "ZakatAndIncome/ViewSubmittedInvoices",
             defaults: new { controller = "ZakatAndIncome", action = "ViewSubmittedInvoices" }
             );

            routes.MapRoute(
             name: "ViewInvoicesLOG",
             url: "ZakatAndIncome/ViewInvoicesLOG",
             defaults: new { controller = "ZakatAndIncome", action = "ViewInvoicesLOG" }
             );
            routes.MapRoute(
             name: "ViewSendDebitAndCredit",
             url: "ZakatAndIncome/ViewSendDebitAndCredit",
             defaults: new { controller = "ZakatAndIncome", action = "ViewSendDebitAndCredit" }
             );
            routes.MapRoute(
             name: "ViewSubmittedDebitAndCredit",
             url: "ZakatAndIncome/ViewSubmittedDebitAndCredit",
             defaults: new { controller = "ZakatAndIncome", action = "ViewSubmittedDebitAndCredit" }
             );
            routes.MapRoute(
              name: "ViewZakatAndIncomeReport",
              url: "ZakatAndIncome/ViewZakatAndIncomeReport",
              defaults: new { controller = "ZakatAndIncome", action = "ViewZakatAndIncomeReport" }
              );
            #endregion
            //Accounting/Transactions
            routes.MapRoute(
               name: "ViewA_ARAllocation",
               url: "Accounting/A_ARAllocation",
               defaults: new { controller = "Accounting", action = "ViewA_ARAllocation" }
           );
            routes.MapRoute(
           name: "ViewA_ARAllocationWithVoucher",
           url: "Accounting/A_ARAllocationWithVoucher",
           defaults: new { controller = "Accounting", action = "ViewA_ARAllocationWithVoucher" }
       );
            routes.MapRoute(
            name: "ViewA_ARAllocationWithVoucher_Mesco",
            url: "Accounting/A_ARAllocationWithVoucher_Mesco",
            defaults: new { controller = "Accounting", action = "ViewA_ARAllocationWithVoucher_Mesco" }
            );
            routes.MapRoute(
          name: "ViewA_APAllocationWithVoucher",
          url: "Accounting/A_APAllocationWithVoucher",
          defaults: new { controller = "Accounting", action = "ViewA_APAllocationWithVoucher" }
      );

            routes.MapRoute(
                   name: "ViewUnapprovingAllocations",
                   url: "Accounting/UnapprovingAllocations",
                   defaults: new { controller = "Accounting", action = "ViewUnapprovingAllocations" }
              );
            routes.MapRoute(
                 name: "ViewUnapprovingPayableAllocations",
                 url: "Accounting/UnapprovingPayableAllocations",
                 defaults: new { controller = "Accounting", action = "ViewUnapprovingPayableAllocations" }
            );
            //SC/SC_OpenCloseMMaterialIssueRequest
            routes.MapRoute(
          name: "ViewSL_ApproveSL_DbtCrdtNotes",
          url: "SL/SL_ApproveSL_DbtCrdtNotes",
          defaults: new { controller = "SL", action = "ViewSL_ApproveSL_DbtCrdtNotes" }
          );
            routes.MapRoute(
            name: "ViewSL_UnApproveSL_DbtCrdtNotes",
            url: "SL/SL_UnApproveSL_DbtCrdtNotes",
            defaults: new { controller = "SL", action = "ViewSL_UnApproveSL_DbtCrdtNotes" }
            );
            routes.MapRoute(
         name: "ViewSL_ClientAccountStatementReport",
         url: "SL/SL_ClientAccountStatementReport",
         defaults: new { controller = "SL", action = "ViewSL_ClientAccountStatementReport" }
         );
            routes.MapRoute(
        name: "ViewSL_Payments",
        url: "SL/SL_Payments",
        defaults: new { controller = "SL", action = "ViewSL_Payments" }
        );
            routes.MapRoute(
            name: "ViewClientDbtCrdtNotes",
            url: "SL/ClientDbtCrdtNotes",
            defaults: new { controller = "SL", action = "ViewClientDbtCrdtNotes" }
            );

            //  routes.MapRoute(
            //     name: "ViewSC_OpenCloseMaterialIssueRequest",
            //     url: "SC/SC_OpenCloseMaterialIssueRequest",
            //     defaults: new { controller = "SC", action = "ViewSC_OpenCloseMaterialIssueRequest" }
            //);




            routes.MapRoute(
         name: "ViewSC_OutgoingItemsReport",
         url: "SC/SC_OutgoingItemsReport",
         defaults: new { controller = "SC", action = "ViewSC_OutgoingItemsReport" }
            );


            #region Container Freight Station CFS

            #region Tariffs
            routes.MapRoute(
                name: "ViewWH_FCL_Tariffs",
                url: "ContainerFreightStation/WH_FCL_Tariffs",
                defaults: new { controller = "ContainerFreightStation", action = "ViewWH_FCL_Tariffs" }
            );

            routes.MapRoute(
                name: "ViewWH_CSL_Tariffs",
                url: "ContainerFreightStation/WH_CSL_Tariffs",
                defaults: new { controller = "ContainerFreightStation", action = "ViewWH_CSL_Tariffs" }
            );

            #endregion

            #region Transactions
            routes.MapRoute(
                name: "ViewWH_CFS_GateIn",
                url: "ContainerFreightStation/Transactions/WH_CFS_GateIn",
                defaults: new { controller = "ContainerFreightStation", action = "ViewWH_CFS_GateIn" }
            );
            routes.MapRoute(
                name: "ViewWH_CFS_GateInInventory",
                url: "ContainerFreightStation/Transactions/WH_CFS_GateInInventory",
                defaults: new { controller = "ContainerFreightStation", action = "ViewWH_CFS_GateInInventory" }
            );
            routes.MapRoute(
               name: "ViewWH_CFS_Invoices",
               url: "ContainerFreightStation/Transactions/WH_CFS_Invoices",
               defaults: new { controller = "ContainerFreightStation", action = "ViewWH_CFS_Invoices" }
           );
            routes.MapRoute(
               name: "ViewWH_CFS_ReleaseOrders",
               url: "ContainerFreightStation/Transactions/WH_CFS_ReleaseOrders",
               defaults: new { controller = "ContainerFreightStation", action = "ViewWH_CFS_ReleaseOrders" }
           );
            routes.MapRoute(
               name: "ViewWH_CFS_ReleaseVouchers",
               url: "ContainerFreightStation/Transactions/WH_CFS_ReleaseVouchers",
               defaults: new { controller = "ContainerFreightStation", action = "ViewWH_CFS_ReleaseVouchers" }
           );
            routes.MapRoute(
               name: "ViewWH_CFS_Inspection",
               url: "ContainerFreightStation/Transactions/WH_CFS_Inspection",
               defaults: new { controller = "ContainerFreightStation", action = "ViewWH_CFS_Inspection" }
           );
            #endregion

            #region Reports
            routes.MapRoute(
                name: "ViewWH_ManifestReport",
                url: "ContainerFreightStation/Reports/WH_ManifestReport",
                defaults: new { controller = "ContainerFreightStation", action = "ViewWH_ManifestReport" }
            );
            routes.MapRoute(
                name: "ViewWH_WarehouseStatistics",
                url: "ContainerFreightStation/Reports/WH_WarehouseStatistics",
                defaults: new { controller = "ContainerFreightStation", action = "ViewWH_WarehouseStatistics" }
            );

            #endregion

            #endregion


            #region Container Yard CY

            #region Tariffs
            routes.MapRoute(
                name: "ViewWH_MTY_Tariffs",
                url: "ContainerYard/WH_MTY_Tariffs",
                defaults: new { controller = "ContainerYard", action = "ViewWH_MTY_Tariffs" }
            );
            #endregion

            #region Transactions
            routes.MapRoute(
                name: "ViewWH_CntrStocks",
                url: "ContainerYard/WH_CntrStocks",
                defaults: new { controller = "ContainerYard", action = "ViewWH_CntrStocks" }
            );
            routes.MapRoute(
                name: "ViewWH_MTY_GateIn",
                url: "ContainerYard/WH_MTY_GateIn",
                defaults: new { controller = "ContainerYard", action = "ViewWH_MTY_GateIn" }
            );
            routes.MapRoute(
                name: "ViewWH_MTY_Inventory",
                url: "ContainerYard/WH_MTY_Inventory",
                defaults: new { controller = "ContainerYard", action = "ViewWH_MTY_Inventory" }
            );
            routes.MapRoute(
                name: "ViewWH_MTY_GateOut",
                url: "ContainerYard/WH_MTY_GateOut",
                defaults: new { controller = "ContainerYard", action = "ViewWH_MTY_GateOut" }
            );
            #endregion

            #region Reports
            routes.MapRoute(
                name: "ViewWH_MTY_Reports",
                url: "ContainerYard/WH_MTY_Reports",
                defaults: new { controller = "ContainerYard", action = "ViewWH_MTY_Reports" }
            );
            #endregion

            #endregion

            #region InterServices
            //InterServices/InterServicesRequests?pCutlureID=en
            routes.MapRoute(
                name: "ViewInterServicesRequests",
                url: "InterServices/InterServicesRequests",
                defaults: new { controller = "InterServices", action = "ViewInterServicesRequests" }
            );
            #endregion

            routes.MapRoute(
               name: "Home",
               url: "Home",
               defaults: new { controller = "Home", action = "Index" }
           );

            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Login", action = "Index" }
            );
            #region ShipsGo
            routes.MapRoute(
                name: "ShipsGo",
                url: "ShipsGo",
                defaults: new { controller = "shipsGo", action = "ShipsGo" }
            );
            #endregion
            #region BillTracking
            routes.MapRoute(
                name: "BillTracking",
                url: "BillTracking",
                defaults: new { controller = "BillTracking", action = "BillTracking" }
            );
            #endregion

            #region MESCOReports

            routes.MapRoute(
                name: "UspInvoicess",
                url: "reports/UspInvoices",
                defaults: new { controller = "ExportClosedOperations", action = "UspInvoices" }
            );

            routes.MapRoute(
                name: "DepositVouchers",
                url: "reports/DepositVouchers",
                defaults: new { controller = "ExportClosedOperations", action = "DepositVouchers" }
            );


            routes.MapRoute(
                 name: "UnclosedOperationsReport",
                 url: "reports/unclosed",
                 defaults: new { controller = "ExportClosedOperations", action = "UnClosedOperationsReportMES" }
             );


            routes.MapRoute(
                name: "UnclosedOperationsReportLCL",
                url: "reports/unclosedLCL",
                defaults: new { controller = "ExportClosedOperations", action = "LCLUnClosedOperationsReportMES" }
            );


            routes.MapRoute(
                name: "UnclosedOperationsReportFleet",
                url: "reports/unclosedFleet",
                defaults: new { controller = "ExportClosedOperations", action = "UnClosedOperationsReportMESFleet" }
            );

            routes.MapRoute(
                    name: "Mesc_HousesReport",
                    url: "reports/Mesc_HousesReport",
                    defaults: new { controller = "ExportClosedOperations", action = "Mesc_HousesReport" }
                );

            routes.MapRoute(
                 name: "ClosedOperationsReportMESFleet",
                 url: "reports/closedFleet",
                 defaults: new { controller = "ExportClosedOperations", action = "ClosedOperationsReportMESFleet" }
             );


            routes.MapRoute(
                name: "closedOperationsReport",
                url: "reports/closed",
                defaults: new { controller = "ExportClosedOperations", action = "ClosedOperationsReportMES" }
            );

            routes.MapRoute(
        name: "closedOperationsReportLCL",
        url: "reports/closedLCL",
        defaults: new { controller = "ExportClosedOperations", action = "LCLClosedOperationsReportMES" }
    );




            routes.MapRoute(
            name: "UniqueInvoices",
            url: "reports/UniqueInvoices",
            defaults: new { controller = "ExportClosedOperations", action = "UniqueInvoices" }
            );


            routes.MapRoute(
            name: "FleetInvoices",
            url: "reports/FleetInvoices",
            defaults: new { controller = "ExportClosedOperations", action = "FleetInvoices" }
            );

            routes.MapRoute(
           name: "ChequeVoucherReport",
           url: "reports/ChequeVoucherReport",
           defaults: new { controller = "ExportClosedOperations", action = "ChequeVoucherReport" }
           );

            routes.MapRoute(
             name: "CloseOperationsReportMESFleet",
             url: "reports/CloseOperationsReportMESFleet",
             defaults: new { controller = "ExportClosedOperations", action = "CloseOperationsReportMESFleet" }
         );



            routes.MapRoute(
                         name: "CustodyReportFleet",
                         url: "reports/CustodyReportFleet",
                         defaults: new { controller = "ExportClosedOperations", action = "CustodyReportFleet" }
                     );
            routes.MapRoute(
                 name: "IsDirectReportFleet",
                 url: "reports/IsDirectReportFleet",
                 defaults: new { controller = "ExportClosedOperations", action = "IsDirectReportFleet" }
             );
            routes.MapRoute(
                 name: "VendorReportFleet",
                 url: "reports/VendorReportFleet",
                 defaults: new { controller = "ExportClosedOperations", action = "VendorReportFleet" }
             );
            routes.MapRoute(
                 name: "MES_CashReceiveReportFleet",
                 url: "reports/MES_CashReceiveReportFleet",
                 defaults: new { controller = "ExportClosedOperations", action = "MES_CashReceiveReportFleet" }
             );
            routes.MapRoute(
                 name: "MES_PaymentOrderReportFleet",
                 url: "reports/MES_PaymentOrderReportFleet",
                 defaults: new { controller = "ExportClosedOperations", action = "MES_PaymentOrderReportFleet" }
             ); routes.MapRoute(
             name: "CloseOperationsReportMES",
             url: "reports/CloseOperationsReportMES",
             defaults: new { controller = "ExportClosedOperations", action = "CloseOperationsReportMES" }
         );



            routes.MapRoute(
                         name: "CustodyReport",
                         url: "reports/CustodyReport",
                         defaults: new { controller = "ExportClosedOperations", action = "CustodyReport" }
                     );
            routes.MapRoute(
                 name: "IsDirectReport",
                 url: "reports/IsDirectReport",
                 defaults: new { controller = "ExportClosedOperations", action = "IsDirectReport" }
             );
            routes.MapRoute(
                 name: "VendorReport",
                 url: "reports/VendorReport",
                 defaults: new { controller = "ExportClosedOperations", action = "VendorReport" }
             );
            routes.MapRoute(
                 name: "MES_CashReceiveReport",
                 url: "reports/MES_CashReceiveReport",
                 defaults: new { controller = "ExportClosedOperations", action = "MES_CashReceiveReport" }
             );
            routes.MapRoute(
                 name: "MES_PaymentOrderReport",
                 url: "reports/MES_PaymentOrderReport",
                 defaults: new { controller = "ExportClosedOperations", action = "MES_PaymentOrderReport" }
             );
            routes.MapRoute(
                 name: "FinanceRefByPartner",
                 url: "reports/FinanceRefByPartner",
                 defaults: new { controller = "ExportClosedOperations", action = "FinanceRefByPartner" }
             );
            routes.MapRoute(
                name: "HBLReport",
                url: "reports/HBLReport",
                defaults: new { controller = "ExportClosedOperations", action = "HBLReport" }
            );
            routes.MapRoute(
             name: "PayablesReceibablesAfterCloseEntries",
             url: "reports/PayablesReceibablesAfterCloseEntries",
             defaults: new { controller = "ExportClosedOperations", action = "PayablesReceibablesAfterCloseEntries" }
         );

            #endregion


            #region MESCODynamicPost

            routes.MapRoute(
                 name: "RepA_JVNewReport",
                 url: "reports/RepA_JVNewReport",
                 defaults: new { controller = "JVNewReport", action = "RepA_JVNew" }
             );
            #endregion
            routes.MapRoute(
              name: "SubAccountsLedgerNEW",
              url: "SubAccountsLedgerNEW/ExportSubAccountsLedgerToExcel",
              defaults: new { controller = "SubAccountsLedgerNEW", action = "ExportSubAccountsLedgerToExcel" }
          );
        }
    }
}
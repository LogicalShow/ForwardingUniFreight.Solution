using System.Web.Http;

namespace Forwarding.MvcApp
{
	public static class WebApiConfig
	{
		public static void Register(HttpConfiguration config)
		{
            Forwarding.MvcApp.Models.Operations.Operations.BillWorkflow.BillWorkflowRegistration.RegisterRoutes(config);

            //var cors = new EnableCorsAttribute("*", "*", "*");
            //config.EnableCors(cors);

            //// Other Web API configuration not shown...
            //config.MapHttpAttributeRoutes();

            //config.Routes.MapHttpRoute(
            //    name: "DefaultApi",
            //    routeTemplate: "api/{controller}/{id}",
            //    defaults: new { id = RouteParameter.Optional }
            //);

            //config.Routes.MapHttpRoute(
            //            name: "RegionsPrint",
            //            routeTemplate: "api/Regions/PrintReport",
            //            defaults: new { controller = "Regions", action = "PrintReport" }
            //        );
            #region RS_RealEstate
            config.Routes.MapHttpRoute(
			   name: "RS_deleteAllSelectedDetailesIDs",
			   routeTemplate: "api/RS_Projects/deleteAllSelectedDetailesIDs",
			   defaults: new { controller = "RS_Projects", action = "deleteAllSelectedDetailesIDs" }
			   );

			config.Routes.MapHttpRoute(
			  name: "RS_RealEstateLoadDetails",
			  routeTemplate: "api/RS_Projects/LoadDetails",
			  defaults: new { controller = "RS_Projects", action = "LoadDetails" }
			  );

			config.Routes.MapHttpRoute(
			name: "RS_RealEstateLoadFloors",
			routeTemplate: "api/RS_Projects/LoadFloors",
			defaults: new { controller = "RS_Projects", action = "LoadFloors" }
			);

			config.Routes.MapHttpRoute(
		   name: "RS_RealEstateInsertUnits",
		   routeTemplate: "api/RS_Projects/InsertUnits",
		   defaults: new { controller = "RS_Projects", action = "InsertUnits" }
		   );

			config.Routes.MapHttpRoute(
		   name: "RS_RealEstateInsertFloors",
		   routeTemplate: "api/RS_Projects/InsertFloors",
		   defaults: new { controller = "RS_Projects", action = "InsertFloors" }
		   );

			config.Routes.MapHttpRoute(
		   name: "RS_RealEstateDELETEfLOORS",
		   routeTemplate: "api/RS_Projects/deleteAllSelectedFloorsIDs",
		   defaults: new { controller = "RS_Projects", action = "deleteAllSelectedFloorsIDs" }
		   );
			#endregion
			#region Dashboard
			config.Routes.MapHttpRoute(
					name: "FlotLine",
					routeTemplate: "api/Dashboard/LoadAll_FlotLine/{pWhereClauseFlotLine}",
					defaults: new { controller = "Dashboard", action = "LoadAll_FlotLine", pWhereClauseFlotLine = RouteParameter.Optional }
				);
            #endregion
            #region Purchasing
            //config.Routes.MapHttpRoute(
            //name: "PS_SupplierAccountStatementReportPS_SupplierAccountStatementReport",
            //routeTemplate: "api/PS_SupplierAccountStatementReport/PS_SupplierAccountStatementReport",
            //defaults: new { controller = "PS_SupplierAccountStatementReport", action = "PS_SupplierAccountStatementReport" }
            //);


          

            config.Routes.MapHttpRoute(
          name: "PS_InvoicesTempdeleteAllSelectedDetailesIDs",
          routeTemplate: "api/PS_InvoicesTemp/deleteAllSelectedDetailesIDs",
          defaults: new { controller = "PS_InvoicesTemp", action = "deleteAllSelectedDetailesIDs" }
          );

            config.Routes.MapHttpRoute(
            name: "PS_InvoicesTempLoadDetails",
            routeTemplate: "api/PS_InvoicesTemp/LoadDetails",
            defaults: new { controller = "PS_InvoicesTemp", action = "LoadDetails" }
            );

            config.Routes.MapHttpRoute(
            name: "PS_InvoicesTempdeleteFromInvoiceTaxes",
            routeTemplate: "api/PS_InvoicesTemp/deleteFromInvoiceTaxes",
            defaults: new { controller = "PS_InvoicesTemp", action = "deleteFromInvoiceTaxes" }
            );


            //   config.Routes.MapHttpRoute(
            //name: "PSApprovingLoadWithWhereClause",
            //routeTemplate: "api/PSApproving/LoadWithWhereClause",
            //defaults: new { controller = "PSApproving", action = "LoadWithWhereClause" }
            //);

            #endregion


            #region Regions
            config.Routes.MapHttpRoute(
				name: "RegionsCheckRow",
				routeTemplate: "api/Regions/CheckRow",
				defaults: new { controller = "Regions", action = "CheckRow", pRegionID = RouteParameter.Optional }
				);

			config.Routes.MapHttpRoute(
					name: "RegionsUnlockRecord",
					routeTemplate: "api/Regions/UnlockRecord/{pRegionID}",
					defaults: new { controller = "Regions", action = "UnlockRecord", pRegionID = RouteParameter.Optional }
				);

			config.Routes.MapHttpRoute(
					name: "RegionsInsertFromXML",
					routeTemplate: "api/Regions/InsertFromXML",
					defaults: new { controller = "Regions", action = "InsertFromXML" }
				);

			#endregion
			#region Rates
			config.Routes.MapHttpRoute(
				 name: "RatesInsert_Update",
				 routeTemplate: "api/Rates/Insert_Update",
				 defaults: new { controller = "Rates", action = "Insert_Update" }
			 );
			config.Routes.MapHttpRoute(
				 name: "RateRegionsInsert_Update",
				 routeTemplate: "api/Rates/RateRegionsInsert_Update",
				 defaults: new { controller = "Rates", action = "RateRegionsInsert_Update" }
			 );
			config.Routes.MapHttpRoute(
				 name: "RateRateRegions_LoadingWithPaging",
				 routeTemplate: "api/Rates/RateRegions_LoadingWithPaging",
				 defaults: new { controller = "Rates", action = "RateRegions_LoadingWithPaging" }
			 );
			config.Routes.MapHttpRoute(
				 name: "RateLoadWithPaging",
				 routeTemplate: "api/Rates/LoadWithPaging",
				 defaults: new { controller = "Rates", action = "LoadWithPaging" }
			 );
			//Delete DeleteRateRegions
			config.Routes.MapHttpRoute(
				 name: "RateDelete",
				 routeTemplate: "api/Rates/Delete",
				 defaults: new { controller = "Rates", action = "Delete" }
			 );
			config.Routes.MapHttpRoute(
				 name: "RateDeleteRateRegions",
				 routeTemplate: "api/Rates/DeleteRateRegions",
				 defaults: new { controller = "Rates", action = "DeleteRateRegions" }
			 );
			config.Routes.MapHttpRoute(
				 name: "RateRegions_LoadingWithPagingByRateID",
				 routeTemplate: "api/Rates/RateRegions_LoadingWithPagingByRateID",
				 defaults: new { controller = "Rates", action = "RateRegions_LoadingWithPagingByRateID" }
			 );

			config.Routes.MapHttpRoute(
				 name: "RatesLoadRatesToCustomer",
				 routeTemplate: "api/Rates/LoadRatesToCustomer",
				 defaults: new { controller = "Rates", action = "LoadRatesToCustomer" }
			 );
			config.Routes.MapHttpRoute(
			name: "RatesDeleteLM_Customer_Rates",
			routeTemplate: "api/Rates/DeleteLM_Customer_Rates",
			defaults: new { controller = "Rates", action = "DeleteLM_Customer_Rates" }
			);
			config.Routes.MapHttpRoute(
				 name: "RatesLoadCustomerRates",
				 routeTemplate: "api/Rates/LoadCustomerRates",
				 defaults: new { controller = "Rates", action = "LoadCustomerRates" }
			 );
			#endregion

			#region Reports
			config.Routes.MapHttpRoute(
				 name: "Report_DocsOut",
				 routeTemplate: "api/Reports/Report_DocsOut",
				 defaults: new { controller = "Reports", action = "Report_DocsOut" }
				  );
            config.Routes.MapHttpRoute(
				name: "InsertPrintDate",
				routeTemplate: "api/Reports/InsertPrintDate",
				defaults: new { controller = "Reports", action = "InsertPrintDate" }
				  );
            config.Routes.MapHttpRoute(
				 name: "Report_DocsOut_Multiple",
				 routeTemplate: "api/Reports/Report_DocsOut_Multiple",
				 defaults: new { controller = "Reports", action = "Report_DocsOut_Multiple" }
				  );
			config.Routes.MapHttpRoute(
				 name: "GetLogoPath",
				 routeTemplate: "api/Reports/GetLogoPath",
				 defaults: new { controller = "Reports", action = "GetLogoPath" }
				  );
			config.Routes.MapHttpRoute(
				 name: "Report_Invoice",
				 routeTemplate: "api/Reports/Report_Invoice",
				 defaults: new { controller = "Reports", action = "Report_Invoice" }
				  );
			config.Routes.MapHttpRoute(
		name: "Report_InvoiceTax",
		routeTemplate: "api/Reports/Report_InvoiceTax",
		defaults: new { controller = "Reports", action = "Report_InvoiceTax" }
		 );
			config.Routes.MapHttpRoute(
				 name: "Report_Invoice_Multiple",
				 routeTemplate: "api/Reports/Report_Invoice_Multiple",
				 defaults: new { controller = "Reports", action = "Report_Invoice_Multiple" }
				  );

			config.Routes.MapHttpRoute(
		  name: "Report_Report_AccNote",
		  routeTemplate: "api/Reports/Report_AccNote",
		  defaults: new { controller = "Reports", action = "Report_AccNote" }
		   );
			config.Routes.MapHttpRoute(
		  name: "ReportReport_AccNoteTax",
		  routeTemplate: "api/Reports/Report_AccNoteTax",
		  defaults: new { controller = "Reports", action = "Report_AccNoteTax" }
		   );

			config.Routes.MapHttpRoute(
		  name: "TruckingReport_SaveTruckingData",
		  routeTemplate: "api/TruckingReport/SaveTruckingData",
		  defaults: new { controller = "TruckingReport", action = "SaveTruckingData" }
		   );

			#endregion

			#region Ports
			config.Routes.MapHttpRoute(
			name: "PortsCheckRow",
			routeTemplate: "api/Ports/CheckRow",
			defaults: new { controller = "Ports", action = "CheckRow", pPortID = RouteParameter.Optional }
			);
            config.Routes.MapHttpRoute(
            name: "LoadAll",
            routeTemplate: "api/Ports/LoadAll",
            defaults: new { controller = "Ports", action = "LoadAll" }
            );

            config.Routes.MapHttpRoute(
					name: "PortsUnlockRecord",
					routeTemplate: "api/Ports/UnlockRecord/{pPortID}",
					defaults: new { controller = "Ports", action = "UnlockRecord", pPortID = RouteParameter.Optional }
				);
			config.Routes.MapHttpRoute(
			name: "PortsLoadWithPaging",
			routeTemplate: "api/Ports/LoadWithPaging",
			defaults: new { controller = "Ports", action = "LoadWithPaging" }
			);
			config.Routes.MapHttpRoute(
			name: "PortsLoadWithPaging_Factories",
			routeTemplate: "api/Ports/LoadWithPaging_Factories",
			defaults: new { controller = "Ports", action = "LoadWithPaging_Factories" }
			);
            config.Routes.MapHttpRoute(
            name: "GetCountry",
            routeTemplate: "api/Ports/GetCountry",
            defaults: new { controller = "Ports", action = "GetCountry" }
            );
			    config.Routes.MapHttpRoute(
            name: "LoadAllForCombo",
            routeTemplate: "api/Ports/LoadAllForCombo",
            defaults: new { controller = "Ports", action = "LoadAllForCombo" }
            );
            config.Routes.MapHttpRoute(
          name: "LoadAllPortsForSlPort",
          routeTemplate: "api/Ports/LoadAllPortsForSlPort",
          defaults: new { controller = "Ports", action = "LoadAllPortsForSlPort" }
          );
            config.Routes.MapHttpRoute(
      name: "GetCountries",
      routeTemplate: "api/Ports/GetCountries",
      defaults: new { controller = "Ports", action = "GetCountries" }
      );
            #endregion
            #region CreditCardTypes
            config.Routes.MapHttpRoute(
			name: "CreditCardTypesCheckRow",
			routeTemplate: "api/CreditCardTypes/CheckRow",
			defaults: new { controller = "CreditCardTypes", action = "CheckRow", pCreditCardTypeID = RouteParameter.Optional }
			);

			config.Routes.MapHttpRoute(
					name: "CreditCardTypesUnlockRecord",
					routeTemplate: "api/CreditCardTypes/UnlockRecord/{pCreditCardTypeID}",
					defaults: new { controller = "CreditCardTypes", action = "UnlockRecord", pCreditCardTypeID = RouteParameter.Optional }
				);
			#endregion
			#region PaymentTerms
			config.Routes.MapHttpRoute(
			name: "PaymentTermsCheckRow",
			routeTemplate: "api/PaymentTerms/CheckRow",
			defaults: new { controller = "PaymentTerms", action = "CheckRow", pPaymentTermID = RouteParameter.Optional }
			);

			config.Routes.MapHttpRoute(
					name: "PaymentTermsUnlockRecord",
					routeTemplate: "api/PaymentTerms/UnlockRecord/{pPaymentTermID}",
					defaults: new { controller = "PaymentTerms", action = "UnlockRecord", pPaymentTermID = RouteParameter.Optional }
				);
			#endregion
			#region Incoterms
			config.Routes.MapHttpRoute(
			name: "IncotermsCheckRow",
			routeTemplate: "api/Incoterms/CheckRow",
			defaults: new { controller = "Incoterms", action = "CheckRow", pIncotermID = RouteParameter.Optional }
			);

			config.Routes.MapHttpRoute(
					name: "IncotermsUnlockRecord",
					routeTemplate: "api/Incoterms/UnlockRecord/{pIncotermID}",
					defaults: new { controller = "Incoterms", action = "UnlockRecord", pIncotermID = RouteParameter.Optional }
				);
			#endregion
			#region Currencies
			config.Routes.MapHttpRoute(
			name: "CurrenciesCheckRow",
			routeTemplate: "api/Currencies/CheckRow",
			defaults: new { controller = "Currencies", action = "CheckRow", pCurrencyID = RouteParameter.Optional }
			);

			config.Routes.MapHttpRoute(
					name: "CurrenciesUnlockRecord",
					routeTemplate: "api/Currencies/UnlockRecord/{pCurrencyID}",
					defaults: new { controller = "Currencies", action = "UnlockRecord", pCurrencyID = RouteParameter.Optional }
				);
			#endregion
			#region PurchaseItem
			config.Routes.MapHttpRoute(
				name: "InsertListPurchaseItem",
				routeTemplate: "api/PurchaseItem/InsertList",
				defaults: new { controller = "PurchaseItem", action = "InsertList" }
				);
            config.Routes.MapHttpRoute(
            name: "DocsInUploadFile",
            routeTemplate: "api/DocsIn/UploadFile",
            defaults: new { controller = "DocsIn", action = "UploadFile" }
            );
            config.Routes.MapHttpRoute(
            name: "DocsInUploadFilePayables",
            routeTemplate: "api/DocsIn/UploadFile_Payables",
            defaults: new { controller = "DocsIn", action = "UploadFile_Payables" }
            );
            #region DocAi (AI document extraction, phase 1)
            config.Routes.MapHttpRoute(
            name: "DocAiWebhook",
            routeTemplate: "api/DocAi/Webhook",
            defaults: new { controller = "DocAiWebhook", action = "Receive" }
            );
            config.Routes.MapHttpRoute(
            name: "DocAiLatest",
            routeTemplate: "api/DocAi/Latest",
            defaults: new { controller = "DocAi", action = "Latest" }
            );
            config.Routes.MapHttpRoute(
            name: "DocAiRead",
            routeTemplate: "api/DocAi/Read",
            defaults: new { controller = "DocAi", action = "Read" }
            );
            config.Routes.MapHttpRoute(
            name: "DocAiStatus",
            routeTemplate: "api/DocAi/Status",
            defaults: new { controller = "DocAi", action = "Status" }
            );
            config.Routes.MapHttpRoute("DocAiUsage", "api/DocAi/Usage", new { controller = "DocAi", action = "Usage" });
            config.Routes.MapHttpRoute("DocAiUsageState", "api/DocAi/UsageState", new { controller = "DocAi", action = "UsageState" });
            #endregion DocAi
            config.Routes.MapHttpRoute(
				name: "UploadFile",
				routeTemplate: "api/PurchaseItem/UploadFile",
				defaults: new { controller = "PurchaseItem", action = "UploadFile" }
				);
			config.Routes.MapHttpRoute(
				name: "UploadExcel",
				routeTemplate: "api/PurchaseItem/UploadExcel",
				defaults: new { controller = "PurchaseItem", action = "UploadExcel" }
				);
			config.Routes.MapHttpRoute(
				name: "IsClientItemsRepeated",
				routeTemplate: "api/PurchaseItem/IsClientItemsRepeated",
				defaults: new { controller = "PurchaseItem", action = "IsClientItemsRepeated" }
				);
			config.Routes.MapHttpRoute(
			name: "PurchaseItem_LoadAll",
			routeTemplate: "api/PurchaseItem/LoadAll",
			defaults: new { controller = "PurchaseItem", action = "LoadAll" }
			);
			config.Routes.MapHttpRoute(
		name: "PurchaseItem_LoadStockUnits",
		routeTemplate: "api/PurchaseItem/LoadStockUnits",
		defaults: new { controller = "PurchaseItem", action = "LoadStockUnits" }
		);

			#endregion PurchaseItem
			#region Commodity
			config.Routes.MapHttpRoute(
				name: "UploadExcelCommodity",
				routeTemplate: "api/Commodities/UploadExcel",
				defaults: new { controller = "Commodities", action = "UploadExcel" }
				);
			#endregion
			#region TaxeTypes
			config.Routes.MapHttpRoute(
			name: "TaxeTypesCheckRow",
			routeTemplate: "api/TaxeTypes/CheckRow",
			defaults: new { controller = "TaxeTypes", action = "CheckRow", pTaxeTypeID = RouteParameter.Optional }
			);

			config.Routes.MapHttpRoute(
					name: "TaxeTypesUnlockRecord",
					routeTemplate: "api/TaxeTypes/UnlockRecord/{pTaxeTypeID}",
					defaults: new { controller = "TaxeTypes", action = "UnlockRecord", pTaxeTypeID = RouteParameter.Optional }
				);

			//config.Routes.MapHttpRoute(
			//        name: "LoadLogTaxesPercentages",
			//        routeTemplate: "api/LogTaxesPercentages/LoadWithPaging/{pPageNumber}/{pPageSize}/{pSearchID}",
			//        defaults: new { controller = "LogTaxesPercentages", action = "LoadWithPaging", pPageSize = RouteParameter.Optional, pSearchID = RouteParameter.Optional }
			//    );

			#endregion
			#region ChargeTypes
			config.Routes.MapHttpRoute(
			name: "ChargeTypesCheckRow",
			routeTemplate: "api/ChargeTypes/CheckRow",
			defaults: new { controller = "ChargeTypes", action = "CheckRow", pChargeTypeID = RouteParameter.Optional }
			);

			config.Routes.MapHttpRoute(
					name: "ChargeTypesUnlockRecord",
					routeTemplate: "api/ChargeTypes/UnlockRecord/{pChargeTypeID}",
					defaults: new { controller = "ChargeTypes", action = "UnlockRecord", pChargeTypeID = RouteParameter.Optional }
				);
			config.Routes.MapHttpRoute(
					name: "LoadChargeTypeAccounts",
					routeTemplate: "api/ChargeTypes/LoadAccounts",
					defaults: new { controller = "ChargeTypes", action = "LoadAccounts" }
				);
			config.Routes.MapHttpRoute(
					name: "UpdateChargeTypes",
					routeTemplate: "api/ChargeTypes/Update",
					defaults: new { controller = "ChargeTypes", action = "Update" }
				);
			config.Routes.MapHttpRoute(
					name: "InsertChargeTypesTarrif",
					routeTemplate: "api/ChargeTypes/InsertChargeTypesTarrif",
					defaults: new { controller = "ChargeTypes", action = "InsertChargeTypesTarrif" }
				);
			config.Routes.MapHttpRoute(
			 name: "InsertChargeTypes",
			  routeTemplate: "api/ChargeTypes/Insert",
				defaults: new { controller = "ChargeTypes", action = "Insert" }
			);

			config.Routes.MapHttpRoute(
				 name: "DeleteChargeTypes",
				  routeTemplate: "api/ChargeTypes/Delete",
					defaults: new { controller = "ChargeTypes", action = "Delete" }
				);

			config.Routes.MapHttpRoute(
			 name: "DeleteChargeTypesTarrif",
			  routeTemplate: "api/ChargeTypes/DeleteChargeTypesTarrif",
				defaults: new { controller = "ChargeTypes", action = "DeleteChargeTypesTarrif" }
			);

			config.Routes.MapHttpRoute(
				name: "LoadChargeTypesTarrif",
				 routeTemplate: "api/ChargeTypes/LoadChargeTypesTarrif",
				   defaults: new { controller = "ChargeTypes", action = "LoadChargeTypesTarrif" }
			   );
			config.Routes.MapHttpRoute(
			name: "InsertListFromExcel_ChargeTypes",
			 routeTemplate: "api/ChargeTypes/InsertListFromExcel_ChargeTypes",
			   defaults: new { controller = "ChargeTypes", action = "InsertListFromExcel_ChargeTypes" }
		   );
            config.Routes.MapHttpRoute(
        name: "InsertListFromExcel_Houses",
         routeTemplate: "api/Operations/InsertListFromExcel_Houses",
           defaults: new { controller = "Operations", action = "InsertListFromExcel_Houses" }
       );
			config.Routes.MapHttpRoute(
        name: "Operations_UploadOperationByExcel",
         routeTemplate: "api/Operations/UploadOperationByExcel",
           defaults: new { controller = "Operations", action = "UploadOperationByExcel" }
       );
	    config.Routes.MapHttpRoute(
		  name: "checkHouseNumber",
		  routeTemplate: "api/Operations/checkHouseNumber",
          defaults: new { controller = "Operations", action = "checkHouseNumber" }
		  );
            #endregion
            #region WarehousingChargeTypes
            config.Routes.MapHttpRoute(
			name: "WarehousingChargeTypesCheckRow",
			routeTemplate: "api/WarehousingChargeTypes/CheckRow",
			defaults: new { controller = "WarehousingChargeTypes", action = "CheckRow", pWarehousingChargeTypesID = RouteParameter.Optional }
			);

			config.Routes.MapHttpRoute(
					name: "WarehousingChargeTypesUnlockRecord",
					routeTemplate: "api/WarehousingChargeTypes/UnlockRecord/{pWarehousingChargeTypesID}",
					defaults: new { controller = "WarehousingChargeTypes", action = "UnlockRecord", pChargeTypeID = RouteParameter.Optional }
				);
			#endregion
			#region ContainerTypes
			config.Routes.MapHttpRoute(
			name: "ContainerTypesCheckRow",
			routeTemplate: "api/ContainerTypes/CheckRow",
			defaults: new { controller = "ContainerTypes", action = "CheckRow", pContainerTypeID = RouteParameter.Optional }
			);

			config.Routes.MapHttpRoute(
					name: "ContainerTypesUnlockRecord",
					routeTemplate: "api/ContainerTypes/UnlockRecord/{pContainerTypeID}",
					defaults: new { controller = "ContainerTypes", action = "UnlockRecord", pContainerTypeID = RouteParameter.Optional }
				);
			#endregion
			#region PackageTypes
			config.Routes.MapHttpRoute(
			name: "PackageTypesCheckRow",
			routeTemplate: "api/PackageTypes/CheckRow",
			defaults: new { controller = "PackageTypes", action = "CheckRow", pPackageTypeID = RouteParameter.Optional }
			);

			config.Routes.MapHttpRoute(
					name: "PackageTypesUnlockRecord",
					routeTemplate: "api/PackageTypes/UnlockRecord/{pPackageTypeID}",
					defaults: new { controller = "PackageTypes", action = "UnlockRecord", pPackageTypeID = RouteParameter.Optional }
				);
			#endregion
			#region Commodities
			config.Routes.MapHttpRoute(
			name: "CommoditiesCheckRow",
			routeTemplate: "api/Commodities/CheckRow",
			defaults: new { controller = "Commodities", action = "CheckRow", pCommodityID = RouteParameter.Optional }
			);

			config.Routes.MapHttpRoute(
					name: "CommoditiesUnlockRecord",
					routeTemplate: "api/Commodities/UnlockRecord/{pCommodityID}",
					defaults: new { controller = "Commodities", action = "UnlockRecord", pCommodityID = RouteParameter.Optional }
				);
			#endregion
			#region MoveTypes
			config.Routes.MapHttpRoute(
			name: "MoveTypesCheckRow",
			routeTemplate: "api/MoveTypes/CheckRow",
			defaults: new { controller = "MoveTypes", action = "CheckRow", pMoveTypeID = RouteParameter.Optional }
			);

			config.Routes.MapHttpRoute(
					name: "MoveTypesUnlockRecord",
					routeTemplate: "api/MoveTypes/UnlockRecord/{pMoveTypeID}",
					defaults: new { controller = "MoveTypes", action = "UnlockRecord", pMoveTypeID = RouteParameter.Optional }
				);
			#endregion
			#region Vessels
			config.Routes.MapHttpRoute(
			name: "VesselsCheckRow",
			routeTemplate: "api/Vessels/CheckRow",
			defaults: new { controller = "Vessels", action = "CheckRow", pVesselID = RouteParameter.Optional }
			);
            config.Routes.MapHttpRoute(
            name: "VesselsLoadAll",
            routeTemplate: "api/Vessels/LoadAll",
            defaults: new { controller = "Vessels", action = "LoadAll", pVesselID = RouteParameter.Optional }
            );
            config.Routes.MapHttpRoute(
        name: "VesselsIntializeManifest",
        routeTemplate: "api/Vessels/IntializeManifest",
        defaults: new { controller = "Vessels", action = "IntializeManifest"}
        );
            config.Routes.MapHttpRoute(
					name: "VesselsUnlockRecord",
					routeTemplate: "api/Vessels/UnlockRecord/{pVesselID}",
					defaults: new { controller = "Vessels", action = "UnlockRecord", pVesselID = RouteParameter.Optional }
				);
			#endregion
			#region TypeOfStock
			config.Routes.MapHttpRoute(
				name: "TypeOfStock_Insert",
				routeTemplate: "api/TypeOfStock/TypeOfStock_Insert",
				defaults: new { controller = "TypeOfStock", action = "TypeOfStock_Insert" }
				);

			config.Routes.MapHttpRoute(
				name: "TypeOfStock_Update",
				routeTemplate: "api/TypeOfStock/TypeOfStock_Update",
				defaults: new { controller = "TypeOfStock", action = "TypeOfStock_Update" }
				);
			#endregion TypeOfStock
			#region Template
			config.Routes.MapHttpRoute(
				name: "InsertTemplate",
				routeTemplate: "api/Template/Insert",
				defaults: new { controller = "Template", action = "Insert" }
				);

			config.Routes.MapHttpRoute(
				name: "UpdateTemplate",
				routeTemplate: "api/Template/Update",
				defaults: new { controller = "Template", action = "Update" }
				);
			#endregion Template
			#region BankTemplate
			config.Routes.MapHttpRoute(
				name: "InsertBankTemplate",
				routeTemplate: "api/BankTemplate/Insert",
				defaults: new { controller = "BankTemplate", action = "Insert" }
				);

			config.Routes.MapHttpRoute(
				name: "UpdateBankTemplate",
				routeTemplate: "api/BankTemplate/Update",
				defaults: new { controller = "BankTemplate", action = "Update" }
				);
			#endregion BankTemplate
			#region Customers // PartnerTypeID = 1
			config.Routes.MapHttpRoute(
			name: "CustomersCheckRow",
			routeTemplate: "api/Customers/CheckRow",
			defaults: new { controller = "Customers", action = "CheckRow", pCustomerID = RouteParameter.Optional }
			);
			config.Routes.MapHttpRoute(
			name: "LoadAllCustomersWithIdAndName",
			routeTemplate: "api/Customers/LoadAllCustomersWithIdAndName",
			defaults: new { controller = "Customers", action = "LoadAllCustomersWithIdAndName" }
			);
			config.Routes.MapHttpRoute(
			name: "CustomersLoadAll",
			routeTemplate: "api/Customers/LoadAll",
			defaults: new { controller = "Customers", action = "LoadAll" }
			);
			config.Routes.MapHttpRoute(
				name: "Customers_InsertListFromExcel_Customers",
				routeTemplate: "api/Customers/InsertListFromExcel",
				defaults: new { controller = "Customers", action = "InsertListFromExcel_Customers" }
			);
            config.Routes.MapHttpRoute(
        name: "Customers_Insert",
        routeTemplate: "api/Customers/Insert",
        defaults: new { controller = "Customers", action = "Insert" }
    );
            config.Routes.MapHttpRoute(
				name: "Customers_LoadCustomersModalComboBoxes",
				routeTemplate: "api/Customers/LoadCustomersModalComboBoxes",
				defaults: new { controller = "Customers", action = "LoadCustomersModalComboBoxes" }
			);

			/*config.Routes.MapHttpRoute(
            name: "GetTheLastAddCustomer",
            routeTemplate: "api/Customers/GetTheLastAddCustomer",
            defaults: new { controller = "Customers", action = "GetTheLastAddCustomer" }
            );*/

			config.Routes.MapHttpRoute(
			name: "CustomersLoadAllForTopManagement",
			routeTemplate: "api/Customers/LoadAllForTopManagement",
			defaults: new { controller = "Customers", action = "LoadAllForTopManagement" }
			);

			config.Routes.MapHttpRoute(
			name: "CustomersLoadAll_Companies",
			routeTemplate: "api/Customers/LoadAll_Companies",
			defaults: new { controller = "Customers", action = "LoadAll_Companies" }
			);



			config.Routes.MapHttpRoute(
					name: "CustomersUnlockRecord",
					routeTemplate: "api/Customers/UnlockRecord/{pCustomerID}",
					defaults: new { controller = "Customers", action = "UnlockRecord", pCustomerID = RouteParameter.Optional }
				);

			config.Routes.MapHttpRoute(
		 name: "CustomerSetAutomailPeriod",
		 routeTemplate: "api/Customers/SetAutomailPeriod",
		  defaults: new { controller = "Customers", action = "SetAutomailPeriod" }
		 );
			config.Routes.MapHttpRoute(
name: "CustomerLoadAutomailCustomers",
routeTemplate: "api/Customers/LoadAutomailCustomers",
defaults: new { controller = "Customers", action = "LoadAutomailCustomers" }
);

			config.Routes.MapHttpRoute(
name: "CreateSalesLeadFromCustomers",
routeTemplate: "api/Customers/CreateSalesLeadFromCustomers",
defaults: new { controller = "Customers", action = "CreateSalesLeadFromCustomers" }
);

			config.Routes.MapHttpRoute(
			name: "DeleteCustomer",
			routeTemplate: "api/Customers/Delete",
			defaults: new { controller = "Customers", action = "Delete" }
			);
            config.Routes.MapHttpRoute(
    name: "IsUsedInInvoice",
    routeTemplate: "api/Customers/IsUsedInInvoice",
    defaults: new { controller = "Customers", action = "IsUsedInInvoice" }
    );

            config.Routes.MapHttpRoute(
				name: "RefreshInvoicesVATNumber",
				routeTemplate: "api/Customers/RefreshInvoicesVATNumber",
				defaults: new { controller = "Customers", action = "RefreshInvoicesVATNumber" }
			);
            config.Routes.MapHttpRoute(
			name: "CustomerSL_SalesManInsert",
			routeTemplate: "api/CustomerSL_SalesMan/Insert",
			defaults: new { controller = "CustomerSL_SalesMan", action = "Insert" }
			);

			config.Routes.MapHttpRoute(
			name: "CustomerLoadSalesManByCustomerID",
			routeTemplate: "api/CustomerSL_SalesMan/LoadSalesManByCustomerID",
			defaults: new { controller = "CustomerSL_SalesMan", action = "LoadSalesManByCustomerID" }
			);

			config.Routes.MapHttpRoute(
			name: "SL_ReportsLoadInvoiceDetails",
			routeTemplate: "api/SL_Reports/LoadInvoiceDetails",
			defaults: new { controller = "SL_Reports", action = "LoadInvoiceDetails" }
			);
			config.Routes.MapHttpRoute(
			name: "SL_ReportsLoadInvoiceDetailsForClientPrint",
			routeTemplate: "api/SL_Reports/LoadInvoiceDetailsForClientPrint",
			defaults: new { controller = "SL_Reports", action = "LoadInvoiceDetailsForClientPrint" }
);

			#endregion

			#region Agents // PartnerTypeID = 2
			config.Routes.MapHttpRoute(
			name: "AgentsCheckRow",
			routeTemplate: "api/Agents/CheckRow",
			defaults: new { controller = "Agents", action = "CheckRow", pAgentID = RouteParameter.Optional }
			);

			config.Routes.MapHttpRoute(
					name: "AgentsUnlockRecord",
					routeTemplate: "api/Agents/UnlockRecord/{pAgentID}",
					defaults: new { controller = "Agents", action = "UnlockRecord", pAgentID = RouteParameter.Optional }
				);
			#endregion
			#region ShippingAgents // PartnerTypeID = 3
			config.Routes.MapHttpRoute(
			name: "ShippingAgentsCheckRow",
			routeTemplate: "api/ShippingAgents/CheckRow",
			defaults: new { controller = "ShippingAgents", action = "CheckRow", pShippingAgentID = RouteParameter.Optional }
			);

			config.Routes.MapHttpRoute(
					name: "ShippingAgentsUnlockRecord",
					routeTemplate: "api/ShippingAgents/UnlockRecord/{pShippingAgentID}",
					defaults: new { controller = "ShippingAgents", action = "UnlockRecord", pShippingAgentID = RouteParameter.Optional }
				);
			#endregion
			#region CustomsClearanceAgents // PartnerTypeID = 4
			config.Routes.MapHttpRoute(
			name: "CustomsClearanceAgentsCheckRow",
			routeTemplate: "api/CustomsClearanceAgents/CheckRow",
			defaults: new { controller = "CustomsClearanceAgents", action = "CheckRow", pCustomsClearanceAgentID = RouteParameter.Optional }
			);

			config.Routes.MapHttpRoute(
					name: "CustomsClearanceAgentsUnlockRecord",
					routeTemplate: "api/CustomsClearanceAgents/UnlockRecord/{pCustomsClearanceAgentID}",
					defaults: new { controller = "CustomsClearanceAgents", action = "UnlockRecord", pCustomsClearanceAgentID = RouteParameter.Optional }
				);
			#endregion
			#region ShippingLines // PartnerTypeID = 8
			config.Routes.MapHttpRoute(
			name: "ShippingLinesCheckRow",
			routeTemplate: "api/ShippingLines/CheckRow",
			defaults: new { controller = "ShippingLines", action = "CheckRow", pShippingLineID = RouteParameter.Optional }
			);

			config.Routes.MapHttpRoute(
					name: "ShippingLinesUnlockRecord",
					routeTemplate: "api/ShippingLines/UnlockRecord/{pShippingLineID}",
					defaults: new { controller = "ShippingLines", action = "UnlockRecord", pShippingLineID = RouteParameter.Optional }
				);
			#endregion
			#region Airlines // PartnerTypeID = 6
			config.Routes.MapHttpRoute(
			name: "AirlinesCheckRow",
			routeTemplate: "api/Airlines/CheckRow",
			defaults: new { controller = "Airlines", action = "CheckRow", pAirlineID = RouteParameter.Optional }
			);

			config.Routes.MapHttpRoute(
					name: "AirlinesUnlockRecord",
					routeTemplate: "api/Airlines/UnlockRecord/{pAirlineID}",
					defaults: new { controller = "Airlines", action = "UnlockRecord", pAirlineID = RouteParameter.Optional }
				);
			#endregion
			#region Truckers // PartnerTypeID = 7
			config.Routes.MapHttpRoute(
			name: "TruckersCheckRow",
			routeTemplate: "api/Truckers/CheckRow",
			defaults: new { controller = "Truckers", action = "CheckRow", pTruckerID = RouteParameter.Optional }
			);

			config.Routes.MapHttpRoute(
					name: "TruckersUnlockRecord",
					routeTemplate: "api/Truckers/UnlockRecord/{pTruckerID}",
					defaults: new { controller = "Truckers", action = "UnlockRecord", pTruckerID = RouteParameter.Optional }
				);
			#endregion
			#region Suppliers // PartnerTypeID = 8
			config.Routes.MapHttpRoute(
			name: "SuppliersCheckRow",
			routeTemplate: "api/Suppliers/CheckRow",
			defaults: new { controller = "Suppliers", action = "CheckRow", pSupplierID = RouteParameter.Optional }
			);

			config.Routes.MapHttpRoute(
					name: "SuppliersUnlockRecord",
					routeTemplate: "api/Suppliers/UnlockRecord/{pSupplierID}",
					defaults: new { controller = "Suppliers", action = "UnlockRecord", pSupplierID = RouteParameter.Optional }
				);

			config.Routes.MapHttpRoute(
				name: "LoadSupplierSites",
				routeTemplate: "api/Suppliers/LoadSupplierSites",
				defaults: new { controller = "Suppliers", action = "LoadSupplierSites" }
			);

			config.Routes.MapHttpRoute(
				name: "LoadAllSuppliers",
				routeTemplate: "api/Suppliers/LoadAll",
				defaults: new { controller = "Suppliers", action = "LoadAll" }
			);


			#endregion
			#region CustomsClearance
			config.Routes.MapHttpRoute(
				  name: "CustomsItems_Insert",
				  routeTemplate: "api/CustomsItems/CustomsItems_Insert",
				  defaults: new { controller = "CustomsItems", action = "CustomsItems_Insert" }
			  );
			config.Routes.MapHttpRoute(
				 name: "CustomsItems_CustomsItems_Insert_Update",
				 routeTemplate: "api/CustomsItems/CustomsItems_Insert_Update",
				 defaults: new { controller = "CustomsItems", action = "CustomsItems_Insert_Update" }
			 );

			config.Routes.MapHttpRoute(
		   name: "MasterData_CustomsItems_Insert_Update",
		   routeTemplate: "api/MasterData/CustomsItems_Insert_Update",
		   defaults: new { controller = "MasterData", action = "CustomsItems_Insert_Update" }
			);
			#endregion
			#region WH_Warehouse_Statistics
			config.Routes.MapHttpRoute(
			name: "LoadAllvwWH_CFS_WarehouseStatistics",
			routeTemplate: "api/WH_WarehouseStatistics/LoadData",
			defaults: new { controller = "WH_WarehouseStatistics", action = "LoadData" }
			 );
			config.Routes.MapHttpRoute(
			name: "LoadAllvwWH_CFS_GateIn",
			routeTemplate: "api/WH_WarehouseStatistics/LoadDataNotGateIn",
			defaults: new { controller = "WH_WarehouseStatistics", action = "LoadDataNotGateIn" }
			 );
			config.Routes.MapHttpRoute(
			name: "LoadAllSentToWarehouse",
			routeTemplate: "api/WH_WarehouseStatistics/LoadDataSentToWarehouse",
			defaults: new { controller = "WH_WarehouseStatistics", action = "LoadDataSentToWarehouse" }
			 );
			config.Routes.MapHttpRoute(
			name: "LoadDataReleased",
			routeTemplate: "api/WH_WarehouseStatistics/LoadDataReleased",
			defaults: new { controller = "WH_WarehouseStatistics", action = "LoadDataReleased" }
			 );
			#endregion
			#region DynamicsCRM
			config.Routes.MapHttpRoute(
			name: "DynamicsCRMGetQuotationByQuotationNumber",
			routeTemplate: "api/DynamicsCRM/GetQuotationByQuotationNumber",
			defaults: new { controller = "DynamicsCRM", action = "GetQuotationByQuotationNumber" }
			);
			config.Routes.MapHttpRoute(
			name: "DynamicsCRMRefreshQuotations",
			routeTemplate: "api/DynamicsCRM/RefreshQuotations",
			defaults: new { controller = "DynamicsCRM", action = "RefreshQuotations" }
			);
			config.Routes.MapHttpRoute(
			name: "DynamicsUpdateMasterData",
			routeTemplate: "api/DynamicsCRM/UpdateMasterData",
			defaults: new { controller = "DynamicsCRM", action = "UpdateMasterData" }
			);
			config.Routes.MapHttpRoute(
			name: "LinkLCLQuotation",
			routeTemplate: "api/DynamicsCRM/LinkLCLQuotations",
			defaults: new { controller = "DynamicsCRM", action = "LinkLCLQuotations" }
			);
			config.Routes.MapHttpRoute(
			name: "GetCrmUpdatesForOperation",
			routeTemplate: "api/DynamicsCRM/GetCrmUpdatesForOperation",
			defaults: new { controller = "DynamicsCRM", action = "GetCrmUpdatesForOperation" }
			);
			config.Routes.MapHttpRoute(
			name: "UpdateDynamicsQuotations",
			routeTemplate: "api/DynamicsCRM/UpdateDynamicsQuotations",
			defaults: new { controller = "DynamicsCRM", action = "UpdateDynamicsQuotations" }
			);
			config.Routes.MapHttpRoute(
			name: "DynamicsCRMLog",
			routeTemplate: "api/DynamicsCRMLog/LoadData",
			defaults: new { controller = "DynamicsCRMLog", action = "LoadData" }
			);
            #endregion
            #region DynamicsGP

            config.Routes.MapHttpRoute(
				name: "DynamicsGP_InsertCustomer",
				routeTemplate: "api/DynamicsGP/InsertCustomer",
				defaults: new { controller = "DynamicsGP", action = "InsertCustomer" }
            );
            config.Routes.MapHttpRoute(
                name: "DynamicsGP_UpdateCustomer",
                routeTemplate: "api/DynamicsGP/UpdateCustomer",
                defaults: new { controller = "DynamicsGP", action = "UpdateCustomer" }
            );
            config.Routes.MapHttpRoute(
                name: "DynamicsGP_InsertSupplier",
                routeTemplate: "api/DynamicsGP/InsertSupplier",
                defaults: new { controller = "DynamicsGP", action = "InsertSupplier" }
            );
            config.Routes.MapHttpRoute(
                name: "DynamicsGP_UpdateSupplier",
                routeTemplate: "api/DynamicsGP/UpdateSupplier",
                defaults: new { controller = "DynamicsGP", action = "UpdateSupplier" }
            );
            config.Routes.MapHttpRoute(
                name: "DynamicsGP_InsertChargeType",
                routeTemplate: "api/DynamicsGP/InsertChargeType",
                defaults: new { controller = "DynamicsGP", action = "InsertChargeType" }
            );
            config.Routes.MapHttpRoute(
                name: "DynamicsGP_UpdateChargeType",
                routeTemplate: "api/DynamicsGP/UpdateChargeType",
                defaults: new { controller = "DynamicsGP", action = "UpdateChargeType" }
            );

            config.Routes.MapHttpRoute(
                name: "DynamicsGP_InsertInvoice",
                routeTemplate: "api/DynamicsGP/InsertInvoice",
                defaults: new { controller = "DynamicsGP", action = "InsertInvoice" }
            );
            config.Routes.MapHttpRoute(
                name: "DynamicsGP_UpdateInvoiceItems",
                routeTemplate: "api/DynamicsGP/UpdateInvoiceItems",
                defaults: new { controller = "DynamicsGP", action = "UpdateInvoiceItems" }
            );
            config.Routes.MapHttpRoute(
                name: "DynamicsGP_DeleteInvoiceItems",
                routeTemplate: "api/DynamicsGP/DeleteInvoiceItems",
                defaults: new { controller = "DynamicsGP", action = "DeleteInvoiceItems" }
            );
            config.Routes.MapHttpRoute(
                name: "DynamicsGP_InsertVendorInvoice",
                routeTemplate: "api/DynamicsGP/InsertVendorInvoice",
                defaults: new { controller = "DynamicsGP", action = "InsertVendorInvoice" }
            );
            config.Routes.MapHttpRoute(
                name: "DynamicsGP_SendPostRequestToExternalAPI",
                routeTemplate: "api/DynamicsGP/SendPostRequestToExternalAPI",
                defaults: new { controller = "DynamicsGP", action = "SendPostRequestToExternalAPI" }
            );
            config.Routes.MapHttpRoute(
                name: "DynamicsGP_InsertCreditNote",
                routeTemplate: "api/DynamicsGP/InsertCreditNote",
                defaults: new { controller = "DynamicsGP", action = "InsertCreditNote" }
            );
            config.Routes.MapHttpRoute(
                name: "DynamicsGP_InsertDebitNote",
                routeTemplate: "api/DynamicsGP/InsertDebitNote",
                defaults: new { controller = "DynamicsGP", action = "InsertDebitNote" }
            );
            config.Routes.MapHttpRoute(
                name: "DynamicsGP_GetPayments",
                routeTemplate: "api/DynamicsGP/GetPayments",
                defaults: new { controller = "DynamicsGP", action = "GetPayments" }
            );
            #endregion
            #region Station
            config.Routes.MapHttpRoute(
			 name: "PreGateInLoadPreGateInDetails",
			 routeTemplate: "api/PreGateIn/LoadPreGateInDetails",
			 defaults: new { controller = "PreGateIn", action = "LoadPreGateInDetails" }
			  );
			config.Routes.MapHttpRoute(
			name: "PreGateInIntializeData",
			routeTemplate: "api/PreGateIn/IntializeData",
			defaults: new { controller = "PreGateIn", action = "IntializeData" }
			 );
			config.Routes.MapHttpRoute(
		   name: "PreGateInLoadST_PreGateInDetails",
		   routeTemplate: "api/PreGateIn/LoadST_PreGateInDetails",
		   defaults: new { controller = "PreGateIn", action = "LoadST_PreGateInDetails" }
			);

			config.Routes.MapHttpRoute(
			 name: "GateInLoadPreGateInDetails",
			 routeTemplate: "api/GateIn/LoadGateInDetails",
			 defaults: new { controller = "GateIn", action = "LoadGateInDetails" }
			  );

			config.Routes.MapHttpRoute(
			name: "GateInIntializeData",
			routeTemplate: "api/GateIn/IntializeData",
			defaults: new { controller = "GateIn", action = "IntializeData" }
			 );
			config.Routes.MapHttpRoute(
		   name: "GateInLoadST_GateInDetails",
		   routeTemplate: "api/GateIn/LoadST_GateInDetails",
		   defaults: new { controller = "GateIn", action = "LoadST_GateInDetails" }
			);
			config.Routes.MapHttpRoute(
		 name: "GateInLoadGateOutDetails",
		 routeTemplate: "api/GateOut/LoadGateOutDetails",
		 defaults: new { controller = "GateOut", action = "LoadGateOutDetails" }
		  );

			config.Routes.MapHttpRoute(
			name: "GateOutIntializeData",
			routeTemplate: "api/GateOut/IntializeData",
			defaults: new { controller = "GateOut", action = "IntializeData" }
			 );
			config.Routes.MapHttpRoute(
		   name: "GateOutLoadST_GateInDetails",
		   routeTemplate: "api/GateOut/LoadST_GateOutDetails",
		   defaults: new { controller = "GateOut", action = "LoadST_GateOutDetails" }
			);


			config.Routes.MapHttpRoute(
			name: "PackingLoadPackingDetails",
			routeTemplate: "api/Packing/LoadPackingDetails",
			defaults: new { controller = "Packing", action = "LoadPackingDetails" }
			 );

			config.Routes.MapHttpRoute(
			name: "PackingTransactionInsert",
			routeTemplate: "api/Packing/TransactionInsert",
			defaults: new { controller = "Packing", action = "TransactionInsert" }
			 );

			config.Routes.MapHttpRoute(
			name: "PackingTransactiondetailsInsert",
			routeTemplate: "api/Packing/TransactiondetailsInsert",
			defaults: new { controller = "Packing", action = "TransactiondetailsInsert" }
			 );

			config.Routes.MapHttpRoute(
			name: "PackingIntializeData",
			routeTemplate: "api/Packing/IntializeData",
			defaults: new { controller = "Packing", action = "IntializeData" }
			 );
			config.Routes.MapHttpRoute(
		   name: "PackingLoadST_PackingDetails",
		   routeTemplate: "api/Packing/LoadST_PackingDetails",
		   defaults: new { controller = "Packing", action = "LoadST_PackingDetails" }
			);
			config.Routes.MapHttpRoute(
		  name: "PackingLoadST_Packing",
		  routeTemplate: "api/Packing/LoadST_Packing",
		  defaults: new { controller = "Packing", action = "LoadST_Packing" }
		   );

			config.Routes.MapHttpRoute(
			  name: "PackingReceivables_AGRInsert",
			  routeTemplate: "api/Packing/Receivables_AGRInsert",
			  defaults: new { controller = "Packing", action = "Receivables_AGRInsert" }
			  );

			//config.Routes.MapHttpRoute(
			//  name: "Receivables_AGR_UpdateList",
			//  routeTemplate: "api/Packing/UpdateList",
			//  defaults: new { controller = "Packing", action = "UpdateList" }
			//  );



			#endregion


			config.Routes.MapHttpRoute(
				name: "TRCK_Equipments_LoadAll",
				routeTemplate: "api/TRCK_Equipments/LoadAll",
				defaults: new { controller = "TRCK_Equipments", action = "LoadAll" }
				 );
			config.Routes.MapHttpRoute(
				 name: "TRCK_Equipments_Delete",
				 routeTemplate: "api/TRCK_Equipments/Delete",
				 defaults: new { controller = "TRCK_Equipments", action = "Delete" }
				  );
			config.Routes.MapHttpRoute(
				 name: "TRCK_Equipments_CheckRow",
				 routeTemplate: "api/TRCK_Equipments/CheckRow",
				 defaults: new { controller = "TRCK_Equipments", action = "CheckRow" }
				  );
			config.Routes.MapHttpRoute(
				 name: "TRCK_Equipments_UnlockRecord",
				 routeTemplate: "api/TRCK_Equipments/UnlockRecord",
				 defaults: new { controller = "TRCK_Equipments", action = "UnlockRecord" }
				  );
			config.Routes.MapHttpRoute(
				name: "TRCK_Equipments_LoadTRCK_Equipment_Items",
				routeTemplate: "api/TRCK_Equipments/LoadTRCK_Equipment_Items",
				defaults: new { controller = "TRCK_Equipments", action = "LoadTRCK_Equipment_Items" }
				 );
			config.Routes.MapHttpRoute(
				name: "TRCK_Equipments_LoadTRCK_Equipment_ItemsWheels",
				routeTemplate: "api/TRCK_Equipments/LoadTRCK_Equipment_ItemsWheels",
				defaults: new { controller = "TRCK_Equipments", action = "LoadTRCK_Equipment_ItemsWheels" }
				 );

			config.Routes.MapHttpRoute(
				name: "TRCK_EquipmentsInsert",
				routeTemplate: "api/TRCK_Equipments/Insert",
				defaults: new { controller = "TRCK_Equipments", action = "Insert" }
				);
			config.Routes.MapHttpRoute(
				name: "TRCK_EquipmentsUpdate",
				routeTemplate: "api/TRCK_Equipments/Update",
				defaults: new { controller = "TRCK_Equipments", action = "Update" }
				);

			#region Users
			config.Routes.MapHttpRoute(
				name: "InsertUser",
				routeTemplate: "api/Users/Insert",
				defaults: new { controller = "Users", action = "Insert" }
				);
			config.Routes.MapHttpRoute(
				name: "LoadAllIDs",
				routeTemplate: "api/Users/LoadAllIDs",
				defaults: new { controller = "Users", action = "LoadAllIDs" }
				);
			config.Routes.MapHttpRoute(
				name: "UpdateUser",
				routeTemplate: "api/Users/Update",
				defaults: new { controller = "Users", action = "Update" }
				);

			config.Routes.MapHttpRoute(
				name: "LoadAll_users",
				routeTemplate: "api/Users/LoadAll",
				defaults: new { controller = "Users", action = "LoadAll" }
				);
			config.Routes.MapHttpRoute(
	name: "LoadAllUserSalesmen_users",
	routeTemplate: "api/Users/LoadAllUserSalesmen",
	defaults: new { controller = "Users", action = "LoadAllUserSalesmen" }
	);
			config.Routes.MapHttpRoute(
				name: "ChangePassword",
				routeTemplate: "api/Users/ChangePassword",
				defaults: new { controller = "Users", action = "ChangePassword" }
				);

			//Nour27092023
			config.Routes.MapHttpRoute(
				name: "GetUserWHCSFTariffDrafts",
				routeTemplate: "api/Users/GetUserWHCSFTariffDrafts",
				defaults: new { controller = "Users", action = "GetUserWHCSFTariffDrafts" }
				);
			config.Routes.MapHttpRoute(
				name: "UpdateUserWHCSFTariffDrafts",
				routeTemplate: "api/Users/UpdateUserWHCSFTariffDrafts",
				defaults: new { controller = "Users", action = "UpdateUserWHCSFTariffDrafts" }
				);

			config.Routes.MapHttpRoute(
				name: "GetUserSalesmenServices",
				routeTemplate: "api/Users/GetUserSalesmenServices",
				defaults: new { controller = "Users", action = "GetUserSalesmenServices" }
				);
			config.Routes.MapHttpRoute(
				name: "UpdateUserSalesmenServices",
				routeTemplate: "api/Users/UpdateUserSalesmenServices",
				defaults: new { controller = "Users", action = "UpdateUserSalesmenServices" }
				);

			#endregion
			#region UserPrivileges //UserForms
			config.Routes.MapHttpRoute(
				name: "GetPermissions",
				routeTemplate: "api/UserPrivileges/LoadAll",
				defaults: new { controller = "UserPrivileges", action = "LoadAll" }
				);

			config.Routes.MapHttpRoute(
				name: "LoadAll_SecCustomizedUserPrivileges",
				routeTemplate: "api/UserPrivileges/LoadAll_SecCustomizedUserPrivileges",
				defaults: new { controller = "UserPrivileges", action = "LoadAll_SecCustomizedUserPrivileges" }
				);


            config.Routes.MapHttpRoute(
            name: "LoadAll_SecCustomizedUserPrivilegesMescoReports",
            routeTemplate: "api/WH_CFS_ReleaseVouchers/LoadAll_SecCustomizedUserPrivilegesMescoReports",
            defaults: new { controller = "WH_CFS_ReleaseVouchers", action = "LoadAll_SecCustomizedUserPrivilegesMescoReports" }
            );

            config.Routes.MapHttpRoute(
	name: "GetBranchUsers",
	routeTemplate: "api/Branches/GetBranchUsers",
	defaults: new { controller = "Branches", action = "GetBranchUsers" }
	);

        config.Routes.MapHttpRoute(
        name: "UpdateBranchUsers",
        routeTemplate: "api/Branches/UpdateBranchUsers",
        defaults: new { controller = "Branches", action = "UpdateBranchUsers" }
        );


            config.Routes.MapHttpRoute(
name: "GetUserBranches",
routeTemplate: "api/Users/GetUserBranches",
defaults: new { controller = "Users", action = "GetUserBranches" }
);

    config.Routes.MapHttpRoute(
            name: "GetUserActivities",
            routeTemplate: "api/Users/GetUserActivities",
            defaults: new { controller = "Users", action = "GetUserActivities" }
            );

            config.Routes.MapHttpRoute(
name: "UpdateUserActivities",
routeTemplate: "api/Users/UpdateUserActivities",
defaults: new { controller = "Users", action = "UpdateUserActivities" }
);

            config.Routes.MapHttpRoute(
name: "UpdateUserBranches",
routeTemplate: "api/Users/UpdateUserBranches",
defaults: new { controller = "Users", action = "UpdateUserBranches" }
);
            config.Routes.MapHttpRoute(
name: "GetUserWarehouses",
routeTemplate: "api/Users/GetUserWarehouses",
defaults: new { controller = "Users", action = "GetUserWarehouses" }
);
			config.Routes.MapHttpRoute(
name: "UpdateUserWarehouses",
routeTemplate: "api/Users/UpdateUserWarehouses",
defaults: new { controller = "Users", action = "UpdateUserWarehouses" }
);
			config.Routes.MapHttpRoute(
name: "AddRoleForAllUsers",
routeTemplate: "api/RolePrivileges/AddRoleForAllUsers",
defaults: new { controller = "RolePrivileges", action = "AddRoleForAllUsers" }
);
			#endregion
			#region Quotations
			config.Routes.MapHttpRoute(
				name: "InsertQuotation",
				routeTemplate: "api/Quotations/Insert",
				defaults: new { controller = "Quotations", action = "Insert" }
				);

			config.Routes.MapHttpRoute(
				name: "UpdateQuotation",
				routeTemplate: "api/Quotations/Update",
				defaults: new { controller = "Quotations", action = "Update" }
				);
			config.Routes.MapHttpRoute(
				name: "FleetQuotation_Update",
				routeTemplate: "api/Quotations/FleetQuotation_Update",
				defaults: new { controller = "Quotations", action = "FleetQuotation_Update" }
				);
			config.Routes.MapHttpRoute(
				name: "FleetQuotation_CreateCutoffInvoice",
				routeTemplate: "api/Quotations/FleetQuotation_CreateCutoffInvoice",
				defaults: new { controller = "Quotations", action = "FleetQuotation_CreateCutoffInvoice" }
				);
			config.Routes.MapHttpRoute(
				name: "FleetApprovedTransportOrder_RemoveInvoicedOrders",
				routeTemplate: "api/Quotations/FleetApprovedTransportOrder_RemoveInvoicedOrders",
				defaults: new { controller = "Quotations", action = "FleetApprovedTransportOrder_RemoveInvoicedOrders" }
				);
			config.Routes.MapHttpRoute(
				name: "FleetApprovedTransportOrder_AddInvoicedOrders",
				routeTemplate: "api/Quotations/FleetApprovedTransportOrder_AddInvoicedOrders",
				defaults: new { controller = "Quotations", action = "FleetApprovedTransportOrder_AddInvoicedOrders" }
				);
			config.Routes.MapHttpRoute(
				name: "CreateOperationFromQuotation",
				routeTemplate: "api/Quotations/CreateOperationFromQuotation",
				defaults: new { controller = "Quotations", action = "CreateOperationFromQuotation" }
				);
			config.Routes.MapHttpRoute(
				name: "GetModalControls",
				routeTemplate: "api/Quotations/GetModalControls",
				defaults: new { controller = "Quotations", action = "GetModalControls" }
				);
			config.Routes.MapHttpRoute(
				name: "Quotations_GetChargesWithApprovals",
				routeTemplate: "api/Quotations/GetChargesWithApprovals",
				defaults: new { controller = "Quotations", action = "GetChargesWithApprovals" }
				);
			config.Routes.MapHttpRoute(
				name: "GetQuotationCharges",
				routeTemplate: "api/Quotations/GetQuotationCharges",
				defaults: new { controller = "Quotations", action = "GetQuotationCharges" }
				);
			config.Routes.MapHttpRoute(
				name: "CheckQuotationDraft",
				routeTemplate: "api/Quotations/CheckQuotationDraft",
				defaults: new { controller = "Quotations", action = "CheckQuotationDraft" }
				);
			config.Routes.MapHttpRoute(
				name: "CreateOperationFromAlarm",
				routeTemplate: "api/Quotations/CreateOperationFromAlarm",
				defaults: new { controller = "Quotations", action = "CreateOperationFromAlarm" }
				);
			config.Routes.MapHttpRoute(
			  name: "CreateHouseFormQuotation",
			  routeTemplate: "api/Quotations/CreateHouseFormQuotation",
			  defaults: new { controller = "Quotations", action = "CreateHouseFormQuotation" }
			  );
			config.Routes.MapHttpRoute(
			  name: "GetOperationsCreatedFromQuotationRoute",
			  routeTemplate: "api/Quotations/GetOperationsCreatedFromQuotationRoute",
			  defaults: new { controller = "Quotations", action = "GetOperationsCreatedFromQuotationRoute" }
			  );
			config.Routes.MapHttpRoute(
				name: "QuotationCharges_UpdateList",
				routeTemplate: "api/QuotationCharges/UpdateList",
				defaults: new { controller = "QuotationCharges", action = "UpdateList" }
				);
            config.Routes.MapHttpRoute(
        name: "QuotationCharges_ApplyQuotationPackagesToOperation",
        routeTemplate: "api/QuotationCharges/ApplyQuotationPackagesToOperation",
        defaults: new { controller = "QuotationCharges", action = "ApplyQuotationPackagesToOperation" }
        );
            config.Routes.MapHttpRoute(
        name: "QuotationCharges_ApplyQuotationChargesToOperation",
        routeTemplate: "api/QuotationCharges/ApplyQuotationChargesToOperation",
        defaults: new { controller = "QuotationCharges", action = "ApplyQuotationChargesToOperation" }
        );
            config.Routes.MapHttpRoute(
				name: "QuotationPerformaPrint",
				routeTemplate: "api/Quotations/GetPerformaToPrint",
				defaults: new { controller = "Quotations", action = "GetPerformaToPrint" }
				);
			config.Routes.MapHttpRoute(
				name: "GetQuotationDataToPrint",
				routeTemplate: "api/Quotations/GetQuotationDataToPrint",
				defaults: new { controller = "Quotations", action = "GetQuotationDataToPrint" }
				);
			config.Routes.MapHttpRoute(
				name: "LCLPerformaToPrint",
				routeTemplate: "api/Quotations/LCLPerformaToPrint",
				defaults: new { controller = "Quotations", action = "LCLPerformaToPrint" }
				);
            config.Routes.MapHttpRoute(
            name: "CheckChargeTypeCategory",
            routeTemplate: "api/Quotations/CheckChargeTypeCategory",
            defaults: new { controller = "Quotations", action = "CheckChargeTypeCategory" }
            );
            #endregion

            #region Operations


            config.Routes.MapHttpRoute(
           name: "CreationMessage",
           routeTemplate: "api/Operations/CreationMessage",
           defaults: new { controller = "Operations", action = "CreationMessage" }
           );
            config.Routes.MapHttpRoute(
           name: "CreationMessageFromCFS",
           routeTemplate: "api/Operations/CreationMessageFromCFS",
           defaults: new { controller = "Operations", action = "CreationMessageFromCFS" }
           );
            config.Routes.MapHttpRoute(
           name: "CreationMessageToUsers",
           routeTemplate: "api/Operations/CreationMessageToUsers",
           defaults: new { controller = "Operations", action = "CreationMessageToUsers" }
           );
            config.Routes.MapHttpRoute(
           name: "AddUserDetails",
           routeTemplate: "api/Operations/AddUserDetails",
           defaults: new { controller = "Operations", action = "AddUserDetails" }
           );
            config.Routes.MapHttpRoute(
           name: "CreationMessageToClient",
           routeTemplate: "api/Operations/CreationMessageToClient",
           defaults: new { controller = "Operations", action = "CreationMessageToClient" }
           );
            config.Routes.MapHttpRoute(
      name: "SendMessageToAllCustomers",
      routeTemplate: "api/Operations/SendMessageToAllCustomers",
      defaults: new { controller = "Operations", action = "SendMessageToAllCustomers" }
      );
            config.Routes.MapHttpRoute(
		   name: "CreationMessageAfterInvoicsApprov",
		   routeTemplate: "api/Operations/CreationMessageAfterInvoicsApprov",
		   defaults: new { controller = "Operations", action = "CreationMessageAfterInvoicsApprov" }
		   );
            config.Routes.MapHttpRoute(
		  name: "ReceivePaymentTransactionDetails",
		  routeTemplate: "api/Operations/ReceivePaymentTransactionDetails",
		  defaults: new { controller = "Operations", action = "ReceivePaymentTransactionDetails" }
		  );
            config.Routes.MapHttpRoute(
			name: "SendPaymentTransactionDetails",
			routeTemplate: "api/Operations/SendPaymentTransactionDetails",
			defaults: new { controller = "Operations", action = "SendPaymentTransactionDetails" }
			);
            config.Routes.MapHttpRoute(
			 name: "WhatsPrintInvoiceQR",
			 routeTemplate: "api/Operations/WhatsPrintInvoiceQR",
			 defaults: new { controller = "Operations", action = "WhatsPrintInvoiceQR" }
			 );
            config.Routes.MapHttpRoute(
			name: "WhatsPrintDeleveryOrderQR",
			routeTemplate: "api/Operations/WhatsPrintDeleveryOrderQR",
			defaults: new { controller = "Operations", action = "WhatsPrintDeleveryOrderQR" }
			);
            config.Routes.MapHttpRoute(
			  name: "CheckInvoicePaymentOrNot",
			  routeTemplate: "api/Operations/CheckInvoicePaymentOrNot",
			  defaults: new { controller = "Operations", action = "CheckInvoicePaymentOrNot" }
			  );
            config.Routes.MapHttpRoute(
		    name: "HouseFilterChat",
			routeTemplate: "api/Operations/HouseFilterChat",
			defaults: new { controller = "Operations", action = "HouseFilterChat" }
			);
            config.Routes.MapHttpRoute(
			name: "HouseFilterChatCheck",
			routeTemplate: "api/Operations/HouseFilterChatCheck",
			defaults: new { controller = "Operations", action = "HouseFilterChatCheck" }
			);
            config.Routes.MapHttpRoute(
            name: "HouseFilterChatINvoice",
            routeTemplate: "api/Operations/HouseFilterChatINvoice",
            defaults: new { controller = "Operations", action = "HouseFilterChatINvoice" }
            );
            config.Routes.MapHttpRoute(
		   name: "ConfirmPaymentInvoice",
		   routeTemplate: "api/Operations/ConfirmPaymentInvoice",
		   defaults: new { controller = "Operations", action = "ConfirmPaymentInvoice" }
		   );
            config.Routes.MapHttpRoute(
			  name: "HouseInvoicePsyment",
			  routeTemplate: "api/Operations/HouseInvoicePsyment",
			  defaults: new { controller = "Operations", action = "HouseInvoicePsyment" }
			  );
            config.Routes.MapHttpRoute(
			 name: "WhatsAppChatASR",
			 routeTemplate: "api/Operations/WhatsAppChatASR",
			 defaults: new { controller = "Operations", action = "WhatsAppChatASR" }
			 );
            config.Routes.MapHttpRoute(
			 name: "WhatsAppINvoiceASR",
			 routeTemplate: "api/Operations/WhatsAppINvoiceASR",
			 defaults: new { controller = "Operations", action = "WhatsAppINvoiceASR" }
			 );
            config.Routes.MapHttpRoute(
			name: "HouseAndClientSave",
			routeTemplate: "api/Operations/HouseAndClientSave",
			defaults: new { controller = "Operations", action = "HouseAndClientSave" }
			);
            config.Routes.MapHttpRoute(
               name: "LoadPlacedOnDetails",
               routeTemplate: "api/Operations/LoadPlacedOnDetails",
               defaults: new { controller = "Operations", action = "LoadPlacedOnDetails" }
               );
			
			config.Routes.MapHttpRoute(
               name: "updatePlacedOnDetails",
               routeTemplate: "api/Operations/updatePlacedOnDetails",
               defaults: new { controller = "Operations", action = "updatePlacedOnDetails" }
               );


            config.Routes.MapHttpRoute(
				name: "FillNafezaControls",
				routeTemplate: "api/Operations/FillNafezaControls",
				defaults: new { controller = "Operations", action = "FillNafezaControls" }
				);
				config.Routes.MapHttpRoute(
				name: "InsertOperation",
				routeTemplate: "api/Operations/Insert",
				defaults: new { controller = "Operations", action = "Insert" }
				);
			config.Routes.MapHttpRoute(
			  name: "InsertFromLCL",
			  routeTemplate: "api/Operations/InsertFromLCL",
			  defaults: new { controller = "Operations", action = "InsertFromLCL" }
			  );
			config.Routes.MapHttpRoute(
				name: "LoadAllOperations",
				routeTemplate: "api/Operations/LoadAll",
				defaults: new { controller = "Operations", action = "LoadAll" }
				);

			config.Routes.MapHttpRoute(
				name: "UpdateOperation",
				routeTemplate: "api/Operations/Update",
				defaults: new { controller = "Operations", action = "Update" }
				);
			config.Routes.MapHttpRoute(
				name: "InsertShipmentAWB",
				routeTemplate: "api/Operations/InsertShipmentAWB",
				defaults: new { controller = "Operations", action = "InsertShipmentAWB" }
				);
			config.Routes.MapHttpRoute(
				name: "UpdateShipmentAWB",
				routeTemplate: "api/Operations/UpdateShipmentAWB",
				defaults: new { controller = "Operations", action = "UpdateShipmentAWB" }
				);
			config.Routes.MapHttpRoute(
				name: "Shipment_SetCertificateNumber",
				routeTemplate: "api/Operations/Shipment_SetCertificateNumber",
				defaults: new { controller = "Operations", action = "Shipment_SetCertificateNumber" }
				);
			config.Routes.MapHttpRoute(
				name: "ShipmentDates_SaveList",
				routeTemplate: "api/Operations/ShipmentDates_SaveList",
				defaults: new { controller = "Operations", action = "ShipmentDates_SaveList" }
				);
			config.Routes.MapHttpRoute(
				name: "CopyPackagesFromMasterToHouse",
				routeTemplate: "api/Operations/CopyPackagesFromMasterToHouse",
				defaults: new { controller = "Operations", action = "CopyPackagesFromMasterToHouse" }
				);
			config.Routes.MapHttpRoute(
			  name: "CopyPackagesFromMasterToHouse_Ocean",
			  routeTemplate: "api/Operations/CopyPackagesFromMasterToHouse_Ocean",
			  defaults: new { controller = "Operations", action = "CopyPackagesFromMasterToHouse_Ocean" }
			  );
			config.Routes.MapHttpRoute(
				name: "CopyRoutingAndDestinationFromMasterToHouse",
				routeTemplate: "api/Operations/CopyRoutingAndDestinationFromMasterToHouse",
				defaults: new { controller = "Operations", action = "CopyRoutingAndDestinationFromMasterToHouse" }
				);
			config.Routes.MapHttpRoute(
				name: "SetHouseDeliveryOrderPrintData",
				routeTemplate: "api/Operations/SetHouseDeliveryOrderPrintData",
				defaults: new { controller = "Operations", action = "SetHouseDeliveryOrderPrintData" }
				);
			config.Routes.MapHttpRoute(
				name: "LoadUnlinkedHAWB",
				routeTemplate: "api/Operations/LoadUnlinkedHAWB",
				defaults: new { controller = "Operations", action = "LoadUnlinkedHAWB" }
				);
			config.Routes.MapHttpRoute(
				name: "LinkHAWB",
				routeTemplate: "api/Operations/LinkHAWB",
				defaults: new { controller = "Operations", action = "LinkHAWB" }
				);
			config.Routes.MapHttpRoute(
				name: "LoadShipmentComboBoxes",
				routeTemplate: "api/Operations/LoadShipmentComboBoxes",
				defaults: new { controller = "Operations", action = "LoadShipmentComboBoxes" }
				);
			config.Routes.MapHttpRoute(
				name: "FillShipmentControls_New",
				routeTemplate: "api/Operations/FillShipmentControls_New",
				defaults: new { controller = "Operations", action = "FillShipmentControls_New" }
				);
			config.Routes.MapHttpRoute(
				name: "GetOperationPayablesAndReceivables",
				routeTemplate: "api/Operations/GetOperationPayablesAndReceivables",
				defaults: new { controller = "Operations", action = "GetOperationPayablesAndReceivables" }
				);
			config.Routes.MapHttpRoute(
				name: "UpdateOperationCharges",
				routeTemplate: "api/Operations/UpdateOperationCharges",
				defaults: new { controller = "Operations", action = "UpdateOperationCharges" }
				);
			config.Routes.MapHttpRoute(
				name: "CheckLastMonthOperations",
				routeTemplate: "api/Operations/CheckLastMonthOperations",
				defaults: new { controller = "Operations", action = "CheckLastMonthOperations" }
				);
			config.Routes.MapHttpRoute(
	   name: "Operations_GetQuotationRouteList",
	   routeTemplate: "api/Operations/GetQuotationRouteList",
	   defaults: new { controller = "Operations", action = "GetQuotationRouteList" }
	   );
            config.Routes.MapHttpRoute(
                name: "CheckSalesmanReceivables",
                routeTemplate: "api/Operations/CheckSalesmanReceivables",
                defaults: new { controller = "Operations", action = "CheckSalesmanReceivables" }
                );
            #region IATAIntegration
            config.Routes.MapHttpRoute(
		   name: "IATAIntegration_SendFWBMessage",
		   routeTemplate: "api/IATAIntegration/SendFWBMessage",
		   defaults: new { controller = "IATAIntegration", action = "SendFWBMessage" }
		   );
			config.Routes.MapHttpRoute(
		   name: "IATAIntegration_SendFHLMessage",
		   routeTemplate: "api/IATAIntegration/SendFHLMessage",
		   defaults: new { controller = "IATAIntegration", action = "SendFHLMessage" }
		   );
			#endregion
			config.Routes.MapHttpRoute(
				name: "Receivables_LoadAll",
				routeTemplate: "api/Receivables/LoadAll",
				defaults: new { controller = "Receivables", action = "LoadAll" }
				);
			config.Routes.MapHttpRoute(
				name: "Receivables_UpdateList",
				routeTemplate: "api/Receivables/UpdateList",
				defaults: new { controller = "Receivables", action = "UpdateList" }
				);
			config.Routes.MapHttpRoute(
			   name: "Receivables_GetHouses",
			   routeTemplate: "api/Receivables/GetHouses",
			   defaults: new { controller = "Receivables", action = "GetHouses" }
			   );

			config.Routes.MapHttpRoute(
				name: "Receivables_DeleteList",
				routeTemplate: "api/Receivables/Delete",
				defaults: new { controller = "Receivables", action = "Delete" }
				);

            config.Routes.MapHttpRoute(
            name: "Receivables_CancelList",
            routeTemplate: "api/Receivables/Cancel",
            defaults: new { controller = "Receivables", action = "Cancel" }
            );
       
            config.Routes.MapHttpRoute(
                name: "CheckRecievableCategory",
                routeTemplate: "api/Receivables/CheckChargeTypeCategory",
                defaults: new { controller = "Receivables", action = "CheckChargeTypeCategory" }
                );

            config.Routes.MapHttpRoute(
				name: "Receivables_CheckIfReceivableLinkToAccount",
				routeTemplate: "api/Receivables/CheckIfReceivableLinkToAccount",
				defaults: new { controller = "Receivables", action = "CheckIfReceivableLinkToAccount" }
				);

			config.Routes.MapHttpRoute(
	name: "Receivables_InsertListFromExcel_Receivables",
	routeTemplate: "api/Receivables/InsertListFromExcel_Receivables",
	defaults: new { controller = "Receivables", action = "InsertListFromExcel_Receivables" }
	);

			config.Routes.MapHttpRoute(
name: "Payables_CheckTaxExempt",
routeTemplate: "api/Payables/CheckTaxExempt",
defaults: new { controller = "Payables", action = "CheckTaxExempt" }
);
			config.Routes.MapHttpRoute(
name: "Payables_InsertListFromExcel_Payables",
routeTemplate: "api/Payables/InsertListFromExcel_Payables",
defaults: new { controller = "Payables", action = "InsertListFromExcel_Payables" }
);
            config.Routes.MapHttpRoute(
        name: "payables_CancelList",
        routeTemplate: "api/Payables/Cancel",
        defaults: new { controller = "Payables", action = "Cancel" }
        );

            config.Routes.MapHttpRoute(
name: "payables_DeleteList",
routeTemplate: "api/Payables/Delete",
defaults: new { controller = "Payables", action = "Delete" }
);



            config.Routes.MapHttpRoute(
                name: "ContainerPackages_LoadOperationContainers",
                routeTemplate: "api/ContainerPackages/LoadOperationContainers",
                defaults: new { controller = "ContainerPackages", action = "LoadOperationContainers" }
                );


            config.Routes.MapHttpRoute(
				name: "Receivables_GetReceivablesOnly",
				routeTemplate: "api/Receivables/GetReceivablesOnly",
				defaults: new { controller = "Receivables", action = "GetReceivablesOnly" }
				);
            config.Routes.MapHttpRoute(
				name: "GetExchangerate",
				routeTemplate: "api/Receivables/GetExchangerate",
				defaults: new { controller = "Receivables", action = "GetExchangerate" }
				);

            config.Routes.MapHttpRoute(
				name: "ConnectOrDisconnect",
				routeTemplate: "api/Operations/ConnectOrDisconnect",
				defaults: new { controller = "Operations", action = "ConnectOrDisconnect" }
				);
            config.Routes.MapHttpRoute(
                name: "HoldOrNot",
                routeTemplate: "api/Operations/HoldOrNot",
                defaults: new { controller = "Operations", action = "HoldOrNot" }
                );
            config.Routes.MapHttpRoute(
				name: "ConnectOrDisconnectMultiple",
				routeTemplate: "api/Operations/ConnectOrDisconnectMultiple",
				defaults: new { controller = "Operations", action = "ConnectOrDisconnectMultiple" }
				);
			config.Routes.MapHttpRoute(
				name: "FindNumberOfUnApproved_Invoices_AccNotes_Payables",
				routeTemplate: "api/Operations/FindNumberOfUnApproved_Invoices_AccNotes_Payables",
				defaults: new { controller = "Operations", action = "FindNumberOfUnApproved_Invoices_AccNotes_Payables" }
				);
			config.Routes.MapHttpRoute(
				name: "FindCertificateNumberAndCertificateDate",
				routeTemplate: "api/Operations/FindCertificateNumberAndCertificateDate",
				defaults: new { controller = "Operations", action = "FindCertificateNumberAndCertificateDate" }
				);
			config.Routes.MapHttpRoute(
				name: "LoadReeferDetails",
				routeTemplate: "api/Operations/LoadReeferDetails",
				defaults: new { controller = "Operations", action = "LoadReeferDetails" }
				);

			config.Routes.MapHttpRoute(
			   name: "HoldUnHoldBill",
			   routeTemplate: "api/Operations/HoldUnHoldBill",
			   defaults: new { controller = "Operations", action = "HoldUnHoldBill" }
			   );
			config.Routes.MapHttpRoute(
			   name: "NafezaValidateACID",
			   routeTemplate: "api/Operations/NafezaValidateACID",
			   defaults: new { controller = "Operations", action = "NafezaValidateACID" }
			   );
			config.Routes.MapHttpRoute(
			   name: "NafezaChangeConsignee",
			   routeTemplate: "api/Operations/NafezaChangeConsignee",
			   defaults: new { controller = "Operations", action = "NafezaChangeConsignee" }
			   );
			config.Routes.MapHttpRoute(
			 name: "Operations_LoadOperationDocPrintLog",
			 routeTemplate: "api/Operations/LoadOperationDocPrintLog",
			 defaults: new { controller = "Operations", action = "LoadOperationDocPrintLog" }
			 );
			config.Routes.MapHttpRoute(
			 name: "Operations_LoadAllForHouseOrdersCombo",
			 routeTemplate: "api/Operations/LoadAllForHouseOrdersCombo",
			 defaults: new { controller = "Operations", action = "LoadAllForHouseOrdersCombo" }
			 );
			config.Routes.MapHttpRoute(
			 name: "Shipment_Update",
			 routeTemplate: "api/Operations/Shipment_Update",
			 defaults: new { controller = "Operations", action = "Shipment_Update" }
		 );
			config.Routes.MapHttpRoute(
			 name: "Operations_LoadShipmentPackages",
			 routeTemplate: "api/Operations/LoadShipmentPackages",
			 defaults: new { controller = "Operations", action = "LoadShipmentPackages" }
			 );
			config.Routes.MapHttpRoute(
			 name: "Operations_LoadContainersPlacedOn",
			 routeTemplate: "api/Operations/LoadContainersPlacedOn",
			 defaults: new { controller = "Operations", action = "LoadContainersPlacedOn" }
			 );
			config.Routes.MapHttpRoute(
			 name: "Operations_UpdateContainersPlacedOn",
			 routeTemplate: "api/Operations/UpdateContainersPlacedOn",
			 defaults: new { controller = "Operations", action = "UpdateContainersPlacedOn" }
			 );
			config.Routes.MapHttpRoute(
			name: "GetAllReceivablesForHouses",
			routeTemplate: "api/Operations/GetAllReceivablesForHouses",
			defaults: new { controller = "Operations", action = "GetAllReceivablesForHouses" }
			);
			config.Routes.MapHttpRoute(
		   name: "GetAllPayablesForHouses",
		   routeTemplate: "api/Operations/GetAllPayablesForHouses",
		   defaults: new { controller = "Operations", action = "GetAllPayablesForHouses" }
		   );
            config.Routes.MapHttpRoute(
           name: "checkCustomerIsTracked",
           routeTemplate: "api/Operations/checkCustomerIsTracked",
           defaults: new { controller = "Operations", action = "checkCustomerIsTracked" }
           );
            #endregion
            #region OperationContainersAndPackages
            config.Routes.MapHttpRoute(
				name: "InsertListFromExcel",
				routeTemplate: "api/OperationContainersAndPackages/InsertListFromExcel",
				defaults: new { controller = "OperationContainersAndPackages", action = "InsertListFromExcel" }
				);

			config.Routes.MapHttpRoute(
				name: "ApplyReeferPropertiesToAll",
				routeTemplate: "api/OperationContainersAndPackages/ApplyReeferPropertiesToAll",
				defaults: new { controller = "OperationContainersAndPackages", action = "ApplyReeferPropertiesToAll" }
				);

			config.Routes.MapHttpRoute(
				name: "ReeferDetails_Save",
				routeTemplate: "api/OperationContainersAndPackages/ReeferDetails_Save",
				defaults: new { controller = "OperationContainersAndPackages", action = "ReeferDetails_Save" }
				);


			config.Routes.MapHttpRoute(
		  name: "InsertListFromExcelTanks",
		  routeTemplate: "api/TankPayablesAndReceivables/InsertListFromExcelTanks",
		  defaults: new { controller = "TankPayablesAndReceivables", action = "InsertListFromExcelTanks" }
		  );

			config.Routes.MapHttpRoute(
	name: "TankPayablesAndReceivablesUploadExcelFileData",
	routeTemplate: "api/TankPayablesAndReceivables/UploadExcelFileData",
	defaults: new { controller = "TankPayablesAndReceivables", action = "UploadExcelFileData" }
	);

			#endregion OperationContainersAndPackages
			#region Payables
			config.Routes.MapHttpRoute(
				name: "PayablesLoadAll",
				routeTemplate: "api/Payables/LoadAll",
				defaults: new { controller = "Payables", action = "LoadAll" }
				);
			// config.Routes.MapHttpRoute(
			//name: "GetInvoiceDateByOperation",
			//routeTemplate: "api/Payables/GetInvoiceDateByOperation",
			//defaults: new { controller = "Payables", action = "GetInvoiceDateByOperation" }
			//);
			config.Routes.MapHttpRoute(
				name: "PayablesCheckIfApprovedOrNot",
				routeTemplate: "api/Payables/CheckIfApprovedOrNot",
				defaults: new { controller = "Payables", action = "CheckIfApprovedOrNot" }
				);
			config.Routes.MapHttpRoute(
				name: "LoadWithWhereClause",
				routeTemplate: "api/Payables/LoadWithWhereClause",
				defaults: new { controller = "Payables", action = "LoadWithWhereClause" }
				);
			config.Routes.MapHttpRoute(
			   name: "PayablesApproveOrUnApproveTAX",
			   routeTemplate: "api/Payables/ApproveOrUnApproveTAX",
			   defaults: new { controller = "Payables", action = "ApproveOrUnApproveTAX" }
			   );
			config.Routes.MapHttpRoute(
			   name: "PayablesApproveOrUnApprove",
			   routeTemplate: "api/Payables/ApproveOrUnApprove",
			   defaults: new { controller = "Payables", action = "ApproveOrUnApprove" }
			   );
			config.Routes.MapHttpRoute(
				name: "LoadAirLineWithWhereClause",
				routeTemplate: "api/Payables/LoadAirLineWithWhereClause",
				defaults: new { controller = "Payables", action = "LoadAirLineWithWhereClause" }
				);
			config.Routes.MapHttpRoute(
				name: "UpdateListPayables",
				routeTemplate: "api/Payables/UpdateList",
				defaults: new { controller = "Payables", action = "UpdateList" }
				);
            config.Routes.MapHttpRoute(
                name: "SetIsPurchasedPayable",
                routeTemplate: "api/Payables/SetIsPurchasedPayable",
                defaults: new { controller = "Payables", action = "SetIsPurchasedPayable" }
            );
            config.Routes.MapHttpRoute(
				name: "Payables_GetPayablesOnly",
				routeTemplate: "api/Payables/GetPayablesOnly",
				defaults: new { controller = "Payables", action = "GetPayablesOnly" }
				);
			config.Routes.MapHttpRoute(
				name: "PayablesGetHouseContainers",
				routeTemplate: "api/Payables/GetHouseContainers",
				defaults: new { controller = "Payables", action = "GetHouseContainers" }
				);
			config.Routes.MapHttpRoute(
				name: "PayablesGetContainerHouses",
				routeTemplate: "api/Payables/GetContainerHouses",
				defaults: new { controller = "Payables", action = "GetContainerHouses" }
				);
            config.Routes.MapHttpRoute(
                name: "PayablesGeneratePayableFormCalcBL",
                routeTemplate: "api/Payables/GeneratePayableFormCalcBL",
                defaults: new { controller = "Payables", action = "GeneratePayableFormCalcBL" }
                );
            config.Routes.MapHttpRoute(
                name: "CheckPayableCategory",
                routeTemplate: "api/Payables/CheckChargeTypeCategory",
                defaults: new { controller = "Payables", action = "CheckChargeTypeCategory" }
                );
            config.Routes.MapHttpRoute(
                    name: "PayablesUpdateChargeType",
                    routeTemplate: "api/Payables/UpdateChargeType",
                    defaults: new { controller = "Payables", action = "UpdateChargeType" }
                    );
            #region AccNote
            config.Routes.MapHttpRoute(
			  name: "AccNoteApproveOrUnApprove",
			  routeTemplate: "api/AccNote/ApproveOrUnApprove",
			  defaults: new { controller = "AccNote", action = "ApproveOrUnApprove" }
			  );
			config.Routes.MapHttpRoute(
			  name: "AccNoteApproveOrUnApproveTax",
			  routeTemplate: "api/AccNote/ApproveOrUnApproveTax",
			  defaults: new { controller = "AccNote", action = "ApproveOrUnApproveTax" }
			  );

			config.Routes.MapHttpRoute(
			 name: "AccNoteLoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned",
			 routeTemplate: "api/AccNote/LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned",
			 defaults: new { controller = "AccNote", action = "LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned" }
			 );
			config.Routes.MapHttpRoute(
			 name: "SetAccNoteStatus",
			 routeTemplate: "api/AccNote/SetAccNoteStatus",
			 defaults: new { controller = "AccNote", action = "SetAccNoteStatus" }
			 );
			config.Routes.MapHttpRoute(
			 name: "AccNoteLoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturnedTax",
			 routeTemplate: "api/AccNote/LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturnedTax",
			 defaults: new { controller = "AccNote", action = "LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturnedTax" }
			 );

			#endregion
			#endregion Payables
			#region Routings
			config.Routes.MapHttpRoute(
				name: "InsertRouting",
				routeTemplate: "api/Routings/Insert",
				defaults: new { controller = "Routings", action = "Insert" }
				);

			config.Routes.MapHttpRoute(
				name: "UpdateRouting",
				routeTemplate: "api/Routings/Update",
				defaults: new { controller = "Routings", action = "Update" }
				);
			config.Routes.MapHttpRoute(
				name: "Save_FleetDistribution",
				routeTemplate: "api/Routings/Save_FleetDistribution",
				defaults: new { controller = "Routings", action = "Save_FleetDistribution" }
				);

			config.Routes.MapHttpRoute(
				name: "Vehicle_SaveRouting",
				routeTemplate: "api/Routings/Vehicle_Save",
				defaults: new { controller = "Routings", action = "Vehicle_Save" }
				);

			config.Routes.MapHttpRoute(
			name: "LoadCargoWithWhereClauseRouting",
			routeTemplate: "api/Routings/LoadCargoWithWhereClause",
			defaults: new { controller = "Routings", action = "LoadCargoWithWhereClause" }
			);

			config.Routes.MapHttpRoute(
		   name: "RoutingsPackingList_Print",
		   routeTemplate: "api/Routings/PackingList_Print",
		   defaults: new { controller = "Routings", action = "PackingList_Print" }
		   );

			config.Routes.MapHttpRoute(
			name: "GetLog",
			routeTemplate: "api/Routings/GetLog",
			defaults: new { controller = "Routings", action = "GetLog" }
			);

			config.Routes.MapHttpRoute(
			name: "Routings_CopyTruckOrder",
			routeTemplate: "api/Routings/CopyTruckOrder",
			defaults: new { controller = "Routings", action = "CopyTruckOrder" }
			);

			config.Routes.MapHttpRoute(
			name: "Routings_LoadPickupAddresses",
			routeTemplate: "api/Routings/LoadPickupAddresses",
			defaults: new { controller = "Routings", action = "LoadPickupAddresses" }
			);
			#endregion Routings
			#region PurchaseingInvoice
			config.Routes.MapHttpRoute(
			   name: "PurchaseingInvoicePurchaseInvoice_LoadWithDetails",
			   routeTemplate: "api/PurchaseingInvoice/PurchaseInvoice_LoadWithDetails",
			   defaults: new { controller = "PurchaseingInvoice", action = "PurchaseInvoice_LoadWithDetails" }
			   );

			config.Routes.MapHttpRoute(
			  name: "PurchaseingInvoicePurchaseInvoice_Save",
			  routeTemplate: "api/PurchaseingInvoice/PurchaseInvoice_Save",
			  defaults: new { controller = "PurchaseingInvoice", action = "PurchaseInvoice_Save" }
			  );

			config.Routes.MapHttpRoute(
			  name: "PurchaseingInvoiceInsertItems",
			  routeTemplate: "api/PurchaseingInvoice/InsertItems",
			  defaults: new { controller = "PurchaseingInvoice", action = "InsertItems" }
			  );

			config.Routes.MapHttpRoute(
			 name: "PurchaseingInvoiceLoadInvoiceDetailsPurshasing",
			 routeTemplate: "api/PurchaseingInvoice/LoadInvoiceDetailsPurshasing",
			 defaults: new { controller = "PurchaseingInvoice", action = "LoadInvoiceDetailsPurshasing" }
			 );

			config.Routes.MapHttpRoute(
		  name: "PurchaseingInvoicePurchaseInvoice_Delete",
		  routeTemplate: "api/PurchaseingInvoice/PurchaseInvoice_Delete",
		  defaults: new { controller = "PurchaseingInvoice", action = "PurchaseInvoice_Delete" }
		  );
			config.Routes.MapHttpRoute(
		name: "PurchaseingInvoicePurchaseInvoice_Generate",
		routeTemplate: "api/PurchaseingInvoice/PurchaseInvoice_Generate",
		defaults: new { controller = "PurchaseingInvoice", action = "PurchaseInvoice_Generate" }
		);
			config.Routes.MapHttpRoute(
	   name: "PurchaseingInvoicePurchaseInvoice_UnGenerate",
	   routeTemplate: "api/PurchaseingInvoice/PurchaseInvoice_UnGenerate",
	   defaults: new { controller = "PurchaseingInvoice", action = "PurchaseInvoice_UnGenerate" }
	   );
			#endregion
			#region PurchaseInvoice/Flexi
			config.Routes.MapHttpRoute(
				name: "FlexiImport_SaveList",
				routeTemplate: "api/PurchaseInvoice/FlexiImport_SaveList",
				defaults: new { controller = "PurchaseInvoice", action = "FlexiImport_SaveList" }
				);
			config.Routes.MapHttpRoute(
				name: "FlexiExport_SaveList",
				routeTemplate: "api/PurchaseInvoice/FlexiExport_SaveList",
				defaults: new { controller = "PurchaseInvoice", action = "FlexiExport_SaveList" }
				);
			config.Routes.MapHttpRoute(
	name: "PurchaseInvoice_Delete",
	routeTemplate: "api/PurchaseInvoice/PurchaseInvoice_Delete",
	defaults: new { controller = "PurchaseInvoice", action = "PurchaseInvoice_Delete" }
	);
			config.Routes.MapHttpRoute(
name: "PurchaseInvoice_OpeningBalance_Delete",
routeTemplate: "api/PurchaseInvoice/PurchaseInvoice_OpeningBalance_Delete",
defaults: new { controller = "PurchaseInvoice", action = "PurchaseInvoice_OpeningBalance_Delete" }
);
			#endregion PurchaseInvoice/Flexi
			#region SubAccountLedger
			config.Routes.MapHttpRoute(
				name: "PrintSubAccountLedger",
				routeTemplate: "api/SubAccountLedger/GetPrintedData",
				defaults: new { controller = "SubAccountLedger", action = "GetPrintedData" }
				);
			config.Routes.MapHttpRoute(
			 name: "GetPrintedData",
			 routeTemplate: "api/SubAccountBalanceByCurrency/GetPrintedData",
			 defaults: new { controller = "SubAccountBalanceByCurrency", action = "GetPrintedData" }
			 );


			config.Routes.MapHttpRoute(
					  name: "FillSearchControls",
					  routeTemplate: "api/SubAccountBalanceByCurrency/FillSearchControls",
					  defaults: new { controller = "SubAccountBalanceByCurrency", action = "FillSearchControls" }
					  );


			config.Routes.MapHttpRoute(
			   name: "FillSearchControlsTrialBalance",
			   routeTemplate: "api/SubAccountTrialBalance/FillSearchControls",
			   defaults: new { controller = "SubAccountTrialBalance", action = "FillSearchControls" }
			   );

			config.Routes.MapHttpRoute(
				name: "PrintSubAccountTrialBalance",
				routeTemplate: "api/SubAccountTrialBalance/GetPrintedData",
				defaults: new { controller = "SubAccountTrialBalance", action = "GetPrintedData" }
				);
			#endregion SubAccountLedger
			#region Accounting Budget
			config.Routes.MapHttpRoute(
				name: "ChartOfLinkingAccountsFillUpdateSubAccount",
				routeTemplate: "api/ChartOfLinkingAccounts/FillUpdateSubAccount",
				defaults: new { controller = "ChartOfLinkingAccounts", action = "FillUpdateSubAccount" }
				);

			config.Routes.MapHttpRoute(
			name: "ChartOfLinkingAccountsGetModalData",
			routeTemplate: "api/ChartOfLinkingAccounts/GetModalData",
			defaults: new { controller = "ChartOfLinkingAccounts", action = "GetModalData" }
			);

			config.Routes.MapHttpRoute(
			name: "LoadBudgetsFiscalDetails",
			routeTemplate: "api/BudgetsFiscal/LoadBudgetsFiscalDetails",
			defaults: new { controller = "BudgetsFiscal", action = "LoadBudgetsFiscalDetails" }
			);



			config.Routes.MapHttpRoute(
				name: "BudgetsFiscalInsertItems",
				routeTemplate: "api/BudgetsFiscal/InsertItems",
				defaults: new { controller = "BudgetsFiscal", action = "InsertItems" }
				);
			config.Routes.MapHttpRoute(
				name: "BudgetsLoadAccounts",
				routeTemplate: "api/BudgetsFiscal/LoadAccounts",
				defaults: new { controller = "BudgetsFiscal", action = "LoadAccounts" }
				);
			config.Routes.MapHttpRoute(
				name: "BudgetsLoadFiscalYears",
				routeTemplate: "api/BudgetsFiscal/LoadFiscalYears",
				defaults: new { controller = "BudgetsFiscal", action = "LoadFiscalYears" }
				);



            config.Routes.MapHttpRoute(
            name: "LoadLinkeUserWithAccountsDetails",
            routeTemplate: "api/LinkeUserWithAccounts/LoadLinkeUserWithAccountsDetails",
            defaults: new { controller = "LinkeUserWithAccounts", action = "LoadLinkeUserWithAccountsDetails" }
            );



            config.Routes.MapHttpRoute(
                name: "LinkeUserWithAccountsInsertItems",
                routeTemplate: "api/LinkeUserWithAccounts/InsertItems",
                defaults: new { controller = "LinkeUserWithAccounts", action = "InsertItems" }
                );
            config.Routes.MapHttpRoute(
                name: "LinkeUserWithAccountsLoadAccounts",
                routeTemplate: "api/LinkeUserWithAccounts/LoadAccounts",
                defaults: new { controller = "LinkeUserWithAccounts", action = "LoadAccounts" }
                );
            config.Routes.MapHttpRoute(
                name: "LinkeUserWithAccountsLoadFiscalYears",
                routeTemplate: "api/LinkeUserWithAccounts/LoadFiscalYears",
                defaults: new { controller = "LinkeUserWithAccounts", action = "LoadFiscalYears" }
                );



            config.Routes.MapHttpRoute
			(
			name: "LoadFA_AssetsGroupDestructions",
			routeTemplate: "api/FA_AssetsGroups/LoadFA_AssetsGroupDestructions",
			defaults: new { controller = "FA_AssetsGroups", action = "LoadFA_AssetsGroupDestructions" }
			);



			config.Routes.MapHttpRoute(
				name: "LoadFA_AssetsGroupDestructionsInsertItems",
				routeTemplate: "api/FA_AssetsGroups/InsertItems",
				defaults: new { controller = "FA_AssetsGroups", action = "InsertItems" }
				);




			config.Routes.MapHttpRoute
			(
			name: "LoadFA_AssetsDestructions",
			routeTemplate: "api/FA_Assets/LoadFA_AssetsDestructions",
			defaults: new { controller = "FA_Assets", action = "LoadFA_AssetsDestructions" }
			);



			config.Routes.MapHttpRoute(
				name: "LoadFA_AssetsDestructionsInsertItems",
				routeTemplate: "api/FA_Assets/InsertItems",
				defaults: new { controller = "FA_Assets", action = "InsertItems" }
				);


			config.Routes.MapHttpRoute(
				name: "FA_AdditionPost",
				routeTemplate: "api/FA_Transactions/FA_AdditionPost",
				defaults: new { controller = "FA_Transactions", action = "FA_AdditionPost" }
			);

			config.Routes.MapHttpRoute(
				name: "FA_ExclusionPost",
				routeTemplate: "api/FA_Transactions/FA_ExclusionPost",
				defaults: new { controller = "FA_Transactions", action = "FA_ExclusionPost" }
			);

            config.Routes.MapHttpRoute(
                name: "FA_TransactionsInsertItems",
                routeTemplate: "api/FA_Transactions/InsertItems",
                defaults: new { controller = "FA_Transactions", action = "InsertItems" }
            );
            config.Routes.MapHttpRoute(
                name: "FA_TransactionsInsert",
                routeTemplate: "api/FA_Transactions/Insert",
                defaults: new { controller = "FA_Transactions", action = "Insert" }
            );
            config.Routes.MapHttpRoute(
              name: "FA_TransactionsIntializeData",
              routeTemplate: "api/FA_Transactions/IntializeData",
              defaults: new { controller = "FA_Transactions", action = "IntializeData" }
          );
            config.Routes.MapHttpRoute(
        name: "FA_TransactionsFA_AdditionPost",
        routeTemplate: "api/FA_Transactions/FA_AdditionPost",
        defaults: new { controller = "FA_Transactions", action = "FA_AdditionPost" }
        );
            config.Routes.MapHttpRoute(
            name: "FA_TransactionsLoadWithWhereClause",
            routeTemplate: "api/FA_Transactions/LoadWithWhereClause",
            defaults: new { controller = "FA_Transactions", action = "LoadWithWhereClause" }
            );

            config.Routes.MapHttpRoute(
            name: "FA_TransactionsUpdate",
            routeTemplate: "api/FA_Transactions/Update",
            defaults: new { controller = "FA_Transactions", action = "Update" }
            );
            config.Routes.MapHttpRoute(
          name: "FA_TransactionsDelete",
          routeTemplate: "api/FA_Transactions/Delete",
          defaults: new { controller = "FA_Transactions", action = "Delete" }
          );

            #endregion Accounting Budget
            #region VoucherHeader
            config.Routes.MapHttpRoute(
				name: "VoucherHeader_Save",
				routeTemplate: "api/Voucher/VoucherHeader_Save",
				defaults: new { controller = "Voucher", action = "VoucherHeader_Save" }
				);
			config.Routes.MapHttpRoute(
			  name: "VoucherGetSalesIDBySupAccountID",
			  routeTemplate: "api/Voucher/GetSalesIDBySupAccountID",
			  defaults: new { controller = "Voucher", action = "GetSalesIDBySupAccountID" }
			  );
			config.Routes.MapHttpRoute(
				  name: "VoucherCheckPaymentRequestExists",
				  routeTemplate: "api/Voucher/CheckPaymentRequestExist",
				  defaults: new { controller = "Voucher", action = "CheckPaymentRequestExist" }
				  );
			config.Routes.MapHttpRoute(
				  name: "LoadAllOperationsForSelect2Combo",
				  routeTemplate: "api/Voucher/LoadAllOperationsForSelect2Combo",
				  defaults: new { controller = "Voucher", action = "LoadAllOperationsForSelect2Combo" }
				  );
			config.Routes.MapHttpRoute(
				  name: "LoadAllHousesForSelect2Combo",
				  routeTemplate: "api/Voucher/LoadAllHousesForSelect2Combo",
				  defaults: new { controller = "Voucher", action = "LoadAllHousesForSelect2Combo" }
				  );
			config.Routes.MapHttpRoute(
				  name: "LoadAllPartnersForSelect2Combo",
				  routeTemplate: "api/Voucher/LoadAllPartnersForSelect2Combo",
				  defaults: new { controller = "Voucher", action = "LoadAllPartnersForSelect2Combo" }
				  );
			config.Routes.MapHttpRoute(
				  name: "Voucher_MultiCurrencyInvoicePayment_GetSafeCurrency",
				  routeTemplate: "api/Voucher/MultiCurrencyInvoicePayment_GetSafeCurrency",
				  defaults: new { controller = "Voucher", action = "MultiCurrencyInvoicePayment_GetSafeCurrency" }
				  );
            config.Routes.MapHttpRoute(
                  name: "Voucher_MultiCurrencyInvoicePayment_GetBankCurrency",
                  routeTemplate: "api/Voucher/MultiCurrencyInvoicePayment_GetBankCurrency",
                  defaults: new { controller = "Voucher", action = "MultiCurrencyInvoicePayment_GetBankCurrency" }
                  );
            config.Routes.MapHttpRoute(
				  name: "Voucher_MultiCurrencyInvoicePayment_GetInvoices",
				  routeTemplate: "api/Voucher/MultiCurrencyInvoicePayment_GetInvoices",
				  defaults: new { controller = "Voucher", action = "MultiCurrencyInvoicePayment_GetInvoices" }
				  );
			config.Routes.MapHttpRoute(
				  name: "Voucher_MultiCurrencyInvoicePayment_GetInvoiceData",
				  routeTemplate: "api/Voucher/MultiCurrencyInvoicePayment_GetInvoiceData",
				  defaults: new { controller = "Voucher", action = "MultiCurrencyInvoicePayment_GetInvoiceData" }
				  );
			config.Routes.MapHttpRoute(
				  name: "Voucher_MultiCurrencyInvoicePayment_Save",
				  routeTemplate: "api/Voucher/MultiCurrencyInvoicePayment_Save",
				  defaults: new { controller = "Voucher", action = "MultiCurrencyInvoicePayment_Save" }
				  );
			config.Routes.MapHttpRoute(
				  name: "Voucher_MultiCurrencyInvoicePayment_CheckCurrencyEvaluation",
				  routeTemplate: "api/Voucher/MultiCurrencyInvoicePayment_CheckCurrencyEvaluation",
				  defaults: new { controller = "Voucher", action = "MultiCurrencyInvoicePayment_CheckCurrencyEvaluation" }
				  );
            config.Routes.MapHttpRoute(
                  name: "CustodyAllocation_Save",
                  routeTemplate: "api/Voucher/CustodyAllocation_Save",
                  defaults: new { controller = "Voucher", action = "CustodyAllocation_Save" }
                  );
            config.Routes.MapHttpRoute(
                  name: "VoucherAllocation_Save",
                  routeTemplate: "api/Voucher/VoucherAllocation_Save",
                  defaults: new { controller = "Voucher", action = "VoucherAllocation_Save" }
                  );
            #endregion VoucherHeader
            #region CombinedIssueVoucher
            config.Routes.MapHttpRoute(
				  name: "RejectPaymentRequestBeforeIssuing",
				  routeTemplate: "api/CombinedIssueVoucher/Reject",
				  defaults: new { controller = "CombinedIssueVoucher", action = "Reject" }
				  );
			config.Routes.MapHttpRoute(
				  name: "SubmitPaymentRequestForIssuing",
				  routeTemplate: "api/CombinedIssueVoucher/Submit",
				  defaults: new { controller = "CombinedIssueVoucher", action = "Submit" }
				  );
			config.Routes.MapHttpRoute(
				  name: "CombinedIssueVoucherGetSafeBalance",
				  routeTemplate: "api/CombinedIssueVoucher/GetSafeBalance",
				  defaults: new { controller = "CombinedIssueVoucher", action = "GetSafeBalance" }
				  );
			config.Routes.MapHttpRoute(
				  name: "CombinedIssueVoucherGetBankBalance",
				  routeTemplate: "api/CombinedIssueVoucher/GetBankBalance",
				  defaults: new { controller = "CombinedIssueVoucher", action = "GetBankBalance" }
				  );
			#endregion
			#region VoucherDetails
			config.Routes.MapHttpRoute(
				name: "VoucherDetails_Save",
				routeTemplate: "api/Voucher/VoucherDetails_Save",
				defaults: new { controller = "Voucher", action = "VoucherDetails_Save" }
				);

			config.Routes.MapHttpRoute(
				name: "VoucherDetails_InsertItems",
				routeTemplate: "api/Voucher/InsertItems",
				defaults: new { controller = "Voucher", action = "InsertItems" }
				);

			config.Routes.MapHttpRoute(
				name: "VoucherDetails_GetInvoiceAccounts",
				routeTemplate: "api/Voucher/GetInvoiceAccounts",
				defaults: new { controller = "Voucher", action = "GetInvoiceAccounts" }
				);


			#endregion VoucherDetails
			#region Voucher InsertOperationsPayment
			config.Routes.MapHttpRoute(
				name: "InsertOperationsPayment",
				routeTemplate: "api/Voucher/InsertOperationsPayment",
				defaults: new { controller = "Voucher", action = "InsertOperationsPayment" }
				);
			config.Routes.MapHttpRoute(
	   name: "GetChargeAccountsList_Expenses",
	   routeTemplate: "api/Voucher/GetChargeAccountsList_Expenses",
	   defaults: new { controller = "Voucher", action = "GetChargeAccountsList_Expenses" }
	   );
			config.Routes.MapHttpRoute(
			name: "GetChargeAccountsList_Revenue",
			routeTemplate: "api/Voucher/GetChargeAccountsList_Revenue",
			defaults: new { controller = "Voucher", action = "GetChargeAccountsList_Revenue" }
			);
			#endregion Voucher InsertOperationsPayment
			#region OperationVehicle
			config.Routes.MapHttpRoute(
				name: "InsertListFromExcel_Vehicle",
				routeTemplate: "api/OperationVehicle/InsertListFromExcel_Vehicle",
				defaults: new { controller = "OperationVehicle", action = "InsertListFromExcel_Vehicle" }
				);
			config.Routes.MapHttpRoute(
				name: "VehicleAction_Save",
				routeTemplate: "api/OperationVehicle/VehicleAction_Save",
				defaults: new { controller = "OperationVehicle", action = "VehicleAction_Save" }
				);
			config.Routes.MapHttpRoute(
				name: "VehicleActionDetails_Save",
				routeTemplate: "api/OperationVehicle/VehicleActionDetails_Save",
				defaults: new { controller = "OperationVehicle", action = "VehicleActionDetails_Save" }
				);
			config.Routes.MapHttpRoute(
				name: "VehicleDetails_Save",
				routeTemplate: "api/OperationVehicle/VehicleDetails_Save",
				defaults: new { controller = "OperationVehicle", action = "VehicleDetails_Save" }
				);
			#endregion OperationVehicle
			#region Allocation With Voucher

			config.Routes.MapHttpRoute(
					name: "LoadVoucher",
					routeTemplate: "api/A_ARAllocationWithVoucher/LoadVoucher",
					defaults: new { controller = "A_ARAllocationWithVoucher", action = "LoadVoucher" }
					);

			config.Routes.MapHttpRoute(
		name: "LoadInvoices",
		routeTemplate: "api/A_ARAllocationWithVoucher/LoadInvoices",
		defaults: new { controller = "A_ARAllocationWithVoucher", action = "LoadInvoices" }
		);

			config.Routes.MapHttpRoute(
				   name: "LoadVoucherA_APAllocationWithVoucher",
				   routeTemplate: "api/A_APAllocationWithVoucher/LoadVoucher",
				   defaults: new { controller = "A_APAllocationWithVoucher", action = "LoadVoucher" }
				   );

			config.Routes.MapHttpRoute(
		name: "LoadInvoicesA_APAllocationWithVoucher",
		routeTemplate: "api/A_APAllocationWithVoucher/LoadInvoices",
		defaults: new { controller = "A_APAllocationWithVoucher", action = "LoadInvoices" }
		);
			#endregion

			#region OperationTracking
			config.Routes.MapHttpRoute(
				name: "OperationTrackingSendAlarm",
				routeTemplate: "api/OperationTracking/SendAlarm",
				defaults: new { controller = "OperationTracking", action = "SendAlarm" }
			);
			config.Routes.MapHttpRoute(
				name: "OperationTrackingSendAlarmToGroup",
				routeTemplate: "api/OperationTracking/SendAlarmToGroup",
				defaults: new { controller = "OperationTracking", action = "SendAlarmToGroup" }
			);

			#endregion

			#region Delivery
			config.Routes.MapHttpRoute(
				name: "DeliverySave",
				routeTemplate: "api/Delivery/Save",
				defaults: new { controller = "Delivery", action = "Save" }
			);
			config.Routes.MapHttpRoute(
				name: "DeliveryUploadOperationDocuments",
				routeTemplate: "api/Delivery/UploadOperationDocuments",
				defaults: new { controller = "Delivery", action = "UploadOperationDocuments" }
			);
			config.Routes.MapHttpRoute(
				name: "DeliveryLoadDeliveryDocuments",
				routeTemplate: "api/Delivery/LoadDeliveryDocuments",
				defaults: new { controller = "Delivery", action = "LoadDeliveryDocuments" }
			);
			config.Routes.MapHttpRoute(
				name: "DeliveryDeleteList",
				routeTemplate: "api/Delivery/DeleteList",
				defaults: new { controller = "Delivery", action = "DeleteList" }
			);
			config.Routes.MapHttpRoute(
				name: "DeliveryLoadLists",
				routeTemplate: "api/Delivery/LoadLists",
				defaults: new { controller = "Delivery", action = "LoadLists" }
			);

			config.Routes.MapHttpRoute(
				name: "DeliveryUploadTruckingOrderDocuments",
				routeTemplate: "api/Delivery/UploadTruckingOrderDocuments",
				defaults: new { controller = "Delivery", action = "UploadTruckingOrderDocuments" }
			);
			config.Routes.MapHttpRoute(
				name: "Delivery_DeleteImage",
				routeTemplate: "api/Delivery/Delivery_DeleteImage",
				defaults: new { controller = "Delivery", action = "Delivery_DeleteImage" }
			);
			config.Routes.MapHttpRoute(
			   name: "Trucking_DeleteImage",
			   routeTemplate: "api/Delivery/Trucking_DeleteImage",
			   defaults: new { controller = "Delivery", action = "Trucking_DeleteImage" }
		   );


			#endregion

			#region Voucher InsertA_VoucherInvoicesPayment
			config.Routes.MapHttpRoute(
				name: "InsertA_VoucherInvoicesPayment",
				routeTemplate: "api/Voucher/InsertA_VoucherInvoicesPayment",
				defaults: new { controller = "Voucher", action = "InsertA_VoucherInvoicesPayment" }
				);
			config.Routes.MapHttpRoute(
			name: "InsertA_VoucherPayableAllocationPayment",
			routeTemplate: "api/Voucher/InsertA_VoucherPayableAllocationPayment",
			defaults: new { controller = "Voucher", action = "InsertA_VoucherPayableAllocationPayment" }
			);
			config.Routes.MapHttpRoute(
			 name: "InsertA_VoucherPayableClientPayment",
			 routeTemplate: "api/Voucher/InsertA_VoucherPayableClientPayment",
			 defaults: new { controller = "Voucher", action = "InsertA_VoucherPayableClientPayment" }
			 );
			config.Routes.MapHttpRoute(
			name: "A_voucherSetPostField",
			routeTemplate: "api/Voucher/SetPostField",
			defaults: new { controller = "Voucher", action = "SetPostField" }
			);
			config.Routes.MapHttpRoute(
			name: "A_voucherSetPostFieldTax",
			routeTemplate: "api/Voucher/SetPostFieldTax",
			defaults: new { controller = "Voucher", action = "SetPostFieldTax" }
			);

			config.Routes.MapHttpRoute(
				name: "A_voucherGetPrintedData",
				routeTemplate: "api/Voucher/GetPrintedData",
				defaults: new { controller = "Voucher", action = "GetPrintedData" }
				);



			config.Routes.MapHttpRoute(
			 name: "A_JVSetPostField",
			routeTemplate: "api/JournalVouchers/SetPostField",
			defaults: new { controller = "JournalVouchers", action = "SetPostField" }
			);
			config.Routes.MapHttpRoute(
			name: "A_JVSetPostFieldTax",
			routeTemplate: "api/JournalVouchers/SetPostFieldTax",
			defaults: new { controller = "JournalVouchers", action = "SetPostFieldTax" }
			);

			config.Routes.MapHttpRoute(
					name: "A_JVGetJVsDataPrinting",
					routeTemplate: "api/JournalVouchers/GetJVsDataPrinting",
					defaults: new { controller = "JournalVouchers", action = "GetJVsDataPrinting" }
					);

			config.Routes.MapHttpRoute(
					name: "A_JVGetDynamicExportData",
					routeTemplate: "api/JournalVouchers/GetDynamicExportData",
					defaults: new { controller = "JournalVouchers", action = "GetDynamicExportData" }
					);

            config.Routes.MapHttpRoute(
                    name: "GetChargeAccountsList",
                    routeTemplate: "api/JournalVouchers/GetChargeAccountsList",
                    defaults: new { controller = "JournalVouchers", action = "GetChargeAccountsList" }
                    );


            config.Routes.MapHttpRoute(
                    name: "JournalVoucherSave",
                    routeTemplate: "api/JournalVouchers/Save",
                    defaults: new { controller = "JournalVouchers", action = "Save" }
                    );

            


            #endregion InsertA_VoucherInvoicesPayment
            #region 
            config.Routes.MapHttpRoute(
			   name: "A_ARAllocationvwAccPartnerBalanceUnapproving_LoadWithWhereClause",
			   routeTemplate: "api/A_ARAllocation/vwAccPartnerBalanceUnapproving_LoadWithWhereClause",
			   defaults: new { controller = "A_ARAllocation", action = "vwAccPartnerBalanceUnapproving_LoadWithWhereClause" }
			   );
			config.Routes.MapHttpRoute(
			   name: "A_ARAllocationvwA_PayableAllocation_Unapproving_LoadWithWhereClause",
			   routeTemplate: "api/A_ARAllocation/vwA_PayableAllocation_Unapproving_LoadWithWhereClause",
			   defaults: new { controller = "A_ARAllocation", action = "vwA_PayableAllocation_Unapproving_LoadWithWhereClause" }
			   );
			#endregion
			#region DeleteVoucher
			config.Routes.MapHttpRoute(
				name: "VoucherDeleteCashVoucher",
				routeTemplate: "api/Voucher/DeleteCashVoucher",
				defaults: new { controller = "Voucher", action = "DeleteCashVoucher" }
			);
			config.Routes.MapHttpRoute(
			  name: "VoucherDelete",
			  routeTemplate: "api/Voucher/Delete",
			  defaults: new { controller = "Voucher", action = "Delete" }
		  );
			#endregion
			#region DeleteApprovePaymentRequest
			config.Routes.MapHttpRoute(
				name: "PaymentRequestGetOperationData",
				routeTemplate: "api/PaymentRequest/GetOperationData",
				defaults: new { controller = "PaymentRequest", action = "GetOperationData" }
			);
			config.Routes.MapHttpRoute(
				name: "PaymentRequestLoad",
				routeTemplate: "api/PaymentRequest/LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned",
				defaults: new { controller = "PaymentRequest", action = "LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned" }
			);
			config.Routes.MapHttpRoute(
				name: "PaymentRequestLoadDetails",
				routeTemplate: "api/PaymentRequest/LoadDetails",
				defaults: new { controller = "PaymentRequest", action = "LoadDetails" }
			);
			config.Routes.MapHttpRoute(
				name: "PaymentRequestApprove",
				routeTemplate: "api/PaymentRequest/Approve",
				defaults: new { controller = "PaymentRequest", action = "Approve" }
			);
			config.Routes.MapHttpRoute(
				name: "PaymentRequestMultiLevelApproval",
				routeTemplate: "api/PaymentRequest/MultiLevelApproval",
				defaults: new { controller = "PaymentRequest", action = "MultiLevelApproval" }
			);
			config.Routes.MapHttpRoute(
				name: "PaymentRequestUpdateRedirect",
				routeTemplate: "api/PaymentRequest/UpdateRedirect",
				defaults: new { controller = "PaymentRequest", action = "UpdateRedirect" }
			 );
			config.Routes.MapHttpRoute(
			  name: "PaymentRequestGetBankAndSafeByCurrency",
			  routeTemplate: "api/PaymentRequest/GetBankAndSafeByCurrency",
			  defaults: new { controller = "PaymentRequest", action = "GetBankAndSafeByCurrency" }
		   );
			config.Routes.MapHttpRoute(
				name: "PaymentRequestUnApprove",
				routeTemplate: "api/PaymentRequest/UnApprove",
				defaults: new { controller = "PaymentRequest", action = "UnApprove" }
			);
			config.Routes.MapHttpRoute(
			  name: "PaymentRequestDelete",
			  routeTemplate: "api/PaymentRequest/Delete",
			  defaults: new { controller = "PaymentRequest", action = "Delete" }
		  );
			config.Routes.MapHttpRoute(
						  name: "PaymentRequestGetChargeTypes",
						  routeTemplate: "api/PaymentRequest/GetChargeTypes",
						  defaults: new { controller = "PaymentRequest", action = "GetChargeTypes" }
					  );

			config.Routes.MapHttpRoute(
						  name: "PaymentRequestGetInitialValue",
						  routeTemplate: "api/PaymentRequest/GetInitialValue",
						  defaults: new { controller = "PaymentRequest", action = "GetInitialValue" }
					  );

			config.Routes.MapHttpRoute(
					name: "PaymentRequestGetUserIDFromCustudy",
					routeTemplate: "api/PaymentRequest/GetUserIDFromCustudy",
					defaults: new { controller = "PaymentRequest", action = "GetUserIDFromCustudy" }
				);

			config.Routes.MapHttpRoute(
				   name: "PaymentRequestGetCustudy",
				   routeTemplate: "api/PaymentRequest/GetCustudy",
				   defaults: new { controller = "PaymentRequest", action = "GetCustudy" }
				);
			config.Routes.MapHttpRoute(
				  name: "PaymentRequestGetIssuedToBySupplier",
				  routeTemplate: "api/PaymentRequest/GetIssuedToBySupplier",
				  defaults: new { controller = "PaymentRequest", action = "GetIssuedToBySupplier" }
			   );
			config.Routes.MapHttpRoute(
				 name: "PaymentRequestSave",
				 routeTemplate: "api/PaymentRequest/Save",
				 defaults: new { controller = "PaymentRequest", action = "Save" }
			  );
			config.Routes.MapHttpRoute(
				name: "PaymentRequestGetRequiredOperations",
				routeTemplate: "api/PaymentRequest/GetRequiredOperations",
				defaults: new { controller = "PaymentRequest", action = "GetRequiredOperations" }
			);
			config.Routes.MapHttpRoute(
				name: "PaymentRequestSplit",
				routeTemplate: "api/PaymentRequest/Split",
				defaults: new { controller = "PaymentRequest", action = "Split" }
			);
			config.Routes.MapHttpRoute(
				name: "PaymentRequestGetOperationPayables",
				routeTemplate: "api/PaymentRequest/GetOperationPayables",
				defaults: new { controller = "PaymentRequest", action = "GetOperationPayables" }
			);
			config.Routes.MapHttpRoute(
				name: "PaymentRequestUpdatePartnerAccounts",
				routeTemplate: "api/PaymentRequest/UpdatePartnerAccounts",
				defaults: new { controller = "PaymentRequest", action = "UpdatePartnerAccounts" }
			);
			config.Routes.MapHttpRoute(
				name: "PaymentRequestCheckIfUserCanRedirect",
				routeTemplate: "api/PaymentRequest/CheckIfUserCanRedirect",
				defaults: new { controller = "PaymentRequest", action = "CheckIfUserCanRedirect" }
			);
			config.Routes.MapHttpRoute(
				name: "PaymentRequestGetContainerHousesAndPayables",
				routeTemplate: "api/PaymentRequest/GetContainerHousesAndPayables",
				defaults: new { controller = "PaymentRequest", action = "GetContainerHousesAndPayables" }
			);
			config.Routes.MapHttpRoute(
				name: "PaymentRequestGetHouseContainersAndPayables",
				routeTemplate: "api/PaymentRequest/GetHouseContainersAndPayables",
				defaults: new { controller = "PaymentRequest", action = "GetHouseContainersAndPayables" }
			);

            config.Routes.MapHttpRoute(
                name: "GenerateDebitNote_ForPaymentRequest",
                routeTemplate: "api/PaymentRequest/GenerateDebitNote_ForPaymentRequest",
                defaults: new { controller = "PaymentRequest", action = "GenerateDebitNote_ForPaymentRequest" }
            );

            config.Routes.MapHttpRoute(
				name: "ExchangeMovement_Save",
				routeTemplate: "api/ExchangeMovement/ExchangeMovement_Save",
				defaults: new { controller = "ExchangeMovement", action = "ExchangeMovement_Save" }
			);
			#endregion
			#region Security
			config.Routes.MapHttpRoute(
				name: "SecurityModulesLoadAll",
				routeTemplate: "api/Security/Modules_LoadAll",
				defaults: new { controller = "Security", action = "Modules_LoadAll" }
			);
			#endregion
			#region NoAccessDepartments
			config.Routes.MapHttpRoute(
				name: "NoAccessDepartments_Save",
				routeTemplate: "api/NoAccessDepartments/Save",
				defaults: new { controller = "NoAccessDepartments", action = "Save" }
			);
			config.Routes.MapHttpRoute(
				name: "DepartmentCharge_Save",
				routeTemplate: "api/NoAccessDepartments/DepartmentCharge_Save",
				defaults: new { controller = "NoAccessDepartments", action = "DepartmentCharge_Save" }
			);
			#endregion NoAccessDepartments

			#region Warehousing
			config.Routes.MapHttpRoute(
				name: "RowLocation_DeleteList",
				routeTemplate: "api/Row/RowLocation_DeleteList",
				defaults: new { controller = "Row", action = "RowLocation_DeleteList" }
				);
			config.Routes.MapHttpRoute(
				name: "RowLocation_ImportFromExcel",
				routeTemplate: "api/Row/RowLocation_ImportFromExcel",
				defaults: new { controller = "Row", action = "RowLocation_ImportFromExcel" }
				); config.Routes.MapHttpRoute(
				name: "RowLocation_UploadFromExcel",
				routeTemplate: "api/Row/RowLocation_UploadFromExcel",
				defaults: new { controller = "Row", action = "RowLocation_UploadFromExcel" }
				);
			config.Routes.MapHttpRoute(
			   name: "ReceiveDetails_Save",
			   routeTemplate: "api/Receive/ReceiveDetails_Save",
			   defaults: new { controller = "Receive", action = "ReceiveDetails_Save" }
			   );
			config.Routes.MapHttpRoute(
			   name: "Receive_UpdateDetails",
			   routeTemplate: "api/Receive/UpdateDetails",
			   defaults: new { controller = "Receive", action = "UpdateDetails" }
			   );
			config.Routes.MapHttpRoute(
		   name: "Receive_ValidatePallet",
		   routeTemplate: "api/Receive/ValidatePallet",
		   defaults: new { controller = "Receive", action = "ValidatePallet" }
		   );
			config.Routes.MapHttpRoute(
				name: "ReceiveDetailsSerial_Save",
				routeTemplate: "api/Receive/ReceiveDetailsSerial_Save",
				defaults: new { controller = "Receive", action = "ReceiveDetailsSerial_Save" }
				);
			config.Routes.MapHttpRoute(
				name: "ReceiveDetailsSerial_DeleteList",
				routeTemplate: "api/Receive/ReceiveDetailsSerial_DeleteList",
				defaults: new { controller = "Receive", action = "ReceiveDetailsSerial_DeleteList" }
				);
			config.Routes.MapHttpRoute(
				name: "ReceiveDetailsSerial_LoadAll",
				routeTemplate: "api/Receive/ReceiveDetailsSerial_LoadAll",
				defaults: new { controller = "Receive", action = "ReceiveDetailsSerial_LoadAll" }
				);
			config.Routes.MapHttpRoute(
				name: "ReceiveDetailsSerial_SaveFromPickup",
				routeTemplate: "api/Receive/ReceiveDetailsSerial_SaveFromPickup",
				defaults: new { controller = "Receive", action = "ReceiveDetailsSerial_SaveFromPickup" }
				);
			config.Routes.MapHttpRoute(
				name: "ReceiveDetailsSerial_DeleteFromPickup",
				routeTemplate: "api/Receive/ReceiveDetailsSerial_DeleteFromPickup",
				defaults: new { controller = "Receive", action = "ReceiveDetailsSerial_DeleteFromPickup" }
				);
			config.Routes.MapHttpRoute(
				name: "ReceiveDetails_ImportFromExcel",
				routeTemplate: "api/Receive/ReceiveDetails_ImportFromExcel",
				defaults: new { controller = "Receive", action = "ReceiveDetails_ImportFromExcel" }
				);
			config.Routes.MapHttpRoute(
				name: "ReceiveDetails_UploadExcel",
				routeTemplate: "api/Receive/UploadExcel",
				defaults: new { controller = "Receive", action = "UploadExcel" }
				);

			config.Routes.MapHttpRoute(
				name: "ReceiveDetails_Delete",
				routeTemplate: "api/Receive/ReceiveDetails_Delete",
				defaults: new { controller = "Receive", action = "ReceiveDetails_Delete" }
				);
			config.Routes.MapHttpRoute(
				name: "WH_TransServices_LoadTransServices",
				routeTemplate: "api/WH_TransServices/LoadTransServices",
				defaults: new { controller = "WH_TransServices", action = "LoadTransServices" }
				);
			config.Routes.MapHttpRoute(
				name: "WH_TransServices_LoadOrders",
				routeTemplate: "api/WH_TransServices/LoadOrders",
				defaults: new { controller = "WH_TransServices", action = "LoadOrders" }
				);
			config.Routes.MapHttpRoute(
				name: "GeneratePickupFromReceive",
				routeTemplate: "api/Receive/GeneratePickup",
				defaults: new { controller = "Receive", action = "GeneratePickup" }
				);
			config.Routes.MapHttpRoute(
				name: "Receive_Save",
				routeTemplate: "api/Receive/Save",
				defaults: new { controller = "Receive", action = "Save" }
				);
			config.Routes.MapHttpRoute(
				name: "Receive_LoadHeaderWithDetails",
				routeTemplate: "api/Receive/LoadHeaderWithDetails",
				defaults: new { controller = "Receive", action = "LoadHeaderWithDetails" }
				);
			
			config.Routes.MapHttpRoute(
	   name: "WH_InboundDetails_Save",
	   routeTemplate: "api/WH_Inbound/ReceiveDetails_Save",
	   defaults: new { controller = "WH_Inbound", action = "ReceiveDetails_Save" }
	   );
			config.Routes.MapHttpRoute(
			   name: "WH_Inbound_UpdateDetails",
			   routeTemplate: "api/WH_Inbound/UpdateDetails",
			   defaults: new { controller = "WH_Inbound", action = "UpdateDetails" }
			   );
			config.Routes.MapHttpRoute(
		   name: "WH_Inbound_ValidatePallet",
		   routeTemplate: "api/WH_Inbound/ValidatePallet",
		   defaults: new { controller = "WH_Inbound", action = "ValidatePallet" }
		   );
			config.Routes.MapHttpRoute(
				name: "WH_InboundDetailsSerial_Save",
				routeTemplate: "api/WH_Inbound/ReceiveDetailsSerial_Save",
				defaults: new { controller = "WH_Inbound", action = "ReceiveDetailsSerial_Save" }
				);
			config.Routes.MapHttpRoute(
				name: "WH_InboundDetailsSerial_DeleteList",
				routeTemplate: "api/WH_Inbound/ReceiveDetailsSerial_DeleteList",
				defaults: new { controller = "WH_Inbound", action = "ReceiveDetailsSerial_DeleteList" }
				);
			config.Routes.MapHttpRoute(
				name: "WH_InboundDetailsSerial_LoadAll",
				routeTemplate: "api/WH_Inbound/ReceiveDetailsSerial_LoadAll",
				defaults: new { controller = "WH_Inbound", action = "ReceiveDetailsSerial_LoadAll" }
				);
			config.Routes.MapHttpRoute(
				name: "WH_InboundDetailsSerial_SaveFromPickup",
				routeTemplate: "api/WH_Inbound/ReceiveDetailsSerial_SaveFromPickup",
				defaults: new { controller = "WH_Inbound", action = "ReceiveDetailsSerial_SaveFromPickup" }
				);
			config.Routes.MapHttpRoute(
				name: "WH_InboundDetailsSerial_DeleteFromPickup",
				routeTemplate: "api/WH_Inbound/ReceiveDetailsSerial_DeleteFromPickup",
				defaults: new { controller = "WH_Inbound", action = "ReceiveDetailsSerial_DeleteFromPickup" }
				);
			config.Routes.MapHttpRoute(
				name: "WH_InboundDetails_ImportFromExcel",
				routeTemplate: "api/WH_Inbound/ReceiveDetails_ImportFromExcel",
				defaults: new { controller = "WH_Inbound", action = "ReceiveDetails_ImportFromExcel" }
				);
			config.Routes.MapHttpRoute(
				name: "WH_InboundDetails_UploadExcel",
				routeTemplate: "api/WH_Inbound/UploadExcel",
				defaults: new { controller = "WH_Inbound", action = "UploadExcel" }
				);

			config.Routes.MapHttpRoute(
				name: "WH_InboundDetails_Delete",
				routeTemplate: "api/WH_Inbound/ReceiveDetails_Delete",
				defaults: new { controller = "WH_Inbound", action = "ReceiveDetails_Delete" }
				);
			config.Routes.MapHttpRoute(
				name: "WH_InboundGeneratePickupFromReceive",
				routeTemplate: "api/WH_Inbound/GeneratePickup",
				defaults: new { controller = "WH_Inbound", action = "GeneratePickup" }
				);
			config.Routes.MapHttpRoute(
				name: "WH_Inbound_Save",
				routeTemplate: "api/WH_Inbound/Save",
				defaults: new { controller = "WH_Inbound", action = "Save" }
				);
			config.Routes.MapHttpRoute(
				name: "WH_Inbound_LoadHeaderWithDetails",
				routeTemplate: "api/WH_Inbound/LoadHeaderWithDetails",
				defaults: new { controller = "WH_Inbound", action = "LoadHeaderWithDetails" }
				);
			config.Routes.MapHttpRoute(
				name: "WH_Inbound_LoadDetailsWithPaging",
				routeTemplate: "api/WH_Inbound/LoadDetailsWithPaging",
				defaults: new { controller = "WH_Inbound", action = "LoadDetailsWithPaging" }
				);
			config.Routes.MapHttpRoute(
				name: "WH_Inbound_HasMissingQty",
				routeTemplate: "api/WH_Inbound/HasMissingQty",
				defaults: new { controller = "WH_Inbound", action = "HasMissingQty" }
				);
			config.Routes.MapHttpRoute(
name: "WH_Inbound_UpdateOrders",
routeTemplate: "api/WH_Inbound/UpdateOrders",
defaults: new { controller = "WH_Inbound", action = "UpdateOrders" }
);
			config.Routes.MapHttpRoute(
			name: "WH_Inbound_FinalizeDetails",
			routeTemplate: "api/WH_Inbound/FinalizeDetails",
			defaults: new { controller = "WH_Inbound", action = "FinalizeDetails" }
			);
			config.Routes.MapHttpRoute(
		name: "WH_Inbound_UploadExcelFile_Stock",
		routeTemplate: "api/WH_Inbound/UploadExcelFile_Stock",
		defaults: new { controller = "WH_Inbound", action = "UploadExcelFile_Stock" }
		);
			config.Routes.MapHttpRoute(
		name: "WH_QualityActions_Save",
		routeTemplate: "api/WH_QualityActions/Save",
		defaults: new { controller = "WH_QualityActions", action = "Save" }
		);
			config.Routes.MapHttpRoute(
		name: "WH_QualityActions_UpdateItem",
		routeTemplate: "api/WH_QualityActions/UpdateItem",
		defaults: new { controller = "WH_QualityActions", action = "UpdateItem" }
		);
			config.Routes.MapHttpRoute(
			name: "PickupDetails_UploadExcel",
			routeTemplate: "api/Pickup/UploadExcel",
			defaults: new { controller = "Pickup", action = "UploadExcel" }
			);
			config.Routes.MapHttpRoute(
				name: "ReceiveDetailsSerial",
				routeTemplate: "api/Pickup/ReceiveDetailsSerial",
				defaults: new { controller = "Pickup", action = "ReceiveDetailsSerial" }
				);
			config.Routes.MapHttpRoute(
			 name: "Pickup_Save",
			 routeTemplate: "api/Pickup/Save",
			 defaults: new { controller = "Pickup", action = "Save" }
			 );
			config.Routes.MapHttpRoute(
				name: "PickupDetails_Save",
				routeTemplate: "api/Pickup/PickupDetails_Save",
				defaults: new { controller = "Pickup", action = "PickupDetails_Save" }
				);
			config.Routes.MapHttpRoute(
				name: "PickupDetailsSerial_Save",
				routeTemplate: "api/Pickup/PickupDetailsSerial_Save",
				defaults: new { controller = "Pickup", action = "PickupDetailsSerial_Save" }
				);

			config.Routes.MapHttpRoute(
				name: "PickupDetails_ImportFromExcel",
				routeTemplate: "api/Pickup/PickupDetails_ImportFromExcel",
				defaults: new { controller = "Pickup", action = "PickupDetails_ImportFromExcel" }
				);
			config.Routes.MapHttpRoute(
				name: "Pickup_Print",
				routeTemplate: "api/Pickup/Print",
				defaults: new { controller = "Pickup", action = "Print" }
				);

			config.Routes.MapHttpRoute(
	name: "WH_Outbound_PickOrders",
	routeTemplate: "api/WH_Outbound/PickOrders",
	defaults: new { controller = "WH_Outbound", action = "PickOrders" }
	);
			config.Routes.MapHttpRoute(
	name: "WH_Outbound_UploadExcelFile_Pickup",
	routeTemplate: "api/WH_Outbound/UploadExcelFile_Pickup",
	defaults: new { controller = "WH_Outbound", action = "UploadExcelFile_Pickup" }
	);
			config.Routes.MapHttpRoute(
		name: "WH_OutboundDetails_UploadExcel",
		routeTemplate: "api/WH_Outbound/UploadExcel",
		defaults: new { controller = "WH_Outbound", action = "UploadExcel" }
		);
			config.Routes.MapHttpRoute(
				name: "WH_OutboundDetailsSerial",
				routeTemplate: "api/WH_Outbound/ReceiveDetailsSerial",
				defaults: new { controller = "WH_Outbound", action = "ReceiveDetailsSerial" }
				);
			config.Routes.MapHttpRoute(
			 name: "WH_Outbound_Save",
			 routeTemplate: "api/WH_Outbound/Save",
			 defaults: new { controller = "WH_Outbound", action = "Save" }
			 );
			config.Routes.MapHttpRoute(
				name: "WH_OutboundDetails_Save",
				routeTemplate: "api/WH_Outbound/PickupDetails_Save",
				defaults: new { controller = "WH_Outbound", action = "PickupDetails_Save" }
				);
			config.Routes.MapHttpRoute(
				name: "WH_OutboundDetailsSerial_Save",
				routeTemplate: "api/WH_Outbound/PickupDetailsSerial_Save",
				defaults: new { controller = "WH_Outbound", action = "PickupDetailsSerial_Save" }
				);

			config.Routes.MapHttpRoute(
				name: "WH_OutboundDetails_ImportFromExcel",
				routeTemplate: "api/WH_Outbound/PickupDetails_ImportFromExcel",
				defaults: new { controller = "WH_Outbound", action = "PickupDetails_ImportFromExcel" }
				);

			config.Routes.MapHttpRoute(
				name: "WH_Outbound_Relocate",
				routeTemplate: "api/WH_Outbound/Relocate",
				defaults: new { controller = "WH_Outbound", action = "Relocate" }
				);
			config.Routes.MapHttpRoute(
				name: "WH_Outbound_Relocate_Save",
				routeTemplate: "api/WH_Outbound/Relocate_Save",
				defaults: new { controller = "WH_Outbound", action = "Relocate_Save" }
				);
			config.Routes.MapHttpRoute(
			name: "WH_Outbound_PickupDetails_GetAvailablePurchaseItemsForCustomer",
			routeTemplate: "api/WH_Outbound/PickupDetails_GetAvailablePurchaseItemsForCustomer",
			defaults: new { controller = "WH_Outbound", action = "PickupDetails_GetAvailablePurchaseItemsForCustomer" }
			);
			config.Routes.MapHttpRoute(
			name: "WH_Adjustment_LoadPallets",
			routeTemplate: "api/WH_Adjustment/LoadPallets",
			defaults: new { controller = "WH_Adjustment", action = "LoadPallets" }
			);
			config.Routes.MapHttpRoute(
			name: "WH_Adjustment_LoadPalletItems",
			routeTemplate: "api/WH_Adjustment/LoadPalletItems",
			defaults: new { controller = "WH_Adjustment", action = "LoadPalletItems" }
			);
	
			config.Routes.MapHttpRoute(
				name: "ReserveSaveItem",
				routeTemplate: "api/Reserve/ReserveDetails_Save",
				defaults: new { controller = "Reserve", action = "ReserveDetails_Save" }
				);
			config.Routes.MapHttpRoute(
				name: "ReserveDetailsSerial_Save",
				routeTemplate: "api/Reserve/ReserveDetailsSerial_Save",
				defaults: new { controller = "Reserve", action = "ReserveDetailsSerial_Save" }
				);
			config.Routes.MapHttpRoute(
				name: "ReserveUploadExcel",
				routeTemplate: "api/Reserve/UploadExcel",
				defaults: new { controller = "Reserve", action = "UploadExcel" }
				);
			config.Routes.MapHttpRoute(
				name: "FullReservationInitialize",
				routeTemplate: "api/Reserve/FullReservationInitialize",
				defaults: new { controller = "Reserve", action = "FullReservationInitialize" }
				);

			#region ProductReallocation
			config.Routes.MapHttpRoute(
				name: "ProductReallocationConfirmMovement",
				routeTemplate: "api/ProductReallocation/ConfirmMovement",
				defaults: new { controller = "ProductReallocation", action = "ConfirmMovement" }
				);
			config.Routes.MapHttpRoute(
				name: "ProductReallocationUpdateComboBoxes",
				routeTemplate: "api/ProductReallocation/UpdateComboBoxes",
				defaults: new { controller = "ProductReallocation", action = "UpdateComboBoxes" }
				);
			#endregion

			config.Routes.MapHttpRoute(
				name: "TransferProducts_ImportFromExcel",
				routeTemplate: "api/TransferProducts/TransferProducts_ImportFromExcel",
				defaults: new { controller = "TransferProducts", action = "TransferProducts_ImportFromExcel" }
				);

			config.Routes.MapHttpRoute(
				name: "AreaLocationsChart_LoadData",
				routeTemplate: "api/AreaLocationsChart/LoadData",
				defaults: new { controller = "AreaLocationsChart", action = "LoadData" }
				);
			config.Routes.MapHttpRoute(
				name: "AreaLocationsChart_GetAreaFromWarehouse",
				routeTemplate: "api/AreaLocationsChart/GetAreaFromWarehouse",
				defaults: new { controller = "AreaLocationsChart", action = "GetAreaFromWarehouse" }
				);
			config.Routes.MapHttpRoute(
				name: "ReceiveFinalizeOrUnfinalize",
				routeTemplate: "api/Warehousing/Finalize/FinalizeOrUnfinalize",
				defaults: new { controller = "Finalize", action = "FinalizeOrUnfinalize" }
				);
			config.Routes.MapHttpRoute(
				name: "GetIDsHavingDocsIn",
				routeTemplate: "api/_3PLStatistics/GetIDsHavingDocsIn",
				defaults: new { controller = "_3PLStatistics", action = "GetIDsHavingDocsIn" }
				);
			config.Routes.MapHttpRoute(
name: "_3PLStatistics_LoadInitialData",
routeTemplate: "api/_3PLStatistics/LoadInitialData",
defaults: new { controller = "_3PLStatistics", action = "LoadInitialData" }
);
			config.Routes.MapHttpRoute(
		name: "_3PLStatistics_GetPrintData",
		routeTemplate: "api/_3PLStatistics/GetPrintData",
		defaults: new { controller = "_3PLStatistics", action = "GetPrintData" }
		);
			config.Routes.MapHttpRoute(
		name: "_3PLStatistics_LoadItemsLog",
		routeTemplate: "api/_3PLStatistics/LoadItemsLog",
		defaults: new { controller = "_3PLStatistics", action = "LoadItemsLog" }
		);
			config.Routes.MapHttpRoute(
		name: "_3PLStatistics_LoadItemInquiries",
		routeTemplate: "api/_3PLStatistics/LoadItemInquiries",
		defaults: new { controller = "_3PLStatistics", action = "LoadItemInquiries" }
		);
			config.Routes.MapHttpRoute(
	name: "_3PLStatistics_UploadExcelFile_Defected",
	routeTemplate: "api/_3PLStatistics/UploadExcelFile_Defected",
	defaults: new { controller = "_3PLStatistics", action = "UploadExcelFile_Defected" }
	);
			#endregion Warehousing
			#region CRM By Mostafa Hany
			config.Routes.MapHttpRoute(
					name: "CRM_ClientsFillInputPort",
					routeTemplate: "api/CRM_Clients/FillInputPort",
					defaults: new { controller = "CRM_Clients", action = "FillInputPort" }
				);


			config.Routes.MapHttpRoute(
				  name: "SC_ReportsFillFilter",
				  routeTemplate: "api/SC_Reports/FillFilter",
				  defaults: new { controller = "SC_Reports", action = "FillFilter" }
			  );

			config.Routes.MapHttpRoute(
				name: "IntializeDataSC_DepartmentReturnsVoucher",
				routeTemplate: "api/SC_Transactions/IntializeData",
				defaults: new { controller = "SC_Transactions", action = "IntializeData" }
			);

			config.Routes.MapHttpRoute(
			  name: "LoadItemsSC_DepartmentReturnsVoucher",
			  routeTemplate: "api/SC_Transactions/LoadItems",
			  defaults: new { controller = "SC_Transactions", action = "LoadItems" }
		  );



			config.Routes.MapHttpRoute(
				  name: "CRM_ClientsIntializeData",
				  routeTemplate: "api/CRM_Clients/IntializeData",
				  defaults: new { controller = "CRM_Clients", action = "IntializeData" }
			  );

			config.Routes.MapHttpRoute(
			  name: "CRM_ClientsLoadModalData",
			  routeTemplate: "api/CRM_Clients/LoadModalData",
			  defaults: new { controller = "CRM_Clients", action = "LoadModalData" }
		  );
			config.Routes.MapHttpRoute(
				  name: "CRM_ClientsGetDetailsWithPercent",
				  routeTemplate: "api/CRM_Clients/GetDetailsWithPercent",
				  defaults: new { controller = "CRM_Clients", action = "GetDetailsWithPercent" }
			  );
			config.Routes.MapHttpRoute(
				  name: "CRM_ClientshideWithCustomers",
				  routeTemplate: "api/CRM_Clients/hideWithCustomers",
				  defaults: new { controller = "CRM_Clients", action = "hideWithCustomers" }
			  );
			config.Routes.MapHttpRoute(
				name: "CRM_ClientsComplaint_FillModal",
				routeTemplate: "api/CRM_Clients/Complaint_FillModal",
				defaults: new { controller = "CRM_Clients", action = "Complaint_FillModal" }
			);
			config.Routes.MapHttpRoute(
				name: "CRM_ClientsComplaintDetailsResponses_FillModal",
				routeTemplate: "api/CRM_Clients/ComplaintDetailsResponses_FillModal",
				defaults: new { controller = "CRM_Clients", action = "ComplaintDetailsResponses_FillModal" }
			);
			config.Routes.MapHttpRoute(
			   name: "CRM_ClientsComplaintDetails_FillModal",
			   routeTemplate: "api/CRM_Clients/ComplaintDetails_FillModal",
			   defaults: new { controller = "CRM_Clients", action = "ComplaintDetails_FillModal" }
		   );
			config.Routes.MapHttpRoute(
				 name: "CRM_ClientsComplaint_Delete",
				 routeTemplate: "api/CRM_Clients/Complaint_Delete",
				 defaults: new { controller = "CRM_Clients", action = "Complaint_Delete" }
			 );
			config.Routes.MapHttpRoute(
				 name: "CRM_ClientsComplaintDetails_Delete",
				 routeTemplate: "api/CRM_Clients/ComplaintDetails_Delete",
				 defaults: new { controller = "CRM_Clients", action = "ComplaintDetails_Delete" }
			 );
			config.Routes.MapHttpRoute(
				name: "CRM_ClientsComplaintDetailsResponses_Delete",
				routeTemplate: "api/CRM_Clients/ComplaintDetailsResponses_Delete",
				defaults: new { controller = "CRM_Clients", action = "ComplaintDetailsResponses_Delete" }
			);

			config.Routes.MapHttpRoute(
			   name: "CRM_ClientsComplaint_Save",
			   routeTemplate: "api/CRM_Clients/Complaint_Save",
			   defaults: new { controller = "CRM_Clients", action = "Complaint_Save" }
		   );
			config.Routes.MapHttpRoute(
			   name: "CRM_ClientsComplaintDetails_Save",
			   routeTemplate: "api/CRM_Clients/ComplaintDetails_Save",
			   defaults: new { controller = "CRM_Clients", action = "ComplaintDetails_Save" }
		   );
			config.Routes.MapHttpRoute(
			   name: "CRM_ClientsComplaintDetailsResponses_Save",
			   routeTemplate: "api/CRM_Clients/ComplaintDetailsResponses_Save",
			   defaults: new { controller = "CRM_Clients", action = "ComplaintDetailsResponses_Save" }
		   );

			config.Routes.MapHttpRoute(
			   name: "CRM_ClientsGetEquipmentsByActivity",
			   routeTemplate: "api/CRM_Clients/GetEquipmentsByActivity",
			   defaults: new { controller = "CRM_Clients", action = "GetEquipmentsByActivity" }
		   );
			config.Routes.MapHttpRoute(
			   name: "CRM_ClientsSetubSalesLead_Calculate",
			   routeTemplate: "api/CRM_Clients/SetubSalesLead_Calculate",
			   defaults: new { controller = "CRM_Clients", action = "SetubSalesLead_Calculate" }
		   );


			config.Routes.MapHttpRoute(
				 name: "CRM_FollowUpIntializeData",
				 routeTemplate: "api/CRM_FollowUp/IntializeData",
				 defaults: new { controller = "CRM_FollowUp", action = "IntializeData" }
			 );


			config.Routes.MapHttpRoute(
			   name: "CRM_SalesMenTarget",
			   routeTemplate: "api/CRM_SalesMenTarget/LoadActions",
			   defaults: new { controller = "CRM_SalesMenTarget", action = "LoadActions" }
			);
			config.Routes.MapHttpRoute(
			name: "vwCRM_ClientsFollowReport",
			routeTemplate: "api/vwCRM_ClientsFollowReport/LoadFollowUpReport",
			defaults: new { controller = "vwCRM_ClientsFollowReport", action = "LoadFollowUpReport" }
			);
			config.Routes.MapHttpRoute(
			name: "LoadTargetReport",
			routeTemplate: "api/vwCRM_ClientsFollowReport/LoadTargetReport",
			defaults: new { controller = "vwCRM_ClientsFollowReport", action = "LoadTargetReport" }
			);
			#endregion CRM By Mostafa Hany
			#region OperationContainersAndPackages
			config.Routes.MapHttpRoute(
				name: "getEirSerial",
				routeTemplate: "api/OperationContainersAndPackages/getEirSerial",
				defaults: new { controller = "OperationContainersAndPackages", action = "getEirSerial" }
				);
			config.Routes.MapHttpRoute(
			name: "OperationContainersAndPackagesGetLog",
			routeTemplate: "api/OperationContainersAndPackages/GetLog",
			defaults: new { controller = "OperationContainersAndPackages", action = "GetLog" }
			);
			#endregion OperationContainersAndPackages
			#region Mostafa Hany
			config.Routes.MapHttpRoute(
					name: "SC_LoadIntializeData",
					routeTemplate: "api/SC_Stores/IntializeData",
					defaults: new { controller = "SC_Stores", action = "IntializeData", pStoresNamesOnly = "" }
				);
			config.Routes.MapHttpRoute(
				  name: "SC_LoadWithPaging",
				  routeTemplate: "api/SC_StoresController/LoadWithPaging",
				  defaults: new { controller = "SC_StoresController", action = "LoadWithPaging" }
			  );
			config.Routes.MapHttpRoute(
				  name: "SC_Insert",
				  routeTemplate: "api/SC_StoresController/Insert",
				  defaults: new { controller = "SC_StoresController", action = "Insert" }
			  );
			config.Routes.MapHttpRoute(
				  name: "SC_Update",
				  routeTemplate: "api/SC_StoresController/Update",
				  defaults: new { controller = "SC_StoresController", action = "Update" }
			  );
			config.Routes.MapHttpRoute(
				 name: "SC_Delete",
				 routeTemplate: "api/SC_StoresController/Delete",
				 defaults: new { controller = "SC_StoresController", action = "Delete" }
			 );

			config.Routes.MapHttpRoute(
			   name: "I_ItemsGroupsInsertItems",
			   routeTemplate: "api/I_ItemsGroups/InsertItems",
			   defaults: new { controller = "I_ItemsGroups", action = "InsertItems" }
		   );

			config.Routes.MapHttpRoute(
			 name: "I_ItemsGroupsInsertList",
			 routeTemplate: "api/I_ItemsGroups/InsertList",
			 defaults: new { controller = "I_ItemsGroups", action = "InsertList" }
		 );


			config.Routes.MapHttpRoute(
			 name: "I_ItemsGroupsGetAllItemsFromGroup",
			 routeTemplate: "api/I_ItemsGroups/GetAllItemsFromGroup",
			 defaults: new { controller = "I_ItemsGroups", action = "GetAllItemsFromGroup" }
			);






			config.Routes.MapHttpRoute(
			 name: "ItemsInquiryIntializeData",
			 routeTemplate: "api/ItemsInquiry/IntializeData",
			 defaults: new { controller = "ItemsInquiry", action = "IntializeData" }
		 );
			config.Routes.MapHttpRoute(
 name: "ItemsInquiryLoadAll",
 routeTemplate: "api/ItemsInquiry/LoadAll",
 defaults: new { controller = "ItemsInquiry", action = "LoadAll" }
);


			config.Routes.MapHttpRoute(
			 name: "LoadWithWhereClauseEGL",
			 routeTemplate: "api/SC_Transactions/LoadWithWhereClauseEGL",
			 defaults: new { controller = "SC_Transactions", action = "LoadWithWhereClauseEGL" }
		  );

			config.Routes.MapHttpRoute(
			 name: "SC_TransactionsLoadWithWhereClause",
			 routeTemplate: "api/SC_Transactions/LoadWithWhereClause",
			 defaults: new { controller = "SC_Transactions", action = "LoadWithWhereClause" }
		  );

			config.Routes.MapHttpRoute(
			name: "SC_Approving_UpdateUserSC_TransactionTypesApproval",
			routeTemplate: "api/SC_Approving/UpdateUserSC_TransactionTypesApproval",
			defaults: new { controller = "SC_Approving", action = "UpdateUserSC_TransactionTypesApproval" }
			);
			config.Routes.MapHttpRoute(
		  name: "SC_ApprovingApproveTax",
		  routeTemplate: "api/SC_Approving/ApproveTax",
		  defaults: new { controller = "SC_Approving", action = "ApproveTax" }
		  );
			config.Routes.MapHttpRoute(
		  name: "SC_ApprovingApprove",
		  routeTemplate: "api/SC_Approving/Approve",
		  defaults: new { controller = "SC_Approving", action = "Approve" }
		  );

			config.Routes.MapHttpRoute(
				 name: "CheckIsForInvoice",
				 routeTemplate: "api/Voucher/CheckIsForInvoice",
				 defaults: new { controller = "Voucher", action = "CheckIsForInvoice" }
			 );
            config.Routes.MapHttpRoute(
             name: "ApproveDirect_Voucher",
             routeTemplate: "api/Voucher/ApproveDirect_Voucher",
             defaults: new { controller = "Voucher", action = "ApproveDirect_Voucher" }
         );
            config.Routes.MapHttpRoute(
			   name: "InsertItems",
			   routeTemplate: "api/SC_Transactions/InsertItems",
			   defaults: new { controller = "SC_Transactions", action = "InsertItems" }
			);


			config.Routes.MapHttpRoute(
			 name: "SC_TransactionsUpdate",
			 routeTemplate: "api/SC_Transactions/Update",
			 defaults: new { controller = "SC_Transactions", action = "Update" }
		  );


			config.Routes.MapHttpRoute(
			   name: "InsertPayablesItems",
			   routeTemplate: "api/SC_Transactions/InsertPayablesItems",
			   defaults: new { controller = "SC_Transactions", action = "InsertPayablesItems" }
			);
			config.Routes.MapHttpRoute(
			   name: "SC_TransactionsInsert",
			   routeTemplate: "api/SC_Transactions/Insert",
			   defaults: new { controller = "SC_Transactions", action = "Insert" }
			);
			config.Routes.MapHttpRoute(
   name: "SC_TransactionsLoadPartners",
   routeTemplate: "api/SC_Transactions/LoadPartners",
   defaults: new { controller = "SC_Transactions", action = "LoadPartners" }
);
			config.Routes.MapHttpRoute(
   name: "SC_TransactionsInsertItems",
   routeTemplate: "api/SC_Transactions/InsertItems",
   defaults: new { controller = "SC_Transactions", action = "InsertItems" }
);
			config.Routes.MapHttpRoute(
name: "SC_TransactionsInsertExpenses",
routeTemplate: "api/SC_Transactions/InsertExpenses",
defaults: new { controller = "SC_Transactions", action = "InsertExpenses" }
);

			config.Routes.MapHttpRoute(
				name: "GetInvoicesTotalsData",
				routeTemplate: "api/SL_Reports/GetInvoicesTotalsData",
				defaults: new { controller = "SL_Reports", action = "GetInvoicesTotalsData" }
			);
			config.Routes.MapHttpRoute(
			   name: "GetPrintedTotalItemsData",
			   routeTemplate: "api/SL_Reports/GetPrintedTotalItemsData",
			   defaults: new { controller = "SL_Reports", action = "GetPrintedTotalItemsData" }
		   );

			config.Routes.MapHttpRoute(
			   name: "GetPSInvoicesTotalsData",
			   routeTemplate: "api/PS_Reports/GetInvoicesTotalsData",
			   defaults: new { controller = "PS_Reports", action = "GetInvoicesTotalsData" }
		   );
			config.Routes.MapHttpRoute(
			   name: "GetPSPrintedTotalItemsData",
			   routeTemplate: "api/PS_Reports/GetPrintedTotalItemsData",
			   defaults: new { controller = "PS_Reports", action = "GetPrintedTotalItemsData" }
		   );


			config.Routes.MapHttpRoute(
name: "DeleteItems_PurchasingRequestHeader",
routeTemplate: "api/PS_PurchasingRequest/DeleteItems",
defaults: new { controller = "PS_PurchasingRequest", action = "DeleteItems" }
);

			config.Routes.MapHttpRoute(
name: "Delete_PurchasingRequestHeader",
routeTemplate: "api/PS_PurchasingRequest/Delete",
defaults: new { controller = "PS_PurchasingRequest", action = "Delete" }
);
			config.Routes.MapHttpRoute(
   name: "SavePS_PurchasingRequestHeader",
   routeTemplate: "api/PS_PurchasingRequest/Save",
   defaults: new { controller = "PS_PurchasingRequest", action = "Save" }
);

			config.Routes.MapHttpRoute(
name: "InsertItemsPS_PurchasingRequest",
routeTemplate: "api/PS_PurchasingRequest/InsertItems",
defaults: new { controller = "PS_PurchasingRequest", action = "InsertItems" }
);

            			config.Routes.MapHttpRoute(
name: "DeleteItems_PS_PurchasingOrdersNewHeader",
routeTemplate: "api/PS_PurchasingOrdersNew/DeleteItems",
defaults: new { controller = "PS_PurchasingOrdersNew", action = "DeleteItems" }
);

			config.Routes.MapHttpRoute(
name: "Delete_PS_PurchasingOrdersNewHeader",
routeTemplate: "api/PS_PurchasingOrdersNew/Delete",
defaults: new { controller = "PS_PurchasingOrdersNew", action = "Delete" }
);
			config.Routes.MapHttpRoute(
   name: "SavePS_PurchasingOrdersNewHeader",
   routeTemplate: "api/PS_PurchasingOrdersNew/Save",
   defaults: new { controller = "PS_PurchasingOrdersNew", action = "Save" }
);

			config.Routes.MapHttpRoute(
name: "InsertItemsPS_PurchasingOrdersNew",
routeTemplate: "api/PS_PurchasingOrdersNew/InsertItems",
defaults: new { controller = "PS_PurchasingOrdersNew", action = "InsertItems" }
);
			//-------------------------------------------------------------------------------------------

			config.Routes.MapHttpRoute(
name: "DeleteItems_PS_QuotationsHeader",
routeTemplate: "api/PS_Quotations/DeleteItems",
defaults: new { controller = "PS_Quotations", action = "DeleteItems" }
);

			config.Routes.MapHttpRoute(
name: "Delete_PS_QuotationsHeader",
routeTemplate: "api/PS_Quotations/Delete",
defaults: new { controller = "PS_Quotations", action = "Delete" }
);
			config.Routes.MapHttpRoute(
   name: "SavePS_QuotationsHeader",
   routeTemplate: "api/PS_Quotations/Save",
   defaults: new { controller = "PS_Quotations", action = "Save" }
);

			config.Routes.MapHttpRoute(
name: "InsertItemsPS_Quotations",
routeTemplate: "api/PS_Quotations/InsertItems",
defaults: new { controller = "PS_Quotations", action = "InsertItems" }
);




			config.Routes.MapHttpRoute(
name: "Delete_PS_PurchasingOrdersHeader",
routeTemplate: "api/PS_PurchasingOrders/Delete",
defaults: new { controller = "PS_PurchasingOrders", action = "Delete" }
);
			config.Routes.MapHttpRoute(
   name: "SavePS_PurchasingOrdersHeader",
   routeTemplate: "api/PS_PurchasingOrders/Save",
   defaults: new { controller = "PS_PurchasingOrders", action = "Save" }
);

			config.Routes.MapHttpRoute(
name: "InsertItemsPS_PurchasingOrders",
routeTemplate: "api/PS_PurchasingOrders/InsertItems",
defaults: new { controller = "PS_PurchasingOrders", action = "InsertItems" }
);

			config.Routes.MapHttpRoute(
name: "Delete_PS_SupplyOrdersHeader",
routeTemplate: "api/PS_SupplyOrders/Delete",
defaults: new { controller = "PS_SupplyOrders", action = "Delete" }
);
			config.Routes.MapHttpRoute(
   name: "SavePS_SupplyOrdersHeader",
   routeTemplate: "api/PS_SupplyOrders/Save",
   defaults: new { controller = "PS_SupplyOrders", action = "Save" }
);

			config.Routes.MapHttpRoute(
name: "InsertItemsPS_SupplyOrders",
routeTemplate: "api/PS_SupplyOrders/InsertItems",
defaults: new { controller = "PS_SupplyOrders", action = "InsertItems" }
);

			#region PS_Approve
			config.Routes.MapHttpRoute(
			name: "PS_ApprovingApproveTax",
			routeTemplate: "api/PS_Approving/ApproveTax",
			defaults: new { controller = "PS_Approving", action = "ApproveTax" }
			);
			config.Routes.MapHttpRoute(
		   name: "PS_ApprovingApprove",
		   routeTemplate: "api/PS_Approving/Approve",
		   defaults: new { controller = "PS_Approving", action = "Approve" }
		   );
            config.Routes.MapHttpRoute(
           name: "PS_ApprovingLoadWithWhereClause",
           routeTemplate: "api/PS_Approving/LoadWithWhereClause",
           defaults: new { controller = "PS_Approving", action = "LoadWithWhereClause" }
           );
            config.Routes.MapHttpRoute(
          name: "PS_ApprovingIntializeData",
          routeTemplate: "api/PS_Approving/IntializeData",
          defaults: new { controller = "PS_Approving", action = "IntializeData" }
          );
            #endregion


            config.Routes.MapHttpRoute(
	 name: "LoadingandDischargingData_GetOperationByCode",
	 routeTemplate: "api/LoadingandDischargingData/GetOperationByCode",
	 defaults: new { controller = "LoadingandDischargingData", action = "GetOperationByCode" }
	  );
			config.Routes.MapHttpRoute(
name: "LoadingandDischargingData_InsertItems",
routeTemplate: "api/LoadingandDischargingData/InsertItems",
defaults: new { controller = "LoadingandDischargingData", action = "InsertItems" }
);

			config.Routes.MapHttpRoute(
name: "LoadingandDischargingData_GetOperationInfoByID",
routeTemplate: "api/LoadingandDischargingData/GetOperationInfoByID",
defaults: new { controller = "LoadingandDischargingData", action = "GetOperationInfoByID" }
);
			config.Routes.MapHttpRoute(
name: "LoadingandDischargingData_IntializeData",
routeTemplate: "api/LoadingandDischargingData/IntializeData",
defaults: new { controller = "LoadingandDischargingData", action = "IntializeData" }
);

			config.Routes.MapHttpRoute(
name: "LoadingandDischargingData_InsertLoadingAndDischargingHeaderTruckersDetailsFromExcel",
routeTemplate: "api/LoadingandDischargingData/InsertLoadingAndDischargingHeaderTruckersDetailsFromExcel",
defaults: new { controller = "LoadingandDischargingData", action = "InsertLoadingAndDischargingHeaderTruckersDetailsFromExcel" }
);

			config.Routes.MapHttpRoute(
name: "LoadingandDischargingData_LoadLoadingAndDischargingHeaderTruckers",
routeTemplate: "api/LoadingandDischargingData/LoadLoadingAndDischargingHeaderTruckers",
defaults: new { controller = "LoadingandDischargingData", action = "LoadLoadingAndDischargingHeaderTruckers" }
);

			config.Routes.MapHttpRoute(
name: "LoadingandDischargingData_LoadLoadingAndDischargingHeaderCranes",
routeTemplate: "api/LoadingandDischargingData/LoadLoadingAndDischargingHeaderCranes",
defaults: new { controller = "LoadingandDischargingData", action = "LoadLoadingAndDischargingHeaderCranes" }
);


			config.Routes.MapHttpRoute(
name: "LoadingandDischargingData_InsertLoadingAndDischargingHeaderCranesDetailsFromExcel",
routeTemplate: "api/LoadingandDischargingData/InsertLoadingAndDischargingHeaderCranesDetailsFromExcel",
defaults: new { controller = "LoadingandDischargingData", action = "InsertLoadingAndDischargingHeaderCranesDetailsFromExcel" }
);
			//
			config.Routes.MapHttpRoute(
	   name: "LD_Storage_GetOperationByCode",
	   routeTemplate: "api/LD_Storage/GetOperationByCode",
	   defaults: new { controller = "LD_Storage", action = "GetOperationByCode" }
		);
			config.Routes.MapHttpRoute(
name: "LD_Storage_InsertItems",
routeTemplate: "api/LD_Storage/InsertItems",
defaults: new { controller = "LD_Storage", action = "InsertItems" }
);

			config.Routes.MapHttpRoute(
name: "LD_Storage_GetOperationInfoByID",
routeTemplate: "api/LD_Storage/GetOperationInfoByID",
defaults: new { controller = "LD_Storage", action = "GetOperationInfoByID" }
);
			config.Routes.MapHttpRoute(
name: "LD_Storage_IntializeData",
routeTemplate: "api/LD_Storage/IntializeData",
defaults: new { controller = "LD_Storage", action = "IntializeData" }
);


			config.Routes.MapHttpRoute(
name: "LD_Storage_LoadStorageTransactions",
routeTemplate: "api/LD_Storage/LoadStorageTransactions",
defaults: new { controller = "LD_Storage", action = "LoadStorageTransactions" }
);

			config.Routes.MapHttpRoute(
name: "LD_Storage_InsertStorageTransactionsFromExcel",
routeTemplate: "api/LD_Storage/InsertStorageTransactionsFromExcel",
defaults: new { controller = "LD_Storage", action = "InsertStorageTransactionsFromExcel" }
);



			//-------


			config.Routes.MapHttpRoute(
	 name: "LD_Workers_GetOperationByCode",
	 routeTemplate: "api/LD_Workers/GetOperationByCode",
	 defaults: new { controller = "LD_Workers", action = "GetOperationByCode" }
	  );
			config.Routes.MapHttpRoute(
name: "LD_Workers_InsertItems",
routeTemplate: "api/LD_Workers/InsertItems",
defaults: new { controller = "LD_Workers", action = "InsertItems" }
);

			config.Routes.MapHttpRoute(
name: "LD_Workers_GetOperationInfoByID",
routeTemplate: "api/LD_Workers/GetOperationInfoByID",
defaults: new { controller = "LD_Workers", action = "GetOperationInfoByID" }
);
			config.Routes.MapHttpRoute(
name: "LD_Workers_IntializeData",
routeTemplate: "api/LD_Workers/IntializeData",
defaults: new { controller = "LD_Workers", action = "IntializeData" }
);





			config.Routes.MapHttpRoute(
name: "LD_Workers_LoadLoadingAndDischargingHeaderWorkers",
routeTemplate: "api/LD_Workers/LoadLoadingAndDischargingHeaderWorkers",
defaults: new { controller = "LD_Workers", action = "LoadLoadingAndDischargingHeaderWorkers" }
);


			config.Routes.MapHttpRoute(
name: "LD_Workers_InsertLoadingAndDischargingHeaderWorkersDetailsFromExcel",
routeTemplate: "api/LD_Workers/InsertLoadingAndDischargingHeaderWorkersDetailsFromExcel",
defaults: new { controller = "LD_Workers", action = "InsertLoadingAndDischargingHeaderWorkersDetailsFromExcel" }
);



			////////
			config.Routes.MapHttpRoute(
		   name: "PS_ClientDbtCrdtNotesLoadDetails",
		   routeTemplate: "api/PS_ClientDbtCrdtNotes/LoadDetails",
		   defaults: new { controller = "PS_ClientDbtCrdtNotes", action = "LoadDetails" }
		   );

			config.Routes.MapHttpRoute(
		  name: "PS_ClientDbtCrdtNotesLoadInvoicesDetailsByInvoiceID",
		  routeTemplate: "api/PS_ClientDbtCrdtNotes/LoadInvoicesDetailsByInvoiceID",
		  defaults: new { controller = "PS_ClientDbtCrdtNotes", action = "LoadInvoicesDetailsByInvoiceID" }
		  );

			config.Routes.MapHttpRoute(
		   name: "PS_ClientDbtCrdtNotesFillInvoiceByClient",
		   routeTemplate: "api/PS_ClientDbtCrdtNotes/FillInvoiceByClient",
		   defaults: new { controller = "PS_ClientDbtCrdtNotes", action = "FillInvoiceByClient" }
		  );


			config.Routes.MapHttpRoute(
		 name: "PS_ClientDbtCrdtNotesDelete",
		 routeTemplate: "api/PS_ClientDbtCrdtNotes/Delete",
		 defaults: new { controller = "PS_ClientDbtCrdtNotes", action = "Delete" }
		);
			config.Routes.MapHttpRoute(
		name: "PS_ClientDbtCrdtNotesPrint",
		routeTemplate: "api/PS_ClientDbtCrdtNotes/Print",
		defaults: new { controller = "PS_ClientDbtCrdtNotes", action = "Print" }
		);
			config.Routes.MapHttpRoute(
		name: "PS_ClientDbtCrdtNotesdeleteAllIDs",
		routeTemplate: "api/PS_ClientDbtCrdtNotes/deleteAllIDs",
		defaults: new { controller = "PS_ClientDbtCrdtNotes", action = "deleteAllIDs" }
		);

			config.Routes.MapHttpRoute(
			name: "PS_ClientDbtCrdtNotesA_A_JobAccountRequiredCheck",
			routeTemplate: "api/PS_ClientDbtCrdtNotes/A_A_JobAccountRequiredCheck",
			defaults: new { controller = "PS_ClientDbtCrdtNotes", action = "A_A_JobAccountRequiredCheck" }
			);

			///////////

			/////
			config.Routes.MapHttpRoute(
			name: "ApprovePS_ClientDbtCrdtNotesLoadDetails",
			routeTemplate: "api/ApprovePS_ClientDbtCrdtNotes/LoadDetails",
			defaults: new { controller = "ApprovePS_ClientDbtCrdtNotes", action = "LoadDetails" }
		   );

			config.Routes.MapHttpRoute(
		   name: "ApprovePS_ClientDbtCrdtNotesFillInvoiceByClient",
		   routeTemplate: "api/ApprovePS_ClientDbtCrdtNotes/FillInvoiceByClient",
		   defaults: new { controller = "ApprovePS_ClientDbtCrdtNotes", action = "FillInvoiceByClient" }
		  );


			config.Routes.MapHttpRoute(
		 name: "ApprovePS_ClientDbtCrdtNotesDelete",
		 routeTemplate: "api/ApprovePS_ClientDbtCrdtNotes/Delete",
		 defaults: new { controller = "ApprovePS_ClientDbtCrdtNotes", action = "Delete" }
		);
			config.Routes.MapHttpRoute(
		name: "ApprovePS_ClientDbtCrdtNotesPrint",
		routeTemplate: "api/ApprovePS_ClientDbtCrdtNotes/Print",
		defaults: new { controller = "ApprovePS_ClientDbtCrdtNotes", action = "Print" }
		);
			config.Routes.MapHttpRoute(
		name: "ApprovePS_ClientDbtCrdtNotesdeleteAllIDs",
		routeTemplate: "api/ApprovePS_ClientDbtCrdtNotes/deleteAllIDs",
		defaults: new { controller = "ApprovePS_ClientDbtCrdtNotes", action = "deleteAllIDs" }
		);

			config.Routes.MapHttpRoute(
			name: "ApprovePS_ClientDbtCrdtNotesA_A_JobAccountRequiredCheck",
			routeTemplate: "api/ApprovePS_ClientDbtCrdtNotes/A_A_JobAccountRequiredCheck",
			defaults: new { controller = "ApprovePS_ClientDbtCrdtNotes", action = "A_A_JobAccountRequiredCheck" }
			);


			////////

			//--------------------------------------------------------------------------------------------
			config.Routes.MapHttpRoute(
					  name: "SL_InvoicesLoadWithPaging",
					  routeTemplate: "api/SL_Invoices/LoadWithPaging",
					  defaults: new { controller = "SL_Invoices", action = "LoadWithPaging" }
					 );
			config.Routes.MapHttpRoute(
		   name: "SL_InvoicesLoadWithWhereClause",
		   routeTemplate: "api/SL_Invoices/LoadWithWhereClause",
		   defaults: new { controller = "SL_Invoices", action = "LoadWithWhereClause" }
		  );

			config.Routes.MapHttpRoute(
			 name: "SL_InvoicesIntializeData",
			 routeTemplate: "api/SL_Invoices/IntializeData",
			 defaults: new { controller = "SL_Invoices", action = "IntializeData" }
			 );
			config.Routes.MapHttpRoute(
  name: "SL_InvoicesInsertItems",
  routeTemplate: "api/SL_Invoices/InsertItems",
  defaults: new { controller = "SL_Invoices", action = "InsertItems" }
 );

			config.Routes.MapHttpRoute(
		   name: "SL_InvoicesSave",
		   routeTemplate: "api/SL_Invoices/Save",
		   defaults: new { controller = "SL_Invoices", action = "Save" }
		  );

			config.Routes.MapHttpRoute(
		   name: "SL_InvoicesLoadDetails",
		   routeTemplate: "api/SL_Invoices/LoadDetails",
		   defaults: new { controller = "SL_Invoices", action = "LoadDetails" }
		   );

			config.Routes.MapHttpRoute(
			name: "SL_InvoicesLoadWithPagingItems",
			routeTemplate: "api/SL_Invoices/LoadWithPagingItems",
			defaults: new { controller = "SL_Invoices", action = "LoadWithPagingItems" }
			);

			config.Routes.MapHttpRoute(
			name: "SL_InvoicesClientDbtCrdtNotesLoadDetails",
			routeTemplate: "api/ClientDbtCrdtNotes/LoadDetails",
			defaults: new { controller = "ClientDbtCrdtNotes", action = "LoadDetails" }
		   );

			config.Routes.MapHttpRoute(
		   name: "SL_InvoicesClientDbtCrdtNotesFillInvoiceByClient",
		   routeTemplate: "api/ClientDbtCrdtNotes/FillInvoiceByClient",
		   defaults: new { controller = "ClientDbtCrdtNotes", action = "FillInvoiceByClient" }
		  );

			config.Routes.MapHttpRoute(
		name: "SL_InvoicesClientDbtCrdtNotesServicesLoadInvoicesDetailsByInvoiceID",
		routeTemplate: "api/ClientDbtCrdtNotes/LoadInvoicesDetailsByInvoiceID",
		defaults: new { controller = "ClientDbtCrdtNotes", action = "LoadInvoicesDetailsByInvoiceID" }
		);

			config.Routes.MapHttpRoute(
			name: "SL_InvoicesClientDbtCrdtNotesDelete",
			routeTemplate: "api/ClientDbtCrdtNotes/Delete",
			defaults: new { controller = "ClientDbtCrdtNotes", action = "Delete" }
			);
			config.Routes.MapHttpRoute(
		name: "SL_InvoicesClientDbtCrdtNotesPrint",
		routeTemplate: "api/ClientDbtCrdtNotes/Print",
		defaults: new { controller = "ClientDbtCrdtNotes", action = "Print" }
		);
			config.Routes.MapHttpRoute(
		  name: "PaymentsLoadWithPaging",
		  routeTemplate: "api/SL_Payments/LoadWithPaging",
		  defaults: new { controller = "SL_Payments", action = "LoadWithPaging" }
		  );
			config.Routes.MapHttpRoute(
		   name: "SL_PaymentsLoadInvoicesDbtCrdtNote",
		   routeTemplate: "api/SL_Payments/LoadInvoicesDbtCrdtNote",
		   defaults: new { controller = "SL_Payments", action = "LoadInvoicesDbtCrdtNote" }
		   );
			config.Routes.MapHttpRoute(
		  name: "SL_PaymentsLoadInvoices",
		  routeTemplate: "api/SL_Payments/LoadInvoices",
		  defaults: new { controller = "SL_Payments", action = "LoadInvoices" }
		  );
			config.Routes.MapHttpRoute(
		   name: "PaymentsLoadAllCurrencyByCurrencyID",
		   routeTemplate: "api/SL_Payments/LoadAllCurrencyByCurrencyID",
		   defaults: new { controller = "SL_Payments", action = "LoadAllCurrencyByCurrencyID" }
		   );
			config.Routes.MapHttpRoute(
			  name: "SLPaymentsGetRefundAccountIDAndSubAccountID",
			  routeTemplate: "api/SL_Payments/GetRefundAccountIDAndSubAccountID",
			  defaults: new { controller = "SL_Payments", action = "GetRefundAccountIDAndSubAccountID" }
		  );
			config.Routes.MapHttpRoute(
			name: "SLPaymentsLoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned",
			routeTemplate: "api/SL_Payments/LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned",
			defaults: new { controller = "SL_Payments", action = "LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned" }
		);

			config.Routes.MapHttpRoute(
			name: "SL_PaymentsGetAccountIDAndSubAccountID",
			routeTemplate: "api/SL_Payments/GetAccountIDAndSubAccountID",
			defaults: new { controller = "SL_Payments", action = "GetAccountIDAndSubAccountID" }
			);
			config.Routes.MapHttpRoute(
				name: "TaxeTypesLoadAll",
				routeTemplate: "api/TaxeTypes/LoadAll",
				defaults: new { controller = "TaxeTypes", action = "LoadAll" }
				);
			//*******************************************************************************************************************
			config.Routes.MapHttpRoute(
				name: "LoadAllCurrencyByName",
				routeTemplate: "api/SL_Payments/LoadAllCurrencyByName",
				defaults: new { controller = "SL_Payments", action = "LoadAllCurrencyByName" }
				);

			config.Routes.MapHttpRoute(
			   name: "SL_PaymentsInsert",
			   routeTemplate: "api/SL_Payments/Insert",
			   defaults: new { controller = "SL_Payments", action = "Insert" }
			   );
			#region PaymentsStarShine
			//a_payments
			config.Routes.MapHttpRoute(
		   name: "A_PaymentsStarShineLoadWithPaging",
		   routeTemplate: "api/A_PaymentsStarShine/LoadWithPaging",
		   defaults: new { controller = "A_PaymentsStarShine", action = "LoadWithPaging" }
		   );

			config.Routes.MapHttpRoute(
		  name: "A_PaymentsStarShineLoadInvoices",
		  routeTemplate: "api/A_PaymentsStarShine/LoadInvoices",
		  defaults: new { controller = "A_PaymentsStarShine", action = "LoadInvoices" }
		  );
			config.Routes.MapHttpRoute(
		   name: "A_PaymentsStarShineLoadAllCurrencyByCurrencyID",
		   routeTemplate: "api/A_PaymentsStarShine/LoadAllCurrencyByCurrencyID",
		   defaults: new { controller = "A_PaymentsStarShine", action = "LoadAllCurrencyByCurrencyID" }
		   );
			config.Routes.MapHttpRoute(
			  name: "A_PaymentsStarShineGetRefundAccountIDAndSubAccountID",
			  routeTemplate: "api/A_PaymentsStarShine/GetRefundAccountIDAndSubAccountID",
			  defaults: new { controller = "A_PaymentsStarShine", action = "GetRefundAccountIDAndSubAccountID" }
		  );
			config.Routes.MapHttpRoute(
			name: "A_PaymentsStarShineLoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned",
			routeTemplate: "api/A_PaymentsStarShine/LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned",
			defaults: new { controller = "A_PaymentsStarShine", action = "LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned" }
		);

			config.Routes.MapHttpRoute(
			name: "A_PaymentsStarShineGetAccountIDAndSubAccountID",
			routeTemplate: "api/A_PaymentsStarShine/GetAccountIDAndSubAccountID",
			defaults: new { controller = "A_PaymentsStarShine", action = "GetAccountIDAndSubAccountID" }
			);

			//*******************************************************************************************************************
			config.Routes.MapHttpRoute(
				name: "StarShineA_LoadAllCurrencyByName",
				routeTemplate: "api/A_PaymentsStarShine/LoadAllCurrencyByName",
				defaults: new { controller = "A_PaymentsStarShine", action = "LoadAllCurrencyByName" }
				);
			config.Routes.MapHttpRoute(
			   name: "A_PaymentsStarShineLoadAllClientsByName",
			   routeTemplate: "api/A_PaymentsStarShine/LoadAllClientsByName",
			   defaults: new { controller = "A_PaymentsStarShine", action = "LoadAllClientsByName" }
			   );
			config.Routes.MapHttpRoute(
			   name: "A__PaymentsStarShineInsert",
			   routeTemplate: "api/A_PaymentsStarShine/Insert",
			   defaults: new { controller = "A_PaymentsStarShine", action = "Insert" }
			   );
			config.Routes.MapHttpRoute(
			  name: "A_PaymentsStarShineLoadAllClientsByNameWithInvoice",
			  routeTemplate: "api/A_PaymentsStarShine/LoadAllClientsByNameWithInvoice",
			  defaults: new { controller = "A_PaymentsStarShine", action = "LoadAllClientsByNameWithInvoice" }
			  );
			#endregion
			#region PAYMENTS EGL
			//a_payments
			config.Routes.MapHttpRoute(
		   name: "A_PaymentsLoadWithPagingEGL",
		   routeTemplate: "api/A_PaymentsEGL/LoadWithPaging",
		   defaults: new { controller = "A_PaymentsEGL", action = "LoadWithPaging" }
		   );

			config.Routes.MapHttpRoute(
		  name: "A_PaymentsLoadInvoicesEGL",
		  routeTemplate: "api/A_PaymentsEGL/LoadInvoices",
		  defaults: new { controller = "A_PaymentsEGL", action = "LoadInvoices" }
		  );
			config.Routes.MapHttpRoute(
		   name: "A_PaymentsLoadAllCurrencyByCurrencyIDEGL",
		   routeTemplate: "api/A_PaymentsEGL/LoadAllCurrencyByCurrencyID",
		   defaults: new { controller = "A_PaymentsEGL", action = "LoadAllCurrencyByCurrencyID" }
		   );
			config.Routes.MapHttpRoute(
			  name: "A_PaymentsGetRefundAccountIDAndSubAccountIDEGL",
			  routeTemplate: "api/A_PaymentsEGL/GetRefundAccountIDAndSubAccountID",
			  defaults: new { controller = "A_PaymentsEGL", action = "GetRefundAccountIDAndSubAccountID" }
		  );
			config.Routes.MapHttpRoute(
			name: "A_PaymentsLoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturnedEGL",
			routeTemplate: "api/A_PaymentsEGL/LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned",
			defaults: new { controller = "A_PaymentsEGL", action = "LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned" }
		);

			config.Routes.MapHttpRoute(
			name: "A_PaymentsGetAccountIDAndSubAccountIDEGL",
			routeTemplate: "api/A_PaymentsEGL/GetAccountIDAndSubAccountID",
			defaults: new { controller = "A_PaymentsEGL", action = "GetAccountIDAndSubAccountID" }
			);

			//*******************************************************************************************************************
			config.Routes.MapHttpRoute(
				name: "A_LoadAllCurrencyByNameEGL",
				routeTemplate: "api/A_PaymentsEGL/LoadAllCurrencyByName",
				defaults: new { controller = "A_PaymentsEGL", action = "LoadAllCurrencyByName" }
				);
			config.Routes.MapHttpRoute(
			   name: "A_PaymentsLoadAllClientsByNameEGL",
			   routeTemplate: "api/A_PaymentsEGL/LoadAllClientsByName",
			   defaults: new { controller = "A_PaymentsEGL", action = "LoadAllClientsByName" }
			   );
			config.Routes.MapHttpRoute(
			   name: "A__PaymentsInsertEGL",
			   routeTemplate: "api/A_PaymentsEGL/Insert",
			   defaults: new { controller = "A_PaymentsEGL", action = "Insert" }
			   );
			config.Routes.MapHttpRoute(
			  name: "A_PaymentsLoadAllClientsByNameWithInvoiceEGL",
			  routeTemplate: "api/A_PaymentsEGL/LoadAllClientsByNameWithInvoice",
			  defaults: new { controller = "A_PaymentsEGL", action = "LoadAllClientsByNameWithInvoice" }
			  );
			#endregion
			//a_payments
			config.Routes.MapHttpRoute(
		   name: "A_PaymentsLoadWithPaging",
		   routeTemplate: "api/A_Payments/LoadWithPaging",
		   defaults: new { controller = "A_Payments", action = "LoadWithPaging" }
		   );

			config.Routes.MapHttpRoute(
		  name: "A_PaymentsLoadInvoices",
		  routeTemplate: "api/A_Payments/LoadInvoices",
		  defaults: new { controller = "A_Payments", action = "LoadInvoices" }
		  );
			config.Routes.MapHttpRoute(
		   name: "A_PaymentsLoadAllCurrencyByCurrencyID",
		   routeTemplate: "api/A_Payments/LoadAllCurrencyByCurrencyID",
		   defaults: new { controller = "A_Payments", action = "LoadAllCurrencyByCurrencyID" }
		   );
			config.Routes.MapHttpRoute(
			  name: "A_PaymentsGetRefundAccountIDAndSubAccountID",
			  routeTemplate: "api/A_Payments/GetRefundAccountIDAndSubAccountID",
			  defaults: new { controller = "A_Payments", action = "GetRefundAccountIDAndSubAccountID" }
		  );
			config.Routes.MapHttpRoute(
			name: "A_PaymentsLoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned",
			routeTemplate: "api/A_Payments/LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned",
			defaults: new { controller = "A_Payments", action = "LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned" }
		);

			config.Routes.MapHttpRoute(
			name: "A_PaymentsGetAccountIDAndSubAccountID",
			routeTemplate: "api/A_Payments/GetAccountIDAndSubAccountID",
			defaults: new { controller = "A_Payments", action = "GetAccountIDAndSubAccountID" }
			);

			//*******************************************************************************************************************
			config.Routes.MapHttpRoute(
				name: "A_LoadAllCurrencyByName",
				routeTemplate: "api/A_Payments/LoadAllCurrencyByName",
				defaults: new { controller = "A_Payments", action = "LoadAllCurrencyByName" }
				);
			config.Routes.MapHttpRoute(
			   name: "A_PaymentsLoadAllClientsByName",
			   routeTemplate: "api/A_Payments/LoadAllClientsByName",
			   defaults: new { controller = "A_Payments", action = "LoadAllClientsByName" }
			   );
			config.Routes.MapHttpRoute(
			   name: "A__PaymentsInsert",
			   routeTemplate: "api/A_Payments/Insert",
			   defaults: new { controller = "A_Payments", action = "Insert" }
			   );
			config.Routes.MapHttpRoute(
			  name: "A_PaymentsLoadAllClientsByNameWithInvoice",
			  routeTemplate: "api/A_Payments/LoadAllClientsByNameWithInvoice",
			  defaults: new { controller = "A_Payments", action = "LoadAllClientsByNameWithInvoice" }
			  );
			//  ---------------Scenery----------------------------------------

			//a_payments
			config.Routes.MapHttpRoute(
		   name: "A_SceneryPaymentsLoadWithPaging",
		   routeTemplate: "api/A_SceneryPayments/LoadWithPaging",
		   defaults: new { controller = "A_SceneryPayments", action = "LoadWithPaging" }
		   );

			config.Routes.MapHttpRoute(
		  name: "A_SceneryPaymentsLoadInvoices",
		  routeTemplate: "api/A_SceneryPayments/LoadInvoices",
		  defaults: new { controller = "A_SceneryPayments", action = "LoadInvoices" }
		  );
			config.Routes.MapHttpRoute(
		   name: "A_SceneryPaymentsLoadAllCurrencyByCurrencyID",
		   routeTemplate: "api/A_SceneryPayments/LoadAllCurrencyByCurrencyID",
		   defaults: new { controller = "A_SceneryPayments", action = "LoadAllCurrencyByCurrencyID" }
		   );
			config.Routes.MapHttpRoute(
			  name: "A_SceneryPaymentsGetRefundAccountIDAndSubAccountID",
			  routeTemplate: "api/A_SceneryPayments/GetRefundAccountIDAndSubAccountID",
			  defaults: new { controller = "A_SceneryPayments", action = "GetRefundAccountIDAndSubAccountID" }
		  );
			config.Routes.MapHttpRoute(
			name: "A_SceneryPaymentsLoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned",
			routeTemplate: "api/A_SceneryPayments/LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned",
			defaults: new { controller = "A_SceneryPayments", action = "LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned" }
		);

			config.Routes.MapHttpRoute(
			name: "A_SceneryPaymentsGetAccountIDAndSubAccountID",
			routeTemplate: "api/A_SceneryPayments/GetAccountIDAndSubAccountID",
			defaults: new { controller = "A_SceneryPayments", action = "GetAccountIDAndSubAccountID" }
			);

			config.Routes.MapHttpRoute(
				name: "A_SceneryLoadAllCurrencyByName",
				routeTemplate: "api/A_SceneryPayments/LoadAllCurrencyByName",
				defaults: new { controller = "A_SceneryPayments", action = "LoadAllCurrencyByName" }
				);
			config.Routes.MapHttpRoute(
			   name: "A_SceneryPaymentsLoadAllClientsByName",
			   routeTemplate: "api/A_SceneryPayments/LoadAllClientsByName",
			   defaults: new { controller = "A_SceneryPayments", action = "LoadAllClientsByName" }
			   );
			config.Routes.MapHttpRoute(
			   name: "A__SceneryPaymentsInsert",
			   routeTemplate: "api/A_SceneryPayments/Insert",
			   defaults: new { controller = "A_SceneryPayments", action = "Insert" }
			   );
			config.Routes.MapHttpRoute(
			  name: "A_SceneryPaymentsLoadAllClientsByNameWithInvoice",
			  routeTemplate: "api/A_SceneryPayments/LoadAllClientsByNameWithInvoice",
			  defaults: new { controller = "A_SceneryPayments", action = "LoadAllClientsByNameWithInvoice" }
			  );


            config.Routes.MapHttpRoute(
name: "PS_PaymentsGetAccountIDAndSubAccountID",
routeTemplate: "api/PS_PaymentsTemp/GetAccountIDAndSubAccountID",
defaults: new { controller = "PS_PaymentsTemp", action = "GetAccountIDAndSubAccountID" }
);

            config.Routes.MapHttpRoute(
            name: "PS_PaymentsLoadInvoices",
            routeTemplate: "api/PS_PaymentsTemp/LoadInvoices",
            defaults: new { controller = "PS_PaymentsTemp", action = "LoadInvoices" }
            );

            config.Routes.MapHttpRoute(
            name: "PS_PaymentsLoadInvoicesDbtCrdtNote",
            routeTemplate: "api/PS_PaymentsTemp/LoadInvoicesDbtCrdtNote",
            defaults: new { controller = "PS_PaymentsTemp", action = "LoadInvoicesDbtCrdtNote" }
            );

            config.Routes.MapHttpRoute(
            name: "PS_PaymentsLoadWithPaging",
            routeTemplate: "api/PS_PaymentsTemp/LoadWithPaging",
            defaults: new { controller = "PS_PaymentsTemp", action = "LoadWithPaging" }
            );

            config.Routes.MapHttpRoute(
            name: "PS_PaymentsCheckFiscalYear",
            routeTemplate: "api/PS_PaymentsTemp/CheckFiscalYear",
            defaults: new { controller = "PS_PaymentsTemp", action = "CheckFiscalYear" }
            );
            config.Routes.MapHttpRoute(
           name: "PS_PaymentsInsert",
           routeTemplate: "api/PS_PaymentsTemp/Insert",
           defaults: new { controller = "PS_PaymentsTemp", action = "Insert" }
           );

            config.Routes.MapHttpRoute(
          name: "PS_PaymentsLoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned",
          routeTemplate: "api/PS_PaymentsTemp/LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned",
          defaults: new { controller = "PS_PaymentsTemp", action = "LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned" }
          );

            //    ---------------------------------------------------------------
            config.Routes.MapHttpRoute(
			   name: "LoadAllTransactionTypes",
			   routeTemplate: "api/Invoices/LoadAllTransactionTypes",
			   defaults: new { controller = "Invoices", action = "LoadAllTransactionTypes" }
			   );
			config.Routes.MapHttpRoute(
			  name: "ApproveOrUnApproveTax",
			  routeTemplate: "api/Invoices/ApproveOrUnApproveTax",
			  defaults: new { controller = "Invoices", action = "ApproveOrUnApproveTax" }
			  );
			config.Routes.MapHttpRoute(
			 name: "ApproveOrUnApprove",
			 routeTemplate: "api/Invoices/ApproveOrUnApprove",
			 defaults: new { controller = "Invoices", action = "ApproveOrUnApprove" }
			 );
            config.Routes.MapHttpRoute(
			 name: "InvoiceChangeDate",
			 routeTemplate: "api/Invoices/InvoiceChangeDate",
			 defaults: new { controller = "Invoices", action = "InvoiceChangeDate" }
			 );

            config.Routes.MapHttpRoute(
			   name: "Update",
			   routeTemplate: "api/Invoices/Update",
			   defaults: new { controller = "Invoices", action = "Update" }
			   );
			config.Routes.MapHttpRoute(
			   name: "ImportFromExcelFile",
			   routeTemplate: "api/Invoices/ImportFromExcelFile",
			   defaults: new { controller = "Invoices", action = "ImportFromExcelFile" }
			   );

			config.Routes.MapHttpRoute(
			  name: "InvoicesgetInvoiceDetailsForVoucher",
			  routeTemplate: "api/Invoices/getInvoiceDetailsForVoucher",
			  defaults: new { controller = "Invoices", action = "getInvoiceDetailsForVoucher" }
			  );

			config.Routes.MapHttpRoute(
				name: "InvoicesSendFastReportByMail",
				routeTemplate: "api/Invoices/SendFastReportByMail",
				defaults: new { controller = "Invoices", action = "SendFastReportByMail" }
				);
			config.Routes.MapHttpRoute(
				name: "SetDraftInvoiceTrucker",
				routeTemplate: "api/Invoices/SetDraftInvoiceTrucker",
				defaults: new { controller = "Invoices", action = "SetDraftInvoiceTrucker" }
				);
			config.Routes.MapHttpRoute(
			  name: "LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturnedTax",
			  routeTemplate: "api/Invoices/LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturnedTax",
			  defaults: new { controller = "Invoices", action = "LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturnedTax" }
			  );

			config.Routes.MapHttpRoute(
			name: "LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned",
			routeTemplate: "api/Invoices/LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned",
			defaults: new { controller = "Invoices", action = "LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned" }
			);
			config.Routes.MapHttpRoute(
			name: "Invoices_CreateInvoicesFromHousesReceivables",
			routeTemplate: "api/Invoices/CreateInvoicesFromHousesReceivables",
			defaults: new { controller = "Invoices", action = "CreateInvoicesFromHousesReceivables" }
			);
			config.Routes.MapHttpRoute(
			name: "CheckTariffDetailsAccountLink",
			routeTemplate: "api/Invoices/CheckTariffDetailsAccountLink",
			defaults: new { controller = "Invoices", action = "CheckTariffDetailsAccountLink" }
			);
            config.Routes.MapHttpRoute(
            name: "GetInvoiceData",
            routeTemplate: "api/Invoices/GetInvoiceData",
            defaults: new { controller = "Invoices", action = "GetInvoiceData" }
            );
            config.Routes.MapHttpRoute(
            name: "LoadAllFromOperation",
            routeTemplate: "api/Invoices/LoadAllFromOperation",
            defaults: new { controller = "Invoices", action = "LoadAllFromOperation" }
            );
			config.Routes.MapHttpRoute(
            name: "Invoices_LoadAll",
            routeTemplate: "api/Invoices/LoadAll",
            defaults: new { controller = "Invoices", action = "LoadAll" }
            );
            config.Routes.MapHttpRoute(
             name: "UpdateInvoicePaymentTerm",
             routeTemplate: "api/Invoices/UpdateInvoicePaymentTerm",
             defaults: new { controller = "Invoices", action = "UpdateInvoicePaymentTerm" }
             );
			config.Routes.MapHttpRoute(
             name: "Invoices_SaveInvoiceReportHtmlAsPdf",
             routeTemplate: "api/Invoices/SaveInvoiceReportHtmlAsPdf",
             defaults: new { controller = "Invoices", action = "SaveInvoiceReportHtmlAsPdf" }
             );
            // LoadAllCurrencyByName()



            config.Routes.MapHttpRoute(
		name: "FA_AssetsGetPSInvoiceDetails",
		routeTemplate: "api/FA_Assets/GetPSInvoiceDetails",
		defaults: new { controller = "FA_Assets", action = "GetPSInvoiceDetails" }
		);

			config.Routes.MapHttpRoute(
		name: "FA_AssetsIntializeData",
		routeTemplate: "api/FA_Assets/IntializeData",
		defaults: new { controller = "FA_Assets", action = "IntializeData" }
		);


			#endregion Mostafa Hany
			#region Accounting

			config.Routes.MapHttpRoute(
			  name: "GetPrintedDataIncomeStatement",
			  routeTemplate: "api/IncomeStatement/GetPrintedData",
			  defaults: new { controller = "IncomeStatement", action = "GetPrintedData" }
		  );

			config.Routes.MapHttpRoute(
  name: "FillSearchControlsIncomeStatement",
  routeTemplate: "api/IncomeStatement/FillSearchControls",
  defaults: new { controller = "IncomeStatement", action = "FillSearchControls" }
);

			config.Routes.MapHttpRoute(
			name: "InvestmentcostcentersLoadWithPaging",
			routeTemplate: "api/Investmentcostcenters/LoadWithPaging",
			defaults: new { controller = "Investmentcostcenters", action = "LoadWithPaging" }
			);

			config.Routes.MapHttpRoute(
				name: "InvestmentcostcentersInsertItems",
				routeTemplate: "api/Investmentcostcenters/InsertItems",
				defaults: new { controller = "Investmentcostcenters", action = "InsertItems" }
				);

			config.Routes.MapHttpRoute(
			 name: "InvestmentcostcentersFillComboDet",
			 routeTemplate: "api/Investmentcostcenters/FillComboDet",
			 defaults: new { controller = "Investmentcostcenters", action = "FillComboDet" }
			 );
			config.Routes.MapHttpRoute(
			 name: "InvestmentcostcentersGetTotalCS",
			 routeTemplate: "api/Investmentcostcenters/GetTotalCS",
			 defaults: new { controller = "Investmentcostcenters", action = "GetTotalCS" }
			 );



			#endregion

			#region CashPositionReport

			config.Routes.MapHttpRoute(
			  name: "GetPrintedDataCashPosition",
			  routeTemplate: "api/CashPosition/GetPrintedData",
			  defaults: new { controller = "CashPosition", action = "GetPrintedData" }
			);

			config.Routes.MapHttpRoute(
			  name: "GetPrintedDataSummaryCashPosition",
			  routeTemplate: "api/CashPosition/GetPrintedDataSummary",
			  defaults: new { controller = "CashPosition", action = "GetPrintedDataSummary" }
			);

			config.Routes.MapHttpRoute(
	  name: "FillFilteraCashPosition",
	  routeTemplate: "api/CashPosition/FillFilter",
	  defaults: new { controller = "CashPosition", action = "FillFilter" }
	);
            #endregion

            #region DownPayment
            config.Routes.MapHttpRoute(
           name: "GetVoucherDataByDownPaymentCode",
           routeTemplate: "api/Voucher/GetVoucherDataByDownPaymentCode",
           defaults: new { controller = "Voucher", action = "GetVoucherDataByDownPaymentCode" }
           );


            config.Routes.MapHttpRoute(
                name: "GetVoucherDataByCreditNoteCode",
                routeTemplate: "api/Voucher/GetVoucherDataByCreditNoteCode",
                defaults: new { controller = "Voucher", action = "GetVoucherDataByCreditNoteCode" }
                );




            #endregion

            #region Container Freight Station

            #region WH_CFS_Transactions
            config.Routes.MapHttpRoute(
			  name: "SaveRoadNumber",
			  routeTemplate: "api/WH_ManifestReport/SaveRoadNumber",
			  defaults: new { controller = "WH_ManifestReport", action = "SaveRoadNumber" }
		  );
			config.Routes.MapHttpRoute(
			 name: "WH_CFS_GateIn_Insert",
			 routeTemplate: "api/WH_CFS_GateIn/WH_CFS_GateIn_Insert",
			 defaults: new { controller = "WH_CFS_GateIn", action = "WH_CFS_GateIn_Insert" }
		 );
			config.Routes.MapHttpRoute(
			 name: "WH_CFS_GateInInventory_Update",
			 routeTemplate: "api/WH_CFS_GateInInventory/WH_CFS_GateInInventory_Update",
			 defaults: new { controller = "WH_CFS_GateInInventory", action = "WH_CFS_GateInInventory_Update" }
		 );
			config.Routes.MapHttpRoute(
			  name: "WH_CFS_Invoices_LoadItem",
			  routeTemplate: "api/WH_CFS_Invoices/WH_CFS_Invoices_LoadItem",
			  defaults: new { controller = "WH_CFS_Invoices", action = "WH_CFS_Invoices_LoadItem" }
		  );
			config.Routes.MapHttpRoute(
			  name: "GenerateReceivables",
			  routeTemplate: "api/WH_CFS_Invoices/GenerateReceivables",
			  defaults: new { controller = "WH_CFS_Invoices", action = "GenerateReceivables" }
		  );
			config.Routes.MapHttpRoute(
			  name: "GenerateReceivablesAndInvoicesForConsol",
			  routeTemplate: "api/WH_CFS_Invoices/GenerateReceivablesAndInvoicesForConsol",
			  defaults: new { controller = "WH_CFS_Invoices", action = "GenerateReceivablesAndInvoicesForConsol" }
		  );

			config.Routes.MapHttpRoute(
			 name: "CalculateSupplementary",
			 routeTemplate: "api/WH_CFS_Invoices/CalculateSupplementary",
			 defaults: new { controller = "WH_CFS_Invoices", action = "CalculateSupplementary" }
		 );

			config.Routes.MapHttpRoute(
			 name: "WH_CFS_Invoices_Report_Invoice",
			 routeTemplate: "api/WH_CFS_Invoices/Report_Invoice",
			 defaults: new { controller = "WH_CFS_Invoices", action = "Report_Invoice" }
		 );

			config.Routes.MapHttpRoute(
		   name: "Receivables_UpdateMultipleItems",
		   routeTemplate: "api/WH_CFS_Invoices/Receivables_UpdateMultipleItems",
		   defaults: new { controller = "WH_CFS_Invoices", action = "Receivables_UpdateMultipleItems" }
	   );
			config.Routes.MapHttpRoute(
			name: "Receivables_DeleteMultipleItems",
			routeTemplate: "api/WH_CFS_Invoices/Receivables_DeleteMultipleItems",
			defaults: new { controller = "WH_CFS_Invoices", action = "Receivables_DeleteMultipleItems" }
		);

			config.Routes.MapHttpRoute(
			  name: "Insert",
			  routeTemplate: "api/OperationContainersAndPackages/Insert",
			  defaults: new { controller = "OperationContainersAndPackages", action = "Insert" }
		  );
			config.Routes.MapHttpRoute(
			  name: "UpdateInvoice",
			  routeTemplate: "api/OperationContainersAndPackages/Update",
			  defaults: new { controller = "OperationContainersAndPackages", action = "Update" }
		  );
			config.Routes.MapHttpRoute(
			  name: "WH_CFS_ReleaseOrders_Insert",
			  routeTemplate: "api/WH_CFS_ReleaseOrders/WH_CFS_ReleaseOrders_Insert",
			  defaults: new { controller = "WH_CFS_ReleaseOrders", action = "WH_CFS_ReleaseOrders_Insert" }
		  );
			config.Routes.MapHttpRoute(
			  name: "WH_CFS_ReleaseOrders_Update",
			  routeTemplate: "api/WH_CFS_ReleaseOrders/WH_CFS_ReleaseOrders_Update",
			  defaults: new { controller = "WH_CFS_ReleaseOrders", action = "WH_CFS_ReleaseOrders_Update" }
		  );
			config.Routes.MapHttpRoute(
			  name: "WH_CFS_ReleaseOrderNotes_Save",
			  routeTemplate: "api/WH_CFS_ReleaseOrders/WH_CFS_ReleaseOrderNotes_Save",
			  defaults: new { controller = "WH_CFS_ReleaseOrders", action = "WH_CFS_ReleaseOrderNotes_Save" }
		  );
			config.Routes.MapHttpRoute(
			  name: "GetReleaseNumber",
			  routeTemplate: "api/WH_CFS_ReleaseOrders/GetReleaseNumber",
			  defaults: new { controller = "WH_CFS_ReleaseOrders", action = "GetReleaseNumber" }
		  );
			config.Routes.MapHttpRoute(
			  name: "GetNoteDetails",
			  routeTemplate: "api/WH_CFS_ReleaseOrders/GetNoteDetails",
			  defaults: new { controller = "WH_CFS_ReleaseOrders", action = "GetNoteDetails" }
		  );
            config.Routes.MapHttpRoute(
          name: "SendBackToInvoices",
          routeTemplate: "api/WH_CFS_ReleaseOrders/SendBackToInvoices",
          defaults: new { controller = "WH_CFS_ReleaseOrders", action = "SendBackToInvoices" }
      );
            config.Routes.MapHttpRoute(
			  name: "GetOperationRoadNumber",
			  routeTemplate: "api/WH_ManifestReport/GetOperationRoadNumber",
			  defaults: new { controller = "WH_ManifestReport", action = "GetOperationRoadNumber" }
		  );
			config.Routes.MapHttpRoute(
			  name: "GetOperations",
			  routeTemplate: "api/WH_ManifestReport/GetOperations",
			  defaults: new { controller = "WH_ManifestReport", action = "GetOperations" }
		  );
            config.Routes.MapHttpRoute(
          name: "WH_CFS_ReleaseVouchers_LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned",
          routeTemplate: "api/WH_ManifestReport/WH_CFS_ReleaseVouchers_LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned",
          defaults: new { controller = "WH_CFS_ReleaseVouchers", action = "WH_CFS_ReleaseVouchers_LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned" }
      );

            config.Routes.MapHttpRoute(
			name: "WH_CFS_ReleaseVouchersDetails_Insert",
			routeTemplate: "api/WH_CFS_ReleaseVouchers/WH_CFS_ReleaseVouchersDetails_Insert",
			defaults: new { controller = "WH_CFS_ReleaseVouchers", action = "WH_CFS_ReleaseVouchersDetails_Insert" }
			);  
			config.Routes.MapHttpRoute(
			name: "WH_CFS_ReleaseVouchersDetails_InsertPrint",
			routeTemplate: "api/WH_CFS_ReleaseVouchers/WH_CFS_ReleaseVouchersDetails_InsertPrint",
			defaults: new { controller = "WH_CFS_ReleaseVouchers", action = "WH_CFS_ReleaseVouchersDetails_InsertPrint" }
			);
            config.Routes.MapHttpRoute(
			name: "WH_CFS_ReleaseVouchersDetails_SendBack",
			routeTemplate: "api/WH_CFS_ReleaseVouchers/WH_CFS_ReleaseVouchersDetails_SendBack",
			defaults: new { controller = "WH_CFS_ReleaseVouchers", action = "WH_CFS_ReleaseVouchersDetails_SendBack" }
			);
            #endregion WH_CFS_Transactions

            #region WH_FCL_Tariff
            config.Routes.MapHttpRoute(
				name: "WH_FCL_Tariff_LoadAll",
				routeTemplate: "api/WH_FCL_Tariffs/WH_FCL_Tariff_LoadAll",
				defaults: new { controller = "WH_FCL_Tariffs", action = "WH_FCL_Tariff_LoadAll" }
				);
			config.Routes.MapHttpRoute(
				name: "WH_FCL_Tariff_LoadItem",
				routeTemplate: "api/WH_FCL_Tariffs/WH_FCL_Tariff_LoadItem",
				defaults: new { controller = "WH_FCL_Tariffs", action = "WH_FCL_Tariff_LoadItem" }
				);
			config.Routes.MapHttpRoute(
				name: "WH_FCL_Tariffs_LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned",
				routeTemplate: "api/WH_FCL_Tariffs/WH_FCL_Tariffs_LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned",
				defaults: new { controller = "WH_FCL_Tariffs", action = "WH_FCL_Tariffs_LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned" }
				);
			config.Routes.MapHttpRoute(
				name: "WH_FCL_Tariff_Save",
				routeTemplate: "api/WH_FCL_Tariffs/WH_FCL_Tariff_Save",
				defaults: new { controller = "WH_FCL_Tariffs", action = "WH_FCL_Tariff_Save" }
				);
			config.Routes.MapHttpRoute(
				name: "WH_FCL_Tariff_DeleteList",
				routeTemplate: "api/WH_FCL_Tariffs/WH_FCL_Tariff_DeleteList",
				defaults: new { controller = "WH_FCL_Tariffs", action = "WH_FCL_Tariff_DeleteList" }
				);
			config.Routes.MapHttpRoute(
				name: "WH_FCL_Tariff_Details_LoadItem",
				routeTemplate: "api/WH_FCL_Tariffs/WH_FCL_Tariff_Details_LoadItem",
				defaults: new { controller = "WH_FCL_Tariffs", action = "WH_FCL_Tariff_Details_LoadItem" }
				);
			config.Routes.MapHttpRoute(
				name: "GetCalcTypesID",
				routeTemplate: "api/WH_FCL_Tariffs/GetCalcTypesID",
				defaults: new { controller = "WH_FCL_Tariffs", action = "GetCalcTypesID" }
				);

			config.Routes.MapHttpRoute(
				name: "WH_FCL_Tariff_Details_LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned",
				routeTemplate: "api/WH_FCL_Tariffs/WH_FCL_Tariff_Details_LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned",
				defaults: new { controller = "WH_FCL_Tariffs", action = "WH_FCL_Tariff_Details_LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned" }
				);
			config.Routes.MapHttpRoute(
				name: "WH_FCL_Tariff_Details_Save",
				routeTemplate: "api/WH_FCL_Tariffs/WH_FCL_Tariff_Details_Save",
				defaults: new { controller = "WH_FCL_Tariffs", action = "WH_FCL_Tariff_Details_Save" }
				);
			config.Routes.MapHttpRoute(
				name: "WH_FCL_Tariff_Details_DeleteList",
				routeTemplate: "api/WH_FCL_Tariffs/WH_FCL_Tariff_Details_DeleteList",
				defaults: new { controller = "WH_FCL_Tariffs", action = "WH_FCL_Tariff_Details_DeleteList" }
				);
			config.Routes.MapHttpRoute(
				name: "WH_FCL_Tariff_Imo_LoadItem",
				routeTemplate: "api/WH_FCL_Tariffs/WH_FCL_Tariff_Imo_LoadItem",
				defaults: new { controller = "WH_FCL_Tariffs", action = "WH_FCL_Tariff_Imo_LoadItem" }
				);
			config.Routes.MapHttpRoute(
				name: "WH_FCL_Tariff_Imo_LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned",
				routeTemplate: "api/WH_FCL_Tariffs/WH_FCL_Tariff_Imo_LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned",
				defaults: new { controller = "WH_FCL_Tariffs", action = "WH_FCL_Tariff_Imo_LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned" }
				);
			config.Routes.MapHttpRoute(
				name: "WH_FCL_Tariff_Imo_Save",
				routeTemplate: "api/WH_FCL_Tariffs/WH_FCL_Tariff_Imo_Save",
				defaults: new { controller = "WH_FCL_Tariffs", action = "WH_FCL_Tariff_Imo_Save" }
				);
			config.Routes.MapHttpRoute(
				name: "WH_FCL_Tariff_Imo_DeleteList",
				routeTemplate: "api/WH_FCL_Tariffs/WH_FCL_Tariff_Imo_DeleteList",
				defaults: new { controller = "WH_FCL_Tariffs", action = "WH_FCL_Tariff_Imo_DeleteList" }
				);
			config.Routes.MapHttpRoute(
				name: "WH_FCL_Tariff_Details_Periods_LoadItem",
				routeTemplate: "api/WH_FCL_Tariffs/WH_FCL_Tariff_Details_Periods_LoadItem",
				defaults: new { controller = "WH_FCL_Tariffs", action = "WH_FCL_Tariff_Details_Periods_LoadItem" }
				);
			config.Routes.MapHttpRoute(
				name: "WH_FCL_Tariff_Details_Periods_LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned",
				routeTemplate: "api/WH_FCL_Tariffs/WH_FCL_Tariff_Details_Periods_LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned",
				defaults: new { controller = "WH_FCL_Tariffs", action = "WH_FCL_Tariff_Details_Periods_LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned" }
				);
			config.Routes.MapHttpRoute(
				name: "WH_FCL_Tariff_Details_Periods_Save",
				routeTemplate: "api/WH_FCL_Tariffs/WH_FCL_Tariff_Details_Periods_Save",
				defaults: new { controller = "WH_FCL_Tariffs", action = "WH_FCL_Tariff_Details_Periods_Save" }
				);
			config.Routes.MapHttpRoute(
				name: "WH_FCL_Tariff_Details_Periods_DeleteList",
				routeTemplate: "api/WH_FCL_Tariffs/WH_FCL_Tariff_Details_Periods_DeleteList",
				defaults: new { controller = "WH_FCL_Tariffs", action = "WH_FCL_Tariff_Details_Periods_DeleteList" }
				);
			#endregion WH_FCL_Tariff

			#region WH_CSL_Tariff
			config.Routes.MapHttpRoute(
				name: "WH_CSL_Tariff_LoadAll",
				routeTemplate: "api/WH_CSL_Tariffs/WH_CSL_Tariff_LoadAll",
				defaults: new { controller = "WH_CSL_Tariffs", action = "WH_CSL_Tariff_LoadAll" }
				);
			config.Routes.MapHttpRoute(
				name: "WH_CSL_Tariff_LoadItem",
				routeTemplate: "api/WH_CSL_Tariffs/WH_CSL_Tariff_LoadItem",
				defaults: new { controller = "WH_CSL_Tariffs", action = "WH_CSL_Tariff_LoadItem" }
				);
			config.Routes.MapHttpRoute(
	name: "WH_CSL_Tariffs_LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned",
	routeTemplate: "api/WH_CSL_Tariffs/WH_CSL_Tariffs_LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned",
	defaults: new { controller = "WH_CSL_Tariffs", action = "WH_CSL_Tariffs_LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned" }
	);
			config.Routes.MapHttpRoute(
name: "WH_CSL_Tariff_Save",
routeTemplate: "api/WH_CSL_Tariffs/WH_CSL_Tariff_Save",
defaults: new { controller = "WH_CSL_Tariffs", action = "WH_CSL_Tariff_Save" }
);
			config.Routes.MapHttpRoute(
name: "WH_CSL_Tariff_DeleteList",
routeTemplate: "api/WH_CSL_Tariffs/WH_CSL_Tariff_DeleteList",
defaults: new { controller = "WH_CSL_Tariffs", action = "WH_CSL_Tariff_DeleteList" }
);
			config.Routes.MapHttpRoute(
name: "WH_CSL_Tariff_Details_LoadItem",
routeTemplate: "api/WH_CSL_Tariffs/WH_CSL_Tariff_Details_LoadItem",
defaults: new { controller = "WH_CSL_Tariffs", action = "WH_CSL_Tariff_Details_LoadItem" }
);
			config.Routes.MapHttpRoute(
	name: "GetCalcTypesIDCSL",
	routeTemplate: "api/WH_CSL_Tariffs/GetCalcTypesID",
	defaults: new { controller = "WH_CSL_Tariffs", action = "GetCalcTypesID" }
	);
			config.Routes.MapHttpRoute(
name: "WH_CSL_Tariff_Details_LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned",
routeTemplate: "api/WH_CSL_Tariffs/WH_CSL_Tariff_Details_LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned",
defaults: new { controller = "WH_CSL_Tariffs", action = "WH_CSL_Tariff_Details_LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned" }
);
			config.Routes.MapHttpRoute(
name: "WH_CSL_Tariff_Details_Save",
routeTemplate: "api/WH_CSL_Tariffs/WH_CSL_Tariff_Details_Save",
defaults: new { controller = "WH_CSL_Tariffs", action = "WH_CSL_Tariff_Details_Save" }
);
			config.Routes.MapHttpRoute(
name: "WH_CSL_Tariff_Details_DeleteList",
routeTemplate: "api/WH_CSL_Tariffs/WH_CSL_Tariff_Details_DeleteList",
defaults: new { controller = "WH_CSL_Tariffs", action = "WH_CSL_Tariff_Details_DeleteList" }
);
			config.Routes.MapHttpRoute(
name: "WH_CSL_Tariff_Imo_LoadItem",
routeTemplate: "api/WH_CSL_Tariffs/WH_CSL_Tariff_Imo_LoadItem",
defaults: new { controller = "WH_CSL_Tariffs", action = "WH_CSL_Tariff_Imo_LoadItem" }
);
			config.Routes.MapHttpRoute(
name: "WH_CSL_Tariff_Imo_LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned",
routeTemplate: "api/WH_CSL_Tariffs/WH_CSL_Tariff_Imo_LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned",
defaults: new { controller = "WH_CSL_Tariffs", action = "WH_CSL_Tariff_Imo_LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned" }
);
			config.Routes.MapHttpRoute(
name: "WH_CSL_Tariff_Imo_Save",
routeTemplate: "api/WH_CSL_Tariffs/WH_CSL_Tariff_Imo_Save",
defaults: new { controller = "WH_CSL_Tariffs", action = "WH_CSL_Tariff_Imo_Save" }
);
			config.Routes.MapHttpRoute(
name: "WH_CSL_Tariff_Imo_DeleteList",
routeTemplate: "api/WH_CSL_Tariffs/WH_CSL_Tariff_Imo_DeleteList",
defaults: new { controller = "WH_CSL_Tariffs", action = "WH_CSL_Tariff_Imo_DeleteList" }
);
			config.Routes.MapHttpRoute(
name: "WH_CSL_Tariff_Details_Periods_LoadItem",
routeTemplate: "api/WH_CSL_Tariffs/WH_CSL_Tariff_Details_Periods_LoadItem",
defaults: new { controller = "WH_CSL_Tariffs", action = "WH_CSL_Tariff_Details_Periods_LoadItem" }
);
			config.Routes.MapHttpRoute(
name: "WH_CSL_Tariff_Details_Periods_LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned",
routeTemplate: "api/WH_CSL_Tariffs/WH_CSL_Tariff_Details_Periods_LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned",
defaults: new { controller = "WH_CSL_Tariffs", action = "WH_CSL_Tariff_Details_Periods_LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned" }
);
			config.Routes.MapHttpRoute(
name: "WH_CSL_Tariff_Details_Periods_Save",
routeTemplate: "api/WH_CSL_Tariffs/WH_CSL_Tariff_Details_Periods_Save",
defaults: new { controller = "WH_CSL_Tariffs", action = "WH_CSL_Tariff_Details_Periods_Save" }
);
			config.Routes.MapHttpRoute(
name: "WH_CSL_Tariff_Details_Periods_DeleteList",
routeTemplate: "api/WH_CSL_Tariffs/WH_CSL_Tariff_Details_Periods_DeleteList",
defaults: new { controller = "WH_CSL_Tariffs", action = "WH_CSL_Tariff_Details_Periods_DeleteList" }
);
			config.Routes.MapHttpRoute(
name: "WH_CSL_Tariff_LoadWithWhereClause",
routeTemplate: "api/WH_CSL_Tariffs/LoadWithWhereClause",
defaults: new { controller = "WH_CSL_Tariffs", action = "LoadWithWhereClause" }
);
			#endregion WH_CSL_Tariff


			#endregion

			#region Container Yard

			#region WH_MTY_Tariff
			config.Routes.MapHttpRoute(
				name: "WH_MTY_Tariff_LoadAll",
				routeTemplate: "api/WH_MTY_Tariffs/WH_MTY_Tariff_LoadAll",
				defaults: new { controller = "WH_MTY_Tariffs", action = "WH_MTY_Tariff_LoadAll" }
				);
			config.Routes.MapHttpRoute(
				name: "WH_MTY_Tariff_LoadItem",
				routeTemplate: "api/WH_MTY_Tariffs/WH_MTY_Tariff_LoadItem",
				defaults: new { controller = "WH_MTY_Tariffs", action = "WH_MTY_Tariff_LoadItem" }
				);
			config.Routes.MapHttpRoute(
				name: "WH_MTY_Tariffs_LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned",
				routeTemplate: "api/WH_MTY_Tariffs/WH_MTY_Tariffs_LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned",
				defaults: new { controller = "WH_MTY_Tariffs", action = "WH_MTY_Tariffs_LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned" }
				);
			config.Routes.MapHttpRoute(
				name: "WH_MTY_Tariff_Save",
				routeTemplate: "api/WH_MTY_Tariffs/WH_MTY_Tariff_Save",
				defaults: new { controller = "WH_MTY_Tariffs", action = "WH_MTY_Tariff_Save" }
				);
			config.Routes.MapHttpRoute(
				name: "WH_MTY_Tariff_DeleteList",
				routeTemplate: "api/WH_MTY_Tariffs/WH_MTY_Tariff_DeleteList",
				defaults: new { controller = "WH_MTY_Tariffs", action = "WH_MTY_Tariff_DeleteList" }
				);
			config.Routes.MapHttpRoute(
				name: "WH_MTY_Tariff_Details_LoadItem",
				routeTemplate: "api/WH_MTY_Tariffs/WH_MTY_Tariff_Details_LoadItem",
				defaults: new { controller = "WH_MTY_Tariffs", action = "WH_MTY_Tariff_Details_LoadItem" }
				);
			config.Routes.MapHttpRoute(
name: "GetCalcTypesIDMTY",
routeTemplate: "api/WH_MTY_Tariffs/GetCalcTypesID",
defaults: new { controller = "WH_MTY_Tariffs", action = "GetCalcTypesID" }
);
			config.Routes.MapHttpRoute(
				name: "WH_MTY_Tariff_Details_LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned",
				routeTemplate: "api/WH_MTY_Tariffs/WH_MTY_Tariff_Details_LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned",
				defaults: new { controller = "WH_MTY_Tariffs", action = "WH_MTY_Tariff_Details_LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned" }
				);
			config.Routes.MapHttpRoute(
				name: "WH_MTY_Tariff_Details_Save",
				routeTemplate: "api/WH_MTY_Tariffs/WH_MTY_Tariff_Details_Save",
				defaults: new { controller = "WH_MTY_Tariffs", action = "WH_MTY_Tariff_Details_Save" }
				);
			config.Routes.MapHttpRoute(
				name: "WH_MTY_Tariff_Details_DeleteList",
				routeTemplate: "api/WH_MTY_Tariffs/WH_MTY_Tariff_Details_DeleteList",
				defaults: new { controller = "WH_MTY_Tariffs", action = "WH_MTY_Tariff_Details_DeleteList" }
				);
			config.Routes.MapHttpRoute(
				name: "WH_MTY_Tariff_Details_Periods_LoadItem",
				routeTemplate: "api/WH_MTY_Tariffs/WH_MTY_Tariff_Details_Periods_LoadItem",
				defaults: new { controller = "WH_MTY_Tariffs", action = "WH_MTY_Tariff_Details_Periods_LoadItem" }
				);
			config.Routes.MapHttpRoute(
				name: "WH_MTY_Tariff_Details_Periods_LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned",
				routeTemplate: "api/WH_MTY_Tariffs/WH_MTY_Tariff_Details_Periods_LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned",
				defaults: new { controller = "WH_MTY_Tariffs", action = "WH_MTY_Tariff_Details_Periods_LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned" }
				);
			config.Routes.MapHttpRoute(
				name: "WH_MTY_Tariff_Details_Periods_Save",
				routeTemplate: "api/WH_MTY_Tariffs/WH_MTY_Tariff_Details_Periods_Save",
				defaults: new { controller = "WH_MTY_Tariffs", action = "WH_MTY_Tariff_Details_Periods_Save" }
				);
			config.Routes.MapHttpRoute(
				name: "WH_MTY_Tariff_Details_Periods_DeleteList",
				routeTemplate: "api/WH_MTY_Tariffs/WH_MTY_Tariff_Details_Periods_DeleteList",
				defaults: new { controller = "WH_MTY_Tariffs", action = "WH_MTY_Tariff_Details_Periods_DeleteList" }
				);
			#endregion WH_MTY_Tariff

			#region WH_CntrStock
			config.Routes.MapHttpRoute(
				name: "WH_CntrStock_LoadAll",
				routeTemplate: "api/WH_CntrStocks/WH_CntrStock_LoadAll",
				defaults: new { controller = "WH_CntrStocks", action = "WH_CntrStock_LoadAll" }
				);
			config.Routes.MapHttpRoute(
				name: "WH_CntrStock_LoadItem",
				routeTemplate: "api/WH_CntrStocks/WH_CntrStock_LoadItem",
				defaults: new { controller = "WH_CntrStocks", action = "WH_CntrStock_LoadItem" }
				);
			config.Routes.MapHttpRoute(
				name: "WH_CntrStocks_LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned",
				routeTemplate: "api/WH_CntrStock/WH_CntrStocks_LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned",
				defaults: new { controller = "WH_CntrStocks", action = "WH_CntrStocks_LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned" }
				);
			config.Routes.MapHttpRoute(
				name: "WH_CntrStock_Save",
				routeTemplate: "api/WH_CntrStocks/WH_CntrStock_Save",
				defaults: new { controller = "WH_CntrStocks", action = "WH_CntrStock_Save" }
				);
			config.Routes.MapHttpRoute(
				name: "WH_CntrStock_DeleteList",
				routeTemplate: "api/WH_CntrStocks/WH_CntrStock_DeleteList",
				defaults: new { controller = "WH_CntrStocks", action = "WH_CntrStock_DeleteList" }
				);
			config.Routes.MapHttpRoute(
				name: "WH_Hire_LoadAll",
				routeTemplate: "api/WH_CntrStocks/WH_Hire_LoadAll",
				defaults: new { controller = "WH_CntrStocks", action = "WH_Hire_LoadAll" }
				);
			config.Routes.MapHttpRoute(
				name: "WH_Hire_LoadItem",
				routeTemplate: "api/WH_CntrStocks/WH_Hire_LoadItem",
				defaults: new { controller = "WH_CntrStocks", action = "WH_Hire_LoadItem" }
				);
			config.Routes.MapHttpRoute(
				name: "WH_Hire_Save",
				routeTemplate: "api/WH_CntrStocks/WH_Hire_Save",
				defaults: new { controller = "WH_CntrStocks", action = "WH_Hire_Save" }
				);
			config.Routes.MapHttpRoute(
				name: "WH_Hire_DeleteList",
				routeTemplate: "api/WH_CntrStocks/WH_Hire_DeleteList",
				defaults: new { controller = "WH_CntrStocks", action = "WH_Hire_DeleteList" }
				);
			config.Routes.MapHttpRoute(
				name: "GetWH_CntrStockID",
				routeTemplate: "api/WH_CntrStocks/GetWH_CntrStockID",
				defaults: new { controller = "WH_CntrStocks", action = "GetWH_CntrStockID" }
				);
			#endregion
			#region WH_MTY_GateIn
			config.Routes.MapHttpRoute(
				name: "WH_MTY_GateIn_LoadAll",
				routeTemplate: "api/WH_MTY_GateIn/WH_MTY_GateIn_LoadAll",
				defaults: new { controller = "WH_MTY_GateIn", action = "WH_MTY_GateIn_LoadAll" }
				);
			config.Routes.MapHttpRoute(
				name: "WH_MTY_GateIn_LoadItem",
				routeTemplate: "api/WH_MTY_GateIn/WH_MTY_GateIn_LoadItem",
				defaults: new { controller = "WH_MTY_GateIn", action = "WH_MTY_GateIn_LoadItem" }
				);
			config.Routes.MapHttpRoute(
				name: "WH_MTY_GateIn_LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned",
				routeTemplate: "api/WH_MTY_GateIn/WH_MTY_GateIn_LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned",
				defaults: new { controller = "WH_MTY_GateIn", action = "WH_MTY_GateIn_LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned" }
				);
			config.Routes.MapHttpRoute(
				name: "WH_MTY_GateIn_Save",
				routeTemplate: "api/WH_MTY_GateIn/WH_MTY_GateIn_Save",
				defaults: new { controller = "WH_MTY_GateIn", action = "WH_MTY_GateIn_Save" }
				);
			config.Routes.MapHttpRoute(
				name: "WH_MTY_GateIn_DeleteList",
				routeTemplate: "api/WH_MTY_GateIn/WH_MTY_GateIn_DeleteList",
				defaults: new { controller = "WH_MTY_GateIn", action = "WH_MTY_GateIn_DeleteList" }
				);
			config.Routes.MapHttpRoute(
				name: "GetWarehouseAreas",
				routeTemplate: "api/WH_MTY_GateIn/GetWarehouseAreas",
				defaults: new { controller = "WH_MTY_GateIn", action = "GetWarehouseAreas" }
				);
			config.Routes.MapHttpRoute(
				name: "GetAreaRows",
				routeTemplate: "api/WH_MTY_GateIn/GetAreaRows",
				defaults: new { controller = "WH_MTY_GateIn", action = "GetAreaRows" }
				);
			config.Routes.MapHttpRoute(
				name: "GetRowLocations",
				routeTemplate: "api/WH_MTY_GateIn/GetRowLocations",
				defaults: new { controller = "WH_MTY_GateIn", action = "GetRowLocations" }
				);
			#endregion
			#region WH_MTY_Inventory
			config.Routes.MapHttpRoute(
				name: "WH_MTY_Inventory_LoadAll",
				routeTemplate: "api/WH_MTY_Inventory/WH_MTY_Inventory_LoadAll",
				defaults: new { controller = "WH_MTY_Inventory", action = "WH_MTY_Inventory_LoadAll" }
				);
			config.Routes.MapHttpRoute(
				name: "WH_MTY_Inventory_LoadItem",
				routeTemplate: "api/WH_MTY_Inventory/WH_MTY_Inventory_LoadItem",
				defaults: new { controller = "WH_MTY_Inventory", action = "WH_MTY_Inventory_LoadItem" }
				);
			config.Routes.MapHttpRoute(
				name: "WH_MTY_Inventory_LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned",
				routeTemplate: "api/WH_MTY_Inventory/WH_MTY_Inventory_LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned",
				defaults: new { controller = "WH_MTY_Inventory", action = "WH_MTY_Inventory_LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned" }
				);
			config.Routes.MapHttpRoute(
				name: "WH_MTY_Inventory_Save",
				routeTemplate: "api/WH_MTY_Inventory/WH_MTY_Inventory_Save",
				defaults: new { controller = "WH_MTY_Inventory", action = "WH_MTY_Inventory_Save" }
				);
			config.Routes.MapHttpRoute(
				name: "WH_MTY_Inventory_DeleteList",
				routeTemplate: "api/WH_MTY_Inventory/WH_MTY_Inventory_DeleteList",
				defaults: new { controller = "WH_MTY_Inventory", action = "WH_MTY_Inventory_DeleteList" }
				);
			config.Routes.MapHttpRoute(
				name: "GetWarehouseAreasI",
				routeTemplate: "api/WH_MTY_Inventory/GetWarehouseAreas",
				defaults: new { controller = "WH_MTY_Inventory", action = "GetWarehouseAreas" }
				);
			config.Routes.MapHttpRoute(
				name: "GetAreaRowsI",
				routeTemplate: "api/WH_MTY_Inventory/GetAreaRows",
				defaults: new { controller = "WH_MTY_Inventory", action = "GetAreaRows" }
				);
			config.Routes.MapHttpRoute(
				name: "GetRowLocationsI",
				routeTemplate: "api/WH_MTY_Inventory/GetRowLocations",
				defaults: new { controller = "WH_MTY_Inventory", action = "GetRowLocations" }
				);
			config.Routes.MapHttpRoute(
				name: "CalculateInvItms",
				routeTemplate: "api/WH_MTY_Inventory/CalculateInvItms",
				defaults: new { controller = "WH_MTY_Inventory", action = "CalculateInvItms" }
				);
			#endregion
			#region WH_MTY_GateOut
			config.Routes.MapHttpRoute(
				name: "WH_MTY_GateOut_LoadAll",
				routeTemplate: "api/WH_MTY_GateOut/WH_MTY_GateOut_LoadAll",
				defaults: new { controller = "WH_MTY_GateOut", action = "WH_MTY_GateOut_LoadAll" }
				);
			config.Routes.MapHttpRoute(
				name: "WH_MTY_GateOut_LoadItem",
				routeTemplate: "api/WH_MTY_GateOut/WH_MTY_GateOut_LoadItem",
				defaults: new { controller = "WH_MTY_GateOut", action = "WH_MTY_GateOut_LoadItem" }
				);
			config.Routes.MapHttpRoute(
				name: "WH_MTY_GateOut_LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned",
				routeTemplate: "api/WH_MTY_GateOut/WH_MTY_GateOut_LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned",
				defaults: new { controller = "WH_MTY_GateOut", action = "WH_MTY_GateOut_LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned" }
				);
			config.Routes.MapHttpRoute(
				name: "WH_MTY_GateOut_Save",
				routeTemplate: "api/WH_MTY_GateOut/WH_MTY_GateOut_Save",
				defaults: new { controller = "WH_MTY_GateOut", action = "WH_MTY_GateOut_Save" }
				);
			config.Routes.MapHttpRoute(
				name: "WH_MTY_GateOut_DeleteList",
				routeTemplate: "api/WH_MTY_GateOut/WH_MTY_GateOut_DeleteList",
				defaults: new { controller = "WH_MTY_GateOut", action = "WH_MTY_GateOut_DeleteList" }
				);
			config.Routes.MapHttpRoute(
				name: "GetWarehouseAreasOut",
				routeTemplate: "api/WH_MTY_GateOut/GetWarehouseAreas",
				defaults: new { controller = "WH_MTY_GateOut", action = "GetWarehouseAreas" }
				);
			config.Routes.MapHttpRoute(
				name: "GetAreaRowsOut",
				routeTemplate: "api/WH_MTY_GateOut/GetAreaRows",
				defaults: new { controller = "WH_MTY_GateOut", action = "GetAreaRows" }
				);
			config.Routes.MapHttpRoute(
				name: "GetRowLocationsOut",
				routeTemplate: "api/WH_MTY_GateOut/GetRowLocations",
				defaults: new { controller = "WH_MTY_GateOut", action = "GetRowLocations" }
				);
			config.Routes.MapHttpRoute(
				name: "GetCntrInfoOut",
				routeTemplate: "api/WH_MTY_GateOut/GetCntrInfo",
				defaults: new { controller = "WH_MTY_GateOut", action = "GetCntrInfo" }
				);

			#endregion
			#endregion
			#region Pricing
			config.Routes.MapHttpRoute(
name: "Pricing_GetPricingPrintData",
routeTemplate: "api/Pricing/GetPricingPrintData",
defaults: new { controller = "Pricing", action = "GetPricingPrintData" }
);

            config.Routes.MapHttpRoute(
name: "Pricing_Pricing_SaveList",
routeTemplate: "api/Pricing/Pricing_SaveList",
defaults: new { controller = "Pricing", action = "Pricing_SaveList" }
);


            #endregion

            #region Bookings
            config.Routes.MapHttpRoute(
				name: "Bookings_LoadAll",
				routeTemplate: "api/Bookings/LoadAll",
				defaults: new { controller = "Bookings", action = "LoadAll" }
			);
			config.Routes.MapHttpRoute(
				name: "Bookings_LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned",
				routeTemplate: "api/Bookings/LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned",
				defaults: new { controller = "Bookings", action = "LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned" }
			);
			config.Routes.MapHttpRoute(
				name: "Bookings_Insert",
				routeTemplate: "api/Bookings/Insert",
				defaults: new { controller = "Bookings", action = "Insert" }
			);
			config.Routes.MapHttpRoute(
				name: "Bookings_Update",
				routeTemplate: "api/Bookings/Update",
				defaults: new { controller = "Bookings", action = "Update" }
			);
			config.Routes.MapHttpRoute(
				name: "Bookings_Delete",
				routeTemplate: "api/Bookings/Delete",
				defaults: new { controller = "Bookings", action = "Delete" }
			);
			config.Routes.MapHttpRoute(
				name: "Bookings_InsertListFromExcel_Bookings",
				routeTemplate: "api/Bookings/InsertListFromExcel_Bookings",
				defaults: new { controller = "Bookings", action = "InsertListFromExcel_Bookings" }
			);
            config.Routes.MapHttpRoute(
                name: "Bookings_LinkCustomersLatt",
                routeTemplate: "api/Bookings/LinkCustomersLatt",
                defaults: new { controller = "Bookings", action = "LinkCustomersLatt" }
            );
            #endregion
            #region Zatca

            config.Routes.MapHttpRoute(
                name: "SendSalesInvoices_GetSalesInvoicesFilters",
                routeTemplate: "api/SendSalesInvoices/GetSalesInvoicesFilters",
                defaults: new { controller = "SendSalesInvoices", action = "GetSalesInvoicesFilters" }
            );
            config.Routes.MapHttpRoute(
                name: "SendSalesInvoices_SendInvoicesToZatcaAsync",
                routeTemplate: "api/SendSalesInvoices/SendInvoicesToZatcaAsync",
                defaults: new { controller = "SendSalesInvoices", action = "SendInvoicesToZatcaAsync" }
            );
            config.Routes.MapHttpRoute(
                name: "SendSalesInvoices_SendSalesInvoicesToZatcaAsync",
                routeTemplate: "api/SendSalesInvoices/SendSalesInvoicesToZatcaAsync",
                defaults: new { controller = "SendSalesInvoices", action = "SendSalesInvoicesToZatcaAsync" }
            );
            config.Routes.MapHttpRoute(
                name: "SendSalesInvoices_SendTruckingInvoicesToZatcaAsync",
                routeTemplate: "api/SendSalesInvoices/SendTruckingInvoicesToZatcaAsync",
                defaults: new { controller = "SendSalesInvoices", action = "SendTruckingInvoicesToZatcaAsync" }
            );
            config.Routes.MapHttpRoute(
                name: "SendSalesInvoices_IntializeData",
                routeTemplate: "api/SendSalesInvoices/IntializeData",
                defaults: new { controller = "SendSalesInvoices", action = "IntializeData" }
            );
            config.Routes.MapHttpRoute(
                name: "SendSalesInvoices_SearchByInvoiceNumber",
                routeTemplate: "api/SendSalesInvoices/SearchByInvoiceNumber",
                defaults: new { controller = "SendSalesInvoices", action = "SearchByInvoiceNumber" }
            );
            config.Routes.MapHttpRoute(
                name: "SendSalesInvoices_SearchByInvoiceNumber_Trucking",
                routeTemplate: "api/SendSalesInvoices/SearchByInvoiceNumber_Trucking",
                defaults: new { controller = "SendSalesInvoices", action = "SearchByInvoiceNumber_Trucking" }
            );
            config.Routes.MapHttpRoute(
                name: "SendSalesInvoices_SearchByInvoiceNumber_Sales",
                routeTemplate: "api/SendSalesInvoices/SearchByInvoiceNumber_Sales",
                defaults: new { controller = "SendSalesInvoices", action = "SearchByInvoiceNumber_Sales" }
            );
            config.Routes.MapHttpRoute(
                name: "SendSalesInvoices_LoadWithpaging_SearchByInvoiceNumber_Trucking",
                routeTemplate: "api/SendSalesInvoices/LoadWithpaging_SearchByInvoiceNumber_Trucking",
                defaults: new { controller = "SendSalesInvoices", action = "LoadWithpaging_SearchByInvoiceNumber_Trucking" }
            );
            config.Routes.MapHttpRoute(
                name: "SendSalesInvoices_LoadWithpaging_SearchByInvoiceNumber",
                routeTemplate: "api/SendSalesInvoices/LoadWithpaging_SearchByInvoiceNumber",
                defaults: new { controller = "SendSalesInvoices", action = "LoadWithpaging_SearchByInvoiceNumber" }
            );
            config.Routes.MapHttpRoute(
                name: "SubmittedInvoicesGetSalesInvoicesFilters",
                routeTemplate: "api/SubmittedInvoices/GetSalesInvoicesFilters",
                defaults: new { controller = "SubmittedInvoices", action = "GetSalesInvoicesFilters" }
            );
            config.Routes.MapHttpRoute(
                name: "SubmittedInvoicesIntializeData",
                routeTemplate: "api/SubmittedInvoices/IntializeData",
                defaults: new { controller = "SubmittedInvoices", action = "IntializeData" }
            );
            config.Routes.MapHttpRoute(
                name: "SubmittedInvoicesSearchByInvoiceNumber",
                routeTemplate: "api/SubmittedInvoices/SearchByInvoiceNumber",
                defaults: new { controller = "SubmittedInvoices", action = "SearchByInvoiceNumber" }
            );
            config.Routes.MapHttpRoute(
                name: "SubmittedInvoicesLoadAllFilters",
                routeTemplate: "api/SubmittedInvoices/LoadAllFilters",
                defaults: new { controller = "SubmittedInvoices", action = "LoadAllFilters" }
            );

            #endregion
            #region InvoicesLOG
            config.Routes.MapHttpRoute(
                name: "InvoicesLOGGetSalesInvoicesFilters",
                routeTemplate: "api/InvoicesLOG/GetSalesInvoicesFilters",
                defaults: new { controller = "InvoicesLOG", action = "GetSalesInvoicesFilters" }
            );
            config.Routes.MapHttpRoute(
                name: "InvoicesLOGIntializeData",
                routeTemplate: "api/InvoicesLOG/IntializeData",
                defaults: new { controller = "InvoicesLOG", action = "IntializeData" }
            );
            config.Routes.MapHttpRoute(
                name: "InvoicesLOGSearchByInvoiceNumber",
                routeTemplate: "api/InvoicesLOG/SearchByInvoiceNumber",
                defaults: new { controller = "InvoicesLOG", action = "SearchByInvoiceNumber" }
            );
            config.Routes.MapHttpRoute(
                name: "InvoicesLOGLoadAllFilters",
                routeTemplate: "api/InvoicesLOG/LoadAllFilters",
                defaults: new { controller = "InvoicesLOG", action = "LoadAllFilters" }
            );
            #endregion
            #region SendDebitAndCredit
            config.Routes.MapHttpRoute(
                name: "SendDebitAndCreditGetSalesInvoicesFilters",
                routeTemplate: "api/SendDebitAndCredit/GetSalesInvoicesFilters",
                defaults: new { controller = "SendDebitAndCredit", action = "GetSalesInvoicesFilters" }
            );
            config.Routes.MapHttpRoute(
                name: "SendDebitAndCreditIntializeData",
                routeTemplate: "api/SendDebitAndCredit/IntializeData",
                defaults: new { controller = "SendDebitAndCredit", action = "IntializeData" }
            );
            config.Routes.MapHttpRoute(
                name: "SendDebitAndCreditSearchByInvoiceNumber",
                routeTemplate: "api/SendDebitAndCredit/SearchByInvoiceNumber",
                defaults: new { controller = "SendDebitAndCredit", action = "SearchByInvoiceNumber" }
            );
            config.Routes.MapHttpRoute(
                name: "SendDebitAndCreditLoadAllFilters",
                routeTemplate: "api/SendDebitAndCredit/LoadAllFilters",
                defaults: new { controller = "SendDebitAndCredit", action = "LoadAllFilters" }
            );
            #endregion

            #region SubmittedDebitAndCredit
            config.Routes.MapHttpRoute(
                name: "SubmittedDebitAndCreditGetSalesInvoicesFilters",
                routeTemplate: "api/SubmittedDebitAndCredit/GetSalesInvoicesFilters",
                defaults: new { controller = "SubmittedDebitAndCredit", action = "GetSalesInvoicesFilters" }
            );
            config.Routes.MapHttpRoute(
                name: "SubmittedDebitAndCreditIntializeData",
                routeTemplate: "api/SubmittedDebitAndCredit/IntializeData",
                defaults: new { controller = "SubmittedDebitAndCredit", action = "IntializeData" }
            );
            config.Routes.MapHttpRoute(
                name: "SubmittedDebitAndCreditSearchByInvoiceNumber",
                routeTemplate: "api/SubmittedDebitAndCredit/SearchByInvoiceNumber",
                defaults: new { controller = "SubmittedDebitAndCredit", action = "SearchByInvoiceNumber" }
            );
            config.Routes.MapHttpRoute(
                name: "SubmittedDebitAndCreditLoadAllFilters",
                routeTemplate: "api/SubmittedDebitAndCredit/LoadAllFilters",
                defaults: new { controller = "SubmittedDebitAndCredit", action = "LoadAllFilters" }
            );
            #endregion

            config.Routes.MapHttpRoute(
           name: "GetStatisticsFilter",
           routeTemplate: "api/ConsolidationHandlingCoLoadReports/GetStatisticsFilter",
           defaults: new { controller = "ConsolidationHandlingCoLoadReports", action = "GetStatisticsFilter" }
           );






            config.Routes.MapHttpRoute(
            name: "ShipLinkInvoicePostingLoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned",
            routeTemplate: "api/ShipLinkInvoicePosting/LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned",
            defaults: new { controller = "ShipLinkInvoicePosting", action = "LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned" }
            );
            config.Routes.MapHttpRoute(
            name: "ShipLinkInvoicePostingLoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturnedForPayment",
            routeTemplate: "api/ShipLinkInvoicePosting/LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturnedForPayment",
            defaults: new { controller = "ShipLinkInvoicePosting", action = "LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturnedForPayment" }
            );
            //        config.Routes.MapHttpRoute(
            //name: "SendTestEmail",
            //routeTemplate: "api/Defaults/EmailSending",
            //defaults: new { controller = "Defaults", action = "EmailSending" }
            //);

            config.Routes.MapHttpRoute(
				name: "UpdateDefaults",
				routeTemplate: "api/Defaults/Update",
				defaults: new { controller = "Defaults", action = "Update" }
				);

			config.Routes.MapHttpRoute(
				name: "SendTestEmailDefaults",
				routeTemplate: "api/Defaults/SendTestEmail",
				defaults: new { controller = "Defaults", action = "SendTestEmail" }
				);

			config.Routes.MapHttpRoute(
				name: "SendPDFEmailDefaults",
				routeTemplate: "api/Defaults/SendPDFEmail",
				defaults: new { controller = "Defaults", action = "SendPDFEmail" }
				);

			config.Routes.MapHttpRoute(
				name: "SendPDFEmailWithBodyTemplateDefaults",
				routeTemplate: "api/Defaults/SendPDFEmailWithBodyTemplate",
				defaults: new { controller = "Defaults", action = "SendPDFEmailWithBodyTemplate" }
				);

			config.Routes.MapHttpRoute(
	name: "SendUrlEmail_General",
	routeTemplate: "api/Defaults/SendUrlEmail_General",
	defaults: new { controller = "Defaults", action = "SendUrlEmail_General" }
	);
			config.Routes.MapHttpRoute(
				name: "SendPDFEmail_General",
				routeTemplate: "api/Defaults/SendPDFEmail_General",
				defaults: new { controller = "Defaults", action = "SendPDFEmail_General" }
				);

			config.Routes.MapHttpRoute(
				name: "SendEmailWithAttachment",
				routeTemplate: "api/Defaults/SendEmailWithAttachment",
				defaults: new { controller = "Defaults", action = "SendEmailWithAttachment" }
				);

			config.Routes.MapHttpRoute(
	name: "LicenseExpireDateAlarmsUsers_UpdateLicenseExpireDateAlarmsUsers",
	routeTemplate: "api/LicenseExpireDateAlarmsUsers/UpdateLicenseExpireDateAlarmsUsers",
	defaults: new { controller = "LicenseExpireDateAlarmsUsers", action = "UpdateLicenseExpireDateAlarmsUsers" }
	);
			config.Routes.MapHttpRoute(
name: "LicenseExpireDateAlarmsUsers_GetUsers",
routeTemplate: "api/LicenseExpireDateAlarmsUsers/GetUsers",
defaults: new { controller = "LicenseExpireDateAlarmsUsers", action = "GetUsers" }
);
			config.Routes.MapHttpRoute(
name: "LicenseExpireDateAlarmsUsers_SendEmailAndAlarmForLicenseExpireDates",
routeTemplate: "api/LicenseExpireDateAlarmsUsers/SendEmailAndAlarmForLicenseExpireDates",
defaults: new { controller = "LicenseExpireDateAlarmsUsers", action = "SendEmailAndAlarmForLicenseExpireDates" }
);


			#region ShipsGo
			config.Routes.MapHttpRoute(
			name: "GetContainerData",
			routeTemplate: "api/ShipsGo/GetContainerData",
			defaults: new { controller = "ShipsGoAPI", action = "GetContainerData" }
			);

			config.Routes.MapHttpRoute(
			name: "GetContainerDataWithBL",
			routeTemplate: "api/ShipsGo/GetContainerDataWithBL",
			defaults: new { controller = "ShipsGoAPI", action = "GetContainerDataWithBL" }
			);

            config.Routes.MapHttpRoute(
                name: "ShipsGo_LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned",
                routeTemplate: "api/ShipsGo/LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned",
                defaults: new { controller = "ShipsGoAPI", action = "LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned" }
            );

            config.Routes.MapHttpRoute(
				name: "InsertShipsGoCustomer",
				routeTemplate: "api/ShipsGo/InsertShipsGoCustomer",
				defaults: new { controller = "ShipsGoAPI", action = "Insert" }
            );
            config.Routes.MapHttpRoute(
                name: "UpdateShipsGoCustomer",
                routeTemplate: "api/ShipsGo/UpdateShipsGoCustomer",
                defaults: new { controller = "ShipsGoAPI", action = "Update" }
            );
            config.Routes.MapHttpRoute(
                name: "DeleteShipsGoCustomer",
                routeTemplate: "api/ShipsGo/DeleteShipsGoCustomer",
                defaults: new { controller = "ShipsGoAPI", action = "Delete" }
            );
            config.Routes.MapHttpRoute(
                name: "ShipsGo_LoadTrackedShipments",
                routeTemplate: "api/ShipsGo/LoadTrackedShipments",
                defaults: new { controller = "ShipsGoAPI", action = "LoadTrackedShipments" }
            );
            #endregion

            config.Routes.MapHttpRoute(
                name: "ClickPay_PayInvoice",
                routeTemplate: "api/ClickPay/PayInvoice",
                defaults: new { controller = "ClickPay", action = "PayInvoice" }
            );
            config.Routes.MapHttpRoute(
			   name: "CheckIsOnline",
			   routeTemplate: "api/BankAccount/CheckIsOnline",
			   defaults: new { controller = "BankAccount", action = "CheckIsOnline" }
		   );
            config.Routes.MapHttpRoute(
			   name: "CheckIsOnlineInsert",
			   routeTemplate: "api/BankAccount/CheckIsOnlineInsert",
			   defaults: new { controller = "BankAccount", action = "CheckIsOnlineInsert" }
		   );
            config.Routes.MapHttpRoute(
                name: "ClickPay_PaymentTransaction",
                routeTemplate: "api/ClickPay/PaymentTransaction",
                defaults: new { controller = "ClickPay", action = "PaymentTransaction" }
            );

            #region BillTrackingAPI
            config.Routes.MapHttpRoute(
			name: "BillTrackingAPI_GetBillData",
			routeTemplate: "api/BillTrackingAPI/GetBillData",
			defaults: new { controller = "BillTrackingAPI", action = "GetBillData" }
			);

			config.Routes.MapHttpRoute(
		   name: "BillTrackingAPI_InsertBillData",
		   routeTemplate: "api/BillTrackingAPI/InsertBillData",
		   defaults: new { controller = "BillTrackingAPI", action = "InsertBillData" }
		   );

			config.Routes.MapHttpRoute(
		   name: "BillTrackingAPI_UpdateBillsOperation",
		   routeTemplate: "api/BillTrackingAPI/UpdateBillsOperation",
		   defaults: new { controller = "BillTrackingAPI", action = "UpdateBillsOperation" }
		   );

			config.Routes.MapHttpRoute(
			name: "BillTrackingAPI_GetContainersData",
			routeTemplate: "api/BillTrackingAPI/GetContainersData",
			defaults: new { controller = "BillTrackingAPI", action = "GetContainersData" }
			);

			config.Routes.MapHttpRoute(
			name: "BillTrackingAPI_InsertContainersData",
			routeTemplate: "api/BillTrackingAPI/InsertContainersData",
			defaults: new { controller = "BillTrackingAPI", action = "InsertContainersData" }
			 );

			config.Routes.MapHttpRoute(
			name: "BillTrackingAPI_UpdateContainersOperation",
			routeTemplate: "api/BillTrackingAPI/UpdateContainersOperation",
			defaults: new { controller = "BillTrackingAPI", action = "UpdateContainersOperation" }
			);

			config.Routes.MapHttpRoute(
			name: "BillTrackingAPI_UpdateContainersData",
			routeTemplate: "api/BillTrackingAPI/UpdateContainersData",
			defaults: new { controller = "BillTrackingAPI", action = "UpdateContainersData" }
				);

			config.Routes.MapHttpRoute(
		  name: "BillTrackingAPI_LoadWithWhereClause",
		  routeTemplate: "api/BillTrackingAPI/LoadWithWhereClause",
		  defaults: new { controller = "BillTrackingAPI", action = "LoadWithWhereClause" }
		  );

			config.Routes.MapHttpRoute(
			name: "BillTrackingAPI_UpdateBillsData",
			routeTemplate: "api/BillTrackingAPI/UpdateBillsData",
			defaults: new { controller = "BillTrackingAPI", action = "UpdateBillsData" }
			);

			config.Routes.MapHttpRoute(
			name: "BillTrackingAPI_UpdateBillsDataWithBLNo",
			routeTemplate: "api/BillTrackingAPI/UpdateBillsDataWithBLNo",
			defaults: new { controller = "BillTrackingAPI", action = "UpdateBillsDataWithBLNo" }
			);

			config.Routes.MapHttpRoute(
			name: "BillTrackingAPI_UpdateOperationsData",
			routeTemplate: "api/BillTrackingAPI/UpdateOperationsData",
			defaults: new { controller = "BillTrackingAPI", action = "UpdateOperationsData" }
			);


			#endregion

			#region InterServices 
			config.Routes.MapHttpRoute(
			   name: "InterServicesRequests_LoadChargeTypes",
			   routeTemplate: "api/InterServicesRequests/LoadChargeTypes",
			   defaults: new { controller = "InterServicesRequests", action = "LoadChargeTypes", pWhereClause = RouteParameter.Optional }
			   );
			config.Routes.MapHttpRoute(
			  name: "InterServicesRequests_LoadAllOperations",
			  routeTemplate: "api/InterServicesRequests/LoadAllOperations",
			  defaults: new { controller = "InterServicesRequests", action = "LoadAllOperations", pWhereClause = RouteParameter.Optional }
			  );
			config.Routes.MapHttpRoute(
				name: "InterServicesRequests_LoadAll",
				routeTemplate: "api/InterServicesRequests/LoadAll",
				defaults: new { controller = "InterServicesRequests", action = "LoadAll", pWhereClause = RouteParameter.Optional }
				);
			#endregion

			#region Mobile
			#region 3PL
			config.Routes.MapHttpRoute(
name: "Mobile_3PL_Login",
routeTemplate: "api/Mobile_3PL/Login",
defaults: new { controller = "Mobile_3PL", action = "Login" }
);
			config.Routes.MapHttpRoute(
name: "Mobile_3PL_GetUserWarehouses",
routeTemplate: "api/Mobile_3PL/GetUserWarehouses",
defaults: new { controller = "Mobile_3PL", action = "GetUserWarehouses" }
);
			config.Routes.MapHttpRoute(
name: "Mobile_3PL_GetWarehouseLocations",
routeTemplate: "api/Mobile_3PL/GetWarehouseLocations",
defaults: new { controller = "Mobile_3PL", action = "GetWarehouseLocations" }
);
			config.Routes.MapHttpRoute(
name: "Mobile_3PL_GetReceiveItems",
routeTemplate: "api/Mobile_3PL/GetReceiveItems",
defaults: new { controller = "Mobile_3PL", action = "GetReceiveItems" }
);
			config.Routes.MapHttpRoute(
name: "Mobile_3PL_SaveReceiveDetail",
routeTemplate: "api/Mobile_3PL/SaveReceiveDetail",
defaults: new { controller = "Mobile_3PL", action = "SaveReceiveDetail" }
);
			config.Routes.MapHttpRoute(
name: "Mobile_3PL_GetPalletsToPutaway",
routeTemplate: "api/Mobile_3PL/GetPalletsToPutaway",
defaults: new { controller = "Mobile_3PL", action = "GetPalletsToPutaway" }
);


			config.Routes.MapHttpRoute(
name: "Mobile_3PL_SavePutaway",
routeTemplate: "api/Mobile_3PL/SavePutaway",
defaults: new { controller = "Mobile_3PL", action = "SavePutaway" }
);
			config.Routes.MapHttpRoute(
name: "Mobile_3PL_GetPalletsToMove",
routeTemplate: "api/Mobile_3PL/GetPalletsToMove",
defaults: new { controller = "Mobile_3PL", action = "GetPalletsToMove" }
);
			config.Routes.MapHttpRoute(
name: "Mobile_3PL_GetItemsToMove",
routeTemplate: "api/Mobile_3PL/GetItemsToMove",
defaults: new { controller = "Mobile_3PL", action = "GetItemsToMove" }
);
			config.Routes.MapHttpRoute(
name: "Mobile_3PL_SaveMove",
routeTemplate: "api/Mobile_3PL/SaveMove",
defaults: new { controller = "Mobile_3PL", action = "SaveMove" }
);
			config.Routes.MapHttpRoute(
name: "Mobile_3PL_GetPickupItems",
routeTemplate: "api/Mobile_3PL/GetPickupItems",
defaults: new { controller = "Mobile_3PL", action = "GetPickupItems" }
);
			config.Routes.MapHttpRoute(
name: "Mobile_3PL_Pick",
routeTemplate: "api/Mobile_3PL/Pick",
defaults: new { controller = "Mobile_3PL", action = "Pick" }
);
			config.Routes.MapHttpRoute(
name: "Mobile_3PL_UnPick",
routeTemplate: "api/Mobile_3PL/UnPick",
defaults: new { controller = "Mobile_3PL", action = "UnPick" }
);
			config.Routes.MapHttpRoute(
name: "Mobile_3PL_RelocatePickup",
routeTemplate: "api/Mobile_3PL/RelocatePickup",
defaults: new { controller = "Mobile_3PL", action = "RelocatePickup" }
);
			config.Routes.MapHttpRoute(
name: "Mobile_3PL_SaveRelocate",
routeTemplate: "api/Mobile_3PL/SaveRelocate",
defaults: new { controller = "Mobile_3PL", action = "SaveRelocate" }
);
			#endregion
			#endregion

			#region SetOperationStage


			config.Routes.MapHttpRoute(
            name: "LoadAllOperationsToSetStage",
            routeTemplate: "api/SetOperationStage/LoadAll",
            defaults: new { controller = "SetOperationStage", action = "LoadAll" }
            );

            config.Routes.MapHttpRoute(
         name: "LoadWithObjectArrayReturnedToSetStage",
         routeTemplate: "api/SetOperationStage/LoadWithObjectArrayReturned",
         defaults: new { controller = "SetOperationStage", action = "LoadWithObjectArrayReturned" }
         );


            config.Routes.MapHttpRoute(
         name: "SetOperationStage_ByDates",
         routeTemplate: "api/SetOperationStage/SetOperationStage_ByDates",
         defaults: new { controller = "SetOperationStage", action = "SetOperationStage_ByDates" }
         );


			config.Routes.MapHttpRoute(
		 name: "UpdateClosedOperationsInDynamic",
		 routeTemplate: "api/SetOperationStage/UpdateClosedOperationsInDynamic",
		 defaults: new { controller = "SetOperationStage", action = "UpdateClosedOperationsInDynamic" }
		 );

         config.Routes.MapHttpRoute(
            name: "CreateJVs",
            routeTemplate: "api/SetOperationStage/CreateJVs",
            defaults: new { controller = "SetOperationStage", action = "CreateJVs" }
            );

            #endregion


            config.Routes.MapHttpRoute(
                name: "MescoAllocationLoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned",
                routeTemplate: "api/A_ARAllocationWithVoucher_MescoController/LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned",
                defaults: new { controller = "A_ARAllocationWithVoucher_MescoController", action = "LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned" }
                 );

            config.Routes.MapHttpRoute(
      name: "MescoAllocationLoadVoucher",
      routeTemplate: "api/A_ARAllocationWithVoucher_MescoController/LoadVoucher",
      defaults: new { controller = "A_ARAllocationWithVoucher_MescoController", action = "LoadVoucher" }
       );





            config.Routes.MapHttpRoute(
				name: "DefaultApi",
				routeTemplate: "api/{controller}/{id}",
				defaults: new { id = RouteParameter.Optional }
			);


		}
	}
}

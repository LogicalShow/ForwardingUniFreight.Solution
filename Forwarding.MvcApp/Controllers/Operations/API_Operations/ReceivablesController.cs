using Forwarding.MvcApp.Entities.Operations;
using Forwarding.MvcApp.Entities.Quotations;
using Forwarding.MvcApp.Models.Accounting.MasterData.Generated;
using Forwarding.MvcApp.Models.Administration.Security.Generated;
using Forwarding.MvcApp.Models.Administration.Settings.Generated;
using Forwarding.MvcApp.Models.Customized;
using Forwarding.MvcApp.Models.MasterData.Invoicing.Generated;
using Forwarding.MvcApp.Models.NoAccess.Generated;
using Forwarding.MvcApp.Models.Operations.Operations.Generated;
using Forwarding.MvcApp.Models.Quotations.Quotations.Generated;
using System;
using System.Data;
using System.Globalization;
using System.Linq;
using System.Web.Http;
using System.Web.Script.Serialization;
using System.Web.Services.Description;
using WebMatrix.WebData;


namespace Forwarding.MvcApp.Controllers.Operations.API_Operations
{
    public class ReceivablesController : ApiController
    {
        [HttpGet, HttpPost]
        public Object[] LoadAll(string pWhereClause)
        {
            #region DepartmentCharge Case
            Int32 _RowCount = 0;
            CDefaults objCDefaults = new CDefaults();
            CUsers objCUsers = new CUsers();
            objCDefaults.GetListPaging(999999, 1, "WHERE 1=1", "ID", out _RowCount);
            objCUsers.GetListPaging(999999, 1, "WHERE ID=" + WebSecurity.CurrentUserId, "ID", out _RowCount);
            if (!objCUsers.lstCVarUsers[0].IsAccessAllCharges)
                pWhereClause += " AND ChargeTypeID IN (SELECT ChargeTypeID FROM DepartmentCharge WHERE DepartmentID=" + objCUsers.lstCVarUsers[0].DepartmentID + ") \n";
            #endregion DepartmentCharge Case
            CvwReceivables objCvwReceivables = new CvwReceivables();
            objCvwReceivables.GetListPaging(999999, 1, pWhereClause, "ChargeTypeName", out _RowCount);

            CNoAccessFreightTypes objCCNoAccessFreightTypes = new CNoAccessFreightTypes();
            objCCNoAccessFreightTypes.GetList(" WHERE 1=1 ");

            CvwCurrencies objCvwCurrencies = new CvwCurrencies();
            objCvwCurrencies.GetList(" WHERE 1=1 Order By Code ");

            var operationId = objCvwReceivables.lstCVarvwReceivables.Count == 0 ? 0 : objCvwReceivables.lstCVarvwReceivables[0].OperationID;
            var objCOperationContainersAndPackages = new COperationContainersAndPackages();
            objCOperationContainersAndPackages.GetList($" where OperationID = {operationId} ");

            CTaxeTypes objCTaxeTypes = new CTaxeTypes();
            objCTaxeTypes.GetList(" Where IsInactive=0 ");
            //********************************************************
            CA_CostCenters objCA_CostCenter = new CA_CostCenters();
            objCA_CostCenter.GetList("Where 1=1");
            var objHousesList = new COperations();
            objHousesList.GetList($" where MasterOperationID = {operationId}");
            var HousesList = objHousesList.lstCVarOperations.Select(c => new
            {
                ID = c.ID,
                Name = c.HouseNumber
            }).ToList();
            //*********************************************************
            var CostCenters = objCA_CostCenter.lstCVarA_CostCenters.Select(c => new
            {
                ID = c.ID,
                Name = c.CostCenterNumber + c.CostCenterName
            }).ToList();



            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[] { serializer.Serialize(objCvwReceivables.lstCVarvwReceivables) //data[0]
                , new JavaScriptSerializer().Serialize(objCCNoAccessFreightTypes.lstCVarNoAccessFreightTypes) //data[1]
                , new JavaScriptSerializer().Serialize(objCvwCurrencies.lstCVarvwCurrencies) //data[2] 
                , serializer.Serialize(objCOperationContainersAndPackages.lstCVarOperationContainersAndPackages.Select(a=>new {ID=a.ID,Name=a.ContainerNumber}).ToList()) //data[4]
                , serializer.Serialize(objCTaxeTypes.lstCVarTaxeTypes) //data[4] 
                ,serializer.Serialize(CostCenters) //data[5]
                ,serializer.Serialize(HousesList)//data[6]
            };
        }
        [HttpGet]
        public object[] GetHouses(int pMasterOperationID)
        {

            var objHousesList = new COperations();
            objHousesList.GetList($" where MasterOperationID = {pMasterOperationID}");
          var HousesList = objHousesList.lstCVarOperations.Select(c =>new
          {
              ID = c.ID,
              Name = c.HouseNumber
          }).ToList();
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[] { serializer.Serialize(HousesList) };     

        }
       

        [HttpGet, HttpPost]
        public object[] LoadWithWhereClause(Int32 pPageNumber, Int32 pPageSize, string pWhereClause)
        {


           
                #region DepartmentCharge Case
                Int32 _RowCount = 0;
            CDefaults objCDefaults = new CDefaults();
            CUsers objCUsers = new CUsers();
            objCDefaults.GetListPaging(999999, 1, "WHERE 1=1", "ID", out _RowCount);
            objCUsers.GetListPaging(999999, 1, "WHERE ID=" + WebSecurity.CurrentUserId, "ID", out _RowCount);
            if (!objCUsers.lstCVarUsers[0].IsAccessAllCharges)
                pWhereClause += " AND ChargeTypeID IN (SELECT ChargeTypeID FROM DepartmentCharge WHERE DepartmentID=" + objCUsers.lstCVarUsers[0].DepartmentID + ") \n";
            #endregion DepartmentCharge Case
           
            CvwReceivables objCvwReceivables = new CvwReceivables();
            CvwReceivables_AGR objCvwReceivables_AGR = new CvwReceivables_AGR();
            //pSearchKey here is the where clause
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
      
            
            //if (objCDefaults.lstCVarDefaults[0].UnEditableCompanyName == "AGR")
            //{
            //    objCvwReceivables_AGR.GetListPaging(pPageSize, pPageNumber, pWhereClause, " ChargeTypeName ", out _RowCount);
            //    return new Object[] { serializer.Serialize(objCvwReceivables_AGR.lstCVarvwReceivables_AGR), _RowCount };
            //}  
         
         
            

                objCvwReceivables.GetListPaging(pPageSize, pPageNumber, pWhereClause," InvoiceID", out _RowCount);



            if (objCDefaults.lstCVarDefaults[0].UnEditableCompanyName == "MES")
            {
                for(int i = 0; i < objCvwReceivables.lstCVarvwReceivables.Count; i++ )
                {
                    if (objCvwReceivables.lstCVarvwReceivables[i].InvoiceID > 0 || !(objCvwReceivables.lstCVarvwReceivables[i].DraftInvoiceID > 0))
                        continue;
                    else
                    {
                        CInvoices cInvoices = new CInvoices();

                        cInvoices.GetItem(objCvwReceivables.lstCVarvwReceivables[i].DraftInvoiceID);

                        if (cInvoices.lstCVarInvoices.Count > 0)
                        {
                            if (cInvoices.lstCVarInvoices[0].ChildInvoiceID > 0)
                                objCvwReceivables.lstCVarvwReceivables[i].IsLocked = 2; 




                        }

                    }



                }



            }

            return new Object[] { serializer.Serialize(objCvwReceivables.lstCVarvwReceivables), _RowCount };
        }

        [HttpGet, HttpPost]
        public bool InsertListWithoutValues(Int64 pOperationID, string pSelectedIDs, Int64 pQuotationRouteID, Int64 pOperationContainersAndPackagesID, Int64 pOperationVehicleID, Int64 pTruckingOrderID, string pQuotationChargeIDs = null, string pOperationIDs=null , bool? pIsClosedOperation = false, int pDraftInvoiceID=0  , string pActionName = "")
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

            var CatID = 0;
          

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

			//save multi operations
			if (string.IsNullOrEmpty(pOperationIDs) || pOperationIDs == "0")
				pOperationIDs = pOperationID.ToString();

			var OperationIDsArr = pOperationIDs.Split(',');
			foreach (var OpID in OperationIDsArr)
			{
				pOperationID = Convert.ToInt64(OpID);
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
					CReceivables objCReceivables = new CReceivables();
					string[] ChargeTypeIDsArr = pSelectedIDs.Split(',');
					string[] QuotationChargeIDsArr = pQuotationChargeIDs.Split(',');
                    for (int i = 0; i < ChargeTypeIDsArr.Length; i++)
                    {
                        CVarReceivables objCVarReceivables = new CVarReceivables();
                        var chargeType = objCChargeTypes.lstCVarChargeTypes.FirstOrDefault(a => a.ID == int.Parse(ChargeTypeIDsArr[i]));
                        if (chargeType == null)
                            continue;
                        if (objCDefaults.lstCVarDefaults[0].IsTaxOnItems)
                            objCVarReceivables.TaxeTypeID = chargeType.TaxeTypeID;
                        if (CompanyName == "MES") 
                        { 
                            if (pActionName == "BLDocuments" && pDraftInvoiceID != 0)
                            {
                                CInvoices cInvoices = new CInvoices();
                                cInvoices.GetList($"where id = {pDraftInvoiceID}");
                                if (cInvoices.lstCVarInvoices.Count > 0)
                                {
                                    var TarrifID = cInvoices.lstCVarInvoices[0].TariffID;
                                    int.TryParse(objCCustomizedDBCall.CallStringFunction($"EXEC dbo.GetChargeTypeDetails @ChargeTypesID = {chargeType.ID}, @WH_CSL_TariffID = {TarrifID};"), out CatID);

                                }

                            }
                        }
                        objCVarReceivables.OperationID = pOperationID;
						objCVarReceivables.ChargeTypeID = chargeType.ID;
						objCVarReceivables.GeneratingQCID = long.Parse(QuotationChargeIDsArr[i]);
						objCVarReceivables.MeasurementID = chargeType.MeasurementID;
						objCVarReceivables.Notes = chargeType.Notes;
						objCVarReceivables.Quantity = 1;
						objCVarReceivables.ExchangeRate = _ExchangeRate;
						objCVarReceivables.CurrencyID = _CurrencyID;
						objCVarReceivables.ExchangeRate_Foreign = 1;
						objCVarReceivables.CurrencyID_Foreign = objCDefaults.lstCVarDefaults[0].CurrencyID;
						objCVarReceivables.GeneratingQRID = pQuotationRouteID;
						objCVarReceivables.IssueDate = DateTime.Now;
						objCVarReceivables.OperationContainersAndPackagesID = pOperationContainersAndPackagesID;
						objCVarReceivables.OperationVehicleID = pOperationVehicleID;
						objCVarReceivables.TruckingOrderID = pTruckingOrderID;
						objCVarReceivables.PreviousCutOffDate = DateTime.Parse("01/01/1900");
						objCVarReceivables.CutOffDate = DateTime.Parse("01/01/1900");
						objCVarReceivables.ReceiptDate = DateTime.Parse("01/01/1900");
						objCVarReceivables.ReceiptNo = "";
						objCVarReceivables.TariffID = 0;
                        if(CompanyName == "MES")
						objCVarReceivables.CategoryID = CatID;
						objCVarReceivables.ManualChargeType = "0";
						objCVarReceivables.CostCenterId = 0;
						objCVarReceivables.IsOfficial = false;
						objCVarReceivables.crmCode = "";
                        if(CompanyName == "UNV")
						objCVarReceivables.ViewOrder = chargeType.ViewOrder;
						objCVarReceivables.DraftInvoiceID = pDraftInvoiceID;
						objCVarReceivables.CreatorUserID = objCVarReceivables.ModificatorUserID = WebSecurity.CurrentUserId;
						objCVarReceivables.ModificationDate = objCVarReceivables.CreationDate = DateTime.Now;
						objCReceivables.lstCVarReceivables.Add(objCVarReceivables);
					}

					checkException = objCReceivables.SaveMethod(objCReceivables.lstCVarReceivables);

					if (checkException == null)
						_result = true;
				}
				else
				{
					foreach (var rowChargeType in objCChargeTypes.lstCVarChargeTypes.ToList())
					{

                        if (objCDefaults.lstCVarDefaults[0].UnEditableCompanyName == "USC" && rowChargeType.Name.ToUpper().Contains("TRANSPORT"))
                        {
                            COperationPartners checkTruckerPartner = new COperationPartners();
                            checkTruckerPartner.GetList($"WHERE OperationPartnerTypeID=11 AND OperationID={pOperationID}");
                            if(checkTruckerPartner.lstCVarOperationPartners.Count == 0)
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


                        CReceivables objCReceivables = new CReceivables();
						CReceivables_AGR objCReceivables_AGR = new CReceivables_AGR();

						decimal _Quantity = 1;
						if (objCDefaults.lstCVarDefaults[0].UnEditableCompanyName == "MAR" || objCDefaults.lstCVarDefaults[0].UnEditableCompanyName == "NIS")
							_Quantity = Forwarding.MvcApp.Controllers.MasterData.API_Locations.ChargeTypesController.ChargeTypes_GetQuantity(rowChargeType.ID, pOperationID);
						CVarReceivables objCVarReceivables = new CVarReceivables();

						Exception checkException = null;
						CVarReceivables_AGR objCVarReceivables_AGR = new CVarReceivables_AGR();
						CDefaults ObjDefaults = new CDefaults();

						//ObjDefaults.GetList(" where 1 = 1 ");
						ObjDefaults.GetListPaging(999999, 1, "WHERE 1=1", "ID", out _RowCount);



						//if (ObjDefaults.lstCVarDefaults[0].UnEditableCompanyName == "AGR")
						//{
						//    if (objCDefaults.lstCVarDefaults[0].IsTaxOnItems)
						//        objCVarReceivables_AGR.TaxeTypeID = rowChargeType.TaxeTypeID;

						//    objCVarReceivables_AGR.OperationID = pOperationID;
						//    objCVarReceivables_AGR.ChargeTypeID = rowChargeType.ID;
						//    objCVarReceivables_AGR.MeasurementID = rowChargeType.MeasurementID;
						//    objCVarReceivables_AGR.Quantity = Math.Round(_Quantity, 2);
						//    objCVarReceivables_AGR.ExchangeRate = _ExchangeRate;
						//    objCVarReceivables_AGR.CurrencyID = _CurrencyID;
						//    objCVarReceivables_AGR.ExchangeRate_Foreign = 1;
						//    objCVarReceivables_AGR.CurrencyID_Foreign = objCDefaults.lstCVarDefaults[0].CurrencyID;
						//    objCVarReceivables_AGR.GeneratingQRID = pQuotationRouteID;
						//    objCVarReceivables_AGR.Notes = rowChargeType.Notes;

						//    objCVarReceivables_AGR.IssueDate = DateTime.Now;
						//    objCVarReceivables_AGR.OperationContainersAndPackagesID = pOperationContainersAndPackagesID;
						//    objCVarReceivables_AGR.OperationVehicleID = pOperationVehicleID;
						//    objCVarReceivables_AGR.TruckingOrderID = pTruckingOrderID;

						//    objCVarReceivables_AGR.PreviousCutOffDate = DateTime.Parse("01/01/1900");
						//    objCVarReceivables_AGR.CutOffDate = DateTime.Parse("01/01/1900");
						//    objCVarReceivables_AGR.ReceiptDate = DateTime.Parse("01/01/1900");
						//    objCVarReceivables_AGR.ReceiptNo = "";
						//    objCVarReceivables_AGR.Name = "";
						//    objCVarReceivables_AGR.ItemID = 0;

						//    objCVarReceivables_AGR.CreatorUserID = objCVarReceivables_AGR.ModificatorUserID = WebSecurity.CurrentUserId;
						//    objCVarReceivables_AGR.ModificationDate = objCVarReceivables_AGR.CreationDate = DateTime.Now;

						//    objCReceivables_AGR.lstCVarReceivables_AGR.Add(objCVarReceivables_AGR);
						//     checkException = objCReceivables_AGR.SaveMethod(objCReceivables_AGR.lstCVarReceivables_AGR);

						//}


						if (objCDefaults.lstCVarDefaults[0].IsTaxOnItems)
							objCVarReceivables.TaxeTypeID = rowChargeType.TaxeTypeID;

						objCVarReceivables.OperationID = pOperationID;
						objCVarReceivables.ChargeTypeID = rowChargeType.ID;
						objCVarReceivables.MeasurementID = rowChargeType.MeasurementID;
						objCVarReceivables.Quantity = Math.Round(_Quantity, 2);
						objCVarReceivables.ExchangeRate = _ExchangeRate;
						objCVarReceivables.CurrencyID = _CurrencyID;
						objCVarReceivables.ExchangeRate_Foreign = 1;
						objCVarReceivables.CurrencyID_Foreign = objCDefaults.lstCVarDefaults[0].CurrencyID;
						objCVarReceivables.GeneratingQRID = pQuotationRouteID;
						objCVarReceivables.Notes = rowChargeType.Notes;

                        if (CompanyName == "MES")
                        {
                            if (pActionName == "BLDocuments" && pDraftInvoiceID != 0)
                            {
                                CInvoices cInvoices = new CInvoices();
                                cInvoices.GetList($"where id = {pDraftInvoiceID}");
                                if (cInvoices.lstCVarInvoices.Count > 0)
                                {
                                    var TarrifID = cInvoices.lstCVarInvoices[0].TariffID;
                                    int.TryParse(objCCustomizedDBCall.CallStringFunction($"EXEC dbo.GetChargeTypeDetails @ChargeTypesID = {rowChargeType.ID}, @WH_CSL_TariffID = {TarrifID};"), out CatID);
                              
                                        objCVarReceivables.CategoryID = CatID;
                                }

                            }
                        }




                        objCVarReceivables.IssueDate = DateTime.Now;
						objCVarReceivables.OperationContainersAndPackagesID = pOperationContainersAndPackagesID;
						objCVarReceivables.OperationVehicleID = pOperationVehicleID;
						objCVarReceivables.TruckingOrderID = pTruckingOrderID;

						objCVarReceivables.PreviousCutOffDate = DateTime.Parse("01/01/1900");
						objCVarReceivables.CutOffDate = DateTime.Parse("01/01/1900");
						objCVarReceivables.ReceiptDate = DateTime.Parse("01/01/1900");
						objCVarReceivables.ReceiptNo = "";
						objCVarReceivables.TariffID = 0;
						objCVarReceivables.ManualChargeType = "0";
						objCVarReceivables.CostCenterId = 0;
						objCVarReceivables.IsOfficial = false;
						objCVarReceivables.crmCode = "";
						objCVarReceivables.DraftInvoiceID = pDraftInvoiceID;
                        if (CompanyName == "UNV")
                            objCVarReceivables.ViewOrder = rowChargeType.ViewOrder;

                        objCVarReceivables.CreatorUserID = objCVarReceivables.ModificatorUserID = WebSecurity.CurrentUserId;
						objCVarReceivables.ModificationDate = objCVarReceivables.CreationDate = DateTime.Now;

						objCReceivables.lstCVarReceivables.Add(objCVarReceivables);
						checkException = objCReceivables.SaveMethod(objCReceivables.lstCVarReceivables);

						if (checkException == null && pIsClosedOperation == true)
						{
							CAccNoteAfterOperationClose objCAccNoteAfterOperationClose = new CAccNoteAfterOperationClose();
							CVarAccNoteAfterOperationClose objCVarAccNoteAfterOperationClose = new CVarAccNoteAfterOperationClose();
							objCVarAccNoteAfterOperationClose.CreationDate = DateTime.Now;
							objCVarAccNoteAfterOperationClose.CreatorUserID = WebSecurity.CurrentUserId;
							objCVarAccNoteAfterOperationClose.ID = 0;
							objCVarAccNoteAfterOperationClose.ReceivableID = objCReceivables.lstCVarReceivables[0].ID;
							objCAccNoteAfterOperationClose.lstCVarAccNoteAfterOperationClose.Add(objCVarAccNoteAfterOperationClose);
							objCAccNoteAfterOperationClose.SaveMethod(objCAccNoteAfterOperationClose.lstCVarAccNoteAfterOperationClose);
						}



						//-----------------------

						if (checkException == null)
							_result = true;

						if ((CompanyName == "CHM" || CompanyName == "OCE") && checkException == null)
						{
							CChargeTypesTAX objCChargeTypesTAX = new CChargeTypesTAX();
							string OperationID = "";
							objCChargeTypes.GetList("WHERE ID=" + rowChargeType);
							objCChargeTypesTAX.GetList("WHERE Name=N'" + (objCChargeTypes.lstCVarChargeTypes.Count > 0 ? objCChargeTypes.lstCVarChargeTypes[0].Name : "") + "'");
							Int32 ChargeTypeID = objCChargeTypesTAX.lstCVarChargeTypes.Count > 0 ? objCChargeTypesTAX.lstCVarChargeTypes[0].ID : 0;
							if (CompanyName == "CHM")
							{
								OperationID = objCCustomizedDBCall.CallStringFunctionByMultiReturn("select top 1 TaxID from ForwardingTransChemTax.dbo.TaxLink WHERE Notes='Operations' and OriginID = " + pOperationID);
							}
							else if (CompanyName == "OCE")
							{
								OperationID = objCCustomizedDBCall.CallStringFunctionByMultiReturn("select top 1 TaxID from ForwardingTROTax.dbo.TaxLink WHERE Notes='Operations' and OriginID = " + pOperationID);
							}

							CReceivablesTax objCReceivablesTax = new CReceivablesTax();

							CVarReceivablesTAX objCVarReceivablesTax = new CVarReceivablesTAX();
							if (OperationID != "")
							{
								if (objCDefaults.lstCVarDefaults[0].IsTaxOnItems)
									objCVarReceivablesTax.TaxeTypeID = rowChargeType.TaxeTypeID;

								objCVarReceivablesTax.OperationID = int.Parse(OperationID);
								objCVarReceivablesTax.ChargeTypeID = ChargeTypeID;
								objCVarReceivablesTax.MeasurementID = rowChargeType.MeasurementID;
								objCVarReceivablesTax.Quantity = Math.Round(_Quantity, 2);
								objCVarReceivablesTax.ExchangeRate = _ExchangeRate;
								objCVarReceivablesTax.CurrencyID = _CurrencyID;
								objCVarReceivablesTax.GeneratingQRID = pQuotationRouteID;
								objCVarReceivablesTax.Notes = rowChargeType.Notes;

								objCVarReceivablesTax.IssueDate = DateTime.Now;
								objCVarReceivablesTax.OperationContainersAndPackagesID = pOperationContainersAndPackagesID;
								objCVarReceivablesTax.OperationVehicleID = pOperationVehicleID;
								objCVarReceivablesTax.TruckingOrderID = pTruckingOrderID;

								objCVarReceivablesTax.PreviousCutOffDate = DateTime.Parse("01/01/1900");
								objCVarReceivablesTax.CutOffDate = DateTime.Parse("01/01/1900");

								objCVarReceivablesTax.CreatorUserID = objCVarReceivablesTax.ModificatorUserID = WebSecurity.CurrentUserId;
								objCVarReceivablesTax.ModificationDate = objCVarReceivablesTax.CreationDate = DateTime.Now;

								objCReceivablesTax.lstCVarReceivables.Add(objCVarReceivablesTax);

								checkException = objCReceivablesTax.SaveMethod(objCReceivablesTax.lstCVarReceivables);
								//link
								objCCustomizedDBCall.ExecuteQuery_DataTable("insertTaxLink " + objCVarReceivables.ID + "," + objCVarReceivablesTax.ID + "," + "Receivables");
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
			}
		
			
            return _result;
        }

        //insert multi row with values (incase i switch adding Receivables to enter values too)
        [HttpGet, HttpPost]
        public bool InsertListWithValuesFromPayables(Int64 pOperationID, string pSelectedPayableIDs, string pSelectedChargeTypeIDs, string pPOrCList/*, string pSupplierList*/, string pUOMList, string pQuantityList, string pSalePriceList, string pSaleAmountList/*, string pInitialSalePriceList, string pSupplierInvoiceNumberList*/, string pExchangeRateList, string pCurrencyList)
        {
            int NumberOfRows = pSelectedChargeTypeIDs.Split(',').Length;
            bool _result = false;
            Exception checkException = null;
            //string pReceivableIDsToDelete = "";
            //CReceivables objCReceivables = new CReceivables();

            //checkException = objCReceivables.GetList(" WHERE OperationID = " + pOperationID.ToString() + " AND InvoiceID IS NULL AND GeneratingQRID IS NULL ");
            //if (objCReceivables.lstCVarReceivables.Count > 0)
            //{
            //    pReceivableIDsToDelete = objCReceivables.lstCVarReceivables[0].ID.ToString();
            //    for (int i = 1; i < objCReceivables.lstCVarReceivables.Count; i++)
            //        pReceivableIDsToDelete += "," + objCReceivables.lstCVarReceivables[i].ID.ToString();
            //}
            //if (pReceivableIDsToDelete != "")
            //    Delete(pReceivableIDsToDelete, pOperationID);
            //objCReceivables.lstCVarReceivables.Clear();
            //checkException = objCReceivables.DeleteList(" WHERE OperationID = " + pOperationID.ToString() + " AND InvoiceID IS NULL ");
            CPayables objCPayables = new CPayables();
            CDefaults objCDefaults = new CDefaults();
            int _RowCount = 0;
            objCDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount); //i am sure i ve just one row isa
            for (int i = 0; i < NumberOfRows; i++)
            {
                CVarReceivables objCVarReceivables = new CVarReceivables();
                CTaxeTypes objCTaxTypes = new CTaxeTypes();

                objCVarReceivables.OperationID = pOperationID;
                objCVarReceivables.ChargeTypeID = int.Parse(pSelectedChargeTypeIDs.Split(',')[i]);
                objCVarReceivables.POrC = int.Parse(pPOrCList.Split(',')[i]);
                //objCVarReceivables.SupplierOperationPartnerID = Int64.Parse(pSupplierList.Split(',')[i]);
                objCVarReceivables.MeasurementID = int.Parse(pUOMList.Split(',')[i]);
                objCVarReceivables.Quantity = (pQuantityList.Split(',')[i] == "0" ? 1 : decimal.Parse(pQuantityList.Split(',')[i]));

                CvwPayables objCvwPayables_temp = new CvwPayables();
                objCvwPayables_temp.GetListPaging(1, 1, "WHERE ID=" + pSelectedPayableIDs.Split(',')[i], "ID", out _RowCount);
                objCVarReceivables.IsOfficial = objCvwPayables_temp.lstCVarvwPayables[0].IsOfficialPayable;
                objCVarReceivables.CategoryID = objCvwPayables_temp.lstCVarvwPayables[0].CategoryID;
                if (objCvwPayables_temp.lstCVarvwPayables[0].IsOfficialPayable && pSalePriceList.Split(',')[i] == "0")
                    objCVarReceivables.SalePrice = objCvwPayables_temp.lstCVarvwPayables[0].CostPrice;
                else
                    objCVarReceivables.SalePrice = decimal.Parse(pSalePriceList.Split(',')[i]);

                objCVarReceivables.AmountWithoutVAT = Math.Round((objCVarReceivables.Quantity * objCVarReceivables.SalePrice), 2);

                if (objCDefaults.lstCVarDefaults[0].IsTaxOnItems)
                {
                    objCVarReceivables.TaxeTypeID = objCVarReceivables.IsOfficial ? 0 : GetDefaultTaxTypeID(int.Parse(pSelectedChargeTypeIDs.Split(',')[i]));
                    if (objCVarReceivables.TaxeTypeID > 0 && !objCVarReceivables.IsOfficial)
                    {
                        objCTaxTypes.GetList("WHERE ID=" + objCVarReceivables.TaxeTypeID);
                        objCVarReceivables.TaxPercentage = objCTaxTypes.lstCVarTaxeTypes[0].CurrentPercentage;
                        objCVarReceivables.TaxAmount = Math.Round((objCVarReceivables.AmountWithoutVAT * objCVarReceivables.TaxPercentage / 100), 2);
                    }
                    else
                    {
                        objCVarReceivables.TaxPercentage = 0;
                        objCVarReceivables.TaxAmount = 0;
                        objCVarReceivables.DiscountPercentage = 0;
                    }
                }

                objCVarReceivables.SaleAmount = decimal.Parse(pSaleAmountList.Split(',')[i]) + objCVarReceivables.TaxAmount;
                //objCVarReceivables.InitialSalePrice = decimal.Parse(pInitialSalePriceList.Split(',')[i]);
                //objCVarReceivables.SupplierInvoiceNo = pSupplierInvoiceNumberList.Split(',')[i];
                objCVarReceivables.ExchangeRate = decimal.Parse(pExchangeRateList.Split(',')[i]);
                objCVarReceivables.CurrencyID = int.Parse(pCurrencyList.Split(',')[i]);
                objCVarReceivables.ExchangeRate_Foreign = 1;
                objCVarReceivables.CurrencyID_Foreign = objCDefaults.lstCVarDefaults[0].CurrencyID;

                objCVarReceivables.PayableID = Int64.Parse(pSelectedPayableIDs.Split(',')[i]);

                //objCPayables.GetListPaging(1, 1, "WHERE ID=" + pSelectedPayableIDs.Split(',')[i], "ID", out _RowCount);
                objCVarReceivables.Notes = 
                    objCDefaults.lstCVarDefaults[0].UnEditableCompanyName == "BAK"
                    ? objCvwPayables_temp.lstCVarvwPayables[0].SupplierInvoiceNo
                    : (objCDefaults.lstCVarDefaults[0].UnEditableCompanyName == "FEL" || objCDefaults.lstCVarDefaults[0].UnEditableCompanyName == "FWD" || objCDefaults.lstCVarDefaults[0].UnEditableCompanyName == "EVL"
                        ? objCvwPayables_temp.lstCVarvwPayables[0].Notes
                        : (objCDefaults.lstCVarDefaults[0].UnEditableCompanyName == "CFR"
                            ? objCvwPayables_temp.lstCVarvwPayables[0].SupplierReceiptNo
                                : (objCDefaults.lstCVarDefaults[0].UnEditableCompanyName == "NEW" || objCDefaults.lstCVarDefaults[0].UnEditableCompanyName == "TRM"
                                ? objCvwPayables_temp.lstCVarvwPayables[0].Notes + " " + objCvwPayables_temp.lstCVarvwPayables[0].SupplierInvoiceNo + " " + objCvwPayables_temp.lstCVarvwPayables[0].IssueDate.ToString("dd/MM/yyyy")
                            : "0"
                          )));

                objCVarReceivables.IssueDate = DateTime.Now;
                objCVarReceivables.OperationContainersAndPackagesID = 0;

                objCVarReceivables.PreviousCutOffDate = DateTime.Parse("01/01/1900");
                objCVarReceivables.CutOffDate = DateTime.Parse("01/01/1900");
                objCVarReceivables.ReceiptDate = objCvwPayables_temp.lstCVarvwPayables[0].EntryDate;
                objCVarReceivables.ReceiptNo = objCvwPayables_temp.lstCVarvwPayables[0].SupplierReceiptNo;
                objCVarReceivables.HouseBillID = objCvwPayables_temp.lstCVarvwPayables[0].BillID;
                objCVarReceivables.OperationContainersAndPackagesID = objCvwPayables_temp.lstCVarvwPayables[0].OperationContainersAndPackagesID;
                objCVarReceivables.TariffID = 0;
                objCVarReceivables.ManualChargeType = "0";
                objCVarReceivables.CostCenterId = 0;
                objCVarReceivables.crmCode = "";

                objCVarReceivables.CreatorUserID = objCVarReceivables.ModificatorUserID = WebSecurity.CurrentUserId;
                objCVarReceivables.ModificationDate = objCVarReceivables.CreationDate = DateTime.Now;

                CReceivables objCReceivables = new CReceivables();
                objCReceivables.lstCVarReceivables.Add(objCVarReceivables);
                checkException = objCReceivables.SaveMethod(objCReceivables.lstCVarReceivables);

                checkException = objCPayables.UpdateList("ReceivableID=" + objCVarReceivables.ID.ToString() + " WHERE ID=" + objCVarReceivables.PayableID);
            }
            if (checkException == null)
                _result = true;
            return _result;
        }

        ////update multi row with values //incase pInvoiceID > 0 then this is Invoice Update Items
        //[HttpGet, HttpPost]
        //public bool UpdateList(string pSelectedReceivablesIDsToUpdate, string pPOrCList/*, string pSupplierList*/, string pUOMList
        //    , string pQuantityList, string pSalePriceList, string pAmountWithoutVATList, string pTaxTypeIDList, string pTaxPercentageList, string pTaxAmountList, string pDiscountTypeIDList, string pDiscountPercentageList, string pDiscountAmountList
        //    , string pSaleAmountList/*, string pInitialSalePriceList, string pSupplierInvoiceNumberList*/, string pExchangeRateList, string pCurrencyList, string pViewOrderList, Int64 pInvoiceID)
        //{
        //    bool _result = false;
        //    string updateClause = "";
        //    CReceivables objCReceivables = new CReceivables();
        //    Exception checkException = null;

        //    #region In Case of pInvoiceID > 0 existing InvoiceIDs to null to handle deleted items
        //    if (pInvoiceID > 0)
        //    {
        //        updateClause = " InvoiceID = NULL ";
        //        updateClause += " , ModificatorUserID = " + WebSecurity.CurrentUserId.ToString();
        //        updateClause += " , ModificationDate = GETDATE() ";
        //        updateClause += " WHERE InvoiceID = " + pInvoiceID.ToString();
        //        checkException = objCReceivables.UpdateList(updateClause);
        //    }
        //    #endregion
        //    int NumberOfRows = pSelectedReceivablesIDsToUpdate.Split(',').Length;

        //    for (int i = 0; i < NumberOfRows; i++)
        //    {
        //        updateClause = " POrC = " + (pPOrCList.Split(',')[i] == "0" ? " NULL " : pPOrCList.Split(',')[i]);
        //        updateClause += " , MeasurementID = " + (pUOMList.Split(',')[i] == "0" ? " NULL " : pUOMList.Split(',')[i]);
        //        updateClause += " , Quantity = " + pQuantityList.Split(',')[i];
        //        updateClause += " , SalePrice = " + pSalePriceList.Split(',')[i];

        //        updateClause += " , AmountWithoutVAT = ROUND(" + (decimal.Parse(pQuantityList.Split(',')[i]) * decimal.Parse(pSalePriceList.Split(',')[i])) + ",2)" + " \n";
        //        updateClause += " , TaxeTypeID = " + (pTaxTypeIDList.Split(',')[i] == "0" ? " NULL " : pTaxTypeIDList.Split(',')[i]);
        //        updateClause += " , TaxPercentage = " + pTaxPercentageList.Split(',')[i];
        //        updateClause += " , TaxAmount = " + pTaxAmountList.Split(',')[i];
        //        updateClause += " , DiscountTypeID = " + (pDiscountTypeIDList.Split(',')[i] == "0" ? " NULL " : pDiscountTypeIDList.Split(',')[i]);
        //        updateClause += " , DiscountPercentage = " + pDiscountPercentageList.Split(',')[i];
        //        updateClause += " , DiscountAmount = " + pDiscountAmountList.Split(',')[i];

        //        updateClause += " , SaleAmount = " + pSaleAmountList.Split(',')[i];

        //        updateClause += " , ExchangeRate = " + pExchangeRateList.Split(',')[i];
        //        updateClause += " , CurrencyID = " + (pCurrencyList.Split(',')[i] == "0" ? " NULL " : pCurrencyList.Split(',')[i]);
        //        updateClause += " , ViewOrder = " + pViewOrderList.Split(',')[i];
        //        //the next line is used just in case i am updating invoice items
        //        updateClause += pInvoiceID > 0 ? " , InvoiceID = " + pInvoiceID.ToString() : "";
        //        updateClause += " , ModificatorUserID = " + WebSecurity.CurrentUserId.ToString();
        //        updateClause += " , ModificationDate = GETDATE() ";

        //        updateClause += " WHERE ID = " + pSelectedReceivablesIDsToUpdate.Split(',')[i];

        //        checkException = objCReceivables.UpdateList(updateClause);

        //        #region ensure receivables are correct
        //        updateClause = " AmountWithoutVAT = ROUND(" + (decimal.Parse(pQuantityList.Split(',')[i]) * decimal.Parse(pSalePriceList.Split(',')[i])) + ",2)" + " \n";
        //        updateClause += " , TaxPercentage = (select TT.CurrentPercentage FROM TaxeTypes TT WHERE TT.ID = TaxeTypeID)" + " \n";
        //        updateClause += " , TaxAmount = ROUND((ISNULL(SalePrice, 0) * ISNULL(Quantity, 1)),2) * (select TT.CurrentPercentage/100 FROM TaxeTypes TT WHERE TT.ID = TaxeTypeID)" + " \n";
        //        updateClause += " , DiscountPercentage = (select TT.CurrentPercentage FROM TaxeTypes TT WHERE TT.ID = DiscountTypeID)" + " \n";
        //        updateClause += " , DiscountAmount = ROUND((ISNULL(SalePrice, 0) * ISNULL(Quantity, 1)),2) * (select TT.CurrentPercentage/100 FROM TaxeTypes TT WHERE TT.ID = DiscountTypeID)" + " \n";
        //        updateClause += " , SaleAmount = ROUND((ISNULL(SalePrice, 0) * ISNULL(Quantity, 1)),2)" + " \n"
        //                      + " + (ROUND((ISNULL(SalePrice, 0) * ISNULL(Quantity, 1)), 2) * ISNULL((select ISNULL(TT.CurrentPercentage / 100, 0) FROM TaxeTypes TT WHERE TT.ID = TaxeTypeID),0))" + " \n"
        //                      + " - (ROUND((ISNULL(SalePrice, 0) * ISNULL(Quantity, 1)), 2) * ISNULL((select ISNULL(TT.CurrentPercentage / 100, 0) FROM TaxeTypes TT WHERE TT.ID = DiscountTypeID),0))" + " \n";
        //        updateClause += " WHERE ID = " + pSelectedReceivablesIDsToUpdate.Split(',')[i];
        //        checkException = objCReceivables.UpdateList(updateClause);
        //        #endregion ensure receivables are correct

        //        if (checkException != null) // an exception is caught in the model
        //        {
        //            if (checkException.Message.Contains("UNIQUE"))
        //            {
        //                _result = false;
        //                #region Update Invoice totals at server side to fix any connection problem
        //                CInvoices objCInvoices = new CInvoices();
        //                //SET Tax, Discount & Total Amount after setting the AmountWithoutVAT
        //                updateClause = " TaxAmount = ROUND((ISNULL(AmountWithoutVAT, 0) * ISNULL(TaxPercentage, 0) / 100),2)" + "\n";
        //                updateClause += " , DiscountAmount = ROUND((ISNULL(AmountWithoutVAT, 0) * ISNULL(DiscountPercentage, 0) / 100),2)";
        //                updateClause += " , Amount = ROUND((ISNULL(AmountWithoutVAT, 0) + ROUND( (ISNULL(AmountWithoutVAT, 0) * ISNULL(TaxPercentage, 0) / 100),2) - ROUND((ISNULL(AmountWithoutVAT, 0) * ISNULL(DiscountPercentage, 0) / 100),2)),2)";
        //                updateClause += " WHERE ID = " + pInvoiceID.ToString();
        //                checkException = objCInvoices.UpdateList(updateClause);
        //                #endregion Update Invoice totals at server side to fix any connection problem

        //            }
        //        }
        //        else
        //            _result = true;
        //    }
        //    return _result;
        //}

        //update multi row with values //incase pInvoiceID > 0 then this is Invoice Update Items



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
                          SELECT cha.RevenueAccountID
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

            var RevenueAccountID = cCustomizedDBCall.CallStringFunction(query);


            //var ExpenseAccountID = cCustomizedDBCall.CallStringFunction($"  select ExpenseAccountID from ChargeTypeAccounts where ChargeTypeID = {pChargetypeID}  and ServiceID = (select TransportType  from operations where id ={pOperationID}) and DirectionID = (select DirectionType from operations where id ={pOperationID}) and CategoryID = {pCategoryId}  \r\n");

            //var RevenueAccountID = cCustomizedDBCall.CallStringFunction($"  select RevenueAccountID from ChargeTypeAccounts where ChargeTypeID = {pChargetypeID}  and ServiceID = (select ServiceID  from operations where id ={pOperationID}) and DirectionID = (select DirectionType from operations where id ={pOperationID}) and CategoryID = {pCategoryId}  \r\n");

            if (/*ExpenseAccountID != "" &&*/ RevenueAccountID != "")
                _result = true;

            return new object[]
            {   _result, //pData[0]
               
             };
        }






        [HttpGet, HttpPost]
        public bool UpdateList([FromBody] UpdateListParameters updateListParameters)
        {
            bool _result = false;
            string updateClause = "";
            CReceivables objCReceivables = new CReceivables();
            CDefaults ObjDefaults = new CDefaults();
            int _RowCount = 0;
            ObjDefaults.GetListPaging(999999, 1, "WHERE 1=1", "ID", out _RowCount);
            Exception checkException = null;
            string[] MescoCompanies = new string[5] { "MES", "SAC", "GLO", "EUR", "ALT" };
            bool IsMescoCompany = MescoCompanies.Contains(ObjDefaults.lstCVarDefaults[0].UnEditableCompanyName);

            #region In Case of pInvoiceID > 0 existing InvoiceIDs to null to handle deleted items
            if (updateListParameters.pInvoiceID > 0)
            {
                updateClause = " InvoiceID = NULL ";
                updateClause += " , ModificatorUserID = " + WebSecurity.CurrentUserId.ToString();
                updateClause += " , ModificationDate = GETDATE() ";
                updateClause += " WHERE InvoiceID = " + updateListParameters.pInvoiceID.ToString();
                checkException = objCReceivables.UpdateList(updateClause);
            }
            #endregion
            int NumberOfRows = updateListParameters.pSelectedReceivablesIDsToUpdate.Split(',').Length;

            for (int i = 0; i < NumberOfRows; i++)
            {
                //don't update a receivable in case it is included in an invoice,draft or debit note
                objCReceivables.GetItem(long.Parse(updateListParameters.pSelectedReceivablesIDsToUpdate.Split(',')[i]));
                if (objCReceivables.lstCVarReceivables.Count > 0 && !(objCReceivables.lstCVarReceivables[0].InvoiceID == 0 
                    && objCReceivables.lstCVarReceivables[0].DraftInvoiceID == 0 
                    && objCReceivables.lstCVarReceivables[0].AccNoteID == 0)) {
                    CInvoices cInvoices = new CInvoices();
                    cInvoices.GetList($"where id = {objCReceivables.lstCVarReceivables[0].InvoiceID}");
                        if (cInvoices.lstCVarInvoices.Count > 0)
                        if (cInvoices.lstCVarInvoices[0].IsApproved)
                        {

                            if (updateListParameters.pOperationContainersAndPackagesIDList != "NA")
                            {
                                updateClause = "  OperationContainersAndPackagesID = " + (updateListParameters.pOperationContainersAndPackagesIDList != null ? updateListParameters.pOperationContainersAndPackagesIDList.Split(',')[i] == "0" ? " NULL " : updateListParameters.pOperationContainersAndPackagesIDList.Split(',')[i] : "NULL");
                            }
                            if (updateListParameters.pHouseBillList != "NA")
                            {
                                updateClause += " , HouseBillID = " + (updateListParameters.pHouseBillList != null ? updateListParameters.pHouseBillList.Split(',')[i] == "0" ? " NULL " : updateListParameters.pHouseBillList.Split(',')[i] : "NULL");
                            }
                            updateClause += " , ModificatorUserID = " + WebSecurity.CurrentUserId.ToString();
                            updateClause += " , ModificationDate = GETDATE() ";


                            updateClause += " WHERE ID = " + updateListParameters.pSelectedReceivablesIDsToUpdate.Split(',')[i];
                            checkException = objCReceivables.UpdateList(updateClause);
                        }
                        else
                        {

                            if (updateListParameters.pOperationContainersAndPackagesIDList != "NA")
                            {
                                updateClause = "  OperationContainersAndPackagesID = " + (updateListParameters.pOperationContainersAndPackagesIDList != null ? updateListParameters.pOperationContainersAndPackagesIDList.Split(',')[i] == "0" ? " NULL " : updateListParameters.pOperationContainersAndPackagesIDList.Split(',')[i] : "NULL");
                            }
                            if (updateListParameters.pHouseBillList != "NA")
                            {
                                updateClause += " , HouseBillID = " + (updateListParameters.pHouseBillList != null ? updateListParameters.pHouseBillList.Split(',')[i] == "0" ? " NULL " : updateListParameters.pHouseBillList.Split(',')[i] : "NULL");
                            }
                            if (IsMescoCompany && updateListParameters.pCategoryList != "")
                            {
                                if (updateListParameters.pCategoryList.Split(',')[i] != "0")
                                    updateClause += " , CategoryID = " + updateListParameters.pCategoryList.Split(',')[i];
                            }
                            updateClause += " , ModificatorUserID = " + WebSecurity.CurrentUserId.ToString();
                            updateClause += " , ModificationDate = GETDATE() ";

                            updateClause += " WHERE ID = " + updateListParameters.pSelectedReceivablesIDsToUpdate.Split(',')[i];
                            checkException = objCReceivables.UpdateList(updateClause);

                        }

                    continue;
                }

                updateClause = " POrC = " + (updateListParameters.pPOrCList.Split(',')[i] == "0" ? " NULL " : updateListParameters.pPOrCList.Split(',')[i]);
                updateClause += " , MeasurementID = " + (updateListParameters.pUOMList.Split(',')[i] == "0" ? " NULL " : updateListParameters.pUOMList.Split(',')[i]);
                updateClause += " , Quantity = " + updateListParameters.pQuantityList.Split(',')[i];
                updateClause += " , SalePrice = " + updateListParameters.pSalePriceList.Split(',')[i];

                if (IsMescoCompany && updateListParameters.pCategoryList != "")
                {
                    if(updateListParameters.pCategoryList.Split(',')[i] != "0")
                        updateClause += " , CategoryID = " + updateListParameters.pCategoryList.Split(',')[i];
                }

                updateClause += " , AmountWithoutVAT = ROUND(" + (decimal.Parse(updateListParameters.pQuantityList.Split(',')[i]) * decimal.Parse(updateListParameters.pSalePriceList.Split(',')[i])) + ",2)" + " \n";
                updateClause += " , TaxeTypeID = " + (updateListParameters.pTaxTypeIDList.Split(',')[i] == "0" ? " NULL " : updateListParameters.pTaxTypeIDList.Split(',')[i]);
                updateClause += " , TaxPercentage = " + updateListParameters.pTaxPercentageList.Split(',')[i];
                updateClause += " , TaxAmount = " + updateListParameters.pTaxAmountList.Split(',')[i];
                updateClause += " , DiscountTypeID = " + (updateListParameters.pDiscountTypeIDList.Split(',')[i] == "0" ? " NULL " : updateListParameters.pDiscountTypeIDList.Split(',')[i]);
                updateClause += " , DiscountPercentage = " + updateListParameters.pDiscountPercentageList.Split(',')[i];
                updateClause += " , DiscountAmount = " + updateListParameters.pDiscountAmountList.Split(',')[i];

                updateClause += " , SaleAmount = " + updateListParameters.pSaleAmountList.Split(',')[i];

                updateClause += " , ExchangeRate = " + updateListParameters.pExchangeRateList.Split(',')[i];
                updateClause += " , CurrencyID = " + (updateListParameters.pCurrencyList.Split(',')[i] == "0" ? " NULL " : updateListParameters.pCurrencyList.Split(',')[i]);
                if(updateListParameters.pReceiptNoList != "NA")
                {
                    updateClause += " , ReceiptNo = " + (updateListParameters.pReceiptNoList != null ?updateListParameters.pReceiptNoList.Split(',')[i] : "0");
                }
                if(updateListParameters.pReceiptDateList != "NA")
                {
                    updateClause += " , ReceiptDate = '" + (updateListParameters.pReceiptDateList != null ?updateListParameters.pReceiptDateList.Split(',')[i] : null) + "'";
                }
                if (updateListParameters.pNotesList == null)
                {
                    updateClause += " , Notes = NULL";
                }
                else
                {
                    updateClause += " , Notes = N'" + updateListParameters.pNotesList.Split(',')[i] + "'";
                }
                updateClause += " , ViewOrder = " + updateListParameters.pViewOrderList.Split(',')[i];
                //the next line is used just in case i am updating invoice items
                updateClause += updateListParameters.pInvoiceID > 0 ? " , InvoiceID = " + updateListParameters.pInvoiceID.ToString() : "";
                updateClause += " , ModificatorUserID = " + WebSecurity.CurrentUserId.ToString();
                updateClause += " , ModificationDate = GETDATE() ";

                if (ObjDefaults.lstCVarDefaults[0].UnEditableCompanyName != "AGR")
                {
                    if(updateListParameters.pOperationContainersAndPackagesIDList != "NA")
                    {
                        updateClause += " , OperationContainersAndPackagesID = " + (updateListParameters.pOperationContainersAndPackagesIDList !=  null? updateListParameters.pOperationContainersAndPackagesIDList.Split(',')[i] == "0" ? " NULL " : updateListParameters.pOperationContainersAndPackagesIDList.Split(',')[i] : "NULL");
                    }
                    if(updateListParameters.pHouseBillList != "NA")
                    {
                        updateClause += " , HouseBillID = " + (updateListParameters.pHouseBillList !=  null? updateListParameters.pHouseBillList.Split(',')[i] == "0" ? " NULL " : updateListParameters.pHouseBillList.Split(',')[i] : "NULL");
                    }
                }
               
                updateClause += " WHERE ID = " + updateListParameters.pSelectedReceivablesIDsToUpdate.Split(',')[i];

                checkException = objCReceivables.UpdateList(updateClause);

                #region ensure receivables are correct
                updateClause = " AmountWithoutVAT = ROUND(" + (decimal.Parse(updateListParameters.pQuantityList.Split(',')[i]) * decimal.Parse(updateListParameters.pSalePriceList.Split(',')[i])) + ",2)" + " \n";
                updateClause += " , TaxPercentage = (select TT.CurrentPercentage FROM TaxeTypes TT WHERE TT.ID = TaxeTypeID)" + " \n";
                updateClause += " , TaxAmount = ROUND((ISNULL(SalePrice, 0) * ISNULL(Quantity, 1)),2) * (select TT.CurrentPercentage/100 FROM TaxeTypes TT WHERE TT.ID = TaxeTypeID)" + " \n";
                updateClause += " , DiscountPercentage = (select TT.CurrentPercentage FROM TaxeTypes TT WHERE TT.ID = DiscountTypeID)" + " \n";
                updateClause += " , DiscountAmount = ROUND((ISNULL(SalePrice, 0) * ISNULL(Quantity, 1)),2) * (select TT.CurrentPercentage/100 FROM TaxeTypes TT WHERE TT.ID = DiscountTypeID)" + " \n";
                updateClause += " , SaleAmount = ROUND((ISNULL(SalePrice, 0) * ISNULL(Quantity, 1)),2)" + " \n"
                              + " + (ROUND((ISNULL(SalePrice, 0) * ISNULL(Quantity, 1)), 2) * ISNULL((select ISNULL(TT.CurrentPercentage / 100, 0) FROM TaxeTypes TT WHERE TT.ID = TaxeTypeID),0))" + " \n"
                              + " - (ROUND((ISNULL(SalePrice, 0) * ISNULL(Quantity, 1)), 2) * ISNULL((select ISNULL(TT.CurrentPercentage / 100, 0) FROM TaxeTypes TT WHERE TT.ID = DiscountTypeID),0))" + " \n";
                updateClause += " WHERE ID = " + updateListParameters.pSelectedReceivablesIDsToUpdate.Split(',')[i];
                checkException = objCReceivables.UpdateList(updateClause);
                #endregion ensure receivables are correct

                if (checkException != null) // an exception is caught in the model
                {
                    if (checkException.Message.Contains("UNIQUE"))
                    {
                        _result = false;
                        #region Update Invoice totals at server side to fix any connection problem
                        CInvoices objCInvoices = new CInvoices();
                        //SET Tax, Discount & Total Amount after setting the AmountWithoutVAT
                        updateClause = " TaxAmount = ROUND((ISNULL(AmountWithoutVAT, 0) * ISNULL(TaxPercentage, 0) / 100),2)" + "\n";
                        updateClause += " , DiscountAmount = ROUND((ISNULL(AmountWithoutVAT, 0) * ISNULL(DiscountPercentage, 0) / 100),2)";
                        updateClause += " , Amount = ROUND((ISNULL(AmountWithoutVAT, 0) + ROUND( (ISNULL(AmountWithoutVAT, 0) * ISNULL(TaxPercentage, 0) / 100),2) - ROUND((ISNULL(AmountWithoutVAT, 0) * ISNULL(DiscountPercentage, 0) / 100),2)),2)";
                        updateClause += " WHERE ID = " + updateListParameters.pInvoiceID.ToString();
                        checkException = objCInvoices.UpdateList(updateClause);
                        #endregion Update Invoice totals at server side to fix any connection problem

                    }
                }
                else
                    _result = true;
            }
            if (_result && updateListParameters.pQuotationRouteID > 0)
            {
                CQuotationRoute objCQuotationRoute = new CQuotationRoute();
                checkException = objCQuotationRoute.UpdateList($" IsChargeEditApprovalRequested = 0, ChargeEditApprovalLevel = 0, ChargeEdit1stApprovalUserID = NULL, ChargeEdit2ndApprovalUserID = NULL, ChargeEdit3rdApprovalUserID = NULL, ChargeEdit4thApprovalUserID = NULL where ID = {updateListParameters.pQuotationRouteID}");
            }
            return _result;
        }

        //pSavedFrom=10: Called from Operations so update tank(i.e pOperationContainersAndPackagesID)
        [HttpGet, HttpPost]
        public bool Update(Int32 pSavedFrom, Int64 pOperationContainersAndPackagesID, bool pIsReceipt, Int64 pHouseBillID
            , Int64 pID, Int32 pOperationID, Int32 pChargeTypeID, int pPOrC, Int32 pSupplierID, Int32 pMeasurementID
            , Int32 pContainerTypeID, decimal pQuantity, Decimal pCostPrice, Decimal pCostAmount, Decimal pSalePrice
            , Decimal pAmountWithoutVAT, Int32 pTaxTypeID, Decimal pTaxPercentage, Decimal pTaxAmount, Int32 pDiscountTypeID, Decimal pDiscountPercentage, Decimal pDiscountAmount
            , Decimal pSaleAmount, Decimal pExchangeRate, Int32 pCurrencyID,int pCategoryID, string pNotes, DateTime pIssueDate
            , Decimal pSalePrice_Foreign, Decimal pExchangeRate_Foreign, Int32 pCurrencyID_Foreign, string pManualChargeType, string pReceiptNumber, DateTime pReceiptDate, Int32 pOperationVehicleID=0 ,bool pIsOfficialReceivable = false, int pQuotationRouteID=0)
        {
            bool _result = false;
            int _RowCount = 0;
            CDefaults objCDefaults = new CDefaults();
            objCDefaults.GetListPaging(999999, 1, "WHERE 1=1", "ID", out _RowCount);
            string[] MescoCompanies = new string[5] { "MES", "SAC", "GLO", "EUR", "ALT" };
            bool IsMescoCompany = MescoCompanies.Contains(objCDefaults.lstCVarDefaults[0].UnEditableCompanyName);

            Exception checkException = null;
            CReceivables objCReceivables = new CReceivables();
            CReceivables_AGR objCReceivables_AGR = new CReceivables_AGR();
            CDefaults ObjDefaults = new CDefaults();
            //ObjDefaults.GetList(" where 1 = 1 ");
            ObjDefaults.GetListPaging(999999, 1, "WHERE 1=1", "ID", out _RowCount);
            //objCDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount);

            //if (ObjDefaults.lstCVarDefaults[0].UnEditableCompanyName == "AGR")
            //{

            //    objCReceivables_AGR.GetItem(pID);
            //    if (objCReceivables_AGR.lstCVarReceivables_AGR[0].InvoiceID == 0 && objCReceivables_AGR.lstCVarReceivables_AGR[0].DraftInvoiceID == 0)
            //    {
            //        if (pSavedFrom == 10)
            //        {
            //            objCReceivables_AGR.lstCVarReceivables_AGR[0].OperationContainersAndPackagesID = pOperationContainersAndPackagesID;
            //            objCReceivables_AGR.lstCVarReceivables_AGR[0].IsReceipt = pIsReceipt;
            //            objCReceivables_AGR.lstCVarReceivables_AGR[0].HouseBillID = pHouseBillID;
            //            #region Foreign Currency
            //            objCReceivables_AGR.lstCVarReceivables_AGR[0].SalePrice_Foreign = pSalePrice_Foreign;
            //            objCReceivables_AGR.lstCVarReceivables_AGR[0].ExchangeRate_Foreign = pExchangeRate_Foreign;
            //            objCReceivables_AGR.lstCVarReceivables_AGR[0].CurrencyID_Foreign = pCurrencyID_Foreign;
            //            #endregion Foreign Currency
            //        }
            //        objCReceivables_AGR.lstCVarReceivables_AGR[0].OperationID = pOperationID;
            //        objCReceivables_AGR.lstCVarReceivables_AGR[0].ChargeTypeID = pChargeTypeID;
            //        objCReceivables_AGR.lstCVarReceivables_AGR[0].POrC = pPOrC;
            //        objCReceivables_AGR.lstCVarReceivables_AGR[0].MeasurementID = pMeasurementID;
            //        objCReceivables_AGR.lstCVarReceivables_AGR[0].ContainerTypeID = pContainerTypeID;
            //        objCReceivables_AGR.lstCVarReceivables_AGR[0].SupplierID = pSupplierID;
            //        objCReceivables_AGR.lstCVarReceivables_AGR[0].Quantity = pQuantity == 0 ? 1 : pQuantity;
            //        objCReceivables_AGR.lstCVarReceivables_AGR[0].CostPrice = pCostPrice;
            //        objCReceivables_AGR.lstCVarReceivables_AGR[0].CostAmount = pCostAmount;
            //        objCReceivables_AGR.lstCVarReceivables_AGR[0].SalePrice = pSalePrice;

            //        objCReceivables_AGR.lstCVarReceivables_AGR[0].AmountWithoutVAT = Math.Round((objCReceivables_AGR.lstCVarReceivables_AGR[0].Quantity * objCReceivables_AGR.lstCVarReceivables_AGR[0].SalePrice), 2);
            //        objCReceivables_AGR.lstCVarReceivables_AGR[0].TaxeTypeID = pTaxTypeID;
            //        objCReceivables_AGR.lstCVarReceivables_AGR[0].TaxPercentage = pTaxPercentage;
            //        objCReceivables_AGR.lstCVarReceivables_AGR[0].TaxAmount = pTaxAmount;
            //        objCReceivables_AGR.lstCVarReceivables_AGR[0].DiscountTypeID = pDiscountTypeID;
            //        objCReceivables_AGR.lstCVarReceivables_AGR[0].DiscountPercentage = pDiscountPercentage;
            //        objCReceivables_AGR.lstCVarReceivables_AGR[0].DiscountAmount = pDiscountAmount;

            //        objCReceivables_AGR.lstCVarReceivables_AGR[0].SaleAmount = pSaleAmount;
            //        objCReceivables_AGR.lstCVarReceivables_AGR[0].ExchangeRate = pExchangeRate;
            //        objCReceivables_AGR.lstCVarReceivables_AGR[0].CurrencyID = pCurrencyID;
            //        objCReceivables_AGR.lstCVarReceivables_AGR[0].Notes = (pNotes == null ? "0" : pNotes);

            //        objCReceivables_AGR.lstCVarReceivables_AGR[0].IssueDate = pIssueDate;

            //        objCReceivables_AGR.lstCVarReceivables_AGR[0].ModificatorUserID = WebSecurity.CurrentUserId;
            //        objCReceivables_AGR.lstCVarReceivables_AGR[0].ModificationDate = DateTime.Now;
            //        checkException = objCReceivables_AGR.SaveMethod(objCReceivables_AGR.lstCVarReceivables_AGR);
            //    }
                
            //}
           
            objCReceivables.GetItem(pID);
            if (objCReceivables.lstCVarReceivables[0].InvoiceID == 0 && objCReceivables.lstCVarReceivables[0].DraftInvoiceID == 0 && objCReceivables.lstCVarReceivables[0].AccNoteID == 0)
            {
                if (pSavedFrom == 10)
                {
                    objCReceivables.lstCVarReceivables[0].OperationContainersAndPackagesID = pOperationContainersAndPackagesID;
                    objCReceivables.lstCVarReceivables[0].IsReceipt = pIsReceipt;
                    objCReceivables.lstCVarReceivables[0].HouseBillID = pHouseBillID;
                    #region Foreign Currency
                    objCReceivables.lstCVarReceivables[0].SalePrice_Foreign = pSalePrice_Foreign;
                    objCReceivables.lstCVarReceivables[0].ExchangeRate_Foreign = pExchangeRate_Foreign;
                    objCReceivables.lstCVarReceivables[0].CurrencyID_Foreign = pCurrencyID_Foreign;
                    #endregion Foreign Currency
                }
                objCReceivables.lstCVarReceivables[0].OperationID = pOperationID;
                objCReceivables.lstCVarReceivables[0].ChargeTypeID = pChargeTypeID;
                objCReceivables.lstCVarReceivables[0].POrC = pPOrC;
                objCReceivables.lstCVarReceivables[0].MeasurementID = pMeasurementID;
                objCReceivables.lstCVarReceivables[0].ContainerTypeID = pContainerTypeID;
                objCReceivables.lstCVarReceivables[0].SupplierID = pSupplierID;
                objCReceivables.lstCVarReceivables[0].Quantity = pQuantity == 0 ? 1 : pQuantity;
                objCReceivables.lstCVarReceivables[0].CostPrice = pCostPrice;
                objCReceivables.lstCVarReceivables[0].CostAmount = pCostAmount;
                objCReceivables.lstCVarReceivables[0].OldSalePrice = objCReceivables.lstCVarReceivables[0].SalePrice != pSalePrice? objCReceivables.lstCVarReceivables[0].SalePrice: objCReceivables.lstCVarReceivables[0].OldSalePrice;
                objCReceivables.lstCVarReceivables[0].SalePrice = pSalePrice;

                objCReceivables.lstCVarReceivables[0].AmountWithoutVAT = Math.Round((objCReceivables.lstCVarReceivables[0].Quantity * objCReceivables.lstCVarReceivables[0].SalePrice), 2);
                objCReceivables.lstCVarReceivables[0].TaxeTypeID = pTaxTypeID;
                objCReceivables.lstCVarReceivables[0].TaxPercentage = pTaxPercentage;
                objCReceivables.lstCVarReceivables[0].TaxAmount = pTaxAmount;
                objCReceivables.lstCVarReceivables[0].DiscountTypeID = pDiscountTypeID;
                objCReceivables.lstCVarReceivables[0].DiscountPercentage = pDiscountPercentage;
                objCReceivables.lstCVarReceivables[0].OperationVehicleID = pOperationVehicleID;
                objCReceivables.lstCVarReceivables[0].SaleAmount = pSaleAmount;
                objCReceivables.lstCVarReceivables[0].SaleAmount = pSaleAmount;
                objCReceivables.lstCVarReceivables[0].ExchangeRate = pExchangeRate;
                objCReceivables.lstCVarReceivables[0].CurrencyID = pCurrencyID;
                objCReceivables.lstCVarReceivables[0].Notes = (pNotes == null ? "0" : pNotes);

                objCReceivables.lstCVarReceivables[0].IssueDate = pIssueDate;
                objCReceivables.lstCVarReceivables[0].ManualChargeType = pManualChargeType;
                objCReceivables.lstCVarReceivables[0].IsOfficial = pIsOfficialReceivable;
                objCReceivables.lstCVarReceivables[0].ReceiptNo = pReceiptNumber;
                objCReceivables.lstCVarReceivables[0].ReceiptDate = pReceiptDate;

                objCReceivables.lstCVarReceivables[0].ModificatorUserID = WebSecurity.CurrentUserId;
                objCReceivables.lstCVarReceivables[0].ModificationDate = DateTime.Now;
            objCReceivables.lstCVarReceivables[0].HouseBillID = pHouseBillID;
            objCReceivables.lstCVarReceivables[0].CategoryID = pCategoryID;
            checkException = objCReceivables.SaveMethod(objCReceivables.lstCVarReceivables);
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

        ////pSavedFrom=10: Called from Operations so update tank(i.e pOperationContainersAndPackagesID)
        //[HttpGet, HttpPost]
        //public bool Update(Int32 pSavedFrom, Int64 pOperationContainersAndPackagesID, bool pIsReceipt, Int64 pHouseBillID
        //    , Int64 pID, Int32 pOperationID, Int32 pChargeTypeID, int pPOrC, Int32 pSupplierID, Int32 pMeasurementID
        //    , Int32 pContainerTypeID, decimal pQuantity, Decimal pCostPrice, Decimal pCostAmount, Decimal pSalePrice
        //    , Decimal pAmountWithoutVAT, Int32 pTaxTypeID, Decimal pTaxPercentage, Decimal pTaxAmount, Int32 pDiscountTypeID, Decimal pDiscountPercentage, Decimal pDiscountAmount
        //    , Decimal pSaleAmount, Decimal pExchangeRate, Int32 pCurrencyID, string pNotes, DateTime pIssueDate)
        //{
        //    bool _result = false;
        //    CVarReceivables objCVarReceivables = new CVarReceivables();
        //    Exception checkException = null;
        //    //the next 4 lines to get the CreatorUserID and CreationDate and set them as they were entered before
        //    CReceivables objCGetCreationInformation = new CReceivables();
        //    objCGetCreationInformation.GetItem(pID);
        //    if (objCGetCreationInformation.lstCVarReceivables[0].InvoiceID == 0 && objCGetCreationInformation.lstCVarReceivables[0].DraftInvoiceID == 0)
        //    {
        //        objCVarReceivables.CreatorUserID = objCGetCreationInformation.lstCVarReceivables[0].CreatorUserID;
        //        objCVarReceivables.CreationDate = objCGetCreationInformation.lstCVarReceivables[0].CreationDate;
        //        objCVarReceivables.GeneratingQRID = objCGetCreationInformation.lstCVarReceivables[0].GeneratingQRID;
        //        objCVarReceivables.AccNoteID = objCGetCreationInformation.lstCVarReceivables[0].AccNoteID;
        //        objCVarReceivables.HouseBillID = objCGetCreationInformation.lstCVarReceivables[0].HouseBillID;
        //        objCVarReceivables.OperationVehicleID = objCGetCreationInformation.lstCVarReceivables[0].OperationVehicleID;
        //        objCVarReceivables.TruckingOrderID = objCGetCreationInformation.lstCVarReceivables[0].TruckingOrderID;
        //        objCVarReceivables.PreviousCutOffDate = objCGetCreationInformation.lstCVarReceivables[0].PreviousCutOffDate;
        //        objCVarReceivables.CutOffDate = objCGetCreationInformation.lstCVarReceivables[0].CutOffDate;
        //        objCVarReceivables.VehicleAgingReportID = objCGetCreationInformation.lstCVarReceivables[0].VehicleAgingReportID;
        //        objCVarReceivables.InvoiceID_3PL = objCGetCreationInformation.lstCVarReceivables[0].InvoiceID_3PL;

        //        if (pSavedFrom == 10)
        //        {
        //            objCVarReceivables.OperationContainersAndPackagesID = pOperationContainersAndPackagesID;
        //            objCVarReceivables.IsReceipt = pIsReceipt;
        //            objCVarReceivables.HouseBillID = pHouseBillID;
        //        }
        //        else
        //        {
        //            objCVarReceivables.OperationContainersAndPackagesID = objCGetCreationInformation.lstCVarReceivables[0].OperationContainersAndPackagesID;
        //            objCVarReceivables.IsReceipt = objCGetCreationInformation.lstCVarReceivables[0].IsReceipt;
        //            objCVarReceivables.HouseBillID = objCGetCreationInformation.lstCVarReceivables[0].HouseBillID;
        //        }

        //        objCVarReceivables.ID = pID;

        //        objCVarReceivables.OperationID = pOperationID;
        //        objCVarReceivables.ChargeTypeID = pChargeTypeID;
        //        objCVarReceivables.POrC = pPOrC;
        //        objCVarReceivables.MeasurementID = pMeasurementID;
        //        objCVarReceivables.ContainerTypeID = pContainerTypeID;
        //        objCVarReceivables.SupplierID = pSupplierID;
        //        objCVarReceivables.Quantity = pQuantity == 0 ? 1 : pQuantity;
        //        objCVarReceivables.CostPrice = pCostPrice;
        //        objCVarReceivables.CostAmount = pCostAmount;
        //        objCVarReceivables.SalePrice = pSalePrice;

        //        objCVarReceivables.AmountWithoutVAT = Math.Round((objCVarReceivables.Quantity * objCVarReceivables.SalePrice), 2);
        //        objCVarReceivables.TaxeTypeID = pTaxTypeID;
        //        objCVarReceivables.TaxPercentage = pTaxPercentage;
        //        objCVarReceivables.TaxAmount = pTaxAmount;
        //        objCVarReceivables.DiscountTypeID = pDiscountTypeID;
        //        objCVarReceivables.DiscountPercentage = pDiscountPercentage;
        //        objCVarReceivables.DiscountAmount = pDiscountAmount;

        //        objCVarReceivables.SaleAmount = pSaleAmount;
        //        objCVarReceivables.ExchangeRate = pExchangeRate;
        //        objCVarReceivables.CurrencyID = pCurrencyID;
        //        objCVarReceivables.Notes = (pNotes == null ? "0" : pNotes);

        //        objCVarReceivables.IssueDate = pIssueDate;

        //        objCVarReceivables.ModificatorUserID = WebSecurity.CurrentUserId;
        //        objCVarReceivables.ModificationDate = DateTime.Now;

        //        CReceivables objCReceivables = new CReceivables();
        //        objCReceivables.lstCVarReceivables.Add(objCVarReceivables);
        //        //if (objCGetCreationInformation.lstCVarReceivables[0].InvoiceID == 0 && objCGetCreationInformation.lstCVarReceivables[0].AccNoteID == 0)
        //        checkException = objCReceivables.SaveMethod(objCReceivables.lstCVarReceivables);
        //    }
        //    if (checkException != null) // an exception is caught in the model
        //    {
        //        if (checkException.Message.Contains("UNIQUE"))
        //            _result = false;
        //    }
        //    else //not unique
        //        _result = true;
        //    #region Tax
        //    int _RowCount2 = 0;
        //    CvwDefaults objCvwDefaults = new CvwDefaults();
        //    objCvwDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount2); //i am sure i ve just one row isa
        //    string CompanyName = objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName;

        //    if ((CompanyName == "CHM" || CompanyName == "OCE") && checkException == null )
        //    {
        //        CChargeTypesTAX objCChargeTypes = new CChargeTypesTAX();
        //        CChargeTypesTAX objCChargeTypesTAX = new CChargeTypesTAX();

        //        objCChargeTypes.GetList("WHERE ID=" + pChargeTypeID);
        //        objCChargeTypesTAX.GetList("WHERE Name=N'" + (objCChargeTypes.lstCVarChargeTypes.Count > 0 ? objCChargeTypes.lstCVarChargeTypes[0].Name : "") + "'");

        //        CVarReceivablesTAX objCVarReceivablesTax = new CVarReceivablesTAX();
        //        checkException = null;
        //        //the next 4 lines to get the CreatorUserID and CreationDate and set them as they were entered before
        //        CReceivablesTax objCGetCreationInformationTax = new CReceivablesTax();

        //        CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
        //        string ReceivablesID = "";
        //        string OperationID = "";
        //        if (CompanyName == "CHM")
        //        {
        //            ReceivablesID = objCCustomizedDBCall.CallStringFunctionByMultiReturn("select top 1 TaxID from ForwardingTransChemTax.dbo.TaxLink WHERE Notes='Receivables' and OriginID = " + pID);
        //            OperationID = objCCustomizedDBCall.CallStringFunctionByMultiReturn("select top 1 TaxID from ForwardingTransChemTax.dbo.TaxLink WHERE Notes='Operations' and OriginID = " + pOperationID);

        //        }
        //        else if (CompanyName == "OCE")
        //        {
        //            ReceivablesID = objCCustomizedDBCall.CallStringFunctionByMultiReturn("select top 1 TaxID from ForwardingTROTax.dbo.TaxLink WHERE Notes='Receivables' and OriginID = " + pID);
        //            OperationID = objCCustomizedDBCall.CallStringFunctionByMultiReturn("select top 1 TaxID from ForwardingTROTax.dbo.TaxLink WHERE Notes='Operations' and OriginID = " + pOperationID);

        //        }
        //        if (OperationID != ""  && ReceivablesID != "")
        //        {
        //            objCGetCreationInformationTax.GetItem(int.Parse(ReceivablesID));
        //            if (objCGetCreationInformationTax.lstCVarReceivables[0].InvoiceID == 0 && objCGetCreationInformationTax.lstCVarReceivables[0].DraftInvoiceID == 0)
        //            {
        //                objCVarReceivablesTax.CreatorUserID = objCGetCreationInformation.lstCVarReceivables[0].CreatorUserID;
        //                objCVarReceivablesTax.CreationDate = objCGetCreationInformation.lstCVarReceivables[0].CreationDate;
        //                objCVarReceivablesTax.GeneratingQRID = 0;// objCGetCreationInformation.lstCVarReceivables[0].GeneratingQRID;
        //                objCVarReceivablesTax.AccNoteID = objCGetCreationInformation.lstCVarReceivables[0].AccNoteID;
        //                objCVarReceivablesTax.HouseBillID = objCGetCreationInformation.lstCVarReceivables[0].HouseBillID;
        //                objCVarReceivablesTax.OperationVehicleID = objCGetCreationInformation.lstCVarReceivables[0].OperationVehicleID;
        //                objCVarReceivablesTax.TruckingOrderID = objCGetCreationInformation.lstCVarReceivables[0].TruckingOrderID;
        //                objCVarReceivablesTax.PreviousCutOffDate = objCGetCreationInformation.lstCVarReceivables[0].PreviousCutOffDate;
        //                objCVarReceivablesTax.CutOffDate = objCGetCreationInformation.lstCVarReceivables[0].CutOffDate;
        //                objCVarReceivablesTax.VehicleAgingReportID = objCGetCreationInformation.lstCVarReceivables[0].VehicleAgingReportID;
        //                if (pSavedFrom == 10)
        //                {
        //                    objCVarReceivablesTax.OperationContainersAndPackagesID = pOperationContainersAndPackagesID;
        //                    objCVarReceivablesTax.IsReceipt = pIsReceipt;
        //                    objCVarReceivablesTax.HouseBillID = pHouseBillID;
        //                }
        //                else
        //                {
        //                    objCVarReceivablesTax.OperationContainersAndPackagesID = objCGetCreationInformation.lstCVarReceivables[0].OperationContainersAndPackagesID;
        //                    objCVarReceivablesTax.IsReceipt = objCGetCreationInformation.lstCVarReceivables[0].IsReceipt;
        //                    objCVarReceivablesTax.HouseBillID = objCGetCreationInformation.lstCVarReceivables[0].HouseBillID;
        //                }
        //                objCVarReceivablesTax.ID = int.Parse(ReceivablesID);

        //                objCVarReceivablesTax.OperationID = int.Parse(OperationID);
        //                objCVarReceivablesTax.ChargeTypeID = pChargeTypeID;
        //                objCVarReceivablesTax.POrC = pPOrC;
        //                objCVarReceivablesTax.MeasurementID = pMeasurementID;
        //                objCVarReceivablesTax.ContainerTypeID = pContainerTypeID;
        //                objCVarReceivablesTax.SupplierID = pSupplierID;
        //                objCVarReceivablesTax.Quantity = pQuantity == 0 ? 1 : pQuantity;
        //                objCVarReceivablesTax.CostPrice = pCostPrice;
        //                objCVarReceivablesTax.CostAmount = pCostAmount;
        //                objCVarReceivablesTax.SalePrice = pSalePrice;

        //                objCVarReceivablesTax.AmountWithoutVAT = Math.Round((objCVarReceivables.Quantity * objCVarReceivables.SalePrice), 2);
        //                objCVarReceivablesTax.TaxeTypeID = pTaxTypeID;
        //                objCVarReceivablesTax.TaxPercentage = pTaxPercentage;
        //                objCVarReceivablesTax.TaxAmount = pTaxAmount;
        //                objCVarReceivablesTax.DiscountTypeID = pDiscountTypeID;
        //                objCVarReceivablesTax.DiscountPercentage = pDiscountPercentage;
        //                objCVarReceivablesTax.DiscountAmount = pDiscountAmount;

        //                objCVarReceivablesTax.SaleAmount = pSaleAmount;
        //                objCVarReceivablesTax.ExchangeRate = pExchangeRate;
        //                objCVarReceivablesTax.CurrencyID = pCurrencyID;
        //                objCVarReceivablesTax.Notes = (pNotes == null ? "0" : pNotes);

        //                objCVarReceivablesTax.IssueDate = pIssueDate;

        //                objCVarReceivablesTax.ModificatorUserID = WebSecurity.CurrentUserId;
        //                objCVarReceivablesTax.ModificationDate = DateTime.Now;

        //                CReceivablesTax objCReceivablesTax = new CReceivablesTax();
        //                objCReceivablesTax.lstCVarReceivables.Add(objCVarReceivablesTax);
        //                //if (objCGetCreationInformation.lstCVarReceivables[0].InvoiceID == 0 && objCGetCreationInformation.lstCVarReceivables[0].AccNoteID == 0)
        //                checkException = objCReceivablesTax.SaveMethod(objCReceivablesTax.lstCVarReceivables);
        //            }
        //            if (checkException != null) // an exception is caught in the model
        //            {
        //                if (checkException.Message.Contains("UNIQUE"))
        //                    _result = false;
        //            }
        //            else //not unique
        //                _result = true;

        //        }

        //    }
        //    #endregion

        //    return _result;
        //}

        [HttpGet, HttpPost]
        public bool Delete( [FromBody] DeleteListParameters DeleteListParameters)
        {
            bool _result = true;
            Exception checkException = null;
            CReceivablesTax objCReceivablesTax = new CReceivablesTax();
            CPayablesTAX objCPayablesTax = new CPayablesTAX();
            COperationLog objCOperationLog = new COperationLog();


            int _RowCount2 = 0;
            CvwDefaults objCvwDefaults = new CvwDefaults();
            objCvwDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount2); //i am sure i ve just one row isa
            string CompanyName = objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName;
            if (CompanyName == "CHM" || CompanyName == "OCE")
            {
                CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
                string ReceivablesID = "";


                foreach (var currentID in DeleteListParameters.pReceivablesIDs.Split(','))
                {
                    if (CompanyName == "CHM")
                    {
                        ReceivablesID = objCCustomizedDBCall.CallStringFunctionByMultiReturn("select top 1 TaxID from ForwardingTransChemTax.dbo.TaxLink WHERE Notes='Receivables' and OriginID = " + currentID);
                    }
                    else if (CompanyName == "OCE")
                    {
                        ReceivablesID = objCCustomizedDBCall.CallStringFunctionByMultiReturn("select top 1 TaxID from ForwardingTROTax.dbo.TaxLink WHERE Notes='Receivables' and OriginID = " + currentID);
                    }

                    checkException = objCReceivablesTax.DeleteList("WHERE ID=" + ReceivablesID);
                    if (checkException == null)
                    {
                      
                        objCPayablesTax.UpdateList("ReceivableID=NULL WHERE ReceivableID=" + ReceivablesID);
                        if (CompanyName == "CHM")
                        {
                            objCCustomizedDBCall.CallStringFunctionByMultiReturn("delete from ForwardingTransChemTax.dbo.TaxLink WHERE Notes='Receivables' and TaxID = " + ReceivablesID);
                        }
                        else if (CompanyName == "OCE")
                        {
                            objCCustomizedDBCall.CallStringFunctionByMultiReturn("delete from ForwardingTROTax.dbo.TaxLink WHERE Notes='Receivables' and TaxID = " + ReceivablesID);
                        }

                    }
                    else
                        _result = false;
                }
            }
            
            CReceivables objCReceivables = new CReceivables();
            CPayables objCPayables = new CPayables();

            if(CompanyName == "MES")
            {

                objCReceivables.GetList("WHERE ID IN(" + DeleteListParameters.pReceivablesIDs + ") and crmcode <> '' ");

                if (objCReceivables.lstCVarReceivables.Count > 0 )
                    _result = false;

            }


            if(_result)
            checkException = objCReceivables.DeleteList("WHERE ID IN(" + DeleteListParameters.pReceivablesIDs + ")" );
            if (checkException == null && _result)
            {
                checkException = objCOperationLog.UpdateList("UserID=" + WebSecurity.CurrentUserId.ToString() + ", UserName=N'" + WebSecurity.CurrentUserName + "'"
                                            + " WHERE ActionOnRowID IN (" + DeleteListParameters.pReceivablesIDs + ")" + " AND ActionType='D' AND UserID IS NULL AND LogFor = " + 20);
                //    + " AND ActionOnRowID IN(" + DeleteListParameters.pReceivablesIDs.ToString() + ")"

                checkException = objCPayables.UpdateList("ReceivableID=NULL WHERE ReceivableID IN(" + DeleteListParameters.pReceivablesIDs + ")" ); 
            }
            else
                _result = false;


            //foreach (var currentID in DeleteListParameters.pReceivablesIDs.Split(','))
            //{


            //    checkException = objCReceivables.DeleteList("WHERE ID=" + currentID);
            //    if (checkException == null)
            //    {
            //        checkException = objCOperationLog.UpdateList("UserID=" + WebSecurity.CurrentUserId.ToString() + ", UserName=N'" + WebSecurity.CurrentUserName + "'"
            //                                    + " WHERE ActionOnRowID IN (" + DeleteListParameters.pReceivablesIDs + ") AND ActionOnRowID IN(" + DeleteListParameters.pReceivablesIDs.ToString() + ")"
            //                                    + " AND ActionType='D' AND UserID IS NULL AND LogFor = " + 20);
            //        checkException = objCPayables.UpdateList("ReceivableID=NULL WHERE ReceivableID=" + currentID);
            //    }
            //    else
            //        _result = false;
            //}
            return _result;
        }


        [HttpGet, HttpPost]
        public bool Cancel([FromBody] DeleteListParameters DeleteListParameters)
        {
            bool _result = true;
            Exception checkException = null;
            CReceivablesTax objCReceivablesTax = new CReceivablesTax();
            CPayablesTAX objCPayablesTax = new CPayablesTAX();
            COperationLog objCOperationLog = new COperationLog();


            int _RowCount2 = 0;
            CvwDefaults objCvwDefaults = new CvwDefaults();
            objCvwDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount2); //i am sure i ve just one row isa
            string CompanyName = objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName;
    

            CReceivables objCReceivables = new CReceivables();
            CPayables objCPayables = new CPayables();

            if (CompanyName == "MES")
            {

                objCReceivables.GetList("WHERE ID IN(" + DeleteListParameters.pReceivablesIDs + ") and crmcode <> '' ");


                CCustomizedDBCall cCustomizedDBCall = new CCustomizedDBCall();

                foreach(var charge in objCReceivables.lstCVarReceivables)
                {
                    CCRMCancelledCharges cCRMCancelledCharges = new CCRMCancelledCharges();
                    cCRMCancelledCharges.GetList($"where ChargeID = {charge.ID} and type = 1");
                    if(!(charge.InvoiceID > 0 || charge.DraftInvoiceID > 0))
                    if(cCRMCancelledCharges.lstCVarCRMCancelledCharges.Count > 0)
                    {
                        //cCustomizedDBCall.CallStringFunction($"update dbo.CRMCancelledCharges set  IsCancelled = 1 where id = {cCRMCancelledCharges.lstCVarCRMCancelledCharges[0].ID}");
                        checkException = cCRMCancelledCharges.UpdateList($"IsCancelled = 1 where id = {cCRMCancelledCharges.lstCVarCRMCancelledCharges[0].ID}") ;
                        if(checkException == null)
                        checkException =  objCReceivables.UpdateList($"SalePrice = 0 , SaleAmount = 0 , isdeleted = 1 , AmountWithoutVAT = 0  where id = {cCRMCancelledCharges.lstCVarCRMCancelledCharges[0].ID} ");

                    }
                    else
                    {

                        CVarCRMCancelledCharges cVarCRMCancelledCharges = new CVarCRMCancelledCharges();

                        cVarCRMCancelledCharges.ChargeID = charge.ID; 
                        cVarCRMCancelledCharges.Type = 1 ; 
                        cVarCRMCancelledCharges.IsCancelled = true ; 
                        cVarCRMCancelledCharges.UserId = WebSecurity.CurrentUserId; 
                        cVarCRMCancelledCharges.CanncellationDate = DateTime.Now;
                        cCRMCancelledCharges.lstCVarCRMCancelledCharges.Add(cVarCRMCancelledCharges);
                        checkException =   cCRMCancelledCharges.SaveMethod(cCRMCancelledCharges.lstCVarCRMCancelledCharges); 


                        if(checkException == null )
                          checkException = objCReceivables.UpdateList($"SalePrice = 0 , SaleAmount = 0, isdeleted = 1 , AmountWithoutVAT = 0  where id = {charge.ID} ");


                        //if (checkException == null)
                        //{
                        //    checkException = objCOperationLog.UpdateList("UserID=" + WebSecurity.CurrentUserId.ToString() + ", UserName=N'" + WebSecurity.CurrentUserName + "'"
                        //                                + " WHERE ActionOnRowID IN (" + DeleteListParameters.pReceivablesIDs + ") AND ActionOnRowID IN(" + DeleteListParameters.pReceivablesIDs.ToString() + ")"
                        //                                + " AND ActionType='C' AND UserID IS NULL AND LogFor = " + 20);
                        //}


                        //cCustomizedDBCall.CallStringFunction($"INSERT INTO dbo.CRMCancelledCharges (ChargeID, Type, IsCancelled, UserId, CanncellationDate) VALUES ({charge.ID}, {1}, 1, {WebSecurity.CurrentUserId.ToString()}, GETDATE());\r\n");
                    }


                   

                }







            }


            if (checkException == null)
            {
                _result = true;
            }




                return _result;
        }






        [HttpGet, HttpPost]
        public object[] CopyReceivable(Int64 pReceivableIDToCopy, Int32 pNumberOfDuplicates)
        {
            CvwReceivables objCvwReceivables = new CvwReceivables();
            CReceivables objCReceivables = new CReceivables();
            Int64 pOperationID = 0;
            int _RowCount = 0;
            objCvwReceivables.GetListPaging(999999, 1, "WHERE ID=" + pReceivableIDToCopy, "ID", out _RowCount);
            pOperationID = objCvwReceivables.lstCVarvwReceivables[0].OperationID;
            for (int i = 0; i < pNumberOfDuplicates; i++)
            {
                CVarReceivables objCVarReceivables = new CVarReceivables();
                objCVarReceivables.OperationID = objCvwReceivables.lstCVarvwReceivables[0].OperationID;
                objCVarReceivables.ChargeTypeID = objCvwReceivables.lstCVarvwReceivables[0].ChargeTypeID;
                objCVarReceivables.POrC = objCvwReceivables.lstCVarvwReceivables[0].POrC;
                objCVarReceivables.SupplierID = objCvwReceivables.lstCVarvwReceivables[0].SupplierID;
                objCVarReceivables.MeasurementID = objCvwReceivables.lstCVarvwReceivables[0].MeasurementID;
                objCVarReceivables.ContainerTypeID = objCvwReceivables.lstCVarvwReceivables[0].ContainerTypeID;
                objCVarReceivables.PackageTypeID = objCvwReceivables.lstCVarvwReceivables[0].PackageTypeID;
                objCVarReceivables.Quantity = objCvwReceivables.lstCVarvwReceivables[0].Quantity;
                objCVarReceivables.CostPrice = objCvwReceivables.lstCVarvwReceivables[0].CostPrice;
                objCVarReceivables.CostAmount = objCvwReceivables.lstCVarvwReceivables[0].CostAmount;
                objCVarReceivables.SalePrice = objCvwReceivables.lstCVarvwReceivables[0].SalePrice;

                objCVarReceivables.AmountWithoutVAT = Math.Round((objCVarReceivables.Quantity * objCVarReceivables.SalePrice),2 );
                objCVarReceivables.TaxeTypeID = objCvwReceivables.lstCVarvwReceivables[0].TaxTypeID;
                objCVarReceivables.TaxPercentage = objCvwReceivables.lstCVarvwReceivables[0].TaxPercentage;
                objCVarReceivables.TaxAmount = objCvwReceivables.lstCVarvwReceivables[0].TaxAmount;
                objCVarReceivables.DiscountTypeID = objCvwReceivables.lstCVarvwReceivables[0].DiscountTypeID;
                objCVarReceivables.DiscountPercentage = objCvwReceivables.lstCVarvwReceivables[0].DiscountPercentage;
                objCVarReceivables.DiscountAmount = objCvwReceivables.lstCVarvwReceivables[0].DiscountAmount;

                objCVarReceivables.SaleAmount = objCvwReceivables.lstCVarvwReceivables[0].SaleAmount;
                objCVarReceivables.InvoiceID = 0;
                objCVarReceivables.AccNoteID = 0;
                objCVarReceivables.ExchangeRate = objCvwReceivables.lstCVarvwReceivables[0].ExchangeRate;
                objCVarReceivables.CurrencyID = objCvwReceivables.lstCVarvwReceivables[0].CurrencyID;
                objCVarReceivables.ExchangeRate_Foreign = objCvwReceivables.lstCVarvwReceivables[0].ExchangeRate_Foreign;
                objCVarReceivables.CurrencyID_Foreign = objCvwReceivables.lstCVarvwReceivables[0].CurrencyID_Foreign;

                objCVarReceivables.IsReceipt = objCvwReceivables.lstCVarvwReceivables[0].IsReceipt;
                objCVarReceivables.GeneratingQRID = 0;
                objCVarReceivables.Notes = "COPIED";

                objCVarReceivables.IssueDate = DateTime.Now;
                objCVarReceivables.OperationContainersAndPackagesID = 0;

                objCVarReceivables.ViewOrder = objCvwReceivables.lstCVarvwReceivables[0].ViewOrder;
                objCVarReceivables.IsDeleted = false;
                objCVarReceivables.CreatorUserID = objCVarReceivables.ModificatorUserID = WebSecurity.CurrentUserId;
                objCVarReceivables.CreationDate = objCVarReceivables.ModificationDate = DateTime.Now;
                objCVarReceivables.PayableID = 0;
                objCVarReceivables.OperationVehicleID = objCvwReceivables.lstCVarvwReceivables[0].OperationVehicleID;
                objCVarReceivables.TruckingOrderID = objCvwReceivables.lstCVarvwReceivables[0].TruckingOrderID;

                objCVarReceivables.PreviousCutOffDate = DateTime.Parse("01/01/1900");
                objCVarReceivables.CutOffDate = DateTime.Parse("01/01/1900");
                objCVarReceivables.ReceiptDate = objCvwReceivables.lstCVarvwReceivables[0].ReceiptDate;
                objCVarReceivables.ReceiptNo = objCvwReceivables.lstCVarvwReceivables[0].ReceiptNo;
                objCVarReceivables.TariffID = 0;
                objCVarReceivables.ManualChargeType = "0";
                objCVarReceivables.CostCenterId = 0;
                objCVarReceivables.IsOfficial = false;
                objCVarReceivables.CategoryID = objCvwReceivables.lstCVarvwReceivables[0].CategoryID;
                objCVarReceivables.crmCode = "";



                objCReceivables.lstCVarReceivables.Add(objCVarReceivables);
            }
            objCReceivables.SaveMethod(objCReceivables.lstCVarReceivables);

            objCvwReceivables.GetListPaging(999999, 1, "WHERE IsDeleted=0 AND (OperationID=" + pOperationID + " OR MasterOperationID=" + pOperationID + ")", "ChargeTypeName", out _RowCount);

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };

            return new object[] {
                serializer.Serialize(objCvwReceivables.lstCVarvwReceivables)
            };
        }

        [HttpGet, HttpPost]
        public object[] PrintReceivable(Int64 pReceivableIDToPrint, Int32 pOperationID)
        {
            CvwReceivables objCvwReceivables = new CvwReceivables();
            CvwOperations objCvwOperations = new CvwOperations();
            int _RowCount = 0;
            Exception checkException = null;
            checkException = objCvwOperations.GetListPaging(1, 1, "WHERE ID=" + pOperationID.ToString(), "ID", out _RowCount);
            checkException = objCvwReceivables.GetListPaging(1, 1, "WHERE ID=" + pReceivableIDToPrint.ToString(), "ID", out _RowCount);

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                serializer.Serialize(objCvwReceivables.lstCVarvwReceivables[0])
                , new JavaScriptSerializer().Serialize(objCvwOperations.lstCVarvwOperations[0])
            };
        }

        [HttpGet, HttpPost]
        public bool ApplyDefaultReceivables(Int64 pOperationID, string pWhereClause)
        {
            bool _result = false;
            Exception checkException = null;
            //string pReceivableIDsToDelete = "";
            CReceivables objCReceivables = new CReceivables();

            //checkException = objCReceivables.GetList(" WHERE OperationID = " + pOperationID.ToString() + " AND InvoiceID IS NULL AND AccNoteID IS NULL ");
            //if (objCReceivables.lstCVarReceivables.Count > 0)
            //{
            //    pReceivableIDsToDelete = objCReceivables.lstCVarReceivables[0].ID.ToString();
            //    for (int i = 1; i < objCReceivables.lstCVarReceivables.Count; i++)
            //        pReceivableIDsToDelete += "," + objCReceivables.lstCVarReceivables[i].ID.ToString();
            //}
            //if (pReceivableIDsToDelete != "")
            //    Delete(pReceivableIDsToDelete, pOperationID);
            //objCReceivables.lstCVarReceivables.Clear();
            ////checkException = objCReceivables.DeleteList(" WHERE OperationID = " + pOperationID.ToString() + " AND InvoiceID IS NULL ");
            int _RowCount = 0;
            if (checkException == null)
            {
                //those 2 lines are to get the Charge types from DB to get the default currency
                CDefaults objCDefaults = new CDefaults();
                objCDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount); //i am sure i ve just one row isa

                //those 2 lines are to get the default charge types from DB
                CChargeTypes objCChargeTypes = new CChargeTypes();
                //objCChargeTypes.GetList(pWhereClause);
                objCChargeTypes.GetListPaging(1500, 1, pWhereClause, "ID", out _RowCount);

                //CVarReceivables objCVarReceivables = new CVarReceivables();

                foreach (var rowChargeType in objCChargeTypes.lstCVarChargeTypes)
                {
                    CVarReceivables objCVarReceivables = new CVarReceivables();

                    objCVarReceivables.OperationID = pOperationID;
                    objCVarReceivables.ChargeTypeID = rowChargeType.ID;
                    objCVarReceivables.Quantity = 1;
                    objCVarReceivables.MeasurementID = rowChargeType.MeasurementID;
                    objCVarReceivables.ExchangeRate = 1;
                    objCVarReceivables.CurrencyID = objCDefaults.lstCVarDefaults[0].CurrencyID;
                    objCVarReceivables.ExchangeRate_Foreign = 1;
                    objCVarReceivables.CurrencyID_Foreign = objCDefaults.lstCVarDefaults[0].CurrencyID;

                    objCVarReceivables.Notes = rowChargeType.Notes;

                    objCVarReceivables.IssueDate = DateTime.Now;
                    objCVarReceivables.OperationContainersAndPackagesID = 0;

                    objCVarReceivables.PreviousCutOffDate = DateTime.Parse("01/01/1900");
                    objCVarReceivables.CutOffDate = DateTime.Parse("01/01/1900");
                    objCVarReceivables.ReceiptDate = DateTime.Parse("01/01/1900");
                    objCVarReceivables.ReceiptNo = "";
                    objCVarReceivables.TariffID = 0;
                    objCVarReceivables.ManualChargeType = "0";
                    objCVarReceivables.CostCenterId = 0;
                    objCVarReceivables.IsOfficial = false;
                    objCVarReceivables.crmCode = "";

                    objCVarReceivables.CreatorUserID = objCVarReceivables.ModificatorUserID = WebSecurity.CurrentUserId;
                    objCVarReceivables.ModificationDate = objCVarReceivables.CreationDate = DateTime.Now;

                    objCReceivables.lstCVarReceivables.Add(objCVarReceivables);
                }
                checkException = objCReceivables.SaveMethod(objCReceivables.lstCVarReceivables);
                if (checkException == null)
                    _result = true;
            }
            return _result;
        }

        [HttpGet, HttpPost]
        // i called the pWhereClause1 instead of pWhereClause to avoid the error of routing when 2 actions have the same signature
        public bool GenerateReceivablesFromQuotation(Int64 pOperationID, string pWhereClause1, Int64 pQuotationRouteID)
        {
            bool _result = false;
            Exception checkException = null;
            //string pReceivableIDsToDelete = "";
            CReceivables objCReceivables = new CReceivables();

            //checkException = objCReceivables.GetList(" WHERE OperationID = " + pOperationID.ToString() + " AND InvoiceID IS NULL ");
            //if (objCReceivables.lstCVarReceivables.Count > 0)
            //{
            //    pReceivableIDsToDelete = objCReceivables.lstCVarReceivables[0].ID.ToString();
            //    for (int i = 1; i < objCReceivables.lstCVarReceivables.Count; i++)
            //        pReceivableIDsToDelete += "," + objCReceivables.lstCVarReceivables[i].ID.ToString();
            //}
            //if (pReceivableIDsToDelete != "")
            //    Delete(pReceivableIDsToDelete, pOperationID);
            //objCReceivables.lstCVarReceivables.Clear();
            ////objCReceivables.DeleteList(" WHERE OperationID = " + pOperationID.ToString() + " AND InvoiceID IS NULL ");
            if (checkException == null)
            {
                //those 2 lines are to get the QuotationCharges from DB
                CQuotationCharges objCQuotationCharges = new CQuotationCharges();
                //objCQuotationCharges.GetList(pWhereClause1);
                int _RowCount = 0;
                checkException = objCQuotationCharges.GetListPaging(5000, 1, pWhereClause1, " ID ", out _RowCount);

                //CVarReceivables objCVarReceivables = new CVarReceivables();

                foreach (var rowChargeType in objCQuotationCharges.lstCVarQuotationCharges)
                {
                    CVarReceivables objCVarReceivables = new CVarReceivables();

                    objCVarReceivables.OperationID = pOperationID;
                    objCVarReceivables.ChargeTypeID = rowChargeType.ChargeTypeID;
                    objCVarReceivables.POrC = 0;
                    objCVarReceivables.SupplierID = 0;
                    objCVarReceivables.MeasurementID = rowChargeType.MeasurementID;
                    objCVarReceivables.ContainerTypeID = rowChargeType.ContainerTypeID;
                    objCVarReceivables.PackageTypeID = rowChargeType.PackageTypeID;
                    objCVarReceivables.Quantity = rowChargeType.SaleQuantity == 0 ? 1 : rowChargeType.SaleQuantity;
                    //objCVarReceivables.CostPrice = rowChargeType.CostPrice;
                    //objCVarReceivables.CostAmount = rowChargeType.CostAmount;
                    objCVarReceivables.SalePrice = rowChargeType.SalePrice;

                    objCVarReceivables.AmountWithoutVAT = Math.Round((objCVarReceivables.Quantity * objCVarReceivables.SalePrice),2 ); //CostQuantity=SaleQuantity

                    objCVarReceivables.SaleAmount = rowChargeType.SaleAmount;
                    objCVarReceivables.CurrencyID = rowChargeType.SaleCurrencyID;
                    objCVarReceivables.ExchangeRate = rowChargeType.SaleExchangeRate;
                    objCVarReceivables.GeneratingQRID = pQuotationRouteID;
                    objCVarReceivables.Notes = rowChargeType.Notes;

                    objCVarReceivables.IssueDate = DateTime.Now;
                    objCVarReceivables.OperationContainersAndPackagesID = 0;

                    objCVarReceivables.PreviousCutOffDate = DateTime.Parse("01/01/1900");
                    objCVarReceivables.CutOffDate = DateTime.Parse("01/01/1900");
                    objCVarReceivables.ReceiptDate = DateTime.Parse("01/01/1900");
                    objCVarReceivables.ReceiptNo = "";
                    objCVarReceivables.TariffID = 0;
                    objCVarReceivables.ManualChargeType = "0";
                    objCVarReceivables.CostCenterId = 0;
                    objCVarReceivables.IsOfficial = false;
                    objCVarReceivables.crmCode = "";

                    objCVarReceivables.CreatorUserID = objCVarReceivables.ModificatorUserID = WebSecurity.CurrentUserId;
                    objCVarReceivables.ModificationDate = objCVarReceivables.CreationDate = DateTime.Now;

                    objCReceivables.lstCVarReceivables.Add(objCVarReceivables);
                }
                checkException = objCReceivables.SaveMethod(objCReceivables.lstCVarReceivables);
                if (checkException == null)
                {
                    _result = true;
                    COperations objCOperations = new COperations();
                    checkException = objCOperations.UpdateList("QuotationRouteID=" + pQuotationRouteID + " WHERE ID=" + pOperationID);
                }
            }
            return _result;
        }

        //[HttpGet, HttpPost]
        //public bool GenerateReceivablesFromPayables(string pWhereClause1)
        //{
        //    bool _result = false;

        //    CReceivables objCReceivables = new CReceivables();
        //    Exception checkException = objCReceivables.DeleteList(pWhereClause1 + " AND InvoiceID IS NULL ");
        //    if (checkException == null)
        //    {
        //        //those 2 lines are to get the Payables from DB
        //        CPayables objCPayables = new CPayables();
        //        objCPayables.GetList(pWhereClause1);

        //        //CVarReceivables objCVarReceivables = new CVarReceivables();

        //        foreach (var rowChargeType in objCPayables.lstCVarPayables)
        //        {
        //            CVarReceivables objCVarReceivables = new CVarReceivables();

        //            objCVarReceivables.OperationID = rowChargeType.OperationID;
        //            objCVarReceivables.ChargeTypeID = rowChargeType.ChargeTypeID;
        //            objCVarReceivables.POrC = rowChargeType.POrC;
        //            objCVarReceivables.MeasurementID = rowChargeType.MeasurementID;
        //            //objCVarReceivables.SupplierID = rowChargeType.SupplierID;
        //            objCVarReceivables.ContainerTypeID = rowChargeType.ContainerTypeID;
        //            //objCVarReceivables.PackageTypeID = rowChargeType.PackageTypeID;
        //            objCVarReceivables.Quantity = rowChargeType.Quantity;
        //            objCVarReceivables.CostPrice = rowChargeType.CostPrice;
        //            objCVarReceivables.CostAmount = rowChargeType.CostAmount;
        //            objCVarReceivables.SalePrice = 0;
        //            objCVarReceivables.SaleAmount = 0;
        //            objCVarReceivables.ExchangeRate = rowChargeType.ExchangeRate;
        //            objCVarReceivables.CurrencyID = rowChargeType.CurrencyID;
        //            objCVarReceivables.Notes = "0";

        //            objCVarReceivables.CreatorUserID = objCVarReceivables.ModificatorUserID = WebSecurity.CurrentUserId;
        //            objCVarReceivables.ModificationDate = objCVarReceivables.CreationDate = DateTime.Now;

        //            objCReceivables.lstCVarReceivables.Add(objCVarReceivables);
        //        }
        //        checkException = objCReceivables.SaveMethod(objCReceivables.lstCVarReceivables);
        //        if (checkException == null)
        //            _result = true;
        //    }
        //    return _result;
        //}

        [HttpGet, HttpPost]
        public object[] GetReceivablesSubtotals(Int64 pOperationID)
        {
            Forwarding.MvcApp.Models.Operations.Operations.Customized.CvwReceivablesSubTotals objCvwReceivablesSubTotals = new Forwarding.MvcApp.Models.Operations.Operations.Customized.CvwReceivablesSubTotals();
            //objCvwReceivablesSubTotals.GetList_Customized(" WHERE OperationID = " + pOperationID.ToString() + " OR MasterOperationID = " + pOperationID.ToString() + " GROUP BY CurrencyCode ORDER BY CurrencyCode ");// the condition of isdeleted = 0 is in the view

         Exception exception =    objCvwReceivablesSubTotals.GetList_Customized(" WHERE OperationID = " + pOperationID.ToString() + " GROUP BY CurrencyCode ORDER BY CurrencyCode ");// the condition of isdeleted = 0 is in the view

            Int32 _RowCount = objCvwReceivablesSubTotals.lstCVarvwReceivablesSubTotals.Count;

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] { serializer.Serialize(objCvwReceivablesSubTotals.lstCVarvwReceivablesSubTotals), _RowCount };
        }

        [HttpGet, HttpPost]
        public Int32 GetDefaultTaxTypeID(Int32 pChargeTypeIDToGetDefaultTax)
        {
            CChargeTypes objCChargeTypes = new Models.MasterData.Invoicing.Generated.CChargeTypes();
            objCChargeTypes.GetList("WHERE ID=" + pChargeTypeIDToGetDefaultTax);
            return objCChargeTypes.lstCVarChargeTypes[0].TaxeTypeID;
        }


        [HttpGet, HttpPost]
        public object[] InsertListFromExcel_Receivables([FromBody] InsertListFromExcel_Receivables InsertListFromExcel_Receivables)
        {
            object[] OBJ = new object[3];
            string pReturnedMessage = "";
            Exception checkException = null;
            int _NumberOfRows = InsertListFromExcel_Receivables.pCodeList.Split(',').Length;
            var _ArrCode = InsertListFromExcel_Receivables.pCodeList.Split(',');
            var _ArrQty = InsertListFromExcel_Receivables.pQtyList.Split(',');
            var _ArrUnitPrice = InsertListFromExcel_Receivables.pUnitPriceList.Split(',');
            var _ArrNotes = InsertListFromExcel_Receivables.pNotesList.Split(',');
            var _ArrRate = InsertListFromExcel_Receivables.pRateList.Split(',');
            var _ArrCurrency = InsertListFromExcel_Receivables.pCurrencyList.Split(',');
            var _ArrTax = InsertListFromExcel_Receivables.pTaxList.Split(',');

            int _RowCount;

            CDefaults objCDefaults = new CDefaults();
            objCDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount); //i am sure i ve just one row isa

            if (InsertListFromExcel_Receivables.pOperationID == 0)
                pReturnedMessage = "Operation Not Found";

            CChargeTypes objCChargeTypes = new CChargeTypes();

            CTaxeTypes objCTaxTypes = new CTaxeTypes();
            objCTaxTypes.GetList("WHERE 1=1");

            CCurrencies objCCurrencies = new CCurrencies();
            objCCurrencies.GetList("WHERE 1=1");

            string pListCode = "";

            //Check Accounts
            for (int i = 0; i < _NumberOfRows; i++)
            {
                pListCode += "N'" + _ArrCode[i] + "',";

                if (objCCurrencies.lstCVarCurrencies.Where(x => x.Code == _ArrCurrency[i].ToString()).ToList().Count == 0)
                    pReturnedMessage = "Currency Code Not Found";

                if (_ArrTax[i] != "0")
                {
                    if (objCTaxTypes.lstCVarTaxeTypes.Where(x => x.CurrentPercentage == Convert.ToDecimal(_ArrTax[i])).ToList().Count == 0)
                        pReturnedMessage = "Tax Percentage Not Found";
                }


            }

            objCChargeTypes.GetList("Where Code in (" + pListCode.Remove(pListCode.Length - 1) + ")");

            var _ArrCurrency_ListCopy = new string[_NumberOfRows];
            var _ArrTax_ListCopy = new string[_NumberOfRows];


            _ArrCurrency.CopyTo(_ArrCurrency_ListCopy, 0);
            _ArrTax.CopyTo(_ArrTax_ListCopy, 0);


            string Receivables_IDs = "";
            if (pReturnedMessage == "")
            {
                for (int i = 0; i < _NumberOfRows; i++)
                {
                    CVarReceivables objCVarReceivables = new CVarReceivables();
                 


                    objCVarReceivables.OperationID = InsertListFromExcel_Receivables.pOperationID;
                    objCVarReceivables.ChargeTypeID = objCChargeTypes.lstCVarChargeTypes.Where(x => x.Code.ToUpper() == _ArrCode[i].ToString().ToUpper() ).ToList()[0].ID ;
                    objCVarReceivables.POrC = 0;
                    //objCVarReceivables.SupplierOperationPartnerID = Int64.Parse(pSupplierList.Split(',')[i]);
                    objCVarReceivables.MeasurementID = 0;
                    objCVarReceivables.Quantity = (_ArrQty[i] == "0" ? 1 : decimal.Parse(_ArrQty[i]));

                    objCVarReceivables.SalePrice = decimal.Parse(_ArrUnitPrice[i]);

                    objCVarReceivables.AmountWithoutVAT = Math.Round((objCVarReceivables.Quantity * objCVarReceivables.SalePrice), 2);

                    if (objCDefaults.lstCVarDefaults[0].IsTaxOnItems)
                    {
                       var Tax = objCTaxTypes.lstCVarTaxeTypes.Where(x => x.CurrentPercentage == Convert.ToDecimal( _ArrTax[i])).ToList()[0];
                        if (Tax != null)
                        {
                            objCVarReceivables.TaxeTypeID = Tax.ID;
                            objCVarReceivables.TaxPercentage = Tax.CurrentPercentage;
                            objCVarReceivables.TaxAmount = Math.Round((objCVarReceivables.AmountWithoutVAT * objCVarReceivables.TaxPercentage / 100), 2);
                        }
                        else
                        {
                            objCVarReceivables.TaxPercentage = 0;
                            objCVarReceivables.TaxAmount = 0;
                            objCVarReceivables.DiscountPercentage = 0;
                        }
                    }

                    objCVarReceivables.SaleAmount = objCVarReceivables.AmountWithoutVAT + objCVarReceivables.TaxAmount; // decimal.Parse(pSaleAmountList.Split(',')[i]) + objCVarReceivables.TaxAmount;
                    //objCVarReceivables.InitialSalePrice = decimal.Parse(pInitialSalePriceList.Split(',')[i]);
                    //objCVarReceivables.SupplierInvoiceNo = pSupplierInvoiceNumberList.Split(',')[i];
                    objCVarReceivables.CurrencyID = objCCurrencies.lstCVarCurrencies.Where(x => x.Code == _ArrCurrency[i].ToString()).ToList()[0].ID;

                    CvwCurrencyDetails objCvwCurrencyDetails = new CvwCurrencyDetails();
                    objCvwCurrencyDetails.GetList("WHERE ID=" + objCVarReceivables.CurrencyID
                        + " AND '" + DateTime.Now.ToString("yyyy-MM-dd") + "' >= DateAdd(hh, 0, DateDiff(dd, 0, FromDate)) "
                        + " AND '" + DateTime.Now.ToString("yyyy-MM-dd") + "' <= DateAdd(minute,59,DateAdd(hh, 23, DateDiff(dd, 0, ToDate))) "
                        );
                    if (objCvwCurrencyDetails.lstCVarvwCurrencyDetails.Count > 0)
                    {
                        objCVarReceivables.ExchangeRate = objCvwCurrencyDetails.lstCVarvwCurrencyDetails[0].ExchangeRate;
                    } else
                    {
                        pReturnedMessage += "Row " + (i + 1) + " - Exchange rate not found \n";
                        continue;
                    }

                    objCVarReceivables.ExchangeRate_Foreign = 1;
                    objCVarReceivables.CurrencyID_Foreign = objCDefaults.lstCVarDefaults[0].CurrencyID;

                    objCVarReceivables.PayableID = 0 ;

                    //objCPayables.GetListPaging(1, 1, "WHERE ID=" + pSelectedPayableIDs.Split(',')[i], "ID", out _RowCount);
                    objCVarReceivables.Notes =
                        objCDefaults.lstCVarDefaults[0].UnEditableCompanyName == "MKH"
                        ? (objCVarReceivables.Quantity + "X "+ _ArrNotes[i] + " X" + objCVarReceivables.SalePrice) : _ArrNotes[i];

                    objCVarReceivables.IssueDate = DateTime.Now;
                    objCVarReceivables.OperationContainersAndPackagesID = 0;

                    objCVarReceivables.PreviousCutOffDate = DateTime.Parse("01/01/1900");
                    objCVarReceivables.CutOffDate = DateTime.Parse("01/01/1900");
                    objCVarReceivables.ReceiptDate = DateTime.Parse("01/01/1900");
                    objCVarReceivables.ReceiptNo = "";
                    objCVarReceivables.TariffID = 0;
                    objCVarReceivables.ManualChargeType = "0";
                    objCVarReceivables.CostCenterId = 0;
                    objCVarReceivables.IsOfficial = false;
                    objCVarReceivables.crmCode = "";

                    objCVarReceivables.CreatorUserID = objCVarReceivables.ModificatorUserID = WebSecurity.CurrentUserId;
                    objCVarReceivables.ModificationDate = objCVarReceivables.CreationDate = DateTime.Now;

                    CReceivables objCReceivables = new CReceivables();
                    objCReceivables.lstCVarReceivables.Add(objCVarReceivables);
                    checkException = objCReceivables.SaveMethod(objCReceivables.lstCVarReceivables);

                    Receivables_IDs += objCReceivables.lstCVarReceivables[0].ID + ",";
                    if (checkException != null)
                    {
                        pReturnedMessage += "Row " + (i + 1) + " - " + checkException.Message + " \n";
                    }
                }

                if(InsertListFromExcel_Receivables.pIsCreateInvoice)
                {
                    // , "pPrintedAddress": "0"
                    //     , pApplyTankCharges:true
                    //       , "pInvoiceStatusID": 1
                    //        , "pIsApproved": false

                    string pSelectedReceivableItemsIDs = Receivables_IDs.Remove(Receivables_IDs.Length - 1, 1);
                    OBJ =     Insert(pSelectedReceivableItemsIDs, 0, InsertListFromExcel_Receivables.pOperationID
                        , InsertListFromExcel_Receivables.pOperationPartnerID, InsertListFromExcel_Receivables.pAddressID
                        , "", InsertListFromExcel_Receivables.pInvoiceTypeID, InsertListFromExcel_Receivables.pInvoiceTypeCode
                        , InsertListFromExcel_Receivables.pCustomerReference, InsertListFromExcel_Receivables.pPaymentTermID
                        , InsertListFromExcel_Receivables.pCurrencyID, InsertListFromExcel_Receivables.pExchangeRate
                        , InsertListFromExcel_Receivables.pInvoiceIssueDate, InsertListFromExcel_Receivables.pInvoiceDueDate
                        , InsertListFromExcel_Receivables.pAmountWithoutVAT, InsertListFromExcel_Receivables.pTaxTypeID
                        , InsertListFromExcel_Receivables.pTaxPercentage, InsertListFromExcel_Receivables.pTaxAmount
                        , InsertListFromExcel_Receivables.pDiscountTypeID, InsertListFromExcel_Receivables.pDiscountPercentage
                        , InsertListFromExcel_Receivables.pDiscountAmount, InsertListFromExcel_Receivables.pFixedDiscount
                        , InsertListFromExcel_Receivables.pAmount, 1,false, InsertListFromExcel_Receivables.pTankID
                        , true, InsertListFromExcel_Receivables.pTransactionTypeID);

                    if (!Convert.ToBoolean(OBJ[0] ))
                    {
                        pReturnedMessage = "Error Create Invoice";
                    }
                }
   

            }
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                pReturnedMessage
                ,OBJ[1]
                ,OBJ[2]
            };
        }

        public object[] Insert(string pSelectedReceivableItemsIDs, Int64 pInvoiceNumber, Int64 pOperationID, Int64 pOperationPartnerID, Int64 pAddressID, string pPrintedAddress, int pInvoiceTypeID, string pInvoiceTypeCode, string pCustomerReference, int pPaymentTermID, int pCurrencyID, decimal pExchangeRate, string pInvoiceIssueDate, string pInvoiceDueDate, decimal pAmountWithoutVAT, Int32 pTaxTypeID, decimal pTaxPercentage, decimal pTaxAmount, Int32 pDiscountTypeID, decimal pDiscountPercentage, decimal pDiscountAmount, decimal pFixedDiscount, decimal pAmount/*, decimal pPaidAmount, decimal pRemainingAmount*/, int pInvoiceStatusID, bool pIsApproved, Int64 pTankID, bool pApplyTankCharges, Int32 pTransactionTypeID)
        {
            string strDRAFTInvoiceTypeCode = "DRAFT";
            bool _result = false;
            Exception checkException = null;
            CVarInvoices objCVarInvoices = new CVarInvoices();
            string pUpdateClause = "";
            int _RowCount = 0;
            int _DistinctTankCurrencyCount = 0;
            CDefaults objCDefaults = new CDefaults();
            objCDefaults.GetListPaging(999999, 1, "WHERE 1=1", "ID", out _RowCount);
            #region Save InvoiceHeader
            objCVarInvoices.InvoiceNumber = pInvoiceNumber;
            objCVarInvoices.OperationID = pOperationID;
            objCVarInvoices.OperationPartnerID = pOperationPartnerID;
            objCVarInvoices.AddressID = pAddressID;
            objCVarInvoices.InvoiceTypeID = pInvoiceTypeID;
            objCVarInvoices.PrintedAddress = pPrintedAddress;
            objCVarInvoices.CustomerReference = pCustomerReference;
            objCVarInvoices.PaymentTermID = pPaymentTermID;
            objCVarInvoices.CurrencyID = pCurrencyID;
            objCVarInvoices.ExchangeRate = pExchangeRate;
            objCVarInvoices.InvoiceDate = DateTime.ParseExact(pInvoiceIssueDate + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture); //pInvoiceIssueDate;
            objCVarInvoices.DueDate = DateTime.ParseExact(pInvoiceDueDate + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture); //pInvoiceDueDate;
            objCVarInvoices.AmountWithoutVAT = pAmountWithoutVAT;
            objCVarInvoices.TaxTypeID = pTaxTypeID;
            objCVarInvoices.TaxPercentage = pTaxPercentage;
            objCVarInvoices.TaxAmount = pTaxAmount;
            objCVarInvoices.DiscountTypeID = pDiscountTypeID;
            objCVarInvoices.DiscountPercentage = pDiscountPercentage;
            objCVarInvoices.DiscountAmount = pDiscountAmount;
            objCVarInvoices.FixedDiscount = pFixedDiscount;
            objCVarInvoices.Amount = pAmount;
            //objCVarInvoices.PaidAmount = pPaidAmount;
            //objCVarInvoices.RemainingAmount = pRemainingAmount;
            objCVarInvoices.InvoiceStatusID = pInvoiceStatusID;
            objCVarInvoices.IsApproved = pIsApproved;
            objCVarInvoices.LeftSignature = "0";
            objCVarInvoices.MiddleSignature = "0";
            objCVarInvoices.RightSignature = "0";
            objCVarInvoices.GRT = "0";
            objCVarInvoices.DWT = "0";
            objCVarInvoices.NRT = "0";
            objCVarInvoices.LOA = "0";
            objCVarInvoices.EditableNotes = "0";
            objCVarInvoices.OperationContainersAndPackagesID = pTankID;
            objCVarInvoices.TransactionTypeID = pTransactionTypeID;
            objCVarInvoices.Notes = "0";
            objCVarInvoices.CutOffDate = DateTime.Parse("01/01/1900");
            objCVarInvoices.CreatorUserID = objCVarInvoices.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarInvoices.CreationDate = objCVarInvoices.ModificationDate = DateTime.Now;
            objCVarInvoices.TariffID = 0;
            objCVarInvoices.OnBehalfName = "";
            objCVarInvoices.PortalOperationPartnerID = pOperationPartnerID;
            objCVarInvoices.StorageFromDate = DateTime.Parse("01/01/1900");
            objCVarInvoices.StorageToDate = DateTime.Parse("01/01/1900");
            objCVarInvoices.USDPerContainer = 0;
            objCVarInvoices.PartnerVATNumber = "0";

            CInvoices objCInvoices = new CInvoices();
            objCInvoices.lstCVarInvoices.Add(objCVarInvoices);
            checkException = objCInvoices.SaveMethod(objCInvoices.lstCVarInvoices);
            #endregion Save InvoiceHeader
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else //inserted successfully so update InvoiceID in receivable items
            {
                _result = true;
                #region Save Invoice Tank Items
                if (pTankID > 0 && pApplyTankCharges)
                {
                    CReceivables objCReceivables = new CReceivables();
                    objCReceivables.GetListPaging(999999, 1, " WHERE IsDeleted=0 AND InvoiceID IS NULL AND OperationID=" + pOperationID + " AND OperationContainersAndPackagesID=" + pTankID, "ID", out _RowCount);
                    _DistinctTankCurrencyCount = objCReceivables.lstCVarReceivables.GroupBy(g => g.CurrencyID).Count();
                    pUpdateClause = (pInvoiceTypeCode == strDRAFTInvoiceTypeCode ? "DraftInvoiceID=" : "InvoiceID=") + objCInvoices.lstCVarInvoices[0].ID + "\n";
                    //pUpdateClause += " , OperationID = " + pOperationID;
                    //pUpdateClause += " , ModificatorUserID = " + WebSecurity.CurrentUserId.ToString();
                    //pUpdateClause += " , ModificationDate = GETDATE() ";
                    pUpdateClause += " WHERE IsDeleted=0 AND " + (pInvoiceTypeCode == strDRAFTInvoiceTypeCode ? "DraftInvoiceID" : "InvoiceID") + " IS NULL AND CurrencyID=" + pCurrencyID + " AND OperationID=" + pOperationID + " AND OperationContainersAndPackagesID=" + pTankID;
                    pUpdateClause += " And ID in ( " + pSelectedReceivableItemsIDs + ")";
                    checkException = objCReceivables.UpdateList(pUpdateClause);
                }
                #endregion Save Invoice Tank Items
                #region Default Receivables
                else if (pSelectedReceivableItemsIDs == null) //insert default receivables
                {
                    CChargeTypes objCChargeTypes = new CChargeTypes();
                    objCChargeTypes.GetList("WHERE InvoiceTypeID=" + pInvoiceTypeID.ToString());
                    if (objCChargeTypes.lstCVarChargeTypes.Count > 0)
                    {
                        for (int i = 0; i < objCChargeTypes.lstCVarChargeTypes.Count; i++)
                        {
                            CReceivables objCReceivables = new CReceivables();
                            CVarReceivables objCVarReceivables = new CVarReceivables();

                            objCVarReceivables.OperationID = pOperationID;
                            objCVarReceivables.ChargeTypeID = objCChargeTypes.lstCVarChargeTypes[i].ID;
                            objCVarReceivables.MeasurementID = objCChargeTypes.lstCVarChargeTypes[i].MeasurementID;
                            objCVarReceivables.Quantity = 1;
                            objCVarReceivables.ExchangeRate = pExchangeRate;
                            objCVarReceivables.CurrencyID = pCurrencyID;
                            objCVarReceivables.GeneratingQRID = 0;
                            objCVarReceivables.Notes = "Generated with invoice.";
                            if (pInvoiceTypeCode == strDRAFTInvoiceTypeCode)
                                objCVarReceivables.DraftInvoiceID = objCVarInvoices.ID;
                            else
                                objCVarReceivables.InvoiceID = objCVarInvoices.ID;

                            objCVarReceivables.PreviousCutOffDate = DateTime.Parse("01/01/1900");
                            objCVarReceivables.CutOffDate = DateTime.Parse("01/01/1900");
                            objCVarReceivables.ReceiptDate = DateTime.Parse("01/01/1900");
                            objCVarReceivables.ReceiptNo = "";
                            objCVarReceivables.TariffID = 0;
                            objCVarReceivables.ManualChargeType = "0";
                            objCVarReceivables.CostCenterId = 0;
                            objCVarReceivables.IsOfficial = false;
                            objCVarReceivables.crmCode = "";

                            objCVarReceivables.CreatorUserID = objCVarReceivables.ModificatorUserID = WebSecurity.CurrentUserId;
                            objCVarReceivables.ModificationDate = objCVarReceivables.CreationDate = DateTime.Now;

                            objCReceivables.lstCVarReceivables.Add(objCVarReceivables);
                            checkException = objCReceivables.SaveMethod(objCReceivables.lstCVarReceivables);
                        }
                    }
                } //if (pSelectedReceivableItemsIDs == null) //insert default receivables
                #endregion Default Receivables
                #region Selected Receivables
                else
                {
                    string[] strArraySelectedReceivableItemsIDs = pSelectedReceivableItemsIDs.Split(',');
                    string pWhereClause = "";

                    pWhereClause = " WHERE ID = " + strArraySelectedReceivableItemsIDs[0]; //i am sure i have at least 1 row(building the first part of the where clause, then use OR incase of more than 1 house)
                    for (int i = 1; i < strArraySelectedReceivableItemsIDs.Length; i++)
                        pWhereClause += " OR ID = " + strArraySelectedReceivableItemsIDs[i] + "\n";
                    pUpdateClause = (pInvoiceTypeCode == strDRAFTInvoiceTypeCode ? "DraftInvoiceID=" : "InvoiceID=") + objCInvoices.lstCVarInvoices[0].ID + "";
                    #region ensure receivables are correct
                    pUpdateClause += " , AmountWithoutVAT = ROUND((ISNULL(SalePrice, 0) * ISNULL(Quantity, 1)),2)" + " \n";
                    pUpdateClause += " , TaxPercentage = (select TT.CurrentPercentage FROM TaxeTypes TT WHERE TT.ID = TaxeTypeID)" + " \n";
                    pUpdateClause += " , TaxAmount = ROUND((ISNULL(SalePrice, 0) * ISNULL(Quantity, 1)) * (select TT.CurrentPercentage/100 FROM TaxeTypes TT WHERE TT.ID = TaxeTypeID), 2)" + " \n";
                    pUpdateClause += " , DiscountPercentage = (select TT.CurrentPercentage FROM TaxeTypes TT WHERE TT.ID = DiscountTypeID)" + " \n";
                    pUpdateClause += " , DiscountAmount = ROUND((ISNULL(SalePrice, 0) * ISNULL(Quantity, 1)) * (select TT.CurrentPercentage/100 FROM TaxeTypes TT WHERE TT.ID = DiscountTypeID),2)" + " \n";
                    pUpdateClause += " , SaleAmount = ROUND((ISNULL(SalePrice, 0) * ISNULL(Quantity, 1)),2)" + " \n"
                                  + " + (ROUND((ISNULL(SalePrice, 0) * ISNULL(Quantity, 1)) * ISNULL((select ISNULL(TT.CurrentPercentage / 100, 0) FROM TaxeTypes TT WHERE TT.ID = TaxeTypeID),0) , 2))" + " \n"
                                  + " - (ROUND((ISNULL(SalePrice, 0) * ISNULL(Quantity, 1)) * ISNULL((select ISNULL(TT.CurrentPercentage / 100, 0) FROM TaxeTypes TT WHERE TT.ID = DiscountTypeID),0), 2))" + " \n";
                    #endregion ensure receivables are correct
                    //pUpdateClause += " , OperationID = " + pOperationID;
                    //pUpdateClause += " , ModificatorUserID = " + WebSecurity.CurrentUserId.ToString();
                    //pUpdateClause += " , ModificationDate = GETDATE() ";
                    pUpdateClause += pWhereClause;
                    CReceivables objCReceivables = new CReceivables();
                    checkException = objCReceivables.UpdateList(pUpdateClause);
                }
                #endregion Selected Receivables
                #region Update Invoice totals at server side to fix any connection problem

                //Remove vat from receivables if the invoice type has RemoveVat = true
                CInvoiceTypes objCInvoiceTypes = new CInvoiceTypes();
                objCInvoiceTypes.GetItem(objCVarInvoices.InvoiceTypeID);
                CReceivables objCReceivablesForRemoveVAT = new CReceivables();
                if (objCInvoiceTypes.lstCVarInvoiceTypes.Count > 0 ? objCInvoiceTypes.lstCVarInvoiceTypes[0].RemoveVat : false)
                {
                    objCReceivablesForRemoveVAT.UpdateList("TaxeTypeID = null,TaxAmount = 0, TaxPercentage = 0,SaleAmount = AmountWithoutVAT WHERE InvoiceID = " + objCVarInvoices.ID);
                }
                //SET AmountWithoutVAT
                pUpdateClause = " AmountWithoutVAT = ROUND((SELECT SUM(ISNULL(SalePrice,0) * ISNULL(Quantity,1))-" + pFixedDiscount + " FROM Receivables WHERE " + (pInvoiceTypeCode == strDRAFTInvoiceTypeCode ? "DraftInvoiceID" : "InvoiceID") + " = " + objCVarInvoices.ID.ToString() + " AND IsDeleted=0),2)";
                pUpdateClause += " WHERE ID = " + objCVarInvoices.ID.ToString();
                checkException = objCInvoices.UpdateList(pUpdateClause);
                //SET Tax, Discount & Total Amount after setting the AmountWithVAT
                pUpdateClause = " TaxAmount = ROUND((ISNULL(AmountWithoutVAT, 0) * ISNULL(TaxPercentage, 0) / 100),2)";
                pUpdateClause += " , DiscountAmount = ROUND((ISNULL(AmountWithoutVAT, 0) * ISNULL(DiscountPercentage, 0) / 100),2)";
                if (objCDefaults.lstCVarDefaults[0].IsTaxOnItems)
                    pUpdateClause += " , Amount = - ROUND((ISNULL(AmountWithoutVAT, 0) * ISNULL(DiscountPercentage, 0) / 100),2) + ROUND((SELECT SUM(ISNULL(SaleAmount,0))-" + pFixedDiscount + " FROM Receivables WHERE " + (pInvoiceTypeCode == strDRAFTInvoiceTypeCode ? "DraftInvoiceID" : "InvoiceID") + " = " + objCVarInvoices.ID.ToString() + " AND IsDeleted=0),2)";
                else
                    pUpdateClause += " , Amount = ROUND((ISNULL(AmountWithoutVAT, 0) + ROUND( (ISNULL(AmountWithoutVAT, 0) * ISNULL(TaxPercentage, 0) / 100),2) - ROUND((ISNULL(AmountWithoutVAT, 0) * ISNULL(DiscountPercentage, 0) / 100),2)),2)";
                pUpdateClause += " WHERE ID = " + objCVarInvoices.ID.ToString();
                checkException = objCInvoices.UpdateList(pUpdateClause);
                #endregion Update Invoice totals at server side to fix any connection problem
                #region Add to PartnerBalance table

                #endregion Add to PartnerBalance table

            }
            return new object[] {
                _result
                , objCInvoices.lstCVarInvoices[0].ID
                , _DistinctTankCurrencyCount //pData[2] 
            };
        }

        [HttpGet]
        public bool GetReceivablesCreatedFromPayable(int pPayableID)
        {
            CReceivables objCReceivables = new CReceivables();
            objCReceivables.GetList("WHERE PayableID = " + pPayableID);
            if (objCReceivables.lstCVarReceivables.Count > 0) return true;
            return false;
        }

		[HttpGet,HttpPost]
		public object GetReceivablesOnly(string pWhereClause)
		{
			CvwReceivables objCvwReceivables = new CvwReceivables();
			objCvwReceivables.GetList(pWhereClause);
			return new JavaScriptSerializer().Serialize(objCvwReceivables.lstCVarvwReceivables);
		}

        [HttpGet, HttpPost]
        public string CheckIfReceivableLinkToAccount([FromBody] DeleteListParameters ReceivableListParameters)
        {

            string pReturnedMessage = "";
            Exception checkException = null;
            int _RowCount = 0;
            CDefaults objCDefaults = new CDefaults();
            objCDefaults.GetListPaging(999999, 1, "WHERE 1=1", "ID", out _RowCount);
            string[] MescoCompanies = new string[5] { "MES", "SAC", "GLO", "EUR", "ALT" };
            bool IsMescoCompany = MescoCompanies.Contains(objCDefaults.lstCVarDefaults[0].UnEditableCompanyName);
            if(!IsMescoCompany)
                return pReturnedMessage;

            CReceivables objCReceivables = new CReceivables();
            checkException= objCReceivables.GetListPaging(999999, 1, " WHERE IsDeleted=0 AND CategoryID IS NULL AND OperationID=" + ReceivableListParameters.pOperationID , "ID", out _RowCount);
            if (checkException != null || objCReceivables.lstCVarReceivables.Count > 0)
            {
                pReturnedMessage = "Please, choose category in receivables";
                return pReturnedMessage;
            }
                

           CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
            DataTable dtdata= objCCustomizedDBCall.ExecuteQuery_DataTable(@"select Ct.Name from Operations O join Receivables R on R.OperationID = O.ID  join ChargeTypes CT on CT.ID = R.ChargeTypeID
            where Not Exists(select 1 from ChargeTypeAccounts cha where cha.ChargeTypeID = R.ChargeTypeID
            and cha.DirectionID = O.DirectionType
                and cha.ServiceID = case WHEN O.TransportType = 2 THEN 3 --AIR
            WHEN O.TransportType = 1 AND O.ShipmentType = 1 THEN 1 --FCL
            WHEN O.TransportType = 1 AND O.ShipmentType IN(2, 5) THEN 2
            WHEN O.TransportType = 3 THEN 5
            WHEN O.DirectionType = 3 THEN 4 end
            and cha.CategoryID = R.CategoryID and cha.RevenueAccountID IS NOT NULL and RevenueCostCenterID IS NOT NULL) And R.ID in (" + ReceivableListParameters.pReceivablesIDs + ")");

            if(dtdata.Rows.Count > 0 )
            {
                pReturnedMessage += " Link account for charges ";
                for (int i = 0; i < dtdata.Rows.Count; i++)
                {
                    pReturnedMessage += dtdata.Rows[i]["Name"].ToString() + " - ";
                }    
            }
            return pReturnedMessage;
        }

        [HttpGet, HttpPost]
        public bool DeleteFromModal(String pReceivablesIDs, Int64 pOperationID)
        {
            bool _result = true;
            Exception checkException = null;
            CReceivablesTax objCReceivablesTax = new CReceivablesTax();
            CPayablesTAX objCPayablesTax = new CPayablesTAX();
            COperationLog objCOperationLog = new COperationLog();


            int _RowCount2 = 0;
            CvwDefaults objCvwDefaults = new CvwDefaults();
            objCvwDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount2); //i am sure i ve just one row isa
            string CompanyName = objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName;
            if (CompanyName == "CHM" || CompanyName == "OCE")
            {
                CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
                string ReceivablesID = "";


                foreach (var currentID in pReceivablesIDs.Split(','))
                {
                    if (CompanyName == "CHM")
                    {
                        ReceivablesID = objCCustomizedDBCall.CallStringFunctionByMultiReturn("select top 1 TaxID from ForwardingTransChemTax.dbo.TaxLink WHERE Notes='Receivables' and OriginID = " + currentID);
                    }
                    else if (CompanyName == "OCE")
                    {
                        ReceivablesID = objCCustomizedDBCall.CallStringFunctionByMultiReturn("select top 1 TaxID from ForwardingTROTax.dbo.TaxLink WHERE Notes='Receivables' and OriginID = " + currentID);
                    }

                    checkException = objCReceivablesTax.DeleteList("WHERE ID=" + ReceivablesID);
                    if (checkException == null)
                    {

                        objCPayablesTax.UpdateList("ReceivableID=NULL WHERE ReceivableID=" + ReceivablesID);
                        if (CompanyName == "CHM")
                        {
                            objCCustomizedDBCall.CallStringFunctionByMultiReturn("delete from ForwardingTransChemTax.dbo.TaxLink WHERE Notes='Receivables' and TaxID = " + ReceivablesID);
                        }
                        else if (CompanyName == "OCE")
                        {
                            objCCustomizedDBCall.CallStringFunctionByMultiReturn("delete from ForwardingTROTax.dbo.TaxLink WHERE Notes='Receivables' and TaxID = " + ReceivablesID);
                        }

                    }
                    else
                        _result = false;
                }
            }

            CReceivables objCReceivables = new CReceivables();
            CPayables objCPayables = new CPayables();

            checkException = objCReceivables.DeleteList("WHERE ID IN(" + pReceivablesIDs + ")");
            if (checkException == null)
            {
                checkException = objCOperationLog.UpdateList("UserID=" + WebSecurity.CurrentUserId.ToString() + ", UserName=N'" + WebSecurity.CurrentUserName + "'"
                                            + " WHERE ActionOnRowID IN (" + pReceivablesIDs + ")" + " AND ActionType='D' AND UserID IS NULL AND LogFor = " + 20);
                //    + " AND ActionOnRowID IN(" + DeleteListParameters.pReceivablesIDs.ToString() + ")"

                checkException = objCPayables.UpdateList("ReceivableID=NULL WHERE ReceivableID IN(" + pReceivablesIDs + ")");
            }
            else
                _result = false;


            //foreach (var currentID in DeleteListParameters.pReceivablesIDs.Split(','))
            //{


            //    checkException = objCReceivables.DeleteList("WHERE ID=" + currentID);
            //    if (checkException == null)
            //    {
            //        checkException = objCOperationLog.UpdateList("UserID=" + WebSecurity.CurrentUserId.ToString() + ", UserName=N'" + WebSecurity.CurrentUserName + "'"
            //                                    + " WHERE ActionOnRowID IN (" + DeleteListParameters.pReceivablesIDs + ") AND ActionOnRowID IN(" + DeleteListParameters.pReceivablesIDs.ToString() + ")"
            //                                    + " AND ActionType='D' AND UserID IS NULL AND LogFor = " + 20);
            //        checkException = objCPayables.UpdateList("ReceivableID=NULL WHERE ReceivableID=" + currentID);
            //    }
            //    else
            //        _result = false;
            //}
            return _result;
        }
        
        
        [HttpGet, HttpPost]
        public object[] GetExchangerate(Int32 pCurrencyID, DateTime pdate)
        {
            string formattedDate = pdate.ToString("yyyy-MM-dd HH:mm:ss");

            CCurrencyDetails objCCurrencyDetails = new CCurrencyDetails();
            objCCurrencyDetails.GetList($"where Currency_ID={pCurrencyID} And '{formattedDate}' >= FromDate And '{formattedDate}' <= ToDate");
            return new object[] { objCCurrencyDetails.lstCVarCurrencyDetails, objCCurrencyDetails.lstCVarCurrencyDetails.Count };

        }

    }

    public class UpdateListParameters
    {
        public string pSelectedReceivablesIDsToUpdate { get; set; }
        public string pPOrCList { get; set; }
        public string pUOMList { get; set; }
        public string pQuantityList { get; set; }
        public string pSalePriceList { get; set; }
        public string pAmountWithoutVATList { get; set; }
        public string pTaxTypeIDList { get; set; }
        public string pTaxPercentageList { get; set; }
        public string pTaxAmountList { get; set; }
        public string pDiscountTypeIDList { get; set; }
        public string pDiscountPercentageList { get; set; }
        public string pDiscountAmountList { get; set; }
        public string pSaleAmountList { get; set; }
        public string pExchangeRateList { get; set; }
        public string pCurrencyList { get; set; }
        public string pReceiptNoList { get; set; }
        public string pReceiptDateList { get; set; }
        public string pNotesList { get; set; }
        public string pViewOrderList { get; set; }
        public Int64 pInvoiceID { get; set; }
        public string pOperationContainersAndPackagesIDList { get; set; }
        public int pQuotationRouteID { get; set; }
        public string pHouseBillList { get; set; }

        public string pCategoryList { get; set; } = "";
    }
    public class InsertListFromExcel_Receivables
    {
        public int pOperationID { get; set; }
        public string pCodeList { get; set; }
        public string pQtyList { get; set; }
        public string pUnitPriceList { get; set; }
        public string pNotesList { get; set; }
        public string pRateList { get; set; }

        public string pCurrencyList { get; set; }
        public string pTaxList { get; set; }

        //If Create Invoice
        public bool pIsCreateInvoice { get; set; }
        public int pOperationPartnerID { get; set; }
        public int pAddressID { get; set; }
        public int pInvoiceTypeID { get; set; }
        public string pInvoiceTypeCode { get; set; }
        public string pCustomerReference { get; set; }
        public int pPaymentTermID { get; set; }
        public int pCurrencyID { get; set; }
        public decimal pExchangeRate { get; set; }
        public string pInvoiceIssueDate { get; set; }
        public string pInvoiceDueDate { get; set; }
        public decimal pAmountWithoutVAT { get; set; }
        public int pTaxTypeID { get; set; }
        public decimal pTaxPercentage { get; set; }
        public decimal pTaxAmount { get; set; }
        public int pDiscountTypeID { get; set; }
        public decimal pDiscountPercentage { get; set; }
        public decimal pDiscountAmount { get; set; }
        public decimal pFixedDiscount { get; set; }
        public decimal pAmount { get; set; }
        public int pTankID { get; set; }
        public int pTransactionTypeID { get; set; }
          //in table OperationPartners



                    

    }

    public class DeleteListParameters
    {
        public string pReceivablesIDs { get; set; }
        public Int64 pOperationID { get; set; }
    }
}

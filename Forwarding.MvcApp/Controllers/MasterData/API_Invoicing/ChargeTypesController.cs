using Forwarding.MvcApp.Controllers.DynamicsCRM;
using Forwarding.MvcApp.Entities.Quotations;
using Forwarding.MvcApp.Models.Accounting.MasterData.Customized;
using Forwarding.MvcApp.Models.Accounting.MasterData.Generated;
using Forwarding.MvcApp.Models.Administration.Security.Generated;
using Forwarding.MvcApp.Models.Administration.Settings.Generated;
using Forwarding.MvcApp.Models.Fleet_Forwarding_Integration.MasterData.Customized;
using Forwarding.MvcApp.Models.MasterData.Invoicing.Generated;
using Forwarding.MvcApp.Models.MasterData.Partners.Generated;
using Forwarding.MvcApp.Models.NoAccess.Generated;

using Forwarding.MvcApp.Models.Operations.Operations.Generated;
using Forwarding.MvcApp.Models.Quotations.Quotations.Generated;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;
using Newtonsoft.Json;
using System.Text.RegularExpressions;

namespace Forwarding.MvcApp.Controllers.MasterData.API_Locations
{
    public class ChargeTypesController : ApiController
    {
        [HttpGet, HttpPost]
        public Object[] LoadAll(string pWhereClause)
        {
            Int32 _RowCount = 0;
            CDefaults objCDefaults = new CDefaults();
            CUsers objCUsers = new CUsers();
            objCDefaults.GetListPaging(999999, 1, "WHERE 1=1", "ID", out _RowCount);
            objCUsers.GetListPaging(999999, 1, "WHERE ID=" + WebSecurity.CurrentUserId, "ID", out _RowCount);
            if (!objCUsers.lstCVarUsers[0].IsAccessAllCharges)
                pWhereClause += " AND ID IN (SELECT ChargeTypeID FROM DepartmentCharge WHERE DepartmentID=" + objCUsers.lstCVarUsers[0].DepartmentID + ") \n";

            CvwChargeTypes objCvwChargeTypes = new CvwChargeTypes();
            objCvwChargeTypes.GetListPaging(999999, 1, pWhereClause, "Name", out _RowCount);
            string pattern = @"IsUsedInReceivable\s*=\s*(\d+)";
            Match match = Regex.Match(pWhereClause, pattern, RegexOptions.IgnoreCase);
            string isReceivable = "0";
            if (match.Success)
            {
                isReceivable = match.Groups[1].Value;
              
            }
            var filteredChargeTypes = objCvwChargeTypes.lstCVarvwChargeTypes;
         
   
            if (objCDefaults.lstCVarDefaults[0].UnEditableCompanyName == "ESG")
            {
                int departmentId = objCUsers.lstCVarUsers[0].DepartmentID;
                var chargeTypeMapping = new Dictionary<int, string>();
                if (isReceivable == "1")
                {
                    chargeTypeMapping = new Dictionary<int, string>
                    {
                        { 1, "cbIsACCOUNTINGR" },
                        { 3, "cbIsINFORMATIONTECHNOLOGYR" },
                        { 4, "cbIsMARKETINGR" },
                        { 5, "cbIsOPERATIONSR" },
                        { 6, "cbIsSALESR" },
                        { 7, "cbIsTRUCKINGR" },
                        { 8, "cbIsCUSTOMCLEARNACER" },
                        { 9, "cbIsIMPORTDepR" },
                        { 10, "cbIsEXPORTDepR" },
                        { 11, "cbIsISOTANKR" }
                    };
                }
                else 
                {
                    chargeTypeMapping = new Dictionary<int, string>
                    {
                        { 1, "cbIsACCOUNTING" },
                        { 3, "cbIsINFORMATIONTECHNOLOGY" },
                        { 4, "cbIsMARKETING" },
                        { 5, "cbIsOPERATIONS" },
                        { 6, "cbIsSALES" },
                        { 7, "cbIsTRUCKING" },
                        { 8, "cbIsCUSTOMCLEARNACE" },
                        { 9, "cbIsIMPORTDep" },
                        { 10, "cbIsEXPORTDep" },
                        { 11, "cbIsISOTANK" }
                    };
                }
              


                if (chargeTypeMapping.ContainsKey(departmentId))
                {
                    string chargeTypeProperty = chargeTypeMapping[departmentId];
                     filteredChargeTypes = filteredChargeTypes
                        .Where(charge =>
                        {
                            if (string.IsNullOrEmpty(charge.Notes))
                            {
                                return false; // Skip this charge if Notes is invalid
                            }
                            // Attempt to deserialize the Notes
                            try
                            {
                                var notesObject = JsonConvert.DeserializeObject<Dictionary<string, string>>(charge.Notes);
                                return notesObject.TryGetValue(chargeTypeProperty, out string value) && value == "true";
                            }
                            catch (JsonException)
                            {
                                return false; // Skip this charge if deserialization fails
                            }
                        })
                        .ToList();
                }
            }
        
            CNoAccessMeasurements objCNoAccessMeasurements = new CNoAccessMeasurements();
            objCNoAccessMeasurements.GetList("WHERE 1=1");
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[] {
                serializer.Serialize(filteredChargeTypes)
                , serializer.Serialize(objCNoAccessMeasurements.lstCVarNoAccessMeasurements) //pData[1]
            };
        }

        [HttpGet, HttpPost]
        public Object[] LoadAllWithMinimalColumns(string pWhereClauseWithMinimalColumns)
        {
            Int32 _RowCount = 0;
            CDefaults objCDefaults = new CDefaults();
            CUsers objCUsers = new CUsers();
            objCDefaults.GetListPaging(999999, 1, "WHERE 1=1", "ID", out _RowCount);
            objCUsers.GetListPaging(999999, 1, "WHERE ID=" + WebSecurity.CurrentUserId, "ID", out _RowCount);
            if (!objCUsers.lstCVarUsers[0].IsAccessAllCharges)
                pWhereClauseWithMinimalColumns += " AND ID IN (SELECT ChargeTypeID FROM DepartmentCharge WHERE DepartmentID=" + objCUsers.lstCVarUsers[0].DepartmentID + ") \n";

            CvwChargeTypesWithMinimalColumns objCvwChargeTypes = new CvwChargeTypesWithMinimalColumns();
            objCvwChargeTypes.GetListPaging(999999, 1, pWhereClauseWithMinimalColumns, "Name", out _RowCount);
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[] { serializer.Serialize(objCvwChargeTypes.lstCVarvwChargeTypesWithMinimalColumns) };
        }

        // [Route("/api/ChargeTypes/LoadWithPaging/{pPageNumber}/{pPageSize}")]
        [HttpGet, HttpPost]
        public Object[] LoadWithPaging(Int32 pPageNumber, Int32 pPageSize, string pSearchKey)
        {
            CvwChargeTypes objCvwChargeTypes = new CvwChargeTypes();
            //objCvwChargeTypes.GetList(string.Empty);
            Int32 _RowCount = 0;// objCvwChargeTypes.lstCVarChargeTypes.Count;

            pSearchKey = (pSearchKey == null ? "" : pSearchKey.Trim());
            string whereClause = " Where (Code LIKE '%" + pSearchKey + "%' "
                + " OR Name LIKE N'%" + pSearchKey + "%' "
                + " OR PreCode LIKE N'%" + pSearchKey + "%' "
                + " OR LocalName LIKE N'%" + pSearchKey + "%' "
                + " OR MeasurementCode LIKE N'%" + pSearchKey + "%' " //sherif: i used name here coz code is vague for me
                + " OR TaxeTypeCode LIKE N'%" + pSearchKey + "%' "
                + " OR InvoiceTypeCode LIKE N'%" + pSearchKey + "%') ";

            objCvwChargeTypes.GetListPaging(pPageSize, pPageNumber, whereClause, " ChargeTypeName ", out _RowCount);

            return new Object[] { new JavaScriptSerializer().Serialize(objCvwChargeTypes.lstCVarvwChargeTypes), _RowCount };
        }


        [HttpGet, HttpPost]
        public object[] Insert([FromBody] UpdateDTO InsertDTO)
        {
            Exception checkException = null;
            bool _result = false;
            string _message = "";
            CVarChargeTypes objCVarChargeTypes = new CVarChargeTypes();

            bool crmResult = false;
            string crmMessage = "";

            int _RowCount2 = 0;
            CvwDefaults objCvwDefaults = new CvwDefaults();
            objCvwDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount2); //i am sure i ve just one row isa
            string CompanyName = objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName;

            objCVarChargeTypes.MeasurementID = InsertDTO.pMeasurementID;
            objCVarChargeTypes.TaxeTypeID = InsertDTO.pTaxeTypeID;
            objCVarChargeTypes.InvoiceTypeID = InsertDTO.pInvoiceTypeID;

            objCVarChargeTypes.Code = InsertDTO.pCode;
            objCVarChargeTypes.PreCode = InsertDTO.pPreCode;
            objCVarChargeTypes.Name = InsertDTO.pName;
            objCVarChargeTypes.LocalName = (InsertDTO.pLocalName == null ? "" : InsertDTO.pLocalName);
            objCVarChargeTypes.ViewOrder = InsertDTO.pViewOrder;
            objCVarChargeTypes.IsAddedManually = true;
            objCVarChargeTypes.IsUsedInPayable = InsertDTO.pIsUsedInPayable;
            objCVarChargeTypes.IsUsedInReceivable = InsertDTO.pIsUsedInReceivable;
            objCVarChargeTypes.IsTank = InsertDTO.pIsTank;
            objCVarChargeTypes.IsOcean = InsertDTO.pIsOcean;
            objCVarChargeTypes.IsInland = InsertDTO.pIsInland;
            objCVarChargeTypes.IsAir = InsertDTO.pIsAir;
            objCVarChargeTypes.IsDefaultInQuotation = InsertDTO.pIsDefaultInQuotation;
            objCVarChargeTypes.IsDefaultInOperations = InsertDTO.pIsDefaultInOperations;
            objCVarChargeTypes.IsGeneralChargeType = InsertDTO.pIsGeneralChargeType;
            objCVarChargeTypes.IsWarehouseChargeType = InsertDTO.pIsWarehouseChargeType;
            objCVarChargeTypes.IsOperationChargeType = InsertDTO.pIsOperationChargeType;
            objCVarChargeTypes.IsOfficial = InsertDTO.pIsOfficial;

            objCVarChargeTypes.AccountID_Return = InsertDTO.pAccountID_Return;
            objCVarChargeTypes.SubAccountID_Return = InsertDTO.pSubAccountID_Return;
            objCVarChargeTypes.AccountID_Revenue = InsertDTO.pAccountID_Revenue;
            objCVarChargeTypes.SubAccountID_Revenue = InsertDTO.pSubAccountID_Revenue;
            objCVarChargeTypes.CostCenterID_Revenue = InsertDTO.pCostCenterID_Revenue;
            objCVarChargeTypes.AccountID_Expense = InsertDTO.pAccountID_Expense;
            objCVarChargeTypes.SubAccountID_Expense = InsertDTO.pSubAccountID_Expense;
            objCVarChargeTypes.CostCenterID_Expense = InsertDTO.pCostCenterID_Expense;

            objCVarChargeTypes.IsInactive = InsertDTO.pIsInactive;
            objCVarChargeTypes.TimeLocked = DateTime.Parse("01-01-1900");
            objCVarChargeTypes.LockingUserID = 0;

            objCVarChargeTypes.Notes = (InsertDTO.pNotes == null ? "" : InsertDTO.pNotes);
            objCVarChargeTypes.TemplateID = InsertDTO.pTemplateID;
            objCVarChargeTypes.ChargeTypeGroupID = InsertDTO.pChargeTypeGroupID;
            objCVarChargeTypes.PurchaseItemID = InsertDTO.pPurchaseItemID;

            objCVarChargeTypes.Cost = InsertDTO.pCost;

            objCVarChargeTypes.IsDirectOperation = InsertDTO.pIsDirectOperation;
            objCVarChargeTypes.IsMasterOperation = InsertDTO.pIsMasterOperation;

            objCVarChargeTypes.ChargeTypeCurrency_ID = InsertDTO.pCurrencyID;

            objCVarChargeTypes.CreatorUserID = objCVarChargeTypes.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarChargeTypes.CreationDate = objCVarChargeTypes.ModificationDate = DateTime.Now;

            objCVarChargeTypes.crmCode = "";
            objCVarChargeTypes.FreightGroupID = InsertDTO.pFreightGroupID;

            objCVarChargeTypes.IsDisbersment = InsertDTO.pIsDisbersment;
            objCVarChargeTypes.CostTaxID = InsertDTO.pCostTaxID;
            objCVarChargeTypes.ItemCategoryID = InsertDTO.pItemCategoryID;

            CChargeTypes objCChargeTypes = new CChargeTypes();

            CSystemOptions objCSystemOptions = new CSystemOptions();
            objCSystemOptions.GetList("Where OptionID= 195");
            if (objCSystemOptions.lstCVarSystemOptions.Count > 0 && objCSystemOptions.lstCVarSystemOptions[0].OptionValue)
            {
                checkException = Fleet_Forwarding_ChargeTypes.InsertUpdate_Fleet_Forwarding_ChargeTypes(objCVarChargeTypes);
            }
            else
            {
                objCChargeTypes.lstCVarChargeTypes.Add(objCVarChargeTypes);
                checkException = objCChargeTypes.SaveMethod(objCChargeTypes.lstCVarChargeTypes);
            }

            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
                _message = checkException.Message;
            }
            else
            { //not unique
                _result = true;
                if (checkException == null && InsertDTO.pChargeTypeGroupID != 0 && (CompanyName == "LAT" || CompanyName == "LATT"))
                {
                    var DynamicsGPControllerObject = new DynamicsGPController();
                    try
                    {
                        CvwLattChargeTypes objCvwLattChargeTypes = new CvwLattChargeTypes();
                        objCvwLattChargeTypes.GetList($"WHERE ID={objCChargeTypes.lstCVarChargeTypes[0].ID}");

                        if (objCvwLattChargeTypes.lstCVarvwLattChargeTypes.Count == 1)
                        {
                            APIResponse response = DynamicsGPControllerObject.InsertChargeType(objCvwLattChargeTypes.lstCVarvwLattChargeTypes[0]);
                            if (response.IsSuccess)
                            {
                                //CChargeTypes updateCrmCode = new CChargeTypes();
                                //Exception e2 = updateCrmCode.UpdateList($"crmCode=N'{objCvwLattChargeTypes.lstCVarvwLattChargeTypes[0].Code}' WHERE ID={objCChargeTypes.lstCVarChargeTypes[0].ID}");
                                crmResult = true;
                            }
                            else
                            {
                                crmResult = false;
                                crmMessage = response.Message;
                            }

                        }
                    }
                    catch (Exception ex)
                    {
                        Exception e2 = ex;
                    }
                }
            }

            
            Int32 SubAccountID_Return = 0;
            Int32 SubAccountID_Revenue = 0;
            Int32 SubAccountID_Expense = 0;

            Int32 supGroupID = 0;
            Int32 AccountID_Return = 0;
            Int32 AccountID_Revenue = 0;
            Int32 AccountID_Expense = 0;


            

            CChargeTypesTAX objCChargeTypesTAX = new CChargeTypesTAX();
            objCChargeTypesTAX.GetList("WHERE Name=N'" + InsertDTO.pName.Trim().ToUpper() + "'");

            CA_SubAccountsTAX objCA_SubAccountsTAXOther = new CA_SubAccountsTAX(); //get the parent details
            CA_SubAccounts_DetailsTAX objCA_SubAccounts_DetailsTAXOther = new CA_SubAccounts_DetailsTAX(); //get the parent details
            CA_AccountsTAX objCAccountsTAX = new CA_AccountsTAX(); //get the parent details
            #region Tax
            #region SubAccount
            //SubAccountID_Return
            CA_SubAccounts objCA_SubAccountsSubAccountID_Return = new CA_SubAccounts(); //get the parent details
            checkException = objCA_SubAccountsSubAccountID_Return.GetListPaging(9999, 1, "WHERE ID = " + InsertDTO.pSubAccountID_Return, "ID", out _RowCount2);

            //subAccountID_Revenue
            CA_SubAccounts objCA_SubAccountsSubAccountID_Revenue = new CA_SubAccounts(); //get the parent details
            checkException = objCA_SubAccountsSubAccountID_Revenue.GetListPaging(9999, 1, "WHERE ID = " + InsertDTO.pSubAccountID_Revenue, "ID", out _RowCount2);

            //SubAccountID_Expense
            CA_SubAccounts objCA_SubAccountsSubAccountID_Expense = new CA_SubAccounts(); //get the parent details
            checkException = objCA_SubAccountsSubAccountID_Expense.GetListPaging(9999, 1, "WHERE ID = " + InsertDTO.pSubAccountID_Expense, "ID", out _RowCount2);



            if (objCA_SubAccountsSubAccountID_Return.lstCVarA_SubAccounts.Count > 0)
            {
                checkException = objCA_SubAccountsTAXOther.GetListPaging(9999, 1, "WHERE SubAccount_Name = N'" + objCA_SubAccountsSubAccountID_Return.lstCVarA_SubAccounts[0].SubAccount_Name + "'", "ID", out _RowCount2);
                if (objCA_SubAccountsTAXOther.lstCVarA_SubAccounts.Count > 0)
                {
                    SubAccountID_Return = objCA_SubAccountsTAXOther.lstCVarA_SubAccounts[0].ID;

                }
            }
            if (objCA_SubAccountsSubAccountID_Revenue.lstCVarA_SubAccounts.Count > 0)
            {
                checkException = objCA_SubAccountsTAXOther.GetListPaging(9999, 1, "WHERE SubAccount_Name = N'" + objCA_SubAccountsSubAccountID_Revenue.lstCVarA_SubAccounts[0].SubAccount_Name + "'", "ID", out _RowCount2);
                if (objCA_SubAccountsTAXOther.lstCVarA_SubAccounts.Count > 0)
                {
                    SubAccountID_Revenue = objCA_SubAccountsTAXOther.lstCVarA_SubAccounts[0].ID;

                }
            }
            if (objCA_SubAccountsSubAccountID_Expense.lstCVarA_SubAccounts.Count > 0)
            {
                checkException = objCA_SubAccountsTAXOther.GetListPaging(9999, 1, "WHERE SubAccount_Name = N'" + objCA_SubAccountsSubAccountID_Expense.lstCVarA_SubAccounts[0].SubAccount_Name + "'", "ID", out _RowCount2);
                if (objCA_SubAccountsTAXOther.lstCVarA_SubAccounts.Count > 0)
                {
                    AccountID_Expense = objCA_SubAccountsTAXOther.lstCVarA_SubAccounts[0].ID;

                }
            }
            #endregion



            #region AccountID_Return
            //Account
            CA_Accounts objCACA_AccountsAccountID_Return = new CA_Accounts(); //get the parent details
            checkException = objCACA_AccountsAccountID_Return.GetListPaging(9999, 1, "WHERE ID = " + InsertDTO.pAccountID_Return, "ID", out _RowCount2);

            //AccountID_Revenue
            CA_Accounts objCACA_AccountsAccountID_Revenue = new CA_Accounts(); //get the parent details
            checkException = objCACA_AccountsAccountID_Revenue.GetListPaging(9999, 1, "WHERE ID = " + InsertDTO.pAccountID_Revenue, "ID", out _RowCount2);

            //AccountID_Expense
            CA_Accounts objCACA_AccountsAccountID_Expense = new CA_Accounts(); //get the parent details
            checkException = objCACA_AccountsAccountID_Expense.GetListPaging(9999, 1, "WHERE ID = " + InsertDTO.pAccountID_Expense, "ID", out _RowCount2);

            if (objCACA_AccountsAccountID_Return.lstCVarA_Accounts.Count > 0)
            {
                checkException = objCAccountsTAX.GetListPaging(9999, 1, "WHERE Account_Name = N'" + objCACA_AccountsAccountID_Return.lstCVarA_Accounts[0].Account_Name + "'", "ID", out _RowCount2);
                if (objCAccountsTAX.lstCVarA_Accounts.Count > 0)
                {
                    AccountID_Return = objCAccountsTAX.lstCVarA_Accounts[0].ID;
                }

            }
            if (objCACA_AccountsAccountID_Revenue.lstCVarA_Accounts.Count > 0)
            {
                checkException = objCAccountsTAX.GetListPaging(9999, 1, "WHERE Account_Name = N'" + objCACA_AccountsAccountID_Revenue.lstCVarA_Accounts[0].Account_Name + "'", "ID", out _RowCount2);
                if (objCAccountsTAX.lstCVarA_Accounts.Count > 0)
                {
                    AccountID_Revenue = objCAccountsTAX.lstCVarA_Accounts[0].ID;
                }

            }
            if (objCACA_AccountsAccountID_Expense.lstCVarA_Accounts.Count > 0)
            {
                checkException = objCAccountsTAX.GetListPaging(9999, 1, "WHERE Account_Name = N'" + objCACA_AccountsAccountID_Expense.lstCVarA_Accounts[0].Account_Name + "'", "ID", out _RowCount2);
                if (objCAccountsTAX.lstCVarA_Accounts.Count > 0)
                {
                    AccountID_Expense = objCAccountsTAX.lstCVarA_Accounts[0].ID;
                }

            }
            #endregion




            if ((CompanyName == "CHM" || CompanyName == "OCE" || CompanyName == "TRM") && checkException == null)
            {
                CVarChargeTypesTAX objCVarChargeTypesTax = new CVarChargeTypesTAX();

                objCVarChargeTypesTax.MeasurementID = InsertDTO.pMeasurementID;
                objCVarChargeTypesTax.TaxeTypeID = InsertDTO.pTaxeTypeID;
                objCVarChargeTypesTax.InvoiceTypeID = InsertDTO.pInvoiceTypeID;

                objCVarChargeTypesTax.Code = InsertDTO.pCode;
                objCVarChargeTypesTax.PreCode = InsertDTO.pPreCode;
                objCVarChargeTypesTax.Name = InsertDTO.pName;
                objCVarChargeTypesTax.LocalName = (InsertDTO.pLocalName == null ? "" : InsertDTO.pLocalName);
                objCVarChargeTypesTax.ViewOrder = InsertDTO.pViewOrder;
                objCVarChargeTypesTax.IsAddedManually = true;
                objCVarChargeTypesTax.IsUsedInPayable = InsertDTO.pIsUsedInPayable;
                objCVarChargeTypesTax.IsUsedInReceivable = InsertDTO.pIsUsedInReceivable;
                objCVarChargeTypesTax.IsTank = InsertDTO.pIsTank;
                objCVarChargeTypesTax.IsOcean = InsertDTO.pIsOcean;
                objCVarChargeTypesTax.IsInland = InsertDTO.pIsInland;
                objCVarChargeTypesTax.IsAir = InsertDTO.pIsAir;
                objCVarChargeTypesTax.IsDefaultInQuotation = InsertDTO.pIsDefaultInQuotation;
                objCVarChargeTypesTax.IsDefaultInOperations = InsertDTO.pIsDefaultInOperations;
                objCVarChargeTypesTax.IsGeneralChargeType = InsertDTO.pIsGeneralChargeType;
                objCVarChargeTypesTax.IsWarehouseChargeType = InsertDTO.pIsWarehouseChargeType;
                objCVarChargeTypesTax.IsOperationChargeType = InsertDTO.pIsOperationChargeType;
                objCVarChargeTypesTax.IsOfficial = InsertDTO.pIsOfficial;

                objCVarChargeTypesTax.AccountID_Return = AccountID_Return;
                objCVarChargeTypesTax.SubAccountID_Return = SubAccountID_Return;
                objCVarChargeTypesTax.AccountID_Revenue = AccountID_Revenue;
                objCVarChargeTypesTax.SubAccountID_Revenue = SubAccountID_Revenue;
                objCVarChargeTypesTax.CostCenterID_Revenue = 0;
                objCVarChargeTypesTax.AccountID_Expense = AccountID_Expense;
                objCVarChargeTypesTax.SubAccountID_Expense = SubAccountID_Expense;
                objCVarChargeTypesTax.CostCenterID_Expense = 0;

                objCVarChargeTypesTax.IsInactive = InsertDTO.pIsInactive;
                objCVarChargeTypesTax.TimeLocked = DateTime.Parse("01-01-1900");
                objCVarChargeTypesTax.LockingUserID = 0;

                objCVarChargeTypesTax.Notes = (InsertDTO.pNotes == null ? "" : InsertDTO.pNotes);
                objCVarChargeTypesTax.TemplateID = InsertDTO.pTemplateID;
                objCVarChargeTypesTax.ChargeTypeGroupID = InsertDTO.pChargeTypeGroupID;
                objCVarChargeTypesTax.PurchaseItemID = InsertDTO.pPurchaseItemID;

                objCVarChargeTypesTax.Cost = InsertDTO.pCost;

                objCVarChargeTypesTax.CreatorUserID = objCVarChargeTypesTax.ModificatorUserID = WebSecurity.CurrentUserId;
                objCVarChargeTypesTax.CreationDate = objCVarChargeTypesTax.ModificationDate = DateTime.Now;

                CChargeTypesTAX objCChargeTypesTax = new CChargeTypesTAX();
                objCChargeTypesTax.lstCVarChargeTypes.Add(objCVarChargeTypesTax);
                checkException = objCChargeTypesTax.SaveMethod(objCChargeTypesTax.lstCVarChargeTypes);
                if (checkException != null) // an exception is caught in the model
                {
                    if (checkException.Message.Contains("UNIQUE"))
                        _result = false;
                }
                else //not unique
                    _result = true;
            }
            #endregion

            #region ChargeTypeAccounts
            objCChargeTypes.GetList("WHERE ID = (SELECT MAX(ID) FROM ChargeTypes)");
            InsertDTO.pID = objCChargeTypes.lstCVarChargeTypes.Count > 0 ? objCChargeTypes.lstCVarChargeTypes[0].ID : 0;
            CChargeTypeAccounts objCChargeTypeAccounts = new CChargeTypeAccounts();
            foreach (var ChargeTypeAccountsDetail in InsertDTO.ChargeTypeAccountsDetails)
            {
                objCChargeTypeAccounts.GetList("WHERE ChargeTypeID = " + InsertDTO.pID);
                //Insert
                if (!objCChargeTypeAccounts.lstCVarChargeTypeAccounts
                    .Any(x => x.ServiceID == ChargeTypeAccountsDetail.pServiceID
                    && x.DirectionID == ChargeTypeAccountsDetail.pDirectionID
                    && x.CategoryID == ChargeTypeAccountsDetail.pCategoryID
                    && x.StorageLocationID == ChargeTypeAccountsDetail.pStorageLocationID))
                {
                    objCChargeTypeAccounts.SaveMethod(new List<CVarChargeTypeAccounts>
                    {
                        new CVarChargeTypeAccounts
                        {
                            ChargeTypeID = InsertDTO.pID,
                            ServiceID = ChargeTypeAccountsDetail.pServiceID,
                            DirectionID = ChargeTypeAccountsDetail.pDirectionID,
                            IsOfficial = ChargeTypeAccountsDetail.pIsOfficialDetails,
                            RevenueAccountID = ChargeTypeAccountsDetail.pRevenueAccountID,
                            RevenueSubAccountID = ChargeTypeAccountsDetail.pRevenueSubAccountID,
                            RevenueCostCenterID = ChargeTypeAccountsDetail.pRevenueCostCenterID,
                            ExpenseAccountID = ChargeTypeAccountsDetail.pExpenseAccountID,
                            ExpenseSubAccountID = ChargeTypeAccountsDetail.pExpenseSubAccountID,
                            ExpenseCostCenterID = ChargeTypeAccountsDetail.pExpenseCostCenterID,
                            StorageLocationID = ChargeTypeAccountsDetail.pStorageLocationID,
                            CategoryID = ChargeTypeAccountsDetail.pCategoryID
                        }
                    });
                }
            }
            #endregion
            //return _result;
            return new object[]
            {
                _result,
                _message,
                crmResult,
                crmMessage
            };
        }

        [HttpGet, HttpPost]
        public bool Update([FromBody] UpdateDTO UpdateDTO)
        {
            Exception checkException = null;
            bool _result = false;
            CVarChargeTypes objCVarChargeTypes = new CVarChargeTypes();

            //the next 4 lines to get the CreatorUserID and CreationDate and set them as they were entered before
            CChargeTypes objCGetCreationInformation = new CChargeTypes();
            objCGetCreationInformation.GetItem(UpdateDTO.pID);
            objCVarChargeTypes.IsAddedManually = objCGetCreationInformation.lstCVarChargeTypes[0].IsAddedManually;
            objCVarChargeTypes.CreatorUserID = objCGetCreationInformation.lstCVarChargeTypes[0].CreatorUserID;
            objCVarChargeTypes.CreationDate = objCGetCreationInformation.lstCVarChargeTypes[0].CreationDate;

            objCVarChargeTypes.ID = UpdateDTO.pID;
            objCVarChargeTypes.MeasurementID = UpdateDTO.pMeasurementID;
            objCVarChargeTypes.TaxeTypeID = UpdateDTO.pTaxeTypeID;
            objCVarChargeTypes.InvoiceTypeID = UpdateDTO.pInvoiceTypeID;

            objCVarChargeTypes.Code = UpdateDTO.pCode;
            objCVarChargeTypes.PreCode = UpdateDTO.pPreCode;
            objCVarChargeTypes.Name = UpdateDTO.pName;
            objCVarChargeTypes.LocalName = (UpdateDTO.pLocalName == null ? "" : UpdateDTO.pLocalName);
            objCVarChargeTypes.ViewOrder = UpdateDTO.pViewOrder;
            objCVarChargeTypes.IsUsedInPayable = UpdateDTO.pIsUsedInPayable;
            objCVarChargeTypes.IsUsedInReceivable = UpdateDTO.pIsUsedInReceivable;
            objCVarChargeTypes.IsTank = UpdateDTO.pIsTank;
            objCVarChargeTypes.IsOcean = UpdateDTO.pIsOcean;
            objCVarChargeTypes.IsInland = UpdateDTO.pIsInland;
            objCVarChargeTypes.IsAir = UpdateDTO.pIsAir;
            objCVarChargeTypes.IsDefaultInQuotation = UpdateDTO.pIsDefaultInQuotation;
            objCVarChargeTypes.IsDefaultInOperations = UpdateDTO.pIsDefaultInOperations;
            objCVarChargeTypes.IsGeneralChargeType = UpdateDTO.pIsGeneralChargeType;
            objCVarChargeTypes.IsWarehouseChargeType = UpdateDTO.pIsWarehouseChargeType;
            objCVarChargeTypes.IsOperationChargeType = UpdateDTO.pIsOperationChargeType;
            objCVarChargeTypes.IsOfficial = UpdateDTO.pIsOfficial;

            objCVarChargeTypes.AccountID_Return = UpdateDTO.pAccountID_Return;
            objCVarChargeTypes.SubAccountID_Return = UpdateDTO.pSubAccountID_Return;
            objCVarChargeTypes.AccountID_Revenue = UpdateDTO.pAccountID_Revenue;
            objCVarChargeTypes.SubAccountID_Revenue = UpdateDTO.pSubAccountID_Revenue;
            objCVarChargeTypes.CostCenterID_Revenue = UpdateDTO.pCostCenterID_Revenue;
            objCVarChargeTypes.AccountID_Expense = UpdateDTO.pAccountID_Expense;
            objCVarChargeTypes.SubAccountID_Expense = UpdateDTO.pSubAccountID_Expense;
            objCVarChargeTypes.CostCenterID_Expense = UpdateDTO.pCostCenterID_Expense;

            objCVarChargeTypes.IsInactive = UpdateDTO.pIsInactive;
            objCVarChargeTypes.TimeLocked = DateTime.Parse("01-01-1900");
            objCVarChargeTypes.LockingUserID = 0;

            objCVarChargeTypes.Notes = (UpdateDTO.pNotes == null ? "" : UpdateDTO.pNotes);
            objCVarChargeTypes.TemplateID = UpdateDTO.pTemplateID;
            objCVarChargeTypes.ChargeTypeGroupID = UpdateDTO.pChargeTypeGroupID;
            objCVarChargeTypes.PurchaseItemID = UpdateDTO.pPurchaseItemID;

            objCVarChargeTypes.Cost = UpdateDTO.pCost;

            objCVarChargeTypes.IsDirectOperation = UpdateDTO.pIsDirectOperation;
            objCVarChargeTypes.IsMasterOperation = UpdateDTO.pIsMasterOperation;

            objCVarChargeTypes.ChargeTypeCurrency_ID = UpdateDTO.pCurrencyID;

            objCVarChargeTypes.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarChargeTypes.ModificationDate = DateTime.Now;
            objCVarChargeTypes.FreightGroupID = UpdateDTO.pFreightGroupID;

            objCVarChargeTypes.crmCode = objCGetCreationInformation.lstCVarChargeTypes[0].crmCode;

            objCVarChargeTypes.IsDisbersment = UpdateDTO.pIsDisbersment;
            objCVarChargeTypes.CostTaxID = UpdateDTO.pCostTaxID;
            objCVarChargeTypes.ItemCategoryID = UpdateDTO.pItemCategoryID;

            CSystemOptions objCSystemOptions = new CSystemOptions();
            objCSystemOptions.GetList("Where OptionID= 195");
            if (objCSystemOptions.lstCVarSystemOptions.Count > 0 && objCSystemOptions.lstCVarSystemOptions[0].OptionValue)
            {
                checkException = Fleet_Forwarding_ChargeTypes.InsertUpdate_Fleet_Forwarding_ChargeTypes(objCVarChargeTypes);
            }
            else
            { 
                CChargeTypes objCChargeTypes = new CChargeTypes();
                objCChargeTypes.lstCVarChargeTypes.Add(objCVarChargeTypes);
                checkException = objCChargeTypes.SaveMethod(objCChargeTypes.lstCVarChargeTypes);
            }
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else //not unique
                _result = true;

            #region tax
            int _RowCount2 = 0;
            Int32 SubAccountID_Return = 0;
            Int32 SubAccountID_Revenue = 0;
            Int32 SubAccountID_Expense = 0;

            Int32 supGroupID = 0;
            Int32 AccountID_Return = 0;
            Int32 AccountID_Revenue = 0;
            Int32 AccountID_Expense = 0;


            CvwDefaults objCvwDefaults = new CvwDefaults();
            objCvwDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount2); //i am sure i ve just one row isa
            string CompanyName = objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName;

            CChargeTypesTAX objCChargeTypesTAX = new CChargeTypesTAX();
            objCChargeTypesTAX.GetList("WHERE Name=N'" + UpdateDTO.pName.Trim().ToUpper() + "'");

            CA_SubAccountsTAX objCA_SubAccountsTAXOther = new CA_SubAccountsTAX(); //get the parent details
            CA_SubAccounts_DetailsTAX objCA_SubAccounts_DetailsTAXOther = new CA_SubAccounts_DetailsTAX(); //get the parent details
            CA_AccountsTAX objCAccountsTAX = new CA_AccountsTAX(); //get the parent details

            #region SubAccount
            //SubAccountID_Return
            CA_SubAccounts objCA_SubAccountsSubAccountID_Return = new CA_SubAccounts(); //get the parent details
            checkException = objCA_SubAccountsSubAccountID_Return.GetListPaging(9999, 1, "WHERE ID = " + UpdateDTO.pSubAccountID_Return, "ID", out _RowCount2);

            //subAccountID_Revenue
            CA_SubAccounts objCA_SubAccountsSubAccountID_Revenue = new CA_SubAccounts(); //get the parent details
            checkException = objCA_SubAccountsSubAccountID_Revenue.GetListPaging(9999, 1, "WHERE ID = " + UpdateDTO.pSubAccountID_Revenue, "ID", out _RowCount2);

            //SubAccountID_Expense
            CA_SubAccounts objCA_SubAccountsSubAccountID_Expense = new CA_SubAccounts(); //get the parent details
            checkException = objCA_SubAccountsSubAccountID_Expense.GetListPaging(9999, 1, "WHERE ID = " + UpdateDTO.pSubAccountID_Expense, "ID", out _RowCount2);



            if (objCA_SubAccountsSubAccountID_Return.lstCVarA_SubAccounts.Count > 0)
            {
                checkException = objCA_SubAccountsTAXOther.GetListPaging(9999, 1, "WHERE SubAccount_Name = N'" + objCA_SubAccountsSubAccountID_Return.lstCVarA_SubAccounts[0].SubAccount_Name + "'", "ID", out _RowCount2);
                if (objCA_SubAccountsTAXOther.lstCVarA_SubAccounts.Count > 0)
                {
                    SubAccountID_Return = objCA_SubAccountsTAXOther.lstCVarA_SubAccounts[0].ID;

                }
            }
            if (objCA_SubAccountsSubAccountID_Revenue.lstCVarA_SubAccounts.Count > 0)
            {
                checkException = objCA_SubAccountsTAXOther.GetListPaging(9999, 1, "WHERE SubAccount_Name = N'" + objCA_SubAccountsSubAccountID_Revenue.lstCVarA_SubAccounts[0].SubAccount_Name + "'", "ID", out _RowCount2);
                if (objCA_SubAccountsTAXOther.lstCVarA_SubAccounts.Count > 0)
                {
                    SubAccountID_Revenue = objCA_SubAccountsTAXOther.lstCVarA_SubAccounts[0].ID;

                }
            }
            if (objCA_SubAccountsSubAccountID_Expense.lstCVarA_SubAccounts.Count > 0)
            {
                checkException = objCA_SubAccountsTAXOther.GetListPaging(9999, 1, "WHERE SubAccount_Name = N'" + objCA_SubAccountsSubAccountID_Expense.lstCVarA_SubAccounts[0].SubAccount_Name + "'", "ID", out _RowCount2);
                if (objCA_SubAccountsTAXOther.lstCVarA_SubAccounts.Count > 0)
                {
                    AccountID_Expense = objCA_SubAccountsTAXOther.lstCVarA_SubAccounts[0].ID;

                }
            }
            #endregion



            #region AccountID_Return
            //Account
            CA_Accounts objCACA_AccountsAccountID_Return = new CA_Accounts(); //get the parent details
            checkException = objCACA_AccountsAccountID_Return.GetListPaging(9999, 1, "WHERE ID = " + UpdateDTO.pAccountID_Return, "ID", out _RowCount2);

            //AccountID_Revenue
            CA_Accounts objCACA_AccountsAccountID_Revenue = new CA_Accounts(); //get the parent details
            checkException = objCACA_AccountsAccountID_Revenue.GetListPaging(9999, 1, "WHERE ID = " + UpdateDTO.pAccountID_Revenue, "ID", out _RowCount2);

            //AccountID_Expense
            CA_Accounts objCACA_AccountsAccountID_Expense = new CA_Accounts(); //get the parent details
            checkException = objCACA_AccountsAccountID_Expense.GetListPaging(9999, 1, "WHERE ID = " + UpdateDTO.pAccountID_Expense, "ID", out _RowCount2);

            if (objCACA_AccountsAccountID_Return.lstCVarA_Accounts.Count > 0)
            {
                checkException = objCAccountsTAX.GetListPaging(9999, 1, "WHERE Account_Name = N'" + objCACA_AccountsAccountID_Return.lstCVarA_Accounts[0].Account_Name + "'", "ID", out _RowCount2);
                if (objCAccountsTAX.lstCVarA_Accounts.Count > 0)
                {
                    AccountID_Return = objCAccountsTAX.lstCVarA_Accounts[0].ID;
                }

            }
            if (objCACA_AccountsAccountID_Revenue.lstCVarA_Accounts.Count > 0)
            {
                checkException = objCAccountsTAX.GetListPaging(9999, 1, "WHERE Account_Name = N'" + objCACA_AccountsAccountID_Revenue.lstCVarA_Accounts[0].Account_Name + "'", "ID", out _RowCount2);
                if (objCAccountsTAX.lstCVarA_Accounts.Count > 0)
                {
                    AccountID_Revenue = objCAccountsTAX.lstCVarA_Accounts[0].ID;
                }

            }
            if (objCACA_AccountsAccountID_Expense.lstCVarA_Accounts.Count > 0)
            {
                checkException = objCAccountsTAX.GetListPaging(9999, 1, "WHERE Account_Name = N'" + objCACA_AccountsAccountID_Expense.lstCVarA_Accounts[0].Account_Name + "'", "ID", out _RowCount2);
                if (objCAccountsTAX.lstCVarA_Accounts.Count > 0)
                {
                    AccountID_Expense = objCAccountsTAX.lstCVarA_Accounts[0].ID;
                }

            }
            #endregion
            if ((CompanyName == "CHM" || CompanyName == "OCE" || CompanyName == "TRM") && checkException == null && objCChargeTypesTAX.lstCVarChargeTypes.Count > 0)
            {
                CVarChargeTypesTAX objCVarChargeTypesTax = new CVarChargeTypesTAX();

                //the next 4 lines to get the CreatorUserID and CreationDate and set them as they were entered before
                CChargeTypesTAX objCGetCreationInformationTax = new CChargeTypesTAX();
                objCGetCreationInformation.GetItem(objCChargeTypesTAX.lstCVarChargeTypes[0].ID);
                objCVarChargeTypesTax.IsAddedManually = objCGetCreationInformation.lstCVarChargeTypes[0].IsAddedManually;
                objCVarChargeTypesTax.CreatorUserID = objCGetCreationInformation.lstCVarChargeTypes[0].CreatorUserID;
                objCVarChargeTypesTax.CreationDate = objCGetCreationInformation.lstCVarChargeTypes[0].CreationDate;

                objCVarChargeTypesTax.ID = objCChargeTypesTAX.lstCVarChargeTypes[0].ID;
                objCVarChargeTypesTax.MeasurementID = UpdateDTO.pMeasurementID;
                objCVarChargeTypesTax.TaxeTypeID = UpdateDTO.pTaxeTypeID;
                objCVarChargeTypesTax.InvoiceTypeID = UpdateDTO.pInvoiceTypeID;

                objCVarChargeTypesTax.Code = UpdateDTO.pCode;
                objCVarChargeTypesTax.PreCode = UpdateDTO.pPreCode;
                objCVarChargeTypesTax.Name = UpdateDTO.pName;
                objCVarChargeTypesTax.LocalName = (UpdateDTO.pLocalName == null ? "" : UpdateDTO.pLocalName);
                objCVarChargeTypesTax.ViewOrder = UpdateDTO.pViewOrder;
                objCVarChargeTypesTax.IsUsedInPayable = UpdateDTO.pIsUsedInPayable;
                objCVarChargeTypesTax.IsUsedInReceivable = UpdateDTO.pIsUsedInReceivable;
                objCVarChargeTypesTax.IsTank = UpdateDTO.pIsTank;
                objCVarChargeTypesTax.IsOcean = UpdateDTO.pIsOcean;
                objCVarChargeTypesTax.IsInland = UpdateDTO.pIsInland;
                objCVarChargeTypesTax.IsAir = UpdateDTO.pIsAir;
                objCVarChargeTypesTax.IsDefaultInQuotation = UpdateDTO.pIsDefaultInQuotation;
                objCVarChargeTypesTax.IsDefaultInOperations = UpdateDTO.pIsDefaultInOperations;
                objCVarChargeTypesTax.IsGeneralChargeType = UpdateDTO.pIsGeneralChargeType;
                objCVarChargeTypesTax.IsWarehouseChargeType = UpdateDTO.pIsWarehouseChargeType;
                objCVarChargeTypesTax.IsOperationChargeType = UpdateDTO.pIsOperationChargeType;
                objCVarChargeTypesTax.IsOfficial = UpdateDTO.pIsOfficial;

                objCVarChargeTypesTax.AccountID_Return = AccountID_Return;
                objCVarChargeTypesTax.SubAccountID_Return = SubAccountID_Return;
                objCVarChargeTypesTax.AccountID_Revenue = AccountID_Revenue;
                objCVarChargeTypesTax.SubAccountID_Revenue = SubAccountID_Revenue;
                objCVarChargeTypesTax.CostCenterID_Revenue = 0;
                objCVarChargeTypesTax.AccountID_Expense = AccountID_Expense;
                objCVarChargeTypesTax.SubAccountID_Expense = SubAccountID_Expense;
                objCVarChargeTypesTax.CostCenterID_Expense = 0;

                objCVarChargeTypesTax.IsInactive = UpdateDTO.pIsInactive;
                objCVarChargeTypesTax.TimeLocked = DateTime.Parse("01-01-1900");
                objCVarChargeTypesTax.LockingUserID = 0;

                objCVarChargeTypesTax.Notes = (UpdateDTO.pNotes == null ? "" : UpdateDTO.pNotes);
                objCVarChargeTypesTax.TemplateID = UpdateDTO.pTemplateID;
                objCVarChargeTypesTax.ChargeTypeGroupID = UpdateDTO.pChargeTypeGroupID;
                objCVarChargeTypesTax.PurchaseItemID = UpdateDTO.pPurchaseItemID;

                objCVarChargeTypesTax.Cost = UpdateDTO.pCost;

                objCVarChargeTypesTax.ModificatorUserID = WebSecurity.CurrentUserId;
                objCVarChargeTypesTax.ModificationDate = DateTime.Now;

                CChargeTypesTAX objCChargeTypesTax = new CChargeTypesTAX();
                objCChargeTypesTax.lstCVarChargeTypes.Add(objCVarChargeTypesTax);
                checkException = objCChargeTypesTax.SaveMethod(objCChargeTypesTax.lstCVarChargeTypes);
                if (checkException != null) // an exception is caught in the model
                {
                    if (checkException.Message.Contains("UNIQUE"))
                        _result = false;
                }
                else //not unique
                    _result = true;
            }


            #endregion

            #region ChargeTypeAccounts
            CChargeTypeAccounts objCChargeTypeAccounts = new CChargeTypeAccounts();
            objCChargeTypeAccounts.GetList("WHERE ChargeTypeID = " + UpdateDTO.pID);

            //Delete
            foreach (var ChargeAccountsRecord in objCChargeTypeAccounts.lstCVarChargeTypeAccounts)
            {
                if (!UpdateDTO.ChargeTypeAccountsDetails.Any(x => x.pServiceID == ChargeAccountsRecord.ServiceID && x.pDirectionID == ChargeAccountsRecord.DirectionID && x.pStorageLocationID == ChargeAccountsRecord.StorageLocationID && x.pCategoryID == ChargeAccountsRecord.CategoryID))
                {
                    objCChargeTypeAccounts.lstDeletedCPKChargeTypeAccounts.Add(new CPKChargeTypeAccounts { ID = ChargeAccountsRecord.ID });
                }
            }

            foreach (var ChargeTypeAccountsDetail in UpdateDTO.ChargeTypeAccountsDetails)
            {
                //Insert
                if(!objCChargeTypeAccounts.lstCVarChargeTypeAccounts
                    .Any(x => x.ServiceID == ChargeTypeAccountsDetail.pServiceID 
                    && x.DirectionID == ChargeTypeAccountsDetail.pDirectionID 
                    && x.StorageLocationID == ChargeTypeAccountsDetail.pStorageLocationID 
                    && x.CategoryID == ChargeTypeAccountsDetail.pCategoryID))
                {
                    Exception ee = objCChargeTypeAccounts.SaveMethod(new List<CVarChargeTypeAccounts>
                    {
                        new CVarChargeTypeAccounts
                        {
                            ChargeTypeID = UpdateDTO.pID,
                            ServiceID = ChargeTypeAccountsDetail.pServiceID,
                            DirectionID = ChargeTypeAccountsDetail.pDirectionID,
                            IsOfficial = ChargeTypeAccountsDetail.pIsOfficialDetails,
                            RevenueAccountID = ChargeTypeAccountsDetail.pRevenueAccountID,
                            RevenueSubAccountID = ChargeTypeAccountsDetail.pRevenueSubAccountID,
                            RevenueCostCenterID = ChargeTypeAccountsDetail.pRevenueCostCenterID,
                            ExpenseAccountID = ChargeTypeAccountsDetail.pExpenseAccountID,
                            ExpenseSubAccountID = ChargeTypeAccountsDetail.pExpenseSubAccountID,
                            ExpenseCostCenterID = ChargeTypeAccountsDetail.pExpenseCostCenterID,
                            StorageLocationID = ChargeTypeAccountsDetail.pStorageLocationID,
                            CategoryID = ChargeTypeAccountsDetail.pCategoryID
                        }
                    });
                }
                //Update
                else
                {
                    var DetailID = objCChargeTypeAccounts.lstCVarChargeTypeAccounts
                        .Where(x => x.ServiceID == ChargeTypeAccountsDetail.pServiceID 
                        && x.DirectionID == ChargeTypeAccountsDetail.pDirectionID 
                        && x.StorageLocationID == ChargeTypeAccountsDetail.pStorageLocationID
                        && x.CategoryID == ChargeTypeAccountsDetail.pCategoryID)
                        .ToList()[0].ID;
                    objCChargeTypeAccounts.SaveMethod(new List<CVarChargeTypeAccounts>
                    {
                        new CVarChargeTypeAccounts
                        {
                            ID = DetailID,
                            ChargeTypeID = UpdateDTO.pID,
                            ServiceID = ChargeTypeAccountsDetail.pServiceID,
                            DirectionID = ChargeTypeAccountsDetail.pDirectionID,
                            IsOfficial = ChargeTypeAccountsDetail.pIsOfficialDetails,
                            RevenueAccountID = ChargeTypeAccountsDetail.pRevenueAccountID,
                            RevenueSubAccountID = ChargeTypeAccountsDetail.pRevenueSubAccountID,
                            RevenueCostCenterID = ChargeTypeAccountsDetail.pRevenueCostCenterID,
                            ExpenseAccountID = ChargeTypeAccountsDetail.pExpenseAccountID,
                            ExpenseSubAccountID = ChargeTypeAccountsDetail.pExpenseSubAccountID,
                            ExpenseCostCenterID = ChargeTypeAccountsDetail.pExpenseCostCenterID,
                            StorageLocationID = ChargeTypeAccountsDetail.pStorageLocationID,
                            CategoryID = ChargeTypeAccountsDetail.pCategoryID
                        }
                    });
                    objCChargeTypeAccounts.lstDeletedCPKChargeTypeAccounts.Remove(new CPKChargeTypeAccounts { ID = DetailID});
                }
                
            }
            
            if(objCChargeTypeAccounts.lstDeletedCPKChargeTypeAccounts.Count > 0)
                objCChargeTypeAccounts.DeleteItem(objCChargeTypeAccounts.lstDeletedCPKChargeTypeAccounts);
                #endregion
                return _result;
        }

        // [Route("/api/Countries/DeleteByID/{pCountryID}")]
        //[HttpGet, HttpPost]
        //public void DeleteByID(Int32 pCountryID)
        //{
        //    CCountries objCCountries = new CCountries();
        //    objCCountries.lstDeletedCPKCountries.Add(new CPKCountries() { CountryID = pCountryID });
        //    objCCountries.DeleteItem(objCCountries.lstDeletedCPKCountries);
        //}

        // [Route("api/Countries/Delete/{pCountriesIDs}")]
        [HttpGet, HttpPost]
        public bool Delete(String pChargeTypesIDs)
        {
            bool _result = false;
            CChargeTypes objCChargeTypes = new CChargeTypes();

            Exception checkException = null;

            CChargeTypesTAX objCChargeTypesTAX2 = new CChargeTypesTAX();

            int _RowCount = 0;
            CvwDefaults objCvwDefaults = new CvwDefaults();
            objCvwDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount);
            string CompanyName = objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName;

            if (CompanyName == "CHM" || CompanyName == "OCE" || CompanyName == "TRM")
            {
                foreach (var currentID in pChargeTypesIDs.Split(','))
                {

                    CChargeTypesTAX objCTruckersTAX = new CChargeTypesTAX();
                    objCChargeTypes.GetList("WHERE ID=" + currentID);
                    objCTruckersTAX.GetList("WHERE Name=N'" + objCChargeTypes.lstCVarChargeTypes[0].Name + "'");
                    if (objCTruckersTAX.lstCVarChargeTypes.Count > 0)
                    {
                        objCChargeTypesTAX2.lstDeletedCPKChargeTypes.Add(new CPKChargeTypesTAX() { ID = objCTruckersTAX.lstCVarChargeTypes[0].ID });

                    }


                }
                objCChargeTypesTAX2.DeleteItem(objCChargeTypesTAX2.lstDeletedCPKChargeTypes);
                if (checkException != null) // an exception is caught in the model
                {
                    if (checkException.Message.Contains("DELETE")) // some or all of the rows were not deleted due to dependencies
                        _result = false;
                }

            }


            CSystemOptions objCSystemOptions = new CSystemOptions();
            objCSystemOptions.GetList("Where OptionID= 195");
            if (objCSystemOptions.lstCVarSystemOptions.Count > 0 && objCSystemOptions.lstCVarSystemOptions[0].OptionValue)
            {
                foreach (var currentID in pChargeTypesIDs.Split(','))
                {
                    checkException = Fleet_Forwarding_ChargeTypes.Delete_Fleet_Forwarding_ChargeTypes(Convert.ToInt32(currentID), WebSecurity.CurrentUserId);
                    if (checkException != null)
                    {
                        _result = false;
                        break;
                    }
                }
                    
            }
            else
            {
                foreach (var currentID in pChargeTypesIDs.Split(','))
                {
                    objCChargeTypes.lstDeletedCPKChargeTypes.Add(new CPKChargeTypes() { ID = Int32.Parse(currentID.Trim()) });
                }
                checkException = objCChargeTypes.DeleteItem(objCChargeTypes.lstDeletedCPKChargeTypes);
            }

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
        public object[] InsertFromOperations(string pCodeFromOperations, string pNameFromOperations, string pLocalNameFromOperations)
        {
            string _MessageReturned = "";

            CVarChargeTypes objCVarChargeTypes = new CVarChargeTypes();

            objCVarChargeTypes.MeasurementID = 0;
            objCVarChargeTypes.TaxeTypeID = 0;
            objCVarChargeTypes.InvoiceTypeID = 0;

            objCVarChargeTypes.Code = pCodeFromOperations;
            objCVarChargeTypes.PreCode = "0";
            objCVarChargeTypes.Name = pNameFromOperations;
            objCVarChargeTypes.LocalName = (pLocalNameFromOperations == null ? "" : pLocalNameFromOperations);
            objCVarChargeTypes.ViewOrder = 0;
            objCVarChargeTypes.IsAddedManually = true;
            objCVarChargeTypes.IsUsedInPayable = true;
            objCVarChargeTypes.IsUsedInReceivable = true;
            objCVarChargeTypes.IsTank = false;
            objCVarChargeTypes.IsOcean = true;
            objCVarChargeTypes.IsInland = true;
            objCVarChargeTypes.IsAir = true;
            objCVarChargeTypes.IsDefaultInQuotation = false;
            objCVarChargeTypes.IsDefaultInOperations = false;
            objCVarChargeTypes.IsGeneralChargeType = false;
            objCVarChargeTypes.IsWarehouseChargeType = false;
            objCVarChargeTypes.IsOperationChargeType = true;
            objCVarChargeTypes.IsOfficial = false;

            objCVarChargeTypes.AccountID_Return = 0;
            objCVarChargeTypes.SubAccountID_Return = 0;
            objCVarChargeTypes.AccountID_Revenue = 0;
            objCVarChargeTypes.SubAccountID_Revenue = 0;
            objCVarChargeTypes.CostCenterID_Revenue = 0;
            objCVarChargeTypes.AccountID_Expense = 0;
            objCVarChargeTypes.SubAccountID_Expense = 0;
            objCVarChargeTypes.CostCenterID_Expense = 0;

            objCVarChargeTypes.IsInactive = false;
            objCVarChargeTypes.TimeLocked = DateTime.Parse("01-01-1900");
            objCVarChargeTypes.LockingUserID = 0;

            objCVarChargeTypes.Notes = "";
            objCVarChargeTypes.TemplateID = 0;
            objCVarChargeTypes.ChargeTypeGroupID = 0;
            objCVarChargeTypes.PurchaseItemID = 0;

            objCVarChargeTypes.CreatorUserID = objCVarChargeTypes.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarChargeTypes.CreationDate = objCVarChargeTypes.ModificationDate = DateTime.Now;

            objCVarChargeTypes.crmCode = "";
            objCVarChargeTypes.FreightGroupID = 0;

            objCVarChargeTypes.IsDisbersment = false;
            objCVarChargeTypes.CostTaxID = 0;
            objCVarChargeTypes.ItemCategoryID = 0;

            CChargeTypes objCChargeTypes = new CChargeTypes();
            objCChargeTypes.lstCVarChargeTypes.Add(objCVarChargeTypes);
            Exception checkException = objCChargeTypes.SaveMethod(objCChargeTypes.lstCVarChargeTypes);

            if (checkException == null) //get returned data
            {
                objCChargeTypes.GetList("WHERE IsInactive=0 ORDER BY Name");
            }
            else
                _MessageReturned = checkException.Message;
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                _MessageReturned
                , _MessageReturned == "" ? objCVarChargeTypes.ID : 0 //pInsertedID = pData[1]
                , _MessageReturned == "" ? serializer.Serialize(objCChargeTypes.lstCVarChargeTypes) : null //pChargeTypes = pData[2]
            };
        }

        [HttpGet]
        public static decimal ChargeTypes_GetQuantity(Int32 pChargeTypeID, Int64 pOperationID)
        {
            decimal Quantity = 1;
            Exception checkException = null;
            int _RowCount = 0;
            CvwChargeTypes objCvwChargeTypes = new CvwChargeTypes();
            CvwOperations objCvwOperations = new CvwOperations();
            checkException = objCvwChargeTypes.GetListPaging(1, 1, "WHERE ID=" + pChargeTypeID, "ID", out _RowCount);
            checkException = objCvwOperations.GetListPaging(1, 1, "WHERE ID=" + pOperationID, "ID", out _RowCount);
            #region Calculate Quantity
            if (objCvwChargeTypes.lstCVarvwChargeTypes[0].MeasurementCode.Trim() == "GRWT")
                Quantity = objCvwOperations.lstCVarvwOperations[0].GrossWeightSum;
            else if (objCvwChargeTypes.lstCVarvwChargeTypes[0].MeasurementCode.Trim() == "CHWT")
                Quantity = objCvwOperations.lstCVarvwOperations[0].ChargeableWeightSum;
            else if (objCvwChargeTypes.lstCVarvwChargeTypes[0].MeasurementCode.Trim() == "VOLU")
                Quantity = objCvwOperations.lstCVarvwOperations[0].VolumeSum;
            else if (objCvwChargeTypes.lstCVarvwChargeTypes[0].MeasurementCode.Trim() == "BTEU")
                Quantity = objCvwOperations.lstCVarvwOperations[0].TEUs;
            else if (objCvwChargeTypes.lstCVarvwChargeTypes[0].MeasurementCode.Trim() == "BCNT")
            {
                COperationContainersAndPackages objCOperationContainersAndPackages = new COperationContainersAndPackages();
                checkException = objCOperationContainersAndPackages.GetListPaging(999999, 1, "WHERE OperationID=" + pOperationID + " AND ContainerTypeID IS NOT NULL", "ID", out _RowCount);
                Quantity = objCOperationContainersAndPackages.lstCVarOperationContainersAndPackages.Count;
            }
            #endregion Calculate Quantity
            return Quantity == 0 ? 1 : Quantity;
        }

        [HttpGet]
        public static void ChargeTypes_SetDefaultReceivablesQuantity(Int64 pOperationIDToSetReceivablesQuantity)
        {
            Exception checkException = null;
            int _RowCount = 0;
            CvwChargeTypes objCvwChargeTypes = new CvwChargeTypes();
            CvwOperations objCvwOperations = new CvwOperations();
            CReceivables objCReceivables = new CReceivables();
            checkException = objCvwOperations.GetListPaging(1, 1, "WHERE ID=" + pOperationIDToSetReceivablesQuantity, "ID", out _RowCount);
            checkException = objCReceivables.GetListPaging(999999, 1, "WHERE OperationID=" + pOperationIDToSetReceivablesQuantity + " AND InvoiceID IS NULL AND IsDeleted=0", "ID", out _RowCount);
            for (int i = 0; i < objCReceivables.lstCVarReceivables.Count; i++)
            {
                checkException = objCvwChargeTypes.GetListPaging(1, 1, "WHERE ID=" + objCReceivables.lstCVarReceivables[i].ChargeTypeID, "ID", out _RowCount);
                #region Calculate Quantity
                decimal _Quantity = 1;
                if (objCvwChargeTypes.lstCVarvwChargeTypes[0].MeasurementCode.Trim() == "GRWT")
                    _Quantity = objCvwOperations.lstCVarvwOperations[0].GrossWeightSum;
                else if (objCvwChargeTypes.lstCVarvwChargeTypes[0].MeasurementCode.Trim() == "CHWT")
                    _Quantity = objCvwOperations.lstCVarvwOperations[0].ChargeableWeightSum;
                else if (objCvwChargeTypes.lstCVarvwChargeTypes[0].MeasurementCode.Trim() == "VOLU")
                    _Quantity = objCvwOperations.lstCVarvwOperations[0].VolumeSum;
                else if (objCvwChargeTypes.lstCVarvwChargeTypes[0].MeasurementCode.Trim() == "BTEU")
                    _Quantity = objCvwOperations.lstCVarvwOperations[0].TEUs;
                else if (objCvwChargeTypes.lstCVarvwChargeTypes[0].MeasurementCode.Trim() == "BCNT")
                {
                    COperationContainersAndPackages objCOperationContainersAndPackages = new COperationContainersAndPackages();

                    #region include the container type in criteria if generated from quotation
                    CQuotationCharges objCQuotationCharges = new CQuotationCharges();
                    string containerTypeWhereClause = "";
                    checkException = objCQuotationCharges.GetListPaging(1, 1, "WHERE QuotationRouteID=" + objCReceivables.lstCVarReceivables[i].GeneratingQRID + " AND ContainerTypeID IS NOT NULL AND ChargeTypeID=" + objCReceivables.lstCVarReceivables[i].ChargeTypeID, "ID", out _RowCount);
                    if (objCQuotationCharges.lstCVarQuotationCharges.Count > 0)
                        containerTypeWhereClause = " AND ContainerTypeID=" + objCQuotationCharges.lstCVarQuotationCharges[0].ContainerTypeID;
                    #endregion include the container type in criteria if generated from quotation

                    checkException = objCOperationContainersAndPackages.GetListPaging(999999, 1, "WHERE OperationID=" + pOperationIDToSetReceivablesQuantity + " AND ContainerTypeID IS NOT NULL" + containerTypeWhereClause, "ID", out _RowCount);
                    _Quantity = objCOperationContainersAndPackages.lstCVarOperationContainersAndPackages.Count;
                }
                _Quantity = _Quantity == 0 ? 1 : _Quantity;
                #endregion Calculate Quantity
                #region ensure receivables are correct
                string pUpdateClause = "";
                pUpdateClause = "Quantity=" + _Quantity + " \n";
                pUpdateClause += " , AmountWithoutVAT = ROUND((ISNULL(SalePrice, 0) * " + _Quantity + "),2)" + " \n";
                pUpdateClause += " , TaxPercentage = (select TT.CurrentPercentage FROM TaxeTypes TT WHERE TT.ID = TaxeTypeID)" + " \n";
                pUpdateClause += " , TaxAmount = ROUND((ISNULL(SalePrice, 0) * " + _Quantity + ") * (select TT.CurrentPercentage/100 FROM TaxeTypes TT WHERE TT.ID = TaxeTypeID), 2)" + " \n";
                pUpdateClause += " , DiscountPercentage = (select TT.CurrentPercentage FROM TaxeTypes TT WHERE TT.ID = DiscountTypeID)" + " \n";
                pUpdateClause += " , DiscountAmount = ROUND((ISNULL(SalePrice, 0) * " + _Quantity + ") * (select TT.CurrentPercentage/100 FROM TaxeTypes TT WHERE TT.ID = DiscountTypeID),2)" + " \n";
                pUpdateClause += " , SaleAmount = ROUND((ISNULL(SalePrice, 0) * " + _Quantity + "),2)" + " \n"
                              + " + (ROUND((ISNULL(SalePrice, 0) * " + _Quantity + ") * ISNULL((select ISNULL(TT.CurrentPercentage / 100, 0) FROM TaxeTypes TT WHERE TT.ID = TaxeTypeID),0) , 2))" + " \n"
                              + " - (ROUND((ISNULL(SalePrice, 0) * " + _Quantity + ") * ISNULL((select ISNULL(TT.CurrentPercentage / 100, 0) FROM TaxeTypes TT WHERE TT.ID = DiscountTypeID),0), 2))" + " \n";
                pUpdateClause += " WHERE ID=" + objCReceivables.lstCVarReceivables[i].ID;
                #endregion ensure receivables are correct

                checkException = objCReceivables.UpdateList(pUpdateClause);
            } //for (int i=0;i<objCReceivables.lstCVarReceivables.Count;i++)
        }

        [HttpGet, HttpPost]
        public object[] ChargeTypes_SetDefaultReceivablesQuantity_NotStatic(Int64 pOperationIDToSetReceivablesQuantity_NotStatic)
        {
            string _ReturnedMessage = "";
            Exception checkException = null;
            int _RowCount = 0;
            CvwChargeTypes objCvwChargeTypes = new CvwChargeTypes();
            CvwOperations objCvwOperations = new CvwOperations();
            CReceivables objCReceivables = new CReceivables();
            checkException = objCvwOperations.GetListPaging(1, 1, "WHERE ID=" + pOperationIDToSetReceivablesQuantity_NotStatic, "ID", out _RowCount);
            checkException = objCReceivables.GetListPaging(999999, 1, "WHERE OperationID=" + pOperationIDToSetReceivablesQuantity_NotStatic + " AND InvoiceID IS NULL AND IsDeleted=0", "ID", out _RowCount);
            for (int i = 0; i < objCReceivables.lstCVarReceivables.Count; i++)
            {
                checkException = objCvwChargeTypes.GetListPaging(1, 1, "WHERE ID=" + objCReceivables.lstCVarReceivables[i].ChargeTypeID, "ID", out _RowCount);
                #region Calculate Quantity
                decimal _Quantity = 1;
                if (objCvwChargeTypes.lstCVarvwChargeTypes[0].MeasurementCode.Trim() == "GRWT")
                    _Quantity = objCvwOperations.lstCVarvwOperations[0].GrossWeightSum;
                else if (objCvwChargeTypes.lstCVarvwChargeTypes[0].MeasurementCode.Trim() == "CHWT")
                    _Quantity = objCvwOperations.lstCVarvwOperations[0].ChargeableWeightSum;
                else if (objCvwChargeTypes.lstCVarvwChargeTypes[0].MeasurementCode.Trim() == "VOLU")
                    _Quantity = objCvwOperations.lstCVarvwOperations[0].VolumeSum;
                else if (objCvwChargeTypes.lstCVarvwChargeTypes[0].MeasurementCode.Trim() == "BTEU")
                    _Quantity = objCvwOperations.lstCVarvwOperations[0].TEUs;
                else if (objCvwChargeTypes.lstCVarvwChargeTypes[0].MeasurementCode.Trim() == "BCNT")
                {
                    COperationContainersAndPackages objCOperationContainersAndPackages = new COperationContainersAndPackages();

                    #region include the container type in criteria if generated from quotation
                    CQuotationCharges objCQuotationCharges = new CQuotationCharges();
                    string containerTypeWhereClause = "";
                    checkException = objCQuotationCharges.GetListPaging(1, 1, "WHERE QuotationRouteID=" + objCReceivables.lstCVarReceivables[i].GeneratingQRID + " AND ContainerTypeID IS NOT NULL AND ChargeTypeID=" + objCReceivables.lstCVarReceivables[i].ChargeTypeID, "ID", out _RowCount);
                    if (objCQuotationCharges.lstCVarQuotationCharges.Count > 0)
                        containerTypeWhereClause = " AND ContainerTypeID=" + objCQuotationCharges.lstCVarQuotationCharges[0].ContainerTypeID;
                    #endregion include the container type in criteria if generated from quotation

                    checkException = objCOperationContainersAndPackages.GetListPaging(999999, 1, "WHERE OperationID=" + pOperationIDToSetReceivablesQuantity_NotStatic + " AND ContainerTypeID IS NOT NULL " + containerTypeWhereClause, "ID", out _RowCount);
                    _Quantity = objCOperationContainersAndPackages.lstCVarOperationContainersAndPackages.Count;
                }
                _Quantity = _Quantity == 0 ? 1 : _Quantity;
                #endregion Calculate Quantity
                #region ensure receivables are correct
                string pUpdateClause = "";
                pUpdateClause = "Quantity=" + _Quantity + " \n";
                pUpdateClause += " , AmountWithoutVAT = ROUND((ISNULL(SalePrice, 0) * " + _Quantity + "),2)" + " \n";
                pUpdateClause += " , TaxPercentage = (select TT.CurrentPercentage FROM TaxeTypes TT WHERE TT.ID = TaxeTypeID)" + " \n";
                pUpdateClause += " , TaxAmount = ROUND((ISNULL(SalePrice, 0) * " + _Quantity + ") * (select TT.CurrentPercentage/100 FROM TaxeTypes TT WHERE TT.ID = TaxeTypeID), 2)" + " \n";
                pUpdateClause += " , DiscountPercentage = (select TT.CurrentPercentage FROM TaxeTypes TT WHERE TT.ID = DiscountTypeID)" + " \n";
                pUpdateClause += " , DiscountAmount = ROUND((ISNULL(SalePrice, 0) * " + _Quantity + ") * (select TT.CurrentPercentage/100 FROM TaxeTypes TT WHERE TT.ID = DiscountTypeID),2)" + " \n";
                pUpdateClause += " , SaleAmount = ROUND((ISNULL(SalePrice, 0) * " + _Quantity + "),2)" + " \n"
                              + " + (ROUND((ISNULL(SalePrice, 0) * " + _Quantity + ") * ISNULL((select ISNULL(TT.CurrentPercentage / 100, 0) FROM TaxeTypes TT WHERE TT.ID = TaxeTypeID),0) , 2))" + " \n"
                              + " - (ROUND((ISNULL(SalePrice, 0) * " + _Quantity + ") * ISNULL((select ISNULL(TT.CurrentPercentage / 100, 0) FROM TaxeTypes TT WHERE TT.ID = DiscountTypeID),0), 2))" + " \n";
                pUpdateClause += " WHERE ID=" + objCReceivables.lstCVarReceivables[i].ID;
                #endregion ensure receivables are correct

                checkException = objCReceivables.UpdateList(pUpdateClause);
            } //for (int i=0;i<objCReceivables.lstCVarReceivables.Count;i++)

            return new object[] { _ReturnedMessage };
        }

        [HttpGet, HttpPost]
        public object[] ChargeTypes_SetDefaultPayablesQuantity_NotStatic(Int64 pOperationIDToSetPayablesQuantity_NotStatic)
        {
            string _ReturnedMessage = "";
            Exception checkException = null;
            int _RowCount = 0;
            CvwChargeTypes objCvwChargeTypes = new CvwChargeTypes();
            CvwOperations objCvwOperations = new CvwOperations();
            CPayables objCPayables = new CPayables();
            checkException = objCvwOperations.GetListPaging(1, 1, "WHERE ID=" + pOperationIDToSetPayablesQuantity_NotStatic, "ID", out _RowCount);
            checkException = objCPayables.GetListPaging(999999, 1, "WHERE OperationID=" + pOperationIDToSetPayablesQuantity_NotStatic + " AND IsApproved=0 AND IsDeleted=0", "ID", out _RowCount);
            for (int i = 0; i < objCPayables.lstCVarPayables.Count; i++)
            {
                checkException = objCvwChargeTypes.GetListPaging(1, 1, "WHERE ID=" + objCPayables.lstCVarPayables[i].ChargeTypeID, "ID", out _RowCount);
                #region Calculate Quantity
                decimal _Quantity = 1;
                if (objCvwChargeTypes.lstCVarvwChargeTypes[0].MeasurementCode.Trim() == "GRWT")
                    _Quantity = objCvwOperations.lstCVarvwOperations[0].GrossWeightSum;
                else if (objCvwChargeTypes.lstCVarvwChargeTypes[0].MeasurementCode.Trim() == "CHWT")
                    _Quantity = objCvwOperations.lstCVarvwOperations[0].ChargeableWeightSum;
                else if (objCvwChargeTypes.lstCVarvwChargeTypes[0].MeasurementCode.Trim() == "VOLU")
                    _Quantity = objCvwOperations.lstCVarvwOperations[0].VolumeSum;
                else if (objCvwChargeTypes.lstCVarvwChargeTypes[0].MeasurementCode.Trim() == "BTEU")
                    _Quantity = objCvwOperations.lstCVarvwOperations[0].TEUs;
                else if (objCvwChargeTypes.lstCVarvwChargeTypes[0].MeasurementCode.Trim() == "BCNT")
                {
                    COperationContainersAndPackages objCOperationContainersAndPackages = new COperationContainersAndPackages();

                    #region include the container type in criteria if generated from quotation
                    CQuotationCharges objCQuotationCharges = new CQuotationCharges();
                    string containerTypeWhereClause = "";
                    checkException = objCQuotationCharges.GetListPaging(1, 1, "WHERE QuotationRouteID=" + objCPayables.lstCVarPayables[i].GeneratingQRID + " AND ContainerTypeID IS NOT NULL AND ChargeTypeID=" + objCPayables.lstCVarPayables[i].ChargeTypeID, "ID", out _RowCount);
                    if (objCQuotationCharges.lstCVarQuotationCharges.Count > 0)
                        containerTypeWhereClause = " AND ContainerTypeID=" + objCQuotationCharges.lstCVarQuotationCharges[0].ContainerTypeID;
                    #endregion include the container type in criteria if generated from quotation

                    checkException = objCOperationContainersAndPackages.GetListPaging(999999, 1, "WHERE OperationID=" + pOperationIDToSetPayablesQuantity_NotStatic + " AND ContainerTypeID IS NOT NULL " + containerTypeWhereClause, "ID", out _RowCount);
                    _Quantity = objCOperationContainersAndPackages.lstCVarOperationContainersAndPackages.Count;
                }
                _Quantity = _Quantity == 0 ? 1 : _Quantity;
                #endregion Calculate Quantity
                #region ensure Payables are correct
                string pUpdateClause = "";
                pUpdateClause = "Quantity=" + _Quantity + " \n";
                pUpdateClause += " , AmountWithoutVAT = ROUND((ISNULL(CostPrice, 0) * " + _Quantity + "),2)" + " \n";
                pUpdateClause += " , TaxPercentage = (select TT.CurrentPercentage FROM TaxeTypes TT WHERE TT.ID = TaxTypeID)" + " \n";
                pUpdateClause += " , TaxAmount = ROUND((ISNULL(CostPrice, 0) * " + _Quantity + ") * (select TT.CurrentPercentage/100 FROM TaxeTypes TT WHERE TT.ID = TaxTypeID), 2)" + " \n";
                pUpdateClause += " , DiscountPercentage = (select TT.CurrentPercentage FROM TaxeTypes TT WHERE TT.ID = DiscountTypeID)" + " \n";
                pUpdateClause += " , DiscountAmount = ROUND((ISNULL(CostPrice, 0) * " + _Quantity + ") * (select TT.CurrentPercentage/100 FROM TaxeTypes TT WHERE TT.ID = DiscountTypeID),2)" + " \n";
                pUpdateClause += " , CostAmount = ROUND((ISNULL(CostPrice, 0) * " + _Quantity + "),2)" + " \n"
                              + " + (ROUND((ISNULL(CostPrice, 0) * " + _Quantity + ") * ISNULL((select ISNULL(TT.CurrentPercentage / 100, 0) FROM TaxeTypes TT WHERE TT.ID = TaxTypeID),0) , 2))" + " \n"
                              + " - (ROUND((ISNULL(CostPrice, 0) * " + _Quantity + ") * ISNULL((select ISNULL(TT.CurrentPercentage / 100, 0) FROM TaxeTypes TT WHERE TT.ID = DiscountTypeID),0), 2))" + " \n";
                pUpdateClause += " WHERE ID=" + objCPayables.lstCVarPayables[i].ID;
                #endregion ensure Payables are correct

                checkException = objCPayables.UpdateList(pUpdateClause);
            } //for (int i=0;i<objCPayables.lstCVarPayables.Count;i++)

            return new object[] { _ReturnedMessage };
        }


        [HttpGet, HttpPost]
        public object[] InsertListFromExcel_ChargeTypes([FromBody] InsertListFromExcel_ChargeTypes InsertListFromExcel_ChargeTypes)
        {
            string pReturnedMessage = "";
            Exception checkException = null;
            int _NumberOfRows = InsertListFromExcel_ChargeTypes.pNameList.Split(',').Length;
            var _ArrName = InsertListFromExcel_ChargeTypes.pNameList.Split(',');
            var _ArrLocalName = InsertListFromExcel_ChargeTypes.pLocalNameList.Split(',');
            var _ArrCode = InsertListFromExcel_ChargeTypes.pCodeList.Split(',');
            var _ArrPreCode = InsertListFromExcel_ChargeTypes.pPreCodeList.Split(',');

            var _ArrAccountID_RevenueList = InsertListFromExcel_ChargeTypes.pAccountID_RevenueList.Split(',');
            var _ArrSubAccountID_RevenueList = InsertListFromExcel_ChargeTypes.pSubAccountID_RevenueList.Split(',');

            var _ArrAccountID_ExpenseList = InsertListFromExcel_ChargeTypes.pAccountID_ExpenseList.Split(',');
            var _ArrSubAccountID_ExpenseList = InsertListFromExcel_ChargeTypes.pSubAccountID_ExpenseList.Split(',');



            var _ArrAccountID_RevenueListCopy = new string[_NumberOfRows];
            var _ArrSubAccountID_RevenueListCopy = new string[_NumberOfRows];
            var _ArrAccountID_ExpenseListCopy = new string[_NumberOfRows];
            var _ArrSubAccountID_ExpenseListCopy = new string[_NumberOfRows];

            _ArrAccountID_RevenueList.CopyTo(_ArrAccountID_RevenueListCopy, 0);
            _ArrSubAccountID_RevenueList.CopyTo(_ArrSubAccountID_RevenueListCopy,0);
            _ArrAccountID_ExpenseList.CopyTo(_ArrAccountID_ExpenseListCopy, 0);
            _ArrSubAccountID_ExpenseList.CopyTo(_ArrSubAccountID_ExpenseListCopy, 0);

  
            //= _ArrAccountID_RevenueList.CopyTo(;
            // var _ArrSubAccountID_RevenueListCopy = _ArrSubAccountID_RevenueList;
            // var _ArrAccountID_ExpenseListCopy = _ArrAccountID_ExpenseList;
            // var _ArrSubAccountID_ExpenseListCopy = _ArrSubAccountID_ExpenseList;

            //Check Accounts
            for (int i = 0; i < _NumberOfRows; i++)
            {
                CA_Accounts objCA_Accounts = new CA_Accounts();
                CA_SubAccounts objCA_SubAccounts = new CA_SubAccounts();
                CA_SubAccounts_Details objCA_SubAccounts_Details = new CA_SubAccounts_Details();

                /////////Revenue Acc
                if (_ArrAccountID_RevenueList[i] != "0" && _ArrAccountID_RevenueList[i] != null)
                {
                    objCA_Accounts.GetList("Where Account_Name =N'" + _ArrAccountID_RevenueList[i] + "'");
                    if (objCA_Accounts.lstCVarA_Accounts.Count == 0)
                    {
                        pReturnedMessage = " Account Not Exist : " + _ArrAccountID_RevenueList[i];
                        break;
                    }
                    else
                        _ArrAccountID_RevenueListCopy[i] = objCA_Accounts.lstCVarA_Accounts[0].ID.ToString();

                }


                if(_ArrSubAccountID_RevenueList[i] != "0")
                {
                    objCA_SubAccounts.GetList("Where SubAccount_Name =N'" + _ArrSubAccountID_RevenueList[i] + "'");
                    if (objCA_SubAccounts.lstCVarA_SubAccounts.Count == 0)
                    {
                        pReturnedMessage = " SubAccount Not Exist : " + _ArrSubAccountID_RevenueList[i];
                        break;
                    }
                    else
                        _ArrSubAccountID_RevenueListCopy[i] = objCA_SubAccounts.lstCVarA_SubAccounts[0].ID.ToString();

                    if(_ArrAccountID_RevenueList[i] == "0")
                    {
                        pReturnedMessage = "Account Must Be Inserted For SubAccount  : " + _ArrSubAccountID_RevenueList[i];
                        break;
                    }

                    objCA_SubAccounts_Details.GetList("Where SubAccount_ID= " + _ArrSubAccountID_RevenueListCopy[i] + " And Account_ID=" + _ArrAccountID_RevenueListCopy[i]);
                    if(objCA_SubAccounts_Details.lstCVarA_SubAccounts_Details.Count == 0)
                    {
                        pReturnedMessage = "Account "  + _ArrAccountID_RevenueList[i] +  "Must Be Linked With SubAccount  : " + _ArrSubAccountID_RevenueList[i];
                        break;
                    }
                   
                }
                else
                {
                    if (_ArrAccountID_RevenueList[i] != "0")
                    {
                        objCA_SubAccounts_Details.GetList("Where  Account_ID=" + _ArrAccountID_RevenueListCopy[i]);
                        if (objCA_SubAccounts_Details.lstCVarA_SubAccounts_Details.Count > 0)
                        {
                            pReturnedMessage = "Account " + _ArrAccountID_RevenueList[i] + "Must Be Linked With SubAccount  ";
                            break;
                        }
                    }

                }

                /////////Expense Acc

                if (_ArrAccountID_ExpenseList[i] != "0")
                {
                    objCA_Accounts.GetList("Where Account_Name =N'" + _ArrAccountID_ExpenseList[i] + "'");
                    if (objCA_Accounts.lstCVarA_Accounts.Count == 0)
                    {
                        pReturnedMessage = " Account Not Exist : " + _ArrAccountID_ExpenseList[i];
                        break;
                    }
                    else
                        _ArrAccountID_ExpenseListCopy[i] = objCA_Accounts.lstCVarA_Accounts[0].ID.ToString();

                }


                if (_ArrSubAccountID_ExpenseList[i] != "0")
                {
                    objCA_SubAccounts.GetList("Where SubAccount_Name =N'" + _ArrSubAccountID_ExpenseList[i] + "'");
                    if (objCA_SubAccounts.lstCVarA_SubAccounts.Count == 0)
                    {
                        pReturnedMessage = " SubAccount Not Exist : " + _ArrSubAccountID_ExpenseList[i];
                        break;
                    }
                    else
                        _ArrSubAccountID_ExpenseListCopy[i] = objCA_SubAccounts.lstCVarA_SubAccounts[0].ID.ToString();

                    if (_ArrAccountID_ExpenseList[i] == "0")
                    {
                        pReturnedMessage = "Account Must Be Inserted For SubAccount  : " + _ArrSubAccountID_ExpenseList[i];
                        break;
                    }

                    objCA_SubAccounts_Details.GetList("Where SubAccount_ID= " + _ArrSubAccountID_ExpenseListCopy[i] + " And Account_ID=" + _ArrAccountID_ExpenseListCopy[i]);
                    if (objCA_SubAccounts_Details.lstCVarA_SubAccounts_Details.Count == 0)
                    {
                        pReturnedMessage = "Account " + _ArrAccountID_ExpenseList[i] + "Must Be Linked With SubAccount  : " + _ArrSubAccountID_ExpenseList[i];
                        break;
                    }

                }
                else
                {
                    if (_ArrAccountID_ExpenseList[i] != "0")
                    {
                        objCA_SubAccounts_Details.GetList("Where  Account_ID=" + _ArrAccountID_ExpenseListCopy[i]);
                        if (objCA_SubAccounts_Details.lstCVarA_SubAccounts_Details.Count > 0)
                        {
                            pReturnedMessage = "Account " + _ArrAccountID_ExpenseList[i] + "Must Be Linked With SubAccount   ";
                            break;
                        }
                    }

                }
            }

            if (pReturnedMessage == "")
            {
                for (int i = 0; i < _NumberOfRows; i++)
                {
                    CVarChargeTypes objCVarChargeTypes = new CVarChargeTypes();
                    //objCVarChargeTypes.TareWeight = decimal.Parse(_ArrTareWeight[i]);


                    objCVarChargeTypes.MeasurementID = 0;
                    objCVarChargeTypes.InvoiceTypeID = 0;
                    objCVarChargeTypes.TaxeTypeID = 0;

                    objCVarChargeTypes.PreCode = _ArrPreCode[i];
                    objCVarChargeTypes.Code = _ArrCode[i];
                    objCVarChargeTypes.Name = _ArrName[i];
                    objCVarChargeTypes.LocalName = _ArrLocalName[i];
                    objCVarChargeTypes.IsInactive = false;
                    objCVarChargeTypes.Notes = "";

                    objCVarChargeTypes.ViewOrder = 00;
                    objCVarChargeTypes.IsAddedManually = false;
                    objCVarChargeTypes.IsUsedInPayable = true;
                    objCVarChargeTypes.IsUsedInReceivable = true;
                    objCVarChargeTypes.IsTank = false;
                    objCVarChargeTypes.IsOcean = true;
                    objCVarChargeTypes.IsInland = true;
                    objCVarChargeTypes.IsAir = true;
                    objCVarChargeTypes.IsDefaultInQuotation = false;
                    objCVarChargeTypes.IsDefaultInOperations = false;
                    objCVarChargeTypes.IsGeneralChargeType = true;
                    objCVarChargeTypes.IsWarehouseChargeType = false;
                    objCVarChargeTypes.IsOperationChargeType = true;
                    objCVarChargeTypes.IsOfficial = false;

                    objCVarChargeTypes.AccountID_Return = 0;
                    objCVarChargeTypes.SubAccountID_Return = 0;
                    objCVarChargeTypes.AccountID_Revenue = Convert.ToInt32( _ArrAccountID_RevenueListCopy[i] );
                    objCVarChargeTypes.SubAccountID_Revenue = Convert.ToInt32(_ArrSubAccountID_RevenueListCopy[i]);
                    objCVarChargeTypes.CostCenterID_Revenue = 0;
                    objCVarChargeTypes.AccountID_Expense = Convert.ToInt32(_ArrAccountID_ExpenseListCopy[i]);
                    objCVarChargeTypes.SubAccountID_Expense = Convert.ToInt32(_ArrSubAccountID_ExpenseListCopy[i]);
                    objCVarChargeTypes.CostCenterID_Expense = 0;

                    objCVarChargeTypes.TemplateID = 0;
                    objCVarChargeTypes.ChargeTypeGroupID = 0;
                    objCVarChargeTypes.PurchaseItemID = 0;

                    objCVarChargeTypes.Cost = 0;
                    objCVarChargeTypes.IsDirectOperation = true;
                    objCVarChargeTypes.IsMasterOperation = true;

                    objCVarChargeTypes.TimeLocked = DateTime.Parse("01-01-1900");
                    objCVarChargeTypes.LockingUserID = 0;

                    objCVarChargeTypes.CreatorUserID = objCVarChargeTypes.ModificatorUserID = WebSecurity.CurrentUserId;
                    objCVarChargeTypes.CreationDate = objCVarChargeTypes.ModificationDate = DateTime.Now;

                    objCVarChargeTypes.crmCode = "";
                    objCVarChargeTypes.FreightGroupID = 0;
                    objCVarChargeTypes.IsDisbersment = false;
                    objCVarChargeTypes.CostTaxID = 0;
                    objCVarChargeTypes.ItemCategoryID = 0;

                    CChargeTypes objCChargeTypes = new CChargeTypes();
                    objCChargeTypes.lstCVarChargeTypes.Add(objCVarChargeTypes);
                    checkException = objCChargeTypes.SaveMethod(objCChargeTypes.lstCVarChargeTypes);

                    if (checkException != null)
                    {
                        pReturnedMessage += "Row " + (i + 1) + " - " + checkException.Message + " \n";
                    }
                }

            }
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                pReturnedMessage
            };
        }

        [HttpGet]
        public object[] LoadAccounts(int pChargeTypeID)
        {
            int _rowCount = 0;
            CvwChargeTypeAccounts objCvwChargeTypeAccounts = new CvwChargeTypeAccounts();
            objCvwChargeTypeAccounts.GetListPaging(99999, 1, "WHERE ChargeTypeID = " + pChargeTypeID, "ID", out _rowCount);
            var serializer = new JavaScriptSerializer { MaxJsonLength = int.MaxValue };
            return new object[]
            {
                serializer.Serialize(objCvwChargeTypeAccounts.lstCVarvwChargeTypeAccounts)
            };
        }

        [HttpGet]
        public object[] InsertChargeTypesTarrif(int pID , int pChargeTypeID,int pContainerTypeID,decimal pRate )
        {
            int _rowCount = 0;
            string _MessageReturned = "";
            string updateClause = "";
            Exception checkException = null;
            CChargeTypesTarrif objCChargeTypesTarrif = new CChargeTypesTarrif();
            CVarChargeTypesTarrif objCVarChargeTypesTarrif = new CVarChargeTypesTarrif();

            if (pID == 0)
            {
                objCVarChargeTypesTarrif.ID = 0;
                objCVarChargeTypesTarrif.ChargeTypeID = pChargeTypeID;
                objCVarChargeTypesTarrif.ContainerTypeID = pContainerTypeID;
                objCVarChargeTypesTarrif.Rate = pRate;
                objCVarChargeTypesTarrif.CreationDate = objCVarChargeTypesTarrif.ModificationDate = DateTime.Now;
                objCVarChargeTypesTarrif.CreatorUserID = objCVarChargeTypesTarrif.ModificatorUserID = WebSecurity.CurrentUserId;
                objCChargeTypesTarrif.lstCVarChargeTypesTarrif.Add(objCVarChargeTypesTarrif);
                checkException = objCChargeTypesTarrif.SaveMethod(objCChargeTypesTarrif.lstCVarChargeTypesTarrif);
            }
            else
            {

                    updateClause += "   ContainerTypeID = " + pContainerTypeID;
                    updateClause += "  ,Rate = " + pRate;
                    updateClause += " , ModificatorUserID = " + WebSecurity.CurrentUserId.ToString();
                    updateClause += " , ModificationDate = GETDATE() ";

                    updateClause += " WHERE ID = " + pID.ToString();
                    checkException = objCChargeTypesTarrif.UpdateList(updateClause);

            }

            if (checkException != null)
                _MessageReturned = checkException.Message;
                
            CvwChargeTypesTarrif objCvwChargeTypesTarrif = new CvwChargeTypesTarrif();
            objCvwChargeTypesTarrif.GetListPaging(99999, 1, "WHERE ChargeTypeID = " + pChargeTypeID, "ID", out _rowCount);

            var serializer = new JavaScriptSerializer { MaxJsonLength = int.MaxValue };
            return new object[]
            {
                _MessageReturned,
                serializer.Serialize(objCvwChargeTypesTarrif.lstCVarvwChargeTypesTarrif)
            };
        }
        [HttpGet, HttpPost]
        public bool DeleteChargeTypesTarrif(String pChargeTypesIDs)
        {
            bool _result = false;
            CChargeTypesTarrif objCChargeTypesTarrif = new CChargeTypesTarrif();

            Exception checkException = null;

            int _RowCount = 0;
            CvwDefaults objCvwDefaults = new CvwDefaults();
            objCvwDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount);
            string CompanyName = objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName;

            foreach (var currentID in pChargeTypesIDs.Split(','))
            {
                objCChargeTypesTarrif.lstDeletedCPKChargeTypesTarrif.Add(new CPKChargeTypesTarrif() { ID = Int32.Parse(currentID.Trim()) });
            }
            checkException = objCChargeTypesTarrif.DeleteItem(objCChargeTypesTarrif.lstDeletedCPKChargeTypesTarrif);
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
        public object[] LoadChargeTypesTarrif(int pChargeTypeID)
        {
            int _rowCount = 0;
            CvwChargeTypesTarrif objCvwChargeTypesTarrif = new CvwChargeTypesTarrif();
            objCvwChargeTypesTarrif.GetListPaging(99999, 1, "WHERE ChargeTypeID = " + pChargeTypeID, "ID", out _rowCount);
            var serializer = new JavaScriptSerializer { MaxJsonLength = int.MaxValue };
            return new object[]
            {
                serializer.Serialize(objCvwChargeTypesTarrif.lstCVarvwChargeTypesTarrif)
            };
        }

        [HttpGet]
        public object[] LoadItemCategories(bool pDummy)
        {
            CItemCategories objCItemCategories = new CItemCategories();
            objCItemCategories.GetList("WHERE 1=1");

            var serializer = new JavaScriptSerializer { MaxJsonLength = int.MaxValue };
            return new object[]
            {
                serializer.Serialize(objCItemCategories.lstCVarItemCategories)
            };
        }
    }

    public class InsertListFromExcel_ChargeTypes
    {
        public string pNameList { get; set; }
        public string pLocalNameList { get; set; }
        public string pCodeList { get; set; }
        public string pPreCodeList { get; set; }

        public string pAccountID_RevenueList { get; set; }
        public string pSubAccountID_RevenueList { get; set; }
        public string pAccountID_ExpenseList { get; set; }
        public string pSubAccountID_ExpenseList { get; set; }

    }

    public class ChargeTypeAccountsDetails
    {
         public int pServiceID { get; set; }
         public int pDirectionID { get; set; }
         public bool pIsOfficialDetails { get; set; }
         public int pRevenueAccountID { get; set; }
         public int pRevenueSubAccountID { get; set; }
         public int pRevenueCostCenterID { get; set; }
         public int pExpenseAccountID { get; set; }
         public int pExpenseSubAccountID { get; set; }
         public int pExpenseCostCenterID { get; set; }
         public int pStorageLocationID { get; set; }
         public int pCategoryID { get; set; }
    }

    public class UpdateDTO
    {
        public int pID { get; set; }
        public int pMeasurementID { get; set; }
        public int pTaxeTypeID { get; set; }
        public int pInvoiceTypeID { get; set; }
        public string pCode { get; set; }
        public string pPreCode { get; set; }
        public string pName { get; set; }
        public string pLocalName { get; set; }
        public int pViewOrder { get; set; }
        public string pNotes { get; set; }
        public bool pIsUsedInReceivable { get; set; }
        public bool pIsUsedInPayable { get; set; }
        public bool pIsTank { get; set; }
        public bool pIsOcean { get; set; }
        public bool pIsAir { get; set; }
        public bool pIsInland { get; set; }
        public bool pIsDefaultInQuotation { get; set; }
        public bool pIsDefaultInOperations { get; set; }
        public bool pIsInactive { get; set; }
        public bool pIsGeneralChargeType { get; set; }
        public bool pIsWarehouseChargeType { get; set; }
        public bool pIsOperationChargeType { get; set; }
        public bool pIsOfficial { get; set; }
        public int pAccountID_Return { get; set; }
        public int pSubAccountID_Return { get; set; }
        public int pAccountID_Revenue { get; set; }
        public int pSubAccountID_Revenue { get; set; }
        public int pCostCenterID_Revenue { get; set; }
        public int pAccountID_Expense { get; set; }
        public int pSubAccountID_Expense { get; set; }
        public int pCostCenterID_Expense { get; set; }
        public int pTemplateID { get; set; }
        public int pChargeTypeGroupID { get; set; }
        public int pPurchaseItemID { get; set; }
        public decimal pCost { get; set; }
        public bool pIsDirectOperation { get; set; }
        public bool pIsMasterOperation { get; set; }
        public List<ChargeTypeAccountsDetails> ChargeTypeAccountsDetails { get; set; }

        public int pCurrencyID { get; set; }
        public int pFreightGroupID { get; set; }
        public int pCostTaxID { get; set; } = 0;
        public int pItemCategoryID { get; set; } = 0;
        public bool pIsDisbersment { get; set; } = false;
    }
}
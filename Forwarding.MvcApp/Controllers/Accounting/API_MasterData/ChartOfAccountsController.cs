using Forwarding.MvcApp.Models.Accounting.MasterData.Generated;
using Forwarding.MvcApp.Models.Accounting.Transactions.Generated;
using Forwarding.MvcApp.Models.Administration.Security.Generated;
using Forwarding.MvcApp.Models.Administration.Settings.Generated;
using Forwarding.MvcApp.Models.Customized;
using Forwarding.MvcApp.Models.MasterData.Invoicing.Generated;
using Forwarding.MvcApp.Models.NoAccess.Generated;
using Forwarding.MvcApp.Models.Warehousing.MasterData.Generated;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;

namespace Forwarding.MvcApp.Controllers.Accounting.API_MasterData
{
    public class ChartOfAccountsController : ApiController
    {

        [HttpGet, HttpPost]
        public object[] LoadAll(string pLanguage, string pWhereClause, string pOrderBy)
        {
            Exception checkException = null;
            CvwA_Accounts objCvwA_Accounts = new CvwA_Accounts();
            checkException = objCvwA_Accounts.GetList(pWhereClause + " ORDER BY" + pOrderBy);
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };

            return new object[] {
                serializer.Serialize(objCvwA_Accounts.lstCVarvwA_Accounts)
            };
        }

        [HttpGet, HttpPost]
        public Object[] LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned(
            bool pIsLoadArrayOfObjects, string pLanguage, Int32 pPageNumber, Int32 pPageSize, string pWhereClause, string pOrderBy)
        {
            int _RowCount = 0;
            Exception checkException = null;
            CvwA_CostCenters objCvwA_CostCenters = new CvwA_CostCenters();

            CvwA_Accounts objCvwA_Accounts = new CvwA_Accounts();
   


            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
            List<CVarvwA_CostCenters> ActivitiesList = null;


            CSystemOptions objCSystemOptions = new CSystemOptions();
            objCSystemOptions.GetList(" Where OptionID=201");
            if (objCSystemOptions.lstCVarSystemOptions.Count > 0 && objCSystemOptions.lstCVarSystemOptions[0].OptionValue
                && !pWhereClause.Contains("AccLevel") )
            {
                string pActivityID = objCCustomizedDBCall.CallStringFunction("select ActivityID from NoAccessActivities where SystemName = 'Forwarding'");
                string pSearchWord = "";
                ActivitiesList = objCCustomizedDBCall.ExecuteQuery_ListOfObjects(
                   @"A_LoadCostCenterByActivityAndUser " + WebSecurity.CurrentUserId + "," + pActivityID + ",'" + pSearchWord + "'"
                    , typeof(CVarvwA_CostCenters)).Cast<CVarvwA_CostCenters>().ToList();

                objCvwA_Accounts.GetListPaging(99999, 1, "WHERE IsMain=0 And ID in (select AA.AccountID from  A_Accounts_Activities AA  where ActivityCostCenterID=" + pActivityID + ")"  , "Name, Code", out _RowCount);
                objCvwA_CostCenters.lstCVarvwA_CostCenters = ActivitiesList.ToList();
            }
            else
            {
                checkException = objCvwA_CostCenters.GetListPaging(99999, 1, "Where 1=1", "ID", out _RowCount);
                checkException = objCvwA_Accounts.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);
            }




            CvwA_SubAccounts objCvwA_ClientGroups = new CvwA_SubAccounts();
            CvwA_SubAccounts objCvwA_SupplierGroups = new CvwA_SubAccounts();
            CvwA_SubAccounts objCvwA_ClientAndSupplierGroups = new CvwA_SubAccounts();
            CvwA_SubAccounts objCvwA_EmployeeGroups = new CvwA_SubAccounts();
            CvwA_SubAccounts objCvwA_ASSETSGroups = new CvwA_SubAccounts();
            CCustomerMasterCreditLimit objCustomerMasterCreditLimit = new CCustomerMasterCreditLimit();
            if (pIsLoadArrayOfObjects)
            {
                CDefaults objCDefaults = new CDefaults();
                objCDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount); //i am sure i ve just one row isa
                string _UnEditableCompanyName = objCDefaults.lstCVarDefaults[0].UnEditableCompanyName;
                if (objCSystemOptions.lstCVarSystemOptions.Count > 0 && objCSystemOptions.lstCVarSystemOptions[0].OptionValue)
                {
                    string pAccountByActivity = "(select SD.SubAccount_ID from  A_Accounts_Activities AA  join A_SubAccounts_Details SD on SD.Account_ID = AA.AccountID where ActivityCostCenterID = (select ActivityID from NoAccessActivities where SystemName = 'Forwarding'))";
                    checkException = objCvwA_ClientGroups.GetListPaging(pPageSize, pPageNumber, "WHERE IsMain=1 AND SUBSTRING(RealSubAccountCode,1,1)='4' AND ID IN  " + pAccountByActivity, pOrderBy, out _RowCount);
                    checkException = objCvwA_SupplierGroups.GetListPaging(pPageSize, pPageNumber, "WHERE IsMain=1 AND SUBSTRING(RealSubAccountCode,1,1)='3' AND ID IN  " + pAccountByActivity, pOrderBy, out _RowCount);
                    checkException = objCvwA_ClientAndSupplierGroups.GetListPaging(pPageSize, pPageNumber, "WHERE IsMain=1 AND (SUBSTRING(RealSubAccountCode,1,1)='3' OR SUBSTRING(RealSubAccountCode,1,2)='04') AND ID IN  " + pAccountByActivity, pOrderBy, out _RowCount);
                    checkException = objCvwA_EmployeeGroups.GetListPaging(pPageSize, pPageNumber, "WHERE IsMain=1 AND SUBSTRING(RealSubAccountCode,1,1)='2' AND ID IN " + pAccountByActivity, pOrderBy, out _RowCount);
                    checkException = objCvwA_ASSETSGroups.GetListPaging(pPageSize, pPageNumber, "WHERE IsMain=1 AND SUBSTRING(RealSubAccountCode,1,1)='1' AND ID IN  " + pAccountByActivity, pOrderBy, out _RowCount);
                }
                else
                {
                    checkException = objCvwA_ClientGroups.GetListPaging(pPageSize, pPageNumber, "WHERE IsMain=1 AND SUBSTRING(RealSubAccountCode,1,1)='4' AND ID IN (SELECT SubAccount_ID from A_SubAccounts_Details) ", pOrderBy, out _RowCount);
                    checkException = objCvwA_SupplierGroups.GetListPaging(pPageSize, pPageNumber, "WHERE IsMain=1 AND SUBSTRING(RealSubAccountCode,1,1)='3' AND ID IN (SELECT SubAccount_ID from A_SubAccounts_Details) ", pOrderBy, out _RowCount);
                    checkException = objCvwA_ClientAndSupplierGroups.GetListPaging(pPageSize, pPageNumber, "WHERE IsMain=1 AND (SUBSTRING(RealSubAccountCode,1,1)='3' OR SUBSTRING(RealSubAccountCode,1,2)='04') AND ID IN (SELECT SubAccount_ID from A_SubAccounts_Details) ", pOrderBy, out _RowCount);
                    checkException = objCvwA_EmployeeGroups.GetListPaging(pPageSize, pPageNumber, "WHERE IsMain=1 AND SUBSTRING(RealSubAccountCode,1,1)='2' AND ID IN (SELECT SubAccount_ID from A_SubAccounts_Details) ", pOrderBy, out _RowCount);
                    checkException = objCvwA_ASSETSGroups.GetListPaging(pPageSize, pPageNumber, "WHERE IsMain=1 AND SUBSTRING(RealSubAccountCode,1,1)='1' AND ID IN (SELECT SubAccount_ID from A_SubAccounts_Details) ", pOrderBy, out _RowCount);
                }

                objCustomerMasterCreditLimit.GetList("WHERE 1=1");

            }
            CPurchaseItem objCPurchaseItem = new CPurchaseItem();
            objCPurchaseItem.GetList("WHERE 1=1");

            CUsers objCUsers = new CUsers();
            objCUsers.GetListPaging(999999, 1, "WHERE id NOT IN(SELECT c.UserID FROM Custody AS c WHERE c.UserID IS NOT null)", "ID", out _RowCount);

            var ServicesList = objCCustomizedDBCall.ExecuteQuery_ListOfObjects("SELECT ID,NAME FROM NoAccessServices", typeof(CVarNoAccessServices)).Cast<CVarNoAccessServices>().ToList();

            var StorageLocationsList = objCCustomizedDBCall.ExecuteQuery_ListOfObjects("SELECT ID,Name FROM WH_Warehouse", typeof(CVarWH_Warehouse)).Cast<CVarWH_Warehouse>().ToList();

            var DirectionList = objCCustomizedDBCall.ExecuteQuery_ListOfObjects("SELECT ID,Name FROM NoAccessDirectionTypes", typeof(cVarNoAccessDirectionTypes)).Cast<cVarNoAccessDirectionTypes>().ToList();

            var CategoriesList = objCCustomizedDBCall.ExecuteQuery_ListOfObjects("SELECT ID,Name FROM ChargeTypeGroup", typeof(CVarChargeTypeGroup)).Cast<CVarChargeTypeGroup>().ToList();

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[] { 
                serializer.Serialize(objCvwA_Accounts.lstCVarvwA_Accounts) 
                , _RowCount
                , serializer.Serialize(objCvwA_CostCenters.lstCVarvwA_CostCenters) //pCostCenter = pData[2]
                , pIsLoadArrayOfObjects ? serializer.Serialize(objCvwA_ClientGroups.lstCVarvwA_SubAccounts) : null //pClientGroup = pData[3]
                , pIsLoadArrayOfObjects ? serializer.Serialize(objCvwA_SupplierGroups.lstCVarvwA_SubAccounts) : null //pSupplierGroup = pData[4]
                , pIsLoadArrayOfObjects ? serializer.Serialize(objCvwA_ClientAndSupplierGroups.lstCVarvwA_SubAccounts) : null //pClientAndSupplierGroup = pData[5]
                , pIsLoadArrayOfObjects ? serializer.Serialize(objCvwA_EmployeeGroups.lstCVarvwA_SubAccounts) : null //pEmployeeGroup = pData[6]
                 , pIsLoadArrayOfObjects ? serializer.Serialize(objCustomerMasterCreditLimit.lstCVarCustomerMasterCreditLimit) : null //pEmployeeGroup = pData[7]
                 ,serializer.Serialize(objCPurchaseItem.lstCVarPurchaseItem)//8
                 ,serializer.Serialize(objCUsers.lstCVarUsers)//9
                , pIsLoadArrayOfObjects ? serializer.Serialize(objCvwA_ASSETSGroups.lstCVarvwA_SubAccounts) : null //pASSETSGroup = pData[10]
                , serializer.Serialize(ServicesList) //11
                , serializer.Serialize(DirectionList) //12
                , serializer.Serialize(StorageLocationsList) //13
                , serializer.Serialize(CategoriesList) //14
            };
        }
        [HttpGet, HttpPost]
        public Object[] GetModalData(Int32 pID)
        {
            int _RowCount = 0;
            Exception checkException = null;
            CA_JVDetails objCA_JVDetails = new CA_JVDetails();
            checkException = objCA_JVDetails.GetListPaging(1, 1, "WHERE Account_ID = " + pID.ToString(), "ID", out _RowCount);
            CA_Accounts objCA_Accounts = new CA_Accounts();
            checkException = objCA_Accounts.GetListPaging(1, 1, "WHERE ID = " + pID.ToString(), "ID", out _RowCount);
            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
            string pNewCode = objCCustomizedDBCall.CallStringFunction("SELECT [dbo].A_Accounts_GetCode(" + (pID == 0 ? "null" : pID.ToString()) + ") AS Code");

            CA_Accounts_Activities objCA_Accounts_Activities = new CA_Accounts_Activities(); //get the selected items if any
            checkException = objCA_Accounts_Activities.GetListPaging(9999, 1, "WHERE AccountID = " + pID.ToString(), "ID", out _RowCount);

            return new object[] {
                pID > 0 ? new JavaScriptSerializer().Serialize(objCA_Accounts.lstCVarA_Accounts[0]) : null //pAccountFields = pData[0] in case of update
                //, objCvwA_Accounts_GetCode.lstCVarvwA_Accounts_GetCode[0].Code //pNewCode = pData[1]
                , pNewCode //pNewCode = pData[1]
                , objCA_JVDetails.lstCVarA_JVDetails.Count //pJVDetailsCount = pData[2]
                ,new JavaScriptSerializer().Serialize(objCA_Accounts_Activities.lstCVarA_Accounts_Activities)// pData[3]
            };
        }

        [HttpGet, HttpPost]
        public Object[] Save(Int32 pID, string pAccount_Number, string pCodeM, string pAccount_Name, string pAccount_EnName
            , Int32 pParent_ID, Int32 pAccLevel, string pRealAccountCode, bool pIsVisible, Int32 pCostCenter_ID ,string pSelectedActivityIDs)
        {
            bool _result = false;
            string pWhereClause = "";
            string pUpdateClause = "";
            CA_Accounts objCA_Accounts = new CA_Accounts();
            CVarA_Accounts objCVarA_Accounts = new CVarA_Accounts();
            Exception checkException = null;
            int _RowCount = 0;
            Int32 IDBefore = pID;
            var ArrSelectedActivityIDs = pSelectedActivityIDs.Split(',');
            #region Insert
            if (pID == 0) //Insert
            {
                objCVarA_Accounts.Account_Number = pAccount_Number;


                objCVarA_Accounts.Code = pCodeM;

                objCVarA_Accounts.Account_Name = pAccount_Name;
                objCVarA_Accounts.Account_EnName = pAccount_EnName;
                objCVarA_Accounts.Parent_ID = pParent_ID;
                objCVarA_Accounts.IsMain = false;
                objCVarA_Accounts.AccLevel = pAccLevel;
                objCVarA_Accounts.RealAccountCode = pRealAccountCode;
                objCVarA_Accounts.IsSub = false;
                objCVarA_Accounts.IsVisible = pIsVisible;
                objCVarA_Accounts.CostCenter_ID = pCostCenter_ID;
                objCVarA_Accounts.User_ID = WebSecurity.CurrentUserId;
                objCVarA_Accounts.CostCenterCalcType = "0";
                objCA_Accounts.lstCVarA_Accounts.Add(objCVarA_Accounts);
                checkException = objCA_Accounts.SaveMethod(objCA_Accounts.lstCVarA_Accounts);
                if (checkException == null)
                {
                    _result = true;
                    pID = objCVarA_Accounts.ID;
                    //CallCustomizedSP
                    CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
                    objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "A_Accounts", pID, "I");
                    //Set Parent.IsMain=true
                    objCA_Accounts.UpdateList("IsMain=1 WHERE ID=" + pParent_ID.ToString());
                    pWhereClause = "WHERE AccLevel=" + pAccLevel + (pParent_ID != 0 ? (" AND Parent_ID=" + pParent_ID) : "");
                    objCA_Accounts.GetListPaging(9999, 1, pWhereClause, "ID", out _RowCount);

                    if (pSelectedActivityIDs != "0")
                    {
                        CA_Accounts_Activities objCA_Accounts_Activities = new CA_Accounts_Activities();
                        for (int i = 0; i < ArrSelectedActivityIDs.Length; i++)
                        {
                            CVarA_Accounts_Activities objCVarA_Accounts_Activities = new CVarA_Accounts_Activities();
                            objCVarA_Accounts_Activities.AccountID = objCVarA_Accounts.ID;
                            objCVarA_Accounts_Activities.ActivityCostCenterID = Convert.ToInt32(ArrSelectedActivityIDs[i]);
                            objCA_Accounts_Activities.lstCVarA_Accounts_Activities.Add(objCVarA_Accounts_Activities);
                        }
                        objCA_Accounts_Activities.SaveMethod(objCA_Accounts_Activities.lstCVarA_Accounts_Activities);
                    }
              
              }
            }
            #endregion Insert
            #region Update
            else //Update
            {
                pUpdateClause = "Account_Name=N'" + pAccount_Name + "'" + "\n";
                pUpdateClause += ",Account_EnName=N'" + pAccount_EnName + "'" + "\n";

                pUpdateClause += ",Code=" + (pCodeM == "0" ? "null" : "'" + pCodeM.ToString() + "'") + "\n";
                pUpdateClause += ",IsVisible='" + (pIsVisible ? "1" : "0") + "'" + "\n";
                pUpdateClause += ",CostCenter_ID=" + (pCostCenter_ID == 0 ? "null" : pCostCenter_ID.ToString()) + "\n";
                pUpdateClause += "WHERE ID=" + pID + "\n";
                checkException = objCA_Accounts.UpdateList(pUpdateClause);
                if (checkException == null)
                {
                    _result = true;
                    //CallCustomizedSP
                    CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
                    objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "A_Accounts", Int64.Parse(pID.ToString()), "U");
                    pWhereClause = "WHERE ID=" + pID;
                    objCA_Accounts.GetListPaging(9999, 1, pWhereClause, "Account_Number", out _RowCount);


                        if (pSelectedActivityIDs != "0")
                        {
                            CA_Accounts_Activities objCA_Accounts_Activities = new CA_Accounts_Activities();

                            // Pull everything that already exists for this account
                            objCA_Accounts_Activities.GetList("WHERE AccountID = " + pID);

                            // Build a fast‑lookup set of the existing ActivityCostCenterIDs
                            HashSet<int> existingIDs = objCA_Accounts_Activities.lstCVarA_Accounts_Activities
                                .Select(a => a.ActivityCostCenterID)
                                .ToHashSet();

                        HashSet<int> selectedIDs = ArrSelectedActivityIDs
                            .Select(idStr => int.TryParse(idStr, out int id) ? id : (int?)null)
                            .Where(id => id.HasValue)
                            .Select(id => id.Value)
                            .ToHashSet();

                        // Collect only NEW rows
                        foreach (string idStr in ArrSelectedActivityIDs)
                            {
                                if (!int.TryParse(idStr, out int activityID))          // bad data → skip
                                    continue;

                                if (existingIDs.Contains(activityID))                  // already there → skip
                                    continue;

                                var objCVarA_Accounts_Activities = new CVarA_Accounts_Activities
                                {
                                    AccountID = pID,
                                    ActivityCostCenterID = activityID
                                };
                                objCA_Accounts_Activities.lstCVarA_Accounts_Activities.Add(objCVarA_Accounts_Activities);
                            }

                            // Save only if we actually added something new
                            if (objCA_Accounts_Activities.lstCVarA_Accounts_Activities.Any())
                                objCA_Accounts_Activities.SaveMethod(objCA_Accounts_Activities.lstCVarA_Accounts_Activities);

                        // 2. Delete records that exist in DB but are NOT in the selected list
                                List<int> idsToDelete = existingIDs.Except(selectedIDs).ToList();

                                foreach (int idToDelete in idsToDelete)
                                {
                                    // Adjust this to match your deletion method
                                    CA_Accounts_Activities objToDelete = new CA_Accounts_Activities();
                                  checkException = objToDelete.DeleteList(" Where AccountID = " + pID + " AND ActivityCostCenterID = " + idToDelete);
                                }
                    }


                }
            }
            #endregion Update


            #region Tax
            int _RowCount2 = 0;
            CA_AccountsTAX objCA_AccountsTax = new CA_AccountsTAX();
            CVarA_AccountsTAX objCVarA_AccountsTax = new CVarA_AccountsTAX();
            CvwDefaults objCvwDefaults = new CvwDefaults();
            objCvwDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount2); //i am sure i ve just one row isa
            string CompanyName = objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName;
            CA_AccountsTAX objCA_AccountsTAX2 = new CA_AccountsTAX();
            objCA_AccountsTAX2.GetList("WHERE Account_Name=N'" + pAccount_Name.Trim().ToUpper() + "'");

            CTaxLink objCTaxLinkHeader = new CTaxLink();
            objCTaxLinkHeader.GetList("WHERE Notes='A_Accounts' and OriginID=" + pID);

            if ((CompanyName == "CHM" || CompanyName == "OCE" || CompanyName == "TRM" || CompanyName == "EGL" || CompanyName == "SWI") && checkException == null)
            {
                #region Insert
                if (IDBefore == 0) //Insert
                {
                    objCVarA_AccountsTax.Account_Number = pAccount_Number;


                    objCVarA_AccountsTax.Code = pCodeM;

                    objCVarA_AccountsTax.Account_Name = pAccount_Name;
                    objCVarA_AccountsTax.Account_EnName = pAccount_EnName;
                    objCVarA_AccountsTax.Parent_ID = pParent_ID;
                    objCVarA_AccountsTax.IsMain = false;
                    objCVarA_AccountsTax.AccLevel = pAccLevel;
                    objCVarA_AccountsTax.RealAccountCode = pRealAccountCode;
                    objCVarA_AccountsTax.IsSub = false;
                    objCVarA_AccountsTax.IsVisible = pIsVisible;
                    objCVarA_AccountsTax.CostCenter_ID = pCostCenter_ID;
                    objCVarA_AccountsTax.User_ID = WebSecurity.CurrentUserId;
                    objCVarA_AccountsTax.CostCenterCalcType = "0";
                    objCA_AccountsTax.lstCVarA_Accounts.Add(objCVarA_AccountsTax);
                    checkException = objCA_AccountsTax.SaveMethod(objCA_AccountsTax.lstCVarA_Accounts);
                    if (checkException == null)
                    {
                        _result = true;
                        //pID = objCVarA_AccountsTax.ID;
                        CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();

                        objCCustomizedDBCall.ExecuteQuery_DataTable("insertTaxLink " + objCVarA_Accounts.ID + "," + objCVarA_AccountsTax.ID + "," + "A_Accounts");



                        //CallCustomizedSP
                        objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "A_Accounts", pID, "I");
                        //Set Parent.IsMain=true
                        objCA_AccountsTax.UpdateList("IsMain=1 WHERE ID=" + pParent_ID.ToString());
                        pWhereClause = "WHERE AccLevel=" + pAccLevel + (pParent_ID != 0 ? (" AND Parent_ID=" + pParent_ID) : "");
                        objCA_AccountsTax.GetListPaging(9999, 1, pWhereClause, "ID", out _RowCount);
                    }
                }
                #endregion Insert
                #region Update
                else //Update
                {
                    pUpdateClause = "Account_Name=N'" + pAccount_Name + "'" + "\n";
                    pUpdateClause += ",Account_EnName=N'" + pAccount_EnName + "'" + "\n";

                    pUpdateClause += ",Code=" + (pCodeM == "0" ? "null" : "'" + pCodeM.ToString() + "'") + "\n";
                    pUpdateClause += ",IsVisible='" + (pIsVisible ? "1" : "0") + "'" + "\n";
                    pUpdateClause += ",CostCenter_ID=" + (pCostCenter_ID == 0 ? "null" : pCostCenter_ID.ToString()) + "\n";
                   // pUpdateClause += "WHERE ID=" + pID + "\n";
                    pUpdateClause += "WHERE ID=" + (objCTaxLinkHeader.lstCVarTaxLink.Count > 0 ? objCTaxLinkHeader.lstCVarTaxLink[0].TaxID :pID) + "\n";
                    
                    checkException = objCA_AccountsTax.UpdateList(pUpdateClause);
                    if (checkException == null)
                    {
                        _result = true;
                        //CallCustomizedSP
                        CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
                        objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "A_Accounts", Int64.Parse(pID.ToString()), "U");
                        pWhereClause = "WHERE ID=" + pID;
                        objCA_AccountsTax.GetListPaging(9999, 1, pWhereClause, "Account_Number", out _RowCount);
                    }
                }
                #endregion
            }
            #endregion
            return new object[]
            {
                _result
                , pID
                , new JavaScriptSerializer().Serialize(objCA_Accounts.lstCVarA_Accounts)
            };
            
        }

        [HttpGet, HttpPost]
        public object[] Delete(Int32 pIDToDelete, Int32 pParentID, Int32 pLevel)
        {
            bool _result = false;
            int _RowCount = 0;
            Exception checkException = null;
            CvwDefaults objCvwDefaults = new CvwDefaults();
            objCvwDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount); //i am sure i ve just one row isa
            string CompanyName = objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName;

            CA_AccountsTAX objCA_AccountsTax2 = new CA_AccountsTAX();

            CA_Accounts objCA_AccountsGet = new CA_Accounts();
            checkException = objCA_AccountsGet.GetList("WHERE ID=" + pIDToDelete);

            CA_AccountsTAX objCA_AccountsTaxset = new CA_AccountsTAX();
            objCA_AccountsTaxset.GetList("WHERE Account_Name=N'" + objCA_AccountsGet.lstCVarA_Accounts[0].Account_Name + "'");

            CTaxLink cCTaxLink = new CTaxLink();
            cCTaxLink.GetList("where notes='A_Accounts' and originid=" + pIDToDelete + "order by id desc");

            if (CompanyName == "CHM" || CompanyName == "OCE" || CompanyName == "TRM" || CompanyName == "EGL" || CompanyName == "SWI")
            {
                CA_AccountsTAX objCA_AccountsTax = new CA_AccountsTAX();
                if (cCTaxLink.lstCVarTaxLink.Count > 0 || objCA_AccountsTaxset.lstCVarA_Accounts.Count > 0)
                {
                    


                    checkException = objCA_AccountsTax2.DeleteList("WHERE ID=" + (cCTaxLink.lstCVarTaxLink.Count > 0 ? cCTaxLink.lstCVarTaxLink[0].TaxID :  objCA_AccountsTaxset.lstCVarA_Accounts[0].ID));
                    cCTaxLink.DeleteList("where notes='A_Accounts' and taxid=" + (cCTaxLink.lstCVarTaxLink.Count > 0 ? cCTaxLink.lstCVarTaxLink[0].TaxID :0));

                    if (checkException == null)
                    {
                        _result = true;
                        //CallCustomizedSP
                        CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
                        objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "A_Accounts", objCA_AccountsTaxset.lstCVarA_Accounts[0].ID, "D");
                        if (pParentID != 0)//Update IsMain in Parent if not Root
                        {
                            string pUpdateClause = "";
                            pUpdateClause = " IsMain = Case " + "\n";
                            if (CompanyName == "CHM")
                            {
                                pUpdateClause += " WHEN (SELECT COUNT(ID) FROM ForwardingTransChemTax.dbo.A_Accounts WHERE Parent_ID=" + pParentID.ToString() + ") > 0 THEN CAST(1 AS bit) " + "\n";

                            }
                            else if (CompanyName == "OCE")
                            {
                                pUpdateClause += " WHEN (SELECT COUNT(ID) FROM ForwardingTroTax.dbo.A_Accounts WHERE Parent_ID=" + pParentID.ToString() + ") > 0 THEN CAST(1 AS bit) " + "\n";

                            }
                            else if (CompanyName == "TRM")
                            {
                                pUpdateClause += " WHEN (SELECT COUNT(ID) FROM ForwardingTransChemTax.dbo.A_Accounts WHERE Parent_ID=" + pParentID.ToString() + ") > 0 THEN CAST(1 AS bit) " + "\n";

                            }
                            else if (CompanyName == "EGL")
                            {
                                pUpdateClause += " WHEN (SELECT COUNT(ID) FROM ForwardingEGL2023Tax.dbo.A_Accounts WHERE Parent_ID=" + pParentID.ToString() + ") > 0 THEN CAST(1 AS bit) " + "\n";

                            }
                            else if (CompanyName == "SWI")
                            {
                                pUpdateClause += " WHEN (SELECT COUNT(ID) FROM ForwardingSwiftLogisticsEG2023Tax.dbo.A_Accounts WHERE Parent_ID=" + pParentID.ToString() + ") > 0 THEN CAST(1 AS bit) " + "\n";

                            }
                            pUpdateClause += "            ELSE CAST(0 AS bit) " + "\n";
                            pUpdateClause += "        END " + "\n";
                            pUpdateClause += "WHERE ID=" + pParentID.ToString() + "\n";
                            objCA_AccountsTax.UpdateList(pUpdateClause);
                            string pWhereClause = "WHERE AccLevel=" + pLevel + (pParentID != 0 ? (" AND Parent_ID=" + pParentID) : "");
                            objCA_AccountsTax.GetListPaging(9999, 1, pWhereClause, "ID", out _RowCount);
                        }
                    }
                }
                
            }

            CA_Accounts objCA_Accounts = new CA_Accounts();
            checkException = objCA_Accounts.DeleteList("WHERE ID=" + pIDToDelete);
            if (checkException == null)
            {
                _result = true;
                //CallCustomizedSP
                CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
                objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "A_Accounts", pIDToDelete, "D");
                if (pParentID != 0)//Update IsMain in Parent if not Root
                {
                    string pUpdateClause = "";
                    pUpdateClause = " IsMain = Case " + "\n";
                    pUpdateClause += "            WHEN (SELECT COUNT(ID) FROM A_Accounts WHERE Parent_ID=" + pParentID.ToString() + ") > 0 THEN CAST(1 AS bit) " + "\n";
                    pUpdateClause += "            ELSE CAST(0 AS bit) " + "\n";
                    pUpdateClause += "        END " + "\n";
                    pUpdateClause += "WHERE ID=" + pParentID.ToString() + "\n";
                    objCA_Accounts.UpdateList(pUpdateClause);
                    string pWhereClause = "WHERE AccLevel=" + pLevel + (pParentID != 0 ? (" AND Parent_ID=" + pParentID) : "");
                    objCA_Accounts.GetListPaging(9999, 1, pWhereClause, "ID", out _RowCount);
                }
            }
            return new object[]
            {
                _result
                , new JavaScriptSerializer().Serialize(objCA_Accounts.lstCVarA_Accounts)
            };
        }
    }

    class cVarNoAccessDirectionTypes
    {
        public int ID { get; set; }
        public string Name { get; set; }
    }
}

using Forwarding.MvcApp.Models.Accounting.MasterData.Customized;
using Forwarding.MvcApp.Models.Accounting.MasterData.Generated;
using Forwarding.MvcApp.Models.Fleet_Forwarding_Integration.MasterData.Customized;
using Forwarding.MvcApp.Models.Administration.Security.Generated;
using Forwarding.MvcApp.Models.Administration.Settings.Generated;
using Forwarding.MvcApp.Models.Customized;
using Forwarding.MvcApp.Models.MasterData.Trucking.Generated;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;


namespace Forwarding.MvcApp.Controllers.MasterData.API_Partners
{
    public class TRCK_DriversController : ApiController
    {
        //[Route("/api/TRCK_Drivers/LoadAll")]
        [HttpGet, HttpPost]
        public Object[] LoadAll(string pWhereClause)
        {
            CTRCK_Drivers objCTRCK_Drivers = new CTRCK_Drivers();
            objCTRCK_Drivers.GetList(pWhereClause);
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[] { serializer.Serialize(objCTRCK_Drivers.lstCVarTRCK_Drivers) };
        }
        
        [HttpGet, HttpPost]
        public Object[] LoadWithPaging(Int32 pPageNumber, Int32 pPageSize, string pSearchKey)
        {
            CTRCK_Drivers objCTRCK_Drivers = new CTRCK_Drivers();
            //objCTRCK_Drivers.GetList(string.Empty);
            Int32 _RowCount = 0;// objCTRCK_Drivers.lstCVarTRCK_Drivers.Count;

            //to get the user roleID to show all TRCK_Drivers incase of manager or administrator roles
            // i am sure i ll get only 1 row coz i used ID
            CvwUsers objCUsers = new CvwUsers();
            objCUsers.GetList(" WHERE ID = " + WebSecurity.CurrentUserId.ToString());

            pSearchKey = (pSearchKey == null ? "" : pSearchKey.Trim().ToUpper());
            string whereClause = " Where (Code LIKE N'%" + pSearchKey + "%' "
                + " OR Name LIKE N'%" + pSearchKey + "%' "
                + " OR LocalName LIKE N'%" + pSearchKey + "%') ";
           
            objCTRCK_Drivers.GetListPaging(pPageSize, pPageNumber, whereClause, " Code ", out _RowCount);

            return new Object[] { new JavaScriptSerializer().Serialize(objCTRCK_Drivers.lstCVarTRCK_Drivers), _RowCount };
        }

        [HttpGet, HttpPost]
        public Object[] LoadWithPagingWithWhereClause(Int32 pPageNumber, Int32 pPageSize, string pWhereClause)
        {
            CTRCK_Drivers objCTRCK_Drivers = new CTRCK_Drivers();

            Int32 _RowCount = 0;

            objCTRCK_Drivers.GetListPaging(pPageSize, pPageNumber, pWhereClause, " Code ", out _RowCount);
           
            return new Object[] { new JavaScriptSerializer().Serialize(objCTRCK_Drivers.lstCVarTRCK_Drivers), _RowCount };
        }

        [HttpGet, HttpPost]
        public Object[] LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned(Int32 pPageNumber, Int32 pPageSize, string pWhereClause, string pOrderBy)
        {
            Int32 _RowCount = 0;
            Exception checkException = null;

            CTRCK_Drivers objCTRCK_Drivers = new CTRCK_Drivers();
            checkException = objCTRCK_Drivers.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);
            var pDriverList = objCTRCK_Drivers.lstCVarTRCK_Drivers
                .Select(s => new
                {
                    Name = s.Name
                    ,
                    LicenseExpirationDate = s.LicenseNumberExpireDate.ToShortDateString()
                    ,
                    LicenseExpirationDays = (s.LicenseNumberExpireDate - DateTime.Now.Date).Days
                })
                .ToList()
                .OrderBy(o => o.LicenseExpirationDays);
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[] {
                serializer.Serialize(pDriverList)
         };
        }

        [HttpGet, HttpPost]
        public bool Insert( string pCode, string pName, string pLocalName, string pIsDriver, string pPhone, string pMobile, string pNationalIDNumber, DateTime pNationalIDExpireDate
            , string pLicenseNumber, DateTime pLicenseNumberExpireDate, DateTime pServiceStartDate, DateTime pServiceEndDate, string pAddress, string pNotes, string pFinance365Ref
            , string pIsInactive, string pAccountID, string pSubAccountID, string pCostCenterID, string pSubAccountGroupID
            , DateTime pBirthDate, string pSupervisorName)
        {
            bool _result = false;
            CVarTRCK_Drivers objCVarTRCK_Drivers = new CVarTRCK_Drivers();


            objCVarTRCK_Drivers.Code = int.Parse(pCode);
            objCVarTRCK_Drivers.Name = pName.Trim().ToUpper();
            objCVarTRCK_Drivers.LocalName = (pLocalName == null ? "" : pLocalName.Trim().ToUpper());
            objCVarTRCK_Drivers.IsDriver = (pIsDriver.Trim() == "1"? true : false);
            objCVarTRCK_Drivers.Phone = (pPhone == null ? "" : pPhone.Trim().ToUpper());
            objCVarTRCK_Drivers.Mobile = (pMobile == null ? "" : pMobile.Trim().ToUpper());
            objCVarTRCK_Drivers.NationalIDNumber = (pNationalIDNumber == null ? "" : pNationalIDNumber.Trim().ToUpper());
            objCVarTRCK_Drivers.NationalIDExpireDate = pNationalIDExpireDate;
            objCVarTRCK_Drivers.LicenseNumber = (pLicenseNumber == null ? "" : pLicenseNumber.Trim().ToUpper());
            objCVarTRCK_Drivers.LicenseNumberExpireDate = pLicenseNumberExpireDate;
            objCVarTRCK_Drivers.ServiceStartDate = pServiceStartDate;
            objCVarTRCK_Drivers.ServiceEndDate = pServiceEndDate;
            objCVarTRCK_Drivers.Address = (pAddress == null ? "" : pAddress.Trim().ToUpper());
            objCVarTRCK_Drivers.Notes = (pNotes == null ? "" : pNotes.Trim().ToUpper());

            objCVarTRCK_Drivers.BirthDate = pBirthDate;
            objCVarTRCK_Drivers.SupervisorName = pSupervisorName;

            objCVarTRCK_Drivers.IsInactive = bool.Parse(pIsInactive);
            objCVarTRCK_Drivers.IsDeleted = false;

            objCVarTRCK_Drivers.AccountID = int.Parse(pAccountID);
            objCVarTRCK_Drivers.SubAccountID = int.Parse(pSubAccountID);
            objCVarTRCK_Drivers.CostCenterID = int.Parse(pCostCenterID);
            objCVarTRCK_Drivers.SubAccountGroupID = int.Parse(pSubAccountGroupID);

            objCVarTRCK_Drivers.TimeLocked = DateTime.Parse("01-01-1900");
            objCVarTRCK_Drivers.LockingUserID = 0;
            objCVarTRCK_Drivers.Finance365Ref = pFinance365Ref;

            objCVarTRCK_Drivers.CreatorUserID = objCVarTRCK_Drivers.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarTRCK_Drivers.CreationDate = objCVarTRCK_Drivers.ModificationDate = DateTime.Now;

            CTRCK_Drivers objCTRCK_Drivers = new CTRCK_Drivers();
            objCTRCK_Drivers.lstCVarTRCK_Drivers.Add(objCVarTRCK_Drivers);

            CSystemOptions objCSystemOptions = new CSystemOptions();
            objCSystemOptions.GetList("Where OptionID= 195");
            Exception checkException = null;
            if (objCSystemOptions.lstCVarSystemOptions.Count > 0 && objCSystemOptions.lstCVarSystemOptions[0].OptionValue)
                checkException = Fleet_Forwarding_TRCK_Drivers.InsertUpdate_Fleet_Forwarding_TRCK_Drivers(objCVarTRCK_Drivers);
            else
                 checkException = objCTRCK_Drivers.SaveMethod(objCTRCK_Drivers.lstCVarTRCK_Drivers);

            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else
            { //not unique
                _result = true;
                #region Create SubAccount
                int _RowCount = 0;
                if (int.Parse(pAccountID) != 0 && int.Parse(pSubAccountGroupID) != 0 && int.Parse(pSubAccountID) == 0)
                {
                    #region Get data to insert
                    CA_SubAccounts objCA_SubAccounts = new CA_SubAccounts();
                    checkException = objCA_SubAccounts.GetListPaging(9999, 1, "WHERE ID = " + pSubAccountGroupID.ToString(), "ID", out _RowCount);
                    CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
                    string pNewCode = objCCustomizedDBCall.CallStringFunction("SELECT [dbo].A_SubAccounts_GetCode(" + (int.Parse(pSubAccountGroupID) == 0 ? "null" : pSubAccountGroupID.ToString()) + ") AS Code");
                    #endregion Get data to insert
                    #region Insert
                    CVarA_SubAccounts objCVarA_SubAccounts = new CVarA_SubAccounts();
                    objCVarA_SubAccounts.SubAccount_Number = (objCA_SubAccounts.lstCVarA_SubAccounts[0].RealSubAccountCode + pNewCode).PadRight(21, '0');
                    objCVarA_SubAccounts.SubAccount_Name = pName.Trim().ToUpper();
                    objCVarA_SubAccounts.SubAccount_EnName = pName.Trim().ToUpper();
                    objCVarA_SubAccounts.Parent_ID = int.Parse(pSubAccountGroupID);
                    objCVarA_SubAccounts.IsMain = false;
                    objCVarA_SubAccounts.SubAccLevel = objCA_SubAccounts.lstCVarA_SubAccounts[0].SubAccLevel + 1;
                    objCVarA_SubAccounts.RealSubAccountCode = objCA_SubAccounts.lstCVarA_SubAccounts[0].RealSubAccountCode + pNewCode;
                    objCVarA_SubAccounts.User_ID = WebSecurity.CurrentUserId;
                    objCA_SubAccounts.lstCVarA_SubAccounts.Add(objCVarA_SubAccounts);
                    checkException = objCA_SubAccounts.SaveMethod(objCA_SubAccounts.lstCVarA_SubAccounts);
                    if (checkException == null)
                    {
                        _result = true;
                        int pNewSubAccountID = objCVarA_SubAccounts.ID;
                        //CallCustomizedSP
                        objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "A_SubAccounts", pNewSubAccountID, "AutoInsert");
                        //Set Parent.IsMain=true
                        objCA_SubAccounts.UpdateList("IsMain=1 WHERE ID=" + pSubAccountGroupID.ToString());
                        #region add Details if exists
                        CA_SubAccounts_Details objCA_SubAccounts_Details = new CA_SubAccounts_Details(); //get the parent details
                        checkException = objCA_SubAccounts_Details.GetListPaging(9999, 1, "WHERE SubAccount_ID = " + pSubAccountGroupID.ToString(), "SubAccount_ID", out _RowCount);
                        for (int i = 0; i < objCA_SubAccounts_Details.lstCVarA_SubAccounts_Details.Count; i++)
                        {
                            //this is insert, so i am sure i ve no children to link accounts to, ALSO I don't need to delete because they are new
                            objCCustomizedDBCall.SP_A_SubAccounts_Details("SP_A_SubAccounts_Details", "I", pNewSubAccountID, objCA_SubAccounts_Details.lstCVarA_SubAccounts_Details[i].Account_ID, false);
                        }
                        #endregion add Details if exists
                        //Update TRCK_Driver SubaccountID
                        objCTRCK_Drivers.UpdateList("SubAccountID=" + objCVarA_SubAccounts.ID + " WHERE ID=" + objCVarTRCK_Drivers.ID);
                    }
                    #endregion Insert
                }
                #endregion Create SubAccount
            }
            return _result;
        }

        // [Route("/api/TRCK_Drivers/Update/{pID}/{pCode}/{pName}/{pLocalName}")]
        [HttpGet, HttpPost]
        public bool Update(Int32 pID, string pCode, string pName, string pLocalName, string pIsDriver, string pPhone, string pMobile, string pNationalIDNumber, DateTime pNationalIDExpireDate
            , string pLicenseNumber, DateTime pLicenseNumberExpireDate, DateTime pServiceStartDate, DateTime pServiceEndDate, string pAddress, string pNotes, string pFinance365Ref
            , string pIsInactive, string pAccountID, string pSubAccountID, string pCostCenterID, string pSubAccountGroupID
            , DateTime pBirthDate, string pSupervisorName)
        {
            bool _result = false;
            CVarTRCK_Drivers objCVarTRCK_Drivers = new CVarTRCK_Drivers();

            //the next 4 lines to get the CreatorUserID and CreationDate and set them as they were entered before
            CTRCK_Drivers objCGetCreationInformation = new CTRCK_Drivers();
            objCGetCreationInformation.GetItem(pID);
            objCVarTRCK_Drivers.CreatorUserID = objCGetCreationInformation.lstCVarTRCK_Drivers[0].CreatorUserID;
            objCVarTRCK_Drivers.CreationDate = objCGetCreationInformation.lstCVarTRCK_Drivers[0].CreationDate;
            if (int.Parse(pAccountID) == -1) //this means called from Operations or Quotations so don't update the ERP columns
            {
                objCVarTRCK_Drivers.AccountID = objCGetCreationInformation.lstCVarTRCK_Drivers[0].AccountID;
                objCVarTRCK_Drivers.SubAccountID = objCGetCreationInformation.lstCVarTRCK_Drivers[0].SubAccountID;
                objCVarTRCK_Drivers.CostCenterID = objCGetCreationInformation.lstCVarTRCK_Drivers[0].CostCenterID;
                objCVarTRCK_Drivers.SubAccountGroupID = objCGetCreationInformation.lstCVarTRCK_Drivers[0].SubAccountGroupID;
            }
            else
            {
                objCVarTRCK_Drivers.AccountID = int.Parse(pAccountID);
                objCVarTRCK_Drivers.SubAccountID = int.Parse(pSubAccountID);
                objCVarTRCK_Drivers.CostCenterID = int.Parse(pCostCenterID);
                objCVarTRCK_Drivers.SubAccountGroupID = int.Parse(pSubAccountGroupID);
            }
            objCVarTRCK_Drivers.ID = pID;

            objCVarTRCK_Drivers.Code = int.Parse(pCode);
            objCVarTRCK_Drivers.Name = pName.Trim().ToUpper();
            objCVarTRCK_Drivers.LocalName = (pLocalName == null ? "" : pLocalName.Trim().ToUpper());
            objCVarTRCK_Drivers.IsDriver = (pIsDriver.Trim() == "1" ? true : false);
            objCVarTRCK_Drivers.Phone = (pPhone == null ? "" : pPhone.Trim().ToUpper());
            objCVarTRCK_Drivers.Mobile = (pMobile == null ? "" : pMobile.Trim().ToUpper());
            objCVarTRCK_Drivers.NationalIDNumber = (pNationalIDNumber == null ? "" : pNationalIDNumber.Trim().ToUpper());
            objCVarTRCK_Drivers.NationalIDExpireDate = pNationalIDExpireDate;
            objCVarTRCK_Drivers.LicenseNumber = (pLicenseNumber == null ? "" : pLicenseNumber.Trim().ToUpper());
            objCVarTRCK_Drivers.LicenseNumberExpireDate = pLicenseNumberExpireDate;
            objCVarTRCK_Drivers.ServiceStartDate = pServiceStartDate;
            objCVarTRCK_Drivers.ServiceEndDate = pServiceEndDate;
            objCVarTRCK_Drivers.Address = (pAddress == null ? "" : pAddress.Trim().ToUpper());
            objCVarTRCK_Drivers.Notes = (pNotes == null ? "" : pNotes.Trim().ToUpper());

            objCVarTRCK_Drivers.BirthDate = pBirthDate;
            objCVarTRCK_Drivers.SupervisorName = pSupervisorName;

            objCVarTRCK_Drivers.IsInactive = bool.Parse(pIsInactive);
            objCVarTRCK_Drivers.IsDeleted = false;
            
            objCVarTRCK_Drivers.TimeLocked = DateTime.Parse("01-01-1900");
            objCVarTRCK_Drivers.LockingUserID = 0;
            objCVarTRCK_Drivers.Finance365Ref = pFinance365Ref;

            objCVarTRCK_Drivers.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarTRCK_Drivers.ModificationDate = DateTime.Now;

            CTRCK_Drivers objCTRCK_Drivers = new CTRCK_Drivers();
            objCTRCK_Drivers.lstCVarTRCK_Drivers.Add(objCVarTRCK_Drivers);

            CSystemOptions objCSystemOptions = new CSystemOptions();
            objCSystemOptions.GetList("Where OptionID= 195");
            Exception checkException = null;
            if (objCSystemOptions.lstCVarSystemOptions.Count > 0 && objCSystemOptions.lstCVarSystemOptions[0].OptionValue)
                checkException = Fleet_Forwarding_TRCK_Drivers.InsertUpdate_Fleet_Forwarding_TRCK_Drivers(objCVarTRCK_Drivers);
            else
                 checkException = objCTRCK_Drivers.SaveMethod(objCTRCK_Drivers.lstCVarTRCK_Drivers);

            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else
            { //not unique
                _result = true;
                #region Create SubAccount
                int _RowCount = 0;
                if (int.Parse(pAccountID) != 0 && int.Parse(pSubAccountGroupID) != 0 && int.Parse(pSubAccountID) == 0)
                {
                    #region Get data to insert
                    CA_SubAccounts objCA_SubAccounts = new CA_SubAccounts();
                    checkException = objCA_SubAccounts.GetListPaging(9999, 1, "WHERE ID = " + pSubAccountGroupID.ToString(), "ID", out _RowCount);
                    CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
                    string pNewCode = objCCustomizedDBCall.CallStringFunction("SELECT [dbo].A_SubAccounts_GetCode(" + (int.Parse(pSubAccountGroupID) == 0 ? "null" : pSubAccountGroupID.ToString()) + ") AS Code");
                    #endregion Get data to insert
                    #region Insert
                    CVarA_SubAccounts objCVarA_SubAccounts = new CVarA_SubAccounts();
                    objCVarA_SubAccounts.SubAccount_Number = (objCA_SubAccounts.lstCVarA_SubAccounts[0].RealSubAccountCode + pNewCode).PadRight(21, '0');
                    objCVarA_SubAccounts.SubAccount_Name = pName.Trim().ToUpper();
                    objCVarA_SubAccounts.SubAccount_EnName = pName.Trim().ToUpper();
                    objCVarA_SubAccounts.Parent_ID = int.Parse(pSubAccountGroupID);
                    objCVarA_SubAccounts.IsMain = false;
                    objCVarA_SubAccounts.SubAccLevel = objCA_SubAccounts.lstCVarA_SubAccounts[0].SubAccLevel + 1;
                    objCVarA_SubAccounts.RealSubAccountCode = objCA_SubAccounts.lstCVarA_SubAccounts[0].RealSubAccountCode + pNewCode;
                    objCVarA_SubAccounts.User_ID = WebSecurity.CurrentUserId;
                    objCA_SubAccounts.lstCVarA_SubAccounts.Add(objCVarA_SubAccounts);
                    checkException = objCA_SubAccounts.SaveMethod(objCA_SubAccounts.lstCVarA_SubAccounts);
                    if (checkException == null)
                    {
                        _result = true;
                        int pNewSubAccountID = objCVarA_SubAccounts.ID;
                        //CallCustomizedSP
                        objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "A_SubAccounts", pNewSubAccountID, "AutoInsert");
                        //Set Parent.IsMain=true
                        objCA_SubAccounts.UpdateList("IsMain=1 WHERE ID=" + pSubAccountGroupID.ToString());
                        #region add Details if exists
                        CA_SubAccounts_Details objCA_SubAccounts_Details = new CA_SubAccounts_Details(); //get the parent details
                        checkException = objCA_SubAccounts_Details.GetListPaging(9999, 1, "WHERE SubAccount_ID = " + pSubAccountGroupID.ToString(), "SubAccount_ID", out _RowCount);
                        for (int i = 0; i < objCA_SubAccounts_Details.lstCVarA_SubAccounts_Details.Count; i++)
                        {
                            //this is insert, so i am sure i ve no children to link accounts to, ALSO I don't need to delete because they are new
                            objCCustomizedDBCall.SP_A_SubAccounts_Details("SP_A_SubAccounts_Details", "I", pNewSubAccountID, objCA_SubAccounts_Details.lstCVarA_SubAccounts_Details[i].Account_ID, false);
                        }
                        #endregion add Details if exists
                        //Update TRCK_Driver SubaccountID
                        objCTRCK_Drivers.UpdateList("SubAccountID=" + objCVarA_SubAccounts.ID + " WHERE ID=" + objCVarTRCK_Drivers.ID);
                    }
                    #endregion Insert
                }
                #endregion Create SubAccount
            }
            return _result;
        }

        // [Route("api/TRCK_Drivers/Delete/{pTRCK_DriversIDs}")]
        [HttpGet, HttpPost]
        public bool Delete(String pTRCK_DriversIDs)
        {
            bool _result = false;
            Exception checkException = null;

            CSystemOptions objCSystemOptions = new CSystemOptions();
            objCSystemOptions.GetList("Where OptionID= 195");
            if (objCSystemOptions.lstCVarSystemOptions.Count > 0 && objCSystemOptions.lstCVarSystemOptions[0].OptionValue)
            {
                foreach (var currentID in pTRCK_DriversIDs.Split(','))
                {
                    checkException = Fleet_Forwarding_TRCK_Drivers.Delete_Fleet_Forwarding_TRCK_Drivers(Convert.ToInt32(currentID), WebSecurity.CurrentUserId);
                    if (checkException != null)
                    {
                        _result = false;
                        break;
                    }
                }

            }
            else
            {
                CTRCK_Drivers objCTRCK_Drivers = new CTRCK_Drivers();
                foreach (var currentID in pTRCK_DriversIDs.Split(','))
                {
                    objCTRCK_Drivers.lstDeletedCPKTRCK_Drivers.Add(new CPKTRCK_Drivers() { ID = Int32.Parse(currentID.Trim()) });
                }

                checkException = objCTRCK_Drivers.DeleteItem(objCTRCK_Drivers.lstDeletedCPKTRCK_Drivers);
            }

            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("DELETE")) // some or all of the rows were not deleted due to dependencies
                    _result = false;
            }
            else //deleted successfully and no dependencies, so set is deleted in addresses and contacts to 1 by a trigger
                _result = true;

            return _result;
        }

        //[Route("/api/TRCK_Drivers/CheckRow/{pTRCK_DriversID}")]
        [HttpGet, HttpPost]
        public Boolean CheckRow(String pID)
        {
            bool _result = false;
            // var xx = HttpContext.Current.Session["UserID"].ToString();
            CTRCK_Drivers objCTRCK_Drivers = new CTRCK_Drivers();
            objCTRCK_Drivers.GetItem(int.Parse(pID));

            //if (objCTRCK_Drivers.lstCVarTRCK_Drivers[0].TimeLocked.Equals(DateTime.Parse("01-01-1900")))
            if (objCTRCK_Drivers.lstCVarTRCK_Drivers[0].LockingUserID == 0)
            {
                //record is not locked so lock it then return false
                objCTRCK_Drivers.lstCVarTRCK_Drivers[0].TimeLocked = DateTime.Now;
                objCTRCK_Drivers.lstCVarTRCK_Drivers[0].LockingUserID = WebSecurity.CurrentUserId;
                objCTRCK_Drivers.lstCVarTRCK_Drivers.Add(objCTRCK_Drivers.lstCVarTRCK_Drivers[0]);
                objCTRCK_Drivers.SaveMethod(objCTRCK_Drivers.lstCVarTRCK_Drivers);
                _result = false;
            }
            else
            {
                _result = true;//record is locked
            }
            return _result;
        }

        //[Route("/api/TRCK_Drivers/UnlockRecord/{pID}")]
        [HttpGet, HttpPost]
        public Boolean UnlockRecord(string pID)
        {
            bool _result = false;
            try
            {
                CTRCK_Drivers objCTRCK_Drivers = new CTRCK_Drivers();
                objCTRCK_Drivers.GetItem(int.Parse(pID));

                objCTRCK_Drivers.lstCVarTRCK_Drivers[0].TimeLocked = DateTime.Parse("01-01-1900");
                objCTRCK_Drivers.lstCVarTRCK_Drivers[0].LockingUserID = 0;
                objCTRCK_Drivers.lstCVarTRCK_Drivers.Add(objCTRCK_Drivers.lstCVarTRCK_Drivers[0]);
                objCTRCK_Drivers.SaveMethod(objCTRCK_Drivers.lstCVarTRCK_Drivers);
                _result = true;
            }
            catch (Exception ex)
            {
                _result = false;//record is locked
            }
            return _result;
        }

    }
}

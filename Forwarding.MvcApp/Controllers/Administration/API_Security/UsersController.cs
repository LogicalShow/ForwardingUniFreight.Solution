using Forwarding.BLL.Utilities;
using Forwarding.MvcApp.Models.Administration.Security.Generated;
using Forwarding.MvcApp.Models.Administration.Settings.Customized;
using Forwarding.MvcApp.Models.Administration.Settings.Generated;
using Forwarding.MvcApp.Models.Administration.Security.Customized;
using Forwarding.MvcApp.Models.ContainerFreightStation.Tariff;
using Forwarding.MvcApp.Models.FA.Generated;
using System;
using System.Linq;
using System.Web.Http;
using System.Web.Script.Serialization;
using System.Web.Security;
using WebMatrix.WebData;
using Forwarding.MvcApp.Models.MasterData.Partners.Generated;
using Forwarding.MvcApp.Models.NoAccess.Generated;
using System.Windows.Documents;
using System.Collections.Generic;
using FastReport.Wizards;
using Forwarding.MvcApp.Models.Warehousing.MasterData.Generated;
using Forwarding.MvcApp.Models.Customized;
using Forwarding.MvcApp.Models.Accounting.MasterData.Generated;

//the update method is in a standalone webapicontroller coz i had problems to make the 2 posts on the same controller
namespace Forwarding.MvcApp.Controllers.Administration.API_Security
{

    public class UsersController : ApiController
    {
        [HttpGet]
        public string LoadAllIDs(string pWhereClause)
        {
            CvwUsers objCvwUsers = new CvwUsers();
            objCvwUsers.GetList(pWhereClause);
            string IDs = string.Join(",", objCvwUsers.lstCVarvwUsers.Select(a => a.ID));
            return IDs;
        }
        //[Route("/api/Users/LoadAll")]
        [HttpGet, HttpPost]
        //sherif: to be used in select boxes
        public Object[] LoadAll(string pWhereClause)
        {
            CvwUsers objCvwUsers = new CvwUsers();
            objCvwUsers.GetList(pWhereClause);
            return new Object[] { new JavaScriptSerializer().Serialize(objCvwUsers.lstCVarvwUsers) };
        }
        [HttpGet, HttpPost]
        //sherif: to be used in select boxes
        public Object[] LoadAllUserSalesmen(string pWhereClause)
        {
            CvwUsersSalesmen objCvwUsersSalesmen = new CvwUsersSalesmen();
            objCvwUsersSalesmen.GetList(pWhereClause);
            return new Object[] { new JavaScriptSerializer().Serialize(objCvwUsersSalesmen.lstCVarvwUsersSalesmen) };
        }
        [HttpGet, HttpPost]
        public Object[] LoadWithPaging(Int32 pPageNumber, Int32 pPageSize, string pSearchKey)
        {
            CvwUsers objCvwUsers = new CvwUsers();
            //objCvwUsers.GetList(string.Empty);
            Int32 _RowCount = 0;// objCvwUsers.lstCVarUsers.Count;

            pSearchKey = (pSearchKey == null ? "" : pSearchKey.Trim().ToUpper());
            string whereClause = " Where ( Username LIKE '%" + pSearchKey + "%' "
            + " OR Name LIKE '%" + pSearchKey + "%' "
            + " OR LocalName LIKE '%" + pSearchKey + "%' "
            + " OR BranchName LIKE '%" + pSearchKey + "%' "
            + " OR DepartmentName LIKE '%" + pSearchKey + "%' "
            + " OR RoleName Like '%" + pSearchKey + "%' ) AND IsNull( CustomerID , 0 ) = 0";

            objCvwUsers.GetListPaging(pPageSize, pPageNumber, whereClause, " Username ", out _RowCount);

            return new Object[] { new JavaScriptSerializer().Serialize(objCvwUsers.lstCVarvwUsers), _RowCount };
        }

        [HttpGet]
        public void Insert()
        {
            if (!WebSecurity.Initialized)
            {
                WebSecurity.InitializeDatabaseConnection("ConnectionString", "Users", "ID", "Username", autoCreateTables: false);
            }
        }

        [HttpPost]
        public object[] Insert([FromBody] InsertUserData insertUserData)
        {
            bool _result = false;
            try
            {
                WebSecurity.CreateUserAndAccount(insertUserData.pUsername, insertUserData.pPassword
                    , new
                    {
                        Name = insertUserData.pName,
                        LocalName = insertUserData.pLocalName,
                        BranchID = insertUserData.pBranchID,
                        DepartmentID = insertUserData.pDepartmentID,
                        Email = insertUserData.pEmail,
                        Phone1 = insertUserData.pPhone1,
                        Phone2 = insertUserData.pPhone2,
                        Mobile1 = insertUserData.pMobile1,
                        Address = insertUserData.pAddress,
                        Password = "",
                        IsInactive = insertUserData.pIsInactive,
                        Notes = insertUserData.pNotes,
                        IsSalesman = insertUserData.pIsSalesman,
                        IsAccessAllCharges = insertUserData.pIsAccessAllCharges,
                        IsHideOthersRecords = insertUserData.pIsHideOthersRecords,
                        ExpirationDate = insertUserData.pExpirationDate,
                        CreatorUserID = WebSecurity.CurrentUserId,
                        CreationDate = DateTime.Now,
                        ModificatorUserID = WebSecurity.CurrentUserId,
                        ModificationDate = DateTime.Now,
                        HeartBeatDate = DateTime.Parse("01-01-2015")
                        ,
                        Email_DisplayName = insertUserData.pEmail_DisplayName,
                        Email_Footer = insertUserData.pEmail_Footer,
                        Email_Header = insertUserData.pEmail_Header,
                        Email_Host = insertUserData.pEmail_Host,
                        Email_IsSSL = bool.Parse(insertUserData.pEmail_IsSSL),
                        Email_Password = (insertUserData.pEmail_Password == "0" || insertUserData.pEmail_Password == "" || insertUserData.pEmail_Password == null) ? "0" : CEncryptDecrypt.Encrypt(insertUserData.pEmail_Password, true),
                        Email_Port = int.Parse(insertUserData.pEmail_Port) 
                        //,
                        //CustomerID = 0 //---- 10/10/2020

                    }, false);



            }
            catch (MembershipCreateUserException e)
            {
                if (e.StatusCode.ToString() == "DuplicateUserName")
                    _result = false;
                else
                { //because i have another exception because of the trigger
                    _result = true;
                    int _ID = WebSecurity.GetUserId(insertUserData.pUsername);

                    CInsertUserSalesmenList objCInsertUserSalesmenList = new CInsertUserSalesmenList();
                    var exc = objCInsertUserSalesmenList.InsertUserSalesmenList(_ID, insertUserData.pUserSalesmen);


                    //if (exc == null)
                    //    _result = true;
                    //else
                    //    _result = false;
                }
            }

            return new object[] { _result };
        }

        [HttpPost]
        //[ActionName("Update")]
        public object[] Update([FromBody] UpdateUserData updateUserData)
        {
            bool _result = false;
            CVarUsers objCVarUsers = new CVarUsers();
            
            int _RowCount = 0;
            CUsers objCUser_temp = new CUsers();
            objCUser_temp.GetListPaging(999999, 1, "WHERE ID = " + updateUserData.pID  + "", "ID", out _RowCount);
            var _UserEmailPassword = objCUser_temp.lstCVarUsers[0].Email_Password;
            
            //the next 4 lines to get the CreatorUserID and CreationDate and set them as they were entered before
            CUsers objCGetCreationInformation = new CUsers();
            objCGetCreationInformation.GetItem(updateUserData.pID);
            objCVarUsers.CreatorUserID = objCGetCreationInformation.lstCVarUsers[0].CreatorUserID;
            objCVarUsers.CreationDate = objCGetCreationInformation.lstCVarUsers[0].CreationDate;
            objCVarUsers.HeartBeatDate = objCGetCreationInformation.lstCVarUsers[0].HeartBeatDate;

            objCVarUsers.ID = updateUserData.pID;

            objCVarUsers.Name = updateUserData.pName;
            objCVarUsers.LocalName = updateUserData.pLocalName;
            objCVarUsers.BranchID = updateUserData.pBranchID;
            objCVarUsers.DepartmentID = updateUserData.pDepartmentID;
            objCVarUsers.RoleID = updateUserData.pRoleID;
            objCVarUsers.Email = updateUserData.pEmail;
            objCVarUsers.Phone1 = updateUserData.pPhone1;
            objCVarUsers.Phone2 = updateUserData.pPhone2;
            objCVarUsers.Mobile1 = updateUserData.pMobile1;
            objCVarUsers.Address = updateUserData.pAddress;
            objCVarUsers.Username = (updateUserData.pUsername == null ? "" : updateUserData.pUsername.Trim().ToUpper());
            objCVarUsers.Password = "";
            objCVarUsers.ExpirationDate = updateUserData.pExpirationDate;

            objCVarUsers.IsInactive = updateUserData.pIsInactive;
            objCVarUsers.Notes = (updateUserData.pNotes == null ? "" : updateUserData.pNotes.Trim().ToUpper());
            objCVarUsers.IsSalesman = updateUserData.pIsSalesman;


            objCVarUsers.IsAccessAllCharges = updateUserData.pIsAccessAllCharges;
            objCVarUsers.IsHideOthersRecords = updateUserData.pIsHideOthersRecords;

            objCVarUsers.Email_DisplayName = updateUserData.pEmail_DisplayName;
            objCVarUsers.Email_Footer = updateUserData.pEmail_Footer;
            objCVarUsers.Email_Header = updateUserData.pEmail_Header;
            objCVarUsers.Email_Host = updateUserData.pEmail_Host;
            objCVarUsers.Email_IsSSL = bool.Parse(updateUserData.pEmail_IsSSL);
            objCVarUsers.CustomerID = 0;//---- 10/10/2020

            if (updateUserData.pEmail_Password == "0" || updateUserData.pEmail_Password == "" || updateUserData.pEmail_Password == null)
            {
                objCVarUsers.Email_Password = (_UserEmailPassword == "0" || _UserEmailPassword == "" || _UserEmailPassword == null) ? "0" : _UserEmailPassword ;
            }
            else
            {
                objCVarUsers.Email_Password =  CEncryptDecrypt.Encrypt(updateUserData.pEmail_Password, true);
            }






            objCVarUsers.Email_Port = int.Parse(updateUserData.pEmail_Port);







            objCVarUsers.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarUsers.ModificationDate = DateTime.Now;

            CUsers objCUsers = new CUsers();
            objCUsers.lstCVarUsers.Add(objCVarUsers);
            Exception checkException = objCUsers.SaveMethod(objCUsers.lstCVarUsers);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else //not unique
            //Resetting the Password in case of update success
            {
                _result = true;
                if (updateUserData.pPassword != "")
                {
                    WebSecurity.ResetPassword(WebSecurity.GeneratePasswordResetToken(updateUserData.pUsername), updateUserData.pPassword);
                    if (updateUserData.pID == updateUserData.pLoggedUserID)
                        WebSecurity.Login(updateUserData.pUsername.Trim().ToUpper(), updateUserData.pPassword); //to handle case of changing username for the logged user
                }

                // //update all passwords of EGL2023 to $EGL__co*12
                //int dummy = 0;
                //CDefaults objCDefaults = new CDefaults();
                //objCDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out dummy);
                //if (objCDefaults.lstCVarDefaults[0].UnEditableCompanyName == "EGL" && WebSecurity.CurrentUserId == 4)
                //{
                //    CUsers AllUsers = new CUsers();
                //    int UsersCount = 0;
                //    AllUsers.GetListPaging(99999, 1, "WHERE 1=1", "ID", out UsersCount);
                //    for (int i = 0; i < UsersCount; i++)
                //    {
                //        string UserName = AllUsers.lstCVarUsers[i].Username;
                //        WebSecurity.ResetPassword(WebSecurity.GeneratePasswordResetToken(UserName), "$EGL__co*12");

                //    }

                //}

                CInsertUserSalesmenList objCInsertUserSalesmenList = new CInsertUserSalesmenList();
                var exc = objCInsertUserSalesmenList.InsertUserSalesmenList(updateUserData.pID, updateUserData.pUserSalesmen);


                //if (exc == null)
                //    _result = true;
                //else
                //    _result = false;

            }
            return new object[] { _result, objCUsers.lstCVarUsers[0].ID };
        }



        // [Route("/api/Users/DeleteByID/{pID}")]
        //[HttpGet, HttpPost]
        //public void DeleteByID(Int32 pID)
        //{
        //    CUsers objCUsers = new CUsers();
        //    objCUsers.lstDeletedCPKUsers.Add(new CPKUsers() { ID = pID });
        //    objCUsers.DeleteItem(objCUsers.lstDeletedCPKUsers);
        //}

        // [Route("api/Users/Delete/{pUsersIDs}")]

        [HttpGet, HttpPost]
        public bool Delete(String pUsersIDs)
        {
            bool _result = false;
            CUsers objCUsers = new CUsers();
            foreach (var currentID in pUsersIDs.Split(','))
            {
                objCUsers.lstDeletedCPKUsers.Add(new CPKUsers() { ID = Int32.Parse(currentID.Trim()) });
            }

            Exception checkException = objCUsers.DeleteItem(objCUsers.lstDeletedCPKUsers);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("DELETE")) // some or all of the rows were not deleted due to dependencies
                    _result = false;
            }
            else //deleted successfully
                _result = true;

            //delete from webpages_Membership to have the same records like Users
            Cwebpages_Membership objCwebpages_Membership = new Cwebpages_Membership();
            objCwebpages_Membership.DeleteList(" WHERE UserId NOT IN (SELECT ID FROM Users) ");

            return _result;
        }

        [HttpPost]
        public object[] ChangePassword([FromBody] ChangePassword changePassword)
        {
            bool _result = false;
            bool isPasswordCorrect = WebSecurity.Login(WebSecurity.CurrentUserName, changePassword.pOldPassword, false);
            if (isPasswordCorrect)
                _result = WebSecurity.ResetPassword(WebSecurity.GeneratePasswordResetToken(WebSecurity.CurrentUserName), changePassword.pNewPassword);
            return new object[] {
                _result
            };
        }



        [HttpGet, HttpPost]
        public Object[] GetUserActivities(string pUserID)
        {
            var serialize = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };

            CA_CostCenters objCA_CostCenters = new CA_CostCenters();
            objCA_CostCenters.GetList("where IsActivity = 1");


            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
            var ActivitiesList = objCCustomizedDBCall.ExecuteQuery_ListOfObjects(
               @"select CC.ID, CC.Code, CC.CostCenterName from A_CostCenters CC join Users_Activities UA on UA.ActivityCostCenterID = CC.ID where UA.UserID = " + pUserID
                , typeof(CVarA_CostCenters)).Cast<CVarA_CostCenters>().ToList();

            return new Object[] {
                serialize.Serialize(ActivitiesList)   ,
                serialize.Serialize(objCA_CostCenters.lstCVarA_CostCenters)
            };
        }
        [HttpGet, HttpPost]
        public Object[] GetUserBranches(string pUserID)
        {
            var serialize = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            CvwFA_UserBranches cvwFA_UserBranches = new CvwFA_UserBranches();
            cvwFA_UserBranches.GetList("where UserID = " + pUserID + "");

            CBranches cBranches = new CBranches();
            cBranches.GetList("where 1 = 1");



            return new Object[] {serialize.Serialize(cvwFA_UserBranches.lstCVarvwFA_UserBranches)
                ,
                serialize.Serialize(cBranches.lstCVarBranches)
            };
        }
        [HttpPost]
		//[ActionName("Update")]
		public object[] UpdateUserBranches([FromBody] UserBranches model)
		{
			bool _result = false;
			Exception checkException = null;
			var UserID = 0;
			//CVarBranches cVarBranches = new CVarBranches();
			//int _RowCount = 0;

			//CInsertUserBranches cInsertUserBranches = new CInsertUserBranches();
			//var checkException = cInsertUserBranches.InsertUserBranches(UserID, model.pBranchesIDs);
			CFA_UserBranches objCFA_UserBranches = new CFA_UserBranches();
			if (model != null && int.Parse(model.pID) > 0)
			{
				UserID = int.Parse(model.pID);
				checkException = objCFA_UserBranches.DeleteList($"where UserID = {UserID}");
			}

			if (model != null && !string.IsNullOrEmpty(model.pBranchesIDs))
			{
				var BranchIDs = model.pBranchesIDs.Split(',');
				foreach (var branchId in BranchIDs)
				{
					objCFA_UserBranches.lstCVarFA_UserBranches.Add(new CVarFA_UserBranches { UserID = UserID, BranchID = int.Parse(branchId) });
					Common.Common.ReplaceNull(objCFA_UserBranches.lstCVarFA_UserBranches[objCFA_UserBranches.lstCVarFA_UserBranches.Count - 1]);
				}
				checkException = objCFA_UserBranches.SaveMethod(objCFA_UserBranches.lstCVarFA_UserBranches);
			}

			if (checkException != null) // an exception is caught in the model
			{
				if (checkException.Message.Contains("UNIQUE"))
					_result = false;
			}
			else //not unique
				 //Resetting the Password in case of update success
			{


				_result = true;

			}
			return new object[] { _result, model.pID };
		}

        [HttpPost]
        //[ActionName("Update")]
        public object[] UpdateUserActivities([FromBody] UserActivities model)
        {
            bool _result = false;
            Exception checkException = null;
            var UserID = 0;

            CUsers_Activities objCUsers_Activities = new CUsers_Activities();
            if (model != null && int.Parse(model.pID) > 0)
            {
                UserID = int.Parse(model.pID);
                checkException = objCUsers_Activities.DeleteList($"where UserID = {UserID}");
            }

            if (model != null && !string.IsNullOrEmpty(model.pActivitiesIDs))
            {
                var ActivityIDs = model.pActivitiesIDs.Split(',');
                foreach (var CostCenterIF in ActivityIDs)
                {
                    objCUsers_Activities.lstCVarUsers_Activities.Add(new CVarUsers_Activities { UserID = UserID, ActivityCostCenterID = int.Parse(CostCenterIF) });
                    Common.Common.ReplaceNull(objCUsers_Activities.lstCVarUsers_Activities[objCUsers_Activities.lstCVarUsers_Activities.Count - 1]);
                }
                checkException = objCUsers_Activities.SaveMethod(objCUsers_Activities.lstCVarUsers_Activities);
            }

            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else //not unique
                 //Resetting the Password in case of update success
            {


                _result = true;

            }
            return new object[] { _result, model.pID };
        }

        #region UsersWarehouses
        [HttpGet, HttpPost]
		public Object[] GetUserWarehouses(string pWhereClause)
		{
			var serialize = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
			CWH_UsersWarehouses objCWH_UsersWarehouses = new CWH_UsersWarehouses();
			objCWH_UsersWarehouses.GetList(pWhereClause);

			CWH_Warehouse objCWH_Warehouse = new CWH_Warehouse();
			objCWH_Warehouse.GetList("where 1 = 1");



			return new Object[] {serialize.Serialize(objCWH_UsersWarehouses.lstCVarWH_UsersWarehouses)
				,
				serialize.Serialize(objCWH_Warehouse.lstCVarWH_Warehouse)
			};
		}
		[HttpPost]
		public object[] UpdateUserWarehouses([FromBody] UserWarehouse model)
		{
			bool _result = false;
			Exception checkException = null;
			var UserID = 0;

			CWH_UsersWarehouses objCWH_UsersWarehouses = new CWH_UsersWarehouses();
			if (model != null && int.Parse(model.pID) > 0)
			{
				UserID = int.Parse(model.pID);
				checkException = objCWH_UsersWarehouses.DeleteList($"where UserID = {UserID}");
			}

			if (model != null && !string.IsNullOrEmpty(model.pWarehousesIDs) && model.pWarehousesIDs!="0")
			{
				var WarehousesIDs = model.pWarehousesIDs.Split(',');
				foreach (var warehouseId in WarehousesIDs)
				{
					objCWH_UsersWarehouses.lstCVarWH_UsersWarehouses.Add(new CVarWH_UsersWarehouses { UserID = UserID, WarehouseID = int.Parse(warehouseId), IsDefault= warehouseId==model.pDefaultWarehouseID });
					Common.Common.ReplaceNull(objCWH_UsersWarehouses.lstCVarWH_UsersWarehouses[objCWH_UsersWarehouses.lstCVarWH_UsersWarehouses.Count - 1]);
				}
				checkException = objCWH_UsersWarehouses.SaveMethod(objCWH_UsersWarehouses.lstCVarWH_UsersWarehouses);
			}

			if (checkException != null) // an exception is caught in the model
			{
				if (checkException.Message.Contains("UNIQUE"))
					_result = false;
			}
			else //not unique
				 //Resetting the Password in case of update success
			{


				_result = true;

			}
			return new object[] { _result, model.pID };
		}
		#endregion

		//Nour27092023
		[HttpGet, HttpPost]
        public Object[] GetUserWHCSFTariffDrafts(string pUserID)
        {
            int _RowCount = 0;
            CDefaults objCDefaults = new CDefaults();
            objCDefaults.GetListPaging(999999, 1, "WHERE 1=1", "ID", out _RowCount);
            string[] MescoCompanies = new string[5] { "MES", "SAC", "GLO", "EUR", "ALT" };
            var serialize = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            CUser_WH_CSL_TariffDraft objCUser_WH_CSL_TariffDraftGenerate = new CUser_WH_CSL_TariffDraft();
            objCUser_WH_CSL_TariffDraftGenerate.GetList("where CanGenerate = 1 and UserID = " + pUserID + "");

            CUser_WH_CSL_TariffDraft objCUser_WH_CSL_TariffDraftApprove = new CUser_WH_CSL_TariffDraft();
            objCUser_WH_CSL_TariffDraftApprove.GetList("where CanApprove = 1 and UserID = " + pUserID + "");

            CWH_CSL_Tariff objCWH_CSL_TariffForGenerate = new CWH_CSL_Tariff();
            string strwhere = "";
            strwhere += $"Where ID NOT IN (SELECT td.WH_CSL_TariffID FROM WH_CSL_Tariff_Details AS td INNER JOIN ChargeTypes AS ct ON ct.ID = td.ChargeTypesID WHERE ct.Name = N'{(MescoCompanies.Contains(objCDefaults.lstCVarDefaults[0].UnEditableCompanyName) ? "مصاريف التخزين" : "Storage At Warehouse")}')";
            objCWH_CSL_TariffForGenerate.GetList(strwhere);

            CWH_CSL_Tariff objCWH_CSL_TariffforApprove = new CWH_CSL_Tariff();
            objCWH_CSL_TariffforApprove.GetList("");

            return new Object[] {
                  serialize.Serialize(objCUser_WH_CSL_TariffDraftGenerate.lstCVarUser_WH_CSL_TariffDraft)
                , serialize.Serialize(objCUser_WH_CSL_TariffDraftApprove.lstCVarUser_WH_CSL_TariffDraft)
                , serialize.Serialize(objCWH_CSL_TariffForGenerate.lstCVarWH_CSL_Tariff)
                , serialize.Serialize(objCWH_CSL_TariffforApprove.lstCVarWH_CSL_Tariff)
            };
        }

        [HttpPost]
        public object[] UpdateUserWHCSFTariffDrafts([FromBody] UserWHCSFTariffDrafts model)
        {
            bool _result = false;

            int _RowCount = 0;

            CUser_WH_CSL_TariffDraft objCUser_WH_CSL_TariffDraft = new CUser_WH_CSL_TariffDraft();

            var UserID = int.Parse(model.pID);
            var checkException = objCUser_WH_CSL_TariffDraft.InsertUserWHCSFTariffDrafts(UserID, model.pTariffDraftsGenerateIDs, model.pTariffDraftsApproveIDs);

            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else //not unique
            {
                _result = true;
            }
            return new object[] { _result, model.pID };
        }

        [HttpGet]
        public Object[] GetUserSalesmenServices(string pUserID)
        {
            var serialize = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            CvwcrmUserSalesmen objCvwcrmUserSalesmen = new CvwcrmUserSalesmen();
            objCvwcrmUserSalesmen.GetList("where UserID = " + pUserID);

            CvwcrmUserServices objCvwcrmUserServices = new CvwcrmUserServices();
            objCvwcrmUserServices.GetList("where UserID = " + pUserID);

            CSalesmen objCSalesmen = new CSalesmen();
            CUsers objCUsers = new CUsers();
            objCSalesmen.GetList("WHERE 1=1");
            objCUsers.GetList("WHERE 1=1");

            CNoAccessServices objCNoAccessServices = new CNoAccessServices();
            objCNoAccessServices.GetList("");

            return new Object[] {
                  serialize.Serialize(objCvwcrmUserSalesmen.lstCVarvwcrmUserSalesmen)
                , serialize.Serialize(objCvwcrmUserServices.lstCVarvwcrmUserServices)
                , serialize.Serialize(objCSalesmen.lstCVarSalesmen)
                , serialize.Serialize(objCNoAccessServices.lstCVarNoAccessServices)
                , serialize.Serialize(objCUsers.lstCVarUsers)
            };
        }

        [HttpPost]
        public object[] UpdateUserSalesmenServices([FromBody] UserSalesmenServices model)
        {
            bool _result = false;
            Exception checkException = new Exception();
            //Salesmen
            var NewUserSalesmen = model.pSalesmenIDs == null ? new List<string> { } : model.pSalesmenIDs.Split(',').ToList();
            CcrmUserSalesmen objCcrmUserSalesmen = new CcrmUserSalesmen();
            checkException = objCcrmUserSalesmen.GetList("WHERE UserID = " + model.pID);
            var OldUserSalesmen = objCcrmUserSalesmen.lstCVarcrmUserSalesmen.Count == 0 ? new List<string> { } : objCcrmUserSalesmen.lstCVarcrmUserSalesmen.Select(x => x.SalesmanID.ToString()).ToList();

            var UserSalesmenToBeInserted = NewUserSalesmen.Except(OldUserSalesmen).ToList();
            var UserSalesmenToBeDeleted = OldUserSalesmen.Except(NewUserSalesmen).ToList();

            checkException = objCcrmUserSalesmen.DeleteList("WHERE SalesmanID IN (" + string.Join(",", UserSalesmenToBeDeleted) + ") AND UserID = " + model.pID);

            foreach (var ID in UserSalesmenToBeInserted)
            {
                checkException = objCcrmUserSalesmen.SaveMethod(new List<CVarcrmUserSalesmen>
                {
                    new CVarcrmUserSalesmen
                    {
                        UserID = int.Parse(model.pID),
                        SalesmanID = int.Parse(ID)
                    }
                });
            }

            //Services
            var NewUserServices = model.pServicesIDs == null ? new List<string> { } : model.pServicesIDs.Split(',').ToList();
            CcrmUserServices objCcrmUserServices = new CcrmUserServices();
            checkException = objCcrmUserServices.GetList("WHERE UserID = " + model.pID);
            var OldUserServices = objCcrmUserServices.lstCVarcrmUserServices.Count == 0 ? new List<string> { } : objCcrmUserServices.lstCVarcrmUserServices.Select(x => x.ServiceID.ToString()).ToList();

            var UserServicesToBeInserted = NewUserServices.Except(OldUserServices).ToList();
            var UserServicesToBeDeleted = OldUserServices.Except(NewUserServices).ToList();

            checkException =  objCcrmUserServices.DeleteList("WHERE ServiceID IN (" + string.Join(",", UserServicesToBeDeleted) + ") AND UserID = " + model.pID);

            foreach (var ID in UserServicesToBeInserted)
            {
                checkException = objCcrmUserServices.SaveMethod(new List<CVarcrmUserServices>
                {
                    new CVarcrmUserServices
                    {
                        UserID = int.Parse(model.pID),
                        ServiceID = int.Parse(ID)
                    }
                });
            }

            if (checkException == null)
                _result = true;

            return new object[] {
                _result
                , model.pID 
            };
        }

    }
    public class UserBranches
    {
        public string pID { get; set; }
        public string pBranchesIDs { get; set; }
    }
    public class UserActivities
    {
        public string pID { get; set; }
        public string pActivitiesIDs { get; set; }
    }
    public class InsertUserData

    {
        public string pName { get; set; }
        public string pLocalName { get; set; }
        public string pBranchID { get; set; }
        public string pDepartmentID { get; set; }
        public string pEmail { get; set; }
        public string pPhone1 { get; set; }
        public string pPhone2 { get; set; }
        public string pMobile1 { get; set; }
        public string pAddress { get; set; }

        public string pUsername { get; set; }
        public string pPassword { get; set; }
        public string pExpirationDate { get; set; }
        public string pIsInactive { get; set; }
        public string pNotes { get; set; }
        public string pIsSalesman { get; set; }

        public string pEmail_Password { get; set; }
        public string pEmail_DisplayName { get; set; }
        public string pEmail_Host { get; set; }
        public string pEmail_Port { get; set; }
        public string pEmail_IsSSL { get; set; }
        public string pEmail_Header { get; set; }
        public string pEmail_Footer { get; set; }
        public string pUserSalesmen { get; set; }

        public bool pIsAccessAllCharges { get; set; }
        public bool pIsHideOthersRecords { get; set; }
    }

    public class UpdateUserData
    {
        public int pID { get; set; }
        public int pLoggedUserID { get; set; }

        public string pName { get; set; }
        public string pLocalName { get; set; }
        public int pBranchID { get; set; }
        public int pDepartmentID { get; set; }
        public int pRoleID { get; set; }
        public string pEmail { get; set; }
        public string pPhone1 { get; set; }
        public string pPhone2 { get; set; }
        public string pMobile1 { get; set; }
        public string pAddress { get; set; }

        public string pUsername { get; set; }
        public string pPassword { get; set; }
        public DateTime pExpirationDate { get; set; }
        public bool pIsInactive { get; set; }
        public string pNotes { get; set; }
        public bool pIsSalesman { get; set; }



        public string pEmail_Password { get; set; }
        public string pEmail_DisplayName { get; set; }
        public string pEmail_Host { get; set; }
        public string pEmail_Port { get; set; }
        public string pEmail_IsSSL { get; set; }
        public string pEmail_Header { get; set; }
        public string pEmail_Footer { get; set; }
        public string pUserSalesmen { get; set; }

        public bool pIsAccessAllCharges { get; set; }
        public bool pIsHideOthersRecords { get; set; }
    }

    public class ChangePassword
    {
        public string pOldPassword { get; set; }
        public string pNewPassword { get; set; }
    }

    public class UserWHCSFTariffDrafts
    {
        public string pID { get; set; }
        public string pTariffDraftsGenerateIDs { get; set; }
        public string pTariffDraftsApproveIDs { get; set; }
    }

    public class UserSalesmenServices
    {
        public string pID { get; set; }
        public string pSalesmenIDs { get; set; }
        public string pServicesIDs { get; set; }
    }

	#region UsersWarehouses
	public class UserWarehouse
	{
		public string pID { get; set; }
		public string pDefaultWarehouseID { get; set; }
		public string pWarehousesIDs { get; set; }
	}
	#endregion
}

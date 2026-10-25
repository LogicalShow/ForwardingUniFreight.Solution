using Forwarding.MvcApp.Models.Administration.Security.Generated;
using Forwarding.MvcApp.Models.Administration.Settings.Generated;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;
using System.Web.Security;
using WebMatrix.WebData;

namespace Forwarding.MvcApp.Controllers.Administration.API_Security
{
    public class RolePrivilegesController : ApiController
    {
        [HttpGet, HttpPost]
        public Object[] LoadAll(string pOrderBy)
        {
            pOrderBy = " WHERE IsInactive <> 1 order by OrderNo ";
            CvwRoleForms objCvwRoleForms = new CvwRoleForms();
            objCvwRoleForms.GetList(" order by " + pOrderBy);
            return new Object[] { new JavaScriptSerializer().Serialize(objCvwRoleForms.lstCVarvwRoleForms) };
        }

        //Technique of this function
        //Problem: i cant search Form Name in DB coz of Encryption
        //Sol.: i log to the DB twice(1st: i get all records.... then i decrypt and create a whereclause of matching records)
        //2nd i log again to DB with the whereclause to get the matching records
        // [Route("/api/vwRoleForms/LoadWithPaging/{pPageNumber}/{pPageSize}")]
        [HttpGet, HttpPost]
        public Object[] LoadWithPaging(Int32 pPageNumber, Int32 pPageSize, string pSearchKey, int pRoleID)
        {
            CvwRoleForms objCvwRoleForms = new CvwRoleForms();
            Int64[] UnMatchedRoleFormIDs = new Int64[1000]; //an array holding list matching roleformIDs to connect to the server again with whereclause(coz of encryption i cant search)
            int intUnMatchedCount = 0;                 //this is to make search here not in DB coz of Encryption

            CDefaults objCDefaults = new CDefaults();
            objCDefaults.GetList("WHERE 1=1");

            pSearchKey = (pSearchKey == null ? "" : pSearchKey.Trim().ToUpper());
            Int32 _RowCount = objCvwRoleForms.lstCVarvwRoleForms.Count;
            string pWhereClause = " where RoleID = " + pRoleID.ToString() + " AND IsInactive <> 1 ";

            string orderby = " OrderNo ";
            if (objCDefaults.lstCVarDefaults[0].UnEditableCompanyName == "LATT")
            {
                pWhereClause += " AND FormID IN (select ID from Forms where GroupID IN (select GroupID from Groups where ParentGroupID IN (select GroupID from Groups where ParentGroupID is null and IsInactive=0)))";
                orderby = " ModuleOrderNo, GroupID ";
            }
            //objCvwRoleForms.GetListPaging(pPageSize, pPageNumber, whereClause, " OrderNo ", out _RowCount);
            objCvwRoleForms.GetListPaging(99999, 1, pWhereClause, orderby, out _RowCount);
            if (objCvwRoleForms != null && objCvwRoleForms.lstCVarvwRoleForms.Count > 0)
                foreach (var currentForm in objCvwRoleForms.lstCVarvwRoleForms)
                {
                    var value = Forwarding.BLL.Utilities.CEncryptDecrypt.Decrypt(currentForm.Code, true);// currentForm.DecryptedName.ToString();
                    currentForm.DecryptedName = Forwarding.MvcApp.App_Resources.App_Resources.ResourceManager.GetString(value);
                    //the next 2 lines to get the decrypted group code
                    value = Forwarding.BLL.Utilities.CEncryptDecrypt.Decrypt(currentForm.GroupCode, true);
                    //i didnt get it from resources to be in english
                    currentForm.GroupCode = value;
                    value = Forwarding.BLL.Utilities.CEncryptDecrypt.Decrypt(currentForm.ModuleCode, true);
                    //i didnt get it from resources to be in english
                    currentForm.ModuleCode = value;
                    if (currentForm.DecryptedName.ToUpper().Contains(pSearchKey)
                        || currentForm.GroupCode.ToUpper().Contains(pSearchKey)
                        || currentForm.ModuleCode.ToUpper().Contains(pSearchKey))
                    {
                        UnMatchedRoleFormIDs[intUnMatchedCount] = currentForm.ID;
                        ++intUnMatchedCount;
                    }
                }
            if (intUnMatchedCount > 0)
            {
                pWhereClause += " AND (ID = " + UnMatchedRoleFormIDs[0].ToString() + " ";
                if (intUnMatchedCount > 1)
                    for (int i = 1; i < intUnMatchedCount; i++)
                        pWhereClause += " OR ID = " + UnMatchedRoleFormIDs[i].ToString() + " ";
                pWhereClause += ") ";
            }
            else //not matching so get nothing
                pWhereClause += " AND ID = 0 ";


            objCvwRoleForms.GetListPaging(pPageSize, pPageNumber, pWhereClause, orderby, out _RowCount);
            if (objCvwRoleForms != null && objCvwRoleForms.lstCVarvwRoleForms.Count > 0)
                foreach (var currentForm in objCvwRoleForms.lstCVarvwRoleForms)
                {
                    //the next line is to get the decrypted Code (written in hl-menu-CODE) (dont use resources)
                    currentForm.DecryptedCode = Forwarding.BLL.Utilities.CEncryptDecrypt.Decrypt(currentForm.Code, true);
                    //the next 2 lines to get the decrypted name
                    var value = Forwarding.BLL.Utilities.CEncryptDecrypt.Decrypt(currentForm.Code, true);// currentForm.DecryptedName.ToString();
                    currentForm.DecryptedName = Forwarding.MvcApp.App_Resources.App_Resources.ResourceManager.GetString(value);
                    //the next 2 lines to get the decrypted group code
                    value = Forwarding.BLL.Utilities.CEncryptDecrypt.Decrypt(currentForm.GroupCode, true);
                    //i didnt get them from resources to be in english
                    currentForm.GroupCode = value;//Forwarding.MvcApp.App_Resources.App_Resources.ResourceManager.GetString(value);
                    //the next 2 lines to get the decrypted module code
                    value = Forwarding.BLL.Utilities.CEncryptDecrypt.Decrypt(currentForm.ModuleCode, true);
                    //i didnt get it from resources to be in english
                    currentForm.ModuleCode = value;
                    
                }
            return new Object[] { new JavaScriptSerializer().Serialize(objCvwRoleForms.lstCVarvwRoleForms), _RowCount };
        }
        

        // [Route("/api/RoleForms/Update/{pNotes}/{pName}/{pLocalName}}")]
        [HttpGet, HttpPost]
        public bool Update(Int64 pID, Int32 pRoleID, Int32 pFormID, bool pCanView, bool pCanAdd, bool pCanEdit, bool pCanDelete, bool pHideOthersRecords)
        {
            bool _result = false;

            CVarRoleForms objCVarRoleForms = new CVarRoleForms();

            //the next 4 lines to get the CreatorUserID and CreationDate and set them as they were entered before
            CRoleForms objCGetCreationInformation = new CRoleForms();
            objCGetCreationInformation.GetItem(pID);
            objCVarRoleForms.CreatorUserID = objCGetCreationInformation.lstCVarRoleForms[0].CreatorUserID;
            objCVarRoleForms.CreationDate = objCGetCreationInformation.lstCVarRoleForms[0].CreationDate;

            objCVarRoleForms.ID = pID;

            objCVarRoleForms.RoleID = pRoleID;
            objCVarRoleForms.FormID = pFormID;

            objCVarRoleForms.CanView = pCanView;
            objCVarRoleForms.CanAdd = pCanAdd;
            objCVarRoleForms.CanEdit = pCanEdit;
            objCVarRoleForms.CanDelete = pCanDelete;
            objCVarRoleForms.HideOthersRecords = pHideOthersRecords;

            objCVarRoleForms.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarRoleForms.ModificationDate = DateTime.Now;

            CRoleForms objCRoleForms = new CRoleForms();
            objCRoleForms.lstCVarRoleForms.Add(objCVarRoleForms);
            Exception checkException = objCRoleForms.SaveMethod(objCRoleForms.lstCVarRoleForms);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else //not unique
                _result = true;
            return _result;
        }

        [HttpGet, HttpPost]
        public Object[] LoadAll_SecCustomizedRolePrivileges(string pWhereClause)
        {
            CvwSecRoleCustomizedTabs objCvwSecRoleCustomizedTabs = new CvwSecRoleCustomizedTabs();
            objCvwSecRoleCustomizedTabs.GetList(pWhereClause);
            return new Object[] { new JavaScriptSerializer().Serialize(objCvwSecRoleCustomizedTabs.lstCVarvwSecRoleCustomizedTabs) };
        }

        [HttpGet, HttpPost]
        public bool SecRolePrivilegesList_UpdateList(string pSelectedIDsToUpdate, string pCanViewList, string pCanAddList, string pCanEditList, string pCanDeleteList)
        {
            bool _result = false;
            Exception checkException = null;
            string updateClause = "";
            int NumberOfRows = pSelectedIDsToUpdate.Split(',').Length;

            for (int i = 0; i < NumberOfRows; i++)
            {
                updateClause = " CanView = " + pCanViewList.Split(',')[i];
                updateClause += " , CanAdd = " + pCanAddList.Split(',')[i];
                updateClause += " , CanEdit = " + pCanEditList.Split(',')[i];
                updateClause += " , CanDelete = " + pCanDeleteList.Split(',')[i];
                updateClause += " , ModificatorUserID = " + WebSecurity.CurrentUserId.ToString();
                updateClause += " , ModificationDate = GETDATE() ";

                updateClause += " WHERE ID = " + pSelectedIDsToUpdate.Split(',')[i];

                CSecRoleCustomizedTabs objCSecRoleCustomizedTabs = new CSecRoleCustomizedTabs();
                checkException = objCSecRoleCustomizedTabs.UpdateList(updateClause);

                if (checkException == null) // an exception is caught in the model
                    _result = true;
            }
            return _result;
        }
        [HttpGet]
        public string AddRoleForAllUsers(int pID)
        {
            CRoleForms CVarRoleForms = new CRoleForms();
           int _RowCount = 0;
           string updateClause = "";
            Exception checkException = null;
            CVarRoleForms.GetListPaging(999999, 1, "WHERE RoleID =" + pID, "ID",out _RowCount);
            var RoleFormsIDs = CVarRoleForms.lstCVarRoleForms.Select(i => new
            {
                ID = i.FormID
            }).ToList();
            int NumberOfRows = RoleFormsIDs.Count;
            foreach(var RoleForm in RoleFormsIDs)
            {
                updateClause = " CanView = 1";
                updateClause += " , CanAdd =  1";
                updateClause += " , CanEdit = 1";
                updateClause += " , CanDelete = 1"; 
                updateClause += " , ModificatorUserID = " + WebSecurity.CurrentUserId.ToString();
                updateClause += " , ModificationDate = GETDATE() ";
                updateClause += " WHERE FormID = " + RoleForm.ID;
                CUserForms cUserForms = new CUserForms();
                checkException = cUserForms.UpdateList(updateClause);
            }

			//apply role to it's users
			CUsers objCUsers = new CUsers();
			objCUsers.GetList($"where RoleID={pID}");
			CUserForms objCUserForms = new CUserForms();
			CSecUserCustomizedTabs objCSecUserCustomizedTabs = new CSecUserCustomizedTabs();

			string userFormUpdate = "";
			string userTabUpdate = "";
			foreach (var user in objCUsers.lstCVarUsers)
			{
				userFormUpdate = $@" UserForms.CanView = R.CanView,
			   UserForms.CanEdit = R.CanEdit,
			   UserForms.CanDelete = R.CanDelete,
			   UserForms.CanAdd = R.CanAdd,
			   UserForms.HideOthersRecords = R.HideOthersRecords,
			   UserForms.ModificatorUserID = R.ModificatorUserID,
			   UserForms.ModificationDate = GETDATE() 
			   FROM RoleForms R 
			   INNER JOIN UserForms U ON U.FormID = R.FormID 
			   WHERE U.UserID = {user.ID} AND R.RoleID = {user.RoleID}";
				checkException = objCUserForms.UpdateList(userFormUpdate);

				userTabUpdate = $@" CanView = (SELECT CanView FROM SecRoleCustomizedTabs 
						             WHERE RoleID = {user.RoleID} AND SecCustomizedTabID = SecUserCustomizedTabs.SecCustomizedTabID), 
						  CanAdd = (SELECT CanAdd FROM SecRoleCustomizedTabs RF 
						             WHERE RoleID = { user.RoleID}
							AND SecCustomizedTabID = SecUserCustomizedTabs.SecCustomizedTabID), 
						  CanEdit = (SELECT CanEdit FROM SecRoleCustomizedTabs RF 
						             WHERE RoleID = {user.RoleID} AND SecCustomizedTabID = SecUserCustomizedTabs.SecCustomizedTabID), 
						  CanDelete = (SELECT CanDelete FROM SecRoleCustomizedTabs RF 
						             WHERE RoleID = {user.RoleID} AND SecCustomizedTabID = SecUserCustomizedTabs.SecCustomizedTabID), 
						  ModificatorUserID = {WebSecurity.CurrentUserId}, 
						  ModificationDate = GETDATE() 
						  WHERE UserID = { user.ID }";
				checkException = objCSecUserCustomizedTabs.UpdateList(userTabUpdate);
			}

			if (checkException == null) return "Role is Added to all Users";
            return checkException.ToString();
            
        }

        ////Apply Default Role Privileges
        //[HttpGet, HttpPost]
        //public bool ApplyRoleDefaultsToAllUsers(int pRoleID)
        //{
        //    bool _result = false;
        //    Exception checkException = null;
        //    string updateClause = "";
        //    #region Setting UserPrivileges
        //    updateClause = " CanView = (SELECT CanView FROM RoleForms ";
        //    updateClause += "            WHERE RoleID = " + pRoleID.ToString() + " AND FormID = UserForms.FormID), ";
        //    updateClause += " CanAdd = (SELECT CanAdd FROM RoleForms RF ";
        //    updateClause += "            WHERE RoleID = " + pRoleID.ToString() + " AND FormID = UserForms.FormID), ";
        //    updateClause += " CanEdit = (SELECT CanEdit FROM RoleForms RF ";
        //    updateClause += "            WHERE RoleID = " + pRoleID.ToString() + " AND FormID = UserForms.FormID), ";
        //    updateClause += " CanDelete = (SELECT CanDelete FROM RoleForms RF ";
        //    updateClause += "            WHERE RoleID = " + pRoleID.ToString() + " AND FormID = UserForms.FormID), ";
        //    updateClause += " ModificatorUserID = " + WebSecurity.CurrentUserId.ToString() + ", ";
        //    updateClause += " ModificationDate = GETDATE() ";
        //    updateClause += " WHERE RoleID = " + pRoleID.ToString();

        //    CUserForms objCUserForms = new CUserForms();
        //    checkException = objCUserForms.UpdateList(updateClause);
        //    #endregion Setting UserPrivileges

        //    #region Setting SecCustomizedUserPrivileges
        //    updateClause = " CanView = (SELECT CanView FROM SecRoleCustomizedTabs ";
        //    updateClause += "            WHERE RoleID = " + pRoleID.ToString() + " AND SecCustomizedTabID = SecUserCustomizedTabs.SecCustomizedTabID), ";
        //    updateClause += " CanAdd = (SELECT CanAdd FROM SecRoleCustomizedTabs RF ";
        //    updateClause += "            WHERE RoleID = " + pRoleID.ToString() + " AND SecCustomizedTabID = SecUserCustomizedTabs.SecCustomizedTabID), ";
        //    updateClause += " CanEdit = (SELECT CanEdit FROM SecRoleCustomizedTabs RF ";
        //    updateClause += "            WHERE RoleID = " + pRoleID.ToString() + " AND SecCustomizedTabID = SecUserCustomizedTabs.SecCustomizedTabID), ";
        //    updateClause += " CanDelete = (SELECT CanDelete FROM SecRoleCustomizedTabs RF ";
        //    updateClause += "            WHERE RoleID = " + pRoleID.ToString() + " AND SecCustomizedTabID = SecUserCustomizedTabs.SecCustomizedTabID), ";
        //    updateClause += " ModificatorUserID = " + WebSecurity.CurrentUserId.ToString() + ", ";
        //    updateClause += " ModificationDate = GETDATE() ";
        //    updateClause += " WHERE RoleID = " + pRoleID.ToString();

        //    CSecUserCustomizedTabs objCSecUserCustomizedTabs = new CSecUserCustomizedTabs();
        //    checkException = objCSecUserCustomizedTabs.UpdateList(updateClause);
            
        //    #endregion Setting SecCustomizedUserPrivileges

        //    return _result;
        //}
    }
}

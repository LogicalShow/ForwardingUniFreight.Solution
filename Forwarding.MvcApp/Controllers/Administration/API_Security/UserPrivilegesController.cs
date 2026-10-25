using Forwarding.MvcApp.Models.Administration.Security.Generated;
using Forwarding.MvcApp.Models.Administration.Settings.Generated;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;

namespace Forwarding.MvcApp.Controllers.Administration.API_Security
{
    public class UserPrivilegesController : ApiController
    {
        //[Route("/api/UserForms/LoadAll")]
        [HttpGet, HttpPost]
        //sherif: to be used in select boxes
        public Object[] LoadAll([FromBody] LoadAllParameters loadAllParameters)
        {
            string pWhereClause = "";
            pWhereClause = " WHERE UserID = " + WebSecurity.CurrentUserId.ToString();
            if (loadAllParameters.pFormID != "0" && loadAllParameters.pFormID != null)
            {
                pWhereClause += " AND FormID = " + loadAllParameters.pFormID;
            }
            
            //pWhereClause += " AND IsInactive <> 0 ";
            pWhereClause += " ORDER BY OrderNo ";
            CvwUserForms objCvwUserForms = new CvwUserForms();
            objCvwUserForms.GetList(pWhereClause);
            return new Object[] { new JavaScriptSerializer().Serialize(objCvwUserForms.lstCVarvwUserForms), WebSecurity.CurrentUserId.ToString() };
        }
        //Technique of this function
        //Problem: i cant search Form Name in DB coz of Encryption
        //Sol.: i log to the DB twice(1st: i get all records.... then i decrypt and create a whereclause of matching records)
        //2nd i log again to DB with the whereclause to get the matching records
        // [Route("/api/vwUserForms/LoadWithPaging/{pPageNumber}/{pPageSize}")]
        [HttpGet, HttpPost]
        public Object[] LoadWithPaging(Int32 pPageNumber, Int32 pPageSize, string pSearchKey, int pUserID)
        {
            CvwUserForms objCvwUserForms = new CvwUserForms();
            Int64[] UnMatchedUserFormIDs = new Int64[1000]; //an array holding list matching UserformIDs to connect to the server again with whereclause(coz of encryption i cant search)
            int intUnMatchedCount = 0;                 //this is to make search here not in DB coz of Encryption

            CDefaults objCDefaults = new CDefaults();
            objCDefaults.GetList("WHERE 1=1");


            pSearchKey = (pSearchKey == null ? "" : pSearchKey.Trim().ToUpper());
            Int32 _RowCount = objCvwUserForms.lstCVarvwUserForms.Count;
            string pWhereClause = " where UserID = " + pUserID.ToString() + " AND IsInactive <> 1 AND (GroupID <>1020 OR ImageName='ChooseReports') ";
            //objCvwUserForms.GetListPaging(pPageSize, pPageNumber, whereClause, " OrderNo ", out _RowCount);
            string orderby = " OrderNo ";
            if (objCDefaults.lstCVarDefaults[0].UnEditableCompanyName == "LATT")
            {
                pWhereClause += " AND FormID IN (select ID from Forms where GroupID IN (select GroupID from Groups where ParentGroupID IN (select GroupID from Groups where ParentGroupID is null and IsInactive=0)))";
                orderby = " ModuleOrderNo, GroupID ";
            }
            objCvwUserForms.GetListPaging(99999, 1, pWhereClause, orderby, out _RowCount);
            if (objCvwUserForms != null && objCvwUserForms.lstCVarvwUserForms.Count > 0)
                foreach (var currentForm in objCvwUserForms.lstCVarvwUserForms)
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
                        || currentForm.ModuleCode.ToUpper().Contains(pSearchKey)
                        || currentForm.ImageName.ToUpper().Contains(pSearchKey))
                    {
                        UnMatchedUserFormIDs[intUnMatchedCount] = currentForm.ID;
                        ++intUnMatchedCount;
                    }
                }
            if (intUnMatchedCount > 0)
            {
                pWhereClause += " AND (ID = " + UnMatchedUserFormIDs[0].ToString() + " ";
                if (intUnMatchedCount > 1)
                    for (int i = 1; i < intUnMatchedCount; i++)
                        pWhereClause += " OR ID = " + UnMatchedUserFormIDs[i].ToString() + " ";
                pWhereClause += ") ";
            }
            else //not matching so get nothing
                pWhereClause += " AND ID = 0 ";
            objCvwUserForms.GetListPaging(pPageSize, pPageNumber, pWhereClause, orderby, out _RowCount);
            if (objCvwUserForms != null && objCvwUserForms.lstCVarvwUserForms.Count > 0)
                foreach (var currentForm in objCvwUserForms.lstCVarvwUserForms)
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
            return new Object[] { new JavaScriptSerializer().Serialize(objCvwUserForms.lstCVarvwUserForms), _RowCount };
        }

        [HttpGet, HttpPost]
        public Object[] LoadWithWhereClause(string pWhereClauseForPrint, Int32 pUserID)
        {
            CvwUserForms objCvwUserForms = new CvwUserForms();
            objCvwUserForms.GetList(pWhereClauseForPrint);
            CvwUsers objCvwUsers = new CvwUsers();
            objCvwUsers.GetList("WHERE ID=" + pUserID);
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[] {
                serializer.Serialize(objCvwUserForms.lstCVarvwUserForms)
                , serializer.Serialize(objCvwUsers.lstCVarvwUsers[0]) //pData[1]
            };
        }

        // [Route("/api/UserForms/Update/{pNotes}/{pName}/{pLocalName}}")]
        [HttpGet, HttpPost]
        public bool Update(Int64 pID, Int32 pUserID, Int32 pFormID, bool pCanView, bool pCanAdd, bool pCanEdit, bool pCanDelete, bool pHideOthersRecords)
        {
            bool _result = false;

            CVarUserForms objCVarUserForms = new CVarUserForms();

            //the next 4 lines to get the CreatorUserID and CreationDate and set them as they were entered before
            CUserForms objCGetCreationInformation = new CUserForms();
            objCGetCreationInformation.GetItem(pID);
            objCVarUserForms.CreatorUserID = objCGetCreationInformation.lstCVarUserForms[0].CreatorUserID;
            objCVarUserForms.CreationDate = objCGetCreationInformation.lstCVarUserForms[0].CreationDate;

            objCVarUserForms.ID = pID;

            objCVarUserForms.UserID = pUserID;
            objCVarUserForms.FormID = pFormID;

            objCVarUserForms.CanView = pCanView;
            objCVarUserForms.CanAdd = pCanAdd;
            objCVarUserForms.CanEdit = pCanEdit;
            objCVarUserForms.CanDelete = pCanDelete;
            objCVarUserForms.HideOthersRecords = pHideOthersRecords;

            objCVarUserForms.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarUserForms.ModificationDate = Convert.ToDateTime(DateTime.Now.ToString());

            CUserForms objCUserForms = new CUserForms();
            objCUserForms.lstCVarUserForms.Add(objCVarUserForms);
            Exception checkException = objCUserForms.SaveMethod(objCUserForms.lstCVarUserForms);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else //not unique
                _result = true;
            return _result;
        }

        //Apply Default Role Privileges
        [HttpGet, HttpPost]
        public bool ApplyRoleDefaults(int pUserID, int pRoleID)
        {
            bool _result = false;
            Exception checkException = null;
            string updateClause = "";
            #region Setting UserPrivileges
            //updateClause = " CanView = (SELECT CanView FROM RoleForms ";
            //updateClause += "            WHERE RoleID = " + pRoleID.ToString() + " AND FormID = UserForms.FormID), ";
            //updateClause += " CanAdd = (SELECT CanAdd FROM RoleForms RF ";
            //updateClause += "            WHERE RoleID = " + pRoleID.ToString() + " AND FormID = UserForms.FormID), ";
            //updateClause += " CanEdit = (SELECT CanEdit FROM RoleForms RF ";
            //updateClause += "            WHERE RoleID = " + pRoleID.ToString() + " AND FormID = UserForms.FormID), ";
            //updateClause += " CanDelete = (SELECT CanDelete FROM RoleForms RF ";
            //updateClause += "            WHERE RoleID = " + pRoleID.ToString() + " AND FormID = UserForms.FormID), ";
            //updateClause += " HideOthersRecords = (SELECT HideOthersRecords FROM RoleForms ";
            //updateClause += "            WHERE RoleID = " + pRoleID.ToString() + " AND FormID = UserForms.FormID), ";
            //updateClause += " ModificatorUserID = " + WebSecurity.CurrentUserId.ToString() + ", ";
            //updateClause += " ModificationDate = GETDATE() ";
            //updateClause += " WHERE UserID = " + pUserID.ToString();

            updateClause = " UserForms.CanView = R.CanView,"
                + "UserForms.CanEdit = R.CanEdit,"
                + "UserForms.CanDelete = R.CanDelete,"
                + "UserForms.CanAdd = R.CanAdd,"
                + "UserForms.HideOthersRecords = R.HideOthersRecords,"
                + "UserForms.ModificatorUserID = R.ModificatorUserID,"
                + "UserForms.ModificationDate = GETDATE() "
                + "FROM RoleForms R "
                + "INNER JOIN UserForms U ON U.FormID = R.FormID "
                + $"WHERE U.UserID = {pUserID.ToString()} AND R.RoleID = {pRoleID.ToString()}";


            CUserForms objCUserForms = new CUserForms();
            checkException = objCUserForms.UpdateList(updateClause);
            #endregion Setting UserPrivileges

            #region Setting SecCustomizedUserPrivileges
            updateClause = " CanView = (SELECT CanView FROM SecRoleCustomizedTabs ";
            updateClause += "            WHERE RoleID = " + pRoleID.ToString() + " AND SecCustomizedTabID = SecUserCustomizedTabs.SecCustomizedTabID), ";
            updateClause += " CanAdd = (SELECT CanAdd FROM SecRoleCustomizedTabs RF ";
            updateClause += "            WHERE RoleID = " + pRoleID.ToString() + " AND SecCustomizedTabID = SecUserCustomizedTabs.SecCustomizedTabID), ";
            updateClause += " CanEdit = (SELECT CanEdit FROM SecRoleCustomizedTabs RF ";
            updateClause += "            WHERE RoleID = " + pRoleID.ToString() + " AND SecCustomizedTabID = SecUserCustomizedTabs.SecCustomizedTabID), ";
            updateClause += " CanDelete = (SELECT CanDelete FROM SecRoleCustomizedTabs RF ";
            updateClause += "            WHERE RoleID = " + pRoleID.ToString() + " AND SecCustomizedTabID = SecUserCustomizedTabs.SecCustomizedTabID), ";
            updateClause += " ModificatorUserID = " + WebSecurity.CurrentUserId.ToString() + ", ";
            updateClause += " ModificationDate = GETDATE() ";
            updateClause += " WHERE UserID = " + pUserID.ToString();

            CSecUserCustomizedTabs objCSecUserCustomizedTabs = new CSecUserCustomizedTabs();
            checkException = objCSecUserCustomizedTabs.UpdateList(updateClause);
            #endregion Setting SecCustomizedUserPrivileges
            if (checkException == null)
            {
                CUsers objCUsers = new CUsers();
                objCUsers.UpdateList(" RoleID = " + pRoleID.ToString() + " WHERE ID = " + pUserID.ToString());
                _result = true;
            }

            return _result;
        }

        [HttpGet, HttpPost]
        public Object[] LoadAll_SecCustomizedUserPrivileges(string pWhereClause)
        {
            CvwSecUserCustomizedTabs objCvwSecUserCustomizedTabs = new CvwSecUserCustomizedTabs();
            objCvwSecUserCustomizedTabs.GetList(pWhereClause);
            return new Object[] { new JavaScriptSerializer().Serialize(objCvwSecUserCustomizedTabs.lstCVarvwSecUserCustomizedTabs) };
        }

        [HttpGet, HttpPost]
        public bool SecUserPrivilegesList_UpdateList(string pSelectedIDsToUpdate, string pCanViewList, string pCanAddList, string pCanEditList, string pCanDeleteList)
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

                CSecUserCustomizedTabs objCSecUserCustomizedTabs = new CSecUserCustomizedTabs();
                checkException = objCSecUserCustomizedTabs.UpdateList(updateClause);

                if (checkException == null) // an exception is caught in the model
                    _result = true;
            }
            return _result;
        }

        [HttpGet, HttpPost]
        public object LoadAll(string pWhereClause)
        {
            CvwUserForms objCvwUserForms = new CvwUserForms();
            objCvwUserForms.GetList(pWhereClause);
            return new JavaScriptSerializer().Serialize(objCvwUserForms.lstCVarvwUserForms);
        }
    }
    public class LoadAllParameters
    {
        public string pFormID { get; set; }
    }
}

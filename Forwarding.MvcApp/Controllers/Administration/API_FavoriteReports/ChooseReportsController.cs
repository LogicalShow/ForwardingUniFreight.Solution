using Forwarding.BLL.Utilities;
using Forwarding.MvcApp.Models.Administration.FavoriteReports.Generated;
using Forwarding.MvcApp.Models.Administration.Security.Generated;
using Forwarding.MvcApp.Models.Administration.Settings.Generated;
using Forwarding.MvcApp.Models.NoAccess.Generated;
using System;
using System.Linq;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;

namespace Forwarding.MvcApp.Controllers.Administration.API_FavoriteReports
{
    public class ChooseReportsController : ApiController
    {

        [HttpGet, HttpPost]
        public Object[] LoadAll(string pWhereClause)
        {
            CvwFormsFavoriteReports objCvwFormsFavoriteReports = new CvwFormsFavoriteReports();
            Int32 _RowCount = 0;
            string whereClause = " Where   UserID= " + WebSecurity.CurrentUserId + " And GroupID in( " + pWhereClause + ")";


            objCvwFormsFavoriteReports.GetListPaging(10, 1, whereClause, "ImageName", out _RowCount);
            if (objCvwFormsFavoriteReports != null && objCvwFormsFavoriteReports.lstCVarvwFormsFavoriteReports.Count > 0)
                foreach (var currentForm in objCvwFormsFavoriteReports.lstCVarvwFormsFavoriteReports)
                {

                    //the next 2 lines to get the decrypted name
                    var value = Forwarding.BLL.Utilities.CEncryptDecrypt.Decrypt(currentForm.EncryptedDescription, true);// currentForm.DecryptedName.ToString();
                    currentForm.FormImageName = Forwarding.MvcApp.App_Resources.App_Resources.ResourceManager.GetString(value);

                    value = Forwarding.BLL.Utilities.CEncryptDecrypt.Decrypt(currentForm.GroupCode, true);
                    //i didnt get it from resources to be in english
                    currentForm.GroupCode = Forwarding.MvcApp.App_Resources.App_Resources.ResourceManager.GetString(value);

                    value = Forwarding.BLL.Utilities.CEncryptDecrypt.Decrypt(currentForm.OriginalGroupName, true);
                    //i didnt get it from resources to be in english
                    currentForm.OriginalGroupName = Forwarding.MvcApp.App_Resources.App_Resources.ResourceManager.GetString(value);
                }


            var pMainGroup = objCvwFormsFavoriteReports.lstCVarvwFormsFavoriteReports
                .Select(s => new {
                    ID = s.GroupID,
                    Name = s.GroupCode
                }).ToList().Distinct();

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[] {
                serializer.Serialize(objCvwFormsFavoriteReports.lstCVarvwFormsFavoriteReports)
                , serializer.Serialize(pMainGroup)
                , _RowCount };
        }

        [HttpGet, HttpPost]
        public Object[] LoadWithPaging(Int32 pPageNumber, Int32 pPageSize, string pSearchKey)
        {
            CvwFormsFavoriteReports objCvwFormsFavoriteReports = new CvwFormsFavoriteReports();

            pSearchKey = (pSearchKey == null ? "" : pSearchKey.Trim().ToUpper());
            Int32 _RowCount = 0;
            string whereClause = " Where  GroupID=1020 and UserID= " + WebSecurity.CurrentUserId ;
                // " Where "
                //+ "Code LIKE '%" + pSearchKey + "%' " + "\n"
                //+ "OR Name LIKE '%" + pSearchKey + "%' " + "\n"
                //+ "OR LocalName LIKE '%" + pSearchKey + "%' " + "\n";

           // objCNoAccessDepartments.GetListPaging(pPageSize, pPageNumber, whereClause, "Name, LocalName", out _RowCount);

            objCvwFormsFavoriteReports.GetListPaging(pPageSize, pPageNumber, whereClause, "ImageName", out _RowCount);
            if (objCvwFormsFavoriteReports != null && objCvwFormsFavoriteReports.lstCVarvwFormsFavoriteReports.Count > 0)
                foreach (var currentForm in objCvwFormsFavoriteReports.lstCVarvwFormsFavoriteReports)
                {

                    //the next 2 lines to get the decrypted name
                    var value = Forwarding.BLL.Utilities.CEncryptDecrypt.Decrypt(currentForm.EncryptedDescription, true);// currentForm.DecryptedName.ToString();
                    currentForm.FormImageName = Forwarding.MvcApp.App_Resources.App_Resources.ResourceManager.GetString(value);

                    value = Forwarding.BLL.Utilities.CEncryptDecrypt.Decrypt(currentForm.GroupCode, true);
                    //i didnt get it from resources to be in english
                    currentForm.GroupCode = Forwarding.MvcApp.App_Resources.App_Resources.ResourceManager.GetString(value);

                    value = Forwarding.BLL.Utilities.CEncryptDecrypt.Decrypt(currentForm.OriginalGroupName, true);
                    //i didnt get it from resources to be in english
                    currentForm.OriginalGroupName = Forwarding.MvcApp.App_Resources.App_Resources.ResourceManager.GetString(value);
                }

            return new Object[] { new JavaScriptSerializer().Serialize(objCvwFormsFavoriteReports.lstCVarvwFormsFavoriteReports), _RowCount };
        }

        [HttpGet, HttpPost]
        public Object[] LoadSubReport(Int32 pMainReport)
        {
            CvwFormsFavoriteReports objCvwFormsFavoriteReports = new CvwFormsFavoriteReports();
            Int32 _RowCount = 0;
            string whereClause = " Where  UserID= " + WebSecurity.CurrentUserId + " and GroupID= " + pMainReport;


            objCvwFormsFavoriteReports.GetListPaging(10, 1, whereClause, "ImageName", out _RowCount);
            if (objCvwFormsFavoriteReports != null && objCvwFormsFavoriteReports.lstCVarvwFormsFavoriteReports.Count > 0)
                foreach (var currentForm in objCvwFormsFavoriteReports.lstCVarvwFormsFavoriteReports)
                {

                    //the next 2 lines to get the decrypted name
                    var value = Forwarding.BLL.Utilities.CEncryptDecrypt.Decrypt(currentForm.EncryptedDescription, true);// currentForm.DecryptedName.ToString();
                    currentForm.FormImageName = Forwarding.MvcApp.App_Resources.App_Resources.ResourceManager.GetString(value);

                    value = Forwarding.BLL.Utilities.CEncryptDecrypt.Decrypt(currentForm.GroupCode, true);
                    //i didnt get it from resources to be in english
                    currentForm.GroupCode = Forwarding.MvcApp.App_Resources.App_Resources.ResourceManager.GetString(value);
                }


            var pSubGroup = objCvwFormsFavoriteReports.lstCVarvwFormsFavoriteReports
                .Select(s => new {
                    ID = s.ID,
                    Name = s.FormImageName
                }).ToList().Distinct();

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[] {
                serializer.Serialize(pSubGroup) };
        }
        [HttpGet, HttpPost]
        public object[] Save([FromBody] SaveData saveData)
        {
            string _MessageReturned = "";
            Exception checkException = null;
            string _UpdateClause = "";
            string _UpdateClauseUserPr = "";
            int _RowCount = 0;
            if (saveData.pID != 0)
            {
                CForms objCForms = new CForms();
                CForms objCFormsNew = new CForms();
                CUserForms objCUserForms = new CUserForms();
                CUserForms objCUserFormsNew = new CUserForms();

                checkException = objCForms.GetList("Where ID=" + saveData.pID);
                if(checkException == null && objCForms.lstCVarForms.Count > 0)
                {
                    checkException = objCFormsNew.GetList("Where GroupID=1020 and ImageName='" + objCForms.lstCVarForms[0].ImageName + "'");
                    objCUserForms.GetList("Where FormID=" + saveData.pID + " And UserID= " + WebSecurity.CurrentUserId);

                    if (objCFormsNew.lstCVarForms.Count > 0)
                    {
                        _UpdateClause = " IsInactive =0 ";
                        _UpdateClause += "WHERE ID=" + objCFormsNew.lstCVarForms[0].ID;
                        checkException = objCFormsNew.UpdateList(_UpdateClause);

                        if (objCUserForms.lstCVarUserForms.Count > 0)
                        {
                            _UpdateClauseUserPr = "CanView = " + ( objCUserForms.lstCVarUserForms[0].CanView ? 1 : 0);
                            _UpdateClauseUserPr += ",CanAdd = " + ( objCUserForms.lstCVarUserForms[0].CanAdd ? 1 : 0);
                            _UpdateClauseUserPr += ",CanEdit = " +( objCUserForms.lstCVarUserForms[0].CanEdit ? 1 : 0);
                            _UpdateClauseUserPr += ",CanDelete = " +( objCUserForms.lstCVarUserForms[0].CanDelete ? 1 : 0);
                            _UpdateClauseUserPr += " Where  FormID=" + objCFormsNew.lstCVarForms[0].ID + " And UserID = " + WebSecurity.CurrentUserId;
                            checkException = objCUserForms.UpdateList(_UpdateClauseUserPr);
                        }
                    }
                    else
                    {
  
                        CVarForms objCVarForms = new CVarForms();
                        objCVarForms = objCForms.lstCVarForms[0];
                        objCVarForms.ID = 0;
                        objCVarForms.GroupID = 1020;
                        objCFormsNew.lstCVarForms.Add(objCVarForms);
                        checkException = objCFormsNew.SaveMethod(objCFormsNew.lstCVarForms);

                        _UpdateClause = " IsInactive =0 ";
                        _UpdateClause += "WHERE ID=" + objCFormsNew.lstCVarForms[0].ID;
                        checkException = objCFormsNew.UpdateList(_UpdateClause);

                       
                        if (objCUserForms.lstCVarUserForms.Count > 0)
                        {
                            _UpdateClauseUserPr = "CanView = " + (objCUserForms.lstCVarUserForms[0].CanView ? 1 : 0);
                            _UpdateClauseUserPr += ",CanAdd = " +( objCUserForms.lstCVarUserForms[0].CanAdd ? 1 : 0);
                            _UpdateClauseUserPr += ",CanEdit = " +( objCUserForms.lstCVarUserForms[0].CanEdit ? 1 : 0);
                            _UpdateClauseUserPr += ",CanDelete = " + (objCUserForms.lstCVarUserForms[0].CanDelete ? 1 : 0);
                            _UpdateClauseUserPr += " Where  FormID=" + objCVarForms.ID + " And UserID = " + WebSecurity.CurrentUserId;
                            checkException = objCUserForms.UpdateList(_UpdateClauseUserPr);
                        }



                    }
                }
            }
            else
                _MessageReturned = "Error";


            if (checkException != null) // an exception is caught in the model
            {
                _MessageReturned = checkException.Message;
            }

            return new object[]
            {
                _MessageReturned
            };
        }

        [HttpGet, HttpPost]
        public bool Delete(String pIDs)
        {
            bool _result = false;
            Exception checkException = null;

                CForms objCForms = new CForms();


             checkException = objCForms.GetList("Where ID in(" + pIDs + ")");
            if (checkException == null && objCForms.lstCVarForms.Count > 0)
            {
                checkException = objCForms.UpdateList(" IsInactive=1 Where ID in(" + pIDs + ")");
            }

             if (checkException != null) // an exception is caught in the model
            {
                _result = false;
            }
            else //deleted successfully
                _result = true;
            return _result;
        }


    } //of class NoAccessDepartmentsController

    public class SaveData
    {
        public Int32 pID { get; set; }

    }
 }

using Forwarding.BLL.Utilities;
using Forwarding.MvcApp.Models.Administration.Settings.Generated;
using Forwarding.MvcApp.Models.NoAccess.Generated;
using System;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;

namespace Forwarding.MvcApp.Controllers.NoAccess
{
    public class NoAccessDepartmentsController : ApiController
    {
        [HttpGet, HttpPost]
        public Object[] LoadAll(string pWhereClause)
        {
            CNoAccessDepartments objCNoAccessDepartments = new CNoAccessDepartments();
            objCNoAccessDepartments.GetList(pWhereClause);
            return new Object[] { new JavaScriptSerializer().Serialize(objCNoAccessDepartments.lstCVarNoAccessDepartments) };
        }

        [HttpGet, HttpPost]
        public Object[] LoadWithPaging(Int32 pPageNumber, Int32 pPageSize, string pSearchKey)
        {
            CNoAccessDepartments objCNoAccessDepartments = new CNoAccessDepartments();
            //objCNoAccessDepartments.GetList(string.Empty); //GetList() fn loads without paging

            pSearchKey = (pSearchKey == null ? "" : pSearchKey.Trim().ToUpper());
            Int32 _RowCount = objCNoAccessDepartments.lstCVarNoAccessDepartments.Count;
            string whereClause = " Where "
                + "Code LIKE '%" + pSearchKey + "%' " + "\n"
                + "OR Name LIKE '%" + pSearchKey + "%' " + "\n"
                + "OR LocalName LIKE '%" + pSearchKey + "%' " + "\n";
            objCNoAccessDepartments.GetListPaging(pPageSize, pPageNumber, whereClause, "Name, LocalName", out _RowCount);
            return new Object[] { new JavaScriptSerializer().Serialize(objCNoAccessDepartments.lstCVarNoAccessDepartments), _RowCount };
        }

        [HttpGet, HttpPost]
        public object[] Save([FromBody] SaveData saveData)
        {
            string _MessageReturned = "";
            Exception checkException = null;

            int _RowCount = 0;
            
            CNoAccessDepartments objCNoAccessDepartments = new CNoAccessDepartments();
            string _UpdateClause = "";
            if (saveData.pID == 0)
            {
                CVarNoAccessDepartments objCVarNoAccessDepartments = new CVarNoAccessDepartments();

                objCVarNoAccessDepartments.Code = saveData.pCode;
                objCVarNoAccessDepartments.Name = saveData.pName;
                objCVarNoAccessDepartments.LocalName = saveData.pName;
                objCVarNoAccessDepartments.Notes = saveData.pNotes;
                objCVarNoAccessDepartments.CreatorUserID = objCVarNoAccessDepartments.ModificatorUserID = WebSecurity.CurrentUserId;
                objCVarNoAccessDepartments.CreationDate = objCVarNoAccessDepartments.ModificationDate = DateTime.Now;

                objCVarNoAccessDepartments.Email = saveData.pEmail;
                objCVarNoAccessDepartments.Email_DisplayName = saveData.pEmail_DisplayName;
                objCVarNoAccessDepartments.Email_Footer = saveData.pEmail_Footer;
                objCVarNoAccessDepartments.Email_Header = saveData.pEmail_Header;
                objCVarNoAccessDepartments.Email_Host = saveData.pEmail_Host;
                objCVarNoAccessDepartments.Email_IsSSL = saveData.pEmail_IsSSL;
                objCVarNoAccessDepartments.Email_Password = (saveData.pEmail_Password == "0" || saveData.pEmail_Password == "" || saveData.pEmail_Password == null) ? "0" : CEncryptDecrypt.Encrypt(saveData.pEmail_Password, true);
                objCVarNoAccessDepartments.Email_Port = saveData.pEmail_Port;

                objCNoAccessDepartments.lstCVarNoAccessDepartments.Add(objCVarNoAccessDepartments);
                checkException = objCNoAccessDepartments.SaveMethod(objCNoAccessDepartments.lstCVarNoAccessDepartments);
            }
            else //Update
            {
                CNoAccessDepartments objCNoAccessDepartments_temp = new CNoAccessDepartments();
                objCNoAccessDepartments_temp.GetListPaging(999999, 1, "WHERE 1=1", "ID", out _RowCount);
                var _DefaultEmailPassword = objCNoAccessDepartments_temp.lstCVarNoAccessDepartments[0].Email_Password;

                _UpdateClause = "Code=N'"+ saveData.pCode + "'" + "\n";
                _UpdateClause += ",Name=N'" + saveData.pName + "'" + "\n";
                _UpdateClause += ",LocalName=N'" + saveData.pName + "'" + "\n";
                _UpdateClause += ",Notes=" + (saveData.pNotes == "0" ? "NULL" : ("N'" + saveData.pNotes + "'")) + "\n";

                _UpdateClause += ",Email=" + (saveData.pEmail == "0" ? "NULL" : ("N'" + saveData.pEmail + "'")) + "\n";
                if (saveData.pEmail_Password == "0" || saveData.pEmail_Password == "" || saveData.pEmail_Password == null)
                {
                    _UpdateClause += " , Email_Password = " + ((_DefaultEmailPassword == "0" || _DefaultEmailPassword == "" || _DefaultEmailPassword == null) ? " N'' " : "N'" + _DefaultEmailPassword + "'");
                }
                else
                {
                    _UpdateClause += " , Email_Password = " + ((saveData.pEmail_Password == "0" || saveData.pEmail_Password == "" || saveData.pEmail_Password == null) ? " N'' " : "N'" + CEncryptDecrypt.Encrypt(saveData.pEmail_Password, true) + "'");
                }
                _UpdateClause += " , Email_DisplayName = " + (saveData.pEmail_DisplayName == "0" ? " N'' " : "N'" + saveData.pEmail_DisplayName + "'");
                _UpdateClause += " , Email_Host = " + (saveData.pEmail_Host == "0" ? " N'' " : "N'" + saveData.pEmail_Host + "'");
                _UpdateClause += " , Email_Port = " + (saveData.pEmail_Port == 0 ? " 0 " : "" + saveData.pEmail_Port + "");
                _UpdateClause += " , Email_IsSSL = " + (saveData.pEmail_IsSSL ? " 1 " : " 0") + " \n";
                _UpdateClause += " , Email_Header = " + (saveData.pEmail_Header == "0" ? " N'' " : "N'" + saveData.pEmail_Header + "'");
                _UpdateClause += " , Email_Footer = " + (saveData.pEmail_Footer == "0" ? " N'' " : "N'" + saveData.pEmail_Footer + "'");

                _UpdateClause += ",ModificatorUserID=" + WebSecurity.CurrentUserId + "\n";
                _UpdateClause += ",ModificationDate = GETDATE()" + "\n";
                _UpdateClause += "WHERE ID=" + saveData.pID;
                checkException = objCNoAccessDepartments.UpdateList(_UpdateClause);
            }
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
        public bool Delete(String pNoAccessDepartmentsIDs)
        {
            bool _result = false;
            CNoAccessDepartments objCNoAccessDepartments = new CNoAccessDepartments();
            foreach (var currentID in pNoAccessDepartmentsIDs.Split(','))
            {
                objCNoAccessDepartments.lstDeletedCPKNoAccessDepartments.Add(new CPKNoAccessDepartments() { ID = Int32.Parse(currentID.Trim()) });
            }

            Exception checkException = objCNoAccessDepartments.DeleteItem(objCNoAccessDepartments.lstDeletedCPKNoAccessDepartments);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("DELETE")) // some or all of the rows were not deleted due to dependencies
                    _result = false;
            }
            else //deleted successfully
                _result = true;
            return _result;
        }

        #region DepartmentCharge
        [HttpGet, HttpPost]
        public Object[] DepartmentCharge_LoadDepartmentCharges(string pWhereClauseDepartmentCharge)
        {
            CDepartmentCharge objCDepartmentCharge = new CDepartmentCharge();
            Int32 _RowCount = 0;
            objCDepartmentCharge.GetListPaging(999999, 1, pWhereClauseDepartmentCharge, "ID", out _RowCount);
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[] { serializer.Serialize(objCDepartmentCharge.lstCVarDepartmentCharge) };
        }

        [HttpGet, HttpPost]
        public Object[] DepartmentCharge_Save([FromBody] DepartmentChargeParamaters departmentChargeParamaters)
        {
            Int32 pDepartmentID = departmentChargeParamaters.pDepartmentID;
            string pSelectedChargeTypeIDs = departmentChargeParamaters.pSelectedChargeTypeIDs;
            string _MessageReturned = "";
            Exception checkException = null;
            CDepartmentCharge objCDepartmentCharge = new CDepartmentCharge();
            var _ArrSelectedChargeTypeIDs = pSelectedChargeTypeIDs.Split(',');
            checkException = objCDepartmentCharge.DeleteList("WHERE DepartmentID=" + pDepartmentID 
                + (pSelectedChargeTypeIDs != "0" ? (" AND ChargeTypeID NOT IN(" + pSelectedChargeTypeIDs + ")") : "") //if no Charges selected then delete all for that department
                );
            for (int i = 0; i < _ArrSelectedChargeTypeIDs.Length; i++)
            {
                if (_ArrSelectedChargeTypeIDs[i] != "0")
                {
                    CVarDepartmentCharge objCVarDepartmentCharge = new CVarDepartmentCharge();
                    objCVarDepartmentCharge.DepartmentID = pDepartmentID;
                    objCVarDepartmentCharge.ChargeTypeID = int.Parse(_ArrSelectedChargeTypeIDs[i]);
                    CDepartmentCharge objCDepartmentCharge_Temp = new CDepartmentCharge();
                    objCDepartmentCharge_Temp.lstCVarDepartmentCharge.Add(objCVarDepartmentCharge);
                    checkException = objCDepartmentCharge_Temp.SaveMethod(objCDepartmentCharge_Temp.lstCVarDepartmentCharge);
                }
            }
            return new Object[] {
                _MessageReturned
            };
        }
        #endregion DepartmentCharge

    } //of class NoAccessDepartmentsController

    public class SaveData
    {
        public Int32 pID { get; set; }
        public String pCode { get; set; }
        public String pName { get; set; }
        public String pNotes { get; set; }
        public String pEmail { get; set; }
        public string pEmail_Password { get; set; }
        public string pEmail_DisplayName { get; set; }
        public string pEmail_Host { get; set; }
        public Int32 pEmail_Port { get; set; }
        public bool pEmail_IsSSL { get; set; }
        public string pEmail_Header { get; set; }
        public string pEmail_Footer { get; set; }
    }

    public class DepartmentChargeParamaters
    {
        public Int32 pDepartmentID { get; set; }
        public String pSelectedChargeTypeIDs { get; set; }

    }  }

using Forwarding.MvcApp.Models.Accounting.MasterData.Customized;
using Forwarding.MvcApp.Models.Accounting.MasterData.Generated;
using Forwarding.MvcApp.Models.Administration.Security.Generated;
using Forwarding.MvcApp.Models.Customized;
using Forwarding.MvcApp.Models.SL.SL_MasterData.Generated;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;

namespace Forwarding.MvcApp.Controllers.MasterData.API_Invoicing
{
    public class SL_SalesManController : ApiController
    {
        
        [HttpGet, HttpPost]
        //sherif: to be used in select boxes
        public Object[] LoadAll(string pWhereClause)
        {
            CvwSL_SalesMan objCvwCustody = new CvwSL_SalesMan();
            objCvwCustody.GetList(pWhereClause);
            return new Object[] { new JavaScriptSerializer().Serialize(objCvwCustody.lstCVarvwSL_SalesMan) };
        }

        [HttpGet, HttpPost]
        public Object[] LoadWithPaging(Int32 pPageNumber, Int32 pPageSize, string pSearchKey)
        {
            CvwSL_SalesMan objCvwCustody = new CvwSL_SalesMan();
            //objCCustody.GetList(string.Empty); //GetList() fn loads without paging



            pSearchKey = (pSearchKey == null ? "" : pSearchKey.Trim().ToUpper());
            Int32 _RowCount = objCvwCustody.lstCVarvwSL_SalesMan.Count;
            string whereClause = " Where Code LIKE N'%" + pSearchKey + "%' "
                + " OR Name LIKE N'%" + pSearchKey + "%' "
                + " OR LocalName LIKE N'%" + pSearchKey + "%' ";
            objCvwCustody.GetListPaging(pPageSize, pPageNumber, whereClause, "Name", out _RowCount);


            return new Object[] { new JavaScriptSerializer().Serialize(objCvwCustody.lstCVarvwSL_SalesMan), _RowCount };
        }

        [HttpGet, HttpPost]
        public Object[] GetUsers(int type)
        {
            int _RowCount1 = 0;
           CUsers objCUsers = new CUsers();

            if (type==1)
            {
                objCUsers.GetListPaging(999999, 1, "WHERE 1=1", "ID", out _RowCount1);

            }
            else
            {
                objCUsers.GetListPaging(999999, 1, "WHERE id NOT IN(SELECT c.UserID FROM Custody AS c WHERE c.UserID IS NOT null)", "ID", out _RowCount1);
            }


            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] { serializer.Serialize(objCUsers.lstCVarUsers) };

        }

        [HttpGet, HttpPost]
        public bool Insert(string pName, string pLocalName, string pJob, string pAddress, string pMobile, string pPhone, string pNotes
            , Int32 pAccountID, Int32 pSubAccountID, Int32 pCostCenterID, Int32 pSubAccountGroupID, Int32 pUserID)
        {
            bool _result = false;

            CVarSL_SalesMan objCVarCustody = new CVarSL_SalesMan();

            objCVarCustody.Name = pName.ToUpper();
            objCVarCustody.LocalName = pLocalName;
            objCVarCustody.Job = pJob;
            objCVarCustody.Address = pAddress;
            objCVarCustody.Mobile = pMobile;
            objCVarCustody.Phone = pPhone;
            objCVarCustody.Notes = pNotes;

            objCVarCustody.AccountID = pAccountID;
            objCVarCustody.SubAccountID = pSubAccountID;
            objCVarCustody.CostCenterID = pCostCenterID;
            objCVarCustody.SubAccountGroupID = pSubAccountGroupID;
            objCVarCustody.UserID = pUserID;

            objCVarCustody.CreatorUserID = objCVarCustody.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarCustody.CreationDate = objCVarCustody.ModificationDate = DateTime.Now;

            CSL_SalesMan objCCustody = new CSL_SalesMan();
            objCCustody.lstCVarSL_SalesMan.Add(objCVarCustody);
            Exception checkException = objCCustody.SaveMethod(objCCustody.lstCVarSL_SalesMan);
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
                if (pAccountID != 0 && pSubAccountGroupID != 0 && pSubAccountID == 0)
                {
                    #region Get data to insert
                    CA_SubAccounts objCA_SubAccounts = new CA_SubAccounts();
                    checkException = objCA_SubAccounts.GetListPaging(9999, 1, "WHERE ID = " + pSubAccountGroupID.ToString(), "ID", out _RowCount);
                    CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
                    string pNewCode = objCCustomizedDBCall.CallStringFunction("SELECT [dbo].A_SubAccounts_GetCode(" + (pSubAccountGroupID == 0 ? "null" : pSubAccountGroupID.ToString()) + ") AS Code");
                    #endregion Get data to insert
                    #region Insert
                    CVarA_SubAccounts objCVarA_SubAccounts = new CVarA_SubAccounts();
                    objCVarA_SubAccounts.SubAccount_Number = (objCA_SubAccounts.lstCVarA_SubAccounts[0].RealSubAccountCode + pNewCode).PadRight(21, '0');
                    objCVarA_SubAccounts.SubAccount_Name = pName.Trim().ToUpper();
                    objCVarA_SubAccounts.SubAccount_EnName = pName.Trim().ToUpper();
                    objCVarA_SubAccounts.Parent_ID = pSubAccountGroupID;
                    objCVarA_SubAccounts.IsMain = false;
                    objCVarA_SubAccounts.SubAccLevel = objCA_SubAccounts.lstCVarA_SubAccounts[0].SubAccLevel + 1;
                    objCVarA_SubAccounts.RealSubAccountCode = objCA_SubAccounts.lstCVarA_SubAccounts[0].RealSubAccountCode + pNewCode;
                    objCVarA_SubAccounts.User_ID = WebSecurity.CurrentUserId;
                    objCA_SubAccounts.lstCVarA_SubAccounts.Add(objCVarA_SubAccounts);
                    checkException = objCA_SubAccounts.SaveMethod(objCA_SubAccounts.lstCVarA_SubAccounts);
                    if (checkException == null)
                    {
                        _result = true;
                        int pNewSupAccountID = objCVarA_SubAccounts.ID;
                        //CallCustomizedSP
                        objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "A_SubAccounts", pNewSupAccountID, "AutoInsert");
                        //Set Parent.IsMain=true
                        objCA_SubAccounts.UpdateList("IsMain=1 WHERE ID=" + pSubAccountGroupID.ToString());
                        #region add Details if exists
                        CA_SubAccounts_Details objCA_SubAccounts_Details = new CA_SubAccounts_Details(); //get the parent details
                        checkException = objCA_SubAccounts_Details.GetListPaging(9999, 1, "WHERE SubAccount_ID = " + pSubAccountGroupID.ToString(), "SubAccount_ID", out _RowCount);
                        for (int i = 0; i < objCA_SubAccounts_Details.lstCVarA_SubAccounts_Details.Count; i++)
                        {
                            //this is insert, so i am sure i ve no children to link accounts to, ALSO I don't need to delete because they are new
                            objCCustomizedDBCall.SP_A_SubAccounts_Details("SP_A_SubAccounts_Details", "I", pNewSupAccountID, objCA_SubAccounts_Details.lstCVarA_SubAccounts_Details[i].Account_ID, false);
                        }
                        #endregion add Details if exists
                        //Update Customer SubaccountID
                        objCCustody.UpdateList("SubAccountID=" + objCVarA_SubAccounts.ID + " WHERE ID=" + objCVarCustody.ID);
                    }
                    #endregion Insert
                }
                #endregion Create SubAccount
            }
            return _result;
        }

        [HttpGet, HttpPost]
        public bool Update(Int32 pID, string pName, string pLocalName, string pJob, string pAddress, string pMobile, string pPhone, string pNotes
            , Int32 pAccountID, Int32 pSubAccountID, Int32 pCostCenterID, Int32 pSubAccountGroupID, Int32 pUserID)
        {
            bool _result = false;

            CVarSL_SalesMan objCVarCustody = new CVarSL_SalesMan();

            //the next 4 lines to get the CreatorUserID and CreationDate and set them as they were entered before
            CSL_SalesMan objCGetCreationInformation = new CSL_SalesMan();
            objCGetCreationInformation.GetItem(pID);
            objCVarCustody.CreatorUserID = objCGetCreationInformation.lstCVarSL_SalesMan[0].CreatorUserID;
            objCVarCustody.CreationDate = objCGetCreationInformation.lstCVarSL_SalesMan[0].CreationDate;
            objCVarCustody.Code = objCGetCreationInformation.lstCVarSL_SalesMan[0].Code;

            objCVarCustody.ID = pID;
            objCVarCustody.Name = pName.ToUpper();
            objCVarCustody.LocalName = pLocalName;
            objCVarCustody.Job = pJob;
            objCVarCustody.Address = pAddress;
            objCVarCustody.Mobile = pMobile;
            objCVarCustody.Phone = pPhone;
            objCVarCustody.Notes = pNotes;
            objCVarCustody.UserID = pUserID;

            objCVarCustody.AccountID = pAccountID;
            objCVarCustody.SubAccountID = pSubAccountID;
            objCVarCustody.CostCenterID = pCostCenterID;
            objCVarCustody.SubAccountGroupID = pSubAccountGroupID;

            objCVarCustody.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarCustody.ModificationDate = DateTime.Now;

            CSL_SalesMan objCCustody = new CSL_SalesMan();
            objCCustody.lstCVarSL_SalesMan.Add(objCVarCustody);
            Exception checkException = objCCustody.SaveMethod(objCCustody.lstCVarSL_SalesMan);
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
                if (pAccountID != 0 && pSubAccountGroupID != 0 && pSubAccountID == 0)
                {
                    #region Get data to insert
                    CA_SubAccounts objCA_SubAccounts = new CA_SubAccounts();
                    checkException = objCA_SubAccounts.GetListPaging(9999, 1, "WHERE ID = " + pSubAccountGroupID.ToString(), "ID", out _RowCount);
                    CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
                    string pNewCode = objCCustomizedDBCall.CallStringFunction("SELECT [dbo].A_SubAccounts_GetCode(" + (pSubAccountGroupID == 0 ? "null" : pSubAccountGroupID.ToString()) + ") AS Code");
                    #endregion Get data to insert
                    #region Insert
                    CVarA_SubAccounts objCVarA_SubAccounts = new CVarA_SubAccounts();
                    objCVarA_SubAccounts.SubAccount_Number = (objCA_SubAccounts.lstCVarA_SubAccounts[0].RealSubAccountCode + pNewCode).PadRight(21, '0');
                    objCVarA_SubAccounts.SubAccount_Name = pName.Trim().ToUpper();
                    objCVarA_SubAccounts.SubAccount_EnName = pName.Trim().ToUpper();
                    objCVarA_SubAccounts.Parent_ID = pSubAccountGroupID;
                    objCVarA_SubAccounts.IsMain = false;
                    objCVarA_SubAccounts.SubAccLevel = objCA_SubAccounts.lstCVarA_SubAccounts[0].SubAccLevel + 1;
                    objCVarA_SubAccounts.RealSubAccountCode = objCA_SubAccounts.lstCVarA_SubAccounts[0].RealSubAccountCode + pNewCode;
                    objCVarA_SubAccounts.User_ID = WebSecurity.CurrentUserId;
                    objCA_SubAccounts.lstCVarA_SubAccounts.Add(objCVarA_SubAccounts);
                    checkException = objCA_SubAccounts.SaveMethod(objCA_SubAccounts.lstCVarA_SubAccounts);
                    if (checkException == null)
                    {
                        _result = true;
                        int pNewSupAccountID = objCVarA_SubAccounts.ID;
                        //CallCustomizedSP
                        objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "A_SubAccounts", pNewSupAccountID, "AutoInsert");
                        //Set Parent.IsMain=true
                        objCA_SubAccounts.UpdateList("IsMain=1 WHERE ID=" + pSubAccountGroupID.ToString());
                        #region add Details if exists
                        CA_SubAccounts_Details objCA_SubAccounts_Details = new CA_SubAccounts_Details(); //get the parent details
                        checkException = objCA_SubAccounts_Details.GetListPaging(9999, 1, "WHERE SubAccount_ID = " + pSubAccountGroupID.ToString(), "SubAccount_ID", out _RowCount);
                        for (int i = 0; i < objCA_SubAccounts_Details.lstCVarA_SubAccounts_Details.Count; i++)
                        {
                            //this is insert, so i am sure i ve no children to link accounts to, ALSO I don't need to delete because they are new
                            objCCustomizedDBCall.SP_A_SubAccounts_Details("SP_A_SubAccounts_Details", "I", pNewSupAccountID, objCA_SubAccounts_Details.lstCVarA_SubAccounts_Details[i].Account_ID, false);
                        }
                        #endregion add Details if exists
                        //Update Customer SubaccountID
                        objCCustody.UpdateList("SubAccountID=" + objCVarA_SubAccounts.ID + " WHERE ID=" + objCVarCustody.ID);
                    }
                    #endregion Insert
                }
                #endregion Create SubAccount
            }
            return _result;
        }

        [HttpGet, HttpPost]
        public bool Delete(String pSL_SalesManIDs)
        {
            bool _result = false;
            CSL_SalesMan objCCustody = new CSL_SalesMan();
            foreach (var currentID in pSL_SalesManIDs.Split(','))
            {
                objCCustody.lstDeletedCPKSL_SalesMan.Add(new CPKSL_SalesMan() { ID = Int32.Parse(currentID.Trim()) });
            }

            Exception checkException = objCCustody.DeleteItem(objCCustody.lstDeletedCPKSL_SalesMan);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("DELETE")) // some or all of the rows were not deleted due to dependencies
                    _result = false;
            }
            else //deleted successfully
                _result = true;
            return _result;
        }
    }
}

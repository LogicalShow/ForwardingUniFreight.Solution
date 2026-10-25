using Forwarding.MvcApp.Models.Accounting.MasterData.Customized;
using Forwarding.MvcApp.Models.Accounting.MasterData.Generated;
using Forwarding.MvcApp.Models.Administration.Settings.Generated;
using Forwarding.MvcApp.Models.Customized;
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
    public class ChartOfLinkingAccountsController : ApiController
    {
        [HttpGet, HttpPost]
        public Object[] LoadSubAccountDetails(string pLanguage, string pWhereClauseSubAccountDetails, string pOrderBy)
        {
            int _RowCount = 0;
            Exception checkException = null;

            CvwLinkedSubAccounts objCvwLinkedSubAccounts = new CvwLinkedSubAccounts();
            checkException = objCvwLinkedSubAccounts.GetListPaging(99999, 1, pWhereClauseSubAccountDetails, pOrderBy, out _RowCount);
            return new Object[] { 
                new JavaScriptSerializer().Serialize(objCvwLinkedSubAccounts.lstCVarvwLinkedSubAccounts) 
                , _RowCount
            };
        }
        [HttpGet, HttpPost]
        public Object[] FillUpdateSubAccount(string pID)
        {
            int _RowCount = 0;
            Exception checkException = null;

            CvwLinkedSubAccounts objCvwLinkedSubAccounts = new CvwLinkedSubAccounts();
            checkException = objCvwLinkedSubAccounts.GetListPaging(9999, 1, " WHERE IsMain=0 AND Account_ID= " + pID + " ", " Name ", out _RowCount);
            return new Object[] {
                new JavaScriptSerializer().Serialize(objCvwLinkedSubAccounts.lstCVarvwLinkedSubAccounts)
                , _RowCount
            };
        }

        [HttpGet, HttpPost]
        public Object[] LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned(
            bool pIsLoadArrayOfObjects, string pLanguage, Int32 pPageNumber, Int32 pPageSize, string pWhereClause
            , string pOrderBy)
        {
            int _RowCount = 0;
            Exception checkException = null;

            CvwA_Accounts objCvwA_Accounts = new CvwA_Accounts();
            checkException = objCvwA_Accounts.GetListPaging(9999, 1, "Where IsMain=0", (pLanguage == "en" ? "EnName" : "Name"), out _RowCount); //to be selected as details items
            CA_SubAccounts objCA_SubAccounts = new CA_SubAccounts();
            checkException = objCA_SubAccounts.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);
            return new Object[] { 
                new JavaScriptSerializer().Serialize(objCA_SubAccounts.lstCVarA_SubAccounts) 
                , _RowCount
                , new JavaScriptSerializer().Serialize(objCvwA_Accounts.lstCVarvwA_Accounts) //pAccounts = pData[2] to be selected as details items
            };
        }

        [HttpGet, HttpPost]
        public Object[] GetModalData(Int32 pID)
        {
            int _RowCount = 0;
            Exception checkException = null;
            CA_SubAccounts_Details objCA_SubAccounts_Details = new CA_SubAccounts_Details(); //get the selected items if any
            checkException = objCA_SubAccounts_Details.GetListPaging(9999, 1, "WHERE SubAccount_ID = " + pID.ToString(), "SubAccount_ID", out _RowCount);
            CA_SubAccounts objCA_SubAccounts = new CA_SubAccounts();
            checkException = objCA_SubAccounts.GetListPaging(9999, 1, "WHERE ID = " + pID.ToString(), "ID", out _RowCount);
            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
            string pNewCode = objCCustomizedDBCall.CallStringFunction("SELECT [dbo].A_SubAccounts_GetCode(" + (pID == 0 ? "null" : pID.ToString()) + ") AS Code");
            return new object[] {
                pID > 0 ? new JavaScriptSerializer().Serialize(objCA_SubAccounts.lstCVarA_SubAccounts[0]) : null //pSubAccountFields = pData[0] in case of update
                , pNewCode //pNewCode = pData[1]
                , new JavaScriptSerializer().Serialize(objCA_SubAccounts_Details.lstCVarA_SubAccounts_Details) //pA_SubAccounts_Details = pData[2]
            };
        }

        [HttpGet, HttpPost]
        public Object[] Save(Int32 pID, string pSubAccount_Number, string pSubAccount_Name, string pSubAccount_EnName
            , Int32 pParent_ID, Int32 pSubAccLevel, string pRealSubAccountCode, string pSelectedSubAccountDetailsIDs)
        {
            
            //level 1 always ismain=1
            //any node has children then ismain =1
            //child of parent who not connected then ismain=1

            bool _result = false;
            string pWhereClause = "";
            string pUpdateClause = "";
            var ArrSelectedSubAccountDetailsIDs = pSelectedSubAccountDetailsIDs.Split(',');
            CA_SubAccounts objCA_SubAccounts = new CA_SubAccounts();
            CVarA_SubAccounts objCVarA_SubAccounts = new CVarA_SubAccounts();
            CA_SubAccounts_Details objCA_SubAccounts_Details = new CA_SubAccounts_Details();
            Exception checkException = null;
            int _RowCount = 0;
            Int32 IDBefore = pID;
            Int32 IDBeforeUpdated = 0;
            string SubAccount_NameBeforeUpdated = "";


            #region Insert
            if (pID == 0) //Insert
            {
                checkException = objCA_SubAccounts_Details.GetListPaging(9999, 1, "WHERE SubAccount_ID=" + pParent_ID, "SubAccount_ID", out _RowCount);
                bool IsParentHasDetails = objCA_SubAccounts_Details.lstCVarA_SubAccounts_Details.Count > 0 ? true : false;
                objCVarA_SubAccounts.SubAccount_Number = pSubAccount_Number;
                objCVarA_SubAccounts.SubAccount_Name = pSubAccount_Name;
                objCVarA_SubAccounts.SubAccount_EnName = pSubAccount_EnName;
                objCVarA_SubAccounts.Parent_ID = pParent_ID;
                objCVarA_SubAccounts.IsMain = !IsParentHasDetails;
                objCVarA_SubAccounts.SubAccLevel = pSubAccLevel;
                objCVarA_SubAccounts.RealSubAccountCode = pRealSubAccountCode;
                objCVarA_SubAccounts.User_ID = WebSecurity.CurrentUserId;
                objCA_SubAccounts.lstCVarA_SubAccounts.Add(objCVarA_SubAccounts);
                checkException = objCA_SubAccounts.SaveMethod(objCA_SubAccounts.lstCVarA_SubAccounts);
                if (checkException == null)
                {
                    _result = true;
                    pID = objCVarA_SubAccounts.ID;
                    //CallCustomizedSP
                    CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
                    objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "A_SubAccounts", pID, "I");
                    ////Set Parent.IsMain=true
                    //objCA_SubAccounts.UpdateList("IsMain=1 WHERE ID=" + pParent_ID.ToString());
                    #region add Details if exists
                    if (pSelectedSubAccountDetailsIDs != "0")
                        for (int i = 0; i < ArrSelectedSubAccountDetailsIDs.Length; i++)
                        {
                            //this is insert, so i am sure i ve no children to link accounts to, ALSO I don't need to delete because they are new
                            objCCustomizedDBCall.SP_A_SubAccounts_Details("SP_A_SubAccounts_Details", "I", pID, Int32.Parse(ArrSelectedSubAccountDetailsIDs[i]), !IsParentHasDetails);
                        }
                    #endregion add Details if exists
                    #region add Details of parent if exists
                    objCA_SubAccounts_Details.GetListPaging(9999, 1, "WHERE SubAccount_ID=" + pParent_ID, "SubAccount_ID", out _RowCount);
                    for (int i = 0; i < objCA_SubAccounts_Details.lstCVarA_SubAccounts_Details.Count; i++)
                    {
                        objCCustomizedDBCall.SP_A_SubAccounts_Details("SP_A_SubAccounts_Details", "I", pID, objCA_SubAccounts_Details.lstCVarA_SubAccounts_Details[i].Account_ID, !IsParentHasDetails);
                    }
                    #endregion add Details of parent if exists
                    pWhereClause = "WHERE SubAccLevel=" + pSubAccLevel + (pParent_ID != 0 ? (" AND Parent_ID=" + pParent_ID) : "");
                    objCA_SubAccounts.GetListPaging(9999, 1, pWhereClause, "ID", out _RowCount);
                }
            }
            #endregion Insert
            #region Update
            else //Update
            {
                #region tackIdBefore Updated
                //get ID
                CA_SubAccounts objCA_AcSubAccountsParentID1 = new CA_SubAccounts();
                objCA_AcSubAccountsParentID1.GetList("WHERE ID=" + pID);

                CA_SubAccountsTAX objCA_AcSubAccountsParentID = new CA_SubAccountsTAX();

                if (objCA_AcSubAccountsParentID1.lstCVarA_SubAccounts.Count > 0)
                {
                    objCA_AcSubAccountsParentID.GetList("WHERE SubAccount_Name=N'" + objCA_AcSubAccountsParentID1.lstCVarA_SubAccounts[0].SubAccount_Name + "'");
                    if (objCA_AcSubAccountsParentID.lstCVarA_SubAccounts.Count > 0)
                    {
                        SubAccount_NameBeforeUpdated = objCA_AcSubAccountsParentID.lstCVarA_SubAccounts[0].SubAccount_Name;
                        IDBeforeUpdated = objCA_AcSubAccountsParentID.lstCVarA_SubAccounts[0].ID;


                    }
                }
                #endregion
                bool IsMain = true;
                objCA_SubAccounts.GetList("WHERE ID=" + pID.ToString());
                IsMain = objCA_SubAccounts.lstCVarA_SubAccounts[0].IsMain;
                
                pUpdateClause = "SubAccount_Name=N'" + pSubAccount_Name + "'" + "\n";
                pUpdateClause += ",SubAccount_EnName=N'" + pSubAccount_EnName + "'" + "\n";
                pUpdateClause += "WHERE ID=" + pID + "\n";
                checkException = objCA_SubAccounts.UpdateList(pUpdateClause);
                if (checkException == null)
                {
                    _result = true;
                    //CallCustomizedSP
                    CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
                    objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "A_SubAccounts", Int64.Parse(pID.ToString()), "U");
                    ////Delete details which are leaves and not inherited from parent
                    ////objCA_SubAccounts_Details.DeleteList("WHERE IsMain=0 AND SubAccount_ID=" + pID + " AND Account_ID NOT IN (SELECT Account_ID FROM A_SubAccounts_Details" + " WHERE SubAccount_ID=" + pParent_ID + ")");
                    objCA_SubAccounts_Details.DeleteList("WHERE SubAccount_ID=" + pID + " AND Account_ID NOT IN (SELECT Account_ID FROM A_SubAccounts_Details" + " WHERE SubAccount_ID=" + pParent_ID + ")"); //2nd condition to prevent delete inherited details
                    //add but cannot remove details
                    #region add Details if exists
                    if (pSelectedSubAccountDetailsIDs != "0")
                        for (int i = 0; i < ArrSelectedSubAccountDetailsIDs.Length; i++)
                        {
                            objCCustomizedDBCall.SP_A_SubAccounts_Details("SP_A_SubAccounts_Details", "I", pID, Int32.Parse(ArrSelectedSubAccountDetailsIDs[i]), IsMain);
                            #region add details to children in the next level if exists
                            pWhereClause = "WHERE Parent_ID=" + pID;
                            objCA_SubAccounts.GetListPaging(9999, 1, pWhereClause, "SubAccount_Number", out _RowCount);
                            for (int j = 0; j < objCA_SubAccounts.lstCVarA_SubAccounts.Count; j++)
                            {
                                objCCustomizedDBCall.SP_A_SubAccounts_Details("SP_A_SubAccounts_Details", "I", objCA_SubAccounts.lstCVarA_SubAccounts[j].ID, Int32.Parse(ArrSelectedSubAccountDetailsIDs[i]), false);//because parent has details
                            }
                            #endregion add details to children in the next level if exists
                        }
                    #endregion add Details if exists
                    pWhereClause = "WHERE ID=" + pID;
                    objCA_SubAccounts.GetListPaging(9999, 1, pWhereClause, "SubAccount_Number", out _RowCount);
                }
            }
            #endregion Update

            #region Tax
            int _RowCount2 = 0;
            CA_SubAccountsTAX objCA_SubAccountsTax = new CA_SubAccountsTAX();
            CVarA_SubAccountsTAX objCVarA_SubAccountsTax = new CVarA_SubAccountsTAX();
            CA_SubAccounts_DetailsTAX objCA_SubAccounts_DetailsTax = new CA_SubAccounts_DetailsTAX();
            CvwDefaults objCvwDefaults = new CvwDefaults();
            objCvwDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount2); //i am sure i ve just one row isa
            string CompanyName = objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName;
            CA_SubAccountsTAX objCA_AcSubAccountsTAX2 = new CA_SubAccountsTAX();
            objCA_AcSubAccountsTAX2.GetList("WHERE Account_Name=N'" + pSubAccount_Name.Trim().ToUpper() + "'");
            Int32 NewParentID = 0;
            if ((CompanyName == "CHM" || CompanyName == "OCE" || CompanyName == "TRM" || CompanyName == "EGL" || CompanyName == "SWI") && checkException == null)
            {
                #region Insert
                if (IDBefore == 0) //Insert
                {
                    //get ParentID
                    CA_SubAccounts objCA_AcSubAccountsParentID1 = new CA_SubAccounts();
                    objCA_AcSubAccountsParentID1.GetList("WHERE ID=" + pParent_ID);

                    CA_SubAccountsTAX objCA_AcSubAccountsParentID = new CA_SubAccountsTAX();
                    if (objCA_AcSubAccountsParentID1.lstCVarA_SubAccounts.Count>0)
                    {
                        objCA_AcSubAccountsParentID.GetList("WHERE SubAccount_Name=N'" + objCA_AcSubAccountsParentID1.lstCVarA_SubAccounts[0].SubAccount_Name + "'");
                        if (objCA_AcSubAccountsParentID.lstCVarA_SubAccounts.Count > 0)
                        {
                            NewParentID = objCA_AcSubAccountsParentID.lstCVarA_SubAccounts[0].ID;

                        }
                    }
                   
                    ///
                    checkException = objCA_SubAccounts_DetailsTax.GetListPaging(9999, 1, "WHERE SubAccount_ID=" + NewParentID, "SubAccount_ID", out _RowCount);
                    bool IsParentHasDetails = objCA_SubAccounts_DetailsTax.lstCVarA_SubAccounts_Details.Count > 0 ? true : false;
                    objCVarA_SubAccountsTax.SubAccount_Number = pSubAccount_Number;
                    objCVarA_SubAccountsTax.SubAccount_Name = pSubAccount_Name;
                    objCVarA_SubAccountsTax.SubAccount_EnName = pSubAccount_EnName;
                    objCVarA_SubAccountsTax.Parent_ID = NewParentID;
                    objCVarA_SubAccountsTax.IsMain = !IsParentHasDetails;
                    objCVarA_SubAccountsTax.SubAccLevel = pSubAccLevel;
                    objCVarA_SubAccountsTax.RealSubAccountCode = pRealSubAccountCode;
                    objCVarA_SubAccountsTax.User_ID = WebSecurity.CurrentUserId;
                    objCA_SubAccountsTax.lstCVarA_SubAccounts.Add(objCVarA_SubAccountsTax);
                    checkException = objCA_SubAccountsTax.SaveMethod(objCA_SubAccountsTax.lstCVarA_SubAccounts);
                    if (checkException == null)
                    {
                        _result = true;
                        pID = objCVarA_SubAccountsTax.ID;
                        //CallCustomizedSP
                        CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
                        objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "A_SubAccounts", pID, "I");
                        ////Set Parent.IsMain=true
                        //objCA_SubAccounts.UpdateList("IsMain=1 WHERE ID=" + pParent_ID.ToString());
                        #region add Details if exists
                        if (pSelectedSubAccountDetailsIDs != "0")
                            for (int i = 0; i < ArrSelectedSubAccountDetailsIDs.Length; i++)
                            {
                                //get subaccoutID By Name
                                CA_Accounts objCA_SubAccountsGetSubAccountByName = new CA_Accounts();
                                objCA_SubAccountsGetSubAccountByName.GetList("where ID=" + Int32.Parse(ArrSelectedSubAccountDetailsIDs[i]));

                                CA_AccountsTAX objCA_AcSubAccountsGetSubAccountByName = new CA_AccountsTAX();
                                objCA_AcSubAccountsGetSubAccountByName.GetList("WHERE Account_Name=N'" + objCA_SubAccountsGetSubAccountByName.lstCVarA_Accounts[0].Account_Name + "'");

                                if (objCA_AcSubAccountsGetSubAccountByName.lstCVarA_Accounts.Count > 0)
                                {
                                    objCCustomizedDBCall.SP_A_SubAccounts_Details("SP_A_SubAccounts_DetailsTax", "I", pID, objCA_AcSubAccountsGetSubAccountByName.lstCVarA_Accounts[0].ID, !IsParentHasDetails);

                                }
                                //this is insert, so i am sure i ve no children to link accounts to, ALSO I don't need to delete because they are new
                            }
                        #endregion add Details if exists
                        #region add Details of parent if exists
                        objCA_SubAccounts_DetailsTax.GetListPaging(9999, 1, "WHERE SubAccount_ID=" + NewParentID, "SubAccount_ID", out _RowCount);
                        for (int i = 0; i < objCA_SubAccounts_DetailsTax.lstCVarA_SubAccounts_Details.Count; i++)
                        {
                            //get subaccoutID By Name
                            CA_Accounts objCA_SubAccountsGetSubAccountByName = new CA_Accounts();
                            objCA_SubAccountsGetSubAccountByName.GetList("where ID="+ objCA_SubAccounts_DetailsTax.lstCVarA_SubAccounts_Details[i].Account_ID);

                            CA_AccountsTAX objCA_AcSubAccountsGetSubAccountByName = new CA_AccountsTAX();
                            objCA_AcSubAccountsGetSubAccountByName.GetList("WHERE Account_Name=N'" + objCA_SubAccountsGetSubAccountByName.lstCVarA_Accounts[0].Account_Name + "'");

                            if (objCA_AcSubAccountsGetSubAccountByName.lstCVarA_Accounts.Count > 0)
                            {
                                objCCustomizedDBCall.SP_A_SubAccounts_Details("SP_A_SubAccounts_DetailsTax", "I", pID, objCA_AcSubAccountsGetSubAccountByName.lstCVarA_Accounts[0].ID, !IsParentHasDetails);

                            }
                        }
                        #endregion add Details of parent if exists
                        pWhereClause = "WHERE SubAccLevel=" + pSubAccLevel + (NewParentID != 0 ? (" AND Parent_ID=" + NewParentID) : "");
                        objCA_SubAccountsTax.GetListPaging(9999, 1, pWhereClause, "ID", out _RowCount);
                    }
                }
                #endregion Insert
                #region Update
                else //Update
                {
                    bool IsMain = true;

                    //get ID
                    pID = IDBeforeUpdated;



                    objCA_SubAccountsTax.GetList("WHERE SubAccount_Name=N'" + SubAccount_NameBeforeUpdated.ToString()+"'");
                    IsMain = objCA_SubAccountsTax.lstCVarA_SubAccounts[0].IsMain;

                    pUpdateClause = "SubAccount_Name=N'" + pSubAccount_Name + "'" + "\n";
                    pUpdateClause += ",SubAccount_EnName=N'" + pSubAccount_EnName + "'" + "\n";
                    pUpdateClause += "WHERE ID=" + pID + "\n";
                    checkException = objCA_SubAccountsTax.UpdateList(pUpdateClause);
                    if (checkException == null)
                    {
                        _result = true;
                        //CallCustomizedSP
                        CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
                        objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "A_SubAccounts", Int64.Parse(pID.ToString()), "U");
                        ////Delete details which are leaves and not inherited from parent
                        ////objCA_SubAccounts_Details.DeleteList("WHERE IsMain=0 AND SubAccount_ID=" + pID + " AND Account_ID NOT IN (SELECT Account_ID FROM A_SubAccounts_Details" + " WHERE SubAccount_ID=" + pParent_ID + ")");
                        objCA_SubAccounts_DetailsTax.DeleteList("WHERE SubAccount_ID=" + pID + " AND Account_ID NOT IN (SELECT Account_ID FROM A_SubAccounts_Details" + " WHERE SubAccount_ID=" + pParent_ID + ")"); //2nd condition to prevent delete inherited details
                                                                                                                                                                                                                  //add but cannot remove details
                        #region add Details if exists
                        if (pSelectedSubAccountDetailsIDs != "0")
                            for (int i = 0; i < ArrSelectedSubAccountDetailsIDs.Length; i++)
                            {
                                //get subaccoutID By Name
                                CA_Accounts objCA_SubAccountsGetSubAccountByName = new CA_Accounts();
                                objCA_SubAccountsGetSubAccountByName.GetList("where ID=" + Int32.Parse(ArrSelectedSubAccountDetailsIDs[i]));

                                CA_AccountsTAX objCA_AcSubAccountsGetSubAccountByName = new CA_AccountsTAX();
                                objCA_AcSubAccountsGetSubAccountByName.GetList("WHERE Account_Name=N'" + objCA_SubAccountsGetSubAccountByName.lstCVarA_Accounts[0].Account_Name + "'");



                                objCCustomizedDBCall.SP_A_SubAccounts_Details("SP_A_SubAccounts_DetailsTax", "I", pID, objCA_AcSubAccountsGetSubAccountByName.lstCVarA_Accounts[0].ID, IsMain);
                                #region add details to children in the next level if exists
                                pWhereClause = "WHERE Parent_ID=" + pID;
                                objCA_SubAccountsTax.GetListPaging(9999, 1, pWhereClause, "SubAccount_Number", out _RowCount);
                                for (int j = 0; j < objCA_SubAccountsTax.lstCVarA_SubAccounts.Count; j++)
                                {
                                    objCCustomizedDBCall.SP_A_SubAccounts_Details("SP_A_SubAccounts_DetailsTax", "I", objCA_SubAccountsTax.lstCVarA_SubAccounts[j].ID, objCA_AcSubAccountsGetSubAccountByName.lstCVarA_Accounts[0].ID, false);//because parent has details
                                }
                                #endregion add details to children in the next level if exists
                            }
                        #endregion add Details if exists
                        pWhereClause = "WHERE ID=" + pID;
                        objCA_SubAccountsTax.GetListPaging(9999, 1, pWhereClause, "SubAccount_Number", out _RowCount);
                    }
                }
                #endregion Update
            }
            #endregion

            return new object[]
            {
                _result
                , pID
                , new JavaScriptSerializer().Serialize(objCA_SubAccounts.lstCVarA_SubAccounts)
            };
        }

        [HttpGet, HttpPost]
        public object[] Delete(Int32 pIDToDelete, Int32 pParentID, Int32 pLevel)
        {
            bool _result = false;
            int _RowCount = 0;
            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
            Exception checkException = null;
            
            CvwDefaults objCvwDefaults = new CvwDefaults();
            objCvwDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount); //i am sure i ve just one row isa
            string CompanyName = objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName;

            CA_SubAccountsTAX objCA_SubAccountsTax = new CA_SubAccountsTAX();
            CA_SubAccounts_DetailsTAX objCA_SubAccounts_DetailsTax = new CA_SubAccounts_DetailsTAX();
            if (CompanyName == "CHM" || CompanyName == "OCE" || CompanyName == "TRM" || CompanyName == "EGL" || CompanyName == "SWI")
            {
                CA_SubAccounts objCA_AccountsGet = new CA_SubAccounts();
                checkException = objCA_AccountsGet.GetList("WHERE ID=" + pIDToDelete);

                CA_SubAccountsTAX objCA_AccountsTaxset = new CA_SubAccountsTAX();
                objCA_AccountsTaxset.GetList("WHERE SubAccount_Name=N'" + objCA_AccountsGet.lstCVarA_SubAccounts[0].SubAccount_Name + "'");

                string pHasDetails2 = objCCustomizedDBCall.A_SubAccounts_CheckForDelete("A_SubAccounts_CheckForDeleteTax", objCA_AccountsTaxset.lstCVarA_SubAccounts[0].ID);
                if (pHasDetails2 == "0")
                {
                   
                    if (checkException == null)
                        checkException = objCA_SubAccounts_DetailsTax.DeleteList("WHERE SubAccount_ID=" + objCA_AccountsTaxset.lstCVarA_SubAccounts[0].ID);
                    if (checkException == null)
                        checkException = objCA_SubAccountsTax.DeleteList("WHERE ID=" + objCA_AccountsTaxset.lstCVarA_SubAccounts[0].ID);
                    if (checkException == null)
                    {
                        _result = true;
                        //if (pParentID != 0)//Update IsMain in Parent if not Root
                        //{
                        //    //CallCustomizedSP
                        //    objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "A_SubAccounts", pIDToDelete, "D");
                        //    string pUpdateClause = "";
                        //    pUpdateClause = " IsMain = Case " + "\n";
                        //    pUpdateClause += "            WHEN (SELECT COUNT(ID) FROM A_SubAccounts WHERE Parent_ID=" + pParentID.ToString() + ") > 0 THEN CAST(1 AS bit) " + "\n";
                        //    pUpdateClause += "            ELSE CAST(0 AS bit) " + "\n";
                        //    pUpdateClause += "        END " + "\n";
                        //    pUpdateClause += "WHERE ID=" + pParentID.ToString() + "\n";
                        //    objCA_SubAccounts.UpdateList(pUpdateClause);
                        //    string pWhereClause = "WHERE SubAccLevel=" + pLevel + (pParentID != 0 ? (" AND Parent_ID=" + pParentID) : "");
                        //    objCA_SubAccounts.GetListPaging(9999, 1, pWhereClause, "ID", out _RowCount);
                        //}
                    }
                }
            }


            CA_SubAccounts objCA_SubAccounts = new CA_SubAccounts();
            CA_SubAccounts_Details objCA_SubAccounts_Details = new CA_SubAccounts_Details();
            CFA_AssetsSubAccounts objCFA_AssetsSubAccounts = new CFA_AssetsSubAccounts();
            string pHasDetails = objCCustomizedDBCall.A_SubAccounts_CheckForDelete("A_SubAccounts_CheckForDelete", pIDToDelete);
            if (pHasDetails == "0")
            {
                checkException = objCFA_AssetsSubAccounts.DeleteList("WHERE SubAccountID=" + pIDToDelete);
                if (checkException == null)
                    checkException = objCA_SubAccounts_Details.DeleteList("WHERE SubAccount_ID=" + pIDToDelete);
                if (checkException == null)
                    checkException = objCA_SubAccounts.DeleteList("WHERE ID=" + pIDToDelete);
                if (checkException == null)
                {
                    _result = true;
                    //if (pParentID != 0)//Update IsMain in Parent if not Root
                    //{
                    //    //CallCustomizedSP
                    //    objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "A_SubAccounts", pIDToDelete, "D");
                    //    string pUpdateClause = "";
                    //    pUpdateClause = " IsMain = Case " + "\n";
                    //    pUpdateClause += "            WHEN (SELECT COUNT(ID) FROM A_SubAccounts WHERE Parent_ID=" + pParentID.ToString() + ") > 0 THEN CAST(1 AS bit) " + "\n";
                    //    pUpdateClause += "            ELSE CAST(0 AS bit) " + "\n";
                    //    pUpdateClause += "        END " + "\n";
                    //    pUpdateClause += "WHERE ID=" + pParentID.ToString() + "\n";
                    //    objCA_SubAccounts.UpdateList(pUpdateClause);
                    //    string pWhereClause = "WHERE SubAccLevel=" + pLevel + (pParentID != 0 ? (" AND Parent_ID=" + pParentID) : "");
                    //    objCA_SubAccounts.GetListPaging(9999, 1, pWhereClause, "ID", out _RowCount);
                    //}
                }
            }
            return new object[]
            {
                _result
                , new JavaScriptSerializer().Serialize(objCA_SubAccounts.lstCVarA_SubAccounts)
            };
        }

    }
}

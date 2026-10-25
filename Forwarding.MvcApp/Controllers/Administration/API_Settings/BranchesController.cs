using Forwarding.MvcApp.Models.Administration.Security.Generated;
using Forwarding.MvcApp.Models.Administration.Settings.Generated;
using Forwarding.MvcApp.Models.FA.Generated;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;

namespace Forwarding.MvcApp.Controllers.Administration.API_Settings
{
    public class BranchesController : ApiController
    {
        //[Route("/api/Branches/LoadAll")]
        [HttpGet, HttpPost]
        //sherif: to be used in select boxes
        public Object[] LoadAll(string pWhereClause)
        {
            CvwBranches objCvwBranches = new CvwBranches();
            objCvwBranches.GetList(pWhereClause);
            return new Object[] { new JavaScriptSerializer().Serialize(objCvwBranches.lstCVarvwBranches) };
        }

        // [Route("/api/Branches/LoadWithPaging/{pPageNumber}/{pPageSize}")]
        [HttpGet, HttpPost]
        public Object[] LoadWithPaging(Int32 pPageNumber, Int32 pPageSize, string pSearchKey)
        {
            CvwBranches objCvwBranches = new CvwBranches();
            //objCvwBranches.GetList(string.Empty);
            Int32 _RowCount = 0;// objCvwBranches.lstCVarBranches.Count;

            pSearchKey = (pSearchKey == null ? "" : pSearchKey.Trim().ToUpper());
            string whereClause = " Where Code LIKE '%" + pSearchKey + "%' "
                + " OR Name LIKE '%" + pSearchKey + "%' "
                + " OR LocalName LIKE '%" + pSearchKey + "%' ";
                //+ " OR RegionCode LIKE '%" + pSearchKey + "%' "
                //+ " OR RegionName LIKE '%" + pSearchKey + "%' "

            objCvwBranches.GetListPaging(pPageSize, pPageNumber, whereClause, " Code ", out _RowCount);

            return new Object[] { new JavaScriptSerializer().Serialize(objCvwBranches.lstCVarvwBranches), _RowCount };
        }

        // [Route("/api/Branches/Insert/{pCode}/{pModificatorUser}/{pLocalName}}")]
        [HttpGet, HttpPost]
        public bool Insert(DateTime pFA_LastDepreciationDate , Int32 pCountryID, Int32 pCityID, string pCode, string pName, bool pIsInactive, bool pIsDepartement, string pLocalName = "", string pPhone1 = "", string pPhone2 = "", string pMobile1 = "", string pFax = "", string pAddress = "", string pZipCode = "", string pNotes = "", string pAliasName = "0")
        {
            bool _result = false;

            CVarBranches objCVarBranches = new CVarBranches();

            objCVarBranches.CountryID = pCountryID;
            objCVarBranches.CityID = pCityID;

            objCVarBranches.Code = (pCode == null ? "" : pCode.Trim().ToUpper());
            objCVarBranches.Name = (pName == null ? "" : pName.Trim().ToUpper());
            objCVarBranches.LocalName = (pLocalName == null ? "" : pLocalName.ToUpper());
            objCVarBranches.Phone1 = (pPhone1 == null ? "" : pPhone1.Trim().ToUpper());
            objCVarBranches.Phone2 = (pPhone2 == null ? "" : pPhone2.Trim().ToUpper());
            objCVarBranches.Mobile1 = (pMobile1 == null ? "" : pMobile1.Trim().ToUpper());
            objCVarBranches.Fax = (pFax == null ? "" : pFax.Trim().ToUpper());
            objCVarBranches.Address = (pAddress == null ? "" : pAddress.Trim().ToUpper());
            objCVarBranches.ZipCode = (pZipCode == null ? "" : pZipCode.Trim().ToUpper());
            objCVarBranches.IsInactive = pIsInactive;
            objCVarBranches.isDepartement = pIsDepartement;

            objCVarBranches.Notes = (pNotes == null ? "" : pNotes.Trim().ToUpper());
            objCVarBranches.FA_LastDepreciationDate = pFA_LastDepreciationDate;
            objCVarBranches.CreatorUserID = objCVarBranches.ModificatorUserID = WebSecurity.CurrentUserId; ;
            objCVarBranches.CreationDate = objCVarBranches.ModificationDate = DateTime.Now;
            objCVarBranches.AliasName = (pAliasName == null ? "0" : pAliasName.Trim().ToUpper());

            CBranches objCBranches = new CBranches();
            objCBranches.lstCVarBranches.Add(objCVarBranches);
            Exception checkException = objCBranches.SaveMethod(objCBranches.lstCVarBranches);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else //not unique
                _result = true;
            return _result;
        }

        // [Route("/api/Branches/Update/{pID}/{pCode}/{pName}/{pLocalName}")]
        [HttpGet, HttpPost]
        public bool Update(Int32 pID, DateTime pFA_LastDepreciationDate , Int32 pCountryID, Int32 pCityID, string pCode, string pName, bool pIsInactive, bool pIsDepartement, string pLocalName = "", string pPhone1 = "", string pPhone2 = "", string pMobile1 = "", string pFax = "", string pAddress = "", string pZipCode = "", string pNotes = "", string pAliasName = "0")
        {
            bool _result = false;

            CVarBranches objCVarBranches = new CVarBranches();

            //the next 4 lines to get the CreatorUserID and CreationDate and set them as they were entered before
            CBranches objCGetCreationInformation = new CBranches();
            objCGetCreationInformation.GetItem(pID);
            objCVarBranches.CreatorUserID = objCGetCreationInformation.lstCVarBranches[0].CreatorUserID;
            objCVarBranches.CreationDate = objCGetCreationInformation.lstCVarBranches[0].CreationDate;

            objCVarBranches.ID = pID;

            objCVarBranches.CountryID = pCountryID;
            objCVarBranches.CityID = pCityID;

            objCVarBranches.Code = (pCode == null ? "" : pCode.Trim().ToUpper());
            objCVarBranches.Name = (pName == null ? "" : pName.Trim().ToUpper());
            objCVarBranches.LocalName = (pLocalName == null ? "" : pLocalName.ToUpper());
            objCVarBranches.Phone1 = (pPhone1 == null ? "" : pPhone1.Trim().ToUpper());
            objCVarBranches.Phone2 = (pPhone2 == null ? "" : pPhone2.Trim().ToUpper());
            objCVarBranches.Mobile1 = (pMobile1 == null ? "" : pMobile1.Trim().ToUpper());
            objCVarBranches.Fax = (pFax == null ? "" : pFax.Trim().ToUpper());
            objCVarBranches.Address = (pAddress == null ? "" : pAddress.Trim().ToUpper());
            objCVarBranches.ZipCode = (pZipCode == null ? "" : pZipCode.Trim().ToUpper());
            objCVarBranches.IsInactive = pIsInactive;
            objCVarBranches.isDepartement = pIsDepartement;

            objCVarBranches.Notes = (pNotes == null ? "" : pNotes.Trim().ToUpper());

            objCVarBranches.ModificatorUserID = WebSecurity.CurrentUserId; ;
            objCVarBranches.ModificationDate = DateTime.Now;
            objCVarBranches.FA_LastDepreciationDate = pFA_LastDepreciationDate;
            objCVarBranches.AliasName = (pAliasName == null ? "0" : pAliasName.Trim().ToUpper());

            CBranches objCBranches = new CBranches();
            objCBranches.lstCVarBranches.Add(objCVarBranches);
            Exception checkException = objCBranches.SaveMethod(objCBranches.lstCVarBranches);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else //not unique
                _result = true;
            return _result;
        }

        // [Route("/api/Branches/DeleteByID/{pID}")]
        //[HttpGet, HttpPost]
        //public void DeleteByID(Int32 pID)
        //{
        //    CBranches objCBranches = new CBranches();
        //    objCBranches.lstDeletedCPKBranches.Add(new CPKBranches() { ID = pID });
        //    objCBranches.DeleteItem(objCBranches.lstDeletedCPKBranches);
        //}

        // [Route("api/Branches/Delete/{pBranchesIDs}")]
        [HttpGet, HttpPost]
        public bool Delete(String pBranchesIDs)
        {
            bool _result = false;
            CBranches objCBranches = new CBranches();
            foreach (var currentID in pBranchesIDs.Split(','))
            {
                objCBranches.lstDeletedCPKBranches.Add(new CPKBranches() { ID = Int32.Parse(currentID.Trim()) });
            }

            Exception checkException = objCBranches.DeleteItem(objCBranches.lstDeletedCPKBranches);
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
        public Object[] GetBranchUsers(string pBranchID)
        {
            var serialize = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            CvwFA_UserBranches  cvwFA_UserBranches = new CvwFA_UserBranches();
            cvwFA_UserBranches.GetList("where BranchID = " + pBranchID + "");

            CUsers  cUsers = new CUsers();
            cUsers.GetList("where 1 = 1");



            return new Object[] {serialize.Serialize(cvwFA_UserBranches.lstCVarvwFA_UserBranches)
                ,
                serialize.Serialize(cUsers.lstCVarUsers)
            };
        }
        [HttpPost]
        //[ActionName("Update")]
        public object[] UpdateBranchUsers([FromBody] BranchUsers model)
        {
            bool _result = false;
            CVarBranches cVarBranches = new CVarBranches();

            int _RowCount = 0;

            CInsertBranchUsers cInsertBranchUsers = new CInsertBranchUsers();

            var BranchID = int.Parse(model.pID);
            var checkException = cInsertBranchUsers.InsertBranchUsers(BranchID, model.pUsersIDs);



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


    }

    public class BranchUsers
    {
        public string pID { get; set; }
        public string pUsersIDs { get; set; }
    }

    [Serializable]
    public class CPKInsertBranchUsers
    {
        #region "variables"
        #endregion

        #region "Methods"
        #endregion
    }
    [Serializable]
    public partial class CVarInsertBranchUsers : CPKInsertBranchUsers
    {
        //#region "variables"
        //internal Int32 mIsSucsess;

        //#endregion

        //#region "Methods"
        //public Int32 IsSucsess
        //{
        //    get { return mIsSucsess; }
        //    set { mIsSucsess = value; }
        //};

        //#endregion

    }

    public partial class CInsertBranchUsers
    {
        #region "variables"
        /*If "App.Config" isnot exist add it to your Application
		Add this code after <Configuration> tag
		-------------------------------------------------------
		<appsettings>
		<add key="ConnectionString" value="............"/>
		</appsettings>
		-------------------------------------------------------
		where ".........." is connection string to database server*/
        private SqlTransaction tr;
        public List<CVarInsertBranchUsers> lstCVarInsertBranchUsers = new List<CVarInsertBranchUsers>();
        #endregion
        // Merge(string pItemType, string pDuplicateItems, string pDestinationItem)
        #region "Select Methods"
        public Exception InsertBranchUsers(int pBranchID, string pUsersIDs)
        {
            return ExeInsertBranchUsers(pBranchID, pUsersIDs, true);
        }

        private Exception ExeInsertBranchUsers(int pBranchID, string pUsersIDs, Boolean IsList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarInsertBranchUsers.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {

                    //@FromDate DATETIME, @ToDate DATETIME , @WhereClause NVarChar(MAX)
                    Com.Parameters.Add(new SqlParameter("@BranchID ", SqlDbType.Int));
                    Com.Parameters.Add(new SqlParameter("@UsersIDs", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].[InsertBranchUsers]";
                    Com.Parameters[0].Value = pBranchID;
                    Com.Parameters[1].Value = pUsersIDs;

                }
                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                }
                catch (Exception ex)
                {
                    Exp = ex;
                }
                finally
                {
                    if (dr != null)
                    {
                        dr.Close();
                        dr.Dispose();
                    }
                }
                tr.Commit();
            }
            catch (Exception ex)
            {
                Exp = ex;
            }
            finally
            {
                Con.Close();
                Con.Dispose();
            }
            return Exp;
        }


        #endregion
    }
}

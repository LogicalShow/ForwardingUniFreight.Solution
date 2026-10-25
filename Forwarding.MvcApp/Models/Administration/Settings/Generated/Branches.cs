using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.Administration.Settings.Generated
{
    [Serializable]
    public class CPKBranches
    {
        #region "variables"
        private Int32 mID;
        #endregion

        #region "Methods"
        public Int32 ID
        {
            get { return mID; }
            set { mID = value; }
        }
        #endregion
    }
    [Serializable]
    public partial class CVarBranches : CPKBranches
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal String mCode;
        internal String mName;
        internal String mLocalName;
        internal Int32 mCountryID;
        internal Int32 mCityID;
        internal String mPhone1;
        internal String mPhone2;
        internal String mMobile1;
        internal String mFax;
        internal String mAddress;
        internal String mZipCode;
        internal Boolean mIsInactive;
        internal String mNotes;
        internal Int32 mCreatorUserID;
        internal DateTime mCreationDate;
        internal Int32 mModificatorUserID;
        internal DateTime mModificationDate;
        internal DateTime mFA_LastDepreciationDate;
        internal Boolean misDepartement;
        internal String mAliasName;
        #endregion

        #region "Methods"
        public String Code
        {
            get { return mCode; }
            set { mIsChanges = true; mCode = value; }
        }
        public String Name
        {
            get { return mName; }
            set { mIsChanges = true; mName = value; }
        }
        public String LocalName
        {
            get { return mLocalName; }
            set { mIsChanges = true; mLocalName = value; }
        }
        public Int32 CountryID
        {
            get { return mCountryID; }
            set { mIsChanges = true; mCountryID = value; }
        }
        public Int32 CityID
        {
            get { return mCityID; }
            set { mIsChanges = true; mCityID = value; }
        }
        public String Phone1
        {
            get { return mPhone1; }
            set { mIsChanges = true; mPhone1 = value; }
        }
        public String Phone2
        {
            get { return mPhone2; }
            set { mIsChanges = true; mPhone2 = value; }
        }
        public String Mobile1
        {
            get { return mMobile1; }
            set { mIsChanges = true; mMobile1 = value; }
        }
        public String Fax
        {
            get { return mFax; }
            set { mIsChanges = true; mFax = value; }
        }
        public String Address
        {
            get { return mAddress; }
            set { mIsChanges = true; mAddress = value; }
        }
        public String ZipCode
        {
            get { return mZipCode; }
            set { mIsChanges = true; mZipCode = value; }
        }
        public Boolean IsInactive
        {
            get { return mIsInactive; }
            set { mIsChanges = true; mIsInactive = value; }
        }
        public String Notes
        {
            get { return mNotes; }
            set { mIsChanges = true; mNotes = value; }
        }
        public Int32 CreatorUserID
        {
            get { return mCreatorUserID; }
            set { mIsChanges = true; mCreatorUserID = value; }
        }
        public DateTime CreationDate
        {
            get { return mCreationDate; }
            set { mIsChanges = true; mCreationDate = value; }
        }
        public Int32 ModificatorUserID
        {
            get { return mModificatorUserID; }
            set { mIsChanges = true; mModificatorUserID = value; }
        }
        public DateTime ModificationDate
        {
            get { return mModificationDate; }
            set { mIsChanges = true; mModificationDate = value; }
        }
        public DateTime FA_LastDepreciationDate
        {
            get { return mFA_LastDepreciationDate; }
            set { mIsChanges = true; mFA_LastDepreciationDate = value; }
        }
        public Boolean isDepartement
        {
            get { return misDepartement; }
            set { mIsChanges = true; misDepartement = value; }
        }
        public String AliasName
        {
            get { return mAliasName; }
            set { mIsChanges = true; mAliasName = value; }
        }
        #endregion

        #region Functions
        public Boolean GetIsChange()
        {
            return mIsChanges;
        }
        public void SetIsChange(Boolean IsChange)
        {
            mIsChanges = IsChange;
        }
        #endregion
    }

    public partial class CBranches
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
        public List<CVarBranches> lstCVarBranches = new List<CVarBranches>();
        public List<CPKBranches> lstDeletedCPKBranches = new List<CPKBranches>();
        #endregion

        #region "Select Methods"
        public Exception GetList(string WhereClause)
        {
            return DataFill(WhereClause, true);
        }
        public Exception GetListPaging(Int32 PageSize, Int32 PageNumber, string WhereClause, string OrderBy, out Int32 TotalRecords)
        {
            return DataFill(PageSize, PageNumber, WhereClause, OrderBy, out TotalRecords);
        }
        public Exception GetItem(Int32 ID)
        {
            return DataFill(Convert.ToString(ID), false);
        }
        private Exception DataFill(string Param, Boolean IsList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarBranches.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.VarChar));
                    Com.CommandText = "[dbo].GetListBranches";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemBranches";
                    Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int));
                    Com.Parameters[0].Value = Convert.ToInt32(Param);
                }
                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        /*Start DataReader*/
                        CVarBranches ObjCVarBranches = new CVarBranches();
                        ObjCVarBranches.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarBranches.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarBranches.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarBranches.mLocalName = Convert.ToString(dr["LocalName"].ToString());
                        ObjCVarBranches.mCountryID = Convert.ToInt32(dr["CountryID"].ToString());
                        ObjCVarBranches.mCityID = Convert.ToInt32(dr["CityID"].ToString());
                        ObjCVarBranches.mPhone1 = Convert.ToString(dr["Phone1"].ToString());
                        ObjCVarBranches.mPhone2 = Convert.ToString(dr["Phone2"].ToString());
                        ObjCVarBranches.mMobile1 = Convert.ToString(dr["Mobile1"].ToString());
                        ObjCVarBranches.mFax = Convert.ToString(dr["Fax"].ToString());
                        ObjCVarBranches.mAddress = Convert.ToString(dr["Address"].ToString());
                        ObjCVarBranches.mZipCode = Convert.ToString(dr["ZipCode"].ToString());
                        ObjCVarBranches.mIsInactive = Convert.ToBoolean(dr["IsInactive"].ToString());
                        ObjCVarBranches.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarBranches.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarBranches.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarBranches.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarBranches.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarBranches.mFA_LastDepreciationDate = Convert.ToDateTime(dr["FA_LastDepreciationDate"].ToString());
                        ObjCVarBranches.misDepartement = Convert.ToBoolean(dr["isDepartement"].ToString());
                        ObjCVarBranches.mAliasName = Convert.ToString(dr["AliasName"].ToString());
                        lstCVarBranches.Add(ObjCVarBranches);
                    }
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

        private Exception DataFill(Int32 PageSize, Int32 PageNumber, string WhereClause, string OrderBy, out Int32 TotRecs)
        {
            Exception Exp = null;
            TotRecs = 0;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarBranches.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                Com.Parameters.Add(new SqlParameter("@PageSize", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@PageNumber", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.VarChar));
                Com.Parameters.Add(new SqlParameter("@OrderBy", SqlDbType.VarChar));
                Com.CommandText = "[dbo].GetListPagingBranches";
                Com.Parameters[0].Value = PageSize;
                Com.Parameters[1].Value = PageNumber;
                Com.Parameters[2].Value = WhereClause;
                Com.Parameters[3].Value = OrderBy;
                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        /*Start DataReader*/
                        CVarBranches ObjCVarBranches = new CVarBranches();
                        ObjCVarBranches.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarBranches.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarBranches.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarBranches.mLocalName = Convert.ToString(dr["LocalName"].ToString());
                        ObjCVarBranches.mCountryID = Convert.ToInt32(dr["CountryID"].ToString());
                        ObjCVarBranches.mCityID = Convert.ToInt32(dr["CityID"].ToString());
                        ObjCVarBranches.mPhone1 = Convert.ToString(dr["Phone1"].ToString());
                        ObjCVarBranches.mPhone2 = Convert.ToString(dr["Phone2"].ToString());
                        ObjCVarBranches.mMobile1 = Convert.ToString(dr["Mobile1"].ToString());
                        ObjCVarBranches.mFax = Convert.ToString(dr["Fax"].ToString());
                        ObjCVarBranches.mAddress = Convert.ToString(dr["Address"].ToString());
                        ObjCVarBranches.mZipCode = Convert.ToString(dr["ZipCode"].ToString());
                        ObjCVarBranches.mIsInactive = Convert.ToBoolean(dr["IsInactive"].ToString());
                        ObjCVarBranches.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarBranches.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarBranches.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarBranches.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarBranches.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarBranches.mFA_LastDepreciationDate = Convert.ToDateTime(dr["FA_LastDepreciationDate"].ToString());
                        ObjCVarBranches.misDepartement = Convert.ToBoolean(dr["isDepartement"].ToString());
                        ObjCVarBranches.mAliasName = Convert.ToString(dr["AliasName"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarBranches.Add(ObjCVarBranches);
                    }
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
        #region "Common Methods"
        private void BeginTrans(SqlCommand Com, SqlConnection Con)
        {

            tr = Con.BeginTransaction(IsolationLevel.Serializable);
            Com.CommandType = CommandType.StoredProcedure;
        }

        private void EndTrans(SqlCommand Com, SqlConnection Con)
        {

            Com.Transaction = tr;
            Com.Connection = Con;
            Com.ExecuteNonQuery();
            tr.Commit();
        }

        #endregion
        #region "Set List Method"
        private Exception SetList(string WhereClause, Boolean IsDelete)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                if (IsDelete == true)
                    Com.CommandText = "[dbo].DeleteListBranches";
                else
                    Com.CommandText = "[dbo].UpdateListBranches";
                Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.VarChar));
                BeginTrans(Com, Con);
                Com.Parameters[0].Value = WhereClause;
                EndTrans(Com, Con);
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
        #region "Delete Methods"
        public Exception DeleteItem(List<CPKBranches> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemBranches";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int));
                foreach (CPKBranches ObjCPKBranches in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt32(ObjCPKBranches.ID);
                    EndTrans(Com, Con);
                }
            }
            catch (Exception ex)
            {
                Exp = ex;
            }
            finally
            {
                Con.Close();
                Con.Dispose();
                DeleteList.Clear();
            }
            return Exp;
        }

        public Exception DeleteList(string WhereClause)
        {

            return SetList(WhereClause, true);
        }

        #endregion
        #region "Save Methods"
        public Exception SaveMethod(List<CVarBranches> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@Code", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@LocalName", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@CountryID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CityID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@Phone1", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@Phone2", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@Mobile1", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@Fax", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@Address", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@ZipCode", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@IsInactive", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@Notes", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@CreatorUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CreationDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@ModificatorUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ModificationDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@FA_LastDepreciationDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@isDepartement", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@AliasName", SqlDbType.NVarChar));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarBranches ObjCVarBranches in SaveList)
                {
                    if (ObjCVarBranches.mIsChanges == true)
                    {
                        if (ObjCVarBranches.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemBranches";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarBranches.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemBranches";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarBranches.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarBranches.ID;
                        }
                        Com.Parameters["@Code"].Value = ObjCVarBranches.Code;
                        Com.Parameters["@Name"].Value = ObjCVarBranches.Name;
                        Com.Parameters["@LocalName"].Value = ObjCVarBranches.LocalName;
                        Com.Parameters["@CountryID"].Value = ObjCVarBranches.CountryID;
                        Com.Parameters["@CityID"].Value = ObjCVarBranches.CityID;
                        Com.Parameters["@Phone1"].Value = ObjCVarBranches.Phone1;
                        Com.Parameters["@Phone2"].Value = ObjCVarBranches.Phone2;
                        Com.Parameters["@Mobile1"].Value = ObjCVarBranches.Mobile1;
                        Com.Parameters["@Fax"].Value = ObjCVarBranches.Fax;
                        Com.Parameters["@Address"].Value = ObjCVarBranches.Address;
                        Com.Parameters["@ZipCode"].Value = ObjCVarBranches.ZipCode;
                        Com.Parameters["@IsInactive"].Value = ObjCVarBranches.IsInactive;
                        Com.Parameters["@Notes"].Value = ObjCVarBranches.Notes;
                        Com.Parameters["@CreatorUserID"].Value = ObjCVarBranches.CreatorUserID;
                        Com.Parameters["@CreationDate"].Value = ObjCVarBranches.CreationDate;
                        Com.Parameters["@ModificatorUserID"].Value = ObjCVarBranches.ModificatorUserID;
                        Com.Parameters["@ModificationDate"].Value = ObjCVarBranches.ModificationDate;
                        Com.Parameters["@FA_LastDepreciationDate"].Value = ObjCVarBranches.FA_LastDepreciationDate;
                        Com.Parameters["@isDepartement"].Value = ObjCVarBranches.isDepartement;
                        Com.Parameters["@AliasName"].Value = ObjCVarBranches.AliasName;
                        EndTrans(Com, Con);
                        if (ObjCVarBranches.ID == 0)
                        {
                            ObjCVarBranches.ID = Convert.ToInt32(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarBranches.mIsChanges = false;
                    }
                }
            }
            catch (Exception ex)
            {
                Exp = ex;
                if (tr != null)
                    tr.Rollback();
            }
            finally
            {
                Con.Close();
                Con.Dispose();
            }
            return Exp;
        }
        #endregion
        #region "Update Methods"
        public Exception UpdateList(string UpdateClause)
        {

            return SetList(UpdateClause, false);
        }

        #endregion
    }

}

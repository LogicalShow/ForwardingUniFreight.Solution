using System;
using System.Data;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;


namespace Forwarding.MvcApp.Models.SL.SL_MasterData.Generated
{
    [Serializable]
    public class CPKSL_SalesMan
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
    public partial class CVarSL_SalesMan : CPKSL_SalesMan
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mCode;
        internal String mName;
        internal String mLocalName;
        internal String mJob;
        internal String mAddress;
        internal String mMobile;
        internal String mPhone;
        internal String mNotes;
        internal Int32 mCreatorUserID;
        internal DateTime mCreationDate;
        internal Int32 mModificatorUserID;
        internal DateTime mModificationDate;
        internal Int32 mAccountID;
        internal Int32 mSubAccountID;
        internal Int32 mCostCenterID;
        internal Int32 mSubAccountGroupID;
        internal Int32 mUserID;
        #endregion

        #region "Methods"
        public Int32 Code
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
        public String Job
        {
            get { return mJob; }
            set { mIsChanges = true; mJob = value; }
        }
        public String Address
        {
            get { return mAddress; }
            set { mIsChanges = true; mAddress = value; }
        }
        public String Mobile
        {
            get { return mMobile; }
            set { mIsChanges = true; mMobile = value; }
        }
        public String Phone
        {
            get { return mPhone; }
            set { mIsChanges = true; mPhone = value; }
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
        public Int32 AccountID
        {
            get { return mAccountID; }
            set { mIsChanges = true; mAccountID = value; }
        }
        public Int32 SubAccountID
        {
            get { return mSubAccountID; }
            set { mIsChanges = true; mSubAccountID = value; }
        }
        public Int32 CostCenterID
        {
            get { return mCostCenterID; }
            set { mIsChanges = true; mCostCenterID = value; }
        }
        public Int32 SubAccountGroupID
        {
            get { return mSubAccountGroupID; }
            set { mIsChanges = true; mSubAccountGroupID = value; }
        }
        public Int32 UserID
        {
            get { return mUserID; }
            set { mIsChanges = true; mUserID = value; }
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

    public partial class CSL_SalesMan
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
        public List<CVarSL_SalesMan> lstCVarSL_SalesMan = new List<CVarSL_SalesMan>();
        public List<CPKSL_SalesMan> lstDeletedCPKSL_SalesMan = new List<CPKSL_SalesMan>();
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
            lstCVarSL_SalesMan.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListSL_SalesMan";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemSL_SalesMan";
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
                        CVarSL_SalesMan ObjCVarSL_SalesMan = new CVarSL_SalesMan();
                        ObjCVarSL_SalesMan.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarSL_SalesMan.mCode = Convert.ToInt32(dr["Code"].ToString());
                        ObjCVarSL_SalesMan.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarSL_SalesMan.mLocalName = Convert.ToString(dr["LocalName"].ToString());
                        ObjCVarSL_SalesMan.mJob = Convert.ToString(dr["Job"].ToString());
                        ObjCVarSL_SalesMan.mAddress = Convert.ToString(dr["Address"].ToString());
                        ObjCVarSL_SalesMan.mMobile = Convert.ToString(dr["Mobile"].ToString());
                        ObjCVarSL_SalesMan.mPhone = Convert.ToString(dr["Phone"].ToString());
                        ObjCVarSL_SalesMan.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarSL_SalesMan.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarSL_SalesMan.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarSL_SalesMan.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarSL_SalesMan.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarSL_SalesMan.mAccountID = Convert.ToInt32(dr["AccountID"].ToString());
                        ObjCVarSL_SalesMan.mSubAccountID = Convert.ToInt32(dr["SubAccountID"].ToString());
                        ObjCVarSL_SalesMan.mCostCenterID = Convert.ToInt32(dr["CostCenterID"].ToString());
                        ObjCVarSL_SalesMan.mSubAccountGroupID = Convert.ToInt32(dr["SubAccountGroupID"].ToString());
                        ObjCVarSL_SalesMan.mUserID = Convert.ToInt32(dr["UserID"].ToString());
                        lstCVarSL_SalesMan.Add(ObjCVarSL_SalesMan);
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
            lstCVarSL_SalesMan.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                Com.Parameters.Add(new SqlParameter("@PageSize", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@PageNumber", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@OrderBy", SqlDbType.VarChar));
                Com.CommandText = "[dbo].GetListPagingSL_SalesMan";
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
                        CVarSL_SalesMan ObjCVarSL_SalesMan = new CVarSL_SalesMan();
                        ObjCVarSL_SalesMan.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarSL_SalesMan.mCode = Convert.ToInt32(dr["Code"].ToString());
                        ObjCVarSL_SalesMan.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarSL_SalesMan.mLocalName = Convert.ToString(dr["LocalName"].ToString());
                        ObjCVarSL_SalesMan.mJob = Convert.ToString(dr["Job"].ToString());
                        ObjCVarSL_SalesMan.mAddress = Convert.ToString(dr["Address"].ToString());
                        ObjCVarSL_SalesMan.mMobile = Convert.ToString(dr["Mobile"].ToString());
                        ObjCVarSL_SalesMan.mPhone = Convert.ToString(dr["Phone"].ToString());
                        ObjCVarSL_SalesMan.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarSL_SalesMan.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarSL_SalesMan.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarSL_SalesMan.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarSL_SalesMan.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarSL_SalesMan.mAccountID = Convert.ToInt32(dr["AccountID"].ToString());
                        ObjCVarSL_SalesMan.mSubAccountID = Convert.ToInt32(dr["SubAccountID"].ToString());
                        ObjCVarSL_SalesMan.mCostCenterID = Convert.ToInt32(dr["CostCenterID"].ToString());
                        ObjCVarSL_SalesMan.mSubAccountGroupID = Convert.ToInt32(dr["SubAccountGroupID"].ToString());
                        ObjCVarSL_SalesMan.mUserID = Convert.ToInt32(dr["UserID"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarSL_SalesMan.Add(ObjCVarSL_SalesMan);
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
                    Com.CommandText = "[dbo].DeleteListSL_SalesMan";
                else
                    Com.CommandText = "[dbo].UpdateListSL_SalesMan";
                Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
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
        public Exception DeleteItem(List<CPKSL_SalesMan> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemSL_SalesMan";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int));
                foreach (CPKSL_SalesMan ObjCPKSL_SalesMan in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt32(ObjCPKSL_SalesMan.ID);
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
        public Exception SaveMethod(List<CVarSL_SalesMan> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@Code", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@LocalName", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@Job", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@Address", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@Mobile", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@Phone", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@Notes", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@CreatorUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CreationDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@ModificatorUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ModificationDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@AccountID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@SubAccountID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CostCenterID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@SubAccountGroupID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@UserID", SqlDbType.Int));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarSL_SalesMan ObjCVarSL_SalesMan in SaveList)
                {
                    if (ObjCVarSL_SalesMan.mIsChanges == true)
                    {
                        if (ObjCVarSL_SalesMan.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemSL_SalesMan";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarSL_SalesMan.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemSL_SalesMan";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarSL_SalesMan.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarSL_SalesMan.ID;
                        }
                        Com.Parameters["@Code"].Value = ObjCVarSL_SalesMan.Code;
                        Com.Parameters["@Name"].Value = ObjCVarSL_SalesMan.Name;
                        Com.Parameters["@LocalName"].Value = ObjCVarSL_SalesMan.LocalName;
                        Com.Parameters["@Job"].Value = ObjCVarSL_SalesMan.Job;
                        Com.Parameters["@Address"].Value = ObjCVarSL_SalesMan.Address;
                        Com.Parameters["@Mobile"].Value = ObjCVarSL_SalesMan.Mobile;
                        Com.Parameters["@Phone"].Value = ObjCVarSL_SalesMan.Phone;
                        Com.Parameters["@Notes"].Value = ObjCVarSL_SalesMan.Notes;
                        Com.Parameters["@CreatorUserID"].Value = ObjCVarSL_SalesMan.CreatorUserID;
                        Com.Parameters["@CreationDate"].Value = ObjCVarSL_SalesMan.CreationDate;
                        Com.Parameters["@ModificatorUserID"].Value = ObjCVarSL_SalesMan.ModificatorUserID;
                        Com.Parameters["@ModificationDate"].Value = ObjCVarSL_SalesMan.ModificationDate;
                        Com.Parameters["@AccountID"].Value = ObjCVarSL_SalesMan.AccountID;
                        Com.Parameters["@SubAccountID"].Value = ObjCVarSL_SalesMan.SubAccountID;
                        Com.Parameters["@CostCenterID"].Value = ObjCVarSL_SalesMan.CostCenterID;
                        Com.Parameters["@SubAccountGroupID"].Value = ObjCVarSL_SalesMan.SubAccountGroupID;
                        Com.Parameters["@UserID"].Value = ObjCVarSL_SalesMan.UserID;
                        EndTrans(Com, Con);
                        if (ObjCVarSL_SalesMan.ID == 0)
                        {
                            ObjCVarSL_SalesMan.ID = Convert.ToInt32(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarSL_SalesMan.mIsChanges = false;
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

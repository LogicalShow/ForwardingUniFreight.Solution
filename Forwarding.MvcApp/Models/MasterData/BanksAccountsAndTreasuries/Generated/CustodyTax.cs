using System;
using System.Data;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;


namespace Forwarding.MvcApp.Models.MasterData.BanksAccountsAndTreasuries.Generated
{
    [Serializable]
    public class CPKCustodyTAX
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
    public partial class CVarCustodyTAX : CPKCustodyTAX
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

    public partial class CCustodyTAX
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
        public List<CVarCustodyTAX> lstCVarCustodyTAX = new List<CVarCustodyTAX>();
        public List<CPKCustodyTAX> lstDeletedCPKCustodyTAX = new List<CPKCustodyTAX>();
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
            lstCVarCustodyTAX.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListCustodyTax";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemCustodyTax";
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
                        CVarCustodyTAX ObjCVarCustodyTAX = new CVarCustodyTAX();
                        ObjCVarCustodyTAX.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarCustodyTAX.mCode = Convert.ToInt32(dr["Code"].ToString());
                        ObjCVarCustodyTAX.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarCustodyTAX.mLocalName = Convert.ToString(dr["LocalName"].ToString());
                        ObjCVarCustodyTAX.mJob = Convert.ToString(dr["Job"].ToString());
                        ObjCVarCustodyTAX.mAddress = Convert.ToString(dr["Address"].ToString());
                        ObjCVarCustodyTAX.mMobile = Convert.ToString(dr["Mobile"].ToString());
                        ObjCVarCustodyTAX.mPhone = Convert.ToString(dr["Phone"].ToString());
                        ObjCVarCustodyTAX.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarCustodyTAX.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarCustodyTAX.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarCustodyTAX.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarCustodyTAX.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarCustodyTAX.mAccountID = Convert.ToInt32(dr["AccountID"].ToString());
                        ObjCVarCustodyTAX.mSubAccountID = Convert.ToInt32(dr["SubAccountID"].ToString());
                        ObjCVarCustodyTAX.mCostCenterID = Convert.ToInt32(dr["CostCenterID"].ToString());
                        ObjCVarCustodyTAX.mSubAccountGroupID = Convert.ToInt32(dr["SubAccountGroupID"].ToString());
                        ObjCVarCustodyTAX.mUserID = Convert.ToInt32(dr["UserID"].ToString());
                        lstCVarCustodyTAX.Add(ObjCVarCustodyTAX);
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
            lstCVarCustodyTAX.Clear();

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
                Com.CommandText = "[dbo].GetListPagingCustody";
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
                        CVarCustodyTAX ObjCVarCustodyTAX = new CVarCustodyTAX();
                        ObjCVarCustodyTAX.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarCustodyTAX.mCode = Convert.ToInt32(dr["Code"].ToString());
                        ObjCVarCustodyTAX.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarCustodyTAX.mLocalName = Convert.ToString(dr["LocalName"].ToString());
                        ObjCVarCustodyTAX.mJob = Convert.ToString(dr["Job"].ToString());
                        ObjCVarCustodyTAX.mAddress = Convert.ToString(dr["Address"].ToString());
                        ObjCVarCustodyTAX.mMobile = Convert.ToString(dr["Mobile"].ToString());
                        ObjCVarCustodyTAX.mPhone = Convert.ToString(dr["Phone"].ToString());
                        ObjCVarCustodyTAX.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarCustodyTAX.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarCustodyTAX.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarCustodyTAX.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarCustodyTAX.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarCustodyTAX.mAccountID = Convert.ToInt32(dr["AccountID"].ToString());
                        ObjCVarCustodyTAX.mSubAccountID = Convert.ToInt32(dr["SubAccountID"].ToString());
                        ObjCVarCustodyTAX.mCostCenterID = Convert.ToInt32(dr["CostCenterID"].ToString());
                        ObjCVarCustodyTAX.mSubAccountGroupID = Convert.ToInt32(dr["SubAccountGroupID"].ToString());
                        ObjCVarCustodyTAX.mUserID = Convert.ToInt32(dr["UserID"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarCustodyTAX.Add(ObjCVarCustodyTAX);
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
                    Com.CommandText = "[dbo].DeleteListCustodyTax";
                else
                    Com.CommandText = "[dbo].UpdateListCustodyTax";
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
        public Exception DeleteItem(List<CPKCustodyTAX> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemCustodyTax";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int));
                foreach (CPKCustodyTAX ObjCPKCustodyTAX in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt32(ObjCPKCustodyTAX.ID);
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
        public Exception SaveMethod(List<CVarCustodyTAX> SaveList)
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
                foreach (CVarCustodyTAX ObjCVarCustodyTAX in SaveList)
                {
                    if (ObjCVarCustodyTAX.mIsChanges == true)
                    {
                        if (ObjCVarCustodyTAX.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemCustodyTax";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarCustodyTAX.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemCustodyTax";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarCustodyTAX.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarCustodyTAX.ID;
                        }
                        Com.Parameters["@Code"].Value = ObjCVarCustodyTAX.Code;
                        Com.Parameters["@Name"].Value = ObjCVarCustodyTAX.Name;
                        Com.Parameters["@LocalName"].Value = ObjCVarCustodyTAX.LocalName;
                        Com.Parameters["@Job"].Value = ObjCVarCustodyTAX.Job;
                        Com.Parameters["@Address"].Value = ObjCVarCustodyTAX.Address;
                        Com.Parameters["@Mobile"].Value = ObjCVarCustodyTAX.Mobile;
                        Com.Parameters["@Phone"].Value = ObjCVarCustodyTAX.Phone;
                        Com.Parameters["@Notes"].Value = ObjCVarCustodyTAX.Notes;
                        Com.Parameters["@CreatorUserID"].Value = ObjCVarCustodyTAX.CreatorUserID;
                        Com.Parameters["@CreationDate"].Value = ObjCVarCustodyTAX.CreationDate;
                        Com.Parameters["@ModificatorUserID"].Value = ObjCVarCustodyTAX.ModificatorUserID;
                        Com.Parameters["@ModificationDate"].Value = ObjCVarCustodyTAX.ModificationDate;
                        Com.Parameters["@AccountID"].Value = ObjCVarCustodyTAX.AccountID;
                        Com.Parameters["@SubAccountID"].Value = ObjCVarCustodyTAX.SubAccountID;
                        Com.Parameters["@CostCenterID"].Value = ObjCVarCustodyTAX.CostCenterID;
                        Com.Parameters["@SubAccountGroupID"].Value = ObjCVarCustodyTAX.SubAccountGroupID;
                        Com.Parameters["@UserID"].Value = ObjCVarCustodyTAX.UserID;
                        EndTrans(Com, Con);
                        if (ObjCVarCustodyTAX.ID == 0)
                        {
                            ObjCVarCustodyTAX.ID = Convert.ToInt32(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarCustodyTAX.mIsChanges = false;
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

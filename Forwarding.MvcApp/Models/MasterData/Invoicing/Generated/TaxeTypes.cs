using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.MasterData.Invoicing.Generated
{
    [Serializable]
    public class CPKTaxeTypes
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
    public partial class CVarTaxeTypes : CPKTaxeTypes
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal String mCode;
        internal String mName;
        internal String mLocalName;
        internal Decimal mCurrentPercentage;
        internal Decimal mCurrentAlternatePercentage;
        internal DateTime mCurrentPercentageDate;
        internal String mNotes;
        internal Boolean mIsDiscount;
        internal Boolean mIsInactive;
        internal Int32 mCreatorUserID;
        internal DateTime mCreationDate;
        internal Int32 mModificatorUserID;
        internal DateTime mModificationDate;
        internal Int32 mLockingUserID;
        internal DateTime mTimeLocked;
        internal Int32 mAccount_ID;
        internal Int32 mSubAccount_ID;
        internal Boolean mIsDebitAccount;
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
        public Decimal CurrentPercentage
        {
            get { return mCurrentPercentage; }
            set { mIsChanges = true; mCurrentPercentage = value; }
        }
        public Decimal CurrentAlternatePercentage
        {
            get { return mCurrentAlternatePercentage; }
            set { mIsChanges = true; mCurrentAlternatePercentage = value; }
        }
        public DateTime CurrentPercentageDate
        {
            get { return mCurrentPercentageDate; }
            set { mIsChanges = true; mCurrentPercentageDate = value; }
        }
        public String Notes
        {
            get { return mNotes; }
            set { mIsChanges = true; mNotes = value; }
        }
        public Boolean IsDiscount
        {
            get { return mIsDiscount; }
            set { mIsChanges = true; mIsDiscount = value; }
        }
        public Boolean IsInactive
        {
            get { return mIsInactive; }
            set { mIsChanges = true; mIsInactive = value; }
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
        public Int32 LockingUserID
        {
            get { return mLockingUserID; }
            set { mIsChanges = true; mLockingUserID = value; }
        }
        public DateTime TimeLocked
        {
            get { return mTimeLocked; }
            set { mIsChanges = true; mTimeLocked = value; }
        }
        public Int32 Account_ID
        {
            get { return mAccount_ID; }
            set { mIsChanges = true; mAccount_ID = value; }
        }
        public Int32 SubAccount_ID
        {
            get { return mSubAccount_ID; }
            set { mIsChanges = true; mSubAccount_ID = value; }
        }
        public Boolean IsDebitAccount
        {
            get { return mIsDebitAccount; }
            set { mIsChanges = true; mIsDebitAccount = value; }
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

    public partial class CTaxeTypes
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
        public List<CVarTaxeTypes> lstCVarTaxeTypes = new List<CVarTaxeTypes>();
        public List<CPKTaxeTypes> lstDeletedCPKTaxeTypes = new List<CPKTaxeTypes>();
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
            lstCVarTaxeTypes.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListTaxeTypes";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemTaxeTypes";
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
                        CVarTaxeTypes ObjCVarTaxeTypes = new CVarTaxeTypes();
                        ObjCVarTaxeTypes.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarTaxeTypes.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarTaxeTypes.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarTaxeTypes.mLocalName = Convert.ToString(dr["LocalName"].ToString());
                        ObjCVarTaxeTypes.mCurrentPercentage = Convert.ToDecimal(dr["CurrentPercentage"].ToString());
                        ObjCVarTaxeTypes.mCurrentAlternatePercentage = Convert.ToDecimal(dr["CurrentAlternatePercentage"].ToString());
                        ObjCVarTaxeTypes.mCurrentPercentageDate = Convert.ToDateTime(dr["CurrentPercentageDate"].ToString());
                        ObjCVarTaxeTypes.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarTaxeTypes.mIsDiscount = Convert.ToBoolean(dr["IsDiscount"].ToString());
                        ObjCVarTaxeTypes.mIsInactive = Convert.ToBoolean(dr["IsInactive"].ToString());
                        ObjCVarTaxeTypes.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarTaxeTypes.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarTaxeTypes.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarTaxeTypes.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarTaxeTypes.mLockingUserID = Convert.ToInt32(dr["LockingUserID"].ToString());
                        ObjCVarTaxeTypes.mTimeLocked = Convert.ToDateTime(dr["TimeLocked"].ToString());
                        ObjCVarTaxeTypes.mAccount_ID = Convert.ToInt32(dr["Account_ID"].ToString());
                        ObjCVarTaxeTypes.mSubAccount_ID = Convert.ToInt32(dr["SubAccount_ID"].ToString());
                        ObjCVarTaxeTypes.mIsDebitAccount = Convert.ToBoolean(dr["IsDebitAccount"].ToString());
                        lstCVarTaxeTypes.Add(ObjCVarTaxeTypes);
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
            lstCVarTaxeTypes.Clear();

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
                Com.CommandText = "[dbo].GetListPagingTaxeTypes";
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
                        CVarTaxeTypes ObjCVarTaxeTypes = new CVarTaxeTypes();
                        ObjCVarTaxeTypes.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarTaxeTypes.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarTaxeTypes.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarTaxeTypes.mLocalName = Convert.ToString(dr["LocalName"].ToString());
                        ObjCVarTaxeTypes.mCurrentPercentage = Convert.ToDecimal(dr["CurrentPercentage"].ToString());
                        ObjCVarTaxeTypes.mCurrentAlternatePercentage = Convert.ToDecimal(dr["CurrentAlternatePercentage"].ToString());
                        ObjCVarTaxeTypes.mCurrentPercentageDate = Convert.ToDateTime(dr["CurrentPercentageDate"].ToString());
                        ObjCVarTaxeTypes.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarTaxeTypes.mIsDiscount = Convert.ToBoolean(dr["IsDiscount"].ToString());
                        ObjCVarTaxeTypes.mIsInactive = Convert.ToBoolean(dr["IsInactive"].ToString());
                        ObjCVarTaxeTypes.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarTaxeTypes.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarTaxeTypes.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarTaxeTypes.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarTaxeTypes.mLockingUserID = Convert.ToInt32(dr["LockingUserID"].ToString());
                        ObjCVarTaxeTypes.mTimeLocked = Convert.ToDateTime(dr["TimeLocked"].ToString());
                        ObjCVarTaxeTypes.mAccount_ID = Convert.ToInt32(dr["Account_ID"].ToString());
                        ObjCVarTaxeTypes.mSubAccount_ID = Convert.ToInt32(dr["SubAccount_ID"].ToString());
                        ObjCVarTaxeTypes.mIsDebitAccount = Convert.ToBoolean(dr["IsDebitAccount"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarTaxeTypes.Add(ObjCVarTaxeTypes);
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
                    Com.CommandText = "[dbo].DeleteListTaxeTypes";
                else
                    Com.CommandText = "[dbo].UpdateListTaxeTypes";
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
        public Exception DeleteItem(List<CPKTaxeTypes> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemTaxeTypes";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int));
                foreach (CPKTaxeTypes ObjCPKTaxeTypes in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt32(ObjCPKTaxeTypes.ID);
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
        public Exception SaveMethod(List<CVarTaxeTypes> SaveList)
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
                Com.Parameters.Add(new SqlParameter("@CurrentPercentage", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@CurrentAlternatePercentage", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@CurrentPercentageDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@Notes", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@IsDiscount", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@IsInactive", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@CreatorUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CreationDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@ModificatorUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ModificationDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@LockingUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@TimeLocked", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@Account_ID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@SubAccount_ID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@IsDebitAccount", SqlDbType.Bit));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarTaxeTypes ObjCVarTaxeTypes in SaveList)
                {
                    if (ObjCVarTaxeTypes.mIsChanges == true)
                    {
                        if (ObjCVarTaxeTypes.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemTaxeTypes";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarTaxeTypes.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemTaxeTypes";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarTaxeTypes.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarTaxeTypes.ID;
                        }
                        Com.Parameters["@Code"].Value = ObjCVarTaxeTypes.Code;
                        Com.Parameters["@Name"].Value = ObjCVarTaxeTypes.Name;
                        Com.Parameters["@LocalName"].Value = ObjCVarTaxeTypes.LocalName;
                        Com.Parameters["@CurrentPercentage"].Value = ObjCVarTaxeTypes.CurrentPercentage;
                        Com.Parameters["@CurrentAlternatePercentage"].Value = ObjCVarTaxeTypes.CurrentAlternatePercentage;
                        Com.Parameters["@CurrentPercentageDate"].Value = ObjCVarTaxeTypes.CurrentPercentageDate;
                        Com.Parameters["@Notes"].Value = ObjCVarTaxeTypes.Notes;
                        Com.Parameters["@IsDiscount"].Value = ObjCVarTaxeTypes.IsDiscount;
                        Com.Parameters["@IsInactive"].Value = ObjCVarTaxeTypes.IsInactive;
                        Com.Parameters["@CreatorUserID"].Value = ObjCVarTaxeTypes.CreatorUserID;
                        Com.Parameters["@CreationDate"].Value = ObjCVarTaxeTypes.CreationDate;
                        Com.Parameters["@ModificatorUserID"].Value = ObjCVarTaxeTypes.ModificatorUserID;
                        Com.Parameters["@ModificationDate"].Value = ObjCVarTaxeTypes.ModificationDate;
                        Com.Parameters["@LockingUserID"].Value = ObjCVarTaxeTypes.LockingUserID;
                        Com.Parameters["@TimeLocked"].Value = ObjCVarTaxeTypes.TimeLocked;
                        Com.Parameters["@Account_ID"].Value = ObjCVarTaxeTypes.Account_ID;
                        Com.Parameters["@SubAccount_ID"].Value = ObjCVarTaxeTypes.SubAccount_ID;
                        Com.Parameters["@IsDebitAccount"].Value = ObjCVarTaxeTypes.IsDebitAccount;
                        EndTrans(Com, Con);
                        if (ObjCVarTaxeTypes.ID == 0)
                        {
                            ObjCVarTaxeTypes.ID = Convert.ToInt32(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarTaxeTypes.mIsChanges = false;
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

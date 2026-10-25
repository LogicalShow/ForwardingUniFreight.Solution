using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.MasterData.Partners.Generated
{
    [Serializable]
    public class CPKAddresses
    {
        #region "variables"
        private Int64 mID;
        #endregion

        #region "Methods"
        public Int64 ID
        {
            get { return mID; }
            set { mID = value; }
        }
        #endregion
    }
    [Serializable]
    public partial class CVarAddresses : CPKAddresses
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mPartnerTypeID;
        internal Int64 mPartnerID;
        internal Int32 mAddressTypeID;
        internal Int32 mCountryID;
        internal Int32 mCityID;
        internal String mStreetLine1;
        internal String mStreetLine2;
        internal String mZipCode;
        internal String mPrintedAs;
        internal Int32 mCreatorUserID;
        internal DateTime mCreationDate;
        internal Int32 mModificatorUserID;
        internal DateTime mModificationDate;
        internal Int32 mLockingUserID;
        internal DateTime mTimeLocked;
        internal Boolean mIsDeleted;
        internal String mAdditionalAddress;
        #endregion

        #region "Methods"
        public Int32 PartnerTypeID
        {
            get { return mPartnerTypeID; }
            set { mIsChanges = true; mPartnerTypeID = value; }
        }
        public Int64 PartnerID
        {
            get { return mPartnerID; }
            set { mIsChanges = true; mPartnerID = value; }
        }
        public Int32 AddressTypeID
        {
            get { return mAddressTypeID; }
            set { mIsChanges = true; mAddressTypeID = value; }
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
        public String StreetLine1
        {
            get { return mStreetLine1; }
            set { mIsChanges = true; mStreetLine1 = value; }
        }
        public String StreetLine2
        {
            get { return mStreetLine2; }
            set { mIsChanges = true; mStreetLine2 = value; }
        }
        public String ZipCode
        {
            get { return mZipCode; }
            set { mIsChanges = true; mZipCode = value; }
        }
        public String PrintedAs
        {
            get { return mPrintedAs; }
            set { mIsChanges = true; mPrintedAs = value; }
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
        public Boolean IsDeleted
        {
            get { return mIsDeleted; }
            set { mIsChanges = true; mIsDeleted = value; }
        }
        public String AdditionalAddress
        {
            get { return mAdditionalAddress; }
            set { mIsChanges = true; mAdditionalAddress = value; }
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

    public partial class CAddresses
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
        public List<CVarAddresses> lstCVarAddresses = new List<CVarAddresses>();
        public List<CPKAddresses> lstDeletedCPKAddresses = new List<CPKAddresses>();
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
        public Exception GetItem(Int64 ID)
        {
            return DataFill(Convert.ToString(ID), false);
        }
        private Exception DataFill(string Param, Boolean IsList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarAddresses.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.VarChar));
                    Com.CommandText = "[dbo].GetListAddresses";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemAddresses";
                    Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt));
                    Com.Parameters[0].Value = Convert.ToInt64(Param);
                }
                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        /*Start DataReader*/
                        CVarAddresses ObjCVarAddresses = new CVarAddresses();
                        ObjCVarAddresses.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarAddresses.mPartnerTypeID = Convert.ToInt32(dr["PartnerTypeID"].ToString());
                        ObjCVarAddresses.mPartnerID = Convert.ToInt64(dr["PartnerID"].ToString());
                        ObjCVarAddresses.mAddressTypeID = Convert.ToInt32(dr["AddressTypeID"].ToString());
                        ObjCVarAddresses.mCountryID = Convert.ToInt32(dr["CountryID"].ToString());
                        ObjCVarAddresses.mCityID = Convert.ToInt32(dr["CityID"].ToString());
                        ObjCVarAddresses.mStreetLine1 = Convert.ToString(dr["StreetLine1"].ToString());
                        ObjCVarAddresses.mStreetLine2 = Convert.ToString(dr["StreetLine2"].ToString());
                        ObjCVarAddresses.mZipCode = Convert.ToString(dr["ZipCode"].ToString());
                        ObjCVarAddresses.mPrintedAs = Convert.ToString(dr["PrintedAs"].ToString());
                        ObjCVarAddresses.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarAddresses.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarAddresses.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarAddresses.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarAddresses.mLockingUserID = Convert.ToInt32(dr["LockingUserID"].ToString());
                        ObjCVarAddresses.mTimeLocked = Convert.ToDateTime(dr["TimeLocked"].ToString());
                        ObjCVarAddresses.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarAddresses.mAdditionalAddress = Convert.ToString(dr["AdditionalAddress"].ToString());
                        lstCVarAddresses.Add(ObjCVarAddresses);
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
            lstCVarAddresses.Clear();

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
                Com.CommandText = "[dbo].GetListPagingAddresses";
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
                        CVarAddresses ObjCVarAddresses = new CVarAddresses();
                        ObjCVarAddresses.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarAddresses.mPartnerTypeID = Convert.ToInt32(dr["PartnerTypeID"].ToString());
                        ObjCVarAddresses.mPartnerID = Convert.ToInt64(dr["PartnerID"].ToString());
                        ObjCVarAddresses.mAddressTypeID = Convert.ToInt32(dr["AddressTypeID"].ToString());
                        ObjCVarAddresses.mCountryID = Convert.ToInt32(dr["CountryID"].ToString());
                        ObjCVarAddresses.mCityID = Convert.ToInt32(dr["CityID"].ToString());
                        ObjCVarAddresses.mStreetLine1 = Convert.ToString(dr["StreetLine1"].ToString());
                        ObjCVarAddresses.mStreetLine2 = Convert.ToString(dr["StreetLine2"].ToString());
                        ObjCVarAddresses.mZipCode = Convert.ToString(dr["ZipCode"].ToString());
                        ObjCVarAddresses.mPrintedAs = Convert.ToString(dr["PrintedAs"].ToString());
                        ObjCVarAddresses.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarAddresses.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarAddresses.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarAddresses.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarAddresses.mLockingUserID = Convert.ToInt32(dr["LockingUserID"].ToString());
                        ObjCVarAddresses.mTimeLocked = Convert.ToDateTime(dr["TimeLocked"].ToString());
                        ObjCVarAddresses.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarAddresses.mAdditionalAddress = Convert.ToString(dr["AdditionalAddress"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarAddresses.Add(ObjCVarAddresses);
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
                    Com.CommandText = "[dbo].DeleteListAddresses";
                else
                    Com.CommandText = "[dbo].UpdateListAddresses";
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
        public Exception DeleteItem(List<CPKAddresses> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemAddresses";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt));
                foreach (CPKAddresses ObjCPKAddresses in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt64(ObjCPKAddresses.ID);
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
        public Exception SaveMethod(List<CVarAddresses> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@PartnerTypeID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@PartnerID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@AddressTypeID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CountryID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CityID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@StreetLine1", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@StreetLine2", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@ZipCode", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@PrintedAs", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@CreatorUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CreationDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@ModificatorUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ModificationDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@LockingUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@TimeLocked", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@IsDeleted", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@AdditionalAddress", SqlDbType.NVarChar));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarAddresses ObjCVarAddresses in SaveList)
                {
                    if (ObjCVarAddresses.mIsChanges == true)
                    {
                        if (ObjCVarAddresses.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemAddresses";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarAddresses.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemAddresses";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarAddresses.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarAddresses.ID;
                        }
                        Com.Parameters["@PartnerTypeID"].Value = ObjCVarAddresses.PartnerTypeID;
                        Com.Parameters["@PartnerID"].Value = ObjCVarAddresses.PartnerID;
                        Com.Parameters["@AddressTypeID"].Value = ObjCVarAddresses.AddressTypeID;
                        Com.Parameters["@CountryID"].Value = ObjCVarAddresses.CountryID;
                        Com.Parameters["@CityID"].Value = ObjCVarAddresses.CityID;
                        Com.Parameters["@StreetLine1"].Value = ObjCVarAddresses.StreetLine1;
                        Com.Parameters["@StreetLine2"].Value = ObjCVarAddresses.StreetLine2;
                        Com.Parameters["@ZipCode"].Value = ObjCVarAddresses.ZipCode;
                        Com.Parameters["@PrintedAs"].Value = ObjCVarAddresses.PrintedAs;
                        Com.Parameters["@CreatorUserID"].Value = ObjCVarAddresses.CreatorUserID;
                        Com.Parameters["@CreationDate"].Value = ObjCVarAddresses.CreationDate;
                        Com.Parameters["@ModificatorUserID"].Value = ObjCVarAddresses.ModificatorUserID;
                        Com.Parameters["@ModificationDate"].Value = ObjCVarAddresses.ModificationDate;
                        Com.Parameters["@LockingUserID"].Value = ObjCVarAddresses.LockingUserID;
                        Com.Parameters["@TimeLocked"].Value = ObjCVarAddresses.TimeLocked;
                        Com.Parameters["@IsDeleted"].Value = ObjCVarAddresses.IsDeleted;
                        Com.Parameters["@AdditionalAddress"].Value = ObjCVarAddresses.AdditionalAddress;
                        EndTrans(Com, Con);
                        if (ObjCVarAddresses.ID == 0)
                        {
                            ObjCVarAddresses.ID = Convert.ToInt64(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarAddresses.mIsChanges = false;
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

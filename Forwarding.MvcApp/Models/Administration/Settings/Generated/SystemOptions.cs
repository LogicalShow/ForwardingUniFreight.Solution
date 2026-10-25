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
    public class CPKSystemOptions
    {
        #region "variables"
        private Int32 mOptionID;
        #endregion

        #region "Methods"
        public Int32 OptionID
        {
            get { return mOptionID; }
            set { mOptionID = value; }
        }
        #endregion
    }
    [Serializable]
    public partial class CVarSystemOptions : CPKSystemOptions
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal String mOptionEnName;
        internal String mOptionArName;
        internal Boolean mOptionValue;
        internal Boolean mReadOnly;
        internal String mDescription;
        internal Int32 mCatID;
        #endregion

        #region "Methods"
        public String OptionEnName
        {
            get { return mOptionEnName; }
            set { mIsChanges = true; mOptionEnName = value; }
        }
        public String OptionArName
        {
            get { return mOptionArName; }
            set { mIsChanges = true; mOptionArName = value; }
        }
        public Boolean OptionValue
        {
            get { return mOptionValue; }
            set { mIsChanges = true; mOptionValue = value; }
        }
        public Boolean ReadOnly
        {
            get { return mReadOnly; }
            set { mIsChanges = true; mReadOnly = value; }
        }
        public String Description
        {
            get { return mDescription; }
            set { mIsChanges = true; mDescription = value; }
        }
        public Int32 CatID
        {
            get { return mCatID; }
            set { mIsChanges = true; mCatID = value; }
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

    public partial class CSystemOptions
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
        public List<CVarSystemOptions> lstCVarSystemOptions = new List<CVarSystemOptions>();
        public List<CPKSystemOptions> lstDeletedCPKSystemOptions = new List<CPKSystemOptions>();
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
        public Exception GetItem(Int32 OptionID)
        {
            return DataFill(Convert.ToString(OptionID), false);
        }
        private Exception DataFill(string Param, Boolean IsList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarSystemOptions.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListSystemOptions";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemSystemOptions";
                    Com.Parameters.Add(new SqlParameter("@OptionID", SqlDbType.Int));
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
                        CVarSystemOptions ObjCVarSystemOptions = new CVarSystemOptions();
                        ObjCVarSystemOptions.OptionID = Convert.ToInt32(dr["OptionID"].ToString());
                        ObjCVarSystemOptions.mOptionEnName = Convert.ToString(dr["OptionEnName"].ToString());
                        ObjCVarSystemOptions.mOptionArName = Convert.ToString(dr["OptionArName"].ToString());
                        ObjCVarSystemOptions.mOptionValue = Convert.ToBoolean(dr["OptionValue"].ToString());
                        ObjCVarSystemOptions.mReadOnly = Convert.ToBoolean(dr["ReadOnly"].ToString());
                        ObjCVarSystemOptions.mDescription = Convert.ToString(dr["Description"].ToString());
                        ObjCVarSystemOptions.mCatID = Convert.ToInt32(dr["CatID"].ToString());
                        lstCVarSystemOptions.Add(ObjCVarSystemOptions);
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
            lstCVarSystemOptions.Clear();

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
                Com.CommandText = "[dbo].GetListPagingSystemOptions";
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
                        CVarSystemOptions ObjCVarSystemOptions = new CVarSystemOptions();
                        ObjCVarSystemOptions.OptionID = Convert.ToInt32(dr["OptionID"].ToString());
                        ObjCVarSystemOptions.mOptionEnName = Convert.ToString(dr["OptionEnName"].ToString());
                        ObjCVarSystemOptions.mOptionArName = Convert.ToString(dr["OptionArName"].ToString());
                        ObjCVarSystemOptions.mOptionValue = Convert.ToBoolean(dr["OptionValue"].ToString());
                        ObjCVarSystemOptions.mReadOnly = Convert.ToBoolean(dr["ReadOnly"].ToString());
                        ObjCVarSystemOptions.mDescription = Convert.ToString(dr["Description"].ToString());
                        ObjCVarSystemOptions.mCatID = Convert.ToInt32(dr["CatID"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarSystemOptions.Add(ObjCVarSystemOptions);
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
                    Com.CommandText = "[dbo].DeleteListSystemOptions";
                else
                    Com.CommandText = "[dbo].UpdateListSystemOptions";
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
        public Exception DeleteItem(List<CPKSystemOptions> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemSystemOptions";
                Com.Parameters.Add(new SqlParameter("@OptionID", SqlDbType.Int));
                foreach (CPKSystemOptions ObjCPKSystemOptions in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt32(ObjCPKSystemOptions.OptionID);
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
        public Exception SaveMethod(List<CVarSystemOptions> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@OptionEnName", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@OptionArName", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@OptionValue", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@ReadOnly", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@Description", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@CatID", SqlDbType.Int));
                SqlParameter paraOptionID = Com.Parameters.Add(new SqlParameter("@OptionID", SqlDbType.Int, 0, ParameterDirection.Input, false, 0, 0, "OptionID", DataRowVersion.Default, null));
                foreach (CVarSystemOptions ObjCVarSystemOptions in SaveList)
                {
                    if (ObjCVarSystemOptions.mIsChanges == true)
                    {
                        if (ObjCVarSystemOptions.OptionID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemSystemOptions";
                            paraOptionID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarSystemOptions.OptionID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemSystemOptions";
                            paraOptionID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarSystemOptions.OptionID != 0)
                        {
                            Com.Parameters["@OptionID"].Value = ObjCVarSystemOptions.OptionID;
                        }
                        Com.Parameters["@OptionEnName"].Value = ObjCVarSystemOptions.OptionEnName;
                        Com.Parameters["@OptionArName"].Value = ObjCVarSystemOptions.OptionArName;
                        Com.Parameters["@OptionValue"].Value = ObjCVarSystemOptions.OptionValue;
                        Com.Parameters["@ReadOnly"].Value = ObjCVarSystemOptions.ReadOnly;
                        Com.Parameters["@Description"].Value = ObjCVarSystemOptions.Description;
                        Com.Parameters["@CatID"].Value = ObjCVarSystemOptions.CatID;
                        EndTrans(Com, Con);
                        if (ObjCVarSystemOptions.OptionID == 0)
                        {
                            ObjCVarSystemOptions.OptionID = Convert.ToInt32(Com.Parameters["@OptionID"].Value);
                        }
                        ObjCVarSystemOptions.mIsChanges = false;
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

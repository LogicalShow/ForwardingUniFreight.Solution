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
    public class CPKLogTaxesPercentages
    {
        #region "variables"
        private Int32 mLogTaxesPercentageID;
        #endregion

        #region "Methods"
        public Int32 LogTaxesPercentageID
        {
            get { return mLogTaxesPercentageID; }
            set { mLogTaxesPercentageID = value; }
        }
        #endregion
    }
    [Serializable]
    public partial class CVarLogTaxesPercentages : CPKLogTaxesPercentages
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal String mTaxeTypeCode;
        internal Decimal mPercentage;
        internal DateTime mPercentageDate;
        internal String mActionTaken;
        internal Int32 mTaxeTypeID;
        internal Int32 mCreatorUserID;
        internal DateTime mCreationDate;
        internal Int32 mModificatorUserID;
        internal DateTime mModificationDate;
        internal Boolean mIsDeleted;
        #endregion

        #region "Methods"
        public String TaxeTypeCode
        {
            get { return mTaxeTypeCode; }
            set { mIsChanges = true; mTaxeTypeCode = value; }
        }
        public Decimal Percentage
        {
            get { return mPercentage; }
            set { mIsChanges = true; mPercentage = value; }
        }
        public DateTime PercentageDate
        {
            get { return mPercentageDate; }
            set { mIsChanges = true; mPercentageDate = value; }
        }
        public String ActionTaken
        {
            get { return mActionTaken; }
            set { mIsChanges = true; mActionTaken = value; }
        }
        public Int32 TaxeTypeID
        {
            get { return mTaxeTypeID; }
            set { mIsChanges = true; mTaxeTypeID = value; }
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
        public Boolean IsDeleted
        {
            get { return mIsDeleted; }
            set { mIsChanges = true; mIsDeleted = value; }
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

    public partial class CLogTaxesPercentages
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
        public List<CVarLogTaxesPercentages> lstCVarLogTaxesPercentages = new List<CVarLogTaxesPercentages>();
        public List<CPKLogTaxesPercentages> lstDeletedCPKLogTaxesPercentages = new List<CPKLogTaxesPercentages>();
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
        public Exception GetItem(Int32 LogTaxesPercentageID)
        {
            return DataFill(Convert.ToString(LogTaxesPercentageID), false);
        }
        private Exception DataFill(string Param, Boolean IsList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarLogTaxesPercentages.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.VarChar));
                    Com.CommandText = "[dbo].GetListLogTaxesPercentages";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemLogTaxesPercentages";
                    Com.Parameters.Add(new SqlParameter("@LogTaxesPercentageID", SqlDbType.Int));
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
                        CVarLogTaxesPercentages ObjCVarLogTaxesPercentages = new CVarLogTaxesPercentages();
                        ObjCVarLogTaxesPercentages.LogTaxesPercentageID = Convert.ToInt32(dr["LogTaxesPercentageID"].ToString());
                        ObjCVarLogTaxesPercentages.mTaxeTypeCode = Convert.ToString(dr["TaxeTypeCode"].ToString());
                        ObjCVarLogTaxesPercentages.mPercentage = Convert.ToDecimal(dr["Percentage"].ToString());
                        ObjCVarLogTaxesPercentages.mPercentageDate = Convert.ToDateTime(dr["PercentageDate"].ToString());
                        ObjCVarLogTaxesPercentages.mActionTaken = Convert.ToString(dr["ActionTaken"].ToString());
                        ObjCVarLogTaxesPercentages.mTaxeTypeID = Convert.ToInt32(dr["TaxeTypeID"].ToString());
                        ObjCVarLogTaxesPercentages.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarLogTaxesPercentages.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarLogTaxesPercentages.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarLogTaxesPercentages.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarLogTaxesPercentages.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        lstCVarLogTaxesPercentages.Add(ObjCVarLogTaxesPercentages);
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
            lstCVarLogTaxesPercentages.Clear();

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
                Com.CommandText = "[dbo].GetListPagingLogTaxesPercentages";
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
                        CVarLogTaxesPercentages ObjCVarLogTaxesPercentages = new CVarLogTaxesPercentages();
                        ObjCVarLogTaxesPercentages.LogTaxesPercentageID = Convert.ToInt32(dr["LogTaxesPercentageID"].ToString());
                        ObjCVarLogTaxesPercentages.mTaxeTypeCode = Convert.ToString(dr["TaxeTypeCode"].ToString());
                        ObjCVarLogTaxesPercentages.mPercentage = Convert.ToDecimal(dr["Percentage"].ToString());
                        ObjCVarLogTaxesPercentages.mPercentageDate = Convert.ToDateTime(dr["PercentageDate"].ToString());
                        ObjCVarLogTaxesPercentages.mActionTaken = Convert.ToString(dr["ActionTaken"].ToString());
                        ObjCVarLogTaxesPercentages.mTaxeTypeID = Convert.ToInt32(dr["TaxeTypeID"].ToString());
                        ObjCVarLogTaxesPercentages.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarLogTaxesPercentages.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarLogTaxesPercentages.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarLogTaxesPercentages.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarLogTaxesPercentages.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarLogTaxesPercentages.Add(ObjCVarLogTaxesPercentages);
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
                    Com.CommandText = "[dbo].DeleteListLogTaxesPercentages";
                else
                    Com.CommandText = "[dbo].UpdateListLogTaxesPercentages";
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
        public Exception DeleteItem(List<CPKLogTaxesPercentages> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemLogTaxesPercentages";
                Com.Parameters.Add(new SqlParameter("@LogTaxesPercentageID", SqlDbType.Int));
                foreach (CPKLogTaxesPercentages ObjCPKLogTaxesPercentages in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt32(ObjCPKLogTaxesPercentages.LogTaxesPercentageID);
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
        public Exception SaveMethod(List<CVarLogTaxesPercentages> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@TaxeTypeCode", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@Percentage", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@PercentageDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@ActionTaken", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@TaxeTypeID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CreatorUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CreationDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@ModificatorUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ModificationDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@IsDeleted", SqlDbType.Bit));
                SqlParameter paraLogTaxesPercentageID = Com.Parameters.Add(new SqlParameter("@LogTaxesPercentageID", SqlDbType.Int, 0, ParameterDirection.Input, false, 0, 0, "LogTaxesPercentageID", DataRowVersion.Default, null));
                foreach (CVarLogTaxesPercentages ObjCVarLogTaxesPercentages in SaveList)
                {
                    if (ObjCVarLogTaxesPercentages.mIsChanges == true)
                    {
                        if (ObjCVarLogTaxesPercentages.LogTaxesPercentageID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemLogTaxesPercentages";
                            paraLogTaxesPercentageID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarLogTaxesPercentages.LogTaxesPercentageID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemLogTaxesPercentages";
                            paraLogTaxesPercentageID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarLogTaxesPercentages.LogTaxesPercentageID != 0)
                        {
                            Com.Parameters["@LogTaxesPercentageID"].Value = ObjCVarLogTaxesPercentages.LogTaxesPercentageID;
                        }
                        Com.Parameters["@TaxeTypeCode"].Value = ObjCVarLogTaxesPercentages.TaxeTypeCode;
                        Com.Parameters["@Percentage"].Value = ObjCVarLogTaxesPercentages.Percentage;
                        Com.Parameters["@PercentageDate"].Value = ObjCVarLogTaxesPercentages.PercentageDate;
                        Com.Parameters["@ActionTaken"].Value = ObjCVarLogTaxesPercentages.ActionTaken;
                        Com.Parameters["@TaxeTypeID"].Value = ObjCVarLogTaxesPercentages.TaxeTypeID;
                        Com.Parameters["@CreatorUserID"].Value = ObjCVarLogTaxesPercentages.CreatorUserID;
                        Com.Parameters["@CreationDate"].Value = ObjCVarLogTaxesPercentages.CreationDate;
                        Com.Parameters["@ModificatorUserID"].Value = ObjCVarLogTaxesPercentages.ModificatorUserID;
                        Com.Parameters["@ModificationDate"].Value = ObjCVarLogTaxesPercentages.ModificationDate;
                        Com.Parameters["@IsDeleted"].Value = ObjCVarLogTaxesPercentages.IsDeleted;
                        EndTrans(Com, Con);
                        if (ObjCVarLogTaxesPercentages.LogTaxesPercentageID == 0)
                        {
                            ObjCVarLogTaxesPercentages.LogTaxesPercentageID = Convert.ToInt32(Com.Parameters["@LogTaxesPercentageID"].Value);
                        }
                        ObjCVarLogTaxesPercentages.mIsChanges = false;
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

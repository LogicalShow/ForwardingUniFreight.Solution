using System;
using System.Data;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.MasterData.Others.Generated
{
    [Serializable]
    public class CPKTrackingStage
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
    public partial class CVarTrackingStage : CPKTrackingStage
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal String mName;
        internal String mNotes;
        internal Int32 mViewOrder;
        internal Boolean mIsOcean;
        internal Boolean mIsAir;
        internal Boolean mIsInland;
        internal Boolean mIsImport;
        internal Boolean mIsExport;
        internal Boolean mIsDomestic;
        internal Boolean mIsClearance;
        #endregion

        #region "Methods"
        public String Name
        {
            get { return mName; }
            set { mIsChanges = true; mName = value; }
        }
        public String Notes
        {
            get { return mNotes; }
            set { mIsChanges = true; mNotes = value; }
        }
        public Int32 ViewOrder
        {
            get { return mViewOrder; }
            set { mIsChanges = true; mViewOrder = value; }
        }
        public Boolean IsOcean
        {
            get { return mIsOcean; }
            set { mIsChanges = true; mIsOcean = value; }
        }
        public Boolean IsAir
        {
            get { return mIsAir; }
            set { mIsChanges = true; mIsAir = value; }
        }
        public Boolean IsInland
        {
            get { return mIsInland; }
            set { mIsChanges = true; mIsInland = value; }
        }
        public Boolean IsImport
        {
            get { return mIsImport; }
            set { mIsChanges = true; mIsImport = value; }
        }
        public Boolean IsExport
        {
            get { return mIsExport; }
            set { mIsChanges = true; mIsExport = value; }
        }
        public Boolean IsDomestic
        {
            get { return mIsDomestic; }
            set { mIsChanges = true; mIsDomestic = value; }
        }
        public Boolean IsClearance
        {
            get { return mIsClearance; }
            set { mIsChanges = true; mIsClearance = value; }
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

    public partial class CTrackingStage
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
        public List<CVarTrackingStage> lstCVarTrackingStage = new List<CVarTrackingStage>();
        public List<CPKTrackingStage> lstDeletedCPKTrackingStage = new List<CPKTrackingStage>();
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
            lstCVarTrackingStage.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListTrackingStage";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemTrackingStage";
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
                        CVarTrackingStage ObjCVarTrackingStage = new CVarTrackingStage();
                        ObjCVarTrackingStage.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarTrackingStage.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarTrackingStage.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarTrackingStage.mViewOrder = Convert.ToInt32(dr["ViewOrder"].ToString());
                        ObjCVarTrackingStage.mIsOcean = Convert.ToBoolean(dr["IsOcean"].ToString());
                        ObjCVarTrackingStage.mIsAir = Convert.ToBoolean(dr["IsAir"].ToString());
                        ObjCVarTrackingStage.mIsInland = Convert.ToBoolean(dr["IsInland"].ToString());
                        ObjCVarTrackingStage.mIsImport = Convert.ToBoolean(dr["IsImport"].ToString());
                        ObjCVarTrackingStage.mIsExport = Convert.ToBoolean(dr["IsExport"].ToString());
                        ObjCVarTrackingStage.mIsDomestic = Convert.ToBoolean(dr["IsDomestic"].ToString());
                        ObjCVarTrackingStage.mIsClearance = Convert.ToBoolean(dr["IsClearance"].ToString());
                        lstCVarTrackingStage.Add(ObjCVarTrackingStage);
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
            lstCVarTrackingStage.Clear();

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
                Com.CommandText = "[dbo].GetListPagingTrackingStage";
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
                        CVarTrackingStage ObjCVarTrackingStage = new CVarTrackingStage();
                        ObjCVarTrackingStage.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarTrackingStage.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarTrackingStage.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarTrackingStage.mViewOrder = Convert.ToInt32(dr["ViewOrder"].ToString());
                        ObjCVarTrackingStage.mIsOcean = Convert.ToBoolean(dr["IsOcean"].ToString());
                        ObjCVarTrackingStage.mIsAir = Convert.ToBoolean(dr["IsAir"].ToString());
                        ObjCVarTrackingStage.mIsInland = Convert.ToBoolean(dr["IsInland"].ToString());
                        ObjCVarTrackingStage.mIsImport = Convert.ToBoolean(dr["IsImport"].ToString());
                        ObjCVarTrackingStage.mIsExport = Convert.ToBoolean(dr["IsExport"].ToString());
                        ObjCVarTrackingStage.mIsDomestic = Convert.ToBoolean(dr["IsDomestic"].ToString());
                        ObjCVarTrackingStage.mIsClearance = Convert.ToBoolean(dr["IsClearance"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarTrackingStage.Add(ObjCVarTrackingStage);
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
                    Com.CommandText = "[dbo].DeleteListTrackingStage";
                else
                    Com.CommandText = "[dbo].UpdateListTrackingStage";
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
        public Exception DeleteItem(List<CPKTrackingStage> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemTrackingStage";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int));
                foreach (CPKTrackingStage ObjCPKTrackingStage in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt32(ObjCPKTrackingStage.ID);
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
        public Exception SaveMethod(List<CVarTrackingStage> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@Notes", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@ViewOrder", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@IsOcean", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@IsAir", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@IsInland", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@IsImport", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@IsExport", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@IsDomestic", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@IsClearance", SqlDbType.Bit));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarTrackingStage ObjCVarTrackingStage in SaveList)
                {
                    if (ObjCVarTrackingStage.mIsChanges == true)
                    {
                        if (ObjCVarTrackingStage.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemTrackingStage";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarTrackingStage.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemTrackingStage";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarTrackingStage.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarTrackingStage.ID;
                        }
                        Com.Parameters["@Name"].Value = ObjCVarTrackingStage.Name;
                        Com.Parameters["@Notes"].Value = ObjCVarTrackingStage.Notes;
                        Com.Parameters["@ViewOrder"].Value = ObjCVarTrackingStage.ViewOrder;
                        Com.Parameters["@IsOcean"].Value = ObjCVarTrackingStage.IsOcean;
                        Com.Parameters["@IsAir"].Value = ObjCVarTrackingStage.IsAir;
                        Com.Parameters["@IsInland"].Value = ObjCVarTrackingStage.IsInland;
                        Com.Parameters["@IsImport"].Value = ObjCVarTrackingStage.IsImport;
                        Com.Parameters["@IsExport"].Value = ObjCVarTrackingStage.IsExport;
                        Com.Parameters["@IsDomestic"].Value = ObjCVarTrackingStage.IsDomestic;
                        Com.Parameters["@IsClearance"].Value = ObjCVarTrackingStage.IsClearance;
                        EndTrans(Com, Con);
                        if (ObjCVarTrackingStage.ID == 0)
                        {
                            ObjCVarTrackingStage.ID = Convert.ToInt32(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarTrackingStage.mIsChanges = false;
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

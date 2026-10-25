using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.ContainerFreightStation.Transactions
{
    [Serializable]
    public class CPKWH_ReleaseOrders
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
    public partial class CVarWH_ReleaseOrders : CPKWH_ReleaseOrders
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int64 mInventoryID;
        internal String mReleaseNumber;
        internal DateTime mReleasingDate;
        internal String mCouponNumber;
        internal String mCertificationNumber;
        internal String mRemarks;
        internal Int32 mAddedBy;
        internal DateTime mAddedAt;
        internal Int32 mUpdatedBy;
        internal DateTime mUpdatedAt;
        #endregion

        #region "Methods"
        public Int64 InventoryID
        {
            get { return mInventoryID; }
            set { mIsChanges = true; mInventoryID = value; }
        }
        public String ReleaseNumber
        {
            get { return mReleaseNumber; }
            set { mIsChanges = true; mReleaseNumber = value; }
        }
        public DateTime ReleasingDate
        {
            get { return mReleasingDate; }
            set { mIsChanges = true; mReleasingDate = value; }
        }
        public String CouponNumber
        {
            get { return mCouponNumber; }
            set { mIsChanges = true; mCouponNumber = value; }
        }
        public String CertificationNumber
        {
            get { return mCertificationNumber; }
            set { mIsChanges = true; mCertificationNumber = value; }
        }
        public String Remarks
        {
            get { return mRemarks; }
            set { mIsChanges = true; mRemarks = value; }
        }
        public Int32 AddedBy
        {
            get { return mAddedBy; }
            set { mIsChanges = true; mAddedBy = value; }
        }
        public DateTime AddedAt
        {
            get { return mAddedAt; }
            set { mIsChanges = true; mAddedAt = value; }
        }
        public Int32 UpdatedBy
        {
            get { return mUpdatedBy; }
            set { mIsChanges = true; mUpdatedBy = value; }
        }
        public DateTime UpdatedAt
        {
            get { return mUpdatedAt; }
            set { mIsChanges = true; mUpdatedAt = value; }
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

    public partial class CWH_ReleaseOrders
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
        public List<CVarWH_ReleaseOrders> lstCVarWH_ReleaseOrders = new List<CVarWH_ReleaseOrders>();
        public List<CPKWH_ReleaseOrders> lstDeletedCPKWH_ReleaseOrders = new List<CPKWH_ReleaseOrders>();
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
            lstCVarWH_ReleaseOrders.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListWH_ReleaseOrders";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemWH_ReleaseOrders";
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
                        CVarWH_ReleaseOrders ObjCVarWH_ReleaseOrders = new CVarWH_ReleaseOrders();
                        ObjCVarWH_ReleaseOrders.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarWH_ReleaseOrders.mInventoryID = Convert.ToInt64(dr["InventoryID"].ToString());
                        ObjCVarWH_ReleaseOrders.mReleaseNumber = Convert.ToString(dr["ReleaseNumber"].ToString());
                        ObjCVarWH_ReleaseOrders.mReleasingDate = Convert.ToDateTime(dr["ReleasingDate"].ToString());
                        ObjCVarWH_ReleaseOrders.mCouponNumber = Convert.ToString(dr["CouponNumber"].ToString());
                        ObjCVarWH_ReleaseOrders.mCertificationNumber = Convert.ToString(dr["CertificationNumber"].ToString());
                        ObjCVarWH_ReleaseOrders.mRemarks = Convert.ToString(dr["Remarks"].ToString());
                        ObjCVarWH_ReleaseOrders.mAddedBy = Convert.ToInt32(dr["AddedBy"].ToString());
                        ObjCVarWH_ReleaseOrders.mAddedAt = Convert.ToDateTime(dr["AddedAt"].ToString());
                        ObjCVarWH_ReleaseOrders.mUpdatedBy = Convert.ToInt32(dr["UpdatedBy"].ToString());
                        ObjCVarWH_ReleaseOrders.mUpdatedAt = Convert.ToDateTime(dr["UpdatedAt"].ToString());
                        lstCVarWH_ReleaseOrders.Add(ObjCVarWH_ReleaseOrders);
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
            lstCVarWH_ReleaseOrders.Clear();

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
                Com.CommandText = "[dbo].GetListPagingWH_ReleaseOrders";
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
                        CVarWH_ReleaseOrders ObjCVarWH_ReleaseOrders = new CVarWH_ReleaseOrders();
                        ObjCVarWH_ReleaseOrders.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarWH_ReleaseOrders.mInventoryID = Convert.ToInt64(dr["InventoryID"].ToString());
                        ObjCVarWH_ReleaseOrders.mReleaseNumber = Convert.ToString(dr["ReleaseNumber"].ToString());
                        ObjCVarWH_ReleaseOrders.mReleasingDate = Convert.ToDateTime(dr["ReleasingDate"].ToString());
                        ObjCVarWH_ReleaseOrders.mCouponNumber = Convert.ToString(dr["CouponNumber"].ToString());
                        ObjCVarWH_ReleaseOrders.mCertificationNumber = Convert.ToString(dr["CertificationNumber"].ToString());
                        ObjCVarWH_ReleaseOrders.mRemarks = Convert.ToString(dr["Remarks"].ToString());
                        ObjCVarWH_ReleaseOrders.mAddedBy = Convert.ToInt32(dr["AddedBy"].ToString());
                        ObjCVarWH_ReleaseOrders.mAddedAt = Convert.ToDateTime(dr["AddedAt"].ToString());
                        ObjCVarWH_ReleaseOrders.mUpdatedBy = Convert.ToInt32(dr["UpdatedBy"].ToString());
                        ObjCVarWH_ReleaseOrders.mUpdatedAt = Convert.ToDateTime(dr["UpdatedAt"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarWH_ReleaseOrders.Add(ObjCVarWH_ReleaseOrders);
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
                    Com.CommandText = "[dbo].DeleteListWH_ReleaseOrders";
                else
                    Com.CommandText = "[dbo].UpdateListWH_ReleaseOrders";
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
        public Exception DeleteItem(List<CPKWH_ReleaseOrders> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemWH_ReleaseOrders";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt));
                foreach (CPKWH_ReleaseOrders ObjCPKWH_ReleaseOrders in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt64(ObjCPKWH_ReleaseOrders.ID);
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
        public Exception SaveMethod(List<CVarWH_ReleaseOrders> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@InventoryID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@ReleaseNumber", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@ReleasingDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@CouponNumber", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@CertificationNumber", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@Remarks", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@AddedBy", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@AddedAt", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@UpdatedBy", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@UpdatedAt", SqlDbType.DateTime));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarWH_ReleaseOrders ObjCVarWH_ReleaseOrders in SaveList)
                {
                    if (ObjCVarWH_ReleaseOrders.mIsChanges == true)
                    {
                        if (ObjCVarWH_ReleaseOrders.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemWH_ReleaseOrders";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarWH_ReleaseOrders.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemWH_ReleaseOrders";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarWH_ReleaseOrders.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarWH_ReleaseOrders.ID;
                        }
                        Com.Parameters["@InventoryID"].Value = ObjCVarWH_ReleaseOrders.InventoryID;
                        Com.Parameters["@ReleaseNumber"].Value = ObjCVarWH_ReleaseOrders.ReleaseNumber;
                        Com.Parameters["@ReleasingDate"].Value = ObjCVarWH_ReleaseOrders.ReleasingDate;
                        Com.Parameters["@CouponNumber"].Value = ObjCVarWH_ReleaseOrders.CouponNumber;
                        Com.Parameters["@CertificationNumber"].Value = ObjCVarWH_ReleaseOrders.CertificationNumber;
                        Com.Parameters["@Remarks"].Value = ObjCVarWH_ReleaseOrders.Remarks;
                        Com.Parameters["@AddedBy"].Value = ObjCVarWH_ReleaseOrders.AddedBy;
                        Com.Parameters["@AddedAt"].Value = ObjCVarWH_ReleaseOrders.AddedAt;
                        Com.Parameters["@UpdatedBy"].Value = ObjCVarWH_ReleaseOrders.UpdatedBy;
                        Com.Parameters["@UpdatedAt"].Value = ObjCVarWH_ReleaseOrders.UpdatedAt;
                        EndTrans(Com, Con);
                        if (ObjCVarWH_ReleaseOrders.ID == 0)
                        {
                            ObjCVarWH_ReleaseOrders.ID = Convert.ToInt64(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarWH_ReleaseOrders.mIsChanges = false;
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

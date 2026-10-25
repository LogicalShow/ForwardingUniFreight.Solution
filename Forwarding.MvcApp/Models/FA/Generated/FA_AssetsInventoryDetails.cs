using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.FA.Generated
{
    [Serializable]
    public class CPKFA_AssetsInventoryDetails
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
    public partial class CVarFA_AssetsInventoryDetails : CPKFA_AssetsInventoryDetails
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mAssetID;
        internal Int32 mOriginalBranchID;
        internal Int32 mOriginalDevisionID;
        internal Int32 mOriginalDepartmentID;
        internal Decimal mQty;
        internal Decimal mActualQty;
        internal String mNotes;
        internal Int32 mFA_AssetInventoryID;
        #endregion

        #region "Methods"
        public Int32 AssetID
        {
            get { return mAssetID; }
            set { mIsChanges = true; mAssetID = value; }
        }
        public Int32 OriginalBranchID
        {
            get { return mOriginalBranchID; }
            set { mIsChanges = true; mOriginalBranchID = value; }
        }
        public Int32 OriginalDevisionID
        {
            get { return mOriginalDevisionID; }
            set { mIsChanges = true; mOriginalDevisionID = value; }
        }
        public Int32 OriginalDepartmentID
        {
            get { return mOriginalDepartmentID; }
            set { mIsChanges = true; mOriginalDepartmentID = value; }
        }
        public Decimal Qty
        {
            get { return mQty; }
            set { mIsChanges = true; mQty = value; }
        }
        public Decimal ActualQty
        {
            get { return mActualQty; }
            set { mIsChanges = true; mActualQty = value; }
        }
        public String Notes
        {
            get { return mNotes; }
            set { mIsChanges = true; mNotes = value; }
        }
        public Int32 FA_AssetInventoryID
        {
            get { return mFA_AssetInventoryID; }
            set { mIsChanges = true; mFA_AssetInventoryID = value; }
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

    public partial class CFA_AssetsInventoryDetails
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
        public List<CVarFA_AssetsInventoryDetails> lstCVarFA_AssetsInventoryDetails = new List<CVarFA_AssetsInventoryDetails>();
        public List<CPKFA_AssetsInventoryDetails> lstDeletedCPKFA_AssetsInventoryDetails = new List<CPKFA_AssetsInventoryDetails>();
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
            lstCVarFA_AssetsInventoryDetails.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListFA_AssetsInventoryDetails";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemFA_AssetsInventoryDetails";
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
                        CVarFA_AssetsInventoryDetails ObjCVarFA_AssetsInventoryDetails = new CVarFA_AssetsInventoryDetails();
                        ObjCVarFA_AssetsInventoryDetails.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarFA_AssetsInventoryDetails.mAssetID = Convert.ToInt32(dr["AssetID"].ToString());
                        ObjCVarFA_AssetsInventoryDetails.mOriginalBranchID = Convert.ToInt32(dr["OriginalBranchID"].ToString());
                        ObjCVarFA_AssetsInventoryDetails.mOriginalDevisionID = Convert.ToInt32(dr["OriginalDevisionID"].ToString());
                        ObjCVarFA_AssetsInventoryDetails.mOriginalDepartmentID = Convert.ToInt32(dr["OriginalDepartmentID"].ToString());
                        ObjCVarFA_AssetsInventoryDetails.mQty = Convert.ToDecimal(dr["Qty"].ToString());
                        ObjCVarFA_AssetsInventoryDetails.mActualQty = Convert.ToDecimal(dr["ActualQty"].ToString());
                        ObjCVarFA_AssetsInventoryDetails.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarFA_AssetsInventoryDetails.mFA_AssetInventoryID = Convert.ToInt32(dr["FA_AssetInventoryID"].ToString());
                        lstCVarFA_AssetsInventoryDetails.Add(ObjCVarFA_AssetsInventoryDetails);
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
            lstCVarFA_AssetsInventoryDetails.Clear();

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
                Com.CommandText = "[dbo].GetListPagingFA_AssetsInventoryDetails";
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
                        CVarFA_AssetsInventoryDetails ObjCVarFA_AssetsInventoryDetails = new CVarFA_AssetsInventoryDetails();
                        ObjCVarFA_AssetsInventoryDetails.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarFA_AssetsInventoryDetails.mAssetID = Convert.ToInt32(dr["AssetID"].ToString());
                        ObjCVarFA_AssetsInventoryDetails.mOriginalBranchID = Convert.ToInt32(dr["OriginalBranchID"].ToString());
                        ObjCVarFA_AssetsInventoryDetails.mOriginalDevisionID = Convert.ToInt32(dr["OriginalDevisionID"].ToString());
                        ObjCVarFA_AssetsInventoryDetails.mOriginalDepartmentID = Convert.ToInt32(dr["OriginalDepartmentID"].ToString());
                        ObjCVarFA_AssetsInventoryDetails.mQty = Convert.ToDecimal(dr["Qty"].ToString());
                        ObjCVarFA_AssetsInventoryDetails.mActualQty = Convert.ToDecimal(dr["ActualQty"].ToString());
                        ObjCVarFA_AssetsInventoryDetails.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarFA_AssetsInventoryDetails.mFA_AssetInventoryID = Convert.ToInt32(dr["FA_AssetInventoryID"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarFA_AssetsInventoryDetails.Add(ObjCVarFA_AssetsInventoryDetails);
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
                    Com.CommandText = "[dbo].DeleteListFA_AssetsInventoryDetails";
                else
                    Com.CommandText = "[dbo].UpdateListFA_AssetsInventoryDetails";
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
        public Exception DeleteItem(List<CPKFA_AssetsInventoryDetails> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemFA_AssetsInventoryDetails";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int));
                foreach (CPKFA_AssetsInventoryDetails ObjCPKFA_AssetsInventoryDetails in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt32(ObjCPKFA_AssetsInventoryDetails.ID);
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
        public Exception SaveMethod(List<CVarFA_AssetsInventoryDetails> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@AssetID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@OriginalBranchID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@OriginalDevisionID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@OriginalDepartmentID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@Qty", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@ActualQty", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@Notes", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@FA_AssetInventoryID", SqlDbType.Int));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarFA_AssetsInventoryDetails ObjCVarFA_AssetsInventoryDetails in SaveList)
                {
                    if (ObjCVarFA_AssetsInventoryDetails.mIsChanges == true)
                    {
                        if (ObjCVarFA_AssetsInventoryDetails.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemFA_AssetsInventoryDetails";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarFA_AssetsInventoryDetails.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemFA_AssetsInventoryDetails";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarFA_AssetsInventoryDetails.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarFA_AssetsInventoryDetails.ID;
                        }
                        Com.Parameters["@AssetID"].Value = ObjCVarFA_AssetsInventoryDetails.AssetID;
                        Com.Parameters["@OriginalBranchID"].Value = ObjCVarFA_AssetsInventoryDetails.OriginalBranchID;
                        Com.Parameters["@OriginalDevisionID"].Value = ObjCVarFA_AssetsInventoryDetails.OriginalDevisionID;
                        Com.Parameters["@OriginalDepartmentID"].Value = ObjCVarFA_AssetsInventoryDetails.OriginalDepartmentID;
                        Com.Parameters["@Qty"].Value = ObjCVarFA_AssetsInventoryDetails.Qty;
                        Com.Parameters["@ActualQty"].Value = ObjCVarFA_AssetsInventoryDetails.ActualQty;
                        Com.Parameters["@Notes"].Value = ObjCVarFA_AssetsInventoryDetails.Notes;
                        Com.Parameters["@FA_AssetInventoryID"].Value = ObjCVarFA_AssetsInventoryDetails.FA_AssetInventoryID;
                        EndTrans(Com, Con);
                        if (ObjCVarFA_AssetsInventoryDetails.ID == 0)
                        {
                            ObjCVarFA_AssetsInventoryDetails.ID = Convert.ToInt32(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarFA_AssetsInventoryDetails.mIsChanges = false;
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

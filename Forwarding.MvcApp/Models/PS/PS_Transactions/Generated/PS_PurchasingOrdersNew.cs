using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.PS.PS_Transactions.Generated
{
    [Serializable]
    public class CPKPS_PurchasingOrdersNew
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
    public partial class CVarPS_PurchasingOrdersNew : CPKPS_PurchasingOrdersNew
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal String mRequestNo;
        internal DateTime mRequestDate;
        internal Int32 mDepartmentID;
        internal Int32 mSupplierID;
        internal String mNotes;
        internal Boolean mIsApproved;
        internal Int32 mCreatedUserID;
        internal DateTime mCreatedDate;
        internal Int32 mApprovedUserID;
        internal DateTime mApprovedDate;
        internal Int32 mEditedByUserID;
        internal DateTime mEditedDate;
        internal Int32 mCurrencyID;
        internal Int32 mCustodyID;
        #endregion

        #region "Methods"
        public String RequestNo
        {
            get { return mRequestNo; }
            set { mIsChanges = true; mRequestNo = value; }
        }
        public DateTime RequestDate
        {
            get { return mRequestDate; }
            set { mIsChanges = true; mRequestDate = value; }
        }
        public Int32 DepartmentID
        {
            get { return mDepartmentID; }
            set { mIsChanges = true; mDepartmentID = value; }
        }
        public Int32 SupplierID
        {
            get { return mSupplierID; }
            set { mIsChanges = true; mSupplierID = value; }
        }
        public String Notes
        {
            get { return mNotes; }
            set { mIsChanges = true; mNotes = value; }
        }
        public Boolean IsApproved
        {
            get { return mIsApproved; }
            set { mIsChanges = true; mIsApproved = value; }
        }
        public Int32 CreatedUserID
        {
            get { return mCreatedUserID; }
            set { mIsChanges = true; mCreatedUserID = value; }
        }
        public DateTime CreatedDate
        {
            get { return mCreatedDate; }
            set { mIsChanges = true; mCreatedDate = value; }
        }
        public Int32 ApprovedUserID
        {
            get { return mApprovedUserID; }
            set { mIsChanges = true; mApprovedUserID = value; }
        }
        public DateTime ApprovedDate
        {
            get { return mApprovedDate; }
            set { mIsChanges = true; mApprovedDate = value; }
        }
        public Int32 EditedByUserID
        {
            get { return mEditedByUserID; }
            set { mIsChanges = true; mEditedByUserID = value; }
        }
        public DateTime EditedDate
        {
            get { return mEditedDate; }
            set { mIsChanges = true; mEditedDate = value; }
        }
        public Int32 CurrencyID
        {
            get { return mCurrencyID; }
            set { mIsChanges = true; mCurrencyID = value; }
        }
        public Int32 CustodyID
        {
            get { return mCustodyID; }
            set { mIsChanges = true; mCustodyID = value; }
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

    public partial class CPS_PurchasingOrdersNew
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
        public List<CVarPS_PurchasingOrdersNew> lstCVarPS_PurchasingOrdersNew = new List<CVarPS_PurchasingOrdersNew>();
        public List<CPKPS_PurchasingOrdersNew> lstDeletedCPKPS_PurchasingOrdersNew = new List<CPKPS_PurchasingOrdersNew>();
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
            lstCVarPS_PurchasingOrdersNew.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListPS_PurchasingOrdersNew";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemPS_PurchasingOrdersNew";
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
                        CVarPS_PurchasingOrdersNew ObjCVarPS_PurchasingOrdersNew = new CVarPS_PurchasingOrdersNew();
                        ObjCVarPS_PurchasingOrdersNew.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarPS_PurchasingOrdersNew.mRequestNo = Convert.ToString(dr["RequestNo"].ToString());
                        ObjCVarPS_PurchasingOrdersNew.mRequestDate = Convert.ToDateTime(dr["RequestDate"].ToString());
                        ObjCVarPS_PurchasingOrdersNew.mDepartmentID = Convert.ToInt32(dr["DepartmentID"].ToString());
                        ObjCVarPS_PurchasingOrdersNew.mSupplierID = Convert.ToInt32(dr["SupplierID"].ToString());
                        ObjCVarPS_PurchasingOrdersNew.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarPS_PurchasingOrdersNew.mIsApproved = Convert.ToBoolean(dr["IsApproved"].ToString());
                        ObjCVarPS_PurchasingOrdersNew.mCreatedUserID = Convert.ToInt32(dr["CreatedUserID"].ToString());
                        ObjCVarPS_PurchasingOrdersNew.mCreatedDate = Convert.ToDateTime(dr["CreatedDate"].ToString());
                        ObjCVarPS_PurchasingOrdersNew.mApprovedUserID = Convert.ToInt32(dr["ApprovedUserID"].ToString());
                        ObjCVarPS_PurchasingOrdersNew.mApprovedDate = Convert.ToDateTime(dr["ApprovedDate"].ToString());
                        ObjCVarPS_PurchasingOrdersNew.mEditedByUserID = Convert.ToInt32(dr["EditedByUserID"].ToString());
                        ObjCVarPS_PurchasingOrdersNew.mEditedDate = Convert.ToDateTime(dr["EditedDate"].ToString());
                        ObjCVarPS_PurchasingOrdersNew.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarPS_PurchasingOrdersNew.mCustodyID = Convert.ToInt32(dr["CustodyID"].ToString());
                        lstCVarPS_PurchasingOrdersNew.Add(ObjCVarPS_PurchasingOrdersNew);
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
            lstCVarPS_PurchasingOrdersNew.Clear();

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
                Com.CommandText = "[dbo].GetListPagingPS_PurchasingOrdersNew";
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
                        CVarPS_PurchasingOrdersNew ObjCVarPS_PurchasingOrdersNew = new CVarPS_PurchasingOrdersNew();
                        ObjCVarPS_PurchasingOrdersNew.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarPS_PurchasingOrdersNew.mRequestNo = Convert.ToString(dr["RequestNo"].ToString());
                        ObjCVarPS_PurchasingOrdersNew.mRequestDate = Convert.ToDateTime(dr["RequestDate"].ToString());
                        ObjCVarPS_PurchasingOrdersNew.mDepartmentID = Convert.ToInt32(dr["DepartmentID"].ToString());
                        ObjCVarPS_PurchasingOrdersNew.mSupplierID = Convert.ToInt32(dr["SupplierID"].ToString());
                        ObjCVarPS_PurchasingOrdersNew.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarPS_PurchasingOrdersNew.mIsApproved = Convert.ToBoolean(dr["IsApproved"].ToString());
                        ObjCVarPS_PurchasingOrdersNew.mCreatedUserID = Convert.ToInt32(dr["CreatedUserID"].ToString());
                        ObjCVarPS_PurchasingOrdersNew.mCreatedDate = Convert.ToDateTime(dr["CreatedDate"].ToString());
                        ObjCVarPS_PurchasingOrdersNew.mApprovedUserID = Convert.ToInt32(dr["ApprovedUserID"].ToString());
                        ObjCVarPS_PurchasingOrdersNew.mApprovedDate = Convert.ToDateTime(dr["ApprovedDate"].ToString());
                        ObjCVarPS_PurchasingOrdersNew.mEditedByUserID = Convert.ToInt32(dr["EditedByUserID"].ToString());
                        ObjCVarPS_PurchasingOrdersNew.mEditedDate = Convert.ToDateTime(dr["EditedDate"].ToString());
                        ObjCVarPS_PurchasingOrdersNew.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarPS_PurchasingOrdersNew.mCustodyID = Convert.ToInt32(dr["CustodyID"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarPS_PurchasingOrdersNew.Add(ObjCVarPS_PurchasingOrdersNew);
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
                    Com.CommandText = "[dbo].DeleteListPS_PurchasingOrdersNew";
                else
                    Com.CommandText = "[dbo].UpdateListPS_PurchasingOrdersNew";
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
        public Exception DeleteItem(List<CPKPS_PurchasingOrdersNew> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemPS_PurchasingOrdersNew";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt));
                foreach (CPKPS_PurchasingOrdersNew ObjCPKPS_PurchasingOrdersNew in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt64(ObjCPKPS_PurchasingOrdersNew.ID);
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
        public Exception SaveMethod(List<CVarPS_PurchasingOrdersNew> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@RequestNo", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@RequestDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@DepartmentID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@SupplierID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@Notes", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@IsApproved", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@CreatedUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CreatedDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@ApprovedUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ApprovedDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@EditedByUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@EditedDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@CurrencyID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CustodyID", SqlDbType.Int));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarPS_PurchasingOrdersNew ObjCVarPS_PurchasingOrdersNew in SaveList)
                {
                    if (ObjCVarPS_PurchasingOrdersNew.mIsChanges == true)
                    {
                        if (ObjCVarPS_PurchasingOrdersNew.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemPS_PurchasingOrdersNew";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarPS_PurchasingOrdersNew.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemPS_PurchasingOrdersNew";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarPS_PurchasingOrdersNew.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarPS_PurchasingOrdersNew.ID;
                        }
                        Com.Parameters["@RequestNo"].Value = ObjCVarPS_PurchasingOrdersNew.RequestNo;
                        Com.Parameters["@RequestDate"].Value = ObjCVarPS_PurchasingOrdersNew.RequestDate;
                        Com.Parameters["@DepartmentID"].Value = ObjCVarPS_PurchasingOrdersNew.DepartmentID;
                        Com.Parameters["@SupplierID"].Value = ObjCVarPS_PurchasingOrdersNew.SupplierID;
                        Com.Parameters["@Notes"].Value = ObjCVarPS_PurchasingOrdersNew.Notes;
                        Com.Parameters["@IsApproved"].Value = ObjCVarPS_PurchasingOrdersNew.IsApproved;
                        Com.Parameters["@CreatedUserID"].Value = ObjCVarPS_PurchasingOrdersNew.CreatedUserID;
                        Com.Parameters["@CreatedDate"].Value = ObjCVarPS_PurchasingOrdersNew.CreatedDate;
                        Com.Parameters["@ApprovedUserID"].Value = ObjCVarPS_PurchasingOrdersNew.ApprovedUserID;
                        Com.Parameters["@ApprovedDate"].Value = ObjCVarPS_PurchasingOrdersNew.ApprovedDate;
                        Com.Parameters["@EditedByUserID"].Value = ObjCVarPS_PurchasingOrdersNew.EditedByUserID;
                        Com.Parameters["@EditedDate"].Value = ObjCVarPS_PurchasingOrdersNew.EditedDate;
                        Com.Parameters["@CurrencyID"].Value = ObjCVarPS_PurchasingOrdersNew.CurrencyID;
                        Com.Parameters["@CustodyID"].Value = ObjCVarPS_PurchasingOrdersNew.CustodyID;
                        EndTrans(Com, Con);
                        if (ObjCVarPS_PurchasingOrdersNew.ID == 0)
                        {
                            ObjCVarPS_PurchasingOrdersNew.ID = Convert.ToInt64(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarPS_PurchasingOrdersNew.mIsChanges = false;
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

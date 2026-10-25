using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.InterServices.Transactions.Generated
{
    [Serializable]
    public class CPKInterServicesRequests
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
    public partial class CVarInterServicesRequests : CPKInterServicesRequests
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mChargeTypeID;
        internal Int64 mOperationID;
        internal Int32 mStatusID;
        internal Int32 mFromDepartmentID;
        internal Int32 mToDepartmentID;
        internal Int32 mToCompanyID;
        internal Int32 mToUserID;
        internal Decimal mCost;
        internal Decimal mSalePrice;
        internal String mNotes;
        internal Int32 mCreatorUserID;
        internal DateTime mCreationDate;
        internal Int32 mModificatorUserID;
        internal DateTime mModificationDate;
        #endregion

        #region "Methods"
        public Int32 ChargeTypeID
        {
            get { return mChargeTypeID; }
            set { mIsChanges = true; mChargeTypeID = value; }
        }
        public Int64 OperationID
        {
            get { return mOperationID; }
            set { mIsChanges = true; mOperationID = value; }
        }
        public Int32 StatusID
        {
            get { return mStatusID; }
            set { mIsChanges = true; mStatusID = value; }
        }
        public Int32 FromDepartmentID
        {
            get { return mFromDepartmentID; }
            set { mIsChanges = true; mFromDepartmentID = value; }
        }
        public Int32 ToDepartmentID
        {
            get { return mToDepartmentID; }
            set { mIsChanges = true; mToDepartmentID = value; }
        }
        public Int32 ToCompanyID
        {
            get { return mToCompanyID; }
            set { mIsChanges = true; mToCompanyID = value; }
        }
        public Int32 ToUserID
        {
            get { return mToUserID; }
            set { mIsChanges = true; mToUserID = value; }
        }
        public Decimal Cost
        {
            get { return mCost; }
            set { mIsChanges = true; mCost = value; }
        }
        public Decimal SalePrice
        {
            get { return mSalePrice; }
            set { mIsChanges = true; mSalePrice = value; }
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

    public partial class CInterServicesRequests
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
        public List<CVarInterServicesRequests> lstCVarInterServicesRequests = new List<CVarInterServicesRequests>();
        public List<CPKInterServicesRequests> lstDeletedCPKInterServicesRequests = new List<CPKInterServicesRequests>();
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
            lstCVarInterServicesRequests.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListInterServicesRequests";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemInterServicesRequests";
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
                        CVarInterServicesRequests ObjCVarInterServicesRequests = new CVarInterServicesRequests();
                        ObjCVarInterServicesRequests.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarInterServicesRequests.mChargeTypeID = Convert.ToInt32(dr["ChargeTypeID"].ToString());
                        ObjCVarInterServicesRequests.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
                        ObjCVarInterServicesRequests.mStatusID = Convert.ToInt32(dr["StatusID"].ToString());
                        ObjCVarInterServicesRequests.mFromDepartmentID = Convert.ToInt32(dr["FromDepartmentID"].ToString());
                        ObjCVarInterServicesRequests.mToDepartmentID = Convert.ToInt32(dr["ToDepartmentID"].ToString());
                        ObjCVarInterServicesRequests.mToCompanyID = Convert.ToInt32(dr["ToCompanyID"].ToString());
                        ObjCVarInterServicesRequests.mToUserID = Convert.ToInt32(dr["ToUserID"].ToString());
                        ObjCVarInterServicesRequests.mCost = Convert.ToDecimal(dr["Cost"].ToString());
                        ObjCVarInterServicesRequests.mSalePrice = Convert.ToDecimal(dr["SalePrice"].ToString());
                        ObjCVarInterServicesRequests.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarInterServicesRequests.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarInterServicesRequests.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarInterServicesRequests.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarInterServicesRequests.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        lstCVarInterServicesRequests.Add(ObjCVarInterServicesRequests);
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
            lstCVarInterServicesRequests.Clear();

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
                Com.CommandText = "[dbo].GetListPagingInterServicesRequests";
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
                        CVarInterServicesRequests ObjCVarInterServicesRequests = new CVarInterServicesRequests();
                        ObjCVarInterServicesRequests.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarInterServicesRequests.mChargeTypeID = Convert.ToInt32(dr["ChargeTypeID"].ToString());
                        ObjCVarInterServicesRequests.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
                        ObjCVarInterServicesRequests.mStatusID = Convert.ToInt32(dr["StatusID"].ToString());
                        ObjCVarInterServicesRequests.mFromDepartmentID = Convert.ToInt32(dr["FromDepartmentID"].ToString());
                        ObjCVarInterServicesRequests.mToDepartmentID = Convert.ToInt32(dr["ToDepartmentID"].ToString());
                        ObjCVarInterServicesRequests.mToCompanyID = Convert.ToInt32(dr["ToCompanyID"].ToString());
                        ObjCVarInterServicesRequests.mToUserID = Convert.ToInt32(dr["ToUserID"].ToString());
                        ObjCVarInterServicesRequests.mCost = Convert.ToDecimal(dr["Cost"].ToString());
                        ObjCVarInterServicesRequests.mSalePrice = Convert.ToDecimal(dr["SalePrice"].ToString());
                        ObjCVarInterServicesRequests.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarInterServicesRequests.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarInterServicesRequests.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarInterServicesRequests.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarInterServicesRequests.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarInterServicesRequests.Add(ObjCVarInterServicesRequests);
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
                    Com.CommandText = "[dbo].DeleteListInterServicesRequests";
                else
                    Com.CommandText = "[dbo].UpdateListInterServicesRequests";
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
        public Exception DeleteItem(List<CPKInterServicesRequests> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemInterServicesRequests";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt));
                foreach (CPKInterServicesRequests ObjCPKInterServicesRequests in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt64(ObjCPKInterServicesRequests.ID);
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
        public Exception SaveMethod(List<CVarInterServicesRequests> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@ChargeTypeID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@OperationID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@StatusID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@FromDepartmentID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ToDepartmentID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ToCompanyID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ToUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@Cost", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@SalePrice", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@Notes", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@CreatorUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CreationDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@ModificatorUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ModificationDate", SqlDbType.DateTime));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarInterServicesRequests ObjCVarInterServicesRequests in SaveList)
                {
                    if (ObjCVarInterServicesRequests.mIsChanges == true)
                    {
                        if (ObjCVarInterServicesRequests.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemInterServicesRequests";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarInterServicesRequests.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemInterServicesRequests";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarInterServicesRequests.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarInterServicesRequests.ID;
                        }
                        Com.Parameters["@ChargeTypeID"].Value = ObjCVarInterServicesRequests.ChargeTypeID;
                        Com.Parameters["@OperationID"].Value = ObjCVarInterServicesRequests.OperationID;
                        Com.Parameters["@StatusID"].Value = ObjCVarInterServicesRequests.StatusID;
                        Com.Parameters["@FromDepartmentID"].Value = ObjCVarInterServicesRequests.FromDepartmentID;
                        Com.Parameters["@ToDepartmentID"].Value = ObjCVarInterServicesRequests.ToDepartmentID;
                        Com.Parameters["@ToCompanyID"].Value = ObjCVarInterServicesRequests.ToCompanyID;
                        Com.Parameters["@ToUserID"].Value = ObjCVarInterServicesRequests.ToUserID;
                        Com.Parameters["@Cost"].Value = ObjCVarInterServicesRequests.Cost;
                        Com.Parameters["@SalePrice"].Value = ObjCVarInterServicesRequests.SalePrice;
                        Com.Parameters["@Notes"].Value = ObjCVarInterServicesRequests.Notes;
                        Com.Parameters["@CreatorUserID"].Value = ObjCVarInterServicesRequests.CreatorUserID;
                        Com.Parameters["@CreationDate"].Value = ObjCVarInterServicesRequests.CreationDate;
                        Com.Parameters["@ModificatorUserID"].Value = ObjCVarInterServicesRequests.ModificatorUserID;
                        Com.Parameters["@ModificationDate"].Value = ObjCVarInterServicesRequests.ModificationDate;
                        EndTrans(Com, Con);
                        if (ObjCVarInterServicesRequests.ID == 0)
                        {
                            ObjCVarInterServicesRequests.ID = Convert.ToInt64(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarInterServicesRequests.mIsChanges = false;
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

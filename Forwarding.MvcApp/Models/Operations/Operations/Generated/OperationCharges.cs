using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.Operations.Operations.Generated
{
    [Serializable]
    public class CPKOperationCharges
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
    public partial class CVarOperationCharges : CPKOperationCharges
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int64 mOperationID;
        internal Int32 mChargeTypeID;
        internal Int32 mContainerTypeID;
        internal Int32 mPackageTypeID;
        internal Int32 mCurrencyID;
        internal Int32 mCostQuantity;
        internal Decimal mCostPrice;
        internal Decimal mCostAmount;
        internal Int32 mSaleQuantity;
        internal Decimal mSalePrice;
        internal Decimal mSaleAmount;
        internal Int32 mCreatorUserID;
        internal DateTime mCreationDate;
        internal Int32 mModificatorUserID;
        internal DateTime mModificationDate;
        #endregion

        #region "Methods"
        public Int64 OperationID
        {
            get { return mOperationID; }
            set { mIsChanges = true; mOperationID = value; }
        }
        public Int32 ChargeTypeID
        {
            get { return mChargeTypeID; }
            set { mIsChanges = true; mChargeTypeID = value; }
        }
        public Int32 ContainerTypeID
        {
            get { return mContainerTypeID; }
            set { mIsChanges = true; mContainerTypeID = value; }
        }
        public Int32 PackageTypeID
        {
            get { return mPackageTypeID; }
            set { mIsChanges = true; mPackageTypeID = value; }
        }
        public Int32 CurrencyID
        {
            get { return mCurrencyID; }
            set { mIsChanges = true; mCurrencyID = value; }
        }
        public Int32 CostQuantity
        {
            get { return mCostQuantity; }
            set { mIsChanges = true; mCostQuantity = value; }
        }
        public Decimal CostPrice
        {
            get { return mCostPrice; }
            set { mIsChanges = true; mCostPrice = value; }
        }
        public Decimal CostAmount
        {
            get { return mCostAmount; }
            set { mIsChanges = true; mCostAmount = value; }
        }
        public Int32 SaleQuantity
        {
            get { return mSaleQuantity; }
            set { mIsChanges = true; mSaleQuantity = value; }
        }
        public Decimal SalePrice
        {
            get { return mSalePrice; }
            set { mIsChanges = true; mSalePrice = value; }
        }
        public Decimal SaleAmount
        {
            get { return mSaleAmount; }
            set { mIsChanges = true; mSaleAmount = value; }
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

    public partial class COperationCharges
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
        public List<CVarOperationCharges> lstCVarOperationCharges = new List<CVarOperationCharges>();
        public List<CPKOperationCharges> lstDeletedCPKOperationCharges = new List<CPKOperationCharges>();
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
            lstCVarOperationCharges.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.VarChar));
                    Com.CommandText = "[dbo].GetListOperationCharges";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemOperationCharges";
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
                        CVarOperationCharges ObjCVarOperationCharges = new CVarOperationCharges();
                        ObjCVarOperationCharges.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarOperationCharges.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
                        ObjCVarOperationCharges.mChargeTypeID = Convert.ToInt32(dr["ChargeTypeID"].ToString());
                        ObjCVarOperationCharges.mContainerTypeID = Convert.ToInt32(dr["ContainerTypeID"].ToString());
                        ObjCVarOperationCharges.mPackageTypeID = Convert.ToInt32(dr["PackageTypeID"].ToString());
                        ObjCVarOperationCharges.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarOperationCharges.mCostQuantity = Convert.ToInt32(dr["CostQuantity"].ToString());
                        ObjCVarOperationCharges.mCostPrice = Convert.ToDecimal(dr["CostPrice"].ToString());
                        ObjCVarOperationCharges.mCostAmount = Convert.ToDecimal(dr["CostAmount"].ToString());
                        ObjCVarOperationCharges.mSaleQuantity = Convert.ToInt32(dr["SaleQuantity"].ToString());
                        ObjCVarOperationCharges.mSalePrice = Convert.ToDecimal(dr["SalePrice"].ToString());
                        ObjCVarOperationCharges.mSaleAmount = Convert.ToDecimal(dr["SaleAmount"].ToString());
                        ObjCVarOperationCharges.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarOperationCharges.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarOperationCharges.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarOperationCharges.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        lstCVarOperationCharges.Add(ObjCVarOperationCharges);
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
            lstCVarOperationCharges.Clear();

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
                Com.CommandText = "[dbo].GetListPagingOperationCharges";
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
                        CVarOperationCharges ObjCVarOperationCharges = new CVarOperationCharges();
                        ObjCVarOperationCharges.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarOperationCharges.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
                        ObjCVarOperationCharges.mChargeTypeID = Convert.ToInt32(dr["ChargeTypeID"].ToString());
                        ObjCVarOperationCharges.mContainerTypeID = Convert.ToInt32(dr["ContainerTypeID"].ToString());
                        ObjCVarOperationCharges.mPackageTypeID = Convert.ToInt32(dr["PackageTypeID"].ToString());
                        ObjCVarOperationCharges.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarOperationCharges.mCostQuantity = Convert.ToInt32(dr["CostQuantity"].ToString());
                        ObjCVarOperationCharges.mCostPrice = Convert.ToDecimal(dr["CostPrice"].ToString());
                        ObjCVarOperationCharges.mCostAmount = Convert.ToDecimal(dr["CostAmount"].ToString());
                        ObjCVarOperationCharges.mSaleQuantity = Convert.ToInt32(dr["SaleQuantity"].ToString());
                        ObjCVarOperationCharges.mSalePrice = Convert.ToDecimal(dr["SalePrice"].ToString());
                        ObjCVarOperationCharges.mSaleAmount = Convert.ToDecimal(dr["SaleAmount"].ToString());
                        ObjCVarOperationCharges.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarOperationCharges.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarOperationCharges.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarOperationCharges.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarOperationCharges.Add(ObjCVarOperationCharges);
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
                    Com.CommandText = "[dbo].DeleteListOperationCharges";
                else
                    Com.CommandText = "[dbo].UpdateListOperationCharges";
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
        public Exception DeleteItem(List<CPKOperationCharges> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemOperationCharges";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt));
                foreach (CPKOperationCharges ObjCPKOperationCharges in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt64(ObjCPKOperationCharges.ID);
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
        public Exception SaveMethod(List<CVarOperationCharges> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@OperationID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@ChargeTypeID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ContainerTypeID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@PackageTypeID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CurrencyID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CostQuantity", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CostPrice", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@CostAmount", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@SaleQuantity", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@SalePrice", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@SaleAmount", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@CreatorUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CreationDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@ModificatorUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ModificationDate", SqlDbType.DateTime));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarOperationCharges ObjCVarOperationCharges in SaveList)
                {
                    if (ObjCVarOperationCharges.mIsChanges == true)
                    {
                        if (ObjCVarOperationCharges.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemOperationCharges";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarOperationCharges.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemOperationCharges";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarOperationCharges.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarOperationCharges.ID;
                        }
                        Com.Parameters["@OperationID"].Value = ObjCVarOperationCharges.OperationID;
                        Com.Parameters["@ChargeTypeID"].Value = ObjCVarOperationCharges.ChargeTypeID;
                        Com.Parameters["@ContainerTypeID"].Value = ObjCVarOperationCharges.ContainerTypeID;
                        Com.Parameters["@PackageTypeID"].Value = ObjCVarOperationCharges.PackageTypeID;
                        Com.Parameters["@CurrencyID"].Value = ObjCVarOperationCharges.CurrencyID;
                        Com.Parameters["@CostQuantity"].Value = ObjCVarOperationCharges.CostQuantity;
                        Com.Parameters["@CostPrice"].Value = ObjCVarOperationCharges.CostPrice;
                        Com.Parameters["@CostAmount"].Value = ObjCVarOperationCharges.CostAmount;
                        Com.Parameters["@SaleQuantity"].Value = ObjCVarOperationCharges.SaleQuantity;
                        Com.Parameters["@SalePrice"].Value = ObjCVarOperationCharges.SalePrice;
                        Com.Parameters["@SaleAmount"].Value = ObjCVarOperationCharges.SaleAmount;
                        Com.Parameters["@CreatorUserID"].Value = ObjCVarOperationCharges.CreatorUserID;
                        Com.Parameters["@CreationDate"].Value = ObjCVarOperationCharges.CreationDate;
                        Com.Parameters["@ModificatorUserID"].Value = ObjCVarOperationCharges.ModificatorUserID;
                        Com.Parameters["@ModificationDate"].Value = ObjCVarOperationCharges.ModificationDate;
                        EndTrans(Com, Con);
                        if (ObjCVarOperationCharges.ID == 0)
                        {
                            ObjCVarOperationCharges.ID = Convert.ToInt64(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarOperationCharges.mIsChanges = false;
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

using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;
namespace Forwarding.MvcApp.Models.ReceiptsAndPayments.ShipLinkEGL.Generated
{
    [Serializable]
    public class CPKServicesTemp
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
    public partial class CVarServicesTemp : CPKServicesTemp
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal String mName;
        internal Int32 mAccountID;
        internal Int32 mSubAccountID;
        internal Int32 mCostCenterID;
        internal Int32 mtaxID;
        internal Decimal mUnitID;
        internal Boolean mIsTaxBand;
        internal Decimal mServicePrice;
        internal Int32 mServiceGroupID;
        internal Int32 mServiceSubGroupID;
        internal Int32 mIsPurchase;
        internal String mPortalCode;
        internal Int32 mAccountID2;
        internal Int32 mSubAccountID2;
        #endregion

        #region "Methods"
        public String Name
        {
            get { return mName; }
            set { mIsChanges = true; mName = value; }
        }
        public Int32 AccountID
        {
            get { return mAccountID; }
            set { mIsChanges = true; mAccountID = value; }
        }
        public Int32 SubAccountID
        {
            get { return mSubAccountID; }
            set { mIsChanges = true; mSubAccountID = value; }
        }
        public Int32 CostCenterID
        {
            get { return mCostCenterID; }
            set { mIsChanges = true; mCostCenterID = value; }
        }
        public Int32 taxID
        {
            get { return mtaxID; }
            set { mIsChanges = true; mtaxID = value; }
        }
        public Decimal UnitID
        {
            get { return mUnitID; }
            set { mIsChanges = true; mUnitID = value; }
        }
        public Boolean IsTaxBand
        {
            get { return mIsTaxBand; }
            set { mIsChanges = true; mIsTaxBand = value; }
        }
        public Decimal ServicePrice
        {
            get { return mServicePrice; }
            set { mIsChanges = true; mServicePrice = value; }
        }
        public Int32 ServiceGroupID
        {
            get { return mServiceGroupID; }
            set { mIsChanges = true; mServiceGroupID = value; }
        }
        public Int32 ServiceSubGroupID
        {
            get { return mServiceSubGroupID; }
            set { mIsChanges = true; mServiceSubGroupID = value; }
        }
        public Int32 IsPurchase
        {
            get { return mIsPurchase; }
            set { mIsChanges = true; mIsPurchase = value; }
        }
        public String PortalCode
        {
            get { return mPortalCode; }
            set { mIsChanges = true; mPortalCode = value; }
        }
        public Int32 AccountID2
        {
            get { return mAccountID2; }
            set { mIsChanges = true; mAccountID2 = value; }
        }
        public Int32 SubAccountID2
        {
            get { return mSubAccountID2; }
            set { mIsChanges = true; mSubAccountID2 = value; }
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

    public partial class CServicesTemp
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
        public List<CVarServicesTemp> lstCVarServicesTemp = new List<CVarServicesTemp>();
        public List<CPKServicesTemp> lstDeletedCPKServicesTemp = new List<CPKServicesTemp>();
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
            lstCVarServicesTemp.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListServicesTemp";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemServicesTemp";
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
                        CVarServicesTemp ObjCVarServicesTemp = new CVarServicesTemp();
                        ObjCVarServicesTemp.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarServicesTemp.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarServicesTemp.mAccountID = Convert.ToInt32(dr["AccountID"].ToString());
                        ObjCVarServicesTemp.mSubAccountID = Convert.ToInt32(dr["SubAccountID"].ToString());
                        ObjCVarServicesTemp.mCostCenterID = Convert.ToInt32(dr["CostCenterID"].ToString());
                        ObjCVarServicesTemp.mtaxID = Convert.ToInt32(dr["taxID"].ToString());
                        ObjCVarServicesTemp.mUnitID = Convert.ToDecimal(dr["UnitID"].ToString());
                        ObjCVarServicesTemp.mIsTaxBand = Convert.ToBoolean(dr["IsTaxBand"].ToString());
                        ObjCVarServicesTemp.mServicePrice = Convert.ToDecimal(dr["ServicePrice"].ToString());
                        ObjCVarServicesTemp.mServiceGroupID = Convert.ToInt32(dr["ServiceGroupID"].ToString());
                        ObjCVarServicesTemp.mServiceSubGroupID = Convert.ToInt32(dr["ServiceSubGroupID"].ToString());
                        ObjCVarServicesTemp.mIsPurchase = Convert.ToInt32(dr["IsPurchase"].ToString());
                        ObjCVarServicesTemp.mPortalCode = Convert.ToString(dr["PortalCode"].ToString());
                        ObjCVarServicesTemp.mAccountID2 = Convert.ToInt32(dr["AccountID2"].ToString());
                        ObjCVarServicesTemp.mSubAccountID2 = Convert.ToInt32(dr["SubAccountID2"].ToString());
                        lstCVarServicesTemp.Add(ObjCVarServicesTemp);
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
            lstCVarServicesTemp.Clear();

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
                Com.CommandText = "[dbo].GetListPagingServicesTemp";
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
                        CVarServicesTemp ObjCVarServicesTemp = new CVarServicesTemp();
                        ObjCVarServicesTemp.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarServicesTemp.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarServicesTemp.mAccountID = Convert.ToInt32(dr["AccountID"].ToString());
                        ObjCVarServicesTemp.mSubAccountID = Convert.ToInt32(dr["SubAccountID"].ToString());
                        ObjCVarServicesTemp.mCostCenterID = Convert.ToInt32(dr["CostCenterID"].ToString());
                        ObjCVarServicesTemp.mtaxID = Convert.ToInt32(dr["taxID"].ToString());
                        ObjCVarServicesTemp.mUnitID = Convert.ToDecimal(dr["UnitID"].ToString());
                        ObjCVarServicesTemp.mIsTaxBand = Convert.ToBoolean(dr["IsTaxBand"].ToString());
                        ObjCVarServicesTemp.mServicePrice = Convert.ToDecimal(dr["ServicePrice"].ToString());
                        ObjCVarServicesTemp.mServiceGroupID = Convert.ToInt32(dr["ServiceGroupID"].ToString());
                        ObjCVarServicesTemp.mServiceSubGroupID = Convert.ToInt32(dr["ServiceSubGroupID"].ToString());
                        ObjCVarServicesTemp.mIsPurchase = Convert.ToInt32(dr["IsPurchase"].ToString());
                        ObjCVarServicesTemp.mPortalCode = Convert.ToString(dr["PortalCode"].ToString());
                        ObjCVarServicesTemp.mAccountID2 = Convert.ToInt32(dr["AccountID2"].ToString());
                        ObjCVarServicesTemp.mSubAccountID2 = Convert.ToInt32(dr["SubAccountID2"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarServicesTemp.Add(ObjCVarServicesTemp);
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
                    Com.CommandText = "[dbo].DeleteListServicesTemp";
                else
                    Com.CommandText = "[dbo].UpdateListServicesTemp";
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
        public Exception DeleteItem(List<CPKServicesTemp> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemServicesTemp";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt));
                foreach (CPKServicesTemp ObjCPKServicesTemp in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt64(ObjCPKServicesTemp.ID);
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
        public Exception SaveMethod(List<CVarServicesTemp> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@AccountID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@SubAccountID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CostCenterID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@taxID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@UnitID", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@IsTaxBand", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@ServicePrice", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@ServiceGroupID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ServiceSubGroupID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@IsPurchase", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@PortalCode", SqlDbType.VarChar));
                Com.Parameters.Add(new SqlParameter("@AccountID2", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@SubAccountID2", SqlDbType.Int));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarServicesTemp ObjCVarServicesTemp in SaveList)
                {
                    if (ObjCVarServicesTemp.mIsChanges == true)
                    {
                        if (ObjCVarServicesTemp.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemServicesTemp";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarServicesTemp.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemServicesTemp";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarServicesTemp.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarServicesTemp.ID;
                        }
                        Com.Parameters["@Name"].Value = ObjCVarServicesTemp.Name;
                        Com.Parameters["@AccountID"].Value = ObjCVarServicesTemp.AccountID;
                        Com.Parameters["@SubAccountID"].Value = ObjCVarServicesTemp.SubAccountID;
                        Com.Parameters["@CostCenterID"].Value = ObjCVarServicesTemp.CostCenterID;
                        Com.Parameters["@taxID"].Value = ObjCVarServicesTemp.taxID;
                        Com.Parameters["@UnitID"].Value = ObjCVarServicesTemp.UnitID;
                        Com.Parameters["@IsTaxBand"].Value = ObjCVarServicesTemp.IsTaxBand;
                        Com.Parameters["@ServicePrice"].Value = ObjCVarServicesTemp.ServicePrice;
                        Com.Parameters["@ServiceGroupID"].Value = ObjCVarServicesTemp.ServiceGroupID;
                        Com.Parameters["@ServiceSubGroupID"].Value = ObjCVarServicesTemp.ServiceSubGroupID;
                        Com.Parameters["@IsPurchase"].Value = ObjCVarServicesTemp.IsPurchase;
                        Com.Parameters["@PortalCode"].Value = ObjCVarServicesTemp.PortalCode;
                        Com.Parameters["@AccountID2"].Value = ObjCVarServicesTemp.AccountID2;
                        Com.Parameters["@SubAccountID2"].Value = ObjCVarServicesTemp.SubAccountID2;
                        EndTrans(Com, Con);
                        if (ObjCVarServicesTemp.ID == 0)
                        {
                            ObjCVarServicesTemp.ID = Convert.ToInt64(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarServicesTemp.mIsChanges = false;
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

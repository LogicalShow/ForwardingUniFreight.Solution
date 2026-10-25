using System;
using System.Data;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.PricingModule.PricingTab
{
    [Serializable]
    public class CPKPricingLog
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
    public partial class CVarPricingLog : CPKPricingLog
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int64 mPricingID;
        internal Int32 mUserID;
        internal Int32 mCustomerID;
        internal Int32 mCustomerID_Old;
        internal Int32 mShippingLineID;
        internal Int32 mShippingLineID_Old;
        internal Int32 mAirlineID;
        internal Int32 mAirlineID_Old;
        internal Int32 mTruckerID;
        internal Int32 mTruckerID_Old;
        internal Int32 mCCAID;
        internal Int32 mCCAID_Old;
        internal Int32 mPOLCountryID;
        internal Int32 mPOLCountryID_Old;
        internal Int32 mPOLID;
        internal Int32 mPOLID_Old;
        internal Int32 mPODCountryID;
        internal Int32 mPODCountryID_Old;
        internal Int32 mPODID;
        internal Int32 mPODID_Old;
        internal Int32 mCommodityID;
        internal Int32 mCommodityID_Old;
        internal String mNotes;
        internal DateTime mCreationDate;
        #endregion

        #region "Methods"
        public Int64 PricingID
        {
            get { return mPricingID; }
            set { mIsChanges = true; mPricingID = value; }
        }
        public Int32 UserID
        {
            get { return mUserID; }
            set { mIsChanges = true; mUserID = value; }
        }
        public Int32 CustomerID
        {
            get { return mCustomerID; }
            set { mIsChanges = true; mCustomerID = value; }
        }
        public Int32 CustomerID_Old
        {
            get { return mCustomerID_Old; }
            set { mIsChanges = true; mCustomerID_Old = value; }
        }
        public Int32 ShippingLineID
        {
            get { return mShippingLineID; }
            set { mIsChanges = true; mShippingLineID = value; }
        }
        public Int32 ShippingLineID_Old
        {
            get { return mShippingLineID_Old; }
            set { mIsChanges = true; mShippingLineID_Old = value; }
        }
        public Int32 AirlineID
        {
            get { return mAirlineID; }
            set { mIsChanges = true; mAirlineID = value; }
        }
        public Int32 AirlineID_Old
        {
            get { return mAirlineID_Old; }
            set { mIsChanges = true; mAirlineID_Old = value; }
        }
        public Int32 TruckerID
        {
            get { return mTruckerID; }
            set { mIsChanges = true; mTruckerID = value; }
        }
        public Int32 TruckerID_Old
        {
            get { return mTruckerID_Old; }
            set { mIsChanges = true; mTruckerID_Old = value; }
        }
        public Int32 CCAID
        {
            get { return mCCAID; }
            set { mIsChanges = true; mCCAID = value; }
        }
        public Int32 CCAID_Old
        {
            get { return mCCAID_Old; }
            set { mIsChanges = true; mCCAID_Old = value; }
        }
        public Int32 POLCountryID
        {
            get { return mPOLCountryID; }
            set { mIsChanges = true; mPOLCountryID = value; }
        }
        public Int32 POLCountryID_Old
        {
            get { return mPOLCountryID_Old; }
            set { mIsChanges = true; mPOLCountryID_Old = value; }
        }
        public Int32 POLID
        {
            get { return mPOLID; }
            set { mIsChanges = true; mPOLID = value; }
        }
        public Int32 POLID_Old
        {
            get { return mPOLID_Old; }
            set { mIsChanges = true; mPOLID_Old = value; }
        }
        public Int32 PODCountryID
        {
            get { return mPODCountryID; }
            set { mIsChanges = true; mPODCountryID = value; }
        }
        public Int32 PODCountryID_Old
        {
            get { return mPODCountryID_Old; }
            set { mIsChanges = true; mPODCountryID_Old = value; }
        }
        public Int32 PODID
        {
            get { return mPODID; }
            set { mIsChanges = true; mPODID = value; }
        }
        public Int32 PODID_Old
        {
            get { return mPODID_Old; }
            set { mIsChanges = true; mPODID_Old = value; }
        }
        public Int32 CommodityID
        {
            get { return mCommodityID; }
            set { mIsChanges = true; mCommodityID = value; }
        }
        public Int32 CommodityID_Old
        {
            get { return mCommodityID_Old; }
            set { mIsChanges = true; mCommodityID_Old = value; }
        }
        public String Notes
        {
            get { return mNotes; }
            set { mIsChanges = true; mNotes = value; }
        }
        public DateTime CreationDate
        {
            get { return mCreationDate; }
            set { mIsChanges = true; mCreationDate = value; }
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

    public partial class CPricingLog
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
        public List<CVarPricingLog> lstCVarPricingLog = new List<CVarPricingLog>();
        public List<CPKPricingLog> lstDeletedCPKPricingLog = new List<CPKPricingLog>();
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
            lstCVarPricingLog.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListPricingLog";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemPricingLog";
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
                        CVarPricingLog ObjCVarPricingLog = new CVarPricingLog();
                        ObjCVarPricingLog.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarPricingLog.mPricingID = Convert.ToInt64(dr["PricingID"].ToString());
                        ObjCVarPricingLog.mUserID = Convert.ToInt32(dr["UserID"].ToString());
                        ObjCVarPricingLog.mCustomerID = Convert.ToInt32(dr["CustomerID"].ToString());
                        ObjCVarPricingLog.mCustomerID_Old = Convert.ToInt32(dr["CustomerID_Old"].ToString());
                        ObjCVarPricingLog.mShippingLineID = Convert.ToInt32(dr["ShippingLineID"].ToString());
                        ObjCVarPricingLog.mShippingLineID_Old = Convert.ToInt32(dr["ShippingLineID_Old"].ToString());
                        ObjCVarPricingLog.mAirlineID = Convert.ToInt32(dr["AirlineID"].ToString());
                        ObjCVarPricingLog.mAirlineID_Old = Convert.ToInt32(dr["AirlineID_Old"].ToString());
                        ObjCVarPricingLog.mTruckerID = Convert.ToInt32(dr["TruckerID"].ToString());
                        ObjCVarPricingLog.mTruckerID_Old = Convert.ToInt32(dr["TruckerID_Old"].ToString());
                        ObjCVarPricingLog.mCCAID = Convert.ToInt32(dr["CCAID"].ToString());
                        ObjCVarPricingLog.mCCAID_Old = Convert.ToInt32(dr["CCAID_Old"].ToString());
                        ObjCVarPricingLog.mPOLCountryID = Convert.ToInt32(dr["POLCountryID"].ToString());
                        ObjCVarPricingLog.mPOLCountryID_Old = Convert.ToInt32(dr["POLCountryID_Old"].ToString());
                        ObjCVarPricingLog.mPOLID = Convert.ToInt32(dr["POLID"].ToString());
                        ObjCVarPricingLog.mPOLID_Old = Convert.ToInt32(dr["POLID_Old"].ToString());
                        ObjCVarPricingLog.mPODCountryID = Convert.ToInt32(dr["PODCountryID"].ToString());
                        ObjCVarPricingLog.mPODCountryID_Old = Convert.ToInt32(dr["PODCountryID_Old"].ToString());
                        ObjCVarPricingLog.mPODID = Convert.ToInt32(dr["PODID"].ToString());
                        ObjCVarPricingLog.mPODID_Old = Convert.ToInt32(dr["PODID_Old"].ToString());
                        ObjCVarPricingLog.mCommodityID = Convert.ToInt32(dr["CommodityID"].ToString());
                        ObjCVarPricingLog.mCommodityID_Old = Convert.ToInt32(dr["CommodityID_Old"].ToString());
                        ObjCVarPricingLog.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarPricingLog.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        lstCVarPricingLog.Add(ObjCVarPricingLog);
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
            lstCVarPricingLog.Clear();

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
                Com.CommandText = "[dbo].GetListPagingPricingLog";
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
                        CVarPricingLog ObjCVarPricingLog = new CVarPricingLog();
                        ObjCVarPricingLog.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarPricingLog.mPricingID = Convert.ToInt64(dr["PricingID"].ToString());
                        ObjCVarPricingLog.mUserID = Convert.ToInt32(dr["UserID"].ToString());
                        ObjCVarPricingLog.mCustomerID = Convert.ToInt32(dr["CustomerID"].ToString());
                        ObjCVarPricingLog.mCustomerID_Old = Convert.ToInt32(dr["CustomerID_Old"].ToString());
                        ObjCVarPricingLog.mShippingLineID = Convert.ToInt32(dr["ShippingLineID"].ToString());
                        ObjCVarPricingLog.mShippingLineID_Old = Convert.ToInt32(dr["ShippingLineID_Old"].ToString());
                        ObjCVarPricingLog.mAirlineID = Convert.ToInt32(dr["AirlineID"].ToString());
                        ObjCVarPricingLog.mAirlineID_Old = Convert.ToInt32(dr["AirlineID_Old"].ToString());
                        ObjCVarPricingLog.mTruckerID = Convert.ToInt32(dr["TruckerID"].ToString());
                        ObjCVarPricingLog.mTruckerID_Old = Convert.ToInt32(dr["TruckerID_Old"].ToString());
                        ObjCVarPricingLog.mCCAID = Convert.ToInt32(dr["CCAID"].ToString());
                        ObjCVarPricingLog.mCCAID_Old = Convert.ToInt32(dr["CCAID_Old"].ToString());
                        ObjCVarPricingLog.mPOLCountryID = Convert.ToInt32(dr["POLCountryID"].ToString());
                        ObjCVarPricingLog.mPOLCountryID_Old = Convert.ToInt32(dr["POLCountryID_Old"].ToString());
                        ObjCVarPricingLog.mPOLID = Convert.ToInt32(dr["POLID"].ToString());
                        ObjCVarPricingLog.mPOLID_Old = Convert.ToInt32(dr["POLID_Old"].ToString());
                        ObjCVarPricingLog.mPODCountryID = Convert.ToInt32(dr["PODCountryID"].ToString());
                        ObjCVarPricingLog.mPODCountryID_Old = Convert.ToInt32(dr["PODCountryID_Old"].ToString());
                        ObjCVarPricingLog.mPODID = Convert.ToInt32(dr["PODID"].ToString());
                        ObjCVarPricingLog.mPODID_Old = Convert.ToInt32(dr["PODID_Old"].ToString());
                        ObjCVarPricingLog.mCommodityID = Convert.ToInt32(dr["CommodityID"].ToString());
                        ObjCVarPricingLog.mCommodityID_Old = Convert.ToInt32(dr["CommodityID_Old"].ToString());
                        ObjCVarPricingLog.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarPricingLog.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarPricingLog.Add(ObjCVarPricingLog);
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
                    Com.CommandText = "[dbo].DeleteListPricingLog";
                else
                    Com.CommandText = "[dbo].UpdateListPricingLog";
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
        public Exception DeleteItem(List<CPKPricingLog> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemPricingLog";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt));
                foreach (CPKPricingLog ObjCPKPricingLog in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt64(ObjCPKPricingLog.ID);
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
        public Exception SaveMethod(List<CVarPricingLog> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@PricingID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@UserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CustomerID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CustomerID_Old", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ShippingLineID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ShippingLineID_Old", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@AirlineID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@AirlineID_Old", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@TruckerID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@TruckerID_Old", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CCAID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CCAID_Old", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@POLCountryID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@POLCountryID_Old", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@POLID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@POLID_Old", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@PODCountryID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@PODCountryID_Old", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@PODID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@PODID_Old", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CommodityID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CommodityID_Old", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@Notes", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@CreationDate", SqlDbType.DateTime));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarPricingLog ObjCVarPricingLog in SaveList)
                {
                    if (ObjCVarPricingLog.mIsChanges == true)
                    {
                        if (ObjCVarPricingLog.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemPricingLog";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarPricingLog.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemPricingLog";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarPricingLog.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarPricingLog.ID;
                        }
                        Com.Parameters["@PricingID"].Value = ObjCVarPricingLog.PricingID;
                        Com.Parameters["@UserID"].Value = ObjCVarPricingLog.UserID;
                        Com.Parameters["@CustomerID"].Value = ObjCVarPricingLog.CustomerID;
                        Com.Parameters["@CustomerID_Old"].Value = ObjCVarPricingLog.CustomerID_Old;
                        Com.Parameters["@ShippingLineID"].Value = ObjCVarPricingLog.ShippingLineID;
                        Com.Parameters["@ShippingLineID_Old"].Value = ObjCVarPricingLog.ShippingLineID_Old;
                        Com.Parameters["@AirlineID"].Value = ObjCVarPricingLog.AirlineID;
                        Com.Parameters["@AirlineID_Old"].Value = ObjCVarPricingLog.AirlineID_Old;
                        Com.Parameters["@TruckerID"].Value = ObjCVarPricingLog.TruckerID;
                        Com.Parameters["@TruckerID_Old"].Value = ObjCVarPricingLog.TruckerID_Old;
                        Com.Parameters["@CCAID"].Value = ObjCVarPricingLog.CCAID;
                        Com.Parameters["@CCAID_Old"].Value = ObjCVarPricingLog.CCAID_Old;
                        Com.Parameters["@POLCountryID"].Value = ObjCVarPricingLog.POLCountryID;
                        Com.Parameters["@POLCountryID_Old"].Value = ObjCVarPricingLog.POLCountryID_Old;
                        Com.Parameters["@POLID"].Value = ObjCVarPricingLog.POLID;
                        Com.Parameters["@POLID_Old"].Value = ObjCVarPricingLog.POLID_Old;
                        Com.Parameters["@PODCountryID"].Value = ObjCVarPricingLog.PODCountryID;
                        Com.Parameters["@PODCountryID_Old"].Value = ObjCVarPricingLog.PODCountryID_Old;
                        Com.Parameters["@PODID"].Value = ObjCVarPricingLog.PODID;
                        Com.Parameters["@PODID_Old"].Value = ObjCVarPricingLog.PODID_Old;
                        Com.Parameters["@CommodityID"].Value = ObjCVarPricingLog.CommodityID;
                        Com.Parameters["@CommodityID_Old"].Value = ObjCVarPricingLog.CommodityID_Old;
                        Com.Parameters["@Notes"].Value = ObjCVarPricingLog.Notes;
                        Com.Parameters["@CreationDate"].Value = ObjCVarPricingLog.CreationDate;
                        EndTrans(Com, Con);
                        if (ObjCVarPricingLog.ID == 0)
                        {
                            ObjCVarPricingLog.ID = Convert.ToInt64(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarPricingLog.mIsChanges = false;
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

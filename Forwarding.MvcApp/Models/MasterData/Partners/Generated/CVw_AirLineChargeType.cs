using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.MasterData.Partners.Generated
{
    [Serializable]
    public partial class CVarVw_AirLineChargeType
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal String mCode;
        internal String mName;
        internal Int32 mID;
        internal Boolean mIsDefault;
        internal Int32 mAirLineId;
        internal Int32 mChargeTypeID;
        #endregion

        #region "Methods"
        public String Code
        {
            get { return mCode; }
            set { mCode = value; }
        }
        public String Name
        {
            get { return mName; }
            set { mName = value; }
        }
        public Int32 ID
        {
            get { return mID; }
            set { mID = value; }
        }
        public Boolean IsDefault
        {
            get { return mIsDefault; }
            set { mIsDefault = value; }
        }
        public Int32 AirLineId
        {
            get { return mAirLineId; }
            set { mAirLineId = value; }
        }
        public Int32 ChargeTypeID
        {
            get { return mChargeTypeID; }
            set { mChargeTypeID = value; }
        }
        #endregion
    }

    public partial class CVw_AirLineChargeType
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
        public List<CVarVw_AirLineChargeType> lstCVarVw_AirLineChargeType = new List<CVarVw_AirLineChargeType>();
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
        private Exception DataFill(string Param, Boolean IsList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarVw_AirLineChargeType.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListVw_AirLineChargeType";
                    Com.Parameters[0].Value = Param;
                }
                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        /*Start DataReader*/
                        CVarVw_AirLineChargeType ObjCVarVw_AirLineChargeType = new CVarVw_AirLineChargeType();
                        ObjCVarVw_AirLineChargeType.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarVw_AirLineChargeType.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarVw_AirLineChargeType.mID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarVw_AirLineChargeType.mIsDefault = Convert.ToBoolean(dr["IsDefault"].ToString());
                        ObjCVarVw_AirLineChargeType.mAirLineId = Convert.ToInt32(dr["AirLineId"].ToString());
                        ObjCVarVw_AirLineChargeType.mChargeTypeID = Convert.ToInt32(dr["ChargeTypeID"].ToString());
                        lstCVarVw_AirLineChargeType.Add(ObjCVarVw_AirLineChargeType);
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
            lstCVarVw_AirLineChargeType.Clear();

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
                Com.CommandText = "[dbo].GetListPagingVw_AirLineChargeType";
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
                        CVarVw_AirLineChargeType ObjCVarVw_AirLineChargeType = new CVarVw_AirLineChargeType();
                        ObjCVarVw_AirLineChargeType.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarVw_AirLineChargeType.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarVw_AirLineChargeType.mID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarVw_AirLineChargeType.mIsDefault = Convert.ToBoolean(dr["IsDefault"].ToString());
                        ObjCVarVw_AirLineChargeType.mAirLineId = Convert.ToInt32(dr["AirLineId"].ToString());
                        ObjCVarVw_AirLineChargeType.mChargeTypeID = Convert.ToInt32(dr["ChargeTypeID"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarVw_AirLineChargeType.Add(ObjCVarVw_AirLineChargeType);
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
    }
}

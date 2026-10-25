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
    public partial class CVarVwAirLineBillStock
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal String mAirlinePrefix;
        internal String mTypeOfStock;
        internal String mUnUsedNull;
        internal String mAirWayBills;
        internal String moperationCode;
        internal String mAirDprt;
        internal String mAirDst;
        internal String mFlightNo;
        internal DateTime mBLDate;
        internal String mShipperName;
        internal Decimal mGrossWeight;
        internal Int64 mID;
        internal Int32 mAirlineID;
        internal Int64 mTypStckId;
        internal Int32 mTypeOfStockID;
        #endregion

        #region "Methods"
        public String AirlinePrefix
        {
            get { return mAirlinePrefix; }
            set { mAirlinePrefix = value; }
        }
        public String TypeOfStock
        {
            get { return mTypeOfStock; }
            set { mTypeOfStock = value; }
        }
        public String UnUsedNull
        {
            get { return mUnUsedNull; }
            set { mUnUsedNull = value; }
        }
        public String AirWayBills
        {
            get { return mAirWayBills; }
            set { mAirWayBills = value; }
        }
        public String operationCode
        {
            get { return moperationCode; }
            set { moperationCode = value; }
        }
        public String AirDprt
        {
            get { return mAirDprt; }
            set { mAirDprt = value; }
        }
        public String AirDst
        {
            get { return mAirDst; }
            set { mAirDst = value; }
        }
        public String FlightNo
        {
            get { return mFlightNo; }
            set { mFlightNo = value; }
        }
        public DateTime BLDate
        {
            get { return mBLDate; }
            set { mBLDate = value; }
        }
        public String ShipperName
        {
            get { return mShipperName; }
            set { mShipperName = value; }
        }
        public Decimal GrossWeight
        {
            get { return mGrossWeight; }
            set { mGrossWeight = value; }
        }
        public Int64 ID
        {
            get { return mID; }
            set { mID = value; }
        }
        public Int32 AirlineID
        {
            get { return mAirlineID; }
            set { mAirlineID = value; }
        }
        public Int64 TypStckId
        {
            get { return mTypStckId; }
            set { mTypStckId = value; }
        }
        public Int32 TypeOfStockID
        {
            get { return mTypeOfStockID; }
            set { mTypeOfStockID = value; }
        }
        #endregion
    }

    public partial class CVwAirLineBillStock
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
        public List<CVarVwAirLineBillStock> lstCVarVwAirLineBillStock = new List<CVarVwAirLineBillStock>();
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
            lstCVarVwAirLineBillStock.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListVwAirLineBillStock";
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
                        CVarVwAirLineBillStock ObjCVarVwAirLineBillStock = new CVarVwAirLineBillStock();
                        ObjCVarVwAirLineBillStock.mAirlinePrefix = Convert.ToString(dr["AirlinePrefix"].ToString());
                        ObjCVarVwAirLineBillStock.mTypeOfStock = Convert.ToString(dr["TypeOfStock"].ToString());
                        ObjCVarVwAirLineBillStock.mUnUsedNull = Convert.ToString(dr["UnUsedNull"].ToString());
                        ObjCVarVwAirLineBillStock.mAirWayBills = Convert.ToString(dr["AirWayBills"].ToString());
                        ObjCVarVwAirLineBillStock.moperationCode = Convert.ToString(dr["operationCode"].ToString());
                        ObjCVarVwAirLineBillStock.mAirDprt = Convert.ToString(dr["AirDprt"].ToString());
                        ObjCVarVwAirLineBillStock.mAirDst = Convert.ToString(dr["AirDst"].ToString());
                        ObjCVarVwAirLineBillStock.mFlightNo = Convert.ToString(dr["FlightNo"].ToString());
                        ObjCVarVwAirLineBillStock.mBLDate = Convert.ToDateTime(dr["BLDate"].ToString());
                        ObjCVarVwAirLineBillStock.mShipperName = Convert.ToString(dr["ShipperName"].ToString());
                        ObjCVarVwAirLineBillStock.mGrossWeight = Convert.ToDecimal(dr["GrossWeight"].ToString());
                        ObjCVarVwAirLineBillStock.mID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarVwAirLineBillStock.mAirlineID = Convert.ToInt32(dr["AirlineID"].ToString());
                        ObjCVarVwAirLineBillStock.mTypStckId = Convert.ToInt64(dr["TypStckId"].ToString());
                        ObjCVarVwAirLineBillStock.mTypeOfStockID = Convert.ToInt32(dr["TypeOfStockID"].ToString());
                        lstCVarVwAirLineBillStock.Add(ObjCVarVwAirLineBillStock);
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
            lstCVarVwAirLineBillStock.Clear();

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
                Com.CommandText = "[dbo].GetListPagingVwAirLineBillStock";
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
                        CVarVwAirLineBillStock ObjCVarVwAirLineBillStock = new CVarVwAirLineBillStock();
                        ObjCVarVwAirLineBillStock.mAirlinePrefix = Convert.ToString(dr["AirlinePrefix"].ToString());
                        ObjCVarVwAirLineBillStock.mTypeOfStock = Convert.ToString(dr["TypeOfStock"].ToString());
                        ObjCVarVwAirLineBillStock.mUnUsedNull = Convert.ToString(dr["UnUsedNull"].ToString());
                        ObjCVarVwAirLineBillStock.mAirWayBills = Convert.ToString(dr["AirWayBills"].ToString());
                        ObjCVarVwAirLineBillStock.moperationCode = Convert.ToString(dr["operationCode"].ToString());
                        ObjCVarVwAirLineBillStock.mAirDprt = Convert.ToString(dr["AirDprt"].ToString());
                        ObjCVarVwAirLineBillStock.mAirDst = Convert.ToString(dr["AirDst"].ToString());
                        ObjCVarVwAirLineBillStock.mFlightNo = Convert.ToString(dr["FlightNo"].ToString());
                        ObjCVarVwAirLineBillStock.mBLDate = Convert.ToDateTime(dr["BLDate"].ToString());
                        ObjCVarVwAirLineBillStock.mShipperName = Convert.ToString(dr["ShipperName"].ToString());
                        ObjCVarVwAirLineBillStock.mGrossWeight = Convert.ToDecimal(dr["GrossWeight"].ToString());
                        ObjCVarVwAirLineBillStock.mID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarVwAirLineBillStock.mAirlineID = Convert.ToInt32(dr["AirlineID"].ToString());
                        ObjCVarVwAirLineBillStock.mTypStckId = Convert.ToInt64(dr["TypStckId"].ToString());
                        ObjCVarVwAirLineBillStock.mTypeOfStockID = Convert.ToInt32(dr["TypeOfStockID"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarVwAirLineBillStock.Add(ObjCVarVwAirLineBillStock);
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

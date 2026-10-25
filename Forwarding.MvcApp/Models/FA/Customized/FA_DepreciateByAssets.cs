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
    public class CPKFA_DepreciateByAssets
    {
        #region "variables"
        #endregion

        #region "Methods"
        #endregion
    }
    [Serializable]
    public partial class CVarFA_DepreciateByAssets : CPKFA_DepreciateByAssets
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Decimal mLastAmount;
        internal Decimal mSumAmount;
        internal String mNAME;
        internal String mBarCode;
        internal Decimal mLastQty;
        internal int mID;
        #endregion

        #region "Methods"
        public Decimal LastAmount
        {
            get { return mLastAmount; }
            set { mLastAmount = value; }
        }
        public Decimal SumAmount
        {
            get { return mSumAmount; }
            set { mSumAmount = value; }
        }
        public String NAME
        {
            get { return mNAME; }
            set { mNAME = value; }
        }
        public String BarCode
        {
            get { return mBarCode; }
            set { mBarCode = value; }
        }
        public Decimal LastQty
        {
            get { return mLastQty; }
            set { mLastQty = value; }
        }
        public int ID
        {
            get { return mID; }
            set { mID = value; }
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

    public partial class CFA_DepreciateByAssets
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
        //@IDs NVARCHAR(max) , @UserID INT , @Date DATETIME ,   @IsApprove bit
        private SqlTransaction tr;
        public List<CVarFA_DepreciateByAssets> lstCVarFA_DepreciateByAssets = new List<CVarFA_DepreciateByAssets>();
        #endregion

        #region "Select Methods"
        public Exception GetList(DateTime FromDate, DateTime ToDate, int AssetID, int UserID, DateTime Date , bool IsReview , int PeriodType )
        {
            return DataFill( FromDate, ToDate, AssetID,  UserID,  Date , IsReview,  PeriodType,   true);
        }
        public Exception GetListPaging(Int32 PageSize, Int32 PageNumber, string WhereClause, string OrderBy, out Int32 TotalRecords)
        {
            return DataFill(PageSize, PageNumber, WhereClause, OrderBy, out TotalRecords);
        }
        private Exception DataFill(DateTime FromDate, DateTime ToDate, int AssetID, int UserID,  DateTime Date , bool IsReview, int PeriodType, bool IsList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarFA_DepreciateByAssets.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@FromDate", SqlDbType.DateTime));
                    Com.Parameters.Add(new SqlParameter("@ToDate", SqlDbType.DateTime));
                    Com.Parameters.Add(new SqlParameter("@AssetID", SqlDbType.Int));
                    Com.Parameters.Add(new SqlParameter("@UserID", SqlDbType.Int));
                    Com.Parameters.Add(new SqlParameter("@Date", SqlDbType.DateTime));
                    Com.Parameters.Add(new SqlParameter("@IsReview", SqlDbType.Bit));
                    Com.Parameters.Add(new SqlParameter("@PeriodType", SqlDbType.Int));
                    Com.CommandText = "[dbo].FA_DepreciateByAssets";
                    Com.Parameters[0].Value = FromDate;
                    Com.Parameters[1].Value = ToDate;
                    Com.Parameters[2].Value = AssetID;
                    Com.Parameters[3].Value = UserID;
                    Com.Parameters[4].Value = Date;
                    Com.Parameters[5].Value = IsReview;
                    Com.Parameters[6].Value = PeriodType;
                }
                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        /*Start DataReader*/
                        //  SELECT GD.ID AS GroupDestructionsID , G.SubAccountID , G.ID GroupID, GD.FromDate , GD.ToDate  , GD.Percentage , G.Name GroupName

                        CVarFA_DepreciateByAssets ObjCVarFA_DepreciateByAssets = new CVarFA_DepreciateByAssets();
                        ObjCVarFA_DepreciateByAssets.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarFA_DepreciateByAssets.mLastAmount = Convert.ToDecimal(dr["LastAmount"].ToString());
                        ObjCVarFA_DepreciateByAssets.mSumAmount = Convert.ToDecimal(dr["SumAmount"].ToString());
                        ObjCVarFA_DepreciateByAssets.mNAME = Convert.ToString(dr["NAME"].ToString());
                        ObjCVarFA_DepreciateByAssets.mBarCode = Convert.ToString(dr["BarCode"].ToString());
                        ObjCVarFA_DepreciateByAssets.mLastQty = Convert.ToDecimal(dr["LastQty"].ToString());
                        lstCVarFA_DepreciateByAssets.Add(ObjCVarFA_DepreciateByAssets);
                      //  lstCVarFA_DepreciateByAssets.Add(ObjCVarFA_DepreciateByAssets);
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
            lstCVarFA_DepreciateByAssets.Clear();

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
                Com.Parameters.Add(new SqlParameter("@IsReview", SqlDbType.Bit));
                Com.CommandText = "[dbo].GetListPagingFA_DepreciateByAssets";
                Com.Parameters[0].Value = PageSize;
                Com.Parameters[1].Value = PageNumber;
                Com.Parameters[2].Value = WhereClause;
                Com.Parameters[3].Value = OrderBy;
               // Com.Parameters[4].Value = IsReview;
                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        /*Start DataReader*/
                        CVarFA_DepreciateByAssets ObjCVarFA_DepreciateByAssets = new CVarFA_DepreciateByAssets();
                        ObjCVarFA_DepreciateByAssets.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarFA_DepreciateByAssets.mLastAmount = Convert.ToDecimal(dr["LastAmount"].ToString());
                        ObjCVarFA_DepreciateByAssets.mSumAmount = Convert.ToDecimal(dr["SumAmount"].ToString());
                        ObjCVarFA_DepreciateByAssets.mNAME = Convert.ToString(dr["NAME"].ToString());
                        ObjCVarFA_DepreciateByAssets.mBarCode = Convert.ToString(dr["BarCode"].ToString());
                        ObjCVarFA_DepreciateByAssets.mLastQty = Convert.ToDecimal(dr["LastQty"].ToString());
                        lstCVarFA_DepreciateByAssets.Add(ObjCVarFA_DepreciateByAssets);
                        lstCVarFA_DepreciateByAssets.Add(ObjCVarFA_DepreciateByAssets);
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarFA_DepreciateByAssets.Add(ObjCVarFA_DepreciateByAssets);
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

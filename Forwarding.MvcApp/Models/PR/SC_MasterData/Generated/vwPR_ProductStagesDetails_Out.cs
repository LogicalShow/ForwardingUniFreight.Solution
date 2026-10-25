using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.PR.MasterData.Generated
{
    [Serializable]
    public class CPKvwPR_ProductStagesDetails_Out
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
    public partial class CVarvwPR_ProductStagesDetails_Out : CPKvwPR_ProductStagesDetails_Out
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int64 mProductID;
        internal Decimal mPercentage;
        internal Decimal mQty;
        internal Int32 mProductStageID;
        internal Int32 mUnitID;
        internal String mUnitName;
        internal Decimal mDensity;
        internal Boolean mIsDeleted;
        #endregion

        #region "Methods"
        public Int64 ProductID
        {
            get { return mProductID; }
            set { mProductID = value; }
        }
        public Decimal Percentage
        {
            get { return mPercentage; }
            set { mPercentage = value; }
        }
        public Decimal Qty
        {
            get { return mQty; }
            set { mQty = value; }
        }
        public Int32 ProductStageID
        {
            get { return mProductStageID; }
            set { mProductStageID = value; }
        }
        public Int32 UnitID
        {
            get { return mUnitID; }
            set { mUnitID = value; }
        }
        public String UnitName
        {
            get { return mUnitName; }
            set { mUnitName = value; }
        }
        public Decimal Density
        {
            get { return mDensity; }
            set { mDensity = value; }
        }
        public Boolean IsDeleted
        {
            get { return mIsDeleted; }
            set { mIsDeleted = value; }
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

    public partial class CvwPR_ProductStagesDetails_Out
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
        public List<CVarvwPR_ProductStagesDetails_Out> lstCVarvwPR_ProductStagesDetails_Out = new List<CVarvwPR_ProductStagesDetails_Out>();
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
            lstCVarvwPR_ProductStagesDetails_Out.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwPR_ProductStagesDetails_Out";
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
                        CVarvwPR_ProductStagesDetails_Out ObjCVarvwPR_ProductStagesDetails_Out = new CVarvwPR_ProductStagesDetails_Out();
                        ObjCVarvwPR_ProductStagesDetails_Out.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwPR_ProductStagesDetails_Out.mProductID = Convert.ToInt64(dr["ProductID"].ToString());
                        ObjCVarvwPR_ProductStagesDetails_Out.mPercentage = Convert.ToDecimal(dr["Percentage"].ToString());
                        ObjCVarvwPR_ProductStagesDetails_Out.mQty = Convert.ToDecimal(dr["Qty"].ToString());
                        ObjCVarvwPR_ProductStagesDetails_Out.mProductStageID = Convert.ToInt32(dr["ProductStageID"].ToString());
                        ObjCVarvwPR_ProductStagesDetails_Out.mUnitID = Convert.ToInt32(dr["UnitID"].ToString());
                        ObjCVarvwPR_ProductStagesDetails_Out.mUnitName = Convert.ToString(dr["UnitName"].ToString());
                        ObjCVarvwPR_ProductStagesDetails_Out.mDensity = Convert.ToDecimal(dr["Density"].ToString());
                        ObjCVarvwPR_ProductStagesDetails_Out.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        lstCVarvwPR_ProductStagesDetails_Out.Add(ObjCVarvwPR_ProductStagesDetails_Out);
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
            lstCVarvwPR_ProductStagesDetails_Out.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwPR_ProductStagesDetails_Out";
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
                        CVarvwPR_ProductStagesDetails_Out ObjCVarvwPR_ProductStagesDetails_Out = new CVarvwPR_ProductStagesDetails_Out();
                        ObjCVarvwPR_ProductStagesDetails_Out.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwPR_ProductStagesDetails_Out.mProductID = Convert.ToInt64(dr["ProductID"].ToString());
                        ObjCVarvwPR_ProductStagesDetails_Out.mPercentage = Convert.ToDecimal(dr["Percentage"].ToString());
                        ObjCVarvwPR_ProductStagesDetails_Out.mQty = Convert.ToDecimal(dr["Qty"].ToString());
                        ObjCVarvwPR_ProductStagesDetails_Out.mProductStageID = Convert.ToInt32(dr["ProductStageID"].ToString());
                        ObjCVarvwPR_ProductStagesDetails_Out.mUnitID = Convert.ToInt32(dr["UnitID"].ToString());
                        ObjCVarvwPR_ProductStagesDetails_Out.mUnitName = Convert.ToString(dr["UnitName"].ToString());
                        ObjCVarvwPR_ProductStagesDetails_Out.mDensity = Convert.ToDecimal(dr["Density"].ToString());
                        ObjCVarvwPR_ProductStagesDetails_Out.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwPR_ProductStagesDetails_Out.Add(ObjCVarvwPR_ProductStagesDetails_Out);
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

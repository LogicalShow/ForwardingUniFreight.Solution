using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;


namespace Forwarding.MvcApp.Models.MasterData.Invoicing.Generated
{
    [Serializable]
    public class CPKvwChargeTypesWithMinimalColumns
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
    public partial class CVarvwChargeTypesWithMinimalColumns : CPKvwChargeTypesWithMinimalColumns
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal String mCode;
        internal String mName;
        internal Boolean mIsGeneralChargeType;
        internal Boolean mIsOperationChargeType;
        internal Boolean mIsTank;
        internal Int32 mChargeTypeGroupID;
        internal Decimal mCost;
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
        public Boolean IsGeneralChargeType
        {
            get { return mIsGeneralChargeType; }
            set { mIsGeneralChargeType = value; }
        }
        public Boolean IsOperationChargeType
        {
            get { return mIsOperationChargeType; }
            set { mIsOperationChargeType = value; }
        }
        public Boolean IsTank
        {
            get { return mIsTank; }
            set { mIsTank = value; }
        }
        public Int32 ChargeTypeGroupID
        {
            get { return mChargeTypeGroupID; }
            set { mChargeTypeGroupID = value; }
        }
        public Decimal Cost
        {
            get { return mCost; }
            set { mCost = value; }
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

    public partial class CvwChargeTypesWithMinimalColumns
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
        public List<CVarvwChargeTypesWithMinimalColumns> lstCVarvwChargeTypesWithMinimalColumns = new List<CVarvwChargeTypesWithMinimalColumns>();
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
            lstCVarvwChargeTypesWithMinimalColumns.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwChargeTypesWithMinimalColumns";
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
                        CVarvwChargeTypesWithMinimalColumns ObjCVarvwChargeTypesWithMinimalColumns = new CVarvwChargeTypesWithMinimalColumns();
                        ObjCVarvwChargeTypesWithMinimalColumns.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwChargeTypesWithMinimalColumns.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarvwChargeTypesWithMinimalColumns.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarvwChargeTypesWithMinimalColumns.mIsGeneralChargeType = Convert.ToBoolean(dr["IsGeneralChargeType"].ToString());
                        ObjCVarvwChargeTypesWithMinimalColumns.mIsOperationChargeType = Convert.ToBoolean(dr["IsOperationChargeType"].ToString());
                        ObjCVarvwChargeTypesWithMinimalColumns.mIsTank = Convert.ToBoolean(dr["IsTank"].ToString());
                        ObjCVarvwChargeTypesWithMinimalColumns.mChargeTypeGroupID = Convert.ToInt32(dr["ChargeTypeGroupID"].ToString());
                        ObjCVarvwChargeTypesWithMinimalColumns.mCost = Convert.ToDecimal(dr["Cost"].ToString());
                        lstCVarvwChargeTypesWithMinimalColumns.Add(ObjCVarvwChargeTypesWithMinimalColumns);
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
            lstCVarvwChargeTypesWithMinimalColumns.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwChargeTypesWithMinimalColumns";
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
                        CVarvwChargeTypesWithMinimalColumns ObjCVarvwChargeTypesWithMinimalColumns = new CVarvwChargeTypesWithMinimalColumns();
                        ObjCVarvwChargeTypesWithMinimalColumns.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwChargeTypesWithMinimalColumns.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarvwChargeTypesWithMinimalColumns.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarvwChargeTypesWithMinimalColumns.mIsGeneralChargeType = Convert.ToBoolean(dr["IsGeneralChargeType"].ToString());
                        ObjCVarvwChargeTypesWithMinimalColumns.mIsOperationChargeType = Convert.ToBoolean(dr["IsOperationChargeType"].ToString());
                        ObjCVarvwChargeTypesWithMinimalColumns.mIsTank = Convert.ToBoolean(dr["IsTank"].ToString());
                        ObjCVarvwChargeTypesWithMinimalColumns.mChargeTypeGroupID = Convert.ToInt32(dr["ChargeTypeGroupID"].ToString());
                        ObjCVarvwChargeTypesWithMinimalColumns.mCost = Convert.ToDecimal(dr["Cost"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwChargeTypesWithMinimalColumns.Add(ObjCVarvwChargeTypesWithMinimalColumns);
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

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
    public class CPKvwCustomerSL_Regions
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
    public partial class CVarvwCustomerSL_Regions : CPKvwCustomerSL_Regions
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mCustomerID;
        internal String mCustomerName;
        internal Int32 mRegionsID;
        internal String mRegions;
        internal Boolean misDefault;
        #endregion

        #region "Methods"
        public Int32 CustomerID
        {
            get { return mCustomerID; }
            set { mCustomerID = value; }
        }
        public String CustomerName
        {
            get { return mCustomerName; }
            set { mCustomerName = value; }
        }
        public Int32 RegionsID
        {
            get { return mRegionsID; }
            set { mRegionsID = value; }
        }
        public String Regions
        {
            get { return mRegions; }
            set { mRegions = value; }
        }
        public Boolean isDefault
        {
            get { return misDefault; }
            set { misDefault = value; }
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

    public partial class CvwCustomerSL_Regions
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
        public List<CVarvwCustomerSL_Regions> lstCVarvwCustomerSL_Regions = new List<CVarvwCustomerSL_Regions>();
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
            lstCVarvwCustomerSL_Regions.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwCustomerSL_Regions";
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
                        CVarvwCustomerSL_Regions ObjCVarvwCustomerSL_Regions = new CVarvwCustomerSL_Regions();
                        ObjCVarvwCustomerSL_Regions.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwCustomerSL_Regions.mCustomerID = Convert.ToInt32(dr["CustomerID"].ToString());
                        ObjCVarvwCustomerSL_Regions.mCustomerName = Convert.ToString(dr["CustomerName"].ToString());
                        ObjCVarvwCustomerSL_Regions.mRegionsID = Convert.ToInt32(dr["RegionsID"].ToString());
                        ObjCVarvwCustomerSL_Regions.mRegions = Convert.ToString(dr["Regions"].ToString());
                        ObjCVarvwCustomerSL_Regions.misDefault = Convert.ToBoolean(dr["isDefault"].ToString());
                        lstCVarvwCustomerSL_Regions.Add(ObjCVarvwCustomerSL_Regions);
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
            lstCVarvwCustomerSL_Regions.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwCustomerSL_Regions";
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
                        CVarvwCustomerSL_Regions ObjCVarvwCustomerSL_Regions = new CVarvwCustomerSL_Regions();
                        ObjCVarvwCustomerSL_Regions.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwCustomerSL_Regions.mCustomerID = Convert.ToInt32(dr["CustomerID"].ToString());
                        ObjCVarvwCustomerSL_Regions.mCustomerName = Convert.ToString(dr["CustomerName"].ToString());
                        ObjCVarvwCustomerSL_Regions.mRegionsID = Convert.ToInt32(dr["RegionsID"].ToString());
                        ObjCVarvwCustomerSL_Regions.mRegions = Convert.ToString(dr["Regions"].ToString());
                        ObjCVarvwCustomerSL_Regions.misDefault = Convert.ToBoolean(dr["isDefault"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwCustomerSL_Regions.Add(ObjCVarvwCustomerSL_Regions);
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

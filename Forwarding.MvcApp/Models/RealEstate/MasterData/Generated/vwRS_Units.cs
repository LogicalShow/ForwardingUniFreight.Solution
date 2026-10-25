using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.RealEstate.MasterData.Generated
{
    [Serializable]
    public class CPKvwRS_Units
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
    public partial class CVarvwRS_Units : CPKvwRS_Units
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal String mCode;
        internal Int32 mClientID;
        internal Int32 mProjectID;
        internal Decimal mPrice;
        internal String mFloorNo;
        internal Decimal mSize;
        #endregion

        #region "Methods"
        public String Code
        {
            get { return mCode; }
            set { mCode = value; }
        }
        public Int32 ClientID
        {
            get { return mClientID; }
            set { mClientID = value; }
        }
        public Int32 ProjectID
        {
            get { return mProjectID; }
            set { mProjectID = value; }
        }
        public Decimal Price
        {
            get { return mPrice; }
            set { mPrice = value; }
        }
        public String FloorNo
        {
            get { return mFloorNo; }
            set { mFloorNo = value; }
        }
        public Decimal Size
        {
            get { return mSize; }
            set { mSize = value; }
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

    public partial class CvwRS_Units
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
        public List<CVarvwRS_Units> lstCVarvwRS_Units = new List<CVarvwRS_Units>();
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
            lstCVarvwRS_Units.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwRS_Units";
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
                        CVarvwRS_Units ObjCVarvwRS_Units = new CVarvwRS_Units();
                        ObjCVarvwRS_Units.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwRS_Units.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarvwRS_Units.mClientID = Convert.ToInt32(dr["ClientID"].ToString());
                        ObjCVarvwRS_Units.mProjectID = Convert.ToInt32(dr["ProjectID"].ToString());
                        ObjCVarvwRS_Units.mPrice = Convert.ToDecimal(dr["Price"].ToString());
                        ObjCVarvwRS_Units.mFloorNo = Convert.ToString(dr["FloorNo"].ToString());
                        ObjCVarvwRS_Units.mSize = Convert.ToDecimal(dr["Size"].ToString());
                        lstCVarvwRS_Units.Add(ObjCVarvwRS_Units);
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
            lstCVarvwRS_Units.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwRS_Units";
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
                        CVarvwRS_Units ObjCVarvwRS_Units = new CVarvwRS_Units();
                        ObjCVarvwRS_Units.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwRS_Units.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarvwRS_Units.mClientID = Convert.ToInt32(dr["ClientID"].ToString());
                        ObjCVarvwRS_Units.mProjectID = Convert.ToInt32(dr["ProjectID"].ToString());
                        ObjCVarvwRS_Units.mPrice = Convert.ToDecimal(dr["Price"].ToString());
                        ObjCVarvwRS_Units.mFloorNo = Convert.ToString(dr["FloorNo"].ToString());
                        ObjCVarvwRS_Units.mSize = Convert.ToDecimal(dr["Size"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwRS_Units.Add(ObjCVarvwRS_Units);
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

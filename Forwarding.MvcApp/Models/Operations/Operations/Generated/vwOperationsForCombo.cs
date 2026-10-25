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
    public partial class CVarvwOperationsForCombo
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int64 mID;
        internal String mCode;
        internal Int32 mCreatorUserID;
        internal Int32 mTransportType;
        internal Int32 mDirectionType;
        internal Int32 mBLType;
        #endregion

        #region "Methods"
        public Int64 ID
        {
            get { return mID; }
            set { mID = value; }
        }
        public String Code
        {
            get { return mCode; }
            set { mCode = value; }
        }
        public Int32 CreatorUserID
        {
            get { return mCreatorUserID; }
            set { mCreatorUserID = value; }
        }
        public Int32 TransportType
        {
            get { return mTransportType; }
            set { mTransportType = value; }
        }
        public Int32 DirectionType
        {
            get { return mDirectionType; }
            set { mDirectionType = value; }
        }
        public Int32 BLType
        {
            get { return mBLType; }
            set { mBLType = value; }
        }
        #endregion
    }

    public partial class CvwOperationsForCombo
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
        public List<CVarvwOperationsForCombo> lstCVarvwOperationsForCombo = new List<CVarvwOperationsForCombo>();
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
            lstCVarvwOperationsForCombo.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwOperationsForCombo";
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
                        CVarvwOperationsForCombo ObjCVarvwOperationsForCombo = new CVarvwOperationsForCombo();
                        ObjCVarvwOperationsForCombo.mID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwOperationsForCombo.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarvwOperationsForCombo.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarvwOperationsForCombo.mTransportType = Convert.ToInt32(dr["TransportType"].ToString());
                        ObjCVarvwOperationsForCombo.mDirectionType = Convert.ToInt32(dr["DirectionType"].ToString());
                        ObjCVarvwOperationsForCombo.mBLType = Convert.ToInt32(dr["BLType"].ToString());
                        lstCVarvwOperationsForCombo.Add(ObjCVarvwOperationsForCombo);
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
            lstCVarvwOperationsForCombo.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwOperationsForCombo";
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
                        CVarvwOperationsForCombo ObjCVarvwOperationsForCombo = new CVarvwOperationsForCombo();
                        ObjCVarvwOperationsForCombo.mID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwOperationsForCombo.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarvwOperationsForCombo.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarvwOperationsForCombo.mTransportType = Convert.ToInt32(dr["TransportType"].ToString());
                        ObjCVarvwOperationsForCombo.mDirectionType = Convert.ToInt32(dr["DirectionType"].ToString());
                        ObjCVarvwOperationsForCombo.mBLType = Convert.ToInt32(dr["BLType"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwOperationsForCombo.Add(ObjCVarvwOperationsForCombo);
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

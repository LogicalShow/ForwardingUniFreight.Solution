using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.Station.ST_Transactions.Generated
{
    [Serializable]
    public class CPKvwST_PreGateIn
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
    public partial class CVarvwST_PreGateIn : CPKvwST_PreGateIn
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int64 mOperationID;
        internal Int32 mCustomerID;
        internal DateTime mEntryDate;
        internal String mTruckingOrderNumber;
        internal String mNotes;
        internal Boolean mIsApproved;
        internal String mCustomerName;
        internal String mOperationCode;
        internal String mBoogingNumber;
        #endregion

        #region "Methods"
        public Int64 OperationID
        {
            get { return mOperationID; }
            set { mOperationID = value; }
        }
        public Int32 CustomerID
        {
            get { return mCustomerID; }
            set { mCustomerID = value; }
        }
        public DateTime EntryDate
        {
            get { return mEntryDate; }
            set { mEntryDate = value; }
        }
        public String TruckingOrderNumber
        {
            get { return mTruckingOrderNumber; }
            set { mTruckingOrderNumber = value; }
        }
        public String Notes
        {
            get { return mNotes; }
            set { mNotes = value; }
        }
        public Boolean IsApproved
        {
            get { return mIsApproved; }
            set { mIsApproved = value; }
        }
        public String CustomerName
        {
            get { return mCustomerName; }
            set { mCustomerName = value; }
        }
        public String OperationCode
        {
            get { return mOperationCode; }
            set { mOperationCode = value; }
        }
        public String BoogingNumber
        {
            get { return mBoogingNumber; }
            set { mBoogingNumber = value; }
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

    public partial class CvwST_PreGateIn
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
        public List<CVarvwST_PreGateIn> lstCVarvwST_PreGateIn = new List<CVarvwST_PreGateIn>();
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
            lstCVarvwST_PreGateIn.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwST_PreGateIn";
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
                        CVarvwST_PreGateIn ObjCVarvwST_PreGateIn = new CVarvwST_PreGateIn();
                        ObjCVarvwST_PreGateIn.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwST_PreGateIn.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
                        ObjCVarvwST_PreGateIn.mCustomerID = Convert.ToInt32(dr["CustomerID"].ToString());
                        ObjCVarvwST_PreGateIn.mEntryDate = Convert.ToDateTime(dr["EntryDate"].ToString());
                        ObjCVarvwST_PreGateIn.mTruckingOrderNumber = Convert.ToString(dr["TruckingOrderNumber"].ToString());
                        ObjCVarvwST_PreGateIn.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvwST_PreGateIn.mIsApproved = Convert.ToBoolean(dr["IsApproved"].ToString());
                        ObjCVarvwST_PreGateIn.mCustomerName = Convert.ToString(dr["CustomerName"].ToString());
                        ObjCVarvwST_PreGateIn.mOperationCode = Convert.ToString(dr["OperationCode"].ToString());
                        ObjCVarvwST_PreGateIn.mBoogingNumber = Convert.ToString(dr["BoogingNumber"].ToString());
                        lstCVarvwST_PreGateIn.Add(ObjCVarvwST_PreGateIn);
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
            lstCVarvwST_PreGateIn.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwST_PreGateIn";
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
                        CVarvwST_PreGateIn ObjCVarvwST_PreGateIn = new CVarvwST_PreGateIn();
                        ObjCVarvwST_PreGateIn.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwST_PreGateIn.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
                        ObjCVarvwST_PreGateIn.mCustomerID = Convert.ToInt32(dr["CustomerID"].ToString());
                        ObjCVarvwST_PreGateIn.mEntryDate = Convert.ToDateTime(dr["EntryDate"].ToString());
                        ObjCVarvwST_PreGateIn.mTruckingOrderNumber = Convert.ToString(dr["TruckingOrderNumber"].ToString());
                        ObjCVarvwST_PreGateIn.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvwST_PreGateIn.mIsApproved = Convert.ToBoolean(dr["IsApproved"].ToString());
                        ObjCVarvwST_PreGateIn.mCustomerName = Convert.ToString(dr["CustomerName"].ToString());
                        ObjCVarvwST_PreGateIn.mOperationCode = Convert.ToString(dr["OperationCode"].ToString());
                        ObjCVarvwST_PreGateIn.mBoogingNumber = Convert.ToString(dr["BoogingNumber"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwST_PreGateIn.Add(ObjCVarvwST_PreGateIn);
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

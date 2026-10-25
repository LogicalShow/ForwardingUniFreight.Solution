using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.Accounting.MasterData.Generated
{
    [Serializable]
    public partial class CVarvwA_CashFlowDetails
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mID;
        internal Int32 mAccount_ID;
        internal Int32 mCashFlowID;
        internal String mAccount_Name;
        internal Int32 mType;
        internal String mTypeName;
        internal Boolean mSign;
        #endregion

        #region "Methods"
        public Int32 ID
        {
            get { return mID; }
            set { mID = value; }
        }
        public Int32 Account_ID
        {
            get { return mAccount_ID; }
            set { mAccount_ID = value; }
        }
        public Int32 CashFlowID
        {
            get { return mCashFlowID; }
            set { mCashFlowID = value; }
        }
        public String Account_Name
        {
            get { return mAccount_Name; }
            set { mAccount_Name = value; }
        }
        public Int32 Type
        {
            get { return mType; }
            set { mType = value; }
        }
        public String TypeName
        {
            get { return mTypeName; }
            set { mTypeName = value; }
        }
        public Boolean Sign
        {
            get { return mSign; }
            set { mSign = value; }
        }
        #endregion
    }

    public partial class CvwA_CashFlowDetails
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
        public List<CVarvwA_CashFlowDetails> lstCVarvwA_CashFlowDetails = new List<CVarvwA_CashFlowDetails>();
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
            lstCVarvwA_CashFlowDetails.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwA_CashFlowDetails";
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
                        CVarvwA_CashFlowDetails ObjCVarvwA_CashFlowDetails = new CVarvwA_CashFlowDetails();
                        ObjCVarvwA_CashFlowDetails.mID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwA_CashFlowDetails.mAccount_ID = Convert.ToInt32(dr["Account_ID"].ToString());
                        ObjCVarvwA_CashFlowDetails.mCashFlowID = Convert.ToInt32(dr["CashFlowID"].ToString());
                        ObjCVarvwA_CashFlowDetails.mAccount_Name = Convert.ToString(dr["Account_Name"].ToString());
                        ObjCVarvwA_CashFlowDetails.mType = Convert.ToInt32(dr["Type"].ToString());
                        ObjCVarvwA_CashFlowDetails.mTypeName = Convert.ToString(dr["TypeName"].ToString());
                        ObjCVarvwA_CashFlowDetails.mSign = Convert.ToBoolean(dr["Sign"].ToString());
                        lstCVarvwA_CashFlowDetails.Add(ObjCVarvwA_CashFlowDetails);
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
            lstCVarvwA_CashFlowDetails.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwA_CashFlowDetails";
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
                        CVarvwA_CashFlowDetails ObjCVarvwA_CashFlowDetails = new CVarvwA_CashFlowDetails();
                        ObjCVarvwA_CashFlowDetails.mID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwA_CashFlowDetails.mAccount_ID = Convert.ToInt32(dr["Account_ID"].ToString());
                        ObjCVarvwA_CashFlowDetails.mCashFlowID = Convert.ToInt32(dr["CashFlowID"].ToString());
                        ObjCVarvwA_CashFlowDetails.mAccount_Name = Convert.ToString(dr["Account_Name"].ToString());
                        ObjCVarvwA_CashFlowDetails.mType = Convert.ToInt32(dr["Type"].ToString());
                        ObjCVarvwA_CashFlowDetails.mTypeName = Convert.ToString(dr["TypeName"].ToString());
                        ObjCVarvwA_CashFlowDetails.mSign = Convert.ToBoolean(dr["Sign"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwA_CashFlowDetails.Add(ObjCVarvwA_CashFlowDetails);
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

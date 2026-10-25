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
    public class CPKvwAgentNetwork
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
    public partial class CVarvwAgentNetwork : CPKvwAgentNetwork
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mAgentID;
        internal String mAgentName;
        internal Int32 mNetworkID;
        internal String mNetworkName;
        internal DateTime mFromDate;
        internal String mStringFromDate;
        internal DateTime mToDate;
        internal String mStringToDate;
        internal String mNotes;
        #endregion

        #region "Methods"
        public Int32 AgentID
        {
            get { return mAgentID; }
            set { mAgentID = value; }
        }
        public String AgentName
        {
            get { return mAgentName; }
            set { mAgentName = value; }
        }
        public Int32 NetworkID
        {
            get { return mNetworkID; }
            set { mNetworkID = value; }
        }
        public String NetworkName
        {
            get { return mNetworkName; }
            set { mNetworkName = value; }
        }
        public DateTime FromDate
        {
            get { return mFromDate; }
            set { mFromDate = value; }
        }
        public String StringFromDate
        {
            get { return mStringFromDate; }
            set { mStringFromDate = value; }
        }
        public DateTime ToDate
        {
            get { return mToDate; }
            set { mToDate = value; }
        }
        public String StringToDate
        {
            get { return mStringToDate; }
            set { mStringToDate = value; }
        }
        public String Notes
        {
            get { return mNotes; }
            set { mNotes = value; }
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

    public partial class CvwAgentNetwork
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
        public List<CVarvwAgentNetwork> lstCVarvwAgentNetwork = new List<CVarvwAgentNetwork>();
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
            lstCVarvwAgentNetwork.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwAgentNetwork";
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
                        CVarvwAgentNetwork ObjCVarvwAgentNetwork = new CVarvwAgentNetwork();
                        ObjCVarvwAgentNetwork.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwAgentNetwork.mAgentID = Convert.ToInt32(dr["AgentID"].ToString());
                        ObjCVarvwAgentNetwork.mAgentName = Convert.ToString(dr["AgentName"].ToString());
                        ObjCVarvwAgentNetwork.mNetworkID = Convert.ToInt32(dr["NetworkID"].ToString());
                        ObjCVarvwAgentNetwork.mNetworkName = Convert.ToString(dr["NetworkName"].ToString());
                        ObjCVarvwAgentNetwork.mFromDate = Convert.ToDateTime(dr["FromDate"].ToString());
                        ObjCVarvwAgentNetwork.mStringFromDate = Convert.ToString(dr["StringFromDate"].ToString());
                        ObjCVarvwAgentNetwork.mToDate = Convert.ToDateTime(dr["ToDate"].ToString());
                        ObjCVarvwAgentNetwork.mStringToDate = Convert.ToString(dr["StringToDate"].ToString());
                        ObjCVarvwAgentNetwork.mNotes = Convert.ToString(dr["Notes"].ToString());
                        lstCVarvwAgentNetwork.Add(ObjCVarvwAgentNetwork);
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
            lstCVarvwAgentNetwork.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwAgentNetwork";
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
                        CVarvwAgentNetwork ObjCVarvwAgentNetwork = new CVarvwAgentNetwork();
                        ObjCVarvwAgentNetwork.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwAgentNetwork.mAgentID = Convert.ToInt32(dr["AgentID"].ToString());
                        ObjCVarvwAgentNetwork.mAgentName = Convert.ToString(dr["AgentName"].ToString());
                        ObjCVarvwAgentNetwork.mNetworkID = Convert.ToInt32(dr["NetworkID"].ToString());
                        ObjCVarvwAgentNetwork.mNetworkName = Convert.ToString(dr["NetworkName"].ToString());
                        ObjCVarvwAgentNetwork.mFromDate = Convert.ToDateTime(dr["FromDate"].ToString());
                        ObjCVarvwAgentNetwork.mStringFromDate = Convert.ToString(dr["StringFromDate"].ToString());
                        ObjCVarvwAgentNetwork.mToDate = Convert.ToDateTime(dr["ToDate"].ToString());
                        ObjCVarvwAgentNetwork.mStringToDate = Convert.ToString(dr["StringToDate"].ToString());
                        ObjCVarvwAgentNetwork.mNotes = Convert.ToString(dr["Notes"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwAgentNetwork.Add(ObjCVarvwAgentNetwork);
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

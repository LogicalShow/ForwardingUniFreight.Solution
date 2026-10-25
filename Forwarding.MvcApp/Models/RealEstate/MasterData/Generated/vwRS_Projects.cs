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
    public class CPKvwRS_Projects
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
    public partial class CVarvwRS_Projects : CPKvwRS_Projects
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal String mCode;
        internal String mName;
        internal String mAddress;
        internal Int32 mAccountID;
        internal Int32 mCostCenter_ID;
        internal Int32 mNoAccessID;
        internal String mNoAccessName;
        internal Int32 mFloors;
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
        public String Address
        {
            get { return mAddress; }
            set { mAddress = value; }
        }
        public Int32 AccountID
        {
            get { return mAccountID; }
            set { mAccountID = value; }
        }
        public Int32 CostCenter_ID
        {
            get { return mCostCenter_ID; }
            set { mCostCenter_ID = value; }
        }
        public Int32 NoAccessID
        {
            get { return mNoAccessID; }
            set { mNoAccessID = value; }
        }
        public String NoAccessName
        {
            get { return mNoAccessName; }
            set { mNoAccessName = value; }
        }
        public Int32 Floors
        {
            get { return mFloors; }
            set { mFloors = value; }
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

    public partial class CvwRS_Projects
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
        public List<CVarvwRS_Projects> lstCVarvwRS_Projects = new List<CVarvwRS_Projects>();
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
            lstCVarvwRS_Projects.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwRS_Projects";
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
                        CVarvwRS_Projects ObjCVarvwRS_Projects = new CVarvwRS_Projects();
                        ObjCVarvwRS_Projects.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwRS_Projects.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarvwRS_Projects.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarvwRS_Projects.mAddress = Convert.ToString(dr["Address"].ToString());
                        ObjCVarvwRS_Projects.mAccountID = Convert.ToInt32(dr["AccountID"].ToString());
                        ObjCVarvwRS_Projects.mCostCenter_ID = Convert.ToInt32(dr["CostCenter_ID"].ToString());
                        ObjCVarvwRS_Projects.mNoAccessID = Convert.ToInt32(dr["NoAccessID"].ToString());
                        ObjCVarvwRS_Projects.mNoAccessName = Convert.ToString(dr["NoAccessName"].ToString());
                        ObjCVarvwRS_Projects.mFloors = Convert.ToInt32(dr["Floors"].ToString());
                        lstCVarvwRS_Projects.Add(ObjCVarvwRS_Projects);
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
            lstCVarvwRS_Projects.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwRS_Projects";
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
                        CVarvwRS_Projects ObjCVarvwRS_Projects = new CVarvwRS_Projects();
                        ObjCVarvwRS_Projects.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwRS_Projects.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarvwRS_Projects.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarvwRS_Projects.mAddress = Convert.ToString(dr["Address"].ToString());
                        ObjCVarvwRS_Projects.mAccountID = Convert.ToInt32(dr["AccountID"].ToString());
                        ObjCVarvwRS_Projects.mCostCenter_ID = Convert.ToInt32(dr["CostCenter_ID"].ToString());
                        ObjCVarvwRS_Projects.mNoAccessID = Convert.ToInt32(dr["NoAccessID"].ToString());
                        ObjCVarvwRS_Projects.mNoAccessName = Convert.ToString(dr["NoAccessName"].ToString());
                        ObjCVarvwRS_Projects.mFloors = Convert.ToInt32(dr["Floors"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwRS_Projects.Add(ObjCVarvwRS_Projects);
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

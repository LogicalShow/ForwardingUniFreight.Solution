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
    public class CPKvwPR_ProductStages
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
    public partial class CVarvwPR_ProductStages : CPKvwPR_ProductStages
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mStageID;
        internal Int64 mFinalProductID;
        internal Int32 mParentStageID;
        internal Boolean mIsDeleted;
        internal Int32 mOrderNo;
        internal String mStageName;
        #endregion

        #region "Methods"
        public Int32 StageID
        {
            get { return mStageID; }
            set { mStageID = value; }
        }
        public Int64 FinalProductID
        {
            get { return mFinalProductID; }
            set { mFinalProductID = value; }
        }
        public Int32 ParentStageID
        {
            get { return mParentStageID; }
            set { mParentStageID = value; }
        }
        public Boolean IsDeleted
        {
            get { return mIsDeleted; }
            set { mIsDeleted = value; }
        }
        public Int32 OrderNo
        {
            get { return mOrderNo; }
            set { mOrderNo = value; }
        }
        public String StageName
        {
            get { return mStageName; }
            set { mStageName = value; }
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

    public partial class CvwPR_ProductStages
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
        public List<CVarvwPR_ProductStages> lstCVarvwPR_ProductStages = new List<CVarvwPR_ProductStages>();
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
            lstCVarvwPR_ProductStages.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwPR_ProductStages";
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
                        CVarvwPR_ProductStages ObjCVarvwPR_ProductStages = new CVarvwPR_ProductStages();
                        ObjCVarvwPR_ProductStages.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwPR_ProductStages.mStageID = Convert.ToInt32(dr["StageID"].ToString());
                        ObjCVarvwPR_ProductStages.mFinalProductID = Convert.ToInt64(dr["FinalProductID"].ToString());
                        ObjCVarvwPR_ProductStages.mParentStageID = Convert.ToInt32(dr["ParentStageID"].ToString());
                        ObjCVarvwPR_ProductStages.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarvwPR_ProductStages.mOrderNo = Convert.ToInt32(dr["OrderNo"].ToString());
                        ObjCVarvwPR_ProductStages.mStageName = Convert.ToString(dr["StageName"].ToString());
                        lstCVarvwPR_ProductStages.Add(ObjCVarvwPR_ProductStages);
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
            lstCVarvwPR_ProductStages.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwPR_ProductStages";
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
                        CVarvwPR_ProductStages ObjCVarvwPR_ProductStages = new CVarvwPR_ProductStages();
                        ObjCVarvwPR_ProductStages.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwPR_ProductStages.mStageID = Convert.ToInt32(dr["StageID"].ToString());
                        ObjCVarvwPR_ProductStages.mFinalProductID = Convert.ToInt64(dr["FinalProductID"].ToString());
                        ObjCVarvwPR_ProductStages.mParentStageID = Convert.ToInt32(dr["ParentStageID"].ToString());
                        ObjCVarvwPR_ProductStages.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarvwPR_ProductStages.mOrderNo = Convert.ToInt32(dr["OrderNo"].ToString());
                        ObjCVarvwPR_ProductStages.mStageName = Convert.ToString(dr["StageName"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwPR_ProductStages.Add(ObjCVarvwPR_ProductStages);
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

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
    public class CPKA_CostCentersTAX
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
    public partial class CVarA_CostCentersTAX : CPKA_CostCentersTAX
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal String mCostCenterNumber;
        internal String mCostCenterName;
        internal Int32 mParent_ID;
        internal Boolean mIsMain;
        internal Int32 mCCLevel;
        internal String mRealCostCenterCode;
        internal Int32 mUser_ID;
        internal Int32 mType_ID;
        internal Boolean mIsClosed;
        internal Int32 mSubAccountGroupID;
        internal Int32 mEmployeesCount;
        #endregion

        #region "Methods"
        public String CostCenterNumber
        {
            get { return mCostCenterNumber; }
            set { mIsChanges = true; mCostCenterNumber = value; }
        }
        public String CostCenterName
        {
            get { return mCostCenterName; }
            set { mIsChanges = true; mCostCenterName = value; }
        }
        public Int32 Parent_ID
        {
            get { return mParent_ID; }
            set { mIsChanges = true; mParent_ID = value; }
        }
        public Boolean IsMain
        {
            get { return mIsMain; }
            set { mIsChanges = true; mIsMain = value; }
        }
        public Int32 CCLevel
        {
            get { return mCCLevel; }
            set { mIsChanges = true; mCCLevel = value; }
        }
        public String RealCostCenterCode
        {
            get { return mRealCostCenterCode; }
            set { mIsChanges = true; mRealCostCenterCode = value; }
        }
        public Int32 User_ID
        {
            get { return mUser_ID; }
            set { mIsChanges = true; mUser_ID = value; }
        }
        public Int32 Type_ID
        {
            get { return mType_ID; }
            set { mIsChanges = true; mType_ID = value; }
        }
        public Boolean IsClosed
        {
            get { return mIsClosed; }
            set { mIsChanges = true; mIsClosed = value; }
        }
        public Int32 SubAccountGroupID
        {
            get { return mSubAccountGroupID; }
            set { mIsChanges = true; mSubAccountGroupID = value; }
        }
        public Int32 EmployeesCount
        {
            get { return mEmployeesCount; }
            set { mIsChanges = true; mEmployeesCount = value; }
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

    public partial class CA_CostCentersTAX
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
        public List<CVarA_CostCentersTAX> lstCVarA_CostCenters = new List<CVarA_CostCentersTAX>();
        public List<CPKA_CostCentersTAX> lstDeletedCPKA_CostCenters = new List<CPKA_CostCentersTAX>();
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
        public Exception GetItem(Int32 ID)
        {
            return DataFill(Convert.ToString(ID), false);
        }
        private Exception DataFill(string Param, Boolean IsList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarA_CostCenters.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListA_CostCentersTax";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemA_CostCentersTax";
                    Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int));
                    Com.Parameters[0].Value = Convert.ToInt32(Param);
                }
                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        /*Start DataReader*/
                        CVarA_CostCentersTAX ObjCVarA_CostCenters = new CVarA_CostCentersTAX();
                        ObjCVarA_CostCenters.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarA_CostCenters.mCostCenterNumber = Convert.ToString(dr["CostCenterNumber"].ToString());
                        ObjCVarA_CostCenters.mCostCenterName = Convert.ToString(dr["CostCenterName"].ToString());
                        ObjCVarA_CostCenters.mParent_ID = Convert.ToInt32(dr["Parent_ID"].ToString());
                        ObjCVarA_CostCenters.mIsMain = Convert.ToBoolean(dr["IsMain"].ToString());
                        ObjCVarA_CostCenters.mCCLevel = Convert.ToInt32(dr["CCLevel"].ToString());
                        ObjCVarA_CostCenters.mRealCostCenterCode = Convert.ToString(dr["RealCostCenterCode"].ToString());
                        ObjCVarA_CostCenters.mUser_ID = Convert.ToInt32(dr["User_ID"].ToString());
                        ObjCVarA_CostCenters.mType_ID = Convert.ToInt32(dr["Type_ID"].ToString());
                        ObjCVarA_CostCenters.mIsClosed = Convert.ToBoolean(dr["IsClosed"].ToString());
                        ObjCVarA_CostCenters.mSubAccountGroupID = Convert.ToInt32(dr["SubAccountGroupID"].ToString());
                        ObjCVarA_CostCenters.mEmployeesCount = Convert.ToInt32(dr["EmployeesCount"].ToString());
                        lstCVarA_CostCenters.Add(ObjCVarA_CostCenters);
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
            lstCVarA_CostCenters.Clear();

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
                Com.CommandText = "[dbo].GetListPagingA_CostCenters";
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
                        CVarA_CostCentersTAX ObjCVarA_CostCenters = new CVarA_CostCentersTAX();
                        ObjCVarA_CostCenters.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarA_CostCenters.mCostCenterNumber = Convert.ToString(dr["CostCenterNumber"].ToString());
                        ObjCVarA_CostCenters.mCostCenterName = Convert.ToString(dr["CostCenterName"].ToString());
                        ObjCVarA_CostCenters.mParent_ID = Convert.ToInt32(dr["Parent_ID"].ToString());
                        ObjCVarA_CostCenters.mIsMain = Convert.ToBoolean(dr["IsMain"].ToString());
                        ObjCVarA_CostCenters.mCCLevel = Convert.ToInt32(dr["CCLevel"].ToString());
                        ObjCVarA_CostCenters.mRealCostCenterCode = Convert.ToString(dr["RealCostCenterCode"].ToString());
                        ObjCVarA_CostCenters.mUser_ID = Convert.ToInt32(dr["User_ID"].ToString());
                        ObjCVarA_CostCenters.mType_ID = Convert.ToInt32(dr["Type_ID"].ToString());
                        ObjCVarA_CostCenters.mIsClosed = Convert.ToBoolean(dr["IsClosed"].ToString());
                        ObjCVarA_CostCenters.mSubAccountGroupID = Convert.ToInt32(dr["SubAccountGroupID"].ToString());
                        ObjCVarA_CostCenters.mEmployeesCount = Convert.ToInt32(dr["EmployeesCount"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarA_CostCenters.Add(ObjCVarA_CostCenters);
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
        public Exception DataFillSearch(string CostCenterName)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarA_CostCenters.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;

                    Com.Parameters.Add(new SqlParameter("@CostCenterName", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListPagingSearch_A_CostCenters";
                    Com.Parameters[0].Value = CostCenterName;

                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        /*Start DataReader*/
                        CVarA_CostCentersTAX ObjCVarA_CostCenters = new CVarA_CostCentersTAX();
                        ObjCVarA_CostCenters.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarA_CostCenters.mCostCenterNumber = Convert.ToString(dr["CostCenterNumber"].ToString());
                        ObjCVarA_CostCenters.mCostCenterName = Convert.ToString(dr["CostCenterName"].ToString());
                        ObjCVarA_CostCenters.mParent_ID = Convert.ToInt32(dr["Parent_ID"].ToString());
                        ObjCVarA_CostCenters.mIsMain = Convert.ToBoolean(dr["IsMain"].ToString());
                        ObjCVarA_CostCenters.mCCLevel = Convert.ToInt32(dr["CCLevel"].ToString());
                        ObjCVarA_CostCenters.mRealCostCenterCode = Convert.ToString(dr["RealCostCenterCode"].ToString());
                        ObjCVarA_CostCenters.mUser_ID = Convert.ToInt32(dr["User_ID"].ToString());
                        ObjCVarA_CostCenters.mType_ID = Convert.ToInt32(dr["Type_ID"].ToString());
                        ObjCVarA_CostCenters.mIsClosed = Convert.ToBoolean(dr["IsClosed"].ToString());
                        ObjCVarA_CostCenters.mSubAccountGroupID = Convert.ToInt32(dr["SubAccountGroupID"].ToString());
                        ObjCVarA_CostCenters.mEmployeesCount = Convert.ToInt32(dr["EmployeesCount"].ToString());
                        lstCVarA_CostCenters.Add(ObjCVarA_CostCenters);
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
        #region "Common Methods"
        private void BeginTrans(SqlCommand Com, SqlConnection Con)
        {

            tr = Con.BeginTransaction(IsolationLevel.Serializable);
            Com.CommandType = CommandType.StoredProcedure;
        }

        private void EndTrans(SqlCommand Com, SqlConnection Con)
        {

            Com.Transaction = tr;
            Com.Connection = Con;
            Com.ExecuteNonQuery();
            tr.Commit();
        }

        #endregion
        #region "Set List Method"
        private Exception SetList(string WhereClause, Boolean IsDelete)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                if (IsDelete == true)
                    Com.CommandText = "[dbo].DeleteListA_CostCenters";
                else
                    Com.CommandText = "[dbo].UpdateListA_CostCenters";
                Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                BeginTrans(Com, Con);
                Com.Parameters[0].Value = WhereClause;
                EndTrans(Com, Con);
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
        #region "Delete Methods"
        public Exception DeleteItem(List<CPKA_CostCentersTAX> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemA_CostCenters";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int));
                foreach (CPKA_CostCentersTAX ObjCPKA_CostCenters in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt32(ObjCPKA_CostCenters.ID);
                    EndTrans(Com, Con);
                }
            }
            catch (Exception ex)
            {
                Exp = ex;
            }
            finally
            {
                Con.Close();
                Con.Dispose();
                DeleteList.Clear();
            }
            return Exp;
        }

        public Exception DeleteList(string WhereClause)
        {

            return SetList(WhereClause, true);
        }

        #endregion
        #region "Save Methods"
        public Exception SaveMethod(List<CVarA_CostCentersTAX> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@CostCenterNumber", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@CostCenterName", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@Parent_ID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@IsMain", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@CCLevel", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@RealCostCenterCode", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@User_ID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@Type_ID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@IsClosed", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@SubAccountGroupID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@EmployeesCount", SqlDbType.Int));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarA_CostCentersTAX ObjCVarA_CostCenters in SaveList)
                {
                    if (ObjCVarA_CostCenters.mIsChanges == true)
                    {
                        if (ObjCVarA_CostCenters.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemA_CostCenters";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarA_CostCenters.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemA_CostCenters";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarA_CostCenters.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarA_CostCenters.ID;
                        }
                        Com.Parameters["@CostCenterNumber"].Value = ObjCVarA_CostCenters.CostCenterNumber;
                        Com.Parameters["@CostCenterName"].Value = ObjCVarA_CostCenters.CostCenterName;
                        Com.Parameters["@Parent_ID"].Value = ObjCVarA_CostCenters.Parent_ID;
                        Com.Parameters["@IsMain"].Value = ObjCVarA_CostCenters.IsMain;
                        Com.Parameters["@CCLevel"].Value = ObjCVarA_CostCenters.CCLevel;
                        Com.Parameters["@RealCostCenterCode"].Value = ObjCVarA_CostCenters.RealCostCenterCode;
                        Com.Parameters["@User_ID"].Value = ObjCVarA_CostCenters.User_ID;
                        Com.Parameters["@Type_ID"].Value = ObjCVarA_CostCenters.Type_ID;
                        Com.Parameters["@IsClosed"].Value = ObjCVarA_CostCenters.IsClosed;
                        Com.Parameters["@SubAccountGroupID"].Value = ObjCVarA_CostCenters.SubAccountGroupID;
                        Com.Parameters["@EmployeesCount"].Value = ObjCVarA_CostCenters.EmployeesCount;
                        EndTrans(Com, Con);
                        if (ObjCVarA_CostCenters.ID == 0)
                        {
                            ObjCVarA_CostCenters.ID = Convert.ToInt32(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarA_CostCenters.mIsChanges = false;
                    }
                }
            }
            catch (Exception ex)
            {
                Exp = ex;
                if (tr != null)
                    tr.Rollback();
            }
            finally
            {
                Con.Close();
                Con.Dispose();
            }
            return Exp;
        }
        #endregion
        #region "Update Methods"
        public Exception UpdateList(string UpdateClause)
        {

            return SetList(UpdateClause, false);
        }

        #endregion
    }
}

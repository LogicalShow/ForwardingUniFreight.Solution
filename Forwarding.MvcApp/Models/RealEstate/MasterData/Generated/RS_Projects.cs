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
    public class CPKRS_Projects
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
    public partial class CVarRS_Projects : CPKRS_Projects
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal String mCode;
        internal String mName;
        internal String mAddress;
        internal Int32 mAccountID;
        internal Int32 mCostCenter_ID;
        internal Int32 mNoAccessID;
        internal Int32 mFloors;
        #endregion

        #region "Methods"
        public String Code
        {
            get { return mCode; }
            set { mIsChanges = true; mCode = value; }
        }
        public String Name
        {
            get { return mName; }
            set { mIsChanges = true; mName = value; }
        }
        public String Address
        {
            get { return mAddress; }
            set { mIsChanges = true; mAddress = value; }
        }
        public Int32 AccountID
        {
            get { return mAccountID; }
            set { mIsChanges = true; mAccountID = value; }
        }
        public Int32 CostCenter_ID
        {
            get { return mCostCenter_ID; }
            set { mIsChanges = true; mCostCenter_ID = value; }
        }
        public Int32 NoAccessID
        {
            get { return mNoAccessID; }
            set { mIsChanges = true; mNoAccessID = value; }
        }
        public Int32 Floors
        {
            get { return mFloors; }
            set { mIsChanges = true; mFloors = value; }
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

    public partial class CRS_Projects
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
        public List<CVarRS_Projects> lstCVarRS_Projects = new List<CVarRS_Projects>();
        public List<CPKRS_Projects> lstDeletedCPKRS_Projects = new List<CPKRS_Projects>();
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
            lstCVarRS_Projects.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListRS_Projects";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemRS_Projects";
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
                        CVarRS_Projects ObjCVarRS_Projects = new CVarRS_Projects();
                        ObjCVarRS_Projects.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarRS_Projects.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarRS_Projects.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarRS_Projects.mAddress = Convert.ToString(dr["Address"].ToString());
                        ObjCVarRS_Projects.mAccountID = Convert.ToInt32(dr["AccountID"].ToString());
                        ObjCVarRS_Projects.mCostCenter_ID = Convert.ToInt32(dr["CostCenter_ID"].ToString());
                        ObjCVarRS_Projects.mNoAccessID = Convert.ToInt32(dr["NoAccessID"].ToString());
                        ObjCVarRS_Projects.mFloors = Convert.ToInt32(dr["Floors"].ToString());
                        lstCVarRS_Projects.Add(ObjCVarRS_Projects);
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
            lstCVarRS_Projects.Clear();

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
                Com.CommandText = "[dbo].GetListPagingRS_Projects";
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
                        CVarRS_Projects ObjCVarRS_Projects = new CVarRS_Projects();
                        ObjCVarRS_Projects.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarRS_Projects.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarRS_Projects.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarRS_Projects.mAddress = Convert.ToString(dr["Address"].ToString());
                        ObjCVarRS_Projects.mAccountID = Convert.ToInt32(dr["AccountID"].ToString());
                        ObjCVarRS_Projects.mCostCenter_ID = Convert.ToInt32(dr["CostCenter_ID"].ToString());
                        ObjCVarRS_Projects.mNoAccessID = Convert.ToInt32(dr["NoAccessID"].ToString());
                        ObjCVarRS_Projects.mFloors = Convert.ToInt32(dr["Floors"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarRS_Projects.Add(ObjCVarRS_Projects);
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
                    Com.CommandText = "[dbo].DeleteListRS_Projects";
                else
                    Com.CommandText = "[dbo].UpdateListRS_Projects";
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
        public Exception DeleteItem(List<CPKRS_Projects> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemRS_Projects";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int));
                foreach (CPKRS_Projects ObjCPKRS_Projects in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt32(ObjCPKRS_Projects.ID);
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
        public Exception SaveMethod(List<CVarRS_Projects> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@Code", SqlDbType.VarChar));
                Com.Parameters.Add(new SqlParameter("@Name", SqlDbType.VarChar));
                Com.Parameters.Add(new SqlParameter("@Address", SqlDbType.VarChar));
                Com.Parameters.Add(new SqlParameter("@AccountID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CostCenter_ID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@NoAccessID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@Floors", SqlDbType.Int));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarRS_Projects ObjCVarRS_Projects in SaveList)
                {
                    if (ObjCVarRS_Projects.mIsChanges == true)
                    {
                        if (ObjCVarRS_Projects.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemRS_Projects";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarRS_Projects.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemRS_Projects";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarRS_Projects.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarRS_Projects.ID;
                        }
                        Com.Parameters["@Code"].Value = ObjCVarRS_Projects.Code;
                        Com.Parameters["@Name"].Value = ObjCVarRS_Projects.Name;
                        Com.Parameters["@Address"].Value = ObjCVarRS_Projects.Address;
                        Com.Parameters["@AccountID"].Value = ObjCVarRS_Projects.AccountID;
                        Com.Parameters["@CostCenter_ID"].Value = ObjCVarRS_Projects.CostCenter_ID;
                        Com.Parameters["@NoAccessID"].Value = ObjCVarRS_Projects.NoAccessID;
                        Com.Parameters["@Floors"].Value = ObjCVarRS_Projects.Floors;
                        EndTrans(Com, Con);
                        if (ObjCVarRS_Projects.ID == 0)
                        {
                            ObjCVarRS_Projects.ID = Convert.ToInt32(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarRS_Projects.mIsChanges = false;
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

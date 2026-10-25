using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.FA.Generated
{
    [Serializable]
    public class CPKFA_AssetsGroupDestructions
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
    public partial class CVarFA_AssetsGroupDestructions : CPKFA_AssetsGroupDestructions
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal DateTime mFromDate;
        internal DateTime mToDate;
        internal Decimal mPercentage;
        internal String mNotes;
        internal Int32 mAssestGroupID;
        #endregion

        #region "Methods"
        public DateTime FromDate
        {
            get { return mFromDate; }
            set { mIsChanges = true; mFromDate = value; }
        }
        public DateTime ToDate
        {
            get { return mToDate; }
            set { mIsChanges = true; mToDate = value; }
        }
        public Decimal Percentage
        {
            get { return mPercentage; }
            set { mIsChanges = true; mPercentage = value; }
        }
        public String Notes
        {
            get { return mNotes; }
            set { mIsChanges = true; mNotes = value; }
        }
        public Int32 AssestGroupID
        {
            get { return mAssestGroupID; }
            set { mIsChanges = true; mAssestGroupID = value; }
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

    public partial class CFA_AssetsGroupDestructions
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
        public List<CVarFA_AssetsGroupDestructions> lstCVarFA_AssetsGroupDestructions = new List<CVarFA_AssetsGroupDestructions>();
        public List<CPKFA_AssetsGroupDestructions> lstDeletedCPKFA_AssetsGroupDestructions = new List<CPKFA_AssetsGroupDestructions>();
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
            lstCVarFA_AssetsGroupDestructions.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListFA_AssetsGroupDestructions";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemFA_AssetsGroupDestructions";
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
                        CVarFA_AssetsGroupDestructions ObjCVarFA_AssetsGroupDestructions = new CVarFA_AssetsGroupDestructions();
                        ObjCVarFA_AssetsGroupDestructions.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarFA_AssetsGroupDestructions.mFromDate = Convert.ToDateTime(dr["FromDate"].ToString());
                        ObjCVarFA_AssetsGroupDestructions.mToDate = Convert.ToDateTime(dr["ToDate"].ToString());
                        ObjCVarFA_AssetsGroupDestructions.mPercentage = Convert.ToDecimal(dr["Percentage"].ToString());
                        ObjCVarFA_AssetsGroupDestructions.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarFA_AssetsGroupDestructions.mAssestGroupID = Convert.ToInt32(dr["AssestGroupID"].ToString());
                        lstCVarFA_AssetsGroupDestructions.Add(ObjCVarFA_AssetsGroupDestructions);
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
            lstCVarFA_AssetsGroupDestructions.Clear();

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
                Com.CommandText = "[dbo].GetListPagingFA_AssetsGroupDestructions";
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
                        CVarFA_AssetsGroupDestructions ObjCVarFA_AssetsGroupDestructions = new CVarFA_AssetsGroupDestructions();
                        ObjCVarFA_AssetsGroupDestructions.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarFA_AssetsGroupDestructions.mFromDate = Convert.ToDateTime(dr["FromDate"].ToString());
                        ObjCVarFA_AssetsGroupDestructions.mToDate = Convert.ToDateTime(dr["ToDate"].ToString());
                        ObjCVarFA_AssetsGroupDestructions.mPercentage = Convert.ToDecimal(dr["Percentage"].ToString());
                        ObjCVarFA_AssetsGroupDestructions.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarFA_AssetsGroupDestructions.mAssestGroupID = Convert.ToInt32(dr["AssestGroupID"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarFA_AssetsGroupDestructions.Add(ObjCVarFA_AssetsGroupDestructions);
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
                    Com.CommandText = "[dbo].DeleteListFA_AssetsGroupDestructions";
                else
                    Com.CommandText = "[dbo].UpdateListFA_AssetsGroupDestructions";
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
        public Exception DeleteItem(List<CPKFA_AssetsGroupDestructions> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemFA_AssetsGroupDestructions";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int));
                foreach (CPKFA_AssetsGroupDestructions ObjCPKFA_AssetsGroupDestructions in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt32(ObjCPKFA_AssetsGroupDestructions.ID);
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
        public Exception SaveMethod(List<CVarFA_AssetsGroupDestructions> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@FromDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@ToDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@Percentage", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@Notes", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@AssestGroupID", SqlDbType.Int));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarFA_AssetsGroupDestructions ObjCVarFA_AssetsGroupDestructions in SaveList)
                {
                    if (ObjCVarFA_AssetsGroupDestructions.mIsChanges == true)
                    {
                        if (ObjCVarFA_AssetsGroupDestructions.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemFA_AssetsGroupDestructions";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarFA_AssetsGroupDestructions.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemFA_AssetsGroupDestructions";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarFA_AssetsGroupDestructions.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarFA_AssetsGroupDestructions.ID;
                        }
                        Com.Parameters["@FromDate"].Value = ObjCVarFA_AssetsGroupDestructions.FromDate;
                        Com.Parameters["@ToDate"].Value = ObjCVarFA_AssetsGroupDestructions.ToDate;
                        Com.Parameters["@Percentage"].Value = ObjCVarFA_AssetsGroupDestructions.Percentage;
                        Com.Parameters["@Notes"].Value = ObjCVarFA_AssetsGroupDestructions.Notes;
                        Com.Parameters["@AssestGroupID"].Value = ObjCVarFA_AssetsGroupDestructions.AssestGroupID;
                        EndTrans(Com, Con);
                        if (ObjCVarFA_AssetsGroupDestructions.ID == 0)
                        {
                            ObjCVarFA_AssetsGroupDestructions.ID = Convert.ToInt32(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarFA_AssetsGroupDestructions.mIsChanges = false;
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

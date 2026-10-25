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
    public class CPKRS_Units
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
    public partial class CVarRS_Units : CPKRS_Units
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
            set { mIsChanges = true; mCode = value; }
        }
        public Int32 ClientID
        {
            get { return mClientID; }
            set { mIsChanges = true; mClientID = value; }
        }
        public Int32 ProjectID
        {
            get { return mProjectID; }
            set { mIsChanges = true; mProjectID = value; }
        }
        public Decimal Price
        {
            get { return mPrice; }
            set { mIsChanges = true; mPrice = value; }
        }
        public String FloorNo
        {
            get { return mFloorNo; }
            set { mIsChanges = true; mFloorNo = value; }
        }
        public Decimal Size
        {
            get { return mSize; }
            set { mIsChanges = true; mSize = value; }
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

    public partial class CRS_Units
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
        public List<CVarRS_Units> lstCVarRS_Units = new List<CVarRS_Units>();
        public List<CPKRS_Units> lstDeletedCPKRS_Units = new List<CPKRS_Units>();
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
            lstCVarRS_Units.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListRS_Units";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemRS_Units";
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
                        CVarRS_Units ObjCVarRS_Units = new CVarRS_Units();
                        ObjCVarRS_Units.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarRS_Units.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarRS_Units.mClientID = Convert.ToInt32(dr["ClientID"].ToString());
                        ObjCVarRS_Units.mProjectID = Convert.ToInt32(dr["ProjectID"].ToString());
                        ObjCVarRS_Units.mPrice = Convert.ToDecimal(dr["Price"].ToString());
                        ObjCVarRS_Units.mFloorNo = Convert.ToString(dr["FloorNo"].ToString());
                        ObjCVarRS_Units.mSize = Convert.ToDecimal(dr["Size"].ToString());
                        lstCVarRS_Units.Add(ObjCVarRS_Units);
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
            lstCVarRS_Units.Clear();

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
                Com.CommandText = "[dbo].GetListPagingRS_Units";
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
                        CVarRS_Units ObjCVarRS_Units = new CVarRS_Units();
                        ObjCVarRS_Units.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarRS_Units.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarRS_Units.mClientID = Convert.ToInt32(dr["ClientID"].ToString());
                        ObjCVarRS_Units.mProjectID = Convert.ToInt32(dr["ProjectID"].ToString());
                        ObjCVarRS_Units.mPrice = Convert.ToDecimal(dr["Price"].ToString());
                        ObjCVarRS_Units.mFloorNo = Convert.ToString(dr["FloorNo"].ToString());
                        ObjCVarRS_Units.mSize = Convert.ToDecimal(dr["Size"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarRS_Units.Add(ObjCVarRS_Units);
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
                    Com.CommandText = "[dbo].DeleteListRS_Units";
                else
                    Com.CommandText = "[dbo].UpdateListRS_Units";
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
        public Exception DeleteItem(List<CPKRS_Units> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemRS_Units";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int));
                foreach (CPKRS_Units ObjCPKRS_Units in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt32(ObjCPKRS_Units.ID);
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
        public Exception SaveMethod(List<CVarRS_Units> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@Code", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@ClientID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ProjectID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@Price", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@FloorNo", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@Size", SqlDbType.Decimal));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarRS_Units ObjCVarRS_Units in SaveList)
                {
                    if (ObjCVarRS_Units.mIsChanges == true)
                    {
                        if (ObjCVarRS_Units.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemRS_Units";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarRS_Units.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemRS_Units";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarRS_Units.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarRS_Units.ID;
                        }
                        Com.Parameters["@Code"].Value = ObjCVarRS_Units.Code;
                        Com.Parameters["@ClientID"].Value = ObjCVarRS_Units.ClientID;
                        Com.Parameters["@ProjectID"].Value = ObjCVarRS_Units.ProjectID;
                        Com.Parameters["@Price"].Value = ObjCVarRS_Units.Price;
                        Com.Parameters["@FloorNo"].Value = ObjCVarRS_Units.FloorNo;
                        Com.Parameters["@Size"].Value = ObjCVarRS_Units.Size;
                        EndTrans(Com, Con);
                        if (ObjCVarRS_Units.ID == 0)
                        {
                            ObjCVarRS_Units.ID = Convert.ToInt32(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarRS_Units.mIsChanges = false;
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

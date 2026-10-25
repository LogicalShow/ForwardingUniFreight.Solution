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
    public class CPKMAWBStock
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
    public partial class CVarMAWBStock : CPKMAWBStock
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mAirlineID;
        internal String mMAWBSuffix;
        internal Int64 mAssignedToOperationID;
        internal String mNotes;
        internal Int32 mCreatorUserID;
        internal DateTime mCreationDate;
        internal Int32 mModificatorUserID;
        internal DateTime mModificationDate;
        internal Int32 mTypeOfStockID;
        #endregion

        #region "Methods"
        public Int32 AirlineID
        {
            get { return mAirlineID; }
            set { mIsChanges = true; mAirlineID = value; }
        }
        public String MAWBSuffix
        {
            get { return mMAWBSuffix; }
            set { mIsChanges = true; mMAWBSuffix = value; }
        }
        public Int64 AssignedToOperationID
        {
            get { return mAssignedToOperationID; }
            set { mIsChanges = true; mAssignedToOperationID = value; }
        }
        public String Notes
        {
            get { return mNotes; }
            set { mIsChanges = true; mNotes = value; }
        }
        public Int32 CreatorUserID
        {
            get { return mCreatorUserID; }
            set { mIsChanges = true; mCreatorUserID = value; }
        }
        public DateTime CreationDate
        {
            get { return mCreationDate; }
            set { mIsChanges = true; mCreationDate = value; }
        }
        public Int32 ModificatorUserID
        {
            get { return mModificatorUserID; }
            set { mIsChanges = true; mModificatorUserID = value; }
        }
        public DateTime ModificationDate
        {
            get { return mModificationDate; }
            set { mIsChanges = true; mModificationDate = value; }
        }
        public Int32 TypeOfStockID
        {
            get { return mTypeOfStockID; }
            set { mIsChanges = true; mTypeOfStockID = value; }
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

    public partial class CMAWBStock
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
        public List<CVarMAWBStock> lstCVarMAWBStock = new List<CVarMAWBStock>();
        public List<CPKMAWBStock> lstDeletedCPKMAWBStock = new List<CPKMAWBStock>();
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
        public Exception GetItem(Int64 ID)
        {
            return DataFill(Convert.ToString(ID), false);
        }
        private Exception DataFill(string Param, Boolean IsList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarMAWBStock.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListMAWBStock";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemMAWBStock";
                    Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt));
                    Com.Parameters[0].Value = Convert.ToInt64(Param);
                }
                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        /*Start DataReader*/
                        CVarMAWBStock ObjCVarMAWBStock = new CVarMAWBStock();
                        ObjCVarMAWBStock.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarMAWBStock.mAirlineID = Convert.ToInt32(dr["AirlineID"].ToString());
                        ObjCVarMAWBStock.mMAWBSuffix = Convert.ToString(dr["MAWBSuffix"].ToString());
                        ObjCVarMAWBStock.mAssignedToOperationID = Convert.ToInt64(dr["AssignedToOperationID"].ToString());
                        ObjCVarMAWBStock.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarMAWBStock.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarMAWBStock.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarMAWBStock.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarMAWBStock.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarMAWBStock.mTypeOfStockID = Convert.ToInt32(dr["TypeOfStockID"].ToString());
                        lstCVarMAWBStock.Add(ObjCVarMAWBStock);
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
            lstCVarMAWBStock.Clear();

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
                Com.CommandText = "[dbo].GetListPagingMAWBStock";
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
                        CVarMAWBStock ObjCVarMAWBStock = new CVarMAWBStock();
                        ObjCVarMAWBStock.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarMAWBStock.mAirlineID = Convert.ToInt32(dr["AirlineID"].ToString());
                        ObjCVarMAWBStock.mMAWBSuffix = Convert.ToString(dr["MAWBSuffix"].ToString());
                        ObjCVarMAWBStock.mAssignedToOperationID = Convert.ToInt64(dr["AssignedToOperationID"].ToString());
                        ObjCVarMAWBStock.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarMAWBStock.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarMAWBStock.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarMAWBStock.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarMAWBStock.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarMAWBStock.mTypeOfStockID = Convert.ToInt32(dr["TypeOfStockID"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarMAWBStock.Add(ObjCVarMAWBStock);
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
                    Com.CommandText = "[dbo].DeleteListMAWBStock";
                else
                    Com.CommandText = "[dbo].UpdateListMAWBStock";
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
        public Exception DeleteItem(List<CPKMAWBStock> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemMAWBStock";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt));
                foreach (CPKMAWBStock ObjCPKMAWBStock in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt64(ObjCPKMAWBStock.ID);
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
        public Exception SaveMethod(List<CVarMAWBStock> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@AirlineID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@MAWBSuffix", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@AssignedToOperationID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@Notes", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@CreatorUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CreationDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@ModificatorUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ModificationDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@TypeOfStockID", SqlDbType.Int));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarMAWBStock ObjCVarMAWBStock in SaveList)
                {
                    if (ObjCVarMAWBStock.mIsChanges == true)
                    {
                        if (ObjCVarMAWBStock.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemMAWBStock";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarMAWBStock.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemMAWBStock";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarMAWBStock.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarMAWBStock.ID;
                        }
                        Com.Parameters["@AirlineID"].Value = ObjCVarMAWBStock.AirlineID;
                        Com.Parameters["@MAWBSuffix"].Value = ObjCVarMAWBStock.MAWBSuffix;
                        Com.Parameters["@AssignedToOperationID"].Value = ObjCVarMAWBStock.AssignedToOperationID;
                        Com.Parameters["@Notes"].Value = ObjCVarMAWBStock.Notes;
                        Com.Parameters["@CreatorUserID"].Value = ObjCVarMAWBStock.CreatorUserID;
                        Com.Parameters["@CreationDate"].Value = ObjCVarMAWBStock.CreationDate;
                        Com.Parameters["@ModificatorUserID"].Value = ObjCVarMAWBStock.ModificatorUserID;
                        Com.Parameters["@ModificationDate"].Value = ObjCVarMAWBStock.ModificationDate;
                        Com.Parameters["@TypeOfStockID"].Value = ObjCVarMAWBStock.TypeOfStockID;
                        EndTrans(Com, Con);
                        if (ObjCVarMAWBStock.ID == 0)
                        {
                            ObjCVarMAWBStock.ID = Convert.ToInt64(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarMAWBStock.mIsChanges = false;
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

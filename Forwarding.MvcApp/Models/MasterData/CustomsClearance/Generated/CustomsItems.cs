using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.MasterData.Generated.CustomsClearance
{
    [Serializable]
    public class CPKCustomItems
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
    public partial class CVarCustomItems : CPKCustomItems
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal String mCode;
        internal String mArDescription;
        internal String mEnDescription;
        internal String mTariffCode;
        internal Decimal mDiscount;
        internal String mImage;
        #endregion

        #region "Methods"
        public String Code
        {
            get { return mCode; }
            set { mIsChanges = true; mCode = value; }
        }
        public String ArDescription
        {
            get { return mArDescription; }
            set { mIsChanges = true; mArDescription = value; }
        }
        public String EnDescription
        {
            get { return mEnDescription; }
            set { mIsChanges = true; mEnDescription = value; }
        }
        public String TariffCode
        {
            get { return mTariffCode; }
            set { mIsChanges = true; mTariffCode = value; }
        }
        public Decimal Discount
        {
            get { return mDiscount; }
            set { mIsChanges = true; mDiscount = value; }
        }
        public String Image
        {
            get { return mImage; }
            set { mIsChanges = true; mImage = value; }
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

    public partial class CCustomItems
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
        public List<CVarCustomItems> lstCVarCustomItems = new List<CVarCustomItems>();
        public List<CPKCustomItems> lstDeletedCPKCustomItems = new List<CPKCustomItems>();
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
            lstCVarCustomItems.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListCustomItems";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemCustomItems";
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
                        CVarCustomItems ObjCVarCustomItems = new CVarCustomItems();
                        ObjCVarCustomItems.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarCustomItems.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarCustomItems.mArDescription = Convert.ToString(dr["ArDescription"].ToString());
                        ObjCVarCustomItems.mEnDescription = Convert.ToString(dr["EnDescription"].ToString());
                        ObjCVarCustomItems.mTariffCode = Convert.ToString(dr["TariffCode"].ToString());
                        ObjCVarCustomItems.mDiscount = Convert.ToDecimal(dr["Discount"].ToString());
                        ObjCVarCustomItems.mImage = Convert.ToString(dr["Image"].ToString());
                        lstCVarCustomItems.Add(ObjCVarCustomItems);
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
            lstCVarCustomItems.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                Com.Parameters.Add(new SqlParameter("@PageSize", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@PageNumber", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@OrderBy", SqlDbType.NVarChar));
                Com.CommandText = "[dbo].GetListPagingCustomItems";
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
                        CVarCustomItems ObjCVarCustomItems = new CVarCustomItems();
                        ObjCVarCustomItems.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarCustomItems.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarCustomItems.mArDescription = Convert.ToString(dr["ArDescription"].ToString());
                        ObjCVarCustomItems.mEnDescription = Convert.ToString(dr["EnDescription"].ToString());
                        ObjCVarCustomItems.mTariffCode = Convert.ToString(dr["TariffCode"].ToString());
                        ObjCVarCustomItems.mDiscount = Convert.ToDecimal(dr["Discount"].ToString());
                        ObjCVarCustomItems.mImage = Convert.ToString(dr["Image"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarCustomItems.Add(ObjCVarCustomItems);
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
                    Com.CommandText = "[dbo].DeleteListCustomItems";
                else
                    Com.CommandText = "[dbo].UpdateListCustomItems";
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
        public Exception DeleteItem(List<CPKCustomItems> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemCustomItems";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int));
                foreach (CPKCustomItems ObjCPKCustomItems in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt32(ObjCPKCustomItems.ID);
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
        public Exception SaveMethod(List<CVarCustomItems> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@Code", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@ArDescription", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@EnDescription", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@TariffCode", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@Discount", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@Image", SqlDbType.NVarChar));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarCustomItems ObjCVarCustomItems in SaveList)
                {
                    if (ObjCVarCustomItems.mIsChanges == true)
                    {
                        if (ObjCVarCustomItems.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemCustomItems";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarCustomItems.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemCustomItems";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarCustomItems.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarCustomItems.ID;
                        }
                        Com.Parameters["@Code"].Value = ObjCVarCustomItems.Code;
                        Com.Parameters["@ArDescription"].Value = ObjCVarCustomItems.ArDescription;
                        Com.Parameters["@EnDescription"].Value = ObjCVarCustomItems.EnDescription;
                        Com.Parameters["@TariffCode"].Value = ObjCVarCustomItems.TariffCode;
                        Com.Parameters["@Discount"].Value = ObjCVarCustomItems.Discount;
                        Com.Parameters["@Image"].Value = ObjCVarCustomItems.Image;
                        EndTrans(Com, Con);
                        if (ObjCVarCustomItems.ID == 0)
                        {
                            ObjCVarCustomItems.ID = Convert.ToInt32(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarCustomItems.mIsChanges = false;
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

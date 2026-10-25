using System;
using System.Data;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;


namespace Forwarding.MvcApp.Models.SL.SL_MasterData.Generated
{
    [Serializable]
    public class CPKSL_LinkPriceListWithPaymentMethod
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
    public partial class CVarSL_LinkPriceListWithPaymentMethod : CPKSL_LinkPriceListWithPaymentMethod
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mPriceListID;
        internal Int32 mPaymentTermsID;
        internal Decimal mPercentage;
        #endregion

        #region "Methods"
        public Int32 PriceListID
        {
            get { return mPriceListID; }
            set { mIsChanges = true; mPriceListID = value; }
        }
        public Int32 PaymentTermsID
        {
            get { return mPaymentTermsID; }
            set { mIsChanges = true; mPaymentTermsID = value; }
        }
        public Decimal Percentage
        {
            get { return mPercentage; }
            set { mIsChanges = true; mPercentage = value; }
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

    public partial class CSL_LinkPriceListWithPaymentMethod
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
        public List<CVarSL_LinkPriceListWithPaymentMethod> lstCVarSL_LinkPriceListWithPaymentMethod = new List<CVarSL_LinkPriceListWithPaymentMethod>();
        public List<CPKSL_LinkPriceListWithPaymentMethod> lstDeletedCPKSL_LinkPriceListWithPaymentMethod = new List<CPKSL_LinkPriceListWithPaymentMethod>();
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
            lstCVarSL_LinkPriceListWithPaymentMethod.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListSL_LinkPriceListWithPaymentMethod";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemSL_LinkPriceListWithPaymentMethod";
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
                        CVarSL_LinkPriceListWithPaymentMethod ObjCVarSL_LinkPriceListWithPaymentMethod = new CVarSL_LinkPriceListWithPaymentMethod();
                        ObjCVarSL_LinkPriceListWithPaymentMethod.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarSL_LinkPriceListWithPaymentMethod.mPriceListID = Convert.ToInt32(dr["PriceListID"].ToString());
                        ObjCVarSL_LinkPriceListWithPaymentMethod.mPaymentTermsID = Convert.ToInt32(dr["PaymentTermsID"].ToString());
                        ObjCVarSL_LinkPriceListWithPaymentMethod.mPercentage = Convert.ToDecimal(dr["Percentage"].ToString());
                        lstCVarSL_LinkPriceListWithPaymentMethod.Add(ObjCVarSL_LinkPriceListWithPaymentMethod);
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
            lstCVarSL_LinkPriceListWithPaymentMethod.Clear();

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
                Com.CommandText = "[dbo].GetListPagingSL_LinkPriceListWithPaymentMethod";
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
                        CVarSL_LinkPriceListWithPaymentMethod ObjCVarSL_LinkPriceListWithPaymentMethod = new CVarSL_LinkPriceListWithPaymentMethod();
                        ObjCVarSL_LinkPriceListWithPaymentMethod.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarSL_LinkPriceListWithPaymentMethod.mPriceListID = Convert.ToInt32(dr["PriceListID"].ToString());
                        ObjCVarSL_LinkPriceListWithPaymentMethod.mPaymentTermsID = Convert.ToInt32(dr["PaymentTermsID"].ToString());
                        ObjCVarSL_LinkPriceListWithPaymentMethod.mPercentage = Convert.ToDecimal(dr["Percentage"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarSL_LinkPriceListWithPaymentMethod.Add(ObjCVarSL_LinkPriceListWithPaymentMethod);
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
                    Com.CommandText = "[dbo].DeleteListSL_LinkPriceListWithPaymentMethod";
                else
                    Com.CommandText = "[dbo].UpdateListSL_LinkPriceListWithPaymentMethod";
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
        public Exception DeleteItem(List<CPKSL_LinkPriceListWithPaymentMethod> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemSL_LinkPriceListWithPaymentMethod";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int));
                foreach (CPKSL_LinkPriceListWithPaymentMethod ObjCPKSL_LinkPriceListWithPaymentMethod in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt32(ObjCPKSL_LinkPriceListWithPaymentMethod.ID);
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
        public Exception SaveMethod(List<CVarSL_LinkPriceListWithPaymentMethod> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@PriceListID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@PaymentTermsID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@Percentage", SqlDbType.Decimal));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarSL_LinkPriceListWithPaymentMethod ObjCVarSL_LinkPriceListWithPaymentMethod in SaveList)
                {
                    if (ObjCVarSL_LinkPriceListWithPaymentMethod.mIsChanges == true)
                    {
                        if (ObjCVarSL_LinkPriceListWithPaymentMethod.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemSL_LinkPriceListWithPaymentMethod";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarSL_LinkPriceListWithPaymentMethod.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemSL_LinkPriceListWithPaymentMethod";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarSL_LinkPriceListWithPaymentMethod.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarSL_LinkPriceListWithPaymentMethod.ID;
                        }
                        Com.Parameters["@PriceListID"].Value = ObjCVarSL_LinkPriceListWithPaymentMethod.PriceListID;
                        Com.Parameters["@PaymentTermsID"].Value = ObjCVarSL_LinkPriceListWithPaymentMethod.PaymentTermsID;
                        Com.Parameters["@Percentage"].Value = ObjCVarSL_LinkPriceListWithPaymentMethod.Percentage;
                        EndTrans(Com, Con);
                        if (ObjCVarSL_LinkPriceListWithPaymentMethod.ID == 0)
                        {
                            ObjCVarSL_LinkPriceListWithPaymentMethod.ID = Convert.ToInt32(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarSL_LinkPriceListWithPaymentMethod.mIsChanges = false;
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

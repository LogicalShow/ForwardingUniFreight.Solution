using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.SC.MasterData.Generated
{
    [Serializable]
    public class CPKI_ItemsPrice
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
    public partial class CVarI_ItemsPrice : CPKI_ItemsPrice
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int64 mItemID;
        internal Decimal mPrice;
        internal Int32 mPriceListID;
        #endregion

        #region "Methods"
        public Int64 ItemID
        {
            get { return mItemID; }
            set { mIsChanges = true; mItemID = value; }
        }
        public Decimal Price
        {
            get { return mPrice; }
            set { mIsChanges = true; mPrice = value; }
        }
        public Int32 PriceListID
        {
            get { return mPriceListID; }
            set { mIsChanges = true; mPriceListID = value; }
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

    public partial class CI_ItemsPrice
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
        public List<CVarI_ItemsPrice> lstCVarI_ItemsPrice = new List<CVarI_ItemsPrice>();
        public List<CPKI_ItemsPrice> lstDeletedCPKI_ItemsPrice = new List<CPKI_ItemsPrice>();
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
            lstCVarI_ItemsPrice.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListI_ItemsPrice";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemI_ItemsPrice";
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
                        CVarI_ItemsPrice ObjCVarI_ItemsPrice = new CVarI_ItemsPrice();
                        ObjCVarI_ItemsPrice.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarI_ItemsPrice.mItemID = Convert.ToInt64(dr["ItemID"].ToString());
                        ObjCVarI_ItemsPrice.mPrice = Convert.ToDecimal(dr["Price"].ToString());
                        ObjCVarI_ItemsPrice.mPriceListID = Convert.ToInt32(dr["PriceListID"].ToString());
                        lstCVarI_ItemsPrice.Add(ObjCVarI_ItemsPrice);
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
            lstCVarI_ItemsPrice.Clear();

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
                Com.CommandText = "[dbo].GetListPagingI_ItemsPrice";
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
                        CVarI_ItemsPrice ObjCVarI_ItemsPrice = new CVarI_ItemsPrice();
                        ObjCVarI_ItemsPrice.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarI_ItemsPrice.mItemID = Convert.ToInt64(dr["ItemID"].ToString());
                        ObjCVarI_ItemsPrice.mPrice = Convert.ToDecimal(dr["Price"].ToString());
                        ObjCVarI_ItemsPrice.mPriceListID = Convert.ToInt32(dr["PriceListID"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarI_ItemsPrice.Add(ObjCVarI_ItemsPrice);
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
                    Com.CommandText = "[dbo].DeleteListI_ItemsPrice";
                else
                    Com.CommandText = "[dbo].UpdateListI_ItemsPrice";
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
        public Exception DeleteItem(List<CPKI_ItemsPrice> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemI_ItemsPrice";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int));
                foreach (CPKI_ItemsPrice ObjCPKI_ItemsPrice in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt32(ObjCPKI_ItemsPrice.ID);
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
        public Exception SaveMethod(List<CVarI_ItemsPrice> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@ItemID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@Price", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@PriceListID", SqlDbType.Int));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarI_ItemsPrice ObjCVarI_ItemsPrice in SaveList)
                {
                    if (ObjCVarI_ItemsPrice.mIsChanges == true)
                    {
                        if (ObjCVarI_ItemsPrice.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemI_ItemsPrice";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarI_ItemsPrice.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemI_ItemsPrice";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarI_ItemsPrice.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarI_ItemsPrice.ID;
                        }
                        Com.Parameters["@ItemID"].Value = ObjCVarI_ItemsPrice.ItemID;
                        Com.Parameters["@Price"].Value = ObjCVarI_ItemsPrice.Price;
                        Com.Parameters["@PriceListID"].Value = ObjCVarI_ItemsPrice.PriceListID;
                        EndTrans(Com, Con);
                        if (ObjCVarI_ItemsPrice.ID == 0)
                        {
                            ObjCVarI_ItemsPrice.ID = Convert.ToInt32(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarI_ItemsPrice.mIsChanges = false;
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

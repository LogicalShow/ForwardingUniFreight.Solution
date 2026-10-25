using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.SC.Transactions.Customized
{
    [Serializable]
    public class CPKSC_PostingGoodsIssueVouchers
    {
        #region "variables"
        #endregion

        #region "Methods"
        #endregion
    }
    [Serializable]
    public partial class CVarSC_PostingGoodsIssueVouchers : CPKSC_PostingGoodsIssueVouchers
    {
        #region "variables"
        internal string mErrMessage;
      
        #endregion

        #region "Methods"
        public string ErrMessage
        {
            get { return mErrMessage; }
            set { mErrMessage = value; }
        }
      
        #endregion

        #region Functions
      
        #endregion
    }

    public partial class CSC_PostingGoodsIssueVouchers
    {
        #region "variables"
       // (@ID nvarchar(max) ,@UserID int,@Approved bit )
        private SqlTransaction tr;
        public List<CVarSC_PostingGoodsIssueVouchers> lstCVarSC_PostingGoodsIssueVouchers = new List<CVarSC_PostingGoodsIssueVouchers>();
        #endregion

        #region "Select Methods"
        public Exception GetList(string TransIDs , int UserID , bool Approved)
        {
            return DataFill(TransIDs, UserID, Approved,  true);
        }
        public Exception GetListWorkOrderReturns(string TransIDs, int UserID, bool Approved)
        {
            return DataFillWorkOrderReturns(TransIDs, UserID, Approved, true);
        }
        public Exception GetListTax(string TransIDs, int UserID, bool Approved,int AccountID)
        {
            return DataFillTax(TransIDs, UserID, Approved, AccountID, true);
        }
        private Exception DataFill(string TransIDs, int UserID, bool Approved,  Boolean IsList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarSC_PostingGoodsIssueVouchers.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                Com.CommandTimeout = 300;

                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@TransIDs", SqlDbType.NVarChar));
                    Com.Parameters.Add(new SqlParameter("@UserID", SqlDbType.Int));
                    Com.Parameters.Add(new SqlParameter("@Approved", SqlDbType.Bit));
                    Com.CommandText = "[dbo].[SC_PostingGoodsIssueVouchers]";
                    Com.Parameters[0].Value = TransIDs;
                    Com.Parameters[1].Value = UserID;
                    Com.Parameters[2].Value = Approved;
                  
                }
                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        ///*Start DataReader*/
                        //CVarSC_PostingGoodsIssueVouchers ObjCVarSC_PostingGoodsIssueVouchers = new CVarSC_PostingGoodsIssueVouchers();
                        //ObjCVarSC_PostingGoodsIssueVouchers.mErrMessage = Convert.ToString(dr["ErrMessage"].ToString());
                        //lstCVarSC_PostingGoodsIssueVouchers.Add(ObjCVarSC_PostingGoodsIssueVouchers);
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
        private Exception DataFillWorkOrderReturns(string TransIDs, int UserID, bool Approved, Boolean IsList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarSC_PostingGoodsIssueVouchers.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                Com.CommandTimeout = 300;

                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@TransIDs", SqlDbType.NVarChar));
                    Com.Parameters.Add(new SqlParameter("@UserID", SqlDbType.Int));
                    Com.Parameters.Add(new SqlParameter("@Approved", SqlDbType.Bit));
                    Com.CommandText = "[dbo].[SC_PostingWorkOrderReturnsVoucher]";
                    Com.Parameters[0].Value = TransIDs;
                    Com.Parameters[1].Value = UserID;
                    Com.Parameters[2].Value = Approved;

                }
                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        ///*Start DataReader*/
                        //CVarSC_PostingGoodsIssueVouchers ObjCVarSC_PostingGoodsIssueVouchers = new CVarSC_PostingGoodsIssueVouchers();
                        //ObjCVarSC_PostingGoodsIssueVouchers.mErrMessage = Convert.ToString(dr["ErrMessage"].ToString());
                        //lstCVarSC_PostingGoodsIssueVouchers.Add(ObjCVarSC_PostingGoodsIssueVouchers);
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

        private Exception DataFillTax(string TransIDs, int UserID, bool Approved,int AccountID, Boolean IsList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarSC_PostingGoodsIssueVouchers.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                Com.CommandTimeout = 300;

                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@TransIDs", SqlDbType.NVarChar));
                    Com.Parameters.Add(new SqlParameter("@UserID", SqlDbType.Int));
                    Com.Parameters.Add(new SqlParameter("@Approved", SqlDbType.Bit));
                    Com.Parameters.Add(new SqlParameter("@AccID", SqlDbType.Int));

                    Com.CommandText = "[dbo].[SC_PostingGoodsIssueVouchersTax]";
                    Com.Parameters[0].Value = TransIDs;
                    Com.Parameters[1].Value = UserID;
                    Com.Parameters[2].Value = Approved;
                    Com.Parameters[3].Value = AccountID;


                }
                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        ///*Start DataReader*/
                        //CVarSC_PostingGoodsIssueVouchers ObjCVarSC_PostingGoodsIssueVouchers = new CVarSC_PostingGoodsIssueVouchers();
                        //ObjCVarSC_PostingGoodsIssueVouchers.mErrMessage = Convert.ToString(dr["ErrMessage"].ToString());
                        //lstCVarSC_PostingGoodsIssueVouchers.Add(ObjCVarSC_PostingGoodsIssueVouchers);
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

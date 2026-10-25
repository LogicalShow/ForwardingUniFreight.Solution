using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.PS.PS_Transactions.Generated
{
    [Serializable]
    public class CPKPS_PostingInvoices
    {
        #region "variables"
        #endregion

        #region "Methods"
        #endregion
    }
    [Serializable]
    public partial class CVarPS_PostingInvoices : CPKPS_PostingInvoices
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

    public partial class CPS_PostingInvoices
    {
        #region "variables"
       // (@ID nvarchar(max) ,@UserID int,@Approved bit )
        private SqlTransaction tr;
        public List<CVarPS_PostingInvoices> lstCVarPS_PostingInvoices = new List<CVarPS_PostingInvoices>();
        #endregion

        #region "Select Methods"
        public Exception GetList(string TransIDs , int UserID , bool Approved)
        {
            return DataFill(TransIDs, UserID, Approved,  true);
        }
          private Exception DataFill(string TransIDs, int UserID, bool Approved,  Boolean IsList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
           
            lstCVarPS_PostingInvoices.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandTimeout = 120;
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.NVarChar));
                    Com.Parameters.Add(new SqlParameter("@UserID", SqlDbType.Int));
                    Com.Parameters.Add(new SqlParameter("@Approved", SqlDbType.Bit));
                    Com.CommandText = "[dbo].[PS_PostingInvoices]";
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
                        //CVarPS_PostingInvoices ObjCVarPS_PostingInvoices = new CVarPS_PostingInvoices();
                        //ObjCVarPS_PostingInvoices.mErrMessage = Convert.ToString(dr["ErrMessage"].ToString());
                        //lstCVarPS_PostingInvoices.Add(ObjCVarPS_PostingInvoices);
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
        public Exception GetListTax(string TransIDs, int UserID, bool Approved,Int32 AccountID)
        {
            return DataFillTax(TransIDs, UserID, Approved, AccountID, true);
        }
        private Exception DataFillTax(string TransIDs, int UserID, bool Approved, Int32 AccountID, Boolean IsList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;

            lstCVarPS_PostingInvoices.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandTimeout = 120;
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.NVarChar));
                    Com.Parameters.Add(new SqlParameter("@UserID", SqlDbType.Int));
                    Com.Parameters.Add(new SqlParameter("@Approved", SqlDbType.Bit));
                    Com.Parameters.Add(new SqlParameter("@AccID", SqlDbType.Int));

                    Com.CommandText = "[dbo].[PS_PostingInvoicesTax]";
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
                        //CVarPS_PostingInvoices ObjCVarPS_PostingInvoices = new CVarPS_PostingInvoices();
                        //ObjCVarPS_PostingInvoices.mErrMessage = Convert.ToString(dr["ErrMessage"].ToString());
                        //lstCVarPS_PostingInvoices.Add(ObjCVarPS_PostingInvoices);
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

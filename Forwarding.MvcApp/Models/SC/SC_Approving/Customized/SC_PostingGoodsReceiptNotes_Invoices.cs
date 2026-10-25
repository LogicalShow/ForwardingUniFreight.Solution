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
    public class CPKSC_PostingGoodsReceiptNotes_Invoices
    {
        #region "variables"
        #endregion

        #region "Methods"
        #endregion
    }
    [Serializable]
    public partial class CVarSC_PostingGoodsReceiptNotes_Invoices : CPKSC_PostingGoodsReceiptNotes_Invoices
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

    public partial class CSC_PostingGoodsReceiptNotes_Invoices
    {
        #region "variables"
       // (@ID nvarchar(max) ,@UserID int,@Approved bit )
        private SqlTransaction tr;
        public List<CVarSC_PostingGoodsReceiptNotes_Invoices> lstCVarSC_PostingGoodsReceiptNotes_Invoices = new List<CVarSC_PostingGoodsReceiptNotes_Invoices>();
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
           
            lstCVarSC_PostingGoodsReceiptNotes_Invoices.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandTimeout = 120;
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@TransIDs", SqlDbType.NVarChar));
                    Com.Parameters.Add(new SqlParameter("@UserID", SqlDbType.Int));
                    Com.Parameters.Add(new SqlParameter("@Approved", SqlDbType.Bit));
                    Com.CommandText = "[dbo].[SC_PostingGoodsReceiptNotes_Invoices]";
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
                        //CVarSC_PostingGoodsReceiptNotes_Invoices ObjCVarSC_PostingGoodsReceiptNotes_Invoices = new CVarSC_PostingGoodsReceiptNotes_Invoices();
                        //ObjCVarSC_PostingGoodsReceiptNotes_Invoices.mErrMessage = Convert.ToString(dr["ErrMessage"].ToString());
                        //lstCVarSC_PostingGoodsReceiptNotes_Invoices.Add(ObjCVarSC_PostingGoodsReceiptNotes_Invoices);
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

     public Exception GetListTax(string TransIDs , int UserID , bool Approved, int AccoutID)
        {
            return DataFillTax(TransIDs, UserID, Approved, AccoutID,  true);
        }
          private Exception DataFillTax(string TransIDs, int UserID, bool Approved,int AccoutID,  Boolean IsList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
           
            lstCVarSC_PostingGoodsReceiptNotes_Invoices.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandTimeout = 120;
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@TransIDs", SqlDbType.NVarChar));
                    Com.Parameters.Add(new SqlParameter("@UserID", SqlDbType.Int));
                    Com.Parameters.Add(new SqlParameter("@Approved", SqlDbType.Bit));
                    Com.Parameters.Add(new SqlParameter("@AccID", SqlDbType.Int));

                    Com.CommandText = "[dbo].[SC_PostingGoodsReceiptNotes_InvoicesTax]";
                    Com.Parameters[0].Value = TransIDs;
                    Com.Parameters[1].Value = UserID;
                    Com.Parameters[2].Value = Approved;
                    Com.Parameters[3].Value = AccoutID;


                }
                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        ///*Start DataReader*/
                        //CVarSC_PostingGoodsReceiptNotes_Invoices ObjCVarSC_PostingGoodsReceiptNotes_Invoices = new CVarSC_PostingGoodsReceiptNotes_Invoices();
                        //ObjCVarSC_PostingGoodsReceiptNotes_Invoices.mErrMessage = Convert.ToString(dr["ErrMessage"].ToString());
                        //lstCVarSC_PostingGoodsReceiptNotes_Invoices.Add(ObjCVarSC_PostingGoodsReceiptNotes_Invoices);
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

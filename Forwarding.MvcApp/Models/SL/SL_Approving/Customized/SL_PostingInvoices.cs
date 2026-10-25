using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.SL.SL_Transactions.Generated
{
    [Serializable]
    public class CPKSL_PostingInvoices
    {
        #region "variables"
        #endregion

        #region "Methods"
        #endregion
    }
    [Serializable]
    public partial class CVarSL_PostingInvoices : CPKSL_PostingInvoices
    {
        #region "variables"
        internal string mErrMessage;
      
        #endregion

        #region "Methods"
        //public string ErrMessage
        //{
        //    get { return mErrMessage; }
        //    set { mErrMessage = value; }
        //}
      
        #endregion

        #region Functions
      
        #endregion
    }

    public partial class CSL_PostingInvoices
    {

       



        #region "variables"
        // (@ID nvarchar(max) ,@UserID int,@Approved bit )
        private SqlTransaction tr;
        public List<CVarSL_PostingInvoices> lstCVarSL_PostingInvoices = new List<CVarSL_PostingInvoices>();
        #endregion

        #region "Select Methods"
        public Exception GetList(string IDs , int UserID , bool Approved)
        {
            return DataFill(IDs, UserID, Approved,  true);
        }
          private Exception DataFill(string IDs, int UserID, bool Approved,  Boolean IsList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
           
            lstCVarSL_PostingInvoices.Clear();

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
                    Com.CommandText = "[dbo].[SL_PostingInvoices]";
                    Com.Parameters[0].Value = IDs;
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
                        //CVarSL_PostingInvoices ObjCVarSL_PostingInvoices = new CVarSL_PostingInvoices();
                        //ObjCVarSL_PostingInvoices.mErrMessage = Convert.ToString(dr["ErrMessage"].ToString());
                        //lstCVarSL_PostingInvoices.Add(ObjCVarSL_PostingInvoices);
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

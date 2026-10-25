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
    public class CPKSC_ValidateDeleteTransaction
    {
        #region "variables"
        #endregion

        #region "Methods"
        #endregion
    }
    [Serializable]
    public partial class CVarSC_ValidateDeleteTransaction : CPKSC_ValidateDeleteTransaction
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

    public partial class CSC_ValidateDeleteTransaction
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
        public List<CVarSC_ValidateDeleteTransaction> lstCVarSC_ValidateDeleteTransaction = new List<CVarSC_ValidateDeleteTransaction>();
        #endregion

        #region "Select Methods"
        public Exception GetList(int TransactionID , DateTime TransactionDate)
        {
            return DataFill(TransactionID , TransactionDate,   true);
        }
          private Exception DataFill(int TransactionID, DateTime TransactionDate ,  Boolean IsList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarSC_ValidateDeleteTransaction.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int));
                    Com.Parameters.Add(new SqlParameter("@TransactionDate", SqlDbType.DateTime));
                    Com.CommandText = "[dbo].[SC_ValidateDeleteTransaction]";
                    Com.Parameters[0].Value = TransactionID;
                    Com.Parameters[1].Value = TransactionDate;
                }
                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        /*Start DataReader*/
                        CVarSC_ValidateDeleteTransaction ObjCVarSC_ValidateDeleteTransaction = new CVarSC_ValidateDeleteTransaction();
                        ObjCVarSC_ValidateDeleteTransaction.mErrMessage = Convert.ToString(dr["ErrMessage"].ToString());
                        lstCVarSC_ValidateDeleteTransaction.Add(ObjCVarSC_ValidateDeleteTransaction);
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

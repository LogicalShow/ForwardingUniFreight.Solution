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
    public class CPKSC_ValidateTransaction_AND_UpdateHeader
    {
        #region "variables"
        #endregion

        #region "Methods"
        #endregion
    }
    [Serializable]
    public partial class CVarSC_ValidateTransaction_AND_UpdateHeader : CPKSC_ValidateTransaction_AND_UpdateHeader
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

    public partial class CSC_ValidateTransaction_AND_UpdateHeader
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
  //      @ItemIDs NVARCHAR(max)
  //,@StoreIDs NVARCHAR(max)
  //,@StartDate DATETIME
  //, @TransactionID INT
        private SqlTransaction tr;
        public List<CVarSC_ValidateTransaction_AND_UpdateHeader> lstCVarSC_ValidateTransaction_AND_UpdateHeader = new List<CVarSC_ValidateTransaction_AND_UpdateHeader>();
        #endregion

        #region "Select Methods"
        public Exception GetList(string ItemsIDs , string StoreIDs , DateTime StartDate , int TransactionID , string TransNotes)
        {
            return DataFill(ItemsIDs, StoreIDs, StartDate , TransactionID , TransNotes ,  true);
        }
          private Exception DataFill(string ItemsIDs, string StoreIDs, DateTime StartDate, int TransactionID , string TransNotes , Boolean IsList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarSC_ValidateTransaction_AND_UpdateHeader.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@ItemIDs", SqlDbType.NVarChar));
                    Com.Parameters.Add(new SqlParameter("@StoreIDs", SqlDbType.NVarChar));
                    Com.Parameters.Add(new SqlParameter("@StartDate", SqlDbType.DateTime));
                    Com.Parameters.Add(new SqlParameter("@TransactionID", SqlDbType.Int));
                    Com.Parameters.Add(new SqlParameter("@TransNotes", SqlDbType.NVarChar));


                    
                    Com.CommandText = "[dbo].[SC_ValidateTransaction_AND_UpdateHeader]";
                    Com.Parameters[0].Value = ItemsIDs;
                    Com.Parameters[1].Value = StoreIDs;
                    Com.Parameters[2].Value = StartDate;
                    Com.Parameters[3].Value = TransactionID;
                    Com.Parameters[4].Value = TransNotes;
                }
                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        /*Start DataReader*/
                        CVarSC_ValidateTransaction_AND_UpdateHeader ObjCVarSC_ValidateTransaction_AND_UpdateHeader = new CVarSC_ValidateTransaction_AND_UpdateHeader();
                        ObjCVarSC_ValidateTransaction_AND_UpdateHeader.mErrMessage = Convert.ToString(dr["ErrMessage"].ToString());
                        lstCVarSC_ValidateTransaction_AND_UpdateHeader.Add(ObjCVarSC_ValidateTransaction_AND_UpdateHeader);
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

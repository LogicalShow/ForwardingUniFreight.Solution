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
    public class CPKSC_PostingSettlement
    {
        #region "variables"
        #endregion

        #region "Methods"
        #endregion
    }
    [Serializable]
    public partial class CVarSC_PostingSettlement : CPKSC_PostingSettlement
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

    public partial class CSC_PostingSettlement
    {
        #region "variables"
       // (@ID nvarchar(max) ,@UserID int,@Approved bit )
        private SqlTransaction tr;
        public List<CVarSC_PostingSettlement> lstCVarSC_PostingSettlement = new List<CVarSC_PostingSettlement>();
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
            lstCVarSC_PostingSettlement.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@TransIDs", SqlDbType.NVarChar));
                    Com.Parameters.Add(new SqlParameter("@UserID", SqlDbType.Int));
                    Com.Parameters.Add(new SqlParameter("@Approved", SqlDbType.Bit));
                    Com.CommandText = "[dbo].[SC_PostingSettlement]";
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
                        //CVarSC_PostingSettlement ObjCVarSC_PostingSettlement = new CVarSC_PostingSettlement();
                        //ObjCVarSC_PostingSettlement.mErrMessage = Convert.ToString(dr["ErrMessage"].ToString());
                        //lstCVarSC_PostingSettlement.Add(ObjCVarSC_PostingSettlement);
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

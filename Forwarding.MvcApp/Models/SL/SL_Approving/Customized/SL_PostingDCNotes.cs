using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.Sales.Approving.Customized
{
    [Serializable]
    public class CPKSL_PostingDCNotes
    {
        #region "variables"
        #endregion

        #region "Methods"
        #endregion
    }
    [Serializable]
    public partial class CVarSL_PostingDCNotes : CPKSL_PostingDCNotes
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

    public partial class CSL_PostingDCNotes
    {
        #region "variables"
       // (@ID nvarchar(max) ,@UserID int,@Approved bit )
        private SqlTransaction tr;
        public List<CVarSL_PostingDCNotes> lstCVarSL_PostingDCNotes = new List<CVarSL_PostingDCNotes>();
        #endregion

        #region "Select Methods"
        public Exception GetList(string TransIDs , int UserID , bool Approved)
        {
            return DataFill(TransIDs, UserID, Approved,  true);
        }
          private Exception DataFill(string IDs, int UserID, bool Approved,  Boolean IsList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
           
            lstCVarSL_PostingDCNotes.Clear();

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
                    Com.CommandText = "[dbo].[SL_PostingDbtCrdtNotes]";
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
                        //CVarSL_PostingDCNotes ObjCVarSL_PostingDCNotes = new CVarSL_PostingDCNotes();
                        //ObjCVarSL_PostingDCNotes.mErrMessage = Convert.ToString(dr["ErrMessage"].ToString());
                        //lstCVarSL_PostingDCNotes.Add(ObjCVarSL_PostingDCNotes);
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

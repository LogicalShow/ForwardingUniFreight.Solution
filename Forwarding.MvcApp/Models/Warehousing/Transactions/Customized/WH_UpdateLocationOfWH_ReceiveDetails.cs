using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.Warehousing.Transactions.Customized
{
    [Serializable]
    public class CPKWH_UpdateLocationOfWH_ReceiveDetails
    {
        #region "variables"
        #endregion

        #region "Methods"
        #endregion
    }
    [Serializable]
    public partial class CVarWH_UpdateLocationOfWH_ReceiveDetails : CPKWH_UpdateLocationOfWH_ReceiveDetails
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

    public partial class CWH_UpdateLocationOfWH_ReceiveDetails
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
        public List<CVarWH_UpdateLocationOfWH_ReceiveDetails> lstCVarWH_UpdateLocationOfWH_ReceiveDetails = new List<CVarWH_UpdateLocationOfWH_ReceiveDetails>();
        #endregion

        #region "Select Methods"
        public Exception GetList(string ReceiveDetails, int AreaID)
        {
            return DataFill(ReceiveDetails, AreaID,  true);
        }
          private Exception DataFill(string ReceiveDetails, int AreaID, Boolean IsList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarWH_UpdateLocationOfWH_ReceiveDetails.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@ReceiveDetails", SqlDbType.NVarChar));
                    Com.Parameters.Add(new SqlParameter("@AreaID", SqlDbType.Int));



                    
                    Com.CommandText = "[dbo].[WH_UpdateLocationOfWH_ReceiveDetails]";
                    Com.Parameters[0].Value = ReceiveDetails;
                    Com.Parameters[1].Value = AreaID;

                }
                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        /*Start DataReader*/
                        CVarWH_UpdateLocationOfWH_ReceiveDetails ObjCVarWH_UpdateLocationOfWH_ReceiveDetails = new CVarWH_UpdateLocationOfWH_ReceiveDetails();
                        ObjCVarWH_UpdateLocationOfWH_ReceiveDetails.mErrMessage = Convert.ToString(dr["ErrMessage"].ToString());
                        lstCVarWH_UpdateLocationOfWH_ReceiveDetails.Add(ObjCVarWH_UpdateLocationOfWH_ReceiveDetails);
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

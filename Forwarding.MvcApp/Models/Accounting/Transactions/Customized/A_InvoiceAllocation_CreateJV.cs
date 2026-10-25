using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.OperAcc.Customized
{
    [Serializable]
    public class CPKA_InvoiceAllocation_CreateJV
    {
        #region "variables"
        #endregion

        #region "Methods"
        #endregion
    }
    [Serializable]
    public partial class CVarA_InvoiceAllocation_CreateJV : CPKA_InvoiceAllocation_CreateJV
    {
        #region "variables"
        internal long mJV_ID;
      
        #endregion

        #region "Methods"
        public long JV_ID
        {
            get { return mJV_ID; }
            set { mJV_ID = value; }
        }
      
        #endregion

        #region Functions
      
        #endregion
    }

    public partial class CA_InvoiceAllocation_CreateJV
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
        public List<CVarA_InvoiceAllocation_CreateJV> lstCVarA_InvoiceAllocation_CreateJV = new List<CVarA_InvoiceAllocation_CreateJV>();
        #endregion

        #region "Select Methods"
        public Exception GetList(string AccInvoicePaymentDetailsIDs,string ProfitAmount,string LossAmount, int UserID)
        {
            return DataFill(AccInvoicePaymentDetailsIDs, ProfitAmount, LossAmount, UserID ,  true);
        }
        
        public Exception GetListPayable(string AccInvoicePaymentDetailsIDs, int UserID)
        {
            return DataFillPayable(AccInvoicePaymentDetailsIDs, UserID, true);
        }
        private Exception DataFill(string AccInvoicePaymentDetailsIDs, string ProfitAmount, string LossAmount, int UserID ,  Boolean IsList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarA_InvoiceAllocation_CreateJV.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@IDs", SqlDbType.NVarChar));
                    Com.Parameters.Add(new SqlParameter("@ProfitAmount", SqlDbType.NVarChar));
                    Com.Parameters.Add(new SqlParameter("@LossAmount", SqlDbType.NVarChar));
                    Com.Parameters.Add(new SqlParameter("@UserID", SqlDbType.Int));

                    Com.CommandText = "[dbo].[A_InvoiceAllocation_CreateJV]";
               
                    Com.Parameters[0].Value = AccInvoicePaymentDetailsIDs;
                    Com.Parameters[1].Value = ProfitAmount;
                    Com.Parameters[2].Value = LossAmount;
                    Com.Parameters[3].Value = UserID;

                }
                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        /*Start DataReader*/
                        CVarA_InvoiceAllocation_CreateJV ObjCVarA_InvoiceAllocation_CreateJV = new CVarA_InvoiceAllocation_CreateJV();
                        ObjCVarA_InvoiceAllocation_CreateJV.mJV_ID = Convert.ToInt64(dr[0].ToString());
                        lstCVarA_InvoiceAllocation_CreateJV.Add(ObjCVarA_InvoiceAllocation_CreateJV);
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
        private Exception DataFillPayable(string AccInvoicePaymentDetailsIDs, int UserID, Boolean IsList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarA_InvoiceAllocation_CreateJV.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@IDs", SqlDbType.NVarChar));
                    Com.Parameters.Add(new SqlParameter("@UserID", SqlDbType.Int));

                    Com.CommandText = "[dbo].[A_PayableAllocation_CreateJV]";
                    Com.Parameters[0].Value = AccInvoicePaymentDetailsIDs; //UserID
                    Com.Parameters[1].Value = UserID;

                }
                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        /*Start DataReader*/
                        CVarA_InvoiceAllocation_CreateJV ObjCVarA_InvoiceAllocation_CreateJV = new CVarA_InvoiceAllocation_CreateJV();
                        ObjCVarA_InvoiceAllocation_CreateJV.mJV_ID = Convert.ToInt64(dr[0].ToString());
                        lstCVarA_InvoiceAllocation_CreateJV.Add(ObjCVarA_InvoiceAllocation_CreateJV);
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

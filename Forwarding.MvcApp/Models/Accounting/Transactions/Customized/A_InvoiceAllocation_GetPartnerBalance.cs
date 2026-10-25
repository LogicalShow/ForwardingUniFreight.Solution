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
    public class CPKA_InvoiceAllocation_GetPartnerBalance
    {
        #region "variables"
        #endregion

        #region "Methods"
        #endregion
    }
    [Serializable]
    public partial class CVarA_InvoiceAllocation_GetPartnerBalance : CPKA_InvoiceAllocation_GetPartnerBalance
    {
        #region "variables"
        internal int mCurrencyID;
        internal string mCurrencyCode;
        internal decimal mAvailableBalance;

        #endregion

        #region "Methods"
        public int CurrencyID
        {
            get { return mCurrencyID; }
            set { mCurrencyID = value; }
        }
        public string CurrencyCode
        {
            get { return mCurrencyCode; }
            set { mCurrencyCode = value; }
        }
        public decimal AvailableBalance
        {
            get { return mAvailableBalance; }
            set { mAvailableBalance = value; }
        }

        #endregion

        #region Functions

        #endregion
    }

    public partial class CA_InvoiceAllocation_GetPartnerBalance
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
        public List<CVarA_InvoiceAllocation_GetPartnerBalance> lstCVarA_InvoiceAllocation_GetPartnerBalance = new List<CVarA_InvoiceAllocation_GetPartnerBalance>();
        #endregion

        #region "Select Methods"
        public Exception GetList(int PartnerID , int PartnerTypeID , int AllocationType)
        {
            return DataFill(PartnerID, PartnerTypeID, AllocationType , true);
        }
          private Exception DataFill(int PartnerID, int PartnerTypeID, int AllocationType , Boolean IsList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarA_InvoiceAllocation_GetPartnerBalance.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@PartnerID", SqlDbType.Int));
                    Com.Parameters.Add(new SqlParameter("@PartnerTypeID", SqlDbType.Int));
                    Com.Parameters.Add(new SqlParameter("@AllocationType", SqlDbType.Int));
                    
                    if(AllocationType == 40)
                        Com.CommandText = "[dbo].[A_InvoiceAllocation_GetPartnerBalance]";
                    if (AllocationType == 80)
                        Com.CommandText = "[dbo].[A_InvoiceAllocation_GetPartnerBalance_Payable]";

                    Com.Parameters[0].Value = PartnerID; //UserID
                    Com.Parameters[1].Value = PartnerTypeID;
                    Com.Parameters[2].Value = AllocationType;

                }
                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        /*Start DataReader*/
                        CVarA_InvoiceAllocation_GetPartnerBalance ObjCVarA_InvoiceAllocation_GetPartnerBalance = new CVarA_InvoiceAllocation_GetPartnerBalance();
                        ObjCVarA_InvoiceAllocation_GetPartnerBalance.mCurrencyID = Convert.ToInt32(dr["CurrencyID"].ToString());
                        ObjCVarA_InvoiceAllocation_GetPartnerBalance.mCurrencyCode = Convert.ToString(dr["CurrencyCode"].ToString());
                        ObjCVarA_InvoiceAllocation_GetPartnerBalance.mAvailableBalance = Convert.ToDecimal(dr["AvailableBalance"].ToString());
                        lstCVarA_InvoiceAllocation_GetPartnerBalance.Add(ObjCVarA_InvoiceAllocation_GetPartnerBalance);
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

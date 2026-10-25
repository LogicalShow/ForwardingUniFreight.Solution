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
    public class CPKSC_GetAveragePrice
    {
        #region "variables"
        #endregion

        #region "Methods"
        #endregion
    }
    [Serializable]
    public partial class CVarSC_GetAveragePrice : CPKSC_GetAveragePrice
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Decimal mAveragePrice;

        #endregion

        #region "Methods"
        public Decimal AveragePrice
        {
            get { return mAveragePrice; }
            set { mAveragePrice = value; }
        }

        #endregion

        #region Functions

        #endregion
    }

    public partial class CSC_GetAveragePrice
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
        public List<CVarSC_GetAveragePrice> lstCVarSC_GetAveragePrice = new List<CVarSC_GetAveragePrice>();
        #endregion

        #region "Select Methods"
        public Exception GetList(long ItemID , int StoreID  ,DateTime Date , int TransactionID )
        {
            return DataFill(ItemID, StoreID, Date , TransactionID , true);
        }



        //(@ItemID bigint, @StoreID int , @Date as DATETIME , @TransactionID AS int)
        private Exception DataFill(long ItemID, int StoreID, DateTime Date, int TransactionID , Boolean IsList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarSC_GetAveragePrice.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@ItemID", SqlDbType.BigInt));
                    Com.Parameters.Add(new SqlParameter("@StoreID", SqlDbType.Int));
                    Com.Parameters.Add(new SqlParameter("@Date", SqlDbType.DateTime));
                    Com.Parameters.Add(new SqlParameter("@TransactionID", SqlDbType.Int));
                    // (@ItemID bigint, @StoreID int , @Date as DATETIME , @TransactionID AS int)
                    Com.CommandText = "[dbo].[SC_GetAveragePrice]";
                    Com.Parameters[0].Value = ItemID;
                    Com.Parameters[1].Value = StoreID;
                    Com.Parameters[2].Value = Date;
                    Com.Parameters[3].Value = TransactionID;

                }
                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        /*Start DataReader*/
                        CVarSC_GetAveragePrice ObjCVarSC_GetAveragePrice = new CVarSC_GetAveragePrice();
                        ObjCVarSC_GetAveragePrice.mAveragePrice = Convert.ToDecimal(dr["AveragePrice"].ToString());
                        lstCVarSC_GetAveragePrice.Add(ObjCVarSC_GetAveragePrice);
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

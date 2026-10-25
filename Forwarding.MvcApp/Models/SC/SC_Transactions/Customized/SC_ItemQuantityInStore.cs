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
    public class CPKSC_ItemQuantityInStore
    {
        #region "variables"
        #endregion

        #region "Methods"
        #endregion
    }
    [Serializable]
    public partial class CVarSC_ItemQuantityInStore : CPKSC_ItemQuantityInStore
    {
        #region "variables"
        internal decimal mItemQuantityInStore;
      
        #endregion

        #region "Methods"
        public decimal ItemQuantityInStore
        {
            get { return mItemQuantityInStore; }
            set { mItemQuantityInStore = value; }
        }
      
        #endregion

        #region Functions
      
        #endregion
    }

    public partial class CSC_ItemQuantityInStore
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
        public List<CVarSC_ItemQuantityInStore> lstCVarSC_ItemQuantityInStore = new List<CVarSC_ItemQuantityInStore>();
        #endregion

        #region "Select Methods"
        public Exception GetList(long ItemID , int StoreID , DateTime TransactionDate , int TransactionID)
        {
            return DataFill(ItemID, StoreID, TransactionDate , TransactionID ,  true);
        }
          private Exception DataFill(long ItemID, int StoreID , DateTime TransactionDate , int TransactionID ,  Boolean IsList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarSC_ItemQuantityInStore.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    //@FromDate DATETIME, @ToDate DATETIME , @WhereClause NVarChar(MAX)
                    Com.Parameters.Add(new SqlParameter("@ItemID", SqlDbType.BigInt));
                    Com.Parameters.Add(new SqlParameter("@StoreID", SqlDbType.Int));
                    Com.Parameters.Add(new SqlParameter("@Date", SqlDbType.DateTime));
                    Com.Parameters.Add(new SqlParameter("@TransactionID", SqlDbType.Int));
                    Com.CommandText = "[dbo].[SC_ItemQuantityInStore]";
                    Com.Parameters[0].Value = ItemID;
                    Com.Parameters[1].Value = StoreID;
                    Com.Parameters[2].Value = TransactionDate;
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
                        CVarSC_ItemQuantityInStore ObjCVarSC_ItemQuantityInStore = new CVarSC_ItemQuantityInStore();
                        ObjCVarSC_ItemQuantityInStore.mItemQuantityInStore = Convert.ToDecimal(dr["ItemQuantityInStore"].ToString());
                        lstCVarSC_ItemQuantityInStore.Add(ObjCVarSC_ItemQuantityInStore);
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

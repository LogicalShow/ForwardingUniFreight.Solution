using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.ReceiptsAndPayments.ShipLink.Customized
{
    [Serializable]
    public class CPKvwStructure_ShippingLink_GetClientsTotalsBy_InvIDs
    {
        #region "variables"
        #endregion

        #region "Methods"
        #endregion
    }
    [Serializable]
    public partial class CVarvwStructure_ShippingLink_GetClientsTotalsBy_InvIDs : CPKvwStructure_ShippingLink_GetClientsTotalsBy_InvIDs
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Decimal mTotalAmount;
        internal Int32 mERP_AccountID;
        internal Int32 mERP_SubAccountID;
        internal Int32 mERP_CurrencyID;
        #endregion

        #region "Methods"
        public Decimal TotalAmount
        {
            get { return mTotalAmount; }
            set { mTotalAmount = value; }
        }
        public Int32 ERP_AccountID
        {
            get { return mERP_AccountID; }
            set { mERP_AccountID = value; }
        }
        public Int32 ERP_SubAccountID
        {
            get { return mERP_SubAccountID; }
            set { mERP_SubAccountID = value; }
        }
        public Int32 ERP_CurrencyID
        {
            get { return mERP_CurrencyID; }
            set { mERP_CurrencyID = value; }
        }
        #endregion

        #region Functions
        public Boolean GetIsChange()
        {
            return mIsChanges;
        }
        public void SetIsChange(Boolean IsChange)
        {
            mIsChanges = IsChange;
        }
        #endregion
    }

    public partial class CvwStructure_ShippingLink_GetClientsTotalsBy_InvIDs
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
        public List<CVarvwStructure_ShippingLink_GetClientsTotalsBy_InvIDs> lstCVarvwStructure_ShippingLink_GetClientsTotalsBy_InvIDs = new List<CVarvwStructure_ShippingLink_GetClientsTotalsBy_InvIDs>();
        #endregion

        #region "Select Methods"
        public Exception GetList(string InvIDs)
        {
            return DataFill(InvIDs, true);
        }
        private Exception DataFill(string Param, Boolean IsList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarvwStructure_ShippingLink_GetClientsTotalsBy_InvIDs.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                Com.CommandTimeout = 200;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@InvIDs", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].ShippingLink_GetClientsTotalsBy_InvIDs";
                    Com.Parameters[0].Value = Param;
                }
                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        /*Start DataReader*/
                        CVarvwStructure_ShippingLink_GetClientsTotalsBy_InvIDs ObjCVarvwStructure_ShippingLink_GetClientsTotalsBy_InvIDs = new CVarvwStructure_ShippingLink_GetClientsTotalsBy_InvIDs();
                        ObjCVarvwStructure_ShippingLink_GetClientsTotalsBy_InvIDs.mTotalAmount = dr["TotalAmount"].ToString() == "" ? 0 : Convert.ToDecimal(dr["TotalAmount"].ToString());
                        ObjCVarvwStructure_ShippingLink_GetClientsTotalsBy_InvIDs.mERP_AccountID = dr["ERP_AccountID"].ToString() == "" ? 0 : Convert.ToInt32(dr["ERP_AccountID"].ToString());
                        ObjCVarvwStructure_ShippingLink_GetClientsTotalsBy_InvIDs.mERP_SubAccountID = dr["ERP_SubAccountID"].ToString() == "" ? 0 : Convert.ToInt32(dr["ERP_SubAccountID"].ToString());
                        ObjCVarvwStructure_ShippingLink_GetClientsTotalsBy_InvIDs.mERP_CurrencyID = dr["ERP_CurrencyID"].ToString() == "" ? 0 : Convert.ToInt32(dr["ERP_CurrencyID"].ToString());
                        lstCVarvwStructure_ShippingLink_GetClientsTotalsBy_InvIDs.Add(ObjCVarvwStructure_ShippingLink_GetClientsTotalsBy_InvIDs);
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

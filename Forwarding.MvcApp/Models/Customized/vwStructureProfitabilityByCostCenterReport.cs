using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.Customized
{
    [Serializable]
    public partial class CVarvwStructureProfitabilityByCostCenterReport
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mID;
        internal String mName;
        internal Decimal mReceivableEGP;
        internal Decimal mReceivableUSD;
        internal Decimal mReceivableEUR;
        internal Decimal mReceivableInDefaultCurrency;
        internal Decimal mPayableEGP;
        internal Decimal mPayableUSD;
        internal Decimal mPayableEUR;
        internal Decimal mPayableInDefaultCurrency;
        #endregion

        #region "Methods"
        public Int32 ID
        {
            get { return mID; }
            set { mID = value; }
        }
        public String Name
        {
            get { return mName; }
            set { mName = value; }
        }
        public Decimal ReceivableEGP
        {
            get { return mReceivableEGP; }
            set { mReceivableEGP = value; }
        }
        public Decimal ReceivableUSD
        {
            get { return mReceivableUSD; }
            set { mReceivableUSD = value; }
        }
        public Decimal ReceivableEUR
        {
            get { return mReceivableEUR; }
            set { mReceivableEUR = value; }
        }
        public Decimal ReceivableInDefaultCurrency
        {
            get { return mReceivableInDefaultCurrency; }
            set { mReceivableInDefaultCurrency = value; }
        }
        public Decimal PayableEGP
        {
            get { return mPayableEGP; }
            set { mPayableEGP = value; }
        }
        public Decimal PayableUSD
        {
            get { return mPayableUSD; }
            set { mPayableUSD = value; }
        }
        public Decimal PayableEUR
        {
            get { return mPayableEUR; }
            set { mPayableEUR = value; }
        }
        public Decimal PayableInDefaultCurrency
        {
            get { return mPayableInDefaultCurrency; }
            set { mPayableInDefaultCurrency = value; }
        }
        #endregion
    }

    public partial class CvwStructureProfitabilityByCostCenterReport
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
        public List<CVarvwStructureProfitabilityByCostCenterReport> lstCVarvwStructureProfitabilityByCostCenterReport = new List<CVarvwStructureProfitabilityByCostCenterReport>();
        #endregion

        #region "Select Methods"
        public Exception GetList(Int32 pBranchID, Int32 pChargeTypeID, DateTime pFromDate, DateTime pToDate,string pCostCenterIDs)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarvwStructureProfitabilityByCostCenterReport.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                //if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@FromDate", SqlDbType.DateTime));
                    Com.Parameters.Add(new SqlParameter("@ToDate", SqlDbType.DateTime));
                    Com.Parameters.Add(new SqlParameter("@BranchID", SqlDbType.Int));
                    Com.Parameters.Add(new SqlParameter("@ChargeTypeID", SqlDbType.Int));
                    Com.Parameters.Add(new SqlParameter("@CostCenterIDs", SqlDbType.NVarChar));

                    Com.CommandText = "[dbo].Rep_ProfitabilityReportByCostCenter";
                    Com.Parameters[0].Value = pFromDate;
                    Com.Parameters[1].Value = pToDate;
                    Com.Parameters[2].Value = pBranchID;
                    Com.Parameters[3].Value = pChargeTypeID;
                    Com.Parameters[4].Value = pCostCenterIDs;


                }
                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        /*Start DataReader*/
                        CVarvwStructureProfitabilityByCostCenterReport ObjCVarvwStructureProfitabilityByCostCenterReport = new CVarvwStructureProfitabilityByCostCenterReport();
                        ObjCVarvwStructureProfitabilityByCostCenterReport.mID = dr["ID"].ToString() == "" ? 0 : Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwStructureProfitabilityByCostCenterReport.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarvwStructureProfitabilityByCostCenterReport.mReceivableEGP = dr["ReceivableEGP"].ToString() == "" ? 0 : Convert.ToDecimal(dr["ReceivableEGP"].ToString());
                        ObjCVarvwStructureProfitabilityByCostCenterReport.mReceivableUSD = dr["ReceivableUSD"].ToString() == "" ? 0 : Convert.ToDecimal(dr["ReceivableUSD"].ToString());
                        ObjCVarvwStructureProfitabilityByCostCenterReport.mReceivableEUR = dr["ReceivableEUR"].ToString() == "" ? 0 : Convert.ToDecimal(dr["ReceivableEUR"].ToString());
                        ObjCVarvwStructureProfitabilityByCostCenterReport.mReceivableInDefaultCurrency = dr["ReceivableInDefaultCurrency"].ToString() == "" ? 0 : Convert.ToDecimal(dr["ReceivableInDefaultCurrency"].ToString());
                        ObjCVarvwStructureProfitabilityByCostCenterReport.mPayableEGP = dr["PayableEGP"].ToString() == "" ? 0 : Convert.ToDecimal(dr["PayableEGP"].ToString());
                        ObjCVarvwStructureProfitabilityByCostCenterReport.mPayableUSD = dr["PayableUSD"].ToString() == "" ? 0 : Convert.ToDecimal(dr["PayableUSD"].ToString());
                        ObjCVarvwStructureProfitabilityByCostCenterReport.mPayableEUR = dr["PayableEUR"].ToString() == "" ? 0 : Convert.ToDecimal(dr["PayableEUR"].ToString());
                        ObjCVarvwStructureProfitabilityByCostCenterReport.mPayableInDefaultCurrency = dr["PayableInDefaultCurrency"].ToString() == "" ? 0 : Convert.ToDecimal(dr["PayableInDefaultCurrency"].ToString());
                        lstCVarvwStructureProfitabilityByCostCenterReport.Add(ObjCVarvwStructureProfitabilityByCostCenterReport);
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

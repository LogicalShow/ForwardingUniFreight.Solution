using System;
using System.Data;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.DashboardGroup.Customized
{
    [Serializable]
    public class CPKProfitabilitySummaryByServiceType
    {
        #region "variables"
        #endregion

        #region "Methods"
        #endregion
    }
    [Serializable]
    public partial class CVarProfitabilitySummaryByServiceType : CPKProfitabilitySummaryByServiceType
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal String mMoveTypeName;
        internal Decimal mPayablesWithoutVAT;
        internal Decimal mReceivablesWithoutVAT;
        #endregion

        #region "Methods"
        public String MoveTypeName
        {
            get { return mMoveTypeName; }
            set { mMoveTypeName = value; }
        }
        public Decimal PayablesWithoutVAT
        {
            get { return mPayablesWithoutVAT; }
            set { mPayablesWithoutVAT = value; }
        }
        public Decimal ReceivablesWithoutVAT
        {
            get { return mReceivablesWithoutVAT; }
            set { mReceivablesWithoutVAT = value; }
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

    public partial class CProfitabilitySummaryByServiceType
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
        public List<CVarProfitabilitySummaryByServiceType> lstCVarProfitabilitySummaryByServiceType = new List<CVarProfitabilitySummaryByServiceType>();
        #endregion

        #region "Select Methods"
        public Exception GetList(DateTime pFromDate,DateTime pToDate)
        {
            return DataFill(pFromDate, pToDate, true);
        }
        private Exception DataFill(DateTime pFromDate, DateTime pToDate, Boolean IsList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarProfitabilitySummaryByServiceType.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@FromDate", SqlDbType.DateTime));
                    Com.Parameters.Add(new SqlParameter("@ToDate", SqlDbType.DateTime));
                    Com.CommandText = "[dbo].ProfitabilitySummaryByServiceType";
                    Com.Parameters[0].Value = pFromDate;
                    Com.Parameters[1].Value = pToDate;
                }
                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        /*Start DataReader*/
                        CVarProfitabilitySummaryByServiceType ObjCVarProfitabilitySummaryByServiceType = new CVarProfitabilitySummaryByServiceType();
                        ObjCVarProfitabilitySummaryByServiceType.mMoveTypeName = dr["MoveTypeName"].ToString();
                        ObjCVarProfitabilitySummaryByServiceType.mPayablesWithoutVAT = Convert.ToDecimal(dr["PayablesWithoutVAT"]);
                        ObjCVarProfitabilitySummaryByServiceType.mReceivablesWithoutVAT = Convert.ToDecimal(dr["ReceivablesWithoutVAT"].ToString());
                        lstCVarProfitabilitySummaryByServiceType.Add(ObjCVarProfitabilitySummaryByServiceType);
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
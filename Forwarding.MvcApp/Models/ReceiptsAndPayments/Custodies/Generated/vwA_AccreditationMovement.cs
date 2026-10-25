using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;
using Forwarding.MvcApp.Models.Sales.Transactions.Generated.Payments.Generated;

namespace Forwarding.MvcApp.Models.ReceiptsAndPayments.Transactions.Generated
{
    [Serializable]
    public partial class CVarvwA_AccreditationMovement
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mid;
        internal String mRequestCreator;
        internal String mTechnicalDirector;
        internal String mCovenantAccountant;
        internal String mSecretaryTreasury;
        internal String mTreasuryReferences;
        internal Int64 mPaymentRequestID;
        #endregion

        #region "Methods"
        public Int32 id
        {
            get { return mid; }
            set { mid = value; }
        }
        public String RequestCreator
        {
            get { return mRequestCreator; }
            set { mRequestCreator = value; }
        }
        public String TechnicalDirector
        {
            get { return mTechnicalDirector; }
            set { mTechnicalDirector = value; }
        }
        public String CovenantAccountant
        {
            get { return mCovenantAccountant; }
            set { mCovenantAccountant = value; }
        }
        public String SecretaryTreasury
        {
            get { return mSecretaryTreasury; }
            set { mSecretaryTreasury = value; }
        }
        public String TreasuryReferences
        {
            get { return mTreasuryReferences; }
            set { mTreasuryReferences = value; }
        }
        public Int64 PaymentRequestID
        {
            get { return mPaymentRequestID; }
            set { mPaymentRequestID = value; }
        }
        #endregion
    }

    public partial class CvwA_AccreditationMovement
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
        public List<CVarvwA_AccreditationMovement> lstCVarvwA_AccreditationMovement = new List<CVarvwA_AccreditationMovement>();
        #endregion

        #region "Select Methods"
        public Exception GetList(string WhereClause)
        {
            return DataFill(WhereClause, true);
        }
        public Exception GetListPaging(Int32 PageSize, Int32 PageNumber, string WhereClause, string OrderBy, out Int32 TotalRecords)
        {
            return DataFill(PageSize, PageNumber, WhereClause, OrderBy, out TotalRecords);
        }
        private Exception DataFill(string Param, Boolean IsList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarvwA_AccreditationMovement.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwA_AccreditationMovement";
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
                        CVarvwA_AccreditationMovement ObjCVarvwA_AccreditationMovement = new CVarvwA_AccreditationMovement();
                        ObjCVarvwA_AccreditationMovement.mid = Convert.ToInt32(dr["id"].ToString());
                        ObjCVarvwA_AccreditationMovement.mRequestCreator = Convert.ToString(dr["RequestCreator"].ToString());
                        ObjCVarvwA_AccreditationMovement.mTechnicalDirector = Convert.ToString(dr["TechnicalDirector"].ToString());
                        ObjCVarvwA_AccreditationMovement.mCovenantAccountant = Convert.ToString(dr["CovenantAccountant"].ToString());
                        ObjCVarvwA_AccreditationMovement.mSecretaryTreasury = Convert.ToString(dr["SecretaryTreasury"].ToString());
                        ObjCVarvwA_AccreditationMovement.mTreasuryReferences = Convert.ToString(dr["TreasuryReferences"].ToString());
                        ObjCVarvwA_AccreditationMovement.mPaymentRequestID = Convert.ToInt64(dr["PaymentRequestID"].ToString());
                        lstCVarvwA_AccreditationMovement.Add(ObjCVarvwA_AccreditationMovement);
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

        private Exception DataFill(Int32 PageSize, Int32 PageNumber, string WhereClause, string OrderBy, out Int32 TotRecs)
        {
            Exception Exp = null;
            TotRecs = 0;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarvwA_AccreditationMovement.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                Com.Parameters.Add(new SqlParameter("@PageSize", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@PageNumber", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@OrderBy", SqlDbType.VarChar));
                Com.CommandText = "[dbo].GetListPagingvwA_AccreditationMovement";
                Com.Parameters[0].Value = PageSize;
                Com.Parameters[1].Value = PageNumber;
                Com.Parameters[2].Value = WhereClause;
                Com.Parameters[3].Value = OrderBy;
                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        /*Start DataReader*/
                        CVarvwA_AccreditationMovement ObjCVarvwA_AccreditationMovement = new CVarvwA_AccreditationMovement();
                        ObjCVarvwA_AccreditationMovement.mid = Convert.ToInt32(dr["id"].ToString());
                        ObjCVarvwA_AccreditationMovement.mRequestCreator = Convert.ToString(dr["RequestCreator"].ToString());
                        ObjCVarvwA_AccreditationMovement.mTechnicalDirector = Convert.ToString(dr["TechnicalDirector"].ToString());
                        ObjCVarvwA_AccreditationMovement.mCovenantAccountant = Convert.ToString(dr["CovenantAccountant"].ToString());
                        ObjCVarvwA_AccreditationMovement.mSecretaryTreasury = Convert.ToString(dr["SecretaryTreasury"].ToString());
                        ObjCVarvwA_AccreditationMovement.mTreasuryReferences = Convert.ToString(dr["TreasuryReferences"].ToString());
                        ObjCVarvwA_AccreditationMovement.mPaymentRequestID = Convert.ToInt64(dr["PaymentRequestID"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwA_AccreditationMovement.Add(ObjCVarvwA_AccreditationMovement);
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

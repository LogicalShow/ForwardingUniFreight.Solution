using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.SL.SL_MasterData.Generated
{
    [Serializable]
    public class CPKvwSL_LinkPriceListWithPaymentMethod
    {
        #region "variables"
        private Int32 mID;
        #endregion

        #region "Methods"
        public Int32 ID
        {
            get { return mID; }
            set { mID = value; }
        }
        #endregion
    }
    [Serializable]
    public partial class CVarvwSL_LinkPriceListWithPaymentMethod : CPKvwSL_LinkPriceListWithPaymentMethod
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mPriceListID;
        internal Int32 mPaymentTermsID;
        internal String mPriceListName;
        internal String mPaymentTerm;
        internal Decimal mPercentage;
        #endregion

        #region "Methods"
        public Int32 PriceListID
        {
            get { return mPriceListID; }
            set { mPriceListID = value; }
        }
        public Int32 PaymentTermsID
        {
            get { return mPaymentTermsID; }
            set { mPaymentTermsID = value; }
        }
        public String PriceListName
        {
            get { return mPriceListName; }
            set { mPriceListName = value; }
        }
        public String PaymentTerm
        {
            get { return mPaymentTerm; }
            set { mPaymentTerm = value; }
        }
        public Decimal Percentage
        {
            get { return mPercentage; }
            set { mPercentage = value; }
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

    public partial class CvwSL_LinkPriceListWithPaymentMethod
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
        public List<CVarvwSL_LinkPriceListWithPaymentMethod> lstCVarvwSL_LinkPriceListWithPaymentMethod = new List<CVarvwSL_LinkPriceListWithPaymentMethod>();
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
            lstCVarvwSL_LinkPriceListWithPaymentMethod.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwSL_LinkPriceListWithPaymentMethod";
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
                        CVarvwSL_LinkPriceListWithPaymentMethod ObjCVarvwSL_LinkPriceListWithPaymentMethod = new CVarvwSL_LinkPriceListWithPaymentMethod();
                        ObjCVarvwSL_LinkPriceListWithPaymentMethod.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwSL_LinkPriceListWithPaymentMethod.mPriceListID = Convert.ToInt32(dr["PriceListID"].ToString());
                        ObjCVarvwSL_LinkPriceListWithPaymentMethod.mPaymentTermsID = Convert.ToInt32(dr["PaymentTermsID"].ToString());
                        ObjCVarvwSL_LinkPriceListWithPaymentMethod.mPriceListName = Convert.ToString(dr["PriceListName"].ToString());
                        ObjCVarvwSL_LinkPriceListWithPaymentMethod.mPaymentTerm = Convert.ToString(dr["PaymentTerm"].ToString());
                        ObjCVarvwSL_LinkPriceListWithPaymentMethod.mPercentage = Convert.ToDecimal(dr["Percentage"].ToString());
                        lstCVarvwSL_LinkPriceListWithPaymentMethod.Add(ObjCVarvwSL_LinkPriceListWithPaymentMethod);
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
            lstCVarvwSL_LinkPriceListWithPaymentMethod.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwSL_LinkPriceListWithPaymentMethod";
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
                        CVarvwSL_LinkPriceListWithPaymentMethod ObjCVarvwSL_LinkPriceListWithPaymentMethod = new CVarvwSL_LinkPriceListWithPaymentMethod();
                        ObjCVarvwSL_LinkPriceListWithPaymentMethod.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwSL_LinkPriceListWithPaymentMethod.mPriceListID = Convert.ToInt32(dr["PriceListID"].ToString());
                        ObjCVarvwSL_LinkPriceListWithPaymentMethod.mPaymentTermsID = Convert.ToInt32(dr["PaymentTermsID"].ToString());
                        ObjCVarvwSL_LinkPriceListWithPaymentMethod.mPriceListName = Convert.ToString(dr["PriceListName"].ToString());
                        ObjCVarvwSL_LinkPriceListWithPaymentMethod.mPaymentTerm = Convert.ToString(dr["PaymentTerm"].ToString());
                        ObjCVarvwSL_LinkPriceListWithPaymentMethod.mPercentage = Convert.ToDecimal(dr["Percentage"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwSL_LinkPriceListWithPaymentMethod.Add(ObjCVarvwSL_LinkPriceListWithPaymentMethod);
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

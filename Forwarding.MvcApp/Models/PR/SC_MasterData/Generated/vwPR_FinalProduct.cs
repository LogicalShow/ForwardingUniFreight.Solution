using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.PR.MasterData.Generated
{
    [Serializable]
    public class CPKvwPR_FinalProduct
    {
        #region "variables"
        private Int64 mID;
        #endregion

        #region "Methods"
        public Int64 ID
        {
            get { return mID; }
            set { mID = value; }
        }
        #endregion
    }
    [Serializable]
    public partial class CVarvwPR_FinalProduct : CPKvwPR_FinalProduct
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int64 mProductID;
        internal Int32 mFromStoreID;
        internal Int32 mToStoreID;
        internal String mNotes;
        internal Boolean mIsDeleted;
        internal String mProductName;
        internal String mFromStoreName;
        internal String mToStoreName;
        internal Int32 mUnitID;
        internal String mUnitName;
        internal Decimal mDensity;
        #endregion

        #region "Methods"
        public Int64 ProductID
        {
            get { return mProductID; }
            set { mProductID = value; }
        }
        public Int32 FromStoreID
        {
            get { return mFromStoreID; }
            set { mFromStoreID = value; }
        }
        public Int32 ToStoreID
        {
            get { return mToStoreID; }
            set { mToStoreID = value; }
        }
        public String Notes
        {
            get { return mNotes; }
            set { mNotes = value; }
        }
        public Boolean IsDeleted
        {
            get { return mIsDeleted; }
            set { mIsDeleted = value; }
        }
        public String ProductName
        {
            get { return mProductName; }
            set { mProductName = value; }
        }
        public String FromStoreName
        {
            get { return mFromStoreName; }
            set { mFromStoreName = value; }
        }
        public String ToStoreName
        {
            get { return mToStoreName; }
            set { mToStoreName = value; }
        }
        public Int32 UnitID
        {
            get { return mUnitID; }
            set { mUnitID = value; }
        }
        public String UnitName
        {
            get { return mUnitName; }
            set { mUnitName = value; }
        }
        public Decimal Density
        {
            get { return mDensity; }
            set { mDensity = value; }
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

    public partial class CvwPR_FinalProduct
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
        public List<CVarvwPR_FinalProduct> lstCVarvwPR_FinalProduct = new List<CVarvwPR_FinalProduct>();
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
            lstCVarvwPR_FinalProduct.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwPR_FinalProduct";
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
                        CVarvwPR_FinalProduct ObjCVarvwPR_FinalProduct = new CVarvwPR_FinalProduct();
                        ObjCVarvwPR_FinalProduct.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwPR_FinalProduct.mProductID = Convert.ToInt64(dr["ProductID"].ToString());
                        ObjCVarvwPR_FinalProduct.mFromStoreID = Convert.ToInt32(dr["FromStoreID"].ToString());
                        ObjCVarvwPR_FinalProduct.mToStoreID = Convert.ToInt32(dr["ToStoreID"].ToString());
                        ObjCVarvwPR_FinalProduct.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvwPR_FinalProduct.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarvwPR_FinalProduct.mProductName = Convert.ToString(dr["ProductName"].ToString());
                        ObjCVarvwPR_FinalProduct.mFromStoreName = Convert.ToString(dr["FromStoreName"].ToString());
                        ObjCVarvwPR_FinalProduct.mToStoreName = Convert.ToString(dr["ToStoreName"].ToString());
                        ObjCVarvwPR_FinalProduct.mUnitID = Convert.ToInt32(dr["UnitID"].ToString());
                        ObjCVarvwPR_FinalProduct.mUnitName = Convert.ToString(dr["UnitName"].ToString());
                        ObjCVarvwPR_FinalProduct.mDensity = Convert.ToDecimal(dr["Density"].ToString());
                        lstCVarvwPR_FinalProduct.Add(ObjCVarvwPR_FinalProduct);
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
            lstCVarvwPR_FinalProduct.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwPR_FinalProduct";
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
                        CVarvwPR_FinalProduct ObjCVarvwPR_FinalProduct = new CVarvwPR_FinalProduct();
                        ObjCVarvwPR_FinalProduct.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwPR_FinalProduct.mProductID = Convert.ToInt64(dr["ProductID"].ToString());
                        ObjCVarvwPR_FinalProduct.mFromStoreID = Convert.ToInt32(dr["FromStoreID"].ToString());
                        ObjCVarvwPR_FinalProduct.mToStoreID = Convert.ToInt32(dr["ToStoreID"].ToString());
                        ObjCVarvwPR_FinalProduct.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvwPR_FinalProduct.mIsDeleted = Convert.ToBoolean(dr["IsDeleted"].ToString());
                        ObjCVarvwPR_FinalProduct.mProductName = Convert.ToString(dr["ProductName"].ToString());
                        ObjCVarvwPR_FinalProduct.mFromStoreName = Convert.ToString(dr["FromStoreName"].ToString());
                        ObjCVarvwPR_FinalProduct.mToStoreName = Convert.ToString(dr["ToStoreName"].ToString());
                        ObjCVarvwPR_FinalProduct.mUnitID = Convert.ToInt32(dr["UnitID"].ToString());
                        ObjCVarvwPR_FinalProduct.mUnitName = Convert.ToString(dr["UnitName"].ToString());
                        ObjCVarvwPR_FinalProduct.mDensity = Convert.ToDecimal(dr["Density"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwPR_FinalProduct.Add(ObjCVarvwPR_FinalProduct);
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

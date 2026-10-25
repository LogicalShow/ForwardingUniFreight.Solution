using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.ReceiptsAndPayments.YardLink.Customized
{
    [Serializable]
    public class CPKvwStructure_SP_SL_Validate_ShippingLink_ERP_InvoicesBy_IDs
    {
        #region "variables"
        private String mID;
        #endregion

        #region "Methods"
        public String ID
        {
            get { return mID; }
            set { mID = value; }
        }
        #endregion
    }
    [Serializable]
    public partial class CVarvwStructure_SP_SL_Validate_ShippingLink_ERP_InvoicesBy_IDs : CPKvwStructure_SP_SL_Validate_ShippingLink_ERP_InvoicesBy_IDs
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal String mItemName;
        internal String mItemTypeEn;
        internal String mItemTypeAr;
        #endregion

        #region "Methods"
        public String ItemName
        {
            get { return mItemName; }
            set { mItemName = value; }
        }
        public String ItemTypeEn
        {
            get { return mItemTypeEn; }
            set { mItemTypeEn = value; }
        }
        public String ItemTypeAr
        {
            get { return mItemTypeAr; }
            set { mItemTypeAr = value; }
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

    public partial class CvwStructure_SP_SL_Validate_ShippingLink_ERP_InvoicesBy_IDs
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
        public List<CVarvwStructure_SP_SL_Validate_ShippingLink_ERP_InvoicesBy_IDs> lstCVarvwStructure_SP_SL_Validate_ShippingLink_ERP_InvoicesBy_IDs = new List<CVarvwStructure_SP_SL_Validate_ShippingLink_ERP_InvoicesBy_IDs>();
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
            lstCVarvwStructure_SP_SL_Validate_ShippingLink_ERP_InvoicesBy_IDs.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandTimeout = 200;
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@InvIDs", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].SP_SL_Validate_YardLink_ERP_InvoicesBy_IDs";
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
                        CVarvwStructure_SP_SL_Validate_ShippingLink_ERP_InvoicesBy_IDs ObjCVarvwStructure_SP_SL_Validate_ShippingLink_ERP_InvoicesBy_IDs = new CVarvwStructure_SP_SL_Validate_ShippingLink_ERP_InvoicesBy_IDs();
                        ObjCVarvwStructure_SP_SL_Validate_ShippingLink_ERP_InvoicesBy_IDs.ID = Convert.ToString(dr["ID"].ToString());
                        ObjCVarvwStructure_SP_SL_Validate_ShippingLink_ERP_InvoicesBy_IDs.mItemName = Convert.ToString(dr["ItemName"].ToString());
                        ObjCVarvwStructure_SP_SL_Validate_ShippingLink_ERP_InvoicesBy_IDs.mItemTypeEn = Convert.ToString(dr["ItemTypeEn"].ToString());
                        ObjCVarvwStructure_SP_SL_Validate_ShippingLink_ERP_InvoicesBy_IDs.mItemTypeAr = Convert.ToString(dr["ItemTypeAr"].ToString());
                        lstCVarvwStructure_SP_SL_Validate_ShippingLink_ERP_InvoicesBy_IDs.Add(ObjCVarvwStructure_SP_SL_Validate_ShippingLink_ERP_InvoicesBy_IDs);
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


        public Exception GetListPosting(Int32 InvIDs,Int32 UserID, Int32 post)
        {
            return DataFillPosting(InvIDs,  UserID,  post, true);
        }
        private Exception DataFillPosting(Int32 Param, Int32 UserID, Int32 post, Boolean IsList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarvwStructure_SP_SL_Validate_ShippingLink_ERP_InvoicesBy_IDs.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandTimeout = 200;
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int));
                    Com.Parameters.Add(new SqlParameter("@UserID", SqlDbType.Int));
                    Com.Parameters.Add(new SqlParameter("@post", SqlDbType.Int));


                    Com.CommandText = "[dbo].ERP_A_PostingInvoiceHeaderYard";
                    Com.Parameters[0].Value = Param;
                    Com.Parameters[1].Value = UserID;
                    Com.Parameters[2].Value = post;

                }
                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        ///*Start DataReader*/
                        //CVarvwStructure_SP_SL_Validate_ShippingLink_ERP_InvoicesBy_IDs ObjCVarvwStructure_SP_SL_Validate_ShippingLink_ERP_InvoicesBy_IDs = new CVarvwStructure_SP_SL_Validate_ShippingLink_ERP_InvoicesBy_IDs();
                        //ObjCVarvwStructure_SP_SL_Validate_ShippingLink_ERP_InvoicesBy_IDs.ID = Convert.ToString(dr["ID"].ToString());
                        //ObjCVarvwStructure_SP_SL_Validate_ShippingLink_ERP_InvoicesBy_IDs.mItemName = Convert.ToString(dr["ItemName"].ToString());
                        //ObjCVarvwStructure_SP_SL_Validate_ShippingLink_ERP_InvoicesBy_IDs.mItemTypeEn = Convert.ToString(dr["ItemTypeEn"].ToString());
                        //ObjCVarvwStructure_SP_SL_Validate_ShippingLink_ERP_InvoicesBy_IDs.mItemTypeAr = Convert.ToString(dr["ItemTypeAr"].ToString());
                        //lstCVarvwStructure_SP_SL_Validate_ShippingLink_ERP_InvoicesBy_IDs.Add(ObjCVarvwStructure_SP_SL_Validate_ShippingLink_ERP_InvoicesBy_IDs);
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

    public partial class CvwPosting_InvoicesBy_IDs
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
        public List<CVarvwStructure_SP_SL_Validate_ShippingLink_ERP_InvoicesBy_IDs> lstCVarvwStructure_SP_SL_Validate_ShippingLink_ERP_InvoicesBy_IDs = new List<CVarvwStructure_SP_SL_Validate_ShippingLink_ERP_InvoicesBy_IDs>();
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
            lstCVarvwStructure_SP_SL_Validate_ShippingLink_ERP_InvoicesBy_IDs.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandTimeout = 200;
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@InvIDs", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].SP_SL_Validate_ShippingLink_ERP_InvoicesBy_IDs";
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
                        CVarvwStructure_SP_SL_Validate_ShippingLink_ERP_InvoicesBy_IDs ObjCVarvwStructure_SP_SL_Validate_ShippingLink_ERP_InvoicesBy_IDs = new CVarvwStructure_SP_SL_Validate_ShippingLink_ERP_InvoicesBy_IDs();
                        ObjCVarvwStructure_SP_SL_Validate_ShippingLink_ERP_InvoicesBy_IDs.ID = Convert.ToString(dr["ID"].ToString());
                        ObjCVarvwStructure_SP_SL_Validate_ShippingLink_ERP_InvoicesBy_IDs.mItemName = Convert.ToString(dr["ItemName"].ToString());
                        ObjCVarvwStructure_SP_SL_Validate_ShippingLink_ERP_InvoicesBy_IDs.mItemTypeEn = Convert.ToString(dr["ItemTypeEn"].ToString());
                        ObjCVarvwStructure_SP_SL_Validate_ShippingLink_ERP_InvoicesBy_IDs.mItemTypeAr = Convert.ToString(dr["ItemTypeAr"].ToString());
                        lstCVarvwStructure_SP_SL_Validate_ShippingLink_ERP_InvoicesBy_IDs.Add(ObjCVarvwStructure_SP_SL_Validate_ShippingLink_ERP_InvoicesBy_IDs);
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

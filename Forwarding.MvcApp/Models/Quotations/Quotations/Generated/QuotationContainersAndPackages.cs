using System;
using System.Data;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.Quotations.Quotations.Generated
{
    [Serializable]
    public class CPKQuotationContainersAndPackages
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
    public partial class CVarQuotationContainersAndPackages : CPKQuotationContainersAndPackages
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int64 mQuotationID;
        internal Int32 mContainerTypeID;
        internal Int32 mPackageTypeID;
        internal Decimal mLength;
        internal Decimal mWidth;
        internal Decimal mHeight;
        internal Decimal mVolume;
        internal Decimal mVolumetricWeight;
        internal Decimal mNetWeight;
        internal Decimal mGrossWeight;
        internal Decimal mChargeableWeight;
        internal Int32 mQuantity;
        internal Int32 mCreatorUserID;
        internal DateTime mCreationDate;
        internal Int32 mModificatorUserID;
        internal DateTime mModificationDate;
        internal Int64 mQuotationRouteID;
        #endregion

        #region "Methods"
        public Int64 QuotationID
        {
            get { return mQuotationID; }
            set { mIsChanges = true; mQuotationID = value; }
        }
        public Int32 ContainerTypeID
        {
            get { return mContainerTypeID; }
            set { mIsChanges = true; mContainerTypeID = value; }
        }
        public Int32 PackageTypeID
        {
            get { return mPackageTypeID; }
            set { mIsChanges = true; mPackageTypeID = value; }
        }
        public Decimal Length
        {
            get { return mLength; }
            set { mIsChanges = true; mLength = value; }
        }
        public Decimal Width
        {
            get { return mWidth; }
            set { mIsChanges = true; mWidth = value; }
        }
        public Decimal Height
        {
            get { return mHeight; }
            set { mIsChanges = true; mHeight = value; }
        }
        public Decimal Volume
        {
            get { return mVolume; }
            set { mIsChanges = true; mVolume = value; }
        }
        public Decimal VolumetricWeight
        {
            get { return mVolumetricWeight; }
            set { mIsChanges = true; mVolumetricWeight = value; }
        }
        public Decimal NetWeight
        {
            get { return mNetWeight; }
            set { mIsChanges = true; mNetWeight = value; }
        }
        public Decimal GrossWeight
        {
            get { return mGrossWeight; }
            set { mIsChanges = true; mGrossWeight = value; }
        }
        public Decimal ChargeableWeight
        {
            get { return mChargeableWeight; }
            set { mIsChanges = true; mChargeableWeight = value; }
        }
        public Int32 Quantity
        {
            get { return mQuantity; }
            set { mIsChanges = true; mQuantity = value; }
        }
        public Int32 CreatorUserID
        {
            get { return mCreatorUserID; }
            set { mIsChanges = true; mCreatorUserID = value; }
        }
        public DateTime CreationDate
        {
            get { return mCreationDate; }
            set { mIsChanges = true; mCreationDate = value; }
        }
        public Int32 ModificatorUserID
        {
            get { return mModificatorUserID; }
            set { mIsChanges = true; mModificatorUserID = value; }
        }
        public DateTime ModificationDate
        {
            get { return mModificationDate; }
            set { mIsChanges = true; mModificationDate = value; }
        }
        public Int64 QuotationRouteID
        {
            get { return mQuotationRouteID; }
            set { mIsChanges = true; mQuotationRouteID = value; }
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

    public partial class CQuotationContainersAndPackages
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
        public List<CVarQuotationContainersAndPackages> lstCVarQuotationContainersAndPackages = new List<CVarQuotationContainersAndPackages>();
        public List<CPKQuotationContainersAndPackages> lstDeletedCPKQuotationContainersAndPackages = new List<CPKQuotationContainersAndPackages>();
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
        public Exception GetItem(Int64 ID)
        {
            return DataFill(Convert.ToString(ID), false);
        }
        private Exception DataFill(string Param, Boolean IsList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarQuotationContainersAndPackages.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListQuotationContainersAndPackages";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemQuotationContainersAndPackages";
                    Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt));
                    Com.Parameters[0].Value = Convert.ToInt64(Param);
                }
                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        /*Start DataReader*/
                        CVarQuotationContainersAndPackages ObjCVarQuotationContainersAndPackages = new CVarQuotationContainersAndPackages();
                        ObjCVarQuotationContainersAndPackages.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarQuotationContainersAndPackages.mQuotationID = Convert.ToInt64(dr["QuotationID"].ToString());
                        ObjCVarQuotationContainersAndPackages.mContainerTypeID = Convert.ToInt32(dr["ContainerTypeID"].ToString());
                        ObjCVarQuotationContainersAndPackages.mPackageTypeID = Convert.ToInt32(dr["PackageTypeID"].ToString());
                        ObjCVarQuotationContainersAndPackages.mLength = Convert.ToDecimal(dr["Length"].ToString());
                        ObjCVarQuotationContainersAndPackages.mWidth = Convert.ToDecimal(dr["Width"].ToString());
                        ObjCVarQuotationContainersAndPackages.mHeight = Convert.ToDecimal(dr["Height"].ToString());
                        ObjCVarQuotationContainersAndPackages.mVolume = Convert.ToDecimal(dr["Volume"].ToString());
                        ObjCVarQuotationContainersAndPackages.mVolumetricWeight = Convert.ToDecimal(dr["VolumetricWeight"].ToString());
                        ObjCVarQuotationContainersAndPackages.mNetWeight = Convert.ToDecimal(dr["NetWeight"].ToString());
                        ObjCVarQuotationContainersAndPackages.mGrossWeight = Convert.ToDecimal(dr["GrossWeight"].ToString());
                        ObjCVarQuotationContainersAndPackages.mChargeableWeight = Convert.ToDecimal(dr["ChargeableWeight"].ToString());
                        ObjCVarQuotationContainersAndPackages.mQuantity = Convert.ToInt32(dr["Quantity"].ToString());
                        ObjCVarQuotationContainersAndPackages.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarQuotationContainersAndPackages.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarQuotationContainersAndPackages.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarQuotationContainersAndPackages.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarQuotationContainersAndPackages.mQuotationRouteID = Convert.ToInt64(dr["QuotationRouteID"].ToString());
                        lstCVarQuotationContainersAndPackages.Add(ObjCVarQuotationContainersAndPackages);
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
            lstCVarQuotationContainersAndPackages.Clear();

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
                Com.CommandText = "[dbo].GetListPagingQuotationContainersAndPackages";
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
                        CVarQuotationContainersAndPackages ObjCVarQuotationContainersAndPackages = new CVarQuotationContainersAndPackages();
                        ObjCVarQuotationContainersAndPackages.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarQuotationContainersAndPackages.mQuotationID = Convert.ToInt64(dr["QuotationID"].ToString());
                        ObjCVarQuotationContainersAndPackages.mContainerTypeID = Convert.ToInt32(dr["ContainerTypeID"].ToString());
                        ObjCVarQuotationContainersAndPackages.mPackageTypeID = Convert.ToInt32(dr["PackageTypeID"].ToString());
                        ObjCVarQuotationContainersAndPackages.mLength = Convert.ToDecimal(dr["Length"].ToString());
                        ObjCVarQuotationContainersAndPackages.mWidth = Convert.ToDecimal(dr["Width"].ToString());
                        ObjCVarQuotationContainersAndPackages.mHeight = Convert.ToDecimal(dr["Height"].ToString());
                        ObjCVarQuotationContainersAndPackages.mVolume = Convert.ToDecimal(dr["Volume"].ToString());
                        ObjCVarQuotationContainersAndPackages.mVolumetricWeight = Convert.ToDecimal(dr["VolumetricWeight"].ToString());
                        ObjCVarQuotationContainersAndPackages.mNetWeight = Convert.ToDecimal(dr["NetWeight"].ToString());
                        ObjCVarQuotationContainersAndPackages.mGrossWeight = Convert.ToDecimal(dr["GrossWeight"].ToString());
                        ObjCVarQuotationContainersAndPackages.mChargeableWeight = Convert.ToDecimal(dr["ChargeableWeight"].ToString());
                        ObjCVarQuotationContainersAndPackages.mQuantity = Convert.ToInt32(dr["Quantity"].ToString());
                        ObjCVarQuotationContainersAndPackages.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarQuotationContainersAndPackages.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarQuotationContainersAndPackages.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarQuotationContainersAndPackages.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarQuotationContainersAndPackages.mQuotationRouteID = Convert.ToInt64(dr["QuotationRouteID"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarQuotationContainersAndPackages.Add(ObjCVarQuotationContainersAndPackages);
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
        #region "Common Methods"
        private void BeginTrans(SqlCommand Com, SqlConnection Con)
        {

            tr = Con.BeginTransaction(IsolationLevel.Serializable);
            Com.CommandType = CommandType.StoredProcedure;
        }

        private void EndTrans(SqlCommand Com, SqlConnection Con)
        {

            Com.Transaction = tr;
            Com.Connection = Con;
            Com.ExecuteNonQuery();
            tr.Commit();
        }

        #endregion
        #region "Set List Method"
        private Exception SetList(string WhereClause, Boolean IsDelete)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                if (IsDelete == true)
                    Com.CommandText = "[dbo].DeleteListQuotationContainersAndPackages";
                else
                    Com.CommandText = "[dbo].UpdateListQuotationContainersAndPackages";
                Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                BeginTrans(Com, Con);
                Com.Parameters[0].Value = WhereClause;
                EndTrans(Com, Con);
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
        #region "Delete Methods"
        public Exception DeleteItem(List<CPKQuotationContainersAndPackages> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemQuotationContainersAndPackages";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt));
                foreach (CPKQuotationContainersAndPackages ObjCPKQuotationContainersAndPackages in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt64(ObjCPKQuotationContainersAndPackages.ID);
                    EndTrans(Com, Con);
                }
            }
            catch (Exception ex)
            {
                Exp = ex;
            }
            finally
            {
                Con.Close();
                Con.Dispose();
                DeleteList.Clear();
            }
            return Exp;
        }

        public Exception DeleteList(string WhereClause)
        {

            return SetList(WhereClause, true);
        }

        #endregion
        #region "Save Methods"
        public Exception SaveMethod(List<CVarQuotationContainersAndPackages> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@QuotationID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@ContainerTypeID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@PackageTypeID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@Length", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@Width", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@Height", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@Volume", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@VolumetricWeight", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@NetWeight", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@GrossWeight", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@ChargeableWeight", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@Quantity", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CreatorUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CreationDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@ModificatorUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ModificationDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@QuotationRouteID", SqlDbType.BigInt));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarQuotationContainersAndPackages ObjCVarQuotationContainersAndPackages in SaveList)
                {
                    if (ObjCVarQuotationContainersAndPackages.mIsChanges == true)
                    {
                        if (ObjCVarQuotationContainersAndPackages.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemQuotationContainersAndPackages";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarQuotationContainersAndPackages.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemQuotationContainersAndPackages";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarQuotationContainersAndPackages.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarQuotationContainersAndPackages.ID;
                        }
                        Com.Parameters["@QuotationID"].Value = ObjCVarQuotationContainersAndPackages.QuotationID;
                        Com.Parameters["@ContainerTypeID"].Value = ObjCVarQuotationContainersAndPackages.ContainerTypeID;
                        Com.Parameters["@PackageTypeID"].Value = ObjCVarQuotationContainersAndPackages.PackageTypeID;
                        Com.Parameters["@Length"].Value = ObjCVarQuotationContainersAndPackages.Length;
                        Com.Parameters["@Width"].Value = ObjCVarQuotationContainersAndPackages.Width;
                        Com.Parameters["@Height"].Value = ObjCVarQuotationContainersAndPackages.Height;
                        Com.Parameters["@Volume"].Value = ObjCVarQuotationContainersAndPackages.Volume;
                        Com.Parameters["@VolumetricWeight"].Value = ObjCVarQuotationContainersAndPackages.VolumetricWeight;
                        Com.Parameters["@NetWeight"].Value = ObjCVarQuotationContainersAndPackages.NetWeight;
                        Com.Parameters["@GrossWeight"].Value = ObjCVarQuotationContainersAndPackages.GrossWeight;
                        Com.Parameters["@ChargeableWeight"].Value = ObjCVarQuotationContainersAndPackages.ChargeableWeight;
                        Com.Parameters["@Quantity"].Value = ObjCVarQuotationContainersAndPackages.Quantity;
                        Com.Parameters["@CreatorUserID"].Value = ObjCVarQuotationContainersAndPackages.CreatorUserID;
                        Com.Parameters["@CreationDate"].Value = ObjCVarQuotationContainersAndPackages.CreationDate;
                        Com.Parameters["@ModificatorUserID"].Value = ObjCVarQuotationContainersAndPackages.ModificatorUserID;
                        Com.Parameters["@ModificationDate"].Value = ObjCVarQuotationContainersAndPackages.ModificationDate;
                        Com.Parameters["@QuotationRouteID"].Value = ObjCVarQuotationContainersAndPackages.QuotationRouteID;
                        EndTrans(Com, Con);
                        if (ObjCVarQuotationContainersAndPackages.ID == 0)
                        {
                            ObjCVarQuotationContainersAndPackages.ID = Convert.ToInt64(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarQuotationContainersAndPackages.mIsChanges = false;
                    }
                }
            }
            catch (Exception ex)
            {
                Exp = ex;
                if (tr != null)
                    tr.Rollback();
            }
            finally
            {
                Con.Close();
                Con.Dispose();
            }
            return Exp;
        }
        #endregion
        #region "Update Methods"
        public Exception UpdateList(string UpdateClause)
        {

            return SetList(UpdateClause, false);
        }

        #endregion
    }
}

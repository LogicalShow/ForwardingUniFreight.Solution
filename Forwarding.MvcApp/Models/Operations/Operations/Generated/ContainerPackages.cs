using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.Operations.Operations.Generated
{
    [Serializable]
    public class CPKContainerPackages
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
    public partial class CVarContainerPackages : CPKContainerPackages
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int64 mOperationID;
        internal Int64 mOperationContainersAndPackagesID;
        internal Int64 mHouseOperationID;
        internal Int32 mPackageTypeID;
        internal Int32 mQuantity;
        internal Decimal mLength;
        internal Decimal mWidth;
        internal Decimal mHeight;
        internal Decimal mVolume;
        internal Decimal mVolumetricWeight;
        internal Decimal mNetWeight;
        internal Decimal mGrossWeight;
        internal Decimal mChargeableWeight;
        internal String mMarksAndNumbers;
        internal String mDescriptionOfGoods;
        internal Int32 mCreatorUserID;
        internal DateTime mCreationDate;
        internal Int32 mModificatorUserID;
        internal DateTime mModificationDate;
        internal Int64 mHouseOCPID;
        #endregion

        #region "Methods"
        public Int64 OperationID
        {
            get { return mOperationID; }
            set { mIsChanges = true; mOperationID = value; }
        }
        public Int64 OperationContainersAndPackagesID
        {
            get { return mOperationContainersAndPackagesID; }
            set { mIsChanges = true; mOperationContainersAndPackagesID = value; }
        }
        public Int64 HouseOperationID
        {
            get { return mHouseOperationID; }
            set { mIsChanges = true; mHouseOperationID = value; }
        }
        public Int32 PackageTypeID
        {
            get { return mPackageTypeID; }
            set { mIsChanges = true; mPackageTypeID = value; }
        }
        public Int32 Quantity
        {
            get { return mQuantity; }
            set { mIsChanges = true; mQuantity = value; }
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
        public String MarksAndNumbers
        {
            get { return mMarksAndNumbers; }
            set { mIsChanges = true; mMarksAndNumbers = value; }
        }
        public String DescriptionOfGoods
        {
            get { return mDescriptionOfGoods; }
            set { mIsChanges = true; mDescriptionOfGoods = value; }
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
        public Int64 HouseOCPID
        {
            get { return mHouseOCPID; }
            set { mIsChanges = true; mHouseOCPID = value; }
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

    public partial class CContainerPackages
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
        public List<CVarContainerPackages> lstCVarContainerPackages = new List<CVarContainerPackages>();
        public List<CPKContainerPackages> lstDeletedCPKContainerPackages = new List<CPKContainerPackages>();
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
            lstCVarContainerPackages.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListContainerPackages";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemContainerPackages";
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
                        CVarContainerPackages ObjCVarContainerPackages = new CVarContainerPackages();
                        ObjCVarContainerPackages.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarContainerPackages.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
                        ObjCVarContainerPackages.mOperationContainersAndPackagesID = Convert.ToInt64(dr["OperationContainersAndPackagesID"].ToString());
                        ObjCVarContainerPackages.mHouseOperationID = Convert.ToInt64(dr["HouseOperationID"].ToString());
                        ObjCVarContainerPackages.mPackageTypeID = Convert.ToInt32(dr["PackageTypeID"].ToString());
                        ObjCVarContainerPackages.mQuantity = Convert.ToInt32(dr["Quantity"].ToString());
                        ObjCVarContainerPackages.mLength = Convert.ToDecimal(dr["Length"].ToString());
                        ObjCVarContainerPackages.mWidth = Convert.ToDecimal(dr["Width"].ToString());
                        ObjCVarContainerPackages.mHeight = Convert.ToDecimal(dr["Height"].ToString());
                        ObjCVarContainerPackages.mVolume = Convert.ToDecimal(dr["Volume"].ToString());
                        ObjCVarContainerPackages.mVolumetricWeight = Convert.ToDecimal(dr["VolumetricWeight"].ToString());
                        ObjCVarContainerPackages.mNetWeight = Convert.ToDecimal(dr["NetWeight"].ToString());
                        ObjCVarContainerPackages.mGrossWeight = Convert.ToDecimal(dr["GrossWeight"].ToString());
                        ObjCVarContainerPackages.mChargeableWeight = Convert.ToDecimal(dr["ChargeableWeight"].ToString());
                        ObjCVarContainerPackages.mMarksAndNumbers = Convert.ToString(dr["MarksAndNumbers"].ToString());
                        ObjCVarContainerPackages.mDescriptionOfGoods = Convert.ToString(dr["DescriptionOfGoods"].ToString());
                        ObjCVarContainerPackages.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarContainerPackages.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarContainerPackages.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarContainerPackages.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarContainerPackages.mHouseOCPID = Convert.ToInt64(dr["HouseOCPID"].ToString());
                        lstCVarContainerPackages.Add(ObjCVarContainerPackages);
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
            lstCVarContainerPackages.Clear();

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
                Com.CommandText = "[dbo].GetListPagingContainerPackages";
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
                        CVarContainerPackages ObjCVarContainerPackages = new CVarContainerPackages();
                        ObjCVarContainerPackages.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarContainerPackages.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
                        ObjCVarContainerPackages.mOperationContainersAndPackagesID = Convert.ToInt64(dr["OperationContainersAndPackagesID"].ToString());
                        ObjCVarContainerPackages.mHouseOperationID = Convert.ToInt64(dr["HouseOperationID"].ToString());
                        ObjCVarContainerPackages.mPackageTypeID = Convert.ToInt32(dr["PackageTypeID"].ToString());
                        ObjCVarContainerPackages.mQuantity = Convert.ToInt32(dr["Quantity"].ToString());
                        ObjCVarContainerPackages.mLength = Convert.ToDecimal(dr["Length"].ToString());
                        ObjCVarContainerPackages.mWidth = Convert.ToDecimal(dr["Width"].ToString());
                        ObjCVarContainerPackages.mHeight = Convert.ToDecimal(dr["Height"].ToString());
                        ObjCVarContainerPackages.mVolume = Convert.ToDecimal(dr["Volume"].ToString());
                        ObjCVarContainerPackages.mVolumetricWeight = Convert.ToDecimal(dr["VolumetricWeight"].ToString());
                        ObjCVarContainerPackages.mNetWeight = Convert.ToDecimal(dr["NetWeight"].ToString());
                        ObjCVarContainerPackages.mGrossWeight = Convert.ToDecimal(dr["GrossWeight"].ToString());
                        ObjCVarContainerPackages.mChargeableWeight = Convert.ToDecimal(dr["ChargeableWeight"].ToString());
                        ObjCVarContainerPackages.mMarksAndNumbers = Convert.ToString(dr["MarksAndNumbers"].ToString());
                        ObjCVarContainerPackages.mDescriptionOfGoods = Convert.ToString(dr["DescriptionOfGoods"].ToString());
                        ObjCVarContainerPackages.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarContainerPackages.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarContainerPackages.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarContainerPackages.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarContainerPackages.mHouseOCPID = Convert.ToInt64(dr["HouseOCPID"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarContainerPackages.Add(ObjCVarContainerPackages);
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
                    Com.CommandText = "[dbo].DeleteListContainerPackages";
                else
                    Com.CommandText = "[dbo].UpdateListContainerPackages";
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
        public Exception DeleteItem(List<CPKContainerPackages> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemContainerPackages";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt));
                foreach (CPKContainerPackages ObjCPKContainerPackages in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt64(ObjCPKContainerPackages.ID);
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
        public Exception SaveMethod(List<CVarContainerPackages> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@OperationID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@OperationContainersAndPackagesID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@HouseOperationID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@PackageTypeID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@Quantity", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@Length", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@Width", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@Height", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@Volume", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@VolumetricWeight", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@NetWeight", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@GrossWeight", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@ChargeableWeight", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@MarksAndNumbers", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@DescriptionOfGoods", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@CreatorUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CreationDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@ModificatorUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ModificationDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@HouseOCPID", SqlDbType.BigInt));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarContainerPackages ObjCVarContainerPackages in SaveList)
                {
                    if (ObjCVarContainerPackages.mIsChanges == true)
                    {
                        if (ObjCVarContainerPackages.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemContainerPackages";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarContainerPackages.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemContainerPackages";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarContainerPackages.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarContainerPackages.ID;
                        }
                        Com.Parameters["@OperationID"].Value = ObjCVarContainerPackages.OperationID;
                        Com.Parameters["@OperationContainersAndPackagesID"].Value = ObjCVarContainerPackages.OperationContainersAndPackagesID;
                        Com.Parameters["@HouseOperationID"].Value = ObjCVarContainerPackages.HouseOperationID;
                        Com.Parameters["@PackageTypeID"].Value = ObjCVarContainerPackages.PackageTypeID;
                        Com.Parameters["@Quantity"].Value = ObjCVarContainerPackages.Quantity;
                        Com.Parameters["@Length"].Value = ObjCVarContainerPackages.Length;
                        Com.Parameters["@Width"].Value = ObjCVarContainerPackages.Width;
                        Com.Parameters["@Height"].Value = ObjCVarContainerPackages.Height;
                        Com.Parameters["@Volume"].Value = ObjCVarContainerPackages.Volume;
                        Com.Parameters["@VolumetricWeight"].Value = ObjCVarContainerPackages.VolumetricWeight;
                        Com.Parameters["@NetWeight"].Value = ObjCVarContainerPackages.NetWeight;
                        Com.Parameters["@GrossWeight"].Value = ObjCVarContainerPackages.GrossWeight;
                        Com.Parameters["@ChargeableWeight"].Value = ObjCVarContainerPackages.ChargeableWeight;
                        Com.Parameters["@MarksAndNumbers"].Value = ObjCVarContainerPackages.MarksAndNumbers;
                        Com.Parameters["@DescriptionOfGoods"].Value = ObjCVarContainerPackages.DescriptionOfGoods;
                        Com.Parameters["@CreatorUserID"].Value = ObjCVarContainerPackages.CreatorUserID;
                        Com.Parameters["@CreationDate"].Value = ObjCVarContainerPackages.CreationDate;
                        Com.Parameters["@ModificatorUserID"].Value = ObjCVarContainerPackages.ModificatorUserID;
                        Com.Parameters["@ModificationDate"].Value = ObjCVarContainerPackages.ModificationDate;
                        Com.Parameters["@HouseOCPID"].Value = ObjCVarContainerPackages.HouseOCPID;
                        EndTrans(Com, Con);
                        if (ObjCVarContainerPackages.ID == 0)
                        {
                            ObjCVarContainerPackages.ID = Convert.ToInt64(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarContainerPackages.mIsChanges = false;
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

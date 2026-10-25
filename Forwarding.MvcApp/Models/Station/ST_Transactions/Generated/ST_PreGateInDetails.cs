using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.Station.ST_Transactions.Generated
{
    [Serializable]
    public class CPKST_PreGateInDetails
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
    public partial class CVarST_PreGateInDetails : CPKST_PreGateInDetails
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int64 mContainerID;
        internal String mContainerNumber;
        internal Int32 mPackageTypeIDOnContainer;
        internal Decimal mQuantity;
        internal Decimal mGrossWeightTON;
        internal Decimal mNetWeightTON;
        internal String mDescriptionOfGoods;
        internal String mDriver;
        internal String mTruckNumber;
        internal Int64 mPreGateInID;
        internal Boolean misComplete;
        internal String mDriverNumber;
        internal String mPO;
        #endregion

        #region "Methods"
        public Int64 ContainerID
        {
            get { return mContainerID; }
            set { mIsChanges = true; mContainerID = value; }
        }
        public String ContainerNumber
        {
            get { return mContainerNumber; }
            set { mIsChanges = true; mContainerNumber = value; }
        }
        public Int32 PackageTypeIDOnContainer
        {
            get { return mPackageTypeIDOnContainer; }
            set { mIsChanges = true; mPackageTypeIDOnContainer = value; }
        }
        public Decimal Quantity
        {
            get { return mQuantity; }
            set { mIsChanges = true; mQuantity = value; }
        }
        public Decimal GrossWeightTON
        {
            get { return mGrossWeightTON; }
            set { mIsChanges = true; mGrossWeightTON = value; }
        }
        public Decimal NetWeightTON
        {
            get { return mNetWeightTON; }
            set { mIsChanges = true; mNetWeightTON = value; }
        }
        public String DescriptionOfGoods
        {
            get { return mDescriptionOfGoods; }
            set { mIsChanges = true; mDescriptionOfGoods = value; }
        }
        public String Driver
        {
            get { return mDriver; }
            set { mIsChanges = true; mDriver = value; }
        }
        public String TruckNumber
        {
            get { return mTruckNumber; }
            set { mIsChanges = true; mTruckNumber = value; }
        }
        public Int64 PreGateInID
        {
            get { return mPreGateInID; }
            set { mIsChanges = true; mPreGateInID = value; }
        }
        public Boolean isComplete
        {
            get { return misComplete; }
            set { mIsChanges = true; misComplete = value; }
        }
        public String DriverNumber
        {
            get { return mDriverNumber; }
            set { mIsChanges = true; mDriverNumber = value; }
        }
        public String PO
        {
            get { return mPO; }
            set { mIsChanges = true; mPO = value; }
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

    public partial class CST_PreGateInDetails
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
        public List<CVarST_PreGateInDetails> lstCVarST_PreGateInDetails = new List<CVarST_PreGateInDetails>();
        public List<CPKST_PreGateInDetails> lstDeletedCPKST_PreGateInDetails = new List<CPKST_PreGateInDetails>();
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
            lstCVarST_PreGateInDetails.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListST_PreGateInDetails";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemST_PreGateInDetails";
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
                        CVarST_PreGateInDetails ObjCVarST_PreGateInDetails = new CVarST_PreGateInDetails();
                        ObjCVarST_PreGateInDetails.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarST_PreGateInDetails.mContainerID = Convert.ToInt64(dr["ContainerID"].ToString());
                        ObjCVarST_PreGateInDetails.mContainerNumber = Convert.ToString(dr["ContainerNumber"].ToString());
                        ObjCVarST_PreGateInDetails.mPackageTypeIDOnContainer = Convert.ToInt32(dr["PackageTypeIDOnContainer"].ToString());
                        ObjCVarST_PreGateInDetails.mQuantity = Convert.ToDecimal(dr["Quantity"].ToString());
                        ObjCVarST_PreGateInDetails.mGrossWeightTON = Convert.ToDecimal(dr["GrossWeightTON"].ToString());
                        ObjCVarST_PreGateInDetails.mNetWeightTON = Convert.ToDecimal(dr["NetWeightTON"].ToString());
                        ObjCVarST_PreGateInDetails.mDescriptionOfGoods = Convert.ToString(dr["DescriptionOfGoods"].ToString());
                        ObjCVarST_PreGateInDetails.mDriver = Convert.ToString(dr["Driver"].ToString());
                        ObjCVarST_PreGateInDetails.mTruckNumber = Convert.ToString(dr["TruckNumber"].ToString());
                        ObjCVarST_PreGateInDetails.mPreGateInID = Convert.ToInt64(dr["PreGateInID"].ToString());
                        ObjCVarST_PreGateInDetails.misComplete = Convert.ToBoolean(dr["isComplete"].ToString());
                        ObjCVarST_PreGateInDetails.mDriverNumber = Convert.ToString(dr["DriverNumber"].ToString());
                        ObjCVarST_PreGateInDetails.mPO = Convert.ToString(dr["PO"].ToString());
                        lstCVarST_PreGateInDetails.Add(ObjCVarST_PreGateInDetails);
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
            lstCVarST_PreGateInDetails.Clear();

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
                Com.CommandText = "[dbo].GetListPagingST_PreGateInDetails";
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
                        CVarST_PreGateInDetails ObjCVarST_PreGateInDetails = new CVarST_PreGateInDetails();
                        ObjCVarST_PreGateInDetails.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarST_PreGateInDetails.mContainerID = Convert.ToInt64(dr["ContainerID"].ToString());
                        ObjCVarST_PreGateInDetails.mContainerNumber = Convert.ToString(dr["ContainerNumber"].ToString());
                        ObjCVarST_PreGateInDetails.mPackageTypeIDOnContainer = Convert.ToInt32(dr["PackageTypeIDOnContainer"].ToString());
                        ObjCVarST_PreGateInDetails.mQuantity = Convert.ToDecimal(dr["Quantity"].ToString());
                        ObjCVarST_PreGateInDetails.mGrossWeightTON = Convert.ToDecimal(dr["GrossWeightTON"].ToString());
                        ObjCVarST_PreGateInDetails.mNetWeightTON = Convert.ToDecimal(dr["NetWeightTON"].ToString());
                        ObjCVarST_PreGateInDetails.mDescriptionOfGoods = Convert.ToString(dr["DescriptionOfGoods"].ToString());
                        ObjCVarST_PreGateInDetails.mDriver = Convert.ToString(dr["Driver"].ToString());
                        ObjCVarST_PreGateInDetails.mTruckNumber = Convert.ToString(dr["TruckNumber"].ToString());
                        ObjCVarST_PreGateInDetails.mPreGateInID = Convert.ToInt64(dr["PreGateInID"].ToString());
                        ObjCVarST_PreGateInDetails.misComplete = Convert.ToBoolean(dr["isComplete"].ToString());
                        ObjCVarST_PreGateInDetails.mDriverNumber = Convert.ToString(dr["DriverNumber"].ToString());
                        ObjCVarST_PreGateInDetails.mPO = Convert.ToString(dr["PO"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarST_PreGateInDetails.Add(ObjCVarST_PreGateInDetails);
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
                    Com.CommandText = "[dbo].DeleteListST_PreGateInDetails";
                else
                    Com.CommandText = "[dbo].UpdateListST_PreGateInDetails";
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
        public Exception DeleteItem(List<CPKST_PreGateInDetails> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemST_PreGateInDetails";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt));
                foreach (CPKST_PreGateInDetails ObjCPKST_PreGateInDetails in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt64(ObjCPKST_PreGateInDetails.ID);
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
        public Exception SaveMethod(List<CVarST_PreGateInDetails> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@ContainerID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@ContainerNumber", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@PackageTypeIDOnContainer", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@Quantity", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@GrossWeightTON", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@NetWeightTON", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@DescriptionOfGoods", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@Driver", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@TruckNumber", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@PreGateInID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@isComplete", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@DriverNumber", SqlDbType.VarChar));
                Com.Parameters.Add(new SqlParameter("@PO", SqlDbType.NVarChar));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarST_PreGateInDetails ObjCVarST_PreGateInDetails in SaveList)
                {
                    if (ObjCVarST_PreGateInDetails.mIsChanges == true)
                    {
                        if (ObjCVarST_PreGateInDetails.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemST_PreGateInDetails";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarST_PreGateInDetails.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemST_PreGateInDetails";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarST_PreGateInDetails.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarST_PreGateInDetails.ID;
                        }
                        Com.Parameters["@ContainerID"].Value = ObjCVarST_PreGateInDetails.ContainerID;
                        Com.Parameters["@ContainerNumber"].Value = ObjCVarST_PreGateInDetails.ContainerNumber;
                        Com.Parameters["@PackageTypeIDOnContainer"].Value = ObjCVarST_PreGateInDetails.PackageTypeIDOnContainer;
                        Com.Parameters["@Quantity"].Value = ObjCVarST_PreGateInDetails.Quantity;
                        Com.Parameters["@GrossWeightTON"].Value = ObjCVarST_PreGateInDetails.GrossWeightTON;
                        Com.Parameters["@NetWeightTON"].Value = ObjCVarST_PreGateInDetails.NetWeightTON;
                        Com.Parameters["@DescriptionOfGoods"].Value = ObjCVarST_PreGateInDetails.DescriptionOfGoods;
                        Com.Parameters["@Driver"].Value = ObjCVarST_PreGateInDetails.Driver;
                        Com.Parameters["@TruckNumber"].Value = ObjCVarST_PreGateInDetails.TruckNumber;
                        Com.Parameters["@PreGateInID"].Value = ObjCVarST_PreGateInDetails.PreGateInID;
                        Com.Parameters["@isComplete"].Value = ObjCVarST_PreGateInDetails.isComplete;
                        Com.Parameters["@DriverNumber"].Value = ObjCVarST_PreGateInDetails.DriverNumber;
                        Com.Parameters["@PO"].Value = ObjCVarST_PreGateInDetails.PO;
                        EndTrans(Com, Con);
                        if (ObjCVarST_PreGateInDetails.ID == 0)
                        {
                            ObjCVarST_PreGateInDetails.ID = Convert.ToInt64(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarST_PreGateInDetails.mIsChanges = false;
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

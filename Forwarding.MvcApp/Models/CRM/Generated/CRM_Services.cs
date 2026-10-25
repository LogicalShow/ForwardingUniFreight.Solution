using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.CRM.Generated
{
    [Serializable]
    public class CPKCRM_Services
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
    public partial class CVarCRM_Services : CPKCRM_Services
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mCommodityID;
        internal Int32 mActivityID;
        internal Int32 mEquipmentID;
        internal Int32 mPickUpCountryID;
        internal Int32 mPickUpPortID;
        internal String mPickUpAddress;
        internal Int32 mDeliveryCountryID;
        internal Int32 mDeliveryPortID;
        internal String mDeliveryAddress;
        internal Int32 mClientsID;
        internal DateTime mCreationDate;
        internal Int32 mCreatorUserID;
        internal DateTime mModificationDate;
        internal Int32 mModificationUserID;
        internal Int32 mIsActualCustomer;
        internal String mShipmentWeight;
        internal String mShipmentCBM;
        #endregion

        #region "Methods"
        public Int32 CommodityID
        {
            get { return mCommodityID; }
            set { mIsChanges = true; mCommodityID = value; }
        }
        public Int32 ActivityID
        {
            get { return mActivityID; }
            set { mIsChanges = true; mActivityID = value; }
        }
        public Int32 EquipmentID
        {
            get { return mEquipmentID; }
            set { mIsChanges = true; mEquipmentID = value; }
        }
        public Int32 PickUpCountryID
        {
            get { return mPickUpCountryID; }
            set { mIsChanges = true; mPickUpCountryID = value; }
        }
        public Int32 PickUpPortID
        {
            get { return mPickUpPortID; }
            set { mIsChanges = true; mPickUpPortID = value; }
        }
        public String PickUpAddress
        {
            get { return mPickUpAddress; }
            set { mIsChanges = true; mPickUpAddress = value; }
        }
        public Int32 DeliveryCountryID
        {
            get { return mDeliveryCountryID; }
            set { mIsChanges = true; mDeliveryCountryID = value; }
        }
        public Int32 DeliveryPortID
        {
            get { return mDeliveryPortID; }
            set { mIsChanges = true; mDeliveryPortID = value; }
        }
        public String DeliveryAddress
        {
            get { return mDeliveryAddress; }
            set { mIsChanges = true; mDeliveryAddress = value; }
        }
        public Int32 ClientsID
        {
            get { return mClientsID; }
            set { mIsChanges = true; mClientsID = value; }
        }
        public DateTime CreationDate
        {
            get { return mCreationDate; }
            set { mIsChanges = true; mCreationDate = value; }
        }
        public Int32 CreatorUserID
        {
            get { return mCreatorUserID; }
            set { mIsChanges = true; mCreatorUserID = value; }
        }
        public DateTime ModificationDate
        {
            get { return mModificationDate; }
            set { mIsChanges = true; mModificationDate = value; }
        }
        public Int32 ModificationUserID
        {
            get { return mModificationUserID; }
            set { mIsChanges = true; mModificationUserID = value; }
        }
        public Int32 IsActualCustomer
        {
            get { return mIsActualCustomer; }
            set { mIsChanges = true; mIsActualCustomer = value; }
        }
        public String ShipmentWeight
        {
            get { return mShipmentWeight; }
            set { mIsChanges = true; mShipmentWeight = value; }
        }
        public String ShipmentCBM
        {
            get { return mShipmentCBM; }
            set { mIsChanges = true; mShipmentCBM = value; }
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

    public partial class CCRM_Services
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
        public List<CVarCRM_Services> lstCVarCRM_Services = new List<CVarCRM_Services>();
        public List<CPKCRM_Services> lstDeletedCPKCRM_Services = new List<CPKCRM_Services>();
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
        public Exception GetItem(Int32 ID)
        {
            return DataFill(Convert.ToString(ID), false);
        }
        private Exception DataFill(string Param, Boolean IsList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarCRM_Services.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListCRM_Services";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemCRM_Services";
                    Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int));
                    Com.Parameters[0].Value = Convert.ToInt32(Param);
                }
                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        /*Start DataReader*/
                        CVarCRM_Services ObjCVarCRM_Services = new CVarCRM_Services();
                        ObjCVarCRM_Services.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarCRM_Services.mCommodityID = Convert.ToInt32(dr["CommodityID"].ToString());
                        ObjCVarCRM_Services.mActivityID = Convert.ToInt32(dr["ActivityID"].ToString());
                        ObjCVarCRM_Services.mEquipmentID = Convert.ToInt32(dr["EquipmentID"].ToString());
                        ObjCVarCRM_Services.mPickUpCountryID = Convert.ToInt32(dr["PickUpCountryID"].ToString());
                        ObjCVarCRM_Services.mPickUpPortID = Convert.ToInt32(dr["PickUpPortID"].ToString());
                        ObjCVarCRM_Services.mPickUpAddress = Convert.ToString(dr["PickUpAddress"].ToString());
                        ObjCVarCRM_Services.mDeliveryCountryID = Convert.ToInt32(dr["DeliveryCountryID"].ToString());
                        ObjCVarCRM_Services.mDeliveryPortID = Convert.ToInt32(dr["DeliveryPortID"].ToString());
                        ObjCVarCRM_Services.mDeliveryAddress = Convert.ToString(dr["DeliveryAddress"].ToString());
                        ObjCVarCRM_Services.mClientsID = Convert.ToInt32(dr["ClientsID"].ToString());
                        ObjCVarCRM_Services.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarCRM_Services.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarCRM_Services.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarCRM_Services.mModificationUserID = Convert.ToInt32(dr["ModificationUserID"].ToString());
                        ObjCVarCRM_Services.mIsActualCustomer = Convert.ToInt32(dr["IsActualCustomer"].ToString());
                        ObjCVarCRM_Services.mShipmentWeight = Convert.ToString(dr["ShipmentWeight"].ToString());
                        ObjCVarCRM_Services.mShipmentCBM = Convert.ToString(dr["ShipmentCBM"].ToString());
                        lstCVarCRM_Services.Add(ObjCVarCRM_Services);
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
            lstCVarCRM_Services.Clear();

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
                Com.CommandText = "[dbo].GetListPagingCRM_Services";
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
                        CVarCRM_Services ObjCVarCRM_Services = new CVarCRM_Services();
                        ObjCVarCRM_Services.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarCRM_Services.mCommodityID = Convert.ToInt32(dr["CommodityID"].ToString());
                        ObjCVarCRM_Services.mActivityID = Convert.ToInt32(dr["ActivityID"].ToString());
                        ObjCVarCRM_Services.mEquipmentID = Convert.ToInt32(dr["EquipmentID"].ToString());
                        ObjCVarCRM_Services.mPickUpCountryID = Convert.ToInt32(dr["PickUpCountryID"].ToString());
                        ObjCVarCRM_Services.mPickUpPortID = Convert.ToInt32(dr["PickUpPortID"].ToString());
                        ObjCVarCRM_Services.mPickUpAddress = Convert.ToString(dr["PickUpAddress"].ToString());
                        ObjCVarCRM_Services.mDeliveryCountryID = Convert.ToInt32(dr["DeliveryCountryID"].ToString());
                        ObjCVarCRM_Services.mDeliveryPortID = Convert.ToInt32(dr["DeliveryPortID"].ToString());
                        ObjCVarCRM_Services.mDeliveryAddress = Convert.ToString(dr["DeliveryAddress"].ToString());
                        ObjCVarCRM_Services.mClientsID = Convert.ToInt32(dr["ClientsID"].ToString());
                        ObjCVarCRM_Services.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarCRM_Services.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarCRM_Services.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarCRM_Services.mModificationUserID = Convert.ToInt32(dr["ModificationUserID"].ToString());
                        ObjCVarCRM_Services.mIsActualCustomer = Convert.ToInt32(dr["IsActualCustomer"].ToString());
                        ObjCVarCRM_Services.mShipmentWeight = Convert.ToString(dr["ShipmentWeight"].ToString());
                        ObjCVarCRM_Services.mShipmentCBM = Convert.ToString(dr["ShipmentCBM"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarCRM_Services.Add(ObjCVarCRM_Services);
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
                    Com.CommandText = "[dbo].DeleteListCRM_Services";
                else
                    Com.CommandText = "[dbo].UpdateListCRM_Services";
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
        public Exception DeleteItem(List<CPKCRM_Services> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemCRM_Services";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int));
                foreach (CPKCRM_Services ObjCPKCRM_Services in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt32(ObjCPKCRM_Services.ID);
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
        public Exception SaveMethod(List<CVarCRM_Services> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@CommodityID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ActivityID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@EquipmentID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@PickUpCountryID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@PickUpPortID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@PickUpAddress", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@DeliveryCountryID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@DeliveryPortID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@DeliveryAddress", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@ClientsID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CreationDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@CreatorUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ModificationDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@ModificationUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@IsActualCustomer", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ShipmentWeight", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@ShipmentCBM", SqlDbType.NVarChar));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarCRM_Services ObjCVarCRM_Services in SaveList)
                {
                    if (ObjCVarCRM_Services.mIsChanges == true)
                    {
                        if (ObjCVarCRM_Services.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemCRM_Services";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarCRM_Services.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemCRM_Services";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarCRM_Services.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarCRM_Services.ID;
                        }
                        Com.Parameters["@CommodityID"].Value = ObjCVarCRM_Services.CommodityID;
                        Com.Parameters["@ActivityID"].Value = ObjCVarCRM_Services.ActivityID;
                        Com.Parameters["@EquipmentID"].Value = ObjCVarCRM_Services.EquipmentID;
                        Com.Parameters["@PickUpCountryID"].Value = ObjCVarCRM_Services.PickUpCountryID;
                        Com.Parameters["@PickUpPortID"].Value = ObjCVarCRM_Services.PickUpPortID;
                        Com.Parameters["@PickUpAddress"].Value = ObjCVarCRM_Services.PickUpAddress;
                        Com.Parameters["@DeliveryCountryID"].Value = ObjCVarCRM_Services.DeliveryCountryID;
                        Com.Parameters["@DeliveryPortID"].Value = ObjCVarCRM_Services.DeliveryPortID;
                        Com.Parameters["@DeliveryAddress"].Value = ObjCVarCRM_Services.DeliveryAddress;
                        Com.Parameters["@ClientsID"].Value = ObjCVarCRM_Services.ClientsID;
                        Com.Parameters["@CreationDate"].Value = ObjCVarCRM_Services.CreationDate;
                        Com.Parameters["@CreatorUserID"].Value = ObjCVarCRM_Services.CreatorUserID;
                        Com.Parameters["@ModificationDate"].Value = ObjCVarCRM_Services.ModificationDate;
                        Com.Parameters["@ModificationUserID"].Value = ObjCVarCRM_Services.ModificationUserID;
                        Com.Parameters["@IsActualCustomer"].Value = ObjCVarCRM_Services.IsActualCustomer;
                        Com.Parameters["@ShipmentWeight"].Value = ObjCVarCRM_Services.ShipmentWeight;
                        Com.Parameters["@ShipmentCBM"].Value = ObjCVarCRM_Services.ShipmentCBM;
                        EndTrans(Com, Con);
                        if (ObjCVarCRM_Services.ID == 0)
                        {
                            ObjCVarCRM_Services.ID = Convert.ToInt32(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarCRM_Services.mIsChanges = false;
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

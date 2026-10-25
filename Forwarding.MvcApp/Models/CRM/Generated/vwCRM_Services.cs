using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.CRM.CRM_Clients.Generated
{
    [Serializable]
    public class CPKvwCRM_Services
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
    public partial class CVarvwCRM_Services : CPKvwCRM_Services
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mCommodityID;
        internal String mCommodityName;
        internal Int32 mActivityID;
        internal String mActivityName;
        internal Int32 mEquipmentID;
        internal String mEquipmentName;
        internal Int32 mPickUpCountryID;
        internal String mPickUpCountryName;
        internal Int32 mPickUpPortID;
        internal String mPickUpPortName;
        internal String mPickUpAddress;
        internal Int32 mDeliveryCountryID;
        internal String mDeliveryCountryName;
        internal Int32 mDeliveryPortID;
        internal String mDeliveryPortName;
        internal String mDeliveryAddress;
        internal Int32 mClientsID;
        internal String mClientName;
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
            set { mCommodityID = value; }
        }
        public String CommodityName
        {
            get { return mCommodityName; }
            set { mCommodityName = value; }
        }
        public Int32 ActivityID
        {
            get { return mActivityID; }
            set { mActivityID = value; }
        }
        public String ActivityName
        {
            get { return mActivityName; }
            set { mActivityName = value; }
        }
        public Int32 EquipmentID
        {
            get { return mEquipmentID; }
            set { mEquipmentID = value; }
        }
        public String EquipmentName
        {
            get { return mEquipmentName; }
            set { mEquipmentName = value; }
        }
        public Int32 PickUpCountryID
        {
            get { return mPickUpCountryID; }
            set { mPickUpCountryID = value; }
        }
        public String PickUpCountryName
        {
            get { return mPickUpCountryName; }
            set { mPickUpCountryName = value; }
        }
        public Int32 PickUpPortID
        {
            get { return mPickUpPortID; }
            set { mPickUpPortID = value; }
        }
        public String PickUpPortName
        {
            get { return mPickUpPortName; }
            set { mPickUpPortName = value; }
        }
        public String PickUpAddress
        {
            get { return mPickUpAddress; }
            set { mPickUpAddress = value; }
        }
        public Int32 DeliveryCountryID
        {
            get { return mDeliveryCountryID; }
            set { mDeliveryCountryID = value; }
        }
        public String DeliveryCountryName
        {
            get { return mDeliveryCountryName; }
            set { mDeliveryCountryName = value; }
        }
        public Int32 DeliveryPortID
        {
            get { return mDeliveryPortID; }
            set { mDeliveryPortID = value; }
        }
        public String DeliveryPortName
        {
            get { return mDeliveryPortName; }
            set { mDeliveryPortName = value; }
        }
        public String DeliveryAddress
        {
            get { return mDeliveryAddress; }
            set { mDeliveryAddress = value; }
        }
        public Int32 ClientsID
        {
            get { return mClientsID; }
            set { mClientsID = value; }
        }
        public String ClientName
        {
            get { return mClientName; }
            set { mClientName = value; }
        }
        public DateTime CreationDate
        {
            get { return mCreationDate; }
            set { mCreationDate = value; }
        }
        public Int32 CreatorUserID
        {
            get { return mCreatorUserID; }
            set { mCreatorUserID = value; }
        }
        public DateTime ModificationDate
        {
            get { return mModificationDate; }
            set { mModificationDate = value; }
        }
        public Int32 ModificationUserID
        {
            get { return mModificationUserID; }
            set { mModificationUserID = value; }
        }
        public Int32 IsActualCustomer
        {
            get { return mIsActualCustomer; }
            set { mIsActualCustomer = value; }
        }
        public String ShipmentWeight
        {
            get { return mShipmentWeight; }
            set { mShipmentWeight = value; }
        }
        public String ShipmentCBM
        {
            get { return mShipmentCBM; }
            set { mShipmentCBM = value; }
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

    public partial class CvwCRM_Services
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
        public List<CVarvwCRM_Services> lstCVarvwCRM_Services = new List<CVarvwCRM_Services>();
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
            lstCVarvwCRM_Services.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwCRM_Services";
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
                        CVarvwCRM_Services ObjCVarvwCRM_Services = new CVarvwCRM_Services();
                        ObjCVarvwCRM_Services.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwCRM_Services.mCommodityID = Convert.ToInt32(dr["CommodityID"].ToString());
                        ObjCVarvwCRM_Services.mCommodityName = Convert.ToString(dr["CommodityName"].ToString());
                        ObjCVarvwCRM_Services.mActivityID = Convert.ToInt32(dr["ActivityID"].ToString());
                        ObjCVarvwCRM_Services.mActivityName = Convert.ToString(dr["ActivityName"].ToString());
                        ObjCVarvwCRM_Services.mEquipmentID = Convert.ToInt32(dr["EquipmentID"].ToString());
                        ObjCVarvwCRM_Services.mEquipmentName = Convert.ToString(dr["EquipmentName"].ToString());
                        ObjCVarvwCRM_Services.mPickUpCountryID = Convert.ToInt32(dr["PickUpCountryID"].ToString());
                        ObjCVarvwCRM_Services.mPickUpCountryName = Convert.ToString(dr["PickUpCountryName"].ToString());
                        ObjCVarvwCRM_Services.mPickUpPortID = Convert.ToInt32(dr["PickUpPortID"].ToString());
                        ObjCVarvwCRM_Services.mPickUpPortName = Convert.ToString(dr["PickUpPortName"].ToString());
                        ObjCVarvwCRM_Services.mPickUpAddress = Convert.ToString(dr["PickUpAddress"].ToString());
                        ObjCVarvwCRM_Services.mDeliveryCountryID = Convert.ToInt32(dr["DeliveryCountryID"].ToString());
                        ObjCVarvwCRM_Services.mDeliveryCountryName = Convert.ToString(dr["DeliveryCountryName"].ToString());
                        ObjCVarvwCRM_Services.mDeliveryPortID = Convert.ToInt32(dr["DeliveryPortID"].ToString());
                        ObjCVarvwCRM_Services.mDeliveryPortName = Convert.ToString(dr["DeliveryPortName"].ToString());
                        ObjCVarvwCRM_Services.mDeliveryAddress = Convert.ToString(dr["DeliveryAddress"].ToString());
                        ObjCVarvwCRM_Services.mClientsID = Convert.ToInt32(dr["ClientsID"].ToString());
                        ObjCVarvwCRM_Services.mClientName = Convert.ToString(dr["ClientName"].ToString());
                        ObjCVarvwCRM_Services.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarvwCRM_Services.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarvwCRM_Services.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarvwCRM_Services.mModificationUserID = Convert.ToInt32(dr["ModificationUserID"].ToString());
                        ObjCVarvwCRM_Services.mIsActualCustomer = Convert.ToInt32(dr["IsActualCustomer"].ToString());
                        ObjCVarvwCRM_Services.mShipmentWeight = Convert.ToString(dr["ShipmentWeight"].ToString());
                        ObjCVarvwCRM_Services.mShipmentCBM = Convert.ToString(dr["ShipmentCBM"].ToString());
                        lstCVarvwCRM_Services.Add(ObjCVarvwCRM_Services);
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
            lstCVarvwCRM_Services.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwCRM_Services";
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
                        CVarvwCRM_Services ObjCVarvwCRM_Services = new CVarvwCRM_Services();
                        ObjCVarvwCRM_Services.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwCRM_Services.mCommodityID = Convert.ToInt32(dr["CommodityID"].ToString());
                        ObjCVarvwCRM_Services.mCommodityName = Convert.ToString(dr["CommodityName"].ToString());
                        ObjCVarvwCRM_Services.mActivityID = Convert.ToInt32(dr["ActivityID"].ToString());
                        ObjCVarvwCRM_Services.mActivityName = Convert.ToString(dr["ActivityName"].ToString());
                        ObjCVarvwCRM_Services.mEquipmentID = Convert.ToInt32(dr["EquipmentID"].ToString());
                        ObjCVarvwCRM_Services.mEquipmentName = Convert.ToString(dr["EquipmentName"].ToString());
                        ObjCVarvwCRM_Services.mPickUpCountryID = Convert.ToInt32(dr["PickUpCountryID"].ToString());
                        ObjCVarvwCRM_Services.mPickUpCountryName = Convert.ToString(dr["PickUpCountryName"].ToString());
                        ObjCVarvwCRM_Services.mPickUpPortID = Convert.ToInt32(dr["PickUpPortID"].ToString());
                        ObjCVarvwCRM_Services.mPickUpPortName = Convert.ToString(dr["PickUpPortName"].ToString());
                        ObjCVarvwCRM_Services.mPickUpAddress = Convert.ToString(dr["PickUpAddress"].ToString());
                        ObjCVarvwCRM_Services.mDeliveryCountryID = Convert.ToInt32(dr["DeliveryCountryID"].ToString());
                        ObjCVarvwCRM_Services.mDeliveryCountryName = Convert.ToString(dr["DeliveryCountryName"].ToString());
                        ObjCVarvwCRM_Services.mDeliveryPortID = Convert.ToInt32(dr["DeliveryPortID"].ToString());
                        ObjCVarvwCRM_Services.mDeliveryPortName = Convert.ToString(dr["DeliveryPortName"].ToString());
                        ObjCVarvwCRM_Services.mDeliveryAddress = Convert.ToString(dr["DeliveryAddress"].ToString());
                        ObjCVarvwCRM_Services.mClientsID = Convert.ToInt32(dr["ClientsID"].ToString());
                        ObjCVarvwCRM_Services.mClientName = Convert.ToString(dr["ClientName"].ToString());
                        ObjCVarvwCRM_Services.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarvwCRM_Services.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarvwCRM_Services.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarvwCRM_Services.mModificationUserID = Convert.ToInt32(dr["ModificationUserID"].ToString());
                        ObjCVarvwCRM_Services.mIsActualCustomer = Convert.ToInt32(dr["IsActualCustomer"].ToString());
                        ObjCVarvwCRM_Services.mShipmentWeight = Convert.ToString(dr["ShipmentWeight"].ToString());
                        ObjCVarvwCRM_Services.mShipmentCBM = Convert.ToString(dr["ShipmentCBM"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwCRM_Services.Add(ObjCVarvwCRM_Services);
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

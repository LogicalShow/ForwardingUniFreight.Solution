using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.Warehousing.MasterData.Generated
{
    [Serializable]
    public class CPKvwWH_Row
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
    public partial class CVarvwWH_Row : CPKvwWH_Row
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal String mName;
        internal String mAreaName;
        internal Int32 mWarehouseID;
        internal String mWarehouseCode;
        internal String mWarehouseName;
        internal Int32 mMainWarehouseID;
        internal String mMainWarehouseCode;
        internal Int32 mAreaID;
        internal Int32 mNumberOfLevelsPerRow;
        internal Int32 mNumberOfTraysPerLevel;
        internal Decimal mMaxWeight;
        internal Int32 mWeightUnitID;
        internal String mWeightUnitCode;
        internal Decimal mMaxVolume;
        internal Int32 mVolumeUnitID;
        internal String mVolumeUnitCode;
        internal Decimal mLocationLength;
        internal Decimal mLocationWidth;
        internal Int32 mLengthUnitID;
        internal String mLengthUnitCode;
        internal Int32 mCreatorUserID;
        internal DateTime mCreationDate;
        internal Int32 mModificatorUserID;
        internal DateTime mModificationDate;
        #endregion

        #region "Methods"
        public String Name
        {
            get { return mName; }
            set { mName = value; }
        }
        public String AreaName
        {
            get { return mAreaName; }
            set { mAreaName = value; }
        }
        public Int32 WarehouseID
        {
            get { return mWarehouseID; }
            set { mWarehouseID = value; }
        }
        public String WarehouseCode
        {
            get { return mWarehouseCode; }
            set { mWarehouseCode = value; }
        }
        public String WarehouseName
        {
            get { return mWarehouseName; }
            set { mWarehouseName = value; }
        }
        public Int32 MainWarehouseID
        {
            get { return mMainWarehouseID; }
            set { mMainWarehouseID = value; }
        }
        public String MainWarehouseCode
        {
            get { return mMainWarehouseCode; }
            set { mMainWarehouseCode = value; }
        }
        public Int32 AreaID
        {
            get { return mAreaID; }
            set { mAreaID = value; }
        }
        public Int32 NumberOfLevelsPerRow
        {
            get { return mNumberOfLevelsPerRow; }
            set { mNumberOfLevelsPerRow = value; }
        }
        public Int32 NumberOfTraysPerLevel
        {
            get { return mNumberOfTraysPerLevel; }
            set { mNumberOfTraysPerLevel = value; }
        }
        public Decimal MaxWeight
        {
            get { return mMaxWeight; }
            set { mMaxWeight = value; }
        }
        public Int32 WeightUnitID
        {
            get { return mWeightUnitID; }
            set { mWeightUnitID = value; }
        }
        public String WeightUnitCode
        {
            get { return mWeightUnitCode; }
            set { mWeightUnitCode = value; }
        }
        public Decimal MaxVolume
        {
            get { return mMaxVolume; }
            set { mMaxVolume = value; }
        }
        public Int32 VolumeUnitID
        {
            get { return mVolumeUnitID; }
            set { mVolumeUnitID = value; }
        }
        public String VolumeUnitCode
        {
            get { return mVolumeUnitCode; }
            set { mVolumeUnitCode = value; }
        }
        public Decimal LocationLength
        {
            get { return mLocationLength; }
            set { mLocationLength = value; }
        }
        public Decimal LocationWidth
        {
            get { return mLocationWidth; }
            set { mLocationWidth = value; }
        }
        public Int32 LengthUnitID
        {
            get { return mLengthUnitID; }
            set { mLengthUnitID = value; }
        }
        public String LengthUnitCode
        {
            get { return mLengthUnitCode; }
            set { mLengthUnitCode = value; }
        }
        public Int32 CreatorUserID
        {
            get { return mCreatorUserID; }
            set { mCreatorUserID = value; }
        }
        public DateTime CreationDate
        {
            get { return mCreationDate; }
            set { mCreationDate = value; }
        }
        public Int32 ModificatorUserID
        {
            get { return mModificatorUserID; }
            set { mModificatorUserID = value; }
        }
        public DateTime ModificationDate
        {
            get { return mModificationDate; }
            set { mModificationDate = value; }
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

    public partial class CvwWH_Row
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
        public List<CVarvwWH_Row> lstCVarvwWH_Row = new List<CVarvwWH_Row>();
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
            lstCVarvwWH_Row.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwWH_Row";
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
                        CVarvwWH_Row ObjCVarvwWH_Row = new CVarvwWH_Row();
                        ObjCVarvwWH_Row.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwWH_Row.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarvwWH_Row.mAreaName = Convert.ToString(dr["AreaName"].ToString());
                        ObjCVarvwWH_Row.mWarehouseID = Convert.ToInt32(dr["WarehouseID"].ToString());
                        ObjCVarvwWH_Row.mWarehouseCode = Convert.ToString(dr["WarehouseCode"].ToString());
                        ObjCVarvwWH_Row.mWarehouseName = Convert.ToString(dr["WarehouseName"].ToString());
                        ObjCVarvwWH_Row.mMainWarehouseID = Convert.ToInt32(dr["MainWarehouseID"].ToString());
                        ObjCVarvwWH_Row.mMainWarehouseCode = Convert.ToString(dr["MainWarehouseCode"].ToString());
                        ObjCVarvwWH_Row.mAreaID = Convert.ToInt32(dr["AreaID"].ToString());
                        ObjCVarvwWH_Row.mNumberOfLevelsPerRow = Convert.ToInt32(dr["NumberOfLevelsPerRow"].ToString());
                        ObjCVarvwWH_Row.mNumberOfTraysPerLevel = Convert.ToInt32(dr["NumberOfTraysPerLevel"].ToString());
                        ObjCVarvwWH_Row.mMaxWeight = Convert.ToDecimal(dr["MaxWeight"].ToString());
                        ObjCVarvwWH_Row.mWeightUnitID = Convert.ToInt32(dr["WeightUnitID"].ToString());
                        ObjCVarvwWH_Row.mWeightUnitCode = Convert.ToString(dr["WeightUnitCode"].ToString());
                        ObjCVarvwWH_Row.mMaxVolume = Convert.ToDecimal(dr["MaxVolume"].ToString());
                        ObjCVarvwWH_Row.mVolumeUnitID = Convert.ToInt32(dr["VolumeUnitID"].ToString());
                        ObjCVarvwWH_Row.mVolumeUnitCode = Convert.ToString(dr["VolumeUnitCode"].ToString());
                        ObjCVarvwWH_Row.mLocationLength = Convert.ToDecimal(dr["LocationLength"].ToString());
                        ObjCVarvwWH_Row.mLocationWidth = Convert.ToDecimal(dr["LocationWidth"].ToString());
                        ObjCVarvwWH_Row.mLengthUnitID = Convert.ToInt32(dr["LengthUnitID"].ToString());
                        ObjCVarvwWH_Row.mLengthUnitCode = Convert.ToString(dr["LengthUnitCode"].ToString());
                        ObjCVarvwWH_Row.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarvwWH_Row.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarvwWH_Row.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarvwWH_Row.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        lstCVarvwWH_Row.Add(ObjCVarvwWH_Row);
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
            lstCVarvwWH_Row.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwWH_Row";
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
                        CVarvwWH_Row ObjCVarvwWH_Row = new CVarvwWH_Row();
                        ObjCVarvwWH_Row.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwWH_Row.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarvwWH_Row.mAreaName = Convert.ToString(dr["AreaName"].ToString());
                        ObjCVarvwWH_Row.mWarehouseID = Convert.ToInt32(dr["WarehouseID"].ToString());
                        ObjCVarvwWH_Row.mWarehouseCode = Convert.ToString(dr["WarehouseCode"].ToString());
                        ObjCVarvwWH_Row.mWarehouseName = Convert.ToString(dr["WarehouseName"].ToString());
                        ObjCVarvwWH_Row.mMainWarehouseID = Convert.ToInt32(dr["MainWarehouseID"].ToString());
                        ObjCVarvwWH_Row.mMainWarehouseCode = Convert.ToString(dr["MainWarehouseCode"].ToString());
                        ObjCVarvwWH_Row.mAreaID = Convert.ToInt32(dr["AreaID"].ToString());
                        ObjCVarvwWH_Row.mNumberOfLevelsPerRow = Convert.ToInt32(dr["NumberOfLevelsPerRow"].ToString());
                        ObjCVarvwWH_Row.mNumberOfTraysPerLevel = Convert.ToInt32(dr["NumberOfTraysPerLevel"].ToString());
                        ObjCVarvwWH_Row.mMaxWeight = Convert.ToDecimal(dr["MaxWeight"].ToString());
                        ObjCVarvwWH_Row.mWeightUnitID = Convert.ToInt32(dr["WeightUnitID"].ToString());
                        ObjCVarvwWH_Row.mWeightUnitCode = Convert.ToString(dr["WeightUnitCode"].ToString());
                        ObjCVarvwWH_Row.mMaxVolume = Convert.ToDecimal(dr["MaxVolume"].ToString());
                        ObjCVarvwWH_Row.mVolumeUnitID = Convert.ToInt32(dr["VolumeUnitID"].ToString());
                        ObjCVarvwWH_Row.mVolumeUnitCode = Convert.ToString(dr["VolumeUnitCode"].ToString());
                        ObjCVarvwWH_Row.mLocationLength = Convert.ToDecimal(dr["LocationLength"].ToString());
                        ObjCVarvwWH_Row.mLocationWidth = Convert.ToDecimal(dr["LocationWidth"].ToString());
                        ObjCVarvwWH_Row.mLengthUnitID = Convert.ToInt32(dr["LengthUnitID"].ToString());
                        ObjCVarvwWH_Row.mLengthUnitCode = Convert.ToString(dr["LengthUnitCode"].ToString());
                        ObjCVarvwWH_Row.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarvwWH_Row.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarvwWH_Row.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarvwWH_Row.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwWH_Row.Add(ObjCVarvwWH_Row);
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

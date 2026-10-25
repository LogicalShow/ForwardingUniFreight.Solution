using System;
using System.Data;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.Warehousing.MasterData.Generated
{
    [Serializable]
    public class CPKWH_Row
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
    public partial class CVarWH_Row : CPKWH_Row
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal String mName;
        internal Int32 mAreaID;
        internal Int32 mNumberOfLevelsPerRow;
        internal Int32 mNumberOfTraysPerLevel;
        internal Decimal mMaxWeight;
        internal Int32 mWeightUnitID;
        internal Decimal mMaxVolume;
        internal Int32 mVolumeUnitID;
        internal Int32 mCreatorUserID;
        internal DateTime mCreationDate;
        internal Int32 mModificatorUserID;
        internal DateTime mModificationDate;
        internal Decimal mLocationLength;
        internal Decimal mLocationWidth;
        internal Int32 mLengthUnitID;
        #endregion

        #region "Methods"
        public String Name
        {
            get { return mName; }
            set { mIsChanges = true; mName = value; }
        }
        public Int32 AreaID
        {
            get { return mAreaID; }
            set { mIsChanges = true; mAreaID = value; }
        }
        public Int32 NumberOfLevelsPerRow
        {
            get { return mNumberOfLevelsPerRow; }
            set { mIsChanges = true; mNumberOfLevelsPerRow = value; }
        }
        public Int32 NumberOfTraysPerLevel
        {
            get { return mNumberOfTraysPerLevel; }
            set { mIsChanges = true; mNumberOfTraysPerLevel = value; }
        }
        public Decimal MaxWeight
        {
            get { return mMaxWeight; }
            set { mIsChanges = true; mMaxWeight = value; }
        }
        public Int32 WeightUnitID
        {
            get { return mWeightUnitID; }
            set { mIsChanges = true; mWeightUnitID = value; }
        }
        public Decimal MaxVolume
        {
            get { return mMaxVolume; }
            set { mIsChanges = true; mMaxVolume = value; }
        }
        public Int32 VolumeUnitID
        {
            get { return mVolumeUnitID; }
            set { mIsChanges = true; mVolumeUnitID = value; }
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
        public Decimal LocationLength
        {
            get { return mLocationLength; }
            set { mIsChanges = true; mLocationLength = value; }
        }
        public Decimal LocationWidth
        {
            get { return mLocationWidth; }
            set { mIsChanges = true; mLocationWidth = value; }
        }
        public Int32 LengthUnitID
        {
            get { return mLengthUnitID; }
            set { mIsChanges = true; mLengthUnitID = value; }
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

    public partial class CWH_Row
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
        public List<CVarWH_Row> lstCVarWH_Row = new List<CVarWH_Row>();
        public List<CPKWH_Row> lstDeletedCPKWH_Row = new List<CPKWH_Row>();
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
            lstCVarWH_Row.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListWH_Row";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemWH_Row";
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
                        CVarWH_Row ObjCVarWH_Row = new CVarWH_Row();
                        ObjCVarWH_Row.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarWH_Row.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarWH_Row.mAreaID = Convert.ToInt32(dr["AreaID"].ToString());
                        ObjCVarWH_Row.mNumberOfLevelsPerRow = Convert.ToInt32(dr["NumberOfLevelsPerRow"].ToString());
                        ObjCVarWH_Row.mNumberOfTraysPerLevel = Convert.ToInt32(dr["NumberOfTraysPerLevel"].ToString());
                        ObjCVarWH_Row.mMaxWeight = Convert.ToDecimal(dr["MaxWeight"].ToString());
                        ObjCVarWH_Row.mWeightUnitID = Convert.ToInt32(dr["WeightUnitID"].ToString());
                        ObjCVarWH_Row.mMaxVolume = Convert.ToDecimal(dr["MaxVolume"].ToString());
                        ObjCVarWH_Row.mVolumeUnitID = Convert.ToInt32(dr["VolumeUnitID"].ToString());
                        ObjCVarWH_Row.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarWH_Row.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarWH_Row.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarWH_Row.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarWH_Row.mLocationLength = Convert.ToDecimal(dr["LocationLength"].ToString());
                        ObjCVarWH_Row.mLocationWidth = Convert.ToDecimal(dr["LocationWidth"].ToString());
                        ObjCVarWH_Row.mLengthUnitID = Convert.ToInt32(dr["LengthUnitID"].ToString());
                        lstCVarWH_Row.Add(ObjCVarWH_Row);
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
            lstCVarWH_Row.Clear();

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
                Com.CommandText = "[dbo].GetListPagingWH_Row";
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
                        CVarWH_Row ObjCVarWH_Row = new CVarWH_Row();
                        ObjCVarWH_Row.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarWH_Row.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarWH_Row.mAreaID = Convert.ToInt32(dr["AreaID"].ToString());
                        ObjCVarWH_Row.mNumberOfLevelsPerRow = Convert.ToInt32(dr["NumberOfLevelsPerRow"].ToString());
                        ObjCVarWH_Row.mNumberOfTraysPerLevel = Convert.ToInt32(dr["NumberOfTraysPerLevel"].ToString());
                        ObjCVarWH_Row.mMaxWeight = Convert.ToDecimal(dr["MaxWeight"].ToString());
                        ObjCVarWH_Row.mWeightUnitID = Convert.ToInt32(dr["WeightUnitID"].ToString());
                        ObjCVarWH_Row.mMaxVolume = Convert.ToDecimal(dr["MaxVolume"].ToString());
                        ObjCVarWH_Row.mVolumeUnitID = Convert.ToInt32(dr["VolumeUnitID"].ToString());
                        ObjCVarWH_Row.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarWH_Row.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarWH_Row.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarWH_Row.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarWH_Row.mLocationLength = Convert.ToDecimal(dr["LocationLength"].ToString());
                        ObjCVarWH_Row.mLocationWidth = Convert.ToDecimal(dr["LocationWidth"].ToString());
                        ObjCVarWH_Row.mLengthUnitID = Convert.ToInt32(dr["LengthUnitID"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarWH_Row.Add(ObjCVarWH_Row);
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
                    Com.CommandText = "[dbo].DeleteListWH_Row";
                else
                    Com.CommandText = "[dbo].UpdateListWH_Row";
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
        public Exception DeleteItem(List<CPKWH_Row> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemWH_Row";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int));
                foreach (CPKWH_Row ObjCPKWH_Row in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt32(ObjCPKWH_Row.ID);
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
        public Exception SaveMethod(List<CVarWH_Row> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@AreaID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@NumberOfLevelsPerRow", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@NumberOfTraysPerLevel", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@MaxWeight", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@WeightUnitID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@MaxVolume", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@VolumeUnitID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CreatorUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CreationDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@ModificatorUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ModificationDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@LocationLength", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@LocationWidth", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@LengthUnitID", SqlDbType.Int));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarWH_Row ObjCVarWH_Row in SaveList)
                {
                    if (ObjCVarWH_Row.mIsChanges == true)
                    {
                        if (ObjCVarWH_Row.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemWH_Row";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarWH_Row.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemWH_Row";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarWH_Row.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarWH_Row.ID;
                        }
                        Com.Parameters["@Name"].Value = ObjCVarWH_Row.Name;
                        Com.Parameters["@AreaID"].Value = ObjCVarWH_Row.AreaID;
                        Com.Parameters["@NumberOfLevelsPerRow"].Value = ObjCVarWH_Row.NumberOfLevelsPerRow;
                        Com.Parameters["@NumberOfTraysPerLevel"].Value = ObjCVarWH_Row.NumberOfTraysPerLevel;
                        Com.Parameters["@MaxWeight"].Value = ObjCVarWH_Row.MaxWeight;
                        Com.Parameters["@WeightUnitID"].Value = ObjCVarWH_Row.WeightUnitID;
                        Com.Parameters["@MaxVolume"].Value = ObjCVarWH_Row.MaxVolume;
                        Com.Parameters["@VolumeUnitID"].Value = ObjCVarWH_Row.VolumeUnitID;
                        Com.Parameters["@CreatorUserID"].Value = ObjCVarWH_Row.CreatorUserID;
                        Com.Parameters["@CreationDate"].Value = ObjCVarWH_Row.CreationDate;
                        Com.Parameters["@ModificatorUserID"].Value = ObjCVarWH_Row.ModificatorUserID;
                        Com.Parameters["@ModificationDate"].Value = ObjCVarWH_Row.ModificationDate;
                        Com.Parameters["@LocationLength"].Value = ObjCVarWH_Row.LocationLength;
                        Com.Parameters["@LocationWidth"].Value = ObjCVarWH_Row.LocationWidth;
                        Com.Parameters["@LengthUnitID"].Value = ObjCVarWH_Row.LengthUnitID;
                        EndTrans(Com, Con);
                        if (ObjCVarWH_Row.ID == 0)
                        {
                            ObjCVarWH_Row.ID = Convert.ToInt32(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarWH_Row.mIsChanges = false;
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

using System;
using System.Data;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.MasterData.Others.Generated
{
    [Serializable]
    public class CPKServiceDepartment
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
    public partial class CVarServiceDepartment : CPKServiceDepartment
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mMoveTypeID;
        internal Int32 mDepartmentID;
        internal Int32 mViewOrder;
        internal String mNotes;
        internal Int32 mCreatorUserID;
        internal DateTime mCreationDate;
        internal Int32 mModificatorUserID;
        internal DateTime mModificationDate;
        internal Boolean mOpenDate;
        internal Boolean mCloseDate;
        internal Boolean mCutOffDate;
        internal Boolean mPODate;
        internal Boolean mReleaseDate;
        internal Boolean mETAPOLDate;
        internal Boolean mATAPOLDate;
        internal Boolean mExpectedDeparture;
        internal Boolean mActualDeparture;
        internal Boolean mExpectedArrival;
        internal Boolean mActualArrival;
        internal Boolean mGateInDate;
        internal Boolean mGateOutDate;
        internal Boolean mStuffingDate;
        internal Boolean mDeliveryDate;
        internal Boolean mCertificateDate;
        internal Boolean mQasimaDate;
        #endregion

        #region "Methods"
        public Int32 MoveTypeID
        {
            get { return mMoveTypeID; }
            set { mIsChanges = true; mMoveTypeID = value; }
        }
        public Int32 DepartmentID
        {
            get { return mDepartmentID; }
            set { mIsChanges = true; mDepartmentID = value; }
        }
        public Int32 ViewOrder
        {
            get { return mViewOrder; }
            set { mIsChanges = true; mViewOrder = value; }
        }
        public String Notes
        {
            get { return mNotes; }
            set { mIsChanges = true; mNotes = value; }
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
        public Boolean OpenDate
        {
            get { return mOpenDate; }
            set { mIsChanges = true; mOpenDate = value; }
        }
        public Boolean CloseDate
        {
            get { return mCloseDate; }
            set { mIsChanges = true; mCloseDate = value; }
        }
        public Boolean CutOffDate
        {
            get { return mCutOffDate; }
            set { mIsChanges = true; mCutOffDate = value; }
        }
        public Boolean PODate
        {
            get { return mPODate; }
            set { mIsChanges = true; mPODate = value; }
        }
        public Boolean ReleaseDate
        {
            get { return mReleaseDate; }
            set { mIsChanges = true; mReleaseDate = value; }
        }
        public Boolean ETAPOLDate
        {
            get { return mETAPOLDate; }
            set { mIsChanges = true; mETAPOLDate = value; }
        }
        public Boolean ATAPOLDate
        {
            get { return mATAPOLDate; }
            set { mIsChanges = true; mATAPOLDate = value; }
        }
        public Boolean ExpectedDeparture
        {
            get { return mExpectedDeparture; }
            set { mIsChanges = true; mExpectedDeparture = value; }
        }
        public Boolean ActualDeparture
        {
            get { return mActualDeparture; }
            set { mIsChanges = true; mActualDeparture = value; }
        }
        public Boolean ExpectedArrival
        {
            get { return mExpectedArrival; }
            set { mIsChanges = true; mExpectedArrival = value; }
        }
        public Boolean ActualArrival
        {
            get { return mActualArrival; }
            set { mIsChanges = true; mActualArrival = value; }
        }
        public Boolean GateInDate
        {
            get { return mGateInDate; }
            set { mIsChanges = true; mGateInDate = value; }
        }
        public Boolean GateOutDate
        {
            get { return mGateOutDate; }
            set { mIsChanges = true; mGateOutDate = value; }
        }
        public Boolean StuffingDate
        {
            get { return mStuffingDate; }
            set { mIsChanges = true; mStuffingDate = value; }
        }
        public Boolean DeliveryDate
        {
            get { return mDeliveryDate; }
            set { mIsChanges = true; mDeliveryDate = value; }
        }
        public Boolean CertificateDate
        {
            get { return mCertificateDate; }
            set { mIsChanges = true; mCertificateDate = value; }
        }
        public Boolean QasimaDate
        {
            get { return mQasimaDate; }
            set { mIsChanges = true; mQasimaDate = value; }
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

    public partial class CServiceDepartment
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
        public List<CVarServiceDepartment> lstCVarServiceDepartment = new List<CVarServiceDepartment>();
        public List<CPKServiceDepartment> lstDeletedCPKServiceDepartment = new List<CPKServiceDepartment>();
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
            lstCVarServiceDepartment.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListServiceDepartment";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemServiceDepartment";
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
                        CVarServiceDepartment ObjCVarServiceDepartment = new CVarServiceDepartment();
                        ObjCVarServiceDepartment.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarServiceDepartment.mMoveTypeID = Convert.ToInt32(dr["MoveTypeID"].ToString());
                        ObjCVarServiceDepartment.mDepartmentID = Convert.ToInt32(dr["DepartmentID"].ToString());
                        ObjCVarServiceDepartment.mViewOrder = Convert.ToInt32(dr["ViewOrder"].ToString());
                        ObjCVarServiceDepartment.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarServiceDepartment.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarServiceDepartment.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarServiceDepartment.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarServiceDepartment.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarServiceDepartment.mOpenDate = Convert.ToBoolean(dr["OpenDate"].ToString());
                        ObjCVarServiceDepartment.mCloseDate = Convert.ToBoolean(dr["CloseDate"].ToString());
                        ObjCVarServiceDepartment.mCutOffDate = Convert.ToBoolean(dr["CutOffDate"].ToString());
                        ObjCVarServiceDepartment.mPODate = Convert.ToBoolean(dr["PODate"].ToString());
                        ObjCVarServiceDepartment.mReleaseDate = Convert.ToBoolean(dr["ReleaseDate"].ToString());
                        ObjCVarServiceDepartment.mETAPOLDate = Convert.ToBoolean(dr["ETAPOLDate"].ToString());
                        ObjCVarServiceDepartment.mATAPOLDate = Convert.ToBoolean(dr["ATAPOLDate"].ToString());
                        ObjCVarServiceDepartment.mExpectedDeparture = Convert.ToBoolean(dr["ExpectedDeparture"].ToString());
                        ObjCVarServiceDepartment.mActualDeparture = Convert.ToBoolean(dr["ActualDeparture"].ToString());
                        ObjCVarServiceDepartment.mExpectedArrival = Convert.ToBoolean(dr["ExpectedArrival"].ToString());
                        ObjCVarServiceDepartment.mActualArrival = Convert.ToBoolean(dr["ActualArrival"].ToString());
                        ObjCVarServiceDepartment.mGateInDate = Convert.ToBoolean(dr["GateInDate"].ToString());
                        ObjCVarServiceDepartment.mGateOutDate = Convert.ToBoolean(dr["GateOutDate"].ToString());
                        ObjCVarServiceDepartment.mStuffingDate = Convert.ToBoolean(dr["StuffingDate"].ToString());
                        ObjCVarServiceDepartment.mDeliveryDate = Convert.ToBoolean(dr["DeliveryDate"].ToString());
                        ObjCVarServiceDepartment.mCertificateDate = Convert.ToBoolean(dr["CertificateDate"].ToString());
                        ObjCVarServiceDepartment.mQasimaDate = Convert.ToBoolean(dr["QasimaDate"].ToString());
                        lstCVarServiceDepartment.Add(ObjCVarServiceDepartment);
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
            lstCVarServiceDepartment.Clear();

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
                Com.CommandText = "[dbo].GetListPagingServiceDepartment";
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
                        CVarServiceDepartment ObjCVarServiceDepartment = new CVarServiceDepartment();
                        ObjCVarServiceDepartment.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarServiceDepartment.mMoveTypeID = Convert.ToInt32(dr["MoveTypeID"].ToString());
                        ObjCVarServiceDepartment.mDepartmentID = Convert.ToInt32(dr["DepartmentID"].ToString());
                        ObjCVarServiceDepartment.mViewOrder = Convert.ToInt32(dr["ViewOrder"].ToString());
                        ObjCVarServiceDepartment.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarServiceDepartment.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarServiceDepartment.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarServiceDepartment.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarServiceDepartment.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarServiceDepartment.mOpenDate = Convert.ToBoolean(dr["OpenDate"].ToString());
                        ObjCVarServiceDepartment.mCloseDate = Convert.ToBoolean(dr["CloseDate"].ToString());
                        ObjCVarServiceDepartment.mCutOffDate = Convert.ToBoolean(dr["CutOffDate"].ToString());
                        ObjCVarServiceDepartment.mPODate = Convert.ToBoolean(dr["PODate"].ToString());
                        ObjCVarServiceDepartment.mReleaseDate = Convert.ToBoolean(dr["ReleaseDate"].ToString());
                        ObjCVarServiceDepartment.mETAPOLDate = Convert.ToBoolean(dr["ETAPOLDate"].ToString());
                        ObjCVarServiceDepartment.mATAPOLDate = Convert.ToBoolean(dr["ATAPOLDate"].ToString());
                        ObjCVarServiceDepartment.mExpectedDeparture = Convert.ToBoolean(dr["ExpectedDeparture"].ToString());
                        ObjCVarServiceDepartment.mActualDeparture = Convert.ToBoolean(dr["ActualDeparture"].ToString());
                        ObjCVarServiceDepartment.mExpectedArrival = Convert.ToBoolean(dr["ExpectedArrival"].ToString());
                        ObjCVarServiceDepartment.mActualArrival = Convert.ToBoolean(dr["ActualArrival"].ToString());
                        ObjCVarServiceDepartment.mGateInDate = Convert.ToBoolean(dr["GateInDate"].ToString());
                        ObjCVarServiceDepartment.mGateOutDate = Convert.ToBoolean(dr["GateOutDate"].ToString());
                        ObjCVarServiceDepartment.mStuffingDate = Convert.ToBoolean(dr["StuffingDate"].ToString());
                        ObjCVarServiceDepartment.mDeliveryDate = Convert.ToBoolean(dr["DeliveryDate"].ToString());
                        ObjCVarServiceDepartment.mCertificateDate = Convert.ToBoolean(dr["CertificateDate"].ToString());
                        ObjCVarServiceDepartment.mQasimaDate = Convert.ToBoolean(dr["QasimaDate"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarServiceDepartment.Add(ObjCVarServiceDepartment);
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
                    Com.CommandText = "[dbo].DeleteListServiceDepartment";
                else
                    Com.CommandText = "[dbo].UpdateListServiceDepartment";
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
        public Exception DeleteItem(List<CPKServiceDepartment> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemServiceDepartment";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int));
                foreach (CPKServiceDepartment ObjCPKServiceDepartment in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt32(ObjCPKServiceDepartment.ID);
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
        public Exception SaveMethod(List<CVarServiceDepartment> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@MoveTypeID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@DepartmentID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ViewOrder", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@Notes", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@CreatorUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CreationDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@ModificatorUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ModificationDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@OpenDate", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@CloseDate", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@CutOffDate", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@PODate", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@ReleaseDate", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@ETAPOLDate", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@ATAPOLDate", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@ExpectedDeparture", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@ActualDeparture", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@ExpectedArrival", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@ActualArrival", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@GateInDate", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@GateOutDate", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@StuffingDate", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@DeliveryDate", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@CertificateDate", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@QasimaDate", SqlDbType.Bit));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarServiceDepartment ObjCVarServiceDepartment in SaveList)
                {
                    if (ObjCVarServiceDepartment.mIsChanges == true)
                    {
                        if (ObjCVarServiceDepartment.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemServiceDepartment";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarServiceDepartment.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemServiceDepartment";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarServiceDepartment.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarServiceDepartment.ID;
                        }
                        Com.Parameters["@MoveTypeID"].Value = ObjCVarServiceDepartment.MoveTypeID;
                        Com.Parameters["@DepartmentID"].Value = ObjCVarServiceDepartment.DepartmentID;
                        Com.Parameters["@ViewOrder"].Value = ObjCVarServiceDepartment.ViewOrder;
                        Com.Parameters["@Notes"].Value = ObjCVarServiceDepartment.Notes;
                        Com.Parameters["@CreatorUserID"].Value = ObjCVarServiceDepartment.CreatorUserID;
                        Com.Parameters["@CreationDate"].Value = ObjCVarServiceDepartment.CreationDate;
                        Com.Parameters["@ModificatorUserID"].Value = ObjCVarServiceDepartment.ModificatorUserID;
                        Com.Parameters["@ModificationDate"].Value = ObjCVarServiceDepartment.ModificationDate;
                        Com.Parameters["@OpenDate"].Value = ObjCVarServiceDepartment.OpenDate;
                        Com.Parameters["@CloseDate"].Value = ObjCVarServiceDepartment.CloseDate;
                        Com.Parameters["@CutOffDate"].Value = ObjCVarServiceDepartment.CutOffDate;
                        Com.Parameters["@PODate"].Value = ObjCVarServiceDepartment.PODate;
                        Com.Parameters["@ReleaseDate"].Value = ObjCVarServiceDepartment.ReleaseDate;
                        Com.Parameters["@ETAPOLDate"].Value = ObjCVarServiceDepartment.ETAPOLDate;
                        Com.Parameters["@ATAPOLDate"].Value = ObjCVarServiceDepartment.ATAPOLDate;
                        Com.Parameters["@ExpectedDeparture"].Value = ObjCVarServiceDepartment.ExpectedDeparture;
                        Com.Parameters["@ActualDeparture"].Value = ObjCVarServiceDepartment.ActualDeparture;
                        Com.Parameters["@ExpectedArrival"].Value = ObjCVarServiceDepartment.ExpectedArrival;
                        Com.Parameters["@ActualArrival"].Value = ObjCVarServiceDepartment.ActualArrival;
                        Com.Parameters["@GateInDate"].Value = ObjCVarServiceDepartment.GateInDate;
                        Com.Parameters["@GateOutDate"].Value = ObjCVarServiceDepartment.GateOutDate;
                        Com.Parameters["@StuffingDate"].Value = ObjCVarServiceDepartment.StuffingDate;
                        Com.Parameters["@DeliveryDate"].Value = ObjCVarServiceDepartment.DeliveryDate;
                        Com.Parameters["@CertificateDate"].Value = ObjCVarServiceDepartment.CertificateDate;
                        Com.Parameters["@QasimaDate"].Value = ObjCVarServiceDepartment.QasimaDate;
                        EndTrans(Com, Con);
                        if (ObjCVarServiceDepartment.ID == 0)
                        {
                            ObjCVarServiceDepartment.ID = Convert.ToInt32(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarServiceDepartment.mIsChanges = false;
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

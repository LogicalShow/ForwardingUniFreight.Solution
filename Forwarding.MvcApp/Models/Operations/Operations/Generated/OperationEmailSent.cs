using System;
using System.Data;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.Operations.Operations.Generated
{
    [Serializable]
    public class CPKOperationEmailSent
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
    public partial class CVarOperationEmailSent : CPKOperationEmailSent
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mDepartmentID;
        internal Int64 mOperationID;
        internal DateTime mOpenDate;
        internal DateTime mCloseDate;
        internal DateTime mCutOffDate;
        internal DateTime mPODate;
        internal DateTime mReleaseDate;
        internal DateTime mETAPOLDate;
        internal DateTime mATAPOLDate;
        internal DateTime mExpectedDeparture;
        internal DateTime mActualDeparture;
        internal DateTime mExpectedArrival;
        internal DateTime mActualArrival;
        internal DateTime mGateInDate;
        internal DateTime mGateOutDate;
        internal DateTime mStuffingDate;
        internal DateTime mDeliveryDate;
        internal DateTime mCertificateDate;
        internal DateTime mQasimaDate;
        #endregion

        #region "Methods"
        public Int32 DepartmentID
        {
            get { return mDepartmentID; }
            set { mIsChanges = true; mDepartmentID = value; }
        }
        public Int64 OperationID
        {
            get { return mOperationID; }
            set { mIsChanges = true; mOperationID = value; }
        }
        public DateTime OpenDate
        {
            get { return mOpenDate; }
            set { mIsChanges = true; mOpenDate = value; }
        }
        public DateTime CloseDate
        {
            get { return mCloseDate; }
            set { mIsChanges = true; mCloseDate = value; }
        }
        public DateTime CutOffDate
        {
            get { return mCutOffDate; }
            set { mIsChanges = true; mCutOffDate = value; }
        }
        public DateTime PODate
        {
            get { return mPODate; }
            set { mIsChanges = true; mPODate = value; }
        }
        public DateTime ReleaseDate
        {
            get { return mReleaseDate; }
            set { mIsChanges = true; mReleaseDate = value; }
        }
        public DateTime ETAPOLDate
        {
            get { return mETAPOLDate; }
            set { mIsChanges = true; mETAPOLDate = value; }
        }
        public DateTime ATAPOLDate
        {
            get { return mATAPOLDate; }
            set { mIsChanges = true; mATAPOLDate = value; }
        }
        public DateTime ExpectedDeparture
        {
            get { return mExpectedDeparture; }
            set { mIsChanges = true; mExpectedDeparture = value; }
        }
        public DateTime ActualDeparture
        {
            get { return mActualDeparture; }
            set { mIsChanges = true; mActualDeparture = value; }
        }
        public DateTime ExpectedArrival
        {
            get { return mExpectedArrival; }
            set { mIsChanges = true; mExpectedArrival = value; }
        }
        public DateTime ActualArrival
        {
            get { return mActualArrival; }
            set { mIsChanges = true; mActualArrival = value; }
        }
        public DateTime GateInDate
        {
            get { return mGateInDate; }
            set { mIsChanges = true; mGateInDate = value; }
        }
        public DateTime GateOutDate
        {
            get { return mGateOutDate; }
            set { mIsChanges = true; mGateOutDate = value; }
        }
        public DateTime StuffingDate
        {
            get { return mStuffingDate; }
            set { mIsChanges = true; mStuffingDate = value; }
        }
        public DateTime DeliveryDate
        {
            get { return mDeliveryDate; }
            set { mIsChanges = true; mDeliveryDate = value; }
        }
        public DateTime CertificateDate
        {
            get { return mCertificateDate; }
            set { mIsChanges = true; mCertificateDate = value; }
        }
        public DateTime QasimaDate
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

    public partial class COperationEmailSent
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
        public List<CVarOperationEmailSent> lstCVarOperationEmailSent = new List<CVarOperationEmailSent>();
        public List<CPKOperationEmailSent> lstDeletedCPKOperationEmailSent = new List<CPKOperationEmailSent>();
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
            lstCVarOperationEmailSent.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListOperationEmailSent";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemOperationEmailSent";
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
                        CVarOperationEmailSent ObjCVarOperationEmailSent = new CVarOperationEmailSent();
                        ObjCVarOperationEmailSent.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarOperationEmailSent.mDepartmentID = Convert.ToInt32(dr["DepartmentID"].ToString());
                        ObjCVarOperationEmailSent.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
                        ObjCVarOperationEmailSent.mOpenDate = Convert.ToDateTime(dr["OpenDate"].ToString());
                        ObjCVarOperationEmailSent.mCloseDate = Convert.ToDateTime(dr["CloseDate"].ToString());
                        ObjCVarOperationEmailSent.mCutOffDate = Convert.ToDateTime(dr["CutOffDate"].ToString());
                        ObjCVarOperationEmailSent.mPODate = Convert.ToDateTime(dr["PODate"].ToString());
                        ObjCVarOperationEmailSent.mReleaseDate = Convert.ToDateTime(dr["ReleaseDate"].ToString());
                        ObjCVarOperationEmailSent.mETAPOLDate = Convert.ToDateTime(dr["ETAPOLDate"].ToString());
                        ObjCVarOperationEmailSent.mATAPOLDate = Convert.ToDateTime(dr["ATAPOLDate"].ToString());
                        ObjCVarOperationEmailSent.mExpectedDeparture = Convert.ToDateTime(dr["ExpectedDeparture"].ToString());
                        ObjCVarOperationEmailSent.mActualDeparture = Convert.ToDateTime(dr["ActualDeparture"].ToString());
                        ObjCVarOperationEmailSent.mExpectedArrival = Convert.ToDateTime(dr["ExpectedArrival"].ToString());
                        ObjCVarOperationEmailSent.mActualArrival = Convert.ToDateTime(dr["ActualArrival"].ToString());
                        ObjCVarOperationEmailSent.mGateInDate = Convert.ToDateTime(dr["GateInDate"].ToString());
                        ObjCVarOperationEmailSent.mGateOutDate = Convert.ToDateTime(dr["GateOutDate"].ToString());
                        ObjCVarOperationEmailSent.mStuffingDate = Convert.ToDateTime(dr["StuffingDate"].ToString());
                        ObjCVarOperationEmailSent.mDeliveryDate = Convert.ToDateTime(dr["DeliveryDate"].ToString());
                        ObjCVarOperationEmailSent.mCertificateDate = Convert.ToDateTime(dr["CertificateDate"].ToString());
                        ObjCVarOperationEmailSent.mQasimaDate = Convert.ToDateTime(dr["QasimaDate"].ToString());
                        lstCVarOperationEmailSent.Add(ObjCVarOperationEmailSent);
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
            lstCVarOperationEmailSent.Clear();

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
                Com.CommandText = "[dbo].GetListPagingOperationEmailSent";
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
                        CVarOperationEmailSent ObjCVarOperationEmailSent = new CVarOperationEmailSent();
                        ObjCVarOperationEmailSent.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarOperationEmailSent.mDepartmentID = Convert.ToInt32(dr["DepartmentID"].ToString());
                        ObjCVarOperationEmailSent.mOperationID = Convert.ToInt64(dr["OperationID"].ToString());
                        ObjCVarOperationEmailSent.mOpenDate = Convert.ToDateTime(dr["OpenDate"].ToString());
                        ObjCVarOperationEmailSent.mCloseDate = Convert.ToDateTime(dr["CloseDate"].ToString());
                        ObjCVarOperationEmailSent.mCutOffDate = Convert.ToDateTime(dr["CutOffDate"].ToString());
                        ObjCVarOperationEmailSent.mPODate = Convert.ToDateTime(dr["PODate"].ToString());
                        ObjCVarOperationEmailSent.mReleaseDate = Convert.ToDateTime(dr["ReleaseDate"].ToString());
                        ObjCVarOperationEmailSent.mETAPOLDate = Convert.ToDateTime(dr["ETAPOLDate"].ToString());
                        ObjCVarOperationEmailSent.mATAPOLDate = Convert.ToDateTime(dr["ATAPOLDate"].ToString());
                        ObjCVarOperationEmailSent.mExpectedDeparture = Convert.ToDateTime(dr["ExpectedDeparture"].ToString());
                        ObjCVarOperationEmailSent.mActualDeparture = Convert.ToDateTime(dr["ActualDeparture"].ToString());
                        ObjCVarOperationEmailSent.mExpectedArrival = Convert.ToDateTime(dr["ExpectedArrival"].ToString());
                        ObjCVarOperationEmailSent.mActualArrival = Convert.ToDateTime(dr["ActualArrival"].ToString());
                        ObjCVarOperationEmailSent.mGateInDate = Convert.ToDateTime(dr["GateInDate"].ToString());
                        ObjCVarOperationEmailSent.mGateOutDate = Convert.ToDateTime(dr["GateOutDate"].ToString());
                        ObjCVarOperationEmailSent.mStuffingDate = Convert.ToDateTime(dr["StuffingDate"].ToString());
                        ObjCVarOperationEmailSent.mDeliveryDate = Convert.ToDateTime(dr["DeliveryDate"].ToString());
                        ObjCVarOperationEmailSent.mCertificateDate = Convert.ToDateTime(dr["CertificateDate"].ToString());
                        ObjCVarOperationEmailSent.mQasimaDate = Convert.ToDateTime(dr["QasimaDate"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarOperationEmailSent.Add(ObjCVarOperationEmailSent);
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
                    Com.CommandText = "[dbo].DeleteListOperationEmailSent";
                else
                    Com.CommandText = "[dbo].UpdateListOperationEmailSent";
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
        public Exception DeleteItem(List<CPKOperationEmailSent> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemOperationEmailSent";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt));
                foreach (CPKOperationEmailSent ObjCPKOperationEmailSent in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt64(ObjCPKOperationEmailSent.ID);
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
        public Exception SaveMethod(List<CVarOperationEmailSent> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@DepartmentID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@OperationID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@OpenDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@CloseDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@CutOffDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@PODate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@ReleaseDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@ETAPOLDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@ATAPOLDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@ExpectedDeparture", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@ActualDeparture", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@ExpectedArrival", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@ActualArrival", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@GateInDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@GateOutDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@StuffingDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@DeliveryDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@CertificateDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@QasimaDate", SqlDbType.DateTime));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarOperationEmailSent ObjCVarOperationEmailSent in SaveList)
                {
                    if (ObjCVarOperationEmailSent.mIsChanges == true)
                    {
                        if (ObjCVarOperationEmailSent.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemOperationEmailSent";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarOperationEmailSent.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemOperationEmailSent";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarOperationEmailSent.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarOperationEmailSent.ID;
                        }
                        Com.Parameters["@DepartmentID"].Value = ObjCVarOperationEmailSent.DepartmentID;
                        Com.Parameters["@OperationID"].Value = ObjCVarOperationEmailSent.OperationID;
                        Com.Parameters["@OpenDate"].Value = ObjCVarOperationEmailSent.OpenDate;
                        Com.Parameters["@CloseDate"].Value = ObjCVarOperationEmailSent.CloseDate;
                        Com.Parameters["@CutOffDate"].Value = ObjCVarOperationEmailSent.CutOffDate;
                        Com.Parameters["@PODate"].Value = ObjCVarOperationEmailSent.PODate;
                        Com.Parameters["@ReleaseDate"].Value = ObjCVarOperationEmailSent.ReleaseDate;
                        Com.Parameters["@ETAPOLDate"].Value = ObjCVarOperationEmailSent.ETAPOLDate;
                        Com.Parameters["@ATAPOLDate"].Value = ObjCVarOperationEmailSent.ATAPOLDate;
                        Com.Parameters["@ExpectedDeparture"].Value = ObjCVarOperationEmailSent.ExpectedDeparture;
                        Com.Parameters["@ActualDeparture"].Value = ObjCVarOperationEmailSent.ActualDeparture;
                        Com.Parameters["@ExpectedArrival"].Value = ObjCVarOperationEmailSent.ExpectedArrival;
                        Com.Parameters["@ActualArrival"].Value = ObjCVarOperationEmailSent.ActualArrival;
                        Com.Parameters["@GateInDate"].Value = ObjCVarOperationEmailSent.GateInDate;
                        Com.Parameters["@GateOutDate"].Value = ObjCVarOperationEmailSent.GateOutDate;
                        Com.Parameters["@StuffingDate"].Value = ObjCVarOperationEmailSent.StuffingDate;
                        Com.Parameters["@DeliveryDate"].Value = ObjCVarOperationEmailSent.DeliveryDate;
                        Com.Parameters["@CertificateDate"].Value = ObjCVarOperationEmailSent.CertificateDate;
                        Com.Parameters["@QasimaDate"].Value = ObjCVarOperationEmailSent.QasimaDate;
                        EndTrans(Com, Con);
                        if (ObjCVarOperationEmailSent.ID == 0)
                        {
                            ObjCVarOperationEmailSent.ID = Convert.ToInt64(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarOperationEmailSent.mIsChanges = false;
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

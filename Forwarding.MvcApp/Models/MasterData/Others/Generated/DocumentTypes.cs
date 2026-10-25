using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.MasterData.Others.Generated
{
    [Serializable]
    public class CPKDocumentTypes
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
    public partial class CVarDocumentTypes : CPKDocumentTypes
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal String mName;
        internal String mLocalName;
        internal String mTableOrViewName;
        internal String mISOCode;
        internal Boolean mPrintISOCode;
        internal Boolean mIsImport;
        internal Boolean mIsExport;
        internal Boolean mIsDomestic;
        internal Boolean mIsOcean;
        internal Boolean mIsAir;
        internal Boolean mIsInland;
        internal Boolean mIsDocIn;
        internal Boolean mIsDocOut;
        internal Boolean mShowHeader;
        internal Boolean mShowFooter;
        internal String mNotes;
        internal Int32 mCreatorUserID;
        internal DateTime mCreationDate;
        internal Int32 mModificatorUserID;
        internal DateTime mModificationDate;
        internal Int32 mLockingUserID;
        internal DateTime mTimeLocked;
        internal Int32 mViewOrder;
        internal Int32 mPrintUserID;
        internal DateTime mPrintDate;
        #endregion

        #region "Methods"
        public String Name
        {
            get { return mName; }
            set { mIsChanges = true; mName = value; }
        }
        public String LocalName
        {
            get { return mLocalName; }
            set { mIsChanges = true; mLocalName = value; }
        }
        public String TableOrViewName
        {
            get { return mTableOrViewName; }
            set { mIsChanges = true; mTableOrViewName = value; }
        }
        public String ISOCode
        {
            get { return mISOCode; }
            set { mIsChanges = true; mISOCode = value; }
        }
        public Boolean PrintISOCode
        {
            get { return mPrintISOCode; }
            set { mIsChanges = true; mPrintISOCode = value; }
        }
        public Boolean IsImport
        {
            get { return mIsImport; }
            set { mIsChanges = true; mIsImport = value; }
        }
        public Boolean IsExport
        {
            get { return mIsExport; }
            set { mIsChanges = true; mIsExport = value; }
        }
        public Boolean IsDomestic
        {
            get { return mIsDomestic; }
            set { mIsChanges = true; mIsDomestic = value; }
        }
        public Boolean IsOcean
        {
            get { return mIsOcean; }
            set { mIsChanges = true; mIsOcean = value; }
        }
        public Boolean IsAir
        {
            get { return mIsAir; }
            set { mIsChanges = true; mIsAir = value; }
        }
        public Boolean IsInland
        {
            get { return mIsInland; }
            set { mIsChanges = true; mIsInland = value; }
        }
        public Boolean IsDocIn
        {
            get { return mIsDocIn; }
            set { mIsChanges = true; mIsDocIn = value; }
        }
        public Boolean IsDocOut
        {
            get { return mIsDocOut; }
            set { mIsChanges = true; mIsDocOut = value; }
        }
        public Boolean ShowHeader
        {
            get { return mShowHeader; }
            set { mIsChanges = true; mShowHeader = value; }
        }
        public Boolean ShowFooter
        {
            get { return mShowFooter; }
            set { mIsChanges = true; mShowFooter = value; }
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
        public Int32 LockingUserID
        {
            get { return mLockingUserID; }
            set { mIsChanges = true; mLockingUserID = value; }
        }
        public DateTime TimeLocked
        {
            get { return mTimeLocked; }
            set { mIsChanges = true; mTimeLocked = value; }
        }
        public Int32 ViewOrder
        {
            get { return mViewOrder; }
            set { mIsChanges = true; mViewOrder = value; }
        }
        public Int32 PrintUserID
        {
            get { return mPrintUserID; }
            set { mIsChanges = true; mPrintUserID = value; }
        }
        public DateTime PrintDate
        {
            get { return mPrintDate; }
            set { mIsChanges = true; mPrintDate = value; }
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

    public partial class CDocumentTypes
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
        public List<CVarDocumentTypes> lstCVarDocumentTypes = new List<CVarDocumentTypes>();
        public List<CPKDocumentTypes> lstDeletedCPKDocumentTypes = new List<CPKDocumentTypes>();
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
            lstCVarDocumentTypes.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListDocumentTypes";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemDocumentTypes";
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
                        CVarDocumentTypes ObjCVarDocumentTypes = new CVarDocumentTypes();
                        ObjCVarDocumentTypes.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarDocumentTypes.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarDocumentTypes.mLocalName = Convert.ToString(dr["LocalName"].ToString());
                        ObjCVarDocumentTypes.mTableOrViewName = Convert.ToString(dr["TableOrViewName"].ToString());
                        ObjCVarDocumentTypes.mISOCode = Convert.ToString(dr["ISOCode"].ToString());
                        ObjCVarDocumentTypes.mPrintISOCode = Convert.ToBoolean(dr["PrintISOCode"].ToString());
                        ObjCVarDocumentTypes.mIsImport = Convert.ToBoolean(dr["IsImport"].ToString());
                        ObjCVarDocumentTypes.mIsExport = Convert.ToBoolean(dr["IsExport"].ToString());
                        ObjCVarDocumentTypes.mIsDomestic = Convert.ToBoolean(dr["IsDomestic"].ToString());
                        ObjCVarDocumentTypes.mIsOcean = Convert.ToBoolean(dr["IsOcean"].ToString());
                        ObjCVarDocumentTypes.mIsAir = Convert.ToBoolean(dr["IsAir"].ToString());
                        ObjCVarDocumentTypes.mIsInland = Convert.ToBoolean(dr["IsInland"].ToString());
                        ObjCVarDocumentTypes.mIsDocIn = Convert.ToBoolean(dr["IsDocIn"].ToString());
                        ObjCVarDocumentTypes.mIsDocOut = Convert.ToBoolean(dr["IsDocOut"].ToString());
                        ObjCVarDocumentTypes.mShowHeader = Convert.ToBoolean(dr["ShowHeader"].ToString());
                        ObjCVarDocumentTypes.mShowFooter = Convert.ToBoolean(dr["ShowFooter"].ToString());
                        ObjCVarDocumentTypes.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarDocumentTypes.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarDocumentTypes.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarDocumentTypes.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarDocumentTypes.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarDocumentTypes.mLockingUserID = Convert.ToInt32(dr["LockingUserID"].ToString());
                        ObjCVarDocumentTypes.mTimeLocked = Convert.ToDateTime(dr["TimeLocked"].ToString());
                        ObjCVarDocumentTypes.mViewOrder = Convert.ToInt32(dr["ViewOrder"].ToString());
                        ObjCVarDocumentTypes.mPrintUserID = Convert.ToInt32(dr["PrintUserID"].ToString());
                        ObjCVarDocumentTypes.mPrintDate = Convert.ToDateTime(dr["PrintDate"].ToString());
                        lstCVarDocumentTypes.Add(ObjCVarDocumentTypes);
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
            lstCVarDocumentTypes.Clear();

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
                Com.CommandText = "[dbo].GetListPagingDocumentTypes";
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
                        CVarDocumentTypes ObjCVarDocumentTypes = new CVarDocumentTypes();
                        ObjCVarDocumentTypes.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarDocumentTypes.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarDocumentTypes.mLocalName = Convert.ToString(dr["LocalName"].ToString());
                        ObjCVarDocumentTypes.mTableOrViewName = Convert.ToString(dr["TableOrViewName"].ToString());
                        ObjCVarDocumentTypes.mISOCode = Convert.ToString(dr["ISOCode"].ToString());
                        ObjCVarDocumentTypes.mPrintISOCode = Convert.ToBoolean(dr["PrintISOCode"].ToString());
                        ObjCVarDocumentTypes.mIsImport = Convert.ToBoolean(dr["IsImport"].ToString());
                        ObjCVarDocumentTypes.mIsExport = Convert.ToBoolean(dr["IsExport"].ToString());
                        ObjCVarDocumentTypes.mIsDomestic = Convert.ToBoolean(dr["IsDomestic"].ToString());
                        ObjCVarDocumentTypes.mIsOcean = Convert.ToBoolean(dr["IsOcean"].ToString());
                        ObjCVarDocumentTypes.mIsAir = Convert.ToBoolean(dr["IsAir"].ToString());
                        ObjCVarDocumentTypes.mIsInland = Convert.ToBoolean(dr["IsInland"].ToString());
                        ObjCVarDocumentTypes.mIsDocIn = Convert.ToBoolean(dr["IsDocIn"].ToString());
                        ObjCVarDocumentTypes.mIsDocOut = Convert.ToBoolean(dr["IsDocOut"].ToString());
                        ObjCVarDocumentTypes.mShowHeader = Convert.ToBoolean(dr["ShowHeader"].ToString());
                        ObjCVarDocumentTypes.mShowFooter = Convert.ToBoolean(dr["ShowFooter"].ToString());
                        ObjCVarDocumentTypes.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarDocumentTypes.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarDocumentTypes.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarDocumentTypes.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarDocumentTypes.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarDocumentTypes.mLockingUserID = Convert.ToInt32(dr["LockingUserID"].ToString());
                        ObjCVarDocumentTypes.mTimeLocked = Convert.ToDateTime(dr["TimeLocked"].ToString());
                        ObjCVarDocumentTypes.mViewOrder = Convert.ToInt32(dr["ViewOrder"].ToString());
                        ObjCVarDocumentTypes.mPrintUserID = Convert.ToInt32(dr["PrintUserID"].ToString());
                        ObjCVarDocumentTypes.mPrintDate = Convert.ToDateTime(dr["PrintDate"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarDocumentTypes.Add(ObjCVarDocumentTypes);
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
                    Com.CommandText = "[dbo].DeleteListDocumentTypes";
                else
                    Com.CommandText = "[dbo].UpdateListDocumentTypes";
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
        public Exception DeleteItem(List<CPKDocumentTypes> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemDocumentTypes";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int));
                foreach (CPKDocumentTypes ObjCPKDocumentTypes in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt32(ObjCPKDocumentTypes.ID);
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
        public Exception SaveMethod(List<CVarDocumentTypes> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@LocalName", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@TableOrViewName", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@ISOCode", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@PrintISOCode", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@IsImport", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@IsExport", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@IsDomestic", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@IsOcean", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@IsAir", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@IsInland", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@IsDocIn", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@IsDocOut", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@ShowHeader", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@ShowFooter", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@Notes", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@CreatorUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CreationDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@ModificatorUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ModificationDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@LockingUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@TimeLocked", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@ViewOrder", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@PrintUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@PrintDate", SqlDbType.DateTime));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarDocumentTypes ObjCVarDocumentTypes in SaveList)
                {
                    if (ObjCVarDocumentTypes.mIsChanges == true)
                    {
                        if (ObjCVarDocumentTypes.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemDocumentTypes";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarDocumentTypes.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemDocumentTypes";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarDocumentTypes.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarDocumentTypes.ID;
                        }
                        Com.Parameters["@Name"].Value = ObjCVarDocumentTypes.Name;
                        Com.Parameters["@LocalName"].Value = ObjCVarDocumentTypes.LocalName;
                        Com.Parameters["@TableOrViewName"].Value = ObjCVarDocumentTypes.TableOrViewName;
                        Com.Parameters["@ISOCode"].Value = ObjCVarDocumentTypes.ISOCode;
                        Com.Parameters["@PrintISOCode"].Value = ObjCVarDocumentTypes.PrintISOCode;
                        Com.Parameters["@IsImport"].Value = ObjCVarDocumentTypes.IsImport;
                        Com.Parameters["@IsExport"].Value = ObjCVarDocumentTypes.IsExport;
                        Com.Parameters["@IsDomestic"].Value = ObjCVarDocumentTypes.IsDomestic;
                        Com.Parameters["@IsOcean"].Value = ObjCVarDocumentTypes.IsOcean;
                        Com.Parameters["@IsAir"].Value = ObjCVarDocumentTypes.IsAir;
                        Com.Parameters["@IsInland"].Value = ObjCVarDocumentTypes.IsInland;
                        Com.Parameters["@IsDocIn"].Value = ObjCVarDocumentTypes.IsDocIn;
                        Com.Parameters["@IsDocOut"].Value = ObjCVarDocumentTypes.IsDocOut;
                        Com.Parameters["@ShowHeader"].Value = ObjCVarDocumentTypes.ShowHeader;
                        Com.Parameters["@ShowFooter"].Value = ObjCVarDocumentTypes.ShowFooter;
                        Com.Parameters["@Notes"].Value = ObjCVarDocumentTypes.Notes;
                        Com.Parameters["@CreatorUserID"].Value = ObjCVarDocumentTypes.CreatorUserID;
                        Com.Parameters["@CreationDate"].Value = ObjCVarDocumentTypes.CreationDate;
                        Com.Parameters["@ModificatorUserID"].Value = ObjCVarDocumentTypes.ModificatorUserID;
                        Com.Parameters["@ModificationDate"].Value = ObjCVarDocumentTypes.ModificationDate;
                        Com.Parameters["@LockingUserID"].Value = ObjCVarDocumentTypes.LockingUserID;
                        Com.Parameters["@TimeLocked"].Value = ObjCVarDocumentTypes.TimeLocked;
                        Com.Parameters["@ViewOrder"].Value = ObjCVarDocumentTypes.ViewOrder;
                        Com.Parameters["@PrintUserID"].Value = ObjCVarDocumentTypes.PrintUserID;
                        Com.Parameters["@PrintDate"].Value = ObjCVarDocumentTypes.PrintDate;
                        EndTrans(Com, Con);
                        if (ObjCVarDocumentTypes.ID == 0)
                        {
                            ObjCVarDocumentTypes.ID = Convert.ToInt32(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarDocumentTypes.mIsChanges = false;
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

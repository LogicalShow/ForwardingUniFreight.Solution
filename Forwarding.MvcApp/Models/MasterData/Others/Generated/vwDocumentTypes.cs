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
    public class CPKvwDocumentTypes
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
    public partial class CVarvwDocumentTypes : CPKvwDocumentTypes
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
        internal String mPrintUserName;
        #endregion

        #region "Methods"
        public String Name
        {
            get { return mName; }
            set { mName = value; }
        }
        public String LocalName
        {
            get { return mLocalName; }
            set { mLocalName = value; }
        }
        public String TableOrViewName
        {
            get { return mTableOrViewName; }
            set { mTableOrViewName = value; }
        }
        public String ISOCode
        {
            get { return mISOCode; }
            set { mISOCode = value; }
        }
        public Boolean PrintISOCode
        {
            get { return mPrintISOCode; }
            set { mPrintISOCode = value; }
        }
        public Boolean IsImport
        {
            get { return mIsImport; }
            set { mIsImport = value; }
        }
        public Boolean IsExport
        {
            get { return mIsExport; }
            set { mIsExport = value; }
        }
        public Boolean IsDomestic
        {
            get { return mIsDomestic; }
            set { mIsDomestic = value; }
        }
        public Boolean IsOcean
        {
            get { return mIsOcean; }
            set { mIsOcean = value; }
        }
        public Boolean IsAir
        {
            get { return mIsAir; }
            set { mIsAir = value; }
        }
        public Boolean IsInland
        {
            get { return mIsInland; }
            set { mIsInland = value; }
        }
        public Boolean IsDocIn
        {
            get { return mIsDocIn; }
            set { mIsDocIn = value; }
        }
        public Boolean IsDocOut
        {
            get { return mIsDocOut; }
            set { mIsDocOut = value; }
        }
        public Boolean ShowHeader
        {
            get { return mShowHeader; }
            set { mShowHeader = value; }
        }
        public Boolean ShowFooter
        {
            get { return mShowFooter; }
            set { mShowFooter = value; }
        }
        public String Notes
        {
            get { return mNotes; }
            set { mNotes = value; }
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
        public Int32 LockingUserID
        {
            get { return mLockingUserID; }
            set { mLockingUserID = value; }
        }
        public DateTime TimeLocked
        {
            get { return mTimeLocked; }
            set { mTimeLocked = value; }
        }
        public Int32 ViewOrder
        {
            get { return mViewOrder; }
            set { mViewOrder = value; }
        }
        public Int32 PrintUserID
        {
            get { return mPrintUserID; }
            set { mPrintUserID = value; }
        }
        public DateTime PrintDate
        {
            get { return mPrintDate; }
            set { mPrintDate = value; }
        }
        public String PrintUserName
        {
            get { return mPrintUserName; }
            set { mPrintUserName = value; }
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

    public partial class CvwDocumentTypes
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
        public List<CVarvwDocumentTypes> lstCVarvwDocumentTypes = new List<CVarvwDocumentTypes>();
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
            lstCVarvwDocumentTypes.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwDocumentTypes";
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
                        CVarvwDocumentTypes ObjCVarvwDocumentTypes = new CVarvwDocumentTypes();
                        ObjCVarvwDocumentTypes.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwDocumentTypes.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarvwDocumentTypes.mLocalName = Convert.ToString(dr["LocalName"].ToString());
                        ObjCVarvwDocumentTypes.mTableOrViewName = Convert.ToString(dr["TableOrViewName"].ToString());
                        ObjCVarvwDocumentTypes.mISOCode = Convert.ToString(dr["ISOCode"].ToString());
                        ObjCVarvwDocumentTypes.mPrintISOCode = Convert.ToBoolean(dr["PrintISOCode"].ToString());
                        ObjCVarvwDocumentTypes.mIsImport = Convert.ToBoolean(dr["IsImport"].ToString());
                        ObjCVarvwDocumentTypes.mIsExport = Convert.ToBoolean(dr["IsExport"].ToString());
                        ObjCVarvwDocumentTypes.mIsDomestic = Convert.ToBoolean(dr["IsDomestic"].ToString());
                        ObjCVarvwDocumentTypes.mIsOcean = Convert.ToBoolean(dr["IsOcean"].ToString());
                        ObjCVarvwDocumentTypes.mIsAir = Convert.ToBoolean(dr["IsAir"].ToString());
                        ObjCVarvwDocumentTypes.mIsInland = Convert.ToBoolean(dr["IsInland"].ToString());
                        ObjCVarvwDocumentTypes.mIsDocIn = Convert.ToBoolean(dr["IsDocIn"].ToString());
                        ObjCVarvwDocumentTypes.mIsDocOut = Convert.ToBoolean(dr["IsDocOut"].ToString());
                        ObjCVarvwDocumentTypes.mShowHeader = Convert.ToBoolean(dr["ShowHeader"].ToString());
                        ObjCVarvwDocumentTypes.mShowFooter = Convert.ToBoolean(dr["ShowFooter"].ToString());
                        ObjCVarvwDocumentTypes.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvwDocumentTypes.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarvwDocumentTypes.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarvwDocumentTypes.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarvwDocumentTypes.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarvwDocumentTypes.mLockingUserID = Convert.ToInt32(dr["LockingUserID"].ToString());
                        ObjCVarvwDocumentTypes.mTimeLocked = Convert.ToDateTime(dr["TimeLocked"].ToString());
                        ObjCVarvwDocumentTypes.mViewOrder = Convert.ToInt32(dr["ViewOrder"].ToString());
                        ObjCVarvwDocumentTypes.mPrintUserID = Convert.ToInt32(dr["PrintUserID"].ToString());
                        ObjCVarvwDocumentTypes.mPrintDate = Convert.ToDateTime(dr["PrintDate"].ToString());
                        ObjCVarvwDocumentTypes.mPrintUserName = Convert.ToString(dr["PrintUserName"].ToString());
                        lstCVarvwDocumentTypes.Add(ObjCVarvwDocumentTypes);
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
            lstCVarvwDocumentTypes.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwDocumentTypes";
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
                        CVarvwDocumentTypes ObjCVarvwDocumentTypes = new CVarvwDocumentTypes();
                        ObjCVarvwDocumentTypes.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwDocumentTypes.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarvwDocumentTypes.mLocalName = Convert.ToString(dr["LocalName"].ToString());
                        ObjCVarvwDocumentTypes.mTableOrViewName = Convert.ToString(dr["TableOrViewName"].ToString());
                        ObjCVarvwDocumentTypes.mISOCode = Convert.ToString(dr["ISOCode"].ToString());
                        ObjCVarvwDocumentTypes.mPrintISOCode = Convert.ToBoolean(dr["PrintISOCode"].ToString());
                        ObjCVarvwDocumentTypes.mIsImport = Convert.ToBoolean(dr["IsImport"].ToString());
                        ObjCVarvwDocumentTypes.mIsExport = Convert.ToBoolean(dr["IsExport"].ToString());
                        ObjCVarvwDocumentTypes.mIsDomestic = Convert.ToBoolean(dr["IsDomestic"].ToString());
                        ObjCVarvwDocumentTypes.mIsOcean = Convert.ToBoolean(dr["IsOcean"].ToString());
                        ObjCVarvwDocumentTypes.mIsAir = Convert.ToBoolean(dr["IsAir"].ToString());
                        ObjCVarvwDocumentTypes.mIsInland = Convert.ToBoolean(dr["IsInland"].ToString());
                        ObjCVarvwDocumentTypes.mIsDocIn = Convert.ToBoolean(dr["IsDocIn"].ToString());
                        ObjCVarvwDocumentTypes.mIsDocOut = Convert.ToBoolean(dr["IsDocOut"].ToString());
                        ObjCVarvwDocumentTypes.mShowHeader = Convert.ToBoolean(dr["ShowHeader"].ToString());
                        ObjCVarvwDocumentTypes.mShowFooter = Convert.ToBoolean(dr["ShowFooter"].ToString());
                        ObjCVarvwDocumentTypes.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvwDocumentTypes.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarvwDocumentTypes.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarvwDocumentTypes.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarvwDocumentTypes.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarvwDocumentTypes.mLockingUserID = Convert.ToInt32(dr["LockingUserID"].ToString());
                        ObjCVarvwDocumentTypes.mTimeLocked = Convert.ToDateTime(dr["TimeLocked"].ToString());
                        ObjCVarvwDocumentTypes.mViewOrder = Convert.ToInt32(dr["ViewOrder"].ToString());
                        ObjCVarvwDocumentTypes.mPrintUserID = Convert.ToInt32(dr["PrintUserID"].ToString());
                        ObjCVarvwDocumentTypes.mPrintDate = Convert.ToDateTime(dr["PrintDate"].ToString());
                        ObjCVarvwDocumentTypes.mPrintUserName = Convert.ToString(dr["PrintUserName"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwDocumentTypes.Add(ObjCVarvwDocumentTypes);
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

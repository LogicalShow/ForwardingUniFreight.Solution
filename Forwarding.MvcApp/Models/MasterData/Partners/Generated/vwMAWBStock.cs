using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.MasterData.Partners.Generated
{
    [Serializable]
    public class CPKvwMAWBStock
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
    public partial class CVarvwMAWBStock : CPKvwMAWBStock
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mAirlineID;
        internal String mMAWBSuffix;
        internal Int64 mAssignedToOperationID;
        internal String mNotes;
        internal Int32 mCreatorUserID;
        internal DateTime mCreationDate;
        internal Int32 mModificatorUserID;
        internal DateTime mModificationDate;
        internal String mAirlineCode;
        internal String mPrefix;
        internal String mAirlineName;
        internal String mAirlineLocalName;
        internal String mCode;
        internal String mMasterBL;
        internal Int32 mTypeOfStockID;
        internal String mTypeOfStockName;
        #endregion

        #region "Methods"
        public Int32 AirlineID
        {
            get { return mAirlineID; }
            set { mAirlineID = value; }
        }
        public String MAWBSuffix
        {
            get { return mMAWBSuffix; }
            set { mMAWBSuffix = value; }
        }
        public Int64 AssignedToOperationID
        {
            get { return mAssignedToOperationID; }
            set { mAssignedToOperationID = value; }
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
        public String AirlineCode
        {
            get { return mAirlineCode; }
            set { mAirlineCode = value; }
        }
        public String Prefix
        {
            get { return mPrefix; }
            set { mPrefix = value; }
        }
        public String AirlineName
        {
            get { return mAirlineName; }
            set { mAirlineName = value; }
        }
        public String AirlineLocalName
        {
            get { return mAirlineLocalName; }
            set { mAirlineLocalName = value; }
        }
        public String Code
        {
            get { return mCode; }
            set { mCode = value; }
        }
        public String MasterBL
        {
            get { return mMasterBL; }
            set { mMasterBL = value; }
        }
        public Int32 TypeOfStockID
        {
            get { return mTypeOfStockID; }
            set { mTypeOfStockID = value; }
        }
        public String TypeOfStockName
        {
            get { return mTypeOfStockName; }
            set { mTypeOfStockName = value; }
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

    public partial class CvwMAWBStock
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
        public List<CVarvwMAWBStock> lstCVarvwMAWBStock = new List<CVarvwMAWBStock>();
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
            lstCVarvwMAWBStock.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwMAWBStock";
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
                        CVarvwMAWBStock ObjCVarvwMAWBStock = new CVarvwMAWBStock();
                        ObjCVarvwMAWBStock.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwMAWBStock.mAirlineID = Convert.ToInt32(dr["AirlineID"].ToString());
                        ObjCVarvwMAWBStock.mMAWBSuffix = Convert.ToString(dr["MAWBSuffix"].ToString());
                        ObjCVarvwMAWBStock.mAssignedToOperationID = Convert.ToInt64(dr["AssignedToOperationID"].ToString());
                        ObjCVarvwMAWBStock.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvwMAWBStock.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarvwMAWBStock.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarvwMAWBStock.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarvwMAWBStock.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarvwMAWBStock.mAirlineCode = Convert.ToString(dr["AirlineCode"].ToString());
                        ObjCVarvwMAWBStock.mPrefix = Convert.ToString(dr["Prefix"].ToString());
                        ObjCVarvwMAWBStock.mAirlineName = Convert.ToString(dr["AirlineName"].ToString());
                        ObjCVarvwMAWBStock.mAirlineLocalName = Convert.ToString(dr["AirlineLocalName"].ToString());
                        ObjCVarvwMAWBStock.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarvwMAWBStock.mMasterBL = Convert.ToString(dr["MasterBL"].ToString());
                        ObjCVarvwMAWBStock.mTypeOfStockID = Convert.ToInt32(dr["TypeOfStockID"].ToString());
                        ObjCVarvwMAWBStock.mTypeOfStockName = Convert.ToString(dr["TypeOfStockName"].ToString());
                        lstCVarvwMAWBStock.Add(ObjCVarvwMAWBStock);
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
            lstCVarvwMAWBStock.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwMAWBStock";
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
                        CVarvwMAWBStock ObjCVarvwMAWBStock = new CVarvwMAWBStock();
                        ObjCVarvwMAWBStock.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwMAWBStock.mAirlineID = Convert.ToInt32(dr["AirlineID"].ToString());
                        ObjCVarvwMAWBStock.mMAWBSuffix = Convert.ToString(dr["MAWBSuffix"].ToString());
                        ObjCVarvwMAWBStock.mAssignedToOperationID = Convert.ToInt64(dr["AssignedToOperationID"].ToString());
                        ObjCVarvwMAWBStock.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarvwMAWBStock.mCreatorUserID = Convert.ToInt32(dr["CreatorUserID"].ToString());
                        ObjCVarvwMAWBStock.mCreationDate = Convert.ToDateTime(dr["CreationDate"].ToString());
                        ObjCVarvwMAWBStock.mModificatorUserID = Convert.ToInt32(dr["ModificatorUserID"].ToString());
                        ObjCVarvwMAWBStock.mModificationDate = Convert.ToDateTime(dr["ModificationDate"].ToString());
                        ObjCVarvwMAWBStock.mAirlineCode = Convert.ToString(dr["AirlineCode"].ToString());
                        ObjCVarvwMAWBStock.mPrefix = Convert.ToString(dr["Prefix"].ToString());
                        ObjCVarvwMAWBStock.mAirlineName = Convert.ToString(dr["AirlineName"].ToString());
                        ObjCVarvwMAWBStock.mAirlineLocalName = Convert.ToString(dr["AirlineLocalName"].ToString());
                        ObjCVarvwMAWBStock.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarvwMAWBStock.mMasterBL = Convert.ToString(dr["MasterBL"].ToString());
                        ObjCVarvwMAWBStock.mTypeOfStockID = Convert.ToInt32(dr["TypeOfStockID"].ToString());
                        ObjCVarvwMAWBStock.mTypeOfStockName = Convert.ToString(dr["TypeOfStockName"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwMAWBStock.Add(ObjCVarvwMAWBStock);
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

using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.Accounting.MasterData.Generated
{
    [Serializable]
    public class CPKvwA_AccountsRecUn
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
    public partial class CVarvwA_AccountsRecUn : CPKvwA_AccountsRecUn
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal String mAccount_Number;
        internal String mCode;
        internal String mCodeM;
        internal String mAccount_Name;
        internal String mName;
        internal String mAccount_EnName;
        internal String mEnName;
        internal Int32 mParent_ID;
        internal Boolean mIsMain;
        internal Int32 mAccLevel;
        internal String mRealAccountCode;
        internal Boolean mIsSub;
        internal Boolean mIsVisible;
        internal Int32 mCostCenter_ID;
        internal Decimal mBalance;
        internal Int32 mUser_ID;
        internal String mCostCenterCalcType;
        internal Int32 mNotesRecundercollectID;
        #endregion

        #region "Methods"
        public String Account_Number
        {
            get { return mAccount_Number; }
            set { mAccount_Number = value; }
        }
        public String Code
        {
            get { return mCode; }
            set { mCode = value; }
        }
        public String CodeM
        {
            get { return mCodeM; }
            set { mCodeM = value; }
        }
        public String Account_Name
        {
            get { return mAccount_Name; }
            set { mAccount_Name = value; }
        }
        public String Name
        {
            get { return mName; }
            set { mName = value; }
        }
        public String Account_EnName
        {
            get { return mAccount_EnName; }
            set { mAccount_EnName = value; }
        }
        public String EnName
        {
            get { return mEnName; }
            set { mEnName = value; }
        }
        public Int32 Parent_ID
        {
            get { return mParent_ID; }
            set { mParent_ID = value; }
        }
        public Boolean IsMain
        {
            get { return mIsMain; }
            set { mIsMain = value; }
        }
        public Int32 AccLevel
        {
            get { return mAccLevel; }
            set { mAccLevel = value; }
        }
        public String RealAccountCode
        {
            get { return mRealAccountCode; }
            set { mRealAccountCode = value; }
        }
        public Boolean IsSub
        {
            get { return mIsSub; }
            set { mIsSub = value; }
        }
        public Boolean IsVisible
        {
            get { return mIsVisible; }
            set { mIsVisible = value; }
        }
        public Int32 CostCenter_ID
        {
            get { return mCostCenter_ID; }
            set { mCostCenter_ID = value; }
        }
        public Decimal Balance
        {
            get { return mBalance; }
            set { mBalance = value; }
        }
        public Int32 User_ID
        {
            get { return mUser_ID; }
            set { mUser_ID = value; }
        }
        public String CostCenterCalcType
        {
            get { return mCostCenterCalcType; }
            set { mCostCenterCalcType = value; }
        }
        public Int32 NotesRecundercollectID
        {
            get { return mNotesRecundercollectID; }
            set { mNotesRecundercollectID = value; }
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

    public partial class CvwA_AccountsRecUn
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
        public List<CVarvwA_AccountsRecUn> lstCVarvwA_AccountsRecUn = new List<CVarvwA_AccountsRecUn>();
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
            lstCVarvwA_AccountsRecUn.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwA_AccountsRecUn";
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
                        CVarvwA_AccountsRecUn ObjCVarvwA_AccountsRecUn = new CVarvwA_AccountsRecUn();
                        ObjCVarvwA_AccountsRecUn.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwA_AccountsRecUn.mAccount_Number = Convert.ToString(dr["Account_Number"].ToString());
                        ObjCVarvwA_AccountsRecUn.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarvwA_AccountsRecUn.mCodeM = Convert.ToString(dr["CodeM"].ToString());
                        ObjCVarvwA_AccountsRecUn.mAccount_Name = Convert.ToString(dr["Account_Name"].ToString());
                        ObjCVarvwA_AccountsRecUn.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarvwA_AccountsRecUn.mAccount_EnName = Convert.ToString(dr["Account_EnName"].ToString());
                        ObjCVarvwA_AccountsRecUn.mEnName = Convert.ToString(dr["EnName"].ToString());
                        ObjCVarvwA_AccountsRecUn.mParent_ID = Convert.ToInt32(dr["Parent_ID"].ToString());
                        ObjCVarvwA_AccountsRecUn.mIsMain = Convert.ToBoolean(dr["IsMain"].ToString());
                        ObjCVarvwA_AccountsRecUn.mAccLevel = Convert.ToInt32(dr["AccLevel"].ToString());
                        ObjCVarvwA_AccountsRecUn.mRealAccountCode = Convert.ToString(dr["RealAccountCode"].ToString());
                        ObjCVarvwA_AccountsRecUn.mIsSub = Convert.ToBoolean(dr["IsSub"].ToString());
                        ObjCVarvwA_AccountsRecUn.mIsVisible = Convert.ToBoolean(dr["IsVisible"].ToString());
                        ObjCVarvwA_AccountsRecUn.mCostCenter_ID = Convert.ToInt32(dr["CostCenter_ID"].ToString());
                        ObjCVarvwA_AccountsRecUn.mBalance = Convert.ToDecimal(dr["Balance"].ToString());
                        ObjCVarvwA_AccountsRecUn.mUser_ID = Convert.ToInt32(dr["User_ID"].ToString());
                        ObjCVarvwA_AccountsRecUn.mCostCenterCalcType = Convert.ToString(dr["CostCenterCalcType"].ToString());
                        ObjCVarvwA_AccountsRecUn.mNotesRecundercollectID = Convert.ToInt32(dr["NotesRecundercollectID"].ToString());
                        lstCVarvwA_AccountsRecUn.Add(ObjCVarvwA_AccountsRecUn);
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
            lstCVarvwA_AccountsRecUn.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwA_AccountsRecUn";
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
                        CVarvwA_AccountsRecUn ObjCVarvwA_AccountsRecUn = new CVarvwA_AccountsRecUn();
                        ObjCVarvwA_AccountsRecUn.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwA_AccountsRecUn.mAccount_Number = Convert.ToString(dr["Account_Number"].ToString());
                        ObjCVarvwA_AccountsRecUn.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarvwA_AccountsRecUn.mCodeM = Convert.ToString(dr["CodeM"].ToString());
                        ObjCVarvwA_AccountsRecUn.mAccount_Name = Convert.ToString(dr["Account_Name"].ToString());
                        ObjCVarvwA_AccountsRecUn.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarvwA_AccountsRecUn.mAccount_EnName = Convert.ToString(dr["Account_EnName"].ToString());
                        ObjCVarvwA_AccountsRecUn.mEnName = Convert.ToString(dr["EnName"].ToString());
                        ObjCVarvwA_AccountsRecUn.mParent_ID = Convert.ToInt32(dr["Parent_ID"].ToString());
                        ObjCVarvwA_AccountsRecUn.mIsMain = Convert.ToBoolean(dr["IsMain"].ToString());
                        ObjCVarvwA_AccountsRecUn.mAccLevel = Convert.ToInt32(dr["AccLevel"].ToString());
                        ObjCVarvwA_AccountsRecUn.mRealAccountCode = Convert.ToString(dr["RealAccountCode"].ToString());
                        ObjCVarvwA_AccountsRecUn.mIsSub = Convert.ToBoolean(dr["IsSub"].ToString());
                        ObjCVarvwA_AccountsRecUn.mIsVisible = Convert.ToBoolean(dr["IsVisible"].ToString());
                        ObjCVarvwA_AccountsRecUn.mCostCenter_ID = Convert.ToInt32(dr["CostCenter_ID"].ToString());
                        ObjCVarvwA_AccountsRecUn.mBalance = Convert.ToDecimal(dr["Balance"].ToString());
                        ObjCVarvwA_AccountsRecUn.mUser_ID = Convert.ToInt32(dr["User_ID"].ToString());
                        ObjCVarvwA_AccountsRecUn.mCostCenterCalcType = Convert.ToString(dr["CostCenterCalcType"].ToString());
                        ObjCVarvwA_AccountsRecUn.mNotesRecundercollectID = Convert.ToInt32(dr["NotesRecundercollectID"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwA_AccountsRecUn.Add(ObjCVarvwA_AccountsRecUn);
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

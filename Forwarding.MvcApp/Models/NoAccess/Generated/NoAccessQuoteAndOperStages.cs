using System;
using System.Data;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.NoAccess.Generated
{
    [Serializable]
    public class CPKNoAccessQuoteAndOperStages
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
    public partial class CVarNoAccessQuoteAndOperStages : CPKNoAccessQuoteAndOperStages
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal String mCode;
        internal String mName;
        internal String mLocalName;
        internal Boolean mIsQuotationStage;
        internal Boolean mIsOperationStage;
        internal Int32 mViewOrder;
        internal Byte mMaxDays;
        internal Byte mRank;
        internal Boolean mIsInactive;
        internal String mNotes;
        #endregion

        #region "Methods"
        public String Code
        {
            get { return mCode; }
            set { mIsChanges = true; mCode = value; }
        }
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
        public Boolean IsQuotationStage
        {
            get { return mIsQuotationStage; }
            set { mIsChanges = true; mIsQuotationStage = value; }
        }
        public Boolean IsOperationStage
        {
            get { return mIsOperationStage; }
            set { mIsChanges = true; mIsOperationStage = value; }
        }
        public Int32 ViewOrder
        {
            get { return mViewOrder; }
            set { mIsChanges = true; mViewOrder = value; }
        }
        public Byte MaxDays
        {
            get { return mMaxDays; }
            set { mIsChanges = true; mMaxDays = value; }
        }
        public Byte Rank
        {
            get { return mRank; }
            set { mIsChanges = true; mRank = value; }
        }
        public Boolean IsInactive
        {
            get { return mIsInactive; }
            set { mIsChanges = true; mIsInactive = value; }
        }
        public String Notes
        {
            get { return mNotes; }
            set { mIsChanges = true; mNotes = value; }
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

    public partial class CNoAccessQuoteAndOperStages
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
        public List<CVarNoAccessQuoteAndOperStages> lstCVarNoAccessQuoteAndOperStages = new List<CVarNoAccessQuoteAndOperStages>();
        public List<CPKNoAccessQuoteAndOperStages> lstDeletedCPKNoAccessQuoteAndOperStages = new List<CPKNoAccessQuoteAndOperStages>();
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
            lstCVarNoAccessQuoteAndOperStages.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListNoAccessQuoteAndOperStages";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemNoAccessQuoteAndOperStages";
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
                        CVarNoAccessQuoteAndOperStages ObjCVarNoAccessQuoteAndOperStages = new CVarNoAccessQuoteAndOperStages();
                        ObjCVarNoAccessQuoteAndOperStages.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarNoAccessQuoteAndOperStages.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarNoAccessQuoteAndOperStages.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarNoAccessQuoteAndOperStages.mLocalName = Convert.ToString(dr["LocalName"].ToString());
                        ObjCVarNoAccessQuoteAndOperStages.mIsQuotationStage = Convert.ToBoolean(dr["IsQuotationStage"].ToString());
                        ObjCVarNoAccessQuoteAndOperStages.mIsOperationStage = Convert.ToBoolean(dr["IsOperationStage"].ToString());
                        ObjCVarNoAccessQuoteAndOperStages.mViewOrder = Convert.ToInt32(dr["ViewOrder"].ToString());
                        ObjCVarNoAccessQuoteAndOperStages.mMaxDays = Convert.ToByte(dr["MaxDays"].ToString());
                        ObjCVarNoAccessQuoteAndOperStages.mRank = Convert.ToByte(dr["Rank"].ToString());
                        ObjCVarNoAccessQuoteAndOperStages.mIsInactive = Convert.ToBoolean(dr["IsInactive"].ToString());
                        ObjCVarNoAccessQuoteAndOperStages.mNotes = Convert.ToString(dr["Notes"].ToString());
                        lstCVarNoAccessQuoteAndOperStages.Add(ObjCVarNoAccessQuoteAndOperStages);
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
            lstCVarNoAccessQuoteAndOperStages.Clear();

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
                Com.CommandText = "[dbo].GetListPagingNoAccessQuoteAndOperStages";
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
                        CVarNoAccessQuoteAndOperStages ObjCVarNoAccessQuoteAndOperStages = new CVarNoAccessQuoteAndOperStages();
                        ObjCVarNoAccessQuoteAndOperStages.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarNoAccessQuoteAndOperStages.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarNoAccessQuoteAndOperStages.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarNoAccessQuoteAndOperStages.mLocalName = Convert.ToString(dr["LocalName"].ToString());
                        ObjCVarNoAccessQuoteAndOperStages.mIsQuotationStage = Convert.ToBoolean(dr["IsQuotationStage"].ToString());
                        ObjCVarNoAccessQuoteAndOperStages.mIsOperationStage = Convert.ToBoolean(dr["IsOperationStage"].ToString());
                        ObjCVarNoAccessQuoteAndOperStages.mViewOrder = Convert.ToInt32(dr["ViewOrder"].ToString());
                        ObjCVarNoAccessQuoteAndOperStages.mMaxDays = Convert.ToByte(dr["MaxDays"].ToString());
                        ObjCVarNoAccessQuoteAndOperStages.mRank = Convert.ToByte(dr["Rank"].ToString());
                        ObjCVarNoAccessQuoteAndOperStages.mIsInactive = Convert.ToBoolean(dr["IsInactive"].ToString());
                        ObjCVarNoAccessQuoteAndOperStages.mNotes = Convert.ToString(dr["Notes"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarNoAccessQuoteAndOperStages.Add(ObjCVarNoAccessQuoteAndOperStages);
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
                    Com.CommandText = "[dbo].DeleteListNoAccessQuoteAndOperStages";
                else
                    Com.CommandText = "[dbo].UpdateListNoAccessQuoteAndOperStages";
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
        public Exception DeleteItem(List<CPKNoAccessQuoteAndOperStages> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemNoAccessQuoteAndOperStages";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int));
                foreach (CPKNoAccessQuoteAndOperStages ObjCPKNoAccessQuoteAndOperStages in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt32(ObjCPKNoAccessQuoteAndOperStages.ID);
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
        public Exception SaveMethod(List<CVarNoAccessQuoteAndOperStages> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@Code", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@LocalName", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@IsQuotationStage", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@IsOperationStage", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@ViewOrder", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@MaxDays", SqlDbType.TinyInt));
                Com.Parameters.Add(new SqlParameter("@Rank", SqlDbType.TinyInt));
                Com.Parameters.Add(new SqlParameter("@IsInactive", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@Notes", SqlDbType.NVarChar));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarNoAccessQuoteAndOperStages ObjCVarNoAccessQuoteAndOperStages in SaveList)
                {
                    if (ObjCVarNoAccessQuoteAndOperStages.mIsChanges == true)
                    {
                        if (ObjCVarNoAccessQuoteAndOperStages.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemNoAccessQuoteAndOperStages";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarNoAccessQuoteAndOperStages.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemNoAccessQuoteAndOperStages";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarNoAccessQuoteAndOperStages.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarNoAccessQuoteAndOperStages.ID;
                        }
                        Com.Parameters["@Code"].Value = ObjCVarNoAccessQuoteAndOperStages.Code;
                        Com.Parameters["@Name"].Value = ObjCVarNoAccessQuoteAndOperStages.Name;
                        Com.Parameters["@LocalName"].Value = ObjCVarNoAccessQuoteAndOperStages.LocalName;
                        Com.Parameters["@IsQuotationStage"].Value = ObjCVarNoAccessQuoteAndOperStages.IsQuotationStage;
                        Com.Parameters["@IsOperationStage"].Value = ObjCVarNoAccessQuoteAndOperStages.IsOperationStage;
                        Com.Parameters["@ViewOrder"].Value = ObjCVarNoAccessQuoteAndOperStages.ViewOrder;
                        Com.Parameters["@MaxDays"].Value = ObjCVarNoAccessQuoteAndOperStages.MaxDays;
                        Com.Parameters["@Rank"].Value = ObjCVarNoAccessQuoteAndOperStages.Rank;
                        Com.Parameters["@IsInactive"].Value = ObjCVarNoAccessQuoteAndOperStages.IsInactive;
                        Com.Parameters["@Notes"].Value = ObjCVarNoAccessQuoteAndOperStages.Notes;
                        EndTrans(Com, Con);
                        if (ObjCVarNoAccessQuoteAndOperStages.ID == 0)
                        {
                            ObjCVarNoAccessQuoteAndOperStages.ID = Convert.ToInt32(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarNoAccessQuoteAndOperStages.mIsChanges = false;
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

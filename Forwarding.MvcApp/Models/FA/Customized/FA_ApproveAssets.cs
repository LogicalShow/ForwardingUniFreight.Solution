using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.FA.Generated
{
    [Serializable]
    public class CPKFA_ApproveAssets
    {
        #region "variables"
        #endregion

        #region "Methods"
        #endregion
    }
    [Serializable]
    public partial class CVarFA_ApproveAssets : CPKFA_ApproveAssets
    {
        #region "variables"

        internal String mMessage;

        #endregion

        #region "Methods"

        public String Message
        {
            get { return mMessage; }
            set { mMessage = value; }
        }

        #endregion

        #region Functions
        //public Boolean GetIsChange()
        //{
        //    return mIsChanges;
        //}
        //public void SetIsChange(Boolean IsChange)
        //{
        //    mIsChanges = IsChange;
        //}
        #endregion
    }

    public partial class CFA_ApproveAssets
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
        //@IDs NVARCHAR(max) , @UserID INT , @Date DATETIME ,   @IsApprove bit
        private SqlTransaction tr;
        public List<CVarFA_ApproveAssets> lstCVarFA_ApproveAssets = new List<CVarFA_ApproveAssets>();
        #endregion

        #region "Select Methods"
        public Exception GetList(string  IDs, int UserID, DateTime Date , bool IsApproved)
        {
            return DataFill(  IDs,  UserID,  Date, IsApproved , true);
        }
        public Exception GetListApproveAssets(string IDs, int UserID, bool IsApproved)
        {
            return DataFillApproveAssets(IDs, UserID, IsApproved, true);
        }
        public Exception GetListPaging(Int32 PageSize, Int32 PageNumber, string WhereClause, string OrderBy, out Int32 TotalRecords)
        {
            return DataFill(PageSize, PageNumber, WhereClause, OrderBy, out TotalRecords);
        }
        private Exception DataFill(string IDs, int UserID, DateTime Date, bool IsApproved , Boolean IsList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarFA_ApproveAssets.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                Com.CommandTimeout = 60;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@IDs", SqlDbType.NVarChar));
                    Com.Parameters.Add(new SqlParameter("@UserID", SqlDbType.Int));
                    Com.Parameters.Add(new SqlParameter("@Date", SqlDbType.Date));
                    Com.Parameters.Add(new SqlParameter("@IsApprove", SqlDbType.Bit));
                    Com.CommandText = "[dbo].FA_ApproveAssets1";
                    Com.Parameters[0].Value = IDs;
                    Com.Parameters[1].Value = UserID;
                    Com.Parameters[2].Value = Date;
                    Com.Parameters[3].Value = IsApproved;
                }
                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        /*Start DataReader*/
                      //  SELECT GD.ID AS GroupDestructionsID , G.SubAccountID , G.ID GroupID, GD.FromDate , GD.ToDate  , GD.Percentage , G.Name GroupName
                        CVarFA_ApproveAssets ObjCVarFA_ApproveAssets = new CVarFA_ApproveAssets();
                        ObjCVarFA_ApproveAssets.mMessage = Convert.ToString(dr["Message"].ToString());
                        lstCVarFA_ApproveAssets.Add(ObjCVarFA_ApproveAssets);
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
        private Exception DataFillApproveAssets(string IDs, int UserID, bool IsApproved, Boolean IsList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarFA_ApproveAssets.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                Com.CommandTimeout = 60;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.NVarChar));
                    Com.Parameters.Add(new SqlParameter("@UserID", SqlDbType.Int));
                    Com.Parameters.Add(new SqlParameter("@Approved", SqlDbType.Bit));
                    Com.CommandText = "[dbo].PS_PostingInvoicesByAssetsUnReady";
                    Com.Parameters[0].Value = IDs;
                    Com.Parameters[1].Value = UserID;
                    Com.Parameters[2].Value = IsApproved;
                }
                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                      
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
            lstCVarFA_ApproveAssets.Clear();

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
                Com.CommandText = "[dbo].GetListPagingFA_ApproveAssets";
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
                        CVarFA_ApproveAssets ObjCVarFA_ApproveAssets = new CVarFA_ApproveAssets();
                        ObjCVarFA_ApproveAssets.mMessage = Convert.ToString(dr["Message"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarFA_ApproveAssets.Add(ObjCVarFA_ApproveAssets);
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

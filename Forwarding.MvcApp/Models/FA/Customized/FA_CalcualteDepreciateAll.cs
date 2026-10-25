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
    public class CPKFA_CalcualteDepreciateAll
    {
        #region "variables"
        #endregion

        #region "Methods"
        #endregion
    }
    [Serializable]
    public partial class CVarFA_CalcualteDepreciateAll : CPKFA_CalcualteDepreciateAll
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

    public partial class CFA_CalcualteDepreciateAll
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
        public List<CVarFA_CalcualteDepreciateAll> lstCVarFA_CalcualteDepreciateAll = new List<CVarFA_CalcualteDepreciateAll>();
        #endregion

        #region "Select Methods"
        public Exception GetList(DateTime FromDate, DateTime ToDate, int BranchID, int UserID, DateTime Date )
        {
            return DataFill( FromDate, ToDate,  BranchID,  UserID,  Date ,  true);
        }
        public Exception GetListPaging(Int32 PageSize, Int32 PageNumber, string WhereClause, string OrderBy, out Int32 TotalRecords)
        {
            return DataFill(PageSize, PageNumber, WhereClause, OrderBy, out TotalRecords);
        }
        private Exception DataFill(DateTime FromDate, DateTime ToDate, int BranchID, int UserID, DateTime Date , bool IsList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarFA_CalcualteDepreciateAll.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@FromDate", SqlDbType.DateTime));
                    Com.Parameters.Add(new SqlParameter("@ToDate", SqlDbType.DateTime));
                    Com.Parameters.Add(new SqlParameter("@BranchID", SqlDbType.Int));
                    Com.Parameters.Add(new SqlParameter("@UserID", SqlDbType.Int));
                    Com.Parameters.Add(new SqlParameter("@Date", SqlDbType.DateTime));
                    Com.CommandText = "[dbo].FA_CalcualteDepreciateAll";
                    Com.Parameters[0].Value = FromDate;
                    Com.Parameters[1].Value = ToDate;
                    Com.Parameters[2].Value = BranchID;
                    Com.Parameters[3].Value = UserID;
                    Com.Parameters[4].Value = Date;
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
                        CVarFA_CalcualteDepreciateAll ObjCVarFA_CalcualteDepreciateAll = new CVarFA_CalcualteDepreciateAll();
                        ObjCVarFA_CalcualteDepreciateAll.mMessage = Convert.ToString(dr["Message"].ToString());
                        lstCVarFA_CalcualteDepreciateAll.Add(ObjCVarFA_CalcualteDepreciateAll);
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
            lstCVarFA_CalcualteDepreciateAll.Clear();

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
                Com.CommandText = "[dbo].GetListPagingFA_CalcualteDepreciateAll";
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
                        CVarFA_CalcualteDepreciateAll ObjCVarFA_CalcualteDepreciateAll = new CVarFA_CalcualteDepreciateAll();
                        ObjCVarFA_CalcualteDepreciateAll.mMessage = Convert.ToString(dr["Message"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarFA_CalcualteDepreciateAll.Add(ObjCVarFA_CalcualteDepreciateAll);
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

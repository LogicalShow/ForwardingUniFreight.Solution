using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;
namespace Forwarding.MvcApp.Models.Accounting.MasterData.Generated
{
    #region OLD
  //  [Serializable]
  //  public partial class CVarvwA_ETA_Port
  //  {
  //      #region "variables"
  //      internal Boolean mIsChanges = false;
  //      internal String mEnName;
  //      internal Int32 mCode;
  //      #endregion

  //      #region "Methods"
  //      public String EnName
  //      {
  //          get { return mEnName; }
  //          set { mEnName = value; }
  //      }
  //      public Int32 Code
  //      {
  //          get { return mCode; }
  //          set { mCode = value; }
  //      }
  //      #endregion
  //  }

  //  public partial class CvwA_ETA_Port
  //  {
  //      #region "variables"
  //      /*If "App.Config" isnot exist add it to your Application
		//Add this code after <Configuration> tag
		//-------------------------------------------------------
		//<appsettings>
		//<add key="ConnectionString" value="............"/>
		//</appsettings>
		//-------------------------------------------------------
		//where ".........." is connection string to database server*/
  //      private SqlTransaction tr;
  //      public List<CVarvwA_ETA_Port> lstCVarvwA_ETA_Port = new List<CVarvwA_ETA_Port>();
  //      #endregion

  //      #region "Select Methods"
  //      public Exception GetList(string WhereClause)
  //      {
  //          return DataFill(WhereClause, true);
  //      }
  //      public Exception GetListPaging(Int32 PageSize, Int32 PageNumber, string WhereClause, string OrderBy, out Int32 TotalRecords)
  //      {
  //          return DataFill(PageSize, PageNumber, WhereClause, OrderBy, out TotalRecords);
  //      }
  //      private Exception DataFill(string Param, Boolean IsList)
  //      {
  //          Exception Exp = null;
  //          SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
  //          SqlCommand Com;
  //          SqlDataReader dr;
  //          lstCVarvwA_ETA_Port.Clear();

  //          try
  //          {
  //              Con.Open();
  //              tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
  //              Com = new SqlCommand();
  //              Com.CommandType = CommandType.StoredProcedure;
  //              if (IsList == true)
  //              {
  //                  Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
  //                  Com.CommandText = "[dbo].GetListvwA_ETA_Port";
  //                  Com.Parameters[0].Value = Param;
  //              }
  //              Com.Transaction = tr;
  //              Com.Connection = Con;
  //              dr = Com.ExecuteReader();
  //              try
  //              {
  //                  while (dr.Read())
  //                  {
  //                      /*Start DataReader*/
  //                      CVarvwA_ETA_Port ObjCVarvwA_ETA_Port = new CVarvwA_ETA_Port();
  //                      ObjCVarvwA_ETA_Port.mEnName = Convert.ToString(dr["EnName"].ToString());
  //                      ObjCVarvwA_ETA_Port.mCode = Convert.ToInt32(dr["Code"].ToString());
  //                      lstCVarvwA_ETA_Port.Add(ObjCVarvwA_ETA_Port);
  //                  }
  //              }
  //              catch (Exception ex)
  //              {
  //                  Exp = ex;
  //              }
  //              finally
  //              {
  //                  if (dr != null)
  //                  {
  //                      dr.Close();
  //                      dr.Dispose();
  //                  }
  //              }
  //              tr.Commit();
  //          }
  //          catch (Exception ex)
  //          {
  //              Exp = ex;
  //          }
  //          finally
  //          {
  //              Con.Close();
  //              Con.Dispose();
  //          }
  //          return Exp;
  //      }

  //      private Exception DataFill(Int32 PageSize, Int32 PageNumber, string WhereClause, string OrderBy, out Int32 TotRecs)
  //      {
  //          Exception Exp = null;
  //          TotRecs = 0;
  //          SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
  //          SqlCommand Com;
  //          SqlDataReader dr;
  //          lstCVarvwA_ETA_Port.Clear();

  //          try
  //          {
  //              Con.Open();
  //              tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
  //              Com = new SqlCommand();
  //              Com.CommandType = CommandType.StoredProcedure;
  //              Com.Parameters.Add(new SqlParameter("@PageSize", SqlDbType.Int));
  //              Com.Parameters.Add(new SqlParameter("@PageNumber", SqlDbType.Int));
  //              Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
  //              Com.Parameters.Add(new SqlParameter("@OrderBy", SqlDbType.VarChar));
  //              Com.CommandText = "[dbo].GetListPagingvwA_ETA_Port";
  //              Com.Parameters[0].Value = PageSize;
  //              Com.Parameters[1].Value = PageNumber;
  //              Com.Parameters[2].Value = WhereClause;
  //              Com.Parameters[3].Value = OrderBy;
  //              Com.Transaction = tr;
  //              Com.Connection = Con;
  //              dr = Com.ExecuteReader();
  //              try
  //              {
  //                  while (dr.Read())
  //                  {
  //                      /*Start DataReader*/
  //                      CVarvwA_ETA_Port ObjCVarvwA_ETA_Port = new CVarvwA_ETA_Port();
  //                      ObjCVarvwA_ETA_Port.mEnName = Convert.ToString(dr["EnName"].ToString());
  //                      ObjCVarvwA_ETA_Port.mCode = Convert.ToInt32(dr["Code"].ToString());
  //                      TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
  //                      lstCVarvwA_ETA_Port.Add(ObjCVarvwA_ETA_Port);
  //                  }
  //              }
  //              catch (Exception ex)
  //              {
  //                  Exp = ex;
  //              }
  //              finally
  //              {
  //                  if (dr != null)
  //                  {
  //                      dr.Close();
  //                      dr.Dispose();
  //                  }
  //              }
  //              tr.Commit();
  //          }
  //          catch (Exception ex)
  //          {
  //              Exp = ex;
  //          }
  //          finally
  //          {
  //              Con.Close();
  //              Con.Dispose();
  //          }
  //          return Exp;
  //      }

    //    #endregion
    //}

    #endregion

    #region NEW
    [Serializable]
    public partial class CVarvwA_ETA_Port
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mID;
        internal String mEnName;
        internal String mCode;
        #endregion

        #region "Methods"
        public Int32 ID
        {
            get { return mID; }
            set { mID = value; }
        }
        public String EnName
        {
            get { return mEnName; }
            set { mEnName = value; }
        }
        public String Code
        {
            get { return mCode; }
            set { mCode = value; }
        }
        #endregion
    }

    public partial class CvwA_ETA_Port
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
        public List<CVarvwA_ETA_Port> lstCVarvwA_ETA_Port = new List<CVarvwA_ETA_Port>();
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
            lstCVarvwA_ETA_Port.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.VarChar));
                    Com.CommandText = "[dbo].GetListvwA_ETA_Port";
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
                        CVarvwA_ETA_Port ObjCVarvwA_ETA_Port = new CVarvwA_ETA_Port();
                        ObjCVarvwA_ETA_Port.mID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwA_ETA_Port.mEnName = Convert.ToString(dr["EnName"].ToString());
                        ObjCVarvwA_ETA_Port.mCode = Convert.ToString(dr["Code"].ToString());
                        lstCVarvwA_ETA_Port.Add(ObjCVarvwA_ETA_Port);
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
            lstCVarvwA_ETA_Port.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                Com.Parameters.Add(new SqlParameter("@PageSize", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@PageNumber", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.VarChar));
                Com.Parameters.Add(new SqlParameter("@OrderBy", SqlDbType.VarChar));
                Com.CommandText = "[dbo].GetListPagingvwA_ETA_Port";
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
                        CVarvwA_ETA_Port ObjCVarvwA_ETA_Port = new CVarvwA_ETA_Port();
                        ObjCVarvwA_ETA_Port.mID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwA_ETA_Port.mEnName = Convert.ToString(dr["EnName"].ToString());
                        ObjCVarvwA_ETA_Port.mCode = Convert.ToString(dr["Code"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwA_ETA_Port.Add(ObjCVarvwA_ETA_Port);
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

    #endregion

}

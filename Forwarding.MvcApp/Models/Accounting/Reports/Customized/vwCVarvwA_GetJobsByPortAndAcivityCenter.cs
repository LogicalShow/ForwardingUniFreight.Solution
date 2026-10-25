using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.Accounting.Reports.Customized
{
    #region old
    //  [Serializable]
    //  public partial class CVarvwA_GetJobsByPortAndAcivityCenter
    //  {
    //      #region "variables"
    //      internal Boolean mIsChanges = false;
    //      internal String mDisbursementJob_ID;
    //      internal String mJobNumber;
    //      #endregion

    //      #region "Methods"
    //      public String Code
    //      {
    //          get { return mDisbursementJob_ID; }
    //          set { mDisbursementJob_ID = value; }
    //      }
    //      public String EnName
    //      {
    //          get { return mJobNumber; }
    //          set { mJobNumber = value; }
    //      }
    //      #endregion
    //  }

    //  public partial class CvwA_GetJobsByPortAndAcivityCenter
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
    //      public List<CVarvwA_GetJobsByPortAndAcivityCenter> lstCVarvwA_GetJobsByPortAndAcivityCenter = new List<CVarvwA_GetJobsByPortAndAcivityCenter>();
    //      #endregion

    //      #region "Select Methods"
    //      public Exception GetList(string pActivityCenterIDs, string pActivityPortIDs)
    //      {
    //          return DataFill(pActivityCenterIDs, pActivityPortIDs, true);
    //      }
    //      public Exception GetListPaging(Int32 PageSize, Int32 PageNumber, string WhereClause, string OrderBy, out Int32 TotalRecords)
    //      {
    //          return DataFill(PageSize, PageNumber, WhereClause, OrderBy, out TotalRecords);
    //      }
    //      private Exception DataFill(string pActivityCenterIDs, string pActivityPortIDs, Boolean IsList)
    //      {
    //          Exception Exp = null;
    //          SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
    //          SqlCommand Com;
    //          SqlDataReader dr;
    //          lstCVarvwA_GetJobsByPortAndAcivityCenter.Clear();

    //          try
    //          {
    //              Con.Open();
    //              tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
    //              Com = new SqlCommand();
    //              Com.CommandType = CommandType.StoredProcedure;
    //              if (IsList == true)
    //              {
    //                  Com.Parameters.Add(new SqlParameter("@pActivityCenterIDs", SqlDbType.VarChar));
    //                  Com.Parameters.Add(new SqlParameter("@pActivityPortIDs", SqlDbType.VarChar));
    //                  Com.CommandText = "A_GetJobsByPortAndAcivityCenter";
    //                  //Com.CommandText = "[dbo].GetListvwA_GetJobsByPortAndAcivityCenter";
    //                  Com.Parameters[0].Value = pActivityCenterIDs;
    //                  Com.Parameters[1].Value = pActivityPortIDs;
    //              }
    //              Com.Transaction = tr;
    //              Com.Connection = Con;
    //              dr = Com.ExecuteReader();
    //              try
    //              {
    //                  while (dr.Read())
    //                  {
    //                      /*Start DataReader*/
    //                      CVarvwA_GetJobsByPortAndAcivityCenter ObjCVarvwA_GetJobsByPortAndAcivityCenter = new CVarvwA_GetJobsByPortAndAcivityCenter();
    //                      ObjCVarvwA_GetJobsByPortAndAcivityCenter.mDisbursementJob_ID = Convert.ToString(dr["Code"].ToString());
    //                      ObjCVarvwA_GetJobsByPortAndAcivityCenter.mJobNumber = Convert.ToString(dr["EnName"].ToString());
    //                      lstCVarvwA_GetJobsByPortAndAcivityCenter.Add(ObjCVarvwA_GetJobsByPortAndAcivityCenter);
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
    //          lstCVarvwA_GetJobsByPortAndAcivityCenter.Clear();

    //          try
    //          {
    //              Con.Open();
    //              tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
    //              Com = new SqlCommand();
    //              Com.CommandType = CommandType.StoredProcedure;
    //              Com.Parameters.Add(new SqlParameter("@PageSize", SqlDbType.Int));
    //              Com.Parameters.Add(new SqlParameter("@PageNumber", SqlDbType.Int));
    //              Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.VarChar));
    //              Com.Parameters.Add(new SqlParameter("@OrderBy", SqlDbType.VarChar));
    //              Com.CommandText = "[dbo].GetListPagingvwA_GetJobsByPortAndAcivityCenter";
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
    //                      CVarvwA_GetJobsByPortAndAcivityCenter ObjCVarvwA_GetJobsByPortAndAcivityCenter = new CVarvwA_GetJobsByPortAndAcivityCenter();
    //                      ObjCVarvwA_GetJobsByPortAndAcivityCenter.mDisbursementJob_ID = Convert.ToString(dr["Code"].ToString());
    //                      ObjCVarvwA_GetJobsByPortAndAcivityCenter.mJobNumber = Convert.ToString(dr["EnName"].ToString());
    //                      TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
    //                      lstCVarvwA_GetJobsByPortAndAcivityCenter.Add(ObjCVarvwA_GetJobsByPortAndAcivityCenter);
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

    //      #endregion
    //  }
    #endregion
    #region NEW1
  //  [Serializable]
  //  public partial class CVarvwA_GetJobsByPortAndAcivityCenter
  //  {
  //      #region "variables"
  //      internal Boolean mIsChanges = false;
  //      internal Int32 mcode;
  //      internal String mEnName;
  //      #endregion

  //      #region "Methods"
  //      public Int32 code
  //      {
  //          get { return mcode; }
  //          set { mcode = value; }
  //      }
  //      public String EnName
  //      {
  //          get { return mEnName; }
  //          set { mEnName = value; }
  //      }
  //      #endregion
  //  }

  //  public partial class CvwA_GetJobsByPortAndAcivityCenter
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
  //      public List<CVarvwA_GetJobsByPortAndAcivityCenter> lstCVarvwA_GetJobsByPortAndAcivityCenter = new List<CVarvwA_GetJobsByPortAndAcivityCenter>();
  //      #endregion

  //      #region "Select Methods"
  //      public Exception GetList(string pActivityCenterIDs, string pActivityPortIDs)
  //      {
  //          return DataFill(pActivityCenterIDs, pActivityPortIDs, true);
  //      }
  //      public Exception GetListPaging(Int32 PageSize, Int32 PageNumber, string WhereClause, string OrderBy, out Int32 TotalRecords)
  //      {
  //          return DataFill(PageSize, PageNumber, WhereClause, OrderBy, out TotalRecords);
  //      }
  //      private Exception DataFill(string pActivityCenterIDs, string pActivityPortIDs, Boolean IsList)
  //      {
  //          Exception Exp = null;
  //          SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
  //          SqlCommand Com;
  //          SqlDataReader dr;
  //          lstCVarvwA_GetJobsByPortAndAcivityCenter.Clear();

  //          try
  //          {
  //              Con.Open();
  //              tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
  //              Com = new SqlCommand();
  //              Com.CommandType = CommandType.StoredProcedure;
  //              if (IsList == true)
  //              {
  //                  Com.Parameters.Add(new SqlParameter("@pActivityCenterIDs", SqlDbType.VarChar));
  //                  Com.Parameters.Add(new SqlParameter("@pActivityPortIDs", SqlDbType.VarChar));
  //                  Com.CommandText = "A_GetJobsByPortAndAcivityCenter";
  //                  //Com.CommandText = "[dbo].GetListvwA_GetJobsByPortAndAcivityCenter";
  //                  Com.Parameters[0].Value = pActivityCenterIDs;
  //                  Com.Parameters[1].Value = pActivityPortIDs;
  //              }
  //              Com.Transaction = tr;
  //              Com.Connection = Con;
  //              dr = Com.ExecuteReader();
  //              try
  //              {
  //                  while (dr.Read())
  //                  {
  //                      /*Start DataReader*/
  //                      CVarvwA_GetJobsByPortAndAcivityCenter ObjCVarvwA_GetJobsByPortAndAcivityCenter = new CVarvwA_GetJobsByPortAndAcivityCenter();
  //                      ObjCVarvwA_GetJobsByPortAndAcivityCenter.mcode = Convert.ToInt32(dr["code"].ToString());
  //                      ObjCVarvwA_GetJobsByPortAndAcivityCenter.mEnName = Convert.ToString(dr["EnName"].ToString());
  //                      lstCVarvwA_GetJobsByPortAndAcivityCenter.Add(ObjCVarvwA_GetJobsByPortAndAcivityCenter);
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
  //          lstCVarvwA_GetJobsByPortAndAcivityCenter.Clear();

  //          try
  //          {
  //              Con.Open();
  //              tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
  //              Com = new SqlCommand();
  //              Com.CommandType = CommandType.StoredProcedure;
  //              Com.Parameters.Add(new SqlParameter("@PageSize", SqlDbType.Int));
  //              Com.Parameters.Add(new SqlParameter("@PageNumber", SqlDbType.Int));
  //              Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.VarChar));
  //              Com.Parameters.Add(new SqlParameter("@OrderBy", SqlDbType.VarChar));
  //              Com.CommandText = "[dbo].GetListPagingvwA_GetJobsByPortAndAcivityCenter";
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
  //                      CVarvwA_GetJobsByPortAndAcivityCenter ObjCVarvwA_GetJobsByPortAndAcivityCenter = new CVarvwA_GetJobsByPortAndAcivityCenter();
  //                      ObjCVarvwA_GetJobsByPortAndAcivityCenter.mcode = Convert.ToInt32(dr["code"].ToString());
  //                      ObjCVarvwA_GetJobsByPortAndAcivityCenter.mEnName = Convert.ToString(dr["EnName"].ToString());
  //                      TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
  //                      lstCVarvwA_GetJobsByPortAndAcivityCenter.Add(ObjCVarvwA_GetJobsByPortAndAcivityCenter);
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

  //      #endregion
  //  }
    #endregion

    #region New2
    [Serializable]
    public partial class CVarvwA_GetJobsByPortAndAcivityCenter
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int64 mID;
        internal String mCode;
        internal String mEnName;
        internal String mName;

        #endregion

        #region "Methods"
        public Int64 ID
        {
            get { return mID; }
            set { mID = value; }
        }
        public string Code
        {
            get { return mCode; }
            set { mCode = value; }
        }
        public String EnName
        {
            get { return mEnName; }
            set { mEnName = value; }
        }
        public String Name
        {
            get { return mName; }
            set { mName = value; }
        }
        #endregion
    }

    public partial class CvwA_GetJobsByPortAndAcivityCenter
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
        public List<CVarvwA_GetJobsByPortAndAcivityCenter> lstCVarvwA_GetJobsByPortAndAcivityCenter = new List<CVarvwA_GetJobsByPortAndAcivityCenter>();
        #endregion

        #region "Select Methods"
        public Exception GetList(string pActivityCenterIDs, string pActivityPortIDs)
        {
            return DataFill(pActivityCenterIDs, pActivityPortIDs, true);
        }
        public Exception GetListSubAccountsByAccountID(string pAccountIDs)
        {
            return DataFillSubAccountsByAccountID(pAccountIDs, true);
        }
        public Exception GetListJobSumeryJob(string pActivityCenterIDs, string pActivityPortIDs, string pVesselIDs)
        {
            return DataFillSumeryJob(pActivityCenterIDs, pActivityPortIDs, pVesselIDs, true);
        }
        public Exception GetListPaging(Int32 PageSize, Int32 PageNumber, string WhereClause, string OrderBy, out Int32 TotalRecords)
        {
            return DataFill(PageSize, PageNumber, WhereClause, OrderBy, out TotalRecords);
        }
        private Exception DataFill(string pActivityCenterIDs, string pActivityPortIDs, Boolean IsList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarvwA_GetJobsByPortAndAcivityCenter.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@pActivityCenterIDs", SqlDbType.VarChar));
                    Com.Parameters.Add(new SqlParameter("@pActivityPortIDs", SqlDbType.VarChar));
                    Com.CommandText = "A_GetJobsByPortAndAcivityCenter";
                    //Com.CommandText = "[dbo].GetListvwA_GetJobsByPortAndAcivityCenter";
                    Com.Parameters[0].Value = pActivityCenterIDs;
                    Com.Parameters[1].Value = pActivityPortIDs;
                }
                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        /*Start DataReader*/
                        CVarvwA_GetJobsByPortAndAcivityCenter ObjCVarvwA_GetJobsByPortAndAcivityCenter = new CVarvwA_GetJobsByPortAndAcivityCenter();
                        ObjCVarvwA_GetJobsByPortAndAcivityCenter.mID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwA_GetJobsByPortAndAcivityCenter.mCode = Convert.ToString(dr["code"].ToString());
                        ObjCVarvwA_GetJobsByPortAndAcivityCenter.mEnName = Convert.ToString(dr["EnName"].ToString());
                        lstCVarvwA_GetJobsByPortAndAcivityCenter.Add(ObjCVarvwA_GetJobsByPortAndAcivityCenter);
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
        private Exception DataFillSubAccountsByAccountID(string pAccountIDs, Boolean IsList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarvwA_GetJobsByPortAndAcivityCenter.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@pAccountIDs", SqlDbType.VarChar));
                    Com.CommandText = "A_GetSubAccountsByAccountIDs";
                    //Com.CommandText = "[dbo].GetListvwA_GetJobsByPortAndAcivityCenter";
                    Com.Parameters[0].Value = @pAccountIDs;

                }
                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        /*Start DataReader*/
                        CVarvwA_GetJobsByPortAndAcivityCenter ObjCVarvwA_GetJobsByPortAndAcivityCenter = new CVarvwA_GetJobsByPortAndAcivityCenter();
                        ObjCVarvwA_GetJobsByPortAndAcivityCenter.mID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwA_GetJobsByPortAndAcivityCenter.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarvwA_GetJobsByPortAndAcivityCenter.mEnName = Convert.ToString(dr["EnName"].ToString());
                        ObjCVarvwA_GetJobsByPortAndAcivityCenter.mName = Convert.ToString(dr["Name"].ToString());

                        lstCVarvwA_GetJobsByPortAndAcivityCenter.Add(ObjCVarvwA_GetJobsByPortAndAcivityCenter);
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
        private Exception DataFillSumeryJob(string pActivityCenterIDs, string pActivityPortIDs, string pVesselIDs, Boolean IsList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarvwA_GetJobsByPortAndAcivityCenter.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@pActivityCenterIDs", SqlDbType.VarChar));
                    Com.Parameters.Add(new SqlParameter("@pActivityPortIDs", SqlDbType.VarChar));
                    Com.Parameters.Add(new SqlParameter("@pVesselIDs", SqlDbType.VarChar));

                    Com.CommandText = "A_GetJobsByPortAndAcivityCenterAndVessel";
                    //Com.CommandText = "[dbo].GetListvwA_GetJobsByPortAndAcivityCenter";
                    Com.Parameters[0].Value = pActivityCenterIDs;
                    Com.Parameters[1].Value = pActivityPortIDs;
                    Com.Parameters[2].Value = pVesselIDs;


                }
                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        /*Start DataReader*/
                        CVarvwA_GetJobsByPortAndAcivityCenter ObjCVarvwA_GetJobsByPortAndAcivityCenter = new CVarvwA_GetJobsByPortAndAcivityCenter();
                        ObjCVarvwA_GetJobsByPortAndAcivityCenter.mID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarvwA_GetJobsByPortAndAcivityCenter.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarvwA_GetJobsByPortAndAcivityCenter.mEnName = Convert.ToString(dr["EnName"].ToString());
                       

                        lstCVarvwA_GetJobsByPortAndAcivityCenter.Add(ObjCVarvwA_GetJobsByPortAndAcivityCenter);
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
            lstCVarvwA_GetJobsByPortAndAcivityCenter.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwA_GetJobsByPortAndAcivityCenter";
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
                        CVarvwA_GetJobsByPortAndAcivityCenter ObjCVarvwA_GetJobsByPortAndAcivityCenter = new CVarvwA_GetJobsByPortAndAcivityCenter();
                        ObjCVarvwA_GetJobsByPortAndAcivityCenter.mID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwA_GetJobsByPortAndAcivityCenter.mCode = Convert.ToString(dr["code"].ToString());
                        ObjCVarvwA_GetJobsByPortAndAcivityCenter.mEnName = Convert.ToString(dr["EnName"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwA_GetJobsByPortAndAcivityCenter.Add(ObjCVarvwA_GetJobsByPortAndAcivityCenter);
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

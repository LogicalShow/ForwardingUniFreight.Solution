using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.SC.MasterData.Generated
{

    [Serializable]
    public partial class CVarvwItemsTree
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal String mid;
        internal String mparent;
        internal String mtitle;
        internal String mkind;
        internal Int64 mposition;
        internal Boolean mfolder;
        internal String micon;
        internal String mextraClasses;
        internal String mNodeType;
        #endregion

        #region "Methods"
        public String id
        {
            get { return mid; }
            set { mid = value; }
        }
        public String parent
        {
            get { return mparent; }
            set { mparent = value; }
        }
        public String title
        {
            get { return mtitle; }
            set { mtitle = value; }
        }
        public String kind
        {
            get { return mkind; }
            set { mkind = value; }
        }
        public Int64 position
        {
            get { return mposition; }
            set { mposition = value; }
        }
        public Boolean folder
        {
            get { return mfolder; }
            set { mfolder = value; }
        }
        public String icon
        {
            get { return micon; }
            set { micon = value; }
        }
        public String extraClasses
        {
            get { return mextraClasses; }
            set { mextraClasses = value; }
        }
        public String NodeType
        {
            get { return mNodeType; }
            set { mNodeType = value; }
        }
        #endregion
    }

    public partial class CvwItemsTree
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
        public List<CVarvwItemsTree> lstCVarvwItemsTree = new List<CVarvwItemsTree>();
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
            lstCVarvwItemsTree.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwItemsTree";
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
                        CVarvwItemsTree ObjCVarvwItemsTree = new CVarvwItemsTree();
                        ObjCVarvwItemsTree.mid = Convert.ToString(dr["id"].ToString());
                        ObjCVarvwItemsTree.mparent = Convert.ToString(dr["parent"].ToString());
                        ObjCVarvwItemsTree.mtitle = Convert.ToString(dr["title"].ToString());
                        ObjCVarvwItemsTree.mkind = Convert.ToString(dr["kind"].ToString());
                        ObjCVarvwItemsTree.mposition = Convert.ToInt64(dr["position"].ToString());
                        ObjCVarvwItemsTree.mfolder = Convert.ToBoolean(dr["folder"].ToString());
                        ObjCVarvwItemsTree.micon = Convert.ToString(dr["icon"].ToString());
                        ObjCVarvwItemsTree.mextraClasses = Convert.ToString(dr["extraClasses"].ToString());
                        ObjCVarvwItemsTree.mNodeType = Convert.ToString(dr["NodeType"].ToString());
                        lstCVarvwItemsTree.Add(ObjCVarvwItemsTree);
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
            lstCVarvwItemsTree.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwItemsTree";
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
                        CVarvwItemsTree ObjCVarvwItemsTree = new CVarvwItemsTree();
                        ObjCVarvwItemsTree.mid = Convert.ToString(dr["id"].ToString());
                        ObjCVarvwItemsTree.mparent = Convert.ToString(dr["parent"].ToString());
                        ObjCVarvwItemsTree.mtitle = Convert.ToString(dr["title"].ToString());
                        ObjCVarvwItemsTree.mkind = Convert.ToString(dr["kind"].ToString());
                        ObjCVarvwItemsTree.mposition = Convert.ToInt64(dr["position"].ToString());
                        ObjCVarvwItemsTree.mfolder = Convert.ToBoolean(dr["folder"].ToString());
                        ObjCVarvwItemsTree.micon = Convert.ToString(dr["icon"].ToString());
                        ObjCVarvwItemsTree.mextraClasses = Convert.ToString(dr["extraClasses"].ToString());
                        ObjCVarvwItemsTree.mNodeType = Convert.ToString(dr["NodeType"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwItemsTree.Add(ObjCVarvwItemsTree);
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

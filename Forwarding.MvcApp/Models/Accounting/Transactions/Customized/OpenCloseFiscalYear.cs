using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;
// Open / Close Fiscal Year
namespace Forwarding.MvcApp.Models.Accounting.Transactions.Customized
{
    [Serializable]
    public class CPKOpenCloseFiscalYear
    {
        #region "variables"
        #endregion

        #region "Methods"
        #endregion
    }
    [Serializable]
    public partial class CVarOpenCloseFiscalYear : CPKOpenCloseFiscalYear
    {
        //#region "variables"
        //internal Int32 mIsSucsess;

        //#endregion

        //#region "Methods"
        //public Int32 IsSucsess
        //{
        //    get { return mIsSucsess; }
        //    set { mIsSucsess = value; }
        //};

        //#endregion

    }

    public partial class COpenCloseFiscalYear
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
        public List<CVarOpenCloseFiscalYear> lstCVarOpenCloseFiscalYear = new List<CVarOpenCloseFiscalYear>();
        #endregion
        // Merge(string pItemType, string pDuplicateItems, string pDestinationItem)
        #region "Select Methods"
        public Exception OpenCloseFiscalYear(int pID, bool pIsClosed, int pAccountID, int UserID)
        {
            return ExeOpenCloseFiscalYear(pID, pIsClosed, pAccountID, UserID, true);
        }

        private Exception ExeOpenCloseFiscalYear(int pID, bool pIsClosed, int pAccountID, int pUserID, Boolean IsList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarOpenCloseFiscalYear.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                Com.CommandTimeout = 1000;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@FiscalYearID", SqlDbType.Int));
                    Com.Parameters.Add(new SqlParameter("@IsClosed", SqlDbType.Bit));
                    Com.Parameters.Add(new SqlParameter("@ProfitAccountID", SqlDbType.Int));
                    Com.Parameters.Add(new SqlParameter("@UserID", SqlDbType.Int));

                    Com.CommandText = "[dbo].[A_OpenCloseFiscalYear]";
                    Com.Parameters[0].Value = pID;
                    Com.Parameters[1].Value = pIsClosed;
                    Com.Parameters[2].Value = pAccountID;
                    Com.Parameters[3].Value = pUserID;

                }
                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    //  while (dr.Read())
                    //  {
                    /*Start DataReader*/
                    // CVarOpenCloseFiscalYear ObjCVarOpenCloseFiscalYear = new CVarOpenCloseFiscalYear();
                    // ObjCVarOpenCloseFiscalYear.mIsSucsess = Convert.ToInt32(dr["IsSucsess"].ToString());

                    // lstCVarOpenCloseFiscalYear.Add(ObjCVarOpenCloseFiscalYear);
                    // }
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

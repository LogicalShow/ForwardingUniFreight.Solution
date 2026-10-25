using Forwarding.MvcApp.Models.Operations.Operations.Customized;
using Forwarding.MvcApp.Models.Sales.Transactions.Generated.Payments.Generated;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;

namespace Forwarding.MvcApp.Models.Customized
{
    public class CCustomizedDBCall
    {

        #region DB Customized SPs
        public Exception SP_Trans_Log(string pStoredProcedureName, Int32 pUser_ID, string pTable_Name, Int64 pRow_ID, string pTrans_Type)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            SqlTransaction tr;
            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;

                Com.Parameters.Add(new SqlParameter("@User_ID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@Table_Name", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@Row_ID ", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@Trans_Type ", SqlDbType.NVarChar));
                //Com.CommandText = "[dbo].ERP_ForwWeb_PaymentDetails";
                Com.CommandText = "[dbo]." + pStoredProcedureName;
                Com.Parameters[0].Value = pUser_ID;
                Com.Parameters[1].Value = pTable_Name;
                Com.Parameters[2].Value = pRow_ID;
                Com.Parameters[3].Value = pTrans_Type;

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
        public Exception SP_Voucher_JVs_Log(Int32 pVoucherID, Int32 pJVType, Int64 pJVID, Int32 pUserID)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            SqlTransaction tr;
            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;

                Com.Parameters.Add(new SqlParameter("@VoucherID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@JVType", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@JVID ", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@UserID ", SqlDbType.Int));
                //Com.CommandText = "[dbo].ERP_ForwWeb_PaymentDetails";
                Com.CommandText = "[dbo].SP_Voucher_JVs_Log" ;
                Com.Parameters[0].Value = pVoucherID;
                Com.Parameters[1].Value = pJVType;
                Com.Parameters[2].Value = pJVID;
                Com.Parameters[3].Value = pUserID;

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
        public Exception SP_A_SubAccounts_Details(string pStoredProcedureName, string pTrans_Type, Int32 pSubAccount_ID, Int32 pAccount_ID, bool pIsMain)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            SqlTransaction tr;
            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;

                Com.Parameters.Add(new SqlParameter("@TransType ", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@SubAccount_ID ", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@Account_ID ", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@IsMain ", SqlDbType.Bit));

                //Com.CommandText = "[dbo].ERP_ForwWeb_PaymentDetails";
                Com.CommandText = "[dbo]." + pStoredProcedureName;
                Com.Parameters[0].Value = pTrans_Type;
                Com.Parameters[1].Value = pSubAccount_ID;
                Com.Parameters[2].Value = pAccount_ID;
                Com.Parameters[3].Value = pIsMain;

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
        public Exception A_SingleID_Posting(string pStoredProcedureName, String pID, Int32 pUser_ID)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            SqlTransaction tr;
            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;

                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.VarChar));
                Com.Parameters.Add(new SqlParameter("@UserID ", SqlDbType.Int));
                //Com.CommandText = "[dbo].ERP_ForwWeb_PaymentDetails";
                Com.CommandText = "[dbo]." + pStoredProcedureName;
                Com.Parameters[0].Value = pID;
                Com.Parameters[1].Value = pUser_ID;

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
        public Exception A_ID_WithUserID(string pStoredProcedureName, Int64 pID, Int32 pUser_ID)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            SqlTransaction tr;
            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;

                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@UserID ", SqlDbType.Int));
                //Com.CommandText = "[dbo].ERP_ForwWeb_PaymentDetails";
                Com.CommandText = "[dbo]." + pStoredProcedureName;
                Com.Parameters[0].Value = pID;
                Com.Parameters[1].Value = pUser_ID;

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

        public Exception A_CashInVouchers_Posting(string pStoredProcedureName, string pCashInVoucherIDs, DateTime pGivenDate, Int32 pUser_ID)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            SqlTransaction tr;
            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;

                Com.Parameters.Add(new SqlParameter("@CashInVoucherIDs", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@GivenDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@UserID ", SqlDbType.Int));
                //Com.CommandText = "[dbo].ERP_ForwWeb_PaymentDetails";
                Com.CommandText = "[dbo]." + pStoredProcedureName;
                Com.Parameters[0].Value = pCashInVoucherIDs;
                Com.Parameters[1].Value = pGivenDate;
                Com.Parameters[2].Value = pUser_ID;

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
        public Exception A_CashOutVouchers_Posting(string pStoredProcedureName, string pCashOutVoucherIDs, DateTime pGivenDate, Int32 pUser_ID)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            SqlTransaction tr;
            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;

                Com.Parameters.Add(new SqlParameter("@CashOutVoucherIDs", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@GivenDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@UserID ", SqlDbType.Int));
                //Com.CommandText = "[dbo].ERP_ForwWeb_PaymentDetails";
                Com.CommandText = "[dbo]." + pStoredProcedureName;
                Com.Parameters[0].Value = pCashOutVoucherIDs;
                Com.Parameters[1].Value = pGivenDate;
                Com.Parameters[2].Value = pUser_ID;

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
        public Exception A_ChequeInVouchers_Posting(string pStoredProcedureName, string pChequeInVoucherIDs, DateTime pGivenDate, Int32 pUser_ID)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            SqlTransaction tr;
            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;

                Com.Parameters.Add(new SqlParameter("@ChequeInVoucherIDs", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@GivenDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@UserID ", SqlDbType.Int));
                //Com.CommandText = "[dbo].ERP_ForwWeb_PaymentDetails";
                Com.CommandText = "[dbo]." + pStoredProcedureName;
                Com.Parameters[0].Value = pChequeInVoucherIDs;
                Com.Parameters[1].Value = pGivenDate;
                Com.Parameters[2].Value = pUser_ID;

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
        public Exception A_ChequeOutVouchers_Posting(string pStoredProcedureName, string pChequeOutVoucherIDs, DateTime pGivenDate, Int32 pUser_ID)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            SqlTransaction tr;
            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;

                Com.Parameters.Add(new SqlParameter("@ChequeOutVoucherIDs", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@GivenDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@UserID ", SqlDbType.Int));
                //Com.CommandText = "[dbo].ERP_ForwWeb_PaymentDetails";
                Com.CommandText = "[dbo]." + pStoredProcedureName;
                Com.Parameters[0].Value = pChequeOutVoucherIDs;
                Com.Parameters[1].Value = pGivenDate;
                Com.Parameters[2].Value = pUser_ID;

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
        //used for both SPs: A_ChequeStatus_PostPayable, A_ChequeStatus_PostReceivable
        public Exception A_ChequeStatus_PostingReceivablePayableNotes(string pStoredProcedureName, Int64 pVoucherID, DateTime pJVDate, Int32 pUser_ID)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            SqlTransaction tr;
            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;

                Com.Parameters.Add(new SqlParameter("@VoucherID", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@JVDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@UserID ", SqlDbType.Int));
                //Com.CommandText = "[dbo].ERP_ForwWeb_PaymentDetails";
                Com.CommandText = "[dbo]." + pStoredProcedureName;
                Com.Parameters[0].Value = pVoucherID;
                Com.Parameters[1].Value = pJVDate;
                Com.Parameters[2].Value = pUser_ID;

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
        public Exception A_CashVouchers_UnPosted_ByID(string pStoredProcedureName, string pVoucherIDs, int pUserID)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            SqlTransaction tr;
            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;

                Com.Parameters.Add(new SqlParameter("@VoucherIDs", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@UserID", SqlDbType.Int));
                //Com.CommandText = "[dbo].ERP_ForwWeb_PaymentDetails";
                Com.CommandText = "[dbo]." + pStoredProcedureName;
                Com.Parameters[0].Value = pVoucherIDs;
                Com.Parameters[1].Value = pUserID;

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
        public Exception A_ChequeVouchers_UnPosted_ByID(string pStoredProcedureName, string pVoucherIDs, int pUserID)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            SqlTransaction tr;
            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;

                Com.Parameters.Add(new SqlParameter("@VoucherIDs", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@UserID", SqlDbType.Int));
                //Com.CommandText = "[dbo].ERP_ForwWeb_PaymentDetails";
                Com.CommandText = "[dbo]." + pStoredProcedureName;
                Com.Parameters[0].Value = pVoucherIDs;
                Com.Parameters[1].Value = pUserID;

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
        public Exception A_postingShiplinkInvoice(string pStoredProcedureName, string pIDs,DateTime pDate, int pUserID)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            SqlTransaction tr;
            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;

                Com.Parameters.Add(new SqlParameter("@InvoiceIDs", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@PostingDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@SHUserID", SqlDbType.Int));
                //Com.CommandText = "[dbo].ERP_ForwWeb_PaymentDetails";
                Com.CommandText = "[dbo]." + pStoredProcedureName;
                Com.Parameters[0].Value = "'," + pIDs + ",'";
                Com.Parameters[1].Value = pDate;
                Com.Parameters[2].Value = pUserID;

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
        public Exception FA_AdditionPosting(string pStoredProcedureName, string pTransactionID)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            SqlTransaction tr;
            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;

                Com.Parameters.Add(new SqlParameter("@TransactionID", SqlDbType.NVarChar));
                //Com.CommandText = "[dbo].ERP_ForwWeb_PaymentDetails";
                Com.CommandText = "[dbo]." + pStoredProcedureName;
                Com.Parameters[0].Value = pTransactionID;

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

        public Exception A_postingPayment(string pStoredProcedureName, string pIDs, DateTime pDate, int pUserID)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            SqlTransaction tr;
            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                Com.CommandTimeout = 300;


                Com.Parameters.Add(new SqlParameter("@IDs", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@JVDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@UserID", SqlDbType.Int));
                //Com.CommandText = "[dbo].ERP_ForwWeb_PaymentDetails";
                Com.CommandText = "[dbo]." + pStoredProcedureName;
                Com.Parameters[0].Value = "'," + pIDs + ",'";
                Com.Parameters[1].Value = pDate;
                Com.Parameters[2].Value = pUserID;

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

        public string SP_A_JV_Get_Code(string pStoredProcedureName, DateTime pDate, Int32 pUserID, Int32 pJournal_ID)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            SqlTransaction tr;
            string pNewCode = "";
            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;

                Com.Parameters.Add(new SqlParameter("@Date ", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@UserID ", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@Journal_ID ", SqlDbType.Int));

                //Com.CommandText = "[dbo].ERP_ForwWeb_PaymentDetails";
                Com.CommandText = "[dbo]." + pStoredProcedureName;
                Com.Parameters[0].Value = pDate;
                Com.Parameters[1].Value = pUserID;
                Com.Parameters[2].Value = pJournal_ID;

                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        pNewCode = dr[0].ToString();
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
            return pNewCode;
        }
        public string A_CashVoucher_GetCode_BySafeCode(string pStoredProcedureName, Int32 pSafeID, DateTime pDate, Int32 pVoucherType)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            SqlTransaction tr;
            string pNewCode = "";
            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;

                Com.Parameters.Add(new SqlParameter("@SafeID ", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@Date ", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@VoucherType ", SqlDbType.Int));

                //Com.CommandText = "[dbo].ERP_ForwWeb_PaymentDetails";
                Com.CommandText = "[dbo]." + pStoredProcedureName;
                Com.Parameters[0].Value = pSafeID;
                Com.Parameters[1].Value = pDate;
                Com.Parameters[2].Value = pVoucherType;

                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        pNewCode = dr[0].ToString();
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
            return pNewCode;
        }
        public string A_ChequeVoucher_GetCodeByBank(string pStoredProcedureName, DateTime pDate, Int32 pBankID, Int32 pVoucherType, Int32 pSafeID)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            SqlTransaction tr;
            string pNewCode = "";
            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;

                Com.Parameters.Add(new SqlParameter("@Date ", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@BankID ", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@VoucherType ", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@SafeID ", SqlDbType.Int));

                //Com.CommandText = "[dbo].ERP_ForwWeb_PaymentDetails";
                Com.CommandText = "[dbo]." + pStoredProcedureName;
                Com.Parameters[0].Value = pDate;
                Com.Parameters[1].Value = pBankID;
                Com.Parameters[2].Value = pVoucherType;
                Com.Parameters[3].Value = pSafeID;

                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        pNewCode = dr[0].ToString();
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
            return pNewCode;
        }

        public string A_ChequeVoucher_GetNextChequeNo(string pStoredProcedureName, Int32 pBankID, Int32 pVoucherType)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            SqlTransaction tr;
            string pNewCode = "";
            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;

                Com.Parameters.Add(new SqlParameter("@BankID ", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@VoucherType ", SqlDbType.Int));

                //Com.CommandText = "[dbo].ERP_ForwWeb_PaymentDetails";
                Com.CommandText = "[dbo]." + pStoredProcedureName;
                Com.Parameters[0].Value = pBankID;
                Com.Parameters[1].Value = pVoucherType;

                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        pNewCode = dr[0].ToString();
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
            return pNewCode;
        }


        public string A_CashVoucher_GetCode_BySafeCode2(string pStoredProcedureName, Int32 pSafeID, DateTime pDate, Int32 pVoucherType)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            SqlTransaction tr;
            string pNewCode = "";
            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;

                Com.Parameters.Add(new SqlParameter("@SafeID ", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@Date ", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@VoucherType ", SqlDbType.Int));

                //Com.CommandText = "[dbo].ERP_ForwWeb_PaymentDetails";
                Com.CommandText = "[dbo]." + pStoredProcedureName;
                Com.Parameters[0].Value = pSafeID;
                Com.Parameters[1].Value = pDate;
                Com.Parameters[2].Value = pVoucherType;

                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        pNewCode = dr[0].ToString();
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
            return pNewCode;
        }
        public string A_ChequeVoucher_GetCodeByBank2(string pStoredProcedureName, DateTime pDate, Int32 pBankID, Int32 pVoucherType, Int32 pSafeID)

        {
            Exception Exp = null;
            // SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            // SqlTransaction tr;

            //********
            GlobalConnection.myCommand = new SqlCommand();
            GlobalConnection.myCommand.Connection = GlobalConnection.myConnection;
            GlobalConnection.myCommand.Transaction = GlobalConnection.myTrans;

            GlobalConnection.myCommand.CommandType = CommandType.StoredProcedure;
            GlobalConnection.myCommand.CommandTimeout = 0;
            Com = GlobalConnection.myCommand;
            //*********




            string pNewCode = "";
            try
            {
                // Con.Open();
                // tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                // Com = new SqlCommand();
                // Com.CommandType = CommandType.StoredProcedure;
                // Com.CommandTimeout = 800;


                Com.Parameters.Add(new SqlParameter("@Date ", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@BankID ", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@VoucherType ", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@SafeID ", SqlDbType.Int));

                //Com.CommandText = "[dbo].ERP_ForwWeb_PaymentDetails";
                Com.CommandText = "[dbo]." + pStoredProcedureName;
                Com.Parameters[0].Value = pDate;
                Com.Parameters[1].Value = pBankID;
                Com.Parameters[2].Value = pVoucherType;
                Com.Parameters[3].Value = pSafeID;

                //Com.Transaction = tr;
                // Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        pNewCode = dr[0].ToString();
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
                // tr.Commit();
            }
            catch (Exception ex)
            {
                Exp = ex;
            }
            finally
            {
                // Con.Close();
                //  Con.Dispose();
            }
            return pNewCode;
        }

        public Exception A_Voucher_Posting(string pStoredProcedureName, long pID, DateTime pGivenDate, Int32 pUserID)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            SqlTransaction tr;
            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;

                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@GivenDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@UserID ", SqlDbType.Int));
                Com.CommandText = "[dbo]." + pStoredProcedureName;
                Com.Parameters[0].Value = pID;
                Com.Parameters[1].Value = pGivenDate;
                Com.Parameters[2].Value = pUserID;

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


        public string A_SubAccounts_CheckForDelete(string pStoredProcedureName, Int32 pSubAccountID)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            SqlTransaction tr;
            string pHasDetails = "";
            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;

                Com.Parameters.Add(new SqlParameter("@SubAccountID ", SqlDbType.Int));

                //Com.CommandText = "[dbo].ERP_ForwWeb_PaymentDetails";
                Com.CommandText = "[dbo]." + pStoredProcedureName;
                Com.Parameters[0].Value = pSubAccountID;

                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        pHasDetails = dr[0].ToString();
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
            return pHasDetails;
        }

        public Exception SP_InsertUpdateSLInvoiceJVs_Item(string pShipping_InvoiceIDs, Int64 pJVID2)
        {
            string pStoredProcedureName = "InsertUpdateItemSL_InvoiceJVs";

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            SqlTransaction tr;
            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;

                Com.Parameters.Add(new SqlParameter("@Shipping_InvoiceIDs", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@JVID2", SqlDbType.Int));

                Com.CommandText = "[dbo]." + pStoredProcedureName;
                Com.Parameters[0].Value = pShipping_InvoiceIDs;
                Com.Parameters[1].Value = pJVID2;


                Com.CommandTimeout = 200;
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

        public Exception SP_IST_Proc(string pStoredProcedureName, DateTime pFromDate)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            SqlTransaction tr;
            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;

                Com.Parameters.Add(new SqlParameter("@ToDate", SqlDbType.DateTime));

                Com.CommandText = "[dbo]." + pStoredProcedureName;
                Com.Parameters[0].Value = pFromDate;



                Com.CommandTimeout = 10000;
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

        public Exception SP_IST_Proc(string pStoredProcedureName)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            SqlTransaction tr;
            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;

                Com.CommandText = "[dbo]." + pStoredProcedureName;

                Com.CommandTimeout = 10000;
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
        public Exception SP_ProcWithException(string pStoredProcedureName)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            SqlTransaction tr;
            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.Text;

                Com.CommandText = pStoredProcedureName;

                Com.CommandTimeout = 10000;
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

        public Exception SP_PS_PostingInvoicesGroubByTax(string pStoredProcedureName,string pIDs, DateTime pJvDate , int pTaxDebitID  , int pTaxCreditID , int pUserID)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            SqlTransaction tr;
            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;


                Com.Parameters.Add(new SqlParameter("@IDs", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@JvDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@TaxDebitID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@TaxCreditID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@UserID", SqlDbType.Int));

                Com.CommandText = "[dbo]." + pStoredProcedureName;
                Com.Parameters[0].Value = pIDs;
                Com.Parameters[1].Value = pJvDate;
                Com.Parameters[2].Value = pTaxDebitID;
                Com.Parameters[3].Value = pTaxCreditID;
                Com.Parameters[4].Value = pUserID;



                Com.CommandTimeout = 10000;
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

        public Exception SP_HoldTrans_Log(string pStoredProcedureName, Int32 pUser_ID, string pTable_Name, Int64 pRow_ID, string pTrans_Type, string pHoldReason)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            SqlTransaction tr;
            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;

                Com.Parameters.Add(new SqlParameter("@User_ID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@Table_Name", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@Row_ID ", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@Trans_Type ", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@HoldReason ", SqlDbType.NVarChar));
                //Com.CommandText = "[dbo].ERP_ForwWeb_PaymentDetails";
                Com.CommandText = "[dbo]." + pStoredProcedureName;
                Com.Parameters[0].Value = pUser_ID;
                Com.Parameters[1].Value = pTable_Name;
                Com.Parameters[2].Value = pRow_ID;
                Com.Parameters[3].Value = pTrans_Type;
                Com.Parameters[4].Value = pHoldReason;

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

        public Exception SP_A_ReverseJV( Int64 pJVID, int pUserID, DateTime pNewJVDate)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            SqlTransaction tr;
            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;

                Com.Parameters.Add(new SqlParameter("@JVID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@UserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@NewJVDate", SqlDbType.DateTime));


                Com.CommandText = "[dbo].A_ReverseJV" ;
                Com.Parameters[0].Value = pJVID;
                Com.Parameters[1].Value = pUserID;
                Com.Parameters[2].Value = pNewJVDate;


                Com.CommandTimeout = 10000;
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

        public object[] A_PaymentRequest_CalcBL(string pStoredProcedureName, int pBLCalcTypeID,int pContainerID, string pContainerNumber
          ,int pOperationID,   decimal pTotalAmount, Int32 pUser_ID)
        {
            string errorMessage = "";
            DataTable dataTable = new DataTable();
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            SqlTransaction tr;
            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;

                Com.Parameters.Add(new SqlParameter("@BLCalcTypeID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ContainerID ", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ContainerNumber", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@OperationID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@TotalAmount", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@UserID ", SqlDbType.Int));

                // Add output parameter for @Error_Msg
                SqlParameter errorParam = new SqlParameter("@Error_Msg", SqlDbType.NVarChar,4000);
                errorParam.Direction = ParameterDirection.Output;
                Com.Parameters.Add(errorParam);

                Com.CommandText = "[dbo]." + pStoredProcedureName;
                Com.Parameters[0].Value = pBLCalcTypeID;
                Com.Parameters[1].Value = pContainerID;
                Com.Parameters[2].Value = pContainerNumber;
                Com.Parameters[3].Value = pOperationID;
                Com.Parameters[4].Value = pTotalAmount;
                Com.Parameters[5].Value = pUser_ID;

                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();

                try
                {
                    for (int intIndex = 0; intIndex < dr.FieldCount; intIndex++)
                    {
                        // create and add a column
                        //dataTable.Columns.Add(Create_Column(SDRResult.GetName(intIndex), SDRResult.GetDataTypeName(intIndex)));
                        dataTable.Columns.Add(dr.GetName(intIndex), dr.GetFieldType(intIndex));
                    }
                    while (dr.Read())
                    {
                        // add a row
                        DataRow row = dataTable.NewRow();
                        for (int intIndex = 0; intIndex < dr.FieldCount; intIndex++)
                        {
                            row[dr.GetName(intIndex)] = dr[dr.GetName(intIndex)];
                        }
                        dataTable.Rows.Add(row);
                     
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
                        errorMessage = Convert.ToString(Com.Parameters["@Error_Msg"].Value);
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
              return new object[] {
                   Exp , dataTable,errorMessage
                };
        }


        public Exception Mesco_Invoice_Posting(string pStoredProcedureName, int pID, int pUserID, bool pApprove)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            SqlTransaction tr;
            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;

                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@UserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@Approve ", SqlDbType.Bit));
                //Com.CommandText = "[dbo].ERP_ForwWeb_PaymentDetails";
                Com.CommandText = "[dbo]." + pStoredProcedureName;
                Com.Parameters[0].Value = pID;
                Com.Parameters[1].Value = pUserID;
                Com.Parameters[2].Value = pApprove;

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
        public Exception Mesco_Operation_Closing(string pStoredProcedureName, int pOperationID, int pUserID, bool pApprove , DateTime pOperationCloseDate)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            SqlTransaction tr;
            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;

                Com.Parameters.Add(new SqlParameter("@OperationID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@UserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@Approve ", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@OperationCloseDate ", SqlDbType.DateTime));
                
                //Com.CommandText = "[dbo].ERP_ForwWeb_PaymentDetails";
                Com.CommandText = "[dbo]." + pStoredProcedureName;
                Com.Parameters[0].Value = pOperationID;
                Com.Parameters[1].Value = pUserID;
                Com.Parameters[2].Value = pApprove;
                Com.Parameters[3].Value = pOperationCloseDate;

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
        public Exception Mesco_A_PaymentRequestJVNew_Posting(string pStoredProcedureName, int pID, int pUserID, bool pApprove)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            SqlTransaction tr;
            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;

                Com.Parameters.Add(new SqlParameter("@CashInVoucherIDs", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@UserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@Approve ", SqlDbType.Bit));
                //Com.CommandText = "[dbo].ERP_ForwWeb_PaymentDetails";
                Com.CommandText = "[dbo]." + pStoredProcedureName;
                Com.Parameters[0].Value = pID;
                Com.Parameters[1].Value = pUserID;
                Com.Parameters[2].Value = pApprove;

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
        #endregion DB Customized SPs

        #region DB functions
        public string ExecuteQuery(string query)
        {
            try
            {
                using (var connection = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString()))
                {
                    connection.Open();
                    using (var command = new SqlCommand(query, connection))
                    {
                        command.ExecuteNonQuery();
                    }
                }
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

            return null; // No exception occurred
        }

        public string CallStringFunction(string pStrQuery)
        {
            var NewCode = "";
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            SqlTransaction tr;
            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                //Com = new SqlCommand("SELECT [dbo]." + pFunctionName + "(" + (pCostCenterParentID == 0 ? "null" : pCostCenterParentID.ToString()) + ") AS Code",Con);
                Com = new SqlCommand(pStrQuery, Con);
                //Com.CommandType = CommandType.StoredProcedure;
                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        NewCode = dr[0].ToString();
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
            return NewCode;
        }

        public string CallStringFunctionWithImage( byte[] pdata,string pInvoiceID)
        {
            var NewCode = "";
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            SqlTransaction tr;
            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                //Com = new SqlCommand("SELECT [dbo]." + pFunctionName + "(" + (pCostCenterParentID == 0 ? "null" : pCostCenterParentID.ToString()) + ") AS Code",Con);      
                // Com = new SqlCommand(pStrQuery, Con);

                string ProcString = @"if exists(select 1 from[InvoiceQRImage] QR where QR.InvoiceID = @InvoiceID) update[InvoiceQRImage] set QRImage = @Img where InvoiceID = @InvoiceID  else  insert into[InvoiceQRImage] values(@InvoiceID, @Img)";


                Com = new SqlCommand(ProcString, Con);
                Com.Parameters.Clear();
                Com.Parameters.AddWithValue("@InvoiceID", pInvoiceID);
                Com.Parameters.AddWithValue("@Img", pdata);
                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        NewCode = dr[0].ToString();
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
            return NewCode;
        }

        public object GetImageByInvoiceID(string InvoiceID)
        {

            SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());

            object pImage = null;
            con.Open();
            SqlCommand cmd;
            cmd = new SqlCommand("select QRImage from Invoices where ID = " + InvoiceID, con);

            SqlDataAdapter da = new SqlDataAdapter(cmd);

            DataSet ds = new DataSet();

            da.Fill(ds);
            MemoryStream ms =new MemoryStream();
            if (ds.Tables[0].Rows.Count > 0)

            {
                pImage = Convert.ToBase64String((byte[])ds.Tables[0].Rows[0]["QRImage"]);
             //  ms = new MemoryStream((byte[])ds.Tables[0].Rows[0]["QRImage"]);

            }
            return pImage;


        }
        public string GetImageURLByInvoiceID(string InvoiceID)
        {
            string storagePath = HttpContext.Current.Server.MapPath("~/Content/Images/"); // Adjust the path as needed
            string fileName = $"QRImage_{InvoiceID}.png"; // Create a unique file name
            string filePath = Path.Combine(storagePath, fileName);

            using (SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString()))
            {
                con.Open();
                using (SqlCommand cmd = new SqlCommand("SELECT QRImage FROM Invoices WHERE ID = @InvoiceID", con))
                {
                    cmd.Parameters.AddWithValue("@InvoiceID", InvoiceID);

                    using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                    {
                        DataSet ds = new DataSet();
                        da.Fill(ds);

                        if (ds.Tables[0].Rows.Count > 0)
                        {
                            object qrImageValue = ds.Tables[0].Rows[0]["QRImage"];
                            byte[] imageBytes = null;

                            if (qrImageValue != DBNull.Value)
                            {
                                imageBytes = (byte[])qrImageValue;
                            }
                            else
                            {
                                // Handle the case where the image is null, e.g., set imageBytes to an empty array or take other actions
                                imageBytes = new byte[0]; // or handle it as needed
                            }

                            //byte[] imageBytes = (byte[])ds.Tables[0].Rows[0]["QRImage"];
                            File.WriteAllBytes(filePath, imageBytes); // Save the image to the specified path

                            // Return the link to the stored image
                            string qrImageUrl =  $"Content/Images/{fileName}"; // Adjust the URL as needed
                            string qrImageUrlServer = HttpContext.Current.Server.MapPath($"~/{qrImageUrl}");

                            return  qrImageUrlServer.Replace("/", "\\");
                        }
                    }
                }
            }

            return null; // Return null if no image is found
        }

        public Exception CallProcFunction(string pStrQuery)
        {
            var NewCode = "";
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            SqlTransaction tr;
            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                //Com = new SqlCommand("SELECT [dbo]." + pFunctionName + "(" + (pCostCenterParentID == 0 ? "null" : pCostCenterParentID.ToString()) + ") AS Code",Con);
                Com = new SqlCommand(pStrQuery, Con);
                //Com.CommandType = CommandType.StoredProcedure;
                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        NewCode = dr[0].ToString();
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
        public string CallStringFunctionReturn(string pStrQuery)
        {
            var NewCode = "";
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            SqlTransaction tr;

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                //Com = new SqlCommand("SELECT [dbo]." + pFunctionName + "(" + (pCostCenterParentID == 0 ? "null" : pCostCenterParentID.ToString()) + ") AS Code",Con);
                Com = new SqlCommand(pStrQuery, Con);
                //Com.CommandType = CommandType.StoredProcedure;
                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        NewCode = dr[0].ToString();
                    }
                }
                catch (Exception ex)
                {
                    Exp = ex;
                }
                finally
                {
                    //NewCode = NewCode.Substring(0, (NewCode.Length - 1));

                    if (dr != null)
                    {
                        dr.Close();
                        dr.Dispose();
                    }
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
            }
            return NewCode;
        }
        public string CallStringFunctionByMultiReturn(string pStrQuery)
        {
            var NewCode = "";
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            SqlTransaction tr;
            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                //Com = new SqlCommand("SELECT [dbo]." + pFunctionName + "(" + (pCostCenterParentID == 0 ? "null" : pCostCenterParentID.ToString()) + ") AS Code",Con);
                Com = new SqlCommand(pStrQuery, Con);
                //Com.CommandType = CommandType.StoredProcedure;
                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        NewCode += dr[0].ToString() + ",";
                    }
                }
                catch (Exception ex)
                {
                    Exp = ex;
                }
                finally
                {
                    NewCode = NewCode.Substring(0, (NewCode.Length - 1));

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
            return NewCode;
        }

        public DataTable ExecuteQuery_DataTable(string mySelectQuery)
        {
            DataTable dataTable = new DataTable();
            SqlConnection myConnection = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlDataReader SDRResult;
            //Open Connenction
            myConnection.Open();
            SqlCommand myCommand = new SqlCommand(mySelectQuery, myConnection);
            myCommand.CommandTimeout = 0;
            //Create Command
            SDRResult = myCommand.ExecuteReader();
            for (int intIndex = 0; intIndex < SDRResult.FieldCount; intIndex++)
            {
                // create and add a column
                //dataTable.Columns.Add(Create_Column(SDRResult.GetName(intIndex), SDRResult.GetDataTypeName(intIndex)));
                dataTable.Columns.Add(SDRResult.GetName(intIndex), SDRResult.GetFieldType(intIndex));
            }
            while (SDRResult.Read())
            {
                // add a row
                DataRow row = dataTable.NewRow();
                for (int intIndex = 0; intIndex < SDRResult.FieldCount; intIndex++)
                {
                    row[SDRResult.GetName(intIndex)] = SDRResult[SDRResult.GetName(intIndex)];
                }
                dataTable.Rows.Add(row);
            }
            //Close Reader
            SDRResult.Close();
            //Close Connection
            myConnection.Close();
            //Return Result of Executed Query
           return dataTable;
        }

        // By Mostafa Gamil
        //var OperationsList2 = objCCustomizedDBCall2.ExecuteQuery_ListOfObjects("select ID,Code,Notes from vwOperationsStatistics", typeof(CVarvwOperationsStatistics));
        public List<object> ExecuteQuery_ListOfObjects(string mySelectQuery, Type type)
        {
            DataTable dt = ExecuteQuery_DataTable(mySelectQuery);
            int _RowCount = dt.Rows.Count;

            List<Dictionary<string, object>> rows = new List<Dictionary<string, object>>();
            Dictionary<string, object> row;
            foreach (DataRow dr in dt.Rows)
            {
                row = new Dictionary<string, object>();
                foreach (DataColumn col in dt.Columns)
                {
                    row.Add(col.ColumnName, dr[col] == DBNull.Value ? string.Empty : dr[col]);
                }
                rows.Add(row);
            }


            

            // Convert List Of Dictionaries into objCvwOperationsStatistics.lstCVarvwOperationsStatistics
            var OperationsList = rows.Select(dict =>
            {
                object operation = Activator.CreateInstance(type);
                //CVarvwOperationsStatistics operation = new CVarvwOperationsStatistics();
                foreach (var prop in type.GetProperties())
                {
                    if (dict.ContainsKey(prop.Name))
                    {
                        var value = dict[prop.Name];
                        if (prop.PropertyType == typeof(int))
                        {
                            prop.SetValue(operation, value == "" ? 0 : value);
                        }
                        else if (prop.PropertyType == typeof(long))
                        {
                            prop.SetValue(operation, value == "" ? 0 : value);
                        }
                        else if (prop.PropertyType == typeof(DateTime))
                        {
                            prop.SetValue(operation, value == "" ? DateTime.MinValue : value);
                        }
                        else if (prop.PropertyType == typeof(bool))
                        {
                            prop.SetValue(operation, value == "" ? false : value);
                        }
                        else if (prop.PropertyType == typeof(Decimal))
                        {
                            prop.SetValue(operation, value == "" ? Decimal.Zero : value);
                        }
                        else if (prop.PropertyType == typeof(Double))
                        {
                            prop.SetValue(operation, value == "" ? 0.0 : value);
                        }
                        else
                        {
                            prop.SetValue(operation, value.ToString());
                        }
                    }
                    else if (prop.PropertyType == typeof(int) || prop.PropertyType == typeof(long))
                    {
                        prop.SetValue(operation, 0);
                    }
                    else if (prop.PropertyType == typeof(DateTime))
                    {
                        prop.SetValue(operation, DateTime.MinValue);
                    }
                    else if (prop.PropertyType == typeof(Decimal))
                    {
                        prop.SetValue(operation, Decimal.Zero);
                    }
                    else if (prop.PropertyType == typeof(Double))
                    {
                        prop.SetValue(operation, 0.0);
                    }
                    else if (prop.PropertyType == typeof(bool))
                    {
                        prop.SetValue(operation, false);
                    }
                }
                return operation;
            }).ToList();



            return OperationsList;
        }

		public DataTable GetDistinctRecords(DataTable dt, string[] Columns)
        {
            DataTable dtUniqRecords = new DataTable();
            dtUniqRecords = dt.DefaultView.ToTable(true, Columns);
            return dtUniqRecords;
        }

        public List<string> ExecuteQuery_Array(string mySelectQuery)
        {
            List<string> IDs = new List<string>();
            DataTable dataTable = new DataTable();
            SqlConnection myConnection = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlDataReader SDRResult;
            //Open Connenction
            myConnection.Open();
            SqlCommand myCommand = new SqlCommand(mySelectQuery, myConnection);
            myCommand.CommandTimeout = 0;
            //Create Command
            SDRResult = myCommand.ExecuteReader();
            for (int intIndex = 0; intIndex < SDRResult.FieldCount; intIndex++)
            {
                // create and add a column
                //dataTable.Columns.Add(Create_Column(SDRResult.GetName(intIndex), SDRResult.GetDataTypeName(intIndex)));
                dataTable.Columns.Add(SDRResult.GetName(intIndex), SDRResult.GetFieldType(intIndex));
            }
            while (SDRResult.Read())
            {
                // add a row
                DataRow row = dataTable.NewRow();
                for (int intIndex = 0; intIndex < SDRResult.FieldCount; intIndex++)
                {
                    row[SDRResult.GetName(intIndex)] = SDRResult[SDRResult.GetName(intIndex)];
                }
                dataTable.Rows.Add(row);
                IDs.Add(row[0].ToString());

            }
            //Close Reader
            SDRResult.Close();
            //Close Connection
            myConnection.Close();
            //Return Result of Executed Query
            return IDs;
        }

        public string CallStringFunctionWithImage(string pStrQuery, byte[] data)
        {
            var NewCode = "";
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            SqlTransaction tr;
            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                //Com = new SqlCommand("SELECT [dbo]." + pFunctionName + "(" + (pCostCenterParentID == 0 ? "null" : pCostCenterParentID.ToString()) + ") AS Code",Con);      
                Com = new SqlCommand(pStrQuery, Con);
                Com.Parameters.Clear();
                Com.Parameters.AddWithValue("@img", data);
                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        NewCode = dr[0].ToString();
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
            return NewCode;
        }
		#endregion DB functions

		#region DB DM
		public NonQueryResult Insert(string pTable, string[] pData, string pColumns = null)
		{
			NonQueryResult result = new NonQueryResult();
			if (string.IsNullOrWhiteSpace(pTable) || pData == null || pData?.Length == 0)
				return result;

			SqlConnection Con=null;
			SqlTransaction tr=null;
			try
			{
				int rowsAffected = 0;
				int rowsCount = 0;
				using (Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString()))
				{
					Con.Open();
					tr = Con.BeginTransaction(IsolationLevel.Serializable);
					using (SqlCommand Com = new SqlCommand())
					{
						Com.Connection = Con;
						Com.Transaction = tr;
						StringBuilder builder = new StringBuilder($"insert into {pTable} ");
						if (pColumns != null)
						{
							builder.Append($"({pColumns})");
						}
						builder.Append($"values");
						foreach (var item in pData)
						{
							builder.Append($"({item}),");
							rowsCount++;

							if (rowsCount == 1000)
							{
								Com.CommandText = builder.ToString().TrimEnd(',');
								rowsAffected+= Com.ExecuteNonQuery();
								rowsCount = 0;

								builder.Clear();
								builder.Append($"insert into {pTable} ");
								if (pColumns != null)
								{
									builder.Append($"({pColumns})");
								}
								builder.Append($"values");

							}
						}
						Com.CommandText = builder.ToString().TrimEnd(',');
						rowsAffected += Com.ExecuteNonQuery();
						tr.Commit();
					}					
				}
				result.RowsAffected = rowsAffected;
			}
			catch (Exception ex)
			{
				result.Exception = ex;
				if (tr != null)
					tr.Rollback();
			}
			finally
			{
				Con.Close();
				Con.Dispose();
			}
			return result;
		}
		public NonQueryResult Update(string pUpdateClause)
		{
			NonQueryResult result = new NonQueryResult();
			SqlConnection Con = null;
			SqlTransaction tr=null;
			try
			{
				using (Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString()))
				{
					Con.Open();
					tr = Con.BeginTransaction(IsolationLevel.Serializable);
					using (SqlCommand Com = new SqlCommand(pUpdateClause, Con))
					{
						Com.Connection = Con;
						Com.Transaction = tr;
						result.RowsAffected=Com.ExecuteNonQuery();
						tr.Commit();
					}					
				}
			}
			catch (Exception ex)
			{
				result.Exception = ex;
				if (tr != null)
					tr.Rollback();
			}
			finally
			{
				Con.Close();
				Con.Dispose();
			}
			return result;
		}
		public NonQueryResult Delete(string pTable, string pWhere)
		{
			NonQueryResult result = new NonQueryResult ();
			SqlConnection Con = null;
			SqlTransaction tr = null;
			try
			{
				using (Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString()))
				{
					Con.Open();
					tr = Con.BeginTransaction(IsolationLevel.Serializable);
					using (SqlCommand Com = new SqlCommand($"delete from {pTable} where {pWhere}", Con))
					{
						Com.Connection = Con;
						Com.Transaction = tr;
						result.RowsAffected = Com.ExecuteNonQuery();
						tr.Commit();
					}
				}
			}
			catch (Exception ex)
			{
				result.Exception = ex;
				if (tr != null)
					tr.Rollback();
			}
			finally
			{
				Con.Close();
				Con.Dispose();
			}
			return result;
		}
		#endregion
	}

	public class NonQueryResult
	{
		public Exception Exception { get; set; }
		public int RowsAffected { get; set; }
	}
}
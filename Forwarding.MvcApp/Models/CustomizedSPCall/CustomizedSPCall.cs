using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.CustomizedSPCall
{
    public class CCallCustomizedSP
    {
        public Exception CallCustomizedSP(string pStoredProcedureName, Int64 pID, Int32 pUserID, bool pApproved, Int32 pCostCenterID)
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
                Com.CommandTimeout = 120;
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@UserID ", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@Approved ", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@CostCenterID ", SqlDbType.Int));
                //Com.CommandText = "[dbo].ERP_ForwWeb_PaymentDetails";
                Com.CommandText = "[dbo]." + pStoredProcedureName;
                Com.Parameters[0].Value = pID;
                Com.Parameters[1].Value = pUserID;
                Com.Parameters[2].Value = pApproved;
                Com.Parameters[3].Value = pCostCenterID;
                
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
        public Exception CallCustomizedSPTax(string pStoredProcedureName, Int64 pID, Int32 pUserID, bool pApproved, Int32 pCostCenterID, Int32 pAccountIDCharge, Int32 pSubAccountCharge)
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
                Com.CommandTimeout = 120;
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@UserID ", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@Approved ", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@CostCenterID ", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@AccountIDCharge ", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@SubAccountCharge ", SqlDbType.Int));

                //Com.CommandText = "[dbo].ERP_ForwWeb_PaymentDetails";
                Com.CommandText = "[dbo]." + pStoredProcedureName;
                Com.Parameters[0].Value = pID;
                Com.Parameters[1].Value = pUserID;
                Com.Parameters[2].Value = pApproved;
                Com.Parameters[3].Value = pCostCenterID;
                Com.Parameters[4].Value = pAccountIDCharge;
                Com.Parameters[5].Value = pSubAccountCharge;


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

        public Exception CallCustomizedSP_MultiIDs(string pStoredProcedureName, string pIDs, Int32 pUserID, bool pApproved, Int32 pCostCenterID)
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

                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@UserID ", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@Approved ", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@CostCenterID ", SqlDbType.Int));
                //Com.CommandText = "[dbo].ERP_ForwWeb_PaymentDetails";
                Com.CommandText = "[dbo]." + pStoredProcedureName;
                Com.Parameters[0].Value = pIDs;
                Com.Parameters[1].Value = pUserID;
                Com.Parameters[2].Value = pApproved;
                Com.Parameters[3].Value = pCostCenterID;

                Com.Transaction = tr;
                Com.Connection = Con;
                Com.CommandTimeout = 2000;
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
        public Exception CallCustomizedSP_MultiIDs(string pStoredProcedureName, string pIDs, Int32 pUserID, bool pApproved, Int32 pCostCenterID,DateTime? pJvDate)
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

                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@UserID ", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@Approved ", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@CostCenterID ", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@JvDate ", SqlDbType.DateTime));
                //Com.CommandText = "[dbo].ERP_ForwWeb_PaymentDetails";
                Com.CommandText = "[dbo]." + pStoredProcedureName;
                Com.Parameters[0].Value = pIDs;
                Com.Parameters[1].Value = pUserID;
                Com.Parameters[2].Value = pApproved;
                Com.Parameters[3].Value = pCostCenterID;
                Com.Parameters[4].Value = pJvDate;

                Com.Transaction = tr;
                Com.Connection = Con;
                Com.CommandTimeout = 2000;
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
        public Exception CallCustomizedSP_MultiIDsTax(string pStoredProcedureName, string pIDs, Int32 pUserID, bool pApproved, Int32 pCostCenterID, Int32 pAccountIDCharge, Int32 pSubAccountCharge)
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

                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@UserID ", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@Approved ", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@CostCenterID ", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@AccountIDCharge", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@SubAccountCharge", SqlDbType.Int));

                //Com.CommandText = "[dbo].ERP_ForwWeb_PaymentDetails";
                Com.CommandText = "[dbo]." + pStoredProcedureName;
                Com.Parameters[0].Value = pIDs;
                Com.Parameters[1].Value = pUserID;
                Com.Parameters[2].Value = pApproved;
                Com.Parameters[3].Value = pCostCenterID;
                Com.Parameters[4].Value = pAccountIDCharge;
                Com.Parameters[5].Value = pSubAccountCharge;


                Com.Transaction = tr;
                Com.Connection = Con;
                Com.CommandTimeout = 2000;
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

        //public Exception CallCustomizedSP_MultiIDsWithSafeAndBank(string pStoredProcedureName, string pIDs, Int32 pUserID, bool pApproved, Int32 pCostCenterID, Int32 pSafeID, Int32 pBankID)
        //{

        //    Exception Exp = null;
        //    SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
        //    SqlCommand Com;
        //    SqlDataReader dr;
        //    SqlTransaction tr;
        //    try
        //    {
        //        Con.Open();
        //        tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
        //        Com = new SqlCommand();
        //        Com.CommandType = CommandType.StoredProcedure;
        //        Com.CommandTimeout = 120;
        //        Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.NVarChar));
        //        Com.Parameters.Add(new SqlParameter("@UserID ", SqlDbType.Int));
        //        Com.Parameters.Add(new SqlParameter("@Approved ", SqlDbType.Bit));
        //        Com.Parameters.Add(new SqlParameter("@CostCenterID ", SqlDbType.Int));
        //        Com.Parameters.Add(new SqlParameter("@SafeID ", SqlDbType.Int));
        //        Com.Parameters.Add(new SqlParameter("@BankID ", SqlDbType.Int));
        //        //Com.CommandText = "[dbo].ERP_ForwWeb_PaymentDetails";
        //        Com.CommandText = "[dbo]." + pStoredProcedureName;
        //        Com.Parameters[0].Value = pIDs;
        //        Com.Parameters[1].Value = pUserID;
        //        Com.Parameters[2].Value = pApproved;
        //        Com.Parameters[3].Value = pCostCenterID;
        //        Com.Parameters[4].Value = pSafeID;
        //        Com.Parameters[5].Value = pBankID;

        //        Com.Transaction = tr;
        //        Com.Connection = Con;
        //        dr = Com.ExecuteReader();
        //        try
        //        {
        //            while (dr.Read())
        //            {
        //            }
        //        }
        //        catch (Exception ex)
        //        {
        //            Exp = ex;
        //        }
        //        finally
        //        {
        //            if (dr != null)
        //            {
        //                dr.Close();
        //                dr.Dispose();
        //            }
        //        }
        //        tr.Commit();
        //    }
        //    catch (Exception ex)
        //    {
        //        Exp = ex;
        //    }
        //    finally
        //    {
        //        Con.Close();
        //        Con.Dispose();
        //    }
        //    return Exp;
        //}
        public Exception CallCustomizedSP_MultiIDsWithSafeAndBank(string pStoredProcedureName, string pIDs, Int32 pUserID, bool pApproved, Int32 pCostCenterID, Int32 pSafeID, Int32 pBankID, DateTime pJVDate, Int32 pPaymentAccountID, Int32 pPaymentSubAccountID, bool pIsPayment, bool pIsPaymentSupplierCustdy , bool pIsUnderProcess)
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
                Com.CommandTimeout = 120;
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@UserID ", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@Approved ", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@CostCenterID ", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@SafeID ", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@BankID ", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@JVDate ", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@PaymentAccountID ", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@PaymentSubAccountID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@IsPayment ", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@IsPaymentSupplierCustdy ", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@IsUnderProcess ", SqlDbType.Bit));
                
                //Com.CommandText = "[dbo].ERP_ForwWeb_PaymentDetails";
                Com.CommandText = "[dbo]." + pStoredProcedureName;
                Com.Parameters[0].Value = pIDs;
                Com.Parameters[1].Value = pUserID;
                Com.Parameters[2].Value = pApproved;
                Com.Parameters[3].Value = pCostCenterID;
                Com.Parameters[4].Value = pSafeID;
                Com.Parameters[5].Value = pBankID;
                Com.Parameters[6].Value = pJVDate;
                Com.Parameters[7].Value = pPaymentAccountID;
                Com.Parameters[8].Value = pPaymentSubAccountID;
                Com.Parameters[9].Value = pIsPayment;
                Com.Parameters[10].Value = pIsPaymentSupplierCustdy;
                Com.Parameters[11].Value = pIsUnderProcess;

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

        public Exception CallCustomizedSP_MultiIDsWithSafeAndBankMulti(string pStoredProcedureName, string pIDs, Int32 pUserID, bool pApproved, Int32 pCostCenterID, Int32 pSafeID, Int32 pBankID, DateTime pJVDate, Int32 pPaymentAccountID, Int32 pPaymentSubAccountID, bool pIsPayment, bool pIsPaymentSupplierCustdy, string pCostCenterIDs,bool pIsUnderProcess)
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
                Com.CommandTimeout = 120;
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@UserID ", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@Approved ", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@CostCenterID ", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@SafeID ", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@BankID ", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@JVDate ", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@PaymentAccountID ", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@PaymentSubAccountID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@IsPayment ", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@IsPaymentSupplierCustdy ", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@CostCenterIDs", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@IsUnderProcess", SqlDbType.Bit));

                //Com.CommandText = "[dbo].ERP_ForwWeb_PaymentDetails";
                Com.CommandText = "[dbo]." + pStoredProcedureName;
                Com.Parameters[0].Value = pIDs;
                Com.Parameters[1].Value = pUserID;
                Com.Parameters[2].Value = pApproved;
                Com.Parameters[3].Value = pCostCenterID;
                Com.Parameters[4].Value = pSafeID;
                Com.Parameters[5].Value = pBankID;
                Com.Parameters[6].Value = pJVDate;
                Com.Parameters[7].Value = pPaymentAccountID;
                Com.Parameters[8].Value = pPaymentSubAccountID;
                Com.Parameters[9].Value = pIsPayment;
                Com.Parameters[10].Value = pIsPaymentSupplierCustdy;
                Com.Parameters[11].Value = pCostCenterIDs;
                Com.Parameters[12].Value = pIsUnderProcess;

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

        public Exception CallCustomizedSP_MultiIDsWithSafeAndBankTax(string pStoredProcedureName, string pIDs, Int32 pUserID, bool pApproved, Int32 pCostCenterID, Int32 pSafeID, Int32 pBankID, DateTime pJVDate, Int32 pPaymentAccountID, Int32 pPaymentSubAccountID, bool pIsPayment, bool pIsPaymentSupplierCustdy,Int32 pAccountIDCharge,Int32 pSubAccountCharge)
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
                Com.CommandTimeout = 120;
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@UserID ", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@Approved ", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@CostCenterID ", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@SafeID ", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@BankID ", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@JVDate ", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@PaymentAccountID ", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@PaymentSubAccountID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@IsPayment ", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@IsPaymentSupplierCustdy ", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@AccountIDCharge", SqlDbType.Int));

                Com.Parameters.Add(new SqlParameter("@SubAccountCharge", SqlDbType.Int));


                //Com.CommandText = "[dbo].ERP_ForwWeb_PaymentDetails";
                Com.CommandText = "[dbo]." + pStoredProcedureName;
                Com.Parameters[0].Value = pIDs;
                Com.Parameters[1].Value = pUserID;
                Com.Parameters[2].Value = pApproved;
                Com.Parameters[3].Value = pCostCenterID;
                Com.Parameters[4].Value = pSafeID;
                Com.Parameters[5].Value = pBankID;
                Com.Parameters[6].Value = pJVDate;
                Com.Parameters[7].Value = pPaymentAccountID;
                Com.Parameters[8].Value = pPaymentSubAccountID;
                Com.Parameters[9].Value = pIsPayment;
                Com.Parameters[10].Value = pIsPaymentSupplierCustdy;
                Com.Parameters[11].Value = pAccountIDCharge;
                Com.Parameters[12].Value = pSubAccountCharge;



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

    }
}
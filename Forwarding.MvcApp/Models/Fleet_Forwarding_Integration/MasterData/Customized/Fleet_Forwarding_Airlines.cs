using Forwarding.MvcApp.Models.MasterData.Partners.Generated;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace Forwarding.MvcApp.Models.Fleet_Forwarding_Integration.MasterData.Customized
{
    public class Fleet_Forwarding_Airlines
    {
        public static Exception InsertUpdate_Fleet_Forwarding_Airlines(CVarAirlines Airline)
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
                Com.Parameters.Add(new SqlParameter("@ICAO", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@Code", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@LocalName", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@Website", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@Prefix", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@AccountNumber", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@IsCheckDigit", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@IsLimitedLength", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@IsInactive", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@Notes", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@VATNumber", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@PaymentTermID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CurrencyID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@TaxeTypeID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@IsConsolidatedInvoice", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@BankName", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@BankAddress", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@Swift", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@BankAccountNumber", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@IBANNumber", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@CreatorUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CreationDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@ModificatorUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ModificationDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@LockingUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@TimeLocked", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@IsDeleted", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@AccountID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@SubAccountID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CostCenterID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@SubAccountGroupID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@crmCode", SqlDbType.NVarChar));
				Com.Parameters.Add(new SqlParameter("@TaxExemptFromDate", SqlDbType.DateTime));
				Com.Parameters.Add(new SqlParameter("@TaxExemptToDate", SqlDbType.DateTime));
				SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                Com.CommandText = "[dbo]." + "InsertFleetForwardingAirline";

                if (Airline.ID == 0)
                {
                    paraID.Direction = ParameterDirection.Output;
                }
                else if (Airline.ID != 0)
                {
                    paraID.Direction = ParameterDirection.Input;
                    Com.Parameters["@ID"].Value = Airline.ID;
                }

                Com.Parameters["@ICAO"].Value = Airline.ICAO;
                Com.Parameters["@Code"].Value = Airline.Code;
                Com.Parameters["@Name"].Value = Airline.Name;
                Com.Parameters["@LocalName"].Value = Airline.LocalName;
                Com.Parameters["@Website"].Value = Airline.Website;
                Com.Parameters["@Prefix"].Value = Airline.Prefix;
                Com.Parameters["@AccountNumber"].Value = Airline.AccountNumber;
                Com.Parameters["@IsCheckDigit"].Value = Airline.IsCheckDigit;
                Com.Parameters["@IsLimitedLength"].Value = Airline.IsLimitedLength;
                Com.Parameters["@IsInactive"].Value = Airline.IsInactive;
                Com.Parameters["@Notes"].Value = Airline.Notes;
                Com.Parameters["@VATNumber"].Value = Airline.VATNumber;
                Com.Parameters["@PaymentTermID"].Value = Airline.PaymentTermID;
                Com.Parameters["@CurrencyID"].Value = Airline.CurrencyID;
                Com.Parameters["@TaxeTypeID"].Value = Airline.TaxeTypeID;
                Com.Parameters["@IsConsolidatedInvoice"].Value = Airline.IsConsolidatedInvoice;
                Com.Parameters["@BankName"].Value = Airline.BankName;
                Com.Parameters["@BankAddress"].Value = Airline.BankAddress;
                Com.Parameters["@Swift"].Value = Airline.Swift;
                Com.Parameters["@BankAccountNumber"].Value = Airline.BankAccountNumber;
                Com.Parameters["@IBANNumber"].Value = Airline.IBANNumber;
                Com.Parameters["@CreatorUserID"].Value = Airline.CreatorUserID;
                Com.Parameters["@CreationDate"].Value = Airline.CreationDate;
                Com.Parameters["@ModificatorUserID"].Value = Airline.ModificatorUserID;
                Com.Parameters["@ModificationDate"].Value = Airline.ModificationDate;
                Com.Parameters["@LockingUserID"].Value = Airline.LockingUserID;
                Com.Parameters["@TimeLocked"].Value = Airline.TimeLocked;
                Com.Parameters["@IsDeleted"].Value = Airline.IsDeleted;
                Com.Parameters["@AccountID"].Value = Airline.AccountID;
                Com.Parameters["@SubAccountID"].Value = Airline.SubAccountID;
                Com.Parameters["@CostCenterID"].Value = Airline.CostCenterID;
                Com.Parameters["@SubAccountGroupID"].Value = Airline.SubAccountGroupID;
                Com.Parameters["@crmCode"].Value = Airline.crmCode;
				Com.Parameters["@TaxExemptFromDate"].Value = Airline.TaxExemptFromDate;
				Com.Parameters["@TaxExemptToDate"].Value = Airline.TaxExemptToDate;

				Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                    }
                    if (Airline.ID == 0)
                    {
                        Airline.ID = Convert.ToInt32(Com.Parameters["@ID"].Value);
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
        public static Exception Delete_Fleet_Forwarding_Airlines(int pID ,int pUserID )
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

                Com.CommandText = "[dbo]." + "DeleteFleetForwardingAirline";

                Com.Parameters["@ID"].Value = pID;
                Com.Parameters["@UserID"].Value = pUserID;

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
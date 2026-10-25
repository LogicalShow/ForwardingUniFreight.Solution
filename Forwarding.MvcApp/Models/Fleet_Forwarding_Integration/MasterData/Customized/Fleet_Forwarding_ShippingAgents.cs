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
    public class Fleet_Forwarding_ShippingAgents
    {
        public static Exception InsertUpdate_Fleet_Forwarding_ShippingAgents(CVarShippingAgents ShippingAgent)
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
                Com.Parameters.Add(new SqlParameter("@Code", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@LocalName", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@Website", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@IsInactive", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@Notes", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@ForwarderAccountNumber", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@ForwarderCreditNumber", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@LocalCustomsCode", SqlDbType.NVarChar));
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
				Com.Parameters.Add(new SqlParameter("@TaxExemptFromDate", SqlDbType.DateTime));
				Com.Parameters.Add(new SqlParameter("@TaxExemptToDate", SqlDbType.DateTime));
				SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                Com.CommandText = "[dbo]." + "InsertFleetForwardingShippingAgent";

                if (ShippingAgent.ID == 0)
                {
                    paraID.Direction = ParameterDirection.Output;
                }
                else if (ShippingAgent.ID != 0)
                {
                    paraID.Direction = ParameterDirection.Input;
                    Com.Parameters["@ID"].Value = ShippingAgent.ID;
                }

                Com.Parameters["@Code"].Value = ShippingAgent.Code;
                Com.Parameters["@Name"].Value = ShippingAgent.Name;
                Com.Parameters["@LocalName"].Value = ShippingAgent.LocalName;
                Com.Parameters["@Website"].Value = ShippingAgent.Website;
                Com.Parameters["@IsInactive"].Value = ShippingAgent.IsInactive;
                Com.Parameters["@Notes"].Value = ShippingAgent.Notes;
                Com.Parameters["@ForwarderAccountNumber"].Value = ShippingAgent.ForwarderAccountNumber;
                Com.Parameters["@ForwarderCreditNumber"].Value = ShippingAgent.ForwarderCreditNumber;
                Com.Parameters["@LocalCustomsCode"].Value = ShippingAgent.LocalCustomsCode;
                Com.Parameters["@VATNumber"].Value = ShippingAgent.VATNumber;
                Com.Parameters["@PaymentTermID"].Value = ShippingAgent.PaymentTermID;
                Com.Parameters["@CurrencyID"].Value = ShippingAgent.CurrencyID;
                Com.Parameters["@TaxeTypeID"].Value = ShippingAgent.TaxeTypeID;
                Com.Parameters["@IsConsolidatedInvoice"].Value = ShippingAgent.IsConsolidatedInvoice;
                Com.Parameters["@BankName"].Value = ShippingAgent.BankName;
                Com.Parameters["@BankAddress"].Value = ShippingAgent.BankAddress;
                Com.Parameters["@Swift"].Value = ShippingAgent.Swift;
                Com.Parameters["@BankAccountNumber"].Value = ShippingAgent.BankAccountNumber;
                Com.Parameters["@IBANNumber"].Value = ShippingAgent.IBANNumber;
                Com.Parameters["@CreatorUserID"].Value = ShippingAgent.CreatorUserID;
                Com.Parameters["@CreationDate"].Value = ShippingAgent.CreationDate;
                Com.Parameters["@ModificatorUserID"].Value = ShippingAgent.ModificatorUserID;
                Com.Parameters["@ModificationDate"].Value = ShippingAgent.ModificationDate;
                Com.Parameters["@LockingUserID"].Value = ShippingAgent.LockingUserID;
                Com.Parameters["@TimeLocked"].Value = ShippingAgent.TimeLocked;
                Com.Parameters["@IsDeleted"].Value = ShippingAgent.IsDeleted;
                Com.Parameters["@AccountID"].Value = ShippingAgent.AccountID;
                Com.Parameters["@SubAccountID"].Value = ShippingAgent.SubAccountID;
                Com.Parameters["@CostCenterID"].Value = ShippingAgent.CostCenterID;
                Com.Parameters["@SubAccountGroupID"].Value = ShippingAgent.SubAccountGroupID;
				Com.Parameters["@TaxExemptFromDate"].Value = ShippingAgent.TaxExemptFromDate;
				Com.Parameters["@TaxExemptToDate"].Value = ShippingAgent.TaxExemptToDate;

				Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                    }
                    if (ShippingAgent.ID == 0)
                    {
                        ShippingAgent.ID = Convert.ToInt32(Com.Parameters["@ID"].Value);
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
        public static Exception Delete_Fleet_Forwarding_ShippingAgents(int pID ,int pUserID )
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

                Com.CommandText = "[dbo]." + "DeleteFleetForwardingShippingAgent";

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
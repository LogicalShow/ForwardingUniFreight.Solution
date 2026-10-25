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
    public class Fleet_Forwarding_Agents
    {
        public static Exception InsertUpdate_Fleet_Forwarding_Agents(CVarAgents Agent)
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
                Com.Parameters.Add(new SqlParameter("@Email", SqlDbType.NVarChar));
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
                Com.Parameters.Add(new SqlParameter("@Address", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@PhonesAndFaxes", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@EmailOptionAging", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@EmailOptionInvoicesReport", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@EmailOptionPartnerStatement", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@crmCode", SqlDbType.NVarChar));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                Com.CommandText = "[dbo]." + "InsertFleetForwardingAgent";

                if (Agent.ID == 0)
                {
                    paraID.Direction = ParameterDirection.Output;
                }
                else if (Agent.ID != 0)
                {
                    paraID.Direction = ParameterDirection.Input;
                    Com.Parameters["@ID"].Value = Agent.ID;
                }

                Com.Parameters["@Code"].Value = Agent.Code;
                Com.Parameters["@Name"].Value = Agent.Name;
                Com.Parameters["@LocalName"].Value = Agent.LocalName;
                Com.Parameters["@Website"].Value = Agent.Website;
                Com.Parameters["@Email"].Value = Agent.Email;
                Com.Parameters["@IsInactive"].Value = Agent.IsInactive;
                Com.Parameters["@Notes"].Value = Agent.Notes;
                Com.Parameters["@VATNumber"].Value = Agent.VATNumber;
                Com.Parameters["@PaymentTermID"].Value = Agent.PaymentTermID;
                Com.Parameters["@CurrencyID"].Value = Agent.CurrencyID;
                Com.Parameters["@TaxeTypeID"].Value = Agent.TaxeTypeID;
                Com.Parameters["@IsConsolidatedInvoice"].Value = Agent.IsConsolidatedInvoice;
                Com.Parameters["@BankName"].Value = Agent.BankName;
                Com.Parameters["@BankAddress"].Value = Agent.BankAddress;
                Com.Parameters["@Swift"].Value = Agent.Swift;
                Com.Parameters["@BankAccountNumber"].Value = Agent.BankAccountNumber;
                Com.Parameters["@IBANNumber"].Value = Agent.IBANNumber;
                Com.Parameters["@CreatorUserID"].Value = Agent.CreatorUserID;
                Com.Parameters["@CreationDate"].Value = Agent.CreationDate;
                Com.Parameters["@ModificatorUserID"].Value = Agent.ModificatorUserID;
                Com.Parameters["@ModificationDate"].Value = Agent.ModificationDate;
                Com.Parameters["@LockingUserID"].Value = Agent.LockingUserID;
                Com.Parameters["@TimeLocked"].Value = Agent.TimeLocked;
                Com.Parameters["@IsDeleted"].Value = Agent.IsDeleted;
                Com.Parameters["@AccountID"].Value = Agent.AccountID;
                Com.Parameters["@SubAccountID"].Value = Agent.SubAccountID;
                Com.Parameters["@CostCenterID"].Value = Agent.CostCenterID;
                Com.Parameters["@SubAccountGroupID"].Value = Agent.SubAccountGroupID;
                Com.Parameters["@Address"].Value = Agent.Address;
                Com.Parameters["@PhonesAndFaxes"].Value = Agent.PhonesAndFaxes;
                Com.Parameters["@EmailOptionAging"].Value = Agent.EmailOptionAging;
                Com.Parameters["@EmailOptionInvoicesReport"].Value = Agent.EmailOptionInvoicesReport;
                Com.Parameters["@EmailOptionPartnerStatement"].Value = Agent.EmailOptionPartnerStatement;
                Com.Parameters["@crmCode"].Value = Agent.crmCode;

                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                    }
                    if (Agent.ID == 0)
                    {
                        Agent.ID = Convert.ToInt32(Com.Parameters["@ID"].Value);
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
        public static Exception Delete_Fleet_Forwarding_Agents(int pID ,int pUserID )
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

                Com.CommandText = "[dbo]." + "DeleteFleetForwardingAgent";

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
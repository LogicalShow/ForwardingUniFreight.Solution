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
    public class Fleet_Forwarding_CustomsClearanceAgents
    {
        public static Exception InsertUpdate_Fleet_Forwarding_CustomsClearanceAgents(CVarCustomsClearanceAgents CustomsClearanceAgent)
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
                Com.CommandText = "[dbo]." + "InsertFleetForwardingCustomsClearanceAgent";

                if (CustomsClearanceAgent.ID == 0)
                {
                    paraID.Direction = ParameterDirection.Output;
                }
                else if (CustomsClearanceAgent.ID != 0)
                {
                    paraID.Direction = ParameterDirection.Input;
                    Com.Parameters["@ID"].Value = CustomsClearanceAgent.ID;
                }

                Com.Parameters["@Code"].Value = CustomsClearanceAgent.Code;
                Com.Parameters["@Name"].Value = CustomsClearanceAgent.Name;
                Com.Parameters["@LocalName"].Value = CustomsClearanceAgent.LocalName;
                Com.Parameters["@Website"].Value = CustomsClearanceAgent.Website;
                Com.Parameters["@IsInactive"].Value = CustomsClearanceAgent.IsInactive;
                Com.Parameters["@Notes"].Value = CustomsClearanceAgent.Notes;
                Com.Parameters["@VATNumber"].Value = CustomsClearanceAgent.VATNumber;
                Com.Parameters["@PaymentTermID"].Value = CustomsClearanceAgent.PaymentTermID;
                Com.Parameters["@CurrencyID"].Value = CustomsClearanceAgent.CurrencyID;
                Com.Parameters["@TaxeTypeID"].Value = CustomsClearanceAgent.TaxeTypeID;
                Com.Parameters["@IsConsolidatedInvoice"].Value = CustomsClearanceAgent.IsConsolidatedInvoice;
                Com.Parameters["@BankName"].Value = CustomsClearanceAgent.BankName;
                Com.Parameters["@BankAddress"].Value = CustomsClearanceAgent.BankAddress;
                Com.Parameters["@Swift"].Value = CustomsClearanceAgent.Swift;
                Com.Parameters["@BankAccountNumber"].Value = CustomsClearanceAgent.BankAccountNumber;
                Com.Parameters["@IBANNumber"].Value = CustomsClearanceAgent.IBANNumber;
                Com.Parameters["@CreatorUserID"].Value = CustomsClearanceAgent.CreatorUserID;
                Com.Parameters["@CreationDate"].Value = CustomsClearanceAgent.CreationDate;
                Com.Parameters["@ModificatorUserID"].Value = CustomsClearanceAgent.ModificatorUserID;
                Com.Parameters["@ModificationDate"].Value = CustomsClearanceAgent.ModificationDate;
                Com.Parameters["@LockingUserID"].Value = CustomsClearanceAgent.LockingUserID;
                Com.Parameters["@TimeLocked"].Value = CustomsClearanceAgent.TimeLocked;
                Com.Parameters["@IsDeleted"].Value = CustomsClearanceAgent.IsDeleted;
                Com.Parameters["@AccountID"].Value = CustomsClearanceAgent.AccountID;
                Com.Parameters["@SubAccountID"].Value = CustomsClearanceAgent.SubAccountID;
                Com.Parameters["@CostCenterID"].Value = CustomsClearanceAgent.CostCenterID;
                Com.Parameters["@SubAccountGroupID"].Value = CustomsClearanceAgent.SubAccountGroupID;
				Com.Parameters["@TaxExemptFromDate"].Value = CustomsClearanceAgent.TaxExemptFromDate;
				Com.Parameters["@TaxExemptToDate"].Value = CustomsClearanceAgent.TaxExemptToDate;

				Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                    }
                    if (CustomsClearanceAgent.ID == 0)
                    {
                        CustomsClearanceAgent.ID = Convert.ToInt32(Com.Parameters["@ID"].Value);
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
        public static Exception Delete_Fleet_Forwarding_CustomsClearanceAgents(int pID ,int pUserID )
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

                Com.CommandText = "[dbo]." + "DeleteFleetForwardingCustomsClearanceAgent";

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
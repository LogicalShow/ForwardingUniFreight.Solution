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
    public class Fleet_Forwarding_ShippingLines
    {
        public static Exception InsertUpdate_Fleet_Forwarding_ShippingLines(CVarShippingLines ShippingLine)
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
                Com.Parameters.Add(new SqlParameter("@Code", SqlDbType.NVarChar));
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
                Com.Parameters.Add(new SqlParameter("@crmCode", SqlDbType.NVarChar));
				Com.Parameters.Add(new SqlParameter("@TaxExemptFromDate", SqlDbType.DateTime));
				Com.Parameters.Add(new SqlParameter("@TaxExemptToDate", SqlDbType.DateTime));
				SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                Com.CommandText = "[dbo]." + "InsertFleetForwardingShippingLine";

                if (ShippingLine.ID == 0)
                {
                    paraID.Direction = ParameterDirection.Output;
                }
                else if (ShippingLine.ID != 0)
                {
                    paraID.Direction = ParameterDirection.Input;
                    Com.Parameters["@ID"].Value = ShippingLine.ID;
                }

                Com.Parameters["@Code"].Value = ShippingLine.Code;
                Com.Parameters["@Name"].Value = ShippingLine.Name;
                Com.Parameters["@LocalName"].Value = ShippingLine.LocalName;
                Com.Parameters["@Website"].Value = ShippingLine.Website;
                Com.Parameters["@IsInactive"].Value = ShippingLine.IsInactive;
                Com.Parameters["@Notes"].Value = ShippingLine.Notes;
                Com.Parameters["@VATNumber"].Value = ShippingLine.VATNumber;
                Com.Parameters["@PaymentTermID"].Value = ShippingLine.PaymentTermID;
                Com.Parameters["@CurrencyID"].Value = ShippingLine.CurrencyID;
                Com.Parameters["@TaxeTypeID"].Value = ShippingLine.TaxeTypeID;
                Com.Parameters["@IsConsolidatedInvoice"].Value = ShippingLine.IsConsolidatedInvoice;
                Com.Parameters["@BankName"].Value = ShippingLine.BankName;
                Com.Parameters["@BankAddress"].Value = ShippingLine.BankAddress;
                Com.Parameters["@Swift"].Value = ShippingLine.Swift;
                Com.Parameters["@BankAccountNumber"].Value = ShippingLine.BankAccountNumber;
                Com.Parameters["@IBANNumber"].Value = ShippingLine.IBANNumber;
                Com.Parameters["@CreatorUserID"].Value = ShippingLine.CreatorUserID;
                Com.Parameters["@CreationDate"].Value = ShippingLine.CreationDate;
                Com.Parameters["@ModificatorUserID"].Value = ShippingLine.ModificatorUserID;
                Com.Parameters["@ModificationDate"].Value = ShippingLine.ModificationDate;
                Com.Parameters["@LockingUserID"].Value = ShippingLine.LockingUserID;
                Com.Parameters["@TimeLocked"].Value = ShippingLine.TimeLocked;
                Com.Parameters["@IsDeleted"].Value = ShippingLine.IsDeleted;
                Com.Parameters["@AccountID"].Value = ShippingLine.AccountID;
                Com.Parameters["@SubAccountID"].Value = ShippingLine.SubAccountID;
                Com.Parameters["@CostCenterID"].Value = ShippingLine.CostCenterID;
                Com.Parameters["@SubAccountGroupID"].Value = ShippingLine.SubAccountGroupID;
                Com.Parameters["@crmCode"].Value = ShippingLine.crmCode;
				Com.Parameters["@TaxExemptFromDate"].Value = ShippingLine.TaxExemptFromDate;
				Com.Parameters["@TaxExemptToDate"].Value = ShippingLine.TaxExemptToDate;

				Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                    }
                    if (ShippingLine.ID == 0)
                    {
                        ShippingLine.ID = Convert.ToInt32(Com.Parameters["@ID"].Value);
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
        public static Exception Delete_Fleet_Forwarding_ShippingLines(int pID ,int pUserID )
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

                Com.CommandText = "[dbo]." + "DeleteFleetForwardingShippingLine";

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
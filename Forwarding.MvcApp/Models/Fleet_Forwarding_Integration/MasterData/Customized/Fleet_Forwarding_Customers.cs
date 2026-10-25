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
    public class Fleet_Forwarding_Customers
    {
        public static Exception InsertUpdate_Fleet_Forwarding_Customer(CVarCustomers Customer)
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
                Com.Parameters.Add(new SqlParameter("@SalesmanID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@Website", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@Email", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@IsConsignee", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@IsShipper", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@IsInternalCustomer", SqlDbType.Bit));
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
                Com.Parameters.Add(new SqlParameter("@ManagerRoleID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@AdministratorRoleID", SqlDbType.Int));
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
                Com.Parameters.Add(new SqlParameter("@SalesLeadID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@EmailOptionAging", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@EmailOptionInvoicesReport", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@EmailOptionPartnerStatement", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@BillingDetails", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@ShippingDetails", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@OriginalCMRbyPost", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@CategoryID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@IsExternal", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@ForeignExporterNo", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@ForeignExporterCountryID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@crmCode", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@AllProductsReserved", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@ReservationReason", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@MainClientID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@IsHold", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@HoldReason", SqlDbType.NVarChar));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                Com.CommandText = "[dbo]." + "InsertFleetForwardingCustomer";

                if (Customer.ID == 0)
                {
                    paraID.Direction = ParameterDirection.Output;
                }
                else if (Customer.ID != 0)
                {
                    paraID.Direction = ParameterDirection.Input;
                    Com.Parameters["@ID"].Value = Customer.ID;
                }

                Com.Parameters["@Code"].Value = Customer.Code;
                Com.Parameters["@Name"].Value = Customer.Name;
                Com.Parameters["@LocalName"].Value = Customer.LocalName;
                Com.Parameters["@SalesmanID"].Value = Customer.SalesmanID;
                Com.Parameters["@Website"].Value = Customer.Website;
                Com.Parameters["@Email"].Value = Customer.Email;
                Com.Parameters["@IsConsignee"].Value = Customer.IsConsignee;
                Com.Parameters["@IsShipper"].Value = Customer.IsShipper;
                Com.Parameters["@IsInternalCustomer"].Value = Customer.IsInternalCustomer;
                Com.Parameters["@IsInactive"].Value = Customer.IsInactive;
                Com.Parameters["@Notes"].Value = Customer.Notes;
                Com.Parameters["@VATNumber"].Value = Customer.VATNumber;
                Com.Parameters["@PaymentTermID"].Value = Customer.PaymentTermID;
                Com.Parameters["@CurrencyID"].Value = Customer.CurrencyID;
                Com.Parameters["@TaxeTypeID"].Value = Customer.TaxeTypeID;
                Com.Parameters["@IsConsolidatedInvoice"].Value = Customer.IsConsolidatedInvoice;
                Com.Parameters["@BankName"].Value = Customer.BankName;
                Com.Parameters["@BankAddress"].Value = Customer.BankAddress;
                Com.Parameters["@Swift"].Value = Customer.Swift;
                Com.Parameters["@BankAccountNumber"].Value = Customer.BankAccountNumber;
                Com.Parameters["@IBANNumber"].Value = Customer.IBANNumber;
                Com.Parameters["@ManagerRoleID"].Value = Customer.ManagerRoleID;
                Com.Parameters["@AdministratorRoleID"].Value = Customer.AdministratorRoleID;
                Com.Parameters["@CreatorUserID"].Value = Customer.CreatorUserID;
                Com.Parameters["@CreationDate"].Value = Customer.CreationDate;
                Com.Parameters["@ModificatorUserID"].Value = Customer.ModificatorUserID;
                Com.Parameters["@ModificationDate"].Value = Customer.ModificationDate;
                Com.Parameters["@LockingUserID"].Value = Customer.LockingUserID;
                Com.Parameters["@TimeLocked"].Value = Customer.TimeLocked;
                Com.Parameters["@IsDeleted"].Value = Customer.IsDeleted;
                Com.Parameters["@AccountID"].Value = Customer.AccountID;
                Com.Parameters["@SubAccountID"].Value = Customer.SubAccountID;
                Com.Parameters["@CostCenterID"].Value = Customer.CostCenterID;
                Com.Parameters["@SubAccountGroupID"].Value = Customer.SubAccountGroupID;
                Com.Parameters["@Address"].Value = Customer.Address;
                Com.Parameters["@PhonesAndFaxes"].Value = Customer.PhonesAndFaxes;
                Com.Parameters["@SalesLeadID"].Value = Customer.SalesLeadID;
                Com.Parameters["@EmailOptionAging"].Value = Customer.EmailOptionAging;
                Com.Parameters["@EmailOptionInvoicesReport"].Value = Customer.EmailOptionInvoicesReport;
                Com.Parameters["@EmailOptionPartnerStatement"].Value = Customer.EmailOptionPartnerStatement;
                Com.Parameters["@BillingDetails"].Value = Customer.BillingDetails;
                Com.Parameters["@ShippingDetails"].Value = Customer.ShippingDetails;
                Com.Parameters["@OriginalCMRbyPost"].Value = Customer.OriginalCMRbyPost;
                Com.Parameters["@CategoryID"].Value = Customer.CategoryID;
                Com.Parameters["@IsExternal"].Value = Customer.IsExternal;
                Com.Parameters["@ForeignExporterNo"].Value = Customer.ForeignExporterNo;
                Com.Parameters["@ForeignExporterCountryID"].Value = Customer.ForeignExporterCountryID;
                Com.Parameters["@crmCode"].Value = Customer.crmCode;
                Com.Parameters["@AllProductsReserved"].Value = Customer.AllProductsReserved;
                Com.Parameters["@ReservationReason"].Value = Customer.ReservationReason;
                Com.Parameters["@MainClientID"].Value = Customer.MainClientID;
                Com.Parameters["@IsHold"].Value = Customer.IsHold;
                Com.Parameters["@HoldReason"].Value = Customer.HoldReason;

                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                    }
                    if (Customer.ID == 0)
                    {
                        Customer.ID = Convert.ToInt32(Com.Parameters["@ID"].Value);
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
        public static Exception Delete_Fleet_Forwarding_Customer(int pID ,int pUserID )
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

                Com.CommandText = "[dbo]." + "DeleteFleetForwardingCustomer";

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
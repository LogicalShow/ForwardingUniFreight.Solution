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
    public class Fleet_Forwarding_Suppliers
    {
        public static Exception InsertUpdate_Fleet_Forwarding_Suppliers(CVarSuppliers Supplier)
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
                Com.Parameters.Add(new SqlParameter("@EmailOptionPayablesReport", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@EmailOptionPayablesAging", SqlDbType.Int));
				Com.Parameters.Add(new SqlParameter("@TaxExemptFromDate", SqlDbType.DateTime));
				Com.Parameters.Add(new SqlParameter("@TaxExemptToDate", SqlDbType.DateTime));
				SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                Com.CommandText = "[dbo]." + "InsertFleetForwardingSupplier";

                if (Supplier.ID == 0)
                {
                    paraID.Direction = ParameterDirection.Output;
                }
                else if (Supplier.ID != 0)
                {
                    paraID.Direction = ParameterDirection.Input;
                    Com.Parameters["@ID"].Value = Supplier.ID;
                }

                Com.Parameters["@Code"].Value = Supplier.Code;
                Com.Parameters["@Name"].Value = Supplier.Name;
                Com.Parameters["@LocalName"].Value = Supplier.LocalName;
                Com.Parameters["@Website"].Value = Supplier.Website;
                Com.Parameters["@IsInactive"].Value = Supplier.IsInactive;
                Com.Parameters["@Notes"].Value = Supplier.Notes;
                Com.Parameters["@VATNumber"].Value = Supplier.VATNumber;
                Com.Parameters["@PaymentTermID"].Value = Supplier.PaymentTermID;
                Com.Parameters["@CurrencyID"].Value = Supplier.CurrencyID;
                Com.Parameters["@TaxeTypeID"].Value = Supplier.TaxeTypeID;
                Com.Parameters["@IsConsolidatedInvoice"].Value = Supplier.IsConsolidatedInvoice;
                Com.Parameters["@BankName"].Value = Supplier.BankName;
                Com.Parameters["@BankAddress"].Value = Supplier.BankAddress;
                Com.Parameters["@Swift"].Value = Supplier.Swift;
                Com.Parameters["@BankAccountNumber"].Value = Supplier.BankAccountNumber;
                Com.Parameters["@IBANNumber"].Value = Supplier.IBANNumber;
                Com.Parameters["@CreatorUserID"].Value = Supplier.CreatorUserID;
                Com.Parameters["@CreationDate"].Value = Supplier.CreationDate;
                Com.Parameters["@ModificatorUserID"].Value = Supplier.ModificatorUserID;
                Com.Parameters["@ModificationDate"].Value = Supplier.ModificationDate;
                Com.Parameters["@LockingUserID"].Value = Supplier.LockingUserID;
                Com.Parameters["@TimeLocked"].Value = Supplier.TimeLocked;
                Com.Parameters["@IsDeleted"].Value = Supplier.IsDeleted;
                Com.Parameters["@AccountID"].Value = Supplier.AccountID;
                Com.Parameters["@SubAccountID"].Value = Supplier.SubAccountID;
                Com.Parameters["@CostCenterID"].Value = Supplier.CostCenterID;
                Com.Parameters["@SubAccountGroupID"].Value = Supplier.SubAccountGroupID;
                Com.Parameters["@EmailOptionPayablesReport"].Value = Supplier.EmailOptionPayablesReport;
                Com.Parameters["@EmailOptionPayablesAging"].Value = Supplier.EmailOptionPayablesAging;
				Com.Parameters["@TaxExemptFromDate"].Value = Supplier.TaxExemptFromDate;
				Com.Parameters["@TaxExemptToDate"].Value = Supplier.TaxExemptToDate;

				Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                    }
                    if (Supplier.ID == 0)
                    {
                        Supplier.ID = Convert.ToInt32(Com.Parameters["@ID"].Value);
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
        public static Exception Delete_Fleet_Forwarding_Suppliers(int pID ,int pUserID )
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

                Com.CommandText = "[dbo]." + "DeleteFleetForwardingSupplier";

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
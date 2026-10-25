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
    public class Fleet_Forwarding_Truckers
    {
        public static Exception InsertUpdate_Fleet_Forwarding_Truckers(CVarTruckers Trucker)
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
                Com.Parameters.Add(new SqlParameter("@InsuranceValidity", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@TransportLicenceValidity", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@GMPValidity", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@QUALIMATvalidity", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@ISO9001validity", SqlDbType.NVarChar));
				Com.Parameters.Add(new SqlParameter("@TaxExemptFromDate", SqlDbType.DateTime));
				Com.Parameters.Add(new SqlParameter("@TaxExemptToDate", SqlDbType.DateTime));
				SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                Com.CommandText = "[dbo]." + "InsertFleetForwardingTrucker";

                if (Trucker.ID == 0)
                {
                    paraID.Direction = ParameterDirection.Output;
                }
                else if (Trucker.ID != 0)
                {
                    paraID.Direction = ParameterDirection.Input;
                    Com.Parameters["@ID"].Value = Trucker.ID;
                }

                Com.Parameters["@Code"].Value = Trucker.Code;
                Com.Parameters["@Name"].Value = Trucker.Name;
                Com.Parameters["@LocalName"].Value = Trucker.LocalName;
                Com.Parameters["@Website"].Value = Trucker.Website;
                Com.Parameters["@IsInactive"].Value = Trucker.IsInactive;
                Com.Parameters["@Notes"].Value = Trucker.Notes;
                Com.Parameters["@VATNumber"].Value = Trucker.VATNumber;
                Com.Parameters["@PaymentTermID"].Value = Trucker.PaymentTermID;
                Com.Parameters["@CurrencyID"].Value = Trucker.CurrencyID;
                Com.Parameters["@TaxeTypeID"].Value = Trucker.TaxeTypeID;
                Com.Parameters["@IsConsolidatedInvoice"].Value = Trucker.IsConsolidatedInvoice;
                Com.Parameters["@BankName"].Value = Trucker.BankName;
                Com.Parameters["@BankAddress"].Value = Trucker.BankAddress;
                Com.Parameters["@Swift"].Value = Trucker.Swift;
                Com.Parameters["@BankAccountNumber"].Value = Trucker.BankAccountNumber;
                Com.Parameters["@IBANNumber"].Value = Trucker.IBANNumber;
                Com.Parameters["@CreatorUserID"].Value = Trucker.CreatorUserID;
                Com.Parameters["@CreationDate"].Value = Trucker.CreationDate;
                Com.Parameters["@ModificatorUserID"].Value = Trucker.ModificatorUserID;
                Com.Parameters["@ModificationDate"].Value = Trucker.ModificationDate;
                Com.Parameters["@LockingUserID"].Value = Trucker.LockingUserID;
                Com.Parameters["@TimeLocked"].Value = Trucker.TimeLocked;
                Com.Parameters["@IsDeleted"].Value = Trucker.IsDeleted;
                Com.Parameters["@AccountID"].Value = Trucker.AccountID;
                Com.Parameters["@SubAccountID"].Value = Trucker.SubAccountID;
                Com.Parameters["@CostCenterID"].Value = Trucker.CostCenterID;
                Com.Parameters["@SubAccountGroupID"].Value = Trucker.SubAccountGroupID;
                Com.Parameters["@InsuranceValidity"].Value = Trucker.InsuranceValidity;
                Com.Parameters["@TransportLicenceValidity"].Value = Trucker.TransportLicenceValidity;
                Com.Parameters["@GMPValidity"].Value = Trucker.GMPValidity;
                Com.Parameters["@QUALIMATvalidity"].Value = Trucker.QUALIMATvalidity;
                Com.Parameters["@ISO9001validity"].Value = Trucker.ISO9001validity;
				Com.Parameters["@TaxExemptFromDate"].Value = Trucker.TaxExemptFromDate;
				Com.Parameters["@TaxExemptToDate"].Value = Trucker.TaxExemptToDate;

				Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                    }
                    if (Trucker.ID == 0)
                    {
                        Trucker.ID = Convert.ToInt32(Com.Parameters["@ID"].Value);
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
        public static Exception Delete_Fleet_Forwarding_Truckers(int pID ,int pUserID )
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

                Com.CommandText = "[dbo]." + "DeleteFleetForwardingTrucker";

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
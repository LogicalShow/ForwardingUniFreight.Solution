using Forwarding.MvcApp.Models.MasterData.Invoicing.Generated;
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
    public class Fleet_Forwarding_ChargeTypes
    {
        public static Exception InsertUpdate_Fleet_Forwarding_ChargeTypes(CVarChargeTypes ChargeType)
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
                Com.Parameters.Add(new SqlParameter("@MeasurementID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@TaxeTypeID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@InvoiceTypeID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ViewOrder", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@Notes", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@IsUsedInReceivable", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@IsUsedInPayable", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@IsOcean", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@IsInland", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@IsAir", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@IsDefaultInQuotation", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@IsDefaultInOperations", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@IsAddedManually", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@IsInactive", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@CreatorUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CreationDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@ModificatorUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ModificationDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@LockingUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@TimeLocked", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@IsOperationChargeType", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@IsGeneralChargeType", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@AccountID_Revenue", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@SubAccountID_Revenue", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CostCenterID_Revenue", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@AccountID_Expense", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@SubAccountID_Expense", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CostCenterID_Expense", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@TemplateID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@PurchaseItemID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@IsTank", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@IsWarehouseChargeType", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@IsExcludeInTruckingOrderPrint", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@AccountID_Return", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@SubAccountID_Return", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@IsOfficial", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@PreCode", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@ChargeTypeGroupID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@Cost", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@IsDirectOperation", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@IsMasterOperation", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@ChargeTypeCurrency_ID", SqlDbType.Int));

                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                Com.CommandText = "[dbo]." + "InsertUpDateFleetForwardingChargeType";

                if (ChargeType.ID == 0)
                {
                    paraID.Direction = ParameterDirection.Output;
                }
                else if (ChargeType.ID != 0)
                {
                    paraID.Direction = ParameterDirection.Input;
                }
                Com.Parameters["@ID"].Value = ChargeType.ID;

                Com.Parameters["@Code"].Value = ChargeType.Code;
                Com.Parameters["@Name"].Value = ChargeType.Name;
                Com.Parameters["@LocalName"].Value = ChargeType.LocalName;
                Com.Parameters["@MeasurementID"].Value = ChargeType.MeasurementID;
                Com.Parameters["@TaxeTypeID"].Value = ChargeType.TaxeTypeID;
                Com.Parameters["@InvoiceTypeID"].Value = ChargeType.InvoiceTypeID;
                Com.Parameters["@ViewOrder"].Value = ChargeType.ViewOrder;
                Com.Parameters["@Notes"].Value = ChargeType.Notes;
                Com.Parameters["@IsUsedInReceivable"].Value = ChargeType.IsUsedInReceivable;
                Com.Parameters["@IsUsedInPayable"].Value = ChargeType.IsUsedInPayable;
                Com.Parameters["@IsOcean"].Value = ChargeType.IsOcean;
                Com.Parameters["@IsInland"].Value = ChargeType.IsInland;
                Com.Parameters["@IsAir"].Value = ChargeType.IsAir;
                Com.Parameters["@IsDefaultInQuotation"].Value = ChargeType.IsDefaultInQuotation;
                Com.Parameters["@IsDefaultInOperations"].Value = ChargeType.IsDefaultInOperations;
                Com.Parameters["@IsAddedManually"].Value = ChargeType.IsAddedManually;
                Com.Parameters["@IsInactive"].Value = ChargeType.IsInactive;
                Com.Parameters["@CreatorUserID"].Value = ChargeType.CreatorUserID;
                Com.Parameters["@CreationDate"].Value = ChargeType.CreationDate;
                Com.Parameters["@ModificatorUserID"].Value = ChargeType.ModificatorUserID;
                Com.Parameters["@ModificationDate"].Value = ChargeType.ModificationDate;
                Com.Parameters["@LockingUserID"].Value = ChargeType.LockingUserID;
                Com.Parameters["@TimeLocked"].Value = ChargeType.TimeLocked;
                Com.Parameters["@IsOperationChargeType"].Value = ChargeType.IsOperationChargeType;
                Com.Parameters["@IsGeneralChargeType"].Value = ChargeType.IsGeneralChargeType;
                Com.Parameters["@AccountID_Revenue"].Value = ChargeType.AccountID_Revenue;
                Com.Parameters["@SubAccountID_Revenue"].Value = ChargeType.SubAccountID_Revenue;
                Com.Parameters["@CostCenterID_Revenue"].Value = ChargeType.CostCenterID_Revenue;
                Com.Parameters["@AccountID_Expense"].Value = ChargeType.AccountID_Expense;
                Com.Parameters["@SubAccountID_Expense"].Value = ChargeType.SubAccountID_Expense;
                Com.Parameters["@CostCenterID_Expense"].Value = ChargeType.CostCenterID_Expense;
                Com.Parameters["@TemplateID"].Value = ChargeType.TemplateID;
                Com.Parameters["@PurchaseItemID"].Value = ChargeType.PurchaseItemID;
                Com.Parameters["@IsTank"].Value = ChargeType.IsTank;
                Com.Parameters["@IsWarehouseChargeType"].Value = ChargeType.IsWarehouseChargeType;
                Com.Parameters["@IsExcludeInTruckingOrderPrint"].Value = ChargeType.IsExcludeInTruckingOrderPrint;
                Com.Parameters["@AccountID_Return"].Value = ChargeType.AccountID_Return;
                Com.Parameters["@SubAccountID_Return"].Value = ChargeType.SubAccountID_Return;
                Com.Parameters["@IsOfficial"].Value = ChargeType.IsOfficial;
                Com.Parameters["@PreCode"].Value = ChargeType.PreCode;
                Com.Parameters["@ChargeTypeGroupID"].Value = ChargeType.ChargeTypeGroupID;
                Com.Parameters["@Cost"].Value = ChargeType.Cost;
                Com.Parameters["@IsDirectOperation"].Value = ChargeType.IsDirectOperation;
                Com.Parameters["@IsMasterOperation"].Value = ChargeType.IsMasterOperation;
                Com.Parameters["@ChargeTypeCurrency_ID"].Value = ChargeType.ChargeTypeCurrency_ID;

                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                    }
                    if (ChargeType.ID == 0)
                    {
                        ChargeType.ID = Convert.ToInt32(Com.Parameters["@ID"].Value);
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
        public static Exception Delete_Fleet_Forwarding_ChargeTypes(int pID, int pUserID)
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

                Com.CommandText = "[dbo]." + "DeleteFleetForwardingChargeTypes";

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
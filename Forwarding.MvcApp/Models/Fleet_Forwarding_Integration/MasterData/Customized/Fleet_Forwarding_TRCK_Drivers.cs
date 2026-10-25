using Forwarding.MvcApp.Models.MasterData.Partners.Generated;
using Forwarding.MvcApp.Models.MasterData.Trucking.Generated;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace Forwarding.MvcApp.Models.Fleet_Forwarding_Integration.MasterData.Customized
{
    public class Fleet_Forwarding_TRCK_Drivers
    {
        public static Exception InsertUpdate_Fleet_Forwarding_TRCK_Drivers(CVarTRCK_Drivers Driver)
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
                Com.Parameters.Add(new SqlParameter("@IsDriver", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@Phone", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@Mobile", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@NationalIDNumber", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@NationalIDExpireDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@LicenseNumber", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@LicenseNumberExpireDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@ServiceStartDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@ServiceEndDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@Address", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@Notes", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@IsInactive", SqlDbType.Bit));
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
                Com.Parameters.Add(new SqlParameter("@BirthDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@SupervisorName", SqlDbType.NVarChar));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                Com.CommandText = "[dbo]." + "InsertFleetForwardingDriver";

                if (Driver.ID == 0)
                {
                    paraID.Direction = ParameterDirection.Output;
                }
                else if (Driver.ID != 0)
                {
                    paraID.Direction = ParameterDirection.Input;
                    Com.Parameters["@ID"].Value = Driver.ID;
                }

                Com.Parameters["@Code"].Value = Driver.Code;
                Com.Parameters["@Name"].Value = Driver.Name;
                Com.Parameters["@LocalName"].Value = Driver.LocalName;
                Com.Parameters["@IsDriver"].Value = Driver.IsDriver;
                Com.Parameters["@Phone"].Value = Driver.Phone;
                Com.Parameters["@Mobile"].Value = Driver.Mobile;
                Com.Parameters["@NationalIDNumber"].Value = Driver.NationalIDNumber;
                Com.Parameters["@NationalIDExpireDate"].Value = Driver.NationalIDExpireDate;
                Com.Parameters["@LicenseNumber"].Value = Driver.LicenseNumber;
                Com.Parameters["@LicenseNumberExpireDate"].Value = Driver.LicenseNumberExpireDate;
                Com.Parameters["@ServiceStartDate"].Value = Driver.ServiceStartDate;
                Com.Parameters["@ServiceEndDate"].Value = Driver.ServiceEndDate;
                Com.Parameters["@Address"].Value = Driver.Address;
                Com.Parameters["@Notes"].Value = Driver.Notes;
                Com.Parameters["@IsInactive"].Value = Driver.IsInactive;
                Com.Parameters["@CreatorUserID"].Value = Driver.CreatorUserID;
                Com.Parameters["@CreationDate"].Value = Driver.CreationDate;
                Com.Parameters["@ModificatorUserID"].Value = Driver.ModificatorUserID;
                Com.Parameters["@ModificationDate"].Value = Driver.ModificationDate;
                Com.Parameters["@LockingUserID"].Value = Driver.LockingUserID;
                Com.Parameters["@TimeLocked"].Value = Driver.TimeLocked;
                Com.Parameters["@IsDeleted"].Value = Driver.IsDeleted;
                Com.Parameters["@AccountID"].Value = Driver.AccountID;
                Com.Parameters["@SubAccountID"].Value = Driver.SubAccountID;
                Com.Parameters["@CostCenterID"].Value = Driver.CostCenterID;
                Com.Parameters["@SubAccountGroupID"].Value = Driver.SubAccountGroupID;
                Com.Parameters["@BirthDate"].Value = Driver.BirthDate;
                Com.Parameters["@SupervisorName"].Value = Driver.SupervisorName;

                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                    }
                    if (Driver.ID == 0)
                    {
                        Driver.ID = Convert.ToInt32(Com.Parameters["@ID"].Value);
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
        public static Exception Delete_Fleet_Forwarding_TRCK_Drivers(int pID ,int pUserID )
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

                Com.CommandText = "[dbo]." + "DeleteFleetForwardingDriver";

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
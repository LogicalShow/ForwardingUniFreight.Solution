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
    public class Fleet_Forwarding_Addresses
    {
        public static Exception InsertUpdate_Fleet_Forwarding_Addresses(CVarAddresses Address)
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

                Com.Parameters.Add(new SqlParameter("@PartnerTypeID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@PartnerID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@AddressTypeID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CountryID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CityID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@StreetLine1", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@StreetLine2", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@ZipCode", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@PrintedAs", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@CreatorUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@CreationDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@ModificatorUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@ModificationDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@LockingUserID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@TimeLocked", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@IsDeleted", SqlDbType.Bit));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                Com.CommandText = "[dbo]." + "InsertUpDateFleetForwardingAddress";

                if (Address.ID == 0)
                {
                    paraID.Direction = ParameterDirection.Output;
                }
                else if (Address.ID != 0)
                {
                    paraID.Direction = ParameterDirection.Input;
                }
                Com.Parameters["@ID"].Value = Address.ID;

                Com.Parameters["@PartnerTypeID"].Value = Address.PartnerTypeID;
                Com.Parameters["@PartnerID"].Value = Address.PartnerID;
                Com.Parameters["@AddressTypeID"].Value = Address.AddressTypeID;
                Com.Parameters["@CountryID"].Value = Address.CountryID;
                Com.Parameters["@CityID"].Value = Address.CityID;
                Com.Parameters["@StreetLine1"].Value = Address.StreetLine1;
                Com.Parameters["@StreetLine2"].Value = Address.StreetLine2;
                Com.Parameters["@ZipCode"].Value = Address.ZipCode;
                Com.Parameters["@PrintedAs"].Value = Address.PrintedAs;
                Com.Parameters["@CreatorUserID"].Value = Address.CreatorUserID;
                Com.Parameters["@CreationDate"].Value = Address.CreationDate;
                Com.Parameters["@ModificatorUserID"].Value = Address.ModificatorUserID;
                Com.Parameters["@ModificationDate"].Value = Address.ModificationDate;
                Com.Parameters["@LockingUserID"].Value = Address.LockingUserID;
                Com.Parameters["@TimeLocked"].Value = Address.TimeLocked;
                Com.Parameters["@IsDeleted"].Value = Address.IsDeleted;

                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                    }
                    if (Address.ID == 0)
                    {
                        Address.ID = Convert.ToInt32(Com.Parameters["@ID"].Value);
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
        public static Exception Delete_Fleet_Forwarding_Addresses(int pID, int pUserID)
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

                Com.CommandText = "[dbo]." + "DeleteFleetForwardingAddresses";

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
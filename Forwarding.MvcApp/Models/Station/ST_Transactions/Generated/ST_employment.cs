using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.Station.ST_Transactions.Generated
{
    [Serializable]
    public class CPKST_employment
    {
        #region "variables"
        private Int32 mID;
        #endregion

        #region "Methods"
        public Int32 ID
        {
            get { return mID; }
            set { mID = value; }
        }
        #endregion
    }
    [Serializable]
    public partial class CVarST_employment : CPKST_employment
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal String mName;
        internal DateTime mBirthDate;
        internal String mNationalID;
        internal String mAddress;
        internal Int32 mPhoneNumber1;
        internal Int32 mPhoneNumber2;
        internal String mdegree;
        internal Int32 mSection;
        internal DateTime mJoiningDate;
        internal Boolean mGender;
        internal Int32 mReligion;
        internal Int32 mmaritalstatus;
        internal Int32 mNumberofChildren;
        internal String mmilitarystatus;
        internal String maccessories;
        internal Decimal mSalary;
        internal Int32 mshiftEmp;
        internal String mrouteLine;
        internal Int32 mcategory;
        internal Boolean mIsInactive;
        #endregion

        #region "Methods"
        public String Name
        {
            get { return mName; }
            set { mIsChanges = true; mName = value; }
        }
        public DateTime BirthDate
        {
            get { return mBirthDate; }
            set { mIsChanges = true; mBirthDate = value; }
        }
        public String NationalID
        {
            get { return mNationalID; }
            set { mIsChanges = true; mNationalID = value; }
        }
        public String Address
        {
            get { return mAddress; }
            set { mIsChanges = true; mAddress = value; }
        }
        public Int32 PhoneNumber1
        {
            get { return mPhoneNumber1; }
            set { mIsChanges = true; mPhoneNumber1 = value; }
        }
        public Int32 PhoneNumber2
        {
            get { return mPhoneNumber2; }
            set { mIsChanges = true; mPhoneNumber2 = value; }
        }
        public String degree
        {
            get { return mdegree; }
            set { mIsChanges = true; mdegree = value; }
        }
        public Int32 Section
        {
            get { return mSection; }
            set { mIsChanges = true; mSection = value; }
        }
        public DateTime JoiningDate
        {
            get { return mJoiningDate; }
            set { mIsChanges = true; mJoiningDate = value; }
        }
        public Boolean Gender
        {
            get { return mGender; }
            set { mIsChanges = true; mGender = value; }
        }
        public Int32 Religion
        {
            get { return mReligion; }
            set { mIsChanges = true; mReligion = value; }
        }
        public Int32 maritalstatus
        {
            get { return mmaritalstatus; }
            set { mIsChanges = true; mmaritalstatus = value; }
        }
        public Int32 NumberofChildren
        {
            get { return mNumberofChildren; }
            set { mIsChanges = true; mNumberofChildren = value; }
        }
        public String militarystatus
        {
            get { return mmilitarystatus; }
            set { mIsChanges = true; mmilitarystatus = value; }
        }
        public String accessories
        {
            get { return maccessories; }
            set { mIsChanges = true; maccessories = value; }
        }
        public Decimal Salary
        {
            get { return mSalary; }
            set { mIsChanges = true; mSalary = value; }
        }
        public Int32 shiftEmp
        {
            get { return mshiftEmp; }
            set { mIsChanges = true; mshiftEmp = value; }
        }
        public String routeLine
        {
            get { return mrouteLine; }
            set { mIsChanges = true; mrouteLine = value; }
        }
        public Int32 category
        {
            get { return mcategory; }
            set { mIsChanges = true; mcategory = value; }
        }
        public Boolean IsInactive
        {
            get { return mIsInactive; }
            set { mIsChanges = true; mIsInactive = value; }
        }
        #endregion

        #region Functions
        public Boolean GetIsChange()
        {
            return mIsChanges;
        }
        public void SetIsChange(Boolean IsChange)
        {
            mIsChanges = IsChange;
        }
        #endregion
    }

    public partial class CST_employment
    {
        #region "variables"
        /*If "App.Config" isnot exist add it to your Application
		Add this code after <Configuration> tag
		-------------------------------------------------------
		<appsettings>
		<add key="ConnectionString" value="............"/>
		</appsettings>
		-------------------------------------------------------
		where ".........." is connection string to database server*/
        private SqlTransaction tr;
        public List<CVarST_employment> lstCVarST_employment = new List<CVarST_employment>();
        public List<CPKST_employment> lstDeletedCPKST_employment = new List<CPKST_employment>();
        #endregion

        #region "Select Methods"
        public Exception GetList(string WhereClause)
        {
            return DataFill(WhereClause, true);
        }
        public Exception GetListPaging(Int32 PageSize, Int32 PageNumber, string WhereClause, string OrderBy, out Int32 TotalRecords)
        {
            return DataFill(PageSize, PageNumber, WhereClause, OrderBy, out TotalRecords);
        }
        public Exception GetItem(Int32 ID)
        {
            return DataFill(Convert.ToString(ID), false);
        }
        private Exception DataFill(string Param, Boolean IsList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarST_employment.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListST_employment";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemST_employment";
                    Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int));
                    Com.Parameters[0].Value = Convert.ToInt32(Param);
                }
                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        /*Start DataReader*/
                        CVarST_employment ObjCVarST_employment = new CVarST_employment();
                        ObjCVarST_employment.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarST_employment.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarST_employment.mBirthDate = Convert.ToDateTime(dr["BirthDate"].ToString());
                        ObjCVarST_employment.mNationalID = Convert.ToString(dr["NationalID"].ToString());
                        ObjCVarST_employment.mAddress = Convert.ToString(dr["Address"].ToString());
                        ObjCVarST_employment.mPhoneNumber1 = Convert.ToInt32(dr["PhoneNumber1"].ToString());
                        ObjCVarST_employment.mPhoneNumber2 = Convert.ToInt32(dr["PhoneNumber2"].ToString());
                        ObjCVarST_employment.mdegree = Convert.ToString(dr["degree"].ToString());
                        ObjCVarST_employment.mSection = Convert.ToInt32(dr["Section"].ToString());
                        ObjCVarST_employment.mJoiningDate = Convert.ToDateTime(dr["JoiningDate"].ToString());
                        ObjCVarST_employment.mGender = Convert.ToBoolean(dr["Gender"].ToString());
                        ObjCVarST_employment.mReligion = Convert.ToInt32(dr["Religion"].ToString());
                        ObjCVarST_employment.mmaritalstatus = Convert.ToInt32(dr["maritalstatus"].ToString());
                        ObjCVarST_employment.mNumberofChildren = Convert.ToInt32(dr["NumberofChildren"].ToString());
                        ObjCVarST_employment.mmilitarystatus = Convert.ToString(dr["militarystatus"].ToString());
                        ObjCVarST_employment.maccessories = Convert.ToString(dr["accessories"].ToString());
                        ObjCVarST_employment.mSalary = Convert.ToDecimal(dr["Salary"].ToString());
                        ObjCVarST_employment.mshiftEmp = Convert.ToInt32(dr["shiftEmp"].ToString());
                        ObjCVarST_employment.mrouteLine = Convert.ToString(dr["routeLine"].ToString());
                        ObjCVarST_employment.mcategory = Convert.ToInt32(dr["category"].ToString());
                        ObjCVarST_employment.mIsInactive = Convert.ToBoolean(dr["IsInactive"].ToString());
                        lstCVarST_employment.Add(ObjCVarST_employment);
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

        private Exception DataFill(Int32 PageSize, Int32 PageNumber, string WhereClause, string OrderBy, out Int32 TotRecs)
        {
            Exception Exp = null;
            TotRecs = 0;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarST_employment.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                Com.Parameters.Add(new SqlParameter("@PageSize", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@PageNumber", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@OrderBy", SqlDbType.VarChar));
                Com.CommandText = "[dbo].GetListPagingST_employment";
                Com.Parameters[0].Value = PageSize;
                Com.Parameters[1].Value = PageNumber;
                Com.Parameters[2].Value = WhereClause;
                Com.Parameters[3].Value = OrderBy;
                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        /*Start DataReader*/
                        CVarST_employment ObjCVarST_employment = new CVarST_employment();
                        ObjCVarST_employment.ID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarST_employment.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarST_employment.mBirthDate = Convert.ToDateTime(dr["BirthDate"].ToString());
                        ObjCVarST_employment.mNationalID = Convert.ToString(dr["NationalID"].ToString());
                        ObjCVarST_employment.mAddress = Convert.ToString(dr["Address"].ToString());
                        ObjCVarST_employment.mPhoneNumber1 = Convert.ToInt32(dr["PhoneNumber1"].ToString());
                        ObjCVarST_employment.mPhoneNumber2 = Convert.ToInt32(dr["PhoneNumber2"].ToString());
                        ObjCVarST_employment.mdegree = Convert.ToString(dr["degree"].ToString());
                        ObjCVarST_employment.mSection = Convert.ToInt32(dr["Section"].ToString());
                        ObjCVarST_employment.mJoiningDate = Convert.ToDateTime(dr["JoiningDate"].ToString());
                        ObjCVarST_employment.mGender = Convert.ToBoolean(dr["Gender"].ToString());
                        ObjCVarST_employment.mReligion = Convert.ToInt32(dr["Religion"].ToString());
                        ObjCVarST_employment.mmaritalstatus = Convert.ToInt32(dr["maritalstatus"].ToString());
                        ObjCVarST_employment.mNumberofChildren = Convert.ToInt32(dr["NumberofChildren"].ToString());
                        ObjCVarST_employment.mmilitarystatus = Convert.ToString(dr["militarystatus"].ToString());
                        ObjCVarST_employment.maccessories = Convert.ToString(dr["accessories"].ToString());
                        ObjCVarST_employment.mSalary = Convert.ToDecimal(dr["Salary"].ToString());
                        ObjCVarST_employment.mshiftEmp = Convert.ToInt32(dr["shiftEmp"].ToString());
                        ObjCVarST_employment.mrouteLine = Convert.ToString(dr["routeLine"].ToString());
                        ObjCVarST_employment.mcategory = Convert.ToInt32(dr["category"].ToString());
                        ObjCVarST_employment.mIsInactive = Convert.ToBoolean(dr["IsInactive"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarST_employment.Add(ObjCVarST_employment);
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

        #endregion
        #region "Common Methods"
        private void BeginTrans(SqlCommand Com, SqlConnection Con)
        {

            tr = Con.BeginTransaction(IsolationLevel.Serializable);
            Com.CommandType = CommandType.StoredProcedure;
        }

        private void EndTrans(SqlCommand Com, SqlConnection Con)
        {

            Com.Transaction = tr;
            Com.Connection = Con;
            Com.ExecuteNonQuery();
            tr.Commit();
        }

        #endregion
        #region "Set List Method"
        private Exception SetList(string WhereClause, Boolean IsDelete)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                if (IsDelete == true)
                    Com.CommandText = "[dbo].DeleteListST_employment";
                else
                    Com.CommandText = "[dbo].UpdateListST_employment";
                Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                BeginTrans(Com, Con);
                Com.Parameters[0].Value = WhereClause;
                EndTrans(Com, Con);
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

        #endregion
        #region "Delete Methods"
        public Exception DeleteItem(List<CPKST_employment> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemST_employment";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int));
                foreach (CPKST_employment ObjCPKST_employment in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt32(ObjCPKST_employment.ID);
                    EndTrans(Com, Con);
                }
            }
            catch (Exception ex)
            {
                Exp = ex;
            }
            finally
            {
                Con.Close();
                Con.Dispose();
                DeleteList.Clear();
            }
            return Exp;
        }

        public Exception DeleteList(string WhereClause)
        {

            return SetList(WhereClause, true);
        }

        #endregion
        #region "Save Methods"
        public Exception SaveMethod(List<CVarST_employment> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@BirthDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@NationalID", SqlDbType.VarChar));
                Com.Parameters.Add(new SqlParameter("@Address", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@PhoneNumber1", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@PhoneNumber2", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@degree", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@Section", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@JoiningDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@Gender", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@Religion", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@maritalstatus", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@NumberofChildren", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@militarystatus", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@accessories", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@Salary", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@shiftEmp", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@routeLine", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@category", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@IsInactive", SqlDbType.Bit));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.Int, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarST_employment ObjCVarST_employment in SaveList)
                {
                    if (ObjCVarST_employment.mIsChanges == true)
                    {
                        if (ObjCVarST_employment.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemST_employment";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarST_employment.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemST_employment";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarST_employment.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarST_employment.ID;
                        }
                        Com.Parameters["@Name"].Value = ObjCVarST_employment.Name;
                        Com.Parameters["@BirthDate"].Value = ObjCVarST_employment.BirthDate;
                        Com.Parameters["@NationalID"].Value = ObjCVarST_employment.NationalID;
                        Com.Parameters["@Address"].Value = ObjCVarST_employment.Address;
                        Com.Parameters["@PhoneNumber1"].Value = ObjCVarST_employment.PhoneNumber1;
                        Com.Parameters["@PhoneNumber2"].Value = ObjCVarST_employment.PhoneNumber2;
                        Com.Parameters["@degree"].Value = ObjCVarST_employment.degree;
                        Com.Parameters["@Section"].Value = ObjCVarST_employment.Section;
                        Com.Parameters["@JoiningDate"].Value = ObjCVarST_employment.JoiningDate;
                        Com.Parameters["@Gender"].Value = ObjCVarST_employment.Gender;
                        Com.Parameters["@Religion"].Value = ObjCVarST_employment.Religion;
                        Com.Parameters["@maritalstatus"].Value = ObjCVarST_employment.maritalstatus;
                        Com.Parameters["@NumberofChildren"].Value = ObjCVarST_employment.NumberofChildren;
                        Com.Parameters["@militarystatus"].Value = ObjCVarST_employment.militarystatus;
                        Com.Parameters["@accessories"].Value = ObjCVarST_employment.accessories;
                        Com.Parameters["@Salary"].Value = ObjCVarST_employment.Salary;
                        Com.Parameters["@shiftEmp"].Value = ObjCVarST_employment.shiftEmp;
                        Com.Parameters["@routeLine"].Value = ObjCVarST_employment.routeLine;
                        Com.Parameters["@category"].Value = ObjCVarST_employment.category;
                        Com.Parameters["@IsInactive"].Value = ObjCVarST_employment.IsInactive;
                        EndTrans(Com, Con);
                        if (ObjCVarST_employment.ID == 0)
                        {
                            ObjCVarST_employment.ID = Convert.ToInt32(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarST_employment.mIsChanges = false;
                    }
                }
            }
            catch (Exception ex)
            {
                Exp = ex;
                if (tr != null)
                    tr.Rollback();
            }
            finally
            {
                Con.Close();
                Con.Dispose();
            }
            return Exp;
        }
        #endregion
        #region "Update Methods"
        public Exception UpdateList(string UpdateClause)
        {

            return SetList(UpdateClause, false);
        }

        #endregion
    }

}

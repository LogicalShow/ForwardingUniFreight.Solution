using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.ReceiptsAndPayments.ShipLink.Generated
{
    [Serializable]
    public class CPKSL_Clients
    {
        #region "variables"
        private Int64 mID;
        #endregion

        #region "Methods"
        public Int64 ID
        {
            get { return mID; }
            set { mID = value; }
        }
        #endregion
    }
    [Serializable]
    public partial class CVarSL_Clients : CPKSL_Clients
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal String mCode;
        internal Int32 mClientGroupID;
        internal String mName;
        internal String mClientAddress;
        internal DateTime mBirthDate;
        internal String mClientTel;
        internal String mClientFax;
        internal String mClientTelex;
        internal String mClientMobile;
        internal String mClientEMail;
        internal Decimal mClientCreditLimit;
        internal Decimal mClientDiscountPercentage;
        internal String mNotes;
        internal Boolean mCash;
        internal Int32 mDefaultPaymentMethodID;
        internal Int32 mDefaultAccountID;
        internal Int32 mPriceTypeID;
        internal Int32 mTitleID;
        internal String mRSph;
        internal String mRCyl;
        internal String mRAx;
        internal String mRAdd;
        internal String mRPD;
        internal String mLSph;
        internal String mLCyl;
        internal String mLAx;
        internal String mLAdd;
        internal String mLPD;
        internal String mReadingPD;
        internal String mDoctorName;
        internal String mEnglishName;
        internal String mIDNumber;
        internal String mNationality;
        internal Int32 mGracePeriod;
        internal String mImage;
        internal String mTaxRegNo;
        internal String mFileNo;
        internal String mTexDept;
        #endregion

        #region "Methods"
        public String Code
        {
            get { return mCode; }
            set { mIsChanges = true; mCode = value; }
        }
        public Int32 ClientGroupID
        {
            get { return mClientGroupID; }
            set { mIsChanges = true; mClientGroupID = value; }
        }
        public String Name
        {
            get { return mName; }
            set { mIsChanges = true; mName = value; }
        }
        public String ClientAddress
        {
            get { return mClientAddress; }
            set { mIsChanges = true; mClientAddress = value; }
        }
        public DateTime BirthDate
        {
            get { return mBirthDate; }
            set { mIsChanges = true; mBirthDate = value; }
        }
        public String ClientTel
        {
            get { return mClientTel; }
            set { mIsChanges = true; mClientTel = value; }
        }
        public String ClientFax
        {
            get { return mClientFax; }
            set { mIsChanges = true; mClientFax = value; }
        }
        public String ClientTelex
        {
            get { return mClientTelex; }
            set { mIsChanges = true; mClientTelex = value; }
        }
        public String ClientMobile
        {
            get { return mClientMobile; }
            set { mIsChanges = true; mClientMobile = value; }
        }
        public String ClientEMail
        {
            get { return mClientEMail; }
            set { mIsChanges = true; mClientEMail = value; }
        }
        public Decimal ClientCreditLimit
        {
            get { return mClientCreditLimit; }
            set { mIsChanges = true; mClientCreditLimit = value; }
        }
        public Decimal ClientDiscountPercentage
        {
            get { return mClientDiscountPercentage; }
            set { mIsChanges = true; mClientDiscountPercentage = value; }
        }
        public String Notes
        {
            get { return mNotes; }
            set { mIsChanges = true; mNotes = value; }
        }
        public Boolean Cash
        {
            get { return mCash; }
            set { mIsChanges = true; mCash = value; }
        }
        public Int32 DefaultPaymentMethodID
        {
            get { return mDefaultPaymentMethodID; }
            set { mIsChanges = true; mDefaultPaymentMethodID = value; }
        }
        public Int32 DefaultAccountID
        {
            get { return mDefaultAccountID; }
            set { mIsChanges = true; mDefaultAccountID = value; }
        }
        public Int32 PriceTypeID
        {
            get { return mPriceTypeID; }
            set { mIsChanges = true; mPriceTypeID = value; }
        }
        public Int32 TitleID
        {
            get { return mTitleID; }
            set { mIsChanges = true; mTitleID = value; }
        }
        public String RSph
        {
            get { return mRSph; }
            set { mIsChanges = true; mRSph = value; }
        }
        public String RCyl
        {
            get { return mRCyl; }
            set { mIsChanges = true; mRCyl = value; }
        }
        public String RAx
        {
            get { return mRAx; }
            set { mIsChanges = true; mRAx = value; }
        }
        public String RAdd
        {
            get { return mRAdd; }
            set { mIsChanges = true; mRAdd = value; }
        }
        public String RPD
        {
            get { return mRPD; }
            set { mIsChanges = true; mRPD = value; }
        }
        public String LSph
        {
            get { return mLSph; }
            set { mIsChanges = true; mLSph = value; }
        }
        public String LCyl
        {
            get { return mLCyl; }
            set { mIsChanges = true; mLCyl = value; }
        }
        public String LAx
        {
            get { return mLAx; }
            set { mIsChanges = true; mLAx = value; }
        }
        public String LAdd
        {
            get { return mLAdd; }
            set { mIsChanges = true; mLAdd = value; }
        }
        public String LPD
        {
            get { return mLPD; }
            set { mIsChanges = true; mLPD = value; }
        }
        public String ReadingPD
        {
            get { return mReadingPD; }
            set { mIsChanges = true; mReadingPD = value; }
        }
        public String DoctorName
        {
            get { return mDoctorName; }
            set { mIsChanges = true; mDoctorName = value; }
        }
        public String EnglishName
        {
            get { return mEnglishName; }
            set { mIsChanges = true; mEnglishName = value; }
        }
        public String IDNumber
        {
            get { return mIDNumber; }
            set { mIsChanges = true; mIDNumber = value; }
        }
        public String Nationality
        {
            get { return mNationality; }
            set { mIsChanges = true; mNationality = value; }
        }
        public Int32 GracePeriod
        {
            get { return mGracePeriod; }
            set { mIsChanges = true; mGracePeriod = value; }
        }
        public String Image
        {
            get { return mImage; }
            set { mIsChanges = true; mImage = value; }
        }
        public String TaxRegNo
        {
            get { return mTaxRegNo; }
            set { mIsChanges = true; mTaxRegNo = value; }
        }
        public String FileNo
        {
            get { return mFileNo; }
            set { mIsChanges = true; mFileNo = value; }
        }
        public String TexDept
        {
            get { return mTexDept; }
            set { mIsChanges = true; mTexDept = value; }
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

    public partial class CSL_Clients
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
        public List<CVarSL_Clients> lstCVarSL_Clients = new List<CVarSL_Clients>();
        public List<CPKSL_Clients> lstDeletedCPKSL_Clients = new List<CPKSL_Clients>();
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
        public Exception GetItem(Int64 ID)
        {
            return DataFill(Convert.ToString(ID), false);
        }
        private Exception DataFill(string Param, Boolean IsList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarSL_Clients.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListSL_Clients";
                    Com.Parameters[0].Value = Param;
                }
                else
                {
                    Com.CommandText = "[dbo].GetItemSL_Clients";
                    Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt));
                    Com.Parameters[0].Value = Convert.ToInt64(Param);
                }
                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        /*Start DataReader*/
                        CVarSL_Clients ObjCVarSL_Clients = new CVarSL_Clients();
                        ObjCVarSL_Clients.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarSL_Clients.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarSL_Clients.mClientGroupID = Convert.ToInt32(dr["ClientGroupID"].ToString());
                        ObjCVarSL_Clients.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarSL_Clients.mClientAddress = Convert.ToString(dr["ClientAddress"].ToString());
                        ObjCVarSL_Clients.mBirthDate = Convert.ToDateTime(dr["BirthDate"].ToString());
                        ObjCVarSL_Clients.mClientTel = Convert.ToString(dr["ClientTel"].ToString());
                        ObjCVarSL_Clients.mClientFax = Convert.ToString(dr["ClientFax"].ToString());
                        ObjCVarSL_Clients.mClientTelex = Convert.ToString(dr["ClientTelex"].ToString());
                        ObjCVarSL_Clients.mClientMobile = Convert.ToString(dr["ClientMobile"].ToString());
                        ObjCVarSL_Clients.mClientEMail = Convert.ToString(dr["ClientEMail"].ToString());
                        ObjCVarSL_Clients.mClientCreditLimit = Convert.ToDecimal(dr["ClientCreditLimit"].ToString());
                        ObjCVarSL_Clients.mClientDiscountPercentage = Convert.ToDecimal(dr["ClientDiscountPercentage"].ToString());
                        ObjCVarSL_Clients.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarSL_Clients.mCash = Convert.ToBoolean(dr["Cash"].ToString());
                        ObjCVarSL_Clients.mDefaultPaymentMethodID = Convert.ToInt32(dr["DefaultPaymentMethodID"].ToString());
                        ObjCVarSL_Clients.mDefaultAccountID = Convert.ToInt32(dr["DefaultAccountID"].ToString());
                        ObjCVarSL_Clients.mPriceTypeID = Convert.ToInt32(dr["PriceTypeID"].ToString());
                        ObjCVarSL_Clients.mTitleID = Convert.ToInt32(dr["TitleID"].ToString());
                        ObjCVarSL_Clients.mRSph = Convert.ToString(dr["RSph"].ToString());
                        ObjCVarSL_Clients.mRCyl = Convert.ToString(dr["RCyl"].ToString());
                        ObjCVarSL_Clients.mRAx = Convert.ToString(dr["RAx"].ToString());
                        ObjCVarSL_Clients.mRAdd = Convert.ToString(dr["RAdd"].ToString());
                        ObjCVarSL_Clients.mRPD = Convert.ToString(dr["RPD"].ToString());
                        ObjCVarSL_Clients.mLSph = Convert.ToString(dr["LSph"].ToString());
                        ObjCVarSL_Clients.mLCyl = Convert.ToString(dr["LCyl"].ToString());
                        ObjCVarSL_Clients.mLAx = Convert.ToString(dr["LAx"].ToString());
                        ObjCVarSL_Clients.mLAdd = Convert.ToString(dr["LAdd"].ToString());
                        ObjCVarSL_Clients.mLPD = Convert.ToString(dr["LPD"].ToString());
                        ObjCVarSL_Clients.mReadingPD = Convert.ToString(dr["ReadingPD"].ToString());
                        ObjCVarSL_Clients.mDoctorName = Convert.ToString(dr["DoctorName"].ToString());
                        ObjCVarSL_Clients.mEnglishName = Convert.ToString(dr["EnglishName"].ToString());
                        ObjCVarSL_Clients.mIDNumber = Convert.ToString(dr["IDNumber"].ToString());
                        ObjCVarSL_Clients.mNationality = Convert.ToString(dr["Nationality"].ToString());
                        ObjCVarSL_Clients.mGracePeriod = Convert.ToInt32(dr["GracePeriod"].ToString());
                        ObjCVarSL_Clients.mImage = Convert.ToString(dr["Image"].ToString());
                        ObjCVarSL_Clients.mTaxRegNo = Convert.ToString(dr["TaxRegNo"].ToString());
                        ObjCVarSL_Clients.mFileNo = Convert.ToString(dr["FileNo"].ToString());
                        ObjCVarSL_Clients.mTexDept = Convert.ToString(dr["TexDept"].ToString());
                        lstCVarSL_Clients.Add(ObjCVarSL_Clients);
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
            lstCVarSL_Clients.Clear();

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
                Com.CommandText = "[dbo].GetListPagingSL_Clients";
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
                        CVarSL_Clients ObjCVarSL_Clients = new CVarSL_Clients();
                        ObjCVarSL_Clients.ID = Convert.ToInt64(dr["ID"].ToString());
                        ObjCVarSL_Clients.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarSL_Clients.mClientGroupID = Convert.ToInt32(dr["ClientGroupID"].ToString());
                        ObjCVarSL_Clients.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarSL_Clients.mClientAddress = Convert.ToString(dr["ClientAddress"].ToString());
                        ObjCVarSL_Clients.mBirthDate = Convert.ToDateTime(dr["BirthDate"].ToString());
                        ObjCVarSL_Clients.mClientTel = Convert.ToString(dr["ClientTel"].ToString());
                        ObjCVarSL_Clients.mClientFax = Convert.ToString(dr["ClientFax"].ToString());
                        ObjCVarSL_Clients.mClientTelex = Convert.ToString(dr["ClientTelex"].ToString());
                        ObjCVarSL_Clients.mClientMobile = Convert.ToString(dr["ClientMobile"].ToString());
                        ObjCVarSL_Clients.mClientEMail = Convert.ToString(dr["ClientEMail"].ToString());
                        ObjCVarSL_Clients.mClientCreditLimit = Convert.ToDecimal(dr["ClientCreditLimit"].ToString());
                        ObjCVarSL_Clients.mClientDiscountPercentage = Convert.ToDecimal(dr["ClientDiscountPercentage"].ToString());
                        ObjCVarSL_Clients.mNotes = Convert.ToString(dr["Notes"].ToString());
                        ObjCVarSL_Clients.mCash = Convert.ToBoolean(dr["Cash"].ToString());
                        ObjCVarSL_Clients.mDefaultPaymentMethodID = Convert.ToInt32(dr["DefaultPaymentMethodID"].ToString());
                        ObjCVarSL_Clients.mDefaultAccountID = Convert.ToInt32(dr["DefaultAccountID"].ToString());
                        ObjCVarSL_Clients.mPriceTypeID = Convert.ToInt32(dr["PriceTypeID"].ToString());
                        ObjCVarSL_Clients.mTitleID = Convert.ToInt32(dr["TitleID"].ToString());
                        ObjCVarSL_Clients.mRSph = Convert.ToString(dr["RSph"].ToString());
                        ObjCVarSL_Clients.mRCyl = Convert.ToString(dr["RCyl"].ToString());
                        ObjCVarSL_Clients.mRAx = Convert.ToString(dr["RAx"].ToString());
                        ObjCVarSL_Clients.mRAdd = Convert.ToString(dr["RAdd"].ToString());
                        ObjCVarSL_Clients.mRPD = Convert.ToString(dr["RPD"].ToString());
                        ObjCVarSL_Clients.mLSph = Convert.ToString(dr["LSph"].ToString());
                        ObjCVarSL_Clients.mLCyl = Convert.ToString(dr["LCyl"].ToString());
                        ObjCVarSL_Clients.mLAx = Convert.ToString(dr["LAx"].ToString());
                        ObjCVarSL_Clients.mLAdd = Convert.ToString(dr["LAdd"].ToString());
                        ObjCVarSL_Clients.mLPD = Convert.ToString(dr["LPD"].ToString());
                        ObjCVarSL_Clients.mReadingPD = Convert.ToString(dr["ReadingPD"].ToString());
                        ObjCVarSL_Clients.mDoctorName = Convert.ToString(dr["DoctorName"].ToString());
                        ObjCVarSL_Clients.mEnglishName = Convert.ToString(dr["EnglishName"].ToString());
                        ObjCVarSL_Clients.mIDNumber = Convert.ToString(dr["IDNumber"].ToString());
                        ObjCVarSL_Clients.mNationality = Convert.ToString(dr["Nationality"].ToString());
                        ObjCVarSL_Clients.mGracePeriod = Convert.ToInt32(dr["GracePeriod"].ToString());
                        ObjCVarSL_Clients.mImage = Convert.ToString(dr["Image"].ToString());
                        ObjCVarSL_Clients.mTaxRegNo = Convert.ToString(dr["TaxRegNo"].ToString());
                        ObjCVarSL_Clients.mFileNo = Convert.ToString(dr["FileNo"].ToString());
                        ObjCVarSL_Clients.mTexDept = Convert.ToString(dr["TexDept"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarSL_Clients.Add(ObjCVarSL_Clients);
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
                    Com.CommandText = "[dbo].DeleteListSL_Clients";
                else
                    Com.CommandText = "[dbo].UpdateListSL_Clients";
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
        public Exception DeleteItem(List<CPKSL_Clients> DeleteList)
        {

            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.CommandText = "[dbo].DeleteItemSL_Clients";
                Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt));
                foreach (CPKSL_Clients ObjCPKSL_Clients in DeleteList)
                {
                    BeginTrans(Com, Con);
                    Com.Parameters[0].Value = Convert.ToInt64(ObjCPKSL_Clients.ID);
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
        public Exception SaveMethod(List<CVarSL_Clients> SaveList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            try
            {
                Con.Open();
                Com = new SqlCommand();
                Com.Parameters.Add(new SqlParameter("@Code", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@ClientGroupID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@Name", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@ClientAddress", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@BirthDate", SqlDbType.DateTime));
                Com.Parameters.Add(new SqlParameter("@ClientTel", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@ClientFax", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@ClientTelex", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@ClientMobile", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@ClientEMail", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@ClientCreditLimit", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@ClientDiscountPercentage", SqlDbType.Decimal));
                Com.Parameters.Add(new SqlParameter("@Notes", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@Cash", SqlDbType.Bit));
                Com.Parameters.Add(new SqlParameter("@DefaultPaymentMethodID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@DefaultAccountID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@PriceTypeID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@TitleID", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@RSph", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@RCyl", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@RAx", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@RAdd", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@RPD", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@LSph", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@LCyl", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@LAx", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@LAdd", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@LPD", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@ReadingPD", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@DoctorName", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@EnglishName", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@IDNumber", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@Nationality", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@GracePeriod", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@Image", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@TaxRegNo", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@FileNo", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@TexDept", SqlDbType.NVarChar));
                SqlParameter paraID = Com.Parameters.Add(new SqlParameter("@ID", SqlDbType.BigInt, 0, ParameterDirection.Input, false, 0, 0, "ID", DataRowVersion.Default, null));
                foreach (CVarSL_Clients ObjCVarSL_Clients in SaveList)
                {
                    if (ObjCVarSL_Clients.mIsChanges == true)
                    {
                        if (ObjCVarSL_Clients.ID == 0)
                        {
                            Com.CommandText = "[dbo].InsertItemSL_Clients";
                            paraID.Direction = ParameterDirection.Output;
                        }
                        else if (ObjCVarSL_Clients.ID != 0)
                        {
                            Com.CommandText = "[dbo].UpdateItemSL_Clients";
                            paraID.Direction = ParameterDirection.Input;
                        }
                        BeginTrans(Com, Con);
                        if (ObjCVarSL_Clients.ID != 0)
                        {
                            Com.Parameters["@ID"].Value = ObjCVarSL_Clients.ID;
                        }
                        Com.Parameters["@Code"].Value = ObjCVarSL_Clients.Code;
                        Com.Parameters["@ClientGroupID"].Value = ObjCVarSL_Clients.ClientGroupID;
                        Com.Parameters["@Name"].Value = ObjCVarSL_Clients.Name;
                        Com.Parameters["@ClientAddress"].Value = ObjCVarSL_Clients.ClientAddress;
                        Com.Parameters["@BirthDate"].Value = ObjCVarSL_Clients.BirthDate;
                        Com.Parameters["@ClientTel"].Value = ObjCVarSL_Clients.ClientTel;
                        Com.Parameters["@ClientFax"].Value = ObjCVarSL_Clients.ClientFax;
                        Com.Parameters["@ClientTelex"].Value = ObjCVarSL_Clients.ClientTelex;
                        Com.Parameters["@ClientMobile"].Value = ObjCVarSL_Clients.ClientMobile;
                        Com.Parameters["@ClientEMail"].Value = ObjCVarSL_Clients.ClientEMail;
                        Com.Parameters["@ClientCreditLimit"].Value = ObjCVarSL_Clients.ClientCreditLimit;
                        Com.Parameters["@ClientDiscountPercentage"].Value = ObjCVarSL_Clients.ClientDiscountPercentage;
                        Com.Parameters["@Notes"].Value = ObjCVarSL_Clients.Notes;
                        Com.Parameters["@Cash"].Value = ObjCVarSL_Clients.Cash;
                        Com.Parameters["@DefaultPaymentMethodID"].Value = ObjCVarSL_Clients.DefaultPaymentMethodID;
                        Com.Parameters["@DefaultAccountID"].Value = ObjCVarSL_Clients.DefaultAccountID;
                        Com.Parameters["@PriceTypeID"].Value = ObjCVarSL_Clients.PriceTypeID;
                        Com.Parameters["@TitleID"].Value = ObjCVarSL_Clients.TitleID;
                        Com.Parameters["@RSph"].Value = ObjCVarSL_Clients.RSph;
                        Com.Parameters["@RCyl"].Value = ObjCVarSL_Clients.RCyl;
                        Com.Parameters["@RAx"].Value = ObjCVarSL_Clients.RAx;
                        Com.Parameters["@RAdd"].Value = ObjCVarSL_Clients.RAdd;
                        Com.Parameters["@RPD"].Value = ObjCVarSL_Clients.RPD;
                        Com.Parameters["@LSph"].Value = ObjCVarSL_Clients.LSph;
                        Com.Parameters["@LCyl"].Value = ObjCVarSL_Clients.LCyl;
                        Com.Parameters["@LAx"].Value = ObjCVarSL_Clients.LAx;
                        Com.Parameters["@LAdd"].Value = ObjCVarSL_Clients.LAdd;
                        Com.Parameters["@LPD"].Value = ObjCVarSL_Clients.LPD;
                        Com.Parameters["@ReadingPD"].Value = ObjCVarSL_Clients.ReadingPD;
                        Com.Parameters["@DoctorName"].Value = ObjCVarSL_Clients.DoctorName;
                        Com.Parameters["@EnglishName"].Value = ObjCVarSL_Clients.EnglishName;
                        Com.Parameters["@IDNumber"].Value = ObjCVarSL_Clients.IDNumber;
                        Com.Parameters["@Nationality"].Value = ObjCVarSL_Clients.Nationality;
                        Com.Parameters["@GracePeriod"].Value = ObjCVarSL_Clients.GracePeriod;
                        Com.Parameters["@Image"].Value = ObjCVarSL_Clients.Image;
                        Com.Parameters["@TaxRegNo"].Value = ObjCVarSL_Clients.TaxRegNo;
                        Com.Parameters["@FileNo"].Value = ObjCVarSL_Clients.FileNo;
                        Com.Parameters["@TexDept"].Value = ObjCVarSL_Clients.TexDept;
                        EndTrans(Com, Con);
                        if (ObjCVarSL_Clients.ID == 0)
                        {
                            ObjCVarSL_Clients.ID = Convert.ToInt64(Com.Parameters["@ID"].Value);
                        }
                        ObjCVarSL_Clients.mIsChanges = false;
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

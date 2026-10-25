using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.Accounting.MasterData.Generated
{
    [Serializable]
    public partial class CVarvwVesselForAcc
    {
        #region "variables"
        internal Boolean mIsChanges = false;
        internal Int32 mID;
        internal String mCode;
        internal String mName;
        internal Int32 mCountryID;
        internal Decimal mOfficialNumber;
        internal String mLloydCode;
        internal String mCallSign;
        internal String mIMONumber;
        internal Int32 mBuiltYear;
        internal String mBuiltBy;
        internal Int32 mLineID;
        internal Boolean mIsMotherVessel;
        internal Byte mVesselClassID;
        internal Int32 mRegistryYear;
        internal Int32 mRegistryPortID;
        internal Decimal mGrossWeightTons;
        internal Decimal mNetWeightTons;
        internal Decimal mDeadWeightTons;
        internal Decimal mLightWeightTons;
        internal Decimal mLOA;
        internal Decimal mLBP;
        internal Decimal mDraft;
        internal Decimal mBeam;
        internal String mOwner;
        internal String mOperator;
        internal String mMainEngine;
        internal String mAuxEngine;
        internal Decimal mSpeedLadenKnots;
        internal Decimal mSpeedBallastKnots;
        internal Decimal mConLaden;
        internal Decimal mConBallast;
        internal Int64 mTimperCapacityCBM;
        internal Int64 mGrainCapacityCBM;
        internal Int64 mBaleCapacityCBM;
        internal Int64 mOnDeckCBM;
        internal Int32 mCarsCapacity;
        internal Decimal mTankCapacity;
        internal Int32 mTotalTeus;
        internal Decimal mHighHeightRatio;
        internal Int32 mVesselServiceID;
        internal String mRemarks;
        #endregion

        #region "Methods"
        public Int32 ID
        {
            get { return mID; }
            set { mID = value; }
        }
        public String Code
        {
            get { return mCode; }
            set { mCode = value; }
        }
        public String Name
        {
            get { return mName; }
            set { mName = value; }
        }
        public Int32 CountryID
        {
            get { return mCountryID; }
            set { mCountryID = value; }
        }
        public Decimal OfficialNumber
        {
            get { return mOfficialNumber; }
            set { mOfficialNumber = value; }
        }
        public String LloydCode
        {
            get { return mLloydCode; }
            set { mLloydCode = value; }
        }
        public String CallSign
        {
            get { return mCallSign; }
            set { mCallSign = value; }
        }
        public String IMONumber
        {
            get { return mIMONumber; }
            set { mIMONumber = value; }
        }
        public Int32 BuiltYear
        {
            get { return mBuiltYear; }
            set { mBuiltYear = value; }
        }
        public String BuiltBy
        {
            get { return mBuiltBy; }
            set { mBuiltBy = value; }
        }
        public Int32 LineID
        {
            get { return mLineID; }
            set { mLineID = value; }
        }
        public Boolean IsMotherVessel
        {
            get { return mIsMotherVessel; }
            set { mIsMotherVessel = value; }
        }
        public Byte VesselClassID
        {
            get { return mVesselClassID; }
            set { mVesselClassID = value; }
        }
        public Int32 RegistryYear
        {
            get { return mRegistryYear; }
            set { mRegistryYear = value; }
        }
        public Int32 RegistryPortID
        {
            get { return mRegistryPortID; }
            set { mRegistryPortID = value; }
        }
        public Decimal GrossWeightTons
        {
            get { return mGrossWeightTons; }
            set { mGrossWeightTons = value; }
        }
        public Decimal NetWeightTons
        {
            get { return mNetWeightTons; }
            set { mNetWeightTons = value; }
        }
        public Decimal DeadWeightTons
        {
            get { return mDeadWeightTons; }
            set { mDeadWeightTons = value; }
        }
        public Decimal LightWeightTons
        {
            get { return mLightWeightTons; }
            set { mLightWeightTons = value; }
        }
        public Decimal LOA
        {
            get { return mLOA; }
            set { mLOA = value; }
        }
        public Decimal LBP
        {
            get { return mLBP; }
            set { mLBP = value; }
        }
        public Decimal Draft
        {
            get { return mDraft; }
            set { mDraft = value; }
        }
        public Decimal Beam
        {
            get { return mBeam; }
            set { mBeam = value; }
        }
        public String Owner
        {
            get { return mOwner; }
            set { mOwner = value; }
        }
        public String Operator
        {
            get { return mOperator; }
            set { mOperator = value; }
        }
        public String MainEngine
        {
            get { return mMainEngine; }
            set { mMainEngine = value; }
        }
        public String AuxEngine
        {
            get { return mAuxEngine; }
            set { mAuxEngine = value; }
        }
        public Decimal SpeedLadenKnots
        {
            get { return mSpeedLadenKnots; }
            set { mSpeedLadenKnots = value; }
        }
        public Decimal SpeedBallastKnots
        {
            get { return mSpeedBallastKnots; }
            set { mSpeedBallastKnots = value; }
        }
        public Decimal ConLaden
        {
            get { return mConLaden; }
            set { mConLaden = value; }
        }
        public Decimal ConBallast
        {
            get { return mConBallast; }
            set { mConBallast = value; }
        }
        public Int64 TimperCapacityCBM
        {
            get { return mTimperCapacityCBM; }
            set { mTimperCapacityCBM = value; }
        }
        public Int64 GrainCapacityCBM
        {
            get { return mGrainCapacityCBM; }
            set { mGrainCapacityCBM = value; }
        }
        public Int64 BaleCapacityCBM
        {
            get { return mBaleCapacityCBM; }
            set { mBaleCapacityCBM = value; }
        }
        public Int64 OnDeckCBM
        {
            get { return mOnDeckCBM; }
            set { mOnDeckCBM = value; }
        }
        public Int32 CarsCapacity
        {
            get { return mCarsCapacity; }
            set { mCarsCapacity = value; }
        }
        public Decimal TankCapacity
        {
            get { return mTankCapacity; }
            set { mTankCapacity = value; }
        }
        public Int32 TotalTeus
        {
            get { return mTotalTeus; }
            set { mTotalTeus = value; }
        }
        public Decimal HighHeightRatio
        {
            get { return mHighHeightRatio; }
            set { mHighHeightRatio = value; }
        }
        public Int32 VesselServiceID
        {
            get { return mVesselServiceID; }
            set { mVesselServiceID = value; }
        }
        public String Remarks
        {
            get { return mRemarks; }
            set { mRemarks = value; }
        }
        #endregion
    }

    public partial class CvwVesselForAcc
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
        public List<CVarvwVesselForAcc> lstCVarvwVesselForAcc = new List<CVarvwVesselForAcc>();
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
        private Exception DataFill(string Param, Boolean IsList)
        {
            Exception Exp = null;
            SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            SqlCommand Com;
            SqlDataReader dr;
            lstCVarvwVesselForAcc.Clear();

            try
            {
                Con.Open();
                tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
                Com = new SqlCommand();
                Com.CommandType = CommandType.StoredProcedure;
                if (IsList == true)
                {
                    Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
                    Com.CommandText = "[dbo].GetListvwVesselForAcc";
                    Com.Parameters[0].Value = Param;
                }
                Com.Transaction = tr;
                Com.Connection = Con;
                dr = Com.ExecuteReader();
                try
                {
                    while (dr.Read())
                    {
                        /*Start DataReader*/
                        CVarvwVesselForAcc ObjCVarvwVesselForAcc = new CVarvwVesselForAcc();
                        ObjCVarvwVesselForAcc.mID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwVesselForAcc.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarvwVesselForAcc.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarvwVesselForAcc.mCountryID = Convert.ToInt32(dr["CountryID"].ToString());
                        ObjCVarvwVesselForAcc.mOfficialNumber = Convert.ToDecimal(dr["OfficialNumber"].ToString());
                        ObjCVarvwVesselForAcc.mLloydCode = Convert.ToString(dr["LloydCode"].ToString());
                        ObjCVarvwVesselForAcc.mCallSign = Convert.ToString(dr["CallSign"].ToString());
                        ObjCVarvwVesselForAcc.mIMONumber = Convert.ToString(dr["IMONumber"].ToString());
                        ObjCVarvwVesselForAcc.mBuiltYear = Convert.ToInt32(dr["BuiltYear"].ToString());
                        ObjCVarvwVesselForAcc.mBuiltBy = Convert.ToString(dr["BuiltBy"].ToString());
                        ObjCVarvwVesselForAcc.mLineID = Convert.ToInt32(dr["LineID"].ToString());
                        ObjCVarvwVesselForAcc.mIsMotherVessel = Convert.ToBoolean(dr["IsMotherVessel"].ToString());
                        ObjCVarvwVesselForAcc.mVesselClassID = Convert.ToByte(dr["VesselClassID"].ToString());
                        ObjCVarvwVesselForAcc.mRegistryYear = Convert.ToInt32(dr["RegistryYear"].ToString());
                        ObjCVarvwVesselForAcc.mRegistryPortID = Convert.ToInt32(dr["RegistryPortID"].ToString());
                        ObjCVarvwVesselForAcc.mGrossWeightTons = Convert.ToDecimal(dr["GrossWeightTons"].ToString());
                        ObjCVarvwVesselForAcc.mNetWeightTons = Convert.ToDecimal(dr["NetWeightTons"].ToString());
                        ObjCVarvwVesselForAcc.mDeadWeightTons = Convert.ToDecimal(dr["DeadWeightTons"].ToString());
                        ObjCVarvwVesselForAcc.mLightWeightTons = Convert.ToDecimal(dr["LightWeightTons"].ToString());
                        ObjCVarvwVesselForAcc.mLOA = Convert.ToDecimal(dr["LOA"].ToString());
                        ObjCVarvwVesselForAcc.mLBP = Convert.ToDecimal(dr["LBP"].ToString());
                        ObjCVarvwVesselForAcc.mDraft = Convert.ToDecimal(dr["Draft"].ToString());
                        ObjCVarvwVesselForAcc.mBeam = Convert.ToDecimal(dr["Beam"].ToString());
                        ObjCVarvwVesselForAcc.mOwner = Convert.ToString(dr["Owner"].ToString());
                        ObjCVarvwVesselForAcc.mOperator = Convert.ToString(dr["Operator"].ToString());
                        ObjCVarvwVesselForAcc.mMainEngine = Convert.ToString(dr["MainEngine"].ToString());
                        ObjCVarvwVesselForAcc.mAuxEngine = Convert.ToString(dr["AuxEngine"].ToString());
                        ObjCVarvwVesselForAcc.mSpeedLadenKnots = Convert.ToDecimal(dr["SpeedLadenKnots"].ToString());
                        ObjCVarvwVesselForAcc.mSpeedBallastKnots = Convert.ToDecimal(dr["SpeedBallastKnots"].ToString());
                        ObjCVarvwVesselForAcc.mConLaden = Convert.ToDecimal(dr["ConLaden"].ToString());
                        ObjCVarvwVesselForAcc.mConBallast = Convert.ToDecimal(dr["ConBallast"].ToString());
                        ObjCVarvwVesselForAcc.mTimperCapacityCBM = Convert.ToInt64(dr["TimperCapacityCBM"].ToString());
                        ObjCVarvwVesselForAcc.mGrainCapacityCBM = Convert.ToInt64(dr["GrainCapacityCBM"].ToString());
                        ObjCVarvwVesselForAcc.mBaleCapacityCBM = Convert.ToInt64(dr["BaleCapacityCBM"].ToString());
                        ObjCVarvwVesselForAcc.mOnDeckCBM = Convert.ToInt64(dr["OnDeckCBM"].ToString());
                        ObjCVarvwVesselForAcc.mCarsCapacity = Convert.ToInt32(dr["CarsCapacity"].ToString());
                        ObjCVarvwVesselForAcc.mTankCapacity = Convert.ToDecimal(dr["TankCapacity"].ToString());
                        ObjCVarvwVesselForAcc.mTotalTeus = Convert.ToInt32(dr["TotalTeus"].ToString());
                        ObjCVarvwVesselForAcc.mHighHeightRatio = Convert.ToDecimal(dr["HighHeightRatio"].ToString());
                        ObjCVarvwVesselForAcc.mVesselServiceID = Convert.ToInt32(dr["VesselServiceID"].ToString());
                        ObjCVarvwVesselForAcc.mRemarks = Convert.ToString(dr["Remarks"].ToString());
                        lstCVarvwVesselForAcc.Add(ObjCVarvwVesselForAcc);
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
            lstCVarvwVesselForAcc.Clear();

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
                Com.CommandText = "[dbo].GetListPagingvwVesselForAcc";
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
                        CVarvwVesselForAcc ObjCVarvwVesselForAcc = new CVarvwVesselForAcc();
                        ObjCVarvwVesselForAcc.mID = Convert.ToInt32(dr["ID"].ToString());
                        ObjCVarvwVesselForAcc.mCode = Convert.ToString(dr["Code"].ToString());
                        ObjCVarvwVesselForAcc.mName = Convert.ToString(dr["Name"].ToString());
                        ObjCVarvwVesselForAcc.mCountryID = Convert.ToInt32(dr["CountryID"].ToString());
                        ObjCVarvwVesselForAcc.mOfficialNumber = Convert.ToDecimal(dr["OfficialNumber"].ToString());
                        ObjCVarvwVesselForAcc.mLloydCode = Convert.ToString(dr["LloydCode"].ToString());
                        ObjCVarvwVesselForAcc.mCallSign = Convert.ToString(dr["CallSign"].ToString());
                        ObjCVarvwVesselForAcc.mIMONumber = Convert.ToString(dr["IMONumber"].ToString());
                        ObjCVarvwVesselForAcc.mBuiltYear = Convert.ToInt32(dr["BuiltYear"].ToString());
                        ObjCVarvwVesselForAcc.mBuiltBy = Convert.ToString(dr["BuiltBy"].ToString());
                        ObjCVarvwVesselForAcc.mLineID = Convert.ToInt32(dr["LineID"].ToString());
                        ObjCVarvwVesselForAcc.mIsMotherVessel = Convert.ToBoolean(dr["IsMotherVessel"].ToString());
                        ObjCVarvwVesselForAcc.mVesselClassID = Convert.ToByte(dr["VesselClassID"].ToString());
                        ObjCVarvwVesselForAcc.mRegistryYear = Convert.ToInt32(dr["RegistryYear"].ToString());
                        ObjCVarvwVesselForAcc.mRegistryPortID = Convert.ToInt32(dr["RegistryPortID"].ToString());
                        ObjCVarvwVesselForAcc.mGrossWeightTons = Convert.ToDecimal(dr["GrossWeightTons"].ToString());
                        ObjCVarvwVesselForAcc.mNetWeightTons = Convert.ToDecimal(dr["NetWeightTons"].ToString());
                        ObjCVarvwVesselForAcc.mDeadWeightTons = Convert.ToDecimal(dr["DeadWeightTons"].ToString());
                        ObjCVarvwVesselForAcc.mLightWeightTons = Convert.ToDecimal(dr["LightWeightTons"].ToString());
                        ObjCVarvwVesselForAcc.mLOA = Convert.ToDecimal(dr["LOA"].ToString());
                        ObjCVarvwVesselForAcc.mLBP = Convert.ToDecimal(dr["LBP"].ToString());
                        ObjCVarvwVesselForAcc.mDraft = Convert.ToDecimal(dr["Draft"].ToString());
                        ObjCVarvwVesselForAcc.mBeam = Convert.ToDecimal(dr["Beam"].ToString());
                        ObjCVarvwVesselForAcc.mOwner = Convert.ToString(dr["Owner"].ToString());
                        ObjCVarvwVesselForAcc.mOperator = Convert.ToString(dr["Operator"].ToString());
                        ObjCVarvwVesselForAcc.mMainEngine = Convert.ToString(dr["MainEngine"].ToString());
                        ObjCVarvwVesselForAcc.mAuxEngine = Convert.ToString(dr["AuxEngine"].ToString());
                        ObjCVarvwVesselForAcc.mSpeedLadenKnots = Convert.ToDecimal(dr["SpeedLadenKnots"].ToString());
                        ObjCVarvwVesselForAcc.mSpeedBallastKnots = Convert.ToDecimal(dr["SpeedBallastKnots"].ToString());
                        ObjCVarvwVesselForAcc.mConLaden = Convert.ToDecimal(dr["ConLaden"].ToString());
                        ObjCVarvwVesselForAcc.mConBallast = Convert.ToDecimal(dr["ConBallast"].ToString());
                        ObjCVarvwVesselForAcc.mTimperCapacityCBM = Convert.ToInt64(dr["TimperCapacityCBM"].ToString());
                        ObjCVarvwVesselForAcc.mGrainCapacityCBM = Convert.ToInt64(dr["GrainCapacityCBM"].ToString());
                        ObjCVarvwVesselForAcc.mBaleCapacityCBM = Convert.ToInt64(dr["BaleCapacityCBM"].ToString());
                        ObjCVarvwVesselForAcc.mOnDeckCBM = Convert.ToInt64(dr["OnDeckCBM"].ToString());
                        ObjCVarvwVesselForAcc.mCarsCapacity = Convert.ToInt32(dr["CarsCapacity"].ToString());
                        ObjCVarvwVesselForAcc.mTankCapacity = Convert.ToDecimal(dr["TankCapacity"].ToString());
                        ObjCVarvwVesselForAcc.mTotalTeus = Convert.ToInt32(dr["TotalTeus"].ToString());
                        ObjCVarvwVesselForAcc.mHighHeightRatio = Convert.ToDecimal(dr["HighHeightRatio"].ToString());
                        ObjCVarvwVesselForAcc.mVesselServiceID = Convert.ToInt32(dr["VesselServiceID"].ToString());
                        ObjCVarvwVesselForAcc.mRemarks = Convert.ToString(dr["Remarks"].ToString());
                        TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
                        lstCVarvwVesselForAcc.Add(ObjCVarvwVesselForAcc);
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
    }

}

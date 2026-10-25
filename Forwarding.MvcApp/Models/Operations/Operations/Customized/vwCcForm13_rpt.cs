using System;
using System.Text;
using System.Data;
using System.Collections;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;


namespace Forwarding.MvcApp.Models.Operations.Operations.Customized
{
	[Serializable]
	public partial class CVarvwCcForm13_rpt
	{
		#region "variables"
		internal Boolean mIsChanges = false;
		internal String mOperationCode;
		internal DateTime mOpenDate;
		internal String mForm13Number;
		internal Boolean mIsDelivered;
		internal String mNotes;
		internal Int32 mCCAID;
		internal String mCCAName;
		internal String mCCALocalName;
		internal DateTime mSalesDateReceived;
		internal DateTime mSalesDateDelivered;
		internal DateTime mCommerceDateReceived;
		internal DateTime mCommerceDateDelivered;
		internal DateTime mCCDropBackReceived;
		internal DateTime mCCDropBackDelivered;
		internal DateTime mCCAllowTemporaryReceived;
		internal DateTime mCCAllowTemporaryDelivered;
		internal Int32 mClientID;
		internal String mClientName;
		internal String mCustomerReference;
		internal String mBookingNumber;
		internal String mMasterBL;
		internal DateTime mCertificateDate;
		#endregion

		#region "Methods"
		public String OperationCode
		{
			get { return mOperationCode; }
			set { mOperationCode = value; }
		}
		public DateTime OpenDate
		{
			get { return mOpenDate; }
			set { mOpenDate = value; }
		}
		public String Form13Number
		{
			get { return mForm13Number; }
			set { mForm13Number = value; }
		}
		public Boolean IsDelivered
		{
			get { return mIsDelivered; }
			set { mIsDelivered = value; }
		}
		public String Notes
		{
			get { return mNotes; }
			set { mNotes = value; }
		}
		public Int32 CCAID
		{
			get { return mCCAID; }
			set { mCCAID = value; }
		}
		public String CCAName
		{
			get { return mCCAName; }
			set { mCCAName = value; }
		}
		public String CCALocalName
		{
			get { return mCCALocalName; }
			set { mCCALocalName = value; }
		}
		public DateTime SalesDateReceived
		{
			get { return mSalesDateReceived; }
			set { mSalesDateReceived = value; }
		}
		public DateTime SalesDateDelivered
		{
			get { return mSalesDateDelivered; }
			set { mSalesDateDelivered = value; }
		}
		public DateTime CommerceDateReceived
		{
			get { return mCommerceDateReceived; }
			set { mCommerceDateReceived = value; }
		}
		public DateTime CommerceDateDelivered
		{
			get { return mCommerceDateDelivered; }
			set { mCommerceDateDelivered = value; }
		}
		public DateTime CCDropBackReceived
		{
			get { return mCCDropBackReceived; }
			set { mCCDropBackReceived = value; }
		}
		public DateTime CCDropBackDelivered
		{
			get { return mCCDropBackDelivered; }
			set { mCCDropBackDelivered = value; }
		}
		public DateTime CCAllowTemporaryReceived
		{
			get { return mCCAllowTemporaryReceived; }
			set { mCCAllowTemporaryReceived = value; }
		}
		public DateTime CCAllowTemporaryDelivered
		{
			get { return mCCAllowTemporaryDelivered; }
			set { mCCAllowTemporaryDelivered = value; }
		}
		public Int32 ClientID
		{
			get { return mClientID; }
			set { mClientID = value; }
		}
		public String ClientName
		{
			get { return mClientName; }
			set { mClientName = value; }
		}
		public String CustomerReference
		{
			get { return mCustomerReference; }
			set { mCustomerReference = value; }
		}
		public String BookingNumber
		{
			get { return mBookingNumber; }
			set { mBookingNumber = value; }
		}
		public String MasterBL
		{
			get { return mMasterBL; }
			set { mMasterBL = value; }
		}
		public DateTime CertificateDate
		{
			get { return mCertificateDate; }
			set { mCertificateDate = value; }
		}
		#endregion
	}

	public partial class CvwCcForm13_rpt
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
		public List<CVarvwCcForm13_rpt> lstCVarvwCcForm13_rpt = new List<CVarvwCcForm13_rpt>();
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
			lstCVarvwCcForm13_rpt.Clear();

			try
			{
				Con.Open();
				tr = Con.BeginTransaction(IsolationLevel.ReadCommitted);
				Com = new SqlCommand();
				Com.CommandType = CommandType.StoredProcedure;
				if (IsList == true)
				{
					Com.Parameters.Add(new SqlParameter("@WhereClause", SqlDbType.NVarChar));
					Com.CommandText = "[dbo].GetListvwCcForm13_rpt";
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
						CVarvwCcForm13_rpt ObjCVarvwCcForm13_rpt = new CVarvwCcForm13_rpt();
						ObjCVarvwCcForm13_rpt.mOperationCode = Convert.ToString(dr["OperationCode"].ToString());
						ObjCVarvwCcForm13_rpt.mOpenDate = Convert.ToDateTime(dr["OpenDate"].ToString());
						ObjCVarvwCcForm13_rpt.mForm13Number = Convert.ToString(dr["Form13Number"].ToString());
						ObjCVarvwCcForm13_rpt.mIsDelivered = Convert.ToBoolean(dr["IsDelivered"].ToString());
						ObjCVarvwCcForm13_rpt.mNotes = Convert.ToString(dr["Notes"].ToString());
						ObjCVarvwCcForm13_rpt.mCCAID = Convert.ToInt32(dr["CCAID"].ToString());
						ObjCVarvwCcForm13_rpt.mCCAName = Convert.ToString(dr["CCAName"].ToString());
						ObjCVarvwCcForm13_rpt.mCCALocalName = Convert.ToString(dr["CCALocalName"].ToString());
						ObjCVarvwCcForm13_rpt.mSalesDateReceived = Convert.ToDateTime(dr["SalesDateReceived"].ToString());
						ObjCVarvwCcForm13_rpt.mSalesDateDelivered = Convert.ToDateTime(dr["SalesDateDelivered"].ToString());
						ObjCVarvwCcForm13_rpt.mCommerceDateReceived = Convert.ToDateTime(dr["CommerceDateReceived"].ToString());
						ObjCVarvwCcForm13_rpt.mCommerceDateDelivered = Convert.ToDateTime(dr["CommerceDateDelivered"].ToString());
						ObjCVarvwCcForm13_rpt.mCCDropBackReceived = Convert.ToDateTime(dr["CCDropBackReceived"].ToString());
						ObjCVarvwCcForm13_rpt.mCCDropBackDelivered = Convert.ToDateTime(dr["CCDropBackDelivered"].ToString());
						ObjCVarvwCcForm13_rpt.mCCAllowTemporaryReceived = Convert.ToDateTime(dr["CCAllowTemporaryReceived"].ToString());
						ObjCVarvwCcForm13_rpt.mCCAllowTemporaryDelivered = Convert.ToDateTime(dr["CCAllowTemporaryDelivered"].ToString());
						ObjCVarvwCcForm13_rpt.mClientID = Convert.ToInt32(dr["ClientID"].ToString());
						ObjCVarvwCcForm13_rpt.mClientName = Convert.ToString(dr["ClientName"].ToString());
						ObjCVarvwCcForm13_rpt.mCustomerReference = Convert.ToString(dr["CustomerReference"].ToString());
						ObjCVarvwCcForm13_rpt.mBookingNumber = Convert.ToString(dr["BookingNumber"].ToString());
						ObjCVarvwCcForm13_rpt.mMasterBL = Convert.ToString(dr["MasterBL"].ToString());
						ObjCVarvwCcForm13_rpt.mCertificateDate = Convert.ToDateTime(dr["CertificateDate"].ToString());
						lstCVarvwCcForm13_rpt.Add(ObjCVarvwCcForm13_rpt);
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
			lstCVarvwCcForm13_rpt.Clear();

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
				Com.CommandText = "[dbo].GetListPagingvwCcForm13_rpt";
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
						CVarvwCcForm13_rpt ObjCVarvwCcForm13_rpt = new CVarvwCcForm13_rpt();
						ObjCVarvwCcForm13_rpt.mOperationCode = Convert.ToString(dr["OperationCode"].ToString());
						ObjCVarvwCcForm13_rpt.mOpenDate = Convert.ToDateTime(dr["OpenDate"].ToString());
						ObjCVarvwCcForm13_rpt.mForm13Number = Convert.ToString(dr["Form13Number"].ToString());
						ObjCVarvwCcForm13_rpt.mIsDelivered = Convert.ToBoolean(dr["IsDelivered"].ToString());
						ObjCVarvwCcForm13_rpt.mNotes = Convert.ToString(dr["Notes"].ToString());
						ObjCVarvwCcForm13_rpt.mCCAID = Convert.ToInt32(dr["CCAID"].ToString());
						ObjCVarvwCcForm13_rpt.mCCAName = Convert.ToString(dr["CCAName"].ToString());
						ObjCVarvwCcForm13_rpt.mCCALocalName = Convert.ToString(dr["CCALocalName"].ToString());
						ObjCVarvwCcForm13_rpt.mSalesDateReceived = Convert.ToDateTime(dr["SalesDateReceived"].ToString());
						ObjCVarvwCcForm13_rpt.mSalesDateDelivered = Convert.ToDateTime(dr["SalesDateDelivered"].ToString());
						ObjCVarvwCcForm13_rpt.mCommerceDateReceived = Convert.ToDateTime(dr["CommerceDateReceived"].ToString());
						ObjCVarvwCcForm13_rpt.mCommerceDateDelivered = Convert.ToDateTime(dr["CommerceDateDelivered"].ToString());
						ObjCVarvwCcForm13_rpt.mCCDropBackReceived = Convert.ToDateTime(dr["CCDropBackReceived"].ToString());
						ObjCVarvwCcForm13_rpt.mCCDropBackDelivered = Convert.ToDateTime(dr["CCDropBackDelivered"].ToString());
						ObjCVarvwCcForm13_rpt.mCCAllowTemporaryReceived = Convert.ToDateTime(dr["CCAllowTemporaryReceived"].ToString());
						ObjCVarvwCcForm13_rpt.mCCAllowTemporaryDelivered = Convert.ToDateTime(dr["CCAllowTemporaryDelivered"].ToString());
						ObjCVarvwCcForm13_rpt.mClientID = Convert.ToInt32(dr["ClientID"].ToString());
						ObjCVarvwCcForm13_rpt.mClientName = Convert.ToString(dr["ClientName"].ToString());
						ObjCVarvwCcForm13_rpt.mCustomerReference = Convert.ToString(dr["CustomerReference"].ToString());
						ObjCVarvwCcForm13_rpt.mBookingNumber = Convert.ToString(dr["BookingNumber"].ToString());
						ObjCVarvwCcForm13_rpt.mMasterBL = Convert.ToString(dr["MasterBL"].ToString());
						ObjCVarvwCcForm13_rpt.mCertificateDate = Convert.ToDateTime(dr["CertificateDate"].ToString());
						TotRecs = Convert.ToInt32(dr["TotalRecords"].ToString());
						lstCVarvwCcForm13_rpt.Add(ObjCVarvwCcForm13_rpt);
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
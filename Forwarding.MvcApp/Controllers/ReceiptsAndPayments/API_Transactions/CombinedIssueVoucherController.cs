using FastReport.Wizards;
using Forwarding.MvcApp.Models.Administration.Settings.Generated;
using Forwarding.MvcApp.Models.MasterData.BanksAccountsAndTreasuries.Generated;
using Forwarding.MvcApp.Models.ReceiptsAndPayments.Transactions.Generated;
using System;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;
using Forwarding.MvcApp.Models.MasterData.CashAndBanks.Generated;
using Forwarding.MvcApp.Models.Customized;
using Forwarding.MvcApp.Models.NoAccess.Generated;

namespace Forwarding.MvcApp.Controllers.ReceiptsAndPayments.API_Transactions
{
    public class CombinedIssueVoucherController : ApiController
    {
        [HttpGet, HttpPost]
        public object[] LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned(bool pIsLoadArrayOfObjects, string pLanguage, Int32 pPageNumber, Int32 pPageSize, string pWhereClause, string pOrderBy)
        {
            int _RowCount = 0;
            CvwCombinedIssueVoucher objCvwCombinedIssueVoucher = new CvwCombinedIssueVoucher();
            objCvwCombinedIssueVoucher.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);

            CvwSec_UserSafes objCvwSec_UserSafes = new CvwSec_UserSafes();
            objCvwSec_UserSafes.GetList("WHERE UserID = " + WebSecurity.CurrentUserId);
            var UserSafes = objCvwSec_UserSafes.lstCVarvwSec_UserSafes.Select(s => new { ID = s.SafeID, Name = s.Safename }).ToList();

            CvwSec_UserBanks objCvwSec_UserBanks = new CvwSec_UserBanks();
            objCvwSec_UserBanks.GetList("WHERE UserID = " + WebSecurity.CurrentUserId);
            var UserBanks = objCvwSec_UserBanks.lstCVarvwSec_UserBanks.Select(s => new { ID = s.BankID, Name = s.Bankname }).ToList();
            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
            var CustodyList = objCCustomizedDBCall.ExecuteQuery_ListOfObjects("SELECT ID,Name FROM Custody", typeof(CVarCustody)).Cast<CVarCustody>().ToList();

            CNoAccessPartnerTypes objCPartnerTypes = new CNoAccessPartnerTypes();
            objCPartnerTypes.GetList("where id not in(1,6,20) ORDER BY Code");

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                serializer.Serialize(objCvwCombinedIssueVoucher.lstCVarvwCombinedIssueVoucher)
                , _RowCount
                , serializer.Serialize(UserSafes) //pData[2]
                , serializer.Serialize(UserBanks) //pData[3]
                , serializer.Serialize(CustodyList) //pData[4]
                ,serializer.Serialize(objCPartnerTypes.lstCVarNoAccessPartnerTypes)//pData[5]
            };
        }

        [HttpGet, HttpPost]
        public Object[] GetSafeBalance(Int32 pSafeID, DateTime pToDate)
        {
            Cvw_Current_SafeBalanceAllCurrencies objCvw_Current_SafeBalanceAllCurrencie = new Cvw_Current_SafeBalanceAllCurrencies();
            CTreasury objCTreasury = new CTreasury();
            objCTreasury.GetItem(pSafeID);
            var CurrencyID = objCTreasury.lstCVarTreasury.Count > 0 ? objCTreasury.lstCVarTreasury[0].DefaultCurrencyID : 0;
            objCvw_Current_SafeBalanceAllCurrencie.GetList(pSafeID, pToDate.AddDays(-1), CurrencyID, true);
            var OpenningBalance = objCvw_Current_SafeBalanceAllCurrencie.lstCVarvw_Current_SafeBalanceAllCurrencies.Count > 0 ? objCvw_Current_SafeBalanceAllCurrencie.lstCVarvw_Current_SafeBalanceAllCurrencies[0].Amount : 0;

            objCvw_Current_SafeBalanceAllCurrencie.GetList(pSafeID, pToDate, CurrencyID, true);
            var EndingBalance = objCvw_Current_SafeBalanceAllCurrencie.lstCVarvw_Current_SafeBalanceAllCurrencies.Count > 0 ? objCvw_Current_SafeBalanceAllCurrencie.lstCVarvw_Current_SafeBalanceAllCurrencies[0].Amount : 0;

            return new object[] {
               OpenningBalance
               ,EndingBalance
               ,CurrencyID
            };
        }

        [HttpGet, HttpPost]
        public Object[] GetBankBalance(Int32 pBankID, DateTime pToDate)
        {
            Cvw_Current_BankBalanceAllCurrencies objCvw_Current_BankBalanceAllCurrencies = new Cvw_Current_BankBalanceAllCurrencies();
            CBanks objCBanks = new CBanks();
            objCBanks.GetItem(pBankID);
            var CurrencyID = objCBanks.lstCVarBanks.Count > 0 ? objCBanks.lstCVarBanks[0].CurrencyID : 0;
            objCvw_Current_BankBalanceAllCurrencies.GetList(pBankID, pToDate.AddDays(-1), CurrencyID, true);
            var OpenningBalance = objCvw_Current_BankBalanceAllCurrencies.lstCVarvw_Current_BankBalanceAllCurrencies.Count > 0 ? objCvw_Current_BankBalanceAllCurrencies.lstCVarvw_Current_BankBalanceAllCurrencies[0].Amount : 0;

            objCvw_Current_BankBalanceAllCurrencies.GetList(pBankID, pToDate, CurrencyID, true);
            var EndingBalance = objCvw_Current_BankBalanceAllCurrencies.lstCVarvw_Current_BankBalanceAllCurrencies.Count > 0 ? objCvw_Current_BankBalanceAllCurrencies.lstCVarvw_Current_BankBalanceAllCurrencies[0].Amount : 0;

            return new object[] {
               OpenningBalance
               ,EndingBalance
               ,CurrencyID
            };
        }

        [HttpGet, HttpPost]
        public Object[] Submit(long pID, bool pIsCombined, bool pIsFleet)
        {
            Exception checkException = null;
            string ReturnedMessage = "";

            checkException = CreateIssueVoucherFromPaymentRequest(pIsFleet ? "FleetMesco.dbo.CreateIssueVoucherFromPaymentRequest" : "ForwardingMesco.dbo.CreateIssueVoucherFromPaymentRequest", pID
                , pIsCombined, WebSecurity.CurrentUserId);

            if (checkException != null)
                ReturnedMessage = checkException.Message;

            return new object[] {
                ReturnedMessage
            };
        }

        [HttpGet, HttpPost]
        public Object[] Reject(long pID, bool pIsCombined, bool pIsFleet)
        {
            Exception checkException = null;
            string ReturnedMessage = "";

            checkException = RejectPaymentRequestBeforeIssuing(pIsFleet ? "FleetMesco.dbo.RejectPaymentRequestBeforeIssuing" : "ForwardingMesco.dbo.RejectPaymentRequestBeforeIssuing", pID
                , pIsCombined, WebSecurity.CurrentUserId);

            if (checkException != null)
                ReturnedMessage = checkException.Message;

            return new object[] {
                ReturnedMessage
            };
        }

        public Exception CreateIssueVoucherFromPaymentRequest(string pStoredProcedureName, long pPaymentRequestID, bool pIsCombined, int pUserID)
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

                Com.Parameters.Add(new SqlParameter("@PaymentRequestID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@IsCombined", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@UserID", SqlDbType.Int));

                Com.CommandText = pStoredProcedureName;
                Com.Parameters[0].Value = pPaymentRequestID;
                Com.Parameters[1].Value = pIsCombined;
                Com.Parameters[2].Value = pUserID;

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
        public Exception RejectPaymentRequestBeforeIssuing(string pStoredProcedureName, long pPaymentRequestID, bool pIsCombined, int pUserID)
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

                Com.Parameters.Add(new SqlParameter("@PaymentRequestID", SqlDbType.BigInt));
                Com.Parameters.Add(new SqlParameter("@IsCombined", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@UserID", SqlDbType.Int));

                Com.CommandText = pStoredProcedureName;
                Com.Parameters[0].Value = pPaymentRequestID;
                Com.Parameters[1].Value = pIsCombined;
                Com.Parameters[2].Value = pUserID;

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

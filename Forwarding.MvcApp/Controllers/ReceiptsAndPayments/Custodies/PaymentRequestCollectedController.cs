

using Forwarding.MvcApp.Entities.Operations;
using Forwarding.MvcApp.Models.Accounting.MasterData.Generated;
using Forwarding.MvcApp.Models.Administration.Security.Generated;
using Forwarding.MvcApp.Models.Administration.Settings.Generated;
using Forwarding.MvcApp.Models.Customized;
using Forwarding.MvcApp.Models.LocalEmails.Generated;
using Forwarding.MvcApp.Models.MasterData.BanksAccountsAndTreasuries.Generated;
using Forwarding.MvcApp.Models.MasterData.Invoicing.Generated;
using Forwarding.MvcApp.Models.MasterData.Others.Generated;
using Forwarding.MvcApp.Models.MasterData.Partners.Generated;
using Forwarding.MvcApp.Models.NoAccess.Generated;
using Forwarding.MvcApp.Models.OperAcc.Generated;
using Forwarding.MvcApp.Models.Operations.Operations.Generated;
using Forwarding.MvcApp.Models.ReceiptsAndPayments.Custodies.Generated;
using Forwarding.MvcApp.Models.ReceiptsAndPayments.Transactions.Generated;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;

namespace Forwarding.MvcApp.Controllers.ReceiptsAndPayments.Custodies
{
    public class PaymentRequestCollectedController : ApiController
    {

        [HttpGet, HttpPost]
        public object[] LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned(bool pIsLoadArrayOfObjects, string pLanguage, Int32 pPageNumber, Int32 pPageSize, string pWhereClause, string pOrderBy)
        {
            int _RowCount = 0;
            Exception checkException = null;
            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
            CvwA_PaymentRequestCollected objCvwA_PaymentRequestCollected = new CvwA_PaymentRequestCollected();

            CNoAccessPartnerTypes objCPartnerTypes = new CNoAccessPartnerTypes();
            List<CVarCustody> CustodyList = new List<CVarCustody>();
            if (pIsLoadArrayOfObjects)
            {
                 CustodyList = objCCustomizedDBCall.ExecuteQuery_ListOfObjects("SELECT ID,Name FROM Custody", typeof(CVarCustody)).Cast<CVarCustody>().ToList();

                //objCPartnerTypes.GetList("where id not in(1,6,20) ORDER BY Code");

            }
            CPaymentRequestApprovalLevels objPaymentRequestApprovalLevels = new CPaymentRequestApprovalLevels();
            objPaymentRequestApprovalLevels.GetList("WHERE 1=1");
            CUsers objCUsers = new CUsers();
            objCUsers.GetList($"WHERE ID IN (SELECT DISTINCT CreatorUserID_Request FROM A_PaymentRequest WHERE ID IN (SELECT PaymentRequestID FROM A_PaymentRequestCollectedDetails))");

            checkException = objCvwA_PaymentRequestCollected.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);

            List<string> _userLevels = objCCustomizedDBCall.ExecuteQuery_Array($"SELECT LevelNo FROM vwA_PaymentRequest_UsersLevel WHERE UserID = {WebSecurity.CurrentUserId}");

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {serializer.Serialize(objCvwA_PaymentRequestCollected.lstCVarvwA_PaymentRequestCollected)//pData[0]
            ,_RowCount //pData[1]
            ,serializer.Serialize(CustodyList) //pData[2]
            ,serializer.Serialize(objPaymentRequestApprovalLevels.lstCVarPaymentRequestApprovalLevels) //pData[3]
            ,serializer.Serialize(objCUsers.lstCVarUsers) //pData[4]
            ,serializer.Serialize(_userLevels) //pData[5]
            //, serializer.Serialize(objCvwA_AccountsNotePayable.lstCVarvwA_Accounts)//pData[3]
            //, serializer.Serialize(objCTreasury.lstCVarTreasury)//pData[4]
            //, serializer.Serialize(objCBankAccount.lstCVarBankAccount)//pData[5]
            //,serializer.Serialize(objCPartnerTypes.lstCVarNoAccessPartnerTypes)//pData[6]
            };
        }

        [HttpGet, HttpPost]
        public string Approve(String pDeletedPaymentRequestIDs)
        {
            string ErrorMessage = "";
            Exception checkException = null;

            foreach (var currentID in pDeletedPaymentRequestIDs.Split(','))
            {
                checkException = A_PaymentRequestCollectedApprove("A_PaymentRequestCollected_Approve", currentID, WebSecurity.CurrentUserId);
                if (checkException != null)
                    break;
            }
            if (checkException != null ) // an exception is caught in the model
            {
                if (ErrorMessage == "")
                    ErrorMessage = checkException.Message;
            }


            return ErrorMessage;
        }
        [HttpGet, HttpPost]
        public object[] Save([FromBody] PaymentRequestCollectedData paymentRequestCollectedData)
        {
            string pMessageReturned = "";
            Exception checkException = null;

            if(paymentRequestCollectedData.pID == 0)
            {
                checkException = A_PaymentRequestCollectedSave("A_PaymentRequestCollectedWithDetails_Insert", paymentRequestCollectedData.pPaymentRequestIDs
                , paymentRequestCollectedData.pNotes, WebSecurity.CurrentUserId);
            }
            else
            {
                checkException = A_PaymentRequestCollectedUpdate("A_PaymentRequestCollectedWithDetails_Update", paymentRequestCollectedData.pID
                    , paymentRequestCollectedData.pPaymentRequestIDs
                    , paymentRequestCollectedData.pNotes, WebSecurity.CurrentUserId); 
            }


            if (checkException != null)
                pMessageReturned = checkException.Message;

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                pMessageReturned
            };
        }
        [HttpGet, HttpPost]
        public object[] LoadVoucher(Int32 pPaymentRequestCollectedID)
        {
            bool check = false;
            int _RowCount = 0;
            Exception checkException = null;
            CvwA_PaymentRequestDetails objCvwA_PaymentRequestDetails = new CvwA_PaymentRequestDetails();
            objCvwA_PaymentRequestDetails.GetListPaging(99999, 1, "WHERE PaymentRequestID in (select CD.PaymentRequestID from A_PaymentRequestCollectedDetails CD where CD.PaymentRequestCollectedID = " + pPaymentRequestCollectedID.ToString() + ")", "ID", out _RowCount);

            CvwA_PaymentRequestCollected objCvwA_PaymentRequestCollected = new CvwA_PaymentRequestCollected();
            checkException = objCvwA_PaymentRequestCollected.GetList(" Where ID = " + pPaymentRequestCollectedID + "");


            CA_PaymentRequestAccount objCA_PaymentRequestAccount = new CA_PaymentRequestAccount();
            //objCA_PaymentRequestAccount.GetList("WHERE PaymentRequestID=" + pPaymentRequestCollectedID.ToString());

            if (objCA_PaymentRequestAccount.lstCVarA_PaymentRequestAccount.Count > 0 && objCvwA_PaymentRequestDetails.lstCVarvwA_PaymentRequestDetails.Count == 0)
            {
                check = true;
            }

            CvwPartners objCvwPartners = new CvwPartners();
            objCvwPartners.GetList(" Where PartnerID = " + objCvwA_PaymentRequestCollected.lstCVarvwA_PaymentRequestCollected[0].PartnerID
                + " And PartnerTypeID = " + objCvwA_PaymentRequestCollected.lstCVarvwA_PaymentRequestCollected[0].PartnerTypeID);

            CvwA_PaymentRequestSupplier objCvwA_PaymentRequestSupplier = new CvwA_PaymentRequestSupplier();
       //     objCvwA_PaymentRequestSupplier.GetListPaging(99999, 1, "WHERE ID=" + pPaymentRequestCollectedID, "ID", out _RowCount);

            CCustody objCCustody = new CCustody();
            objCCustody.GetList(" Where ID = " + objCvwA_PaymentRequestCollected.lstCVarvwA_PaymentRequestCollected[0].CustodyID);

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                   serializer.Serialize(objCvwA_PaymentRequestDetails.lstCVarvwA_PaymentRequestDetails) //pData[0]
                 ,serializer.Serialize(objCvwA_PaymentRequestCollected.lstCVarvwA_PaymentRequestCollected) //pData[1]
                  ,serializer.Serialize(objCCustody.lstCVarCustody)//pData[2]
                  ,serializer.Serialize(objCvwA_PaymentRequestSupplier.lstCVarvwA_PaymentRequestSupplier)//pData[3]
                  ,check ////pData[4]
                  ,serializer.Serialize(objCA_PaymentRequestAccount.lstCVarA_PaymentRequestAccount)//pData[5]
                  ,serializer.Serialize(objCvwPartners.lstCVarvwPartners)//pData[6]
                };



        }
        [HttpGet, HttpPost]
        public bool UpdateRedirect(Int32 pID, bool pIsCheque, bool pisTransfer, bool pisDeposite, string pChequeNo,
           Int32 pBankID, Int32 pSafeID, DateTime pChequeDate, DateTime pDueDate, string pChargedPerson, Int32 pNoteAccountID
            , bool pisCash, bool pIsDirect)
        {
            bool _result = false;
            string pUpdateList = "";
            Exception checkException = null;

            CA_PaymentRequestCollected objCA_PaymentRequestCollected = new CA_PaymentRequestCollected();
            objCA_PaymentRequestCollected.GetList("Where ID=" + pID);
            if (objCA_PaymentRequestCollected.lstCVarA_PaymentRequestCollected[0].VoucherID == 0)
            {
                pUpdateList += "ChequeNo=N'" + pChequeNo + "'" + "\n";
                pUpdateList += ",ChargedPerson=N'" + pChargedPerson + "'" + "\n";
                pUpdateList += ",ChequeDate=N'" + pChequeDate.ToString("yyyyMMdd") + "'" + "\n";
                pUpdateList += ",DueDate=N'" + pDueDate.ToString("yyyyMMdd") + "'" + "\n";
                pUpdateList += ",IsCheque=" + (pIsCheque ? "1" : "0") + "\n";
                pUpdateList += ",IsCash=" + (pisCash ? "1" : "0") + "\n";

                pUpdateList += ",IsTransfer=" + (pisTransfer ? "1" : "0") + "\n";
                pUpdateList += ",IsDeposite=" + (pisDeposite ? "1" : "0") + "\n";
                pUpdateList += (pBankID == 0 ? (",BankID=NULL") : (",BankID=" + pBankID)) + "\n";
                pUpdateList += (pSafeID == 0 ? (",SafeID=NULL") : (",SafeID=" + pSafeID)) + "\n";
                pUpdateList += (pNoteAccountID == 0 ? (",NoteAccountID=NULL") : (",NoteAccountID=" + pNoteAccountID)) + "\n";

              //  pUpdateList += ",IsCheck=" + ((pIsCheque || pisTransfer || pisDeposite) ? "1" : "0") + "\n";
                pUpdateList += ",IsDirect=" + (pIsDirect ? "1" : "0") + "\n";

                pUpdateList += " WHERE ID = " + pID;
                checkException = objCA_PaymentRequestCollected.UpdateList(pUpdateList);

                if (checkException != null) // an exception is caught in the model
                {
                    if (checkException.Message.Contains("UNIQUE"))
                        _result = false;
                }
                else
                { //not unique
                    _result = true;
                }
            }


            return _result;
        }
        [HttpGet, HttpPost]
        public object[] GetBankAndSafeByCurrency(Int32 pCurrencyID)
        {
            int _RowCount = 0;

  
            CTreasury objCTreasury = new CTreasury();
            CBankAccount objCBankAccount = new CBankAccount();
            CvwA_LiknkAccountNotePayapleWithCurrency objCvwA_LiknkAccountNotePayapleWithCurrency = new CvwA_LiknkAccountNotePayapleWithCurrency();


            //LinkUserAndSafes
            CSystemOptions objCSystemOptions = new CSystemOptions();
            //objCSystemOptions.GetItem(55);
            objCSystemOptions.GetList(" WHERE OptionID IN (55,4049) ORDER BY OptionID");  //LinkUserAndSafes & LinkUserAndBanks
            bool UserSafeLink = objCSystemOptions.lstCVarSystemOptions[0].OptionValue;
            string pSafesWhereClause = " WHERE 1=1 and DefaultCurrencyID=" + (pCurrencyID);
            string pBanksWhereClause = " WHERE 1=1 and DefaultCurrencyID=" + (pCurrencyID);
            string pNotePayableWhereClause = " WHERE IsMain=0 and account_Name like N'%أوراق دفع%' or account_Name like N'%اوراق دفع%' and CurrencyID=" + (pCurrencyID);

            if (UserSafeLink)
            {
                pSafesWhereClause = " JOIN VW_Sec_UserSafes USF ON ID =  USF._SafeID " + pSafesWhereClause + "  AND USF._UserID=" + WebSecurity.CurrentUserId;
            }

            objCTreasury.GetListPaging(9999, 1, pSafesWhereClause, "Name", out _RowCount);
            objCBankAccount.GetListPaging(9999, 1, pBanksWhereClause, "Name", out _RowCount);


            objCvwA_LiknkAccountNotePayapleWithCurrency.GetListPaging(9999, 1, pNotePayableWhereClause, "Name", out _RowCount);

            return new object[] {
                new JavaScriptSerializer().Serialize(objCTreasury.lstCVarTreasury),
                new JavaScriptSerializer().Serialize(objCBankAccount.lstCVarBankAccount),
                new JavaScriptSerializer().Serialize(objCvwA_LiknkAccountNotePayapleWithCurrency.lstCVarvwA_LiknkAccountNotePayapleWithCurrency)

                , _RowCount


            };
        }
        public Exception A_PaymentRequestCollectedSave(string pStoredProcedureName, string pIDs, string pNotes, int pUserID)
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

                Com.Parameters.Add(new SqlParameter("@PaymentRequestIDs", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@Notes ", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@UserID", SqlDbType.Int));

                Com.CommandText = "[dbo]." + pStoredProcedureName;
                Com.Parameters[0].Value = pIDs;
                Com.Parameters[1].Value = pNotes;
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
        public Exception A_PaymentRequestCollectedUpdate(string pStoredProcedureName,int pID, string pIDs, string pNotes, int pUserID)
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
                Com.Parameters.Add(new SqlParameter("@PaymentRequestIDs", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@Notes ", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@UserID", SqlDbType.Int));

                Com.CommandText = "[dbo]." + pStoredProcedureName;
                Com.Parameters[0].Value = pID;
                Com.Parameters[1].Value = pIDs;
                Com.Parameters[2].Value = pNotes;
                Com.Parameters[3].Value = pUserID;

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
            catch (SqlException sqlEx)
            {
                // Get only your custom error message from SQL
                string errorMessage = sqlEx.Errors[0].Message;
                Exp = new Exception(errorMessage); // Optional: re-wrap for consistency
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
        public Exception A_PaymentRequestCollectedApprove(string pStoredProcedureName, string pID,  int pUserID)
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

                Com.CommandText = "[dbo]." + pStoredProcedureName;
                Com.Parameters[0].Value = pID;
                Com.Parameters[1].Value = pUserID;

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

    public class PaymentRequestCollectedData
    {
        public Int32 pID { get; set; }
        public string pPaymentRequestIDs { get; set; }
        public string pNotes
        {
            get; set;

        }
    }
}

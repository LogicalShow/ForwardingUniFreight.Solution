using Forwarding.MvcApp.Models.Accounting.Transactions.Generated;
using Forwarding.MvcApp.Models.Administration.Settings.Generated;
using Forwarding.MvcApp.Models.Customized;
using WebMatrix.WebData;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;

namespace Forwarding.MvcApp.Controllers.Administration.API_Settings
{
    public class CreditlimitexceptionperiodController : ApiController
    {
        [HttpGet, HttpPost]
        public Object[] CustomerCreditLoadWithPaging(Int32 pPageNumber, Int32 pPageSize, string pWhereClause, string pOrderBy)
        {
            CCustomerCreditlimitexceptionperiodLog objCvwCustomers = new CCustomerCreditlimitexceptionperiodLog();
            //objCCountries.GetList(string.Empty);
            Int32 _RowCount = 0;// objCCountries.lstCVarCountries.Count;

            objCvwCustomers.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);

            return new Object[] { new JavaScriptSerializer().Serialize(objCvwCustomers.lstCVarCustomerCreditlimitexceptionperiodLog), _RowCount };
        }
        [HttpGet, HttpPost]
        public Object[] LoadAll(string pWhereClause)
        {
            //int _RowCount = 0;
            
            CSystemOptions objCSystemOptions = new CSystemOptions();
            objCSystemOptions.GetList(pWhereClause);

            CSystemAccount objCSystemAccount = new CSystemAccount();
            objCSystemAccount.GetList(" where AccountID in(30,31) ");

            return new Object[] { 
                new JavaScriptSerializer().Serialize(objCSystemOptions.lstCVarSystemOptions) //pData[0]
                , new JavaScriptSerializer().Serialize(objCSystemAccount.lstCVarSystemAccount)//pData[1]
            };
        }
        [HttpGet, HttpPost]
        public object[] LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned(bool pIsLoadArrayOfObjects, string pLanguage, Int32 pPageNumber, Int32 pPageSize, string pWhereClause, string pOrderBy)
        {
            int _RowCount = 0;
            CvwCreditlimitexceptionperiod Creditlimitexceptionperiod = new CvwCreditlimitexceptionperiod();
            Creditlimitexceptionperiod.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);

            return new object[] {
                new JavaScriptSerializer().Serialize(Creditlimitexceptionperiod.lstCVarvwCreditlimitexceptionperiod)
                , _RowCount
            };
        }

        [HttpGet, HttpPost]
        public bool Insert(bool pOptionValue)
        {
            bool _result = false;

            CVarSystemOptions objCVarA_JVTypes = new CVarSystemOptions();

            objCVarA_JVTypes.OptionValue = pOptionValue;
           // objCVarA_JVTypes.USER_ID = WebSecurity.CurrentUserId;

            CSystemOptions objCA_JVTypes = new CSystemOptions();
            objCA_JVTypes.lstCVarSystemOptions.Add(objCVarA_JVTypes);
            Exception checkException = objCA_JVTypes.SaveMethod(objCA_JVTypes.lstCVarSystemOptions);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else
            { //not unique
                _result = true;
                //CallCustomizedSP
                CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
                objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "A_JVTypes", objCVarA_JVTypes.OptionID, "I");
            }
            return _result;
        }

        [HttpGet, HttpPost]
        public bool Update(Int32 pID, Int32 PcustomerID,DateTime pDate)
        {
            bool _result = false;
            TimeSpan FirsrDayTime = new TimeSpan(19, 0, 0);
            CVarCustomerCreditlimitexceptionperiod objCVarA_JVTypes = new CVarCustomerCreditlimitexceptionperiod();
            if (pID==0)
            {
                objCVarA_JVTypes.ID = 0;
            }
            else
            {
                objCVarA_JVTypes.ID = pID;
            }
            
            objCVarA_JVTypes.CustomerID = PcustomerID;
            objCVarA_JVTypes.Date = pDate.Date + FirsrDayTime;
           
            //  objCVarA_JVTypes.USER_ID = WebSecurity.CurrentUserId;

            CCustomerCreditlimitexceptionperiod objCA_JVTypes = new CCustomerCreditlimitexceptionperiod();
            objCA_JVTypes.lstCVarCustomerCreditlimitexceptionperiod.Add(objCVarA_JVTypes);
            Exception checkException = objCA_JVTypes.SaveMethod(objCA_JVTypes.lstCVarCustomerCreditlimitexceptionperiod);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else
            { //not unique
                #region insert log
    
                

                CCustomerCreditlimitexceptionperiodLog objCustomerCreditLimitLog = new CCustomerCreditlimitexceptionperiodLog();
                CVarCustomerCreditlimitexceptionperiodLog ObjCVarCustomerCreditLimitLog = new CVarCustomerCreditlimitexceptionperiodLog();

                ObjCVarCustomerCreditLimitLog.ID = 0;
                ObjCVarCustomerCreditLimitLog.CustomerID = PcustomerID; //pClientID;
                ObjCVarCustomerCreditLimitLog.CustomerCreditlimitexceptionperiod = objCVarA_JVTypes.ID;
                ObjCVarCustomerCreditLimitLog.DateLog = pDate.Date + FirsrDayTime;

                objCustomerCreditLimitLog.lstCVarCustomerCreditlimitexceptionperiodLog.Add(ObjCVarCustomerCreditLimitLog);
                Exception checkException2 = objCustomerCreditLimitLog.SaveMethod(objCustomerCreditLimitLog.lstCVarCustomerCreditlimitexceptionperiodLog);
                #endregion
                _result = true;
                CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
                objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "CustomerCreditlimitexceptionperiod", pID, "U");
            }
            return _result;
        }

        [HttpGet, HttpPost]
        public bool Delete(String pJVTypesIDs)
        {
            bool _result = true;
            CSystemOptions objCA_JVTypes = new CSystemOptions();
            Exception checkException = null;
            foreach (var currentID in pJVTypesIDs.Split(','))
            {
                objCA_JVTypes.lstDeletedCPKSystemOptions.Add(new CPKSystemOptions() { OptionID = Int32.Parse(currentID.Trim()) });
                checkException = objCA_JVTypes.DeleteItem(objCA_JVTypes.lstDeletedCPKSystemOptions);
                if (checkException != null)
                    _result = false;
                else
                {
                    CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
                    objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "A_JVTypes", Int32.Parse(currentID.Trim()), "D");
                }

            }

            return _result;
        }
    }
}

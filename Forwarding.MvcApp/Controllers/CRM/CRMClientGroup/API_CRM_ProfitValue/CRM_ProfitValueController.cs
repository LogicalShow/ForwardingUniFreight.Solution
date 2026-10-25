using Forwarding.MvcApp.Models.CRM.CRM_ContactPersons.Generated;
using Forwarding.MvcApp.Models.CRM.CRM_Sources.Generated;
using Forwarding.MvcApp.Models.CRM.CRM_ContactPersons.Generated;
using Forwarding.MvcApp.Models.MasterData.Locations.Generated;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;
using Forwarding.MvcApp.Models.CRM.Generated;
using Forwarding.MvcApp.Models.CRM.CRM_Clients.Generated;
using Forwarding.MvcApp.Models.Quotations.Quotations.Generated;

namespace Forwarding.MvcApp.Controllers.CRM.CRM_ContactPersons
{
    public class CRM_ProfitValueController : ApiController
    {
        //[Route("/api/CRM_ContactPersons/LoadAll")]
        [HttpGet, HttpPost]
        //sherif: to be used in select boxes
        public Object[] LoadAll(string pWhereClause)
        {
            CCRM_ContactPersons objCCRM_ContactPersons = new CCRM_ContactPersons();
            objCCRM_ContactPersons.GetList(pWhereClause);
            return new Object[] { new JavaScriptSerializer().Serialize(objCCRM_ContactPersons.lstCVarCRM_ContactPersons) };
        }
        
        [HttpGet, HttpPost]
        //sherif: to be used in select boxes
        public Object[] IntializeData()
        {
            CCRM_ContactPersons objCCRM_ContactPersons = new CCRM_ContactPersons();
            CCountries cCountries = new CCountries();
            CCRM_Sources cCRM_Sources = new CCRM_Sources();

            //--------------------------------------------
            objCCRM_ContactPersons.GetList("where 1 = 1");
            cCountries.GetList("where 1 = 1");
            cCRM_Sources.GetList("where 1 = 1");
            return new Object[] { new JavaScriptSerializer().Serialize(objCCRM_ContactPersons.lstCVarCRM_ContactPersons) 
                          , new JavaScriptSerializer().Serialize(cCountries.lstCVarCountries) , new JavaScriptSerializer().Serialize(cCRM_Sources.lstCVarCRM_Sources) };
        }
        
        // [Route("/api/CRM_ContactPersons/LoadWithPaging/{pPageNumber}/{pPageSize}")]
        [HttpGet, HttpPost]
        public Object[] LoadWithPaging(Int32 pPageNumber, Int32 pPageSize, string pSearchKey)
        {
            CCRM_ContactPersons objCvwCRM_ContactPersons = new CCRM_ContactPersons();
            
            Int32 _RowCount = 0;// objCvwCRM_ContactPersons.lstCVarCRM_ContactPersons.Count;
            
            pSearchKey = (pSearchKey == null ? "" : pSearchKey.Trim().ToUpper());
            string whereClause = " Where Code LIKE '%" + pSearchKey + "%' "
                + " OR Name LIKE '%" + pSearchKey + "%' ";

            objCvwCRM_ContactPersons.GetListPaging(pPageSize, pPageNumber, whereClause, " Name ", out _RowCount);
            return new Object[] {
                new JavaScriptSerializer().Serialize(objCvwCRM_ContactPersons.lstCVarCRM_ContactPersons)
                , _RowCount
            };
        }

        [HttpGet, HttpPost]
        public Object[] GetPorts(Int32 pCountryID)
        {
            CPorts objCPorts = new CPorts();
            objCPorts.GetList(" Where CountryID = "+ pCountryID);

            return new Object[] {
                new JavaScriptSerializer().Serialize(objCPorts.lstCVarPorts)
           };
        }

        [HttpGet, HttpPost]
        public Object[] LoadWithPagingWithWhereClause(Int32 pPageNumber, Int32 pPageSize, string pWhereClause)
        {
            CvwQuotationRouteWithMinimalColumns objCvwQuotationRouteWithMinimalColumns = new CvwQuotationRouteWithMinimalColumns();
            Exception checkException = null;

            CvwCRM_ProfitValue objCvwCRM_ProfitValue = new CvwCRM_ProfitValue();
            checkException = objCvwQuotationRouteWithMinimalColumns.GetList("ORDER BY ID DESC");

            objCvwCRM_ProfitValue.GetList(pWhereClause);
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[] {
                new JavaScriptSerializer().Serialize(objCvwCRM_ProfitValue.lstCVarvwCRM_ProfitValue)
                , serializer.Serialize(objCvwQuotationRouteWithMinimalColumns.lstCVarvwQuotationRouteWithMinimalColumns) //pData[1]
            };
        }
        
        // [Route("/api/CRM_ContactPersons/Insert/{pCode}/{pModificatorUser}/{pLocalName}}")]
        [HttpGet, HttpPost]
        public bool SaveProfitValue(int pID,int pClientID, int pPaymentTermID,DateTime pStartingDate,DateTime pExpectedClosingDate,string pTradeLane,
            string pCompetitors,string pBusinessVol, int pCurrencyID, int pCostCurrencyID, int pRevenueCurrencyID, int pMarginAmountCurrencyID, int pGrossMarginCurrencyID
            , decimal pCost, decimal pRevenue, decimal pMarginAmount, decimal pGrossProfit ,decimal pProfitMargin ,
            int pPipeLineStage,string  pComment, int pContainerTypeID, Int32 pPerPeriodID, Int64 pQuotationRouteID)
        {
            bool _result = false;
                CVarCRM_ProfitValue objCVarCRM_ProfitValue = new CVarCRM_ProfitValue();
                objCVarCRM_ProfitValue.ID = pID;
                objCVarCRM_ProfitValue.ClientID = pClientID;
                objCVarCRM_ProfitValue.PaymentTermID = pPaymentTermID;
                objCVarCRM_ProfitValue.StartingDate = pStartingDate;
                objCVarCRM_ProfitValue.ExpectedClosingDate = pExpectedClosingDate;
                objCVarCRM_ProfitValue.TradeLane = pTradeLane;
                objCVarCRM_ProfitValue.Competitors = pCompetitors;
                objCVarCRM_ProfitValue.BusinessVol = pBusinessVol;

            objCVarCRM_ProfitValue.CurrencyID = pCurrencyID;
            objCVarCRM_ProfitValue.CostCurrencyID = pCostCurrencyID;
            objCVarCRM_ProfitValue.RevenueCurrencyID = pRevenueCurrencyID;
            objCVarCRM_ProfitValue.MarginAmountCurrencyID = pMarginAmountCurrencyID;
            objCVarCRM_ProfitValue.GrossMarginCurrencyID = pGrossMarginCurrencyID;

            objCVarCRM_ProfitValue.Cost = pCost;
            objCVarCRM_ProfitValue.Revenue = pRevenue;
            objCVarCRM_ProfitValue.MarginAmount = pMarginAmount;
            objCVarCRM_ProfitValue.GrossProfit = pRevenue - pCost;
                objCVarCRM_ProfitValue.ProfitMargin = pCost == 0 || pRevenue == 0 ? 0 : (((pRevenue - pCost) / pCost) * 100);
                objCVarCRM_ProfitValue.PipeLineStageID = pPipeLineStage;
                objCVarCRM_ProfitValue.Comment = pComment;
                objCVarCRM_ProfitValue.ContainerTypeID = pContainerTypeID;
            objCVarCRM_ProfitValue.PerPeriodID = pPerPeriodID;
            objCVarCRM_ProfitValue.QuotationRouteID = pQuotationRouteID;

            objCVarCRM_ProfitValue.CreationDate = DateTime.Now;
                objCVarCRM_ProfitValue.CreatorUserID = WebSecurity.CurrentUserId;
                objCVarCRM_ProfitValue.ModificationDate = DateTime.Now;
                objCVarCRM_ProfitValue.ModificationUserID = WebSecurity.CurrentUserId;

                CCRM_ProfitValue objCCRM_ProfitValue = new CCRM_ProfitValue();
                objCCRM_ProfitValue.lstCVarCRM_ProfitValue.Add(objCVarCRM_ProfitValue);
                Exception checkException = objCCRM_ProfitValue.SaveMethod(objCCRM_ProfitValue.lstCVarCRM_ProfitValue);
                if (checkException != null) // an exception is caught in the model
                {
                    if (checkException.Message.Contains("UNIQUE"))
                        _result = false;
                }
                else //not unique
                    _result = true;

            if (checkException == null)
            {
                CCRM_privilegeLog objCCRM_privilegeLog = new CCRM_privilegeLog();
                CVarCRM_privilegeLog objCVarCRM_privilegeLog = new CVarCRM_privilegeLog();
                objCVarCRM_privilegeLog.ID = 0;
                objCVarCRM_privilegeLog.ClientID = pClientID == null ? 0 : pClientID;
                objCVarCRM_privilegeLog.PipeLineStageID = pPipeLineStage;
                objCVarCRM_privilegeLog.CreationDate = DateTime.Now;
                objCVarCRM_privilegeLog.CreatorUserID = WebSecurity.CurrentUserId;
                objCVarCRM_privilegeLog.ModificationDate = DateTime.Now;
                objCVarCRM_privilegeLog.ModificationUserID = WebSecurity.CurrentUserId;
                objCVarCRM_privilegeLog.ActionType = (pID == 0 ? "Insert" : "Update");
                objCCRM_privilegeLog.lstCVarCRM_privilegeLog.Add(objCVarCRM_privilegeLog);
                objCCRM_privilegeLog.SaveMethod(objCCRM_privilegeLog.lstCVarCRM_privilegeLog);
            }

            //}
            //else
            //    _result = false;
            return _result;
        }

        // [Route("/api/CRM_ContactPersons/Update/{pID}/{pCode}/{pName}/{pLocalName}")]
        [HttpGet, HttpPost]
        public bool Update(string pID ,string pNameEn,
       string pNameAr,
       string pCellPhone,
      string pTelephone,
      string pExtensionNo,
        //txtAddress
      string pEmail,
      string pPersonalPhone,
      string pPersonalEmail,
      string pPosition,
      string pIsKeyPerson,
      string pClientID)
        {
            bool _result = false;
            CCRM_ContactPersons objCCRM_ContactPersonsExists = new CCRM_ContactPersons();
            objCCRM_ContactPersonsExists.GetList(" Where CRM_ClientsID = " + int.Parse(pClientID) + " AND (NameEn = N'" + pNameEn + "' OR NameAr = N'" + pNameAr + "')");

            if (objCCRM_ContactPersonsExists.lstCVarCRM_ContactPersons.Count == 0)
            {
                CVarCRM_ContactPersons objCVarCRM_ContactPersons = new CVarCRM_ContactPersons();
                //  CVarCRM_ContactPersons objCVarCRM_ContactPersons = new CVarCRM_ContactPersons();

                //the next 4 lines to get the CreatorUserID and CreationDate and set them as they were entered before
                CCRM_ContactPersons objCGetCreationInformation = new CCRM_ContactPersons();
                objCGetCreationInformation.GetItem(int.Parse(pID));
                objCVarCRM_ContactPersons.CreatorUserID = objCGetCreationInformation.lstCVarCRM_ContactPersons[0].CreatorUserID;
                objCVarCRM_ContactPersons.CreationDate = objCGetCreationInformation.lstCVarCRM_ContactPersons[0].CreationDate;
                objCVarCRM_ContactPersons.Email = pEmail == null ? " " : pEmail; objCVarCRM_ContactPersons.ID = int.Parse(pID);
                objCVarCRM_ContactPersons.NameEn = pNameEn == null ? " " : pNameEn;
                objCVarCRM_ContactPersons.NameAr = pNameAr == null ? " " : pNameAr;

                objCVarCRM_ContactPersons.CellPhone = pCellPhone == null ? " " : pCellPhone;
                objCVarCRM_ContactPersons.Telephone = pTelephone == null ? " " : pTelephone;


                objCVarCRM_ContactPersons.ExtensionNo = pExtensionNo == null ? " " : pExtensionNo;
                objCVarCRM_ContactPersons.PersonalPhone = pPersonalPhone == null ? " " : pPersonalPhone;


                objCVarCRM_ContactPersons.PersonalEmail = pPersonalEmail == null ? " " : pPersonalEmail;
                objCVarCRM_ContactPersons.Position = pPosition == null ? " " : pPosition;

                objCVarCRM_ContactPersons.IsKeyPerson = pIsKeyPerson == null ? false : Convert.ToBoolean(pIsKeyPerson);

                objCVarCRM_ContactPersons.CRM_ClientsID = int.Parse(pClientID);
                objCVarCRM_ContactPersons.ModificationUserID = WebSecurity.CurrentUserId;
                objCVarCRM_ContactPersons.ModificationDate = DateTime.Now;

                CCRM_ContactPersons objCCRM_ContactPersons = new CCRM_ContactPersons();
                objCCRM_ContactPersons.lstCVarCRM_ContactPersons.Add(objCVarCRM_ContactPersons);
                Exception checkException = objCCRM_ContactPersons.SaveMethod(objCCRM_ContactPersons.lstCVarCRM_ContactPersons);
                if (checkException != null) // an exception is caught in the model
                {
                    if (checkException.Message.Contains("UNIQUE"))
                        _result = false;
                }
                else //not unique
                    _result = true;
            }
            else
                _result = false;
            return _result;
        }
        
        // [Route("api/CRM_ContactPersons/Delete/{pCRM_ContactPersonsIDs}")]
        [HttpGet, HttpPost]
        public bool Delete(String pCRM_ProfitValueIDs,String pPipeLineStageIDs,int pClientID)
        {
            bool _result = false;
            CCRM_ProfitValue objCCRM_ProfitValue = new CCRM_ProfitValue();
            foreach (var currentID in pCRM_ProfitValueIDs.Split(','))
            {
                objCCRM_ProfitValue.lstDeletedCPKCRM_ProfitValue.Add(new CPKCRM_ProfitValue() { ID = Int32.Parse(currentID.Trim()) });
            }

            Exception checkException = objCCRM_ProfitValue.DeleteItem(objCCRM_ProfitValue.lstDeletedCPKCRM_ProfitValue);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("DELETE")) // some or all of the rows were not deleted due to dependencies
                    _result = false;
            }
            else //deleted successfully
                _result = true;
            if (checkException == null)
            {
                for(int j=0;j< (pPipeLineStageIDs.Split(',').Length-1);j++)
                {
                    CCRM_privilegeLog objCCRM_privilegeLog = new CCRM_privilegeLog();
                    CVarCRM_privilegeLog objCVarCRM_privilegeLog = new CVarCRM_privilegeLog();
                    objCVarCRM_privilegeLog.ID = 0;
                    objCVarCRM_privilegeLog.ClientID = pClientID == null ? 0 : pClientID;
                    objCVarCRM_privilegeLog.PipeLineStageID = Convert.ToInt32(pPipeLineStageIDs.Split(',')[j]);
                    objCVarCRM_privilegeLog.CreationDate = DateTime.Now;
                    objCVarCRM_privilegeLog.CreatorUserID = WebSecurity.CurrentUserId;
                    objCVarCRM_privilegeLog.ModificationDate = DateTime.Now;
                    objCVarCRM_privilegeLog.ModificationUserID = WebSecurity.CurrentUserId;
                    objCVarCRM_privilegeLog.ActionType = "Delete";
                    objCCRM_privilegeLog.lstCVarCRM_privilegeLog.Add(objCVarCRM_privilegeLog);
                    objCCRM_privilegeLog.SaveMethod(objCCRM_privilegeLog.lstCVarCRM_privilegeLog);
                }
                
            }
            return _result;
        }
    }
}

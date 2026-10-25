using Forwarding.MvcApp.Entities.Operations;
using Forwarding.MvcApp.Controllers.Operations.API_Operations;
using Forwarding.MvcApp.Models.Administration.Security.Generated;
using Forwarding.MvcApp.Models.Administration.Settings.Generated;
using Forwarding.MvcApp.Models.InterServices.Transactions.Generated;
using Forwarding.MvcApp.Models.MasterData.Invoicing.Generated;
using Forwarding.MvcApp.Models.Operations.Operations.Generated;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;

namespace Forwarding.MvcApp.Controllers.InterServices.API_Transactions
{
    public class InterServicesRequestsController : ApiController
    {
        [HttpGet, HttpPost]
        public Object[] LoadAll(string pWhereClause)
        {
            CvwInterServicesRequests objCvwInterServicesRequests = new CvwInterServicesRequests();
            if (string.IsNullOrEmpty(pWhereClause))
                pWhereClause = " where 1=1 ";
            pWhereClause += $" and CreatorUserID={WebSecurity.CurrentUserId}";
            objCvwInterServicesRequests.GetList(pWhereClause);
            return new Object[] { new JavaScriptSerializer().Serialize(objCvwInterServicesRequests.lstCVarvwInterServicesRequests) };
        }
        
        [HttpGet, HttpPost]
        public Object[] LoadWithPaging(Int32 pPageNumber, Int32 pPageSize, string pSearchKey)
        {
            CvwInterServicesRequests objCvwInterServicesRequests = new CvwInterServicesRequests();

            Int32 _RowCount = 0;

            pSearchKey = string.IsNullOrEmpty(pSearchKey) ? "" : pSearchKey.Trim().ToUpper();
             
            string whereClause = $@" where ({WebSecurity.CurrentUserId} in (CreatorUserID, ToUserID)) 
                                     and (ToDepartmentName like N'%{pSearchKey}%' or
                                          ToUserName like N'%{pSearchKey}%' or
                                          ChargeTypeName like N'%{pSearchKey}%' or
                                          HBL like N'%{pSearchKey}%'
                                         )";
               
            objCvwInterServicesRequests.GetListPaging(pPageSize, pPageNumber, whereClause, " ID ", out _RowCount);

            return new Object[] {
                new JavaScriptSerializer().Serialize(objCvwInterServicesRequests.lstCVarvwInterServicesRequests), _RowCount, WebSecurity.CurrentUserId
            };
        }

        [HttpGet, HttpPost]
        public bool Insert(long pOperationID, int pChargeTypeID, int pStatusID, int pToDepartmentID, int pToUserID, decimal pCost, decimal pSalePrice, string pNotes)
        {
            bool _result = false;
            CUsers objCUsers = new CUsers();
            objCUsers.GetItem(WebSecurity.CurrentUserId);

            CVarInterServicesRequests objCVarInterServicesRequests = new CVarInterServicesRequests();

            objCVarInterServicesRequests.OperationID = pOperationID;
            objCVarInterServicesRequests.ChargeTypeID = pChargeTypeID;
            objCVarInterServicesRequests.StatusID = pStatusID = 10;
            objCVarInterServicesRequests.ToDepartmentID = pToDepartmentID;
            objCVarInterServicesRequests.ToUserID = pToUserID;
            objCVarInterServicesRequests.Cost = pCost;
            objCVarInterServicesRequests.SalePrice = pSalePrice;
            objCVarInterServicesRequests.Notes = string.IsNullOrEmpty(pNotes) ? "" : pNotes;
            objCVarInterServicesRequests.FromDepartmentID = objCUsers.lstCVarUsers[0].DepartmentID;
            objCVarInterServicesRequests.CreatorUserID = objCVarInterServicesRequests.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarInterServicesRequests.CreationDate = objCVarInterServicesRequests.ModificationDate = DateTime.Now;

            CInterServicesRequests objCInterServicesRequests = new CInterServicesRequests();
            objCInterServicesRequests.lstCVarInterServicesRequests.Add(objCVarInterServicesRequests);
            Exception checkException = objCInterServicesRequests.SaveMethod(objCInterServicesRequests.lstCVarInterServicesRequests);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else //not unique
                _result = true;
            //send alarm
            if (_result)
            {
                LocalEmails.LocalEmails.LocalEmailsController emailControl = new LocalEmails.LocalEmails.LocalEmailsController();
                emailControl.SendAlarmWithMinimalData(Convert.ToString(pToUserID), "InterDepartment Service", $"Sender: {WebSecurity.CurrentUserName} ({objCVarInterServicesRequests.ModificationDate})");
            }
            return _result;
        }
        
        [HttpGet, HttpPost]
        public bool Update(int pID, int pChargeTypeID, int pStatusID, int pToDepartmentID, int pToUserID, decimal pCost, decimal pSalePrice, string pNotes, long pMasterOperationId)
        {
            bool _result = false;

            CInterServicesRequests objCInterServicesRequests = new CInterServicesRequests();
            objCInterServicesRequests.GetItem(pID);

            if(objCInterServicesRequests.lstCVarInterServicesRequests.Count == 0)
            {
                return _result;
            }

            if(objCInterServicesRequests.lstCVarInterServicesRequests[0].StatusID == 20)//accepted
            {
                return _result;
            }

            if(WebSecurity.CurrentUserId == objCInterServicesRequests.lstCVarInterServicesRequests[0].CreatorUserID)
            {
                objCInterServicesRequests.lstCVarInterServicesRequests[0].ChargeTypeID = pChargeTypeID;
                objCInterServicesRequests.lstCVarInterServicesRequests[0].StatusID = pStatusID;
                objCInterServicesRequests.lstCVarInterServicesRequests[0].ToDepartmentID = pToDepartmentID;
                objCInterServicesRequests.lstCVarInterServicesRequests[0].ToUserID = pToUserID;
            }
           
            objCInterServicesRequests.lstCVarInterServicesRequests[0].Cost = pCost;
            objCInterServicesRequests.lstCVarInterServicesRequests[0].SalePrice = pSalePrice;
            objCInterServicesRequests.lstCVarInterServicesRequests[0].Notes = string.IsNullOrEmpty(pNotes) ? "" : pNotes;
            objCInterServicesRequests.lstCVarInterServicesRequests[0].ModificatorUserID = WebSecurity.CurrentUserId;
            objCInterServicesRequests.lstCVarInterServicesRequests[0].ModificationDate = DateTime.Now;
            
            Exception checkException = objCInterServicesRequests.SaveMethod(objCInterServicesRequests.lstCVarInterServicesRequests);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else //not unique
                _result = true;
            //send from service provider to consumer
            if (_result && WebSecurity.CurrentUserId != objCInterServicesRequests.lstCVarInterServicesRequests[0].CreatorUserID)
            {
                LocalEmails.LocalEmails.LocalEmailsController emailControl = new LocalEmails.LocalEmails.LocalEmailsController();
                emailControl.SendAlarmWithMinimalData(Convert.ToString(objCInterServicesRequests.lstCVarInterServicesRequests[0].CreatorUserID), "InterDepartment Service", $"Sender: {WebSecurity.CurrentUserName} ({objCInterServicesRequests.lstCVarInterServicesRequests[0].ModificationDate})");
            }
            //send from service consumer to provider when accept
            else if (_result && WebSecurity.CurrentUserId == objCInterServicesRequests.lstCVarInterServicesRequests[0].CreatorUserID && objCInterServicesRequests.lstCVarInterServicesRequests[0].StatusID == 20)
            {
                LocalEmails.LocalEmails.LocalEmailsController emailControl = new LocalEmails.LocalEmails.LocalEmailsController();
                emailControl.SendAlarmWithMinimalData(Convert.ToString(objCInterServicesRequests.lstCVarInterServicesRequests[0].ToUserID), "InterDepartment Service", $"Sender: {WebSecurity.CurrentUserName} ({objCInterServicesRequests.lstCVarInterServicesRequests[0].ModificationDate})");

                CDefaults objCDefaults = new CDefaults();
                objCDefaults.GetList(" where ID = (select isnull(max(ID),0) as ID from Defaults) ");

                if(pMasterOperationId == 0)
                {
                    COperations objCOperations = new COperations();
                    objCOperations.GetList($" where ID = {objCInterServicesRequests.lstCVarInterServicesRequests[0].OperationID} ");
                    if (objCOperations.lstCVarOperations.Count > 0)
                        pMasterOperationId = objCOperations.lstCVarOperations[0].MasterOperationID;
                }

                //save payables
                CPayables objCPayables = new CPayables();
                CVarPayables objCVarPayables = new CVarPayables {
                    InterServiceRequestID = objCInterServicesRequests.lstCVarInterServicesRequests[0].ID,
                    OperationID = pMasterOperationId,
                    BillID = pMasterOperationId == objCInterServicesRequests.lstCVarInterServicesRequests[0].OperationID ? 0 : objCInterServicesRequests.lstCVarInterServicesRequests[0].OperationID,
                    ChargeTypeID = objCInterServicesRequests.lstCVarInterServicesRequests[0].ChargeTypeID,
                    Quantity = 1,
                    ExchangeRate=1,
                    CurrencyID = objCDefaults.lstCVarDefaults[0].CurrencyID,
                    CostPrice = objCInterServicesRequests.lstCVarInterServicesRequests[0].Cost,
                    CostAmount = objCInterServicesRequests.lstCVarInterServicesRequests[0].Cost,
                    InterTransitionalPrice = objCInterServicesRequests.lstCVarInterServicesRequests[0].SalePrice,
                    Notes = objCInterServicesRequests.lstCVarInterServicesRequests[0].Notes,
                    CreationDate=DateTime.Now,
                    ModificationDate = DateTime.Now,
                    CreatorUserID = WebSecurity.CurrentUserId,
                    ModificatorUserID = WebSecurity.CurrentUserId,
                    IssueDate = DateTime.Now,
                    EntryDate = DateTime.Now,
                    SupplierInvoiceNo = "0",
                    SupplierReceiptNo = "0",
                    IsOfficial = false ,
                    IsQuotationApproval =false ,
                    ApprovePendingValue = 0,
                    crmCode = "",
                    IsPurchased=false
                };
                objCPayables.lstCVarPayables.Add(objCVarPayables);
                checkException = objCPayables.SaveMethod(objCPayables.lstCVarPayables);
                if(checkException == null)
                {
                    //save receivables
                    CReceivables objCReceivables = new CReceivables();
                    CVarReceivables objCVarReceivables = new CVarReceivables {
                        OperationID = objCVarPayables.OperationID,
                        HouseBillID = objCVarPayables.BillID,
                        PayableID = objCVarPayables.ID,
                        ChargeTypeID = objCVarPayables.ChargeTypeID,
                        Quantity = objCVarPayables.Quantity,
                        ExchangeRate = 1,
                        CurrencyID = objCDefaults.lstCVarDefaults[0].CurrencyID,
                        CostPrice = objCVarPayables.CostPrice,
                        CostAmount = objCVarPayables.CostAmount,
                        Notes = objCVarPayables.Notes,
                        CreationDate = DateTime.Now,
                        ModificationDate = DateTime.Now,
                        CreatorUserID = WebSecurity.CurrentUserId,
                        ModificatorUserID = WebSecurity.CurrentUserId,
                        IssueDate = DateTime.Now,
                        CutOffDate= DateTime.Parse("01/01/1900"),
                        PreviousCutOffDate=DateTime.Parse("01/01/1900"),
                        ManualChargeType="0",
                        CostCenterId = 0,
                        IsOfficial = false,
                        crmCode = ""
                      
                    };
                    objCReceivables.lstCVarReceivables.Add(objCVarReceivables);
                    checkException = objCReceivables.SaveMethod(objCReceivables.lstCVarReceivables);
                }
            }
            return _result;
        }

        // [Route("api/ContainerTypes/Delete/{pContainerTypesIDs}")]
        [HttpGet, HttpPost]
        public bool Delete(String pContainerTypesIDs)
        {
            bool _result = false;
            CInterServicesRequests objCInterServicesRequests = new CInterServicesRequests();
            foreach (var currentID in pContainerTypesIDs.Split(','))
            {
                objCInterServicesRequests.lstDeletedCPKInterServicesRequests.Add(new CPKInterServicesRequests() { ID = Int32.Parse(currentID.Trim()) });
            }

            Exception checkException = objCInterServicesRequests.DeleteItem(objCInterServicesRequests.lstDeletedCPKInterServicesRequests);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("DELETE")) // some or all of the rows were not deleted due to dependencies
                    _result = false;
            }
            else //deleted successfully
                _result = true;
            return _result;
        }
        #region LoadDrowdownListsData
        [HttpGet, HttpPost]
        public Object[] LoadChargeTypes(string pWhereClause)
        {
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            int _RowCount = 0;
            CChargeTypes objCChargeTypes = new CChargeTypes();
            objCChargeTypes.GetList(pWhereClause);
            if (objCChargeTypes.lstCVarChargeTypes.Count > 0)
            {
                return new Object[]
                {
                    serializer.Serialize(objCChargeTypes.lstCVarChargeTypes.Select(a=>new {ID=a.ID, Name = a.Name  }))
                    , _RowCount
                };
            }
            return new Object[] { serializer.Serialize(objCChargeTypes.lstCVarChargeTypes), _RowCount };
        }
     
        [HttpGet, HttpPost]
        public object[] LoadAllOperations(string pWhereClause)
        {
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            int _RowCount = 0;
            COperations objCOperations = new COperations();
            objCOperations.GetList(pWhereClause);
            if (objCOperations.lstCVarOperations.Count > 0)
            {
                return new Object[]
                {
                    serializer.Serialize(objCOperations.lstCVarOperations.Select(a=>new {ID=a.ID, Name = a.BLType == 2? a.HouseNumber:a.MasterBL  }))
                    , _RowCount
                };
            }
            return new Object[] { serializer.Serialize(objCOperations.lstCVarOperations), _RowCount };
        }
        #endregion

    }
}

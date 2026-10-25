using Forwarding.MvcApp.Models.Accounting.MasterData.Customized;
using Forwarding.MvcApp.Models.Accounting.MasterData.Generated;
using Forwarding.MvcApp.Models.Customized;
using Forwarding.MvcApp.Models.MasterData.Partners.Generated;
using Forwarding.MvcApp.Models.ReceiptsAndPayments.ShipLink.Generated;
using Forwarding.MvcApp.Models.ReceiptsAndPayments.YardLinkTank.Generated;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;

namespace Forwarding.MvcApp.Controllers.ReceiptsAndPayments.YardLinkTank
{
    public class YardLinkTankClientsController : ApiController
    {

        [HttpGet, HttpPost]
        public object[] LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned(bool pIsLoadArrayOfObjects, string pLanguage, Int32 pPageNumber, Int32 pPageSize, string pWhereClause, string pOrderBy)
        {
            int _RowCount = 0;
            CvwSL_ClientsGroups objCvwSL_ClientsGroups = new CvwSL_ClientsGroups();
            if (pIsLoadArrayOfObjects)
            {
                objCvwSL_ClientsGroups.GetListPaging(9999, 1, "WHERE 1=1", "Name", out _RowCount);
            }
            CvwSL_ClientToLinkYardLinkTank objCvwSL_ClientToLink = new CvwSL_ClientToLinkYardLinkTank();
            objCvwSL_ClientToLink.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);

            return new object[] {
                new JavaScriptSerializer().Serialize(objCvwSL_ClientToLink.lstCVarvwSL_ClientToLinkYardLinkTank)
                , _RowCount
                , pIsLoadArrayOfObjects ? new JavaScriptSerializer().Serialize(objCvwSL_ClientsGroups.lstCVarvwSL_ClientsGroups) : null //pAccounts = pData[2]
            };
        }

        [HttpGet, HttpPost]
        public object Save(string pSelectedIDs, Int32 pClientGroupID)
        {
            bool _result = false;
            Exception checkException = null;
            CvwSL_ClientsGroups objCvwSL_ClientsGroups = new CvwSL_ClientsGroups();
            CvwClientsYardLinkTank objCClient = new CvwClientsYardLinkTank();
            CCustomers objCSL_Clients = new CCustomers();
            //CSL_Clients  objCSL_Clients = new CSL_Clients();
            CA_SubAccounts objCA_SubAccounts = new CA_SubAccounts();
            CA_SubAccounts_Details objCA_SubAccounts_Details = new CA_SubAccounts_Details();
            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
            var ArrSelectedIDs = pSelectedIDs.Split(',');
            for (int i = 0; i < ArrSelectedIDs.Length; i++)
            {
                checkException = objCvwSL_ClientsGroups.GetList("WHERE ID=" + pClientGroupID);
                checkException = objCClient.GetList("WHERE ID=" + ArrSelectedIDs[i]);
                CSL_YardLinkTankClients objCVarSL_ShipLinkClientsCheck = new CSL_YardLinkTankClients();
                objCVarSL_ShipLinkClientsCheck.GetList("WHERE YardClientID=" + ArrSelectedIDs[i]);
                if (objCVarSL_ShipLinkClientsCheck.lstCVarSL_YardLinkTankClients.Count ==0  && objCClient.lstCVarvwClientsYardLinkTank.Count >0)
                {
                    #region Insert SL_Clients
                    //CVarSL_Clients objCVarSL_Clients = new CVarSL_Clients();
                    CVarCustomers objCVarSL_Clients = new CVarCustomers();
                    objCVarSL_Clients.ID = 0;
                    //objCVarCustomers.EnglishName = objCClient.lstCVarvwClientsYard[0].Name == "" ? objCClient.lstCVarvwClientsYard[0].ArabicName : objCClient.lstCVarvwClientsYard[0].Name;
                    objCVarSL_Clients.LocalName = objCClient.lstCVarvwClientsYardLinkTank[0].ArName == "" ? objCClient.lstCVarvwClientsYardLinkTank[0].EnName : objCClient.lstCVarvwClientsYardLinkTank[0].ArName;
                    objCVarSL_Clients.Name = objCClient.lstCVarvwClientsYardLinkTank[0].EnName == "" ? objCClient.lstCVarvwClientsYardLinkTank[0].ArName : objCClient.lstCVarvwClientsYardLinkTank[0].EnName;
                    objCVarSL_Clients.SubAccountGroupID = pClientGroupID;
                    objCVarSL_Clients.Address = objCClient.lstCVarvwClientsYardLinkTank[0].AddressInfo;
                    // objCVarSL_Clients.BirthDate = DateTime.Parse("01/01/1900");
                    // objCVarSL_Clients.PhonesAndFaxes = objCClient.lstCVarvwClientsYard[0].Phone1;
                    // objCVarSL_Clients.PhonesAndFaxes = objCClient.lstCVarvwClientsYard[0].Fax;
                    //objCVarSL_Clients.ClientTelex = "0";
                    objCVarSL_Clients.PhonesAndFaxes = objCClient.lstCVarvwClientsYardLinkTank[0].Mobile;
                    objCVarSL_Clients.Email = objCClient.lstCVarvwClientsYardLinkTank[0].EMail;
                    objCVarSL_Clients.Notes = objCClient.lstCVarvwClientsYardLinkTank[0].Remarks;
                    objCVarSL_Clients.IsConsignee = true;
                    objCVarSL_Clients.IsShipper = true;
                    objCVarSL_Clients.IsDeleted = false;

                    objCVarSL_Clients.IsInternalCustomer = false;
                    objCVarSL_Clients.IsInactive = false;
                    objCVarSL_Clients.VATNumber = objCClient.lstCVarvwClientsYardLinkTank[0].TaxNumber;
                    objCVarSL_Clients.IsExternal = false;
                    objCVarSL_Clients.OriginalCMRbyPost = false;

                    objCVarSL_Clients.CreationDate = DateTime.Parse("01/01/1900");
                    objCVarSL_Clients.ModificationDate = DateTime.Parse("01/01/1900");



                    //objCVarSL_Clients.ClientCreditLimit = 0;
                    //objCVarSL_Clients.ClientDiscountPercentage = 0;
                    objCVarSL_Clients.SubAccountID = 0;
                    objCVarSL_Clients.SalesmanID = 0;
                    objCVarSL_Clients.PaymentTermID = 0;
                    objCVarSL_Clients.CurrencyID = 0;
                    objCVarSL_Clients.TaxeTypeID = 0;
                    objCVarSL_Clients.Code = 0;
                    objCVarSL_Clients.Website = "";
                    objCVarSL_Clients.ShippingDetails = "";

                    objCVarSL_Clients.IsConsolidatedInvoice = false;
                    objCVarSL_Clients.BankName = "";
                    objCVarSL_Clients.BankAddress = "";
                    objCVarSL_Clients.Swift = "";
                    objCVarSL_Clients.IBANNumber = "";
                    objCVarSL_Clients.BankAccountNumber = "";
                    objCVarSL_Clients.BillingDetails = "";
                    objCVarSL_Clients.BillingDetails = "";
                    objCVarSL_Clients.AccountID = 0;
                    objCVarSL_Clients.AdministratorRoleID = 1;

                    objCVarSL_Clients.CostCenterID = 0;
                    objCVarSL_Clients.ManagerRoleID = 5;
                    objCVarSL_Clients.ManagerRoleID = 1;
                    objCVarSL_Clients.TimeLocked = DateTime.Parse("01-01-1900");
                    objCVarSL_Clients.LockingUserID = 0;
                    objCVarSL_Clients.CreatorUserID = objCVarSL_Clients.ModificatorUserID = WebSecurity.CurrentUserId;
                    objCVarSL_Clients.CategoryID = 0;
                    objCVarSL_Clients.ForeignExporterNo = "0";
                    objCVarSL_Clients.crmCode = "0";
                    objCVarSL_Clients.ReservationReason = "0";
                    objCVarSL_Clients.AllProductsReserved = false;
                    objCVarSL_Clients.MainClientID = 0;
                    objCVarSL_Clients.IsHold = false;
                    objCVarSL_Clients.HoldReason = "";
                    objCVarSL_Clients.Finance365Ref = "";
                    objCVarSL_Clients.OwnerId = 0;
                    objCVarSL_Clients.OwnersIds = "0";
                    objCVarSL_Clients.BranchID = 0;
                    objCVarSL_Clients.DebitorGroupID = 0;
                    objCVarSL_Clients.Mobile = "0";


                    Common.Common.ReplaceNull(objCVarSL_Clients);
                    objCSL_Clients.lstCVarCustomers.Add(objCVarSL_Clients);
                    checkException = objCSL_Clients.SaveMethod(objCSL_Clients.lstCVarCustomers);
                    if (checkException == null)
                    {
                        #region Add A_SubAccount
                        int NoZeros = objCvwSL_ClientsGroups.lstCVarvwSL_ClientsGroups[0].Remained;
                        string SubAccountNumber = objCvwSL_ClientsGroups.lstCVarvwSL_ClientsGroups[0].ParentCode + objCvwSL_ClientsGroups.lstCVarvwSL_ClientsGroups[0].NewCode;
                        for (int j = 0; j < NoZeros; j++)
                        {
                            SubAccountNumber = SubAccountNumber.Insert(SubAccountNumber.Length, "0");
                        }
                        CVarA_SubAccounts objCVarA_SubAccounts = new CVarA_SubAccounts();
                        objCVarA_SubAccounts.SubAccount_Number = SubAccountNumber;
                        objCVarA_SubAccounts.SubAccount_Name = objCClient.lstCVarvwClientsYardLinkTank[0].ArName == "" ? objCClient.lstCVarvwClientsYardLinkTank[0].EnName : objCClient.lstCVarvwClientsYardLinkTank[0].ArName;
                        objCVarA_SubAccounts.SubAccount_EnName = objCClient.lstCVarvwClientsYardLinkTank[0].EnName == "" ? objCClient.lstCVarvwClientsYardLinkTank[0].ArName : objCClient.lstCVarvwClientsYardLinkTank[0].EnName;
                        objCVarA_SubAccounts.Parent_ID = objCvwSL_ClientsGroups.lstCVarvwSL_ClientsGroups[0].ID;
                        objCVarA_SubAccounts.IsMain = false;
                        objCVarA_SubAccounts.SubAccLevel = objCvwSL_ClientsGroups.lstCVarvwSL_ClientsGroups[0].Level + 1;
                        objCVarA_SubAccounts.RealSubAccountCode = objCvwSL_ClientsGroups.lstCVarvwSL_ClientsGroups[0].ParentCode + objCvwSL_ClientsGroups.lstCVarvwSL_ClientsGroups[0].NewCode;
                        objCVarA_SubAccounts.Balance = 0;
                        objCVarA_SubAccounts.User_ID = WebSecurity.CurrentUserId;
                        objCA_SubAccounts.lstCVarA_SubAccounts.Add(objCVarA_SubAccounts);
                        checkException = objCA_SubAccounts.SaveMethod(objCA_SubAccounts.lstCVarA_SubAccounts);
                        if (checkException == null)
                        {
                            objCA_SubAccounts.UpdateList("IsMain =1 where ID=" + objCvwSL_ClientsGroups.lstCVarvwSL_ClientsGroups[0].ID);
                            objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "A_SubAccounts", objCVarA_SubAccounts.ID, "I");
                            #region Add SubAccountDetails if exist
                            objCA_SubAccounts_Details.GetList("WHERE SubAccount_ID=" + objCvwSL_ClientsGroups.lstCVarvwSL_ClientsGroups[0].ID);
                            if (objCA_SubAccounts_Details.lstCVarA_SubAccounts_Details.Count > 0)
                                for (int z = 0; z < objCA_SubAccounts_Details.lstCVarA_SubAccounts_Details.Count; z++)
                                {
                                    objCCustomizedDBCall.SP_A_SubAccounts_Details("SP_A_SubAccounts_Details", "I", objCVarA_SubAccounts.ID, objCA_SubAccounts_Details.lstCVarA_SubAccounts_Details[z].Account_ID, false);
                                }
                            #endregion Add SubAccountDetails if exist
                            objCSL_Clients.UpdateList("SubAccountID=" + objCVarA_SubAccounts.ID + " WHERE ID=" + objCVarSL_Clients.ID);
                            if (objCA_SubAccounts_Details.lstCVarA_SubAccounts_Details.Count > 0)
                            {
                                objCSL_Clients.UpdateList("AccountID=" + objCA_SubAccounts_Details.lstCVarA_SubAccounts_Details[0].Account_ID + " WHERE ID=" + objCVarSL_Clients.ID);

                            }


                            //CVarAR_ClientsSubAccounts objCVarAR_ClientsSubAccounts = new CVarAR_ClientsSubAccounts();
                            //objCVarAR_ClientsSubAccounts.ClientID = objCVarSL_Clients.ID;
                            //objCVarAR_ClientsSubAccounts.SubAccountID = objCVarA_SubAccounts.ID;
                            //CAR_ClientsSubAccounts objCAR_ClientsSubAccounts = new CAR_ClientsSubAccounts();
                            //objCAR_ClientsSubAccounts.lstCVarAR_ClientsSubAccounts.Add(objCVarAR_ClientsSubAccounts);
                            //checkException = objCAR_ClientsSubAccounts.SaveMethod(objCAR_ClientsSubAccounts.lstCVarAR_ClientsSubAccounts);
                            //if (checkException == null)
                            //{
                            //    #region Add SubAccountDetails if exist
                            //    objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "AR_ClientsSubAccounts", objCVarAR_ClientsSubAccounts.ID, "I");
                            //    objCA_SubAccounts_Details.GetList("WHERE SubAccount_ID=" + objCvwSL_ClientsGroups.lstCVarvwSL_ClientsGroups[0].ID);
                            //    if (objCA_SubAccounts_Details.lstCVarA_SubAccounts_Details.Count > 0)
                            //        for (int z = 0; z < objCA_SubAccounts_Details.lstCVarA_SubAccounts_Details.Count; z++)
                            //        {
                            //            objCCustomizedDBCall.SP_A_SubAccounts_Details("SP_A_SubAccounts_Details", "I", objCVarA_SubAccounts.ID, objCA_SubAccounts_Details.lstCVarA_SubAccounts_Details[z].Account_ID, false);
                            //        }
                            //    #endregion Add SubAccountDetails if exist
                            //}
                            CVarSL_YardLinkTankClients objCVarSL_ShipLinkClients = new CVarSL_YardLinkTankClients();
                            objCVarSL_ShipLinkClients.YardClientID = objCClient.lstCVarvwClientsYardLinkTank[0].ID;
                            objCVarSL_ShipLinkClients.ERPClientID = objCVarSL_Clients.ID;
                            objCVarSL_ShipLinkClients.SubAccountID = objCVarA_SubAccounts.ID;
                            CSL_YardLinkTankClients objCSL_ShipLinkClients = new CSL_YardLinkTankClients();
                            objCSL_ShipLinkClients.lstCVarSL_YardLinkTankClients.Add(objCVarSL_ShipLinkClients);
                            checkException = objCSL_ShipLinkClients.SaveMethod(objCSL_ShipLinkClients.lstCVarSL_YardLinkTankClients);
                            if (checkException == null)
                                _result = true;
                        }

                        #endregion Add A_SubAccount
                    }
                    #endregion Insert SL_Clients

                }
            }
            return new object[] {
                _result
            };
        }

    }
}

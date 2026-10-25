using Forwarding.MvcApp.Models.Accounting.MasterData.Customized;
using Forwarding.MvcApp.Models.Accounting.MasterData.Generated;
using Forwarding.MvcApp.Models.Customized;
using Forwarding.MvcApp.Models.MasterData.Partners.Generated;
using Forwarding.MvcApp.Models.ReceiptsAndPayments.ShipLink.Generated;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;

namespace Forwarding.MvcApp.Controllers.ReceiptsAndPayments.ShipLink
{
    public class ShipLinkClientsController : ApiController
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
            CvwSL_ClientToLink objCvwSL_ClientToLink = new CvwSL_ClientToLink();
            objCvwSL_ClientToLink.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);

            return new object[] {
                new JavaScriptSerializer().Serialize(objCvwSL_ClientToLink.lstCVarvwSL_ClientToLink)
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
            CvwClients objCClient = new CvwClients();
            CCustomers objCCustomers = new CCustomers();
            CSL_Clients objCSL_Clients = new CSL_Clients();
            CA_SubAccounts objCA_SubAccounts = new CA_SubAccounts();
            CA_SubAccounts_Details objCA_SubAccounts_Details = new CA_SubAccounts_Details();
            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
            var ArrSelectedIDs = pSelectedIDs.Split(',');
            for (int i = 0; i < ArrSelectedIDs.Length; i++)
            {
                checkException = objCvwSL_ClientsGroups.GetList("WHERE ID=" + pClientGroupID);
                checkException = objCClient.GetList("WHERE ID=" + ArrSelectedIDs[i]);
                #region Insert SL_Clients
                CVarSL_Clients objCVarSL_Clients = new CVarSL_Clients();
                CVarCustomers objCVarCustomers = new CVarCustomers();

                //objCVarCustomers.EnglishName = objCClient.lstCVarvwClients[0].Name == "" ? objCClient.lstCVarvwClients[0].ArabicName : objCClient.lstCVarvwClients[0].Name;
                objCVarCustomers.Name = objCClient.lstCVarvwClients[0].Name == "" ? objCClient.lstCVarvwClients[0].ArabicName : objCClient.lstCVarvwClients[0].Name;
                objCVarCustomers.LocalName = objCClient.lstCVarvwClients[0].Name == "" ? objCClient.lstCVarvwClients[0].ArabicName : objCClient.lstCVarvwClients[0].Name;
                objCVarCustomers.SubAccountGroupID = pClientGroupID;

                // objCVarCustomers.ClientGroupID = pClientGroupID;
                objCVarCustomers.ManagerRoleID = 5;
                objCVarCustomers.AdministratorRoleID = 1;
                objCVarCustomers.TimeLocked = DateTime.Parse("01-01-1900");
                objCVarCustomers.CreationDate = DateTime.Parse("01-01-1900");
                objCVarCustomers.ModificationDate = DateTime.Parse("01-01-1900");
                objCVarCustomers.Website = "";
                objCVarCustomers.IsConsignee = true;
                objCVarCustomers.IsShipper = true;
                objCVarCustomers.IsInternalCustomer = false;
                objCVarCustomers.IsInactive = false;
                objCVarCustomers.IsDeleted = false;
                objCVarCustomers.Address = "";
                objCVarCustomers.PhonesAndFaxes = "";
                objCVarCustomers.VATNumber = objCClient.lstCVarvwClients[0].TaxNumber != "" ? objCClient.lstCVarvwClients[0].TaxNumber : "0"; 
                objCVarCustomers.IsConsolidatedInvoice = false;
                objCVarCustomers.BankName = "";
                objCVarCustomers.BankAddress = "";
                objCVarCustomers.Swift = "";
                objCVarCustomers.BankAccountNumber = "";
                objCVarCustomers.IBANNumber = "";
                String Code = objCCustomizedDBCall.CallStringFunction("select  isnull(max(cast(Code as numeric)),0)+1  from Customers");

                objCVarCustomers.Code = int.Parse(Code);
                //int.Parse(objCClient.lstCVarvwClients[0].Code);
                //  objCVarCustomers.ClientAddress = objCClient.lstCVarvwClients[0].AddressInfo;
                //objCVarCustomers.BirthDate = DateTime.Parse("01/01/1900");
                //objCVarCustomers.ClientTel = objCClient.lstCVarvwClients[0].Phone;
                // objCVarCustomers.ClientfFax = objCClient.lstCVarvwClients[0].Fax;
                // objCVarCustomers.ClientTelex = "0";
                // objCVarCustomers.ClientMobile = objCClient.lstCVarvwClients[0].Mobile;
                objCVarCustomers.Email = objCClient.lstCVarvwClients[0].EMail;
                objCVarCustomers.Notes = objCClient.lstCVarvwClients[0].Remarks;
                // objCVarCustomers.Cash = true;
                //objCVarCustomers.ClientCreditLimit = 0;
                // objCVarCustomers.ClientDiscountPercentage = 0;
                objCVarCustomers.BillingDetails = "0";
                objCVarCustomers.ShippingDetails = "0";
                objCVarCustomers.ForeignExporterNo = "";
                objCVarCustomers.crmCode = "";
                objCVarCustomers.AllProductsReserved = false;
                objCVarCustomers.ReservationReason = "";
                objCVarCustomers.MainClientID = 0;
                objCVarCustomers.IsHold = false;
                objCVarCustomers.HoldReason = "";
                objCVarCustomers.Finance365Ref = "";
                objCVarCustomers.OwnerId = 0;
                objCVarCustomers.OwnersIds = "0";
                objCVarCustomers.BranchID = 0;
                objCVarCustomers.DebitorGroupID = 0;
                objCVarCustomers.Mobile ="0";

                Common.Common.ReplaceNull(objCVarCustomers);
                objCCustomers.lstCVarCustomers.Add(objCVarCustomers);
                checkException = objCCustomers.SaveMethod(objCCustomers.lstCVarCustomers);
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
                    objCVarA_SubAccounts.SubAccount_Name = objCClient.lstCVarvwClients[0].Name == "" ? objCClient.lstCVarvwClients[0].ArabicName : objCClient.lstCVarvwClients[0].Name;
                    objCVarA_SubAccounts.SubAccount_EnName = objCClient.lstCVarvwClients[0].Name == "" ? objCClient.lstCVarvwClients[0].ArabicName : objCClient.lstCVarvwClients[0].Name;
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
                        objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "A_SubAccounts",objCVarA_SubAccounts.ID, "I");
                        #region Add SubAccountDetails if exist
                        objCA_SubAccounts_Details.GetList("WHERE SubAccount_ID=" + objCvwSL_ClientsGroups.lstCVarvwSL_ClientsGroups[0].ID);
                        if (objCA_SubAccounts_Details.lstCVarA_SubAccounts_Details.Count > 0)
                            for (int z = 0; z < objCA_SubAccounts_Details.lstCVarA_SubAccounts_Details.Count; z++)
                            {
                                objCCustomizedDBCall.SP_A_SubAccounts_Details("SP_A_SubAccounts_Details", "I", objCVarA_SubAccounts.ID, objCA_SubAccounts_Details.lstCVarA_SubAccounts_Details[z].Account_ID, false);
                            }
                        #endregion Add SubAccountDetails if exist
                        objCCustomers.UpdateList("SubAccountID=" + objCVarA_SubAccounts.ID + " WHERE ID=" + objCVarCustomers.ID);
                        if (objCA_SubAccounts_Details.lstCVarA_SubAccounts_Details.Count > 0)
                        {
                            objCCustomers.UpdateList("AccountID=" + objCA_SubAccounts_Details.lstCVarA_SubAccounts_Details[0].Account_ID + " WHERE ID=" + objCVarCustomers.ID);

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
                        CVarSL_ShipLinkClients objCVarSL_ShipLinkClients = new CVarSL_ShipLinkClients();
                        objCVarSL_ShipLinkClients.ShippingClientID = objCClient.lstCVarvwClients[0].ID;
                        objCVarSL_ShipLinkClients.ERPClientID = objCCustomers.lstCVarCustomers[0].ID;
                        objCVarSL_ShipLinkClients.SubAccountID = objCVarA_SubAccounts.ID;
                        CSL_ShipLinkClients objCSL_ShipLinkClients = new CSL_ShipLinkClients();
                        objCSL_ShipLinkClients.lstCVarSL_ShipLinkClients.Add(objCVarSL_ShipLinkClients);
                        checkException = objCSL_ShipLinkClients.SaveMethod(objCSL_ShipLinkClients.lstCVarSL_ShipLinkClients);
                        if (checkException == null)
                            _result = true;
                    }

                    #endregion Add A_SubAccount
                }
                #endregion Insert SL_Clients
            }
            return new object[] {
                _result
            };
        }

    }
}

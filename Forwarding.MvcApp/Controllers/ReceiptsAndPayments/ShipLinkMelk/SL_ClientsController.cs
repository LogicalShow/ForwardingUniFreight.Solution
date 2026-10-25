using Forwarding.MvcApp.Models.Accounting.MasterData.Customized;
using Forwarding.MvcApp.Models.Accounting.MasterData.Generated;
using Forwarding.MvcApp.Models.Customized;
using Forwarding.MvcApp.Models.ReceiptsAndPayments.ShipLinkMelk.Generated;
using Forwarding.MvcApp.Models.MasterData.Invoicing.Generated;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;
using Forwarding.MvcApp.Models.MasterData.BanksAccountsAndTreasuries.Generated;

namespace Forwarding.MvcApp.Controllers.ReceiptsAndPayments.ShipLinkMelk
{
    public class SL_ClientsController : ApiController
    {

        [HttpGet, HttpPost]
        public Object[] IntializeData(string pDate, string pOnlyCurrency)
        {
            int _RowCount = 0;
            if (!bool.Parse(pOnlyCurrency))
            {
                CBankAccount CBank = new CBankAccount();
                CA_SubAccounts CA_SubAccounts = new CA_SubAccounts();
                CBank.GetList("where 1 = 1");
                CA_SubAccounts.GetList("where SubAccount_Number like'4%' and IsMain = 1");

                return new Object[]
                {
                 new JavaScriptSerializer().Serialize(CBank.lstCVarBankAccount),
                 new JavaScriptSerializer().Serialize(CA_SubAccounts.lstCVarA_SubAccounts)

                };
            }
            else
            {
                CvwCurrencyDetails cCurrencies = new CvwCurrencyDetails();
                cCurrencies.GetList(" where  CONVERT(date , \'" + pDate + "\') between  CONVERT(date ,FromDate) and  CONVERT(date ,ToDate) ");
                return new Object[]
                {    new JavaScriptSerializer().Serialize(cCurrencies.lstCVarvwCurrencyDetails) };
            }
        }

        [HttpGet, HttpPost]
        //sherif: to be used in select boxes
        public Object[] GetListGroup(string pWhereClause, string pOrderBy)
        {
            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
            DataTable dtGetGroupSubAccounts1 = objCCustomizedDBCall.ExecuteQuery_DataTable("SELECT * FROM A_SubAccounts SA where SA.SubAccount_Number like'4%' and IsMain = 1");
            CVarSL_Clients ObjCVarPS_Suppliers = null;
            CSL_Clients objCSuppliers = new CSL_Clients();
            for (int i = 0; i < dtGetGroupSubAccounts1.Rows.Count; i++)
            {
                ObjCVarPS_Suppliers = new CVarSL_Clients();
                ObjCVarPS_Suppliers.mSubAccountGroupID = Convert.ToInt32(dtGetGroupSubAccounts1.Rows[i]["ID"].ToString());
                ObjCVarPS_Suppliers.mName = dtGetGroupSubAccounts1.Rows[i]["SubAccount_Name"].ToString();
                objCSuppliers.lstCVarSL_Clients.Add(ObjCVarPS_Suppliers);
            }
            return new Object[] { new JavaScriptSerializer().Serialize(objCSuppliers.lstCVarSL_Clients) };
        }
        [HttpGet, HttpPost]
        //sherif: to be used in select boxes
        public Object[] LoadAll(string pWhereClause)
        {
            CSL_Clients objCLine = new CSL_Clients();
            objCLine.GetList(pWhereClause);
            return new Object[] { new JavaScriptSerializer().Serialize(objCLine.lstCVarSL_Clients) };
        }
        [HttpGet, HttpPost]
        public object[] LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned(bool pIsLoadArrayOfObjects, string pLanguage, Int32 pPageNumber, Int32 pPageSize, string pWhereClause, string pOrderBy)
        {
            CSL_Clients objClient = new CSL_Clients();
            Int32 _RowCount = 0;
            if (pIsLoadArrayOfObjects)
            {
                objClient.GetListPaging(pPageSize, pPageNumber, pWhereClause, " ID DESC ", out _RowCount);
            }


            return new object[] {
                new JavaScriptSerializer().Serialize(objClient.lstCVarSL_Clients)
                , _RowCount

            };
        }
        // [Route("/api/Line/LoadWithPaging/{pPageNumber}/{pPageSize}")]
        [HttpGet, HttpPost]
        public Object[] LoadWithPaging(Int32 pPageNumber, Int32 pPageSize, string pSearchKey)
        {
            CSL_Clients objClient = new CSL_Clients();
            //objCLine.GetList(string.Empty); //GetList() fn loads without paging

            pSearchKey = (pSearchKey == null ? "" : pSearchKey.Trim().ToUpper());
            Int32 _RowCount = objClient.lstCVarSL_Clients.Count;
            string whereClause = " Where Code LIKE N'%" + pSearchKey + "%' "
                + " OR Name LIKE N'%" + pSearchKey + "%' "
                + " OR englishname LIKE N'%" + pSearchKey + "%' "
                + " OR clientAddress LIKE N'%" + pSearchKey + "%' "
                + " OR clientMobile LIKE N'%" + pSearchKey + "%' "
                + " OR Notes LIKE N'%" + pSearchKey + "%' "
                + " OR clientEmail LIKE N'%" + pSearchKey + "%' ";
            objClient.GetListPaging(pPageSize, pPageNumber, whereClause, "Code", out _RowCount);
            return new Object[] { new JavaScriptSerializer().Serialize(objClient.lstCVarSL_Clients), _RowCount };
        }

        // [Route("/api/Line/Insert/{pCode}/{pName}/{pLocalName}}")]
        [HttpGet, HttpPost]
        public bool Insert(String pCode, String pName, string PClientAddress,String PBirthDate, String pClientTel,String pClientFax,
            String pClientTelex,String pClientMobile,String pClientEMail,Int32 pClientCreditLimit,Int32 pClientDiscountPercentage,
            String pNotes, bool pCash,Int32 pDefaultPaymentMethodID,Int32 pAccountID,Int32 pPriceTypeID,Int32 pTitleID,String pClientIBN,
            String pTaxOfficeAddress,String pEnglishName,String pIDNumber,String PNationality,Int32 pSubAccountID,Int32 pCostCenterID,
            Int32 pSubAccountGroupID,Int32 pPaymentBankID,Int32 pCountryID,Int32 pCityID,String pWebsite,String pTaxNumber,String pTaxFileNumber, 
            string pTaxCard, string pFileNo, string pTaxOffice, string pCommercialRegistration,Int32 pGracePeriod)
        //public bool Insert(String pCode, String pName)
        {
            bool _result = false;

            CVarSL_Clients objCVarClients = new CVarSL_Clients();

            objCVarClients.Code = pCode;
            objCVarClients.Name = pName;
            objCVarClients.ClientAddress = (PClientAddress == null ? "" : PClientAddress.Trim().ToUpper());
            objCVarClients.BirthDate = Convert.ToDateTime(PBirthDate == null ? "" : PBirthDate.Trim().ToUpper());
            objCVarClients.ClientTel =  (pClientTel == null ? "" : pClientTel.Trim().ToUpper());
            objCVarClients.ClientFax= (pClientFax == null ? "" : pClientFax.Trim().ToUpper());
            objCVarClients.ClientTelex = (pClientTelex == null ? "" : pClientTelex.Trim().ToUpper());
            objCVarClients.ClientMobile = (pClientMobile == null ? "" : pClientMobile.Trim().ToUpper());
            objCVarClients.ClientEMail = (pClientEMail == null ? "" : pClientEMail.Trim().ToUpper());
            objCVarClients.ClientEMail = (pClientEMail == null ? "" : pClientEMail.Trim().ToUpper());
            objCVarClients.ClientCreditLimit = pClientCreditLimit;
            objCVarClients.ClientDiscountPercentage = pClientDiscountPercentage;
            objCVarClients.Notes = (pNotes == null ? "" : pNotes.Trim().ToUpper());
            objCVarClients.Cash =true;
            objCVarClients.DefaultPaymentMethodID = pDefaultPaymentMethodID;
            objCVarClients.AccountID = pAccountID;
            objCVarClients.PriceTypeID = pPriceTypeID;
            objCVarClients.TitleID = pTitleID;
            //objCVarClients.ClientIBN = (pClientIBN == null ? "" : pClientIBN.Trim().ToUpper());
            //objCVarClients.TaxOfficeAddress = (pTaxOfficeAddress == null ? "" : pTaxOfficeAddress.Trim().ToUpper());
            objCVarClients.EnglishName = (pEnglishName == null ? "" : pEnglishName.Trim().ToUpper());
            objCVarClients.IDNumber = (pIDNumber == null ? "" : pIDNumber.Trim().ToUpper());
            objCVarClients.Nationality = (PNationality == null ? "" : PNationality.Trim().ToUpper());
            objCVarClients.SubAccountID = pSubAccountID;
            //objCVarClients.CostCenterID = pCostCenterID;
            objCVarClients.SubAccountGroupID = pSubAccountGroupID;
            // objCVarClients.PaymentBankID = pPaymentBankID;
            // objCVarClients.CountryID = pCountryID;
            //   objCVarClients.CityID = pCityID;
            objCVarClients.RSph = "0";
            objCVarClients.RCyl = "0";
            objCVarClients.RAx = "0";
            objCVarClients.RAdd = "0";
            objCVarClients.RPD = "0";
            objCVarClients.RAx = "0";
            objCVarClients.RAdd = "0";
            objCVarClients.RPD = "0";
            objCVarClients.LSph = "0";
            objCVarClients.LCyl = "0";
            objCVarClients.LAx = "0";
            objCVarClients.LAdd = "0";
            objCVarClients.LPD = "0";
            objCVarClients.ReadingPD = "0";
            objCVarClients.DoctorName = "0";
          
            objCVarClients.Nationality = "0";
            objCVarClients.Image = "0";
            objCVarClients.TaxRegNo = "0";
            objCVarClients.TexDept = "0";
            objCVarClients.PaymentBankID = pPaymentBankID;

            // objCVarClients.Website = (pWebsite == null ? "" : pWebsite.Trim().ToUpper());
            objCVarClients.TaxCard = (pTaxNumber == null ? "" : pTaxNumber.Trim().ToUpper());
            objCVarClients.TaxCard = (pTaxCard == null ? "" : pTaxCard.Trim().ToUpper());
            objCVarClients.FileNo = (pFileNo == null ? "" : pFileNo.Trim().ToUpper());
            //objCVarClients.TaxOffice = (pTaxOffice == null ? "" : pTaxOffice.Trim().ToUpper());
            objCVarClients.CommercialRegistration = (pCommercialRegistration == null ? "" : pCommercialRegistration.Trim().ToUpper());
            objCVarClients.GracePeriod = pGracePeriod;

            CSL_Clients objClients = new CSL_Clients();
            objClients.lstCVarSL_Clients.Add(objCVarClients);
            Exception checkException = objClients.SaveMethod(objClients.lstCVarSL_Clients);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else
            { //not unique
                _result = true;
                #region Create SubAccount
                int _RowCount = 0;
                if (pAccountID != 0 && pSubAccountGroupID != 0 && pSubAccountID == 0)
                {
                    #region Get data to insert
                    CA_SubAccounts objCA_SubAccounts = new CA_SubAccounts();
                    checkException = objCA_SubAccounts.GetListPaging(9999, 1, "WHERE ID = " + pSubAccountGroupID.ToString(), "ID", out _RowCount);
                    CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
                    string pNewCode = objCCustomizedDBCall.CallStringFunction("SELECT [dbo].A_SubAccounts_GetCode(" + (pSubAccountGroupID == 0 ? "null" : pSubAccountGroupID.ToString()) + ") AS Code");
                    #endregion Get data to insert
                    #region Insert
                    CVarA_SubAccounts objCVarA_SubAccounts = new CVarA_SubAccounts();
                    objCVarA_SubAccounts.SubAccount_Number = (objCA_SubAccounts.lstCVarA_SubAccounts[0].RealSubAccountCode + pNewCode).PadRight(21, '0');
                    objCVarA_SubAccounts.SubAccount_Name = pName.Trim().ToUpper();
                    objCVarA_SubAccounts.SubAccount_EnName = pName.Trim().ToUpper();
                    objCVarA_SubAccounts.Parent_ID = pSubAccountGroupID;
                    objCVarA_SubAccounts.IsMain = false;
                    objCVarA_SubAccounts.SubAccLevel = objCA_SubAccounts.lstCVarA_SubAccounts[0].SubAccLevel + 1;
                    objCVarA_SubAccounts.RealSubAccountCode = objCA_SubAccounts.lstCVarA_SubAccounts[0].RealSubAccountCode + pNewCode;
                    objCVarA_SubAccounts.User_ID = WebSecurity.CurrentUserId;
                    objCA_SubAccounts.lstCVarA_SubAccounts.Add(objCVarA_SubAccounts);
                    checkException = objCA_SubAccounts.SaveMethod(objCA_SubAccounts.lstCVarA_SubAccounts);
                    if (checkException == null)
                    {
                        _result = true;
                        int pNewSubAccountID = objCVarA_SubAccounts.ID;
                        //CallCustomizedSP
                        objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "A_SubAccounts", pNewSubAccountID, "AutoInsert");
                        //Set Parent.IsMain=true
                        objCA_SubAccounts.UpdateList("IsMain=1 WHERE ID=" + pSubAccountGroupID.ToString());
                        #region add Details if exists
                        CA_SubAccounts_Details objCA_SubAccounts_Details = new CA_SubAccounts_Details(); //get the parent details
                        checkException = objCA_SubAccounts_Details.GetListPaging(9999, 1, "WHERE SubAccount_ID = " + pSubAccountGroupID.ToString(), "SubAccount_ID", out _RowCount);
                        for (int i = 0; i < objCA_SubAccounts_Details.lstCVarA_SubAccounts_Details.Count; i++)
                        {
                            //this is insert, so i am sure i ve no children to link accounts to, ALSO I don't need to delete because they are new
                            objCCustomizedDBCall.SP_A_SubAccounts_Details("SP_A_SubAccounts_Details", "I", pNewSubAccountID, objCA_SubAccounts_Details.lstCVarA_SubAccounts_Details[i].Account_ID, false);
                        }
                        #endregion add Details if exists
                        //Update Customer SubaccountID
                        objClients.UpdateList("SubAccountID=" + objCVarA_SubAccounts.ID + " WHERE ID=" + objCVarClients.ID);
                    }
                    #endregion Insert
                }
                #endregion Create SubAccount
            }
            return _result;
        }

        // [Route("/api/Line/Update/{pCode}/{pName}/{pLocalName}}")]
        [HttpGet, HttpPost]
        public bool Update(Int32 pID,String pCode, String pName, string PClientAddress, String PBirthDate, String pClientTel, String pClientFax,
            String pClientTelex, String pClientMobile, String pClientEMail, String pClientCreditLimit, String pClientDiscountPercentage,
            String pNotes, bool pCash, Int32 pDefaultPaymentMethodID, Int32 pAccountID, Int32 pPriceTypeID, Int32 pTitleID, String pClientIBN,
            String pTaxOfficeAddress, String pEnglishName, String pIDNumber, String PNationality, Int32 pSubAccountID, Int32 pCostCenterID,
            Int32 pSubAccountGroupID, Int32 pPaymentBankID, String pCountryID, String pCityID, String pWebsite, String pTaxNumber, String pTaxFileNumber,
            string pTaxCard, string pFileNo, string pTaxOffice, string pCommercialRegistration, String pGracePeriod)
        {
            bool _result = false;

            CVarSL_Clients objCVarClients = new CVarSL_Clients();

            objCVarClients.ID = pID;
            objCVarClients.Code = pCode;
            objCVarClients.Name = pName;
            objCVarClients.ClientAddress = (PClientAddress == null ? "" : PClientAddress.Trim().ToUpper());
            objCVarClients.BirthDate = Convert.ToDateTime(PBirthDate == null ? "" : PBirthDate.Trim().ToUpper());
            objCVarClients.ClientTel = (pClientTel == null ? "" : pClientTel.Trim().ToUpper());
            objCVarClients.ClientFax = (pClientFax == null ? "" : pClientFax.Trim().ToUpper());
            objCVarClients.ClientTelex = (pClientTelex == null ? "" : pClientTelex.Trim().ToUpper());
            objCVarClients.ClientMobile = (pClientMobile == null ? "" : pClientMobile.Trim().ToUpper());
            objCVarClients.ClientEMail = (pClientEMail == null ? "" : pClientEMail.Trim().ToUpper());
            objCVarClients.ClientEMail = (pClientEMail == null ? "" : pClientEMail.Trim().ToUpper());
            objCVarClients.ClientCreditLimit = int.Parse(pClientCreditLimit);
            objCVarClients.ClientDiscountPercentage = int.Parse(pClientDiscountPercentage);
            objCVarClients.Notes = (pNotes == null ? "" : pNotes.Trim().ToUpper());
            objCVarClients.Cash = true;
            objCVarClients.DefaultPaymentMethodID = pDefaultPaymentMethodID;
            objCVarClients.AccountID = pAccountID;
            objCVarClients.PriceTypeID = pPriceTypeID;
            objCVarClients.TitleID = pTitleID;
           // objCVarClients.ClientIBN = (pClientIBN == null ? "" : pClientIBN.Trim().ToUpper());
           // objCVarClients.TaxOfficeAddress = (pTaxOfficeAddress == null ? "" : pTaxOfficeAddress.Trim().ToUpper());
            objCVarClients.EnglishName = (pEnglishName == null ? "" : pEnglishName.Trim().ToUpper());
            objCVarClients.IDNumber = (pIDNumber == null ? "" : pIDNumber.Trim().ToUpper());
            objCVarClients.Nationality = (PNationality == null ? "" : PNationality.Trim().ToUpper());
            objCVarClients.SubAccountID = pSubAccountID;
            //objCVarClients.CostCenterID = pCostCenterID;
            objCVarClients.SubAccountGroupID = pSubAccountGroupID;
            objCVarClients.RSph = "0";
            objCVarClients.RCyl = "0";
            objCVarClients.RAx = "0";
            objCVarClients.RAdd = "0";
            objCVarClients.RPD = "0";
            objCVarClients.RAx = "0";
            objCVarClients.RAdd = "0";
            objCVarClients.RPD = "0";
            objCVarClients.LSph = "0";
            objCVarClients.LCyl = "0";
            objCVarClients.LAx = "0";
            objCVarClients.LAdd = "0";
            objCVarClients.LPD = "0";
            objCVarClients.ReadingPD = "0";
            objCVarClients.DoctorName = "0";
            objCVarClients.PaymentBankID = pPaymentBankID;


            objCVarClients.Nationality = "0";
            objCVarClients.Image = "0";
            objCVarClients.TaxRegNo = "0";
            objCVarClients.TexDept = "0";

            //objCVarClients.PaymentBankID = pPaymentBankID;
            //objCVarClients.CountryID = pCountryID;
            //objCVarClients.CityID = pCityID;
            //objCVarClients.Website = (pWebsite == null ? "" : pWebsite.Trim().ToUpper());
            objCVarClients.TaxCard = (pTaxNumber == null ? "" : pTaxNumber.Trim().ToUpper());
            objCVarClients.FileNo = (pTaxFileNumber == null ? "" : pTaxFileNumber.Trim().ToUpper());
            objCVarClients.TaxCard = (pTaxCard == null ? "" : pTaxCard.Trim().ToUpper());
            objCVarClients.FileNo = (pFileNo == null ? "" : pFileNo.Trim().ToUpper());
           //objCVarClients.TaxOffice = (pTaxOffice == null ? "" : pTaxOffice.Trim().ToUpper());
            objCVarClients.CommercialRegistration = (pCommercialRegistration == null ? "" : pCommercialRegistration.Trim().ToUpper());
            objCVarClients.GracePeriod = int.Parse( pGracePeriod);

            CSL_Clients objClients = new CSL_Clients();
            objClients.lstCVarSL_Clients.Add(objCVarClients);
            Exception checkException = objClients.SaveMethod(objClients.lstCVarSL_Clients);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else
            { //not unique
                _result = true;
                #region Create SubAccount
                int _RowCount = 0;
                if (pAccountID != 0 && pSubAccountGroupID != 0 && pSubAccountID == 0)
                {
                    #region Get data to insert
                    CA_SubAccounts objCA_SubAccounts = new CA_SubAccounts();
                    checkException = objCA_SubAccounts.GetListPaging(9999, 1, "WHERE ID = " + pSubAccountGroupID.ToString(), "ID", out _RowCount);
                    CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
                    string pNewCode = objCCustomizedDBCall.CallStringFunction("SELECT [dbo].A_SubAccounts_GetCode(" + (pSubAccountGroupID == 0 ? "null" : pSubAccountGroupID.ToString()) + ") AS Code");
                    #endregion Get data to insert
                    #region Insert
                    CVarA_SubAccounts objCVarA_SubAccounts = new CVarA_SubAccounts();
                    objCVarA_SubAccounts.SubAccount_Number = (objCA_SubAccounts.lstCVarA_SubAccounts[0].RealSubAccountCode + pNewCode).PadRight(21, '0');
                    objCVarA_SubAccounts.SubAccount_Name = pName.Trim().ToUpper();
                    objCVarA_SubAccounts.SubAccount_EnName = pName.Trim().ToUpper();
                    objCVarA_SubAccounts.Parent_ID = pSubAccountGroupID;
                    objCVarA_SubAccounts.IsMain = false;
                    objCVarA_SubAccounts.SubAccLevel = objCA_SubAccounts.lstCVarA_SubAccounts[0].SubAccLevel + 1;
                    objCVarA_SubAccounts.RealSubAccountCode = objCA_SubAccounts.lstCVarA_SubAccounts[0].RealSubAccountCode + pNewCode;
                    objCVarA_SubAccounts.User_ID = WebSecurity.CurrentUserId;
                    objCA_SubAccounts.lstCVarA_SubAccounts.Add(objCVarA_SubAccounts);
                    checkException = objCA_SubAccounts.SaveMethod(objCA_SubAccounts.lstCVarA_SubAccounts);
                    if (checkException == null)
                    {
                        _result = true;
                        int pNewSubAccountID = objCVarA_SubAccounts.ID;
                        //CallCustomizedSP
                        objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "A_SubAccounts", pNewSubAccountID, "AutoInsert");
                        //Set Parent.IsMain=true
                        objCA_SubAccounts.UpdateList("IsMain=1 WHERE ID=" + pSubAccountGroupID.ToString());
                        #region add Details if exists
                        CA_SubAccounts_Details objCA_SubAccounts_Details = new CA_SubAccounts_Details(); //get the parent details
                        checkException = objCA_SubAccounts_Details.GetListPaging(9999, 1, "WHERE SubAccount_ID = " + pSubAccountGroupID.ToString(), "SubAccount_ID", out _RowCount);
                        for (int i = 0; i < objCA_SubAccounts_Details.lstCVarA_SubAccounts_Details.Count; i++)
                        {
                            //this is insert, so i am sure i ve no children to link accounts to, ALSO I don't need to delete because they are new
                            objCCustomizedDBCall.SP_A_SubAccounts_Details("SP_A_SubAccounts_Details", "I", pNewSubAccountID, objCA_SubAccounts_Details.lstCVarA_SubAccounts_Details[i].Account_ID, false);
                        }
                        #endregion add Details if exists
                        //Update Customer SubaccountID
                        objClients.UpdateList("SubAccountID=" + objCVarA_SubAccounts.ID + " WHERE ID=" + objCVarClients.ID);
                    }
                    #endregion Insert
                }
                #endregion Create SubAccount
            }
            return _result;
        }

        // [Route("/api/Line/Delete/{pLineIDs}")]
        [HttpGet, HttpPost]
        public bool Delete(String pClientsIDs)
        {
            bool _result = false;
            CSL_Clients objCLine = new CSL_Clients();
            foreach (var currentID in pClientsIDs.Split(','))
            {
                objCLine.lstDeletedCPKSL_Clients.Add(new CPKSL_Clients() { ID = Int32.Parse(currentID.Trim()) });
            }

            Exception checkException = objCLine.DeleteItem(objCLine.lstDeletedCPKSL_Clients);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("DELETE")) // some or all of the rows were not deleted due to dependencies
                    _result = false;
            }
            else //deleted successfully
                _result = true;
            return _result;
        }
    }
}

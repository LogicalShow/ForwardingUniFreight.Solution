

using Forwarding.MvcApp.Controllers.ReceiptsAndPayments.API_Transactions;
using Forwarding.MvcApp.Controllers.ReceiptsAndPayments.Integration;
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
using MoreLinq;
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
    public class PaymentRequestController : ApiController
    {


        #region PaymentRequest

        [HttpGet, HttpPost]
        public object[] LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned(bool pIsLoadArrayOfObjects, string pLanguage, Int32 pPageNumber, Int32 pPageSize, string pWhereClause, string pOrderBy)
        {
            int _RowCount = 0;
            Exception checkException = null;
            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
            CvwA_PaymentRequest objCvwA_PaymentRequest = new CvwA_PaymentRequest();


            CvwDefaults objCvwDefaults = new CvwDefaults();
            objCvwDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount); //i am sure i ve just one row isa

            string CompanyName = objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName;
            string[] MescoCompanies = new string[5] { "MES", "SAC", "GLO", "EUR", "ALT" };
            bool IsMescoCompany = MescoCompanies.Contains(objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName);

            //Custody
            var CustodyList = objCCustomizedDBCall.ExecuteQuery_ListOfObjects("SELECT ID,Name FROM Custody", typeof(CVarCustody)).Cast<CVarCustody>().ToList();
            //Service Category
            var ServiceCategoryList = objCCustomizedDBCall.ExecuteQuery_ListOfObjects("SELECT ID,Name FROM ChargeTypeGroup", typeof(CVarChargeTypeGroup)).Cast<CVarChargeTypeGroup>().ToList();
            //Payment Combo
            var PaymentCompList = objCCustomizedDBCall.ExecuteQuery_ListOfObjects("SELECT ID,Name FROM A_PaymentRequestPaymentComp", typeof(CVarA_PaymentRequestPaymentComp)).Cast<CVarA_PaymentRequestPaymentComp>().ToList();
            //Cost centers
            var CostCenters = objCCustomizedDBCall.ExecuteQuery_ListOfObjects("SELECT ID,CostCenterNumber,CostCenterName FROM A_CostCenters WHERE IsMain = 0", typeof(CVarA_CostCenters)).Cast<CVarA_CostCenters>().ToList();
            var CostCenterList = CostCenters.Select(c => new
            {
                ID = c.ID,
                Code = c.CostCenterNumber,
                Name = c.CostCenterName
            }).OrderBy(c => c.Name).ThenBy(c => c.Code).ToList();

            //Note Payable
            CvwA_Accounts objCvwA_AccountsNotePayable = new CvwA_Accounts();
            //Treasury & Bank
            CSystemOptions objCSystemOptions = new CSystemOptions();
            CTreasury objCTreasury = new CTreasury();
            CBankAccount objCBankAccount = new CBankAccount();
            //Tax types
            CTaxeTypes objCTaxeTypes = new CTaxeTypes();
            CTaxeTypes objCTaxeTypesDiscount = new CTaxeTypes();
            CvwChargeTypesWithMinimalColumns objCvwChargeTypes = new CvwChargeTypesWithMinimalColumns();
            CNoAccessPartnerTypes objCPartnerTypes = new CNoAccessPartnerTypes();
            CvwA_Accounts objCvwA_Accounts = new CvwA_Accounts();
            CPaymentRequestApprovalLevels objPaymentRequestApprovalLevels = new CPaymentRequestApprovalLevels();
            List<string> _userLevels = objCCustomizedDBCall.ExecuteQuery_Array($"SELECT LevelNo FROM vwA_PaymentRequest_UsersLevel WHERE UserID = {WebSecurity.CurrentUserId}");
            CUsers objCUsers = new CUsers();

            if (pIsLoadArrayOfObjects)
            {
                if (IsMescoCompany)
                {
                    objPaymentRequestApprovalLevels.GetList("WHERE 1=1");
                    objCUsers.GetList($"WHERE ID IN (select distinct CreatorUserID_Request from A_PaymentRequest)");
                }
                objCvwA_AccountsNotePayable.GetList("WHERE IsMain=0 and account_Name like N'%أوراق دفع%' or account_Name like N'%اوراق دفع%'");
                objCSystemOptions.GetList(" WHERE OptionID IN (55,4049) ORDER BY OptionID");  //LinkUserAndSafes & LinkUserAndBanks
                bool UserSafeLink = objCSystemOptions.lstCVarSystemOptions[0].OptionValue;
                bool UserBankLink = objCSystemOptions.lstCVarSystemOptions[1].OptionValue;
                string pSafesWhereClause = " WHERE 1=1 ";
                string pBanksWhereClause = " WHERE 1=1 ";


                if (UserBankLink)
                {
                    pBanksWhereClause = " JOIN VW_Sec_UserBanks UB ON ID =  UB._BankID " + pBanksWhereClause + "  AND UB._UserID=" + WebSecurity.CurrentUserId;
                }
                if (UserSafeLink)
                {
                    pSafesWhereClause = " JOIN VW_Sec_UserSafes USF ON ID =  USF._SafeID " + pSafesWhereClause + "  AND USF._UserID=" + WebSecurity.CurrentUserId;
                }

                objCTreasury.GetListPaging(9999, 1, pSafesWhereClause, "Name", out _RowCount);
                objCBankAccount.GetListPaging(9999, 1, pBanksWhereClause, "Name", out _RowCount);

                objCTaxeTypes.GetListPaging(999999, 1, " where 1 = 1 and isnull(IsDiscount,0)=0", " Name ", out _RowCount);
                objCTaxeTypesDiscount.GetListPaging(999999, 1, " where 1 = 1 and isnull(IsDiscount,0)=1", " Name ", out _RowCount);



                string pWhereClauseWithMinimalColumns = "WHERE 1=1 ";
                objCvwChargeTypes.GetListPaging(999999, 1, pWhereClauseWithMinimalColumns, "Name", out _RowCount);

                if (IsMescoCompany)
                {
                    objCPartnerTypes.GetList("where id not in(1,20) ORDER BY Code");
                }
                else
                {
                    objCPartnerTypes.GetList("where id not in(1,6,20) ORDER BY Code");
                }

                if (CompanyName != "COS")
                {
                    objCvwA_Accounts.GetListPaging(9999, 1, "WHERE IsMain=0", "Name, Code", out _RowCount);
                }
            }

            //Custody
            //var OperationList = objCCustomizedDBCall.ExecuteQuery_ListOfObjects("SELECT ID,Code FROM Operations WHERE Code IS NOT NULL", typeof(CVarOperations)).Cast<CVarOperations>().ToList();
            //var OperationListSimplified = OperationList.Select(o => new
            //{
            //    ID = o.ID,
            //    Code = o.Code
            //}).ToList();
            checkException = objCvwA_PaymentRequest.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {serializer.Serialize(objCvwA_PaymentRequest.lstCVarvwA_PaymentRequest)//pData[0]
            ,_RowCount //pData[1]
            ,serializer.Serialize(CustodyList) //pData[2]
            ,serializer.Serialize(ServiceCategoryList) //pData[3]
            ,serializer.Serialize(PaymentCompList) //pData[4]
            ,serializer.Serialize(CostCenterList) //pData[5]
            , serializer.Serialize(objCvwA_AccountsNotePayable.lstCVarvwA_Accounts)//pData[6]
            , serializer.Serialize(objCTreasury.lstCVarTreasury)//pData[7]
            , serializer.Serialize(objCBankAccount.lstCVarBankAccount)//pData[8]
            , serializer.Serialize(objCTaxeTypes.lstCVarTaxeTypes)//pData[9]
            , serializer.Serialize(objCTaxeTypesDiscount.lstCVarTaxeTypes)//pData[10]
            ,serializer.Serialize(objCvwChargeTypes.lstCVarvwChargeTypesWithMinimalColumns)//pData[11]
            ,serializer.Serialize(objCPartnerTypes.lstCVarNoAccessPartnerTypes)//pData[12]
            ,serializer.Serialize(objCvwA_Accounts.lstCVarvwA_Accounts)//pData[13]
            ,null //serializer.Serialize(OperationListSimplified)//pData[14]
            ,serializer.Serialize(objPaymentRequestApprovalLevels.lstCVarPaymentRequestApprovalLevels) //pData[15]
            ,serializer.Serialize(_userLevels) //pData[16]
            ,serializer.Serialize(objCUsers.lstCVarUsers) //pData[17]
            };
        }

        [HttpGet, HttpPost]
        public object[] LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned_Old(bool pIsLoadArrayOfObjects, string pLanguage, Int32 pPageNumber, Int32 pPageSize, string pWhereClause, string pOrderBy)
        {
            int _RowCount = 0;
            Exception checkException = null;
            CDefaults objCDefaults = new CDefaults();
            objCDefaults.GetListPaging(999999, 1, "WHERE 1=1", "ID", out _RowCount);

            CvwA_PaymentRequest objCvwA_PaymentRequest = new CvwA_PaymentRequest();
            CvwCustody objCvwCustody = new CvwCustody();
            // CvwOperationPartners objCvwOperationPartners = new CvwOperationPartners();
            CvwAccPartners objCvwAccPartners = new CvwAccPartners();

            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
            List<CVarvwOperationsWithMinimalColumns> OperationList = new List<CVarvwOperationsWithMinimalColumns>();

            #region Filter operations according to the linked services and salesmen with the current logged user
            List<string> MescoCompanies = new List<string> { "MES", "ALT", "GLO", "EUR", "SAC" };
            CcrmUserSalesmen objCcrmUserSalesmen = new CcrmUserSalesmen();
            objCcrmUserSalesmen.GetList("WHERE UserID = " + WebSecurity.CurrentUserId);
            string UserSalesmenIDs = string.Join(",", objCcrmUserSalesmen.lstCVarcrmUserSalesmen.Select(x => x.SalesmanID).ToList());
            CcrmUserServices objCcrmUserServices = new CcrmUserServices();
            objCcrmUserServices.GetList("WHERE UserID = " + WebSecurity.CurrentUserId);
            string UserServicesIDs = string.Join(",", objCcrmUserServices.lstCVarcrmUserServices.Select(x => x.ServiceID).ToList());
            string pMescoWhereClauseForOperationCombo = $"WHERE (CreatorUserID = {WebSecurity.CurrentUserId} OR (SalesmanID IN ({UserSalesmenIDs}) AND ServiceID IN ({UserServicesIDs})))";
            #endregion Filter Operations according to the linked services and salesmen with the current logged user

            string PaymentRequestCreatorID = objCCustomizedDBCall.CallStringFunction("SELECT top 1 CreatorUserID_Request FROM A_PaymentRequest " + pWhereClause);

            var constOperationsFormID = 29;//OperationsManagement
            string pWhereClauseForCombo = "WHERE 1=1 ";
            CvwUserForms objCvwUserForms = new CvwUserForms();
            objCvwUserForms.GetList("WHERE UserID=" + WebSecurity.CurrentUserId.ToString() + " AND FormID=" + constOperationsFormID.ToString());
            bool _IsHideOthersRecords = objCvwUserForms.lstCVarvwUserForms[0].HideOthersRecords;
            if (_IsHideOthersRecords)
                pWhereClauseForCombo += " AND CreatorUserID=" + WebSecurity.CurrentUserId;

            CvwOperationsWithMinimalColumns objCvwOperations = new CvwOperationsWithMinimalColumns();
            CvwOperationByCustudy objCvwOperationByCustudy = new CvwOperationByCustudy();


            CvwA_PaymentRequestHouse objCvwA_PaymentRequestHouse = new CvwA_PaymentRequestHouse();
            CvwA_PaymentRequestCertificateNumber objCvwA_PaymentRequestCertificateNumber = new CvwA_PaymentRequestCertificateNumber();
            CvwA_PaymentRequestTruckingOrder objCCvwA_PaymentRequestTruckingOrder = new CvwA_PaymentRequestTruckingOrder();



            string pWhereClauseWithMinimalColumns = "WHERE 1=1 ";
            CUsers objCUsers = new CUsers();
            CUsers objCUsers2 = new CUsers();
            objCUsers.GetListPaging(999999, 1, "WHERE ID=" + WebSecurity.CurrentUserId, "ID", out _RowCount);
            if (!objCUsers.lstCVarUsers[0].IsAccessAllCharges)
            {
                if (PaymentRequestCreatorID == "")
                {
                    pWhereClauseWithMinimalColumns += " AND ID IN (SELECT DISTINCT ChargeTypeID FROM DepartmentCharge WHERE DepartmentID=" + objCUsers.lstCVarUsers[0].DepartmentID + ") \n";
                }
                else
                {
                    objCUsers2.GetListPaging(999999, 1, "WHERE ID=" + PaymentRequestCreatorID, "ID", out _RowCount);

                    pWhereClauseWithMinimalColumns += " AND ID IN (SELECT DISTINCT ChargeTypeID FROM DepartmentCharge WHERE DepartmentID=" + objCUsers.lstCVarUsers[0].DepartmentID + " OR DepartmentID=" + objCUsers2.lstCVarUsers[0].DepartmentID + ") \n";

                }

            }

            CvwChargeTypesWithMinimalColumns objCvwChargeTypes = new CvwChargeTypesWithMinimalColumns();


            string IsAccessAllCharges = objCCustomizedDBCall.CallStringFunction(" SELECT u.IsAccessAllCharges FROM Users AS u WHERE u.ID =  " + WebSecurity.CurrentUserId);
            string pWhereClauseOp = "";
            string pWhereClauseHouse = "";
            CvwDefaults objCvwDefaults = new CvwDefaults();
            objCvwDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount); //i am sure i ve just one row isa

            string CompanyName = objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName;


            if (IsAccessAllCharges == "False")
            {
                string PartenerID = objCCustomizedDBCall.CallStringFunction("SELECT c.ID FROM Custody AS c WHERE c.UserID = " + WebSecurity.CurrentUserId);
                if (PaymentRequestCreatorID != "")
                {
                    string PartenerID2 = objCCustomizedDBCall.CallStringFunction("SELECT c.ID FROM Custody AS c WHERE c.UserID = " + PaymentRequestCreatorID);
                    pWhereClauseOp = "  AND (  PartnerID = " + PartenerID + " Or PartnerID = " + PartenerID2 + ")";
                }
                else
                {
                    pWhereClauseOp = "  AND PartnerID=" + PartenerID;
                }
                pWhereClauseHouse = " AND PartnerID = " + PartenerID;
            }
            if (pIsLoadArrayOfObjects)
            {
                objCvwChargeTypes.GetListPaging(999999, 1, pWhereClauseWithMinimalColumns, "Name", out _RowCount);
                objCvwCustody.GetList("WHERE 1=1");
                //objCvwOperations.GetListPaging(999999, 1, (pWhereClauseForCombo + " AND Code IS NOT NULL  AND ID IN (SELECT vo.ID FROM vwOperations AS vo WHERE vo.OperationStageName LIKE '%OPEN%')"), pOrderBy, out _RowCount);
                //objCvwAccPartners.GetListPaging(10000, 1, "WHERE PartnerTypeID=8", "Name", out _RowCount);

                objCvwA_PaymentRequestCertificateNumber.GetListPaging(999999, 1, (pWhereClauseForCombo + " AND Name IS NOT NULL"), pOrderBy, out _RowCount);
                objCCvwA_PaymentRequestTruckingOrder.GetListPaging(999999, 1, (pWhereClauseForCombo + " AND Name IS NOT NULL"), pOrderBy, out _RowCount);

                if (CompanyName == "NEW")
                {
                    if (IsAccessAllCharges == "True")
                    {
                        objCvwOperations.GetListPaging(999999, 1, (pWhereClauseForCombo + " AND Code IS NOT NULL"), pOrderBy, out _RowCount);
                        objCvwA_PaymentRequestHouse.GetListPaging(999999, 1, (pWhereClauseForCombo + "AND NAME IS NOT NULL AND MasterOperationID IS NOT null  " + pWhereClauseHouse), pOrderBy, out _RowCount); // AND CreatorUserID = " + WebSecurity.CurrentUserId

                    }
                    else
                    {
                        objCvwA_PaymentRequestHouse.GetListPaging(999999, 1, (pWhereClauseForCombo + "AND NAME IS NOT NULL AND MasterOperationID IS NOT null  " + pWhereClauseHouse), pOrderBy, out _RowCount); // AND CreatorUserID = " + WebSecurity.CurrentUserId
                        //objCvwOperationByCustudy.GetListPaging(99999, 1, (pWhereClauseForCombo + " AND PartnerTypeID=20  " + pWhereClauseOp), "ID DESC", out _RowCount); // AND CreatorUserID = " + WebSecurity.CurrentUserId

                        if (PaymentRequestCreatorID != "")
                        {
                            objCvwOperationByCustudy.GetListPaging(99999, 1, (pWhereClauseForCombo + " AND PartnerTypeID=20  " + pWhereClauseOp), "ID DESC", out _RowCount); // AND CreatorUserID = " + WebSecurity.CurrentUserId

                        }
                        else
                        {
                            objCvwOperationByCustudy.GetListPaging(99999, 1, (pWhereClauseForCombo + " AND PartnerTypeID=20  " + pWhereClauseOp), "ID DESC", out _RowCount); // AND CreatorUserID = " + WebSecurity.CurrentUserId
                        }
                    }

                }
                else
                {
                    //OperationList = objCCustomizedDBCall.ExecuteQuery_ListOfObjects("SELECT ID,Code,VesselName,ActualArrivalString FROM vwOperationsWithMinimalColumns " + (MescoCompanies.Contains(CompanyName) ? pMescoWhereClauseForOperationCombo : pWhereClauseForCombo) + " AND Code IS NOT NULL ORDER BY ID DESC", typeof(CVarvwOperationsWithMinimalColumns)).Cast<CVarvwOperationsWithMinimalColumns>().ToList();
                    OperationList = new List<CVarvwOperationsWithMinimalColumns>();
                    //objCvwOperations.GetList(pWhereClauseForCombo + " AND Code IS NOT NULL");
                    objCvwA_PaymentRequestHouse.GetListPaging(999999, 1, (pWhereClauseForCombo + "AND NAME IS NOT NULL AND MasterOperationID IS NOT null  "), pOrderBy, out _RowCount); // AND CreatorUserID = " + WebSecurity.CurrentUserId
                }
            }

            CChargeTypeGroup objCChargeTypeGroup = new CChargeTypeGroup();
            objCChargeTypeGroup.GetListPaging(9999, 1, "WHERE 1=1", "ID", out _RowCount); //i am sure i ve just one row isa


            CNoAccessPartnerTypes objCNoAccessPartnerTypes = new CNoAccessPartnerTypes();
            objCNoAccessPartnerTypes.GetList(" WHERE 1=1 ");
            //pWhereClause = " where 1= 1 ";


            CA_PaymentRequestPaymentComp objA_PaymentRequestPaymentComp = new CA_PaymentRequestPaymentComp();
            objA_PaymentRequestPaymentComp.GetList(" WHERE 1=1 ");

            CvwA_Accounts objCvwA_Accounts = new CvwA_Accounts();
            CvwA_Accounts objCvwA_AccountsNotePayable = new CvwA_Accounts();

            CvwA_CostCenters objCvwA_CostCenters = new CvwA_CostCenters();
            CNoAccessPartnerTypes objCPartnerTypes = new CNoAccessPartnerTypes();
            CTaxeTypes objCTaxeTypes = new CTaxeTypes();
            CTaxeTypes objCTaxeTypesDiscount = new CTaxeTypes();


            CTreasury objCTreasury = new CTreasury();
            CBankAccount objCBankAccount = new CBankAccount();
            if (CompanyName == "MES")
            {
                //LinkUserAndSafes
                CSystemOptions objCSystemOptions = new CSystemOptions();
                //objCSystemOptions.GetItem(55);
                objCSystemOptions.GetList(" WHERE OptionID IN (55,4049) ORDER BY OptionID");  //LinkUserAndSafes & LinkUserAndBanks
                bool UserSafeLink = objCSystemOptions.lstCVarSystemOptions[0].OptionValue;
                bool UserBankLink = objCSystemOptions.lstCVarSystemOptions[1].OptionValue;
                string pSafesWhereClause = " WHERE 1=1 ";
                string pBanksWhereClause = " WHERE 1=1 ";
                if (UserBankLink)
                {
                    //pWhereClause = " INNER JOIN VW_Sec_UserBanks UB ON BankID = UB._BankID " + pWhereClause + " AND UB._UserID=" + WebSecurity.CurrentUserId;
                    pBanksWhereClause = " JOIN VW_Sec_UserBanks UB ON ID =  UB._BankID " + pBanksWhereClause + "  AND UB._UserID=" + WebSecurity.CurrentUserId;
                }
                if (UserSafeLink)
                {
                    //pWhereClause = " INNER JOIN VW_Sec_UserSafes US ON SafeID = US._SafeID " + pWhereClause + " AND US._UserID=" + WebSecurity.CurrentUserId;
                    pSafesWhereClause = " JOIN VW_Sec_UserSafes USF ON ID =  USF._SafeID " + pSafesWhereClause + "  AND USF._UserID=" + WebSecurity.CurrentUserId;
                }

                objCTreasury.GetListPaging(9999, 1, pSafesWhereClause, "Name", out _RowCount);
                objCBankAccount.GetListPaging(9999, 1, pBanksWhereClause, "Name", out _RowCount);
            }



            objCvwA_CostCenters.GetListPaging(9999, 1, "WHERE IsMain=0", "Name, Code", out _RowCount);


            if (CompanyName != "COS")
            {
                objCvwA_Accounts.GetListPaging(9999, 1, "WHERE IsMain=0", "Name, Code", out _RowCount);
                objCPartnerTypes.GetList("where id not in(1,6,20) ORDER BY Code");
                objCTaxeTypes.GetListPaging(999999, 1, " where 1 = 1 and isnull(IsDiscount,0)=0", " Name ", out _RowCount);
                objCTaxeTypesDiscount.GetListPaging(999999, 1, " where 1 = 1 and isnull(IsDiscount,0)=1", " Name ", out _RowCount);
            }
            if (CompanyName == "MES" || CompanyName == "TRM")
            {
                objCvwA_AccountsNotePayable.GetList("WHERE IsMain=0 and account_Name like N'%أوراق دفع%' or account_Name like N'%اوراق دفع%'");

            }
            checkException = objCvwA_PaymentRequest.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };

            if (CompanyName == "NEW")
            {
                if (IsAccessAllCharges == "True")
                {
                    return new object[] {serializer.Serialize(objCvwA_PaymentRequest.lstCVarvwA_PaymentRequest)//pData[0]
                        ,_RowCount //pData[1]
                        ,(CompanyName == "COS" || CompanyName == "ELI")? serializer.Serialize(objCvwCustody.lstCVarvwCustody) : serializer.Serialize(objCvwCustody.lstCVarvwCustody)   //pData[2]
                        ,serializer.Serialize(objCvwOperations.lstCVarvwOperationsWithMinimalColumns)//pData[3]}
                        ,serializer.Serialize(objCvwChargeTypes.lstCVarvwChargeTypesWithMinimalColumns)//pData[4]
                        ,serializer.Serialize(objCvwA_PaymentRequestHouse.lstCVarvwA_PaymentRequestHouse)//pData[5]
                        ,serializer.Serialize(objCvwA_PaymentRequestCertificateNumber.lstCVarvwA_PaymentRequestCertificateNumber)//pData[6]
                        ,serializer.Serialize(objCCvwA_PaymentRequestTruckingOrder.lstCVarvwA_PaymentRequestTruckingOrder)//pData[6]
                        ,serializer.Serialize(objCNoAccessPartnerTypes.lstCVarNoAccessPartnerTypes)//pData[7]
                        ,serializer.Serialize(objCChargeTypeGroup.lstCVarChargeTypeGroup)//pData[8]
                        ,serializer.Serialize(objA_PaymentRequestPaymentComp.lstCVarA_PaymentRequestPaymentComp)//pData[9]


                    };
                }
                else
                {
                    return new object[] {serializer.Serialize(objCvwA_PaymentRequest.lstCVarvwA_PaymentRequest)//pData[0]
                        ,_RowCount //pData[1]
                        ,(CompanyName == "COS" || CompanyName == "ELI") ? serializer.Serialize(objCvwCustody.lstCVarvwCustody) : serializer.Serialize(objCvwCustody.lstCVarvwCustody)//pData[2]
                        ,serializer.Serialize(objCvwOperationByCustudy.lstCVarvwOperationByCustudy)//pData[3]}
                        ,serializer.Serialize(objCvwChargeTypes.lstCVarvwChargeTypesWithMinimalColumns)//pData[4]
                        ,serializer.Serialize(objCvwA_PaymentRequestHouse.lstCVarvwA_PaymentRequestHouse)//pData[5]
                        ,serializer.Serialize(objCvwA_PaymentRequestCertificateNumber.lstCVarvwA_PaymentRequestCertificateNumber)//pData[6]
                        ,serializer.Serialize(objCCvwA_PaymentRequestTruckingOrder.lstCVarvwA_PaymentRequestTruckingOrder)//pData[6]
                        ,serializer.Serialize(objCNoAccessPartnerTypes.lstCVarNoAccessPartnerTypes)//pData[7]
                        ,serializer.Serialize(objCChargeTypeGroup.lstCVarChargeTypeGroup)//pData[8]
                         ,serializer.Serialize(objA_PaymentRequestPaymentComp.lstCVarA_PaymentRequestPaymentComp)//pData[9]

                    };
                }


            }
            else
            {
                return new object[] {serializer.Serialize(objCvwA_PaymentRequest.lstCVarvwA_PaymentRequest)//pData[0]
                ,_RowCount //pData[1]
                ,(CompanyName == "COS" || CompanyName == "ELI") ? serializer.Serialize(objCvwCustody.lstCVarvwCustody) : serializer.Serialize(objCvwCustody.lstCVarvwCustody)//pData[2]
                //,serializer.Serialize(objCvwOperations.lstCVarvwOperationsWithMinimalColumns)//pData[3]}
                ,serializer.Serialize(OperationList)//pData[3]}
                ,serializer.Serialize(objCvwChargeTypes.lstCVarvwChargeTypesWithMinimalColumns)//pData[4]
                ,serializer.Serialize(objCvwA_PaymentRequestHouse.lstCVarvwA_PaymentRequestHouse)//pData[5]
                ,serializer.Serialize(objCvwA_PaymentRequestCertificateNumber.lstCVarvwA_PaymentRequestCertificateNumber)//pData[6]
                ,serializer.Serialize(objCCvwA_PaymentRequestTruckingOrder.lstCVarvwA_PaymentRequestTruckingOrder)//pData[6]
                ,serializer.Serialize(objCNoAccessPartnerTypes.lstCVarNoAccessPartnerTypes)//pData[7]
                ,serializer.Serialize(objCChargeTypeGroup.lstCVarChargeTypeGroup)//pData[8]
                ,serializer.Serialize(objA_PaymentRequestPaymentComp.lstCVarA_PaymentRequestPaymentComp)//pData[10]
                ,serializer.Serialize(objCvwA_Accounts.lstCVarvwA_Accounts)//pData[11]

                ,serializer.Serialize(objCvwA_CostCenters.lstCVarvwA_CostCenters)//pData[12]
                ,serializer.Serialize(objCPartnerTypes.lstCVarNoAccessPartnerTypes)//pData[13]
                 , serializer.Serialize(objCTaxeTypes.lstCVarTaxeTypes)//pData[14]
                 , serializer.Serialize(objCTaxeTypesDiscount.lstCVarTaxeTypes)//pData[15]
                 , serializer.Serialize(objCvwA_AccountsNotePayable.lstCVarvwA_Accounts)//pData[16]
                 , serializer.Serialize(objCTreasury.lstCVarTreasury)//pData[17]
                 , serializer.Serialize(objCBankAccount.lstCVarBankAccount)//pData[18]







            };
            }
        }
        [HttpGet, HttpPost]
        public object[] GetBankAndSafeByCurrency(Int32 pPaymentRequestID)
        {
            int _RowCount = 0;

            CA_PaymentRequest objPaymentRequest = new CA_PaymentRequest();
            objPaymentRequest.GetList("where id=" + pPaymentRequestID);
            CTreasury objCTreasury = new CTreasury();
            CBankAccount objCBankAccount = new CBankAccount();
            CvwA_LiknkAccountNotePayapleWithCurrency objCvwA_LiknkAccountNotePayapleWithCurrency = new CvwA_LiknkAccountNotePayapleWithCurrency();


            //LinkUserAndSafes
            CSystemOptions objCSystemOptions = new CSystemOptions();
            //objCSystemOptions.GetItem(55);
            objCSystemOptions.GetList(" WHERE OptionID IN (55,4049) ORDER BY OptionID");  //LinkUserAndSafes & LinkUserAndBanks
            bool UserSafeLink = objCSystemOptions.lstCVarSystemOptions[0].OptionValue;
            bool UserBankLink; //objCSystemOptions.lstCVarSystemOptions[1].OptionValue;
            string pSafesWhereClause = " WHERE 1=1 and DefaultCurrencyID=" + (objPaymentRequest.lstCVarA_PaymentRequest.Count > 0 ? objPaymentRequest.lstCVarA_PaymentRequest[0].CurrencyID : 0);
            string pBanksWhereClause = " WHERE 1=1 and DefaultCurrencyID=" + (objPaymentRequest.lstCVarA_PaymentRequest.Count > 0 ? objPaymentRequest.lstCVarA_PaymentRequest[0].CurrencyID : 0);
            string pNotePayableWhereClause = " WHERE IsMain=0 and account_Name like N'%أوراق دفع%' or account_Name like N'%اوراق دفع%' and CurrencyID=" + (objPaymentRequest.lstCVarA_PaymentRequest.Count > 0 ? objPaymentRequest.lstCVarA_PaymentRequest[0].CurrencyID : 0);

            //if (UserBankLink)
            //{
            //    pWhereClause = " INNER JOIN VW_Sec_UserBanks UB ON BankID = UB._BankID " + pWhereClause + " AND UB._UserID=" + WebSecurity.CurrentUserId;
            //    pBanksWhereClause = " JOIN VW_Sec_UserBanks UB ON ID =  UB._BankID " + pBanksWhereClause + "  AND UB._UserID=" + WebSecurity.CurrentUserId;
            //}
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

        [HttpGet, HttpPost]
        public object[] GetAccountDetails(Int32 pPageNumber, Int32 pPageSize, string pWhereClauseJournalVoucherDetails, string pOrderBy, string pWhereClauseCurrencyDetails)
        {
            int _RowCount = 0;
            CvwA_PaymentRequestAccount objCA_PaymentRequestAccount = new CvwA_PaymentRequestAccount();

            objCA_PaymentRequestAccount.GetListPaging(pPageSize, pPageNumber, pWhereClauseJournalVoucherDetails, "ID", out _RowCount);
            return new object[] {
                new JavaScriptSerializer().Serialize(objCA_PaymentRequestAccount.lstCVarvwA_PaymentRequestAccount)
                , _RowCount

            };
        }
        [HttpGet, HttpPost]
        public object[] FillCombo(Int32 PoperationID, Int32 ptype, string pOrderBy)
        {
            int _RowCount = 0;
            Exception checkException = null;
            CvwDefaults objCvwDefaults = new CvwDefaults();
            objCvwDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount); //i am sure i ve just one row isa

            string CompanyName = objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName;


            CvwA_PaymentRequestHouse objCvwA_PaymentRequestHouse = new CvwA_PaymentRequestHouse();
            CvwA_PaymentRequestCertificateNumber objCvwA_PaymentRequestCertificateNumber = new CvwA_PaymentRequestCertificateNumber();
            CvwA_PaymentRequestTruckingOrder objCCvwA_PaymentRequestTruckingOrder = new CvwA_PaymentRequestTruckingOrder();
            CvwA_PaymentRequestOperationContainersAndPackages objCCvwA_PaymentRequestOperationContainersAndPackages = new CvwA_PaymentRequestOperationContainersAndPackages();


            if (ptype == 1)
            {
                if (PoperationID == 0)
                {
                    objCvwA_PaymentRequestHouse.GetListPaging(999999, 1, ("where MasterOperationID IS NOT NULL"), pOrderBy, out _RowCount);
                }
                else
                {
                    objCvwA_PaymentRequestHouse.GetListPaging(999999, 1, ("where MasterOperationID = " + PoperationID), pOrderBy, out _RowCount);
                }


                var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
                return new object[] {
                 serializer.Serialize(objCvwA_PaymentRequestHouse.lstCVarvwA_PaymentRequestHouse)//pData[0]
                };
            }
            else if (ptype == 2)
            {
                if (PoperationID == 0)
                {
                    if (CompanyName=="MES")
                    {
                        objCCvwA_PaymentRequestOperationContainersAndPackages.GetListPaging(999999, 1, ("where 1=1"), pOrderBy, out _RowCount);

                    }
                    else
                    {
                        objCvwA_PaymentRequestCertificateNumber.GetListPaging(999999, 1, ("where 1=1"), pOrderBy, out _RowCount);

                    }
                }
                else
                {
                    if (CompanyName == "MES")
                    {
                        objCCvwA_PaymentRequestOperationContainersAndPackages.GetListPaging(999999, 1, ("where OperationID = " + PoperationID), pOrderBy, out _RowCount);

                    }
                    else
                    {
                        objCvwA_PaymentRequestCertificateNumber.GetListPaging(999999, 1, ("where OperationID = " + PoperationID), pOrderBy, out _RowCount);

                    }
                }

                var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
                return new object[] {
                 serializer.Serialize(objCvwA_PaymentRequestCertificateNumber.lstCVarvwA_PaymentRequestCertificateNumber)//pData[0]
                };

            }
            else if (ptype == 3)
            {
                if (PoperationID == 0)
                {
                    if (CompanyName == "MES")
                    {
                        objCCvwA_PaymentRequestOperationContainersAndPackages.GetListPaging(999999, 1, ("where 1=1"), pOrderBy, out _RowCount);

                    }
                    else
                    {
                        objCCvwA_PaymentRequestTruckingOrder.GetListPaging(999999, 1, ("where 1=1"), pOrderBy, out _RowCount);

                    }
                }
                else
                {
                    if (CompanyName == "MES")
                    {
                        objCCvwA_PaymentRequestOperationContainersAndPackages.GetListPaging(999999, 1, ("where OperationID = " + PoperationID), pOrderBy, out _RowCount);

                    }
                    else
                    {
                        objCCvwA_PaymentRequestTruckingOrder.GetListPaging(999999, 1, ("where OperationID = " + PoperationID), pOrderBy, out _RowCount);

                    }
                }

                var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
                return new object[] {
                 CompanyName == "MES" ? serializer.Serialize(objCCvwA_PaymentRequestOperationContainersAndPackages.lstCVarvwA_PaymentRequestOperationContainersAndPackages): serializer.Serialize(objCCvwA_PaymentRequestTruckingOrder.lstCVarvwA_PaymentRequestTruckingOrder)//pData[0]
                };
            }
            else
            {
                var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
                return new object[] {
                _RowCount //pData[1]
                };
            }


        }
        [HttpGet, HttpPost]
        public Object[] GetOperationID(string TransID, Int32 ptype)
        {
            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
            string OperationID = "0";
            if (ptype == 1)
            {
                OperationID = objCCustomizedDBCall.CallStringFunction("SELECT TOP 1 o.MasterOperationID FROM Operations AS o WHERE  o.MasterOperationID IS NOT NULL AND o.ID = " + TransID);
            }
            else if (ptype == 2)
            {
                OperationID = objCCustomizedDBCall.CallStringFunction("SELECT TOP 1 R.OperationID FROM Routings AS r WHERE r.RoutingTypeID=70 AND r.ID= " + TransID);
            }
            else if (ptype == 3)
            {
                OperationID = objCCustomizedDBCall.CallStringFunction("SELECT TOP 1 R.OperationID FROM Routings AS r WHERE r.RoutingTypeID=60 AND r.ID= " + TransID);

            }

            return new Object[] { OperationID };

        }
        [HttpGet, HttpPost]
        public Object[] GetCustudy()
        {
            CvwCustody objCvwCustody = new CvwCustody();
            objCvwCustody.GetList("WHERE 1=1");

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                serializer.Serialize(objCvwCustody.lstCVarvwCustody)//pData[2]
               
            };

        }
        [HttpGet, HttpPost]
        public Object[] GetIssuedToBySupplier(Int32 pPartnerID)
        {
            CvwContacts objCvwContacts = new CvwContacts();
            objCvwContacts.GetList("WHERE PartnerID=" + pPartnerID);

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                serializer.Serialize(objCvwContacts.lstCVarvwContacts)//pData[2]
               
            };

        }
        [HttpGet, HttpPost]
        public Object[] GetUserIDFromCustudy()
        {
            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
            string CustudyID = "0";

            CustudyID = objCCustomizedDBCall.CallStringFunction("SELECT TOP 1 c.ID FROM Custody AS c WHERE c.UserID = " + WebSecurity.CurrentUserId);


            return new Object[] { CustudyID };

        }
        [HttpGet, HttpPost]
        public object[] Save([FromBody] PaymentRequestData paymentRequestData)
        {
            string pMessageReturned = "";
            Exception checkException = null;

            CA_PaymentRequest objCA_PaymentRequest = new CA_PaymentRequest();
            CA_PaymentRequestDetails objCA_PaymentRequestDetails = new CA_PaymentRequestDetails();


            CVarA_PaymentRequest objCVarA_PaymentRequest = new CVarA_PaymentRequest();
            CA_PaymentRequest objCA_PaymentRequestExists = new CA_PaymentRequest();
            CA_AccreditationMovement objCA_AccreditationMovement = new CA_AccreditationMovement();
            CCustomizedDBCall objCPaymentsCustomizedDBCall = new CCustomizedDBCall();

            CvwDefaults objCvwDefaults = new CvwDefaults();
            Int32 _RowCount2 = 0;
            objCvwDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount2); //i am sure i ve just one row isa

            string CompanyName = objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName;
            string[] MescoCompanies = new string[5] { "MES", "SAC", "GLO", "EUR", "ALT" };
            bool IsMescoCompany = MescoCompanies.Contains(CompanyName);

            if (IsMescoCompany && paymentRequestData.pPayableIDList != "")
            {
                CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
                DataTable dtdata = objCCustomizedDBCall.ExecuteQuery_DataTable(@"select Ct.Name from Operations O join Payables P on P.OperationID = O.ID  join ChargeTypes CT on CT.ID = P.ChargeTypeID
                where Not Exists(select 1 from ChargeTypeAccounts cha where cha.ChargeTypeID = P.ChargeTypeID
                and cha.DirectionID = O.DirectionType
                 and cha.ServiceID = case WHEN O.TransportType = 2 THEN 3 --AIR
                WHEN O.TransportType = 1 AND O.ShipmentType = 1 THEN 1 --FCL
                WHEN O.TransportType = 1 AND O.ShipmentType IN(2, 5) THEN 2
                WHEN O.TransportType = 3 THEN 5 --Inland                
                WHEN O.DirectionType = 3 THEN 4 end --Domestic
                and cha.CategoryID = P.CategoryID and cha.ExpenseAccountID IS NOT NULL and cha.RevenueCostCenterID IS NOT NULL) And P.ID in (" + paymentRequestData.pPayableIDList + ")");

                if (dtdata.Rows.Count > 0)
                {
                    pMessageReturned += "Link account for charges ";
                    for (int i = 0; i < dtdata.Rows.Count; i++)
                    {
                        pMessageReturned += dtdata.Rows[i]["Name"].ToString() + " - ";
                    }
                    return new object[] { pMessageReturned };
                }

                if(pMessageReturned == "")
                {
                    var checkNote = new CPayables();
                    checkNote.GetList($"WHERE ID IN ({paymentRequestData.pPayableIDList}) and isnull(AccNoteID,0)>0");
                    if(checkNote.lstCVarPayables.Count > 0)
                    {
                        pMessageReturned = "Check Payables is not in Credit Notes";
                        return new object[] { pMessageReturned };
                    }
                }
            }

            int NumberOfDetailsCheck = paymentRequestData.pIDList.Split(',').Length;
            bool FilterChargeType;
            ArrayList arr = new ArrayList();
            CPayables objCPayables = new CPayables();

            for (int i = 0; i < NumberOfDetailsCheck; i++)
            {
                if (paymentRequestData.pIDList.Split(',')[i].ToString() != "")
                {

                    FilterChargeType = Convert.ToBoolean(paymentRequestData.pFilterChargeTypesList.Split(',')[i]);

                    if (FilterChargeType)
                    {

                        objCPayables.GetList("Where ChargeTypeID= " + paymentRequestData.pChargeTypeList.Split(',')[i] + " And OperationID = " + paymentRequestData.pOperationList.Split(',')[i]);
                    }

                }
            }

            //string code  = objCPaymentsCustomizedDBCall.CallStringFunction("SELECT TOP 1 code+1  FROM A_PaymentRequest AS apr WHERE CreatorUserID_Request = "+ WebSecurity.CurrentUserId + " ORDER BY apr.Code DESC " );

            //Log First Step
            CA_PaymentRequestLog objCA_PaymentRequestLog = new CA_PaymentRequestLog();
            CVarA_PaymentRequestLog objCVarA_PaymentRequestLog = new CVarA_PaymentRequestLog();

            if (paymentRequestData.pPaymentRequestID != 0)
               objCVarA_PaymentRequestLog.Trans_Type = "U";
            else
                objCVarA_PaymentRequestLog.Trans_Type = "I";

            if (paymentRequestData.pPaymentRequestID != 0)
            {
                objCA_PaymentRequestExists.GetList(" Where ID = " + paymentRequestData.pPaymentRequestID);
                if (objCA_PaymentRequestExists.lstCVarA_PaymentRequest.Count > 0)
                {
                    objCVarA_PaymentRequest.IsApprovedRequest = objCA_PaymentRequestExists.lstCVarA_PaymentRequest[0].IsApprovedRequest;
                    if (objCA_PaymentRequestExists.lstCVarA_PaymentRequest[0].CreatorUserID_Settlement > 0 && objCA_PaymentRequestExists.lstCVarA_PaymentRequest[0].CreatorUserID_Settlement != null)
                        objCVarA_PaymentRequest.CreatorUserID_Settlement = objCA_PaymentRequestExists.lstCVarA_PaymentRequest[0].CreatorUserID_Settlement;
                    else
                        objCVarA_PaymentRequest.CreatorUserID_Settlement = WebSecurity.CurrentUserId;
                    objCVarA_PaymentRequest.ModificatorUserID_Request = WebSecurity.CurrentUserId;
                    objCVarA_PaymentRequest.ModificatorUserID_Settlement = WebSecurity.CurrentUserId;
                    objCVarA_PaymentRequest.VoucherID = objCA_PaymentRequestExists.lstCVarA_PaymentRequest[0].VoucherID;
                    objCVarA_PaymentRequest.CreatorUserID_Request = objCA_PaymentRequestExists.lstCVarA_PaymentRequest[0].CreatorUserID_Request;
                }
            }
            objCVarA_PaymentRequest.ID = paymentRequestData.pPaymentRequestID;
            objCVarA_PaymentRequest.Code = paymentRequestData.pCode;
            objCVarA_PaymentRequest.IsCheck = paymentRequestData.pIsCheck;
            objCVarA_PaymentRequest.isDiff = paymentRequestData.pisDiff;
            objCVarA_PaymentRequest.IsDirect = paymentRequestData.pIsDirect;

            if (paymentRequestData.pPaymentRequestID == 0 && paymentRequestData.pIsCustodySettlement == 0)
            {
                objCVarA_PaymentRequest.IsCheque = paymentRequestData.pIsCheck;
                objCVarA_PaymentRequest.isTransfer = false;
                objCVarA_PaymentRequest.isDeposite = false;
                objCVarA_PaymentRequest.isCash = !paymentRequestData.pIsCheck;

                objCVarA_PaymentRequest.ChequeNo = "0";
                objCVarA_PaymentRequest.BankID = paymentRequestData.pBankID;
                objCVarA_PaymentRequest.SafeID = 0;
                objCVarA_PaymentRequest.NoteAccountID = 0;

                objCVarA_PaymentRequest.ChequeDate = Convert.ToDateTime("1900/01/01");
                objCVarA_PaymentRequest.DueDate = Convert.ToDateTime("1900/01/01");
                objCVarA_PaymentRequest.ChargedPerson = "0";

            }
            else
            {
                CA_PaymentRequest objCA_PaymentRequestForUpdateRedirect = new CA_PaymentRequest();
                objCA_PaymentRequestForUpdateRedirect.GetList("where id= " + paymentRequestData.pPaymentRequestID);

                if (objCA_PaymentRequestForUpdateRedirect.lstCVarA_PaymentRequest.Count > 0)
                {
                    objCVarA_PaymentRequest.IsCheque = objCA_PaymentRequestForUpdateRedirect.lstCVarA_PaymentRequest[0].IsCheque;
                    objCVarA_PaymentRequest.isCash = objCA_PaymentRequestForUpdateRedirect.lstCVarA_PaymentRequest[0].isCash;

                    objCVarA_PaymentRequest.isTransfer = objCA_PaymentRequestForUpdateRedirect.lstCVarA_PaymentRequest[0].isTransfer;
                    objCVarA_PaymentRequest.isDeposite = objCA_PaymentRequestForUpdateRedirect.lstCVarA_PaymentRequest[0].isDeposite;
                    objCVarA_PaymentRequest.ChequeNo = objCA_PaymentRequestForUpdateRedirect.lstCVarA_PaymentRequest[0].ChequeNo;
                    objCVarA_PaymentRequest.BankID = paymentRequestData.pBankID;
                    objCVarA_PaymentRequest.SafeID = objCA_PaymentRequestForUpdateRedirect.lstCVarA_PaymentRequest[0].SafeID;
                    objCVarA_PaymentRequest.ChequeDate = objCA_PaymentRequestForUpdateRedirect.lstCVarA_PaymentRequest[0].ChequeDate;
                    objCVarA_PaymentRequest.DueDate = objCA_PaymentRequestForUpdateRedirect.lstCVarA_PaymentRequest[0].DueDate;
                    objCVarA_PaymentRequest.ChargedPerson = objCA_PaymentRequestForUpdateRedirect.lstCVarA_PaymentRequest[0].ChargedPerson;
                    objCVarA_PaymentRequest.NoteAccountID = objCA_PaymentRequestForUpdateRedirect.lstCVarA_PaymentRequest[0].NoteAccountID;

                }


            }
            objCVarA_PaymentRequest.Notes = paymentRequestData.pNotes;
            if (paymentRequestData.pIsCustodySettlement == 1)
                objCVarA_PaymentRequest.SettlementDate = paymentRequestData.pSettlementDate;
            objCVarA_PaymentRequest.RequestDate = paymentRequestData.pRequestDate;
            objCVarA_PaymentRequest.CustodyID = paymentRequestData.pCustodyID;
            objCVarA_PaymentRequest.CurrencyID = paymentRequestData.pCurrencyID;

            objCVarA_PaymentRequest.ChargeTypeGroupID = paymentRequestData.pChargeTypeGroupID;
            objCVarA_PaymentRequest.Attache = paymentRequestData.pAttache;
            objCVarA_PaymentRequest.Payment = paymentRequestData.pPayment;
            objCVarA_PaymentRequest.IssuedTo = paymentRequestData.pIssuedTo;
            objCVarA_PaymentRequest.PaymentComboID = paymentRequestData.pPaymentComboID;
            objCVarA_PaymentRequest.IssuedToCmbo = paymentRequestData.pIssuedToCmbo;

            objCVarA_PaymentRequest.PartnerTypeID = paymentRequestData.pPartnerTypeID;
            objCVarA_PaymentRequest.PartnerID = paymentRequestData.pPartnerID;
            objCVarA_PaymentRequest.PartnerIDVendor = paymentRequestData.pPartnerIDVendor;

            objCVarA_PaymentRequest.CostCenterID = paymentRequestData.pCostCenterHeaderID;
            objCVarA_PaymentRequest.NotesPayableID = paymentRequestData.pNotesPayable;
            objCVarA_PaymentRequest.IsGeneratedSupplierJV = paymentRequestData.pIsGeneratedSupplierJV;
            objCVarA_PaymentRequest.isReject = false;







            if (paymentRequestData.pPaymentRequestID == 0)
                objCVarA_PaymentRequest.CreatorUserID_Request = WebSecurity.CurrentUserId;
            objCVarA_PaymentRequest.CreationDate_Request = DateTime.Now;
            objCVarA_PaymentRequest.ModificationDate_Request = Convert.ToDateTime("1900/01/01");
            objCVarA_PaymentRequest.CreationDate_Settlement = Convert.ToDateTime("1900/01/01");
            objCVarA_PaymentRequest.ModificationDate_Settlement = Convert.ToDateTime("1900/01/01");
            objCVarA_PaymentRequest.SettlementDate = Convert.ToDateTime("1900/01/01");
            objCVarA_PaymentRequest.TotalEstmatedCost = Convert.ToDecimal(paymentRequestData.pTotalEstmatedCost);
            if (paymentRequestData.pIsCustodySettlement == 1)
            {
                objCVarA_PaymentRequest.TotalActualCost = Convert.ToDecimal(paymentRequestData.pTotalActualCost);
                objCVarA_PaymentRequest.TotalDiff = Convert.ToDecimal(paymentRequestData.pTotalDiff);
            }
            objCVarA_PaymentRequest.Discount = paymentRequestData.pDiscount;

            objCA_PaymentRequest.lstCVarA_PaymentRequest.Add(objCVarA_PaymentRequest);

            checkException = objCA_PaymentRequest.SaveMethod(objCA_PaymentRequest.lstCVarA_PaymentRequest);

            if (checkException != null)
            {
                pMessageReturned = checkException.Message;
                return new object[]
                {
                        pMessageReturned
                };
            }

            if (paymentRequestData.pIDList != null && paymentRequestData.pIDList != "") //to prevent error in case if no details
            {

                int NumberOfDetails = paymentRequestData.pIDList.Split(',').Length;
                for (int i = 0; i < NumberOfDetails; i++)
                {
                    if (paymentRequestData.pIDList.Split(',')[i].ToString() != "")
                    {
                        CVarA_PaymentRequestDetails objVarA_PaymentRequestDetails = new CVarA_PaymentRequestDetails();
                        CA_PaymentRequestDetails ExistsCA_PaymentRequestDetails = new CA_PaymentRequestDetails();
                        ExistsCA_PaymentRequestDetails.GetList(" Where ID = " + Convert.ToInt32(paymentRequestData.pIDList.Split(',')[i]));



                        int PayableID = Convert.ToInt32(paymentRequestData.pPayableIDList.Split(',')[i]);

                        if (ExistsCA_PaymentRequestDetails.lstCVarA_PaymentRequestDetails.Count > 0 && paymentRequestData.pIsCustodySettlement == 1)
                        {
                            objVarA_PaymentRequestDetails.PayableID = ExistsCA_PaymentRequestDetails.lstCVarA_PaymentRequestDetails[0].PayableID;
                        }
                        else 
                            objVarA_PaymentRequestDetails.PayableID = PayableID;

                        if (PayableID != 0 && !Convert.ToBoolean(paymentRequestData.pFilterChargeTypesList.Split(',')[i]))
                            objVarA_PaymentRequestDetails.PayableID = 0;


                        var exists = new CPayables();
                        if (IsMescoCompany)
                        {
                            exists.GetItem(Convert.ToInt64(paymentRequestData.pPayableIDList.Split(',')[i]));
                        }
                        if (Convert.ToBoolean(paymentRequestData.pFilterChargeTypesList.Split(',')[i]) && paymentRequestData.pIsCustodySettlement == 1 && IsMescoCompany && exists.lstCVarPayables.Count == 1)
                        {
                            CVarPayables objCVarPayables = new CVarPayables();
                            var objCVarPayablesList = new List<CVarPayables>();

                            CTaxeTypes objCTaxeTypes = new CTaxeTypes();
                            objCTaxeTypes.GetList("WHERE 1=1");

                            objCVarPayables = exists.lstCVarPayables[0];

                            //objCVarPayables.ID = exists.lstCVarPayables[0].ID;
                            //objCVarPayables.OperationID = exists.lstCVarPayables[0].OperationID;
                            //objCVarPayables.ChargeTypeID = exists.lstCVarPayables[0].ChargeTypeID;
                            //objCVarPayables.SupplierOperationPartnerID = exists.lstCVarPayables[0].SupplierOperationPartnerID;
                            //objCVarPayables.CategoryID = exists.lstCVarPayables[0].CategoryID;
                            //objCVarPayables.Quantity = exists.lstCVarPayables[0].Quantity;
                            objCVarPayables.CostPrice = Convert.ToDecimal(paymentRequestData.pActualCostList.Split(',')[i]) / objCVarPayables.Quantity;
                            objCVarPayables.AmountWithoutVAT = Convert.ToDecimal(paymentRequestData.pActualCostList.Split(',')[i]);
                            objCVarPayables.TaxTypeID = Convert.ToInt32(paymentRequestData.pTaxTypeIDList.Split(',')[i]);
                            objCVarPayables.TaxPercentage = objCTaxeTypes.lstCVarTaxeTypes.Count > 0 && objCVarPayables.TaxTypeID > 0 ? objCTaxeTypes.lstCVarTaxeTypes.FirstOrDefault(t => t.ID == objCVarPayables.TaxTypeID).CurrentPercentage : 0;
                            objCVarPayables.TaxAmount = objCVarPayables.AmountWithoutVAT * objCVarPayables.TaxPercentage / 100;
                            objCVarPayables.DiscountTypeID = Convert.ToInt32(paymentRequestData.pDiscountTypeIDList.Split(',')[i]);
                            objCVarPayables.DiscountPercentage = objCTaxeTypes.lstCVarTaxeTypes.Count > 0 && objCVarPayables.DiscountTypeID > 0 ? objCTaxeTypes.lstCVarTaxeTypes.FirstOrDefault(t => t.ID == objCVarPayables.DiscountTypeID).CurrentPercentage : 0;
                            objCVarPayables.DiscountAmount = objCVarPayables.AmountWithoutVAT * objCVarPayables.DiscountPercentage / 100;
                            objCVarPayables.CostAmount = objCVarPayables.AmountWithoutVAT + objCVarPayables.TaxAmount - objCVarPayables.DiscountAmount;
                            objCVarPayables.IsPurchased = false;
                            objCVarPayables.SupplierOperationPartnerID = Convert.ToInt32(paymentRequestData.pSupplierList.Split(',')[i]);
                            objCVarPayables.SupplierInvoiceNo = paymentRequestData.pSupplierInvoiceNo.Split(',')[i];


                            /*objCVarPayables.ExchangeRate = exists.lstCVarPayables[0].ExchangeRate;

                                      

                            objCVarPayables.Notes = exists.lstCVarPayables[0].Notes;
                            objCVarPayables.QuotationCost = exists.lstCVarPayables[0].QuotationCost;
                            objCVarPayables.BillID = exists.lstCVarPayables[0].BillID;

                            objCVarPayables.TruckingOrderID = exists.lstCVarPayables[0].TruckingOrderID;

                            objCVarPayables.CreationDate = exists.lstCVarPayables[0].CreationDate;
                            objCVarPayables.CreatorUserID = exists.lstCVarPayables[0].CreatorUserID;
                            objCVarPayables.IssueDate = exists.lstCVarPayables[0].IssueDate;
                            objCVarPayables.EntryDate = exists.lstCVarPayables[0].EntryDate;
                            objCVarPayables.ModificationDate = DateTime.Now;
                            objCVarPayables.ModificatorUserID = WebSecurity.CurrentUserId;
                            objCVarPayables.POrC = exists.lstCVarPayables[0].POrC;
                            objCVarPayables.ContainerTypeID = exists.lstCVarPayables[0].ContainerTypeID;
                            objCVarPayables.MeasurementID = exists.lstCVarPayables[0].MeasurementID;
                            objCVarPayables.InitialSalePrice = exists.lstCVarPayables[0].InitialSalePrice;
                            objCVarPayables.SupplierInvoiceNo = exists.lstCVarPayables[0].SupplierInvoiceNo;
                            objCVarPayables.GeneratingQCID = exists.lstCVarPayables[0].GeneratingQCID;
                            objCVarPayables.GeneratingQRID = exists.lstCVarPayables[0].GeneratingQRID;
                            objCVarPayables.SupplierReceiptNo = exists.lstCVarPayables[0].SupplierReceiptNo;
                            objCVarPayables.AccNoteID = exists.lstCVarPayables[0].AccNoteID;
                            objCVarPayables.IsApproved = exists.lstCVarPayables[0].IsApproved;
                            objCVarPayables.JVID = exists.lstCVarPayables[0].JVID;
                            objCVarPayables.ReceivableID = exists.lstCVarPayables[0].ReceivableID;
                            objCVarPayables.OperationContainersAndPackagesID = exists.lstCVarPayables[0].OperationContainersAndPackagesID;
                            objCVarPayables.IsOfficial = exists.lstCVarPayables[0].IsOfficial;
                            objCVarPayables.IsPrinted = exists.lstCVarPayables[0].IsPrinted;
                            objCVarPayables.crmCode = exists.lstCVarPayables[0].crmCode;
                            objCVarPayables.OldCostPrice = exists.lstCVarPayables[0].OldCostPrice;*/

                            objCVarPayablesList.Add(objCVarPayables);
                            objCPayables.SaveMethod(objCVarPayablesList);

                            objVarA_PaymentRequestDetails.PayableID = objCVarPayables.ID;
                        }

                        if(IsMescoCompany && exists.lstCVarPayables.Count == 1 && Convert.ToBoolean(paymentRequestData.pFilterChargeTypesList.Split(',')[i]) && paymentRequestData.pSupplierInvoiceNo.Split(',')[i] != "0")
                        {
                            CCustomizedDBCall cCustomizedDBCall = new CCustomizedDBCall();

                            cCustomizedDBCall.CallStringFunction($"update payables set   SupplierInvoiceNo = {paymentRequestData.pSupplierInvoiceNo.Split(',')[i]} ,SupplierOperationPartnerID= {Convert.ToInt32(paymentRequestData.pSupplierList.Split(',')[i])}  where id ={exists.lstCVarPayables[0].ID}");


                        }



                        if (CompanyName == "COS" && objVarA_PaymentRequestDetails.PayableID == 0)
                        {
                            CPayables objCPayablesCOS = new CPayables();

                            if (ExistsCA_PaymentRequestDetails.lstCVarA_PaymentRequestDetails.Count > 0 && ExistsCA_PaymentRequestDetails.lstCVarA_PaymentRequestDetails[0].PayableID != 0)
                            {
                                objVarA_PaymentRequestDetails.PayableID = ExistsCA_PaymentRequestDetails.lstCVarA_PaymentRequestDetails[0].PayableID;
                            }
                            else
                            {

                                objCPayablesCOS.GetList("where ChargeTypeID=" + Convert.ToInt32(paymentRequestData.pChargeTypeList.Split(',')[i]) + " and OperationID=" + Convert.ToInt32(paymentRequestData.pOperationList.Split(',')[i]) + " AND id not in(SELECT aprd.PayableID FROM A_PaymentRequestDetails AS aprd WHERE aprd.PayableID IS NOT null)");
                                if (objCPayablesCOS.lstCVarPayables.Count > 0)
                                {
                                    objVarA_PaymentRequestDetails.PayableID = objCPayablesCOS.lstCVarPayables[0].ID;
                                }
                            }

                        }
                        objVarA_PaymentRequestDetails.ID = Convert.ToInt32(paymentRequestData.pIDList.Split(',')[i]);
                        objVarA_PaymentRequestDetails.PaymentRequestID = objCVarA_PaymentRequest.ID;
                        objVarA_PaymentRequestDetails.ChargeTypeID = Convert.ToInt32(paymentRequestData.pChargeTypeList.Split(',')[i]);
                        objVarA_PaymentRequestDetails.OperationID = Convert.ToInt32(paymentRequestData.pOperationList.Split(',')[i]);
                        objVarA_PaymentRequestDetails.SupplierID = Convert.ToInt32(paymentRequestData.pSupplierList.Split(',')[i]);

                        objVarA_PaymentRequestDetails.EstmatedCost = Convert.ToDecimal(paymentRequestData.pEstmatedCostList.Split(',')[i]);
                        objVarA_PaymentRequestDetails.SupplierInvoiceNo = paymentRequestData.pSupplierInvoiceNo.Split(',')[i];
                        objVarA_PaymentRequestDetails.CostCenter_ID = Convert.ToInt32(paymentRequestData.pCostCenterIDList.Split(',')[i]);
                        objVarA_PaymentRequestDetails.Coupon = paymentRequestData.pCouponList.Split(',')[i];
                        objVarA_PaymentRequestDetails.Description = paymentRequestData.pDescriptionList.Split(',')[i];
                        objVarA_PaymentRequestDetails.FilterChargeTypes = Convert.ToBoolean(paymentRequestData.pFilterChargeTypesList.Split(',')[i]);
                        if (paymentRequestData.pActualCostList != "0")
                            objVarA_PaymentRequestDetails.ActualCost = Convert.ToDecimal(paymentRequestData.pActualCostList.Split(',')[i]);
                        if (paymentRequestData.pIsCustodySettlement == 1)
                        {
                            objVarA_PaymentRequestDetails.isRetrieved = Convert.ToBoolean(paymentRequestData.pisRetrievedList.Split(',')[i]);

                            objVarA_PaymentRequestDetails.ActualDescription = paymentRequestData.pActualDescriptionList.Split(',')[i];
                            objVarA_PaymentRequestDetails.PartenerTypeID = Convert.ToInt32(paymentRequestData.pPartenerTypeIDList.Split(',')[i]);
                            objVarA_PaymentRequestDetails.PartenerID = Convert.ToInt32(paymentRequestData.pPartenerIDList.Split(',')[i]);

                            if (objVarA_PaymentRequestDetails.ID == 0)
                                objVarA_PaymentRequestDetails.IsSettlementOnly = true;
                            else
                                objVarA_PaymentRequestDetails.IsSettlementOnly = Convert.ToBoolean(paymentRequestData.pIsSettlementOnlyList.Split(',')[i]);

                        }
                        else
                        {
                            objVarA_PaymentRequestDetails.ActualDescription = "0";
                        }

                        objVarA_PaymentRequestDetails.HouseID = Convert.ToInt32(paymentRequestData.pHouseIDList.Split(',')[i]);
                        objVarA_PaymentRequestDetails.CertificateNumberID = 0;
                        objVarA_PaymentRequestDetails.TruckingOrderID = Convert.ToInt32(paymentRequestData.pTruckingOrderIDList.Split(',')[i]);

                        objVarA_PaymentRequestDetails.TaxTypeID = Convert.ToInt32(paymentRequestData.pTaxTypeIDList.Split(',')[i]);

                        objVarA_PaymentRequestDetails.DiscountTypeID = Convert.ToInt32(paymentRequestData.pDiscountTypeIDList.Split(',')[i]);

                        if(paymentRequestData.pIsVATFromPRList != "")
                            objVarA_PaymentRequestDetails.IsVATFromPRForm = Convert.ToBoolean(paymentRequestData.pIsVATFromPRList.Split(',')[i]);



                        objCA_PaymentRequestDetails.lstCVarA_PaymentRequestDetails.Add(objVarA_PaymentRequestDetails);


                        if (paymentRequestData.pIsCustodySettlement == 0 && paymentRequestData.pTotalEstmatedCost=="0")
                        {
                            objCA_PaymentRequest.UpdateList("TotalEstmatedCost=" + Convert.ToDecimal(paymentRequestData.pEstmatedCostList.Split(',')[i]) +" where id="+ objCVarA_PaymentRequest.ID);
                        }
                    }
                }

                checkException = objCA_PaymentRequestDetails.SaveMethod(objCA_PaymentRequestDetails.lstCVarA_PaymentRequestDetails);

                if (checkException != null)
                {
                    pMessageReturned = checkException.Message;
                    return new object[]
                    {
                        pMessageReturned
                    };
                }
                objCA_AccreditationMovement.GetList("Where PaymentRequestID =" + objCVarA_PaymentRequest.ID);
                if (objCA_AccreditationMovement.lstCVarA_AccreditationMovement.Count == 0)
                {
                    CVarA_AccreditationMovement objVarA_AccreditationMovement = new CVarA_AccreditationMovement();
                    objVarA_AccreditationMovement.mPaymentRequestID = objCVarA_PaymentRequest.ID;
                    objVarA_AccreditationMovement.mRequestCreator = WebSecurity.CurrentUserId;
                    objVarA_AccreditationMovement.mTechnicalDirector = 0;
                    objVarA_AccreditationMovement.mCovenantAccountant = 0;
                    objVarA_AccreditationMovement.mSecretaryTreasury = 0;
                    objVarA_AccreditationMovement.mTreasuryReferences = 0;
                    objVarA_AccreditationMovement.mVoucherID = 0;
                    objVarA_AccreditationMovement.mVoucherSett = 0;
                    objVarA_AccreditationMovement.ApproveLevel = 0;
                    objVarA_AccreditationMovement.UserFirstApprove = 0;
                    objVarA_AccreditationMovement.UserSecondApprove = 0;


                    objVarA_AccreditationMovement.mIsChanges = true;
                    objVarA_AccreditationMovement.mRequestSettlementApprovedDate = DateTime.Parse("01-01-1900");
                    objCA_AccreditationMovement.lstCVarA_AccreditationMovement.Add(objVarA_AccreditationMovement);

                    checkException = objCA_AccreditationMovement.SaveMethod(objCA_AccreditationMovement.lstCVarA_AccreditationMovement);
                }

                int NumberOfDetails_Payables = paymentRequestData.pPayableIDList.Split(',').Length;
                bool PayableNotExist = false;
                for (int k = 0; k < NumberOfDetails_Payables; k++)
                {
                    if (paymentRequestData.pPayableIDList.Split(',')[k].ToString() != "0")
                    {
                       // if(paymentRequestData.pCalcBLPayableID == 0)
                       //     paymentRequestData.pCalcBLPayableID = Convert.ToInt32(paymentRequestData.pPayableIDList.Split(',')[k]);
                    }
                    else
                        PayableNotExist = true;
                }
                if ( (paymentRequestData.pIsCalcBL == 1 || PayableNotExist ) && paymentRequestData.pCalcBLPayableID != 0)
                {
                   // A_PaymentRequest_CalcBL_CreatePayable(@PaymentRequestID int, @CalcBLPayableID int, @UserID int)
                   if(IsMescoCompany)
                    {
                        checkException =  objCPaymentsCustomizedDBCall.CallProcFunction("A_PaymentRequest_CalcBL_CreatePayable " + paymentRequestData.pPaymentRequestID + "," + paymentRequestData.pCalcBLPayableID + "," + WebSecurity.CurrentUserId);
                    }
                }

                #region PaymentRequestApprovals
                //For companies having payment request approving stages only
                CSystemOptions objCSystemOptions = new CSystemOptions();
                objCSystemOptions.GetList(" WHERE OptionID IN (4055) ORDER BY OptionID");  //LinkUserAndSafes & LinkUserAndBanks
                bool ApproveStages = objCSystemOptions.lstCVarSystemOptions[0].OptionValue;
                if (ApproveStages && IsMescoCompany)
                {
                    CA_PaymentRequestApprovals objCA_PaymentRequestApprovals = new CA_PaymentRequestApprovals();
                    objCA_PaymentRequestApprovals.GetList($"WHERE PaymentRequestID = {objCVarA_PaymentRequest.ID}");
                    if (objCA_PaymentRequestApprovals.lstCVarA_PaymentRequestApprovals.Count == 0)
                    {
                        CVarA_PaymentRequestApprovals objCVarA_PaymentRequestApprovals = new CVarA_PaymentRequestApprovals();
                        objCVarA_PaymentRequestApprovals.PaymentRequestID = objCVarA_PaymentRequest.ID;
                        objCVarA_PaymentRequestApprovals.ApproveLevel = 1;
                        objCVarA_PaymentRequestApprovals.ApprovedBy = WebSecurity.CurrentUserId;
                        objCVarA_PaymentRequestApprovals.ApprovedOn = DateTime.Now;

                        objCA_PaymentRequestApprovals.lstCVarA_PaymentRequestApprovals.Add(objCVarA_PaymentRequestApprovals);
                        checkException = objCA_PaymentRequestApprovals.SaveMethod(objCA_PaymentRequestApprovals.lstCVarA_PaymentRequestApprovals);
                    }
                }
                #endregion

            }
            //account
            if (paymentRequestData.pAccount_IDList != null && paymentRequestData.pAccount_IDList != "" && CompanyName != "COS") //to prevent error in case if no details
            {


                CA_PaymentRequestAccount objCA_PaymentRequestAccount = new CA_PaymentRequestAccount();

                //delete old
                checkException = objCA_PaymentRequestAccount.DeleteList("WHERE PaymentRequestID=" + objCVarA_PaymentRequest.ID);


                int NumberOfDetailsAccount = paymentRequestData.pAccount_IDList.Split(',').Length;
                for (int i = 0; i < NumberOfDetailsAccount; i++)
                {


                    if (paymentRequestData.pAccount_IDList.Split(',')[i].ToString() != "")
                    {
                        CVarA_PaymentRequestAccount objVarA_PaymentRequestDetailsAccount = new CVarA_PaymentRequestAccount();

                        objVarA_PaymentRequestDetailsAccount.ID = 0;
                        objVarA_PaymentRequestDetailsAccount.PaymentRequestID = objCVarA_PaymentRequest.ID;
                        objVarA_PaymentRequestDetailsAccount.CostCenter_ID = Convert.ToInt32(paymentRequestData.pCostCenter_IDList.Split(',')[i]);
                        objVarA_PaymentRequestDetailsAccount.Account_ID = Convert.ToInt32(paymentRequestData.pAccount_IDList.Split(',')[i]);
                        objVarA_PaymentRequestDetailsAccount.SubAccount_ID = Convert.ToInt32(paymentRequestData.pSubAccount_IDList.Split(',')[i]);
                        objVarA_PaymentRequestDetailsAccount.Notes = paymentRequestData.pNotesList.Split(',')[i];
                        objVarA_PaymentRequestDetailsAccount.Amount = Convert.ToInt32(paymentRequestData.pAmountList.Split(',')[i]);

                        objCA_PaymentRequestAccount.lstCVarA_PaymentRequestAccount.Add(objVarA_PaymentRequestDetailsAccount);
                    }
                }
                checkException = objCA_PaymentRequestAccount.SaveMethod(objCA_PaymentRequestAccount.lstCVarA_PaymentRequestAccount);


            }

            if (checkException != null)
            {
                pMessageReturned = checkException.Message;
            }



            objCA_PaymentRequest.GetList("  Where ID = " + objCVarA_PaymentRequest.ID);

            //Log Second Step
            if (objCA_PaymentRequest.lstCVarA_PaymentRequest.Count > 0)
            {

                objCVarA_PaymentRequestLog.ID = 0;
                objCVarA_PaymentRequestLog.Row_ID = objCA_PaymentRequest.lstCVarA_PaymentRequest[0].ID;
                objCVarA_PaymentRequestLog.Code = objCA_PaymentRequest.lstCVarA_PaymentRequest[0].Code;
                objCVarA_PaymentRequestLog.DateTime = DateTime.Now;
                objCVarA_PaymentRequestLog.User_ID = WebSecurity.CurrentUserId;
                objCA_PaymentRequestLog.lstCVarA_PaymentRequestLog.Add(objCVarA_PaymentRequestLog);
                checkException = objCA_PaymentRequestLog.SaveMethod(objCA_PaymentRequestLog.lstCVarA_PaymentRequestLog);
            }
            ///////////////////////////////////////////////
            //Insert notification
            //if(paymentRequestData.pPaymentRequestID == 0)//Insert Payment Request
            if (paymentRequestData.pIsNotifyOrNot == 0)
            {
             
                CEmail objCEmail = new CEmail();
                CVarEmail objCVarEmail = new CVarEmail();
                objCVarEmail.ID = 0;
                if (paymentRequestData.pIsCustodySettlement == 0)
                {
                    if (objCA_PaymentRequest.lstCVarA_PaymentRequest.Count > 0)
                        objCVarEmail.Subject = "Approve Payment Request " + objCA_PaymentRequest.lstCVarA_PaymentRequest[0].Code + " - طلب صرف ";
                    else
                        objCVarEmail.Subject = "Approve  Payment Request  - طلب صرف";
                    objCVarEmail.Body = "Approve Payment Request/" + objCVarA_PaymentRequest.ID.ToString() + "";
                }
                else
                {
                    if (objCA_PaymentRequest.lstCVarA_PaymentRequest.Count > 0)
                        objCVarEmail.Subject = "Approve Custody Settlement " + objCA_PaymentRequest.lstCVarA_PaymentRequest[0].Code + " - اعتماد تسوية";
                    else
                        objCVarEmail.Subject = "Approve Custody Settlement - تسوية عهد";
                    objCVarEmail.Body = "Approve Custody Settlement/" + objCVarA_PaymentRequest.ID.ToString() + "";
                }

                /*objCVarEmail.Body = "Approve Payment Request/" + objCVarA_PaymentRequest.ID.ToString() + "";*/// " Payment request with code "+ objCA_PaymentRequest.lstCVarA_PaymentRequest[0].Code + " ";
                objCVarEmail.SenderUserID = WebSecurity.CurrentUserId;
                objCVarEmail.SendingDate = DateTime.Now;
                objCEmail.lstCVarEmail.Add(objCVarEmail);
                //if (paymentRequestData.pIsCustodySettlement == 0)
                objCEmail.SaveMethod(objCEmail.lstCVarEmail);

                CEmailReceiver objCEmailReceiver = new CEmailReceiver();
                string[] ReceiverUsers = paymentRequestData.pSelectedItemsIDs.Split(',');
                //if(PReceiverUsers != "0")
                for (int j = 0; j < ReceiverUsers.Length; j++)
                {
                    CVarEmailReceiver objCVarEmailReceiver = new CVarEmailReceiver();
                    objCVarEmailReceiver.ID = 0;
                    objCVarEmailReceiver.EmailID = objCVarEmail.ID;
                    objCVarEmailReceiver.ReceiverUserID = Convert.ToInt32(ReceiverUsers[j]);
                    objCVarEmailReceiver.IsAlarm = true;
                    objCVarEmailReceiver.ReceivingDate = DateTime.Parse("01-01-1900");
                    objCEmailReceiver.lstCVarEmailReceiver.Add(objCVarEmailReceiver);
                }

                //if (paymentRequestData.pIsCustodySettlement == 0)
                objCEmailReceiver.SaveMethod(objCEmailReceiver.lstCVarEmailReceiver);

            }


            ///////////////////////////////////////////////
            //if (checkException == null)
            //{
            //    CPayables objCPayables = new CPayables();
            //    if (paymentRequestData.pIDList != null && paymentRequestData.pIDList != "") //to prevent error in case if no details
            //    {

            //        int NumberOfDetails = paymentRequestData.pIDList.Split(',').Length;
            //        for (int i = 0; i < NumberOfDetails; i++)
            //        {
            //            if (paymentRequestData.pIDList.Split(',')[i].ToString() != "")
            //            {

            //                CVarPayables objCVarPayables = new CVarPayables();
            //                objCVarPayables.ID = 0;
            //                objCVarPayables.CustodyID = paymentRequestData.pCustodyID;
            //                objCVarPayables.OperationID = Convert.ToInt32(paymentRequestData.pOperationList.Split(',')[i]);
            //                objCVarPayables.ExchangeRate = 1;
            //                objCVarPayables.EntryDate = DateTime.Now;
            //                objCVarPayables.CurrencyID = 83;
            //                objCVarPayables.ChargeTypeID = Convert.ToInt32(paymentRequestData.pChargeTypeList.Split(',')[i]);
            //                objCVarPayables.CostPrice = Convert.ToDecimal(paymentRequestData.pEstmatedCostList.Split(',')[i]);
            //                objCVarPayables.Quantity = 1;
            //                objCVarPayables.AmountWithoutVAT = Convert.ToDecimal(paymentRequestData.pEstmatedCostList.Split(',')[i]);
            //                objCVarPayables.CostAmount = Convert.ToDecimal(paymentRequestData.pEstmatedCostList.Split(',')[i]);
            //                objCVarPayables.CreationDate = DateTime.Now;
            //                objCVarPayables.CreatorUserID = WebSecurity.CurrentUserId;
            //                objCVarPayables.ModificationDate = DateTime.Now;
            //                objCVarPayables.ModificatorUserID = WebSecurity.CurrentUserId;
            //                objCVarPayables.IssueDate = DateTime.Now;
            //                objCVarPayables.SupplierInvoiceNo = "0";
            //                objCVarPayables.SupplierReceiptNo = "0";
            //                objCVarPayables.Notes = "0";
            //                objCPayables.lstCVarPayables.Add(objCVarPayables);
            //            }
            //        }
            //    }
            //    objCPayables.SaveMethod(objCPayables.lstCVarPayables);
            //}

            #region Return Reject
            if (objCVarA_PaymentRequest.ID !=0 && paymentRequestData.pIsCustodySettlement == 0)
            {
                CEmail objCEmail = new CEmail();
                objCEmail.GetList(" Where ( Subject like '%Reject Payment Request/%' )");
                for (int i = 0; i < objCEmail.lstCVarEmail.Count; i++)
                {
                    int bodyLength = objCEmail.lstCVarEmail[i].Body.Split('/').Length;
                    if (bodyLength > 0)
                    {
                        if (Convert.ToInt32(objCVarA_PaymentRequest.ID) == Convert.ToInt32(objCEmail.lstCVarEmail[i].Body.Split('/')[1]))
                        {
                            CEmailReceiver objCEmailReceiver = new CEmailReceiver();
                            checkException = objCEmailReceiver.UpdateList("IsAlarm=" + "0" + " WHERE EmailID=" + objCEmail.lstCVarEmail[i].ID.ToString());


                        }
                    }
                }
            }
            #endregion
            return new object[]
            {
                pMessageReturned
            };
        }
        [HttpGet, HttpPost]
        public bool UpdateRedirect(Int32 pID, bool pIsCheque, bool pisTransfer, bool pisDeposite, string pChequeNo,
           Int32 pBankID, Int32 pSafeID, DateTime pChequeDate, DateTime pDueDate, string pChargedPerson, Int32 pNoteAccountID
            ,bool pisCash , bool pIsDirect)
        {
            bool _result = false;
            string pUpdateList = "";
            Exception checkException = null;

            CA_PaymentRequest objCA_PaymentRequest = new CA_PaymentRequest();
            objCA_PaymentRequest.GetList("Where ID=" + pID);
            if(objCA_PaymentRequest.lstCVarA_PaymentRequest[0].VoucherID == 0)
            {
                pUpdateList += "ChequeNo=N'" + pChequeNo + "'" + "\n";
                pUpdateList += ",ChargedPerson=N'" + pChargedPerson + "'" + "\n";
                pUpdateList += ",ChequeDate=N'" + pChequeDate.ToString("yyyyMMdd") + "'" + "\n";
                pUpdateList += ",DueDate=N'" + pDueDate.ToString("yyyyMMdd") + "'" + "\n";
                pUpdateList += ",IsCheque=" + (pIsCheque ? "1" : "0") + "\n";
                pUpdateList += ",isCash=" + (pisCash ? "1" : "0") + "\n";

                pUpdateList += ",isTransfer=" + (pisTransfer ? "1" : "0") + "\n";
                pUpdateList += ",isDeposite=" + (pisDeposite ? "1" : "0") + "\n";
                pUpdateList += (pBankID == 0 ? (",BankID=NULL") : (",BankID=" + pBankID)) + "\n";
                pUpdateList += (pSafeID == 0 ? (",SafeID=NULL") : (",SafeID=" + pSafeID)) + "\n";
                pUpdateList += (pNoteAccountID == 0 ? (",NoteAccountID=NULL") : (",NoteAccountID=" + pNoteAccountID)) + "\n";

                pUpdateList += ",IsCheck=" + ((pIsCheque || pisTransfer || pisDeposite) ? "1" : "0") + "\n";
                pUpdateList += ",IsDirect=" + (pIsDirect ? "1" : "0") + "\n";

                pUpdateList += " WHERE ID = " + pID;
                checkException = objCA_PaymentRequest.UpdateList(pUpdateList);

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
        public object[] LoadDetails(Int32 pHeaderID, Int32 pIsCustodySettlement)
        {
            bool check = false;
            int _RowCount = 0;
            Exception checkException = null;
            CvwA_PaymentRequestDetails objCvwA_PaymentRequestDetails = new CvwA_PaymentRequestDetails();
            objCvwA_PaymentRequestDetails.GetListPaging(99999, 1, "WHERE PaymentRequestID=" + pHeaderID.ToString(), "ID", out _RowCount);

            CvwA_PaymentRequest objCA_PaymentRequest = new CvwA_PaymentRequest();
            checkException = objCA_PaymentRequest.GetListPaging(1,1," Where ID = " + pHeaderID, "ID", out _RowCount);


            CA_PaymentRequestAccount objCA_PaymentRequestAccount = new CA_PaymentRequestAccount();
            objCA_PaymentRequestAccount.GetList("WHERE PaymentRequestID=" + pHeaderID.ToString());

            if (objCA_PaymentRequestAccount.lstCVarA_PaymentRequestAccount.Count > 0 && objCvwA_PaymentRequestDetails.lstCVarvwA_PaymentRequestDetails.Count == 0)
            {
                check = true;
            }

            CvwPartners objCvwPartners = new CvwPartners();
            objCvwPartners.GetList(" Where PartnerID = " + objCA_PaymentRequest.lstCVarvwA_PaymentRequest[0].PartnerID
                + " And PartnerTypeID = " + objCA_PaymentRequest.lstCVarvwA_PaymentRequest[0].PartnerTypeID);

            CvwA_PaymentRequestSupplier objCvwA_PaymentRequestSupplier = new CvwA_PaymentRequestSupplier();
            objCvwA_PaymentRequestSupplier.GetListPaging(99999, 1, "WHERE ID=" + pHeaderID, "ID", out _RowCount);

            CCustody objCCustody = new CCustody();
            objCCustody.GetList(" Where ID = " + objCA_PaymentRequest.lstCVarvwA_PaymentRequest[0].CustodyID);

            CCustomizedDBCall objCPaymentsCustomizedDBCall = new CCustomizedDBCall();
           string OperationStageID = objCPaymentsCustomizedDBCall.CallStringFunction("select top 1  O.OperationStageID  from A_PaymentRequestDetails D join Operations O on D.OperationID = O.ID where D.PaymentRequestID =  " + pHeaderID);

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                   serializer.Serialize(objCvwA_PaymentRequestDetails.lstCVarvwA_PaymentRequestDetails) //pData[0]
                 ,serializer.Serialize(objCA_PaymentRequest.lstCVarvwA_PaymentRequest)
                 ,serializer.Serialize(objCvwA_PaymentRequestDetails.lstCVarvwA_PaymentRequestDetails)
                  ,serializer.Serialize(objCCustody.lstCVarCustody)//3
                  ,serializer.Serialize(objCvwA_PaymentRequestSupplier.lstCVarvwA_PaymentRequestSupplier)//4
                  ,serializer.Serialize(objCA_PaymentRequest.lstCVarvwA_PaymentRequest)//5
                  ,check //6
                  ,serializer.Serialize(objCA_PaymentRequestAccount.lstCVarA_PaymentRequestAccount)//7
                  ,serializer.Serialize(objCvwPartners.lstCVarvwPartners)//8
                  ,OperationStageID  //9
                };



        }

        [HttpGet, HttpPost]
        public object[] LoadDetails_Old(Int32 pHeaderID, Int32 pIsCustodySettlement)
        {
            CA_PaymentRequestDetails objCA_PaymentRequestDetails = new CA_PaymentRequestDetails();
            Exception checkException = null;
            int _RowCount = 0;
            bool check = false;
            String pWhereClause = "";
            if (pIsCustodySettlement == 1)
                pWhereClause = "WHERE PaymentRequestID=" + pHeaderID.ToString();
            else
                pWhereClause = "WHERE PaymentRequestID=" + pHeaderID.ToString() + " AND isnull(IsSettlementOnly,0)=0";
            //pWhereClause = "WHERE PaymentRequestID=" + pHeaderID.ToString() + " AND IsSettlementOnly  IS NULL";

            //checkException = objCA_PaymentRequestDetails.GetListPaging(99999, 1, pWhereClause, "ID", out _RowCount);

            CA_PaymentRequest objCA_PaymentRequest = new CA_PaymentRequest();
            checkException = objCA_PaymentRequest.GetList(" Where ID = " + pHeaderID + "");

            CvwA_PaymentRequest objCvwA_PaymentRequest = new CvwA_PaymentRequest();
            objCvwA_PaymentRequest.GetList(" Where ID = " + pHeaderID + "");

            //objCvwA_PaymentRequest.GetList(" Where ID = " + pHeaderID + "");
            CCustomizedDBCall objCPaymentsCustomizedDBCall = new CCustomizedDBCall();
            CvwA_PaymentRequestSupplier objCvwA_PaymentRequestSupplier = new CvwA_PaymentRequestSupplier();

            objCvwA_PaymentRequestSupplier.GetListPaging(99999, 1, "WHERE ID=" + pHeaderID, "ID", out _RowCount);

            CvwA_PaymentRequestDetails objCvwA_PaymentRequestDetails = new CvwA_PaymentRequestDetails();
            objCvwA_PaymentRequestDetails.GetListPaging(99999, 1, "WHERE PaymentRequestID=" + pHeaderID.ToString(), "ID", out _RowCount);

            CCustody objCCustody = new CCustody();
            objCCustody.GetList(" Where ID = " + objCA_PaymentRequest.lstCVarA_PaymentRequest[0].CustodyID);

            CA_PaymentRequestAccount objCA_PaymentRequestAccount = new CA_PaymentRequestAccount();
            objCA_PaymentRequestAccount.GetList("WHERE PaymentRequestID=" + pHeaderID.ToString());

            if (objCA_PaymentRequestAccount.lstCVarA_PaymentRequestAccount.Count > 0 && objCvwA_PaymentRequestDetails.lstCVarvwA_PaymentRequestDetails.Count == 0)
            {
                check = true;
            }

            CvwPartners objCvwPartners = new CvwPartners();
            objCvwPartners.GetList(" Where PartnerID = " + objCA_PaymentRequest.lstCVarA_PaymentRequest[0].PartnerID
                + " And PartnerTypeID = " + objCA_PaymentRequest.lstCVarA_PaymentRequest[0].PartnerTypeID);



            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                   serializer.Serialize(objCA_PaymentRequestDetails.lstCVarA_PaymentRequestDetails) //pData[0]
                  ,serializer.Serialize(objCA_PaymentRequest.lstCVarA_PaymentRequest)
                  ,serializer.Serialize(objCvwA_PaymentRequestDetails.lstCVarvwA_PaymentRequestDetails)
                  ,serializer.Serialize(objCCustody.lstCVarCustody)//3
                  ,serializer.Serialize(objCvwA_PaymentRequestSupplier.lstCVarvwA_PaymentRequestSupplier)//4
                  ,serializer.Serialize(objCvwA_PaymentRequest.lstCVarvwA_PaymentRequest)//5
                  ,check //6
                  ,serializer.Serialize(objCA_PaymentRequestAccount.lstCVarA_PaymentRequestAccount)//7
                  ,serializer.Serialize(objCvwPartners.lstCVarvwPartners)//8
                };

        }

        [HttpGet, HttpPost]
        public object[] Delete(String pDeletedPaymentRequestIDs)
        {
            string ErrorMessage = "";
            bool _result = false;

            CA_PaymentRequest objCA_PaymentRequest = new CA_PaymentRequest();
            objCA_PaymentRequest.GetList("WHERE ID IN (" + pDeletedPaymentRequestIDs + ")" + " And IsApprovedRequest=1");
            if (objCA_PaymentRequest.lstCVarA_PaymentRequest.Count > 0)
                ErrorMessage = "Already Approved, لا يمكن حذف طلب الصرف لاعتمادة";


            CCustomizedDBCall cCustomizedDBCall = new CCustomizedDBCall();
            var result = cCustomizedDBCall.CallStringFunction($"select TransID from A_jvnew where notes in  ( 'A_PaymentRequest'  , 'A_PaymentRequestCollected') and transid in ({pDeletedPaymentRequestIDs})");

            if (result != "")
                ErrorMessage = "Cannot Delete A Posted PaymentRequest";

            //Log
            objCA_PaymentRequest.GetList("WHERE ID IN (" + pDeletedPaymentRequestIDs + ")");
            CA_PaymentRequestLog objCA_PaymentRequestLog = new CA_PaymentRequestLog();

            for (int i = 0; i < objCA_PaymentRequest.lstCVarA_PaymentRequest.Count; i++)
            {
                CVarA_PaymentRequestLog objCVarA_PaymentRequestLog = new CVarA_PaymentRequestLog();
                objCVarA_PaymentRequestLog.ID = 0;
                objCVarA_PaymentRequestLog.Row_ID = objCA_PaymentRequest.lstCVarA_PaymentRequest[i].ID;
                objCVarA_PaymentRequestLog.Code = objCA_PaymentRequest.lstCVarA_PaymentRequest[i].Code;
                objCVarA_PaymentRequestLog.DateTime = DateTime.Now;
                objCVarA_PaymentRequestLog.User_ID = WebSecurity.CurrentUserId;
                objCVarA_PaymentRequestLog.Trans_Type = "D";
                objCA_PaymentRequestLog.lstCVarA_PaymentRequestLog.Add(objCVarA_PaymentRequestLog);
            }
            objCA_PaymentRequestLog.SaveMethod(objCA_PaymentRequestLog.lstCVarA_PaymentRequestLog);

            Exception checkException = null;
            if (ErrorMessage == "")
            {
                CA_PaymentRequestDetails objCA_PaymentRequestDetails = new CA_PaymentRequestDetails();
                CA_PaymentRequestApprovals objCA_PaymentRequestApprovals = new CA_PaymentRequestApprovals();
                CA_AccreditationMovement objCA_AccreditationMovement = new CA_AccreditationMovement();

                checkException = objCA_PaymentRequestApprovals.DeleteList("WHERE PaymentRequestID IN (" + pDeletedPaymentRequestIDs + ")");
                if (checkException == null)
                {
                    checkException = objCA_AccreditationMovement.DeleteList("WHERE PaymentRequestID IN (" + pDeletedPaymentRequestIDs + ")");
                    if (checkException == null)
                    {
                        checkException = objCA_PaymentRequestDetails.DeleteList("WHERE PaymentRequestID IN (" + pDeletedPaymentRequestIDs + ")");
                        if (checkException == null)
                            checkException = objCA_PaymentRequest.DeleteList("WHERE ID IN (" + pDeletedPaymentRequestIDs + ")");
                    }
                }

            }







            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("DELETE")) // some or all of the rows were not deleted due to dependencies
                    _result = false;
                ErrorMessage = checkException.Message;
            }
            else //deleted successfully
            {
                if (ErrorMessage == "")
                    _result = true;
                else
                    _result = false;
            }


            return new object[] {
                  _result
                ,ErrorMessage
            };
        }
        [HttpGet, HttpPost]
        public string MultiLevelApproval(String pDeletedPaymentRequestIDs, String PReceiverUsers, int pIsCustodySettlement)
        {
            string ErrorMessage = "";
            int _RowCount = 0;
            Exception checkException = null;
            CvwDefaults objCvwDefaults = new CvwDefaults();
            objCvwDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount);
            string CompanyName = objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName;
            string[] MescoCompanies = new string[5] { "MES", "SAC", "GLO", "EUR", "ALT" };
            bool IsMescoCompany = MescoCompanies.Contains(CompanyName);
            CCustomizedDBCall objCPaymentsCustomizedDBCall = new CCustomizedDBCall();
            if (IsMescoCompany)
            {
                foreach (var idStr in pDeletedPaymentRequestIDs.Split(','))
                {
                    var trimmedID = idStr.Trim();
                    if (string.IsNullOrWhiteSpace(trimmedID))
                        continue;

                    CCustomizedDBCall cCustomizedDBCall = new CCustomizedDBCall();

                    // Get DueDate from A_PaymentRequest
                    var dueDateQuery = $@"
            SELECT DueDate 
            FROM A_PaymentRequest 
            WHERE ID = {trimmedID};";

                    var dueDate = cCustomizedDBCall.CallStringFunction(dueDateQuery);

                    // Get CreateAccrualGLOnApprove for the next approval level
                    var accrualQuery = $@"
            SELECT CreateAccrualGLOnApprove
            FROM PaymentRequestApprovalLevels
            WHERE OrderNo = (
                SELECT OrderNo + 1
                FROM PaymentRequestApprovalLevels
                WHERE Name = (
                    SELECT ApproveStatues
                    FROM vwA_PaymentRequest
                    WHERE ID = {trimmedID}
                )
            );";

                    var isCreateAccrualGLOnApprove = cCustomizedDBCall.CallStringFunction(accrualQuery);

                    // 🚨 Check condition: if dueDate is empty AND CreateAccrualGLOnApprove is "True"
                    if (string.IsNullOrWhiteSpace(dueDate) && isCreateAccrualGLOnApprove == "True")
                    {
                        //return "Cannot Approve to next level Check Due Date";
                    }
                }
            }








            if(ErrorMessage == "")
            foreach (var currentID in pDeletedPaymentRequestIDs.Split(','))
            {
                checkException = A_PaymentRequestMultiLevelApproval_Approve("A_PaymentRequestMultiLevelApproval_Approve", long.Parse(currentID)
                , PReceiverUsers, pIsCustodySettlement, WebSecurity.CurrentUserId);
            }
            

            if(checkException != null)
            {
                ErrorMessage = checkException.Message;
            }
            return ErrorMessage;
        }
        
        [HttpGet, HttpPost]
        public string Approve(String pDeletedPaymentRequestIDs, String PReceiverUsers, int pIsCustodySettlement)
        {
            string ErrorMessage = "";
            int _RowCount = 0;
            Exception checkException = null;
            bool _result = false;
            CA_PaymentRequest objCA_PaymentRequest = new CA_PaymentRequest();
            CA_AccreditationMovement objCA_AccreditationMovement = new CA_AccreditationMovement();
            CvwDefaults objCvwDefaults = new CvwDefaults();
            objCvwDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount); //i am sure i ve just one row isa

            CSystemOptions objCSystemOptions = new CSystemOptions();
            //objCSystemOptions.GetItem(55);
            objCSystemOptions.GetList(" WHERE OptionID IN (4051) ORDER BY OptionID");  //LinkUserAndSafes & LinkUserAndBanks
            bool ApproveForMes = objCSystemOptions.lstCVarSystemOptions[0].OptionValue;

            objCSystemOptions.GetList(" WHERE OptionID IN (4055) ORDER BY OptionID");  //LinkUserAndSafes & LinkUserAndBanks
            bool ApproveStages = objCSystemOptions.lstCVarSystemOptions[0].OptionValue;


            string CompanyName = objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName;
            if (pIsCustodySettlement == 0)
                checkException = objCA_PaymentRequest.GetList("WHERE IsApprovedRequest = " + "1" + "  AND ID in (" + pDeletedPaymentRequestIDs + ")");
            else
                checkException = objCA_PaymentRequest.GetList("WHERE IsApprovedSettlement = " + "1" + " AND ID in (" + pDeletedPaymentRequestIDs + ")");

     
             CvwA_PaymentRequest objCvwA_PaymentRequest = new CvwA_PaymentRequest();
             checkException = objCvwA_PaymentRequest.GetListPaging(10,1, "WHERE PaymentRequestCollectedCode Is Not Null AND ID in (" + pDeletedPaymentRequestIDs + ")" , " ID ", out _RowCount);

			//remove alarm
			if (new string[] { "MED" }.Contains(CompanyName))
			{
				var IDs = pDeletedPaymentRequestIDs.Split(',');
				string query = $@"update EmailReceiver set IsAlarm=0 where
ReceiverUserID={WebSecurity.CurrentUserId} and EmailID in (
select ID from Email where 1=2
";
				foreach (var id in IDs)
				{
					query += $@" or Body like N'%Payment Request/{id}%'";
				}
				query += $@")";
				CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
				var res = objCCustomizedDBCall.ExecuteQuery(query);
			}

			if (objCA_PaymentRequest.lstCVarA_PaymentRequest.Count > 0)
                if (CompanyName == "NEW" && pIsCustodySettlement == 0)
                {

                    checkException = objCA_PaymentRequest.GetList("WHERE IsApprovedRequest = " + "1" + " AND isnull(IsAccept,0) = 1 AND ID in (" + pDeletedPaymentRequestIDs + ")");
                    if (objCA_PaymentRequest.lstCVarA_PaymentRequest.Count > 0)
                    {
                        ErrorMessage = "Already Approved,  تم اعتماد طلب الصرف سابقا ";

                    }
                    else
                    {
                        foreach (var currentID in pDeletedPaymentRequestIDs.Split(','))
                        {
                            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();

                            checkException = objCA_PaymentRequest.UpdateList("IsAccept=" + "1" + " WHERE ID=" + currentID.ToString());
                            checkException = objCA_AccreditationMovement.UpdateList("CovenantAccountant=" + WebSecurity.CurrentUserId + " WHERE PaymentRequestID=" + currentID.ToString());
                            objCA_PaymentRequest.GetList("WHERE ID=" + currentID.ToString());
                            //Insert notification
                            CEmail objCEmail = new CEmail();
                            CVarEmail objCVarEmail = new CVarEmail();
                            objCVarEmail.ID = 0;
                            string CurrencyCode = objCCustomizedDBCall.CallStringFunction("SELECT code FROM Currencies WHERE id =" + objCA_PaymentRequest.lstCVarA_PaymentRequest[0].CurrencyID);

                            if (objCA_PaymentRequest.lstCVarA_PaymentRequest.Count > 0)
                                objCVarEmail.Subject = " تم اعتماد العهد " + objCA_PaymentRequest.lstCVarA_PaymentRequest[0].Code + " " + CurrencyCode;
                            else
                                objCVarEmail.Subject = "تم اعتماد العهد";
                            objCVarEmail.Body = "مراجعة العهدة/" + currentID.ToString() + "";// " Payment request with code "+ objCA_PaymentRequest.lstCVarA_PaymentRequest[0].Code + " ";
                            objCVarEmail.SenderUserID = WebSecurity.CurrentUserId;
                            objCVarEmail.SendingDate = DateTime.Now;
                            objCEmail.lstCVarEmail.Add(objCVarEmail);
                            if (pIsCustodySettlement == 0)
                                objCEmail.SaveMethod(objCEmail.lstCVarEmail);

                            CEmailReceiver objCEmailReceiver = new CEmailReceiver();
                            string[] ReceiverUsers = PReceiverUsers.Split(',');
                            //if(PReceiverUsers != "0")
                            for (int j = 0; j < ReceiverUsers.Length; j++)
                            {
                                CVarEmailReceiver objCVarEmailReceiver = new CVarEmailReceiver();
                                objCVarEmailReceiver.ID = 0;
                                objCVarEmailReceiver.EmailID = objCVarEmail.ID;
                                objCVarEmailReceiver.ReceiverUserID = Convert.ToInt32(ReceiverUsers[j]);
                                objCVarEmailReceiver.IsAlarm = true;
                                objCVarEmailReceiver.ReceivingDate = DateTime.Parse("01-01-1900");
                                objCEmailReceiver.lstCVarEmailReceiver.Add(objCVarEmailReceiver);
                            }



                            if (pIsCustodySettlement == 0)
                                objCEmailReceiver.SaveMethod(objCEmailReceiver.lstCVarEmailReceiver);
                        }
                    }

                }
                else
                {
                    ErrorMessage = "Already Approved,  تم اعتماد طلب الصرف سابقا ";
                }
            else if (objCvwA_PaymentRequest.lstCVarvwA_PaymentRequest.Count > 0 && CompanyName != "MES")
                ErrorMessage = " طلب الصرف مربوط على طلب صرف مجمع رقم" + " " + objCvwA_PaymentRequest.lstCVarvwA_PaymentRequest[0].PaymentRequestCollectedCode;
            else
                foreach (var currentID in pDeletedPaymentRequestIDs.Split(','))
                {
                    // string pWhereClause = "";

                    CCustomizedDBCall objCPaymentsCustomizedDBCall = new CCustomizedDBCall();
                    #region Posting JVNew Mesco

                    objCA_PaymentRequest.GetList("WHERE ID=" + currentID.ToString());

                    if (pIsCustodySettlement == 1)
                    {
                        if (ApproveForMes)
                        {
                            //main
                            checkException = objCPaymentsCustomizedDBCall.Mesco_A_PaymentRequestJVNew_Posting("A_PaymentRequestJVNew_Posting ", Convert.ToInt32(currentID), +WebSecurity.CurrentUserId, true);

                            ////diff
                            //objCPaymentsCustomizedDBCall.ExecuteQuery_DataTable("A_PaymentRequestSettJVNew_Posting " + currentID.ToString() + "," + WebSecurity.CurrentUserId + "," + true);
                            //no diff
                            //if(checkException == null)
                            //{
                            //    if (objCA_PaymentRequest.lstCVarA_PaymentRequest[0].TotalActualCost == objCA_PaymentRequest.lstCVarA_PaymentRequest[0].TotalEstmatedCost && objCA_PaymentRequest.lstCVarA_PaymentRequest[0].PartnerID == 0)
                            //    {
                            //        checkException = objCPaymentsCustomizedDBCall.Mesco_A_PaymentRequestJVNew_Posting("A_PaymentRequestJVNewNoDiff_Posting ", Convert.ToInt32(currentID), +WebSecurity.CurrentUserId, true);

                            //    }
                            //}
                          


                        }
                    }

                    if (pIsCustodySettlement == 0 && objCA_PaymentRequest.lstCVarA_PaymentRequest[0].PartnerID != 0)
                    {

                        if (ApproveForMes)
                        {
                            objCA_AccreditationMovement.GetList("where PaymentRequestID=" + currentID.ToString());

                            if (objCA_AccreditationMovement.lstCVarA_AccreditationMovement[0].ApproveLevel == 1)
                                //main
                               checkException= objCPaymentsCustomizedDBCall.Mesco_A_PaymentRequestJVNew_Posting("A_PaymentRequestJVNew_Posting " ,Convert.ToInt32(currentID) , + WebSecurity.CurrentUserId , true);

                        }
                    }

                    #endregion
                    if (pIsCustodySettlement == 1 && (CompanyName == "COS" || CompanyName == "ELI"))
                    {
                        checkException = objCPaymentsCustomizedDBCall.A_SingleID_Posting("A_PaymentRequestCustody_Posting", currentID.ToString(), WebSecurity.CurrentUserId);
                    }
                    if (checkException != null) // an exception is caught in the model
                    {
                        _result = false;
                        ErrorMessage = checkException.Message;
                    }
                    else
                    {

                        if (pIsCustodySettlement == 0)
                        {
                            objCA_PaymentRequest.GetList("WHERE ID=" + currentID.ToString());

                            if (objCA_PaymentRequest.lstCVarA_PaymentRequest[0].PartnerID != 0 && objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName != "MES")
                                checkException = objCPaymentsCustomizedDBCall.A_SingleID_Posting("A_PaymentRequestSupplierWithoutOperation_Posting", currentID.ToString(), WebSecurity.CurrentUserId);

                            if (checkException == null && (objCA_PaymentRequest.lstCVarA_PaymentRequest[0].PartnerID != 0 || !objCA_PaymentRequest.lstCVarA_PaymentRequest[0].IsGeneratedSupplierJV))
                            {
                                if (ApproveStages)
                                {
                                    objCA_AccreditationMovement.GetList("where PaymentRequestID="+ currentID.ToString());
                                    if (objCA_AccreditationMovement.lstCVarA_AccreditationMovement.Count >0)
                                    {
                                        if (objCA_AccreditationMovement.lstCVarA_AccreditationMovement[0].ApproveLevel==0)
                                        {
                                            checkException = objCA_AccreditationMovement.UpdateList("ApproveLevel=1,UserFirstApprove=" + WebSecurity.CurrentUserId + " WHERE PaymentRequestID=" + currentID.ToString());
                                            checkException = objCA_AccreditationMovement.UpdateList("TechnicalDirector=" + WebSecurity.CurrentUserId + " WHERE PaymentRequestID=" + currentID.ToString());

                                        }
                                        else if (objCA_AccreditationMovement.lstCVarA_AccreditationMovement[0].ApproveLevel == 1)
                                        {
                                            checkException = objCA_AccreditationMovement.UpdateList("ApproveLevel=2,UserSecondApprove=" + WebSecurity.CurrentUserId + " WHERE PaymentRequestID=" + currentID.ToString());
                                            checkException = objCA_PaymentRequest.UpdateList("IsApprovedRequest=" + "1" + " WHERE ID=" + currentID.ToString());
                                            checkException = objCA_AccreditationMovement.UpdateList("TechnicalDirector=" + WebSecurity.CurrentUserId + " WHERE PaymentRequestID=" + currentID.ToString());

                                        }
                                        else if (objCA_AccreditationMovement.lstCVarA_AccreditationMovement[0].ApproveLevel == 2)
                                        {
                                            checkException = objCA_AccreditationMovement.UpdateList("ApproveLevel=2,UserSecondApprove=" + WebSecurity.CurrentUserId + " WHERE PaymentRequestID=" + currentID.ToString());
                                            checkException = objCA_PaymentRequest.UpdateList("IsApprovedRequest=" + "1" + " WHERE ID=" + currentID.ToString());
                                            checkException = objCA_AccreditationMovement.UpdateList("TechnicalDirector=" + WebSecurity.CurrentUserId + " WHERE PaymentRequestID=" + currentID.ToString());

                                        }

                                    }
                                }
                                else
                                {
                                    checkException = objCA_PaymentRequest.UpdateList("IsApprovedRequest=" + "1" + " WHERE ID=" + currentID.ToString());
                                    checkException = objCA_AccreditationMovement.UpdateList("TechnicalDirector=" + WebSecurity.CurrentUserId + " WHERE PaymentRequestID=" + currentID.ToString());


                                }
                            }

                            if (checkException != null)
                                ErrorMessage = checkException.Message;

                        }

                        else
                        {
                            checkException = objCA_PaymentRequest.UpdateList("IsApprovedSettlement=" + "1" + " WHERE ID=" + currentID.ToString());
                            checkException = objCA_AccreditationMovement.UpdateList("RequestSettlementApprovedDate=getdate() , RequestSettlementApprovedUserID=" + WebSecurity.CurrentUserId + " WHERE PaymentRequestID=" + currentID.ToString());

                        }
                        objCA_PaymentRequest.GetList("WHERE ID=" + currentID.ToString());

                        CTaxeTypes objCTaxeTypesVat = new CTaxeTypes();
                        CTaxeTypes objCTaxeTypesDiscount = new CTaxeTypes();


                        CDefaults objCDefaults = new CDefaults();
                        CUsers objCUsers = new CUsers();
                        checkException = objCDefaults.GetListPaging(999999, 1, "WHERE 1=1", "ID", out _RowCount);

                        CA_PaymentRequestDetails objCA_PaymentRequestDetails = new CA_PaymentRequestDetails();
                        checkException = objCA_PaymentRequestDetails.GetListPaging(999999, 1, "WHERE isnull(OperationID,0) <>0 and isnull(PartenerID,0)=0 and PaymentRequestID= " + currentID.ToString(), "ID", out _RowCount);
                        CPayables objCPayables = new CPayables();
                        for (int k = 0; k < objCA_PaymentRequestDetails.lstCVarA_PaymentRequestDetails.Count; k++)
                        {
                            //get certificate Number by operationID
                            String certificateNumber = "";
                            //certificateNumber = objCPaymentsCustomizedDBCall.CallStringFunction("SELECT top 1 isnull(o.CertificateNumber,'') FROM Operations AS o WHERE o.ID = " + objCA_PaymentRequestDetails.lstCVarA_PaymentRequestDetails[k].OperationID);
                            certificateNumber = objCPaymentsCustomizedDBCall.CallStringFunction("SELECT (o.HouseNumber + CASE WHEN o.CertificateNumber IS NULL THEN '' ELSE ' - ' END + isnull(o.CertificateNumber,'')) AS Name FROM OperationPartners OP LEFT JOIN Operations O ON O.ID = OP.OperationID  WHERE o.ID = " + objCA_PaymentRequestDetails.lstCVarA_PaymentRequestDetails[k].HouseID + " GROUP BY  o.HouseNumber, o.CertificateNumber");

                            objCPayables = new CPayables();
                            decimal ExchangeRate = 1;
                            string pWhereClauseCurrencyDetails = "";
                            CvwCurrencyDetails objCvwCurrencyDetails = new CvwCurrencyDetails();
                            pWhereClauseCurrencyDetails = "WHERE ID=" + objCA_PaymentRequest.lstCVarA_PaymentRequest[0].CurrencyID.ToString()
                                + " AND GETDATE() >= DateAdd(hh, 0, DateDiff(dd, 0, FromDate)) "
                                + " AND GETDATE() <= DateAdd(minute,59,DateAdd(hh, 23, DateDiff(dd, 0, ToDate))) "
                                + " ORDER BY CODE";
                            objCvwCurrencyDetails.GetList(pWhereClauseCurrencyDetails);
                            if (objCvwCurrencyDetails.lstCVarvwCurrencyDetails.Count > 0)
                                ExchangeRate = objCvwCurrencyDetails.lstCVarvwCurrencyDetails[0].ExchangeRate;

                            CPayables CPayablesExists = new CPayables();
                            //string WherePayableExists = " where OperationID = " + objCA_PaymentRequestDetails.lstCVarA_PaymentRequestDetails[k].OperationID + " AND ChargeTypeID = " + objCA_PaymentRequestDetails.lstCVarA_PaymentRequestDetails[k].ChargeTypeID;
                            string WherePayableExists = " where ID=" + objCA_PaymentRequestDetails.lstCVarA_PaymentRequestDetails[k].PayableID;

                            CPayablesExists.GetListPaging(1000, 1, WherePayableExists, " ID", out _RowCount);

                            CvwOperationPartners objCvwOperationPartners = new CvwOperationPartners();
                            objCvwOperationPartners.GetListPaging(1000, 1, " Where ID = " + objCA_PaymentRequestDetails.lstCVarA_PaymentRequestDetails[k].SupplierID, "ID", out _RowCount);

                            CVarPayables objCVarPayables = new CVarPayables();

                            if (pIsCustodySettlement == 0 && objCA_PaymentRequestDetails.lstCVarA_PaymentRequestDetails[k].FilterChargeTypes == false)
                                objCVarPayables.ID = 0;
                            else if (pIsCustodySettlement == 1 && objCA_PaymentRequestDetails.lstCVarA_PaymentRequestDetails[k].IsSettlementOnly == true)
                                objCVarPayables.ID = 0;
                            else if (CPayablesExists.lstCVarPayables.Count > 0)
                                objCVarPayables.ID = CPayablesExists.lstCVarPayables[0].ID;


                            if ((CompanyName == "COS" || CompanyName == "ELI"))
                            {
                                string PayableID = objCPaymentsCustomizedDBCall.CallStringFunction("SELECT vp.ID FROM vwPayables AS vp WHERE vp.OperationID = " + objCA_PaymentRequestDetails.lstCVarA_PaymentRequestDetails[k].OperationID + "and vp.ChargeTypeID = " + objCA_PaymentRequestDetails.lstCVarA_PaymentRequestDetails[k].ChargeTypeID);
                                checkException = objCA_PaymentRequestDetails.UpdateList("PayableID="
                                        + PayableID + " WHERE ID=" + objCA_PaymentRequestDetails.lstCVarA_PaymentRequestDetails[k].ID.ToString());

                            }
                            //else if(objCA_PaymentRequestDetails.lstCVarA_PaymentRequestDetails[k].PayableID != 0)
                            //{

                            //}
                            else
                            {

                                objCTaxeTypesVat.GetList("where id=" + objCA_PaymentRequestDetails.lstCVarA_PaymentRequestDetails[k].TaxTypeID);
                                objCTaxeTypesDiscount.GetList("where id=" + objCA_PaymentRequestDetails.lstCVarA_PaymentRequestDetails[k].DiscountTypeID);

                                #region Generate Payable
                                //to kelany

                                objCVarPayables.SupplierSiteID = 0;
                                objCVarPayables.ContainerTypeID = 0;
                                objCVarPayables.MeasurementID = 0;
                                objCVarPayables.BillID = 0;
                                objCVarPayables.SupplierInvoiceNo = "0";
                                objCVarPayables.SupplierReceiptNo = "0";
                                objCVarPayables.TruckingOrderID = 0;
                                objCVarPayables.OperationContainersAndPackagesID = 0;
                                objCVarPayables.GeneratingQRID = 0;
                                objCVarPayables.POrC = 0;
                                objCVarPayables.EntryDate = DateTime.Now;
                                objCVarPayables.IssueDate = DateTime.Now;
                                objCVarPayables.CreatorUserID = objCVarPayables.ModificatorUserID = WebSecurity.CurrentUserId;
                                objCVarPayables.CreationDate = objCVarPayables.ModificationDate = DateTime.Now;
                                if (CPayablesExists.lstCVarPayables.Count > 0)
                                    objCVarPayables = CPayablesExists.lstCVarPayables[0];


                                ///tax
                                objCVarPayables.TaxTypeID = objCA_PaymentRequestDetails.lstCVarA_PaymentRequestDetails[k].TaxTypeID;
                                if (objCA_PaymentRequest.lstCVarA_PaymentRequest[0].IsGeneratedSupplierJV ||
                                    (objCA_PaymentRequest.lstCVarA_PaymentRequest[0].PartnerID > 0 && objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName == "MES") )
                                    objCVarPayables.TaxAmount = objCTaxeTypesVat.lstCVarTaxeTypes.Count > 0 ? (objCTaxeTypesVat.lstCVarTaxeTypes[0].CurrentPercentage * objCA_PaymentRequestDetails.lstCVarA_PaymentRequestDetails[k].EstmatedCost / 100) : 0;
                                else
                                    objCVarPayables.TaxAmount = objCTaxeTypesVat.lstCVarTaxeTypes.Count > 0 ? (objCTaxeTypesVat.lstCVarTaxeTypes[0].CurrentPercentage * objCA_PaymentRequestDetails.lstCVarA_PaymentRequestDetails[k].ActualCost / 100) : 0;

                                objCVarPayables.TaxPercentage = objCTaxeTypesVat.lstCVarTaxeTypes.Count > 0 ? (objCTaxeTypesVat.lstCVarTaxeTypes[0].CurrentPercentage) : 0;

                                objCVarPayables.DiscountTypeID = objCA_PaymentRequestDetails.lstCVarA_PaymentRequestDetails[k].DiscountTypeID;

                                if (objCA_PaymentRequest.lstCVarA_PaymentRequest[0].IsGeneratedSupplierJV ||
                                (objCA_PaymentRequest.lstCVarA_PaymentRequest[0].PartnerID > 0 && objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName == "MES"))
                                    objCVarPayables.DiscountAmount = objCTaxeTypesDiscount.lstCVarTaxeTypes.Count > 0 ? (objCTaxeTypesDiscount.lstCVarTaxeTypes[0].CurrentPercentage * objCA_PaymentRequestDetails.lstCVarA_PaymentRequestDetails[k].EstmatedCost / 100) : 0;
                                else
                                    objCVarPayables.DiscountAmount = objCTaxeTypesDiscount.lstCVarTaxeTypes.Count > 0 ? (objCTaxeTypesDiscount.lstCVarTaxeTypes[0].CurrentPercentage * objCA_PaymentRequestDetails.lstCVarA_PaymentRequestDetails[k].ActualCost / 100) : 0;

                                objCVarPayables.DiscountPercentage = objCTaxeTypesDiscount.lstCVarTaxeTypes.Count > 0 ? (objCTaxeTypesDiscount.lstCVarTaxeTypes[0].CurrentPercentage) : 0;

                                objCVarPayables.OperationID = objCA_PaymentRequestDetails.lstCVarA_PaymentRequestDetails[k].OperationID;
                                objCVarPayables.OperationID = objCA_PaymentRequestDetails.lstCVarA_PaymentRequestDetails[k].OperationID;
                                objCVarPayables.ChargeTypeID = objCA_PaymentRequestDetails.lstCVarA_PaymentRequestDetails[k].ChargeTypeID;
                                if(CPayablesExists.lstCVarPayables.Count > 0)
                                    objCVarPayables.ChargeTypeID = CPayablesExists.lstCVarPayables[0].ChargeTypeID;
                                objCVarPayables.SupplierOperationPartnerID = objCA_PaymentRequestDetails.lstCVarA_PaymentRequestDetails[k].SupplierID;//0;
                                objCVarPayables.Quantity = CPayablesExists.lstCVarPayables.Count > 0 ? CPayablesExists.lstCVarPayables[0].Quantity : 1;

                                if (objCA_PaymentRequest.lstCVarA_PaymentRequest[0].IsGeneratedSupplierJV)
                                {
                                    objCVarPayables.CostPrice = objCA_PaymentRequestDetails.lstCVarA_PaymentRequestDetails[k].EstmatedCost / objCVarPayables.Quantity;//0;
                                    objCVarPayables.CostAmount = (objCA_PaymentRequestDetails.lstCVarA_PaymentRequestDetails[k].EstmatedCost - objCVarPayables.DiscountAmount) + objCVarPayables.TaxAmount;
                                    objCVarPayables.InitialSalePrice = objCA_PaymentRequestDetails.lstCVarA_PaymentRequestDetails[k].EstmatedCost;
                                    objCVarPayables.AmountWithoutVAT = objCA_PaymentRequestDetails.lstCVarA_PaymentRequestDetails[k].EstmatedCost; //still no VAT entered so they are the same
                                }
                                else
                                {
                                    if(objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName == "MES" && objCA_PaymentRequest.lstCVarA_PaymentRequest[0].PartnerID > 0)
                                       objCVarPayables.CostPrice = objCA_PaymentRequestDetails.lstCVarA_PaymentRequestDetails[k].EstmatedCost / objCVarPayables.Quantity;//0;
                                    else
                                       objCVarPayables.CostPrice = objCA_PaymentRequestDetails.lstCVarA_PaymentRequestDetails[k].ActualCost / objCVarPayables.Quantity;//0;

                                    if (objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName == "MES" && objCA_PaymentRequest.lstCVarA_PaymentRequest[0].PartnerID > 0)
                                        objCVarPayables.CostAmount = (objCA_PaymentRequestDetails.lstCVarA_PaymentRequestDetails[k].EstmatedCost - objCVarPayables.DiscountAmount) + objCVarPayables.TaxAmount;
                                    else
                                        objCVarPayables.CostAmount = (objCA_PaymentRequestDetails.lstCVarA_PaymentRequestDetails[k].ActualCost - objCVarPayables.DiscountAmount) + objCVarPayables.TaxAmount;

                                    objCVarPayables.InitialSalePrice = objCA_PaymentRequestDetails.lstCVarA_PaymentRequestDetails[k].ActualCost;
                                    objCVarPayables.AmountWithoutVAT = objCA_PaymentRequestDetails.lstCVarA_PaymentRequestDetails[k].ActualCost; //still no VAT entered so they are the same
                                }

                            if(!objCA_PaymentRequestDetails.lstCVarA_PaymentRequestDetails[k].IsSettlementOnly)
                                objCVarPayables.QuotationCost = objCA_PaymentRequestDetails.lstCVarA_PaymentRequestDetails[k].EstmatedCost;

                                objCVarPayables.SupplierReceiptNo = objCA_PaymentRequestDetails.lstCVarA_PaymentRequestDetails[k].Coupon;

                                    objCVarPayables.BillID = objCA_PaymentRequestDetails.lstCVarA_PaymentRequestDetails[k].HouseID;




                                //objCVarPayables.TaxTypeID = objCA_PaymentRequestDetails.lstCVarA_PaymentRequestDetails[k].TaxTypeID;

                                //objCVarPayables.DiscountTypeID = objCA_PaymentRequestDetails.lstCVarA_PaymentRequestDetails[k].DiscountTypeID;



                                // objCVarPayables.SupplierInvoiceNo = certificateNumber;

                                objCVarPayables.ExchangeRate = ExchangeRate; //rowQuotationCharge.CostExchangeRate;
                                objCVarPayables.CurrencyID = objCA_PaymentRequest.lstCVarA_PaymentRequest[0].CurrencyID;
                                if (objCvwOperationPartners.lstCVarvwOperationPartners.Count > 0)
                                    objCVarPayables.Notes = "Payment Request " + objCA_PaymentRequest.lstCVarA_PaymentRequest[0].Code + " Supplier " + objCvwOperationPartners.lstCVarvwOperationPartners[0].PartnerTypeName + ":  " + objCvwOperationPartners.lstCVarvwOperationPartners[0].PartnerName;//"";
                                else
                                    objCVarPayables.Notes = "Payment Request " + objCA_PaymentRequest.lstCVarA_PaymentRequest[0].Code;
                                objCVarPayables.IsOfficial = false;
                                objCVarPayables.ApprovePendingValue = 0;
                                objCVarPayables.crmCode = CPayablesExists.lstCVarPayables.Count > 0 ? CPayablesExists.lstCVarPayables[0].crmCode : "";
                                objCVarPayables.IsPurchased = false;


                                objCPayables.lstCVarPayables.Add(objCVarPayables);

                                checkException = objCPayables.SaveMethod(objCPayables.lstCVarPayables);
                                checkException = objCA_PaymentRequestDetails.UpdateList("PayableID="
                                    + objCPayables.lstCVarPayables[0].ID + " WHERE ID=" + objCA_PaymentRequestDetails.lstCVarA_PaymentRequestDetails[k].ID.ToString());

                                #endregion




                            }


                        }
                        if (objCA_PaymentRequest.lstCVarA_PaymentRequest[0].PartnerID == 0 && objCA_PaymentRequest.lstCVarA_PaymentRequest[0].IsGeneratedSupplierJV)
                        {
                            if (ApproveStages)
                            {
                                objCA_AccreditationMovement.GetList("where PaymentRequestID=" + currentID.ToString());
                                if (objCA_AccreditationMovement.lstCVarA_AccreditationMovement.Count > 0)
                                {
                                    if (objCA_AccreditationMovement.lstCVarA_AccreditationMovement[0].ApproveLevel == 0)
                                    {
                                        checkException = objCA_AccreditationMovement.UpdateList("ApproveLevel=1,UserFirstApprove=" + WebSecurity.CurrentUserId + " WHERE PaymentRequestID=" + currentID.ToString());
                                        checkException = objCA_AccreditationMovement.UpdateList("TechnicalDirector=" + WebSecurity.CurrentUserId + " WHERE PaymentRequestID=" + currentID.ToString());

                                    }
                                    else if (objCA_AccreditationMovement.lstCVarA_AccreditationMovement[0].ApproveLevel == 1)
                                    {
                                        checkException = objCA_AccreditationMovement.UpdateList("ApproveLevel=2,UserSecondApprove=" + WebSecurity.CurrentUserId + " WHERE PaymentRequestID=" + currentID.ToString());
                                        checkException = objCPaymentsCustomizedDBCall.A_SingleID_Posting("A_PaymentRequestSupplierWithOperation_Posting", currentID.ToString(), WebSecurity.CurrentUserId);
                                        if (checkException == null)
                                        {
                                            checkException = objCA_PaymentRequest.UpdateList("IsApprovedRequest=" + "1" + " WHERE ID=" + currentID.ToString());
                                            checkException = objCA_AccreditationMovement.UpdateList("TechnicalDirector=" + WebSecurity.CurrentUserId + " WHERE PaymentRequestID=" + currentID.ToString());

                                        }
                                    }
                                    else if (objCA_AccreditationMovement.lstCVarA_AccreditationMovement[0].ApproveLevel == 2)
                                    {
                                        checkException = objCA_AccreditationMovement.UpdateList("ApproveLevel=2,UserSecondApprove=" + WebSecurity.CurrentUserId + " WHERE PaymentRequestID=" + currentID.ToString());
                                        checkException = objCPaymentsCustomizedDBCall.A_SingleID_Posting("A_PaymentRequestSupplierWithOperation_Posting", currentID.ToString(), WebSecurity.CurrentUserId);
                                        if (checkException == null)
                                        {
                                            checkException = objCA_PaymentRequest.UpdateList("IsApprovedRequest=" + "1" + " WHERE ID=" + currentID.ToString());
                                            checkException = objCA_AccreditationMovement.UpdateList("TechnicalDirector=" + WebSecurity.CurrentUserId + " WHERE PaymentRequestID=" + currentID.ToString());

                                        }
                                    }

                                }
                            }
                            else
                            {
                                checkException = objCPaymentsCustomizedDBCall.A_SingleID_Posting("A_PaymentRequestSupplierWithOperation_Posting", currentID.ToString(), WebSecurity.CurrentUserId);
                                if (checkException == null)
                                {
                                    checkException = objCA_PaymentRequest.UpdateList("IsApprovedRequest=" + "1" + " WHERE ID=" + currentID.ToString());
                                    checkException = objCA_AccreditationMovement.UpdateList("TechnicalDirector=" + WebSecurity.CurrentUserId + " WHERE PaymentRequestID=" + currentID.ToString());

                                }
                            }
                            
                        }
                        #region Generate IssueVoucher msg
                        if (!objCA_PaymentRequest.lstCVarA_PaymentRequest[0].IsGeneratedSupplierJV)
                        {
                            if (ApproveStages)
                            {
                                objCA_AccreditationMovement.GetList("where PaymentRequestID=" + currentID.ToString());
                                CA_PaymentRequestDueDateAlarm objA_PaymentRequestDueDateAlarmCheck = new CA_PaymentRequestDueDateAlarm();
                                objA_PaymentRequestDueDateAlarmCheck.GetList("where PaymentRequestID=" + currentID.ToString());
                                if (objCA_AccreditationMovement.lstCVarA_AccreditationMovement[0].ApproveLevel == 2)
                                {
                                    if (CompanyName=="MES" && objCA_PaymentRequest.lstCVarA_PaymentRequest[0].DueDate <=DateTime.Now 
                                        && (objA_PaymentRequestDueDateAlarmCheck.lstCVarA_PaymentRequestDueDateAlarm.Count > 0 && objA_PaymentRequestDueDateAlarmCheck.lstCVarA_PaymentRequestDueDateAlarm[0].IsFinish == false)
                                        )
                                    {
                                       
                                            //Insert notification
                                            CEmail objCEmail = new CEmail();
                                            CVarEmail objCVarEmail = new CVarEmail();
                                            objCVarEmail.ID = 0;
                                            if (objCA_PaymentRequest.lstCVarA_PaymentRequest.Count > 0)
                                                objCVarEmail.Subject = " Payment Request " + objCA_PaymentRequest.lstCVarA_PaymentRequest[0].Code + " - طلب صرف";
                                            else
                                                objCVarEmail.Subject = " Payment Request  - طلب صرف";
                                            objCVarEmail.Body = "Payment Request/" + currentID.ToString() + "";// " Payment request with code "+ objCA_PaymentRequest.lstCVarA_PaymentRequest[0].Code + " ";
                                            objCVarEmail.SenderUserID = WebSecurity.CurrentUserId;
                                            objCVarEmail.SendingDate = DateTime.Now;
                                            objCEmail.lstCVarEmail.Add(objCVarEmail);
                                            if (pIsCustodySettlement == 0)
                                                objCEmail.SaveMethod(objCEmail.lstCVarEmail);

                                            CEmailReceiver objCEmailReceiver = new CEmailReceiver();
                                            string[] ReceiverUsers = PReceiverUsers.Split(',');
                                            //if(PReceiverUsers != "0")
                                            for (int j = 0; j < ReceiverUsers.Length; j++)
                                            {
                                                CVarEmailReceiver objCVarEmailReceiver = new CVarEmailReceiver();
                                                objCVarEmailReceiver.ID = 0;
                                                objCVarEmailReceiver.EmailID = objCVarEmail.ID;
                                                objCVarEmailReceiver.ReceiverUserID = Convert.ToInt32(ReceiverUsers[j]);
                                                objCVarEmailReceiver.IsAlarm = true;
                                                objCVarEmailReceiver.ReceivingDate = DateTime.Parse("01-01-1900");
                                                objCEmailReceiver.lstCVarEmailReceiver.Add(objCVarEmailReceiver);
                                            }

                                            if (pIsCustodySettlement == 0)
                                                objCEmailReceiver.SaveMethod(objCEmailReceiver.lstCVarEmailReceiver);
                                        
                                        
                                    }
                                    else if (CompanyName == "MES" && objCA_PaymentRequest.lstCVarA_PaymentRequest[0].DueDate > DateTime.Now)
                                    {
                                        CA_PaymentRequestDueDateAlarm objA_PaymentRequestDueDateAlarm = new CA_PaymentRequestDueDateAlarm();
                                        string[] ReceiverUsers = PReceiverUsers.Split(',');
                                        //if(PReceiverUsers != "0")
                                        for (int j = 0; j < ReceiverUsers.Length; j++)
                                        {
                                            CVarA_PaymentRequestDueDateAlarm objCVarA_PaymentRequestDueDateAlarm = new CVarA_PaymentRequestDueDateAlarm();
                                            objCVarA_PaymentRequestDueDateAlarm.ID = 0;
                                            objCVarA_PaymentRequestDueDateAlarm.PaymentRequestID =int.Parse(currentID);
                                            objCVarA_PaymentRequestDueDateAlarm.UserID = Convert.ToInt32(ReceiverUsers[j]);
                                            objCVarA_PaymentRequestDueDateAlarm.IsFinish = false;
                                            objCVarA_PaymentRequestDueDateAlarm.DueDate = objCA_PaymentRequest.lstCVarA_PaymentRequest[0].DueDate;
                                            objA_PaymentRequestDueDateAlarm.lstCVarA_PaymentRequestDueDateAlarm.Add(objCVarA_PaymentRequestDueDateAlarm);
                                        }

                                        if (pIsCustodySettlement == 0)
                                            objA_PaymentRequestDueDateAlarm.SaveMethod(objA_PaymentRequestDueDateAlarm.lstCVarA_PaymentRequestDueDateAlarm);
                                    }
                                    else
                                    {
                                        //Insert notification
                                        CEmail objCEmail = new CEmail();
                                        CVarEmail objCVarEmail = new CVarEmail();
                                        objCVarEmail.ID = 0;
                                        if (objCA_PaymentRequest.lstCVarA_PaymentRequest.Count > 0)
                                            objCVarEmail.Subject = " Payment Request " + objCA_PaymentRequest.lstCVarA_PaymentRequest[0].Code + " - طلب صرف";
                                        else
                                            objCVarEmail.Subject = " Payment Request  - طلب صرف";
                                        objCVarEmail.Body = "Payment Request/" + currentID.ToString() + "";// " Payment request with code "+ objCA_PaymentRequest.lstCVarA_PaymentRequest[0].Code + " ";
                                        objCVarEmail.SenderUserID = WebSecurity.CurrentUserId;
                                        objCVarEmail.SendingDate = DateTime.Now;
                                        objCEmail.lstCVarEmail.Add(objCVarEmail);
                                        if (pIsCustodySettlement == 0)
                                            objCEmail.SaveMethod(objCEmail.lstCVarEmail);

                                        CEmailReceiver objCEmailReceiver = new CEmailReceiver();
                                        string[] ReceiverUsers = PReceiverUsers.Split(',');
                                        //if(PReceiverUsers != "0")
                                        for (int j = 0; j < ReceiverUsers.Length; j++)
                                        {
                                            CVarEmailReceiver objCVarEmailReceiver = new CVarEmailReceiver();
                                            objCVarEmailReceiver.ID = 0;
                                            objCVarEmailReceiver.EmailID = objCVarEmail.ID;
                                            objCVarEmailReceiver.ReceiverUserID = Convert.ToInt32(ReceiverUsers[j]);
                                            objCVarEmailReceiver.IsAlarm = true;
                                            objCVarEmailReceiver.ReceivingDate = DateTime.Parse("01-01-1900");
                                            objCEmailReceiver.lstCVarEmailReceiver.Add(objCVarEmailReceiver);
                                        }

                                        if (pIsCustodySettlement == 0)
                                            objCEmailReceiver.SaveMethod(objCEmailReceiver.lstCVarEmailReceiver);
                                    }
                                    
                                }
                            }
                            else
                            {
                                if (CompanyName == "MES" && objCA_PaymentRequest.lstCVarA_PaymentRequest[0].DueDate <= DateTime.Now)
                                {
                                    CA_PaymentRequestDueDateAlarm objA_PaymentRequestDueDateAlarmCheck = new CA_PaymentRequestDueDateAlarm();
                                    objA_PaymentRequestDueDateAlarmCheck.GetList("where PaymentRequestID=" + currentID.ToString());

                                    if (objA_PaymentRequestDueDateAlarmCheck.lstCVarA_PaymentRequestDueDateAlarm.Count > 0 && objA_PaymentRequestDueDateAlarmCheck.lstCVarA_PaymentRequestDueDateAlarm[0].IsFinish == false)
                                    {
                                        //Insert notification
                                        CEmail objCEmail = new CEmail();
                                        CVarEmail objCVarEmail = new CVarEmail();
                                        objCVarEmail.ID = 0;
                                        if (objCA_PaymentRequest.lstCVarA_PaymentRequest.Count > 0)
                                            objCVarEmail.Subject = " Payment Request " + objCA_PaymentRequest.lstCVarA_PaymentRequest[0].Code + " - طلب صرف";
                                        else
                                            objCVarEmail.Subject = " Payment Request  - طلب صرف";
                                        objCVarEmail.Body = "Payment Request/" + currentID.ToString() + "";// " Payment request with code "+ objCA_PaymentRequest.lstCVarA_PaymentRequest[0].Code + " ";
                                        objCVarEmail.SenderUserID = WebSecurity.CurrentUserId;
                                        objCVarEmail.SendingDate = DateTime.Now;
                                        objCEmail.lstCVarEmail.Add(objCVarEmail);
                                        if (pIsCustodySettlement == 0)
                                            objCEmail.SaveMethod(objCEmail.lstCVarEmail);

                                        CEmailReceiver objCEmailReceiver = new CEmailReceiver();
                                        string[] ReceiverUsers = PReceiverUsers.Split(',');
                                        //if(PReceiverUsers != "0")
                                        for (int j = 0; j < ReceiverUsers.Length; j++)
                                        {
                                            CVarEmailReceiver objCVarEmailReceiver = new CVarEmailReceiver();
                                            objCVarEmailReceiver.ID = 0;
                                            objCVarEmailReceiver.EmailID = objCVarEmail.ID;
                                            objCVarEmailReceiver.ReceiverUserID = Convert.ToInt32(ReceiverUsers[j]);
                                            objCVarEmailReceiver.IsAlarm = true;
                                            objCVarEmailReceiver.ReceivingDate = DateTime.Parse("01-01-1900");
                                            objCEmailReceiver.lstCVarEmailReceiver.Add(objCVarEmailReceiver);
                                        }

                                        if (pIsCustodySettlement == 0)
                                            objCEmailReceiver.SaveMethod(objCEmailReceiver.lstCVarEmailReceiver);
                                    }
                                    
                                }
                                else if (CompanyName == "MES" && objCA_PaymentRequest.lstCVarA_PaymentRequest[0].DueDate > DateTime.Now)
                                {
                                    CA_PaymentRequestDueDateAlarm objA_PaymentRequestDueDateAlarm = new CA_PaymentRequestDueDateAlarm();
                                    string[] ReceiverUsers = PReceiverUsers.Split(',');
                                    //if(PReceiverUsers != "0")
                                    for (int j = 0; j < ReceiverUsers.Length; j++)
                                    {
                                        CVarA_PaymentRequestDueDateAlarm objCVarA_PaymentRequestDueDateAlarm = new CVarA_PaymentRequestDueDateAlarm();
                                        objCVarA_PaymentRequestDueDateAlarm.ID = 0;
                                        objCVarA_PaymentRequestDueDateAlarm.PaymentRequestID = int.Parse(currentID);
                                        objCVarA_PaymentRequestDueDateAlarm.UserID = Convert.ToInt32(ReceiverUsers[j]);
                                        objCVarA_PaymentRequestDueDateAlarm.IsFinish = false;
                                        objCVarA_PaymentRequestDueDateAlarm.DueDate = objCA_PaymentRequest.lstCVarA_PaymentRequest[0].DueDate;
                                        objA_PaymentRequestDueDateAlarm.lstCVarA_PaymentRequestDueDateAlarm.Add(objCVarA_PaymentRequestDueDateAlarm);
                                    }

                                    if (pIsCustodySettlement == 0)
                                        objA_PaymentRequestDueDateAlarm.SaveMethod(objA_PaymentRequestDueDateAlarm.lstCVarA_PaymentRequestDueDateAlarm);
                                }
                                else
                                {
                                    //Insert notification
                                    CEmail objCEmail = new CEmail();
                                    CVarEmail objCVarEmail = new CVarEmail();
                                    objCVarEmail.ID = 0;
                                    if (objCA_PaymentRequest.lstCVarA_PaymentRequest.Count > 0)
                                        objCVarEmail.Subject = " Payment Request " + objCA_PaymentRequest.lstCVarA_PaymentRequest[0].Code + " - طلب صرف";
                                    else
                                        objCVarEmail.Subject = " Payment Request  - طلب صرف";
                                    objCVarEmail.Body = "Payment Request/" + currentID.ToString() + "";// " Payment request with code "+ objCA_PaymentRequest.lstCVarA_PaymentRequest[0].Code + " ";
                                    objCVarEmail.SenderUserID = WebSecurity.CurrentUserId;
                                    objCVarEmail.SendingDate = DateTime.Now;
                                    objCEmail.lstCVarEmail.Add(objCVarEmail);
                                    if (pIsCustodySettlement == 0)
                                        objCEmail.SaveMethod(objCEmail.lstCVarEmail);

                                    CEmailReceiver objCEmailReceiver = new CEmailReceiver();
                                    string[] ReceiverUsers = PReceiverUsers.Split(',');
                                    //if(PReceiverUsers != "0")
                                    for (int j = 0; j < ReceiverUsers.Length; j++)
                                    {
                                        CVarEmailReceiver objCVarEmailReceiver = new CVarEmailReceiver();
                                        objCVarEmailReceiver.ID = 0;
                                        objCVarEmailReceiver.EmailID = objCVarEmail.ID;
                                        objCVarEmailReceiver.ReceiverUserID = Convert.ToInt32(ReceiverUsers[j]);
                                        objCVarEmailReceiver.IsAlarm = true;
                                        objCVarEmailReceiver.ReceivingDate = DateTime.Parse("01-01-1900");
                                        objCEmailReceiver.lstCVarEmailReceiver.Add(objCVarEmailReceiver);
                                    }

                                    if (pIsCustodySettlement == 0)
                                        objCEmailReceiver.SaveMethod(objCEmailReceiver.lstCVarEmailReceiver);
                                }
                                
                            }
                            
                            
                        }
                        #endregion

                    }

                    if (checkException == null && ErrorMessage == "")
                    {
                        #region  Custody Settlement has been approved
                        CEmail objCEmails = new CEmail();
                        CVarEmail objCVarEmails = new CVarEmail();
                        CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
                        string ReceiverUserID = objCCustomizedDBCall.CallStringFunction("SELECT TOP 1 e.SenderUserID FROM Email AS e WHERE e.Body LIKE '%Payment Request/" + currentID.ToString() + "%'");
                        objCA_PaymentRequest.GetList("WHERE ID=" + currentID.ToString());

                        string CurrencyCode = objCCustomizedDBCall.CallStringFunction("SELECT code FROM Currencies WHERE id =" + objCA_PaymentRequest.lstCVarA_PaymentRequest[0].CurrencyID);

                        objCVarEmails.ID = 0;
                        if (objCA_PaymentRequest.lstCVarA_PaymentRequest.Count > 0)
                        {
                            if (pIsCustodySettlement == 0)
                            {
                                objCVarEmails.Subject = " The request has been approved " + objCA_PaymentRequest.lstCVarA_PaymentRequest[0].Code + " " + CurrencyCode + " - تم إعتماد طلب الصرف";
                            }
                            else
                            {
                                objCVarEmails.Subject = " The Custody Settlement has been approved - تم إعتماد تسوية العهد";
                            }
                        }
                        else
                        {
                            if (pIsCustodySettlement == 0)
                            {
                                objCVarEmails.Subject = " The request has been approved - تم إعتماد طلب الصرف";
                            }
                            else
                            {
                                objCVarEmails.Subject = " The Custody Settlement has been approved - تم إعتماد تسوية العهد";
                            }
                        }


                        objCVarEmails.Body = "The request has been approved/" + currentID.ToString() + "";// " Payment request with code "+ objCA_PaymentRequest.lstCVarA_PaymentRequest[0].Code + " ";
                        objCVarEmails.SenderUserID = WebSecurity.CurrentUserId;
                        objCVarEmails.SendingDate = DateTime.Now;
                        objCEmails.lstCVarEmail.Add(objCVarEmails);
                       if (pIsCustodySettlement == 1)
                        checkException = objCEmails.SaveMethod(objCEmails.lstCVarEmail);

                        CEmailReceiver objCEmailReceivers = new CEmailReceiver();
                        string[] ReceiverUser = PReceiverUsers.Split(',');
                        //if(PReceiverUsers != "0")
                        for (int j = 0; j < ReceiverUser.Length; j++)
                        {
                            CVarEmailReceiver objCVarEmailReceiver = new CVarEmailReceiver();
                            objCVarEmailReceiver.ID = 0;
                            objCVarEmailReceiver.EmailID = objCVarEmails.ID;
                            objCVarEmailReceiver.ReceiverUserID = Convert.ToInt32(ReceiverUserID);
                            objCVarEmailReceiver.IsAlarm = true;
                            objCVarEmailReceiver.ReceivingDate = DateTime.Parse("01-01-1900");
                            objCEmailReceivers.lstCVarEmailReceiver.Add(objCVarEmailReceiver);
                        }

                        if (pIsCustodySettlement == 1)
                        checkException = objCEmailReceivers.SaveMethod(objCEmailReceivers.lstCVarEmailReceiver);
                        #endregion
                    }

                 
                }
            if (checkException == null && ErrorMessage == "")
            {
                foreach (var currentID in pDeletedPaymentRequestIDs.Split(','))
                {


                    if (CompanyName == "MES")
                    {

                        CA_PaymentRequestCollectedDetails cA_PaymentRequestCollectedDetails = new CA_PaymentRequestCollectedDetails();
                        cA_PaymentRequestCollectedDetails.GetList($"where PaymentRequestID ={currentID} ");
                        if (cA_PaymentRequestCollectedDetails.lstCVarA_PaymentRequestCollectedDetails.Count == 0)
                        {


                            if (ApproveStages)
                            {
                                objCA_AccreditationMovement.GetList("where PaymentRequestID=" + currentID.ToString());

                                if (objCA_AccreditationMovement.lstCVarA_AccreditationMovement[0].ApproveLevel == 2)
                                {
                                    CEmail objCEmail = new CEmail();
                                    objCEmail.GetList(" Where ID in (select EmailID from EmailReceiver where IsAlarm=1 ) And  ( Body like '%Approve Payment Request/%' ) OR ( Body like '%Approve Custody Settlement/%' )");
                                    for (int i = 0; i < objCEmail.lstCVarEmail.Count; i++)
                                    {
                                        int bodyLength = objCEmail.lstCVarEmail[i].Body.Split('/').Length;
                                        if (bodyLength > 0)
                                        {
                                            if (Convert.ToInt32(currentID) == Convert.ToInt32(objCEmail.lstCVarEmail[i].Body.Split('/')[1]))
                                            {
                                                CEmailReceiver objCEmailReceiver = new CEmailReceiver();
                                                checkException = objCEmailReceiver.UpdateList("IsAlarm=" + "0" + " WHERE EmailID=" + objCEmail.lstCVarEmail[i].ID.ToString());


                                            }
                                        }
                                    }
                                }
                                else
                                {

                                    objCA_PaymentRequest.GetList("  Where ID = " + currentID.ToString());
                                    CEmail objCEmail = new CEmail();
                                    CVarEmail objCVarEmail = new CVarEmail();
                                    objCVarEmail.ID = 0;

                                    if (objCA_PaymentRequest.lstCVarA_PaymentRequest.Count > 0)
                                        objCVarEmail.Subject = "Approve Payment Request " + objCA_PaymentRequest.lstCVarA_PaymentRequest[0].Code + " - طلب صرف ";
                                    else
                                        objCVarEmail.Subject = "Approve  Payment Request  - طلب صرف";
                                    objCVarEmail.Body = "Approve Payment Request/" + currentID.ToString() + "";



                                    /*objCVarEmail.Body = "Approve Payment Request/" + objCVarA_PaymentRequest.ID.ToString() + "";*/// " Payment request with code "+ objCA_PaymentRequest.lstCVarA_PaymentRequest[0].Code + " ";
                                    objCVarEmail.SenderUserID = WebSecurity.CurrentUserId;
                                    objCVarEmail.SendingDate = DateTime.Now;
                                    objCEmail.lstCVarEmail.Add(objCVarEmail);
                                    //if (paymentRequestData.pIsCustodySettlement == 0)
                                    objCEmail.SaveMethod(objCEmail.lstCVarEmail);

                                    CEmailReceiver objCEmailReceiver = new CEmailReceiver();
                                    string[] ReceiverUsers = PReceiverUsers.Split(',');

                                    //if(PReceiverUsers != "0")
                                    for (int j = 0; j < ReceiverUsers.Length; j++)
                                    {
                                        CVarEmailReceiver objCVarEmailReceiver = new CVarEmailReceiver();
                                        objCVarEmailReceiver.ID = 0;
                                        objCVarEmailReceiver.EmailID = objCVarEmail.ID;
                                        objCVarEmailReceiver.ReceiverUserID = Convert.ToInt32(ReceiverUsers[j]);
                                        objCVarEmailReceiver.IsAlarm = true;
                                        objCVarEmailReceiver.ReceivingDate = DateTime.Parse("01-01-1900");
                                        objCEmailReceiver.lstCVarEmailReceiver.Add(objCVarEmailReceiver);
                                    }

                                    //if (paymentRequestData.pIsCustodySettlement == 0)
                                    objCEmailReceiver.SaveMethod(objCEmailReceiver.lstCVarEmailReceiver);


                                }
                            }
                            else
                            {
                                CEmail objCEmail = new CEmail();
                                objCEmail.GetList(" Where ( Body like '%Approve Payment Request/%' ) OR ( Body like '%Approve Custody Settlement/%' )");
                                for (int i = 0; i < objCEmail.lstCVarEmail.Count; i++)
                                {
                                    int bodyLength = objCEmail.lstCVarEmail[i].Body.Split('/').Length;
                                    if (bodyLength > 0)
                                    {
                                        if (Convert.ToInt32(currentID) == Convert.ToInt32(objCEmail.lstCVarEmail[i].Body.Split('/')[1]))
                                        {
                                            CEmailReceiver objCEmailReceiver = new CEmailReceiver();
                                            checkException = objCEmailReceiver.UpdateList("IsAlarm=" + "0" + " WHERE EmailID=" + objCEmail.lstCVarEmail[i].ID.ToString());


                                        }
                                    }
                                }
                            }


                        }
                    }
                    else
                    {



                        if (ApproveStages)
                        {
                            objCA_AccreditationMovement.GetList("where PaymentRequestID=" + currentID.ToString());

                            if (objCA_AccreditationMovement.lstCVarA_AccreditationMovement[0].ApproveLevel == 2)
                            {
                                CEmail objCEmail = new CEmail();
                                objCEmail.GetList(" Where ID in (select EmailID from EmailReceiver where IsAlarm=1 ) And  ( Body like '%Approve Payment Request/%' ) OR ( Body like '%Approve Custody Settlement/%' )");
                                for (int i = 0; i < objCEmail.lstCVarEmail.Count; i++)
                                {
                                    int bodyLength = objCEmail.lstCVarEmail[i].Body.Split('/').Length;
                                    if (bodyLength > 0)
                                    {
                                        if (Convert.ToInt32(currentID) == Convert.ToInt32(objCEmail.lstCVarEmail[i].Body.Split('/')[1]))
                                        {
                                            CEmailReceiver objCEmailReceiver = new CEmailReceiver();
                                            checkException = objCEmailReceiver.UpdateList("IsAlarm=" + "0" + " WHERE EmailID=" + objCEmail.lstCVarEmail[i].ID.ToString());


                                        }
                                    }
                                }
                            }
                            else
                            {

                                objCA_PaymentRequest.GetList("  Where ID = " + currentID.ToString());
                                CEmail objCEmail = new CEmail();
                                CVarEmail objCVarEmail = new CVarEmail();
                                objCVarEmail.ID = 0;

                                if (objCA_PaymentRequest.lstCVarA_PaymentRequest.Count > 0)
                                    objCVarEmail.Subject = "Approve Payment Request " + objCA_PaymentRequest.lstCVarA_PaymentRequest[0].Code + " - طلب صرف ";
                                else
                                    objCVarEmail.Subject = "Approve  Payment Request  - طلب صرف";
                                objCVarEmail.Body = "Approve Payment Request/" + currentID.ToString() + "";



                                /*objCVarEmail.Body = "Approve Payment Request/" + objCVarA_PaymentRequest.ID.ToString() + "";*/// " Payment request with code "+ objCA_PaymentRequest.lstCVarA_PaymentRequest[0].Code + " ";
                                objCVarEmail.SenderUserID = WebSecurity.CurrentUserId;
                                objCVarEmail.SendingDate = DateTime.Now;
                                objCEmail.lstCVarEmail.Add(objCVarEmail);
                                //if (paymentRequestData.pIsCustodySettlement == 0)
                                objCEmail.SaveMethod(objCEmail.lstCVarEmail);

                                CEmailReceiver objCEmailReceiver = new CEmailReceiver();
                                string[] ReceiverUsers = PReceiverUsers.Split(',');

                                //if(PReceiverUsers != "0")
                                for (int j = 0; j < ReceiverUsers.Length; j++)
                                {
                                    CVarEmailReceiver objCVarEmailReceiver = new CVarEmailReceiver();
                                    objCVarEmailReceiver.ID = 0;
                                    objCVarEmailReceiver.EmailID = objCVarEmail.ID;
                                    objCVarEmailReceiver.ReceiverUserID = Convert.ToInt32(ReceiverUsers[j]);
                                    objCVarEmailReceiver.IsAlarm = true;
                                    objCVarEmailReceiver.ReceivingDate = DateTime.Parse("01-01-1900");
                                    objCEmailReceiver.lstCVarEmailReceiver.Add(objCVarEmailReceiver);
                                }

                                //if (paymentRequestData.pIsCustodySettlement == 0)
                                objCEmailReceiver.SaveMethod(objCEmailReceiver.lstCVarEmailReceiver);


                            }
                        }
                        else
                        {
                            CEmail objCEmail = new CEmail();
                            objCEmail.GetList(" Where ( Body like '%Approve Payment Request/%' ) OR ( Body like '%Approve Custody Settlement/%' )");
                            for (int i = 0; i < objCEmail.lstCVarEmail.Count; i++)
                            {
                                int bodyLength = objCEmail.lstCVarEmail[i].Body.Split('/').Length;
                                if (bodyLength > 0)
                                {
                                    if (Convert.ToInt32(currentID) == Convert.ToInt32(objCEmail.lstCVarEmail[i].Body.Split('/')[1]))
                                    {
                                        CEmailReceiver objCEmailReceiver = new CEmailReceiver();
                                        checkException = objCEmailReceiver.UpdateList("IsAlarm=" + "0" + " WHERE EmailID=" + objCEmail.lstCVarEmail[i].ID.ToString());


                                    }
                                }
                            }
                        }

                    }


                    #region iddiff
                    CA_PaymentRequest objCA_PaymentRequestcheck = new CA_PaymentRequest();
                    objCA_PaymentRequestcheck.GetList("where ID=" + currentID);
                    CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
                    Decimal EstmatedCost = 0;
                    Decimal ActualCost = 0;

                    if (objCA_PaymentRequestcheck.lstCVarA_PaymentRequest.Count > 0)
                    {
                        EstmatedCost = objCA_PaymentRequestcheck.lstCVarA_PaymentRequest[0].TotalEstmatedCost;
                        ActualCost = objCA_PaymentRequestcheck.lstCVarA_PaymentRequest[0].TotalActualCost;

                    }

                    if (ActualCost != EstmatedCost)
                    {
                        if (pIsCustodySettlement == 1 && objCA_PaymentRequestcheck.lstCVarA_PaymentRequest.Count > 0 && objCA_PaymentRequestcheck.lstCVarA_PaymentRequest[0].isDiff == true)
                        {
                            //Insert notification
                            if (CompanyName == "MES")
                            {

                                CA_PaymentRequestCollectedDetails cA_PaymentRequestCollectedDetails = new CA_PaymentRequestCollectedDetails();
                                cA_PaymentRequestCollectedDetails.GetList($"where PaymentRequestID ={currentID} ");
                                if (cA_PaymentRequestCollectedDetails.lstCVarA_PaymentRequestCollectedDetails.Count == 0)
                                {
                                    CEmail objCEmailCheck = new CEmail();
                                    CVarEmail objCVarEmailCheck = new CVarEmail();
                                    objCVarEmailCheck.ID = 0;

                                    objCVarEmailCheck.Subject = ActualCost > EstmatedCost ? " Payment Request " + objCA_PaymentRequest.lstCVarA_PaymentRequest[0].Code + " - اذن صرف" : " Payment Request " + objCA_PaymentRequest.lstCVarA_PaymentRequest[0].Code + " - اذن استلام";

                                    objCVarEmailCheck.Body = "Payment Request/" + currentID.ToString() + "";// " Payment request with code "+ objCA_PaymentRequest.lstCVarA_PaymentRequest[0].Code + " ";
                                    objCVarEmailCheck.SenderUserID = WebSecurity.CurrentUserId;
                                    objCVarEmailCheck.SendingDate = DateTime.Now;
                                    objCEmailCheck.lstCVarEmail.Add(objCVarEmailCheck);
                                    if (pIsCustodySettlement == 1)
                                        objCEmailCheck.SaveMethod(objCEmailCheck.lstCVarEmail);

                                    CEmailReceiver objCEmailReceiver = new CEmailReceiver();
                                    string[] ReceiverUsers = PReceiverUsers.Split(',');
                                    //if(PReceiverUsers != "0")
                                    for (int j = 0; j < ReceiverUsers.Length; j++)
                                    {
                                        CVarEmailReceiver objCVarEmailReceiver = new CVarEmailReceiver();
                                        objCVarEmailReceiver.ID = 0;
                                        objCVarEmailReceiver.EmailID = objCVarEmailCheck.ID;
                                        objCVarEmailReceiver.ReceiverUserID = Convert.ToInt32(ReceiverUsers[j]);
                                        objCVarEmailReceiver.IsAlarm = true;
                                        objCVarEmailReceiver.ReceivingDate = DateTime.Parse("01-01-1900");
                                        objCEmailReceiver.lstCVarEmailReceiver.Add(objCVarEmailReceiver);
                                    }

                                    if (pIsCustodySettlement == 1)
                                        objCEmailReceiver.SaveMethod(objCEmailReceiver.lstCVarEmailReceiver);
                                }
                            }
                            else
                            {
                                CEmail objCEmailCheck = new CEmail();
                                CVarEmail objCVarEmailCheck = new CVarEmail();
                                objCVarEmailCheck.ID = 0;

                                objCVarEmailCheck.Subject = ActualCost > EstmatedCost ? " Payment Request " + objCA_PaymentRequest.lstCVarA_PaymentRequest[0].Code + " - اذن صرف" : " Payment Request " + objCA_PaymentRequest.lstCVarA_PaymentRequest[0].Code + " - اذن استلام";

                                objCVarEmailCheck.Body = "Payment Request/" + currentID.ToString() + "";// " Payment request with code "+ objCA_PaymentRequest.lstCVarA_PaymentRequest[0].Code + " ";
                                objCVarEmailCheck.SenderUserID = WebSecurity.CurrentUserId;
                                objCVarEmailCheck.SendingDate = DateTime.Now;
                                objCEmailCheck.lstCVarEmail.Add(objCVarEmailCheck);
                                if (pIsCustodySettlement == 1)
                                    objCEmailCheck.SaveMethod(objCEmailCheck.lstCVarEmail);

                                CEmailReceiver objCEmailReceiver = new CEmailReceiver();
                                string[] ReceiverUsers = PReceiverUsers.Split(',');
                                //if(PReceiverUsers != "0")
                                for (int j = 0; j < ReceiverUsers.Length; j++)
                                {
                                    CVarEmailReceiver objCVarEmailReceiver = new CVarEmailReceiver();
                                    objCVarEmailReceiver.ID = 0;
                                    objCVarEmailReceiver.EmailID = objCVarEmailCheck.ID;
                                    objCVarEmailReceiver.ReceiverUserID = Convert.ToInt32(ReceiverUsers[j]);
                                    objCVarEmailReceiver.IsAlarm = true;
                                    objCVarEmailReceiver.ReceivingDate = DateTime.Parse("01-01-1900");
                                    objCEmailReceiver.lstCVarEmailReceiver.Add(objCVarEmailReceiver);
                                }

                                if (pIsCustodySettlement == 1)
                                    objCEmailReceiver.SaveMethod(objCEmailReceiver.lstCVarEmailReceiver);
                            }
                          
                        }

                    }

                    #endregion

                }




            }
            if (checkException != null || ErrorMessage != "") // an exception is caught in the model
            {
                _result = false;
                if (ErrorMessage == "")
                    ErrorMessage = checkException.Message;
            }
            else
                _result = true;

		
            return ErrorMessage;
        }
        [HttpGet, HttpPost]
        public string Reject(String pDeletedPaymentRequestIDs, String PReceiverUsers, int pIsCustodySettlement,string pReason)
        {
            string ErrorMessage = "";
            int _RowCount = 0;
            Exception checkException = null;
            bool _result = false;
            CCustomizedDBCall objCPaymentsCustomizedDBCall = new CCustomizedDBCall();

            CA_PaymentRequest objCA_PaymentRequest = new CA_PaymentRequest();
            CA_AccreditationMovement objCA_AccreditationMovement = new CA_AccreditationMovement();
            CvwDefaults objCvwDefaults = new CvwDefaults();
            objCvwDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount); //i am sure i ve just one row isa

            CSystemOptions objCSystemOptions = new CSystemOptions();
            //objCSystemOptions.GetItem(55);
            objCSystemOptions.GetList(" WHERE OptionID IN (4051) ORDER BY OptionID");  //LinkUserAndSafes & LinkUserAndBanks
            bool ApproveForMes = objCSystemOptions.lstCVarSystemOptions[0].OptionValue;

            objCSystemOptions.GetList(" WHERE OptionID IN (4055) ORDER BY OptionID");  //LinkUserAndSafes & LinkUserAndBanks
            bool ApproveStages = objCSystemOptions.lstCVarSystemOptions[0].OptionValue;


            string CompanyName = objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName;

            if (checkException == null && ErrorMessage == "")
            {
                foreach (var currentID in pDeletedPaymentRequestIDs.Split(','))
                {
                    checkException = objCA_PaymentRequest.GetList("WHERE isReject = 1" + " AND ID="+ currentID.ToString());
                    if (objCA_PaymentRequest.lstCVarA_PaymentRequest.Count > 0)
                    {
                        ErrorMessage = "Already Rejected,  تم رفض طلب الصرف سابقا ";

                    }
                    else
                    {
                        if (ApproveForMes)
                        {
                            CombinedIssueVoucherController objCombinedIssueVoucherController = new CombinedIssueVoucherController();
                            var ReturnedObject = objCombinedIssueVoucherController.Reject(Convert.ToInt32(currentID), false, false);
                            ErrorMessage = ReturnedObject[0].ToString();
                        }
                        else
                        {
                            checkException = objCA_PaymentRequest.GetList("WHERE ID=" + currentID.ToString());

                            if (objCA_PaymentRequest.lstCVarA_PaymentRequest[0].JVID == 0)
                            {
                                checkException = objCA_PaymentRequest.UpdateList("isReject=1,IsApprovedRequest=0" + " WHERE ID=" + currentID.ToString());
                                // checkException = objCA_AccreditationMovement.UpdateList("ApproveLevel=0,UserFirstApprove=NULL,UserSecondApprove=NULL" + " WHERE PaymentRequestID=" + currentID.ToString());
                                checkException = objCA_AccreditationMovement.UpdateList("ApproveLevel= case when ApproveLevel > 0 then ApproveLevel -1 else 0 end " + " WHERE PaymentRequestID=" + currentID.ToString());


                                //un Approve
                                if (pIsCustodySettlement == 0 && objCA_PaymentRequest.lstCVarA_PaymentRequest[0].PartnerID != 0)
                                {

                                    if (ApproveForMes)
                                    {
                                        //main
                                        objCPaymentsCustomizedDBCall.ExecuteQuery_DataTable("A_PaymentRequestJVNew_Posting " + currentID.ToString() + "," + WebSecurity.CurrentUserId + "," + false);



                                    }
                                }

                                /// SEND EMAIL TO CREATOR


                                CEmail objCEmail = new CEmail();
                                CVarEmail objCVarEmail = new CVarEmail();
                                objCVarEmail.ID = 0;
                                if (objCA_PaymentRequest.lstCVarA_PaymentRequest.Count > 0)
                                    objCVarEmail.Subject = pReason + " Reject Payment Request/ " + objCA_PaymentRequest.lstCVarA_PaymentRequest[0].Code + " - رفض طلب صرف ";
                                // objCVarEmail.Subject = "Approve Payment Request " + objCA_PaymentRequest.lstCVarA_PaymentRequest[0].Code + " - طلب صرف ";


                                //objCVarEmail.Body = pReason + "/" + currentID.ToString() + "";
                                objCVarEmail.Body = "Approve Payment Request/" + currentID.ToString() + "";


                                /*objCVarEmail.Body = "Approve Payment Request/" + objCVarA_PaymentRequest.ID.ToString() + "";*/// " Payment request with code "+ objCA_PaymentRequest.lstCVarA_PaymentRequest[0].Code + " ";
                                objCVarEmail.SenderUserID = WebSecurity.CurrentUserId;
                                objCVarEmail.SendingDate = DateTime.Now;
                                objCEmail.lstCVarEmail.Add(objCVarEmail);
                                //if (paymentRequestData.pIsCustodySettlement == 0)
                                objCEmail.SaveMethod(objCEmail.lstCVarEmail);

                                CEmailReceiver objCEmailReceiver = new CEmailReceiver();
                                string[] ReceiverUsers = PReceiverUsers.Split(',');
                                //if(PReceiverUsers != "0")
                                for (int j = 0; j < ReceiverUsers.Length; j++)
                                {
                                    CVarEmailReceiver objCVarEmailReceiver = new CVarEmailReceiver();
                                    objCVarEmailReceiver.ID = 0;
                                    objCVarEmailReceiver.EmailID = objCVarEmail.ID;
                                    objCVarEmailReceiver.ReceiverUserID = Convert.ToInt32(ReceiverUsers[j]);
                                    objCVarEmailReceiver.IsAlarm = true;
                                    objCVarEmailReceiver.ReceivingDate = DateTime.Parse("01-01-1900");
                                    objCEmailReceiver.lstCVarEmailReceiver.Add(objCVarEmailReceiver);
                                }

                                //if (paymentRequestData.pIsCustodySettlement == 0)
                                objCEmailReceiver.SaveMethod(objCEmailReceiver.lstCVarEmailReceiver);


                                /////Reson
                                //CEmail objCEmail2 = new CEmail();
                                //CVarEmail objCVarEmail2 = new CVarEmail();
                                //objCVarEmail2.ID = 0;
                                //if (objCA_PaymentRequest.lstCVarA_PaymentRequest.Count > 0)
                                //    objCVarEmail2.Subject =  " - تم رفض طلب صرف ";
                                //// objCVarEmail.Subject = "Approve Payment Request " + objCA_PaymentRequest.lstCVarA_PaymentRequest[0].Code + " - طلب صرف ";


                                //objCVarEmail2.Body = pReason ;
                                ////objCVarEmail2.Body = pReason + "/" + currentID.ToString() + "";




                                ///*objCVarEmail.Body = "Approve Payment Request/" + objCVarA_PaymentRequest.ID.ToString() + "";*/// " Payment request with code "+ objCA_PaymentRequest.lstCVarA_PaymentRequest[0].Code + " ";
                                //objCVarEmail2.SenderUserID = WebSecurity.CurrentUserId;
                                //objCVarEmail2.SendingDate = DateTime.Now;
                                //objCEmail2.lstCVarEmail.Add(objCVarEmail2);
                                ////if (paymentRequestData.pIsCustodySettlement == 0)
                                //objCEmail2.SaveMethod(objCEmail2.lstCVarEmail);

                                //CEmailReceiver objCEmailReceiver2 = new CEmailReceiver();
                                //string[] ReceiverUsers2 = PReceiverUsers.Split(',');
                                ////if(PReceiverUsers != "0")
                                //for (int j = 0; j < ReceiverUsers.Length; j++)
                                //{
                                //    CVarEmailReceiver objCVarEmailReceiver2 = new CVarEmailReceiver();
                                //    objCVarEmailReceiver2.ID = 0;
                                //    objCVarEmailReceiver2.EmailID = objCVarEmail.ID;
                                //    objCVarEmailReceiver2.ReceiverUserID = Convert.ToInt32(ReceiverUsers[j]);
                                //    objCVarEmailReceiver2.IsAlarm = true;
                                //    objCVarEmailReceiver2.ReceivingDate = DateTime.Parse("01-01-1900");
                                //    objCEmailReceiver2.lstCVarEmailReceiver.Add(objCVarEmailReceiver2);
                                //}

                                ////if (paymentRequestData.pIsCustodySettlement == 0)
                                //objCEmailReceiver2.SaveMethod(objCEmailReceiver2.lstCVarEmailReceiver);

                            }
                        }
                        

                    }




                }




            }
            if (checkException != null || ErrorMessage != "") // an exception is caught in the model
            {
                _result = false;
                if (ErrorMessage == "")
                    ErrorMessage = checkException.Message;
            }
            else
                _result = true;

            return ErrorMessage;
        }

        [HttpGet, HttpPost]
        public string UnApprove(String pDeletedPaymentRequestIDs, String PReceiverUsers, int pIsCustodySettlement)
        {
         
            string ErrorMessage = "";
            Exception checkException = null;
            bool _result = false;
            Int32 _RowCount2 = 0;
            CvwDefaults objCvwDefaults = new CvwDefaults();
            objCvwDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount2);
            string[] MescoCompanies = new string[5] { "MES", "SAC", "GLO", "EUR", "ALT" };
            bool IsMescoCompany = MescoCompanies.Contains(objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName);
            COperations cOperations = new COperations();
            if (pIsCustodySettlement == 1 && IsMescoCompany)
            {
                bool IsSelectedSettlementsHasAtLeastOneClosedOperation = false;
                pDeletedPaymentRequestIDs.ForEach(pID =>
                {
                    cOperations.GetList($"WHERE ID = (SELECT TOP 1 OperationID FROM A_PaymentRequestDetails WHERE PaymentRequestID = {pID}) AND GETDATE() >= CloseDate");
                    if (cOperations.lstCVarOperations.Count > 0 && !IsSelectedSettlementsHasAtLeastOneClosedOperation)
                    {
                        IsSelectedSettlementsHasAtLeastOneClosedOperation = true;
                    }

                });
                if(IsSelectedSettlementsHasAtLeastOneClosedOperation)
                    return "Operation is closed. Settlement cannot be unapproved.";

                CA_VoucherPaymentRequestSettle objCA_VoucherPaymentRequestSettle = new CA_VoucherPaymentRequestSettle();
                objCA_VoucherPaymentRequestSettle.GetList("Where PaymentRequestID in(" + pDeletedPaymentRequestIDs + ")");
                if(objCA_VoucherPaymentRequestSettle.lstCVarA_VoucherPaymentRequestSettle.Count > 0)
                    return "Payment Request Settled. Settlement cannot be unapproved.";

                CA_AccreditationMovement objCA_AccreditationMovement = new CA_AccreditationMovement();
                objCA_AccreditationMovement.GetList("Where  VoucherSett is not null and PaymentRequestID in(" + pDeletedPaymentRequestIDs + ")");
                if(objCA_AccreditationMovement.lstCVarA_AccreditationMovement.Count > 0)
                    return "Payment Request Settled. Settlement cannot be unapproved.";
            }
            // نتأكد ان العمليات المربوطة بتفاصيل طلب الدفع مش مربوطة بفواتير
            var OperationConditions = " WHERE (dbo.Operations.ID IN(SELECT aprd.OperationID FROM dbo.A_PaymentRequestDetails AS aprd WHERE aprd.PaymentRequestID  IN(" + pDeletedPaymentRequestIDs + "))AND(SELECT COUNT(i.InvoiceNumber)  FROM dbo.Invoices AS i WHERE   ISNULL( i.IsDeleted , 0 ) = 0 AND i.OperationID = dbo.Operations.ID) > 0)";
            cOperations.GetList(OperationConditions);
            //if (cOperations.lstCVarOperations != null && cOperations.lstCVarOperations.Count > 0)
            //{
            //    ErrorMessage = "" + String.Join(",", cOperations.lstCVarOperations.Select(x => x.Code)) + "  العمليات المربوطة  عليها فواتير  ";


            //    ErrorMessage = ErrorMessage + "\r\n" + "----------------" + "\r\n";
            //}
            



            string CompanyName = objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName;

            CCustomizedDBCall objCPaymentsCustomizedDBCall = new CCustomizedDBCall();
            CvwPayables cApprovedPayables = new CvwPayables();
            var ApprovedPayableCondition = "WHERE(dbo.vwPayables.ID  IN(SELECT aprd.PayableID FROM dbo.A_PaymentRequestDetails AS aprd  WHERE not exists (select 1 from A_PaymentRequest R where R.ID= PaymentRequestID and IsGeneratedSupplierJV=1) aprd.PaymentRequestID  IN(" + pDeletedPaymentRequestIDs + ")) AND(IsNull(dbo.vwPayables.IsApproved, 0) = 1))";
            //cApprovedPayables.GetList(ApprovedPayableCondition);
            var _RowCount1 = 0;
            cApprovedPayables.GetListPaging(999999, 1, ApprovedPayableCondition, "Name", out _RowCount1);
            if (cApprovedPayables.lstCVarvwPayables != null && cApprovedPayables.lstCVarvwPayables.Count > 0)
            {
                ErrorMessage = ErrorMessage + "" + String.Join(",", cApprovedPayables.lstCVarvwPayables.Select(x => x.OperationCode)) + "  العمليات المربوطة  عليها مصروفات معتمدة  ";
                //OperationCode

                ErrorMessage = ErrorMessage + "\r\n" + "----------------" + "\r\n";
            }


            if (pIsCustodySettlement == 0)
            {
                CA_Voucher cA_Voucher = new CA_Voucher();
                var VoucherCondition = " WHERE dbo.A_Voucher.ID IN (SELECT apr.VoucherID FROM dbo.A_PaymentRequest AS apr WHERE  ISNULL( apr.VoucherID , 0 ) <> 0 and apr.ID  IN(" + pDeletedPaymentRequestIDs + ") )";
                cA_Voucher.GetList(VoucherCondition);
                if (cA_Voucher.lstCVarA_Voucher != null && cA_Voucher.lstCVarA_Voucher.Count > 0)
                {
                    ErrorMessage = ErrorMessage + "" + String.Join(",", cA_Voucher.lstCVarA_Voucher.Select(x => x.Code)) + "  طلبات الصرف مربوطة باذون الصرف  ";



                    ErrorMessage = ErrorMessage + "\r\n" + "----------------" + "\r\n";
                }

            }

            if (ErrorMessage == "")
            {

                CA_PaymentRequest objCA_PaymentRequest = new CA_PaymentRequest();

                if (pIsCustodySettlement == 0)
                    checkException = objCA_PaymentRequest.GetList("WHERE IsApprovedRequest = " + "0" + " AND ID in (" + pDeletedPaymentRequestIDs + ")");
                else
                    checkException = objCA_PaymentRequest.GetList("WHERE IsApprovedSettlement = " + "0" + " AND ID in (" + pDeletedPaymentRequestIDs + ")");

                if (objCA_PaymentRequest.lstCVarA_PaymentRequest.Count > 0)
                    ErrorMessage = "Already Un Approved,  تم اختيار طلبات غير معتمدة ";
                else
                    foreach (var currentID in pDeletedPaymentRequestIDs.Split(','))
                    {
                        CA_PaymentRequest cA_PaymentRequest = new CA_PaymentRequest();
                        cA_PaymentRequest.GetList(" Where ID = " + currentID + "");
                        //-----------------------------------------------------------------------, IsApprovedSettlement = 0, TotalActualCost = 0 , لما نفك طلب الصرف بتفك التسوية و بتخلي القيمة الفعلية ب 0
                        if (pIsCustodySettlement == 0)
                        {
                            if (cA_PaymentRequest.lstCVarA_PaymentRequest[0].PartnerID != 0
                                || (cA_PaymentRequest.lstCVarA_PaymentRequest[0].PartnerID == 0 && cA_PaymentRequest.lstCVarA_PaymentRequest[0].IsGeneratedSupplierJV))
                                checkException = objCPaymentsCustomizedDBCall.A_SingleID_Posting("A_PaymentRequestSupplierWithoutOperation_UnPosting", currentID.ToString(), WebSecurity.CurrentUserId);
                            if (checkException == null)
                                checkException = objCA_PaymentRequest.UpdateList(" IsAccept=0  , IsApprovedRequest = " + "0" + " WHERE ID=" + currentID.ToString());
                        }
                        else
                            checkException = objCA_PaymentRequest.UpdateList("IsApprovedSettlement=" + "0" + " WHERE ID=" + currentID.ToString());

                        objCA_PaymentRequest.GetList("WHERE ID=" + currentID.ToString());

                        int _RowCount = 0;
                        // string pWhereClause = "";

                        CDefaults objCDefaults = new CDefaults();
                        CUsers objCUsers = new CUsers();
                        checkException = objCDefaults.GetListPaging(999999, 1, "WHERE 1=1", "ID", out _RowCount);

                        CA_PaymentRequestDetails objCA_PaymentRequestDetails = new CA_PaymentRequestDetails();
                        checkException = objCA_PaymentRequestDetails.GetListPaging(999999, 1, "WHERE PaymentRequestID= " + currentID.ToString(), "ID", out _RowCount);
                        CPayables objCPayables = new CPayables();
                        for (int k = 0; k < objCA_PaymentRequestDetails.lstCVarA_PaymentRequestDetails.Count; k++)
                        {
                            objCPayables = new CPayables();

                            CPayables cPayables = new CPayables();
                            CReceivables cReceivables = new CReceivables();
                            CA_PaymentRequestDetails cA_PaymentRequestDetails = new CA_PaymentRequestDetails();
                            CApprovingA_PaymentRequestDetails_log cApprovingA_PaymentRequestDetails_Log = new CApprovingA_PaymentRequestDetails_log();
                            CVarApprovingA_PaymentRequestDetails_log cVarApprovingA_PaymentRequestDetails_Log = new CVarApprovingA_PaymentRequestDetails_log();


                            cVarApprovingA_PaymentRequestDetails_Log.HeaderID = int.Parse(currentID);
                            cVarApprovingA_PaymentRequestDetails_Log.HeaderCode = cA_PaymentRequest.lstCVarA_PaymentRequest[0].Code;
                            cVarApprovingA_PaymentRequestDetails_Log.DetailID = objCA_PaymentRequestDetails.lstCVarA_PaymentRequestDetails[k].ID;
                            cVarApprovingA_PaymentRequestDetails_Log.PayableID = objCA_PaymentRequestDetails.lstCVarA_PaymentRequestDetails[k].PayableID;
                            cVarApprovingA_PaymentRequestDetails_Log.Date = DateTime.Now;
                            cVarApprovingA_PaymentRequestDetails_Log.UserID = WebSecurity.CurrentUserId;
                            cVarApprovingA_PaymentRequestDetails_Log.Notes = " Un-Approve " + objCA_PaymentRequestDetails.lstCVarA_PaymentRequestDetails[k].ID + " " + (pIsCustodySettlement == 0 ? " Request " : " Settlement ");
                            cApprovingA_PaymentRequestDetails_Log.lstCVarApprovingA_PaymentRequestDetails_log.Add(cVarApprovingA_PaymentRequestDetails_Log);

                            if (pIsCustodySettlement == 1)
                            {
                                // --- payment request = 0
                                checkException = cPayables.UpdateList(" CostPrice = 0.00 , CostAmount = 0.00 , InitialSalePrice = 0.00 , AmountWithoutVAT = 0.00  where ID = " + objCA_PaymentRequestDetails.lstCVarA_PaymentRequestDetails[k].PayableID + "");
                            }
                            else
                            {
                                if(!objCA_PaymentRequestDetails.lstCVarA_PaymentRequestDetails[k].FilterChargeTypes && CompanyName != "MES" )
                                {
                                    checkException = cReceivables.UpdateList(" PayableID = null where PayableID = " + objCA_PaymentRequestDetails.lstCVarA_PaymentRequestDetails[k].PayableID + "");
                                    checkException = cA_PaymentRequestDetails.UpdateList(" ActualCost = 0 , PayableID = null where PayableID = " + objCA_PaymentRequestDetails.lstCVarA_PaymentRequestDetails[k].PayableID + "");


                                    checkException = cPayables.DeleteList(" where ID = " + objCA_PaymentRequestDetails.lstCVarA_PaymentRequestDetails[k].PayableID + "");

                                }

                                //if (CompanyName !="MES")
                                //{
                                //    checkException = cPayables.DeleteList(" where ID = " + objCA_PaymentRequestDetails.lstCVarA_PaymentRequestDetails[k].PayableID + "");

                                //}




                            }




                            if (checkException == null)
                            {
                                checkException = cApprovingA_PaymentRequestDetails_Log.SaveMethod(cApprovingA_PaymentRequestDetails_Log.lstCVarApprovingA_PaymentRequestDetails_log);

                                CEmail objCEmail = new CEmail();
                                if (pIsCustodySettlement == 0)
                                    objCEmail.GetList(" Where (Body like '%Payment Request/%') OR (Body like N'%مراجعة العهدة/%') OR (Body like N'%The Payment Request Supplier has been approved/%')  OR (Body like N'%The request has been approved/%') OR (Body like N'%Payment Request Supplier Aprroved/%')   ");
                                else
                                    objCEmail.GetList(" Where (Body like '%The Custody Settlement has been approved%') OR (Body like N'%Approve Custody Settlement/%')   ");

                                //objCEmail.GetList(" Where (Body like '%Payment Request/%') OR (Body like N'%مراجعة العهدة/%')");
                                for (int i = 0; i < objCEmail.lstCVarEmail.Count; i++)
                                {
                                    int bodyLength = objCEmail.lstCVarEmail[i].Body.Split('/').Length;
                                    if (bodyLength > 0)
                                    {
                                        if (Convert.ToInt32(currentID) == Convert.ToInt32(objCEmail.lstCVarEmail[i].Body.Split('/')[1]))
                                        {
                                            CEmailReceiver objCEmailReceiver = new CEmailReceiver();
                                            checkException = objCEmailReceiver.UpdateList("IsAlarm=" + "0" + " WHERE EmailID=" + objCEmail.lstCVarEmail[i].ID.ToString());

                                        }
                                    }
                                }
                            }




                        }


                        #region DeleteA_PaymentRequestDueDateAlarm
                        CA_PaymentRequestDueDateAlarm objA_PaymentRequestDueDateAlarm = new CA_PaymentRequestDueDateAlarm();
                        objA_PaymentRequestDueDateAlarm.DeleteList("where PaymentRequestID="+currentID.ToString());
                        #endregion

                        #region Posting JVNew Mesco

                        if (pIsCustodySettlement == 1)
                        {
                            CSystemOptions objCSystemOptions = new CSystemOptions();
                            //objCSystemOptions.GetItem(55);
                            objCSystemOptions.GetList(" WHERE OptionID IN (4051) ORDER BY OptionID");  //LinkUserAndSafes & LinkUserAndBanks
                            bool ApproveForMes = objCSystemOptions.lstCVarSystemOptions[0].OptionValue;
                            if (ApproveForMes)
                            {
                                //main
                                objCPaymentsCustomizedDBCall.ExecuteQuery_DataTable("A_PaymentRequestJVNew_Posting " + currentID.ToString() + "," + WebSecurity.CurrentUserId + "," + false);
                                //diff
                                //objCPaymentsCustomizedDBCall.ExecuteQuery_DataTable("A_PaymentRequestSettJVNew_Posting " + currentID.ToString() + "," + WebSecurity.CurrentUserId + "," + false);
                                //no diff
                                //if (objCA_PaymentRequest.lstCVarA_PaymentRequest[0].TotalActualCost == objCA_PaymentRequest.lstCVarA_PaymentRequest[0].TotalEstmatedCost)
                                //{
                                //    objCPaymentsCustomizedDBCall.ExecuteQuery_DataTable("A_PaymentRequestJVNewNoDiff_Posting " + currentID.ToString() + "," + WebSecurity.CurrentUserId + "," + false);

                                //}

                            }
                        }
                        if (pIsCustodySettlement == 0 && objCA_PaymentRequest.lstCVarA_PaymentRequest[0].PartnerID != 0)
                        {
                            CSystemOptions objCSystemOptions = new CSystemOptions();
                            //objCSystemOptions.GetItem(55);
                            objCSystemOptions.GetList(" WHERE OptionID IN (4051) ORDER BY OptionID");  //LinkUserAndSafes & LinkUserAndBanks
                            bool ApproveForMes = objCSystemOptions.lstCVarSystemOptions[0].OptionValue;


                            if (ApproveForMes)
                            {
                                //main
                                objCPaymentsCustomizedDBCall.ExecuteQuery_DataTable("A_PaymentRequestJVNew_Posting " + currentID.ToString() + "," + WebSecurity.CurrentUserId + "," + false);



                            }
                        }
                        #endregion
                    }
            }
            if (checkException != null || ErrorMessage != "") // an exception is caught in the model
            {
                _result = false;
            }
            else
                _result = true;

            return ErrorMessage;
        }

        [HttpGet, HttpPost]
        public object[] PaymentRequest_CalcBL(int pBLCalcTypeID, int pContainerID, string pContainerNumber , int pOperationID, decimal pTotalAmount)
        {
            Exception checkException = null;

            CCustomizedDBCall objCPaymentsCustomizedDBCall = new CCustomizedDBCall();
            object[] PaymentRequest_CalcBL = objCPaymentsCustomizedDBCall.A_PaymentRequest_CalcBL("A_PaymentRequest_CalcBL", pBLCalcTypeID, pContainerID,
                pContainerNumber, pOperationID, pTotalAmount, WebSecurity.CurrentUserId);

                 checkException = (Exception)PaymentRequest_CalcBL[0];
            DataTable dataTable = (DataTable)PaymentRequest_CalcBL[1];
            string _MsgError = PaymentRequest_CalcBL[2].ToString();

            // Convert DataTable to a list of dictionaries representing each row
            var rows = dataTable.AsEnumerable().Select(row => dataTable.Columns.Cast<DataColumn>()
                   .ToDictionary(column => column.ColumnName, column => row[column]));

            // Convert list of dictionaries to a list of objects (Payment class in this case)
            List<Payment> paymentList = rows.Select(row => new Payment
            {
                HouseID = Convert.ToInt32(  row["HouseID"]),
                HouseNumber= row["HouseNumber"].ToString(),
                Amount  = Convert.ToDecimal( row["Amount"] ),
                // Set other properties accordingly
            }).ToList();

            if (checkException != null)
                _MsgError = checkException.Message;

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                   serializer.Serialize(paymentList), //pData[0]
                   checkException,
                   _MsgError
                };

        }

        public Exception A_PaymentRequestMultiLevelApproval_Approve(string pStoredProcedureName, long pPaymentRequestID, string pReceiverUsersIDs,int pIsCustodySettlement, int pUserID)
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
                Com.Parameters.Add(new SqlParameter("@ReceiverUsersIDs ", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@IsCustodySettlement ", SqlDbType.Int));
                Com.Parameters.Add(new SqlParameter("@UserID", SqlDbType.Int));

                Com.CommandText = "[dbo]." + pStoredProcedureName;
                Com.Parameters[0].Value = pPaymentRequestID;
                Com.Parameters[1].Value = pReceiverUsersIDs;
                Com.Parameters[2].Value = pIsCustodySettlement;
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
        #endregion PaymentRequest

        //#region PaymentRequestDetails
        //[HttpGet, HttpPost]
        //public object[] InvoiceDetails_Save(Int64 pInvoiceID, Int32 pWarehouseID, Int32 pCustomerID
        //    , Int32 pContractID, string pInvoiceDate, Int32 pCurrencyID, decimal pExchangeRate, string pNotes
        //    , bool pIsPosted, string pPostDate
        //    //Details
        //    , Int64 pInvoiceDetailsID, Int64 pInvoiceDetailsReceiveID, Int64 pInvoiceDetailsPickupID
        //    , Int32 pInvoiceDetailsChargeTypeID, Int64 pInvoiceDetailsContractDetailsID
        //    , decimal pInvoiceDetailsSpacePerPallet, int pInvoiceDetailsDays, decimal pInvoiceDetailsRate
        //    , string pInvoiceDetailsNotes)
        //{
        //    string _MessageReturned = "";
        //    Exception checkException = null;
        //    string _UpdateClause = "";
        //    CWH_Invoice objCWH_Invoice = new CWH_Invoice();
        //    CVarWH_Invoice objCVarWH_Invoice = new CVarWH_Invoice();
        //    CWH_InvoiceDetails objCWH_InvoiceDetails = new CWH_InvoiceDetails();
        //    CVarWH_InvoiceDetails objCVarWH_InvoiceDetails = new CVarWH_InvoiceDetails();
        //    CvwWH_InvoiceDetails objCvwWH_InvoiceDetails = new CvwWH_InvoiceDetails();
        //    #region Save InvoiceHeader
        //    if (pInvoiceID == 0) //Insert
        //    {
        //        objCVarWH_Invoice.ID = pInvoiceID;
        //        objCVarWH_Invoice.Code = "0";
        //        objCVarWH_Invoice.WarehouseID = pWarehouseID;
        //        objCVarWH_Invoice.CustomerID = pCustomerID;
        //        objCVarWH_Invoice.ContractID = pContractID;
        //        objCVarWH_Invoice.InvoiceDate = DateTime.ParseExact(pInvoiceDate + " 00:00:00.000", "d/M/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture);
        //        objCVarWH_Invoice.CurrencyID = pCurrencyID;
        //        objCVarWH_Invoice.ExchangeRate = pExchangeRate;
        //        objCVarWH_Invoice.Notes = pNotes;
        //        objCVarWH_Invoice.IsPosted = pIsPosted;
        //        objCVarWH_Invoice.PostDate = DateTime.ParseExact(pPostDate + " 00:00:00.000", "d/M/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture);
        //        objCVarWH_Invoice.IsDeleted = false;
        //        objCVarWH_Invoice.CreatorUserID = objCVarWH_Invoice.ModificatorUserID = WebSecurity.CurrentUserId;
        //        objCVarWH_Invoice.CreationDate = objCVarWH_Invoice.ModificationDate = DateTime.Now;
        //        objCWH_Invoice.lstCVarWH_Invoice.Add(objCVarWH_Invoice);
        //        checkException = objCWH_Invoice.SaveMethod(objCWH_Invoice.lstCVarWH_Invoice);
        //        pInvoiceID = objCVarWH_Invoice.ID;
        //    }
        //    else //Update Header
        //    {
        //        _UpdateClause = "CustomerID=" + pCustomerID + "\n";
        //        _UpdateClause += ",ContractID=" + (pContractID==0 ? "NULL": pContractID.ToString()) + "\n";
        //        _UpdateClause += (pInvoiceDate == "01/01/1900" ? " ,InvoiceDate = NULL " : (" ,InvoiceDate = N'" + Forwarding.MvcApp.Helpers.DateFunctionsController.GetYYYYMMDDFormat(pInvoiceDate, 1) + "'"));
        //        _UpdateClause += ",CurrencyID=" + (pCurrencyID == 0 ? "NULL" : pCurrencyID.ToString()) + "\n";
        //        _UpdateClause += ",ExchangeRate=" + pExchangeRate + "\n";
        //        _UpdateClause += ",Notes=" + (pNotes == "0" ? "NULL" : ("N'" +pNotes + "'")) + "\n";
        //        _UpdateClause += ",ModificatorUserID = N'" + WebSecurity.CurrentUserId.ToString() + "'" + "\n";
        //        _UpdateClause += ",ModificationDate = GETDATE() " + "\n";
        //        _UpdateClause += " WHERE ID =" + pInvoiceID.ToString();
        //        checkException = objCWH_Invoice.UpdateList(_UpdateClause);
        //    }
        //    #endregion Save InvoiceHeader
        //    #region Save Details
        //    if (checkException != null)
        //        _MessageReturned = checkException.Message;
        //    else //Save Details
        //    {
        //        objCVarWH_InvoiceDetails.ID = pInvoiceDetailsID;
        //        objCVarWH_InvoiceDetails.InvoiceID = pInvoiceID;
        //        objCVarWH_InvoiceDetails.ReceiveID = pInvoiceDetailsReceiveID;
        //        objCVarWH_InvoiceDetails.PickupID = pInvoiceDetailsPickupID;
        //        objCVarWH_InvoiceDetails.ChargeTypeID = pInvoiceDetailsChargeTypeID;
        //        objCVarWH_InvoiceDetails.ContractDetailsID = pInvoiceDetailsContractDetailsID;
        //        objCVarWH_InvoiceDetails.SpacePerPallet = pInvoiceDetailsSpacePerPallet;
        //        objCVarWH_InvoiceDetails.Days = pInvoiceDetailsDays;
        //        objCVarWH_InvoiceDetails.Rate = pInvoiceDetailsRate;
        //        objCVarWH_InvoiceDetails.Amount = pInvoiceDetailsSpacePerPallet * pInvoiceDetailsDays * pInvoiceDetailsRate;
        //        objCVarWH_InvoiceDetails.Notes = pInvoiceDetailsNotes;
        //        objCWH_InvoiceDetails.lstCVarWH_InvoiceDetails.Add(objCVarWH_InvoiceDetails);
        //        checkException = objCWH_InvoiceDetails.SaveMethod(objCWH_InvoiceDetails.lstCVarWH_InvoiceDetails);
        //        pInvoiceDetailsID = objCVarWH_InvoiceDetails.ID;
        //    }
        //    #endregion Save Details
        //    #region Update Header Amount
        //    if (checkException == null && _MessageReturned == "")
        //    {
        //        checkException = objCWH_Invoice.UpdateList(
        //            "Amount=(SELECT SUM(ISNULL(Amount,0)) FROM WH_InvoiceDetails WHERE InvoiceID=" + pInvoiceID + ")"
        //            +" WHERE ID=" + pInvoiceID);
        //        objCvwWH_InvoiceDetails.GetList("WHERE InvoiceID=" + pInvoiceID + " ORDER BY ChargeTypeName");
        //        objCWH_Invoice.GetList("WHERE ID=" + pInvoiceID);
        //    }
        //    else
        //        _MessageReturned = checkException.Message;
        //    #endregion Save Header Amount
        //    var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
        //    return new object[] {
        //        _MessageReturned
        //        , serializer.Serialize(objCvwWH_InvoiceDetails.lstCVarvwWH_InvoiceDetails) //pInvoiceDetails = pData[1]
        //        , serializer.Serialize(objCWH_Invoice.lstCVarWH_Invoice[0]) //pInvoiceHeader = pData[2]
        //    };
        //}

        //[HttpGet, HttpPost]
        //public object[] InvoiceDetails_FillModal(bool pIsLoadArrayOfObjects, Int32 pCustomerID, Int64 pInvoiceDetailsID)
        //{
        //    Exception checkException = null;
        //    int _RowCount = 0;
        //    CWH_Receive objCWH_Receive = new CWH_Receive();
        //    CWH_Pickup objCWH_Pickup = new CWH_Pickup();
        //    CWH_Contract objCWH_Contract = new CWH_Contract();
        //    CWH_InvoiceDetails objCWH_InvoiceDetails = new CWH_InvoiceDetails();
        //    if (pIsLoadArrayOfObjects)
        //    {
        //        checkException = objCWH_Receive.GetListPaging(999999, 1, "WHERE IsFinalized=1 AND CustomerID=" + pCustomerID, "Code", out _RowCount);
        //        checkException = objCWH_Pickup.GetListPaging(999999, 1, "WHERE IsFinalized=1 AND CustomerID=" + pCustomerID, "Code", out _RowCount);
        //        checkException = objCWH_Contract.GetListPaging(999999, 1, "WHERE IsFinalized=1 AND CustomerID=" + pCustomerID, "Code", out _RowCount);
        //    }
        //    if (pInvoiceDetailsID != 0)
        //        checkException = objCWH_InvoiceDetails.GetListPaging(999999, 1, "WHERE ID=" + pInvoiceDetailsID, "ChargeTypeName", out _RowCount);
        //    return new object[] {
        //        new JavaScriptSerializer().Serialize(objCWH_InvoiceDetails.lstCVarWH_InvoiceDetails) //pData[0]
        //        , new JavaScriptSerializer().Serialize(objCWH_Receive.lstCVarWH_Receive) //pData[1]
        //        , new JavaScriptSerializer().Serialize(objCWH_Pickup.lstCVarWH_Pickup) //pData[2]
        //        , new JavaScriptSerializer().Serialize(objCWH_Contract.lstCVarWH_Contract) //pData[3]
        //    };
        //}


        [HttpGet, HttpPost]
        public object[] Details_Delete(string pDeletedPaymentRequestDetailsIDs
            //Header Parameters
            , Int64 pPaymentRequestID)
        {
            bool _result = false;
            Exception checkException = null;
            if(pPaymentRequestID == 0)
            {
                return new object[] {true};
            }

            CA_PaymentRequestDetails objCA_PaymentRequestDetails = new CA_PaymentRequestDetails();
            CA_PaymentRequest objCA_PaymentRequest = new CA_PaymentRequest();
            objCA_PaymentRequest.GetItem(pPaymentRequestID);

            checkException = objCA_PaymentRequestDetails.DeleteList("WHERE ID IN (" + pDeletedPaymentRequestDetailsIDs + ")");
            if (checkException == null)
            {
                _result = true;

                //Log
                CA_PaymentRequestLog objCA_PaymentRequestLog = new CA_PaymentRequestLog();
                CVarA_PaymentRequestLog objCVarA_PaymentRequestLog = new CVarA_PaymentRequestLog();
                objCVarA_PaymentRequestLog.ID = 0;
                objCVarA_PaymentRequestLog.Row_ID = objCA_PaymentRequest.lstCVarA_PaymentRequest[0].ID;
                objCVarA_PaymentRequestLog.Code = objCA_PaymentRequest.lstCVarA_PaymentRequest[0].Code;
                objCVarA_PaymentRequestLog.DateTime = DateTime.Now;
                objCVarA_PaymentRequestLog.User_ID = WebSecurity.CurrentUserId;
                objCVarA_PaymentRequestLog.Trans_Type = "D";
                objCA_PaymentRequestLog.lstCVarA_PaymentRequestLog.Add(objCVarA_PaymentRequestLog);
                objCA_PaymentRequestLog.SaveMethod(objCA_PaymentRequestLog.lstCVarA_PaymentRequestLog);
            }


            checkException = objCA_PaymentRequest.UpdateList(
                    "TotalEstmatedCost=(SELECT SUM(ISNULL(EstmatedCost,0)) FROM A_PaymentRequestDetails WHERE PaymentRequestID=" + pPaymentRequestID + ")"
                    + " , ModificatorUserID_Request = " + WebSecurity.CurrentUserId.ToString()
                    + " , ModificationDate_Request = GETDATE() "
                    + " WHERE ID=" + pPaymentRequestID);

            return new object[] {
                _result //pData[0]
            };
        }

        [HttpGet, HttpPost]
        public Boolean UpdateVoucherIDInPaymentRequest(int pVoucherID, int pPaymentRequestID, int pType)
        {
            Exception checkException = null;

            if (pType == 1)
            {
                CA_PaymentRequest objCA_PaymentRequest = new CA_PaymentRequest();
                string pUpdateClause = "";
                pUpdateClause = " VoucherID=" + pVoucherID + " \n";
                pUpdateClause += "WHERE ID=" + pPaymentRequestID + "\n";
                checkException = objCA_PaymentRequest.UpdateList(pUpdateClause);
                CA_AccreditationMovement objCA_AccreditationMovement = new CA_AccreditationMovement();

                checkException = objCA_AccreditationMovement.UpdateList("SecretaryTreasury=" + WebSecurity.CurrentUserId + " ,VoucherID =" + pVoucherID + " WHERE PaymentRequestID=" + pPaymentRequestID);

                if (checkException == null)
                {
                    CEmail objCEmail = new CEmail();
                    objCEmail.GetList(" Where (Body like '%Payment Request/%') OR (Body like N'%مراجعة العهدة/%') OR (Body like N'%The Payment Request Supplier has been approved/%')");
                    //objCEmail.GetList(" Where (Body like '%Payment Request/%') OR (Body like N'%مراجعة العهدة/%')");
                    for (int i = 0; i < objCEmail.lstCVarEmail.Count; i++)
                    {
                        int bodyLength = objCEmail.lstCVarEmail[i].Body.Split('/').Length;
                        if (bodyLength > 0)
                        {
                            if (pPaymentRequestID == Convert.ToInt32(objCEmail.lstCVarEmail[i].Body.Split('/')[1]))
                            {
                                CEmailReceiver objCEmailReceiver = new CEmailReceiver();
                                checkException = objCEmailReceiver.UpdateList("IsAlarm=" + "0" + " WHERE EmailID=" + objCEmail.lstCVarEmail[i].ID.ToString());

                            }
                        }
                    }
                    return true;
                }

                else
                    return false;
            }
            else if(pType == 2)
            {
                CA_PaymentRequest objCA_PaymentRequest = new CA_PaymentRequest();


                //insert A_AccreditationMovement
                CA_AccreditationMovement objCA_AccreditationMovementinsert = new CA_AccreditationMovement();

                objCA_AccreditationMovementinsert.GetList("Where PaymentRequestID =" + pPaymentRequestID);
                if (objCA_AccreditationMovementinsert.lstCVarA_AccreditationMovement.Count > 0)
                {
                    checkException = objCA_AccreditationMovementinsert.UpdateList("SecretaryTreasury=" + WebSecurity.CurrentUserId + " ,VoucherSett =" + pVoucherID + " WHERE PaymentRequestID=" + pPaymentRequestID);
                }

                //end
                string pUpdateClause = "";
                pUpdateClause = " VoucherID=" + pVoucherID + " \n";
                pUpdateClause += "WHERE ID=" + pPaymentRequestID + "\n";
                checkException = objCA_PaymentRequest.UpdateList(pUpdateClause);
                CA_AccreditationMovement objCA_AccreditationMovement = new CA_AccreditationMovement();


                if (checkException == null)
                {
                    CEmail objCEmail = new CEmail();
                    objCEmail.GetList(" Where (Body like '%Payment Request/%') OR (Body like N'%مراجعة العهدة/%') OR (Body like N'%The Payment Request Supplier has been approved/%')");
                    //objCEmail.GetList(" Where (Body like '%Payment Request/%') OR (Body like N'%مراجعة العهدة/%')");
                    for (int i = 0; i < objCEmail.lstCVarEmail.Count; i++)
                    {
                        int bodyLength = objCEmail.lstCVarEmail[i].Body.Split('/').Length;
                        if (bodyLength > 0)
                        {
                            if (pPaymentRequestID == Convert.ToInt32(objCEmail.lstCVarEmail[i].Body.Split('/')[1]))
                            {
                                CEmailReceiver objCEmailReceiver = new CEmailReceiver();
                                checkException = objCEmailReceiver.UpdateList("IsAlarm=" + "0" + " WHERE EmailID=" + objCEmail.lstCVarEmail[i].ID.ToString());

                            }
                        }
                    }
                    return true;
                }

                else
                    return false;
            }
            else
            {
                CA_PaymentRequestCollected objCA_PaymentRequestCollected = new CA_PaymentRequestCollected();

                //insert A_AccreditationMovement
                CA_AccreditationMovement objCA_AccreditationMovementinsert = new CA_AccreditationMovement();
               checkException = objCA_AccreditationMovementinsert.UpdateList("SecretaryTreasury=" + WebSecurity.CurrentUserId + " ,VoucherID =" + pVoucherID   + " WHERE PaymentRequestID  in (select PaymentRequestID from A_PaymentRequestCollectedDetails where PaymentRequestCollectedID= " + pPaymentRequestID + ")");
 

                //end
                string pUpdateClause = "";
                pUpdateClause = " VoucherID=" + pVoucherID + " \n";
                pUpdateClause += "WHERE ID=" + pPaymentRequestID + "\n";
                checkException = objCA_PaymentRequestCollected.UpdateList(pUpdateClause);

                if (checkException == null)
                {
                    CEmail objCEmail = new CEmail();
                    objCEmail.GetList(" Where Body = 'Payment Request (Combined)/"  + pPaymentRequestID + "'");

                    for (int i = 0; i < objCEmail.lstCVarEmail.Count; i++)
                    {
                        int bodyLength = objCEmail.lstCVarEmail[i].Body.Split('/').Length;
                        if (bodyLength > 0)
                        {
                            if (pPaymentRequestID == Convert.ToInt32(objCEmail.lstCVarEmail[i].Body.Split('/')[1]))
                            {
                                CEmailReceiver objCEmailReceiver = new CEmailReceiver();
                                checkException = objCEmailReceiver.UpdateList("IsAlarm=" + "0" + " WHERE EmailID=" + objCEmail.lstCVarEmail[i].ID.ToString());

                            }
                        }
                    }
                    return true;
                }

                else
                    return false;
            }

        }



        [HttpGet, HttpPost]
        public object[] GetChargeTypes(int pOperationId, Boolean pFlagChargeType, int pCurrencyID, int pPaymentRequestID, string pAlreadySelectedPayableIDs)
        {
            //if (pFlagChargeType)
            //{
            int _RowCount = 0;
            CvwPayables objCvwPayables = new CvwPayables();
            String WhereClause = "";
            CvwDefaults objCvwDefaults = new CvwDefaults();
            objCvwDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount); //i am sure i ve just one row isa

            string CompanyName = objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName;
            if (CompanyName == "COS")
            {
                WhereClause = " Where OperationID = " + pOperationId + " And CurrencyID=" + pCurrencyID + " AND ID NOT IN (SELECT aprd.PayableID FROM A_PaymentRequestDetails AS aprd WHERE PayableID is not null and aprd.OperationID=" + pOperationId + " AND PaymentRequestID <> " + pPaymentRequestID + ") " + (pAlreadySelectedPayableIDs == null ? "" : "AND ID NOT IN (" + pAlreadySelectedPayableIDs + ")");

            }
            else
            {

                WhereClause = " Where OperationID = " + pOperationId + " And CurrencyID=" + pCurrencyID
                    + " AND ID NOT IN (SELECT aprd.PayableID FROM A_PaymentRequestDetails AS aprd WHERE PayableID is not null and aprd.OperationID=" + pOperationId +
                     " And PaymentRequestID <> " + pPaymentRequestID + ")";

            }


            objCvwPayables.GetListPaging(1000, 1, WhereClause, "ChargeTypeName", out _RowCount);
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                serializer.Serialize(objCvwPayables.lstCVarvwPayables)
            };

        }


        [HttpGet, HttpPost]
        public object[] GetInitialValue(int pOperationId, int pChargeTypeId)
        {
            //if (pFlagChargeType)
            //{
            int _RowCount = 0;
            CvwPayables objCvwPayables = new CvwPayables();
            String WhereClause = " Where OperationID = " + pOperationId + " AND ChargeTypeID = " + pChargeTypeId + "";
            objCvwPayables.GetListPaging(1000, 1, WhereClause, "ChargeTypeName", out _RowCount);
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                serializer.Serialize(objCvwPayables.lstCVarvwPayables)
            };

        }
        //}

        #region GetRequiredOperations
        [HttpGet]
        public object[] GetRequiredOperations(string pSearchOperationCode)
        {
            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
            var OperationList = objCCustomizedDBCall.ExecuteQuery_ListOfObjects($"SELECT ID,Code,VesselName,ActualArrivalString,OperationStageID From vwOperationsWithMinimalColumns WHERE Code LIKE '%-{pSearchOperationCode}' ORDER BY ID DESC", typeof(CVarvwOperationsWithMinimalColumns))
                .Cast<CVarvwOperationsWithMinimalColumns>()
                .ToList();
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[]
            {
                serializer.Serialize(OperationList)
            };
        }
        #endregion
        #region GetSupplierBankDetails
        [HttpGet]
        public object[] GetSupplierBankDetails(int pPartnerID, int pPartnerTypeID, int pCurrencyID)
        {
            int _rowCount = 0;
            CvwPartnersBanks objCvwPartnersBanks = new CvwPartnersBanks();
            objCvwPartnersBanks.GetListPaging(99999, 1, $" WHERE PartnerID = {pPartnerID} AND PartnerTypeID = {pPartnerTypeID} AND CurrencyID = {pCurrencyID}", "ID", out _rowCount);
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[]
            {
                serializer.Serialize(objCvwPartnersBanks.lstCVarvwPartnersBanks)
            };
        }
        #endregion
        [HttpGet]
        public object[] GetOperationData(int pOperationID, int pHouseID, int pContainerID, int pPayableID, int pCurrencyID)
        {
            int _RowCount = 0;
            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
            var HousesList = objCCustomizedDBCall.ExecuteQuery_ListOfObjects($"SELECT ID,HouseNumber FROM Operations WHERE MasterOperationID = {pOperationID} {(pContainerID > 0 ? $"AND ID IN (SELECT OperationID FROM OperationContainersAndPackagesPlacedOn WHERE OperationContainersAndPackagesID = {pContainerID})" : "")}", typeof(CVarOperations)).Cast<CVarOperations>().ToList();
            var HousesListMinified = HousesList.Select(h => new
            {
                h.ID,
                Code = h.HouseNumber
            }).ToList();
            var ContainersList = objCCustomizedDBCall.ExecuteQuery_ListOfObjects($"SELECT ID,ContainerNumber,ContainerTypeID FROM OperationContainersAndPackages WHERE OperationID = {pOperationID} {(pHouseID > 0 ? $"AND ID IN (SELECT OperationContainersAndPackagesID FROM OperationContainersAndPackagesPlacedOn WHERE OperationID = {pHouseID})" : "")}", typeof(CVarOperationContainersAndPackages)).Cast<CVarOperationContainersAndPackages>().ToList();
            CContainerTypes objCContainerTypes = new CContainerTypes();
            objCContainerTypes.GetListPaging(999, 1, "WHERE 1=1", "ID", out _RowCount);
            var ContainersListForCombo = ContainersList.Select(c => new
            {
                c.ID,
                c.ContainerNumber,
                ContainerTypeCode = objCContainerTypes.lstCVarContainerTypes.FirstOrDefault(item => item.ID == c.ContainerTypeID) == null ? "" : objCContainerTypes.lstCVarContainerTypes.FirstOrDefault(item => item.ID == c.ContainerTypeID).Code
            }).ToList();

            var PayableList = objCCustomizedDBCall.ExecuteQuery_ListOfObjects($"SELECT ID,ChargeTypeName,QuotationCost,CurrencyCode FROM vwPayables WHERE CurrencyID={pCurrencyID} AND OperationID = {pOperationID} {(pContainerID > 0 ? $"AND OperationContainersAndPackagesID = {pContainerID}" : "")} {(pHouseID > 0 ? $"AND BillID = {pHouseID}" : "")} AND (ID NOT IN (SELECT PayableID FROM A_PaymentRequestDetails WHERE PayableID IS NOT NULL) OR ID = {pPayableID})", typeof(CVarvwPayables)).Cast<CVarvwPayables>().ToList();
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[]
            {
                serializer.Serialize(HousesListMinified)
                ,serializer.Serialize(ContainersListForCombo)
                ,serializer.Serialize(PayableList)
            };
        }

		[HttpGet,HttpPost]
		public object IsNotifiedUser(string pWhereClause)
		{
			string query = $@"With LastPaymentEmail(EmailID, PaymentID)
							  as
							  (
							  	select Max(ID), substring (Body,CHARINDEX('/',Body)+1,10) PaymentID
							  	from Email
							  	where Body like N'%Payment Request%'
							  	group by substring (Body,CHARINDEX('/',Body)+1,10)
							  )
							  select Email.ID 
							  from Email join EmailReceiver on 
							  Email.ID = EmailReceiver.EmailID 
							  join LastPaymentEmail on
							  Email.ID = LastPaymentEmail.EmailID
							  {pWhereClause}";
			CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
			var data = objCCustomizedDBCall.ExecuteQuery_ListOfObjects(query, typeof(CVarvwEmail)).Cast<CVarvwEmail>().ToList();
			return data.Count;
		}

        [HttpGet, HttpPost]
        public Object[] Split(long pID, string pPaymentRequestDetailsIDs, string pReceiverUsersIDs)
        {
            Exception checkException = null;
            string ReturnedMessage = "";

            checkException = A_PaymentRequestSplit("A_PaymentRequestSplit", pID
                , pPaymentRequestDetailsIDs, pReceiverUsersIDs, WebSecurity.CurrentUserId);

            if (checkException != null)
                ReturnedMessage = checkException.Message;

            return new object[] {
                ReturnedMessage
            };
        }
        [HttpGet, HttpPost]
        public Object[] CheckIfUserCanRedirect()
        {
            var LoggedUserCanRedirect = false;

            CA_PaymentRequest_UsersLevel objCA_PaymentRequest_UsersLevel = new CA_PaymentRequest_UsersLevel();
            objCA_PaymentRequest_UsersLevel.GetList($"WHERE UserID = {WebSecurity.CurrentUserId} AND LevelNo IN (SELECT ID FROM PaymentRequestApprovalLevels WHERE RedirectNotifyOnApprove = 1)");

            if (objCA_PaymentRequest_UsersLevel.lstCVarA_PaymentRequest_UsersLevel.Count > 0)
                LoggedUserCanRedirect = true;

            return new object[] {
                LoggedUserCanRedirect
            };
        }
        [HttpGet, HttpPost]
        public Object[] GetOperationPayables(int pOperationID, int pCurrencyID)
        {
            Exception checkException = null;
            string ReturnedMessage = "";
            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
            CvwCurrencies objCvwCurrencies = new CvwCurrencies();

            checkException = objCvwCurrencies.GetList($"WHERE ID={pCurrencyID}");
            if (objCvwCurrencies.lstCVarvwCurrencies[0].CurrentExchangeRate == 0)
            {
                ReturnedMessage = "Please Check Exchange Rate";
                return new object[] {ReturnedMessage};
            }

            var PayableList = objCCustomizedDBCall.ExecuteQuery_ListOfObjects($" SELECT ID,ChargeTypeName,QuotationCost,CurrencyCode,ChargeTypeGroupName,PartnerSupplierName FROM vwPayables WHERE CurrencyID={pCurrencyID} AND OperationID = {pOperationID} AND ID NOT IN (SELECT PayableID FROM A_PaymentRequestDetails WHERE PayableID IS NOT NULL) ORDER BY  CASE ChargeTypeGroupID WHEN 2 THEN 1 WHEN 4 THEN 2 WHEN 3 THEN 3 ELSE 4 END", typeof(CVarvwPayables)).Cast<CVarvwPayables>().ToList();

            if (checkException != null)
                ReturnedMessage = checkException.Message;

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                ReturnedMessage
                , serializer.Serialize(PayableList)
            };
        }
        [HttpGet, HttpPost]
        public Object[] GetContainerHousesAndPayables(int pContainerID, int pCurrencyID, int pOperationID , int pPaymentRequestID)
        {
            Exception checkException = null;
            string ReturnedMessage = "";
            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
            var HousesList = objCCustomizedDBCall.ExecuteQuery_ListOfObjects($"SELECT ID,HouseNumber FROM Operations WHERE MasterOperationID = {pOperationID} {(pContainerID > 0 ? $"AND ID IN (SELECT OperationID FROM OperationContainersAndPackagesPlacedOn WHERE OperationContainersAndPackagesID = {pContainerID})" : "")}", typeof(CVarOperations)).Cast<CVarOperations>().ToList();
            var HousesListMinified = HousesList.Select(h => new
            {
                h.ID,
                Code = h.HouseNumber
            }).ToList();

            var PayableList = objCCustomizedDBCall.ExecuteQuery_ListOfObjects($"SELECT ID,ChargeTypeName,QuotationCost,CurrencyCode,ChargeTypeID FROM vwPayables WHERE CurrencyID={pCurrencyID} AND OperationID = {pOperationID} {(pContainerID > 0 ? $"AND OperationContainersAndPackagesID = {pContainerID}" : "")} AND ID NOT IN (SELECT PayableID FROM A_PaymentRequestDetails WHERE PayableID IS NOT NULL And PaymentRequestID <>  {pPaymentRequestID})", typeof(CVarvwPayables)).Cast<CVarvwPayables>().ToList();

            if (checkException != null)
                ReturnedMessage = checkException.Message;

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                serializer.Serialize(HousesListMinified)
                , serializer.Serialize(PayableList)
            };
        }
        [HttpGet, HttpPost]
        public Object[] GetHouseContainersAndPayables(int pHouseID, int pCurrencyID, int pOperationID, int pPaymentRequestID)
        {
            int _RowCount = 0;
            Exception checkException = null;
            string ReturnedMessage = "";
            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
            var ContainersList = objCCustomizedDBCall.ExecuteQuery_ListOfObjects($"SELECT ID,ContainerNumber,ContainerTypeID FROM OperationContainersAndPackages WHERE OperationID = {pOperationID} {(pHouseID > 0 ? $"AND ID IN (SELECT OperationContainersAndPackagesID FROM OperationContainersAndPackagesPlacedOn WHERE OperationID = {pHouseID})" : "")}", typeof(CVarOperationContainersAndPackages)).Cast<CVarOperationContainersAndPackages>().ToList();
            CContainerTypes objCContainerTypes = new CContainerTypes();
            objCContainerTypes.GetListPaging(999, 1, "WHERE 1=1", "ID", out _RowCount);
            var ContainersListForCombo = ContainersList.Select(c => new
            {
                c.ID,
                c.ContainerNumber,
                ContainerTypeCode = objCContainerTypes.lstCVarContainerTypes.FirstOrDefault(item => item.ID == c.ContainerTypeID) == null ? "" : objCContainerTypes.lstCVarContainerTypes.FirstOrDefault(item => item.ID == c.ContainerTypeID).Code
            }).ToList();

            var PayableList = objCCustomizedDBCall.ExecuteQuery_ListOfObjects($"SELECT ID,ChargeTypeName,QuotationCost,CurrencyCode FROM vwPayables WHERE CurrencyID={pCurrencyID} AND OperationID = {pOperationID} {(pHouseID > 0 ? $"AND BillID = {pHouseID}" : "")} AND ID NOT IN (SELECT PayableID FROM A_PaymentRequestDetails WHERE PayableID IS NOT NULL And PaymentRequestID <>  {pPaymentRequestID} )", typeof(CVarvwPayables)).Cast<CVarvwPayables>().ToList();

            if (checkException != null)
                ReturnedMessage = checkException.Message;

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                serializer.Serialize(ContainersListForCombo)
                , serializer.Serialize(PayableList)
            };
        }
        [HttpGet, HttpPost]
        public Object[] UpdatePartnerAccounts(int pID, int pCustodyID, int pPartnerTypeID, int pPartnerID, bool pIsDirect)
        {
            Exception checkException = null;
            string ReturnedMessage = "";
            CA_Accounts objCA_Accounts = new CA_Accounts();
            CA_SubAccounts objCA_SubAccounts = new CA_SubAccounts();
            string Account = "";
            string SubAccount = "";

                if (pIsDirect)
                {
                    objCA_Accounts.GetList(" WHERE Account_Name = N'عمليات تحت التنفيذ'");
                    if(objCA_Accounts.lstCVarA_Accounts.Count > 0)
                    {
                        Account = objCA_Accounts.lstCVarA_Accounts[0].Account_Number + " - " + objCA_Accounts.lstCVarA_Accounts[0].Account_Name;
                    }
                }else if(pPartnerID != 0)
                {
                    CvwPartners objCvwPartners = new CvwPartners();
                    objCvwPartners.GetList($" WHERE PartnerTypeID = {pPartnerTypeID} AND PartnerID = {pPartnerID}");
                    if (objCvwPartners.lstCVarvwPartners.Count > 0)
                    {
                        objCA_Accounts.GetList($" WHERE ID = {objCvwPartners.lstCVarvwPartners[0].AccountID}");
                        if (objCA_Accounts.lstCVarA_Accounts.Count > 0)
                        {
                            Account = objCA_Accounts.lstCVarA_Accounts[0].Account_Number + " - " + objCA_Accounts.lstCVarA_Accounts[0].Account_Name;
                        }
                        objCA_SubAccounts.GetList($" WHERE ID = {objCvwPartners.lstCVarvwPartners[0].SubAccountID}");
                        if (objCA_SubAccounts.lstCVarA_SubAccounts.Count > 0)
                        {
                            SubAccount = objCA_SubAccounts.lstCVarA_SubAccounts[0].SubAccount_Number + " - " + objCA_SubAccounts.lstCVarA_SubAccounts[0].SubAccount_Name;
                        }
                    }
                }else if(pCustodyID != 0)
                {
                    CvwPartners objCvwPartners = new CvwPartners();
                    objCvwPartners.GetList($" WHERE PartnerTypeID = 20 AND PartnerID = {pCustodyID}");
                    if (objCvwPartners.lstCVarvwPartners.Count > 0)
                    {
                        objCA_Accounts.GetList($" WHERE ID = {objCvwPartners.lstCVarvwPartners[0].AccountID}");
                        if (objCA_Accounts.lstCVarA_Accounts.Count > 0)
                        {
                            Account = objCA_Accounts.lstCVarA_Accounts[0].Account_Number + " - " + objCA_Accounts.lstCVarA_Accounts[0].Account_Name;
                        }
                        objCA_SubAccounts.GetList($" WHERE ID = {objCvwPartners.lstCVarvwPartners[0].SubAccountID}");
                        if (objCA_SubAccounts.lstCVarA_SubAccounts.Count > 0)
                        {
                            SubAccount = objCA_SubAccounts.lstCVarA_SubAccounts[0].SubAccount_Number + " - " + objCA_SubAccounts.lstCVarA_SubAccounts[0].SubAccount_Name;
                        }
                    }
                }

            if (checkException != null)
                ReturnedMessage = checkException.Message;

            return new object[] {
                ReturnedMessage
                ,Account
                ,SubAccount
            };
        }

        [HttpGet, HttpPost]
        public Object[] AddCustodyPartnerToOperation(int pID, int pCustodyID)
        {
            Exception checkException = null;
            string ReturnedMessage = "";
            Int64 PartnerID = 0;

            CA_PaymentRequestDetails objCA_PaymentRequestDetails = new CA_PaymentRequestDetails();
            objCA_PaymentRequestDetails.GetList("Where PaymentRequestID=" + pID);

            for (int i = 0; i < objCA_PaymentRequestDetails.lstCVarA_PaymentRequestDetails.Count; i++)
            {
                COperationPartners objCOperationPartners = new COperationPartners();
                objCOperationPartners.GetList("Where OperationID=" + objCA_PaymentRequestDetails.lstCVarA_PaymentRequestDetails[i].OperationID
                    + " And OperationPartnerTypeID=20 And CustodyID= " + pCustodyID);

                if (objCOperationPartners.lstCVarOperationPartners.Count == 0)
                {
                    CVarOperationPartners objCVarOperationPartners = new CVarOperationPartners();
                    objCVarOperationPartners.ID = 0;
                    objCVarOperationPartners.OperationID = objCA_PaymentRequestDetails.lstCVarA_PaymentRequestDetails[i].OperationID;
                    objCVarOperationPartners.OperationPartnerTypeID = 20;
                    objCVarOperationPartners.CustodyID = pCustodyID;
                    objCVarOperationPartners.ModificatorUserID = objCVarOperationPartners.CreatorUserID = WebSecurity.CurrentUserId;
                    objCVarOperationPartners.ModificationDate = objCVarOperationPartners.CreationDate = DateTime.Now;
                    objCOperationPartners.lstCVarOperationPartners.Add(objCVarOperationPartners);
                    objCOperationPartners.SaveMethod(objCOperationPartners.lstCVarOperationPartners);

                    PartnerID = objCVarOperationPartners.ID;
                }
                else
                    PartnerID = objCOperationPartners.lstCVarOperationPartners[0].ID;
            }

     
            if (checkException != null)
                ReturnedMessage = checkException.Message;

            return new object[] {
                ReturnedMessage
                ,PartnerID
            };
        }
        public Exception A_PaymentRequestSplit(string pStoredProcedureName, long pPaymentRequestID, string pPaymentRequestDetailsIDs, string pReceiverUsersIDs, int pUserID)
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
                Com.Parameters.Add(new SqlParameter("@PaymentRequestDetailsIDs", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@ReceiverUsersIDs", SqlDbType.NVarChar));
                Com.Parameters.Add(new SqlParameter("@UserID", SqlDbType.Int));

                Com.CommandText = "[dbo]." + pStoredProcedureName;
                Com.Parameters[0].Value = pPaymentRequestID;
                Com.Parameters[1].Value = pPaymentRequestDetailsIDs;
                Com.Parameters[2].Value = pReceiverUsersIDs;
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

        [HttpGet, HttpPost]
        public object[] GenerateDebitNote_ForPaymentRequest(  //Header Parameters
      Int64 pPaymentRequestID ,string pPaymentRequestDetailIDs ,string pAmounts
       )
        {

            Exception checkException = null;
            string _MsgError = "";

            var amountsArray = pAmounts.Split(new[] { ',' }, StringSplitOptions.RemoveEmptyEntries);

            foreach (var amount in amountsArray)
            {
                if (amount == "0" || !decimal.TryParse(amount, out _))
                {
                    _MsgError = $"Invalid amount: '{amount}'";
                }
            }

            CA_PaymentRequestDetails objCA_PaymentRequestDetails = new CA_PaymentRequestDetails();
            CA_PaymentRequest objCA_PaymentRequest = new CA_PaymentRequest();
            COperations objCOperations = new COperations();

            objCA_PaymentRequest.GetItem(pPaymentRequestID);
            checkException = objCA_PaymentRequestDetails.GetList("WHERE ID IN (" + pPaymentRequestDetailIDs + ")");
            objCOperations.GetList("Where ID=" + objCA_PaymentRequestDetails.lstCVarA_PaymentRequestDetails[0].OperationID);


            if (objCA_PaymentRequest.lstCVarA_PaymentRequest[0].PartnerID == 0)
                _MsgError = "No partner selected";
            if(objCOperations.lstCVarOperations[0].OperationStageID != 120)
                _MsgError = "Operation must be closed";
            if (objCA_PaymentRequestDetails.lstCVarA_PaymentRequestDetails[0].SupplierID == 0)
                _MsgError = "No partner in details";

            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
            if(_MsgError == "")
             checkException = objCCustomizedDBCall.CallProcFunction(" SP_GenerateDebitNote_ForPaymentRequest " + pPaymentRequestID + ",'" + pPaymentRequestDetailIDs + "'," + WebSecurity.CurrentUserId + ",'"+ pAmounts +"'");

            if (checkException != null)
                _MsgError = checkException.Message;

         


            return new object[] {
                _MsgError //pData[0]
            };
        }
    }

    public class PaymentRequestData
    {
        public Int32 pPaymentRequestID { get; set; }
        public string pCode { get; set; }
        public Int32 pCustodyID { get; set; }
        public DateTime pRequestDate { get; set; }
        public DateTime pSettlementDate { get; set; }
        public Int32 pCurrencyID { get; set; }
        public bool pIsCheck { get; set; }
        public string pTotalEstmatedCost { get; set; }
        public string pTotalActualCost { get; set; }
        public string pTotalDiff { get; set; }

        public string pNotes { get; set; }
        public string pIDList { get; set; }
        public string pChargeTypeList { get; set; }
        public string pOperationList { get; set; }

        public Int32 pPartnerTypeID { get; set; }
        public Int32 pPartnerID { get; set; }
        public Int32 pPartnerIDVendor { get; set; }


        
        public Int32 pCostCenterHeaderID { get; set; }
        public Int32 pNotesPayable { get; set; }





        public string pSupplierList { get; set; }

        public string pEstmatedCostList { get; set; }
        public string pSupplierInvoiceNo { get; set; }

        public string pDescriptionList { get; set; }
        public string pCouponList { get; set; }
        public string pActualDescriptionList { get; set; }

        public string pFilterChargeTypesList { get; set; }
        public string pActualCostList { get; set; }
        public int pIsCustodySettlement { get; set; }
        public String pIsSettlementOnlyList { get; set; }
        public String pSelectedItemsIDs { get; set; }
        public string pHouseIDList { get; set; }
        public string pCertificateNumberIDList { get; set; }
        public string pTruckingOrderIDList { get; set; }
        public string pPartenerTypeIDList { get; set; }
        public string pPartenerIDList { get; set; }

        public string pTaxTypeIDList { get; set; }
        public string pDiscountTypeIDList { get; set; }
        public string pCostCenterIDList { get; set; }

        //account
        public string pAccount_IDList { get; set; }
        public string pSubAccount_IDList { get; set; }
        public string pCostCenter_IDList { get; set; }
        public string pNotesList { get; set; }
        public string pAmountList { get; set; }


        public string pPayableIDList { get; set; }
        public int pIsNotifyOrNot { get; set; }
        public int pChargeTypeGroupID { get; set; }
        public int pPaymentComboID { get; set; }
        public int pIssuedToCmbo { get; set; }


        public string pAttache { get; set; }
        public string pPayment { get; set; }
        public string pIssuedTo { get; set; }
        public bool pisDiff { get; set; }

        public bool pIsGeneratedSupplierJV { get; set; }
        public int pBankID { get; set; }

        public decimal pDiscount { get; set; } = 0;
        public bool pIsDirect { get; set; }

        public string pIsVATFromPRList { get; set; } = "";

        public int pIsCalcBL { get; set; } = 0;
        public int pCalcBLPayableID { get; set; } = 0;

        public string pisRetrievedList { get; set; } = "";

    }
    public class Payment
    {
        public int HouseID { get; set; }
        public string HouseNumber { get; set; }
        public decimal Amount { get; set; }
    }
}

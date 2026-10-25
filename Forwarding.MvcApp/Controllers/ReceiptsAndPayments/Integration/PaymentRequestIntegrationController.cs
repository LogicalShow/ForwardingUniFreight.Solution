using Forwarding.MvcApp.Entities.Operations;

using Forwarding.MvcApp.Models.Administration.Security.Generated;
using Forwarding.MvcApp.Models.Administration.Settings.Generated;
using Forwarding.MvcApp.Models.Customized;
using Forwarding.MvcApp.Models.LocalEmails.Generated;
using Forwarding.MvcApp.Models.MasterData.BanksAccountsAndTreasuries.Generated;
using Forwarding.MvcApp.Models.MasterData.Invoicing.Generated;
using Forwarding.MvcApp.Models.NoAccess.Generated;
using Forwarding.MvcApp.Models.OperAcc.Generated;
using Forwarding.MvcApp.Models.Operations.Operations.Generated;
using Forwarding.MvcApp.Models.ReceiptsAndPayments.Custodies.Generated;
using Forwarding.MvcApp.Models.ReceiptsAndPayments.Transactions.Generated;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;

namespace Forwarding.MvcApp.Controllers.ReceiptsAndPayments.Integration
{
    public class PaymentRequestIntegrationController : ApiController
    {
        #region PaymentRequest

        [HttpGet, HttpPost]
        public object[] LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned(bool pIsLoadArrayOfObjects, string pLanguage, Int32 pPageNumber, Int32 pPageSize, string pWhereClause, string pOrderBy)
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
                objCvwAccPartners.GetListPaging(10000, 1, "WHERE PartnerTypeID=8", "Name", out _RowCount);

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
                    objCvwOperations.GetListPaging(999999, 1, (pWhereClauseForCombo + " AND Code IS NOT NULL"), pOrderBy, out _RowCount);
                    objCvwA_PaymentRequestHouse.GetListPaging(999999, 1, (pWhereClauseForCombo + "AND NAME IS NOT NULL AND MasterOperationID IS NOT null  "), pOrderBy, out _RowCount); // AND CreatorUserID = " + WebSecurity.CurrentUserId
                }
            }

            CChargeTypeGroup objCChargeTypeGroup = new CChargeTypeGroup();
            objCChargeTypeGroup.GetListPaging(9999, 1, "WHERE 1=1", "ID", out _RowCount); //i am sure i ve just one row isa


            CNoAccessPartnerTypes objCNoAccessPartnerTypes = new CNoAccessPartnerTypes();
            objCNoAccessPartnerTypes.GetList(" WHERE 1=1 ");
            //pWhereClause = " where 1= 1 "; 
            checkException = objCvwA_PaymentRequest.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);


            CA_PaymentRequestPaymentComp objA_PaymentRequestPaymentComp = new CA_PaymentRequestPaymentComp();
            objA_PaymentRequestPaymentComp.GetList(" WHERE 1=1 ");


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
                ,serializer.Serialize(objCvwOperations.lstCVarvwOperationsWithMinimalColumns)//pData[3]}
                ,serializer.Serialize(objCvwChargeTypes.lstCVarvwChargeTypesWithMinimalColumns)//pData[4]
                ,serializer.Serialize(objCvwA_PaymentRequestHouse.lstCVarvwA_PaymentRequestHouse)//pData[5]
                ,serializer.Serialize(objCvwA_PaymentRequestCertificateNumber.lstCVarvwA_PaymentRequestCertificateNumber)//pData[6]
                ,serializer.Serialize(objCCvwA_PaymentRequestTruckingOrder.lstCVarvwA_PaymentRequestTruckingOrder)//pData[6]
                ,serializer.Serialize(objCNoAccessPartnerTypes.lstCVarNoAccessPartnerTypes)//pData[7]
                ,serializer.Serialize(objCChargeTypeGroup.lstCVarChargeTypeGroup)//pData[8]
                ,serializer.Serialize(objA_PaymentRequestPaymentComp.lstCVarA_PaymentRequestPaymentComp)//pData[10]

            };
            }
        }
        [HttpGet, HttpPost]
        public object[] FillCombo(Int32 PoperationID, Int32 ptype, string pOrderBy)
        {
            int _RowCount = 0;
            Exception checkException = null;

            CvwA_PaymentRequestHouse objCvwA_PaymentRequestHouse = new CvwA_PaymentRequestHouse();
            CvwA_PaymentRequestCertificateNumber objCvwA_PaymentRequestCertificateNumber = new CvwA_PaymentRequestCertificateNumber();
            CvwA_PaymentRequestTruckingOrder objCCvwA_PaymentRequestTruckingOrder = new CvwA_PaymentRequestTruckingOrder();

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
                    objCvwA_PaymentRequestCertificateNumber.GetListPaging(999999, 1, ("where 1=1"), pOrderBy, out _RowCount);
                }
                else
                {
                    objCvwA_PaymentRequestCertificateNumber.GetListPaging(999999, 1, ("where OperationID = " + PoperationID), pOrderBy, out _RowCount);
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
                    objCCvwA_PaymentRequestTruckingOrder.GetListPaging(999999, 1, ("where 1=1"), pOrderBy, out _RowCount);
                }
                else
                {
                    objCCvwA_PaymentRequestTruckingOrder.GetListPaging(999999, 1, ("where OperationID = " + PoperationID), pOrderBy, out _RowCount);
                }

                var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
                return new object[] {
                 serializer.Serialize(objCCvwA_PaymentRequestTruckingOrder.lstCVarvwA_PaymentRequestTruckingOrder)//pData[0]
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
            //string code  = objCPaymentsCustomizedDBCall.CallStringFunction("SELECT TOP 1 code+1  FROM A_PaymentRequest AS apr WHERE CreatorUserID_Request = "+ WebSecurity.CurrentUserId + " ORDER BY apr.Code DESC " );

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
            objCVarA_PaymentRequest.Discount = 0;

            objCA_PaymentRequest.lstCVarA_PaymentRequest.Add(objCVarA_PaymentRequest);

            checkException = objCA_PaymentRequest.SaveMethod(objCA_PaymentRequest.lstCVarA_PaymentRequest);

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
                        if (ExistsCA_PaymentRequestDetails.lstCVarA_PaymentRequestDetails.Count > 0)
                        {
                            objVarA_PaymentRequestDetails.PayableID = ExistsCA_PaymentRequestDetails.lstCVarA_PaymentRequestDetails[0].PayableID;
                        }
                        objVarA_PaymentRequestDetails.ID = Convert.ToInt32(paymentRequestData.pIDList.Split(',')[i]);
                        objVarA_PaymentRequestDetails.PaymentRequestID = objCVarA_PaymentRequest.ID;
                        objVarA_PaymentRequestDetails.ChargeTypeID = Convert.ToInt32(paymentRequestData.pChargeTypeList.Split(',')[i]);
                        objVarA_PaymentRequestDetails.OperationID = Convert.ToInt32(paymentRequestData.pOperationList.Split(',')[i]);
                        objVarA_PaymentRequestDetails.SupplierID = Convert.ToInt32(paymentRequestData.pSupplierList.Split(',')[i]);

                        objVarA_PaymentRequestDetails.EstmatedCost = Convert.ToDecimal(paymentRequestData.pEstmatedCostList.Split(',')[i]);
                        objVarA_PaymentRequestDetails.SupplierInvoiceNo = paymentRequestData.pSupplierInvoiceNo.Split(',')[i];

                        objVarA_PaymentRequestDetails.Coupon = paymentRequestData.pCouponList.Split(',')[i];
                        objVarA_PaymentRequestDetails.Description = paymentRequestData.pDescriptionList.Split(',')[i];
                        objVarA_PaymentRequestDetails.FilterChargeTypes = Convert.ToBoolean(paymentRequestData.pFilterChargeTypesList.Split(',')[i]);
                        if (paymentRequestData.pActualCostList != "0")
                            objVarA_PaymentRequestDetails.ActualCost = Convert.ToDecimal(paymentRequestData.pActualCostList.Split(',')[i]);
                        if (paymentRequestData.pIsCustodySettlement == 1)
                        {
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

                        objVarA_PaymentRequestDetails.IsVATFromPRForm = false;

                        objCA_PaymentRequestDetails.lstCVarA_PaymentRequestDetails.Add(objVarA_PaymentRequestDetails);
                    }
                }
                checkException = objCA_PaymentRequestDetails.SaveMethod(objCA_PaymentRequestDetails.lstCVarA_PaymentRequestDetails);

                CVarA_AccreditationMovement objVarA_AccreditationMovement = new CVarA_AccreditationMovement();
                objVarA_AccreditationMovement.mPaymentRequestID = objCVarA_PaymentRequest.ID;
                objVarA_AccreditationMovement.mRequestCreator = WebSecurity.CurrentUserId;
                objVarA_AccreditationMovement.mTechnicalDirector = 0;
                objVarA_AccreditationMovement.mCovenantAccountant = 0;
                objVarA_AccreditationMovement.mSecretaryTreasury = 0;
                objVarA_AccreditationMovement.mTreasuryReferences = 0;
                objVarA_AccreditationMovement.mVoucherID = 0;
                objVarA_AccreditationMovement.mIsChanges = true;
                objVarA_AccreditationMovement.mRequestSettlementApprovedDate = DateTime.Parse("01-01-1900");
                objCA_AccreditationMovement.lstCVarA_AccreditationMovement.Add(objVarA_AccreditationMovement);

                checkException = objCA_AccreditationMovement.SaveMethod(objCA_AccreditationMovement.lstCVarA_AccreditationMovement);


            }


            if (checkException != null)
            {
                pMessageReturned = checkException.Message;
            }

            ///////////////////////////////////////////////
            //Insert notification
            //if(paymentRequestData.pPaymentRequestID == 0)//Insert Payment Request
            if (paymentRequestData.pIsNotifyOrNot == 0)
            {
                objCA_PaymentRequest.GetList("  Where ID = " + objCVarA_PaymentRequest.ID);
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

            return new object[]
            {
                pMessageReturned
            };
        }
        [HttpGet, HttpPost]
        public object[] LoadDetails(Int32 pHeaderID, Int32 pIsCustodySettlement)
        {
            CA_PaymentRequestDetails objCA_PaymentRequestDetails = new CA_PaymentRequestDetails();
            Exception checkException = null;
            int _RowCount = 0;
            String pWhereClause = "";
            if (pIsCustodySettlement == 1)
                pWhereClause = "WHERE PaymentRequestID=" + pHeaderID.ToString();
            else
                pWhereClause = "WHERE PaymentRequestID=" + pHeaderID.ToString() + " AND isnull(IsSettlementOnly,0)=0";
            //pWhereClause = "WHERE PaymentRequestID=" + pHeaderID.ToString() + " AND IsSettlementOnly  IS NULL";

            checkException = objCA_PaymentRequestDetails.GetListPaging(99999, 1, pWhereClause, "ID", out _RowCount);

            CA_PaymentRequest objCA_PaymentRequest = new CA_PaymentRequest();
            objCA_PaymentRequest.GetList(" Where ID = " + pHeaderID + "");

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

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                   serializer.Serialize(objCA_PaymentRequestDetails.lstCVarA_PaymentRequestDetails) //pData[0]
                  ,serializer.Serialize(objCA_PaymentRequest.lstCVarA_PaymentRequest)
                  ,serializer.Serialize(objCvwA_PaymentRequestDetails.lstCVarvwA_PaymentRequestDetails)
                  ,serializer.Serialize(objCCustody.lstCVarCustody)//3
                  ,serializer.Serialize(objCvwA_PaymentRequestSupplier.lstCVarvwA_PaymentRequestSupplier)//4
                  ,serializer.Serialize(objCvwA_PaymentRequest.lstCVarvwA_PaymentRequest)//5

                  
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

            Exception checkException = null;
            if (ErrorMessage == "")
            {
                CA_PaymentRequestDetails objCA_PaymentRequestDetails = new CA_PaymentRequestDetails();

                checkException = objCA_PaymentRequestDetails.DeleteList("WHERE PaymentRequestID IN (" + pDeletedPaymentRequestIDs + ")");
                if (checkException == null)
                    checkException = objCA_PaymentRequest.DeleteList("WHERE ID IN (" + pDeletedPaymentRequestIDs + ")");

            }


            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("DELETE")) // some or all of the rows were not deleted due to dependencies
                    _result = false;
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

            string CompanyName = objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName;
            if (pIsCustodySettlement == 0)
                checkException = objCA_PaymentRequest.GetList("WHERE IsApprovedRequest = " + "1" + "  AND ID in (" + pDeletedPaymentRequestIDs + ")");
            else
                checkException = objCA_PaymentRequest.GetList("WHERE IsApprovedSettlement = " + "1" + " AND ID in (" + pDeletedPaymentRequestIDs + ")");


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
            else
                foreach (var currentID in pDeletedPaymentRequestIDs.Split(','))
                {
                    // string pWhereClause = "";

                    CCustomizedDBCall objCPaymentsCustomizedDBCall = new CCustomizedDBCall();

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
                            checkException = objCA_PaymentRequest.UpdateList("IsApprovedRequest=" + "1" + " WHERE ID=" + currentID.ToString());
                            checkException = objCA_AccreditationMovement.UpdateList("TechnicalDirector=" + WebSecurity.CurrentUserId + " WHERE PaymentRequestID=" + currentID.ToString());

                        }

                        else
                        {
                            checkException = objCA_PaymentRequest.UpdateList("IsApprovedSettlement=" + "1" + " WHERE ID=" + currentID.ToString());

                        }
                        objCA_PaymentRequest.GetList("WHERE ID=" + currentID.ToString());


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
                            else
                            {
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

                                objCVarPayables.OperationID = objCA_PaymentRequestDetails.lstCVarA_PaymentRequestDetails[k].OperationID;
                                objCVarPayables.OperationID = objCA_PaymentRequestDetails.lstCVarA_PaymentRequestDetails[k].OperationID;
                                objCVarPayables.ChargeTypeID = objCA_PaymentRequestDetails.lstCVarA_PaymentRequestDetails[k].ChargeTypeID;
                                objCVarPayables.SupplierOperationPartnerID = objCA_PaymentRequestDetails.lstCVarA_PaymentRequestDetails[k].SupplierID;//0;
                                objCVarPayables.Quantity = 1;
                                objCVarPayables.CostPrice = objCA_PaymentRequestDetails.lstCVarA_PaymentRequestDetails[k].ActualCost;//0;
                                objCVarPayables.CostAmount = objCA_PaymentRequestDetails.lstCVarA_PaymentRequestDetails[k].ActualCost;
                                objCVarPayables.InitialSalePrice = objCA_PaymentRequestDetails.lstCVarA_PaymentRequestDetails[k].ActualCost;
                                objCVarPayables.QuotationCost = objCA_PaymentRequestDetails.lstCVarA_PaymentRequestDetails[k].EstmatedCost;
                                objCVarPayables.AmountWithoutVAT = objCA_PaymentRequestDetails.lstCVarA_PaymentRequestDetails[k].ActualCost; //still no VAT entered so they are the same
                                objCVarPayables.SupplierReceiptNo = objCA_PaymentRequestDetails.lstCVarA_PaymentRequestDetails[k].Coupon;
                                objCVarPayables.BillID = objCA_PaymentRequestDetails.lstCVarA_PaymentRequestDetails[k].HouseID;

                                // objCVarPayables.SupplierInvoiceNo = certificateNumber;

                                objCVarPayables.ExchangeRate = ExchangeRate; //rowQuotationCharge.CostExchangeRate;
                                objCVarPayables.CurrencyID = objCA_PaymentRequest.lstCVarA_PaymentRequest[0].CurrencyID;
                                if (objCvwOperationPartners.lstCVarvwOperationPartners.Count > 0)
                                    objCVarPayables.Notes = "Payment Request " + objCA_PaymentRequest.lstCVarA_PaymentRequest[0].Code + " Supplier " + objCvwOperationPartners.lstCVarvwOperationPartners[0].PartnerTypeName + ":  " + objCvwOperationPartners.lstCVarvwOperationPartners[0].PartnerName;//"";
                                else
                                    objCVarPayables.Notes = "Payment Request " + objCA_PaymentRequest.lstCVarA_PaymentRequest[0].Code;

                                objCVarPayables.IsOfficial = false;
                                objCVarPayables.IsQuotationApproval = false;
                                objCVarPayables.ApprovePendingValue = 0;
                                objCVarPayables.crmCode = "";
                                objCVarPayables.IsPurchased = false;

                                objCPayables.lstCVarPayables.Add(objCVarPayables);

                                checkException = objCPayables.SaveMethod(objCPayables.lstCVarPayables);
                                checkException = objCA_PaymentRequestDetails.UpdateList("PayableID="
                                    + objCPayables.lstCVarPayables[0].ID + " WHERE ID=" + objCA_PaymentRequestDetails.lstCVarA_PaymentRequestDetails[k].ID.ToString());


                            }


                        }
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
                    //if (pIsCustodySettlement == 0)
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

                    //if (pIsCustodySettlement == 0)
                    checkException = objCEmailReceivers.SaveMethod(objCEmailReceivers.lstCVarEmailReceiver);
                }
            if (checkException == null)
            {
                foreach (var currentID in pDeletedPaymentRequestIDs.Split(','))
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
            if (checkException != null || ErrorMessage != "") // an exception is caught in the model
            {
                _result = false;
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

            // نتأكد ان العمليات المربوطة بتفاصيل طلب الدفع مش مربوطة بفواتير
            COperations cOperations = new COperations();
            var OperationConditions = " WHERE (dbo.Operations.ID IN(SELECT aprd.OperationID FROM dbo.A_PaymentRequestDetails AS aprd WHERE aprd.PaymentRequestID  IN(" + pDeletedPaymentRequestIDs + "))AND(SELECT COUNT(i.InvoiceNumber)  FROM dbo.Invoices AS i WHERE   ISNULL( i.IsDeleted , 0 ) = 0 AND i.OperationID = dbo.Operations.ID) > 0)";
            cOperations.GetList(OperationConditions);
            //if (cOperations.lstCVarOperations != null && cOperations.lstCVarOperations.Count > 0)
            //{
            //    ErrorMessage = "" + String.Join(",", cOperations.lstCVarOperations.Select(x => x.Code)) + "  العمليات المربوطة  عليها فواتير  ";


            //    ErrorMessage = ErrorMessage + "\r\n" + "----------------" + "\r\n";
            //}


            CvwPayables cApprovedPayables = new CvwPayables();
            var ApprovedPayableCondition = "WHERE(dbo.vwPayables.ID  IN(SELECT aprd.PayableID FROM dbo.A_PaymentRequestDetails AS aprd  WHERE aprd.PaymentRequestID  IN(" + pDeletedPaymentRequestIDs + ")) AND(IsNull(dbo.vwPayables.IsApproved, 0) = 1))";
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
                            checkException = objCA_PaymentRequest.UpdateList(" IsAccept=0  , IsApprovedRequest = " + "0" + " WHERE ID=" + currentID.ToString());
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
                                checkException = cReceivables.UpdateList(" PayableID = null where PayableID = " + objCA_PaymentRequestDetails.lstCVarA_PaymentRequestDetails[k].PayableID + "");
                                checkException = cA_PaymentRequestDetails.UpdateList(" ActualCost = 0 , PayableID = null where PayableID = " + objCA_PaymentRequestDetails.lstCVarA_PaymentRequestDetails[k].PayableID + "");
                                checkException = cPayables.DeleteList(" where ID = " + objCA_PaymentRequestDetails.lstCVarA_PaymentRequestDetails[k].PayableID + "");




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
        #endregion PaymentRequest

  
  

        [HttpGet, HttpPost]
        public object[] Details_Delete(string pDeletedPaymentRequestDetailsIDs
            //Header Parameters
            , Int64 pPaymentRequestID)
        {
            bool _result = false;
            Exception checkException = null;

            CA_PaymentRequestDetails objCA_PaymentRequestDetails = new CA_PaymentRequestDetails();
            CA_PaymentRequest objCA_PaymentRequest = new CA_PaymentRequest();

            checkException = objCA_PaymentRequestDetails.DeleteList("WHERE ID IN (" + pDeletedPaymentRequestDetailsIDs + ")");
            if (checkException == null)
                _result = true;

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
        public Boolean UpdateVoucherIDInPaymentRequest(int pVoucherID, int pPaymentRequestID)
        {
            Exception checkException = null;
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



        [HttpGet, HttpPost]
        public object[] GetChargeTypes(int pOperationId, Boolean pFlagChargeType)
        {
            //if (pFlagChargeType)
            //{
            int _RowCount = 0;
            CvwPayables objCvwPayables = new CvwPayables();
            String WhereClause = " Where OperationID = " + pOperationId + " AND ChargeTypeID NOT IN (SELECT aprd.ChargeTypeID FROM A_PaymentRequestDetails AS aprd WHERE aprd.OperationID=" + pOperationId + ")";
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
        public int pIsNotifyOrNot { get; set; }
        public int pChargeTypeGroupID { get; set; }
        public int pPaymentComboID { get; set; }
        public int pIssuedToCmbo { get; set; }


        public string pAttache { get; set; }
        public string pPayment { get; set; }
        public string pIssuedTo { get; set; }




    }
}

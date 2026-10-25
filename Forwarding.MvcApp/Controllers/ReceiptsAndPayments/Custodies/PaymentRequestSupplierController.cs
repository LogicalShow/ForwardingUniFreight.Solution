using Forwarding.MvcApp.Models.Administration.Security.Generated;
using Forwarding.MvcApp.Models.Administration.Settings.Generated;
using Forwarding.MvcApp.Models.Customized;
using Forwarding.MvcApp.Models.LocalEmails.Generated;
using Forwarding.MvcApp.Models.MasterData.BanksAccountsAndTreasuries.Generated;
using Forwarding.MvcApp.Models.MasterData.Invoicing.Generated;
using Forwarding.MvcApp.Models.MasterData.Partners.Generated;
using Forwarding.MvcApp.Models.NoAccess.Generated;
using Forwarding.MvcApp.Models.Operations.Operations.Generated;
using Forwarding.MvcApp.Models.ReceiptsAndPayments.Custodies.Generated;
using Forwarding.MvcApp.Models.ReceiptsAndPayments.Transactions.Generated;
using System;
using System.Collections.Generic;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;

namespace Forwarding.MvcApp.Controllers.ReceiptsAndPayments.Custodies
{
    public class PaymentRequestSupplierController : ApiController
    {
        #region PaymentRequest
          
        [HttpGet, HttpPost]
        public object[] LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned(bool pIsLoadArrayOfObjects, string pLanguage, Int32 pPageNumber, Int32 pPageSize, string pWhereClause, string pOrderBy)
        {
            int _RowCount = 0;
            Exception checkException = null;
            CDefaults objCDefaults = new CDefaults();
            objCDefaults.GetListPaging(999999, 1, "WHERE 1=1", "ID", out _RowCount);
            


            CvwA_PaymentRequestSupplier objCvwA_PaymentRequest = new CvwA_PaymentRequestSupplier();

            //CvwCustody objCvwCustody = new CvwCustody();
            CvwSuppliers objCvwSuppliers = new CvwSuppliers();
           

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
            objCUsers.GetListPaging(999999, 1, "WHERE ID=" + WebSecurity.CurrentUserId, "ID", out _RowCount);
            if (!objCUsers.lstCVarUsers[0].IsAccessAllCharges)
                pWhereClauseWithMinimalColumns += " AND ID IN (SELECT ChargeTypeID FROM DepartmentCharge WHERE DepartmentID=" + objCUsers.lstCVarUsers[0].DepartmentID + ") \n";

            CvwChargeTypesWithMinimalColumns objCvwChargeTypes = new CvwChargeTypesWithMinimalColumns();

            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
            
            string IsAccessAllCharges = objCCustomizedDBCall.CallStringFunction(" SELECT u.IsAccessAllCharges FROM Users AS u WHERE u.ID =  " + WebSecurity.CurrentUserId);
            string pWhereClauseOp = "";
            string pWhereClauseHouse = "";
            CvwDefaults objCvwDefaults = new CvwDefaults();
            objCvwDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount); //i am sure i ve just one row isa

            string CompanyName = objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName;

            if (IsAccessAllCharges == "False")
            {
                string PartenerID = objCCustomizedDBCall.CallStringFunction("SELECT c.ID FROM Custody AS c WHERE c.UserID = " + WebSecurity.CurrentUserId);
                pWhereClauseOp = "  AND PartnerID=" + PartenerID;
                pWhereClauseHouse = " AND PartnerID = " + PartenerID;
            }
            if (pIsLoadArrayOfObjects)
            {
                objCvwChargeTypes.GetListPaging(999999, 1, pWhereClauseWithMinimalColumns, "Name", out _RowCount);
                objCvwSuppliers.GetList("WHERE 1=1");
                //objCvwOperations.GetListPaging(999999, 1, (pWhereClauseForCombo + " AND Code IS NOT NULL  AND ID IN (SELECT vo.ID FROM vwOperations AS vo WHERE vo.OperationStageName LIKE '%OPEN%')"), pOrderBy, out _RowCount);
                
                
                objCvwA_PaymentRequestCertificateNumber.GetListPaging(999999, 1, (pWhereClauseForCombo + " AND Name IS NOT NULL"), pOrderBy, out _RowCount);
                objCCvwA_PaymentRequestTruckingOrder.GetListPaging(999999, 1, (pWhereClauseForCombo + " AND Name IS NOT NULL"), pOrderBy, out _RowCount);

                objCvwOperations.GetListPaging(999999, 1, (pWhereClauseForCombo + " AND Code IS NOT NULL"), pOrderBy, out _RowCount);
                objCvwA_PaymentRequestHouse.GetListPaging(999999, 1, (pWhereClauseForCombo + "AND NAME IS NOT NULL AND MasterOperationID IS NOT null  "), pOrderBy, out _RowCount); // AND CreatorUserID = " + WebSecurity.CurrentUserId

            }
            CNoAccessPartnerTypes objCNoAccessPartnerTypes = new CNoAccessPartnerTypes();
            objCNoAccessPartnerTypes.GetList(" WHERE 1=1 ");
            //pWhereClause = " where 1= 1 "; 
            checkException = objCvwA_PaymentRequest.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };

            return new object[] {serializer.Serialize(objCvwA_PaymentRequest.lstCVarvwA_PaymentRequestSupplier)//pData[0]
                ,_RowCount //pData[1]
                ,serializer.Serialize(objCvwSuppliers.lstCVarvwSuppliers)//pData[2]
                ,serializer.Serialize(objCvwOperations.lstCVarvwOperationsWithMinimalColumns)//pData[3]}
                ,serializer.Serialize(objCvwChargeTypes.lstCVarvwChargeTypesWithMinimalColumns)//pData[4]
                ,serializer.Serialize(objCvwA_PaymentRequestHouse.lstCVarvwA_PaymentRequestHouse)//pData[5]
                ,serializer.Serialize(objCvwA_PaymentRequestCertificateNumber.lstCVarvwA_PaymentRequestCertificateNumber)//pData[6]
                ,serializer.Serialize(objCCvwA_PaymentRequestTruckingOrder.lstCVarvwA_PaymentRequestTruckingOrder)//pData[6]
                ,serializer.Serialize(objCNoAccessPartnerTypes.lstCVarNoAccessPartnerTypes)//pData[7]
            };
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
        //[HttpGet, HttpPost]
        //public Object[] GetCustudy()
        //{
        //    CvwCustody objCvwCustody = new CvwCustody();
        //    objCvwCustody.GetList("WHERE 1=1");

        //    var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
        //    return new object[] {
        //        serializer.Serialize(objCvwCustody.lstCVarvwCustody)//pData[2]
               
        //    };

        //}
        //[HttpGet, HttpPost]
        //public Object[] GetUserIDFromCustudy()
        //{
        //    CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
        //    string CustudyID = "0";

        //    CustudyID = objCCustomizedDBCall.CallStringFunction("SELECT TOP 1 c.ID FROM Custody AS c WHERE c.UserID = " + WebSecurity.CurrentUserId);
           

        //    return new Object[] { CustudyID };

        //}
        public object[] Save([FromBody] paymentRequestsupplierData paymentRequestsupplierData)
        {
            string pMessageReturned = "";
            Exception checkException = null;

            CA_PaymentRequest objCA_PaymentRequest = new CA_PaymentRequest();
            CA_PaymentRequestDetails objCA_PaymentRequestDetails = new CA_PaymentRequestDetails();


            CVarA_PaymentRequest objCVarA_PaymentRequest = new CVarA_PaymentRequest();
            CA_PaymentRequest objCA_PaymentRequestExists = new CA_PaymentRequest();
            CA_AccreditationMovement objCA_AccreditationMovement= new CA_AccreditationMovement();
            CCustomizedDBCall objCPaymentsCustomizedDBCall = new CCustomizedDBCall();
            //string code  = objCPaymentsCustomizedDBCall.CallStringFunction("SELECT TOP 1 code+1  FROM A_PaymentRequest AS apr WHERE CreatorUserID_Request = "+ WebSecurity.CurrentUserId + " ORDER BY apr.Code DESC " );

            if (paymentRequestsupplierData.pPaymentRequestID != 0)
            {
                objCA_PaymentRequestExists.GetList(" Where ID = " + paymentRequestsupplierData.pPaymentRequestID);
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
            objCVarA_PaymentRequest.ID = paymentRequestsupplierData.pPaymentRequestID;
            objCVarA_PaymentRequest.Code = paymentRequestsupplierData.pCode;
            objCVarA_PaymentRequest.IsCheck = paymentRequestsupplierData.pIsCheck;
            objCVarA_PaymentRequest.Notes = paymentRequestsupplierData.pNotes;
            if (paymentRequestsupplierData.pIsCustodySettlement == 1)
                objCVarA_PaymentRequest.SettlementDate = paymentRequestsupplierData.pSettlementDate;
            objCVarA_PaymentRequest.RequestDate = paymentRequestsupplierData.pRequestDate;
            objCVarA_PaymentRequest.SupplierID = paymentRequestsupplierData.pSupplierID;
            objCVarA_PaymentRequest.CurrencyID = paymentRequestsupplierData.pCurrencyID;
            if (paymentRequestsupplierData.pPaymentRequestID == 0)
                objCVarA_PaymentRequest.CreatorUserID_Request = WebSecurity.CurrentUserId;
            objCVarA_PaymentRequest.CreationDate_Request = DateTime.Now;
            objCVarA_PaymentRequest.ModificationDate_Request = Convert.ToDateTime("1900/01/01");
            objCVarA_PaymentRequest.CreationDate_Settlement = Convert.ToDateTime("1900/01/01");
            objCVarA_PaymentRequest.ModificationDate_Settlement = Convert.ToDateTime("1900/01/01");
            objCVarA_PaymentRequest.SettlementDate = Convert.ToDateTime("1900/01/01");
            objCVarA_PaymentRequest.TotalEstmatedCost = Convert.ToDecimal(paymentRequestsupplierData.pTotalEstmatedCost);
            if (paymentRequestsupplierData.pIsCustodySettlement == 1)
            {
                objCVarA_PaymentRequest.TotalActualCost = Convert.ToDecimal(paymentRequestsupplierData.pTotalActualCost);
                objCVarA_PaymentRequest.TotalDiff = Convert.ToDecimal(paymentRequestsupplierData.pTotalDiff);
            }
            objCVarA_PaymentRequest.Discount = 0;

            objCA_PaymentRequest.lstCVarA_PaymentRequest.Add(objCVarA_PaymentRequest);

            checkException = objCA_PaymentRequest.SaveMethod(objCA_PaymentRequest.lstCVarA_PaymentRequest);

            if (paymentRequestsupplierData.pIDList != null && paymentRequestsupplierData.pIDList != "") //to prevent error in case if no details
            {

                int NumberOfDetails = paymentRequestsupplierData.pIDList.Split(',').Length;
                for (int i = 0; i < NumberOfDetails; i++)
                {
                    if (paymentRequestsupplierData.pIDList.Split(',')[i].ToString() != "")
                    {
                        CVarA_PaymentRequestDetails objVarA_PaymentRequestDetails = new CVarA_PaymentRequestDetails();
                        CA_PaymentRequestDetails ExistsCA_PaymentRequestDetails = new CA_PaymentRequestDetails();
                        ExistsCA_PaymentRequestDetails.GetList(" Where ID = " + Convert.ToInt32(paymentRequestsupplierData.pIDList.Split(',')[i]));
                        if (ExistsCA_PaymentRequestDetails.lstCVarA_PaymentRequestDetails.Count > 0)
                        {
                            objVarA_PaymentRequestDetails.PayableID = ExistsCA_PaymentRequestDetails.lstCVarA_PaymentRequestDetails[0].PayableID;
                        }
                        objVarA_PaymentRequestDetails.ID = Convert.ToInt32(paymentRequestsupplierData.pIDList.Split(',')[i]);
                        objVarA_PaymentRequestDetails.PaymentRequestID = objCVarA_PaymentRequest.ID;
                        //objVarA_PaymentRequestDetails.ChargeTypeID = Convert.ToInt32(paymentRequestsupplierData.pChargeTypeList.Split(',')[i]);
                        objVarA_PaymentRequestDetails.OperationID = Convert.ToInt32(paymentRequestsupplierData.pOperationList.Split(',')[i]);
                        objVarA_PaymentRequestDetails.SupplierID = Convert.ToInt32(paymentRequestsupplierData.pSupplierList.Split(',')[i]);

                        objVarA_PaymentRequestDetails.EstmatedCost = Convert.ToDecimal(paymentRequestsupplierData.pEstmatedCostList.Split(',')[i]);

                        objVarA_PaymentRequestDetails.Coupon = paymentRequestsupplierData.pCouponList.Split(',')[i];
                        objVarA_PaymentRequestDetails.Description = paymentRequestsupplierData.pDescriptionList.Split(',')[i];
                        objVarA_PaymentRequestDetails.FilterChargeTypes = Convert.ToBoolean(paymentRequestsupplierData.pFilterChargeTypesList.Split(',')[i]);
                        if (paymentRequestsupplierData.pActualCostList != "0")
                            objVarA_PaymentRequestDetails.ActualCost = Convert.ToDecimal(paymentRequestsupplierData.pActualCostList.Split(',')[i]);
                        if (paymentRequestsupplierData.pIsCustodySettlement == 1)
                        {
                            objVarA_PaymentRequestDetails.ActualDescription = paymentRequestsupplierData.pActualDescriptionList.Split(',')[i];
                            objVarA_PaymentRequestDetails.PartenerTypeID = Convert.ToInt32(paymentRequestsupplierData.pPartenerTypeIDList.Split(',')[i]);
                            objVarA_PaymentRequestDetails.PartenerID = Convert.ToInt32(paymentRequestsupplierData.pPartenerIDList.Split(',')[i]);

                            if (objVarA_PaymentRequestDetails.ID == 0)
                                objVarA_PaymentRequestDetails.IsSettlementOnly = true;
                            else
                                objVarA_PaymentRequestDetails.IsSettlementOnly = Convert.ToBoolean(paymentRequestsupplierData.pIsSettlementOnlyList.Split(',')[i]);

                        }
                        else
                        {
                            objVarA_PaymentRequestDetails.ActualDescription = "0";
                        }

                        objVarA_PaymentRequestDetails.HouseID = Convert.ToInt32(paymentRequestsupplierData.pHouseIDList.Split(',')[i]);
                        objVarA_PaymentRequestDetails.CertificateNumberID =0;
                        objVarA_PaymentRequestDetails.TruckingOrderID = Convert.ToInt32(paymentRequestsupplierData.pTruckingOrderIDList.Split(',')[i]);

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
            //if(paymentRequestsupplierData.pPaymentRequestID == 0)//Insert Payment Request
            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
            string CurrencyCode = objCCustomizedDBCall.CallStringFunction("SELECT code FROM Currencies WHERE id =" + objCA_PaymentRequest.lstCVarA_PaymentRequest[0].CurrencyID);

            if (paymentRequestsupplierData.pIsNotifyOrNot == 0) 
            {
                objCA_PaymentRequest.GetList("  Where ID = " + objCVarA_PaymentRequest.ID);
                CEmail objCEmail = new CEmail();
                CVarEmail objCVarEmail = new CVarEmail();
                objCVarEmail.ID = 0;
                if (paymentRequestsupplierData.pIsCustodySettlement == 0)
                {
                    if (objCA_PaymentRequest.lstCVarA_PaymentRequest.Count > 0)
                        objCVarEmail.Subject = "Payment Request Supplier " + objCA_PaymentRequest.lstCVarA_PaymentRequest[0].Code + " - "+ CurrencyCode + " - طلب صرف مورد ";
                    else
                        objCVarEmail.Subject = "Payment Request Supplier  -  طلب صرف مورد";
                    objCVarEmail.Body = "Approve Payment Request Supplier/" + objCVarA_PaymentRequest.ID.ToString() + "";
                }
                else
                {
                    if (objCA_PaymentRequest.lstCVarA_PaymentRequest.Count > 0)
                        objCVarEmail.Subject = "Approve Custody Settlement " + objCA_PaymentRequest.lstCVarA_PaymentRequest[0].Code + " - " + CurrencyCode + " - اعتماد تسوية";
                    else
                        objCVarEmail.Subject = "Approve Custody Settlement - تسوية عهد";
                    objCVarEmail.Body = "Approve Custody Settlement/" + objCVarA_PaymentRequest.ID.ToString() + "";
                }

                /*objCVarEmail.Body = "Approve Payment Request/" + objCVarA_PaymentRequest.ID.ToString() + "";*/// " Payment request with code "+ objCA_PaymentRequest.lstCVarA_PaymentRequest[0].Code + " ";
                objCVarEmail.SenderUserID = WebSecurity.CurrentUserId;
                objCVarEmail.SendingDate = DateTime.Now;
                objCEmail.lstCVarEmail.Add(objCVarEmail);
                //if (paymentRequestsupplierData.pIsCustodySettlement == 0)
                objCEmail.SaveMethod(objCEmail.lstCVarEmail);

                CEmailReceiver objCEmailReceiver = new CEmailReceiver();
                string[] ReceiverUsers = paymentRequestsupplierData.pSelectedItemsIDs.Split(',');
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

                //if (paymentRequestsupplierData.pIsCustodySettlement == 0)
                objCEmailReceiver.SaveMethod(objCEmailReceiver.lstCVarEmailReceiver);

            }


            ///////////////////////////////////////////////
            //if (checkException == null)
            //{
            //    CPayables objCPayables = new CPayables();
            //    if (paymentRequestsupplierData.pIDList != null && paymentRequestsupplierData.pIDList != "") //to prevent error in case if no details
            //    {

            //        int NumberOfDetails = paymentRequestsupplierData.pIDList.Split(',').Length;
            //        for (int i = 0; i < NumberOfDetails; i++)
            //        {
            //            if (paymentRequestsupplierData.pIDList.Split(',')[i].ToString() != "")
            //            {

            //                CVarPayables objCVarPayables = new CVarPayables();
            //                objCVarPayables.ID = 0;
            //                objCVarPayables.CustodyID = paymentRequestsupplierData.pCustodyID;
            //                objCVarPayables.OperationID = Convert.ToInt32(paymentRequestsupplierData.pOperationList.Split(',')[i]);
            //                objCVarPayables.ExchangeRate = 1;
            //                objCVarPayables.EntryDate = DateTime.Now;
            //                objCVarPayables.CurrencyID = 83;
            //                objCVarPayables.ChargeTypeID = Convert.ToInt32(paymentRequestsupplierData.pChargeTypeList.Split(',')[i]);
            //                objCVarPayables.CostPrice = Convert.ToDecimal(paymentRequestsupplierData.pEstmatedCostList.Split(',')[i]);
            //                objCVarPayables.Quantity = 1;
            //                objCVarPayables.AmountWithoutVAT = Convert.ToDecimal(paymentRequestsupplierData.pEstmatedCostList.Split(',')[i]);
            //                objCVarPayables.CostAmount = Convert.ToDecimal(paymentRequestsupplierData.pEstmatedCostList.Split(',')[i]);
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

            CvwA_PaymentRequestSupplier objCvwA_PaymentRequest = new CvwA_PaymentRequestSupplier();
            objCvwA_PaymentRequest.GetListPaging(99999, 1, "WHERE ID=" + pHeaderID, "ID", out _RowCount);
            //objCvwA_PaymentRequest.GetList(" Where ID = " + pHeaderID + "");


            CvwA_PaymentRequestDetails objCvwA_PaymentRequestDetails = new CvwA_PaymentRequestDetails();
            objCvwA_PaymentRequestDetails.GetListPaging(99999, 1, "WHERE PaymentRequestID=" + pHeaderID.ToString(), "ID", out _RowCount);
             
           
            CSuppliers objCSuppliers = new CSuppliers();
            objCSuppliers.GetList(" Where ID = " + objCA_PaymentRequest.lstCVarA_PaymentRequest[0].SupplierID);

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
               serializer.Serialize(objCA_PaymentRequestDetails.lstCVarA_PaymentRequestDetails) //pData[0]
              ,serializer.Serialize(objCA_PaymentRequest.lstCVarA_PaymentRequest)
              ,serializer.Serialize(objCvwA_PaymentRequestDetails.lstCVarvwA_PaymentRequestDetails)
              ,serializer.Serialize(objCSuppliers.lstCVarSuppliers)//3
              ,serializer.Serialize(objCvwA_PaymentRequest.lstCVarvwA_PaymentRequestSupplier)//4
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
                    ErrorMessage = "Already Approved,  تم اعتماد طلب الصرف مورد سابقا ";
            else
                foreach (var currentID in pDeletedPaymentRequestIDs.Split(','))
                {
                    // string pWhereClause = "";

                    CCustomizedDBCall objCPaymentsCustomizedDBCall = new CCustomizedDBCall();

                    if (pIsCustodySettlement == 1)
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

                        else {
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
                            certificateNumber = objCPaymentsCustomizedDBCall.CallStringFunction("SELECT (o.HouseNumber + CASE WHEN o.CertificateNumber IS NULL THEN '' ELSE ' - ' END + isnull(o.CertificateNumber,'')) AS Name FROM OperationPartners OP LEFT JOIN Operations O ON O.ID = OP.OperationID  WHERE o.ID = "+ objCA_PaymentRequestDetails.lstCVarA_PaymentRequestDetails[k].HouseID + " GROUP BY  o.HouseNumber, o.CertificateNumber");

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

                            objCVarPayables.SupplierInvoiceNo = certificateNumber;
                           
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
                        CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
                        string CurrencyCodes = objCCustomizedDBCall.CallStringFunction("SELECT code FROM Currencies WHERE id =" + objCA_PaymentRequest.lstCVarA_PaymentRequest[0].CurrencyID);

                        //Insert notification
                        CEmail objCEmail = new CEmail();
                        CVarEmail objCVarEmail = new CVarEmail();
                        objCVarEmail.ID = 0;
                        if (objCA_PaymentRequest.lstCVarA_PaymentRequest.Count > 0)
                            objCVarEmail.Subject = " Payment Request Supplier Aprroved " + objCA_PaymentRequest.lstCVarA_PaymentRequest[0].Code + " - " + CurrencyCodes + " - تم اعتماد طلب صرف مورد";
                        else
                            objCVarEmail.Subject = " Payment Request Supplier - تم اعتماد طلب صرف مورد";
                        objCVarEmail.Body = "Payment Request Supplier Aprroved/" + currentID.ToString() + "";// " Payment request with code "+ objCA_PaymentRequest.lstCVarA_PaymentRequest[0].Code + " ";
                        objCVarEmail.SenderUserID = WebSecurity.CurrentUserId;
                        objCVarEmail.SendingDate = DateTime.Now;
                        objCEmail.lstCVarEmail.Add(objCVarEmail);
                        if (pIsCustodySettlement == 0)
                            objCEmail.SaveMethod(objCEmail.lstCVarEmail);

                        CEmailReceiver objCEmailReceiver = new CEmailReceiver();
                        string[] ReceiverUsers = PReceiverUsers.Split(',');
                        CCustomizedDBCall objCCustomizedDBCallN = new CCustomizedDBCall();

                        string ReceiverUserID = objCCustomizedDBCallN.CallStringFunction("SELECT TOP 1 e.SenderUserID FROM Email AS e WHERE e.Body LIKE '%Payment Request Supplier/" + currentID.ToString() + "%'");

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
                    objCVarEmails.ID = 0;
                    CCustomizedDBCall objCCustomizedDBCalln = new CCustomizedDBCall();
                    string CurrencyCode = objCCustomizedDBCalln.CallStringFunction("SELECT code FROM Currencies WHERE id =" + objCA_PaymentRequest.lstCVarA_PaymentRequest[0].CurrencyID);

                    if (objCA_PaymentRequest.lstCVarA_PaymentRequest.Count > 0)
                        
                    {
                        if (pIsCustodySettlement == 0)
                        {
                            objCVarEmails.Subject = " The request Supplier has been approved " + objCA_PaymentRequest.lstCVarA_PaymentRequest[0].Code + " - " + CurrencyCode +  " - سداد مورد";
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
                            objCVarEmails.Subject = " The request has been approved - سداد مورد";
                        }
                        else
                        {
                            objCVarEmails.Subject = " The Custody Settlement has been approved - تم إعتماد تسوية العهد";
                        }
                    }
                        
                        
                    objCVarEmails.Body = "The Payment Request Supplier has been approved/" + currentID.ToString() + "";// " Payment request with code "+ objCA_PaymentRequest.lstCVarA_PaymentRequest[0].Code + " ";
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
                        objCVarEmailReceiver.ReceiverUserID = Convert.ToInt32(ReceiverUser[j]);
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
                    objCEmail.GetList(" Where ( Body like '%Approve Payment Request Supplier/%' ) OR ( Body like '%Approve Custody Settlement/%' ) ");
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

            checkException = objCA_AccreditationMovement.UpdateList("SecretaryTreasury=" + WebSecurity.CurrentUserId + " WHERE PaymentRequestID=" + pPaymentRequestID);

            if (checkException == null)
            {
                CEmail objCEmail = new CEmail();
                objCEmail.GetList(" Where Body like '%Payment Request/%'");
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

    public class paymentRequestsupplierData
    {
        public Int32 pPaymentRequestID { get; set; }
        public string pCode { get; set; }
        public Int32 pSupplierID { get; set; }
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



    }
}

using Forwarding.MvcApp.Models.Accounting.Transactions.Generated;
using Forwarding.MvcApp.Models.Customized;
using Forwarding.MvcApp.Models.MasterData.Invoicing;
//using Forwarding.MvcApp.Models.Invoicing.BasicData;
using Forwarding.MvcApp.Models.ReceiptsAndPayments.Transactions.Generated;
using Forwarding.MvcApp.Models.ReceiptsAndPayments.ShipLink.Generated;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;

namespace Forwarding.MvcApp.Controllers.ShipLink.API_Transactions
{
    public class ShipLinkInvoiceUnpostingController : ApiController
    {
        [HttpGet, HttpPost]
        public object[] LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned(bool pIsLoadArrayOfObjects, string pLanguage, Int32 pPageNumber, Int32 pPageSize, string pWhereClause, string pOrderBy)
        {
            int _RowCount = 0;
            CvwSL_InvoiceType objCInvoiceType = new CvwSL_InvoiceType();
            objCInvoiceType.GetList("WHERE 1=1 ORDER BY Name");
            CvwSL_PostedInvoiceJVs objCvwSL_PostedInvoiceJVs = new CvwSL_PostedInvoiceJVs();
            objCvwSL_PostedInvoiceJVs.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);

            return new object[] {
                new JavaScriptSerializer().Serialize(objCvwSL_PostedInvoiceJVs.lstCVarvwSL_PostedInvoiceJVs)
                , _RowCount
                , new JavaScriptSerializer().Serialize(objCInvoiceType.lstCVarvwSL_InvoiceType) //pInvoiceType = pData[2]
            };
        }

        [HttpGet, HttpPost]
        public object[] Unpost(string pSelectedIDs)
        {
            Exception checkException = null;
            string strMessage = "";
            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
            CA_Voucher objCA_Voucher = new CA_Voucher();
            CA_VoucherDetails objCA_VoucherDetails = new CA_VoucherDetails();
            CA_JV objCA_JV = new CA_JV();
            CA_JVDetails objCA_JVDetails = new CA_JVDetails();
            CSL_InvoiceJVs objCSL_InvoiceJVs = new CSL_InvoiceJVs();
            CSL_InvoiceJVs objCSL_InvoiceJVs2 = new CSL_InvoiceJVs();


            CA_JV objCA_JV2 = new CA_JV();
            CA_Fiscal_Year_Period objCA_Fiscal_Year_Period = new CA_Fiscal_Year_Period();
            CA_Fiscal_Year_Period objCA_Fiscal_Year_Period2 = new CA_Fiscal_Year_Period();

            var constVoucherCashIn = 10;
            var constVoucherChequeIn = 30;

            var ArrIfClosedSelectedIDs = pSelectedIDs.Split(',');
            for (int i = 0; i < ArrIfClosedSelectedIDs.Length; i++)
            {
                checkException = objCSL_InvoiceJVs.GetList("WHERE JVID1=" + ArrIfClosedSelectedIDs[i]);
                if (objCSL_InvoiceJVs.lstCVarSL_InvoiceJVs.Count > 0)
                    for (int j = 0; j < objCSL_InvoiceJVs.lstCVarSL_InvoiceJVs.Count; j++) //Maybe i dont need that loop: One is enough but its done like that in the desktop
                    {
                        Int64 JVID1 = objCSL_InvoiceJVs.lstCVarSL_InvoiceJVs[j].JVID1;
                        Int64 JVID2 = objCSL_InvoiceJVs.lstCVarSL_InvoiceJVs[j].JVID2;

                        checkException = objCA_JV.GetList("WHERE ID IN (" + JVID1 + ")");
                        if (objCA_JV.lstCVarA_JV.Count > 0)
                            checkException = objCA_Fiscal_Year_Period.GetList("WHERE '" + objCA_JV.lstCVarA_JV[0].JVDate + "' BETWEEN From_Date AND To_Date and Closed=1");

                        if (JVID2 != 0)
                        {
                            checkException = objCA_JV2.GetList("WHERE ID IN (" + JVID2 + ")");
                            checkException = objCA_Fiscal_Year_Period2.GetList("WHERE '" + objCA_JV2.lstCVarA_JV[0].JVDate + "' BETWEEN From_Date AND To_Date and Closed=1");
                        }

                        if (objCA_Fiscal_Year_Period.lstCVarA_Fiscal_Year_Period.Count > 0
                                || objCA_Fiscal_Year_Period2.lstCVarA_Fiscal_Year_Period.Count > 0)
                        {
                            strMessage = "This fiscal year is closed.";
                        }

                    }
            }

            if(strMessage == "")
            {

                string JVID1ListToBeDeleted = "0";
                string JVID2ListToBeDeleted = "0"; //to handle the case of unposting grouped Invoices
                var ArrSelectedIDs = pSelectedIDs.Split(',');
                for (int i = 0; i < ArrSelectedIDs.Length; i++)
                {
                    checkException = objCSL_InvoiceJVs.GetList("WHERE JVID1=" + ArrSelectedIDs[i]);
                    if (objCSL_InvoiceJVs.lstCVarSL_InvoiceJVs.Count > 0)
                        for (int j = 0; j < objCSL_InvoiceJVs.lstCVarSL_InvoiceJVs.Count; j++) //Maybe i dont need that loop: One is enough but its done like that in the desktop
                        {
                            Int64 JVID1 = objCSL_InvoiceJVs.lstCVarSL_InvoiceJVs[j].JVID1;
                            Int64 JVID2 = objCSL_InvoiceJVs.lstCVarSL_InvoiceJVs[j].JVID2;
                            Int64 VoucherID = objCSL_InvoiceJVs.lstCVarSL_InvoiceJVs[j].VoucherID;
                            Int32 VoucherType = objCSL_InvoiceJVs.lstCVarSL_InvoiceJVs[j].VoucherType;
                            Int64 Shipping_InvoiceID = objCSL_InvoiceJVs.lstCVarSL_InvoiceJVs[j].Forwarding_InvoiceID;

                            JVID1ListToBeDeleted += "," + JVID1;
                            JVID2ListToBeDeleted += "," + JVID2;

                            objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "SL_InvoiceJVsByJVID1", JVID1, "D");
                            objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "SL_InvoiceJVsByJVID2", JVID2, "D");
                            objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "SL_InvoiceJVsByInvoiceID", Shipping_InvoiceID, "D");


                            #region UnPost & Delete from A_Voucher if VoucherID is not null
                            if (VoucherID != 0 && VoucherType == constVoucherCashIn && checkException == null) //Cash
                            {
                                objCCustomizedDBCall.A_CashVouchers_UnPosted_ByID("A_CashVouchers_UnPosted_ByID", "," + VoucherID + ",", WebSecurity.CurrentUserId);
                                checkException = objCA_VoucherDetails.DeleteList("WHERE VoucherID=" + VoucherID);
                                objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "A_CashInVoucherDetails", VoucherID, "D");
                                checkException = objCA_Voucher.DeleteList("WHERE ID=" + VoucherID);
                                objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "A_CashInVoucher", VoucherID, "D");
                            }
                            else if (VoucherID != 0 && VoucherType == constVoucherChequeIn && checkException == null) //Cheque
                            {
                                objCCustomizedDBCall.A_ChequeVouchers_UnPosted_ByID("A_ChequeVouchers_UnPosted_ByID", "," + VoucherID + ",", WebSecurity.CurrentUserId);
                                checkException = objCA_VoucherDetails.DeleteList("WHERE VoucherID=" + VoucherID);
                                objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "A_ChequeInVoucherDetails", VoucherID, "D");
                                checkException = objCA_Voucher.DeleteList("WHERE ID=" + VoucherID);
                                objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "A_ChequeInVoucher", VoucherID, "D");
                            }
                            #endregion UnPost & Delete from A_Voucher if VoucherID is not null

                            checkException = objCSL_InvoiceJVs2.GetList("WHERE JVID2=" + JVID2);
                            for (int k = 0; k < objCSL_InvoiceJVs2.lstCVarSL_InvoiceJVs.Count; k++)
                            {
                                JVID1ListToBeDeleted += "," + objCSL_InvoiceJVs2.lstCVarSL_InvoiceJVs[k].JVID1;
                                objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "SL_InvoiceJVsByJVID1", objCSL_InvoiceJVs2.lstCVarSL_InvoiceJVs[k].JVID1, "D");
                                objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "SL_InvoiceJVsByInvoiceID", objCSL_InvoiceJVs2.lstCVarSL_InvoiceJVs[k].Forwarding_InvoiceID, "D");

                                 VoucherID = objCSL_InvoiceJVs2.lstCVarSL_InvoiceJVs[k].VoucherID;
                                 VoucherType = objCSL_InvoiceJVs2.lstCVarSL_InvoiceJVs[k].VoucherType;

                                if (VoucherID != 0 && VoucherType == constVoucherCashIn && checkException == null) //Cash
                                {
                                    objCCustomizedDBCall.A_CashVouchers_UnPosted_ByID("A_CashVouchers_UnPosted_ByID", "," + VoucherID + ",", WebSecurity.CurrentUserId);
                                    checkException = objCA_VoucherDetails.DeleteList("WHERE VoucherID=" + VoucherID);
                                    objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "A_CashInVoucherDetails", VoucherID, "D");
                                    checkException = objCA_Voucher.DeleteList("WHERE ID=" + VoucherID);
                                    objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "A_CashInVoucher", VoucherID, "D");
                                }
                                else if (VoucherID != 0 && VoucherType == constVoucherChequeIn && checkException == null) //Cheque
                                {
                                    objCCustomizedDBCall.A_ChequeVouchers_UnPosted_ByID("A_ChequeVouchers_UnPosted_ByID", "," + VoucherID + ",", WebSecurity.CurrentUserId);
                                    checkException = objCA_VoucherDetails.DeleteList("WHERE VoucherID=" + VoucherID);
                                    objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "A_ChequeInVoucherDetails", VoucherID, "D");
                                    checkException = objCA_Voucher.DeleteList("WHERE ID=" + VoucherID);
                                    objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "A_ChequeInVoucher", VoucherID, "D");
                                }
                            }

                        }
                }

                if (checkException == null)
                {
                    checkException = objCA_JV.DeleteList("WHERE ID IN (" + JVID1ListToBeDeleted + ")");


                    checkException = objCSL_InvoiceJVs.DeleteList("WHERE JVID1 IN (" + JVID1ListToBeDeleted + ")");
                    checkException = objCSL_InvoiceJVs.DeleteList("WHERE JVID2 IN (" + JVID2ListToBeDeleted + ")");

                    //to handle the case of unposting grouped Invoices (foreign key conflict)
                    checkException = objCA_JV.DeleteList("WHERE ID IN (" + JVID1ListToBeDeleted + ")");
                    checkException = objCA_JV.DeleteList("WHERE ID IN (" + JVID2ListToBeDeleted + ")");

                    //objCCustomizedDBCall.CallStringFunction(" update [ShipLinkKadmar].dbo.PaymentHeader set IsPosted = 1 where InvoiceHeaderIDWHERE IsPaid=0 and ID = " + Shipping_InvoiceID);
                }
            }

            //CvwInvoiceHeader objCInvoiceHeader = new CvwInvoiceHeader();
            //objCInvoiceHeader.GetList("where ID = " + Shipping_InvoiceID.ToString());
            ////CInvoiceHeader objCInvoiceHeader2 = new CInvoiceHeader();
            ////objCInvoiceHeader2.UpdateList(" IsAudited = 0  WHERE IsPaid=0 and ID=" + Shipping_InvoiceID);
            //objCCustomizedDBCall.CallStringFunction("[ShipLinkKadmar].dbo.InvoiceHeader SET IsAudited = 0  WHERE IsPaid=0 and ID = " + Shipping_InvoiceID);

          

            return new object[] {
                strMessage
            };
        }

    }
}

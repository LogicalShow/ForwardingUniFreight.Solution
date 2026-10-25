using Forwarding.MvcApp.Entities.Operations;
using Forwarding.MvcApp.Models.Accounting.MasterData.Generated;
using Forwarding.MvcApp.Models.Accounting.Transactions.Generated;
using Forwarding.MvcApp.Models.Administration.Settings.Generated;
using Forwarding.MvcApp.Models.Customized;
using Forwarding.MvcApp.Models.ReceiptsAndPayments.YardLinkTank.Customized;
using Forwarding.MvcApp.Models.ReceiptsAndPayments.YardLinkTank.Generated;

using Forwarding.MvcApp.Models.MasterData.BanksAccountsAndTreasuries.Generated;
using Forwarding.MvcApp.Models.MasterData.Others.Generated;
using Forwarding.MvcApp.Models.MasterData.Invoicing.Generated;

using Forwarding.MvcApp.Models.ReceiptsAndPayments.Transactions.Generated;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;
using Forwarding.MvcApp.Models.Operations.Operations.Generated;
using Forwarding.MvcApp.Models.CustomizedSPCall;
using Forwarding.MvcApp.Models.ReceiptsAndPayments.ShipLink.Generated;
using Forwarding.MvcApp.Models.SC.Transactions.Generated;
using Forwarding.MvcApp.Models.MasterData.Partners.Generated;

namespace Forwarding.MvcApp.Controllers.ReceiptsAndPayments.YardLinkTank
{
    public class SC_TankatApproveController : ApiController
    {
        [HttpGet, HttpPost]
        public object[] LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned(bool pIsLoadArrayOfObjects, string pLanguage, Int32 pPageNumber, Int32 pPageSize, string pWhereClause, string pOrderBy)
        {
            int _RowCount = 0;
            CvwA_Accounts objCvwA_Accounts = new CvwA_Accounts();
            CvwSL_InvoiceType objCInvoiceType = new CvwSL_InvoiceType();
            CTreasury objCSafes = new CTreasury();
            CvwVessels objCvwVessel = new CvwVessels();
            CCustomers cCustomers = new CCustomers();


            if (pIsLoadArrayOfObjects)
            {
                objCvwA_Accounts.GetListPaging(9999, 1, "WHERE IsMain=0", "Name, Code", out _RowCount);
                objCInvoiceType.GetList("WHERE 1=1 ORDER BY Name");
                objCSafes.GetList("WHERE 1=1 ORDER BY Name");
                objCvwVessel.GetList("WHERE 1=1 ORDER BY Name");
                cCustomers.GetList("where 1 = 1 order by Name ");

            }
            CvwSC_TransactionsTank objCvwSL_InvoiceHeader_SelectNotPosted = new CvwSC_TransactionsTank();
            objCvwSL_InvoiceHeader_SelectNotPosted.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);

            return new object[] {
                new JavaScriptSerializer().Serialize(objCvwSL_InvoiceHeader_SelectNotPosted.lstCVarvwSC_TransactionsTank)
                , _RowCount
                , new JavaScriptSerializer().Serialize(objCvwA_Accounts.lstCVarvwA_Accounts)
                , new JavaScriptSerializer().Serialize(objCInvoiceType.lstCVarvwSL_InvoiceType) //pInvoiceType = pData[3]
                , new JavaScriptSerializer().Serialize(objCSafes.lstCVarTreasury) //pSafe = pData[4]
                , new JavaScriptSerializer().Serialize(objCvwVessel.lstCVarvwVessels) //pVessel = pData[5]
                , new JavaScriptSerializer().Serialize(cCustomers.lstCVarCustomers) //pVessel = pData[6]

            };
        }

        [HttpGet, HttpPost]
        public object[] GetRevenueItemsModalData(string pSelectedIDsToGetRevenueItems)
        {
            Exception checkException = new Exception();
            string ShipLinkItemsIDs = "0,-1"; //will hold the IDs to be retrieved for the RevenueItems
            int pVoyageAccountID = 0;
            int _RowCount = 0;
            CvwLinkedSubAccounts objCvwLinkedSubAccounts = new CvwLinkedSubAccounts();
            CvwSL_InvoiceDetailsANDInvDetailsDemStrExtra_ShippingItemsIDs objCvwSL_InvoiceDetailsANDInvDetailsDemStrExtra_ShippingItemsIDs = new CvwSL_InvoiceDetailsANDInvDetailsDemStrExtra_ShippingItemsIDs();
            checkException = objCvwSL_InvoiceDetailsANDInvDetailsDemStrExtra_ShippingItemsIDs.GetList("WHERE InvoiceHeaderID IN (" + pSelectedIDsToGetRevenueItems + ")");
            CvwSL_ShippingItemsLinking objCvwSL_ShippingItemsLinking = new CvwSL_ShippingItemsLinking();
            for (int i = 0; i < objCvwSL_InvoiceDetailsANDInvDetailsDemStrExtra_ShippingItemsIDs.lstCVarvwSL_InvoiceDetailsANDInvDetailsDemStrExtra_ShippingItemsIDs.Count; i++)
                ShipLinkItemsIDs += "," + objCvwSL_InvoiceDetailsANDInvDetailsDemStrExtra_ShippingItemsIDs.lstCVarvwSL_InvoiceDetailsANDInvDetailsDemStrExtra_ShippingItemsIDs[i].ItemID.ToString();
            if (ShipLinkItemsIDs != "")
                checkException = objCvwSL_ShippingItemsLinking.GetList("WHERE ShiplinkItemID IN (" + ShipLinkItemsIDs + ")");
            if (objCvwSL_ShippingItemsLinking.lstCVarvwSL_ShippingItemsLinking.Count > 0)
            {
                pVoyageAccountID = objCvwSL_ShippingItemsLinking.lstCVarvwSL_ShippingItemsLinking[0].VoyageAccountID;
                checkException = objCvwLinkedSubAccounts.GetListPaging(9999, 1, "WHERE IsMain=0 AND Account_ID=" + pVoyageAccountID, "Name, Code", out _RowCount);
            }
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                serializer.Serialize(objCvwSL_ShippingItemsLinking.lstCVarvwSL_ShippingItemsLinking)
                , pVoyageAccountID
                , serializer.Serialize(objCvwLinkedSubAccounts.lstCVarvwLinkedSubAccounts)
            };
        }

        [HttpGet, HttpPost]
        public object[] Post(string pPostedSelectedIDs, bool pPost, DateTime pDate)
        {
            Exception checkException = null;
            string strMessage = "";

            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();

            bool _result = false;
            //  checkException = objCA_Fiscal_Year_Period.GetList("WHERE '" + DateTime.ParseExact(pJVDate + " 00:00:00.000", "dd/MM/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture).ToString() + "' BETWEEN From_Date AND To_Date and Closed=1");
            if (pPost == false)
            {
               

               

                if (strMessage=="")
                {
                    int NumberOfInvoicesDeleted = pPostedSelectedIDs.Split(',').Length;
                    for (int i = 0; i < NumberOfInvoicesDeleted; i++)
                    {
                        objCCustomizedDBCall.ExecuteQuery_DataTable("A_ConfirmSC_TransactionsTank " + int.Parse(pPostedSelectedIDs.Split(',')[i]) + "," + 0 + ",'" + pDate + "'");
                    }
                }
                

            }
            else
            {
                foreach (var currentID in pPostedSelectedIDs.Split(','))
                {
                    CSC_Transactions objCSC_Transactions = new CSC_Transactions();
                    objCSC_Transactions.GetList("where id=" + currentID);
                    if (objCSC_Transactions.lstCVarSC_Transactions.Count > 0)
                    {
                        CSC_TransactionsDetails objCSC_TransactionsDetails = new CSC_TransactionsDetails();
                        objCSC_TransactionsDetails.GetList("where TransactionID=" + currentID);
                        if (objCSC_TransactionsDetails.lstCVarSC_TransactionsDetails.Count > 0 && objCSC_Transactions.lstCVarSC_Transactions[0].TransactionTypeID == 20)
                        {
                            for (int k = 0; k < objCSC_TransactionsDetails.lstCVarSC_TransactionsDetails.Count; k++)
                            {
                                CvwSC_ItemsAndCurrentBalanceInAllStores objCvwSC_ItemsAndCurrentBalanceInAllStores = new CvwSC_ItemsAndCurrentBalanceInAllStores();
                                objCvwSC_ItemsAndCurrentBalanceInAllStores.GetList("WHERE ItemID=" + objCSC_TransactionsDetails.lstCVarSC_TransactionsDetails[k].ItemID);
                                if (objCvwSC_ItemsAndCurrentBalanceInAllStores.lstCVarvwSC_ItemsAndCurrentBalanceInAllStores.Count > 0 && strMessage=="")
                                {
                                    if (objCvwSC_ItemsAndCurrentBalanceInAllStores.lstCVarvwSC_ItemsAndCurrentBalanceInAllStores[0].ItemQtyInAllStores > 0)
                                    {
                                        decimal totalAfterNew = 0;
                                        totalAfterNew = Convert.ToDecimal(objCvwSC_ItemsAndCurrentBalanceInAllStores.lstCVarvwSC_ItemsAndCurrentBalanceInAllStores[0].ItemQtyInAllStores) - Convert.ToDecimal(objCSC_TransactionsDetails.lstCVarSC_TransactionsDetails[k].Qty);
                                        if (totalAfterNew < 0)
                                        {
                                            strMessage = "Qty less than stock for issue voucher no. " + objCSC_Transactions.lstCVarSC_Transactions[0].Code;
                                        }
                                    }
                                    else
                                    {
                                        strMessage = "Qty less than stock for issue voucher no. " + objCSC_Transactions.lstCVarSC_Transactions[0].Code;
                                    }

                                }

                            }
                        }


                    }




                }
                if (strMessage =="")
                {
                    int NumberOfInvoicesDeleted = pPostedSelectedIDs.Split(',').Length;
                    for (int i = 0; i < NumberOfInvoicesDeleted; i++)
                    {
                        objCCustomizedDBCall.ExecuteQuery_DataTable("A_ConfirmSC_TransactionsTank " + int.Parse(pPostedSelectedIDs.Split(',')[i]) + "," + 1 + ",'" + pDate + "'");
                    }
                }
                
            }
            return new object[] {
                strMessage
            };
        }

    }
}




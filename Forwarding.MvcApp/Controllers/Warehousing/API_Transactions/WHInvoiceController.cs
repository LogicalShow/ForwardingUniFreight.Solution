using Forwarding.MvcApp.Entities.Warehousing;
using Forwarding.MvcApp.Models.MasterData.Invoicing.Generated;
using Forwarding.MvcApp.Models.NoAccess.Generated;
using Forwarding.MvcApp.Models.Warehousing.MasterData.Generated;
using Forwarding.MvcApp.Models.Warehousing.Transactions.Customized;
using Forwarding.MvcApp.Models.Warehousing.Transactions.Generated;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;

namespace Forwarding.MvcApp.Controllers.Warehousing.API_Transactions
{
    public class WHInvoiceController : ApiController
    {
        #region WHInvoice

        [HttpGet, HttpPost]
        public object[] LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned(bool pIsLoadArrayOfObjects, string pLanguage, Int32 pPageNumber, Int32 pPageSize, string pWhereClause, string pOrderBy)
        {
            int _RowCount = 0;
            Exception checkException = null;
            //CvwNoAccessUnit objCvwNoAccessUnit = new CvwNoAccessUnit();
            //CNoAccessWH_InvoiceDetailsType objCNoAccessWH_InvoiceDetailsType = new CNoAccessWH_InvoiceDetailsType();
            //CNoAccessWH_InvoiceDetailsQuantityUnit objCNoAccessWH_InvoiceDetailsQuantityUnit = new CNoAccessWH_InvoiceDetailsQuantityUnit();
            CWH_Warehouse objCWH_Warehouse = new CWH_Warehouse();
            CvwWH_Invoice objCvwWH_Invoice = new CvwWH_Invoice();
            CvwWH_Receive objCvwWH_Receive = new CvwWH_Receive();
            //CvwWH_Pickup objCvwWH_Pickup = new CvwWH_Pickup();
            CChargeTypes objCChargeTypes = new CChargeTypes();
            if (pIsLoadArrayOfObjects)
            {
                checkException = objCWH_Warehouse.GetList("ORDER BY Name");
                checkException = objCvwWH_Receive.GetListPaging(999999, 1, "WHERE IsFinalized=1", "ID", out _RowCount);
                checkException = objCChargeTypes.GetListPaging(99999, 1, "WHERE 1=1", "Name", out _RowCount);
                //checkException = objCvwWH_Pickup.GetListPaging(999999, 1, "WHERE IsFinalized=1", "ID", out _RowCount);
                //checkException = objCNoAccessWH_InvoiceDetailsType.GetList("ORDER BY ID");
                //checkException = objCNoAccessWH_InvoiceDetailsQuantityUnit.GetList("ORDER BY ID");
                //checkException = objCvwNoAccessUnit.GetList("WHERE ID IN (" + constAreaUnitTypeIDForM2 + "," + constVolumeUnitTypeIDForM3 + ")");
            }
            var pCustomerList = objCvwWH_Receive.lstCVarvwWH_Receive
                .Select(s => new
                {
                    ID = s.CustomerID
                    ,
                    Name = s.CustomerName
                })
                .Distinct().OrderBy(o => o.Name).ToList();
            checkException = objCvwWH_Invoice.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                new JavaScriptSerializer().Serialize(objCvwWH_Invoice.lstCVarvwWH_Invoice) //pData[0]
                , _RowCount //pData[1]
                , new JavaScriptSerializer().Serialize(objCWH_Warehouse.lstCVarWH_Warehouse) //pWarehouse=pData[2]
                , serializer.Serialize(pCustomerList) //pCustomer=pData[3]
                , new JavaScriptSerializer().Serialize(objCChargeTypes.lstCVarChargeTypes) //pChargeType=pData[4]
                //, new JavaScriptSerializer().Serialize(objCvwNoAccessUnit.lstCVarvwNoAccessUnit) //pStorageUnit=pData[4]
                //, new JavaScriptSerializer().Serialize(objCNoAccessWH_InvoiceDetailsQuantityUnit.lstCVarNoAccessWH_InvoiceDetailsQuantityUnit) //pWH_InvoiceDetailsQuantityUnit=pData[5]
                //, new JavaScriptSerializer().Serialize(objCNoAccessWH_InvoiceDetailsType.lstCVarNoAccessWH_InvoiceDetailsType) //pWH_InvoiceDetailsType=pData[6]
            };
        }

        [HttpGet, HttpPost]
        public object[] LoadHeaderWithDetails(Int32 pHeaderID)
        {
            CvwWH_Invoice objCvwWH_Invoice = new CvwWH_Invoice();
            CvwWH_InvoiceDetails objCvwWH_InvoiceDetails = new CvwWH_InvoiceDetails();
            Exception checkException = null;
            int _RowCount = 0;
            checkException = objCvwWH_Invoice.GetListPaging(99999, 1, "WHERE ID=" + pHeaderID.ToString(), "ID", out _RowCount);
            checkException = objCvwWH_InvoiceDetails.GetListPaging(99999, 1, "WHERE InvoiceID=" + pHeaderID.ToString(), "ChargeTypeName", out _RowCount);
            return new object[] {
                new JavaScriptSerializer().Serialize(objCvwWH_Invoice.lstCVarvwWH_Invoice[0]) //pData[0]
                , new JavaScriptSerializer().Serialize(objCvwWH_InvoiceDetails.lstCVarvwWH_InvoiceDetails) //pData[1]
            };
        }

        [HttpGet, HttpPost]
        public object[] Save(WhInvoice pInvoice)
        {
            string _MessageReturned = "";
            Exception checkException = null;
            CWH_Invoice objCWH_Invoice = new CWH_Invoice();
            CvwWH_Invoice objCvwWH_Invoice = new CvwWH_Invoice();
            CWH_InvoiceDetails objCWH_InvoiceDetails = new CWH_InvoiceDetails();
            CvwWH_InvoiceDetails objCvwWH_InvoiceDetails = new CvwWH_InvoiceDetails();
            CVarWH_Invoice objCVarWH_Invoice = new CVarWH_Invoice();
            CWH_Contract objCWH_Contract = new CWH_Contract();
            CvwWH_ContractDetails objCvwWH_ContractDetails = new CvwWH_ContractDetails();

            int _RowCount = 0;
            string _UpdateClause = "";
            #region Insert
            if (pInvoice.ID == 0) //Insert
            {
                #region GET Contract Items
                checkException = objCWH_Contract.GetList("WHERE Approved=1 AND ('" + DateTime.ParseExact(pInvoice.InvoiceDate + " 00.00.00.000", "d/M/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture).ToString("yyyyMMdd 00:00:00.000") + "' BETWEEN FromDate AND ToDate) ORDER BY ID DESC");
                if (objCWH_Contract.lstCVarWH_Contract.Count == 0)
                {
                    _MessageReturned = "Sorry, No contracts entered for that invoice date.";
                }
                #endregion GET Contract Items
                else if (_MessageReturned == "") //New invoice and Contract Details exist so insert header then add details
                {
                    objCVarWH_Invoice.Code = "0";
                    objCVarWH_Invoice.WarehouseID = pInvoice.WarehouseID;
                    objCVarWH_Invoice.CustomerID = pInvoice.CustomerID;
                    //objCVarWH_Invoice.ContractID = pContractID;
                    objCVarWH_Invoice.InvoiceDate = DateTime.ParseExact(pInvoice.InvoiceDate + " 00.00.00.000", "d/M/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture);
                    objCVarWH_Invoice.CurrencyID = pInvoice.CurrencyID;
                    objCVarWH_Invoice.ExchangeRate = pInvoice.ExchangeRate;
                    objCVarWH_Invoice.Notes = pInvoice.Notes;
                    objCVarWH_Invoice.Amount = pInvoice.Amount;

                    objCVarWH_Invoice.CreatorUserID = objCVarWH_Invoice.ModificatorUserID = WebSecurity.CurrentUserId;
                    objCVarWH_Invoice.CreationDate = objCVarWH_Invoice.ModificationDate = DateTime.Now;
					Common.Common.ReplaceNull(objCVarWH_Invoice);
                    objCWH_Invoice.lstCVarWH_Invoice.Add(objCVarWH_Invoice);
                    checkException = objCWH_Invoice.SaveMethod(objCWH_Invoice.lstCVarWH_Invoice);
                    if (checkException == null)
                    {
						pInvoice.ID = objCVarWH_Invoice.ID;
                        #region Create Invoice Contract Items
                        checkException = objCvwWH_ContractDetails.GetListPaging(999999, 1, "WHERE ContractID=" + objCWH_Contract.lstCVarWH_Contract[0].ID, "ChargeTypeName", out _RowCount);
                        for (int i = 0; i < objCvwWH_ContractDetails.lstCVarvwWH_ContractDetails.Count; i++)
                        {
                            CVarWH_InvoiceDetails objCVarWH_InvoiceDetails = new CVarWH_InvoiceDetails();
                            objCVarWH_InvoiceDetails.ID = 0;

                        }
                        #endregion Create Invoice Contract Items
                    }
                    else
                        _MessageReturned = checkException.Message;
                } //if (_MessageReturned == "") //New invoice and Contract Details exist so add them and and insert header
            } //if (pID == 0) //Insert
            #endregion Insert
            #region Update
            else //update
            {
                _UpdateClause = pInvoice.WarehouseID == 0 ? "WarehouseID=null" : ("WarehouseID=" + pInvoice.WarehouseID) + " \n";
                _UpdateClause += pInvoice.CustomerID == 0 ? ",CustomerID=null" : (",CustomerID=" + pInvoice.CustomerID) + " \n";
                _UpdateClause += pInvoice.InvoiceDate == "0" ? " ,InvoiceDate = NULL " : (" ,InvoiceDate = '" + (DateTime.ParseExact(pInvoice.InvoiceDate + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture)).ToString("yyyyMMdd") + "'");
                //_UpdateClause += pContractID == 0 ? ",ContractID=null" : (",ContractID=" + pContractID) + " \n";
                _UpdateClause += pInvoice.CurrencyID == 0 ? ",CurrencyID=null" : (",CurrencyID=" + pInvoice.CurrencyID) + " \n";
                _UpdateClause += pInvoice.ExchangeRate == 0 ? ",ExchangeRate=null" : (",ExchangeRate=" + pInvoice.ExchangeRate) + " \n";
                _UpdateClause += pInvoice.Amount == 0 ? ",Amount=null" : (",Amount=" + pInvoice.Amount) + " \n";
                _UpdateClause += pInvoice.Notes == "0" ? ",Notes=null" : (",Notes=N'" + pInvoice.Notes + "'") + " \n";
                //_UpdateClause += " , IsFinalized = " + (pIsFinalized ? "1" : "0") + " \n";
                _UpdateClause += " , ModificatorUserID = " + WebSecurity.CurrentUserId.ToString();
                _UpdateClause += " , ModificationDate = GETDATE() ";
                _UpdateClause += " WHERE ID = " + pInvoice.ID.ToString();

                checkException = objCWH_Invoice.UpdateList(_UpdateClause);
                if (checkException != null)
                    _MessageReturned = checkException.Message;
            }
			#endregion Update
			#region InsertDetails
			if(pInvoice.ID>0 && _MessageReturned=="")
			{
				checkException = objCWH_InvoiceDetails.DeleteList($"where InvoiceID={pInvoice.ID}");
				if(checkException==null)
				{
					foreach (var detail in pInvoice.Details)
					{
						objCWH_InvoiceDetails.lstCVarWH_InvoiceDetails.Add(new CVarWH_InvoiceDetails {
							InvoiceID = pInvoice.ID,
							ChargeTypeID = detail.ChargeTypeID,
							ContractDetailsID = detail.ContractDetailsID,
							Days=detail.Days,
							Qty=detail.Qty,
							Rate = detail.Rate,
							Amount = detail.Amount,
							SpacePerPallet = detail.SpacePerPallet,
							Notes = detail.Notes,
							ReceiveID = detail.ReceiveID,
							PickupID = detail.PickupID,
							TransServiceID = detail.TransServiceID
						});
						Common.Common.ReplaceNull(objCWH_InvoiceDetails.lstCVarWH_InvoiceDetails[objCWH_InvoiceDetails.lstCVarWH_InvoiceDetails.Count-1]);
					}
					checkException = objCWH_InvoiceDetails.SaveMethod(objCWH_InvoiceDetails.lstCVarWH_InvoiceDetails);
				}
			}
			#endregion
			if (_MessageReturned == "")
            {
                objCvwWH_InvoiceDetails.GetListPaging(999999, 1, "WHERE InvoiceID=" + pInvoice.ID, "ChargeTypeName", out _RowCount);
                objCvwWH_Invoice.GetListPaging(1, 1, "WHERE ID=" + pInvoice.ID, "ID", out _RowCount);
            }
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                _MessageReturned
                , _MessageReturned == ""?serializer.Serialize(objCvwWH_Invoice.lstCVarvwWH_Invoice[0]):null //pData[1]
                , _MessageReturned == ""?serializer.Serialize(objCvwWH_InvoiceDetails.lstCVarvwWH_InvoiceDetails):null //pData[2]
            };
        }

        [HttpGet, HttpPost]
        public bool Delete(String pWH_InvoiceIDs)
        {
            bool _result = false;
            //CWH_Invoice objCWH_Invoice = new CWH_Invoice();
            //foreach (var currentID in pWH_InvoiceIDs.Split(','))
            //{
            //    objCWH_Invoice.lstDeletedCPKWH_Invoice.Add(new CPKWH_Invoice() { ID = Int32.Parse(currentID.Trim()) });
            //}

            //Exception checkException = objCWH_Invoice.DeleteItem(objCWH_Invoice.lstDeletedCPKWH_Invoice);
            //if (checkException != null) // an exception is caught in the model
            //{
            //    if (checkException.Message.Contains("DELETE")) // some or all of the WH_Invoices were not deleted due to dependencies
            //        _result = false;
            //}
            //else //deleted successfully
            //    _result = true;
            return _result;
        }

        #endregion WHInvoice

        #region WHInvoiceDetails
        [HttpGet, HttpPost]
        public object[] InvoiceDetails_Save(Int64 pInvoiceID, Int32 pWarehouseID, Int32 pCustomerID
            , Int32 pContractID, string pInvoiceDate, Int32 pCurrencyID, decimal pExchangeRate, string pNotes
            , bool pIsPosted, string pPostDate
            //Details
            , Int64 pInvoiceDetailsID, Int64 pInvoiceDetailsReceiveID, Int64 pInvoiceDetailsPickupID
            , Int32 pInvoiceDetailsChargeTypeID, Int64 pInvoiceDetailsContractDetailsID
            , decimal pInvoiceDetailsSpacePerPallet, int pInvoiceDetailsDays, decimal pInvoiceDetailsRate
            , string pInvoiceDetailsNotes, decimal pInvoiceDetailsQty)
        {
            string _MessageReturned = "";
            Exception checkException = null;
            string _UpdateClause = "";
            CWH_Invoice objCWH_Invoice = new CWH_Invoice();
            CVarWH_Invoice objCVarWH_Invoice = new CVarWH_Invoice();
            CWH_InvoiceDetails objCWH_InvoiceDetails = new CWH_InvoiceDetails();
            CVarWH_InvoiceDetails objCVarWH_InvoiceDetails = new CVarWH_InvoiceDetails();
            CvwWH_InvoiceDetails objCvwWH_InvoiceDetails = new CvwWH_InvoiceDetails();
            #region Save InvoiceHeader
            if (pInvoiceID == 0) //Insert
            {
                objCVarWH_Invoice.ID = pInvoiceID;
                objCVarWH_Invoice.Code = "0";
                objCVarWH_Invoice.WarehouseID = pWarehouseID;
                objCVarWH_Invoice.CustomerID = pCustomerID;
                objCVarWH_Invoice.ContractID = pContractID;
                objCVarWH_Invoice.InvoiceDate = DateTime.ParseExact(pInvoiceDate + " 00:00:00.000", "d/M/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture);
                objCVarWH_Invoice.CurrencyID = pCurrencyID;
                objCVarWH_Invoice.ExchangeRate = pExchangeRate;
                objCVarWH_Invoice.Notes = pNotes;
                objCVarWH_Invoice.IsPosted = pIsPosted;
                objCVarWH_Invoice.PostDate = DateTime.ParseExact(pPostDate + " 00:00:00.000", "d/M/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture);
                objCVarWH_Invoice.IsDeleted = false;
                objCVarWH_Invoice.CreatorUserID = objCVarWH_Invoice.ModificatorUserID = WebSecurity.CurrentUserId;
                objCVarWH_Invoice.CreationDate = objCVarWH_Invoice.ModificationDate = DateTime.Now;
                objCWH_Invoice.lstCVarWH_Invoice.Add(objCVarWH_Invoice);
                checkException = objCWH_Invoice.SaveMethod(objCWH_Invoice.lstCVarWH_Invoice);
                pInvoiceID = objCVarWH_Invoice.ID;
            }
            else //Update Header
            {
                _UpdateClause = "CustomerID=" + pCustomerID + "\n";
                _UpdateClause += ",ContractID=" + (pContractID==0 ? "NULL": pContractID.ToString()) + "\n";
                _UpdateClause += (pInvoiceDate == "01/01/1900" ? " ,InvoiceDate = NULL " : (" ,InvoiceDate = N'" + Forwarding.MvcApp.Helpers.DateFunctionsController.GetYYYYMMDDFormat(pInvoiceDate, 1) + "'"));
                _UpdateClause += ",CurrencyID=" + (pCurrencyID == 0 ? "NULL" : pCurrencyID.ToString()) + "\n";
                _UpdateClause += ",ExchangeRate=" + pExchangeRate + "\n";
                _UpdateClause += ",Notes=" + (pNotes == "0" ? "NULL" : ("N'" +pNotes + "'")) + "\n";
                _UpdateClause += ",ModificatorUserID = N'" + WebSecurity.CurrentUserId.ToString() + "'" + "\n";
                _UpdateClause += ",ModificationDate = GETDATE() " + "\n";
                _UpdateClause += " WHERE ID =" + pInvoiceID.ToString();
                checkException = objCWH_Invoice.UpdateList(_UpdateClause);
            }
            #endregion Save InvoiceHeader
            #region Save Details
            if (checkException != null)
                _MessageReturned = checkException.Message;
            else //Save Details
            {
                objCVarWH_InvoiceDetails.ID = pInvoiceDetailsID;
                objCVarWH_InvoiceDetails.InvoiceID = pInvoiceID;
                objCVarWH_InvoiceDetails.ReceiveID = pInvoiceDetailsReceiveID;
                objCVarWH_InvoiceDetails.PickupID = pInvoiceDetailsPickupID;
                objCVarWH_InvoiceDetails.ChargeTypeID = pInvoiceDetailsChargeTypeID;
                objCVarWH_InvoiceDetails.ContractDetailsID = pInvoiceDetailsContractDetailsID;
                objCVarWH_InvoiceDetails.SpacePerPallet = pInvoiceDetailsSpacePerPallet;
                objCVarWH_InvoiceDetails.Days = pInvoiceDetailsDays;
                objCVarWH_InvoiceDetails.Rate = pInvoiceDetailsRate;
                objCVarWH_InvoiceDetails.Amount = pInvoiceDetailsSpacePerPallet * pInvoiceDetailsDays * pInvoiceDetailsRate;
                objCVarWH_InvoiceDetails.Notes = pInvoiceDetailsNotes;
                objCVarWH_InvoiceDetails.Qty = pInvoiceDetailsQty;
                objCWH_InvoiceDetails.lstCVarWH_InvoiceDetails.Add(objCVarWH_InvoiceDetails);
                checkException = objCWH_InvoiceDetails.SaveMethod(objCWH_InvoiceDetails.lstCVarWH_InvoiceDetails);
                pInvoiceDetailsID = objCVarWH_InvoiceDetails.ID;
            }
            #endregion Save Details
            #region Update Header Amount
            if (checkException == null && _MessageReturned == "")
            {
                checkException = objCWH_Invoice.UpdateList(
                    "Amount=(SELECT SUM(ISNULL(Amount,0)) FROM WH_InvoiceDetails WHERE InvoiceID=" + pInvoiceID + ")"
                    +" WHERE ID=" + pInvoiceID);
                objCvwWH_InvoiceDetails.GetList("WHERE InvoiceID=" + pInvoiceID + " ORDER BY ChargeTypeName");
                objCWH_Invoice.GetList("WHERE ID=" + pInvoiceID);
            }
            else
                _MessageReturned = checkException.Message;
            #endregion Save Header Amount
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                _MessageReturned
                , serializer.Serialize(objCvwWH_InvoiceDetails.lstCVarvwWH_InvoiceDetails) //pInvoiceDetails = pData[1]
                , serializer.Serialize(objCWH_Invoice.lstCVarWH_Invoice[0]) //pInvoiceHeader = pData[2]
            };
        }

        [HttpGet, HttpPost]
        public object[] InvoiceDetails_FillModal(bool pIsLoadArrayOfObjects, Int32 pCustomerID, Int64 pInvoiceDetailsID)
        {
            Exception checkException = null;
            int _RowCount = 0;
            CWH_Receive objCWH_Receive = new CWH_Receive();
            CWH_Pickup objCWH_Pickup = new CWH_Pickup();
            CWH_Contract objCWH_Contract = new CWH_Contract();
            CWH_InvoiceDetails objCWH_InvoiceDetails = new CWH_InvoiceDetails();
            if (pIsLoadArrayOfObjects)
            {
                checkException = objCWH_Receive.GetListPaging(999999, 1, "WHERE IsFinalized=1 AND CustomerID=" + pCustomerID, "Code", out _RowCount);
                checkException = objCWH_Pickup.GetListPaging(999999, 1, "WHERE IsFinalized=1 AND CustomerID=" + pCustomerID, "Code", out _RowCount);
                checkException = objCWH_Contract.GetListPaging(999999, 1, "WHERE IsFinalized=1 AND CustomerID=" + pCustomerID, "Code", out _RowCount);
            }
            if (pInvoiceDetailsID != 0)
                checkException = objCWH_InvoiceDetails.GetListPaging(999999, 1, "WHERE ID=" + pInvoiceDetailsID, "ChargeTypeName", out _RowCount);
            return new object[] {
                new JavaScriptSerializer().Serialize(objCWH_InvoiceDetails.lstCVarWH_InvoiceDetails) //pData[0]
                , new JavaScriptSerializer().Serialize(objCWH_Receive.lstCVarWH_Receive) //pData[1]
                , new JavaScriptSerializer().Serialize(objCWH_Pickup.lstCVarWH_Pickup) //pData[2]
                , new JavaScriptSerializer().Serialize(objCWH_Contract.lstCVarWH_Contract) //pData[3]
            };
        }

        [HttpGet, HttpPost]
        public object[] InvoiceDetails_Delete(string pDeletedWHInvoiceDetailsIDs
            //Header Parameters
            , Int64 pInvoiceID, Int32 pWarehouseID, Int32 pCustomerID, Int32 pContractID, string pInvoiceDate
            , Int32 pCurrencyID, decimal pExchangeRate, string pNotes)
        {
            bool _result = false;
            int _RowCount = 0;
            Exception checkException = null;
            string _UpdateClause = "";
            CWH_InvoiceDetails objCCWH_InvoiceDetails = new CWH_InvoiceDetails();
            CvwWH_InvoiceDetails objCvwWH_InvoiceDetails = new CvwWH_InvoiceDetails();
            CWH_Invoice objCWH_Invoice = new CWH_Invoice();

            #region Delete PurchaseInvoiceItem
            checkException = objCCWH_InvoiceDetails.DeleteList("WHERE ID IN (" + pDeletedWHInvoiceDetailsIDs + ")");
            if (checkException == null)
                _result = true;
            #endregion Delete PurchaseInvoiceItem

            #region Update header //To update all fields then check for exchangerate first
            //_UpdateClause = pWarehouseID == 0 ? "WarehouseID=null" : ("WarehouseID=" + pWarehouseID) + " \n";
            //_UpdateClause += pCustomerID == 0 ? ",CustomerID=null" : (",CustomerID=" + pCustomerID) + " \n";
            //_UpdateClause += pInvoiceDate == "0" ? " ,InvoiceDate = NULL " : (" ,InvoiceDate = '" + (DateTime.ParseExact(pInvoiceDate + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture)).ToString("yyyyMMdd") + "'");
            ////_UpdateClause += pContractID == 0 ? ",ContractID=null" : (",ContractID=" + pContractID) + " \n";
            //_UpdateClause += ",Amount=(SELECT SUM(ISNULL(Amount,0)) FROM WH_InvoiceDetails WHERE InvoiceID=" + pInvoiceID + ")" + "\n";
            //_UpdateClause += pCurrencyID == 0 ? ",CurrencyID=null" : (",CurrencyID=" + pCurrencyID) + " \n";
            //_UpdateClause += pExchangeRate == 0 ? ",ExchangeRate=null" : (",ExchangeRate=" + pExchangeRate) + " \n";
            //_UpdateClause += pNotes == "0" ? ",Notes=null" : (",Notes=N'" + pNotes + "'") + " \n";
            ////_UpdateClause += " , IsFinalized = " + (pIsFinalized ? "1" : "0") + " \n";
            //_UpdateClause += " , ModificatorUserID = " + WebSecurity.CurrentUserId.ToString();
            //_UpdateClause += " , ModificationDate = GETDATE() ";
            //_UpdateClause += " WHERE ID = " + pInvoiceID.ToString();
            //checkException = objCWH_Invoice.UpdateList(_UpdateClause);
            checkException = objCWH_Invoice.UpdateList(
                    "Amount=(SELECT SUM(ISNULL(Amount,0)) FROM WH_InvoiceDetails WHERE InvoiceID=" + pInvoiceID + ")"
                    + " , ModificatorUserID = " + WebSecurity.CurrentUserId.ToString()
                    + " , ModificationDate = GETDATE() "
                    + " WHERE ID=" + pInvoiceID);                
            #endregion Update header

            checkException = objCWH_Invoice.GetList("WHERE ID = " + pInvoiceID.ToString());
            checkException = objCvwWH_InvoiceDetails.GetList("WHERE InvoiceID = " + pInvoiceID + " ORDER BY ChargeTypeName");
            return new object[] {
                _result //pData[0]
                , _result ? new JavaScriptSerializer().Serialize(objCWH_Invoice.lstCVarWH_Invoice[0]) : null //pHeader = pData[1]
                , _result ? new JavaScriptSerializer().Serialize(objCvwWH_InvoiceDetails.lstCVarvwWH_InvoiceDetails) : null //pData[2]
            };
        }

        #endregion WHInvoiceDetails

		[HttpGet, HttpPost]
		public object GetTransServices(string pWhereClause)
		{
			CvwWH_TransServiceForInvoicing objCvwWH_TransServiceForInvoicing = new CvwWH_TransServiceForInvoicing();
			objCvwWH_TransServiceForInvoicing.GetList(pWhereClause);
			JavaScriptSerializer serializer = new JavaScriptSerializer { MaxJsonLength = int.MaxValue };
			return serializer.Serialize(objCvwWH_TransServiceForInvoicing.lstCVarvwWH_TransServiceForInvoicing);
		}

	}
}

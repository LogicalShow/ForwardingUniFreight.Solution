using Forwarding.MvcApp.Models.Customized;
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

namespace Forwarding.MvcApp.Controllers.Warehousing.API_Reports
{
    public class ContractController : ApiController
    {
        #region Contract

        [HttpGet, HttpPost]
        public object[] LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned(bool pIsLoadArrayOfObjects, string pLanguage, Int32 pPageNumber, Int32 pPageSize, string pWhereClause, string pOrderBy)
        {
            int _RowCount = 0;
            int constAreaUnitTypeIDForM2 = 90;
            int constVolumeUnitTypeIDForM3 = 100;
            int constDaily = 120;
            Exception checkException = null;
            CvwNoAccessUnit objCvwNoAccessUnit = new CvwNoAccessUnit();
            CNoAccessContractDetailsType objCNoAccessContractDetailsType = new CNoAccessContractDetailsType();
            CNoAccessContractDetailsQuantityUnit objCNoAccessContractDetailsQuantityUnit = new CNoAccessContractDetailsQuantityUnit();
            CWH_Warehouse objCWH_Warehouse = new CWH_Warehouse();
            CvwWH_Contract objCvwWH_Contract = new CvwWH_Contract();
            CChargeTypes objCChargeTypes = new CChargeTypes();
            CWH_Services objCWH_Services = new CWH_Services();
			var paymentTerms = new List<SelectListOption>();
         

			if (pIsLoadArrayOfObjects)
            {
				
				CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();

				 paymentTerms.AddRange(objCCustomizedDBCall.ExecuteQuery_ListOfObjects("SELECT ID, Name FROM WH_PaymentTerms"
					, typeof(SelectListOption)).Cast<SelectListOption>().ToList());

				checkException = objCWH_Warehouse.GetList("ORDER BY Name");
                checkException = objCNoAccessContractDetailsType.GetList("ORDER BY ID");
                checkException = objCNoAccessContractDetailsQuantityUnit.GetList("ORDER BY ID");
                checkException = objCvwNoAccessUnit.GetList("WHERE ID IN (" + constAreaUnitTypeIDForM2 + "," + constVolumeUnitTypeIDForM3 +"," + constDaily + ")");
                checkException = objCChargeTypes.GetListPaging(99999, 1, "WHERE 1=1", "Name", out _RowCount);
                checkException = objCWH_Services.GetListPaging(99999,1,"WHERE 1 = 1","ID", out _RowCount);
            }
            checkException = objCvwWH_Contract.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);
			var serializer = new JavaScriptSerializer { MaxJsonLength = int.MaxValue };

			return new object[] {
				serializer.Serialize(objCvwWH_Contract.lstCVarvwWH_Contract)
                , _RowCount
                , serializer.Serialize(objCvwNoAccessUnit.lstCVarvwNoAccessUnit) //pStorageUnit=pData[2]
                , serializer.Serialize(objCWH_Warehouse.lstCVarWH_Warehouse) //pWarehouse=pData[3]
                , serializer.Serialize(objCChargeTypes.lstCVarChargeTypes) //pChargeType=pData[4]
                , serializer.Serialize(objCNoAccessContractDetailsQuantityUnit.lstCVarNoAccessContractDetailsQuantityUnit) //pContractDetailsQuantityUnit=pData[5]
                , serializer.Serialize(objCNoAccessContractDetailsType.lstCVarNoAccessContractDetailsType) //pContractDetailsType=pData[6]
                , serializer.Serialize(paymentTerms) //pContractDetailsType=pData[7]
                ,serializer.Serialize(objCWH_Services.lstCVarWH_Services) // pData[8]
            };
        }

        [HttpGet, HttpPost]
        public object[] LoadHeaderWithDetails(Int32 pHeaderID)
        {
            CvwWH_Contract objCvwWH_Contract = new CvwWH_Contract();
            CvwWH_ContractDetails objCvwWH_ContractDetails = new CvwWH_ContractDetails();
            CWH_ExtraServices cWH_ExtraServices = new CWH_ExtraServices();
            Exception checkException = null;
            int _RowCount = 0;
            checkException = objCvwWH_Contract.GetListPaging(99999, 1, "WHERE ID=" + pHeaderID.ToString(), "ID", out _RowCount);
            checkException = objCvwWH_ContractDetails.GetListPaging(99999, 1, "WHERE ContractID=" + pHeaderID.ToString(), "ID", out _RowCount);
            checkException = cWH_ExtraServices.GetListPaging(99999, 1, "WHERE ContractID=" + pHeaderID.ToString(), "ID", out _RowCount);
            return new object[] {
                new JavaScriptSerializer().Serialize(objCvwWH_Contract.lstCVarvwWH_Contract[0]) //pData[0]
                , new JavaScriptSerializer().Serialize(objCvwWH_ContractDetails.lstCVarvwWH_ContractDetails) //pData[1]
                ,new JavaScriptSerializer().Serialize(cWH_ExtraServices.lstCVarWH_ExtraServices) // pData[2]
            };
        }

        [HttpGet, HttpPost]
        public object[] Save(Contract pContract)
        {
            string _ReturnedMessage = "";
            Exception checkException = null;
            CWH_Contract objCWH_Contract = new CWH_Contract();
            CvwWH_Contract objCvwWH_Contract = new CvwWH_Contract();
            CWH_ContractDetails objCWH_ContractDetails = new CWH_ContractDetails();
            CvwWH_ContractDetails objCvwWH_ContractDetails = new CvwWH_ContractDetails();
            CVarWH_Contract objCVarWH_Contract = new CVarWH_Contract();
            CWH_ExtraServices objCWH_ExtraServices = new CWH_ExtraServices();  
            string _FromDate = (DateTime.ParseExact(pContract.FromDate + " 00.00.00.000", "d/M/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture)).ToString("yyyyMMdd 11:11:11.000");
            string _ToDate = (DateTime.ParseExact(pContract.FromDate + " 00.00.00.000", "d/M/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture)).ToString("yyyyMMdd 11:11:11.000");
            int _RowCount = 0;
            string _UpdateClause = "";
            string _WhereClause = "";
            #region check period is not overlapped
            _WhereClause = "WHERE ID<>" + pContract.ID + " AND CustomerID=" + pContract.CustomerID + " AND (('" + _FromDate + "' BETWEEN FromDate AND ToDate) OR ( '" + _ToDate + "' BETWEEN FromDate AND ToDate))";
            checkException = objCWH_Contract.GetList(_WhereClause);
            if (objCWH_Contract.lstCVarWH_Contract.Count > 0)
            {
                _ReturnedMessage = "The contract date overlaps with contract " + objCWH_Contract.lstCVarWH_Contract[0].Code;
            }
            #endregion check period is not overlapped
            #region Insert
            else if (pContract.ID == 0) //Insert
            {
                objCVarWH_Contract.Code = "0";
                objCVarWH_Contract.WarehouseID = pContract.WarehouseID;
                objCVarWH_Contract.CustomerID = pContract.CustomerID;
                objCVarWH_Contract.FromDate = DateTime.ParseExact(pContract.FromDate + " 00.00.00.000", "d/M/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture);
                objCVarWH_Contract.ToDate = DateTime.ParseExact(pContract.ToDate + " 00.00.00.000", "d/M/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture).AddHours(23).AddMinutes(59).AddSeconds(59).AddMilliseconds(998);
                objCVarWH_Contract.StorageLimit = pContract.StorageLimit;
                objCVarWH_Contract.StorageUnitID = pContract.StorageUnitID;
                objCVarWH_Contract.IsByPallet = pContract.IsByPallet;
                objCVarWH_Contract.NumberOfPallets = pContract.NumberOfPallets;
                objCVarWH_Contract.CurrencyID = pContract.CurrencyID;
                objCVarWH_Contract.Notes = pContract.Notes;
                objCVarWH_Contract.IsFinalized = pContract.IsFinalized;
                objCVarWH_Contract.Amount = pContract.Amount;
                objCVarWH_Contract.PaymentTermID = pContract.PaymentTermID;
                objCVarWH_Contract.YearlyExtraRatio = pContract.YearlyExtraRatio;
                objCVarWH_Contract.Approved = pContract.Approved;
                objCVarWH_Contract.ChargeTypeId = pContract.ChargeTypeId;
                objCVarWH_Contract.DayAmount = pContract.DayAmount;

                objCVarWH_Contract.CreatorUserID = objCVarWH_Contract.ModificatorUserID = WebSecurity.CurrentUserId;
                objCVarWH_Contract.CreationDate = objCVarWH_Contract.ModificationDate = DateTime.Now;
                objCWH_Contract.lstCVarWH_Contract.Add(objCVarWH_Contract);
                checkException = objCWH_Contract.SaveMethod(objCWH_Contract.lstCVarWH_Contract);
                if (checkException == null)
                    pContract.ID = objCVarWH_Contract.ID;
                else
                    _ReturnedMessage = checkException.Message;
            }
            #endregion Insert
            #region Update
            else //update
            {
                if (pContract.contractServices == null)
                {
                    _UpdateClause = pContract.WarehouseID == 0 ? "WarehouseID=null" : ("WarehouseID=" + pContract.WarehouseID) + " \n";
                    _UpdateClause += pContract.CustomerID == 0 ? ",CustomerID=null" : (",CustomerID=" + pContract.CustomerID) + " \n";
                    _UpdateClause += pContract.FromDate == "0" ? " ,FromDate = NULL " : (" ,FromDate = '" + (DateTime.ParseExact(pContract.FromDate + " 00.00.00.000", "d/M/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture)).ToString("yyyyMMdd 00:00:00.000") + "'");
                    _UpdateClause += pContract.ToDate == "0" ? " ,ToDate = NULL " : (" ,ToDate = '" + (DateTime.ParseExact(pContract.ToDate + " 00.00.00.000", "d/M/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture)).ToString("yyyyMMdd 23:59:59.998") + "'");
                    _UpdateClause += pContract.StorageLimit == 0 ? ",StorageLimit=null" : (",StorageLimit=" + pContract.StorageLimit) + " \n";
                    _UpdateClause += pContract.StorageUnitID == 0 ? ",StorageUnitID=null" : (",StorageUnitID=" + pContract.StorageUnitID) + " \n";
                    _UpdateClause += " , IsByPallet = " + (pContract.IsByPallet ? "1" : "0") + " \n";
                    _UpdateClause += pContract.NumberOfPallets == 0 ? ",NumberOfPallets=null" : (",NumberOfPallets=" + pContract.NumberOfPallets) + " \n";
                    _UpdateClause += pContract.CurrencyID == 0 ? ",CurrencyID=null" : (",CurrencyID=" + pContract.CurrencyID) + " \n";
                    _UpdateClause += pContract.Notes == "0" ? ",Notes=null" : (",Notes=N'" + pContract.Notes + "'") + " \n";
                    _UpdateClause += " , IsFinalized = " + (pContract.IsFinalized ? "1" : "0") + " \n";
                    _UpdateClause += pContract.Amount == 0 ? ",Amount=null" : (",Amount=" + pContract.Amount) + " \n";
                    _UpdateClause += pContract.PaymentTermID == 0 ? ",PaymentTermID=null" : (",PaymentTermID=" + pContract.PaymentTermID) + " \n";
                    _UpdateClause += pContract.YearlyExtraRatio == 0 ? ",YearlyExtraRatio=null" : (",YearlyExtraRatio=" + pContract.YearlyExtraRatio) + " \n";
                    _UpdateClause += pContract.ChargeTypeId == 0 ? ",ChargeTypeId=null" : (",ChargeTypeId=" + pContract.ChargeTypeId) + " \n";
                    _UpdateClause += pContract.DayAmount == 0 ? ",DayAmount=null" : (",DayAmount=" + pContract.DayAmount) + " \n";

                    _UpdateClause += " , Approved = " + (pContract.Approved ? "1" : "0") + " \n";
                    _UpdateClause += " , ModificatorUserID = " + WebSecurity.CurrentUserId.ToString();
                    _UpdateClause += " , ModificationDate = GETDATE() ";
                    _UpdateClause += " WHERE ID = " + pContract.ID.ToString();
                }
                else
                {
                    _UpdateClause = pContract.WarehouseID == 0 ? "WarehouseID=null" : ("WarehouseID=" + pContract.WarehouseID) + " \n";
                    _UpdateClause += pContract.CustomerID == 0 ? ",CustomerID=null" : (",CustomerID=" + pContract.CustomerID) + " \n";
                    _UpdateClause += pContract.FromDate == "0" ? " ,FromDate = NULL " : (" ,FromDate = '" + (DateTime.ParseExact(pContract.FromDate + " 00.00.00.000", "d/M/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture)).ToString("yyyyMMdd 00:00:00.000") + "'");
                    _UpdateClause += pContract.ToDate == "0" ? " ,ToDate = NULL " : (" ,ToDate = '" + (DateTime.ParseExact(pContract.ToDate + " 00.00.00.000", "d/M/yyyy hh.mm.ss.fff", CultureInfo.InvariantCulture)).ToString("yyyyMMdd 23:59:59.998") + "'");
                    _UpdateClause += pContract.StorageLimit == 0 ? ",StorageLimit=null" : (",StorageLimit=" + pContract.StorageLimit) + " \n";
                    _UpdateClause += pContract.StorageUnitID == 0 ? ",StorageUnitID=null" : (",StorageUnitID=" + pContract.StorageUnitID) + " \n";
                    _UpdateClause += " , IsByPallet = " + (pContract.IsByPallet ? "1" : "0") + " \n";
                    _UpdateClause += pContract.NumberOfPallets == 0 ? ",NumberOfPallets=null" : (",NumberOfPallets=" + pContract.NumberOfPallets) + " \n";
                    _UpdateClause += pContract.CurrencyID == 0 ? ",CurrencyID=null" : (",CurrencyID=" + pContract.CurrencyID) + " \n";
                    _UpdateClause += pContract.Notes == "0" ? ",Notes=null" : (",Notes=N'" + pContract.Notes + "'") + " \n";
                    _UpdateClause += " , IsFinalized = " + (pContract.IsFinalized ? "1" : "0") + " \n";
                    _UpdateClause += pContract.Amount == 0 ? ",Amount=null" : (",Amount=" + pContract.Amount) + " \n";
                    _UpdateClause += pContract.PaymentTermID == 0 ? ",PaymentTermID=null" : (",PaymentTermID=" + pContract.PaymentTermID) + " \n";
                    _UpdateClause += pContract.YearlyExtraRatio == 0 ? ",YearlyExtraRatio=null" : (",YearlyExtraRatio=" + pContract.YearlyExtraRatio) + " \n";
                    _UpdateClause += pContract.ChargeTypeId == 0 ? ",ChargeTypeId=null" : (",ChargeTypeId=" + pContract.ChargeTypeId) + " \n";
                    _UpdateClause += pContract.DayAmount == 0 ? ",DayAmount=null" : (",DayAmount=" + pContract.DayAmount) + " \n";

                    _UpdateClause += " , Approved = " + (pContract.Approved ? "1" : "0") + " \n";
                    _UpdateClause += " , ModificatorUserID = " + WebSecurity.CurrentUserId.ToString();
                    _UpdateClause += " , ModificationDate = GETDATE() ";
                    _UpdateClause += " WHERE ID = " + pContract.ID.ToString();
                    string IDs = string.Join(",", pContract.contractServices.Select(a => a.ID));
                    checkException = objCWH_ExtraServices.DeleteList($"where ContractId = {pContract.ID} and ID not in ({IDs})");
                    foreach (var transService in pContract.contractServices)
                    {
                        objCWH_ExtraServices.lstCVarWH_ExtraServices.Add(new CVarWH_ExtraServices
                        {
                            ID = transService.ID,
                            ContractId = pContract.ID,
                            ServiceId = transService.ServiceID,
                            Selling = (int)transService.ServiceSelling,
                            CreationDate = DateTime.Now,
                            CreatorUserID = WebSecurity.CurrentUserId
                        });
                        Common.Common.ReplaceNull(objCWH_ExtraServices.lstCVarWH_ExtraServices[objCWH_ExtraServices.lstCVarWH_ExtraServices.Count - 1]);
                    }

                    checkException = objCWH_ExtraServices.SaveMethod(objCWH_ExtraServices.lstCVarWH_ExtraServices);
                }
              

                checkException = objCWH_Contract.UpdateList(_UpdateClause);
                if (checkException != null)
                    _ReturnedMessage = checkException.Message;
            }
            #endregion Update
            if (_ReturnedMessage == "")
                objCvwWH_Contract.GetListPaging(1, 1, "WHERE ID=" + pContract.ID.ToString(), "ID", out _RowCount);
            return new object[] {
                _ReturnedMessage
                , pContract.ID //pData[1]
                , _ReturnedMessage != "" ? null: new JavaScriptSerializer().Serialize(objCvwWH_Contract.lstCVarvwWH_Contract[0]) //pData[2]
                , _ReturnedMessage != "" ? null : new JavaScriptSerializer().Serialize(objCvwWH_ContractDetails.lstCVarvwWH_ContractDetails) //pData[3]
            };
        }

        [HttpGet, HttpPost]
        public object[] Finalize(Int64 pFinalizedContractID)
        {
            string strMessage = "";
            Exception checkException = null;
            CWH_Contract objCWH_Contract = new CWH_Contract();
            checkException = objCWH_Contract.UpdateList("IsFinalized=1 WHERE ID=" + pFinalizedContractID);
            if (checkException != null)
                strMessage = checkException.Message;
            return new object[] {
                strMessage
            };
        }

        [HttpGet, HttpPost]
        public bool Delete(String pContractIDs)
        {
            bool _result = false;
            CWH_Contract objCWH_Contract = new CWH_Contract();
            foreach (var currentID in pContractIDs.Split(','))
            {
                objCWH_Contract.lstDeletedCPKWH_Contract.Add(new CPKWH_Contract() { ID = Int32.Parse(currentID.Trim()) });
            }

            Exception checkException = objCWH_Contract.DeleteItem(objCWH_Contract.lstDeletedCPKWH_Contract);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("DELETE")) // some or all of the Contracts were not deleted due to dependencies
                    _result = false;
            }
            else //deleted successfully
                _result = true;
            return _result;
        }

        #endregion Contract

        #region ContractDetails
        [HttpGet, HttpPost]
        public object[] ContractDetails_Save(Int64 pContractDetailsID, Int32 pContractID, Int32 pChargeTypeID
            , decimal pQuantity, int pQuantityUnitID, decimal pRate, decimal pMinimumCharge, decimal pAdditionalRate
            , Int32 pTypeID, decimal pCost)
        {
            Exception checkException = null;
            CVarWH_ContractDetails objCVarWH_ContractDetails = new CVarWH_ContractDetails();
            CWH_ContractDetails objCWH_ContractDetails = new CWH_ContractDetails();
            CvwWH_ContractDetails objCvwWH_ContractDetails = new CvwWH_ContractDetails();

            objCVarWH_ContractDetails.ID = pContractDetailsID;
            objCVarWH_ContractDetails.ContractID = pContractID;
            objCVarWH_ContractDetails.ChargeTypeID = pChargeTypeID;
            objCVarWH_ContractDetails.Quantity = pQuantity;
            objCVarWH_ContractDetails.QuantityUnitID = pQuantityUnitID;
            objCVarWH_ContractDetails.Rate = pRate;
            objCVarWH_ContractDetails.MinimumCharge = pMinimumCharge;
            objCVarWH_ContractDetails.AdditionalRate = pAdditionalRate;
            objCVarWH_ContractDetails.TypeID = pTypeID;
            objCVarWH_ContractDetails.Cost = pCost;
            
            if (pContractDetailsID != 0) //update so save original creator & creation date
            {
                CWH_ContractDetails objCGetCreationInformation = new CWH_ContractDetails();
                objCGetCreationInformation.GetItem(pContractDetailsID);
                objCVarWH_ContractDetails.CreatorUserID = objCGetCreationInformation.lstCVarWH_ContractDetails[0].CreatorUserID;
                objCVarWH_ContractDetails.CreationDate = objCGetCreationInformation.lstCVarWH_ContractDetails[0].CreationDate;
            }
            else
            {
                objCVarWH_ContractDetails.CreatorUserID = WebSecurity.CurrentUserId;
                objCVarWH_ContractDetails.CreationDate = DateTime.Now;
            }
            objCVarWH_ContractDetails.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarWH_ContractDetails.ModificationDate = DateTime.Now;

            objCWH_ContractDetails.lstCVarWH_ContractDetails.Add(objCVarWH_ContractDetails);
            checkException = objCWH_ContractDetails.SaveMethod(objCWH_ContractDetails.lstCVarWH_ContractDetails);

            checkException = objCvwWH_ContractDetails.GetList("WHERE ContractID=" + pContractID.ToString() + " ORDER BY ID");
            return new object[] {
                checkException == null ? true : false
                , new JavaScriptSerializer().Serialize(objCvwWH_ContractDetails.lstCVarvwWH_ContractDetails)
            };
        }

        [HttpGet, HttpPost]
        public object[] ContractDetails_Delete(string pContractDetailsIDsToDelete, Int64 pContractID)
        {
            Exception checkException = null;
            CWH_ContractDetails objCWH_ContractDetails = new CWH_ContractDetails();
            CvwWH_ContractDetails objCvwWH_ContractDetails = new CvwWH_ContractDetails();
            checkException = objCWH_ContractDetails.DeleteList("WHERE ID IN (" + pContractDetailsIDsToDelete + ")");
            objCvwWH_ContractDetails.GetList("WHERE ContractID=" + pContractID.ToString() + " ORDER By ID");
            return new object[] {
                checkException == null ? true : false
                , new JavaScriptSerializer().Serialize(objCvwWH_ContractDetails.lstCVarvwWH_ContractDetails)
            };
        }

		[HttpGet,HttpPost]
		public object GetServicePrice(string pWhereClause)
		{
			string query = $"select Selling from WH_Contract C join WH_ExtraServices CS on C.ID = CS.ContractID {pWhereClause}";
			CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
			var price = objCCustomizedDBCall.CallStringFunction(query);
			return price;
		}
		#endregion ContractDetails
		public class ContractService
        {
            public int ID { get; set; }
            public int ServiceID { get; set; }
            public decimal ServiceSelling { get; set; }
        }
    }
}

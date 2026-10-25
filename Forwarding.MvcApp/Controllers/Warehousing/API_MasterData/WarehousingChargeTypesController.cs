using Forwarding.MvcApp.Controllers.Warehousing.API_MasterData;
using Forwarding.MvcApp.Models.MasterData.Invoicing.Generated;
using Forwarding.MvcApp.Models.Warehousing.MasterData.Generated;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;

namespace Forwarding.MvcApp.Controllers.Warehousing.API_MasterData
{
    public class WarehousingChargeTypesController : ApiController
    {
        [HttpGet, HttpPost]
        public Object[] LoadAll(string pWhereClause)
        {
            CvwChargeTypes objCvwWarehousingChargeTypes = new CvwChargeTypes();
            //objCvwWarehousingChargeTypes.GetList(pWhereClause);
            Int32 _RowCount = 0;
            objCvwWarehousingChargeTypes.GetListPaging(999999, 1, pWhereClause, "Name", out _RowCount);
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[] { new JavaScriptSerializer().Serialize(objCvwWarehousingChargeTypes.lstCVarvwChargeTypes) };
        }

        [HttpGet, HttpPost]
        public Object[] LoadAllWithMinimalColumns(string pWhereClauseWithMinimalColumns)
        {
            CvwChargeTypesWithMinimalColumns objCvwWarehousingChargeTypes = new CvwChargeTypesWithMinimalColumns();
            //objCvwWarehousingChargeTypes.GetList(pWhereClause);
            Int32 _RowCount = 0;
            objCvwWarehousingChargeTypes.GetListPaging(999999, 1, pWhereClauseWithMinimalColumns, "Name", out _RowCount);
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[] { serializer.Serialize(objCvwWarehousingChargeTypes.lstCVarvwChargeTypesWithMinimalColumns) };
        }

        // [Route("/api/WarehousingChargeTypes/LoadWithPaging/{pPageNumber}/{pPageSize}")]
        [HttpGet, HttpPost]
        public Object[] LoadWithPaging(Int32 pPageNumber, Int32 pPageSize, string pSearchKey)
        {
            CvwChargeTypes objCvwChargeTypes = new CvwChargeTypes();
            //objCvwWarehousingChargeTypes.GetList(string.Empty);
            Int32 _RowCount = 0;// objCvwWarehousingChargeTypes.lstCVarWarehousingChargeTypes.Count;

            pSearchKey = (pSearchKey == null ? "" : pSearchKey.Trim());
            string whereClause = " Where  IsWarehouseChargeType =1 and (Code LIKE '%" + pSearchKey + "%' "
                + " OR Name LIKE N'%" + pSearchKey + "%' "
                + " OR LocalName LIKE N'%" + pSearchKey + "%' "
                + " OR MeasurementCode LIKE N'%" + pSearchKey + "%' " //sherif: i used name here coz code is vague for me
                + " OR TaxeTypeCode LIKE N'%" + pSearchKey + "%' "
                + " OR InvoiceTypeCode LIKE N'%" + pSearchKey + "%') ";

            objCvwChargeTypes.GetListPaging(pPageSize, pPageNumber, whereClause, " ChargeTypeName ", out _RowCount);

            return new Object[] { new JavaScriptSerializer().Serialize(objCvwChargeTypes.lstCVarvwChargeTypes), _RowCount };
        }

        // [Route("/api/WarehousingChargeTypes/Insert/{pCode}/{pModificatorUser}/{pLocalName}}")]
        [HttpGet, HttpPost]
        public bool Insert(Int32 pMeasurementID, Int32 pTaxeTypeID, Int32 pInvoiceTypeID, String pCode, String pName, String pLocalName, int pViewOrder, string pNotes, bool pIsUsedInReceivable, bool pIsUsedInPayable, bool pIsTank, bool pIsOcean, bool pIsAir, bool pIsInland, bool pIsDefaultInQuotation, bool pIsDefaultInOperations, bool pIsInactive /*, bool pIsAddedManually*/, bool pIsGeneralChargeType, bool pIsWarehouseChargeType, bool pIsOperationChargeType
            , Int32 pAccountID_Revenue, int pSubAccountID_Revenue, int pCostCenterID_Revenue
            , Int32 pAccountID_Expense, Int32 pSubAccountID_Expense, Int32 pCostCenterID_Expense
            , Int32 pTemplateID, Int32 pPurchaseItemID)
        {
            bool _result = false;
            CVarWarehousingChargeTypes objCVarWarehousingChargeTypes = new CVarWarehousingChargeTypes();

            objCVarWarehousingChargeTypes.MeasurementID = pMeasurementID;
            objCVarWarehousingChargeTypes.TaxeTypeID = pTaxeTypeID;
            objCVarWarehousingChargeTypes.InvoiceTypeID = pInvoiceTypeID;

            objCVarWarehousingChargeTypes.Code = pCode;
            objCVarWarehousingChargeTypes.Name = pName;
            objCVarWarehousingChargeTypes.LocalName = (pLocalName == null ? "" : pLocalName);
            objCVarWarehousingChargeTypes.ViewOrder = pViewOrder;
            objCVarWarehousingChargeTypes.IsAddedManually = true;
            objCVarWarehousingChargeTypes.IsUsedInPayable = pIsUsedInPayable;
            objCVarWarehousingChargeTypes.IsUsedInReceivable = pIsUsedInReceivable;
            objCVarWarehousingChargeTypes.IsTank = pIsTank;
            objCVarWarehousingChargeTypes.IsOcean = pIsOcean;
            objCVarWarehousingChargeTypes.IsInland = pIsInland;
            objCVarWarehousingChargeTypes.IsAir = pIsAir;
            objCVarWarehousingChargeTypes.IsDefaultInQuotation = pIsDefaultInQuotation;
            objCVarWarehousingChargeTypes.IsDefaultInOperations = pIsDefaultInOperations;
            objCVarWarehousingChargeTypes.IsGeneralChargeType = pIsGeneralChargeType;
            objCVarWarehousingChargeTypes.IsWarehouseChargeType = pIsWarehouseChargeType;
            objCVarWarehousingChargeTypes.IsOperationChargeType = pIsOperationChargeType;

            objCVarWarehousingChargeTypes.AccountID_Revenue = pAccountID_Revenue;
            objCVarWarehousingChargeTypes.SubAccountID_Revenue = pSubAccountID_Revenue;
            objCVarWarehousingChargeTypes.CostCenterID_Revenue = pCostCenterID_Revenue;
            objCVarWarehousingChargeTypes.AccountID_Expense = pAccountID_Expense;
            objCVarWarehousingChargeTypes.SubAccountID_Expense = pSubAccountID_Expense;
            objCVarWarehousingChargeTypes.CostCenterID_Expense = pCostCenterID_Expense;

            objCVarWarehousingChargeTypes.IsInactive = pIsInactive;
            objCVarWarehousingChargeTypes.TimeLocked = DateTime.Parse("01-01-1900");
            objCVarWarehousingChargeTypes.LockingUserID = 0;

            objCVarWarehousingChargeTypes.Notes = (pNotes == null ? "" : pNotes);
            objCVarWarehousingChargeTypes.TemplateID = pTemplateID;
            objCVarWarehousingChargeTypes.PurchaseItemID = pPurchaseItemID;

            objCVarWarehousingChargeTypes.CreatorUserID = objCVarWarehousingChargeTypes.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarWarehousingChargeTypes.CreationDate = objCVarWarehousingChargeTypes.ModificationDate = DateTime.Now;

            CWarehousingChargeTypes objCWarehousingChargeTypes = new CWarehousingChargeTypes();
            objCWarehousingChargeTypes.lstCVarWarehousingChargeTypes.Add(objCVarWarehousingChargeTypes);
            Exception checkException = objCWarehousingChargeTypes.SaveMethod(objCWarehousingChargeTypes.lstCVarWarehousingChargeTypes);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else //not unique
                _result = true;
            return _result;
        }

        // [Route("/api/WarehousingChargeTypes/Update/{pID}/{pCode}/{pName}/{pLocalName}")]
        [HttpGet, HttpPost]
        public bool Update(Int32 pID, Int32 pMeasurementID, Int32 pTaxeTypeID, Int32 pInvoiceTypeID, String pCode, String pName, String pLocalName, int pViewOrder, string pNotes, bool pIsUsedInReceivable, bool pIsUsedInPayable, bool pIsTank, bool pIsOcean, bool pIsAir, bool pIsInland, bool pIsDefaultInQuotation, bool pIsDefaultInOperations, bool pIsInactive /*, bool pIsAddedManually*/, bool pIsGeneralChargeType, bool pIsWarehouseChargeType, bool pIsOperationChargeType
            , Int32 pAccountID_Revenue, Int32 pSubAccountID_Revenue, Int32 pCostCenterID_Revenue
            , Int32 pAccountID_Expense, Int32 pSubAccountID_Expense, Int32 pCostCenterID_Expense
            , Int32 pTemplateID, Int32 pPurchaseItemID)
        {
            bool _result = false;
            CVarWarehousingChargeTypes objCVarWarehousingChargeTypes = new CVarWarehousingChargeTypes();

            //the next 4 lines to get the CreatorUserID and CreationDate and set them as they were entered before
            CWarehousingChargeTypes objCGetCreationInformation = new CWarehousingChargeTypes();
            objCGetCreationInformation.GetItem(pID);
            objCVarWarehousingChargeTypes.CreatorUserID = objCGetCreationInformation.lstCVarWarehousingChargeTypes[0].CreatorUserID;
            objCVarWarehousingChargeTypes.CreationDate = objCGetCreationInformation.lstCVarWarehousingChargeTypes[0].CreationDate;

            objCVarWarehousingChargeTypes.ID = pID;
            objCVarWarehousingChargeTypes.MeasurementID = pMeasurementID;
            objCVarWarehousingChargeTypes.TaxeTypeID = pTaxeTypeID;
            objCVarWarehousingChargeTypes.InvoiceTypeID = pInvoiceTypeID;

            objCVarWarehousingChargeTypes.Code = pCode;
            objCVarWarehousingChargeTypes.Name = pName;
            objCVarWarehousingChargeTypes.LocalName = (pLocalName == null ? "" : pLocalName);
            objCVarWarehousingChargeTypes.ViewOrder = pViewOrder;
            objCVarWarehousingChargeTypes.IsAddedManually = true;
            objCVarWarehousingChargeTypes.IsUsedInPayable = pIsUsedInPayable;
            objCVarWarehousingChargeTypes.IsUsedInReceivable = pIsUsedInReceivable;
            objCVarWarehousingChargeTypes.IsTank = pIsTank;
            objCVarWarehousingChargeTypes.IsOcean = pIsOcean;
            objCVarWarehousingChargeTypes.IsInland = pIsInland;
            objCVarWarehousingChargeTypes.IsAir = pIsAir;
            objCVarWarehousingChargeTypes.IsDefaultInQuotation = pIsDefaultInQuotation;
            objCVarWarehousingChargeTypes.IsDefaultInOperations = pIsDefaultInOperations;
            objCVarWarehousingChargeTypes.IsGeneralChargeType = pIsGeneralChargeType;
            objCVarWarehousingChargeTypes.IsWarehouseChargeType = pIsWarehouseChargeType;
            objCVarWarehousingChargeTypes.IsOperationChargeType = pIsOperationChargeType;

            objCVarWarehousingChargeTypes.AccountID_Revenue = pAccountID_Revenue;
            objCVarWarehousingChargeTypes.SubAccountID_Revenue = pSubAccountID_Revenue;
            objCVarWarehousingChargeTypes.CostCenterID_Revenue = pCostCenterID_Revenue;
            objCVarWarehousingChargeTypes.AccountID_Expense = pAccountID_Expense;
            objCVarWarehousingChargeTypes.SubAccountID_Expense = pSubAccountID_Expense;
            objCVarWarehousingChargeTypes.CostCenterID_Expense = pCostCenterID_Expense;

            objCVarWarehousingChargeTypes.IsInactive = pIsInactive;
            objCVarWarehousingChargeTypes.TimeLocked = DateTime.Parse("01-01-1900");
            objCVarWarehousingChargeTypes.LockingUserID = 0;

            objCVarWarehousingChargeTypes.Notes = (pNotes == null ? "" : pNotes);
            objCVarWarehousingChargeTypes.TemplateID = pTemplateID;
            objCVarWarehousingChargeTypes.PurchaseItemID = pPurchaseItemID;

            objCVarWarehousingChargeTypes.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarWarehousingChargeTypes.ModificationDate = DateTime.Now;

            CWarehousingChargeTypes objCWarehousingChargeTypes = new CWarehousingChargeTypes();
            objCWarehousingChargeTypes.lstCVarWarehousingChargeTypes.Add(objCVarWarehousingChargeTypes);
            Exception checkException = objCWarehousingChargeTypes.SaveMethod(objCWarehousingChargeTypes.lstCVarWarehousingChargeTypes);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else //not unique
                _result = true;
            return _result;
        }

        // [Route("/api/Countries/DeleteByID/{pCountryID}")]
        //[HttpGet, HttpPost]
        //public void DeleteByID(Int32 pCountryID)
        //{
        //    CCountries objCCountries = new CCountries();
        //    objCCountries.lstDeletedCPKCountries.Add(new CPKCountries() { CountryID = pCountryID });
        //    objCCountries.DeleteItem(objCCountries.lstDeletedCPKCountries);
        //}

        // [Route("api/Countries/Delete/{pCountriesIDs}")]
        [HttpGet, HttpPost]
        public bool Delete(String pWarehousingChargeTypesIDs)
        {
            bool _result = false;
            CWarehousingChargeTypes objCWarehousingChargeTypes = new CWarehousingChargeTypes();
            foreach (var currentID in pWarehousingChargeTypesIDs.Split(','))
            {
                objCWarehousingChargeTypes.lstDeletedCPKWarehousingChargeTypes.Add(new CPKWarehousingChargeTypes() { ID = Int32.Parse(currentID.Trim()) });
            }
            Exception checkException = objCWarehousingChargeTypes.DeleteItem(objCWarehousingChargeTypes.lstDeletedCPKWarehousingChargeTypes);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("DELETE")) // some or all of the rows were not deleted due to dependencies
                    _result = false;
            }
            else //deleted successfully
                _result = true;
            return _result;
        }


        [HttpGet, HttpPost]
        public object[] InsertFromOperations(string pCodeFromOperations, string pNameFromOperations, string pLocalNameFromOperations)
        {
            string _MessageReturned = "";

            CVarWarehousingChargeTypes objCVarWarehousingChargeTypes = new CVarWarehousingChargeTypes();

            objCVarWarehousingChargeTypes.MeasurementID = 0;
            objCVarWarehousingChargeTypes.TaxeTypeID = 0;
            objCVarWarehousingChargeTypes.InvoiceTypeID = 0;

            objCVarWarehousingChargeTypes.Code = pCodeFromOperations;
            objCVarWarehousingChargeTypes.Name = pNameFromOperations;
            objCVarWarehousingChargeTypes.LocalName = (pLocalNameFromOperations == null ? "" : pLocalNameFromOperations);
            objCVarWarehousingChargeTypes.ViewOrder = 0;
            objCVarWarehousingChargeTypes.IsAddedManually = true;
            objCVarWarehousingChargeTypes.IsUsedInPayable = true;
            objCVarWarehousingChargeTypes.IsUsedInReceivable = true;
            objCVarWarehousingChargeTypes.IsTank = false;
            objCVarWarehousingChargeTypes.IsOcean = true;
            objCVarWarehousingChargeTypes.IsInland = true;
            objCVarWarehousingChargeTypes.IsAir = true;
            objCVarWarehousingChargeTypes.IsDefaultInQuotation = false;
            objCVarWarehousingChargeTypes.IsDefaultInOperations = false;
            objCVarWarehousingChargeTypes.IsGeneralChargeType = false;
            objCVarWarehousingChargeTypes.IsWarehouseChargeType = false;
            objCVarWarehousingChargeTypes.IsOperationChargeType = true;

            objCVarWarehousingChargeTypes.AccountID_Revenue = 0;
            objCVarWarehousingChargeTypes.SubAccountID_Revenue = 0;
            objCVarWarehousingChargeTypes.CostCenterID_Revenue = 0;
            objCVarWarehousingChargeTypes.AccountID_Expense = 0;
            objCVarWarehousingChargeTypes.SubAccountID_Expense = 0;
            objCVarWarehousingChargeTypes.CostCenterID_Expense = 0;

            objCVarWarehousingChargeTypes.IsInactive = false;
            objCVarWarehousingChargeTypes.TimeLocked = DateTime.Parse("01-01-1900");
            objCVarWarehousingChargeTypes.LockingUserID = 0;

            objCVarWarehousingChargeTypes.Notes = "";
            objCVarWarehousingChargeTypes.TemplateID = 0;
            objCVarWarehousingChargeTypes.PurchaseItemID = 0;

            objCVarWarehousingChargeTypes.CreatorUserID = objCVarWarehousingChargeTypes.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarWarehousingChargeTypes.CreationDate = objCVarWarehousingChargeTypes.ModificationDate = DateTime.Now;

            CWarehousingChargeTypes objCWarehousingChargeTypes = new CWarehousingChargeTypes();
            objCWarehousingChargeTypes.lstCVarWarehousingChargeTypes.Add(objCVarWarehousingChargeTypes);
            Exception checkException = objCWarehousingChargeTypes.SaveMethod(objCWarehousingChargeTypes.lstCVarWarehousingChargeTypes);

            if (checkException == null) //get returned data
            {
                objCWarehousingChargeTypes.GetList("WHERE IsInactive=0 ORDER BY Name");
            }
            else
                _MessageReturned = checkException.Message;
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                _MessageReturned
                , _MessageReturned == "" ? objCVarWarehousingChargeTypes.ID : 0 //pInsertedID = pData[1]
                , _MessageReturned == "" ? serializer.Serialize(objCWarehousingChargeTypes.lstCVarWarehousingChargeTypes) : null //pWarehousingChargeTypes = pData[2]
            };
        }

    }
}

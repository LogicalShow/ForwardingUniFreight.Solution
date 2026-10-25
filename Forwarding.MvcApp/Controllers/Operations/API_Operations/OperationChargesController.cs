using Forwarding.MvcApp.Models.MasterData.Invoicing.Generated;
using Forwarding.MvcApp.Models.Operations.Operations.Generated;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;

namespace Forwarding.MvcApp.Controllers.Operations.API_Operations
{
    public class OperationChargesController : ApiController
    {
        [HttpGet, HttpPost]
        public Object[] LoadAll(string pWhereClause)
        {
            COperationCharges objCOperationCharges = new COperationCharges();
            objCOperationCharges.GetList(pWhereClause);
            return new Object[] { new JavaScriptSerializer().Serialize(objCOperationCharges.lstCVarOperationCharges) };
        }

        //// [Route("/api/OperationCharges/LoadWithPaging/{pPageNumber}/{pPageSize}")]
        //[HttpGet, HttpPost]
        //public Object[] LoadWithPaging(Int32 pPageNumber, Int32 pPageSize, string pSearchKey)
        //{
        //    CvwOperationCharges objCvwOperationCharges = new CvwOperationCharges();
        //    //objCvwOperationCharges.GetList(string.Empty); //GetList() fn loads without paging
        //    Int32 _RowCount = objCvwOperationCharges.lstCVarvwOperationCharges.Count;

        //    pSearchKey = (pSearchKey == null ? "" : pSearchKey.Trim().ToUpper());
        //    string whereClause = " Where ChargeTypeCode LIKE '%" + pSearchKey + "%' ";

        //    objCvwOperationCharges.GetListPaging(pPageSize, pPageNumber, whereClause, " ChargeTypeCode ", out _RowCount);
        //    return new Object[] { new JavaScriptSerializer().Serialize(objCvwOperationCharges.lstCVarvwOperationCharges), _RowCount };
        //}

        [HttpGet, HttpPost]
        public object[] LoadWithWhereClause(Int32 pPageNumber, Int32 pPageSize, string pWhereClause)
        {
            CvwOperationCharges objCvwOperationCharges = new CvwOperationCharges();
            //objCvwOperationCharges.GetList(string.Empty); //GetList() fn loads without paging
            Int32 _RowCount = objCvwOperationCharges.lstCVarvwOperationCharges.Count;
            //pSearchKey here is the where clause
            objCvwOperationCharges.GetListPaging(pPageSize, pPageNumber, pWhereClause, " ChargeTypeCode ", out _RowCount);
            return new Object[] { new JavaScriptSerializer().Serialize(objCvwOperationCharges.lstCVarvwOperationCharges), _RowCount };
        }

        [HttpGet, HttpPost]
        public bool InsertList(Int64 pOperationID, string pSelectedIDs)
        {
            bool _result = false;
            string pWhereClause = "";
            //building the where clause to select the rows from ChargeTypes
            foreach (var currentID in pSelectedIDs.Split(','))
            {
                //i am sure i ve at least 1 selectedID isa
                pWhereClause += (pWhereClause == "" ? " WHERE ID = " + currentID.ToString()
                    : " OR ID = " + currentID.ToString());
            }

            //those 2 lines are to get the Charge types from DB
            CChargeTypes objCChargeTypes = new CChargeTypes();
            objCChargeTypes.GetList(pWhereClause);

            COperationCharges objCOperationCharges = new COperationCharges();

            foreach (var rowChargeType in objCChargeTypes.lstCVarChargeTypes)
            {
                CVarOperationCharges objCVarOperationCharges = new CVarOperationCharges();

                objCVarOperationCharges.OperationID = pOperationID;
                objCVarOperationCharges.ChargeTypeID = rowChargeType.ID;
                
                objCVarOperationCharges.CreatorUserID = objCVarOperationCharges.ModificatorUserID = WebSecurity.CurrentUserId;
                objCVarOperationCharges.ModificationDate = objCVarOperationCharges.CreationDate = DateTime.Now;
                
                objCOperationCharges.lstCVarOperationCharges.Add(objCVarOperationCharges);
            }
            var checkException = objCOperationCharges.SaveMethod(objCOperationCharges.lstCVarOperationCharges);
            if (checkException == null)
                _result = true;
            return _result;
        }

        // [Route("/api/OperationCharges/Update/{pID}/{pCode}/{pName}/{pLocalName}")]
        [HttpGet, HttpPost]
        public bool Update(Int64 pID, Int64 pOperationID, Int32 pChargeTypeID, Int32 pContainerTypeID, Int32 pPackageTypeID, Int32 pCurrencyID, Int32 pCostQuantity, Decimal pCostPrice, Decimal pCostAmount, Int32 pSaleQuantity, Decimal pSalePrice, Decimal pSaleAmount)
        {
            bool _result = false;
            CVarOperationCharges objCVarOperationCharges = new CVarOperationCharges();

            //the next 4 lines to get the CreatorUserID and CreationDate and set them as they were entered before
            COperationCharges objCGetCreationInformation = new COperationCharges();
            objCGetCreationInformation.GetItem(pID);
            objCVarOperationCharges.CreatorUserID = objCGetCreationInformation.lstCVarOperationCharges[0].CreatorUserID;
            objCVarOperationCharges.CreationDate = objCGetCreationInformation.lstCVarOperationCharges[0].CreationDate;

            objCVarOperationCharges.ID = pID;

            objCVarOperationCharges.OperationID = pOperationID;
            objCVarOperationCharges.ChargeTypeID = pChargeTypeID;
            objCVarOperationCharges.ContainerTypeID = pContainerTypeID;
            objCVarOperationCharges.PackageTypeID = pPackageTypeID;
            objCVarOperationCharges.CurrencyID = pCurrencyID;
            objCVarOperationCharges.CostQuantity = pCostQuantity;
            objCVarOperationCharges.CostPrice = pCostPrice;
            objCVarOperationCharges.CostAmount = pCostAmount;
            objCVarOperationCharges.SaleQuantity = pSaleQuantity;
            objCVarOperationCharges.SalePrice = pSalePrice;
            objCVarOperationCharges.SaleAmount = pSaleAmount;

            objCVarOperationCharges.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarOperationCharges.ModificationDate = DateTime.Now;

            COperationCharges objCOperationCharges = new COperationCharges();
            objCOperationCharges.lstCVarOperationCharges.Add(objCVarOperationCharges);
            Exception checkException = objCOperationCharges.SaveMethod(objCOperationCharges.lstCVarOperationCharges);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else //not unique
                _result = true;
            return _result;
        }

        //// [Route("/api/OperationCharges/DeleteByID/{pID}")]
        //[HttpGet, HttpPost]
        //public void DeleteByID(Int64 pID)
        //{
        //    COperationCharges objCOperationCharges = new COperationCharges();
        //    objCOperationCharges.lstDeletedCPKOperationCharges.Add(new CPKOperationCharges() { ID = pID });
        //    objCOperationCharges.DeleteItem(objCOperationCharges.lstDeletedCPKOperationCharges);
        //}

        // [Route("/api/OperationCharges/Delete/{pOperationChargesIDs}")]
        [HttpGet, HttpPost]
        public bool Delete(String pOperationChargesIDs)
        {
            bool _result = false;
            COperationCharges objCOperationCharges = new COperationCharges();
            foreach (var currentID in pOperationChargesIDs.Split(','))
            {
                objCOperationCharges.lstDeletedCPKOperationCharges.Add(new CPKOperationCharges() { ID = Int64.Parse(currentID.Trim()) });
            }

            Exception checkException = objCOperationCharges.DeleteItem(objCOperationCharges.lstDeletedCPKOperationCharges);
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
        public bool ApplyDefaultOperationCharges(Int64 pOperationID, string pWhereClause)
        {
            bool _result = false;

            COperationCharges objCOperationCharges = new COperationCharges();
            Exception checkException = objCOperationCharges.DeleteList(" WHERE OperationID = " + pOperationID.ToString());
            if (checkException == null)
            {
                //those 2 lines are to get the default charge types from DB
                CChargeTypes objCChargeTypes = new CChargeTypes();
                objCChargeTypes.GetList(pWhereClause);

                //CVarOperationCharges objCVarOperationCharges = new CVarOperationCharges();

                foreach (var rowChargeType in objCChargeTypes.lstCVarChargeTypes)
                {
                    CVarOperationCharges objCVarOperationCharges = new CVarOperationCharges();

                    objCVarOperationCharges.OperationID = pOperationID;
                    objCVarOperationCharges.ChargeTypeID = rowChargeType.ID;
                    
                    objCVarOperationCharges.CreatorUserID = objCVarOperationCharges.ModificatorUserID = WebSecurity.CurrentUserId;
                    objCVarOperationCharges.ModificationDate = objCVarOperationCharges.CreationDate = DateTime.Now;

                    objCOperationCharges.lstCVarOperationCharges.Add(objCVarOperationCharges);
                }
                checkException = objCOperationCharges.SaveMethod(objCOperationCharges.lstCVarOperationCharges);
                if (checkException == null)
                    _result = true;
            }
            return _result;
        }
    }
}

using Forwarding.MvcApp.Models.SC.MasterData.Generated;
using Forwarding.MvcApp.Models.Accounting.MasterData.Generated;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;
using Forwarding.MvcApp.Models.SL.SL_Transactions.Generated;
using Forwarding.MvcApp.Models.MasterData.Invoicing.Generated;

namespace Forwarding.MvcApp.Controllers.MasterData.API_Invoicing
{
    public class I_PriceListController : ApiController
    {
        //[HttpGet, HttpPost]
        //public Object[] GetPriceListDetails(string pWhereClause)
        //{
        //    CvwI_PriceListDetails cvwI_PriceListDetails = new CvwI_PriceListDetails();
        //    cvwI_PriceListDetails.GetList(pWhereClause);
        //    return new Object[] { new JavaScriptSerializer().Serialize(cvwI_PriceListDetails.lstCVarvwI_PriceListDetails) };
        //}

        [HttpGet, HttpPost]
        public Object[] IntializeData(string pID) //pID : AccountID
        {
            if (pID == null)
            {

                CPurchaseItem cPurchaseItem = new CPurchaseItem();
                CI_PriceList cI_PriceList = new CI_PriceList();
                CI_ItemsPrice cI_ItemsPrice = new CI_ItemsPrice();

                cPurchaseItem.GetList("where 1 = 1");
                cI_PriceList.GetList("where 1 = 1");
                cI_ItemsPrice.GetList("where 1 = 1");

                var srialize = new JavaScriptSerializer();
                srialize.MaxJsonLength = int.MaxValue;

                return new Object[] {
                    srialize.Serialize(cPurchaseItem.lstCVarPurchaseItem),
                    srialize.Serialize(cI_PriceList.lstCVarI_PriceList) ,
                    srialize.Serialize(cI_ItemsPrice.lstCVarI_ItemsPrice)};
            }
            else
            {

                CPurchaseItem cPurchaseItem = new CPurchaseItem();
                CI_PriceList cI_PriceList = new CI_PriceList();
                CI_ItemsPrice cI_ItemsPrice = new CI_ItemsPrice();

                cPurchaseItem.GetList("where 1 = 1");
                cI_PriceList.GetList("where 1 = 1");
                cI_ItemsPrice.GetList("where 1 = 1");

                var srialize = new JavaScriptSerializer();
                srialize.MaxJsonLength = int.MaxValue;


                return new Object[] {
                    srialize.Serialize(cPurchaseItem.lstCVarPurchaseItem),
                    srialize.Serialize(cI_PriceList.lstCVarI_PriceList) ,
                    srialize.Serialize(cI_ItemsPrice.lstCVarI_ItemsPrice)};
            }
        }


        // [Route("/api/I_PriceList/LoadWithPaging/{pPageNumber}/{pPageSize}")]
        [HttpGet, HttpPost]
        public Object[] LoadWithPaging(Int32 pPageNumber, Int32 pPageSize, string pSearchKey)
        {
            CI_PriceList objCI_PriceList = new CI_PriceList();
            //objCI_PriceList.GetList(string.Empty);
            Int32 _RowCount = 0;// objCI_PriceList.lstCVarI_PriceList.Count;

            pSearchKey = (pSearchKey == null ? "" : pSearchKey.Trim().ToUpper());
            string whereClause = " Where Name LIKE '%" + pSearchKey + "%' ";

            objCI_PriceList.GetListPaging(pPageSize, pPageNumber, whereClause, " Name ", out _RowCount);

            return new Object[] { new JavaScriptSerializer().Serialize(objCI_PriceList.lstCVarI_PriceList), _RowCount };
        }

        // [Route("/api/I_PriceList/Insert/{pCode}/{pModificatorUser}/{pLocalName}}")]
        [HttpGet, HttpPost]
        public bool Insert(
            string pName
            )
        {
            bool _result = false;

            CVarI_PriceList objCVarI_PriceList = new CVarI_PriceList();
            objCVarI_PriceList.Name = pName;
            objCVarI_PriceList.PriceTypeID = 0;
            
            //  objCVarI_PriceList.AccountID = int.Parse(pAccountID);
            //  objCVarI_PriceList.SubAccountID = int.Parse(pSubAccountID);
            CI_PriceList objCI_PriceList = new CI_PriceList();
            objCI_PriceList.lstCVarI_PriceList.Add(objCVarI_PriceList);
            Exception checkException = objCI_PriceList.SaveMethod(objCI_PriceList.lstCVarI_PriceList);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else //not unique
                _result = true;
            return _result;
        }
        [HttpGet, HttpPost]
        [AllowAnonymous] // (This Action Used to Insert Transaction Details)  [OR] (Update Transaction Details and Transaction Header)
        public object[] InsertItems([FromBody] String pItems)
        {
            // Insert List Of Details
            string _result = "0";
            var istrue = false;
            var Message = "";

            // Deserialize List -------------------------------------------------------------------------------
            var Listobj = new JavaScriptSerializer().Deserialize<List<CVarI_ItemsPrice>>(pItems);
            // var TransNotes = Listobj[0].Notes; // used to update Transaction header
            // Listobj[0].Notes = "-";
            CI_ItemsPrice cI_ItemsPrice = new CI_ItemsPrice();


            Exception checkException = cI_ItemsPrice.SaveMethod(Listobj);

            if(checkException != null)
            {
                istrue = false;
                Message = checkException.Message;
            }
            else
            {
                istrue = true;
                Message ="";
            }

            return new object[] { istrue, Message, 1 };
        }
        [HttpGet, HttpPost]
        public bool Update(
            string pID,
           string pName
           )
        {
            bool _result = false;

            CVarI_PriceList objCVarI_PriceList = new CVarI_PriceList();
            objCVarI_PriceList.ID = int.Parse(pID);
            objCVarI_PriceList.Name = pName;
            objCVarI_PriceList.PriceTypeID = 0;
            // objCVarI_PriceList.AccountID = int.Parse(pAccountID);
            //  objCVarI_PriceList.SubAccountID = int.Parse(pSubAccountID);
            CI_PriceList objCI_PriceList = new CI_PriceList();
            objCI_PriceList.lstCVarI_PriceList.Add(objCVarI_PriceList);
            Exception checkException = objCI_PriceList.SaveMethod(objCI_PriceList.lstCVarI_PriceList);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else //not unique
                _result = true;
            return _result;
        }

        [HttpGet, HttpPost]
        public bool Delete(String pI_PriceListIDs)
        {
            bool _result = false;
            CI_PriceList objCI_PriceList = new CI_PriceList();
            foreach (var currentID in pI_PriceListIDs.Split(','))
            {
                objCI_PriceList.lstDeletedCPKI_PriceList.Add(new CPKI_PriceList() { ID = Int32.Parse(currentID.Trim()) });
            }

            Exception checkException = objCI_PriceList.DeleteItem(objCI_PriceList.lstDeletedCPKI_PriceList);
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

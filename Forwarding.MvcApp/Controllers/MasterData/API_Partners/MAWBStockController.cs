using Forwarding.MvcApp.Models.MasterData.Partners.Generated;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;

namespace Forwarding.MvcApp.Controllers.MasterData.API_Partners
{
    public class MAWBStockController : ApiController
    {
        //[Route("/api/MAWBStock/LoadAll")]
        [HttpGet, HttpPost]
        public Object[] LoadAll(string pWhereClause)
        {
            CvwMAWBStock objCvwMAWBStock = new CvwMAWBStock();
            objCvwMAWBStock.GetList(pWhereClause);
            return new Object[] { new JavaScriptSerializer().Serialize(objCvwMAWBStock.lstCVarvwMAWBStock) };
        }

        [HttpGet, HttpPost]
        public Object[] LoadWithPaging(Int32 pPageNumber, Int32 pPageSize, string pWhereClause, string pOrderBy)
        {
            CvwMAWBStock objCvwMAWBStock = new CvwMAWBStock();
            //objCvwMAWBStock.GetList(string.Empty);
            Int32 _RowCount = 0;// objCvwMAWBStock.lstCVarvwMAWBStock.Count;

            objCvwMAWBStock.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);

            return new Object[] { new JavaScriptSerializer().Serialize(objCvwMAWBStock.lstCVarvwMAWBStock), _RowCount };
        }

        // [Route("api/MAWBStock/Delete/{pMAWBStockIDs}")]
        [HttpGet, HttpPost]
        public bool Delete(String pMAWBStockIDs)
        {
            bool _result = false;
            CMAWBStock objCMAWBStock = new CMAWBStock();
            foreach (var currentID in pMAWBStockIDs.Split(','))
            {
                objCMAWBStock.lstDeletedCPKMAWBStock.Add(new CPKMAWBStock() { ID = Int32.Parse(currentID.Trim()) });
            }

            Exception checkException = objCMAWBStock.DeleteItem(objCMAWBStock.lstDeletedCPKMAWBStock);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("DELETE")) // some or all of the rows were not deleted due to dependencies
                    _result = false;
            }
            else //deleted successfully and no dependencies, so set is deleted in addresses and contacts to 1 by a trigger
                _result = true;
            return _result;
        }

        [HttpGet, HttpPost]
        public string GenerateMAWBStock(int pAirlineID, string pStartNumber, string pEndNumber, int pAmount, int pTypeOfStockID)
        {
            CMAWBStock objCMAWBStock = new CMAWBStock();
            for (int i = int.Parse(pStartNumber); i < int.Parse(pEndNumber) + 1; i++)
            {
                CVarMAWBStock objCVarMAWBStock = new CVarMAWBStock();
                
                CMAWBStock objCcheckMAWBStock = new CMAWBStock(); //to get the record with already existing range

                objCVarMAWBStock.AirlineID = pAirlineID;
                objCVarMAWBStock.MAWBSuffix = i.ToString() + (i % 7).ToString();
                int intMAWBSuffixLength = objCVarMAWBStock.MAWBSuffix.Length;
                //for (int x = 0; x < 7 - intMAWBSuffixLength; x++) //this line is from separated Venus version
                for (int x = 0; x < 8 - intMAWBSuffixLength; x++)
                    objCVarMAWBStock.MAWBSuffix = "0" + objCVarMAWBStock.MAWBSuffix;
                objCVarMAWBStock.Notes = "";

                objCVarMAWBStock.CreatorUserID = objCVarMAWBStock.ModificatorUserID = WebSecurity.CurrentUserId;
                objCVarMAWBStock.CreationDate = objCVarMAWBStock.ModificationDate = DateTime.Now;

                objCVarMAWBStock.TypeOfStockID = pTypeOfStockID;
                //if getlist(where MAWB= ....).count != 0 then dont add and return with warning
                objCcheckMAWBStock.GetList(" WHERE MAWBSuffix = " + objCVarMAWBStock.MAWBSuffix + " AND AirlineID = " + pAirlineID.ToString());
                if (objCcheckMAWBStock.lstCVarMAWBStock.Count == 0) //the number is not in the saved MAWBs
                    objCMAWBStock.lstCVarMAWBStock.Add(objCVarMAWBStock);
                else //this number already exists in the saved MAWBs
                    return objCVarMAWBStock.MAWBSuffix;
            }
            objCMAWBStock.SaveMethod(objCMAWBStock.lstCVarMAWBStock);
            return "";
        }

        //TODO : PrintMAWBStock Remove Comment when creating VwAirLineBillStock
        [HttpGet, HttpPost]
        public Object[] PrintMAWBStock(string pWhereClausePrintMAWBStock)
        {
            //CvwMAWBStock objCvwMAWBStock = new CvwMAWBStock();
            CVwAirLineBillStock objCVwAirLineBillStock = new CVwAirLineBillStock();
            // Int32 _RowCount = 0;

            //objCvwMAWBStock.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);
            objCVwAirLineBillStock.GetList(pWhereClausePrintMAWBStock);

            return new Object[] { new JavaScriptSerializer().Serialize(objCVwAirLineBillStock.lstCVarVwAirLineBillStock) };
        }

    }
}

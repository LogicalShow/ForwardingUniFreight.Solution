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
using Forwarding.MvcApp.Models.Accounting.Transactions.Generated;
using Forwarding.MvcApp.Models.FA.Generated;
using Forwarding.MvcApp.Models.Administration.Settings.Generated;

namespace Forwarding.MvcApp.Controllers.MasterData.API_Invoicing
{
    public class FA_AssetsInventoryController : ApiController
    {


        [HttpGet, HttpPost]
        public Object[] IntializeData(string pID) //pID : AccountID
        {
            if (pID == null)
                pID = "0";

            CBranches objCFA_AssetsBranches = new CBranches();
            CFA_Departments objCFA_AssetsDepartments = new CFA_Departments();
            CDevisons objCDevisons = new CDevisons();
            CvwFA_Assets cvwFA_Assets = new CvwFA_Assets();


            objCFA_AssetsBranches.GetList("Where ID IN( Select BranchID from FA_UserBranches  where UserID = " + WebSecurity.CurrentUserId + ") ");
            objCFA_AssetsDepartments.GetList("where 1=1");
            objCDevisons.GetList("where 1=1");
            cvwFA_Assets.GetList("Where BranchID IN( Select BranchID from FA_UserBranches  where UserID = " + WebSecurity.CurrentUserId + ") ");

            return new Object[] 
            {
                 new JavaScriptSerializer().Serialize(objCFA_AssetsBranches.lstCVarBranches),
                 new JavaScriptSerializer().Serialize(objCDevisons.lstCVarDevisons),
                 new JavaScriptSerializer().Serialize(objCFA_AssetsDepartments.lstCVarFA_Departments),
                 new JavaScriptSerializer().Serialize(cvwFA_Assets.lstCVarvwFA_Assets)
            };

        }



        [HttpGet, HttpPost]
        public Object[] GetActualQtyOfAsset(string pAssetID , DateTime pDate) //pID : AccountID
        {
            decimal? sum = 0;
            CFA_Transactions cFA_Transactions = new CFA_Transactions();
            var wherecodition = "where AssetID = " + pAssetID + " AND ISNULL(IsDeleted , 0) = 0 AND ToDate <= \'"+pDate +"\'  "  + " ";
            cFA_Transactions.GetList(wherecodition);
            var list = cFA_Transactions.lstCVarFA_Transactions;
            if (list != null && list.Count > 0)
                sum = list.Sum(x => (x.Qty * x.QtyFactor));
            else
                sum = 0;

            return new Object[]
            {
                sum
            };

        }





        [HttpGet, HttpPost]
        [AllowAnonymous]
        public object[] InsertItems([FromBody]string pItems)
        {
            var _result = false;
            //  Deserialize List -------------------------------------------------------------------------------
            var Listobj = new JavaScriptSerializer().Deserialize<List<CVarFA_AssetsInventoryDetails>>(pItems);
            CFA_AssetsInventoryDetails cCFA_AssetsInventoryDetails = new CFA_AssetsInventoryDetails();
            var checkException = cCFA_AssetsInventoryDetails.SaveMethod(Listobj);
            //  Listobj[0].
            //  ------------------------------
            if (checkException == null)
                _result = true;

            return new object[] {
                _result, pItems
            };
        }
        [HttpGet, HttpPost]
        public object[] LoadWithWhereClause(Int32 pPageNumber, Int32 pPageSize, string pWhereClause)
        {
            CvwFA_AssetsInventory cFA_Transactions = new CvwFA_AssetsInventory();
            Int32 _RowCount = 0;
            cFA_Transactions.GetListPaging(pPageSize, pPageNumber, pWhereClause + " and  BranchID  IN(Select ub.BranchID from FA_UserBranches ub where ub.UserID = " + WebSecurity.CurrentUserId + ")", " ID DESC ", out _RowCount);
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[] { serializer.Serialize(cFA_Transactions.lstCVarvwFA_AssetsInventory), _RowCount };
        }

        [HttpGet, HttpPost]
        public Object[] LoadFA_AssetsInventoryDetails(string pWhereClause)
        {
            CFA_AssetsInventoryDetails FA_AssetsInventoryDetails = new CFA_AssetsInventoryDetails();
            FA_AssetsInventoryDetails.GetList(pWhereClause);
            return new Object[] { new JavaScriptSerializer().Serialize(FA_AssetsInventoryDetails.lstCVarFA_AssetsInventoryDetails) };
        }

        // [Route("/api/FA_AssetsInventory/Insert/{pCode}/{pModificatorUser}/{pLocalName}}")]
        [HttpGet, HttpPost]
        public int Insert
            (
                     string   pCode,
          string  pIsDeleted,
            string pType ,
string pBranchID ,
string pDepartmentID,
string pDevisionID,
DateTime pDate,
string pNotes
            )
        {
            int _result = 0;


            var objlastcode = new CFA_AssetsInventory();
            objlastcode.GetList("WHERE ID = (select max(ID) from FA_AssetsInventory where isnull(IsDeleted , 0 ) = 0  and BranchID = " + pBranchID + " )");
            var lastcode = objlastcode.lstCVarFA_AssetsInventory.Count == 0 ? 0 : objlastcode.lstCVarFA_AssetsInventory[0].Code;


            CVarFA_AssetsInventory cVarFA_AssetsInventory = new CVarFA_AssetsInventory();
            cVarFA_AssetsInventory.ID = 0;
            cVarFA_AssetsInventory.Type = int.Parse(pType);
            cVarFA_AssetsInventory.BranchID = int.Parse(pBranchID);
            cVarFA_AssetsInventory.DepartmentID = int.Parse(pDepartmentID);
            cVarFA_AssetsInventory.DevisionID = int.Parse(pDevisionID);
            cVarFA_AssetsInventory.Date = pDate;
            cVarFA_AssetsInventory.Notes = pNotes;
            cVarFA_AssetsInventory.UserID = WebSecurity.CurrentUserId;
            cVarFA_AssetsInventory.Code = lastcode + 1;
            cVarFA_AssetsInventory.IsDeleted = false;


            CFA_AssetsInventory cFA_AssetsInventory = new CFA_AssetsInventory();
            cFA_AssetsInventory.lstCVarFA_AssetsInventory.Add(cVarFA_AssetsInventory);
            Exception checkException = cFA_AssetsInventory.SaveMethod(cFA_AssetsInventory.lstCVarFA_AssetsInventory);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = 0;
            }
            else //not unique
                _result = cVarFA_AssetsInventory.ID;
            return _result;
        }

        [HttpGet, HttpPost]
        public int Update
            (
            string pID ,
                                 string pCode,
          string pIsDeleted,
            string pType,
string pBranchID,
string pDepartmentID,
string pDevisionID,
DateTime pDate,
string pNotes
           )
        {
            int _result = 0;

            CVarFA_AssetsInventory cVarFA_AssetsInventory = new CVarFA_AssetsInventory();
            cVarFA_AssetsInventory.ID = int.Parse(pID);
            cVarFA_AssetsInventory.Type = int.Parse(pType);
            cVarFA_AssetsInventory.BranchID = int.Parse(pBranchID);
            cVarFA_AssetsInventory.DepartmentID = int.Parse(pDepartmentID);
            cVarFA_AssetsInventory.DevisionID = int.Parse(pDevisionID);
            cVarFA_AssetsInventory.Date = pDate;
            cVarFA_AssetsInventory.Notes = pNotes;
            cVarFA_AssetsInventory.UserID = WebSecurity.CurrentUserId;
            cVarFA_AssetsInventory.Code = int.Parse(pCode);
            cVarFA_AssetsInventory.IsDeleted = false;
            CFA_AssetsInventory cFA_AssetsInventory = new CFA_AssetsInventory();
            cFA_AssetsInventory.lstCVarFA_AssetsInventory.Add(cVarFA_AssetsInventory);
            Exception checkException = cFA_AssetsInventory.SaveMethod(cFA_AssetsInventory.lstCVarFA_AssetsInventory);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = 0;
            }
            else //not unique
                _result = cVarFA_AssetsInventory.ID;
            return _result;
        }







        [HttpGet, HttpPost]
        public bool Delete(String pFA_AssetsInventoryIDs, string type)
        {
            if (type == "1")
            {
                bool _result = false;
                CFA_AssetsInventory objCFA_AssetsInventory = new CFA_AssetsInventory();
                //foreach (var currentID in pFA_AssetsInventoryIDs.Split(','))
                //{
                //    objCFA_AssetsInventory.lstDeletedCPKFA_AssetsInventory.Add(new CPKFA_AssetsInventory() { ID = Int32.Parse(currentID.Trim()) });
                //}

                // Exception checkException = objCFA_AssetsInventory.DeleteItem(objCFA_AssetsInventory.lstDeletedCPKFA_AssetsInventory);

                Exception checkException  = objCFA_AssetsInventory.UpdateList(" IsDeleted = 1 where ID IN(" + pFA_AssetsInventoryIDs + ")");
                if (checkException != null) // an exception is caught in the model
                {
                    if (checkException.Message.Contains("DELETE")) // some or all of the rows were not deleted due to dependencies
                        _result = false;
                }
                else //deleted successfully
                    _result = true;
                return _result;
            }
            else
            {
                bool _result = false;
                CFA_AssetsInventoryDetails objCFA_AssetsInventory = new CFA_AssetsInventoryDetails();
                foreach (var currentID in pFA_AssetsInventoryIDs.Split(','))
                {
                    objCFA_AssetsInventory.lstDeletedCPKFA_AssetsInventoryDetails.Add(new CPKFA_AssetsInventoryDetails() { ID = Int32.Parse(currentID.Trim()) });
                }

                Exception checkException = objCFA_AssetsInventory.DeleteItem(objCFA_AssetsInventory.lstDeletedCPKFA_AssetsInventoryDetails);
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




        //***********************************************************************************************************************************


    }
}

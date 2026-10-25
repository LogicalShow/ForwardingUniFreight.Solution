using Forwarding.MvcApp.Models.Accounting.MasterData.Generated;
//using Forwarding.MvcApp.Models.MasterData.BanksAccountsAndTreasuries.Generated;

using Forwarding.MvcApp.Models.RealEstate.MasterData.Generated;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;
using System.Data.SqlClient;
using System.Configuration;
using Forwarding.MvcApp.Models.MasterData.Partners.Generated;

namespace Forwarding.MvcApp.Controllers.RealEstate.API_MasterData
{
    public class RS_ProjectsController : ApiController
    {
        [HttpGet, HttpPost]
        //sherif: to be used in select boxes
        public Object[] LoadAll(string pWhereClause)
        {
            CRS_Projects ObjCVarvwRS_Projects = new CRS_Projects();
            ObjCVarvwRS_Projects.GetList(pWhereClause);
            return new Object[] { new JavaScriptSerializer().Serialize(ObjCVarvwRS_Projects.lstCVarRS_Projects) };
        }

        [HttpGet, HttpPost]
        public Object[] LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned(bool pIsLoadArrayOfObjects, string pLanguage, Int32 pPageNumber, Int32 pPageSize, string pWhereClause, string pOrderBy)
        {
            int _RowCount = 0;
            CvwA_Accounts objCvwA_Accounts = new CvwA_Accounts();
            CvwA_CostCenters objCvwA_CostCenters = new CvwA_CostCenters();
            CNoAccessRS_Projects objCNoAccessRS_Projects = new CNoAccessRS_Projects();
            CCustomers Customers = new CCustomers();
            
            if (pIsLoadArrayOfObjects)
            {
                objCvwA_Accounts.GetListPaging(9999, 1, "WHERE IsMain=0", "Code", out _RowCount);
                objCvwA_CostCenters.GetListPaging(9999, 1, "Where 1=1", "ID", out _RowCount);
                objCNoAccessRS_Projects.GetListPaging(9999, 1, "Where 1=1", "Code", out _RowCount);
                Customers.GetList("where 1 = 1");
            }
            CvwRS_Projects ObjCVarvwRS_Projects = new CvwRS_Projects();
            ObjCVarvwRS_Projects.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);

            return new object[] {
                new JavaScriptSerializer().Serialize(ObjCVarvwRS_Projects.lstCVarvwRS_Projects)
                , _RowCount
                , pIsLoadArrayOfObjects ? new JavaScriptSerializer().Serialize(objCvwA_Accounts.lstCVarvwA_Accounts) : null //pAccounts = pData[2]
                , pIsLoadArrayOfObjects ? new JavaScriptSerializer().Serialize(objCvwA_CostCenters.lstCVarvwA_CostCenters) : null //pJournalTypes = pData[3]
                , pIsLoadArrayOfObjects ? new JavaScriptSerializer().Serialize(objCNoAccessRS_Projects.lstCVarNoAccessRS_Projects) : null
                , pIsLoadArrayOfObjects ? new JavaScriptSerializer().Serialize(Customers.lstCVarCustomers) : null
            };
        }

        [HttpGet, HttpPost]
        public bool Insert(string pCode, string pName, string pAddress, Int32 pAccount_ID, Int32 pCostCenter_ID, Int32 pProjectType, Int32 pFloors)
        {
            bool _result = false;

            CVarRS_Projects ObjCVarRS_Projects = new CVarRS_Projects();

            ObjCVarRS_Projects.Code = (pCode == null ? "0" : pCode.Trim().ToUpper());
            ObjCVarRS_Projects.Name = pName.ToUpper();
            ObjCVarRS_Projects.Address = (pAddress == null ? "0" : pAddress.ToUpper());
            ObjCVarRS_Projects.AccountID =  pAccount_ID;
            ObjCVarRS_Projects.CostCenter_ID =  pCostCenter_ID;
            ObjCVarRS_Projects.NoAccessID = pProjectType;
            ObjCVarRS_Projects.Floors = pFloors;

            CRS_Projects objCRS_Projects = new CRS_Projects();
            objCRS_Projects.lstCVarRS_Projects.Add(ObjCVarRS_Projects);
            Exception checkException = objCRS_Projects.SaveMethod(objCRS_Projects.lstCVarRS_Projects);
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
        [AllowAnonymous]
        public object[] InsertUnits([FromBody]string pItems)
        {
            var Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            var _result = false;
            var obj = new JavaScriptSerializer().Deserialize<List<object>>(pItems);
            var Obj_List_Items = obj[0];


            var serialize = new JavaScriptSerializer();
            var Details = serialize.Deserialize<List<CVarRS_Units>>(serialize.Serialize(Obj_List_Items));
            Exception checkException = new Exception();
            CRS_Units cSL_InvoicesDetails = new CRS_Units();
            if (Details != null && Details.Count > 0)
                checkException = cSL_InvoicesDetails.SaveMethod(Details);
            var message = "";

            if (checkException != null)
            {
                message = "Please Insert Correct Data";
            }
            else
            {
                _result = true;
                message = "Done";

            }
            return new object[] {
                _result , message
            };

           
        }
        [HttpGet, HttpPost]
        public object[] LoadDetails(string pWhereClause)
        {
            CRS_Units cSL_DbtCrdtNotesDetails = new CRS_Units();

            cSL_DbtCrdtNotesDetails.GetList(pWhereClause);


            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[] {
                serializer.Serialize(cSL_DbtCrdtNotesDetails.lstCVarRS_Units),
                };
        }

        [HttpGet, HttpPost]
        public object[] LoadFloors(string pWhereClause)
        {
            CRS_Floors objCRS_Floors = new CRS_Floors();

            objCRS_Floors.GetList(pWhereClause);


            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[] {
                serializer.Serialize(objCRS_Floors.lstCVarRS_Floors),
                };
        }

        [HttpGet, HttpPost]
        public bool Update(Int32 pID, string pCode, string pName, string pAddress, Int32 pAccount_ID, Int32 pCostCenter_ID, Int32 pProjectType, Int32 pFloors)
        {
            bool _result = false;

            CVarRS_Projects ObjCVarRS_Projects = new CVarRS_Projects();

            //the next 4 lines to get the CreatorUserID and CreationDate and set them as they were entered before
            CRS_Projects objCGetCreationInformation = new CRS_Projects();
            objCGetCreationInformation.GetItem(pID);

            ObjCVarRS_Projects.ID = pID;
            ObjCVarRS_Projects.Code = (pCode == null ? "0" : pCode.Trim().ToUpper());
            ObjCVarRS_Projects.Name = pName.ToUpper();
            ObjCVarRS_Projects.Address = (pAddress == null ? "0" : pAddress.ToUpper());
            ObjCVarRS_Projects.AccountID = pAccount_ID;
            ObjCVarRS_Projects.CostCenter_ID = pCostCenter_ID;
            ObjCVarRS_Projects.NoAccessID =  pProjectType;
            ObjCVarRS_Projects.Floors = pFloors;

            CRS_Projects objCRS_Projects = new CRS_Projects();
            objCRS_Projects.lstCVarRS_Projects.Add(ObjCVarRS_Projects);
            Exception checkException = objCRS_Projects.SaveMethod(objCRS_Projects.lstCVarRS_Projects);
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
        public bool Delete(String pIDs)
        {
            bool _result = false;
            CRS_Projects objCRS_Projects = new CRS_Projects();
            foreach (var currentID in pIDs.Split(','))
            {
                objCRS_Projects.lstDeletedCPKRS_Projects.Add(new CPKRS_Projects() { ID = Int32.Parse(currentID.Trim()) });
            }

            Exception checkException = objCRS_Projects.DeleteItem(objCRS_Projects.lstDeletedCPKRS_Projects);
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
        public String deleteAllSelectedDetailesIDs(string pWhereClause)
        {
            bool _result = false;

            string pUpdateClause = "";


            CRS_Units objCRS_Units = new CRS_Units();

            var pDeleteClause = "";
            var pDeleteClauseDetailes = "";

            pDeleteClauseDetailes = "WHERE ID In(" + pWhereClause + ")";
            var checkException = objCRS_Units.DeleteList(pDeleteClauseDetailes);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("DELETE")) // some or all of the rows were not deleted due to dependencies
                    _result = false;
            }
            return pUpdateClause;

        }

        [HttpGet, HttpPost]
        [AllowAnonymous]
        public object[] InsertFloors([FromBody]string pItems)
        {
            var Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
            var _result = false;
            var obj = new JavaScriptSerializer().Deserialize<List<object>>(pItems);
            var Obj_List_Items = obj[0];


            var serialize = new JavaScriptSerializer();
            var Details = serialize.Deserialize<List<CVarRS_Floors>>(serialize.Serialize(Obj_List_Items));
            Exception checkException = new Exception();
            CRS_Floors CRS_Floors = new CRS_Floors();
            if (Details != null && Details.Count > 0)
                checkException = CRS_Floors.SaveMethod(Details);
            var message = "";

            if (checkException != null)
            {
                message = "Please Insert Correct Data";
            }
            else
            {
                _result = true;
                message = "Done";

            }
            return new object[] {
                _result , message
            };
        }

        [HttpGet, HttpPost]
        public String deleteAllSelectedFloorsIDs(string pWhereClause)
        {
            bool _result = false;

            string pUpdateClause = "";


            CRS_Floors objCRS_Floors = new CRS_Floors();

            var pDeleteClause = "";
            var pDeleteClauseDetailes = "";

            pDeleteClauseDetailes = "WHERE ID In(" + pWhereClause + ")";
            var checkException = objCRS_Floors.DeleteList(pDeleteClauseDetailes);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("DELETE")) // some or all of the rows were not deleted due to dependencies
                    _result = false;
            }
            return pUpdateClause;

        }
    }
}

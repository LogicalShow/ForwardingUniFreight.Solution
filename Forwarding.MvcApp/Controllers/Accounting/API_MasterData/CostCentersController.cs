using Forwarding.MvcApp.Models.Accounting.MasterData.Generated;
using Forwarding.MvcApp.Models.Administration.Settings.Generated;
using Forwarding.MvcApp.Models.Customized;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;

namespace Forwarding.MvcApp.Controllers.Accounting.API_MasterData
{
    public class CostCentersController : ApiController
    {
        [HttpGet, HttpPost]
        public Object[] LoadAll(string pLanguage, Int32 pPageNumber, Int32 pPageSize, string pWhereClause, string pOrderBy)
        {
            int _RowCount = 0;

            Exception checkException = null;
            CvwA_CostCenters objCvwA_CostCenters = new CvwA_CostCenters();

            CvwDefaults objCvwDefaults = new CvwDefaults();
            objCvwDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount); //i am sure i ve just one row isa
            string CompanyName = objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName;
            if (CompanyName == "BED")
            {
                checkException = objCvwA_CostCenters.GetListPaging(pPageSize, pPageNumber, pWhereClause + "and id NOT IN ( SELECT a.CostCenterID FROM A_LinkOperationWithCostCenter a JOIN Operations AS o ON o.ID=a.OperationID WHERE o.OperationStageID IN(110,120))", pOrderBy, out _RowCount);

            }
            else
            {
                checkException = objCvwA_CostCenters.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);

            }

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[] {
               serializer.Serialize(objCvwA_CostCenters.lstCVarvwA_CostCenters)
                , _RowCount
            };
        }

        [HttpGet, HttpPost]
        public Object[] LoadWithPagingWithSearch(string pWhereClause, string pOrderBy)
        {
            int _RowCount = 0;
            Exception checkException = null;
            CA_CostCenter_Types objCA_CostCenter_Types = new CA_CostCenter_Types();
            checkException = objCA_CostCenter_Types.GetListPaging(99999, 1, "Where 1=1", "Name", out _RowCount);
            CA_CostCenters objCA_CostCenters = new CA_CostCenters();
          

            CvwDefaults objCvwDefaults = new CvwDefaults();
            objCvwDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount); //i am sure i ve just one row isa
            string CompanyName = objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName;
            if (CompanyName == "BED")
            {
                checkException = objCA_CostCenters.DataFillSearch(pWhereClause + "and id NOT IN ( SELECT a.CostCenterID FROM A_LinkOperationWithCostCenter a JOIN Operations AS o ON o.ID=a.OperationID WHERE o.OperationStageID IN(110,120))");

            }
            else
            {
                checkException = objCA_CostCenters.DataFillSearch(pWhereClause);
                

            }

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[] {
                serializer.Serialize(objCA_CostCenters.lstCVarA_CostCenters)
                , _RowCount
                , serializer.Serialize(objCA_CostCenter_Types.lstCVarA_CostCenter_Types) //pCostCenterTypes = pData[2]
            };
        }

        [HttpGet, HttpPost]
        public Object[] LoadCostCenterByActivity(string pSearchWord, string pOrderBy , int pActivityID)
        {
            //int _RowCount = 0;
            //Exception checkException = null;

            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
            List<CVarvwA_CostCenters> ActivitiesList = null;

            ActivitiesList = objCCustomizedDBCall.ExecuteQuery_ListOfObjects(
               @"A_LoadCostCenterByActivityAndUser " + WebSecurity.CurrentUserId + "," + pActivityID + ",'" + pSearchWord + "'"
                , typeof(CVarvwA_CostCenters)).Cast<CVarvwA_CostCenters>().ToList();

        var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[] {
                 serializer.Serialize(ActivitiesList) //pCostCenter = pData[0]
            };
        }

        [HttpGet, HttpPost]
        public Object[] LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned(
           bool pIsLoadArrayOfObjects, string pLanguage, Int32 pPageNumber, Int32 pPageSize, string pWhereClause, string pOrderBy)
        {
            int _RowCount = 0;
            Exception checkException = null;
            CA_CostCenter_Types objCA_CostCenter_Types = new CA_CostCenter_Types();
            checkException = objCA_CostCenter_Types.GetListPaging(99999, 1, "Where 1=1", "Name", out _RowCount);
            CA_CostCenters objCA_CostCenters = new CA_CostCenters();
            // checkException = objCA_CostCenters.GetListPaging(99999, 1, pWhereClause, pOrderBy, out _RowCount);

            CvwDefaults objCvwDefaults = new CvwDefaults();
            objCvwDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount); //i am sure i ve just one row isa
            string CompanyName = objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName;
            if (CompanyName == "BED")
            {
                checkException = objCA_CostCenters.GetListPaging(pPageSize, pPageNumber, pWhereClause + "and id NOT IN ( SELECT a.CostCenterID FROM A_LinkOperationWithCostCenter a JOIN Operations AS o ON o.ID=a.OperationID WHERE o.OperationStageID IN(110,120))", pOrderBy, out _RowCount);

            }
            else
            {
                checkException = objCA_CostCenters.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);

            }
            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
            var Activity = new  List<SelectListOption>();
            var BusinessUnit = new List<SelectListOption>();
            if (pIsLoadArrayOfObjects)
            {
                var result = objCCustomizedDBCall.ExecuteQuery_ListOfObjects("SELECT ID, Name FROM NoAccessActivity_Mesco ORDER BY Name", typeof(SelectListOption));
                Activity = result.Cast<SelectListOption>().ToList();

                var result2 = objCCustomizedDBCall.ExecuteQuery_ListOfObjects("SELECT ID, Name FROM NoAccessBusinessUnit_Mesco ORDER BY Name", typeof(SelectListOption));
                BusinessUnit = result2.Cast<SelectListOption>().ToList();
            }

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[] {
               serializer.Serialize(objCA_CostCenters.lstCVarA_CostCenters)
                , _RowCount
                , serializer.Serialize(objCA_CostCenter_Types.lstCVarA_CostCenter_Types) //pCostCenterTypes = pData[2]
                ,serializer.Serialize(Activity) // pData[3]
                ,serializer.Serialize(BusinessUnit)// pData[4]
            };
        }

        [HttpGet, HttpPost]
        public Object[] LoadActivity()
        {

            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
            List<CVarvwA_CostCenters> ActivitiesList = null;

            ActivitiesList = objCCustomizedDBCall.ExecuteQuery_ListOfObjects(
              @"select CC.ID, CC.Code, CC.CostCenterName as Name from A_CostCenters CC join Users_Activities UA on UA.ActivityCostCenterID = CC.ID where UA.UserID = " + WebSecurity.CurrentUserId
               , typeof(CVarvwA_CostCenters)).Cast<CVarvwA_CostCenters>().ToList();

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[] {
                 serializer.Serialize(ActivitiesList) //pCostCenter = pData[0]
            };
        }

        [HttpGet, HttpPost]
        public Object[] GetModalData(Int32 pID)
        {
            int _RowCount = 0;
            Exception checkException = null;
            CA_CostCenters objCA_CostCenters = new CA_CostCenters();
            checkException = objCA_CostCenters.GetListPaging(1, 1, "WHERE ID = " + pID.ToString(), "ID", out _RowCount);
            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
            string pNewCode = objCCustomizedDBCall.CallStringFunction("SELECT [dbo].A_CostCenters_GetCode(" + (pID == 0 ? "null" : pID.ToString()) + ") AS Code");
            return new object[] {
                pID > 0 ? new JavaScriptSerializer().Serialize(objCA_CostCenters.lstCVarA_CostCenters[0]) : null //pCostCenterFields = pData[0] in case of update
                , pNewCode //pNewCode = pData[1]
            };
        }

        [HttpGet, HttpPost]
        public Object[] Save(Int32 pID, string pCostCenterNumber, string pCostCenterName, Int32 pParent_ID
            , Int32 pCCLevel, string pRealCostCenterCode, Int32 pType_ID, bool pIsClosed, Int32 pSubAccountGroupID
            , Int32 pEmployeesCount, string pCode , int pActivityID , int pBusinessUnitID ,bool pIsActivity)
        {
            bool _result = false;
            string pWhereClause = "";
            string pUpdateClause = "";
            CA_CostCenters objCA_CostCenters = new CA_CostCenters();
            CVarA_CostCenters objCVarA_CostCenters = new CVarA_CostCenters();
            Exception checkException = null;
            int _RowCount = 0;
            #region Insert
            if (pID == 0) //Insert
            {
                objCVarA_CostCenters.CostCenterNumber = pCostCenterNumber;
                objCVarA_CostCenters.CostCenterName = pCostCenterName;
                objCVarA_CostCenters.Parent_ID = pParent_ID;
                objCVarA_CostCenters.IsMain = false;
                objCVarA_CostCenters.CCLevel = pCCLevel;
                objCVarA_CostCenters.RealCostCenterCode = pRealCostCenterCode;
                objCVarA_CostCenters.User_ID = WebSecurity.CurrentUserId;
                objCVarA_CostCenters.Type_ID = pType_ID;
                objCVarA_CostCenters.IsClosed = pIsClosed;
                objCVarA_CostCenters.SubAccountGroupID = pSubAccountGroupID;
                objCVarA_CostCenters.EmployeesCount = pEmployeesCount;
                objCVarA_CostCenters.Code = pCode;
                objCVarA_CostCenters.ActivityID = pActivityID;
                objCVarA_CostCenters.mBusinessUnitID = pBusinessUnitID;
                objCVarA_CostCenters.mIsActivity = pIsActivity;

                objCA_CostCenters.lstCVarA_CostCenters.Add(objCVarA_CostCenters);
                checkException = objCA_CostCenters.SaveMethod(objCA_CostCenters.lstCVarA_CostCenters);
                if (checkException == null)
                {
                    _result = true;
                    pID = objCVarA_CostCenters.ID;
                    //CallCustomizedSP
                    CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
                    objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "A_CostCenters", pID, "I");
                    //Set Parent.IsMain=true
                    objCA_CostCenters.UpdateList("IsMain=1 WHERE ID=" + pParent_ID.ToString());
                    pWhereClause = "WHERE CCLevel=" + pCCLevel + (pParent_ID != 0 ? (" AND Parent_ID=" + pParent_ID) : "");
                    objCA_CostCenters.GetListPaging(99999, 1, pWhereClause, "ID", out _RowCount);
                }
            }
            #endregion Insert
            #region Update
            else //Update
            {
                pUpdateClause = "CostCenterName=N'" + pCostCenterName + "'" + "\n";
                pUpdateClause += ",IsClosed='" + (pIsClosed ? "1" : "0") + "'" + "\n";
                pUpdateClause += ",Type_ID=" + (pType_ID == 0 ? "null" : pType_ID.ToString()) + "\n";
                pUpdateClause += ",Code=" + (pCode == "0" ? "null" : pCode.ToString()) + "\n";
                pUpdateClause += ",ActivityID=" + (pActivityID == 0 ? "null" : pActivityID.ToString()) + "\n";
                pUpdateClause += ",BusinessUnitID=" + (pBusinessUnitID == 0 ? "null" : pBusinessUnitID.ToString()) + "\n";
                pUpdateClause += ",IsActivity=" + (pIsActivity  ? "1" : "0") + "\n";

                pUpdateClause += "WHERE ID=" + pID + "\n";
                checkException = objCA_CostCenters.UpdateList(pUpdateClause);
                if (checkException == null)
                {
                    _result = true;
                    //CallCustomizedSP
                    CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
                    objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "A_CostCenters", Int64.Parse(pID.ToString()), "U");
                    pWhereClause = "WHERE ID=" + pID;
                    objCA_CostCenters.GetListPaging(99999, 1, pWhereClause, "CostCenterNumber", out _RowCount);
                }
            }

            #endregion Update
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[]
            {
                _result
                , pID
                , serializer.Serialize(objCA_CostCenters.lstCVarA_CostCenters)
            };
        }

        [HttpGet, HttpPost]
        public object[] Delete(Int32 pIDToDelete, Int32 pParentID, Int32 pLevel)
        {
            bool _result = false;
            int _RowCount = 0;
            Exception checkException = null;
            CA_CostCenters objCA_CostCenters = new CA_CostCenters();
            checkException = objCA_CostCenters.DeleteList("WHERE ID=" + pIDToDelete);
            if (checkException == null)
            {
                _result = true;
                //CallCustomizedSP
                CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
                objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "A_CostCenters", pIDToDelete, "D");
                if (pParentID != 0)//Update IsMain in Parent if not Root
                {
                    string pUpdateClause = "";
                    pUpdateClause = " IsMain = Case " + "\n";
                    pUpdateClause += "            WHEN (SELECT COUNT(ID) FROM A_CostCenters WHERE Parent_ID=" + pParentID.ToString() + ") > 0 THEN CAST(1 AS bit) " + "\n";
                    pUpdateClause += "            ELSE CAST(0 AS bit) " + "\n";
                    pUpdateClause += "        END " + "\n";
                    pUpdateClause += "WHERE ID=" + pParentID.ToString() + "\n";
                    objCA_CostCenters.UpdateList(pUpdateClause);
                    string pWhereClause = "WHERE CCLevel=" + pLevel + (pParentID != 0 ? (" AND Parent_ID=" + pParentID) : "");
                    objCA_CostCenters.GetListPaging(99999, 1, pWhereClause, "ID", out _RowCount);
                }
            }
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[]
            {
                _result
                , serializer.Serialize(objCA_CostCenters.lstCVarA_CostCenters)
            };
        }

    }
}

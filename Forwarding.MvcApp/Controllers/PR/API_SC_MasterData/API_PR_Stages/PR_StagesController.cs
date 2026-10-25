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
using Forwarding.MvcApp.Models.PR.MasterData.Generated;
namespace Forwarding.MvcApp.Controllers.PR.API_PR_Stages
{
    public class PR_StagesController : ApiController
    {
        //[Route("/api/PR_Stages/LoadAll")]
        //[HttpGet, HttpPost]
        ////sherif: to be used in select boxes
        //public Object[] LoadAll(string pWhereClause)
        //{
        //    CPR_Stages objCPR_Stages = new CPR_Stages();
        //    objCPR_Stages.GetList(pWhereClause);
        //    return new Object[] { new JavaScriptSerializer().Serialize(objCPR_Stages.lstCVarPR_Stages) };
        //}


        //[HttpGet, HttpPost]
        //public Object[] IntializeData(string pStoresNamesOnly)
        //{
        //    if (bool.Parse(pStoresNamesOnly))
        //    {
        //        CPR_Stages cPR_Stages = new CPR_Stages();
        //        cPR_Stages.GetList("where 1 = 1");
        //        return new Object[] { new JavaScriptSerializer().Serialize(cPR_Stages.lstCVarPR_Stages) };

        //    }
        //    else
        //    {
        //        CA_Accounts objCA_Accounts = new CA_Accounts();
        //        CA_CostCenters objCA_CostCenters = new CA_CostCenters();
        //        CPR_Stages cPR_Stages = new CPR_Stages();
        //        objCA_Accounts.GetList("Where 1 = 1");
        //        objCA_CostCenters.GetList("Where 1 = 1");
        //        cPR_Stages.GetList("where 1 = 1");
        //        return new Object[] { new JavaScriptSerializer().Serialize(objCA_Accounts.lstCVarA_Accounts), new JavaScriptSerializer().Serialize(objCA_CostCenters.lstCVarA_CostCenters), new JavaScriptSerializer().Serialize(cPR_Stages.lstCVarPR_Stages) };
        //    }
        //}


        // [Route("/api/PR_Stages/LoadWithPaging/{pPageNumber}/{pPageSize}")]
        [HttpGet, HttpPost]
        public Object[] LoadWithPaging(Int32 pPageNumber, Int32 pPageSize, string pSearchKey)
        {
            CPR_Stages objCPR_Stages = new CPR_Stages();
            //objCvwPR_Stages.GetList(string.Empty);
            Int32 _RowCount = 0;// objCvwPR_Stages.lstCVarPR_Stages.Count;
            
            pSearchKey = (pSearchKey == null ? "" : pSearchKey.Trim().ToUpper());
            string whereClause = " Where Name LIKE '%" + pSearchKey + "%' "
                + " OR Name LIKE '%" + pSearchKey + "%' "
                + " OR Notes LIKE '%" + pSearchKey + "%' "
                + " OR NameLocal LIKE '%" + pSearchKey + "%' ";

            objCPR_Stages.GetListPaging(pPageSize, pPageNumber, whereClause, " Name ", out _RowCount);

            return new Object[] { new JavaScriptSerializer().Serialize(objCPR_Stages.lstCVarPR_Stages), _RowCount };
        }
        //pName: $("#txtName").val().trim().toUpperCase(),
        //        pNameLocal: $("#txtName").val().trim().toUpperCase(),
        //        pNotes: $("#txtNotes").val().trim()
        // [Route("/api/PR_Stages/Insert/{pCode}/{pModificatorUser}/{pLocalName}}")]
        [HttpGet, HttpPost]
        public bool Insert(
            string pName,
            String pNameLocal, 
            String pNotes
            )
        {
            bool _result = false;

            CVarPR_Stages objCVarPR_Stages = new CVarPR_Stages();
            objCVarPR_Stages.Name = pName;
            objCVarPR_Stages.NameLocal = pNameLocal;
            objCVarPR_Stages.Notes = pNotes;



            CPR_Stages objCPR_Stages = new CPR_Stages();
            objCPR_Stages.lstCVarPR_Stages.Add(objCVarPR_Stages);
            Exception checkException = objCPR_Stages.SaveMethod(objCPR_Stages.lstCVarPR_Stages);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else //not unique
                _result = true;
            return _result;
        }

        // [Route("/api/PR_Stages/Insert/{pCode}/{pModificatorUser}/{pLocalName}}")]
        [HttpGet, HttpPost]
        public bool Update( string pID ,
            string pName,
            String pNameLocal,
            String pNotes
            )
        {
            bool _result = false;

            CVarPR_Stages objCVarPR_Stages = new CVarPR_Stages();
            objCVarPR_Stages.ID = int.Parse(pID);
            objCVarPR_Stages.Name = pName;
            objCVarPR_Stages.NameLocal = pNameLocal;

            objCVarPR_Stages.Notes = pNotes;

            CPR_Stages objCPR_Stages = new CPR_Stages();
            objCPR_Stages.lstCVarPR_Stages.Add(objCVarPR_Stages);
            Exception checkException = objCPR_Stages.SaveMethod(objCPR_Stages.lstCVarPR_Stages);
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
        public bool Delete(String pPR_StagesIDs)
        {
            bool _result = false;
            CPR_Stages objCPR_Stages = new CPR_Stages();
            foreach (var currentID in pPR_StagesIDs.Split(','))
            {
                objCPR_Stages.lstDeletedCPKPR_Stages.Add(new CPKPR_Stages() { ID = Int32.Parse(currentID.Trim()) });
            }

            Exception checkException = objCPR_Stages.DeleteItem(objCPR_Stages.lstDeletedCPKPR_Stages);
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

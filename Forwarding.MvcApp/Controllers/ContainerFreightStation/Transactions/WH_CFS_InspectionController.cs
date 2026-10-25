using Forwarding.MvcApp.Models.ContainerFreightStation.Transactions;
using System;
using System.Web.Http;
using System.Web.Script.Serialization;


namespace Forwarding.MvcApp.Controllers.ContainerFreightStation.Transactions
{
    public class WH_CFS_InspectionController : ApiController
    {
        [HttpGet, HttpPost]
        public object[] WH_CFS_InspectionLoadDataByOperationID(Int64 pOperationID)
        {
            bool _result = false;
            Exception checkException = null;
            var serializer = new JavaScriptSerializer() { MaxJsonLength = int.MaxValue };

            CWH_CFS_Inspection objCWH_CFS_Inspection = new CWH_CFS_Inspection();
            checkException = objCWH_CFS_Inspection.GetList(" WHERE OperationID = " + pOperationID);

            var _count = objCWH_CFS_Inspection.lstCVarWH_CFS_Inspection.Count;

            if (checkException == null)
            {
                _result = true;
            }


            return new object[] {
                _result,
                _count > 0 ? serializer.Serialize(objCWH_CFS_Inspection.lstCVarWH_CFS_Inspection) : null
            };

        }

        [HttpGet, HttpPost]
        public object[] WH_CFS_InspectionUpdate(int pID, Int64 pOperationID, DateTime pInspectionDate, string pInspectorName, string pNotes)
        {
            bool _result = false;
            Exception checkException = null;

            CVarWH_CFS_Inspection objCVarWH_CFS_Inspection = new CVarWH_CFS_Inspection();
            objCVarWH_CFS_Inspection.ID = pID;
            objCVarWH_CFS_Inspection.OperationID = pOperationID;
            objCVarWH_CFS_Inspection.InspectionDate = pInspectionDate;
            objCVarWH_CFS_Inspection.InspectorName = pInspectorName;
            objCVarWH_CFS_Inspection.Notes = pNotes == null ? "0" : pNotes;

            CWH_CFS_Inspection objCWH_CFS_Inspection = new CWH_CFS_Inspection();
            objCWH_CFS_Inspection.lstCVarWH_CFS_Inspection.Add(objCVarWH_CFS_Inspection);
            checkException = objCWH_CFS_Inspection.SaveMethod(objCWH_CFS_Inspection.lstCVarWH_CFS_Inspection);

            if(checkException == null )
            {
                _result = true;
            }

            var serializer = new JavaScriptSerializer() { MaxJsonLength = int.MaxValue };
            return new object[] {
                _result, pOperationID
            };
        }


    }
}

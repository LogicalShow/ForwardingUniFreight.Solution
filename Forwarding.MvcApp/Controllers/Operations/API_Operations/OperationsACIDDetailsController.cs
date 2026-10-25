using Forwarding.BLL.Utilities;
using Forwarding.MvcApp.Models.Administration.Security.Generated;
using Forwarding.MvcApp.Models.Administration.Settings.Generated;
using Forwarding.MvcApp.Models.LocalEmails.Generated;
using Forwarding.MvcApp.Models.MasterData.Locations.Generated;
using Forwarding.MvcApp.Models.MasterData.Others.Generated;
using Forwarding.MvcApp.Models.Operations.Operations.Generated;
using System;
using System.Net.Mail;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;

namespace Forwarding.MvcApp.Controllers.Operations.API_Operations
{
    public class OperationsACIDDetailsController : ApiController
    {
        [HttpGet, HttpPost]
        public Object[] LoadAll(string pWhereClause)
        {
            CvwOperationsACIDDetails objCvwOperationsACIDDetails = new CvwOperationsACIDDetails();
            objCvwOperationsACIDDetails.GetList(pWhereClause);
            return new Object[] { new JavaScriptSerializer().Serialize(objCvwOperationsACIDDetails.lstCVarvwOperationsACIDDetails) };
        }
        [HttpGet, HttpPost]
        public Object[] LoadWithPaging(Int32 pPageNumber, Int32 pPageSize, string pSearchKey)
        {
            CvwOperationsACIDDetails objCvwOperationsACIDDetails = new CvwOperationsACIDDetails();

            pSearchKey = (pSearchKey == null ? "" : pSearchKey.Trim().ToUpper());
            Int32 _RowCount = objCvwOperationsACIDDetails.lstCVarvwOperationsACIDDetails.Count;
            string whereClause = " Where OperationACIDNumber LIKE N'%" + pSearchKey + "%' ";
                //+ " OR OperationACIDNumber LIKE N'%" + pSearchKey + "%' ";
            objCvwOperationsACIDDetails.GetListPaging(pPageSize, pPageNumber, whereClause, "ID", out _RowCount);
            return new Object[] { new JavaScriptSerializer().Serialize(objCvwOperationsACIDDetails.lstCVarvwOperationsACIDDetails), _RowCount };
        }

        [HttpGet, HttpPost]
        public object[] Update(Int32 pID, Int64 pOperationID, String pACIDDetailsExpirationDate, String pACIDDetailsSurveyDate, String pACIDDetailsUploadCargoDate
            , string pACIDDetailsReImportApproval, string pACIDDetailsReImportApprovalNumber, string pACIDDetailsSurveyRequest, string pACIDDetailsBankNomination
            , string pACIDDetailsTransactionMethod, string pACIDDetailsBankNominationOpenedBy, string pACIDDetailsCustomsCertificateNo)
        {
            bool _result = false;
            CvwOperationsACIDDetails objCvwOperationsACIDDetails = new CvwOperationsACIDDetails();
            CVarOperationsACIDDetails objCVarOperationsACIDDetails = new CVarOperationsACIDDetails();

            //the next 4 lines to get the CreatorUserID and CreationDate and set them as they were entered before
            COperationsACIDDetails objCGetCreationInformation = new COperationsACIDDetails();
            objCGetCreationInformation.GetItem(pID);

            objCVarOperationsACIDDetails.ID = pID;
            objCVarOperationsACIDDetails.OperationID = pOperationID;
            objCVarOperationsACIDDetails.ExpirationDate = DateTime.Parse(pACIDDetailsExpirationDate);
            objCVarOperationsACIDDetails.SurveyDate = DateTime.Parse(pACIDDetailsSurveyDate);
            objCVarOperationsACIDDetails.UploadCargoDate = DateTime.Parse(pACIDDetailsUploadCargoDate);
            objCVarOperationsACIDDetails.ReImportApproval = pACIDDetailsReImportApproval;
            objCVarOperationsACIDDetails.ReImportApprovalNumber = pACIDDetailsReImportApprovalNumber;
            objCVarOperationsACIDDetails.SurveyRequest = pACIDDetailsSurveyRequest;
            objCVarOperationsACIDDetails.BankNomination = pACIDDetailsBankNomination;
            objCVarOperationsACIDDetails.TransactionMethod = pACIDDetailsTransactionMethod;
            objCVarOperationsACIDDetails.BankNominationOpenedBy = pACIDDetailsBankNominationOpenedBy;
            objCVarOperationsACIDDetails.CustomsCertificateNo = pACIDDetailsCustomsCertificateNo;

            COperationsACIDDetails objCOperationsACIDDetails = new COperationsACIDDetails();
            objCOperationsACIDDetails.lstCVarOperationsACIDDetails.Add(objCVarOperationsACIDDetails);
            Exception checkException = objCOperationsACIDDetails.SaveMethod(objCOperationsACIDDetails.lstCVarOperationsACIDDetails);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else
            { //not unique
                _result = true;
                objCvwOperationsACIDDetails.GetList("WHERE OperationID=" + pOperationID.ToString() + " OR MasterOperationID=" + pOperationID.ToString() + " ORDER BY ViewOrder, TrackingDate");
            }
            return new object[] {
                _result
                , _result ? new JavaScriptSerializer().Serialize(objCvwOperationsACIDDetails.lstCVarvwOperationsACIDDetails) : null
            };
        }

        [HttpGet, HttpPost]
        public object[] Delete(String pDeletedTrackingIDs, Int64 pOperationID)
        {
            bool _result = false;
            CvwOperationsACIDDetails objCvwOperationsACIDDetails = new CvwOperationsACIDDetails();
            COperationsACIDDetails objCOperationsACIDDetails = new COperationsACIDDetails();
            foreach (var currentID in pDeletedTrackingIDs.Split(','))
            {
                objCOperationsACIDDetails.lstDeletedCPKOperationsACIDDetails.Add(new CPKOperationsACIDDetails() { ID = Int32.Parse(currentID.Trim()) });
            }

            Exception checkException = objCOperationsACIDDetails.DeleteItem(objCOperationsACIDDetails.lstDeletedCPKOperationsACIDDetails);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("DELETE")) // some or all of the rows were not deleted due to dependencies
                    _result = false;
            }
            else
            { //deleted successfully
                _result = true;
                objCvwOperationsACIDDetails.GetList("WHERE OperationID=" + pOperationID.ToString() + " OR MasterOperationID=" + pOperationID.ToString() + " ORDER BY ViewOrder, TrackingDate");
            }
            return new object[] {
                _result
                , _result ? new JavaScriptSerializer().Serialize(objCvwOperationsACIDDetails.lstCVarvwOperationsACIDDetails) : null
            };
        }


    }
}

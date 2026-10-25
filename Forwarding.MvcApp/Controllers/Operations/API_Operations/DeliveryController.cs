using Forwarding.MvcApp.Models.Administration.Security.Generated;
using Forwarding.MvcApp.Models.LocalEmails.Generated;
using Forwarding.MvcApp.Models.MasterData.Others.Generated;
using Forwarding.MvcApp.Models.Operations.Operations.Generated;
using Forwarding.MvcApp.Models.ReceiptsAndPayments.Custodies.Generated;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using WebMatrix.WebData;
using HttpGetAttribute = System.Web.Http.HttpGetAttribute;
using HttpPostAttribute = System.Web.Http.HttpPostAttribute;

namespace Forwarding.MvcApp.Controllers.Operations.API_Operations
{
    public class DeliveryController : ApiController
    {
        [System.Web.Http.HttpGet]
        public object[] Save([FromUri] OperationsDeliveryDocumentData operationsDocumentData)
        {
            string pMessageReturned = "";
            Exception checkException = null;
            COperationsDocuments cOperationsDocuments = new COperationsDocuments();
            CVarOperationsDocuments cVarOperationsDocuments = new CVarOperationsDocuments();
            if (operationsDocumentData.pID != 0) cVarOperationsDocuments.ID = operationsDocumentData.pID;
            cVarOperationsDocuments.OperationID = Convert.ToInt64(operationsDocumentData.pOperationID);
            cVarOperationsDocuments.Code = operationsDocumentData.pCode;
            cVarOperationsDocuments.DocumentInfoID = Convert.ToInt32(operationsDocumentData.pDocumentInfoID);
            cVarOperationsDocuments.CreatorUserID = Convert.ToInt32(operationsDocumentData.pCreatorUserID);
            cVarOperationsDocuments.ReceivingDegreeID = Convert.ToInt32(operationsDocumentData.pReceivingDegreeID);
            cVarOperationsDocuments.ReceivedDate = Convert.ToDateTime(operationsDocumentData.pReceivedDate);
            cVarOperationsDocuments.ExpirationDate = (DateTime.ParseExact(
                operationsDocumentData.pExpirationDate + " 00.00.00.000", "dd/MM/yyyy hh.mm.ss.fff",
                CultureInfo.InvariantCulture));
            cVarOperationsDocuments.Notes = operationsDocumentData.pNotes;
            if (operationsDocumentData.pID != 0)
            {
                cOperationsDocuments.GetList("Where ID = " + operationsDocumentData.pID);
                cVarOperationsDocuments.ImagePath = cOperationsDocuments.lstCVarOperationsDocuments[0].ImagePath;
            }
            else
            {
                cVarOperationsDocuments.ImagePath = "0";
            }

            cVarOperationsDocuments.Recipient = operationsDocumentData.pRecipient;
            cVarOperationsDocuments.IsDeliveredFiles = true;
            cVarOperationsDocuments.IsTruckingFiles = false;
            cOperationsDocuments.lstCVarOperationsDocuments.Add(cVarOperationsDocuments);
            checkException = cOperationsDocuments.SaveMethod(cOperationsDocuments.lstCVarOperationsDocuments);

            if (checkException != null)
            {
                pMessageReturned = checkException.Message;
            }


            return new object[]
            {
                pMessageReturned, cVarOperationsDocuments.ID.ToString()
            };
        }

        [System.Web.Mvc.HttpPost]
        public object[] UploadOperationDocuments()
        {
            string _ReturnedMessage = "";
            string[] pDocsInFileNames = null; //to hold all the filenames as the return value
            if (HttpContext.Current.Request.Files.AllKeys.Any())
            {
                var pID = HttpContext.Current.Request.Form["pID"];
                var pOperationID = HttpContext.Current.Request.Form["pOperationID"];
                var pOperationCreationYear = HttpContext.Current.Request.Form["pOperationCreationYear"];


                var strFolderPath =
                    Path.Combine(
                        HttpContext.Current.Server.MapPath("~/DocsInFiles/OperationsDocuments/" + pOperationID));
                if (!Directory.Exists(strFolderPath))
                    Directory.CreateDirectory(strFolderPath);
                // Get the uploaded from the Files collection
                //string[] DocsInFileNames = null;
                if (HttpContext.Current.Request.Files.Count > 0)
                    for (int i = 0; i < HttpContext.Current.Request.Files.Count; i++)
                    {
                        //DocsInFileNames[i] = HttpContext.Current.Request.Files[i].FileName;
                        string _LastModifiedDate = HttpContext.Current.Request.Form["LastModifiedDate"].Split(',')[i];
                        //HttpContext.Current.Request.Files[i].SaveAs(Path.Combine(strFolderPath, HttpContext.Current.Request.Files[i].FileName.Split('.')[0] + " - " + _LastModifiedDate.Replace(":", "") + "." + HttpContext.Current.Request.Files[i].FileName.Split('.')[1]));

                        if (File.Exists(Path.Combine(strFolderPath, HttpContext.Current.Request.Files[i].FileName)))
                        {
                            _ReturnedMessage = "الملف موجود من قبل";
                            COperationsDocuments cOperationsDocuments = new COperationsDocuments();
                            cOperationsDocuments.DeleteList("Where ID  = " + pID);
                        }
                        else
                        {
                            HttpContext.Current.Request.Files[i].SaveAs(Path.Combine(strFolderPath,
                                HttpContext.Current.Request.Files[i].FileName));

                            string Url = HttpContext.Current.Request.Files[i].FileName;
                            string updateClause = "";
                            string updateRequestClause = "";


                            //-----------------------------------------------------------------------------------
                            updateRequestClause += "  ImagePath = N'" + Url + "'";
                            updateRequestClause += " WHERE ID = " + pID;
                            COperationsDocuments cOperationsDocuments = new COperationsDocuments();
                            Exception checkException1 = cOperationsDocuments.UpdateList(updateRequestClause);

                            //-----------------------------------------------------------------------------------
                        }
                    }

                if (Directory.Exists(strFolderPath))
                {
                    //to get filenames on a directory
                    pDocsInFileNames = Directory.GetFiles(strFolderPath);
                    for (int i = 0; i < pDocsInFileNames.Length; i++)
                        pDocsInFileNames[i] = pDocsInFileNames[i].Substring(pDocsInFileNames[i].LastIndexOf('\\') + 1);
                }
            }

            return new Object[] { new JavaScriptSerializer().Serialize(pDocsInFileNames), _ReturnedMessage };
        }

        [System.Web.Http.HttpGet, System.Web.Http.HttpPost]
        public Object[] LoadDeliveryDocuments(string pOperationID, string pWhereCondition)
        {
            var serialize = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };


            CvwOperationsDocuments cvwOperationsDocuments = new CvwOperationsDocuments();
            cvwOperationsDocuments.GetList(" where OperationID = " + pOperationID + "  And IsDeliveredFiles = 1");
            return new Object[]
            {
                serialize.Serialize(cvwOperationsDocuments.lstCVarvwOperationsDocuments), //0
            };
        }
        [System.Web.Http.HttpGet, System.Web.Http.HttpPost]
        public Object[] LoadLists(string pOperationID, string pWhereCondition)
        {
            var serialize = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };

            CvwDocumentsInfo cvwDocumentsInfo = new CvwDocumentsInfo();
            CDocumentsDegrees cDocumentsDegrees = new CDocumentsDegrees();
            CUsers cUsers = new CUsers();


            cvwDocumentsInfo.GetList(pWhereCondition);
            cDocumentsDegrees.GetList(" WHERE 1=1 ");
            cUsers.GetList(" WHERE 1=1 ");
            return new Object[]
            {
                " ",
                serialize.Serialize(cvwDocumentsInfo.lstCVarvwDocumentsInfo), //1
                serialize.Serialize(cDocumentsDegrees.lstCVarDocumentsDegrees), //2
                serialize.Serialize(cUsers.lstCVarUsers), //3
            };
        }

        [System.Web.Http.HttpGet, System.Web.Http.HttpPost]
        public object[] DeleteList(String pDeletedOperationsDocumentsIDs, Int64 pOperationID)
        {


            Documents_DeleteImages(pDeletedOperationsDocumentsIDs, pOperationID);
            string ErrorMessage = "";
            bool _result = false;

            COperationsDocuments cOperationsDocuments = new COperationsDocuments();

            var checkException =
                cOperationsDocuments.DeleteList("WHERE ID IN (" + pDeletedOperationsDocumentsIDs + ")");

            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message
                    .Contains("DELETE")) // some or all of the rows were not deleted due to dependencies
                    _result = false;
            }
            else //deleted successfully
            {
                if (ErrorMessage == "")
                    _result = true;
                else
                    _result = false;
            }


            return new object[]
            {
                _result, ErrorMessage
            };
        }
        [HttpGet, HttpPost]
        public object[] Delivery_DeleteImage(string pID, Int64 pOperationID)
        {
            bool _result = false;
            Exception checkException = null;

            COperationsDocuments cOperationsDocuments = new COperationsDocuments();

            checkException = cOperationsDocuments.GetList("WHERE ID IN (" + pID + ")");

            for (int i = 0; i < cOperationsDocuments.lstCVarOperationsDocuments.Count; i++)
            {
                if (cOperationsDocuments.lstCVarOperationsDocuments[i].ImagePath != null && cOperationsDocuments.lstCVarOperationsDocuments[i].ImagePath != "0")
                {
                    string FilePath = Path.Combine(HttpContext.Current.Server.MapPath("~/DocsInFiles/OperationsDocuments/" + cOperationsDocuments.lstCVarOperationsDocuments[i].OperationID + "/"));

                    if (System.IO.File.Exists(FilePath + cOperationsDocuments.lstCVarOperationsDocuments[i].ImagePath))
                    {
                        System.IO.File.Delete(FilePath + cOperationsDocuments.lstCVarOperationsDocuments[i].ImagePath);

                        string updateClause = "";
                        updateClause += "  ImagePath = NULL ";
                        updateClause += " WHERE ID = " + cOperationsDocuments.lstCVarOperationsDocuments[i].ID.ToString();


                        // COperationsDocuments cOperationsDocuments = new COperationsDocuments();

                        // CA_PaymentRequestDetails cA_PaymentRequestDetails = new CA_PaymentRequestDetails();
                        checkException = cOperationsDocuments.UpdateList(updateClause);
                    }

                }
            }

            if (checkException == null)
                _result = true;


            return new object[] {
                _result //pData[0]
            };
        }
        public object[] Documents_DeleteImages(string pIDs, Int64 pOperationID)
        {
            bool _result = false;
            Exception checkException = null;

            COperationsDocuments cOperationsDocuments = new COperationsDocuments();

            checkException = cOperationsDocuments.GetList("WHERE ID IN (" + pIDs + ")");

            for (int i = 0; i < cOperationsDocuments.lstCVarOperationsDocuments.Count; i++)
            {
                Int32 _RowCount = 0;

                if (cOperationsDocuments.lstCVarOperationsDocuments[i].ImagePath != null && cOperationsDocuments.lstCVarOperationsDocuments[i].ImagePath != "0")
                {
                    string FilePath = Path.Combine(HttpContext.Current.Server.MapPath("~/DocsInFiles/OperationsDocuments/" + cOperationsDocuments.lstCVarOperationsDocuments[i].OperationID + "/"));

                    if (System.IO.File.Exists(FilePath + cOperationsDocuments.lstCVarOperationsDocuments[i].ImagePath))
                    {
                        System.IO.File.Delete(FilePath + cOperationsDocuments.lstCVarOperationsDocuments[i].ImagePath);

                        string updateClause = "";
                        updateClause += "  ImagePath = NULL ";
                        updateClause += " WHERE ID = " + cOperationsDocuments.lstCVarOperationsDocuments[i].ID.ToString();


                        // COperationsDocuments cOperationsDocuments = new COperationsDocuments();

                        // CA_PaymentRequestDetails cA_PaymentRequestDetails = new CA_PaymentRequestDetails();
                        checkException = cOperationsDocuments.UpdateList(updateClause);
                    }

                }




            }

            if (checkException == null)
                _result = true;


            return new object[] {
                _result //pData[0]
            };
        }

    }
}

public class OperationsDeliveryDocumentData
{
    public int pID { get; set; }
    public string pOperationID { get; set; }
    public string pDocumentInfoID { get; set; }
    public string pCreatorUserID { get; set; }
    public string pReceivingDegreeID { get; set; }
    public string pCode { get; set; }
    public string pReceivedDate { get; set; }
    public string pExpirationDate { get; set; }
    public string pRecipient { get; set; }
    public string pNotes { get; set; }
}
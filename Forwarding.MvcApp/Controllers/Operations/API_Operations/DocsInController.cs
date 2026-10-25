using Forwarding.MvcApp.Models.Operations.Operations.Generated;
using Forwarding.MvcApp.Models.Operations.Operations.Generated.Old;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;

namespace Forwarding.MvcApp.Controllers.Operations.API_Operations
{
    public class DocsInController : ApiController
    {
        [HttpPost, HttpGet]
        public object[] GetDocsInNames(Int64 pOperationID) //TODO: handle to get house docs too by MasterOperationID
        {
            int _RowCount = 0;
            Exception ex = null;
            COperations objCOperations = new COperations();
            ex = objCOperations.GetListPaging(1, 1, "WHERE ID=" + pOperationID + " OR MasterOperationID=" + pOperationID, "ID", out _RowCount);

            string[] pDocsInFileNames = null;
            //var strFolderPath = HttpContext.Current.Server.MapPath("~/DocsInFiles/") + objCvwOperations.lstCVarvwOperations[0].Code;
            var strFolderPath = HttpContext.Current.Server.MapPath("~/DocsInFiles/" + objCOperations.lstCVarOperations[0].CreationDate.Year.ToString() + "/") + objCOperations.lstCVarOperations[0].Code;

            //to get filenames on a directory
            if(Directory.Exists(strFolderPath))
                pDocsInFileNames = Directory.GetFiles(strFolderPath);
            if(pDocsInFileNames != null)
            {
                for (int i = 0; i < pDocsInFileNames.Length; i++)
                    pDocsInFileNames[i] = pDocsInFileNames[i].Substring(pDocsInFileNames[i].LastIndexOf('\\') + 1);
            }
            //var filePath = files[0].Substring(0, files[0].LastIndexOf('\\'));
            //var firstFileName = files[0].Substring(files[0].LastIndexOf('/') + 1);

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int16.MaxValue };

            return new Object[] {
                serializer.Serialize(pDocsInFileNames),
                serializer.Serialize(objCOperations.lstCVarOperations)
            };
        }
        [HttpPost]
        public object[] UploadFile() //Multiple Files Upload
        {
            string[] pDocsInFileNames = null; //to hold all the filenames as the return value
            if (HttpContext.Current.Request.Files.AllKeys.Any())
            {
                var pOperationCode = HttpContext.Current.Request.Form["pOperationCode"];
                var pOperationCreationYear = HttpContext.Current.Request.Form["pOperationCreationYear"];
                var strFolderPath = Path.Combine(HttpContext.Current.Server.MapPath("~/DocsInFiles/" + pOperationCreationYear + "/" + pOperationCode));
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
                        HttpContext.Current.Request.Files[i].SaveAs(Path.Combine(strFolderPath, HttpContext.Current.Request.Files[i].FileName));
                    }

                if (Directory.Exists(strFolderPath))
                {
                    //to get filenames on a directory
                    pDocsInFileNames = Directory.GetFiles(strFolderPath);
                    for (int i = 0; i < pDocsInFileNames.Length; i++)
                        pDocsInFileNames[i] = pDocsInFileNames[i].Substring(pDocsInFileNames[i].LastIndexOf('\\') + 1);
                }
            }
            return new Object[] {  new JavaScriptSerializer().Serialize(pDocsInFileNames) };
        } // of fn
        [HttpPost]
        public object[] UploadFile_Payables() //Multiple Files Upload
        {
            string[] pDocsInFileNames = null; //to hold all the filenames as the return value
            if (HttpContext.Current.Request.Files.AllKeys.Any())
            {
                var pOperationCode = HttpContext.Current.Request.Form["pOperationCode"];
                var pOperationCreationYear = HttpContext.Current.Request.Form["pOperationCreationYear"];
                var strFolderPath = Path.Combine(HttpContext.Current.Server.MapPath("~/DocsInFiles/" + pOperationCreationYear + "/" + pOperationCode + "/Payables" ));
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
                        HttpContext.Current.Request.Files[i].SaveAs(Path.Combine(strFolderPath, HttpContext.Current.Request.Files[i].FileName));
                    }

                if (Directory.Exists(strFolderPath))
                {
                    //to get filenames on a directory
                    pDocsInFileNames = Directory.GetFiles(strFolderPath);
                    for (int i = 0; i < pDocsInFileNames.Length; i++)
                        pDocsInFileNames[i] = pDocsInFileNames[i].Substring(pDocsInFileNames[i].LastIndexOf('\\') + 1);
                }
            }
            return new Object[] { new JavaScriptSerializer().Serialize(pDocsInFileNames) };
        } // of fn
        [HttpPost, HttpGet]
        public object[] Delete(string pOperationCreationYear, string pOperationCode, string pFileNames)
        {
            string[] pDocsInFileNames = null; //to hold all the filenames as the return value
            // Get the complete file path
            var strFolderPath = Path.Combine(HttpContext.Current.Server.MapPath("~/DocsInFiles/"+ pOperationCreationYear + "/" + pOperationCode));
            foreach (var currentFileName in pFileNames.Split(','))
            {
                if (File.Exists(Path.Combine(strFolderPath, currentFileName)))
                    File.Delete(Path.Combine(strFolderPath, currentFileName));
            }
            
            if (Directory.Exists(strFolderPath))
            {
                //to get filenames on a directory
                pDocsInFileNames = Directory.GetFiles(strFolderPath);
                for (int i = 0; i < pDocsInFileNames.Length; i++)
                    pDocsInFileNames[i] = pDocsInFileNames[i].Substring(pDocsInFileNames[i].LastIndexOf('\\') + 1);
                //var filePath = files[0].Substring(0, files[0].LastIndexOf('\\'));
                //var firstFileName = files[0].Substring(files[0].LastIndexOf('/') + 1);
            }
            return new Object[] { new JavaScriptSerializer().Serialize(pDocsInFileNames) };
        }

    }
}

using Forwarding.MvcApp.Models.MasterData.Generated.CustomsClearance;
using Forwarding.MvcApp.Models.MasterData.Others.Generated;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Script.Serialization;

namespace Forwarding.MvcApp.Controllers.MasterData.API_Others
{
    public class CustomsItemsController : ApiController
    {
        [HttpGet, HttpPost]
        public Object[] LoadAll(string pWhereClause)
        {
            CNetwork objCNetwork = new CNetwork();
            objCNetwork.GetList(pWhereClause);
            return new Object[] { new JavaScriptSerializer().Serialize(objCNetwork.lstCVarNetwork) };
        }

        [HttpGet, HttpPost]
        public Object[] LoadWithPaging(Int32 pPageNumber, Int32 pPageSize, string pSearchKey)
        {
            CCustomItems objCCustomItems = new CCustomItems();

            pSearchKey = (pSearchKey == null ? "" : pSearchKey.Trim().ToUpper());
            Int32 _RowCount = objCCustomItems.lstCVarCustomItems.Count;
            string whereClause = " Where Code LIKE '%" + pSearchKey + "%' OR  ArDescription LIKE '%" + pSearchKey + "%' OR  EnDescription LIKE '%" + pSearchKey + "%' OR  TariffCode LIKE '%" + pSearchKey + "%' OR  Discount LIKE '%" + pSearchKey + "%' OR  Image LIKE '%" + pSearchKey + "%' ";
            objCCustomItems.GetListPaging(pPageSize, pPageNumber, whereClause, "ID Desc", out _RowCount);
            return new Object[] { new JavaScriptSerializer().Serialize(objCCustomItems.lstCVarCustomItems), _RowCount };
        }
        //[HttpPost]
        //public object[] UploadFile() //Multiple Files Upload
        //{
        //    string[] pDocsInFileNames = null; //to hold all the filenames as the return value
        //    if (HttpContext.Current.Request.Files.AllKeys.Any())
        //    {
        //        var pOperationCode = HttpContext.Current.Request.Form["pOperationCode"];
        //        var pOperationCreationYear = HttpContext.Current.Request.Form["pOperationCreationYear"];
        //        var strFolderPath = Path.Combine(HttpContext.Current.Server.MapPath("~/DocsInFiles/" + pOperationCreationYear + "/" + pOperationCode));
        //        if (!Directory.Exists(strFolderPath))
        //            Directory.CreateDirectory(strFolderPath);
        //        // Get the uploaded from the Files collection
        //        //string[] DocsInFileNames = null;
        //        if (HttpContext.Current.Request.Files.Count > 0)
        //            for (int i = 0; i < HttpContext.Current.Request.Files.Count; i++)
        //            {
        //                //DocsInFileNames[i] = HttpContext.Current.Request.Files[i].FileName;
        //                HttpContext.Current.Request.Files[i].SaveAs(Path.Combine(strFolderPath, HttpContext.Current.Request.Files[i].FileName));
        //            }

        //        if (Directory.Exists(strFolderPath))
        //        {
        //            //to get filenames on a directory
        //            pDocsInFileNames = Directory.GetFiles(strFolderPath);
        //            for (int i = 0; i < pDocsInFileNames.Length; i++)
        //                pDocsInFileNames[i] = pDocsInFileNames[i].Substring(pDocsInFileNames[i].LastIndexOf('\\') + 1);
        //        }
        //    }
        //    return new Object[] { new JavaScriptSerializer().Serialize(pDocsInFileNames) };
        //} // of fn
        [HttpPost]
        public object[] CustomsItems_Insert_Update()//HttpPostedFileBase file, int pID ,string pCode, string pArDescription, string pEnDescription, string pTariffCode, decimal pDiscount)
        {
            int _RowCount = 0;
            bool _result = false;
            CCustomItems objCCustomItems = new CCustomItems();
            CVarCustomItems objCVarCustomItems = new CVarCustomItems();

            string[] pDocsInFileNames = null; //to hold all the filenames as the return value
            //if (HttpContext.Current.Request.Files.AllKeys.Any())
            {
              
                var pID = HttpContext.Current.Request.Form["pID"];
                var pCode = HttpContext.Current.Request.Form["pCode"];
                var pArDescription = HttpContext.Current.Request.Form["pArDescription"];
                var pEnDescription = HttpContext.Current.Request.Form["pEnDescription"];
                var pTariffCode = HttpContext.Current.Request.Form["pTariffCode"];
                var pDiscount = HttpContext.Current.Request.Form["pDiscount"];
                var pFileName = "0";
                CCustomItems CCustomItems_File = new CCustomItems();
                CCustomItems_File.GetList(" Where ID = " + pID);
                if (CCustomItems_File.lstCVarCustomItems.Count > 0)
                {
                    pFileName = HttpContext.Current.Request.Files.Count == 0 ? CCustomItems_File.lstCVarCustomItems[0].Image : HttpContext.Current.Request.Files[0].FileName;
                }
                else
                    pFileName = HttpContext.Current.Request.Files.Count == 0 ? "0" : HttpContext.Current.Request.Files[0].FileName;

                objCVarCustomItems.ID = int.Parse(pID);// pID;
                objCVarCustomItems.Code = pCode; //pCode;
                objCVarCustomItems.ArDescription = pArDescription; //pArDescription;
                objCVarCustomItems.EnDescription = pEnDescription; //pEnDescription;
                objCVarCustomItems.TariffCode = pTariffCode; //pTariffCode;
                objCVarCustomItems.Discount = decimal.Parse(pDiscount); //pDiscount;
                objCVarCustomItems.Image = pFileName;// HttpContext.Current.Request.Files.Count ==0? "0": HttpContext.Current.Request.Files[0].FileName; // " Image ";
                objCCustomItems.lstCVarCustomItems.Add(objCVarCustomItems);
                
                Exception checkException = objCCustomItems.SaveMethod(objCCustomItems.lstCVarCustomItems);
                if (checkException != null) // an exception is caught in the model
                {
                    if (checkException.Message.Contains("UNIQUE"))
                        _result = false;
                }
                else //not unique
                    _result = true;
                objCCustomItems.GetListPaging(10, 1, " Where 1=1", " ID Desc", out _RowCount);

               
                //var pOperationCreationYear = HttpContext.Current.Request.Form["pOperationCreationYear"];
                var strFolderPath = Path.Combine(HttpContext.Current.Server.MapPath("~/Images"));// + pOperationCreationYear + "/" + pOperationCode));
                if (!Directory.Exists(strFolderPath))
                    Directory.CreateDirectory(strFolderPath);
                // Get the uploaded from the Files collection
                //string[] DocsInFileNames = null;
                if (HttpContext.Current.Request.Files.Count > 0)
                    for (int i = 0; i < HttpContext.Current.Request.Files.Count; i++)
                    {
                        //DocsInFileNames[i] = HttpContext.Current.Request.Files[i].FileName;
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
            return new Object[] {
                        _result,
                        _RowCount,
                        new JavaScriptSerializer().Serialize(objCCustomItems.lstCVarCustomItems)
                    };
            //return new Object[] { new JavaScriptSerializer().Serialize(pDocsInFileNames) };
        }
        //[HttpPost]
        //public object[] CustomsItems_Insert_Update()
        //{
        //    //string folderPath = Server.MapPath("~/Content/Images");
        //    //string fileName = formData.pName;
        //    //var ImagePath = Path.Combine(Server.MapPath("~/Content/Images"), ("AspNetUsers_" + "PhotoPath_" + formData.pID + fileName));
        //    //_Object.PhotoPath = ("AspNetUsers_" + "PhotoPath_" + formData.pID + fileName);
        //    //byte[] data = System.Convert.FromBase64String(formData.pData);
        //    //MemoryStream ms = new MemoryStream(data);
        //    //System.Drawing.Image img = System.Drawing.Image.FromStream(ms);
        //    //img.Save(ImagePath);

        //    string[] pDocsInFileNames = null; //to hold all the filenames as the return value
        //    if (HttpContext.Current.Request.Files.AllKeys.Any())
        //    {
        //        //(int pID ,string pCode, string pArDescription, string pEnDescription, string pTariffCode, decimal pDiscount, HttpPostedFileBase file)
        //        var pID = HttpContext.Current.Request.Form["pID"];
        //        var pCode = HttpContext.Current.Request.Form["pCode"];
        //        var pArDescription = HttpContext.Current.Request.Form["pArDescription"];
        //        var pEnDescription = HttpContext.Current.Request.Form["pEnDescription"];
        //        var pTariffCode = HttpContext.Current.Request.Form["pTariffCode"];
        //        var pDiscount = HttpContext.Current.Request.Form["pDiscount"];
        //        var strFolderPath = Path.Combine(HttpContext.Current.Server.MapPath("~/KSAFiles/"));// + pOperationCreationYear + "/" + pOperationCode));
        //        if (!Directory.Exists(strFolderPath))
        //            Directory.CreateDirectory(strFolderPath);
        //        // Get the uploaded from the Files collection
        //        //string[] DocsInFileNames = null;
        //        if (HttpContext.Current.Request.Files.Count > 0)
        //            for (int i = 0; i < HttpContext.Current.Request.Files.Count; i++)
        //            {
        //                //DocsInFileNames[i] = HttpContext.Current.Request.Files[i].FileName;
        //                HttpContext.Current.Request.Files[i].SaveAs(Path.Combine(strFolderPath, HttpContext.Current.Request.Files[i].FileName));
        //            }

        //        if (Directory.Exists(strFolderPath))
        //        {
        //            //to get filenames on a directory
        //            pDocsInFileNames = Directory.GetFiles(strFolderPath);
        //            for (int i = 0; i < pDocsInFileNames.Length; i++)
        //                pDocsInFileNames[i] = pDocsInFileNames[i].Substring(pDocsInFileNames[i].LastIndexOf('\\') + 1);
        //        }
        //    }
        //    return new Object[] { new JavaScriptSerializer().Serialize(pDocsInFileNames) };
        //} 

        //[HttpPost]
        //public object[] CustomsItems_Insert_Update_Backup([FromBody] formData formData)//(int pID ,string pCode, string pArDescription, string pEnDescription, string pTariffCode, decimal pDiscount, HttpPostedFileBase file)
        //{
        //    bool _result = false;
        //    CCustomItems objCCustomItems = new CCustomItems();
        //    CVarCustomItems objCVarCustomItems = new CVarCustomItems();
        //    objCVarCustomItems.ID = formData.pID;// pID;
        //    objCVarCustomItems.Code = formData.pCode; //pCode;
        //    objCVarCustomItems.ArDescription = formData.pArDescription; //pArDescription;
        //    objCVarCustomItems.EnDescription = formData.pEnDescription; //pEnDescription;
        //    objCVarCustomItems.TariffCode = formData.pTariffCode; //pTariffCode;
        //    objCVarCustomItems.Discount = formData.pDiscount; //pDiscount;
        //    objCVarCustomItems.Image = formData.file.FileName; // " Image ";
        //    objCCustomItems.lstCVarCustomItems.Add(objCVarCustomItems);
        //    int _RowCount = 0;
        //    Exception checkException = objCCustomItems.SaveMethod(objCCustomItems.lstCVarCustomItems);
        //    if (checkException != null) // an exception is caught in the model
        //    {
        //        if (checkException.Message.Contains("UNIQUE"))
        //            _result = false;
        //    }
        //    else //not unique
        //        _result = true;
        //    objCCustomItems.GetListPaging(10,1, " Where 1=1", " ID Desc",out _RowCount);

        //    return new Object[] {
        //        _result,
        //        _RowCount,
        //        new JavaScriptSerializer().Serialize(objCCustomItems.lstCVarCustomItems)
        //    };
        //}

        [HttpGet, HttpPost]
        public bool Delete(String pCustomsItemsIDs)
        {
            bool _result = false;
            CNetwork objCNetwork = new CNetwork();
            CCustomItems objCCustomItems = new CCustomItems();
            
            foreach (var currentID in pCustomsItemsIDs.Split(','))
            {
                objCCustomItems.lstDeletedCPKCustomItems.Add(new CPKCustomItems() { ID = Int32.Parse(currentID.Trim()) });
            }

            Exception checkException = objCCustomItems.DeleteItem(objCCustomItems.lstDeletedCPKCustomItems);
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
    
    public class formData
    {
        public int pID { get; set; }
        public string pCode { get; set; }
        public string pArDescription { get; set; }
        public string pEnDescription { get; set; }
        public string pTariffCode { get; set; }
        public Decimal pDiscount { get; set; }
        public string file { get; set; }
    }
    //(int pID,string pCode, string pArDescription, string pEnDescription, string pTariffCode, decimal pDiscount, HttpPostedFileBase file)
}

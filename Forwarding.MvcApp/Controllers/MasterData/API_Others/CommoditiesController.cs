using ExcelDataReader;
using Forwarding.MvcApp.Controllers.MasterData.API_Invoicing;
using Forwarding.MvcApp.Models.MasterData.Invoicing.Generated;
using Forwarding.MvcApp.Models.MasterData.Others.Generated;
using System;
using System.Collections.Generic;
using System.Data;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;

namespace Forwarding.MvcApp.Controllers.MasterData.API_Others
{
    public class CommoditiesController : ApiController
    {

        //[Route("/api/Commodities/LoadAll")]
        [HttpGet, HttpPost]
        //sherif: to be used in select boxes
        public Object[] LoadAll(string pOrderBy)
        {
            CCommodities objCCommodities = new CCommodities();
            objCCommodities.GetList(" order by " + pOrderBy);
            return new Object[] { new JavaScriptSerializer().Serialize(objCCommodities.lstCVarCommodities) };
        }

        // [Route("/api/Commodities/LoadWithPaging/{pPageNumber}/{pPageSize}")]
        [HttpGet, HttpPost]
        public Object[] LoadWithPaging(Int32 pPageNumber, Int32 pPageSize, string pSearchKey)
        {
            CCommodities objCCommodities = new CCommodities();
            //objCCommodities.GetList(string.Empty); //GetList() fn loads without paging

            pSearchKey = (pSearchKey == null ? "" : pSearchKey.Trim().ToUpper());
            Int32 _RowCount = objCCommodities.lstCVarCommodities.Count;
            string whereClause = " Where Code LIKE N'%" + pSearchKey + "%' "
                + " OR Name LIKE N'%" + pSearchKey + "%' "
                + " OR LocalName LIKE N'%" + pSearchKey + "%' ";
            objCCommodities.GetListPaging(pPageSize, pPageNumber, whereClause, "Code", out _RowCount);
            return new Object[] { new JavaScriptSerializer().Serialize(objCCommodities.lstCVarCommodities), _RowCount };
        }

        // [Route("/api/Commodities/Insert/{pCode}/{pName}/{pLocalName}}")]
        [HttpGet, HttpPost]
        public bool Insert(string pCode, string pName, string pLocalName, string pNotes, decimal pIMOClass, Int32 pUNNumber
            , bool pIsInactive, bool pIsIMO , string pCommercialName, string pLoadingTemperature, string pUnloadingTemperature,string pDensity)
        //public bool Insert(String pCode, String pName)
        {
            bool _result = false;

            CVarCommodities objCVarCommodities = new CVarCommodities();

            objCVarCommodities.Code = (pCode == null ? "0" : pCode.Trim().ToUpper());
            objCVarCommodities.Name = pName.ToUpper();
            objCVarCommodities.LocalName = (pLocalName == null ? "0" : pLocalName.ToUpper());
            objCVarCommodities.Notes = (pNotes == null ? "0" : pNotes);
            objCVarCommodities.IMOClass = pIMOClass;
            objCVarCommodities.UNNumber = pUNNumber;
            objCVarCommodities.IsInactive = pIsInactive;
            objCVarCommodities.IsIMO = pIsIMO;
            objCVarCommodities.CommercialName = (pCommercialName == null ? "0": pCommercialName);
            objCVarCommodities.LoadingTemperature = (pLoadingTemperature == null ? "0" : pLoadingTemperature);
            objCVarCommodities.UnloadingTemperature = (pUnloadingTemperature == null ? "0" : pUnloadingTemperature);
            objCVarCommodities.Density = (pDensity == null ? "0" : pDensity);

            objCVarCommodities.TimeLocked = DateTime.Parse("01-01-1900");
            objCVarCommodities.LockingUserID = 0;

            objCVarCommodities.CreatorUserID = objCVarCommodities.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarCommodities.CreationDate = objCVarCommodities.ModificationDate = DateTime.Now;

            CCommodities objCCommodities = new CCommodities();
            objCCommodities.lstCVarCommodities.Add(objCVarCommodities);
            Exception checkException = objCCommodities.SaveMethod(objCCommodities.lstCVarCommodities);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else //not unique
                _result = true;
            return _result;
        }

        // [Route("/api/Commodities/Update/{pCode}/{pName}/{pLocalName}}")]
        [HttpGet, HttpPost]
        public bool Update(Int32 pID, string pCode, string pName, string pLocalName, string pNotes, decimal pIMOClass, Int32 pUNNumber
            , bool pIsInactive, bool pIsIMO, string pCommercialName, string pLoadingTemperature, string pUnloadingTemperature, string pDensity)
        {
            bool _result = false;

            CVarCommodities objCVarCommodities = new CVarCommodities();

            //the next 4 lines to get the CreatorUserID and CreationDate and set them as they were entered before
            CCommodities objCGetCreationInformation = new CCommodities();
            objCGetCreationInformation.GetItem(pID);
            objCVarCommodities.CreatorUserID = objCGetCreationInformation.lstCVarCommodities[0].CreatorUserID;
            objCVarCommodities.CreationDate = objCGetCreationInformation.lstCVarCommodities[0].CreationDate;

            objCVarCommodities.ID = pID;
            objCVarCommodities.Code = (pCode == null ? "0" : pCode.Trim().ToUpper());
            objCVarCommodities.Name = pName.ToUpper();
            objCVarCommodities.LocalName = (pLocalName == null ? "0" : pLocalName.ToUpper());
            objCVarCommodities.Notes = (pNotes == null ? "0" : pNotes);
            objCVarCommodities.IMOClass = pIMOClass;
            objCVarCommodities.UNNumber = pUNNumber;
            objCVarCommodities.IsInactive = pIsInactive;
            objCVarCommodities.IsIMO = pIsIMO;
            

            objCVarCommodities.CommercialName = (pCommercialName == null ? "0" : pCommercialName);
            objCVarCommodities.LoadingTemperature = (pLoadingTemperature == null ? "0" : pLoadingTemperature);
            objCVarCommodities.UnloadingTemperature = (pUnloadingTemperature == null ? "0" : pUnloadingTemperature);
            objCVarCommodities.Density = (pDensity == null ? "0" : pDensity);

            objCVarCommodities.TimeLocked = DateTime.Parse("01-01-1900");
            objCVarCommodities.LockingUserID = 0;

            objCVarCommodities.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarCommodities.ModificationDate = DateTime.Now;

            CCommodities objCCommodities = new CCommodities();
            objCCommodities.lstCVarCommodities.Add(objCVarCommodities);
            Exception checkException = objCCommodities.SaveMethod(objCCommodities.lstCVarCommodities);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else //not unique
                _result = true;
            return _result;
        }

        //// [Route("/api/Commodities/DeleteByID/{pID}")]
        //[HttpGet, HttpPost]
        //public void DeleteByID(Int32 pID)
        //{
        //    CCommodities objCCommodities = new CCommodities();
        //    objCCommodities.lstDeletedCPKCommodities.Add(new CPKCommodities() { ID = pID });
        //    objCCommodities.DeleteItem(objCCommodities.lstDeletedCPKCommodities);
        //}

        // [Route("/api/Commodities/Delete/{pCommoditiesIDs}")]
        [HttpGet, HttpPost]
        public bool Delete(String pCommoditiesIDs)
        {
            bool _result = false;
            CCommodities objCCommodities = new CCommodities();
            foreach (var currentID in pCommoditiesIDs.Split(','))
            {
                objCCommodities.lstDeletedCPKCommodities.Add(new CPKCommodities() { ID = Int32.Parse(currentID.Trim()) });
            }

            Exception checkException = objCCommodities.DeleteItem(objCCommodities.lstDeletedCPKCommodities);
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
        public object[] InsertFromOperations(string pCodeFromOperations, string pNameFromOperations, string pLocalNameFromOperations)
        {
            string _MessageReturned = "";

            CVarCommodities objCVarCommodities = new CVarCommodities();
            CCommodities objCCommodities = new CCommodities();
            objCVarCommodities.Code = pCodeFromOperations.ToUpper();
            objCVarCommodities.Name = pNameFromOperations.ToUpper();
            objCVarCommodities.LocalName = (pLocalNameFromOperations == null ? "" : pLocalNameFromOperations.ToUpper());
            objCVarCommodities.Notes = "";
            objCVarCommodities.IMOClass = 0;
            objCVarCommodities.UNNumber = 0;
            objCVarCommodities.IsInactive = false;
            objCVarCommodities.IsIMO = false;

            objCVarCommodities.CommercialName = "0";
            objCVarCommodities.LoadingTemperature = "0";
            objCVarCommodities.UnloadingTemperature = "0";
            objCVarCommodities.Density = "0";

            objCVarCommodities.TimeLocked = DateTime.Parse("01-01-1900");
            objCVarCommodities.LockingUserID = 0;

            objCVarCommodities.CreatorUserID = objCVarCommodities.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarCommodities.CreationDate = objCVarCommodities.ModificationDate = DateTime.Now;

            objCCommodities.lstCVarCommodities.Add(objCVarCommodities);
            Exception checkException = objCCommodities.SaveMethod(objCCommodities.lstCVarCommodities);
            if (checkException == null) //get returned data
            {
                objCCommodities.GetList("WHERE IsInactive=0 ORDER BY Name");
            }
            else
                _MessageReturned = checkException.Message;
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                _MessageReturned
                , _MessageReturned == "" ? objCVarCommodities.ID : 0 //pInsertedID = pData[1]
                , _MessageReturned == "" ? serializer.Serialize(objCCommodities.lstCVarCommodities) : null //pCommodities = pData[2]
            };
        }
        [HttpPost]
        public object UploadExcel()
        {
            int _rowCount = 0;
            int resultCode = 1;
            string exception = "";
            bool AllExcelRowsAreValid = true;
            List<string> MissingFields = new List<string>();
            string ExistedName = "";
            try
            {
                if (HttpContext.Current.Request.Files.AllKeys.Any())
                {
                    // Get the uploaded file from the Files collection
                    var httpPostedFile = HttpContext.Current.Request.Files[0];

                    if (httpPostedFile != null)
                    {
                        Stream stream = httpPostedFile.InputStream;
                        IExcelDataReader reader = null;
                        if (httpPostedFile.FileName.EndsWith(".xls"))
                        {
                            reader = ExcelReaderFactory.CreateBinaryReader(stream);
                        }
                        else if (httpPostedFile.FileName.EndsWith(".xlsx"))
                        {
                            reader = ExcelReaderFactory.CreateOpenXmlReader(stream);
                        }
                        else
                        {
                            ModelState.AddModelError("File", "This file format is not supported");
                        }
                        DataSet result = reader.AsDataSet(new ExcelDataSetConfiguration()
                        {
                            ConfigureDataTable = (_) => new ExcelDataTableConfiguration()
                            {
                                UseHeaderRow = true
                            }
                        });
                        CCommodities objCCommodities = new CCommodities();
                        objCCommodities.GetListPaging(9999, 1, "WHERE 1=1", "ID", out _rowCount);
                        List<PurchaseItemExcelRow> ExcelRowsToBeInserted = new List<PurchaseItemExcelRow>();
                        int count = 1;
                        foreach (DataRow row in result.Tables[0].Rows)
                        {
                            PurchaseItemExcelRow purchaseItemExcelRow = new PurchaseItemExcelRow
                            {
                                pIndex = count,
                                pName = row["Name"] == DBNull.Value ? "" : Convert.ToString(row["Name"]),
                                pCode = row["Code"] == DBNull.Value ? "" : Convert.ToString(row["Code"])
                            };
                            count++;
                            var ValidationCheck = CheckExcelRowValidation(purchaseItemExcelRow, objCCommodities) as ReturnedObjectAfterValidation;
                            ExcelRowsToBeInserted.Add(purchaseItemExcelRow);
                            if (ValidationCheck.MissingFields != "")
                                MissingFields.Add(ValidationCheck.MissingFields);
                            if (ValidationCheck.ExistedName != "")
                                ExistedName =  ValidationCheck.ExistedName;
                            if (!ValidationCheck.IsValid)
                            {
                                AllExcelRowsAreValid = false;
                                break;
                            }
                        }

                        if (AllExcelRowsAreValid)
                        {
                            foreach (PurchaseItemExcelRow row in ExcelRowsToBeInserted)
                            {
                                Exception ex = objCCommodities.SaveMethod(new List<CVarCommodities>
                                {
                                    new CVarCommodities
                                    {
                                        Code = row.pCode,
                                        Name = row.pName,
                                        LocalName = row.pName,
                                        Notes = "0",
                                        IsInactive = false,
                                        CreatorUserID = WebSecurity.CurrentUserId,
                                        CreationDate = DateTime.Now,
                                        ModificatorUserID = WebSecurity.CurrentUserId,
                                        ModificationDate = DateTime.Now,
                                        LockingUserID = 0,
                                        TimeLocked = DateTime.ParseExact("01/01/1900" + " 00:00:00.000", "MM/dd/yyyy HH:mm:ss.fff",             CultureInfo.InvariantCulture),
                                        IsIMO = false,
                                        IMOClass = 0m,
                                        UNNumber = 0,
                                        CommercialName = "0",
                                        LoadingTemperature = "0",
                                        UnloadingTemperature = "0",
                                        Density = "0"
                                    }
                                });
                            }
                        }
                        else
                            resultCode = 0;
                    }
                }
            }
            catch (Exception ex)
            {
                exception = ex.Message;
                resultCode = 0;
            }
            return new
            {
                resultCode,
                MissingFields = MissingFields.Count > 0 ? string.Join(",", MissingFields) : "",
                ExistedName = ExistedName,
                exception
            };
        }
        private object CheckExcelRowValidation(PurchaseItemExcelRow row, CCommodities Commodity)
        {
            List<string> MissingFields = new List<string>();
            string ExistedName = "";
            ReturnedObjectAfterValidation obj = new ReturnedObjectAfterValidation();

            //Mandatory fields check (Name)
            if (row.pName == "")
            {
                MissingFields.Add("Name");
                obj.IsValid = false;
            }
            else if(Commodity.lstCVarCommodities.FirstOrDefault(x => x.Name == row.pName)?.ID != null)
            {
                ExistedName = row.pName;
                obj.IsValid = false;
            }


            obj.MissingFields = MissingFields.Count == 0 ? "" : $"Row {row.pIndex} missing {string.Join(",", MissingFields)}";
            obj.ExistedName = ExistedName == "" ? "" : $"Commodity with a name {ExistedName} already exists";

            return obj;
        }

    }

    class ReturnedObjectAfterValidation
    {
        public bool IsValid { get; set; } = true;
        public string MissingFields { get; set; } = "";
        public string ExistedName { get; set; } = "";
    }
    public class CommodityExcelRow
    {
        public int pIndex { get; set; }
        public string pCode { get; set; }
        public string pName { get; set; }
    }
}

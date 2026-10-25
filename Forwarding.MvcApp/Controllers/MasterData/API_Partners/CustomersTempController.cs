//PartnerTypeID for CUSTOMERS is 1
//PartnerTypeID for AGENTS is 2
//PartnerTypeID for SHIPPING AGENTS is 3
//PartnerTypeID for CUSTOMS CLEARANCE AGENTS is 4
//PartnerTypeID for SHIPPINGLINES is 5
//PartnerTypeID for AIRLINES is 6
//PartnerTypeID for TRUCKERS is 7
//PartnerTypeID for SUPPLIERS is 8
using Forwarding.MvcApp.Models.Administration.Settings.Generated;
using Forwarding.MvcApp.Models.MasterData.Partners.Generated;
using System;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;

namespace Forwarding.MvcApp.Controllers.MasterData.API_Partners
{
    public class CustomersTempController : ApiController
    {
        [HttpGet, HttpPost]
        public Object[] LoadAll(string pWhereClause)
        {
            CCustomersTemp objCCustomersTemp = new CCustomersTemp();
            objCCustomersTemp.GetList(pWhereClause);
            return new Object[] { new JavaScriptSerializer().Serialize(objCCustomersTemp.lstCVarCustomersTemp) };
        }

        [HttpGet, HttpPost]
        public Object[] LoadAllForCombo(string pWhereClauseForCombo)
        {
            Exception checkException = null;
            CvwCustomersTemp objCCustomersTemp = new CvwCustomersTemp();
            checkException = objCCustomersTemp.GetList(pWhereClauseForCombo);
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[] { serializer.Serialize(objCCustomersTemp.lstCVarvwCustomersTemp) };
        }

        [HttpGet, HttpPost]
        public Object[] LoadWithPaging(Int32 pPageNumber, Int32 pPageSize, string pSearchKey)
        {
            CvwCustomersTemp objCvwCustomersTemp = new CvwCustomersTemp();
            //objCvwCustomersTemp.GetList(string.Empty);
            Int32 _RowCount = 0;// objCvwCustomersTemp.lstCVarvwCustomersTemp.Count;

            pSearchKey = (pSearchKey == null ? "" : pSearchKey.Trim().ToUpper());
            string whereClause = " Where Code LIKE N'%" + pSearchKey + "%' "
                + " OR Name LIKE N'%" + pSearchKey + "%' "
                + " OR LocalName LIKE N'%" + pSearchKey + "%' ";
            //+ " OR ISOCode LIKE '%" + pSearchKey + "%' "
            //+ " OR PrintAs LIKE '%" + pSearchKey + "%' "
            //+ " OR CSizeCode LIKE '%" + pSearchKey + "%' "
            //+ " OR CTypeCode LIKE '%" + pSearchKey + "%' ";

            objCvwCustomersTemp.GetListPaging(pPageSize, pPageNumber, whereClause, " Code ", out _RowCount);

            return new Object[] { new JavaScriptSerializer().Serialize(objCvwCustomersTemp.lstCVarvwCustomersTemp), _RowCount };
        }

        [HttpGet, HttpPost]
        public bool Insert(Int32 pCode, string pName
            , string pLocalName, string pEmail, bool pIsInactive, string pNotes, string pAddress
            , string pPhonesAndFaxes, string pVATNumber, string pIBANNumber, bool pIsDeleted = false)
        {
            bool _result = false;
            CVarCustomersTemp objCVarCustomersTemp = new CVarCustomersTemp();
            
            objCVarCustomersTemp.Code = pCode;
            objCVarCustomersTemp.Name = pName.Trim().ToUpper();
            objCVarCustomersTemp.LocalName = (pLocalName == null ? "" : pLocalName.Trim().ToUpper());
            objCVarCustomersTemp.Email = (pEmail == null ? "" : pEmail.Trim().ToUpper());
            objCVarCustomersTemp.IsInactive = pIsInactive;
            objCVarCustomersTemp.IsDeleted = pIsDeleted;
            objCVarCustomersTemp.Notes = (pNotes == null ? "" : pNotes.Trim().ToUpper());
            objCVarCustomersTemp.Address = (pAddress == null ? "" : pAddress.Trim().ToUpper());
            objCVarCustomersTemp.PhonesAndFaxes = (pPhonesAndFaxes == null ? "" : pPhonesAndFaxes.Trim().ToUpper());
            objCVarCustomersTemp.VATNumber = (pVATNumber == null ? "" : pVATNumber.Trim().ToUpper());
            
            objCVarCustomersTemp.IBANNumber = (pIBANNumber == null ? "" : pIBANNumber.Trim().ToUpper());
            
            objCVarCustomersTemp.TimeLocked = DateTime.Parse("01-01-1900");
            objCVarCustomersTemp.LockingUserID = 0;

            objCVarCustomersTemp.CreatorUserID = objCVarCustomersTemp.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarCustomersTemp.CreationDate = objCVarCustomersTemp.ModificationDate = DateTime.Now;

            CCustomersTemp objCCustomersTemp = new CCustomersTemp();
            objCCustomersTemp.lstCVarCustomersTemp.Add(objCVarCustomersTemp);
            Exception checkException = objCCustomersTemp.SaveMethod(objCCustomersTemp.lstCVarCustomersTemp);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else
            { //not unique
                _result = true;
            }
            
            return _result;
        }

        // [Route("/api/CustomersTemp/Update/{pID}/{pCode}/{pName}/{pLocalName}")]
        [HttpGet, HttpPost]
        public bool Update(Int32 pID, Int32 pCode, string pName, string pLocalName, string pEmail, bool pIsInactive, string pNotes, string pAddress, string pPhonesAndFaxes, string pVATNumber
            , string pIBANNumber, bool pIsDeleted = false)
        {
            bool _result = false;
            CVarCustomersTemp objCVarCustomersTemp = new CVarCustomersTemp();

            //the next 4 lines to get the CreatorUserID and CreationDate and set them as they were entered before
            CCustomersTemp objCGetCreationInformation = new CCustomersTemp();
            objCGetCreationInformation.GetItem(pID);
            objCVarCustomersTemp.CreatorUserID = objCGetCreationInformation.lstCVarCustomersTemp[0].CreatorUserID;
            objCVarCustomersTemp.CreationDate = objCGetCreationInformation.lstCVarCustomersTemp[0].CreationDate;
            
            objCVarCustomersTemp.ID = pID;
            
            objCVarCustomersTemp.Code = pCode;
            objCVarCustomersTemp.Name = pName.Trim().ToUpper();
            objCVarCustomersTemp.LocalName = (pLocalName == null ? "" : pLocalName.Trim().ToUpper());
            objCVarCustomersTemp.Email = (pEmail == null ? "" : pEmail.Trim().ToUpper());
            objCVarCustomersTemp.IsInactive = pIsInactive;
            objCVarCustomersTemp.IsDeleted = pIsDeleted;
            objCVarCustomersTemp.Notes = (pNotes == null ? "" : pNotes.Trim().ToUpper());
            objCVarCustomersTemp.Address = (pAddress == null ? "" : pAddress.Trim().ToUpper());
            objCVarCustomersTemp.PhonesAndFaxes = (pPhonesAndFaxes == null ? "" : pPhonesAndFaxes.Trim().ToUpper());
            objCVarCustomersTemp.VATNumber = (pVATNumber == null ? "" : pVATNumber.Trim().ToUpper());
            objCVarCustomersTemp.IBANNumber = (pIBANNumber == null ? "" : pIBANNumber.Trim().ToUpper());

            objCVarCustomersTemp.TimeLocked = DateTime.Parse("01-01-1900");
            objCVarCustomersTemp.LockingUserID = 0;

            objCVarCustomersTemp.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarCustomersTemp.ModificationDate = DateTime.Now;

            CCustomersTemp objCCustomersTemp = new CCustomersTemp();
            objCCustomersTemp.lstCVarCustomersTemp.Add(objCVarCustomersTemp);
            Exception checkException = objCCustomersTemp.SaveMethod(objCCustomersTemp.lstCVarCustomersTemp);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            { //not unique
                _result = true;
            }
            
            return _result;
        }
        
        // [Route("api/CustomersTemp/Delete/{pCustomersTempIDs}")]
        [HttpGet, HttpPost]
        public bool Delete(String pCustomersTempIDs)
        {
            bool _result = false;
            CCustomersTemp objCCustomersTemp = new CCustomersTemp();
            Exception checkException = null;
            int _RowCount = 0;
            CvwDefaults objCvwDefaults = new CvwDefaults();
            objCvwDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount);
            string CompanyName = objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName;
            

            foreach (var currentID in pCustomersTempIDs.Split(','))
            {
                objCCustomersTemp.lstDeletedCPKCustomersTemp.Add(new CPKCustomersTemp() { ID = Int32.Parse(currentID.Trim()) });
            }

             checkException = objCCustomersTemp.DeleteItem(objCCustomersTemp.lstDeletedCPKCustomersTemp);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("DELETE")) // some or all of the rows were not deleted due to dependencies
                    _result = false;
            }
            else //deleted successfully and no dependencies, so set is deleted in addresses and contacts to 1 by a trigger
                _result = true;
            return _result;
        }

        [HttpGet, HttpPost]
        public object[] InsertListFromExcel_CustomersTemp([FromBody] InsertListFromExcel_CustomersTemp InsertListFromExcel_CustomersTemp)
        {
            string pReturnedMessage = "";
            bool _result = true;
            Exception checkException = null;
            int _RowCount = 0;
            int _NumberOfRows = InsertListFromExcel_CustomersTemp.pNameList.Split(',').Length;
            CvwCustomersTemp objCvwCustomersTemp = new CvwCustomersTemp();
            var _ArrName = InsertListFromExcel_CustomersTemp.pNameList.Split(',');
            var _ArrLocalName = InsertListFromExcel_CustomersTemp.pLocalNameList.Split(',');
            var _ArrAddress = InsertListFromExcel_CustomersTemp.pAddressList.Split(',');
            var _ArrEmail = InsertListFromExcel_CustomersTemp.pEmailList.Split(',');
            var _ArrPhonesAndFaxes = InsertListFromExcel_CustomersTemp.pPhonesAndFaxesList.Split(',');
            var _ArrVATNumber = InsertListFromExcel_CustomersTemp.pVATNumberList.Split(',');
            var _ArrCommercialRegistration = InsertListFromExcel_CustomersTemp.pCommercialRegistrationList.Split(',');
            var _ArrCompany = InsertListFromExcel_CustomersTemp.pCompanyList.Split(',');

            bool IsCompanyColumnValid = true;
            CDefaults Defaults = new CDefaults();
            int RowCount;
            Defaults.GetListPaging(1, 1, " WHERE 1=1 ", " ID ", out RowCount);
            string UnEditableCompanyName = Defaults.lstCVarDefaults[0].UnEditableCompanyName;
            if (UnEditableCompanyName == "TOP")
            {
                for (int i = 0; i < _ArrCompany.Length; i++)
                {
                    if (_ArrCompany[i].ToUpper() != "ALT" && _ArrCompany[i].ToUpper() != "EUR" && _ArrCompany[i].ToUpper() != "MES" && _ArrCompany[i].ToUpper() != "GLO" && _ArrCompany[i].ToUpper() != "SAC")
                    {
                        IsCompanyColumnValid = false;
                    }
                }
            }

            //if (IsCompanyColumnValid)
            //{
            for (int i = 0; i < _NumberOfRows; i++)
            {
                CVarCustomersTemp objCVarCustomersTemp = new CVarCustomersTemp();
                //objCVarCustomersTemp.TareWeight = decimal.Parse(_ArrTareWeight[i]);

                objCVarCustomersTemp.Code = 0;
                objCVarCustomersTemp.Name = _ArrName[i];
                objCVarCustomersTemp.LocalName = _ArrLocalName[i];
                objCVarCustomersTemp.Email = _ArrEmail[i];
                objCVarCustomersTemp.IsInactive = false;
                objCVarCustomersTemp.IsDeleted = false;
                objCVarCustomersTemp.Notes = "";
                objCVarCustomersTemp.Address = _ArrAddress[i];
                objCVarCustomersTemp.PhonesAndFaxes = _ArrPhonesAndFaxes[i];
                objCVarCustomersTemp.VATNumber = _ArrVATNumber[i];
                objCVarCustomersTemp.IBANNumber = _ArrCommercialRegistration[i];

                objCVarCustomersTemp.TimeLocked = DateTime.Parse("01-01-1900");
                objCVarCustomersTemp.LockingUserID = 0;

                objCVarCustomersTemp.CreatorUserID = objCVarCustomersTemp.ModificatorUserID = WebSecurity.CurrentUserId;
                objCVarCustomersTemp.CreationDate = objCVarCustomersTemp.ModificationDate = DateTime.Now;


                //if (UnEditableCompanyName == "TOP")
                //{
                //    switch (_ArrCompany[i].ToUpper())
                //    {
                //        case "ALT":
                //            var objCCustomersTemp_ALT = new Models.MasterData.Partners.Customized.CCustomersTemp_DynamicConnection(Helpers.Companies.InternalCompanies.Altun);
                //            objCCustomersTemp_ALT.lstCVarCustomersTemp.Add(objCVarCustomersTemp);
                //            checkException = objCCustomersTemp_ALT.SaveMethod(objCCustomersTemp_ALT.lstCVarCustomersTemp);
                //            break;
                //        case "EUR":
                //            var objCCustomersTemp_EUR = new Models.MasterData.Partners.Customized.CCustomersTemp_DynamicConnection(Helpers.Companies.InternalCompanies.EUROShipping);
                //            objCCustomersTemp_EUR.lstCVarCustomersTemp.Add(objCVarCustomersTemp);
                //            checkException = objCCustomersTemp_EUR.SaveMethod(objCCustomersTemp_EUR.lstCVarCustomersTemp);
                //            break;
                //        case "MES":
                //            var objCCustomersTemp_MES = new Models.MasterData.Partners.Customized.CCustomersTemp_DynamicConnection(Helpers.Companies.InternalCompanies.MESCO);
                //            objCCustomersTemp_MES.lstCVarCustomersTemp.Add(objCVarCustomersTemp);
                //            checkException = objCCustomersTemp_MES.SaveMethod(objCCustomersTemp_MES.lstCVarCustomersTemp);
                //            break;
                //        case "GLO":
                //            var objCCustomersTemp_GLO = new Models.MasterData.Partners.Customized.CCustomersTemp_DynamicConnection(Helpers.Companies.InternalCompanies.GlobeLink);
                //            objCCustomersTemp_GLO.lstCVarCustomersTemp.Add(objCVarCustomersTemp);
                //            checkException = objCCustomersTemp_GLO.SaveMethod(objCCustomersTemp_GLO.lstCVarCustomersTemp);
                //            break;
                //        case "SAC":
                //            var objCCustomersTemp_SAC = new Models.MasterData.Partners.Customized.CCustomersTemp_DynamicConnection(Helpers.Companies.InternalCompanies.SACO);
                //            objCCustomersTemp_SAC.lstCVarCustomersTemp.Add(objCVarCustomersTemp);
                //            checkException = objCCustomersTemp_SAC.SaveMethod(objCCustomersTemp_SAC.lstCVarCustomersTemp);
                //            break;
                //        default:
                //            pReturnedMessage = "Company Column is not valid";
                //            break;

                //    }



                //}
                //else
                //{
                CCustomersTemp objCCustomersTemp = new CCustomersTemp();
                objCCustomersTemp.lstCVarCustomersTemp.Add(objCVarCustomersTemp);
                checkException = objCCustomersTemp.SaveMethod(objCCustomersTemp.lstCVarCustomersTemp);
                //}

                //if (checkException != null)
                //{
                //    pReturnedMessage += "Row " + (i + 1) + " - " + checkException.Message + " \n";
                //}

            }
            //}
            //else
            //{
            //    pReturnedMessage = "Company Column is not valid";
            //}






            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                pReturnedMessage
            };


        }


        #region OperatorTankCharge
        [HttpGet, HttpPost]
        public object[] OperatorTankCharge_LoadAll(string pWhereClauseOperatorTankCharge)
        {
            Exception checkException = null;
            CvwOperatorTankCharge objCvwOperatorTankCharge = new CvwOperatorTankCharge();
            checkException = objCvwOperatorTankCharge.GetList(pWhereClauseOperatorTankCharge);
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                serializer.Serialize(objCvwOperatorTankCharge.lstCVarvwOperatorTankCharge)
            };
        }
        [HttpGet, HttpPost]
        public object[] OperatorTankCharge_Save(Int32 pOperatorTankChargeID, Int32 pCustomerID, Int32 pAgentID
            , Int32 pChargeTypeID, decimal pCostPrice, Int32 pCostCurrencyID, decimal pSalePrice, Int32 pSaleCurrencyID
            , bool pIsImport, bool pIsExport, bool pIsDomestic, bool pIsCrossBooking, bool pIsReExport, bool pIsLoaded, string pNotes)
        {
            string _MessageReturned = "";
            Exception checkException = null;
            COperatorTankCharge objCOperatorTankCharge = new COperatorTankCharge();
            CVarOperatorTankCharge objCVarOperatorTankCharge = new CVarOperatorTankCharge();

            objCVarOperatorTankCharge.ID = pOperatorTankChargeID;
            objCVarOperatorTankCharge.CustomerID = pCustomerID;
            objCVarOperatorTankCharge.AgentID = pAgentID;
            objCVarOperatorTankCharge.ChargeTypeID = pChargeTypeID;
            objCVarOperatorTankCharge.CostPrice = pCostPrice;
            objCVarOperatorTankCharge.CostCurrencyID = pCostCurrencyID;
            objCVarOperatorTankCharge.SalePrice = pSalePrice;
            objCVarOperatorTankCharge.SaleCurrencyID = pSaleCurrencyID;
            objCVarOperatorTankCharge.IsImport = pIsImport;
            objCVarOperatorTankCharge.IsExport = pIsExport;
            objCVarOperatorTankCharge.IsDomestic = pIsDomestic;
            objCVarOperatorTankCharge.IsCrossBooking = pIsCrossBooking;
            objCVarOperatorTankCharge.IsReExport = pIsReExport;
            objCVarOperatorTankCharge.IsLoaded = pIsLoaded;
            objCVarOperatorTankCharge.Notes = pNotes;
            objCVarOperatorTankCharge.ModificatorUserID = WebSecurity.CurrentUserId;
            objCOperatorTankCharge.lstCVarOperatorTankCharge.Add(objCVarOperatorTankCharge);
            checkException = objCOperatorTankCharge.SaveMethod(objCOperatorTankCharge.lstCVarOperatorTankCharge);
            if (checkException != null)
                _MessageReturned = checkException.Message;
            CvwOperatorTankCharge objCvwOperatorTankCharge = new CvwOperatorTankCharge();
            objCvwOperatorTankCharge.GetList("WHERE AgentID=" + pAgentID + " ORDER BY ChargeTypeName");
            return new object[] {
                _MessageReturned
                , new JavaScriptSerializer().Serialize(objCvwOperatorTankCharge.lstCVarvwOperatorTankCharge)
            };
        }

        [HttpGet, HttpPost]
        public object[] OperatorTankCharge_DeleteList(string pDeletedOperatorTankChargeIDs, Int32 pAgentID)
        {
            COperatorTankCharge objCOperatorTankCharge = new COperatorTankCharge();
            CvwOperatorTankCharge objCvwOperatorTankCharge = new CvwOperatorTankCharge();
            Exception checkException = new Exception();
            checkException = objCOperatorTankCharge.DeleteList("WHERE ID IN (" + pDeletedOperatorTankChargeIDs + ")");
            checkException = objCvwOperatorTankCharge.GetList("WHERE AgentID=" + pAgentID + " ORDER BY ChargeTypeName");
            return new object[] {
                new JavaScriptSerializer().Serialize(objCvwOperatorTankCharge.lstCVarvwOperatorTankCharge)
            };
        }
        #endregion OperatorTankCharge

    }

    public class InsertListFromExcel_CustomersTemp
    {
        public string pNameList { get; set; }
        public string pLocalNameList { get; set; }
        public string pAddressList { get; set; }
        public string pEmailList { get; set; }
        public string pPhonesAndFaxesList { get; set; }
        public string pVATNumberList { get; set; }
        public string pCommercialRegistrationList { get; set; }
        public string pCompanyList { get; set; }
    }
}

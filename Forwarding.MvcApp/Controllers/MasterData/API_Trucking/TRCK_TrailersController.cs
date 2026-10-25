using Forwarding.MvcApp.Models.Accounting.MasterData.Customized;
using Forwarding.MvcApp.Models.Accounting.MasterData.Generated;

using Forwarding.MvcApp.Models.Administration.Security.Generated;
using Forwarding.MvcApp.Models.Customized;
using Forwarding.MvcApp.Models.MasterData.Trucking.Generated;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;

namespace Forwarding.MvcApp.Controllers.MasterData.API_Partners
{
    public class TRCK_TrailersController : ApiController
    {
        //[Route("/api/TRCK_Trailers/LoadAll")]
        [HttpGet, HttpPost]
        public Object[] LoadAll(string pOrderBy)
        {
            CTRCK_Trailers objCTRCK_Trailers = new CTRCK_Trailers();
            objCTRCK_Trailers.GetList(" order by " + pOrderBy);
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[] { serializer.Serialize(objCTRCK_Trailers.lstCVarTRCK_Trailers) };
        }

        // [Route("/api/TRCK_Trailers/LoadWithPaging/{pPageNumber}/{pPageSize}")]
        //sherif: here i am getting from a view
        [HttpGet, HttpPost]
        public Object[] LoadWithPaging(Int32 pPageNumber, Int32 pPageSize, string pSearchKey)
        {
            CTRCK_Trailers objCTRCK_Trailers = new CTRCK_Trailers();
            //objCTRCK_Trailers.GetList(string.Empty);
            Int32 _RowCount = 0;// objCTRCK_Trailers.lstCVarTRCK_Trailers.Count;

            //to get the user roleID to show all TRCK_Trailers incase of manager or administrator roles
            // i am sure i ll get only 1 row coz i used ID
            CvwUsers objCUsers = new CvwUsers();
            objCUsers.GetList(" WHERE ID = " + WebSecurity.CurrentUserId.ToString());

            pSearchKey = (pSearchKey == null ? "" : pSearchKey.Trim().ToUpper());
            string whereClause = " Where (Code LIKE N'%" + pSearchKey + "%' "
                + " OR Name LIKE N'%" + pSearchKey + "%' "
                + " OR LocalName LIKE N'%" + pSearchKey + "%') ";
           
            objCTRCK_Trailers.GetListPaging(pPageSize, pPageNumber, whereClause, " Code ", out _RowCount);

            return new Object[] { new JavaScriptSerializer().Serialize(objCTRCK_Trailers.lstCVarTRCK_Trailers), _RowCount };
        }

        [HttpGet, HttpPost]
        public Object[] LoadWithPagingWithWhereClause(Int32 pPageNumber, Int32 pPageSize, string pWhereClause)
        {
            CTRCK_Trailers objCTRCK_Trailers = new CTRCK_Trailers();

            Int32 _RowCount = 0;

            objCTRCK_Trailers.GetListPaging(pPageSize, pPageNumber, pWhereClause, " Code ", out _RowCount);
           
            return new Object[] { new JavaScriptSerializer().Serialize(objCTRCK_Trailers.lstCVarTRCK_Trailers), _RowCount };
        }

        [HttpGet, HttpPost]
        public Object[] LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned(Int32 pPageNumber, Int32 pPageSize, string pWhereClause, string pOrderBy)
        {
            Int32 _RowCount = 0;
            Exception checkException = null;

            CTRCK_Trailers objCTRCK_Trailers = new CTRCK_Trailers();
            checkException = objCTRCK_Trailers.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);
            var pTrailerList = objCTRCK_Trailers.lstCVarTRCK_Trailers
                .Select(s => new
                {
                    Number = s.Name
                    ,
                    LicenseExpirationDate = s.LicenseNumberExpireDate.ToString("dd/MM/yyyy")
                    ,
                    LicenseExpirationDays = (s.LicenseNumberExpireDate - DateTime.Now.Date).Days
                    ,
                    LicenseTaxEndDate = s.TaxEndDate.ToString("dd/MM/yyyy")
                })
                .ToList()
                .OrderBy(o => o.LicenseExpirationDays);
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[] {
                serializer.Serialize(pTrailerList)
         };
        }

        // [Route("/api/TRCK_Trailers/Insert/{pCode}/{pModificatorUser}/{pLocalName}}")]
        [HttpGet, HttpPost]
        public bool Insert( string pCode, string pName, string pLocalName, string pOriginCountryID, DateTime pManufacturDate, string pPlateNo, string pChassisNo 
            , string pLicenseNumber, DateTime pLicenseNumberExpireDate, string pColor,  string pLength, string pWidth, string pHeight, string pGrossWeight, string pAllowedWeight
            , string pNoOfPrimaryWheels, string pNoOfAdditionalWheels, string pAxeCount, DateTime pExaminationExpireDate
            , DateTime pInsuranceDate, DateTime pWorkingDate, string pInsuranceBill, string pInsuranceCompanyID
            , DateTime pTaxEndDate, string pEquipmentModelID, string pServiceCenterID
            , string pInsuranceValue, string pNotes, string pIsInactive, string pAccountID, string pSubAccountID, string pCostCenterID, string pSubAccountGroupID
            , decimal pNumberOfChambers, decimal pChambersVolumeInLiters, decimal pTankerEmptyWeight, int pOutlet, Boolean pIsHeating, Boolean pIsHeatable
            , Boolean pIsEpump, Boolean pIsCompressor, Boolean pIsGroundOperated, Boolean pIsATP
            , string pModel, string pWheelSize)
        {
            bool _result = false;
            CVarTRCK_Trailers objCVarTRCK_Trailers = new CVarTRCK_Trailers();


            objCVarTRCK_Trailers.Code = int.Parse(pCode);
            objCVarTRCK_Trailers.Name = pName.Trim().ToUpper();
            objCVarTRCK_Trailers.LocalName = (pLocalName == null ? "" : pLocalName.Trim().ToUpper());
            objCVarTRCK_Trailers.OriginCountryID = int.Parse(pOriginCountryID);
            objCVarTRCK_Trailers.ManufacturDate = pManufacturDate;
            objCVarTRCK_Trailers.PlateNo = (pPlateNo == null ? "" : pPlateNo.Trim().ToUpper());
            objCVarTRCK_Trailers.ChassisNo = (pChassisNo == null ? "" : pChassisNo.Trim().ToUpper());
            objCVarTRCK_Trailers.LicenseNumber = (pLicenseNumber == null ? "" : pLicenseNumber.Trim().ToUpper());
            objCVarTRCK_Trailers.LicenseNumberExpireDate = pLicenseNumberExpireDate;
            objCVarTRCK_Trailers.Color = (pColor == null ? "" : pColor.Trim().ToUpper());
            objCVarTRCK_Trailers.Length = (pLength == null ? 0 : decimal.Parse(pLength));
            objCVarTRCK_Trailers.Width = (pWidth == null ? 0 : decimal.Parse(pWidth));
            objCVarTRCK_Trailers.Height = (pHeight == null ? 0 : decimal.Parse(pHeight));
            objCVarTRCK_Trailers.GrossWeight = (pGrossWeight == null ? 0 : decimal.Parse(pGrossWeight));
            objCVarTRCK_Trailers.AllowedWeight = (pAllowedWeight == null ? 0 : decimal.Parse(pAllowedWeight));
            objCVarTRCK_Trailers.NoOfPrimaryWheels = (pNoOfPrimaryWheels == null ? 0 : int.Parse(pNoOfPrimaryWheels));
            objCVarTRCK_Trailers.NoOfAdditionalWheels = (pNoOfAdditionalWheels == null ? 0 : int.Parse(pNoOfAdditionalWheels));
            objCVarTRCK_Trailers.AxeCount = (pAxeCount == null ? 0 : int.Parse(pAxeCount));
            objCVarTRCK_Trailers.ExaminationExpireDate = pExaminationExpireDate;
            objCVarTRCK_Trailers.InsuranceDate = pInsuranceDate;
            objCVarTRCK_Trailers.WorkingDate = pWorkingDate;
            objCVarTRCK_Trailers.InsuranceBill = (pInsuranceBill == null ? "" : pInsuranceBill.Trim().ToUpper());
            objCVarTRCK_Trailers.InsuranceCompanyID = int.Parse(pInsuranceCompanyID);
            objCVarTRCK_Trailers.TaxEndDate = pTaxEndDate;
            objCVarTRCK_Trailers.EquipmentModelID = int.Parse(pEquipmentModelID);
            objCVarTRCK_Trailers.ServiceCenterID = int.Parse(pServiceCenterID);


            objCVarTRCK_Trailers.InsuranceValue = (pInsuranceValue == null ? "" : pInsuranceValue.Trim().ToUpper());
            objCVarTRCK_Trailers.Notes = (pNotes == null ? "" : pNotes.Trim().ToUpper());

            objCVarTRCK_Trailers.IsInactive = bool.Parse(pIsInactive);
            objCVarTRCK_Trailers.IsDeleted = false;

            objCVarTRCK_Trailers.AccountID = int.Parse(pAccountID);
            objCVarTRCK_Trailers.SubAccountID = int.Parse(pSubAccountID);
            objCVarTRCK_Trailers.CostCenterID = int.Parse(pCostCenterID);
            objCVarTRCK_Trailers.SubAccountGroupID = int.Parse(pSubAccountGroupID);
            
            objCVarTRCK_Trailers.NumberOfChambers = (pNumberOfChambers == null ? 0 : pNumberOfChambers);
            objCVarTRCK_Trailers.ChambersVolumeInLiters = (pChambersVolumeInLiters == null ? 0 : pChambersVolumeInLiters);
            objCVarTRCK_Trailers.TankerEmptyWeight = (pTankerEmptyWeight == null ? 0 : pTankerEmptyWeight);
            objCVarTRCK_Trailers.OutletID = (pOutlet == null ? 0 : pOutlet);

            objCVarTRCK_Trailers.IsHeating = pIsHeating;
            objCVarTRCK_Trailers.IsHeatable = pIsHeatable;
            objCVarTRCK_Trailers.IsEpump = pIsEpump;
            objCVarTRCK_Trailers.IsCompressor = pIsCompressor;
            objCVarTRCK_Trailers.IsGroundOperated = pIsGroundOperated;
            objCVarTRCK_Trailers.IsATP = pIsATP;

            objCVarTRCK_Trailers.Model = pModel;
            objCVarTRCK_Trailers.WheelSize = pWheelSize;

            objCVarTRCK_Trailers.TimeLocked = DateTime.Parse("01-01-1900");
            objCVarTRCK_Trailers.LockingUserID = 0;

            objCVarTRCK_Trailers.CreatorUserID = objCVarTRCK_Trailers.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarTRCK_Trailers.CreationDate = objCVarTRCK_Trailers.ModificationDate = DateTime.Now;

            CTRCK_Trailers objCTRCK_Trailers = new CTRCK_Trailers();
            objCTRCK_Trailers.lstCVarTRCK_Trailers.Add(objCVarTRCK_Trailers);
            Exception checkException = objCTRCK_Trailers.SaveMethod(objCTRCK_Trailers.lstCVarTRCK_Trailers);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else
            { //not unique
                _result = true;
                #region Create SubAccount
                int _RowCount = 0;
                if (int.Parse(pAccountID) != 0 && int.Parse(pSubAccountGroupID) != 0 && int.Parse(pSubAccountID) == 0)
                {
                    #region Get data to insert
                    CA_SubAccounts objCA_SubAccounts = new CA_SubAccounts();
                    checkException = objCA_SubAccounts.GetListPaging(9999, 1, "WHERE ID = " + pSubAccountGroupID.ToString(), "ID", out _RowCount);
                    CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
                    string pNewCode = objCCustomizedDBCall.CallStringFunction("SELECT [dbo].A_SubAccounts_GetCode(" + (int.Parse(pSubAccountGroupID) == 0 ? "null" : pSubAccountGroupID.ToString()) + ") AS Code");
                    #endregion Get data to insert
                    #region Insert
                    CVarA_SubAccounts objCVarA_SubAccounts = new CVarA_SubAccounts();
                    objCVarA_SubAccounts.SubAccount_Number = (objCA_SubAccounts.lstCVarA_SubAccounts[0].RealSubAccountCode + pNewCode).PadRight(21, '0');
                    objCVarA_SubAccounts.SubAccount_Name = pName.Trim().ToUpper();
                    objCVarA_SubAccounts.SubAccount_EnName = pName.Trim().ToUpper();
                    objCVarA_SubAccounts.Parent_ID = int.Parse(pSubAccountGroupID);
                    objCVarA_SubAccounts.IsMain = false;
                    objCVarA_SubAccounts.SubAccLevel = objCA_SubAccounts.lstCVarA_SubAccounts[0].SubAccLevel + 1;
                    objCVarA_SubAccounts.RealSubAccountCode = objCA_SubAccounts.lstCVarA_SubAccounts[0].RealSubAccountCode + pNewCode;
                    objCVarA_SubAccounts.User_ID = WebSecurity.CurrentUserId;
                    objCA_SubAccounts.lstCVarA_SubAccounts.Add(objCVarA_SubAccounts);
                    checkException = objCA_SubAccounts.SaveMethod(objCA_SubAccounts.lstCVarA_SubAccounts);
                    if (checkException == null)
                    {
                        _result = true;
                        int pNewSubAccountID = objCVarA_SubAccounts.ID;
                        //CallCustomizedSP
                        objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "A_SubAccounts", pNewSubAccountID, "AutoInsert");
                        //Set Parent.IsMain=true
                        objCA_SubAccounts.UpdateList("IsMain=1 WHERE ID=" + pSubAccountGroupID.ToString());
                        #region add Details if exists
                        CA_SubAccounts_Details objCA_SubAccounts_Details = new CA_SubAccounts_Details(); //get the parent details
                        checkException = objCA_SubAccounts_Details.GetListPaging(9999, 1, "WHERE SubAccount_ID = " + pSubAccountGroupID.ToString(), "SubAccount_ID", out _RowCount);
                        for (int i = 0; i < objCA_SubAccounts_Details.lstCVarA_SubAccounts_Details.Count; i++)
                        {
                            //this is insert, so i am sure i ve no children to link accounts to, ALSO I don't need to delete because they are new
                            objCCustomizedDBCall.SP_A_SubAccounts_Details("SP_A_SubAccounts_Details", "I", pNewSubAccountID, objCA_SubAccounts_Details.lstCVarA_SubAccounts_Details[i].Account_ID, false);
                        }
                        #endregion add Details if exists
                        //Update TRCK_Driver SubaccountID
                        objCTRCK_Trailers.UpdateList("SubAccountID=" + objCVarA_SubAccounts.ID + " WHERE ID=" + objCVarTRCK_Trailers.ID);
                    }
                    #endregion Insert
                }
                #endregion Create SubAccount
            }
            return _result;
        }

        // [Route("/api/TRCK_Trailers/Update/{pID}/{pCode}/{pName}/{pLocalName}")]
        [HttpGet, HttpPost]
        public bool Update(Int32 pID, string pCode, string pName, string pLocalName, string pOriginCountryID, DateTime pManufacturDate, string pPlateNo, string pChassisNo
            , string pLicenseNumber, DateTime pLicenseNumberExpireDate, string pColor, string pLength, string pWidth, string pHeight, string pGrossWeight, string pAllowedWeight
            , string pNoOfPrimaryWheels, string pNoOfAdditionalWheels, string pAxeCount, DateTime pExaminationExpireDate
            , DateTime pInsuranceDate, DateTime pWorkingDate, string pInsuranceBill, string pInsuranceCompanyID
            , DateTime pTaxEndDate, string pEquipmentModelID, string pServiceCenterID
            , string pInsuranceValue, string pNotes, string pIsInactive, string pAccountID, string pSubAccountID, string pCostCenterID, string pSubAccountGroupID
               , decimal pNumberOfChambers, decimal pChambersVolumeInLiters, decimal pTankerEmptyWeight, int pOutlet, Boolean pIsHeating, Boolean pIsHeatable
            , Boolean pIsEpump, Boolean pIsCompressor, Boolean pIsGroundOperated, Boolean pIsATP
            , string pModel, string pWheelSize)
        {
            bool _result = false;
            CVarTRCK_Trailers objCVarTRCK_Trailers = new CVarTRCK_Trailers();

            //the next 4 lines to get the CreatorUserID and CreationDate and set them as they were entered before
            CTRCK_Trailers objCGetCreationInformation = new CTRCK_Trailers();
            objCGetCreationInformation.GetItem(pID);
            objCVarTRCK_Trailers.CreatorUserID = objCGetCreationInformation.lstCVarTRCK_Trailers[0].CreatorUserID;
            objCVarTRCK_Trailers.CreationDate = objCGetCreationInformation.lstCVarTRCK_Trailers[0].CreationDate;
            if (int.Parse(pAccountID) == -1) //this means called from Operations or Quotations so don't update the ERP columns
            {
                objCVarTRCK_Trailers.AccountID = objCGetCreationInformation.lstCVarTRCK_Trailers[0].AccountID;
                objCVarTRCK_Trailers.SubAccountID = objCGetCreationInformation.lstCVarTRCK_Trailers[0].SubAccountID;
                objCVarTRCK_Trailers.CostCenterID = objCGetCreationInformation.lstCVarTRCK_Trailers[0].CostCenterID;
                objCVarTRCK_Trailers.SubAccountGroupID = objCGetCreationInformation.lstCVarTRCK_Trailers[0].SubAccountGroupID;
            }
            else
            {
                objCVarTRCK_Trailers.AccountID = int.Parse(pAccountID);
                objCVarTRCK_Trailers.SubAccountID = int.Parse(pSubAccountID);
                objCVarTRCK_Trailers.CostCenterID = int.Parse(pCostCenterID);
                objCVarTRCK_Trailers.SubAccountGroupID = int.Parse(pSubAccountGroupID);
            }
            objCVarTRCK_Trailers.ID = pID;

            objCVarTRCK_Trailers.Code = int.Parse(pCode);
            objCVarTRCK_Trailers.Name = pName.Trim().ToUpper();
            objCVarTRCK_Trailers.LocalName = (pLocalName == null ? "" : pLocalName.Trim().ToUpper());
            objCVarTRCK_Trailers.OriginCountryID = int.Parse(pOriginCountryID);
            objCVarTRCK_Trailers.ManufacturDate = pManufacturDate;
            objCVarTRCK_Trailers.PlateNo = (pPlateNo == null ? "" : pPlateNo.Trim().ToUpper());
            objCVarTRCK_Trailers.ChassisNo = (pChassisNo == null ? "" : pChassisNo.Trim().ToUpper());
            objCVarTRCK_Trailers.LicenseNumber = (pLicenseNumber == null ? "" : pLicenseNumber.Trim().ToUpper());
            objCVarTRCK_Trailers.LicenseNumberExpireDate = pLicenseNumberExpireDate;
            objCVarTRCK_Trailers.Color = (pColor == null ? "" : pColor.Trim().ToUpper());
            objCVarTRCK_Trailers.Length = (pLength == null ? 0 : decimal.Parse(pLength));
            objCVarTRCK_Trailers.Width = (pWidth == null ? 0 : decimal.Parse(pWidth));
            objCVarTRCK_Trailers.Height = (pHeight == null ? 0 : decimal.Parse(pHeight));
            objCVarTRCK_Trailers.GrossWeight = (pGrossWeight == null ? 0 : decimal.Parse(pGrossWeight));
            objCVarTRCK_Trailers.AllowedWeight = (pAllowedWeight == null ? 0 : decimal.Parse(pAllowedWeight));
            objCVarTRCK_Trailers.NoOfPrimaryWheels = (pNoOfPrimaryWheels == null ? 0 : int.Parse(pNoOfPrimaryWheels));
            objCVarTRCK_Trailers.NoOfAdditionalWheels = (pNoOfAdditionalWheels == null ? 0 : int.Parse(pNoOfAdditionalWheels));
            objCVarTRCK_Trailers.AxeCount = (pAxeCount == null ? 0 : int.Parse(pAxeCount));
            objCVarTRCK_Trailers.ExaminationExpireDate = pExaminationExpireDate;
            objCVarTRCK_Trailers.InsuranceDate = pInsuranceDate;
            objCVarTRCK_Trailers.WorkingDate = pWorkingDate;
            objCVarTRCK_Trailers.InsuranceBill = (pInsuranceBill == null ? "" : pInsuranceBill.Trim().ToUpper());
            objCVarTRCK_Trailers.InsuranceCompanyID = int.Parse(pInsuranceCompanyID);
            objCVarTRCK_Trailers.TaxEndDate = pTaxEndDate;
            objCVarTRCK_Trailers.EquipmentModelID = int.Parse(pEquipmentModelID);
            objCVarTRCK_Trailers.ServiceCenterID = int.Parse(pServiceCenterID);

            objCVarTRCK_Trailers.InsuranceValue = (pInsuranceValue == null ? "" : pInsuranceValue.Trim().ToUpper());
            objCVarTRCK_Trailers.Notes = (pNotes == null ? "" : pNotes.Trim().ToUpper());

            objCVarTRCK_Trailers.IsInactive = bool.Parse(pIsInactive);
            objCVarTRCK_Trailers.IsDeleted = false;
            

            objCVarTRCK_Trailers.NumberOfChambers = (pNumberOfChambers == null ? 0 : pNumberOfChambers);
            objCVarTRCK_Trailers.ChambersVolumeInLiters = (pChambersVolumeInLiters == null ? 0 : pChambersVolumeInLiters);
            objCVarTRCK_Trailers.TankerEmptyWeight = (pTankerEmptyWeight == null ? 0 : pTankerEmptyWeight);
            objCVarTRCK_Trailers.OutletID = (pOutlet == null ? 0 : pOutlet);

            objCVarTRCK_Trailers.IsHeating = pIsHeating;
            objCVarTRCK_Trailers.IsHeatable = pIsHeatable;
            objCVarTRCK_Trailers.IsEpump = pIsEpump;
            objCVarTRCK_Trailers.IsCompressor = pIsCompressor;
            objCVarTRCK_Trailers.IsGroundOperated = pIsGroundOperated;
            objCVarTRCK_Trailers.IsATP = pIsATP;

            objCVarTRCK_Trailers.Model = pModel;
            objCVarTRCK_Trailers.WheelSize = pWheelSize;

            objCVarTRCK_Trailers.TimeLocked = DateTime.Parse("01-01-1900");
            objCVarTRCK_Trailers.LockingUserID = 0;

            objCVarTRCK_Trailers.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarTRCK_Trailers.ModificationDate = DateTime.Now;

            CTRCK_Trailers objCTRCK_Trailers = new CTRCK_Trailers();
            objCTRCK_Trailers.lstCVarTRCK_Trailers.Add(objCVarTRCK_Trailers);
            Exception checkException = objCTRCK_Trailers.SaveMethod(objCTRCK_Trailers.lstCVarTRCK_Trailers);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else
            { //not unique
                _result = true;
                #region Create SubAccount
                int _RowCount = 0;
                if (int.Parse(pAccountID) != 0 && int.Parse(pSubAccountGroupID) != 0 && int.Parse(pSubAccountID) == 0)
                {
                    #region Get data to insert
                    CA_SubAccounts objCA_SubAccounts = new CA_SubAccounts();
                    checkException = objCA_SubAccounts.GetListPaging(9999, 1, "WHERE ID = " + pSubAccountGroupID.ToString(), "ID", out _RowCount);
                    CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
                    string pNewCode = objCCustomizedDBCall.CallStringFunction("SELECT [dbo].A_SubAccounts_GetCode(" + (int.Parse(pSubAccountGroupID) == 0 ? "null" : pSubAccountGroupID.ToString()) + ") AS Code");
                    #endregion Get data to insert
                    #region Insert
                    CVarA_SubAccounts objCVarA_SubAccounts = new CVarA_SubAccounts();
                    objCVarA_SubAccounts.SubAccount_Number = (objCA_SubAccounts.lstCVarA_SubAccounts[0].RealSubAccountCode + pNewCode).PadRight(21, '0');
                    objCVarA_SubAccounts.SubAccount_Name = pName.Trim().ToUpper();
                    objCVarA_SubAccounts.SubAccount_EnName = pName.Trim().ToUpper();
                    objCVarA_SubAccounts.Parent_ID = int.Parse(pSubAccountGroupID);
                    objCVarA_SubAccounts.IsMain = false;
                    objCVarA_SubAccounts.SubAccLevel = objCA_SubAccounts.lstCVarA_SubAccounts[0].SubAccLevel + 1;
                    objCVarA_SubAccounts.RealSubAccountCode = objCA_SubAccounts.lstCVarA_SubAccounts[0].RealSubAccountCode + pNewCode;
                    objCVarA_SubAccounts.User_ID = WebSecurity.CurrentUserId;
                    objCA_SubAccounts.lstCVarA_SubAccounts.Add(objCVarA_SubAccounts);
                    checkException = objCA_SubAccounts.SaveMethod(objCA_SubAccounts.lstCVarA_SubAccounts);
                    if (checkException == null)
                    {
                        _result = true;
                        int pNewSubAccountID = objCVarA_SubAccounts.ID;
                        //CallCustomizedSP
                        objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "A_SubAccounts", pNewSubAccountID, "AutoInsert");
                        //Set Parent.IsMain=true
                        objCA_SubAccounts.UpdateList("IsMain=1 WHERE ID=" + pSubAccountGroupID.ToString());
                        #region add Details if exists
                        CA_SubAccounts_Details objCA_SubAccounts_Details = new CA_SubAccounts_Details(); //get the parent details
                        checkException = objCA_SubAccounts_Details.GetListPaging(9999, 1, "WHERE SubAccount_ID = " + pSubAccountGroupID.ToString(), "SubAccount_ID", out _RowCount);
                        for (int i = 0; i < objCA_SubAccounts_Details.lstCVarA_SubAccounts_Details.Count; i++)
                        {
                            //this is insert, so i am sure i ve no children to link accounts to, ALSO I don't need to delete because they are new
                            objCCustomizedDBCall.SP_A_SubAccounts_Details("SP_A_SubAccounts_Details", "I", pNewSubAccountID, objCA_SubAccounts_Details.lstCVarA_SubAccounts_Details[i].Account_ID, false);
                        }
                        #endregion add Details if exists
                        //Update TRCK_Driver SubaccountID
                        objCTRCK_Trailers.UpdateList("SubAccountID=" + objCVarA_SubAccounts.ID + " WHERE ID=" + objCVarTRCK_Trailers.ID);
                    }
                    #endregion Insert
                }
                #endregion Create SubAccount
            }
            return _result;
        }

        // [Route("api/TRCK_Trailers/Delete/{pTRCK_TrailersIDs}")]
        [HttpGet, HttpPost]
        public bool Delete(String pTRCK_TrailersIDs)
        {
            bool _result = false;
            CTRCK_Trailers objCTRCK_Trailers = new CTRCK_Trailers();
            foreach (var currentID in pTRCK_TrailersIDs.Split(','))
            {
                objCTRCK_Trailers.lstDeletedCPKTRCK_Trailers.Add(new CPKTRCK_Trailers() { ID = Int32.Parse(currentID.Trim()) });
            }

            Exception checkException = objCTRCK_Trailers.DeleteItem(objCTRCK_Trailers.lstDeletedCPKTRCK_Trailers);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("DELETE")) // some or all of the rows were not deleted due to dependencies
                    _result = false;
            }
            else //deleted successfully and no dependencies, so set is deleted in addresses and contacts to 1 by a trigger
                _result = true;
            return _result;
        }

        //[Route("/api/TRCK_Trailers/CheckRow/{pTRCK_TrailersID}")]
        [HttpGet, HttpPost]
        public Boolean CheckRow(String pID)
        {
            bool _result = false;
            // var xx = HttpContext.Current.Session["UserID"].ToString();
            CTRCK_Trailers objCTRCK_Trailers = new CTRCK_Trailers();
            objCTRCK_Trailers.GetItem(int.Parse(pID));

            //if (objCTRCK_Trailers.lstCVarTRCK_Trailers[0].TimeLocked.Equals(DateTime.Parse("01-01-1900")))
            if (objCTRCK_Trailers.lstCVarTRCK_Trailers[0].LockingUserID == 0)
            {
                //record is not locked so lock it then return false
                objCTRCK_Trailers.lstCVarTRCK_Trailers[0].TimeLocked = DateTime.Now;
                objCTRCK_Trailers.lstCVarTRCK_Trailers[0].LockingUserID = WebSecurity.CurrentUserId;
                objCTRCK_Trailers.lstCVarTRCK_Trailers.Add(objCTRCK_Trailers.lstCVarTRCK_Trailers[0]);
                objCTRCK_Trailers.SaveMethod(objCTRCK_Trailers.lstCVarTRCK_Trailers);
                _result = false;
            }
            else
            {
                _result = true;//record is locked
            }
            return _result;
        }

        //[Route("/api/TRCK_Trailers/UnlockRecord/{pID}")]
        [HttpGet, HttpPost]
        public Boolean UnlockRecord(string pID)
        {
            bool _result = false;
            try
            {
                CTRCK_Trailers objCTRCK_Trailers = new CTRCK_Trailers();
                objCTRCK_Trailers.GetItem(int.Parse(pID));

                objCTRCK_Trailers.lstCVarTRCK_Trailers[0].TimeLocked = DateTime.Parse("01-01-1900");
                objCTRCK_Trailers.lstCVarTRCK_Trailers[0].LockingUserID = 0;
                objCTRCK_Trailers.lstCVarTRCK_Trailers.Add(objCTRCK_Trailers.lstCVarTRCK_Trailers[0]);
                objCTRCK_Trailers.SaveMethod(objCTRCK_Trailers.lstCVarTRCK_Trailers);
                _result = true;
            }
            catch (Exception ex)
            {
                _result = false;//record is locked
            }
            return _result;
        }

    }
}

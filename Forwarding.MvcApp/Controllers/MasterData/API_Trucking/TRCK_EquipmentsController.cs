using Forwarding.MvcApp.Models.Accounting.MasterData.Customized;
using Forwarding.MvcApp.Models.Accounting.MasterData.Generated;

using Forwarding.MvcApp.Models.Administration.Security.Generated;
using Forwarding.MvcApp.Models.Customized;
using Forwarding.MvcApp.Models.MasterData.Trucking.Generated;
using Forwarding.MvcApp.Models.NoAccess.Generated;
using Forwarding.MvcApp.Models.Operations.Operations.Generated;
using System;
using System.Linq;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;
using Forwarding.MvcApp.Entities.Operations;

namespace Forwarding.MvcApp.Controllers.MasterData.API_Partners
{
    public class TRCK_EquipmentsController : ApiController
    {
        [HttpGet, HttpPost]
        public Object[] LoadAll(string pWhereClause)
        {
            CvwTRCK_Equipments objCTRCK_Equipments = new CvwTRCK_Equipments();
            objCTRCK_Equipments.GetList(pWhereClause);
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[] { serializer.Serialize(objCTRCK_Equipments.lstCVarvwTRCK_Equipments) };
        }
        
        [HttpGet, HttpPost]
        public Object[] LoadWithPaging(Int32 pPageNumber, Int32 pPageSize, string pSearchKey)
        {
            CTRCK_Equipments objCTRCK_Equipments = new CTRCK_Equipments();
            //objCTRCK_Equipments.GetList(string.Empty);
            Int32 _RowCount = 0;// objCTRCK_Equipments.lstCVarTRCK_Equipments.Count;
            
            pSearchKey = (pSearchKey == null ? "" : pSearchKey.Trim().ToUpper());
            string whereClause = " Where (Code LIKE N'%" + pSearchKey + "%' "
                + " OR Name LIKE N'%" + pSearchKey + "%' "
                + " OR LocalName LIKE N'%" + pSearchKey + "%') ";
           
            objCTRCK_Equipments.GetListPaging(pPageSize, pPageNumber, whereClause, " Code ", out _RowCount);

            return new Object[] { new JavaScriptSerializer().Serialize(objCTRCK_Equipments.lstCVarTRCK_Equipments), _RowCount };
        }

        [HttpGet, HttpPost]
        public Object[] LoadWithPagingWithWhereClause(Int32 pPageNumber, Int32 pPageSize, string pWhereClause)
        {
            CNoAccessEquipmentType objCEquipmentType = new CNoAccessEquipmentType();
            CTRCK_Equipments objCTRCK_Equipments = new CTRCK_Equipments();
           
            Int32 _RowCount = 0;
            objCEquipmentType.GetListPaging(999999, 1, "WHERE IsInactive=0", "ID", out _RowCount);
            objCTRCK_Equipments.GetListPaging(pPageSize, pPageNumber, pWhereClause, " Code ", out _RowCount);
           
            return new Object[] { new JavaScriptSerializer().Serialize(objCTRCK_Equipments.lstCVarTRCK_Equipments)
                , _RowCount
                , new JavaScriptSerializer().Serialize(objCEquipmentType.lstCVarNoAccessEquipmentType)
         };
        }

        [HttpGet, HttpPost]
        public Object[] LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned(Int32 pPageNumber, Int32 pPageSize, string pWhereClause, string pOrderBy)
        {
            Int32 _RowCount = 0;
            Exception checkException = null;

            CTRCK_Equipments objCTRCK_Equipments = new CTRCK_Equipments();
            checkException = objCTRCK_Equipments.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);
            var pEquipmentList = objCTRCK_Equipments.lstCVarTRCK_Equipments
                .Select(s=>new
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
                .OrderBy(o=>o.LicenseExpirationDays);
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[] {
                serializer.Serialize(pEquipmentList)
         };
        }

        [HttpGet, HttpPost]
        public object[] Insert(string pCode, string pName, string pLocalName, string pOriginCountryID, DateTime pManufacturDate, string pPlateNo, string pChassisNo 
            , string pLicenseNumber, DateTime pLicenseNumberExpireDate, string pColor,  string pLength, string pWidth, string pHeight, string pGrossWeight, string pAllowedWeight
            , string pNoOfPrimaryWheels, string pNoOfAdditionalWheels, string pAxeCount, DateTime pExaminationExpireDate
            , DateTime pInsuranceDate, DateTime pWorkingDate, string pInsuranceBill, string pInsuranceCompanyID
            , DateTime pTaxEndDate, string pEquipmentModelID, string pServiceCenterID, string pCompanyID
            , string pInsuranceValue, string pNotes, string pTrailerID, string pMotorNo, string pIsInactive, string pAccountID, string pSubAccountID, string pCostCenterID, string pSubAccountGroupID ,string pFirstCounter
            , String pIDList, String pItemID, String pLastTruckCounter, String pDate, String pDescription
            ,string pSLHeadLeft1Out, string pSLHeadLeft1IN, string pSLHeadLeft2Out, string pSLHeadLeft2IN, string pSLHeadLeft3Out, string pSLHeadLeft3IN,
            string pSLHeadRight1Out, string pSLHeadRight1IN, string pSLHeadRight2Out, string pSLHeadRight2IN, string pSLHeadRight3Out, string pSLHeadRight3IN
            , string pSLTrailLeft1Out, string pSLTrailLeft1IN, string pSLTrailLeft2Out, string pSLTrailLeft2IN, string pSLTrailLeft3Out,
            string pSLTrailLeft3IN, string pSLTrailLeft4Out, string pSLTrailLeft4IN, string pSLTrailLeft5Out, string pSLTrailLeft5IN
            , string pSLTrailRight1Out, string pSLTrailRight1IN, string pSLTrailRight2Out, string pSLTrailRight2IN, string pSLTrailRight3Out
            , string pSLTrailRight3IN, string pSLTrailRight4Out, string pSLTrailRight4IN, string pSLTrailRight5Out, string pSLTrailRight5IN
            //pNumberOfChambers pChambersVolumeInLiters pTankerEmptyWeight pGroundOperated pIsHeating pIsHeatable pIsEpump pIsCompressor pIsGroundOperated pIsATP
            , decimal pNumberOfChambers, decimal pChambersVolumeInLiters, decimal pTankerEmptyWeight, int pOutlet, Boolean pIsHeating , Boolean pIsHeatable
            , Boolean pIsEpump , Boolean pIsCompressor, Boolean pIsGroundOperated, Boolean pIsATP, Int32 pEquipmentTypeID, Int32 pNumberOfChairs
            , bool pIsGPS, string pModel, string pWheelSize , int pExchangePermission =0 ,int pStoragePermission =0, int pHouseId =0
            )
        {
            bool _result = false;
            CVarTRCK_Equipments objCVarTRCK_Equipments = new CVarTRCK_Equipments();


            objCVarTRCK_Equipments.Code = int.Parse(pCode);
            objCVarTRCK_Equipments.Name = (pLocalName == null ? "" : pLocalName.Trim().ToUpper());
            objCVarTRCK_Equipments.LocalName = (pLocalName == null ? "" : pLocalName.Trim().ToUpper());
            objCVarTRCK_Equipments.OriginCountryID = int.Parse(pOriginCountryID);
            objCVarTRCK_Equipments.ManufacturDate = pManufacturDate;
            objCVarTRCK_Equipments.PlateNo = (pPlateNo == null ? "" : pPlateNo.Trim().ToUpper());
            objCVarTRCK_Equipments.ChassisNo = (pChassisNo == null ? "" : pChassisNo.Trim().ToUpper());
            objCVarTRCK_Equipments.LicenseNumber = (pLicenseNumber == null ? "" : pLicenseNumber.Trim().ToUpper());
            objCVarTRCK_Equipments.LicenseNumberExpireDate = pLicenseNumberExpireDate;
            objCVarTRCK_Equipments.Color = (pColor == null ? "" : pColor.Trim().ToUpper());
            objCVarTRCK_Equipments.Length = (pLength == null ? 0 : decimal.Parse(pLength));
            objCVarTRCK_Equipments.Width = (pWidth == null ? 0 : decimal.Parse(pWidth));
            objCVarTRCK_Equipments.Height = (pHeight == null ? 0 : decimal.Parse(pHeight));
            objCVarTRCK_Equipments.GrossWeight = (pGrossWeight == null ? 0 : decimal.Parse(pGrossWeight));
            objCVarTRCK_Equipments.AllowedWeight = (pAllowedWeight == null ? 0 : decimal.Parse(pAllowedWeight));
            objCVarTRCK_Equipments.NoOfPrimaryWheels = (pNoOfPrimaryWheels == null ? 0 : int.Parse(pNoOfPrimaryWheels));
            objCVarTRCK_Equipments.NoOfAdditionalWheels = (pNoOfAdditionalWheels == null ? 0 : int.Parse(pNoOfAdditionalWheels));
            objCVarTRCK_Equipments.AxeCount = (pAxeCount == null ? 0 : int.Parse(pAxeCount));
            objCVarTRCK_Equipments.ExaminationExpireDate = pExaminationExpireDate;
            objCVarTRCK_Equipments.InsuranceDate = pInsuranceDate;
            objCVarTRCK_Equipments.WorkingDate = pWorkingDate;
            objCVarTRCK_Equipments.InsuranceBill = (pInsuranceBill == null ? "" : pInsuranceBill.Trim().ToUpper());
            objCVarTRCK_Equipments.InsuranceCompanyID = int.Parse(pInsuranceCompanyID);
            objCVarTRCK_Equipments.TaxEndDate = pTaxEndDate;
            objCVarTRCK_Equipments.EquipmentModelID = int.Parse(pEquipmentModelID);
            objCVarTRCK_Equipments.ServiceCenterID = int.Parse(pServiceCenterID);
            objCVarTRCK_Equipments.CompanyID = int.Parse(pCompanyID);


            objCVarTRCK_Equipments.InsuranceValue = (pInsuranceValue == null ? "" : pInsuranceValue.Trim().ToUpper());
            objCVarTRCK_Equipments.Notes = (pNotes == null ? "" : pNotes.Trim().ToUpper());
            objCVarTRCK_Equipments.TrailerID = int.Parse(pTrailerID);
            objCVarTRCK_Equipments.MotorNo = (pMotorNo == null ? "" : pMotorNo.Trim().ToUpper());

            objCVarTRCK_Equipments.IsInactive = bool.Parse(pIsInactive);
            objCVarTRCK_Equipments.IsDeleted = false;

            objCVarTRCK_Equipments.AccountID = int.Parse(pAccountID);
            objCVarTRCK_Equipments.SubAccountID = int.Parse(pSubAccountID);
            objCVarTRCK_Equipments.CostCenterID = int.Parse(pCostCenterID);
            objCVarTRCK_Equipments.SubAccountGroupID = int.Parse(pSubAccountGroupID);
            objCVarTRCK_Equipments.FirstCounter = int.Parse(pFirstCounter);

            objCVarTRCK_Equipments.TimeLocked = DateTime.Parse("01-01-1900");
            objCVarTRCK_Equipments.LockingUserID = 0;

            objCVarTRCK_Equipments.CreatorUserID = objCVarTRCK_Equipments.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarTRCK_Equipments.CreationDate = objCVarTRCK_Equipments.ModificationDate = DateTime.Now;
            
            objCVarTRCK_Equipments.NumberOfChambers =   (pNumberOfChambers == null ?0: pNumberOfChambers);
            objCVarTRCK_Equipments.ChambersVolumeInLiters = (pChambersVolumeInLiters == null ? 0 : pChambersVolumeInLiters);
            objCVarTRCK_Equipments.TankerEmptyWeight = (pTankerEmptyWeight == null ? 0 : pTankerEmptyWeight);
            objCVarTRCK_Equipments.OutletID = (pOutlet == null ? 0 : pOutlet);
            objCVarTRCK_Equipments.IsHeating = pIsHeating;
            objCVarTRCK_Equipments.IsHeatable = pIsHeatable;
            objCVarTRCK_Equipments.IsEpump = pIsEpump;
            objCVarTRCK_Equipments.IsCompressor = pIsCompressor;
            objCVarTRCK_Equipments.IsGroundOperated = pIsGroundOperated;
            objCVarTRCK_Equipments.IsATP = pIsATP;
            objCVarTRCK_Equipments.IsGPS = pIsGPS;

            objCVarTRCK_Equipments.Model = pModel;
            objCVarTRCK_Equipments.WheelSize = pWheelSize;

            objCVarTRCK_Equipments.EquipmentTypeID = pEquipmentTypeID;
            objCVarTRCK_Equipments.NumberOfChairs = pNumberOfChairs;
            objCVarTRCK_Equipments.ExchangePermission = pExchangePermission;
            objCVarTRCK_Equipments.StorgePermission = pStoragePermission;
            objCVarTRCK_Equipments.HouseID = pHouseId;

            CTRCK_Equipments objCTRCK_Equipments = new CTRCK_Equipments();
            objCTRCK_Equipments.lstCVarTRCK_Equipments.Add(objCVarTRCK_Equipments);
            Exception checkException = objCTRCK_Equipments.SaveMethod(objCTRCK_Equipments.lstCVarTRCK_Equipments);
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
                        objCTRCK_Equipments.UpdateList("SubAccountID=" + objCVarA_SubAccounts.ID + " WHERE ID=" + objCVarTRCK_Equipments.ID);
                    }
                    #endregion Insert
                }
                #endregion Create SubAccount
                //TRCK_Equipment_Items
                CTRCK_Equipment_Items objCTRCK_Equipment_Items = new CTRCK_Equipment_Items();
                if (pIDList != null)
                {
                    for (int i = 0; i < pIDList.Split(',').Length; i++)
                    {
                        CVarTRCK_Equipment_Items objCVarTRCK_Equipment_Items = new CVarTRCK_Equipment_Items();
                        objCVarTRCK_Equipment_Items.ID = Convert.ToInt32(pIDList.Split(',')[i]);
                        objCVarTRCK_Equipment_Items.TRCK_EquipmentID = objCVarTRCK_Equipments.ID;
                        objCVarTRCK_Equipment_Items.IsWheel = false;
                        objCVarTRCK_Equipment_Items.ItemID = Convert.ToInt32(pItemID.Split(',')[i]);
                        objCVarTRCK_Equipment_Items.LastTruckCounter = Convert.ToInt32(pLastTruckCounter.Split(',')[i]);
                        objCVarTRCK_Equipment_Items.ModificationDate = Convert.ToDateTime(pDate.Split(',')[i]);
                        objCVarTRCK_Equipment_Items.ModificatorUserID = WebSecurity.CurrentUserId;
                        objCVarTRCK_Equipment_Items.CreationDate = DateTime.Now;
                        objCVarTRCK_Equipment_Items.CreationUserID = WebSecurity.CurrentUserId;
                        objCVarTRCK_Equipment_Items.Remarks =(pDescription == null ? "" : pDescription.Split(',')[i]) ;

                        #region wheels
                        objCVarTRCK_Equipment_Items.SLHeadLeft1Out = 0;
                        objCVarTRCK_Equipment_Items.SLHeadLeft1IN = 0;
                        objCVarTRCK_Equipment_Items.SLHeadLeft2Out = 0;
                        objCVarTRCK_Equipment_Items.SLHeadLeft2IN = 0;
                        objCVarTRCK_Equipment_Items.SLHeadLeft3Out = 0;
                        objCVarTRCK_Equipment_Items.SLHeadLeft3IN = 0;
                        objCVarTRCK_Equipment_Items.SLHeadRight1Out = 0;
                        objCVarTRCK_Equipment_Items.SLHeadRight1IN = 0;
                        objCVarTRCK_Equipment_Items.SLHeadRight2Out = 0;
                        objCVarTRCK_Equipment_Items.SLHeadRight2IN = 0;
                        objCVarTRCK_Equipment_Items.SLHeadRight3Out = 0;
                        objCVarTRCK_Equipment_Items.SLHeadRight3IN = 0;
                        objCVarTRCK_Equipment_Items.SLTrailLeft1Out = 0;
                        objCVarTRCK_Equipment_Items.SLTrailLeft1IN = 0;
                        objCVarTRCK_Equipment_Items.SLTrailLeft2Out = 0;
                        objCVarTRCK_Equipment_Items.SLTrailLeft2IN = 0;
                        objCVarTRCK_Equipment_Items.SLTrailLeft3Out = 0;
                        objCVarTRCK_Equipment_Items.SLTrailLeft3IN = 0;
                        objCVarTRCK_Equipment_Items.SLTrailLeft4Out = 0;
                        objCVarTRCK_Equipment_Items.SLTrailLeft4IN = 0;
                        objCVarTRCK_Equipment_Items.SLTrailLeft5Out = 0;
                        objCVarTRCK_Equipment_Items.SLTrailLeft5IN = 0;
                        objCVarTRCK_Equipment_Items.SLTrailRight1Out = 0;
                        objCVarTRCK_Equipment_Items.SLTrailRight1IN = 0;
                        objCVarTRCK_Equipment_Items.SLTrailRight2Out = 0;
                        objCVarTRCK_Equipment_Items.SLTrailRight2IN = 0;
                        objCVarTRCK_Equipment_Items.SLTrailRight3Out = 0;
                        objCVarTRCK_Equipment_Items.SLTrailRight3IN = 0;
                        objCVarTRCK_Equipment_Items.SLTrailRight4Out = 0;
                        objCVarTRCK_Equipment_Items.SLTrailRight4IN = 0;
                        objCVarTRCK_Equipment_Items.SLTrailRight5Out = 0;
                        objCVarTRCK_Equipment_Items.SLTrailRight5IN = 0;
                        #endregion
                        objCTRCK_Equipment_Items.lstCVarTRCK_Equipment_Items.Add(objCVarTRCK_Equipment_Items);
                    }
                    checkException = objCTRCK_Equipment_Items.SaveMethod(objCTRCK_Equipment_Items.lstCVarTRCK_Equipment_Items);

                    #region wheel
                    //delete all first
                    CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
                    objCCustomizedDBCall.CallStringFunction("DELETE FROM TRCK_Equipment_Items WHERE IsWheel=1 and TRCK_EquipmentID = " + objCVarTRCK_Equipments.ID);

                    CVarTRCK_Equipment_Items objCVarTRCK_Equipment_ItemsWheel = new CVarTRCK_Equipment_Items();
                    objCVarTRCK_Equipment_ItemsWheel.ID = 0;
                    objCVarTRCK_Equipment_ItemsWheel.TRCK_EquipmentID = objCVarTRCK_Equipments.ID;
                    objCVarTRCK_Equipment_ItemsWheel.IsWheel = true;
                    objCVarTRCK_Equipment_ItemsWheel.ItemID =0;
                    objCVarTRCK_Equipment_ItemsWheel.LastTruckCounter = 0;
                    objCVarTRCK_Equipment_ItemsWheel.ModificationDate = DateTime.Parse("01-01-1900");
                    objCVarTRCK_Equipment_ItemsWheel.ModificatorUserID = WebSecurity.CurrentUserId;
                    objCVarTRCK_Equipment_ItemsWheel.CreationDate = DateTime.Now;
                    objCVarTRCK_Equipment_ItemsWheel.CreationUserID = WebSecurity.CurrentUserId;
                    objCVarTRCK_Equipment_ItemsWheel.Remarks ="0";

                    #region wheels
                    objCVarTRCK_Equipment_ItemsWheel.SLHeadLeft1Out = int.Parse(pSLHeadLeft1Out);
                    objCVarTRCK_Equipment_ItemsWheel.SLHeadLeft1IN = int.Parse(pSLHeadLeft1IN); ;
                    objCVarTRCK_Equipment_ItemsWheel.SLHeadLeft2Out = int.Parse(pSLHeadLeft2Out);
                    objCVarTRCK_Equipment_ItemsWheel.SLHeadLeft2IN = int.Parse(pSLHeadLeft2IN);
                    objCVarTRCK_Equipment_ItemsWheel.SLHeadLeft3Out = int.Parse(pSLHeadLeft3Out);
                    objCVarTRCK_Equipment_ItemsWheel.SLHeadLeft3IN = int.Parse(pSLHeadLeft3IN);
                    objCVarTRCK_Equipment_ItemsWheel.SLHeadRight1Out = int.Parse(pSLHeadRight1Out);
                    objCVarTRCK_Equipment_ItemsWheel.SLHeadRight1IN = int.Parse(pSLHeadRight1IN);
                    objCVarTRCK_Equipment_ItemsWheel.SLHeadRight2Out = int.Parse(pSLHeadRight2Out);
                    objCVarTRCK_Equipment_ItemsWheel.SLHeadRight2IN = int.Parse(pSLHeadRight2IN);
                    objCVarTRCK_Equipment_ItemsWheel.SLHeadRight3Out = int.Parse(pSLHeadRight3Out);
                    objCVarTRCK_Equipment_ItemsWheel.SLHeadRight3IN = int.Parse(pSLHeadRight3IN);
                    objCVarTRCK_Equipment_ItemsWheel.SLTrailLeft1Out = int.Parse(pSLTrailLeft1Out);
                    objCVarTRCK_Equipment_ItemsWheel.SLTrailLeft1IN = int.Parse(pSLTrailLeft1IN);
                    objCVarTRCK_Equipment_ItemsWheel.SLTrailLeft2Out = int.Parse(pSLTrailLeft2Out);
                    objCVarTRCK_Equipment_ItemsWheel.SLTrailLeft2IN = int.Parse(pSLTrailLeft2IN);
                    objCVarTRCK_Equipment_ItemsWheel.SLTrailLeft3Out = int.Parse(pSLTrailLeft3Out);
                    objCVarTRCK_Equipment_ItemsWheel.SLTrailLeft3IN = int.Parse(pSLTrailLeft3IN);
                    objCVarTRCK_Equipment_ItemsWheel.SLTrailLeft4Out = int.Parse(pSLTrailLeft4Out);
                    objCVarTRCK_Equipment_ItemsWheel.SLTrailLeft4IN = int.Parse(pSLTrailLeft4IN);
                    objCVarTRCK_Equipment_ItemsWheel.SLTrailLeft5Out = int.Parse(pSLTrailLeft5Out);
                    objCVarTRCK_Equipment_ItemsWheel.SLTrailLeft5IN = int.Parse(pSLTrailLeft5IN);
                    objCVarTRCK_Equipment_ItemsWheel.SLTrailRight1Out = int.Parse(pSLTrailRight1Out);
                    objCVarTRCK_Equipment_ItemsWheel.SLTrailRight1IN = int.Parse(pSLTrailRight1IN);
                    objCVarTRCK_Equipment_ItemsWheel.SLTrailRight2Out = int.Parse(pSLTrailRight2Out);
                    objCVarTRCK_Equipment_ItemsWheel.SLTrailRight2IN = int.Parse(pSLTrailRight2IN);
                    objCVarTRCK_Equipment_ItemsWheel.SLTrailRight3Out = int.Parse(pSLTrailRight3Out);
                    objCVarTRCK_Equipment_ItemsWheel.SLTrailRight3IN = int.Parse(pSLTrailRight3IN);
                    objCVarTRCK_Equipment_ItemsWheel.SLTrailRight4Out = int.Parse(pSLTrailRight4Out);
                    objCVarTRCK_Equipment_ItemsWheel.SLTrailRight4IN = int.Parse(pSLTrailRight4IN);
                    objCVarTRCK_Equipment_ItemsWheel.SLTrailRight5Out = int.Parse(pSLTrailRight5Out);
                    objCVarTRCK_Equipment_ItemsWheel.SLTrailRight5IN = int.Parse(pSLTrailRight5IN);
                    #endregion
                    objCTRCK_Equipment_Items.lstCVarTRCK_Equipment_Items.Add(objCVarTRCK_Equipment_ItemsWheel);
                    checkException = objCTRCK_Equipment_Items.SaveMethod(objCTRCK_Equipment_Items.lstCVarTRCK_Equipment_Items);
                    #endregion
                   

                }
                if (checkException != null) // an exception is caught in the model
                {
                    if (checkException.Message.Contains("UNIQUE"))
                        _result = false;
                }
            }
            int _rowCount = 0;
            CvwHouseVechiles cvwHouseVechiles = new CvwHouseVechiles();
            cvwHouseVechiles.GetListPaging(99999, 1, "WHERE HouseId =" + pHouseId, "ID", out _rowCount);

            return new object[] {
                _result
                , new JavaScriptSerializer().Serialize(cvwHouseVechiles.lstCVarvwHouseVechiles)
            };
        }
        
        [HttpGet, HttpPost]
        public bool Update(Int32 pID, string pCode, string pName, string pLocalName, string pOriginCountryID, DateTime pManufacturDate, string pPlateNo, string pChassisNo
            , string pLicenseNumber, DateTime pLicenseNumberExpireDate, string pColor, string pLength, string pWidth, string pHeight, string pGrossWeight, string pAllowedWeight
            , string pNoOfPrimaryWheels, string pNoOfAdditionalWheels, string pAxeCount, DateTime pExaminationExpireDate
            , DateTime pInsuranceDate, DateTime pWorkingDate, string pInsuranceBill, string pInsuranceCompanyID
            , DateTime pTaxEndDate, string pEquipmentModelID, string pServiceCenterID, string pCompanyID
            , string pInsuranceValue, string pNotes, string pTrailerID, string pMotorNo, string pIsInactive, string pAccountID, string pSubAccountID, string pCostCenterID, string pSubAccountGroupID, string pFirstCounter
            , String pIDList, String pItemID, String pLastTruckCounter, String pDate, String pDescription,
            string pSLHeadLeft1Out, string pSLHeadLeft1IN, string pSLHeadLeft2Out, string pSLHeadLeft2IN, string pSLHeadLeft3Out, string pSLHeadLeft3IN,
            string pSLHeadRight1Out, string pSLHeadRight1IN, string pSLHeadRight2Out, string pSLHeadRight2IN, string pSLHeadRight3Out, string pSLHeadRight3IN
            , string pSLTrailLeft1Out, string pSLTrailLeft1IN, string pSLTrailLeft2Out, string pSLTrailLeft2IN, string pSLTrailLeft3Out,
            string pSLTrailLeft3IN, string pSLTrailLeft4Out, string pSLTrailLeft4IN, string pSLTrailLeft5Out, string pSLTrailLeft5IN
            , string pSLTrailRight1Out, string pSLTrailRight1IN, string pSLTrailRight2Out, string pSLTrailRight2IN, string pSLTrailRight3Out
            , string pSLTrailRight3IN, string pSLTrailRight4Out, string pSLTrailRight4IN, string pSLTrailRight5Out, string pSLTrailRight5IN
             , decimal pNumberOfChambers, decimal pChambersVolumeInLiters, decimal pTankerEmptyWeight, int pOutlet, Boolean pIsHeating, Boolean pIsHeatable
            , Boolean pIsEpump, Boolean pIsCompressor, Boolean pIsGroundOperated, Boolean pIsATP, Int32 pEquipmentTypeID, Int32 pNumberOfChairs
            , bool pIsGPS, string pModel, string pWheelSize
            )
        {
            bool _result = false;
            CVarTRCK_Equipments objCVarTRCK_Equipments = new CVarTRCK_Equipments();

            //the next 4 lines to get the CreatorUserID and CreationDate and set them as they were entered before
            CTRCK_Equipments objCGetCreationInformation = new CTRCK_Equipments();
            objCGetCreationInformation.GetItem(pID);
            objCVarTRCK_Equipments.CreatorUserID = objCGetCreationInformation.lstCVarTRCK_Equipments[0].CreatorUserID;
            objCVarTRCK_Equipments.CreationDate = objCGetCreationInformation.lstCVarTRCK_Equipments[0].CreationDate;
            if (int.Parse(pAccountID) == -1) //this means called from Operations or Quotations so don't update the ERP columns
            {
                objCVarTRCK_Equipments.AccountID = objCGetCreationInformation.lstCVarTRCK_Equipments[0].AccountID;
                objCVarTRCK_Equipments.SubAccountID = objCGetCreationInformation.lstCVarTRCK_Equipments[0].SubAccountID;
                objCVarTRCK_Equipments.CostCenterID = objCGetCreationInformation.lstCVarTRCK_Equipments[0].CostCenterID;
                objCVarTRCK_Equipments.SubAccountGroupID = objCGetCreationInformation.lstCVarTRCK_Equipments[0].SubAccountGroupID;
            }
            else
            {
                objCVarTRCK_Equipments.AccountID = int.Parse(pAccountID);
                objCVarTRCK_Equipments.SubAccountID = int.Parse(pSubAccountID);
                objCVarTRCK_Equipments.CostCenterID = int.Parse(pCostCenterID);
                objCVarTRCK_Equipments.SubAccountGroupID = int.Parse(pSubAccountGroupID);
            }
            objCVarTRCK_Equipments.ID = pID;

            objCVarTRCK_Equipments.Code = int.Parse(pCode);
            objCVarTRCK_Equipments.Name = pName.Trim().ToUpper();
            objCVarTRCK_Equipments.LocalName = (pLocalName == null ? "" : pLocalName.Trim().ToUpper());
            objCVarTRCK_Equipments.OriginCountryID = int.Parse(pOriginCountryID);
            objCVarTRCK_Equipments.ManufacturDate = pManufacturDate;
            objCVarTRCK_Equipments.PlateNo = (pPlateNo == null ? "" : pPlateNo.Trim().ToUpper());
            objCVarTRCK_Equipments.ChassisNo = (pChassisNo == null ? "" : pChassisNo.Trim().ToUpper());
            objCVarTRCK_Equipments.LicenseNumber = (pLicenseNumber == null ? "" : pLicenseNumber.Trim().ToUpper());
            objCVarTRCK_Equipments.LicenseNumberExpireDate = pLicenseNumberExpireDate;
            objCVarTRCK_Equipments.Color = (pColor == null ? "" : pColor.Trim().ToUpper());
            objCVarTRCK_Equipments.Length = (pLength == null ? 0 : decimal.Parse(pLength));
            objCVarTRCK_Equipments.Width = (pWidth == null ? 0 : decimal.Parse(pWidth));
            objCVarTRCK_Equipments.Height = (pHeight == null ? 0 : decimal.Parse(pHeight));
            objCVarTRCK_Equipments.GrossWeight = (pGrossWeight == null ? 0 : decimal.Parse(pGrossWeight));
            objCVarTRCK_Equipments.AllowedWeight = (pAllowedWeight == null ? 0 : decimal.Parse(pAllowedWeight));
            objCVarTRCK_Equipments.NoOfPrimaryWheels = (pNoOfPrimaryWheels == null ? 0 : int.Parse(pNoOfPrimaryWheels));
            objCVarTRCK_Equipments.NoOfAdditionalWheels = (pNoOfAdditionalWheels == null ? 0 : int.Parse(pNoOfAdditionalWheels));
            objCVarTRCK_Equipments.AxeCount = (pAxeCount == null ? 0 : int.Parse(pAxeCount));
            objCVarTRCK_Equipments.ExaminationExpireDate = pExaminationExpireDate;
            objCVarTRCK_Equipments.InsuranceDate = pInsuranceDate;
            objCVarTRCK_Equipments.WorkingDate = pWorkingDate;
            objCVarTRCK_Equipments.InsuranceBill = (pInsuranceBill == null ? "" : pInsuranceBill.Trim().ToUpper());
            objCVarTRCK_Equipments.InsuranceCompanyID = int.Parse(pInsuranceCompanyID);
            objCVarTRCK_Equipments.TaxEndDate = pTaxEndDate;
            objCVarTRCK_Equipments.EquipmentModelID = int.Parse(pEquipmentModelID);
            objCVarTRCK_Equipments.ServiceCenterID = int.Parse(pServiceCenterID);
            objCVarTRCK_Equipments.CompanyID = int.Parse(pCompanyID);

            objCVarTRCK_Equipments.InsuranceValue = (pInsuranceValue == null ? "" : pInsuranceValue.Trim().ToUpper());
            objCVarTRCK_Equipments.Notes = (pNotes == null ? "" : pNotes.Trim().ToUpper());
            objCVarTRCK_Equipments.TrailerID = int.Parse(pTrailerID);
            objCVarTRCK_Equipments.MotorNo = (pMotorNo == null ? "" : pMotorNo.Trim().ToUpper());
            objCVarTRCK_Equipments.FirstCounter = int.Parse(pFirstCounter);
            
            objCVarTRCK_Equipments.IsInactive = bool.Parse(pIsInactive);
            objCVarTRCK_Equipments.IsDeleted = false;

            objCVarTRCK_Equipments.TimeLocked = DateTime.Parse("01-01-1900");
            objCVarTRCK_Equipments.LockingUserID = 0;

            objCVarTRCK_Equipments.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarTRCK_Equipments.ModificationDate = DateTime.Now;

            objCVarTRCK_Equipments.NumberOfChambers = (pNumberOfChambers == null ? 0 : pNumberOfChambers);
            objCVarTRCK_Equipments.ChambersVolumeInLiters = (pChambersVolumeInLiters == null ? 0 : pChambersVolumeInLiters);
            objCVarTRCK_Equipments.TankerEmptyWeight = (pTankerEmptyWeight == null ? 0 : pTankerEmptyWeight);
            objCVarTRCK_Equipments.OutletID = (pOutlet == null ? 0 : pOutlet);
            
            objCVarTRCK_Equipments.IsHeating = pIsHeating;
            objCVarTRCK_Equipments.IsHeatable = pIsHeatable;
            objCVarTRCK_Equipments.IsEpump = pIsEpump;
            objCVarTRCK_Equipments.IsCompressor = pIsCompressor;
            objCVarTRCK_Equipments.IsGroundOperated = pIsGroundOperated;
            objCVarTRCK_Equipments.IsATP = pIsATP;
            objCVarTRCK_Equipments.IsGPS = pIsGPS;

            objCVarTRCK_Equipments.Model = pModel;
            objCVarTRCK_Equipments.WheelSize = pWheelSize;

            objCVarTRCK_Equipments.EquipmentTypeID = pEquipmentTypeID;
            objCVarTRCK_Equipments.NumberOfChairs = pNumberOfChairs;
            objCVarTRCK_Equipments.ExchangePermission = 0;
            objCVarTRCK_Equipments.StorgePermission = 0;
            objCVarTRCK_Equipments.HouseID = 0;

            CTRCK_Equipments objCTRCK_Equipments = new CTRCK_Equipments();
            objCTRCK_Equipments.lstCVarTRCK_Equipments.Add(objCVarTRCK_Equipments);
            Exception checkException = objCTRCK_Equipments.SaveMethod(objCTRCK_Equipments.lstCVarTRCK_Equipments);
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
                        objCTRCK_Equipments.UpdateList("SubAccountID=" + objCVarA_SubAccounts.ID + " WHERE ID=" + objCVarTRCK_Equipments.ID);
                    }
                    #endregion Insert
                }
                #endregion Create SubAccount

                //TRCK_Equipment_Items
                CTRCK_Equipment_Items objCTRCK_Equipment_Items = new CTRCK_Equipment_Items();
                if (pIDList != null)
                {
                    for (int i = 0; i < pIDList.Split(',').Length; i++)
                    {
                        CVarTRCK_Equipment_Items objCVarTRCK_Equipment_Items = new CVarTRCK_Equipment_Items();
                        objCVarTRCK_Equipment_Items.ID = Convert.ToInt32(pIDList.Split(',')[i]);
                        objCVarTRCK_Equipment_Items.TRCK_EquipmentID = objCVarTRCK_Equipments.ID;
                        objCVarTRCK_Equipment_Items.IsWheel = false;
                        objCVarTRCK_Equipment_Items.ItemID = Convert.ToInt32(pItemID.Split(',')[i]);
                        objCVarTRCK_Equipment_Items.LastTruckCounter = Convert.ToInt32(pLastTruckCounter.Split(',')[i]);
                        objCVarTRCK_Equipment_Items.ModificationDate = Convert.ToDateTime(pDate.Split(',')[i]);
                        objCVarTRCK_Equipment_Items.ModificatorUserID = WebSecurity.CurrentUserId;
                        objCVarTRCK_Equipment_Items.CreationDate = DateTime.Now;
                        objCVarTRCK_Equipment_Items.CreationUserID = WebSecurity.CurrentUserId;
                        objCVarTRCK_Equipment_Items.Remarks = pDescription.Split(',')[i];
                        #region wheels
                        objCVarTRCK_Equipment_Items.SLHeadLeft1Out = 0;
                        objCVarTRCK_Equipment_Items.SLHeadLeft1IN = 0;
                        objCVarTRCK_Equipment_Items.SLHeadLeft2Out = 0;
                        objCVarTRCK_Equipment_Items.SLHeadLeft2IN = 0;
                        objCVarTRCK_Equipment_Items.SLHeadLeft3Out = 0;
                        objCVarTRCK_Equipment_Items.SLHeadLeft3IN = 0;
                        objCVarTRCK_Equipment_Items.SLHeadRight1Out = 0;
                        objCVarTRCK_Equipment_Items.SLHeadRight1IN = 0;
                        objCVarTRCK_Equipment_Items.SLHeadRight2Out = 0;
                        objCVarTRCK_Equipment_Items.SLHeadRight2IN = 0;
                        objCVarTRCK_Equipment_Items.SLHeadRight3Out = 0;
                        objCVarTRCK_Equipment_Items.SLHeadRight3IN = 0;
                        objCVarTRCK_Equipment_Items.SLTrailLeft1Out = 0;
                        objCVarTRCK_Equipment_Items.SLTrailLeft1IN = 0;
                        objCVarTRCK_Equipment_Items.SLTrailLeft2Out = 0;
                        objCVarTRCK_Equipment_Items.SLTrailLeft2IN = 0;
                        objCVarTRCK_Equipment_Items.SLTrailLeft3Out = 0;
                        objCVarTRCK_Equipment_Items.SLTrailLeft3IN = 0;
                        objCVarTRCK_Equipment_Items.SLTrailLeft4Out = 0;
                        objCVarTRCK_Equipment_Items.SLTrailLeft4IN = 0;
                        objCVarTRCK_Equipment_Items.SLTrailLeft5Out = 0;
                        objCVarTRCK_Equipment_Items.SLTrailLeft5IN = 0;
                        objCVarTRCK_Equipment_Items.SLTrailRight1Out = 0;
                        objCVarTRCK_Equipment_Items.SLTrailRight1IN = 0;
                        objCVarTRCK_Equipment_Items.SLTrailRight2Out = 0;
                        objCVarTRCK_Equipment_Items.SLTrailRight2IN = 0;
                        objCVarTRCK_Equipment_Items.SLTrailRight3Out = 0;
                        objCVarTRCK_Equipment_Items.SLTrailRight3IN = 0;
                        objCVarTRCK_Equipment_Items.SLTrailRight4Out = 0;
                        objCVarTRCK_Equipment_Items.SLTrailRight4IN = 0;
                        objCVarTRCK_Equipment_Items.SLTrailRight5Out = 0;
                        objCVarTRCK_Equipment_Items.SLTrailRight5IN = 0;
                        #endregion

                        objCTRCK_Equipment_Items.lstCVarTRCK_Equipment_Items.Add(objCVarTRCK_Equipment_Items);
                    }

                    checkException = objCTRCK_Equipment_Items.SaveMethod(objCTRCK_Equipment_Items.lstCVarTRCK_Equipment_Items);

                }

                #region wheel
                //delete all first
                CCustomizedDBCall objCCustomizedDBCall2 = new CCustomizedDBCall();
                objCCustomizedDBCall2.CallStringFunction("DELETE FROM TRCK_Equipment_Items WHERE IsWheel=1 and TRCK_EquipmentID = " + objCVarTRCK_Equipments.ID);

                CVarTRCK_Equipment_Items objCVarTRCK_Equipment_ItemsWheel = new CVarTRCK_Equipment_Items();
                objCVarTRCK_Equipment_ItemsWheel.ID = 0;
                objCVarTRCK_Equipment_ItemsWheel.TRCK_EquipmentID = objCVarTRCK_Equipments.ID;
                objCVarTRCK_Equipment_ItemsWheel.IsWheel = true;
                objCVarTRCK_Equipment_ItemsWheel.ItemID = 0;
                objCVarTRCK_Equipment_ItemsWheel.LastTruckCounter = 0;
                objCVarTRCK_Equipment_ItemsWheel.ModificationDate = DateTime.Parse("01-01-1900");
                objCVarTRCK_Equipment_ItemsWheel.ModificatorUserID = WebSecurity.CurrentUserId;
                objCVarTRCK_Equipment_ItemsWheel.CreationDate = DateTime.Now;
                objCVarTRCK_Equipment_ItemsWheel.CreationUserID = WebSecurity.CurrentUserId;
                objCVarTRCK_Equipment_ItemsWheel.Remarks = "0";

                #region wheels
                objCVarTRCK_Equipment_ItemsWheel.SLHeadLeft1Out = int.Parse(pSLHeadLeft1Out);
                objCVarTRCK_Equipment_ItemsWheel.SLHeadLeft1IN = int.Parse(pSLHeadLeft1IN); ;
                objCVarTRCK_Equipment_ItemsWheel.SLHeadLeft2Out = int.Parse(pSLHeadLeft2Out);
                objCVarTRCK_Equipment_ItemsWheel.SLHeadLeft2IN = int.Parse(pSLHeadLeft2IN);
                objCVarTRCK_Equipment_ItemsWheel.SLHeadLeft3Out = int.Parse(pSLHeadLeft3Out);
                objCVarTRCK_Equipment_ItemsWheel.SLHeadLeft3IN = int.Parse(pSLHeadLeft3IN);
                objCVarTRCK_Equipment_ItemsWheel.SLHeadRight1Out = int.Parse(pSLHeadRight1Out);
                objCVarTRCK_Equipment_ItemsWheel.SLHeadRight1IN = int.Parse(pSLHeadRight1IN);
                objCVarTRCK_Equipment_ItemsWheel.SLHeadRight2Out = int.Parse(pSLHeadRight2Out);
                objCVarTRCK_Equipment_ItemsWheel.SLHeadRight2IN = int.Parse(pSLHeadRight2IN);
                objCVarTRCK_Equipment_ItemsWheel.SLHeadRight3Out = int.Parse(pSLHeadRight3Out);
                objCVarTRCK_Equipment_ItemsWheel.SLHeadRight3IN = int.Parse(pSLHeadRight3IN);
                objCVarTRCK_Equipment_ItemsWheel.SLTrailLeft1Out = int.Parse(pSLTrailLeft1Out);
                objCVarTRCK_Equipment_ItemsWheel.SLTrailLeft1IN = int.Parse(pSLTrailLeft1IN);
                objCVarTRCK_Equipment_ItemsWheel.SLTrailLeft2Out = int.Parse(pSLTrailLeft2Out);
                objCVarTRCK_Equipment_ItemsWheel.SLTrailLeft2IN = int.Parse(pSLTrailLeft2IN);
                objCVarTRCK_Equipment_ItemsWheel.SLTrailLeft3Out = int.Parse(pSLTrailLeft3Out);
                objCVarTRCK_Equipment_ItemsWheel.SLTrailLeft3IN = int.Parse(pSLTrailLeft3IN);
                objCVarTRCK_Equipment_ItemsWheel.SLTrailLeft4Out = int.Parse(pSLTrailLeft4Out);
                objCVarTRCK_Equipment_ItemsWheel.SLTrailLeft4IN = int.Parse(pSLTrailLeft4IN);
                objCVarTRCK_Equipment_ItemsWheel.SLTrailLeft5Out = int.Parse(pSLTrailLeft5Out);
                objCVarTRCK_Equipment_ItemsWheel.SLTrailLeft5IN = int.Parse(pSLTrailLeft5IN);
                objCVarTRCK_Equipment_ItemsWheel.SLTrailRight1Out = int.Parse(pSLTrailRight1Out);
                objCVarTRCK_Equipment_ItemsWheel.SLTrailRight1IN = int.Parse(pSLTrailRight1IN);
                objCVarTRCK_Equipment_ItemsWheel.SLTrailRight2Out = int.Parse(pSLTrailRight2Out);
                objCVarTRCK_Equipment_ItemsWheel.SLTrailRight2IN = int.Parse(pSLTrailRight2IN);
                objCVarTRCK_Equipment_ItemsWheel.SLTrailRight3Out = int.Parse(pSLTrailRight3Out);
                objCVarTRCK_Equipment_ItemsWheel.SLTrailRight3IN = int.Parse(pSLTrailRight3IN);
                objCVarTRCK_Equipment_ItemsWheel.SLTrailRight4Out = int.Parse(pSLTrailRight4Out);
                objCVarTRCK_Equipment_ItemsWheel.SLTrailRight4IN = int.Parse(pSLTrailRight4IN);
                objCVarTRCK_Equipment_ItemsWheel.SLTrailRight5Out = int.Parse(pSLTrailRight5Out);
                objCVarTRCK_Equipment_ItemsWheel.SLTrailRight5IN = int.Parse(pSLTrailRight5IN);
                #endregion
                objCTRCK_Equipment_Items.lstCVarTRCK_Equipment_Items.Add(objCVarTRCK_Equipment_ItemsWheel);
                checkException = objCTRCK_Equipment_Items.SaveMethod(objCTRCK_Equipment_Items.lstCVarTRCK_Equipment_Items);
                #endregion
              


                if (checkException != null) // an exception is caught in the model
                {
                    if (checkException.Message.Contains("UNIQUE"))
                        _result = false;
                }
            }
            return _result;
        }

        // [Route("api/TRCK_Equipments/Delete/{pTRCK_EquipmentsIDs}")]
        [HttpGet, HttpPost]
        public bool Delete(String pTRCK_EquipmentsIDs)
        {
            bool _result = false;
            CTRCK_Equipments objCTRCK_Equipments = new CTRCK_Equipments();
            foreach (var currentID in pTRCK_EquipmentsIDs.Split(','))
            {
                objCTRCK_Equipments.lstDeletedCPKTRCK_Equipments.Add(new CPKTRCK_Equipments() { ID = Int32.Parse(currentID.Trim()) });
            }

            Exception checkException = objCTRCK_Equipments.DeleteItem(objCTRCK_Equipments.lstDeletedCPKTRCK_Equipments);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("DELETE")) // some or all of the rows were not deleted due to dependencies
                    _result = false;
            }
            else //deleted successfully and no dependencies, so set is deleted in addresses and contacts to 1 by a trigger
                _result = true;
            return _result;
        }
        
        public bool TRCK_Equipment_Items_Delete(String pDeletedEquipmentItemsIDs)
        {
            bool _result = false;
            CTRCK_Equipment_Items objCTRCK_Equipment_Items = new CTRCK_Equipment_Items();
            foreach (var currentID in pDeletedEquipmentItemsIDs.Split(','))
            {
                objCTRCK_Equipment_Items.lstDeletedCPKTRCK_Equipment_Items.Add(new CPKTRCK_Equipment_Items() { ID = Int32.Parse(currentID.Trim()) });
            }

            Exception checkException = objCTRCK_Equipment_Items.DeleteItem(objCTRCK_Equipment_Items.lstDeletedCPKTRCK_Equipment_Items);
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
        public object[] GetLastTruckCounter(Int32 pEquipmentID)
        {
            CRoutings objCRoutings = new CRoutings();
          
            objCRoutings.GetList(" Where EquipmentID = " + pEquipmentID);
             
            return new object[] { new JavaScriptSerializer().Serialize(objCRoutings.lstCVarRoutings)};
        }

        
        [HttpGet, HttpPost]
        public object[] LoadTRCK_Equipment_Items(Int32 pEquipmentID_LoadItem)
        {
            CTRCK_Equipment_Items objCTRCK_Equipment_Items = new CTRCK_Equipment_Items();
            objCTRCK_Equipment_Items.GetList(" Where IsWheel=0 and TRCK_EquipmentID = " + pEquipmentID_LoadItem);

            return new object[] { new JavaScriptSerializer().Serialize(objCTRCK_Equipment_Items.lstCVarTRCK_Equipment_Items) };
        }

        [HttpGet, HttpPost]
        public object[] LoadTRCK_Equipment_ItemsWheels(Int32 pEquipmentID_LoadItem)
        {
            CTRCK_Equipment_Items objCTRCK_Equipment_Items = new CTRCK_Equipment_Items();
            objCTRCK_Equipment_Items.GetList(" Where IsWheel=1 and TRCK_EquipmentID = " + pEquipmentID_LoadItem);

            return new object[] { new JavaScriptSerializer().Serialize(objCTRCK_Equipment_Items.lstCVarTRCK_Equipment_Items) };
        }
    }
}

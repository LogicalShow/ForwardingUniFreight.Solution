using ExcelDataReader;
using Forwarding.MvcApp.Models.Administration.Security.Generated;
using Forwarding.MvcApp.Models.Administration.Settings.Generated;
using Forwarding.MvcApp.Models.Customized;
using Forwarding.MvcApp.Models.MasterData.Invoicing.Generated;
using Forwarding.MvcApp.Models.MasterData.Others.Generated;
using Forwarding.MvcApp.Models.MasterData.Partners.Generated;
using Forwarding.MvcApp.Models.NoAccess.Generated;
using Forwarding.MvcApp.Models.SC.MasterData.Generated;
using Forwarding.MvcApp.Models.Warehousing.MasterData.Generated;
using Forwarding.MvcApp.Models.Warehousing.Transactions.Generated;
using Forwarding.MvcApp.Models.XML;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Http;
using System.Web.Script.Serialization;
using System.Web.Services.Description;
using WebMatrix.WebData;
using static System.Windows.Forms.VisualStyles.VisualStyleElement.Rebar;

namespace Forwarding.MvcApp.Controllers.MasterData.API_Invoicing
{
    public class PurchaseItemController : ApiController
    {
        #region PurchaseItem
        [HttpGet, HttpPost]
        public Object[] LoadAll(string pWhereClause)
        {
			CvwPurchaseItem objCvwPurchaseItem = new CvwPurchaseItem();
			objCvwPurchaseItem.GetList(pWhereClause);

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[] { serializer.Serialize(objCvwPurchaseItem.lstCVarvwPurchaseItem) };
        }
		[HttpGet, HttpPost]
		public Object[] LoadStockUnits(string pWhereClause)
		{
			CvwWH_PackageTypeConversion objCvwWH_PackageTypeConversion = new CvwWH_PackageTypeConversion();
			objCvwWH_PackageTypeConversion.GetList(pWhereClause);
		
			var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
			return new Object[] { serializer.Serialize(objCvwWH_PackageTypeConversion.lstCVarvwWH_PackageTypeConversion) };
		}
		[HttpGet, HttpPost]
        public Object[] LoadHeaderWithDetails(Int64 pPurchaseItemHeaderID)
        {
            Exception checkException = null;
            int _RowCount = 0;
            CvwPurchaseItem objCvwPurchaseItem = new CvwPurchaseItem();
            checkException = objCvwPurchaseItem.GetListPaging(1, 1, "WHERE ID=" + pPurchaseItemHeaderID.ToString(), "ID", out _RowCount);
            CvwWH_PackageTypeBarCode objCvwWH_PackageTypeBarCode = new CvwWH_PackageTypeBarCode();
            objCvwWH_PackageTypeBarCode.GetList("WHERE PurchaseItemID=" + pPurchaseItemHeaderID.ToString() + " ORDER BY PackageTypeName");
            CvwWH_PackageTypeConversion objCvwWH_PackageTypeConversion = new CvwWH_PackageTypeConversion();
            objCvwWH_PackageTypeConversion.GetList("WHERE PurchaseItemID=" + pPurchaseItemHeaderID.ToString() + " ORDER BY FromPackageTypeName, ToPackageTypeName");
            
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[] { 
                serializer.Serialize(objCvwPurchaseItem.lstCVarvwPurchaseItem[0]) //pData[0]
                , serializer.Serialize(objCvwWH_PackageTypeBarCode.lstCVarvwWH_PackageTypeBarCode) //pData[1]
                , serializer.Serialize(objCvwWH_PackageTypeConversion.lstCVarvwWH_PackageTypeConversion) //pData[2]
            };
        }

        [HttpGet, HttpPost]
        public Object[] LoadWithPaging(Int32 pPageNumber, Int32 pPageSize, string pSearchKey)
        {
            CvwPurchaseItem objCvwPurchaseItem = new CvwPurchaseItem();
            CCommodities objCCommodities = new CCommodities();
            CPackageTypes objCPackageTypes = new CPackageTypes();
            CvwNoAccessUnit objCvwNoAccessUnit = new CvwNoAccessUnit();
            CNoAccessIMOClass objCNoAccessIMOClass = new CNoAccessIMOClass();
            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
            //********* For ERP ***********************************************
            CI_ItemsGroups cI_ItemsGroups = new CI_ItemsGroups();
            CI_ItemsTypes cI_ItemsTypes = new CI_ItemsTypes();
            cI_ItemsTypes.GetList("where 1 = 1");
            cI_ItemsGroups.GetList("where 1 = 1 ");
            //*****************************************************************
            CWH_Area objCWH_Area = new CWH_Area();
            var constLengthUnitTypeID = 10;
            var constWeightUnitTypeID = 20;
            //var constAreaUnitTypeID = 30;
            var constVolumeUnitTypeID = 40;
            //var constTemperatureUnitTypeID = 50;
            objCvwNoAccessUnit.GetList("ORDER BY Code");
            objCNoAccessIMOClass.GetList("ORDER BY Code");
            objCWH_Area.GetList(" order by Name ");
            var CustomersList = objCCustomizedDBCall.ExecuteQuery_ListOfObjects(
                "select ID,Name from Customers WHERE IsDeleted = 0"
                , typeof(CVarCustomers)).Cast<CVarCustomers>().ToList();
            var objCLengthUnit = objCvwNoAccessUnit.lstCVarvwNoAccessUnit.Where(w => w.UnitTypeID == constLengthUnitTypeID);
            var objCWeightUnit = objCvwNoAccessUnit.lstCVarvwNoAccessUnit.Where(w => w.UnitTypeID == constWeightUnitTypeID);
            var objCVolumeUnit = objCvwNoAccessUnit.lstCVarvwNoAccessUnit.Where(w => w.UnitTypeID == constVolumeUnitTypeID);
            objCCommodities.GetList("ORDER By Name");
            objCPackageTypes.GetList("ORDER By Name");

            pSearchKey = (pSearchKey == null ? "" : pSearchKey.Trim().ToUpper());
            Int32 _RowCount = objCvwPurchaseItem.lstCVarvwPurchaseItem.Count;
            string whereClause = " Where Code LIKE N'%" + pSearchKey + "%' "
                + " OR Name LIKE N'%" + pSearchKey + "%' "
                + " OR LocalName LIKE N'%" + pSearchKey + "%' "
                + " OR PartNumber LIKE N'%" + pSearchKey + "%' "
                + " OR HSCode LIKE N'%" + pSearchKey + "%' "
                + " OR CurrencyCode LIKE N'%" + pSearchKey + "%' ";
            objCvwPurchaseItem.GetListPaging(pPageSize, pPageNumber, whereClause, "Code", out _RowCount);
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[] {
                serializer.Serialize(objCvwPurchaseItem.lstCVarvwPurchaseItem)
                , _RowCount 
                , serializer.Serialize(objCLengthUnit) //pLengthUnit = pData[2];
                , serializer.Serialize(objCWeightUnit) //pWeightUnit = pData[3];
                , serializer.Serialize(objCVolumeUnit) //pVolumeUnit = pData[4];
                , serializer.Serialize(objCCommodities.lstCVarCommodities) //pCommodity = pData[5];
                , serializer.Serialize(objCPackageTypes.lstCVarPackageTypes) //pPackageType = pData[6];
                , serializer.Serialize(objCNoAccessIMOClass.lstCVarNoAccessIMOClass) //pIMOClass = pData[7];
                , serializer.Serialize(objCWH_Area.lstCVarWH_Area) //pArea = pData[8];
               , serializer.Serialize(cI_ItemsTypes.lstCVarI_ItemsTypes)
                , serializer.Serialize(cI_ItemsGroups.lstCVarI_ItemsGroups)
                , serializer.Serialize(CustomersList) //pData[11]
            };
        }

        [HttpGet, HttpPost]
		public Object[] LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned(bool pIsLoadArrayOfObjects, Int32 pPageNumber, Int32 pPageSize, string pWhereClause, string pOrderBy)
		{
			int _RowCount;
			CvwPurchaseItem objCvwPurchaseItem = new CvwPurchaseItem();
			objCvwPurchaseItem.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);

			CCommodities objCCommodities = new CCommodities();
			CPackageTypes objCPackageTypes = new CPackageTypes();
			CvwNoAccessUnit objCvwNoAccessUnit = new CvwNoAccessUnit();
			CNoAccessIMOClass objCNoAccessIMOClass = new CNoAccessIMOClass();
			CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
			//********* For ERP ***********************************************
			CI_ItemsGroups cI_ItemsGroups = new CI_ItemsGroups();
			CI_ItemsTypes cI_ItemsTypes = new CI_ItemsTypes();
			//*****************************************************************
			CWH_Area objCWH_Area = new CWH_Area();
			var CustomersList = new List<CVarCustomers>();

			var constLengthUnitTypeID = 10;
			var constWeightUnitTypeID = 20;
			//var constAreaUnitTypeID = 30;
			var constVolumeUnitTypeID = 40;
			//var constTemperatureUnitTypeID = 50;

			if (pIsLoadArrayOfObjects)
			{

				cI_ItemsTypes.GetList("where 1 = 1");
				cI_ItemsGroups.GetList("where 1 = 1 ");
				objCvwNoAccessUnit.GetList("ORDER BY Code");
				objCNoAccessIMOClass.GetList("ORDER BY Code");
				objCWH_Area.GetList(" order by Name ");
				CustomersList.AddRange(objCCustomizedDBCall.ExecuteQuery_ListOfObjects("select ID,Name from Customers WHERE IsDeleted = 0", typeof(CVarCustomers)).Cast<CVarCustomers>().ToList());
				objCCommodities.GetList("ORDER By Name");
				objCPackageTypes.GetList("ORDER By Name");
			}

			var objCLengthUnit = objCvwNoAccessUnit.lstCVarvwNoAccessUnit.Where(w => w.UnitTypeID == constLengthUnitTypeID);
			var objCWeightUnit = objCvwNoAccessUnit.lstCVarvwNoAccessUnit.Where(w => w.UnitTypeID == constWeightUnitTypeID);
			var objCVolumeUnit = objCvwNoAccessUnit.lstCVarvwNoAccessUnit.Where(w => w.UnitTypeID == constVolumeUnitTypeID);

			var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
			return new Object[] {
				serializer.Serialize(objCvwPurchaseItem.lstCVarvwPurchaseItem)
				, _RowCount
				, serializer.Serialize(objCLengthUnit) //pLengthUnit = pData[2];
                , serializer.Serialize(objCWeightUnit) //pWeightUnit = pData[3];
                , serializer.Serialize(objCVolumeUnit) //pVolumeUnit = pData[4];
                , serializer.Serialize(objCCommodities.lstCVarCommodities) //pCommodity = pData[5];
                , serializer.Serialize(objCPackageTypes.lstCVarPackageTypes) //pPackageType = pData[6];
                , serializer.Serialize(objCNoAccessIMOClass.lstCVarNoAccessIMOClass) //pIMOClass = pData[7];
                , serializer.Serialize(objCWH_Area.lstCVarWH_Area) //pArea = pData[8];
               , serializer.Serialize(cI_ItemsTypes.lstCVarI_ItemsTypes)
				, serializer.Serialize(cI_ItemsGroups.lstCVarI_ItemsGroups)
				, serializer.Serialize(CustomersList) //pData[11]
            };
		}

		[HttpGet, HttpPost]
        public object[] Insert(String pCode, String pName, String pLocalName, string pPartNumber, string pHSCode
            , Int32 pStockUnitQuantity, decimal pPrice, Int32 pCurrencyID, Int32 pAccountID, Int32 pSubAccountID, Int32 pCostCenterID
            , Int32 pViewOrder, string pNotes, string pModelNumber, string pBrandName, string pProductType
            //Warehouse parameters
            , Int32 pCommodityID, Int32 pPackageTypeID, decimal pGrossWeight, decimal pNetWeight, int pWeightUnitID
            , decimal pWidth, decimal pDepth, decimal pHeight, Int32 pLengthUnitID, decimal pVolume, Int32 pVolumeUnitID
            , bool pIsFragile, bool pIsIMO, Int32 pIMOClassID, Int32 pUN, Int32 pPG, Int32 pPreferredAreaID, bool pByExpireDate
            , bool pBySerialNo, bool pByLotNo,bool pByVehicle                //***** For ERP
                , string pGroupID
                , string pTypeID, decimal pMinLimit, int pClientID, int pOwnerID=0, decimal pGrossVolume=0, bool pBlindInbound=false)
        {
            bool _result = false;
            CVarPurchaseItem objCVarPurchaseItem = new CVarPurchaseItem();
            CvwDefaults objCvwDefaults = new CvwDefaults();
            //*********
            var objlastcode = new CPurchaseItem();
            
            objlastcode.GetList("WHERE Code = convert(nvarchar(100) , isnull(( select max(Convert(int, Code)) from PurchaseItem where isnumeric(Code) = 1) , 0 ))");
            var lastcode = objlastcode.lstCVarPurchaseItem.Count == 0 ? 0 : int.Parse(objlastcode.lstCVarPurchaseItem[0].Code);
            //********
            objCVarPurchaseItem.Code = (pCode == "AUTO" ? (lastcode + 1).ToString() : pCode);
            objCVarPurchaseItem.Name = pName;
            objCVarPurchaseItem.LocalName = pLocalName;
            objCVarPurchaseItem.PartNumber = pPartNumber;
            objCVarPurchaseItem.Price = pPrice;
            objCVarPurchaseItem.StockUnitQuantity = pStockUnitQuantity;
            objCVarPurchaseItem.CurrencyID = pCurrencyID;
            objCVarPurchaseItem.AccountID = pAccountID;
            objCVarPurchaseItem.SubAccountID = pSubAccountID;
            objCVarPurchaseItem.CostCenterID = pCostCenterID;
            objCVarPurchaseItem.ViewOrder = pViewOrder;
            objCVarPurchaseItem.Notes = pNotes;

            objCVarPurchaseItem.ModelNumber = pModelNumber;
            objCVarPurchaseItem.BrandName = pBrandName;
            objCVarPurchaseItem.ProductType = pProductType;

            //Warehouse parameters
            objCVarPurchaseItem.CommodityID = pCommodityID;
            objCVarPurchaseItem.PackageTypeID = pPackageTypeID;
            objCVarPurchaseItem.GrossWeight = pGrossWeight;
            objCVarPurchaseItem.NetWeight = pNetWeight;
            objCVarPurchaseItem.WeightUnitID = pWeightUnitID;
            objCVarPurchaseItem.Width = pWidth;
            objCVarPurchaseItem.Depth = pDepth;
            objCVarPurchaseItem.Height = pHeight;
            objCVarPurchaseItem.LengthUnitID = pLengthUnitID;
            objCVarPurchaseItem.Volume = pVolume;
            objCVarPurchaseItem.GrossVolume = pGrossVolume;
            objCVarPurchaseItem.VolumeUnitID = pVolumeUnitID;
            objCVarPurchaseItem.IsFragile = pIsFragile;
            objCVarPurchaseItem.IsIMO = pIsIMO;
            objCVarPurchaseItem.IMOClassID = pIMOClassID;
            objCVarPurchaseItem.UN = pUN;
            objCVarPurchaseItem.PG = pPG;
            objCVarPurchaseItem.HSCode = pHSCode;

            objCVarPurchaseItem.IsAddedFromExcel = false;
            objCVarPurchaseItem.IsFlexi = false;

            objCVarPurchaseItem.PreferredAreaID = pPreferredAreaID;
            objCVarPurchaseItem.ByExpireDate = pByExpireDate;
            objCVarPurchaseItem.BySerialNo = pBySerialNo;
            objCVarPurchaseItem.ByLotNo = pByLotNo;
            objCVarPurchaseItem.ByVehicle = pByVehicle;
            objCVarPurchaseItem.BlindInbound = pBlindInbound;

            // For ERP
            objCVarPurchaseItem.ParentGroupID = (pGroupID == null || pGroupID == "") ? 0 : int.Parse(pGroupID);
            objCVarPurchaseItem.ItemTypeID = (pTypeID == null || pTypeID == "") ? 0 : int.Parse(pTypeID);
            objCVarPurchaseItem.MaxQty = 0;
            objCVarPurchaseItem.MinQty = pMinLimit;

            //Client
            objCVarPurchaseItem.ClientID = pClientID;
            objCVarPurchaseItem.OwnerID = pOwnerID;
            #region Vehicle
            objCVarPurchaseItem.OperationID = 0;
            objCVarPurchaseItem.IsVehicle = false;
            objCVarPurchaseItem.EquipmentModelID = 0;
            objCVarPurchaseItem.MotorNumber = "0";
            objCVarPurchaseItem.ChassisNumber = "0";
            objCVarPurchaseItem.LotNumber = "0";
            objCVarPurchaseItem.SerialNumber = "0";
            #endregion Vehicle

            objCVarPurchaseItem.CreatorUserID = objCVarPurchaseItem.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarPurchaseItem.CreationDate = objCVarPurchaseItem.ModificationDate = DateTime.Now;

            CPurchaseItem objCPurchaseItem = new CPurchaseItem();
            objCPurchaseItem.lstCVarPurchaseItem.Add(objCVarPurchaseItem);
            Exception checkException = objCPurchaseItem.SaveMethod(objCPurchaseItem.lstCVarPurchaseItem);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else //not unique
                _result = true;
            return new object[] {
                _result
                , objCVarPurchaseItem.ID //pData[1]
                , objCVarPurchaseItem.CreationDate.Year //pData[2]
            };
        }

        [HttpGet, HttpPost]
        public object Update(Int64 pID, String pCode, String pName, String pLocalName, string pPartNumber, string pHSCode
            , Int32 pStockUnitQuantity, decimal pPrice, Int32 pCurrencyID, Int32 pAccountID, Int32 pSubAccountID, Int32 pCostCenterID
            , Int32 pViewOrder, string pNotes, string pModelNumber, string pBrandName, string pProductType
            //Warehouse parameters
            , Int32 pCommodityID, Int32 pPackageTypeID, decimal pGrossWeight, decimal pNetWeight, int pWeightUnitID
            , decimal pWidth, decimal pDepth, decimal pHeight, Int32 pLengthUnitID, decimal pVolume, Int32 pVolumeUnitID
            , bool pIsFragile, bool pIsIMO, Int32 pIMOClassID, Int32 pUN, Int32 pPG, Int32 pPreferredAreaID, bool pByExpireDate
            , bool pBySerialNo, bool pByLotNo, bool pByVehicle                //***** For ERP
                , string pGroupID
                , string pTypeID,decimal pMinLimit, int pClientID, int pOwnerID = 0, decimal pGrossVolume = 0, bool pBlindInbound = false)
        {
            bool _result = false;
            CVarPurchaseItem objCVarPurchaseItem = new CVarPurchaseItem();

            //the next 4 lines to get the CreatorUserID and CreationDate and set them as they were entered before
            CPurchaseItem objCGetCreationInformation = new CPurchaseItem();
            objCGetCreationInformation.GetItem(pID);
            objCVarPurchaseItem.CreatorUserID = objCGetCreationInformation.lstCVarPurchaseItem[0].CreatorUserID;
            objCVarPurchaseItem.CreationDate = objCGetCreationInformation.lstCVarPurchaseItem[0].CreationDate;
            objCVarPurchaseItem.IsAddedFromExcel = objCGetCreationInformation.lstCVarPurchaseItem[0].IsAddedFromExcel;
            objCVarPurchaseItem.IsFlexi = objCGetCreationInformation.lstCVarPurchaseItem[0].IsFlexi;
            #region Vehicle
            objCVarPurchaseItem.IsVehicle = objCGetCreationInformation.lstCVarPurchaseItem[0].IsVehicle;
            objCVarPurchaseItem.OperationID = objCGetCreationInformation.lstCVarPurchaseItem[0].OperationID;
            objCVarPurchaseItem.EquipmentModelID = objCGetCreationInformation.lstCVarPurchaseItem[0].EquipmentModelID;
            objCVarPurchaseItem.MotorNumber = objCGetCreationInformation.lstCVarPurchaseItem[0].MotorNumber;
            objCVarPurchaseItem.ChassisNumber = objCGetCreationInformation.lstCVarPurchaseItem[0].ChassisNumber;
            objCVarPurchaseItem.LotNumber = objCGetCreationInformation.lstCVarPurchaseItem[0].LotNumber;
            objCVarPurchaseItem.SerialNumber = objCGetCreationInformation.lstCVarPurchaseItem[0].SerialNumber;
            #endregion Vehicle

            objCVarPurchaseItem.ID = pID;
            objCVarPurchaseItem.Code = pCode;
            objCVarPurchaseItem.Name = pName;
            objCVarPurchaseItem.LocalName = pLocalName;
            objCVarPurchaseItem.PartNumber = pPartNumber;
            objCVarPurchaseItem.HSCode = pHSCode;

            objCVarPurchaseItem.StockUnitQuantity = pStockUnitQuantity;
            objCVarPurchaseItem.Price = pPrice;
            objCVarPurchaseItem.CurrencyID = pCurrencyID;
            objCVarPurchaseItem.AccountID = pAccountID;
            objCVarPurchaseItem.SubAccountID = pSubAccountID;
            objCVarPurchaseItem.CostCenterID = pCostCenterID;
            objCVarPurchaseItem.ViewOrder = pViewOrder;
            objCVarPurchaseItem.Notes = pNotes;

            objCVarPurchaseItem.ModelNumber = pModelNumber;
            objCVarPurchaseItem.BrandName = pBrandName;
            objCVarPurchaseItem.ProductType = pProductType;

            //Warehouse parameters
            objCVarPurchaseItem.CommodityID = pCommodityID;
            objCVarPurchaseItem.PackageTypeID = pPackageTypeID;
            objCVarPurchaseItem.GrossWeight = pGrossWeight;
            objCVarPurchaseItem.NetWeight = pNetWeight;
            objCVarPurchaseItem.WeightUnitID = pWeightUnitID;
            objCVarPurchaseItem.Width = pWidth;
            objCVarPurchaseItem.Depth = pDepth;
            objCVarPurchaseItem.Height = pHeight;
            objCVarPurchaseItem.LengthUnitID = pLengthUnitID;
            objCVarPurchaseItem.Volume = pVolume;
            objCVarPurchaseItem.GrossVolume = pGrossVolume;
            objCVarPurchaseItem.VolumeUnitID = pVolumeUnitID;
            objCVarPurchaseItem.IsFragile = pIsFragile;
            objCVarPurchaseItem.IsIMO = pIsIMO;
            objCVarPurchaseItem.IMOClassID = pIMOClassID;
            objCVarPurchaseItem.UN = pUN;
            objCVarPurchaseItem.PG = pPG;

            objCVarPurchaseItem.PreferredAreaID = pPreferredAreaID;
            objCVarPurchaseItem.ByExpireDate = pByExpireDate;
            objCVarPurchaseItem.BySerialNo = pBySerialNo;
            objCVarPurchaseItem.ByLotNo = pByLotNo;
            objCVarPurchaseItem.ByVehicle = pByVehicle;
            objCVarPurchaseItem.BlindInbound = pBlindInbound;

            objCVarPurchaseItem.CreatorUserID = objCVarPurchaseItem.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarPurchaseItem.CreationDate = objCVarPurchaseItem.ModificationDate = DateTime.Now;
            // For ERP
            objCVarPurchaseItem.ParentGroupID = (pGroupID == null || pGroupID == "") ? 0 : int.Parse(pGroupID);
            objCVarPurchaseItem.ItemTypeID = (pTypeID == null || pTypeID == "") ? 0 : int.Parse(pTypeID);
            objCVarPurchaseItem.MaxQty = 0;
            objCVarPurchaseItem.MinQty = pMinLimit;
            objCVarPurchaseItem.ClientID = pClientID;
            objCVarPurchaseItem.OwnerID = pOwnerID;
            CPurchaseItem objCPurchaseItem = new CPurchaseItem();
            objCPurchaseItem.lstCVarPurchaseItem.Add(objCVarPurchaseItem);
            Exception checkException = objCPurchaseItem.SaveMethod(objCPurchaseItem.lstCVarPurchaseItem);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else //not unique
                _result = true;
            return new object[] {
                _result
                , objCVarPurchaseItem.ID //pData[1]
                , objCVarPurchaseItem.CreationDate.Year //pData[2]
            };
        }

        [HttpGet, HttpPost]
        public object[] InsertList([FromBody] InsertList insertList)
        {
            string _ReturnMessage = "";
            Exception checkException = null;
            int _RowCount = 0;
            CPurchaseItem objCPurchaseItem = new CPurchaseItem();
            //CvwPurchaseItem objCvwPurchaseItem = new CvwPurchaseItem();
            CvwDefaults objCvwDefaults = new CvwDefaults();
            CvwNoAccessUnit objCvwNoAccessUnit = new CvwNoAccessUnit();
            objCvwDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount); //i am sure i ve just one row isa
            checkException = objCvwNoAccessUnit.GetList("WHERE 1=1");
            int _LengthUnitID = objCvwNoAccessUnit.lstCVarvwNoAccessUnit.Where(w => w.ID == objCvwDefaults.lstCVarvwDefaults[0].LengthUnitID).First().ID;
            int _WeightUnitID = objCvwNoAccessUnit.lstCVarvwNoAccessUnit.Where(w => w.ID == objCvwDefaults.lstCVarvwDefaults[0].WeightUnitID).First().ID;
            int _VolumeUnitID = objCvwNoAccessUnit.lstCVarvwNoAccessUnit.Where(w => w.ID == objCvwDefaults.lstCVarvwDefaults[0].VolumeUnitID).First().ID;
            int _NumberOfRows = insertList.pNameList.Split(',').Length;
            for (int i = 0; i < _NumberOfRows; i++)
            {
                CVarPurchaseItem objCVarPurchaseItem = new CVarPurchaseItem();
                objCVarPurchaseItem.Code = insertList.pCodeList.Split(',')[i];
                objCVarPurchaseItem.Name = insertList.pNameList.Split(',')[i];
                objCVarPurchaseItem.LocalName = insertList.pNameList.Split(',')[i];
                objCVarPurchaseItem.Price = Decimal.Parse(insertList.pPriceList.Split(',')[i]);
                objCVarPurchaseItem.GrossWeight = Decimal.Parse(insertList.pGrossWeightList.Split(',')[i]);
                objCVarPurchaseItem.NetWeight = Decimal.Parse(insertList.pNetWeightList.Split(',')[i]);
                objCVarPurchaseItem.Width = Decimal.Parse(insertList.pWidthList.Split(',')[i]);
                objCVarPurchaseItem.Depth = Decimal.Parse(insertList.pDepthList.Split(',')[i]);
                objCVarPurchaseItem.Height = Decimal.Parse(insertList.pHeightList.Split(',')[i]);
                objCVarPurchaseItem.Volume = Decimal.Parse(insertList.pVolumeList.Split(',')[i]);

                objCVarPurchaseItem.CurrencyID = objCvwDefaults.lstCVarvwDefaults[0].CurrencyID;
                objCVarPurchaseItem.PartNumber = insertList.pPartNumberList.Split(',')[i];
                objCVarPurchaseItem.HSCode = insertList.pHSCodeList.Split(',')[i];
                objCVarPurchaseItem.StockUnitQuantity = 0;

                objCVarPurchaseItem.Notes = "0";

                objCVarPurchaseItem.ModelNumber = insertList.pModelNumberList.Split(',')[i]; ;
                objCVarPurchaseItem.BrandName = insertList.pBrandNameList.Split(',')[i]; ;
                objCVarPurchaseItem.ProductType = insertList.pProductTypeList.Split(',')[i]; ;

                objCVarPurchaseItem.CreatorUserID = objCVarPurchaseItem.ModificatorUserID = WebSecurity.CurrentUserId;
                objCVarPurchaseItem.CreationDate = objCVarPurchaseItem.ModificationDate = DateTime.Now;

                objCVarPurchaseItem.WeightUnitID = _WeightUnitID;
                objCVarPurchaseItem.LengthUnitID = _LengthUnitID;
                objCVarPurchaseItem.VolumeUnitID = _VolumeUnitID;
                objCVarPurchaseItem.IsFragile = false;
                objCVarPurchaseItem.IsIMO = false;
                objCVarPurchaseItem.IsAddedFromExcel = true;
                objCVarPurchaseItem.IsFlexi = false;

                objCVarPurchaseItem.PreferredAreaID = 0;
                objCVarPurchaseItem.ByExpireDate = false;
                objCVarPurchaseItem.BySerialNo = false;
                objCVarPurchaseItem.ByLotNo = false;
                objCVarPurchaseItem.ByVehicle = false;
                objCVarPurchaseItem.ClientID = 0;
                #region Vehicle
                objCVarPurchaseItem.OperationID = 0;
                objCVarPurchaseItem.IsVehicle = false;
                objCVarPurchaseItem.EquipmentModelID = 0;
                objCVarPurchaseItem.MotorNumber = "0";
                objCVarPurchaseItem.ChassisNumber = "0";
                objCVarPurchaseItem.LotNumber = "0";
                objCVarPurchaseItem.SerialNumber = "0";
                #endregion Vehicle

                objCPurchaseItem.lstCVarPurchaseItem.Add(objCVarPurchaseItem);
            }
            checkException = objCPurchaseItem.SaveMethod(objCPurchaseItem.lstCVarPurchaseItem);
            if (checkException != null)
            {
                _ReturnMessage = checkException.Message;
            }
            return new object[] {
                _ReturnMessage
            };
        }
        
        [HttpGet, HttpPost]
        public bool Delete(String pPurchaseItemIDs)
        {
            bool _result = false;
            CPurchaseItem objCPurchaseItem = new CPurchaseItem();
            foreach (var currentID in pPurchaseItemIDs.Split(','))
            {
                objCPurchaseItem.lstDeletedCPKPurchaseItem.Add(new CPKPurchaseItem() { ID = Int32.Parse(currentID.Trim()) });
            }

            Exception checkException = objCPurchaseItem.DeleteItem(objCPurchaseItem.lstDeletedCPKPurchaseItem);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("DELETE")) // some or all of the rows were not deleted due to dependencies
                    _result = false;
            }
            else //deleted successfully
                _result = true;
            return _result;
        }
        #endregion PurchaseItem

        #region PackageTypeBarCode
        [HttpGet, HttpPost]
        public object[] PackageTypeBarCode_Save(Int64 pPackageTypeBarCodeID, Int64 pPurchaseItemID, Int32 pPackageTypeID
            , string pBarCode)
        {
            Exception checkException = null;
            CVarWH_PackageTypeBarCode objCVarWH_PackageTypeBarCode = new CVarWH_PackageTypeBarCode();
            CWH_PackageTypeBarCode objCWH_PackageTypeBarCode = new CWH_PackageTypeBarCode();
            CvwWH_PackageTypeBarCode objCvwWH_PackageTypeBarCode = new CvwWH_PackageTypeBarCode();

            objCVarWH_PackageTypeBarCode.ID = pPackageTypeBarCodeID;
            objCVarWH_PackageTypeBarCode.PurchaseItemID = pPurchaseItemID;
            objCVarWH_PackageTypeBarCode.PackageTypeID = pPackageTypeID;
            objCVarWH_PackageTypeBarCode.BarCode = pBarCode;

            objCWH_PackageTypeBarCode.lstCVarWH_PackageTypeBarCode.Add(objCVarWH_PackageTypeBarCode);
            checkException = objCWH_PackageTypeBarCode.SaveMethod(objCWH_PackageTypeBarCode.lstCVarWH_PackageTypeBarCode);

            checkException = objCvwWH_PackageTypeBarCode.GetList("WHERE PurchaseItemID=" + pPurchaseItemID.ToString() + " ORDER BY PackageTypeName");
            return new object[] {
                checkException == null ? true : false
                , new JavaScriptSerializer().Serialize(objCvwWH_PackageTypeBarCode.lstCVarvwWH_PackageTypeBarCode)
            };
        }

        [HttpGet, HttpPost]
        public object[] PackageTypeBarCode_Delete(string pPackageTypeBarCodeIDsToDelete, Int64 pPurchaseItemID)
        {
            Exception checkException = null;
            CWH_PackageTypeBarCode objCWH_PackageTypeBarCode = new CWH_PackageTypeBarCode();
            CvwWH_PackageTypeBarCode objCvwWH_PackageTypeBarCode = new CvwWH_PackageTypeBarCode();
            checkException = objCWH_PackageTypeBarCode.DeleteList("WHERE ID IN (" + pPackageTypeBarCodeIDsToDelete + ")");
            objCvwWH_PackageTypeBarCode.GetList("WHERE PurchaseItemID=" + pPurchaseItemID.ToString());
            return new object[] {
                checkException == null ? true : false
                , new JavaScriptSerializer().Serialize(objCvwWH_PackageTypeBarCode.lstCVarvwWH_PackageTypeBarCode)
            };
        }
        #endregion PackageTypeBarCode

        #region PackageTypeConversion
        [HttpGet, HttpPost]
        public object[] PackageTypeConversion_Save(Int64 pPackageTypeConversionID, Int64 pPurchaseItemID
            , Int32 pFromPackageTypeID, Int32 pToPackageTypeID, decimal pFactor)
        {
            Exception checkException = null;
            CVarWH_PackageTypeConversion objCVarWH_PackageTypeConversion = new CVarWH_PackageTypeConversion();
            CWH_PackageTypeConversion objCWH_PackageTypeConversion = new CWH_PackageTypeConversion();
            CvwWH_PackageTypeConversion objCvwWH_PackageTypeConversion = new CvwWH_PackageTypeConversion();

            objCVarWH_PackageTypeConversion.ID = pPackageTypeConversionID;
            objCVarWH_PackageTypeConversion.PurchaseItemID = pPurchaseItemID;
            objCVarWH_PackageTypeConversion.FromPackageTypeID = pFromPackageTypeID;
            objCVarWH_PackageTypeConversion.ToPackageTypeID = pToPackageTypeID;
            objCVarWH_PackageTypeConversion.Factor = pFactor;

            objCWH_PackageTypeConversion.lstCVarWH_PackageTypeConversion.Add(objCVarWH_PackageTypeConversion);
            checkException = objCWH_PackageTypeConversion.SaveMethod(objCWH_PackageTypeConversion.lstCVarWH_PackageTypeConversion);

            checkException = objCvwWH_PackageTypeConversion.GetList("WHERE PurchaseItemID=" + pPurchaseItemID.ToString() + " ORDER BY FromPackageTypeName, ToPackageTypeName");
            return new object[] {
                checkException == null ? true : false
                , new JavaScriptSerializer().Serialize(objCvwWH_PackageTypeConversion.lstCVarvwWH_PackageTypeConversion)
            };
        }

        [HttpGet, HttpPost]
        public object[] PackageTypeConversion_Delete(string pPackageTypeConversionIDsToDelete, Int64 pPurchaseItemID)
        {
            Exception checkException = null;
            CWH_PackageTypeConversion objCWH_PackageTypeConversion = new CWH_PackageTypeConversion();
            CvwWH_PackageTypeConversion objCvwWH_PackageTypeConversion = new CvwWH_PackageTypeConversion();
            checkException = objCWH_PackageTypeConversion.DeleteList("WHERE ID IN (" + pPackageTypeConversionIDsToDelete + ")");
            objCvwWH_PackageTypeConversion.GetList("WHERE PurchaseItemID=" + pPurchaseItemID.ToString());
            return new object[] {
                checkException == null ? true : false
                , new JavaScriptSerializer().Serialize(objCvwWH_PackageTypeConversion.lstCVarvwWH_PackageTypeConversion)
            };
        }
        #endregion PackageTypeConversion

        #region Uploading Document: used from most uploading screens(Customers, Suppliers, Transport Orders...)
        [HttpGet, HttpPost]
        public Object[] LoadFiles(string pFolderName, string pStrFolderPath)
        {
            string[] pDocsInFileNames = null;

            //---------------- **** Replace Invalid characters *********-----------------------------------------
            string regexSearch = "\\~#%&*{}/:<>?|\".";
            Regex r = new Regex(string.Format("[{0}]", Regex.Escape(regexSearch)));
            pFolderName = r.Replace(pFolderName, "_");
            //---------------- **** end of Replace Invalid characters *********-----------------------------------------




            var strPath = HttpContext.Current.Server.MapPath(pStrFolderPath) + pFolderName;
            if (Directory.Exists(strPath))
            {
                //to get filenames on a directory
                pDocsInFileNames = Directory.GetFiles(strPath);
                for (int i = 0; i < pDocsInFileNames.Length; i++)
                    pDocsInFileNames[i] = pDocsInFileNames[i].Substring(pDocsInFileNames[i].LastIndexOf('\\') + 1);
                //var filePath = files[0].Substring(0, files[0].LastIndexOf('\\'));
                //var firstFileName = files[0].Substring(files[0].LastIndexOf('/') + 1);
            }

            return new Object[] {
                new JavaScriptSerializer().Serialize(pDocsInFileNames)
            };
        }

        [HttpPost]
        public object[] UploadFile() //Multiple Files Upload
        {
            string[] pDocsInFileNames = null;// new String[2]; //to hold all the filenames as the return value
            ////List<String> pDocsInFileNames = new List<String>();
            if (HttpContext.Current.Request.Files.AllKeys.Any())
            {

                    var pFolderName = HttpContext.Current.Request.Form["pFolderName"];
                    var pStrFolderPath = HttpContext.Current.Request.Form["pStrFolderPath"];
                //---------------- **** Replace Invalid characters *********-----------------------------------------
                string regexSearch = "\\~#%&*{}/:<>?|\".";
                Regex r = new Regex(string.Format("[{0}]", Regex.Escape(regexSearch)));
                pFolderName = r.Replace(pFolderName, "_");
                //---------------- **** end of Replace Invalid characters *********-----------------------------------------

                var strFolderPath = Path.Combine(HttpContext.Current.Server.MapPath(pStrFolderPath + pFolderName));
                if (!Directory.Exists(strFolderPath))
                       Directory.CreateDirectory(strFolderPath); //for this line to work i ve to give permissions on the folder on the domain itself... otherwise the fn wouldn't be seen
                                                                  // Get the uploaded from the Files collection
                    if (HttpContext.Current.Request.Files.Count > 0)
                        for (int i = 0; i < HttpContext.Current.Request.Files.Count; i++)
                        {
                        var FileName = HttpContext.Current.Request.Files[i].FileName;
                        //---------------- **** Replace Invalid characters *********-----------------------------------------
                        string regexSearchfile = "\\~#%&*{}/:<>?|\"-";
                        Regex r1 = new Regex(string.Format("[{0}]", Regex.Escape(regexSearchfile)));
                        FileName = r1.Replace(FileName, "_");
                        //---------------- **** end of Replace Invalid characters *********-----------------------------------------
                        var FilePath = Path.Combine(strFolderPath, FileName);
                        HttpContext.Current.Request.Files[i].SaveAs(FilePath);
                        
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
        public object[] DeleteUploadedFile(string pFolderName, string pFileNames, string pStrFolderPath)
        {
            string[] pDocsInFileNames = null; //to hold all the filenames as the return value
                                              // Get the complete file path
            //---------------- **** Replace Invalid characters *********-----------------------------------------
            string regexSearch = "\\~#%&*{}/:<>?|\".";
            Regex r = new Regex(string.Format("[{0}]", Regex.Escape(regexSearch)));
            pFolderName = r.Replace(pFolderName, "_");
            //---------------- **** end of Replace Invalid characters *********-----------------------------------------
            var strPath = Path.Combine(HttpContext.Current.Server.MapPath(pStrFolderPath + pFolderName));
            foreach (var currentFileName in pFileNames.Split(','))
            {
                if (File.Exists(Path.Combine(strPath, currentFileName)))
                    File.Delete(Path.Combine(strPath, currentFileName));
            }

            if (Directory.Exists(strPath))
            {
                //to get filenames on a directory
                pDocsInFileNames = Directory.GetFiles(strPath);
                for (int i = 0; i < pDocsInFileNames.Length; i++)
                    pDocsInFileNames[i] = pDocsInFileNames[i].Substring(pDocsInFileNames[i].LastIndexOf('\\') + 1);
                //var filePath = files[0].Substring(0, files[0].LastIndexOf('\\'));
                //var firstFileName = files[0].Substring(files[0].LastIndexOf('/') + 1);
            }
            return new Object[] { new JavaScriptSerializer().Serialize(pDocsInFileNames) };
        }
        #endregion Uploading Documents

        [HttpGet, HttpPost]
        public object UploadExcel(bool pHasRequest)
        {
            int resultCode = 1;
            string exception = "";
            bool AllExcelRowsAreValid = true;
            List<string> MissingFields = new List<string>();
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
                        objCCommodities.GetList("WHERE 1=1");
                        CPackageTypes objCPackageTypes = new CPackageTypes();
                        objCPackageTypes.GetList("WHERE 1=1");
                       
                        List<PurchaseItemExcelRow> ExcelRowsToBeInserted = new List<PurchaseItemExcelRow>();
                        int count = 1;
                        foreach (DataRow row in result.Tables[0].Rows)
                        {
                            PurchaseItemExcelRow purchaseItemExcelRow = new PurchaseItemExcelRow
                            {
                                pIndex = count,
                                pName = row["Name"] == DBNull.Value ? "" : Convert.ToString(row["Name"]),
                                pCode = row["Code"] == DBNull.Value ? "" : Convert.ToString(row["Code"]),
                                pPartNumber = row["Part Number"] == DBNull.Value ? "" : Convert.ToString(row["Part Number"]),
                                pNotes = row["Notes"] == DBNull.Value ? "" : Convert.ToString(row["Notes"]),
                                pHSCode = row["HS Code"] == DBNull.Value ? "" : Convert.ToString(row["HS Code"]),
                                pStockUnitQty = row["Stock Unit Qty"] == DBNull.Value ? 0m : decimal.Parse(row["Stock Unit Qty"].ToString()),
                                pBrand = row["Brand"] == DBNull.Value ? "" : Convert.ToString(row["Brand"]),
                                pProductType = row["Product Type"] == DBNull.Value ? "" : Convert.ToString(row["Product Type"]),
                                pPrice = row["Price"] == DBNull.Value ? 0m : decimal.Parse(row["Price"].ToString()),
                                pMinQty = row["Min Qty"] == DBNull.Value ? 0m : decimal.Parse(row["Min Qty"].ToString()),
                                pGrossWeight = row["Gross(KG)"] == DBNull.Value ? 0m : decimal.Parse(row["Gross(KG)"].ToString()),
                                pNetWeight = row["NetWt(KG)"] == DBNull.Value ? 0m : decimal.Parse(row["NetWt(KG)"].ToString()),
                                pWidth = row["Width(CM)"] == DBNull.Value ? 0m : decimal.Parse(row["Width(CM)"].ToString()),
                                pDepth = row["Depth(CM)"] == DBNull.Value ? 0m : decimal.Parse(row["Depth(CM)"].ToString()),
                                pHeight = row["Height(CM)"] == DBNull.Value ? 0m : decimal.Parse(row["Height(CM)"].ToString()),
                                pVolume = row["Vol.(CBM)"] == DBNull.Value ? 0m : decimal.Parse(row["Vol.(CBM)"].ToString()),
                                pStockUnitID = 0,
                                pStockUnit = row["Stock Unit"] == DBNull.Value ? "" : Convert.ToString(row["Stock Unit"]),
                                pCommodityID = 0,
                                pCommodity = row["Commodity"] == DBNull.Value ? "" : Convert.ToString(row["Commodity"]),
                                pClientName = row["Client"] == DBNull.Value ? "" : Convert.ToString(row["Client"]),
                                pOwnerName = row["Project"] == DBNull.Value ? "" : Convert.ToString(row["Project"]),
								pByExpireDate = row["ByExpireDate"] == DBNull.Value ? false: Convert.ToBoolean(row["ByExpireDate"]),
								pByLotNo = row["ByLotNo"] == DBNull.Value ? false: Convert.ToBoolean(row["ByLotNo"]),
								pBySerialNo = row["BySerialNo"] == DBNull.Value ? false: Convert.ToBoolean(row["BySerialNo"])
                            };
                            count++;
                            var ValidationCheck = CheckExcelRowValidation(purchaseItemExcelRow, objCPackageTypes, objCCommodities) as ReturnedObjectAfterValidation;
                            ExcelRowsToBeInserted.Add(purchaseItemExcelRow);
                            purchaseItemExcelRow.pCommodityID = ValidationCheck.CommodityID;
                            purchaseItemExcelRow.pStockUnitID = ValidationCheck.StockUnitID;
                            if (ValidationCheck.MissingFields != "")
                                MissingFields.Add(ValidationCheck.MissingFields);
                            if (!ValidationCheck.IsValid)
                            {
                                AllExcelRowsAreValid = false;
                                break;
                            }
                        }

						var Clients = new List<SelectListOption>();
						var Owners = new List<SelectListOption>();
						if (pHasRequest)
						{
							CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
							if (AllExcelRowsAreValid)
							{
								if (ExcelRowsToBeInserted.Any(a => string.IsNullOrWhiteSpace(a.pClientName)))
								{
									AllExcelRowsAreValid = false;
									resultCode = 0;
									exception = $"Client is mandatory";
								}
								else
								{
									var ClientNames = "N'" + string.Join("',N'", ExcelRowsToBeInserted.Select(a => a.pClientName)) + "'";
									Clients.AddRange(objCCustomizedDBCall.ExecuteQuery_ListOfObjects($"select ID, Name from Customers WHERE Name in ({ClientNames})", typeof(SelectListOption)).Cast<SelectListOption>().ToList());
									if (Clients.Count != ExcelRowsToBeInserted.Select(a => a.pClientName).Distinct().Count())
									{
										AllExcelRowsAreValid = false;
										resultCode = 0;
										exception = $"Client is incorrect {string.Join(",", ExcelRowsToBeInserted.Where(a => Clients.All(b => b.Name.ToLower() != a.pClientName.ToLower())).Select(a => a.pClientName).Distinct())}";
									}
								}
							}

							if (AllExcelRowsAreValid)
							{
								if (ExcelRowsToBeInserted.Any(a => string.IsNullOrWhiteSpace(a.pOwnerName)))
								{
									AllExcelRowsAreValid = false;
									resultCode = 0;
									exception = $"Project is mandatory";
								}
								else
								{
									var OwnerNames = "N'" + string.Join("',N'", ExcelRowsToBeInserted.Select(a => a.pOwnerName)) + "'";
									Owners.AddRange(objCCustomizedDBCall.ExecuteQuery_ListOfObjects($"select ID, Name from Owners WHERE Name in ({OwnerNames})", typeof(SelectListOption)).Cast<SelectListOption>().ToList());
									if (Owners.Count != ExcelRowsToBeInserted.Select(a => a.pOwnerName).Distinct().Count())
									{
										AllExcelRowsAreValid = false;
										resultCode = 0;
										exception = $"Project is incorrect {string.Join(",", ExcelRowsToBeInserted.Where(a => Owners.All(b => b.Name.ToLower() != a.pOwnerName.ToLower())).Select(a=>a.pOwnerName).Distinct())}";
									}
								}
							}

							if (AllExcelRowsAreValid)
							{
								var groups = ExcelRowsToBeInserted.GroupBy(a => new { a.pOwnerID, a.pOwnerName, a.pCode });
								foreach (var group in groups)
								{
									if (group.Count() > 1)
									{
										AllExcelRowsAreValid = false;
										resultCode = 0;
										exception = $"Project({group.Key.pOwnerName}) Codes Duplicated\n {string.Join(",", group.Key.pCode)}";
										break;
									}
								}
							}
						}

						if (AllExcelRowsAreValid)
						{
							var Items = new List<CVarPurchaseItem>();
							CPurchaseItem objCPurchaseItem = new CPurchaseItem();
							foreach (PurchaseItemExcelRow row in ExcelRowsToBeInserted)
							{
								Items.Add(new CVarPurchaseItem
								{
									Code = row.pCode,
									Name = row.pName,
									LocalName = row.pName,
									PartNumber = row.pPartNumber,
									Price = row.pPrice,
									StockUnitQuantity = row.pStockUnitQty,
									CurrencyID = 0,
									AccountID = 0,
									SubAccountID = 0,
									CostCenterID = 0,
									ViewOrder = 0,
									Notes = row.pNotes,
									ModelNumber = "",
									BrandName = row.pBrand,
									ProductType = row.pProductType,
									CommodityID = row.pCommodityID,
									PackageTypeID = row.pStockUnitID,
									GrossWeight = row.pGrossWeight,
									NetWeight = row.pNetWeight,
									WeightUnitID = 0,
									Width = row.pWidth,
									Depth = row.pDepth,
									Height = row.pHeight,
									LengthUnitID = 0,
									Volume = row.pVolume,
									mVolumeUnitID = 0,
									IsFragile = false,
									IsIMO = false,
									IMOClassID = 0,
									UN = 0,
									PG = 0,
									HSCode = row.pHSCode,
									IsAddedFromExcel = true,
									IsFlexi = false,
									PreferredAreaID = 0,
									ByExpireDate = row.pByExpireDate,
									ByLotNo = row.pByLotNo,
									ByVehicle = false,
									ParentGroupID = 0,
									ItemTypeID = 0,
									MaxQty = 0,
									MinQty = row.pMinQty,
									OperationID = 0,
									IsVehicle = false,
									EquipmentModelID = 0,
									MotorNumber = "",
									ChassisNumber = "",
									LotNumber = "",
									SerialNumber = "",
									CreatorUserID = WebSecurity.CurrentUserId,
									CreationDate = DateTime.Now,
									ModificationDate = DateTime.Now,
									BySerialNo = row.pBySerialNo,
									ClientID = Convert.ToInt32(Clients.FirstOrDefault(a => a.Name == row.pClientName)?.ID),
									OwnerID = Convert.ToInt32(Owners.FirstOrDefault(a => a.Name == row.pOwnerName)?.ID),
								});
							}
							if (pHasRequest)
							{
								var Codes = "N'" + string.Join("',N'", Items.Select(a => a.Code)) + "'";
								var OwnerIDs = string.Join(",", Items.Select(a => a.OwnerID));
								objCPurchaseItem.GetList($"where Code in ({Codes}) and OwnerID in ({OwnerIDs})");
								if (objCPurchaseItem.lstCVarPurchaseItem.Count > 0)
								{
									AllExcelRowsAreValid = false;
									resultCode = 0;
									exception = $"Codes Already Existed\n {string.Join(",", objCPurchaseItem.lstCVarPurchaseItem.Select(a => a.Code))}";
									objCPurchaseItem.lstCVarPurchaseItem.Clear();
								}
							}
							if (AllExcelRowsAreValid)
							{

								foreach (var item in Items)
								{
									Exception ex = objCPurchaseItem.SaveMethod(new List<CVarPurchaseItem> { item });
								}
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
            return new {
                resultCode,
                MissingFields = MissingFields.Count > 0 ? string.Join(",", MissingFields) : "",
                exception 
            };
        }
        private object CheckExcelRowValidation(PurchaseItemExcelRow row, CPackageTypes PackageTypes, CCommodities Commodity)
        {
            List<string> MissingFields = new List<string>();
            ReturnedObjectAfterValidation obj = new ReturnedObjectAfterValidation();

			if(string.IsNullOrWhiteSpace(row.pCode) || row.pCode=="0")
			{
				MissingFields.Add("Code");
				obj.IsValid = false;
			}
			if (string.IsNullOrWhiteSpace(row.pName) || row.pName == "0")
			{
				MissingFields.Add("Name");
				obj.IsValid = false;
			}
			//Mandatory fields check (tockUnit,Commodity)
			if (row.pStockUnit == "" || PackageTypes.lstCVarPackageTypes.FirstOrDefault(x => x.Name == row.pStockUnit)?.ID == null)
            {
                MissingFields.Add("StockUnit");
                obj.IsValid = false;
            }
            else
                obj.StockUnitID = (int)PackageTypes.lstCVarPackageTypes.FirstOrDefault(x => x.Name == row.pStockUnit)?.ID;

            if (row.pCommodity == "" || Commodity.lstCVarCommodities.FirstOrDefault(x => x.Name == row.pCommodity)?.ID == null)
            {
                MissingFields.Add("Commodity");
                obj.IsValid = false;
            }
            else
                obj.CommodityID = (int)Commodity.lstCVarCommodities.FirstOrDefault(x => x.Name == row.pCommodity)?.ID;

            obj.MissingFields = MissingFields.Count == 0 ? "" : $"Row {row.pIndex} missing {string.Join(",", MissingFields)}";

            return obj;
        }

		[HttpGet,HttpPost]
		public object IsClientItemsRepeated(string pWhereClause)
		{
			CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
			var itemCode = objCCustomizedDBCall.CallStringFunction($"select Code from PurchaseItem {pWhereClause}");
			return !string.IsNullOrEmpty(itemCode);
		}

	}

    class ReturnedObjectAfterValidation
    {
        public bool IsValid { get; set; } = true;
        public string MissingFields { get; set; } = "";
        public int StockUnitID { get; set; } = 0;
        public int CommodityID { get; set; } = 0;
    }
    public class PurchaseItemExcelRow
    {
        public int pIndex { get; set; }
        public string pCode { get; set; }
        public string pName { get; set; }
        public string pPartNumber { get; set; }
        public string pNotes { get; set; }
        public string pHSCode { get; set; }
        public decimal pStockUnitQty { get; set; }
        public string pBrand { get; set; }
        public string pProductType { get; set; }
        public decimal pPrice { get; set; }
        public decimal pMinQty { get; set; }
        public decimal pGrossWeight { get; set; }
        public decimal pNetWeight { get; set; }
        public decimal pWidth { get; set; }
        public decimal pDepth { get; set; }
        public decimal pHeight { get; set; }
        public decimal pVolume { get; set; }
        public int pStockUnitID { get; set; }
        public string pStockUnit { get; set; }
        public int pCommodityID { get; set; }
        public string pCommodity { get; set; }
        public int pClientID { get; set; }
        public string pClientName { get; set; }
        public int pOwnerID { get; set; }
        public string pOwnerName { get; set; }
        public bool pByExpireDate { get; set; }
        public bool pByLotNo { get; set; }
        public bool pBySerialNo { get; set; }
    }
    public class InsertList
    {
        public string pCodeList { get; set; }
        public string pNameList { get; set; }
        public string pPartNumberList { get; set; }
        public string pHSCodeList { get; set; }
        public string pPriceList { get; set; }
        public string pGrossWeightList { get; set; }
        public string pNetWeightList { get; set; }
        public string pWidthList { get; set; }
        public string pDepthList { get; set; }
        public string pHeightList { get; set; }
        public string pVolumeList { get; set; }
        public string pModelNumberList { get; set; }
        public string pBrandNameList { get; set; }
        public string pProductTypeList { get; set; }
    }
}

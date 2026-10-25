using Forwarding.MvcApp.Controllers.MasterData.API_Invoicing;
using Forwarding.MvcApp.Models.Administration.Settings.Generated;
using Forwarding.MvcApp.Models.MasterData.Invoicing.Generated;
using Forwarding.MvcApp.Models.MasterData.Others.Generated;
using Forwarding.MvcApp.Models.NoAccess.Generated;
using Forwarding.MvcApp.Models.SC.MasterData.Generated;
using Forwarding.MvcApp.Models.SC.Transactions.Customized;
using Forwarding.MvcApp.Models.Warehousing.MasterData.Generated;
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

namespace Forwarding.MvcApp.Controllers.SC.I_ItemsGroups
{
    public class I_ItemsGroupsController : ApiController
    {
        #region PurchaseItem
        [HttpGet, HttpPost]
        public Object[] LoadAll(string pWhereClause)
        {
            CPurchaseItem objCPurchaseItem = new CPurchaseItem();
            objCPurchaseItem.GetList(pWhereClause);
            var pPurchaseItemList = objCPurchaseItem.lstCVarPurchaseItem
                .Select(s => new
                {
                    ID = s.ID
                    ,
                    Code = s.Code
                    ,
                    Name = s.Name
                })
                .Distinct().OrderBy(o => o.Code).ToList();
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[] { new JavaScriptSerializer().Serialize(objCPurchaseItem.lstCVarPurchaseItem) };
        }

        [HttpGet, HttpPost]
        public Object[] LoadHeaderWithDetails(Int64 pPurchaseItemHeaderID)
        {
            CvwPurchaseItem objCvwPurchaseItem = new CvwPurchaseItem();
            Int32 _RowCount = 0;

            //objCvwPurchaseItem.GetList("WHERE ID=" + pPurchaseItemHeaderID.ToString());
            if (pPurchaseItemHeaderID !=0 && pPurchaseItemHeaderID!=null)
            {
                objCvwPurchaseItem.GetListPaging(10000, 1, "where ID =" + pPurchaseItemHeaderID, "ID", out _RowCount);

            }
            else
            {
                objCvwPurchaseItem.GetListPaging(10000, 1, "where 1 = 1 ", "ID", out _RowCount);

            }


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
          //  CvwPurchaseItem objCvwPurchaseItem1 = new CvwPurchaseItem();
            CvwItemsTree objCvwPurchaseItem = new CvwItemsTree();
            CCommodities objCCommodities = new CCommodities();
            CPackageTypes objCPackageTypes = new CPackageTypes();
            CvwNoAccessUnit objCvwNoAccessUnit = new CvwNoAccessUnit();
            CNoAccessIMOClass objCNoAccessIMOClass = new CNoAccessIMOClass();
            //********* For ERP ***********************************************
            CI_ItemsGroups cI_ItemsGroups = new CI_ItemsGroups();
            CI_ItemsTypes cI_ItemsTypes  = new CI_ItemsTypes();
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
            var objCLengthUnit = objCvwNoAccessUnit.lstCVarvwNoAccessUnit.Where(w => w.UnitTypeID == constLengthUnitTypeID);
            var objCWeightUnit = objCvwNoAccessUnit.lstCVarvwNoAccessUnit.Where(w => w.UnitTypeID == constWeightUnitTypeID);
            var objCVolumeUnit = objCvwNoAccessUnit.lstCVarvwNoAccessUnit.Where(w => w.UnitTypeID == constVolumeUnitTypeID);
            objCCommodities.GetList("ORDER By Name");
            objCPackageTypes.GetList("ORDER By Name");

            pSearchKey = (pSearchKey == null ? "" : pSearchKey.Trim().ToUpper());
            Int32 _RowCount = objCvwPurchaseItem.lstCVarvwItemsTree.Count;
            string whereClause = " Where title LIKE '%" + pSearchKey + "%' "
                + " OR title LIKE '%" + pSearchKey + "%' ";
                //+ " OR LocalName LIKE '%" + pSearchKey + "%' "
                //+ " OR PartNumber LIKE '%" + pSearchKey + "%' "
                //+ " OR HSCode LIKE '%" + pSearchKey + "%' "
                //+ " OR CurrencyCode LIKE '%" + pSearchKey + "%' ";
            objCvwPurchaseItem.GetListPaging(10000, 1, "where 1 = 1 ", "title", out _RowCount);

            CPurchaseItem objCPurchaseItem = new CPurchaseItem();
            objCPurchaseItem.GetList(" Where 1=1");
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };

            return new Object[] {
                serializer.Serialize(objCvwPurchaseItem.lstCVarvwItemsTree)
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
                ,serializer.Serialize(objCPurchaseItem.lstCVarPurchaseItem)//11
            };
        }



        [HttpGet, HttpPost]
        public Object[] GetItemData(string pID , string pWhereCondition)
        {
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            CvwPurchaseItem objCvwPurchaseItem1 = new CvwPurchaseItem();

            objCvwPurchaseItem1.GetList("where ID = " + pID);
            return new Object[] {
                serializer.Serialize(objCvwPurchaseItem1.lstCVarvwPurchaseItem[0])
            };
        }
        [HttpGet, HttpPost]
        public Object[] GetAllItemsFromGroup(string pGroupID)
        {
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            CSC_Get_All_GroupItems cSC_Get_All_GroupItems = new CSC_Get_All_GroupItems();
            cSC_Get_All_GroupItems.GetList(int.Parse(pGroupID));
            return new Object[] {
                serializer.Serialize(cSC_Get_All_GroupItems.lstCVarSC_Get_All_GroupItems)
            };
        }


        [HttpGet, HttpPost]
        public object[] Insert(String pCode, String pName, String pLocalName, string pPartNumber, string pHSCode
            , decimal pPrice, Int32 pCurrencyID, Int32 pAccountID, Int32 pSubAccountID, Int32 pCostCenterID
            , Int32 pViewOrder, string pNotes
            //Warehouse parameters
            , Int32 pCommodityID, Int32 pPackageTypeID, decimal pGrossWeight, decimal pNetWeight, int pWeightUnitID
            , decimal pWidth, decimal pDepth, decimal pHeight, Int32 pLengthUnitID, decimal pVolume, Int32 pVolumeUnitID
            , bool pIsIMO, Int32 pIMOClassID, Int32 pUN, Int32 pPG, Int32 pPreferredAreaID, bool pByExpireDate
            , bool pBySerialNo, bool pByLotNo,bool pByVehicle
                //***** For ERP
                , string pGroupID, string pTypeID, int pReturnedItemID ,decimal pReturnedQuantity , decimal pExpectedAlarm , decimal pActualAlarm
                , decimal pMinimumLimit, decimal pMaximumLimit, decimal pReOrderlimit)
        {
            bool _result = false;
            CVarPurchaseItem objCVarPurchaseItem = new CVarPurchaseItem();
            CvwDefaults objCvwDefaults = new CvwDefaults();
            //*********
            var objlastcode = new CPurchaseItem();
            
            objlastcode.GetList("WHERE Code = convert(nvarchar(100) , isnull(( select max(Convert(int, Code)) from PurchaseItem where isnumeric(Code) = 1) , 0 ))");
            var lastcode = objlastcode.lstCVarPurchaseItem.Count == 0 ? 0 : int.Parse(objlastcode.lstCVarPurchaseItem[0].Code);
            //********
            objCVarPurchaseItem.Code = (lastcode + 1).ToString();
            objCVarPurchaseItem.Name = pName;
            objCVarPurchaseItem.LocalName = pLocalName;
            objCVarPurchaseItem.PartNumber = pPartNumber;

            objCVarPurchaseItem.StockUnitQuantity = 0;
            objCVarPurchaseItem.Price = pPrice;
            objCVarPurchaseItem.CurrencyID = pCurrencyID;
            objCVarPurchaseItem.AccountID = pAccountID;
            objCVarPurchaseItem.SubAccountID = pSubAccountID;
            objCVarPurchaseItem.CostCenterID = pCostCenterID;
            objCVarPurchaseItem.ViewOrder = pViewOrder;
            objCVarPurchaseItem.Notes = pNotes;
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
            objCVarPurchaseItem.VolumeUnitID = pVolumeUnitID;
            objCVarPurchaseItem.IsFragile = false;
            objCVarPurchaseItem.IsIMO = pIsIMO;
            objCVarPurchaseItem.IMOClassID = pIMOClassID;
            objCVarPurchaseItem.UN = pUN;
            objCVarPurchaseItem.PG = pPG;
            objCVarPurchaseItem.HSCode = pHSCode;

            objCVarPurchaseItem.ModelNumber = "0";
            objCVarPurchaseItem.BrandName = "0";
            objCVarPurchaseItem.ProductType = "0";

            objCVarPurchaseItem.IsAddedFromExcel = false;
            objCVarPurchaseItem.IsFlexi = false;

            objCVarPurchaseItem.PreferredAreaID = pPreferredAreaID;
            objCVarPurchaseItem.ByExpireDate = pByExpireDate;
            objCVarPurchaseItem.BySerialNo = pBySerialNo;
            objCVarPurchaseItem.ByLotNo = pByLotNo;
            objCVarPurchaseItem.ByVehicle = pByVehicle;
            // For ERP
            objCVarPurchaseItem.ParentGroupID = (pGroupID == null || pGroupID == "") ? 0 : int.Parse(pGroupID);
            objCVarPurchaseItem.ItemTypeID = (pTypeID == null || pTypeID == "" )? 0 : int.Parse(pTypeID);
            objCVarPurchaseItem.MaxQty = 0;
            objCVarPurchaseItem.MinQty = 0;

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

            objCVarPurchaseItem.ReturnedItemID = pReturnedItemID;
            objCVarPurchaseItem.ReturnedQuantity = pReturnedQuantity;
            objCVarPurchaseItem.ExpectedAlarm = pExpectedAlarm;
            objCVarPurchaseItem.ActualAlarm = pActualAlarm;
            objCVarPurchaseItem.MinimumLimit = pMinimumLimit;
            objCVarPurchaseItem.MaximumLimit = pMaximumLimit;
            objCVarPurchaseItem.ReOrderlimit = pReOrderlimit;
            objCVarPurchaseItem.ClientID = 0;
            CPurchaseItem objCPurchaseItem = new CPurchaseItem();
            objCPurchaseItem.lstCVarPurchaseItem.Add(objCVarPurchaseItem);
            Exception checkException = objCPurchaseItem.SaveMethod(objCPurchaseItem.lstCVarPurchaseItem);
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            CvwItemsTree objCvwPurchaseItem = new CvwItemsTree();
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else //not unique
            {
                _result = true;
                Int32 _RowCount = objCvwPurchaseItem.lstCVarvwItemsTree.Count;
                objCvwPurchaseItem.GetListPaging(10000, 1, " where 1 = 1 ", "title", out _RowCount);
            }
               
            return new object[] {
                _result
                , objCVarPurchaseItem.ID //pData[1]
                , objCVarPurchaseItem.CreationDate.Year //pData[2]
                , serializer.Serialize(objCvwPurchaseItem.lstCVarvwItemsTree)
        };
        }

        [HttpGet, HttpPost]
        public object Update(Int64 pID, String pCode, String pName, String pLocalName, string pPartNumber, string pHSCode
            , decimal pPrice, Int32 pCurrencyID, Int32 pAccountID, Int32 pSubAccountID, Int32 pCostCenterID
            , Int32 pViewOrder, string pNotes
            //Warehouse parameters
            , Int32 pCommodityID, Int32 pPackageTypeID, decimal pGrossWeight, decimal pNetWeight, int pWeightUnitID
            , decimal pWidth, decimal pDepth, decimal pHeight, Int32 pLengthUnitID, decimal pVolume, Int32 pVolumeUnitID
            , bool pIsIMO, Int32 pIMOClassID, Int32 pUN, Int32 pPG, Int32 pPreferredAreaID, bool pByExpireDate
            , bool pBySerialNo, bool pByLotNo, bool pByVehicle    //***** For ERP
                , string pGroupID, string pTypeID, int pReturnedItemID, decimal pReturnedQuantity, decimal pExpectedAlarm, decimal pActualAlarm
            ,decimal pMinimumLimit, decimal pMaximumLimit, decimal pReOrderlimit)
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
            objCVarPurchaseItem.ModelNumber = objCGetCreationInformation.lstCVarPurchaseItem[0].ModelNumber;
            objCVarPurchaseItem.BrandName = objCGetCreationInformation.lstCVarPurchaseItem[0].BrandName;
            objCVarPurchaseItem.ProductType = objCGetCreationInformation.lstCVarPurchaseItem[0].ProductType;
            objCVarPurchaseItem.IsFragile = objCGetCreationInformation.lstCVarPurchaseItem[0].IsFragile;
            objCVarPurchaseItem.StockUnitQuantity = objCGetCreationInformation.lstCVarPurchaseItem[0].StockUnitQuantity;
            #region Vehicle
            objCVarPurchaseItem.OperationID = objCGetCreationInformation.lstCVarPurchaseItem[0].OperationID;
            objCVarPurchaseItem.IsVehicle = objCGetCreationInformation.lstCVarPurchaseItem[0].IsVehicle;
            objCVarPurchaseItem.EquipmentModelID = objCGetCreationInformation.lstCVarPurchaseItem[0].EquipmentModelID;
            objCVarPurchaseItem.MotorNumber = objCGetCreationInformation.lstCVarPurchaseItem[0].MotorNumber;
            objCVarPurchaseItem.ChassisNumber = objCGetCreationInformation.lstCVarPurchaseItem[0].ChassisNumber;
            objCVarPurchaseItem.LotNumber = objCGetCreationInformation.lstCVarPurchaseItem[0].LotNumber;
            objCVarPurchaseItem.SerialNumber =objCGetCreationInformation.lstCVarPurchaseItem[0].SerialNumber;
            #endregion Vehicle

            objCVarPurchaseItem.ID = pID;
            objCVarPurchaseItem.Code = pCode;
            objCVarPurchaseItem.Name = pName;
            objCVarPurchaseItem.LocalName = pLocalName;
            objCVarPurchaseItem.PartNumber = pPartNumber;
            objCVarPurchaseItem.HSCode = pHSCode;


            objCVarPurchaseItem.Price = pPrice;
            objCVarPurchaseItem.CurrencyID = pCurrencyID;
            objCVarPurchaseItem.AccountID = pAccountID;
            objCVarPurchaseItem.SubAccountID = pSubAccountID;
            objCVarPurchaseItem.CostCenterID = pCostCenterID;
            objCVarPurchaseItem.ViewOrder = pViewOrder;
            objCVarPurchaseItem.Notes = pNotes;
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
            objCVarPurchaseItem.VolumeUnitID = pVolumeUnitID;
            objCVarPurchaseItem.IsIMO = pIsIMO;
            objCVarPurchaseItem.IMOClassID = pIMOClassID;
            objCVarPurchaseItem.UN = pUN;
            objCVarPurchaseItem.PG = pPG;

            objCVarPurchaseItem.PreferredAreaID = pPreferredAreaID;
            objCVarPurchaseItem.ByExpireDate = pByExpireDate;
            objCVarPurchaseItem.BySerialNo = pBySerialNo;
            objCVarPurchaseItem.ByLotNo = pByLotNo;
            objCVarPurchaseItem.ByVehicle = pByVehicle;

            objCVarPurchaseItem.CreatorUserID = objCVarPurchaseItem.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarPurchaseItem.CreationDate = objCVarPurchaseItem.ModificationDate = DateTime.Now;
            // For ERP
            objCVarPurchaseItem.ParentGroupID = (pGroupID == null || pGroupID == "") ? 0 : int.Parse(pGroupID);
            objCVarPurchaseItem.ItemTypeID = (pTypeID == null || pTypeID == "") ? 0 : int.Parse(pTypeID);
            objCVarPurchaseItem.MaxQty = 0;
            objCVarPurchaseItem.MinQty = 0;

            objCVarPurchaseItem.ReturnedItemID = pReturnedItemID;
            objCVarPurchaseItem.ReturnedQuantity = pReturnedQuantity;
            objCVarPurchaseItem.ExpectedAlarm = pExpectedAlarm;
            objCVarPurchaseItem.ActualAlarm = pActualAlarm;
            objCVarPurchaseItem.MinimumLimit = pMinimumLimit;
            objCVarPurchaseItem.MaximumLimit = pMaximumLimit;
            objCVarPurchaseItem.ReOrderlimit = pReOrderlimit;
            objCVarPurchaseItem.ClientID = 0;
            CPurchaseItem objCPurchaseItem = new CPurchaseItem();
            objCPurchaseItem.lstCVarPurchaseItem.Add(objCVarPurchaseItem);
            Exception checkException = objCPurchaseItem.SaveMethod(objCPurchaseItem.lstCVarPurchaseItem);
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            CvwItemsTree objCvwPurchaseItem = new CvwItemsTree();
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else //not unique
            {
                _result = true;
                Int32 _RowCount = objCvwPurchaseItem.lstCVarvwItemsTree.Count;
                objCvwPurchaseItem.GetListPaging(10000, 1, " where 1 = 1 ", "title", out _RowCount);
            }

            return new object[] {
                _result
                , objCVarPurchaseItem.ID //pData[1]
                , objCVarPurchaseItem.CreationDate.Year //pData[2]
                , serializer.Serialize(objCvwPurchaseItem.lstCVarvwItemsTree)
        };
        }

        [HttpGet, HttpPost]
        public object[] InsertList([FromBody] InsertList insertList)
        {


            int _RowCount = 0;
            bool _result = true;
            Exception checkException = null;

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
                objCVarPurchaseItem.CurrencyID = objCvwDefaults.lstCVarvwDefaults[0].CurrencyID;
                objCVarPurchaseItem.PartNumber = insertList.pPartNumberList.Split(',')[i];
                objCVarPurchaseItem.HSCode = insertList.pHSCodeList.Split(',')[i];

                objCVarPurchaseItem.ModelNumber = "0";
                objCVarPurchaseItem.BrandName = "0";
                objCVarPurchaseItem.ProductType = "0";

                objCVarPurchaseItem.Notes = "0";
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

                objCPurchaseItem.lstCVarPurchaseItem.Add(objCVarPurchaseItem);
            }
            checkException = objCPurchaseItem.SaveMethod(objCPurchaseItem.lstCVarPurchaseItem);
            if (checkException != null)
            {
                _result = false;
            }
            return new object[] {
                _result
            };

        }


        [HttpGet, HttpPost]
        [AllowAnonymous]
        public object[] InsertItems([FromBody]string pItems)
        {
            Exception checkException = new Exception();
              //  var Con = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());
                var _result = false;

                var serialize = new JavaScriptSerializer();

                var Details = serialize.Deserialize<List<GroupDetails>>(pItems);



            //*************************************************** Main Group ************************
            var CGroup = new CI_ItemsGroups();
            var objGroup = new CVarI_ItemsGroups();
            var Group = Details[0];
            if (Group.MainID != "" && Group.MainID != null && Group.MainID != "0")
            {
                objGroup.ID = int.Parse(Group.MainID);
                objGroup.ParentID = int.Parse(Group.ParentMainID);
                objGroup.Name = Group.MainName;


                CGroup.lstCVarI_ItemsGroups.Add(objGroup);
                checkException = CGroup.SaveMethod(CGroup.lstCVarI_ItemsGroups);


                //****************************************************** Update Items ***************************************


                List<string> ChildrenItems = Group.ItemIDs.Split(',').ToList();
                List<string> OldChildrenItems = Group.UnCheckedItemIDs.Split(',').ToList();

                var UnParentItems = OldChildrenItems.Where(p => ChildrenItems.All(p2 => p2 != p)).ToList();


                CPurchaseItem cPurchaseItem = new CPurchaseItem();
                checkException = cPurchaseItem.UpdateList(" ParentGroupID = " + Group.MainID + "  where ID IN(" + String.Join(",", ChildrenItems) + ")");
                checkException = cPurchaseItem.UpdateList(" ParentGroupID = NULL  where ID IN(" + String.Join(",", UnParentItems) + ")");


                checkException = null;

            }
            else
            {
                Group.MainID = "0";

            }


            //******************************************************** Children Groups ***************************************


            foreach (var item in Details)
            {
                if (item.Name != "0")
                {


                    var CGroup1 = new CI_ItemsGroups();
                    var objGroup1 = new CVarI_ItemsGroups();



                    objGroup1.ID = int.Parse(item.ID);
                    objGroup1.ParentID = int.Parse(Group.MainID);
                    objGroup1.Name = item.Name;



                    CGroup1.lstCVarI_ItemsGroups.Add(objGroup1);
                    checkException = CGroup1.SaveMethod(CGroup1.lstCVarI_ItemsGroups);

                }
            }


            //******************************************************************************************************************
            CvwItemsTree objCvwPurchaseItem = new CvwItemsTree();
            var message = "";
         
                if (checkException != null)
                {
                    message = "Please Insert Correct Data";
                }
                else
                {
                    _result = true;
                    message = "Done";
                  
                   Int32 _RowCount = objCvwPurchaseItem.lstCVarvwItemsTree.Count;
                   objCvwPurchaseItem.GetListPaging(10000, 1, " where 1 = 1 ", "title", out _RowCount);
                

                }
                return new object[] 
                {
                _result , message , new JavaScriptSerializer().Serialize(objCvwPurchaseItem.lstCVarvwItemsTree)
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
            , string pBarCode,string pColor, string pModel)
        {
            Exception checkException = null;
            CVarWH_PackageTypeBarCode objCVarWH_PackageTypeBarCode = new CVarWH_PackageTypeBarCode();
            CWH_PackageTypeBarCode objCWH_PackageTypeBarCode = new CWH_PackageTypeBarCode();
            CvwWH_PackageTypeBarCode objCvwWH_PackageTypeBarCode = new CvwWH_PackageTypeBarCode();

            objCVarWH_PackageTypeBarCode.ID = pPackageTypeBarCodeID;
            objCVarWH_PackageTypeBarCode.PurchaseItemID = pPurchaseItemID;
            objCVarWH_PackageTypeBarCode.PackageTypeID = pPackageTypeID;
            objCVarWH_PackageTypeBarCode.BarCode = pBarCode;
            objCVarWH_PackageTypeBarCode.Color = pColor;
            objCVarWH_PackageTypeBarCode.Model = pModel;


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

        [HttpGet, HttpPost]
        public Object[] LoadPackageTypeBarCode(Int64 pPurchaseItemID)
        {
            CvwWH_PackageTypeBarCode objCWH_PackageTypeBarCode = new CvwWH_PackageTypeBarCode();
            objCWH_PackageTypeBarCode.GetList("where PurchaseItemID="+ pPurchaseItemID);
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[] {
                serializer.Serialize(objCWH_PackageTypeBarCode.lstCVarvwWH_PackageTypeBarCode) //pData[0]
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

        #region Uploading Documents
        [HttpGet, HttpPost]
        public Object[] LoadFiles(string pFolderName, string pStrFolderPath)
        {
            string[] pDocsInFileNames = null;
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
                var strFolderPath = Path.Combine(HttpContext.Current.Server.MapPath(pStrFolderPath + pFolderName));
                if (!Directory.Exists(strFolderPath))
                    Directory.CreateDirectory(strFolderPath); //for this line to work i ve to give permissions on the folder on the domain itself... otherwise the fn wouldn't be seen
                // Get the uploaded from the Files collection
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
            return new Object[] { new JavaScriptSerializer().Serialize(pDocsInFileNames) };
        } // of fn

        [HttpPost, HttpGet]
        public object[] DeleteUploadedFile(string pFolderName, string pFileNames, string pStrFolderPath)
        {
            string[] pDocsInFileNames = null; //to hold all the filenames as the return value
            // Get the complete file path
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






    }

    public class GroupDetails
    {
        public string MainID { get; set; }
        public string MainName { get; set; }
        public string ParentMainID { get; set; }
        public string ID { get; set; }
        public string Name { get; set; }
        public string ParentID { get; set; }
        public string UnCheckedItemIDs { get; set; }
        public string ItemIDs { get; set; }
    }

}

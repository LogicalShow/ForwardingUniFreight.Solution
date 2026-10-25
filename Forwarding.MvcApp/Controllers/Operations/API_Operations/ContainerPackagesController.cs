using Forwarding.MvcApp.Models.Operations.Operations.Generated;
using System;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;
using Forwarding.MvcApp.Entities.Operations;


namespace Forwarding.MvcApp.Controllers.Operations.API_Operations
{
    public class ContainerPackagesController : ApiController
    {
        [HttpGet, HttpPost]
        public Object[] LoadAll(string pWhereClause)
        {
            CContainerPackages objCContainerPackages = new CContainerPackages();
            objCContainerPackages.GetList(pWhereClause);
            return new Object[] { new JavaScriptSerializer().Serialize(objCContainerPackages.lstCVarContainerPackages) };
        }

        [HttpGet, HttpPost]
        public object[] LoadWithWhereClause(Int32 pPageNumber, Int32 pPageSize, string pWhereClause, string pOrderBy)
        {
            CvwContainerPackages objCvwContainerPackages = new CvwContainerPackages();
            //objCvwContainerPackages.GetList(string.Empty); //GetList() fn loads without paging
            Int32 _RowCount = objCvwContainerPackages.lstCVarvwContainerPackages.Count;
            //pSearchKey here is the where clause
            objCvwContainerPackages.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);
            return new Object[] { new JavaScriptSerializer().Serialize(objCvwContainerPackages.lstCVarvwContainerPackages), _RowCount };
        }

        [HttpGet, HttpPost]
        public Object[] LoadOperationContainers(string pWhereClause)
        {
            CvwOperationContainersAndPackages objCContainerOperation = new CvwOperationContainersAndPackages();
            objCContainerOperation.GetList(pWhereClause);
            return new Object[] { new JavaScriptSerializer().Serialize(objCContainerOperation.lstCVarvwOperationContainersAndPackages) };
        }

        [HttpGet, HttpPost]
        public bool Delete(String pContainerPackagesIDs)
        {
            bool _result = false;
            CContainerPackages objCContainerPackages = new CContainerPackages();
            COperationContainersAndPackages objCOperationContainersAndPackages = new COperationContainersAndPackages();
            objCOperationContainersAndPackages.UpdateList("PlacedOnOCPID = NULL WHERE ID IN (SELECT HouseOCPID FROM ContainerPackages WHERE HouseOCPID IS NOT NULL AND ID IN (0," + pContainerPackagesIDs + "))");
            foreach (var currentID in pContainerPackagesIDs.Split(','))
            {
                objCContainerPackages.lstDeletedCPKContainerPackages.Add(new CPKContainerPackages() { ID = Int64.Parse(currentID.Trim()) });
            }

            Exception checkException = objCContainerPackages.DeleteItem(objCContainerPackages.lstDeletedCPKContainerPackages);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("DELETE")) // some or all of the rows were not deleted due to dependencies
                    _result = false;
            }
            else
            {//deleted successfully
                _result = true;
                ShipmentPackage_SetIsPackagesPlacedOnMaster();
            }
            return _result;
        }

        [HttpGet, HttpPost]
        public object[] Insert(Int64 pOperationID, Int64 pOperationContainersAndPackagesID, Int32 pPackageTypeID, Int32 pQuantity, Decimal pLength, Decimal pWidth, Decimal pHeight, Decimal pVolume, Decimal pVolumetricWeight, Decimal pNetWeight, Decimal pGrossWeight/*, Decimal pChargeableWeight*/, string pMarksAndNumbers, string pDescriptionOfGoods)
        {
            bool _result = false;
            CVarContainerPackages objCVarContainerPackages = new CVarContainerPackages();

            objCVarContainerPackages.OperationID = pOperationID;
            objCVarContainerPackages.OperationContainersAndPackagesID = pOperationContainersAndPackagesID;
            objCVarContainerPackages.PackageTypeID = pPackageTypeID;
            objCVarContainerPackages.PackageTypeID = pPackageTypeID;
            objCVarContainerPackages.Quantity = pQuantity;
            objCVarContainerPackages.Length = pLength;
            objCVarContainerPackages.Width = pWidth;
            objCVarContainerPackages.Height = pHeight;
            objCVarContainerPackages.Volume = pVolume;
            objCVarContainerPackages.VolumetricWeight = pVolumetricWeight;
            objCVarContainerPackages.NetWeight = pNetWeight;
            objCVarContainerPackages.GrossWeight = pGrossWeight;
            //objCVarContainerPackages.ChargeableWeight = pChargeableWeight;
            objCVarContainerPackages.MarksAndNumbers = pMarksAndNumbers;
            objCVarContainerPackages.DescriptionOfGoods = pDescriptionOfGoods;

            objCVarContainerPackages.CreatorUserID = objCVarContainerPackages.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarContainerPackages.CreationDate = objCVarContainerPackages.ModificationDate = DateTime.Now;

            CContainerPackages objCContainerPackages = new CContainerPackages();
            objCContainerPackages.lstCVarContainerPackages.Add(objCVarContainerPackages);
            Exception checkException = objCContainerPackages.SaveMethod(objCContainerPackages.lstCVarContainerPackages);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else //not unique
                _result = true;
            return new Object[] { _result, objCContainerPackages.lstCVarContainerPackages[0].ID };
        }

        [HttpGet, HttpPost]
        public object[] Update(Int64 pID, Int64 pOperationID, Int64 pOperationContainersAndPackagesID, Int32 pPackageTypeID, Int32 pQuantity, Decimal pLength, Decimal pWidth, Decimal pHeight, Decimal pVolume, Decimal pVolumetricWeight, Decimal pNetWeight, Decimal pGrossWeight/*, Decimal pChargeableWeight*/, string pMarksAndNumbers, string pDescriptionOfGoods)
        {
            bool _result = false;
            CVarContainerPackages objCVarContainerPackages = new CVarContainerPackages();

            //the next 4 lines to get the CreatorUserID and CreationDate and set them as they were entered before
            CContainerPackages objCGetCreationInformation = new CContainerPackages();
            objCGetCreationInformation.GetItem(pID);
            objCVarContainerPackages.CreatorUserID = objCGetCreationInformation.lstCVarContainerPackages[0].CreatorUserID;
            objCVarContainerPackages.CreationDate = objCGetCreationInformation.lstCVarContainerPackages[0].CreationDate;
            objCVarContainerPackages.HouseOperationID = objCGetCreationInformation.lstCVarContainerPackages[0].HouseOperationID;

            objCVarContainerPackages.ID = pID;

            objCVarContainerPackages.OperationID = pOperationID;
            objCVarContainerPackages.OperationContainersAndPackagesID = pOperationContainersAndPackagesID;
            objCVarContainerPackages.PackageTypeID = pPackageTypeID;
            objCVarContainerPackages.PackageTypeID = pPackageTypeID;
            objCVarContainerPackages.Quantity = pQuantity;
            objCVarContainerPackages.GrossWeight = pGrossWeight;
            objCVarContainerPackages.Volume = pVolume;
            objCVarContainerPackages.Length = pLength;
            objCVarContainerPackages.Width = pWidth;
            objCVarContainerPackages.Height = pHeight;
            objCVarContainerPackages.Volume = pVolume;
            objCVarContainerPackages.VolumetricWeight = pVolumetricWeight;
            objCVarContainerPackages.NetWeight = pNetWeight;
            objCVarContainerPackages.GrossWeight = pGrossWeight;
            //objCVarContainerPackages.ChargeableWeight = pChargeableWeight;
            objCVarContainerPackages.MarksAndNumbers = pMarksAndNumbers;
            objCVarContainerPackages.DescriptionOfGoods = pDescriptionOfGoods;

            objCVarContainerPackages.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarContainerPackages.ModificationDate = DateTime.Now;

            CContainerPackages objCContainerPackages = new CContainerPackages();
            objCContainerPackages.lstCVarContainerPackages.Add(objCVarContainerPackages);
            Exception checkException = objCContainerPackages.SaveMethod(objCContainerPackages.lstCVarContainerPackages);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else //not unique
                _result = true;
            return new Object[] { _result, objCContainerPackages.lstCVarContainerPackages[0].ID };
        }

        public void ShipmentPackage_SetIsPackagesPlacedOnMaster()
        {
            string pUpdateClause = "";
            COperations objCShipment = new COperations();
            pUpdateClause = "IsPackagesPlacedOnMaster=" + " \n";
            pUpdateClause += " CASE ((SELECT COUNT(ID) FROM OperationContainersAndPackages OCP WHERE OCP.HouseOperationID=X.ID)" + " \n";
            pUpdateClause += "         + (SELECT COUNT(ID) FROM ContainerPackages CP WHERE CP.HouseOperationID=X.ID))" + " \n";
            pUpdateClause += "     WHEN 0 THEN CAST(0 AS bit)" + " \n";
            pUpdateClause += "     ELSE CAST(1 AS bit)" + " \n";
            pUpdateClause += " END" + " \n";
            pUpdateClause += " FROM Operations X" + " \n";
            objCShipment.UpdateList(pUpdateClause);
        }
    }
}

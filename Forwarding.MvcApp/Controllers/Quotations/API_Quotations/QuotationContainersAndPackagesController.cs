// Quotations Region ---------------------------------------------------------------
//DirectionType : 1-Import 2-Export 3-Domestic
//TransportType : 1-Ocean 2-Air 3-Inland
//ShipmentType : 1-FCL 2-LCL 3-FTL 4-LTL

using Forwarding.MvcApp.Models.MasterData.Others.Generated;
using Forwarding.MvcApp.Models.Quotations.Quotations.Generated;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;


namespace Forwarding.MvcApp.Controllers.Quotations.API_Quotations
{
    public class QuotationContainersAndPackagesController : ApiController
    {
        //[Route("/api/Quotations/LoadAll")]
        [HttpGet, HttpPost]
        public Object[] LoadAll(string pWhereClause)
        {
            CvwQuotationContainersAndPackages objCvwQuotationContainersAndPackages = new CvwQuotationContainersAndPackages();
            objCvwQuotationContainersAndPackages.GetList(pWhereClause);
            return new Object[] { new JavaScriptSerializer().Serialize(objCvwQuotationContainersAndPackages.lstCVarvwQuotationContainersAndPackages) };
        }

        [HttpGet, HttpPost]
        public object[] LoadWithWhereClause(Int32 pPageNumber, Int32 pPageSize, string pWhereClause)
        {
            CvwQuotationContainersAndPackages objCvwQuotationContainersAndPackages = new CvwQuotationContainersAndPackages();
            //objCvwQuotationPackages.GetList(string.Empty); //GetList() fn loads without paging
            Int32 _RowCount = objCvwQuotationContainersAndPackages.lstCVarvwQuotationContainersAndPackages.Count;
            //pSearchKey here is the where clause
            objCvwQuotationContainersAndPackages.GetListPaging(pPageSize, pPageNumber, pWhereClause, " PackageTypeCode, ContainerTypeName ", out _RowCount);
            return new Object[] { new JavaScriptSerializer().Serialize(objCvwQuotationContainersAndPackages.lstCVarvwQuotationContainersAndPackages), _RowCount };
        }

        [HttpGet, HttpPost]
        public bool Delete(String pQuotationContainersAndPackagesIDs)
        {
            bool _result = false;
            CQuotationContainersAndPackages objCQuotationContainersAndPackages = new CQuotationContainersAndPackages();
            foreach (var currentID in pQuotationContainersAndPackagesIDs.Split(','))
            {
                objCQuotationContainersAndPackages.lstDeletedCPKQuotationContainersAndPackages.Add(new CPKQuotationContainersAndPackages() { ID = Int64.Parse(currentID.Trim()) });
            }

            Exception checkException = objCQuotationContainersAndPackages.DeleteItem(objCQuotationContainersAndPackages.lstDeletedCPKQuotationContainersAndPackages);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("DELETE")) // some or all of the rows were not deleted due to dependencies
                    _result = false;
            }
            else //deleted successfully
                _result = true;
            return _result;
        }

        //TransportType : 1-Ocean 2-Air 3-Inland
        //ShipmentType : 1-FCL 2-LCL 3-FTL 4-LTL
        [HttpGet, HttpPost]
        public bool InsertList(Int64 pQuotationID, string pSelectedIDs, int pShipmentType, int pTransportType)
        {
            bool _result = false;
            string pWhereClause = "";
            //building the where clause to select the rows from ChargeTypes
            foreach (var currentID in pSelectedIDs.Split(','))
            {
                //i am sure i ve at least 1 selectedID isa
                pWhereClause += (pWhereClause == "" ? " WHERE ID = " + currentID.ToString()
                    : " OR ID = " + currentID.ToString());
            }
            //ShipmentType : 1-FCL 2-LCL 3-FTL 4-LTL
            //those lines are to get either ContainerTypes or PackageTypes from DB according to pShipmentType and pTransportType
            
            CContainerTypes objCContainerTypes = new CContainerTypes();
            objCContainerTypes.GetList(pWhereClause);
            CPackageTypes objCPackageTypes = new CPackageTypes();
            objCPackageTypes.GetList(pWhereClause);

            CQuotationContainersAndPackages objCQuotationContainersAndPackages = new CQuotationContainersAndPackages();
            if (pShipmentType == 1 || pShipmentType == 3) //FCL,FTL
                foreach (var rowContainerType in objCContainerTypes.lstCVarContainerTypes)
                {
                    CVarQuotationContainersAndPackages objCVarQuotationContainersAndPackages = new CVarQuotationContainersAndPackages();

                    objCVarQuotationContainersAndPackages.QuotationID = pQuotationID;
                    objCVarQuotationContainersAndPackages.ContainerTypeID = rowContainerType.ID;
                    objCVarQuotationContainersAndPackages.Quantity = 1;

                    objCVarQuotationContainersAndPackages.CreatorUserID = objCVarQuotationContainersAndPackages.ModificatorUserID = WebSecurity.CurrentUserId;
                    objCVarQuotationContainersAndPackages.ModificationDate = objCVarQuotationContainersAndPackages.CreationDate = DateTime.Now;

                    objCQuotationContainersAndPackages.lstCVarQuotationContainersAndPackages.Add(objCVarQuotationContainersAndPackages);
                }
            else // LTL, LCL, air
                foreach (var rowPackageType in objCPackageTypes.lstCVarPackageTypes)
                {
                    CVarQuotationContainersAndPackages objCVarQuotationContainersAndPackages = new CVarQuotationContainersAndPackages();

                    objCVarQuotationContainersAndPackages.QuotationID = pQuotationID;
                    objCVarQuotationContainersAndPackages.PackageTypeID = rowPackageType.ID;
                    objCVarQuotationContainersAndPackages.Quantity = 1;

                    objCVarQuotationContainersAndPackages.CreatorUserID = objCVarQuotationContainersAndPackages.ModificatorUserID = WebSecurity.CurrentUserId;
                    objCVarQuotationContainersAndPackages.ModificationDate = objCVarQuotationContainersAndPackages.CreationDate = DateTime.Now;
                    
                    objCQuotationContainersAndPackages.lstCVarQuotationContainersAndPackages.Add(objCVarQuotationContainersAndPackages);
                }
            var checkException = objCQuotationContainersAndPackages.SaveMethod(objCQuotationContainersAndPackages.lstCVarQuotationContainersAndPackages);
            if (checkException == null)
                _result = true;
            return _result;
        }

        // [Route("/api/QuotationContainersAndPackages/Update/{pID}/{pCode}/{pName}/{pLocalName}")]
        [HttpGet, HttpPost]
        public bool Update(Int64 pID, Int64 pQuotationID, Int32 pContainerTypeID, Int32 pPackageTypeID, Decimal pLength, Decimal pWidth, Decimal pHeight, Decimal pVolume, Decimal pVolumetricWeight, Decimal pNetWeight, Decimal pGrossWeight, Int32 pQuantity)
        {
            bool _result = false;
            CVarQuotationContainersAndPackages objCVarQuotationContainersAndPackages = new CVarQuotationContainersAndPackages();

            //the next 4 lines to get the CreatorUserID and CreationDate and set them as they were entered before
            CQuotationContainersAndPackages objCGetCreationInformation = new CQuotationContainersAndPackages();
            objCGetCreationInformation.GetItem(pID);
            objCVarQuotationContainersAndPackages.CreatorUserID = objCGetCreationInformation.lstCVarQuotationContainersAndPackages[0].CreatorUserID;
            objCVarQuotationContainersAndPackages.CreationDate = objCGetCreationInformation.lstCVarQuotationContainersAndPackages[0].CreationDate;

            objCVarQuotationContainersAndPackages.ID = pID;

            objCVarQuotationContainersAndPackages.QuotationID = pQuotationID;
            objCVarQuotationContainersAndPackages.ContainerTypeID = pContainerTypeID;
            objCVarQuotationContainersAndPackages.PackageTypeID = pPackageTypeID;
            objCVarQuotationContainersAndPackages.Length = pLength;
            objCVarQuotationContainersAndPackages.Width = pWidth;
            objCVarQuotationContainersAndPackages.Height = pHeight;
            objCVarQuotationContainersAndPackages.Volume = pVolume;
            objCVarQuotationContainersAndPackages.VolumetricWeight = pVolumetricWeight;
            objCVarQuotationContainersAndPackages.NetWeight = pNetWeight;
            objCVarQuotationContainersAndPackages.GrossWeight = pGrossWeight;
            objCVarQuotationContainersAndPackages.Quantity = pQuantity;

            objCVarQuotationContainersAndPackages.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarQuotationContainersAndPackages.ModificationDate = DateTime.Now;

            CQuotationContainersAndPackages objCQuotationContainersAndPackages = new CQuotationContainersAndPackages();
            objCQuotationContainersAndPackages.lstCVarQuotationContainersAndPackages.Add(objCVarQuotationContainersAndPackages);
            Exception checkException = objCQuotationContainersAndPackages.SaveMethod(objCQuotationContainersAndPackages.lstCVarQuotationContainersAndPackages);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else //not unique
                _result = true;
            return _result;
        }

    }
}

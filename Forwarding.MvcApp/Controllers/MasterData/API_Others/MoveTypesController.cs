using Forwarding.MvcApp.Models.MasterData.Others.Generated;
using Forwarding.MvcApp.Models.NoAccess.Generated;
using System;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;

namespace Forwarding.MvcApp.Controllers.MasterData.API_Others
{
    public class MoveTypesController : ApiController
    {
        [HttpGet, HttpPost]
        public Object[] LoadAll(string pWhereClause)
        {
            CMoveTypes objCMoveTypes = new CMoveTypes();
            objCMoveTypes.GetList(pWhereClause);
                return new Object[] { new JavaScriptSerializer().Serialize(objCMoveTypes.lstCVarMoveTypes) };
        }

        [HttpGet, HttpPost]
        public Object[] LoadWithPaging(Int32 pPageNumber, Int32 pPageSize, string pSearchKey)
        {
            CMoveTypes objCMoveTypes = new CMoveTypes();
            //objCMoveTypes.GetList(string.Empty); //GetList() fn loads without paging
            Int32 _RowCount = objCMoveTypes.lstCVarMoveTypes.Count;

            pSearchKey = (pSearchKey == null ? "" : pSearchKey.Trim().ToUpper());
            string whereClause = " Where Code LIKE '%" + pSearchKey + "%' "
                + " OR Name LIKE '%" + pSearchKey + "%' "
                + " OR LocalName LIKE '%" + pSearchKey + "%' ";
            objCMoveTypes.GetListPaging(pPageSize, pPageNumber, whereClause, "Code", out _RowCount);
            return new Object[] { new JavaScriptSerializer().Serialize(objCMoveTypes.lstCVarMoveTypes), _RowCount };
        }

        [HttpGet,HttpPost]
        public object[] LoadHeaderWithDetails(Int32 pHeaderID)
        {
            string _MessageReturned = "";
            CMoveTypes objCMoveTypes = new CMoveTypes();
            CvwServiceDepartment objCvwServiceDepartment = new CvwServiceDepartment();
            Int32 _RowCount = 0;

            objCMoveTypes.GetListPaging(999999, 1, "WHERE ID=" + pHeaderID, "ID", out _RowCount);
            objCvwServiceDepartment.GetListPaging(999999, 1, "WHERE MoveTypeID=" + pHeaderID, "ID,DepartmentName,ViewOrder", out _RowCount);

            return new object[]
            {
                _MessageReturned
                , new JavaScriptSerializer().Serialize(objCMoveTypes.lstCVarMoveTypes) //pData[1]
                , new JavaScriptSerializer().Serialize(objCvwServiceDepartment.lstCVarvwServiceDepartment) //pData[2]
            };
        }

        [HttpGet, HttpPost]
        public bool Insert(String pCode, String pName, String pLocalName, String pNotes, String pIconName, String pIconStyle, bool pIsOcean, bool pIsAir, bool pIsInland, bool pIsInactive, bool pIsCustomsClearance, bool pIsWarehousing)
        {
            bool _result = false;
            CVarMoveTypes objCVarMoveTypes = new CVarMoveTypes();

            objCVarMoveTypes.Code = pCode.ToUpper();
            objCVarMoveTypes.Name = pName.ToUpper();
            objCVarMoveTypes.LocalName = (pLocalName == null ? "" : pLocalName.ToUpper());
            objCVarMoveTypes.Notes = (pNotes == null ? "" : pNotes.ToUpper());
            objCVarMoveTypes.IconName = pIconName;
            objCVarMoveTypes.IconStyle = pIconStyle;
            objCVarMoveTypes.ImageURL = "";
            objCVarMoveTypes.IsAir = pIsAir;
            objCVarMoveTypes.IsOcean = pIsOcean;
            objCVarMoveTypes.IsInland = pIsInland;
            objCVarMoveTypes.IsCustomsClearance = pIsCustomsClearance;
            objCVarMoveTypes.IsWarehousing = pIsWarehousing;
            objCVarMoveTypes.IsInactive = pIsInactive;

            objCVarMoveTypes.TimeLocked = DateTime.Parse("01-01-1900");
            objCVarMoveTypes.LockingUserID = 0;

            objCVarMoveTypes.CreatorUserID = objCVarMoveTypes.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarMoveTypes.CreationDate = objCVarMoveTypes.ModificationDate = DateTime.Now;

            objCVarMoveTypes.crmCode = "";
            
            CMoveTypes objCMoveTypes = new CMoveTypes();
            objCMoveTypes.lstCVarMoveTypes.Add(objCVarMoveTypes);
            Exception checkException = objCMoveTypes.SaveMethod(objCMoveTypes.lstCVarMoveTypes);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else //not unique
                _result = true;
            return _result;
        }

        [HttpGet, HttpPost]
        public bool Update(Int32 pID, String pCode, String pName, String pLocalName, String pNotes, String pIconName, String pIconStyle, bool pIsOcean, bool pIsAir, bool pIsInland, bool pIsInactive, bool pIsCustomsClearance, bool pIsWarehousing)
        {
            bool _result = false;
            CVarMoveTypes objCVarMoveTypes = new CVarMoveTypes();

            //the next 4 lines to get the CreatorUserID and CreationDate and set them as they were entered before
            CMoveTypes objCGetCreationInformation = new CMoveTypes();
            objCGetCreationInformation.GetItem(pID);
            objCVarMoveTypes.CreatorUserID = objCGetCreationInformation.lstCVarMoveTypes[0].CreatorUserID;
            objCVarMoveTypes.CreationDate = objCGetCreationInformation.lstCVarMoveTypes[0].CreationDate;


            objCVarMoveTypes.ID = pID;
            objCVarMoveTypes.Code = pCode.ToUpper();
            objCVarMoveTypes.Name = pName.ToUpper();
            objCVarMoveTypes.LocalName = (pLocalName == null ? "" : pLocalName.ToUpper());
            objCVarMoveTypes.Notes = (pNotes == null ? "" : pNotes.ToUpper());
            objCVarMoveTypes.IconName = pIconName;
            objCVarMoveTypes.IconStyle = pIconStyle;
            objCVarMoveTypes.ImageURL = "";
            objCVarMoveTypes.IsAir = pIsAir;
            objCVarMoveTypes.IsOcean = pIsOcean;
            objCVarMoveTypes.IsInland = pIsInland;
            objCVarMoveTypes.IsCustomsClearance = pIsCustomsClearance;
            objCVarMoveTypes.IsWarehousing = pIsWarehousing;
            objCVarMoveTypes.IsInactive = pIsInactive;

            objCVarMoveTypes.TimeLocked = DateTime.Parse("01-01-1900");
            objCVarMoveTypes.LockingUserID = 0;

            objCVarMoveTypes.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarMoveTypes.ModificationDate = DateTime.Now;

            objCVarMoveTypes.crmCode = objCGetCreationInformation.lstCVarMoveTypes[0].crmCode;


            CMoveTypes objCMoveTypes = new CMoveTypes();
            objCMoveTypes.lstCVarMoveTypes.Add(objCVarMoveTypes);
            Exception checkException = objCMoveTypes.SaveMethod(objCMoveTypes.lstCVarMoveTypes);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else //not unique
                _result = true;
            return _result;
        }

        [HttpGet, HttpPost]
        public bool Delete(String pMoveTypesIDs)
        {
            bool _result = false;
            CMoveTypes objCMoveTypes = new CMoveTypes();
            foreach (var currentID in pMoveTypesIDs.Split(','))
            {
                objCMoveTypes.lstDeletedCPKMoveTypes.Add(new CPKMoveTypes() { ID = Int32.Parse(currentID.Trim()) });
            }

            Exception checkException = objCMoveTypes.DeleteItem(objCMoveTypes.lstDeletedCPKMoveTypes);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("DELETE")) // some or all of the rows were not deleted due to dependencies
                    _result = false;
            }
            else //deleted successfully
                _result = true;
            return _result;
        }

        #region Service Departments
        [HttpGet, HttpPost]
        public object[] Details_Save(Int32 pDetailsID, Int32 pMoveTypeID, Int32 pDepartmentID, string pNotes, Int32 pViewOrder
            , bool pOpenDate, bool pCloseDate, bool pCutOffDate, bool pPODate, bool pReleaseDate, bool pETAPOLDate, bool pATAPOLDate
            , bool pExpectedDeparture, bool pActualDeparture, bool pExpectedArrival, bool pActualArrival, bool pGateInDate
            , bool pGateOutDate, bool pStuffingDate, bool pDeliveryDate, bool pCertificateDate, bool pQasimaDate)
        {
            Exception checkException = null;
            string _MessageReturned = "";
            CVarServiceDepartment objCVarServiceDepartment = new CVarServiceDepartment();
            CServiceDepartment objCServiceDepartment = new CServiceDepartment();
            CvwServiceDepartment objCvwServiceDepartment = new CvwServiceDepartment();

            objCVarServiceDepartment.ID = pDetailsID;
            objCVarServiceDepartment.MoveTypeID = pMoveTypeID;
            objCVarServiceDepartment.DepartmentID = pDepartmentID;
            objCVarServiceDepartment.OpenDate = pOpenDate;
            objCVarServiceDepartment.CloseDate = pCloseDate;
            objCVarServiceDepartment.CutOffDate = pCutOffDate;
            objCVarServiceDepartment.PODate = pPODate;
            objCVarServiceDepartment.ReleaseDate = pReleaseDate;
            objCVarServiceDepartment.ETAPOLDate = pETAPOLDate;
            objCVarServiceDepartment.ATAPOLDate = pATAPOLDate;
            objCVarServiceDepartment.ExpectedDeparture = pExpectedDeparture;
            objCVarServiceDepartment.ActualDeparture = pActualDeparture;
            objCVarServiceDepartment.ExpectedArrival = pExpectedArrival;
            objCVarServiceDepartment.ActualArrival = pActualArrival;
            objCVarServiceDepartment.GateInDate = pGateInDate;
            objCVarServiceDepartment.GateOutDate = pGateOutDate;
            objCVarServiceDepartment.StuffingDate = pStuffingDate;
            objCVarServiceDepartment.DeliveryDate = pDeliveryDate;
            objCVarServiceDepartment.CertificateDate = pCertificateDate;
            objCVarServiceDepartment.QasimaDate = pQasimaDate;
            objCVarServiceDepartment.Notes = pNotes;
            objCVarServiceDepartment.ViewOrder = pViewOrder;
            
            if (pDetailsID != 0) //update so save original creator & creation date
            {
                CServiceDepartment objCGetCreationInformation = new CServiceDepartment();
                objCGetCreationInformation.GetItem(pDetailsID);
                objCVarServiceDepartment.CreatorUserID = objCGetCreationInformation.lstCVarServiceDepartment[0].CreatorUserID;
                objCVarServiceDepartment.CreationDate = objCGetCreationInformation.lstCVarServiceDepartment[0].CreationDate;
            }
            else
            {
                objCVarServiceDepartment.CreatorUserID = WebSecurity.CurrentUserId;
                objCVarServiceDepartment.CreationDate = DateTime.Now;
            }
            objCVarServiceDepartment.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarServiceDepartment.ModificationDate = DateTime.Now;

            objCServiceDepartment.lstCVarServiceDepartment.Add(objCVarServiceDepartment);
            checkException = objCServiceDepartment.SaveMethod(objCServiceDepartment.lstCVarServiceDepartment);
            if (checkException != null)
                _MessageReturned = checkException.Message;
            else
                checkException = objCvwServiceDepartment.GetList("WHERE MoveTypeID=" + pMoveTypeID + " ORDER BY ID,ViewOrder,DepartmentName");
            return new object[] {
                _MessageReturned
                , new JavaScriptSerializer().Serialize(objCvwServiceDepartment.lstCVarvwServiceDepartment)
            };
        }

        [HttpGet, HttpPost]
        public object[] Details_Delete(string pDetailsIDsToDelete, Int32 pMoveTypeID)
        {
            Exception checkException = null;
            CServiceDepartment objCServiceDepartment = new CServiceDepartment();
            CvwServiceDepartment objCvwServiceDepartment = new CvwServiceDepartment();
            checkException = objCServiceDepartment.DeleteList("WHERE ID IN (" + pDetailsIDsToDelete + ")");
            objCvwServiceDepartment.GetList("WHERE MoveTypeID=" + pMoveTypeID.ToString() + " ORDER By ID,ViewOrder,DepartmentName");
            return new object[] {
                checkException == null ? true : false
                , new JavaScriptSerializer().Serialize(objCvwServiceDepartment.lstCVarvwServiceDepartment)
            };
        }
        #endregion Service Departments
    }
}

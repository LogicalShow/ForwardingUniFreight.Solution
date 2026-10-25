using Forwarding.MvcApp.Entities.Operations;
using Forwarding.MvcApp.Models.Operations.Operations.Generated;
using System;
using System.Globalization;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Script.Serialization;

namespace Forwarding.MvcApp.Controllers.BillTracking
{
    public class BillTrackingAPIController : ApiController
    {
        [System.Web.Http.HttpGet]
        public Object[] GetBillData(string pWhereClause)
        {

            int _RowCount = 0;

            COperationsBillNosFromAPI objCOperationsBillNosFromAPI = new COperationsBillNosFromAPI();

            objCOperationsBillNosFromAPI.GetListPaging(99999, 1, pWhereClause, "ID", out _RowCount);

            return new object[] {

                  new JavaScriptSerializer().Serialize(objCOperationsBillNosFromAPI.lstCVarOperationsBillNosFromAPI)

            };
        }


        [System.Web.Http.HttpGet, System.Web.Http.HttpPost]
        public bool InsertBillData(string pBillNo, string pStatus, string pLiveMapURL, string pShippingLine, string pPOLCountry, string pPODCountry, string pLoadPort, string pDischargePort, int pContainersCount, string pETA, string pFormatedTransitTime, string pFirstETA, string pLoadingDate, bool pLoadingDateIsActual, string pDepartureDate, bool pDepartureDateIsActual, string pArrivalDate, bool pArrivalDateIsActual, string pDischargeDate, bool pDischargeDateIsActual, Int64 pOperationID)
        {
            bool _result = false;
            Exception checkException = null;


            COperationsBillNosFromAPI objCOperationsBillNosFromAPI = new COperationsBillNosFromAPI();
            CVarOperationsBillNosFromAPI objCVarOperationsBillNosFromAPI = new CVarOperationsBillNosFromAPI();

            objCVarOperationsBillNosFromAPI.BillNo = pBillNo == null ? "" : pBillNo.Trim();

            objCVarOperationsBillNosFromAPI.Status = pStatus == null ? "" : pStatus.Trim();
            objCVarOperationsBillNosFromAPI.LiveMapURL = pLiveMapURL == null ? "" : pLiveMapURL.Trim();
            objCVarOperationsBillNosFromAPI.ShippingLine = pShippingLine == null ? "" : pShippingLine.Trim();
            objCVarOperationsBillNosFromAPI.POLCountry = pPOLCountry == null ? "" : pPOLCountry.Trim();
            objCVarOperationsBillNosFromAPI.PODCountry = pPODCountry == null ? "" : pPODCountry.Trim();
            objCVarOperationsBillNosFromAPI.LoadPort = pLoadPort == null ? "" : pLoadPort.Trim();
            objCVarOperationsBillNosFromAPI.DischargePort = pDischargePort == null ? "" : pDischargePort.Trim();
            objCVarOperationsBillNosFromAPI.ContainersCount = pContainersCount;

            objCVarOperationsBillNosFromAPI.ETA = pETA == null ? "" : pETA.Trim();
            objCVarOperationsBillNosFromAPI.FormatedTransitTime = pFormatedTransitTime == null ? "" : pFormatedTransitTime.Trim();
            objCVarOperationsBillNosFromAPI.FirstETA = pFirstETA == null ? "" : pFirstETA.Trim();

            objCVarOperationsBillNosFromAPI.LoadingDate = pLoadingDate == null ? "" : pLoadingDate.Trim();
            objCVarOperationsBillNosFromAPI.LoadingDateIsActual = pLoadingDateIsActual;

            objCVarOperationsBillNosFromAPI.DepartureDate = pDepartureDate == null ? "" : pDepartureDate.Trim();
            objCVarOperationsBillNosFromAPI.DepartureDateIsActual = pDepartureDateIsActual;

            objCVarOperationsBillNosFromAPI.ArrivalDate = pArrivalDate == null ? "" : pArrivalDate.Trim();
            objCVarOperationsBillNosFromAPI.ArrivalDateIsActual = pArrivalDateIsActual;

            objCVarOperationsBillNosFromAPI.DischargeDate = pDischargeDate == null ? "" : pDischargeDate.Trim();
            objCVarOperationsBillNosFromAPI.DischargeDateIsActual = pDischargeDateIsActual;


            objCVarOperationsBillNosFromAPI.OperationID = pOperationID;


            objCOperationsBillNosFromAPI.GetList("Where BillNo=N'" + pBillNo.Trim() + "'");
            if (objCOperationsBillNosFromAPI.lstCVarOperationsBillNosFromAPI.Count == 0)
            {
                objCOperationsBillNosFromAPI.lstCVarOperationsBillNosFromAPI.Add(objCVarOperationsBillNosFromAPI);
                checkException = objCOperationsBillNosFromAPI.SaveMethod(objCOperationsBillNosFromAPI.lstCVarOperationsBillNosFromAPI);

                if (checkException == null)
                {
                    return true;
                }
            }


            return _result;
        }


        [System.Web.Http.HttpGet, System.Web.Http.HttpPost]
        public bool UpdateBillsOperation(string pBillNo, Int64 pOperationID)
        {
            Exception checkException = null;
            bool _result = false;

            string pUpdateClause = "";

            COperationsBillNosFromAPI objCOperationsBillNosFromAPI = new COperationsBillNosFromAPI();

            objCOperationsBillNosFromAPI.GetList("Where 1=1");


            pUpdateClause += "OperationID=" + pOperationID + "\n";
            pUpdateClause += "WHERE BillNo=N'" + pBillNo.Trim() + "'" + "\n";

            checkException = objCOperationsBillNosFromAPI.UpdateList(pUpdateClause);

            if (checkException == null)
            {
                return true;
            }

            return _result;
        }

        [System.Web.Http.HttpGet, System.Web.Http.HttpPost]
        public bool UpdateBillsData([FromBody] UpdateBillGeneralData updateBillGeneralData)

        {
            bool _result = false;
            Exception checkException = null;
            int _RowCount = 0;

            COperationsBillNosFromAPI objCOperationsBillNosFromAPI = new COperationsBillNosFromAPI();

            CVarOperationsBillNosFromAPI objCVarOperationsBillNosFromAPI = new CVarOperationsBillNosFromAPI();

            objCVarOperationsBillNosFromAPI.ID = updateBillGeneralData.pBillNoID;


            objCVarOperationsBillNosFromAPI.BillNo = updateBillGeneralData.pBillNo == null ? "" : updateBillGeneralData.pBillNo.Trim();

            objCVarOperationsBillNosFromAPI.Status = updateBillGeneralData.pStatus == null ? "" : updateBillGeneralData.pStatus.Trim();
            objCVarOperationsBillNosFromAPI.LiveMapURL = updateBillGeneralData.pLiveMapURL == null ? "" : updateBillGeneralData.pLiveMapURL.Trim();
            objCVarOperationsBillNosFromAPI.ShippingLine = updateBillGeneralData.pShippingLine == null ? "" : updateBillGeneralData.pShippingLine.Trim();
            objCVarOperationsBillNosFromAPI.POLCountry = updateBillGeneralData.pPOLCountry == null ? "" : updateBillGeneralData.pPOLCountry.Trim();
            objCVarOperationsBillNosFromAPI.PODCountry = updateBillGeneralData.pPODCountry == null ? "" : updateBillGeneralData.pPODCountry.Trim();
            objCVarOperationsBillNosFromAPI.LoadPort = updateBillGeneralData.pLoadPort == null ? "" : updateBillGeneralData.pLoadPort.Trim();
            objCVarOperationsBillNosFromAPI.DischargePort = updateBillGeneralData.pDischargePort == null ? "" : updateBillGeneralData.pDischargePort.Trim();
            objCVarOperationsBillNosFromAPI.ContainersCount = updateBillGeneralData.pContainersCount;

            objCVarOperationsBillNosFromAPI.ETA = updateBillGeneralData.pETA == null ? "" : updateBillGeneralData.pETA.Trim();
            objCVarOperationsBillNosFromAPI.FormatedTransitTime = updateBillGeneralData.pFormatedTransitTime == null ? "" : updateBillGeneralData.pFormatedTransitTime.Trim();
            objCVarOperationsBillNosFromAPI.FirstETA = updateBillGeneralData.pFirstETA == null ? "" : updateBillGeneralData.pFirstETA.Trim();

            objCVarOperationsBillNosFromAPI.LoadingDate = updateBillGeneralData.pLoadingDate == null ? "" : updateBillGeneralData.pLoadingDate.Trim();
            objCVarOperationsBillNosFromAPI.LoadingDateIsActual = updateBillGeneralData.pLoadingDateIsActual;

            objCVarOperationsBillNosFromAPI.DepartureDate = updateBillGeneralData.pDepartureDate == null ? "" : updateBillGeneralData.pDepartureDate.Trim();
            objCVarOperationsBillNosFromAPI.DepartureDateIsActual = updateBillGeneralData.pDepartureDateIsActual;

            objCVarOperationsBillNosFromAPI.ArrivalDate = updateBillGeneralData.pArrivalDate == null ? "" : updateBillGeneralData.pArrivalDate.Trim();
            objCVarOperationsBillNosFromAPI.ArrivalDateIsActual = updateBillGeneralData.pArrivalDateIsActual;

            objCVarOperationsBillNosFromAPI.DischargeDate = updateBillGeneralData.pDischargeDate == null ? "" : updateBillGeneralData.pDischargeDate.Trim();
            objCVarOperationsBillNosFromAPI.DischargeDateIsActual = updateBillGeneralData.pDischargeDateIsActual;


            //objCVarOperationsBillNosFromAPI.OperationID = objCOperationsBillNosFromAPI.lstCVarOperationsBillNosFromAPI[0].OperationID;
            objCVarOperationsBillNosFromAPI.OperationID = updateBillGeneralData.pOperationID;



            objCOperationsBillNosFromAPI.lstCVarOperationsBillNosFromAPI.Add(objCVarOperationsBillNosFromAPI);
            checkException = objCOperationsBillNosFromAPI.SaveMethod(objCOperationsBillNosFromAPI.lstCVarOperationsBillNosFromAPI);
            if (checkException == null)
            {
                _result = true;

                //updateBillGeneralData.pWhereClause = (updateBillGeneralData.pWhereClause == null ? "" : updateBillGeneralData.pWhereClause.Trim().ToUpper());

                //checkException = objCOperationsBillNosFromAPI.GetListPaging(updateBillGeneralData.pPageSize, updateBillGeneralData.pPageNumber, updateBillGeneralData.pWhereClause, updateBillGeneralData.pOrderBy, out _RowCount);

            }

            return _result;
        }

        public Object[] GetContainersData(string pWhereClause)
        {

            int _RowCount = 0;

            CvwOperationsContainersFromAPI objCvwOperationsContainersFromAPI = new CvwOperationsContainersFromAPI();

            objCvwOperationsContainersFromAPI.GetListPaging(99999, 1, pWhereClause, "ID", out _RowCount);

            return new object[] {

                  new JavaScriptSerializer().Serialize(objCvwOperationsContainersFromAPI.lstCVarvwOperationsContainersFromAPI)

            };
        }

        [System.Web.Http.HttpGet, System.Web.Http.HttpPost]
        public bool InsertContainersData(string pBillNo, string pContanierNo, string pContanierTEU, string pContanierLiveMapUrl, string pContanierGateOutDate, string pContanierEmptyReturnDate, Int64 pOperationID, Int64 pOperationContainersAndPackagesID)
        {
            bool _result = false;
            Exception checkException = null;


            COperationsContainersFromAPI objCOperationsContainersFromAPI = new COperationsContainersFromAPI();
            CVarOperationsContainersFromAPI objCVarOperationsContainersFromAPI = new CVarOperationsContainersFromAPI();

            objCVarOperationsContainersFromAPI.BillNo = pBillNo == null ? "" : pBillNo.Trim();
            objCVarOperationsContainersFromAPI.ContainerNumber = pContanierNo == null ? "" : pContanierNo.Trim();
            objCVarOperationsContainersFromAPI.TEU = pContanierTEU == null ? "" : pContanierTEU.Trim();
            objCVarOperationsContainersFromAPI.LiveMapURL = pContanierLiveMapUrl == null ? "" : pContanierLiveMapUrl.Trim();
            objCVarOperationsContainersFromAPI.GateOutDate = pContanierGateOutDate == null ? "" : pContanierGateOutDate.Trim();
            objCVarOperationsContainersFromAPI.EmptyReturnDate = pContanierEmptyReturnDate == null ? "" : pContanierEmptyReturnDate.Trim();
            objCVarOperationsContainersFromAPI.OperationID = pOperationID;
            objCVarOperationsContainersFromAPI.OperationContainersAndPackagesID = pOperationContainersAndPackagesID;


            objCOperationsContainersFromAPI.GetList("Where ContainerNumber=N'" + pContanierNo.Trim() + "'");
            if (objCOperationsContainersFromAPI.lstCVarOperationsContainersFromAPI.Count == 0)
            {
                objCOperationsContainersFromAPI.lstCVarOperationsContainersFromAPI.Add(objCVarOperationsContainersFromAPI);
                checkException = objCOperationsContainersFromAPI.SaveMethod(objCOperationsContainersFromAPI.lstCVarOperationsContainersFromAPI);

                if (checkException == null)
                {
                    return true;
                }
            }


            return _result;
        }

        [System.Web.Http.HttpGet, System.Web.Http.HttpPost]
        public bool UpdateContainersOperation(string pContanierNo, Int64 pOperationID, Int64 pOperationContainersAndPackagesID)
        {
            Exception checkException = null;
            bool _result = false;

            string pUpdateClause = "";

            COperationsContainersFromAPI objCOperationsContainersFromAPI = new COperationsContainersFromAPI();

            objCOperationsContainersFromAPI.GetList("Where 1=1");

            //pUpdateClause += "BillNo=" + pBillNo + "\n";
            pUpdateClause += "OperationID=" + pOperationID + "\n";
            pUpdateClause += ",OperationContainersAndPackagesID=" + pOperationContainersAndPackagesID + "\n";
            pUpdateClause += "WHERE ContainerNumber=N'" + pContanierNo.Trim() + "'" + "\n";

            checkException = objCOperationsContainersFromAPI.UpdateList(pUpdateClause);

            if (checkException == null)
            {
                return true;
            }

            return _result;
        }

        [System.Web.Http.HttpGet, System.Web.Http.HttpPost]
        public bool UpdateContainersData(string pContanierNo, string pContanierTEU, string pContanierLiveMapUrl, string pContanierGateOutDate, string pContanierEmptyReturnDate)
        {
            Exception checkException = null;
            bool _result = false;

            string pUpdateClause = "";

            COperationsContainersFromAPI objCOperationsContainersFromAPI = new COperationsContainersFromAPI();

            objCOperationsContainersFromAPI.GetList("Where 1=1");


            pUpdateClause = "TEU=N'" + (pContanierTEU == null ? "" : pContanierTEU.Trim()) + "'" + "\n";
            pUpdateClause += ",LiveMapURL=N'" + (pContanierLiveMapUrl == null ? "" : pContanierLiveMapUrl.Trim()) + "'" + "\n";
            pUpdateClause += ",GateOutDate=N'" + (pContanierGateOutDate == null ? "" : pContanierGateOutDate.Trim()) + "'" + "\n";
            pUpdateClause += ",EmptyReturnDate=N'" + (pContanierEmptyReturnDate == null ? "" : pContanierEmptyReturnDate.Trim()) + "'" + "\n";

            pUpdateClause += "WHERE ContainerNumber=N'" + pContanierNo.Trim() + "'" + "\n";

            checkException = objCOperationsContainersFromAPI.UpdateList(pUpdateClause);

            if (checkException == null)
            {
                return true;
            }

            return _result;
        }

        [System.Web.Http.HttpGet, System.Web.Http.HttpPost]
        public object[] UpdateBillsDataWithBLNo(string pBillNo, string pStatus, string pLiveMapURL, string pShippingLine, string pPOLCountry, string pPODCountry, string pLoadPort, string pDischargePort, int pContainersCount, string pETA, string pFormatedTransitTime, string pFirstETA, string pLoadingDate, bool pLoadingDateIsActual, string pDepartureDate, bool pDepartureDateIsActual, string pArrivalDate, bool pArrivalDateIsActual, string pDischargeDate, bool pDischargeDateIsActual)
        {
            Exception checkException = null;
            bool _result = false;
            int _RowCount = 0;

            string pUpdateClause = "";

            COperationsBillNosFromAPI objCOperationsBillNosFromAPI = new COperationsBillNosFromAPI();

            CvwOperationsBillNosFromAPI objCvwOperationsBillNosFromAPI = new CvwOperationsBillNosFromAPI();

            objCOperationsBillNosFromAPI.GetList("Where 1=1");


            pUpdateClause = "Status=N'" + (pStatus == null ? "" : pStatus.Trim()) + "'" + "\n";

            pUpdateClause += ",LiveMapURL=N'" + (pLiveMapURL == null ? "" : pLiveMapURL.Trim()) + "'" + "\n";
            pUpdateClause += ",ShippingLine=N'" + (pShippingLine == null ? "" : pShippingLine.Trim()) + "'" + "\n";
            pUpdateClause += ",POLCountry=N'" + (pPOLCountry == null ? "" : pPOLCountry.Trim()) + "'" + "\n";
            pUpdateClause += ",PODCountry=N'" + (pPODCountry == null ? "" : pPODCountry.Trim()) + "'" + "\n";
            pUpdateClause += ",LoadPort=N'" + (pLoadPort == null ? "" : pLoadPort.Trim()) + "'" + "\n";
            pUpdateClause += ",DischargePort=N'" + (pDischargePort == null ? "" : pDischargePort.Trim()) + "'" + "\n";
            pUpdateClause += ",ContainersCount=" + pContainersCount + "\n";
            pUpdateClause += ",ETA=N'" + (pETA == null ? "" : pETA.Trim()) + "'" + "\n";
            pUpdateClause += ",FormatedTransitTime=N'" + (pFormatedTransitTime == null ? "" : pFormatedTransitTime.Trim()) + "'" + "\n";
            pUpdateClause += ",FirstETA=N'" + (pFirstETA == null ? "" : pFirstETA.Trim()) + "'" + "\n";
            pUpdateClause += ",LoadingDate=N'" + (pLoadingDate == null ? "" : pLoadingDate.Trim()) + "'" + "\n";
            pUpdateClause += ",LoadingDateIsActual='" + pLoadingDateIsActual + "'" + "\n";
            pUpdateClause += ",DepartureDate=N'" + (pDepartureDate == null ? "" : pDepartureDate.Trim()) + "'" + "\n";
            pUpdateClause += ",DepartureDateIsActual='" + pDepartureDateIsActual + "'" + "\n";
            pUpdateClause += ",ArrivalDate=N'" + (pArrivalDate == null ? "" : pArrivalDate.Trim()) + "'" + "\n";
            pUpdateClause += ",ArrivalDateIsActual='" + pArrivalDateIsActual + "'" + "\n";
            pUpdateClause += ",DischargeDate=N'" + (pDischargeDate == null ? "" : pDischargeDate.Trim()) + "'" + "\n";
            pUpdateClause += ",DischargeDateIsActual='" + pDischargeDateIsActual + "'" + "\n";

            pUpdateClause += "WHERE BillNo=N'" + pBillNo.Trim() + "'" + "\n";

            checkException = objCOperationsBillNosFromAPI.UpdateList(pUpdateClause);

            if (checkException == null)
            {
                _result = true;

                //var pWhereClause = "WHERE BillNo=N'" + pBillNo.Trim() + "'";
                var pWhereClause = "WHERE 1=1";

                objCvwOperationsBillNosFromAPI.GetListPaging(99999, 1, pWhereClause, "ID", out _RowCount);

            }
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new object[] {
                _result //pData[0]
                , _result ? serializer.Serialize(objCvwOperationsBillNosFromAPI.lstCVarvwOperationsBillNosFromAPI) : null //pData[1]
                , _RowCount //pData[2]
            };


        }


        [System.Web.Http.HttpGet, System.Web.Http.HttpPost]
        public object[] LoadWithWhereClause(Int32 pPageNumber, Int32 pPageSize, string pWhereClause)
        {
            CvwOperationsBillNosFromAPI objCvwOperationsBillNosFromAPI = new CvwOperationsBillNosFromAPI();

            Int32 _RowCount = 0;

            objCvwOperationsBillNosFromAPI.GetListPaging(pPageSize, pPageNumber, pWhereClause, " ID DESC ", out _RowCount);

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[] {
                serializer.Serialize(objCvwOperationsBillNosFromAPI.lstCVarvwOperationsBillNosFromAPI)
                , _RowCount
            };
        }


        [System.Web.Http.HttpGet, System.Web.Http.HttpPost]
        public bool UpdateOperationsData(Int64 pOperationID, string pExpectedArrival)
        {
            Exception checkException = null;
            bool _result = false;

            string pUpdateClause = "";

            CRoutings objCRoutings = new CRoutings();

            objCRoutings.GetList("Where 1=1");

            pUpdateClause = "ExpectedArrival='" + DateTime.ParseExact(pExpectedArrival, "yyyy-MM-dd", CultureInfo.InvariantCulture) + "'" + "\n";

            pUpdateClause += "WHERE OperationID=" + pOperationID + "\n";

            checkException = objCRoutings.UpdateList(pUpdateClause);

            if (checkException == null)
            {
                _result = true;

            }
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return _result;

        }


    }
    public class BillTrackingController : BaseController
    {
        [System.Web.Mvc.HttpGet]
        public PartialViewResult BillTracking(string pCutlureID)
        {
            SetLanguage(pCutlureID);
            return PartialView("_BillTracking");
        }
    }


    public class InsertBillGeneralData
    {
        public Int64 pBillNoID { get; set; }

        public String pBillNo { get; set; }

        public String pStatus { get; set; }

        public String pLiveMapURL { get; set; }

        public String pShippingLine { get; set; }

        public String pPOLCountry { get; set; }

        public String pPODCountry { get; set; }

        public String pLoadPort { get; set; }

        public String pDischargePort { get; set; }

        public Int32 pContainersCount { get; set; }

        public String pETA { get; set; }

        public String pFormatedTransitTime { get; set; }

        public String pFirstETA { get; set; }

        public String pLoadingDate { get; set; }

        public Boolean pLoadingDateIsActual { get; set; }

        public String pDepartureDate { get; set; }

        public Boolean pDepartureDateIsActual { get; set; }

        public String pArrivalDate { get; set; }

        public Boolean pArrivalDateIsActual { get; set; }

        public String pDischargeDate { get; set; }

        public Boolean pDischargeDateIsActual { get; set; }

        public Int64 pOperationID { get; set; }

        /*****************************/
        public string pWhereClause { get; set; }
        public Int32 pPageSize { get; set; }
        public Int32 pPageNumber { get; set; }
        public string pOrderBy { get; set; }
    }

    public class UpdateBillGeneralData
    {
        public Int64 pBillNoID { get; set; }

        public String pBillNo { get; set; }

        public String pStatus { get; set; }

        public String pLiveMapURL { get; set; }

        public String pShippingLine { get; set; }

        public String pPOLCountry { get; set; }

        public String pPODCountry { get; set; }

        public String pLoadPort { get; set; }

        public String pDischargePort { get; set; }

        public Int32 pContainersCount { get; set; }

        public String pETA { get; set; }

        public String pFormatedTransitTime { get; set; }

        public String pFirstETA { get; set; }

        public String pLoadingDate { get; set; }

        public Boolean pLoadingDateIsActual { get; set; }

        public String pDepartureDate { get; set; }

        public Boolean pDepartureDateIsActual { get; set; }

        public String pArrivalDate { get; set; }

        public Boolean pArrivalDateIsActual { get; set; }

        public String pDischargeDate { get; set; }

        public Boolean pDischargeDateIsActual { get; set; }

        public Int64 pOperationID { get; set; }

        /*****************************/
        public string pWhereClause { get; set; }
        public Int32 pPageSize { get; set; }
        public Int32 pPageNumber { get; set; }
        public string pOrderBy { get; set; }
    }

}
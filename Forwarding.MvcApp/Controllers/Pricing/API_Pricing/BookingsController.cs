
using Forwarding.BLL.Utilities;
using Forwarding.MvcApp.Common;
using Forwarding.MvcApp.Controllers.Administration.API_Security;
using Forwarding.MvcApp.Controllers.MasterData.API_Partners;
using Forwarding.MvcApp.Models.Administration.Security.Generated;
using Forwarding.MvcApp.Models.Administration.Settings.Customized;
using Forwarding.MvcApp.Models.Administration.Settings.Generated;
using Forwarding.MvcApp.Models.Customized;
using Forwarding.MvcApp.Models.MasterData.Locations.Generated;
using Forwarding.MvcApp.Models.MasterData.Others.Generated;
using Forwarding.MvcApp.Models.MasterData.Partners.Generated;
using Forwarding.MvcApp.Models.Operations.Operations.Generated;
using Forwarding.MvcApp.Models.PricingModule.PricingTab;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Web.Http;
using System.Web.Script.Serialization;
using System.Web.Security;
using System.Windows.Documents;
using WebMatrix.WebData;
using static System.Windows.Forms.AxHost;


namespace Forwarding.MvcApp.Controllers.Pricing.API_Pricing
{
    public class BookingsController : ApiController
    {
        [HttpGet]
        public Object[] LoadAll(string pWhereClause)
        {
            int _rowCount = 0;
            Exception checkException = null;
            string _messageReturned = "";


            CvwBookings objCvwBookings = new CvwBookings();
            checkException = objCvwBookings.GetList(pWhereClause);


            if (checkException != null)
            {
                _messageReturned = checkException.Message;
            }

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[]
            {
                serializer.Serialize(objCvwBookings.lstCVarvwBookings), // 0
                _rowCount, // 1
                _messageReturned  //2
                
            };

        }
        [HttpGet]
        public Object[] LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned(Int32 pPageNumber, Int32 pPageSize, string pWhereClause, string pOrderBy)
        {
            int _rowCount = 0;
            Exception checkException = null;
            string _messageReturned = "";


            CvwBookings objCvwBookings = new CvwBookings();
            checkException = objCvwBookings.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _rowCount);


            if(checkException != null)
            {
                _messageReturned = checkException.Message;
            }

            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[]
            {
                serializer.Serialize(objCvwBookings.lstCVarvwBookings), // 0
                _rowCount, // 1
                _messageReturned  //2
                
            };

        }

        [HttpPost]
        public object[] Insert([FromBody] BookingData insertUserData)
        {
            bool _result = false;

            CBookings objCBookings = new CBookings();
            CVarBookings objCVarBookings = new CVarBookings();
            objCVarBookings.ID = 0;
            objCVarBookings.Hazmat = insertUserData.Hazmat;
            objCVarBookings.ContractHolder = insertUserData.ContractHolderID;
            objCVarBookings.BookingNumber = insertUserData.BookingNumber;
            objCVarBookings.ContainerType1 = insertUserData.ContainerType1ID;
            objCVarBookings.ContainerQuantity1 = insertUserData.NumberOfContainers1;
            objCVarBookings.ContainerType2 = insertUserData.ContainerType2ID;
            objCVarBookings.ContainerQuantity2 = insertUserData.NumberOfContainers2;
            objCVarBookings.POLCountryID = insertUserData.POLCountryID;
            objCVarBookings.POLID = insertUserData.POLID;
            objCVarBookings.PODCountryID = insertUserData.PODCountryID;
            objCVarBookings.PODID = insertUserData.PODID;
            objCVarBookings.ShippingLineID = insertUserData.ShippingLineID;
            objCVarBookings.VesselID = insertUserData.VesselID;
            objCVarBookings.VoyageNumber = insertUserData.VoyageNumber;
            objCVarBookings.WarehouseID = insertUserData.WarehouseID;
            objCVarBookings.CustomerID = insertUserData.CustomerID;
            objCVarBookings.SLDate = insertUserData.SLDate;
            objCVarBookings.SLDateOfSubmission = insertUserData.SLDateOfSubmission;
            objCVarBookings.ValidatedTitlesDate = insertUserData.ValidatedTitlesDate;
            objCVarBookings.DateOfSubmission = insertUserData.DateOfSubmission;
            objCVarBookings.TermCutOffDate = insertUserData.TermCutOffDate;
            objCVarBookings.ETDDate = insertUserData.ETDDate;
            objCVarBookings.BLCheckDate = insertUserData.BLCheckDate;
            objCVarBookings.CreatorUserID = objCVarBookings.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarBookings.CreationDate = objCVarBookings.ModificationDate = DateTime.Now;
            objCVarBookings.IsFromCustomer = false;
            objCVarBookings.OperationID = 0;
            objCVarBookings.Comments = insertUserData.Comments;
            objCVarBookings.Comments2 = insertUserData.Comments2;

            objCBookings.lstCVarBookings.Add(objCVarBookings);
            Exception checkException = objCBookings.SaveMethod(objCBookings.lstCVarBookings);

            string _message = "";
            if (checkException == null)
            {
                _result = true;
            } else
            {
                _message = checkException.Message;
            }

            return new object[] { _result, _message };
        }

        [HttpPost]
        public object[] Update([FromBody] BookingData updateUserData)
        {
            bool _result = false;
            CBookings objCBookingsCreationInformation = new CBookings();

            Exception ex =  objCBookingsCreationInformation.GetItem(updateUserData.ID);
            if(ex != null || objCBookingsCreationInformation.lstCVarBookings.Count != 1)
            {
                return new object[] { _result, ex.Message };
            }

            CBookings objCBookings = new CBookings();
            CVarBookings objCVarBookings = new CVarBookings();
            objCVarBookings.ID = updateUserData.ID;
            objCVarBookings.Hazmat = updateUserData.Hazmat;
            objCVarBookings.ContractHolder = updateUserData.ContractHolderID;
            objCVarBookings.BookingNumber = updateUserData.BookingNumber;
            objCVarBookings.ContainerType1 = updateUserData.ContainerType1ID;
            objCVarBookings.ContainerQuantity1 = updateUserData.NumberOfContainers1;
            objCVarBookings.ContainerType2 = updateUserData.ContainerType2ID;
            objCVarBookings.ContainerQuantity2 = updateUserData.NumberOfContainers2;
            objCVarBookings.POLCountryID = updateUserData.POLCountryID;
            objCVarBookings.POLID = updateUserData.POLID;
            objCVarBookings.PODCountryID = updateUserData.PODCountryID;
            objCVarBookings.PODID = updateUserData.PODID;
            objCVarBookings.ShippingLineID = updateUserData.ShippingLineID;
            objCVarBookings.VesselID = updateUserData.VesselID;
            objCVarBookings.VoyageNumber = updateUserData.VoyageNumber;
            objCVarBookings.WarehouseID = updateUserData.WarehouseID;
            objCVarBookings.CustomerID = updateUserData.CustomerID;
            objCVarBookings.SLDate = updateUserData.SLDate;
            objCVarBookings.SLDateOfSubmission = updateUserData.SLDateOfSubmission;
            objCVarBookings.ValidatedTitlesDate = updateUserData.ValidatedTitlesDate;
            objCVarBookings.DateOfSubmission = updateUserData.DateOfSubmission;
            objCVarBookings.TermCutOffDate = updateUserData.TermCutOffDate;
            objCVarBookings.ETDDate = updateUserData.ETDDate;
            objCVarBookings.BLCheckDate = updateUserData.BLCheckDate;
            objCVarBookings.CreatorUserID = objCBookingsCreationInformation.lstCVarBookings[0].CreatorUserID;
            objCVarBookings.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarBookings.CreationDate = objCBookingsCreationInformation.lstCVarBookings[0].CreationDate;
            objCVarBookings.ModificationDate = DateTime.Now;
            objCVarBookings.IsFromCustomer = objCBookingsCreationInformation.lstCVarBookings[0].IsFromCustomer;
            objCVarBookings.OperationID = objCBookingsCreationInformation.lstCVarBookings[0].OperationID;
            objCVarBookings.Comments = updateUserData.Comments;
            objCVarBookings.Comments2 = updateUserData.Comments2;


            objCBookings.lstCVarBookings.Add(objCVarBookings);
            Exception checkException = objCBookings.SaveMethod(objCBookings.lstCVarBookings);

            string _message = "";
            if (checkException == null)
            {
                _result = true;
            }
            else
            {
                _message = checkException.Message;
            }

            return new object[] { _result, _message };
        }

        [HttpGet, HttpPost]
        public bool Delete(String pBookingsIDs)
        {
            bool _result = false;

            var DeletedBookings = new CvwBookings();
            Exception ex = DeletedBookings.GetListPaging(50, 1, $" WHERE ID IN ({pBookingsIDs})", " ID ", out _);
            if (ex != null)
            {
                return _result;
            } else
            {
                foreach (var currentBooking in DeletedBookings.lstCVarvwBookings)
                {
                    var obj = currentBooking;
                    Logging.Save<CVarvwBookings>(ref obj, Convert.ToInt32(currentBooking.ID));
                }

            }

            CBookings objCBookings = new CBookings();
            foreach (var currentID in pBookingsIDs.Split(','))
            {
                objCBookings.lstDeletedCPKBookings.Add(new CPKBookings() { ID = Int32.Parse(currentID.Trim()) });
            }

            Exception checkException = objCBookings.DeleteItem(objCBookings.lstDeletedCPKBookings);
            if (checkException != null)
            {
                if (checkException.Message.Contains("DELETE")) // some or all of the rows were not deleted due to dependencies
                    _result = false;
            }
            else
                _result = true;


            return _result;
        }

        [HttpPost]
        public object[] InsertListFromExcel_Bookings([FromBody] InsertListFromExcel_Bookings InsertListFromExcel_Bookings)
        {
            string pReturnedMessage = "";
            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
            int ExcelRowsCount = 0;

            var InsertedHazmat = InsertListFromExcel_Bookings.HazmatList.Split(',');
            var InsertedContractHolder = InsertListFromExcel_Bookings.ContractHolderList.Split(',');
            var InsertedBookingNumbers = InsertListFromExcel_Bookings.BookingNoList.Split(',');
            //var InsertedContainer1 = InsertListFromExcel_Bookings.Container1List.Split(',');
            //var InsertedContainer1No = InsertListFromExcel_Bookings.Container1NoList.Split(',');
            //var InsertedContainer2 = InsertListFromExcel_Bookings.Container2List.Split(',');
            //var InsertedContainer2No = InsertListFromExcel_Bookings.Container2NoList.Split(',');
            var Inserted40HCNo = InsertListFromExcel_Bookings.Container40List.Split(',');
            var Inserted45HCNo = InsertListFromExcel_Bookings.Container45List.Split(',');
            var InsertedPOLPorts = InsertListFromExcel_Bookings.POLCodeList.Split(',');
            var InsertedPODPorts = InsertListFromExcel_Bookings.PODCodeList.Split(',');
            var InsertedShippingLine = InsertListFromExcel_Bookings.ShippingLineList.Split(',');
            var InsertedVessel = InsertListFromExcel_Bookings.VesselList.Split(',');
            var InsertedVoyageNumber = InsertListFromExcel_Bookings.VoyageNumberList.Split(',');
            var InsertedWarehouse = InsertListFromExcel_Bookings.WarehouseList.Split(',');
            var InsertedCustomers = InsertListFromExcel_Bookings.CustomerList.Split(',');
            var InsertedSlDate = InsertListFromExcel_Bookings.SLDateList.Split(',');
            var InsertedSlTime = InsertListFromExcel_Bookings.SLTimeList.Split(',');
            var InsertedSLDateOfSubmission = InsertListFromExcel_Bookings.SLDateOfSubmissionList.Split(',');
            var InsertedValidatedTitles = InsertListFromExcel_Bookings.ValidatedTitlesDateList.Split(',');
            var InsertedDateOfSubmission = InsertListFromExcel_Bookings.DateOfSubmissionList.Split(',');
            var InsertedTermCutOffDate = InsertListFromExcel_Bookings.TermCutOffDateList.Split(',');
            var InsertedETD = InsertListFromExcel_Bookings.ETDDateList.Split(',');
            var InsertedBlCheckDateList = InsertListFromExcel_Bookings.BlCheckDateList.Split(',');
            var InsertedCommentsList = InsertListFromExcel_Bookings.CommentsList.Split(',');
            var InsertedComments2List = InsertListFromExcel_Bookings.Comments2List.Split(',');


            #region Validations
            var AllInsertedData = new string[][]
            {
                InsertedHazmat
                ,InsertedContractHolder
                ,InsertedBookingNumbers
                ,Inserted40HCNo
                ,Inserted45HCNo
                ,InsertedPOLPorts
                ,InsertedPODPorts
                ,InsertedShippingLine
                ,InsertedVessel
                ,InsertedVoyageNumber
                ,InsertedWarehouse
                ,InsertedCustomers
                ,InsertedSlDate
                ,InsertedSLDateOfSubmission
                ,InsertedValidatedTitles
                ,InsertedDateOfSubmission
                ,InsertedTermCutOffDate
                ,InsertedETD
                ,InsertedBlCheckDateList
                ,InsertedCommentsList
                ,InsertedComments2List
            };
            bool allSameLength = AllInsertedData.All(h => h.Length == AllInsertedData[0].Length);
            if (!allSameLength)
            {
                return new object[] {
                        $"Error Happened, Please Check the Excel File"
                    };
            } else
            {
                ExcelRowsCount = AllInsertedData[0].Length;
            }




            // Check For Booking Number If it exists already in Database
            List<string> ExistingBookingNumbers = objCCustomizedDBCall.ExecuteQuery_Array("select BookingNumber from Bookings");
            ExistingBookingNumbers = ExistingBookingNumbers.Select(b => b.ToUpper()).ToList();
            
            foreach(var booking in InsertedBookingNumbers)
            {
                if (ExistingBookingNumbers.Contains(booking.ToUpper()))
                {
                    return new object[] {
                        $"Booking Number => {booking.ToUpper()} - Exists Already In Another Booking"
                    };
                }
            }

            // Check Ports Code are correct
            List<string> ExistingPorts = objCCustomizedDBCall.ExecuteQuery_Array("select Code from Ports");
            ExistingPorts = ExistingPorts.Select(b => b.ToUpper()).ToList();
            
            foreach (var port in InsertedPOLPorts)
            {
                if (!ExistingPorts.Contains(port.ToUpper()))
                {
                    return new object[] {
                        $"POL Code => {port.ToUpper()} - Not Found"
                    };
                }
            }
            foreach (var port in InsertedPODPorts)
            {
                if (!ExistingPorts.Contains(port.ToUpper()))
                {
                    return new object[] {
                        $"POD Code => {port.ToUpper()} - Not Found"
                    };
                }
            }

            //Check Customer Already Exists
            List<string> ExistingCustomers = objCCustomizedDBCall.ExecuteQuery_Array("select Name from Customers");
            ExistingCustomers = ExistingCustomers.Select(b => b.ToUpper()).ToList();
            
            foreach (var customer in InsertedCustomers)
            {
                if (!ExistingCustomers.Contains(customer.ToUpper()))
                {
                    return new object[] {
                        $"Customer => {customer.ToUpper()} - Not Found"
                    };
                }
            }

            //Check if SLDate are parsed Correctly
            
            foreach (var slDate in InsertedSlDate)
            {
                if (!DateTime.TryParseExact(slDate, "dd/MM/yyyy", CultureInfo.InvariantCulture, DateTimeStyles.None, out _))
                {
                    return new object[] {
                        $"SI Date {slDate} => Invalid"
                    };
                }
            }

            //Check if SLTime are parsed Correctly

            foreach (var slTime in InsertedSlTime)
            {
                if (!DateTime.TryParseExact(slTime, "hh:mm tt", CultureInfo.InvariantCulture, DateTimeStyles.None, out _))
                {
                    return new object[] {
                        $"SI Time {slTime} => Invalid"
                    };
                }
            }

            //Check if ValidatedTitles Dates Parsed Correctly

            foreach (var validatedTitlesDate in InsertedValidatedTitles)
            {
                if (!DateTime.TryParseExact(validatedTitlesDate, "dd/MM/yyyy", CultureInfo.InvariantCulture, DateTimeStyles.None, out _))
                {
                    return new object[] {
                        $"Validated Titles Date {validatedTitlesDate} => Invalid"
                    };
                }
            }

            //Check if SLDateOfSubmission Dates Parsed Correctly
            
            foreach (var sldateOfSubmission in InsertedSLDateOfSubmission)
            {
                if(sldateOfSubmission == "0")
                {
                    continue;
                }
                if (!DateTime.TryParseExact(sldateOfSubmission, "dd/MM/yyyy", CultureInfo.InvariantCulture, DateTimeStyles.None, out _))
                {
                    return new object[] {
                        $"SI Date Of Submission {sldateOfSubmission} => Invalid"
                    };
                }
            }

            //Check if DateOfSubmission Dates Parsed Correctly
            
            foreach (var dateOfSubmission in InsertedDateOfSubmission)
            {
                if (dateOfSubmission == "0")
                {
                    continue;
                }
                if (!DateTime.TryParseExact(dateOfSubmission, "dd/MM/yyyy", CultureInfo.InvariantCulture, DateTimeStyles.None, out _))
                {
                    return new object[] {
                        $"Date Of Submission {dateOfSubmission} => Invalid"
                    };
                }
            }

            //Check if TermCutOff Dates Parsed Correctly
            
            foreach (var termCutOff in InsertedTermCutOffDate)
            {
                if (termCutOff == "0")
                {
                    continue;
                }
                if (!DateTime.TryParseExact(termCutOff, "dd/MM/yyyy", CultureInfo.InvariantCulture, DateTimeStyles.None, out _))
                {
                    return new object[] {
                        $"Term CutOff {termCutOff} => Invalid"
                    };
                }
            }

            //Check if ETD Dates Parsed Correctly
            
            foreach (var etd in InsertedETD)
            {
                if (etd == "0")
                {
                    continue;
                }
                if (!DateTime.TryParseExact(etd, "dd/MM/yyyy", CultureInfo.InvariantCulture, DateTimeStyles.None, out _))
                {
                    return new object[] {
                        $"ETD {etd} => Invalid"
                    };
                }
            }

            //Check if BLCheckDate Dates Parsed Correctly
            
            foreach (var blCheckDate in InsertedBlCheckDateList)
            {
                if (blCheckDate == "0")
                {
                    continue;
                }
                if (!DateTime.TryParseExact(blCheckDate, "dd/MM/yyyy", CultureInfo.InvariantCulture, DateTimeStyles.None, out _))
                {
                    return new object[] {
                        $"B/L Check Date {blCheckDate} => Invalid"
                    };
                }
            }
            #endregion


            CPorts objCPorts = new CPorts();
            Exception e = objCPorts.GetList(" WHERE 1=1");
            if(e != null)
            {
                pReturnedMessage = "Error Happened in getting Ports";
                return new object[] {
                    pReturnedMessage
                };
            }
            var PortsList = objCPorts.lstCVarPorts;

            CCustomers objCCustomers = new CCustomers();
            e = objCCustomers.GetList(" WHERE 1=1");
            if (e != null)
            {
                pReturnedMessage = "Error Happened in getting Customers";
                return new object[] {
                    pReturnedMessage
                };
            }
            var CustomersList = objCCustomers.lstCVarCustomers;

            CContainerTypes objCContainerTypes = new CContainerTypes();
            objCContainerTypes.GetList("WHERE IsInactive=0");

            CBookings objBookings = new CBookings();
            for (int i = 0; i < ExcelRowsCount; i++)
            {
                CVarBookings Booking = new CVarBookings();
                Booking.ID = 0;
                Booking.Hazmat = InsertedHazmat[i].ToLower();
                Booking.ContractHolder = int.Parse(InsertedContractHolder[i]);
                Booking.BookingNumber = InsertedBookingNumbers[i].ToUpper();
                Booking.ContainerType1 = objCContainerTypes.lstCVarContainerTypes.Where(c => c.Code == "40HC").FirstOrDefault().ID;
                Booking.ContainerQuantity1 = int.Parse(Inserted40HCNo[i]);
                Booking.ContainerType2 = objCContainerTypes.lstCVarContainerTypes.Where(c => c.Code == "45HC").FirstOrDefault().ID;
                Booking.ContainerQuantity2 = int.Parse(Inserted45HCNo[i]);

                Booking.POLCountryID = PortsList.Where(p => p.Code == InsertedPOLPorts[i].ToUpper()).FirstOrDefault().CountryID;
                Booking.POLID = PortsList.Where(p => p.Code == InsertedPOLPorts[i].ToUpper()).FirstOrDefault().ID;

                Booking.PODCountryID = PortsList.Where(p => p.Code == InsertedPODPorts[i].ToUpper()).FirstOrDefault().CountryID;
                Booking.PODID = PortsList.Where(p => p.Code == InsertedPODPorts[i].ToUpper()).FirstOrDefault().ID;

                Booking.ShippingLineID = int.Parse(InsertedShippingLine[i]);
                Booking.VesselID = int.Parse(InsertedVessel[i]);
                Booking.VoyageNumber = InsertedVoyageNumber[i];
                Booking.WarehouseID = int.Parse(InsertedWarehouse[i]);

                Booking.CustomerID = CustomersList.Where(c => c.Name == InsertedCustomers[i].ToUpper()).FirstOrDefault().ID;

                Booking.SLDate = DateTime.ParseExact(InsertedSlDate[i] + " " + InsertedSlTime[i], "dd/MM/yyyy hh:mm tt", CultureInfo.InvariantCulture, DateTimeStyles.None);

                Booking.SLDateOfSubmission = InsertedSLDateOfSubmission[i] == "0" ? DateTime.Parse("01-01-1900") : DateTime.ParseExact(InsertedSLDateOfSubmission[i], "dd/MM/yyyy", CultureInfo.InvariantCulture, DateTimeStyles.None);

                Booking.ValidatedTitlesDate = DateTime.ParseExact(InsertedValidatedTitles[i], "dd/MM/yyyy", CultureInfo.InvariantCulture, DateTimeStyles.None);

                Booking.DateOfSubmission = InsertedDateOfSubmission[i] == "0" ? DateTime.Parse("01-01-1900") : DateTime.ParseExact(InsertedDateOfSubmission[i], "dd/MM/yyyy", CultureInfo.InvariantCulture, DateTimeStyles.None);

                Booking.TermCutOffDate = InsertedTermCutOffDate[i] == "0" ? DateTime.Parse("01-01-1900") : DateTime.ParseExact(InsertedTermCutOffDate[i], "dd/MM/yyyy", CultureInfo.InvariantCulture, DateTimeStyles.None);

                Booking.ETDDate = InsertedETD[i] == "0" ? DateTime.Parse("01-01-1900") : DateTime.ParseExact(InsertedETD[i], "dd/MM/yyyy", CultureInfo.InvariantCulture, DateTimeStyles.None);

                Booking.BLCheckDate = InsertedBlCheckDateList[i] == "0" ? DateTime.Parse("01-01-1900") : DateTime.ParseExact(InsertedBlCheckDateList[i], "dd/MM/yyyy", CultureInfo.InvariantCulture, DateTimeStyles.None);

                Booking.CreatorUserID = Booking.ModificatorUserID = WebSecurity.CurrentUserId;
                Booking.CreationDate = Booking.ModificationDate = DateTime.Now;

                Booking.IsFromCustomer = false;
                Booking.OperationID = 0;
                Booking.Comments = InsertedCommentsList[i];
                Booking.Comments2 = InsertedComments2List[i];

                objBookings.lstCVarBookings.Add(Booking);
            }

            e = objBookings.SaveMethod(objBookings.lstCVarBookings);
            if (e != null)
                pReturnedMessage = e.Message;


            return new object[] {
                pReturnedMessage
            };
        }
    }

    public class BookingData
    {
        public int ID { get; set; }
        public string Hazmat { get; set; }
        public int ContractHolderID { get; set; }
        public string BookingNumber { get; set; }
        public int CustomerID { get; set; }
        public int POLCountryID { get; set; }
        public int POLID { get; set; }
        public int PODCountryID { get; set; }
        public int PODID { get; set; }
        public int ContainerType1ID { get; set; }
        public int NumberOfContainers1 { get; set; }
        public int ContainerType2ID { get; set; }
        public int NumberOfContainers2 { get; set; }
        public int ShippingLineID { get; set; }
        public int VesselID { get; set; }
        public string VoyageNumber { get; set; }
        public int WarehouseID { get; set; }
        public DateTime SLDate { get; set; }
        public DateTime SLDateOfSubmission { get; set; }
        public DateTime ValidatedTitlesDate { get; set; }
        public DateTime DateOfSubmission { get; set; }
        public DateTime TermCutOffDate { get; set; }
        public DateTime ETDDate { get; set; }
        public DateTime BLCheckDate { get; set; }
        public string Comments { get; set; }
        public string Comments2 { get; set; }
    }

    public class InsertListFromExcel_Bookings
    {
        public string HazmatList { get; set; }
        public string ContractHolderList { get; set; }
        public string BookingNoList { get; set; }
        public string Container40List { get; set; }
        public string Container45List { get; set; }
        public string POLCodeList { get; set; }
        public string PODCodeList { get; set; }
        public string ShippingLineList { get; set; }
        public string VesselList { get; set; }
        public string VoyageNumberList { get; set; }
        public string WarehouseList { get; set; }
        public string CustomerList { get; set; }
        public string SLDateList { get; set; }
        public string SLTimeList { get; set; }
        public string SLDateOfSubmissionList { get; set; }
        public string ValidatedTitlesDateList { get; set; }
        public string DateOfSubmissionList { get; set; }
        public string TermCutOffDateList { get; set; }
        public string ETDDateList { get; set; }
        public string BlCheckDateList { get; set; }
        public string CommentsList { get; set; }
        public string Comments2List { get; set; }
    }
}

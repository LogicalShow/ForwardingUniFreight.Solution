using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;

namespace Forwarding.MvcApp.Models.IATAIntegration
{
    public static class CheckValidationFWB
    {
        public static string Validate(AirWayBillMessage message)
        {
            List<string> InvalidFields = new List<string>();
            // Check for null values to avoid NullReferenceException
            if (message == null)
                InvalidFields.Add("Invalid message");

            // Use a regex pattern that ensures the entire string matches
            if (!Regex.IsMatch(message.airWaybillNumber, @"^[0-9]{3}-[0-9]{8}$"))
                InvalidFields.Add("Air way bill number");

            //Master POL Code
            if (!Regex.IsMatch(message.origin, @"^[a-zA-Z]{3}$"))
                InvalidFields.Add("POL Code");

            //Master POD Code
            if (!Regex.IsMatch(message.destination, @"^[a-zA-Z]{3}$"))
                InvalidFields.Add("POD Code");

            //Master number of pieces
            if (!(message.totalConsignmentNumberOfPieces > 0))
                InvalidFields.Add("Number of pieces");

            //Master gross weight
            if (!(message.weight.amount > 0))
                InvalidFields.Add("Gross weight");

            //Shipper
            if (message.shipper.address.streetAddress1 == "" || message.shipper.address.postCode == "" || message.shipper.address.country == "" || message.shipper.address.place == "")
                InvalidFields.Add("Shipper Address");

            //Consignee
            if (message.consignee.address.streetAddress1 == "" || message.consignee.address.postCode == "" || message.consignee.address.country == "" || message.consignee.address.place == "")
                InvalidFields.Add("Consignee Address");

            //Execution date
            if(message.carriersExecution.date.Year != DateTime.Now.Year)
                InvalidFields.Add("Departure date");

            if (message.senderReference.fileReference == "")
                InvalidFields.Add("Reference number");

            if (message.route[0].carrierCode == "")
                InvalidFields.Add("Airline");

            return string.Join(" , ", InvalidFields);
        }
    }
}

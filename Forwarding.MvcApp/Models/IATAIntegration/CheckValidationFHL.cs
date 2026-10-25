using System.Collections.Generic;
using System.Text.RegularExpressions;
using static AutoMapper.Internal.ExpressionFactory;
using System.Web.UI;
using System.Windows.Forms;

namespace Forwarding.MvcApp.Models.IATAIntegration
{
    public static class CheckValidationFHL
    {
        public static string Validate(ConsolidationListMessage message)
        {
            List<string> InvalidFields = new List<string>();
            // Check for null values to avoid NullReferenceException
            if (message == null)
                InvalidFields.Add("Invalid message");

            // Use a regex pattern that ensures the entire string matches
            if (!Regex.IsMatch(message.airWaybillNumber, @"^[0-9]{3}-[0-9]{8}$"))
                InvalidFields.Add("Air way bill number");

            //Master POL Code
            if (!Regex.IsMatch(message.originAndDestination.origin, @"^[a-zA-Z]{3}$"))
                InvalidFields.Add("Master BL POL Code");

            //Master POD Code
            if (!Regex.IsMatch(message.originAndDestination.destination, @"^[a-zA-Z]{3}$"))
                InvalidFields.Add("Master BL POD Code");

            //Master number of pieces
            if (!(message.quantity.numberOfPieces > 0))
                InvalidFields.Add("Master BL number of pieces");

            //Master gross weight
            if (!(message.quantity.weight.amount > 0))
                InvalidFields.Add("Master BL gross weight");

            //Shipper
            if (message.shipper.address.streetAddress1 == "" || message.shipper.address.postCode == "" || message.shipper.address.country == "" || message.shipper.address.place == "")
                InvalidFields.Add("Shipper Address");

            //Consignee
            if (message.consignee.address.streetAddress1 == "" || message.consignee.address.postCode == "" || message.consignee.address.country == "" || message.consignee.address.place == "")
                InvalidFields.Add("Consignee Address");

            //Houses
            message.houseWaybillSummaries.ForEach(house =>
            {
                if(house.serialNumber == "")
                    InvalidFields.Add("House number");

                if (!Regex.IsMatch(house.origin, @"^[a-zA-Z]{3}$"))
                    InvalidFields.Add("House POL Code");

                if (!Regex.IsMatch(house.destination, @"^[a-zA-Z]{3}$"))
                    InvalidFields.Add("House POD Code");

                if (!(house.numberOfPieces > 0))
                    InvalidFields.Add("House number of pieces");

                if (!(house.weight.amount > 0))
                    InvalidFields.Add("House gross weight");
            });

            return string.Join(" , ",InvalidFields);
        }
    }
}

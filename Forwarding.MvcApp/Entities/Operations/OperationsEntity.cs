using System;
using System.Collections.Generic;
using Forwarding.MvcApp.AutoMapperConfig;
using OperationsOld = Forwarding.MvcApp.Models.Operations.Operations.Generated.Old;

namespace Forwarding.MvcApp.Entities.Operations
{
    [Serializable]
    public class CPKOperations : OperationsOld.CPKOperations
    {
    }
    [Serializable]
    public partial class CVarOperations : OperationsOld.CVarOperations
    {
        // initialize propety here 
        public CVarOperations()
        {
            this.MarksAndNumbers = "0";

            this.ClearanceApprovalDate = DateTime.Parse("01-01-1900");
            this.TruckingApprovalDate = DateTime.Parse("01-01-1900");
            this.FreightApprovalDate = DateTime.Parse("01-01-1900");
            this.BLDate = DateTime.Parse("01-01-1900");
            this.HBLDate = DateTime.Parse("01-01-1900");
            this.PODate = DateTime.Parse("01-01-1900");
            this.CloseDate = DateTime.Parse("01-01-1900");

            this.ShippedOnBoardDate = DateTime.Parse("01-01-1900");
            this.PODate = DateTime.Parse("01-01-1900");
            this.POValue = "0";
            this.ReleaseNumber = "0";
            this.DispatchNumber = "0";
            this.BusinessUnit = "0";
            this.BusinessUnit2 = "0";
            this.Form13Number = "0";


            this.DismissalPermissionSerial = "0";
            this.DeliveryOrderSerial = "0";

            this.eFBLID = "0";
            this.FreightPayableAt = "0";
            this.CertificateNumber = "0";
            this.CountryOfOrigin = "0";
            this.InvoiceValue = "0";

        }
    }

    public partial class COperations :OperationsOld.COperations
    {

    }
}
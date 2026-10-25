using System;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.Whatsapp
{
    public class WhatsAppMessageBatch
    {
        public int ID { get; set; }

        public string ETA { get; set; }
        public string ATA { get; set; }

        public string HouseNumber { get; set; }

        public string Status { get; set; }

        public string Location { get; set; }

        public string WarehouseID { get; set; }
        public string EntryDate { get; set; }

    }
}
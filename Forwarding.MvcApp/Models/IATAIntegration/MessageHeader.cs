using System;

namespace Forwarding.MvcApp.Models.IATAIntegration
{
    public class MessageHeader
    {
        public Addressing addressing { get; set; }
        public DateTime creationDate { get; set; } = DateTime.Now;
    }
}

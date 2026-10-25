using System;

namespace Forwarding.MvcApp.Models.IATAIntegration
{
    public abstract class Message
    {
        public Guid id { get; set; } = Guid.NewGuid();
        public MessageHeader messageHeader { get; set; }

    }
}

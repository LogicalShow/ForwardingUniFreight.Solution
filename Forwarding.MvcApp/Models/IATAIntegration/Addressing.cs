using System;
using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.IATAIntegration
{
    public class Addressing
    {
        public List<ParticipantAddress> senderAddresses { get; set; } = new List<ParticipantAddress>();
        public List<ParticipantAddress> finalRecipientAddresses { get; set; } = new List<ParticipantAddress>();
    }
}

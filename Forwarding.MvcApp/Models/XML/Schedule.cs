using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.XML
{
    public class Schedule
    {
        public XMLEnvelope ScheduleEnvelope { get; set; }
        public ScheduleDetails ScheduleDetails { get; set; }
    }
    public class ScheduleDetails
    {
        public string VesselVoyageID { get; set; }
        public string RequestType { get; set; }
        public string VesselName { get; set; }
        public string Voyage { get; set; }
        public string CarrierSCAC { get; set; }
        public string SCAC { get; set; }
        public string AmsFlag { get; set; }
        public string ACIFlag { get; set; }
        public string CFSOrigin { get; set; }
        public string CFSDestination { get; set; }
        public List<RoutingDetails> RoutingDetailsAll { get; set; }
    }
    public class RoutingDetails
    {
        public string StageQualifier { get; set; }
        public string TransportMode { get; set; }
        public string TransportName { get; set; }
        public string Origin { get; set; }
        public string ETD { get; set; }
        public string Destination { get; set; }
        public string ETA { get; set; }
    }
}

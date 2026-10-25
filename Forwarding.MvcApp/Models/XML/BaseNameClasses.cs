using System.Collections.Generic;

namespace Forwarding.MvcApp.Models.XML
{
    public class XMLEnvelope
    {
        public string SenderID { get; set; }
        public string ReceiverID { get; set; }
        public string Password { get; set; }
        public string Type { get; set; }
        public string Version { get; set; }
        public string EnvelopeID { get; set; }
    }
    public class Description
    {
        public string Description_Name { get; set; }
    }
    public class HSCode
    {
        public string HSCode_Name { get; set; }
    }
    public class Commodity
    {
        public string Commodity_Name { get; set; }
    }
    public class Marks
    {
        public string Marks_Name { get; set; }
    }
    public class BLRemarks
    {
        public string BLRemarks_Name { get; set; }
    }
    public class XMLDataToRead
    {
        public string pXMLData { get; set; }
    }
}

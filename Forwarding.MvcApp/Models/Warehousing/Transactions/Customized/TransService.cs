using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Forwarding.MvcApp.Models.Warehousing.Transactions.Customized
{
	public class TransService {
		public int ID { get; set; }
		public bool IsReceive { get; set; }
		public bool HasRequest { get; set; }
		public string Notes { get; set; }
		public List<TransServiceDetails> Details { get; set; }
	}
	public class TransServiceDetails
	{
		public int ID { get; set; }
		public int TransSourceID { get; set; }
		public short Direction { get; set; }
		public int ServiceID { get; set; }
		public decimal ServiceCost { get; set; }
		public decimal ServiceSelling { get; set; }
		public decimal Quantity { get; set; }
		public string Notes { get; set; }
	}
}
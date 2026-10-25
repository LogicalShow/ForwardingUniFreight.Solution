using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Forwarding.MvcApp.Models.Warehousing.Transactions.Customized
{
	public class Service
	{
		public int ID { get; set; }
		public string Name { get; set; }
		public decimal Cost { get; set; }
		public decimal Selling { get; set; }
		public int CalcTypeID { get; set; }
		public string CalcTypeName { get; set; }
	}
}
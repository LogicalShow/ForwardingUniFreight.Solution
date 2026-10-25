using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Forwarding.MvcApp.Models.Operations.Operations.Customized
{
	public class OperationHouse
	{
		public int CurrencyID { get; set; }
		public string UnEditableCompanyName { get; set; }
		public string pTariffDetailIDs { get; set; }
		public bool IsTaxOnItems { get; set; }
		public List<OperationHouseReceivable> Receivables { get; set; }
	}
	public class OperationHouseReceivable
	{
		public long ID { get; set; }
		public long HouseBillID { get; set; }
		public decimal Price { get; set; }
	}
}
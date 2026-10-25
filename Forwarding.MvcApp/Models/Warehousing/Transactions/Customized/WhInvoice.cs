using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Forwarding.MvcApp.Models.Warehousing.Transactions.Customized
{
	public class WhInvoice
	{
		public long ID { get; set; }
		public int WarehouseID { get; set; }
		public int CustomerID { get; set; }
		public int ContractID { get; set; }
		public int CurrencyID { get; set; }
		public decimal ExchangeRate { get; set; }
		public string InvoiceDate { get; set; }
		public string Notes { get; set; }
		public decimal Amount { get; set; }
		public List<WhInvoiceDetail> Details { get; set; }
	}

	public class WhInvoiceDetail
	{
		public int ID { get; set; }
		public int ReceiveID { get; set; }
		public int PickupID { get; set; }
		public int TransServiceID { get; set; }
		public int ChargeTypeID { get; set; }
		public int ContractDetailsID { get; set; }
		public int SpacePerPallet { get; set; }
		public int Days { get; set; }
		public int Rate { get; set; }
		public int Qty { get; set; }
		public decimal Amount { get; set; }
		public string Notes { get; set; }
	}
}
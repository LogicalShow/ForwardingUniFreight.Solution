using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using static Forwarding.MvcApp.Controllers.Warehousing.API_Reports.ContractController;

namespace Forwarding.MvcApp.Models.Warehousing.Transactions.Customized
{
	public class Contract
	{
		public int ID { get; set; }
		public int WarehouseID { get; set; }
		public int CustomerID { get; set; }
		public string FromDate { get; set; }
		public string ToDate { get; set; }
		public decimal StorageLimit { get; set; }
		public int StorageUnitID { get; set; }
		public bool IsByPallet { get; set; }
		public int NumberOfPallets { get; set; }
		public int CurrencyID { get; set; }
		public string Notes { get; set; }
		public bool IsFinalized { get; set; }
		public decimal Amount { get; set; }
		public int PaymentTermID { get; set; }
		public decimal YearlyExtraRatio { get; set; }
		public bool Approved { get; set; }
		public int ChargeTypeId { get; set; }
		public int DayAmount { get; set; }
		public List<ContractService> contractServices { get; set; } = new List<ContractService>();	
	}
}
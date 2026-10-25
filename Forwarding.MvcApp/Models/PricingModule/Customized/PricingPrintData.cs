using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Forwarding.MvcApp.Models.PricingModule.Customized
{
	public class PricingPrintData
	{
        public int ID { get; set; }
        public int PricingTypeID { get; set; }
		public int AgentID { get; set; }
		public string AgentName { get; set; }
		public int SupplierID { get; set; }
		public string SupplierName { get; set; }
		public int POLCountryID { get; set; }
		public string POLCountryName { get; set; }
		public int POLID { get; set; }
		public string POLName { get; set; }
		public int PODCountryID { get; set; }
		public string PODCountryName { get; set; }
		public int PODID { get; set; }
		public string PODName { get; set; }
		public int EquipmentID { get; set; }
		public string EquipmentCode { get; set; }
		public int PackageTypeID { get; set; }
		public string PackageTypeName { get; set; }
		public int CommodityID { get; set; }
		public string CommodityName { get; set; }
		public int TransitTime { get; set; }
		public int Frequency { get; set; }
		public int FreeTime { get; set; }
		public string ValidFrom { get; set; }
		public string ValidTo { get; set; }
		public int CurrencyID { get; set; }
		public string CurrencyCode { get; set; }
		public int ChargeTypeID { get; set; }
		public string ChargeTypeCode { get; set; }
		public string CostPrice { get; set; }
		public string Notes { get; set; }
	}
}
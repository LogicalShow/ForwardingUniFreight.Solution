using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Forwarding.MvcApp.Models.Warehousing.MasterData.Customized
{
	public class ItemKitting
	{
		public int ID { get; set; }
		public int ItemID { get; set; }
		public DateTime DateFrom { get; set; }
		public DateTime DateTo { get; set; }
		public string Name { get; set; }
		public string LocalName { get; set; }
		public string Notes { get; set; }
		public List<ItemKittingDetail> Details { get; set; }
	}
	public class ItemKittingDetail
	{
		public int ID { get; set; }
		public int MasterID { get; set; }
		public int DetailItemID { get; set; }
		public int Qty { get; set; }
	}
}
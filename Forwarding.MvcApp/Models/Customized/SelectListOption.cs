using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Forwarding.MvcApp.Models.Customized 
{
	public class SelectListOption
	{
		public long ID { get; set; }
		public string Code { get; set; }
		public string Name { get; set; }
		public string LocalName { get; set; }
	}
	public enum CreationSource
	{
		web,
		mob,
		xls
	}
}
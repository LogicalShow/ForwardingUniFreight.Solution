using Forwarding.MvcApp.Models.Customized;
using Forwarding.MvcApp.Models.MasterData.Partners.Generated;
using Forwarding.MvcApp.Models.Warehousing.MasterData.Generated;
using Forwarding.MvcApp.Models.Warehousing.Transactions.Generated;
using Forwarding.MvcApp.Models.Warehousing.Transactions.Generated.Old;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;

namespace Forwarding.MvcApp.Controllers.Warehousing.API_Reports
{

    public class ProductReallocationController : ApiController
    {
        #region API endpoints
        [HttpGet]
        public object[] LoadComboBoxes()
        {
            CWH_Warehouse objCWH_Warehouse = new CWH_Warehouse();
            objCWH_Warehouse.GetList(" WHERE 1=1");

            CWH_Area objCWH_Area = new CWH_Area();
            objCWH_Area.GetList(" WHERE 1=1");

            CWH_RowLocation objFromCWH_RowLocation = new CWH_RowLocation();
            objFromCWH_RowLocation.GetList(" WHERE 1 = 1");

            CWH_RowLocation objToCWH_RowLocation = new CWH_RowLocation();
            objToCWH_RowLocation.GetList(" WHERE 1 = 1");

            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
            var CustomerList = objCCustomizedDBCall
                .ExecuteQuery_ListOfObjects("SELECT ID,Name FROM Customers", typeof(CVarCustomers))
                .Cast<CVarCustomers>()
                .ToList();

            var serializer = new JavaScriptSerializer { MaxJsonLength = int.MaxValue };
            return new object[]
            {
                serializer.Serialize(objCWH_Warehouse.lstCVarWH_Warehouse),
                serializer.Serialize(objCWH_Area.lstCVarWH_Area),
                serializer.Serialize(objFromCWH_RowLocation.lstCVarWH_RowLocation),
                serializer.Serialize(objToCWH_RowLocation.lstCVarWH_RowLocation),
                serializer.Serialize(CustomerList)
            };
        }

        [HttpPost]
        public object[] UpdateComboBoxes([FromBody] UpdateComboBoxesDTO UpdateComboBoxesDTO)
        {
            CWH_Area objFromCWH_Area = new CWH_Area();
            objFromCWH_Area.GetList($" WHERE {(UpdateComboBoxesDTO.pFromWarehouseID == 0 ? "1=1" : "WarehouseID = " + UpdateComboBoxesDTO.pFromWarehouseID)}");

            CWH_Area objToCWH_Area = new CWH_Area();
            objToCWH_Area.GetList($" WHERE {(UpdateComboBoxesDTO.pToWarehouseID == 0 ? "1=1" : "WarehouseID = " + UpdateComboBoxesDTO.pToWarehouseID)}");

            CWH_RowLocation objFromCWH_RowLocation = new CWH_RowLocation();
            objFromCWH_RowLocation.GetList($" WHERE {(UpdateComboBoxesDTO.pFromAreaID == 0 ? "1=1" : "RowID IN (SELECT ID FROM WH_Row WHERE AreaID = " + UpdateComboBoxesDTO.pFromAreaID) + ")"}");

            CWH_RowLocation objToCWH_RowLocation = new CWH_RowLocation();
            objToCWH_RowLocation.GetList($" WHERE {(UpdateComboBoxesDTO.pToAreaID == 0 ? "1=1" : "RowID IN (SELECT ID FROM WH_Row WHERE AreaID = " + UpdateComboBoxesDTO.pToAreaID) + ")"}");

            var serializer = new JavaScriptSerializer { MaxJsonLength = int.MaxValue };
            return new object[]
            {
                serializer.Serialize(objFromCWH_Area.lstCVarWH_Area),
                serializer.Serialize(objToCWH_Area.lstCVarWH_Area),
                serializer.Serialize(objFromCWH_RowLocation.lstCVarWH_RowLocation),
                serializer.Serialize(objToCWH_RowLocation.lstCVarWH_RowLocation)
            };
        }

        [HttpGet]
        public object[] GetAvailableProducts(int pFromLocationID, string pExistedProducts, int pCustomerID, string pPalletID)
        {
			var palletFilter = "";
			if (!string.IsNullOrWhiteSpace(pPalletID) && pPalletID != "0")
				palletFilter = $" and PalletID='{pPalletID}'";

            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
            var AvailableProducts = objCCustomizedDBCall.ExecuteQuery_ListOfObjects("SELECT PurchaseItemID,PurchaseItemCode FROM vwWH_ReceiveDetails WHERE Quantity-IsNull(PickedQuantity,0)>0 "+palletFilter+" and LocationID = " + pFromLocationID + (pExistedProducts == "" || pExistedProducts == null ? "" : " AND PurchaseItemID NOT IN (" + pExistedProducts + ")") + (pCustomerID == 0 ? "" : " AND CustomerID = " + pCustomerID) + " GROUP BY PurchaseItemID,PurchaseItemCode", typeof(CVarvwWH_ReceiveDetails))
                .Cast<CVarvwWH_ReceiveDetails>()
                .Select(x => new AvailableProductsDTO
                {
                    ID = x.PurchaseItemID,
                    Code = x.PurchaseItemCode           
                })
                .ToList();

            var serializer = new JavaScriptSerializer { MaxJsonLength = int.MaxValue };
            return new object[]
            {
                serializer.Serialize(AvailableProducts)
            };
        }

        [HttpGet]
        public object[] GetAvailableQuantity(int pPurchaseItemID, int pFromLocationID, int pCustomerID)
        {
            int _rowCount = 0;
            var Ex = new Exception();
            decimal ReceiveQuantity = 0m;
            decimal PickedQuantity = 0m;
            decimal AvailableQuantity = 0m;
            CvwWH_ReceiveDetails objCvwWH_ReceiveDetails = new CvwWH_ReceiveDetails();
            CvwWH_PickupDetailsLocation objCvwWH_PickupDetailsLocation = new CvwWH_PickupDetailsLocation();

            Ex = objCvwWH_ReceiveDetails.GetListPaging(9999, 1, " WHERE LocationID = " + pFromLocationID + " AND PurchaseItemID = " + pPurchaseItemID + " AND IsFinalized = 1" + (pCustomerID == 0 ? "" : " AND CustomerID = " + pCustomerID), "ID", out _rowCount);

            Ex = objCvwWH_PickupDetailsLocation.GetListPaging(9999, 1, " WHERE LocationID = " + pFromLocationID + " AND PurchaseItemID = " + pPurchaseItemID + " AND IsFinalized = 1", "ID", out _rowCount);

            if (Ex == null)
            {
                ReceiveQuantity = objCvwWH_ReceiveDetails.lstCVarvwWH_ReceiveDetails.Sum(x => x.Quantity);
                PickedQuantity = objCvwWH_PickupDetailsLocation.lstCVarvwWH_PickupDetailsLocation.Sum(x => x.PickedQuantity);
                AvailableQuantity = ReceiveQuantity - PickedQuantity;
            }

            //var serializer = new JavaScriptSerializer { MaxJsonLength = int.MaxValue };
            return new object[]
            {
                AvailableQuantity
            };
        }

        [HttpPost]
		public object[] ConfirmMovement([FromBody] MovementDTO MovementDTO)
		{
			var Ex = new Exception();
			CProductReallocationLog objCProductReallocationLog = new CProductReallocationLog();
			CWH_ReceiveDetails objCWH_ReceiveDetails = new CWH_ReceiveDetails();
			CvwWH_ReceiveDetails objCvwWH_ReceiveDetails = new CvwWH_ReceiveDetails();
			CvwWH_PickupDetailsLocation objCvwWH_PickupDetailsLocation = new CvwWH_PickupDetailsLocation();
			foreach (var product in MovementDTO.Products)
			{
				string _updateClause = "";
				Ex = objCvwWH_ReceiveDetails.GetList($" WHERE LocationID ={MovementDTO.FromLocationID} AND PurchaseItemID = {product.ID} {(MovementDTO.CustomerID == 0 ? "" : "AND CustomerID=" + MovementDTO.CustomerID)} Order By ID ");
				objCWH_ReceiveDetails.GetItem(objCvwWH_ReceiveDetails.lstCVarvwWH_ReceiveDetails[0].ID);
				var ProductReceiveDetails = objCWH_ReceiveDetails.lstCVarWH_ReceiveDetails;
				if (product.Qty == product.AvailableQty)
				{
					_updateClause += " LocationID = " + MovementDTO.ToLocationID + " WHERE LocationID = " + MovementDTO.FromLocationID + " AND PurchaseItemID = " + product.ID + (MovementDTO.CustomerID == 0 ? "" : " AND CustomerID = " + MovementDTO.CustomerID);
					if (Ex == null)
						Ex = objCWH_ReceiveDetails.UpdateList(_updateClause);
				}
				else if (product.Qty < product.AvailableQty)
				{
					var RequiredQty = product.Qty;
					decimal MoveQty = 0m;
					foreach (var ReceiveDetail in ProductReceiveDetails)
					{
						//Ex = objCvwWH_PickupDetailsLocation.GetListPaging(9999, 1, " WHERE ReceiveDetailsID = " + ReceiveDetail.ID + " AND PurchaseItemID = " + product.ID + " AND IsFinalized = 1", "ID", out _rowCount);
						//var PickedQty = objCvwWH_PickupDetailsLocation.lstCVarvwWH_PickupDetailsLocation.Sum(x => x.PickedQuantity);
						//var ReceiveDetailAvailableQty = ReceiveDetail.Quantity - PickedQty;
						MoveQty = RequiredQty; //> ReceiveDetailAvailableQty ? ReceiveDetailAvailableQty : RequiredQty;

						//update the received quantity in the old location
						_updateClause += " Quantity = " + (ReceiveDetail.Quantity - MoveQty) + " WHERE ID = " + ReceiveDetail.ID;
						if (Ex == null)
							Ex = objCWH_ReceiveDetails.UpdateList(_updateClause);

						RequiredQty -= MoveQty;
						if (RequiredQty == 0)
							break;
					}
					//insert a new record for the moved quantity
					var InsertMovement = ProductReceiveDetails[0];
					InsertMovement.ID = 0;
					InsertMovement.Quantity = product.Qty;
					InsertMovement.LocationID = MovementDTO.ToLocationID;
					if (Ex == null)
						Ex = objCWH_ReceiveDetails.SaveMethod(new List<CVarWH_ReceiveDetails> { InsertMovement });

					if (Ex == null && product.Qty > 0 && objCvwWH_ReceiveDetails.lstCVarvwWH_ReceiveDetails[0].BySerialNo)
					{
						CWH_ReceiveDetailsSerial objCWH_ReceiveDetailsSerial = new CWH_ReceiveDetailsSerial();
						objCWH_ReceiveDetailsSerial.GetList($"where ReceiveDetailsID={objCvwWH_ReceiveDetails.lstCVarvwWH_ReceiveDetails[0].ID} and isnull(PickupDetailsLocationID,0)=0");
						foreach (var item in objCWH_ReceiveDetailsSerial.lstCVarWH_ReceiveDetailsSerial)
						{
							item.ReceiveDetailsID = InsertMovement.ID;
							product.Qty--;
							if (product.Qty == 0)
								break;
						}
						objCWH_ReceiveDetailsSerial.SaveMethod(objCWH_ReceiveDetailsSerial.lstCVarWH_ReceiveDetailsSerial.Where(a => a.ReceiveDetailsID == InsertMovement.ID).ToList());
					}
				}

				//Insert a log record
				if (Ex == null)
				{
					Ex = objCProductReallocationLog.SaveMethod(new List<CVarProductReallocationLog>
					{
						new CVarProductReallocationLog()
						{
							ID = 0,
							ReceiveDetailID = ProductReceiveDetails[0].ID,
							PurchaseItemID = product.ID,
							FromLocationID = MovementDTO.FromLocationID,
							ToLocationID = MovementDTO.ToLocationID,
							MovedQuantity = product.Qty,
							ModificatorUserID = WebSecurity.CurrentUserId,
							ModificationDate = DateTime.Now
						}
					});
				}
			}

			return new object[]
			{
				Ex
			};
		}
		#endregion
	}

    #region DTOs
    public class UpdateComboBoxesDTO
    {
        public int pFromWarehouseID { get; set; }
        public int pFromAreaID { get; set; }
        public int pToWarehouseID { get; set; }
        public int pToAreaID { get; set; }

    }
    public class AvailableProductsDTO
    {
        public long ID { get; set; }
        public string Code { get; set; }

    }
    public class MovementDTO
    {
        public int FromLocationID { get; set; }
        public int ToLocationID { get; set; }
        public List<Product> Products { get; set; }

        public int CustomerID { get; set; }
    }
    public class Product
    {
        public int ID { get; set; }
        public decimal Qty { get; set; }
        public decimal AvailableQty { get; set; }
    }
    #endregion
}

let RowsCounter = 0;
function ProductReallocation_Initialize() {
    debugger;
    LoadView("/Warehousing/Transactions/ProductReallocation", "div-content", function () {
        debugger;
        FadePageCover(true);
        $('#slFromWarehouse').css({ 'width': '100%' }).select2();
        $('#slToWarehouse').css({ 'width': '100%' }).select2();
        $('#slFromArea').css({ 'width': '100%' }).select2();
        $('#slToArea').css({ 'width': '100%' }).select2();
        $('#slFromLocation').css({ 'width': '100%' }).select2();
        $('#slToLocation').css({ 'width': '100%' }).select2();
        $('#slCustomer').css({ 'width': '100%' }).select2();
        
        $("div[tabindex='-1']").removeAttr('tabindex');

        CallGETFunctionWithParameters("/api/ProductReallocation/LoadComboBoxes", null, function (pData) {
            debugger;
            let pWarehouses = pData[0];
            let pAreas = pData[1];
            let pFromLocations = pData[2]
            let pToLocations = pData[3]
            let pCustomers = pData[4]

            FillListFromObject(null, 2, "<--Select-->", "slFromWarehouse", pWarehouses, null);
            FillListFromObject(null, 2, "<--Select-->", "slToWarehouse", pWarehouses, null);
            FillListFromObject(null, 2, "<--Select-->", "slFromArea", pAreas, null);
            FillListFromObject(null, 2, "<--Select-->", "slToArea", pAreas, null);
            FillListFromObject(null, 1, "<--Select-->", "slFromLocation", pFromLocations, null);
            FillListFromObject(null, 1, "<--Select-->", "slToLocation", pToLocations, null);
            FillListFromObject(null, 2, "<--Select-->", "slCustomer", pCustomers, null);
        }, function () {
            FadePageCover(false);
        })
    });  
}

function UpdateComboBoxes() {
    debugger;
    FadePageCover(true);
    let pFromWarehouseID = $("#slFromWarehouse").val() == "" ? 0 : $("#slFromWarehouse").val();
    let pToWarehouseID = $("#slToWarehouse").val() == "" ? 0 : $("#slToWarehouse").val();
    let pFromAreaID = $("#slFromArea").val() == "" ? 0 : $("#slFromArea").val();
    let pToAreaID = $("#slToArea").val() == "" ? 0 : $("#slToArea").val();
    let pFromLocationID = $("#slFromLocation").val() == "" ? 0 : $("#slFromLocation").val();
    let pToLocationID = $("#slToLocation").val() == "" ? 0 : $("#slToLocation").val();

    CallPOSTFunctionWithParameters("/api/ProductReallocation/UpdateComboBoxes",
        {
            pFromWarehouseID: pFromWarehouseID,
            pToWarehouseID: pToWarehouseID,
            pFromAreaID: pFromAreaID,
            pToAreaID: pToAreaID,
        }
        , function (pData) {
        debugger;
            let pFromAreas = pData[0];
            let pToAreas = pData[1];
            let pFromLocations = pData[2];
            let pToLocations = pData[3];

            FillListFromObject(pFromAreaID, 2, "<--Select-->", "slFromArea", pFromAreas, null);
            FillListFromObject(pToAreaID, 2, "<--Select-->", "slToArea", pToAreas, null);
            FillListFromObject(pFromLocationID, 1, "<--Select-->", "slFromLocation", pFromLocations, null);
            FillListFromObject(pToLocationID, 1, "<--Select-->", "slToLocation", pToLocations, null);
        }, function () {
            FadePageCover(false);
        });
}

function AddNewMovement() {
    debugger;
    if (IsNull($('#txtPalletID').val(), '') == '') {
        AddLine();
    }
    else {
        $('#hidden_slItems option').each(function () {
            if ($(this).val()>0) {
                AddLine();
                $('#tblItems tr:eq(' + ($('#tblItems tr').length - 1) + ') td.ItemID select').val($(this).val()).change();
            }
        });
    }
}
function AddLine() {
    AppendRowtoTable("tblItems",
        ("<tr ID='" + 0 + "' isdeleted='0'  counter='" + (RowsCounter + 1) + "' value='" + 0 + "'>"
            + "<td class='ID hide'> <input name='Delete' type='checkbox' value='" + "0" + "' /></td>"

            + "<td counter='" + (RowsCounter + 1) + "'> <button id='btn-DeleteDetails' type='button' tag='0' onclick='DeleteItem(this);' class='btn btn-sm btn-danger'><i class='fa fa-trash-o'></i></button></td>"

            + "<td class='ItemID ' val='" + "0" + "'>" + "<select id='Item-" + (RowsCounter + 1) + "' onchange='GetAvailableQuantity(this);' tag='" + "0" + "' class='input-sm col-sm SelectItem'>" + $('#hidden_slItems').html() + "</select>" + "</td>"

            + "<td class='Qty' val='" + "0" + "'>" + "<input type='number' class='inputquantity input-sm col-sm' style='text-align:center;'>" + "</td>"

            + "<td class='AvailableQuantity' val='" + "0" + "'>" + "<span class='span_quantity'></span>" + "</td>"
            + "</tr>"));
    RowsCounter++;

    $("select.SelectItem, select.SelectReceive").each(function (i, sl) {
        if ($(sl).hasClass('IsAutoSelect') == false) {
            $(sl).css({ 'width': '100%' }).select2();
            $(sl).addClass('IsAutoSelect');
            $("div[tabindex='-1']").removeAttr('tabindex');
        }
    });
}
function GetExistedProducts(){
    debugger;
    let ExistedProducts = [];
    $("#tblItems tbody tr").each(function (i, tr) {
        let ProductID = $(tr).find("td.ItemID select.SelectItem").val();
        ExistedProducts.push(ProductID);
    })
    ExistedProducts = ExistedProducts.join(',')
    return ExistedProducts;
}

function DeleteItem(This) {
    debugger;
    if ($(This).attr('tag') == "0" || $(This).attr('tag') == "" || $(This).attr('tag') == null) {
        $(This).closest('tr').remove();
    }
}

function GetAvailableProducts() {
    debugger;
    FadePageCover(true);
    //an available product can be select once in tblItems
    let pExistedProducts = GetExistedProducts();
    let pFromLocationID = $("#slFromLocation").val() == "" ? 0 : $("#slFromLocation").val();
    let pCustomerID = $("#slCustomer").val() == "" ? 0 : $("#slCustomer").val()

    CallGETFunctionWithParameters("/api/ProductReallocation/GetAvailableProducts",
        {
            pFromLocationID: pFromLocationID,
            pExistedProducts: pExistedProducts,
            pCustomerID: pCustomerID,
            pPalletID: IsNull($('#txtPalletID').val(),'')
        }
        , function (pData) {
            debugger;
            pAvailableProducts = pData[0];
            FillListFromObject(null, 1, "<--Select-->", "hidden_slItems", pAvailableProducts, null);
        }, function () {
            FadePageCover(false);
        });
}

function GetAvailableQuantity(PurchaseItemIDSelector) {
    debugger;
    if (IsNull($('#txtPalletID').val(), '') == '')
        GetAvailableProducts();
    let pPurchaseItemID = $(PurchaseItemIDSelector).val();
    let pFromLocationID = $("#slFromLocation").val() == "" ? 0 : $("#slFromLocation").val();
    let pCustomerID = $("#slCustomer").val() == "" ? 0 : $("#slCustomer").val()

    if (pPurchaseItemID != "" && pPurchaseItemID != 0) {
        CallGETFunctionWithParameters("/api/ProductReallocation/GetAvailableQuantity",
            {
                pPurchaseItemID: pPurchaseItemID,
                pFromLocationID: pFromLocationID,
                pCustomerID: pCustomerID
            }
            , function (pData) {
                debugger;
                let AvailableQuantity = pData[0];
                $(PurchaseItemIDSelector).parent().parent().find('.AvailableQuantity').find('.span_quantity').html("&nbsp;&nbsp;&nbsp;<b>" + AvailableQuantity + "</b>");
                if (IsNull($('#txtPalletID').val(), '') != '')
                    $(PurchaseItemIDSelector).parent().parent().find('.Qty input').val(AvailableQuantity);

            }, function () {
                FadePageCover(false);
            })
    }
    else {
        $(PurchaseItemIDSelector).parent().parent().find('.AvailableQuantity').find('.span_quantity').html(" ");
    }
}

function ConfirmMovement() {
    debugger;
    
    var MovementDTO = {
        FromLocationID: $("#slFromLocation").val(),
        ToLocationID: $("#slToLocation").val(),
        Products: [],
        CustomerID: $("#slCustomer").val() == "" ? 0 : $("#slCustomer").val()
    };
    $("#tblItems tbody tr").each(function (i, tr) {
        debugger;
        let ID = $(tr).find("td.ItemID select.SelectItem").val();
        let Qty = $(tr).find("td.Qty input.inputquantity").val();
        let AvailableQty = $(tr).find("td.AvailableQuantity span.span_quantity b").html();
        MovementDTO.Products.push({
            ID: ID,
            Qty: Qty,
            AvailableQty: AvailableQty
        });
    });

    let Message = MovementDTOValidation(MovementDTO);
    const ReturnedMessage = [...new Set(Message)]; 
    const joinedMessage = ReturnedMessage.join(", ");

    if (Message.length == 0) {
        FadePageCover(true);
        CallPOSTFunctionWithParameters("/api/ProductReallocation/ConfirmMovement", MovementDTO
            , function (pData) {
                debugger;
                Ex = JSON.parse(pData[0]);
                if (Ex == null) {
                    swal("Success", "Moved Successfully");
                    $("#tblItems tbody tr").each(function (i, tr) {
                        debugger;
                        $(tr).remove();
                        ProductReallocation_Initialize();
                    })
                }
                else
                    swal("Error", Ex.Message);
            }, function () {
                FadePageCover(false);
            }
        )
    }
    else {
        swal("Error", "Check " + joinedMessage + "!");
    }
}

function MovementDTOValidation(MovementDTO) {
    debugger;
    let Message = [];
    //Validation check before sending DTO to the backend
    if (MovementDTO.FromLocationID == "" || MovementDTO.FromLocationID == 0)
        Message.push("Source Location");
    if (MovementDTO.ToLocationID == "" || MovementDTO.ToLocationID == 0)
        Message.push("Destinaiton Location");
    MovementDTO.Products.forEach((Prod) => {
        if (Prod.ID == "" || Prod.ID == 0)
            Message.push("Product to move");
        if (Prod.Qty == "" || parseFloat(Prod.Qty) == 0 || (parseFloat(Prod.Qty) > parseFloat(Prod.AvailableQty)))
            Message.push("quantity to move");
    });

    return Message;
}